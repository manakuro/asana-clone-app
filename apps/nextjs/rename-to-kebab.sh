#!/usr/bin/env bash
#
# rename-to-kebab.sh
#
# 1行1パスのファイルを受け取り、各パスの全セグメント（ディレクトリ名・ファイル名）を
# kebab-case に変換して `git mv` を実行する。
#
# 使い方:
#   ./rename-to-kebab.sh paths.txt
#   ./rename-to-kebab.sh paths.txt --dry-run   # 実際には mv せず変換結果だけ表示
#
# 前提:
#   - git リポジトリのルート、またはその配下で実行すること
#   - パスはリポジトリルートからの相対パス、もしくは絶対パスで指定
#   - 拡張子は変換対象外（最後のドット以降はそのまま保持）
#   - 既にlowercase/kebab-caseの部分は変化しない（同じ文字列になる）

set -euo pipefail

if [[ $# -lt 1 ]]; then
  echo "Usage: $0 <paths_file> [--dry-run]" >&2
  exit 1
fi

PATHS_FILE="$1"
DRY_RUN=false
if [[ "${2:-}" == "--dry-run" ]]; then
  DRY_RUN=true
fi

if [[ ! -f "$PATHS_FILE" ]]; then
  echo "Error: file not found: $PATHS_FILE" >&2
  exit 1
fi

# 1セグメント（ディレクトリ名やファイル名、拡張子なし）を kebab-case に変換する。
# 変換ルール:
#   1. キャメル/パスカルの単語境界（小文字→大文字、数字→大文字 等）にハイフンを挿入
#   2. 連続する大文字の塊（略語など）は一つの単語として扱う
#   3. アンダースコア・スペースもハイフンに統一
#   4. 全体を小文字化
#   5. 連続ハイフン・先頭末尾のハイフンを除去
to_kebab_segment() {
  local input="$1"
  # アンダースコア・スペースをハイフンに
  input="${input//_/-}"
  input="${input// /-}"

  # PerlでUnicode安全に単語境界処理（日本語ファイル名等にも安全に対応）
  printf '%s' "$input" | perl -CSD -pe '
    s/([a-z0-9])([A-Z])/$1-$2/g;       # aB -> a-B
    s/([A-Z]+)([A-Z][a-z])/$1-$2/g;    # ABCFoo -> ABC-Foo
    s/-+/-/g;                          # 連続ハイフンを1つに
    s/^-//; s/-$//;                    # 先頭・末尾のハイフン除去
    $_ = lc($_);                       # 小文字化
  '
}

# ファイル名（拡張子付き）を kebab-case に変換する。
# 拡張子は維持しつつ、本体部分のみ変換する。
to_kebab_filename() {
  local filename="$1"
  if [[ "$filename" == *.* && "$filename" != .* ]]; then
    local base="${filename%.*}"
    local ext="${filename##*.}"
    local kebab_base
    kebab_base="$(to_kebab_segment "$base")"
    printf '%s.%s' "$kebab_base" "$ext"
  else
    # 拡張子がない、またはドットファイル（.gitignore等）はそのまま処理
    to_kebab_segment "$filename"
  fi
}

# パス全体を変換する。各セグメントごとに変換し、最後のセグメントのみファイル名扱い。
convert_path() {
  local path="$1"
  local leading_slash=""
  if [[ "$path" == /* ]]; then
    leading_slash="/"
    path="${path#/}"
  fi

  IFS='/' read -ra segments <<< "$path"
  local n="${#segments[@]}"
  local result=()

  for ((i = 0; i < n; i++)); do
    local seg="${segments[$i]}"
    if [[ -z "$seg" ]]; then
      result+=("$seg")
      continue
    fi
    if (( i == n - 1 )); then
      result+=("$(to_kebab_filename "$seg")")
    else
      result+=("$(to_kebab_segment "$seg")")
    fi
  done

  local joined
  joined="$(IFS=/; echo "${result[*]}")"
  printf '%s%s' "$leading_slash" "$joined"
}

# git mv を安全に実行する。
# macOS等のcase-insensitiveファイルシステムでは、大文字小文字のみが異なる
# リネームが正しく行われないことがあるため、必要な場合は一時パスを経由する。
safe_git_mv() {
  local old="$1"
  local new="$2"

  if [[ "$old" == "$new" ]]; then
    echo "  skip (no change): $old"
    return 0
  fi

  if [[ ! -e "$old" ]]; then
    echo "  WARNING: source not found, skipping: $old" >&2
    return 1
  fi

  if [[ -e "$new" && "$old" != "$new" ]]; then
    # 大文字小文字違いだけかどうかを判定
    local old_lower new_lower
    old_lower="$(printf '%s' "$old" | tr '[:upper:]' '[:lower:]')"
    new_lower="$(printf '%s' "$new" | tr '[:upper:]' '[:lower:]')"
    if [[ "$old_lower" == "$new_lower" ]]; then
      # case-insensitive FS 対策: 一時名を経由
      local tmp="${new}.kebabtmp$$"
      if $DRY_RUN; then
        echo "  [dry-run] git mv \"$old\" \"$tmp\" && git mv \"$tmp\" \"$new\""
      else
        git mv -- "$old" "$tmp"
        git mv -- "$tmp" "$new"
        echo "  renamed (via temp): $old -> $new"
      fi
      return 0
    else
      echo "  WARNING: destination already exists, skipping: $new" >&2
      return 1
    fi
  fi

  if $DRY_RUN; then
    echo "  [dry-run] git mv \"$old\" \"$new\""
  else
    # 親ディレクトリが無ければ作成（git mv は親ディレクトリを自動生成しないため）
    mkdir -p "$(dirname "$new")"
    git mv -- "$old" "$new"
    echo "  renamed: $old -> $new"
  fi
}

echo "=== kebab-case rename plan ==="
while IFS= read -r line || [[ -n "$line" ]]; do
  # 空行・コメント行をスキップ
  [[ -z "$line" ]] && continue
  [[ "$line" == \#* ]] && continue

  old_path="$line"
  new_path="$(convert_path "$old_path")"

  echo "$old_path"
  echo "  -> $new_path"
  safe_git_mv "$old_path" "$new_path" || true
done < "$PATHS_FILE"

echo "=== done ==="
if $DRY_RUN; then
  echo "(dry-run mode: no files were actually moved)"
fi

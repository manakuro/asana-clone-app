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

# 既にリネーム処理済みのディレクトリパス（大文字小文字違いの2段階git mvを実施済み）
# を記録し、同じディレクトリに対して何度も処理しないようにする。
# bash 3.2（macOS標準）は連想配列(declare -A)に対応していないため、
# 改行区切りの文字列で管理する。
DIR_RENAMED_LIST=$'\n'

is_dir_renamed_cached() {
  case "$DIR_RENAMED_LIST" in
    *$'\n'"$1"$'\n'*) return 0 ;;
    *) return 1 ;;
  esac
}

mark_dir_renamed_cached() {
  DIR_RENAMED_LIST="${DIR_RENAMED_LIST}${1}"$'\n'
}

# ディレクトリパス1個（例: src/components/ui/Avatar）を、対応するkebab-caseパス
# （例: src/components/ui/avatar）へ、必要なら2段階git mvでリネームする。
# ファイルの移動より前に、親ディレクトリ階層を1階層ずつ確実にリネームしておくための関数。
# これにより、macOSのcase-insensitiveファイルシステムで `mkdir -p` が
# 既存の大文字小文字違いディレクトリをそのまま使い続けてしまう問題を回避する。
ensure_dir_renamed() {
  local target_dir="$1"  # 変換後のディレクトリパス（kebab-case化済み）

  # すでに変換後のディレクトリが存在し、かつそれが意図したものであれば何もしない
  [[ -z "$target_dir" || "$target_dir" == "." ]] && return 0

  local parent
  parent="$(dirname "$target_dir")"
  if [[ "$parent" != "." && "$parent" != "/" ]]; then
    ensure_dir_renamed "$parent"
  fi

  # すでにこのディレクトリは処理済みならスキップ
  if is_dir_renamed_cached "$target_dir"; then
    return 0
  fi
  mark_dir_renamed_cached "$target_dir"

  local parent_dir base_name
  parent_dir="$(dirname "$target_dir")"
  base_name="$(basename "$target_dir")"

  if [[ ! -d "$parent_dir" ]]; then
    # 親ディレクトリすらまだ無い場合は、mkdir -p に任せて問題ない
    return 0
  fi

  # 親ディレクトリの実際のエントリ一覧を取得し、target_dir と「大文字小文字も含め
  # 完全一致」する表記が既にあるか、また「小文字化すれば一致するが表記が違う」既存
  # ディレクトリがあるかを判定する。
  # NOTE: [[ -d "$target_dir" ]] のような直接の存在チェックは、macOS等の
  # case-insensitiveファイルシステム上では大文字小文字を無視してマッチしてしまうため、
  # ここでは使わず、ディレクトリエントリの文字列を明示的に比較する。
  local exact_match=""
  local existing=""
  local entry base_lower entry_lower
  base_lower="$(printf '%s' "$base_name" | tr '[:upper:]' '[:lower:]')"
  for entry in "$parent_dir"/*/; do
    [[ -e "$entry" ]] || continue
    entry="${entry%/}"
    entry="$(basename "$entry")"
    if [[ "$entry" == "$base_name" ]]; then
      exact_match="$entry"
      break
    fi
    entry_lower="$(printf '%s' "$entry" | tr '[:upper:]' '[:lower:]')"
    if [[ "$entry_lower" == "$base_lower" ]]; then
      existing="$entry"
    fi
  done

  # 既に正しい表記（大文字小文字含め完全一致）で存在するなら何もしない
  if [[ -n "$exact_match" ]]; then
    return 0
  fi

  if [[ -n "$existing" ]]; then
    local old_dir="$parent_dir/$existing"
    local tmp_dir="$parent_dir/${base_name}.kebabtmpdir$$"
    if $DRY_RUN; then
      echo "  [dry-run] git mv \"$old_dir\" \"$tmp_dir\" && git mv \"$tmp_dir\" \"$target_dir\"  (dir rename)"
      # dry-run中は実際のリネームは起きないが、後続のold_path解決のために
      # 「このディレクトリは旧名 existing のままである」ことを記録する。
      LAST_DIR_RENAME_OLD_NAME="$existing"
      LAST_DIR_RENAME_NEW_NAME="$base_name"
      LAST_DIR_RENAME_PARENT="$parent_dir"
    else
      git mv -- "$old_dir" "$tmp_dir"
      git mv -- "$tmp_dir" "$target_dir"
      echo "  renamed dir (via temp): $old_dir -> $target_dir"
    fi
  fi
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
    # 親ディレクトリを用意する。mkdir -p の前に、大文字小文字違いの既存ディレクトリが
    # ないかを確認し、あれば先に2段階git mvでリネームしておく（macOS対策）。
    mkdir -p "$(dirname "$new")"
    git mv -- "$old" "$new"
    echo "  renamed: $old -> $new"
  fi
}

echo "=== kebab-case rename plan ==="
LAST_DIR_RENAME_OLD_NAME=""
LAST_DIR_RENAME_NEW_NAME=""
LAST_DIR_RENAME_PARENT=""

while IFS= read -r line || [[ -n "$line" ]]; do
  # 空行・コメント行をスキップ
  [[ -z "$line" ]] && continue
  [[ "$line" == \#* ]] && continue

  old_path="$line"
  new_path="$(convert_path "$old_path")"

  echo "$old_path"
  echo "  -> $new_path"

  # ファイル本体を移動する前に、親ディレクトリ階層を確実にkebab-case表記へ
  # リネームしておく（大文字小文字のみの差分が放置されるのを防ぐ）。
  new_parent_dir="$(dirname "$new_path")"
  LAST_DIR_RENAME_OLD_NAME=""
  LAST_DIR_RENAME_NEW_NAME=""
  LAST_DIR_RENAME_PARENT=""
  ensure_dir_renamed "$new_parent_dir"

  # 本番実行時: ensure_dir_renamed が実際に git mv を行っていれば、
  # old_path の親ディレクトリ部分はもう存在しない（既に new_parent_dir に変わっている）。
  # dry-run時: 実際には何も移動していないので、old_path はそのままでよいが、
  # 表示用に「最終的にどのパスに対して safe_git_mv が呼ばれるか」を
  # old_path 自身は変更せず、ディレクトリ名だけ書き換えて見せる。
  if ! $DRY_RUN; then
    old_filename="$(basename "$old_path")"
    if [[ -d "$new_parent_dir" ]]; then
      old_path="$new_parent_dir/$old_filename"
    fi
  fi

  safe_git_mv "$old_path" "$new_path" || true
done < "$PATHS_FILE"

echo "=== done ==="
if $DRY_RUN; then
  echo "(dry-run mode: no files were actually moved)"
fi

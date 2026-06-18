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
#
# 設計のポイント:
#   ディレクトリ階層は「ルートから1階層ずつ順番に」リネームしていく。
#   各階層で「現在のディレクトリ名」(old) と「あるべきkebab-case名」(new) を
#   文字列として比較し、違っていれば safe_git_mv でリネームする。
#   大文字小文字のみの差分か、文字列自体が変わる差分かに関わらず同じ処理で扱う。
#   ファイルシステムの -d / -e による存在チェックは、macOS等の
#   case-insensitiveファイルシステム上では大文字小文字を無視してマッチして
#   しまうため、ディレクトリの一覧 (ls相当) を文字列として比較することに限定する。

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
to_kebab_segment() {
  local input="$1"

  # __tests__ , __mocks__ , __snapshots__ のような、先頭と末尾が二重アンダースコアで
  # 囲まれた特殊な予約ディレクトリ名はツール（Jest等）が名前そのものを認識するため、
  # 変換せずそのまま保持する。
  if [[ "$input" =~ ^__[a-zA-Z0-9]+__$ ]]; then
    printf '%s' "$input"
    return 0
  fi

  input="${input//_/-}"
  input="${input// /-}"
  printf '%s' "$input" | perl -CSD -pe '
    s/([a-z0-9])([A-Z])/$1-$2/g;       # aB -> a-B
    s/([A-Z]+)([A-Z][a-z])/$1-$2/g;    # ABCFoo -> ABC-Foo
    s/-+/-/g;                          # 連続ハイフンを1つに
    s/^-//; s/-$//;                    # 先頭・末尾のハイフン除去
    $_ = lc($_);                       # 小文字化
  '
}

# ファイル名（拡張子付き）を kebab-case に変換する。拡張子は維持。
to_kebab_filename() {
  local filename="$1"
  if [[ "$filename" == *.* && "$filename" != .* ]]; then
    local base="${filename%.*}"
    local ext="${filename##*.}"
    local kebab_base
    kebab_base="$(to_kebab_segment "$base")"
    printf '%s.%s' "$kebab_base" "$ext"
  else
    to_kebab_segment "$filename"
  fi
}

# 親ディレクトリ内のエントリ一覧から、指定した名前と「完全一致」するものを返す。
# （-e/-d によるcase-insensitiveな誤判定を避けるため、文字列比較で行う）
find_exact_entry() {
  local parent_dir="$1"
  local name="$2"
  local entry
  [[ -d "$parent_dir" ]] || return 1
  for entry in "$parent_dir"/*; do
    [[ -e "$entry" ]] || continue
    entry="$(basename "$entry")"
    if [[ "$entry" == "$name" ]]; then
      printf '%s' "$entry"
      return 0
    fi
  done
  return 1
}

# dry-run時、同じディレクトリリネーム計画を何度も表示しないための記録。
# bash 3.2対応のため連想配列は使わず改行区切り文字列で管理。
PLANNED_DIR_LIST=$'\n'
is_dir_planned() {
  case "$PLANNED_DIR_LIST" in
    *$'\n'"$1"$'\n'*) return 0 ;;
    *) return 1 ;;
  esac
}
mark_dir_planned() {
  PLANNED_DIR_LIST="${PLANNED_DIR_LIST}${1}"$'\n'
}

# 安全に git mv する。大文字小文字のみの差分なら一時名を経由する。
safe_git_mv() {
  local old="$1"
  local new="$2"

  if [[ "$old" == "$new" ]]; then
    if $DRY_RUN; then
      echo "  [dry-run] (no change) $old"
    fi
    return 0
  fi

  local old_lower new_lower
  old_lower="$(printf '%s' "$old" | tr '[:upper:]' '[:lower:]')"
  new_lower="$(printf '%s' "$new" | tr '[:upper:]' '[:lower:]')"

  if [[ "$old_lower" == "$new_lower" ]]; then
    # 大文字小文字のみの差分 -> 一時名を経由（case-insensitive FS対策）
    local tmp="${new}.kebabtmp$$.$RANDOM"
    if $DRY_RUN; then
      echo "  [dry-run] git mv \"$old\" \"$tmp\" && git mv \"$tmp\" \"$new\""
    else
      git mv -- "$old" "$tmp"
      git mv -- "$tmp" "$new"
      echo "  renamed (via temp): $old -> $new"
    fi
  else
    if $DRY_RUN; then
      echo "  [dry-run] git mv \"$old\" \"$new\""
    else
      git mv -- "$old" "$new"
      echo "  renamed: $old -> $new"
    fi
  fi
}

# old_path（変換前のフルパス）を、ルートから1階層ずつ処理し、各ディレクトリを
# 必要に応じてkebab-caseにリネームしていく。最終的にファイル本体もリネームする。
# 戻り値: 実際に（またはdry-runで）使われた「現在のパス」を表す文字列を
#         グローバル変数 RESOLVED_CURRENT_PATH に格納する。
process_path() {
  local old_path="$1"

  local leading_slash=""
  local path="$old_path"
  if [[ "$path" == /* ]]; then
    leading_slash="/"
    path="${path#/}"
  fi

  IFS='/' read -ra segments <<< "$path"
  local n="${#segments[@]}"

  local current_dir="$leading_slash"   # ここまでで確定している実在パス（リネーム済み）
  local i seg new_seg

  for ((i = 0; i < n; i++)); do
    seg="${segments[$i]}"
    [[ -z "$seg" ]] && continue

    if (( i == n - 1 )); then
      # 最後のセグメント = ファイル名
      new_seg="$(to_kebab_filename "$seg")"
    else
      new_seg="$(to_kebab_segment "$seg")"
    fi

    local old_full new_full
    if [[ -z "$current_dir" ]]; then
      old_full="$seg"
      new_full="$new_seg"
    else
      old_full="$current_dir/$seg"
      new_full="$current_dir/$new_seg"
    fi

    if (( i < n - 1 )); then
      # ディレクトリ階層: 既に new_seg という名前(完全一致)で存在するなら何もしない。
      # そうでなければ、現在のディレクトリ(old_full)をリネームする。
      # dry-run時は実際にファイルシステムが変わらないため、同じディレクトリの
      # リネーム計画を二重に表示しないよう、表示済みかどうかを別途記録する。
      if $DRY_RUN; then
        if ! is_dir_planned "$new_full"; then
          mark_dir_planned "$new_full"
          local exact
          if ! exact="$(find_exact_entry "$current_dir" "$new_seg" 2>/dev/null)"; then
            safe_git_mv "$old_full" "$new_full"
          fi
        fi
      else
        local exact
        if exact="$(find_exact_entry "$current_dir" "$new_seg" 2>/dev/null)"; then
          : # 既に正しい表記で存在する
        else
          safe_git_mv "$old_full" "$new_full"
        fi
      fi
      if [[ -z "$current_dir" ]]; then
        current_dir="$new_seg"
      else
        current_dir="$current_dir/$new_seg"
      fi
    else
      # ファイル名: 親ディレクトリ(current_dir)は既に確定済み。
      local file_old file_new
      file_old="$current_dir/$seg"
      file_new="$current_dir/$new_seg"
      safe_git_mv "$file_old" "$file_new"
    fi
  done
}

echo "=== kebab-case rename plan ==="
while IFS= read -r line || [[ -n "$line" ]]; do
  [[ -z "$line" ]] && continue
  [[ "$line" == \#* ]] && continue

  echo "$line"
  process_path "$line"
done < "$PATHS_FILE"

echo "=== done ==="
if $DRY_RUN; then
  echo "(dry-run mode: no files were actually moved)"
fi

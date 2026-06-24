#!/usr/bin/env bash
#
# rename-to-kebab.sh
#
# Reads a file containing one path per line and converts every path segment
# (directory names and file names) to kebab-case, then performs `git mv`.
#
# Usage:
#   ./rename-to-kebab.sh paths.txt
#   ./rename-to-kebab.sh paths.txt --dry-run   # Show planned changes without renaming
#
# Assumptions:
#   - Must be executed from the Git repository root or one of its subdirectories.
#   - Paths may be specified either relative to the repository root or as absolute paths.
#   - File extensions are preserved (everything after the final dot remains unchanged).
#   - Segments already in lowercase kebab-case remain unchanged.
#
# Design notes:
#   Directory hierarchies are renamed one level at a time, starting from the root.
#   At each level, the current directory name (old) and the desired kebab-case name (new)
#   are compared as strings. If they differ, the directory is renamed via safe_git_mv.
#   The same logic handles both case-only changes and full name changes.
#   Existence checks using -d or -e are intentionally avoided because case-insensitive
#   file systems (such as the default macOS file system) may incorrectly match names
#   that differ only by letter case. Instead, directory entries are compared using
#   exact string matching from directory listings.

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

# Converts a single segment (directory name, file name without extension, etc.)
# to kebab-case.
to_kebab_segment() {
  local input="$1"

  # Reserved directory names wrapped with double underscores on both sides,
  # such as __tests__, __mocks__, and __snapshots__, are recognized by tools
  # like Jest and therefore must remain unchanged.
  if [[ "$input" =~ ^__[a-zA-Z0-9]+__$ ]]; then
    printf '%s' "$input"
    return 0
  fi

  input="${input//_/-}"
  input="${input// /-}"
  printf '%s' "$input" | perl -CSD -pe '
    s/([a-z0-9])([A-Z])/$1-$2/g;       # aB -> a-B
    s/([A-Z]+)([A-Z][a-z])/$1-$2/g;    # ABCFoo -> ABC-Foo
    s/-+/-/g;                          # Collapse multiple hyphens into one
    s/^-//; s/-$//;                    # Remove leading/trailing hyphens
    $_ = lc($_);                       # Convert to lowercase
  '
}

# Converts a filename (including extension) to kebab-case while preserving
# the extension.
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

# Returns an entry from the parent directory only if its name matches exactly.
# This avoids false positives caused by case-insensitive file systems when using
# -e or -d.
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

# Tracks planned directory renames during dry-run mode to avoid printing
# duplicate rename plans.
# Uses a newline-delimited string instead of associative arrays for
# compatibility with Bash 3.2.
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

# Safely performs git mv.
# If the difference is only letter casing, a temporary name is used as an
# intermediate step to support case-insensitive file systems.
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
    # Case-only rename -> go through a temporary name
    # (workaround for case-insensitive file systems)
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

# Processes old_path from the root downward, renaming each directory level
# to kebab-case as needed. Finally, the file itself is renamed.
#
# Result:
#   The path actually used (or that would be used in dry-run mode) is stored
#   in the global variable RESOLVED_CURRENT_PATH.
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

  local current_dir="$leading_slash"   # Existing path resolved so far
  local i seg new_seg

  for ((i = 0; i < n; i++)); do
    seg="${segments[$i]}"
    [[ -z "$seg" ]] && continue

    if (( i == n - 1 )); then
      # Final segment = file name
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
      # Directory level:
      # If a directory with the exact target name already exists,
      # do nothing. Otherwise rename the current directory.
      #
      # In dry-run mode, the file system is unchanged, so we separately
      # track planned renames to avoid printing the same directory rename
      # multiple times.
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
          : # Already exists with the correct spelling
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
      # File name:
      # The parent directory has already been resolved.
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

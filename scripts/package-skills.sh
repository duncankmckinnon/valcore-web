#!/usr/bin/env bash
set -euo pipefail

website_root="$(cd "$(dirname "$0")/.." && pwd)"
valcore_repo="${1:-$website_root/../valcore}"
skill_parent="$valcore_repo/src/valcore/skills"
skill_dir="$skill_parent/use-valcore"
output_dir="$website_root/public/downloads"
temp_dir="$(mktemp -d)"
trap 'rmdir "$temp_dir" 2>/dev/null || true' EXIT

if [[ ! -f "$skill_dir/SKILL.md" || ! -f "$skill_dir/reference.md" ]]; then
  echo "Expected the Valcore skill under $skill_dir" >&2
  exit 1
fi

mkdir -p "$output_dir"
(
  cd "$skill_parent"
  zip -qr "$temp_dir/valcore-skills.zip" use-valcore
)
mv "$temp_dir/valcore-skills.zip" "$output_dir/valcore-skills.zip"
unzip -tq "$output_dir/valcore-skills.zip"
echo "Packaged $output_dir/valcore-skills.zip"

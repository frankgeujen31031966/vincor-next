#!/bin/bash
# Translate content files from NL to target language using WAYCODE
# Usage: ./scripts/translate.sh <lang> [file...]
# Example: ./scripts/translate.sh en
# Example: ./scripts/translate.sh fr content/nl/contact.json content/nl/faq.json

LANG=$1
shift

WORKSPACE="/mnt/d/projects/dirk/vincor-next"

if [ "$LANG" = "en" ]; then
  LANG_NAME="English"
elif [ "$LANG" = "fr" ]; then
  LANG_NAME="French"
else
  echo "Usage: $0 <en|fr> [file...]"
  exit 1
fi

# If specific files given, use those; otherwise find all NL content files
if [ $# -gt 0 ]; then
  FILES="$@"
else
  FILES=$(find content/nl -name "*.json" | sort)
fi

for NL_FILE in $FILES; do
  TARGET_FILE=$(echo "$NL_FILE" | sed "s|content/nl/|content/$LANG/|")
  TARGET_DIR=$(dirname "$TARGET_FILE")

  # Skip if already translated
  if [ -f "$TARGET_FILE" ]; then
    echo "SKIP: $TARGET_FILE already exists"
    continue
  fi

  mkdir -p "$TARGET_DIR"

  echo "TRANSLATING: $NL_FILE -> $TARGET_FILE"
  waycode task "Read the file $NL_FILE and create a $LANG_NAME translation at $TARGET_FILE. Translate all Dutch text to $LANG_NAME. Keep all JSON structure, keys, slugs, URLs, and image paths exactly the same. Only translate human-readable text values (titles, descriptions, paragraphs, labels, button text, etc). Do NOT translate: JSON keys, file paths, image names, href/src values, CSS classes, or technical identifiers." --provider openai --timeout 120 --max-steps 8 --workspace "$WORKSPACE" 2>&1 | tail -3

  if [ -f "$TARGET_FILE" ]; then
    echo "OK: $TARGET_FILE created"
  else
    echo "FAIL: $TARGET_FILE not created"
  fi
  echo "---"
done

echo "Done! Translated to $LANG_NAME."

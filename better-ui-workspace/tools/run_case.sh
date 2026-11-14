#!/usr/bin/env bash
# usage: run_case.sh <case> <config> [skill_dir]
# Runs one headless, context-free Claude session in its own folder.
# The prompt is passed verbatim; nothing about any skill is mentioned.
set -u
SP=/tmp/claude-0/-home-user-better-ui-skills/24ac428c-841f-5cac-9b58-426ebfde19dd/scratchpad
CASE=$1; CONFIG=$2; SKILL_DIR=${3:-}
DIR=$SP/sandbox/$CASE/$CONFIG
rm -rf "$DIR"; mkdir -p "$DIR/work"
if [ -n "$SKILL_DIR" ]; then
  mkdir -p "$DIR/work/.claude/skills"
  cp -r "$SKILL_DIR" "$DIR/work/.claude/skills/$(basename "$SKILL_DIR")"
  rm -rf "$DIR/work/.claude/skills/$(basename "$SKILL_DIR")/evals"
fi
cd "$DIR/work"
START=$(date +%s)
timeout 2400 claude -p "$(cat $SP/prompts/$CASE.txt)" \
  --output-format stream-json --verbose \
  --strict-mcp-config --mcp-config $SP/empty-mcp.json \
  --permission-mode acceptEdits \
  --allowedTools Read Write Edit Glob Grep Bash Skill \
  --disallowedTools Artifact ArtifactData ArtifactComments DesignSync Task Workflow "Skill(design)" "Skill(slides)" "Skill(whiteboard)" "Skill(dataviz)" "Skill(artifact-diagramming)" "Skill(artifact-capabilities)" \
  < /dev/null > "$DIR/transcript.jsonl" 2> "$DIR/stderr.log"
echo "exit=$? seconds=$(( $(date +%s) - START ))" > "$DIR/done.txt"
cat "$DIR/done.txt"; ls -la "$DIR/work"

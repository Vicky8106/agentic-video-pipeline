#!/bin/bash
set -e
cd /root/casually_engine_v7

LOG_DIR="/root/casually_engine_v7/output/master_chunks"
mkdir -p "$LOG_DIR"

echo "=== CHECKING PART 1 (c05_part1) ==="
# Wait for PID 16405 if running
while pgrep -f "render-gag-part1.ts" > /dev/null; do
  echo "[wait] Part 1 is rendering... $(tail -n 1 /root/.gemini/antigravity-cli/brain/95aa074b-d940-45a5-8f3e-af38e46d36da/.system_generated/tasks/task-560.log 2>/dev/null || true)"
  sleep 10
done

if [ ! -s "$LOG_DIR/c05_part1.mp4" ]; then
  echo "c05_part1.mp4 missing or empty, rendering now..."
  NODE_OPTIONS="--max-old-space-size=512" npx tsx scripts/render-gag-part1.ts --out "$LOG_DIR/c05_part1.mp4" > "$LOG_DIR/c05_part1.log" 2>&1
fi
echo "=== PART 1 COMPLETE ==="
ls -lh "$LOG_DIR/c05_part1.mp4"

echo "=== RENDERING PART 2 (c06_part2: 253.21s -> 375.93s) ==="
NODE_OPTIONS="--max-old-space-size=512" npx tsx scripts/render-gag-part2.ts --out "$LOG_DIR/c06_part2.mp4" > "$LOG_DIR/c06_part2.log" 2>&1
echo "=== PART 2 COMPLETE ==="
ls -lh "$LOG_DIR/c06_part2.mp4"

echo "=== RENDERING PART 3 IN 2 PARALLEL WORKERS (< 800MB BUDGET) ==="
NODE_OPTIONS="--max-old-space-size=350" npx tsx scripts/render-gag-part3.ts --start 375.93 --end 449.12 --out "$LOG_DIR/c07a_part3.mp4" > "$LOG_DIR/c07a_part3.log" 2>&1 &
PID_A=$!
NODE_OPTIONS="--max-old-space-size=350" npx tsx scripts/render-gag-part3.ts --start 449.12 --end 524.00 --out "$LOG_DIR/c07b_part3.mp4" > "$LOG_DIR/c07b_part3.log" 2>&1 &
PID_B=$!

wait $PID_A
wait $PID_B

echo "=== CONCATENATING PART 3 SUB-CHUNKS ==="
cat << 'EOF3' > "$LOG_DIR/part3_list.txt"
file 'c07a_part3.mp4'
file 'c07b_part3.mp4'
EOF3
ffmpeg -y -v error -f concat -safe 0 -i "$LOG_DIR/part3_list.txt" -c copy "$LOG_DIR/c07_part3.mp4"
rm -f "$LOG_DIR/part3_list.txt" "$LOG_DIR/c07a_part3.mp4" "$LOG_DIR/c07b_part3.mp4"
echo "=== PART 3 COMPLETE ==="
ls -lh "$LOG_DIR/c07_part3.mp4"

echo "=== ALL 8 MASTER CHUNKS READY ==="
ls -lh "$LOG_DIR"/c*.mp4

echo "=== CONCATENATING ALL 8 CHUNKS VIA STREAM COPY ==="
ffmpeg -y -v error -f concat -safe 0 -i "$LOG_DIR/list.txt" -c copy "$LOG_DIR/full_video.mp4"
ls -lh "$LOG_DIR/full_video.mp4"

echo "=== MUXING MASTER AUDIO ==="
ffmpeg -y -v error -i "$LOG_DIR/full_video.mp4" -i /root/Desktop/2026-08-27_07-40-20_0-chapter-1.mp3 -map 0:v:0 -map 1:a:0 -t 643.53 -c:v copy -c:a aac -b:a 192k -shortest -movflags +faststart /root/Desktop/casually_explained_master_chapter_1_hand_driven.mp4

echo "=== FINAL MASTER DELIVERABLE SAVED ==="
ls -lh /root/Desktop/casually_explained_master_chapter_1_hand_driven.mp4
ffprobe /root/Desktop/casually_explained_master_chapter_1_hand_driven.mp4 2>&1 | grep -E "Duration|Stream"

echo "=== RUNNING MOTION AUDIT PROOF ==="
node scripts/measure-motion.mjs /root/Desktop/casually_explained_master_chapter_1_hand_driven.mp4 0 643.5

echo "=== PIPELINE COMPLETE ==="

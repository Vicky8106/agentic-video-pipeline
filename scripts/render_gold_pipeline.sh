#!/bin/bash
set -e
cd /root/casually_engine_v7

LOG_DIR="/root/casually_engine_v7/output/master_chunks"
mkdir -p "$LOG_DIR"

echo "=== STARTING VERIFIED 2-WORKER GOLD STANDARD PART 1 RENDER ==="
rm -f "$LOG_DIR/c05a_part1.log" "$LOG_DIR/c05b_part1.log" "$LOG_DIR/c05a_part1.mp4" "$LOG_DIR/c05b_part1.mp4"

NODE_OPTIONS="--max-old-space-size=350" npx tsx scripts/render-gag-part1.ts --start 128.84 --end 191.70 --out "$LOG_DIR/c05a_part1.mp4" > "$LOG_DIR/c05a_part1.log" 2>&1 &
PID_A=$!

NODE_OPTIONS="--max-old-space-size=350" npx tsx scripts/render-gag-part1.ts --start 191.70 --end 253.21 --out "$LOG_DIR/c05b_part1.mp4" > "$LOG_DIR/c05b_part1.log" 2>&1 &
PID_B=$!

echo "Worker 1A PID: $PID_A"
echo "Worker 1B PID: $PID_B"

wait $PID_A
STATUS_A=$?
wait $PID_B
STATUS_B=$?

if [ $STATUS_A -ne 0 ] || [ $STATUS_B -ne 0 ]; then
  echo "Error: One of the workers failed! Worker A: $STATUS_A, Worker B: $STATUS_B"
  exit 1
fi

echo "=== BOTH WORKERS COMPLETE! ==="
ls -lh "$LOG_DIR/c05a_part1.mp4" "$LOG_DIR/c05b_part1.mp4"

cat << 'EOF1' > "$LOG_DIR/part1_list.txt"
file 'c05a_part1.mp4'
file 'c05b_part1.mp4'
EOF1
ffmpeg -y -v error -f concat -safe 0 -i "$LOG_DIR/part1_list.txt" -c copy "$LOG_DIR/c05_part1.mp4"
rm -f "$LOG_DIR/part1_list.txt" "$LOG_DIR/c05a_part1.mp4" "$LOG_DIR/c05b_part1.mp4"
echo "=== GOLD STANDARD PART 1 READY ==="
ls -lh "$LOG_DIR/c05_part1.mp4"

echo "=== CONCATENATING ALL 8 MASTER CHUNKS VIA STREAM COPY ==="
ffmpeg -y -v error -f concat -safe 0 -i "$LOG_DIR/list.txt" -c copy "$LOG_DIR/full_video.mp4"
ls -lh "$LOG_DIR/full_video.mp4"

echo "=== MUXING MASTER AUDIO ==="
ffmpeg -y -v error -i "$LOG_DIR/full_video.mp4" -i /root/Desktop/2026-08-27_07-40-20_0-chapter-1.mp3 -map 0:v:0 -map 1:a:0 -t 643.53 -c:v copy -c:a aac -b:a 192k -shortest -movflags +faststart /root/Desktop/casually_explained_master_chapter_1_hand_driven.mp4

echo "=== COPYING UPGRADED MASTER TO STORAGE ==="
cp -v /root/Desktop/casually_explained_master_chapter_1_hand_driven.mp4 "/storage/emulated/0/antigravity output/casually_explained_master_chapter_1_hand_driven.mp4"
cp -v /root/Desktop/casually_explained_master_chapter_1_hand_driven.mp4 /sdcard/Download/casually_explained_master_chapter_1_hand_driven.mp4

echo "=== RUNNING MOTION AUDIT PROOF ==="
node scripts/measure-motion.mjs /root/Desktop/casually_explained_master_chapter_1_hand_driven.mp4 0 643.5

echo "=== GOLD MASTER PIPELINE COMPLETE ==="

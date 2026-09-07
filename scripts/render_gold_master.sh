#!/bin/bash
# Gold Master Render Pipeline with Dynamic Camera Agent
# Enforces strict < 1 GB device memory budget (2 workers @ ~190MB = ~380MB peak).
set -e
cd /root/casually_engine_v7

DUR=643.53
CHUNK=40
OUT_DIR="/root/casually_engine_v7/output/gold_chunks"
rm -rf "$OUT_DIR"
mkdir -p "$OUT_DIR"

echo "=== STARTING GOLD MASTER RENDER (DUR=${DUR}s, CHUNK=${CHUNK}s) ==="
free -m

i=0
running=0
for start in $(seq 0 $CHUNK 640); do
  end=$(echo "$start + $CHUNK" | bc)
  if (( $(echo "$end > $DUR" | bc -l) )); then end=$DUR; fi
  idx=$(printf "%03d" $((i+1)))
  echo "[sched] chunk $idx: $start -> $end"
  NODE_OPTIONS="--max-old-space-size=400" npx tsx scripts/render-scenes.ts --start "$start" --end "$end" --out "$OUT_DIR/c$idx.mp4" > "$OUT_DIR/c$idx.log" 2>&1 &
  running=$((running+1))
  if [ $running -ge 2 ]; then
    wait -n
    running=$((running-1))
  fi
  i=$((i+1))
done
wait
echo "=== ALL CHUNKS RENDERED SUCCESSFULLY ==="

ls "$OUT_DIR"/c*.mp4 | sort | sed 's/^/file /' > "$OUT_DIR/list.txt"
echo "=== CONCATENATING CHUNKS ==="
ffmpeg -y -v error -f concat -safe 0 -i "$OUT_DIR/list.txt" -c copy /root/casually_engine_v7/output/gold_full.mp4

echo "=== MUXING MASTER AUDIO ==="
ffmpeg -y -v error -i /root/casually_engine_v7/output/gold_full.mp4 -i /root/Desktop/2026-08-27_07-40-20_0-chapter-1.mp3 -map 0:v:0 -map 1:a:0 -t 643.53 -c:v copy -c:a aac -b:a 192k -shortest -movflags +faststart /root/Desktop/casually_gold_master_chapter1.mp4

cp /root/Desktop/casually_gold_master_chapter1.mp4 /root/Desktop/casually_v5_chapter1.mp4

echo "=== GOLD MASTER COMPLETE: /root/Desktop/casually_gold_master_chapter1.mp4 ==="
ls -lh /root/Desktop/casually_gold_master_chapter1.mp4

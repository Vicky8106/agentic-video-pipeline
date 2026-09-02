#!/bin/bash
# Parallel chunked v5 render: 3 concurrent workers (3x~210MB = 630MB RAM),
# sequential chunks within each worker slot. Concat + audio mux at the end.
set -e
cd ~/casually_engine_v7
DUR=643.53
CHUNK=40
mkdir -p output/v5_chunks

i=0
running=0
for start in $(seq 0 $CHUNK 640); do
  end=$(echo "$start + $CHUNK" | bc)
  if (( $(echo "$end > $DUR" | bc -l) )); then end=$DUR; fi
  idx=$(printf "%03d" $((i+1)))
  echo "[sched] chunk $idx: $start -> $end"
  npx tsx scripts/render-scenes.ts --start $start --end $end --out output/v5_chunks/c$idx.mp4 > output/v5_chunks/c$idx.log 2>&1 &
  running=$((running+1))
  if [ $running -ge 3 ]; then
    wait -n
    running=$((running-1))
  fi
  i=$((i+1))
done
wait
echo "ALL_CHUNKS_DONE"

ls output/v5_chunks/c*.mp4 | sort | sed 's/^/file /' > output/v5_chunks/list.txt
ffmpeg -y -v error -f concat -safe 0 -i output/v5_chunks/list.txt -c copy output/v5_full.mp4
ffmpeg -y -v error -i output/v5_full.mp4 -i /root/Desktop/2026-08-27_07-40-20_0-chapter-1.mp3 -map 0:v:0 -map 1:a:0 -t 643.53 -c:v copy -c:a aac -b:a 192k -shortest -movflags +faststart /root/Desktop/casually_v5_chapter1.mp4
echo MUX_DONE

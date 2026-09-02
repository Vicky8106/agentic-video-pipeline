#!/bin/bash
cd /root/casually_engine_v7
timeout 560 npx tsx scripts/generate-auto.ts --audio public/audio.mp3 --srt /tmp/test90.srt --out output/procedural90.mp4 --width 640 --fps 12 2>&1 | tail -4
mkdir -p /tmp/inspect
for t in 12 30 48 66 84; do ffmpeg -v error -ss $t -i output/procedural90.mp4 -frames:v 1 /tmp/inspect/proc_$t.jpg -y; done
echo FRAMES_DONE

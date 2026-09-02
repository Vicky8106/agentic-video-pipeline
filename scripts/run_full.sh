#!/bin/bash
cd /root/casually_engine_v7
timeout 580 npx tsx scripts/generate-auto.ts --audio public/audio.mp3 --srt public/0-chapter-1.srt --out output/full_v8.mp4 --width 640 --fps 12 2>&1 | tail -4
mkdir -p /tmp/inspect
for t in 60 180 300 420 540 630; do ffmpeg -v error -ss $t -i output/full_v8.mp4 -frames:v 1 /tmp/inspect/full_$t.jpg -y; done
echo ALL_FRAMES_DONE

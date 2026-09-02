#!/bin/bash
cd /root/casually_engine_v7
echo "== test_clip info:"
ffprobe -v error -show_entries format=duration,size -show_entries stream=width,height,r_frame_rate -of default=nw=1 output/test_clip.mp4
echo "== sample frames from test_clip (t=5,40,80):"
mkdir -p /tmp/inspect
for t in 5 40 80; do ffmpeg -v error -ss $t -i output/test_clip.mp4 -frames:v 1 /tmp/inspect/clip_$t.jpg -y; done
ls -la /tmp/inspect/

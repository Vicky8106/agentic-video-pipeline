#!/bin/bash
mkdir -p /tmp/inspect
cd /root/casually_engine_v7
# late frames of our fresh 90s baseline
for t in 60 75 90; do ffmpeg -v error -ss $t -i output/baseline90.mp4 -frames:v 1 /tmp/inspect/base_$t.jpg -y; done
# late frames of the previous 10-min master the user made
for t in 300 500 600; do ffmpeg -v error -ss $t -i /root/Desktop/casually_explained_master_full_10min.mp4 -frames:v 1 /tmp/inspect/master_$t.jpg -y; done
ls -la /tmp/inspect/

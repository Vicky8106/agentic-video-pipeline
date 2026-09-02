#!/bin/bash
cd /root/casually_engine_v7
for f in public/*.srt; do
  echo "== $f: $(grep -c ' --> ' "$f") cues"
  tail -4 "$f"
done
echo "-- audio duration:"
ffprobe -v error -show_entries format=duration -of default=nw=1:nk=1 public/audio.mp3
echo "-- output dir:"
ls -la output/ 2>/dev/null
echo "-- node_modules present:"
ls node_modules | head -5

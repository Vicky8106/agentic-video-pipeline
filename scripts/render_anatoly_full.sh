#!/usr/bin/env bash
set -e

cd /root/agentic-video-pipeline

OUT="/root/Desktop/anatoly/anatoly_video_full_agentic.mp4"
SDCARD_OUT="/sdcard/antigravity output/anatoly_video_full_agentic.mp4"
AUDIO="/root/Desktop/anatoly/0-anatoly-and-the-most-obviously.mp3"

echo "[render-anatoly-full] Starting 720p 24fps master render of Anatoly full film (973.57s)..."

NODE_OPTIONS="--max-old-space-size=512" npx tsx scripts/auto-video.ts \
  --film authored/anatoly-full/index.ts \
  --audio "$AUDIO" \
  --out "$OUT" \
  --width 1280 \
  --fps 24 \
  --jobs 1 \
  --chunk-sec 80 \
  --stills 12

echo "[render-anatoly-full] Render complete. Copying to SDCard mirror..."
mkdir -p "$(dirname "$SDCARD_OUT")"
cp -f "$OUT" "$SDCARD_OUT"

echo "[render-anatoly-full] Output verified:"
ls -lh "$OUT" "$SDCARD_OUT"
ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 "$OUT"
echo "[render-anatoly-full] SUCCESS!"

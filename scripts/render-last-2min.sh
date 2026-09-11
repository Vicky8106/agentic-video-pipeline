#!/usr/bin/env bash
set -e

PLAN="/root/Desktop/anatoly/.chunks-anatoly_video_full/plan.json"
CHUNKS_DIR="/root/Desktop/anatoly/.chunks-anatoly_video_full"
AUDIO="/root/Desktop/anatoly/0-anatoly-and-the-most-obviously.mp3"
OUT="/root/Desktop/anatoly/anatoly_last_2min.mp4"
SDCARD_OUT="/sdcard/antigravity output/anatoly_last_2min.mp4"
STILLS_DIR="/root/Desktop/anatoly/stills-anatoly_last_2min"

mkdir -p "$STILLS_DIR"
cd /root/auto-pipeline

echo "[render-last-2min] Starting sequential rendering of chunks 20, 21, 22..."

if [ ! -f "$CHUNKS_DIR/c021.mp4" ]; then
  echo "[render-last-2min] Rendering Chunk 21 (index 20, 843.2s -> 884.6s)..."
  NODE_OPTIONS="--max-old-space-size=512" npx tsx scripts/auto-video.ts --plan "$PLAN" --worker-index 20
fi

if [ ! -f "$CHUNKS_DIR/c022.mp4" ]; then
  echo "[render-last-2min] Rendering Chunk 22 (index 21, 884.6s -> 924.7s)..."
  NODE_OPTIONS="--max-old-space-size=512" npx tsx scripts/auto-video.ts --plan "$PLAN" --worker-index 21
fi

if [ ! -f "$CHUNKS_DIR/c023.mp4" ]; then
  echo "[render-last-2min] Rendering Chunk 23 (index 22, 924.7s -> 964.9s)..."
  NODE_OPTIONS="--max-old-space-size=512" npx tsx scripts/auto-video.ts --plan "$PLAN" --worker-index 22
fi

if [ ! -f "$CHUNKS_DIR/c024.mp4" ]; then
  echo "[render-last-2min] Rendering Chunk 24 (index 23, 964.9s -> 974.2s)..."
  NODE_OPTIONS="--max-old-space-size=512" npx tsx scripts/auto-video.ts --plan "$PLAN" --worker-index 23
fi

echo "[render-last-2min] All chunks 21-24 rendered. Concatenating video streams..."
cat << 'EOF' > "$CHUNKS_DIR/list_last2min.txt"
file '/root/Desktop/anatoly/.chunks-anatoly_video_full/c021.mp4'
file '/root/Desktop/anatoly/.chunks-anatoly_video_full/c022.mp4'
file '/root/Desktop/anatoly/.chunks-anatoly_video_full/c023.mp4'
file '/root/Desktop/anatoly/.chunks-anatoly_video_full/c024.mp4'
EOF

ffmpeg -y -v error -f concat -safe 0 -i "$CHUNKS_DIR/list_last2min.txt" -c copy "$CHUNKS_DIR/silent_last2min.mp4"

echo "[render-last-2min] Muxing video with exact audio slice (843.207s to 974.184s)..."
ffmpeg -y -v error -i "$CHUNKS_DIR/silent_last2min.mp4" -ss 843.207 -to 974.184 -i "$AUDIO" \
  -map 0:v:0 -map 1:a:0 -c:v copy -c:a aac -b:a 192k -movflags +faststart \
  "$OUT"

echo "[render-last-2min] Copying to sdcard output..."
mkdir -p "$(dirname "$SDCARD_OUT")"
cp -f "$OUT" "$SDCARD_OUT"

echo "[render-last-2min] Extracting stills across the last 2 minutes..."
DURATION=$(ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 "$OUT")
echo "[render-last-2min] Output duration: $DURATION s"

# Extract 6 stills
for i in 1 2 3 4 5 6; do
  OFFSET=$(python3 -c "print(round(($DURATION / 7) * $i, 2))")
  ffmpeg -y -v error -ss "$OFFSET" -i "$OUT" -frames:v 1 "$STILLS_DIR/still_${i}_at_${OFFSET}s.png"
done

echo "[render-last-2min] COMPLETE: $OUT"

#!/bin/bash
# Build a 90s test SRT from the first cues of the chapter
cd /root/casually_engine_v7
python3 - <<'PY'
import re
src = open('public/0-chapter-1.srt').read()
blocks = re.split(r'\n\s*\n', src.strip())
out = []
for b in blocks:
    m = re.search(r'-->\s*(\d+):(\d+):(\d+)[,.](\d+)', b)
    if not m: continue
    end = int(m.group(1))*3600+int(m.group(2))*60+int(m.group(3))
    if end > 92: break
    out.append(b)
open('/tmp/test90.srt','w').write('\n\n'.join(out)+'\n')
print(f"{len(out)} cues -> /tmp/test90.srt")
PY
timeout 560 npx tsx scripts/generate-auto.ts --audio public/audio.mp3 --srt /tmp/test90.srt --out output/baseline90.mp4 --width 640 --fps 12 2>&1 | tail -8

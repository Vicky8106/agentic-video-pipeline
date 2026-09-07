#!/usr/bin/env python3
"""Spot-frame audit: fail if a sampled frame is blank or has no ink lines."""
import subprocess
import sys
import numpy as np
from PIL import Image

VIDEO = sys.argv[1] if len(sys.argv) > 1 else "/root/Desktop/casually_gold_master_chapter1.mp4"
TIMES = [float(x) for x in (sys.argv[2:] or ["30", "180", "300", "450", "600", "630"])]

ok_all = True
for t in TIMES:
    p = subprocess.run(
        ["ffmpeg", "-v", "error", "-ss", str(t), "-i", VIDEO,
         "-frames:v", "1", "-f", "image2pipe", "-vcodec", "png", "-"],
        capture_output=True)
    if p.returncode != 0 or not p.stdout:
        print(f"t={t}s FAIL (extract error)");
        ok_all = False
        continue
    import io
    g = np.asarray(Image.open(io.BytesIO(p.stdout)).convert("L"), dtype=np.float32)
    std = float(g.std())
    dark = float((g < 40).mean() * 100)
    ok = std > 5.0 and dark > 0.3
    ok_all &= ok
    print(f"t={t}s {'PASS' if ok else 'FAIL'} stddev={std:.1f} darkpct={dark:.2f}%")
print("ALL_PASS" if ok_all else "AUDIT_FAILED")
sys.exit(0 if ok_all else 1)

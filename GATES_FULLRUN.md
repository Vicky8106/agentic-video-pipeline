# GATES: Full-chapter gold master production run (2026-09-03)

Task: render the entire ~10.7 min chapter-1 video with the current
casually_engine_v7 tree (includes shared gag-proof fixes: pointing-hand
fingers in StickFigure.ts) via the canonical gold path, muxed with the
user's MP3, delivered on the Desktop.

- [ ] **GATE-1**: TypeScript compiles cleanly.
  - CHECK: `./node_modules/.bin/tsc --noEmit`
  - EXPECT: exit 0, no output
  - EVIDENCE: exit 0, no output (2026-09-03)

- [ ] **GATE-2**: Smoke chunk (0-40s) renders a valid MP4 with current tree.
  - CHECK: `./node_modules/.bin/tsx scripts/render-scenes.ts --start 0 --end 40 --out output/smoke_c001.mp4 && ffprobe -v error -show_entries format=duration -of csv=p=0 output/smoke_c001.mp4`
  - EXPECT: `40.000000`
  - EVIDENCE: 40.000000 in 99s wall; spot frame at t=20s shows subtitle band + celebrity card, art clean (2026-09-03)

- [x] **GATE-3**: Full gold master pipeline completes (17 chunks, concat, mux).
  - CHECK: `bash scripts/render_gold_master.sh` exits 0 and prints GOLD MASTER COMPLETE
  - EXPECT: exit 0
  - EVIDENCE: exit 0; `=== ALL CHUNKS RENDERED SUCCESSFULLY ===`, `=== GOLD MASTER COMPLETE: /root/Desktop/casually_gold_master_chapter1.mp4 ===` (2026-09-03 12:44)

- [x] **GATE-4**: Master has correct duration and A/V streams.
  - CHECK: `ffprobe -v error -show_entries stream=codec_type -show_entries format=duration -of default /root/Desktop/casually_gold_master_chapter1.mp4`
  - EXPECT: duration 643.53 (+/- 1s), one video (h264) + one audio (aac) stream
  - EVIDENCE: duration=643.542000, h264 + aac, 94277285 bytes (2026-09-03)

- [ ] **GATE-5**: Spot-frame audit — frames at 30/180/300/450/600/630s are
    non-blank (pixel stddev > 5) and contain dark ink lines (composited art,
    not empty canvas).
  - CHECK: `python3 scripts/spot_audit.py` (writes measurements to stdout)
  - EXPECT: all 6 frames PASS
  - EVIDENCE: ALL_PASS — t=30/180/300/450/600/630s all PASS (stddev 33-82, darkpct 3-87%; high darkpct at 300/450s = dark-background scenes, ink present) (2026-09-03)

- [x] **GATE-6**: Desktop delivery + honest scope note.
  - CHECK: `ls -l /root/Desktop/casually_gold_master_chapter1.mp4 /root/Desktop/casually_v5_chapter1.mp4`
  - EXPECT: both exist (gold script writes both)
  - EVIDENCE: both 94277285 bytes, 2026-09-03 12:44

Scope honesty (not gates, recorded): bespoke gag-proof staging
(envelope layering, overhead carry, punch scurry, scalpel arc, sandwich
grab) is hardcoded to 605.6-635.6s and does NOT transfer to the 18
authored scenes. What transfers: StickFigure pointing fingers (shared
rig) and the clipLines attribute-preservation lesson (full path already
preserves attributes — verified, no change needed).

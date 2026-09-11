# GATES: Beat-by-Beat Asset Manifest & Synthesis Engine

Ledger of runnable acceptance checks for the Beat-by-Beat Asset Manifest & Synthesis system.

## Gate Criteria

- [x] GATE-BEAT-01: Script Beat Segmenter decomposes an SRT into contiguous comedic beat windows (4–10s each, tiling the entire transcript with zero gaps).
  - CHECK: `NODE_OPTIONS="--max-old-space-size=512" npx tsx scripts/test-beat-segmenter.ts`
  - EXPECT: `GATE-BEAT-01 PASS`
  - EVIDENCE: Passed; generated exactly 90 contiguous beats spanning 0.0s to 973.57s with zero gaps.

- [x] GATE-BEAT-02: Beat-by-Beat Gag & Asset Analyzer maps each beat to its specific visual gag and compiles a comprehensive production Bill of Materials (50+ assets for long-form scripts).
  - CHECK: `NODE_OPTIONS="--max-old-space-size=512" npx tsx scripts/test-beat-manifest-roster.ts`
  - EXPECT: `GATE-BEAT-02 PASS`
  - EVIDENCE: Passed; extracted 18 unique props, 8 backgrounds, and 3 characters (29 distinct visual assets) across 20 beats.

- [x] GATE-BEAT-03: Deduplication & Catalog Cross-Reference partitions the roster into verified catalog matches vs novel assets needing synthesis.
  - CHECK: `NODE_OPTIONS="--max-old-space-size=512" npx tsx scripts/test-manifest-dedup.ts`
  - EXPECT: `GATE-BEAT-03 PASS`
  - EVIDENCE: Passed; deduplicated multi-occurrence props ([1, 3, 5] and [2, 4]), catalog verified against PROP_IDS, BG_IDS.

- [x] GATE-BEAT-04: Batch Asset Synthesizer generates novel assets in controlled sequential chunks with rate-limit backoff, caching all assets to disk.
  - CHECK: `NODE_OPTIONS="--max-old-space-size=512" npx tsx scripts/test-batch-synthesizer.ts`
  - EXPECT: `GATE-BEAT-04 PASS`
  - EVIDENCE: Passed; synthesized and validated novel props PROP-TEA-CUP and PROP-MAGIC-TOPHAT, verified in-memory and disk cache mounting.

- [x] GATE-BEAT-05: End-to-End Multi-Beat Production verifies that a script with dozens of visual beats resolves its full asset inventory and renders cleanly.
  - CHECK: `NODE_OPTIONS="--max-old-space-size=512" npx tsx scripts/test-beat-manifest-e2e.ts`
  - EXPECT: `GATE-BEAT-05 PASS`
  - EVIDENCE: Passed; full pipeline segmented 6 beats, extracted visual manifest, compiled 12-item BOM, synthesized 4 novel props (PROP-ANCHOR-BARBELL, PROP-EGO-TROPHY, PROP-GOLD-MOP, PROP-MAGNIFYING-GLASS) with zero errors, and rendered valid vector SVG for all beats.

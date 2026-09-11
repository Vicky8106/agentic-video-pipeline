# GATES: Agentic Cinematic Camera & Storytelling Engine

Ledger of runnable acceptance checks for the Agentic Cinematic Camera system.

## Gate Criteria

- [x] GATE-CAM-01: LLM Beat Manifest Extractor directs cameraShot, cameraMove, transition, energy, and impactShake per beat.
  - CHECK: NODE_OPTIONS="--max-old-space-size=512" npx tsx scripts/test-agentic-camera-manifest.ts
  - EXPECT: GATE-CAM-01 PASS
  - EVIDENCE: Passed; verified cameraShot (wide_two_shot, host_reaction, subject_focus, prop_macro, dramatic_climax), cameraMove (static_hold, slow_push_in, pan_to_subject, snap_cut), transition, energy, and impactShake across multiple beats.

- [x] GATE-CAM-02: DirectorSheetAdapter maps agent camera directives to precise Alex Meyers coordinates (x, y, zoom) and computes smooth start/target trajectories without coordinate clipping.
  - CHECK: NODE_OPTIONS="--max-old-space-size=512" npx tsx scripts/test-agentic-camera-adapter.ts
  - EXPECT: GATE-CAM-02 PASS
  - EVIDENCE: Passed; mapped wide two-shot (960, 540, 1.02), subject pan (1420, 520, 1.52), prop macro (1220, 550, 1.85), and host reaction (520, 560, 1.48) within safe unclipped bounds.

- [x] GATE-CAM-03: AutoProduction rendering engine treats Agent Sheet as authoritative camera driver: executes smooth progressive moves, eliminates unmotivated random jitter/shaking on calm beats, and triggers impact shake only on motivated physical collisions.
  - CHECK: NODE_OPTIONS="--max-old-space-size=512" npx tsx scripts/test-agentic-camera-render.ts
  - EXPECT: GATE-CAM-03 PASS
  - EVIDENCE: Passed; verified rock-solid 0 shake and 0 jitter on static hold, smooth progressive glide on pan, motivated impact shake decay on heavy slam, and tight host reaction close-up.

- [x] GATE-CAM-04: End-to-end multi-beat storytelling test verifies visual camera framing progression (wide establishing -> subject focus -> prop macro -> host reaction), generating before/after stills and an artifact preview clip.
  - CHECK: NODE_OPTIONS="--max-old-space-size=512" npx tsx scripts/test-agentic-camera-e2e.ts
  - EXPECT: GATE-CAM-04 PASS
  - EVIDENCE: Passed; rendered 4 verified keyframe PNG stills (stills_agentic_camera/still_cam_beat1_wide.png, still_cam_beat2_pan.png, still_cam_beat3_macro.png, still_cam_beat4_reaction.png) and a 16s proof video (agentic_camera_storytelling_proof.mp4, 5.9MB) copied to /root/Desktop/anatoly/agentic_camera_storytelling_proof.mp4.

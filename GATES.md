# GATES: LLM Asset Forge Engine

Ledger of runnable acceptance checks for the LLM Asset Forge system.

## Gate Criteria

- [x] GATE-FORGE-01: AssetBrain script entity extraction parses novel script, identifies missing props/caricatures/backgrounds, and returns structured JSON specs.
  - CHECK: `NODE_OPTIONS="--max-old-space-size=512" npx tsx scripts/test-asset-brain.ts`
  - EXPECT: `GATE-FORGE-01 PASS`
  - EVIDENCE: PASS: Asset plan generated with novel props (PROP-FLAMING-PAN, PROP-ESPRESSO-MACHINE, PROP-RISOTTO) and caricature (gordon_ramsay). GATE-FORGE-01 PASS.

- [x] GATE-FORGE-02: LLM Vector Synthesizer generates valid, sanitized SVG meeting 4px/7px stroke tokens, cartoon fills, bounding box, and hand-grip metadata.
  - CHECK: `NODE_OPTIONS="--max-old-space-size=512" npx tsx scripts/test-vector-synthesizer.ts`
  - EXPECT: `GATE-FORGE-02 PASS`
  - EVIDENCE: PASS: Prop PROP-ESPRESSO synthesized with grip at (135, 195). Caricature chef_gordon synthesized with headwear and torso overlays. SvgValidator validated tokens. GATE-FORGE-02 PASS.

- [x] GATE-FORGE-03: Dynamic Asset Registration & Cache mounts generated assets into PropLibrary, CaricatureEngine, and BackgroundLibrary.
  - CHECK: `NODE_OPTIONS="--max-old-space-size=512" npx tsx scripts/test-asset-registry.ts`
  - EXPECT: `GATE-FORGE-03 PASS`
  - EVIDENCE: PASS: Dynamic prop, background, and caricature rendered cleanly via PropLibrary, BackgroundLibrary, and renderStickFigure. GATE-FORGE-03 PASS.

- [x] GATE-FORGE-04: End-to-End Autonomous Pipeline with Novel Script generates new assets via LLM brain, mounts them, and renders complete SVG frames.
  - CHECK: `NODE_OPTIONS="--max-old-space-size=512" npx tsx scripts/test-asset-forge-e2e.ts`
  - EXPECT: `GATE-FORGE-04 PASS`
  - EVIDENCE: PASS: AutoProduction compiled with 3 props, 1 caricature, 1 background, rendered clean SVG frame at t=6.0s. GATE-FORGE-04 PASS. Still rendered to stills_forge/proof_llm_asset_forge.png.

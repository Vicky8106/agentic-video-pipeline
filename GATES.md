# ACCEPTANCE GATES & VERIFICATION LEDGER

## 1. Character Rigging & Anatomy Gates
- [x] **GATE-RIG-01**: Articulated 2-segment limbs (upper arm + forearm, thigh + calf) with natural elbow/knee joint caps and tapered cartoon contours.
  - CHECK: `NODE_OPTIONS="--max-old-space-size=512" npx tsx scripts/test-character-rig-v2.ts`
  - EXPECT: `GATE-RIG-01 PASS`
  - EVIDENCE: Passed. Articulated joints, elbows, and knees with stroke caps verified.
- [x] **GATE-RIG-02**: Expressive hand rigging with true prop grip (wrapping fingers around barbells/mops), pointing hands, and footwear geometry (shoes/boots with soles) instead of bare line endings.
  - CHECK: `NODE_OPTIONS="--max-old-space-size=512" npx tsx scripts/test-character-rig-v2.ts`
  - EXPECT: `GATE-RIG-02 PASS`
  - EVIDENCE: Passed. Hand poses (relaxed mitt, pointing, fist, gripping) and footwear (work boot, gym sneaker, dress shoe) verified.

## 2. Caricature & Likeness Subsystem Gates
- [x] **GATE-CAR-01**: Dedicated Anatoly likeness rig featuring dirty-blonde mustache, scruffy jaw stubble, slanted janitor cap, baggy denim overalls over red flannel, and slouch/powerlifter posture profiles.
  - CHECK: `NODE_OPTIONS="--max-old-space-size=512" npx tsx scripts/test-caricature-likeness.ts`
  - EXPECT: `GATE-CAR-01 PASS`
  - EVIDENCE: Passed. Anatoly signature caricature verified with mustache, stubble, cap, overalls, boots, mop grip.
- [x] **GATE-CAR-02**: Comic bodybuilder archetype with broad deltoid shoulders, bulging trapezius, thick muscular arms, and gym tank striations.
  - CHECK: `NODE_OPTIONS="--max-old-space-size=512" npx tsx scripts/test-caricature-likeness.ts`
  - EXPECT: `GATE-CAR-02 PASS`
  - EVIDENCE: Passed. Bodybuilder comic proportions (deltoids, traps, tank, sneakers) verified.

## 3. Actor Interaction & Eyeline Solver Gates
- [x] **GATE-EYE-01**: Mutual actor eyeline triangulation dynamically solves `gazeX`, `gazeY`, `headTilt`, and `bodyFacing` so co-stars maintain realistic eye contact during dialogue.
  - CHECK: `NODE_OPTIONS="--max-old-space-size=512" npx tsx scripts/test-eyeline-solver.ts`
  - EXPECT: `GATE-EYE-01 PASS`
  - EVIDENCE: Passed. Mutual eyeline triangulation verified across varying positions and actor heights.
- [x] **GATE-EYE-02**: Dynamic prop tracking and 3-beat comedic double-take (look at prop -> snap to partner -> snap to camera lens).
  - CHECK: `NODE_OPTIONS="--max-old-space-size=512" npx tsx scripts/test-eyeline-solver.ts`
  - EXPECT: `GATE-EYE-02 PASS`
  - EVIDENCE: Passed. Prop tracking and 3-beat comedic double-take progression verified.

## 4. Volumetric SVG Asset Gates
- [x] **GATE-SVG-01**: Broadcast-grade Olympic barbell with official bumper color banding (red/blue/yellow/green), knurling reflections, and floor contact drop shadow.
  - CHECK: `NODE_OPTIONS="--max-old-space-size=512" npx tsx scripts/test-volumetric-props.ts`
  - EXPECT: `GATE-SVG-01 PASS`
  - EVIDENCE: Passed. Broadcast-grade Olympic barbell with official bumper colors, knurling, and shadows verified.
- [x] **GATE-SVG-02**: Commercial janitor mop with braided multi-strand yarn physics, industrial clamp, and textured fiberglass handle.
  - CHECK: `NODE_OPTIONS="--max-old-space-size=512" npx tsx scripts/test-volumetric-props.ts`
  - EXPECT: `GATE-SVG-02 PASS`
  - EVIDENCE: Passed. Detailed commercial mop and mop bucket rigs verified.

## 5. Drop-In Pipeline & Backward Compatibility Gates
- [x] **GATE-PIPE-01**: Drop-in autonomous production pipeline automatically resolves caricatures, mutual eyelines, and camera punch-ins for arbitrary scripts.
  - CHECK: `NODE_OPTIONS="--max-old-space-size=512" npx tsx scripts/test-auto-director-e2e.ts`
  - EXPECT: `GATE-PIPE-01 PASS`
  - EVIDENCE: Passed. End-to-end arbitrary script compiled and rendered clean with new engine anatomy.
- [x] **GATE-AUTH-01**: Full backward-compatibility: all 72 authored scenes in Anatoly full feature continue to pass 100% of authored checks.
  - CHECK: `NODE_OPTIONS="--max-old-space-size=512" npx tsx scripts/check-authored.ts`
  - EXPECT: `All authored checks passed.`
  - EVIDENCE: Passed. All 72 authored scenes passed 6/6 test suites with 0 overlaps or coverage gaps.

# ACCEPTANCE GATES & VERIFICATION MATRIX

## 1. Character & Rigging Gates
- [ ] **GATE-RIG-01**: Expressive stick figure rig supports continuous pose interpolation, organic breathing/swaying secondary motion, conversational arm gesture cycles, and asymmetric eyebrow expressions.
  - CHECK: `npx tsx scripts/test-character-ik.ts`
  - EXPECT: `ALL PASS`
- [ ] **GATE-RIG-02**: Directional gaze tracking `gazeTarget` accurately solves eyeball vectors toward moving props and camera focal points.
  - CHECK: `npx tsx scripts/check-rig.ts`
  - EXPECT: `ALL PASS`

## 2. Asset & Comedy Physics Gates
- [ ] **GATE-PROP-01**: Disney/YouTube physics engine (`popInSquash`, `slamDrop`, `floatingHover`, `harmonicSwing`) implemented and verified.
  - CHECK: `npx tsx scripts/test-prop-rigs.ts`
  - EXPECT: `ALL PASS`
- [ ] **GATE-PROP-02**: All 10+ cartoon character cast rigs (`renderJennaOrtega`, `renderEmmaStone`, `renderArianaGrande`, `renderTechBro`, `renderKateMoss`, `renderPaparazzi`, `renderCouchGuy`, etc.) feature living micro-motion (breathing, eye saccades, hair physics, gestures).
  - CHECK: `node scripts/generate-character-assets.mjs`
  - EXPECT: `Generated character assets successfully`

## 3. Directorial & 1-2-3-4 Comedy Beat Gates
- [ ] **GATE-DIR-01**: All 18 scenes execute strict 1-2-3-4 comedy beat progression (Setup -> Escalation -> Visual Punchline -> Reaction Hold) with word-level audio sync (< 100ms offset).
  - CHECK: `node scripts/inspect-all-refined-beats.mjs`
  - EXPECT: `All 18 scenes beat audit: PASS`
- [ ] **GATE-DIR-02**: Macro punch-in camera zooms (1.45x - 2.20x) and impact screen shakes activate on comedic climax triggers.
  - CHECK: `node scripts/check-director.ts`
  - EXPECT: `ALL PASS`

## 4. Video & Motion Quality Gates (The "Anti-Slideshow" Test)
- [ ] **GATE-MOT-01**: Video motion metric confirms continuous animation across rendered footage: median frame change > 3.0%, dead frames (< 0.05%) < 1.0%.
  - CHECK: `node scripts/measure-motion.mjs /root/Desktop/casually_explained_true_animation.mp4 0 60`
  - EXPECT: `dead frames (<0.05%): 0`
- [ ] **GATE-RAM-01**: Peak memory usage remains strictly under 1 GB RAM during sequential chunked rendering.
  - CHECK: `node scripts/render-chunked.mjs --duration 60 --out test_animation_60s.mp4`
  - EXPECT: `RAM Monitor: Used < 1000 MB`

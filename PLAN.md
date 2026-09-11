# Depth Tree Implementation Plan: Production-Grade Engine Overhaul (10/10)

## 1. Context & Motivation
The user noted that while camera movement and timing have improved, the video pipeline is currently at an MVP 3/5 stage:
- Characters look like flat, un-rigged stickmen (straight 7px lines for limbs, 2-line chicken claws for hands, no shoes/feet, flat peach ovals).
- Anatoly does not look like Anatoly (missing his dirty-blonde mustache, scruffy jaw stubble, backwards/tilted worker cap, baggy denim overalls with flannel shirt, and slouch-to-power posture).
- Characters do not make eye contact or react to each other; gaze remains frozen at fixed offsets (`gazeX: 0.45`).
- SVGs look like primitive geometric placeholders rather than broadcast-quality cartoon illustrations with volumetric depth, knurling, bumper colors, and contact drop shadows.
- The pipeline must solve this fundamentally at the engine level so that dropping in any script automatically generates a 10/10 production-ready video.

---

## 2. Depth Tree & File Ownership

```
Engine Architecture Overhaul
│
├── Branch 1: Articulated Puppet Rigging Engine [Leaf 1.1, Leaf 1.2]
│   ├── Leaf 1.1: Anatomical Limbs, Joints & Footwear Geometry (`src/character/StickFigure.ts`)
│   └── Leaf 1.2: Articulated Hands & True Prop Grip System (`src/character/HandRig.ts` & `StickFigure.ts`)
│
├── Branch 2: Bespoke Caricature & Likeness Subsystem [Leaf 2.1, Leaf 2.2]
│   ├── Leaf 2.1: Pluggable Caricature Architecture (`src/character/CaricatureEngine.ts`)
│   └── Leaf 2.2: Signature Caricatures: Anatoly, Heavy Bodybuilder, Dr. Mike (`src/character/CaricatureEngine.ts`, `Hairstyles.ts`, `Outfits.ts`)
│
├── Branch 3: Actor Interaction & Mutual Eyeline Solver [Leaf 3.1, Leaf 3.2]
│   ├── Leaf 3.1: Vector Gaze & Mutual Actor Triangulation (`src/character/EyelineSolver.ts`)
│   └── Leaf 3.2: Comedic Double-Take & Fourth-Wall Gaze Sequencing (`src/character/EyelineSolver.ts`)
│
├── Branch 4: Volumetric Broadcast-Grade SVG Assets [Leaf 4.1]
│   └── Leaf 4.1: Rich Detailed Props & Contact Shadows (`src/assets/PropLibrary.ts`, `src/character/PropRigs.ts`)
│
└── Branch 5: Autonomous Drop-In Pipeline Integration & Evidence [Leaf 5.1, Leaf 5.2]
    ├── Leaf 5.1: Engine Auto-Wiring in Production (`src/production/AutoProduction.ts`, `src/production/SitcomCast.ts`, `authored/anatoly-full/shared.ts`)
    └── Leaf 5.2: Verification Suite, Visual Proof & Before/After Stills (`scripts/test-*.ts`, stills rendering)
```

### Module Responsibilities (`code-structure` two-layer separation):
1. **Domain Actions ("Why/When")**:
   - `AutoProduction.ts`, `Director.ts`, `authored/*.ts`: Orchestrate dramatic beats, character entrances, double-takes, camera zooms, and comedic holds.
2. **Service Layer ("How")**:
   - `StickFigure.ts`: Renders anatomical puppet with jointed limbs, mitt hands, shoes, and spine contours.
   - `HandRig.ts`: Renders grasping hands, gripping fingers around props, pointing hands, relaxed mitts.
   - `CaricatureEngine.ts`: Resolves facial hair, stubble, body proportions, clothing textures, and headwear for specific archetypes.
   - `EyelineSolver.ts`: Pure geometric solver calculating mutual actor gaze, prop tracking, and head tilt vectors.
   - `PropLibrary.ts` & `PropRigs.ts`: High-depth vector assets with metallic knurling, Olympic color banding, and ambient occlusion drop shadows.

---

## 3. Verification Schedule & Runnable Gates
Every leaf has a runnable gate verified via `NODE_OPTIONS="--max-old-space-size=512" npx tsx <script>`:
- `scripts/test-character-rig-v2.ts`: Checks 2-segment limbs, mitt hands, shoe geometry, contact shadows.
- `scripts/test-caricature-likeness.ts`: Checks Anatoly mustache, stubble, baggy overalls, bodybuilder muscle contours.
- `scripts/test-eyeline-solver.ts`: Checks mutual gaze vector calculation, prop gaze tracking, double-take progression.
- `scripts/test-volumetric-props.ts`: Checks Olympic barbell detail, bumper colors, mop yarn layers.
- `scripts/test-auto-director-e2e.ts`: Checks end-to-end arbitrary script handling with auto-eyelines and caricature assignment.
- `scripts/check-authored.ts`: Ensures 100% backward-compatibility across all 72 authored scenes.

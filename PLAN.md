# PLAN: Expressive 2D Animation & Comedy Video Pipeline Overhaul

## Objective
Transform the video generation pipeline from a static "slideshow" into high-energy, broadcast-ready 2D vector animation in the style of **Casually Explained** and **Alex Meyers**. Enforce Matt Pocock's architecture and typing discipline and Leonxlnx's `unlazy` depth-tree gates.

## Core Directorial & Animation Pillars
1. **Expressive Stick Figure Acting**: Continuous smooth transitions between poses, living breathing/swaying micro-motion, gestural arm cycles during speech, asymmetric eyebrow acting, directional gaze tracking, and dynamic mouth visemes with comedic wobble.
2. **Kinetic Comedy Asset Delivery**: All props and character rigs feature Disney/YouTube animation physics (squash & stretch, drop slams, elastic pops, floating hovers, spinning readouts, harmonic swings, smoke particle explosions).
3. **Strict 1-2-3-4 Comedy Beat Progression**: Every scene executes Setup -> Escalation -> Visual Punchline -> Reaction Hold synchronized within +-100ms of spoken words.
4. **Cinematic Virtual Camera**: Snappy punch-ins (1.35x - 2.20x), instant snap jump cuts, and calibrated impact screen shakes.
5. **Zero Dead Frames**: Every single frame f(t) is continuously alive—no frozen 3-second holds.

---

## Depth Tree & Module Ownership

### Leaf 1: Expressive Continuous Stick Figure Rigging (`src/character/StickFigure.ts` & `src/anim/Pose.ts`)
- **Owns**: Continuous pose interpolation (A -> B with anticipation & overshoot), secondary motion (hair lag, spine lean, chest breathing rise, body sway), dynamic conversational arm cycles, independent asymmetric eyebrow arch/tilt/height, smooth eyelid blinks, directional gaze solver `lookAt(x, y)`, and mouth phoneme viseme engine with comedic jitter (`cringe_wavy`, `jaw_drop`, `scream`, `wide_grin`).
- **Needs**: `src/anim/Easing.ts`, `src/anim/Pose.ts`.

### Leaf 2: Kinetic Comedy Asset & Prop Engine (`src/anim/ObjectMotion.ts`, `src/character/CartoonCast.ts`, `src/character/PropRigs.ts`)
- **Owns**: Physics-based entrance and life transforms (`popInSquash`, `slamDrop`, `floatingHover`, `harmonicSwing`, `particleBurst`). Upgraded living cartoon cast (Jenna Ortega, Emma Stone, Ariana Grande, Kate Moss, Tech Bro, Paparazzi, Couch Guy, Pixar Mom, Boss Shadow) with breathing, eye darts, and limb micro-motion. High-impact animated props (digital caliper with animated countdown LCD & laser beam, macOS modal with cursor click depression, animated velocity slider, explosive Bitcoin poof, swinging pendulum with dodging stickman, mega stamp slam).
- **Needs**: `src/anim/Easing.ts`, `src/anim/ObjectMotion.ts`.

### Leaf 3: 1-2-3-4 Comedy Beat Overhaul across All 18 Scenes (`src/scenes/`)
- **Owns**: Refactoring `Scene01` through `Scene18` so that every beat features dynamic visual development, kinetic entrances, animated prop interactions, character reactions, and comedic holds.
- **Needs**: `StickFigure.ts`, `CartoonCast.ts`, `PropRigs.ts`, `ObjectMotion.ts`.

### Leaf 4: Camera & Scene Composition Engine (`src/camera/Camera.ts`, `src/engine/SvgRenderer.ts`)
- **Owns**: Responsive camera framing, spring-damped zoom punch-ins (1.35x to 2.20x), instant jump cuts, calibrated screen shakes on impact drops, full-bleed canvas (-4000 to 6000), and XML entity sanitization.
- **Needs**: `src/camera/Camera.ts`.

### Leaf 5: Build, Bundle & Testing Harness (`scripts/`)
- **Owns**: Fast esbuild bundling to `scripts/SvgRenderer.bundle.mjs`, TypeScript compilation, verification test scripts (`check-rig.ts`, `test-all-scenes.mjs`, `measure-motion.mjs`).
- **Needs**: `esbuild`, `@resvg/resvg-js`.

### Leaf 6: Production Rendering & Motion Validation
- **Owns**: Sequential chunked video rendering under 1 GB RAM, motion metric verification (median frame change > 3%, dead frames < 1%), and visual frame inspection.
- **Needs**: `ffmpeg`, `scripts/render-chunked.mjs`, `scripts/measure-motion.mjs`.

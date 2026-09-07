# Casually Explained / Alex Meyers 2D Animation Engine & Production Pipeline

[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue.svg)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![FFmpeg](https://img.shields.io/badge/FFmpeg-6.0+-orange.svg)](https://ffmpeg.org/)
[![Resvg](https://img.shields.io/badge/Resvg-Rust%20SVG-red.svg)](https://github.com/RazrFalcon/resvg)

A broadcast-ready, procedural 2D vector animation engine and end-to-end production pipeline in TypeScript. Renders animated comedy videos in the authentic style of **Casually Explained** and **Alex Meyers**, incorporating deep insights from **Muse Spark** on hand-driven staging, continuous actor performance, anti-statue gating, and full 10-minute feature compilation.

---

## 🌟 Highlights & Capabilities

- **Complete 10-Minute Feature Workflow**: Render full-length chapter videos (10m 44s / 15,458 frames @ 24fps HD) with sub-100ms comedic audio sync and fixed-GOP lossless chunk stitching.
- **The "Hand-Driven" Discipline (Learned from Muse Spark)**: Every frame is a pure mathematical function $f(t, lt)$ of timeline and local beat seconds. Zero hidden state, bit-exact reproducibility, and zero statue frames.
- **Full Vector Character Rigging**:
  - `StickFigure.ts`: Forward/inverse kinematics, walking locomotion, index finger pointing gestures, speech phonemes, organic breathing cycles, and 80+ facial expressions.
  - `CartoonCastSubScenes.ts`: 25+ procedural celebrity puppets (Jenna Ortega, Emma Stone, Ariana Grande, Mindy Kaling, PS1 low-poly models, Victorian candelabras).
- **Dynamic 16:9 Virtual Camera**: Smooth eased lerp glide, per-sentence dollies, punchline snap cuts (1.50x–1.65x), living-frame breath, and Liang-Barsky line clipping against camera viewports.
- **Strict Quality Verification Gates**: 7-channel motion auditing (`audit-motion.ts`), staging coverage/collision checks (`critic-plan.ts`), and pixel-difference motion proofing (`measure-motion.mjs`).
- **Low-Memory Optimization**: Fully compatible with resource-constrained environments (runs smoothly within < 800MB Node heap limits).

---

## 📁 Repository Structure

```
├── docs/                           # Architecture, Research & Muse Spark Learnings
│   ├── HAND_DRIVEN_APPROACH.md     # The 5 layers, time model, failure catalog & verification
│   ├── PRODUCTION_BIBLE.md         # 9-phase production order & canonical asset specs
│   ├── FULL_10MIN_WORKFLOW.md      # Step-by-step master 10-minute reproduction guide
│   └── references/                 # Original reference PDFs & interactive beat player
│       ├── hand_driven_approach.pdf
│       ├── document(9).pdf
│       └── chapter1_10min_render.html
├── src/
│   ├── anim/                       # Comic markups (arrows, circles), squashes, eases
│   ├── camera/                     # Virtual 16:9 Camera & autonomous CameraAgent
│   ├── character/                  # StickFigure IK host, CartoonCast puppets, outfits
│   ├── director/                   # MovieDirectorEngine, ShotTimeline, ShowPlan
│   ├── engine/                     # SvgRenderer & procedural compositing core
│   ├── motion/                     # Motion math, springs, smoothstep easing
│   ├── production/                 # Production compilers & ImpactTypography
│   ├── scenes/                     # 18 complete narrative comedy scenes (Scenes 01-18)
│   ├── styles/                     # Visual styles & themes
│   └── subtitles/                  # SRT parser, Transcript compiler, phonetic bobs
├── scripts/
│   ├── gag-lib.ts                  # Shared Hand-Driven grammar (stage, walkers, camera)
│   ├── render-gag-w01.ts..w04.ts   # Hand-driven gag window renderers (Windows 1-4)
│   ├── render-gag-part1..part3.ts  # Master chunk renderers (Parts 1, 2, 3)
│   ├── render-gag-last2min.ts      # Master chunk renderer (Last 2 minutes)
│   ├── render_all_master.sh        # Orchestrated end-to-end 10-minute master render script
│   ├── render_gold_pipeline.sh     # 2-worker parallel render & audio mux pipeline
│   ├── audit-motion.ts             # 7-channel anti-statue verification gate
│   ├── critic-plan.ts              # Staging gates (collision, coverage, shot budget)
│   ├── compile-plan.ts             # Compiles raw SRT into structured ShowPlan
│   ├── measure-motion.mjs          # Frame-by-frame pixel difference motion proof
│   └── GAG_WINDOWS.md              # Chapter 1 cue map (0.00s -> 643.53s) & staging rules
└── public/                         # Chapter 1 SRT, master audio.mp3, fonts & blueprints
```

---

## 🚀 Quick Start

### 1. Requirements
- Node.js 18+
- pnpm or npm
- FFmpeg 6.0+ with `libx264` and `aac`
- (Optional) Python 3 for ONNX OCR audits

### 2. Install Dependencies
```bash
pnpm install
```

### 3. Typecheck & Build Core Bundle
```bash
# Type check all engine modules
NODE_OPTIONS="--max-old-space-size=512" npx tsc --noEmit

# Bundle SvgRenderer for Node execution
npx esbuild src/engine/SvgRenderer.ts --bundle --format=esm --platform=node --outfile=scripts/SvgRenderer.bundle.mjs
```

---

## 🎬 How to Generate Videos

### 1. Render a Single 30-Second Hand-Driven Proof Window
To render Window 1 (`0.00s` to `32.41s`) with audio sync:
```bash
NODE_OPTIONS="--max-old-space-size=512" npx tsx scripts/render-gag-w01.ts --out output/w01.mp4
```

### 2. Run Quality & Anti-Statue Verification Gates
```bash
# Verify staging rules (coverage, collision, shot budgets)
npx tsx scripts/critic-plan.ts

# Run the 7-channel motion audit (verifies every beat has active life)
npx tsx scripts/audit-motion.ts
```

### 3. Render the Complete 10-Minute Master Video
Execute the full master pipeline:
```bash
bash scripts/render_all_master.sh
```
This script renders the 8 master chunks (`c01_w01` to `c08_last2min`), performs lossless fixed-GOP stream concatenation, muxes master narration audio, and verifies non-zero pixel motion deltas.

---

## 📖 Deep Dives & Documentation

- [The Hand-Driven Approach](docs/HAND_DRIVEN_APPROACH.md): How pure-function `fn(t, lt)` skits eliminate statue figures and how failures are diagnosed.
- [Stickman Production Bible](docs/PRODUCTION_BIBLE.md): Asset-first specifications and the 9-phase production order.
- [Full 10-Minute Workflow](docs/FULL_10MIN_WORKFLOW.md): Complete guide to rendering and stitching the 10-minute master.
- [Gag Windows Cue Map](scripts/GAG_WINDOWS.md): Exact breakdown of all 231 cues across the 643.53-second feature.
- [House Style Guide](HOUSE_STYLE.md): Directorial rules for stickman comedy, hard cuts, and comedic timing.

---

## 📄 License
MIT

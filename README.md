
## Autonomous audio + SRT production

The primary workflow is now procedural rather than scene-authoring based. Give the engine only a narration file and its SRT:

```bash
pnpm generate --audio narration.mp3 --srt narration.srt --out output/video.mp4
```

The production compiler derives word-level timing, comedy beats, camera shots and continuous host performance from the transcript. It is explicitly designed to prevent the long-video failure mode where the first minute is animated and later sections become a slideshow. See `AUTONOMOUS_PRODUCTION.md` and `skills/casually-explained-director/SKILL.md`.

The existing authored scenes remain useful as a visual vocabulary/reference library; they are no longer required to define the movie's duration or structure.

# Casually Explained / Alex Meyers 2D Animation Engine

A high-performance, procedural 2D vector animation engine built in TypeScript that renders broadcast-ready animated comedy videos in the authentic style of **Casually Explained** and **Alex Meyers**.

## 🚀 Key Architectural Pillars

1. **Alex Meyers Directing Grammar & Cumulative 1-2-3 Staging**:
   - Progressive reveal where visual assets accumulate, persist, and interact together on a 16:9 stage as spoken entities are mentioned.
   - Word-level subtitle audio synchronization (< 100ms tolerance).
   - Dynamic camera choreography: establishing 2-shots (1.05x), subject punch-ins (1.50x–1.65x), macro punchline zooms (1.75x–1.95x), hard 1-frame jump cuts (1.45x), and kinetic screen shakes.

2. **Procedural Vector Character Rigging**:
   - Full-featured stick figure host (`StickFigure.ts`) with forward/inverse kinematics, walking locomotion, and 80+ comic expressions.
   - 25+ modular procedural cartoon vector puppets and slapstick rigs (`CartoonCastSubScenes.ts` & `CartoonComedyPuppets.ts`).

3. **Multi-Core Parallel Rendering Pipeline**:
   - Resilient worker architecture (`scripts/render-parallel.mjs` and `scripts/render-chunk.mjs`).
   - Fixed-GOP encoding (`-g 24 -keyint_min 24 -sc_threshold 0`) and zero PTS alignment (`-avoid_negative_ts make_zero`) ensuring bit-exact frame boundaries and 0ms audio sync drift.

4. **Automated Quality Verification**:
   - On-device ONNX RapidOCR frame auditing (`scripts/ocr_frame_auditor.py`) verifying 16:9 text safety, legibility, and visual scale.

## 🛠️ Tech Stack

- **Language**: TypeScript / Node.js
- **Rendering**: Procedural SVG to PNG (via `@resvg/resvg-js`)
- **Video & Audio Encoding**: FFmpeg / libx264 / AAC
- **Bundler**: esbuild
- **Quality Assurance**: Python 3 / RapidOCR (ONNX Runtime)

## 📁 Repository Structure

```
├── src/
│   ├── anim/           # Motion easing, pop-in squashes, comic markups
│   ├── camera/         # Virtual 16:9 unconstrained camera & shake engine
│   ├── character/      # Host rig, celebrity puppets, slapstick props
│   ├── engine/         # SVG renderer & compositor
│   └── scenes/         # 18 complete narrative comedy scenes
├── scripts/
│   ├── render-parallel.mjs   # Multi-worker video chunk renderer & concat
│   ├── render-chunk.mjs      # Single-chunk frame generator & encoder
│   ├── ocr_frame_auditor.py  # RapidOCR frame quality auditor
│   └── test-all-scenes.mjs   # Full-timeline snapshot test harness
├── public/             # Subtitles (.srt), audio track (.mp3), and font assets
└── PLAN.md             # Directorial blueprints and acceptance gates
```

## 🎬 Quick Start

### 1. Install Dependencies
```bash
pnpm install
```

### 2. Build SvgRenderer Bundle
```bash
npx esbuild src/engine/SvgRenderer.ts --bundle --format=esm --platform=node --outfile=scripts/SvgRenderer.bundle.mjs
```

### 3. Run Scene Snapshot Verification
```bash
node scripts/test-all-scenes.mjs
```

### 4. Run Parallel Video Render
```bash
node scripts/render-parallel.mjs --concurrency 2 --duration 644.1 --chunk-size 60 --out ./casually_explained_master_10min.mp4
```

---
*Created with the Alex Meyers / Casually Explained Animation Pipeline.*

## Autonomous audio + SRT production

The intended product workflow is now:

```bash
pnpm generate --audio narration.mp3 --srt narration.srt --out output/video.mp4
```

The autonomous path is procedural SVG. It treats the stick figure as a continuously performing actor and uses the SRT to drive comedy beats, expressions, gestures, visual metaphors and editorial camera changes. Raster reference images are not used as generated visuals.

See `AUTONOMOUS_PRODUCTION.md`, `VISUAL_AUDIT.md`, and `skills/casually-explained-director/SKILL.md`.

## Style-pack architecture

The production engine is style-neutral. The director produces semantic intent (beats, actions, actors, targets, shots and timing); a `StylePack` decides how those instructions are drawn and how the style moves. The first built-in pack is `casually-explained`.

```bash
pnpm generate --audio narration.mp3 --srt narration.srt --style casually-explained --out output/video.mp4
```

Future styles should implement the same `StylePack` contract rather than changing the director. This is what allows a future original cartoon, infographic, or other house style to reuse the same transcript/comedy/acting/editing pipeline while replacing character design, asset language, palette, transitions and motion grammar.

See `STYLE_ARCHITECTURE.md`.

## Autonomous production engine (v7)

The production engine is style-neutral at its core. Its contract is:

`audio + SRT + style -> transcript -> comedy beats -> choreography -> style rendering -> SVG -> FFmpeg`

The atomic unit is an action, not an image. A beat can contain setup, anticipation, reveal, interaction, escalation, punchline and reaction bits. The stick-figure actor consumes these actions and can look at, point to, walk toward and react to semantic visual targets.

The `StylePack` owns visual identity and style-specific motion/edit grammar. This keeps the director independent from any one creator's artwork.

Example:

```bash
pnpm generate --audio narration.mp3 --srt narration.srt --style casually-explained --out output/video.mp4
```

Quality gate:

```bash
node scripts/quality-gate.mjs
```

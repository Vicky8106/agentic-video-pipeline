# Full 10-Minute Video Generation Workflow

This guide details how to reproduce the full 10-minute (643.53 seconds / 15,458 frames @ 24fps) broadcast-ready animated video delivered in `casually_engine_v7`.

---

## 1. Overview of the Two Production Paths

The engine supports two complementary paradigms for full 10-minute generation:

| Feature | Path A: 18 Hand-Authored Narrative Scenes | Path B: 8 Master Hand-Driven Windows |
| :--- | :--- | :--- |
| **Origin** | Initial Gold Standard (Scenes 01–18 in `src/scenes/`) | Muse Spark / Muse Code Hand-Driven Architecture |
| **Orchestration** | `scripts/render-turbo-full-10min.mjs` / `render-parallel.mjs` | `scripts/render_all_master.sh` / `scripts/render_gold_pipeline.sh` |
| **Staging Unit** | Modular scenes with `SceneRenderContext` | Cue-timed `GagDef` mini-skits with pure `fn(t, lt)` |
| **Strengths** | Rich narrative set-pieces, deep character rigs (Jenna, Emma, PS1 model) | Zero statue frames, continuous host life, verified motion audits |

---

## 2. Path B: The 8-Window Master Pipeline (Production Deliverable)

The master 10-minute film (`casually_explained_master_chapter_1_hand_driven.mp4`) is divided into 8 fixed-GOP chunks mapped to Chapter 1 narration (231 SRT cues):

```
Timeline: 0.00s ────────────────────────────────────────────────── 643.53s
Chunks:   [ c01 ] [ c02 ] [ c03 ] [ c04 ] [  c05  ] [  c06  ] [  c07  ] [  c08  ]
Scripts:   w01     w02     w03     w04     part1     part2     part3     last2min
```

### Chunk Breakdown
1. **`c01_w01.mp4`** (`0.00s` -> `32.41s`): Opening red carpet premise, Instagram feeds, Hollywood ecosystem (`render-gag-w01.ts`).
2. **`c02_w02.mp4`** (`32.41s` -> `65.25s`): 90s fashion history, gaunt aesthetic bridge, pendulum shift (`render-gag-w02.ts`).
3. **`c03_w03.mp4`** (`65.25s` -> `97.23s`): Diet Coke gags, apathy runway, BBL boom context (`render-gag-w03.ts`).
4. **`c04_w04.mp4`** (`97.23s` -> `128.84s`): Bottoms economy, hourglass transition, body positivity reversal (`render-gag-w04.ts`).
5. **`c05_part1.mp4`** (`128.84s` -> `253.21s`): GLP-1 comparisons, low-rise hostility, micro-skirts, cheat code injection pen (`render-gag-part1.ts`).
6. **`c06_part2.mp4`** (`253.21s` -> `375.93s`): Hollywood fitness denial, treadmill vs injection, PS1 wireframe callback (`render-gag-part2.ts`).
7. **`c07_part3.mp4`** (`375.93s` -> `524.00s`): Buccal fat removal RPG boss, TikTok internet tribunal (`render-gag-part3.ts`).
8. **`c08_last2min.mp4`** (`524.00s` -> `643.53s`): Cyborg monoculture, economic reality outro, YouTube subscriber sign-off (`render-gag-last2min.ts`).

---

## 3. Step-by-Step Execution

### Step 1: Pre-flight Verification
Run type checks and motion audits to ensure zero regressions:
```bash
# 1. Type check
NODE_OPTIONS="--max-old-space-size=512" npx tsc --noEmit

# 2. Build the SvgRenderer bundle
npx esbuild src/engine/SvgRenderer.ts --bundle --format=esm --platform=node --outfile=scripts/SvgRenderer.bundle.mjs
```

### Step 2: Render All Master Chunks & Concat
Execute the orchestrated master render script:
```bash
bash scripts/render_all_master.sh
```

What `render_all_master.sh` does under the hood:
1. **Memory Budgeting**: Caps Node process heaps to `--max-old-space-size=350` (or `512`) to run safely within 2GB total RAM.
2. **Deterministic Chunking**: Each worker renders fixed 24fps frames piped directly into FFmpeg via stdin (`-f rawvideo -pix_fmt rgba -s 1280x720`).
3. **Fixed GOP Alignment**: Uses `-g 24 -keyint_min 24 -sc_threshold 0` ensuring zero PTS gap during concatenation.
4. **Lossless Stream Concat**: Concatenates all 8 chunks via FFmpeg concat demuxer (`-c copy`) in milliseconds without re-encoding.
5. **Audio Muxing**: Aligns the master narration (`audio.mp3`) with `-shortest -c:a aac -b:a 192k`.
6. **Motion Verification**: Runs `scripts/measure-motion.mjs` verifying that average frame delta $> 1.0$, guaranteeing no frozen statue frames.

---

## 4. Path A: The 18-Scene Modular Render

To render the 18 narrative authored scenes:
```bash
# Single-thread full render
node scripts/render-scenes.ts --out output/casually_scenes_full.mp4

# Or multi-worker chunked parallel render
node scripts/render-parallel.mjs --concurrency 2 --duration 643.53 --chunk-size 60 --out output/casually_master_parallel.mp4
```

---

## 5. Output Verification & Deliverables

After rendering:
```bash
# Verify stream info and duration (must match 643.53s)
ffprobe /root/Desktop/casually_explained_master_chapter_1_hand_driven.mp4 2>&1 | grep -E "Duration|Stream"

# Check motion delta across timeline
node scripts/measure-motion.mjs /root/Desktop/casually_explained_master_chapter_1_hand_driven.mp4 0 643.5
```

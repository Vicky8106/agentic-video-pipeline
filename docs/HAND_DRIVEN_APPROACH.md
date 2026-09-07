# The Hand-Driven Approach

> **Origin**: Derived from the working `casually_engine_v7` Chapter 1 pipeline and documented via Muse Spark / Muse Code.
> **Purpose**: How a gold-standard *Casually Explained* animation window is built by hand, and exactly how failures get diagnosed and fixed.

---

## 1. What "Hand-Driven" Means

A hand-driven window (such as W01–W03, the 30-second demos that set the bar) consists of 4–5 hand-written skit functions (e.g. `w1a`..`w1e` in `scripts/render-gag-w01.ts`).

Each skit is defined as a `GagDef`:
- A start timestamp `start` (seconds)
- An end timestamp `end` (seconds)
- A pure function `fn(t, lt)` that returns the complete frame state at that exact instant:
  - Background SVG
  - Cast states (positions, rotations, scales, expressions, pointing targets)
  - Foreground props (pure SVG f(lt))
  - Virtual camera (`cx`, `cy`, `zoom`, `cut`)

### Key Principles
- **Nothing is keyframed and nothing is generated through opaque black boxes**: For every single frame at 24 fps, code deterministically computes where everything is.
- **Reproducibility**: The exact same code always yields the exact same pixels. A bug or jitter fix is immediately verifiable by re-rendering that specific frame timestamp, not by luck.
- **Component Separation**:
  - The shared grammar lives in `scripts/gag-lib.ts` (`stage`, `props`, `walkers`, `Camera`, `driveGags`).
  - Motion math lives in `src/motion/` (easing, squashes, spring physics).
  - Characters live in `src/character/` (vector bodies, hairstyles, outfits, phoneme mouths, expressions).
  - Window scripts only stage skits using these building blocks.

---

## 2. The Five Layers of Control

| Layer | Control Mechanism | House Rule |
| :--- | :--- | :--- |
| **1. SVG Assets** | Prop builder functions returning procedural SVG strings (`moneyBag`, `terminal`, `flashBurst`, `syringe`, etc.) | **Zero words anywhere in the frame**. Text legibility is preserved for subtitles only. |
| **2. Character Animation** | Per-frame `StickFigureState` for every actor: `x`, `y`, `isTalking`, `isWalking`, `blink`, `expression`, `pose`, `scale`, `rotation`, `lean`, `gazeTarget`, `pointTarget`, `handProp`. | Rigged inverse kinematics with continuous speech-phoneme bobbing, organic breath cycles, and eye tracking. |
| **3. Camera** | Per-frame `GagCam` `{ cx, cy, zoom, cut }`. Wide: `1.25x` for setup, Punch: `1.50x` / Macro: `1.60x` for payoff. | Virtual 16:9 unconstrained camera with smooth lerp tracking or hard 1-frame jump cuts. |
| **4. Cuts** | Beat boundaries are hard cuts (`cut: true` on the first frame). Punch moment cuts wide to tight. | **No cross-dissolves or soft fades**, per house style. |
| **5. Audio Sync** | Voiceover MP3 sliced per window (`-ss start -t duration`) and muxed with `-shortest` as AAC. | Cue times come directly from the word-level SRT. Sub-100ms comedic synchronization. |

---

## 3. The Time Model (The Core Discipline)

Every skit function receives two time parameters:
- `t`: Absolute timeline seconds (e.g. `142.5s`).
- `lt`: Local seconds elapsed since the skit\'s own start time (`t - start`).

All motion is a **pure mathematical function** of one of these parameters via small primitives. There is **zero hidden state** between frames:

```typescript
// Progress across a cue window [a, b]
const seg = (lt: number, a: number, b: number) =>
  Math.max(0, Math.min(1, (lt - a) / (b - a)));

// Smoothstep ease-in / ease-out
const easeIO = (k: number) => k * k * (3 - 2 * k);

// Linear interpolation between marks
const lerp = (a: number, b: number, k: number) => a + (b - a) * k;

// Walker entering from left (-200 -> x1) and exiting right (x1 -> 2150)
const walkerX = (lt: number, x1: number, a: number, b: number, c: number, d: number) => {
  if (lt < a) return -200;
  if (lt < b) return lerp(-200, x1, easeIO(seg(lt, a, b)));
  if (lt < c) return x1;
  if (lt < d) return lerp(x1, 2150, easeIO(seg(lt, c, d)));
  return 2150;
};

// Walker entering from right (2100 -> x1) and holding
const walkerXR = (lt: number, x1: number, a: number, b: number) => {
  if (lt < a) return 2100;
  if (lt < b) return lerp(2100, x1, easeIO(seg(lt, a, b)));
  return x1;
};

// Periodic 120ms organic eye blink
const blinkAt = (t: number) => (t % 3.7) < 0.12;
```

### The Canonical House Beat Shape
1. **Setup (0% to ~70%)**: Wide shot (`zoom: 1.25x`) while the host speaks and business happens (guest walk-ins, prop cues with `easeIO`).
2. **Punch (at ~70% of beat)**: A punch moment (`punchAt`) where expression snaps (e.g. `deadpan_classic` -> `smug_thumbs_up`), arm points at target, and camera hard-cuts to tight (`zoom: 1.50x`).
3. **Payoff / Reaction Hold**: Freeze holds on physical pose while facial reactions/blinks remain live.

---

## 4. Failure Catalog & Diagnosis Loop

Every incident documented below was diagnosed directly from production:

### 4.1 Statue Figures (The W04 Incident)
- **Symptom**: A 31-second window where the stick figure stood completely motionless while audio played.
- **Root Causes**:
  1. Host entrance had zero duration (`start == end`), so `walkerX` returned `on, never walking`.
  2. Only the host talked, and mouth motion stopped prematurely pre-punch.
  3. Expression held static for the entire beat.
  4. Props popped in and remained completely still.
  5. Camera held two static poses.
- **Fix**:
  - Enforce real 1-second walk-in entrances.
  - Host mouth flaps across the entire cue window (with a brief post-punch reaction breather).
  - Idle sway (rotation sine $\pm 4^\circ$) and breathing cycle (scale sine $\pm 1.5\%$) on every standing figure.
  - Instant expression/pose snap at `punchAt`.
  - Camera slow push-in during setup.
- **Gate Added**: `scripts/audit-motion.ts` (Motion audit gate).

### 4.2 Empty Tableau
- **Symptom**: A beat with a lone actor standing in a void with zero props or visual effects.
- **Fix**: The style gate fails any beat with a lone actor and 0 props/cast effects. If propless, assign an intent effect (e.g. floating `?`, sweat drop, thought cloud).

### 4.3 Dead Air Inside Windows
- **Symptom**: Skit durations did not fully cover their assigned window, causing the video encoder to freeze on the last frame.
- **Fix**: Split-beat algorithm merges trailing fragments under 4 seconds into the previous beat. Silence tolerance set to max 2.5s only at scene boundaries.

### 4.4 Machine-Gun Cutting
- **Symptom**: Consecutive rapid punch-ins without breathing room causing visual fatigue.
- **Fix**: Alternation pass in the compiler demotes every second adjacent punch to wide, keeping staging but stabilizing camera framing.

### 4.5 Host Outside Tight Frame
- **Symptom**: Punch-in (`zoom: 1.5x`+) cropped the speaker or pointing gesture out of the 16:9 frame.
- **Fix**: Coverage gate calculates visible frame width ($1920 / \text{zoom}$) and validates that the speaker coordinate is inside bounds $[700, 1300]$.

### 4.6 Actors Sharing a Mark (Collision Bug)
- **Symptom**: Two characters rendered overlapping on top of each other.
- **Fix**: Collision gate rejects any pair of characters closer than 220px. Guests assigned discrete marks: 680, 990, 1300, 1620.

### 4.7 Silent Self-Sabotage in Code
- **Duplicate Object Key**: A fallback `scale: c.scale ?? 1` in an object literal silently overrode the breathing scale calculation two lines prior.
  - *Lesson*: Verify pixels and runtime variable evaluations, never assume code works just because it compiles.
- **Import Side Effects**: Reusing functions from a script executed top-level code that started overwriting video files.
  - *Fix*: Guard all entrypoints with dedicated execution blocks.
- **Swallowed Exit Codes**: Piping command outputs through `tail` masked failure exit codes.
  - *Fix*: Inspect `${PIPESTATUS[0]}` and log to disk.

### 4.8 Slow Renders and Memory Contention
- Rendering rate is ~1 frame per second per core.
- Enforced rules for 2GB RAM environments:
  - Strictly sequential worker execution or capped 2-worker pools with `--max-old-space-size=350`.
  - Never run duplicate background render loops.
  - Full stitching occurs only after sub-windows pass all verification gates.

---

## 5. The 8-Step Verification Loop

Run in strict sequence before marking any window complete:

1. **`tsc --noEmit`**: Type checking must pass with zero errors.
2. **`compile-plan`**: Compiles SRT cues into `ShowPlan.json`. Unstageable beats must be flagged explicitly.
3. **`critic-plan`**: Validates coverage, collision avoidance, timing tiling, and shot budgets.
4. **`audit-motion`**: Samples every beat at 8 timestamps across 7 motion channels (travel, rotation, scale, mouth talking, pointing, foreground prop activity, camera movement). Every beat must score $\ge 4/7$.
5. **Stills Inspection (`--stills`)**: Render frames at $t_1, t_2, t_3$ to inspect visual composition in seconds.
6. **Pixel-Difference Motion Proof (`measure-motion.mjs`)**: Decode rendered MP4 at 2 fps and compute mean absolute pixel difference across adjacent frames. Any segment with diff $< 1.0$ fails as a frozen statue.
7. **`ffprobe` Stream Verification**: Stream 0 = H.264 video, Stream 1 = AAC audio. Duration must match cue bounds within $\pm 50\text{ms}$.
8. **Human Review**: Watch the final clip to judge comedic rhythm and visual jokes.

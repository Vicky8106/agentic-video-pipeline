# PLAN: Agentic Cinematic Camera & Storytelling Engine

## Problem Statement
The camera movement in the video pipeline was previously broken with abrupt zooms, random vibration/shaking, and jarring cutbacks. The root cause was that camera control was completely un-agentic:
1. The LLM Beat Director (`BeatManifestExtractor`) did not specify camera framing, movements, or transitions.
2. The adapter (`DirectorSheetAdapter`) hardcoded every beat's camera to static wide `(960, 540, zoom: 1.0)`.
3. The renderer (`AutoProduction`) fell back to legacy synthetic heuristics: `punchZoomBoost` fired unmotivated +0.38 zoom spikes with anticipation dips on arbitrary regex matches, `traumaAt` vibrated calm beats with random shake, and sentence splitting caused erratic jumps.
4. Storytelling through camera grammar (establishing wide two-shot -> pan to subject -> macro on punchline prop -> host reaction close-up) was completely absent.

## System Architecture (Two-Layer Separation)

```
[Script Beats] ──> [BeatManifestExtractor (Action Layer)]
                          │
                          ├─► Directs for EVERY beat:
                          │   • cameraShot: "wide_two_shot" | "host_reaction" | "subject_focus" | "prop_macro" | "dramatic_climax"
                          │   • cameraMove: "static_hold" | "slow_push_in" | "pan_to_subject" | "snap_cut"
                          │   • transition: "cut" | "dissolve" | "whip_pan"
                          │   • energy: 0.1 .. 1.0
                          │   • impactShake: boolean (physical slam only)
                          ▼
            [DirectorSheetAdapter (Service Layer)]
                          │
                          ├─► Translates intent to physical camera trajectory:
                          │   • Start & target poses: (centerX, centerY, zoom)
                          │   • Alex Meyers camera grammar lookup
                          │   • Trajectory metadata (lerp, push rate, pan curve)
                          ▼
            [AutoProduction & GagCamera (Rendering Engine)]
                          │
                          ├─► Agent Sheet is the authoritative camera driver
                          ├─► Smooth progressive interpolation across beat duration
                          ├─► Complete elimination of synthetic regex jitter/fidgeting
                          └─► Motivated camera shake ONLY on physical impact collisions
```

## Cinematic Camera Grammar (`alex-meyers-director`)

| Shot Type | Framing `(x, y, zoom)` | Comedic Storytelling Purpose |
|---|---|---|
| `wide_two_shot` | `(960, 540, zoom: 1.02)` | Establishing context, host + co-star dialogue |
| `host_reaction` | `(520, 560, zoom: 1.48)` | Host deadpan, smug smile, shock, skepticism |
| `subject_focus` | `(1420, 520, zoom: 1.52)` | Guest/co-star pop-in, transformation, flex |
| `prop_macro` | `(1220, 550, zoom: 1.85)` | High-detail focus on gag prop (barbell, magnifying glass, mop) |
| `dramatic_climax` | `(1340, 500, zoom: 2.10)` | Peak punchline climax, maximum screen command |

## Dynamic Movements
1. `static_hold`: Zero drift, zero camera jitter (calm beats hold dead still so the audience focuses on comedy).
2. `slow_push_in`: Smooth continuous zoom drift (+0.12 - +0.20) ramping into the subject as joke escalates.
3. `pan_to_subject`: Smooth horizontal glide from host `(520)` across to guest/prop `(1420)`.
4. `snap_cut`: Instantaneous 1-frame camera cut directly on the beat boundary for comedic surprise.

## Implementation Tasks
1. **Schema & Extraction**: Update `BeatManifestExtractor.ts` with `cameraShot`, `cameraMove`, `transition`, `energy`, `impactShake`.
2. **Coordinate & Trajectory Adapter**: Update `DirectorSheetAdapter.ts` to map shots to cinematic coordinates and compute start/target poses.
3. **Renderer Authority & Smoothing**: Update `AutoProduction.ts` to execute the agent's camera trajectory, interpolate dynamic moves, eliminate unmotivated synthetic shake, and honor `impactShake`.
4. **Verification & Proof**: Write unit/integration tests for each layer, measure frame coordinates, generate before/after comparison frames and a demonstration video clip.

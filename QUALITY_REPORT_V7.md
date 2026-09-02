# v7 production-engine audit

## Scope

Audited the autonomous `public/0-chapter-1.srt` production path after the v6 architecture changes.

## Structural results

- TypeScript: **PASS** (`tsc --noEmit`)
- Autonomous production: **PASS**
- Duration: **643.531 s**
- Sentences: **89**
- Directed shots: **459**
- Production beats: **89**
- Directed actions: **1425**
- Internal bits: **419**
- Action density: **22.14 / 10s**
- Bit density: **6.51 / 10s**
- Deliberate expression actions: **358**
- Visual reveals: **96**
- Beat-level camera actions: **104**
- Maximum shot: **2.232 s**
- Raster `<image>` elements in sampled autonomous SVG frames: **0**
- Host present in sampled frames: **PASS**
- 4-second rasterized QA preview: **PASS**

## What this proves

The autonomous path is no longer a sentence-to-slide renderer. Each sentence is compiled into multiple performance bits and executable actions. The host is continuously evaluated from those actions, recent visuals persist on stage, and camera punch/reaction actions are evaluated at frame time.

## What it does not prove

Structural gates cannot prove that a 10-minute movie is artistically excellent. The next production-quality loop should use sampled rendered frames/video to score composition, actor/asset interaction, repetitive staging, and comedic timing, then patch only failed beats.

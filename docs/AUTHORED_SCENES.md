# Authored scenes (agent-as-brain contract)

The deterministic pipeline (`Director` + `ProductionCompiler` + catalogs) is
previz: it guarantees *a* video for any script, never *the* video for *this*
script. Production direction lives here.

## Rule

Every covered second of the voice track has a bespoke scene module written
by the directing agent for that script's jokes. The module composes SVG +
motion + camera in code per beat — reusing catalog renderers as raw material
(`renderBackground`, `renderStickFigure`, `renderProp`) but never letting
regex choose the staging. There is no `--llm none` fallback inside an
authored window: an uncovered second is a red gate, not a default frame.

## Adding a scene

1. Read the whole SRT. Name the joke units, the punch words, the entrances.
2. Write `authored/<film>/scene<N>-<beat>.ts` exporting `film` plus named
   time constants (`RECOGNIZE_AT`, ...) so a re-time touches one line.
3. Every camera move carries its motive in `intent` — which sentence pays
   for it. The gate (`scripts/check-authored.ts`) fails intent-less scenes.
4. Camera vocabulary lives in `src/authored/AuthoredScene.ts` and grows by
   adding parametric primitives there (`keyframedCamera`, `withPunch`,
   ...). Primitives are dumb; the scene's composition is the direction.
5. `npx tsx scripts/check-authored.ts --film ../authored/<name>/index.js`
   must be green, then render through the parallel pipeline:
   `npx tsx scripts/auto-video.ts --film authored/<name>/index.js
   --audio voice.mp3 --out output/<film>.mp4 --jobs 2 --width 480 --fps 8`
   (`scripts/render-authored.ts` remains for single-process debug renders).

## Current coverage

- `pigeon-park` scene 1 (0–12.207s): morning ritual, the recognition
  freeze, fat one + pal + lawyer entrances. Remaining cues unauthored.

# New-Script Workflow (coding-agent director)

You are the director. No API key, no network, no human in the loop. A new
script comes in as `story.srt` (+ `voice.mp3`); a finished video goes out.
Follow the phases in order. Every phase has a gate — do not advance on red.

Primary path is the authored film (docs/AUTHORED_SCENES.md): bespoke scene
modules per joke, rendered with `auto-video --film`. The regex fallback and
the runtime LLM director were removed — `auto-video` without `--film` or
`--sheet` fails instead of rendering undirecteded video. The old
sheet-driven previz path below remains for salvage, never for new work.

Heap for everything: `NODE_OPTIONS=--max-old-space-size=512`. One heavy
command at a time (`--jobs 1` for renders, `--jobs 2` max for film chunks).

## 0. Intake (5 min)

- Read the whole SRT. Write down: joke units (setup -> punchline), recurring
  cast, rooms, signature props, punch words.
- Derive the bill of materials FIRST: how many backgrounds, characters (with
  exact look: hairstyle/outfit), props, gags. If you cannot list them, you
  have not understood the script — re-read, do not render.

## 1. Seed sheet

```bash
npx tsx scripts/direct.ts --srt sheets/<name>.srt --out sheets/<name>.beats.json --llm none
```

This is a timing scaffold only (regex fallback). Assume every artistic
choice in it is wrong.

## 2. Asset gap check

Compare the bill of materials against the catalogs in
`src/director/LlmDirector.ts` (`BG_IDS`, `PROP_GLOSS`, `HAIRSTYLES`,
`OUTFITS`, `EXPRESSIONS`, `POSES`):

- Missing background -> add a `BG-NEW` case in
  `src/assets/BackgroundLibrary.ts` + extend the `BackgroundId` union.
  Full-bleed: paint `-4000..6000` (parallax-safe), floor line ~y=740,
  one flat poster/sign max, zero tiny text (illegible below 720p).
- Missing prop -> add a `PROP-NEW` case in `src/assets/PropLibrary.ts` +
  one `PROP_GLOSS` line describing the confirmed gag.
- Missing look -> extend `Hairstyles.ts` / `Outfits.ts` unions + cases,
  add an `ENSEMBLE` entry in `src/production/SitcomCast.ts`, and mirror
  the ids in the `LlmDirector.ts` catalog lists (they must never drift).

```bash
npx tsx scripts/check-catalogs.ts   # must be all PASS before directing
```

## 3. Direct (edit the sheet)

One beat per joke unit (4-9s), tiling the window with NO gaps. Per beat:
`bgId` + ONE actor (look + expression + pose) + at most ONE prop + camera.
Rules:

- New visual information enters WITH its spoken keyword (+/-0.1s), never
  before. Punchlines get a hard cut (new beat) and `camera.zoom 1.6-2.2`.
- Setups `1.0-1.15`, escalation `1.3-1.5`, reaction holds `>=1.5s`.
- Props live camera-right (`x 1280-1450, y 300-480`); actor faces
  camera-left/center. `bannerText` is the ONLY on-screen text allowed
  (<=34 chars) — and only when the gag needs it. Everything automatic is
  wordless by engine rule: staged assets never render text (verified by the
  "no text" gate), and the camera vocabulary is cut / whip / punch / pull /
  drift, never shake-only. Punchlines snap-zoom, subject changes whip,
  scene openings pull back.
- Use ONLY catalog ids. If no entry fits, omit the prop (`null`) — never
  force one. Cross-gag similes ("a weight that could anchor a ship") get
  `dropKinds: ["vehicle"]` so the comparison never stages literally.
- Freeze gags: lock the camera (zoom delta ~0), freeze the actor pose,
  animate only the surroundings; the reaction lands on the punch word.

## 4. Validate sheet

```bash
npx tsx scripts/check-sheet.ts --sheet sheets/<name>.beats.json --srt sheets/<name>.srt
```

Needs: `OK` + a manifest line whose counts match the bill of materials
from phase 0. Fix warnings about unknown ids (they fail closed to
defaults — a warning IS a wrong frame). Then:

```bash
npx tsx scripts/check-director-fixes.ts   # 18/18 PASS, no regressions
```

## 5. Render cheap, review frames

Authored film (new work):

```bash
npx tsx scripts/auto-video.ts --film authored/<name>/index.js --audio voice.mp3 \
  --out output/<name>.mp4 --jobs 2 --width 480 --fps 8
```

Legacy sheet previz (salvage only — `--sheet` is required; `--llm` is gone):

```bash
npx tsx scripts/auto-video.ts --script sheets/<name>.srt --audio voice.mp3 \
  --out output/<name>-draft.mp4 --jobs 1 --width 480 --fps 8 \
  --duration 45 --sheet sheets/<name>.beats.json
```

Extract stills at every setup/punch/reaction boundary and check, in pixels:
wide setup frames both actors; escalation tightens; punch-in lands ON the
punch word; reaction holds the room; hard cuts on beat starts (no
dissolves); faces persist across neutral beats (no pops); zero off-topic
props; zero mid-joke room flips; motion never fully freezes outside holds.
Taste rules (non-negotiable): every camera move needs a visible motive —
no travel on setup sentences, at most one punch and one whip per 8s, no
cut jumping more than 1.35x, no half-cropped host, shake only on impacts.
If a frame looks random, it IS random: find the unmotivated move or
entrance and fix the sheet or the analyzer, never the pixels.
Fix the sheet or assets, re-render. The `--sheet` render must show
`director=agent-sheet` in its header.

## 6. Ship render

Full duration at delivery resolution, same command minus `--duration`,
`--width 1280 --fps 24`. Confirm the manifest line, muxed audio length,
and re-sampled stills across the whole timeline.

## Done means

`check-catalogs` + `check-sheet` + `check-director-fixes` green, draft
stills reviewed per the phase-5 checklist, full render complete. The
sheet file is the direction record — commit it with the video.

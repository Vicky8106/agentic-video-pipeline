# AUTO pipeline: script + voice → video

One command, zero per-video tuning:

```bash
NODE_OPTIONS="--max-old-space-size=512" npx tsx scripts/auto-video.ts \
  --script story.srt --audio voice.mp3 --out video.mp4
# or: pnpm auto --script story.srt --audio voice.mp3 --out video.mp4
```

Inputs: `--script` accepts `.srt` (timing is ground truth) or plain
`.txt`/`.md` (sentences share the audio duration by word weight, so no
timing work is ever needed). `--audio` is any ffmpeg-readable voice file
and is the timing master: the video covers `max(audio, script)`.

What the pipeline figures out by itself:

- Story beats, staging, props, expressions, co-star presence — from the
  script sentences (`Director` → `ProductionCompiler` → `SceneMemory` →
  `SitcomCast`). Same trigger-word discipline as before: cuts on sentence
  boundaries, at most one punch per beat, macro reserved for escalation.
- Camera moves and punch zooms — from script triggers via the pure
  `CameraTrack` (`cameraAt(t)` works for any `t`, so chunk boundaries are
  seamless by construction; chunks are cut at beat starts, never mid-shot).
- Lip-sync truth (`isSpeakingAt`/`mouthOpenAt`) and emphasis shakes —
  from the voice amplitude envelope (`src/auto/audio.ts`). Loud peaks
  inside punchline/escalation beats inject capped shake events (max one
  per beat, ≥2s apart). Zoom punches stay script-driven.
- Staging safety — `SceneMemory` places each prop on an authoritative
  flank (right/left/center) that never moves after spawn; co-stars sit out
  close-ups (`macro`/`insert`/`subject`); exiting props cross-fade.

Defaults: punch-word impact typography is OFF (opt in with
`--impact-words`); style-pack environmental labels remain. Deterministic:
same inputs → same video. Memory-safe: sequential 512MB-heap chunks with
fixed-GOP (`-g 24 -keyint_min 24 -sc_threshold 0 +cgop`) stream concat,
resume of finished chunks, and a `PIPELINE_VERSION` cache-buster in
`scripts/auto-video.ts` — **bump it whenever renderer code changes**, or
stale chunks will pass resume.

Useful flags: `--width`, `--fps`, `--style`, `--jobs` (default 2),
`--chunk-sec` (default 60), `--duration N` (bounded smoke runs),
`--stills N`, `--keep-chunks`.

## Speed (measured on-device, Termux/Android, 800MB budget)

Per-frame cost used to be ~90% font re-parsing (resvg parses its fonts on
every frame). The pipeline subsets the fonts to the video's glyphs once per
run (1.4MB → ~290KB, byte-identical pixels — verified 13/13 frames at
720p), skips font loading on text-free frames, and renders beat-aligned
chunks in parallel workers. 45s-video wall clock:

| setting | time | peak RSS |
|---|---|---|
| 640×360/12fps, `--jobs 1` | 48s | ~290MB workers + ~100MB parent |
| 640×360/12fps, `--jobs 2` | 36s | ~535MB workers + ~100MB parent |
| 1280×720/24fps (auto-capped to 1 worker) | 75s | ~520MB workers + ~100MB parent |

Rules enforced by the CLI: max `--jobs 2`, and 720p+ always renders with
1 worker (2×720p workers measured ~950MB — over budget). A full 664s 720p
video runs ~20 minutes on-device. Past that, scale out: copy the repo to a
second machine and render disjoint chunk ranges (chunks are independent by
construction), then concat.

Architecture (two layers): `scripts/auto-video.ts` is the action — it
orchestrates and owns the CLI. Reusable operations live in services:
`src/auto/script.ts` (script → cues), `src/auto/audio.ts` (voice →
duration/envelope/peaks), and the existing `src/director`,
`src/production`, `src/camera`, `src/character` services.

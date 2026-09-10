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

Useful flags: `--width`, `--fps`, `--style`, `--chunk-sec` (default 60),
`--duration N` (bounded smoke runs), `--stills N`, `--keep-chunks`.

Architecture (two layers): `scripts/auto-video.ts` is the action — it
orchestrates and owns the CLI. Reusable operations live in services:
`src/auto/script.ts` (script → cues), `src/auto/audio.ts` (voice →
duration/envelope/peaks), and the existing `src/director`,
`src/production`, `src/camera`, `src/character` services.

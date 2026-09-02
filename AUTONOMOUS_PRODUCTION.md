# Autonomous Procedural Production

The product contract is intentionally narrow:

> **audio.mp3 + script.srt -> finished 2D explanatory-comedy video**

The autonomous path is code-generated. It does not require diffusion images or a manually authored scene list.

## Production graph

```text
audio + SRT
   -> transcript / word timing
   -> comedy beat detection
   -> shot grammar
   -> actor performance
   -> procedural SVG metaphors
   -> camera / editing
   -> deterministic frame renderer
   -> FFmpeg
```

### Director

The director converts sentences and emphasis words into a timeline of shots and events. It deliberately caps ordinary shots so the movie cannot sit on a single composition indefinitely.

### Actor

The host is continuously evaluated at frame time. Expression, gaze, mouth, head tilt, spine lean, gestures, walking, prop use and reaction states are generated from the current beat.

### Stage

The autonomous stage contains only procedural SVG. Visuals are physical objects or transformations rather than full-screen raster references. The host remains present for most explanatory shots so the narration has an on-screen performer.

### Camera / editing

Cuts, punch-ins, whips, drifts, pulls, reaction shots and impact motion are selected from semantic beats. Camera movement is deterministic and can be changed without regenerating assets.

### Anti-slideshow gate

The automated test requires:
- a bounded maximum shot length;
- at least three shot types;
- sustained expression events;
- an actor on the autonomous timeline;
- no raster `<image>` elements in generated frames.

## CLI

```bash
pnpm install
pnpm generate --audio narration.mp3 --srt narration.srt --out output/video.mp4
```

For a cheap development render:

```bash
pnpm generate:preview
```

The current renderer defaults to 1280x720 at 24fps. Use `--width 1920` for 1080p.


## Style is a plug-in

The director does not own SVG artwork. It emits semantic production intent and resolves it through a `StylePack`. A style pack owns character construction, asset construction, palette, entrance/exit language, camera/edit preferences and motion accents. The current `casually-explained` pack is only the first implementation.

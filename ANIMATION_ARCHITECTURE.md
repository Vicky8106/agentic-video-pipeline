# Procedural animation architecture

The engine is intentionally split into four contracts:

1. **Director** — decides story/comedy intent and scene/beat timing from SRT.
2. **Choreography** — turns each beat into executable actor/asset/camera actions.
3. **StylePack** — decides how semantic actors/assets/motion look. It contains no story timing.
4. **Renderer** — evaluates the plan at a frame time and emits SVG.

The atomic production unit is an **action**, not an image. A normal beat is expected to contain some version of:

`setup → anticipation → reveal → interaction → escalation → punchline/reaction → hold/reset`

A visual asset is persistent state in the world, not a slide. Recent assets remain on stage and can be looked at, pointed at, transformed or reacted to.

## Anti-slideshow gates

The quality gate checks action density, bit density, deliberate expression actions, visual reveals, camera actions, actor presence, SVG-only output and shot duration. These are structural safeguards; visual QA should still sample rendered frames.

## Style portability

The universal plan uses semantic concepts (`money`, `person`, `compare`, `process`, `problem`, `device`, `explain`) rather than SVG asset names. A future style can render the same semantic request using a completely different character, palette, prop construction and motion grammar.

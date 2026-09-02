# Style-neutral production architecture

The engine is now divided into two independent concerns:

- **Director / Production IR:** what happens, why, and when.
- **StylePack:** how characters, assets, colors, motion accents and edit grammar look.

A new visual style must not require rewriting the director. The intended contract is:

```text
audio + SRT
  -> transcript
  -> comedy/story beats
  -> style-neutral ProductionPlan
  -> StylePack resolves actors/assets/effects
  -> choreography
  -> shot/edit timeline
  -> SVG renderer
  -> FFmpeg
```

## What belongs in a StylePack

- character construction and facial language
- asset construction and semantic variants
- palette / line language
- entrance and exit motion vocabulary
- squash/overshoot characteristics
- camera/edit preferences
- transition vocabulary
- environment treatment

## What must remain style-neutral

- transcript parsing
- semantic beat detection
- setup/escalation/punchline/reaction logic
- continuity
- actor intent (`lookAt`, `point`, `walkTo`, `react`)
- shot planning
- action timing
- dead-zone detection
- animation-density validation

This means a future `kurzgesagt`, `stoic-stix`, or other original house style can implement the same ProductionPlan with a completely different visual language without changing the story director.

Do not encode a creator's exact artwork as the architecture. A style pack should describe an original visual grammar and procedural implementation.

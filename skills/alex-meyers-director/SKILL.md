---
name: alex-meyers-director
description: Directs 2D animated comedy videos (Alex Meyers / Casually Explained style) with strict 1-2-3 comedic beat progression, word-level audio sync (< 100ms), dynamic snap cut / zoom camera choreography, safe 16:9 composition, and expressive SVG character acting.
---

# Alex Meyers Animated Comedy Directing Skill

This skill codifies the directing, asset management, and camera grammar for high-impact YouTube animated comedy in the style of **Alex Meyers** and **Casually Explained**.

---

## 1. The Dual Director-Critic Architecture

To guarantee broadcast-ready comedy quality, the production pipeline runs two collaborating agent roles:

```
[SRT Transcript + Audio]
          |
          v
  [Director Agent]  ---> Reads full SRT context
                         Plans 1-2-3 sequential comedy beats
                         Audits Asset Inventory (reuses vs generates anew)
                         Applies aggressive Camera Punch-Ins (1.4x - 2.2x)
                         Enforces Screen Realism (large characters 40-70% height)
          |
          v
  [Snapshot Tester] ---> Renders key-frame PNGs at each spoken keyword timestamp
          |
          v
  [Critic Agent]    ---> Audits 5 Axes: Scale, Zoom Depth, <100ms Sync, SVG Art, Framing
                         Returns CRITIQUE_REPORT.json + auto-patches weak beats
```

---

## 2. Screen Realism & Visual Scale (The "Command the Screen" Rule)

- **Anti-Pattern**: Dainty, small stick figures floating in empty white space look like a boring slideshow.
- **Rule**: Characters and props must **command the screen**:
  * **Host Standing Height**: `scale: 1.30 - 1.45` (height $\approx 450 - 550\text{px}$, occupying ~50% of the screen height).
  * **Joke Rigs / Celebrity Rigs**: `scale: 1.35 - 1.65` (commanding the right half of the canvas).
  * **Props & Stamps**: Big, tactile, volumetric vector illustrations with depth layers, highlights, drop shadows, and glowing accents.
  * **Close-Ups & Macros**: Punch into 70%–90% frame occupation during punchlines.

---

## 3. Dynamic Camera Choreography: Real Punch-Ins & Snap Cuts

In comedy animation, timid 5% zooms ($1.05\times$) are imperceptible. Zooms must be **dramatic and kinetic**:

| Shot Type | Camera Framing `(centerX, centerY, zoom)` | Purpose |
|---|---|---|
| **Standard 2-Shot (Wide)** | `(960, 540, zoom: 1.02)` | Topic intro, establishing banter |
| **Host Reaction Close-Up** | `(520, 560, zoom: 1.40 - 1.55)` | Smug eyebrow, shock eye-pop, deadpan blink |
| **Subject Punch-In** | `(1350 - 1500, 520, zoom: 1.45 - 1.65)` | Celebrity pop-in, tech bro transformation |
| **Punchline Macro / Climax** | `(1420 - 1560, 480, zoom: 1.85 - 2.20)` | Caliper $0.02\text{ mm}$ LCD readout, $2,400 price tag, Ctrl+W smash |
| **Hard Snap Jump Cut** | `camera.cutTo(x, y, zoom)` | Instant 1-frame visual punchline drop |

*Note*: The camera system supports full-bleed unconstrained panning across the canvas so extreme close-ups on edge assets never clamp or clip.

---

## 4. 1-2-3 Progressive Reveal & Word Timing (< 100ms)

Never show the visual punchline before the word is spoken.

```
[Intro]       -> Host alone on stage (Deadpan baseline)
[Beat 1]      -> Word uttered -> SNAP CUT / Zoom to Subject 1
[Beat 2]      -> Word uttered -> SNAP PAN / Zoom to Subject 2
[Beat 3]      -> Word uttered -> SNAP ZOOM to Subject 3
[Beat 4 Climax] -> Punchline word -> MACRO PUNCH-IN (1.8x - 2.2x) on punchline prop
[Beat 5 Resolv] -> Wide or Host close-up shock reaction
```

All state triggers land within **$\pm 100\text{ms}$** of the ground-truth SRT subtitle timestamp.

---

## 5. Asset Library Protocol: Reuse vs New Generation

Before directing a scene, the Director checks `/root/Desktop/casually-explained-video/src/character/`:

1. **Existing Rigs**:
   - Host (`StickFigure.ts` with 15+ expressions)
   - Celebrities (`renderJennaOrtega`, `renderEmmaStone`, `renderArianaGrande`, `renderKateMoss`)
   - Archetypes (`renderTechBro`, `renderPaparazzi`, `renderCouchGuy`, `renderPixarMom`, `renderBossShadow`)
   - Cartoon props (`renderEvictedOrgans`, `renderFlyingCarbs`, `renderMegaStamp`)
2. **Generating New SVG Assets**:
   - If a scene requires a new prop or character (e.g. Victorian Tonics, Diet Coke Food Pyramid, $2,400 price tag, Low-Poly 3D mesh, Fidget Spinner), create a dedicated pure SVG renderer function with dynamic CSS/SVG animation parameters and export it into `src/character/CartoonCast.ts` or `src/character/`.

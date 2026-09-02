---
name: comedy-director-critic
description: Critiques and validates animated comedy scene direction, camera choreography, screen realism, asset scale, 1-2-3 progressive reveal timing (<100ms), and visual joke delivery in the style of Alex Meyers / Casually Explained. Use to audit director beat sheets and rendered frames before final production compilation.
---

# Comedy Director Critic & Self-Learning Audit Skill

This skill acts as an automated directorial critic and quality gatekeeper for 2D animated comedy videos (Alex Meyers & Casually Explained style). It evaluates scene plans, storyboard beat sheets, asset inventories, and rendered frame snapshots to enforce cinematic quality, screen realism, aggressive camera punches, and comic timing.

---

## 1. The 5 Directorial Critique Axes

Every scene and beat must pass all 5 audit axes:

### Axis 1: Screen Realism & Visual Scale (The "Too Small" Check)
- **Problem**: Assets and characters drawn small (< 25% of viewport height) look like distant icons or low-effort slides rather than an expressive animated cartoon.
- **Requirement**:
  - Characters should occupy **40% to 70%** of the vertical frame height.
  - Host standing scale: `scale: 1.25 - 1.45` (height $\approx 450 - 550\text{px}$).
  - Joke props / character cast: `scale: 1.30 - 1.60` (filling the right half of the 16:9 canvas).
  - Extreme close-ups / macro shots: Scale or zoom to fill $> 75\%$ of the frame.

### Axis 2: Camera Punch-In & Snap-Zoom Efficacy
- **Problem**: Weak zoom factors ($1.04\times - 1.10\times$) are imperceptible and feel static.
- **Requirement**:
  - **Standard 2-Shot**: `zoom: 1.00 - 1.05`, center `(960, 540)`.
  - **Host Reaction Close-Up**: `zoom: 1.35 - 1.50`, center `(520, 540)`.
  - **Joke Subject Punch-In**: `zoom: 1.35 - 1.65`, center `(1350 - 1500, 520)`.
  - **Extreme Punchline Climax (Macro)**: `zoom: 1.80 - 2.20`, center on the specific focal point (e.g. caliper LCD, price tag, stamp).
  - Camera viewport must NOT clamp panning out of bounds when background is full-bleed (`-2000` to `4000`).

### Axis 3: Strict 1-2-3 Timing & Audio Synchronization (< 100ms)
- **Problem**: Dropping all joke assets at $t=0$ ruins comedic anticipation.
- **Requirement**:
  - Step 1 (Setup): Host introduces topic or baseline state.
  - Step 2 (Escalation / Comparison): Asset 1 pops in with snap-zoom within $\pm 100\text{ms}$ of spoken keyword.
  - Step 3 (Contrast / Build): Asset 2 or escalation element pops in on keyword.
  - Step 4 (Punchline Reveal): Climax prop slams/clamps with maximum zoom punch.
  - Step 5 (Host Reaction): Punch-out or cut back to host shock/deadpan.

### Axis 4: Asset Richness & Pure SVG/CSS Cartooning
- **Problem**: Text-heavy slides or plain geometric boxes without cartoon life.
- **Requirement**:
  - 100% vector SVG with expressive cartoon anatomy (wobble outlines, drop shadows, gradients, specular highlights, glowing neon).
  - Micro-animations: breathing bobs, mouth flapping on speech, eyelid blinks, hair sways, floating physics.
  - Distinct asset generation: If an asset is missing from the library, declare it in the asset manifest and generate it as a dedicated SVG component.

### Axis 5: 16:9 Safe Framing & Grounding
- Baseline ground line at $y: 840$ with dark contact shadow ellipses (`rx: 50-80, ry: 12-18, opacity: 0.15-0.25`).
- Left margin $> 150\text{px}$ and right margin $> 150\text{px}$ during wide shots.
- Zero visual pop-in clipping at frame borders.

---

## 2. Critic Workflow & Self-Learning Loop

```
[SRT File + Audio]
       |
       v
[Director Agent] -----> Generates Director Beat Sheet + Scene Code + Asset Requests
       |
       v
[Test Frame Extraction] (Render snapshots at each beat timestamp)
       |
       v
[Director Critic Agent] -> Audits 5 Axes:
                           - Are zooms aggressive enough (1.4x - 2.0x)?
                           - Are character scales large enough (screen realism)?
                           - Are beats timed within <100ms?
                           - Are missing assets identified and generated?
       |
       +---> Pass -> Approve for Full Render
       |
       +---> Fail -> Generate CRITIQUE_PATCH.json -> Apply Scene Refinements -> Re-verify
```

---

## 3. Critique Output Schema (`DIRECTOR_CRITIC_REPORT.json`)

```json
{
  "auditTimestamp": "ISO-8601",
  "overallScore": 98,
  "status": "APPROVED" | "NEEDS_REFINEMENT",
  "sceneAudits": [
    {
      "sceneId": "scene_03_celebrities",
      "scaleAudit": "PASS (Host scale: 1.30, Actresses scale: 1.35)",
      "zoomAudit": "PASS (Snap zooms: 1.05x -> 1.45x -> 1.85x macro caliper)",
      "timingAudit": "PASS (< 80ms offset to 0-chapter-1.srt)",
      "assetAudit": "PASS (Jenna, Emma, Ariana, Caliper LCD, Laser Grid)",
      "critiqueNotes": "Punch-in on Ariana and Caliper is sharp and hits comedic beat accurately."
    }
  ],
  "requiredFixes": []
}
```

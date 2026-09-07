# Stickman Animation Director + Asset-First Production Bible

> **Origin**: Derived from `document(9).pdf` ("Stickman Animation Director + Asset-First Production Bible — Chapter 1").
> **Core Principle**: Continuous timeline performance. Never treat timestamps as still slides.

---

## 1. The Core Correction

The animation engine must **NOT** interpret each timestamp as a still scene.
- The SRT supplies narration timing.
- The animation is a **continuous timeline** of scenes, shots, camera moves, character performances, and prop interactions.
- A single 2-second subtitle line often contains 3–5 camera/keyframe beats.
- A scene can continue across many subtitle lines; a background can transform or be revealed by a camera move rather than simply being replaced.

---

## 2. Mandatory 9-Phase Production Order

1. **Asset Generation**: Canonical vector puppets and props with fixed anchor pivots.
2. **Asset Validation & Locking**: Freeze IDs and scale norms.
3. **Scene Graph**: Spatial hierarchy and parallax z-ordering.
4. **Camera Blocking**: Establish wide, medium, tight punch-in, macro.
5. **Character / Face / Prop Animation**: Pure function continuous performance.
6. **Transitions**: Hard cuts, motivated pans, flash bursts (no dissolves).
7. **Comedy Pass**: Physical slapstick, punch-in gestures, squash & stretch.
8. **Continuity Pass**: Persistent props across sentence boundaries.
9. **Render & Verification**: Fixed-GOP encoding, stream mux, pixel delta motion proofs.

---

## 3. Canonical Asset Specifications

### Characters & Cast
- **CHAR-M01**: Male stickman master rig — modular head, torso, arms, hands, legs, shoes; neutral, walk, run, sit, crouch, fall.
- **CHAR-F01**: Female stickman master rig — identical stroke, anchor, and IK mechanics.
- **FACE-M01 / FACE-F01**: Face expression sheets — `neutral`, `suspicious`, `confused`, `smug`, `panic`, `deadpan`, `shock`, `side_eye`, `guilty`, `sad`, `excited`, `exhausted`.
- **HANDSET**: Hand gesture library — `point` (with distinct index finger), `wave`, `shrug`, `phone`, `cup`, `sign`, `facepalm`, `crossed_arms`.
- **POSESET**: Comedy pose library — `freeze`, `lean`, `recoil`, `duck`, `tiptoe`, `collapse`, `power_pose`, `mannequin`, `exaggerated_walk`.

### Modular Parallax Environments (12 BGs)
- `BG-STUDIO`: Neutral explainer stage with foreground, midground, background layers.
- `BG-HOLLYWOOD`: Red carpet, velvet ropes, press wall, flashing paparazzi.
- `BG-CINEMA`: Theater seats, movie screen, aisle runner.
- `BG-90S`: 1990s fashion/editorial runway with studio photo lights.
- `BG-Y2K`: Metallic fashion showroom with gloss reflections.
- `BG-GYM`: Commercial gym with squat rack, treadmill, mirror wall.
- `BG-CLINIC`: Modern medical consultation room with diagnostic displays.
- `BG-RETRO`: 32-polygon low-poly PS1 wireframe world and creator UI.
- `BG-GOTHIC`: Victorian Tim Burton drawing room with heavy drapes and candelabras.
- `BG-TRIBUNAL`: Internet courtroom with judge bench, gavels, evidence displays.
- `BG-OFFICE`: Generic startup office desk, browser monitors, swivel chair.
- `BG-KITCHEN`: Meal-prep kitchen with refrigerator, cabinets, countertop.

---

## 4. The Final Agent Contract

- **Generate and lock assets before animation**.
- **Build scenes from the visual idea**, not from arbitrary 2-second chunks.
- **Treat SRT timestamps as narration boundaries**; visual scenes may span multiple lines.
- **Within every short beat, use multiple keyframe states** rather than multiple still images.
- **Animate camera independently** from characters and props.
- **Animate eyes, brows, mouth and head separately** from body movement.
- **Use parallax backgrounds and foreground occlusion** to create continuous spatial movement.
- **Use motivated transitions** rather than default fades.
- **Keep recurring SVG IDs identical** throughout the chapter.
- **Before final render, scrub the entire timeline with audio muted**. Every line must have a readable visual action, reaction, or transition.
- **Target Aesthetic**: Casual YouTube stickman comedy — simple characters, clever staging, fast visual metaphors, awkward physical reactions, deadpan holds, sudden reveals, and a camera that behaves like a human editor following a live comedic performance.

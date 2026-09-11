import os

OUT_DIR = "/root/agentic-video-pipeline/authored/anatoly-act1"
os.makedirs(OUT_DIR, exist_ok=True)

# 14 distinct comedic scenes for Act 1
scenes = [
    {
        "id": "act1-s01-skinny-guy-walkin",
        "start": 0.00,
        "end": 7.40,
        "intent": "Premise setup: Host in stark void introduces the weird YouTube genre. On 'walks into a gym' (4.16s), hard cut to gym doors opening as skinny Anatoly enters pushing his yellow mop bucket.",
        "cam": [
            "{ at: 0.00, x: 960, y: 540, zoom: 1.05 }",
            "{ at: 4.16, x: 620, y: 550, zoom: 1.15 }",
            "{ at: 7.40, x: 740, y: 550, zoom: 1.20 }",
        ],
        "render": """
  const inGym = t >= 4.16;
  if (!inGym) {
    return (
      renderBackground("BG-STUDIO", { timeSec: t }) +
      host(960, 652, t, { expression: "deadpan_classic", isTalking: true })
    );
  }
  const walkK = smooth(span(t, 4.16, 7.40));
  const janX = lerp(-120, 620, walkK);
  return (
    renderBackground("BG-GYM", { timeSec: t }) +
    mopBucket(janX - 90, 640, 1.1) +
    janitor(janX, 652, t, { isWalking: walkK < 1, expression: "deadpan_classic" }) +
    builder(1450, 650, t, { expression: "smug_rock_eyebrow", pose: "flexing" })
  );"""
    },
    {
        "id": "act1-s02-cleaning-supplies",
        "start": 7.40,
        "end": 13.00,
        "intent": "Anatoly pauses with his mop. On 'cleaning supplies' (10.67s), a thought bubble pops over his head with a doodle of a bleach spray bottle, sponge, and question mark. Deadpan innocent head tilt.",
        "cam": [
            "{ at: 7.40, x: 700, y: 540, zoom: 1.30 }",
            "{ at: 10.67, x: 720, y: 520, zoom: 1.45 }",
            "{ at: 13.00, x: 720, y: 520, zoom: 1.48 }",
        ],
        "render": """
  const bubblePop = t >= 10.67;
  const popK = smooth(span(t, 10.67, 11.2));
  return (
    renderBackground("BG-GYM", { timeSec: t }) +
    mopBucket(530, 640, 1.1) +
    janitor(650, 652, t, { expression: "deadpan_classic", spineLean: bubblePop ? 4 : 0 }) +
    (bubblePop ? thoughtBubble(760, 360, popK * 1.2) : ``)
  );"""
    },
    {
        "id": "act1-s03-can-i-try",
        "start": 13.00,
        "end": 17.00,
        "intent": "Anatoly invades the personal space of the towering 300lb bodybuilder. On 'Can I try?' (15.96s), a comic speech bubble pops over Anatoly. Low-angle dramatic look up at the mountain of muscle.",
        "cam": [
            "{ at: 13.00, x: 1050, y: 540, zoom: 1.25 }",
            "{ at: 15.96, x: 1150, y: 510, zoom: 1.48 }",
            "{ at: 17.00, x: 1150, y: 510, zoom: 1.50 }",
        ],
        "render": """
  const approachK = smooth(span(t, 13.0, 15.2));
  const janX = lerp(650, 880, approachK);
  const speechPop = t >= 15.8;
  return (
    renderBackground("BG-GYM", { timeSec: t }) +
    janitor(janX, 652, t, { isWalking: approachK < 1, expression: "deadpan_classic", spineLean: -6 }) +
    builder(1360, 640, t, { expression: "smug_rock_eyebrow", scale: 1.6 }) +
    barbell(1120, 660, 1.3) +
    (speechPop ? speechBubble(janX + 40, 420, "Can I try?", 1.1) : ``)
  );"""
    },
    {
        "id": "act1-s04-bodybuilder-laughs",
        "start": 17.00,
        "end": 20.20,
        "intent": "The bodybuilder throws his head back laughing with mouth wide open. Anatoly casually steps up to the bar loaded with 6 iron plates on each side, mop still held in his left hand.",
        "cam": [
            "{ at: 17.00, x: 960, y: 540, zoom: 1.25 }",
            "{ at: 20.20, x: 980, y: 540, zoom: 1.30 }",
        ],
        "render": """
  const laugh = Math.sin((t - 17.0) * 8) * 6;
  return (
    renderBackground("BG-GYM", { timeSec: t }) +
    builder(1360, 640 + laugh, t, { expression: "smug_chuckle", scale: 1.6, spineLean: -8 }) +
    janitor(840, 652, t, { expression: "deadpan_classic", spineLean: 6, pointTarget: { x: 1040, y: 640 } }) +
    barbell(1040, 660, 1.4)
  );"""
    },
    {
        "id": "act1-s05-the-anchor-deadlift",
        "start": 20.20,
        "end": 25.80,
        "intent": "Anatoly casually pulls the bar off the floor with ONE hand while resting on his mop. On 'anchor a small ship' (22.77s), a giant cartoon battleship anchor slams down behind the barbell with a dust shockwave. On 'Everyone starts screaming' (24.0s), a gym bro runs across the background clutching his head in panic.",
        "cam": [
            "{ at: 20.20, x: 960, y: 540, zoom: 1.25 }",
            "{ at: 22.77, x: 960, y: 555, zoom: 1.15 }",
            "{ at: 24.00, x: 960, y: 540, zoom: 1.10 }",
            "{ at: 25.80, x: 960, y: 540, zoom: 1.12 }",
        ],
        "render": """
  const liftK = smooth(span(t, 20.5, 22.0));
  const barY = lerp(660, 480, liftK);
  const anchorDrop = smooth(span(t, 22.2, 22.77));
  const anchorLanded = t >= 22.77;
  const screamBroX = lerp(-150, 2100, span(t, 23.8, 25.8));
  return (
    renderBackground("BG-GYM", { timeSec: t }) +
    (anchorDrop > 0 ? battleshipAnchor(1040, 520, 1.3, anchorDrop) : ``) +
    dust(1040, 680, anchorLanded ? Math.sin(Math.PI * span(t, 22.77, 23.6)) : 0) +
    barbell(1040, barY, 1.4) +
    janitor(800, 652, t, { expression: "deadpan_classic", spineLean: -4 }) +
    builder(1420, 640, t, { expression: "shock_jaw_drop", scale: 1.6, spineLean: -12 }) +
    (t >= 23.8 ? runningGymBro(screamBroX, 580, t, 1) : ``)
  );"""
    },
    {
        "id": "act1-s06-camera-zooms-in-destruction",
        "start": 25.80,
        "end": 29.50,
        "intent": "Literal motivated camera jump cut: On 'The camera zooms in' (26.10s), an INSTANT 1-FRAME SNAP CUT straight into an extreme macro close-up (zoom: 1.95x) of the bodybuilder's face. His jaw is dragging on the floor, pupils tiny with existential dread.",
        "cam": [
            "{ at: 25.80, x: 1380, y: 520, zoom: 1.95 }",
            "{ at: 29.50, x: 1380, y: 520, zoom: 1.98 }",
        ],
        "render": """
  const shudder = Math.sin((t - 25.8) * 12) * 2;
  return (
    renderBackground("BG-GYM", { timeSec: t }) +
    builder(1380 + shudder, 640, t, { expression: "shock_jaw_drop", scale: 1.7, spineLean: -8 })
  );"""
    },
    {
        "id": "act1-s07-it-is-okay",
        "start": 29.50,
        "end": 35.40,
        "intent": "Hard cut back to Anatoly standing completely frozen, deadpan, holding his mop, blinking once. On 34.33s, a tiny comic speech bubble pops: 'It is okay.'",
        "cam": [
            "{ at: 29.50, x: 780, y: 550, zoom: 1.45 }",
            "{ at: 34.33, x: 800, y: 540, zoom: 1.55 }",
            "{ at: 35.40, x: 800, y: 540, zoom: 1.56 }",
        ],
        "render": """
  const speechPop = t >= 34.0;
  return (
    renderBackground("BG-GYM", { timeSec: t }) +
    mopBucket(640, 640, 1.1) +
    janitor(780, 652, t, { expression: "deadpan_classic", isTalking: t >= 34.33 }) +
    (speechPop ? speechBubble(920, 440, "It is okay.", 1.15) : ``)
  );"""
    },
    {
        "id": "act1-s08-personality-lifted-ego-ghost",
        "start": 35.40,
        "end": 41.00,
        "intent": "Hard cut to Host in studio on left: 'No. It is not okay.' On right: The bodybuilder is slumped over, while his translucent white ego ghost floats upward toward the ceiling with a golden angel halo.",
        "cam": [
            "{ at: 35.40, x: 960, y: 540, zoom: 1.25 }",
            "{ at: 38.00, x: 960, y: 520, zoom: 1.30 }",
            "{ at: 41.00, x: 960, y: 510, zoom: 1.32 }",
        ],
        "render": """
  const ghostK = smooth(span(t, 36.5, 41.0));
  const ghostY = lerp(620, 240, ghostK);
  return (
    renderBackground("BG-STUDIO", { timeSec: t }) +
    host(460, 652, t, { expression: "skeptical_side_eye", isTalking: true, pointTarget: { x: 1320, y: 480 } }) +
    builder(1360, 680, t, { expression: "defeated_face_down", scale: 1.4, spineLean: -18 }) +
    egoGhost(1360, ghostY, t)
  );"""
    },
    {
        "id": "act1-s09-successful-janitor-in-history",
        "start": 41.00,
        "end": 53.00,
        "intent": "41-47s: YouTube 50M-view thumbnail mockup with clickbait frame. 47-53s: Cut to Anatoly standing atop a Roman marble pedestal holding his golden mop like Neptune's trident, while dollar bills rain down from the sky.",
        "cam": [
            "{ at: 41.00, x: 960, y: 540, zoom: 1.10 }",
            "{ at: 47.12, x: 960, y: 510, zoom: 1.35 }",
            "{ at: 53.00, x: 960, y: 500, zoom: 1.38 }",
        ],
        "render": """
  const isPedestal = t >= 47.0;
  if (!isPedestal) {
    return (
      renderBackground("BG-STUDIO", { timeSec: t }) +
      host(480, 652, t, { expression: "deadpan_classic", isTalking: true }) +
      thumbFrame(1250, 440, 1.4) +
      janitor(1250, 652, t, { expression: "smug_rock_eyebrow" })
    );
  }
  const billY = ((t * 220) % 700) - 200;
  return (
    renderBackground("BG-HOLLYWOOD", { timeSec: t }) +
    card(960, 640, 1.6, "#eab308") +
    janitor(960, 520, t, { expression: "smug_rock_eyebrow", scale: 1.35, rightHandProp: "mop" }) +
    card(500, billY, 0.5, "#22c55e") +
    card(1420, (billY + 300) % 700 - 200, 0.5, "#22c55e")
  );"""
    },
    {
        "id": "act1-s10-dr-mike-controversy",
        "start": 53.00,
        "end": 61.00,
        "intent": "Dr. Mike Israetel analysis: Dr. Mike caricature in black RP polo pointing a red biomechanics moment-arm vector at Anatoly. On 'caused a controversy' (59.74s), cartoon red lightning bolt strikes between them.",
        "cam": [
            "{ at: 53.00, x: 960, y: 540, zoom: 1.22 }",
            "{ at: 59.74, x: 960, y: 540, zoom: 1.42 }",
            "{ at: 61.00, x: 960, y: 540, zoom: 1.44 }",
        ],
        "render": """
  const lightning = t >= 59.5;
  return (
    renderBackground("BG-STUDIO", { timeSec: t }) +
    drMikeCaricature(520, 640, t) +
    janitor(1360, 652, t, { expression: "deadpan_classic" }) +
    barbell(1180, 660, 1.3) +
    (lightning ? `<line x1="960" y1="0" x2="960" y2="700" stroke="#ef4444" stroke-width="12" stroke-dasharray="20 15"/>` : ``)
  );"""
    },
    {
        "id": "act1-s11-fake-weights-debate",
        "start": 61.00,
        "end": 68.50,
        "intent": "People started arguing about fake weights, fake reactions, staged videos. Split screen comment section cards, red question marks popping over weights.",
        "cam": [
            "{ at: 61.00, x: 960, y: 540, zoom: 1.15 }",
            "{ at: 68.50, x: 960, y: 540, zoom: 1.25 }",
        ],
        "render": """
  const pulse = Math.sin((t - 61.0) * 6) * 0.5 + 0.5;
  return (
    renderBackground("BG-GYM", { timeSec: t }) +
    contrastPanels(960, 420, 1.3) +
    barbell(960, 640, 1.3) +
    dottedCircle(960, 640, 100, pulse) +
    host(460, 652, t, { expression: "skeptical_side_eye", isTalking: true })
  );"""
    },
    {
        "id": "act1-s12-detective-2am-bedroom",
        "start": 68.50,
        "end": 87.00,
        "intent": "Dark bedroom at 2:00 AM: Some guy sitting at home at 2 AM zoomed into a 480p video trying to determine whether a circular piece of metal has the correct circumference. Glowing monitor, red clock 02:03, digital caliper measuring blurry plate.",
        "cam": [
            "{ at: 68.50, x: 960, y: 540, zoom: 1.15 }",
            "{ at: 78.00, x: 960, y: 530, zoom: 1.32 }",
            "{ at: 87.00, x: 960, y: 515, zoom: 1.45 }",
        ],
        "render": """
  return (
    bedroom2AM(960, 540, t) +
    host(380, 652, t, { expression: "deadpan_classic", isTalking: true })
  );"""
    },
    {
        "id": "act1-s13-enhance-macro",
        "start": 87.00,
        "end": 88.20,
        "intent": "Instant macro punch cut on 'Enhance.' Extreme close-up of the pixel grid reflection in the detective glasses.",
        "cam": [
            "{ at: 87.00, x: 960, y: 515, zoom: 1.95 }",
            "{ at: 88.20, x: 960, y: 515, zoom: 1.98 }",
        ],
        "render": """
  return (
    bedroom2AM(960, 540, t) +
    speechBubble(960, 420, "Enhance.", 1.2)
  );"""
    },
    {
        "id": "act1-s14-brother-go-outside",
        "start": 88.20,
        "end": 90.80,
        "intent": "Blinding cut from the dark room to stark daylight: Host stands in the doorway looking dead down the lens, kicking open the door to reveal rolling green grass and bright sunshine, pointing outside: 'Brother. That is a weight plate. Go outside.'",
        "cam": [
            "{ at: 88.20, x: 960, y: 540, zoom: 1.28 }",
            "{ at: 90.80, x: 960, y: 540, zoom: 1.30 }",
        ],
        "render": """
  return (
    renderBackground("BG-STUDIO", { timeSec: t }) +
    greenGrassDoor(1280, 540, 1.0) +
    host(680, 652, t, { expression: "deadpan_classic", isTalking: true, pointTarget: { x: 1280, y: 500 } })
  );"""
    },
]

for idx, s in enumerate(scenes, 1):
    filename = f"s{idx:02d}.ts"
    filepath = os.path.join(OUT_DIR, filename)
    cam_str = ",\n  ".join(s["cam"])
    content = f"""/**
 * Act 1 Scene {idx:02d} ({s['start']:.2f}–{s['end']:.2f}s): {s['id']}
 * {s['intent']}
 */
import {{ renderBackground }} from "../../src/assets/BackgroundLibrary.js";
import {{
  host, janitor, builder, suit, drMike, scroller,
  dust, cursor, clickbaitArrow, dottedCircle, cameraRig, barbell,
  crewSil, verdictStage, contrastPanels, thumbFrame, card,
  mopBucket, thoughtBubble, speechBubble, egoGhost, battleshipAnchor,
  runningGymBro, drMikeCaricature, bedroom2AM, greenGrassDoor,
}} from "./shared.js";
import {{
  keyframedCamera,
  withPunch,
  smooth,
  span,
  lerp,
  type AuthoredScene,
}} from "../../src/authored/AuthoredScene.js";

export const S_START = {s['start']:.2f};
export const S_END = {s['end']:.2f};

function renderWorld(t: number): string {{{s['render']}
}}

const baseCamera = keyframedCamera([
  {cam_str}
]);

export const scene: AuthoredScene = {{
  id: "{s['id']}",
  start: S_START,
  end: S_END,
  intent: "{s['intent']}",
  renderWorld,
  camera: withPunch(baseCamera, S_START + 0.3, 0.15),
}};
"""
    with open(filepath, "w") as f:
        f.write(content)
    print(f"Wrote Act 1 {filename} ({s['start']:.2f} -> {s['end']:.2f}s)")

# Generate index.ts
imports = [f"import {{ scene as s{i:02d} }} from \"./s{i:02d}.js\";" for i in range(1, 15)]
scene_list = [f"s{i:02d}" for i in range(1, 15)]

index_content = f"""/**
 * Anatoly Act 1 Gold Standard (0.00–90.80s): 14 scenes, handcrafted comedy direction.
 */
import type {{ AuthoredFilm }} from "../../src/authored/AuthoredScene.js";
{chr(10).join(imports)}

export const WINDOW = {{ start: 0.00, end: 90.80 }};
export const AUDIO = "/root/Desktop/anatoly/0-anatoly-and-the-most-obviously.mp3";

export const film: AuthoredFilm = {{
  name: "anatoly-act1",
  scenes: [
    {", ".join(scene_list)}
  ],
}};
export default film;
"""
with open(os.path.join(OUT_DIR, "index.ts"), "w") as f:
    f.write(index_content)
print("Created Act 1 index.ts!")

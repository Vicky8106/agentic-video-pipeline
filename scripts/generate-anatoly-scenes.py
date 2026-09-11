import os
import re

OUT_DIR = "/root/agentic-video-pipeline/authored/anatoly-full"
os.makedirs(OUT_DIR, exist_ok=True)

cuts = [
    0.00, 25.49, 52.88, 86.45, 116.30, 144.54, 171.75, 197.63, 225.03, 251.17,
    277.95, 307.86, 332.62, 362.13, 386.58, 420.73, 446.46, 474.73, 503.00,
    527.18, 553.00, 579.42, 603.46, 630.84, 657.97, 682.55, 707.65, 735.61,
    760.03, 788.27, 813.99, 841.51, 853.46,
    872.02, 892.48, 902.36, 911.73, 924.63, 941.00, 973.57
]

# Descriptions and directorial intents for each scene:
scene_specs = [
    # 1
    {
        "id": "anatoly-s01-skinny-janitor",
        "intent": "The skinny janitor premise: Host introduces the genre. Anatoly walks in holding mop, enters stage right and approaches giant bodybuilder flexing.",
        "bg": "BG-GYM",
        "setup": "janitor walk-in to gym",
        "cam": [
            "{ at: S_START, x: 960, y: 560, zoom: 1.05 }",
            "{ at: S_START + 10, x: 800, y: 560, zoom: 1.15 }",
            "{ at: S_START + 18, x: 1200, y: 560, zoom: 1.35 }",
            "{ at: S_END, x: 1200, y: 560, zoom: 1.38 }",
        ],
        "render": """
  const walkK = smooth(span(t, S_START + 6.0, S_START + 12.0));
  const janX = lerp(-100, 720, walkK);
  return (
    renderBackground("BG-GYM", { timeSec: t }) +
    host(440, 652, t, { expression: "deadpan_classic", isTalking: t < S_START + 12 }) +
    janitor(janX, 652, t, { isWalking: walkK > 0 && walkK < 1, expression: "deadpan_classic" }) +
    builder(1420, 650, t, { expression: "smug_rock_eyebrow", pose: "flexing" }) +
    barbell(1100, 660, 1.2)
  );"""
    },
    # 2
    {
        "id": "anatoly-s02-mop-deadlift",
        "intent": "Emotional destruction: Bodybuilder watches in horror as Anatoly one-hand deadlifts the barbell while mopping the floor. Snap zoom on bodybuilder jaw drop.",
        "bg": "BG-GYM",
        "cam": [
            "{ at: S_START, x: 1100, y: 560, zoom: 1.15 }",
            "{ at: S_START + 8, x: 1250, y: 550, zoom: 1.45 }",
            "{ at: S_START + 18, x: 1380, y: 540, zoom: 1.65 }",
            "{ at: S_END, x: 1380, y: 540, zoom: 1.68 }",
        ],
        "render": """
  const liftK = smooth(span(t, S_START + 6.0, S_START + 10.0));
  const barY = lerp(660, 480, liftK);
  const shock = t >= S_START + 10;
  return (
    renderBackground("BG-GYM", { timeSec: t }) +
    janitor(820, 652, t, { expression: "deadpan_classic", spineLean: -4, pointTarget: { x: 1380, y: 500 } }) +
    barbell(960, barY, 1.3) +
    dust(960, 680, liftK > 0 && liftK < 1 ? liftK : 0) +
    builder(1380, 650, t, { expression: shock ? "shock_jaw_drop" : "smug_rock_eyebrow", spineLean: shock ? -8 : 0 })
  );"""
    },
    # 3
    {
        "id": "anatoly-s03-fake-weight-debate",
        "intent": "The fake weights debate & Dr. Mike: Clinic stage. Dr. Mike enters with biomechanics clipboard, pointing at barbell leverage diagrams.",
        "bg": "BG-CLINIC",
        "cam": [
            "{ at: S_START, x: 960, y: 560, zoom: 1.1 }",
            "{ at: S_START + 12, x: 1150, y: 550, zoom: 1.35 }",
            "{ at: S_START + 24, x: 1200, y: 540, zoom: 1.55 }",
            "{ at: S_END, x: 1200, y: 540, zoom: 1.58 }",
        ],
        "render": """
  const enterK = smooth(span(t, S_START + 3.0, S_START + 8.0));
  const docX = lerp(2100, 1260, enterK);
  return (
    renderBackground("BG-CLINIC", { timeSec: t }) +
    host(460, 652, t, { expression: "deadpan_classic", isTalking: t < S_START + 15 }) +
    drMike(docX, 650, t, { expression: "smug_rock_eyebrow", isTalking: t >= S_START + 15, pointTarget: { x: 800, y: 400 } }) +
    card(850, 480, 1.0, "#38bdf8")
  );"""
    },
    # 4
    {
        "id": "anatoly-s04-touch-grass",
        "intent": "'Enhance! Brother, that is a weight plate. Go outside.' CSI style magnifying glass inspector examining iron collar. Host tells internet detectives to touch grass.",
        "bg": "BG-GYM",
        "cam": [
            "{ at: S_START, x: 960, y: 560, zoom: 1.12 }",
            "{ at: S_START + 10, x: 1080, y: 550, zoom: 1.4 }",
            "{ at: S_START + 20, x: 1250, y: 540, zoom: 1.6 }",
            "{ at: S_END, x: 1250, y: 540, zoom: 1.62 }",
        ],
        "render": """
  const pulse = Math.sin((t - S_START) * 6) * 0.5 + 0.5;
  return (
    renderBackground("BG-GYM", { timeSec: t }) +
    host(500, 652, t, { expression: "skeptical_side_eye", isTalking: true, pointTarget: { x: 1280, y: 540 } }) +
    barbell(1280, 620, 1.3) +
    dottedCircle(1280, 620, 90, pulse) +
    clickbaitArrow(1120, 480, 45, 1.1)
  );"""
    },
    # 5
    {
        "id": "anatoly-s05-elite-powerlifter",
        "intent": "Elite powerlifter reality: Vladimir Shmondenko deadlifting huge stack of plates vs the circus entertainment format.",
        "bg": "BG-GYM",
        "cam": [
            "{ at: S_START, x: 960, y: 560, zoom: 1.08 }",
            "{ at: S_START + 14, x: 900, y: 550, zoom: 1.3 }",
            "{ at: S_END, x: 880, y: 550, zoom: 1.35 }",
        ],
        "render": """
  const lift = smooth(span(t, S_START + 8, S_START + 14));
  return (
    renderBackground("BG-GYM", { timeSec: t }) +
    janitor(750, 652, t, { expression: "deadpan_classic", spineLean: -6 }) +
    barbell(850, lerp(660, 520, lift), 1.4) +
    dust(850, 680, lift > 0 && lift < 1 ? lift : 0) +
    host(1400, 652, t, { expression: "deadpan_classic", pointTarget: { x: 850, y: 550 } })
  );"""
    },
    # 6
    {
        "id": "anatoly-s06-making-a-video",
        "intent": "Making a video, not a conspiracy: Camera rigs and wireless boom mics pop up around the gym bench. Filmmaking reality.",
        "bg": "BG-GYM",
        "cam": [
            "{ at: S_START, x: 960, y: 560, zoom: 1.05 }",
            "{ at: S_START + 12, x: 1100, y: 550, zoom: 1.28 }",
            "{ at: S_END, x: 1100, y: 550, zoom: 1.3 }",
        ],
        "render": """
  const rig1In = smooth(span(t, S_START + 4, S_START + 7));
  const rig2In = smooth(span(t, S_START + 12, S_START + 15));
  return (
    renderBackground("BG-GYM", { timeSec: t }) +
    host(520, 652, t, { expression: "deadpan_classic", isTalking: true }) +
    barbell(1000, 660, 1.2) +
    (rig1In > 0 ? cameraRig(lerp(-100, 240, rig1In), 580, 1.1) : ``) +
    (rig2In > 0 ? cameraRig(lerp(2100, 1580, rig2In), 580, 1.2) : ``)
  );"""
    },
    # 7
    {
        "id": "anatoly-s07-real-gym-scrolling",
        "intent": "Real gym life: While YouTube shows cinematic pacing, real gym life is a bro sitting on the bench scrolling Instagram for 20 minutes while host taps foot.",
        "bg": "BG-GYM",
        "cam": [
            "{ at: S_START, x: 960, y: 560, zoom: 1.1 }",
            "{ at: S_START + 10, x: 1220, y: 550, zoom: 1.35 }",
            "{ at: S_END, x: 1220, y: 550, zoom: 1.4 }",
        ],
        "render": """
  const tap = Math.sin((t - S_START) * 5) * 4;
  return (
    renderBackground("BG-GYM", { timeSec: t }) +
    host(480, 652 + tap, t, { expression: "skeptical_side_eye", isTalking: true }) +
    scroller(1260, 650, t, { isTalking: false, expression: "derp_smile" })
  );"""
    },
    # 8
    {
        "id": "anatoly-s08-contrast-theory",
        "intent": "The Contrast Theory: Split-screen contrast panels. The weak-looking janitor vs the muscle mountain. Contrast is what sells the click.",
        "bg": "BG-STUDIO",
        "cam": [
            "{ at: S_START, x: 960, y: 540, zoom: 1.05 }",
            "{ at: S_START + 12, x: 960, y: 540, zoom: 1.25 }",
            "{ at: S_END, x: 960, y: 540, zoom: 1.28 }",
        ],
        "render": """
  return (
    renderBackground("BG-STUDIO", { timeSec: t }) +
    contrastPanels(960, 420, 1.3) +
    janitor(560, 652, t, { expression: "deadpan_classic" }) +
    builder(1360, 650, t, { expression: "smug_rock_eyebrow", pose: "flexing" }) +
    host(960, 670, t, { expression: "deadpan_classic", isTalking: true })
  );"""
    },
    # 9
    {
        "id": "anatoly-s09-weight-perception",
        "intent": "Weight perception illusion: 200kg vs 300kg. To the human eye, both just look like round black circles. Question marks pop as brain short-circuits.",
        "bg": "BG-GYM",
        "cam": [
            "{ at: S_START, x: 960, y: 560, zoom: 1.08 }",
            "{ at: S_START + 12, x: 1100, y: 550, zoom: 1.32 }",
            "{ at: S_END, x: 1100, y: 550, zoom: 1.35 }",
        ],
        "render": """
  return (
    renderBackground("BG-GYM", { timeSec: t }) +
    host(500, 652, t, { expression: "deadpan_classic", isTalking: true }) +
    barbell(950, 660, 1.1) +
    barbell(1350, 660, 1.3) +
    cursor(1150, 460, 1.2, 0)
  );"""
    },
    # 10
    {
        "id": "anatoly-s10-youtube-detectives",
        "intent": "The YouTube detective investigation begins: Accusation pops up, forensic caliper and frame-by-frame zoom on the barbell.",
        "bg": "BG-TRIBUNAL",
        "cam": [
            "{ at: S_START, x: 960, y: 560, zoom: 1.1 }",
            "{ at: S_START + 12, x: 1200, y: 550, zoom: 1.4 }",
            "{ at: S_END, x: 1200, y: 550, zoom: 1.42 }",
        ],
        "render": """
  return (
    renderBackground("BG-TRIBUNAL", { timeSec: t }) +
    suit(480, 652, t, { expression: "skeptical_side_eye", isTalking: true }) +
    barbell(1200, 640, 1.3) +
    clickbaitArrow(1050, 520, -30, 1.2) +
    dottedCircle(1200, 640, 100, Math.sin(t * 4))
  );"""
    },
    # 11
    {
        "id": "anatoly-s11-athleanx-callback",
        "intent": "Athlean-X Jeff Cavaliere callback: The iconic fake weight controversy where styrofoam plates bounced. Chalkboard anatomy.",
        "bg": "BG-CLINIC",
        "cam": [
            "{ at: S_START, x: 960, y: 560, zoom: 1.05 }",
            "{ at: S_START + 14, x: 1250, y: 550, zoom: 1.35 }",
            "{ at: S_END, x: 1250, y: 550, zoom: 1.38 }",
        ],
        "render": """
  const bounce = Math.abs(Math.sin((t - S_START) * 4)) * 40;
  return (
    renderBackground("BG-CLINIC", { timeSec: t }) +
    host(500, 652, t, { expression: "smug_rock_eyebrow", isTalking: true }) +
    card(900, 480, 1.1, "#f59e0b") +
    barbell(1300, 640 - bounce, 1.2)
  );"""
    },
    # 12
    {
        "id": "anatoly-s12-witch-hunt",
        "intent": "Fitness YouTube witch hunt: Fingerprint dusters, internet tribunal gavel slam. Suddenly lifting weights requires FBI clearance.",
        "bg": "BG-TRIBUNAL",
        "cam": [
            "{ at: S_START, x: 960, y: 560, zoom: 1.15 }",
            "{ at: S_START + 10, x: 800, y: 560, zoom: 1.35 }",
            "{ at: S_END, x: 800, y: 560, zoom: 1.38 }",
        ],
        "render": """
  const slam = Math.sin((t - S_START) * 8);
  return (
    renderBackground("BG-TRIBUNAL", { timeSec: t }) +
    suit(780, 652, t, { expression: "smug_rock_eyebrow", spineLean: slam > 0.5 ? -6 : 0, isTalking: true }) +
    host(1360, 652, t, { expression: "shock_jaw_drop" })
  );"""
    },
    # 13
    {
        "id": "anatoly-s13-1995-explainer",
        "intent": "Explaining fitness YouTube to someone from 1995: 'There is this fitness guy on the internet.' Retro 90s background, confusion.",
        "bg": "BG-90S",
        "cam": [
            "{ at: S_START, x: 960, y: 560, zoom: 1.08 }",
            "{ at: S_START + 12, x: 960, y: 560, zoom: 1.28 }",
            "{ at: S_END, x: 960, y: 560, zoom: 1.3 }",
        ],
        "render": """
  return (
    renderBackground("BG-90S", { timeSec: t }) +
    host(520, 652, t, { expression: "deadpan_classic", isTalking: true }) +
    janitor(1280, 652, t, { expression: "deadpan_classic", pointTarget: { x: 520, y: 500 } })
  );"""
    },
    # 14
    {
        "id": "anatoly-s14-muscles-vs-physics",
        "intent": "Muscles vs Physics: Just because someone is huge doesn't mean they understand biomechanics. Dr. Mike returns to whiteboard.",
        "bg": "BG-STUDIO",
        "cam": [
            "{ at: S_START, x: 960, y: 560, zoom: 1.1 }",
            "{ at: S_START + 10, x: 1200, y: 550, zoom: 1.38 }",
            "{ at: S_END, x: 1200, y: 550, zoom: 1.4 }",
        ],
        "render": """
  return (
    renderBackground("BG-STUDIO", { timeSec: t }) +
    host(460, 652, t, { expression: "deadpan_classic" }) +
    drMike(940, 650, t, { expression: "smug_rock_eyebrow", isTalking: true, pointTarget: { x: 1380, y: 460 } }) +
    builder(1420, 650, t, { expression: "derp_smile" })
  );"""
    },
    # 15
    {
        "id": "anatoly-s15-nuance-vs-drama",
        "intent": "Nuance vs Drama: People don't want nuanced physics equations, they want fireworks, drama, and shouting. Scale of nuance tipping.",
        "bg": "BG-STUDIO",
        "cam": [
            "{ at: S_START, x: 960, y: 560, zoom: 1.05 }",
            "{ at: S_START + 15, x: 960, y: 560, zoom: 1.25 }",
            "{ at: S_END, x: 960, y: 560, zoom: 1.28 }",
        ],
        "render": """
  const tip = smooth(span(t, S_START + 8, S_START + 14));
  return (
    renderBackground("BG-STUDIO", { timeSec: t }) +
    host(960, 652, t, { expression: "skeptical_side_eye", isTalking: true }) +
    contrastPanels(500, 480, 1.2) +
    card(1420, 480, 1.1, "#ef4444")
  );"""
    },
    # 16
    {
        "id": "anatoly-s16-clickbait-formula",
        "intent": "The Clickbait Formula: Giant glowing red arrow and red dotted circle pointing at Anatoly's face with shocked open-mouth expression.",
        "bg": "BG-GYM",
        "cam": [
            "{ at: S_START, x: 960, y: 560, zoom: 1.12 }",
            "{ at: S_START + 12, x: 1100, y: 540, zoom: 1.45 }",
            "{ at: S_END, x: 1100, y: 540, zoom: 1.48 }",
        ],
        "render": """
  const pulse = Math.sin((t - S_START) * 5) * 0.5 + 0.5;
  return (
    renderBackground("BG-GYM", { timeSec: t }) +
    host(460, 652, t, { expression: "deadpan_classic" }) +
    janitor(1120, 652, t, { expression: "shock_jaw_drop" }) +
    clickbaitArrow(900, 440, 30, 1.3) +
    dottedCircle(1120, 540, 110, pulse)
  );"""
    },
    # 17
    {
        "id": "anatoly-s17-fame-ruins-prank",
        "intent": "Fame ruins the prank: Anatoly walks in, and everyone in the gym immediately pulls out their phones screaming 'ARE YOU ANATOLY?!'",
        "bg": "BG-GYM",
        "cam": [
            "{ at: S_START, x: 960, y: 560, zoom: 1.1 }",
            "{ at: S_START + 12, x: 800, y: 560, zoom: 1.35 }",
            "{ at: S_END, x: 800, y: 560, zoom: 1.38 }",
        ],
        "render": """
  return (
    renderBackground("BG-GYM", { timeSec: t }) +
    janitor(780, 652, t, { expression: "smug_rock_eyebrow" }) +
    scroller(1220, 650, t, { expression: "shock_eye_pop", pointTarget: { x: 780, y: 520 } }) +
    scroller(1480, 650, t, { expression: "shock_eye_pop", pointTarget: { x: 780, y: 520 } })
  );"""
    },
    # 18
    {
        "id": "anatoly-s18-billboard-fame",
        "intent": "Success destroys the condition for success: Sneaking into houses then putting your face on a billboard. Massive Anatoly billboard in gym.",
        "bg": "BG-HOLLYWOOD",
        "cam": [
            "{ at: S_START, x: 960, y: 560, zoom: 1.05 }",
            "{ at: S_START + 14, x: 1100, y: 550, zoom: 1.3 }",
            "{ at: S_END, x: 1100, y: 550, zoom: 1.32 }",
        ],
        "render": """
  return (
    renderBackground("BG-HOLLYWOOD", { timeSec: t }) +
    host(480, 652, t, { expression: "deadpan_classic", isTalking: true }) +
    thumbFrame(1260, 420, 1.4) +
    janitor(1260, 652, t, { expression: "smug_rock_eyebrow" })
  );"""
    },
    # 19
    {
        "id": "anatoly-s19-prank-sociology",
        "intent": "Prank sociology: A prank is planned by definition. 'If you announce it, that is a corporate meeting, not a prank.'",
        "bg": "BG-STUDIO",
        "cam": [
            "{ at: S_START, x: 960, y: 560, zoom: 1.08 }",
            "{ at: S_START + 10, x: 960, y: 560, zoom: 1.3 }",
            "{ at: S_END, x: 960, y: 560, zoom: 1.32 }",
        ],
        "render": """
  return (
    renderBackground("BG-STUDIO", { timeSec: t }) +
    host(960, 652, t, { expression: "deadpan_classic", isTalking: true }) +
    card(460, 460, 1.0, "#38bdf8") +
    card(1460, 460, 1.0, "#a855f7")
  );"""
    },
    # 20
    {
        "id": "anatoly-s20-editing-the-boring",
        "intent": "The Editing Room: Six hours of gym footage where a guy says 'Okay' gets trimmed down. Film strips and timeline cutters.",
        "bg": "BG-OFFICE",
        "cam": [
            "{ at: S_START, x: 960, y: 560, zoom: 1.1 }",
            "{ at: S_START + 12, x: 1150, y: 550, zoom: 1.35 }",
            "{ at: S_END, x: 1150, y: 550, zoom: 1.38 }",
        ],
        "render": """
  return (
    renderBackground("BG-OFFICE", { timeSec: t }) +
    host(480, 652, t, { expression: "deadpan_classic", isTalking: true }) +
    crewSil(1150, 580, 1.3, "edit", t)
  );"""
    },
    # 21
    {
        "id": "anatoly-s21-staged-vs-fake",
        "intent": "Staged does not equal Fake: Reality TV comparison. An arranged setup with genuine human surprise.",
        "bg": "BG-GYM",
        "cam": [
            "{ at: S_START, x: 960, y: 560, zoom: 1.05 }",
            "{ at: S_START + 12, x: 1200, y: 550, zoom: 1.32 }",
            "{ at: S_END, x: 1200, y: 550, zoom: 1.35 }",
        ],
        "render": """
  return (
    renderBackground("BG-GYM", { timeSec: t }) +
    host(460, 652, t, { expression: "deadpan_classic", isTalking: true }) +
    janitor(960, 652, t, { expression: "deadpan_classic" }) +
    builder(1380, 650, t, { expression: "shock_jaw_drop" })
  );"""
    },
    # 22
    {
        "id": "anatoly-s22-illusion-worked",
        "intent": "The Illusion Succeeded: 'Congratulations, Anatoly, you got millions of people to debate whether your prank is real. That is marketing.'",
        "bg": "BG-STUDIO",
        "cam": [
            "{ at: S_START, x: 960, y: 560, zoom: 1.1 }",
            "{ at: S_START + 10, x: 960, y: 560, zoom: 1.32 }",
            "{ at: S_END, x: 960, y: 560, zoom: 1.35 }",
        ],
        "render": """
  return (
    renderBackground("BG-STUDIO", { timeSec: t }) +
    host(960, 652, t, { expression: "smug_rock_eyebrow", isTalking: true }) +
    card(500, 460, 1.1, "#eab308") +
    card(1420, 460, 1.1, "#22c55e")
  );"""
    },
    # 23
    {
        "id": "anatoly-s23-archetype-character",
        "intent": "The Archetype: Anatoly transitioned from person to mythical folklore hero. The clueless janitor with Hercules strength.",
        "bg": "BG-HOLLYWOOD",
        "cam": [
            "{ at: S_START, x: 960, y: 560, zoom: 1.08 }",
            "{ at: S_START + 12, x: 1100, y: 550, zoom: 1.3 }",
            "{ at: S_END, x: 1100, y: 550, zoom: 1.32 }",
        ],
        "render": """
  return (
    renderBackground("BG-HOLLYWOOD", { timeSec: t }) +
    host(460, 652, t, { expression: "deadpan_classic", isTalking: true }) +
    janitor(1150, 652, t, { expression: "smug_rock_eyebrow", spineLean: 4 })
  );"""
    },
    # 24
    {
        "id": "anatoly-s24-radioactive-forklift",
        "intent": "Gordon Ramsay cooking metaphor & Radioactive Forklift: He is not accidentally strong; he is lifting your mortgage. Radioactive forklift glowing.",
        "bg": "BG-GYM",
        "cam": [
            "{ at: S_START, x: 960, y: 560, zoom: 1.1 }",
            "{ at: S_START + 12, x: 1250, y: 550, zoom: 1.4 }",
            "{ at: S_END, x: 1250, y: 550, zoom: 1.42 }",
        ],
        "render": """
  return (
    renderBackground("BG-GYM", { timeSec: t }) +
    host(480, 652, t, { expression: "deadpan_classic", isTalking: true }) +
    barbell(1280, 520, 1.4) +
    janitor(1180, 652, t, { expression: "smug_rock_eyebrow" })
  );"""
    },
    # 25
    {
        "id": "anatoly-s25-real-weights-misleading",
        "intent": "Misleading with 100% real weights: You do not need fake plates to mislead. Cut out the failed attempts, show only the hero lift.",
        "bg": "BG-STUDIO",
        "cam": [
            "{ at: S_START, x: 960, y: 560, zoom: 1.05 }",
            "{ at: S_START + 10, x: 960, y: 560, zoom: 1.25 }",
            "{ at: S_END, x: 960, y: 560, zoom: 1.28 }",
        ],
        "render": """
  return (
    renderBackground("BG-STUDIO", { timeSec: t }) +
    contrastPanels(960, 440, 1.3) +
    host(960, 670, t, { expression: "deadpan_classic", isTalking: true })
  );"""
    },
    # 26
    {
        "id": "anatoly-s26-power-of-editing",
        "intent": "The Power of Cinematic Editing: Dramatic slow-mo zoom, epic audio waveforms, turning a simple lift into Greek mythology.",
        "bg": "BG-GYM",
        "cam": [
            "{ at: S_START, x: 960, y: 560, zoom: 1.15 }",
            "{ at: S_START + 12, x: 1200, y: 550, zoom: 1.45 }",
            "{ at: S_END, x: 1200, y: 550, zoom: 1.48 }",
        ],
        "render": """
  return (
    renderBackground("BG-GYM", { timeSec: t }) +
    host(480, 652, t, { expression: "smug_rock_eyebrow", isTalking: true }) +
    crewSil(1180, 580, 1.3, "cam", t)
  );"""
    },
    # 27
    {
        "id": "anatoly-s27-audience-lab-rats",
        "intent": "The Audience as Lab Rats: We click the red button every single time. 'SKINNY JANITOR DESTROYS 300KG GYM BRO' click loop.",
        "bg": "BG-STUDIO",
        "cam": [
            "{ at: S_START, x: 960, y: 560, zoom: 1.05 }",
            "{ at: S_START + 12, x: 1100, y: 550, zoom: 1.3 }",
            "{ at: S_END, x: 1100, y: 550, zoom: 1.32 }",
        ],
        "render": """
  return (
    renderBackground("BG-STUDIO", { timeSec: t }) +
    host(480, 652, t, { expression: "deadpan_classic", isTalking: true }) +
    thumbFrame(1250, 440, 1.3) +
    cursor(1250, 480, 1.4, 0)
  );"""
    },
    # 28
    {
        "id": "anatoly-s28-views-counter",
        "intent": "YOU WILL NOT BELIEVE WHAT HAPPENS NEXT: Millions of views counter spinning upwards rapidly like a slot machine.",
        "bg": "BG-HOLLYWOOD",
        "cam": [
            "{ at: S_START, x: 960, y: 560, zoom: 1.08 }",
            "{ at: S_START + 10, x: 960, y: 560, zoom: 1.3 }",
            "{ at: S_END, x: 960, y: 560, zoom: 1.32 }",
        ],
        "render": """
  return (
    renderBackground("BG-HOLLYWOOD", { timeSec: t }) +
    host(960, 652, t, { expression: "smug_rock_eyebrow", isTalking: true }) +
    card(520, 460, 1.1, "#f59e0b") +
    card(1400, 460, 1.1, "#10b981")
  );"""
    },
    # 29
    {
        "id": "anatoly-s29-wwe-three-cameras",
        "intent": "WWE Wrestling reality: Accidental 3-camera setup with hidden wireless lav mic. Coincidence vs Production Schedule.",
        "bg": "BG-GYM",
        "cam": [
            "{ at: S_START, x: 960, y: 560, zoom: 1.1 }",
            "{ at: S_START + 12, x: 1100, y: 550, zoom: 1.35 }",
            "{ at: S_END, x: 1100, y: 550, zoom: 1.38 }",
        ],
        "render": """
  return (
    renderBackground("BG-GYM", { timeSec: t }) +
    host(480, 652, t, { expression: "deadpan_classic", isTalking: true }) +
    janitor(960, 652, t, { expression: "deadpan_classic" }) +
    cameraRig(1350, 580, 1.2)
  );"""
    },
    # 30
    {
        "id": "anatoly-s30-the-call-sheet",
        "intent": "The Call Sheet: At some point the janitor has a call sheet, catering, and security release forms. A legitimate television production.",
        "bg": "BG-OFFICE",
        "cam": [
            "{ at: S_START, x: 960, y: 560, zoom: 1.05 }",
            "{ at: S_START + 12, x: 1150, y: 550, zoom: 1.32 }",
            "{ at: S_END, x: 1150, y: 550, zoom: 1.35 }",
        ],
        "render": """
  return (
    renderBackground("BG-OFFICE", { timeSec: t }) +
    suit(480, 652, t, { expression: "smug_rock_eyebrow", isTalking: true }) +
    card(1200, 480, 1.2, "#6366f1")
  );"""
    },
    # 31
    {
        "id": "anatoly-s31-greys-anatomy",
        "intent": "Don't Learn Fitness from Pranks: Learning lifting from Anatoly is like learning neurosurgery from Grey's Anatomy. Doctor scrubs and scalpel.",
        "bg": "BG-CLINIC",
        "cam": [
            "{ at: S_START, x: 960, y: 560, zoom: 1.1 }",
            "{ at: S_START + 12, x: 1200, y: 550, zoom: 1.35 }",
            "{ at: S_END, x: 1200, y: 550, zoom: 1.38 }",
        ],
        "render": """
  return (
    renderBackground("BG-CLINIC", { timeSec: t }) +
    host(480, 652, t, { expression: "deadpan_classic", isTalking: true }) +
    drMike(1250, 650, t, { expression: "smug_rock_eyebrow" })
  );"""
    },
    # 32
    {
        "id": "anatoly-s32-where-leaves-controversy",
        "intent": "Bridge to Finale: 'Technically doctors. So where does that leave the controversy? Somewhere much less dramatic than the internet wants...'",
        "bg": "BG-GYM",
        "cam": [
            "{ at: S_START, x: 960, y: 560, zoom: 1.02 }",
            "{ at: S_END, x: 960, y: 560, zoom: 1.1 }",
        ],
        "render": """
  return (
    renderBackground("BG-GYM", { timeSec: t }) +
    host(960, 652, t, { expression: "deadpan_classic", isTalking: true })
  );"""
    },
]

# Generate scenes 1 to 32
for i, spec in enumerate(scene_specs):
    st = cuts[i]
    en = cuts[i+1]
    idx = i + 1
    filename = f"s{idx:02d}.ts"
    filepath = os.path.join(OUT_DIR, filename)

    content = f'''/**
 * Scene {idx:02d} ({st:.2f}–{en:.2f}s): {spec["id"]}
 * {spec["intent"]}
 */
import {{ renderBackground }} from "../../src/assets/BackgroundLibrary.js";
import {{
  host, janitor, builder, suit, drMike, scroller,
  dust, cursor, clickbaitArrow, dottedCircle, cameraRig, barbell,
  crewSil, verdictStage, contrastPanels, thumbFrame, card,
}} from "./shared.js";
import {{
  keyframedCamera,
  withPunch,
  smooth,
  span,
  lerp,
  type AuthoredScene,
}} from "../../src/authored/AuthoredScene.js";

export const S_START = {st:.2f};
export const S_END = {en:.2f};

function renderWorld(t: number): string {{{spec["render"]}
}}

cam_joined = ",
  ".join(spec["cam"])
    content_cam = f"const baseCamera = keyframedCamera([\n  {cam_joined}\n]);" 

export const scene: AuthoredScene = {{
  id: "{spec["id"]}",
  start: S_START,
  end: S_END,
  intent: "{spec["intent"]}",
  renderWorld,
  camera: withPunch(baseCamera, S_START + 0.5, 0.2),
}};
'''
    with open(filepath, "w") as f:
        f.write(content)
    print(f"Wrote {filename} ({st:.2f} -> {en:.2f})")

print("Generated 32 scene files!")

import { renderStickFigure } from "../../character/StickFigure";
import { renderBackground } from "../../assets/BackgroundLibrary";
import { renderProp } from "../../assets/PropLibrary";
const esc = (s) => String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
// Keyword to Canonical Background Map
const BG_MAP = {
    hollywood: "BG-HOLLYWOOD",
    red_carpet: "BG-HOLLYWOOD",
    instagram: "BG-HOLLYWOOD",
    celebrity: "BG-HOLLYWOOD",
    jenna: "BG-HOLLYWOOD",
    ortega: "BG-HOLLYWOOD",
    emma: "BG-HOLLYWOOD",
    ariana: "BG-HOLLYWOOD",
    tech_bro: "BG-OFFICE",
    crypto: "BG-OFFICE",
    ai: "BG-OFFICE",
    office: "BG-OFFICE",
    pivot: "BG-OFFICE",
    boss: "BG-OFFICE",
    saas: "BG-OFFICE",
    unsubscribe: "BG-OFFICE",
    ps1: "BG-RETRO",
    tim_burton: "BG-RETRO",
    retro: "BG-RETRO",
    character_creator: "BG-RETRO",
    "90s": "BG-90S",
    kate_moss: "BG-90S",
    heroin_chic: "BG-90S",
    y2k: "BG-Y2K",
    low_rise: "BG-Y2K",
    gym: "BG-GYM",
    workout: "BG-GYM",
    marvel: "BG-GYM",
    chicken: "BG-KITCHEN",
    broccoli: "BG-KITCHEN",
    meal_prep: "BG-KITCHEN",
    kitchen: "BG-KITCHEN",
    clinic: "BG-CLINIC",
    ozempic: "BG-CLINIC",
    glp1: "BG-CLINIC",
    buccal: "BG-CLINIC",
    cheekbone: "BG-CLINIC",
    surgery: "BG-CLINIC",
    botox: "BG-CLINIC",
    tribunal: "BG-TRIBUNAL",
    tiktok: "BG-TRIBUNAL",
    court: "BG-TRIBUNAL",
    judge: "BG-TRIBUNAL",
    monoculture: "BG-CLINIC",
    cyborg: "BG-CLINIC",
    subscribe: "BG-END",
    outro: "BG-END",
};
// Keyword to Canonical Prop Map
const PROP_MAP = {
    phone: "PROP-PHONE",
    instagram: "PROP-PHONE",
    camera: "PROP-CAM",
    paparazzi: "PROP-CAM",
    red_carpet: "PROP-RED",
    screen: "PROP-SCREEN",
    movie: "PROP-SCREEN",
    pendulum: "PROP-PEND",
    shift: "PROP-PEND",
    bread: "PROP-FOOD",
    carbs: "PROP-FOOD",
    food: "PROP-FOOD",
    money: "PROP-MONEY",
    cost: "PROP-MONEY",
    price: "PROP-MONEY",
    receipt: "PROP-MONEY",
    ozempic: "PROP-MED",
    glp1: "PROP-MED",
    shot: "PROP-MED",
    injection: "PROP-MED",
    medicine: "PROP-MED",
    browser: "PROP-BROWSER",
    unsubscribe: "PROP-BROWSER",
    modal: "PROP-BROWSER",
    clock: "PROP-CLOCK",
    "4am": "PROP-CLOCK",
    alarm: "PROP-CLOCK",
    gym: "PROP-GYM",
    barbell: "PROP-GYM",
    treadmill: "PROP-GYM",
    buccal: "PROP-FACE",
    cheekbone: "PROP-FACE",
    face: "PROP-FACE",
    game: "PROP-GAME",
    ps1: "PROP-GAME",
    battery: "PROP-BAT",
    envelope: "PROP-EMAIL",
    casting: "PROP-EMAIL",
    gavel: "PROP-BELL",
    bell: "PROP-BELL",
    court: "PROP-BELL",
    scale: "PROP-SCALE",
    weight: "PROP-SCALE",
    water: "PROP-WATER",
    gallon: "PROP-WATER",
    walk: "PROP-WALK",
    steps: "PROP-WALK",
    cyborg: "PROP-BOT",
    mask: "PROP-BOT",
    tears: "PROP-TEARS",
    crying: "PROP-TEARS",
    subscribe: "PROP-SUB",
    hazard: "PROP-CARB",
    billboard: "PROP-BILLBOARD",
    loop: "PROP-LOOP",
    spiral: "PROP-LOOP",
    shield: "PROP-SHIELD",
    barrier: "PROP-SHIELD",
    mirror: "PROP-MIRROR",
    marvel: "PROP-MARVEL",
    superhero: "PROP-MARVEL",
    surgery: "PROP-SURGERY",
    scalpel: "PROP-SURGERY",
    deli: "PROP-DELI",
    slicer: "PROP-DELI",
    contract: "PROP-CONTRACT",
    question: "PROP-QUESTION",
    outsource: "PROP-OUTSOURCE",
    trial: "PROP-TRIAL",
    comment: "PROP-TRIAL",
    rose: "PROP-ROSE",
    grid: "PROP-GRID",
    symmetry: "PROP-GRID",
};
function resolveBgForState(timeSec, state = {}) {
    const semantic = String(state.semantic || "").toLowerCase();
    const topic = String(state.topic || "").toLowerCase();
    const dominantBg = state.dominantBg || null;
    if (/\b(gym|workout|bodybuilder|janitor|deadlift|barbell|weights|cleaning|mop|plates|fitness|squat|bench)\b/.test(semantic)) {
        return "BG-GYM";
    }
    if (/\b(hollywood|red carpet|celebrity|oscar|actor|movie|premiere)\b/.test(semantic)) {
        return "BG-HOLLYWOOD";
    }
    if (/\b(office|tech|computer|crypto|code|browser|cubicle|boss|saas)\b/.test(semantic)) {
        return "BG-OFFICE";
    }
    if (/\b(clinic|doctor|surgery|medicine|shot|buccal|botox|contour)\b/.test(semantic)) {
        return "BG-CLINIC";
    }
    if (/\b(court|judge|tribunal|trial|law|lawsuit)\b/.test(semantic)) {
        return "BG-TRIBUNAL";
    }
    if (/\b(retro|ps1|videogame|gaming)\b/.test(semantic)) {
        return "BG-RETRO";
    }
    if (/\b(subscribe|outro|end)\b/.test(semantic)) {
        return "BG-END";
    }
    if (dominantBg)
        return dominantBg;
    if (topic === "body")
        return "BG-GYM";
    if (topic === "device")
        return "BG-OFFICE";
    return "BG-STUDIO";
}
function asset(request, state) {
    const x = Number(state.x ?? 1320), y = Number(state.y ?? 480), scale = Number(state.scale ?? 1);
    const t = Number(state.timeSec ?? 0);
    const semantic = String(request.semantic || "").toLowerCase();
    const label = String(state.label || "");
    if (request.kind === "label" || semantic === "subtitle") {
        if (semantic === "subtitle") {
            const text = esc(label);
            if (!text)
                return "";
            return `<g transform="translate(960 1010)"><rect x="-440" y="-30" width="880" height="60" rx="14" fill="#ffffff" fill-opacity="0.95" stroke="#0f172a" stroke-width="4"/><text y="11" text-anchor="middle" font-family="'Impact', Arial, sans-serif" font-size="26" font-weight="bold" fill="#0f172a">${text}</text></g>`;
        }
        return "";
    }
    // Check Prop Map for keyword match
    const fullKey = (semantic + " " + label).toLowerCase();
    let matchedProp = "PROP-PHONE";
    for (const [kw, propId] of Object.entries(PROP_MAP)) {
        if (fullKey.includes(kw)) {
            matchedProp = propId;
            break;
        }
    }
    return renderProp(matchedProp, {
        x,
        y,
        scale: scale * 1.15,
        timeSec: t,
        label,
    });
}
export const casuallyExplainedStyle = {
    id: "casually-explained",
    version: "3.0.0",
    palette: {
        background: "#fbfaf7",
        foreground: "#edf0ea",
        ink: "#111827",
        muted: "#64748b",
        accent: "#dc2626",
        accent2: "#0284c7",
        shadow: "#0f172a",
    },
    motion: {
        preferredEntrances: ["pop", "scale", "stamp", "drop"],
        preferredExits: ["scale", "whip"],
        punchScale: 1.25,
        reactionScale: 1.35,
        maxStaticHoldSec: 0.45,
        minimumMeaningfulMotionSec: 0.18,
        cameraEnergy: 1.0,
        squash: 0.1,
        overshoot: 0.1,
    },
    edit: {
        shotKinds: ["wide", "host", "subject", "insert", "macro", "reaction"],
        transitionKinds: ["cut", "punch", "whip", "drift"],
        preferredCutRangeSec: [0.45, 1.8],
        punchlineHoldSec: 0.4,
        reactionHoldSec: 0.45,
        maximumShotSec: 2.5,
    },
    renderAsset: asset,
    renderActor: ({ actorId, state, timeSec }) => renderStickFigure(actorId, { ...state, timeSec }),
    resolveMotion: (intent, intensity = 0.5) => {
        if (intent === "reveal")
            return { entrance: "pop", overshoot: 0.1, squash: 0.08 };
        if (intent === "impact")
            return { move: "punch", amount: 1.2 + intensity * 0.4 };
        if (intent === "reaction")
            return { move: "punch", amount: 0.9 + intensity * 0.3 };
        return { move: "drift", amount: 0.25 };
    },
    resolveEdit: (intent, intensity = 0.5) => {
        if (intent === "punchline")
            return { shotKind: "reaction", transition: "punch", hold: 0.4 };
        if (intent === "reaction")
            return { shotKind: "reaction", transition: "cut", hold: 0.45 };
        if (intent === "reveal")
            return { shotKind: intensity > 0.7 ? "macro" : "insert", transition: "punch" };
        return { shotKind: "host", transition: "cut" };
    },
    renderEnvironment: (timeSec = 0, state = {}) => {
        const bgId = resolveBgForState(timeSec, state);
        return renderBackground(bgId, { timeSec });
    },
};

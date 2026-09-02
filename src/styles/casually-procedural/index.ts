import { renderStickFigure } from "../../character/StickFigure";
import { renderBackground, BackgroundId } from "../../assets/BackgroundLibrary";
import { renderProceduralAsset } from "../procedural/assetLibrary";
import type { StylePack } from "../StylePack";

const esc = (s: unknown) => String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

function resolveBgForTime(timeSec: number): BackgroundId {
  if (timeSec < 8.62) return "BG-HOLLYWOOD";
  if (timeSec < 15.33) return "BG-OFFICE";
  if (timeSec < 32.86) return "BG-HOLLYWOOD";
  if (timeSec < 42.0) return "BG-OFFICE";
  if (timeSec < 57.8) return "BG-RETRO";
  if (timeSec < 80.45) return "BG-STUDIO";
  if (timeSec < 105.0) return "BG-90S";
  if (timeSec < 140.0) return "BG-STUDIO";
  if (timeSec < 180.0) return "BG-OFFICE";
  if (timeSec < 220.0) return "BG-OFFICE";
  if (timeSec < 260.0) return "BG-Y2K";
  if (timeSec < 300.0) return "BG-CLINIC";
  if (timeSec < 345.0) return "BG-HOLLYWOOD";
  if (timeSec < 395.0) return "BG-GYM";
  if (timeSec < 450.0) return "BG-CLINIC";
  if (timeSec < 510.0) return "BG-TRIBUNAL";
  if (timeSec < 575.0) return "BG-CLINIC";
  return "BG-END";
}

const PROP_MAP: Record<string, string> = {
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

function asset(request: Parameters<StylePack["renderAsset"]>[0], state: Record<string, unknown>): string {
  const x = Number(state.x ?? 1320), y = Number(state.y ?? 480), scale = Number(state.scale ?? 1);
  const t = Number(state.timeSec ?? 0);
  const semantic = String(request.semantic || "").toLowerCase();
  const label = String(state.label || "");

  if (request.kind === "label" || semantic === "subtitle") {
    if (semantic === "subtitle") {
      const text = esc(label);
      if (!text) return "";
      return `<g transform="translate(960 1010)"><rect x="-440" y="-30" width="880" height="60" rx="14" fill="#ffffff" fill-opacity="0.95" stroke="#0f172a" stroke-width="4"/><text y="11" text-anchor="middle" font-family="'Impact', Arial, sans-serif" font-size="26" font-weight="bold" fill="#0f172a">${text}</text></g>`;
    }
    return "";
  }

  // Route through the procedural asset library: handcrafted gag puppets first,
  // then rich per-family vector drawers. Every concept gets a drawing that
  // MEANS what the sentence says — never a generic fallback prop.
  return renderProceduralAsset({
    x, y,
    scale: scale * 1.15,
    entry: Math.max(0, Math.min(1, Number(state.entry ?? 1))),
    exit: Math.max(0, Math.min(1, Number(state.exit ?? 0))),
    age: t,
    energy: Number(state.energy ?? 0.5),
    concept: semantic || label || request.id,
    kind: String(state.kind ?? "generic"),
    slot: Number(state.slot ?? 0),
  });
}

export const casuallyProceduralStyle: StylePack = {
  id: "casually-procedural",
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
    if (intent === "reveal") return { entrance: "pop", overshoot: 0.1, squash: 0.08 };
    if (intent === "impact") return { move: "punch", amount: 1.2 + intensity * 0.4 };
    if (intent === "reaction") return { move: "punch", amount: 0.9 + intensity * 0.3 };
    return { move: "drift", amount: 0.25 };
  },
  resolveEdit: (intent, intensity = 0.5) => {
    if (intent === "punchline") return { shotKind: "reaction", transition: "punch", hold: 0.4 };
    if (intent === "reaction") return { shotKind: "reaction", transition: "cut", hold: 0.45 };
    if (intent === "reveal") return { shotKind: intensity > 0.7 ? "macro" : "insert", transition: "punch" };
    return { shotKind: "host", transition: "cut" };
  },
  renderEnvironment: (timeSec = 0) => {
    const bgId = resolveBgForTime(timeSec);
    return renderBackground(bgId, { timeSec });
  },
};

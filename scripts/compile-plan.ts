/**
 * compile-plan: SRT in, ShowPlan.json out. Five deterministic passes:
 *   Cutter -> Classifier -> Asset Resolver -> Staging -> Camera.
 *
 *   tsx scripts/compile-plan.ts --srt public/0-chapter-1.srt --out output/showplan.json
 *
 * No rendering, no network, no keys. Prints the override report
 * (beats the plan cannot stage from registry = escape-hatch candidates).
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { parseSrt, type SubtitleItem } from "../src/subtitles/SrtParser";
import type {
  ShowPlan, ShowWindow, ShowBeat, BeatType, ShotKind, PlanActor, PlanProp,
} from "../src/director/ShowPlan";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const arg = (name: string, def: string) => {
  const i = process.argv.indexOf(`--${name}`);
  return i > -1 && process.argv[i + 1] !== undefined ? process.argv[i + 1] : def;
};

// --- Pass 1: Cutter (sentence windows ~30s, end on cue ends) ------------------
function cutWindows(cues: SubtitleItem[], target = 30): { start: number; end: number; cues: SubtitleItem[] }[] {
  const wins: { start: number; end: number; cues: SubtitleItem[] }[] = [];
  let t = 0;
  let i = 0;
  while (i < cues.length) {
    let j = i;
    while (j < cues.length && cues[j].end < t + target) j++;
    const end = j < cues.length ? cues[j].end : cues[cues.length - 1].end;
    wins.push({ start: t, end, cues: cues.slice(i, j + 1) });
    t = end;
    i = j + 1;
  }
  return wins;
}

// --- Pass 2: Classifier (ordered keyword rules, first match wins) ------------
const RULES: Array<[BeatType, RegExp]> = [
  ["comparison", /\bfrom\b.*\bto\b|\bgone from\b|\bshift|\bpivot|\bthan\b|\bleaner\b|\binside\b/i],
  ["reversal", /\bbut\b|instead|unsubscribe|cancel|not .* anymore|consumed/i],
  ["escalation", /\bmore\b|billion|trillion|every\b|giant|terrifying|violently|endless|overnight|collectively/i],
  ["superlative", /\bmost\b|biggest|worst|best\b|first\b|ultimate|noticeably/i],
  ["process", /\bhow\b|steps|process|press|drain|buy|slams|carry/i],
  ["personification", /\bindustry\b|\bhollywood\b|celebr|.*\bdecided\b|outsourc/i],
  ["list", /.*,.*,/],
];

function classify(text: string): { type: BeatType; byRule: boolean } {
  for (const [type, re] of RULES) {
    if (re.test(text)) return { type, byRule: true };
  }
  return { type: "tableau", byRule: false };
}

/** Split a window into skit-level beats (~6-12s) at cue ends. */
function splitBeats(cues: SubtitleItem[]): SubtitleItem[][] {
  const beats: SubtitleItem[][] = [];
  let cur: SubtitleItem[] = [];
  for (const c of cues) {
    cur.push(c);
    if (cur[cur.length - 1].end - cur[0].start >= 8) {
      beats.push(cur);
      cur = [];
    }
  }
  if (cur.length > 0) {
    const prev = beats[beats.length - 1];
    if (prev && cur[cur.length - 1].end - cur[0].start < 4) {
      beats[beats.length - 1] = [...prev, ...cur];
    } else {
      beats.push(cur);
    }
  }
  return beats;
}

// --- Pass 3: Asset Resolver (concept -> gag-lib builder) ----------------------
const REGISTRY: Array<[RegExp, string]> = [
  [/\bmoney\b|budget|paid|buy|billion|\$\b/i, "moneyBag"],
  [/\benvelope\b|mail\b/i, "envelope"],
  [/\bscale\b|weigh|diet\b|fat\b|\blbs\b|belly/i, "scaleProp"],
  [/\bpendulum\b|swing/i, "pendulumRig"],
  [/\bcouch\b|sit\b|sofa/i, "couch"],
  [/\bsandwich\b|lunch\b|carbs\b|appetite/i, "bigSandwich"],
  [/\bterminal\b|\bAI\b|crypto|artificial intelligence/i, "terminal"],
  [/\bphot\b|instagram|selfie|camera/i, "flashBurst"],
  [/\bwheel\b|driv/i, "wheel"],
  [/\bbaby\b|child/i, "babyBundle"],
  [/\bclean/i, "duster"],
];

function resolveProps(text: string, beatStart: number, beatEnd: number): { props: PlanProp[]; resolved: boolean } {
  const props: PlanProp[] = [];
  for (const [re, builder] of REGISTRY) {
    if (re.test(text)) {
      props.push({
        builder,
        at: { x: 1250, y: 640 },
        cue: { appear: beatStart + 0.5, act: beatStart + (beatEnd - beatStart) * 0.6, settle: beatEnd },
      });
    }
    if (props.length >= 2) break;
  }
  return { props, resolved: props.length > 0 };
}

// --- Pass 4: Staging (HOUSE_STYLE marks + nearest-edge entrances) ------------
const GUEST_MARKS = [680, 990, 1300, 1620];

/** Expression casting: guests emote the beat type; host stays deadpan. */
const GUEST_EXPR: Record<BeatType, string> = {
  tableau: "deadpan_classic",
  comparison: "deadpan_line",
  escalation: "fear_trembling",
  list: "sparkle_anime_eyes",
  personification: "smug_finger_guns",
  reversal: "shock_eye_pop",
  callback: "smug_chuckle",
  superlative: "smug_chuckle",
  process: "deadpan_line",
};

function stageCast(beatType: BeatType, beatStart: number, n: number): PlanActor[] {
  const guestCount = beatType === "list" ? 3 : beatType === "comparison" ? 2 : beatType === "tableau" ? 0 : 1;
  const cast: PlanActor[] = [{
    id: "host",
    role: "host",
    gender: "male",
    hairStyle: "male_short",
    clothes: "none",
    mark: { x: 400, y: 670 },
    entrance: { from: "left", start: beatStart, end: beatStart + 1.0 },
    expression: "deadpan_classic",
    // A propless tableau still needs intent: the host wonders, on the record.
    ...(beatType === "tableau" ? { fx: "question_marks" } : {}),
  }];
  for (let g = 0; g < Math.min(guestCount, n); g++) {
    const mx = GUEST_MARKS[g + 1] ?? 1300;
    cast.push({
      id: `guest${g + 1}`,
      role: "guest",
      gender: beatType === "list" ? "female" : "male",
      hairStyle: beatType === "list" ? "female_long" : "male_short",
      clothes: beatType === "list" ? "dress_pink" : "hoodie",
      mark: { x: mx, y: 665 },
      entrance: {
        from: mx < 960 ? "left" : "right",
        start: beatStart + 0.3 + g * 1.2,
        end: beatStart + 1.3 + g * 1.2,
      },
      expression: GUEST_EXPR[beatType],
    });
  }
  return cast;
}

// --- Pass 5: Camera (per-beat-type shot map) ----------------------------------
const SHOT_MAP: Record<BeatType, ShotKind> = {
  tableau: "wide",
  comparison: "punch",
  escalation: "punch",
  list: "wide",
  personification: "punch",
  reversal: "punch",
  callback: "punch",
  superlative: "macro",
  process: "punch",
};

function frameCamera(beat: { startSec: number; endSec: number }, cast: PlanActor[], shot: ShotKind) {
  const cx = Math.min(1300, Math.max(700,
    cast.reduce((s, c) => s + c.mark.x, 0) / Math.max(1, cast.length)));
  const wide = { cx: 960, cy: 560, zoom: 1.25 };
  const tight = shot === "wide"
    ? wide
    : { cx: Math.round(cx), cy: 570, zoom: shot === "macro" ? 1.6 : 1.5 };
  return { wide, tight, punchAt: shot === "wide" ? beat.startSec : beat.startSec + (beat.endSec - beat.startSec) * 0.7 };
}

// --- main --------------------------------------------------------------------
const srtPath = arg("srt", "");
const outPath = arg("out", path.join(root, "output", "showplan.json"));
const showName = arg("show", "chapter-1");
if (!srtPath) {
  console.error("Usage: tsx scripts/compile-plan.ts --srt <file.srt> [--out showplan.json]");
  process.exit(1);
}

const cues = parseSrt(fs.readFileSync(srtPath, "utf8"));
const windows = cutWindows(cues);
let beatId = 0;
let overrides = 0;
const hist: Record<string, number> = {};

const showWindows: ShowWindow[] = windows.map((w, wi) => {
  const rawBeats: ShowBeat[] = splitBeats(w.cues).map((bc) => {
    const text = bc.map((c) => c.cleanText).join(" ");
    const { type, byRule } = classify(text);
    hist[type] = (hist[type] ?? 0) + 1;
    const startSec = bc[0].start;
    const endSec = bc[bc.length - 1].end;
    const shot = SHOT_MAP[type];
    const cast = stageCast(type, startSec, 3);
    const { props, resolved } = resolveProps(text, startSec, endSec);
    const needsOverride = !byRule && !resolved;
    if (needsOverride) overrides++;
    const { wide, tight, punchAt } = frameCamera({ startSec, endSec }, cast, shot);
    return {
      beatId: ++beatId,
      startSec,
      endSec,
      beatType: type,
      shot,
      wide,
      tight,
      punchAt: Math.min(endSec, Math.max(startSec, punchAt)),
      cast,
      props,
      srt: text.slice(0, 220),
      ...(needsOverride ? { override: "inline:TBD" } : {}),
    };
  });
  // Alternation: no two adjacent beats punch — every payoff gets breathing
  // room. Demoted beats keep everything but shoot wide.
  let prevNonWide = false;
  const beats: ShowBeat[] = rawBeats.map((b) => {
    if (b.shot !== "wide" && prevNonWide) {
      prevNonWide = false;
      return { ...b, shot: "wide" as const, tight: b.wide, punchAt: b.startSec };
    }
    prevNonWide = b.shot !== "wide";
    return b;
  });
  return {
    windowId: `W${String(wi + 1).padStart(2, "0")}`,
    startSec: w.start,
    endSec: w.end,
    beats,
  };
});

const plan: ShowPlan = {
  show: showName,
  windows: showWindows,
  generatedAt: new Date().toISOString(),
  generator: "compile-plan v1 (deterministic rules)",
};

fs.mkdirSync(path.dirname(outPath), { recursive: true });
fs.writeFileSync(outPath, JSON.stringify(plan, null, 1));
const total = beatId;
console.log(`[compile-plan] windows=${showWindows.length} beats=${total} overrides=${overrides} (${((100 * overrides) / Math.max(1, total)).toFixed(1)}%) -> ${outPath}`);
console.log(`[compile-plan] beat types: ${Object.entries(hist).map(([k, v]) => `${k}=${v}`).join(" ")}`);

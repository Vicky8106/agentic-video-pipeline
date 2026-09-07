/**
 * GAG AUTO WINDOWS (W04..W19, W20a, W21b): the rest of chapter 1 in the
 * delivered gag grammar (gag-lib: stick-figure cast, zero-words graphic
 * props, rock-solid camera, hard cuts, 1280x720/24fps, fixed-GOP libx264).
 *
 * Hand-directed windows W01..W03 and PRF are reused as-is; this script
 * auto-directs only the TODO ranges from GAG_WINDOWS.md, tiling them
 * exactly (beats split at SRT cue ends, same cutter as compile-plan):
 *
 *   NODE_OPTIONS=--max-old-space-size=512 npx tsx scripts/render-gag-auto.ts --window W20a --out output/gag_auto_w20a.mp4
 *   NODE_OPTIONS=--max-old-space-size=512 npx tsx scripts/render-gag-auto.ts --all
 *
 * Staging rules from GAG_WINDOWS.md are honored: props live in bg (cast
 * draws over them), nearest-edge entrances, punch-ins keep the speaker
 * in frame, hard cut at every beat start.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { parseSrt } from "../src/subtitles/SrtParser";
import {
  driveGags,
  type GagDef, type GagOut, type Fig,
  lerp, easeIO, seg, blinkAt,
  stage, couch, wheel, duster, babyBundle, bigSandwich, envelope,
  scaleProp, moneyBag, pendulumRig, rewindIcon, trackingLines, flashBurst,
  walkerX, walkerXR,
} from "./gag-lib";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const arg = (name: string, def: string) => {
  const i = process.argv.indexOf(`--${name}`);
  return i > -1 && process.argv[i + 1] !== undefined ? process.argv[i + 1] : def;
};

const fps = 24;
const width = 1280;
const height = 720;
const onlyWindow = arg("window", "");
const doAll = process.argv.includes("--all");
const outOverride = arg("out", "");

// Exact TODO ranges from GAG_WINDOWS.md (tile 97.23 -> 605.60, plus outro).
const WINDOWS: Array<{ id: string; start: number; end: number }> = [
  { id: "W04", start: 97.23, end: 128.84 },
  { id: "W05", start: 128.84, end: 160.30 },
  { id: "W06", start: 160.30, end: 191.70 },
  { id: "W07", start: 191.70, end: 222.11 },
  { id: "W08", start: 222.11, end: 253.21 },
  { id: "W09", start: 253.21, end: 283.49 },
  { id: "W10", start: 283.49, end: 313.62 },
  { id: "W11", start: 313.62, end: 344.29 },
  { id: "W12", start: 344.29, end: 375.93 },
  { id: "W13", start: 375.93, end: 406.07 },
  { id: "W14", start: 406.07, end: 436.93 },
  { id: "W15", start: 436.93, end: 470.06 },
  { id: "W16", start: 470.06, end: 502.90 },
  { id: "W17", start: 502.90, end: 536.26 },
  { id: "W18", start: 536.26, end: 566.42 },
  { id: "W19", start: 566.42, end: 597.23 },
  { id: "W20a", start: 597.23, end: 605.60 },
  { id: "W21b", start: 635.60, end: 643.53 },
];

type BeatType = "comparison" | "reversal" | "escalation" | "superlative"
  | "process" | "personification" | "list" | "tableau";

const RULES: Array<[BeatType, RegExp]> = [
  ["comparison", /\bfrom\b.*\bto\b|\bgone from\b|\bshift|\bpivot|\bthan\b|\bleaner\b|\binside\b/i],
  ["reversal", /\bbut\b|instead|unsubscribe|cancel|not .* anymore|consumed/i],
  ["escalation", /\bmore\b|billion|trillion|every\b|giant|terrifying|violently|endless|overnight|collectively/i],
  ["superlative", /\bmost\b|biggest|worst|best\b|first\b|ultimate|noticeably/i],
  ["process", /\bhow\b|steps|process|press|drain|buy|slams|carry/i],
  ["personification", /\bindustry\b|\bhollywood\b|celebr|.*\bdecided\b|outsourc/i],
  ["list", /.*,.*,/],
];

const REGISTRY: Array<[RegExp, string]> = [
  [/\bmoney\b|budget|paid|buy|billion|\$\b|discipline|lazy/i, "moneyBag"],
  [/\benvelope\b|mail\b|fit inside/i, "envelope"],
  [/\bscale\b|weigh|diet\b|fat\b|\blbs\b|belly/i, "scaleProp"],
  [/\bpendulum\b|swing/i, "pendulumRig"],
  [/\bcouch\b|sit\b|sofa/i, "couch"],
  [/\bsandwich\b|lunch\b|carbs\b|appetite|gastric/i, "bigSandwich"],
  [/\bterminal\b|\bAI\b|crypto|artificial intelligence|doctor|surgeon|drugs/i, "screenSlab"],
  [/\bphot\b|instagram|selfie|camera|press|tour|red carpet/i, "flashBurst"],
  [/\bwheel\b|driv/i, "wheel"],
  [/\bbaby\b|child/i, "babyBundle"],
  [/\bclean/i, "duster"],
];

const PALETTES: Array<[string, string]> = [
  ["#faf5ec", "#e6dcc4"],
  ["#f3efe6", "#d9d0ba"],
  ["#eef4ff", "#d7e0ee"],
  ["#fdf3e7", "#ead9bd"],
  ["#f2f7f0", "#d8e4d5"],
  ["#f7eef4", "#e6d3e0"],
];
const GUEST_EXPR = ["deadpan_line", "smug_chuckle", "blissful_serenity", "sad_pout"] as const;
const GUEST_MARKS = [990, 1300, 1620];

function classify(text: string): BeatType {
  for (const [type, re] of RULES) if (re.test(text)) return type;
  return "tableau";
}

function resolveBuilders(text: string): string[] {
  const out: string[] = [];
  for (const [re, builder] of REGISTRY) {
    if (re.test(text)) out.push(builder);
    if (out.length >= 2) break;
  }
  return out;
}

// Every beat gets at least one stage prop so no 8-12s stretch plays on
// an empty stage; fallbacks follow the beat type, never on-screen words.
const TYPE_FALLBACK: Record<BeatType, string> = {
  comparison: "pendulumRig",
  reversal: "screenSlab",
  escalation: "flashBurst",
  superlative: "flashBurst",
  process: "wheel",
  personification: "flashBurst",
  list: "couch",
  tableau: "couch",
};

// Local zero-words screen slab (same visual language as w01's terminal:
// rounded body + status bars, no text) for AI/doctor/surgeon cues.
function screenSlab(x: number, y: number, s: number, t: number): string {
  const blink = Math.sin(t * 6) > 0;
  return `<g transform="translate(${x} ${y}) scale(${s})">`
    + `<rect x="-230" y="-140" width="460" height="280" rx="18" fill="#020617" stroke="#22d3ee" stroke-width="8"/>`
    + `<circle cx="-190" cy="-100" r="12" fill="#ef4444"/><circle cx="-155" cy="-100" r="12" fill="#f59e0b"/><circle cx="-120" cy="-100" r="12" fill="#22c55e"/>`
    + `<rect x="-190" y="-50" width="300" height="26" rx="8" fill="#164e63"/>`
    + `<rect x="-190" y="0" width="190" height="26" rx="8" fill="#0e7490"/>`
    + (blink ? `<rect x="10" y="0" width="22" height="30" fill="#22d3ee"/>` : ``)
    + `</g>`;
}

function propSvg(builder: string, x: number, y: number, t: number, lt: number, dur: number): string {
  const pop = easeIO(seg(lt, 0.4, 1.0));
  if (pop <= 0) return "";
  const s = Math.max(0.001, pop);
  switch (builder) {
    case "moneyBag": return moneyBag(x, y, 1.1 * s, Math.sin(t * 2) * 8);
    case "envelope": return envelope(x, y, s, lt > dur * 0.6, seg(lt, dur * 0.5, dur * 0.7));
    case "scaleProp": return scaleProp(x, y, s, Math.sin(t * 1.8) * 0.9);
    case "pendulumRig": return pendulumRig(x, 170, 400, 32 * Math.sin(t * 1.3));
    case "couch": return couch(x, 770, 1.1 * s);
    case "bigSandwich": return bigSandwich(x, y, s, Math.sin(t * 1.5) * 6, easeIO(seg(lt, dur * 0.5, dur * 0.8)));
    case "screenSlab": return screenSlab(x, y, s, t);
    case "flashBurst": return (Math.sin(t * 11) > 0.1 ? flashBurst(x - 160, y - 140, s) : "")
      + (Math.cos(t * 9) > 0.1 ? flashBurst(x + 160, y - 140, s) : "");
    case "wheel": return wheel(x, 700, s, t * 120);
    case "babyBundle": return babyBundle(x, y, s);
    case "duster": return duster(x, y, s, Math.sin(t * 2.2) * 18);
    default: return "";
  }
}

interface Beat {
  start: number; end: number; type: BeatType; builders: string[]; idx: number;
}

function splitBeats(
  cues: Array<{ start: number; end: number; cleanText: string }>,
): Array<Array<{ start: number; end: number; cleanText: string }>> {
  const beats: Array<Array<{ start: number; end: number; cleanText: string }>> = [];
  let cur: Array<{ start: number; end: number; cleanText: string }> = [];
  for (const c of cues) {
    cur.push(c);
    if (c.end - cur[0].start >= 9) { beats.push(cur); cur = []; }
  }
  if (cur.length > 0) {
    if (beats.length > 0 && cur[cur.length - 1].end - cur[0].start < 4) {
      beats[beats.length - 1] = [...beats[beats.length - 1], ...cur];
    } else beats.push(cur);
  }
  return beats;
}

function beatFn(beat: Beat, totalBeats: number): (t: number, lt: number) => GagOut {
  const dur = beat.end - beat.start;
  const guestCount = beat.type === "list" ? 3 : beat.type === "comparison" ? 2 : beat.type === "tableau" ? 1 : 1;
  const [bgc, floorc] = PALETTES[beat.idx % PALETTES.length];
  const punchAt = dur * 0.7;
  return (t: number, lt: number): GagOut => {
    const figs: Fig[] = [];
    let fg = "";
    // Host: walks in from the left once, holds stage-left, talks the setup.
    const host = walkerX(lt, 400, 0, 0.9, dur + 10, dur + 11);
    figs.push({
      id: `host_b${beat.idx}`, st: {
        x: host.on ? host.x : 400, y: 670, timeSec: t,
        isTalking: lt < dur * 0.62, blink: blinkAt(t),
        expression: beat.idx % 2 === 0 ? "deadpan_classic" : "smug_chuckle",
        ...(lt >= punchAt ? { pointTarget: { x: 1300, y: 560 } } : {}),
        gazeTarget: { x: 1300, y: 560 },
      },
    });
    // Guests: nearest-edge entrances, staggered, never crossing the cast.
    const marks = GUEST_MARKS.slice(0, guestCount);
    marks.forEach((mx, gi) => {
      const a = 0.4 + gi * 1.1, b = a + 1.0;
      const w = mx < 960 ? walkerX(lt, mx, a, b, dur + 10, dur + 11) : walkerXR(lt, mx, a, b);
      if (!w.on) return;
      figs.push({
        id: `g${beat.idx}_${gi}`, st: {
          x: w.x, y: 665, timeSec: t + gi, isTalking: false, isWalking: w.walking,
          blink: blinkAt(t + gi * 1.3), gender: "male",
          clothes: gi % 2 === 0 ? "hoodie" : "tshirt", hairStyle: "male_short",
          expression: GUEST_EXPR[(beat.idx + gi) % GUEST_EXPR.length],
          gazeTarget: { x: 400, y: 600 },
        },
      });
    });
    // Props live in bg (staging rule 1); cast draws over them.
    let bg = stage(bgc, floorc,
      `<circle cx="1250" cy="250" r="140" fill="#b45309" opacity="0.12"/>`);
    const slots: Array<[number, number]> = [[1300, 620], [700, 600]];
    beat.builders.forEach((builder, bi) => {
      const [px, py] = slots[bi % slots.length];
      if (builder === "pendulumRig" || builder === "flashBurst") {
        bg += propSvg(builder, px, py, t, lt, dur);
      } else {
        bg += propSvg(builder, px, py, t, lt, dur);
      }
    });
    // Type-driven punch accents (kept high/clear of faces).
    if (beat.type === "escalation" && lt > punchAt) fg += trackingLines(t);
    if ((beat.type === "superlative" || beat.type === "escalation") && lt > punchAt) {
      if (Math.sin(t * 13) > 0) fg += flashBurst(960, 300, 1.0);
    }
    if (beat.type === "reversal" && lt > punchAt - 0.4) {
      fg += rewindIcon(960, 320, 1.0, easeIO(seg(lt, punchAt - 0.4, punchAt + 0.6)));
    }
    // Camera: rock-solid wide, one punch-in at 70% (wide stays for tableau).
    const cx = Math.min(1300, Math.max(700,
      figs.reduce((s, f) => s + f.st.x, 0) / Math.max(1, figs.length)));
    const zoom = beat.type === "tableau" ? 1.25
      : beat.type === "superlative" ? (lt >= punchAt ? 1.6 : 1.25)
      : (lt >= punchAt ? 1.5 : 1.25);
    return {
      bg, figs, fg,
      cam: lt >= punchAt && beat.type !== "tableau"
        ? { cx: Math.round(cx), cy: 570, zoom, cut: false }
        : { cx: 960, cy: 560, zoom: 1.25, cut: lt < 0.05 },
    };
  };
}

// --- driver ------------------------------------------------------------------
const srtPath = path.join(root, "public", "0-chapter-1.srt");
const cues = parseSrt(fs.readFileSync(srtPath, "utf8"));

let targets = WINDOWS;
if (doAll) targets = WINDOWS;
else if (onlyWindow) {
  const w = WINDOWS.find((x) => x.id === onlyWindow);
  if (!w) { console.error(`unknown window ${onlyWindow} (want ${WINDOWS.map((x) => x.id).join(",")})`); process.exit(2); }
  targets = [w];
} else {
  console.error("Usage: tsx scripts/render-gag-auto.ts --window W20a [--out f.mp4] | --all");
  process.exit(2);
}

let beatCounter = 0;
for (const w of targets) {
  const overlapping = cues.filter((c) => c.end > w.start && c.start < w.end);
  if (overlapping.length === 0) { console.error(`[${w.id}] no SRT cues in range`); process.exit(1); }
  const groups = splitBeats(overlapping);
  const beats: Beat[] = groups.map((g) => {
    const text = g.map((c) => c.cleanText).join(" ");
    const type = classify(text);
    const resolved = resolveBuilders(text);
    const builders = resolved.length > 0 ? resolved : [TYPE_FALLBACK[type]];
    return {
      start: g[0].start, end: g[g.length - 1].end,
      type, builders, idx: beatCounter++,
    };
  });
  // Tile the window exactly: extend each beat to the next beat's first
  // cue start so SRT gaps never fall outside every beat (driveGags stills
  // warmup requires every sample time to sit inside a beat).
  beats[0].start = w.start;
  for (let i = 1; i < beats.length; i++) beats[i - 1].end = beats[i].start;
  beats[beats.length - 1].end = w.end;
  const gags: GagDef[] = beats.map((b) => ({ start: b.start, end: b.end, fn: beatFn(b, beatCounter) }));
  const outFile = targets.length === 1 && outOverride
    ? (path.isAbsolute(outOverride) ? outOverride : path.join(root, outOverride))
    : path.join(root, "output", `gag_auto_${w.id.toLowerCase()}.mp4`);
  console.log(`[${w.id}] ${w.start.toFixed(2)} -> ${w.end.toFixed(2)} beats=${beats.length} ` +
    beats.map((b) => `${b.type}${b.builders.length ? `+${b.builders.join("+")}` : ""}`).join(" | "));
  // Stills first (cheap, same stills-verified workflow as the hand windows).
  const dur = w.end - w.start;
  const stills = [0.25, 0.5, 0.75].map((k) => w.start + dur * k);
  await driveGags({
    gags, t0: w.start, t1: w.end, outFile,
    stills, fps, width, height,
    stillsDir: path.join(root, "output", `gag_auto_${w.id.toLowerCase()}_stills`),
    tag: `auto-${w.id}`,
  });
  // Then the silent window video (muxed with its MP3 slice later).
  await driveGags({
    gags, t0: w.start, t1: w.end, outFile,
    stills: [], fps, width, height, tag: `auto-${w.id}`,
  });
}
console.log("[auto] ALL TARGET WINDOWS DONE");

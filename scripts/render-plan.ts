/**
 * render-plan: ShowPlan.json in, muxed video out. The dumb executor:
 * plan beats -> GagDefs -> driveGags -> concat -> mux with the MP3 slice.
 *
 *   tsx scripts/render-plan.ts --plan output/showplan.json --audio <mp3> --out output/plan_full.mp4
 *   tsx scripts/render-plan.ts --plan output/showplan.json --audio <mp3> --out output/plan_w04.mp4 --window W04
 *   tsx scripts/render-plan.ts --plan output/showplan.json --window W04 --stills 100,110,120
 *
 * Beats carrying `override` are logged and counted (escape-hatch meter)
 * but still render from plan. Motion kit (popIn) drives all prop motion.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { spawn } from "node:child_process";
import {
  driveGags,
  type GagDef, type GagOut,
  easeIO, seg, blinkAt, lerp,
  stage, walkerX, walkerXR,
  couch, wheel, duster, babyBundle, bigSandwich, envelope, scaleProp,
  moneyBag, scalpel, terminal, flashBurst, rewindIcon, trackingLines, pendulumRig,
} from "./gag-lib";
import { popIn } from "../src/motion/eases";
import type {
  ShowPlan, ShowWindow, ShowBeat, PlanProp,
} from "../src/director/ShowPlan";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const arg = (name: string, def: string) => {
  const i = process.argv.indexOf(`--${name}`);
  return i > -1 && process.argv[i + 1] !== undefined ? process.argv[i + 1] : def;
};

/** Deterministic per-beat palette (house range, no words anywhere). */
const PALETTES: Array<[string, string, string]> = [
  ["#faf5ec", "#e6dcc4", "#f59e0b"],
  ["#eef2f7", "#ccd6e3", "#0284c7"],
  ["#fdf2f5", "#ecd9e1", "#ec4899"],
  ["#f3efe6", "#d9d0ba", "#b45309"],
  ["#efe9fb", "#cfc2ec", "#7c3aed"],
  ["#eef7f2", "#c8ddcf", "#16a34a"],
];

/** Generic prop dispatch: every builder acts on its cue via popIn. */
function renderPlanProp(p: PlanProp, t: number): string {
  const appearK = popIn(seg(t, p.cue.appear, p.cue.appear + 0.6));
  if (appearK <= 0) return "";
  const gone = seg(t, p.cue.settle, p.cue.settle + 0.8);
  const s = Math.max(0.001, appearK * (1 - gone));
  const actK = easeIO(seg(t, p.cue.act - 0.5, p.cue.act + 0.5));
  const { x } = p.at;
  const y = p.at.y + Math.sin(t * 3.1 + p.at.x * 0.01) * 7 * actK;
  switch (p.builder) {
    case "moneyBag": return moneyBag(x, y, s, (actK * 20 - 10));
    case "envelope": return envelope(x, y, s, actK < 1, actK);
    case "scaleProp": return scaleProp(x, y, s, actK * 2.4 - 1.2);
    case "pendulumRig": return pendulumRig(x, 140, 480, 44 * Math.sin(t * 1.9) * (0.5 + actK));
    case "flashBurst": return flashBurst(x, y, s);
    case "terminal": return terminal(x, y, s, Math.sin(t * 6) > 0);
    case "rewindIcon": return rewindIcon(x, y, s, actK);
    case "trackingLines": return trackingLines(t);
    case "couch": return couch(x, y, s);
    case "wheel": return wheel(x, y, s, actK * 120);
    case "duster": return duster(x, y, s, actK * 30 - 15);
    case "babyBundle": return babyBundle(x, y, s);
    case "bigSandwich": return bigSandwich(x, y, s, -8, actK);
    case "scalpel": return scalpel(x, y, actK * 360);
    default: return "";
  }
}

export function beatToGag(w: ShowWindow, b: ShowBeat, paletteIdx: number): GagDef {
  const [bgc, floorc, accent] = PALETTES[paletteIdx % PALETTES.length];
  return {
    start: b.startSec,
    end: b.endSec,
    fn: (t: number, lt: number): GagOut => {
      const figs: GagOut["figs"] = [];
      // Gaze graph: guests watch the host, host watches the business
      // (first prop, else the guest centroid). Nobody stares past camera.
      const hostMark = b.cast.find((c) => c.role === "host")?.mark ?? { x: 400, y: 670 };
      const guestXs = b.cast.filter((c) => c.role !== "host").map((c) => c.mark.x);
      const focus = b.props.length > 0
        ? {
          x: b.props.reduce((s, p) => s + p.at.x, 0) / b.props.length,
          y: b.props.reduce((s, p) => s + p.at.y, 0) / b.props.length,
        }
        : guestXs.length > 0
          ? { x: guestXs.reduce((s, x) => s + x, 0) / guestXs.length, y: 600 }
          : { x: 960, y: 550 };
      for (const c of b.cast) {
        const a = c.entrance.start - b.startSec;
        const e = c.entrance.end - b.startSec;
        const wx = c.entrance.from === "left"
          ? walkerX(lt, c.mark.x, a, e, 1e9, 1e9)
          : walkerXR(lt, c.mark.x, a, e);
        if (!wx.on) continue;
        const punchedFig = t >= b.punchAt && b.punchAt > b.startSec;
        // Host carries the voiceover: talks all beat except a breather
        // after the punch. Guests react-talk briefly on the payoff.
        const talking = c.role === "host"
          ? !(punchedFig && t > b.punchAt + 1.0)
          : punchedFig && t < b.punchAt + 1.5;
        // Idle sway: nobody stands statue-still. Punch pop + lean on payoff.
        const sway = wx.walking ? 0 : Math.sin(t * 2.1 + c.mark.x * 0.7) * 4;
        const pop = punchedFig && t < b.punchAt + 0.45
          ? 1 + 0.09 * Math.sin(((t - b.punchAt) / 0.45) * Math.PI) : 1;
        const breath = 1 + 0.015 * Math.sin(t * 2.6 + c.mark.x);
        figs.push({
          id: `${w.windowId}_${c.id}`,
          st: {
            x: wx.x, y: c.mark.y, timeSec: t,
            isTalking: talking, isWalking: wx.walking,
            rotation: sway,
            scale: (c.scale ?? 1) * pop * breath,
            spineLean: punchedFig && c.role === "host" ? 8 : 0,
            blink: blinkAt(t + c.mark.x),
            gender: c.gender as never, hairStyle: c.hairStyle as never,
            clothes: c.clothes as never,
            expression: c.expression as never,
            pose: (c.pose ?? "default") as never,
            comicFx: (c.fx ?? "none") as never,
            bodyFacing: wx.walking ? (c.entrance.from === "left" ? "right" : "left") : "front",
            pointTarget: t >= b.punchAt && b.props.length > 0 && c.role === "host"
              ? { x: b.props[0].at.x, y: b.props[0].at.y } : undefined,
            gazeTarget: c.role === "host" ? focus : { x: hostMark.x, y: hostMark.y - 120 },
          },
        });
      }
      let fg = "";
      for (const p of b.props) fg += renderPlanProp(p, t);
      const bg = stage(bgc, floorc,
        `<circle cx="960" cy="230" r="140" fill="${accent}" opacity="0.13"/>`);
      const punched = t >= b.punchAt && b.punchAt > b.startSec;
      // Slow push-in under the whole beat: the camera never sits static.
      const driftK = easeIO(seg(t, b.startSec, b.punchAt > b.startSec ? b.punchAt : b.endSec));
      return {
        bg, figs, fg,
        cam: punched
          ? { cx: b.tight.cx, cy: b.tight.cy, zoom: b.tight.zoom, cut: false }
          : {
            cx: lerp(b.wide.cx, b.tight.cx, 0.25 * driftK),
            cy: b.wide.cy,
            zoom: b.wide.zoom + (b.tight.zoom - b.wide.zoom) * 0.3 * driftK,
            cut: lt < 0.05,
          },
      };
    },
  };
}

function sh(cmd: string, args: string[]): Promise<void> {
  return new Promise((res, rej) => {
    const p = spawn(cmd, args, { stdio: ["ignore", "inherit", "inherit"] });
    p.on("close", (c) => (c === 0 ? res(undefined) : rej(new Error(`${cmd} exit ${c}`))));
  });
}

// --- main --------------------------------------------------------------------
const planPath = arg("plan", "");
const audioPath = arg("audio", "");
const outPath = arg("out", "");
const windowOnly = arg("window", "");
const stillsArg = arg("stills", "");
if (!planPath) {
  console.error("Usage: tsx scripts/render-plan.ts --plan <showplan.json> [--audio <mp3>] --out <mp4> [--window W04] [--stills t,...]");
  process.exit(1);
}
const plan: ShowPlan = JSON.parse(fs.readFileSync(planPath, "utf8"));
const windows = windowOnly ? plan.windows.filter((w) => w.windowId === windowOnly) : plan.windows;
if (windows.length === 0) {
  console.error(`[render-plan] no windows match ${windowOnly || "(all)"}`);
  process.exit(1);
}

const invokedAsMain = (process.argv[1] ?? "").endsWith("render-plan.ts");
let overrideBeats = 0;
let totalBeats = 0;
if (invokedAsMain) for (const w of windows) {
  for (const b of w.beats) {
    totalBeats++;
    if (b.override) {
      overrideBeats++;
      console.log(`[render-plan] override beat ${b.beatId} (${w.windowId} ${b.beatType}): ${b.override}`);
    }
  }
}

const stillList = stillsArg ? stillsArg.split(",").map((s) => parseFloat(s)) : [];
const workDir = path.join(root, "output", "plan_chunks");
fs.mkdirSync(workDir, { recursive: true });

const run = async () => {
  const parts: string[] = [];
  let n = 0;
  for (const w of windows) {
    const gags: GagDef[] = w.beats.map((b) => beatToGag(w, b, n++));
    if (stillList.length > 0) {
      await driveGags({
        gags, t0: w.startSec, t1: w.endSec,
        outFile: "", stills: stillList.filter((s) => s >= w.startSec && s < w.endSec),
        stillsDir: path.join(root, "output", "plan_stills"), tag: "plan",
      });
      continue;
    }
    const part = path.join(workDir, `${w.windowId}.mp4`);
    await driveGags({ gags, t0: w.startSec, t1: w.endSec, outFile: part, stills: [], tag: "plan" });
    parts.push(part);
  }
  if (stillList.length > 0) return;
  if (!outPath) {
    console.error("[render-plan] --out required for video mode");
    process.exit(1);
  }
  if (!audioPath) {
    console.error("[render-plan] --audio required for video mode");
    process.exit(1);
  }
  const listFile = path.join(workDir, "list.txt");
  fs.writeFileSync(listFile, parts.map((p) => `file ${p}`).join("\n"));
  const t0 = windows[0].startSec;
  const t1 = windows[windows.length - 1].endSec;
  const silent = path.join(workDir, "concat.mp4");
  await sh("/usr/bin/ffmpeg", ["-y", "-hide_banner", "-loglevel", "error", "-f", "concat", "-safe", "0", "-i", listFile, "-c", "copy", silent]);
  await sh("/usr/bin/ffmpeg", ["-y", "-hide_banner", "-loglevel", "error", "-i", silent, "-ss", String(t0), "-t", String(t1 - t0), "-i", audioPath, "-map", "0:v:0", "-map", "1:a:0", "-c:v", "copy", "-c:a", "aac", "-b:a", "192k", "-shortest", "-movflags", "+faststart", outPath]);
  console.log(`[render-plan] DONE ${outPath} windows=${windows.length} beats=${totalBeats} overrides=${overrideBeats}`);
};

if (invokedAsMain) run().catch((e) => { console.error(`[render-plan] FATAL: ${e.message}`); process.exit(1); });

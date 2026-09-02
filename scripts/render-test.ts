/**
 * Render a test window and measure motion, so "better animation" is a number
 * rather than an opinion.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { Resvg } from "@resvg/resvg-js";
import { parseSrt } from "../src/subtitles/SrtParser";
import { buildTranscript } from "../src/subtitles/Transcript";
import { direct } from "../src/director/Director";
import { buildPerformance } from "../src/director/Performance";
import { renderFrame, EngineInput } from "../src/engine/RenderEngine";
import { makeSpec, BODY_PRESETS } from "../src/character/CharacterSpec";
import { cameraAt } from "../src/camera/CameraTrack";
import { buildBlinkPlan } from "../src/audio/Envelope";
import { hashSeed } from "../src/character/CharacterSpec";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");

const START = Number(process.env.T_START ?? 15.0);
const END = Number(process.env.T_END ?? 24.0);
const FPS = 24;
const W = 1280, H = 720;

const cues = parseSrt(fs.readFileSync(path.join(root, "public/0-chapter-1.srt"), "utf8"));
const transcript = buildTranscript(cues);
const envRaw = JSON.parse(fs.readFileSync(path.join(root, "public/envelope.json"), "utf8"));
const envelope = { hop: envRaw.hop, values: envRaw.values, sampleRate: envRaw.sampleRate };

const plan = direct(transcript, { fps: FPS });
const perf = buildPerformance(plan, { hostId: "host" });

const HAIRS = ["long_wave", "bob", "short_swoop", "bun"] as const;
const specs: Record<string, any> = {
  host: makeSpec("host", "Host", { body: { ...BODY_PRESETS.average }, hair: "short_swoop" }),
  default: makeSpec("default", "Extra", {}),
};
const blinkPlans: Record<string, any> = {};
for (const id of new Set(["host", ...perf.ids])) {
  const seed = hashSeed(id);
  specs[id] = specs[id] ?? makeSpec(id, id, {
    hair: HAIRS[Math.floor(seed * HAIRS.length) % HAIRS.length],
    body: seed > 0.66 ? { ...BODY_PRESETS.lean } : seed > 0.33 ? { ...BODY_PRESETS.hourglass } : { ...BODY_PRESETS.average },
  });
  blinkPlans[id] = buildBlinkPlan(seed, END + 1);
}

const engine: EngineInput = { plan, perf, transcript, envelope, specs, blinkPlans, hostId: "host", width: W, height: H, fps: FPS };

const outDir = path.join(root, "output/engine_test");
fs.rmSync(outDir, { recursive: true, force: true });
fs.mkdirSync(outDir, { recursive: true });

const fontFiles = [
  "/usr/share/fonts/truetype/noto/NotoSans-Bold.ttf",
  "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf",
].filter((f) => fs.existsSync(f));

let prev: Buffer | null = null;
const diffs: number[] = [];
const zooms: number[] = [];
const diag: string[] = ["t,diff,camPx,zoom,vbW,figures,shot"];
const parseVB = (v: string): number[] => v.split(/[ ,]+/).map(Number);
let prevVB: number[] | null = null;
const n = Math.round((END - START) * FPS);

for (let i = 0; i < n; i++) {
  const t = START + i / FPS;
  const frame = renderFrame(engine, t);
  const pose2 = cameraAt(plan.resolved, t);
  zooms.push(frame.zoom);
  const resvg = new Resvg(frame.svg, { fitTo: { mode: "width", value: W }, font: { fontFiles, defaultFontFamily: "Noto Sans", loadSystemFonts: false } });
  const img = resvg.render();
  const px = Buffer.from(img.pixels);
  fs.writeFileSync(path.join(outDir, `f${String(i).padStart(4, "0")}.png`), Buffer.from(img.asPng()));

  const vb = parseVB(frame.viewBox);
  const camPx = prevVB
    ? Math.hypot(((vb[0] - prevVB[0]) / vb[2]) * W, ((vb[1] - prevVB[1]) / vb[3]) * H)
    : 0;
  const vbScale = 1920 / vb[2];
  const figCount = (frame.svg.match(/<g id="(?!characters|subtitles)/g) ?? []).length;
  const shot = plan.shots.find((sh) => t >= sh.start && t < sh.end);
  prevVB = vb;

  if (prev) {
    // Compare on luminance of every 4th pixel for speed.
    let acc = 0, cnt = 0;
    for (let p = 0; p < px.length - 3; p += 16) {
      const l1 = 0.299 * prev[p] + 0.587 * prev[p + 1] + 0.114 * prev[p + 2];
      const l2 = 0.299 * px[p] + 0.587 * px[p + 1] + 0.114 * px[p + 2];
      if (Math.abs(l1 - l2) > 8) acc++;
      cnt++;
    }
    const d = (acc / Math.max(1, cnt)) * 100;
    diffs.push(d);
    diag.push([t.toFixed(3), d.toFixed(3), camPx.toFixed(2), pose2.zoom.toFixed(3), vb[2].toFixed(1), figCount, shot?.id ?? "-"].join(","));
  } else {
    diag.push([t.toFixed(3), "0", camPx.toFixed(2), pose2.zoom.toFixed(3), vb[2].toFixed(1), figCount, shot?.id ?? "-"].join(","));
  }
  prev = px;
}

const sorted = [...diffs].sort((a, b) => a - b);
const mean = diffs.reduce((a, b) => a + b, 0) / Math.max(1, diffs.length);
console.log(`window ${START}-${END}s  frames=${n}  scenes=${plan.scenes.length} shots=${plan.shots.length}`);
console.log(`per-frame changed-pixel %%: mean=${mean.toFixed(2)} median=${sorted[Math.floor(sorted.length/2)].toFixed(2)} min=${sorted[0].toFixed(2)} max=${sorted[sorted.length-1].toFixed(2)}`);
console.log(`frames with <0.05%% change (dead frames): ${diffs.filter(d=>d<0.05).length}/${diffs.length}`);
console.log(`largest single-frame jump: ${Math.max(...diffs).toFixed(2)}%% (a pop-in would show as one huge spike)`);
console.log(`zoom range: ${Math.min(...zooms).toFixed(2)}x .. ${Math.max(...zooms).toFixed(2)}x`);
fs.writeFileSync(path.join(outDir, "diag.csv"), diag.join("\n"));
console.log(`diag -> ${path.join(outDir, "diag.csv")}`);

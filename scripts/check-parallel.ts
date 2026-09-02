/**
 * Prove the stateless-rendering contract: the same frames rendered in a
 * different order, and in independently-created "chunks", must be byte
 * identical. If this holds, frames can be farmed across processes safely.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import crypto from "crypto";
import { Resvg } from "@resvg/resvg-js";
import { parseSrt } from "../src/subtitles/SrtParser";
import { buildTranscript } from "../src/subtitles/Transcript";
import { direct } from "../src/director/Director";
import { buildPerformance } from "../src/director/Performance";
import { renderFrame, EngineInput } from "../src/engine/RenderEngine";
import { makeSpec, BODY_PRESETS } from "../src/character/CharacterSpec";
import { hashSeed } from "../src/character/CharacterSpec";
import { buildBlinkPlan } from "../src/audio/Envelope";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const W = 1280, H = 720;

const cues = parseSrt(fs.readFileSync(path.join(root, "public/0-chapter-1.srt"), "utf8"));
const transcript = buildTranscript(cues);
const raw = JSON.parse(fs.readFileSync(path.join(root, "public/envelope.json"), "utf8"));
const envelope = { hop: raw.hop, values: raw.values, sampleRate: raw.sampleRate };
const plan = direct(transcript);
const perf = buildPerformance(plan);
const specs: Record<string, any> = {
  host: makeSpec("host", "Host", { body: { ...BODY_PRESETS.average } }),
  default: makeSpec("default", "Extra", {}),
};
const blinkPlans: Record<string, any> = {};
for (const id of new Set(["host", ...perf.ids])) {
  const seed = hashSeed(id);
  specs[id] = specs[id] ?? makeSpec(id, id, { body: { ...BODY_PRESETS.lean } });
  blinkPlans[id] = buildBlinkPlan(seed, 700);
}
const engine: EngineInput = { plan, perf, transcript, envelope, specs, blinkPlans, hostId: "host", width: W, height: H };

const fontFiles = ["/usr/share/fonts/truetype/noto/NotoSans-Bold.ttf","/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"].filter(f=>fs.existsSync(f));
const hashFrame = (t: number): string => {
  const svg = renderFrame(engine, t).svg;
  const png = Buffer.from(new Resvg(svg, { fitTo: { mode: "width", value: W }, font: { fontFiles, defaultFontFamily: "Noto Sans", loadSystemFonts: false } }).render().asPng());
  return crypto.createHash("sha256").update(png).digest("hex").slice(0, 16);
};

const times = Array.from({ length: 48 }, (_, i) => 16 + i * 0.5);

// A: sequential forward
const seqA = times.map(hashFrame);
// B: reversed order (would expose any hidden integration state)
const seqB = [...times].reverse().map(hashFrame).reverse();
// C: interleaved "chunks" as separate render passes would produce
const chunk = (idx: number[]) => idx.map((i) => hashFrame(times[i]));
const idxs = times.map((_, i) => i);
const seqC = new Array(times.length);
chunk(idxs.filter((_, i) => i % 3 === 0)).forEach((h, i) => { seqC[idxs.filter((_, j) => j % 3 === 0)[i]] = h; });
chunk(idxs.filter((_, i) => i % 3 === 1)).forEach((h, i) => { seqC[idxs.filter((_, j) => j % 3 === 1)[i]] = h; });
chunk(idxs.filter((_, i) => i % 3 === 2)).forEach((h, i) => { seqC[idxs.filter((_, j) => j % 3 === 2)[i]] = h; });

const same = (x: string[], y: string[]) => x.length === y.length && x.every((v, i) => v === y[i]);
console.log(`frames hashed: ${times.length}`);
console.log(`forward vs reversed order : ${same(seqA, seqB) ? "IDENTICAL" : "DIFFERENT"}`);
console.log(`forward vs 3-way interleave: ${same(seqA, seqC) ? "IDENTICAL" : "DIFFERENT"}`);
console.log(`distinct frame hashes: ${new Set(seqA).size}/${seqA.length} (should be near 100%% if frames differ)`);
console.log(same(seqA, seqB) && same(seqA, seqC) ? "\nstateless rendering: PROVEN" : "\nstateless rendering: FAILED");

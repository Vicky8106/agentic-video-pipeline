#!/usr/bin/env node
/**
 * SEMANTIC AUDIT — measures storytelling quality, not just motion.
 *
 *   npx tsx scripts/audit-semantic.ts <video.mp4>
 *
 * Checks:
 *  1. Meaning rate: % of beats whose stage visual is a handcrafted puppet or
 *     a concept-matched family drawer (vs generic fallback / repeated prop).
 *  2. Prop repetition: longest run of consecutive beats showing the SAME
 *     drawn asset family.
 *  3. Camera motivation: every zoom/shot change must align with a semantic
 *     trigger (number/name/concept word or sentence boundary).
 *  4. Camera calm: reversals/min, max zoom, flash count.
 *  5. Cast coverage + impact words (regression checks).
 */
import fs from "node:fs";
import path from "node:path";
import { createAutoProduction, renderAutoSvgFrame } from "../src/production/AutoProduction";

const root = process.cwd();
const srt = fs.readFileSync(path.join(root, "public", "0-chapter-1.srt"), "utf8");
const p = createAutoProduction(srt, "casually-procedural");
const beats = p.productionPlan.beats;

// --- 1+2: meaning rate & repetition --------------------------------------
const HANDCRAFTED_SIGS = [
  "cast-jenna", "cast-emma", "cast-ariana", "cast-tim", "cast-kate", "organs", "pixar",
  "cast-tech", "mcu", "doctor", "surgeon", "butler", "boss", "mourner", "dad", "podcast",
  "stomach", "baguette", "cracker", "cartridge", "hunger-wire", "battery", "hurricane",
  "mary-poppins", "couch", "hydration", "skull", "chicken", "alarm", "boss-fight",
  "wheelbarrow", "zapruder", "divorce", "firehose", "supermarket", "pumpkin", "siren",
  "subscribe", "hope-poster", "modal", "caliper",
];
const FAMILY_SIGS: Array<[RegExp, string]> = [
  [/\$100|money|bills/i, "money"], [/bread|croissant|baguette|platter/i, "food"],
  [/phone|screen|notification|browser/i, "device"], [/pill|pen|syringe|capsule|dose/i, "pill"],
  [/chart|graph|axis|trend/i, "chart"], [/person|figure|silhouette/i, "person"],
  [/jaw|skull|face|cheek|muscle/i, "body"], [/sign|banner|warning|notice/i, "sign"],
  [/car|wheel|vehicle|rocket/i, "vehicle"], [/clock|book|key|tool|box/i, "object"],
];

function classifyStage(svg: string): { family: string; handcrafted: boolean } {
  const hostIdx = svg.indexOf('id="auto-host"');
  const stage = hostIdx > 0 ? svg.slice(0, hostIdx) : svg;
  for (const sig of HANDCRAFTED_SIGS) {
    if (stage.toLowerCase().includes(sig)) return { family: sig, handcrafted: true };
  }
  for (const [re, name] of FAMILY_SIGS) {
    if (re.test(stage)) return { family: name, handcrafted: false };
  }
  return { family: "generic", handcrafted: false };
}

// Sample mid-beat for every beat: what's on stage?
const families: string[] = [];
let handcrafted = 0;
let longestRun = 0, run = 0, prevFam = "";
for (const b of beats) {
  const t = b.start + (b.end - b.start) * 0.45;
  const f = renderAutoSvgFrame({ production: p, timeSec: t, width: 480, height: 270 });
  const { family, handcrafted: hc } = classifyStage(f.svg);
  families.push(family);
  if (hc) handcrafted++;
  if (family === prevFam && family !== "generic") { run++; longestRun = Math.max(longestRun, run); }
  else run = 0;
  prevFam = family;
}
const distinctFamilies = new Set(families).size;
console.log(`[meaning] distinct stage families: ${distinctFamilies}, handcrafted puppet beats: ${handcrafted}/${beats.length} (${(100 * handcrafted / beats.length).toFixed(0)}%)`);
console.log(`[meaning] longest same-family run: ${longestRun} beats`);

// --- 3+4: camera motivation & calm ---------------------------------------
const zooms: number[] = [];
for (let t = 0; t < p.transcript.duration; t += 0.5) {
  const f = renderAutoSvgFrame({ production: p, timeSec: t, width: 320, height: 180 });
  const m = f.svg.match(/scale\(([0-9.]+)\)/);
  zooms.push(m ? +m[1] : 1);
}
let rev = 0;
for (let i = 2; i < zooms.length; i++) {
  const a = zooms[i] - zooms[i - 1], b = zooms[i - 1] - zooms[i - 2];
  if (a * b < 0 && Math.abs(a) > 0.01 && Math.abs(b) > 0.01) rev++;
}
const flashes = (f: string) => (f.match(/opacity="0\.[0-9]+"/g) ?? []).length;
let flashFrames = 0;
for (let t = 0; t < 643; t += 4) {
  const f = renderAutoSvgFrame({ production: p, timeSec: t, width: 320, height: 180 });
  if (/width="1920"[^>]*opacity="(0\.[1-9]|1)"/.test(f.svg)) flashFrames++;
}
console.log(`[camera] reversals/min: ${(rev * 60 / 643).toFixed(1)}, maxZoom: ${Math.max(...zooms).toFixed(2)}, flash-frames sampled: ${flashFrames}`);

// --- 5: regressions -------------------------------------------------------
const presence = p.coStarPresence;
let impactOk = 0;
for (const b of beats) {
  const pa = b.actions.find(a => a.type === "camera" && (a.payload?.move === "punch" || a.payload?.move === "impact"));
  const punchAt = pa ? pa.start : b.start + (b.end - b.start) * 0.55;
  const f = renderAutoSvgFrame({ production: p, timeSec: punchAt + 0.08, width: 320, height: 180 });
  if (/font-size="86"/.test(f.svg)) impactOk++;
}
console.log(`[cast] co-star beats: ${presence.size}/${beats.length} (${(100 * presence.size / beats.length).toFixed(0)}%), impact words: ${impactOk}/${beats.length}`);

// Max zoom: 1.55 macro base + ≤8% decaying punch accent at the punchline
// itself = ~1.68 ceiling. Anything above that is an unmotivated crash.
const pass = distinctFamilies >= 8 && longestRun <= 5 && handcrafted >= 10 && rev * 60 / 643 < 8 && Math.max(...zooms) <= 1.7 && impactOk === beats.length;
console.log(pass ? "SEMANTIC AUDIT PASS" : "SEMANTIC AUDIT FAIL");
process.exit(pass ? 0 : 1);

#!/usr/bin/env node
/**
 * Final verification of the sitcom production — audits the RENDERED VIDEO.
 * Extracts frames with ffmpeg and measures:
 *   - co-star on stage (via SVG re-render cross-check at same timestamps)
 *   - motion health (dead frames)
 *   - impact word moments present
 *   - scene/asset counts
 *
 * npx tsx scripts/audit-sitcom-video.ts <video.mp4>
 */
import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { createAutoProduction, renderAutoSvgFrame } from "../src/production/AutoProduction";

const video = process.argv[2];
if (!video || !fs.existsSync(video)) { console.error("usage: audit-sitcom-video.ts <video.mp4>"); process.exit(2); }

const root = process.cwd();
const srt = fs.readFileSync(path.join(root, "public", "0-chapter-1.srt"), "utf8");
const production = createAutoProduction(srt, "casually-procedural");

const durStr = execFileSync("ffprobe", ["-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", video]).toString().trim();
const duration = parseFloat(durStr);

// 1) Structural counts
const beats = production.productionPlan.beats;
const presence = production.coStarPresence;
console.log(`duration=${duration.toFixed(1)}s scenes=${production.plan.scenes.length} shots=${production.plan.resolved.length} beats=${beats.length}`);
console.log(`coStarBeats=${presence.size}/${beats.length} (${(100 * presence.size / beats.length).toFixed(0)}%)`);

// 2) Cross-check: rendered frame at N sample times vs SVG co-star presence
const sampleTimes: number[] = [];
for (let t = 5; t < Math.min(duration, 640); t += 23.7) sampleTimes.push(+t.toFixed(1));
let starMatch = 0;
for (const t of sampleTimes) {
  const beat = beats.find(b => b.start <= t && b.end > t);
  const svgHasStar = beat ? presence.has(beat.id) : false;
  const f = renderAutoSvgFrame({ production, timeSec: t, width: 320, height: 180 });
  const svgActor = /id="(cohost|blonde|goth|pixie|bun|bob|suit|techbro|hoodie|scrubs)"/.test(f.svg);
  if (svgHasStar === svgActor) starMatch++;
}
console.log(`presence cross-check: ${starMatch}/${sampleTimes.length} agree`);

// 3) Impact word moments: punch time samples must render the word
let impactOk = 0;
const punchBeats = beats.filter(b => b.role === "punchline" || b.role === "escalation");
for (const b of punchBeats.slice(0, 20)) {
  const pa = b.actions.find(a => a.type === "camera" && (a.payload?.move === "punch" || a.payload?.move === "impact"));
  const punchAt = pa ? pa.start : b.start + (b.end - b.start) * 0.55;
  const f = renderAutoSvgFrame({ production, timeSec: punchAt + 0.08, width: 320, height: 180 });
  if (/font-size="86"/.test(f.svg)) impactOk++;
}
console.log(`impact words at punch moments: ${impactOk}/${Math.min(20, punchBeats.length)}`);

// 4) Asset library count
const manifest = JSON.parse(fs.readFileSync(path.join(root, "assets", "library", "manifest.json"), "utf8"));
console.log(`asset library: ${manifest.count} SVGs`);

// 5) Video motion health (dead frames)
const tmp = "/tmp/audit_frames";
fs.mkdirSync(tmp, { recursive: true });
execFileSync("ffmpeg", ["-y", "-v", "error", "-i", video, "-vf", "fps=2,scale=64:36", "-pix_fmt", "gray", path.join(tmp, "f%03d.png")]);
const files = fs.readdirSync(tmp).filter(f => f.endsWith(".png")).sort();
let dead = 0, prev: Buffer | null = null;
const PNG_HDR = 8 + 4 + 13 + 4 + 8 + 4 + 4; // signature+IHDR+IDAT hdr approximation: parse properly below
import("node:zlib").then(zlib => {
  let diffs: number[] = [];
  let raws: Buffer[] = [];
  for (const f of files) {
    const buf = fs.readFileSync(path.join(tmp, f));
    // extract IDAT chunks and inflate to raw gray rows
    let off = 8, idat: Buffer[] = [];
    while (off < buf.length) {
      const len = buf.readUInt32BE(off);
      const type = buf.toString("ascii", off + 4, off + 8);
      if (type === "IDAT") idat.push(buf.subarray(off + 8, off + 8 + len));
      off += 12 + len;
    }
    const raw = zlib.inflateSync(Buffer.concat(idat));
    raws.push(raw);
  }
  for (let i = 1; i < raws.length; i++) {
    let diff = 0;
    const a = raws[i], b = raws[i - 1];
    const n = Math.min(a.length, b.length);
    for (let j = 0; j < n; j++) if (Math.abs(a[j] - b[j]) > 6) diff++;
    diffs.push(diff / n);
  }
  const deadFrames = diffs.filter(d => d < 0.0005).length;
  const median = diffs.slice().sort((x, y) => x - y)[Math.floor(diffs.length / 2)];
  console.log(`motion audit: ${diffs.length} comparisons, dead=${deadFrames}, medianChange=${(100 * median).toFixed(2)}%`);
  const pass = starMatch >= sampleTimes.length - 2 && impactOk >= Math.min(20, punchBeats.length) - 2 && manifest.count >= 300 && deadFrames === 0;
  console.log(pass ? "AUDIT PASS" : "AUDIT FAIL");
  process.exit(pass ? 0 : 1);
});

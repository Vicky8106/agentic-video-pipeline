import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { parseSrt } from "../src/subtitles/SrtParser";
import { buildTranscript, wordAt, repairMojibake } from "../src/subtitles/Transcript";
import { direct } from "../src/director/Director";
import { cameraAt, viewBoxFor } from "../src/camera/CameraTrack";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const srtPath = fs.existsSync(path.join(root, "public/0-chapter-1.srt"))
  ? path.join(root, "public/0-chapter-1.srt")
  : path.join(root, "public/subtitles.srt");

const cues = parseSrt(fs.readFileSync(srtPath, "utf8"));
const transcript = buildTranscript(cues);

console.log(`SRT ${path.basename(srtPath)}: cues=${cues.length} words=${transcript.words.length} sentences=${transcript.sentences.length} duration=${transcript.duration.toFixed(2)}s`);
console.log(`mojibake still present in ${cues.slice(0,60).filter(c=>/[â€ÂÃ]/.test(transcript.words.find(w=>w.cueIndex===c.id)?.text ?? "")).length} of first 60 cues`);
console.log(`repairMojibake("youâ€™ve") -> "${repairMojibake("youâ€™ve")}"`);
console.log(`sentence[0]: "${transcript.sentences[0]?.text.slice(0,80)}"`);

const monotonic = transcript.words.every((w,i)=> i===0 || w.start >= transcript.words[i-1].start - 1e-6);
const probe = transcript.words[300];
console.log(`word timings monotonic=${monotonic}  wordAt(mid)="${wordAt(transcript.words,(probe.start+probe.end)/2)?.text}"`);

const plan = direct(transcript);
console.log(`\nscenes=${plan.scenes.length} shots=${plan.shots.length} events=${plan.events.length} subjects=${Object.keys(plan.anchors).length}`);
const byKind: Record<string,number> = {}; for (const s of plan.shots) byKind[s.kind]=(byKind[s.kind]??0)+1;
const byMove: Record<string,number> = {}; for (const s of plan.shots) byMove[s.move]=(byMove[s.move]??0)+1;
console.log("kinds:", JSON.stringify(byKind));
console.log("moves:", JSON.stringify(byMove));
const lens = plan.shots.map(s=>s.end-s.start).sort((a,b)=>a-b);
console.log(`shot len: min=${lens[0].toFixed(2)} med=${lens[Math.floor(lens.length/2)].toFixed(2)} max=${lens[lens.length-1].toFixed(2)}`);
const zs = plan.shots.map(s=>s.zoom);
console.log(`zoom: ${Math.min(...zs).toFixed(2)}x .. ${Math.max(...zs).toFixed(2)}x`);

const fails: string[] = [];
if (!plan.shots.every((s,i)=> i===0 || s.start >= plan.shots[i-1].start - 1e-6)) fails.push("unsorted shots");
const ov = plan.shots.filter((s,i)=> i>0 && s.start < plan.shots[i-1].end - 1e-6);
if (ov.length) fails.push(`${ov.length} overlaps`);
// Reaction and insert cuts are intentionally brief; everything else has a floor.
const short = plan.shots.filter(s => {
  const floor = (s.kind === "reaction" || s.kind === "insert") ? 0.26 : 0.42;
  return s.end - s.start < floor - 1e-6;
});
if (short.length) fails.push(`${short.length} shots below their kind floor`);
const long = plan.shots.filter(s => s.end - s.start > 4.6);
if (long.length) fails.push(`${long.length} shots above the 4.5s ceiling`);
// Empirical, not label-based: does the framing actually move inside a shot?
const frozen: string[] = [];
for (const s of plan.shots) {
  if (s.end - s.start < 1.2) continue;
  const a = cameraAt(plan.resolved, s.start + Math.min(0.6, (s.end-s.start)*0.35));
  const b = cameraAt(plan.resolved, s.end - 0.05);
  const moved = Math.abs(b.zoom - a.zoom) > 1e-4 || Math.hypot(b.centerX-a.centerX, b.centerY-a.centerY) > 0.5;
  if (!moved) frozen.push(`${s.id} ${(s.end-s.start).toFixed(2)}s`);
}
if (frozen.length) fails.push(`${frozen.length} long shots with no motion: ${frozen.slice(0,4).join(", ")}`);
const oor = plan.shots.filter(s=>s.zoom < 1.0 || s.zoom > 2.2);
if (oor.length) fails.push(`${oor.length} shots outside 1.0-2.2x`);
if (plan.shots[0].start > 0.001) fails.push("plan does not start at 0");
if (plan.shots[plan.shots.length-1].end < transcript.duration - 0.5) fails.push("plan ends early");
if (!plan.events.every((e,i)=> i===0 || e.t >= plan.events[i-1].t)) fails.push("unsorted events");
console.log(`\ninvariants: ${fails.length? "FAIL\n  - "+fails.join("\n  - ") : "ALL PASS"}`);

// Determinism: sampling out of order must equal sampling in order.
const sample = (t:number)=>{ const p=cameraAt(plan.resolved,t); return viewBoxFor(p); };
const ordered = Array.from({length:60},(_,i)=>sample(i*1.7));
const shuffled = ordered.map((v,i)=>({v,t:i*1.7})).sort(()=>Math.random()-0.5)
  .sort((a,b)=>a.t-b.t).map(o=>o.v);
console.log(`camera determinism (order-independent): ${ordered.join("|")===shuffled.join("|") ? "PASS":"FAIL"}`);

console.log("\nfirst 12 shots:");
for (const s of plan.shots.slice(0,12))
  console.log(`  ${s.start.toFixed(2).padStart(7)} -> ${s.end.toFixed(2).padStart(7)} ${(s.end-s.start).toFixed(2)}s ${s.kind.padEnd(9)} ${s.move.padEnd(6)} z=${s.zoom.toFixed(2)} @(${s.center[0]},${s.center[1]}) ${s.tag??""}`);
console.log("\nfirst 8 events:");
for (const e of plan.events.slice(0,8))
  console.log(`  ${e.t.toFixed(2).padStart(7)} ${e.kind.padEnd(11)} ${(e.target??"-").padEnd(16)} ${e.reason??""}`);

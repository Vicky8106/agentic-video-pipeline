/**
 * Anti-slideshow quality gate for the autonomous production path.
 *
 * Run: npx tsx scripts/test-autonomous-production.mjs [path/to/script.srt]
 *
 * Checks that a generated production stays a MOVIE from first second to last:
 *   1. bounded shot lengths (no frozen compositions)
 *   2. varied shot grammar
 *   3. expression variety (the host must not wear one face for 10 minutes)
 *   4. persistent-stage coverage (objects accumulate on stage over time)
 *   5. no raster <image> elements in generated frames
 *   6. host actor present in every sampled frame, early AND late
 */
import fs from 'node:fs';
import { createAutoProduction, renderAutoSvgFrame } from '../src/production/AutoProduction.ts';
import { stageAtTime } from '../src/production/SceneMemory.ts';

const srtPath = process.argv[2] || 'public/0-chapter-1.srt';
const srt = fs.readFileSync(srtPath, 'utf8');
const p = createAutoProduction(srt);
const fail = (m) => { console.error('FAIL: ' + m); process.exit(1); };

if (!p.transcript.duration || p.plan.resolved.length < 10) fail('Production plan is unexpectedly small');

const max = Math.max(...p.plan.resolved.map(s => s.end - s.start));
if (max > p.style.edit.maximumShotSec + 0.01) fail(`Anti-slideshow max shot failed: ${max}`);

const kinds = new Set(p.plan.resolved.map(s => s.kind));
if (kinds.size < 3) fail(`Insufficient shot grammar: ${[...kinds].join(',')}`);

const expr = p.plan.events.filter(e => e.kind === 'expression').length;
if (expr < Math.max(8, p.transcript.sentences.length * .25)) fail('Insufficient actor expression events');

// Expression variety: sample the whole timeline; the rendered face must change
// many times, and no single expression may dominate more than 40% of frames.
const dur = p.transcript.duration;
const exprSeen = new Map();
let exprChanges = 0, last = null;
for (let t = 0; t < dur; t += 0.5) {
  const shot = p.plan.resolved.reduce((a, s) => (t >= s.start ? s : a), p.plan.resolved[0]);
  // recompute the same way the renderer does, via a frame render probe:
  const svg = renderAutoSvgFrame({ production: p, timeSec: t, width: 320, height: 180 }).svg;
  const m = svg.match(/data-expression="([^"]+)"/);
  const e = m ? m[1] : 'unknown';
  exprSeen.set(e, (exprSeen.get(e) ?? 0) + 1);
  if (last && e !== last) exprChanges++;
  last = e;
}
const dominant = Math.max(...exprSeen.values()) / (dur / 0.5);
if (exprSeen.size < 4) fail(`Expression monotony: only ${exprSeen.size} distinct expressions over ${dur.toFixed(0)}s`);
if (dominant > 0.4) fail(`One expression covers ${(dominant * 100).toFixed(0)}% of the movie`);

// Stage coverage: at least 85% of the timeline must have a live object.
let covered = 0, total = 0;
for (let t = 0; t < dur; t += 0.5) { total++; if (stageAtTime(p.stageObjects, t).length > 0) covered++; }
const coverage = covered / total;
if (coverage < 0.85) fail(`Stage coverage ${(coverage * 100).toFixed(1)}% < 85%`);

// Late-movie frames must be as alive as early ones.
for (const t of [0, Math.min(10, dur / 3), Math.min(30, dur / 2), Math.max(0, dur - 1)]) {
  const f = renderAutoSvgFrame({ production: p, timeSec: t, width: 640, height: 360 });
  if (/<image\b/i.test(f.svg)) fail('Autonomous path emitted a raster <image> element');
  if (!f.svg.includes('auto-host')) fail('Host actor missing');
  if (stageAtTime(p.stageObjects, t).length === 0 && t > 2) fail(`Empty stage at t=${t}s (slideshow risk)`);
}

console.log(JSON.stringify({
  ok: true, duration: dur, shots: p.plan.resolved.length, events: p.plan.events.length,
  expressions: expr, distinctFaces: exprSeen.size, faceChanges: exprChanges,
  maxShot: max, stageCoverage: +(coverage * 100).toFixed(1), shotKinds: [...kinds],
}, null, 2));

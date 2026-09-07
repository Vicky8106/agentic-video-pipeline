/**
 * audit-motion: the anti-statue gate. Samples every plan beat's GagFn at
 * N timestamps and requires >= 4 distinct motion channels per beat:
 * figX (walk/travel), figRot (sway/gesture), figScale (pop), talk (mouth),
 * point (punch gesture), fg (prop action), cam (drift/punch).
 * A beat that only blinks fails loudly instead of rendering 30s of nothing.
 *
 *   tsx scripts/audit-motion.ts --plan output/showplan.json
 */
import fs from "node:fs";
import { beatToGag } from "./render-plan";
import type { ShowPlan } from "../src/director/ShowPlan";

const arg = (name: string, def: string) => {
  const i = process.argv.indexOf(`--${name}`);
  return i > -1 && process.argv[i + 1] !== undefined ? process.argv[i + 1] : def;
};

const plan: ShowPlan = JSON.parse(fs.readFileSync(arg("plan", ""), "utf8"));
const SAMPLES = 8;
const NEED = 4;
let fails = 0;
let beats = 0;

plan.windows.forEach((w, wi) => {
  w.beats.forEach((b) => {
    beats++;
    const gag = beatToGag(w, b, wi);
    const outs = Array.from({ length: SAMPLES }, (_, i) => {
      const t = b.startSec + ((b.endSec - b.startSec) * (i + 0.5)) / SAMPLES;
      return gag.fn(t, t - b.startSec);
    });
    const ch = new Set<string>();
    const xs = new Map<string, number[]>();
    const rots: number[] = [];
    const scales: number[] = [];
    for (const o of outs) {
      for (const f of o.figs) {
        if (!xs.has(f.id)) xs.set(f.id, []);
        xs.get(f.id)!.push(f.st.x);
        rots.push((f.st as { rotation?: number }).rotation ?? 0);
        scales.push((f.st as { scale?: number }).scale ?? 1);
        if (f.st.isTalking) ch.add("talk");
        if ((f.st as { pointTarget?: unknown }).pointTarget !== undefined) ch.add("point");
      }
    }
    const range = (a: number[]) => Math.max(...a) - Math.min(...a);
    for (const v of xs.values()) if (range(v) > 2) { ch.add("figX"); break; }
    if (range(rots) > 0.5) ch.add("figRot");
    if (range(scales) > 0.005) ch.add("figScale");
    if (new Set(outs.map((o) => o.fg.length)).size > 1) ch.add("fg");
    if (range(outs.map((o) => o.cam.zoom)) > 1e-4 || range(outs.map((o) => o.cam.cx)) > 1) ch.add("cam");
    if (ch.size < NEED) {
      fails++;
      console.log(`[audit-motion] FAIL ${w.windowId} beat ${b.beatId} (${b.beatType}): channels ${ch.size}/7 [${[...ch].join(",")}]`);
    }
  });
});

console.log(fails === 0
  ? `[audit-motion] ALL BEATS MOVE beats=${beats}`
  : `[audit-motion] ${fails}/${beats} STATIC BEATS`);
process.exit(fails === 0 ? 0 : 1);

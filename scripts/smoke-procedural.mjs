/**
 * Smoke test: build a production from the 90s SRT, report stage-object
 * coverage over time, and render sample frames to PNG for visual review.
 */
import fs from "node:fs";
import { Resvg } from "@resvg/resvg-js";
import { createAutoProduction, renderAutoSvgFrame } from "../src/production/AutoProduction";
import { stageAtTime } from "../src/production/SceneMemory";

const srt = fs.readFileSync("/tmp/test90.srt", "utf8");
const prod = createAutoProduction(srt, "casually-procedural");
console.log(`beats=${prod.productionPlan.beats.length} stageObjects=${prod.stageObjects.length}`);
console.log("concepts:", prod.stageObjects.map(o => `${o.concept}:${o.kind}`).join(", "));

// coverage: fraction of timeline with >=1 live object
const dur = prod.transcript.duration;
let covered = 0, total = 0;
for (let t = 0; t < dur; t += 0.5) {
  total++;
  if (stageAtTime(prod.stageObjects, t).length > 0) covered++;
}
console.log(`stage coverage: ${(covered / total * 100).toFixed(1)}%`);

const fontFiles = [
  "/usr/share/fonts/truetype/noto/NotoSans-Bold.ttf",
  "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf",
].filter(fs.existsSync);
fs.mkdirSync("/tmp/smoke", { recursive: true });
for (const t of [3, 12, 30, 48, 66, 84]) {
  const { svg } = renderAutoSvgFrame({ production: prod, timeSec: t, width: 1280, height: 720 });
  fs.writeFileSync(`/tmp/smoke/f_${t}.svg`, svg);
  const png = new Resvg(svg, { fitTo: { mode: "width", value: 1280 }, font: { fontFiles, defaultFontFamily: "Noto Sans", loadSystemFonts: false } }).render().asPng();
  fs.writeFileSync(`/tmp/smoke/f_${t}.png`, png);
  const live = stageAtTime(prod.stageObjects, t).length;
  console.log(`t=${t}s liveObjects=${live} svgKB=${(svg.length / 1024).toFixed(1)}`);
}
console.log("OK");

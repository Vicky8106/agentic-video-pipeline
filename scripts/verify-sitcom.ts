#!/usr/bin/env node
/** Verify impact words + sitcom coverage across ALL beats. */
import fs from "node:fs";
import path from "node:path";
import { createAutoProduction, renderAutoSvgFrame } from "../src/production/AutoProduction";
import { pickPunchWord } from "../src/production/ImpactTypography";

const srt = fs.readFileSync(path.resolve(process.cwd(), "public", "0-chapter-1.srt"), "utf8");
const production = createAutoProduction(srt, "casually-procedural");
const beats = production.productionPlan.beats;

let impactTotal = 0, weakWords = 0, sitcomBeats = 0, nullWords = 0;
const weak = [];
for (const b of beats) {
  const text = b.visual?.semantic ?? "";
  const pw = pickPunchWord(text);
  if (!pw) { nullWords++; continue; }
  if (pw.reason === "last-punch" && pw.word.length <= 3) { weakWords++; weak.push(pw.word); }
  const punchAction = b.actions.find(a => a.type === "camera" && (a.payload?.move === "punch" || a.payload?.move === "impact"));
  const punchAt = punchAction ? punchAction.start : b.start + (b.end - b.start) * 0.55;
  const t = punchAt + 0.08;
  const { svg } = renderAutoSvgFrame({ production, timeSec: t, width: 320, height: 180 });
  if (/font-size="86"/.test(svg)) impactTotal++;
  if (/cohost|blonde|goth|pixie|bun|bob|suit|techbro|hoodie|scrubs/.test(svg)) sitcomBeats++;
}
console.log(`beats=${beats.length}`);
console.log(`impact word rendered at punch moment: ${impactTotal}/${beats.length}`);
console.log(`co-star on stage at punch moment: ${sitcomBeats}/${beats.length}`);
console.log(`null punch words: ${nullWords}, suspiciously short: ${weakWords} ${weak.slice(0,8).join(",")}`);

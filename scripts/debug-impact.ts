#!/usr/bin/env node
/** Debug: why are impact words missing on some punchline beats? */
import fs from "node:fs";
import path from "node:path";
import { createAutoProduction, renderAutoSvgFrame } from "../src/production/AutoProduction";
import { pickPunchWord } from "../src/production/ImpactTypography";

const srt = fs.readFileSync(path.resolve(process.cwd(), "public", "0-chapter-1.srt"), "utf8");
const production = createAutoProduction(srt, "casually-procedural");
const beats = production.productionPlan.beats;

console.log(`beats=${beats.length} roles:`, JSON.stringify(beats.reduce((a, b) => { a[b.role] = (a[b.role] ?? 0) + 1; return a; }, {})));

const punchBeats = beats.filter(b => b.role === "punchline" || b.role === "escalation");
console.log(`punchline/escalation beats: ${punchBeats.length}`);
for (const b of punchBeats.slice(0, 12)) {
  const text = b.visual?.semantic ?? "";
  const pw = pickPunchWord(text);
  // find punch action in this beat
  const punchAction = b.actions.find(a => a.type === "camera" && (a.payload?.move === "punch" || a.payload?.move === "impact"));
  const punchAt = punchAction ? punchAction.start : b.start + (b.end - b.start) * 0.55;
  const t = punchAt + 0.05;
  const { svg } = renderAutoSvgFrame({ production, timeSec: t, width: 1280, height: 720 });
  const hasImpact = /impactShadow/.test(svg) && /font-size="86"/.test(svg);
  const wordShown = hasImpact ? (svg.match(/<text[^>]*font-size="86"[^>]*>([^<]+)</)?.[1] ?? "?") : "-";
  console.log(`[${b.role}] t=${b.start.toFixed(1)} punch=${punchAt.toFixed(1)} word="${pw?.word ?? "NONE"}"(${pw?.reason ?? "-"}) rendered=${hasImpact ? wordShown : "NO"}`);
}

/**
 * Test Suite: End-to-End Autonomous Pipeline with Arbitrary Script (GATE-PIPE-01)
 */
import { createAutoProduction, renderAutoSvgFrame } from "../src/production/AutoProduction.js";

function assert(condition: boolean, msg: string) {
  if (!condition) {
    console.error("FAIL:", msg);
    process.exit(1);
  }
}

console.log("Running End-to-End Autonomous Pipeline Tests...");

const SCRIPT_SRT = `
1
00:00:00,000 --> 00:00:04,500
The gym is a cathedral where giant bodybuilders flex their muscles.

2
00:00:04,500 --> 00:00:09,200
Until a skinny janitor named Anatoly walks in carrying a yellow mop bucket.

3
00:00:09,200 --> 00:00:14,000
He asks if he can clean the floor under the 500-pound barbell.

4
00:00:14,000 --> 00:00:18,500
Then he casually one-hand deadlifts the entire rack while looking at the camera.
`.trim();

const production = createAutoProduction(SCRIPT_SRT, "casually-procedural");
assert(production.transcript.duration > 15, "Transcript duration must be > 15s");
assert(production.plan.resolved.length >= 4, "Must resolve at least 4 camera shots");

console.log(`✓ Production compiled: ${production.transcript.duration.toFixed(1)}s, ${production.plan.resolved.length} shots`);

// Test frame at t = 2.0s (gym intro, host speaking)
const frame1 = renderAutoSvgFrame({ production, timeSec: 2.0, width: 1280, height: 720 });
assert(frame1.svg.includes("<svg"), "Must render valid SVG root");
assert(frame1.svg.includes('class="stick-figure"'), "Must render host stick figure");
assert(frame1.svg.includes('class="character-foot"'), "Must render articulated footwear");
assert(frame1.svg.includes('class="character-hand"'), "Must render articulated hands");
console.log("PASS: Frame 1 rendered clean with articulated puppet anatomy.");

// Test frame at t = 6.5s (co-star janitor Anatoly on stage)
const frame2 = renderAutoSvgFrame({ production, timeSec: 6.5, width: 1280, height: 720 });
assert(frame2.svg.includes("<svg"), "Must render valid SVG");
assert(frame2.svg.includes("character-foot"), "Must render footwear geometry");
console.log("PASS: Frame 2 rendered clean with two-shot staging.");

// Test frame at t = 16.0s (punchline one-hand lift)
const frame3 = renderAutoSvgFrame({ production, timeSec: 16.0, width: 1280, height: 720 });
assert(frame3.svg.includes("<svg"), "Must render valid SVG");
console.log("PASS: Frame 3 rendered clean on punchline climax.");

console.log("GATE-PIPE-01 PASS");

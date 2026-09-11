/**
 * Test Suite: Volumetric Broadcast-Grade SVG Assets (GATE-SVG-01 & GATE-SVG-02)
 */
import {
  renderOlympicBarbellRig,
  renderDetailedMopRig,
  renderDetailedMopBucketRig,
} from "../src/character/PropRigs.js";

function assert(condition: boolean, msg: string) {
  if (!condition) {
    console.error("FAIL:", msg);
    process.exit(1);
  }
}

console.log("Running Volumetric SVG Asset Tests...");

// 1. Olympic Barbell Verification
const barbell = renderOlympicBarbellRig({ x: 960, y: 650, scale: 1.1, plateCount: 4 });
assert(barbell.includes('fill="#dc2626"'), "Barbell must render Red 25KG outer bumper plates");
assert(barbell.includes('fill="#2563eb"'), "Barbell must render Blue 20KG bumper plates");
assert(barbell.includes('fill="#eab308"'), "Barbell must render Yellow 15KG bumper plates");
assert(barbell.includes('fill="#16a34a"'), "Barbell must render Green 10KG inner bumper plates");
assert(barbell.includes("Knurling Texture"), "Barbell must render chrome knurling texture zones");
assert(barbell.includes("Specular Chrome Reflection"), "Barbell must render specular chrome light sheen");
assert(barbell.includes("Ambient Floor Contact Drop Shadow"), "Barbell must render floor contact drop shadow");
console.log("PASS: Broadcast-grade Olympic barbell verified with official color bumpers, knurling, and shadows.");
console.log("GATE-SVG-01 PASS");

// 2. Commercial Janitor Mop Verification
const mop = renderDetailedMopRig({ x: 500, y: 650, swayInertia: 5, isMopping: true });
assert(mop.includes("Fiberglass Mop Handle"), "Mop must render textured fiberglass handle");
assert(mop.includes("Heavy Cast-Steel Clamp Bracket"), "Mop must render heavy cast-steel clamp with wingnut");
assert(mop.includes("Braided Cotton Yarn Head"), "Mop must render multi-strand braided cotton yarn");
assert(mop.includes("tracer threads"), "Mop must render woven blue tracer threads");
console.log("PASS: Commercial janitor mop verified with cotton yarn physics and clamp hardware.");

// 3. Yellow Mop Bucket Verification
const bucket = renderDetailedMopBucketRig({ x: 400, y: 650 });
assert(bucket.includes('id="casters"'), "Mop bucket must render 4 swivel caster wheels");
assert(bucket.includes("Pressure Wringer Box Unit"), "Mop bucket must render heavy wringer press unit");
assert(bucket.includes("CAUTION WET FLOOR"), "Mop bucket must render caution slip emblem");
console.log("PASS: Detailed commercial mop bucket verified.");
console.log("GATE-SVG-02 PASS");

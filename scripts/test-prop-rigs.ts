/**
 * Verification test for Parameterized Prop Rigs.
 */
import { renderCaliperRig, renderSaaSModalRig, renderKeycapSlamRig, renderWheelbarrowRig } from "../src/character/PropRigs";

console.log("Testing Prop Rigs...");

const caliperSvg = renderCaliperRig({ x: 960, y: 540, jawGap: 35, lcdValue: "0.02 mm", laserActive: true });
if (!caliperSvg.includes("prop-caliper-rig") || !caliperSvg.includes("0.02 mm")) {
  throw new Error("FAIL: Caliper rig failed to render properly.");
}
console.log("✅ Caliper Rig OK");

const saasSvg = renderSaaSModalRig({ x: 960, y: 540, isCancelled: true, stampProgress: 1 });
if (!saasSvg.includes("CANCELLED")) {
  throw new Error("FAIL: SaaS modal rig failed to render CANCELLED stamp.");
}
console.log("✅ SaaS Modal Rig OK");

const keycapSvg = renderKeycapSlamRig({ x: 960, y: 540, pressProgress: 0.8 });
if (!keycapSvg.includes("Ctrl + W")) {
  throw new Error("FAIL: Keycap slam rig failed.");
}
console.log("✅ Keycap Slam Rig OK");

const wheelbarrowSvg = renderWheelbarrowRig({ x: 960, y: 540, wheelRotation: 90, moneyCount: 8 });
if (!wheelbarrowSvg.includes("prop-wheelbarrow-rig")) {
  throw new Error("FAIL: Wheelbarrow rig failed.");
}
console.log("✅ Wheelbarrow Rig OK");

console.log("🎉 Gate 1: Prop Rigs Fully Passed!");

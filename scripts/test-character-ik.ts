/**
 * Verification test for Character Kinematics & Props.
 */
import { renderStickFigure } from "../src/character/StickFigure";

console.log("Testing Character Kinematics & Props...");

const coffeeStick = renderStickFigure("host-coffee", {
  x: 500,
  y: 600,
  rightHandProp: "coffee_cup",
  expression: "smug_rock_eyebrow",
});
if (!coffeeStick.includes("coffee_cup") && !coffeeStick.includes("854d0e")) {
  throw new Error("FAIL: Coffee cup prop not rendered.");
}
console.log("✅ Coffee Cup Prop OK");

const caliperStick = renderStickFigure("host-caliper", {
  x: 500,
  y: 600,
  rightHandProp: "caliper",
  pose: "pointing",
});
if (!caliperStick.includes("0.02mm")) {
  throw new Error("FAIL: Caliper prop not rendered.");
}
console.log("✅ Caliper Hand Prop OK");

const syringeStick = renderStickFigure("host-syringe", {
  x: 500,
  y: 600,
  rightHandProp: "syringe",
});
if (!syringeStick.includes("0284c7")) {
  throw new Error("FAIL: Syringe hand prop not rendered.");
}
console.log("✅ Syringe Hand Prop OK");

console.log("🎉 Gate 2: Character Kinematics & Props Passed!");

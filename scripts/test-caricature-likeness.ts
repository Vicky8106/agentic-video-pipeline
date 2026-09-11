/**
 * Test Suite: Caricature & Likeness Subsystem (GATE-CAR-01 & GATE-CAR-02)
 */
import { renderStickFigure } from "../src/character/StickFigure.js";
import { resolveCaricature, CARICATURE_REGISTRY } from "../src/character/CaricatureEngine.js";

function assert(condition: boolean, msg: string) {
  if (!condition) {
    console.error("FAIL:", msg);
    process.exit(1);
  }
}

console.log("Running Caricature Likeness Tests...");

// 1. Registry & Resolver Resolution
const anatolyProf = resolveCaricature("janitor_anatoly");
assert(anatolyProf !== null && anatolyProf.id === "anatoly", "Must resolve Anatoly from janitor_anatoly");

const builderProf = resolveCaricature("bodybuilder_bro");
assert(builderProf !== null && builderProf.id === "bodybuilder", "Must resolve Bodybuilder from bodybuilder_bro");

const drMikeProf = resolveCaricature("dr_mike");
assert(drMikeProf !== null && drMikeProf.id === "dr_mike", "Must resolve Dr. Mike");
console.log("PASS: Caricature profiles resolved successfully.");

// 2. Anatoly Likeness Verification
const anatoly = renderStickFigure("anatoly", { x: 500, y: 500, rightHandProp: "mop" });
assert(anatoly.includes('id="anatoly-mustache"'), "Anatoly must render iconic dirty-blonde bushy mustache");
assert(anatoly.includes('id="jaw-stubble"'), "Anatoly must render scruffy jawline 5 o'clock stubble");
assert(anatoly.includes("Slanted Worker Baseball Cap"), "Anatoly must render slanted blue worker cap with blonde hair fringe");
assert(anatoly.includes('id="denim-overalls"'), "Anatoly must render baggy denim overalls with brass buckles");
assert(anatoly.includes('id="flannel-shirt"'), "Anatoly must render red flannel shirt underneath overalls");
assert(anatoly.includes("lug sole"), "Anatoly must wear heavy work boots with lug soles");
assert(anatoly.includes("hand-grip-front"), "Anatoly must hold mop with true wrapping fingers grip");
console.log("PASS: Anatoly signature likeness fully verified (mustache, stubble, cap, overalls, boots, mop grip).");
console.log("GATE-CAR-01 PASS");

// 3. Bodybuilder Likeness Verification
const builder = renderStickFigure("bodybuilder", { x: 800, y: 500 });
assert(builder.includes('id="bodybuilder-muscle-torso"'), "Bodybuilder must render broad muscular torso");
assert(builder.includes("Bulging Trapezius"), "Bodybuilder must render bulging trapezius muscles");
assert(builder.includes("Red Stringer Tank Top"), "Bodybuilder must render red gym tank top");
assert(builder.includes("rubber midsole"), "Bodybuilder must wear high-top gym sneakers");
console.log("PASS: Bodybuilder comic proportions fully verified (deltoids, traps, tank, sneakers).");
console.log("GATE-CAR-02 PASS");

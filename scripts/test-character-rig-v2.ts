/**
 * Test Suite: Character Rigging & Anatomy V2 (GATE-RIG-01 & GATE-RIG-02)
 */
import { renderStickFigure } from "../src/character/StickFigure.js";
import { renderHand, renderGrippingHandLayers } from "../src/character/HandRig.js";
import { renderFoot } from "../src/character/FootRig.js";

function assert(condition: boolean, msg: string) {
  if (!condition) {
    console.error("FAIL:", msg);
    process.exit(1);
  }
}

console.log("Running Character Rigging V2 Tests...");

// 1. Test Articulated Limbs with Knee & Elbow Joint Caps
const standardFig = renderStickFigure("host", { x: 400, y: 500 });
assert(standardFig.includes('<circle cx="'), "Must include joint circles for elbows or knees");
assert(standardFig.includes('class="character-foot"'), "Must include contoured footwear geometry");
assert(standardFig.includes('class="character-hand"'), "Must include articulated hand geometry");
console.log("PASS: Standard stick figure has joint caps, footwear, and articulated hands.");

// 2. Test Hand Poses (relaxed_mitt, pointing, fist, gripping)
const pointingHand = renderHand({ x: 0, y: 0, angleDeg: 0, pose: "pointing" });
assert(pointingHand.includes("Extended index finger"), "Pointing hand must render extended index finger");

const fistHand = renderHand({ x: 0, y: 0, angleDeg: 0, pose: "fist" });
assert(fistHand.includes("Clenched knuckles"), "Fist hand must render clenched knuckles");

const mittHand = renderHand({ x: 0, y: 0, angleDeg: 0, pose: "relaxed_mitt" });
assert(mittHand.includes("Natural thumb notch"), "Relaxed mitt must render natural thumb notch");

// 3. Test 2-Layer Prop Grip
const gripLayers = renderGrippingHandLayers({ x: 0, y: 0, angleDeg: 0 });
assert(gripLayers.backSvg.includes("hand-grip-back"), "Must render back palm support layer");
assert(gripLayers.frontSvg.includes("hand-grip-front"), "Must render front wrapping fingers layer");
console.log("PASS: Hand poses and 2-layer prop grip verified.");

// 4. Test Footwear Styles (work_boot, gym_sneaker, dress_shoe)
const boot = renderFoot({ x: 0, y: 0, shoeStyle: "work_boot" });
assert(boot.includes("lug sole"), "Work boot must render thick rubber lug sole");
assert(boot.includes("toe cap"), "Work boot must render curved reinforced toe cap");

const sneaker = renderFoot({ x: 0, y: 0, shoeStyle: "gym_sneaker" });
assert(sneaker.includes("rubber midsole"), "Gym sneaker must render white rubber midsole");

const dressShoe = renderFoot({ x: 0, y: 0, shoeStyle: "dress_shoe" });
assert(dressShoe.includes("dress shoe sole"), "Dress shoe must render defined heel sole");
console.log("PASS: Footwear geometry verified across all styles.");

// 5. Test Dual Ambient Occlusion Floor Shadows
assert(standardFig.includes('ellipse cx="0"'), "Must include center floor drop shadow");
assert(standardFig.includes('opacity="0.22"'), "Must include individual foot ambient occlusion shadows");
console.log("PASS: Contact drop shadows verified.");

console.log("GATE-RIG-01 PASS");
console.log("GATE-RIG-02 PASS");

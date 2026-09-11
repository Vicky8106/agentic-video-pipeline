/**
 * Test Suite: Actor Interaction & Eyeline Solver (GATE-EYE-01 & GATE-EYE-02)
 */
import {
  solveMutualGaze,
  solvePropGaze,
  solveCameraGaze,
  solveComedicDoubleTake,
} from "../src/character/EyelineSolver.js";

function assert(condition: boolean, msg: string) {
  if (!condition) {
    console.error("FAIL:", msg);
    process.exit(1);
  }
}

console.log("Running Eyeline Solver Tests...");

// 1. Test Mutual Eyeline Triangulation (Actor A and Actor B)
const actorA = { x: 500, y: 650, scale: 1.2 };
const actorB = { x: 1300, y: 650, scale: 1.45 }; // Taller bodybuilder on the right

const gazeAtoB = solveMutualGaze(actorA, actorB);
assert(gazeAtoB.gazeX > 0.5, "Actor A must look right towards Actor B");
assert(gazeAtoB.gazeY < 0, "Actor A must look UP towards taller Actor B head");
assert(gazeAtoB.bodyFacing === "right", "Actor A body must face right");

const gazeBtoA = solveMutualGaze(actorB, actorA);
assert(gazeBtoA.gazeX < -0.5, "Actor B must look left towards Actor A");
assert(gazeBtoA.gazeY > 0, "Actor B must look DOWN towards shorter Actor A head");
assert(gazeBtoA.bodyFacing === "left", "Actor B body must face left");

console.log("PASS: Mutual eyeline triangulation verified across varying positions and heights.");
console.log("GATE-EYE-01 PASS");

// 2. Test Prop Gaze Tracking
const barbellPos = { x: 750, y: 650 };
const propGaze = solvePropGaze(actorA, barbellPos.x, barbellPos.y);
assert(propGaze.gazeX > 0, "Actor must look right towards barbell");
assert(propGaze.gazeY > 0.5, "Actor must look DOWN towards floor barbell");
console.log("PASS: Prop tracking gaze verified.");

// 3. Test 3-Beat Comedic Double-Take Progression
const dtParams = {
  actor: actorB,
  propPos: barbellPos,
  rival: actorA,
  timeInBeat: 0.4,
};

// Beat 1: Looking at prop
const beat1 = solveComedicDoubleTake({ ...dtParams, timeInBeat: 0.4 });
assert(beat1.expression === "confused_squint", "Beat 1 must be confused squint at prop");
assert(beat1.gazeY > 0.3, "Beat 1 must look down at prop");

// Beat 2: Shock snap to rival
const beat2 = solveComedicDoubleTake({ ...dtParams, timeInBeat: 1.2 });
assert(beat2.expression === "shock_jaw_drop", "Beat 2 must be shock jaw drop looking at rival");
assert(beat2.eyeStyle === "eye_pop", "Beat 2 must trigger cartoon eye pop");
assert(beat2.gazeX < 0, "Beat 2 must look left at rival");

// Beat 3: Fourth-wall camera lens snap
const beat3 = solveComedicDoubleTake({ ...dtParams, timeInBeat: 2.1 });
assert(beat3.expression === "deadpan_slow_blink", "Beat 3 must be deadpan stare into camera");
assert(beat3.gazeX === 0 && beat3.gazeY === 0, "Beat 3 must look dead center down camera lens");
assert(beat3.eyeStyle === "deadpan_dots", "Beat 3 must render deadpan dot eyes");

console.log("PASS: 3-Beat comedic double-take progression verified.");
console.log("GATE-EYE-02 PASS");

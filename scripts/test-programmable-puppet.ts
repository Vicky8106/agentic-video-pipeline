/**
 * Test & Validation Script for ProgrammablePuppet & ObjectMotion.
 */
import { makeSpec, BASE_BODY, BODY_PRESETS } from "../src/character/CharacterSpec";
import {
  renderProgrammablePuppet,
  lookAt,
  ProgrammablePuppetState,
} from "../src/character/ProgrammablePuppet";
import { popInSquash, slamDrop, floatingHover } from "../src/anim/ObjectMotion";

const fails: string[] = [];
const ok = (cond: boolean, msg: string) => {
  if (!cond) fails.push(msg);
};

const spec = makeSpec("host", "Host", { body: { ...BASE_BODY } });

// 1. Test basic puppet rendering & socket generation
{
  const state: ProgrammablePuppetState = {
    x: 560,
    y: 650,
    scale: 1.35,
    eyebrowLeftHeight: 12,
    eyebrowRightHeight: -4,
    gazeX: 0.6,
    gazeY: -0.2,
    mouthSmile: 0.8,
    mouthOpen: 0.3,
  };

  const result = renderProgrammablePuppet(spec, state);
  ok(result.svg.includes("<svg") || result.svg.includes("<g id="), "SVG not generated");
  ok(Number.isFinite(result.sockets.headCenter.x), "headCenter.x is NaN");
  ok(Number.isFinite(result.sockets.eyeCenter.y), "eyeCenter.y is NaN");
  ok(Number.isFinite(result.sockets.leftHand.x), "leftHand.x is NaN");
  ok(Number.isFinite(result.sockets.rightHand.y), "rightHand.y is NaN");
}
console.log("1. Programmable puppet render & sockets: " + (fails.length ? "FAIL" : "PASS"));

// 2. Test lookAt utility
{
  const puppetPos = { x: 560, y: 650 };
  const targetPos = { x: 1420, y: 500 };
  const gaze = lookAt(puppetPos, targetPos);

  ok(gaze.gazeX > 0.3, `lookAt gazeX should be positive rightward (got ${gaze.gazeX})`);
  ok(gaze.headYaw > 0.1, `lookAt headYaw should turn right (got ${gaze.headYaw})`);
}
console.log("2. lookAt vector aiming: " + (fails.length ? "FAIL" : "PASS"));

// 3. Test Object Motion Squash & Drop
{
  const popMid = popInSquash(0.12, 0.25, { x: 960, y: 540 });
  ok(popMid.scaleX > 0 && popMid.scaleY > 0, "Pop in scale invalid");
  ok(popMid.opacity > 0, "Pop in opacity invalid");

  const slam = slamDrop(0.2, 0.16, { x: 960, y: 840 });
  ok(slam.impactOccurred === true, "Impact should have occurred at t > dropDuration");
  ok(slam.screenShake >= 0, "Screen shake invalid");
}
console.log("3. Comedic object physics & squash: " + (fails.length ? "FAIL" : "PASS"));

// 4. Test extreme morphs and numeric hygiene
{
  for (const presetName of Object.keys(BODY_PRESETS)) {
    const custom = BODY_PRESETS[presetName];
    const res = renderProgrammablePuppet(spec, {
      x: 960,
      y: 540,
      scale: 1.4,
      customBody: custom,
      eyeVariant: "shock_pop",
      eyelidLeftOpen: 1.5,
      eyelidRightOpen: 1.5,
      mouthWobble: 0.6,
    });
    ok(!res.svg.includes("NaN"), `NaN found in SVG for preset ${presetName}`);
  }
}
console.log("4. Body morphs & numeric hygiene: " + (fails.length ? "FAIL" : "PASS"));

if (fails.length > 0) {
  console.error("FAILURES:\n" + fails.join("\n"));
  process.exit(1);
} else {
  console.log("\nALL PROGRAMMABLE PUPPET & MOTION TESTS PASSED!");
}

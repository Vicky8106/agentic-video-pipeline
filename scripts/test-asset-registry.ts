/**
 * Test Suite: DynamicAssetRegistry Live Mounting (GATE-FORGE-03)
 */
import { registerSynthesizedProp, registerSynthesizedCaricature, registerSynthesizedBackground, listDynamicAssets } from "../src/forge/DynamicAssetRegistry.js";
import { renderProp } from "../src/assets/PropLibrary.js";
import { renderBackground } from "../src/assets/BackgroundLibrary.js";
import { renderStickFigure } from "../src/character/StickFigure.js";

function assert(cond: boolean, msg: string) {
  if (!cond) {
    console.error("FAIL:", msg);
    process.exit(1);
  }
}

async function run() {
  console.log("Running DynamicAssetRegistry Live Mounting Tests...");

  // 1. Mount Dynamic Prop
  const testPropId = "PROP-TEST-LASER";
  registerSynthesizedProp({
    id: testPropId,
    name: "Sci-Fi Laser Blaster",
    svgFragment: `<g id="${testPropId}"><rect x="-40" y="-15" width="80" height="30" fill="#38bdf8" stroke="#0f172a" stroke-width="5"/><circle cx="40" cy="0" r="10" fill="#ef4444"/></g>`,
    gripX: -20,
    gripY: 0,
    gripAngle: 0,
    holdingStyle: "held_one_hand",
  });

  const propSvg = renderProp(testPropId, { x: 100, y: 100 });
  assert(propSvg.includes(testPropId), "renderProp must find and wrap dynamically registered prop");
  assert(propSvg.includes("#38bdf8"), "renderProp must contain dynamic prop geometry");
  console.log("PASS: Dynamic prop successfully rendered via PropLibrary.");

  // 2. Mount Dynamic Background
  const testBgId = "BG-TEST-CYBER";
  registerSynthesizedBackground({
    id: testBgId,
    name: "Cyberpunk Alley",
    svgFragment: `<g id="${testBgId}"><rect width="1280" height="720" fill="#180b2b"/><line x1="0" y1="550" x2="1280" y2="550" stroke="#f43f5e" stroke-width="8"/></g>`,
  });

  const bgSvg = renderBackground(testBgId);
  assert(bgSvg.includes(testBgId), "renderBackground must find dynamically registered background");
  assert(bgSvg.includes("#180b2b"), "renderBackground must render dynamic background colors");
  console.log("PASS: Dynamic background successfully rendered via BackgroundLibrary.");

  // 3. Mount Dynamic Caricature
  const testCharId = "cyber_samurai";
  registerSynthesizedCaricature({
    id: testCharId,
    name: "Cyber Samurai",
    headwearSvg: `<path d="M -50 -50 L 0 -90 L 50 -50 Z" fill="#e11d48" stroke="#0f172a" stroke-width="5"/>`,
    facialSvg: `<path d="M -20 10 Q 0 25 20 10" stroke="#0f172a" stroke-width="4" fill="none"/>`,
    torsoSvg: `<rect x="-35" y="-80" width="70" height="100" fill="#1e1b4b" stroke="#6366f1" stroke-width="5"/>`,
  });

  const charSvg = renderStickFigure(testCharId, {
    x: 640,
    y: 540,
    caricatureId: testCharId,
  });
  assert(charSvg.includes("#e11d48"), "renderStickFigure must render custom headwear SVG");
  assert(charSvg.includes("#1e1b4b"), "renderStickFigure must render custom torso overlay");
  console.log("PASS: Dynamic caricature successfully rendered on stick figure rig.");

  const list = listDynamicAssets();
  assert(list.props.includes(testPropId), "listDynamicAssets must list registered prop");
  assert(list.backgrounds.includes(testBgId), "listDynamicAssets must list registered background");
  assert(list.caricatures.includes(testCharId), "listDynamicAssets must list registered caricature");

  console.log("GATE-FORGE-03 PASS");
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});

import fs from "fs";
import path from "path";
import { Resvg } from "@resvg/resvg-js";
import { renderStickFigure } from "../src/character/StickFigure.js";
import { renderOlympicBarbellRig, renderDetailedMopRig, renderDetailedMopBucketRig } from "../src/character/PropRigs.js";
import { solveMutualGaze } from "../src/character/EyelineSolver.js";
import { renderBackground } from "../src/assets/BackgroundLibrary.js";

const outDir = "/root/.gemini/antigravity-cli/brain/0943b627-7260-4738-b724-42e8c005e649/stills_v2";
fs.mkdirSync(outDir, { recursive: true });

function saveSvgToPng(svg: string, filename: string) {
  const resvg = new Resvg(svg, {
    fitTo: { mode: "width", value: 1280 },
  });
  const pngData = resvg.render().asPng();
  const filePath = path.join(outDir, filename);
  fs.writeFileSync(filePath, pngData);
  console.log(`Saved proof still: ${filePath} (${(pngData.length / 1024).toFixed(1)} KB)`);
}

// 1. Anatoly Signature Caricature Showcase (Mop in hand, mustache, stubble, baggy overalls, work boots)
const anatolySvg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1280 720" width="1280" height="720">
  ${renderBackground("BG-STUDIO", { timeSec: 0 })}
  <!-- Title Badge -->
  <g transform="translate(640, 70)">
    <rect x="-320" y="-28" width="640" height="56" rx="12" fill="#0f172a" stroke="#f59e0b" stroke-width="4"/>
    <text x="0" y="8" font-family="'Impact', sans-serif" font-size="24" fill="#fbbf24" letter-spacing="2" text-anchor="middle">
      ANATOLY RIG V2: SIGNATURE CARICATURE
    </text>
  </g>
  ${renderStickFigure("anatoly", {
    x: 640,
    y: 530,
    scale: 1.5,
    gender: "janitor",
    caricatureId: "anatoly",
    clothes: "janitor_overalls",
    shoeStyle: "work_boot",
    rightHandProp: "mop",
    expression: "deadpan_classic",
    gazeX: 0.2,
    gazeY: -0.1,
  })}
</svg>
`;
saveSvgToPng(anatolySvg, "proof_1_anatoly_v2.png");

// 2. Comic Bodybuilder Showcase (Bulging traps, muscle torso, gym tank, sneakers)
const builderSvg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1280 720" width="1280" height="720">
  ${renderBackground("BG-STUDIO", { timeSec: 0 })}
  <!-- Title Badge -->
  <g transform="translate(640, 70)">
    <rect x="-320" y="-28" width="640" height="56" rx="12" fill="#0f172a" stroke="#ef4444" stroke-width="4"/>
    <text x="0" y="8" font-family="'Impact', sans-serif" font-size="24" fill="#f87171" letter-spacing="2" text-anchor="middle">
      BODYBUILDER V2: COMIC PROPORTIONS
    </text>
  </g>
  ${renderStickFigure("bodybuilder", {
    x: 640,
    y: 520,
    scale: 1.6,
    gender: "bodybuilder",
    caricatureId: "bodybuilder",
    bodyType: "massive_bodybuilder",
    clothes: "bodybuilder_tank",
    shoeStyle: "gym_sneaker",
    expression: "smug_rock_eyebrow",
    gazeX: -0.3,
    gazeY: 0.1,
  })}
</svg>
`;
saveSvgToPng(builderSvg, "proof_2_bodybuilder_v2.png");

// 3. Mutual Eyeline Interaction: Anatoly vs Giant Bodybuilder in Gym
const anatolyPos = { x: 380, y: 550, scale: 1.25 };
const builderPos = { x: 920, y: 540, scale: 1.55 };
const gazeAnatoly = solveMutualGaze(anatolyPos, builderPos);
const gazeBuilder = solveMutualGaze(builderPos, anatolyPos);

const interactionSvg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1280 720" width="1280" height="720">
  ${renderBackground("BG-GYM", { timeSec: 0 })}
  <!-- Title Badge -->
  <g transform="translate(640, 70)">
    <rect x="-320" y="-28" width="640" height="56" rx="12" fill="#0f172a" stroke="#38bdf8" stroke-width="4"/>
    <text x="0" y="8" font-family="'Impact', sans-serif" font-size="24" fill="#7dd3fc" letter-spacing="2" text-anchor="middle">
      MUTUAL EYELINE SOLVER: DYNAMIC EYE CONTACT
    </text>
  </g>
  <!-- Olympic Barbell between them on floor -->
  ${renderOlympicBarbellRig({ x: 650, y: 580, scale: 1.15, plateCount: 4 })}
  <!-- Mop bucket beside Anatoly -->
  ${renderDetailedMopBucketRig({ x: 230, y: 550, scale: 1.1 })}
  <!-- Anatoly looking up at Bodybuilder -->
  ${renderStickFigure("anatoly", {
    ...anatolyPos,
    gender: "janitor",
    caricatureId: "anatoly",
    clothes: "janitor_overalls",
    shoeStyle: "work_boot",
    rightHandProp: "mop",
    expression: "deadpan_classic",
    gazeX: gazeAnatoly.gazeX,
    gazeY: gazeAnatoly.gazeY,
    headTilt: gazeAnatoly.headTilt,
    bodyFacing: gazeAnatoly.bodyFacing,
  })}
  <!-- Bodybuilder looking down in shock/disbelief at Anatoly -->
  ${renderStickFigure("bodybuilder", {
    ...builderPos,
    gender: "bodybuilder",
    caricatureId: "bodybuilder",
    bodyType: "massive_bodybuilder",
    clothes: "bodybuilder_tank",
    shoeStyle: "gym_sneaker",
    expression: "shock_jaw_drop",
    eyeStyle: "eye_pop",
    gazeX: gazeBuilder.gazeX,
    gazeY: gazeBuilder.gazeY,
    headTilt: gazeBuilder.headTilt,
    bodyFacing: gazeBuilder.bodyFacing,
  })}
</svg>
`;
saveSvgToPng(interactionSvg, "proof_3_mutual_eyeline_interaction.png");

// 4. Volumetric SVG Asset Showcase (Olympic Barbell & Janitor Mop Rig)
const propShowcaseSvg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1280 720" width="1280" height="720">
  ${renderBackground("BG-STUDIO", { timeSec: 0 })}
  <!-- Title Badge -->
  <g transform="translate(640, 70)">
    <rect x="-320" y="-28" width="640" height="56" rx="12" fill="#0f172a" stroke="#22c55e" stroke-width="4"/>
    <text x="0" y="8" font-family="'Impact', sans-serif" font-size="24" fill="#4ade80" letter-spacing="2" text-anchor="middle">
      BROADCAST-GRADE DETAILED VECTOR PROPS
    </text>
  </g>
  <!-- Detailed Mop Bucket -->
  ${renderDetailedMopBucketRig({ x: 260, y: 440, scale: 1.5 })}
  <!-- Olympic Barbell with official bumper color banding -->
  ${renderOlympicBarbellRig({ x: 740, y: 460, scale: 1.35, plateCount: 4 })}
</svg>
`;
saveSvgToPng(propShowcaseSvg, "proof_4_volumetric_props.png");

console.log("All 4 proof stills re-rendered successfully!");

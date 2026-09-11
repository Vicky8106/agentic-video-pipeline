import fs from "node:fs";
import path from "node:path";
import { Resvg } from "@resvg/resvg-js";
import { renderProp } from "../src/assets/PropLibrary.js";
import { renderBackground } from "../src/assets/BackgroundLibrary.js";
import { renderStickFigure } from "../src/character/StickFigure.js";
import { loadAssetFromCache } from "../src/forge/DynamicAssetRegistry.js";

const outDir = "/root/.gemini/antigravity-cli/brain/0943b627-7260-4738-b724-42e8c005e649/stills_anatoly_forged";
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

// 1. Scene with Forensic Lab, CSI Magnifying Glass, and Ship Anchor Barbell
const bgForensics = loadAssetFromCache<any>("background", "BG-FORENSICS-LAB");
const svg1 = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1280 720" width="1280" height="720">
  ${bgForensics ? bgForensics.svgFragment : renderBackground("BG-STUDIO")}

  <!-- Title Badge -->
  <g transform="translate(640, 50)">
    <rect x="-380" y="-22" width="760" height="44" rx="10" fill="#0f172a" stroke="#38bdf8" stroke-width="4"/>
    <text x="0" y="8" font-family="'Impact', sans-serif" font-size="20" fill="#7dd3fc" letter-spacing="2" text-anchor="middle">
      LLM ASSET FORGE: GYM FORENSIC CSI &amp; ANCHOR BARBELL
    </text>
  </g>

  <!-- Ground Floor shadow line -->
  <line x1="0" y1="570" x2="1280" y2="570" stroke="#334155" stroke-width="4"/>

  <!-- Prop: Ship Anchor Barbell -->
  ${renderProp("PROP-ANCHOR-BAR", { x: 860, y: 460, scale: 1.1 })}

  <!-- Prop: Forensic Magnifying Glass -->
  ${renderProp("PROP-MAGNIFY", { x: 800, y: 360, scale: 0.9 })}

  <!-- Caricature: Security Guard Inspecting Barbell -->
  ${renderStickFigure("security_guard", {
    x: 440,
    y: 560,
    scale: 1.35,
    caricatureId: "security_guard",
    expression: "suspicious",
    gazeX: 0.6,
    gazeY: -0.1,
  })}
</svg>
`;
saveSvgToPng(svg1, "forged_anatoly_scene1_forensics.png");

// 2. Scene with YouTube Dashboard, Radioactive Forklift, and Jeff Cavaliere + Gym Rat
const bgYoutube = loadAssetFromCache<any>("background", "BG-YOUTUBE-DASHBOARD");
const svg2 = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1280 720" width="1280" height="720">
  ${bgYoutube ? bgYoutube.svgFragment : renderBackground("BG-STUDIO")}

  <!-- Title Badge -->
  <g transform="translate(640, 50)">
    <rect x="-380" y="-22" width="760" height="44" rx="10" fill="#0f172a" stroke="#f59e0b" stroke-width="4"/>
    <text x="0" y="8" font-family="'Impact', sans-serif" font-size="20" fill="#fcd34d" letter-spacing="2" text-anchor="middle">
      LLM ASSET FORGE: THE ALGORITHM VOID &amp; FORKLIFT
    </text>
  </g>

  <!-- Prop: Radioactive Forklift -->
  ${renderProp("PROP-FORKLIFT", { x: 920, y: 480, scale: 1.0 })}

  <!-- Prop: Production Call Sheet -->
  ${renderProp("PROP-CALLSHEET", { x: 640, y: 350, scale: 0.8 })}

  <!-- Caricature: Jeff Cavaliere -->
  ${renderStickFigure("jeff_cavaliere", {
    x: 340,
    y: 560,
    scale: 1.3,
    caricatureId: "jeff_cavaliere",
    expression: "deadpan_classic",
    gazeX: 0.4,
    gazeY: -0.1,
  })}

  <!-- Caricature: Literal Gym Rat -->
  ${renderStickFigure("gym_rat", {
    x: 580,
    y: 570,
    scale: 0.9,
    caricatureId: "gym_rat",
    expression: "smug",
    gazeX: -0.3,
    gazeY: -0.2,
  })}
</svg>
`;
saveSvgToPng(svg2, "forged_anatoly_scene2_algorithm.png");

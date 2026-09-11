import fs from "node:fs";
import path from "node:path";
import { Resvg } from "@resvg/resvg-js";
import { renderProp } from "../src/assets/PropLibrary.js";
import { renderBackground } from "../src/assets/BackgroundLibrary.js";
import { renderStickFigure } from "../src/character/StickFigure.js";
import { loadAssetFromCache } from "../src/forge/DynamicAssetRegistry.js";
import { SynthesizedProp, SynthesizedCaricature, SynthesizedBackground } from "../src/forge/VectorSynthesizer.js";

const outDir = "/root/.gemini/antigravity-cli/brain/0943b627-7260-4738-b724-42e8c005e649/stills_forge";
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

// Render proof frame composed of the newly forged assets
const bg = loadAssetFromCache<SynthesizedBackground>("background", "BG-BISTRO");
const machine = loadAssetFromCache<SynthesizedProp>("prop", "PROP-ESPRESSO-MACHINE");
const eruption = loadAssetFromCache<SynthesizedProp>("prop", "PROP-COFFEE-ERUPTION");

const svg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1280 720" width="1280" height="720">
  ${bg ? bg.svgFragment : renderBackground("BG-STUDIO")}

  <!-- Title Badge -->
  <g transform="translate(640, 60)">
    <rect x="-350" y="-24" width="700" height="48" rx="10" fill="#0f172a" stroke="#10b981" stroke-width="4"/>
    <text x="0" y="8" font-family="'Impact', sans-serif" font-size="22" fill="#34d399" letter-spacing="2" text-anchor="middle">
      LLM ASSET FORGE: AUTONOMOUSLY SYNTHESIZED SCENE
    </text>
  </g>

  <!-- Novel Background / Counter Table -->
  <rect x="700" y="440" width="450" height="180" rx="8" fill="#475569" stroke="#0f172a" stroke-width="6"/>

  <!-- Novel Synthesized Prop: Espresso Machine -->
  ${renderProp("PROP-ESPRESSO-MACHINE", { x: 880, y: 390, scale: 0.85 })}

  <!-- Novel Synthesized Prop: Coffee Eruption -->
  ${renderProp("PROP-COFFEE-ERUPTION", { x: 880, y: 250, scale: 0.9 })}

  <!-- Novel Synthesized Caricature: Chef Luigi -->
  ${renderStickFigure("chef_luigi", {
    x: 460,
    y: 530,
    scale: 1.4,
    caricatureId: "chef_luigi",
    expression: "shocked",
    gazeX: 0.5,
    gazeY: -0.2,
  })}
</svg>
`;

saveSvgToPng(svg, "proof_llm_asset_forge.png");

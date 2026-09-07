import { Scene, SceneRenderContext, SceneRenderOutput } from "./SceneTypes";
import {
  renderLithiumBatteryPack,
  renderObamaLastCarb2012,
} from "../character/CartoonCastSubScenes";
import { renderHandDrawnArrow, renderHandDrawnCircle, renderActionLines } from "../anim/ComicMarkups";

export const Scene17_CyborgMonoculture: Scene = {
  id: "scene_17_cyborg_monoculture",
  name: "Cyborg RPG Creator, Carbs 2008 & Frozen Forehead",
  startTime: 474.340,
  endTime: 540.354,

  render(ctx: SceneRenderContext): SceneRenderOutput {
    const { sceneTime, camera } = ctx;

    const isScanning = sceneTime < 18.2;
    const isBotox = sceneTime >= 18.2 && sceneTime < 38.5;
    const isClones = sceneTime >= 38.5;

    let overlays = "";
    let bg = "";
    let stickFiguresList: Array<{ id: string; state: any }> = [];

    // =========================================================================
    // SUB-SCENE 1: AESTHETIC MONOCULTURE LAB & LASER SCAN (0.0s - 18.2s)
    // =========================================================================
    if (isScanning) {
      camera.setTarget(960, 500, 1.25);

      bg = `
        <!-- High-Tech Aesthetic Clinic Lab Backdrop -->
        <rect x="-4000" y="-4000" width="10000" height="10000" fill="#020617"/>
        <rect x="150" y="80" width="1620" height="720" rx="14" fill="#0f172a" stroke="#06b6d4" stroke-width="8"/>
        
        <!-- Laser Symmetry Grid Lines -->
        <g stroke="#22d3ee" stroke-width="2" opacity="0.6">
          <line x1="200" y1="300" x2="1720" y2="300"/>
          <line x1="200" y1="450" x2="1720" y2="450"/>
          <line x1="200" y1="600" x2="1720" y2="600"/>
          <line x1="700" y1="100" x2="700" y2="780"/>
          <line x1="960" y1="100" x2="960" y2="780"/>
          <line x1="1220" y1="100" x2="1220" y2="780"/>
        </g>

        <!-- Symmetry HUD -->
        <g transform="translate(960, 160)">
          <rect x="-260" y="-30" width="520" height="60" rx="12" fill="#0f172a" stroke="#06b6d4" stroke-width="4" filter="url(#glow)"/>
          <text x="0" y="10" font-family="'Impact', sans-serif" font-size="24" fill="#22d3ee" letter-spacing="2" text-anchor="middle">
            FACIAL MONOCULTURE: 99.9% SYMMETRY
          </text>
        </g>

        <!-- Floor -->
        <rect x="-4000" y="800" width="10000" height="4000" fill="#000000"/>
        <line x1="-4000" y1="800" x2="6000" y2="800" stroke="#06b6d4" stroke-width="8"/>
      `;

      stickFiguresList.push({
        id: "cyborg_actor",
        state: {
          x: 960,
          y: 640,
          scale: 1.34,
          gender: "female",
          hairStyle: "female_slicked_back",
          clothes: "y2k_crop_top_low_rise",
          expression: "deadpan_soul_stare",
          timeSec: sceneTime,
        },
      });
    }

    // =========================================================================
    // SUB-SCENE 2: FROZEN FOREHEAD & LITHIUM BATTERY (18.2s - 38.5s)
    // =========================================================================
    else if (isBotox) {
      camera.setTarget(960, 500, 1.08);

      bg = `
        <!-- High-Tech Battery Lab -->
        <rect x="-4000" y="-4000" width="10000" height="10000" fill="#020617"/>
        <rect x="150" y="80" width="1620" height="720" rx="14" fill="#0f172a" stroke="#a855f7" stroke-width="8"/>
        
        <!-- Floor -->
        <rect x="-4000" y="800" width="10000" height="4000" fill="#000000"/>
        <line x1="-4000" y1="800" x2="6000" y2="800" stroke="#a855f7" stroke-width="8"/>
      `;

      bg += renderLithiumBatteryPack(1260, 460, sceneTime);
      overlays += renderHandDrawnCircle({ x: 1260, y: 460 }, 180, 110, sceneTime, "LITHIUM ION");

      stickFiguresList.push({
        id: "botox_actor",
        state: {
          x: 580,
          y: 640,
          scale: 1.34,
          gender: "female",
          hairStyle: "female_high_ponytail",
          clothes: "crop_top_leggings",
          expression: "cringe_teeth_grit",
          pointTarget: { x: 1260, y: 460 },
          timeSec: sceneTime,
        },
      });
    }

    // =========================================================================
    // SUB-SCENE 3: LAST KNOWN CARBOHYDRATE (OBAMA 2012) (38.5s - 66.01s)
    // =========================================================================
    else {
      camera.setTarget(960, 520, 1.08);

      bg = `
        <!-- Matrix Clone Production Line -->
        <rect x="-4000" y="-4000" width="10000" height="10000" fill="#030712"/>
        <rect x="150" y="80" width="1620" height="720" rx="14" fill="#111827" stroke="#22c55e" stroke-width="8"/>
        
        <!-- Clone Vats in Background -->
        ${[300, 500].map(vx => `
          <rect x="${vx - 70}" y="200" width="140" height="380" rx="14" fill="#064e3b" stroke="#10b981" stroke-width="4"/>
          <ellipse cx="${vx}" cy="230" rx="50" ry="15" fill="#34d399" opacity="0.4"/>
        `).join("")}

        <!-- Floor -->
        <rect x="-4000" y="800" width="10000" height="4000" fill="#000000"/>
        <line x1="-4000" y1="800" x2="6000" y2="800" stroke="#22c55e" stroke-width="8"/>
      `;

      bg += renderObamaLastCarb2012(1260, 460, sceneTime);

      stickFiguresList.push({
        id: "prime_clone",
        state: {
          x: 580,
          y: 640,
          scale: 1.34,
          gender: "female",
          hairStyle: "female_bob_bangs",
          clothes: "dress_black",
          expression: "deadpan_soul_stare",
          pointTarget: { x: 1260, y: 460 },
          timeSec: sceneTime,
        },
      });
    }

    return {
      backgroundSvg: bg + overlays,
      stickFigures: stickFiguresList,
    };
  },
};

import { Scene, SceneRenderContext, SceneRenderOutput } from "./SceneTypes";
import { renderBillionaireGoldElevator } from "../character/CartoonComedyPuppets";
import { renderHandDrawnArrow, renderHandDrawnCircle, renderActionLines } from "../anim/ComicMarkups";

export const Scene18_EconomicOutro: Scene = {
  id: "scene_18_economic_outro",
  name: "Economic Flex, Gold Wheelbarrow, Butler & Outro",
  startTime: 540.354,
  endTime: 644.080,

  render(ctx: SceneRenderContext): SceneRenderOutput {
    const { sceneTime, camera } = ctx;

    const isElevator = sceneTime < 25.4;
    const isOutsource = sceneTime >= 25.4 && sceneTime < 65.2;
    const isOutro = sceneTime >= 65.2;

    let overlays = "";
    let bg = "";
    let stickFiguresList: Array<{ id: string; state: any }> = [];

    // =========================================================================
    // SUB-SCENE 1: BILLIONAIRE GOLD PENTHOUSE ELEVATOR (0.0s - 25.4s)
    // =========================================================================
    if (isElevator) {
      camera.setTarget(960, 520, 1.25);

      bg = `
        <!-- Penthouse Gold Elevator Lobby -->
        <rect x="-4000" y="-4000" width="10000" height="10000" fill="#0f172a"/>
        <rect x="150" y="80" width="1620" height="720" rx="14" fill="#1e293b" stroke="#f59e0b" stroke-width="8"/>
        
        <!-- Floor -->
        <rect x="-4000" y="800" width="10000" height="4000" fill="#020617"/>
        <line x1="-4000" y1="800" x2="6000" y2="800" stroke="#f59e0b" stroke-width="8"/>
      `;

      bg += renderBillionaireGoldElevator(1280, 500, sceneTime);

      // Monthly $2,400 Receipt Card
      bg += `
        <g transform="translate(640, 320)">
          <rect x="-140" y="-120" width="280" height="240" rx="10" fill="#ffffff" stroke="#0f172a" stroke-width="4" filter="url(#cardShadow)"/>
          <text x="0" y="-80" font-family="'Impact', sans-serif" font-size="20" fill="#0f172a" text-anchor="middle">MONTHLY COST</text>
          <line x1="-120" y1="-60" x2="120" y2="-60" stroke="#cbd5e1" stroke-width="2"/>
          <text x="-110" y="-30" font-family="monospace" font-size="14" fill="#334155">Ozempic: $1,200</text>
          <text x="-110" y="-5" font-family="monospace" font-size="14" fill="#334155">Chef: $3,500</text>
          <text x="-110" y="20" font-family="monospace" font-size="14" fill="#334155">Trainer: $2,000</text>
          <line x1="-120" y1="40" x2="120" y2="40" stroke="#0f172a" stroke-width="3"/>
          <text x="0" y="80" font-family="'Impact', sans-serif" font-size="24" fill="#ef4444" text-anchor="middle">TOTAL: $6,700/mo</text>
        </g>
      `;

      stickFiguresList.push({
        id: "billionaire_actor",
        state: {
          x: 960,
          y: 640,
          scale: 1.34,
          gender: "male",
          hairStyle: "male_tech_bro",
          clothes: "suit",
          expression: "smug_rock_eyebrow",
          timeSec: sceneTime,
        },
      });
    }

    // =========================================================================
    // SUB-SCENE 2: 4-QUADRANT OUTSOURCED MATRIX (25.4s - 65.2s)
    // =========================================================================
    else if (isOutsource) {
      camera.setTarget(960, 520, 1.15);

      bg = `
        <!-- 4-Quadrant Outsourcing Matrix -->
        <rect x="-4000" y="-4000" width="10000" height="10000" fill="#0f172a"/>
        <rect x="150" y="80" width="1620" height="720" rx="14" fill="#1e293b" stroke="#38bdf8" stroke-width="8"/>
        
        <!-- Grid Dividers -->
        <line x1="960" y1="80" x2="960" y2="800" stroke="#475569" stroke-width="6"/>
        <line x1="150" y1="440" x2="1770" y2="440" stroke="#475569" stroke-width="6"/>

        <!-- Quadrant Titles -->
        <text x="550" y="140" font-family="'Impact', sans-serif" font-size="24" fill="#facc15" text-anchor="middle">1. PRIVATE CHEF</text>
        <text x="1370" y="140" font-family="'Impact', sans-serif" font-size="24" fill="#38bdf8" text-anchor="middle">2. PERSONAL TRAINER</text>
        <text x="550" y="500" font-family="'Impact', sans-serif" font-size="24" fill="#f472b6" text-anchor="middle">3. GLP-1 DOCTOR</text>
        <text x="1370" y="500" font-family="'Impact', sans-serif" font-size="24" fill="#4ade80" text-anchor="middle">4. BUTLER / DRIVER</text>

        <!-- Floor -->
        <rect x="-4000" y="800" width="10000" height="4000" fill="#020617"/>
        <line x1="-4000" y1="800" x2="6000" y2="800" stroke="#38bdf8" stroke-width="8"/>
      `;

      stickFiguresList.push({
        id: "boss_actor",
        state: {
          x: 960,
          y: 640,
          scale: 1.34,
          gender: "male",
          hairStyle: "host_classic",
          clothes: "suit",
          expression: "smug_chef_kiss",
          timeSec: sceneTime,
        },
      });
    }

    // =========================================================================
    // SUB-SCENE 3: YOUTUBE SUBSCRIBE OUTRO & FINAL REACTION (65.2s - 103.7s)
    // =========================================================================
    else {
      camera.cutTo(960, 500, 1.35);

      const bellRing = Math.sin(sceneTime * 10) * 15;

      bg = `
        <!-- Clean YouTube Outro Backdrop -->
        <rect x="-4000" y="-4000" width="10000" height="10000" fill="#f8fafc"/>
        
        <!-- YouTube Subscribe Box -->
        <g transform="translate(1320, 360)" filter="url(#cardShadow)">
          <rect x="-160" y="-60" width="320" height="120" rx="20" fill="#ef4444"/>
          <text x="0" y="12" font-family="'Impact', Arial, sans-serif" font-size="34" fill="#ffffff" letter-spacing="2" text-anchor="middle">
            SUBSCRIBE
          </text>
          <!-- Bell Icon -->
          <g transform="translate(110, 0) rotate(${bellRing})">
            <path d="M 0 -20 C -12 -20 -18 -10 -18 10 L -24 16 L 24 16 L 18 10 C 18 -10 12 -20 0 -20 Z" fill="#facc15" stroke="#ca8a04" stroke-width="3"/>
            <circle cx="0" cy="22" r="5" fill="#ca8a04"/>
          </g>
        </g>

        <!-- Floor -->
        <rect x="-4000" y="800" width="10000" height="4000" fill="#e2e8f0"/>
        <line x1="-4000" y1="800" x2="6000" y2="800" stroke="#cbd5e1" stroke-width="6"/>
      `;

      stickFiguresList.push({
        id: "host_actor",
        state: {
          x: 640,
          y: 640,
          scale: 1.34,
          gender: "male",
          hairStyle: "host_classic",
          clothes: "none",
          expression: "deadpan_slow_blink",
          pointTarget: { x: 1320, y: 360 },
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

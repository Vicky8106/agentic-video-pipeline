import { Scene, SceneRenderContext, SceneRenderOutput } from "./SceneTypes";
import { renderTikTokDuetJury } from "../character/CartoonCastSubScenes";
import { renderHandDrawnArrow, renderHandDrawnCircle, renderActionLines } from "../anim/ComicMarkups";

export const Scene16_TikTokTribunal: Scene = {
  id: "scene_16_tiktok_tribunal",
  name: "TikTok Tribunal, Wednesday Dance & Zapruder 8mm",
  startTime: 408.630,
  endTime: 474.340,

  render(ctx: SceneRenderContext): SceneRenderOutput {
    const { sceneTime, camera } = ctx;

    const isJudgeGavel = sceneTime < 13.5;
    const isZapruder = sceneTime >= 13.5 && sceneTime < 32.5;
    const isWednesday = sceneTime >= 32.5;

    let overlays = "";
    let bg = "";
    let stickFiguresList: Array<{ id: string; state: any }> = [];

    // =========================================================================
    // SUB-SCENE 1: TIKTOK COURTROOM TRIBUNAL (0.0s - 13.5s)
    // =========================================================================
    if (isJudgeGavel) {
      camera.setTarget(960, 520, 1.08);

      bg = `
        <!-- Forensic Courtroom Wood Paneling -->
        <rect x="-4000" y="-4000" width="10000" height="10000" fill="#2d1508"/>
        <rect x="150" y="80" width="1620" height="720" rx="14" fill="#451a03" stroke="#b45309" stroke-width="8"/>
        
        <!-- Judge's Bench on Left -->
        <polygon points="300,800 860,800 800,600 360,600" fill="#78350f" stroke="#b45309" stroke-width="8"/>
        <rect x="420" y="580" width="340" height="40" rx="6" fill="#92400e" stroke="#f59e0b" stroke-width="4"/>

        <!-- Courtroom Scales of Justice Seal -->
        <circle cx="580" cy="220" r="50" fill="#78350f" stroke="#f59e0b" stroke-width="4"/>
        <text x="580" y="235" font-family="'Impact', sans-serif" font-size="44" fill="#fbbf24" text-anchor="middle">⚖</text>

        <!-- Floor -->
        <rect x="-4000" y="800" width="10000" height="4000" fill="#1c1917"/>
        <line x1="-4000" y1="800" x2="6000" y2="800" stroke="#f59e0b" stroke-width="8"/>
      `;

      bg += renderTikTokDuetJury(1320, 480, sceneTime);

      // Judge banging gavel
      const gavelDown = Math.sin(sceneTime * 8) > 0;
      stickFiguresList.push({
        id: "judge_actor",
        state: {
          x: 580,
          y: 560,
          scale: 1.34,
          gender: "male",
          hairStyle: "male_tech_bro",
          clothes: "judge_robes",
          expression: "rage_clenched_fists",
          pointTarget: gavelDown ? { x: 680, y: 600 } : { x: 680, y: 520 },
          timeSec: sceneTime,
        },
      });
    }

    // =========================================================================
    // SUB-SCENE 2: ZAPRUDER 8MM FILM ANALYSIS (13.5s - 32.5s)
    // =========================================================================
    else if (isZapruder) {
      camera.cutTo(960, 500, 1.45);

      bg = `
        <!-- Vintage 8mm Film Projector Screen -->
        <rect x="-4000" y="-4000" width="10000" height="10000" fill="#000000"/>
        <rect x="250" y="100" width="1420" height="680" rx="10" fill="#1c1917" stroke="#78716c" stroke-width="6"/>
        
        <!-- Film Grain & Sprocket Holes -->
        ${[140, 240, 340, 440, 540, 640].map(sy => `
          <rect x="270" y="${sy}" width="30" height="50" rx="4" fill="#44403c"/>
          <rect x="1620" y="${sy}" width="30" height="50" rx="4" fill="#44403c"/>
        `).join("")}

        <!-- Red Laser Crosshairs on Face -->
        <g stroke="#ef4444" stroke-width="3" opacity="0.85">
          <circle cx="960" cy="480" r="140" fill="none" stroke-dasharray="10 8"/>
          <line x1="800" y1="480" x2="1120" y2="480"/>
          <line x1="960" y1="320" x2="960" y2="640"/>
        </g>

        <!-- Timecode HUD -->
        <text x="960" y="160" font-family="'Courier New', monospace" font-size="28" font-weight="bold" fill="#ef4444" text-anchor="middle">
          FRAME: 00:04:12:18 [ANALYZING BUCCAL FAT]
        </text>

        <!-- Floor -->
        <rect x="-4000" y="800" width="10000" height="4000" fill="#0c0a09"/>
      `;

      overlays += renderActionLines({ x: 960, y: 480 }, 240, sceneTime);

      stickFiguresList.push({
        id: "suspect_actor",
        state: {
          x: 960,
          y: 640,
          scale: 1.34,
          gender: "female",
          hairStyle: "female_bob_bangs",
          clothes: "dress_black",
          expression: "fear_sweat_freeze",
          timeSec: sceneTime,
        },
      });
    }

    // =========================================================================
    // SUB-SCENE 3: WEDNESDAY DANCE IN COURTROOM (32.5s - 65.71s)
    // =========================================================================
    else {
      camera.setTarget(960, 520, 1.25);

      bg = `
        <!-- Gothic Ballroom Courtroom -->
        <rect x="-4000" y="-4000" width="10000" height="10000" fill="#0f172a"/>
        <rect x="150" y="80" width="1620" height="720" rx="14" fill="#1e1b4b" stroke="#6366f1" stroke-width="8"/>
        
        <!-- Gothic Stained Glass Window -->
        <path d="M 800 500 L 800 240 A 160 160 0 0 1 1120 240 L 1120 500 Z" fill="#312e81" stroke="#818cf8" stroke-width="6"/>

        <!-- Title Banner -->
        <g transform="translate(960, 150)">
          <rect x="-240" y="-30" width="480" height="60" rx="12" fill="#0f172a" stroke="#818cf8" stroke-width="4" filter="url(#cardShadow)"/>
          <text x="0" y="10" font-family="'Impact', sans-serif" font-size="26" fill="#c7d2fe" letter-spacing="2" text-anchor="middle">
            THE WEDNESDAY DANCE DEFENSE
          </text>
        </g>

        <!-- Floor -->
        <rect x="-4000" y="800" width="10000" height="4000" fill="#09090b"/>
        <line x1="-4000" y1="800" x2="6000" y2="800" stroke="#818cf8" stroke-width="8"/>
      `;

      // Wednesday dance arm sway
      const danceSway = Math.sin(sceneTime * 6) * 15;
      stickFiguresList.push({
        id: "wednesday_actor",
        state: {
          x: 960,
          y: 640,
          scale: 1.34,
          gender: "female",
          hairStyle: "female_bob_bangs",
          clothes: "dress_black",
          expression: "deadpan_soul_stare",
          spineLean: danceSway,
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

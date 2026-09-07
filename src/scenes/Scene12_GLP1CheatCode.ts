import { Scene, SceneRenderContext, SceneRenderOutput } from "./SceneTypes";
import {
  renderShiveringStomachPuppet,
  renderSciFiPharmaDoctor,
} from "../character/CartoonComedyPuppets";
import {
  renderNintendoGLP1Cartridge,
  renderChainedStomachPadlock,
  renderSaltineCrackerPlatter,
  renderSeductiveBaguette,
} from "../character/CartoonCastSubScenes";
import { renderHandDrawnArrow, renderHandDrawnCircle, renderActionLines } from "../anim/ComicMarkups";

export const Scene12_GLP1CheatCode: Scene = {
  id: "scene_12_glp1_cheat_code",
  name: "GLP-1 Cheat Code, Chained Stomach & French Baguette",
  startTime: 183.920,
  endTime: 238.740,

  render(ctx: SceneRenderContext): SceneRenderOutput {
    const { sceneTime, camera } = ctx;

    // EXACT WORD-LEVEL TIMESTAMPS FROM 0-chapter-1.srt:
    // Cue 66-68 (183.920s - 197.700s / t=0.0s - 13.780s): "GLP-1 receptor agonist... Ozempic, Wegovy, Mounjaro"
    // Cue 69 (197.700s - 202.400s / t=13.780s - 18.480s): "Originally developed to manage diabetes... slow gastric emptying"
    // Cue 70-71 (202.400s - 207.656s / t=18.480s - 23.736s): "hack brain reward system... 56k dial-up stomach"
    // Cue 72-73 (207.656s - 210.913s / t=23.736s - 26.993s): "full after eating half a saltine cracker... holy grail"
    // Cue 74-78 (210.913s - 224.433s / t=26.993s - 40.513s): "why eat kale, run on treadmill... single shot once a week... oxygen & attention"
    // Cue 79-80 (224.433s - 230.247s / t=40.513s - 46.327s): "Before this had to work out... now hunger is just gone"
    // Cue 81-82 (230.247s - 235.800s / t=46.327s - 51.880s): "stop wanting to procrastinate, or stop wanting to text your ex"
    // Cue 83 (235.800s - 238.740s / t=51.880s - 54.820s): "That's what this does, but for bread."
    const isSub1 = sceneTime < 13.780;
    const isSub2 = sceneTime >= 13.780 && sceneTime < 18.480;
    const isSub3 = sceneTime >= 18.480 && sceneTime < 23.736;
    const isSub4 = sceneTime >= 23.736 && sceneTime < 26.993;
    const isSub5 = sceneTime >= 26.993 && sceneTime < 40.513;
    const isSub6 = sceneTime >= 40.513 && sceneTime < 46.327;
    const isSub7 = sceneTime >= 46.327 && sceneTime < 51.880;

    let hostX = 420;
    let hostY = 650;
    let hostLean = 8;
    let isWalking = false;
    let hostExpr: any = "deadpan_classic";
    let pointTarget: { x: number; y: number } | undefined = { x: 1260, y: 480 };
    let overlays = "";
    let bg = "";

    let stickFiguresList: Array<{ id: string; state: any }> = [];

    // =========================================================================
    // SUB-SCENE 1: GLP-1 PHARMACY (0.0s - 13.78s)
    // =========================================================================
    if (isSub1) {
      if (sceneTime < 6.0) {
        camera.cutTo(960, 540, 1.05);
      } else {
        camera.cutTo(1260, 480, 1.28);
      }
      const walkProg = Math.min(1, sceneTime / 1.5);
      hostX = 260 + walkProg * 160;
      isWalking = walkProg < 1;
      hostLean = 8;
      hostExpr = sceneTime < 6.0 ? "deadpan_classic" : "smug_rock_eyebrow";

      bg = `
        <!-- High-Tech Pharmacy Backdrop -->
        <rect x="-4000" y="-4000" width="10000" height="10000" fill="#f0fdfa"/>
        <rect x="150" y="80" width="1620" height="720" rx="14" fill="#ccfbf1" stroke="#14b8a6" stroke-width="8"/>
        
        <!-- Pharmacy Shelves with Medicine Bottles -->
        ${[200, 340, 480, 620].map(sy => `
          <line x1="200" y1="${sy}" x2="800" y2="${sy}" stroke="#0d9488" stroke-width="6"/>
          ${[240, 320, 400, 480, 560, 640, 720].map(bx => `
            <rect x="${bx}" y="${sy - 50}" width="36" height="50" rx="4" fill="#ffffff" stroke="#0f766e" stroke-width="3"/>
            <rect x="${bx + 4}" y="${sy - 60}" width="28" height="10" rx="2" fill="#f43f5e"/>
          `).join("")}
        `).join("")}

        <!-- Pharmacy Tile Floor -->
        <rect x="-4000" y="800" width="10000" height="4000" fill="#0f766e"/>
        <line x1="-4000" y1="800" x2="6000" y2="800" stroke="#14b8a6" stroke-width="8"/>
      `;

      stickFiguresList.push({
        id: "host_stick",
        state: {
          x: hostX,
          y: hostY,
          scale: 1.32,
          timeSec: sceneTime,
          spineLean: hostLean,
          isWalking: isWalking,
          pointTarget: { x: 1260, y: 480 },
          expression: hostExpr,
        },
      });
      overlays += renderHandDrawnCircle({ x: 1260, y: 480 }, 190, 130, sceneTime, "GLP-1 AGONIST");
    }

    // =========================================================================
    // SUB-SCENE 2: MEDICAL CLINIC & PHARMA DOCTOR (13.78s - 18.48s)
    // =========================================================================
    else if (isSub2) {
      camera.cutTo(1260, 520, 1.22);
      hostX = 380;
      hostLean = -10;
      hostExpr = "shock_eye_pop";

      bg = `
        <!-- Hospital Clinic Examination Room -->
        <rect x="-4000" y="-4000" width="10000" height="10000" fill="#f0f9ff"/>
        <rect x="150" y="80" width="1620" height="720" rx="14" fill="#e0f2fe" stroke="#0284c7" stroke-width="8"/>
        
        <!-- Hospital Floor -->
        <rect x="-4000" y="800" width="10000" height="4000" fill="#64748b"/>
        <line x1="-4000" y1="800" x2="6000" y2="800" stroke="#38bdf8" stroke-width="8"/>
      `;

      stickFiguresList.push(
        {
          id: "host_stick",
          state: {
            x: hostX,
            y: hostY,
            scale: 1.30,
            timeSec: sceneTime,
            spineLean: hostLean,
            pointTarget: { x: 1260, y: 520 },
            expression: hostExpr,
          },
        },
        {
          id: "pharma_doctor",
          state: {
            x: 1260,
            y: 640,
            scale: 1.30,
            gender: "doctor",
            hairStyle: "doctor_cap",
            clothes: "doctor_scrubs",
            expression: "smug_rock_eyebrow",
            rightHandProp: "syringe",
            timeSec: sceneTime,
          },
        }
      );
      overlays += renderActionLines({ x: 1260, y: 480 }, 240, sceneTime);
    }

    // =========================================================================
    // SUB-SCENE 3: DIAL-UP STOMACH (18.48s - 23.74s)
    // =========================================================================
    else if (isSub3) {
      camera.setTarget(960, 520, 1.08);
      hostX = 400;
      hostLean = -16;
      hostExpr = "cringe_teeth_grit";

      const dialupKb = ((sceneTime - 18.48) * 0.08).toFixed(2);
      bg = `
        <!-- X-Ray Digestive Radiology Lab -->
        <rect x="-4000" y="-4000" width="10000" height="10000" fill="#020617"/>
        <rect x="150" y="80" width="1620" height="720" rx="14" fill="#0f172a" stroke="#38bdf8" stroke-width="8"/>
        
        <!-- Dial-Up Gastric Emptying Progress Bar -->
        <g transform="translate(1260, 180)">
          <rect x="-260" y="-30" width="520" height="60" rx="10" fill="#0f172a" stroke="#f59e0b" stroke-width="4"/>
          <rect x="-240" y="-10" width="${Math.min(480, (sceneTime - 18.48) * 90)}" height="20" rx="4" fill="#f59e0b"/>
          <text x="0" y="22" font-family="'Courier New', monospace" font-size="14" font-weight="bold" fill="#fef08a" text-anchor="middle">
            GASTRIC SPEED: 56k DIAL-UP [${dialupKb} KB/s]
          </text>
        </g>

        <!-- Lab Floor -->
        <rect x="-4000" y="800" width="10000" height="4000" fill="#020617"/>
        <line x1="-4000" y1="800" x2="6000" y2="800" stroke="#38bdf8" stroke-width="8"/>
      `;

      bg += renderChainedStomachPadlock(1260, 480, sceneTime);

      stickFiguresList.push(
        {
          id: "host_stick",
          state: {
            x: hostX,
            y: hostY,
            scale: 1.30,
            timeSec: sceneTime,
            spineLean: hostLean,
            pointTarget: { x: 1260, y: 480 },
            expression: hostExpr,
          },
        }
      );
      overlays += renderHandDrawnArrow({ x: 650, y: 520 }, { x: 1060, y: 480 }, sceneTime, "0 MOTILITY");
    }

    // =========================================================================
    // SUB-SCENE 4: HALF-SALTINE CRACKER FAINT (23.74s - 26.99s)
    // =========================================================================
    else if (isSub4) {
      camera.setTarget(960, 520, 1.08);
      hostX = 400;
      hostLean = 10;
      hostExpr = "confused_squint";

      bg = `
        <!-- Grand Luxury Banquet Room -->
        <rect x="-4000" y="-4000" width="10000" height="10000" fill="#450a0a"/>
        <rect x="150" y="80" width="1620" height="720" rx="14" fill="#7f1d1d" stroke="#ca8a04" stroke-width="8"/>
        
        <!-- Floor -->
        <rect x="-4000" y="800" width="10000" height="4000" fill="#1c1917"/>
        <line x1="-4000" y1="800" x2="6000" y2="800" stroke="#ca8a04" stroke-width="8"/>
      `;

      bg += renderSaltineCrackerPlatter(1260, 480, sceneTime);

      stickFiguresList.push(
        {
          id: "host_stick",
          state: {
            x: hostX,
            y: hostY,
            scale: 1.30,
            timeSec: sceneTime,
            spineLean: hostLean,
            pointTarget: { x: 1260, y: 480 },
            expression: hostExpr,
          },
        }
      );
      overlays += renderHandDrawnCircle({ x: 1260, y: 480 }, 160, 120, sceneTime, "ENTIRE MEAL");
    }

    // =========================================================================
    // SUB-SCENE 5: SPLIT-SCREEN GYM HELL VS 1-SECOND SHOT (26.99s - 40.51s)
    // =========================================================================
    else if (isSub5) {
      if (sceneTime < 33.5) {
        camera.cutTo(540, 500, 1.25);
      } else {
        camera.cutTo(1380, 500, 1.25);
      }

      bg = `
        <!-- Split Screen Environment -->
        <rect x="-4000" y="-4000" width="10000" height="10000" fill="#0f172a"/>
        
        <!-- LEFT PANEL: Hardcore Gym Hell -->
        <rect x="150" y="80" width="780" height="720" rx="12" fill="#7f1d1d" stroke="#ef4444" stroke-width="6"/>
        <text x="540" y="150" font-family="'Impact', sans-serif" font-size="28" fill="#fca5a5" text-anchor="middle">
          2 HRS TREADMILL + KALE
        </text>

        <!-- RIGHT PANEL: 1-Second Shot Luxury Spa -->
        <rect x="990" y="80" width="780" height="720" rx="12" fill="#064e3b" stroke="#34d399" stroke-width="6"/>
        <text x="1380" y="150" font-family="'Impact', sans-serif" font-size="28" fill="#6ee7b7" text-anchor="middle">
          1-SECOND WEEKLY SHOT
        </text>
      `;

      stickFiguresList.push(
        {
          id: "gym_sufferer",
          state: {
            x: 540,
            y: 650,
            scale: 1.22,
            gender: "male",
            hairStyle: "male_short",
            clothes: "hoodie",
            expression: "exhausted_melting",
            isWalking: true,
            timeSec: sceneTime,
          },
        },
        {
          id: "spa_chiller",
          state: {
            x: 1380,
            y: 650,
            scale: 1.25,
            gender: "female",
            hairStyle: "female_blonde",
            clothes: "bathrobe",
            expression: "blissful_serenity",
            timeSec: sceneTime,
          },
        }
      );
    }

    // =========================================================================
    // SUB-SCENE 6: RED CARPET GALA: OXYGEN & ATTENTION (40.51s - 46.33s)
    // =========================================================================
    else if (isSub6) {
      camera.cutTo(1260, 520, 1.25);
      hostX = 380;
      hostLean = 10;
      hostExpr = "skeptical_side_eye";

      bg = `
        <!-- Hollywood Gala Red Carpet Stage -->
        <rect x="-4000" y="-4000" width="10000" height="10000" fill="#18181b"/>
        <rect x="150" y="80" width="1620" height="720" rx="14" fill="#27272a" stroke="#eab308" stroke-width="8"/>
        
        <!-- Floor -->
        <rect x="-4000" y="800" width="10000" height="4000" fill="#991b1b"/>
        <line x1="-4000" y1="800" x2="6000" y2="800" stroke="#ca8a04" stroke-width="8"/>
      `;

      stickFiguresList.push(
        {
          id: "host_stick",
          state: {
            x: hostX,
            y: hostY,
            scale: 1.30,
            timeSec: sceneTime,
            spineLean: hostLean,
            pointTarget: { x: 1260, y: 520 },
            expression: hostExpr,
          },
        },
        {
          id: "oxygen_diet_female",
          state: {
            x: 1260,
            y: 640,
            scale: 1.28,
            gender: "female",
            hairStyle: "female_long",
            clothes: "dress_pink",
            expression: "smug_chef_kiss",
            pose: "waving",
            timeSec: sceneTime,
          },
        }
      );
      overlays += renderActionLines({ x: 1260, y: 480 }, 220, sceneTime);
    }

    // =========================================================================
    // SUB-SCENE 7: CUTAWAY: 3 AM TEXTING EX (46.33s - 51.88s)
    // =========================================================================
    else if (isSub7) {
      camera.cutTo(1320, 460, 1.30);
      hostX = 380;
      hostLean = -14;
      hostExpr = "fear_screaming";

      bg = `
        <!-- Dark Messy Bedroom at 3:00 AM -->
        <rect x="-4000" y="-4000" width="10000" height="10000" fill="#020617"/>
        <rect x="150" y="80" width="1620" height="720" rx="14" fill="#0f172a" stroke="#1e293b" stroke-width="8"/>
        
        <!-- Huge Glowing iPhone: Texting Your Ex -->
        <g transform="translate(1320, 460)" filter="url(#cardShadow)">
          <rect x="-100" y="-170" width="200" height="340" rx="26" fill="#18181b" stroke="#38bdf8" stroke-width="6"/>
          <!-- Text Bubble -->
          <rect x="-80" y="-120" width="160" height="90" rx="12" fill="#22c55e"/>
          <text x="-70" y="-90" font-family="sans-serif" font-size="14" font-weight="bold" fill="#ffffff">
            Hey... u awake?
          </text>
          <text x="-70" y="-60" font-family="sans-serif" font-size="14" font-weight="bold" fill="#ffffff">
            I miss us 😭💔
          </text>
        </g>

        <!-- Floor -->
        <rect x="-4000" y="800" width="10000" height="4000" fill="#020617"/>
        <line x1="-4000" y1="800" x2="6000" y2="800" stroke="#1e293b" stroke-width="8"/>
      `;

      stickFiguresList.push(
        {
          id: "host_stick",
          state: {
            x: hostX,
            y: hostY,
            scale: 1.30,
            timeSec: sceneTime,
            spineLean: hostLean,
            pointTarget: { x: 1320, y: 460 },
            expression: hostExpr,
          },
        },
        {
          id: "bed_texter",
          state: {
            x: 1050,
            y: 640,
            scale: 1.25,
            gender: "male",
            hairStyle: "male_short",
            clothes: "hoodie",
            expression: "fear_panic_run",
            timeSec: sceneTime,
          },
        }
      );
      overlays += renderHandDrawnCircle({ x: 1320, y: 460 }, 140, 200, sceneTime, "DO NOT SEND");
    }

    // =========================================================================
    // SUB-SCENE 8: PARISIAN BAKERY & FRENCH BAGUETTE (51.88s - 54.82s)
    // =========================================================================
    else {
      camera.setTarget(960, 520, 1.08);
      hostX = 400;
      hostLean = 0;
      hostExpr = "smug_finger_guns";

      bg = `
        <!-- Charming Parisian French Bakery -->
        <rect x="-4000" y="-4000" width="10000" height="10000" fill="#fef3c7"/>
        <rect x="150" y="80" width="1620" height="720" rx="14" fill="#fffbeb" stroke="#d97706" stroke-width="8"/>
        
        <!-- Red & White Striped Awning -->
        <g transform="translate(1260, 140)">
          ${[-300, -240, -180, -120, -60, 0, 60, 120, 180, 240, 300].map((ax, idx) => `
            <rect x="${ax}" y="-40" width="60" height="80" fill="${idx % 2 === 0 ? "#dc2626" : "#ffffff"}" stroke="#991b1b" stroke-width="3"/>
          `).join("")}
        </g>

        <!-- Floor -->
        <rect x="-4000" y="800" width="10000" height="4000" fill="#78716c"/>
        <line x1="-4000" y1="800" x2="6000" y2="800" stroke="#d97706" stroke-width="8"/>
      `;

      bg += renderSeductiveBaguette(1260, 480, sceneTime);

      stickFiguresList.push(
        {
          id: "host_stick",
          state: {
            x: hostX,
            y: hostY,
            scale: 1.30,
            timeSec: sceneTime,
            spineLean: hostLean,
            pointTarget: { x: 1260, y: 480 },
            expression: hostExpr,
          },
        }
      );
      overlays += renderActionLines({ x: 1260, y: 480 }, 240, sceneTime);
    }

    return {
      backgroundSvg: bg + overlays,
      stickFigures: stickFiguresList,
      shake: 0,
    };
  },
};

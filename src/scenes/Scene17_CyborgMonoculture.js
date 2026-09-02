import { renderHandDrawnArrow, renderHandDrawnCircle, renderActionLines } from "../anim/ComicMarkups";
export const Scene17_CyborgMonoculture = {
    id: "scene_17_cyborg_monoculture",
    name: "Cyborg RPG Creator, Carbs 2008 & Frozen Forehead",
    startTime: 474.340,
    endTime: 540.354,
    render(ctx) {
        const { sceneTime, camera } = ctx;
        // EXACT WORD-LEVEL TIMESTAMPS FROM 0-chapter-1.srt:
        // Cue 170-174 (474.340s - 486.753s / t=0.0s - 12.413s): "engineered in a character creation screen before an RPG"
        // Cue 175-176 (486.753s - 491.716s / t=12.413s - 17.376s): "they look like they run on a lithium-ion battery"
        // Cue 177-185 (491.716s - 517.652s / t=17.376s - 43.312s): "gaunt cyborg who hasn't encountered a carbohydrate since Obama"
        // Cue 186-188 (517.652s - 540.354s / t=43.312s - 66.014s): "forehead frozen in concrete, cheeks carved out"
        const isSub1 = sceneTime < 6.000;
        const isSub2 = sceneTime >= 6.000 && sceneTime < 12.413;
        const isSub3 = sceneTime >= 12.413 && sceneTime < 17.376;
        const isSub4 = sceneTime >= 17.376 && sceneTime < 24.000;
        const isSub5 = sceneTime >= 24.000 && sceneTime < 32.000;
        const isSub6 = sceneTime >= 32.000 && sceneTime < 43.312;
        const isSub7 = sceneTime >= 43.312 && sceneTime < 50.000;
        const isSub8 = sceneTime >= 50.000 && sceneTime < 57.000;
        const isSub9 = sceneTime >= 57.000;
        let hostX = 420;
        let hostY = 650;
        let hostLean = 8;
        let isWalking = false;
        let hostExpr = "deadpan_classic";
        let pointTarget = { x: 1260, y: 480 };
        let overlays = "";
        let shakeAmt = 0;
        // DYNAMIC ALEX MEYERS CAMERA CHOREOGRAPHY:
        if (isSub1) {
            // RPG Character Creator Sliders Punch Zoom
            camera.cutTo(1260, 460, 1.25);
            const walkProg = Math.min(1, sceneTime / 1.5);
            hostX = 260 + walkProg * 160;
            isWalking = walkProg < 1;
            hostLean = 8;
            pointTarget = { x: 1260, y: 460 };
            hostExpr = "deadpan_classic";
        }
        else if (isSub2) {
            // Lithium Battery Pack Punch Zoom
            camera.cutTo(1260, 480, 1.30);
            hostX = 420;
            hostLean = -10;
            pointTarget = { x: 1260, y: 480 };
            hostExpr = "shock_eye_pop";
        }
        else if (isSub3 || isSub4) {
            // Vintage CARBS 2008 Museum Display
            camera.cutTo(1260, 480, 1.25);
            hostX = 440;
            hostLean = 8;
            pointTarget = { x: 1260, y: 480 };
            hostExpr = "confused_squint";
        }
        else if (isSub5 || isSub6) {
            // Botox Drained Matter
            camera.cutTo(1260, 480, 1.25);
            hostX = 440;
            hostLean = -12;
            pointTarget = { x: 1260, y: 480 };
            hostExpr = "cringe_teeth_grit";
        }
        else if (isSub7 || isSub8) {
            // Frozen Concrete Forehead & Waterfall Tears Punch Zoom
            camera.cutTo(1260, 500, 1.30);
            hostX = 420;
            hostLean = 14;
            pointTarget = { x: 1260, y: 500 };
            hostExpr = "smug_rock_eyebrow";
        }
        else {
            // Host Deadpan Finger Guns Close-Up
            camera.cutTo(440, 540, 1.35);
            hostX = 440;
            hostLean = 0;
            hostExpr = "smug_finger_guns";
            pointTarget = { x: 1260, y: 480 };
        }
        let stickFiguresList = [];
        let bg = `
      <!-- Cybernetic Cloning Facility Backdrop -->
      <rect x="-4000" y="-4000" width="10000" height="10000" fill="#030712"/>
      
      <!-- Titanium Cleanroom Wall Grid -->
      <rect x="150" y="80" width="1620" height="720" rx="14" fill="#0f172a" stroke="#06b6d4" stroke-width="6"/>
      <line x1="150" y1="360" x2="1770" y2="360" stroke="#1e293b" stroke-width="4"/>
      <line x1="150" y1="580" x2="1770" y2="580" stroke="#1e293b" stroke-width="4"/>

      <!-- Cybernetic Glowing Floor -->
      <rect x="-4000" y="800" width="10000" height="4000" fill="#020617"/>
      <line x1="-4000" y1="800" x2="6000" y2="800" stroke="#06b6d4" stroke-width="8" filter="url(#glow)"/>
    `;
        if (isSub1) {
            stickFiguresList.push({
                id: "host_stick",
                state: {
                    x: hostX,
                    y: hostY,
                    scale: 1.30,
                    timeSec: sceneTime,
                    spineLean: hostLean,
                    pointTarget: { x: 1260, y: 500 },
                    expression: hostExpr,
                },
            }, {
                id: "cyborg_model",
                state: {
                    x: 1260,
                    y: 640,
                    scale: 1.28,
                    gender: "female",
                    hairStyle: "female_bob",
                    clothes: "crop_top_leggings",
                    expression: "deadpan_soul_stare",
                    timeSec: sceneTime,
                },
            });
            overlays += renderHandDrawnCircle({ x: 1260, y: 480 }, 220, 140, sceneTime, "RPG CREATOR");
        }
        else if (isSub2) {
            stickFiguresList.push({
                id: "host_stick",
                state: {
                    x: hostX,
                    y: hostY,
                    scale: 1.30,
                    timeSec: sceneTime,
                    spineLean: hostLean,
                    pointTarget: { x: 1260, y: 500 },
                    expression: hostExpr,
                },
            }, {
                id: "battery_cyborg",
                state: {
                    x: 1260,
                    y: 640,
                    scale: 1.28,
                    gender: "tech_bro",
                    hairStyle: "male_short",
                    clothes: "suit",
                    expression: "rage_laser_eyes",
                    timeSec: sceneTime,
                },
            });
            overlays += renderActionLines({ x: 1260, y: 480 }, 220, sceneTime);
        }
        else if (isSub3 || isSub4) {
            bg += `
        <!-- Museum Glass Display with 2008 Carbohydrate Croissant -->
        <g transform="translate(1260, 560)" filter="url(#cardShadow)">
          <rect x="-100" y="20" width="200" height="40" fill="#475569" stroke="#1e293b" stroke-width="4"/>
          <ellipse cx="0" cy="-20" rx="60" ry="30" fill="#fde047" stroke="#ca8a04" stroke-width="5" filter="url(#glow)"/>
          <text x="0" y="45" font-family="'Impact', sans-serif" font-size="18" fill="#facc15" text-anchor="middle">CARBS 2008</text>
        </g>
      `;
            stickFiguresList.push({
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
            }, {
                id: "worshipping_female",
                state: {
                    x: 1040,
                    y: 650,
                    scale: 1.25,
                    gender: "female",
                    hairStyle: "female_ponytail",
                    clothes: "dress_pink",
                    expression: "shock_eye_pop",
                    leftArmAngle1: 150,
                    leftArmAngle2: -70,
                    spineLean: 18,
                    timeSec: sceneTime,
                },
            });
            overlays += renderHandDrawnArrow({ x: 740, y: 520 }, { x: 1100, y: 480 }, sceneTime, "ERA OF CARBS");
        }
        else {
            stickFiguresList.push({
                id: "host_stick",
                state: {
                    x: hostX,
                    y: hostY,
                    scale: 1.30,
                    timeSec: sceneTime,
                    spineLean: hostLean,
                    expression: hostExpr,
                },
            }, {
                id: "frozen_forehead_female",
                state: {
                    x: 1260,
                    y: 640,
                    scale: 1.28,
                    gender: "female",
                    hairStyle: "female_blonde",
                    clothes: "dress_pink",
                    expression: "crying_waterfalls",
                    timeSec: sceneTime,
                },
            });
            overlays += renderActionLines({ x: 1260, y: 480 }, 240, sceneTime);
        }
        return {
            backgroundSvg: bg + overlays,
            stickFigures: stickFiguresList,
            shake: 0,
        };
    },
};

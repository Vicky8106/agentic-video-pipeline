import { renderHandDrawnArrow, renderHandDrawnCircle, renderActionLines } from "../anim/ComicMarkups";
export const Scene16_TikTokTribunal = {
    id: "scene_16_tiktok_tribunal",
    name: "TikTok Tribunal, Wednesday Dance & Zapruder 8mm",
    startTime: 408.630,
    endTime: 474.340,
    render(ctx) {
        const { sceneTime, camera } = ctx;
        // EXACT WORD-LEVEL TIMESTAMPS FROM 0-chapter-1.srt:
        // Cue 149-158 (408.630s - 431.934s / t=0.0s - 23.304s): "Jenna Ortega... star of Wednesday, gaunt is in the contract"
        // Cue 159-164 (431.934s - 456.483s / t=23.304s - 47.853s): "TikTok users stitch side-by-side photos and analyze jawlines like Zapruder film"
        // Cue 165-169 (456.483s - 474.340s / t=47.853s - 65.710s): "size four used to be normal; now size four is considered curvy in LA"
        const isSub1 = sceneTime < 6.000;
        const isSub2 = sceneTime >= 6.000 && sceneTime < 12.000;
        const isSub3 = sceneTime >= 12.000 && sceneTime < 18.000;
        const isSub4 = sceneTime >= 18.000 && sceneTime < 23.304;
        const isSub5 = sceneTime >= 23.304 && sceneTime < 35.000;
        const isSub6 = sceneTime >= 35.000 && sceneTime < 47.853;
        const isSub7 = sceneTime >= 47.853 && sceneTime < 54.000;
        const isSub8 = sceneTime >= 54.000 && sceneTime < 60.000;
        const isSub9 = sceneTime >= 60.000;
        let hostX = 420;
        let hostY = 650;
        let hostLean = 8;
        let isWalking = false;
        let rightHandProp = "none";
        let hostExpr = "deadpan_classic";
        let pointTarget = { x: 1260, y: 480 };
        let overlays = "";
        let shakeAmt = 0;
        // DYNAMIC ALEX MEYERS CAMERA CHOREOGRAPHY:
        if (isSub1 || isSub2) {
            // Punch zoom on Jenna Ortega
            camera.cutTo(1260, 480, 1.25);
            hostX = 420;
            hostLean = 8;
            pointTarget = { x: 1260, y: 480 };
            hostExpr = "confused_squint";
        }
        else if (isSub3) {
            // Wednesday Dance & Thing
            camera.cutTo(1260, 520, 1.25);
            hostX = 440;
            hostLean = -10;
            pointTarget = { x: 1260, y: 480 };
            hostExpr = "smug_rock_eyebrow";
        }
        else if (isSub4) {
            // TikTok Tribunal Courtroom Wide
            camera.cutTo(960, 540, 1.05);
            hostX = 420;
            hostLean = -14;
            pointTarget = { x: 1260, y: 480 };
            hostExpr = "shock_eye_pop";
        }
        else if (isSub5) {
            // 1963 Zapruder 8mm Projector Punch Zoom
            camera.cutTo(1260, 480, 1.30);
            hostX = 440;
            hostLean = -8;
            pointTarget = { x: 1260, y: 480 };
            hostExpr = "shock_eye_pop";
        }
        else if (isSub6) {
            // Forensic Cheek Split Screen
            camera.cutTo(1260, 480, 1.25);
            hostX = 440;
            hostLean = 10;
            rightHandProp = "pointer";
            pointTarget = { x: 1260, y: 480 };
            hostExpr = "skeptical_raised_brow";
        }
        else if (isSub7 || isSub8) {
            // Size 4 Mannequin
            camera.cutTo(1260, 500, 1.25);
            hostX = 440;
            hostLean = 12;
            pointTarget = { x: 1260, y: 480 };
            hostExpr = "confused_squint";
        }
        else if (isSub9) {
            // Climax Red GUILTY Stamp Slam
            camera.cutTo(1260, 480, 1.35);
            hostX = 420;
            hostLean = -16;
            pointTarget = { x: 1260, y: 480 };
            hostExpr = "cringe_teeth_grit";
        }
        let stickFiguresList = [];
        let bg = `
      <!-- TikTok Forensic Courtroom Backdrop -->
      <rect x="-4000" y="-4000" width="10000" height="10000" fill="#2e1065"/>
      
      <!-- Mahogany Judicial Wood Wall Panels -->
      <rect x="150" y="80" width="1620" height="720" rx="14" fill="#451a03" stroke="#78350f" stroke-width="8"/>
      <!-- Classical Courtroom Pillars -->
      <rect x="220" y="80" width="80" height="720" fill="#78350f"/>
      <rect x="1620" y="80" width="80" height="720" fill="#78350f"/>

      <!-- Glowing Neon TikTok Scale of Justice -->
      <g transform="translate(960, 160)">
        <circle cx="0" cy="0" r="50" fill="#0f172a" stroke="#ec4899" stroke-width="5" filter="url(#glow)"/>
        <text x="0" y="15" font-family="'Impact', sans-serif" font-size="34" fill="#f472b6" text-anchor="middle">⚖️</text>
      </g>

      <!-- Judicial Courtroom Hardwood Floor -->
      <rect x="-4000" y="800" width="10000" height="4000" fill="#1c1917"/>
      <line x1="-4000" y1="800" x2="6000" y2="800" stroke="#a855f7" stroke-width="8"/>
    `;
        if (isSub1 || isSub2) {
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
                id: "jenna_ortega_figure",
                state: {
                    x: 1260,
                    y: 640,
                    scale: 1.28,
                    gender: "female",
                    hairStyle: "female_bob",
                    clothes: "dress_black",
                    expression: "deadpan_soul_stare",
                    timeSec: sceneTime,
                },
            });
            overlays += renderHandDrawnCircle({ x: 1260, y: 480 }, 180, 120, sceneTime, "SCRUTINY");
        }
        else if (isSub3) {
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
                id: "wednesday_dancer",
                state: {
                    x: 1260,
                    y: 640,
                    scale: 1.28,
                    gender: "female",
                    hairStyle: "female_bob",
                    clothes: "dress_black",
                    expression: "smug_rock_eyebrow",
                    leftArmAngle1: 200,
                    leftArmAngle2: -90,
                    rightArmAngle1: -20,
                    rightArmAngle2: 90,
                    timeSec: sceneTime,
                },
            });
            overlays += renderActionLines({ x: 1260, y: 480 }, 220, sceneTime);
        }
        else if (isSub4) {
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
                id: "judge_stickman",
                state: {
                    x: 1260,
                    y: 640,
                    scale: 1.30,
                    gender: "male",
                    hairStyle: "male_short",
                    clothes: "suit",
                    expression: "rage_furious_screaming",
                    rightArmAngle1: -60,
                    rightArmAngle2: 60,
                    rightHandProp: "stamp",
                    timeSec: sceneTime,
                },
            });
            overlays += renderHandDrawnCircle({ x: 1260, y: 480 }, 180, 110, sceneTime, "DIGITAL COURT");
        }
        else if (isSub5 || isSub6) {
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
                id: "forensic_detective",
                state: {
                    x: 1100,
                    y: 640,
                    scale: 1.28,
                    gender: "male",
                    hairStyle: "male_short",
                    clothes: "hoodie",
                    expression: "confused_squint",
                    rightHandProp: "pointer",
                    pointTarget: { x: 1400, y: 480 },
                    timeSec: sceneTime,
                },
            }, {
                id: "suspect_female",
                state: {
                    x: 1450,
                    y: 640,
                    scale: 1.25,
                    gender: "female",
                    hairStyle: "female_long",
                    clothes: "dress_pink",
                    expression: "cringe_teeth_grit",
                    timeSec: sceneTime,
                },
            });
            overlays += renderHandDrawnArrow({ x: 740, y: 520 }, { x: 1080, y: 480 }, sceneTime, "FRAME BY FRAME");
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
                id: "size4_female",
                state: {
                    x: 1260,
                    y: 640,
                    scale: 1.28,
                    gender: "female",
                    hairStyle: "female_ponytail",
                    clothes: "crop_top_leggings",
                    expression: "confused_shrug_what",
                    pose: "shrug",
                    timeSec: sceneTime,
                },
            });
            overlays += renderActionLines({ x: 1260, y: 480 }, 260, sceneTime);
        }
        return {
            backgroundSvg: bg + overlays,
            stickFigures: stickFiguresList,
            shake: 0,
        };
    },
};

import { renderHandDrawnCircle, renderActionLines } from "../anim/ComicMarkups";
export const Scene14_MCUSuperhero = {
    id: "scene_14_mcu_superhero",
    name: "MCU Superhero Dehydration, Shrink-Wrapped Ham & Boiled Chicken",
    startTime: 308.200,
    endTime: 349.460,
    render(ctx) {
        const { sceneTime, camera } = ctx;
        // EXACT WORD-LEVEL TIMESTAMPS FROM 0-chapter-1.srt:
        // Cue 108-112 (308.200s - 314.661s / t=0.0s - 6.461s): "actresses dangerously thin, actors dangerously shredded for MCU"
        // Cue 113-116 (314.661s - 324.519s / t=6.461s - 16.319s): "dehydrating for three days... shrink wrap on a leftover ham"
        // Cue 117-120 (324.519s - 334.279s / t=16.319s - 26.079s): "unseasoned chicken breast, steamed broccoli, two-a-day workouts"
        // Cue 121-124 (334.279s - 349.460s / t=26.079s - 41.260s): "TRT, steroids, HGH branded as discipline and waking up at 4 AM"
        const isSub1 = sceneTime < 6.461;
        const isSub2 = sceneTime >= 6.461 && sceneTime < 16.319;
        const isSub3 = sceneTime >= 16.319 && sceneTime < 26.079;
        const isSub4 = sceneTime >= 26.079;
        let hostX = 420;
        let hostY = 650;
        let hostLean = 8;
        let isWalking = false;
        let hostExpr = "deadpan_classic";
        let pointTarget = { x: 1260, y: 480 };
        let overlays = "";
        let bg = "";
        let stickFiguresList = [];
        // =========================================================================
        // SUB-SCENE 1: SPLIT SCREEN: HIGH FASHION VS MCU POSTER (0.0s - 6.46s)
        // =========================================================================
        if (isSub1) {
            camera.cutTo(960, 540, 1.05);
            bg = `
        <!-- Split-Screen Background -->
        <rect x="-4000" y="-4000" width="10000" height="10000" fill="#0f172a"/>
        
        <!-- LEFT: Actresses Runway -->
        <rect x="150" y="80" width="780" height="720" rx="12" fill="#831843" stroke="#f472b6" stroke-width="6"/>
        <text x="540" y="150" font-family="'Impact', sans-serif" font-size="28" fill="#fbcfe8" text-anchor="middle">
          ACTRESSES: DANGEROUSLY THIN
        </text>

        <!-- RIGHT: Actors MCU Superhero Poster -->
        <rect x="990" y="80" width="780" height="720" rx="12" fill="#1e3a8a" stroke="#60a5fa" stroke-width="6"/>
        <text x="1380" y="150" font-family="'Impact', sans-serif" font-size="28" fill="#93c5fd" text-anchor="middle">
          ACTORS: MCU SHREDDED
        </text>
        
        <!-- Floor -->
        <rect x="-4000" y="800" width="10000" height="4000" fill="#020617"/>
        <line x1="-4000" y1="800" x2="6000" y2="800" stroke="#f472b6" stroke-width="8"/>
      `;
            stickFiguresList.push({
                id: "actress_female",
                state: {
                    x: 540,
                    y: 650,
                    scale: 1.22,
                    gender: "female",
                    hairStyle: "female_blonde",
                    clothes: "dress_pink",
                    expression: "smug_finger_guns",
                    timeSec: sceneTime,
                },
            }, {
                id: "superhero_bodybuilder",
                state: {
                    x: 1380,
                    y: 650,
                    scale: 1.28,
                    gender: "bodybuilder",
                    hairStyle: "bodybuilder_bald",
                    clothes: "bodybuilder_tank",
                    expression: "rage_clenched_fists",
                    timeSec: sceneTime,
                },
            });
        }
        // =========================================================================
        // SUB-SCENE 2: IRON DUNGEON BODYBUILDING GYM (6.46s - 16.32s)
        // =========================================================================
        else if (isSub2) {
            camera.cutTo(1260, 500, 1.25);
            hostX = 380;
            hostLean = -14;
            hostExpr = "shock_eye_pop";
            bg = `
        <!-- Hardcore Industrial Bodybuilding Gym -->
        <rect x="-4000" y="-4000" width="10000" height="10000" fill="#1c1917"/>
        <rect x="150" y="80" width="1620" height="720" rx="14" fill="#7f1d1d" stroke="#450a0a" stroke-width="8"/>
        
        <!-- Barbell Weights on Floor -->
        <g transform="translate(1260, 520)">
          <line x1="-120" y1="0" x2="120" y2="0" stroke="#94a3b8" stroke-width="10" stroke-linecap="round"/>
          <circle cx="-100" cy="0" r="45" fill="#111" stroke="#334155" stroke-width="4"/>
          <circle cx="100" cy="0" r="45" fill="#111" stroke="#334155" stroke-width="4"/>
          <text x="-100" y="6" font-family="'Impact', sans-serif" font-size="16" fill="#fff" text-anchor="middle">45</text>
          <text x="100" y="6" font-family="'Impact', sans-serif" font-size="16" fill="#fff" text-anchor="middle">45</text>
        </g>

        <!-- Gym Mat Floor -->
        <rect x="-4000" y="800" width="10000" height="4000" fill="#0c0a09"/>
        <line x1="-4000" y1="800" x2="6000" y2="800" stroke="#f59e0b" stroke-width="8"/>
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
                id: "gym_bodybuilder",
                state: {
                    x: 1260,
                    y: 640,
                    scale: 1.32,
                    gender: "bodybuilder",
                    hairStyle: "bodybuilder_bald",
                    clothes: "bodybuilder_tank",
                    expression: "rage_furious_screaming",
                    pose: "mind_blown",
                    timeSec: sceneTime,
                },
            });
            overlays += renderActionLines({ x: 1260, y: 480 }, 240, sceneTime);
        }
        // =========================================================================
        // SUB-SCENE 3: BOILED CHICKEN MEAL PREP DEPRESSION (16.32s - 26.08s)
        // =========================================================================
        else if (isSub3) {
            camera.cutTo(1260, 520, 1.25);
            hostX = 380;
            hostLean = -12;
            hostExpr = "disgust_shudder";
            bg = `
        <!-- Industrial Depressing Meal Prep Kitchen -->
        <rect x="-4000" y="-4000" width="10000" height="10000" fill="#0f172a"/>
        <rect x="150" y="80" width="1620" height="720" rx="14" fill="#334155" stroke="#64748b" stroke-width="8"/>
        
        <!-- Stacks of Grey Tupperware Meal Prep Containers -->
        ${[850, 950, 1550, 1650].map(tx => `
          ${[300, 380, 460, 540].map(ty => `
            <rect x="${tx - 40}" y="${ty}" width="80" height="40" rx="6" fill="#475569" stroke="#94a3b8" stroke-width="3"/>
            <rect x="${tx - 30}" y="${ty + 8}" width="30" height="24" rx="4" fill="#cbd5e1"/>
            <circle cx="${tx + 18}" cy="${ty + 20}" r="10" fill="#15803d"/>
          `).join("")}
        `).join("")}

        <!-- Kitchen Floor -->
        <rect x="-4000" y="800" width="10000" height="4000" fill="#1e293b"/>
        <line x1="-4000" y1="800" x2="6000" y2="800" stroke="#64748b" stroke-width="8"/>
      `;
            stickFiguresList.push({
                id: "host_stick",
                state: {
                    x: hostX,
                    y: hostY,
                    scale: 1.30,
                    timeSec: sceneTime,
                    spineLean: hostLean,
                    pointTarget: { x: 1260, y: 550 },
                    expression: hostExpr,
                },
            }, {
                id: "crying_mealprepper",
                state: {
                    x: 1260,
                    y: 640,
                    scale: 1.25,
                    gender: "male",
                    hairStyle: "male_short",
                    clothes: "hoodie",
                    expression: "crying_waterfalls",
                    leftArmAngle1: 140,
                    leftArmAngle2: -70,
                    spineLean: 14,
                    timeSec: sceneTime,
                },
            });
            overlays += renderHandDrawnCircle({ x: 1260, y: 520 }, 180, 100, sceneTime, "0 SEASONING");
        }
        // =========================================================================
        // SUB-SCENE 4: 4 AM TRT LOCKER ROOM & STEROIDS (26.08s - 41.26s)
        // =========================================================================
        else {
            camera.cutTo(1260, 500, 1.25);
            hostX = 380;
            hostLean = 0;
            hostExpr = "smug_rock_eyebrow";
            bg = `
        <!-- Secret TRT Locker Room -->
        <rect x="-4000" y="-4000" width="10000" height="10000" fill="#1e1b4b"/>
        <rect x="150" y="80" width="1620" height="720" rx="14" fill="#312e81" stroke="#818cf8" stroke-width="8"/>
        
        <!-- 4:00 AM Digital Clock on Wall -->
        <g transform="translate(1260, 200)" filter="url(#glow)">
          <rect x="-120" y="-40" width="240" height="80" rx="10" fill="#0f172a" stroke="#ef4444" stroke-width="4"/>
          <text x="0" y="16" font-family="'Courier New', monospace" font-size="38" font-weight="bold" fill="#ef4444" text-anchor="middle">
            04:00 AM
          </text>
        </g>

        <!-- Floor -->
        <rect x="-4000" y="800" width="10000" height="4000" fill="#0f172a"/>
        <line x1="-4000" y1="800" x2="6000" y2="800" stroke="#818cf8" stroke-width="8"/>
      `;
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
                id: "trt_bodybuilder",
                state: {
                    x: 1260,
                    y: 640,
                    scale: 1.32,
                    gender: "bodybuilder",
                    hairStyle: "bodybuilder_bald",
                    clothes: "bodybuilder_tank",
                    expression: "smug_rock_eyebrow",
                    rightHandProp: "syringe",
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

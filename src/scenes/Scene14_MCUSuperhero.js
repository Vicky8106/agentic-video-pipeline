import { renderUnseasonedChickenBroccoli, renderAlarmClockTRT, renderShrinkWrappedHam, } from "../character/CartoonCastSubScenes";
import { renderHandDrawnCircle, renderActionLines } from "../anim/ComicMarkups";
export const Scene14_MCUSuperhero = {
    id: "scene_14_mcu_superhero",
    name: "MCU Superhero Dehydration, Shrink-Wrapped Ham & Boiled Chicken",
    startTime: 308.200,
    endTime: 349.460,
    render(ctx) {
        const { sceneTime, camera } = ctx;
        const isSub1 = sceneTime < 6.461;
        const isSub2 = sceneTime >= 6.461 && sceneTime < 16.319;
        const isSub3 = sceneTime >= 16.319 && sceneTime < 26.079;
        const isSub4 = sceneTime >= 26.079;
        let overlays = "";
        let bg = "";
        let stickFiguresList = [];
        // =========================================================================
        // SUB-SCENE 1: HIGH FASHION VS MCU POSTER (0.0s - 6.46s)
        // =========================================================================
        if (isSub1) {
            camera.setTarget(960, 520, 1.05);
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
                    scale: 1.25,
                    gender: "female",
                    hairStyle: "female_blonde_curls",
                    clothes: "dress_pink",
                    expression: "smug_chef_kiss",
                    timeSec: sceneTime,
                },
            }, {
                id: "superhero_bodybuilder",
                state: {
                    x: 1380,
                    y: 650,
                    scale: 1.30,
                    gender: "bodybuilder",
                    hairStyle: "male_bodybuilder_bald",
                    clothes: "bodybuilder_tank",
                    expression: "rage_clenched_fists",
                    timeSec: sceneTime,
                },
            });
        }
        // =========================================================================
        // SUB-SCENE 2: SHRINK-WRAPPED LEFTOVER HAM (6.46s - 16.32s)
        // =========================================================================
        else if (isSub2) {
            camera.setTarget(960, 520, 1.08);
            bg = `
        <!-- Iron Dungeon Gym Backdrop -->
        <rect x="-4000" y="-4000" width="10000" height="10000" fill="#18181b"/>
        <rect x="150" y="80" width="1620" height="720" rx="12" fill="#27272a" stroke="#ef4444" stroke-width="6"/>
        
        <!-- Dumbbell Rack in Background -->
        <line x1="200" y1="480" x2="1700" y2="480" stroke="#52525b" stroke-width="12"/>
        <line x1="200" y1="620" x2="1700" y2="620" stroke="#52525b" stroke-width="12"/>

        <!-- Dehydration Protocol Warning Sign -->
        <g transform="translate(600, 180)">
          <rect x="-220" y="-35" width="440" height="70" rx="14" fill="#0f172a" stroke="#f59e0b" stroke-width="5" filter="url(#cardShadow)"/>
          <text x="0" y="10" font-family="'Impact', sans-serif" font-size="24" fill="#fbbf24" letter-spacing="2" text-anchor="middle">
            DEHYDRATION: 72 HOURS
          </text>
        </g>

        <!-- Floor -->
        <rect x="-4000" y="800" width="10000" height="4000" fill="#09090b"/>
        <line x1="-4000" y1="800" x2="6000" y2="800" stroke="#ef4444" stroke-width="8"/>
      `;
            bg += renderShrinkWrappedHam(1260, 480, sceneTime);
            overlays += renderActionLines({ x: 1260, y: 480 }, 240, sceneTime);
            stickFiguresList.push({
                id: "gym_bro_actor",
                state: {
                    x: 580,
                    y: 640,
                    scale: 1.35,
                    gender: "bodybuilder",
                    hairStyle: "male_bodybuilder_bald",
                    clothes: "bodybuilder_tank",
                    expression: "rage_clenched_fists",
                    pointTarget: { x: 1260, y: 480 },
                    timeSec: sceneTime,
                },
            });
        }
        // =========================================================================
        // SUB-SCENE 3: MEAL PREP TABLE (16.32s - 26.08s)
        // =========================================================================
        else if (isSub3) {
            camera.setTarget(960, 520, 1.35);
            bg = `
        <!-- Sterile Kitchen Meal Prep Area -->
        <rect x="-4000" y="-4000" width="10000" height="10000" fill="#0f172a"/>
        <rect x="150" y="80" width="1620" height="720" rx="14" fill="#1e293b" stroke="#38bdf8" stroke-width="8"/>
        
        <!-- Meal Prep Title Banner -->
        <g transform="translate(960, 180)">
          <rect x="-280" y="-35" width="560" height="70" rx="14" fill="#0f172a" stroke="#ef4444" stroke-width="5" filter="url(#cardShadow)"/>
          <text x="0" y="10" font-family="'Impact', sans-serif" font-size="26" fill="#f87171" letter-spacing="1" text-anchor="middle">
            UNSEASONED CHICKEN & BROCCOLI
          </text>
        </g>

        <!-- Floor -->
        <rect x="-4000" y="800" width="10000" height="4000" fill="#020617"/>
        <line x1="-4000" y1="800" x2="6000" y2="800" stroke="#38bdf8" stroke-width="8"/>
      `;
            bg += renderUnseasonedChickenBroccoli(960, 540, sceneTime);
            overlays += renderHandDrawnCircle({ x: 960, y: 540 }, 160, 90, sceneTime, "ZERO TASTE");
            stickFiguresList.push({
                id: "gym_bro_actor",
                state: {
                    x: 640,
                    y: 650,
                    scale: 1.32,
                    gender: "bodybuilder",
                    hairStyle: "male_bodybuilder_bald",
                    clothes: "bodybuilder_tank",
                    expression: "cringe_teeth_grit",
                    pointTarget: { x: 960, y: 540 },
                    timeSec: sceneTime,
                },
            });
        }
        // =========================================================================
        // SUB-SCENE 4: 4:00 AM ALARM CLOCK & TRT DISCIPLINE (26.08s - 41.26s)
        // =========================================================================
        else {
            camera.cutTo(960, 500, 1.45);
            bg = `
        <!-- Dark 4 AM Bedroom / Gym Locker Room -->
        <rect x="-4000" y="-4000" width="10000" height="10000" fill="#020617"/>
        <rect x="150" y="80" width="1620" height="720" rx="14" fill="#0f172a" stroke="#f59e0b" stroke-width="8"/>
        
        <!-- Floor -->
        <rect x="-4000" y="800" width="10000" height="4000" fill="#000000"/>
        <line x1="-4000" y1="800" x2="6000" y2="800" stroke="#f59e0b" stroke-width="8"/>
      `;
            bg += renderAlarmClockTRT(960, 480, sceneTime);
            overlays += renderHandDrawnCircle({ x: 960, y: 480 }, 180, 110, sceneTime, "DISCIPLINE");
            stickFiguresList.push({
                id: "gym_bro_actor",
                state: {
                    x: 580,
                    y: 650,
                    scale: 1.34,
                    gender: "bodybuilder",
                    hairStyle: "male_bodybuilder_bald",
                    clothes: "bodybuilder_tank",
                    expression: "shock_eye_pop",
                    pointTarget: { x: 960, y: 480 },
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

import { renderBuccalBossFightBanner, renderDeliCheekboneSlicer, } from "../character/CartoonCastSubScenes";
import { renderActionLines } from "../anim/ComicMarkups";
export const Scene15_BuccalFat = {
    id: "scene_15_buccal_fat",
    name: "Buccal Fat Pumpkin, Deli Slicer & Victorian Gothic",
    startTime: 349.460,
    endTime: 408.630,
    render(ctx) {
        const { sceneTime, camera } = ctx;
        const isSub1 = sceneTime < 5.755;
        const isSub2 = sceneTime >= 5.755 && sceneTime < 18.094;
        const isSub3 = sceneTime >= 18.094 && sceneTime < 30.270;
        const isSub4 = sceneTime >= 30.270;
        let overlays = "";
        let bg = "";
        let stickFiguresList = [];
        // =========================================================================
        // SUB-SCENE 1: GLAMOUR RED CARPET CLOSEUP (0.0s - 5.76s)
        // =========================================================================
        if (isSub1) {
            camera.setTarget(960, 520, 1.15);
            bg = `
        <!-- High-Glamour Vanity Mirror Backdrop -->
        <rect x="-4000" y="-4000" width="10000" height="10000" fill="#18181b"/>
        <rect x="150" y="80" width="1620" height="720" rx="14" fill="#27272a" stroke="#f472b6" stroke-width="8"/>
        
        <!-- Vanity Bulbs -->
        ${[200, 320, 440, 560, 680].map(vy => `
          <circle cx="200" cy="${vy}" r="16" fill="#fef08a" filter="url(#glow)"/>
          <circle cx="1720" cy="${vy}" r="16" fill="#fef08a" filter="url(#glow)"/>
        `).join("")}

        <!-- Floor -->
        <rect x="-4000" y="800" width="10000" height="4000" fill="#991b1b"/>
        <line x1="-4000" y1="800" x2="6000" y2="800" stroke="#f472b6" stroke-width="8"/>
      `;
            stickFiguresList.push({
                id: "glamour_actress",
                state: {
                    x: 960,
                    y: 640,
                    scale: 1.34,
                    gender: "female",
                    hairStyle: "female_glamour_waves",
                    clothes: "dress_red",
                    expression: "smug_chef_kiss",
                    timeSec: sceneTime,
                },
            });
        }
        // =========================================================================
        // SUB-SCENE 2: CLINIC CONSULTATION & CHEEKBONE DIAGRAM (5.76s - 18.09s)
        // =========================================================================
        else if (isSub2) {
            camera.setTarget(960, 500, 1.08);
            bg = `
        <!-- Medical Clinic Chalkboard -->
        <rect x="-4000" y="-4000" width="10000" height="10000" fill="#022c22"/>
        <rect x="150" y="80" width="1620" height="720" rx="14" fill="#064e3b" stroke="#10b981" stroke-width="8"/>
        
        <!-- Floor -->
        <rect x="-4000" y="800" width="10000" height="4000" fill="#0f172a"/>
        <line x1="-4000" y1="800" x2="6000" y2="800" stroke="#10b981" stroke-width="8"/>
      `;
            bg += renderBuccalBossFightBanner(1260, 440, sceneTime);
            stickFiguresList.push({
                id: "patient_actor",
                state: {
                    x: 580,
                    y: 640,
                    scale: 1.32,
                    gender: "female",
                    hairStyle: "female_high_ponytail",
                    clothes: "y2k_crop_top_low_rise",
                    expression: "confused_squint",
                    pointTarget: { x: 1260, y: 440 },
                    timeSec: sceneTime,
                },
            });
        }
        // =========================================================================
        // SUB-SCENE 3: CRAZED SURGEON & DELI MEAT CHEEKBONE SLICER (18.09s - 30.27s)
        // =========================================================================
        else if (isSub3) {
            camera.setTarget(960, 500, 1.08);
            bg = `
        <!-- Operating Theater with Surgical Light -->
        <rect x="-4000" y="-4000" width="10000" height="10000" fill="#042f2e"/>
        <rect x="150" y="80" width="1620" height="720" rx="14" fill="#0f766e" stroke="#115e59" stroke-width="8"/>
        
        <!-- Surgical Lamp Over Operating Area -->
        <g transform="translate(960, 0)">
          <line x1="0" y1="0" x2="0" y2="140" stroke="#475569" stroke-width="6"/>
          <circle cx="0" cy="140" r="50" fill="#cbd5e1"/>
          <polygon points="-50,140 50,140 320,800 -320,800" fill="#ccfbf1" opacity="0.25"/>
        </g>

        <!-- Floor -->
        <rect x="-4000" y="800" width="10000" height="4000" fill="#0f172a"/>
        <line x1="-4000" y1="800" x2="6000" y2="800" stroke="#14b8a6" stroke-width="8"/>
      `;
            bg += renderDeliCheekboneSlicer(1260, 480, sceneTime);
            overlays += renderActionLines({ x: 1260, y: 480 }, 220, sceneTime);
            stickFiguresList.push({
                id: "surgeon_actor",
                state: {
                    x: 580,
                    y: 640,
                    scale: 1.35,
                    gender: "doctor",
                    hairStyle: "male_doctor_cap",
                    clothes: "doctor_scrubs",
                    expression: "smug_chef_kiss",
                    pointTarget: { x: 1260, y: 480 },
                    timeSec: sceneTime,
                },
            });
        }
        // =========================================================================
        // SUB-SCENE 4: VICTORIAN GOTHIC NOVEL WIDOW (30.27s - 59.17s)
        // =========================================================================
        else {
            camera.setTarget(960, 520, 1.25);
            bg = `
        <!-- Victorian Gothic Cemetery & Fog Backdrop -->
        <rect x="-4000" y="-4000" width="10000" height="10000" fill="#09090b"/>
        
        <!-- Distant Gothic Spires & Full Moon -->
        <circle cx="960" cy="240" r="110" fill="#e2e8f0" stroke="#94a3b8" stroke-width="6" opacity="0.6"/>
        <polygon points="500,800 540,320 580,800" fill="#18181b"/>
        <polygon points="1380,800 1420,280 1460,800" fill="#18181b"/>

        <!-- Rolling Ground Fog Waves -->
        <path d="M -1000 760 Q 200 720 960 760 T 2600 760 L 2600 1200 L -1000 1200 Z" fill="#27272a" opacity="0.7"/>

        <!-- Title Banner -->
        <g transform="translate(960, 160)">
          <rect x="-280" y="-35" width="560" height="70" rx="14" fill="#0f172a" stroke="#881337" stroke-width="5" filter="url(#cardShadow)"/>
          <text x="0" y="10" font-family="'Impact', sans-serif" font-size="24" fill="#fb7185" letter-spacing="2" text-anchor="middle">
            MOURNING A LOST LOVER (VICTORIAN GOTHIC)
          </text>
        </g>

        <!-- Floor -->
        <rect x="-4000" y="800" width="10000" height="4000" fill="#000000"/>
        <line x1="-4000" y1="800" x2="6000" y2="800" stroke="#881337" stroke-width="8"/>
      `;
            stickFiguresList.push({
                id: "victorian_widow",
                state: {
                    x: 960 + Math.sin(sceneTime * 2) * 20,
                    y: 640,
                    scale: 1.34,
                    gender: "female",
                    hairStyle: "female_widow_veil",
                    clothes: "victorian_mourning",
                    expression: "deadpan_soul_stare",
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

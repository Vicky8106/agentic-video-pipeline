import { renderHandDrawnArrow, renderHandDrawnCircle, renderActionLines } from "../anim/ComicMarkups";
export const Scene13_HollywoodDenial = {
    id: "scene_13_hollywood_denial",
    name: "Hollywood Denial: Gale, Couch Coins & Firehose",
    startTime: 238.740,
    endTime: 308.200,
    render(ctx) {
        const { sceneTime, camera } = ctx;
        // EXACT WORD-LEVEL TIMESTAMPS FROM 0-chapter-1.srt:
        // Cue 84-89 (238.740s - 253.210s / t=0.0s - 14.470s): "strong gust of wind as a primary mode of transportation"
        // Cue 90-92 (253.210s - 263.517s / t=14.470s - 24.777s): "Mindy Kaling attributed strictly to diet & exercise"
        // Cue 93-94 (263.517s - 269.257s / t=24.777s - 30.517s): "getting rich by finding loose change in your couch cushions"
        // Cue 95-97 (269.257s - 277.127s / t=30.517s - 38.387s): "Gaslighting is most impressive... golden age of celebrity denial"
        // Cue 98-102 (277.127s - 290.614s / t=38.387s - 51.874s): "drinking more water, long walks... as if they just discovered hydration"
        // Cue 103-105 (290.614s - 299.082s / t=51.874s - 60.342s): "cutting out cheese doesn't alter your entire skeletal structure"
        // Cue 106-107 (299.082s - 308.200s / t=60.342s - 69.460s): "Not just women's issue. Men in Hollywood doing exact same thing"
        const isSub1 = sceneTime < 14.470;
        const isSub2 = sceneTime >= 14.470 && sceneTime < 24.777;
        const isSub3 = sceneTime >= 24.777 && sceneTime < 30.517;
        const isSub4 = sceneTime >= 30.517 && sceneTime < 38.387;
        const isSub5 = sceneTime >= 38.387 && sceneTime < 51.874;
        const isSub6 = sceneTime >= 51.874 && sceneTime < 60.342;
        const isSub7 = sceneTime >= 60.342;
        let hostX = 420;
        let hostY = 650;
        let hostLean = 8;
        let isWalking = false;
        let hostExpr = "deadpan_classic";
        let leftHandProp = "none";
        let rightHandProp = "none";
        let pointTarget = { x: 1260, y: 480 };
        let overlays = "";
        let bg = "";
        let stickFiguresList = [];
        // =========================================================================
        // SUB-SCENE 1: WINDY PREMIERE RED CARPET (0.0s - 14.47s)
        // =========================================================================
        if (isSub1) {
            camera.cutTo(1260, 480, 1.25);
            hostX = 380;
            hostLean = 14;
            hostExpr = "deadpan_classic";
            bg = `
        <!-- Windy Outdoor Premiere Street -->
        <rect x="-4000" y="-4000" width="10000" height="10000" fill="#e0f2fe"/>
        <rect x="150" y="80" width="1620" height="720" rx="14" fill="#bae6fd" stroke="#0284c7" stroke-width="8"/>
        
        <!-- Bending Palm Trees in Gale Force Wind -->
        <g transform="translate(1400, 800)">
          <path d="M 0 0 Q -100 -250 -220 -450" stroke="#78350f" stroke-width="18" fill="none"/>
          <path d="M -220 -450 Q -380 -480 -450 -420" stroke="#16a34a" stroke-width="14" fill="none"/>
          <path d="M -220 -450 Q -340 -540 -400 -520" stroke="#16a34a" stroke-width="14" fill="none"/>
        </g>

        <!-- Red Carpet Boulevard Floor -->
        <rect x="-4000" y="800" width="10000" height="4000" fill="#991b1b"/>
        <line x1="-4000" y1="800" x2="6000" y2="800" stroke="#ca8a04" stroke-width="8"/>
      `;
            stickFiguresList.push({
                id: "host_stick",
                state: {
                    x: hostX,
                    y: hostY,
                    scale: 1.30,
                    timeSec: sceneTime,
                    spineLean: hostLean,
                    pointTarget: { x: 1260, y: 450 },
                    expression: hostExpr,
                },
            }, {
                id: "flying_actress",
                state: {
                    x: 1260 - (sceneTime * 20),
                    y: 500 - Math.sin(sceneTime * 3) * 40,
                    scale: 1.22,
                    gender: "female",
                    hairStyle: "female_blonde",
                    clothes: "dress_pink",
                    expression: "shock_speed_zoom",
                    leftArmAngle1: -80,
                    leftArmAngle2: -20,
                    rightArmAngle1: 60,
                    rightArmAngle2: 30,
                    spineLean: -25,
                    timeSec: sceneTime,
                },
            });
            overlays += renderActionLines({ x: 1260, y: 480 }, 240, sceneTime);
        }
        // =========================================================================
        // SUB-SCENE 2: RED CARPET PRESS LINE & INTERVIEW (14.47s - 24.78s)
        // =========================================================================
        else if (isSub2) {
            camera.cutTo(1260, 500, 1.25);
            hostX = 380;
            hostLean = -10;
            hostExpr = "skeptical_raised_brow";
            bg = `
        <!-- Hollywood Step-and-Repeat Wall -->
        <rect x="-4000" y="-4000" width="10000" height="10000" fill="#1e1b4b"/>
        <rect x="150" y="80" width="1620" height="720" rx="14" fill="#312e81" stroke="#6366f1" stroke-width="8"/>
        ${[200, 450, 700, 950, 1200, 1450, 1700].map(lx => `
          <text x="${lx}" y="180" font-family="'Impact', sans-serif" font-size="18" fill="#a5b4fc" text-anchor="middle">★ HOLLYWOOD ★</text>
          <text x="${lx}" y="320" font-family="'Impact', sans-serif" font-size="18" fill="#818cf8" text-anchor="middle">★ DIET & EXERCISE ★</text>
        `).join("")}

        <!-- Microphones Thrusting In -->
        <g transform="translate(1260, 560)">
          <g transform="translate(-120, 40) rotate(-35)">
            <rect x="-10" y="-40" width="20" height="50" rx="4" fill="#ef4444"/>
            <circle cx="0" cy="-45" r="14" fill="#111"/>
            <line x1="0" y1="10" x2="0" y2="80" stroke="#94a3b8" stroke-width="6"/>
          </g>
          <g transform="translate(120, 40) rotate(35)">
            <rect x="-10" y="-40" width="20" height="50" rx="4" fill="#3b82f6"/>
            <circle cx="0" cy="-45" r="14" fill="#111"/>
            <line x1="0" y1="10" x2="0" y2="80" stroke="#94a3b8" stroke-width="6"/>
          </g>
        </g>

        <!-- Red Carpet Floor -->
        <rect x="-4000" y="800" width="10000" height="4000" fill="#991b1b"/>
        <line x1="-4000" y1="800" x2="6000" y2="800" stroke="#ca8a04" stroke-width="8"/>
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
                id: "celebrity_female",
                state: {
                    x: 1260,
                    y: 640,
                    scale: 1.28,
                    gender: "female",
                    hairStyle: "female_long",
                    clothes: "dress_pink",
                    expression: "smug_chef_kiss",
                    timeSec: sceneTime,
                },
            });
            overlays += renderHandDrawnCircle({ x: 1260, y: 480 }, 200, 120, sceneTime, "HOLLYWOOD SPEAK");
        }
        // =========================================================================
        // SUB-SCENE 3: LIVING ROOM COUCH CUSHION TREASURE DIVING (24.78s - 30.52s)
        // =========================================================================
        else if (isSub3) {
            camera.cutTo(1260, 500, 1.25);
            hostX = 380;
            hostLean = 12;
            hostExpr = "smug_rock_eyebrow";
            bg = `
        <!-- Living Room with Giant Retro Sofa -->
        <rect x="-4000" y="-4000" width="10000" height="10000" fill="#fef3c7"/>
        <rect x="150" y="80" width="1620" height="720" rx="14" fill="#fef08a" opacity="0.3"/>
        
        <!-- Giant Green Velvet Couch -->
        <g transform="translate(1260, 600)">
          <!-- Couch Back -->
          <rect x="-240" y="-120" width="480" height="140" rx="20" fill="#065f46" stroke="#047857" stroke-width="8"/>
          <!-- Couch Cushions -->
          <rect x="-220" y="20" width="140" height="80" rx="12" fill="#047857"/>
          <rect x="-70" y="20" width="140" height="80" rx="12" fill="#047857"/>
          <rect x="80" y="20" width="140" height="80" rx="12" fill="#047857"/>
        </g>

        <!-- Wood Floor -->
        <rect x="-4000" y="800" width="10000" height="4000" fill="#78350f"/>
        <line x1="-4000" y1="800" x2="6000" y2="800" stroke="#451a03" stroke-width="8"/>
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
                id: "diving_stickman",
                state: {
                    x: 1260,
                    y: 540,
                    scale: 1.25,
                    gender: "male",
                    hairStyle: "male_short",
                    clothes: "hoodie",
                    expression: "shock_jaw_drop",
                    rotation: 180, // Upside down diving into couch cushions
                    timeSec: sceneTime,
                },
            });
            overlays += renderHandDrawnArrow({ x: 740, y: 520 }, { x: 1080, y: 480 }, sceneTime, "LOOSE CHANGE");
        }
        // =========================================================================
        // SUB-SCENE 4: GOLDEN AGE OF GASLIGHTING AWARDS HALL (30.52s - 38.39s)
        // =========================================================================
        else if (isSub4) {
            camera.cutTo(1260, 480, 1.25);
            hostX = 380;
            hostLean = -8;
            hostExpr = "smug_chef_kiss";
            bg = `
        <!-- Grand Hollywood Gaslighting Awards Hall -->
        <rect x="-4000" y="-4000" width="10000" height="10000" fill="#0f172a"/>
        <rect x="150" y="80" width="1620" height="720" rx="14" fill="#1e293b" stroke="#ca8a04" stroke-width="8"/>
        
        <!-- Giant Golden Oscar for Gaslighting -->
        <g transform="translate(1260, 460)" filter="url(#cardShadow)">
          <rect x="-80" y="140" width="160" height="50" rx="8" fill="#78350f" stroke="#ca8a04" stroke-width="4"/>
          <text x="0" y="172" font-family="'Impact', sans-serif" font-size="18" fill="#facc15" text-anchor="middle">
            BEST GASLIGHTING 2024
          </text>
        </g>

        <!-- Red Carpet Stage Floor -->
        <rect x="-4000" y="800" width="10000" height="4000" fill="#881337"/>
        <line x1="-4000" y1="800" x2="6000" y2="800" stroke="#ca8a04" stroke-width="8"/>
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
                id: "gaslight_winner",
                state: {
                    x: 1260,
                    y: 640,
                    scale: 1.28,
                    gender: "female",
                    hairStyle: "female_blonde",
                    clothes: "dress_pink",
                    expression: "smug_finger_guns",
                    timeSec: sceneTime,
                },
            });
            overlays += renderActionLines({ x: 1260, y: 480 }, 240, sceneTime);
        }
        // =========================================================================
        // SUB-SCENE 5: 3-WAY SPLIT: WATER / LONG WALKS / 8 HOURS SLEEP (38.39s - 51.87s)
        // =========================================================================
        else if (isSub5) {
            if (sceneTime < 43.0) {
                camera.cutTo(400, 480, 1.25);
            }
            else if (sceneTime < 47.5) {
                camera.cutTo(930, 480, 1.25);
            }
            else {
                camera.cutTo(1460, 480, 1.25);
            }
            bg = `
        <!-- 3-Way Comic Split Screen -->
        <rect x="-4000" y="-4000" width="10000" height="10000" fill="#020617"/>
        
        <!-- PANEL 1: Water Submersion -->
        <rect x="150" y="80" width="500" height="720" rx="10" fill="#0284c7" stroke="#38bdf8" stroke-width="5"/>
        <text x="400" y="140" font-family="'Impact', sans-serif" font-size="22" fill="#ffffff" text-anchor="middle">
          1. "MORE WATER"
        </text>

        <!-- PANEL 2: Sahara Long Walks -->
        <rect x="680" y="80" width="500" height="720" rx="10" fill="#d97706" stroke="#fbbf24" stroke-width="5"/>
        <text x="930" y="140" font-family="'Impact', sans-serif" font-size="22" fill="#ffffff" text-anchor="middle">
          2. "LONG WALKS"
        </text>

        <!-- PANEL 3: Cryo Stasis 8 Hours Sleep -->
        <rect x="1210" y="80" width="500" height="720" rx="10" fill="#1e1b4b" stroke="#818cf8" stroke-width="5"/>
        <text x="1460" y="140" font-family="'Impact', sans-serif" font-size="22" fill="#ffffff" text-anchor="middle">
          3. "8 HRS SLEEP"
        </text>
      `;
            stickFiguresList.push({
                id: "water_female",
                state: {
                    x: 400,
                    y: 650,
                    scale: 1.20,
                    gender: "female",
                    hairStyle: "female_ponytail",
                    clothes: "crop_top_leggings",
                    expression: "shock_eye_pop",
                    timeSec: sceneTime,
                },
            }, {
                id: "desert_walker",
                state: {
                    x: 930,
                    y: 650,
                    scale: 1.20,
                    gender: "male",
                    hairStyle: "male_short",
                    clothes: "hoodie",
                    expression: "exhausted_melting",
                    isWalking: true,
                    timeSec: sceneTime,
                },
            }, {
                id: "cryo_sleeper",
                state: {
                    x: 1460,
                    y: 650,
                    scale: 1.20,
                    gender: "male",
                    hairStyle: "male_short",
                    clothes: "patient_gown",
                    expression: "sleeping_drool",
                    timeSec: sceneTime,
                },
            });
        }
        // =========================================================================
        // SUB-SCENE 6: GOURMET CHEESE SHOP & SKELETAL X-RAY (51.87s - 60.34s)
        // =========================================================================
        else if (isSub6) {
            camera.cutTo(1260, 480, 1.25);
            hostX = 380;
            hostLean = -14;
            hostExpr = "confused_squint";
            bg = `
        <!-- French Gourmet Cheese Shop Backdrop -->
        <rect x="-4000" y="-4000" width="10000" height="10000" fill="#fef3c7"/>
        <rect x="150" y="80" width="1620" height="720" rx="14" fill="#fef08a" opacity="0.3"/>
        
        <!-- Hanging Giant Cheese Wheels -->
        ${[750, 950, 1550, 1720].map((cx) => `
          <line x1="${cx}" y1="80" x2="${cx}" y2="220" stroke="#78350f" stroke-width="4"/>
          <ellipse cx="${cx}" cy="240" rx="40" ry="24" fill="#facc15" stroke="#ca8a04" stroke-width="4"/>
        `).join("")}

        <!-- Floor -->
        <rect x="-4000" y="800" width="10000" height="4000" fill="#78350f"/>
        <line x1="-4000" y1="800" x2="6000" y2="800" stroke="#ca8a04" stroke-width="8"/>
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
                id: "cheese_refuser",
                state: {
                    x: 1260,
                    y: 640,
                    scale: 1.28,
                    gender: "female",
                    hairStyle: "female_bob",
                    clothes: "dress_pink",
                    expression: "disgust_pinched_nose",
                    pose: "hands_on_hips",
                    timeSec: sceneTime,
                },
            });
            overlays += renderHandDrawnCircle({ x: 1260, y: 480 }, 180, 120, sceneTime, "ZERO DAIRY");
        }
        // =========================================================================
        // SUB-SCENE 7: 10,000 PSI HYDRATION CLIMAX (60.34s - 69.46s)
        // =========================================================================
        else {
            camera.cutTo(1260, 500, 1.20);
            hostX = 360;
            hostLean = 14;
            hostExpr = "shock_eye_pop";
            bg = `
        <!-- Industrial Fire Station Hydration Climax -->
        <rect x="-4000" y="-4000" width="10000" height="10000" fill="#0f172a"/>
        <rect x="150" y="80" width="1620" height="720" rx="14" fill="#1e293b" stroke="#ef4444" stroke-width="8"/>
        
        <!-- Giant Red Fire Hydrant Blasting 10,000 PSI Water Stream -->
        <g transform="translate(850, 580)">
          <rect x="-40" y="-80" width="80" height="180" rx="16" fill="#dc2626" stroke="#991b1b" stroke-width="6"/>
          <circle cx="0" cy="-80" r="30" fill="#ef4444"/>
          <!-- Massive Water Torrent Cannon -->
          <path d="M 40 -30 Q 300 -120 700 -20 Q 750 30 700 80 Q 300 20 40 30 Z" fill="#38bdf8" opacity="0.9" filter="url(#glow)"/>
          <text x="350" y="10" font-family="'Impact', sans-serif" font-size="34" fill="#ffffff" text-anchor="middle">
            HYDRATION 10,000 PSI 🌊
          </text>
        </g>

        <!-- Floor -->
        <rect x="-4000" y="800" width="10000" height="4000" fill="#020617"/>
        <line x1="-4000" y1="800" x2="6000" y2="800" stroke="#38bdf8" stroke-width="8"/>
      `;
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
                id: "blasted_female",
                state: {
                    x: 1380,
                    y: 580,
                    scale: 1.25,
                    gender: "female",
                    hairStyle: "female_blonde",
                    clothes: "dress_pink",
                    expression: "fear_panic_run",
                    spineLean: -25,
                    timeSec: sceneTime,
                },
            });
            overlays += renderActionLines({ x: 1260, y: 480 }, 280, sceneTime);
        }
        return {
            backgroundSvg: bg + overlays,
            stickFigures: stickFiguresList,
            shake: 0,
        };
    },
};

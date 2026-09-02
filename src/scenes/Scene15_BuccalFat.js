import { renderBuccalBossFightBanner } from "../character/CartoonCastSubScenes";
import { renderHandDrawnCircle, renderActionLines } from "../anim/ComicMarkups";
export const Scene15_BuccalFat = {
    id: "scene_15_buccal_fat",
    name: "Buccal Fat Pumpkin, Deli Slicer & Victorian Gothic",
    startTime: 349.460,
    endTime: 408.630,
    render(ctx) {
        const { sceneTime, camera } = ctx;
        // EXACT WORD-LEVEL TIMESTAMPS FROM 0-chapter-1.srt:
        // Cue 125-128 (349.460s - 355.215s / t=0.0s - 5.755s): "Secondary boss fight... Buccal Fat Removal"
        // Cue 129-132 (355.215s - 367.554s / t=5.755s - 18.094s): "natural padding in cheeks... looking alive is out this season"
        // Cue 133-137 (367.554s - 379.730s / t=18.094s - 30.270s): "slice inside of mouths, scoop out fat pads... slice deli meat"
        // Cue 138-144 (379.730s - 399.371s / t=30.270s - 49.911s): "Ozempic Face... actively mourning a lost lover in a Victorian gothic novel"
        // Cue 145-148 (399.371s - 408.630s / t=49.911s - 59.170s): "sea of manufactured faces... humans replaced by smooth replicas"
        const isSub1 = sceneTime < 5.755;
        const isSub2 = sceneTime >= 5.755 && sceneTime < 18.094;
        const isSub3 = sceneTime >= 18.094 && sceneTime < 30.270;
        const isSub7 = sceneTime >= 30.270 && sceneTime < 42.000;
        const isSub8 = sceneTime >= 42.000 && sceneTime < 52.000;
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
        // SUB-SCENE 1: OPERATING THEATER BOSS FIGHT (0.0s - 5.76s)
        // =========================================================================
        if (isSub1) {
            camera.cutTo(1260, 480, 1.25);
            hostX = 420;
            hostLean = 8;
            pointTarget = { x: 1260, y: 480 };
            hostExpr = "deadpan_classic";
            bg = `
        <!-- Operating Theater Backdrop -->
        <rect x="-4000" y="-4000" width="10000" height="10000" fill="#042f2e"/>
        <rect x="150" y="80" width="1620" height="720" rx="14" fill="#0f766e" stroke="#115e59" stroke-width="8"/>
        <!-- Floor -->
        <rect x="-4000" y="800" width="10000" height="4000" fill="#0f172a"/>
        <line x1="-4000" y1="800" x2="6000" y2="800" stroke="#14b8a6" stroke-width="8"/>
      `;
            bg += renderBuccalBossFightBanner(1260, 480, sceneTime);
            overlays += renderHandDrawnCircle({ x: 1260, y: 480 }, 190, 120, sceneTime, "BOSS FIGHT");
            stickFiguresList.push({
                id: "host_stick",
                state: {
                    x: hostX,
                    y: hostY,
                    scale: 1.34,
                    timeSec: sceneTime,
                    spineLean: hostLean,
                    pointTarget: pointTarget,
                    expression: hostExpr,
                    gazeTarget: pointTarget,
                },
            });
        }
        // =========================================================================
        // SUB-SCENE 2: FACIAL ANATOMY & PATIENT FEAR (5.76s - 18.09s)
        // =========================================================================
        else if (isSub2) {
            camera.cutTo(1260, 480, 1.25);
            hostX = 380;
            hostLean = 6;
            pointTarget = { x: 1260, y: 480 };
            hostExpr = "confused_squint";
            bg = `
        <!-- Medical Clinic Chalkboard -->
        <rect x="-4000" y="-4000" width="10000" height="10000" fill="#022c22"/>
        <rect x="150" y="80" width="1620" height="720" rx="14" fill="#064e3b" stroke="#10b981" stroke-width="8"/>
        
        <!-- Floor -->
        <rect x="-4000" y="800" width="10000" height="4000" fill="#0f172a"/>
        <line x1="-4000" y1="800" x2="6000" y2="800" stroke="#10b981" stroke-width="8"/>
      `;
            // Female Patient looking terrified
            stickFiguresList.push({
                id: "host_stick",
                state: {
                    x: hostX,
                    y: hostY,
                    scale: 1.32,
                    timeSec: sceneTime,
                    spineLean: hostLean,
                    pointTarget: { x: 1200, y: 550 },
                    expression: hostExpr,
                },
            }, {
                id: "patient_female",
                state: {
                    x: 1260,
                    y: 640,
                    scale: 1.25,
                    gender: "female",
                    hairStyle: "female_ponytail",
                    clothes: "crop_top_leggings",
                    expression: "fear_sweat_freeze",
                    eyes: "eye_pop",
                    mouth: "open_o",
                    spineLean: 10,
                    timeSec: sceneTime,
                },
            });
        }
        // =========================================================================
        // SUB-SCENE 3: CRAZED SURGEON SCOOPING FEMALE PATIENT CHEEKS (18.09s - 30.27s)
        // =========================================================================
        else if (isSub3) {
            camera.cutTo(1200, 500, 1.25);
            hostX = 360;
            hostLean = -14;
            hostExpr = "cringe_teeth_grit";
            bg = `
        <!-- Operating Theater with Surgical Light -->
        <rect x="-4000" y="-4000" width="10000" height="10000" fill="#042f2e"/>
        <rect x="150" y="80" width="1620" height="720" rx="14" fill="#0f766e" stroke="#115e59" stroke-width="8"/>
        
        <!-- Surgical Lamp Over Operating Chair -->
        <g transform="translate(1260, 0)">
          <line x1="0" y1="0" x2="0" y2="140" stroke="#475569" stroke-width="6"/>
          <circle cx="0" cy="140" r="50" fill="#cbd5e1"/>
          <polygon points="-50,140 50,140 320,800 -320,800" fill="#ccfbf1" opacity="0.25"/>
        </g>

        <!-- Dental / Surgery Recliner Chair -->
        <g transform="translate(1360, 600)">
          <rect x="-60" y="40" width="120" height="20" fill="#334155"/>
          <line x1="0" y1="40" x2="0" y2="-40" stroke="#475569" stroke-width="18"/>
          <polygon points="-50,-80 50,-80 40,40 -40,40" fill="#1e293b" stroke="#0ea5e9" stroke-width="4"/>
          <!-- Headrest -->
          <rect x="-30" y="-120" width="60" height="35" rx="8" fill="#0f172a" stroke="#0ea5e9" stroke-width="3"/>
        </g>

        <!-- Giant Ice Cream Scoop Prop with Scoop of Yellow Fat Pad -->
        <g transform="translate(${1140 + Math.sin(sceneTime * 6) * 15}, ${510 + Math.cos(sceneTime * 6) * 10}) rotate(${Math.sin(sceneTime * 6) * 20})">
          <line x1="-50" y1="0" x2="30" y2="0" stroke="#94a3b8" stroke-width="8" stroke-linecap="round"/>
          <circle cx="45" cy="0" r="22" fill="#cbd5e1" stroke="#64748b" stroke-width="4"/>
          <!-- Yellow Fat Pad in Scoop -->
          <circle cx="45" cy="-8" r="14" fill="#facc15" stroke="#ca8a04" stroke-width="3" filter="url(#glow)"/>
          <text x="45" y="-28" font-family="'Impact', sans-serif" font-size="14" fill="#ef4444" text-anchor="middle">SCOOP</text>
        </g>

        <!-- Floor -->
        <rect x="-4000" y="800" width="10000" height="4000" fill="#0f172a"/>
        <line x1="-4000" y1="800" x2="6000" y2="800" stroke="#14b8a6" stroke-width="8"/>
      `;
            // Full Live Skit: Terrified Female Patient + Smug Crazed Doctor
            stickFiguresList.push({
                id: "host_stick",
                state: {
                    x: hostX,
                    y: hostY,
                    scale: 1.30,
                    timeSec: sceneTime,
                    spineLean: hostLean,
                    pointTarget: { x: 1100, y: 520 },
                    expression: hostExpr,
                },
            }, {
                id: "surgeon_doctor",
                state: {
                    x: 1040,
                    y: 640,
                    scale: 1.30,
                    gender: "doctor",
                    hairStyle: "doctor_cap",
                    clothes: "doctor_scrubs",
                    expression: "smug_rock_eyebrow",
                    pointTarget: { x: 1360, y: 520 },
                    timeSec: sceneTime,
                },
            }, {
                id: "patient_female",
                state: {
                    x: 1360,
                    y: 640,
                    scale: 1.25,
                    gender: "female",
                    hairStyle: "female_ponytail",
                    clothes: "patient_gown",
                    expression: "fear_screaming",
                    eyes: "eye_pop",
                    mouth: "scream",
                    spineLean: -12,
                    timeSec: sceneTime,
                },
            });
            overlays += renderActionLines({ x: 1260, y: 480 }, 220, sceneTime);
        }
        // =========================================================================
        // SUB-SCENE 4: NYC DELI COUNTER & CHEEK SLICING (30.27s - 42.00s)
        // =========================================================================
        else if (isSub7) {
            camera.cutTo(1200, 520, 1.25);
            hostX = 380;
            hostLean = -16;
            hostExpr = "shock_home_alone";
            bg = `
        <!-- NYC Kosher Deli Counter -->
        <rect x="-4000" y="-4000" width="10000" height="10000" fill="#7f1d1d"/>
        <rect x="150" y="80" width="1620" height="720" rx="14" fill="#991b1b" stroke="#7f1d1d" stroke-width="8"/>
        
        <!-- Deli Meat Slicer -->
        <g transform="translate(1260, 540)" filter="url(#cardShadow)">
          <rect x="-140" y="20" width="280" height="60" rx="10" fill="#475569" stroke="#1e293b" stroke-width="6"/>
          <circle cx="-30" cy="-20" r="70" fill="#cbd5e1" stroke="#94a3b8" stroke-width="5"/>
          <ellipse cx="60" cy="-20" rx="40" ry="16" fill="#f43f5e" stroke="#be123c" stroke-width="3" filter="url(#glow)"/>
        </g>

        <!-- Floor -->
        <rect x="-4000" y="800" width="10000" height="4000" fill="#450a0a"/>
        <line x1="-4000" y1="800" x2="6000" y2="800" stroke="#fca5a5" stroke-width="8"/>
      `;
            // Skit: Male Butcher + Female Stickman holding ice pack
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
                id: "butcher_male",
                state: {
                    x: 1060,
                    y: 640,
                    scale: 1.28,
                    gender: "male",
                    hairStyle: "male_short",
                    clothes: "suit",
                    expression: "smug_chef_kiss",
                    pointTarget: { x: 1260, y: 520 },
                    timeSec: sceneTime,
                },
            }, {
                id: "customer_female",
                state: {
                    x: 1420,
                    y: 640,
                    scale: 1.25,
                    gender: "female",
                    hairStyle: "female_long",
                    clothes: "dress_pink",
                    expression: "cringe_teeth_grit",
                    spineLean: 10,
                    timeSec: sceneTime,
                },
            });
        }
        // =========================================================================
        // SUB-SCENE 5: VICTORIAN GOTHIC CEMETERY & MOURNING WIDOW (42.00s - 52.00s)
        // =========================================================================
        else if (isSub8) {
            camera.cutTo(1260, 520, 1.25);
            hostX = 380;
            hostLean = -12;
            hostExpr = "deadpan_classic";
            bg = `
        <!-- Tim Burton Victorian Gothic Cemetery -->
        <rect x="-4000" y="-4000" width="10000" height="10000" fill="#09090b"/>
        <rect x="150" y="80" width="1620" height="720" rx="14" fill="#18181b" stroke="#3f3f46" stroke-width="8"/>
        
        <!-- Crooked Dead Trees & Full Moon -->
        <circle cx="1500" cy="200" r="50" fill="#f4f4f5" filter="url(#glow)"/>
        
        <!-- Victorian Headstone -->
        <g transform="translate(1080, 580)" filter="url(#cardShadow)">
          <path d="M -90 80 L -90 -60 C -90 -120 90 -120 90 -60 L 90 80 Z" fill="#475569" stroke="#1e293b" stroke-width="6"/>
          <text x="0" y="-60" font-family="serif" font-size="24" font-weight="bold" fill="#f8fafc" text-anchor="middle">R.I.P.</text>
          <text x="0" y="-25" font-family="serif" font-size="16" font-weight="bold" fill="#38bdf8" text-anchor="middle">BUCCAL FAT</text>
          <text x="0" y="5" font-family="serif" font-size="13" fill="#cbd5e1" text-anchor="middle">2010 - 2024</text>
        </g>

        <!-- Floor -->
        <rect x="-4000" y="800" width="10000" height="4000" fill="#09090b"/>
        <line x1="-4000" y1="800" x2="6000" y2="800" stroke="#71717a" stroke-width="8"/>
      `;
            // Female Widow Stickman weeping into handkerchief
            stickFiguresList.push({
                id: "host_stick",
                state: {
                    x: hostX,
                    y: hostY,
                    scale: 1.30,
                    timeSec: sceneTime,
                    spineLean: hostLean,
                    pointTarget: { x: 1280, y: 550 },
                    expression: hostExpr,
                },
            }, {
                id: "widow_female",
                state: {
                    x: 1300,
                    y: 650,
                    scale: 1.28,
                    gender: "widow",
                    hairStyle: "widow_veil",
                    clothes: "dress_black",
                    expression: "crying_waterfalls",
                    leftArmAngle1: 150,
                    leftArmAngle2: -110, // Holding handkerchief to face
                    spineLean: -14,
                    timeSec: sceneTime,
                },
            });
        }
        // =========================================================================
        // SUB-SCENE 6: HOST OUTRO & CYBORG MONOCULTURE PREVIEW (52.00s+)
        // =========================================================================
        else {
            camera.cutTo(960, 540, 1.08);
            hostX = 440;
            hostLean = 0;
            hostExpr = "smug_finger_guns";
            bg = `
        <rect x="-4000" y="-4000" width="10000" height="10000" fill="#020617"/>
        <rect x="150" y="80" width="1620" height="720" rx="14" fill="#0f172a" stroke="#ef4444" stroke-width="8"/>
        <!-- Floor -->
        <rect x="-4000" y="800" width="10000" height="4000" fill="#020617"/>
        <line x1="-4000" y1="800" x2="6000" y2="800" stroke="#ef4444" stroke-width="8"/>
      `;
            stickFiguresList.push({
                id: "host_stick",
                state: {
                    x: hostX,
                    y: hostY,
                    scale: 1.34,
                    timeSec: sceneTime,
                    spineLean: hostLean,
                    expression: hostExpr,
                },
            }, {
                id: "cyborg_female",
                state: {
                    x: 1260,
                    y: 640,
                    scale: 1.25,
                    gender: "female",
                    hairStyle: "female_bob",
                    clothes: "crop_top_leggings",
                    expression: "deadpan_classic",
                    timeSec: sceneTime,
                },
            });
        }
        return {
            backgroundSvg: bg + overlays,
            stickFigures: stickFiguresList,
            shake: 0,
        };
    },
};

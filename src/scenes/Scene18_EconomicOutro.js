import { renderHandDrawnCircle, renderActionLines } from "../anim/ComicMarkups";
export const Scene18_EconomicOutro = {
    id: "scene_18_economic_outro",
    name: "Economic Flex, Gold Wheelbarrow, Butler & Outro",
    startTime: 540.354,
    endTime: 644.080,
    render(ctx) {
        const { sceneTime, camera } = ctx;
        // EXACT WORD-LEVEL TIMESTAMPS FROM 0-chapter-1.srt:
        // Cue 189-195 (540.354s - 565.204s / t=0.0s - 24.850s): "Economic divide: $1200/mo loose change vs regular rent"
        // Cue 196-203 (565.204s - 595.404s / t=24.850s - 55.050s): "outsource biological discipline to concierge doctors"
        // Cue 204-210 (595.404s - 625.004s / t=55.050s - 84.650s): "person who can fit inside a #10 business envelope"
        // Cue 211-218 (625.004s - 644.080s / t=84.650s - 103.726s): "eat your sandwich with pride... like and subscribe"
        const isSub1 = sceneTime < 8.000;
        const isSub2 = sceneTime >= 8.000 && sceneTime < 16.000;
        const isSub3 = sceneTime >= 16.000 && sceneTime < 24.850;
        const isSub4 = sceneTime >= 24.850 && sceneTime < 32.000;
        const isSub5 = sceneTime >= 32.000 && sceneTime < 40.000;
        const isSub6 = sceneTime >= 40.000 && sceneTime < 48.000;
        const isSub7 = sceneTime >= 48.000 && sceneTime < 55.050;
        const isSub8 = sceneTime >= 55.050 && sceneTime < 65.000;
        const isSub9 = sceneTime >= 65.000 && sceneTime < 75.000;
        const isSub10 = sceneTime >= 75.000 && sceneTime < 84.650;
        const isSub11 = sceneTime >= 84.650 && sceneTime < 94.000;
        const isSub12 = sceneTime >= 94.000 && sceneTime < 98.000;
        const isSub13 = sceneTime >= 98.000;
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
        if (isSub1 || isSub2 || isSub3 || isSub4) {
            // Billionaire Gold Elevator Puppet Punch Zoom
            camera.cutTo(1260, 520, 1.25);
            hostX = 420;
            hostLean = 8;
            pointTarget = { x: 1260, y: 520 };
            hostExpr = "deadpan_classic";
        }
        else if (isSub5 || isSub6 || isSub7) {
            // $1,200/mo Receipt & Gold Wheelbarrow Punch Zoom
            camera.cutTo(1260, 500, 1.28);
            hostX = 420;
            hostLean = -14;
            pointTarget = { x: 1260, y: 500 };
            hostExpr = "shock_eye_pop";
        }
        else if (isSub8) {
            // Outsource Checklist
            camera.cutTo(1260, 480, 1.25);
            hostX = 440;
            hostLean = 10;
            rightHandProp = "pointer";
            pointTarget = { x: 1260, y: 480 };
            hostExpr = "smug_rock_eyebrow";
        }
        else if (isSub9) {
            // Concierge Butler & Diamond Syringe Punch Zoom
            camera.cutTo(1260, 480, 1.28);
            hostX = 440;
            hostLean = -8;
            pointTarget = { x: 1260, y: 480 };
            hostExpr = "smug_chef_kiss";
        }
        else if (isSub10) {
            // #10 Business Envelope Punch Zoom
            camera.cutTo(1260, 480, 1.30);
            hostX = 440;
            hostLean = 8;
            pointTarget = { x: 1260, y: 480 };
            hostExpr = "confused_squint";
        }
        else if (isSub11) {
            // Reassurance Card & Sandwich
            camera.cutTo(960, 540, 1.15);
            hostX = 440;
            hostLean = -10;
            pointTarget = { x: 1260, y: 480 };
            hostExpr = "smug_rock_eyebrow";
        }
        else {
            // Grand Climax YouTube Subscribe Card Slam
            camera.cutTo(960, 540, 1.20);
            hostX = 440;
            hostLean = 0;
            hostExpr = "smug_finger_guns";
            pointTarget = { x: 960, y: 320 };
        }
        let stickFiguresList = [];
        let bg = `
      <!-- Ultra-Luxury Manhattan Penthouse Skyline Backdrop -->
      <rect x="-4000" y="-4000" width="10000" height="10000" fill="#020617"/>
      
      <!-- Panoramic Night Skyline through Glass -->
      <rect x="150" y="80" width="1620" height="720" rx="14" fill="#0f172a" stroke="#ca8a04" stroke-width="8"/>
      <!-- Distant Glowing Skyscrapers -->
      <polygon points="250,800 250,300 380,300 380,800" fill="#1e293b"/>
      <polygon points="420,800 420,200 560,200 560,800" fill="#334155"/>
      <polygon points="600,800 600,380 720,380 720,800" fill="#1e293b"/>
      <polygon points="760,800 760,150 880,150 880,800" fill="#475569"/>
      <polygon points="920,800 920,280 1060,280 1060,800" fill="#1e293b"/>
      <polygon points="1100,800 1100,220 1240,220 1240,800" fill="#334155"/>
      <polygon points="1280,800 1280,340 1420,340 1420,800" fill="#1e293b"/>

      <!-- Polished Italian White Marble Penthouse Floor -->
      <rect x="-4000" y="800" width="10000" height="4000" fill="#f8fafc"/>
      <line x1="-4000" y1="800" x2="6000" y2="800" stroke="#ca8a04" stroke-width="10"/>
      <line x1="-4000" y1="940" x2="6000" y2="940" stroke="#cbd5e1" stroke-width="4" stroke-dasharray="30 20"/>
    `;
        if (isSub1 || isSub2 || isSub3 || isSub4) {
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
                id: "billionaire_stickman",
                state: {
                    x: 1260,
                    y: 640,
                    scale: 1.30,
                    gender: "male",
                    hairStyle: "male_short",
                    clothes: "suit",
                    expression: "smug_finger_guns",
                    timeSec: sceneTime,
                },
            });
            overlays += renderHandDrawnCircle({ x: 1260, y: 480 }, 190, 120, sceneTime, "ECONOMIC DIVIDE");
        }
        else if (isSub5 || isSub6 || isSub7 || isSub8 || isSub9) {
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
                id: "concierge_doctor",
                state: {
                    x: 1080,
                    y: 640,
                    scale: 1.28,
                    gender: "doctor",
                    hairStyle: "doctor_cap",
                    clothes: "doctor_scrubs",
                    expression: "smug_rock_eyebrow",
                    rightHandProp: "syringe",
                    pointTarget: { x: 1380, y: 550 },
                    timeSec: sceneTime,
                },
            }, {
                id: "penthouse_client",
                state: {
                    x: 1400,
                    y: 640,
                    scale: 1.25,
                    gender: "female",
                    hairStyle: "female_blonde",
                    clothes: "bathrobe",
                    expression: "blissful_serenity",
                    timeSec: sceneTime,
                },
            });
            overlays += renderActionLines({ x: 1260, y: 480 }, 240, sceneTime);
        }
        else if (isSub10) {
            bg += `
        <!-- Giant #10 White Business Envelope -->
        <g transform="translate(1260, 560)" filter="url(#cardShadow)">
          <rect x="-180" y="-80" width="360" height="180" rx="10" fill="#ffffff" stroke="#94a3b8" stroke-width="5"/>
          <polygon points="-180,-80 0,20 180,-80" fill="none" stroke="#94a3b8" stroke-width="4"/>
          <text x="0" y="75" font-family="'Impact', sans-serif" font-size="20" fill="#be185d" text-anchor="middle">
            #10 BUSINESS ENVELOPE (FITS 1 CELEB)
          </text>
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
                    pointTarget: { x: 1260, y: 500 },
                    expression: hostExpr,
                },
            }, {
                id: "envelope_female",
                state: {
                    x: 1260,
                    y: 600,
                    scale: 1.15,
                    gender: "female",
                    hairStyle: "female_bob",
                    clothes: "dress_pink",
                    expression: "smug_peace_sign",
                    timeSec: sceneTime,
                },
            });
            overlays += renderHandDrawnCircle({ x: 1260, y: 480 }, 190, 100, sceneTime, "FITS IN ENVELOPE");
        }
        else {
            const isClicked = Math.sin(sceneTime * 6) > 0;
            bg += `
        <g transform="translate(960, 320)" filter="url(#cardShadow)">
          <rect x="-220" y="-130" width="440" height="260" rx="18" fill="#0f172a" stroke="#ef4444" stroke-width="6"/>
          <g transform="translate(0, -35) scale(${isClicked ? 0.95 : 1})">
            <rect x="-150" y="-35" width="300" height="70" rx="35" fill="#dc2626" filter="url(#glow)"/>
            <text x="0" y="10" font-family="'Impact', sans-serif" font-size="30" fill="#ffffff" letter-spacing="2" text-anchor="middle">
              ${isClicked ? "SUBSCRIBED ✓" : "SUBSCRIBE"}
            </text>
          </g>
          <polygon points="40,-5 40,35 52,24 66,48 78,42 64,18 84,18" fill="#ffffff" stroke="#000" stroke-width="2"/>
          <text x="0" y="65" font-family="'Patrick Hand', cursive, sans-serif" font-size="26" fill="#cbd5e1" text-anchor="middle">
            (Or don't. I'm not your dad.)
          </text>
        </g>
      `;
            stickFiguresList.push({
                id: "host_stick",
                state: {
                    x: 480,
                    y: hostY,
                    scale: 1.34,
                    timeSec: sceneTime,
                    spineLean: hostLean,
                    rightHandProp: "bread",
                    expression: "smug_finger_guns",
                    pointTarget: { x: 960, y: 320 },
                },
            });
            overlays += renderActionLines({ x: 960, y: 320 }, 220, sceneTime);
        }
        return {
            backgroundSvg: bg + overlays,
            stickFigures: stickFiguresList,
            shake: 0,
        };
    },
};

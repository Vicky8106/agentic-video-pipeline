import { renderCaliperRig } from "../character/PropRigs";
import { renderHandDrawnArrow, renderHandDrawnCircle, renderActionLines } from "../anim/ComicMarkups";
export const Scene03_Celebrities = {
    id: "scene_03_celebrities",
    name: "Jenna Ortega, Emma Stone, Ariana & Cheekbone Calipers",
    startTime: 15.334,
    endTime: 22.805,
    render(ctx) {
        const { sceneTime, camera } = ctx;
        // 1-2-3-4-5-6 CONTINUOUS BEATS:
        // Beat 1 (0.0s - 1.2s): Host introduces celebrities.
        // Beat 2 (1.2s - 3.36s): Jenna Ortega pops in with squash-stretch.
        // Beat 3 (3.36s - 4.66s): Emma Stone pops in next to Jenna.
        // Beat 4 (4.66s - 5.86s): Ariana Grande pops in on right.
        // Beat 5 (5.86s - 6.88s): Host physically walks over with Caliper and clamps cheekbones down to 0.02mm with laser target.
        // Beat 6 (6.88s - 7.47s): Host shock eye-pop reaction.
        const isHostIntro = sceneTime < 1.2;
        const showJenna = sceneTime >= 1.2;
        const showEmma = sceneTime >= 3.36;
        const showAriana = sceneTime >= 4.666;
        const showCaliper = sceneTime >= 5.866;
        const isReactionClimax = sceneTime >= 6.88;
        let hostX = 360;
        let hostLean = 0;
        let hostExpr = "deadpan_classic";
        let isWalking = false;
        let pointTarget = undefined;
        let rightHandProp = "none";
        let overlays = "";
        // Camera Choreography - 16:9 Staging (Always keep Host + Celebrities in frame!)
        if (isHostIntro) {
            camera.setTarget(960, 540, 1.05);
            hostX = 440;
        }
        else if (!showEmma) {
            camera.setTarget(960, 540, 1.05);
            hostX = 420;
            hostLean = 8;
            pointTarget = { x: 750, y: 500 };
            hostExpr = "skeptical_side_eye";
        }
        else if (!showAriana) {
            camera.setTarget(960, 540, 1.08);
            hostX = 420;
            pointTarget = { x: 1100, y: 500 };
            hostExpr = "confused_squint";
        }
        else if (!showCaliper) {
            camera.setTarget(960, 540, 1.08);
            hostX = 420;
            pointTarget = { x: 1460, y: 500 };
            hostExpr = "confused_tilted_head";
        }
        else if (!isReactionClimax) {
            camera.setTarget(960, 540, 1.15);
            hostX = 440;
            hostLean = 14;
            isWalking = false;
            rightHandProp = "caliper";
            pointTarget = { x: 1460, y: 450 };
            hostExpr = "confused_squint";
        }
        else {
            camera.cutTo(440, 540, 1.35);
            hostX = 440;
            hostLean = -10;
            hostExpr = "shock_eye_pop";
        }
        let bg = `
      <!-- Beverly Hills Vanity Salon Backdrop -->
      <rect x="-4000" y="-4000" width="10000" height="10000" fill="#fdf2f8"/>
      
      <!-- Striped Salon Wallpaper -->
      <path d="M 0,0 L 2000,0" stroke="#fbcfe8" stroke-width="40" stroke-dasharray="40 80"/>
      
      <!-- 3 Arched Vanity Dressing Mirrors -->
      <!-- Mirror 1 (Jenna) -->
      <path d="M 600 800 L 600 320 A 150 150 0 0 1 900 320 L 900 800 Z" fill="#e0f2fe" stroke="#f472b6" stroke-width="8" opacity="0.6"/>
      <!-- Mirror 2 (Emma) -->
      <path d="M 950 800 L 950 320 A 150 150 0 0 1 1250 320 L 1250 800 Z" fill="#e0f2fe" stroke="#34d399" stroke-width="8" opacity="0.6"/>
      <!-- Mirror 3 (Ariana) -->
      <path d="M 1310 800 L 1310 320 A 150 150 0 0 1 1610 320 L 1610 800 Z" fill="#e0f2fe" stroke="#a78bfa" stroke-width="8" opacity="0.6"/>

      <!-- Glowing Vanity Marquee Light Bulbs -->
      ${[600, 650, 750, 850, 900, 950, 1000, 1100, 1200, 1250, 1310, 1360, 1460, 1560, 1610].map(bx => `
        <circle cx="${bx}" cy="200" r="10" fill="#fef08a" stroke="#ca8a04" stroke-width="2" filter="url(#glow)"/>
      `).join("")}

      <!-- Gold Trim Baseboard & Velvet Floor -->
      <rect x="-4000" y="800" width="10000" height="4000" fill="#831843"/>
      <line x1="-4000" y1="800" x2="6000" y2="800" stroke="#facc15" stroke-width="10"/>
    `;
        // 1. Jenna Ortega (enters at 1.2s on "Jenna Ortega" with squash-stretch)
        if (showJenna) {
            bg += `
        <!-- Character Label Card -->
        <g transform="translate(750, 260)">
          <rect x="-120" y="-25" width="240" height="50" rx="10" fill="#0f172a" stroke="#dc2626" stroke-width="4" filter="url(#cardShadow)"/>
          <text x="0" y="8" font-family="'Impact', sans-serif" font-size="20" fill="#ffffff" letter-spacing="1" text-anchor="middle">
            JENNA ORTEGA
          </text>
        </g>
      `;
        }
        // 2. Emma Stone (enters at 3.36s on "Emma Stone" with squash-stretch)
        if (showEmma) {
            bg += `
        <!-- Character Label Card -->
        <g transform="translate(1100, 260)">
          <rect x="-120" y="-25" width="240" height="50" rx="10" fill="#064e3b" stroke="#10b981" stroke-width="4" filter="url(#cardShadow)"/>
          <text x="0" y="8" font-family="'Impact', sans-serif" font-size="20" fill="#ffffff" letter-spacing="1" text-anchor="middle">
            EMMA STONE
          </text>
        </g>
      `;
        }
        // 3. Ariana Grande (enters at 4.666s on "Ariana Grande" with squash-stretch)
        if (showAriana) {
            bg += `
        <!-- Character Label Card -->
        <g transform="translate(1460, 260)">
          <rect x="-120" y="-25" width="240" height="50" rx="10" fill="#581c87" stroke="#c084fc" stroke-width="4" filter="url(#cardShadow)"/>
          <text x="0" y="8" font-family="'Impact', sans-serif" font-size="20" fill="#ffffff" letter-spacing="1" text-anchor="middle">
            ARIANA GRANDE
          </text>
        </g>
      `;
        }
        // 4. Digital Calipers Clamping Cheekbones
        if (showCaliper) {
            const clampElapsed = sceneTime - 5.866;
            const caliperClamp = Math.min(1, clampElapsed / 0.4);
            const jawGap = 65 - caliperClamp * 42;
            const currentVal = caliperClamp < 1
                ? ((1 - caliperClamp) * 14.4 + 0.02).toFixed(2) + " mm"
                : "0.02 mm";
            bg += `
        <!-- Forensic Radar Target Grid on Cheekbones -->
        <g stroke="#ef4444" stroke-width="2.5" opacity="0.75">
          <circle cx="1460" cy="500" r="95" fill="none" stroke-dasharray="8 6"/>
          <line x1="1340" y1="500" x2="1580" y2="500"/>
          <line x1="1460" y1="380" x2="1460" y2="620"/>
        </g>

        <!-- Mechanical Digital Caliper Rig -->
        ${renderCaliperRig({
                x: 1460,
                y: 450,
                scale: 1.8,
                jawGap: jawGap,
                lcdValue: currentVal,
                laserActive: true,
                timeSec: sceneTime,
            })}
      `;
            if (sceneTime > 6.2) {
                overlays += renderHandDrawnCircle({ x: 1460, y: 450 }, 140, 90, sceneTime, "FAT: ZERO");
                overlays += renderHandDrawnArrow({ x: 1200, y: 380 }, { x: 1400, y: 440 }, sceneTime);
            }
        }
        if (isReactionClimax) {
            overlays += renderActionLines({ x: 650, y: 560 }, 160, sceneTime);
        }
        const hostFigure = {
            id: "host_stick",
            state: {
                x: hostX,
                y: 650,
                scale: 1.34,
                timeSec: sceneTime,
                spineLean: hostLean,
                isWalking: isWalking,
                rightHandProp: rightHandProp,
                pointTarget: pointTarget,
                expression: hostExpr,
                gazeTarget: pointTarget || { x: 960, y: 630 },
            },
        };
        let celebFigures = [hostFigure];
        if (showJenna) {
            celebFigures.push({
                id: "jenna_stick",
                state: {
                    x: 750,
                    y: 640,
                    scale: 1.25,
                    gender: "female",
                    hairStyle: "female_bob",
                    clothes: "dress_black",
                    expression: "deadpan_soul_stare",
                    timeSec: sceneTime,
                },
            });
        }
        if (showEmma) {
            celebFigures.push({
                id: "emma_stick",
                state: {
                    x: 1100,
                    y: 640,
                    scale: 1.25,
                    gender: "female",
                    hairStyle: "female_blonde",
                    clothes: "dress_pink",
                    expression: "smug_chef_kiss",
                    timeSec: sceneTime,
                },
            });
        }
        if (showAriana) {
            celebFigures.push({
                id: "ariana_stick",
                state: {
                    x: 1460,
                    y: 640,
                    scale: 1.25,
                    gender: "female",
                    hairStyle: "female_ponytail",
                    clothes: "crop_top_leggings",
                    expression: showCaliper ? "cringe_teeth_grit" : "smug_peace_sign",
                    timeSec: sceneTime,
                },
            });
        }
        return {
            backgroundSvg: bg + overlays,
            stickFigures: celebFigures,
        };
    },
};

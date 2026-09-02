import { renderPaparazzi } from "../character/CartoonCast";
import { popInSquash, slamDrop, floatingHover } from "../anim/ObjectMotion";
import { renderHandDrawnArrow, renderHandDrawnCircle, renderActionLines } from "../anim/ComicMarkups";
export const Scene01_Ecosystem = {
    id: "scene_01_ecosystem",
    name: "Hollywood Red Carpet & Instagram Ecosystem",
    startTime: 0.0,
    endTime: 8.620,
    render(ctx) {
        const { sceneTime, camera } = ctx;
        // Word-Level Timestamps from 0-chapter-1.srt:
        // 0.0s: "If you've looked at a red carpet..." -> Red carpet & paparazzi established.
        // 1.0s: "...a movie screen..." -> Movie Cinema Clapperboard drops on Stage Right.
        // 2.0s: "...or your Instagram feed..." -> Giant Instagram Phone drops next to Clapperboard.
        // 4.8s: "...slight shift in the local Hollywood ecosystem." -> Downsized Zero Calories Billboard slams on top!
        // 7.5s: Comedic punchline hold & host deadpan reaction.
        const hasClapper = sceneTime >= 1.0;
        const hasPhone = sceneTime >= 2.0;
        const hasBillboard = sceneTime >= 4.8;
        const isReaction = sceneTime >= 7.5;
        let hostX = 360;
        let hostY = 650;
        let hostLean = 0;
        let hostExpr = "deadpan_classic";
        let isWalking = false;
        let pointTarget = undefined;
        let shakeAmt = 0;
        let overlays = "";
        // Base Staging: Red carpet runway & Paparazzi flashes
        const flashL = Math.sin(sceneTime * 18) > 0.3;
        const flashR = Math.cos(sceneTime * 22) > 0.3;
        let bg = `
      <!-- Infinite full-bleed backdrop -->
      <rect x="-4000" y="-4000" width="10000" height="10000" fill="#f8fafc"/>
      <line x1="-4000" y1="840" x2="6000" y2="840" stroke="#e2e8f0" stroke-width="4"/>

      <!-- Hollywood Hills Backdrop -->
      <path d="M -1000 540 Q 400 360 1000 500 T 2600 400 L 2600 840 L -1000 840 Z" fill="#e2e8f0"/>

      <!-- Red Carpet Runway & Gold Stanchions -->
      <polygon points="300,840 960,520 1620,840" fill="#dc2626"/>
      <line x1="300" y1="840" x2="960" y2="520" stroke="#b91c1c" stroke-width="6"/>
      <line x1="1620" y1="840" x2="960" y2="520" stroke="#b91c1c" stroke-width="6"/>

      <!-- Gold Stanchions -->
      <line x1="260" y1="670" x2="520" y2="630" stroke="#991b1b" stroke-width="8"/>
      <line x1="1660" y1="630" x2="1400" y2="670" stroke="#991b1b" stroke-width="8"/>
      <circle cx="260" cy="560" r="18" fill="#eab308" stroke="#ca8a04" stroke-width="4"/>
      <line x1="260" y1="560" x2="260" y2="840" stroke="#eab308" stroke-width="8"/>
      <circle cx="1660" cy="560" r="18" fill="#eab308" stroke="#ca8a04" stroke-width="4"/>
      <line x1="1660" y1="560" x2="1660" y2="840" stroke="#eab308" stroke-width="8"/>

      <!-- Paparazzi flashing in background -->
      <g transform="translate(140, 640) scale(1.15)">
        ${renderPaparazzi(0, 0, flashL)}
      </g>
      <g transform="translate(1780, 640) scale(1.15)">
        ${renderPaparazzi(0, 0, flashR)}
      </g>
    `;
        // CUMULATIVE ASSET 1: Movie Cinema Clapperboard (Enters at t=1.0s)
        if (hasClapper) {
            const clapPop = popInSquash(sceneTime - 1.0, 0.32, { x: 1040, y: 440 });
            bg += `
        <g transform="translate(${clapPop.x}, ${clapPop.y}) scale(${clapPop.scaleX * 1.3}, ${clapPop.scaleY * 1.3})" opacity="${clapPop.opacity}" filter="url(#cardShadow)">
          <rect x="-90" y="-60" width="180" height="130" rx="10" fill="#0f172a" stroke="#ffffff" stroke-width="4"/>
          <!-- Diagonal zebra stripes -->
          <polygon points="-90,-60 -50,-60 -70,-35 -90,-35" fill="#ffffff"/>
          <polygon points="-30,-60 10,-60 -10,-35 -50,-35" fill="#ffffff"/>
          <polygon points="30,-60 70,-60 50,-35 10,-35" fill="#ffffff"/>
          <text x="0" y="0" font-family="'Impact', sans-serif" font-size="18" fill="#facc15" text-anchor="middle">HOLLYWOOD</text>
          <text x="0" y="25" font-family="'Courier New', monospace" font-size="13" font-weight="bold" fill="#ffffff" text-anchor="middle">SCENE 1: REDUX</text>
        </g>
      `;
        }
        // CUMULATIVE ASSET 2: Giant Instagram Phone Post (Enters at t=2.0s alongside Clapperboard)
        if (hasPhone) {
            const phonePop = popInSquash(sceneTime - 2.0, 0.35, { x: 1420, y: 450 });
            const hover = floatingHover(sceneTime, 2.5, 3);
            bg += `
        <g transform="translate(${phonePop.x}, ${phonePop.y + hover.dy}) scale(${phonePop.scaleX * 1.15}, ${phonePop.scaleY * 1.15})" opacity="${phonePop.opacity}" filter="url(#cardShadow)">
          <rect x="-160" y="-270" width="320" height="540" rx="34" fill="#0f172a" stroke="#334155" stroke-width="6"/>
          <rect x="-145" y="-235" width="290" height="470" rx="18" fill="#ffffff"/>
          <g transform="translate(-120, -200)">
            <circle cx="16" cy="16" r="16" fill="#ec4899"/>
            <text x="40" y="22" font-family="sans-serif" font-size="14" font-weight="bold" fill="#0f172a">@celeb_life</text>
          </g>
          <!-- Celery Stick Feast -->
          <rect x="-120" y="-150" width="240" height="190" rx="8" fill="#f0fdf4" stroke="#dcfce7" stroke-width="2"/>
          <line x1="-70" y1="25" x2="70" y2="-25" stroke="#16a34a" stroke-width="14" stroke-linecap="round"/>
          <text x="0" y="18" font-family="'Impact', sans-serif" font-size="14" fill="#15803d" text-anchor="middle">DINNER: 1 CELERY</text>
          <g transform="translate(-110, 80)">
            <path d="M 0 0 C -6 -10 -18 0 0 16 C 18 0 6 -10 0 0 Z" fill="#ef4444"/>
            <text x="25" y="12" font-family="sans-serif" font-size="16" font-weight="bold" fill="#0f172a">2.4M likes</text>
          </g>
        </g>
      `;
            if (sceneTime < 4.8) {
                overlays += renderHandDrawnCircle({ x: 1420, y: 390 }, 130, 95, sceneTime, "FEASTING");
                overlays += renderHandDrawnArrow({ x: 600, y: 520 }, { x: 1250, y: 420 }, sceneTime);
            }
        }
        // CUMULATIVE ASSET 3: Downsized Ecosystem Billboard (Slams on top at t=4.8s)
        if (hasBillboard) {
            const slam = slamDrop(sceneTime - 4.8, 0.22, { x: 1240, y: 240 }, 360);
            if (slam.impactOccurred && sceneTime < 5.3) {
                shakeAmt = slam.screenShake;
            }
            bg += `
        <g transform="translate(${slam.x}, ${slam.y}) scale(${slam.scaleX * 1.05}, ${slam.scaleY * 1.05})" opacity="${slam.opacity}" filter="url(#cardShadow)">
          <line x1="-240" y1="-260" x2="-240" y2="-60" stroke="#475569" stroke-width="7" stroke-dasharray="14 8"/>
          <line x1="240" y1="-260" x2="240" y2="-60" stroke="#475569" stroke-width="7" stroke-dasharray="14 8"/>
          <rect x="-290" y="-60" width="580" height="130" rx="16" fill="#0f172a" stroke="#ef4444" stroke-width="7"/>
          <text x="0" y="-10" font-family="'Impact', sans-serif" font-size="38" fill="#ffffff" letter-spacing="3" text-anchor="middle">
            HOLLYWOOD ECOSYSTEM
          </text>
          <text x="0" y="38" font-family="'Courier New', monospace" font-size="20" font-weight="bold" fill="#facc15" text-anchor="middle">
            [ DOWNSIZED TO ZERO CALORIES ]
          </text>
        </g>
      `;
            if (sceneTime < 7.5) {
                overlays += renderActionLines({ x: 1240, y: 240 }, 260, sceneTime);
            }
        }
        // Stickman Acting & Gaze Direction across all 4 beats
        if (!hasClapper) {
            // 0.0 - 1.0s: Host walking onto stage
            const walkProg = Math.min(1, sceneTime / 1.0);
            hostX = 260 + walkProg * 140;
            isWalking = walkProg < 1;
            hostExpr = "deadpan_classic";
        }
        else if (hasClapper && !hasPhone) {
            // 1.0 - 2.0s: Host notices Movie Clapperboard
            hostX = 400;
            hostLean = 6;
            hostExpr = "confused_squint";
            pointTarget = { x: 1040, y: 440 };
        }
        else if (hasPhone && !hasBillboard) {
            // 2.0 - 4.8s: Host points at Instagram Phone
            hostX = 420;
            hostLean = 10;
            hostExpr = "skeptical_side_eye";
            pointTarget = { x: 1420, y: 420 };
        }
        else if (hasBillboard && !isReaction) {
            // 4.8 - 7.5s: Host shock flinch pointing at Billboard
            hostX = 420;
            hostLean = -14;
            hostExpr = "shock_eye_pop";
            pointTarget = { x: 1240, y: 240 };
        }
        else {
            // 7.5 - 8.62s: Host deadpan reaction punch-in
            camera.cutTo(420, 540, 1.35);
            hostX = 420;
            hostLean = 0;
            hostExpr = "deadpan_slow_blink";
            pointTarget = undefined;
        }
        const hostFigure = {
            id: "host_stick",
            state: {
                x: hostX,
                y: hostY,
                scale: 1.34,
                timeSec: sceneTime,
                spineLean: hostLean,
                expression: hostExpr,
                isWalking: isWalking,
                pointTarget: pointTarget,
                gazeTarget: pointTarget,
            },
        };
        const redCarpetModel = {
            id: "red_carpet_model",
            state: {
                x: 960,
                y: 640,
                scale: 1.25,
                gender: "female",
                hairStyle: "female_long",
                clothes: "dress_pink",
                expression: isReaction ? "smug_peace_sign" : "smug_chef_kiss",
                pose: "waving",
                timeSec: sceneTime,
            },
        };
        return {
            backgroundSvg: bg + overlays,
            stickFigures: [hostFigure, redCarpetModel],
            shake: 0,
        };
    },
};

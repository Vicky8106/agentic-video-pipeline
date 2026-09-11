import { renderFlyingCarbs } from "../character/CartoonCast";
import { renderSaaSModalRig } from "../character/PropRigs";
import { slamDrop } from "../anim/ObjectMotion";
import { renderHandDrawnArrow, renderActionLines } from "../anim/ComicMarkups";
export const Scene04_Unsubscribe = {
    id: "scene_04_unsubscribe",
    name: "Unsubscribe from Carbs & Cancel Lunch",
    startTime: 22.805,
    endTime: 32.967,
    render(ctx) {
        const { sceneTime, camera } = ctx;
        const hasFlyingCarbs = sceneTime >= 3.2;
        const hasModal = sceneTime >= 5.8;
        const hasStamp = sceneTime >= 7.12;
        const isReaction = sceneTime >= 9.60;
        let hostX = 420;
        let hostY = 650;
        let hostLean = 0;
        let hostExpr = "deadpan_classic";
        let isWalking = false;
        let pointTarget = undefined;
        let leftHandTarget = undefined;
        let shakeAmt = 0;
        let overlays = "";
        if (!hasFlyingCarbs) {
            camera.setTarget(960, 540, 1.05);
            hostX = 420;
            hostLean = 0;
            hostExpr = "deadpan_classic";
            pointTarget = { x: 1380, y: 570 };
        }
        else if (hasFlyingCarbs && !hasModal) {
            camera.setTarget(960, 540, 1.08);
            hostX = 420;
            hostLean = 16;
            hostExpr = "crying_waterfalls";
            leftHandTarget = { x: 1380, y: 320 };
            pointTarget = { x: 1380, y: 380 };
        }
        else if (hasModal && !hasStamp) {
            camera.setTarget(960, 540, 1.08);
            hostX = 420;
            hostLean = 0;
            hostExpr = "shock_home_alone";
            pointTarget = { x: 1380, y: 440 };
        }
        else if (hasStamp && !isReaction) {
            camera.setTarget(960, 540, 1.15);
            const blowProg = Math.min(1, (sceneTime - 7.12) / 0.3);
            hostX = 420 - blowProg * 120;
            hostLean = -22;
            hostExpr = "fear_screaming";
            pointTarget = { x: 1380, y: 480 };
        }
        else {
            camera.cutTo(420, 540, 1.35);
            hostX = 300;
            hostLean = 0;
            hostExpr = "deadpan_slow_blink";
            pointTarget = undefined;
        }
        let bg = `
      <!-- Italian Restaurant Trattoria Backdrop -->
      <rect x="-4000" y="-4000" width="10000" height="10000" fill="#fdf2f8"/>
      
      <!-- Rustic Warm Brick Walls & Archway -->
      <rect x="150" y="80" width="1620" height="720" rx="14" fill="#991b1b" stroke="#7f1d1d" stroke-width="8"/>
      <!-- Brick mortar lines -->
      ${[160, 240, 320, 400, 480, 560, 640, 720].map(by => `
        <line x1="150" y1="${by}" x2="1770" y2="${by}" stroke="#7f1d1d" stroke-width="4"/>
      `).join("")}

      <!-- Chalkboard Daily Specials Menu on Wall -->
      <g transform="translate(420, 240)">
        <rect x="-140" y="-80" width="280" height="160" rx="8" fill="#064e3b" stroke="#78350f" stroke-width="8" filter="url(#cardShadow)"/>
        <text x="0" y="-45" font-family="'Impact', sans-serif" font-size="20" fill="#facc15" text-anchor="middle">MENU DEL GIORNO</text>
        <line x1="-110" y1="-30" x2="110" y2="-30" stroke="#facc15" stroke-width="2"/>
        <text x="0" y="-5" font-family="serif" font-size="16" fill="#ffffff" text-anchor="middle">1. Pizza Margherita</text>
        <text x="0" y="25" font-family="serif" font-size="16" fill="#ffffff" text-anchor="middle">2. Fresh Sourdough Bread</text>
        <text x="0" y="55" font-family="serif" font-size="16" fill="#f87171" font-weight="bold" text-anchor="middle">[UNSUBSCRIBED]</text>
      </g>

      <!-- Overhead Warm Restaurant Lamp & Cone of Light -->
      <g transform="translate(1380, 0)">
        <line x1="0" y1="0" x2="0" y2="160" stroke="#334155" stroke-width="5"/>
        <path d="M -70 160 Q 0 120 70 160 Z" fill="#78350f" stroke="#451a03" stroke-width="4"/>
        <polygon points="-70,160 70,160 380,780 -380,780" fill="#fef08a" opacity="0.22"/>
      </g>

      <!-- Restaurant Terracotta Tile Floor -->
      <rect x="-4000" y="780" width="10000" height="4000" fill="#7c2d12"/>
      <line x1="-4000" y1="780" x2="6000" y2="780" stroke="#451a03" stroke-width="8"/>

      <!-- Red & White Checkered Restaurant Table -->
      <ellipse cx="1380" cy="840" rx="340" ry="30" fill="#000000" opacity="0.25"/>
      <line x1="1120" y1="650" x2="1100" y2="840" stroke="#78350f" stroke-width="14" stroke-linecap="round"/>
      <line x1="1640" y1="650" x2="1660" y2="840" stroke="#78350f" stroke-width="14" stroke-linecap="round"/>
      <!-- Checkered Table Top -->
      <ellipse cx="1380" cy="650" rx="340" ry="95" fill="#dc2626" stroke="#b91c1c" stroke-width="7" filter="url(#cardShadow)"/>
      <path d="M 1040 650 Q 1380 550 1720 650 Q 1380 750 1040 650 Z" fill="#ffffff" opacity="0.4" stroke="#dc2626" stroke-width="10" stroke-dasharray="30 30"/>
    `;
        // CUMULATIVE 1: Artisan Pizza & Sourdough on table
        const steamY1 = -20 - ((sceneTime * 40) % 80);
        const steamY2 = -30 - (((sceneTime + 0.6) * 35) % 80);
        bg += `
      <g transform="translate(1380, 570) scale(1.4)">
        <polygon points="-80,20 -10,-40 30,30" fill="#f59e0b" stroke="#b45309" stroke-width="4"/>
        <circle cx="-35" cy="0" r="8" fill="#ef4444"/>
        <circle cx="-10" cy="15" r="7" fill="#ef4444"/>
        <ellipse cx="60" cy="0" rx="55" ry="30" fill="#d97706" stroke="#78350f" stroke-width="4"/>
        <path d="M 30 -10 Q 60 -25 90 -10" stroke="#fde68a" stroke-width="3" fill="none"/>
        <path d="M -30 ${steamY1} Q -40 ${steamY1 - 20} -25 ${steamY1 - 40}" fill="none" stroke="#cbd5e1" stroke-width="3" stroke-linecap="round" opacity="0.6"/>
        <path d="M 60 ${steamY2} Q 50 ${steamY2 - 20} 65 ${steamY2 - 40}" fill="none" stroke="#cbd5e1" stroke-width="3" stroke-linecap="round" opacity="0.6"/>
      </g>
    `;
        // CUMULATIVE 2: Ascending Flying Carbs with Angel Wings (t >= 3.2s)
        if (hasFlyingCarbs) {
            const ascendY = Math.max(160, 520 - (sceneTime - 3.2) * 85);
            const godRayPulse = 0.22 + Math.sin(sceneTime * 4) * 0.08;
            bg += `
        <!-- Heavenly Spotlight Rays -->
        <polygon points="1380,-200 980,840 1780,840" fill="#fef08a" opacity="${godRayPulse}"/>
        ${renderFlyingCarbs(1380, ascendY, sceneTime)}
      `;
            if (!hasModal) {
                overlays += renderHandDrawnArrow({ x: 900, y: 560 }, { x: 1300, y: ascendY + 20 }, sceneTime, "GOODBYE PIZZA");
            }
        }
        // CUMULATIVE 3 & 4: SaaS Cancel Lunch Modal & Giant Stamp Slam
        if (hasModal) {
            const stampProg = hasStamp ? Math.min(1, (sceneTime - 7.12) / 0.35) : 0;
            if (hasStamp) {
                const slam = slamDrop(sceneTime - 7.12, 0.22, { x: 1380, y: 460 }, 380);
                if (slam.impactOccurred && sceneTime < 7.6) {
                    shakeAmt = slam.screenShake;
                }
            }
            bg += `
        ${renderSaaSModalRig({
                x: 1380,
                y: 460,
                scale: 1.25,
                isCancelled: hasStamp,
                stampProgress: stampProg,
                timeSec: sceneTime,
            })}
      `;
            if (hasStamp && sceneTime < 8.5) {
                overlays += renderActionLines({ x: 1380, y: 460 }, 280, sceneTime);
            }
        }
        const hostFigure = {
            id: "host_stick",
            state: {
                x: hostX,
                y: hostY,
                scale: 1.34,
                timeSec: sceneTime,
                spineLean: hostLean,
                isWalking: isWalking,
                pointTarget: pointTarget,
                leftHandTarget: leftHandTarget,
                expression: hostExpr,
                gazeTarget: pointTarget || leftHandTarget,
            },
        };
        const waiterFigure = {
            id: "waiter_stick",
            state: {
                x: 1600,
                y: 640,
                scale: 1.25,
                gender: "male",
                hairStyle: "male_short",
                clothes: "suit",
                expression: hasStamp ? "fear_panic_run" : "shock_eye_pop",
                timeSec: sceneTime,
            },
        };
        return {
            backgroundSvg: bg + overlays,
            stickFigures: [hostFigure, waiterFigure],
            shake: 0,
        };
    },
};

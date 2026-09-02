import { particleBurst, floatingHover } from "../anim/ObjectMotion";
import { cubicInOut } from "../anim/Easing";
import { renderHandDrawnArrow, renderHandDrawnCircle, renderActionLines } from "../anim/ComicMarkups";
export const Scene02_TechBro = {
    id: "scene_02_techbro",
    name: "Thicc to Stick & Tech Bro Pivot",
    startTime: 8.620,
    endTime: 15.334,
    render(ctx) {
        const { sceneTime, camera } = ctx;
        const isDragging = sceneTime >= 1.2 && sceneTime < 3.28;
        const isPoof = sceneTime >= 3.28 && sceneTime < 4.68;
        const isAI = sceneTime >= 4.68;
        const isReaction = sceneTime >= 6.16;
        let shakeAmt = 0;
        let overlays = "";
        const sliderNorm = sceneTime < 1.2 ? 0 : Math.min(1, (sceneTime - 1.2) / 1.5);
        const sliderProgress = cubicInOut(sliderNorm);
        const sliderX = 720 + sliderProgress * 540;
        let hostX = 420;
        let hostLean = 0;
        let hostExpr = "deadpan_classic";
        let isWalking = false;
        let pointTarget = undefined;
        let leftHandTarget = undefined;
        if (isDragging) {
            camera.setTarget(960, 540, 1.08);
            hostX = 420 + sliderProgress * 180;
            hostLean = 14;
            isWalking = true;
            hostExpr = "frustration_groan";
            leftHandTarget = { x: sliderX, y: 185 };
        }
        else if (isPoof) {
            camera.setTarget(960, 540, 1.08);
            hostX = 420;
            hostLean = -14;
            hostExpr = "shock_eye_pop";
            pointTarget = { x: 1380, y: 500 };
        }
        else if (isAI && !isReaction) {
            camera.setTarget(960, 540, 1.05);
            hostX = 420;
            hostLean = 8;
            hostExpr = "smug_rock_eyebrow";
            pointTarget = { x: 1260, y: 240 };
        }
        else {
            camera.cutTo(420, 540, 1.35);
            hostX = 420;
            hostLean = 0;
            hostExpr = "smug_finger_guns";
            pointTarget = undefined;
        }
        let bg = `
      <!-- Silicon Valley Tech Loft Backdrop -->
      <rect x="-4000" y="-4000" width="10000" height="10000" fill="#f1f5f9"/>
      
      <!-- San Francisco Skyline through Glass Window -->
      <rect x="200" y="100" width="1520" height="600" rx="20" fill="#e0f2fe" stroke="#94a3b8" stroke-width="8"/>
      <!-- City Silhouettes -->
      <polygon points="300,700 300,320 420,320 420,700" fill="#cbd5e1"/>
      <polygon points="450,700 450,220 540,160 630,220 630,700" fill="#94a3b8"/> <!-- Transamerica Pyramid -->
      <polygon points="660,700 660,280 780,280 780,700" fill="#cbd5e1"/>
      <polygon points="800,700 800,180 920,180 920,700" fill="#64748b"/> <!-- Salesforce Tower -->
      <polygon points="950,700 950,340 1080,340 1080,700" fill="#94a3b8"/>
      <polygon points="1120,700 1120,260 1260,260 1260,700" fill="#cbd5e1"/>

      <!-- Window Panes Grid -->
      <line x1="200" y1="380" x2="1720" y2="380" stroke="#94a3b8" stroke-width="6"/>
      <line x1="700" y1="100" x2="700" y2="700" stroke="#94a3b8" stroke-width="6"/>
      <line x1="1220" y1="100" x2="1220" y2="700" stroke="#94a3b8" stroke-width="6"/>

      <!-- Server Rack on Far Left -->
      <g transform="translate(80, 480)">
        <rect x="0" y="0" width="90" height="360" rx="8" fill="#0f172a" stroke="#334155" stroke-width="4"/>
        <line x1="10" y1="60" x2="80" y2="60" stroke="#334155" stroke-width="3"/>
        <line x1="10" y1="120" x2="80" y2="120" stroke="#334155" stroke-width="3"/>
        <line x1="10" y1="180" x2="80" y2="180" stroke="#334155" stroke-width="3"/>
        <line x1="10" y1="240" x2="80" y2="240" stroke="#334155" stroke-width="3"/>
        <line x1="10" y1="300" x2="80" y2="300" stroke="#334155" stroke-width="3"/>
        <!-- Blinking LEDs -->
        <circle cx="25" cy="40" r="4" fill="#22c55e" filter="url(#glow)"/>
        <circle cx="45" cy="40" r="4" fill="#06b6d4" filter="url(#glow)"/>
        <circle cx="65" cy="40" r="4" fill="${Math.sin(sceneTime * 12) > 0 ? "#ef4444" : "#3b82f6"}" filter="url(#glow)"/>
      </g>

      <!-- Polished Office Wood Floor -->
      <rect x="-4000" y="800" width="10000" height="4000" fill="#e2e8f0"/>
      <line x1="-4000" y1="800" x2="6000" y2="800" stroke="#cbd5e1" stroke-width="6"/>
      <line x1="-4000" y1="940" x2="6000" y2="940" stroke="#94a3b8" stroke-width="3" stroke-dasharray="24 16"/>

      <!-- PERSISTENT TOP ASSET: Animated Velocity Slider Track -->
      <g transform="translate(0, 170)">
        <rect x="720" y="0" width="540" height="30" rx="15" fill="#e2e8f0" stroke="#0f172a" stroke-width="5" filter="url(#cardShadow)"/>
        <rect x="720" y="0" width="${sliderProgress * 540}" height="30" rx="15" fill="#38bdf8"/>

        <!-- Markers -->
        <circle cx="720" cy="15" r="26" fill="#f43f5e" stroke="#0f172a" stroke-width="5"/>
        <text x="720" y="70" font-family="'Impact', sans-serif" font-size="26" fill="#be123c" text-anchor="middle">"THICC"</text>
        <circle cx="1260" cy="15" r="26" fill="#0284c7" stroke="#0f172a" stroke-width="5"/>
        <text x="1260" y="70" font-family="'Impact', sans-serif" font-size="26" fill="#0369a1" text-anchor="middle">"STICK"</text>

        <!-- Dynamic Knob -->
        <circle cx="${sliderX}" cy="15" r="30" fill="#eab308" stroke="#0f172a" stroke-width="6" filter="url(#glow)"/>
      </g>
    `;
        // CUMULATIVE CHARACTER / PROP ON STAGE RIGHT:
        if (!isPoof && !isAI) {
            if (isDragging) {
                overlays += renderHandDrawnArrow({ x: 740, y: 280 }, { x: sliderX, y: 210 }, sceneTime, "SPEEDRUN");
            }
        }
        else if (isPoof) {
            // 3.28 - 4.68s: Smoke explosion with flying Bitcoin debris
            const burst = particleBurst(sceneTime - 3.28, 14, 0.9, 260);
            bg += `
        <!-- Radial Crypto Shatter Burst -->
        ${burst.map((p, i) => `
          <g transform="translate(${1380 + p.x}, ${500 + p.y}) rotate(${sceneTime * 300 + i * 30})" opacity="${p.opacity}">
            <circle cx="0" cy="0" r="${p.radius + 6}" fill="#f59e0b" stroke="#0f172a" stroke-width="3"/>
            <text x="0" y="5" font-family="sans-serif" font-size="${Math.max(8, p.radius + 2)}" font-weight="bold" fill="#fff" text-anchor="middle">₿</text>
          </g>
        `).join("")}
      `;
            overlays += renderActionLines({ x: 1380, y: 500 }, 240, sceneTime);
        }
        else {
            // 4.68s+: AI Founder in Patagonia Vest + Live Typing Prompt Terminal
            const promptText = `PROMPT: /imagine tech_founder --v 6.0 --no calories`;
            const typedChars = Math.min(promptText.length, Math.floor((sceneTime - 4.68) * 24));
            const currentTyped = promptText.slice(0, typedChars);
            const cursorVisible = Math.sin(sceneTime * 12) > 0;
            const termHover = floatingHover(sceneTime, 2.0, 3);
            bg += `
        <!-- Floating Prompt Window -->
        <g transform="translate(1260, ${260 + termHover.dy})">
          <rect x="-240" y="-60" width="480" height="120" rx="14" fill="#0f172a" stroke="#06b6d4" stroke-width="5" filter="url(#glow)"/>
          <rect x="-225" y="-45" width="450" height="90" rx="8" fill="#1e293b"/>
          <text x="-200" y="-12" font-family="'Courier New', monospace" font-size="17" font-weight="bold" fill="#22d3ee">
            ${currentTyped}${cursorVisible ? "█" : " "}
          </text>
          <text x="-200" y="20" font-family="'Courier New', monospace" font-size="14" fill="#a5f3fc">
            --ar 16:9 --fast --chaos 100
          </text>
        </g>
      `;
            if (sceneTime < 6.16) {
                overlays += renderHandDrawnCircle({ x: 1260, y: 260 }, 260, 70, sceneTime, "PIVOT TO AI");
            }
        }
        const hostFigure = {
            id: "host_stick",
            state: {
                x: hostX,
                y: 650,
                scale: 1.34,
                timeSec: sceneTime,
                spineLean: hostLean,
                expression: hostExpr,
                isWalking: isWalking,
                pointTarget: pointTarget,
                leftHandTarget: leftHandTarget,
                gazeTarget: pointTarget || leftHandTarget || (isPoof ? { x: 1380, y: 500 } : undefined),
            },
        };
        const techBroFigure = {
            id: "tech_bro_figure",
            state: {
                x: isAI ? 1260 : 1380,
                y: 640,
                scale: 1.28,
                gender: "tech_bro",
                hairStyle: "male_short",
                clothes: isAI ? "suit" : "hoodie",
                expression: isPoof ? "fear_screaming" : isAI ? "smug_rock_eyebrow" : "smug_finger_guns",
                timeSec: sceneTime,
            },
        };
        return {
            backgroundSvg: bg + overlays,
            stickFigures: [hostFigure, techBroFigure],
            shake: 0,
        };
    },
};

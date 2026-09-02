import { Scene, SceneRenderContext, SceneRenderOutput } from "./SceneTypes";
import { particleBurst, floatingHover } from "../anim/ObjectMotion";
import { cubicInOut } from "../anim/Easing";
import { renderHandDrawnArrow, renderHandDrawnCircle, renderActionLines } from "../anim/ComicMarkups";

export const Scene02_TechBro: Scene = {
  id: "scene_02_techbro",
  name: "Thicc to Stick & Tech Bro Pivot",
  startTime: 8.620,
  endTime: 15.334,

  render(ctx: SceneRenderContext): SceneRenderOutput {
    const { sceneTime, camera } = ctx;

    const isDragging = sceneTime >= 1.2 && sceneTime < 3.28;
    const isPoof = sceneTime >= 3.28 && sceneTime < 4.68;
    const isAI = sceneTime >= 4.68;
    const isReaction = sceneTime >= 6.16;

    const sliderNorm = sceneTime < 1.2 ? 0 : Math.min(1, (sceneTime - 1.2) / 1.5);
    const sliderProgress = cubicInOut(sliderNorm);
    const sliderX = 720 + sliderProgress * 480;

    let overlays = "";

    // Dynamic Camera Tracking & Zooms
    if (isDragging) {
      camera.setTarget(960, 520, 1.15);
    } else if (isPoof) {
      camera.setTarget(960, 500, 1.25);
    } else if (isAI && !isReaction) {
      camera.setTarget(960, 480, 1.22);
    } else {
      camera.cutTo(960, 500, 1.45);
    }

    let bg = `
      <!-- Silicon Valley Tech Loft Backdrop -->
      <rect x="-4000" y="-4000" width="10000" height="10000" fill="#f1f5f9"/>
      
      <!-- San Francisco Skyline through Glass Window -->
      <rect x="200" y="100" width="1520" height="600" rx="20" fill="#e0f2fe" stroke="#94a3b8" stroke-width="8"/>
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

      <!-- Server Rack on Left -->
      <g transform="translate(80, 480)">
        <rect x="0" y="0" width="90" height="360" rx="8" fill="#0f172a" stroke="#334155" stroke-width="4"/>
        <line x1="10" y1="60" x2="80" y2="60" stroke="#334155" stroke-width="3"/>
        <line x1="10" y1="120" x2="80" y2="120" stroke="#334155" stroke-width="3"/>
        <line x1="10" y1="180" x2="80" y2="180" stroke="#334155" stroke-width="3"/>
        <circle cx="25" cy="40" r="4" fill="#22c55e" filter="url(#glow)"/>
        <circle cx="45" cy="40" r="4" fill="#06b6d4" filter="url(#glow)"/>
        <circle cx="65" cy="40" r="4" fill="${Math.sin(sceneTime * 12) > 0 ? "#ef4444" : "#3b82f6"}" filter="url(#glow)"/>
      </g>

      <!-- Polished Office Wood Floor -->
      <rect x="-4000" y="800" width="10000" height="4000" fill="#e2e8f0"/>
      <line x1="-4000" y1="800" x2="6000" y2="800" stroke="#cbd5e1" stroke-width="6"/>

      <!-- Animated Velocity Slider Track -->
      <g transform="translate(0, 170)">
        <rect x="720" y="0" width="480" height="30" rx="15" fill="#e2e8f0" stroke="#0f172a" stroke-width="5" filter="url(#cardShadow)"/>
        <rect x="720" y="0" width="${sliderProgress * 480}" height="30" rx="15" fill="#38bdf8"/>

        <!-- Markers -->
        <circle cx="720" cy="15" r="26" fill="#f43f5e" stroke="#0f172a" stroke-width="5"/>
        <text x="720" y="70" font-family="'Impact', sans-serif" font-size="26" fill="#be123c" text-anchor="middle">"THICC"</text>
        <circle cx="1200" cy="15" r="26" fill="#0284c7" stroke="#0f172a" stroke-width="5"/>
        <text x="1200" y="70" font-family="'Impact', sans-serif" font-size="26" fill="#0369a1" text-anchor="middle">"STICK"</text>

        <!-- Dynamic Knob -->
        <circle cx="${sliderX}" cy="15" r="30" fill="#eab308" stroke="#0f172a" stroke-width="6" filter="url(#glow)"/>
      </g>
    `;

    if (isPoof) {
      const burst = particleBurst(sceneTime - 3.28, 14, 0.9, 260);
      bg += `
        <!-- Radial Crypto Shatter Burst -->
        ${burst.map((p, i) => `
          <g transform="translate(${960 + p.x}, ${480 + p.y}) rotate(${sceneTime * 300 + i * 30})" opacity="${p.opacity}">
            <circle cx="0" cy="0" r="${p.radius + 6}" fill="#f59e0b" stroke="#0f172a" stroke-width="3"/>
            <text x="0" y="5" font-family="sans-serif" font-size="${Math.max(8, p.radius + 2)}" font-weight="bold" fill="#fff" text-anchor="middle">₿</text>
          </g>
        `).join("")}
      `;
      overlays += renderActionLines({ x: 960, y: 480 }, 240, sceneTime);
    } else if (isAI) {
      const promptText = `PROMPT: /imagine tech_founder --v 6.0 --no calories`;
      const typedChars = Math.min(promptText.length, Math.floor((sceneTime - 4.68) * 24));
      const currentTyped = promptText.slice(0, typedChars);
      const cursorVisible = Math.sin(sceneTime * 12) > 0;
      const termHover = floatingHover(sceneTime, 2.0, 3);

      bg += `
        <!-- Floating Prompt Window -->
        <g transform="translate(960, ${260 + termHover.dy})">
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
        overlays += renderHandDrawnCircle({ x: 960, y: 260 }, 260, 70, sceneTime, "PIVOT TO AI");
      }
    }

    // Single Actor: The Tech Bro in action
    let actorX = 960;
    let actorLean = 0;
    let actorExpr = "deadpan_classic";
    let leftHandTarget: { x: number; y: number } | undefined = undefined;

    if (isDragging) {
      actorX = 720 + sliderProgress * 240;
      actorLean = 12;
      actorExpr = "frustration_groan";
      leftHandTarget = { x: sliderX, y: 185 };
    } else if (isPoof) {
      actorX = 960;
      actorLean = -14;
      actorExpr = "shock_eye_pop";
    } else if (isAI && !isReaction) {
      actorX = 960;
      actorLean = 6;
      actorExpr = "smug_rock_eyebrow";
    } else {
      actorX = 960;
      actorLean = 0;
      actorExpr = "smug_finger_guns";
    }

    const techBroActor = {
      id: "tech_bro_actor",
      state: {
        x: actorX,
        y: 650,
        scale: 1.34,
        gender: "tech_bro",
        hairStyle: "male_tech_bro",
        clothes: isAI ? "tech_fleece_vest" : "hoodie",
        expression: actorExpr,
        spineLean: actorLean,
        leftHandTarget: leftHandTarget,
        timeSec: sceneTime,
      } as any,
    };

    return {
      backgroundSvg: bg + overlays,
      stickFigures: [techBroActor],
      shake: 0,
    };
  },
};

import { Scene, SceneRenderContext, SceneRenderOutput } from "./SceneTypes";
import { renderPaparazzi } from "../character/CartoonCast";
import { popInSquash, slamDrop, floatingHover } from "../anim/ObjectMotion";
import { renderHandDrawnArrow, renderHandDrawnCircle, renderActionLines } from "../anim/ComicMarkups";

export const Scene01_Ecosystem: Scene = {
  id: "scene_01_ecosystem",
  name: "Hollywood Red Carpet & Instagram Ecosystem",
  startTime: 0.0,
  endTime: 8.620,

  render(ctx: SceneRenderContext): SceneRenderOutput {
    const { sceneTime, camera } = ctx;

    // Word-Level Timestamps from 0-chapter-1.srt:
    // 0.0s - 1.0s: Wide establishing shot of Red Carpet runway with Paparazzi flashing
    // 1.0s - 2.0s: Movie Clapperboard drops on stage right
    // 2.0s - 4.8s: Giant Instagram Phone drops showing single celery dinner
    // 4.8s - 7.5s: "HOLLYWOOD ECOSYSTEM [DOWNSIZED TO ZERO CALORIES]" Billboard slams down!
    // 7.5s - 8.62s: Camera punches in tight on the model's shocked reaction hold

    const hasClapper = sceneTime >= 1.0;
    const hasPhone = sceneTime >= 2.0;
    const hasBillboard = sceneTime >= 4.8;
    const isReaction = sceneTime >= 7.5;

    // Camera Choreography: Motivated Movie Movement
    if (sceneTime < 2.0) {
      // Establishing wide shot showing the full runway
      camera.setTarget(960, 540, 1.05);
    } else if (sceneTime < 4.8) {
      // Push in as the phone arrives
      camera.setTarget(1100, 520, 1.18);
    } else if (sceneTime < 7.5) {
      // Dynamic track onto billboard impact
      camera.setTarget(960, 480, 1.12);
    } else {
      // Snap zoom macro punch-in on model's face
      camera.cutTo(960, 520, 1.45);
    }

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
      const clapPop = popInSquash(sceneTime - 1.0, 0.32, { x: 580, y: 400 });
      bg += `
        <g transform="translate(${clapPop.x}, ${clapPop.y}) scale(${clapPop.scaleX * 1.2}, ${clapPop.scaleY * 1.2})" opacity="${clapPop.opacity}" filter="url(#cardShadow)">
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

    // CUMULATIVE ASSET 2: Giant Instagram Phone Post (Enters at t=2.0s)
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
          <text x="0" y="-120" font-family="'Impact', sans-serif" font-size="20" fill="#dc2626" text-anchor="middle">FEASTING</text>
          <text x="0" y="70" font-family="sans-serif" font-size="14" font-weight="bold" fill="#16a34a" text-anchor="middle">DINNER: 1 CELERY</text>
          <!-- Likes counter -->
          <g transform="translate(-120, 140)">
            <path d="M 0 0 C -8 -8 -20 0 -12 10 L 0 22 L 12 10 C 20 0 8 -8 0 0 Z" fill="#ef4444"/>
            <text x="24" y="15" font-family="sans-serif" font-size="16" font-weight="bold" fill="#0f172a">2.4M likes</text>
          </g>
        </g>
      `;
    }

    let overlays = "";
    // CUMULATIVE ASSET 3: Downsized Zero Calories Billboard (Slams at t=4.8s)
    if (hasBillboard) {
      const slam = slamDrop(sceneTime - 4.8, 0.4, { x: 960, y: 190 });
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
        overlays += renderActionLines({ x: 960, y: 190 }, 260, sceneTime);
      }
    }

    // The Single Animated Actor in the scene: Red Carpet Celebrity / Model
    let modelExpr = "smug_peace_sign";
    let modelPose = "waving";
    let modelX = 960;
    let modelLean = 0;

    if (sceneTime < 2.0) {
      modelExpr = "smug_chef_kiss";
      modelPose = "waving";
      modelLean = Math.sin(sceneTime * 4) * 4;
    } else if (sceneTime < 4.8) {
      modelExpr = "skeptical_side_eye";
      modelPose = "pointing";
      modelLean = 6;
    } else if (sceneTime < 7.5) {
      modelExpr = "shock_eye_pop";
      modelPose = "flail";
      modelLean = -10;
    } else {
      modelExpr = "cringe_teeth_grit";
      modelPose = "default";
      modelLean = 0;
    }

    const redCarpetModel = {
      id: "red_carpet_model",
      state: {
        x: modelX,
        y: 640,
        scale: 1.32,
        gender: "female",
        hairStyle: "female_long_brunette",
        clothes: "dress_red_carpet",
        expression: modelExpr,
        pose: modelPose,
        spineLean: modelLean,
        timeSec: sceneTime,
      } as any,
    };

    return {
      backgroundSvg: bg + overlays,
      stickFigures: [redCarpetModel],
      shake: 0,
    };
  },
};

import { Scene, SceneRenderContext, SceneRenderOutput } from "./SceneTypes";
import { renderKateMoss } from "../character/CartoonCast";
import { popInSquash, slamDrop, floatingHover } from "../anim/ObjectMotion";
import { renderHandDrawnArrow, renderHandDrawnCircle, renderActionLines } from "../anim/ComicMarkups";

export const Scene07_HeroinChic: Scene = {
  id: "scene_07_heroinchic",
  name: "90s Heroin Chic, Food Pyramid & Victorian Disease",
  startTime: 57.809,
  endTime: 80.457,

  render(ctx: SceneRenderContext): SceneRenderOutput {
    const { sceneTime, camera } = ctx;

    const isBeat1 = sceneTime < 7.44;
    const isBeat2 = sceneTime >= 7.44 && sceneTime < 16.065;
    const isBeat3 = sceneTime >= 16.065 && sceneTime < 21.825;
    const isBeat4 = sceneTime >= 21.825;

    let hostX = 460;
    let hostY = 650;
    let hostLean = 0;
    let isWalking = false;
    let hostExpr: any = "deadpan_classic";
    let leftHandProp: any = "none";
    let pointTarget: { x: number; y: number } | undefined = undefined;
    let overlays = "";
    let shakeAmt = 0;

    // Directorial Camera Choreography - 16:9 Staging (Always keep Host + Gag in frame!)
    if (isBeat1) {
      camera.setTarget(960, 540, 1.05);
      hostX = 440;
      hostLean = 8;
      pointTarget = { x: 1260, y: 550 };
      hostExpr = "deadpan_classic";
    } else if (isBeat2) {
      camera.setTarget(960, 540, 1.08);
      hostX = 440;
      hostLean = 10;
      leftHandProp = "diet_coke";
      pointTarget = { x: 1260, y: 320 };
      hostExpr = "deadpan_side_glance";
    } else if (isBeat3) {
      camera.setTarget(960, 540, 1.08);
      hostX = 440;
      hostLean = 12;
      leftHandProp = "coffee_cup";
      pointTarget = { x: 1260, y: 640 };
      hostExpr = "smug_sipping_tea";
    } else {
      camera.cutTo(440, 540, 1.35);
      hostX = 440;
      hostExpr = "smug_finger_guns";
    }

    let bg = `
      <!-- High Fashion Milan Runway Backdrop -->
      <rect x="-4000" y="-4000" width="10000" height="10000" fill="#0f172a"/>
      
      <!-- Overhead Light Truss System -->
      <line x1="-1000" y1="80" x2="3000" y2="80" stroke="#334155" stroke-width="8"/>
      <line x1="-1000" y1="120" x2="3000" y2="120" stroke="#334155" stroke-width="8"/>
      ${[200, 500, 800, 1100, 1400, 1700].map(tx => `
        <line x1="${tx}" y1="80" x2="${tx + 40}" y2="120" stroke="#475569" stroke-width="4"/>
        <line x1="${tx + 40}" y1="80" x2="${tx}" y2="120" stroke="#475569" stroke-width="4"/>
        <!-- Downward Spotlights -->
        <polygon points="${tx + 20},120 ${tx - 100},800 ${tx + 140},800" fill="#fef08a" opacity="0.12"/>
      `).join("")}

      <!-- Glossy Black Runway Floor with Reflection -->
      <polygon points="200,800 1720,800 2100,1200 -200,1200" fill="#020617"/>
      <line x1="-4000" y1="800" x2="6000" y2="800" stroke="#38bdf8" stroke-width="4" filter="url(#glow)"/>
    `;

    if (isBeat1) {
      // 90s Runway Stage with Stark Overhead Spotlight Cone & Flashbulbs
      const flash = Math.sin(sceneTime * 14) > 0.5;
      bg += `
        <polygon points="1350,-100 1060,840 1640,840" fill="#fef08a" opacity="0.25"/>
        <ellipse cx="1350" cy="840" rx="290" ry="50" fill="#fde047" opacity="0.35"/>
        <ellipse cx="1350" cy="840" rx="90" ry="18" fill="#000000" opacity="0.25"/>

        <!-- Side Runway Strobe Lights -->
        <circle cx="1020" cy="800" r="${flash ? 24 : 12}" fill="${flash ? "#ffffff" : "#cbd5e1"}" filter="${flash ? "url(#glow)" : "none"}"/>
        <circle cx="1680" cy="800" r="${flash ? 24 : 12}" fill="${flash ? "#ffffff" : "#cbd5e1"}" filter="${flash ? "url(#glow)" : "none"}"/>
      `;
    } else if (isBeat2) {
      // 1990s USDA Food Pyramid with Entrance Slam
      const pyramidTime = sceneTime - 7.44;
      const slam = slamDrop(pyramidTime, 0.22, { x: 1380, y: 460 }, 300);
      if (slam.impactOccurred && pyramidTime < 0.5) {
        shakeAmt = slam.screenShake;
      }
      const showCoke = pyramidTime >= 1.5;
      const showCigs = pyramidTime >= 3.5;
      const showApathy = pyramidTime >= 6.0;

      bg += `
        <g transform="translate(${slam.x}, ${slam.y}) scale(${slam.scaleX}, ${slam.scaleY})">
          <polygon points="0,-220 -300,200 300,200" fill="#f1f5f9" stroke="#0f172a" stroke-width="9" filter="url(#cardShadow)"/>
          <line x1="-140" y1="10" x2="140" y2="10" stroke="#0f172a" stroke-width="7"/>
          <line x1="-80" y1="-100" x2="80" y2="-100" stroke="#0f172a" stroke-width="7"/>

          <!-- Top Tier: Diet Coke Can -->
          ${showCoke ? `
            <g transform="translate(0, -155) scale(1.3)">
              <rect x="-35" y="-60" width="70" height="110" rx="10" fill="#dc2626" stroke="#111" stroke-width="5" filter="url(#cardShadow)"/>
              <rect x="-28" y="-50" width="56" height="20" fill="#ffffff"/>
              <text x="0" y="-35" font-family="'Impact', sans-serif" font-size="16" fill="#dc2626" text-anchor="middle">DIET</text>
              <text x="0" y="20" font-family="'Impact', sans-serif" font-size="28" fill="#ffffff" text-anchor="middle">Coke</text>
            </g>
          ` : ""}

          <!-- Middle Tier: Parliament Cigarettes with rising smoke -->
          ${showCigs ? `
            <g transform="translate(-80, -40) scale(1.2)">
              <rect x="-45" y="-35" width="90" height="75" rx="6" fill="#1e3a8a" stroke="#111" stroke-width="4"/>
              <text x="0" y="8" font-family="sans-serif" font-size="12" font-weight="bold" fill="#ffffff" text-anchor="middle">PARLIAMENT</text>
            </g>
            <g transform="translate(80, -40) scale(1.2)">
              <rect x="-45" y="-35" width="90" height="75" rx="6" fill="#1e3a8a" stroke="#111" stroke-width="4"/>
              <text x="0" y="8" font-family="sans-serif" font-size="12" font-weight="bold" fill="#ffffff" text-anchor="middle">LIGHTS</text>
            </g>
          ` : ""}

          <!-- Bottom Base Tier: Pure Unfiltered Apathy -->
          ${showApathy ? `
            <g transform="translate(0, 110)">
              <rect x="-250" y="-35" width="500" height="70" rx="10" fill="#0f172a" stroke="#0284c7" stroke-width="5"/>
              <text x="0" y="12" font-family="'Impact', sans-serif" font-size="28" fill="#38bdf8" letter-spacing="2" text-anchor="middle">
                PURE UNFILTERED APATHY
              </text>
            </g>
          ` : ""}
        </g>
      `;

      if (showCoke && !showCigs) {
        overlays += renderHandDrawnCircle({ x: 1380, y: 300 }, 70, 70, sceneTime, "ESSENTIAL NUTRIENT");
      }
      if (showApathy) {
        overlays += renderHandDrawnArrow({ x: 700, y: 560 }, { x: 1140, y: 570 }, sceneTime, "FOUNDATION");
      }
    } else {
      // Victorian Burgundy Chaise Lounge & Apothecary Tonic with Entrance Pop
      const chaisePop = popInSquash(sceneTime - 16.065, 0.35, { x: 1380, y: 680 });
      bg += `
        <!-- Victorian Chaise Lounge with Contact Shadow -->
        <g transform="translate(${chaisePop.x}, ${chaisePop.y}) scale(${chaisePop.scaleX * 1.35}, ${chaisePop.scaleY * 1.35})" opacity="${chaisePop.opacity}">
          <ellipse cx="0" cy="85" rx="200" ry="18" fill="#000000" opacity="0.22"/>
          <path d="M -190 40 Q -170 -70 -100 -60 L 150 -30 Q 190 -20 190 40 Z" fill="#831843" stroke="#500724" stroke-width="7" filter="url(#cardShadow)"/>
          <line x1="-150" y1="40" x2="-160" y2="85" stroke="#713f12" stroke-width="10" stroke-linecap="round"/>
          <line x1="150" y1="40" x2="160" y2="85" stroke="#713f12" stroke-width="10" stroke-linecap="round"/>

          <!-- Fainting Victorian Stick Figure -->
          <line x1="-100" y1="-30" x2="70" y2="10" stroke="#111" stroke-width="7"/>
          <circle cx="-110" cy="-45" r="26" fill="#fddfb0" stroke="#111" stroke-width="5"/>
          <path d="M -90 -30 Q -100 -60 -125 -50" stroke="#111" stroke-width="6" fill="none"/>
          
          <!-- Ornate Vintage Amber Apothecary Tonic Bottle -->
          <g transform="translate(160, -70) scale(1.3)">
            <rect x="-18" y="-35" width="36" height="70" rx="8" fill="#78350f" stroke="#451a03" stroke-width="3" filter="url(#cardShadow)"/>
            <rect x="-12" y="-18" width="24" height="36" fill="#fef3c7"/>
            <text x="0" y="4" font-family="serif" font-size="10" font-weight="bold" fill="#78350f" text-anchor="middle">TONIC</text>
          </g>

          ${isBeat4 ? `
            <!-- "DEAL WITH IT" 8-Bit Pixel Shades -->
            <g transform="translate(-110, -50) scale(0.9)">
              <rect x="-24" y="-8" width="20" height="16" fill="#000000"/>
              <rect x="4" y="-8" width="20" height="16" fill="#000000"/>
              <rect x="-4" y="-4" width="8" height="6" fill="#000000"/>
            </g>
          ` : ""}
        </g>
      `;

      if (isBeat4) {
        overlays += renderActionLines({ x: 1240, y: 620 }, 140, sceneTime);
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
        leftHandProp: leftHandProp,
        pointTarget: pointTarget,
        expression: hostExpr,
        gazeTarget: pointTarget,
      },
    };

    let figuresList: Array<{ id: string; state: any }> = [hostFigure];
    if (isBeat1) {
      figuresList.push({
        id: "kate_moss_stick",
        state: {
          x: 1350,
          y: 640,
          scale: 1.28,
          gender: "female",
          hairStyle: "female_bob",
          clothes: "crop_top_leggings",
          expression: "deadpan_soul_stare",
          timeSec: sceneTime,
        },
      });
    } else if (isBeat3 || isBeat4) {
      figuresList.push({
        id: "victorian_patient_stick",
        state: {
          x: 1380,
          y: 640,
          scale: 1.22,
          gender: "female",
          hairStyle: "female_long",
          clothes: "patient_gown",
          expression: isBeat4 ? "smug_peace_sign" : "exhausted_melting",
          spineLean: -12,
          timeSec: sceneTime,
        },
      });
    }

    return {
      backgroundSvg: bg + overlays,
      stickFigures: figuresList,
      shake: 0,
    };
  },
};

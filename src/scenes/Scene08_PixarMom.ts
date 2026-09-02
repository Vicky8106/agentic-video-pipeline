import { Scene, SceneRenderContext, SceneRenderOutput } from "./SceneTypes";
import { renderPixarMom } from "../character/CartoonCast";
import { popInSquash, slamDrop, floatingHover } from "../anim/ObjectMotion";
import { renderHandDrawnArrow, renderHandDrawnCircle, renderActionLines } from "../anim/ComicMarkups";

export const Scene08_PixarMom: Scene = {
  id: "scene_08_pixarmom",
  name: "2010s BBL & Pixar Mom Gravitational Field",
  startTime: 80.457,
  endTime: 108.199,

  render(ctx: SceneRenderContext): SceneRenderOutput {
    const { sceneTime, camera } = ctx;

    const isBeat1 = sceneTime < 4.963;
    const isBeat2 = sceneTime >= 4.963 && sceneTime < 14.054;
    const isBeat3 = sceneTime >= 14.054 && sceneTime < 23.654;
    const isBeat4 = sceneTime >= 23.654 && sceneTime < 27.174;
    const isBeat5 = sceneTime >= 27.174;

    let hostX = 520;
    let hostY = 650;
    let hostLean = 0;
    let isWalking = false;
    let hostExpr: any = "deadpan_classic";
    let pointTarget: { x: number; y: number } | undefined = undefined;
    let leftHandTarget: { x: number; y: number } | undefined = undefined;
    let overlays = "";
    let shakeAmt = 0;

    // Directorial Camera Choreography - 16:9 Staging (Always keep Host + Gag in frame!)
    if (isBeat1) {
      camera.setTarget(960, 540, 1.05);
      hostX = 440;
      hostLean = -14;
      hostExpr = "shock_home_alone";
    } else if (isBeat2) {
      camera.setTarget(960, 540, 1.08);
      hostX = 440;
      hostLean = 8;
      pointTarget = { x: 1260, y: 540 };
      hostExpr = "confused_squint";
    } else if (isBeat3) {
      camera.setTarget(960, 540, 1.12);
      hostX = 440;
      hostLean = 20;
      leftHandTarget = { x: 1260, y: 520 };
      pointTarget = { x: 1260, y: 460 };
      hostExpr = "fear_screaming";
    } else if (isBeat4) {
      camera.setTarget(960, 540, 1.05);
      hostX = 440;
      pointTarget = { x: 1260, y: 320 };
      hostExpr = "smug_rock_eyebrow";
    } else {
      camera.cutTo(440, 540, 1.35);
      hostX = 440;
      hostExpr = "smug_finger_guns";
    }

    let bg = `
      <!-- Miami South Beach Art Deco Backdrop -->
      <rect x="-4000" y="-4000" width="10000" height="10000" fill="#fdf2f8"/>
      
      <!-- Pastel Sunset Sky Gradient -->
      <rect x="-4000" y="0" width="10000" height="600" fill="#fce7f3"/>
      <circle cx="960" cy="500" r="260" fill="#fbcfe8" opacity="0.5"/> <!-- Sunset Sun -->

      <!-- Art Deco Hotel Facades on Ocean Drive -->
      <!-- Hotel 1 (Pink) -->
      <rect x="250" y="320" width="340" height="480" rx="8" fill="#f472b6" stroke="#db2777" stroke-width="6"/>
      <rect x="350" y="260" width="140" height="60" rx="20" fill="#fbcfe8" stroke="#db2777" stroke-width="5"/>
      <text x="420" y="300" font-family="'Impact', sans-serif" font-size="20" fill="#9d174d" text-anchor="middle">THE BBL</text>

      <!-- Hotel 2 (Turquoise) -->
      <rect x="640" y="280" width="380" height="520" rx="8" fill="#2dd4bf" stroke="#0d9488" stroke-width="6"/>
      <rect x="760" y="220" width="140" height="60" rx="20" fill="#99f6e4" stroke="#0d9488" stroke-width="5"/>
      <text x="830" y="260" font-family="'Impact', sans-serif" font-size="20" fill="#115e59" text-anchor="middle">CURVES</text>

      <!-- Hotel 3 (Pastel Yellow) -->
      <rect x="1070" y="340" width="360" height="460" rx="8" fill="#fde047" stroke="#ca8a04" stroke-width="6"/>

      <!-- Palm Trees on Boulevard -->
      ${[200, 600, 1040, 1480].map(px => `
        <path d="M ${px} 800 Q ${px + 20} 500 ${px + 40} 380" stroke="#78350f" stroke-width="12" fill="none"/>
        <path d="M ${px + 40} 380 Q ${px - 40} 320 ${px - 90} 360" stroke="#16a34a" stroke-width="10" fill="none"/>
        <path d="M ${px + 40} 380 Q ${px + 10} 290 ${px - 20} 310" stroke="#16a34a" stroke-width="10" fill="none"/>
        <path d="M ${px + 40} 380 Q ${px + 80} 300 ${px + 120} 340" stroke="#16a34a" stroke-width="10" fill="none"/>
        <path d="M ${px + 40} 380 Q ${px + 100} 360 ${px + 140} 420" stroke="#16a34a" stroke-width="10" fill="none"/>
      `).join("")}

      <!-- Ocean Drive Sidewalk & Street -->
      <rect x="-4000" y="800" width="10000" height="4000" fill="#475569"/>
      <line x1="-4000" y1="800" x2="6000" y2="800" stroke="#f472b6" stroke-width="8"/>
    `;

    if (isBeat1) {
      // Reversing Pendulum Mach 2 Whiplash
      const reverseSwing = Math.sin(sceneTime * 6) * 0.8;
      const bobX = 1400 + Math.sin(reverseSwing) * 500;
      const bobY = -50 + Math.cos(reverseSwing) * 500;

      bg += `
        <g stroke="#f43f5e" stroke-width="4" opacity="0.7">
          <line x1="900" y1="200" x2="1800" y2="200" stroke-dasharray="30 15"/>
          <line x1="850" y1="300" x2="1850" y2="300" stroke-dasharray="40 20"/>
        </g>
        <line x1="1400" y1="-50" x2="${bobX}" y2="${bobY}" stroke="#475569" stroke-width="10"/>
        <circle cx="${bobX}" cy="${bobY}" r="95" fill="#f43f5e" stroke="#be123c" stroke-width="10"/>
        <text x="${bobX}" y="${bobY + 14}" font-family="'Impact', sans-serif" font-size="32" fill="#ffffff" text-anchor="middle">2010s</text>
      `;
    } else if (isBeat2) {
      bg += `
        <!-- High-Visibility Comic Card -->
        <g transform="translate(1380, 230)">
          <rect x="-180" y="-25" width="360" height="50" rx="12" fill="#0f172a" stroke="#ec4899" stroke-width="4" filter="url(#cardShadow)"/>
          <text x="0" y="8" font-family="'Impact', sans-serif" font-size="22" fill="#f43f5e" letter-spacing="2" text-anchor="middle">
            THE 2010s BBL METAGAME
          </text>
        </g>
      `;

      if (sceneTime > 8.0) {
        overlays += renderHandDrawnCircle({ x: 1380, y: 560 }, 180, 100, sceneTime, "GRAVITATIONAL ANOMALY");
      }
    } else if (isBeat3) {
      // Spacetime Curvature Grid & Trapped Orbital System
      bg += `
        <g stroke="#f43f5e" stroke-width="2.5" fill="none" opacity="0.65">
          <ellipse cx="1260" cy="540" rx="420" ry="140" stroke-dasharray="16 10"/>
          <ellipse cx="1260" cy="540" rx="540" ry="180" stroke-dasharray="20 12"/>
        </g>

        <!-- High-Visibility Comic Card -->
        <g transform="translate(1260, 230)">
          <rect x="-220" y="-25" width="440" height="50" rx="12" fill="#0f172a" stroke="#ec4899" stroke-width="4" filter="url(#cardShadow)"/>
          <text x="0" y="8" font-family="'Impact', sans-serif" font-size="22" fill="#f43f5e" letter-spacing="2" text-anchor="middle">
            GRAVITATIONAL PULL: 10,000G
          </text>
        </g>
      `;

      overlays += renderActionLines({ x: 1260, y: 540 }, 320, sceneTime);
    } else {
      // Miami Clinic Billboard & Jet Takeoff with Entrance Slam
      const billTime = sceneTime - 23.654;
      const slam = slamDrop(billTime, 0.22, { x: 1260, y: 320 }, 280);
      if (slam.impactOccurred && billTime < 0.4) {
        shakeAmt = slam.screenShake;
      }
      const planeX = 850 + (billTime * 180) % 1000;
      bg += `
        <!-- Swaying Palm Trees -->
        <path d="M 1740 840 Q 1690 550 1760 380" stroke="#78350f" stroke-width="18" fill="none" stroke-linecap="round"/>
        <path d="M 1760 380 Q 1640 320 1560 360 M 1760 380 Q 1690 250 1660 200 M 1760 380 Q 1840 250 1920 260 M 1760 380 Q 1890 340 1940 400" stroke="#16a34a" stroke-width="16" fill="none" stroke-linecap="round"/>

        <!-- Miami BBL Billboard -->
        <g transform="translate(${slam.x}, ${slam.y}) scale(${slam.scaleX}, ${slam.scaleY})" opacity="${slam.opacity}">
          <rect x="-220" y="-90" width="440" height="180" rx="16" fill="#fdf4ff" stroke="#ec4899" stroke-width="6" filter="url(#cardShadow)"/>
          <text x="0" y="-30" font-family="'Impact', sans-serif" font-size="34" fill="#be185d" text-anchor="middle">MIAMI CLINIC</text>
          <text x="0" y="18" font-family="sans-serif" font-size="22" font-weight="bold" fill="#0284c7" text-anchor="middle">1-Way Flight: $299</text>
          <text x="0" y="58" font-family="sans-serif" font-size="18" font-style="italic" fill="#e11d48" text-anchor="middle">"Definitely not squats"</text>
        </g>

        <!-- Jet Airliner Taking Off -->
        <g transform="translate(${planeX}, 180) rotate(-18) scale(1.2)">
          <path d="M -60 0 L 60 0 L 80 -15 L -40 -15 Z" fill="#ffffff" stroke="#0f172a" stroke-width="4"/>
          <polygon points="0,-15 20,-45 40,-15" fill="#38bdf8"/>
          <polygon points="-40,-15 -55,-40 -30,-15" fill="#f43f5e"/>
          <circle cx="-75" cy="-8" r="16" fill="#cbd5e1" opacity="0.8"/>
          <circle cx="-110" cy="-8" r="22" fill="#e2e8f0" opacity="0.6"/>
        </g>
      `;

      if (sceneTime > 24.5) {
        overlays += renderHandDrawnArrow({ x: 900, y: 440 }, { x: 1200, y: 380 }, sceneTime, "NOT SQUATS");
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

    let figuresList: Array<{ id: string; state: any }> = [hostFigure];
    if (isBeat2 || isBeat3 || isBeat4) {
      figuresList.push({
        id: "pixar_mom_stick",
        state: {
          x: 1260,
          y: 640,
          scale: 1.28,
          gender: "female",
          hairStyle: "female_long",
          clothes: "crop_top_leggings",
          expression: isBeat3 ? "smug_peace_sign" : "smug_chef_kiss",
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

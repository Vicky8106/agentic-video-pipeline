import { Scene, SceneRenderContext, SceneRenderOutput } from "./SceneTypes";
import { renderCouchGuy } from "../character/CartoonCast";
import { renderHandDrawnArrow, renderHandDrawnCircle, renderActionLines } from "../anim/ComicMarkups";

export const Scene06_Pendulum: Scene = {
  id: "scene_06_pendulum",
  name: "The Beauty Standard Pendulum & Slouching Couch Guy",
  startTime: 43.729,
  endTime: 57.809,

  render(ctx: SceneRenderContext): SceneRenderOutput {
    const { sceneTime, camera } = ctx;

    // 1-2-3-4-5 CONTINUOUS BEATS:
    // Cue 15-16 (43.729s - 47.386s): Host introduces chalkboard dynamics with pointer stick.
    // Cue 17 (47.386s - 50.746s): Giant swinging pendulum wrecking ball sweeps in; host leans back.
    // Cue 18 (50.746s - 53.786s): Couch Guy ducks for his life as crumbs fly.
    // Cue 19-20 (53.786s - 57.666s): Host deadpan shrug at working-class despair.
    // Beat 5 (57.666s - 57.809s): Reset pause.
    const isBeat1 = sceneTime < 3.657;
    const isBeat2 = sceneTime >= 3.657 && sceneTime < 7.771;
    const isBeat3 = sceneTime >= 7.771 && sceneTime < 10.771;
    const isBeat4 = sceneTime >= 10.771 && sceneTime < 13.937;
    const isBeat5 = sceneTime >= 13.937;

    let hostX = 540;
    let hostY = 650;
    let hostLean = 0;
    let hostExpr: any = "deadpan_classic";
    let rightHandProp: any = "none";
    let pointTarget: { x: number; y: number } | undefined = undefined;
    let overlays = "";

    // Dynamic Camera Choreography - 16:9 Staging (Always keep Host + Gag in frame!)
    if (isBeat1) {
      camera.setTarget(960, 540, 1.05);
      hostX = 440;
      hostLean = 8;
      rightHandProp = "pointer";
      pointTarget = { x: 1280, y: 480 };
      hostExpr = "deadpan_classic";
    } else if (isBeat2) {
      camera.setTarget(960, 540, 1.08);
      hostX = 440;
      hostLean = -14;
      pointTarget = { x: 1280, y: 380 };
      hostExpr = "skeptical_raised_brow";
    } else if (isBeat3) {
      camera.setTarget(960, 540, 1.12);
      hostX = 440;
      hostLean = -18;
      pointTarget = { x: 1280, y: 680 };
      hostExpr = "cringe_teeth_grit";
    } else if (isBeat4) {
      camera.cutTo(440, 540, 1.35);
      hostX = 440;
      hostExpr = "deadpan_shrug";
    } else {
      camera.cutTo(440, 540, 1.35);
      hostX = 440;
      hostExpr = "deadpan_classic";
    }

    // Pendulum physics motion
    const pivotX = 1380;
    const pivotY = -60;
    const armLength = 700;
    const swingAngle = isBeat1 ? 0 : Math.sin((sceneTime - 3.657) * 3.8) * 0.65;
    const bobX = pivotX + Math.sin(swingAngle) * armLength;
    const bobY = pivotY + Math.cos(swingAngle) * armLength;
    const isDangerZone = !isBeat1 && Math.abs(swingAngle) < 0.35;

    let bg = `
      <!-- University Physics Lecture Hall Backdrop -->
      <rect x="-4000" y="-4000" width="10000" height="10000" fill="#fef3c7"/>
      
      <!-- Wood Paneling Wall -->
      <rect x="-4000" y="0" width="10000" height="840" fill="#fef08a" opacity="0.3"/>
      ${[200, 400, 600, 800, 1000, 1200, 1400, 1600, 1800].map(wx => `
        <line x1="${wx}" y1="0" x2="${wx}" y2="800" stroke="#ca8a04" stroke-width="2" opacity="0.4"/>
      `).join("")}

      <!-- Giant Green Chalkboard on Wall -->
      <rect x="580" y="160" width="1280" height="580" rx="14" fill="#064e3b" stroke="#78350f" stroke-width="18" filter="url(#cardShadow)"/>
      <rect x="560" y="740" width="1320" height="24" rx="4" fill="#92400e"/> <!-- Chalk Tray -->
      <!-- Scattered Chalk Pieces -->
      <rect x="620" y="745" width="24" height="10" rx="2" fill="#ffffff"/>
      <rect x="660" y="745" width="30" height="10" rx="2" fill="#fde047"/>
      <rect x="710" y="745" width="20" height="10" rx="2" fill="#93c5fd"/>

      <!-- Wooden Lecture Stage Floor -->
      <rect x="-4000" y="800" width="10000" height="4000" fill="#78350f"/>
      <line x1="-4000" y1="800" x2="6000" y2="800" stroke="#451a03" stroke-width="8"/>
    `;

    if (isBeat1) {
      // Classroom Chalkboard Diagram in Beat 1
      bg += `
        <g transform="translate(1280, 440)">
          <text x="0" y="-120" font-family="'Impact', sans-serif" font-size="38" fill="#ffffff" text-anchor="middle">HUMAN BEAUTY DYNAMICS 101</text>
          <path d="M -300 -40 Q 0 160 300 -40" stroke="#ffffff" stroke-width="6" stroke-dasharray="14 10" fill="none"/>
          <text x="-260" y="40" font-family="sans-serif" font-size="28" font-weight="bold" fill="#facc15" text-anchor="middle">1990s: ZERO CALORIES</text>
          <text x="260" y="40" font-family="sans-serif" font-size="28" font-weight="bold" fill="#38bdf8" text-anchor="middle">2010s: MAXIMUM BBL</text>
          <circle cx="0" cy="60" r="14" fill="#ef4444"/>
          <text x="0" y="110" font-family="sans-serif" font-size="22" fill="#f87171" text-anchor="middle">[YOU ARE HERE]</text>
        </g>
      `;

      if (sceneTime > 1.2) {
        overlays += renderHandDrawnCircle({ x: 1380, y: 480 }, 220, 120, sceneTime, "CYCLE OF DOOM");
      }
    } else {
      // Pendulum Pivot & Rod
      bg += `
        <line x1="${pivotX}" y1="${pivotY}" x2="${bobX}" y2="${bobY}" stroke="#475569" stroke-width="10"/>
        <circle cx="${pivotX}" cy="${pivotY}" r="22" fill="#1e293b"/>

        <!-- Giant Spiked Wrecking Ball -->
        <g id="wrecking-ball" transform="translate(${bobX}, ${bobY})">
          <circle cx="0" cy="0" r="130" fill="#1e293b" stroke="#0f172a" stroke-width="12" filter="url(#cardShadow)"/>
          <ellipse cx="-40" cy="-40" rx="65" ry="40" fill="#475569" opacity="0.6"/>
          <polygon points="0,-55 -45,40 45,40" fill="#ef4444"/>
          <text x="0" y="28" font-family="'Impact', sans-serif" font-size="40" fill="#ffffff" text-anchor="middle">BEAUTY</text>
        </g>

        <!-- Couch Guy Grounded on Floor (Scale: 1.40) -->
        ${renderCouchGuy({ x: 1380, y: 720, scale: 1.40, isDucking: isDangerZone || isBeat4, timeSec: sceneTime })}
      `;

      if (isBeat3 && isDangerZone) {
        // Flying potato chip crumbs & action lines
        bg += `
          <g fill="#eab308" stroke="#ca8a04" stroke-width="2">
            <circle cx="1320" cy="620" r="8"/>
            <circle cx="1440" cy="610" r="10"/>
            <circle cx="1390" cy="580" r="6"/>
          </g>
        `;
        overlays += renderActionLines({ x: 1380, y: 700 }, 160, sceneTime);
      }

      if (isBeat4) {
        overlays += renderHandDrawnArrow({ x: 1100, y: 640 }, { x: 1300, y: 700 }, sceneTime, "NO ESCAPE");
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
        rightHandProp: rightHandProp,
        pointTarget: pointTarget,
        expression: hostExpr,
        gazeTarget: pointTarget,
      },
    };

    let figuresList: Array<{ id: string; state: any }> = [hostFigure];
    if (!isBeat1) {
      figuresList.push({
        id: "couch_guy_stick",
        state: {
          x: 1380,
          y: 660,
          scale: 1.22,
          gender: "male",
          hairStyle: "male_short",
          clothes: "hoodie",
          expression: isDangerZone ? "fear_screaming" : "deadpan_classic",
          spineLean: isDangerZone ? -20 : 0,
          timeSec: sceneTime,
        },
      });
    }

    return {
      backgroundSvg: bg + overlays,
      stickFigures: figuresList,
    };
  },
};

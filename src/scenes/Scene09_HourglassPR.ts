import { Scene, SceneRenderContext, SceneRenderOutput } from "./SceneTypes";
import { popInSquash, slamDrop, floatingHover } from "../anim/ObjectMotion";
import { renderHandDrawnArrow, renderHandDrawnCircle, renderActionLines } from "../anim/ComicMarkups";

export const Scene09_HourglassPR: Scene = {
  id: "scene_09_hourglass_pr",
  name: "Overfilled Hourglass & Corporate PR Body Positivity",
  startTime: 108.199,
  endTime: 129.384,

  render(ctx: SceneRenderContext): SceneRenderOutput {
    const { sceneTime, camera } = ctx;

    const isBeat1 = sceneTime < 5.199;
    const isBeat2 = sceneTime >= 5.199 && sceneTime < 12.399;
    const isBeat3 = sceneTime >= 12.399 && sceneTime < 17.839;
    const isBeat4 = sceneTime >= 17.839 && sceneTime < 20.639;
    const isBeat5 = sceneTime >= 20.639;

    let hostX = 520;
    let hostY = 650;
    let hostLean = 0;
    let isWalking = false;
    let hostExpr: any = "deadpan_classic";
    let pointTarget: { x: number; y: number } | undefined = undefined;
    let overlays = "";
    let shakeAmt = 0;

    // Directorial Camera Choreography & Locomotion
    // Directorial Camera Choreography - 16:9 Staging (Always keep Host + Gag in frame!)
    if (isBeat1) {
      camera.setTarget(960, 540, 1.05);
      hostX = 440;
      hostLean = 8;
      pointTarget = { x: 1260, y: 620 };
      hostExpr = "confused_tilted_head";
    } else if (isBeat2) {
      camera.setTarget(960, 540, 1.08);
      hostX = 440;
      hostLean = 10;
      pointTarget = { x: 1260, y: 520 };
      hostExpr = "skeptical_side_eye";
    } else if (isBeat3) {
      camera.setTarget(960, 540, 1.08);
      hostX = 440;
      pointTarget = { x: 1260, y: 240 };
      hostExpr = "deadpan_side_glance";
    } else if (isBeat4) {
      camera.setTarget(960, 540, 1.12);
      hostX = 440;
      hostLean = -14;
      pointTarget = { x: 1260, y: 520 };
      hostExpr = "cringe_teeth_grit";
    } else {
      camera.cutTo(440, 540, 1.35);
      hostX = 440;
      hostExpr = "frustration_facepalm";
    }

    let bg = `
      <!-- Madison Avenue Corporate PR Boardroom Backdrop -->
      <rect x="-4000" y="-4000" width="10000" height="10000" fill="#0f172a"/>
      
      <!-- Skyscraper Panoramic Window Grid -->
      <rect x="200" y="80" width="1520" height="700" rx="14" fill="#1e293b" stroke="#334155" stroke-width="8"/>
      <!-- Background Sky & Distant Tower Lights -->
      <line x1="200" y1="350" x2="1720" y2="350" stroke="#334155" stroke-width="4"/>
      <line x1="200" y1="580" x2="1720" y2="580" stroke="#334155" stroke-width="4"/>
      <line x1="680" y1="80" x2="680" y2="780" stroke="#334155" stroke-width="4"/>
      <line x1="1240" y1="80" x2="1240" y2="780" stroke="#334155" stroke-width="4"/>

      <!-- Glowing Corporate Stock Ticker on Wall -->
      <g transform="translate(300, 160)">
        <rect x="0" y="0" width="1320" height="50" rx="8" fill="#022c22" stroke="#10b981" stroke-width="3"/>
        <text x="30" y="34" font-family="'Courier New', monospace" font-size="22" font-weight="bold" fill="#34d399" filter="url(#glow)">
          ▲ GLP-1 PHARMA +420%  ▲ BBL REVISION +88%  ▼ CARBOHYDRATES -99.9%  ▲ BEAUTY STOCKS +1200%
        </text>
      </g>

      <!-- Luxury Executive Carpet Floor -->
      <rect x="-4000" y="780" width="10000" height="4000" fill="#1e1b4b"/>
      <line x1="-4000" y1="780" x2="6000" y2="780" stroke="#4338ca" stroke-width="8"/>
    `;

    if (isBeat1 || isBeat2 || isBeat3) {
      const sandDropY = (sceneTime * 35) % 200;
      const glassPop = popInSquash(sceneTime, 0.35, { x: 1380, y: 520 });
      bg += `
        <!-- Ground Contact Shadow -->
        <ellipse cx="1380" cy="840" rx="220" ry="25" fill="#000000" opacity="0.2"/>

        <g id="overfilled-hourglass" transform="translate(${glassPop.x}, ${glassPop.y}) scale(${glassPop.scaleX * 1.2}, ${glassPop.scaleY * 1.2})">
          <!-- Victorian Brass Plates -->
          <rect x="-160" y="-230" width="320" height="28" rx="8" fill="#ca8a04" stroke="#854d0e" stroke-width="7"/>
          <rect x="-160" y="210" width="320" height="28" rx="8" fill="#ca8a04" stroke="#854d0e" stroke-width="7"/>

          <!-- Polished Brass Pillars -->
          <line x1="-140" y1="-230" x2="-140" y2="210" stroke="#eab308" stroke-width="14" stroke-linecap="round"/>
          <line x1="140" y1="-230" x2="140" y2="210" stroke="#eab308" stroke-width="14" stroke-linecap="round"/>

          <!-- Overfilled Bulb with Specular Glint -->
          <path d="
            M -90 -202
            C -90 -90 -20 -15 -10 0
            C -20 15 -190 80 -190 210
            L 190 210
            C 190 80 20 15 10 0
            C 20 -15 90 -90 90 -202 Z"
            fill="#e0f2fe" fill-opacity="0.4" stroke="#38bdf8" stroke-width="6" filter="url(#cardShadow)"/>

          <!-- Falling Gold Sand -->
          <ellipse cx="0" cy="190" rx="160" ry="35" fill="#eab308"/>
          <line x1="0" y1="0" x2="0" y2="${sandDropY}" stroke="#eab308" stroke-width="7" stroke-dasharray="10 8"/>

          ${(isBeat2 || isBeat3) ? `
            <!-- Corporate PR Construction Scaffolding & Banner with Slam Drop -->
            <g id="pr-scaffolding" transform="translate(0, 0)">
              <line x1="-180" y1="-50" x2="180" y2="-50" stroke="#f59e0b" stroke-width="12"/>
              <line x1="-180" y1="50" x2="180" y2="50" stroke="#f59e0b" stroke-width="12"/>
              <line x1="-150" y1="-50" x2="150" y2="50" stroke="#ef4444" stroke-width="7"/>
              <line x1="150" y1="-50" x2="-150" y2="50" stroke="#ef4444" stroke-width="7"/>
              
              <rect x="-150" y="-30" width="300" height="60" rx="10" fill="#fdf4ff" stroke="#ec4899" stroke-width="5" filter="url(#cardShadow)"/>
              <text x="0" y="9" font-family="'Impact', sans-serif" font-size="24" fill="#be185d" text-anchor="middle">
                \"BODY POSITIVITY™\"
              </text>
            </g>
          ` : ""}
        </g>
      `;

      if (isBeat1 && sceneTime > 1.5) {
        overlays += renderHandDrawnCircle({ x: 1380, y: 640 }, 140, 80, sceneTime, "OVERFILLED");
      }

      if (isBeat3) {
        // Leading Lady Asterisk Billboard with slamDrop
        const billSlam = slamDrop(sceneTime - 12.399, 0.2, { x: 960, y: 240 }, 200);
        bg += `
          <g transform="translate(${billSlam.x}, ${billSlam.y}) scale(${billSlam.scaleX}, ${billSlam.scaleY})">
            <rect x="-180" y="-30" width="360" height="60" rx="8" fill="#ffffff" stroke="#0f172a" stroke-width="3" filter="url(#cardShadow)"/>
            <text x="0" y="8" font-family="sans-serif" font-size="14" font-weight="bold" fill="#dc2626" text-anchor="middle">
              *Offer valid until Q4 pharma rollout
            </text>
          </g>
        `;
        overlays += renderHandDrawnArrow({ x: 740, y: 450 }, { x: 920, y: 280 }, sceneTime, "FINE PRINT");
      }
    } else {
      // BEAT 4: Broken Hourglass & Glowing Big Pharma Cash Vault with Slam
      const vaultSlam = slamDrop(sceneTime - 17.839, 0.22, { x: 1260, y: 520 }, 280);
      if (vaultSlam.impactOccurred && (sceneTime - 17.839) < 0.4) {
        shakeAmt = vaultSlam.screenShake;
      }
      bg += `
        <ellipse cx="1260" cy="840" rx="220" ry="25" fill="#000000" opacity="0.2"/>
        <g transform="translate(${vaultSlam.x}, ${vaultSlam.y}) scale(${vaultSlam.scaleX * 1.2}, ${vaultSlam.scaleY * 1.2})">
          <rect x="-160" y="-230" width="320" height="28" rx="8" fill="#ca8a04" stroke="#854d0e" stroke-width="7"/>
          <rect x="-160" y="210" width="320" height="28" rx="8" fill="#ca8a04" stroke="#854d0e" stroke-width="7"/>

          <!-- Peeled PR Sticker -->
          <g transform="translate(-50, -10) rotate(-22)">
            <rect x="-110" y="-28" width="220" height="56" rx="8" fill="#fdf4ff" stroke="#ec4899" stroke-width="4" opacity="0.7"/>
            <text x="0" y="9" font-family="'Impact', sans-serif" font-size="18" fill="#be185d" text-anchor="middle">\"BODY POSITIVITY\"</text>
          </g>

          <!-- Big Pharma Cash Vault underneath -->
          <g transform="translate(0, 30)">
            <rect x="-210" y="-60" width="420" height="130" rx="14" fill="#064e3b" stroke="#10b981" stroke-width="7" filter="url(#glow)"/>
            <text x="0" y="-12" font-family="'Impact', sans-serif" font-size="26" fill="#34d399" letter-spacing="2" text-anchor="middle">
              Q4 PHARMA REVENUE
            </text>
            <text x="0" y="38" font-family="'Courier New', monospace" font-size="32" font-weight="bold" fill="#6ee7b7" text-anchor="middle">
              +$42,000,000,000
            </text>
          </g>
        </g>
      `;

      if (isBeat4) {
        overlays += renderActionLines({ x: 1260, y: 520 }, 240, sceneTime);
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
        expression: hostExpr,
        gazeTarget: pointTarget,
      },
    };

    let figuresList: Array<{ id: string; state: any }> = [hostFigure];
    if (isBeat4 || isBeat5) {
      figuresList.push({
        id: "corporate_pr_stick",
        state: {
          x: 1260,
          y: 640,
          scale: 1.28,
          gender: "female",
          hairStyle: "female_bob",
          clothes: "suit",
          expression: "smug_rock_eyebrow",
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

import { renderBossShadow } from "../character/CartoonCast";
import { slamDrop } from "../anim/ObjectMotion";
import { renderHandDrawnArrow, renderHandDrawnCircle, renderActionLines } from "../anim/ComicMarkups";
export const Scene10_BossClosesTab = {
    id: "scene_10_boss_closes_tab",
    name: "Fidget Spinner, Podcast & Boss Closes Tab",
    startTime: 129.384,
    endTime: 150.857,
    render(ctx) {
        const { sceneTime, camera } = ctx;
        // EXACT WORD-LEVEL TIMESTAMPS FROM 0-chapter-1.srt:
        // Cue 46-47 (129.384s - 135.384s / t=0.0s - 6.00s): "temporary trend—kind of like fidget spinners"
        // Cue 48 (135.384s - 138.188s / t=6.00s - 8.804s): "or pretending to care about your friend's podcast"
        // Cue 49-51 (138.188s - 147.308s / t=8.804s - 17.924s): "As soon as a pharmaceutical shortcut dropped... abandoned narrative"
        // Cue 52 (147.308s - 150.268s / t=17.924s - 20.884s): "with the swiftness of someone closing a browser tab when their boss walks by"
        // Beat 5 (150.268s - 150.857s / t=20.884s - 21.473s): Reset & reaction hold
        const isBeat1 = sceneTime < 6.000;
        const isBeat2 = sceneTime >= 6.000 && sceneTime < 8.804;
        const isBeat3 = sceneTime >= 8.804 && sceneTime < 17.924;
        const isBeat4 = sceneTime >= 17.924 && sceneTime < 20.884;
        const isBeat5 = sceneTime >= 20.884;
        let hostX = 460;
        let hostY = 650;
        let hostLean = 0;
        let hostExpr = "deadpan_classic";
        let leftHandProp = "none";
        let rightHandProp = "none";
        let pointTarget = undefined;
        let leftHandTarget = undefined;
        let overlays = "";
        // Directorial Camera Choreography & Character Staging
        if (isBeat1) {
            camera.setTarget(960, 540, 1.05);
            hostX = 460;
            leftHandProp = "fidget_spinner";
            pointTarget = { x: 1260, y: 440 };
            hostExpr = "deadpan_classic";
        }
        else if (isBeat2) {
            camera.setTarget(960, 540, 1.05);
            hostX = 460;
            rightHandProp = "mic";
            pointTarget = { x: 1260, y: 480 };
            hostExpr = "crying_waterfalls";
        }
        else if (isBeat3) {
            camera.setTarget(960, 540, 1.08);
            hostX = 460;
            hostLean = Math.sin(sceneTime * 24) * 4;
            hostExpr = "fear_sweat_freeze";
            pointTarget = { x: 1260, y: 480 };
        }
        else if (isBeat4) {
            camera.setTarget(960, 540, 1.15);
            hostX = 460;
            hostLean = 18;
            pointTarget = { x: 1260, y: 520 };
            leftHandTarget = { x: 1260, y: 520 };
            hostExpr = "fear_screaming";
        }
        else {
            camera.cutTo(460, 540, 1.35);
            hostX = 460;
            hostExpr = "exhausted_melting";
        }
        let bg = `
      <!-- Late Night 2:00 AM Office Cubicle Backdrop -->
      <rect x="-4000" y="-4000" width="10000" height="10000" fill="#020617"/>
      
      <!-- Cubicle Fabric Partition Walls -->
      <rect x="100" y="200" width="1720" height="600" rx="10" fill="#1e293b" stroke="#334155" stroke-width="8"/>
      <line x1="720" y1="200" x2="720" y2="800" stroke="#334155" stroke-width="8"/>
      <line x1="1340" y1="200" x2="1340" y2="800" stroke="#334155" stroke-width="8"/>

      <!-- Pinned Sticky Notes on Cubicle Wall -->
      <rect x="220" y="280" width="80" height="80" fill="#fef08a" transform="rotate(-6 220 280)" filter="url(#cardShadow)"/>
      <text x="235" y="320" font-family="sans-serif" font-size="11" font-weight="bold" fill="#713f12">DEADLINE: YESTERDAY</text>
      <rect x="340" y="290" width="80" height="80" fill="#fbcfe8" transform="rotate(8 340 290)" filter="url(#cardShadow)"/>
      <text x="355" y="330" font-family="sans-serif" font-size="11" font-weight="bold" fill="#831843">PLEASE WORK</text>

      <!-- Dim Ceiling Fluorescent Light -->
      <rect x="700" y="20" width="520" height="30" rx="6" fill="#f8fafc" opacity="${0.7 + Math.sin(sceneTime * 30) * 0.15}" filter="url(#glow)"/>

      <!-- Office Carpet Floor -->
      <rect x="-4000" y="800" width="10000" height="4000" fill="#0f172a"/>
      <line x1="-4000" y1="800" x2="6000" y2="800" stroke="#1e293b" stroke-width="8"/>
    `;
        if (isBeat1) {
            // 3600 RPM Extreme Neon Fidget Spinner
            const spin = sceneTime * 1440;
            bg += `
        <g transform="translate(1380, 440) scale(1.35)">
          <circle cx="0" cy="0" r="170" fill="none" stroke="#38bdf8" stroke-width="5" stroke-dasharray="24 16" opacity="0.6"/>
          <circle cx="0" cy="0" r="230" fill="none" stroke="#ec4899" stroke-width="4" stroke-dasharray="32 20" opacity="0.4"/>

          <g transform="rotate(${spin})">
            <circle cx="0" cy="0" r="40" fill="#0f172a" stroke="#ffffff" stroke-width="6"/>
            <g transform="rotate(0)">
              <rect x="-26" y="-130" width="52" height="130" rx="26" fill="#06b6d4" stroke="#0f172a" stroke-width="7"/>
              <circle cx="0" cy="-100" r="18" fill="#ffffff" stroke="#0f172a" stroke-width="4"/>
            </g>
            <g transform="rotate(120)">
              <rect x="-26" y="-130" width="52" height="130" rx="26" fill="#f59e0b" stroke="#0f172a" stroke-width="7"/>
              <circle cx="0" cy="-100" r="18" fill="#ffffff" stroke="#0f172a" stroke-width="4"/>
            </g>
            <g transform="rotate(240)">
              <rect x="-26" y="-130" width="52" height="130" rx="26" fill="#ec4899" stroke="#0f172a" stroke-width="7"/>
              <circle cx="0" cy="-100" r="18" fill="#ffffff" stroke="#0f172a" stroke-width="4"/>
            </g>
          </g>

          <text x="0" y="230" font-family="'Impact', sans-serif" font-size="32" fill="#0f172a" text-anchor="middle">
            3600 RPM SPEEDRUN
          </text>
        </g>
      `;
            overlays += renderHandDrawnCircle({ x: 1380, y: 440 }, 180, 180, sceneTime, "OBSOLETE IN 2 WEEKS");
        }
        else if (isBeat2) {
            // Friend's Studio Podcast Mic (0 Listeners)
            bg += `
        <g transform="translate(1380, 480) scale(1.3)">
          <line x1="0" y1="120" x2="0" y2="360" stroke="#475569" stroke-width="14"/>
          <ellipse cx="0" cy="360" rx="90" ry="24" fill="#334155"/>
          <rect x="-35" y="20" width="70" height="115" rx="35" fill="#64748b" stroke="#334155" stroke-width="7"/>
          <rect x="-26" y="30" width="52" height="46" rx="5" fill="#1e293b"/>

          <g transform="translate(0, -75)">
            <rect x="-160" y="-35" width="320" height="70" rx="12" fill="#fee2e2" stroke="#dc2626" stroke-width="5" filter="url(#cardShadow)"/>
            <text x="0" y="10" font-family="'Impact', sans-serif" font-size="26" fill="#991b1b" text-anchor="middle">
              PODCAST (0 LISTENERS)
            </text>
          </g>
        </g>
      `;
            overlays += renderHandDrawnArrow({ x: 740, y: 520 }, { x: 1200, y: 420 }, sceneTime, "NO AUDIENCE");
        }
        else if (isBeat3) {
            // Colossal Boss Shadow Looming in Background
            bg += `
        ${renderBossShadow(1380, 220, sceneTime)}
      `;
            overlays += renderActionLines({ x: 540, y: 560 }, 180, sceneTime);
        }
        else {
            // Hydraulic 3D Ctrl + W Emergency Key Slam Climax
            const slam = slamDrop(sceneTime - 17.116, 0.18, { x: 1320, y: 500 }, 300);
            bg += `
        ${renderBossShadow(1540, 220, sceneTime)}

        <!-- Browser Window Tab -->
        <g transform="translate(1320, 240)">
          <rect x="-260" y="-40" width="520" height="80" rx="12" fill="#1e293b" stroke="#0f172a" stroke-width="5" filter="url(#cardShadow)"/>
          <text x="-230" y="10" font-family="sans-serif" font-size="18" fill="#94a3b8">reddit.com/r/memes</text>
          <circle cx="220" cy="0" r="16" fill="#ef4444"/>
          <text x="220" y="7" font-family="sans-serif" font-size="18" font-weight="bold" fill="#fff" text-anchor="middle">X</text>
        </g>

        <!-- Colossal Red 3D Keycap Press Slamming -->
        <g transform="translate(${slam.x}, ${slam.y}) scale(${slam.scaleX * 1.15}, ${slam.scaleY * 1.15})" opacity="${slam.opacity}">
          <rect x="-240" y="-80" width="480" height="160" rx="20" fill="#991b1b" stroke="#7f1d1d" stroke-width="8" filter="url(#cardShadow)"/>
          <rect x="-220" y="-70" width="440" height="130" rx="14" fill="#ef4444"/>
          <text x="0" y="16" font-family="'Impact', sans-serif" font-size="62" fill="#ffffff" letter-spacing="5" text-anchor="middle">
            Ctrl + W
          </text>
          <text x="0" y="52" font-family="sans-serif" font-size="16" font-weight="bold" fill="#fee2e2" letter-spacing="2" text-anchor="middle">
            EMERGENCY TAB CLOSE
          </text>
        </g>
      `;
            if (sceneTime > 17.3 && sceneTime < 19.5) {
                overlays += renderActionLines({ x: 1320, y: 500 }, 300, sceneTime);
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
                leftHandProp: leftHandProp,
                rightHandProp: rightHandProp,
                pointTarget: pointTarget,
                leftHandTarget: leftHandTarget,
                mouthWobble: isBeat3 ? 0.9 : 0,
                expression: hostExpr,
                gazeTarget: isBeat3 ? { x: 1380, y: 220 } : pointTarget,
            },
        };
        let figuresList = [hostFigure];
        if (isBeat3 || isBeat4) {
            figuresList.push({
                id: "boss_figure",
                state: {
                    x: 1380,
                    y: 640,
                    scale: 1.35,
                    gender: "male",
                    hairStyle: "male_short",
                    clothes: "suit",
                    expression: "rage_laser_eyes",
                    pose: "hands_on_hips",
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

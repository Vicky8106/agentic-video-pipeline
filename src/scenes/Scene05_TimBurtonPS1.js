import { renderHandDrawnArrow, renderHandDrawnCircle } from "../anim/ComicMarkups";
export const Scene05_TimBurtonPS1 = {
    id: "scene_05_timburton_ps1",
    name: "Tim Burton Aesthetic & Low-Poly PS1 Graphics",
    startTime: 32.967,
    endTime: 43.729,
    render(ctx) {
        const { sceneTime, camera } = ctx;
        // 1-2-3-4-5 CONTINUOUS BEATS:
        // Cue 11 (32.967s - 36.887s): Host introduces Tim Burton curly mountain world & bats, pointing up.
        // Cue 12 (36.887s - 39.847s): Host 90s close-up with dark circles & insomnia eyes.
        // Cue 13 (39.847s - 41.927s): 3D Low-Poly PS1 grid boots up; host points at spinning polygon mesh.
        // Cue 14 (41.927s - 43.127s): Macro punch-in on PS1 wireframe vertices.
        // Beat 5 (43.127s - 43.729s): Comedic reset hold.
        const isBeat1 = sceneTime < 3.92;
        const isBeat2 = sceneTime >= 3.92 && sceneTime < 6.88;
        const isBeat3 = sceneTime >= 6.88 && sceneTime < 8.96;
        const isBeat4 = sceneTime >= 8.96 && sceneTime < 10.16;
        const isBeat5 = sceneTime >= 10.16;
        let hostX = 520;
        let hostY = 650;
        let hostScale = 1.34;
        let hostLean = 0;
        let hostExpr = "deadpan_classic";
        let pointTarget = undefined;
        let overlays = "";
        // Directorial Camera Choreography - 16:9 Staging (Always keep Host + Gag in frame!)
        if (isBeat1) {
            camera.setTarget(960, 540, 1.05);
            hostX = 440;
            hostLean = 12;
            pointTarget = { x: 1260, y: 380 };
            hostExpr = "deadpan_classic";
        }
        else if (isBeat2) {
            // SNAP CUT to Host Centered 90s Close-Up
            camera.cutTo(960, 540, 1.35);
            hostX = 960;
            hostScale = 1.45;
            hostLean = Math.sin(sceneTime * 4) * 4;
            hostExpr = "dark_circles_insomnia";
        }
        else if (isBeat3) {
            camera.setTarget(960, 540, 1.08);
            hostX = 440;
            hostLean = 8;
            pointTarget = { x: 1260, y: 460 };
            hostExpr = "confused_squint";
        }
        else if (isBeat4) {
            camera.setTarget(960, 540, 1.15);
            hostX = 440;
            hostExpr = "mind_blown_galaxy_brain";
            pointTarget = { x: 1260, y: 440 };
        }
        else {
            camera.cutTo(440, 540, 1.35);
            hostX = 440;
            hostExpr = "deadpan_side_glance";
        }
        let bg = `
      <!-- Full-bleed background -->
      <rect x="-4000" y="-4000" width="10000" height="10000" fill="#f8fafc"/>
      <line x1="-4000" y1="840" x2="6000" y2="840" stroke="#e2e8f0" stroke-width="4"/>
    `;
        if (isBeat1 || isBeat2) {
            // 100% Vector Tim Burton Gothic Nightmare World
            const batWing = Math.sin(sceneTime * 18) * 16;
            bg = `
        <rect x="-4000" y="-4000" width="10000" height="10000" fill="#09090b"/>
        <line x1="-4000" y1="840" x2="6000" y2="840" stroke="#27272a" stroke-width="6"/>

        <!-- Glowing Eerie Crescent Moon -->
        <ellipse cx="1450" cy="220" rx="100" ry="100" fill="#fef08a" filter="url(#glow)"/>
        <ellipse cx="1490" cy="200" rx="90" ry="90" fill="#09090b"/>

        <!-- Iconic Tim Burton Curly Spiral Mountain Peak -->
        <path d="M 700 840 C 900 660 1150 380 1380 400 C 1500 410 1540 520 1440 570 C 1320 620 1380 730 1500 790 C 1620 840 1800 840 2200 840 L 2200 840 L 700 840 Z" fill="#18181b" stroke="#3f3f46" stroke-width="8"/>

        <!-- Twisted Gothic Dead Trees with Curled Branches -->
        <path d="M 1750 840 L 1730 580 Q 1660 480 1580 440 M 1730 580 Q 1810 490 1840 400 M 1730 660 Q 1820 630 1900 590" stroke="#27272a" stroke-width="16" fill="none" stroke-linecap="round"/>

        <!-- Fluttering Bats -->
        <g transform="translate(${1350 - sceneTime * 50}, 140) scale(1.4)">
          <path d="M -30 0 Q -15 ${-20 + batWing} 0 0 Q 15 ${-20 + batWing} 30 0 Q 15 15 0 6 Q -15 15 -30 0 Z" fill="#52525b"/>
        </g>
      `;
            if (isBeat1 && sceneTime > 1.5) {
                overlays += renderHandDrawnArrow({ x: 680, y: 480 }, { x: 1300, y: 380 }, sceneTime, "SPEEDRUN BURTON");
            }
            if (isBeat2) {
                // Flickering 90s VHS OSD Timestamp HUD
                bg += `
          <g transform="translate(960, 280)">
            <rect x="-140" y="-30" width="280" height="60" rx="6" fill="#000000" opacity="0.7"/>
            <text x="0" y="8" font-family="'Courier New', monospace" font-size="22" font-weight="bold" fill="#22d3ee" text-anchor="middle">
              MAY 1997 - SP ▷
            </text>
          </g>
        `;
            }
        }
        else {
            // 100% Vector PS1 Retro 3D Low-Poly Wireframe World
            const angle = (sceneTime - 6.88) * 2.5;
            const cosA = Math.cos(angle);
            const sinA = Math.sin(angle);
            const cx = 1380;
            const cy = 460;
            const r = 240;
            const p1 = `${cx + cosA * r},${cy - 140}`;
            const p2 = `${cx - cosA * r},${cy - 140}`;
            const p3 = `${cx - sinA * (r * 0.9)},${cy + 140}`;
            const p4 = `${cx + sinA * (r * 0.9)},${cy + 140}`;
            const pTop = `${cx},${cy - 240}`;
            const pBot = `${cx},${cy + 240}`;
            bg = `
        <rect x="-4000" y="-4000" width="10000" height="10000" fill="#022c22"/>
        <line x1="-4000" y1="840" x2="6000" y2="840" stroke="#059669" stroke-width="4"/>

        <!-- PS1 Retro Wireframe Floor Grid -->
        <g stroke="#10b981" stroke-width="2.5" opacity="0.75">
          ${[480, 550, 630, 720, 840, 980].map(gy => `<line x1="-2000" y1="${gy}" x2="4000" y2="${gy}"/>`).join("")}
          ${[200, 500, 800, 1100, 1380, 1660, 1960, 2260].map(gx => `<line x1="${gx}" y1="480" x2="${gx + (gx - 1380) * 1.8}" y2="1080"/>`).join("")}
        </g>

        <!-- Spinning 3D Polygonal Mesh (Low-Poly Character) -->
        <polygon points="${pTop} ${p1} ${p4}" fill="#34d399" stroke="#047857" stroke-width="5"/>
        <polygon points="${pTop} ${p2} ${p3}" fill="#059669" stroke="#047857" stroke-width="5"/>
        <polygon points="${pBot} ${p3} ${p4}" fill="#047857" stroke="#065f46" stroke-width="5"/>
        <polygon points="${pTop} ${p1} ${p2}" fill="#6ee7b7" stroke="#059669" stroke-width="5"/>

        <!-- Retro PS1 HUD Badge -->
        <g transform="translate(1380, 160)">
          <rect x="-180" y="-30" width="360" height="60" rx="8" fill="#0f172a" stroke="#10b981" stroke-width="4" filter="url(#glow)"/>
          <text x="0" y="10" font-family="'Courier New', monospace" font-size="24" font-weight="bold" fill="#34d399" text-anchor="middle">
            PS1 : 240p | 14 POLYS
          </text>
        </g>

        <!-- CRT Scanline Overlay -->
        <g stroke="#000000" stroke-width="3" opacity="0.35">
          ${Array.from({ length: 45 }).map((_, i) => `<line x1="-2000" y1="${i * 24}" x2="4000" y2="${i * 24}"/>`).join("")}
        </g>
      `;
            if (isBeat3 || isBeat4) {
                overlays += renderHandDrawnCircle({ x: 1380, y: 460 }, 220, 160, sceneTime, "14 POLYGONS");
            }
        }
        const hostFigure = {
            id: "host_stick",
            state: {
                x: hostX,
                y: hostY,
                scale: hostScale,
                timeSec: sceneTime,
                spineLean: hostLean,
                pointTarget: pointTarget,
                expression: hostExpr,
                gazeTarget: pointTarget,
            },
        };
        let figuresList = [hostFigure];
        if (isBeat1) {
            figuresList.push({
                id: "gothic_widow_figure",
                state: {
                    x: 1380,
                    y: 640,
                    scale: 1.25,
                    gender: "widow",
                    hairStyle: "widow_veil",
                    clothes: "dress_black",
                    expression: "dark_circles_insomnia",
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

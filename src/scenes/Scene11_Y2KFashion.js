import { renderEvictedOrgans } from "../character/CartoonCast";
import { popInSquash, slamDrop } from "../anim/ObjectMotion";
import { renderHandDrawnArrow, renderHandDrawnCircle, renderActionLines } from "../anim/ComicMarkups";
export const Scene11_Y2KFashion = {
    id: "scene_11_y2k_fashion",
    name: "Y2K Organ-Hostile Fashion & Miu Miu Micro-Belt",
    startTime: 150.857,
    endTime: 183.851,
    render(ctx) {
        const { sceneTime, camera } = ctx;
        // EXACT WORD-LEVEL TIMESTAMPS FROM 0-chapter-1.srt:
        // Cue 53-54 (150.857s - 156.537s / t=0.0s - 5.680s): "bring back Y2K fashion"
        // Cue 55-56 (156.537s - 163.180s / t=5.680s - 12.323s): "hostile to anyone who possesses internal organs"
        // Cue 57 (163.180s - 166.963s / t=12.323s - 16.106s): "low-rise jeans that sit below the pelvic bone"
        // Cue 58 (166.963s - 170.243s / t=16.106s - 19.386s): "baby tees that offer coverage of a napkin"
        // Cue 59-60 (170.243s - 176.163s / t=19.386s - 25.306s): "Miu Miu micro-skirt... belt that costs $2000"
        // Cue 61-65 (176.163s - 183.851s / t=25.306s - 32.994s): "functioning digestive tract... medical industry cheat code"
        const isBeat1 = sceneTime < 5.680;
        const isBeat2 = sceneTime >= 5.680 && sceneTime < 12.323;
        const isBeat3 = sceneTime >= 12.323 && sceneTime < 16.106;
        const isBeat4 = sceneTime >= 16.106 && sceneTime < 19.386;
        const isBeat5 = sceneTime >= 19.386 && sceneTime < 25.306;
        const isBeat6 = sceneTime >= 25.306;
        let hostX = 440;
        let hostY = 650;
        let hostLean = 0;
        let isWalking = false;
        let hostExpr = "deadpan_classic";
        let pointTarget = undefined;
        let overlays = "";
        let shakeAmt = 0;
        // Directorial Camera Choreography & Character Staging
        if (isBeat1) {
            camera.setTarget(960, 540, 1.05);
            hostX = 440;
            hostLean = 8;
            pointTarget = { x: 1260, y: 500 };
            hostExpr = "smug_rock_eyebrow";
        }
        else if (isBeat2) {
            camera.setTarget(960, 540, 1.05);
            hostX = 440;
            hostLean = 14;
            pointTarget = { x: 1260, y: 640 };
            hostExpr = "disgust_shudder";
        }
        else if (isBeat3) {
            camera.setTarget(960, 540, 1.08);
            hostX = 440;
            pointTarget = { x: 1260, y: 490 };
            hostExpr = "shock_eye_pop";
        }
        else if (isBeat4) {
            camera.setTarget(960, 540, 1.08);
            hostX = 440;
            pointTarget = { x: 1260, y: 490 };
            hostExpr = "confused_squint";
        }
        else if (isBeat5) {
            camera.setTarget(960, 540, 1.15);
            hostX = 440;
            hostLean = -14;
            pointTarget = { x: 1260, y: 620 };
            hostExpr = "shock_eye_pop";
        }
        else {
            camera.cutTo(440, 540, 1.35);
            hostX = 440;
            pointTarget = { x: 1260, y: 480 };
            hostExpr = "deadpan_shrug";
        }
        let bg = `
      <!-- Y2K Cyber Mall Boutique Backdrop -->
      <rect x="-4000" y="-4000" width="10000" height="10000" fill="#f5f3ff"/>
      
      <!-- Metallic Silver Boutique Wall Panels -->
      <rect x="150" y="120" width="1620" height="660" rx="16" fill="#ede9fe" stroke="#c084fc" stroke-width="8"/>
      
      <!-- Neon Hot Pink Sign -->
      <g transform="translate(960, 180)">
        <rect x="-240" y="-40" width="480" height="80" rx="20" fill="#0f172a" stroke="#ec4899" stroke-width="6" filter="url(#glow)"/>
        <text x="0" y="14" font-family="'Impact', sans-serif" font-size="34" fill="#f472b6" letter-spacing="3" text-anchor="middle">
          ★ Y2K FASHION LAB ★
        </text>
      </g>

      <!-- Clothes Rack on Left -->
      <g transform="translate(180, 520)">
        <line x1="0" y1="0" x2="160" y2="0" stroke="#94a3b8" stroke-width="6"/>
        <line x1="10" y1="0" x2="10" y2="280" stroke="#94a3b8" stroke-width="8"/>
        <line x1="150" y1="0" x2="150" y2="280" stroke="#94a3b8" stroke-width="8"/>
        <!-- Hanging 1-inch Baby Tees -->
        <rect x="30" y="10" width="40" height="24" rx="2" fill="#f43f5e"/>
        <rect x="85" y="10" width="35" height="20" rx="2" fill="#38bdf8"/>
      </g>

      <!-- Y2K Checkerboard Boutique Floor -->
      <rect x="-4000" y="780" width="10000" height="4000" fill="#7c3aed"/>
      <line x1="-4000" y1="780" x2="6000" y2="780" stroke="#e879f9" stroke-width="8"/>
    `;
        if (isBeat1) {
            // BEAT 1: Y2K Cyber Hologram & Denim Blueprint
            const denimPop = popInSquash(sceneTime, 0.35, { x: 1250, y: 480 });
            bg += `
        <g transform="translate(${denimPop.x}, ${denimPop.y}) scale(${denimPop.scaleX * 1.8}, ${denimPop.scaleY * 1.8})" opacity="${denimPop.opacity}">
          <path d="M -90 -40 L 90 -40 L 110 180 L 30 180 L 15 20 L -15 20 L -30 180 L -110 180 Z" fill="#e0f2fe" stroke="#0284c7" stroke-width="6" stroke-dasharray="14 10"/>
          <rect x="-140" y="-80" width="280" height="40" rx="8" fill="#0f172a" stroke="#0284c7" stroke-width="3"/>
          <text x="0" y="-54" font-family="'Impact', sans-serif" font-size="20" fill="#38bdf8" text-anchor="middle">Y2K LOW-RISE DENIM META</text>
        </g>
      `;
        }
        else if (isBeat2) {
            // BEAT 2: High Scale Evicted Organs with Suitcases & Eviction Notice Slam
            const evictTime = sceneTime - 6.243;
            const slam = slamDrop(evictTime, 0.22, { x: 1250, y: 260 }, 300);
            if (slam.impactOccurred && evictTime < 0.4) {
                shakeAmt = slam.screenShake;
            }
            bg += `
        <!-- Evicted Organs Grounded on Floor (Scale 2.0) -->
        <g transform="translate(1250, 640) scale(1.9)">
          ${renderEvictedOrgans(0, 0, sceneTime)}
        </g>

        <!-- Slamming Red Eviction Notice Stamp -->
        <g transform="translate(${slam.x}, ${slam.y}) rotate(-8) scale(${slam.scaleX * 1.3}, ${slam.scaleY * 1.3})" opacity="${slam.opacity}">
          <rect x="-180" y="-50" width="360" height="100" rx="16" fill="#fee2e2" stroke="#dc2626" stroke-width="9" filter="url(#cardShadow)"/>
          <text x="0" y="14" font-family="'Impact', sans-serif" font-size="34" fill="#991b1b" letter-spacing="3" text-anchor="middle">
            EVICTION NOTICE
          </text>
          <text x="0" y="38" font-family="sans-serif" font-size="14" font-weight="bold" fill="#dc2626" text-anchor="middle">
            [ALL ORGANS MUST VACATE BY 2002]
          </text>
        </g>
      `;
            overlays += renderHandDrawnArrow({ x: 650, y: 580 }, { x: 1050, y: 640 }, sceneTime, "INTERNAL ORGANS LEAVING");
        }
        else if (isBeat3) {
            // BEAT 3: Large Mannequin in Low-Rise Jeans + Napkin Baby Tee
            const manPop = popInSquash(sceneTime - 12.826, 0.35, { x: 1250, y: 540 });
            bg += `
        <g transform="translate(${manPop.x}, ${manPop.y}) scale(${manPop.scaleX * 1.85}, ${manPop.scaleY * 1.85})" opacity="${manPop.opacity}">
          <ellipse cx="0" cy="180" rx="75" ry="18" fill="#334155" stroke="#0f172a" stroke-width="4" filter="url(#cardShadow)"/>
          <line x1="0" y1="60" x2="0" y2="180" stroke="#475569" stroke-width="12"/>

          <circle cx="0" cy="-120" r="32" fill="none" stroke="#111" stroke-width="7"/>
          <line x1="0" y1="-88" x2="0" y2="30" stroke="#111" stroke-width="8"/>
          
          <!-- Napkin Baby Tee -->
          <rect x="-45" y="-75" width="90" height="52" rx="6" fill="#f43f5e" stroke="#111" stroke-width="5"/>
          <text x="0" y="-44" font-family="'Impact', sans-serif" font-size="18" fill="#fff" text-anchor="middle">BABY TEE</text>

          <polygon points="-60,-20 60,-20 90,75 -90,75" fill="#a16207" stroke="#78350f" stroke-width="7"/>
          <line x1="-25" y1="75" x2="-25" y2="178" stroke="#111" stroke-width="8"/>
          <line x1="25" y1="75" x2="25" y2="178" stroke="#111" stroke-width="8"/>

          <!-- High-Visibility Label Badge -->
          <g transform="translate(0, -180)">
            <rect x="-230" y="-30" width="460" height="60" rx="10" fill="#0f172a" stroke="#f43f5e" stroke-width="5" filter="url(#cardShadow)"/>
            <text x="0" y="8" font-family="'Impact', sans-serif" font-size="22" fill="#fda4af" letter-spacing="1" text-anchor="middle">
              ACTUAL SIZE: DINNER NAPKIN
            </text>
          </g>
        </g>
      `;
            overlays += renderHandDrawnCircle({ x: 1250, y: 440 }, 140, 90, sceneTime, "4x4 INCHES");
        }
        else if (isBeat4) {
            // BEAT 4: Miu Miu 1-Inch Leather Belt & Dangling $2,400.00 Price Tag Climax
            const tagSwing = Math.sin((sceneTime - 19.386) * 8) * Math.exp(-(sceneTime - 19.386) * 0.3) * 22;
            bg += `
        <g transform="translate(1250, 540) scale(1.85)">
          <ellipse cx="0" cy="180" rx="75" ry="18" fill="#334155" stroke="#0f172a" stroke-width="4" filter="url(#cardShadow)"/>
          <line x1="0" y1="-10" x2="0" y2="180" stroke="#475569" stroke-width="12"/>

          <circle cx="0" cy="-120" r="32" fill="none" stroke="#111" stroke-width="7"/>
          <line x1="0" y1="-88" x2="0" y2="30" stroke="#111" stroke-width="8"/>
          <rect x="-45" y="-75" width="90" height="52" rx="6" fill="#f43f5e" stroke="#111" stroke-width="5"/>
          <text x="0" y="-44" font-family="'Impact', sans-serif" font-size="18" fill="#fff" text-anchor="middle">BABY TEE</text>

          <!-- Microscopic 1-Inch Leather Belt -->
          <rect x="-70" y="-20" width="140" height="26" rx="4" fill="#78350f" stroke="#451a03" stroke-width="6"/>
          <rect x="-15" y="-26" width="30" height="38" rx="5" fill="#eab308" stroke="#a16207" stroke-width="4"/>

          <line x1="-25" y1="-10" x2="-25" y2="178" stroke="#111" stroke-width="8"/>
          <line x1="25" y1="-10" x2="25" y2="178" stroke="#111" stroke-width="8"/>

          <!-- Dangling Gold Foil $2,400.00 Price Tag on String -->
          <g transform="translate(70, -10) rotate(${tagSwing})">
            <line x1="0" y1="0" x2="55" y2="55" stroke="#94a3b8" stroke-width="4.5" stroke-dasharray="6 4"/>
            <g transform="translate(55, 55) rotate(10)">
              <polygon points="-15,-5 240,-35 270,65 15,95" fill="#fef08a" stroke="#ca8a04" stroke-width="6" filter="url(#glow)"/>
              <circle cx="15" cy="18" r="8" fill="#78350f"/>
              <text x="135" y="42" font-family="'Impact', sans-serif" font-size="42" fill="#dc2626" text-anchor="middle">
                $2,400.00
              </text>
            </g>
          </g>
        </g>
      `;
            overlays += renderHandDrawnCircle({ x: 1450, y: 580 }, 180, 110, sceneTime, "JUST A BELT");
            overlays += renderActionLines({ x: 1450, y: 580 }, 220, sceneTime);
        }
        else {
            // BEAT 5: Final Resolution - Error 404 Digestive Warning & Lone Saltine Cracker with slam
            const errSlam = slamDrop(sceneTime - 25.914, 0.2, { x: 1250, y: 480 }, 220);
            bg += `
        <g transform="translate(${errSlam.x}, ${errSlam.y}) scale(${errSlam.scaleX * 1.4}, ${errSlam.scaleY * 1.4})" opacity="${errSlam.opacity}">
          <rect x="-240" y="-120" width="480" height="240" rx="16" fill="#0f172a" stroke="#ef4444" stroke-width="7" filter="url(#cardShadow)"/>
          <text x="0" y="-60" font-family="'Impact', sans-serif" font-size="34" fill="#ef4444" text-anchor="middle">
            [ERROR 404]
          </text>
          <text x="0" y="-15" font-family="sans-serif" font-size="20" font-weight="bold" fill="#ffffff" text-anchor="middle">
            DIGESTIVE SYSTEM INCOMPATIBLE
          </text>
          <text x="0" y="22" font-family="sans-serif" font-size="17" fill="#94a3b8" text-anchor="middle">
            WITH CURRENT FASHION META
          </text>
          
          <g transform="translate(0, 75)">
            <rect x="-45" y="-18" width="90" height="36" rx="5" fill="#fef3c7" stroke="#d97706" stroke-width="4"/>
            <circle cx="-20" cy="0" r="2.5" fill="#b45309"/>
            <circle cx="0" cy="0" r="2.5" fill="#b45309"/>
            <circle cx="20" cy="0" r="2.5" fill="#b45309"/>
          </g>
        </g>
      `;
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
        let figuresList = [hostFigure];
        if (isBeat1 || isBeat3 || isBeat4 || isBeat5) {
            figuresList.push({
                id: "y2k_model_stick",
                state: {
                    x: 1260,
                    y: 640,
                    scale: 1.28,
                    gender: "female",
                    hairStyle: "female_ponytail",
                    clothes: "crop_top_leggings",
                    expression: isBeat5 ? "smug_peace_sign" : "smug_chef_kiss",
                    pose: isBeat5 ? "waving" : "hands_on_hips",
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

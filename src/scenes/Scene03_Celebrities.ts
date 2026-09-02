import { Scene, SceneRenderContext, SceneRenderOutput } from "./SceneTypes";
import { popInSquash } from "../anim/ObjectMotion";
import { renderCaliperRig } from "../character/PropRigs";
import { renderHandDrawnArrow, renderHandDrawnCircle, renderActionLines } from "../anim/ComicMarkups";

export const Scene03_Celebrities: Scene = {
  id: "scene_03_celebrities",
  name: "Jenna Ortega, Emma Stone, Ariana & Cheekbone Calipers",
  startTime: 15.334,
  endTime: 22.805,

  render(ctx: SceneRenderContext): SceneRenderOutput {
    const { sceneTime, camera } = ctx;

    // Word-Level Timestamps:
    // 0.0s - 1.8s: Jenna Ortega in Gothic Black Evening Gown
    // 1.8s - 3.8s: Emma Stone in Emerald Glamour Dress
    // 3.8s - 5.5s: Ariana Grande with high ponytail & chic crop top
    // 5.5s - 7.47s: Digital Calipers clamping cheekbones down to 0.02 mm!

    const showEmma = sceneTime >= 1.8 && sceneTime < 3.8;
    const showAriana = sceneTime >= 3.8;
    const showCaliper = sceneTime >= 5.5;

    let overlays = "";

    // Dynamic Camera Framing
    if (!showEmma && !showAriana) {
      // Focus on Jenna Ortega
      camera.setTarget(960, 520, 1.25);
    } else if (showEmma) {
      // Pan to Emma Stone
      camera.setTarget(960, 520, 1.25);
    } else if (showAriana && !showCaliper) {
      // Pan to Ariana Grande
      camera.setTarget(960, 520, 1.25);
    } else {
      // Macro punch-in on digital caliper measuring cheekbone down to 0.02mm
      camera.cutTo(960, 480, 1.65);
    }

    let bg = `
      <!-- Beverly Hills Vanity Salon Backdrop -->
      <rect x="-4000" y="-4000" width="10000" height="10000" fill="#fdf2f8"/>
      
      <!-- Striped Salon Wallpaper -->
      <path d="M 0,0 L 2000,0" stroke="#fbcfe8" stroke-width="40" stroke-dasharray="40 80"/>
      
      <!-- Arched Vanity Dressing Mirror -->
      <path d="M 760 800 L 760 260 A 200 200 0 0 1 1160 260 L 1160 800 Z" fill="#e0f2fe" stroke="#f472b6" stroke-width="8" opacity="0.7"/>

      <!-- Glowing Vanity Marquee Light Bulbs -->
      ${[760, 810, 860, 910, 960, 1010, 1060, 1110, 1160].map(bx => `
        <circle cx="${bx}" cy="180" r="12" fill="#fef08a" stroke="#ca8a04" stroke-width="2" filter="url(#glow)"/>
      `).join("")}

      <!-- Gold Trim Baseboard & Velvet Floor -->
      <rect x="-4000" y="800" width="10000" height="4000" fill="#831843"/>
      <line x1="-4000" y1="800" x2="6000" y2="800" stroke="#facc15" stroke-width="10"/>
    `;

    // Title Card for active celebrity
    const celebName = !showEmma && !showAriana ? "JENNA ORTEGA" : showEmma ? "EMMA STONE" : "ARIANA GRANDE";
    const celebBorder = !showEmma && !showAriana ? "#dc2626" : showEmma ? "#10b981" : "#c084fc";

    bg += `
      <!-- Character Label Card -->
      <g transform="translate(960, 190)">
        <rect x="-140" y="-28" width="280" height="56" rx="12" fill="#0f172a" stroke="${celebBorder}" stroke-width="4" filter="url(#cardShadow)"/>
        <text x="0" y="8" font-family="'Impact', sans-serif" font-size="24" fill="#ffffff" letter-spacing="2" text-anchor="middle">
          ${celebName}
        </text>
      </g>
    `;

    // Digital Calipers Clamping Cheekbones
    if (showCaliper) {
      const clampElapsed = sceneTime - 5.5;
      const caliperClamp = Math.min(1, clampElapsed / 0.5);
      const jawGap = 65 - caliperClamp * 42;
      
      const currentVal = caliperClamp < 1 
        ? ((1 - caliperClamp) * 14.4 + 0.02).toFixed(2) + " mm"
        : "0.02 mm";

      bg += `
        <!-- Forensic Radar Target Grid on Cheekbones -->
        <g stroke="#ef4444" stroke-width="2.5" opacity="0.85">
          <circle cx="960" cy="500" r="95" fill="none" stroke-dasharray="8 6"/>
          <line x1="840" y1="500" x2="1080" y2="500"/>
          <line x1="960" y1="380" x2="960" y2="620"/>
        </g>

        <!-- Mechanical Digital Caliper Rig -->
        ${renderCaliperRig({
          x: 960,
          y: 450,
          scale: 1.8,
          jawGap: jawGap,
          lcdValue: currentVal,
          laserActive: true,
          timeSec: sceneTime,
        })}
      `;

      overlays += renderHandDrawnCircle({ x: 960, y: 450 }, 140, 90, sceneTime, "FAT: ZERO");
      overlays += renderActionLines({ x: 960, y: 450 }, 220, sceneTime);
    }

    // Active Celebrity Actor
    let hair = "female_bob_bangs";
    let clothes: any = "dress_black";
    let expr = "deadpan_soul_stare";

    if (!showEmma && !showAriana) {
      hair = "female_bob_bangs";
      clothes = "dress_black";
      expr = "deadpan_soul_stare";
    } else if (showEmma) {
      hair = "female_blonde_curls";
      clothes = "dress_pink";
      expr = "smug_chef_kiss";
    } else {
      hair = "female_high_ponytail";
      clothes = "y2k_crop_top_low_rise";
      expr = showCaliper ? "cringe_teeth_grit" : "smug_peace_sign";
    }

    const celebActor = {
      id: "celeb_actor",
      state: {
        x: 960,
        y: 640,
        scale: 1.34,
        gender: "female",
        hairStyle: hair,
        clothes: clothes,
        expression: expr,
        timeSec: sceneTime,
      } as any,
    };

    return {
      backgroundSvg: bg + overlays,
      stickFigures: [celebActor],
    };
  },
};

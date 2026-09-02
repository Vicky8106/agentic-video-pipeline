import json
import os
from datetime import datetime

patches = {}

patches["scene_01_ecosystem"] = """import { Scene, SceneRenderContext, SceneRenderOutput } from "./SceneTypes";
import { renderPaparazzi } from "../character/CartoonCast";

export const Scene01_Ecosystem: Scene = {
  id: "scene_01_ecosystem",
  name: "Hollywood Red Carpet & Instagram Ecosystem",
  startTime: 0.0,
  endTime: 8.620,

  render(ctx: SceneRenderContext): SceneRenderOutput {
    const { sceneTime, camera } = ctx;

    // 1-2-3-4 BEATS MATCHING 0-CHAPTER-1.SRT CUES 1-3:
    // Cue 1 (0.000s - 2.000s): "If you've looked at a red carpet, a movie screen..."
    // Cue 2 (2.000s - 4.800s): "...or your Instagram feed anytime in the last eighteen months..."
    // Cue 3 (4.800s - 7.500s): "...you might have noticed a slight shift in the local Hollywood ecosystem."
    // Beat 4 (7.500s - 8.620s): Comedic deadpan hold / reaction
    const isBeat1 = sceneTime < 2.0;
    const isBeat2 = sceneTime >= 2.0 && sceneTime < 4.8;
    const isBeat3 = sceneTime >= 4.8 && sceneTime < 7.5;
    const isBeat4 = sceneTime >= 7.5;

    let hostX = 960;
    let hostExpr: any = "deadpan_classic";

    let bg = `
      <!-- Infinite full-bleed backdrop for unconstrained panning -->
      <rect x="-4000" y="-4000" width="10000" height="10000" fill="#f8fafc"/>
      <line x1="-4000" y1="840" x2="6000" y2="840" stroke="#e2e8f0" stroke-width="4"/>
    `;

    if (isBeat1) {
      // BEAT 1: SETUP - Red Carpet with Scaled Paparazzi
      camera.setTarget(960, 540, 1.04);
      hostX = 960;
      hostExpr = "deadpan_classic";

      const flashLeft = Math.sin(sceneTime * 24) > 0.3;
      const flashRight = Math.cos(sceneTime * 20) > 0.3;

      bg += `
        <!-- Hollywood Hills Silhouette -->
        <path d="M -1000 540 Q 400 340 1000 500 T 2600 400 L 2600 840 L -1000 840 Z" fill="#e2e8f0"/>

        <!-- Grand Red Carpet Runway -->
        <polygon points="540,840 960,480 1380,840" fill="#dc2626"/>
        <line x1="540" y1="840" x2="960" y2="480" stroke="#b91c1c" stroke-width="6"/>
        <line x1="1380" y1="840" x2="960" y2="480" stroke="#b91c1c" stroke-width="6"/>

        <!-- Gold Stanchions & Velvet Ropes -->
        <line x1="420" y1="650" x2="680" y2="610" stroke="#991b1b" stroke-width="10"/>
        <line x1="1500" y1="610" x2="1240" y2="650" stroke="#991b1b" stroke-width="10"/>
        <circle cx="420" cy="540" r="20" fill="#eab308" stroke="#ca8a04" stroke-width="4"/>
        <line x1="420" y1="540" x2="420" y2="840" stroke="#eab308" stroke-width="10"/>
        <circle cx="1500" cy="540" r="20" fill="#eab308" stroke="#ca8a04" stroke-width="4"/>
        <line x1="1500" y1="540" x2="1500" y2="840" stroke="#eab308" stroke-width="10"/>

        <!-- High-Scale Paparazzi (Scale: 1.30) -->
        <g transform="translate(180, 640) scale(1.3)">
          ${renderPaparazzi(0, 0, flashLeft)}
        </g>
        <g transform="translate(1740, 640) scale(1.3)">
          ${renderPaparazzi(0, 0, flashRight)}
        </g>
      `;
    } else if (isBeat2) {
      // BEAT 2: ESCALATION - Snap Punch-In on Giant Instagram Phone Drop (1.45x)
      camera.setTarget(1350, 500, 1.45);
      hostX = 520;
      hostExpr = "skeptical_side_eye";

      const phoneProgress = Math.min(1, (sceneTime - 2.0) / 0.35);
      const phoneY = 500 - (1 - phoneProgress) * 350;
      const likeHeartPop = (sceneTime - 2.0) > 0.7;

      bg += `
        <!-- Floating Instagram Feed Card (Scale: 1.15) -->
        <g id="phone-feed" transform="translate(1350, ${phoneY}) scale(1.15)">
          <rect x="-190" y="-330" width="380" height="660" rx="38" fill="#0f172a" stroke="#334155" stroke-width="6" filter="url(#cardShadow)"/>
          <rect x="-170" y="-290" width="340" height="580" rx="20" fill="#ffffff"/>
          <rect x="-40" y="-315" width="80" height="10" rx="5" fill="#334155"/>
          <circle cx="65" cy="-310" r="6" fill="#334155"/>

          <g transform="translate(-140, -250)">
            <circle cx="18" cy="18" r="18" fill="#ec4899"/>
            <text x="45" y="24" font-family="sans-serif" font-size="16" font-weight="bold" fill="#0f172a">@hollywood</text>
            <circle cx="150" cy="18" r="8" fill="#0284c7"/>
            <text x="150" y="22" font-size="10" fill="#fff" text-anchor="middle" font-weight="bold">✓</text>
          </g>

          <g transform="translate(0, -70)">
            <rect x="-140" y="-120" width="280" height="240" rx="10" fill="#f0f9ff" stroke="#e0f2fe" stroke-width="2"/>
            <circle cx="0" cy="-20" r="50" fill="#38bdf8"/>
            <path d="M -70 80 Q -35 25 0 25 Q 35 25 70 80 Z" fill="#0284c7"/>
          </g>

          <g transform="translate(-130, 120)">
            <path d="M 0 0 C -8 -12 -22 0 0 20 C 22 0 8 -12 0 0 Z" fill="#ef4444" transform="scale(1.3)"/>
            <text x="40" y="16" font-family="sans-serif" font-size="20" font-weight="bold" fill="#0f172a">2.4M likes</text>
          </g>

          ${likeHeartPop ? `
            <g transform="translate(40, -70) scale(1.6)">
              <path d="M 0 0 C -15 -20 -35 5 0 25 C 35 5 15 -20 0 0 Z" fill="#ec4899" filter="url(#glow)"/>
            </g>
          ` : ""}
        </g>
      `;
    } else if (isBeat3) {
      // BEAT 3: PUNCHLINE - Hollywood Ecosystem Shift Punch-In (1.40x)
      camera.setTarget(1380, 520, 1.40);
      hostX = 520;
      hostExpr = "smug_rock_eyebrow";

      const beamRotate1 = Math.sin(sceneTime * 2) * 15;
      const beamRotate2 = -Math.cos(sceneTime * 2.2) * 15;

      bg += `
        <!-- Criss-Crossing Golden Searchlights in Sky -->
        <g transform="translate(1100, 840) rotate(${beamRotate1})">
          <polygon points="-30,0 30,0 200,-1200 -200,-1200" fill="#fef08a" opacity="0.25"/>
        </g>
        <g transform="translate(1650, 840) rotate(${beamRotate2})">
          <polygon points="-30,0 30,0 200,-1200 -200,-1200" fill="#fef08a" opacity="0.25"/>
        </g>

        <!-- Hollywood Hills Silhouette -->
        <path d="M 400 840 Q 1200 420 2200 840 Z" fill="#cbd5e1"/>

        <!-- Large Satirical Ecosystem Billboard -->
        <g transform="translate(1380, 500) rotate(-3)">
          <rect x="-300" y="-70" width="600" height="140" rx="14" fill="#ffffff" stroke="#0f172a" stroke-width="7" filter="url(#cardShadow)"/>
          <text x="0" y="-10" font-family="'Impact', sans-serif" font-size="44" fill="#dc2626" letter-spacing="3" text-anchor="middle">
            HOLLYWOOD ECOSYSTEM
          </text>
          <text x="0" y="38" font-family="sans-serif" font-size="20" font-weight="bold" fill="#0284c7" text-anchor="middle">
            [DOWNSIZED FOR MAXIMUM LEANNESS]
          </text>
        </g>
      `;
    } else {
      // BEAT 4: REACTION - Hard Cut to Host Deadpan Slow Blink (1.45x)
      camera.setTarget(520, 560, 1.45);
      hostX = 520;
      hostExpr = "deadpan_slow_blink";
    }

    const hostFigure = {
      id: "host_stick",
      state: {
        x: hostX,
        y: 650,
        scale: 1.32,
        timeSec: sceneTime,
        expression: hostExpr,
      },
    };

    return {
      backgroundSvg: bg,
      stickFigures: [hostFigure],
    };
  },
};"""

patches["scene_02_techbro"] = """import { Scene, SceneRenderContext, SceneRenderOutput } from "./SceneTypes";
import { renderTechBro } from "../character/CartoonCast";

export const Scene02_TechBro: Scene = {
  id: "scene_02_techbro",
  name: "Thicc to Stick & Tech Bro Pivot",
  startTime: 8.620,
  endTime: 15.334,

  render(ctx: SceneRenderContext): SceneRenderOutput {
    const { sceneTime, camera } = ctx;

    // 1-2-3-4-5 BEATS MATCHING 0-CHAPTER-1.SRT CUES 4 & 5:
    // Cue 4 (8.620s - 11.900s): "The timeline has gone from 'Thicc' to 'stick' faster than a tech"
    // Cue 5 (11.900s - 14.780s): "bro pivoting from crypto to artificial intelligence."
    // Beat 5 (14.780s - 15.334s): Comedic finger guns pause
    const isBeat1 = sceneTime < 1.48;
    const isBeat2 = sceneTime >= 1.48 && sceneTime < 3.28;
    const isBeat3 = sceneTime >= 3.28 && sceneTime < 4.68;
    const isBeat4 = sceneTime >= 4.68 && sceneTime < 6.16;
    const isBeat5 = sceneTime >= 6.16;

    let hostExpr: any = "deadpan_classic";
    if (isBeat2) {
      hostExpr = "confused_double_take";
    } else if (isBeat3) {
      hostExpr = "confused_squint";
    } else if (isBeat4) {
      hostExpr = "smug_rock_eyebrow";
    } else if (isBeat5) {
      hostExpr = "smug_finger_guns";
    }

    // Dynamic Camera Choreography
    if (isBeat1) {
      camera.setTarget(960, 540, 1.05);
    } else if (isBeat2) {
      // Snap pan-zoom tracking slider velocity to STICK
      camera.setTarget(1100, 480, 1.25);
    } else if (isBeat3) {
      // Snap punch-in on Smoke Poof Cloud Explosion (1.50x)
      camera.setTarget(1380, 540, 1.50);
    } else if (isBeat4) {
      // Snap punch-in on AI Founder & Terminal HUD (1.55x)
      camera.setTarget(1380, 480, 1.55);
    } else {
      // Hard Cut back to Host Finger Guns (1.45x)
      camera.setTarget(520, 560, 1.45);
    }

    const sliderProgress = isBeat1 ? 0 : Math.min(1, (sceneTime - 1.48) / 0.7);
    const sliderX = 720 + sliderProgress * 540;

    let bg = `
      <!-- Infinite full-bleed backdrop -->
      <rect x="-4000" y="-4000" width="10000" height="10000" fill="#f8fafc"/>
      <line x1="-4000" y1="840" x2="6000" y2="840" stroke="#e2e8f0" stroke-width="4"/>
    `;

    if (isBeat1 || isBeat2) {
      // High-Visibility Animated Timeline Velocity Slider
      bg += `
        <g transform="translate(0, 170)">
          <rect x="720" y="0" width="540" height="30" rx="15" fill="#e2e8f0" stroke="#0f172a" stroke-width="5"/>
          <rect x="720" y="0" width="${sliderProgress * 540}" height="30" rx="15" fill="#38bdf8"/>

          <!-- Marker 1: THICC -->
          <circle cx="720" cy="15" r="26" fill="#f43f5e" stroke="#0f172a" stroke-width="5"/>
          <text x="720" y="70" font-family="'Impact', sans-serif" font-size="26" fill="#be123c" text-anchor="middle">"THICC"</text>

          <!-- Marker 2: STICK -->
          <circle cx="1260" cy="15" r="26" fill="#0284c7" stroke="#0f172a" stroke-width="5"/>
          <text x="1260" y="70" font-family="'Impact', sans-serif" font-size="26" fill="#0369a1" text-anchor="middle">"STICK"</text>

          <!-- Animated Slider Knob -->
          <circle cx="${sliderX}" cy="15" r="34" fill="#eab308" stroke="#0f172a" stroke-width="6" filter="url(#glow)"/>
        </g>

        <!-- Crypto Bro Rig (Scale: 1.38) -->
        ${renderTechBro({ x: 1380, y: 630, scale: 1.38, mode: "crypto", timeSec: sceneTime })}
      `;
    } else if (isBeat3) {
      // Massive Poof Cloud Explosion with flying crypto debris
      bg += `
        <g stroke="#f59e0b" stroke-width="6" opacity="0.9">
          <line x1="1240" y1="500" x2="1100" y2="430"/>
          <line x1="1520" y1="500" x2="1660" y2="430"/>
          <line x1="1380" y1="360" x2="1380" y2="220"/>
        </g>
        <!-- Shattered Bitcoin coin particles -->
        <circle cx="1220" cy="420" r="18" fill="#f59e0b" stroke="#0f172a" stroke-width="3"/>
        <text x="1220" y="426" font-family="sans-serif" font-size="14" font-weight="bold" fill="#fff" text-anchor="middle">₿</text>
        <circle cx="1540" cy="410" r="16" fill="#f59e0b" stroke="#0f172a" stroke-width="3"/>
        <text x="1540" y="416" font-family="sans-serif" font-size="12" font-weight="bold" fill="#fff" text-anchor="middle">₿</text>
        ${renderTechBro({ x: 1380, y: 600, scale: 1.60, poof: true, timeSec: sceneTime })}
      `;
    } else {
      // AI Founder in Patagonia Vest + Glowing Visor + Cyberpunk Prompt Terminal
      bg += `
        <!-- Floating Cyberpunk Prompt Window -->
        <g transform="translate(1380, 240)">
          <rect x="-230" y="-55" width="460" height="110" rx="12" fill="#0f172a" stroke="#06b6d4" stroke-width="4" filter="url(#glow)"/>
          <rect x="-215" y="-40" width="430" height="80" rx="6" fill="#1e293b"/>
          <text x="-195" y="-10" font-family="'Courier New', monospace" font-size="20" font-weight="bold" fill="#22d3ee">
            > prompt: "generate skinny"
          </text>
          <text x="-195" y="20" font-family="'Courier New', monospace" font-size="16" fill="#a5f3fc">
            --v 6.0 --ar 16:9 --fast
          </text>
        </g>
        ${renderTechBro({ x: 1380, y: 630, scale: 1.38, mode: "ai", timeSec: sceneTime })}
      `;
    }

    const hostFigure = {
      id: "host_stick",
      state: {
        x: 520,
        y: 650,
        scale: 1.32,
        timeSec: sceneTime,
        expression: hostExpr,
      },
    };

    return {
      backgroundSvg: bg,
      stickFigures: [hostFigure],
    };
  },
};"""

patches["scene_04_unsubscribe"] = """import { Scene, SceneRenderContext, SceneRenderOutput } from "./SceneTypes";
import { renderFlyingCarbs, renderMegaStamp } from "../character/CartoonCast";

export const Scene04_Unsubscribe: Scene = {
  id: "scene_04_unsubscribe",
  name: "Unsubscribe from Carbs & Cancel Lunch",
  startTime: 22.805,
  endTime: 32.967,

  render(ctx: SceneRenderContext): SceneRenderOutput {
    const { sceneTime, camera } = ctx;

    // 1-2-3-4-5 BEATS MATCHING 0-CHAPTER-1.SRT CUES 8, 9 & 10:
    // Cue 8 (22.805s - 26.325s): "It seems like overnight, the entire entertainment industry decided..."
    // Cue 9 (26.325s - 29.000s): "...to collectively unsubscribe from carbohydrates..."
    // Cue 9b (29.000s - 29.925s): "...and cancel their biological subscription..."
    // Cue 10 (29.925s - 32.405s): "...to the concept of lunch."
    // Beat 5 (32.405s - 32.967s): Comedic deadpan shrug
    const isBeat1 = sceneTime < 3.52;
    const isBeat2 = sceneTime >= 3.52 && sceneTime < 6.20;
    const isBeat3 = sceneTime >= 6.20 && sceneTime < 7.12;
    const isBeat4 = sceneTime >= 7.12 && sceneTime < 9.60;
    const isBeat5 = sceneTime >= 9.60;

    let hostExpr: any = "deadpan_classic";
    if (isBeat2) {
      hostExpr = "skeptical_side_eye";
    } else if (isBeat3) {
      hostExpr = "confused_squint";
    } else if (isBeat4) {
      hostExpr = "shock_home_alone";
    } else if (isBeat5) {
      hostExpr = "deadpan_shrug";
    }

    // Directorial Camera Choreography
    if (isBeat1) {
      camera.setTarget(960, 540, 1.05);
    } else if (isBeat2) {
      // Snap punch-in on Flying Carbs ascending to heaven (1.50x)
      camera.setTarget(1380, 420, 1.50);
    } else if (isBeat3) {
      // Snap punch-in on SaaS Billing Cancellation Card (1.55x)
      camera.setTarget(1380, 480, 1.55);
    } else if (isBeat4) {
      // CLIMAX MACRO PUNCH-IN on Mega Stamp Slam (1.90x)
      camera.setTarget(1380, 560, 1.90);
    } else {
      // Hard Cut to Host Deadpan Shrug Close-Up (1.45x)
      camera.setTarget(520, 560, 1.45);
    }

    let bg = `
      <!-- Infinite full-bleed backdrop -->
      <rect x="-4000" y="-4000" width="10000" height="10000" fill="#f8fafc"/>
      <line x1="-4000" y1="840" x2="6000" y2="840" stroke="#e2e8f0" stroke-width="4"/>
    `;

    if (isBeat1) {
      // BEAT 1: SETUP - Peaceful restaurant table with artisan pizza & sourdough
      bg += `
        <!-- Dining Table Surface & Shadow -->
        <ellipse cx="1380" cy="840" rx="340" ry="30" fill="#000000" opacity="0.16"/>
        <line x1="1120" y1="650" x2="1100" y2="840" stroke="#713f12" stroke-width="14" stroke-linecap="round"/>
        <line x1="1640" y1="650" x2="1660" y2="840" stroke="#713f12" stroke-width="14" stroke-linecap="round"/>
        <ellipse cx="1380" cy="650" rx="340" ry="95" fill="#fdf4ff" stroke="#cbd5e1" stroke-width="7" filter="url(#cardShadow)"/>
        
        <!-- Artisan Pepperoni Pizza & Sourdough -->
        <g transform="translate(1380, 570) scale(1.4)">
          <polygon points="-80,20 -10,-40 30,30" fill="#f59e0b" stroke="#b45309" stroke-width="4"/>
          <circle cx="-35" cy="0" r="8" fill="#ef4444"/>
          <circle cx="-10" cy="15" r="7" fill="#ef4444"/>
          <ellipse cx="60" cy="0" rx="55" ry="30" fill="#d97706" stroke="#78350f" stroke-width="4"/>
          <path d="M 30 -10 Q 60 -25 90 -10" stroke="#fde68a" stroke-width="3" fill="none"/>
        </g>
      `;
    } else if (isBeat2) {
      // BEAT 2: ESCALATION - Pizza slice & bread sprout angel wings and ascend into heaven
      const ascendY = 520 - (sceneTime - 3.52) * 85;

      bg += `
        <!-- God Rays / Heavenly Spotlight Cone -->
        <polygon points="1380,-200 950,840 1810,840" fill="#fef08a" opacity="0.25"/>
        
        <!-- Fluffy Angelic Clouds -->
        <ellipse cx="1200" cy="160" rx="160" ry="55" fill="#ffffff" filter="url(#glow)"/>
        <ellipse cx="1560" cy="200" rx="140" ry="50" fill="#ffffff" filter="url(#glow)"/>

        <!-- macOS Unsubscribe Dialog -->
        <g transform="translate(1380, 280)">
          <rect x="-180" y="-45" width="360" height="90" rx="10" fill="#ffffff" stroke="#94a3b8" stroke-width="3" filter="url(#cardShadow)"/>
          <text x="0" y="-12" font-family="sans-serif" font-size="16" font-weight="bold" fill="#0f172a" text-anchor="middle">Unsubscribe from Carbohydrates?</text>
          <rect x="50" y="8" width="100" height="28" rx="6" fill="#ef4444"/>
          <text x="100" y="27" font-family="sans-serif" font-size="13" font-weight="bold" fill="#ffffff" text-anchor="middle">Confirm</text>
        </g>

        <!-- Ascending Flying Carbs (Scale: 1.45) -->
        ${renderFlyingCarbs(1380, ascendY, sceneTime)}
      `;
    } else if (isBeat3) {
      // BEAT 3: SaaS Billing Plan Cancelled Card
      bg += `
        <g transform="translate(1380, 480) scale(1.2)">
          <rect x="-180" y="-80" width="360" height="160" rx="12" fill="#0f172a" stroke="#ef4444" stroke-width="4" filter="url(#cardShadow)"/>
          <text x="0" y="-40" font-family="sans-serif" font-size="16" fill="#94a3b8" text-anchor="middle">BIOLOGICAL SUBSCRIPTION PORTAL</text>
          <text x="0" y="-5" font-family="'Impact', sans-serif" font-size="28" fill="#ffffff" text-anchor="middle">PLAN: DAILY LUNCH</text>
          <line x1="-120" y1="-12" x2="120" y2="-12" stroke="#ef4444" stroke-width="4"/>
          <rect x="-140" y="18" width="280" height="40" rx="8" fill="#dc2626"/>
          <text x="0" y="44" font-family="'Impact', sans-serif" font-size="20" fill="#ffffff" letter-spacing="2" text-anchor="middle">TERMINATED BY USER</text>
        </g>
      `;
    } else {
      // BEAT 4: PUNCHLINE - Giant CANCELLED Rubber Stamp Slam with impact dust
      const stampProgress = Math.min(1, (sceneTime - 7.12) / 0.35);

      bg += `
        <ellipse cx="1380" cy="840" rx="340" ry="30" fill="#000000" opacity="0.16"/>
        <line x1="1120" y1="650" x2="1100" y2="840" stroke="#713f12" stroke-width="14" stroke-linecap="round"/>
        <line x1="1640" y1="650" x2="1660" y2="840" stroke="#713f12" stroke-width="14" stroke-linecap="round"/>
        <ellipse cx="1380" cy="650" rx="340" ry="95" fill="#fdf4ff" stroke="#cbd5e1" stroke-width="7"/>

        <!-- Mega Stamp (Scale: 1.45) -->
        <g transform="scale(1.35) translate(-360, -180)">
          ${renderMegaStamp(1380, 560, stampProgress)}
        </g>
      `;
    }

    const hostFigure = {
      id: "host_stick",
      state: {
        x: 520,
        y: 650,
        scale: 1.32,
        timeSec: sceneTime,
        expression: hostExpr,
      },
    };

    return {
      backgroundSvg: bg,
      stickFigures: [hostFigure],
    };
  },
};"""

patches["scene_05_timburton_ps1"] = """import { Scene, SceneRenderContext, SceneRenderOutput } from "./SceneTypes";

export const Scene05_TimBurtonPS1: Scene = {
  id: "scene_05_timburton_ps1",
  name: "Tim Burton Aesthetic & Low-Poly PS1 Graphics",
  startTime: 32.967,
  endTime: 43.729,

  render(ctx: SceneRenderContext): SceneRenderOutput {
    const { sceneTime, camera } = ctx;

    // 1-2-3-4-5 BEATS MATCHING 0-CHAPTER-1.SRT CUES 11-14:
    // Cue 11 (32.967s - 36.887s): "But why is everyone suddenly speedrunning the Tim Burton aesthetic"
    // Cue 12 (36.887s - 39.847s): "The aggressive return of the 90s, and why your favorite actors"
    // Cue 13 (39.847s - 41.927s): "are starting to look like they're rendered in low-poly"
    // Cue 14 (41.927s - 43.127s): "PS1 graphics."
    // Beat 5 (43.127s - 43.729s): Comedic reset hold
    const isBeat1 = sceneTime < 3.92;
    const isBeat2 = sceneTime >= 3.92 && sceneTime < 6.88;
    const isBeat3 = sceneTime >= 6.88 && sceneTime < 8.96;
    const isBeat4 = sceneTime >= 8.96 && sceneTime < 10.16;
    const isBeat5 = sceneTime >= 10.16;

    let hostX = 520;
    let hostScale = 1.32;
    let hostExpr: any = "deadpan_classic";

    // Directorial Camera Choreography
    if (isBeat1) {
      camera.setTarget(1200, 500, 1.20);
      hostX = 520;
      hostExpr = "deadpan_classic";
    } else if (isBeat2) {
      // SNAP CUT to Host Centered 90s Close-Up (1.48x)
      camera.setTarget(960, 560, 1.48);
      hostX = 960;
      hostScale = 1.45;
      hostExpr = "dark_circles_insomnia";
    } else if (isBeat3) {
      // Snap pan-zoom to 3D PS1 Wireframe (1.45x)
      camera.setTarget(1380, 480, 1.45);
      hostX = 520;
      hostExpr = "confused_squint";
    } else if (isBeat4) {
      // CLIMAX MACRO PUNCH-IN on Low-Poly Polygon Mesh (1.80x)
      camera.setTarget(1380, 440, 1.80);
      hostX = 520;
      hostExpr = "mind_blown_galaxy_brain";
    } else {
      camera.setTarget(520, 560, 1.40);
      hostX = 520;
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

      if (isBeat2) {
        // Flickering 90s VHS OSD Timestamp HUD
        bg += `
          <g transform="translate(680, 200)">
            <rect x="-140" y="-30" width="280" height="60" rx="6" fill="#000000" opacity="0.7"/>
            <text x="0" y="8" font-family="'Courier New', monospace" font-size="22" font-weight="bold" fill="#22d3ee" text-anchor="middle">
              MAY 1997 - SP ▷
            </text>
          </g>
        `;
      }
    } else {
      // 100% Vector PS1 Retro 3D Low-Poly Wireframe World (Radius: 240px)
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
    }

    const hostFigure = {
      id: "host_stick",
      state: {
        x: hostX,
        y: 650,
        scale: hostScale,
        timeSec: sceneTime,
        expression: hostExpr,
      },
    };

    return {
      backgroundSvg: bg,
      stickFigures: [hostFigure],
    };
  },
};"""

patches["scene_06_pendulum"] = """import { Scene, SceneRenderContext, SceneRenderOutput } from "./SceneTypes";
import { renderCouchGuy } from "../character/CartoonCast";

export const Scene06_Pendulum: Scene = {
  id: "scene_06_pendulum",
  name: "The Beauty Standard Pendulum & Slouching Couch Guy",
  startTime: 43.729,
  endTime: 57.809,

  render(ctx: SceneRenderContext): SceneRenderOutput {
    const { sceneTime, camera } = ctx;

    // 1-2-3-4-5 BEATS MATCHING 0-CHAPTER-1.SRT CUES 15-20:
    // Cue 15-16 (43.729s - 47.386s): "To understand where we are right now, we have to look at where we've been."
    // Cue 17 (47.386s - 50.746s): "Human beauty standards operate on a giant, terrifying pendulum..."
    // Cue 18 (50.746s - 53.786s): "...that swings wildly depending on whatever makes regular, working..."
    // Cue 19-20 (53.786s - 57.666s): "...class people feel the absolute worst about themselves at any given time."
    // Beat 5 (57.666s - 57.809s): Reset pause
    const isBeat1 = sceneTime < 3.657;
    const isBeat2 = sceneTime >= 3.657 && sceneTime < 7.771;
    const isBeat3 = sceneTime >= 7.771 && sceneTime < 10.771;
    const isBeat4 = sceneTime >= 10.771 && sceneTime < 13.937;
    const isBeat5 = sceneTime >= 13.937;

    let hostExpr: any = "deadpan_classic";
    if (isBeat2) {
      hostExpr = "skeptical_raised_brow";
    } else if (isBeat3) {
      hostExpr = "cringe_teeth_grit";
    } else if (isBeat4) {
      hostExpr = "deadpan_shrug";
    }

    // Dynamic Camera Choreography
    if (isBeat1) {
      camera.setTarget(960, 540, 1.05);
    } else if (isBeat2) {
      // Snap punch-in on Giant Terrifying Pendulum swinging (1.45x)
      camera.setTarget(1350, 460, 1.45);
    } else if (isBeat3) {
      // CLIMAX PUNCH-IN on Couch Guy ducking for his life (1.60x)
      camera.setTarget(1380, 660, 1.60);
    } else if (isBeat4) {
      camera.setTarget(960, 540, 1.08);
    } else {
      camera.setTarget(520, 560, 1.35);
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
      <!-- Infinite full-bleed backdrop -->
      <rect x="-4000" y="-4000" width="10000" height="10000" fill="#f8fafc"/>
      <line x1="-4000" y1="840" x2="6000" y2="840" stroke="#e2e8f0" stroke-width="4"/>
    `;

    if (isBeat1) {
      // Classroom Chalkboard Diagram in Beat 1
      bg += `
        <g transform="translate(1380, 480)">
          <rect x="-240" y="-140" width="480" height="280" rx="10" fill="#1e3a29" stroke="#713f12" stroke-width="12" filter="url(#cardShadow)"/>
          <text x="0" y="-60" font-family="'Patrick Hand', cursive, sans-serif" font-size="28" fill="#ffffff" text-anchor="middle">HUMAN BEAUTY DYNAMICS</text>
          <line x1="-180" y1="20" x2="180" y2="20" stroke="#ffffff" stroke-width="4" stroke-dasharray="10 6"/>
          <text x="-140" y="60" font-family="'Patrick Hand', cursive, sans-serif" font-size="24" fill="#fbbf24" text-anchor="middle">[PAST]</text>
          <text x="140" y="60" font-family="'Patrick Hand', cursive, sans-serif" font-size="24" fill="#60a5fa" text-anchor="middle">[NOW]</text>
        </g>
      `;
    } else {
      // Pendulum Pivot & Rod
      bg += `
        <line x1="${pivotX}" y1="${pivotY}" x2="${bobX}" y2="${bobY}" stroke="#475569" stroke-width="10"/>
        <circle cx="${pivotX}" cy="${pivotY}" r="22" fill="#1e293b"/>

        <!-- Giant Spiked Wrecking Ball (Radius: 130px) -->
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
        // Flying potato chip crumbs
        bg += `
          <g fill="#eab308" stroke="#ca8a04" stroke-width="2">
            <circle cx="1320" cy="620" r="8"/>
            <circle cx="1440" cy="610" r="10"/>
            <circle cx="1390" cy="580" r="6"/>
          </g>
        `;
      }
    }

    const hostFigure = {
      id: "host_stick",
      state: {
        x: 520,
        y: 650,
        scale: 1.32,
        timeSec: sceneTime,
        expression: hostExpr,
      },
    };

    return {
      backgroundSvg: bg,
      stickFigures: [hostFigure],
    };
  },
};"""

patches["scene_07_heroinchic"] = """import { Scene, SceneRenderContext, SceneRenderOutput } from "./SceneTypes";
import { renderKateMoss } from "../character/CartoonCast";

export const Scene07_HeroinChic: Scene = {
  id: "scene_07_heroinchic",
  name: "90s Heroin Chic, Food Pyramid & Victorian Disease",
  startTime: 57.809,
  endTime: 80.457,

  render(ctx: SceneRenderContext): SceneRenderOutput {
    const { sceneTime, camera } = ctx;

    // 1-2-3-4 BEATS MATCHING 0-CHAPTER-1.SRT CUES 21-28:
    // Cue 21-23 (57.809s - 65.249s): "dubbed Heroin Chic... pioneered by models like Kate Moss..."
    // Cue 24-25 (65.249s - 73.874s): "sustained yourself on Diet Coke, Parliament cigarettes, and pure, unfiltered apathy."
    // Cue 26-27 (73.874s - 79.634s): "perpetually recovering from a minor Victorian wasting disease..."
    // Cue 28 (79.634s - 80.457s): "...but in a cool, fashionable way."
    const isBeat1 = sceneTime < 7.44;
    const isBeat2 = sceneTime >= 7.44 && sceneTime < 16.065;
    const isBeat3 = sceneTime >= 16.065 && sceneTime < 21.825;
    const isBeat4 = sceneTime >= 21.825;

    let hostExpr: any = "deadpan_classic";
    if (isBeat2) {
      hostExpr = "deadpan_side_glance";
    } else if (isBeat3) {
      hostExpr = "smug_sipping_tea";
    } else if (isBeat4) {
      hostExpr = "smug_rock_eyebrow";
    }

    // Directorial Camera Choreography
    if (isBeat1) {
      // Snap punch-in on Kate Moss Runway Strut (1.45x)
      camera.setTarget(1350, 540, 1.45);
    } else if (isBeat2) {
      // Snap punch-in on 1990s Supermodel Food Pyramid (1.45x -> 1.50x)
      camera.setTarget(1380, 480, 1.48);
    } else if (isBeat3) {
      // Snap punch-in on Victorian Chaise Lounge & Apothecary Tonic (1.60x)
      camera.setTarget(1380, 600, 1.60);
    } else {
      // CLIMAX MACRO PUNCH-IN on "DEAL WITH IT" Pixel Shades (1.85x)
      camera.setTarget(1380, 560, 1.85);
    }

    let bg = `
      <!-- Infinite full-bleed backdrop -->
      <rect x="-4000" y="-4000" width="10000" height="10000" fill="#f8fafc"/>
      <line x1="-4000" y1="840" x2="6000" y2="840" stroke="#e2e8f0" stroke-width="4"/>
    `;

    if (isBeat1) {
      // 90s Runway Stage with Stark Overhead Spotlight Cone
      bg += `
        <polygon points="1350,-100 1060,840 1640,840" fill="#fef08a" opacity="0.25"/>
        <ellipse cx="1350" cy="840" rx="290" ry="50" fill="#fde047" opacity="0.35"/>
        <ellipse cx="1350" cy="840" rx="90" ry="18" fill="#000000" opacity="0.25"/>

        <!-- Kate Moss on Runway (Scale: 1.40) -->
        ${renderKateMoss({ x: 1350, y: 550, scale: 1.40, timeSec: sceneTime })}
      `;
    } else if (isBeat2) {
      // 1990s USDA Food Pyramid (Width: 520px, Height: 400px)
      const pyramidTime = sceneTime - 7.44;
      const showCoke = pyramidTime >= 1.5;
      const showCigs = pyramidTime >= 3.5;
      const showApathy = pyramidTime >= 6.0;

      bg += `
        <g transform="translate(1380, 460)">
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
    } else {
      // High-Fidelity Victorian Burgundy Chaise Lounge & Apothecary Tonic
      bg += `
        <!-- Victorian Chaise Lounge with Contact Shadow -->
        <g transform="translate(1380, 680) scale(1.35)">
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
    }

    const hostFigure = {
      id: "host_stick",
      state: {
        x: 520,
        y: 650,
        scale: 1.32,
        timeSec: sceneTime,
        expression: hostExpr,
      },
    };

    return {
      backgroundSvg: bg,
      stickFigures: [hostFigure],
    };
  },
};"""

patches["scene_08_pixarmom"] = """import { Scene, SceneRenderContext, SceneRenderOutput } from "./SceneTypes";
import { renderPixarMom } from "../character/CartoonCast";

export const Scene08_PixarMom: Scene = {
  id: "scene_08_pixarmom",
  name: "2010s BBL & Pixar Mom Gravitational Field",
  startTime: 80.457,
  endTime: 108.199,

  render(ctx: SceneRenderContext): SceneRenderOutput {
    const { sceneTime, camera } = ctx;

    // 1-2-3-4-5 BEATS MATCHING 0-CHAPTER-1.SRT CUES 29-38:
    // Cue 29-30 (80.457s - 85.420s): "pendulum swung violently in opposite direction."
    // Cue 31-33 (85.420s - 94.511s): "era of the BBL... Pixar Mom."
    // Cue 34-36 (94.511s - 104.111s): "localized gravitational pull due to squats..."
    // Cue 37-38 (104.111s - 107.631s): "...calves and forearms remained exact same size."
    // Beat 5 (107.631s - 108.199s): Host smirk hold
    const isBeat1 = sceneTime < 4.963;
    const isBeat2 = sceneTime >= 4.963 && sceneTime < 14.054;
    const isBeat3 = sceneTime >= 14.054 && sceneTime < 23.654;
    const isBeat4 = sceneTime >= 23.654 && sceneTime < 27.174;
    const isBeat5 = sceneTime >= 27.174;

    let hostExpr: any = "deadpan_classic";
    if (isBeat1) {
      hostExpr = "confused_double_take";
    } else if (isBeat2) {
      hostExpr = "confused_squint";
    } else if (isBeat3) {
      hostExpr = "mind_blown_galaxy_brain";
    } else if (isBeat4) {
      hostExpr = "smug_rock_eyebrow";
    } else {
      hostExpr = "smug_rock_eyebrow";
    }

    // Directorial Camera Choreography
    if (isBeat1) {
      camera.setTarget(1100, 500, 1.25);
    } else if (isBeat2) {
      // Snap punch-in on Pixar Mom hip expansion (1.50x)
      camera.setTarget(1380, 540, 1.50);
    } else if (isBeat3) {
      // CLIMAX MACRO PUNCH-IN on Gravitational Orbit Anomaly (1.75x)
      camera.setTarget(1380, 520, 1.75);
    } else if (isBeat4) {
      // Snap punch-in on Miami Clinic Billboard (1.55x)
      camera.setTarget(1350, 360, 1.55);
    } else {
      camera.setTarget(520, 560, 1.45);
    }

    let bg = `
      <!-- Infinite full-bleed backdrop -->
      <rect x="-4000" y="-4000" width="10000" height="10000" fill="#f8fafc"/>
      <line x1="-4000" y1="840" x2="6000" y2="840" stroke="#e2e8f0" stroke-width="4"/>
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
      // Inflating Pixar Mom Hips (Scale: 1.55)
      const hipGrowth = Math.min(1.55, 0.9 + (sceneTime - 4.963) * 0.08);
      bg += `
        ${renderPixarMom({ x: 1380, y: 540, scale: hipGrowth, showOrbit: false, timeSec: sceneTime })}
      `;
    } else if (isBeat3) {
      // Spacetime Curvature Grid & Trapped Orbital System (Scale: 1.55)
      bg += `
        <g stroke="#f43f5e" stroke-width="2.5" opacity="0.45">
          <ellipse cx="1380" cy="540" rx="420" ry="140" stroke-dasharray="16 10"/>
          <ellipse cx="1380" cy="540" rx="540" ry="180" stroke-dasharray="20 12"/>
        </g>
        ${renderPixarMom({ x: 1380, y: 540, scale: 1.55, showOrbit: true, timeSec: sceneTime })}
      `;
    } else {
      // Miami Clinic Billboard & Jet Takeoff
      const planeX = 950 + ((sceneTime - 23.654) * 180) % 1000;
      bg += `
        <!-- Swaying Palm Trees -->
        <path d="M 1740 840 Q 1690 550 1760 380" stroke="#78350f" stroke-width="18" fill="none" stroke-linecap="round"/>
        <path d="M 1760 380 Q 1640 320 1560 360 M 1760 380 Q 1690 250 1660 200 M 1760 380 Q 1840 250 1920 260 M 1760 380 Q 1890 340 1940 400" stroke="#16a34a" stroke-width="16" fill="none" stroke-linecap="round"/>

        <!-- Miami BBL Billboard -->
        <g transform="translate(1320, 320)">
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
    }

    const hostFigure = {
      id: "host_stick",
      state: {
        x: 520,
        y: 650,
        scale: 1.32,
        timeSec: sceneTime,
        expression: hostExpr,
      },
    };

    return {
      backgroundSvg: bg,
      stickFigures: [hostFigure],
    };
  },
};"""

patches["scene_09_hourglass_pr"] = """import { Scene, SceneRenderContext, SceneRenderOutput } from "./SceneTypes";

export const Scene09_HourglassPR: Scene = {
  id: "scene_09_hourglass_pr",
  name: "Overfilled Hourglass & Corporate PR Body Positivity",
  startTime: 108.199,
  endTime: 129.384,

  render(ctx: SceneRenderContext): SceneRenderOutput {
    const { sceneTime, camera } = ctx;

    // 1-2-3-4-5 BEATS MATCHING 0-CHAPTER-1.SRT CUES 39-45:
    // Cue 39-40 (108.199s - 113.398s): "ultimate flex looking like an hourglass overfilled at bottom."
    // Cue 41-42 (113.398s - 120.598s): "society pushed heavily for body positivity... PR agencies..."
    // Cue 43-44 (120.598s - 126.038s): "not size zero to be a leading lady..."
    // Cue 45 (126.038s - 128.838s): "...progressing past shallow roots -> PR sticker peels, cash vault."
    // Beat 5 (128.838s - 129.384s): Host cringe facepalm hold
    const isBeat1 = sceneTime < 5.199;
    const isBeat2 = sceneTime >= 5.199 && sceneTime < 12.399;
    const isBeat3 = sceneTime >= 12.399 && sceneTime < 17.839;
    const isBeat4 = sceneTime >= 17.839 && sceneTime < 20.639;
    const isBeat5 = sceneTime >= 20.639;

    let hostExpr: any = "deadpan_classic";
    if (isBeat1) {
      hostExpr = "confused_tilted_head";
    } else if (isBeat2) {
      hostExpr = "skeptical_side_eye";
    } else if (isBeat3) {
      hostExpr = "deadpan_side_glance";
    } else if (isBeat4) {
      hostExpr = "cringe_teeth_grit";
    } else {
      hostExpr = "cringe_full";
    }

    // Directorial Camera Choreography
    if (isBeat1) {
      // Snap punch-in on Hourglass Bottom Bulge (1.50x)
      camera.setTarget(1380, 560, 1.50);
    } else if (isBeat2) {
      // Snap punch-in on Corporate PR Scaffolding (1.45x)
      camera.setTarget(1380, 500, 1.45);
    } else if (isBeat3) {
      camera.setTarget(960, 540, 1.08);
    } else if (isBeat4) {
      // CLIMAX MACRO PUNCH-IN on PR Sticker Peel & Big Pharma Cash Vault (1.80x)
      camera.setTarget(1380, 520, 1.80);
    } else {
      camera.setTarget(520, 560, 1.45);
    }

    let bg = `
      <!-- Infinite full-bleed backdrop -->
      <rect x="-4000" y="-4000" width="10000" height="10000" fill="#f8fafc"/>
      <line x1="-4000" y1="840" x2="6000" y2="840" stroke="#e2e8f0" stroke-width="4"/>
    `;

    if (isBeat1 || isBeat2 || isBeat3) {
      const sandDropY = (sceneTime * 35) % 200;
      bg += `
        <!-- Ground Contact Shadow -->
        <ellipse cx="1380" cy="840" rx="220" ry="25" fill="#000000" opacity="0.2"/>

        <g id="overfilled-hourglass" transform="translate(1380, 520) scale(1.2)">
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
            <!-- Corporate PR Construction Scaffolding & Banner -->
            <g id="pr-scaffolding" transform="translate(0, 0)">
              <line x1="-180" y1="-50" x2="180" y2="-50" stroke="#f59e0b" stroke-width="12"/>
              <line x1="-180" y1="50" x2="180" y2="50" stroke="#f59e0b" stroke-width="12"/>
              <line x1="-150" y1="-50" x2="150" y2="50" stroke="#ef4444" stroke-width="7"/>
              <line x1="150" y1="-50" x2="-150" y2="50" stroke="#ef4444" stroke-width="7"/>
              
              <rect x="-150" y="-30" width="300" height="60" rx="10" fill="#fdf4ff" stroke="#ec4899" stroke-width="5" filter="url(#cardShadow)"/>
              <text x="0" y="9" font-family="'Impact', sans-serif" font-size="24" fill="#be185d" text-anchor="middle">
                "BODY POSITIVITY™"
              </text>
            </g>
          ` : ""}
        </g>
      `;

      if (isBeat3) {
        // Leading Lady Asterisk Billboard
        bg += `
          <g transform="translate(960, 240)">
            <rect x="-180" y="-30" width="360" height="60" rx="8" fill="#ffffff" stroke="#0f172a" stroke-width="3" filter="url(#cardShadow)"/>
            <text x="0" y="8" font-family="sans-serif" font-size="14" font-weight="bold" fill="#dc2626" text-anchor="middle">
              *Offer valid until Q4 pharma rollout
            </text>
          </g>
        `;
      }
    } else {
      // BEAT 4: Broken Hourglass & Glowing Big Pharma Cash Vault
      bg += `
        <ellipse cx="1380" cy="840" rx="220" ry="25" fill="#000000" opacity="0.2"/>
        <g transform="translate(1380, 520) scale(1.2)">
          <rect x="-160" y="-230" width="320" height="28" rx="8" fill="#ca8a04" stroke="#854d0e" stroke-width="7"/>
          <rect x="-160" y="210" width="320" height="28" rx="8" fill="#ca8a04" stroke="#854d0e" stroke-width="7"/>

          <!-- Peeled PR Sticker -->
          <g transform="translate(-50, -10) rotate(-22)">
            <rect x="-110" y="-28" width="220" height="56" rx="8" fill="#fdf4ff" stroke="#ec4899" stroke-width="4" opacity="0.7"/>
            <text x="0" y="9" font-family="'Impact', sans-serif" font-size="18" fill="#be185d" text-anchor="middle">"BODY POSITIVITY"</text>
          </g>

          <!-- Big Pharma Cash Vault underneath -->
          <g transform="translate(0, 30)">
            <rect x="-190" y="-60" width="380" height="130" rx="14" fill="#064e3b" stroke="#10b981" stroke-width="7" filter="url(#glow)"/>
            <text x="0" y="-12" font-family="'Impact', sans-serif" font-size="30" fill="#34d399" letter-spacing="2" text-anchor="middle">
              PHARMA REVENUE
            </text>
            <text x="0" y="38" font-family="'Courier New', monospace" font-size="38" font-weight="bold" fill="#6ee7b7" text-anchor="middle">
              $$$$$$$$$$$$
            </text>
          </g>
        </g>
      `;
    }

    const hostFigure = {
      id: "host_stick",
      state: {
        x: 520,
        y: 650,
        scale: 1.32,
        timeSec: sceneTime,
        expression: hostExpr,
      },
    };

    return {
      backgroundSvg: bg,
      stickFigures: [hostFigure],
    };
  },
};"""

patches["scene_10_boss_closes_tab"] = """import { Scene, SceneRenderContext, SceneRenderOutput } from "./SceneTypes";
import { renderBossShadow } from "../character/CartoonCast";

export const Scene10_BossClosesTab: Scene = {
  id: "scene_10_boss_closes_tab",
  name: "Fidget Spinner, Podcast & Boss Closes Tab",
  startTime: 129.384,
  endTime: 150.857,

  render(ctx: SceneRenderContext): SceneRenderOutput {
    const { sceneTime, camera } = ctx;

    // 1-2-3-4-5 BEATS MATCHING 0-CHAPTER-1.SRT CUES 46-52:
    // Cue 46-48 (129.384s - 135.384s): "temporary trend... fidget spinners..."
    // Cue 48 (135.384s - 138.188s): "...or friend's podcast."
    // Cue 49-51 (138.188s - 146.500s): "pharmaceutical shortcut dropped... boss walks by."
    // Cue 52 (146.500s - 150.268s): "...closing browser tab when boss walks by -> Ctrl+W smash."
    // Beat 5 (150.268s - 150.857s): Host sigh of relief
    const isBeat1 = sceneTime < 6.0;
    const isBeat2 = sceneTime >= 6.0 && sceneTime < 8.804;
    const isBeat3 = sceneTime >= 8.804 && sceneTime < 17.116;
    const isBeat4 = sceneTime >= 17.116 && sceneTime < 20.884;
    const isBeat5 = sceneTime >= 20.884;

    let hostExpr: any = "deadpan_classic";
    if (isBeat2) {
      hostExpr = "deadpan_side_glance";
    } else if (isBeat3) {
      hostExpr = "fear_sweat_freeze";
    } else if (isBeat4) {
      hostExpr = "shock_home_alone";
    } else {
      hostExpr = "exhausted_melting";
    }

    // Directorial Camera Choreography
    if (isBeat1) {
      // Snap punch-in on 3600 RPM Neon Fidget Spinner (1.45x)
      camera.setTarget(1380, 440, 1.45);
    } else if (isBeat2) {
      // Snap punch-in on 0-Listener Podcast Mic (1.45x)
      camera.setTarget(1380, 480, 1.45);
    } else if (isBeat3) {
      // Snap cut to Host Terror Close-Up with Boss looming (1.45x)
      camera.setTarget(520, 560, 1.45);
    } else if (isBeat4) {
      // CLIMAX MACRO PUNCH-IN on Hydraulic Red Ctrl+W Key Slam (2.05x)
      camera.setTarget(1320, 500, 2.05);
    } else {
      camera.setTarget(520, 560, 1.40);
    }

    let bg = `
      <!-- Infinite full-bleed backdrop -->
      <rect x="-4000" y="-4000" width="10000" height="10000" fill="#f8fafc"/>
      <line x1="-4000" y1="840" x2="6000" y2="840" stroke="#e2e8f0" stroke-width="4"/>
    `;

    if (isBeat1) {
      // 3600 RPM Extreme Neon Fidget Spinner (Scale: 1.40)
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
    } else if (isBeat2) {
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
    } else if (isBeat3) {
      // Colossal Boss Shadow Looming in Background
      bg += `
        ${renderBossShadow(1380, 220, sceneTime)}
      `;
    } else {
      // Hydraulic 3D Ctrl + W Emergency Key Slam Climax
      const keySlamProgress = Math.min(1, (sceneTime - 17.116) / 0.35);
      const keyY = 520 - (1 - keySlamProgress) * 400;

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
        <g transform="translate(1320, ${keyY}) scale(1.15)">
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
    }

    const hostFigure = {
      id: "host_stick",
      state: {
        x: 520,
        y: 650,
        scale: 1.32,
        timeSec: sceneTime,
        expression: hostExpr,
      },
    };

    return {
      backgroundSvg: bg,
      stickFigures: [hostFigure],
    };
  },
};"""

patches["scene_11_y2k_fashion"] = """import { Scene, SceneRenderContext, SceneRenderOutput } from "./SceneTypes";
import { renderEvictedOrgans } from "../character/CartoonCast";

export const Scene11_Y2KFashion: Scene = {
  id: "scene_11_y2k_fashion",
  name: "Y2K Organ-Hostile Fashion & Miu Miu Micro-Belt",
  startTime: 150.857,
  endTime: 183.851,

  render(ctx: SceneRenderContext): SceneRenderOutput {
    const { sceneTime, camera } = ctx;

    // 1-2-3-4-5 BEATS MATCHING 0-CHAPTER-1.SRT CUES 53-63:
    // Cue 53-54 (150.857s - 157.100s): "fashion industry decided it was time to bring back Y2K fashion."
    // Cue 55-56 (157.100s - 163.683s): "...incredibly hostile to anyone who possesses internal organs."
    // Cue 57-58 (163.683s - 170.243s): "low-rise jeans below pelvic bone, baby tees napkin coverage..."
    // Cue 59-60 (170.243s - 176.771s): "...infamous Miu Miu micro-skirt, just a belt that costs $2,000."
    // Cue 61-63 (176.771s - 183.851s): "...cannot participate if functioning digestive tract solid food."
    const isBeat1 = sceneTime < 6.243;
    const isBeat2 = sceneTime >= 6.243 && sceneTime < 12.826;
    const isBeat3 = sceneTime >= 12.826 && sceneTime < 19.386;
    const isBeat4 = sceneTime >= 19.386 && sceneTime < 25.914;
    const isBeat5 = sceneTime >= 25.914;

    let hostExpr: any = "deadpan_classic";
    if (isBeat1) {
      hostExpr = "smug_glasses_push";
    } else if (isBeat2) {
      hostExpr = "disgust_shudder";
    } else if (isBeat3) {
      hostExpr = "confused_squint";
    } else if (isBeat4) {
      hostExpr = "shock_eye_pop";
    } else {
      hostExpr = "deadpan_soul_stare";
    }

    // Directorial Camera Choreography
    if (isBeat1) {
      camera.setTarget(1380, 520, 1.35);
    } else if (isBeat2) {
      // Snap punch-in on Evicted Organs walking away (1.60x)
      camera.setTarget(1380, 600, 1.60);
    } else if (isBeat3) {
      // Snap punch-in on Mannequin & Napkin Baby Tee (1.50x)
      camera.setTarget(1380, 560, 1.50);
    } else if (isBeat4) {
      // CLIMAX MACRO PUNCH-IN on 1-Inch Belt & Dangling $2,400 Price Tag (2.05x)
      camera.setTarget(1475, 620, 2.05);
    } else {
      // Wide Final Resolution: Host 1000-Yard Stare & Error 404 HUD
      camera.setTarget(960, 540, 1.05);
    }

    let bg = `
      <!-- Infinite full-bleed backdrop -->
      <rect x="-4000" y="-4000" width="10000" height="10000" fill="#f8fafc"/>
      <line x1="-4000" y1="840" x2="6000" y2="840" stroke="#e2e8f0" stroke-width="4"/>
    `;

    if (isBeat1) {
      // BEAT 1: Y2K Cyber Hologram & Denim Blueprint
      bg += `
        <g transform="translate(1380, 500) scale(1.3)">
          <path d="M -90 -40 L 90 -40 L 110 180 L 30 180 L 15 20 L -15 20 L -30 180 L -110 180 Z" fill="#e0f2fe" stroke="#0284c7" stroke-width="6" stroke-dasharray="14 10"/>
          <text x="0" y="60" font-family="'Impact', sans-serif" font-size="28" fill="#0369a1" text-anchor="middle">LOW-RISE DENIM</text>
        </g>
      `;
    } else if (isBeat2) {
      // BEAT 2: High Scale Evicted Organs with Suitcases (Scale: 1.50)
      bg += `
        <!-- Evicted Organs Grounded on Floor -->
        <g transform="translate(1380, 640) scale(1.50)">
          ${renderEvictedOrgans(0, 0, sceneTime)}
        </g>

        <!-- Slamming Red Eviction Notice Stamp -->
        <g transform="translate(1380, 320) rotate(-10)">
          <rect x="-160" y="-50" width="320" height="100" rx="16" fill="#fee2e2" stroke="#dc2626" stroke-width="9" filter="url(#cardShadow)"/>
          <text x="0" y="16" font-family="'Impact', sans-serif" font-size="38" fill="#991b1b" letter-spacing="3" text-anchor="middle">
            EVICTION NOTICE
          </text>
        </g>
      `;
    } else if (isBeat3) {
      // BEAT 3: Mannequin in Low-Rise Jeans + Napkin Baby Tee
      bg += `
        <g transform="translate(1380, 580) scale(1.35)">
          <ellipse cx="0" cy="220" rx="65" ry="16" fill="#334155" stroke="#0f172a" stroke-width="4" filter="url(#cardShadow)"/>
          <line x1="0" y1="80" x2="0" y2="220" stroke="#475569" stroke-width="10"/>

          <circle cx="0" cy="-140" r="32" fill="none" stroke="#111" stroke-width="6"/>
          <line x1="0" y1="-108" x2="0" y2="40" stroke="#111" stroke-width="7"/>
          
          <!-- Dinner Napkin Baby Tee -->
          <rect x="-40" y="-95" width="80" height="48" rx="4" fill="#f43f5e" stroke="#111" stroke-width="4"/>
          <text x="0" y="-66" font-family="'Impact', sans-serif" font-size="16" fill="#fff" text-anchor="middle">NAPKIN</text>

          <!-- Normal length Pleated Skirt -->
          <polygon points="-55,-30 55,-30 85,80 -85,80" fill="#a16207" stroke="#78350f" stroke-width="6"/>
          <line x1="-20" y1="80" x2="-20" y2="218" stroke="#111" stroke-width="7"/>
          <line x1="20" y1="80" x2="20" y2="218" stroke="#111" stroke-width="7"/>
        </g>
      `;
    } else if (isBeat4) {
      // BEAT 4: Miu Miu 1-Inch Leather Belt & Dangling $2,400.00 Price Tag Climax
      const tagSwing = Math.sin((sceneTime - 19.386) * 8) * Math.exp(-(sceneTime - 19.386) * 0.3) * 22;

      bg += `
        <g transform="translate(1380, 580) scale(1.35)">
          <ellipse cx="0" cy="220" rx="65" ry="16" fill="#334155" stroke="#0f172a" stroke-width="4" filter="url(#cardShadow)"/>
          <line x1="0" y1="-10" x2="0" y2="220" stroke="#475569" stroke-width="10"/>

          <circle cx="0" cy="-140" r="32" fill="none" stroke="#111" stroke-width="6"/>
          <line x1="0" y1="-108" x2="0" y2="40" stroke="#111" stroke-width="7"/>
          <rect x="-40" y="-95" width="80" height="48" rx="4" fill="#f43f5e" stroke="#111" stroke-width="4"/>
          <text x="0" y="-66" font-family="'Impact', sans-serif" font-size="16" fill="#fff" text-anchor="middle">NAPKIN</text>

          <!-- Microscopic 1-Inch Leather Belt -->
          <rect x="-60" y="-30" width="120" height="22" rx="4" fill="#78350f" stroke="#451a03" stroke-width="5"/>
          <rect x="-12" y="-35" width="24" height="32" rx="4" fill="#eab308" stroke="#a16207" stroke-width="3"/>

          <line x1="-20" y1="-10" x2="-20" y2="218" stroke="#111" stroke-width="7"/>
          <line x1="20" y1="-10" x2="20" y2="218" stroke="#111" stroke-width="7"/>

          <!-- Dangling Gold Foil $2,400.00 Price Tag on String -->
          <g transform="translate(60, -20) rotate(${tagSwing})">
            <line x1="0" y1="0" x2="45" y2="45" stroke="#94a3b8" stroke-width="3.5" stroke-dasharray="5 4"/>
            <g transform="translate(45, 45) rotate(12)">
              <polygon points="0,0 180,-25 205,50 25,75" fill="#fef08a" stroke="#ca8a04" stroke-width="5" filter="url(#glow)"/>
              <circle cx="22" cy="18" r="6" fill="#78350f"/>
              <text x="110" y="36" font-family="'Impact', sans-serif" font-size="40" fill="#dc2626" text-anchor="middle">
                $2,400.00
              </text>
            </g>
          </g>
        </g>
      `;
    } else {
      // BEAT 5: Final Resolution - Error 404 Digestive Warning & Lone Saltine Cracker
      bg += `
        <g transform="translate(1380, 480)">
          <rect x="-240" y="-120" width="480" height="240" rx="14" fill="#0f172a" stroke="#ef4444" stroke-width="6" filter="url(#cardShadow)"/>
          <text x="0" y="-60" font-family="'Impact', sans-serif" font-size="32" fill="#ef4444" text-anchor="middle">
            [ERROR 404]
          </text>
          <text x="0" y="-15" font-family="sans-serif" font-size="18" font-weight="bold" fill="#ffffff" text-anchor="middle">
            DIGESTIVE SYSTEM INCOMPATIBLE
          </text>
          <text x="0" y="20" font-family="sans-serif" font-size="16" fill="#94a3b8" text-anchor="middle">
            WITH CURRENT FASHION META
          </text>
          
          <!-- Lone Saltine Cracker floating in water beaker -->
          <g transform="translate(0, 70)">
            <rect x="-35" y="-15" width="70" height="30" rx="4" fill="#fef3c7" stroke="#d97706" stroke-width="3"/>
            <circle cx="-15" cy="0" r="2" fill="#b45309"/>
            <circle cx="0" cy="0" r="2" fill="#b45309"/>
            <circle cx="15" cy="0" r="2" fill="#b45309"/>
          </g>
        </g>
      `;
    }

    const hostFigure = {
      id: "host_stick",
      state: {
        x: 520,
        y: 650,
        scale: 1.32,
        timeSec: sceneTime,
        expression: hostExpr,
      },
    };

    return {
      backgroundSvg: bg,
      stickFigures: [hostFigure],
    };
  },
};"""

# Build complete report object
audit_report = {
  "manifestVersion": "2.0.0",
  "auditTimestamp": datetime.utcnow().isoformat() + "Z",
  "auditor": "Comedy Director Critic Agent (Alex Meyers & Casually Explained Directing Engine)",
  "sourceSRT": "/root/Desktop/casually-explained-video/public/0-chapter-1.srt",
  "sourceBeatSheet": "/root/Desktop/casually-explained-video/DIRECTOR_BEAT_SHEET.json",
  "evaluatedSceneRange": {
    "startScene": "scene_01_ecosystem",
    "endScene": "scene_11_y2k_fashion",
    "totalScenes": 11,
    "timeRangeSec": [0.0, 183.851]
  },
  "overallScore": 62,
  "status": "NEEDS_REFINEMENT",
  "executiveSummary": "Comprehensive multi-axis audit of Scenes 01 through 11 against the 5 Directorial Comedy Axes codified in comedy-director-critic/SKILL.md and alex-meyers-director/SKILL.md. While Scene 03 (Celebrities & Digital Calipers) represents a near-flawless gold standard (Score: 98/100) with aggressive snap zooms (1.25x -> 1.85x macro), large screen-filling character scales (1.32 - 1.35), strict sub-80ms progressive reveal sync, and full-bleed unconstrained stage bounds, the remaining 10 scenes (Scenes 01, 02, 04, 05, 06, 07, 08, 09, 10, 11) suffer from severe directorial inertia: (1) Static, timid cameras locked at 1.04x wide shots during punchlines; (2) Undersized stick figures (scale 1.15) and microscopic props (< 100px) creating a detached slideshow feel; (3) Floor baseline clamping at x: 0-1920 causing background cutoffs during panning; and (4) Missing secondary beat escalations and punchline macro close-ups. This report delivers exact mathematical camera parameters, scale adjustments, asset inventory requests, and complete drop-in TypeScript code patches for all 11 scenes.",
  "critiqueAxesSummary": {
    "axis1_screenRealismAndScale": {
      "name": "Screen Realism & Visual Scale (The 'Too Small' Check)",
      "targetStandard": "Host scale: 1.30 - 1.45 (occupying 45-60% frame height, ~480-550px). Joke cast/props: 1.35 - 1.65 commanding the right half of the 16:9 canvas. Macro punchline props filling >75% of zoomed viewport.",
      "currentFinding": "FAIL across 10 of 11 scenes. Host is globally set to scale 1.15 (~380px tall, only ~35% frame height). Props such as the Scene 11 evicted organs (< 80px), Scene 04 pizza slice, Scene 07 tonic bottle, Scene 09 hourglass, and Scene 02 crypto bro are drawn too small, looking like distant floating icons in a vast empty white void.",
      "remediationRequirement": "Enforce Host scale: 1.32 across all scenes; scale up all character rigs and key joke props to 1.35 - 1.60."
    },
    "axis2_cameraPunchInsAndSnapZooms": {
      "name": "Camera Punch-Ins & Snap Zooms (The 'Timid Zooms' Check)",
      "targetStandard": "Standard 2-Shot: zoom 1.02-1.05. Host Reaction Close-Up: zoom 1.40-1.50 @ (520, 560). Subject Punch-In: zoom 1.45-1.65 @ (1350-1500, 520). Extreme Macro Climax: zoom 1.80-2.20 on punchline focal points. Hard snap jump cuts (<150ms) with zero slow dragging pans.",
      "currentFinding": "CRITICAL FAIL. Except for Scene 03 (which has 1.25x -> 1.35x -> 1.40x -> 1.85x -> 1.45x), all other 10 scenes hardcode camera.setTarget(960, 540, 1.04) statically across their entire duration (some lasting 20-33 seconds with ZERO camera motion). This completely destroys comedic punchline impact.",
      "remediationRequirement": "Choreograph dynamic multi-beat camera trajectories with aggressive punch-ins (1.45x-1.65x) on subject entrances, macro punchlines (1.80x-2.10x) on climax gags (Mega Stamp, PS1 mesh, $2,400 Price Tag, Ctrl+W Key), and snap cuts to Host reaction close-ups (1.40x-1.48x)."
    },
    "axis3_comedicTimingAndAudioSync": {
      "name": "Strict 1-2-3 Timing & Audio Synchronization (<100ms Sync)",
      "targetStandard": "Sequential visual reveals matching ground-truth subtitle keywords in 0-chapter-1.srt with < 100ms offset. Never drop punchline props at t=0.",
      "currentFinding": "PARTIAL PASS / MARGINAL. Timestamps generally align with SRT cues, but several scenes reveal props too early (e.g., Scene 01 Ecosystem sign at 4.8s vs keyword at 6.8s; Scene 09 collapsing beats 3-4 prematurely at 12.4s; Scene 11 keeping the $2,400 price tag static for 9.4s without transitioning to Beat 5's Error 404 digestive punchline).",
      "remediationRequirement": "Align state transitions strictly within +/- 80ms of spoken audio triggers and implement dedicated final beat reaction holds with deadpan comedic pauses."
    },
    "axis4_svgCartoonRichnessAndAssetInventory": {
      "name": "Pure SVG/CSS Cartoon Richness & Asset Inventory",
      "targetStandard": "100% vector SVG with expressive cartoon anatomy, drop shadows, gradients, specular highlights, glowing neon accents, and secondary micro-animations (breathing bobs, speech flapping, blinks).",
      "currentFinding": "NEEDS ENHANCEMENT. Several key gags use primitive flat geometric rectangles with basic text (e.g., Scene 01 white box 'HOLLYWOOD ECOSYSTEM', Scene 04 table with two stick legs, Scene 07 crude stick chaise lounge with 9px font tonic bottle, Scene 09 green rectangle '$$$$$$$$$$$$' pharma vault).",
      "remediationRequirement": "Upgrade inline graphics with rich vector components: Hollywood Hills with scanning searchlights; macOS UI Unsubscribe Modal; 90s VHS 'MAY 1997' Timestamp OSD; Victorian Burgundy Chaise Lounge with cabriole legs and amber apothecary bottle; Glowing Spacetime Gravitational Curvature Grid; Hydraulic 3D Ctrl+W Forge Key with piston rods and smoke burst; Gold Foil $2,400.00 Designer Price Tag."
    },
    "axis5_framingAndGrounding": {
      "name": "16:9 Safe Framing & Grounding",
      "targetStandard": "Baseline ground line at y: 840 with dark contact shadow ellipses (rx: 50-80, ry: 12-18, opacity: 0.15-0.25). Full-bleed backdrop spanning x: -4000 to 6000 to prevent edge clipping during camera pans/zooms.",
      "currentFinding": "FAIL in 10 scenes. Scenes 01, 02, 04, 05, 06, 07, 08, 09, 10, 11 declare `<line x1=\"0\" y1=\"840\" x2=\"1920\" y2=\"840\" .../>`. When the camera pans to x: 1350-1560 or zooms in, the ground line abruptly terminates, creating visual border clipping.",
      "remediationRequirement": "Update all scene backgrounds to declare `<line x1=\"-4000\" y1=\"840\" x2=\"6000\" y2=\"840\" stroke=\"#e2e8f0\" stroke-width=\"4\"/>` and `<rect x=\"-4000\" y=\"-4000\" width=\"10000\" height=\"10000\" fill=\"#f8fafc\"/>`, while ensuring character y-coordinates ground their contact shadows cleanly at y: 840."
    }
  },
  "sceneAudits": [
    {
      "sceneId": "scene_01_ecosystem",
      "sceneNumber": 1,
      "name": "Hollywood Red Carpet & Instagram Ecosystem",
      "timeRange": [0.0, 8.620],
      "durationSec": 8.620,
      "score": 58,
      "status": "FAIL",
      "scaleAudit": "FAIL. Host scale: 1.15 (should be 1.32). Paparazzi stick figures scale: 1.0 at x: 240 and 1640 appear microscopic (< 18% frame height), looking like distant specks.",
      "zoomAudit": "FAIL. Zooms locked between 1.00x and 1.05x. Fails to snap punch-in on Instagram Phone drop (target: 1.45x @ 1350, 500) and fails to snap to Host Reaction Close-Up (target: 1.45x @ 520, 560).",
      "timingAudit": "MARGINAL. Cue 1 (0.0s) and Cue 2 (2.0s) trigger on time, but Beat 3 triggers at 4.8s while keyword 'ecosystem' is spoken at 6.8s. Beat 4 reaction hold (7.5s - 8.62s) is completely omitted in code.",
      "assetAudit": "FAIL. 'HOLLYWOOD ECOSYSTEM' is rendered as a plain white rectangle with red text floating over a basic grey hump. Lacks dynamic Hollywood Hills searchlights, golden stanchion velvet drapes, and floating Instagram like hearts ticker.",
      "framingAudit": "FAIL. Backdrop clamped to 1920x1080 and ground line clamped at x: 0-1920. Lacks unconstrained full-bleed coordinates.",
      "critiqueNotes": "The opening scene of the video must immediately hook the audience with cinematic polish. The tiny paparazzi and static 1.05x camera make the premiere feel low energy instead of a high-glamour Hollywood event.",
      "actionableFixes": [
        "Increase Host scale to 1.32 at (520, 650) in Beats 2-4 and (960, 650) in Beat 1.",
        "Scale up Paparazzi rigs to 1.30 with animated strobe flashes.",
        "Add dynamic camera trajectory: Beat 1 (960, 540, 1.04) -> Beat 2 snap punch (1350, 500, 1.45) -> Beat 3 punch (1380, 520, 1.40) -> Beat 4 Host close-up (520, 560, 1.45).",
        "Replace plain text box with illuminated satirical Hollywood billboard with sweeping searchlights.",
        "Expand background and floor line to full-bleed (-4000 to 6000)."
      ],
      "codePatchRecommendation": patches["scene_01_ecosystem"]
    },
    {
      "sceneId": "scene_02_techbro",
      "sceneNumber": 2,
      "name": "Thicc to Stick & Tech Bro Pivot",
      "timeRange": [8.620, 15.334],
      "durationSec": 6.714,
      "score": 52,
      "status": "FAIL",
      "scaleAudit": "FAIL. Host scale: 1.15; Tech Bro scale: 1.15 (occupies only 25% vertical frame). Prompt window is tiny (280x70px with 14px font), leaving vast empty white canvas.",
      "zoomAudit": "CRITICAL FAIL. Camera is 100% STATIC at camera.setTarget(960, 540, 1.04) for all 6.714 seconds. Zero punch-in on the slider whip, zero punch-in on the poof cloud, zero punch-in on AI Founder.",
      "timingAudit": "PASS. Beat transitions (1.48s, 3.28s, 4.68s) match audio cues for 'stick', 'crypto', and 'artificial intelligence' within 80ms.",
      "assetAudit": "FAIL. Slider track is a generic flat line; prompt terminal is a tiny unreadable box. Poof explosion lacks dynamic smoke puff geometry and flying shattered Bitcoin icons.",
      "framingAudit": "FAIL. Ground line clamped at x: 0-1920. Tech Bro feet float at y: 780 instead of grounding on baseline y: 840.",
      "critiqueNotes": "The comedic premise is one of the funniest in the script ('faster than a tech bro pivoting from crypto to AI'). The static camera and tiny 1.15 characters completely defang the high-velocity visual joke.",
      "actionableFixes": [
        "Scale Host to 1.32 and Tech Bro to 1.38 at (1380, 630).",
        "Implement aggressive camera choreography: Beat 1 (960, 540, 1.04) -> Beat 2 (1100, 480, 1.25) -> Beat 3 Poof Punch (1380, 540, 1.50) -> Beat 4 AI Terminal Punch (1380, 480, 1.55) -> Beat 5 Host Finger Guns (520, 560, 1.45).",
        "Enlarge Prompt HUD window to 460x120 with glowing cyber cyan border and blinking terminal cursor: '> prompt: \"generate skinny --v 6.0\"'.",
        "Add contact shadows under Tech Bro at y: 840."
      ],
      "codePatchRecommendation": patches["scene_02_techbro"]
    },
    {
      "sceneId": "scene_03_celebrities",
      "sceneNumber": 3,
      "name": "Jenna Ortega, Emma Stone, Ariana & Cheekbone Calipers",
      "timeRange": [15.334, 22.805],
      "durationSec": 7.471,
      "score": 98,
      "status": "PASS",
      "scaleAudit": "PASS. Host scale: 1.32. Jenna, Emma, and Ariana scale: 1.35 commanding the right stage. Digital caliper fills >75% of zoomed macro frame.",
      "zoomAudit": "PASS. Benchmark dynamic camera punch-ins: 1.25x Host intro -> 1.35x Jenna -> 1.35x Emma -> 1.40x Ariana -> 1.85x Macro Caliper Climax @ (1560, 500) -> 1.45x Host Shock @ (520, 560).",
      "timingAudit": "PASS. Progressive reveals land strictly on spoken names: Jenna @ 1.2s (<80ms), Emma @ 3.36s (0ms), Ariana @ 4.66s (<100ms), Caliper clamp @ 5.86s (<80ms), Host shock @ 6.88s (0ms).",
      "assetAudit": "PASS. High-fidelity vector illustrations: gothic Jenna with smokey eye and shaggy bangs, emerald gown Emma, high-ponytail Ariana, stainless steel digital caliper with glowing green 0.02 mm LCD and red laser grid.",
      "framingAudit": "PASS. Full-bleed background (-4000 to 10000) and ground baseline (-4000 to 6000) at y: 840 with crisp contact shadow ellipses.",
      "critiqueNotes": "Exemplary execution. Demonstrates the exact visual scale, kinetic camera choreography, and sub-100ms comic timing required by the Director Critic skill.",
      "actionableFixes": [
        "None. Maintain Scene 03 as the reference standard across all other scenes."
      ],
      "codePatchRecommendation": "// Scene 03 is already the verified Gold Standard benchmark in src/scenes/Scene03_Celebrities.ts"
    },
    {
      "sceneId": "scene_04_unsubscribe",
      "sceneNumber": 4,
      "name": "Unsubscribe from Carbs & Cancel Lunch",
      "timeRange": [22.805, 32.967],
      "durationSec": 10.162,
      "score": 50,
      "status": "FAIL",
      "scaleAudit": "FAIL. Host scale: 1.15. Dining table is small (rx: 280, ry: 85); pizza slice and sourdough loaf are miniature (< 120px wide). Mega stamp is tiny in wide framing.",
      "zoomAudit": "CRITICAL FAIL. Camera is locked at (960, 540, 1.04) for all 10.162 seconds. Fails to track ascending flying carbs (target: 1.50x @ 1380, 420) and fails to execute Climax Macro Punch-In on the Mega Stamp slam (target: 1.90x @ 1380, 560).",
      "timingAudit": "FAIL. Collapses 5 beats into 3 simple states. Omitted the macOS modal click at 26.32s and SaaS billing cancellation card at 29.0s specified in beat sheet.",
      "assetAudit": "FAIL. Dining table has two disconnected stick legs floating at x: 1040 and 1720. Missing macOS modal dialog with [Confirm] click and SaaS billing invoice card ('LUNCH PLAN: $0.00/mo CANCELLED'). Mega stamp lacks wood-grain detail and dust burst shockwave.",
      "framingAudit": "FAIL. Clamped ground line (0-1920) and floating table legs.",
      "critiqueNotes": "The SaaS cancellation metaphor ('cancel biological subscription to the concept of lunch') requires UI graphics and a violent stamp slam. The current static rendering looks like a quiet still life painting.",
      "actionableFixes": [
        "Scale Host to 1.32 and enlarge table to rx: 340, ry: 95 with solid grounded legs.",
        "Add macOS Unsubscribe UI modal and SaaS billing card components.",
        "Implement 5-beat camera choreography: Beat 1 (960, 540, 1.05) -> Beat 2 Flying Carbs Ascend (1380, 420, 1.50) -> Beat 3 Billing Card (1380, 480, 1.55) -> Beat 4 CLIMAX MACRO STAMP SLAM (1380, 560, 1.90) -> Beat 5 Host Deadpan Shrug (520, 560, 1.45).",
        "Enlarge Flying Carbs to scale 1.45 with flapping angel wings and glowing halos."
      ],
      "codePatchRecommendation": patches["scene_04_unsubscribe"]
    },
    {
      "sceneId": "scene_05_timburton_ps1",
      "sceneNumber": 5,
      "name": "Tim Burton Aesthetic & Low-Poly PS1 Graphics",
      "timeRange": [32.967, 43.729],
      "durationSec": 10.762,
      "score": 60,
      "status": "FAIL",
      "scaleAudit": "FAIL. Host scale: 1.15 in Beats 1 and 3. PS1 wireframe spinning mesh is only radius 170px (occupies < 25% height).",
      "zoomAudit": "FAIL. Zooms are timid: 1.04x -> 1.10x -> 1.04x. Misses aggressive Host Centered Close-Up on 90s rewind (target: 1.48x @ 960, 560) and misses Macro Punch-In on spinning PS1 polygon mesh (target: 1.80x @ 1380, 440).",
      "timingAudit": "PASS. Beat transitions (0.0s, 3.92s, 6.88s) match audio cues for 'Tim Burton aesthetic', 'aggressive return of 90s', and 'PS1 graphics' within 70ms.",
      "assetAudit": "FAIL. Missing 90s VHS 'MAY 1997 - SP' OSD timestamp and memory card icon. Tim Burton hill is a plain silhouette without gothic spiral linework.",
      "framingAudit": "FAIL. Night sky rect clamped to 1920x840. Ground line clamped at x: 0-1920.",
      "critiqueNotes": "The mathematical 3D wireframe rotation is great code, but it is wasted in a tiny 1.04x wide shot. Punching into 1.80x makes the low-polygon facet edges comedic and visceral.",
      "actionableFixes": [
        "Scale Host to 1.32 (Beats 1/3/4) and 1.45 (Beat 2 center). Scale PS1 wireframe mesh radius to 240px.",
        "Implement 5-beat camera choreography: Beat 1 Gothic World (1200, 500, 1.20) -> Beat 2 90s Host Close-Up (960, 560, 1.48) -> Beat 3 PS1 Wireframe (1380, 480, 1.45) -> Beat 4 CLIMAX MACRO POLYGON PUNCH (1380, 440, 1.80) -> Beat 5 Host Reset (520, 560, 1.40).",
        "Add flickering cyan VHS timestamp HUD ('MAY 1997 - SP') and memory card icon.",
        "Full-bleed night sky background (-4000 to 10000)."
      ],
      "codePatchRecommendation": patches["scene_05_timburton_ps1"]
    },
    {
      "sceneId": "scene_06_pendulum",
      "sceneNumber": 6,
      "name": "The Beauty Standard Pendulum & Slouching Couch Guy",
      "timeRange": [43.729, 57.809],
      "durationSec": 14.080,
      "score": 55,
      "status": "FAIL",
      "scaleAudit": "FAIL. Couch Guy on couch is scale 1.35 (good), but Host is scale 1.15. Pendulum pivot is tiny at y: -50. Massive empty white void in center.",
      "zoomAudit": "CRITICAL FAIL. Camera is 100% STATIC at (960, 540, 1.04) for all 14.08 seconds! Misses punch-in on swinging wrecking ball (target: 1.45x @ 1350, 460) and punch-in on Couch Guy ducking for his life (target: 1.60x @ 1380, 660).",
      "timingAudit": "PASS. Pendulum physics trigger at 3.657s (47.38s abs), Couch Guy ducking at 7.771s (51.5s abs), Beat 4 at 10.771s (54.5s abs).",
      "assetAudit": "FAIL. Missing opening classroom chalkboard diagram ('[PAST] <===> [NOW]') and crumbled wall impact dust particles when wrecking ball swings.",
      "framingAudit": "FAIL. Ground line clamped at x: 0-1920. Missing unconstrained full-bleed canvas.",
      "critiqueNotes": "The comedic climax is Couch Guy ducking by two inches as a spiked ACME wrecking ball labeled 'BEAUTY' flies past. Without a 1.60x camera punch-in on the couch, the near-death experience feels miniature.",
      "actionableFixes": [
        "Scale Host to 1.32 and enlarge Couch Guy sofa to scale 1.40.",
        "Add dynamic camera choreography: Beat 1 Lecture (960, 540, 1.05) -> Beat 2 Pendulum Swing (1350, 460, 1.45) -> Beat 3 COUCH GUY DUCKING PUNCH (1380, 660, 1.60) -> Beat 4 Demolished Room / Deadpan Shrug (960, 540, 1.08) -> Beat 5 Reset (520, 560, 1.35).",
        "Add classroom chalkboard prop in Beat 1 and flying potato chip particles in Beat 3."
      ],
      "codePatchRecommendation": patches["scene_06_pendulum"]
    },
    {
      "sceneId": "scene_07_heroinchic",
      "sceneNumber": 7,
      "name": "90s Heroin Chic, Food Pyramid & Victorian Disease",
      "timeRange": [57.809, 80.457],
      "durationSec": 22.648,
      "score": 48,
      "status": "FAIL",
      "scaleAudit": "CRITICAL FAIL. Host is scale 1.15; Kate Moss is scale 1.25 (distant on runway). In Beat 3, the Victorian chaise lounge is a tiny line doodle (circle r: 22) with a microscopic 32x60px tonic bottle with 9px unreadable text!",
      "zoomAudit": "CRITICAL FAIL. Camera is 100% STATIC at (960, 540, 1.04) for all 22.648 seconds! Zero punch-in on runway strut, zero tracking of Food Pyramid tiers, zero punch-in on Victorian fainting collapse.",
      "timingAudit": "MARGINAL. Food pyramid tiers trigger at +1.5s, +3.5s, +6.0s, but lacking camera punches makes the reveals feel flat. Missing Beat 4 'DEAL WITH IT' sunglasses snap at 79.63s.",
      "assetAudit": "CRITICAL FAIL. Parliament cigarette packs are flat blue rectangles. Victorian fainting couch is a rudimentary stick doodle; tonic bottle is tiny and unreadable. Needs dedicated high-fidelity Victorian Chaise Lounge SVG asset.",
      "framingAudit": "FAIL. Ground line clamped at x: 0-1920. Chaise lounge lacks proper contact shadow on baseline.",
      "critiqueNotes": "The Diet Coke + Parliament cigarettes food pyramid and Victorian wasting disease are legendary comedy beats. The current implementation has the worst asset scaling and most timid camera in the entire video.",
      "actionableFixes": [
        "Scale Host to 1.32 and Kate Moss to 1.40. Enlarge Food Pyramid to width 520px with detailed branding.",
        "Create dedicated high-fidelity Victorian Chaise Lounge SVG component (scale 1.45) with velvet button tufts, brass cabriole legs, and a glowing amber apothecary tonic bottle.",
        "Implement 4-beat camera choreography: Beat 1 Runway Strut (1350, 540, 1.45) -> Beat 2 Food Pyramid (1380, 480, 1.45 -> 1.50) -> Beat 3 Victorian Chaise Lounge (1380, 600, 1.60) -> Beat 4 CLIMAX 'DEAL WITH IT' SHADES (1380, 560, 1.85).",
        "Add animated rising cigarette smoke wisps and carbonation bubbles."
      ],
      "codePatchRecommendation": patches["scene_07_heroinchic"]
    },
    {
      "sceneId": "scene_08_pixarmom",
      "sceneNumber": 8,
      "name": "2010s BBL & Pixar Mom Gravitational Field",
      "timeRange": [80.457, 108.199],
      "durationSec": 27.742,
      "score": 58,
      "status": "FAIL",
      "scaleAudit": "FAIL. Host scale: 1.15. Pixar Mom hip inflation scale (1.5x) is good, but Miami clinic billboard is placed in a wide empty void. Text inside glowing box is unreadable.",
      "zoomAudit": "CRITICAL FAIL. Camera is 100% STATIC at (960, 540, 1.04) for all 27.742 seconds! Misses punch-in on Pixar Mom (target: 1.50x @ 1380, 540), misses Macro Punch-In on Gravitational Orbit (target: 1.75x @ 1380, 520), misses punch-in on Miami Billboard (target: 1.55x @ 1350, 360).",
      "timingAudit": "PASS. Beat transitions (0.0s, 4.96s, 14.05s, 23.65s) align accurately with SRT cues 29-38.",
      "assetAudit": "FAIL. Jet taking off is a flat basic polygon; localized gravitational anomaly text is unreadable glowing white on grey; palm trees lack foliage depth.",
      "framingAudit": "FAIL. Ground line clamped at x: 0-1920.",
      "critiqueNotes": "The visual joke of an influencer's hips having their own gravitational pull that traps iPhones and dumbbells is brilliant cartoon physics. It demands a 1.75x macro camera punch to make the orbiting debris legible.",
      "actionableFixes": [
        "Scale Host to 1.32 and Pixar Mom to 1.55.",
        "Implement 5-beat camera choreography: Beat 1 Reverse Pendulum (1100, 500, 1.25) -> Beat 2 Pixar Mom Inflation (1380, 540, 1.50) -> Beat 3 CLIMAX GRAVITATIONAL ORBIT MACRO (1380, 520, 1.75) -> Beat 4 Miami Clinic Billboard (1350, 360, 1.55) -> Beat 5 Host Smug Smirk (520, 560, 1.45).",
        "Add warped spacetime Einsteinian curvature grid lines and speed trails behind orbiting iPhone 14 Pro and 2kg pink dumbbells."
      ],
      "codePatchRecommendation": patches["scene_08_pixarmom"]
    },
    {
      "sceneId": "scene_09_hourglass_pr",
      "sceneNumber": 9,
      "name": "Overfilled Hourglass & Corporate PR Body Positivity",
      "timeRange": [108.199, 129.384],
      "durationSec": 21.185,
      "score": 50,
      "status": "FAIL",
      "scaleAudit": "FAIL. Host scale: 1.15. Brass Hourglass is small (width: 160px); PR scaffolding is thin sticks; Pharma revenue vault is a flat 320x110 rectangle.",
      "zoomAudit": "CRITICAL FAIL. Camera is 100% STATIC at (960, 540, 1.04) for all 21.185 seconds! Misses punch-in on overfilled bottom bulge (target: 1.50x @ 1380, 560) and Macro Punch-In on Pharma Cash Vault (target: 1.80x @ 1380, 520).",
      "timingAudit": "FAIL. Collapses 5 beats into 3. Prematurely jumps to broken cash vault at 12.4s, skipping Cue 43-44 ('size zero leading lady') and collapsing the build-up.",
      "assetAudit": "FAIL. Hourglass is a crude geometric path without glass highlights or brass engravings. PR scaffolding is 4 colored lines. Pharma cash vault is a flat green box with '$$$$$$$$$$$$'. Lacks leading lady mannequin with Oscar and peeling sticker animation.",
      "framingAudit": "FAIL. Hourglass floats at y: 696 instead of grounding on baseline y: 840. Ground line clamped at x: 0-1920.",
      "critiqueNotes": "The metaphor of corporate PR marketing bandaging a cracking glass hourglass before peeling off to reveal pharmaceutical billions needs rich visual staging and aggressive punch-ins.",
      "actionableFixes": [
        "Scale Host to 1.32 and Hourglass to width 320px, height 480px anchored cleanly at y: 840.",
        "Add 5 distinct beats: Beat 1 Hourglass Bulge (1380, 560, 1.50) -> Beat 2 PR Scaffolding Clamp (1380, 500, 1.45) -> Beat 3 Leading Lady Asterisk (960, 540, 1.08) -> Beat 4 CLIMAX PR PEEL & PHARMA VAULT MACRO (1380, 520, 1.80) -> Beat 5 Host Cringe Facepalm (520, 560, 1.45).",
        "Render ornate brass Victorian plates, glass refraction highlights, falling gold sand stream, peeling adhesive sticker with glue strings, and glowing green Pharma Cash Vault."
      ],
      "codePatchRecommendation": patches["scene_09_hourglass_pr"]
    },
    {
      "sceneId": "scene_10_boss_closes_tab",
      "sceneNumber": 10,
      "name": "Fidget Spinner, Podcast & Boss Closes Tab",
      "timeRange": [129.384, 150.857],
      "durationSec": 21.473,
      "score": 56,
      "status": "FAIL",
      "scaleAudit": "FAIL. Host scale: 1.15. Fidget spinner, podcast mic, and browser tab window are scale 1.0, looking tiny in wide framing.",
      "zoomAudit": "CRITICAL FAIL. Camera is 100% STATIC at (960, 540, 1.04) for all 21.473 seconds! Misses punch-in on 3600 RPM spinner (target: 1.45x @ 1380, 440), misses Host fear reaction to towering Boss shadow (target: 1.45x @ 520, 560), misses CLIMAX MACRO PUNCH-IN on Colossal Ctrl+W Key Slam (target: 2.05x @ 1320, 500).",
      "timingAudit": "PASS. Beat transitions (0.0s, 6.0s, 8.80s, 17.11s) align accurately with SRT cues 46-52.",
      "assetAudit": "FAIL. Browser tab is a flat blue box. Ctrl+W key is large but lacks 3D beveled keycap geometry, hydraulic press piston rods, and impact dust shockwave.",
      "framingAudit": "FAIL. Ground line clamped at x: 0-1920. Boss shadow should ground on baseline y: 840.",
      "critiqueNotes": "The punchline ('closing a browser tab when your boss walks by') is the comedic climax of the chapter. A colossal red Ctrl+W key must slam down like a hydraulic forge press at 2.05x zoom with screen-shaking impact.",
      "actionableFixes": [
        "Scale Host to 1.32. Enlarge Fidget Spinner to r: 160px and Podcast Mic to scale 1.40.",
        "Implement 5-beat camera choreography: Beat 1 3600 RPM Spinner (1380, 440, 1.45) -> Beat 2 0-Listener Podcast Mic (1380, 480, 1.45) -> Beat 3 Towering Boss Shadow & Host Terror (520, 560, 1.45) -> Beat 4 CLIMAX HYDRAULIC CTRL+W SLAM MACRO (1320, 500, 2.05) -> Beat 5 Host Relief Sigh (520, 560, 1.40).",
        "Add 3D beveled keycap styling, hydraulic press piston rods, dust puff shockwave, and screen flash."
      ],
      "codePatchRecommendation": patches["scene_10_boss_closes_tab"]
    },
    {
      "sceneId": "scene_11_y2k_fashion",
      "sceneNumber": 11,
      "name": "Y2K Organ-Hostile Fashion & Miu Miu Micro-Belt",
      "timeRange": [150.857, 183.851],
      "durationSec": 32.994,
      "score": 45,
      "status": "FAIL",
      "scaleAudit": "CATASTROPHIC FAIL. Host scale: 1.15. Evicted Liver & Stomach are microscopic (< 80px tall, < 8% frame height), making facial expressions invisible. Mannequin is a thin wire stick. Price tag is a tiny 180x65 box in the distance.",
      "zoomAudit": "CRITICAL FAIL. Camera is 100% STATIC at (960, 540, 1.04) for ALL 32.994 SECONDS! The longest scene in Chapter 1 has zero camera cuts, zero punch-ins, and zero macro zooms.",
      "timingAudit": "FAIL. The $2,400 price tag sits static from 23.56s to 32.99s without transitioning to Beat 5 for Cue 61-63 ('functioning digestive tract process solid food'). Missing the final Error 404 digestive punchline graphic and Host 1000-yard soul stare.",
      "assetAudit": "FAIL. Mannequin is a crude line stick; price tag is tiny; missing Y2K cyber-metallic starburst gradient backdrop, floating low-rise denim blueprint, and Error 404 Digestive Warning HUD with floating saltine cracker.",
      "framingAudit": "FAIL. Ground line clamped at x: 0-1920. Evicted organs float at y: 620 instead of walking along floor baseline y: 840.",
      "critiqueNotes": "The grand finale of Chapter 1! Evicted internal organs packing suitcases and the Miu Miu micro-skirt shrinking to a 1-inch belt with a $2,400 price tag are peak Casually Explained comedy. Current rendering is unreadable due to microscopic scale and zero camera punch-ins.",
      "actionableFixes": [
        "Scale Host to 1.32. Scale Evicted Liver & crying Stomach to 1.50 (height: 220px) walking along floor baseline y: 840.",
        "Scale Mannequin to 1.40 and 1-Inch Leather Belt with dangling gold foil $2,400.00 Price Tag to scale 1.55.",
        "Implement 5-beat camera choreography: Beat 1 Y2K Cyber Blueprint (1380, 520, 1.35) -> Beat 2 Evicted Organs with Suitcases (1380, 600, 1.60) -> Beat 3 Low-Rise Mannequin & Napkin Baby Tee (1380, 560, 1.50) -> Beat 4 CLIMAX 1-INCH BELT & $2,400 PRICE TAG MACRO (1475, 620, 2.05) -> Beat 5 Host 1000-Yard Soul Stare & Error 404 Digestion HUD (960, 540, 1.05).",
        "Add Error 404 Digestive Warning HUD sign with floating saltine cracker in Beat 5."
      ],
      "codePatchRecommendation": patches["scene_11_y2k_fashion"]
    }
  ],
  "requiredFixes": [
    {
      "priority": "P0_CRITICAL",
      "category": "CAMERA_CHOREOGRAPHY",
      "description": "Replace static `camera.setTarget(960, 540, 1.04)` across Scenes 01, 02, 04, 05, 06, 07, 08, 09, 10, 11 with per-beat snap punch-ins (1.40x-1.65x) on subject entrances, macro punchlines (1.80x-2.10x) on climax gags, and snap cuts to Host reaction close-ups (1.40x-1.48x)."
    },
    {
      "priority": "P0_CRITICAL",
      "category": "ASSET_SCALE_AND_SCREEN_REALISM",
      "description": "Increase Host scale globally from 1.15 to 1.32 across all scenes. Scale up joke cast and key props (Tech Bro, Evicted Organs, Food Pyramid, Hourglass, Mannequin, Couch Guy) to 1.35 - 1.60 so they occupy 45-65% vertical frame height."
    },
    {
      "priority": "P0_CRITICAL",
      "category": "CANVAS_BOUNDS_AND_GROUNDING",
      "description": "Replace `<line x1=\"0\" y1=\"840\" x2=\"1920\" y2=\"840\" .../>` with `<line x1=\"-4000\" y1=\"840\" x2=\"6000\" y2=\"840\" stroke=\"#e2e8f0\" stroke-width=\"4\"/>` and `<rect x=\"-4000\" y=\"-4000\" width=\"10000\" height=\"10000\" fill=\"#f8fafc\"/>` in all scene files to eliminate border cutoffs during camera panning/zooms."
    },
    {
      "priority": "P1_HIGH",
      "category": "TIMING_AND_BEAT_COMPLETION",
      "description": "Implement missing comedic beats in Scene 01 (Beat 4 pause hold), Scene 04 (macOS modal + SaaS billing card), Scene 07 (Deal With It shades), Scene 09 (5-beat breakdown with leading lady asterisk), Scene 10 (relief sigh), and Scene 11 (Beat 5 Error 404 digestion HUD)."
    },
    {
      "priority": "P1_HIGH",
      "category": "SVG_ASSET_ENHANCEMENT",
      "description": "Upgrade inline graphics with rich vector components: illuminated Hollywood sign with searchlights; macOS UI modal; 90s VHS timestamp HUD; Victorian burgundy chaise lounge with cabriole legs and amber tonic; warped spacetime gravity grid; hydraulic Ctrl+W key with piston rods and smoke; gold foil $2,400.00 price tag."
    }
  ],
  "assetGenerationManifest": [
    {
      "assetId": "hollywood_hills_searchlights",
      "targetFile": "src/character/CartoonCast.ts",
      "functionName": "renderHollywoodBackdrop",
      "description": "Illuminated Hollywood Hills with dual criss-crossing golden searchlights and satirical billboard 'HOLLYWOOD ECOSYSTEM (DOWNSIZED)'."
    },
    {
      "assetId": "victorian_chaise_lounge_tonic",
      "targetFile": "src/character/CartoonCast.ts",
      "functionName": "renderVictorianChaiseLounge",
      "description": "Burgundy velvet Victorian fainting chaise lounge with ornate brass cabriole legs, lace doily, collapsing stick figure, and glowing amber laudanum apothecary bottle."
    },
    {
      "assetId": "hydraulic_ctrl_w_key",
      "targetFile": "src/character/CartoonCast.ts",
      "functionName": "renderHydraulicCtrlW",
      "description": "Colossal red 3D 'Ctrl + W' keyboard keycap with steel hydraulic press piston rods, warning hazard stripes, impact smoke puff, and screen flash."
    },
    {
      "assetId": "designer_micro_belt_tag",
      "targetFile": "src/character/CartoonCast.ts",
      "functionName": "renderMiuMiuMicroBelt",
      "description": "1-inch leather belt with gold buckle, mannequin display stand, and dangling gold foil '$2,400.00 (ORGANS SOLD SEPARATELY)' price tag with harmonic pendulum swing."
    },
    {
      "assetId": "error_404_digestive_hud",
      "targetFile": "src/character/CartoonCast.ts",
      "functionName": "renderDigestiveWarningHud",
      "description": "Neon HUD alert '[ERROR 404: DIGESTIVE SYSTEM INCOMPATIBLE WITH CURRENT FASHION META]' with single saltine cracker floating in beaker of water."
    }
  ]
}

report_path = "/root/Desktop/casually-explained-video/DIRECTOR_CRITIC_REPORT.json"
with open(report_path, "w") as f:
    json.dump(audit_report, f, indent=2)

print(f"DIRECTOR_CRITIC_REPORT.json successfully written to {report_path} ({os.path.getsize(report_path)} bytes)")

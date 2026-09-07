import { Scene, SceneRenderContext, SceneRenderOutput } from "./SceneTypes";
import { renderBillionaireGoldElevator } from "../character/CartoonComedyPuppets";
import {
  renderFrozenForeheadDivorce,
  renderBusinessEnvelope,
  renderYouAreNotLazyCard,
} from "../character/CartoonCastSubScenes";
import { renderHandDrawnArrow, renderHandDrawnCircle, renderActionLines } from "../anim/ComicMarkups";

export const Scene18_EconomicOutro: Scene = {
  id: "scene_18_economic_outro",
  name: "Economic Divide: Frozen Forehead, Envelope & YouTube Outro",
  startTime: 540.354,
  endTime: 644.080,

  render(ctx: SceneRenderContext): SceneRenderOutput {
    const { sceneTime, camera } = ctx;

    // 5 DEDICATED COMEDIC BEATS:
    // Beat 1 (0.0s - 23.0s / 540s - 563s): Botoxed Tragic Divorce with Frozen Stationary Forehead
    // Beat 2 (23.0s - 45.0s / 563s - 585s): Billionaire Gold Elevator & $6,700/mo Outsourcing
    // Beat 3 (45.0s - 68.0s / 585s - 608s): Fitting Inside a Standard Business Envelope
    // Beat 4 (68.0s - 85.0s / 608s - 625s): "You Are Not Lazy" Satirical Reassurance Card
    // Beat 5 (85.0s - 103.7s / 625s - 644s): YouTube Subscribe Outro & "I'm Not Your Dad"
    const isBeat1 = sceneTime < 23.0;
    const isBeat2 = sceneTime >= 23.0 && sceneTime < 45.0;
    const isBeat3 = sceneTime >= 45.0 && sceneTime < 68.0;
    const isBeat4 = sceneTime >= 68.0 && sceneTime < 85.0;
    const isBeat5 = sceneTime >= 85.0;

    let overlays = "";
    let bg = "";
    let stickFiguresList: Array<{ id: string; state: any }> = [];

    // =========================================================================
    // BEAT 1: FROZEN FOREHEAD TRAGIC DIVORCE MELODRAMA (0.0s - 23.0s)
    // =========================================================================
    if (isBeat1) {
      camera.setTarget(960, 500, 1.08);

      bg = `
        <!-- Cinema Movie Melodrama Room -->
        <rect x="-4000" y="-4000" width="10000" height="10000" fill="#0f172a"/>
        <rect x="150" y="80" width="1620" height="720" rx="14" fill="#1e1b4b" stroke="#6366f1" stroke-width="8"/>
        
        <!-- Floor -->
        <rect x="-4000" y="800" width="10000" height="4000" fill="#020617"/>
        <line x1="-4000" y1="800" x2="6000" y2="800" stroke="#6366f1" stroke-width="8"/>
      `;

      bg += renderFrozenForeheadDivorce(1260, 460, sceneTime);
      overlays += renderActionLines({ x: 1260, y: 460 }, 220, sceneTime);

      stickFiguresList.push({
        id: "host_stick",
        state: {
          x: 420,
          y: 640,
          scale: 1.34,
          gender: "male",
          hairStyle: "host_classic",
          clothes: "none",
          expression: "confused_squint",
          pointTarget: { x: 1260, y: 460 },
          timeSec: sceneTime,
        },
      });
    }

    // =========================================================================
    // BEAT 2: BILLIONAIRE GOLD ELEVATOR & OUTSOURCING (23.0s - 45.0s)
    // =========================================================================
    else if (isBeat2) {
      camera.setTarget(960, 520, 1.12);

      bg = `
        <!-- Penthouse Gold Elevator Lobby -->
        <rect x="-4000" y="-4000" width="10000" height="10000" fill="#0f172a"/>
        <rect x="150" y="80" width="1620" height="720" rx="14" fill="#1e293b" stroke="#f59e0b" stroke-width="8"/>
        
        <!-- Monthly Cost Receipt Card -->
        <g transform="translate(640, 320)">
          <rect x="-140" y="-120" width="280" height="240" rx="10" fill="#ffffff" stroke="#0f172a" stroke-width="4" filter="url(#cardShadow)"/>
          <text x="0" y="-80" font-family="'Impact', sans-serif" font-size="20" fill="#0f172a" text-anchor="middle">MONTHLY COST</text>
          <line x1="-120" y1="-60" x2="120" y2="-60" stroke="#cbd5e1" stroke-width="2"/>
          <text x="-110" y="-30" font-family="monospace" font-size="14" fill="#334155">Ozempic: $1,200</text>
          <text x="-110" y="-5" font-family="monospace" font-size="14" fill="#334155">Chef: $3,500</text>
          <text x="-110" y="20" font-family="monospace" font-size="14" fill="#334155">Trainer: $2,000</text>
          <line x1="-120" y1="40" x2="120" y2="40" stroke="#0f172a" stroke-width="3"/>
          <text x="0" y="80" font-family="'Impact', sans-serif" font-size="24" fill="#ef4444" text-anchor="middle">TOTAL: $6,700/mo</text>
        </g>

        <!-- Floor -->
        <rect x="-4000" y="800" width="10000" height="4000" fill="#020617"/>
        <line x1="-4000" y1="800" x2="6000" y2="800" stroke="#f59e0b" stroke-width="8"/>
      `;

      bg += renderBillionaireGoldElevator(1280, 500, sceneTime);

      stickFiguresList.push({
        id: "billionaire_actor",
        state: {
          x: 1040,
          y: 640,
          scale: 1.34,
          gender: "male",
          hairStyle: "male_tech_bro",
          clothes: "suit",
          expression: "smug_rock_eyebrow",
          pointTarget: { x: 640, y: 320 },
          timeSec: sceneTime,
        },
      });
    }

    // =========================================================================
    // BEAT 3: STANDARD BUSINESS ENVELOPE (45.0s - 68.0s)
    // =========================================================================
    else if (isBeat3) {
      camera.setTarget(960, 500, 1.08);

      bg = `
        <!-- Hollywood Press Tour Mailroom -->
        <rect x="-4000" y="-4000" width="10000" height="10000" fill="#f8fafc"/>
        <rect x="150" y="80" width="1620" height="720" rx="14" fill="#e2e8f0" stroke="#64748b" stroke-width="8"/>
        
        <!-- Floor -->
        <rect x="-4000" y="800" width="10000" height="4000" fill="#cbd5e1"/>
        <line x1="-4000" y1="800" x2="6000" y2="800" stroke="#64748b" stroke-width="8"/>
      `;

      bg += renderBusinessEnvelope(1260, 480, sceneTime);
      overlays += renderHandDrawnArrow({ x: 650, y: 520 }, { x: 1060, y: 480 }, sceneTime, "FITS IN ENVELOPE");

      stickFiguresList.push({
        id: "host_stick",
        state: {
          x: 420,
          y: 640,
          scale: 1.34,
          gender: "male",
          hairStyle: "host_classic",
          clothes: "none",
          expression: "shock_home_alone",
          pointTarget: { x: 1260, y: 480 },
          timeSec: sceneTime,
        },
      });
    }

    // =========================================================================
    // BEAT 4: YOU ARE NOT LAZY REASSURANCE CARD (68.0s - 85.0s)
    // =========================================================================
    else if (isBeat4) {
      camera.setTarget(960, 500, 1.08);

      bg = `
        <!-- Warm Supportive Studio Stage -->
        <rect x="-4000" y="-4000" width="10000" height="10000" fill="#064e3b"/>
        <rect x="150" y="80" width="1620" height="720" rx="14" fill="#022c22" stroke="#10b981" stroke-width="8"/>
        
        <!-- Floor -->
        <rect x="-4000" y="800" width="10000" height="4000" fill="#064e3b"/>
        <line x1="-4000" y1="800" x2="6000" y2="800" stroke="#10b981" stroke-width="8"/>
      `;

      bg += renderYouAreNotLazyCard(1260, 460, sceneTime);

      stickFiguresList.push({
        id: "host_stick",
        state: {
          x: 420,
          y: 640,
          scale: 1.34,
          gender: "male",
          hairStyle: "host_classic",
          clothes: "none",
          expression: "smug_chef_kiss",
          pointTarget: { x: 1260, y: 460 },
          timeSec: sceneTime,
        },
      });
    }

    // =========================================================================
    // BEAT 5: YOUTUBE SUBSCRIBE OUTRO & "NOT YOUR DAD" (85.0s - 103.7s)
    // =========================================================================
    else {
      camera.cutTo(960, 500, 1.15);

      const bellRing = Math.sin(sceneTime * 10) * 15;

      bg = `
        <!-- Clean YouTube Outro Backdrop -->
        <rect x="-4000" y="-4000" width="10000" height="10000" fill="#f8fafc"/>
        
        <!-- YouTube Subscribe Box -->
        <g transform="translate(1320, 360)" filter="url(#cardShadow)">
          <rect x="-220" y="-55" width="440" height="110" rx="20" fill="#dc2626" stroke="#b91c1c" stroke-width="4"/>
          <text x="-40" y="14" font-family="'Impact', sans-serif" font-size="38" fill="#ffffff" letter-spacing="2" text-anchor="middle">
            SUBSCRIBE
          </text>
          <!-- Bell Icon -->
          <g transform="translate(140, 0) rotate(${bellRing})">
            <path d="M 0 -22 C -14 -22 -20 -10 -20 12 L -26 18 L 26 18 L 20 12 C 20 -10 14 -22 0 -22 Z" fill="#fbbf24" stroke="#d97706" stroke-width="3"/>
            <circle cx="0" cy="24" r="6" fill="#d97706"/>
          </g>
        </g>

        <!-- "I'M NOT YOUR DAD" Card -->
        <g transform="translate(1320, 540)" filter="url(#cardShadow)">
          <rect x="-220" y="-40" width="440" height="80" rx="14" fill="#0f172a" stroke="#f59e0b" stroke-width="5"/>
          <text x="0" y="10" font-family="'Impact', Arial, sans-serif" font-size="24" fill="#fbbf24" text-anchor="middle">
            "I'M NOT YOUR DAD, I DON'T CARE"
          </text>
        </g>

        <!-- Floor -->
        <rect x="-4000" y="800" width="10000" height="4000" fill="#e2e8f0"/>
        <line x1="-4000" y1="800" x2="6000" y2="800" stroke="#cbd5e1" stroke-width="6"/>
      `;

      stickFiguresList.push({
        id: "host_actor",
        state: {
          x: 580,
          y: 640,
          scale: 1.34,
          gender: "male",
          hairStyle: "host_classic",
          clothes: "none",
          expression: "deadpan_slow_blink",
          pointTarget: { x: 1320, y: 360 },
          timeSec: sceneTime,
        },
      });
    }

    return {
      backgroundSvg: bg + overlays,
      stickFigures: stickFiguresList,
    };
  },
};


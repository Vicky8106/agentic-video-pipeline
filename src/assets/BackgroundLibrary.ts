/**
 * Canonical 14-Background Vector Library for Casually Explained Drama Animation.
 * Phase 1 asset contract: stable IDs, full-bleed unconstrained parallax, multi-layer depth.
 */

import fs from "node:fs";
import path from "node:path";

export type BackgroundId =
  | "BG-STUDIO"
  | "BG-HOLLYWOOD"
  | "BG-CINEMA"
  | "BG-90S"
  | "BG-Y2K"
  | "BG-GYM"
  | "BG-CLINIC"
  | "BG-RETRO"
  | "BG-GOTHIC"
  | "BG-TRIBUNAL"
  | "BG-OFFICE"
  | "BG-KITCHEN"
  | "BG-AUDIENCE"
  | "BG-PARK"
  | "BG-END";

export interface BackgroundRenderOpts {
  timeSec?: number;
  flashL?: boolean;
  flashR?: boolean;
  cameraX?: number;
  cameraY?: number;
}

export interface DynamicBackgroundEntry {
  svgFragment: string;
}
export const DYNAMIC_BACKGROUNDS = new Map<string, DynamicBackgroundEntry>();

export function registerDynamicBackground(id: string, bg: DynamicBackgroundEntry | string): void {
  const entry: DynamicBackgroundEntry = typeof bg === "string" ? { svgFragment: bg } : bg;
  DYNAMIC_BACKGROUNDS.set(id, entry);
}

/**
 * Renders rich full-bleed vector backgrounds with depth layers, parallax and contact shadows.
 */
export function renderBackground(bgId: BackgroundId | string = "BG-STUDIO", opts: BackgroundRenderOpts = {}): string {
  const { timeSec = 0, flashL = false, flashR = false, cameraX = 960, cameraY = 540 } = opts;
  const t = timeSec;

  if (!DYNAMIC_BACKGROUNDS.has(bgId)) {
    try {
      const cachePath = path.resolve(process.cwd(), `.asset_cache/background_${bgId.toLowerCase().replace(/[^a-z0-9_-]/g, "_")}.json`);
      if (fs.existsSync(cachePath)) {
        const raw = JSON.parse(fs.readFileSync(cachePath, "utf8"));
        if (raw && raw.svgFragment) {
          DYNAMIC_BACKGROUNDS.set(bgId, { svgFragment: raw.svgFragment });
        }
      }
    } catch {}
  }

  if (DYNAMIC_BACKGROUNDS.has(bgId)) {
    return DYNAMIC_BACKGROUNDS.get(bgId)!.svgFragment;
  }

  switch (bgId) {
    // 1. Neutral Explainer Studio Stage
    case "BG-STUDIO":
    default:
      return `
        <!-- Full-Bleed Studio Stage Background -->
        <rect x="-4000" y="-4000" width="10000" height="10000" fill="#fbfaf7"/>
        <rect x="-4000" y="740" width="10000" height="4000" fill="#edf0ea"/>
        <line x1="-4000" y1="740" x2="6000" y2="740" stroke="#d5dbd4" stroke-width="4"/>
        <!-- Soft Studio Vignette Gradient -->
        <circle cx="960" cy="400" r="800" fill="#ffffff" opacity="0.4" filter="url(#glow)"/>
      `;

    // 2. Hollywood Red Carpet & Paparazzi Boulevard
    case "BG-HOLLYWOOD": {
      const pFlash1 = flashL || (Math.sin(t * 14) > 0.4);
      const pFlash2 = flashR || (Math.cos(t * 18) > 0.4);
      return `
        <rect x="-4000" y="-4000" width="10000" height="10000" fill="#0f172a"/>
        <!-- Night Sky & Distant Hollywood Hills -->
        <path d="M -1000 480 Q 400 320 1000 440 T 2600 360 L 2600 740 L -1000 740 Z" fill="#1e293b"/>
        <!-- Distant Palm Trees Silhouettes -->
        <g opacity="0.5">
          <path d="M 220 740 L 225 450 Q 180 410 140 430 M 225 450 Q 220 390 225 380 M 225 450 Q 270 400 310 420" stroke="#090d16" stroke-width="6" fill="none"/>
          <path d="M 1720 740 L 1715 440 Q 1670 400 1630 420 M 1715 440 Q 1720 380 1715 370 M 1715 440 Q 1760 390 1800 410" stroke="#090d16" stroke-width="6" fill="none"/>
        </g>
        <!-- Hollywood Step-and-Repeat Media Sponsor Wall -->
        <rect x="250" y="320" width="1420" height="420" fill="#18181b" stroke="#27272a" stroke-width="6"/>
        <g fill="#71717a" font-family="'Impact', sans-serif" font-size="22" letter-spacing="4" text-anchor="middle" opacity="0.4">
          <text x="500" y="400">HOLLYWOOD</text>
          <text x="960" y="400">AWARDS 2026</text>
          <text x="1420" y="400">HOLLYWOOD</text>
          <text x="730" y="520">GLOBAL PREMIERE</text>
          <text x="1190" y="520">CELEBRITY GALA</text>
          <text x="500" y="640">MET GALA</text>
          <text x="960" y="640">RED CARPET</text>
          <text x="1420" y="640">MET GALA</text>
        </g>
        <!-- Ground Plane -->
        <rect x="-4000" y="740" width="10000" height="4000" fill="#09090b"/>
        <line x1="-4000" y1="740" x2="6000" y2="740" stroke="#27272a" stroke-width="4"/>
        <!-- Red Carpet Runway (Perspective) -->
        <polygon points="300,1080 820,680 1100,680 1620,1080" fill="#dc2626"/>
        <line x1="300" y1="1080" x2="820" y2="680" stroke="#991b1b" stroke-width="6"/>
        <line x1="1620" y1="1080" x2="1100" y2="680" stroke="#991b1b" stroke-width="6"/>
        <!-- Golden Brass Stanchions & Velvet Ropes -->
        <line x1="260" y1="720" x2="520" y2="690" stroke="#991b1b" stroke-width="8"/>
        <line x1="1660" y1="690" x2="1400" y2="720" stroke="#991b1b" stroke-width="8"/>
        <circle cx="260" cy="620" r="16" fill="#facc15" stroke="#ca8a04" stroke-width="4"/>
        <line x1="260" y1="620" x2="260" y2="820" stroke="#facc15" stroke-width="8"/>
        <circle cx="1660" cy="620" r="16" fill="#facc15" stroke="#ca8a04" stroke-width="4"/>
        <line x1="1660" y1="620" x2="1660" y2="820" stroke="#facc15" stroke-width="8"/>
        <!-- Paparazzi Camera Flash Strobe Starbursts -->
        ${pFlash1 ? `
          <circle cx="180" cy="560" r="80" fill="#ffffff" opacity="0.85" filter="url(#glow)"/>
          <line x1="180" y1="460" x2="180" y2="660" stroke="#ffffff" stroke-width="6"/>
          <line x1="80" y1="560" x2="280" y2="560" stroke="#ffffff" stroke-width="6"/>
        ` : ""}
        ${pFlash2 ? `
          <circle cx="1740" cy="560" r="80" fill="#ffffff" opacity="0.85" filter="url(#glow)"/>
          <line x1="1740" y1="460" x2="1740" y2="660" stroke="#ffffff" stroke-width="6"/>
          <line x1="1640" y1="560" x2="1840" y2="560" stroke="#ffffff" stroke-width="6"/>
        ` : ""}
      `;
    }

    // 3. Cinema Theater Screen & Plush Velvet Seats
    case "BG-CINEMA":
      return `
        <rect x="-4000" y="-4000" width="10000" height="10000" fill="#090d16"/>
        <!-- Massive Glowing Projector Cinema Screen -->
        <g transform="translate(960, 360)">
          <rect x="-560" y="-240" width="1120" height="520" rx="14" fill="#020617" stroke="#334155" stroke-width="12"/>
          <rect x="-540" y="-220" width="1080" height="480" rx="8" fill="#f8fafc" opacity="0.95" filter="url(#glow)"/>
          <text x="0" y="20" font-family="'Impact', sans-serif" font-size="54" fill="#0f172a" text-anchor="middle">CINEMA SCREEN</text>
        </g>
        <!-- Floor & Theater Sloped Aisle -->
        <rect x="-4000" y="720" width="10000" height="4000" fill="#1e1b18"/>
        <!-- Silhouetted Velvet Cinema Seats (Foreground Rows) -->
        <g fill="#450a0a" stroke="#1c0404" stroke-width="4">
          <rect x="120" y="740" width="220" height="180" rx="16"/>
          <rect x="380" y="740" width="220" height="180" rx="16"/>
          <rect x="1320" y="740" width="220" height="180" rx="16"/>
          <rect x="1580" y="740" width="220" height="180" rx="16"/>
        </g>
      `;

    // 4. 1990s Fashion Editorial Photo Studio
    case "BG-90S":
      return `
        <rect x="-4000" y="-4000" width="10000" height="10000" fill="#e2e8f0"/>
        <!-- Dark Paper Seamless Backdrop Roll clamped on stands -->
        <g transform="translate(960, 480)">
          <rect x="-620" y="-360" width="1240" height="660" rx="10" fill="#334155" stroke="#1e293b" stroke-width="8"/>
          <!-- Top Support Crossbar & Clamps -->
          <line x1="-680" y1="-360" x2="680" y2="-360" stroke="#0f172a" stroke-width="10"/>
          <rect x="-600" y="-380" width="24" height="40" rx="4" fill="#f59e0b"/>
          <rect x="576" y="-380" width="24" height="40" rx="4" fill="#f59e0b"/>
        </g>
        <!-- Concrete Studio Floor -->
        <rect x="-4000" y="760" width="10000" height="4000" fill="#94a3b8"/>
        <line x1="-4000" y1="760" x2="6000" y2="760" stroke="#64748b" stroke-width="6"/>
        <!-- Studio Tripod Softbox Lights (Left & Right) -->
        <g transform="translate(260, 480)">
          <polygon points="-50,-120 50,-120 70,80 -70,80" fill="#0f172a" stroke="#020617" stroke-width="4"/>
          <polygon points="-40,-110 40,-110 60,70 -60,70" fill="#ffffff" opacity="0.9"/>
          <line x1="0" y1="80" x2="0" y2="300" stroke="#0f172a" stroke-width="8"/>
          <line x1="0" y1="300" x2="-60" y2="380" stroke="#0f172a" stroke-width="6"/>
          <line x1="0" y1="300" x2="60" y2="380" stroke="#0f172a" stroke-width="6"/>
        </g>
        <!-- Backstage Lighted Dressing Vanity Mirror -->
        <g transform="translate(1640, 520)">
          <rect x="-100" y="-180" width="200" height="280" rx="10" fill="#475569" stroke="#1e293b" stroke-width="6"/>
          <rect x="-80" y="-160" width="160" height="240" rx="6" fill="#cbd5e1"/>
          <!-- Glowing Vanity Bulbs -->
          <circle cx="-90" cy="-140" r="10" fill="#fef08a" stroke="#ca8a04" stroke-width="2"/>
          <circle cx="-90" cy="-80" r="10" fill="#fef08a" stroke="#ca8a04" stroke-width="2"/>
          <circle cx="-90" cy="-20" r="10" fill="#fef08a" stroke="#ca8a04" stroke-width="2"/>
          <circle cx="90" cy="-140" r="10" fill="#fef08a" stroke="#ca8a04" stroke-width="2"/>
          <circle cx="90" cy="-80" r="10" fill="#fef08a" stroke="#ca8a04" stroke-width="2"/>
          <circle cx="90" cy="-20" r="10" fill="#fef08a" stroke="#ca8a04" stroke-width="2"/>
        </g>
      `;

    // 5. Y2K High Fashion Showroom & Neon Display
    case "BG-Y2K":
      return `
        <rect x="-4000" y="-4000" width="10000" height="10000" fill="#030712"/>
        <!-- Hot Pink & Cyan Neon Signs -->
        <g transform="translate(960, 260)">
          <text x="0" y="0" font-family="'Impact', sans-serif" font-size="64" fill="#ec4899" stroke="#f43f5e" stroke-width="2" letter-spacing="8" filter="url(#glow)" text-anchor="middle">
            Y2K FASHION LAB
          </text>
          <text x="0" y="60" font-family="'Courier New', monospace" font-size="24" font-weight="bold" fill="#06b6d4" letter-spacing="4" filter="url(#glow)" text-anchor="middle">
            [ LOW-RISE ERA // 2002 REBOOT ]
          </text>
        </g>
        <!-- Chrome Reflective Grid Floor -->
        <rect x="-4000" y="740" width="10000" height="4000" fill="#0f172a"/>
        <line x1="-4000" y1="740" x2="6000" y2="740" stroke="#ec4899" stroke-width="6" filter="url(#glow)"/>
        <!-- Grid Perspective Lines -->
        <g stroke="#38bdf8" stroke-width="2" opacity="0.4">
          <line x1="960" y1="740" x2="0" y2="1080"/>
          <line x1="960" y1="740" x2="480" y2="1080"/>
          <line x1="960" y1="740" x2="960" y2="1080"/>
          <line x1="960" y1="740" x2="1440" y2="1080"/>
          <line x1="960" y1="740" x2="1920" y2="1080"/>
        </g>
        <!-- Metallic Garment Racks displaying Micro Skirts -->
        <g transform="translate(320, 600)">
          <line x1="-120" y1="-80" x2="120" y2="-80" stroke="#94a3b8" stroke-width="8"/>
          <line x1="-120" y1="-80" x2="-120" y2="160" stroke="#64748b" stroke-width="8"/>
          <line x1="120" y1="-80" x2="120" y2="160" stroke="#64748b" stroke-width="8"/>
          <!-- Hanging Micro Belts/Skirts -->
          <rect x="-90" y="-70" width="40" height="60" fill="#f43f5e" rx="4"/>
          <rect x="-30" y="-70" width="40" height="50" fill="#38bdf8" rx="4"/>
          <rect x="30" y="-70" width="40" height="55" fill="#facc15" rx="4"/>
        </g>
      `;

    // 6. Hardcore Gym & Fitness Rack
    case "BG-GYM":
      return `
        <rect x="-4000" y="-4000" width="10000" height="10000" fill="#18181b"/>
        <!-- Gym Wall Motivational Poster & Full Length Mirror -->
        <rect x="360" y="240" width="340" height="460" rx="10" fill="#27272a" stroke="#3f3f46" stroke-width="8"/>
        <text x="530" y="320" font-family="'Impact', sans-serif" font-size="34" fill="#ef4444" text-anchor="middle">DISCIPLINE</text>
        <text x="530" y="370" font-family="sans-serif" font-size="16" font-weight="bold" fill="#e4e4e7" text-anchor="middle">CHICKEN &amp; BROCCOLI</text>
        <text x="530" y="410" font-family="sans-serif" font-size="16" font-weight="bold" fill="#e4e4e7" text-anchor="middle">4:00 AM EVERY DAY</text>
        <!-- Rubber Floor Mats -->
        <rect x="-4000" y="740" width="10000" height="4000" fill="#09090b"/>
        <line x1="-4000" y1="740" x2="6000" y2="740" stroke="#3f3f46" stroke-width="6"/>
        <!-- Heavy Steel Squat Power Rack (Stage Right) -->
        <g transform="translate(1520, 560)">
          <!-- Upright Pillars -->
          <line x1="-120" y1="-260" x2="-120" y2="200" stroke="#dc2626" stroke-width="16"/>
          <line x1="120" y1="-260" x2="120" y2="200" stroke="#dc2626" stroke-width="16"/>
          <line x1="-120" y1="-240" x2="120" y2="-240" stroke="#475569" stroke-width="12"/>
          <!-- Olympic Barbell Loaded on J-Hooks -->
          <line x1="-180" y1="-60" x2="180" y2="-60" stroke="#cbd5e1" stroke-width="12"/>
          <!-- 45lb Plates -->
          <rect x="-170" y="-120" width="24" height="120" rx="6" fill="#0f172a" stroke="#475569" stroke-width="4"/>
          <rect x="-140" y="-100" width="20" height="80" rx="4" fill="#0f172a" stroke="#475569" stroke-width="4"/>
          <rect x="146" y="-120" width="24" height="120" rx="6" fill="#0f172a" stroke="#475569" stroke-width="4"/>
          <rect x="120" y="-100" width="20" height="80" rx="4" fill="#0f172a" stroke="#475569" stroke-width="4"/>
        </g>
      `;

    // 7. Beverly Hills Aesthetic Clinic & Examination Room
    case "BG-CLINIC":
      return `
        <rect x="-4000" y="-4000" width="10000" height="10000" fill="#f0fdfa"/>
        <!-- Pristine Sterile Floor -->
        <rect x="-4000" y="740" width="10000" height="4000" fill="#ccfbf1"/>
        <line x1="-4000" y1="740" x2="6000" y2="740" stroke="#5eead4" stroke-width="6"/>
        <!-- Wall-Mounted High-Tech Anatomical Scan Screen -->
        <g transform="translate(1380, 420)">
          <rect x="-240" y="-160" width="480" height="320" rx="16" fill="#042f2e" stroke="#0d9488" stroke-width="8" filter="url(#cardShadow)"/>
          <text x="0" y="-115" font-family="'Impact', sans-serif" font-size="20" fill="#2dd4bf" letter-spacing="2" text-anchor="middle">FACIAL CONTOUR DIAGNOSTICS</text>
          <!-- Stylized Cheekbone Contour Diagram -->
          <ellipse cx="0" cy="0" rx="70" ry="90" fill="none" stroke="#2dd4bf" stroke-width="4"/>
          <!-- Orange Buccal Fat Extraction Highlights -->
          <ellipse cx="-35" cy="15" rx="18" ry="14" fill="#f97316" stroke="#ea580c" stroke-width="2"/>
          <ellipse cx="35" cy="15" rx="18" ry="14" fill="#f97316" stroke="#ea580c" stroke-width="2"/>
          <text x="0" y="70" font-family="'Courier New', monospace" font-size="14" font-weight="bold" fill="#facc15" text-anchor="middle">[ BUCCAL VOLUME: -80% ]</text>
        </g>
        <!-- Sleek Stainless Steel Examination Bed (Left) -->
        <g transform="translate(420, 680)">
          <rect x="-180" y="-40" width="360" height="30" rx="8" fill="#e2e8f0" stroke="#475569" stroke-width="6"/>
          <polygon points="-180,-40 -120,-110 -60,-40" fill="#e2e8f0" stroke="#475569" stroke-width="6"/> <!-- Angled Headrest -->
          <line x1="-140" y1="-10" x2="-140" y2="80" stroke="#64748b" stroke-width="10"/>
          <line x1="140" y1="-10" x2="140" y2="80" stroke="#64748b" stroke-width="10"/>
        </g>
      `;

    // 8. Retro PS1 / 1990s Low-Poly Character Creator
    case "BG-RETRO":
      return `
        <rect x="-4000" y="-4000" width="10000" height="10000" fill="#090d16"/>
        <!-- CRT Magenta & Cyan Wireframe Grid Floor -->
        <rect x="-4000" y="720" width="10000" height="4000" fill="#1e1035"/>
        <line x1="-4000" y1="720" x2="6000" y2="720" stroke="#e879f9" stroke-width="6"/>
        <!-- 3D Grid Perspective -->
        <g stroke="#c084fc" stroke-width="3" opacity="0.6">
          <line x1="960" y1="720" x2="-200" y2="1080"/>
          <line x1="960" y1="720" x2="380" y2="1080"/>
          <line x1="960" y1="720" x2="960" y2="1080"/>
          <line x1="960" y1="720" x2="1540" y2="1080"/>
          <line x1="960" y1="720" x2="2120" y2="1080"/>
        </g>
        <!-- Retro Character Creator UI Header -->
        <g transform="translate(960, 180)">
          <rect x="-420" y="-40" width="840" height="80" rx="12" fill="#2e1065" stroke="#a855f7" stroke-width="6"/>
          <text x="0" y="14" font-family="'Courier New', monospace" font-size="32" font-weight="bold" fill="#f0abfc" text-anchor="middle">
            SELECT BODY TYPE: [PS1_RETRO]
          </text>
        </g>
      `;

    // 9. Victorian Gothic Drawing Room
    case "BG-GOTHIC":
      return `
        <rect x="-4000" y="-4000" width="10000" height="10000" fill="#270a14"/>
        <!-- Heavy Gothic Burgundy Drapery -->
        <g fill="#450a0a" stroke="#1c0404" stroke-width="8">
          <path d="M 100 -200 Q 200 400 350 740 L 0 740 L 0 -200 Z"/>
          <path d="M 1820 -200 Q 1720 400 1570 740 L 1920 740 L 1920 -200 Z"/>
        </g>
        <!-- Arched Victorian Window with Gloomy Moonlight -->
        <g transform="translate(960, 420)">
          <path d="M -160 220 L -160 -100 C -160 -240 160 -240 160 -100 L 160 220 Z" fill="#1e293b" stroke="#0f172a" stroke-width="12"/>
          <path d="M -140 200 L -140 -90 C -140 -210 140 -210 140 -90 L 140 200 Z" fill="#475569" opacity="0.6"/>
          <line x1="0" y1="-210" x2="0" y2="200" stroke="#0f172a" stroke-width="8"/>
          <line x1="-140" y1="0" x2="140" y2="0" stroke="#0f172a" stroke-width="8"/>
        </g>
        <!-- Polished Dark Mahogany Floor -->
        <rect x="-4000" y="740" width="10000" height="4000" fill="#1c0a00"/>
        <line x1="-4000" y1="740" x2="6000" y2="740" stroke="#451a03" stroke-width="6"/>
      `;

    // 10. TikTok Forensic Courtroom Tribunal
    case "BG-TRIBUNAL":
      return `
        <rect x="-4000" y="-4000" width="10000" height="10000" fill="#0f172a"/>
        <!-- Courtroom Mahogany Wall Paneling -->
        <rect x="200" y="220" width="1520" height="520" fill="#1e1b18" stroke="#3e2723" stroke-width="10"/>
        <!-- Elevated Judge's Bench (Stage Right) -->
        <g transform="translate(1420, 620)">
          <rect x="-220" y="-120" width="440" height="240" rx="12" fill="#3e2723" stroke="#1b0000" stroke-width="8"/>
          <text x="0" y="-60" font-family="'Impact', sans-serif" font-size="24" fill="#facc15" text-anchor="middle">TIKTOK TRIBUNAL</text>
          <!-- Sound Block -->
          <rect x="-60" y="-10" width="120" height="25" rx="4" fill="#5d4037" stroke="#271406" stroke-width="4"/>
        </g>
        <!-- Courtroom Floor -->
        <rect x="-4000" y="740" width="10000" height="4000" fill="#0c0a09"/>
        <line x1="-4000" y1="740" x2="6000" y2="740" stroke="#44403c" stroke-width="6"/>
      `;

    // 11. Silicon Valley Startup Office
    case "BG-OFFICE":
      return `
        <rect x="-4000" y="-4000" width="10000" height="10000" fill="#f8fafc"/>
        <rect x="-4000" y="740" width="10000" height="4000" fill="#e2e8f0"/>
        <line x1="-4000" y1="740" x2="6000" y2="740" stroke="#cbd5e1" stroke-width="6"/>
        <!-- Startup Whiteboard with Crypto -> AI Pivot Chart (Left) -->
        <g transform="translate(380, 480)">
          <rect x="-180" y="-140" width="360" height="240" rx="8" fill="#ffffff" stroke="#94a3b8" stroke-width="6" filter="url(#cardShadow)"/>
          <text x="0" y="-90" font-family="'Impact', sans-serif" font-size="22" fill="#0f172a" text-anchor="middle">PIVOT ROADMAP</text>
          <text x="-90" y="-40" font-family="sans-serif" font-size="16" font-weight="bold" fill="#ef4444">2021: CRYPTO</text>
          <path d="M -90 -20 L -30 -20 L -30 20 L 40 20" fill="none" stroke="#64748b" stroke-width="4" marker-end="url(#arrow)"/>
          <text x="60" y="25" font-family="sans-serif" font-size="18" font-weight="bold" fill="#10b981">2024: AI 🚀</text>
        </g>
        <!-- Modern Standing Desk & Dual Monitors (Right) -->
        <g transform="translate(1440, 600)">
          <!-- Desk Top -->
          <rect x="-180" y="-20" width="360" height="24" rx="4" fill="#334155" stroke="#0f172a" stroke-width="4"/>
          <!-- Metal Legs -->
          <line x1="-150" y1="4" x2="-150" y2="160" stroke="#0f172a" stroke-width="12"/>
          <line x1="150" y1="4" x2="150" y2="160" stroke="#0f172a" stroke-width="12"/>
          <!-- Curved Dual Monitors -->
          <rect x="-160" y="-140" width="150" height="110" rx="6" fill="#0f172a" stroke="#38bdf8" stroke-width="4"/>
          <rect x="10" y="-140" width="150" height="110" rx="6" fill="#0f172a" stroke="#22c55e" stroke-width="4"/>
        </g>
      `;

    // 12. Extreme Meal Prep Kitchen
    case "BG-KITCHEN":
      return `
        <rect x="-4000" y="-4000" width="10000" height="10000" fill="#f1f5f9"/>
        <rect x="-4000" y="740" width="10000" height="4000" fill="#cbd5e1"/>
        <line x1="-4000" y1="740" x2="6000" y2="740" stroke="#94a3b8" stroke-width="6"/>
        <!-- Double Door Fridge Plastered with Strict Meal Plans -->
        <g transform="translate(420, 520)">
          <rect x="-140" y="-220" width="280" height="440" rx="16" fill="#94a3b8" stroke="#475569" stroke-width="8"/>
          <line x1="0" y1="-220" x2="0" y2="220" stroke="#475569" stroke-width="6"/>
          <!-- Magnetic Diet Plan Sheets -->
          <rect x="-110" y="-160" width="90" height="120" fill="#ffffff" stroke="#ef4444" stroke-width="3"/>
          <text x="-65" y="-130" font-family="'Impact', sans-serif" font-size="12" fill="#ef4444" text-anchor="middle">WEEK 1</text>
          <text x="-65" y="-105" font-family="sans-serif" font-size="9" fill="#0f172a" text-anchor="middle">CHICKEN</text>
          <text x="-65" y="-90" font-family="sans-serif" font-size="9" fill="#0f172a" text-anchor="middle">BROCCOLI</text>
          <text x="-65" y="-75" font-family="sans-serif" font-size="9" fill="#0f172a" text-anchor="middle">WATER</text>
        </g>
        <!-- Kitchen Counter & Meal Containers -->
        <g transform="translate(1380, 640)">
          <rect x="-240" y="-40" width="480" height="160" rx="8" fill="#ffffff" stroke="#64748b" stroke-width="6"/>
          <!-- Stacked Glass Prep Containers -->
          <rect x="-180" y="-75" width="80" height="35" rx="4" fill="#e0f2fe" stroke="#0284c7" stroke-width="3"/>
          <rect x="-180" y="-115" width="80" height="35" rx="4" fill="#e0f2fe" stroke="#0284c7" stroke-width="3"/>
          <rect x="-80" y="-75" width="80" height="35" rx="4" fill="#e0f2fe" stroke="#0284c7" stroke-width="3"/>
        </g>
      `;

    // 13. Cinema Audience Perspective
    case "BG-AUDIENCE":
      return `
        <rect x="-4000" y="-4000" width="10000" height="10000" fill="#050811"/>
        <!-- Cinema Screen in Upper Half -->
        <rect x="360" y="160" width="1200" height="480" rx="14" fill="#f8fafc" opacity="0.9" filter="url(#glow)"/>
        <!-- Audience Row Silhouettes in Foreground -->
        <rect x="-4000" y="700" width="10000" height="4000" fill="#020617"/>
        <g fill="#090d16">
          <circle cx="300" cy="740" r="45"/>
          <circle cx="560" cy="730" r="48"/>
          <circle cx="820" cy="745" r="44"/>
          <circle cx="1100" cy="735" r="46"/>
          <circle cx="1380" cy="740" r="48"/>
          <circle cx="1640" cy="730" r="45"/>
        </g>
      `;

    // 14. Minimal YouTube End-Card Stage
    case "BG-END":
      return `
        <rect x="-4000" y="-4000" width="10000" height="10000" fill="#0f172a"/>
        <rect x="-4000" y="760" width="10000" height="4000" fill="#020617"/>
        <line x1="-4000" y1="760" x2="6000" y2="760" stroke="#334155" stroke-width="6"/>
        <!-- Video Card Frame Left -->
        <g transform="translate(560, 420)">
          <rect x="-240" y="-140" width="480" height="280" rx="16" fill="#1e293b" stroke="#3b82f6" stroke-width="6"/>
          <text x="0" y="10" font-family="'Impact', sans-serif" font-size="28" fill="#ffffff" text-anchor="middle">PREVIOUS VIDEO</text>
        </g>
        <!-- Subscribe Card Frame Right -->
        <g transform="translate(1360, 420)">
          <rect x="-240" y="-140" width="480" height="280" rx="16" fill="#1e293b" stroke="#ef4444" stroke-width="6"/>
          <circle cx="0" cy="-20" r="45" fill="#dc2626"/>
          <polygon points="-12,-35 18,-20 -12,-5" fill="#ffffff"/>
          <text x="0" y="60" font-family="'Impact', sans-serif" font-size="26" fill="#ffffff" text-anchor="middle">SUBSCRIBE</text>
        </g>
      `;

    // 15. City Park Morning: the contested bench on a protest-ready lawn
    case "BG-PARK": {
      const sway = Math.sin(t * 0.9) * 6;
      return `
        <rect x="-4000" y="-4000" width="10000" height="10000" fill="#bae6fd"/>
        <circle cx="1560" cy="180" r="90" fill="#fde047" stroke="#f59e0b" stroke-width="6"/>
        <path d="M -1000 560 Q 400 420 1200 540 T 3000 500 L 3000 740 L -1000 740 Z" fill="#86efac"/>
        <g opacity="0.9">
          <rect x="180" y="380" width="36" height="360" fill="#92400e"/>
          <circle cx="198" cy="320" r="110" fill="#16a34a"/>
          <circle cx="130" cy="360" r="70" fill="#22c55e"/>
          <circle cx="266" cy="360" r="70" fill="#15803d"/>
          <rect x="1620" y="400" width="36" height="340" fill="#92400e"/>
          <circle cx="1638" cy="340" r="100" fill="#16a34a"/>
        </g>
        <rect x="-4000" y="740" width="10000" height="4000" fill="#4ade80"/>
        <line x1="-4000" y1="740" x2="6000" y2="740" stroke="#16a34a" stroke-width="4"/>
        <!-- The contested bench -->
        <g transform="translate(960 ${740 + sway * 0.2})">
          <rect x="-220" y="-70" width="440" height="26" rx="10" fill="#92400e" stroke="#451a03" stroke-width="5"/>
          <rect x="-220" y="-20" width="440" height="26" rx="10" fill="#a16207" stroke="#451a03" stroke-width="5"/>
          <rect x="-190" y="6" width="24" height="120" fill="#451a03"/>
          <rect x="166" y="6" width="24" height="120" fill="#451a03"/>
          <rect x="-220" y="-190" width="26" height="130" rx="10" fill="#92400e" stroke="#451a03" stroke-width="5"/>
        </g>
        <ellipse cx="320" cy="900" rx="200" ry="40" fill="#38bdf8" opacity="0.7"/>
      `;
    }
  }
}

export interface RoomBeat {
  id: string;
  start: number;
  end: number;
  role: string;
  semantic: string;
}

/** Keyword room for one beat's sentence, or null when it names no room. */
export function keywordRoom(text: string): BackgroundId | null {
  const x = text.toLowerCase();
  if (/\b(gym|workout|bodybuilder|janitor|deadlift|barbell|weights|cleaning|mop|plates|fitness|squat|bench)\b/.test(x)) return "BG-GYM";
  if (/\b(hollywood|red carpet|celebrity|oscar|actor|movie|premiere)\b/.test(x)) return "BG-HOLLYWOOD";
  if (/\b(office|tech|computer|crypto|code|browser|cubicle|boss|saas)\b/.test(x)) return "BG-OFFICE";
  if (/\b(clinic|doctor|surgery|medicine|shot|buccal|botox|contour)\b/.test(x)) return "BG-CLINIC";
  if (/\b(court|judge|tribunal|trial|law|lawsuit)\b/.test(x)) return "BG-TRIBUNAL";
  if (/\b(retro|ps1|videogame|gaming)\b/.test(x)) return "BG-RETRO";
  if (/\b(subscribe|outro|end)\b/.test(x)) return "BG-END";
  return null;
}

/** Roles where a new room may be established (a new setup = a new place). */
const ROOM_CHANGE_ROLES = new Set(["setup", "explanation", "transition"]);

/**
 * Stable rooms: one background per beat, computed over the whole beat list.
 * A joke keeps its setup room through escalation and punchline even when
 * the punchline names a foreign keyword ("tech bro pivoting to crypto" in a
 * gym joke stays in the gym). The room may only change on setup-family
 * beats; every other beat inherits the running room. Pure function of the
 * beats: chunked rendering stays bit-exact.
 */
export function stabilizeBeatBackgrounds(
  beats: readonly RoomBeat[],
  fallback: BackgroundId | string = "BG-STUDIO",
): Record<string, string> {
  const out: Record<string, string> = {};
  const ordered = [...beats].sort((a, b) => a.start - b.start);
  let room: string = fallback;
  let started = false;
  for (const b of ordered) {
    const named = keywordRoom(b.semantic);
    if (!started) {
      room = named ?? fallback;
      started = true;
    } else if (named && named !== room && ROOM_CHANGE_ROLES.has(b.role)) {
      room = named;
    }
    out[b.id] = room;
  }
  return out;
}

/**
 * Act 2 Scene 28 (220.63–239.59s): act2-s28-brains-are-stupid
 * "Our brains are stupid at estimating strength. 200kg looks heavy. 300kg also looks heavy.
 * Brain goes: 'Yes, that is definitely a lot of kilograms.'"
 * Overheated smoking cartoon brain with gears between 200kg and 300kg barbells.
 */
import { renderBackground } from "../../src/assets/BackgroundLibrary.js";
import {
  host, barbell,
} from "./shared.js";
import {
  keyframedCamera,
  type AuthoredScene,
} from "../../src/authored/AuthoredScene.js";

export const S_START = 220.63;
export const S_END = 239.59;

function renderWorld(t: number): string {
  const smokePuff = Math.sin(t * 5) * 10;
  return (
    renderBackground("BG-STUDIO", { timeSec: t }) +
    // Left: 200 KG Barbell
    `<g transform="translate(480, 580)">
      <rect x="-80" y="-120" width="160" height="40" rx="8" fill="#0f172a" stroke="#38bdf8" stroke-width="4"/>
      <text x="0" y="-92" font-family="'Impact', sans-serif" font-size="24" fill="#38bdf8" text-anchor="middle">200 KG: HEAVY</text>
    </g>` +
    barbell(480, 680, 1.2) +
    // Right: 300 KG Barbell
    `<g transform="translate(1440, 580)">
      <rect x="-100" y="-120" width="200" height="40" rx="8" fill="#0f172a" stroke="#ef4444" stroke-width="4"/>
      <text x="0" y="-92" font-family="'Impact', sans-serif" font-size="24" fill="#ef4444" text-anchor="middle">300 KG: ALSO HEAVY</text>
    </g>` +
    barbell(1440, 680, 1.5) +
    // Center: Smoking cartoon brain with rusty gears
    `<g transform="translate(960, 420)">
      <!-- Brain lobes -->
      <path d="M -60 -40 C -80 -70 -20 -90 0 -50 C 20 -90 80 -70 60 -40 C 90 -10 80 50 40 50 C 20 60 -20 60 -40 50 C -80 50 -90 -10 -60 -40 Z" fill="#f43f5e" stroke="#0f172a" stroke-width="5"/>
      <!-- Internal gear -->
      <circle cx="0" cy="0" r="22" fill="#334155" stroke="#0f172a" stroke-width="3"/>
      <!-- Smoke puff from overheating -->
      <ellipse cx="${smokePuff.toFixed(1)}" cy="-80" rx="20" ry="12" fill="#94a3b8" opacity="0.6"/>
      <ellipse cx="${(-smokePuff).toFixed(1)}" cy="-105" rx="30" ry="16" fill="#cbd5e1" opacity="0.4"/>
      <!-- Thought bubble conclusion -->
      <g transform="translate(0, 110)">
        <rect x="-160" y="-25" width="320" height="50" rx="10" fill="#ffffff" stroke="#0f172a" stroke-width="4"/>
        <text x="0" y="8" font-family="'Impact', sans-serif" font-size="20" fill="#0f172a" text-anchor="middle">"A LOT OF KILOGRAMS"</text>
      </g>
    </g>` +
    // Host explaining on the side
    host(960, 720, t, {
      expression: "deadpan_classic",
      spineLean: -2,
    })
  );
}

const baseCamera = keyframedCamera([
  { at: 220.63, x: 960, y: 540, zoom: 1.15 },
  { at: 231.67, x: 480, y: 580, zoom: 1.35 },
  { at: 234.87, x: 1440, y: 580, zoom: 1.35 },
  // Instant punch zoom to smoking brain on "a lot of kilograms" (237.95s)
  { at: 237.95, x: 960, y: 460, zoom: 1.65 },
  { at: 239.59, x: 960, y: 460, zoom: 1.67 },
]);

export const scene: AuthoredScene = {
  id: "act2-s28-brains-are-stupid",
  start: S_START,
  end: S_END,
  intent: "Overheated smoking cartoon brain with gears trying to process 200kg vs 300kg strength estimations.",
  renderWorld,
  camera: baseCamera,
};

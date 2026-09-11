/**
 * Act 2 Scene 17 (107.87–116.90s): act2-s17-powerlifter-vs-editor
 * Real powerlifting background vs random guy with video editing software.
 * Left: Anatoly on competition podium with gold medal.
 * Right: Scrawny editor at desk with laptop video timeline.
 */
import { renderBackground } from "../../src/assets/BackgroundLibrary.js";
import {
  janitor, host, barbell, card,
} from "./shared.js";
import {
  keyframedCamera,
  type AuthoredScene,
} from "../../src/authored/AuthoredScene.js";

export const S_START = 107.87;
export const S_END = 116.90;

function renderWorld(t: number): string {
  return (
    renderBackground("BG-STUDIO", { timeSec: t }) +
    // Left side: Powerlifting Champion Podium
    `<g transform="translate(540, 680)">
      <!-- Podium Block #1 -->
      <rect x="-100" y="-120" width="200" height="120" fill="#1e293b" stroke="#facc15" stroke-width="6"/>
      <text x="0" y="-45" font-family="'Impact', sans-serif" font-size="54" fill="#facc15" text-anchor="middle">1</text>
    </g>` +
    // Anatoly in competition outfit with gold medal
    janitor(540, 560, t, {
      expression: "smug_rock_eyebrow",
      rightHandProp: "none",
    }) +
    `<g transform="translate(540, 500)">
      <!-- Gold Medal Ribbon -->
      <line x1="-15" y1="-20" x2="0" y2="10" stroke="#dc2626" stroke-width="4"/>
      <line x1="15" y1="-20" x2="0" y2="10" stroke="#dc2626" stroke-width="4"/>
      <!-- Gold Medal -->
      <circle cx="0" cy="18" r="14" fill="#facc15" stroke="#ca8a04" stroke-width="3"/>
      <text x="0" y="23" font-family="sans-serif" font-size="10" font-weight="bold" fill="#713f12" text-anchor="middle">★</text>
    </g>` +
    // Right side: Video Editor Desk
    `<g transform="translate(1380, 640)">
      <!-- Desk -->
      <rect x="-120" y="0" width="240" height="20" rx="4" fill="#334155"/>
      <line x1="-90" y1="20" x2="-90" y2="100" stroke="#1e293b" stroke-width="8"/>
      <line x1="90" y1="20" x2="90" y2="100" stroke="#1e293b" stroke-width="8"/>
      <!-- Laptop Screen with Timeline -->
      <polygon points="-80,0 80,0 70,-90 -70,-90" fill="#0f172a" stroke="#64748b" stroke-width="3"/>
      <rect x="-60" y="-80" width="120" height="50" fill="#1e1b4b"/>
      <!-- Video Editing Timeline Tracks -->
      <rect x="-55" y="-72" width="110" height="8" rx="2" fill="#38bdf8"/>
      <rect x="-55" y="-60" width="70" height="8" rx="2" fill="#818cf8"/>
      <rect x="-55" y="-48" width="95" height="8" rx="2" fill="#f43f5e"/>
    </g>` +
    host(1380, 652, t, {
      expression: "skeptical_side_eye",
      scale: 1.1,
    })
  );
}

const baseCamera = keyframedCamera([
  { at: 107.87, x: 540, y: 520, zoom: 1.35 },
  { at: 113.50, x: 960, y: 540, zoom: 1.15 },
  // Instant snap zoom to editor at 114.62
  { at: 114.62, x: 1380, y: 540, zoom: 1.75 },
  { at: 116.90, x: 1380, y: 540, zoom: 1.78 },
]);

export const scene: AuthoredScene = {
  id: "act2-s17-powerlifter-vs-editor",
  start: S_START,
  end: S_END,
  intent: "Real Ukrainian powerlifting background contrasted with scrawny guy running video editing software.",
  renderWorld,
  camera: baseCamera,
};

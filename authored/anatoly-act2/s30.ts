/**
 * Act 2 Scene 30 (251.38–266.11s): act2-s30-plate-investigation
 * "The internet has a special relationship with fake weights... and then the investigation begins."
 * Police caution tape across gym barbell, flashing blue/red lights, host detective with magnifying glass.
 */
import { renderBackground } from "../../src/assets/BackgroundLibrary.js";
import {
  host, barbell,
} from "./shared.js";
import {
  keyframedCamera,
  type AuthoredScene,
} from "../../src/authored/AuthoredScene.js";

export const S_START = 251.38;
export const S_END = 266.11;

function renderWorld(t: number): string {
  const flashRed = Math.sin(t * 10) > 0;
  return (
    renderBackground("BG-GYM", { timeSec: t }) +
    // Crime Scene Caution Tape across barbell
    `<g transform="translate(960, 620) rotate(-6)">
      <rect x="-400" y="-18" width="800" height="36" fill="#facc15" stroke="#ca8a04" stroke-width="3"/>
      <text x="-250" y="8" font-family="'Impact', sans-serif" font-size="20" fill="#0f172a">CRIME SCENE: DO NOT CROSS</text>
      <text x="120" y="8" font-family="'Impact', sans-serif" font-size="20" fill="#0f172a">EVIDENCE #45</text>
    </g>` +
    barbell(960, 660, 1.4) +
    // Flashing Emergency Siren in corner
    `<g transform="translate(1500, 260)">
      <circle cx="0" cy="0" r="35" fill="${flashRed ? "#ef4444" : "#3b82f6"}" filter="drop-shadow(0 0 25px ${flashRed ? "#ef4444" : "#3b82f6"})"/>
      <rect x="-25" y="25" width="50" height="20" rx="4" fill="#1e293b"/>
    </g>` +
    // Host detective on left inspecting with magnifying glass
    host(560, 652, t, {
      expression: "skeptical_side_eye",
      scale: 1.2,
      pointTarget: { x: 850, y: 640 },
    }) +
    // Giant Magnifying Glass over the bumper plate
    `<g transform="translate(850, 640)">
      <circle cx="0" cy="0" r="55" fill="#38bdf8" opacity="0.3" stroke="#cbd5e1" stroke-width="8"/>
      <line x1="40" y1="40" x2="85" y2="85" stroke="#78716c" stroke-width="14" stroke-linecap="round"/>
      <!-- Dotted forensic crosshair inside glass -->
      <circle cx="0" cy="0" r="30" fill="none" stroke="#ef4444" stroke-width="3" stroke-dasharray="8 6"/>
    </g>`
  );
}

const baseCamera = keyframedCamera([
  { at: 251.38, x: 960, y: 540, zoom: 1.15 },
  { at: 261.05, x: 960, y: 540, zoom: 1.25 },
  // Instant snap zoom to magnifying glass investigation at 264.01s
  { at: 264.01, x: 850, y: 600, zoom: 1.75 },
  { at: 266.11, x: 850, y: 600, zoom: 1.77 },
]);

export const scene: AuthoredScene = {
  id: "act2-s30-plate-investigation",
  start: S_START,
  end: S_END,
  intent: "Crime scene tape and flashing siren over barbell as detective host inspects plate with magnifying glass.",
  renderWorld,
  camera: baseCamera,
};

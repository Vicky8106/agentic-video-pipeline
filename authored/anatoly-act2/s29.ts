/**
 * Act 2 Scene 29 (239.59–251.38s): act2-s29-fix-the-ac
 * "Anatoly lifts it dressed like he is here to fix the air conditioning.
 * Brain encounters something it doesn't understand: 'FAKE WEIGHTS!'"
 * Broken AC unit on wall with duct tape. Anatoly lifts barbell. Big red FAKE WEIGHTS stamp.
 */
import { renderBackground } from "../../src/assets/BackgroundLibrary.js";
import {
  janitor, barbell, acUnitWithDuctTape, dust,
} from "./shared.js";
import {
  keyframedCamera,
  type AuthoredScene,
} from "../../src/authored/AuthoredScene.js";

export const S_START = 239.59;
export const S_END = 251.38;

function renderWorld(t: number): string {
  const lift = Math.min(1, Math.max(0, (t - 242.0) * 1.5));
  const barY = 660 - lift * 120;
  const showStamp = t >= 250.0;
  return (
    renderBackground("BG-GYM", { timeSec: t }) +
    // AC Wall unit overhead
    acUnitWithDuctTape(960, 240) +
    // Barbell being lifted
    barbell(960, barY, 1.4) +
    // Anatoly lifting it like an AC repairman
    janitor(960, 652, t, {
      expression: "deadpan_classic",
      rightHandProp: "none",
    }) +
    // Red rubber stamp: FAKE WEIGHTS!
    (showStamp ? `
      <g transform="translate(960, 480) rotate(-14) scale(1.3)">
        <rect x="-180" y="-50" width="360" height="100" rx="14" fill="none" stroke="#ef4444" stroke-width="12"/>
        <rect x="-170" y="-42" width="340" height="84" fill="#ef4444" opacity="0.15"/>
        <text x="0" y="18" font-family="'Impact', sans-serif" font-size="52" fill="#ef4444" text-anchor="middle">FAKE WEIGHTS</text>
      </g>
    ` : "")
  );
}

const baseCamera = keyframedCamera([
  { at: 239.59, x: 960, y: 540, zoom: 1.15 },
  { at: 246.81, x: 960, y: 540, zoom: 1.25 },
  // Instant snap zoom on "FAKE WEIGHTS" stamp at 250.17s
  { at: 250.17, x: 960, y: 480, zoom: 1.75 },
  { at: 251.38, x: 960, y: 480, zoom: 1.77 },
]);

export const scene: AuthoredScene = {
  id: "act2-s29-fix-the-ac",
  start: S_START,
  end: S_END,
  intent: "Anatoly in AC repair disguise lifts barbell with one pinky finger, triggering massive red FAKE WEIGHTS stamp.",
  renderWorld,
  camera: baseCamera,
};

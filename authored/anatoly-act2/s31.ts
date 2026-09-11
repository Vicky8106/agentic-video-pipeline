/**
 * Act 2 Scene 31 (266.11–273.95s): act2-s31-the-truth-about-anatoly
 * "Comparing logos, comparing to plates from another gym...
 * then someone makes a 40-minute video: 'THE TRUTH ABOUT ANATOLY'S WEIGHTS'."
 * Plate comparison morphing into giant 40:00 documentary thumbnail with red arrow.
 */
import { renderBackground } from "../../src/assets/BackgroundLibrary.js";
import {
  host, card, clickbaitArrow,
} from "./shared.js";
import {
  keyframedCamera,
  type AuthoredScene,
} from "../../src/authored/AuthoredScene.js";

export const S_START = 266.11;
export const S_END = 273.95;

function renderWorld(t: number): string {
  const isVideo = t >= 271.00;
  return (
    renderBackground("BG-STUDIO", { timeSec: t }) +
    (!isVideo ? `
      <!-- Split comparison of two plates -->
      <g transform="translate(640, 480)">
        <circle cx="0" cy="0" r="90" fill="#1e293b" stroke="#38bdf8" stroke-width="8"/>
        <text x="0" y="8" font-family="'Impact', sans-serif" font-size="28" fill="#38bdf8" text-anchor="middle">GYM A</text>
      </g>
      <g transform="translate(1280, 480)">
        <circle cx="0" cy="0" r="95" fill="#18181b" stroke="#ef4444" stroke-width="8" stroke-dasharray="14 8"/>
        <text x="0" y="8" font-family="'Impact', sans-serif" font-size="28" fill="#ef4444" text-anchor="middle">GYM B</text>
      </g>
      <!-- Comparison arrow -->
      <g transform="translate(960, 480)">
        <line x1="-120" y1="0" x2="120" y2="0" stroke="#facc15" stroke-width="6" stroke-dasharray="8 6"/>
        <text x="0" y="-20" font-family="'Impact', sans-serif" font-size="24" fill="#facc15" text-anchor="middle">DIFF = 3.2mm?!</text>
      </g>
    ` : `
      <!-- 40-Minute Video Mockup -->
      <g transform="translate(960, 460)">
        <rect x="-320" y="-180" width="640" height="360" rx="16" fill="#09090b" stroke="#ef4444" stroke-width="8"/>
        <!-- Video thumbnail graphic -->
        <rect x="-300" y="-160" width="600" height="240" fill="#1e1b4b"/>
        <!-- Video length tag: 40:00 -->
        <rect x="180" y="30" width="100" height="35" rx="4" fill="#000000" opacity="0.85"/>
        <text x="230" y="55" font-family="'Impact', sans-serif" font-size="22" fill="#ffffff" text-anchor="middle">40:00</text>
        <!-- Clickbait headline -->
        <text x="0" y="130" font-family="'Impact', sans-serif" font-size="32" fill="#facc15" text-anchor="middle">THE TRUTH ABOUT ANATOLY'S WEIGHTS</text>
        <!-- Giant red clickbait arrow -->
        <g transform="translate(100, -40) rotate(-25)">
          ${clickbaitArrow(0, 0, 1.4)}
        </g>
      </g>
    `) +
    // Host on left
    host(420, 680, t, {
      expression: isVideo ? "deadpan_classic" : "skeptical_side_eye",
    })
  );
}

const baseCamera = keyframedCamera([
  { at: 266.11, x: 960, y: 540, zoom: 1.15 },
  { at: 270.99, x: 960, y: 540, zoom: 1.25 },
  // Instant punch zoom to the 40:00 video thumbnail at 271.00s
  { at: 271.00, x: 960, y: 460, zoom: 1.65 },
  { at: 273.95, x: 960, y: 460, zoom: 1.68 },
]);

export const scene: AuthoredScene = {
  id: "act2-s31-the-truth-about-anatoly",
  start: S_START,
  end: S_END,
  intent: "Barbell plate comparison morphing into a 40-minute exposé documentary thumbnail with clickbait red arrow.",
  renderWorld,
  camera: baseCamera,
};

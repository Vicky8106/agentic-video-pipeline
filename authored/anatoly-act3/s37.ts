/**
 * Act 3 Scene 37 (346.38–359.49s): act3-s37
 * Credibility economy in fitness: selling appearance as expertise. Muscular = knows muscle, shredded = knows nutrition.
 */
import { renderBackground } from "../../src/assets/BackgroundLibrary.js";
import {
  host, janitor, builder, suit, drMike, barbell, dust, clickbaitArrow,
  newsDesk, forensicBrush, guy1995, wizardFigure, giantExposedThumbnail, billboardRig,
  drMikeCaricature, speechBubble,
} from "./shared.js";
import {
  keyframedCamera,
  withPunch,
  smooth,
  span,
  lerp,
  type AuthoredScene,
} from "../../src/authored/AuthoredScene.js";

export const S_START = 346.38;
export const S_END = 359.49;

function renderWorld(t: number): string {
  return (
    renderBackground("BG-STUDIO", { timeSec: t }) +
    `<g transform="translate(600, 480)">
      <rect x="-140" y="-80" width="280" height="160" rx="10" fill="#0f172a" stroke="#22c55e" stroke-width="4"/>
      <text x="0" y="-15" font-family="'Impact', sans-serif" font-size="24" fill="#22c55e" text-anchor="middle">MUSCULAR</text>
      <text x="0" y="30" font-family="sans-serif" font-size="16" fill="#ffffff" text-anchor="middle">= Knows Everything</text>
    </g>` +
    builder(1360, 640, t, { expression: "smug_rock_eyebrow" }) +
    host(960, 700, t, { expression: "skeptical_side_eye" })
  );
}
const baseCamera = keyframedCamera([
  { at: 346.38, x: 960, y: 540, zoom: 1.15 },
  { at: 356.61, x: 600, y: 480, zoom: 1.40 },
  { at: 359.49, x: 960, y: 540, zoom: 1.25 },
]);

export const scene: AuthoredScene = {
  id: "act3-s37",
  start: S_START,
  end: S_END,
  intent: "Credibility economy in fitness: selling appearance as expertise. Muscular = knows muscle, shredded = knows nutrition.",
  renderWorld,
  camera: baseCamera,
};

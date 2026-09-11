/**
 * Act 3 Scene 33 (286.62–302.26s): act3-s33
 * Athlean-X fake weight controversy: internet transforms into Department of Weight Plate Forensics.
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

export const S_START = 286.62;
export const S_END = 302.26;

function renderWorld(t: number): string {
  return (
    renderBackground("BG-STUDIO", { timeSec: t }) +
    `<g transform="translate(960, 220)">
      <rect x="-240" y="-40" width="480" height="80" rx="10" fill="#0f172a" stroke="#38bdf8" stroke-width="6"/>
      <text x="0" y="12" font-family="'Impact', sans-serif" font-size="28" fill="#38bdf8" text-anchor="middle">DEPT. OF WEIGHT PLATE FORENSICS</text>
    </g>` +
    barbell(960, 640, 1.4) +
    suit(520, 652, t, { expression: "skeptical_side_eye", pointTarget: { x: 960, y: 600 } }) +
    host(1400, 652, t, { expression: "deadpan_classic" })
  );
}
const baseCamera = keyframedCamera([
  { at: 286.62, x: 960, y: 540, zoom: 1.15 },
  { at: 300.84, x: 960, y: 440, zoom: 1.50 },
  { at: 302.26, x: 960, y: 440, zoom: 1.52 },
]);

export const scene: AuthoredScene = {
  id: "act3-s33",
  start: S_START,
  end: S_END,
  intent: "Athlean-X fake weight controversy: internet transforms into Department of Weight Plate Forensics.",
  renderWorld,
  camera: baseCamera,
};

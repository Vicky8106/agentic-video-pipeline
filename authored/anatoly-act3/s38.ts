/**
 * Act 3 Scene 38 (359.49–374.88s): act3-s38
 * PhD + muscles = wizard. Caricature in wizard hat casting barbell lightning spells.
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

export const S_START = 359.49;
export const S_END = 374.88;

function renderWorld(t: number): string {
  return (
    renderBackground("BG-STUDIO", { timeSec: t }) +
    wizardFigure(960, 560, t) +
    host(460, 652, t, { expression: "deadpan_classic", pointTarget: { x: 960, y: 500 } })
  );
}
const baseCamera = keyframedCamera([
  { at: 359.49, x: 960, y: 540, zoom: 1.15 },
  { at: 370.26, x: 960, y: 500, zoom: 1.35 },
  { at: 373.54, x: 960, y: 460, zoom: 1.80 },
  { at: 374.88, x: 960, y: 460, zoom: 1.82 },
]);

export const scene: AuthoredScene = {
  id: "act3-s38",
  start: S_START,
  end: S_END,
  intent: "PhD + muscles = wizard. Caricature in wizard hat casting barbell lightning spells.",
  renderWorld,
  camera: baseCamera,
};

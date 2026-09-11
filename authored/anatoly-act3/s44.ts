/**
 * Act 3 Scene 44 (457.35–469.45s): act3-s44
 * Gym confrontation: Anatoly walks in, gym bro yells WAIT. ARE YOU ANATOLY?! Prank over.
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

export const S_START = 457.35;
export const S_END = 469.45;

function renderWorld(t: number): string {
  const shout = t >= 466.55;
  return (
    renderBackground("BG-GYM", { timeSec: t }) +
    janitor(620, 652, t, { expression: shout ? "surprised_wide_eyes" : "deadpan_classic" }) +
    builder(1340, 640, t, { expression: "screaming_open_mouth" }) +
    (shout ? speechBubble(1340, 420, "WAIT! ARE YOU ANATOLY?!", 1.2) : "")
  );
}
const baseCamera = keyframedCamera([
  { at: 457.35, x: 960, y: 540, zoom: 1.15 },
  { at: 466.55, x: 1340, y: 480, zoom: 1.70 },
  { at: 469.45, x: 1340, y: 480, zoom: 1.72 },
]);

export const scene: AuthoredScene = {
  id: "act3-s44",
  start: S_START,
  end: S_END,
  intent: "Gym confrontation: Anatoly walks in, gym bro yells WAIT. ARE YOU ANATOLY?! Prank over.",
  renderWorld,
  camera: baseCamera,
};

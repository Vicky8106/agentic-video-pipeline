/**
 * Act 4 Scene 54 (625.48–644.36s): act4-s54
 * Gordon Ramsay analogy: Ramsay pretending he cannot cook while Anatoly lifts your mortgage.
 */
import { renderBackground } from "../../src/assets/BackgroundLibrary.js";
import {
  host, janitor, builder, cameraRig, speechBubble, barbell,
  vintageTelevision, gordonRamsayCaricature, radioactiveForklift, skinnerBoxRat,
} from "./shared.js";
import {
  keyframedCamera,
  withPunch,
  smooth,
  span,
  lerp,
  type AuthoredScene,
} from "../../src/authored/AuthoredScene.js";

export const S_START = 625.48;
export const S_END = 644.36;

function renderWorld(t: number): string {
  return (
    renderBackground("BG-STUDIO", { timeSec: t }) +
    gordonRamsayCaricature(600, 640, t) +
    barbell(1300, 660, 1.4) +
    janitor(1300, 652, t, { expression: "smug_rock_eyebrow" })
  );
}
const baseCamera = keyframedCamera([
  { at: 625.48, x: 960, y: 540, zoom: 1.15 },
  { at: 637.60, x: 600, y: 540, zoom: 1.50 },
  { at: 640.16, x: 1300, y: 540, zoom: 1.50 },
  { at: 644.36, x: 960, y: 540, zoom: 1.25 },
]);

export const scene: AuthoredScene = {
  id: "act4-s54",
  start: S_START,
  end: S_END,
  intent: "Gordon Ramsay analogy: Ramsay pretending he cannot cook while Anatoly lifts your mortgage.",
  renderWorld,
  camera: baseCamera,
};

/**
 * Act 4 Scene 59 (728.01–750.00s): act4-s59
 * YouTube lab rats: trained in a Skinner box pressing the button to watch a man deadlift.
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

export const S_START = 728.01;
export const S_END = 750.00;

function renderWorld(t: number): string {
  return (
    renderBackground("BG-STUDIO", { timeSec: t }) +
    skinnerBoxRat(960, 500, t) +
    host(440, 680, t, { expression: "deadpan_classic", pointTarget: { x: 960, y: 500 } })
  );
}
const baseCamera = keyframedCamera([
  { at: 728.01, x: 960, y: 540, zoom: 1.15 },
  { at: 740.47, x: 960, y: 480, zoom: 1.65 },
  { at: 750.00, x: 960, y: 480, zoom: 1.67 },
]);

export const scene: AuthoredScene = {
  id: "act4-s59",
  start: S_START,
  end: S_END,
  intent: "YouTube lab rats: trained in a Skinner box pressing the button to watch a man deadlift.",
  renderWorld,
  camera: baseCamera,
};

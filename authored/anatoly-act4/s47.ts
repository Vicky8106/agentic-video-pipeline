/**
 * Act 4 Scene 47 (497.32–516.13s): act4-s47
 * Manufacturing spontaneity: audience discovers television. Vintage 1950s TV set with rabbit ears.
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

export const S_START = 497.32;
export const S_END = 516.13;

function renderWorld(t: number): string {
  return (
    renderBackground("BG-STUDIO", { timeSec: t }) +
    vintageTelevision(960, 480) +
    host(460, 652, t, { expression: "deadpan_classic", pointTarget: { x: 960, y: 480 } })
  );
}
const baseCamera = keyframedCamera([
  { at: 497.32, x: 960, y: 540, zoom: 1.15 },
  { at: 511.97, x: 960, y: 480, zoom: 1.65 },
  { at: 516.13, x: 960, y: 480, zoom: 1.67 },
]);

export const scene: AuthoredScene = {
  id: "act4-s47",
  start: S_START,
  end: S_END,
  intent: "Manufacturing spontaneity: audience discovers television. Vintage 1950s TV set with rabbit ears.",
  renderWorld,
  camera: baseCamera,
};

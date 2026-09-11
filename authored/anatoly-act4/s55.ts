/**
 * Act 4 Scene 55 (644.36–662.91s): act4-s55
 * Elite strength vs bitten by a radioactive forklift comic book cover.
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

export const S_START = 644.36;
export const S_END = 662.91;

function renderWorld(t: number): string {
  return (
    renderBackground("BG-STUDIO", { timeSec: t }) +
    radioactiveForklift(960, 480, t) +
    host(460, 680, t, { expression: "deadpan_classic", pointTarget: { x: 960, y: 480 } })
  );
}
const baseCamera = keyframedCamera([
  { at: 644.36, x: 960, y: 540, zoom: 1.15 },
  { at: 655.81, x: 960, y: 460, zoom: 1.65 },
  { at: 662.91, x: 960, y: 460, zoom: 1.67 },
]);

export const scene: AuthoredScene = {
  id: "act4-s55",
  start: S_START,
  end: S_END,
  intent: "Elite strength vs bitten by a radioactive forklift comic book cover.",
  renderWorld,
  camera: baseCamera,
};

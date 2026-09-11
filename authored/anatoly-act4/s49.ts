/**
 * Act 4 Scene 49 (534.62–553.59s): act4-s49
 * Six hours filming just for a guy saying Okay. Exhausted janitor leaning on mop.
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

export const S_START = 534.62;
export const S_END = 553.59;

function renderWorld(t: number): string {
  const isOkay = t >= 547.83;
  return (
    renderBackground("BG-GYM", { timeSec: t }) +
    janitor(560, 652, t, { expression: "deadpan_classic", spineLean: 10 }) +
    builder(1360, 640, t, { expression: "deadpan_classic" }) +
    (isOkay ? speechBubble(1360, 460, "Okay.", 1.2) : "")
  );
}
const baseCamera = keyframedCamera([
  { at: 534.62, x: 960, y: 540, zoom: 1.15 },
  { at: 547.83, x: 1360, y: 500, zoom: 1.70 },
  { at: 553.59, x: 1360, y: 500, zoom: 1.72 },
]);

export const scene: AuthoredScene = {
  id: "act4-s49",
  start: S_START,
  end: S_END,
  intent: "Six hours filming just for a guy saying Okay. Exhausted janitor leaning on mop.",
  renderWorld,
  camera: baseCamera,
};

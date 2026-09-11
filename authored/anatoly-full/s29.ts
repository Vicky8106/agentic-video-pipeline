/**
 * Scene 29 (760.03–788.27s): anatoly-s29-wwe-three-cameras
 * WWE Wrestling reality: Accidental 3-camera setup with hidden wireless lav mic. Coincidence vs Production Schedule.
 */
import { renderBackground } from "../../src/assets/BackgroundLibrary.js";
import {
  host, janitor, builder, suit, drMike, scroller,
  dust, cursor, clickbaitArrow, dottedCircle, cameraRig, barbell,
  crewSil, verdictStage, contrastPanels, thumbFrame, card,
} from "./shared.js";
import {
  keyframedCamera,
  withPunch,
  smooth,
  span,
  lerp,
  type AuthoredScene,
} from "../../src/authored/AuthoredScene.js";

export const S_START = 760.03;
export const S_END = 788.27;

function renderWorld(t: number): string {
  return (
    renderBackground("BG-GYM", { timeSec: t }) +
    host(480, 652, t, { expression: "deadpan_classic", isTalking: true }) +
    janitor(960, 652, t, { expression: "deadpan_classic" }) +
    cameraRig(1350, 580, 1.2)
  );
}

const baseCamera = keyframedCamera([
  { at: S_START, x: 960, y: 560, zoom: 1.1 },
  { at: S_START + 12, x: 1100, y: 550, zoom: 1.35 },
  { at: S_END, x: 1100, y: 550, zoom: 1.38 }
]);

export const scene: AuthoredScene = {
  id: "anatoly-s29-wwe-three-cameras",
  start: S_START,
  end: S_END,
  intent: "WWE Wrestling reality: Accidental 3-camera setup with hidden wireless lav mic. Coincidence vs Production Schedule.",
  renderWorld,
  camera: withPunch(baseCamera, S_START + 0.5, 0.2),
};

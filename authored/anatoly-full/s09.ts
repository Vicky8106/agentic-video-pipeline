/**
 * Scene 09 (225.03–251.17s): anatoly-s09-weight-perception
 * Weight perception illusion: 200kg vs 300kg. To the human eye, both just look like round black circles. Question marks pop as brain short-circuits.
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

export const S_START = 225.03;
export const S_END = 251.17;

function renderWorld(t: number): string {
  return (
    renderBackground("BG-GYM", { timeSec: t }) +
    host(500, 652, t, { expression: "deadpan_classic", isTalking: true }) +
    barbell(950, 660, 1.1) +
    barbell(1350, 660, 1.3) +
    cursor(1150, 460, 1.2, 0)
  );
}

const baseCamera = keyframedCamera([
  { at: S_START, x: 960, y: 560, zoom: 1.08 },
  { at: S_START + 12, x: 1100, y: 550, zoom: 1.32 },
  { at: S_END, x: 1100, y: 550, zoom: 1.35 }
]);

export const scene: AuthoredScene = {
  id: "anatoly-s09-weight-perception",
  start: S_START,
  end: S_END,
  intent: "Weight perception illusion: 200kg vs 300kg. To the human eye, both just look like round black circles. Question marks pop as brain short-circuits.",
  renderWorld,
  camera: withPunch(baseCamera, S_START + 0.5, 0.2),
};

/**
 * Scene 21 (553.00–579.42s): anatoly-s21-staged-vs-fake
 * Staged does not equal Fake: Reality TV comparison. An arranged setup with genuine human surprise.
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

export const S_START = 553.00;
export const S_END = 579.42;

function renderWorld(t: number): string {
  return (
    renderBackground("BG-GYM", { timeSec: t }) +
    host(460, 652, t, { expression: "deadpan_classic", isTalking: true }) +
    janitor(960, 652, t, { expression: "deadpan_classic" }) +
    builder(1380, 650, t, { expression: "shock_jaw_drop" })
  );
}

const baseCamera = keyframedCamera([
  { at: S_START, x: 960, y: 560, zoom: 1.05 },
  { at: S_START + 12, x: 1200, y: 550, zoom: 1.32 },
  { at: S_END, x: 1200, y: 550, zoom: 1.35 }
]);

export const scene: AuthoredScene = {
  id: "anatoly-s21-staged-vs-fake",
  start: S_START,
  end: S_END,
  intent: "Staged does not equal Fake: Reality TV comparison. An arranged setup with genuine human surprise.",
  renderWorld,
  camera: withPunch(baseCamera, S_START + 0.5, 0.2),
};

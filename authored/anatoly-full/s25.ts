/**
 * Scene 25 (657.97–682.55s): anatoly-s25-real-weights-misleading
 * Misleading with 100% real weights: You do not need fake plates to mislead. Cut out the failed attempts, show only the hero lift.
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

export const S_START = 657.97;
export const S_END = 682.55;

function renderWorld(t: number): string {
  return (
    renderBackground("BG-STUDIO", { timeSec: t }) +
    contrastPanels(960, 440, 1.3) +
    host(960, 670, t, { expression: "deadpan_classic", isTalking: true })
  );
}

const baseCamera = keyframedCamera([
  { at: S_START, x: 960, y: 560, zoom: 1.05 },
  { at: S_START + 10, x: 960, y: 560, zoom: 1.25 },
  { at: S_END, x: 960, y: 560, zoom: 1.28 }
]);

export const scene: AuthoredScene = {
  id: "anatoly-s25-real-weights-misleading",
  start: S_START,
  end: S_END,
  intent: "Misleading with 100% real weights: You do not need fake plates to mislead. Cut out the failed attempts, show only the hero lift.",
  renderWorld,
  camera: withPunch(baseCamera, S_START + 0.5, 0.2),
};

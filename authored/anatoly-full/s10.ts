/**
 * Scene 10 (251.17–277.95s): anatoly-s10-youtube-detectives
 * The YouTube detective investigation begins: Accusation pops up, forensic caliper and frame-by-frame zoom on the barbell.
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

export const S_START = 251.17;
export const S_END = 277.95;

function renderWorld(t: number): string {
  return (
    renderBackground("BG-TRIBUNAL", { timeSec: t }) +
    suit(480, 652, t, { expression: "skeptical_side_eye", isTalking: true }) +
    barbell(1200, 640, 1.3) +
    clickbaitArrow(1050, 520, -30, 1.2) +
    dottedCircle(1200, 640, 100, Math.sin(t * 4))
  );
}

const baseCamera = keyframedCamera([
  { at: S_START, x: 960, y: 560, zoom: 1.1 },
  { at: S_START + 12, x: 1200, y: 550, zoom: 1.4 },
  { at: S_END, x: 1200, y: 550, zoom: 1.42 }
]);

export const scene: AuthoredScene = {
  id: "anatoly-s10-youtube-detectives",
  start: S_START,
  end: S_END,
  intent: "The YouTube detective investigation begins: Accusation pops up, forensic caliper and frame-by-frame zoom on the barbell.",
  renderWorld,
  camera: withPunch(baseCamera, S_START + 0.5, 0.2),
};

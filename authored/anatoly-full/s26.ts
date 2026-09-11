/**
 * Scene 26 (682.55–707.65s): anatoly-s26-power-of-editing
 * The Power of Cinematic Editing: Dramatic slow-mo zoom, epic audio waveforms, turning a simple lift into Greek mythology.
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

export const S_START = 682.55;
export const S_END = 707.65;

function renderWorld(t: number): string {
  return (
    renderBackground("BG-GYM", { timeSec: t }) +
    host(480, 652, t, { expression: "smug_rock_eyebrow", isTalking: true }) +
    crewSil(1180, 580, 1.3, "cam", t)
  );
}

const baseCamera = keyframedCamera([
  { at: S_START, x: 960, y: 560, zoom: 1.15 },
  { at: S_START + 12, x: 1200, y: 550, zoom: 1.45 },
  { at: S_END, x: 1200, y: 550, zoom: 1.48 }
]);

export const scene: AuthoredScene = {
  id: "anatoly-s26-power-of-editing",
  start: S_START,
  end: S_END,
  intent: "The Power of Cinematic Editing: Dramatic slow-mo zoom, epic audio waveforms, turning a simple lift into Greek mythology.",
  renderWorld,
  camera: withPunch(baseCamera, S_START + 0.5, 0.2),
};

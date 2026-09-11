/**
 * Scene 13 (332.62–362.13s): anatoly-s13-1995-explainer
 * Explaining fitness YouTube to someone from 1995: 'There is this fitness guy on the internet.' Retro 90s background, confusion.
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

export const S_START = 332.62;
export const S_END = 362.13;

function renderWorld(t: number): string {
  return (
    renderBackground("BG-90S", { timeSec: t }) +
    host(520, 652, t, { expression: "deadpan_classic", isTalking: true }) +
    janitor(1280, 652, t, { expression: "deadpan_classic", pointTarget: { x: 520, y: 500 } })
  );
}

const baseCamera = keyframedCamera([
  { at: S_START, x: 960, y: 560, zoom: 1.08 },
  { at: S_START + 12, x: 960, y: 560, zoom: 1.28 },
  { at: S_END, x: 960, y: 560, zoom: 1.3 }
]);

export const scene: AuthoredScene = {
  id: "anatoly-s13-1995-explainer",
  start: S_START,
  end: S_END,
  intent: "Explaining fitness YouTube to someone from 1995: 'There is this fitness guy on the internet.' Retro 90s background, confusion.",
  renderWorld,
  camera: withPunch(baseCamera, S_START + 0.5, 0.2),
};

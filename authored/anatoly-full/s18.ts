/**
 * Scene 18 (474.73–503.00s): anatoly-s18-billboard-fame
 * Success destroys the condition for success: Sneaking into houses then putting your face on a billboard. Massive Anatoly billboard in gym.
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

export const S_START = 474.73;
export const S_END = 503.00;

function renderWorld(t: number): string {
  return (
    renderBackground("BG-HOLLYWOOD", { timeSec: t }) +
    host(480, 652, t, { expression: "deadpan_classic", isTalking: true }) +
    thumbFrame(1260, 420, 1.4) +
    janitor(1260, 652, t, { expression: "smug_rock_eyebrow" })
  );
}

const baseCamera = keyframedCamera([
  { at: S_START, x: 960, y: 560, zoom: 1.05 },
  { at: S_START + 14, x: 1100, y: 550, zoom: 1.3 },
  { at: S_END, x: 1100, y: 550, zoom: 1.32 }
]);

export const scene: AuthoredScene = {
  id: "anatoly-s18-billboard-fame",
  start: S_START,
  end: S_END,
  intent: "Success destroys the condition for success: Sneaking into houses then putting your face on a billboard. Massive Anatoly billboard in gym.",
  renderWorld,
  camera: withPunch(baseCamera, S_START + 0.5, 0.2),
};

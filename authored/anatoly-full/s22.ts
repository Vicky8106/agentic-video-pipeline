/**
 * Scene 22 (579.42–603.46s): anatoly-s22-illusion-worked
 * The Illusion Succeeded: 'Congratulations, Anatoly, you got millions of people to debate whether your prank is real. That is marketing.'
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

export const S_START = 579.42;
export const S_END = 603.46;

function renderWorld(t: number): string {
  return (
    renderBackground("BG-STUDIO", { timeSec: t }) +
    host(960, 652, t, { expression: "smug_rock_eyebrow", isTalking: true }) +
    card(500, 460, 1.1, "#eab308") +
    card(1420, 460, 1.1, "#22c55e")
  );
}

const baseCamera = keyframedCamera([
  { at: S_START, x: 960, y: 560, zoom: 1.1 },
  { at: S_START + 10, x: 960, y: 560, zoom: 1.32 },
  { at: S_END, x: 960, y: 560, zoom: 1.35 }
]);

export const scene: AuthoredScene = {
  id: "anatoly-s22-illusion-worked",
  start: S_START,
  end: S_END,
  intent: "The Illusion Succeeded: 'Congratulations, Anatoly, you got millions of people to debate whether your prank is real. That is marketing.'",
  renderWorld,
  camera: withPunch(baseCamera, S_START + 0.5, 0.2),
};

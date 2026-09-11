/**
 * Scene 19 (503.00–527.18s): anatoly-s19-prank-sociology
 * Prank sociology: A prank is planned by definition. 'If you announce it, that is a corporate meeting, not a prank.'
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

export const S_START = 503.00;
export const S_END = 527.18;

function renderWorld(t: number): string {
  return (
    renderBackground("BG-STUDIO", { timeSec: t }) +
    host(960, 652, t, { expression: "deadpan_classic", isTalking: true }) +
    card(460, 460, 1.0, "#38bdf8") +
    card(1460, 460, 1.0, "#a855f7")
  );
}

const baseCamera = keyframedCamera([
  { at: S_START, x: 960, y: 560, zoom: 1.08 },
  { at: S_START + 10, x: 960, y: 560, zoom: 1.3 },
  { at: S_END, x: 960, y: 560, zoom: 1.32 }
]);

export const scene: AuthoredScene = {
  id: "anatoly-s19-prank-sociology",
  start: S_START,
  end: S_END,
  intent: "Prank sociology: A prank is planned by definition. 'If you announce it, that is a corporate meeting, not a prank.'",
  renderWorld,
  camera: withPunch(baseCamera, S_START + 0.5, 0.2),
};

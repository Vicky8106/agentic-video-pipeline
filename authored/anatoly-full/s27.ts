/**
 * Scene 27 (707.65–735.61s): anatoly-s27-audience-lab-rats
 * The Audience as Lab Rats: We click the red button every single time. 'SKINNY JANITOR DESTROYS 300KG GYM BRO' click loop.
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

export const S_START = 707.65;
export const S_END = 735.61;

function renderWorld(t: number): string {
  return (
    renderBackground("BG-STUDIO", { timeSec: t }) +
    host(480, 652, t, { expression: "deadpan_classic", isTalking: true }) +
    thumbFrame(1250, 440, 1.3) +
    cursor(1250, 480, 1.4, 0)
  );
}

const baseCamera = keyframedCamera([
  { at: S_START, x: 960, y: 560, zoom: 1.05 },
  { at: S_START + 12, x: 1100, y: 550, zoom: 1.3 },
  { at: S_END, x: 1100, y: 550, zoom: 1.32 }
]);

export const scene: AuthoredScene = {
  id: "anatoly-s27-audience-lab-rats",
  start: S_START,
  end: S_END,
  intent: "The Audience as Lab Rats: We click the red button every single time. 'SKINNY JANITOR DESTROYS 300KG GYM BRO' click loop.",
  renderWorld,
  camera: withPunch(baseCamera, S_START + 0.5, 0.2),
};

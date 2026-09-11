/**
 * Scene 32 (841.51–853.46s): anatoly-s32-where-leaves-controversy
 * Bridge to Finale: 'Technically doctors. So where does that leave the controversy? Somewhere much less dramatic than the internet wants...'
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

export const S_START = 841.51;
export const S_END = 853.46;

function renderWorld(t: number): string {
  return (
    renderBackground("BG-GYM", { timeSec: t }) +
    host(960, 652, t, { expression: "deadpan_classic", isTalking: true })
  );
}

const baseCamera = keyframedCamera([
  { at: S_START, x: 960, y: 560, zoom: 1.02 },
  { at: S_END, x: 960, y: 560, zoom: 1.1 }
]);

export const scene: AuthoredScene = {
  id: "anatoly-s32-where-leaves-controversy",
  start: S_START,
  end: S_END,
  intent: "Bridge to Finale: 'Technically doctors. So where does that leave the controversy? Somewhere much less dramatic than the internet wants...'",
  renderWorld,
  camera: withPunch(baseCamera, S_START + 0.5, 0.2),
};

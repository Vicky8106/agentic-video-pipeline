/**
 * Scene 20 (527.18–553.00s): anatoly-s20-editing-the-boring
 * The Editing Room: Six hours of gym footage where a guy says 'Okay' gets trimmed down. Film strips and timeline cutters.
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

export const S_START = 527.18;
export const S_END = 553.00;

function renderWorld(t: number): string {
  return (
    renderBackground("BG-OFFICE", { timeSec: t }) +
    host(480, 652, t, { expression: "deadpan_classic", isTalking: true }) +
    crewSil(1150, 580, 1.3, "edit", t)
  );
}

const baseCamera = keyframedCamera([
  { at: S_START, x: 960, y: 560, zoom: 1.1 },
  { at: S_START + 12, x: 1150, y: 550, zoom: 1.35 },
  { at: S_END, x: 1150, y: 550, zoom: 1.38 }
]);

export const scene: AuthoredScene = {
  id: "anatoly-s20-editing-the-boring",
  start: S_START,
  end: S_END,
  intent: "The Editing Room: Six hours of gym footage where a guy says 'Okay' gets trimmed down. Film strips and timeline cutters.",
  renderWorld,
  camera: withPunch(baseCamera, S_START + 0.5, 0.2),
};

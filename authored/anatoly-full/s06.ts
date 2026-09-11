/**
 * Scene 06 (144.54–171.75s): anatoly-s06-making-a-video
 * Making a video, not a conspiracy: Camera rigs and wireless boom mics pop up around the gym bench. Filmmaking reality.
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

export const S_START = 144.54;
export const S_END = 171.75;

function renderWorld(t: number): string {
  const rig1In = smooth(span(t, S_START + 4, S_START + 7));
  const rig2In = smooth(span(t, S_START + 12, S_START + 15));
  return (
    renderBackground("BG-GYM", { timeSec: t }) +
    host(520, 652, t, { expression: "deadpan_classic", isTalking: true }) +
    barbell(1000, 660, 1.2) +
    (rig1In > 0 ? cameraRig(lerp(-100, 240, rig1In), 580, 1.1) : ``) +
    (rig2In > 0 ? cameraRig(lerp(2100, 1580, rig2In), 580, 1.2) : ``)
  );
}

const baseCamera = keyframedCamera([
  { at: S_START, x: 960, y: 560, zoom: 1.05 },
  { at: S_START + 12, x: 1100, y: 550, zoom: 1.28 },
  { at: S_END, x: 1100, y: 550, zoom: 1.3 }
]);

export const scene: AuthoredScene = {
  id: "anatoly-s06-making-a-video",
  start: S_START,
  end: S_END,
  intent: "Making a video, not a conspiracy: Camera rigs and wireless boom mics pop up around the gym bench. Filmmaking reality.",
  renderWorld,
  camera: withPunch(baseCamera, S_START + 0.5, 0.2),
};

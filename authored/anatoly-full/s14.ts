/**
 * Scene 14 (362.13–386.58s): anatoly-s14-muscles-vs-physics
 * Muscles vs Physics: Just because someone is huge doesn't mean they understand biomechanics. Dr. Mike returns to whiteboard.
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

export const S_START = 362.13;
export const S_END = 386.58;

function renderWorld(t: number): string {
  return (
    renderBackground("BG-STUDIO", { timeSec: t }) +
    host(460, 652, t, { expression: "deadpan_classic" }) +
    drMike(940, 650, t, { expression: "smug_rock_eyebrow", isTalking: true, pointTarget: { x: 1380, y: 460 } }) +
    builder(1420, 650, t, { expression: "derp_smile" })
  );
}

const baseCamera = keyframedCamera([
  { at: S_START, x: 960, y: 560, zoom: 1.1 },
  { at: S_START + 10, x: 1200, y: 550, zoom: 1.38 },
  { at: S_END, x: 1200, y: 550, zoom: 1.4 }
]);

export const scene: AuthoredScene = {
  id: "anatoly-s14-muscles-vs-physics",
  start: S_START,
  end: S_END,
  intent: "Muscles vs Physics: Just because someone is huge doesn't mean they understand biomechanics. Dr. Mike returns to whiteboard.",
  renderWorld,
  camera: withPunch(baseCamera, S_START + 0.5, 0.2),
};

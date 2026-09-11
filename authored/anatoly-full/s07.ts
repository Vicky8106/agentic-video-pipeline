/**
 * Scene 07 (171.75–197.63s): anatoly-s07-real-gym-scrolling
 * Real gym life: While YouTube shows cinematic pacing, real gym life is a bro sitting on the bench scrolling Instagram for 20 minutes while host taps foot.
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

export const S_START = 171.75;
export const S_END = 197.63;

function renderWorld(t: number): string {
  const tap = Math.sin((t - S_START) * 5) * 4;
  return (
    renderBackground("BG-GYM", { timeSec: t }) +
    host(480, 652 + tap, t, { expression: "skeptical_side_eye", isTalking: true }) +
    scroller(1260, 650, t, { isTalking: false, expression: "derp_smile" })
  );
}

const baseCamera = keyframedCamera([
  { at: S_START, x: 960, y: 560, zoom: 1.1 },
  { at: S_START + 10, x: 1220, y: 550, zoom: 1.35 },
  { at: S_END, x: 1220, y: 550, zoom: 1.4 }
]);

export const scene: AuthoredScene = {
  id: "anatoly-s07-real-gym-scrolling",
  start: S_START,
  end: S_END,
  intent: "Real gym life: While YouTube shows cinematic pacing, real gym life is a bro sitting on the bench scrolling Instagram for 20 minutes while host taps foot.",
  renderWorld,
  camera: withPunch(baseCamera, S_START + 0.5, 0.2),
};

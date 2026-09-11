/**
 * Scene 05 (116.30–144.54s): anatoly-s05-elite-powerlifter
 * Elite powerlifter reality: Vladimir Shmondenko deadlifting huge stack of plates vs the circus entertainment format.
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

export const S_START = 116.30;
export const S_END = 144.54;

function renderWorld(t: number): string {
  const lift = smooth(span(t, S_START + 8, S_START + 14));
  return (
    renderBackground("BG-GYM", { timeSec: t }) +
    janitor(750, 652, t, { expression: "deadpan_classic", spineLean: -6 }) +
    barbell(850, lerp(660, 520, lift), 1.4) +
    dust(850, 680, lift > 0 && lift < 1 ? lift : 0) +
    host(1400, 652, t, { expression: "deadpan_classic", pointTarget: { x: 850, y: 550 } })
  );
}

const baseCamera = keyframedCamera([
  { at: S_START, x: 960, y: 560, zoom: 1.08 },
  { at: S_START + 14, x: 900, y: 550, zoom: 1.3 },
  { at: S_END, x: 880, y: 550, zoom: 1.35 }
]);

export const scene: AuthoredScene = {
  id: "anatoly-s05-elite-powerlifter",
  start: S_START,
  end: S_END,
  intent: "Elite powerlifter reality: Vladimir Shmondenko deadlifting huge stack of plates vs the circus entertainment format.",
  renderWorld,
  camera: withPunch(baseCamera, S_START + 0.5, 0.2),
};

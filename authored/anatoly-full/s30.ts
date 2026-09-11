/**
 * Scene 30 (788.27–813.99s): anatoly-s30-the-call-sheet
 * The Call Sheet: At some point the janitor has a call sheet, catering, and security release forms. A legitimate television production.
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

export const S_START = 788.27;
export const S_END = 813.99;

function renderWorld(t: number): string {
  return (
    renderBackground("BG-OFFICE", { timeSec: t }) +
    suit(480, 652, t, { expression: "smug_rock_eyebrow", isTalking: true }) +
    card(1200, 480, 1.2, "#6366f1")
  );
}

const baseCamera = keyframedCamera([
  { at: S_START, x: 960, y: 560, zoom: 1.05 },
  { at: S_START + 12, x: 1150, y: 550, zoom: 1.32 },
  { at: S_END, x: 1150, y: 550, zoom: 1.35 }
]);

export const scene: AuthoredScene = {
  id: "anatoly-s30-the-call-sheet",
  start: S_START,
  end: S_END,
  intent: "The Call Sheet: At some point the janitor has a call sheet, catering, and security release forms. A legitimate television production.",
  renderWorld,
  camera: withPunch(baseCamera, S_START + 0.5, 0.2),
};

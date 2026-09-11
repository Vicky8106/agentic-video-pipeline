/**
 * Scene 12 (307.86–332.62s): anatoly-s12-witch-hunt
 * Fitness YouTube witch hunt: Fingerprint dusters, internet tribunal gavel slam. Suddenly lifting weights requires FBI clearance.
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

export const S_START = 307.86;
export const S_END = 332.62;

function renderWorld(t: number): string {
  const slam = Math.sin((t - S_START) * 8);
  return (
    renderBackground("BG-TRIBUNAL", { timeSec: t }) +
    suit(780, 652, t, { expression: "smug_rock_eyebrow", spineLean: slam > 0.5 ? -6 : 0, isTalking: true }) +
    host(1360, 652, t, { expression: "shock_jaw_drop" })
  );
}

const baseCamera = keyframedCamera([
  { at: S_START, x: 960, y: 560, zoom: 1.15 },
  { at: S_START + 10, x: 800, y: 560, zoom: 1.35 },
  { at: S_END, x: 800, y: 560, zoom: 1.38 }
]);

export const scene: AuthoredScene = {
  id: "anatoly-s12-witch-hunt",
  start: S_START,
  end: S_END,
  intent: "Fitness YouTube witch hunt: Fingerprint dusters, internet tribunal gavel slam. Suddenly lifting weights requires FBI clearance.",
  renderWorld,
  camera: withPunch(baseCamera, S_START + 0.5, 0.2),
};

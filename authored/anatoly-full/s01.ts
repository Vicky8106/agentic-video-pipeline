/**
 * Scene 01 (0.00–25.49s): anatoly-s01-skinny-janitor
 * The skinny janitor premise: Host introduces the genre. Anatoly walks in holding mop, enters stage right and approaches giant bodybuilder flexing.
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

export const S_START = 0.00;
export const S_END = 25.49;

function renderWorld(t: number): string {
  const walkK = smooth(span(t, S_START + 6.0, S_START + 12.0));
  const janX = lerp(-100, 720, walkK);
  return (
    renderBackground("BG-GYM", { timeSec: t }) +
    host(440, 652, t, { expression: "deadpan_classic", isTalking: t < S_START + 12 }) +
    janitor(janX, 652, t, { isWalking: walkK > 0 && walkK < 1, expression: "deadpan_classic" }) +
    builder(1420, 650, t, { expression: "smug_rock_eyebrow", pose: "flexing" }) +
    barbell(1100, 660, 1.2)
  );
}

const baseCamera = keyframedCamera([
  { at: S_START, x: 960, y: 560, zoom: 1.05 },
  { at: S_START + 10, x: 800, y: 560, zoom: 1.15 },
  { at: S_START + 18, x: 1200, y: 560, zoom: 1.35 },
  { at: S_END, x: 1200, y: 560, zoom: 1.38 }
]);

export const scene: AuthoredScene = {
  id: "anatoly-s01-skinny-janitor",
  start: S_START,
  end: S_END,
  intent: "The skinny janitor premise: Host introduces the genre. Anatoly walks in holding mop, enters stage right and approaches giant bodybuilder flexing.",
  renderWorld,
  camera: withPunch(baseCamera, S_START + 0.5, 0.2),
};

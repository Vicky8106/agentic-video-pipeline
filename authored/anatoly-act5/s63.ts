/**
 * Act 5 Scene 63 (794.15–814.50s): act5-s63
 * Genuinely strong: the man can lift and that is enough. Anatoly deadlifting massive barbell.
 */
import { renderBackground } from "../../src/assets/BackgroundLibrary.js";
import {
  host, janitor, builder, barbell,
  executiveDesk, callSheetClipboard, cinemaSeats, operatingRoom,
} from "./shared.js";
import {
  keyframedCamera,
  withPunch,
  smooth,
  span,
  lerp,
  type AuthoredScene,
} from "../../src/authored/AuthoredScene.js";

export const S_START = 794.15;
export const S_END = 814.50;

function renderWorld(t: number): string {
  return (
    renderBackground("BG-GYM", { timeSec: t }) +
    barbell(960, 660, 1.5) +
    janitor(960, 652, t, { expression: "smug_rock_eyebrow" }) +
    host(440, 652, t, { expression: "deadpan_classic" })
  );
}
const baseCamera = keyframedCamera([
  { at: 794.15, x: 960, y: 540, zoom: 1.15 },
  { at: 800.71, x: 960, y: 520, zoom: 1.50 },
  { at: 814.50, x: 960, y: 520, zoom: 1.52 },
]);

export const scene: AuthoredScene = {
  id: "act5-s63",
  start: S_START,
  end: S_END,
  intent: "Genuinely strong: the man can lift and that is enough. Anatoly deadlifting massive barbell.",
  renderWorld,
  camera: baseCamera,
};

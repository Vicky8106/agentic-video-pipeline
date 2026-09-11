/**
 * Act 5 Scene 64 (814.50–829.49s): act5-s64
 * Movie theater analogy: why didn't they call the police? Suspend disbelief, enjoy it, then go outside.
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

export const S_START = 814.50;
export const S_END = 829.49;

function renderWorld(t: number): string {
  return (
    renderBackground("BG-STUDIO", { timeSec: t }) +
    cinemaSeats(960, 560) +
    host(960, 640, t, { expression: "deadpan_classic" })
  );
}
const baseCamera = keyframedCamera([
  { at: 814.50, x: 960, y: 540, zoom: 1.15 },
  { at: 820.19, x: 960, y: 500, zoom: 1.55 },
  { at: 829.49, x: 960, y: 500, zoom: 1.57 },
]);

export const scene: AuthoredScene = {
  id: "act5-s64",
  start: S_START,
  end: S_END,
  intent: "Movie theater analogy: why didn't they call the police? Suspend disbelief, enjoy it, then go outside.",
  renderWorld,
  camera: baseCamera,
};

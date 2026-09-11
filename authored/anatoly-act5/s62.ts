/**
 * Act 5 Scene 62 (773.15–794.15s): act5-s62
 * Production schedule: that is not a coincidence, that is a production schedule. The janitor has a call sheet.
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

export const S_START = 773.15;
export const S_END = 794.15;

function renderWorld(t: number): string {
  return (
    renderBackground("BG-STUDIO", { timeSec: t }) +
    callSheetClipboard(960, 480) +
    host(460, 680, t, { expression: "skeptical_side_eye", pointTarget: { x: 960, y: 480 } })
  );
}
const baseCamera = keyframedCamera([
  { at: 773.15, x: 960, y: 540, zoom: 1.15 },
  { at: 788.90, x: 960, y: 460, zoom: 1.55 },
  { at: 794.15, x: 960, y: 460, zoom: 1.57 },
]);

export const scene: AuthoredScene = {
  id: "act5-s62",
  start: S_START,
  end: S_END,
  intent: "Production schedule: that is not a coincidence, that is a production schedule. The janitor has a call sheet.",
  renderWorld,
  camera: baseCamera,
};

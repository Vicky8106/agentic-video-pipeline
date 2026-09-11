/**
 * Act 5 Scene 60 (750.00–761.84s): act5-s60
 * The janitor has a production company. Full-time career pretending to have a career cleaning gyms. Executive desk.
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

export const S_START = 750.00;
export const S_END = 761.84;

function renderWorld(t: number): string {
  return (
    renderBackground("BG-STUDIO", { timeSec: t }) +
    executiveDesk(960, 580) +
    janitor(960, 560, t, { expression: "smug_rock_eyebrow" })
  );
}
const baseCamera = keyframedCamera([
  { at: 750.00, x: 960, y: 540, zoom: 1.15 },
  { at: 760.61, x: 960, y: 500, zoom: 1.65 },
  { at: 761.84, x: 960, y: 500, zoom: 1.67 },
]);

export const scene: AuthoredScene = {
  id: "act5-s60",
  start: S_START,
  end: S_END,
  intent: "The janitor has a production company. Full-time career pretending to have a career cleaning gyms. Executive desk.",
  renderWorld,
  camera: baseCamera,
};

/**
 * Act 5 Scene 61 (761.84–773.15s): act5-s61
 * Anatoly waking up: did you think he woke up every morning saying 'I wonder what will happen today'?
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

export const S_START = 761.84;
export const S_END = 773.15;

function renderWorld(t: number): string {
  return (
    renderBackground("BG-STUDIO", { timeSec: t }) +
    `<g transform="translate(960, 560)">
      <!-- Bed -->
      <rect x="-140" y="0" width="280" height="90" rx="6" fill="#1e293b" stroke="#334155" stroke-width="4"/>
      <rect x="-130" y="10" width="260" height="70" fill="#38bdf8"/>
      <!-- Pillow -->
      <ellipse cx="-90" cy="15" rx="35" ry="18" fill="#f8fafc"/>
      <!-- Thought bubble: I wonder what will happen today? -->
      <g transform="translate(0, -90)">
        <rect x="-160" y="-25" width="320" height="50" rx="10" fill="#ffffff" stroke="#0f172a" stroke-width="4"/>
        <text x="0" y="8" font-family="'Impact', sans-serif" font-size="18" fill="#0f172a" text-anchor="middle">"I wonder what will happen today?"</text>
      </g>
    </g>` +
    janitor(870, 570, t, { expression: "deadpan_classic", scale: 1.0 })
  );
}
const baseCamera = keyframedCamera([
  { at: 761.84, x: 960, y: 540, zoom: 1.15 },
  { at: 771.58, x: 960, y: 480, zoom: 1.55 },
  { at: 773.15, x: 960, y: 480, zoom: 1.57 },
]);

export const scene: AuthoredScene = {
  id: "act5-s61",
  start: S_START,
  end: S_END,
  intent: "Anatoly waking up: did you think he woke up every morning saying 'I wonder what will happen today'?",
  renderWorld,
  camera: baseCamera,
};

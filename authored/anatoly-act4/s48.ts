/**
 * Act 4 Scene 48 (516.13–534.62s): act4-s48
 * What a prank actually is: controlled setup and camera angles vs an announcement.
 */
import { renderBackground } from "../../src/assets/BackgroundLibrary.js";
import {
  host, janitor, builder, cameraRig, speechBubble, barbell,
  vintageTelevision, gordonRamsayCaricature, radioactiveForklift, skinnerBoxRat,
} from "./shared.js";
import {
  keyframedCamera,
  withPunch,
  smooth,
  span,
  lerp,
  type AuthoredScene,
} from "../../src/authored/AuthoredScene.js";

export const S_START = 516.13;
export const S_END = 534.62;

function renderWorld(t: number): string {
  return (
    renderBackground("BG-STUDIO", { timeSec: t }) +
    `<g transform="translate(600, 460)">
      <rect x="-160" y="-60" width="320" height="120" rx="10" fill="#0f172a" stroke="#22c55e" stroke-width="4"/>
      <text x="0" y="8" font-family="'Impact', sans-serif" font-size="24" fill="#22c55e" text-anchor="middle">CONTROLLED SETUP</text>
    </g>` +
    cameraRig(1360, 580, 1.2) +
    host(960, 680, t, { expression: "skeptical_side_eye" })
  );
}
const baseCamera = keyframedCamera([
  { at: 516.13, x: 960, y: 540, zoom: 1.15 },
  { at: 527.73, x: 600, y: 460, zoom: 1.45 },
  { at: 534.62, x: 960, y: 540, zoom: 1.25 },
]);

export const scene: AuthoredScene = {
  id: "act4-s48",
  start: S_START,
  end: S_END,
  intent: "What a prank actually is: controlled setup and camera angles vs an announcement.",
  renderWorld,
  camera: baseCamera,
};

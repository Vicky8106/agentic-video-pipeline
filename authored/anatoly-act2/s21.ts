/**
 * Act 2 Scene 21 (145.06–152.95s): act2-s21-planned-video-clapperboard
 * "That's called making a video. It is not a conspiracy. Literally the definition of a planned video."
 * Giant film clapperboard in center. Clapper slams down on 151.98s.
 */
import { renderBackground } from "../../src/assets/BackgroundLibrary.js";
import {
  host, clapperboard, dust,
} from "./shared.js";
import {
  keyframedCamera,
  type AuthoredScene,
} from "../../src/authored/AuthoredScene.js";

export const S_START = 145.06;
export const S_END = 152.95;

function renderWorld(t: number): string {
  const isSnapped = t >= 151.5;
  return (
    renderBackground("BG-STUDIO", { timeSec: t }) +
    // Director Clapperboard in center
    clapperboard(960, 480, isSnapped ? 1 : 0) +
    (isSnapped ? dust(960, 430, Math.sin(Math.min(1, (t - 151.5) * 2) * Math.PI)) : "") +
    // Host on side gesturing to clapperboard
    host(520, 652, t, {
      expression: isSnapped ? "deadpan_classic" : "smug_rock_eyebrow",
      pointTarget: { x: 960, y: 480 },
    })
  );
}

const baseCamera = keyframedCamera([
  { at: 145.06, x: 960, y: 540, zoom: 1.15 },
  { at: 151.49, x: 960, y: 540, zoom: 1.25 },
  // Instant snap zoom into slammed clapperboard on 151.98s
  { at: 151.98, x: 960, y: 460, zoom: 1.85 },
  { at: 152.95, x: 960, y: 460, zoom: 1.87 },
]);

export const scene: AuthoredScene = {
  id: "act2-s21-planned-video-clapperboard",
  start: S_START,
  end: S_END,
  intent: "Movie clapperboard slams shut on planned video, emphasizing intentional production over conspiracy.",
  renderWorld,
  camera: baseCamera,
};

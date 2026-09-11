/**
 * Act 2 Scene 18 (116.90–126.64s): act2-s18-accidental-humiliation
 * "Not the same thing as spontaneously walking into gyms and accidentally humiliating everyone."
 * Anatoly slips on soapy water, accidentally launching barbell, gym bro knocked over.
 */
import { renderBackground } from "../../src/assets/BackgroundLibrary.js";
import {
  host, janitor, builder, barbell, mopBucket, dust,
} from "./shared.js";
import {
  keyframedCamera,
  type AuthoredScene,
} from "../../src/authored/AuthoredScene.js";

export const S_START = 116.90;
export const S_END = 126.64;

function renderWorld(t: number): string {
  const slip = Math.min(1, Math.max(0, (t - 121.0) * 2));
  const barArcY = 640 - Math.sin(slip * Math.PI) * 260;
  return (
    renderBackground("BG-GYM", { timeSec: t }) +
    // Host on left delivering the monologue
    host(460, 652, t, {
      expression: "deadpan_classic",
      pointTarget: { x: 1200, y: 550 },
      spineLean: -4,
    }) +
    // Mop bucket and soapy puddle
    mopBucket(1080, 670, 0.9) +
    `<ellipse cx="1180" cy="710" rx="90" ry="18" fill="#38bdf8" opacity="0.4"/>` +
    // Flying Barbell
    barbell(1260, barArcY, 1.2) +
    // Anatoly slipping
    janitor(1160, 652, t, {
      expression: slip > 0 ? "surprised_wide_eyes" : "deadpan_classic",
      spineLean: slip * 25,
      rightHandProp: "mop",
    }) +
    // Knocked-over bodybuilder on right
    builder(1540, 652, t, {
      expression: slip > 0.5 ? "screaming_open_mouth" : "smug_rock_eyebrow",
      spineLean: slip * -35,
    }) +
    (slip > 0.8 ? dust(1540, 700, 0.8) : "")
  );
}

const baseCamera = keyframedCamera([
  { at: 116.90, x: 960, y: 540, zoom: 1.15 },
  { at: 122.50, x: 960, y: 540, zoom: 1.22 },
  // Instant snap on "accidentally humiliates everyone"
  { at: 125.62, x: 1350, y: 580, zoom: 1.70 },
  { at: 126.64, x: 1350, y: 580, zoom: 1.72 },
]);

export const scene: AuthoredScene = {
  id: "act2-s18-accidental-humiliation",
  start: S_START,
  end: S_END,
  intent: "Accidental slapstick humiliation: janitor slips on soapy puddle, launching barbell, knocking over gym bro.",
  renderWorld,
  camera: baseCamera,
};

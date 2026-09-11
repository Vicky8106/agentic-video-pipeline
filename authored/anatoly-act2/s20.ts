/**
 * Act 2 Scene 20 (135.26–145.06s): act2-s20-plumber-analogy
 * "If I call my friend and say: Tomorrow I dress as a plumber and deadlift his max...
 * then I actually deadlift it... the deadlift is real."
 * Host in plumber overalls holding wrench, then lifting 500lb bar.
 */
import { renderBackground } from "../../src/assets/BackgroundLibrary.js";
import {
  host, builder, barbell, pipeWrench,
} from "./shared.js";
import {
  keyframedCamera,
  type AuthoredScene,
} from "../../src/authored/AuthoredScene.js";

export const S_START = 135.26;
export const S_END = 145.06;

function renderWorld(t: number): string {
  const isLifting = t >= 141.74;
  const liftY = isLifting ? 660 - Math.min(1, (t - 141.74) * 2) * 140 : 660;
  return (
    renderBackground("BG-GYM", { timeSec: t }) +
    // Bodybuilder flexing in background
    builder(480, 640, t, {
      expression: isLifting ? "surprised_wide_eyes" : "smug_rock_eyebrow",
    }) +
    // Massive Barbell
    barbell(1240, liftY, 1.4) +
    // Plumber wrench on floor if lifted
    (isLifting ? pipeWrench(1420, 680, 0.9) : "") +
    // Host dressed as plumber
    host(1240, 652, t, {
      clothes: "janitor_overalls",
      expression: isLifting ? "smug_rock_eyebrow" : "deadpan_classic",
      spineLean: isLifting ? -5 : 2,
    }) +
    // Phone talking to friend before lift
    (!isLifting ? `
      <g transform="translate(1210, 520)">
        <rect x="-8" y="-16" width="16" height="32" rx="3" fill="#1e293b"/>
        <line x1="0" y1="-16" x2="0" y2="-28" stroke="#64748b" stroke-width="3"/>
      </g>
      ${pipeWrench(1290, 550, 0.8)}
    ` : "")
  );
}

const baseCamera = keyframedCamera([
  { at: 135.26, x: 960, y: 540, zoom: 1.15 },
  { at: 141.73, x: 960, y: 540, zoom: 1.20 },
  // Snap zoom into the deadlift on "the deadlift is real" (144.54s)
  { at: 144.54, x: 1240, y: 520, zoom: 1.70 },
  { at: 145.06, x: 1240, y: 520, zoom: 1.72 },
]);

export const scene: AuthoredScene = {
  id: "act2-s20-plumber-analogy",
  start: S_START,
  end: S_END,
  intent: "Plumber disguise analogy: host in plumber overalls talks on phone, then deadlifts 500lb barbell clean off floor.",
  renderWorld,
  camera: baseCamera,
};

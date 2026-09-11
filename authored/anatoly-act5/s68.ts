/**
 * S3 (892.48–902.36): "strength gets you in, character keeps you,
 * reaction shares you, thumbnail clicks you. That is the real lift."
 * Four icons dealt left-to-right like cards, one per phrase — then the
 * table flips: the cards clear and the host DEADLIFTS a barbell on
 * "lift". The sentence performs its own punchline.
 */
import { renderBackground } from "../../src/assets/BackgroundLibrary.js";
import { renderProp } from "../../src/assets/PropLibrary.js";
import { host, thumbFrame } from "./shared.js";
import {
  keyframedCamera,
  withPunch,
  smooth,
  span,
  type AuthoredScene,
} from "../../src/authored/AuthoredScene.js";

export const S3_START = 892.48;
export const S3_END = 902.36;
/** "That is the real LIFT" — the bar locks out on the word. */
const LIFT_AT = 901.8;

const CARDS = [
  { at: 893.5, x: 1000, prop: "PROP-GYM", s: 0.5 },
  { at: 896.0, x: 1200, prop: "PROP-MIRROR", s: 0.8 },
  { at: 897.3, x: 1400, prop: "PROP-SUB", s: 1.0 },
  { at: 898.8, x: 1600, prop: "THUMB", s: 0.8 },
];
const CLEAR_AT = 900.4;

function renderWorld(t: number): string {
  const clearK = smooth(span(t, CLEAR_AT, CLEAR_AT + 0.4));
  let cards = ``;
  for (const c of CARDS) {
    const k = smooth(span(t, c.at, c.at + 0.3));
    if (k > 0 && clearK < 1) {
      const art =
        c.prop === "THUMB"
          ? thumbFrame(0, 0, 1)
          : renderProp(c.prop, { x: 0, y: 0, scale: 1, timeSec: t });
      cards += `<g opacity="${(1 - clearK).toFixed(2)}" transform="translate(${c.x} 300) scale(${(c.s * k).toFixed(3)})">${art}</g>`;
    }
  }
  // The real lift: bar rises as the sentence does, locking out ON the word.
  const pull = smooth(span(t, 900.6, LIFT_AT));
  const barY = 700 - pull * 260;
  const strain = Math.sin(Math.min(1, pull) * Math.PI);
  const showBar = t >= 900.4;
  return (
    renderBackground("BG-GYM", { timeSec: t }) +
    cards +
    (showBar
      ? `<g transform="translate(1350 ${barY.toFixed(1)})">` +
        renderProp("PROP-GYM", { x: 0, y: 0, scale: 1.1, timeSec: t }) + `</g>`
      : ``) +
    host(560, 652, t, {
      expression: t < LIFT_AT ? "deadpan_classic" : "smug_chef_kiss",
      spineLean: 10 * strain,
      scaleY: 1 - 0.05 * strain,
      scaleX: 1 + 0.05 * strain,
      pointTarget: showBar ? { x: 1350, y: barY } : undefined,
    })
  );
}

const baseCamera = keyframedCamera([
  { at: S3_START, x: 960, y: 560, zoom: 1.1 },
  { at: 896, x: 1000, y: 540, zoom: 1.12 },
  { at: 898.8, x: 1080, y: 540, zoom: 1.14 },
  { at: 900.4, x: 1000, y: 560, zoom: 1.15 },
  { at: LIFT_AT, x: 980, y: 560, zoom: 1.45 },
  { at: S3_END, x: 960, y: 560, zoom: 1.5 },
]);

export const scene: AuthoredScene = {
  id: "anatoly-s3-real-lift",
  start: S3_START,
  end: S3_END,
  intent:
    "Chain-then-payoff: four icons deal out with the four phrases while the " +
    "camera drifts right reading them; on 'That is the real lift' the cards " +
    "clear and the host deadlifts a barbell that locks out ON 'lift' with a " +
    "strain squash and punch-in. The act's peak, staged literally on purpose.",
  renderWorld,
  camera: withPunch(baseCamera, LIFT_AT, 0.4),
};

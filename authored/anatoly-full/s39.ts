/**
 * S7 (941.0–973.57): the closer. Thesis cards for the two "real scams",
 * a three-item experiment checklist (uniform, biggest guy, "Can I try?"),
 * three staged congratulations — including security walking the janitor
 * off — and a frozen button on "the video wasn't staged". The camera only
 * travels for entrances and the final snap; the verdicts hold still.
 */
import { renderBackground } from "../../src/assets/BackgroundLibrary.js";
import { renderProp } from "../../src/assets/PropLibrary.js";
import { host, janitor, builder, suit, card, verdictStage } from "./shared.js";
import {
  keyframedCamera,
  withPunch,
  smooth,
  span,
  lerp,
  type AuthoredScene,
} from "../../src/authored/AuthoredScene.js";

export const S7_START = 941.0;
export const S7_END = 973.57;
const SCAM_AT = 945.5;
const BUTTON_AT = 972.8;

function renderWorld(t: number): string {
  const frozen = t >= 971.7;
  const wt = frozen ? 971.7 : t;
  // Thesis cards.
  const c1 = smooth(span(t, 941.8, 942.2));
  const c2 = smooth(span(t, 945.0, 945.4));
  const cardsClear = smooth(span(t, 949.9, 950.3));
  // Checklist.
  const u = smooth(span(t, 951.5, 951.9));
  const big = smooth(span(t, 954.5, 954.9));
  const q = smooth(span(t, 958.0, 958.4));
  const listClear = smooth(span(t, 960.4, 960.8));
  // Walk-off: security escorts the janitor out.
  const walk = smooth(span(t, 969.0, 971.5));
  const walkX = lerp(960, 2150, walk);
  return (
    verdictStage() +
    (c1 > 0 && cardsClear < 1
      ? `<g opacity="${(c1 * (1 - cardsClear)).toFixed(2)}">${card(700, 480, 1.0, "#f87171")}</g>` : ``) +
    (c2 > 0 && cardsClear < 1
      ? `<g opacity="${(c2 * (1 - cardsClear)).toFixed(2)}">${card(1250, 480, 1.0, "#fbbf24")}</g>` : ``) +
    (u > 0 && listClear < 1
      ? `<g opacity="${(u * (1 - listClear)).toFixed(2)}">${janitor(1050, 700, wt, { scale: 0.8, isTalking: false })}</g>` : ``) +
    (big > 0 && listClear < 1
      ? `<g opacity="${(big * (1 - listClear)).toFixed(2)}">${builder(1280, 690, wt, { scale: 0.9, isTalking: false })}</g>` : ``) +
    (q > 0 && listClear < 1
      ? `<g opacity="${(q * (1 - listClear)).toFixed(2)}" transform="translate(1500 420) scale(${(q).toFixed(3)})">` +
        renderProp("PROP-QUESTION", { x: 0, y: 0, scale: 1, timeSec: wt }) + `</g>` : ``) +
    (walk > 0 && !frozen
      ? suit(walkX - 160, 652, wt, { isWalking: true, isTalking: false }) +
        janitor(walkX, 652, wt, { isWalking: true, isTalking: false, expression: "frustration_facepalm" })
      : ``) +
    (frozen
      ? host(760, 652, wt, { expression: "smug_chef_kiss", spineLean: -4 })
      : host(540, 652, wt, {
          expression: t > 960.9 && t < 969 ? "smug_rock_eyebrow" : "deadpan_classic",
          pointTarget: q > 0 && listClear < 1 ? { x: 1500, y: 420 } : undefined,
        }))
  );
}

const baseCamera = keyframedCamera([
  { at: S7_START, x: 960, y: 560, zoom: 1.05 },
  { at: 945, x: 1000, y: 555, zoom: 1.15 },
  { at: SCAM_AT, x: 1050, y: 555, zoom: 1.35 },
  { at: 950, x: 960, y: 560, zoom: 1.1 },
  { at: 955, x: 1100, y: 555, zoom: 1.15 },
  { at: 958.5, x: 1250, y: 540, zoom: 1.3 },
  { at: 961, x: 900, y: 560, zoom: 1.2 },
  { at: 965, x: 900, y: 560, zoom: 1.25 },
  { at: 969.5, x: 1100, y: 560, zoom: 1.15 },
  { at: 971.7, x: 800, y: 560, zoom: 1.5 },
  { at: BUTTON_AT, x: 780, y: 560, zoom: 1.75 },
  { at: S7_END, x: 780, y: 560, zoom: 1.78 },
]);

export const scene: AuthoredScene = {
  id: "anatoly-s7-closer",
  start: S7_START,
  end: S7_END,
  intent:
    "Verdict, dare, button: scam-thesis cards land one per sentence; the " +
    "experiment checklist stages uniform, muscle, and the question; each " +
    "congratulations gets its own staging with security walking the janitor " +
    "off; then world-freeze and a snap onto the smug host for 'the video " +
    "wasn't staged'. Stillness sells verdicts.",
  renderWorld,
  camera: withPunch(withPunch(baseCamera, SCAM_AT, 0.3), BUTTON_AT, 0.36),
};

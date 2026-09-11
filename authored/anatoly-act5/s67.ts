/**
 * S2 (872.02–892.48): "he understands attention, contrast, character,
 * repetition... click." A five-step escalation: one prop per "understands",
 * each popping in on its word while the camera tightens a notch. The
 * question-mark of the fraud beat is swept away when the list starts —
 * the answer replacing the doubt, visibly. Punch on "click" with a cursor
 * that presses.
 */
import { renderBackground } from "../../src/assets/BackgroundLibrary.js";
import { renderProp } from "../../src/assets/PropLibrary.js";
import { host, cursor, contrastPanels } from "./shared.js";
import {
  keyframedCamera,
  withPunch,
  smooth,
  span,
  type AuthoredScene,
} from "../../src/authored/AuthoredScene.js";

export const S2_START = 872.02;
export const S2_END = 892.48;

const Q_AT = 874.0;
const POPS = [
  { at: 885.0, prop: "PROP-CAM" },
  { at: 886.4, prop: "CONTRAST" },
  { at: 888.2, prop: "PROP-MIRROR" },
  { at: 889.4, prop: "PROP-CLOCK" },
];
const CLICK_AT = 891.5;

const popScale = (t: number, at: number): number => {
  const k = span(t, at, at + 0.35);
  if (k <= 0) return 0;
  return 1.3 * (k < 1 ? smooth(k) * 1.12 : 1);
};

function renderWorld(t: number): string {
  const listK = smooth(span(t, 884.2, 884.8));
  let props = ``;
  const q = popScale(t, Q_AT);
  if (q > 0 && listK < 1) {
    props += `<g opacity="${(1 - listK).toFixed(2)}" transform="translate(1360 440) scale(${q.toFixed(3)})">` +
      renderProp("PROP-QUESTION", { x: 0, y: 0, scale: 1, timeSec: t }) + `</g>`;
  }
  let latest = -1;
  POPS.forEach((p, i) => { if (t >= p.at) latest = i; });
  if (latest >= 0) {
    const p = POPS[latest];
    const s = popScale(t, p.at);
    const art =
      p.prop === "CONTRAST"
        ? contrastPanels(0, 0, 1)
        : renderProp(p.prop, { x: 0, y: 0, scale: 1, timeSec: t });
    props += `<g transform="translate(1360 440) scale(${s.toFixed(3)})">${art}</g>`;
  }
  const ck = span(t, CLICK_AT, CLICK_AT + 0.4);
  const press = t >= CLICK_AT ? Math.max(0, 1 - (t - CLICK_AT) * 2) : 0;
  return (
    renderBackground("BG-STUDIO", { timeSec: t }) +
    props +
    (ck > 0 ? cursor(1360, 560, 2.2 * smooth(ck), press) : ``) +
    host(560, 652, t, {
      expression: t < CLICK_AT ? "deadpan_classic" : "smug_finger_guns",
      pointTarget: latest >= 0 || ck > 0 ? { x: 1360, y: 440 } : undefined,
    })
  );
}

const baseCamera = keyframedCamera([
  { at: S2_START, x: 960, y: 560, zoom: 1.05 },
  { at: 884.5, x: 940, y: 560, zoom: 1.12 },
  { at: 885.2, x: 950, y: 555, zoom: 1.2 },
  { at: 886.6, x: 950, y: 555, zoom: 1.28 },
  { at: 888.4, x: 950, y: 555, zoom: 1.36 },
  { at: 889.6, x: 950, y: 555, zoom: 1.44 },
  { at: CLICK_AT, x: 980, y: 550, zoom: 1.5 },
  { at: S2_END, x: 960, y: 555, zoom: 1.62 },
]);

export const scene: AuthoredScene = {
  id: "anatoly-s2-understands",
  start: S2_START,
  end: S2_END,
  intent:
    "List-as-escalation: the fraud question-mark hangs over the doubt beat, " +
    "then each 'understands' swaps in one prop (camera, contrast split, mirror, clock) " +
    "with a camera notch tighter per item. The cursor press on 'click' is " +
    "the punch — the list's subject staging its own verb.",
  renderWorld,
  camera: withPunch(baseCamera, CLICK_AT, 0.34),
};

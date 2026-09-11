/**
 * Pure-function virtual camera.
 *
 * Replaces the stateful `Camera`, which was advanced once per rendered frame
 * and created fresh per render chunk. A shot list is compiled once into
 * resolved segments; `cameraAt(t)` works for any t in any order, which is what
 * makes per-frame parallel rendering safe.
 */
import { ramp, springFrom, SPRING_DEFAULTS } from "../anim/Track";
import { expoOut, resolveEase } from "../anim/Easing";
const DEFAULT_APPROACH = {
    cut: 0, punch: 0.16, whip: 0.1, drift: 1, pull: 1,
};
/** Compile a shot list so each segment knows the framing it arrives from. */
export function compileShots(shots) {
    const sorted = [...shots].sort((a, b) => a.start - b.start);
    let curCenter = [960, 540];
    let curZoom = 1.0;
    return sorted.map((s) => {
        const approachSec = s.approach ?? DEFAULT_APPROACH[s.move];
        const resolved = {
            ...s,
            fromCenter: curCenter,
            fromZoom: curZoom,
            approachSec: s.move === "cut" ? 0 : approachSec,
        };
        curCenter = s.center;
        curZoom = s.zoomEnd ?? s.zoom;
        return resolved;
    });
}
/** Sample the camera at absolute time `t`. Total over all t. */
export function cameraAt(shots, t) {
    if (shots.length === 0)
        throw new Error("cameraAt: empty shot list");
    let shot = shots[0];
    for (let i = 0; i < shots.length; i++) {
        if (t >= shots[i].start)
            shot = shots[i];
    }
    const local = t - shot.start;
    const span = Math.max(0.001, shot.end - shot.start);
    const ease = resolveEase(shot.ease ?? (shot.move === "whip" ? "expoOut" : undefined));
    let centerX;
    let centerY;
    let zoom;
    let arriving;
    if (shot.move === "cut" || local <= 0) {
        [centerX, centerY] = shot.center;
        zoom = shot.zoom;
        arriving = false;
    }
    else if (shot.move === "drift" || shot.move === "pull") {
        const k = ease(Math.min(1, local / span));
        centerX = shot.fromCenter[0] + (shot.center[0] - shot.fromCenter[0]) * k;
        centerY = shot.fromCenter[1] + (shot.center[1] - shot.fromCenter[1]) * k;
        const zEnd = shot.zoomEnd ?? shot.zoom;
        zoom = shot.fromZoom + (zEnd - shot.fromZoom) * k;
        arriving = false;
    }
    else {
        const ap = Math.max(0.02, shot.approachSec);
        const k = ramp(local, 0, ap, ease);
        centerX = shot.fromCenter[0] + (shot.center[0] - shot.fromCenter[0]) * k;
        centerY = shot.fromCenter[1] + (shot.center[1] - shot.fromCenter[1]) * k;
        const zDelta = shot.zoom - shot.fromZoom;
        const settle = springFrom(local, ap * 0.55, shot.fromZoom + zDelta * expoOut(Math.min(1, local / ap)), shot.zoom, SPRING_DEFAULTS.camera);
        zoom = Number.isFinite(settle) ? settle : shot.zoom;
        arriving = local < ap + 0.08;
    }
    // Post-arrival creep. Once the move has settled, a long shot keeps pushing in
    // very slowly. Without this, any shot longer than ~1.5s is a still image.
    const settled = shot.move === "drift" || shot.move === "pull" ? false : arriving === false;
    if (settled && span > 1.2) {
        const creepStart = Math.max(shot.approachSec, 0.25) + 0.1;
        const remain = Math.max(0.001, span - creepStart);
        const k = Math.min(1, Math.max(0, (local - creepStart) / remain));
        const targetZoom = shot.zoomEnd ?? shot.zoom * 1.11;
        zoom = zoom + (targetZoom - zoom) * k * 0.9;
        centerX += (shot.center[0] - centerX) * k * 0.05 + k * 9;
        centerY += (shot.center[1] - centerY) * k * 0.05;
    }
    const breathe = shot.breathe ?? 0.0035;
    if (breathe > 0) {
        zoom *= 1 + Math.sin(t * 0.9 + shot.start) * breathe;
        centerX += Math.sin(t * 0.62 + shot.start * 1.7) * breathe * 260;
        centerY += Math.cos(t * 0.48 + shot.start * 2.3) * breathe * 190;
    }
    return { centerX, centerY, zoom, arriving, shot };
}
/** Convert a pose to an SVG viewBox string. */
export function viewBoxFor(pose, baseWidth = 1920, baseHeight = 1080) {
    const safeZoom = Math.max(0.4, Math.min(3.5, pose.zoom));
    const w = baseWidth / safeZoom;
    const h = baseHeight / safeZoom;
    return `${(pose.centerX - w / 2).toFixed(2)} ${(pose.centerY - h / 2).toFixed(2)} ${w.toFixed(2)} ${h.toFixed(2)}`;
}
/**
 * Pixels per design-unit at the current pose. Needed to normalise stroke
 * weight: without it a stroke-width 8 line drawn at scale 1.3 measures ~7px in
 * a wide and ~13px in a 1.9x macro, so close-ups look blobby.
 */
export function pxPerUnit(pose, renderWidth = 1280, baseWidth = 1920) {
    const safeZoom = Math.max(0.4, Math.min(3.5, pose.zoom));
    return renderWidth / (baseWidth / safeZoom);
}
/** Merge shots that are too short into their predecessor so cuts never strobe. */
export function enforceMinShotLength(shots, minSec = 0.45) {
    const out = [];
    for (const s of shots) {
        const prev = out[out.length - 1];
        if (prev && s.end - s.start < minSec && s.kind === prev.kind) {
            prev.end = Math.max(prev.end, s.end);
            prev.center = s.center;
            prev.zoom = Math.max(prev.zoom, s.zoom);
            continue;
        }
        out.push({ ...s });
    }
    return out;
}
/* ------------------------------------------------------------------ *
 * Impact layer: trauma-driven shake and flash frames.
 *
 * The previous Camera had shake() and triggerShake() as empty stubs, so no
 * punchline ever landed with any physicality. Both are modelled here as a pure
 * function of time, which is what lets them survive chunked rendering.
 * ------------------------------------------------------------------ */
/** Hash-based smooth value noise in -1..1. Deterministic for any input. */
function noise1(x, seed) {
    const i = Math.floor(x);
    const f = x - i;
    const h = (n) => {
        const v = Math.sin(n * 127.1 + seed * 311.7) * 43758.5453;
        return v - Math.floor(v);
    };
    const u = f * f * (3 - 2 * f);
    return (h(i) * (1 - u) + h(i + 1) * u) * 2 - 1;
}
/**
 * Trauma at time t: quadratic falloff, so a hit snaps then eases.
 * Summing lets consecutive impacts compound.
 */
export function traumaAt(impacts, t) {
    let sum = 0;
    for (const ev of impacts) {
        if (t < ev.t)
            continue;
        const decay = ev.decay ?? 0.42;
        const k = (t - ev.t) / decay;
        if (k >= 1)
            continue;
        sum += (1 - k) * (1 - k) * ev.strength;
    }
    return Math.min(1, sum);
}
/**
 * Camera shake. Frequency rises with trauma, and the offset is noise rather
 * than a sine so it never looks like a metronome.
 */
export function shakeAt(trauma, t, seed = 1) {
    if (trauma <= 0.0001)
        return { x: 0, y: 0, rot: 0 };
    const amp = trauma * trauma;
    const freq = 26 + trauma * 42;
    return {
        x: noise1(t * freq, seed) * amp * 26,
        y: noise1(t * freq * 1.13, seed + 7.7) * amp * 20,
        rot: noise1(t * freq * 0.71, seed + 19.3) * amp * 1.15,
    };
}
/** Flash intensity for impact frames: a hard spike, gone within ~2 frames. */
export function flashAt(impacts, t) {
    let v = 0;
    for (const ev of impacts) {
        if (!ev.flash || t < ev.t)
            continue;
        const k = (t - ev.t) / 0.085;
        if (k >= 1)
            continue;
        v = Math.max(v, (1 - k) * (ev.strength * 0.8));
    }
    return Math.min(1, v);
}

/**
 * Frame engine: composes the direction plan, camera track, parametric rig and
 * audio envelope into a single SVG frame.
 *
 * Contract: `renderFrame(t)` is a pure function of `t`. No module in this path
 * carries mutable per-frame state, so frames may be rendered in any order, in
 * parallel, or in independent processes, and the result is bit-identical to a
 * single sequential pass. That is what makes the chunked low-memory renderer
 * correct instead of merely convenient.
 */
import { secondaryMotion } from "../director/Performance";
import { cameraAt, viewBoxFor, pxPerUnit, traumaAt, shakeAt, flashAt } from "../camera/CameraTrack";
import { renderRig } from "../character/Rig";
import { mouthOpenAt, isSpeakingAt, blinkAmountAt } from "../audio/Envelope";
import { wordAt } from "../subtitles/Transcript";
const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
/** Deterministic per-character phase so a crowd never breathes in lockstep. */
const phaseOf = (id, seed) => seed * Math.PI * 2 + id.length * 0.7;
function backgroundFor(t, sceneLabel, w = 1920, h = 1080) {
    // A calm, non-competing stage: soft ground plane and a horizon band. The
    // characters carry the motion; the backdrop must not fight them.
    const drift = Math.sin(t * 0.12) * 12;
    return `
  <defs>
    <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#f8fafc"/>
      <stop offset="100%" stop-color="#eef2f7"/>
    </linearGradient>
  </defs>
  <rect x="-4000" y="-4000" width="10000" height="10000" fill="url(#sky)"/>
  <rect x="-4000" y="${(h * 0.78).toFixed(0)}" width="10000" height="6000" fill="#e6ebf2"/>
  <line x1="-4000" y1="${(h * 0.78).toFixed(0)}" x2="10000" y2="${(h * 0.78).toFixed(0)}" stroke="#cbd5e1" stroke-width="3"/>
  <g opacity="0.5">
    <circle cx="${(240 + drift).toFixed(1)}" cy="${(h * 0.3).toFixed(0)}" r="120" fill="#e2e8f0"/>
    <circle cx="${(1700 - drift).toFixed(1)}" cy="${(h * 0.24).toFixed(0)}" r="170" fill="#e8edf4"/>
  </g>
  <title>${esc(sceneLabel)}</title>`;
}
/** Subtitle bar with the spoken word highlighted, driven by word timings. */
function subtitleLayer(t, transcript, w = 1920, h = 1080) {
    const active = transcript.words.find((c) => t >= c.start && t <= c.end);
    if (!active)
        return "";
    const sentence = transcript.sentences[active.sentenceIndex];
    if (!sentence)
        return "";
    const parts = sentence.words.map((wd) => {
        const on = wd.i === active.i;
        return `<tspan ${on ? 'fill="#0f172a" font-weight="700"' : 'fill="#475569"'}>${esc(wd.text)} </tspan>`;
    });
    return `
  <g id="subtitles">
    <text x="${w / 2}" y="${h - 74}" text-anchor="middle" font-family="Noto Sans, DejaVu Sans, sans-serif" font-size="46" fill="#475569">${parts.join("")}</text>
  </g>`;
}
let impactCache = null;
function impactsFor(plan) {
    if (impactCache && impactCache.key === plan)
        return impactCache.impacts;
    const impacts = [];
    for (const ev of plan.events) {
        if (ev.kind !== "flash")
            continue;
        const pl = ev.payload;
        impacts.push({
            t: ev.t,
            strength: typeof pl.strength === "number" ? pl.strength : 0.4,
            decay: typeof pl.decay === "number" ? pl.decay : 0.34,
            flash: pl.flash === true,
        });
    }
    impactCache = { key: plan, impacts };
    return impacts;
}
export function renderFrame(engine, t) {
    const { plan, perf, transcript, envelope, specs, blinkPlans } = engine;
    const width = engine.width ?? 1280;
    const height = engine.height ?? 720;
    const fps = engine.fps ?? 24;
    const hostId = engine.hostId ?? "host";
    const basePose = cameraAt(plan.resolved, t);
    const impacts = impactsFor(plan);
    const trauma = traumaAt(impacts, t);
    const shake = shakeAt(trauma, t, 1 + basePose.zoom);
    const flash = flashAt(impacts, t);
    // Shake is added in design units *after* framing, so its on-screen amplitude
    // is independent of zoom - a hit feels the same size in a macro as a wide.
    const pose = {
        ...basePose,
        centerX: basePose.centerX + shake.x / Math.max(0.2, basePose.zoom),
        centerY: basePose.centerY + shake.y / Math.max(0.2, basePose.zoom),
    };
    const viewBox = viewBoxFor(pose, 1920, 1080);
    const scale = pxPerUnit(pose, width, 1920);
    const scene = plan.scenes.find((s) => t >= s.start && t < s.end) ?? plan.scenes[plan.scenes.length - 1];
    const dt = 1 / fps;
    const speaking = envelope ? isSpeakingAt(envelope, t) : false;
    const mouth = envelope ? mouthOpenAt(envelope, t) : 0;
    const figures = [];
    const ids = new Set([hostId, ...perf.ids]);
    for (const id of ids) {
        const spec = specs[id] ?? specs["default"];
        if (!spec)
            continue;
        const presence = perf.presenceAt(id, t);
        if (presence <= 0.001)
            continue;
        // View culling: an actor the camera has cut away from must not leak into
        // the frame, and drawing them is wasted work.
        const vbNums = viewBox.split(/[ ,]+/).map(Number);
        const home = perf.homeAt(id);
        if (home[0] < vbNums[0] - 320 || home[0] > vbNums[0] + vbNums[2] + 320 ||
            home[1] < vbNums[1] - 520 || home[1] > vbNums[1] + vbNums[3] + 420)
            continue;
        const authored = perf.poseAt(id, t);
        const blinkPlan = blinkPlans[id];
        const ph = phaseOf(id, spec.phaseSeed);
        // Life layer applied to EVERY figure, not just the host. Breathing goes
        // into the chest and head, never into global y, so the feet stay planted
        // and the contact shadow stays on the floor.
        // Idle motion: breath, weight shift and a slow arm drift. Without these a
        // held shot is a still image, which is exactly the failure we are fixing.
        const breath = Math.sin(t * 1.05 + ph) * 0.5 + 0.5;
        const sway = Math.sin(t * 0.47 + ph * 1.7);
        const armDrift = Math.sin(t * 0.72 + ph * 2.3);
        const life = {
            ...authored,
            scale: (typeof authored.scale === "number" ? authored.scale : 1) * (0.72 + 0.28 * presence),
            alpha: presence,
            chestRise: breath * 4.2,
            bodySway: sway * 3.4,
            leftArmAngle1: (typeof authored.leftArmAngle1 === "number" ? authored.leftArmAngle1 : 150) + armDrift * 1.9,
            rightArmAngle1: (typeof authored.rightArmAngle1 === "number" ? authored.rightArmAngle1 : 30) - armDrift * 1.6,
            headTilt: (typeof authored.headTilt === "number" ? authored.headTilt : 0) + breath * 1.1 + sway * 0.8,
            mouthOpen: id === hostId && speaking ? mouth : (typeof authored.mouthOpen === "number" ? authored.mouthOpen : 0),
            // A tiny bob only while actually voicing, scaled by real amplitude.
            y: (typeof authored.y === "number" ? authored.y : 672) + (speaking && id === hostId ? mouth * 2.4 : 0),
        };
        const sec = secondaryMotion((tt) => perf.poseAt(id, tt), t, dt);
        const blink = blinkPlan ? blinkAmountAt(blinkPlan, t) : 0;
        figures.push(renderRig({
            id,
            spec,
            body: perf.bodyAt(id, t),
            pose: life,
            pxPerUnit: scale,
            strokePx: 3.4,
            headLag: sec.headLag,
            handLag: sec.handLag,
            hairLag: sec.hairLag,
            mouthDrive: life.mouthOpen,
            blinkAmount: blink,
        }));
    }
    const vb = viewBox.split(/[ ,]+/).map(Number);
    const cx = vb[0] + vb[2] / 2;
    const cy = vb[1] + vb[3] / 2;
    const rot = shake.rot;
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}" width="${width}" height="${height}">
  <g transform="rotate(${rot.toFixed(3)} ${cx.toFixed(1)} ${cy.toFixed(1)})">
  ${backgroundFor(t, scene?.label ?? "scene")}
  <g id="characters">${figures.join("\n")}</g>
  </g>
  ${subtitleLayer(t, transcript)}
  ${flash > 0.002 ? `<rect x="${vb[0]}" y="${vb[1]}" width="${vb[2]}" height="${vb[3]}" fill="#ffffff" opacity="${flash.toFixed(3)}"/>` : ""}
</svg>`;
    return {
        svg,
        viewBox,
        zoom: pose.zoom,
        sceneId: String(scene?.label ?? "scene"),
        trauma,
        subtitle: wordAt(transcript.words, t)?.text ?? "",
    };
}

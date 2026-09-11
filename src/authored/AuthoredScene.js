/**
 * AuthoredScene: the coding agent is the director.
 *
 * A deterministic engine can only restage what its catalogs already contain,
 * so every new script collapses to the same rooms, rigs, and five camera
 * moves. This layer inverts that: each covered second of audio gets a
 * bespoke scene module, written by the directing agent for that script's
 * jokes, staging bespoke SVG + motion + camera in code per beat.
 *
 * Contract per scene:
 * - `intent` is required prose: what joke this serves and why the camera
 *   does what it does. A move without a stated motive fails the gate.
 * - `renderWorld(t)` returns full-bleed world SVG for an absolute film
 *   time `t` (seconds). It may reuse catalog renderers (backgrounds,
 *   rigs, props) as raw material, but the choreography is bespoke.
 * - `camera(t)` returns the frame center + zoom at time `t`.
 * - The film is covered with NO gaps: `coverage()` fails closed on any
 *   uncovered second inside the declared window.
 */
export const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
/** Smoothstep 0..1. */
export const smooth = (t) => {
    const k = clamp(t, 0, 1);
    return k * k * (3 - 2 * k);
};
export const lerp = (a, b, t) => a + (b - a) * t;
/** Progress of `t` across `[a, b]` as 0..1, clamped. */
export const span = (t, a, b) => b <= a ? (t >= b ? 1 : 0) : clamp((t - a) / (b - a), 0, 1);
/** Piecewise-smooth camera through authored keyframes (absolute film times). */
export function keyframedCamera(frames) {
    const sorted = [...frames].sort((a, b) => a.at - b.at);
    return (t) => {
        if (t <= sorted[0].at)
            return { x: sorted[0].x, y: sorted[0].y, zoom: sorted[0].zoom };
        for (let i = 0; i < sorted.length - 1; i++) {
            const a = sorted[i];
            const b = sorted[i + 1];
            if (t <= b.at) {
                const k = smooth(span(t, a.at, b.at));
                return { x: lerp(a.x, b.x, k), y: lerp(a.y, b.y, k), zoom: lerp(a.zoom, b.zoom, k) };
            }
        }
        const last = sorted[sorted.length - 1];
        return { x: last.x, y: last.y, zoom: last.zoom };
    };
}
/** Punch bump added on top of a base camera: anticipation dip then snap. */
export function withPunch(base, punchAt, peak = 0.38) {
    return (t) => {
        const c = base(t);
        const dt = t - punchAt;
        let bump = 0;
        if (dt >= -0.25 && dt < -0.05)
            bump = -0.04 * Math.sin(Math.PI * (dt + 0.25) / 0.2);
        else if (dt >= -0.05 && dt < 0)
            bump = peak * 0.15 * (1 + dt / 0.05);
        else if (dt >= 0 && dt < 1.0) {
            const attack = 1 - Math.pow(1 - clamp(dt / 0.12, 0, 1), 3);
            bump = peak * attack * Math.exp(-Math.max(0, dt - 0.12) * 2.4);
        }
        return { x: c.x, y: c.y, zoom: c.zoom + bump };
    };
}
// ---------------------------------------------------------------------------
// Coverage + frame composition (same world-transform math as AutoProduction).
// ---------------------------------------------------------------------------
/** Uncovered sub-windows inside [start, end]; empty means fully directed. */
export function coverageGaps(film, start, end) {
    const segs = [...film.scenes]
        .filter((s) => s.end > start && s.start < end)
        .map((s) => ({ start: Math.max(s.start, start), end: Math.min(s.end, end) }))
        .sort((a, b) => a.start - b.start);
    const gaps = [];
    let cursor = start;
    for (const s of segs) {
        if (s.start > cursor + 1e-6)
            gaps.push({ start: cursor, end: s.start });
        cursor = Math.max(cursor, s.end);
    }
    if (cursor < end - 1e-6)
        gaps.push({ start: cursor, end });
    return gaps;
}
export function sceneAt(film, t) {
    for (const s of film.scenes) {
        if (t >= s.start && t < s.end)
            return s;
        if (t === s.end)
            return s;
    }
    return null;
}
/**
 * Full 1920x1080 frame SVG for absolute film time `t`, with a subtle
 * baked-in vignette (screen-space, above the world). It reads as light
 * falloff rather than an effect pass, and it costs nothing at render.
 */
export const VIGNETTE_OPACITY = 0.16;
export function renderAuthoredFrame(film, t) {
    const scene = sceneAt(film, t);
    if (!scene)
        throw new Error(`no authored scene covers t=${t.toFixed(3)}s`);
    const cam = scene.camera(t);
    const sx = 960 - cam.x * cam.zoom;
    const sy = 540 - cam.y * cam.zoom;
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 1080" width="1920" height="1080">` +
        `<defs><radialGradient id="authored-vignette" cx="0.5" cy="0.46" r="0.75">` +
        `<stop offset="0.62" stop-color="#000000" stop-opacity="0"/>` +
        `<stop offset="1" stop-color="#000000" stop-opacity="${VIGNETTE_OPACITY}"/>` +
        `</radialGradient></defs>` +
        `<g transform="translate(${sx.toFixed(2)} ${sy.toFixed(2)}) scale(${cam.zoom.toFixed(4)})">` +
        scene.renderWorld(t) +
        `</g><rect x="0" y="0" width="1920" height="1080" fill="url(#authored-vignette)"/></svg>`;
}

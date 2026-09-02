/**
 * casually-procedural style pack.
 *
 * Same stick-figure host and palette as casually-explained, but the stage
 * layer is drawn from the procedural asset library driven by SceneMemory —
 * so ANY script gets relevant, moving visuals instead of a 5-card fallback
 * rotation. The curated SVG keyword map is still consulted first when a
 * concept strongly matches a hand-authored asset (that script's gags stay
 * richer), but the default path is now generative, not lookup.
 */
import fs from "node:fs";
import path from "node:path";
import { renderStickFigure } from "../../character/StickFigure";
import { renderProceduralAsset } from "../procedural/assetLibrary";
const esc = (s) => String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
// Curated asset cache (optional enrichment, never the fallback).
const svgCache = {};
const assetDirs = [
    "/root/Desktop/svg_assets/infographics",
    "/root/Desktop/svg_assets/props",
    "/root/Desktop/svg_assets/characters",
    "/root/Desktop/svg_assets/comic_fx",
    "/root/animdsl/examples/assets/props",
];
for (const d of assetDirs) {
    if (!fs.existsSync(d))
        continue;
    for (const f of fs.readdirSync(d)) {
        if (!f.endsWith(".svg"))
            continue;
        try {
            let content = fs.readFileSync(path.join(d, f), "utf8");
            content = content.replace(/<\?xml.*?\?>/, "").replace(/<!DOCTYPE.*?>/, "");
            svgCache[f.replace(/\.svg$/, "").toLowerCase()] = content;
        }
        catch { }
    }
}
// Only these explicit concepts keep their hand-authored artwork; everything
// else is drawn procedurally. (Lookup is exact-keyword, never time-based.)
const CURATED = {
    ozempic: "ozempic_injection_pen",
    botox: "botox_syringe",
    syringe: "botox_syringe",
    bitcoin: "bitcoin_coin_vector",
    crypto: "bitcoin_coin_vector",
    bread: "crossed_bread_loaf",
    carbs: "crossed_bread_loaf",
    broccoli: "steamed_broccoli",
    pasta: "crossed_pasta_bowl",
    pizza: "crossed_pizza_slice",
    cheese: "cheese_wheel_crossed",
    hollywood: "hollywood_ecosystem_flowchart",
    ecosystem: "hollywood_ecosystem_flowchart",
};
function curatedFor(concept) {
    const c = concept.toLowerCase();
    for (const [kw, key] of Object.entries(CURATED)) {
        if (c.includes(kw) && svgCache[key])
            return svgCache[key];
    }
    return null;
}
function asset(request, state) {
    const x = Number(state.x ?? 1320), y = Number(state.y ?? 480), scale = Number(state.scale ?? 1);
    const t = Number(state.timeSec ?? 0);
    const label = String(state.label ?? "");
    if (request.kind === "label" || request.semantic === "subtitle") {
        if (request.semantic !== "subtitle")
            return "";
        const text = esc(label);
        if (!text)
            return "";
        return `<g transform="translate(960 1010)"><rect x="-430" y="-28" width="860" height="56" rx="14" fill="#ffffff" fill-opacity="0.97" stroke="#111827" stroke-width="4"/><text y="10" text-anchor="middle" font-family="Comic Sans MS, Arial, sans-serif" font-size="24" font-weight="bold" fill="#111827">${text}</text></g>`;
    }
    const entry = Math.max(0, Math.min(1, Number(state.entry ?? 1)));
    const exit = Math.max(0, Math.min(1, Number(state.exit ?? 0)));
    const concept = String(state.concept ?? request.semantic ?? "");
    const kind = String(state.kind ?? "generic");
    const curated = curatedFor(concept);
    if (curated) {
        const e = entry * entry * (3 - 2 * entry);
        const pop = 0.85 + 0.15 * e;
        return `<g transform="translate(${x} ${y}) scale(${(scale * pop * (1 - exit * 0.3)).toFixed(3)})" opacity="${(1 - exit).toFixed(3)}"><g transform="translate(-300 -225)">${curated}</g></g>`;
    }
    return renderProceduralAsset({
        x, y, scale, entry, exit,
        age: Math.max(0, t - Number(state.spawnAt ?? t)),
        energy: Number(state.energy ?? 0.4),
        concept, kind,
        slot: Number(state.slot ?? 0),
    });
}
export const casuallyProceduralStyle = {
    id: "casually-procedural",
    version: "1.0.0",
    palette: {
        background: "#fbfaf7",
        foreground: "#edf0ea",
        ink: "#111827",
        muted: "#64748b",
        accent: "#e0533d",
        accent2: "#3b82c4",
        shadow: "#0f172a",
    },
    motion: {
        preferredEntrances: ["pop", "scale", "stamp", "drop"],
        preferredExits: ["scale", "whip"],
        punchScale: 1.15,
        reactionScale: 1.25,
        maxStaticHoldSec: 0.5,
        minimumMeaningfulMotionSec: 0.18,
        cameraEnergy: 0.9,
        squash: 0.08,
        overshoot: 0.08,
    },
    edit: {
        shotKinds: ["wide", "host", "subject", "insert", "macro", "reaction"],
        transitionKinds: ["cut", "punch", "whip", "drift"],
        preferredCutRangeSec: [0.45, 1.8],
        punchlineHoldSec: 0.4,
        reactionHoldSec: 0.45,
        maximumShotSec: 2.5,
    },
    renderAsset: asset,
    renderActor: ({ actorId, state, timeSec }) => renderStickFigure(actorId, { ...state, timeSec }),
    resolveMotion: (intent, intensity = 0.5) => {
        if (intent === "reveal")
            return { entrance: "pop", overshoot: 0.08, squash: 0.06 };
        if (intent === "impact")
            return { move: "punch", amount: 1 + intensity * 0.35 };
        if (intent === "reaction")
            return { move: "punch", amount: 0.8 + intensity * 0.25 };
        return { move: "drift", amount: 0.2 };
    },
    resolveEdit: (intent, intensity = 0.5) => {
        if (intent === "punchline")
            return { shotKind: "reaction", transition: "punch", hold: 0.4 };
        if (intent === "reaction")
            return { shotKind: "reaction", transition: "cut", hold: 0.45 };
        if (intent === "reveal")
            return { shotKind: intensity > 0.7 ? "macro" : "insert", transition: "punch" };
        return { shotKind: "host", transition: "cut" };
    },
    renderEnvironment: () => `
    <rect x="-5000" y="-5000" width="12000" height="12000" fill="#fbfaf7"/>
    <rect x="-5000" y="740" width="12000" height="2000" fill="#edf0ea"/>
    <line x1="-5000" y1="740" x2="5000" y2="740" stroke="#d5dbd4" stroke-width="6"/>
  `,
};

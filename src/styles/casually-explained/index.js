import fs from "node:fs";
import path from "node:path";
import { renderStickFigure } from "../../character/StickFigure";
import { renderProceduralAsset } from "../procedural/assetLibrary";
const esc = (s) => String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
// Load and cache all SVG assets
const svgCache = {};
const assetDirs = [
    "/root/Desktop/svg_assets/infographics",
    "/root/Desktop/svg_assets/props",
    "/root/Desktop/svg_assets/characters",
    "/root/Desktop/svg_assets/comic_fx",
    "/root/animdsl/examples/assets/props"
];
for (const d of assetDirs) {
    if (fs.existsSync(d)) {
        for (const f of fs.readdirSync(d)) {
            if (f.endsWith(".svg")) {
                const key = f.replace(/\.svg$/, "").toLowerCase();
                try {
                    let content = fs.readFileSync(path.join(d, f), "utf8");
                    // Extract inner SVG content or viewBox
                    content = content.replace(/<\?xml.*?\?>/, "").replace(/<!DOCTYPE.*?>/, "");
                    svgCache[key] = content;
                }
                catch (e) { }
            }
        }
    }
}
// Topic to asset key mapping
const KEYWORD_MAP = {
    hollywood: "hollywood_ecosystem_flowchart",
    ecosystem: "hollywood_ecosystem_flowchart",
    shift: "timeline_velocity_slider",
    red_carpet: "prop_00m00s_00m03s_P0_jNSMuYIMuPhn",
    instagram: "prop_00m03s_00m10s_P1_asDVjYVAUHos",
    feed: "prop_00m03s_00m10s_P1_asDVjYVAUHos",
    jenna: "prop_00m16s_00m23s_P0_dE2sYmsioUfQ",
    ortega: "prop_00m16s_00m23s_P0_dE2sYmsioUfQ",
    celebrity: "prop_00m23s_00m32s_P1_Cnu1VBm6CjgF",
    leaner: "forensic_lean_audit_hud",
    thicc: "timeline_velocity_slider",
    stick: "timeline_velocity_slider",
    crypto: "bitcoin_coin_vector",
    intelligence: "ai_lanyard_badge",
    ai: "ai_lanyard_badge",
    tech_bro: "ai_lanyard_badge",
    unsubscribe: "carbs_unsubscribe_modal",
    carbohydrates: "crossed_bread_loaf",
    lunch: "carbs_unsubscribe_modal",
    tim_burton: "victorian_medical_report",
    ps1: "rpg_character_creator_ui",
    graphics: "rpg_character_creator_ui",
    "90s": "beauty_pendulum_gauge",
    kate_moss: "prop_00m57s_01m05s_P0_rdCuAj7HPqpT",
    diet_coke: "diet_coke_can",
    bbl: "structural_hourglass_failure",
    butt: "prop_01m33s_01m40s_P1_HvCAhEVoWRYN",
    hourglass: "structural_hourglass_failure",
    body_positivity: "corporate_body_positivity_ad",
    glp1: "glp1_gastric_mechanism",
    ozempic: "ozempic_injection_pen",
    drug: "prop_02m31s_02m41s_P1_lCjXRUP5yfZ0",
    low_rise: "miu_miu_micro_belt",
    baby_tee: "napkin_baby_tee",
    miu_miu: "miu_miu_price_breakdown",
    injection: "ozempic_injection_pen",
    workout: "prop_03m35s_03m52s_P1_Y8l8IyB58IsV",
    appetite: "stop_procrastinating_pill",
    chicken: "unseasoned_chicken_breast",
    broccoli: "steamed_broccoli",
    marvel: "mcu_dehydration_protocol",
    dehydration: "water_gallon_jug",
    steroid: "steroid_discipline_vial",
    buccal: "buccal_fat_anatomy_diagram",
    cheekbone: "sharp_cheekbone_deli_slice",
    surgery: "scalpel_surgical",
    ozempic_face: "ozempic_face_comparison",
    volume_loss: "hollowed_pumpkin_buccal",
    botox: "botox_syringe",
    frozen: "botox_syringe",
    pricing: "monthly_economic_receipt",
    concierge: "excel_financial_projections",
    cost: "excel_financial_projections"
};
function findBestAsset(semantic, label, timeSec) {
    const norm = (semantic + " " + label).toLowerCase().replace(/[^a-z0-9]+/g, "_");
    for (const [kw, assetKey] of Object.entries(KEYWORD_MAP)) {
        if (norm.includes(kw) && svgCache[assetKey]) {
            return svgCache[assetKey];
        }
    }
    // Try direct key
    if (svgCache[norm])
        return svgCache[norm];
    // Try finding timestamp prop
    const m = Math.floor(timeSec / 60);
    const s = Math.floor(timeSec % 60);
    const timePrefix = `prop_${String(m).padStart(2, "0")}m`;
    for (const [k, v] of Object.entries(svgCache)) {
        if (k.startsWith(timePrefix)) {
            return v;
        }
    }
    // Fallback to top infographics
    const fallbackKeys = ["hollywood_ecosystem_flowchart", "beauty_pendulum_gauge", "carbs_unsubscribe_modal", "ozempic_face_comparison", "glp1_gastric_mechanism"];
    const pick = fallbackKeys[Math.floor(timeSec / 20) % fallbackKeys.length];
    return svgCache[pick] || null;
}
function asset(request, state) {
    const x = Number(state.x ?? 1320), y = Number(state.y ?? 480), scale = Number(state.scale ?? 1), t = Number(state.timeSec ?? 0);
    const k = String(request.semantic || "");
    const label = String(state.label || "");
    if (request.kind === "label" || k === "subtitle") {
        // Only render clean styled subtitle line
        if (k === "subtitle") {
            const text = esc(label);
            if (!text)
                return "";
            return `<g transform="translate(960 1010)"><rect x="-420" y="-28" width="840" height="56" rx="14" fill="#ffffff" fill-opacity="0.92" stroke="#111827" stroke-width="4"/><text y="10" text-anchor="middle" font-family="Arial, sans-serif" font-size="24" font-weight="bold" fill="#111827">${text}</text></g>`;
        }
        // Suppress raw word labels
        return "";
    }
    const entry = Math.max(0, Math.min(1, Number(state.entry ?? 1)));
    const pop = 0.88 + 0.12 * (entry * entry * (3 - 2 * entry));
    const common = `translate(${x} ${y}) scale(${scale * pop * 1.15})`;
    const svgContent = findBestAsset(k, label, t);
    if (svgContent) {
        // Parse width/height if available, or center in 600x450 box
        return `<g transform="${common}"><g transform="translate(-300 -225)">${svgContent}</g></g>`;
    }
    // Robust procedural vector fallback with rich puppets
    return renderProceduralAsset({
        x, y, scale, entry, exit: Math.max(0, Math.min(1, Number(state.exit ?? 0))),
        age: Math.max(0, t - Number(state.spawnAt ?? t)),
        energy: Number(state.energy ?? 0.4),
        concept: String(state.concept ?? k),
        kind: String(state.kind ?? "generic"),
        slot: Number(state.slot ?? 0),
    });
}
export const casuallyExplainedStyle = {
    id: "casually-explained",
    version: "2.0.0",
    palette: {
        background: "#fbfaf7",
        foreground: "#edf0ea",
        ink: "#111827",
        muted: "#64748b",
        accent: "#111827",
        accent2: "#334155",
        shadow: "#0f172a"
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
        overshoot: 0.08
    },
    edit: {
        shotKinds: ["wide", "host", "subject", "insert", "macro", "reaction"],
        transitionKinds: ["cut", "punch", "whip", "drift"],
        preferredCutRangeSec: [0.45, 1.8],
        punchlineHoldSec: 0.4,
        reactionHoldSec: 0.45,
        maximumShotSec: 2.5
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
    renderEnvironment: (timeSec) => `
    <rect x="-5000" y="-5000" width="12000" height="12000" fill="#fbfaf7"/>
    <rect x="-5000" y="740" width="12000" height="2000" fill="#edf0ea"/>
    <line x1="-5000" y1="740" x2="5000" y2="740" stroke="#d5dbd4" stroke-width="6"/>
  `,
};

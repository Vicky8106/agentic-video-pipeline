/**
 * AssetLibrary — materialize the rig matrix into real SVG files.
 *
 * The engine renders procedurally, but production needs a REAL library on
 * disk: characters (male + female), expressions, poses, backgrounds, props.
 * This module enumerates the engine's own parameter space and writes each
 * combination as a standalone SVG with a JSON manifest — so what's on disk
 * is exactly what renders on screen.
 *
 * Target: 300+ assets (user spec), composed as:
 *   - 10 ensemble characters x 8 expressions each  = 80 character assets
 *   - 98 rig expressions                            = 98 expression assets
 *   - 8 poses x 2 genders                            = 16 pose assets
 *   - 14 backgrounds (animated variants @ 2 phases)  = 28 background assets
 *   - 36 props (2 keyframe phases each)             = 72 prop assets
 *   - 14 sitcom two-shot staging diagrams            = 14 staging assets
 *                                                                         = 308
 */
import fs from "fs";
import path from "path";
import { renderStickFigure } from "../character/StickFigure";
import { renderBackground } from "../assets/BackgroundLibrary";
import { renderProp } from "../assets/PropLibrary";
import { ENSEMBLE, castForBeat } from "./SitcomCast";
import type { CharacterExpressionId } from "../character/StickFigure";

// Rig-driven catalog (must match StickFigure.ts exactly)
const EXPRESSIONS: CharacterExpressionId[] = [
  "disgust_subtle", "disgust_gag", "disgust_side_glance", "cringe_full", "cringe_teeth_grit",
  "disgust_eyebrow_raise", "disgust_shudder", "disgust_vomit_rainbow", "disgust_look_down", "disgust_pinched_nose",
  "fear_sweat_freeze", "fear_trembling", "fear_hiding", "fear_screaming", "fear_panic_run",
  "fear_soul_leaving", "fear_goosebumps", "fear_wide_eyed_frozen", "fear_crying_plea", "fear_surrender",
  "frustration_facepalm", "frustration_double_facepalm", "frustration_groan", "frustration_rubbing_temples", "frustration_sigh",
  "frustration_eye_roll", "frustration_teeth_grind", "frustration_slumping", "frustration_head_in_hands", "frustration_why_god_why",
  "rage_furious_screaming", "rage_laser_eyes", "rage_steam_ears", "rage_clenched_fists", "rage_table_flip",
  "rage_vein_pop", "rage_flame_aura", "rage_biting_fist", "rage_finger_jabbing", "rage_eye_twitch",
  "deadpan_classic", "deadpan_slow_blink", "deadpan_soul_stare", "deadpan_sipping_coffee", "deadpan_shrug",
  "deadpan_chin_rest", "deadpan_subtle_nod", "deadpan_side_glance", "deadpan_phone_scroll", "deadpan_unbothered",
  "smug_rock_eyebrow", "smug_finger_guns", "smug_peace_sign", "smug_hands_behind_head", "smug_glasses_push",
  "smug_chuckle", "smug_thumbs_up", "smug_sipping_tea", "smug_sarcastic_clap", "smug_chef_kiss",
  "confused_tilted_head", "confused_squint", "confused_chin_scratch", "confused_math_equations", "confused_magnifier",
  "skeptical_side_eye", "skeptical_raised_brow", "skeptical_hand_on_hip", "confused_double_take", "confused_shrug_what",
  "shock_jaw_drop", "shock_eye_pop", "shock_lightning_bolt", "shock_spit_take", "shock_home_alone",
  "shock_exclamation", "shock_hair_stand", "shock_monocle_drop", "shock_faint_backward", "shock_speed_zoom",
  "mind_blown_explosion", "mind_blown_galaxy_brain", "sparkle_anime_eyes", "dollar_eyes_greed", "euphoria_angel_wings",
  "laughing_fountain_tears", "manic_laughter", "hypnotized_spirals", "laser_burst_prismatic", "blissful_serenity",
  "crying_waterfalls", "sad_pout", "exhausted_melting", "sleepy_yawn", "sleeping_drool",
  "defeated_face_down", "tiny_violin", "dark_circles_insomnia", "sad_rain_cloud", "knocked_out_stars",
];

const POSES = ["default", "shrug", "point_camera", "facepalm", "hands_on_hips", "crossed_arms", "mind_blown", "waving"] as const;

const BACKGROUNDS = [
  "BG-STUDIO", "BG-HOLLYWOOD", "BG-CINEMA", "BG-90S", "BG-Y2K", "BG-GYM",
  "BG-CLINIC", "BG-RETRO", "BG-GOTHIC", "BG-TRIBUNAL", "BG-OFFICE", "BG-KITCHEN", "BG-AUDIENCE", "BG-END",
];

const PROPS = [
  "PROP-PHONE", "PROP-CAM", "PROP-RED", "PROP-SCREEN", "PROP-PEND", "PROP-FOOD", "PROP-MONEY",
  "PROP-MED", "PROP-BROWSER", "PROP-CLOCK", "PROP-GYM", "PROP-FACE", "PROP-GAME", "PROP-BAT",
  "PROP-EMAIL", "PROP-BELL", "PROP-SCALE", "PROP-WATER", "PROP-WALK", "PROP-BOT", "PROP-TEARS",
  "PROP-SUB", "PROP-CARB", "PROP-BILLBOARD", "PROP-LOOP", "PROP-SHIELD", "PROP-MIRROR", "PROP-MARVEL",
  "PROP-SURGERY", "PROP-DELI", "PROP-CONTRACT", "PROP-QUESTION", "PROP-OUTSOURCE", "PROP-TRIAL", "PROP-ROSE", "PROP-GRID",
];

const esc = (s: string) => String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

function svgWrap(body: string, w = 480, h = 480): string {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}">
  <defs>
    <filter id="cardShadow" x="-20%" y="-20%" width="140%" height="140%"><feDropShadow dx="0" dy="6" stdDeviation="10" flood-color="#000" flood-opacity="0.14"/></filter>
    <filter id="impactShadow" x="-30%" y="-30%" width="160%" height="160%"><feDropShadow dx="0" dy="10" stdDeviation="14" flood-color="#000" flood-opacity="0.3"/></filter>
  </defs>
${body}
</svg>`;
}

/** Wrap a figure SVG fragment (which includes its own <g>) into a card. */
function figureCard(inner: string, w = 480, h = 480): string {
  return svgWrap(`
  <rect x="8" y="8" width="${w - 16}" height="${h - 16}" rx="18" fill="#ffffff" stroke="#e2e8f0" stroke-width="4" filter="url(#cardShadow)"/>
  <g transform="translate(${w / 2} ${h / 2 + 60})">${inner}</g>`, w, h);
}

export interface ManifestEntry {
  id: string;
  category: string;
  file: string;
  meta: Record<string, string>;
}

export function generateAssetLibrary(outDir: string): { total: number; manifest: ManifestEntry[] } {
  const manifest: ManifestEntry[] = [];
  const write = (id: string, category: string, svg: string, meta: Record<string, string> = {}) => {
    const dir = path.join(outDir, category);
    fs.mkdirSync(dir, { recursive: true });
    const file = `${id}.svg`;
    fs.writeFileSync(path.join(dir, file), svg);
    manifest.push({ id, category, file, meta });
  };

  // 1) Ensemble characters × signature expressions (10 cast × 8 expr = 80)
  const CAST_EXPRESSIONS = [
    "deadpan_classic", "skeptical_side_eye", "shock_jaw_drop", "confused_tilted_head",
    "smug_rock_eyebrow", "frustration_eye_roll", "laughing_fountain_tears", "mind_blown_explosion",
  ];
  for (const member of ENSEMBLE) {
    for (const expr of CAST_EXPRESSIONS) {
      const svg = figureCard(
        renderStickFigure(`asset-${member.actorId}-${expr}`, {
          x: 0, y: 0, scale: 0.95,
          gender: member.gender as any, hairStyle: member.hairStyle as any, clothes: member.clothes as any,
          eyelashes: member.eyelashes, blush: member.blush,
          expression: expr as any, timeSec: 2.5,
        }),
      );
      write(`${member.actorId}__${expr}`, "characters", svg, {
        archetype: member.archetype, gender: member.gender, hair: member.hairStyle, clothes: member.clothes, expression: expr,
      });
    }
  }

  // 2) Full expression catalog on the host (98 expression assets)
  for (const expr of EXPRESSIONS) {
    const svg = figureCard(
      renderStickFigure(`asset-host-${expr}`, {
        x: 0, y: 0, scale: 0.95, gender: "male", hairStyle: "host_classic",
        expression: expr, timeSec: 2.5,
      }),
    );
    write(`host__${expr}`, "expressions", svg, { gender: "male", hair: "host_classic", expression: expr });
  }

  // 3) Poses × genders (8 × 2 = 16)
  for (const pose of POSES) {
    for (const gender of ["male", "female"] as const) {
      const svg = figureCard(
        renderStickFigure(`asset-pose-${gender}-${pose}`, {
          x: 0, y: 0, scale: 0.95, gender,
          hairStyle: gender === "female" ? "female_ponytail" : "host_classic",
          clothes: gender === "female" ? "dress_pink" : "tshirt",
          pose, expression: "deadpan_classic", timeSec: 2.5,
          eyelashes: gender === "female", blush: gender === "female",
        }),
      );
      write(`${gender}__pose__${pose}`, "poses", svg, { gender, pose });
    }
  }

  // 4) Backgrounds × 2 animation phases (14 × 2 = 28)
  for (const bg of BACKGROUNDS) {
    for (const phase of [0, 2.5]) {
      const svg = svgWrap(renderBackground(bg, { timeSec: phase }), 960, 540);
      write(`${bg}__t${phase.toString().replace(".", "_")}`, "backgrounds", svg, { bg, phase: String(phase) });
    }
  }

  // 5) Props × 2 keyframe phases (37 × 2 = 74)
  for (const prop of PROPS) {
    for (const phase of [0, 1.2]) {
      const svg = svgWrap(renderProp(prop, { x: 240, y: 270, scale: 0.85, timeSec: phase }), 480, 540);
      write(`${prop}__t${phase.toString().replace(".", "_")}`, "props", svg, { prop, phase: String(phase) });
    }
  }

  // 6) Sitcom staging diagrams: host + co-star two-shots (14)
  const STAGING = [
    { id: "twoshot_host_left", label: "Host left, co-star stage-right", layout: "host-left" },
    { id: "twoshot_host_right", label: "Host right, co-star stage-left", layout: "host-right" },
    { id: "twoshot_both_center", label: "Both center — sit-down bit", layout: "center" },
    { id: "twoshot_reveal_right", label: "Co-star reveals prop", layout: "reveal" },
    { id: "twoshot_reaction_cut", label: "Reaction cut to co-star", layout: "reaction" },
    { id: "twoshot_escalation", label: "Escalation lean-in", layout: "escalation" },
    { id: "twoshot_punchline", label: "Punchline hold", layout: "punchline" },
    { id: "twoshot_walk_in", label: "Co-star walk-in entrance", layout: "walkin" },
    { id: "twoshot_walk_out", label: "Co-star walk-off exit", layout: "walkout" },
    { id: "twoshot_group", label: "Group shot with props", layout: "group" },
    { id: "twoshot_lean_back", label: "Both lean back shocked", layout: "leanback" },
    { id: "twoshot_face_off", label: "Face-off standoff", layout: "faceoff" },
    { id: "twoshot_sit_desk", label: "Sitcom desk bit", layout: "desk" },
    { id: "twoshot_split_screen", label: "Split-screen compare", layout: "split" },
  ];
  for (const s of STAGING) {
    const member = castForBeat(STAGING.indexOf(s));
    const hostX = s.layout === "host-right" ? 1250 : s.layout === "center" ? 760 : 450;
    const coX = s.layout === "host-right" ? 450 : s.layout === "center" ? 1160 : 1250;
    const coExpr = s.layout === "reaction" ? "shock_jaw_drop" : s.layout === "punchline" ? "skeptical_side_eye" : "deadpan_classic";
    const svg = svgWrap(`
  <rect x="8" y="8" width="944" height="524" rx="14" fill="#fbfaf7" stroke="#e2e8f0" stroke-width="4"/>
  <text x="480" y="52" text-anchor="middle" font-family="Noto Sans" font-size="26" font-weight="bold" fill="#111827">${esc(s.label)}</text>
  ${renderBackground("BG-STUDIO", { timeSec: 2.5 })}
  ${renderStickFigure("stage-host", { x: hostX, y: 560, scale: 0.72, gender: "male", hairStyle: "host_classic", expression: "deadpan_classic", timeSec: 2.5, gazeTarget: { x: coX, y: 520 } })}
  ${renderStickFigure("stage-costar", { x: coX, y: 560, scale: 0.72, gender: member.gender as any, hairStyle: member.hairStyle as any, clothes: member.clothes as any, eyelashes: member.eyelashes, blush: member.blush, expression: coExpr as any, timeSec: 2.5, gazeTarget: { x: hostX, y: 520 } })}`, 960, 540);
    write(s.id, "staging", svg, { layout: s.layout, label: s.label });
  }

  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(path.join(outDir, "manifest.json"), JSON.stringify({
    generator: "casually_engine_v7 AssetLibrary",
    count: manifest.length,
    generatedAt: new Date().toISOString(),
    entries: manifest,
  }, null, 2));

  return { total: manifest.length, manifest };
}

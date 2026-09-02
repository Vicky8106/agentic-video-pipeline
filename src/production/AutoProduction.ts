// @ts-nocheck
/**
 * Autonomous procedural movie director.
 *
 * Product contract: audio + SRT -> a continuously animated 2D comedy movie.
 * The renderer consumes the style-neutral ProductionPlan.  It does not decide
 * story semantics or hard-code a particular creator's artwork.
 */
import { direct } from "../director/Director.js";
import { compileProductionPlan } from "../core/ProductionCompiler.js";
import { buildTranscript } from "../subtitles/Transcript.js";
import { parseSrt } from "../subtitles/SrtParser.js";
import { cameraAt, traumaAt, shakeAt, flashAt } from "../camera/CameraTrack.js";
import { STYLE_REGISTRY, resolveStyle } from "../styles/index.js";
import { buildStageObjects, stageAtTime, type StageObject, type StageObjectState } from "./SceneMemory.js";
import { renderSitcomLayer, computeCoStarPresence } from "./SitcomCast.js";
import { pickPunchWord, impactWordState, renderImpactWord } from "./ImpactTypography.js";
const clamp = (v, a = 0, b = 1) => Math.max(a, Math.min(b, v));
const lerp = (a, b, t) => a + (b - a) * t;
const smooth = t => t * t * (3 - 2 * t);
const esc = s => String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const norm = s => String(s || "").toLowerCase();
function activeWord(tr, t) { for (const w of tr.words) {
    if (t >= w.start && t < w.end)
        return w;
    if (w.start > t)
        break;
} return null; }
function activeCue(tr, t) { for (const c of tr.cues)
    if (t >= c.start && t <= c.end)
        return c; return null; }
function sentenceAt(tr, t) { for (const s of tr.sentences)
    if (t >= s.start && t <= s.end)
        return s; return null; }
function shotAt(plan, t) { let s = plan.resolved[0]; for (const x of plan.resolved) {
    if (t >= x.start)
        s = x;
    else
        break;
} return s; }
function beatAt(production, t) { const bs = production.productionPlan?.beats ?? []; let b = bs[0] ?? null; for (const x of bs) {
    if (t >= x.start && t <= x.end) {
        b = x;
        break;
    }
    if (x.start > t)
        break;
} return b; }
function actionsAt(production, t, w = .025) { return (production.productionPlan?.beats ?? []).flatMap(b => b.actions).filter(a => t >= a.start - w && t <= a.end + w); }
function actionProgress(a, t) { return clamp((t - a.start) / Math.max(.001, a.end - a.start)); }
function latestBeatIndex(production, t) { let i = -1; for (let n = 0; n < production.productionPlan.beats.length; n++) {
    if (production.productionPlan.beats[n].start <= t)
        i = n;
    else
        break;
} return i; }
function semanticVisualPosition(index, side = 1) {
    const cols = [[1250, 510], [1080, 450], [1390, 540], [1180, 560], [1450, 470]];
    const p = cols[Math.abs(index) % cols.length];
    return { x: p[0] + (side < 0 ? -160 : 0), y: p[1] };
}
// Expression families the rig understands, grouped by beat role. Rotation is
// deterministic per beat index so the host never repeats the same face twice
// in a row (the old code pinned deadpan_classic to every single beat).
const ROLE_EXPRESSIONS: Record<string, string[]> = {
  setup: ["deadpan_classic", "smug_rock_eyebrow", "deadpan_subtle_nod", "confused_tilted_head"],
  explanation: ["skeptical_raised_brow", "deadpan_side_glance", "confused_chin_scratch", "smug_thumbs_up"],
  reveal: ["sparkle_anime_eyes", "shock_exclamation", "smug_finger_guns", "confused_magnifier"],
  escalation: ["frustration_eye_roll", "rage_steam_ears", "shock_jaw_drop", "cringe_teeth_grit"],
  punchline: ["deadpan_classic", "deadpan_slow_blink", "deadpan_shrug", "smug_chuckle"],
  reaction: ["deadpan_slow_blink", "skeptical_side_eye", "confused_double_take", "defeated_face_down"],
  button: ["smug_chef_kiss", "deadpan_unbothered", "blissful_serenity", "smug_peace_sign"],
  transition: ["sleepy_yawn", "deadpan_phone_scroll", "exhausted_melting", "deadpan_sipping_coffee"],
};
function expressionFor(actions, beat, speaking, beatIndex = 0) {
  const role = beat?.role || "explanation";
  const family = ROLE_EXPRESSIONS[role] ?? ROLE_EXPRESSIONS.explanation;
  let expr = family[Math.abs(beatIndex) % family.length];
  for (const a of actions) {
    if (a.type !== "express")
      continue;
    const e = String(a.payload?.expression || "");
    if (e === "surprised")
      expr = "shock_eye_pop";
    else if (e)
      expr = e;
  }
  return expr;
}
function actorState(tr, t, shot, production) {
    const beat = beatAt(production, t);
    const actions = actionsAt(production, t);
    const w = activeWord(tr, t);
    const speaking = !!w;
    const sentence = sentenceAt(tr, t);
    const role = beat?.role || "explanation";
    const energy = beat?.energy ?? .3;
    const reveal = actions.find(a => a.type === "reveal");
    const point = actions.find(a => a.type === "point");
    const look = actions.find(a => a.type === "lookAt");
    const walk = actions.find(a => a.type === "walkTo" || a.type === "enter");
    const gestureActions = actions.filter(a => a.type === "gesture");
    const g = gestureActions.reduce((sum, a) => sum + Number(a.payload?.amount ?? .5) * (.6 + .4 * actionProgress(a, t)), 0);
    const impact = actions.some(a => a.type === "camera" && (a.payload?.move === "punch" || a.payload?.move === "impact" || a.payload?.move === "shake"));
    const visualIndex = latestBeatIndex(production, t);
    const liveStage = stageAtTime(production.stageObjects ?? [], t).filter(o => o.entry > 0.4);
    const focusObj = liveStage.length ? liveStage[liveStage.length - 1] : null;
    const visual = focusObj ? { x: focusObj.x, y: focusObj.y } : semanticVisualPosition(visualIndex, 1);
    let expression = expressionFor(actions, beat, speaking, visualIndex);
    let pose = "default";
    if (expression?.startsWith("shock") || expression?.startsWith("mind_blown"))
        pose = "mind_blown";
    else if (expression?.startsWith("frustration"))
        pose = "facepalm";
    else if (expression?.startsWith("skeptical") || expression?.startsWith("confused"))
        pose = "crossed_arms";
    else if (expression?.startsWith("smug"))
        pose = "hands_on_hips";
    if (point)
        pose = "point_camera";
    if (gestureActions.some(a => String(a.payload?.gesture) === "anticipate"))
        pose = "shrug";
    if (role === "reaction" && !point)
        pose = expression?.startsWith("shock") ? "mind_blown" : "deadpan";
    const sentenceProgress = sentence ? clamp((t - sentence.start) / Math.max(.1, sentence.end - sentence.start)) : 0;
    const entrance = walk ? clamp(actionProgress(walk, t)) : .0;
    const hostBase = (shot && shot.kind === "reaction") ? 520 : 450;
    const travel = walk ? 90 * Math.sin(entrance * Math.PI) : 0;
    const x = hostBase + travel;
    const speakingBob = speaking ? (Math.sin(t * 11.5) + .35 * Math.sin(t * 19.3)) * 2.1 : 0;
    const deliberateLean = (point ? 7 : 0) + (g * 3) + (role === "escalation" ? 2 : 0);
    const gazeTarget = look?.payload?.target === "camera" ? { x: 960, y: 520 } : visual;
    const pointTarget = point ? visual : undefined;
    const propAction = actions.find(a => a.type === "grab");
    const prop = propAction?.payload?.prop ?? "none";
    return {
        x, y: 650 + speakingBob + Math.sin(t * 1.4) * 1.8, scale: shot?.kind === "reaction" ? 1.38 : 1.24,
        rotation: 0, expression, pose,
        spineLean: Math.sin(t * 1.5) * 1.6 + deliberateLean,
        headTilt: (impact ? -4 : 0) + Math.sin(t * 1.7) * 1.2,
        gazeX: clamp((gazeTarget.x - x) / 520, -1, 1), gazeY: clamp((gazeTarget.y - 560) / 420, -1, 1),
        gazeTarget, pointTarget,
        eyebrowHeight: (speaking ? 3 : 1) + energy * 5 + (role === "punchline" ? 4 : 0),
        eyebrowLeftHeight: role === "punchline" ? 8 : undefined,
        eyebrowRightHeight: role === "punchline" ? 3 : undefined,
        leftArmAngle1: 160 - g * 18, rightArmAngle1: 20 + g * 22,
        leftArmAngle2: -15 + Math.sin(t * 4.1) * 3, rightArmAngle2: 15 - Math.sin(t * 4.1) * 3,
        leftHandProp: prop, rightHandProp: "none",
        pointTarget,
        isWalking: !!walk && entrance < .55,
        leftLegAngle1: 118 + Math.sin(t * 7.5) * 8,
        rightLegAngle1: 62 - Math.sin(t * 7.5) * 8,
        mouthOpen: speaking ? clamp(.18 + .48 * Math.abs(Math.sin(t * 13.7)) + Math.abs(Math.sin(t * 22.1)) * .18) : 0,
        mouthWobble: speaking ? .06 : 0,
        isTalking: speaking, timeSec: t, bodyFacing: "right",
        comicFx: impact ? "impact_lines" : undefined,
    };
}
function renderPersistentVisuals(tr, production, t, style) {
  const objects: StageObject[] = production.stageObjects;
  if (!objects || objects.length === 0) return "";
  const live = stageAtTime(objects, t);
  return live.map(o => renderStageObject(o, style)).join("");
}
function renderStageObject(o: StageObjectState, style) {
  const idleDrift = Math.sin(o.age * 1.3 + o.slot * 2.1) * 6;
  return `<g opacity="1">${style.renderAsset({ id: `stage-${o.key}`, kind: "prop", semantic: o.concept }, {
    x: o.x, y: o.y + idleDrift, scale: o.scale, timeSec: o.age,
    entry: o.entry, exit: o.exit, spawnAt: o.spawnAt,
    energy: o.energy, concept: o.concept, kind: o.kind,
    slot: o.slot,
    label: o.concept,
  })}</g>`;
}
function renderCaption(tr, t, style) {
    const cue = activeCue(tr, t);
    if (!cue)
        return "";
    const w = activeWord(tr, t);
    const words = cue.cleanText.split(/\s+/);
    const idx = w?.indexInCue ?? 0;
    const shown = words.slice(Math.max(0, idx - 2), Math.min(words.length, idx + 3)).join(" ");
    return `<g opacity=".68">${style.renderAsset({ id: "subtitle", kind: "label", semantic: "subtitle" }, { x: 960, y: 1010, timeSec: t, label: shown, accent: style.palette.muted })}</g>`;
}
export function createAutoProduction(srtText, styleId = "casually-procedural") {
    const cues = parseSrt(srtText);
    const transcript = buildTranscript(cues);
    const style = resolveStyle(STYLE_REGISTRY, styleId);
    // Sitcom doctrine: every sentence is its own scene (its own joke unit with
    // setup -> punchline inside it). ~89-100 scenes for a 10-minute script.
    const plan = direct(transcript, { minShot: .48, maxShot: style.edit.maximumShotSec, punchlineHold: style.edit.punchlineHoldSec, maxSentencesPerScene: 1 });
    const productionPlan = compileProductionPlan(transcript, plan, style.id);
    // Persistent stage: concepts accumulate, persist, and retire over time.
    const stageObjects = buildStageObjects(productionPlan.beats.map(b => ({
        id: b.id, start: b.start, end: b.end,
        semantic: b.visual?.semantic ?? "", topic: b.visual?.topic ?? "explain",
        energy: b.energy, role: b.role,
    })));
    // Sitcom presence plan: never more than 2 consecutive beats without a
    // co-star on stage (no dead zones over a 10-minute movie).
    const coStarPresence = computeCoStarPresence(productionPlan.beats.map(b => ({
        id: b.id, start: b.start, end: b.end, role: b.role,
    })));
    return { transcript, plan, productionPlan, style, stageObjects, coStarPresence };
}
export function renderAutoSvgFrame({ production, timeSec, width = 1920, height = 1080 }) {
    const { transcript, plan, productionPlan, style } = production;
    const shot = shotAt(plan, timeSec);
    const pose = cameraAt(plan.resolved, timeSec);
    const impacts = plan.events.filter(e => e.kind === "shake" || e.kind === "flash").map(e => ({ t: e.t, strength: e.kind === "flash" ? .38 : .30, decay: .30, flash: e.kind === "flash" }));
    const trauma = traumaAt(impacts, timeSec);
    const sh = shakeAt(trauma, timeSec, 17);
    const flash = flashAt(impacts, timeSec);
    const active = actionsAt(production, timeSec, .001);
    const punch = active.find(a => a.type === "camera" && (a.payload?.move === "punch" || a.payload?.move === "impact"));
    const punchP = punch ? actionProgress(punch, timeSec) : 0;
    const punchCurve = punch ? Math.sin(Math.PI * punchP) : 0;
    let camX = pose.centerX, camY = pose.centerY, zoom = pose.zoom;
    const beat = beatAt(production, timeSec);
    const beatIndex = latestBeatIndex(production, timeSec);
    // Host + visual beats are composed as a real two-shot. The camera frames
    // the LIVE stage object (from SceneMemory) when one exists, so inserts
    // zoom onto the actual prop that is on screen, not a nominal column.
    const stageNow = stageAtTime(production.stageObjects ?? [], timeSec).filter(o => o.entry > 0.3);
    const focus = stageNow.length ? stageNow[stageNow.length - 1] : null;
    if (beat?.visual || focus) {
        const p = focus ? { x: focus.x, y: focus.y } : semanticVisualPosition(beatIndex, 1);
        if (shot.kind === "host" || shot.kind === "wide") {
            // Two-shot: keep BOTH the host (~x=450) and the prop in frame.
            // Clamp so the host is never cropped at the left edge.
            camX = clamp((960 + p.x) / 2, 880, 1120);
            camY = 560;
            zoom = Math.min(1.08, zoom);
        }
        if (shot.kind === "insert" || shot.kind === "macro" || shot.kind === "subject") {
            camX = p.x;
            camY = p.y;
            zoom = Math.min(1.95, Math.max(1.45, zoom));
        }
    }
    zoom *= 1 + punchCurve * (style.motion.punchScale - .98) * .85;
    if (shot.kind === "reaction") {
        camX = 520;
        camY = 560;
        zoom = Math.min(1.55, Math.max(1.38, zoom));
    }
    const sx = 960 - camX * zoom + sh.x, sy = 540 - camY * zoom + sh.y;
    const worldTransform = `translate(${sx} ${sy}) scale(${zoom}) rotate(${sh.rot} 560 650)`;
    const hostState = actorState(transcript, timeSec, shot, production);
    if (shot.kind === "insert" || shot.kind === "macro")
        hostState.scale *= .96;
    const env = style.renderEnvironment(timeSec, { beatRole: beat?.role, energy: beat?.energy ?? .3, shotKind: shot?.kind });
    const stage = renderPersistentVisuals(transcript, production, timeSec, style);
    const host = style.renderActor({ actorId: "auto-host", state: hostState, timeSec });
    // Sitcom layer: co-star (female/male cast) sharing the stage with the host.
    // Two-shot blocking; reactions timed to the punch moment.
    const punchAction = active.find(a => a.type === "camera" && (a.payload?.move === "punch" || a.payload?.move === "impact"));
    const punchAt = punchAction ? punchAction.start : (beat && (beat.role === "punchline") ? beat.start + (beat.end - beat.start) * 0.55 : null);
    const sitcom = beat ? renderSitcomLayer(timeSec, beat, punchAt, style.renderActor, production.coStarPresence) : "";
    // Impact typography: the punch word SLAMS in exactly as spoken. Slot
    // rotates per beat so the composition varies.
    const beatText = beat?.visual?.semantic ?? "";
    const impactSvg = (() => {
      if (!beat || (beat.role !== "punchline" && beat.role !== "escalation" && !punchAction)) return "";
      const pw = pickPunchWord(beatText);
      if (!pw) return "";
      const st = impactWordState(pw.word, timeSec, punchAt ?? beat.start + 0.3, beat.energy ?? .5, beatIndex);
      return renderImpactWord(st);
    })();
    // No burned-in subtitles: the user asked for a clean video. The caption
    // layer was also the source of the legs/shadow-through-box compositing
    // glitch, so removing it fixes that at the root.
    const flashLayer = flash > 0 ? `<rect x="0" y="0" width="1920" height="1080" fill="${style.palette.foreground}" opacity="${flash * .45}"/>` : "";
    const traumaLayer = trauma > .03 ? `<rect x="0" y="0" width="1920" height="1080" fill="${style.palette.shadow}" opacity="${trauma * .035}"/>` : "";
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 1080" width="${width}" height="${height}">
    <defs><filter id="impactShadow" x="-30%" y="-30%" width="160%" height="160%"><feDropShadow dx="0" dy="10" stdDeviation="14" flood-color="#000" flood-opacity="0.3"/></filter></defs>
    <g transform="${worldTransform}">
      ${env}
      ${stage}
      ${sitcom}
      <g>${host}</g>
    </g>
    ${impactSvg}
    ${flashLayer}${traumaLayer}
  </svg>`;
    return { svg, viewBox: "0 0 1920 1080", shotId: shot.id, mode: beat?.visual?.topic ?? "explain", beatId: beat?.id ?? null };
}

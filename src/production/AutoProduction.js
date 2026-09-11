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
import { buildStageObjects, stageAtTime } from "./SceneMemory.js";
import { renderSitcomLayer, computeCoStarPresence, computeCastRoster } from "./SitcomCast.js";
import { stabilizeBeatBackgrounds } from "../assets/BackgroundLibrary.js";
import { pickPunchWord, impactWordState, renderImpactWord } from "./ImpactTypography.js";
import { isSpeakingAt, mouthOpenAt } from "../audio/Envelope.js";
import { wordAt, buildSentences } from "../subtitles/Transcript.js";
import { resolveWordTimings, punchWordAt } from "../subtitles/WordTiming.js";
import { punchZoomBoost, freezeFactor, impactSquash } from "../camera/GagCamera.js";
import { sheetCovering, sheetAt } from "../director/DirectorSheet.js";
import { renderProp } from "../assets/PropLibrary.js";
import { analyzeComedy } from "../subtitles/ComedyStructure.js";
const clamp = (v, a = 0, b = 1) => Math.max(a, Math.min(b, v));
const lerp = (a, b, t) => a + (b - a) * t;
const smooth = t => t * t * (3 - 2 * t);
const esc = s => String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const norm = s => String(s || "").toLowerCase();
function activeWord(tr, t) {
    for (const w of tr.words) {
        if (t >= w.start && t < w.end)
            return w;
        if (w.start > t)
            break;
    }
    return null;
}
function activeCue(tr, t) {
    for (const c of tr.cues)
        if (t >= c.start && t <= c.end)
            return c;
    return null;
}
function sentenceAt(tr, t) {
    for (const s of tr.sentences)
        if (t >= s.start && t <= s.end)
            return s;
    return null;
}
function shotAt(plan, t) {
    let s = plan.resolved[0];
    for (const x of plan.resolved) {
        if (t >= x.start)
            s = x;
        else
            break;
    }
    return s;
}
function beatAt(production, t) {
    const bs = production.productionPlan?.beats ?? [];
    let b = bs[0] ?? null;
    for (const x of bs) {
        if (t >= x.start && t <= x.end) {
            b = x;
            break;
        }
        if (x.start > t)
            break;
    }
    return b;
}
function actionsAt(production, t, w = .025) { return (production.productionPlan?.beats ?? []).flatMap(b => b.actions).filter(a => t >= a.start - w && t <= a.end + w); }
function actionProgress(a, t) { return clamp((t - a.start) / Math.max(.001, a.end - a.start)); }
function latestBeatIndex(production, t) {
    let i = -1;
    for (let n = 0; n < production.productionPlan.beats.length; n++) {
        if (production.productionPlan.beats[n].start <= t)
            i = n;
        else
            break;
    }
    return i;
}
function semanticVisualPosition(index, side = 1) {
    const cols = [[1250, 510], [1080, 450], [1390, 540], [1180, 560], [1450, 470]];
    const p = cols[Math.abs(index) % cols.length];
    return { x: p[0] + (side < 0 ? -160 : 0), y: p[1] };
}
// Expression families the rig understands, grouped by beat role. Rotation is
// deterministic per beat index so the host never repeats the same face twice
// in a row (the old code pinned deadpan_classic to every single beat).
const ROLE_EXPRESSIONS = {
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
    // Voice truth when an envelope is attached: the mouth follows the
    // recording, not the subtitle grid. Otherwise fall back to word timing.
    const speaking = production.envelope ? isSpeakingAt(production.envelope, t) : !!w;
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
    const coStarPresent = production.coStarPresence?.has(beat?.id ?? "");
    let gazeTarget = look?.payload?.target === "camera" ? { x: 960, y: 520 } : visual;
    if (!look) {
        if (role === "punchline" && beat && t >= beat.start + (beat.end - beat.start) * 0.55) {
            gazeTarget = { x: 960, y: 520 }; // Snap straight into camera lens on punch!
        }
        else if (coStarPresent && (role === "setup" || role === "explanation" || role === "punchline")) {
            gazeTarget = { x: 1250, y: 560 }; // Look towards co-star at stage right
        }
    }
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
        mouthOpen: production.envelope ? mouthOpenAt(production.envelope, t) : (speaking ? clamp(.18 + .48 * Math.abs(Math.sin(t * 13.7)) + Math.abs(Math.sin(t * 22.1)) * .18) : 0),
        mouthWobble: speaking ? .06 : 0,
        isTalking: speaking, timeSec: t, bodyFacing: "right",
        comicFx: impact ? "impact_lines" : undefined,
    };
}
function renderPersistentVisuals(tr, production, t, style) {
    const objects = production.stageObjects;
    if (!objects || objects.length === 0)
        return "";
    const live = stageAtTime(objects, t);
    return live.map(o => renderStageObject(o, style)).join("");
}
function renderStageObject(o, style) {
    const idleDrift = Math.sin(o.age * 1.3 + o.slot * 2.1) * 6;
    // Swaps on one mark cross-fade instead of popping: exiting props yield.
    return `<g opacity="${(1 - o.exit).toFixed(2)}">${style.renderAsset({ id: `stage-${o.key}`, kind: "prop", semantic: o.concept }, {
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
export function createAutoProduction(srtText, styleId = "casually-procedural", opts = {}) {
    const cues = parseSrt(srtText);
    // Word-timing hook: real forced-align timings when a sidecar exists
    // (`--word-timings words.json` or `<script>.words.json`), otherwise the
    // deterministic synthetic distribution. Audio duration stays the master.
    const timing = resolveWordTimings(cues, { sidecar: opts.wordSidecar ?? undefined, srtPath: opts.srtPath ?? undefined });
    const baseTranscript = buildTranscript(cues);
    // Real timings keep the synthetic tokenisation (cue normalisation,
    // sentence flags) and only swap the clock, so every word-level driver
    // below follows the performance instead of the estimate.
    const transcript = timing.source === "forced-align"
        ? { ...baseTranscript, words: timing.words, sentences: buildSentences(timing.words) }
        : baseTranscript;
    const wordTiming = { source: timing.source, sidecar: timing.sidecar, count: transcript.words.length };
    const style = resolveStyle(STYLE_REGISTRY, styleId);
    // Sitcom doctrine: every sentence is its own scene (its own joke unit with
    // setup -> punchline inside it). ~89-100 scenes for a 10-minute script.
    // Drop-in brain FIRST: the director spends its move budget only on
    // evidenced punchlines (motive-gated camera, no fidgeting).
    const comedy = analyzeComedy(transcript);
    const punchSentences = new Set();
    for (const u of comedy.units) {
        const n = comedy.notes.get(u.punchSentence);
        if (u.punchWord && n && n.evidence.total >= 2)
            punchSentences.add(u.punchSentence);
    }
    const roomOfSentence = (si) => {
        for (const u of comedy.units) {
            if (u.sentences.includes(si))
                return u.room;
        }
        return null;
    };
    const roleOfSentence = (si) => comedy.notes.get(si)?.role ?? null;
    // minShot 1.0: a shot that lives under a second is a flicker, not a cut.
    const plan = direct(transcript, { minShot: 1.0, maxShot: style.edit.maximumShotSec, punchlineHold: style.edit.punchlineHoldSec, maxSentencesPerScene: 1, punchSentences, roomOfSentence, roleOfSentence });
    const productionPlan = compileProductionPlan(transcript, plan, style.id, comedy);
    // Analyzer entities per production beat (union over overlapping sentences).
    const beatEntities = (start, end) => {
        const out = new Set();
        for (const s of transcript.sentences) {
            if (s.end > start && s.start < end) {
                for (const e of comedy.notes.get(s.index)?.entities ?? [])
                    out.add(e);
            }
        }
        return [...out];
    };
    const unitRoomAt = (start, end) => {
        let best = null;
        let bestOverlap = 0;
        for (const u of comedy.units) {
            const overlap = Math.min(end, u.end) - Math.max(start, u.start);
            if (overlap > bestOverlap + 1e-9 && u.room) {
                bestOverlap = overlap;
                best = u.room;
            }
        }
        return best;
    };
    // Agent-directed sheet (coding-agent director, --sheet beats.json):
    // validated upstream, matched to production beats by time overlap.
    const sheet = (opts.sheet ?? []).filter((s) => s && s.endSec > s.startSec);
    const sheetFor = (start, end) => sheetCovering(sheet, start, end);
    // Persistent stage: concepts accumulate, persist, and retire over time.
    const stageObjects = buildStageObjects(productionPlan.beats.map(b => ({
        id: b.id, start: b.start, end: b.end,
        semantic: b.visual?.semantic ?? "", topic: b.visual?.topic ?? "explain",
        energy: b.energy, role: b.role,
        dropKinds: sheetFor(b.start, b.end)?.dropKinds ?? [],
    })));
    const srtLower = srtText.toLowerCase();
    let dominantBg = "BG-STUDIO";
    if (/\b(gym|deadlift|workout|bodybuilder|janitor|barbell|weights|fitness|lift|cleaner)\b/.test(srtLower)) {
        dominantBg = "BG-GYM";
    }
    else if (/\b(hollywood|red carpet|celebrity|oscar|actor|movie)\b/.test(srtLower)) {
        dominantBg = "BG-HOLLYWOOD";
    }
    else if (/\b(office|tech|startup|crypto|saas|founder|boss)\b/.test(srtLower)) {
        dominantBg = "BG-OFFICE";
    }
    else if (/\b(clinic|surgery|doctor|medicine|ozempic)\b/.test(srtLower)) {
        dominantBg = "BG-CLINIC";
    }
    // Sitcom presence plan: never more than 2 consecutive beats without a
    // co-star on stage (no dead zones over a 10-minute movie).
    const coStarPresence = computeCoStarPresence(productionPlan.beats.map(b => ({
        id: b.id, start: b.start, end: b.end, role: b.role,
    })));
    // Scene cast roster: keyword entrants persist across beats (no per-beat
    // face pops), computed once so every chunk renders bit-identical frames.
    // The agent sheet wins: its actor look becomes the co-star for covered
    // beats, with a stable id per look so continuations hold the face.
    const castRoster = computeCastRoster(productionPlan.beats.map(b => ({
        id: b.id, start: b.start, end: b.end, role: b.role,
        semantic: b.visual?.semantic ?? "",
        entities: beatEntities(b.start, b.end),
    })), (rb) => {
        const covering = sheetFor(rb.start, rb.end);
        if (!covering)
            return null;
        const a = covering.actor;
        const look = `${a.gender}/${a.hairStyle}/${a.clothes}`;
        return {
            actorId: `sheet-${look}`,
            gender: a.gender,
            hairStyle: a.hairStyle,
            clothes: a.clothes,
            expression: a.expression,
            pose: a.pose,
            archetype: `sheet_directed:${covering.beatId}`,
        };
    });
    // Stable rooms: a joke keeps its setup room through escalation and
    // punchline even when the punchline names a foreign keyword. The agent
    // sheet wins outright for covered beats.
    const beatBackgrounds = stabilizeBeatBackgrounds(productionPlan.beats.map(b => ({
        id: b.id, start: b.start, end: b.end, role: b.role,
        semantic: b.visual?.semantic ?? "",
    })), dominantBg);
    for (const b of productionPlan.beats) {
        const covering = sheetFor(b.start, b.end);
        if (covering)
            beatBackgrounds[b.id] = covering.bgId;
        // Analyzer unit room wins over per-beat keyword matching (it saw the
        // whole joke); the sticky map remains the fallback underneath.
        else {
            const room = unitRoomAt(b.start, b.end);
            if (room)
                beatBackgrounds[b.id] = room;
        }
    }
    return { transcript, plan, productionPlan, style, stageObjects, coStarPresence, castRoster, beatBackgrounds, dominantBg, wordTiming, sheet, comedy, envelope: opts.envelope ?? null };
}
export function renderAutoSvgFrame({ production, timeSec, width = 1920, height = 1080, impactWords = false }) {
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
    // Word-level drivers: the live word on the timing grid, and the beat's
    // punch word located ON that grid (real timings when available, synthetic
    // otherwise). The gag camera grammar builds on these, never on estimates.
    const liveWord = wordAt(transcript.words, timeSec);
    const punchPick = pickPunchWord(beat?.visual?.semantic ?? "");
    const wordPunchAt = punchPick && beat
        ? punchWordAt(transcript.words, punchPick.word, { start: beat.start, end: beat.end })
        : null;
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
            if (focus) {
                camX = p.x;
                camY = p.y;
                zoom = Math.min(1.95, Math.max(1.45, zoom));
            }
            else {
                camX = 640;
                camY = 560;
                zoom = 1.25;
            }
        }
    }
    // Agent-sheet camera intent: steer the base framing toward the directed
    // shot (the word-timed punch boost and grammar below still apply on top).
    const sheetNow = sheetAt((production.sheet ?? []), timeSec);
    if (sheetNow) {
        camX = lerp(camX, clamp(sheetNow.camera.x, 200, 1720), .35);
        camY = lerp(camY, clamp(sheetNow.camera.y, 200, 880), .35);
        zoom = lerp(zoom, clamp(sheetNow.camera.zoom, .8, 2.4), .5);
    }
    zoom *= 1 + punchCurve * (style.motion.punchScale - .98) * .85;
    // Gag grammar: punch-in lands ON the punch word; reaction holds freeze.
    zoom += punchZoomBoost(timeSec, wordPunchAt, beat?.energy ?? .3);
    const freeze = freezeFactor(timeSec, beat ? { start: beat.start, end: beat.end, role: beat.role } : null);
    if (freeze > 0) {
        sh.x *= 1 - freeze;
        sh.y *= 1 - freeze;
        sh.rot *= 1 - freeze;
    }
    // Shake is impact-only: calm beats hold still. A camera that trembles
    // with no impact is not energy, it is a fault.
    const calm = 0.25 + 0.75 * clamp(beat?.energy ?? .3, 0, 1);
    sh.x *= calm;
    sh.y *= calm;
    sh.rot *= calm;
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
    // Impact squash & stretch on the host through the punch hit: swell wide
    // as he crouches, volume preserved. Cartoon impacts telegraph and land.
    if (punchCurve > 0.01) {
        const sq = impactSquash(punchCurve);
        hostState.scaleX = (hostState.scaleX ?? hostState.scale ?? 1) * sq.sx;
        hostState.scaleY = (hostState.scaleY ?? hostState.scale ?? 1) * sq.sy;
    }
    // Stable room for this beat (setup room held through the punchline).
    const beatBg = production.beatBackgrounds?.[beat?.id ?? ""];
    const env = style.renderEnvironment(timeSec, {
        beatRole: beat?.role,
        energy: beat?.energy ?? .3,
        shotKind: shot?.kind,
        semantic: beat?.visual?.semantic ?? "",
        topic: beat?.visual?.topic ?? "explain",
        dominantBg: production.dominantBg ?? "BG-STUDIO",
        ...(beatBg ? { bgId: beatBg } : {}),
    });
    const stage = renderPersistentVisuals(transcript, production, timeSec, style);
    // Agent-sheet prop: the directed prop staged at its mark while its beat
    // is active (catalog-validated upstream, so the id always resolves).
    const sheetProp = sheetNow?.activeProp
        ? renderProp(sheetNow.activeProp.id, {
            x: sheetNow.activeProp.x, y: sheetNow.activeProp.y,
            scale: sheetNow.activeProp.scale, timeSec,
        })
        : "";
    const host = style.renderActor({ actorId: "auto-host", state: hostState, timeSec });
    // Sitcom layer: co-star (female/male cast) sharing the stage with the host.
    // Two-shot blocking; reactions timed to the punch moment.
    const punchAction = active.find(a => a.type === "camera" && (a.payload?.move === "punch" || a.payload?.move === "impact"));
    const punchAt = wordPunchAt ?? (punchAction ? punchAction.start : (beat && (beat.role === "punchline") ? beat.start + (beat.end - beat.start) * 0.55 : null));
    const sitcom = beat ? renderSitcomLayer(timeSec, beat, punchAt, style.renderActor, production.coStarPresence, shot.kind, production.castRoster) : "";
    // Impact typography: the punch word SLAMS in exactly as spoken. Slot
    // rotates per beat so the composition varies.
    const beatText = beat?.visual?.semantic ?? "";
    const impactSvg = (() => {
        // House rule: zero words in frame. Impact words stay available behind
        // an explicit flag, but the default pipeline never burns text in.
        if (!impactWords)
            return "";
        if (!beat || (beat.role !== "punchline" && beat.role !== "escalation" && !punchAction))
            return "";
        const pw = pickPunchWord(beatText);
        if (!pw)
            return "";
        const st = impactWordState(pw.word, timeSec, punchAt ?? beat.start + 0.3, beat.energy ?? .5, beatIndex);
        return renderImpactWord(st);
    })();
    // No burned-in subtitles: the user asked for a clean video. The caption
    // layer was also the source of the legs/shadow-through-box compositing
    // glitch, so removing it fixes that at the root.
    // Agent-sheet banner: the ONLY allowed on-screen text, screen-anchored
    // (never zoom-cropped), validated to <=34 chars upstream.
    const sheetBanner = sheetNow?.bannerText
        ? `<g transform="translate(960, 140)" filter="url(#cardShadow)">
      <rect x="-300" y="-35" width="600" height="70" rx="14" fill="#0f172a" stroke="#f59e0b" stroke-width="5"/>
      <text x="0" y="10" font-family="'Impact', 'Arial Black', sans-serif" font-size="24" fill="#fbbf24" letter-spacing="2" text-anchor="middle">${esc(sheetNow.bannerText)}</text>
    </g>`
        : "";
    const flashLayer = flash > 0 ? `<rect x="0" y="0" width="1920" height="1080" fill="${style.palette.foreground}" opacity="${flash * .45}"/>` : "";
    const traumaLayer = trauma > .03 ? `<rect x="0" y="0" width="1920" height="1080" fill="${style.palette.shadow}" opacity="${trauma * .035}"/>` : "";
    // House rule, enforced at the frame boundary: ZERO burned-in words from
    // the automatic layers (no concept cards, no glyph marks, no prop copy).
    // Deliberate layers below (opt-in impact words, agent-set banners) are
    // composed after the strip, so they survive.
    let world = `<g transform="${worldTransform}">
      ${env}
      ${stage}
      ${sheetProp}
      ${sitcom}
      <g>${host}</g>
    </g>`;
    world = world.replace(/<text\b[^>]*>[\s\S]*?<\/text>/g, "");
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 1080" width="${width}" height="${height}">
    <defs><filter id="impactShadow" x="-30%" y="-30%" width="160%" height="160%"><feDropShadow dx="0" dy="10" stdDeviation="14" flood-color="#000" flood-opacity="0.3"/></filter><filter id="cardShadow" x="-20%" y="-20%" width="140%" height="140%"><feDropShadow dx="0" dy="8" stdDeviation="12" flood-color="#000000" flood-opacity="0.18"/></filter></defs>
    ${world}
    ${impactSvg}
    ${sheetBanner}
    ${flashLayer}${traumaLayer}
  </svg>`;
    return { svg, viewBox: "0 0 1920 1080", shotId: shot.id, mode: beat?.visual?.topic ?? "explain", beatId: beat?.id ?? null, word: liveWord?.text ?? null, punchAt };
}

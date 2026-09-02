/**
 * Geometric validation of the rig and camera. Visual correctness without
 * needing to look at pixels: every assertion is a property the drawing must
 * have for the figure to read as a body rather than a pile of lines.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { parseSrt } from "../src/subtitles/SrtParser";
import { buildTranscript } from "../src/subtitles/Transcript";
import { direct } from "../src/director/Director";
import { buildPerformance, FLOOR_Y } from "../src/director/Performance";
import { solveSkeleton } from "../src/character/Rig";
import { renderRig } from "../src/character/Rig";
import { makeSpec, BODY_PRESETS, mixBody } from "../src/character/CharacterSpec";
import { cameraAt, viewBoxFor, pxPerUnit } from "../src/camera/CameraTrack";
import { POSES } from "../src/director/Performance";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const fails: string[] = [];
const ok = (cond: boolean, msg: string) => { if (!cond) fails.push(msg); };

const cues = parseSrt(fs.readFileSync(path.join(root, "public/0-chapter-1.srt"), "utf8"));
const transcript = buildTranscript(cues);
const plan = direct(transcript);
const perf = buildPerformance(plan);
const spec = makeSpec("host", "Host", { body: { ...BODY_PRESETS.average } });

// --- 1. limb lengths are honoured (FK is not drifting)
for (const [name, pose] of Object.entries(POSES)) {
  const full = { ...POSES.idle, ...pose, x: 0, y: 0 };
  const sk = solveSkeleton(spec, BODY_PRESETS.average, full);
  const armL = Math.hypot(sk.elbowL.x - sk.shoulderL.x, sk.elbowL.y - sk.shoulderL.y);
  const foreL = Math.hypot(sk.handL.x - sk.elbowL.x, sk.handL.y - sk.elbowL.y);
  ok(Math.abs(armL - spec.body.armLen) < 0.5, `${name}: upper arm ${armL.toFixed(1)} != ${spec.body.armLen}`);
  ok(Math.abs(foreL - spec.body.foreArmLen) < 0.5, `${name}: forearm ${foreL.toFixed(1)} != ${spec.body.foreArmLen}`);
  // elbow must lie between shoulder and hand, not beyond the hand
  ok(armL + foreL >= Math.hypot(sk.handL.x - sk.shoulderL.x, sk.handL.y - sk.shoulderL.y) - 0.5,
     `${name}: arm chain broken`);
}
console.log("1. limb lengths across all poses: " + (fails.length ? "FAIL" : "PASS"));

// --- 2. shoulders exist and are separated (the old rig drew arms from x=0)
{
  const sk = solveSkeleton(spec, BODY_PRESETS.average, { ...POSES.idle });
  const sep = sk.shoulderR.x - sk.shoulderL.x;
  ok(Math.abs(sep - spec.body.shoulderWidth) < 0.01, `shoulder separation ${sep} != ${spec.body.shoulderWidth}`);
  ok(sep > 20, `shoulders collapsed: ${sep}`);
  // arms must not originate on the spine
  ok(Math.abs(sk.shoulderL.x) > 10, `left arm still attached to spine at x=${sk.shoulderL.x}`);
  // neck must be above shoulders, head above neck
  ok(sk.neckBase.y < sk.shoulderL.y, "neck base below shoulders");
  ok(sk.headCenter.y < sk.neckBase.y, "head below neck");
  ok(Math.abs(sk.headCenter.x - sk.neckBase.x) < 25, "head detached from neck");
}
console.log("2. shoulders / neck / head stack: " + (fails.length ? "FAIL" : "PASS"));

// --- 3. IK reaches its target and refuses impossible ones
{
  const target = { x: 120, y: -220 };
  const sk = solveSkeleton(spec, BODY_PRESETS.average, { ...POSES.idle, rightHandTarget: target } as never);
  ok(Math.hypot(sk.handR.x - target.x, sk.handR.y - target.y) < 0.01, "IK missed target");
  const far = solveSkeleton(spec, BODY_PRESETS.average, { ...POSES.idle, rightHandTarget: { x: 9999, y: 9999 } } as never);
  ok(Number.isFinite(far.handR.x), "IK produced NaN on unreachable target");
}
console.log("3. two-bone IK: " + (fails.length ? "FAIL" : "PASS"));

// --- 4. body morph is continuous and monotonic in the waist
{
  let prevWaist = -1;
  for (let i = 0; i <= 10; i++) {
    const b = mixBody(BODY_PRESETS.lean, BODY_PRESETS.heavy, i / 10);
    ok(b.waistWidth > prevWaist, `waist not monotonic at k=${i / 10}`);
    prevWaist = b.waistWidth;
    ok(Number.isFinite(b.belly) && b.belly > -10, `belly invalid at k=${i / 10}`);
  }
  const mid = mixBody(BODY_PRESETS.lean, BODY_PRESETS.heavy, 0.5);
  ok(Math.abs(mid.waistWidth - (BODY_PRESETS.lean.waistWidth + BODY_PRESETS.heavy.waistWidth) / 2) < 0.01,
     "morph not linear in waist");
}
console.log("4. fat/lean morph continuity: " + (fails.length ? "FAIL" : "PASS"));

// --- 5. stroke normalisation: on-screen line weight stays ~constant across zoom
{
  const weights: number[] = [];
  for (const t of [2, 18, 22, 40, 120]) {
    const pose = cameraAt(plan.resolved, t);
    const scale = pxPerUnit(pose, 1280, 1920);
    const svg = renderRig({ id: "h", spec, body: spec.body, pose: { ...POSES.idle, x: 560, y: 672 }, pxPerUnit: scale, strokePx: 3.4 });
    const m = svg.match(/stroke-width="([\d.]+)"/);
    if (m) weights.push(parseFloat(m[1]) * scale);
  }
  const spread = Math.max(...weights) / Math.min(...weights);
  console.log(`5. on-screen stroke weights ${weights.map(w=>w.toFixed(2)).join(", ")} px  spread=${spread.toFixed(2)}x`);
  ok(spread < 1.35, `stroke weight varies ${spread.toFixed(2)}x across zoom (should be ~1.0)`);
}

// --- 6. each shot actually frames the actor it is pointed at
{
  let bad = 0, checked = 0;
  for (const shot of plan.shots) {
    const mid = (shot.start + shot.end) / 2;
    const vb = viewBoxFor(cameraAt(plan.resolved, mid), 1920, 1080).split(/[ ,]+/).map(Number);
    const subject = shot.tag && !/^(morph|readout):/.test(shot.tag) ? shot.tag : null;
    const id = subject ?? "host";
    if (subject && perf.presenceAt(id, mid) < 0.5) continue;
    const home = perf.homeAt(id);
    checked++;
    const inX = home[0] > vb[0] - 140 && home[0] < vb[0] + vb[2] + 140;
    const inY = home[1] > vb[1] - 300 && home[1] < vb[1] + vb[3] + 220;
    if (!inX || !inY) bad++;
  }
  console.log(`6. shot frames its subject: ${checked - bad}/${checked} shots`);
  ok(bad / Math.max(1, checked) < 0.08, `${bad} shots do not frame their own subject`);
}

// --- 7. no NaN anywhere in rendered output
{
  let bad = 0;
  for (let t = 0; t < 40; t += 1 / 24) {
    const id = "host";
    const svg = renderRig({
      id, spec, body: perf.bodyAt(id, t), pose: perf.poseAt(id, t),
      pxPerUnit: pxPerUnit(cameraAt(plan.resolved, t), 1280, 1920), strokePx: 3.4,
      mouthDrive: 0.5, blinkAmount: 0.5,
    });
    if (/NaN|Infinity|undefined/.test(svg)) bad++;
  }
  ok(bad === 0, `${bad} frames contain NaN/Infinity/undefined`);
  console.log(`7. numeric hygiene: ${bad === 0 ? "clean" : `${bad} dirty frames`}`);
}

// --- 8. feet land on the floor
{
  const hipY = FLOOR_Y - (spec.body.thighLen + spec.body.shinLen) * 0.97;
  const sk = solveSkeleton(spec, BODY_PRESETS.average, { ...POSES.idle, y: hipY });
  // solveSkeleton works in local space; the rig transform adds pose.y on top.
  const worldFootY = hipY + Math.max(sk.footL.y, sk.footR.y);
  const drop = FLOOR_Y - worldFootY;
  console.log(`8. foot-to-floor gap: ${drop.toFixed(1)} units`);
  ok(Math.abs(drop) < 22, `feet ${drop.toFixed(1)} units off the floor`);
}

console.log(`\nrig invariants: ${fails.length ? "FAIL\n  - " + [...new Set(fails)].join("\n  - ") : "ALL PASS"}`);

/**
 * GAG-FIRST proof renderer (v6 prototype).
 *
 * One 30s window (default 605.6-635.6) performed as self-contained mini-skits:
 *   A: outsourced everything (driving/cleaning/child-rearing/appetite)
 *   B: celebrity fits inside a business envelope
 *   C: concierge doctor + endless budget + belly drain
 *   D: tag - better drugs and better surgeons
 *
 * Rules: NO subtitle band, NO punch-word slams, NO banners/cards.
 * On-screen text: none at all in this proof (props are purely graphic).
 * Cast: stick-figure host + guest stick figures. Rock-solid camera, hard cuts.
 *
 *   npx tsx scripts/render-gag-proof.ts --out output/gag_proof.mp4
 *   npx tsx scripts/render-gag-proof.ts --stills 607,616,625,633
 */
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  driveGags,
  type GagDef, type GagOut, type Fig,
  lerp, easeIO, seg, blinkAt, FLOOR,
  stage, couch, wheel, duster, babyBundle, bigSandwich,
  envelope, scaleProp, moneyBag, scalpel, walkerX,
} from "./gag-lib";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const arg = (name: string, def: string) => {
  const i = process.argv.indexOf(`--${name}`);
  return i > -1 && process.argv[i + 1] !== undefined ? process.argv[i + 1] : def;
};

const fps = 24;
const width = 1280;
const height = 720;
const T0 = parseFloat(arg("start", "605.6"));
const T1 = parseFloat(arg("end", "635.6"));
const outFile = arg("out", path.join(root, "output", "gag_proof_video.mp4"));
const stillsArg = arg("stills", "");

// (math helpers + Fig/GagOut types imported from ./gag-lib)

// (clip guard imported from ./gag-lib; graphic props below stay local until
// window scripts migrate one by one)
// --- inline graphic props (zero words) -------------------------------------
// (graphic props imported from ./gag-lib)

// (walkerX imported from ./gag-lib)

// --- GAG A: outsourced everything (605.6-612.7) -------------------------------
function gagA(t: number, lt: number): GagOut {
  const figs: Fig[] = [];
  let fg = "";
  const hostPunch = lt >= 5.9;
  // Host scurries into the punch frame so the confiscation point lands
  // with him on camera instead of pointing in from off-screen.
  const hostX = 330 + easeIO(seg(lt, 5.9, 6.6)) * 520;
  figs.push({
    id: "host", st: {
      x: hostX, y: 670, timeSec: t, isTalking: !hostPunch, blink: blinkAt(t),
      expression: hostPunch ? "deadpan_classic" : "smug_chuckle",
      isWalking: lt >= 5.9 && lt < 6.6,
      pose: hostPunch ? "point_camera" : "default",
      pointTarget: hostPunch ? { x: 1400, y: 520 } : undefined,
      gazeTarget: { x: 1300, y: 550 },
    },
  });
  figs.push({
    id: "celeb", st: {
      x: 1300, y: 640, rotation: -9, timeSec: t, isTalking: false, blink: blinkAt(t + 1),
      costume: "y2k_sunglasses",
      expression: hostPunch ? "shock_jaw_drop" : "smug_hands_behind_head",
      gazeTarget: hostPunch ? { x: 1560, y: 480 } : { x: 330, y: 500 },
    },
  });
  // floating to-be-outsourced items above the celeb
  const bob = Math.sin(t * 2.2) * 10;
  const w1 = walkerX(lt, 1010, 0.6, 1.6, 2.0, 3.0);
  const w2 = walkerX(lt, 1010, 2.2, 3.2, 3.6, 4.6);
  const w3 = walkerX(lt, 1010, 3.6, 4.6, 5.0, 6.0);
  const items: Array<{ kind: string; gone: number; wx: number }> = [
    { kind: "wheel", gone: seg(lt, 1.6, 2.0), wx: w1.x },
    { kind: "duster", gone: seg(lt, 3.2, 3.6), wx: w2.x },
    { kind: "baby", gone: seg(lt, 4.6, 5.0), wx: w3.x },
  ];
  items.forEach((it, i) => {
    const home = { x: 1030 + i * 85, y: 690 + bob + (i % 2) * 22 };
    const k = easeIO(it.gone);
    // Overhead carry: items rise above head height so porters never
    // carry a wheel/duster/baby through their own faces.
    const px = lerp(home.x, it.wx, k), py = lerp(home.y, 468, k);
    if (it.kind === "wheel") fg += wheel(px, py, 0.9, t * 40);
    if (it.kind === "duster") fg += duster(px, py, 0.9, -14);
    if (it.kind === "baby") fg += babyBundle(px, py, 0.9);
  });
  const servants = [
    { id: "s1", w: w1, flip: false }, { id: "s2", w: w2, flip: false }, { id: "s3", w: w3, flip: false },
  ];
  for (const s of servants) {
    if (!s.w.on) continue;
    figs.push({
      id: s.id, st: {
        x: s.w.x, y: 670, timeSec: t, isTalking: false, isWalking: s.w.walking,
        bodyFacing: s.w.walking ? (s.w.x < 1010 ? "right" : "right") : "front",
        clothes: "hoodie", hairStyle: "male_short", mouthShape: "deadpan_line",
      },
    });
  }
  // sandwich: pops into celeb's hands, one bite, then pharma confiscates it
  const swPop = easeIO(seg(lt, 4.2, 4.6));
  const bite = seg(lt, 4.9, 5.3);
  const grab = easeIO(seg(lt, 5.9, 6.3));
  const swHome = { x: 1140, y: 660 };
  const swHand = { x: 1560, y: 600 };
  const swx = lerp(swHome.x, swHand.x, grab), swy = lerp(swHome.y, swHand.y, grab);
  if (swPop > 0) fg += bigSandwich(swx, swy, 0.85 * swPop * (1 - 0.45 * grab), -8, bite);
  const ph = walkerX(lt, 1560, 5.0, 5.8, 6.6, 7.4);
  if (ph.on) {
    figs.push({
      id: "pharma", st: {
        x: ph.x, y: 670, timeSec: t, isTalking: false, isWalking: ph.walking,
        gender: "male", clothes: "suit", hairStyle: "male_short",
        rightHandProp: grab >= 1 ? "none" : "syringe",
        expression: "smug_finger_guns",
      },
    });
  }
  const bg = stage("#f6f1e7", "#e2d8c2",
    `<circle cx="1300" cy="300" r="120" fill="#f59e0b" opacity="0.18"/>`)
    + couch(1300, FLOOR, 1.15);
  const punch = lt >= 5.9;
  return {
    bg, figs, fg,
    cam: punch ? { cx: 1300, cy: 540, zoom: 1.6, cut: false } : { cx: 900, cy: 560, zoom: 1.25, cut: lt < 0.05 },
  };
}

// --- GAG B: fits inside a business envelope (612.7-621.1) --------------------
function gagB(t: number, lt: number): GagOut {
  const figs: Fig[] = [];
  let fg = "";
  // star walks to the envelope and climbs in
  const walkK = easeIO(seg(lt, 2.2, 3.2));
  const climbK = easeIO(seg(lt, 3.2, 4.6));
  const starX = lerp(lerp(1050, 960, walkK), 960, climbK);
  const starY = lerp(670, 515, climbK);
  const starS = lerp(1, 0.3, climbK);
  const inEnv = climbK >= 1;
  if (!inEnv) {
    figs.push({
      id: "star", st: {
        x: starX, y: starY, scale: starS, rotation: -12 * climbK, timeSec: t,
        isTalking: false, isWalking: walkK > 0 && walkK < 1, blink: blinkAt(t),
        gender: "female", hairStyle: "female_long", clothes: "dress_red_carpet", eyelashes: true,
        expression: climbK > 0.3 ? "fear_trembling" : "smug_hands_behind_head",
      },
    });
  }
  figs.push({
    id: "host", st: {
      x: lerp(350, 560, easeIO(seg(lt, 0.8, 1.6))), y: 670, timeSec: t,
      isTalking: lt < 5.2, blink: blinkAt(t + 2),
      expression: lt >= 6.2 ? "confused_shrug_what" : lt >= 5.0 ? "smug_thumbs_up" : "deadpan_classic",
      pose: lt >= 6.2 ? "shrug" : lt >= 5.0 ? "default" : "point_camera",
      pointTarget: lt < 5.0 ? { x: 960, y: 560 } : undefined,
      gazeTarget: { x: 960, y: 560 },
    },
  });
  const envPop = easeIO(seg(lt, 1.2, 1.8));
  const sealed = lt >= 4.8;
  // Envelope lives in the BG layer so the star stays visible while she
  // walks up, shrinks and hops over the lip (cast renders on top of bg).
  // Only the wiggling legs stay in fg, poking out of the sealed envelope.
  const envStr = envelope(960, 660, 1.35 * Math.max(0.001, envPop), !sealed, seg(lt, 5.0, 5.4));
  // button: legs stick out of the sealed envelope and wiggle
  if (lt >= 6.2) {
    const wig = Math.sin(t * 9) * 22;
    fg += `<g stroke="#111111" stroke-width="16" stroke-linecap="round">`
      + `<line x1="900" y1="790" x2="${900 + wig}" y2="880"/>`
      + `<line x1="1020" y1="790" x2="${1020 - wig}" y2="880"/></g>`;
  }
  const bg = stage("#efe9fb", "#d5c9f0",
    `<circle cx="960" cy="220" r="150" fill="#7c3aed" opacity="0.14"/>`)
    + envStr;
  const punch = lt >= 5.4;
  return {
    bg, figs, fg,
    cam: punch ? { cx: 960, cy: 600, zoom: 1.6, cut: false } : { cx: 800, cy: 560, zoom: 1.25, cut: lt < 0.05 },
  };
}

// --- GAG C: concierge doctor, endless budget, belly drain (621.1-630.3) -----
function gagC(t: number, lt: number): GagOut {
  const figs: Fig[] = [];
  let fg = "";
  const drainK = easeIO(seg(lt, 5.6, 7.2));
  const sadExpr = lt < 6.0 ? "sad_pout" : lt < 7.2 ? "shock_eye_pop" : "blissful_serenity";
  figs.push({
    id: "sad", st: {
      x: 900, y: 640, timeSec: t, isTalking: false, blink: blinkAt(t + 1),
      gender: "male", hairStyle: "male_short", clothes: "tshirt",
      expression: sadExpr, spineLean: lt < 7.2 ? 10 : 0,
      gazeY: 0.6,
    },
  });
  figs.push({
    id: "host", st: {
      x: lerp(100, 420, easeIO(seg(lt, 0, 1.0))), y: 670, timeSec: t,
      isTalking: lt < 5.6, blink: blinkAt(t),
      expression: lt >= 6.6 ? "skeptical_side_eye" : "deadpan_classic",
      pose: lt >= 6.6 ? "crossed_arms" : "default",
      comicFx: "none",
      leftHandTarget: lt < 5.6 ? { x: 830, y: 550 } : undefined,
      gazeTarget: { x: 900, y: 550 },
      isWalking: lt < 1.0,
    },
  });
  const doc = walkerX(lt, 1500, 2.0, 3.0, 8.6, 9.6);
  if (doc.on) {
    figs.push({
      id: "doc", st: {
        x: doc.x, y: 670, timeSec: t, isTalking: false, isWalking: doc.walking,
        gender: "doctor", hairStyle: "doctor_cap", clothes: "doctor_scrubs",
        pose: !doc.walking && lt < 8.0 ? "waving" : "default",
        expression: "smug_chuckle", rightHandProp: "syringe",
      },
    });
  }
  // endless budget: three money bags drop from the sky and pile up
  const piles = [
    { x: 1180, at: 3.6 }, { x: 1310, at: 4.1 }, { x: 1245, at: 4.6 },
  ];
  for (const p of piles) {
    const k = easeIO(seg(lt, p.at, p.at + 0.7));
    if (k <= 0) continue;
    const y = lerp(-160, 820, k) + (k >= 1 ? Math.abs(Math.sin((lt - p.at - 0.7) * 8)) * -6 : 0);
    fg += moneyBag(p.x, y, 1.0, (p.x % 17) - 8);
  }
  // pot belly that visibly drains away (gone entirely at the end)
  const bellyRx = lerp(82, 0, drainK);
  const wob = Math.sin(t * 14) * 4 * (drainK > 0 && drainK < 1 ? 1 : 0);
  if (drainK < 0.98) fg += `<ellipse cx="900" cy="690" rx="${bellyRx.toFixed(0)}" ry="${(54 - drainK * 50).toFixed(0)}" fill="#fcd9b8" stroke="#111111" stroke-width="7"/>`;
  if (drainK > 0 && drainK < 1) {
    fg += `<g stroke="#0284c7" stroke-width="9" stroke-linecap="round">`
      + `<line x1="870" y1="750" x2="${864 + wob}" y2="790"/>`
      + `<line x1="900" y1="754" x2="${900 - wob}" y2="796"/>`
      + `<line x1="930" y1="750" x2="${936 + wob}" y2="790"/></g>`;
  }
  fg += scaleProp(900, 872, 0.8, drainK > 0 && drainK < 1 ? t * 9 : 0.5);
  const bg = stage("#e8f3ee", "#c9e2d6",
    `<circle cx="960" cy="240" r="140" fill="#0d9488" opacity="0.14"/>`);
  const punch = lt >= 6.6;
  return {
    bg, figs, fg,
    cam: punch ? { cx: 940, cy: 600, zoom: 1.6, cut: false } : { cx: 960, cy: 560, zoom: 1.25, cut: lt < 0.05 },
  };
}

// --- TAG D: better drugs and better surgeons (630.3-635.6) ------------------
function gagD(t: number, lt: number): GagOut {
  const figs: Fig[] = [];
  let fg = "";
  figs.push({
    id: "host", st: {
      x: 980, y: 670, timeSec: t, isTalking: false, blink: blinkAt(t),
      expression: "frustration_sigh", gazeTarget: { x: 600, y: 500 },
    },
  });
  figs.push({
    id: "doc", st: {
      x: 560, y: 670, timeSec: t, isTalking: false, blink: blinkAt(t + 1),
      gender: "doctor", hairStyle: "doctor_cap", clothes: "doctor_scrubs",
      expression: "smug_sarcastic_clap", rightHandProp: "syringe",
    },
  });
  figs.push({
    id: "star", st: {
      x: 1420, y: 670, timeSec: t, isTalking: false, blink: blinkAt(t + 2),
      gender: "female", hairStyle: "female_high_ponytail", clothes: "dress_red_carpet", eyelashes: true,
      pose: "waving", expression: "sparkle_anime_eyes", comicFx: "sparkles",
      gazeTarget: { x: 560, y: 500 },
    },
  });
  // juggled scalpel bounces just above the doctor's hand so it reads
  // as juggling instead of a stray arrow parked in the sky
  const jt = (lt * 1.6) % 1;
  fg += scalpel(560, 400 - Math.abs(Math.sin(jt * Math.PI)) * 90, lt * 480);
  const bg = stage("#f3ede4", "#ddd0bd",
    `<circle cx="560" cy="260" r="150" fill="#b45309" opacity="0.16"/>`);
  return {
    bg, figs, fg,
    cam: { cx: 960, cy: 560, zoom: 1.25, cut: lt < 0.05 },
  };
}

// --- driver ------------------------------------------------------------------
const GAGS = [
  { start: 605.6, end: 612.7, fn: gagA },
  { start: 612.7, end: 621.1, fn: gagB },
  { start: 621.1, end: 630.3, fn: gagC },
  { start: 630.3, end: 635.6, fn: gagD },
];
// --- driver (shared, see ./gag-lib) --------------------------------------------
const stillList = stillsArg ? stillsArg.split(",").map((s) => parseFloat(s)) : [];
await driveGags({
  gags: GAGS,
  t0: T0,
  t1: T1,
  outFile,
  stills: stillList,
  fps,
  width,
  height,
  stillsDir: path.join(root, "output", "gag_stills"),
  tag: "gag",
});
if (stillList.length > 0) process.exit(0);

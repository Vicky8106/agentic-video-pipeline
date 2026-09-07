import fs from "node:fs";
import { Resvg } from "@resvg/resvg-js";
import { getActiveScene } from "./src/scenes/SceneRegistry";
import { Camera } from "./src/camera/Camera";
import { CameraAgent } from "./src/camera/CameraAgent";
import { renderStickFigure } from "./src/character/StickFigure";
import { parseSrt, getActiveSubtitle } from "./src/engine/SvgRenderer";
import { buildTranscript } from "./src/subtitles/Transcript";
import { pickPunchWord, impactWordState, renderImpactWord } from "./src/production/ImpactTypography";

const camera = new Camera(1920, 1080);
const cameraAgent = new CameraAgent(camera);
const srtContent = fs.readFileSync("./public/0-chapter-1.srt", "utf8");
const subtitles = parseSrt(srtContent);
const transcript = buildTranscript(subtitles);

interface Slam { word: string; punchAt: number; slot: number; }
const slams: Slam[] = [];
transcript.sentences.forEach((s, i) => {
  const pw = pickPunchWord(s.text);
  if (!pw) return;
  const target = pw.word.toLowerCase().replace(/[^a-z0-9$]/g, "");
  const w = s.words.find(x => x.text.toLowerCase().replace(/[^a-z0-9$]/g, "") === target) ?? s.words[s.words.length - 1];
  if (w) slams.push({ word: pw.word.replace(/[.,!?]$/, ""), punchAt: w.start, slot: i % 3 });
});

function slamAt(t: number): Slam | null {
  let best: Slam | null = null;
  for (const s of slams) if (t >= s.punchAt - 0.05 && t <= s.punchAt + 1.5 && (!best || s.punchAt > best.punchAt)) best = s;
  return best;
}

const HIGHLIGHT_RE = /(Thicc|stick|Jenna Ortega|Emma Stone|Ariana Grande|unsubscribe|lunch|Tim Burton|PS1 graphics|Heroin Chick|Kate Moss|Diet Coke|apathy|Victorian|BBL|Pixar Mom|squats|hourglass|body positivity|fidget spinners|podcast|pharmaceutical|boss|Y2K|low-rise|Miu Miu|two thousand dollars|digestive tract|Ozempic|GLP-1|carbs|carbohydrates|instagram|Instagram)/gi;
const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

function renderFrameAt(t: number) {
  const scene = getActiveScene(t);
  const sceneElapsed = t - scene.startTime;
  const progress = Math.min(1, Math.max(0, sceneElapsed / Math.max(0.1, scene.endTime - scene.startTime)));
  const activeSub = getActiveSubtitle(subtitles, t);
  const talkingFlap = activeSub ? (Math.sin(t * 16) * 0.5 + 0.5) : 0;

  const output = scene.render({ timeSec: t, sceneTime: sceneElapsed, progress, talkingFlap, camera });
  const sent = transcript.sentences.find(s => t >= s.start && t <= s.end) ?? null;
  const slam = slamAt(t);

  cameraAgent.updateFrame(t, scene.id, sceneElapsed, progress, sent, slam?.punchAt ?? null, output.cameraTarget);
  const viewBox = camera.getViewBox(t);

  const figures = output.stickFigures?.length
    ? output.stickFigures.map(sf => renderStickFigure(sf.id, sf.state)).join("\n")
    : output.hostState ? renderStickFigure("host-figure", output.hostState) : "";

  const vbNums = viewBox.split(/[ ,]+/).map(Number);
  const minX = vbNums[0], minY = vbNums[1], vw = vbNums[2], vh = vbNums[3];

  let subSvg = "";
  if (activeSub?.cleanText) {
    const words = activeSub.cleanText.split(/\s+/);
    const lines: string[] = [];
    let cur = "";
    for (const w of words) {
      if ((cur + " " + w).trim().length > 58 && cur) { lines.push(cur.trim()); cur = w; }
      else cur = (cur + " " + w).trim();
    }
    if (cur) lines.push(cur.trim());
    const shown = lines.slice(0, 2);
    const fs_ = Math.round(30 * (vw / 1920));
    const lh = Math.round(42 * (vw / 1920));
    const sw = Math.max(3, Math.round(6 * (vw / 1920)));
    const cx = minX + vw / 2;
    const cy = (minY + vh - vh * 0.08) - (shown.length - 1) * lh;
    let tspans = "";
    shown.forEach((ln, i) => {
      const safe = esc(ln).replace(HIGHLIGHT_RE, `<tspan font-weight="900" fill="#b91c1c">$1</tspan>`);
      tspans += `<text x="${cx}" y="${cy + i * lh}" text-anchor="middle" font-family="'Noto Sans', Arial, sans-serif" font-size="${fs_}" font-weight="700" fill="#0f172a" stroke="#ffffff" stroke-width="${sw}" paint-order="stroke" stroke-linejoin="round">${safe}</text>`;
    });
    subSvg = `<g id="subtitle-band">${tspans}</g>`;
  }

  let slamSvg = "";
  if (slam) {
    const st = impactWordState(slam.word, t, slam.punchAt, 0.6, slam.slot);
    if (st) {
      st.x = minX + vw * (st.slot === 1 ? 0.48 : 0.52);
      st.y = minY + vh * (st.slot === 0 ? 0.28 : st.slot === 1 ? 0.22 : 0.32);
      st.scale *= (vw / 1920);
      slamSvg = renderImpactWord(st);
    }
  }

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}" width="1280" height="720">
    <defs>
      <filter id="cardShadow" x="-10%" y="-10%" width="120%" height="120%"><feDropShadow dx="0" dy="8" stdDeviation="12" flood-color="#000000" flood-opacity="0.18"/></filter>
      <filter id="glow" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="12" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
      <filter id="impactShadow" x="-30%" y="-30%" width="160%" height="160%"><feDropShadow dx="0" dy="10" stdDeviation="14" flood-color="#000000" flood-opacity="0.3"/></filter>
    </defs>
    <rect x="-4000" y="-4000" width="10000" height="10000" fill="#f8fafc"/>
    <g id="scene-background">${output.backgroundSvg || ""}</g>
    <g id="scene-character">${figures}</g>
    <g id="scene-foreground">${output.foregroundSvg || ""}</g>
    ${slamSvg}
    ${subSvg}
  </svg>`.replace(/&(?!(amp|lt|gt|quot|apos|#\d+|#x[0-9a-fA-F]+);)/g, "&amp;");

  const resvg = new Resvg(svg, { fitTo: { mode: "width", value: 1280 } });
  return resvg.render().asPng();
}

for (const s of [65.0, 140.0, 205.0, 325.0, 420.0, 560.0]) {
  const png = renderFrameAt(s);
  fs.writeFileSync(`/tmp/sample_${s}s.png`, png);
  console.log(`Rendered /tmp/sample_${s}s.png (scene=${getActiveScene(s).id})`);
}

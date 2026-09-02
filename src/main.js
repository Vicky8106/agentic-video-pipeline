import "./style.css";
import { parseSrt, getActiveSubtitle } from "./subtitles/SrtParser";
import { Camera } from "./camera/Camera";
import { renderStickFigure } from "./character/StickFigure";
import { getActiveScene, ALL_SCENES } from "./scenes/SceneRegistry";
import { AudioSync } from "./audio/AudioSync";
// Subtitle raw text fallback if fetch fails
let subtitles = [];
const camera = new Camera(1920, 1080);
const audioSync = new AudioSync("/audio.mp3");
// App DOM layout setup
const app = document.querySelector("#app");
app.innerHTML = `
  <div class="header-bar">
    <div class="header-title">
      <span class="badge-tag">CASUALLY EXPLAINED</span>
      <h1>The Great Hollywood Thinning & The GLP-1 Meta</h1>
    </div>
    <div class="stats-pill" id="stats-readout">FPS: 60 | SCENE 1/11</div>
  </div>

  <div class="viewport-container">
    <svg id="animation-svg" viewBox="0 0 1920 1080" preserveAspectRatio="xMidYMid meet">
      <defs>
        <!-- Card Drop Shadow Filter -->
        <filter id="cardShadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="8" stdDeviation="12" flood-color="#000000" flood-opacity="0.18"/>
        </filter>
        <!-- Glow Filter for lasers / divine items -->
        <filter id="glow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="12" result="blur"/>
          <feMerge>
            <feMergeNode in="blur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
        <!-- Laser Gradient -->
        <linearGradient id="laserGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#ef4444" stop-opacity="0.9"/>
          <stop offset="100%" stop-color="#dc2626" stop-opacity="0.1"/>
        </linearGradient>
      </defs>

      <!-- Background Scene Layer -->
      <g id="scene-background"></g>

      <!-- Main Stick Figure Character Layer -->
      <g id="scene-character"></g>

      <!-- Foreground Scene Layer -->
      <g id="scene-foreground"></g>
    </svg>

    <!-- Kinetic Subtitles -->
    <div class="subtitle-box" id="subtitle-box" style="display: none;">
      <div class="subtitle-text" id="subtitle-text"></div>
    </div>
  </div>

  <div class="controls-bar">
    <div class="timeline-row">
      <button id="btn-play" class="primary">▶ Play</button>
      <input type="range" id="scrubber" class="scrubber" min="0" max="644.10" step="0.05" value="0" />
      <span class="time-readout" id="time-readout">00:00 / 10:44</span>
    </div>

    <div class="actions-row">
      <div class="button-group">
        <button id="btn-restart">↻ Restart</button>
        <button id="btn-back-5s">-5s</button>
        <button id="btn-fwd-5s">+5s</button>
      </div>

      <div class="button-group">
        <label style="font-size: 0.85rem; color: #94a3b8;">Scene:</label>
        <select id="scene-select" class="scene-selector">
          ${ALL_SCENES.map((s, idx) => `<option value="${s.startTime}">Scene ${s.id}: ${s.name} (${s.startTime.toFixed(0)}s)</option>`).join("")}
        </select>

        <label style="font-size: 0.85rem; color: #94a3b8; margin-left: 8px;">Speed:</label>
        <select id="speed-select">
          <option value="0.75">0.75x</option>
          <option value="1.0" selected>1.0x</option>
          <option value="1.25">1.25x</option>
          <option value="1.5">1.5x</option>
          <option value="2.0">2.0x</option>
        </select>
      </div>
    </div>
  </div>
`;
// Element hooks
const svg = document.querySelector("#animation-svg");
const sceneBgLayer = document.querySelector("#scene-background");
const sceneCharLayer = document.querySelector("#scene-character");
const sceneFgLayer = document.querySelector("#scene-foreground");
const subtitleBox = document.querySelector("#subtitle-box");
const subtitleText = document.querySelector("#subtitle-text");
const btnPlay = document.querySelector("#btn-play");
const scrubber = document.querySelector("#scrubber");
const timeReadout = document.querySelector("#time-readout");
const statsReadout = document.querySelector("#stats-readout");
const sceneSelect = document.querySelector("#scene-select");
const speedSelect = document.querySelector("#speed-select");
const btnRestart = document.querySelector("#btn-restart");
const btnBack5 = document.querySelector("#btn-back-5s");
const btnFwd5 = document.querySelector("#btn-fwd-5s");
// Fetch and load SRT
async function loadSubtitles() {
    try {
        const res = await fetch("/subtitles.srt");
        if (res.ok) {
            const text = await res.text();
            subtitles = parseSrt(text);
            console.log(`[SRT] Loaded ${subtitles.length} subtitle cues.`);
        }
    }
    catch (err) {
        console.error("[SRT] Failed to load subtitles.srt", err);
    }
}
loadSubtitles();
// Time helpers
function formatTime(seconds) {
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}
// User Controls Bindings
btnPlay.addEventListener("click", () => {
    audioSync.toggle();
    btnPlay.textContent = audioSync.isPlaying ? "❚❚ Pause" : "▶ Play";
});
scrubber.addEventListener("input", () => {
    const val = parseFloat(scrubber.value);
    audioSync.seek(val);
});
sceneSelect.addEventListener("change", () => {
    const targetTime = parseFloat(sceneSelect.value);
    audioSync.seek(targetTime);
});
speedSelect.addEventListener("change", () => {
    audioSync.setPlaybackRate(parseFloat(speedSelect.value));
});
btnRestart.addEventListener("click", () => {
    audioSync.seek(0);
});
btnBack5.addEventListener("click", () => {
    audioSync.seek(audioSync.currentTime - 5);
});
btnFwd5.addEventListener("click", () => {
    audioSync.seek(audioSync.currentTime + 5);
});
// Animation Loop Variables
let virtualTime = 0;
let lastTimestamp = performance.now();
let fpsCount = 0;
let fpsTimer = 0;
let currentFps = 60;
// Main 60 FPS Render Tick
function tick(timestamp) {
    const dt = (timestamp - lastTimestamp) / 1000;
    lastTimestamp = timestamp;
    // FPS metric
    fpsCount++;
    fpsTimer += dt;
    if (fpsTimer >= 0.5) {
        currentFps = Math.round(fpsCount / fpsTimer);
        fpsCount = 0;
        fpsTimer = 0;
    }
    // Determine current timeline position
    let timeSec = 0;
    if (audioSync.isPlaying) {
        timeSec = audioSync.currentTime;
        virtualTime = timeSec;
    }
    else {
        // If not playing, keep at scrubbed/virtual position
        timeSec = virtualTime;
    }
    // Active scene lookup
    const activeScene = getActiveScene(timeSec);
    const sceneDuration = activeScene.endTime - activeScene.startTime;
    const sceneElapsed = timeSec - activeScene.startTime;
    const progress = Math.min(1, Math.max(0, sceneElapsed / Math.max(0.1, sceneDuration)));
    // Subtitle lookup
    const activeSub = getActiveSubtitle(subtitles, timeSec);
    const isSpeaking = activeSub !== null;
    const talkingFlap = isSpeaking ? (Math.sin(timeSec * 16) * 0.5 + 0.5) : 0;
    // Scene Context
    const sceneContext = {
        timeSec,
        sceneTime: sceneElapsed,
        progress,
        talkingFlap,
        camera,
    };
    // Render Scene
    const output = activeScene.render(sceneContext);
    // Apply Camera
    if (output.cameraTarget) {
        camera.setTarget(output.cameraTarget.x, output.cameraTarget.y, output.cameraTarget.zoom);
    }
    if (output.shake) {
        camera.shake(output.shake);
    }
    camera.update(timestamp);
    svg.setAttribute("viewBox", camera.getViewBox(timeSec));
    // Render Background SVG
    sceneBgLayer.innerHTML = output.backgroundSvg || "";
    // Render Stick Figures
    if (output.stickFigures && output.stickFigures.length > 0) {
        sceneCharLayer.innerHTML = output.stickFigures.map(sf => renderStickFigure(sf.id, sf.state)).join("\n");
    }
    else if (output.hostState) {
        sceneCharLayer.innerHTML = renderStickFigure("host-figure", output.hostState);
    }
    else {
        sceneCharLayer.innerHTML = "";
    }
    // Render Foreground SVG
    sceneFgLayer.innerHTML = output.foregroundSvg || "";
    // Render Subtitles
    if (activeSub) {
        subtitleBox.style.display = "block";
        // Comedic highlight on key words
        const highlighted = activeSub.cleanText.replace(/(Thicc|stick|Jenna Ortega|Emma Stone|Ariana Grande|unsubscribe|lunch|Tim Burton|PS1 graphics|Heroin Chick|Kate Moss|Diet Coke|apathy|Victorian|BBL|Pixar Mom|squats|hourglass|body positivity|fidget spinners|podcast|pharmaceutical|boss|Y2K|low-rise|Miu Miu|two thousand dollars|digestive tract)/gi, '<span class="highlight">$1</span>');
        subtitleText.innerHTML = highlighted;
    }
    else {
        subtitleBox.style.display = "none";
    }
    // Update UI scrubber and readout
    if (Math.abs(parseFloat(scrubber.value) - timeSec) > 0.1 && audioSync.isPlaying) {
        scrubber.value = String(timeSec);
    }
    timeReadout.textContent = `${formatTime(timeSec)} / 10:44`;
    statsReadout.textContent = `FPS: ${currentFps} | SCENE ${activeScene.id} (${activeScene.name})`;
    requestAnimationFrame(tick);
}
// Expose seek for external video rendering / automation
window.__seekAnimation = (t) => {
    virtualTime = t;
    const activeScene = getActiveScene(t);
    const sceneElapsed = t - activeScene.startTime;
    const progress = Math.min(1, Math.max(0, sceneElapsed / Math.max(0.1, activeScene.endTime - activeScene.startTime)));
    const activeSub = getActiveSubtitle(subtitles, t);
    const isSpeaking = activeSub !== null;
    const talkingFlap = isSpeaking ? (Math.sin(t * 16) * 0.5 + 0.5) : 0;
    const output = activeScene.render({ timeSec: t, sceneTime: sceneElapsed, progress, talkingFlap, camera });
    if (output.cameraTarget)
        camera.setImmediate({ centerX: output.cameraTarget.x, centerY: output.cameraTarget.y, zoom: output.cameraTarget.zoom });
    svg.setAttribute("viewBox", camera.getViewBox(t));
    sceneBgLayer.innerHTML = output.backgroundSvg || "";
    if (output.stickFigures && output.stickFigures.length > 0) {
        sceneCharLayer.innerHTML = output.stickFigures.map(sf => renderStickFigure(sf.id, sf.state)).join("\n");
    }
    else if (output.hostState) {
        sceneCharLayer.innerHTML = renderStickFigure("host-figure", output.hostState);
    }
    else {
        sceneCharLayer.innerHTML = "";
    }
    sceneFgLayer.innerHTML = output.foregroundSvg || "";
    if (activeSub) {
        subtitleBox.style.display = "block";
        subtitleText.innerHTML = activeSub.cleanText;
    }
    else {
        subtitleBox.style.display = "none";
    }
};
requestAnimationFrame(tick);

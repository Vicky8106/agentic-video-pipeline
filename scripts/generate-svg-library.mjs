import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { Resvg } from '@resvg/resvg-js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const outBaseDir = '/root/Desktop/svg_assets';

// Ensure all subdirectories exist
const dirs = ['characters', 'infographics', 'props', 'comic_fx', 'environments'];
for (const d of dirs) {
  fs.mkdirSync(path.join(outBaseDir, d), { recursive: true });
}

// System fonts for resvg verification
const fontFilesList = [
  '/usr/share/fonts/truetype/noto/NotoSans-Bold.ttf',
  '/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf',
  '/usr/share/fonts/truetype/liberation/LiberationSans-Bold.ttf',
  '/usr/share/fonts/truetype/liberation/LiberationMono-Bold.ttf',
].filter(f => fs.existsSync(f));

const assets = [];

function addAsset(category, filename, title, width, height, bodyContent) {
  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}">
  <defs>
    <filter id="cardShadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="6" stdDeviation="10" flood-color="#000000" flood-opacity="0.16"/>
    </filter>
    <filter id="glow" x="-30%" y="-30%" width="160%" height="160%">
      <feGaussianBlur stdDeviation="8" result="blur"/>
      <feMerge>
        <feMergeNode in="blur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
    <linearGradient id="laserGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#ef4444"/>
      <stop offset="100%" stop-color="#dc2626"/>
    </linearGradient>
    <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#fde047"/>
      <stop offset="100%" stop-color="#ca8a04"/>
    </linearGradient>
    <linearGradient id="cyanGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#38bdf8"/>
      <stop offset="100%" stop-color="#0284c7"/>
    </linearGradient>
  </defs>
${bodyContent}
</svg>`;

  assets.push({ category, filename, title, width, height, svg });
}

// ----------------------------------------------------
// 1. CHARACTERS & EXPRESSIONS (26 Assets)
// ----------------------------------------------------

// Base Stickman Head & Body Builder matching Desktop reference Picsart_26-08-16_20-36-21-244.png
function makeStickman(opts = {}) {
  const {
    mouthOpen = 0.4,
    mouthShape = "rect", // rect, deadpan, shock, smirk, scream
    eyeStyle = "normal", // normal, shock, ps1, tim_burton, squint
    gazeX = 0.4,
    gazeY = -0.2,
    tilt = -6,
    leftHandProp = "none",
    rightHandProp = "none",
    armL1 = 160, armL2 = -15,
    armR1 = 20, armR2 = 15,
    costume = "none"
  } = opts;

  const pOffsetX = gazeX * 6;
  const pOffsetY = gazeY * 5;

  let eyesSvg = "";
  if (eyeStyle === "tim_burton") {
    eyesSvg = `
      <ellipse cx="-24" cy="-12" rx="28" ry="24" fill="#352936" opacity="0.6"/>
      <ellipse cx="38" cy="-10" rx="24" ry="24" fill="#352936" opacity="0.6"/>
      <ellipse cx="-24" cy="-16" rx="20" ry="22" fill="#fdfaf0" stroke="#111" stroke-width="6"/>
      <ellipse cx="38" cy="-14" rx="18" ry="22" fill="#fdfaf0" stroke="#111" stroke-width="6"/>
      <circle cx="-24" cy="-16" r="5" fill="#111"/>
      <circle cx="38" cy="-14" r="5" fill="#111"/>
    `;
  } else if (eyeStyle === "ps1") {
    eyesSvg = `
      <polygon points="-44,-16 -24,-34 -4,-16 -24,2" fill="#55ff55" stroke="#003300" stroke-width="4"/>
      <polygon points="20,-14 38,-32 56,-14 38,4" fill="#55ff55" stroke="#003300" stroke-width="4"/>
      <rect x="-29" y="-21" width="10" height="10" fill="#000"/>
      <rect x="33" y="-19" width="10" height="10" fill="#000"/>
    `;
  } else if (eyeStyle === "shock") {
    eyesSvg = `
      <ellipse cx="-24" cy="-16" rx="25" ry="28" fill="#ffffff" stroke="#111111" stroke-width="7"/>
      <ellipse cx="38" cy="-14" rx="22" ry="28" fill="#ffffff" stroke="#111111" stroke-width="7"/>
      <circle cx="-24" cy="-16" r="4" fill="#111111"/>
      <circle cx="38" cy="-14" r="4" fill="#111111"/>
    `;
  } else if (eyeStyle === "squint") {
    eyesSvg = `
      <path d="M -44 -16 Q -24 -26 -4 -16" stroke="#111" stroke-width="7" stroke-linecap="round" fill="none"/>
      <path d="M 22 -14 Q 38 -24 54 -14" stroke="#111" stroke-width="7" stroke-linecap="round" fill="none"/>
    `;
  } else {
    eyesSvg = `
      <path d="M -44 -34 Q -28 -44 -12 -36" fill="none" stroke="#111111" stroke-width="4" stroke-linecap="round"/>
      <ellipse cx="-24" cy="-16" rx="21" ry="25" fill="#ffffff" stroke="#111111" stroke-width="6"/>
      <path d="M ${-20 + pOffsetX} ${-36 + pOffsetY} C ${-8 + pOffsetX} ${-36 + pOffsetY} ${-2 + pOffsetX} ${-24 + pOffsetY} ${-8 + pOffsetX} ${-6 + pOffsetY} C ${-14 + pOffsetX} ${8 + pOffsetY} ${-26 + pOffsetX} ${6 + pOffsetY} ${-26 + pOffsetX} ${-8 + pOffsetY} C ${-26 + pOffsetX} ${-24 + pOffsetY} ${-26 + pOffsetX} ${-36 + pOffsetY} ${-20 + pOffsetX} ${-36 + pOffsetY} Z" fill="#111111"/>
      <ellipse cx="38" cy="-14" rx="17" ry="26" fill="#ffffff" stroke="#111111" stroke-width="6"/>
      <path d="M ${42 + pOffsetX} ${-34 + pOffsetY} C ${54 + pOffsetX} ${-34 + pOffsetY} ${58 + pOffsetX} ${-22 + pOffsetY} ${54 + pOffsetX} ${-4 + pOffsetY} C ${49 + pOffsetX} ${10 + pOffsetY} ${39 + pOffsetX} ${8 + pOffsetY} ${39 + pOffsetX} ${-6 + pOffsetY} C ${39 + pOffsetX} ${-22 + pOffsetY} ${38 + pOffsetX} ${-34 + pOffsetY} ${42 + pOffsetX} ${-34 + pOffsetY} Z" fill="#111111"/>
    `;
  }

  const mouthH = Math.max(16, 26 + mouthOpen * 16);
  let mouthSvg = "";
  if (mouthShape === "deadpan") {
    mouthSvg = `<line x1="-28" y1="0" x2="22" y2="0" stroke="#111111" stroke-width="7" stroke-linecap="round"/>`;
  } else if (mouthShape === "shock") {
    mouthSvg = `<ellipse cx="-2" cy="0" rx="16" ry="20" fill="#221111" stroke="#111111" stroke-width="6"/>`;
  } else if (mouthShape === "smirk") {
    mouthSvg = `<path d="M -24 4 Q 0 8 26 -6" fill="none" stroke="#111111" stroke-width="7" stroke-linecap="round"/>`;
  } else if (mouthShape === "scream") {
    mouthSvg = `
      <ellipse cx="-2" cy="10" rx="26" ry="34" fill="#1b0808" stroke="#111111" stroke-width="7"/>
      <rect x="-20" y="-5" width="40" height="10" rx="3" fill="#fff"/>
      <ellipse cx="-2" cy="28" rx="14" ry="8" fill="#e84a5f"/>
    `;
  } else {
    mouthSvg = `
      <path d="M -30 ${-mouthH/2} L 24 ${-mouthH/2 + 2} L 18 ${mouthH/2} L -28 ${mouthH/2 - 2} Z" fill="#ffffff" stroke="#111111" stroke-width="6" stroke-linejoin="round"/>
      ${mouthH > 28 ? `<line x1="-27" y1="0" x2="20" y2="0" stroke="#111111" stroke-width="3" opacity="0.3"/>` : ""}
    `;
  }

  // FK arm calculation
  const shoulderY = -95;
  const upperArmLen = 78, foreArmLen = 78;
  const radL1 = (armL1 * Math.PI) / 180;
  const elbLX = -10 + Math.cos(radL1) * upperArmLen, elbLY = shoulderY + Math.sin(radL1) * upperArmLen;
  const radL2 = ((armL1 + armL2) * Math.PI) / 180;
  const hLX = elbLX + Math.cos(radL2) * foreArmLen, hLY = elbLY + Math.sin(radL2) * foreArmLen;

  const radR1 = (armR1 * Math.PI) / 180;
  const elbRX = 10 + Math.cos(radR1) * upperArmLen, elbRY = shoulderY + Math.sin(radR1) * upperArmLen;
  const radR2 = ((armR1 + armR2) * Math.PI) / 180;
  const hRX = elbRX + Math.cos(radR2) * foreArmLen, hRY = elbRY + Math.sin(radR2) * foreArmLen;

  let propSvg = "";
  if (rightHandProp === "pointer") {
    propSvg += `
      <g transform="translate(${hRX}, ${hRY}) rotate(${armR1 + armR2})">
        <line x1="0" y1="0" x2="110" y2="-70" stroke="#8b4513" stroke-width="6" stroke-linecap="round"/>
        <circle cx="110" cy="-70" r="6" fill="#e74c3c"/>
      </g>
    `;
  } else if (rightHandProp === "diet_coke") {
    propSvg += `
      <g transform="translate(${hRX}, ${hRY}) rotate(${armR1 + armR2})">
        <rect x="-14" y="-38" width="28" height="46" rx="4" fill="#c41230" stroke="#111" stroke-width="4"/>
        <rect x="-12" y="-36" width="24" height="8" fill="#e0e0e0"/>
        <text x="0" y="-12" font-family="'Impact', sans-serif" font-size="12" fill="#ffffff" text-anchor="middle" font-weight="bold">Diet</text>
        <text x="0" y="-1" font-family="'Impact', sans-serif" font-size="11" fill="#ffffff" text-anchor="middle">Coke</text>
      </g>
    `;
  }

  let costumeSvg = "";
  if (costume === "tech_bro") {
    costumeSvg = `
      <path d="M -35 -90 L 35 -90 L 40 10 L -40 10 Z" fill="#1a365d" stroke="#0f172a" stroke-width="5"/>
      <path d="M 0 -90 L 0 10" stroke="#cbd5e1" stroke-width="4"/>
      <rect x="12" y="-70" width="18" height="8" rx="2" fill="#e2e8f0"/>
      <g transform="translate(0, -210)">
        <ellipse cx="0" cy="0" rx="75" ry="18" fill="#1e293b" stroke="#0f172a" stroke-width="5"/>
        <path d="M -60 0 C -60 -45 60 -45 60 0 Z" fill="#1e293b" stroke="#0f172a" stroke-width="5"/>
        <text x="0" y="-12" font-family="Arial, sans-serif" font-size="16" fill="#f59e0b" font-weight="bold" text-anchor="middle">AI / BTC</text>
      </g>
    `;
  }

  return `
    <g transform="translate(200, 320)">
      <!-- Floor shadow -->
      <ellipse cx="0" cy="180" rx="65" ry="14" fill="#111111" opacity="0.16"/>
      <!-- Legs -->
      <g stroke="#111111" stroke-width="8" stroke-linecap="round" fill="none">
        <line x1="0" y1="55" x2="-40" y2="175"/>
        <line x1="0" y1="55" x2="40" y2="175"/>
      </g>
      <!-- Spine -->
      <line x1="0" y1="-120" x2="0" y2="55" stroke="#111111" stroke-width="8" stroke-linecap="round"/>
      ${costumeSvg}
      <!-- Left Arm (2-finger V) -->
      <g stroke="#111111" stroke-width="7" stroke-linecap="round" fill="none">
        <line x1="0" y1="${shoulderY}" x2="${elbLX}" y2="${elbLY}"/>
        <line x1="${elbLX}" y1="${elbLY}" x2="${hLX}" y2="${hLY}"/>
        <line x1="${hLX}" y1="${hLY}" x2="${hLX - 22}" y2="${hLY - 12}"/>
        <line x1="${hLX}" y1="${hLY}" x2="${hLX - 18}" y2="${hLY + 20}"/>
      </g>
      <!-- Right Arm (2-finger V) -->
      <g stroke="#111111" stroke-width="7" stroke-linecap="round" fill="none">
        <line x1="0" y1="${shoulderY}" x2="${elbRX}" y2="${elbRY}"/>
        <line x1="${elbRX}" y1="${elbRY}" x2="${hRX}" y2="${hRY}"/>
        <line x1="${hRX}" y1="${hRY}" x2="${hRX + 22}" y2="${hRY - 14}"/>
        <line x1="${hRX}" y1="${hRY}" x2="${hRX + 20}" y2="${hRY + 18}"/>
        ${propSvg}
      </g>
      <!-- Head -->
      <g transform="translate(0, -120) rotate(${tilt})">
        <!-- Curly cloud hair -->
        <path d="M -75 25 C -115 15 -125 -45 -85 -70 C -115 -115 -60 -160 -15 -152 C 15 -185 85 -175 105 -130 C 145 -110 160 -45 130 -5 C 160 45 135 110 90 95 C 80 55 75 25 65 -5 L -65 0 Z" fill="#0d0d0d" stroke="#0d0d0d" stroke-width="6" stroke-linejoin="round"/>
        <!-- Peach head oval -->
        <path d="M -68 15 C -82 -40 -68 -80 -18 -85 C 38 -87 76 -50 78 15 C 78 68 48 88 5 88 C -40 88 -68 70 -68 15 Z" fill="#fed89b" stroke="#111111" stroke-width="8" stroke-linejoin="round"/>
        <path d="M -12 8 L -10 20" fill="none" stroke="#111111" stroke-width="5" stroke-linecap="round"/>
        <!-- Eyebrows -->
        <path d="M -45 -48 Q -25 -62 -5 -48" fill="none" stroke="#111111" stroke-width="6" stroke-linecap="round"/>
        <path d="M 22 -44 Q 42 -58 62 -44" fill="none" stroke="#111111" stroke-width="6" stroke-linecap="round"/>
        ${eyesSvg}
        <g transform="translate(0, 32) rotate(4)">${mouthSvg}</g>
      </g>
    </g>
  `;
}

// 1. host_stickman_neutral
addAsset('characters', 'host_stickman_neutral.svg', 'Host Stickman (Neutral)', 400, 520, makeStickman({ mouthOpen: 0.2 }));

// 2. host_stickman_talking
addAsset('characters', 'host_stickman_talking.svg', 'Host Stickman (Talking)', 400, 520, makeStickman({ mouthOpen: 0.8 }));

// 3. host_stickman_deadpan
addAsset('characters', 'host_stickman_deadpan.svg', 'Host Stickman (Deadpan)', 400, 520, makeStickman({ mouthShape: 'deadpan', eyeStyle: 'normal', gazeX: 0 }));

// 4. host_stickman_shocked
addAsset('characters', 'host_stickman_shocked.svg', 'Host Stickman (Shocked)', 400, 520, makeStickman({ mouthShape: 'shock', eyeStyle: 'shock' }));

// 5. host_stickman_smug
addAsset('characters', 'host_stickman_smug.svg', 'Host Stickman (Smug)', 400, 520, makeStickman({ mouthShape: 'smirk', eyeStyle: 'squint', tilt: 8 }));

// 6. host_stickman_pointing
addAsset('characters', 'host_stickman_pointing.svg', 'Host Stickman (Pointing Laser Stick)', 400, 520, makeStickman({ rightHandProp: 'pointer', armR1: -35, armR2: 20 }));

// 7. host_stickman_ps1_eyes
addAsset('characters', 'host_stickman_ps1_eyes.svg', 'Host Stickman (PS1 Diamond Eyes)', 400, 520, makeStickman({ eyeStyle: 'ps1', mouthShape: 'deadpan' }));

// 8. host_stickman_tim_burton
addAsset('characters', 'host_stickman_tim_burton.svg', 'Host Stickman (Tim Burton Gothic)', 400, 520, makeStickman({ eyeStyle: 'tim_burton', mouthShape: 'shock' }));

// 9. paparazzi_stickman_left
addAsset('characters', 'paparazzi_stickman_left.svg', 'Paparazzi Stickman (Flashing Camera Left)', 350, 450, `
  <g transform="translate(160, 260)">
    <ellipse cx="0" cy="150" rx="40" ry="10" fill="#000" opacity="0.15"/>
    <line x1="0" y1="50" x2="-25" y2="150" stroke="#111" stroke-width="6"/>
    <line x1="0" y1="50" x2="25" y2="150" stroke="#111" stroke-width="6"/>
    <line x1="0" y1="-60" x2="0" y2="50" stroke="#111" stroke-width="7"/>
    <!-- Arms holding camera -->
    <line x1="0" y1="-40" x2="50" y2="-20" stroke="#111" stroke-width="6"/>
    <line x1="0" y1="-40" x2="35" y2="0" stroke="#111" stroke-width="6"/>
    <!-- DSLR Camera -->
    <rect x="40" y="-35" width="55" height="38" rx="5" fill="#1e293b" stroke="#0f172a" stroke-width="3"/>
    <circle cx="85" cy="-16" r="14" fill="#38bdf8" stroke="#0284c7" stroke-width="3"/>
    <!-- Flash Bulb & Ray -->
    <circle cx="45" cy="-45" r="8" fill="#fde047" stroke="#eab308" stroke-width="2" filter="url(#glow)"/>
    <polygon points="45,-45 200,-120 200,30" fill="#fef08a" opacity="0.45"/>
    <!-- Head with Fedora -->
    <circle cx="0" cy="-80" r="28" fill="#fed89b" stroke="#111" stroke-width="5"/>
    <!-- Fedora hat -->
    <ellipse cx="0" cy="-98" rx="42" ry="10" fill="#334155" stroke="#0f172a" stroke-width="3"/>
    <path d="M -22 -98 C -22 -125 22 -125 22 -98 Z" fill="#334155" stroke="#0f172a" stroke-width="3"/>
  </g>
`);

// 10. paparazzi_stickman_right
addAsset('characters', 'paparazzi_stickman_right.svg', 'Paparazzi Stickman (Right View)', 350, 450, `
  <g transform="translate(180, 260) scale(-1, 1)">
    <ellipse cx="0" cy="150" rx="40" ry="10" fill="#000" opacity="0.15"/>
    <line x1="0" y1="50" x2="-25" y2="150" stroke="#111" stroke-width="6"/>
    <line x1="0" y1="50" x2="25" y2="150" stroke="#111" stroke-width="6"/>
    <line x1="0" y1="-60" x2="0" y2="50" stroke="#111" stroke-width="7"/>
    <line x1="0" y1="-40" x2="50" y2="-20" stroke="#111" stroke-width="6"/>
    <line x1="0" y1="-40" x2="35" y2="0" stroke="#111" stroke-width="6"/>
    <rect x="40" y="-35" width="55" height="38" rx="5" fill="#1e293b" stroke="#0f172a" stroke-width="3"/>
    <circle cx="85" cy="-16" r="14" fill="#38bdf8" stroke="#0284c7" stroke-width="3"/>
    <circle cx="45" cy="-45" r="8" fill="#fde047" stroke="#eab308" stroke-width="2" filter="url(#glow)"/>
    <circle cx="0" cy="-80" r="28" fill="#fed89b" stroke="#111" stroke-width="5"/>
    <ellipse cx="0" cy="-98" rx="42" ry="10" fill="#475569" stroke="#0f172a" stroke-width="3"/>
    <path d="M -22 -98 C -22 -125 22 -125 22 -98 Z" fill="#475569" stroke="#0f172a" stroke-width="3"/>
  </g>
`);

// 11. crypto_bro
addAsset('characters', 'crypto_bro.svg', 'Crypto Bro (Diamond Hands & Bitcoin)', 350, 480, `
  <g transform="translate(175, 270)">
    <ellipse cx="0" cy="160" rx="45" ry="12" fill="#000" opacity="0.15"/>
    <line x1="0" y1="60" x2="-30" y2="160" stroke="#111" stroke-width="7"/>
    <line x1="0" y1="60" x2="30" y2="160" stroke="#111" stroke-width="7"/>
    <!-- Graphic Tee -->
    <path d="M -25 -50 L 25 -50 L 30 60 L -30 60 Z" fill="#0f172a" stroke="#111" stroke-width="4"/>
    <text x="0" y="10" font-family="'Impact', sans-serif" font-size="14" fill="#f59e0b" text-anchor="middle">HODL</text>
    <!-- Arms holding Bitcoin & Diamond -->
    <line x1="-20" y1="-30" x2="-60" y2="-10" stroke="#111" stroke-width="6"/>
    <line x1="20" y1="-30" x2="60" y2="-10" stroke="#111" stroke-width="6"/>
    <!-- Gold Bitcoin -->
    <circle cx="-70" cy="-10" r="18" fill="url(#goldGrad)" stroke="#b45309" stroke-width="2"/>
    <text x="-70" y="-4" font-family="'Impact', sans-serif" font-size="16" fill="#fff" text-anchor="middle">B</text>
    <!-- Cyan Diamond Hands -->
    <polygon points="70,-22 84,-10 70,2 56,-10" fill="url(#cyanGrad)" stroke="#0369a1" stroke-width="2"/>
    <!-- Head with Backwards Snapback Cap -->
    <circle cx="0" cy="-80" r="32" fill="#fed89b" stroke="#111" stroke-width="5"/>
    <path d="M -32 -80 C -32 -115 32 -115 32 -80 Z" fill="#dc2626" stroke="#991b1b" stroke-width="4"/>
    <rect x="-30" y="-82" width="60" height="8" fill="#b91c1c"/>
    <rect x="25" y="-85" width="22" height="6" rx="2" fill="#991b1b"/>
    <!-- Sunglasses -->
    <rect x="-24" y="-85" width="20" height="12" rx="3" fill="#111"/>
    <rect x="4" y="-85" width="20" height="12" rx="3" fill="#111"/>
    <line x1="-4" y1="-80" x2="4" y2="-80" stroke="#111" stroke-width="3"/>
    <!-- Smug smirk -->
    <path d="M -12 -62 Q 0 -58 14 -66" fill="none" stroke="#111" stroke-width="4" stroke-linecap="round"/>
  </g>
`);

// 12. tech_founder_ai
addAsset('characters', 'tech_founder_ai.svg', 'Tech Founder AI (Patagonia Fleece & Lanyard)', 350, 480, `
  <g transform="translate(175, 270)">
    <ellipse cx="0" cy="160" rx="45" ry="12" fill="#000" opacity="0.15"/>
    <line x1="0" y1="60" x2="-25" y2="160" stroke="#111" stroke-width="7"/>
    <line x1="0" y1="60" x2="25" y2="160" stroke="#111" stroke-width="7"/>
    <!-- Navy Tech Fleece Vest -->
    <path d="M -28 -50 L 28 -50 L 32 60 L -32 60 Z" fill="#1e3a8a" stroke="#0f172a" stroke-width="4"/>
    <line x1="0" y1="-50" x2="0" y2="60" stroke="#93c5fd" stroke-width="3"/>
    <!-- AI Lanyard -->
    <path d="M -12 -50 L 0 -10 L 12 -50" fill="none" stroke="#3b82f6" stroke-width="3"/>
    <rect x="-16" y="-10" width="32" height="24" rx="3" fill="#0284c7" stroke="#0369a1" stroke-width="2"/>
    <text x="0" y="4" font-family="'Courier New', monospace" font-size="8" font-weight="bold" fill="#fff" text-anchor="middle">AI DEV</text>
    <!-- Head with Designer Smart Glasses -->
    <circle cx="0" cy="-80" r="32" fill="#fed89b" stroke="#111" stroke-width="5"/>
    <!-- Round Wireframe Glasses -->
    <circle cx="-14" cy="-80" r="10" fill="none" stroke="#0f172a" stroke-width="3"/>
    <circle cx="14" cy="-80" r="10" fill="none" stroke="#0f172a" stroke-width="3"/>
    <line x1="-4" y1="-80" x2="4" y2="-80" stroke="#0f172a" stroke-width="3"/>
    <!-- Neat Side-Part Hair -->
    <path d="M -30 -85 C -30 -115 20 -120 32 -90 C 20 -100 -10 -105 -25 -85 Z" fill="#451a03"/>
    <path d="M -10 -60 Q 0 -54 12 -60" fill="none" stroke="#111" stroke-width="4" stroke-linecap="round"/>
  </g>
`);

// 13. jenna_ortega_wednesday
addAsset('characters', 'jenna_ortega_wednesday.svg', 'Jenna Ortega (Wednesday Goth Dress)', 350, 480, `
  <g transform="translate(175, 270)">
    <ellipse cx="0" cy="160" rx="45" ry="12" fill="#000" opacity="0.15"/>
    <line x1="-10" y1="70" x2="-12" y2="160" stroke="#111" stroke-width="6"/>
    <line x1="10" y1="70" x2="12" y2="160" stroke="#111" stroke-width="6"/>
    <!-- Black Gothic Collared Dress -->
    <polygon points="-25,-40 25,-40 38,70 -38,70" fill="#0f172a" stroke="#000" stroke-width="4"/>
    <!-- White Triangular Collar -->
    <polygon points="0,-20 -18,-40 0,-40" fill="#ffffff" stroke="#cbd5e1" stroke-width="2"/>
    <polygon points="0,-20 18,-40 0,-40" fill="#ffffff" stroke="#cbd5e1" stroke-width="2"/>
    <!-- Slim Pale Head -->
    <ellipse cx="0" cy="-80" rx="26" ry="32" fill="#fef08a" opacity="0.7" stroke="#111" stroke-width="5"/>
    <!-- Dark Smokey Eyeshadow -->
    <ellipse cx="-12" cy="-82" rx="9" ry="7" fill="#334155" opacity="0.7"/>
    <ellipse cx="12" cy="-82" rx="9" ry="7" fill="#334155" opacity="0.7"/>
    <circle cx="-12" cy="-82" r="5" fill="#111"/>
    <circle cx="12" cy="-82" r="5" fill="#111"/>
    <!-- Twin Dark Braided Pigtails -->
    <path d="M -26 -80 Q -45 -40 -35 20 Q -45 60 -30 90" fill="none" stroke="#09090b" stroke-width="10" stroke-linecap="round"/>
    <path d="M 26 -80 Q 45 -40 35 20 Q 45 60 30 90" fill="none" stroke="#09090b" stroke-width="10" stroke-linecap="round"/>
    <!-- Straight bangs -->
    <path d="M -26 -100 L 26 -100 L 26 -88 L -26 -88 Z" fill="#09090b"/>
    <!-- Severe deadpan line mouth -->
    <line x1="-12" y1="-60" x2="12" y2="-60" stroke="#881337" stroke-width="4" stroke-linecap="round"/>
  </g>
`);

// 14. emma_stone_specimen
addAsset('characters', 'emma_stone_specimen.svg', 'Emma Stone (Emerald Dress & Red Hair)', 350, 480, `
  <g transform="translate(175, 270)">
    <ellipse cx="0" cy="160" rx="45" ry="12" fill="#000" opacity="0.15"/>
    <line x1="-10" y1="70" x2="-10" y2="160" stroke="#111" stroke-width="6"/>
    <line x1="10" y1="70" x2="10" y2="160" stroke="#111" stroke-width="6"/>
    <!-- Emerald Green Gown -->
    <polygon points="-24,-40 24,-40 34,70 -34,70" fill="#047857" stroke="#065f46" stroke-width="4"/>
    <rect x="-18" y="-10" width="36" height="6" rx="2" fill="#fde047"/>
    <!-- Auburn / Reddish Hair Waves -->
    <path d="M -32 -80 C -40 -120 40 -120 32 -80 C 40 -30 30 10 24 30 C 15 -20 -15 -20 -24 30 C -30 10 -40 -30 -32 -80 Z" fill="#b45309" stroke="#78350f" stroke-width="3"/>
    <!-- Head & Big Expressive Eyes -->
    <ellipse cx="0" cy="-80" rx="28" ry="32" fill="#fed89b" stroke="#111" stroke-width="5"/>
    <ellipse cx="-12" cy="-82" rx="9" ry="11" fill="#fff" stroke="#111" stroke-width="3"/>
    <circle cx="-12" cy="-82" r="5" fill="#15803d"/>
    <ellipse cx="12" cy="-82" rx="9" ry="11" fill="#fff" stroke="#111" stroke-width="3"/>
    <circle cx="12" cy="-82" r="5" fill="#15803d"/>
    <!-- Bright red lipstick smile -->
    <path d="M -15 -62 Q 0 -50 15 -62" fill="none" stroke="#be123c" stroke-width="5" stroke-linecap="round"/>
  </g>
`);

// 15. ariana_grande_specimen
addAsset('characters', 'ariana_grande_specimen.svg', 'Ariana Grande (High Ponytail & Oversized Hoodie)', 350, 480, `
  <g transform="translate(175, 270)">
    <ellipse cx="0" cy="160" rx="45" ry="12" fill="#000" opacity="0.15"/>
    <!-- Slim Thigh-High Boots -->
    <line x1="-10" y1="50" x2="-10" y2="160" stroke="#3730a3" stroke-width="8"/>
    <line x1="10" y1="50" x2="10" y2="160" stroke="#3730a3" stroke-width="8"/>
    <!-- Pastel Lavender Oversized Hoodie -->
    <rect x="-35" y="-45" width="70" height="95" rx="14" fill="#c084fc" stroke="#9333ea" stroke-width="4"/>
    <line x1="-10" y1="-25" x2="-10" y2="10" stroke="#ffffff" stroke-width="3"/>
    <line x1="10" y1="-25" x2="10" y2="10" stroke="#ffffff" stroke-width="3"/>
    <!-- Iconic Sky-High Ponytail -->
    <g transform="translate(18, -105)">
      <circle cx="0" cy="0" r="8" fill="#fbbf24"/>
      <path d="M 0 0 C 40 -10 60 50 45 120 C 35 70 20 20 0 0 Z" fill="#78350f" stroke="#451a03" stroke-width="3"/>
    </g>
    <!-- Petite Head with Winged Eyeliner -->
    <ellipse cx="0" cy="-80" rx="24" ry="28" fill="#fde68a" stroke="#111" stroke-width="5"/>
    <!-- Winged Eyeliner Eyes -->
    <ellipse cx="-10" cy="-80" rx="7" ry="6" fill="#fff" stroke="#111" stroke-width="2"/>
    <path d="M -17 -82 L -24 -87" stroke="#111" stroke-width="3" stroke-linecap="round"/>
    <ellipse cx="10" cy="-80" rx="7" ry="6" fill="#fff" stroke="#111" stroke-width="2"/>
    <path d="M 17 -82 L 24 -87" stroke="#111" stroke-width="3" stroke-linecap="round"/>
    <!-- Cute pink smile -->
    <path d="M -8 -64 Q 0 -58 8 -64" fill="none" stroke="#db2777" stroke-width="3" stroke-linecap="round"/>
  </g>
`);

// 16. kate_moss_heroin_chic
addAsset('characters', 'kate_moss_heroin_chic.svg', 'Kate Moss (90s Heroin Chic Icon)', 350, 480, `
  <g transform="translate(175, 270)">
    <ellipse cx="0" cy="160" rx="45" ry="12" fill="#000" opacity="0.15"/>
    <!-- Ultrathin stick legs -->
    <line x1="-8" y1="40" x2="-8" y2="160" stroke="#111" stroke-width="5"/>
    <line x1="8" y1="40" x2="8" y2="160" stroke="#111" stroke-width="5"/>
    <!-- 90s Minimalist Grey Slip Dress -->
    <polygon points="-18,-35 18,-35 24,45 -24,45" fill="#e2e8f0" stroke="#94a3b8" stroke-width="3"/>
    <!-- Left Hand with Smoldering Cigarette -->
    <line x1="-15" y1="-25" x2="-45" y2="-5" stroke="#111" stroke-width="4"/>
    <g transform="translate(-50, -10)">
      <rect x="-2" y="-12" width="4" height="16" fill="#fff" stroke="#999" stroke-width="1"/>
      <rect x="-2" y="0" width="4" height="4" fill="#d97706"/>
      <circle cx="0" cy="-14" r="2" fill="#ef4444"/>
      <path d="M 0 -16 Q -8 -30 0 -45 T 10 -65" fill="none" stroke="#94a3b8" stroke-width="3" opacity="0.6"/>
    </g>
    <!-- Right Hand with Red Diet Coke Can -->
    <line x1="15" y1="-25" x2="40" y2="-5" stroke="#111" stroke-width="4"/>
    <g transform="translate(45, -5)">
      <rect x="-8" y="-16" width="16" height="24" rx="2" fill="#dc2626" stroke="#991b1b" stroke-width="2"/>
      <text x="0" y="2" font-family="'Impact', sans-serif" font-size="8" fill="#fff" text-anchor="middle">DIET</text>
    </g>
    <!-- Pale Head with Blonde Strands -->
    <ellipse cx="0" cy="-75" rx="22" ry="26" fill="#fefce8" stroke="#111" stroke-width="4"/>
    <!-- Dark Oval Grunge Sunglasses -->
    <ellipse cx="-8" cy="-75" rx="9" ry="6" fill="#0f172a"/>
    <ellipse cx="8" cy="-75" rx="9" ry="6" fill="#0f172a"/>
    <line x1="-1" y1="-75" x2="1" y2="-75" stroke="#0f172a" stroke-width="2"/>
    <!-- Blonde Twin Pigtails / Strands -->
    <path d="M -22 -85 Q -32 -40 -28 10" fill="none" stroke="#facc15" stroke-width="6" stroke-linecap="round"/>
    <path d="M 22 -85 Q 32 -40 28 10" fill="none" stroke="#facc15" stroke-width="6" stroke-linecap="round"/>
    <!-- Deadpan neutral mouth -->
    <line x1="-8" y1="-58" x2="8" y2="-58" stroke="#111" stroke-width="3"/>
  </g>
`);

// 17. couch_potato_chips
addAsset('characters', 'couch_potato_chips.svg', 'Couch Potato Stickman Eating Chips', 450, 450, `
  <g transform="translate(225, 240)">
    <!-- Cozy Brown Armchair -->
    <rect x="-110" y="-30" width="220" height="150" rx="18" fill="#78350f" stroke="#451a03" stroke-width="6"/>
    <rect x="-135" y="10" width="35" height="100" rx="14" fill="#92400e" stroke="#451a03" stroke-width="5"/>
    <rect x="100" y="10" width="35" height="100" rx="14" fill="#92400e" stroke="#451a03" stroke-width="5"/>
    <rect x="-90" y="30" width="180" height="70" rx="12" fill="#b45309"/>
    <!-- Stick Figure Relaxing in Chair -->
    <circle cx="0" cy="-60" r="28" fill="#fed89b" stroke="#111" stroke-width="5"/>
    <circle cx="-10" cy="-62" r="5" fill="#111"/>
    <circle cx="10" cy="-62" r="5" fill="#111"/>
    <path d="M -8 -45 Q 0 -38 8 -45" fill="none" stroke="#111" stroke-width="4" stroke-linecap="round"/>
    <line x1="0" y1="-32" x2="0" y2="40" stroke="#111" stroke-width="6"/>
    <!-- Blue T-Shirt -->
    <rect x="-20" y="-30" width="40" height="50" rx="6" fill="#38bdf8"/>
    <!-- Yellow Bag of Chips -->
    <g transform="translate(0, 20)">
      <polygon points="-16,-20 16,-20 14,22 -14,22" fill="#eab308" stroke="#a16207" stroke-width="2"/>
      <text x="0" y="5" font-family="'Impact', sans-serif" font-size="9" fill="#dc2626" text-anchor="middle">CHIPS</text>
    </g>
  </g>
`);

// 18. pixar_mom_curves
addAsset('characters', 'pixar_mom_curves.svg', 'Pixar Mom (Extreme Curves Silhouette)', 380, 520, `
  <g transform="translate(190, 260)">
    <ellipse cx="0" cy="190" rx="60" ry="14" fill="#000" opacity="0.15"/>
    <!-- Extreme Hourglass Spine Curve -->
    <path d="
      M -20 -80
      C -22 -40 -12 -10 -8 0
      C -30 20 -70 50 -70 100
      C -70 150 -30 180 -18 180
      L -18 190
      M 20 -80
      C 22 -40 12 -10 8 0
      C 30 20 70 50 70 100
      C 70 150 30 180 18 180
      L 18 190 Z"
      fill="#fb7185" stroke="#e11d48" stroke-width="5"/>
    <!-- Head & Stylized Hair Bun -->
    <circle cx="0" cy="-115" r="28" fill="#fed89b" stroke="#111" stroke-width="5"/>
    <circle cx="0" cy="-145" r="16" fill="#854d0e"/>
    <ellipse cx="-10" cy="-115" rx="6" ry="8" fill="#111"/>
    <ellipse cx="10" cy="-115" rx="6" ry="8" fill="#111"/>
    <!-- Annotation Arrow on 54-inch posterior -->
    <g transform="translate(85, 90)">
      <line x1="0" y1="0" x2="35" y2="0" stroke="#dc2626" stroke-width="3"/>
      <polygon points="0,0 8,-4 8,4" fill="#dc2626"/>
      <text x="40" y="5" font-family="'Impact', sans-serif" font-size="14" fill="#dc2626">54-inch</text>
    </g>
  </g>
`);

// 19. fitness_influencer_grift
addAsset('characters', 'fitness_influencer_grift.svg', 'Fitness Influencer (Resistance Band Grift)', 350, 480, `
  <g transform="translate(175, 270)">
    <ellipse cx="0" cy="160" rx="45" ry="12" fill="#000" opacity="0.15"/>
    <!-- Neon Pink Spandex Leggings -->
    <line x1="-12" y1="40" x2="-12" y2="160" stroke="#ec4899" stroke-width="8"/>
    <line x1="12" y1="40" x2="12" y2="160" stroke="#ec4899" stroke-width="8"/>
    <!-- Neon Sports Top -->
    <rect x="-24" y="-35" width="48" height="40" rx="6" fill="#10b981"/>
    <!-- Holding $49.99 Workout Band -->
    <g transform="translate(35, 10)">
      <ellipse cx="0" cy="0" rx="22" ry="12" fill="none" stroke="#f43f5e" stroke-width="6"/>
      <rect x="-20" y="16" width="40" height="18" rx="3" fill="#fde047" stroke="#ca8a04" stroke-width="1"/>
      <text x="0" y="29" font-family="'Impact', sans-serif" font-size="10" fill="#854d0e" text-anchor="middle">$49.99</text>
    </g>
    <!-- Head & High Slicked Ponytail -->
    <circle cx="0" cy="-75" r="26" fill="#fed89b" stroke="#111" stroke-width="5"/>
    <path d="M 12 -95 C 40 -115 50 -70 45 -40" fill="none" stroke="#854d0e" stroke-width="8" stroke-linecap="round"/>
    <ellipse cx="-8" cy="-75" rx="5" ry="7" fill="#111"/>
    <ellipse cx="8" cy="-75" rx="5" ry="7" fill="#111"/>
    <path d="M -8 -58 Q 0 -50 8 -58" fill="none" stroke="#e11d48" stroke-width="4"/>
  </g>
`);

// 20. boss_in_suit_coffee
addAsset('characters', 'boss_in_suit_coffee.svg', 'Corporate Boss (Grey Suit & Coffee Cup)', 350, 480, `
  <g transform="translate(175, 270)">
    <ellipse cx="0" cy="160" rx="45" ry="12" fill="#000" opacity="0.15"/>
    <line x1="-15" y1="60" x2="-15" y2="160" stroke="#334155" stroke-width="8"/>
    <line x1="15" y1="60" x2="15" y2="160" stroke="#334155" stroke-width="8"/>
    <!-- Corporate Suit Jacket & Red Tie -->
    <polygon points="-30,-45 30,-45 35,60 -35,60" fill="#475569" stroke="#1e293b" stroke-width="4"/>
    <polygon points="0,-45 -12,-10 0,25 12,-10" fill="#dc2626"/>
    <!-- Holding Steaming Coffee Mug -->
    <g transform="translate(45, 10)">
      <rect x="-12" y="-16" width="24" height="30" rx="4" fill="#ffffff" stroke="#1e293b" stroke-width="3"/>
      <path d="M 12 -8 C 22 -8 22 10 12 10" fill="none" stroke="#1e293b" stroke-width="3"/>
      <!-- Steam -->
      <path d="M -4 -20 Q -8 -30 -4 -40" fill="none" stroke="#94a3b8" stroke-width="2"/>
      <path d="M 4 -20 Q 0 -30 4 -40" fill="none" stroke="#94a3b8" stroke-width="2"/>
    </g>
    <!-- Stern Head & Furrowed Eyebrows -->
    <circle cx="0" cy="-80" r="30" fill="#fed89b" stroke="#111" stroke-width="5"/>
    <line x1="-18" y1="-95" x2="-6" y2="-88" stroke="#111" stroke-width="5"/>
    <line x1="18" y1="-95" x2="6" y2="-88" stroke="#111" stroke-width="5"/>
    <circle cx="-10" cy="-80" r="5" fill="#111"/>
    <circle cx="10" cy="-80" r="5" fill="#111"/>
    <line x1="-12" y1="-62" x2="12" y2="-62" stroke="#111" stroke-width="5"/>
  </g>
`);

// 21. y2k_runway_model
addAsset('characters', 'y2k_runway_model.svg', 'Y2K Runway Model ($2,400 Micro Belt Skirt)', 350, 480, `
  <g transform="translate(175, 270)">
    <ellipse cx="0" cy="160" rx="45" ry="12" fill="#000" opacity="0.15"/>
    <!-- Slim Legs -->
    <line x1="-10" y1="35" x2="-10" y2="160" stroke="#111" stroke-width="6"/>
    <line x1="10" y1="35" x2="10" y2="160" stroke="#111" stroke-width="6"/>
    <!-- Napkin Baby Tee -->
    <rect x="-24" y="-45" width="48" height="28" rx="3" fill="#f472b6" stroke="#db2777" stroke-width="2"/>
    <text x="0" y="-28" font-family="'Comic Sans MS', cursive" font-size="9" fill="#fff" text-anchor="middle">BABY</text>
    <!-- Exposed Midriff & Pelvic Bone -->
    <line x1="0" y1="-17" x2="0" y2="15" stroke="#111" stroke-width="5"/>
    <!-- 2-Inch Leather Belt Skirt ($2,400) -->
    <rect x="-30" y="15" width="60" height="18" rx="2" fill="#ca8a04" stroke="#854d0e" stroke-width="3"/>
    <rect x="-6" y="16" width="12" height="16" fill="#fef08a" stroke="#ca8a04" stroke-width="1.5"/>
    <!-- Floating $2,400 Price Tag -->
    <g transform="translate(45, 12)">
      <polygon points="0,0 12,-8 42,-8 42,8 12,8" fill="#fde047" stroke="#ca8a04" stroke-width="1.5"/>
      <text x="26" y="4" font-family="'Impact', sans-serif" font-size="9" fill="#854d0e" text-anchor="middle">$2,400</text>
    </g>
    <!-- Head & Y2K Wraparound Sunglasses -->
    <circle cx="0" cy="-75" r="26" fill="#fed89b" stroke="#111" stroke-width="5"/>
    <ellipse cx="0" cy="-75" rx="22" ry="9" fill="#111" stroke="#38bdf8" stroke-width="2"/>
  </g>
`);

// 22. plastic_surgeon_scalpel
addAsset('characters', 'plastic_surgeon_scalpel.svg', 'Plastic Surgeon (Scrubs & Scalpel)', 350, 480, `
  <g transform="translate(175, 270)">
    <ellipse cx="0" cy="160" rx="45" ry="12" fill="#000" opacity="0.15"/>
    <line x1="-12" y1="50" x2="-12" y2="160" stroke="#0d9488" stroke-width="8"/>
    <line x1="12" y1="50" x2="12" y2="160" stroke="#0d9488" stroke-width="8"/>
    <!-- Teal Scrubs -->
    <polygon points="-28,-40 28,-40 32,50 -32,50" fill="#0d9488" stroke="#115e59" stroke-width="4"/>
    <!-- Surgical Mask -->
    <circle cx="0" cy="-75" r="28" fill="#fed89b" stroke="#111" stroke-width="5"/>
    <rect x="-18" y="-72" width="36" height="24" rx="4" fill="#99f6e4" stroke="#0f766e" stroke-width="2"/>
    <!-- Headlamp -->
    <ellipse cx="0" cy="-105" rx="30" ry="6" fill="#0f172a"/>
    <circle cx="0" cy="-105" r="10" fill="#38bdf8" filter="url(#glow)"/>
    <!-- Right hand holding scalpel -->
    <g transform="translate(45, -10)">
      <polygon points="0,0 35,-25 40,-20 5,5" fill="#cbd5e1" stroke="#475569" stroke-width="2"/>
      <polygon points="35,-25 50,-35 45,-20" fill="#e2e8f0" stroke="#64748b" stroke-width="1.5"/>
    </g>
  </g>
`);

// 23. mcu_superhero_shredded
addAsset('characters', 'mcu_superhero_shredded.svg', 'MCU Superhero (Dehydrated 8-Pack Abs)', 350, 480, `
  <g transform="translate(175, 270)">
    <ellipse cx="0" cy="160" rx="45" ry="12" fill="#000" opacity="0.15"/>
    <!-- Muscular Legs -->
    <line x1="-16" y1="50" x2="-16" y2="160" stroke="#111" stroke-width="9"/>
    <line x1="16" y1="50" x2="16" y2="160" stroke="#111" stroke-width="9"/>
    <!-- Shrink-wrapped 8-pack abs -->
    <path d="M -30 -40 L 30 -40 L 25 50 L -25 50 Z" fill="#fed89b" stroke="#111" stroke-width="5"/>
    <line x1="0" y1="-35" x2="0" y2="45" stroke="#b45309" stroke-width="3"/>
    <line x1="-18" y1="-15" x2="18" y2="-15" stroke="#b45309" stroke-width="3"/>
    <line x1="-18" y1="5" x2="18" y2="5" stroke="#b45309" stroke-width="3"/>
    <line x1="-18" y1="25" x2="18" y2="25" stroke="#b45309" stroke-width="3"/>
    <!-- Huge Biceps -->
    <ellipse cx="-42" cy="-20" rx="14" ry="22" fill="#fed89b" stroke="#111" stroke-width="4"/>
    <ellipse cx="42" cy="-20" rx="14" ry="22" fill="#fed89b" stroke="#111" stroke-width="4"/>
    <!-- Dehydrated Thirsty Face -->
    <circle cx="0" cy="-75" r="28" fill="#fed89b" stroke="#111" stroke-width="5"/>
    <circle cx="-10" cy="-78" r="4" fill="#111"/>
    <circle cx="10" cy="-78" r="4" fill="#111"/>
    <ellipse cx="0" cy="-58" rx="8" ry="12" fill="#221111"/>
    <!-- Thought Bubble: Water -->
    <g transform="translate(60, -110)">
      <ellipse cx="0" cy="0" rx="26" ry="18" fill="#fff" stroke="#111" stroke-width="2"/>
      <text x="0" y="5" font-family="sans-serif" font-size="10" fill="#0284c7" text-anchor="middle">WATER</text>
    </g>
  </g>
`);

// 24. concierge_doctor_gold
addAsset('characters', 'concierge_doctor_gold.svg', 'Concierge Doctor ($1,200/mo Prescription)', 350, 480, `
  <g transform="translate(175, 270)">
    <ellipse cx="0" cy="160" rx="45" ry="12" fill="#000" opacity="0.15"/>
    <line x1="-12" y1="60" x2="-12" y2="160" stroke="#111" stroke-width="7"/>
    <line x1="12" y1="60" x2="12" y2="160" stroke="#111" stroke-width="7"/>
    <!-- Gold Trimmed White Lab Coat -->
    <path d="M -30 -45 L 30 -45 L 35 60 L -35 60 Z" fill="#ffffff" stroke="#f59e0b" stroke-width="4"/>
    <!-- Gold Stethoscope -->
    <path d="M -15 -45 C -25 -20 -10 10 0 20 C 10 10 25 -20 15 -45" fill="none" stroke="#f59e0b" stroke-width="4"/>
    <circle cx="0" cy="20" r="8" fill="#fde047" stroke="#b45309" stroke-width="2"/>
    <!-- Holding Prescription Pad -->
    <g transform="translate(45, 10)">
      <rect x="-15" y="-20" width="30" height="40" rx="3" fill="#fff" stroke="#111" stroke-width="2"/>
      <text x="0" y="-5" font-family="'Impact', sans-serif" font-size="10" fill="#15803d" text-anchor="middle">GLP-1</text>
      <text x="0" y="10" font-family="'Impact', sans-serif" font-size="9" fill="#dc2626" text-anchor="middle">$1,200</text>
    </g>
    <!-- Smiling Doctor Head -->
    <circle cx="0" cy="-75" r="28" fill="#fed89b" stroke="#111" stroke-width="5"/>
    <circle cx="-10" cy="-76" r="4" fill="#111"/>
    <circle cx="10" cy="-76" r="4" fill="#111"/>
    <path d="M -10 -58 Q 0 -50 10 -58" fill="none" stroke="#111" stroke-width="4"/>
  </g>
`);

// 25. cyborg_hollywood_clone
addAsset('characters', 'cyborg_hollywood_clone.svg', 'Cyborg Hollywood Clone (Synthetic Seams)', 350, 480, `
  <g transform="translate(175, 270)">
    <ellipse cx="0" cy="160" rx="45" ry="12" fill="#000" opacity="0.15"/>
    <line x1="-12" y1="50" x2="-12" y2="160" stroke="#475569" stroke-width="7"/>
    <line x1="12" y1="50" x2="12" y2="160" stroke="#475569" stroke-width="7"/>
    <rect x="-25" y="-40" width="50" height="90" rx="8" fill="#94a3b8" stroke="#334155" stroke-width="4"/>
    <!-- Glowing Battery Meter on Chest -->
    <rect x="-15" y="-20" width="30" height="12" rx="2" fill="#0f172a" stroke="#22c55e" stroke-width="2"/>
    <rect x="-13" y="-18" width="22" height="8" fill="#22c55e"/>
    <!-- Metallic Cyborg Head -->
    <ellipse cx="0" cy="-75" rx="26" ry="30" fill="#cbd5e1" stroke="#334155" stroke-width="5"/>
    <!-- Cybernetic Eye -->
    <circle cx="-10" cy="-76" r="7" fill="#111"/>
    <circle cx="-10" cy="-76" r="4" fill="#ef4444" filter="url(#glow)"/>
    <circle cx="10" cy="-76" r="6" fill="#0284c7"/>
    <!-- Face Panel Seam Lines -->
    <line x1="0" y1="-105" x2="0" y2="-55" stroke="#64748b" stroke-width="2" stroke-dasharray="4 2"/>
    <line x1="-26" y1="-75" x2="26" y2="-75" stroke="#64748b" stroke-width="2" stroke-dasharray="4 2"/>
  </g>
`);

// 26. botox_actor_crying
addAsset('characters', 'botox_actor_crying.svg', 'Botox Actor Crying (Frozen Paralyzed Forehead)', 350, 480, `
  <g transform="translate(175, 270)">
    <ellipse cx="0" cy="160" rx="45" ry="12" fill="#000" opacity="0.15"/>
    <line x1="-12" y1="50" x2="-12" y2="160" stroke="#111" stroke-width="7"/>
    <line x1="12" y1="50" x2="12" y2="160" stroke="#111" stroke-width="7"/>
    <line x1="0" y1="-40" x2="0" y2="50" stroke="#111" stroke-width="8"/>
    <!-- Head with Completely Smooth Frozen Forehead -->
    <circle cx="0" cy="-75" r="32" fill="#fed89b" stroke="#111" stroke-width="5"/>
    <!-- Locked Flat Eyebrows -->
    <line x1="-20" y1="-92" x2="-5" y2="-92" stroke="#111" stroke-width="5"/>
    <line x1="5" y1="-92" x2="20" y2="-92" stroke="#111" stroke-width="5"/>
    <!-- Sad Eyes with Giant Blue Tear Dropping -->
    <circle cx="-12" cy="-78" r="5" fill="#111"/>
    <circle cx="12" cy="-78" r="5" fill="#111"/>
    <!-- Blue Falling Tear -->
    <path d="M 12 -70 Q 16 -60 12 -50 Q 8 -60 12 -70 Z" fill="#38bdf8" stroke="#0284c7" stroke-width="1.5"/>
    <!-- Sad Wobbly Mouth below Frozen Upper Face -->
    <path d="M -14 -52 Q 0 -62 14 -52" fill="none" stroke="#111" stroke-width="4" stroke-linecap="round"/>
    <!-- "0 WRINKLES" Label -->
    <rect x="-35" y="-125" width="70" height="20" rx="4" fill="#f1f5f9" stroke="#94a3b8" stroke-width="1.5"/>
    <text x="0" y="-111" font-family="'Courier New', monospace" font-size="9" font-weight="bold" fill="#0f172a" text-anchor="middle">0 WRINKLES</text>
  </g>
`);

// ----------------------------------------------------
// 2. INFOGRAPHICS & CHARTS (24 Assets)
// ----------------------------------------------------

// 27. hollywood_ecosystem_flowchart
addAsset('infographics', 'hollywood_ecosystem_flowchart.svg', 'Hollywood Ecosystem Flowchart', 900, 560, `
  <g transform="translate(30, 30)">
    <rect x="0" y="0" width="840" height="500" rx="16" fill="#ffffff" stroke="#111111" stroke-width="5" filter="url(#cardShadow)"/>
    <rect x="0" y="0" width="840" height="60" rx="16" fill="#1e293b"/>
    <text x="420" y="38" font-family="'Impact', sans-serif" font-size="28" fill="#ffffff" letter-spacing="2" text-anchor="middle">THE HOLLYWOOD ECOSYSTEM (2024)</text>
    
    <!-- Node 1 -->
    <g transform="translate(50, 100)">
      <rect width="320" height="120" rx="10" fill="#eff6ff" stroke="#3b82f6" stroke-width="3"/>
      <text x="160" y="35" font-family="'Impact', sans-serif" font-size="20" fill="#1e40af" text-anchor="middle">1. CELEBRITY OPTS OUT</text>
      <text x="160" y="70" font-family="sans-serif" font-size="14" fill="#475569" text-anchor="middle">- Disappears for 3 weeks</text>
      <text x="160" y="95" font-family="sans-serif" font-size="14" font-weight="bold" fill="#dc2626" text-anchor="middle">- Returns with -40 lbs jaw</text>
    </g>

    <!-- Arrow 1 -->
    <path d="M 400 160 L 460 160" stroke="#ef4444" stroke-width="6" stroke-linecap="round"/>
    <polygon points="475,160 455,150 455,170" fill="#ef4444"/>

    <!-- Node 2 -->
    <g transform="translate(490, 100)">
      <rect width="300" height="120" rx="10" fill="#fef2f2" stroke="#ef4444" stroke-width="3"/>
      <text x="150" y="35" font-family="'Impact', sans-serif" font-size="20" fill="#991b1b" text-anchor="middle">2. RED CARPET PRESS</text>
      <text x="150" y="70" font-family="sans-serif" font-size="14" fill="#475569" text-anchor="middle">"What is your secret?"</text>
      <text x="150" y="95" font-family="'Courier New', monospace" font-size="13" font-weight="bold" fill="#16a34a" text-anchor="middle">"Just Pilates &amp; Water!"</text>
    </g>

    <!-- Node 3 -->
    <g transform="translate(200, 290)">
      <rect width="440" height="150" rx="12" fill="#f0fdf4" stroke="#16a34a" stroke-width="4"/>
      <text x="220" y="40" font-family="'Impact', sans-serif" font-size="24" fill="#166534" text-anchor="middle">3. PUBLIC MASS PANIC</text>
      <text x="220" y="80" font-family="sans-serif" font-size="16" fill="#334155" text-anchor="middle">"Wait... are we supposed to be tiny again?"</text>
      <rect x="50" y="100" width="340" height="32" rx="6" fill="#fee2e2" stroke="#dc2626" stroke-width="2"/>
      <text x="220" y="122" font-family="'Impact', sans-serif" font-size="16" fill="#dc2626" text-anchor="middle">STATUS: TOTAL DIETARY CHAOS</text>
    </g>
  </g>
`);

// 28. timeline_velocity_slider
addAsset('infographics', 'timeline_velocity_slider.svg', 'Timeline Velocity Slider', 850, 400, `
  <g transform="translate(25, 25)">
    <rect width="800" height="350" rx="16" fill="#ffffff" stroke="#111" stroke-width="5" filter="url(#cardShadow)"/>
    <rect width="800" height="55" rx="16" fill="#0f172a"/>
    <text x="400" y="36" font-family="'Impact', sans-serif" font-size="26" fill="#fff" text-anchor="middle">THE TIMELINE VELOCITY (2016 -> 2024)</text>
    
    <!-- Slider Track -->
    <g transform="translate(60, 130)">
      <rect y="0" width="680" height="40" rx="20" fill="#f1f5f9" stroke="#cbd5e1" stroke-width="4"/>
      <rect y="0" width="580" height="40" rx="20" fill="url(#laserGrad)"/>
      <!-- THICC Marker -->
      <circle cx="100" cy="20" r="26" fill="#f43f5e" stroke="#881337" stroke-width="3"/>
      <text x="100" y="75" font-family="'Impact', sans-serif" font-size="20" fill="#be123c" text-anchor="middle">"THICC"</text>
      <text x="100" y="98" font-family="sans-serif" font-size="13" fill="#64748b" text-anchor="middle">2016-2022</text>
      <!-- STICK Marker -->
      <circle cx="580" cy="20" r="26" fill="#0ea5e9" stroke="#0369a1" stroke-width="3"/>
      <text x="580" y="75" font-family="'Impact', sans-serif" font-size="20" fill="#0284c7" text-anchor="middle">"STICK"</text>
      <text x="580" y="98" font-family="sans-serif" font-size="13" fill="#64748b" text-anchor="middle">2024 Present</text>
      <!-- Handle -->
      <circle cx="580" cy="20" r="22" fill="#e11d48" stroke="#fff" stroke-width="4" filter="url(#glow)"/>
    </g>
  </g>
`);

// 29. forensic_lean_audit_hud
addAsset('infographics', 'forensic_lean_audit_hud.svg', 'Forensic Lean Audit HUD', 800, 480, `
  <g transform="translate(20, 20)">
    <rect width="760" height="440" rx="14" fill="#0f172a" stroke="#0ea5e9" stroke-width="4" filter="url(#cardShadow)"/>
    <text x="380" y="45" font-family="'Courier New', monospace" font-size="22" font-weight="bold" fill="#38bdf8" text-anchor="middle">FORENSIC JAWLINE AUDIT SYSTEM v4.2</text>
    <line x1="30" y1="65" x2="730" y2="65" stroke="#0284c7" stroke-width="2"/>
    <!-- Reticle -->
    <g transform="translate(380, 220)">
      <circle r="90" fill="none" stroke="#ef4444" stroke-width="2" stroke-dasharray="10 6"/>
      <circle r="50" fill="none" stroke="#ef4444" stroke-width="3"/>
      <circle r="6" fill="#ef4444"/>
      <line x1="-120" y1="0" x2="120" y2="0" stroke="#ef4444" stroke-width="2"/>
      <line x1="0" y1="-120" x2="0" y2="120" stroke="#ef4444" stroke-width="2"/>
    </g>
    <!-- Digital Readout Badges -->
    <g transform="translate(60, 360)">
      <rect width="280" height="50" rx="8" fill="#1e293b" stroke="#38bdf8" stroke-width="2"/>
      <text x="140" y="32" font-family="'Courier New', monospace" font-size="18" font-weight="bold" fill="#38bdf8" text-anchor="middle">JAWLINE: 0.02 mm</text>
    </g>
    <g transform="translate(420, 360)">
      <rect width="280" height="50" rx="8" fill="#14532d" stroke="#22c55e" stroke-width="2"/>
      <text x="140" y="32" font-family="'Impact', sans-serif" font-size="18" fill="#4ade80" text-anchor="middle">STATUS: 0% SUB-Q FAT</text>
    </g>
  </g>
`);

// 30. carbs_unsubscribe_modal
addAsset('infographics', 'carbs_unsubscribe_modal.svg', 'Carbs Unsubscribe Modal Dialog', 700, 500, `
  <g transform="translate(20, 20)">
    <rect width="660" height="460" rx="14" fill="#ffffff" stroke="#111" stroke-width="5" filter="url(#cardShadow)"/>
    <path d="M 0 14 C 0 6.2 6.2 0 14 0 L 646 0 C 653.8 0 660 6.2 660 14 L 660 40 L 0 40 Z" fill="#f1f5f9"/>
    <circle cx="20" cy="20" r="6" fill="#ef4444"/>
    <circle cx="36" cy="20" r="6" fill="#f59e0b"/>
    <circle cx="52" cy="20" r="6" fill="#10b981"/>
    <text x="330" y="26" font-family="sans-serif" font-size="13" fill="#64748b" text-anchor="middle">Dietary Preferences</text>
    
    <text x="330" y="90" font-family="'Impact', sans-serif" font-size="26" fill="#0f172a" text-anchor="middle">UNSUBSCRIBE FROM CARBOHYDRATES</text>
    <text x="330" y="125" font-family="sans-serif" font-size="15" fill="#64748b" text-anchor="middle">Cancel biological subscription to lunch, pizza, and bread?</text>
    
    <!-- Crossed Carb Icons -->
    <g transform="translate(110, 160)">
      <rect width="440" height="100" rx="10" fill="#fff1f2" stroke="#f43f5e" stroke-width="2"/>
      <!-- Pizza -->
      <g transform="translate(60, 50)">
        <polygon points="0,-25 20,20 -20,20" fill="#f59e0b" stroke="#b45309" stroke-width="2"/>
        <line x1="-25" y1="-25" x2="25" y2="25" stroke="#ef4444" stroke-width="4"/>
      </g>
      <!-- Bread -->
      <g transform="translate(220, 50)">
        <ellipse rx="30" ry="18" fill="#d97706"/>
        <line x1="-30" y1="-20" x2="30" y2="20" stroke="#ef4444" stroke-width="4"/>
      </g>
      <!-- Pasta -->
      <g transform="translate(380, 50)">
        <ellipse rx="26" ry="14" fill="#e2e8f0" stroke="#64748b" stroke-width="2"/>
        <line x1="-25" y1="-20" x2="25" y2="20" stroke="#ef4444" stroke-width="4"/>
      </g>
    </g>

    <!-- Red Unsubscribe Button -->
    <g transform="translate(210, 310)">
      <rect width="240" height="55" rx="8" fill="#dc2626" stroke="#991b1b" stroke-width="3"/>
      <text x="120" y="35" font-family="'Impact', sans-serif" font-size="22" fill="#ffffff" letter-spacing="2" text-anchor="middle">[X] UNSUBSCRIBED</text>
    </g>
    <text x="330" y="410" font-family="sans-serif" font-size="11" fill="#94a3b8" text-anchor="middle">*Side effects: severe hangry rage, brain fog, zero joy.</text>
  </g>
`);

// 31. usda_1990s_food_pyramid
addAsset('infographics', 'usda_1990s_food_pyramid.svg', 'Official 1990s USDA Food Pyramid', 700, 600, `
  <g transform="translate(20, 20)">
    <rect width="660" height="560" rx="16" fill="#ffffff" stroke="#111" stroke-width="5" filter="url(#cardShadow)"/>
    <rect width="660" height="60" rx="16" fill="#1e293b"/>
    <text x="330" y="40" font-family="'Impact', sans-serif" font-size="26" fill="#ffffff" letter-spacing="2" text-anchor="middle">THE 1990s OFFICIAL USDA FOOD PYRAMID</text>
    
    <!-- Triangle -->
    <g transform="translate(105, 90)">
      <polygon points="225,0 0,420 450,420" fill="#f8fafc" stroke="#111" stroke-width="5"/>
      <line x1="112" y1="140" x2="338" y2="140" stroke="#111" stroke-width="3"/>
      <line x1="56" y1="280" x2="394" y2="280" stroke="#111" stroke-width="3"/>
      <!-- Top Tier: Diet Coke -->
      <text x="225" y="90" font-family="'Impact', sans-serif" font-size="18" fill="#dc2626" text-anchor="middle">DIET COKE</text>
      <text x="225" y="112" font-family="sans-serif" font-size="11" fill="#64748b" text-anchor="middle">(Breakfast, Lunch &amp; Dinner)</text>
      <!-- Middle Tier: Parliament Cigarettes -->
      <text x="225" y="215" font-family="'Impact', sans-serif" font-size="18" fill="#1e40af" text-anchor="middle">PARLIAMENT CIGARETTES</text>
      <text x="225" y="238" font-family="sans-serif" font-size="11" fill="#64748b" text-anchor="middle">(Recessed Filter for Maximum Aloofness)</text>
      <!-- Base Tier: Pure Apathy -->
      <text x="225" y="350" font-family="'Impact', sans-serif" font-size="22" fill="#15803d" text-anchor="middle">PURE UNFILTERED APATHY</text>
      <text x="225" y="375" font-family="sans-serif" font-size="12" fill="#64748b" text-anchor="middle">100% Daily Value of "I literally do not care"</text>
    </g>
  </g>
`);

// 32. victorian_medical_report
addAsset('infographics', 'victorian_medical_report.svg', 'Victorian Medical Report (1894)', 650, 480, `
  <g transform="translate(20, 20)">
    <rect width="610" height="440" rx="12" fill="#fefce8" stroke="#854d0e" stroke-width="4" filter="url(#cardShadow)"/>
    <text x="305" y="45" font-family="'Impact', sans-serif" font-size="24" fill="#854d0e" text-anchor="middle">ROYAL INFIRMARY DIAGNOSTIC REPORT (1894)</text>
    <line x1="40" y1="65" x2="570" y2="65" stroke="#ca8a04" stroke-width="2"/>
    <g transform="translate(50, 110)">
      <text y="0" font-family="sans-serif" font-size="16" fill="#111">- Condition: Fashionable Melancholy &amp; Consumption</text>
      <text y="45" font-family="sans-serif" font-size="16" fill="#111">- Aesthetic: Dangerously Pale, Delicate, and Chic</text>
      <text y="90" font-family="sans-serif" font-size="16" fill="#111">- Prescription: Sea Air &amp; Lace Handkerchiefs</text>
      <text y="135" font-family="sans-serif" font-size="16" fill="#111">- Protocol: Immediate Fainting on Velvet Chaise Lounge</text>
    </g>
  </g>
`);

// 33. beauty_pendulum_gauge
addAsset('infographics', 'beauty_pendulum_gauge.svg', 'Beauty Standards Pendulum Gauge', 750, 450, `
  <g transform="translate(25, 25)">
    <rect width="700" height="400" rx="16" fill="#ffffff" stroke="#111" stroke-width="5" filter="url(#cardShadow)"/>
    <rect width="700" height="55" rx="16" fill="#0f172a"/>
    <text x="350" y="36" font-family="'Impact', sans-serif" font-size="24" fill="#fff" text-anchor="middle">THE CYCLICAL BEAUTY PENDULUM</text>
    <!-- Arc -->
    <path d="M 120 220 Q 350 320 580 220" fill="none" stroke="#cbd5e1" stroke-width="4" stroke-dasharray="8 6"/>
    <!-- Left Extremity -->
    <g transform="translate(120, 200)">
      <circle r="30" fill="#0284c7" stroke="#0369a1" stroke-width="3"/>
      <text y="6" font-family="'Impact', sans-serif" font-size="12" fill="#fff" text-anchor="middle">90s HEROIN</text>
    </g>
    <!-- Right Extremity -->
    <g transform="translate(580, 200)">
      <circle r="30" fill="#e11d48" stroke="#9f1239" stroke-width="3"/>
      <text y="6" font-family="'Impact', sans-serif" font-size="12" fill="#fff" text-anchor="middle">2010s BBL</text>
    </g>
    <!-- Swinging Ball Center -->
    <g transform="translate(350, 290)">
      <circle r="35" fill="#dc2626" stroke="#991b1b" stroke-width="4"/>
      <text y="6" font-family="'Impact', sans-serif" font-size="14" fill="#fff" text-anchor="middle">NOW</text>
    </g>
  </g>
`);

// 34. orbital_gravity_simulation
addAsset('infographics', 'orbital_gravity_simulation.svg', 'Orbital Gravitational Pull Simulation', 800, 500, `
  <g transform="translate(20, 20)">
    <rect width="760" height="460" rx="14" fill="#030712" stroke="#0284c7" stroke-width="3"/>
    <text x="380" y="45" font-family="'Courier New', monospace" font-size="20" font-weight="bold" fill="#38bdf8" text-anchor="middle">ORBITAL GRAVITATIONAL ANOMALY (F = G*m1*m2/r^2)</text>
    <!-- Elliptical Orbits -->
    <ellipse cx="380" cy="240" rx="280" ry="120" fill="none" stroke="#0284c7" stroke-width="2" stroke-dasharray="8 6"/>
    <ellipse cx="380" cy="240" rx="200" ry="80" fill="none" stroke="#38bdf8" stroke-width="2" stroke-dasharray="6 4" opacity="0.6"/>
    <!-- Supermassive Body -->
    <ellipse cx="380" cy="240" rx="90" ry="55" fill="#f43f5e" stroke="#fb7185" stroke-width="5" filter="url(#glow)"/>
    <text x="380" y="246" font-family="'Impact', sans-serif" font-size="20" fill="#ffffff" text-anchor="middle">SUPERMASSIVE</text>
    <!-- Orbiting iPhone -->
    <g transform="translate(620, 220)">
      <rect x="-10" y="-18" width="20" height="36" rx="3" fill="#1e293b" stroke="#cbd5e1" stroke-width="1.5"/>
      <text x="0" y="28" font-family="sans-serif" font-size="9" fill="#38bdf8" text-anchor="middle">iPhone</text>
    </g>
  </g>
`);

// 35. fitness_claim_vs_reality_card
addAsset('infographics', 'fitness_claim_vs_reality_card.svg', 'Fitness Influencer Claim vs Reality', 800, 480, `
  <g transform="translate(20, 20)">
    <rect width="760" height="440" rx="16" fill="#ffffff" stroke="#111" stroke-width="5" filter="url(#cardShadow)"/>
    <rect width="760" height="55" rx="16" fill="#15803d"/>
    <text x="380" y="36" font-family="'Impact', sans-serif" font-size="24" fill="#fff" text-anchor="middle">FITNESS INFLUENCER CLAIM vs CLINICAL REALITY</text>
    <!-- Left: The Claim -->
    <g transform="translate(50, 90)">
      <rect width="300" height="300" rx="10" fill="#f0fdf4" stroke="#16a34a" stroke-width="3"/>
      <text x="150" y="40" font-family="'Impact', sans-serif" font-size="20" fill="#15803d" text-anchor="middle">THE "SECRET" CLAIM</text>
      <text x="20" y="90" font-family="sans-serif" font-size="14" fill="#111">- 3 sets of glute kickbacks</text>
      <text x="20" y="130" font-family="sans-serif" font-size="14" fill="#111">- 1 organic matcha latte</text>
      <text x="20" y="170" font-family="sans-serif" font-size="14" fill="#111">- "Mind-muscle connection"</text>
      <text x="20" y="220" font-family="sans-serif" font-size="14" font-weight="bold" fill="#16a34a">- Buy my $49.99 band</text>
    </g>
    <!-- Right: The Reality -->
    <g transform="translate(410, 90)">
      <rect width="300" height="300" rx="10" fill="#fef2f2" stroke="#dc2626" stroke-width="3"/>
      <text x="150" y="40" font-family="'Impact', sans-serif" font-size="20" fill="#991b1b" text-anchor="middle">THE CLINICAL REALITY</text>
      <text x="20" y="90" font-family="sans-serif" font-size="14" fill="#111">- Miami outpatient surgical suite</text>
      <text x="20" y="130" font-family="sans-serif" font-size="14" fill="#111">- 4 liters of fat relocation</text>
      <text x="20" y="170" font-family="sans-serif" font-size="14" fill="#111">- 6 weeks in compression suit</text>
      <text x="20" y="220" font-family="sans-serif" font-size="14" font-weight="bold" fill="#dc2626">- $15,000 credit card bill</text>
    </g>
  </g>
`);

// 36. structural_hourglass_failure
addAsset('infographics', 'structural_hourglass_failure.svg', 'Structural Hourglass Failure', 600, 540, `
  <g transform="translate(20, 20)">
    <rect width="560" height="500" rx="14" fill="#ffffff" stroke="#111" stroke-width="5" filter="url(#cardShadow)"/>
    <rect width="560" height="50" rx="14" fill="#ca8a04"/>
    <text x="280" y="34" font-family="'Impact', sans-serif" font-size="22" fill="#fff" text-anchor="middle">STRUCTURAL HOURGLASS FAILURE</text>
    <!-- Bulging Hourglass -->
    <g transform="translate(280, 240)">
      <polygon points="-60,-130 60,-130 8,-15 -8,-15" fill="#f8fafc" stroke="#111" stroke-width="5"/>
      <path d="M -8 15 L -120 120 C -120 160 120 160 120 120 L 8 15 Z" fill="#fef08a" stroke="#111" stroke-width="5"/>
      <!-- Cracks -->
      <path d="M -80 90 L -60 110 L -70 130" stroke="#ef4444" stroke-width="4" fill="none"/>
      <path d="M 70 80 L 50 105 L 60 125" stroke="#ef4444" stroke-width="4" fill="none"/>
      <text y="180" font-family="'Impact', sans-serif" font-size="16" fill="#dc2626" text-anchor="middle">WARNING: CAPACITY EXCEEDED</text>
    </g>
  </g>
`);

// 37. corporate_body_positivity_ad
addAsset('infographics', 'corporate_body_positivity_ad.svg', 'Corporate Body Positivity Ad Campaign', 700, 480, `
  <g transform="translate(20, 20)">
    <rect width="660" height="440" rx="16" fill="#fdf4ff" stroke="#a21caf" stroke-width="4" filter="url(#cardShadow)"/>
    <text x="330" y="70" font-family="'Impact', sans-serif" font-size="34" fill="#a21caf" text-anchor="middle">"Every Body Is Beautiful!*"</text>
    <text x="330" y="120" font-family="sans-serif" font-size="16" fill="#475569" text-anchor="middle">*(As long as you buy our $98 Firming Cream)</text>
    <circle cx="80" cy="180" r="10" fill="#f472b6"/>
    <circle cx="580" cy="160" r="12" fill="#60a5fa"/>
    <rect x="60" y="320" width="540" height="50" rx="8" fill="#f3f4f6"/>
    <text x="330" y="350" font-family="'Courier New', monospace" font-size="11" fill="#6b7280" text-anchor="middle">TERMS: Offer expires immediately when a thinner look trends on TikTok.</text>
  </g>
`);

// 38. excel_financial_projections
addAsset('infographics', 'excel_financial_projections.svg', 'Excel Q3 Projections (Panic Close)', 750, 480, `
  <g transform="translate(20, 20)">
    <rect width="710" height="440" rx="12" fill="#ffffff" stroke="#166534" stroke-width="4" filter="url(#cardShadow)"/>
    <rect width="710" height="40" rx="12" fill="#166534"/>
    <text x="355" y="26" font-family="sans-serif" font-size="14" font-weight="bold" fill="#fff" text-anchor="middle">Microsoft Excel - Q3_Financial_Projections_CONFIDENTIAL.xlsx</text>
    <!-- Grid -->
    <g stroke="#cbd5e1" stroke-width="1">
      <line x1="0" y1="80" x2="710" y2="80"/>
      <line x1="0" y1="120" x2="710" y2="120"/>
      <line x1="0" y1="160" x2="710" y2="160"/>
      <line x1="120" y1="40" x2="120" y2="440"/>
      <line x1="300" y1="40" x2="300" y2="440"/>
      <line x1="500" y1="40" x2="500" y2="440"/>
    </g>
    <!-- Big Red Panic Key -->
    <g transform="translate(355, 280)">
      <rect x="-160" y="-40" width="320" height="80" rx="12" fill="#dc2626" stroke="#991b1b" stroke-width="4" filter="url(#glow)"/>
      <text y="10" font-family="'Impact', sans-serif" font-size="32" fill="#ffffff" text-anchor="middle">Ctrl + W (PANIC CLOSE)</text>
    </g>
  </g>
`);

// 39. anatomical_threat_matrix
addAsset('infographics', 'anatomical_threat_matrix.svg', 'Anatomical Threat Matrix', 700, 480, `
  <g transform="translate(20, 20)">
    <rect width="660" height="440" rx="16" fill="#fef2f2" stroke="#991b1b" stroke-width="5" filter="url(#cardShadow)"/>
    <rect width="660" height="50" rx="16" fill="#991b1b"/>
    <text x="330" y="34" font-family="'Impact', sans-serif" font-size="22" fill="#fff" text-anchor="middle">ANATOMICAL THREAT MATRIX: WHERE DO ORGANS GO?</text>
    <!-- Pelvic Hazard Line -->
    <g transform="translate(180, 240)">
      <rect x="-40" y="-120" width="80" height="240" rx="40" fill="#fee2e2" stroke="#dc2626" stroke-width="3"/>
      <ellipse cx="0" cy="-20" rx="25" ry="35" fill="#ef4444" opacity="0.6"/>
      <line x1="-80" y1="-20" x2="80" y2="-20" stroke="#b91c1c" stroke-width="4" stroke-dasharray="6 4"/>
      <text x="90" y="-15" font-family="sans-serif" font-size="12" font-weight="bold" fill="#dc2626">&lt;- PELVIC HAZARD LINE</text>
    </g>
    <!-- Checklist -->
    <g transform="translate(420, 120)">
      <text y="30" font-family="sans-serif" font-size="15" fill="#111">- Liver: Evicted to cloud</text>
      <text y="70" font-family="sans-serif" font-size="15" fill="#111">- Spleen: Deleted by waistband</text>
      <text y="110" font-family="sans-serif" font-size="15" fill="#111">- Stomach: Paused indefinitely</text>
    </g>
  </g>
`);

// 40. miu_miu_price_breakdown
addAsset('infographics', 'miu_miu_price_breakdown.svg', 'Miu Miu $2400 Micro-Skirt Breakdown', 600, 450, `
  <g transform="translate(20, 20)">
    <rect width="560" height="410" rx="14" fill="#ffffff" stroke="#86198f" stroke-width="4" filter="url(#cardShadow)"/>
    <text x="280" y="45" font-family="'Impact', sans-serif" font-size="24" fill="#86198f" text-anchor="middle">THE $2,400 MICRO-SKIRT</text>
    <rect x="180" y="120" width="200" height="40" rx="4" fill="#ca8a04" stroke="#854d0e" stroke-width="3"/>
    <text x="280" y="210" font-family="sans-serif" font-size="16" fill="#111" text-anchor="middle">Total Fabric: 1.5 square inches</text>
    <text x="280" y="250" font-family="'Impact', sans-serif" font-size="28" fill="#ca8a04" text-anchor="middle">PRICE: $2,400 USD</text>
    <text x="280" y="290" font-family="sans-serif" font-size="13" fill="#64748b" text-anchor="middle">Cost per sq inch: $1,600.00</text>
  </g>
`);

// 41. glp1_gastric_mechanism
addAsset('infographics', 'glp1_gastric_mechanism.svg', 'GLP-1 Gastric Emptying Mechanism', 750, 480, `
  <g transform="translate(20, 20)">
    <rect width="710" height="440" rx="14" fill="#ffffff" stroke="#0284c7" stroke-width="4" filter="url(#cardShadow)"/>
    <rect width="710" height="50" rx="14" fill="#0284c7"/>
    <text x="355" y="34" font-family="'Impact', sans-serif" font-size="22" fill="#fff" text-anchor="middle">GLP-1 RECEPTOR AGONIST MECHANISM</text>
    <g transform="translate(180, 240)">
      <!-- Stomach -->
      <path d="M -60 -70 C -10 0 40 -20 60 50 C 40 100 -60 100 -80 30 Z" fill="#fbcfe8" stroke="#db2777" stroke-width="4"/>
      <!-- Saltine cracker inside -->
      <rect x="-40" y="10" width="24" height="24" fill="#fde047" stroke="#ca8a04" stroke-width="1.5"/>
    </g>
    <g transform="translate(420, 140)">
      <text y="30" font-family="sans-serif" font-size="16" font-weight="bold" fill="#0369a1">1. Gastric Emptying: FROZEN</text>
      <text y="70" font-family="sans-serif" font-size="16" fill="#475569">2. Half a saltine cracker = 100% full</text>
      <text y="110" font-family="sans-serif" font-size="16" fill="#475569">3. Desire for bread: ZERO</text>
      <text y="150" font-family="sans-serif" font-size="16" font-weight="bold" fill="#dc2626">4. Weekly Cost: $300 ($1,200/mo)</text>
    </g>
  </g>
`);

// 42. weight_loss_gaslight_card
addAsset('infographics', 'weight_loss_gaslight_card.svg', 'Celebrity Weight Loss Gaslighting Matrix', 700, 480, `
  <g transform="translate(20, 20)">
    <rect width="660" height="440" rx="14" fill="#ffffff" stroke="#111" stroke-width="5" filter="url(#cardShadow)"/>
    <rect width="660" height="50" rx="14" fill="#0f172a"/>
    <text x="330" y="34" font-family="'Impact', sans-serif" font-size="22" fill="#fff" text-anchor="middle">OFFICIAL CELEBRITY GASLIGHTING SCRIPT</text>
    <g transform="translate(60, 110)">
      <text y="30" font-family="'Patrick Hand', cursive, sans-serif" font-size="22" fill="#0f172a">"I just started drinking more water!"</text>
      <text y="80" font-family="'Patrick Hand', cursive, sans-serif" font-size="22" fill="#0f172a">"I go on 20-minute daily walks."</text>
      <text y="130" font-family="'Patrick Hand', cursive, sans-serif" font-size="22" fill="#0f172a">"I cut out dairy and discovered sleep."</text>
      <text y="180" font-family="'Courier New', monospace" font-size="16" font-weight="bold" fill="#dc2626">(Actual cause: Weekly GLP-1 injection)</text>
    </g>
  </g>
`);

// 43. mcu_dehydration_protocol
addAsset('infographics', 'mcu_dehydration_protocol.svg', 'MCU 3-Day Dehydration Protocol', 650, 450, `
  <g transform="translate(20, 20)">
    <rect width="610" height="410" rx="14" fill="#0f172a" stroke="#ef4444" stroke-width="4" filter="url(#cardShadow)"/>
    <text x="305" y="45" font-family="'Impact', sans-serif" font-size="24" fill="#ef4444" text-anchor="middle">MCU SHIRTLESS SCENE DEHYDRATION PROTOCOL</text>
    <g transform="translate(60, 110)">
      <text y="30" font-family="sans-serif" font-size="16" fill="#fff">Day 1: Drink 8 liters of distilled water</text>
      <text y="75" font-family="sans-serif" font-size="16" fill="#fff">Day 2: Cut water in half, zero sodium</text>
      <text y="120" font-family="sans-serif" font-size="16" fill="#fff">Day 3: ZERO water, sauna for 4 hours</text>
      <text y="170" font-family="'Impact', sans-serif" font-size="18" fill="#38bdf8">Result: Skin shrink-wrapped like leftover ham</text>
    </g>
  </g>
`);

// 44. buccal_fat_anatomy_diagram
addAsset('infographics', 'buccal_fat_anatomy_diagram.svg', 'Buccal Fat Removal Anatomy Diagram', 700, 480, `
  <g transform="translate(20, 20)">
    <rect width="660" height="440" rx="14" fill="#fdf2f8" stroke="#db2777" stroke-width="4" filter="url(#cardShadow)"/>
    <text x="330" y="45" font-family="'Impact', sans-serif" font-size="24" fill="#db2777" text-anchor="middle">BUCCAL FAT REMOVAL: HOLLOWING OUT THE FACE</text>
    <g transform="translate(180, 240)">
      <ellipse rx="90" ry="110" fill="#fed89b" stroke="#111" stroke-width="4"/>
      <!-- Cheek Cavity Scoop -->
      <circle cx="-45" cy="0" r="22" fill="#be185d" opacity="0.6"/>
      <line x1="-80" y1="0" x2="-45" y2="0" stroke="#db2777" stroke-width="3"/>
      <text x="-90" y="5" font-family="sans-serif" font-size="11" font-weight="bold" fill="#be185d" text-anchor="end">Fat Pad (Scooped)</text>
    </g>
    <g transform="translate(420, 150)">
      <text y="30" font-family="sans-serif" font-size="16" fill="#111">- Sliced from inside mouth</text>
      <text y="70" font-family="sans-serif" font-size="16" fill="#111">- Fat scooped like a pumpkin</text>
      <text y="110" font-family="sans-serif" font-size="16" font-weight="bold" fill="#be185d">- Razor cheekbones achieved</text>
    </g>
  </g>
`);

// 45. ozempic_face_comparison
addAsset('infographics', 'ozempic_face_comparison.svg', 'Ozempic Face Comparison Split', 750, 480, `
  <g transform="translate(20, 20)">
    <rect width="710" height="440" rx="14" fill="#ffffff" stroke="#111" stroke-width="5" filter="url(#cardShadow)"/>
    <text x="355" y="45" font-family="'Impact', sans-serif" font-size="26" fill="#0f172a" text-anchor="middle">"OZEMPIC FACE" PHENOMENON</text>
    <line x1="355" y1="70" x2="355" y2="400" stroke="#cbd5e1" stroke-width="3" stroke-dasharray="6 4"/>
    <!-- Left: Normal Youthful Volume -->
    <g transform="translate(180, 240)">
      <ellipse rx="75" ry="95" fill="#fed89b" stroke="#111" stroke-width="4"/>
      <text y="130" font-family="'Impact', sans-serif" font-size="18" fill="#16a34a" text-anchor="middle">NATURAL VOLUME (25yo)</text>
    </g>
    <!-- Right: Sunken Victorian Novel -->
    <g transform="translate(530, 240)">
      <path d="M -60 -90 C -20 -95 20 -95 60 -90 C 40 -20 15 20 50 80 C 20 95 -20 95 -50 80 C -15 20 -40 -20 -60 -90 Z" fill="#fef08a" opacity="0.8" stroke="#111" stroke-width="4"/>
      <text y="130" font-family="'Impact', sans-serif" font-size="18" fill="#dc2626" text-anchor="middle">HOLLOWED GOTHIC GHOST</text>
    </g>
  </g>
`);

// 46. tiktok_zapruder_analysis
addAsset('infographics', 'tiktok_zapruder_analysis.svg', 'TikTok Zapruder Film Forensic Analysis', 700, 480, `
  <g transform="translate(20, 20)">
    <rect width="660" height="440" rx="14" fill="#0f172a" stroke="#f43f5e" stroke-width="4" filter="url(#cardShadow)"/>
    <text x="330" y="45" font-family="'Courier New', monospace" font-size="20" font-weight="bold" fill="#f43f5e" text-anchor="middle">TIKTOK TRIBUNAL: ZAPRUDER JAWLINE AUDIT</text>
    <!-- Red string lines -->
    <line x1="100" y1="120" x2="350" y2="280" stroke="#ef4444" stroke-width="3"/>
    <line x1="560" y1="140" x2="350" y2="280" stroke="#ef4444" stroke-width="3"/>
    <circle cx="350" cy="280" r="14" fill="#ef4444" filter="url(#glow)"/>
    <text x="350" y="340" font-family="sans-serif" font-size="14" fill="#fff" text-anchor="middle">"Collarbone angle shifted by 4.2 degrees!"</text>
  </g>
`);

// 47. rpg_character_creator_ui
addAsset('infographics', 'rpg_character_creator_ui.svg', 'RPG Character Creator UI (Body Sliders)', 750, 480, `
  <g transform="translate(20, 20)">
    <rect width="710" height="440" rx="14" fill="#1e1e2e" stroke="#cba6f7" stroke-width="4" filter="url(#cardShadow)"/>
    <text x="355" y="45" font-family="'Impact', sans-serif" font-size="24" fill="#cba6f7" text-anchor="middle">HOLLYWOOD CHARACTER CREATOR (2024)</text>
    <!-- Sliders -->
    <g transform="translate(80, 110)">
      <text y="20" font-family="sans-serif" font-size="16" fill="#fff">Waist Width: -100 (Minimum)</text>
      <rect y="30" width="550" height="12" rx="6" fill="#313244"/>
      <circle cx="20" cy="36" r="10" fill="#f38ba8"/>
      
      <text y="100" font-family="sans-serif" font-size="16" fill="#fff">Jawline Sharpness: +999 (Razor)</text>
      <rect y="110" width="550" height="12" rx="6" fill="#313244"/>
      <circle cx="530" cy="116" r="10" fill="#a6e3a1"/>
      
      <text y="180" font-family="sans-serif" font-size="16" fill="#fff">Internal Organ Capacity: 0%</text>
      <rect y="190" width="550" height="12" rx="6" fill="#313244"/>
      <circle cx="20" cy="196" r="10" fill="#fab387"/>
    </g>
  </g>
`);

// 48. la_size_scale_card
addAsset('infographics', 'la_size_scale_card.svg', 'Los Angeles Sizing Scale Reality', 700, 450, `
  <g transform="translate(20, 20)">
    <rect width="660" height="410" rx="14" fill="#ffffff" stroke="#111" stroke-width="5" filter="url(#cardShadow)"/>
    <text x="330" y="45" font-family="'Impact', sans-serif" font-size="26" fill="#0f172a" text-anchor="middle">THE LOS ANGELES SIZING SCALE</text>
    <g transform="translate(50, 100)">
      <rect y="0" width="560" height="60" rx="8" fill="#dcfce7"/>
      <text x="20" y="38" font-family="'Impact', sans-serif" font-size="20" fill="#166534">Size 000: "Ideal Leading Lady"</text>
      
      <rect y="80" width="560" height="60" rx="8" fill="#fef3c7"/>
      <text x="20" y="118" font-family="'Impact', sans-serif" font-size="20" fill="#92400e">Size 0: "Barely Acceptable"</text>
      
      <rect y="160" width="560" height="60" rx="8" fill="#fee2e2"/>
      <text x="20" y="198" font-family="'Impact', sans-serif" font-size="20" fill="#991b1b">Size 4: "Curvy / Plus Size" (INSANE)</text>
    </g>
  </g>
`);

// 49. monthly_economic_receipt
addAsset('infographics', 'monthly_economic_receipt.svg', 'Monthly $1,200 Weight Loss Medication Receipt', 500, 600, `
  <g transform="translate(20, 20)">
    <rect width="460" height="560" rx="6" fill="#ffffff" stroke="#cbd5e1" stroke-width="2" filter="url(#cardShadow)"/>
    <text x="230" y="50" font-family="'Courier New', monospace" font-size="20" font-weight="bold" fill="#111" text-anchor="middle">BEVERLY HILLS PHARMACY</text>
    <text x="230" y="75" font-family="'Courier New', monospace" font-size="12" fill="#64748b" text-anchor="middle">Date: 2024-08-27 | Rx #948291</text>
    <line x1="30" y1="95" x2="430" y2="95" stroke="#111" stroke-width="1" stroke-dasharray="4 4"/>
    
    <g transform="translate(40, 130)" font-family="'Courier New', monospace" font-size="14">
      <text y="0">1x GLP-1 4-Pen Kit ....... $1,200.00</text>
      <text y="35">1x Concierge Fee .......... $250.00</text>
      <text y="70">1x Moral Superiority ...... $0.00</text>
    </g>
    
    <line x1="30" y1="240" x2="430" y2="240" stroke="#111" stroke-width="2"/>
    <text x="40" y="275" font-family="'Impact', sans-serif" font-size="26" fill="#dc2626">TOTAL: $1,450.00 / mo</text>
    <text x="230" y="340" font-family="sans-serif" font-size="12" fill="#64748b" text-anchor="middle">"Outsourcing appetite since 2024"</text>
  </g>
`);

// 50. youtube_outro_card
addAsset('infographics', 'youtube_outro_card.svg', 'YouTube Outro Subscribe Card', 750, 450, `
  <g transform="translate(20, 20)">
    <rect width="710" height="410" rx="16" fill="#0f172a" stroke="#e11d48" stroke-width="4" filter="url(#cardShadow)"/>
    <text x="355" y="80" font-family="'Impact', sans-serif" font-size="36" fill="#ffffff" text-anchor="middle">SUBSCRIBE IF YOU WANT TO.</text>
    <text x="355" y="130" font-family="'Patrick Hand', cursive, sans-serif" font-size="24" fill="#94a3b8" text-anchor="middle">"Or don't. I'm not your dad, and frankly, I don't care."</text>
    <g transform="translate(255, 200)">
      <rect width="200" height="60" rx="30" fill="#dc2626" filter="url(#glow)"/>
      <text x="100" y="38" font-family="'Impact', sans-serif" font-size="24" fill="#fff" text-anchor="middle">SUBSCRIBE</text>
    </g>
  </g>
`);

// ----------------------------------------------------
// 3. PROPS & FOOD & MEDICAL ITEMS (37 Assets)
// ----------------------------------------------------

// 51. diet_coke_can
addAsset('props', 'diet_coke_can.svg', 'Diet Coke Can', 200, 300, `
  <g transform="translate(100, 150)">
    <rect x="-35" y="-90" width="70" height="180" rx="14" fill="#dc2626" stroke="#991b1b" stroke-width="4" filter="url(#cardShadow)"/>
    <rect x="-30" y="-85" width="60" height="24" fill="#e2e8f0"/>
    <rect x="-30" y="60" width="60" height="20" fill="#e2e8f0"/>
    <text x="0" y="-10" font-family="'Impact', sans-serif" font-size="34" fill="#ffffff" text-anchor="middle">Diet</text>
    <text x="0" y="30" font-family="'Impact', sans-serif" font-size="32" fill="#ffffff" text-anchor="middle">Coke</text>
    <ellipse cx="0" cy="-90" rx="20" ry="6" fill="#cbd5e1" stroke="#94a3b8" stroke-width="2"/>
  </g>
`);

// 52. parliament_cigarettes_pack
addAsset('props', 'parliament_cigarettes_pack.svg', 'Parliament Cigarettes Pack', 220, 320, `
  <g transform="translate(110, 160)">
    <rect x="-45" y="-90" width="90" height="180" rx="8" fill="#1e40af" stroke="#1e3a8a" stroke-width="4" filter="url(#cardShadow)"/>
    <rect x="-40" y="-70" width="80" height="45" fill="#ffffff"/>
    <rect x="-20" y="-60" width="40" height="25" fill="#1e40af"/>
    <text x="0" y="20" font-family="'Impact', sans-serif" font-size="14" fill="#ffffff" text-anchor="middle">PARLIAMENT</text>
    <text x="0" y="45" font-family="sans-serif" font-size="9" fill="#93c5fd" text-anchor="middle">RECESSED FILTER</text>
  </g>
`);

// 53. ozempic_injection_pen
addAsset('props', 'ozempic_injection_pen.svg', 'Ozempic Auto-Injector Pen', 350, 150, `
  <g transform="translate(175, 75)">
    <rect x="-140" y="-18" width="220" height="36" rx="8" fill="#0284c7" stroke="#0369a1" stroke-width="3" filter="url(#cardShadow)"/>
    <rect x="80" y="-14" width="50" height="28" fill="#e0f2fe" stroke="#38bdf8" stroke-width="2"/>
    <line x1="130" y1="0" x2="155" y2="0" stroke="#94a3b8" stroke-width="3"/>
    <rect x="-135" y="-12" width="30" height="24" rx="4" fill="#0369a1"/>
    <text x="-20" y="6" font-family="'Impact', sans-serif" font-size="16" fill="#ffffff" text-anchor="middle">OZEMPIC 1.0mg</text>
  </g>
`);

// 54. syringe_glp1
addAsset('props', 'syringe_glp1.svg', 'GLP-1 Medical Syringe', 300, 150, `
  <g transform="translate(150, 75)">
    <rect x="-80" y="-15" width="140" height="30" rx="4" fill="#e0f2fe" stroke="#0284c7" stroke-width="3"/>
    <rect x="-60" y="-12" width="100" height="24" fill="#22c55e" opacity="0.8"/>
    <line x1="60" y1="0" x2="110" y2="0" stroke="#94a3b8" stroke-width="3"/>
    <line x1="-80" y1="0" x2="-120" y2="0" stroke="#64748b" stroke-width="6"/>
    <line x1="-120" y1="-15" x2="-120" y2="15" stroke="#64748b" stroke-width="4"/>
    <text x="-10" y="5" font-family="'Impact', sans-serif" font-size="12" fill="#fff">GLP-1</text>
  </g>
`);

// 55. saltine_cracker_100full
addAsset('props', 'saltine_cracker_100full.svg', 'Saltine Cracker (100% Full Meal)', 250, 250, `
  <g transform="translate(125, 125)">
    <rect x="-60" y="-60" width="120" height="120" rx="8" fill="#fef08a" stroke="#ca8a04" stroke-width="4" filter="url(#cardShadow)"/>
    <!-- Perforations -->
    <circle cx="-30" cy="-30" r="3" fill="#a16207"/>
    <circle cx="30" cy="-30" r="3" fill="#a16207"/>
    <circle cx="-30" cy="30" r="3" fill="#a16207"/>
    <circle cx="30" cy="30" r="3" fill="#a16207"/>
    <circle cx="0" cy="0" r="3" fill="#a16207"/>
    <text x="0" y="90" font-family="'Impact', sans-serif" font-size="14" fill="#dc2626" text-anchor="middle">"100% FULL AFTER THIS"</text>
  </g>
`);

// 56. single_leaf_kale
addAsset('props', 'single_leaf_kale.svg', 'Single Leaf of Kale on Giant Plate', 300, 300, `
  <g transform="translate(150, 150)">
    <!-- Giant White Dinner Plate -->
    <circle r="120" fill="#ffffff" stroke="#cbd5e1" stroke-width="4" filter="url(#cardShadow)"/>
    <circle r="80" fill="#f8fafc" stroke="#e2e8f0" stroke-width="2"/>
    <!-- Tiny Kale Leaf -->
    <path d="M -15 10 Q 0 -30 20 -15 Q 30 10 10 20 Q -5 25 -15 10 Z" fill="#15803d" stroke="#166534" stroke-width="3"/>
  </g>
`);

// 57. stop_procrastinating_pill
addAsset('props', 'stop_procrastinating_pill.svg', 'Anti-Procrastination Pill Capsule', 250, 150, `
  <g transform="translate(125, 75)">
    <rect x="-60" y="-20" width="60" height="40" rx="20" fill="#ef4444" stroke="#991b1b" stroke-width="3"/>
    <rect x="0" y="-20" width="60" height="40" rx="20" fill="#3b82f6" stroke="#1d4ed8" stroke-width="3"/>
    <text x="0" y="6" font-family="'Impact', sans-serif" font-size="14" fill="#ffffff" text-anchor="middle">DO WORK</text>
  </g>
`);

// 58. stop_texting_ex_pill
addAsset('props', 'stop_texting_ex_pill.svg', 'Stop Texting Ex Pill Capsule', 250, 150, `
  <g transform="translate(125, 75)">
    <rect x="-60" y="-20" width="60" height="40" rx="20" fill="#a855f7" stroke="#7e22ce" stroke-width="3"/>
    <rect x="0" y="-20" width="60" height="40" rx="20" fill="#f59e0b" stroke="#d97706" stroke-width="3"/>
    <text x="0" y="6" font-family="'Impact', sans-serif" font-size="14" fill="#ffffff" text-anchor="middle">NO EX</text>
  </g>
`);

// 59. glowing_holy_bread
addAsset('props', 'glowing_holy_bread.svg', 'Radiant Holy Sourdough Bread', 300, 300, `
  <g transform="translate(150, 150)">
    <!-- Sunbeams / Glow -->
    <circle r="90" fill="#fef08a" opacity="0.3" filter="url(#glow)"/>
    <!-- Halo -->
    <ellipse cx="0" cy="-55" rx="55" ry="14" fill="none" stroke="#eab308" stroke-width="6"/>
    <!-- Loaf -->
    <ellipse rx="70" ry="40" fill="#d97706" stroke="#92400e" stroke-width="5"/>
    <line x1="-30" y1="-20" x2="-20" y2="20" stroke="#fde047" stroke-width="4"/>
    <line x1="0" y1="-25" x2="10" y2="15" stroke="#fde047" stroke-width="4"/>
    <line x1="30" y1="-20" x2="40" y2="20" stroke="#fde047" stroke-width="4"/>
  </g>
`);

// 60. crossed_pizza_slice
addAsset('props', 'crossed_pizza_slice.svg', 'Crossed-Out Pizza Slice', 250, 250, `
  <g transform="translate(125, 125)">
    <polygon points="0,-70 55,50 -55,50" fill="#f59e0b" stroke="#b45309" stroke-width="4"/>
    <circle cx="0" cy="10" r="10" fill="#dc2626"/>
    <circle cx="15" cy="-20" r="8" fill="#dc2626"/>
    <line x1="-70" y1="-70" x2="70" y2="70" stroke="#ef4444" stroke-width="8" stroke-linecap="round"/>
  </g>
`);

// 61. crossed_bread_loaf
addAsset('props', 'crossed_bread_loaf.svg', 'Crossed-Out Bread Loaf', 250, 250, `
  <g transform="translate(125, 125)">
    <ellipse rx="75" ry="40" fill="#d97706" stroke="#92400e" stroke-width="4"/>
    <line x1="-75" y1="-60" x2="75" y2="60" stroke="#ef4444" stroke-width="8" stroke-linecap="round"/>
  </g>
`);

// 62. crossed_pasta_bowl
addAsset('props', 'crossed_pasta_bowl.svg', 'Crossed-Out Pasta Bowl', 250, 250, `
  <g transform="translate(125, 125)">
    <ellipse cy="20" rx="70" ry="35" fill="#e2e8f0" stroke="#64748b" stroke-width="4"/>
    <path d="M -35 0 Q 0 -40 35 0" stroke="#eab308" stroke-width="8" fill="none"/>
    <line x1="-70" y1="-50" x2="70" y2="50" stroke="#ef4444" stroke-width="8" stroke-linecap="round"/>
  </g>
`);

// 63. water_gallon_jug
addAsset('props', 'water_gallon_jug.svg', '1-Gallon Motivational Water Jug', 250, 350, `
  <g transform="translate(125, 175)">
    <rect x="-55" y="-110" width="110" height="220" rx="18" fill="#bae6fd" stroke="#0284c7" stroke-width="4" filter="url(#cardShadow)"/>
    <rect x="-20" y="-135" width="40" height="25" rx="4" fill="#0369a1"/>
    <!-- Handle -->
    <path d="M 55 -60 C 85 -60 85 40 55 40" fill="none" stroke="#0284c7" stroke-width="10"/>
    <text x="0" y="-20" font-family="'Impact', sans-serif" font-size="16" fill="#0369a1" text-anchor="middle">1 GALLON</text>
    <text x="0" y="10" font-family="sans-serif" font-size="11" fill="#0369a1" text-anchor="middle">7:00 AM: KEEP GOING</text>
    <text x="0" y="30" font-family="sans-serif" font-size="11" fill="#0369a1" text-anchor="middle">12:00 PM: HYDRATE</text>
  </g>
`);

// 64. unseasoned_chicken_breast
addAsset('props', 'unseasoned_chicken_breast.svg', 'Unseasoned Dry Chicken Breast', 250, 200, `
  <g transform="translate(125, 100)">
    <path d="M -70 0 C -50 -40 40 -40 70 0 C 60 40 -40 40 -70 0 Z" fill="#fed7aa" stroke="#fb923c" stroke-width="3"/>
    <text x="0" y="45" font-family="'Courier New', monospace" font-size="11" fill="#9a3412" text-anchor="middle">0% SODIUM / 0% FLAVOR</text>
  </g>
`);

// 65. steamed_broccoli
addAsset('props', 'steamed_broccoli.svg', 'Steamed Broccoli Floret', 220, 220, `
  <g transform="translate(110, 110)">
    <rect x="-10" y="10" width="20" height="50" rx="4" fill="#86efac" stroke="#16a34a" stroke-width="3"/>
    <circle cx="-25" cy="-10" r="28" fill="#15803d" stroke="#166534" stroke-width="3"/>
    <circle cx="25" cy="-10" r="28" fill="#15803d" stroke="#166534" stroke-width="3"/>
    <circle cx="0" cy="-35" r="32" fill="#16a34a" stroke="#166534" stroke-width="3"/>
  </g>
`);

// 66. steroid_discipline_vial
addAsset('props', 'steroid_discipline_vial.svg', 'TRT / Steroid Discipline Vial', 200, 280, `
  <g transform="translate(100, 140)">
    <rect x="-35" y="-75" width="70" height="150" rx="8" fill="#e0f2fe" stroke="#0284c7" stroke-width="3"/>
    <rect x="-20" y="-95" width="40" height="20" rx="3" fill="#64748b"/>
    <rect x="-30" y="-30" width="60" height="65" fill="#ffffff"/>
    <text x="0" y="-5" font-family="'Impact', sans-serif" font-size="12" fill="#dc2626" text-anchor="middle">DISCIPLINE</text>
    <text x="0" y="15" font-family="'Courier New', monospace" font-size="9" fill="#111" text-anchor="middle">100mg TRT</text>
  </g>
`);

// 67. hollowed_pumpkin_buccal
addAsset('props', 'hollowed_pumpkin_buccal.svg', 'Hollowed Pumpkin Buccal Fat Analog', 280, 250, `
  <g transform="translate(140, 125)">
    <ellipse rx="80" ry="65" fill="#f97316" stroke="#c2410c" stroke-width="4"/>
    <!-- Stem -->
    <rect x="-8" y="-85" width="16" height="25" fill="#65a30d" stroke="#4d7c0f" stroke-width="2"/>
    <!-- Hollow cheek holes scooped out -->
    <circle cx="-40" cy="0" r="18" fill="#431407"/>
    <circle cx="40" cy="0" r="18" fill="#431407"/>
    <polygon points="0,-15 -10,10 10,10" fill="#431407"/>
  </g>
`);

// 68. sharp_cheekbone_deli_slice
addAsset('props', 'sharp_cheekbone_deli_slice.svg', 'Razor Cheekbone Slicing Deli Meat', 300, 220, `
  <g transform="translate(150, 110)">
    <!-- Cheekbone Blade -->
    <polygon points="-80,-40 80,0 -80,40" fill="#cbd5e1" stroke="#0f172a" stroke-width="3" filter="url(#glow)"/>
    <!-- Sliced Salami / Pastrami Cold Cut Falling -->
    <ellipse cx="40" cy="35" rx="35" ry="15" fill="#e11d48" stroke="#9f1239" stroke-width="2"/>
    <text x="0" y="70" font-family="'Impact', sans-serif" font-size="12" fill="#be123c" text-anchor="middle">SLICES PASTRAMI CLEAN</text>
  </g>
`);

// 69. lithium_ion_battery_pack
addAsset('props', 'lithium_ion_battery_pack.svg', 'Lithium-Ion Battery Pack', 240, 200, `
  <g transform="translate(120, 100)">
    <rect x="-60" y="-40" width="120" height="80" rx="8" fill="#1e293b" stroke="#475569" stroke-width="4"/>
    <rect x="60" y="-15" width="12" height="30" rx="2" fill="#94a3b8"/>
    <!-- LED Bars -->
    <rect x="-40" y="-20" width="18" height="40" rx="2" fill="#22c55e"/>
    <rect x="-15" y="-20" width="18" height="40" rx="2" fill="#22c55e"/>
    <rect x="10" y="-20" width="18" height="40" rx="2" fill="#22c55e"/>
  </g>
`);

// 70. measuring_caliper_002mm
addAsset('props', 'measuring_caliper_002mm.svg', 'Measuring Caliper 0.02mm', 320, 200, `
  <g transform="translate(160, 100)">
    <path d="M -120 -40 L 40 -40 L 40 20" fill="none" stroke="#475569" stroke-width="8" stroke-linecap="round"/>
    <path d="M 40 -40 L 40 30 M -40 -40 L -40 10" stroke="#0284c7" stroke-width="6"/>
    <!-- Digital Box -->
    <rect x="-80" y="-55" width="80" height="30" rx="4" fill="#0f172a" stroke="#0284c7" stroke-width="2"/>
    <text x="-40" y="-35" font-family="'Courier New', monospace" font-size="12" font-weight="bold" fill="#38bdf8" text-anchor="middle">0.02mm</text>
  </g>
`);

// 71. laser_pointer_stick
addAsset('props', 'laser_pointer_stick.svg', 'Presentation Laser Pointer Stick', 300, 150, `
  <g transform="translate(150, 75)">
    <line x1="-120" y1="40" x2="80" y2="-30" stroke="#854d0e" stroke-width="7" stroke-linecap="round"/>
    <circle cx="80" cy="-30" r="8" fill="#ef4444" filter="url(#glow)"/>
    <!-- Laser Beam -->
    <line x1="80" y1="-30" x2="140" y2="-50" stroke="#ef4444" stroke-width="3" stroke-dasharray="6 4"/>
  </g>
`);

// 72. rubber_stamp_cancelled
addAsset('props', 'rubber_stamp_cancelled.svg', 'Rubber Stamp Tool', 220, 260, `
  <g transform="translate(110, 130)">
    <ellipse cx="0" cy="-70" rx="20" ry="14" fill="#92400e" stroke="#451a03" stroke-width="3"/>
    <rect x="-10" y="-60" width="20" height="60" fill="#78350f" stroke="#451a03" stroke-width="3"/>
    <rect x="-40" y="0" width="80" height="25" rx="4" fill="#b91c1c" stroke="#451a03" stroke-width="3"/>
    <rect x="-45" y="25" width="90" height="15" fill="#111"/>
  </g>
`);

// 73. fidget_spinner
addAsset('props', 'fidget_spinner.svg', '2017 Fidget Spinner Meme', 240, 240, `
  <g transform="translate(120, 120)">
    <circle r="16" fill="#111"/>
    <circle cx="0" cy="-55" r="26" fill="#06b6d4" stroke="#111" stroke-width="4"/>
    <circle cx="48" cy="28" r="26" fill="#f59e0b" stroke="#111" stroke-width="4"/>
    <circle cx="-48" cy="28" r="26" fill="#ec4899" stroke="#111" stroke-width="4"/>
  </g>
`);

// 74. loose_couch_change
addAsset('props', 'loose_couch_change.svg', 'Loose Couch Change (25 Cents)', 200, 200, `
  <g transform="translate(100, 100)">
    <circle r="40" fill="#cbd5e1" stroke="#475569" stroke-width="4" filter="url(#cardShadow)"/>
    <text y="8" font-family="'Impact', sans-serif" font-size="28" fill="#334155" text-anchor="middle">25¢</text>
  </g>
`);

// 75. standard_business_envelope
addAsset('props', 'standard_business_envelope.svg', 'Standard Business Envelope', 320, 200, `
  <g transform="translate(160, 100)">
    <rect x="-130" y="-65" width="260" height="130" rx="4" fill="#ffffff" stroke="#cbd5e1" stroke-width="3" filter="url(#cardShadow)"/>
    <path d="M -130 -65 L 0 15 L 130 -65" fill="none" stroke="#94a3b8" stroke-width="2"/>
    <rect x="80" y="-55" width="35" height="40" fill="#fee2e2" stroke="#dc2626" stroke-width="1.5"/>
  </g>
`);

// 76. resistance_band_4999
addAsset('props', 'resistance_band_4999.svg', 'Resistance Band $49.99', 240, 200, `
  <g transform="translate(120, 100)">
    <ellipse rx="75" ry="35" fill="none" stroke="#ec4899" stroke-width="12"/>
    <rect x="-25" y="40" width="50" height="22" rx="4" fill="#fde047" stroke="#ca8a04" stroke-width="1.5"/>
    <text y="56" font-family="'Impact', sans-serif" font-size="12" fill="#854d0e" text-anchor="middle">$49.99</text>
  </g>
`);

// 77. miu_miu_micro_belt
addAsset('props', 'miu_miu_micro_belt.svg', 'Miu Miu Micro Belt Skirt', 280, 150, `
  <g transform="translate(140, 75)">
    <rect x="-90" y="-15" width="180" height="30" rx="3" fill="#ca8a04" stroke="#854d0e" stroke-width="3"/>
    <rect x="-20" y="-18" width="40" height="36" rx="4" fill="none" stroke="#fef08a" stroke-width="4"/>
    <text y="35" font-family="'Impact', sans-serif" font-size="14" fill="#854d0e" text-anchor="middle">TOTAL FABRIC: 1.5 INCHES</text>
  </g>
`);

// 78. napkin_baby_tee
addAsset('props', 'napkin_baby_tee.svg', 'Napkin Baby Tee Crop Top', 220, 200, `
  <g transform="translate(110, 100)">
    <rect x="-50" y="-40" width="100" height="70" rx="6" fill="#f472b6" stroke="#db2777" stroke-width="3"/>
    <text y="0" font-family="'Comic Sans MS', cursive" font-size="14" fill="#fff" text-anchor="middle">BABY</text>
  </g>
`);

// 79. bitcoin_coin_vector
addAsset('props', 'bitcoin_coin_vector.svg', 'Bitcoin Crypto Coin', 200, 200, `
  <g transform="translate(100, 100)">
    <circle r="70" fill="url(#goldGrad)" stroke="#b45309" stroke-width="5" filter="url(#cardShadow)"/>
    <text y="20" font-family="'Impact', sans-serif" font-size="64" fill="#ffffff" text-anchor="middle">B</text>
    <line x1="-5" y1="-50" x2="-5" y2="50" stroke="#fff" stroke-width="4"/>
    <line x1="5" y1="-50" x2="5" y2="50" stroke="#fff" stroke-width="4"/>
  </g>
`);

// 80. diamond_hands
addAsset('props', 'diamond_hands.svg', 'Sparkling Diamond Hands', 250, 200, `
  <g transform="translate(125, 100)">
    <polygon points="0,-50 50,0 0,50 -50,0" fill="url(#cyanGrad)" stroke="#0369a1" stroke-width="4" filter="url(#glow)"/>
    <polygon points="0,-50 20,-10 0,50 -20,-10" fill="#bae6fd" opacity="0.6"/>
  </g>
`);

// 81. ai_lanyard_badge
addAsset('props', 'ai_lanyard_badge.svg', 'AI Founder Lanyard Credential', 200, 260, `
  <g transform="translate(100, 130)">
    <path d="M -30 -80 L 0 -20 L 30 -80" fill="none" stroke="#2563eb" stroke-width="6"/>
    <rect x="-40" y="-20" width="80" height="110" rx="6" fill="#ffffff" stroke="#0284c7" stroke-width="3" filter="url(#cardShadow)"/>
    <rect x="-40" y="-20" width="80" height="30" fill="#0284c7"/>
    <text x="0" y="0" font-family="'Impact', sans-serif" font-size="12" fill="#fff" text-anchor="middle">AI SUMMIT</text>
    <text x="0" y="35" font-family="sans-serif" font-size="10" font-weight="bold" fill="#111" text-anchor="middle">FOUNDER</text>
    <rect x="-25" y="50" width="50" height="25" fill="#e2e8f0"/>
  </g>
`);

// 82. cheese_wheel_crossed
addAsset('props', 'cheese_wheel_crossed.svg', 'Crossed Out Cheese Wheel', 240, 240, `
  <g transform="translate(120, 120)">
    <polygon points="-50,-30 50,-30 0,40" fill="#facc15" stroke="#ca8a04" stroke-width="3"/>
    <circle cx="-15" cy="-10" r="6" fill="#ca8a04"/>
    <circle cx="10" cy="0" r="8" fill="#ca8a04"/>
    <line x1="-60" y1="-60" x2="60" y2="60" stroke="#ef4444" stroke-width="8" stroke-linecap="round"/>
  </g>
`);

// 83. botox_syringe
addAsset('props', 'botox_syringe.svg', 'Botox Cosmetic Syringe', 260, 140, `
  <g transform="translate(130, 70)">
    <rect x="-60" y="-10" width="100" height="20" rx="3" fill="#f1f5f9" stroke="#64748b" stroke-width="2"/>
    <line x1="40" y1="0" x2="85" y2="0" stroke="#94a3b8" stroke-width="2"/>
    <text x="-10" y="4" font-family="'Courier New', monospace" font-size="10" fill="#64748b">BOTOX</text>
  </g>
`);

// 84. scalpel_surgical
addAsset('props', 'scalpel_surgical.svg', 'Stainless Steel Surgical Scalpel', 280, 120, `
  <g transform="translate(140, 60)">
    <polygon points="-90,5 20,5 80,-15 10,-5 -90,-5" fill="#cbd5e1" stroke="#334155" stroke-width="2"/>
    <circle cx="70" cy="-12" r="3" fill="#fff" filter="url(#glow)"/>
  </g>
`);

// 85. safe_locked_water
addAsset('props', 'safe_locked_water.svg', 'Steel Safe with Locked Water Bottle', 280, 300, `
  <g transform="translate(140, 150)">
    <rect x="-80" y="-90" width="160" height="180" rx="10" fill="#334155" stroke="#0f172a" stroke-width="5" filter="url(#cardShadow)"/>
    <circle cx="0" cy="0" r="30" fill="#64748b" stroke="#0f172a" stroke-width="4"/>
    <circle cx="0" cy="0" r="8" fill="#f87171"/>
    <text x="0" y="65" font-family="'Impact', sans-serif" font-size="12" fill="#ef4444" text-anchor="middle">WATER LOCKED (DAY 3)</text>
  </g>
`);

// 86. alarm_clock_4am
addAsset('props', 'alarm_clock_4am.svg', 'Alarm Clock 4:00 AM', 240, 200, `
  <g transform="translate(120, 100)">
    <rect x="-65" y="-45" width="130" height="90" rx="14" fill="#0f172a" stroke="#334155" stroke-width="4" filter="url(#cardShadow)"/>
    <text y="14" font-family="'Courier New', monospace" font-size="28" font-weight="bold" fill="#ef4444" text-anchor="middle" filter="url(#glow)">04:00 AM</text>
  </g>
`);

// 87. running_sneakers
addAsset('props', 'running_sneakers.svg', 'Running Sneakers', 280, 180, `
  <g transform="translate(140, 90)">
    <path d="M -80 20 C -60 -30 20 -20 70 20 Z" fill="#3b82f6" stroke="#1d4ed8" stroke-width="3"/>
    <rect x="-85" y="20" width="165" height="16" rx="4" fill="#ffffff" stroke="#cbd5e1" stroke-width="2"/>
    <path d="M -20 -10 L 20 0" stroke="#fde047" stroke-width="3"/>
  </g>
`);

// ----------------------------------------------------
// 4. COMIC FX, BUBBLES & UI ACCENTS (20 Assets)
// ----------------------------------------------------

// 88. poof_smoke_cloud
addAsset('comic_fx', 'poof_smoke_cloud.svg', 'Smoke Poof Cloud Burst', 300, 260, `
  <g transform="translate(150, 130)">
    <ellipse cx="-45" cy="-20" rx="40" ry="35" fill="#f1f5f9" stroke="#94a3b8" stroke-width="4"/>
    <ellipse cx="45" cy="-20" rx="40" ry="35" fill="#f1f5f9" stroke="#94a3b8" stroke-width="4"/>
    <ellipse cx="-30" cy="30" rx="35" ry="30" fill="#e2e8f0" stroke="#94a3b8" stroke-width="4"/>
    <ellipse cx="30" cy="30" rx="35" ry="30" fill="#e2e8f0" stroke="#94a3b8" stroke-width="4"/>
    <ellipse cx="0" cy="0" rx="55" ry="45" fill="#ffffff" stroke="#64748b" stroke-width="4"/>
  </g>
`);

// 89. poof_text_burst
addAsset('comic_fx', 'poof_text_burst.svg', 'POOF Comic Sound Effect Burst', 300, 200, `
  <g transform="translate(150, 100)">
    <polygon points="0,-60 20,-20 65,-40 40,-5 80,15 35,25 40,65 5,35 -30,60 -20,20 -70,15 -35,-10 -60,-45 -15,-25" fill="#fef08a" stroke="#ca8a04" stroke-width="4" filter="url(#cardShadow)"/>
    <text y="14" font-family="'Impact', sans-serif" font-size="44" fill="#e11d48" letter-spacing="3" text-anchor="middle">*POOF!*</text>
  </g>
`);

// 90. speed_lines_burst
addAsset('comic_fx', 'speed_lines_burst.svg', 'Radial Speed Lines Burst', 400, 400, `
  <g transform="translate(200, 200)" stroke="#ef4444" stroke-width="4" opacity="0.6">
    <line x1="-180" y1="0" x2="-80" y2="0"/>
    <line x1="180" y1="0" x2="80" y2="0"/>
    <line x1="0" y1="-180" x2="0" y2="-80"/>
    <line x1="0" y1="180" x2="0" y2="80"/>
    <line x1="-130" y1="-130" x2="-60" y2="-60"/>
    <line x1="130" y1="-130" x2="60" y2="-60"/>
    <line x1="-130" y1="130" x2="-60" y2="60"/>
    <line x1="130" y1="130" x2="60" y2="60"/>
  </g>
`);

// 91. speech_bubble_ai_pivot
addAsset('comic_fx', 'speech_bubble_ai_pivot.svg', 'Speech Bubble (AI Pivot)', 420, 160, `
  <g transform="translate(210, 80)">
    <rect x="-190" y="-55" width="380" height="85" rx="12" fill="#ffffff" stroke="#111" stroke-width="4" filter="url(#cardShadow)"/>
    <polygon points="-20,30 0,55 10,30" fill="#ffffff"/>
    <polygon points="-20,30 0,55 10,30" stroke="#111" stroke-width="4"/>
    <rect x="-188" y="-53" width="376" height="81" rx="10" fill="#ffffff"/>
    <text y="-18" font-family="'Patrick Hand', cursive, sans-serif" font-size="20" font-weight="bold" fill="#0f172a" text-anchor="middle">"I've ALWAYS been deeply passionate about AI!"</text>
    <text y="8" font-family="'Courier New', monospace" font-size="12" fill="#64748b" text-anchor="middle">(Pivot completed in 0.02s)</text>
  </g>
`);

// 92. speech_bubble_water_sleep
addAsset('comic_fx', 'speech_bubble_water_sleep.svg', 'Speech Bubble (Water & Sleep)', 400, 140, `
  <g transform="translate(200, 70)">
    <rect x="-180" y="-45" width="360" height="75" rx="12" fill="#ffffff" stroke="#111" stroke-width="4" filter="url(#cardShadow)"/>
    <text y="-10" font-family="'Patrick Hand', cursive, sans-serif" font-size="20" font-weight="bold" fill="#0f172a" text-anchor="middle">"Just drinking water &amp; 8 hrs sleep!"</text>
    <text y="14" font-family="sans-serif" font-size="11" fill="#64748b" text-anchor="middle">(Pure Uncut Hollywood Gaslighting)</text>
  </g>
`);

// 93. speech_bubble_curves
addAsset('comic_fx', 'speech_bubble_curves.svg', 'Speech Bubble (All Bodies Beautiful)', 360, 130, `
  <g transform="translate(180, 65)">
    <rect x="-160" y="-40" width="320" height="70" rx="12" fill="#fdf4ff" stroke="#a21caf" stroke-width="3" filter="url(#cardShadow)"/>
    <text y="-6" font-family="'Patrick Hand', cursive, sans-serif" font-size="20" font-weight="bold" fill="#a21caf" text-anchor="middle">"All bodies are beautiful!*"</text>
    <text y="16" font-family="sans-serif" font-size="10" fill="#6b7280" text-anchor="middle">*(Terms apply)</text>
  </g>
`);

// 94. speech_bubble_discipline
addAsset('comic_fx', 'speech_bubble_discipline.svg', 'Speech Bubble (4 AM Discipline)', 380, 130, `
  <g transform="translate(190, 65)">
    <rect x="-170" y="-40" width="340" height="70" rx="12" fill="#0f172a" stroke="#ef4444" stroke-width="3" filter="url(#cardShadow)"/>
    <text y="5" font-family="'Impact', sans-serif" font-size="18" fill="#ffffff" text-anchor="middle">"IT'S JUST 4 AM DISCIPLINE &amp; CHICKEN!"</text>
  </g>
`);

// 95. speech_bubble_not_your_dad
addAsset('comic_fx', 'speech_bubble_not_your_dad.svg', 'Speech Bubble (Not Your Dad)', 400, 140, `
  <g transform="translate(200, 70)">
    <rect x="-180" y="-45" width="360" height="75" rx="12" fill="#ffffff" stroke="#111" stroke-width="4" filter="url(#cardShadow)"/>
    <text y="-8" font-family="'Patrick Hand', cursive, sans-serif" font-size="18" font-weight="bold" fill="#111" text-anchor="middle">"I'm not your dad, and frankly,"</text>
    <text y="16" font-family="'Impact', sans-serif" font-size="20" fill="#dc2626" text-anchor="middle">I DO NOT CARE.</text>
  </g>
`);

// 96. ctrl_w_panic_key
addAsset('comic_fx', 'ctrl_w_panic_key.svg', 'Ctrl + W Panic Keycap', 260, 160, `
  <g transform="translate(130, 80)">
    <rect x="-110" y="-50" width="220" height="100" rx="14" fill="#dc2626" stroke="#991b1b" stroke-width="4" filter="url(#glow)"/>
    <text y="10" font-family="'Impact', sans-serif" font-size="26" fill="#ffffff" text-anchor="middle">Ctrl + W</text>
  </g>
`);

// 97. cancelled_stamp_mark
addAsset('comic_fx', 'cancelled_stamp_mark.svg', 'CANCELLED Stamp Mark', 320, 140, `
  <g transform="translate(160, 70) rotate(-14)">
    <rect x="-130" y="-40" width="260" height="80" rx="10" fill="none" stroke="#dc2626" stroke-width="6" stroke-dasharray="10 4"/>
    <text y="14" font-family="'Impact', sans-serif" font-size="40" fill="#dc2626" letter-spacing="4" text-anchor="middle">CANCELLED</text>
  </g>
`);

// 98. warning_capacity_badge
addAsset('comic_fx', 'warning_capacity_badge.svg', 'Warning Capacity Exceeded Badge', 320, 100, `
  <g transform="translate(160, 50)">
    <rect x="-140" y="-30" width="280" height="60" rx="10" fill="#fef08a" stroke="#ca8a04" stroke-width="3"/>
    <text y="7" font-family="'Impact', sans-serif" font-size="16" fill="#991b1b" text-anchor="middle">[!] CAPACITY EXCEEDED</text>
  </g>
`);

// 99. zero_fat_badge
addAsset('comic_fx', 'zero_fat_badge.svg', 'Zero Sub-Q Fat Badge', 300, 90, `
  <g transform="translate(150, 45)">
    <rect x="-130" y="-25" width="260" height="50" rx="25" fill="#dcfce7" stroke="#16a34a" stroke-width="3"/>
    <text y="6" font-family="'Impact', sans-serif" font-size="15" fill="#15803d" text-anchor="middle">ZERO SUB-Q FAT</text>
  </g>
`);

// 100. laser_scan_reticle
addAsset('comic_fx', 'laser_scan_reticle.svg', 'Laser Scanning Reticle', 200, 200, `
  <g transform="translate(100, 100)">
    <circle r="70" fill="none" stroke="#ef4444" stroke-width="3" stroke-dasharray="8 6"/>
    <circle r="40" fill="none" stroke="#ef4444" stroke-width="2"/>
    <line x1="-90" y1="0" x2="90" y2="0" stroke="#ef4444" stroke-width="2"/>
    <line x1="0" y1="-90" x2="0" y2="90" stroke="#ef4444" stroke-width="2"/>
  </g>
`);

// 101. sparkle_star_burst
addAsset('comic_fx', 'sparkle_star_burst.svg', 'Sparkle Star Glints', 200, 200, `
  <g transform="translate(100, 100)">
    <path d="M 0 -40 Q 0 0 40 0 Q 0 0 0 40 Q 0 0 -40 0 Q 0 0 0 -40 Z" fill="#fde047" filter="url(#glow)"/>
    <circle cx="35" cy="-35" r="8" fill="#38bdf8"/>
    <circle cx="-30" cy="30" r="6" fill="#38bdf8"/>
  </g>
`);

// 102. sweat_drops_panic
addAsset('comic_fx', 'sweat_drops_panic.svg', 'Anime Sweat Drops (Panic)', 160, 200, `
  <g transform="translate(80, 100)">
    <path d="M -25 -40 C -25 -10 0 20 -25 40 C -50 20 -25 -10 -25 -40 Z" fill="#38bdf8"/>
    <path d="M 25 -20 C 25 5 45 25 25 45 C 5 25 25 5 25 -20 Z" fill="#38bdf8"/>
  </g>
`);

// 103. question_marks_cluster
addAsset('comic_fx', 'question_marks_cluster.svg', 'Question Marks Confusion Cluster', 200, 200, `
  <g transform="translate(100, 100)">
    <text x="-30" y="-10" font-family="'Impact', sans-serif" font-size="44" fill="#a855f7">?</text>
    <text x="15" y="-30" font-family="'Impact', sans-serif" font-size="54" fill="#ef4444">?</text>
    <text x="20" y="40" font-family="'Impact', sans-serif" font-size="36" fill="#eab308">?</text>
  </g>
`);

// 104. exclamation_burst
addAsset('comic_fx', 'exclamation_burst.svg', 'Exclamation Point Impact Burst', 200, 200, `
  <g transform="translate(100, 100)">
    <polygon points="0,-70 20,-20 70,-30 35,10 65,55 10,35 -20,70 -15,15 -70,25 -30,-15 -55,-55 -10,-25" fill="#ef4444" stroke="#991b1b" stroke-width="3"/>
    <text y="24" font-family="'Impact', sans-serif" font-size="64" fill="#ffffff" text-anchor="middle">!</text>
  </g>
`);

// 105. confetti_party_pack
addAsset('comic_fx', 'confetti_party_pack.svg', 'Confetti Party Celebration Streamers', 300, 200, `
  <g transform="translate(150, 100)">
    <rect x="-100" y="-50" width="14" height="24" rx="2" fill="#ec4899" transform="rotate(25)"/>
    <rect x="80" y="-40" width="16" height="28" rx="2" fill="#3b82f6" transform="rotate(-35)"/>
    <circle cx="-50" cy="40" r="10" fill="#eab308"/>
    <circle cx="50" cy="50" r="8" fill="#10b981"/>
    <path d="M -30 -60 Q 0 -20 -30 20" fill="none" stroke="#f43f5e" stroke-width="4"/>
    <path d="M 30 -60 Q 60 -20 30 20" fill="none" stroke="#8b5cf6" stroke-width="4"/>
  </g>
`);

// 106. pelvic_hazard_arrow
addAsset('comic_fx', 'pelvic_hazard_arrow.svg', 'Pelvic Hazard Line Indicator', 320, 100, `
  <g transform="translate(160, 50)">
    <line x1="-140" y1="0" x2="100" y2="0" stroke="#dc2626" stroke-width="5" stroke-dasharray="8 6"/>
    <polygon points="120,0 95,-10 95,10" fill="#dc2626"/>
    <text x="-20" y="-12" font-family="'Impact', sans-serif" font-size="16" fill="#dc2626">PELVIC HAZARD LINE</text>
  </g>
`);

// 107. zapruder_film_tape
addAsset('comic_fx', 'zapruder_film_tape.svg', 'Zapruder Forensic Film Frame', 350, 220, `
  <g transform="translate(175, 110)">
    <rect x="-150" y="-90" width="300" height="180" fill="#0f172a" stroke="#475569" stroke-width="4"/>
    <!-- Film sprocket holes -->
    <rect x="-140" y="-80" width="16" height="14" rx="2" fill="#fff"/>
    <rect x="-140" y="65" width="16" height="14" rx="2" fill="#fff"/>
    <rect x="124" y="-80" width="16" height="14" rx="2" fill="#fff"/>
    <rect x="124" y="65" width="16" height="14" rx="2" fill="#fff"/>
    <text x="0" y="10" font-family="'Courier New', monospace" font-size="16" font-weight="bold" fill="#22c55e" text-anchor="middle">FRAME 313</text>
  </g>
`);

// ----------------------------------------------------
// 5. ENVIRONMENTS & SET PIECES (16 Assets)
// ----------------------------------------------------

// 108. hollywood_red_carpet_runway
addAsset('environments', 'hollywood_red_carpet_runway.svg', 'Hollywood Red Carpet Runway', 800, 500, `
  <g transform="translate(400, 250)">
    <polygon points="-300,200 300,200 140,-80 -140,-80" fill="#dc2626" stroke="#991b1b" stroke-width="6"/>
    <line x1="-310" y1="200" x2="-145" y2="-80" stroke="#f59e0b" stroke-width="8"/>
    <line x1="310" y1="200" x2="145" y2="-80" stroke="#f59e0b" stroke-width="8"/>
  </g>
`);

// 109. hollywood_hills_backdrop
addAsset('environments', 'hollywood_hills_backdrop.svg', 'Hollywood Hills Silhouette Backdrop', 800, 400, `
  <g transform="translate(400, 200)">
    <path d="M -400 150 Q -200 20 0 80 Q 200 0 400 120 L 400 200 L -400 200 Z" fill="#cbd5e1"/>
    <text x="0" y="60" font-family="'Impact', sans-serif" font-size="52" fill="#ffffff" letter-spacing="14" text-anchor="middle">HOLLYWOOD</text>
  </g>
`);

// 110. smartphone_instagram_frame
addAsset('environments', 'smartphone_instagram_frame.svg', 'Smartphone Instagram UI Frame', 450, 750, `
  <g transform="translate(225, 375)">
    <rect x="-190" y="-340" width="380" height="680" rx="38" fill="#0f172a" stroke="#334155" stroke-width="8" filter="url(#cardShadow)"/>
    <rect x="-175" y="-325" width="350" height="650" rx="28" fill="#ffffff"/>
    <rect x="-60" y="-315" width="120" height="20" rx="10" fill="#0f172a"/>
    <text x="-140" y="-265" font-family="'Brush Script MT', cursive, sans-serif" font-size="32" fill="#111">Instagram</text>
  </g>
`);

// 111. tim_burton_spiral_hill
addAsset('environments', 'tim_burton_spiral_hill.svg', 'Tim Burton Gothic Spiral Hill', 600, 500, `
  <g transform="translate(300, 250)">
    <rect x="-300" y="-250" width="600" height="500" fill="#09090b"/>
    <circle cx="150" cy="-120" r="60" fill="#fef08a" filter="url(#glow)"/>
    <circle cx="175" cy="-135" r="55" fill="#09090b"/>
    <path d="M -300 200 Q 50 160 120 20 C 180 -50 200 -120 160 -140 C 120 -160 100 -90 140 -70 C 180 -50 190 -80 180 -100" fill="none" stroke="#27272a" stroke-width="24" stroke-linecap="round"/>
  </g>
`);

// 112. tim_burton_crescent_moon
addAsset('environments', 'tim_burton_crescent_moon.svg', 'Spooky Glowing Crescent Moon', 250, 250, `
  <g transform="translate(125, 125)">
    <circle r="80" fill="#fef08a" filter="url(#glow)"/>
    <circle cx="30" cy="-20" r="75" fill="#09090b"/>
  </g>
`);

// 113. tim_burton_gnarled_tree
addAsset('environments', 'tim_burton_gnarled_tree.svg', 'Gothic Gnarled Silhouette Tree', 300, 450, `
  <g transform="translate(150, 225)">
    <path d="M 0 180 Q -30 60 15 -10 Q 50 -70 10 -120 Q -20 -70 -10 -20" fill="none" stroke="#18181b" stroke-width="20" stroke-linecap="round"/>
    <path d="M 15 -10 Q 60 -30 80 -80" fill="none" stroke="#18181b" stroke-width="12" stroke-linecap="round"/>
  </g>
`);

// 114. tim_burton_flying_bats
addAsset('environments', 'tim_burton_flying_bats.svg', 'Flock of Flying Bats', 300, 200, `
  <g transform="translate(150, 100)" fill="#27272a">
    <g transform="translate(-60, -30)">
      <path d="M 0 0 Q -20 -25 -40 0 Q -20 10 0 0 Q 20 10 40 0 Q 20 -25 0 0 Z"/>
    </g>
    <g transform="translate(60, 20) scale(0.7)">
      <path d="M 0 0 Q -20 -25 -40 0 Q -20 10 0 0 Q 20 10 40 0 Q 20 -25 0 0 Z"/>
    </g>
  </g>
`);

// 115. ps1_wireframe_grid_floor
addAsset('environments', 'ps1_wireframe_grid_floor.svg', 'PS1 Retro 3D Wireframe Grid Floor', 800, 500, `
  <g transform="translate(400, 250)">
    <rect x="-400" y="-250" width="800" height="500" fill="#020617"/>
    <g stroke="#00ff66" stroke-width="2" opacity="0.5">
      <line x1="0" y1="-80" x2="-400" y2="250"/>
      <line x1="0" y1="-80" x2="-200" y2="250"/>
      <line x1="0" y1="-80" x2="0" y2="250"/>
      <line x1="0" y1="-80" x2="200" y2="250"/>
      <line x1="0" y1="-80" x2="400" y2="250"/>
      <line x1="-150" y1="0" x2="150" y2="0"/>
      <line x1="-260" y1="80" x2="260" y2="80"/>
      <line x1="-380" y1="180" x2="380" y2="180"/>
    </g>
  </g>
`);

// 116. ps1_rotating_head_3d
addAsset('environments', 'ps1_rotating_head_3d.svg', 'PS1 3D Faceted Polygon Head', 350, 350, `
  <g transform="translate(175, 175)">
    <!-- Low-Poly 3D Facets -->
    <polygon points="0,-120 -80,-30 80,-30" fill="#94a3b8" stroke="#0f172a" stroke-width="4"/>
    <polygon points="80,-30 0,-120 90,40" fill="#64748b" stroke="#0f172a" stroke-width="4"/>
    <polygon points="-80,-30 0,-120 -90,40" fill="#cbd5e1" stroke="#0f172a" stroke-width="4"/>
    <polygon points="-80,-30 -70,80 0,140 70,80 80,-30" fill="#cbd5e1" stroke="#0f172a" stroke-width="4"/>
    <polygon points="0,140 70,80 80,-30" fill="#94a3b8" stroke="#0f172a" stroke-width="4"/>
    <polygon points="0,140 -70,80 -80,-30" fill="#475569" stroke="#0f172a" stroke-width="4"/>
  </g>
`);

// 117. ps1_retro_terminal_box
addAsset('environments', 'ps1_retro_terminal_box.svg', 'Sony PlayStation 1996 HUD Terminal Box', 450, 200, `
  <g transform="translate(25, 25)">
    <rect width="400" height="150" rx="8" fill="#000000" stroke="#00ff66" stroke-width="3" opacity="0.95"/>
    <text x="20" y="35" font-family="'Courier New', monospace" font-size="14" font-weight="bold" fill="#00ff66">SYSTEM: SONY PLAYSTATION (1996)</text>
    <text x="20" y="65" font-family="'Courier New', monospace" font-size="13" fill="#00ff66">POLYGON COUNT: 14 TOTAL</text>
    <text x="20" y="95" font-family="'Courier New', monospace" font-size="13" fill="#00ff66">TEXTURE MAPS: DISABLED</text>
    <text x="20" y="125" font-family="'Courier New', monospace" font-size="13" fill="#00ff66">TARGET: ACTOR_LOD0.MDL</text>
  </g>
`);

// 118. wrecking_ball_pendulum
addAsset('environments', 'wrecking_ball_pendulum.svg', 'Wrecking Ball Heavy Pendulum', 400, 500, `
  <g transform="translate(200, 40)">
    <!-- Ceiling anchor -->
    <rect x="-30" y="0" width="60" height="16" rx="4" fill="#334155"/>
    <!-- Steel Cable -->
    <line x1="0" y1="16" x2="-80" y2="350" stroke="#111" stroke-width="6"/>
    <!-- Red Wrecking Ball with Face -->
    <g transform="translate(-80, 350)">
      <circle r="55" fill="#dc2626" stroke="#991b1b" stroke-width="6" filter="url(#glow)"/>
      <circle cx="-16" cy="-10" r="8" fill="#fff"/>
      <circle cx="-16" cy="-10" r="4" fill="#111"/>
      <circle cx="16" cy="-10" r="8" fill="#fff"/>
      <circle cx="16" cy="-10" r="4" fill="#111"/>
      <path d="M -15 18 Q 0 10 15 18" fill="none" stroke="#111" stroke-width="5" stroke-linecap="round"/>
    </g>
  </g>
`);

// 119. victorian_velvet_couch
addAsset('environments', 'victorian_velvet_couch.svg', 'Victorian Fainting Velvet Chaise Lounge', 500, 300, `
  <g transform="translate(250, 160)">
    <!-- High Curved Backrest -->
    <path d="M -180 0 C -220 -90 -120 -90 -90 -20 L 160 -20 C 180 -20 200 0 180 30 L -180 30 Z" fill="#881337" stroke="#4c0519" stroke-width="6"/>
    <ellipse cx="-130" cy="-30" rx="40" ry="20" fill="#be123c"/>
    <!-- Wooden Carved Legs -->
    <line x1="-150" y1="30" x2="-160" y2="70" stroke="#451a03" stroke-width="10" stroke-linecap="round"/>
    <line x1="150" y1="30" x2="160" y2="70" stroke="#451a03" stroke-width="10" stroke-linecap="round"/>
  </g>
`);

// 120. doctor_office_wall
addAsset('environments', 'doctor_office_wall.svg', 'Doctor Examination Office Wall', 600, 450, `
  <g transform="translate(300, 225)">
    <rect x="-300" y="-225" width="600" height="450" fill="#f8fafc"/>
    <!-- Snellen Eye Chart -->
    <rect x="-220" y="-150" width="110" height="160" fill="#fff" stroke="#cbd5e1" stroke-width="2"/>
    <text x="-165" y="-115" font-family="'Courier New', monospace" font-size="34" font-weight="bold" fill="#111" text-anchor="middle">E</text>
    <text x="-165" y="-80" font-family="'Courier New', monospace" font-size="20" font-weight="bold" fill="#111" text-anchor="middle">F P</text>
    <text x="-165" y="-50" font-family="'Courier New', monospace" font-size="14" font-weight="bold" fill="#111" text-anchor="middle">T O Z</text>
    <!-- Medical Diploma -->
    <rect x="100" y="-150" width="140" height="100" fill="#fff" stroke="#ca8a04" stroke-width="4"/>
    <text x="170" y="-95" font-family="'Impact', sans-serif" font-size="14" fill="#854d0e" text-anchor="middle">MD DIPLOMA</text>
  </g>
`);

// 121. mcu_gym_workout_stage
addAsset('environments', 'mcu_gym_workout_stage.svg', 'MCU Superhero Gym Barbell Stage', 600, 400, `
  <g transform="translate(300, 200)">
    <rect x="-300" y="-200" width="600" height="400" fill="#1e293b"/>
    <!-- Heavy Barbell with 45lb Plates -->
    <line x1="-220" y1="60" x2="220" y2="60" stroke="#94a3b8" stroke-width="12"/>
    <rect x="-200" y="0" width="25" height="120" rx="4" fill="#0f172a" stroke="#475569" stroke-width="3"/>
    <rect x="-170" y="15" width="20" height="90" rx="4" fill="#0f172a" stroke="#475569" stroke-width="3"/>
    <rect x="175" y="0" width="25" height="120" rx="4" fill="#0f172a" stroke="#475569" stroke-width="3"/>
    <rect x="150" y="15" width="20" height="90" rx="4" fill="#0f172a" stroke="#475569" stroke-width="3"/>
  </g>
`);

// 122. tiktok_interface_frame
addAsset('environments', 'tiktok_interface_frame.svg', 'TikTok Mobile Video Interface', 400, 700, `
  <g transform="translate(200, 350)">
    <rect x="-180" y="-330" width="360" height="660" rx="32" fill="#000000" stroke="#333" stroke-width="6"/>
    <!-- Right side TikTok action buttons -->
    <g transform="translate(130, 80)">
      <circle cy="-120" r="18" fill="#ff0050"/>
      <circle cy="-50" r="18" fill="#222"/>
      <circle cy="20" r="18" fill="#222"/>
      <circle cy="90" r="18" fill="#222"/>
      <!-- Spinning record -->
      <circle cy="160" r="18" fill="#111" stroke="#333" stroke-width="2"/>
    </g>
  </g>
`);

// 123. operating_room_lights
addAsset('environments', 'operating_room_lights.svg', 'Surgical Operating Room Overhead Lamps', 500, 300, `
  <g transform="translate(250, 150)">
    <rect x="-10" y="-150" width="20" height="80" fill="#64748b"/>
    <ellipse cx="0" cy="-70" rx="140" ry="40" fill="#e2e8f0" stroke="#94a3b8" stroke-width="4"/>
    <circle cx="-70" cy="-70" r="22" fill="#ffffff" filter="url(#glow)"/>
    <circle cx="0" cy="-65" r="26" fill="#ffffff" filter="url(#glow)"/>
    <circle cx="70" cy="-70" r="22" fill="#ffffff" filter="url(#glow)"/>
    <!-- Light Beams -->
    <polygon points="-140,-70 140,-70 220,150 -220,150" fill="#f8fafc" opacity="0.3"/>
  </g>
`);

console.log(`[SVG Generator] Defined ${assets.length} SVG assets.`);

// Write out all SVG files and verify with Resvg
let successCount = 0;

for (const asset of assets) {
  const filePath = path.join(outBaseDir, asset.category, asset.filename);
  fs.writeFileSync(filePath, asset.svg, 'utf8');

  // Verify compilation with resvg
  try {
    const resvg = new Resvg(asset.svg, {
      font: {
        fontFiles: fontFilesList,
        defaultFontFamily: 'Noto Sans',
        loadSystemFonts: false,
      },
    });
    resvg.render();
    successCount++;
  } catch (err) {
    console.error(`[Error] Failed to render ${asset.filename}:`, err.message);
  }
}

console.log(`[SVG Generator] Successfully written & verified ${successCount}/${assets.length} SVG assets!`);

// Generate HTML visual catalog index.html
let html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Casually Explained 100+ SVG Asset Library</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #0f172a; color: #f8fafc; margin: 0; padding: 24px; }
    h1 { color: #38bdf8; text-align: center; margin-bottom: 8px; font-size: 32px; }
    .subtitle { text-align: center; color: #94a3b8; margin-bottom: 32px; font-size: 16px; }
    .stats { text-align: center; margin-bottom: 24px; }
    .badge { background: #0284c7; color: #fff; padding: 6px 14px; border-radius: 20px; font-weight: bold; font-size: 14px; margin: 0 4px; }
    h2 { color: #f59e0b; border-bottom: 2px solid #334155; padding-bottom: 8px; margin-top: 40px; text-transform: uppercase; letter-spacing: 1.5px; font-size: 20px; }
    .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 20px; margin-top: 16px; }
    .card { background: #1e293b; border-radius: 12px; border: 1px solid #334155; padding: 14px; display: flex; flex-direction: column; align-items: center; text-align: center; transition: transform 0.2s, border-color 0.2s; }
    .card:hover { transform: translateY(-4px); border-color: #38bdf8; box-shadow: 0 8px 24px rgba(0,0,0,0.4); }
    .preview-box { width: 100%; height: 180px; background: #ffffff; border-radius: 8px; display: flex; align-items: center; justify-content: center; overflow: hidden; padding: 8px; box-sizing: border-box; }
    .preview-box img { max-width: 100%; max-height: 100%; object-fit: contain; }
    .title { font-weight: bold; color: #f1f5f9; margin-top: 10px; font-size: 14px; }
    .filename { font-family: monospace; color: #64748b; font-size: 11px; margin-top: 4px; word-break: break-all; }
  </style>
</head>
<body>
  <h1>🎬 100% Pure Vector SVG Asset Library</h1>
  <div class="subtitle">Complete, modular asset suite for the "Casually Explained: Celebrity Weight Loss" video</div>
  <div class="stats">
    <span class="badge">Total Assets: ${assets.length}</span>
    <span class="badge">100% SVG Vector</span>
    <span class="badge">Desktop: /root/Desktop/svg_assets/</span>
  </div>
`;

for (const cat of dirs) {
  const catAssets = assets.filter(a => a.category === cat);
  html += `<h2>📁 ${cat.replace('_', ' ')} (${catAssets.length} assets)</h2>\n<div class="grid">\n`;
  for (const a of catAssets) {
    html += `  <div class="card">
    <div class="preview-box">
      <img src="${a.category}/${a.filename}" alt="${a.title}">
    </div>
    <div class="title">${a.title}</div>
    <div class="filename">${a.filename}</div>
  </div>\n`;
  }
  html += `</div>\n`;
}

html += `</body>\n</html>`;

fs.writeFileSync(path.join(outBaseDir, 'index.html'), html, 'utf8');
console.log(`[SVG Generator] Created catalog at ${path.join(outBaseDir, 'index.html')}!`);

// 100+ Asset Extended Comedy Library (Casually Explained / Alex Meyers Style)
// Contains high-density procedural vector props, comedic badges, price tags, and satirical HUD overlays

export function renderSliderHUD(x: number, y: number, progress: number): string {
  const knobX = -180 + progress * 360;
  return `
    <g id="prop-slider-hud" transform="translate(${x}, ${y}) scale(1.35)" filter="url(#cardShadow)">
      <rect x="-240" y="-60" width="480" height="120" rx="18" fill="#0f172a" stroke="#38bdf8" stroke-width="5"/>
      <line x1="-180" y1="10" x2="180" y2="10" stroke="#334155" stroke-width="16" stroke-linecap="round"/>
      <line x1="-180" y1="10" x2="${knobX}" y2="10" stroke="#0284c7" stroke-width="16" stroke-linecap="round"/>
      
      <!-- Sliding Knob -->
      <circle cx="${knobX}" cy="10" r="26" fill="#38bdf8" stroke="#ffffff" stroke-width="5" filter="url(#glow)"/>
      
      <!-- Labels -->
      <text x="-180" y="-20" font-family="'Impact', sans-serif" font-size="22" fill="#f43f5e" text-anchor="middle">THICC</text>
      <text x="180" y="-20" font-family="'Impact', sans-serif" font-size="22" fill="#38bdf8" text-anchor="middle">STICK</text>
      <text x="0" y="45" font-family="'Courier New', monospace" font-size="14" font-weight="bold" fill="#94a3b8" text-anchor="middle">
        VELOCITY: ${(progress * 100).toFixed(0)}% SPEEDRUN
      </text>
    </g>
  `;
}

export function renderPromptTerminal(x: number, y: number, timeSec: number): string {
  const chars = "PROMPT: /imagine tech_founder --v 6.0 --ar 16:9 --no calories --chaos 100";
  const len = Math.min(chars.length, Math.floor((timeSec * 22) % (chars.length + 15)));
  const typed = chars.slice(0, len);

  return `
    <g id="prop-prompt-terminal" transform="translate(${x}, ${y}) scale(1.3)" filter="url(#cardShadow)">
      <rect x="-240" y="-70" width="480" height="140" rx="14" fill="#020617" stroke="#10b981" stroke-width="5"/>
      <!-- Window header buttons -->
      <circle cx="-210" cy="-45" r="7" fill="#ef4444"/>
      <circle cx="-190" cy="-45" r="7" fill="#f59e0b"/>
      <circle cx="-170" cy="-45" r="7" fill="#10b981"/>
      <text x="0" y="-42" font-family="sans-serif" font-size="13" font-weight="bold" fill="#64748b" text-anchor="middle">midjourney-bot-v6</text>
      
      <text x="-215" y="0" font-family="'Courier New', monospace" font-size="15" font-weight="bold" fill="#34d399">
        ${typed}<tspan fill="#ffffff" opacity="${Math.sin(timeSec * 12) > 0 ? 1 : 0}">█</tspan>
      </text>
      <text x="0" y="45" font-family="'Impact', sans-serif" font-size="18" fill="#eab308" letter-spacing="1" text-anchor="middle">
        [ AI FOUNDER PIVOT COMPLETE ]
      </text>
    </g>
  `;
}

export function renderMiamiBoardingPass(x: number, y: number, timeSec: number): string {
  return `
    <g id="prop-miami-boarding-pass" transform="translate(${x}, ${y}) scale(1.35)" filter="url(#cardShadow)">
      <rect x="-220" y="-60" width="440" height="120" rx="14" fill="#fdf4ff" stroke="#ec4899" stroke-width="5"/>
      <line x1="80" y1="-60" x2="80" y2="60" stroke="#ec4899" stroke-width="3" stroke-dasharray="8 6"/>
      
      <text x="-70" y="-22" font-family="'Impact', sans-serif" font-size="22" fill="#be185d">SPIRIT AIRLINES</text>
      <text x="-70" y="8" font-family="sans-serif" font-size="14" font-weight="bold" fill="#0f172a">LAX ✈ MIA (BBL EXPRESS)</text>
      <text x="-70" y="38" font-family="'Courier New', monospace" font-size="20" font-weight="bold" fill="#dc2626">$299.00 ROUND-TRIP</text>
      
      <text x="135" y="-15" font-family="sans-serif" font-size="12" font-weight="bold" fill="#9d174d">GATE</text>
      <text x="135" y="15" font-family="'Impact', sans-serif" font-size="28" fill="#be185d">BBL</text>
    </g>
  `;
}

export function renderPharmaRevenueBadge(x: number, y: number, timeSec: number): string {
  return `
    <g id="prop-pharma-revenue" transform="translate(${x}, ${y}) scale(1.35)" filter="url(#glow)">
      <rect x="-230" y="-55" width="460" height="110" rx="16" fill="#064e3b" stroke="#34d399" stroke-width="6"/>
      <text x="0" y="-12" font-family="'Impact', sans-serif" font-size="26" fill="#6ee7b7" letter-spacing="2" text-anchor="middle">
        Q4 GLP-1 REVENUE
      </text>
      <text x="0" y="32" font-family="'Courier New', monospace" font-size="34" font-weight="bold" fill="#ffffff" text-anchor="middle">
        +$42,000,000,000
      </text>
    </g>
  `;
}

export function renderFinePrintAsterisk(x: number, y: number): string {
  return `
    <g id="prop-fine-print-asterisk" transform="translate(${x}, ${y}) scale(1.2)" filter="url(#cardShadow)">
      <rect x="-220" y="-35" width="440" height="70" rx="10" fill="#ffffff" stroke="#0f172a" stroke-width="4"/>
      <text x="0" y="-5" font-family="sans-serif" font-size="13" font-weight="bold" fill="#dc2626" text-anchor="middle">
        *OFFER VALID ONLY UNTIL Q4 PHARMA ROLLOUT
      </text>
      <text x="0" y="20" font-family="sans-serif" font-size="12" fill="#475569" text-anchor="middle">
        (TERMS & CONDITIONS MAY EVAPORATE INSTANTLY)
      </text>
    </g>
  `;
}

export function renderWindSpeedBadge(x: number, y: number): string {
  return `
    <g id="prop-wind-speed" transform="translate(${x}, ${y}) scale(1.3)" filter="url(#cardShadow)">
      <rect x="-190" y="-40" width="380" height="80" rx="12" fill="#0f172a" stroke="#38bdf8" stroke-width="4"/>
      <text x="0" y="-6" font-family="'Impact', sans-serif" font-size="24" fill="#38bdf8" text-anchor="middle">
        LIGHT BREEZE: 95 MPH
      </text>
      <text x="0" y="22" font-family="sans-serif" font-size="13" font-weight="bold" fill="#f8fafc" text-anchor="middle">
        [CATEGORY 3 RED CARPET GALE]
      </text>
    </g>
  `;
}

export function renderCouchLootBadge(x: number, y: number): string {
  return `
    <g id="prop-couch-loot" transform="translate(${x}, ${y}) scale(1.25)" filter="url(#cardShadow)">
      <rect x="-190" y="-40" width="380" height="80" rx="12" fill="#78350f" stroke="#f59e0b" stroke-width="4"/>
      <text x="0" y="-6" font-family="'Impact', sans-serif" font-size="22" fill="#fef08a" text-anchor="middle">
        COUCH FORAGING: +$0.03
      </text>
      <text x="0" y="22" font-family="sans-serif" font-size="13" font-weight="bold" fill="#fde68a" text-anchor="middle">
        (AND 1 STALE CHEETO FOUND)
      </text>
    </g>
  `;
}

export function renderDeliSlicerBadge(x: number, y: number): string {
  return `
    <g id="prop-deli-slicer-badge" transform="translate(${x}, ${y}) scale(1.3)" filter="url(#cardShadow)">
      <rect x="-210" y="-45" width="420" height="90" rx="14" fill="#1e293b" stroke="#f43f5e" stroke-width="5"/>
      <text x="0" y="-10" font-family="'Impact', sans-serif" font-size="24" fill="#fda4af" text-anchor="middle">
        PASTRAMI SLICER: 0.01mm
      </text>
      <text x="0" y="22" font-family="'Courier New', monospace" font-size="15" font-weight="bold" fill="#ffffff" text-anchor="middle">
        DIAL SETTING: PAPER THIN CHEEKS
      </text>
    </g>
  `;
}

export function renderZapruderBadge(x: number, y: number): string {
  return `
    <g id="prop-zapruder-badge" transform="translate(${x}, ${y}) scale(1.3)" filter="url(#cardShadow)">
      <rect x="-230" y="-45" width="460" height="90" rx="12" fill="#0f172a" stroke="#ca8a04" stroke-width="5"/>
      <text x="0" y="-10" font-family="'Courier New', monospace" font-size="22" font-weight="bold" fill="#facc15" text-anchor="middle">
        1963 ZAPRUDER 8MM FORENSICS
      </text>
      <text x="0" y="22" font-family="sans-serif" font-size="14" font-weight="bold" fill="#38bdf8" text-anchor="middle">
        [TIKTOK JAWLINE FRAME-BY-FRAME ANALYSIS]
      </text>
    </g>
  `;
}

export function renderCurvyAlertSiren(x: number, y: number, timeSec: number): string {
  const flash = Math.sin(timeSec * 16) > 0;
  return `
    <g id="prop-curvy-alert" transform="translate(${x}, ${y}) scale(1.3)" filter="${flash ? "url(#glow)" : "url(#cardShadow)"}">
      <rect x="-210" y="-45" width="420" height="90" rx="14" fill="${flash ? "#dc2626" : "#7f1d1d"}" stroke="#ffffff" stroke-width="5"/>
      <text x="0" y="-8" font-family="'Impact', sans-serif" font-size="26" fill="#ffffff" letter-spacing="2" text-anchor="middle">
        🚨 LA CURVY ALERT 🚨
      </text>
      <text x="0" y="24" font-family="'Impact', sans-serif" font-size="18" fill="#fef08a" text-anchor="middle">
        [ SIZE 4 MANNEQUIN DETECTED ]
      </text>
    </g>
  `;
}

export function renderRPGSlidersHUD(x: number, y: number): string {
  return `
    <g id="prop-rpg-sliders" transform="translate(${x}, ${y}) scale(1.3)" filter="url(#cardShadow)">
      <rect x="-240" y="-75" width="480" height="150" rx="16" fill="#030712" stroke="#06b6d4" stroke-width="5"/>
      <text x="0" y="-45" font-family="'Courier New', monospace" font-size="16" font-weight="bold" fill="#38bdf8" text-anchor="middle">
        CHARACTER CREATOR v4.2 [CYBORG]
      </text>
      
      <!-- Slider 1 -->
      <text x="-210" y="-12" font-family="'Courier New', monospace" font-size="13" fill="#ffffff">BODY_FAT: 0%</text>
      <rect x="-70" y="-22" width="180" height="14" rx="4" fill="#1e293b"/>
      <rect x="-70" y="-22" width="6" height="14" rx="2" fill="#ef4444"/>
      <text x="175" y="-12" font-family="'Courier New', monospace" font-size="12" font-weight="bold" fill="#ef4444">[LOCKED]</text>

      <!-- Slider 2 -->
      <text x="-210" y="22" font-family="'Courier New', monospace" font-size="13" fill="#ffffff">CHEEK_SHARP: 100%</text>
      <rect x="-70" y="12" width="180" height="14" rx="4" fill="#1e293b"/>
      <rect x="-70" y="12" width="180" height="14" rx="4" fill="#10b981"/>
      <text x="175" y="22" font-family="'Courier New', monospace" font-size="12" font-weight="bold" fill="#10b981">[MAX]</text>
      
      <!-- Slider 3 -->
      <text x="-210" y="56" font-family="'Courier New', monospace" font-size="13" fill="#ffffff">EMOTIONS: 0%</text>
      <rect x="-70" y="46" width="180" height="14" rx="4" fill="#1e293b"/>
      <text x="175" y="56" font-family="'Courier New', monospace" font-size="12" font-weight="bold" fill="#64748b">[DISABLED]</text>
    </g>
  `;
}

export function renderYouTubeSubscribeBadge(x: number, y: number, timeSec: number): string {
  const isClicked = (timeSec * 2) % 2 > 1;
  return `
    <g id="prop-youtube-subscribe" transform="translate(${x}, ${y}) scale(1.35)" filter="url(#cardShadow)">
      <rect x="-220" y="-50" width="440" height="100" rx="16" fill="${isClicked ? "#27272a" : "#dc2626"}" stroke="#ffffff" stroke-width="4"/>
      <path d="M -160 -15 L -160 15 L -130 0 Z" fill="#ffffff"/>
      <text x="-30" y="8" font-family="'Impact', sans-serif" font-size="28" fill="#ffffff" letter-spacing="1">
        ${isClicked ? "SUBSCRIBED ✓" : "SUBSCRIBE"}
      </text>
      <text x="0" y="35" font-family="sans-serif" font-size="12" font-weight="bold" fill="#fef08a" text-anchor="middle">
        [FOR MORE SATIRICAL APATHY]
      </text>
    </g>
  `;
}

export function renderCarbsHopePoster(x: number, y: number, timeSec: number = 0): string {
  return `
    <g id="cast-carbs-hope-poster" transform="translate(${x}, ${y}) scale(1.65)" filter="url(#cardShadow)">
      <!-- Obama 2008 HOPE Poster Border -->
      <rect x="-140" y="-190" width="280" height="380" fill="#dc2626" stroke="#991b1b" stroke-width="8"/>
      <rect x="-130" y="-180" width="130" height="290" fill="#60a5fa"/>
      <rect x="0" y="-180" width="130" height="290" fill="#dc2626"/>
      <rect x="-130" y="110" width="260" height="70" fill="#0f172a"/>

      <!-- Giant Golden Sourdough Bread Loaf in Center -->
      <ellipse cx="0" cy="-30" rx="90" ry="50" fill="#fde047" stroke="#0f172a" stroke-width="6" filter="url(#glow)"/>
      <path d="M -60 -30 Q 0 -60 60 -30" stroke="#ca8a04" stroke-width="5" fill="none"/>

      <!-- Stylized Poster Text: "CARBS 2008" -->
      <text x="0" y="155" font-family="'Impact', sans-serif" font-size="34" fill="#fde047" letter-spacing="3" text-anchor="middle">
        CARBS 2008
      </text>
    </g>
  `;
}

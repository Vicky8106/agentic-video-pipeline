// 100% Pure Vector Cartoon Character Cast (Zero Raster Images)
// Handcrafted SVG illustrations for "Alex Meyers / Casually Explained" visual comedy style
// Helper for dynamic breathing & bobbing
export function getBob(timeSec = 0, speed = 4, amp = 6) {
    return Math.sin(timeSec * speed) * amp;
}
/**
 * 1. Jenna Ortega: Gothic dress, bangs, dark liner, iconic deadpan cheekbones
 */
export function renderJennaOrtega(opts) {
    const { x, y, scale = 1, rotation = 0, timeSec = 0, expression = "deadpan" } = opts;
    const bob = getBob(timeSec, 3, 4);
    return `
    <g id="cast-jenna-ortega" transform="translate(${x}, ${y + bob}) rotate(${rotation}) scale(${scale})">
      <!-- Shadow -->
      <ellipse cx="0" cy="180" rx="45" ry="10" fill="#000000" opacity="0.18"/>

      <!-- Legs & Gothic Heels -->
      <line x1="-12" y1="90" x2="-14" y2="175" stroke="#111" stroke-width="6" stroke-linecap="round"/>
      <line x1="12" y1="90" x2="14" y2="175" stroke="#111" stroke-width="6" stroke-linecap="round"/>
      <polygon points="-22,175 -8,175 -14,165" fill="#111"/>
      <polygon points="6,175 20,175 14,165" fill="#111"/>

      <!-- Black Gothic Evening Dress -->
      <path d="M -18 10 L 18 10 L 32 105 C 10 115 -10 115 -32 105 Z" fill="#18181b" stroke="#09090b" stroke-width="4"/>
      <!-- Lace Collar Accent -->
      <path d="M -16 10 Q 0 25 16 10 Q 0 15 -16 10 Z" fill="#ffffff" opacity="0.85"/>
      <polygon points="0,20 -6,45 6,45" fill="#dc2626"/>

      <!-- Arms & Hand -->
      <path d="M -18 15 Q -38 45 -25 70" fill="none" stroke="#fddfb0" stroke-width="6" stroke-linecap="round"/>
      <path d="M 18 15 Q 38 45 25 70" fill="none" stroke="#fddfb0" stroke-width="6" stroke-linecap="round"/>

      <!-- Head Base -->
      <g transform="translate(0, -35)">
        <!-- Back Hair Volume & Braids -->
        <path d="M -48 -35 C -65 15 -45 65 -35 85 C -45 55 -55 -15 -35 -45 Z" fill="#09090b"/>
        <path d="M 48 -35 C 65 15 45 65 35 85 C 45 55 55 -15 35 -45 Z" fill="#09090b"/>

        <!-- Face (Skin Tone) -->
        <ellipse cx="0" cy="0" rx="36" ry="42" fill="#fddfb0" stroke="#111111" stroke-width="5"/>

        <!-- Sharp Cheekbone Contour Lines -->
        <path d="M -30 2 Q -22 18 -15 26" fill="none" stroke="#e0a87a" stroke-width="3" stroke-linecap="round"/>
        <path d="M 30 2 Q 22 18 15 26" fill="none" stroke="#e0a87a" stroke-width="3" stroke-linecap="round"/>

        <!-- Eyes: Dark Smokey Gothic Eyes -->
        <ellipse cx="-14" cy="-4" rx="13" ry="11" fill="#18181b"/>
        <ellipse cx="14" cy="-4" rx="13" ry="11" fill="#18181b"/>
        <ellipse cx="-14" cy="-4" rx="9" ry="8" fill="#ffffff"/>
        <ellipse cx="14" cy="-4" rx="9" ry="8" fill="#ffffff"/>
        <circle cx="-13" cy="-4" r="5" fill="#3b2d27"/>
        <circle cx="15" cy="-4" r="5" fill="#3b2d27"/>
        <circle cx="-15" cy="-6" r="2.5" fill="#ffffff"/>
        <circle cx="13" cy="-6" r="2.5" fill="#ffffff"/>

        <!-- Eyebrows (Arched & Sarcastic) -->
        <path d="M -24 -16 Q -14 -22 -5 -16" fill="none" stroke="#09090b" stroke-width="4" stroke-linecap="round"/>
        <path d="M 5 -16 Q 14 -22 24 -16" fill="none" stroke="#09090b" stroke-width="4" stroke-linecap="round"/>

        <!-- Mouth: Dark Burgundy Lipstick -->
        ${expression === "deadpan"
        ? `<path d="M -10 22 Q 0 20 10 22" fill="none" stroke="#881337" stroke-width="4" stroke-linecap="round"/>`
        : `<path d="M -10 20 Q 0 28 10 20 Z" fill="#881337" stroke="#4c0519" stroke-width="2"/>`}

        <!-- Front Iconic Shaggy Bangs & Parting -->
        <path d="M -40 -25 C -30 -50 30 -50 40 -25 C 25 -38 -25 -38 -40 -25 Z" fill="#09090b"/>
        <path d="M -30 -30 Q -15 2 -22 15 Q -10 -15 0 -25 Q 10 -15 22 15 Q 15 2 30 -30 Z" fill="#09090b"/>
      </g>
    </g>
  `;
}
/**
 * 2. Emma Stone: Auburn red hair, glamorous emerald dress, expressive eyes
 */
export function renderEmmaStone(opts) {
    const { x, y, scale = 1, rotation = 0, timeSec = 0 } = opts;
    const bob = getBob(timeSec, 3.2, 4);
    return `
    <g id="cast-emma-stone" transform="translate(${x}, ${y + bob}) rotate(${rotation}) scale(${scale})">
      <!-- Shadow -->
      <ellipse cx="0" cy="180" rx="45" ry="10" fill="#000000" opacity="0.18"/>

      <!-- Legs & Emerald Heels -->
      <line x1="-12" y1="90" x2="-14" y2="175" stroke="#111" stroke-width="6" stroke-linecap="round"/>
      <line x1="12" y1="90" x2="14" y2="175" stroke="#111" stroke-width="6" stroke-linecap="round"/>
      <polygon points="-22,175 -8,175 -14,165" fill="#047857"/>
      <polygon points="6,175 20,175 14,165" fill="#047857"/>

      <!-- Emerald Green Red-Carpet Dress -->
      <path d="M -20 10 L 20 10 L 36 110 C 12 120 -12 120 -36 110 Z" fill="#059669" stroke="#047857" stroke-width="4"/>
      <path d="M -15 10 Q 0 35 15 10 Z" fill="#fddfb0"/>

      <!-- Arms -->
      <path d="M -20 15 Q -40 40 -20 65" fill="none" stroke="#fddfb0" stroke-width="6" stroke-linecap="round"/>
      <path d="M 20 15 Q 40 40 20 65" fill="none" stroke="#fddfb0" stroke-width="6" stroke-linecap="round"/>

      <!-- Head Base -->
      <g transform="translate(0, -38)">
        <!-- Auburn / Red Hair Back Volume -->
        <path d="M -48 -25 C -75 20 -40 85 -20 90 C -10 90 -45 20 -30 -35 Z" fill="#b45309"/>
        <path d="M 48 -25 C 75 20 40 85 20 90 C 10 90 45 20 30 -35 Z" fill="#b45309"/>

        <!-- Face -->
        <ellipse cx="0" cy="0" rx="38" ry="42" fill="#fed7aa" stroke="#111111" stroke-width="5"/>

        <!-- Huge Expressive Emma Stone Cat Eyes -->
        <ellipse cx="-15" cy="-4" rx="14" ry="12" fill="#ffffff" stroke="#111" stroke-width="3"/>
        <ellipse cx="15" cy="-4" rx="14" ry="12" fill="#ffffff" stroke="#111" stroke-width="3"/>
        <circle cx="-13" cy="-4" r="7" fill="#047857"/>
        <circle cx="17" cy="-4" r="7" fill="#047857"/>
        <circle cx="-15" cy="-6" r="3" fill="#ffffff"/>
        <circle cx="15" cy="-6" r="3" fill="#ffffff"/>

        <!-- Eyebrows -->
        <path d="M -26 -18 Q -16 -24 -6 -18" fill="none" stroke="#78350f" stroke-width="4" stroke-linecap="round"/>
        <path d="M 6 -18 Q 16 -24 26 -18" fill="none" stroke="#78350f" stroke-width="4" stroke-linecap="round"/>

        <!-- Glamorous Smile -->
        <path d="M -12 18 Q 0 30 14 16 Z" fill="#e11d48" stroke="#be123c" stroke-width="2"/>

        <!-- Front Side-Swept Red Hair Waves -->
        <path d="M -42 -25 C -25 -55 35 -55 42 -25 C 30 -40 -15 -42 -35 -20 Z" fill="#d97706"/>
      </g>
    </g>
  `;
}
/**
 * 3. Ariana Grande: Iconic sky-high ponytail, pastel lavender oversized hoodie
 */
export function renderArianaGrande(opts) {
    const { x, y, scale = 1, rotation = 0, timeSec = 0 } = opts;
    const bob = getBob(timeSec, 3.5, 5);
    const ponySway = Math.sin(timeSec * 5) * 12;
    return `
    <g id="cast-ariana-grande" transform="translate(${x}, ${y + bob}) rotate(${rotation}) scale(${scale})">
      <!-- Shadow -->
      <ellipse cx="0" cy="180" rx="45" ry="10" fill="#000000" opacity="0.18"/>

      <!-- Over-the-Knee Thigh-High White Boots -->
      <line x1="-12" y1="90" x2="-14" y2="175" stroke="#ffffff" stroke-width="12" stroke-linecap="round"/>
      <line x1="12" y1="90" x2="14" y2="175" stroke="#ffffff" stroke-width="12" stroke-linecap="round"/>
      <line x1="-12" y1="90" x2="-14" y2="175" stroke="#cbd5e1" stroke-width="4" stroke-linecap="round"/>
      <line x1="12" y1="90" x2="14" y2="175" stroke="#cbd5e1" stroke-width="4" stroke-linecap="round"/>

      <!-- Massive Oversized Pastel Lavender Hoodie (covers entire torso) -->
      <path d="M -35 5 L 35 5 L 42 95 C 15 105 -15 105 -42 95 Z" fill="#c084fc" stroke="#9333ea" stroke-width="4"/>
      <!-- Extra Long Sleeves (Paws sticking out) -->
      <path d="M -35 15 Q -55 55 -38 90" fill="none" stroke="#c084fc" stroke-width="14" stroke-linecap="round"/>
      <path d="M 35 15 Q 55 55 38 90" fill="none" stroke="#c084fc" stroke-width="14" stroke-linecap="round"/>

      <!-- Head Base -->
      <g transform="translate(0, -38)">
        <!-- Sky-High Ponytail Base & Giant Swaying Tail -->
        <g transform="translate(25, -45) rotate(${ponySway})">
          <ellipse cx="0" cy="0" rx="8" ry="8" fill="#eab308"/> <!-- Gold Hair Tie -->
          <path d="M 0 0 C 45 20 65 95 40 160 C 25 110 30 50 0 0 Z" fill="#451a03" stroke="#1c1917" stroke-width="3"/>
        </g>

        <!-- Face (Soft Skin) -->
        <ellipse cx="0" cy="0" rx="34" ry="38" fill="#fcd34d" opacity="0.85" stroke="#111" stroke-width="4"/>

        <!-- Winged Eyeliner Cat Eyes -->
        <ellipse cx="-12" cy="-4" rx="11" ry="9" fill="#ffffff" stroke="#111" stroke-width="2"/>
        <ellipse cx="12" cy="-4" rx="11" ry="9" fill="#ffffff" stroke="#111" stroke-width="2"/>
        <circle cx="-10" cy="-4" r="5" fill="#451a03"/>
        <circle cx="14" cy="-4" r="5" fill="#451a03"/>
        <!-- Signature Winged Liner Flick -->
        <path d="M -23 -9 L -32 -16 M 23 -9 L 32 -16" stroke="#111" stroke-width="4" stroke-linecap="round"/>

        <!-- Cute Tiny Smile -->
        <path d="M -6 16 Q 0 22 8 16" fill="none" stroke="#e11d48" stroke-width="3" stroke-linecap="round"/>

        <!-- Sleek Pulled-Back Hair -->
        <path d="M -34 -10 C -34 -45 34 -45 34 -10 C 20 -30 -20 -30 -34 -10 Z" fill="#451a03"/>
      </g>
    </g>
  `;
}
/**
 * 4. Kate Moss: 90s Heroin Chic Runway Model
 */
export function renderKateMoss(opts) {
    const { x, y, scale = 1, rotation = 0, timeSec = 0 } = opts;
    const bob = getBob(timeSec, 2.5, 4);
    return `
    <g id="cast-kate-moss" transform="translate(${x}, ${y + bob}) rotate(${rotation}) scale(${scale})">
      <!-- Shadow -->
      <ellipse cx="0" cy="180" rx="40" ry="8" fill="#000000" opacity="0.18"/>

      <!-- Stick Legs -->
      <line x1="-8" y1="80" x2="-10" y2="175" stroke="#111" stroke-width="5" stroke-linecap="round"/>
      <line x1="8" y1="80" x2="10" y2="175" stroke="#111" stroke-width="5" stroke-linecap="round"/>

      <!-- 90s Slip Dress (Minimalist Silver/Grey) -->
      <path d="M -14 0 L 14 0 L 18 80 L -18 80 Z" fill="#e2e8f0" stroke="#94a3b8" stroke-width="3"/>
      <line x1="-12" y1="-10" x2="-12" y2="0" stroke="#94a3b8" stroke-width="2"/>
      <line x1="12" y1="-10" x2="12" y2="0" stroke="#94a3b8" stroke-width="2"/>

      <!-- Arms holding Diet Coke and Cigarette -->
      <!-- Left arm with cigarette -->
      <path d="M -14 5 Q -40 25 -30 50" fill="none" stroke="#111" stroke-width="4" stroke-linecap="round"/>
      <g transform="translate(-30, 48) rotate(-45)">
        <rect x="0" y="-3" width="22" height="6" fill="#fff" stroke="#111" stroke-width="1"/>
        <rect x="0" y="-3" width="6" height="6" fill="#d97706"/>
        <circle cx="22" cy="0" r="3" fill="#ef4444"/>
        <path d="M 24 0 Q 35 -15 28 -30 T 40 -45" fill="none" stroke="#94a3b8" stroke-width="3" stroke-linecap="round" opacity="0.75"/>
      </g>

      <!-- Right arm holding Diet Coke can -->
      <path d="M 14 5 Q 35 25 30 55" fill="none" stroke="#111" stroke-width="4" stroke-linecap="round"/>
      <g transform="translate(30, 55)">
        <rect x="-8" y="-18" width="16" height="26" rx="3" fill="#dc2626" stroke="#991b1b" stroke-width="2"/>
        <rect x="-6" y="-16" width="12" height="5" fill="#f1f5f9"/>
        <text x="0" y="-3" font-family="'Impact', sans-serif" font-size="8" fill="#ffffff" text-anchor="middle">DIET</text>
      </g>

      <!-- Head Base -->
      <g transform="translate(0, -35)">
        <!-- Blonde messy curtain hair -->
        <path d="M -30 -15 C -45 20 -30 65 -20 75 C -15 75 -35 20 -20 -25 Z" fill="#fde047"/>
        <path d="M 30 -15 C 45 20 30 65 20 75 C 15 75 35 20 20 -25 Z" fill="#fde047"/>
        <ellipse cx="0" cy="0" rx="28" ry="34" fill="#fef08a" opacity="0.6" stroke="#111" stroke-width="4"/>

        <!-- Giant 90s Blackout Sunglasses -->
        <g transform="translate(0, -5)">
          <ellipse cx="-12" cy="0" rx="14" ry="9" fill="#09090b" stroke="#111" stroke-width="2"/>
          <ellipse cx="12" cy="0" rx="14" ry="9" fill="#09090b" stroke="#111" stroke-width="2"/>
          <line x1="-3" y1="0" x2="3" y2="0" stroke="#111" stroke-width="3"/>
          <line x1="-18" y1="-4" x2="-8" y2="4" stroke="#ffffff" stroke-width="2" opacity="0.6"/>
          <line x1="8" y1="-4" x2="18" y2="4" stroke="#ffffff" stroke-width="2" opacity="0.6"/>
        </g>

        <!-- Deadpan Apathy Mouth -->
        <line x1="-10" y1="20" x2="10" y2="20" stroke="#991b1b" stroke-width="3" stroke-linecap="round"/>
      </g>
    </g>
  `;
}
/**
 * 5. Tech Bro: Instant Vector Transformation (Crypto -> AI Prompt Engineer)
 */
export function renderTechBro(opts) {
    const { x, y, scale = 1, rotation = 0, mode = "crypto", poof = false, timeSec = 0 } = opts;
    const bob = getBob(timeSec, 4, 3);
    if (poof) {
        return `
      <g id="cast-tech-bro-poof" transform="translate(${x}, ${y}) scale(${scale})">
        <circle cx="0" cy="0" r="80" fill="#f1f5f9" stroke="#94a3b8" stroke-width="5" opacity="0.9"/>
        <circle cx="-50" cy="-40" r="55" fill="#f8fafc" stroke="#94a3b8" stroke-width="4"/>
        <circle cx="55" cy="-30" r="60" fill="#f8fafc" stroke="#94a3b8" stroke-width="4"/>
        <circle cx="-30" cy="45" r="50" fill="#e2e8f0" stroke="#94a3b8" stroke-width="4"/>
        <circle cx="40" cy="45" r="55" fill="#e2e8f0" stroke="#94a3b8" stroke-width="4"/>
        <text x="0" y="15" font-family="'Impact', sans-serif" font-size="36" fill="#f59e0b" text-anchor="middle" letter-spacing="2">*POOF!*</text>
      </g>
    `;
    }
    if (mode === "crypto") {
        return `
      <g id="cast-tech-bro-crypto" transform="translate(${x}, ${y + bob}) rotate(${rotation}) scale(${scale})">
        <ellipse cx="0" cy="180" rx="45" ry="10" fill="#000" opacity="0.18"/>
        <line x1="-12" y1="80" x2="-14" y2="175" stroke="#1d4ed8" stroke-width="8" stroke-linecap="round"/>
        <line x1="12" y1="80" x2="14" y2="175" stroke="#1d4ed8" stroke-width="8" stroke-linecap="round"/>
        <rect x="-24" y="165" width="20" height="12" rx="4" fill="#ffffff" stroke="#111" stroke-width="2"/>
        <rect x="6" y="165" width="20" height="12" rx="4" fill="#ffffff" stroke="#111" stroke-width="2"/>

        <rect x="-28" y="0" width="56" height="85" rx="8" fill="#1e293b" stroke="#0f172a" stroke-width="4"/>
        <path d="M -15 0 L 0 35 L 15 0" fill="#0284c7"/>
        <rect x="-20" y="20" width="14" height="6" fill="#dc2626"/>

        <line x1="-28" y1="15" x2="-55" y2="35" stroke="#111" stroke-width="6" stroke-linecap="round"/>
        <line x1="28" y1="15" x2="55" y2="35" stroke="#111" stroke-width="6" stroke-linecap="round"/>
        <circle cx="-60" cy="35" r="16" fill="#f59e0b" stroke="#b45309" stroke-width="3"/>
        <text x="-60" y="41" font-family="'Impact', sans-serif" font-size="18" fill="#fff" text-anchor="middle">B</text>
        <polygon points="60,22 72,35 60,48 48,35" fill="#38bdf8" stroke="#0284c7" stroke-width="2"/>

        <g transform="translate(0, -40)">
          <circle cx="0" cy="0" r="36" fill="#fddfb0" stroke="#111" stroke-width="5"/>
          <path d="M -36 -10 C -36 -45 36 -45 36 -10 Z" fill="#dc2626" stroke="#991b1b" stroke-width="4"/>
          <rect x="-30" y="-12" width="60" height="8" fill="#b91c1c"/>
          <rect x="25" y="-14" width="22" height="6" rx="2" fill="#991b1b"/>
          <ellipse cx="-13" cy="-2" rx="12" ry="8" fill="#111"/>
          <ellipse cx="13" cy="-2" rx="12" ry="8" fill="#111"/>
          <path d="M -12 18 Q 0 26 14 14" fill="none" stroke="#111" stroke-width="4" stroke-linecap="round"/>
        </g>
      </g>
    `;
    }
    else {
        return `
      <g id="cast-tech-bro-ai" transform="translate(${x}, ${y + bob}) rotate(${rotation}) scale(${scale})">
        <ellipse cx="0" cy="180" rx="45" ry="10" fill="#000" opacity="0.18"/>
        <line x1="-10" y1="80" x2="-12" y2="175" stroke="#09090b" stroke-width="7" stroke-linecap="round"/>
        <line x1="10" y1="80" x2="12" y2="175" stroke="#09090b" stroke-width="7" stroke-linecap="round"/>

        <rect x="-24" y="-10" width="48" height="95" rx="6" fill="#18181b" stroke="#09090b" stroke-width="4"/>
        <rect x="-14" y="-18" width="28" height="12" rx="4" fill="#27272a"/>

        <path d="M -12 -8 L 0 45 L 12 -8" fill="none" stroke="#06b6d4" stroke-width="3"/>
        <rect x="-18" y="45" width="36" height="48" rx="4" fill="#0284c7" stroke="#0369a1" stroke-width="2"/>
        <text x="0" y="78" font-family="'Courier New', monospace" font-size="7" font-weight="bold" fill="#fff" text-anchor="middle">AI FOUNDER</text>

        <!-- Panic Sweat -->
        <circle cx="28" cy="-55" r="5" fill="#38bdf8" filter="url(#glow)"/>

        <g transform="translate(0, -42)">
          <circle cx="0" cy="0" r="34" fill="#fddfb0" stroke="#111" stroke-width="5"/>
          <path d="M -34 -10 C -34 -45 34 -45 34 -10 C 20 -35 -20 -35 -34 -10 Z" fill="#334155"/>
          <rect x="-28" y="-10" width="56" height="18" rx="9" fill="#06b6d4" stroke="#0891b2" stroke-width="3" filter="url(#glow)"/>
          <line x1="-20" y1="-2" x2="20" y2="-2" stroke="#ffffff" stroke-width="3" stroke-linecap="round"/>
          <line x1="-12" y1="18" x2="12" y2="18" stroke="#111" stroke-width="4" stroke-linecap="round"/>
        </g>
      </g>
    `;
    }
}
/**
 * 6. Paparazzi Stick Figures
 */
export function renderPaparazzi(x, y, isFlashing = false) {
    return `
    <g class="cast-paparazzi" transform="translate(${x}, ${y})">
      <line x1="0" y1="0" x2="0" y2="70" stroke="#111" stroke-width="6" stroke-linecap="round"/>
      <line x1="0" y1="70" x2="-20" y2="120" stroke="#111" stroke-width="6" stroke-linecap="round"/>
      <line x1="0" y1="70" x2="20" y2="120" stroke="#111" stroke-width="6" stroke-linecap="round"/>

      <line x1="0" y1="20" x2="25" y2="0" stroke="#111" stroke-width="6" stroke-linecap="round"/>
      <line x1="0" y1="20" x2="15" y2="-10" stroke="#111" stroke-width="6" stroke-linecap="round"/>

      <g transform="translate(20, -10)">
        <rect x="0" y="-15" width="40" height="30" rx="4" fill="#334155" stroke="#111" stroke-width="3"/>
        <rect x="35" y="-10" width="30" height="20" rx="3" fill="#1e293b" stroke="#111" stroke-width="2"/>
        <circle cx="20" cy="0" r="8" fill="#0284c7"/>

        ${isFlashing ? `
          <g transform="translate(15, -25)">
            <polygon points="0,0 -40,-40 -15,-60 10,-70 35,-50 20,-20" fill="#fde047" opacity="0.9" filter="url(#glow)"/>
            <circle cx="0" cy="-20" r="35" fill="#ffffff" opacity="0.8"/>
            <text x="35" y="-35" font-family="'Impact', sans-serif" font-size="20" fill="#ef4444">*FLASH!*</text>
          </g>
        ` : ""}
      </g>

      <g transform="translate(0, -30)">
        <circle cx="0" cy="0" r="22" fill="#fddfb0" stroke="#111" stroke-width="4"/>
        <ellipse cx="6" cy="-2" rx="4" ry="5" fill="#111"/>
        <ellipse cx="0" cy="-14" rx="28" ry="8" fill="#475569"/>
        <rect x="-18" y="-28" width="36" height="16" rx="4" fill="#475569"/>
        <rect x="10" y="-32" width="14" height="10" fill="#ffffff"/>
        <text x="17" y="-24" font-size="7" font-weight="bold" fill="#dc2626" text-anchor="middle">PRESS</text>
      </g>
    </g>
  `;
}
/**
 * 7. Couch Guy
 */
export function renderCouchGuy(opts) {
    const { x, y, scale = 1.35, isDucking = false, timeSec = 0 } = opts;
    const shake = isDucking ? (Math.sin(timeSec * 30) * 4) : 0;
    return `
    <g id="cast-couch-guy" transform="translate(${x + shake}, ${y}) scale(${scale})">
      <!-- Armchair Shadow -->
      <ellipse cx="0" cy="110" rx="110" ry="16" fill="#000000" opacity="0.18"/>

      <!-- Leather Armchair Body -->
      <rect x="-95" y="10" width="190" height="100" rx="16" fill="#78350f" stroke="#451a03" stroke-width="6" filter="url(#cardShadow)"/>
      <rect x="-115" y="0" width="35" height="110" rx="12" fill="#92400e" stroke="#451a03" stroke-width="5"/>
      <rect x="80" y="0" width="35" height="110" rx="12" fill="#92400e" stroke="#451a03" stroke-width="5"/>
      <rect x="-85" y="-55" width="170" height="75" rx="14" fill="#92400e" stroke="#451a03" stroke-width="5"/>

      <!-- Bag of Chips -->
      <g transform="translate(50, 15)">
        <polygon points="-16,0 16,0 22,45 -22,45" fill="#eab308" stroke="#ca8a04" stroke-width="3"/>
        <text x="0" y="28" font-family="'Impact', sans-serif" font-size="12" fill="#dc2626" text-anchor="middle">CHIPS</text>
      </g>

      ${isDucking ? `
        <g transform="translate(0, 25)">
          <ellipse cx="0" cy="0" rx="32" ry="26" fill="#38bdf8" stroke="#0284c7" stroke-width="4"/>
          <line x1="-15" y1="20" x2="-35" y2="45" stroke="#64748b" stroke-width="8" stroke-linecap="round"/>
          <line x1="15" y1="20" x2="35" y2="45" stroke="#64748b" stroke-width="8" stroke-linecap="round"/>
          <path d="M -30 0 Q -25 -35 0 -25 Q 25 -35 30 0" fill="none" stroke="#fddfb0" stroke-width="8" stroke-linecap="round"/>

          <circle cx="0" cy="-10" r="28" fill="#fddfb0" stroke="#111" stroke-width="4"/>
          <ellipse cx="-9" cy="-12" rx="5" ry="7" fill="#111"/>
          <ellipse cx="9" cy="-12" rx="5" ry="7" fill="#111"/>
          <path d="M -10 4 Q -5 0 0 4 Q 5 8 10 4" fill="none" stroke="#111" stroke-width="3"/>
          <path d="M -9 -6 Q -16 15 -13 32" fill="none" stroke="#38bdf8" stroke-width="5" stroke-linecap="round"/>
          <path d="M 9 -6 Q 16 15 13 32" fill="none" stroke="#38bdf8" stroke-width="5" stroke-linecap="round"/>
        </g>
      ` : `
        <g transform="translate(0, 0)">
          <path d="M -24 10 L 24 10 L 28 70 L -28 70 Z" fill="#38bdf8" stroke="#0284c7" stroke-width="5"/>
          <line x1="-14" y1="70" x2="-22" y2="92" stroke="#64748b" stroke-width="8" stroke-linecap="round"/>
          <line x1="14" y1="70" x2="22" y2="92" stroke="#64748b" stroke-width="8" stroke-linecap="round"/>
          <path d="M 24 20 Q 40 30 50 25" fill="none" stroke="#fddfb0" stroke-width="7" stroke-linecap="round"/>

          <g transform="translate(0, -28)">
            <circle cx="0" cy="0" r="30" fill="#fddfb0" stroke="#111" stroke-width="4"/>
            <path d="M -30 -8 C -38 -38 28 -42 30 -8 C 16 -22 -16 -22 -30 -8 Z" fill="#713f12"/>
            <ellipse cx="-10" cy="-2" rx="7" ry="7" fill="#ffffff" stroke="#111" stroke-width="2"/>
            <ellipse cx="10" cy="-2" rx="7" ry="7" fill="#ffffff" stroke="#111" stroke-width="2"/>
            <circle cx="-9" cy="-2" r="3.5" fill="#111"/>
            <circle cx="11" cy="-2" r="3.5" fill="#111"/>
            <path d="M -8 14 Q 0 18 8 14" fill="none" stroke="#111" stroke-width="3" stroke-linecap="round"/>
          </g>
        </g>
      `}
    </g>
  `;
}
/**
 * 8. EXAGGERATED PIXAR MOM (Hilarious Comic Caricature with Gravitational Orbit)
 */
export function renderPixarMom(opts) {
    const { x, y, scale = 1, rotation = 0, timeSec = 0, showOrbit = true } = opts;
    const bob = getBob(timeSec, 3, 4);
    const jiggle = Math.sin(timeSec * 8) * 6;
    // Orbit angle for floating space debris
    const orbitAngle1 = timeSec * 3.5;
    const orbX1 = Math.cos(orbitAngle1) * 220;
    const orbY1 = 80 + Math.sin(orbitAngle1) * 55;
    const orbitAngle2 = timeSec * 2.8 + Math.PI;
    const orbX2 = Math.cos(orbitAngle2) * 250;
    const orbY2 = 80 + Math.sin(orbitAngle2) * 65;
    return `
    <g id="cast-pixar-mom" transform="translate(${x}, ${y + bob}) rotate(${rotation}) scale(${scale})">
      <!-- Shadow -->
      <ellipse cx="0" cy="220" rx="130" ry="22" fill="#000000" opacity="0.25"/>

      <!-- Orbital Rings (if enabled) -->
      ${showOrbit ? `
        <ellipse cx="0" cy="90" rx="230" ry="60" fill="none" stroke="#38bdf8" stroke-width="3" stroke-dasharray="10 8" opacity="0.65"/>
        <ellipse cx="0" cy="90" rx="270" ry="75" fill="none" stroke="#f43f5e" stroke-width="2" stroke-dasharray="6 6" opacity="0.5"/>

        <!-- Orbiting iPhone -->
        <g transform="translate(${orbX1}, ${orbY1}) rotate(${orbitAngle1 * 40})">
          <rect x="-12" y="-20" width="24" height="40" rx="4" fill="#1e293b" stroke="#38bdf8" stroke-width="2"/>
          <text x="0" y="30" font-family="'Impact', sans-serif" font-size="12" fill="#38bdf8" text-anchor="middle">iPhone</text>
        </g>

        <!-- Orbiting Avocado Toast -->
        <g transform="translate(${orbX2}, ${orbY2}) rotate(${orbitAngle2 * 30})">
          <rect x="-16" y="-12" width="32" height="24" rx="4" fill="#d97706" stroke="#92400e" stroke-width="2"/>
          <ellipse cx="0" cy="0" rx="10" ry="8" fill="#84cc16"/>
          <text x="0" y="24" font-family="'Impact', sans-serif" font-size="12" fill="#84cc16" text-anchor="middle">Toast</text>
        </g>
      ` : ""}

      <!-- Tiny Toothpick Stick Legs -->
      <line x1="-35" y1="120" x2="-45" y2="215" stroke="#111" stroke-width="6" stroke-linecap="round"/>
      <line x1="35" y1="120" x2="45" y2="215" stroke="#111" stroke-width="6" stroke-linecap="round"/>
      <!-- Tiny Red High Heels -->
      <polygon points="-58,215 -35,215 -42,205" fill="#ef4444"/>
      <polygon points="35,215 58,215 42,205" fill="#ef4444"/>

      <!-- COMICALLY ENORMOUS BULBOUS BUTT & HIPS (The Pixar Mom Silhouette) -->
      <g id="pixar-hips" transform="translate(0, 85)">
        <!-- Giant Left & Right Spheres with Jiggle Physics -->
        <ellipse cx="${-85 + jiggle / 2}" cy="0" rx="105" ry="75" fill="#f43f5e" stroke="#be123c" stroke-width="7" filter="url(#cardShadow)"/>
        <ellipse cx="${85 - jiggle / 2}" cy="0" rx="105" ry="75" fill="#f43f5e" stroke="#be123c" stroke-width="7" filter="url(#cardShadow)"/>
        <ellipse cx="0" cy="15" rx="110" ry="70" fill="#e11d48"/>
        
        <!-- Red Yoga Pants Seam & Highlight -->
        <path d="M 0 -45 L 0 55" stroke="#be123c" stroke-width="5"/>
        <ellipse cx="-85" cy="-25" rx="55" ry="25" fill="#fb7185" opacity="0.45"/>
        <ellipse cx="85" cy="-25" rx="55" ry="25" fill="#fb7185" opacity="0.45"/>
      </g>

      <!-- Microscopic Tiny Torso & Corset Waist -->
      <path d="M -15 -20 L 15 -20 L 12 35 L -12 35 Z" fill="#1e293b" stroke="#0f172a" stroke-width="4"/>
      <!-- Pink Crop Top -->
      <path d="M -18 -20 L 18 -20 L 14 10 L -14 10 Z" fill="#ec4899" stroke="#db2777" stroke-width="3"/>

      <!-- Arms Resting on Impossible Hips -->
      <path d="M -18 -15 Q -65 15 -45 55" fill="none" stroke="#fddfb0" stroke-width="6" stroke-linecap="round"/>
      <path d="M 18 -15 Q 65 15 45 55" fill="none" stroke="#fddfb0" stroke-width="6" stroke-linecap="round"/>

      <!-- Head & Classic Pixar Mom Hairstyle -->
      <g transform="translate(0, -65)">
        <!-- Voluminous Brown Pixar Bob Hair -->
        <path d="M -45 -15 C -65 -45 65 -45 45 -15 C 65 25 35 45 25 35 C 10 45 -35 45 -45 -15 Z" fill="#78350f" stroke="#451a03" stroke-width="4"/>
        <!-- Face -->
        <ellipse cx="0" cy="0" rx="30" ry="32" fill="#fddfb0" stroke="#111" stroke-width="4"/>
        <!-- Big Sassy Eyes with Blue Eyeliner -->
        <ellipse cx="-11" cy="-4" rx="10" ry="8" fill="#fff" stroke="#111" stroke-width="2"/>
        <ellipse cx="11" cy="-4" rx="10" ry="8" fill="#fff" stroke="#111" stroke-width="2"/>
        <circle cx="-9" cy="-4" r="5" fill="#0284c7"/>
        <circle cx="13" cy="-4" r="5" fill="#0284c7"/>
        <!-- Long eyelashes -->
        <path d="M -18 -9 L -24 -14 M 18 -9 L 24 -14" stroke="#111" stroke-width="3"/>
        <!-- Confident Smug Red Lip Smile -->
        <path d="M -10 14 Q 0 24 14 12" fill="none" stroke="#dc2626" stroke-width="4" stroke-linecap="round"/>
      </g>
    </g>
  `;
}
/**
 * 9. EVICETED ORGANS (Cute Cartoon Liver & Stomach with Suitcases)
 */
/**
 * 9. EVICTED ORGANS (Cute Large Cartoon Liver & Stomach with Suitcases)
 */
export function renderEvictedOrgans(x, y, timeSec = 0) {
    const walkBob = Math.sin(timeSec * 8) * 12;
    const leg1 = Math.sin(timeSec * 8) * 35;
    const leg2 = -leg1;
    const tearStream = (timeSec * 30) % 40;
    return `
    <g id="cast-evicted-organs" transform="translate(${x}, ${y})">
      <!-- 1. Cute Cartoon Liver with Bowler Hat & Suitcase -->
      <g transform="translate(-160, ${walkBob})">
        <!-- Shadow -->
        <ellipse cx="0" cy="140" rx="70" ry="16" fill="#000" opacity="0.18"/>
        <!-- Stick Legs Walking -->
        <line x1="-25" y1="80" x2="${-35 + leg1}" y2="135" stroke="#111" stroke-width="8" stroke-linecap="round"/>
        <line x1="25" y1="80" x2="${35 + leg2}" y2="135" stroke="#111" stroke-width="8" stroke-linecap="round"/>

        <!-- Liver Body (Big Deep Red Blob) -->
        <path d="M -80 20 C -90 -60 70 -70 90 20 C 90 80 -40 90 -80 20 Z" fill="#991b1b" stroke="#7f1d1d" stroke-width="8" filter="url(#cardShadow)"/>
        <!-- Cute Eyes -->
        <circle cx="-24" cy="-10" r="12" fill="#fff"/>
        <circle cx="24" cy="-10" r="12" fill="#fff"/>
        <circle cx="-20" cy="-10" r="6" fill="#111"/>
        <circle cx="28" cy="-10" r="6" fill="#111"/>
        <!-- Sad Wavy Mouth -->
        <path d="M -16 30 Q 0 20 16 30" fill="none" stroke="#fff" stroke-width="6" stroke-linecap="round"/>

        <!-- Bowler Hat -->
        <ellipse cx="0" cy="-56" rx="40" ry="12" fill="#1e293b"/>
        <rect x="-24" y="-80" width="48" height="30" rx="8" fill="#1e293b"/>

        <!-- Brown Leather Suitcase -->
        <g transform="translate(70, 40)">
          <rect x="0" y="0" width="56" height="44" rx="6" fill="#78350f" stroke="#451a03" stroke-width="4"/>
          <path d="M 16 0 Q 28 -16 40 0" fill="none" stroke="#111" stroke-width="4"/>
        </g>
      </g>

      <!-- 2. Cute Cartoon Stomach Crying with Handkerchief -->
      <g transform="translate(120, ${-walkBob})">
        <!-- Shadow -->
        <ellipse cx="0" cy="140" rx="70" ry="16" fill="#000" opacity="0.18"/>
        <!-- Stick Legs Walking -->
        <line x1="-25" y1="80" x2="${-35 + leg2}" y2="135" stroke="#111" stroke-width="8" stroke-linecap="round"/>
        <line x1="25" y1="80" x2="${35 + leg1}" y2="135" stroke="#111" stroke-width="8" stroke-linecap="round"/>

        <!-- Pink J-Shape Stomach -->
        <path d="M -60 -50 C 0 -70 70 -30 70 30 C 70 90 -50 90 -70 30 C -80 -10 -70 -40 -60 -50 Z" fill="#f472b6" stroke="#db2777" stroke-width="8" filter="url(#cardShadow)"/>
        <!-- Big Sad Eyes with Moving Tears -->
        <circle cx="-20" cy="-4" r="14" fill="#fff"/>
        <circle cx="24" cy="-4" r="14" fill="#fff"/>
        <circle cx="-16" cy="-4" r="7" fill="#111"/>
        <circle cx="28" cy="-4" r="7" fill="#111"/>
        <!-- Animated Crying Tear Stream -->
        <path d="M -28 15 Q -40 40 -35 ${60 + tearStream}" fill="none" stroke="#38bdf8" stroke-width="8" stroke-linecap="round" filter="url(#glow)"/>
        <path d="M 16 15 Q 8 40 12 ${60 + tearStream}" fill="none" stroke="#38bdf8" stroke-width="8" stroke-linecap="round" filter="url(#glow)"/>
        <!-- Sad Quivering Mouth -->
        <path d="M -12 36 Q 4 24 20 36" fill="none" stroke="#831843" stroke-width="6" stroke-linecap="round"/>

        <!-- White Handkerchief -->
        <polygon points="50,20 80,50 60,70" fill="#ffffff" stroke="#cbd5e1" stroke-width="4"/>
      </g>
    </g>
  `;
}
/**
 * 10. FLYING CARBS (Pizza slice with angel wings & sourdough loaf ascending to heaven)
 */
export function renderFlyingCarbs(x, y, timeSec = 0) {
    const wingFlap = Math.sin(timeSec * 10) * 25;
    const floatY = Math.sin(timeSec * 4) * 15;
    return `
    <g id="cast-flying-carbs" transform="translate(${x}, ${y + floatY})">
      <!-- 1. Pizza Slice with Halo & Angel Wings -->
      <g transform="translate(-120, 0)">
        <!-- Glowing Yellow Halo -->
        <ellipse cx="0" cy="-70" rx="35" ry="10" fill="none" stroke="#eab308" stroke-width="5" filter="url(#glow)"/>

        <!-- Flapping Angel Wings -->
        <g id="wings" fill="#ffffff" stroke="#cbd5e1" stroke-width="3">
          <!-- Left Wing -->
          <path d="M -30 -10 C -70 ${-40 + wingFlap} -80 ${20 + wingFlap} -30 10 Z"/>
          <!-- Right Wing -->
          <path d="M 30 -10 C 70 ${-40 + wingFlap} 80 ${20 + wingFlap} 30 10 Z"/>
        </g>

        <!-- Pizza Slice -->
        <polygon points="0,55 -45,-45 45,-45" fill="#facc15" stroke="#ca8a04" stroke-width="4"/>
        <path d="M -45 -45 Q 0 -58 45 -45" stroke="#b45309" stroke-width="12" stroke-linecap="round"/>
        <!-- Pepperonis -->
        <circle cx="-10" cy="-20" r="10" fill="#dc2626"/>
        <circle cx="15" cy="-10" r="9" fill="#dc2626"/>
        <circle cx="0" cy="15" r="8" fill="#dc2626"/>

        <text x="0" y="85" font-family="'Impact', sans-serif" font-size="18" fill="#ca8a04" text-anchor="middle">R.I.P. PIZZA</text>
      </g>

      <!-- 2. Holy Bread Loaf Ascending with Sparkles -->
      <g transform="translate(120, -30)">
        <ellipse cx="0" cy="-55" rx="30" ry="8" fill="none" stroke="#eab308" stroke-width="4" filter="url(#glow)"/>
        <!-- Wings -->
        <g fill="#ffffff" stroke="#cbd5e1" stroke-width="3">
          <path d="M -30 0 C -65 ${-30 + wingFlap} -75 ${25 + wingFlap} -25 15 Z"/>
          <path d="M 30 0 C 65 ${-30 + wingFlap} 75 ${25 + wingFlap} 25 15 Z"/>
        </g>
        <!-- Loaf -->
        <ellipse cx="0" cy="0" rx="45" ry="25" fill="#d97706" stroke="#92400e" stroke-width="4"/>
        <path d="M -20 -15 Q -10 -5 -5 -15 M 5 -15 Q 15 -5 20 -15" stroke="#78350f" stroke-width="3" stroke-linecap="round"/>
        <text x="0" y="50" font-family="'Impact', sans-serif" font-size="16" fill="#d97706" text-anchor="middle">BREAD (EVICTED)</text>
      </g>
    </g>
  `;
}
/**
 * 11. MEGA CANCELLED RUBBER STAMP (Animated Slam with Dust Puff)
 */
export function renderMegaStamp(x, y, progress = 1) {
    const isSlammed = progress >= 0.8;
    const stampY = isSlammed ? y : y - (1 - progress) * 400;
    return `
    <g id="cast-mega-stamp" transform="translate(${x}, ${stampY})">
      <!-- Dust Puff when slammed -->
      ${isSlammed ? `
        <g id="impact-dust" opacity="0.85">
          <circle cx="-140" cy="40" r="28" fill="#cbd5e1"/>
          <circle cx="140" cy="40" r="28" fill="#cbd5e1"/>
          <circle cx="-90" cy="50" r="20" fill="#e2e8f0"/>
          <circle cx="90" cy="50" r="20" fill="#e2e8f0"/>
          <line x1="-160" y1="50" x2="-200" y2="30" stroke="#94a3b8" stroke-width="4"/>
          <line x1="160" y1="50" x2="200" y2="30" stroke="#94a3b8" stroke-width="4"/>
        </g>
      ` : ""}

      <!-- Wooden Handle -->
      <path d="M -15 -180 L 15 -180 L 25 -60 L -25 -60 Z" fill="#92400e" stroke="#451a03" stroke-width="5"/>
      <ellipse cx="0" cy="-180" rx="35" ry="25" fill="#78350f" stroke="#451a03" stroke-width="5"/>

      <!-- Metal Base Mount -->
      <rect x="-130" y="-60" width="260" height="25" rx="6" fill="#475569" stroke="#1e293b" stroke-width="4"/>

      <!-- Big Red Rubber Ink Pad -->
      <rect x="-140" y="-35" width="280" height="60" rx="8" fill="#dc2626" stroke="#991b1b" stroke-width="5" filter="url(#cardShadow)"/>
      <rect x="-130" y="-28" width="260" height="46" rx="4" fill="none" stroke="#ffffff" stroke-width="4" stroke-dasharray="8 4"/>
      <text x="0" y="5" font-family="'Impact', sans-serif" font-size="38" fill="#ffffff" letter-spacing="4" text-anchor="middle">
        CANCELLED
      </text>
    </g>
  `;
}
/**
 * 12. BOSS LOOMING SHADOW
 */
export function renderBossShadow(x, y, timeSec = 0) {
    const steamY = (timeSec * 40) % 60;
    return `
    <g id="cast-boss-shadow" transform="translate(${x}, ${y})">
      <!-- Dark Looming Ominous Silhouette -->
      <path d="M -180 300 C -180 80 -120 0 0 0 C 120 0 180 80 180 300 Z" fill="#09090b" opacity="0.85"/>
      <!-- Glowing Menacing Yellow Eyes -->
      <ellipse cx="-45" cy="90" rx="22" ry="14" fill="#eab308" filter="url(#glow)"/>
      <ellipse cx="45" cy="90" rx="22" ry="14" fill="#eab308" filter="url(#glow)"/>
      <circle cx="-42" cy="90" r="6" fill="#09090b"/>
      <circle cx="48" cy="90" r="6" fill="#09090b"/>

      <!-- Coffee Mug in Giant Shadow Hand -->
      <g transform="translate(110, 160)">
        <rect x="0" y="0" width="55" height="65" rx="6" fill="#ffffff" stroke="#09090b" stroke-width="4"/>
        <path d="M 55 15 Q 75 32 55 50" fill="none" stroke="#ffffff" stroke-width="6"/>
        <text x="27" y="42" font-family="'Impact', sans-serif" font-size="14" fill="#09090b" text-anchor="middle">#1 BOSS</text>
        <!-- Steam curls -->
        <path d="M 20 -5 Q 10 ${-20 - steamY} 25 ${-40 - steamY}" fill="none" stroke="#cbd5e1" stroke-width="3" opacity="0.7"/>
        <path d="M 35 -5 Q 45 ${-20 - steamY} 30 ${-40 - steamY}" fill="none" stroke="#cbd5e1" stroke-width="3" opacity="0.7"/>
      </g>
    </g>
  `;
}
/**
 * 13. SEDUCTIVE SOURDOUGH BREAD (The "Ex You Shouldn't Text")
 */
export function renderSeductiveBread(x, y, timeSec = 0, isBlocked = false) {
    const bob = Math.sin(timeSec * 4) * 8;
    const wink = Math.sin(timeSec * 3) > 0.6;
    return `
    <g id="cast-seductive-bread" transform="translate(${x}, ${y + bob}) scale(1.65)">
      <!-- Red & White Checkered Romantic Tablecloth -->
      <g transform="translate(0, 70)">
        <polygon points="-160,0 160,0 190,40 -190,40" fill="#fecdd3" stroke="#f43f5e" stroke-width="4"/>
        <line x1="-100" y1="0" x2="-120" y2="40" stroke="#f43f5e" stroke-width="3"/>
        <line x1="-30" y1="0" x2="-40" y2="40" stroke="#f43f5e" stroke-width="3"/>
        <line x1="40" y1="0" x2="30" y2="40" stroke="#f43f5e" stroke-width="3"/>
        <line x1="110" y1="0" x2="100" y2="40" stroke="#f43f5e" stroke-width="3"/>
      </g>

      <!-- Golden Sourdough Loaf Body -->
      <path d="M -120 15 C -120 -80 120 -80 120 15 C 120 80 -120 80 -120 15 Z" fill="#d97706" stroke="#78350f" stroke-width="8" filter="url(#cardShadow)"/>
      <path d="M -95 10 C -95 -55 95 -55 95 10 C 95 60 -95 60 -95 10 Z" fill="#fbbf24"/>
      <!-- Crust Scores -->
      <path d="M -65 -25 Q -40 -45 -15 -25" fill="none" stroke="#78350f" stroke-width="6" stroke-linecap="round"/>
      <path d="M 15 -25 Q 40 -45 65 -25" fill="none" stroke="#78350f" stroke-width="6" stroke-linecap="round"/>

      <!-- Seductive French Pink Beret -->
      <ellipse cx="-55" cy="-60" rx="45" ry="24" fill="#ec4899" stroke="#be185d" stroke-width="5" transform="rotate(-20 -55 -60)"/>
      <circle cx="-68" cy="-80" r="6" fill="#be185d"/>

      <!-- Flirty Eyelashes & Wink -->
      ${wink ? `
        <path d="M -45 -10 Q -25 -25 -5 -10" fill="none" stroke="#111" stroke-width="6" stroke-linecap="round"/>
        <line x1="-40" y1="-20" x2="-48" y2="-32" stroke="#111" stroke-width="4"/>
        <line x1="-25" y1="-25" x2="-25" y2="-38" stroke="#111" stroke-width="4"/>
      ` : `
        <ellipse cx="-25" cy="-10" rx="14" ry="16" fill="#111"/>
        <circle cx="-28" cy="-14" r="5" fill="#fff"/>
        <line x1="-40" y1="-22" x2="-48" y2="-32" stroke="#111" stroke-width="4"/>
        <line x1="-25" y1="-28" x2="-25" y2="-38" stroke="#111" stroke-width="4"/>
        <line x1="-12" y1="-22" x2="-5" y2="-32" stroke="#111" stroke-width="4"/>
      `}
      <ellipse cx="25" cy="-10" rx="14" ry="16" fill="#111"/>
      <circle cx="22" cy="-14" r="5" fill="#fff"/>
      <line x1="12" y1="-22" x2="5" y2="-32" stroke="#111" stroke-width="4"/>
      <line x1="25" y1="-28" x2="25" y2="-38" stroke="#111" stroke-width="4"/>
      <line x1="38" y1="-22" x2="45" y2="-32" stroke="#111" stroke-width="4"/>

      <!-- Red Lipstick Kiss Pout -->
      <ellipse cx="0" cy="24" rx="16" ry="10" fill="#ef4444" stroke="#991b1b" stroke-width="3"/>
      <path d="M -10 24 Q 0 16 10 24" stroke="#7f1d1d" stroke-width="3" fill="none"/>

      <!-- Floating Heart Emojis -->
      <path d="M 85 -55 C 85 -75 105 -75 105 -55 C 105 -40 85 -20 85 -15 C 85 -20 65 -40 65 -55 C 65 -75 85 -75 85 -55 Z" fill="#f43f5e" opacity="0.95" filter="url(#glow)"/>

      ${isBlocked ? `
        <!-- Giant Red BLOCKED Rubber Stamp -->
        <g transform="translate(0, 10) rotate(-14)">
          <rect x="-130" y="-40" width="260" height="80" rx="12" fill="#dc2626" stroke="#ffffff" stroke-width="6" filter="url(#cardShadow)"/>
          <text x="0" y="16" font-family="'Impact', sans-serif" font-size="46" fill="#ffffff" letter-spacing="4" text-anchor="middle">
            BLOCKED
          </text>
        </g>
      ` : ""}
    </g>
  `;
}
/**
 * 14. MARY POPPINS WIND GUST (Actress swept by gale)
 */
export function renderMaryPoppinsWind(x, y, timeSec = 0) {
    const windAngle = -28 + Math.sin(timeSec * 8) * 8;
    const umbrellaTilt = 50 + Math.sin(timeSec * 6) * 14;
    return `
    <g id="cast-mary-poppins-wind" transform="translate(${x}, ${y}) scale(1.55)">
      <!-- Swirling Wind Tornado Lines -->
      <g stroke="#94a3b8" stroke-width="4.5" fill="none" opacity="0.8" stroke-dasharray="20 10">
        <path d="M -260 -100 Q -120 -150 140 -80 Q 280 -30 360 -100"/>
        <path d="M -280 20 Q -90 -30 180 50 Q 320 100 400 0"/>
        <path d="M -240 140 Q -50 90 220 160"/>
      </g>
      <!-- Flying Autumn Leaves & Debris -->
      <ellipse cx="-100" cy="-80" rx="16" ry="8" fill="#f97316" transform="rotate(35 -100 -80)"/>
      <ellipse cx="160" cy="30" rx="18" ry="9" fill="#eab308" transform="rotate(-45 160 30)"/>
      <ellipse cx="70" cy="120" rx="14" ry="7" fill="#ef4444" transform="rotate(60 70 120)"/>

      <!-- Stick Figure Blown Horizontally -->
      <g transform="rotate(${windAngle})">
        <!-- Inside-Out Umbrella -->
        <g transform="translate(70, -140) rotate(${umbrellaTilt})">
          <line x1="0" y1="0" x2="0" y2="120" stroke="#475569" stroke-width="6" stroke-linecap="round"/>
          <path d="M 0 120 Q 18 135 25 120" fill="none" stroke="#475569" stroke-width="6" stroke-linecap="round"/>
          <!-- Inverted Canopy -->
          <path d="M -90 -40 Q 0 15 90 -40 Q 0 -15 -90 -40 Z" fill="#18181b" stroke="#09090b" stroke-width="5"/>
          <line x1="-90" y1="-40" x2="0" y2="0" stroke="#94a3b8" stroke-width="3"/>
          <line x1="90" y1="-40" x2="0" y2="0" stroke="#94a3b8" stroke-width="3"/>
        </g>

        <!-- Stretched Arm Gripping Umbrella -->
        <line x1="0" y1="-25" x2="60" y2="-95" stroke="#111" stroke-width="7" stroke-linecap="round"/>
        <!-- Head blown back with screaming mouth -->
        <circle cx="-30" cy="-65" r="38" fill="#fddfb0" stroke="#111" stroke-width="6"/>
        <ellipse cx="-40" cy="-68" rx="6" ry="8" fill="#111"/>
        <ellipse cx="-20" cy="-68" rx="6" ry="8" fill="#111"/>
        <ellipse cx="-30" cy="-45" rx="12" ry="16" fill="#991b1b"/>
        <!-- Hair flying straight back -->
        <path d="M -60 -70 Q -130 -85 -160 -60 Q -110 -55 -60 -55 Z" fill="#09090b"/>

        <!-- Body & Legs streaming horizontally -->
        <line x1="0" y1="-25" x2="-60" y2="35" stroke="#111" stroke-width="7"/>
        <line x1="-60" y1="35" x2="-150" y2="25" stroke="#111" stroke-width="7" stroke-linecap="round"/>
        <line x1="-60" y1="35" x2="-140" y2="65" stroke="#111" stroke-width="7" stroke-linecap="round"/>
      </g>
    </g>
  `;
}
/**
 * 15. COUCH PENNY HUNTER (Digging for $50M Net Worth)
 */
export function renderCouchPennyHunter(x, y, timeSec = 0) {
    const kick = Math.sin(timeSec * 8) * 18;
    return `
    <g id="cast-couch-penny" transform="translate(${x}, ${y}) scale(1.55)">
      <!-- Floor Shadow -->
      <ellipse cx="0" cy="110" rx="260" ry="25" fill="#000000" opacity="0.15"/>

      <!-- Giant Retro 70s Orange Velvet Couch -->
      <!-- Couch Back -->
      <rect x="-220" y="-95" width="440" height="145" rx="24" fill="#ea580c" stroke="#9a3412" stroke-width="8" filter="url(#cardShadow)"/>
      <line x1="-75" y1="-95" x2="-75" y2="50" stroke="#9a3412" stroke-width="5"/>
      <line x1="75" y1="-95" x2="75" y2="50" stroke="#9a3412" stroke-width="5"/>

      <!-- Couch Base & Armrests -->
      <rect x="-260" y="-35" width="75" height="145" rx="20" fill="#c2410c" stroke="#7c2d12" stroke-width="7"/>
      <rect x="185" y="-35" width="75" height="145" rx="20" fill="#c2410c" stroke="#7c2d12" stroke-width="7"/>
      <rect x="-210" y="25" width="420" height="85" rx="16" fill="#c2410c" stroke="#7c2d12" stroke-width="7"/>

      <!-- Flying Cushion tossed high in the air -->
      <g transform="translate(110, -135) rotate(-28)">
        <rect x="-55" y="-30" width="110" height="60" rx="12" fill="#f97316" stroke="#9a3412" stroke-width="6" filter="url(#cardShadow)"/>
      </g>

      <!-- Stick Figure Head-First Inside Couch Gap -->
      <g transform="translate(-45, 25)">
        <line x1="0" y1="0" x2="-20" y2="${-85 + kick}" stroke="#111" stroke-width="8" stroke-linecap="round"/>
        <line x1="0" y1="0" x2="30" y2="${-80 - kick}" stroke="#111" stroke-width="8" stroke-linecap="round"/>
        <!-- Red High Heels -->
        <polygon points="${-32},${-85 + kick} ${-12},${-85 + kick} ${-22},${-98 + kick}" fill="#dc2626"/>
        <polygon points="${18},${-80 - kick} ${38},${-80 - kick} ${28},${-93 - kick}" fill="#dc2626"/>
      </g>

      <!-- Floating Shiny 1-Cent Pennies with Glint -->
      <g transform="translate(-130, -120)" filter="url(#glow)">
        <circle cx="0" cy="0" r="26" fill="#b45309" stroke="#78350f" stroke-width="4"/>
        <text x="0" y="9" font-family="'Impact', sans-serif" font-size="20" fill="#fef3c7" text-anchor="middle">1¢</text>
      </g>
      <g transform="translate(0, -155)" filter="url(#glow)">
        <circle cx="0" cy="0" r="22" fill="#b45309" stroke="#78350f" stroke-width="4"/>
        <text x="0" y="8" font-family="'Impact', sans-serif" font-size="17" fill="#fef3c7" text-anchor="middle">1¢</text>
      </g>
      <g transform="translate(160, -60)" filter="url(#glow)">
        <circle cx="0" cy="0" r="28" fill="#b45309" stroke="#78350f" stroke-width="4"/>
        <text x="0" y="10" font-family="'Impact', sans-serif" font-size="22" fill="#fef3c7" text-anchor="middle">1¢</text>
      </g>

      <!-- Gold Banner: "TOTAL FOUND: $0.03" -->
      <rect x="-135" y="115" width="270" height="50" rx="10" fill="#fef08a" stroke="#ca8a04" stroke-width="5" filter="url(#cardShadow)"/>
      <text x="0" y="149" font-family="'Impact', sans-serif" font-size="24" fill="#854d0e" letter-spacing="1" text-anchor="middle">
        TOTAL FOUND: $0.03
      </text>
    </g>
  `;
}
/**
 * 16. FIREHOSE WATER BLAST (Celebrity "Just Drinking Water")
 */
export function renderFirehoseWater(x, y, timeSec = 0) {
    const waterFlow = (timeSec * 60) % 40;
    return `
    <g id="cast-firehose-water" transform="translate(${x}, ${y}) scale(1.55)">
      <!-- Giant Red Fire Hydrant on Sidewalk -->
      <g transform="translate(-180, 70)">
        <rect x="-40" y="-105" width="80" height="150" rx="16" fill="#dc2626" stroke="#991b1b" stroke-width="7"/>
        <ellipse cx="0" cy="-105" rx="40" ry="20" fill="#ef4444" stroke="#991b1b" stroke-width="6"/>
        <circle cx="0" cy="-122" r="14" fill="#7f1d1d"/>
        <!-- Side Brass Nozzles -->
        <rect x="-65" y="-70" width="30" height="35" rx="5" fill="#eab308" stroke="#ca8a04" stroke-width="4"/>
        <rect x="35" y="-70" width="35" height="35" rx="5" fill="#eab308" stroke="#ca8a04" stroke-width="4"/>
      </g>

      <!-- High-Pressure Yellow Fire Hose -->
      <path d="M -145 18 Q -70 45 25 -10" fill="none" stroke="#facc15" stroke-width="32" stroke-linecap="round"/>
      <path d="M -145 18 Q -70 45 25 -10" fill="none" stroke="#ca8a04" stroke-width="7" stroke-dasharray="16 12"/>
      <!-- Brass Nozzle -->
      <polygon points="25,-30 70,-48 70,25 25,8" fill="#ca8a04" stroke="#854d0e" stroke-width="5"/>

      <!-- Torrential High-Velocity Blue Water Jet Stream -->
      <g filter="url(#glow)">
        <path d="M 70 -12 Q 160 -30 260 -12 Q 285 0 260 12 Q 160 30 70 12 Z" fill="#38bdf8" opacity="0.95"/>
        <path d="M 80 -6 L 250 -6" stroke="#ffffff" stroke-width="6" stroke-dasharray="24 18" stroke-dashoffset="${-waterFlow}"/>
        <path d="M 90 6 L 240 6" stroke="#bae6fd" stroke-width="5" stroke-dasharray="18 12" stroke-dashoffset="${waterFlow}"/>
        <!-- Water Splashes / Spray -->
        <circle cx="255" cy="-25" r="10" fill="#e0f2fe"/>
        <circle cx="275" cy="6" r="14" fill="#e0f2fe"/>
        <circle cx="250" cy="30" r="11" fill="#e0f2fe"/>
      </g>

      <!-- Celebrity Stickman Inhaling Water Jet with Swollen Cheeks -->
      <g transform="translate(290, 0)">
        <circle cx="0" cy="0" r="44" fill="#fddfb0" stroke="#111" stroke-width="6"/>
        <!-- Wide Pop Eyes -->
        <ellipse cx="-14" cy="-12" rx="11" ry="14" fill="#fff" stroke="#111" stroke-width="3.5"/>
        <ellipse cx="14" cy="-12" rx="11" ry="14" fill="#fff" stroke="#111" stroke-width="3.5"/>
        <circle cx="-14" cy="-12" r="5" fill="#0284c7"/>
        <circle cx="14" cy="-12" r="5" fill="#0284c7"/>
        <!-- Huge Open Gulping Mouth -->
        <ellipse cx="-18" cy="14" rx="20" ry="16" fill="#0369a1" stroke="#111" stroke-width="4"/>
        <line x1="0" y1="44" x2="0" y2="135" stroke="#111" stroke-width="7"/>
      </g>
    </g>
  `;
}
/**
 * 17. MCU SUPERHERO HAM (Supermarket Cellophane Shrink-Wrapped Ham)
 */
export function renderSupermarketHam(x, y, timeSec = 0) {
    const glare = (timeSec * 35) % 240;
    return `
    <g id="cast-supermarket-ham" transform="translate(${x}, ${y}) scale(1.75)">
      <!-- Supermarket Styrofoam Yellow Meat Tray -->
      <rect x="-190" y="-85" width="380" height="215" rx="22" fill="#fef08a" stroke="#eab308" stroke-width="6" filter="url(#cardShadow)"/>

      <!-- Giant Dark Red Glazed Holiday Ham -->
      <path d="M -155 12 C -155 -75 130 -60 165 24 C 130 95 -120 95 -155 12 Z" fill="#881337" stroke="#4c0519" stroke-width="7"/>
      <!-- Crosshatch Honey Glaze Cuts -->
      <path d="M -95 -24 L 50 60 M -45 -42 L 95 42 M 0 -48 L 130 24" stroke="#fda4af" stroke-width="5" stroke-linecap="round"/>
      <path d="M -95 36 L 50 -48 M -45 54 L 95 -30 M 0 60 L 130 -12" stroke="#fda4af" stroke-width="5" stroke-linecap="round"/>

      <!-- Crinkly Transparent Plastic Shrink Wrap Cling Film -->
      <path d="M -180 -75 L 180 -75 L 180 120 L -180 120 Z" fill="#ffffff" opacity="0.25"/>
      <!-- Plastic Reflection Glare Highlights -->
      <line x1="${-150 + glare}" y1="-65" x2="${-80 + glare}" y2="110" stroke="#ffffff" stroke-width="15" stroke-linecap="round" opacity="0.65"/>

      <!-- Supermarket Barcode & Price Tag Sticker -->
      <g transform="translate(75, -42) rotate(14)">
        <rect x="-65" y="-35" width="130" height="78" rx="6" fill="#ffffff" stroke="#111111" stroke-width="3.5" filter="url(#cardShadow)"/>
        <!-- Barcode Stripes -->
        <line x1="-52" y1="-22" x2="-52" y2="10" stroke="#111" stroke-width="3.5"/>
        <line x1="-44" y1="-22" x2="-44" y2="10" stroke="#111" stroke-width="2"/>
        <line x1="-34" y1="-22" x2="-34" y2="10" stroke="#111" stroke-width="5"/>
        <line x1="-22" y1="-22" x2="-22" y2="10" stroke="#111" stroke-width="2.5"/>
        <line x1="-14" y1="-22" x2="-14" y2="10" stroke="#111" stroke-width="4"/>
        <line x1="-2" y1="-22" x2="-2" y2="10" stroke="#111" stroke-width="2"/>
        <line x1="10" y1="-22" x2="10" y2="10" stroke="#111" stroke-width="4.5"/>
        <line x1="24" y1="-22" x2="24" y2="10" stroke="#111" stroke-width="2.5"/>

        <text x="0" y="30" font-family="'Impact', sans-serif" font-size="20" fill="#dc2626" text-anchor="middle">
          $14.99 / LB
        </text>
      </g>
    </g>
  `;
}
/**
 * 18. PUMPKIN CARVING SURGEON (Buccal Fat Scooping)
 */
export function renderPumpkinSurgeon(x, y, timeSec = 0) {
    const scoopAngle = -35 + Math.sin(timeSec * 6) * 22;
    return `
    <g id="cast-pumpkin-surgeon" transform="translate(${x}, ${y}) scale(1.65)">
      <!-- Giant Grinning Halloween Pumpkin Head -->
      <g transform="translate(-70, 20)">
        <circle cx="0" cy="0" r="115" fill="#ea580c" stroke="#9a3412" stroke-width="9" filter="url(#cardShadow)"/>
        <!-- Vertical pumpkin ridges -->
        <path d="M 0 -115 C -55 -75 -55 75 0 115" fill="none" stroke="#9a3412" stroke-width="6"/>
        <path d="M 0 -115 C 55 -75 55 75 0 115" fill="none" stroke="#9a3412" stroke-width="6"/>
        <!-- Green Pumpkin Stem -->
        <rect x="-15" y="-145" width="30" height="35" rx="8" fill="#15803d" stroke="#14532d" stroke-width="5"/>

        <!-- Carved Spooky Jack-o'-Lantern Eyes & Grin -->
        <polygon points="-50,-35 -25,-15 -60,-15" fill="#451a03"/>
        <polygon points="50,-35 25,-15 60,-15" fill="#451a03"/>
        <path d="M -40 50 Q 0 85 40 50 Z" fill="#451a03"/>

        <!-- Carved Buccal Fat Cheek Hollow (Scooped Out Hole) -->
        <ellipse cx="65" cy="20" rx="34" ry="46" fill="#451a03" stroke="#78350f" stroke-width="6"/>
        <text x="65" y="28" font-family="'Impact', sans-serif" font-size="15" fill="#fde047" text-anchor="middle">HOLLOW</text>
      </g>

      <!-- Surgeon Stick Figure with Green Scrubs & Ice Cream Scoop -->
      <g transform="translate(140, 20)">
        <!-- Green Surgical Cap -->
        <ellipse cx="0" cy="-70" rx="38" ry="24" fill="#0d9488" stroke="#115e59" stroke-width="5"/>
        <circle cx="0" cy="-52" r="32" fill="#fddfb0" stroke="#111" stroke-width="5"/>
        <!-- White Surgical Mask -->
        <rect x="-24" y="-52" width="48" height="30" rx="6" fill="#ffffff" stroke="#94a3b8" stroke-width="3"/>

        <!-- Green Surgical Scrubs Torso -->
        <polygon points="-30,-25 30,-25 35,80 -35,80" fill="#0d9488" stroke="#115e59" stroke-width="6"/>

        <!-- Arm holding Metal Ice Cream Scoop with Fat Blob -->
        <g transform="translate(-30, 0) rotate(${scoopAngle})">
          <line x1="0" y1="0" x2="-75" y2="12" stroke="#111" stroke-width="7"/>
          <!-- Metal Scoop -->
          <ellipse cx="-90" cy="14" rx="22" ry="16" fill="#94a3b8" stroke="#475569" stroke-width="4"/>
          <!-- Yellow Fat Ball inside scoop -->
          <circle cx="-90" cy="14" r="13" fill="#facc15" stroke="#ca8a04" stroke-width="3"/>
        </g>
      </g>

      <!-- Flying Yellow Fat Droplets -->
      <circle cx="10" cy="-25" r="9" fill="#facc15" stroke="#ca8a04" stroke-width="2.5"/>
      <circle cx="-15" cy="-50" r="7" fill="#facc15"/>
      <circle cx="35" cy="-75" r="8" fill="#facc15"/>
    </g>
  `;
}
/**
 * 19. VICTORIAN GOTHIC MOURNER (Mourning a 19th-Century Sea Captain)
 */
export function renderVictorianMourner(x, y, timeSec = 0) {
    const tearStream = (timeSec * 40) % 80;
    return `
    <g id="cast-victorian-mourner" transform="translate(${x}, ${y}) scale(1.65)">
      <!-- Weather-Beaten Gothic Tombstone -->
      <g transform="translate(-160, 40)">
        <path d="M -60 100 L -60 -50 C -60 -110 60 -110 60 -50 L 60 100 Z" fill="#64748b" stroke="#334155" stroke-width="7" filter="url(#cardShadow)"/>
        <!-- R.I.P. Inscription -->
        <text x="0" y="-40" font-family="'Times New Roman', serif" font-size="28" font-weight="bold" fill="#1e293b" text-anchor="middle">R.I.P.</text>
        <text x="0" y="-5" font-family="'Times New Roman', serif" font-size="16" font-style="italic" fill="#1e293b" text-anchor="middle">LOST SEA CAPTAIN</text>
        <text x="0" y="20" font-family="'Times New Roman', serif" font-size="14" fill="#1e293b" text-anchor="middle">1842 - 1888</text>
        <!-- Raven perched on tombstone -->
        <path d="M 30 -115 Q 50 -145 62 -115 Q 75 -100 55 -95 Z" fill="#09090b"/>
      </g>

      <!-- Victorian Mourning Dress & Lace Veil -->
      <g transform="translate(70, 20)">
        <!-- Massive Black Victorian Hooped Mourning Gown -->
        <path d="M -35 -25 L 35 -25 L 110 120 L -110 120 Z" fill="#09090b" stroke="#27272a" stroke-width="6"/>
        <line x1="-35" y1="25" x2="35" y2="25" stroke="#3f3f46" stroke-width="4"/>
        <line x1="-60" y1="70" x2="60" y2="70" stroke="#3f3f46" stroke-width="4"/>

        <!-- Gaunt Pale Head with Dark Black Lace Veil -->
        <circle cx="0" cy="-70" r="38" fill="#f8fafc" stroke="#09090b" stroke-width="5"/>
        <!-- Sunken Dark Hollow Cheeks -->
        <path d="M -26 -58 Q -18 -45 -24 -36" stroke="#94a3b8" stroke-width="4" fill="none"/>
        <path d="M 26 -58 Q 18 -45 24 -36" stroke="#94a3b8" stroke-width="4" fill="none"/>

        <!-- Weeping Waterfall Teardrops -->
        <line x1="-14" y1="-65" x2="-14" y2="${-25 + tearStream}" stroke="#38bdf8" stroke-width="5" stroke-dasharray="10 7"/>
        <line x1="14" y1="-65" x2="14" y2="${-25 + tearStream}" stroke="#38bdf8" stroke-width="5" stroke-dasharray="10 7"/>

        <!-- Sheer Black Mourning Lace Veil Drape -->
        <path d="M -48 -105 C -75 -45 -60 50 -48 95 C 0 110 48 110 48 95 C 60 50 75 -45 48 -105 Z" fill="#18181b" opacity="0.7"/>
      </g>
    </g>
  `;
}
/**
 * 20. WEDNESDAY ADDAMS DANCE (Gothic Brand with Thing)
 */
export function renderWednesdayDance(x, y, timeSec = 0) {
    const danceArm = Math.sin(timeSec * 10) * 28;
    const thingHop = Math.abs(Math.sin(timeSec * 8)) * 12;
    return `
    <g id="cast-wednesday-dance" transform="translate(${x}, ${y}) scale(1.65)">
      <!-- Stage Contact Shadow -->
      <ellipse cx="0" cy="180" rx="55" ry="14" fill="#000000" opacity="0.25"/>

      <!-- Legs & Gothic Platform Boots -->
      <line x1="-15" y1="95" x2="-18" y2="170" stroke="#111" stroke-width="7" stroke-linecap="round"/>
      <line x1="15" y1="95" x2="18" y2="170" stroke="#111" stroke-width="7" stroke-linecap="round"/>
      <rect x="-28" y="165" width="22" height="15" rx="3" fill="#18181b"/>
      <rect x="8" y="165" width="22" height="15" rx="3" fill="#18181b"/>

      <!-- Black Gothic Prom Dress with White Peter Pan Collar -->
      <path d="M -24 10 L 24 10 L 48 105 C 16 120 -16 120 -48 105 Z" fill="#09090b" stroke="#18181b" stroke-width="5"/>
      <path d="M -30 35 Q 0 54 30 35" stroke="#27272a" stroke-width="4" fill="none"/>
      <path d="M -38 70 Q 0 90 38 70" stroke="#27272a" stroke-width="4" fill="none"/>
      <!-- White Collar -->
      <polygon points="-16,10 16,10 0,26" fill="#ffffff"/>

      <!-- Wednesday Iconic Angled Dance Arms -->
      <!-- Sleeves -->
      <path d="M -24 20 L -65 ${0 + danceArm} L -45 ${-50 + danceArm}" fill="none" stroke="#111111" stroke-width="8" stroke-linecap="round"/>
      <path d="M 24 20 L 65 ${0 - danceArm} L 45 ${-50 - danceArm}" fill="none" stroke="#111111" stroke-width="8" stroke-linecap="round"/>
      <!-- Hands -->
      <circle cx="${-45}" cy="${-50 + danceArm}" r="7" fill="#fddfb0" stroke="#111" stroke-width="2"/>
      <circle cx="${45}" cy="${-50 - danceArm}" r="7" fill="#fddfb0" stroke="#111" stroke-width="2"/>


      <!-- Head & Iconic Braided Pigtails -->
      <g transform="translate(0, -35)">
        <!-- Braids sticking straight out -->
        <path d="M -38 -10 Q -75 -5 -85 35" fill="none" stroke="#09090b" stroke-width="13" stroke-linecap="round"/>
        <path d="M 38 -10 Q 75 -5 85 35" fill="none" stroke="#09090b" stroke-width="13" stroke-linecap="round"/>

        <!-- Face with Sharp Bangs & Dark Lipstick -->
        <circle cx="0" cy="0" r="38" fill="#f8fafc" stroke="#09090b" stroke-width="5"/>
        <path d="M -38 -18 Q 0 -4 38 -18 L 38 -38 L -38 -38 Z" fill="#09090b"/>

        <!-- Piercing Unblinking Deadpan Eyes -->
        <ellipse cx="-15" cy="2" rx="9" ry="8" fill="#18181b"/>
        <ellipse cx="15" cy="2" rx="9" ry="8" fill="#18181b"/>
        <circle cx="-15" cy="2" r="3.5" fill="#ffffff"/>
        <circle cx="15" cy="2" r="3.5" fill="#ffffff"/>
        <!-- Black Lipstick -->
        <ellipse cx="0" cy="22" rx="10" ry="5" fill="#09090b"/>
      </g>

      <!-- Thing (The Crawling Severed Hand on the Floor) -->
      <g transform="translate(105, ${165 - thingHop})">
        <ellipse cx="6" cy="12" rx="18" ry="5" fill="#000000" opacity="0.3"/>
        <path d="M 0 0 C -12 -20 -6 -40 6 -34 C 14 -26 20 -14 26 0 Z" fill="#fddfb0" stroke="#111" stroke-width="4"/>
        <line x1="2" y1="-20" x2="-10" y2="-16" stroke="#dc2626" stroke-width="3"/> <!-- Stitch -->
      </g>
    </g>
  `;
}
/**
 * 21. 1963 ZAPRUDER FILM PROJECTOR (Forensic Frame-by-Frame)
 */
export function renderZapruderProjector(x, y, timeSec = 0) {
    const reelSpin = (timeSec * 360) % 360;
    return `
    <g id="cast-zapruder-projector" transform="translate(${x}, ${y}) scale(1.55)">
      <!-- Projector Main Housing Body -->
      <rect x="-130" y="-55" width="260" height="175" rx="16" fill="#334155" stroke="#0f172a" stroke-width="8" filter="url(#cardShadow)"/>

      <!-- Spinning Supply & Take-up Film Reels -->
      <g transform="translate(-80, -100) rotate(${reelSpin})">
        <circle cx="0" cy="0" r="58" fill="none" stroke="#94a3b8" stroke-width="7"/>
        <circle cx="0" cy="0" r="16" fill="#475569" stroke="#0f172a" stroke-width="4"/>
        <line x1="-58" y1="0" x2="58" y2="0" stroke="#94a3b8" stroke-width="4.5"/>
        <line x1="0" y1="-58" x2="0" y2="58" stroke="#94a3b8" stroke-width="4.5"/>
      </g>
      <g transform="translate(80, -100) rotate(${reelSpin * 1.2})">
        <circle cx="0" cy="0" r="58" fill="none" stroke="#94a3b8" stroke-width="7"/>
        <circle cx="0" cy="0" r="16" fill="#475569" stroke="#0f172a" stroke-width="4"/>
        <line x1="-58" y1="0" x2="58" y2="0" stroke="#94a3b8" stroke-width="4.5"/>
        <line x1="0" y1="-58" x2="0" y2="58" stroke="#94a3b8" stroke-width="4.5"/>
      </g>

      <!-- Lens Barrel Emitting Flickering Light Beam -->
      <g transform="translate(130, 0)">
        <rect x="0" y="-30" width="55" height="60" rx="8" fill="#1e293b" stroke="#0f172a" stroke-width="5"/>
        <!-- Glowing Light Beam Triangle -->
        <polygon points="55,-18 360,-110 360,110 55,18" fill="#fef08a" opacity="0.38" filter="url(#glow)"/>
      </g>

      <!-- Film Strip Threading Path -->
      <path d="M -80 -45 L -35 25 L 35 25 L 80 -45" fill="none" stroke="#ca8a04" stroke-width="7" stroke-dasharray="7 4"/>

      <!-- Stamped Plate: ZAPRUDER 8MM -->
      <rect x="-85" y="55" width="170" height="38" rx="6" fill="#0f172a"/>
      <text x="0" y="80" font-family="'Courier New', monospace" font-size="16" font-weight="bold" fill="#38bdf8" text-anchor="middle">
        ZAPRUDER 8MM
      </text>
    </g>
  `;
}
/**
 * 22. FROZEN FOREHEAD DIVORCE (Zero Wrinkle Melodrama)
 */
export function renderFrozenForeheadDivorce(x, y, timeSec = 0) {
    const sob = Math.sin(timeSec * 12) * 6;
    return `
    <g id="cast-frozen-forehead" transform="translate(${x}, ${y}) scale(1.65)">
      <!-- Cinema Screen Frame with Red Velvet Draped Curtains -->
      <rect x="-240" y="-150" width="480" height="310" rx="20" fill="#0f172a" stroke="#ef4444" stroke-width="8" filter="url(#cardShadow)"/>
      <!-- Curtains -->
      <path d="M -240 -150 Q -190 0 -240 160 L -200 160 Q -160 0 -200 -150 Z" fill="#991b1b"/>
      <path d="M 240 -150 Q 190 0 240 160 L 200 160 Q 160 0 200 -150 Z" fill="#991b1b"/>

      <text x="0" y="-115" font-family="'Impact', sans-serif" font-size="22" fill="#f43f5e" letter-spacing="2" text-anchor="middle">
        SCENE 42: THE TRAGIC DIVORCE
      </text>

      <!-- BRAD (Bewildered Co-Star on Left) -->
      <g transform="translate(-110, 30)">
        <circle cx="0" cy="-35" r="28" fill="#fddfb0" stroke="#111" stroke-width="4"/>
        <!-- Swept Hair -->
        <path d="M -28 -45 Q 0 -65 28 -40" fill="#78350f"/>
        <!-- Bewildered Expression -->
        <ellipse cx="-8" cy="-35" rx="4" ry="4" fill="#111"/>
        <ellipse cx="8" cy="-35" rx="4" ry="4" fill="#111"/>
        <line x1="-12" y1="-45" x2="-2" y2="-48" stroke="#111" stroke-width="3"/>
        <line x1="2" y1="-48" x2="12" y2="-45" stroke="#111" stroke-width="3"/>
        <line x1="-8" y1="-20" x2="8" y2="-20" stroke="#111" stroke-width="3" stroke-linecap="round"/>
        <!-- Tuxedo Body -->
        <polygon points="-22,-5 22,-5 15,80 -15,80" fill="#18181b"/>
        <polygon points="-10,-5 10,-5 0,25" fill="#ffffff"/>
      </g>

      <!-- ACTRESS (Melodrama Weeping Star on Right) -->
      <g transform="translate(60, ${20 + sob})">
        <!-- Glamour Dress -->
        <polygon points="-30,30 30,30 50,100 -50,100" fill="#db2777" stroke="#9d174d" stroke-width="4"/>

        <!-- Hair Volume -->
        <circle cx="0" cy="-35" r="42" fill="#d97706"/>

        <!-- Face Base -->
        <circle cx="0" cy="-30" r="34" fill="#fddfb0" stroke="#111" stroke-width="5"/>

        <!-- FROZEN FOREHEAD: Drawn as a solid concrete brick slab -->
        <g transform="translate(0, -52)">
          <rect x="-35" y="-14" width="70" height="26" rx="4" fill="#94a3b8" stroke="#475569" stroke-width="3"/>
          <text x="0" y="3" font-family="'Courier New', monospace" font-size="10" font-weight="bold" fill="#0f172a" text-anchor="middle">
            0 WRINKLES
          </text>
        </g>

        <!-- Waterfalls of Tears Gushing from Eyes -->
        <ellipse cx="-12" cy="-32" rx="6" ry="7" fill="#111"/>
        <ellipse cx="12" cy="-32" rx="6" ry="7" fill="#111"/>
        <path d="M -12 -24 L -22 60 L -4 60 Z" fill="#38bdf8" opacity="0.95" filter="url(#glow)"/>
        <path d="M 12 -24 L 4 60 L 22 60 Z" fill="#38bdf8" opacity="0.95" filter="url(#glow)"/>

        <!-- Screaming Red Lipstick Tragedy Open Mouth -->
        <path d="M -18 -8 Q 0 20 18 -8 Z" fill="#991b1b" stroke="#111" stroke-width="3.5"/>
      </g>

      <!-- Subtitle: "I AM DEVASTATED, BRAD." -->
      <rect x="-170" y="115" width="340" height="36" rx="8" fill="#000000" opacity="0.88"/>
      <text x="0" y="140" font-family="sans-serif" font-size="17" font-weight="bold" fill="#ffffff" text-anchor="middle">
        "I AM DEVASTATED, BRAD."
      </text>
    </g>
  `;
}
/**
 * 23. GOLD WHEELBARROW CHECKOUT ($1,200/mo Big Pharma Cart)
 */
export function renderGoldWheelbarrow(x, y, timeSec = 0) {
    return `
    <g id="cast-gold-wheelbarrow" transform="translate(${x}, ${y}) scale(1.65)">
      <!-- Supermarket Checkout Conveyor & Scanner -->
      <g transform="translate(-160, 40)">
        <rect x="-80" y="0" width="160" height="70" rx="8" fill="#475569" stroke="#1e293b" stroke-width="5"/>
        <rect x="-70" y="10" width="140" height="20" rx="4" fill="#0f172a"/>
        <!-- Scanner Laser Beam -->
        <line x1="-60" y1="20" x2="60" y2="20" stroke="#22c55e" stroke-width="4" filter="url(#glow)"/>
        <!-- Register Display: $1,200.00 -->
        <rect x="-50" y="-45" width="100" height="35" rx="6" fill="#0f172a" stroke="#334155" stroke-width="3"/>
        <text x="0" y="-22" font-family="'Courier New', monospace" font-size="15" font-weight="bold" fill="#22c55e" text-anchor="middle">
          $1,200.00
        </text>
      </g>

      <!-- CELEBRITY PUSHING WHEELBARROW (On Left) -->
      <g transform="translate(-100, -10)">
        <!-- Head with Designer Sunglasses -->
        <circle cx="0" cy="-60" r="28" fill="#fddfb0" stroke="#111" stroke-width="4"/>
        <!-- Designer Sunglasses -->
        <rect x="-18" y="-66" width="16" height="12" rx="3" fill="#111"/>
        <rect x="2" y="-66" width="16" height="12" rx="3" fill="#111"/>
        <line x1="-2" y1="-60" x2="2" y2="-60" stroke="#111" stroke-width="3"/>

        <!-- Body & Designer Coat -->
        <polygon points="-18,-30 18,-30 24,60 -24,60" fill="#ca8a04" stroke="#854d0e" stroke-width="4"/>
        <!-- Arms gripping wheelbarrow handle -->
        <path d="M 12 -20 L 50 -10 L 80 -15" fill="none" stroke="#111" stroke-width="6" stroke-linecap="round"/>
        <!-- Legs & Designer Boots -->
        <line x1="-10" y1="60" x2="-14" y2="120" stroke="#111" stroke-width="6" stroke-linecap="round"/>
        <line x1="10" y1="60" x2="14" y2="120" stroke="#111" stroke-width="6" stroke-linecap="round"/>
      </g>

      <!-- Solid Gold Wheelbarrow Body -->
      <polygon points="-40,-25 140,-25 110,65 0,65" fill="#facc15" stroke="#ca8a04" stroke-width="8" filter="url(#cardShadow)"/>
      <!-- Gold Wheelbarrow Leg & Wheel -->
      <line x1="20" y1="65" x2="10" y2="110" stroke="#ca8a04" stroke-width="10" stroke-linecap="round"/>
      <circle cx="135" cy="110" r="32" fill="#78350f" stroke="#ca8a04" stroke-width="7"/>

      <!-- Mountain of Glowing Blue Ozempic Boxes Piled High -->
      <g transform="translate(45, -45)">
        <rect x="-45" y="-30" width="75" height="26" rx="4" fill="#0284c7" stroke="#0369a1" stroke-width="3" transform="rotate(-15)"/>
        <rect x="0" y="-45" width="75" height="26" rx="4" fill="#0284c7" stroke="#0369a1" stroke-width="3" transform="rotate(20)"/>
        <rect x="-20" y="-65" width="75" height="26" rx="4" fill="#0284c7" stroke="#0369a1" stroke-width="3" transform="rotate(-5)"/>
        <text x="14" y="-46" font-family="'Impact', sans-serif" font-size="12" fill="#fff">GLP-1</text>
      </g>

      <!-- 20-Foot Rolling Paper Receipt -->
      <g transform="translate(170, -10)">
        <path d="M 0 0 C 45 25 70 85 45 130 C 20 165 90 195 65 230" fill="none" stroke="#ffffff" stroke-width="34" filter="url(#cardShadow)"/>
        <path d="M 0 0 C 45 25 70 85 45 130 C 20 165 90 195 65 230" fill="none" stroke="#cbd5e1" stroke-width="34" stroke-dasharray="10 6"/>
        <text x="38" y="65" font-family="'Impact', sans-serif" font-size="17" fill="#dc2626">$1,200/MO</text>
      </g>
    </g>
  `;
}
/**
 * 24. TUXEDO CONCIERGE BUTLER (Serving Diamond Syringe on Silver Platter)
 */
export function renderTuxedoButler(x, y, timeSec = 0) {
    const platterLift = Math.sin(timeSec * 4) * 10;
    return `
    <g id="cast-tuxedo-butler" transform="translate(${x}, ${y}) scale(1.65)">
      <!-- Stage Floor Contact Shadow -->
      <ellipse cx="0" cy="165" rx="70" ry="16" fill="#000000" opacity="0.22"/>

      <!-- Legs in Formal Dress Trousers -->
      <line x1="-16" y1="100" x2="-18" y2="160" stroke="#18181b" stroke-width="8" stroke-linecap="round"/>
      <line x1="16" y1="100" x2="18" y2="160" stroke="#18181b" stroke-width="8" stroke-linecap="round"/>
      <polygon points="-28,160 -8,160 -18,150" fill="#09090b"/>
      <polygon points="8,160 28,160 18,150" fill="#09090b"/>

      <!-- Butler Tuxedo Torso & Coattails -->
      <polygon points="-38,-25 38,-25 28,110 -28,110" fill="#09090b" stroke="#18181b" stroke-width="6"/>
      <polygon points="-28,110 -15,145 0,110" fill="#09090b"/>
      <polygon points="28,110 15,145 0,110" fill="#09090b"/>

      <!-- White Shirt V & Red Bowtie -->
      <polygon points="-20,-25 20,-25 0,38" fill="#ffffff"/>
      <polygon points="-14,-18 14,-18 0,-10" fill="#dc2626"/>
      <circle cx="0" cy="-14" r="3.5" fill="#991b1b"/>

      <!-- Butler Head with Monocle & Sleek Mustache -->
      <g transform="translate(0, -65)">
        <circle cx="0" cy="0" r="34" fill="#fddfb0" stroke="#111" stroke-width="5"/>
        <path d="M -34 -12 Q 0 -40 34 -12" fill="#451a03"/>
        <!-- Golden Monocle with Chain -->
        <circle cx="11" cy="-2" r="11" fill="none" stroke="#eab308" stroke-width="3.5"/>
        <path d="M 22 0 Q 34 22 22 45" fill="none" stroke="#eab308" stroke-width="2"/>
        <!-- Pompous Mustache -->
        <path d="M -16 15 Q 0 11 16 15 Q 0 20 -16 15 Z" fill="#451a03"/>
      </g>

      <!-- Arms with White Cuffs & Gloves Holding Platter -->
      <path d="M -38 -15 L -65 20 L -25 ${35 + platterLift}" fill="none" stroke="#18181b" stroke-width="8" stroke-linecap="round"/>
      <path d="M 38 -15 L 65 20 L 25 ${35 + platterLift}" fill="none" stroke="#18181b" stroke-width="8" stroke-linecap="round"/>

      <!-- Gleaming Silver Cloche Platter -->
      <g transform="translate(0, ${30 + platterLift})">
        <!-- Silver Tray Base -->
        <ellipse cx="0" cy="24" rx="100" ry="18" fill="#e2e8f0" stroke="#94a3b8" stroke-width="5" filter="url(#cardShadow)"/>
        
        <!-- Lifted Domed Cloche Cover -->
        <path d="M -75 -10 C -75 -75 75 -75 75 -10 Z" fill="#cbd5e1" stroke="#64748b" stroke-width="5"/>
        <circle cx="0" cy="-80" r="10" fill="#94a3b8" stroke="#475569" stroke-width="3.5"/>

        <!-- Diamond-Studded Gold Syringe on Display -->
        <g transform="translate(-32, 12) rotate(-10)" filter="url(#glow)">
          <rect x="0" y="-9" width="64" height="18" rx="4" fill="#fef08a" stroke="#ca8a04" stroke-width="2.5"/>
          <line x1="64" y1="0" x2="88" y2="0" stroke="#94a3b8" stroke-width="5"/>
          <circle cx="32" cy="0" r="4.5" fill="#38bdf8"/>
        </g>
      </g>
    </g>
  `;
}

// src/character/CartoonCast.ts
function getBob(timeSec = 0, speed = 4, amp = 6) {
  return Math.sin(timeSec * speed) * amp;
}
function renderJennaOrtega(opts) {
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
        ${expression === "deadpan" ? `<path d="M -10 22 Q 0 20 10 22" fill="none" stroke="#881337" stroke-width="4" stroke-linecap="round"/>` : `<path d="M -10 20 Q 0 28 10 20 Z" fill="#881337" stroke="#4c0519" stroke-width="2"/>`}

        <!-- Front Iconic Shaggy Bangs & Parting -->
        <path d="M -40 -25 C -30 -50 30 -50 40 -25 C 25 -38 -25 -38 -40 -25 Z" fill="#09090b"/>
        <path d="M -30 -30 Q -15 2 -22 15 Q -10 -15 0 -25 Q 10 -15 22 15 Q 15 2 30 -30 Z" fill="#09090b"/>
      </g>
    </g>
  `;
}
function renderEmmaStone(opts) {
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
function renderArianaGrande(opts) {
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
function renderKateMoss(opts) {
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
function renderTechBro(opts) {
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
  } else {
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
function renderPaparazzi(x, y, isFlashing = false) {
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
function renderCouchGuy(opts) {
  const { x, y, scale = 1.35, isDucking = false, timeSec = 0 } = opts;
  const shake = isDucking ? Math.sin(timeSec * 30) * 4 : 0;
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
function renderPixarMom(opts) {
  const { x, y, scale = 1, rotation = 0, timeSec = 0, showOrbit = true } = opts;
  const bob = getBob(timeSec, 3, 4);
  const jiggle = Math.sin(timeSec * 8) * 6;
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
function renderEvictedOrgans(x, y, timeSec = 0) {
  const walkBob = Math.sin(timeSec * 8) * 12;
  const leg1 = Math.sin(timeSec * 8) * 35;
  const leg2 = -leg1;
  const tearStream = timeSec * 30 % 40;
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
function renderFlyingCarbs(x, y, timeSec = 0) {
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
function renderBossShadow(x, y, timeSec = 0) {
  const steamY = timeSec * 40 % 60;
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

// src/anim/Easing.ts
var clamp01 = (u) => u < 0 ? 0 : u > 1 ? 1 : u;
var linear = (u) => clamp01(u);
var quadIn = (u) => {
  const x = clamp01(u);
  return x * x;
};
var quadOut = (u) => {
  const x = clamp01(u);
  return 1 - (1 - x) * (1 - x);
};
var quadInOut = (u) => {
  const x = clamp01(u);
  return x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2;
};
var cubicIn = (u) => {
  const x = clamp01(u);
  return x * x * x;
};
var cubicOut = (u) => {
  const x = clamp01(u);
  return 1 - Math.pow(1 - x, 3);
};
var cubicInOut = (u) => {
  const x = clamp01(u);
  return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
};
var quartOut = (u) => {
  const x = clamp01(u);
  return 1 - Math.pow(1 - x, 4);
};
var quintOut = (u) => {
  const x = clamp01(u);
  return 1 - Math.pow(1 - x, 5);
};
var sineInOut = (u) => {
  const x = clamp01(u);
  return -(Math.cos(Math.PI * x) - 1) / 2;
};
var expoOut = (u) => {
  const x = clamp01(u);
  return x >= 1 ? 1 : 1 - Math.pow(2, -10 * x);
};
var expoIn = (u) => {
  const x = clamp01(u);
  return x <= 0 ? 0 : Math.pow(2, 10 * x - 10);
};
var BACK_C1 = 1.70158;
var BACK_C2 = BACK_C1 * 1.525;
var BACK_C3 = BACK_C1 + 1;
var backOut = (u) => {
  const x = clamp01(u) - 1;
  return 1 + BACK_C3 * x * x * x + BACK_C1 * x * x;
};
var backIn = (u) => {
  const x = clamp01(u);
  return BACK_C2 * x * x * x - BACK_C1 * x * x;
};
var backInOut = (u) => {
  const x = clamp01(u) * 2;
  return x < 1 ? x * x * ((BACK_C1 + 1) * x - BACK_C1) * 0.5 : ((x - 2) * (x - 2) * ((BACK_C1 + 1) * (x - 2) + BACK_C1) + 2) * 0.5;
};
var elasticOut = (u) => {
  const x = clamp01(u);
  if (x <= 0) return 0;
  if (x >= 1) return 1;
  const period = 0.3;
  const s = period / 4;
  return Math.pow(2, -10 * x) * Math.sin((x - s) * (2 * Math.PI) / period) + 1;
};
var anticipate = (u) => {
  const x = clamp01(u);
  const dip = 0.22;
  if (x < dip) return -(x / dip) * 0.12 * (1 - x / dip);
  return cubicOut((x - dip) / (1 - dip));
};
var EASINGS = Object.freeze({
  linear,
  quadIn,
  quadOut,
  quadInOut,
  cubicIn,
  cubicOut,
  cubicInOut,
  quartOut,
  quintOut,
  sineInOut,
  expoIn,
  expoOut,
  backIn,
  backOut,
  backInOut,
  elasticOut,
  anticipate
});

// src/anim/ObjectMotion.ts
function popInSquash(t, duration = 0.25, basePos = { x: 0, y: 0 }) {
  if (t <= 0) {
    return { x: basePos.x, y: basePos.y, scaleX: 0, scaleY: 0, rotation: 0, opacity: 0 };
  }
  if (t >= duration) {
    return { x: basePos.x, y: basePos.y, scaleX: 1, scaleY: 1, rotation: 0, opacity: 1 };
  }
  const progress = t / duration;
  const k = backOut(progress);
  const scale = Math.max(0, k);
  const squashFactor = 1 + (scale - 1) * 0.5;
  const stretchFactor = 1 / Math.max(0.01, squashFactor);
  return {
    x: basePos.x,
    y: basePos.y,
    scaleX: scale * squashFactor,
    scaleY: scale * stretchFactor,
    rotation: (1 - progress) * -8,
    // subtle settling rotation
    opacity: Math.min(1, progress * 3)
  };
}
function slamDrop(t, dropDuration = 0.16, basePos = { x: 0, y: 0 }, startYOffset = 400) {
  if (t <= 0) {
    return {
      x: basePos.x,
      y: basePos.y - startYOffset,
      scaleX: 0.9,
      scaleY: 1.2,
      rotation: 0,
      opacity: 0,
      impactOccurred: false,
      screenShake: 0
    };
  }
  if (t < dropDuration) {
    const k = Math.pow(t / dropDuration, 2);
    return {
      x: basePos.x,
      y: basePos.y - startYOffset * (1 - k),
      scaleX: 0.95,
      scaleY: 1.15,
      // stretched during fall
      rotation: 0,
      opacity: 1,
      impactOccurred: false,
      screenShake: 0
    };
  }
  const settleT = t - dropDuration;
  const settleDuration = 0.22;
  const settleK = Math.min(1, settleT / settleDuration);
  const shakeAmp = Math.max(0, 1 - settleK) * 12;
  const shake = Math.sin(settleT * 50) * shakeAmp;
  const squashK = Math.sin(settleK * Math.PI) * Math.max(0, 1 - settleK);
  const scaleX = 1 + squashK * 0.35;
  const scaleY = 1 - squashK * 0.25;
  return {
    x: basePos.x,
    y: basePos.y,
    scaleX,
    scaleY,
    rotation: 0,
    opacity: 1,
    impactOccurred: true,
    screenShake: Math.abs(shake),
    shakeOffset: { x: (Math.random() - 0.5) * shakeAmp, y: shake }
  };
}
function floatingHover(timeSec, freq = 2, amplitude = 6) {
  const dy = Math.sin(timeSec * freq) * amplitude;
  const drot = Math.cos(timeSec * freq * 0.7) * 1.5;
  return { dy, drot };
}
function particleBurst(t, count = 8, duration = 0.5, maxRadius = 160) {
  if (t <= 0 || t >= duration) return [];
  const p = t / duration;
  const out = [];
  for (let i = 0; i < count; i++) {
    const angle = i / count * 2 * Math.PI + i * 0.5;
    const speed = 0.7 + i % 3 * 0.2;
    const r = p * maxRadius * speed;
    out.push({
      x: Math.cos(angle) * r,
      y: Math.sin(angle) * r,
      radius: Math.max(1, (1 - p) * (10 + i % 4 * 4)),
      opacity: 1 - p
    });
  }
  return out;
}

// src/anim/ComicMarkups.ts
function renderHandDrawnArrow(from, to, timeSec, label) {
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  const angle = Math.atan2(dy, dx);
  const wobble1 = Math.sin(timeSec * 16) * 3;
  const wobble2 = Math.cos(timeSec * 14) * 3;
  const midX = from.x + dx * 0.5 + Math.sin(angle + Math.PI / 2) * (15 + wobble1);
  const midY = from.y + dy * 0.5 + Math.cos(angle + Math.PI / 2) * (15 + wobble2);
  const headLen = 28;
  const headAngle = 0.45;
  const h1x = to.x - Math.cos(angle - headAngle) * headLen;
  const h1y = to.y - Math.sin(angle - headAngle) * headLen;
  const h2x = to.x - Math.cos(angle + headAngle) * headLen;
  const h2y = to.y - Math.sin(angle + headAngle) * headLen;
  return `
    <g class="comic-arrow" stroke="#ef4444" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" fill="none" opacity="0.95">
      <!-- Curved sketchy arrow shaft -->
      <path d="M ${from.x} ${from.y} Q ${midX} ${midY} ${to.x} ${to.y}" />
      <!-- Sketchy arrowhead -->
      <path d="M ${h1x} ${h1y} L ${to.x} ${to.y} L ${h2x} ${h2y}" />
      ${label ? `
        <text x="${midX}" y="${midY - 18}" font-family="'Patrick Hand', 'Comic Sans MS', cursive, sans-serif" font-size="24" font-weight="bold" fill="#dc2626" stroke="none" text-anchor="middle">
          ${label}
        </text>
      ` : ""}
    </g>
  `;
}
function renderHandDrawnCircle(center, rx, ry, timeSec, label) {
  const wobble = Math.sin(timeSec * 18) * 2.5;
  const rxW = rx + wobble;
  const ryW = ry - wobble;
  const p1 = `M ${center.x - rxW} ${center.y} C ${center.x - rxW} ${center.y - ryW * 1.1}, ${center.x + rxW * 1.05} ${center.y - ryW * 0.95}, ${center.x + rxW} ${center.y}`;
  const p2 = `C ${center.x + rxW * 0.95} ${center.y + ryW * 1.05}, ${center.x - rxW * 1.1} ${center.y + ryW * 0.95}, ${center.x - rxW + 6} ${center.y - 8}`;
  return `
    <g class="comic-circle" opacity="0.95">
      <path d="${p1} ${p2}" fill="none" stroke="#ef4444" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round" />
      ${label ? `
        <text x="${center.x}" y="${center.y - ry - 14}" font-family="'Patrick Hand', 'Comic Sans MS', cursive, sans-serif" font-size="22" font-weight="bold" fill="#dc2626" text-anchor="middle">
          ${label}
        </text>
      ` : ""}
    </g>
  `;
}
function renderActionLines(center, radius, timeSec) {
  const lines = [];
  const numLines = 14;
  const pulse = Math.sin(timeSec * 22) * 15;
  for (let i = 0; i < numLines; i++) {
    const ang = i / numLines * Math.PI * 2;
    const r1 = radius + 30 + (i % 2 === 0 ? 20 : 0) + pulse;
    const r2 = r1 + 60 + (i % 3 === 0 ? 30 : 0);
    const x1 = center.x + Math.cos(ang) * r1;
    const y1 = center.y + Math.sin(ang) * r1;
    const x2 = center.x + Math.cos(ang) * r2;
    const y2 = center.y + Math.sin(ang) * r2;
    lines.push(`<line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" stroke="#0f172a" stroke-width="${3 + i % 3}" stroke-linecap="round" opacity="0.65"/>`);
  }
  return `<g class="action-lines">${lines.join("\n")}</g>`;
}

// src/scenes/Scene01_Ecosystem.ts
var Scene01_Ecosystem = {
  id: "scene_01_ecosystem",
  name: "Hollywood Red Carpet & Instagram Ecosystem",
  startTime: 0,
  endTime: 8.62,
  render(ctx) {
    const { sceneTime, camera } = ctx;
    const hasClapper = sceneTime >= 1;
    const hasPhone = sceneTime >= 2;
    const hasBillboard = sceneTime >= 4.8;
    const isReaction = sceneTime >= 7.5;
    let hostX = 360;
    let hostY = 650;
    let hostLean = 0;
    let hostExpr = "deadpan_classic";
    let isWalking = false;
    let pointTarget = void 0;
    let shakeAmt = 0;
    let overlays = "";
    const flashL = Math.sin(sceneTime * 18) > 0.3;
    const flashR = Math.cos(sceneTime * 22) > 0.3;
    let bg = `
      <!-- Infinite full-bleed backdrop -->
      <rect x="-4000" y="-4000" width="10000" height="10000" fill="#f8fafc"/>
      <line x1="-4000" y1="840" x2="6000" y2="840" stroke="#e2e8f0" stroke-width="4"/>

      <!-- Hollywood Hills Backdrop -->
      <path d="M -1000 540 Q 400 360 1000 500 T 2600 400 L 2600 840 L -1000 840 Z" fill="#e2e8f0"/>

      <!-- Red Carpet Runway & Gold Stanchions -->
      <polygon points="300,840 960,520 1620,840" fill="#dc2626"/>
      <line x1="300" y1="840" x2="960" y2="520" stroke="#b91c1c" stroke-width="6"/>
      <line x1="1620" y1="840" x2="960" y2="520" stroke="#b91c1c" stroke-width="6"/>

      <!-- Gold Stanchions -->
      <line x1="260" y1="670" x2="520" y2="630" stroke="#991b1b" stroke-width="8"/>
      <line x1="1660" y1="630" x2="1400" y2="670" stroke="#991b1b" stroke-width="8"/>
      <circle cx="260" cy="560" r="18" fill="#eab308" stroke="#ca8a04" stroke-width="4"/>
      <line x1="260" y1="560" x2="260" y2="840" stroke="#eab308" stroke-width="8"/>
      <circle cx="1660" cy="560" r="18" fill="#eab308" stroke="#ca8a04" stroke-width="4"/>
      <line x1="1660" y1="560" x2="1660" y2="840" stroke="#eab308" stroke-width="8"/>

      <!-- Paparazzi flashing in background -->
      <g transform="translate(140, 640) scale(1.15)">
        ${renderPaparazzi(0, 0, flashL)}
      </g>
      <g transform="translate(1780, 640) scale(1.15)">
        ${renderPaparazzi(0, 0, flashR)}
      </g>
    `;
    if (hasClapper) {
      const clapPop = popInSquash(sceneTime - 1, 0.32, { x: 1040, y: 440 });
      bg += `
        <g transform="translate(${clapPop.x}, ${clapPop.y}) scale(${clapPop.scaleX * 1.3}, ${clapPop.scaleY * 1.3})" opacity="${clapPop.opacity}" filter="url(#cardShadow)">
          <rect x="-90" y="-60" width="180" height="130" rx="10" fill="#0f172a" stroke="#ffffff" stroke-width="4"/>
          <!-- Diagonal zebra stripes -->
          <polygon points="-90,-60 -50,-60 -70,-35 -90,-35" fill="#ffffff"/>
          <polygon points="-30,-60 10,-60 -10,-35 -50,-35" fill="#ffffff"/>
          <polygon points="30,-60 70,-60 50,-35 10,-35" fill="#ffffff"/>
          <text x="0" y="0" font-family="'Impact', sans-serif" font-size="18" fill="#facc15" text-anchor="middle">HOLLYWOOD</text>
          <text x="0" y="25" font-family="'Courier New', monospace" font-size="13" font-weight="bold" fill="#ffffff" text-anchor="middle">SCENE 1: REDUX</text>
        </g>
      `;
    }
    if (hasPhone) {
      const phonePop = popInSquash(sceneTime - 2, 0.35, { x: 1420, y: 450 });
      const hover = floatingHover(sceneTime, 2.5, 3);
      bg += `
        <g transform="translate(${phonePop.x}, ${phonePop.y + hover.dy}) scale(${phonePop.scaleX * 1.15}, ${phonePop.scaleY * 1.15})" opacity="${phonePop.opacity}" filter="url(#cardShadow)">
          <rect x="-160" y="-270" width="320" height="540" rx="34" fill="#0f172a" stroke="#334155" stroke-width="6"/>
          <rect x="-145" y="-235" width="290" height="470" rx="18" fill="#ffffff"/>
          <g transform="translate(-120, -200)">
            <circle cx="16" cy="16" r="16" fill="#ec4899"/>
            <text x="40" y="22" font-family="sans-serif" font-size="14" font-weight="bold" fill="#0f172a">@celeb_life</text>
          </g>
          <!-- Celery Stick Feast -->
          <rect x="-120" y="-150" width="240" height="190" rx="8" fill="#f0fdf4" stroke="#dcfce7" stroke-width="2"/>
          <line x1="-70" y1="25" x2="70" y2="-25" stroke="#16a34a" stroke-width="14" stroke-linecap="round"/>
          <text x="0" y="18" font-family="'Impact', sans-serif" font-size="14" fill="#15803d" text-anchor="middle">DINNER: 1 CELERY</text>
          <g transform="translate(-110, 80)">
            <path d="M 0 0 C -6 -10 -18 0 0 16 C 18 0 6 -10 0 0 Z" fill="#ef4444"/>
            <text x="25" y="12" font-family="sans-serif" font-size="16" font-weight="bold" fill="#0f172a">2.4M likes</text>
          </g>
        </g>
      `;
      if (sceneTime < 4.8) {
        overlays += renderHandDrawnCircle({ x: 1420, y: 390 }, 130, 95, sceneTime, "FEASTING");
        overlays += renderHandDrawnArrow({ x: 600, y: 520 }, { x: 1250, y: 420 }, sceneTime);
      }
    }
    if (hasBillboard) {
      const slam = slamDrop(sceneTime - 4.8, 0.22, { x: 1240, y: 240 }, 360);
      if (slam.impactOccurred && sceneTime < 5.3) {
        shakeAmt = slam.screenShake;
      }
      bg += `
        <g transform="translate(${slam.x}, ${slam.y}) scale(${slam.scaleX * 1.05}, ${slam.scaleY * 1.05})" opacity="${slam.opacity}" filter="url(#cardShadow)">
          <line x1="-240" y1="-260" x2="-240" y2="-60" stroke="#475569" stroke-width="7" stroke-dasharray="14 8"/>
          <line x1="240" y1="-260" x2="240" y2="-60" stroke="#475569" stroke-width="7" stroke-dasharray="14 8"/>
          <rect x="-290" y="-60" width="580" height="130" rx="16" fill="#0f172a" stroke="#ef4444" stroke-width="7"/>
          <text x="0" y="-10" font-family="'Impact', sans-serif" font-size="38" fill="#ffffff" letter-spacing="3" text-anchor="middle">
            HOLLYWOOD ECOSYSTEM
          </text>
          <text x="0" y="38" font-family="'Courier New', monospace" font-size="20" font-weight="bold" fill="#facc15" text-anchor="middle">
            [ DOWNSIZED TO ZERO CALORIES ]
          </text>
        </g>
      `;
      if (sceneTime < 7.5) {
        overlays += renderActionLines({ x: 1240, y: 240 }, 260, sceneTime);
      }
    }
    if (!hasClapper) {
      const walkProg = Math.min(1, sceneTime / 1);
      hostX = 260 + walkProg * 140;
      isWalking = walkProg < 1;
      hostExpr = "deadpan_classic";
    } else if (hasClapper && !hasPhone) {
      hostX = 400;
      hostLean = 6;
      hostExpr = "confused_squint";
      pointTarget = { x: 1040, y: 440 };
    } else if (hasPhone && !hasBillboard) {
      hostX = 420;
      hostLean = 10;
      hostExpr = "skeptical_side_eye";
      pointTarget = { x: 1420, y: 420 };
    } else if (hasBillboard && !isReaction) {
      hostX = 420;
      hostLean = -14;
      hostExpr = "shock_eye_pop";
      pointTarget = { x: 1240, y: 240 };
    } else {
      camera.cutTo(420, 540, 1.35);
      hostX = 420;
      hostLean = 0;
      hostExpr = "deadpan_slow_blink";
      pointTarget = void 0;
    }
    const hostFigure = {
      id: "host_stick",
      state: {
        x: hostX,
        y: hostY,
        scale: 1.34,
        timeSec: sceneTime,
        spineLean: hostLean,
        expression: hostExpr,
        isWalking,
        pointTarget,
        gazeTarget: pointTarget
      }
    };
    return {
      backgroundSvg: bg + overlays,
      stickFigures: [hostFigure],
      shake: shakeAmt
    };
  }
};

// src/scenes/Scene02_TechBro.ts
var Scene02_TechBro = {
  id: "scene_02_techbro",
  name: "Thicc to Stick & Tech Bro Pivot",
  startTime: 8.62,
  endTime: 15.334,
  render(ctx) {
    const { sceneTime, camera } = ctx;
    const isDragging = sceneTime >= 1.2 && sceneTime < 3.28;
    const isPoof = sceneTime >= 3.28 && sceneTime < 4.68;
    const isAI = sceneTime >= 4.68;
    const isReaction = sceneTime >= 6.16;
    let shakeAmt = 0;
    let overlays = "";
    const sliderNorm = sceneTime < 1.2 ? 0 : Math.min(1, (sceneTime - 1.2) / 1.5);
    const sliderProgress = cubicInOut(sliderNorm);
    const sliderX = 720 + sliderProgress * 540;
    let hostX = 420;
    let hostLean = 0;
    let hostExpr = "deadpan_classic";
    let isWalking = false;
    let pointTarget = void 0;
    let leftHandTarget = void 0;
    camera.setTarget(960, 540, 1);
    if (isDragging) {
      hostX = 420 + sliderProgress * 180;
      hostLean = 14;
      isWalking = true;
      hostExpr = "frustration_groan";
      leftHandTarget = { x: sliderX, y: 185 };
    } else if (isPoof) {
      hostX = 420;
      hostLean = -14;
      hostExpr = "shock_eye_pop";
      shakeAmt = Math.max(0, 1 - (sceneTime - 3.28) / 0.5) * 10;
      pointTarget = { x: 1380, y: 500 };
    } else if (isAI && !isReaction) {
      hostX = 420;
      hostLean = 8;
      hostExpr = "smug_rock_eyebrow";
      pointTarget = { x: 1260, y: 240 };
    } else {
      camera.cutTo(420, 540, 1.35);
      hostX = 420;
      hostLean = 0;
      hostExpr = "smug_finger_guns";
      pointTarget = void 0;
    }
    let bg = `
      <!-- Infinite full-bleed backdrop -->
      <rect x="-4000" y="-4000" width="10000" height="10000" fill="#f8fafc"/>
      <line x1="-4000" y1="840" x2="6000" y2="840" stroke="#e2e8f0" stroke-width="4"/>

      <!-- PERSISTENT TOP ASSET: Animated Velocity Slider Track -->
      <g transform="translate(0, 170)">
        <rect x="720" y="0" width="540" height="30" rx="15" fill="#e2e8f0" stroke="#0f172a" stroke-width="5"/>
        <rect x="720" y="0" width="${sliderProgress * 540}" height="30" rx="15" fill="#38bdf8"/>

        <!-- Markers -->
        <circle cx="720" cy="15" r="26" fill="#f43f5e" stroke="#0f172a" stroke-width="5"/>
        <text x="720" y="70" font-family="'Impact', sans-serif" font-size="26" fill="#be123c" text-anchor="middle">"THICC"</text>
        <circle cx="1260" cy="15" r="26" fill="#0284c7" stroke="#0f172a" stroke-width="5"/>
        <text x="1260" y="70" font-family="'Impact', sans-serif" font-size="26" fill="#0369a1" text-anchor="middle">"STICK"</text>

        <!-- Dynamic Knob -->
        <circle cx="${sliderX}" cy="15" r="30" fill="#eab308" stroke="#0f172a" stroke-width="6" filter="url(#glow)"/>
      </g>
    `;
    if (!isPoof && !isAI) {
      bg += `
        ${renderTechBro({ x: 1380, y: 630, scale: 1.85 - sliderProgress * 0.35, mode: "crypto", timeSec: sceneTime })}
      `;
      if (isDragging) {
        overlays += renderHandDrawnArrow({ x: 740, y: 280 }, { x: sliderX, y: 210 }, sceneTime, "SPEEDRUN");
      }
    } else if (isPoof) {
      const burst = particleBurst(sceneTime - 3.28, 14, 0.9, 260);
      const poofScale = 1.2 + Math.sin((sceneTime - 3.28) * 6) * 0.3;
      bg += `
        <!-- Radial Crypto Shatter Burst -->
        ${burst.map((p, i) => `
          <g transform="translate(${1380 + p.x}, ${500 + p.y}) rotate(${sceneTime * 300 + i * 30})" opacity="${p.opacity}">
            <circle cx="0" cy="0" r="${p.radius + 6}" fill="#f59e0b" stroke="#0f172a" stroke-width="3"/>
            <text x="0" y="5" font-family="sans-serif" font-size="${Math.max(8, p.radius + 2)}" font-weight="bold" fill="#fff" text-anchor="middle">\u20BF</text>
          </g>
        `).join("")}
        ${renderTechBro({ x: 1380, y: 600, scale: 1.85 * poofScale, poof: true, timeSec: sceneTime })}
      `;
      overlays += renderActionLines({ x: 1380, y: 500 }, 240, sceneTime);
    } else {
      const promptText = `PROMPT: /imagine tech_founder --v 6.0 --no calories`;
      const typedChars = Math.min(promptText.length, Math.floor((sceneTime - 4.68) * 24));
      const currentTyped = promptText.slice(0, typedChars);
      const cursorVisible = Math.sin(sceneTime * 12) > 0;
      const termHover = floatingHover(sceneTime, 2, 3);
      bg += `
        <!-- Floating Prompt Window -->
        <g transform="translate(1260, ${260 + termHover.dy})">
          <rect x="-240" y="-60" width="480" height="120" rx="14" fill="#0f172a" stroke="#06b6d4" stroke-width="5" filter="url(#glow)"/>
          <rect x="-225" y="-45" width="450" height="90" rx="8" fill="#1e293b"/>
          <text x="-200" y="-12" font-family="'Courier New', monospace" font-size="17" font-weight="bold" fill="#22d3ee">
            ${currentTyped}${cursorVisible ? "\u2588" : " "}
          </text>
          <text x="-200" y="20" font-family="'Courier New', monospace" font-size="14" fill="#a5f3fc">
            --ar 16:9 --fast --chaos 100
          </text>
        </g>
        ${renderTechBro({ x: 1260, y: 630, scale: 1.85, mode: "ai", timeSec: sceneTime })}
      `;
      if (sceneTime < 6.16) {
        overlays += renderHandDrawnCircle({ x: 1260, y: 260 }, 260, 70, sceneTime, "PIVOT TO AI");
      }
    }
    const hostFigure = {
      id: "host_stick",
      state: {
        x: hostX,
        y: 650,
        scale: 1.34,
        timeSec: sceneTime,
        spineLean: hostLean,
        expression: hostExpr,
        isWalking,
        pointTarget,
        leftHandTarget,
        gazeTarget: pointTarget || leftHandTarget || (isPoof ? { x: 1380, y: 500 } : void 0)
      }
    };
    return {
      backgroundSvg: bg + overlays,
      stickFigures: [hostFigure],
      shake: shakeAmt
    };
  }
};

// src/character/PropRigs.ts
function renderCaliperRig(opts) {
  const { x, y, scale = 1, rotation = 0, jawGap = 20, lcdValue = "0.02 mm", laserActive = true } = opts;
  return `
    <g id="prop-caliper-rig" transform="translate(${x}, ${y}) rotate(${rotation}) scale(${scale})">
      <!-- Main Caliper Beam -->
      <rect x="-180" y="-18" width="360" height="36" rx="6" fill="#cbd5e1" stroke="#334155" stroke-width="5" filter="url(#cardShadow)"/>
      
      <!-- Fixed Left Jaw -->
      <path d="M -180 -18 L -180 110 L -140 70 L -140 -18 Z" fill="#94a3b8" stroke="#334155" stroke-width="5"/>

      <!-- Movable Right Jaw (Driven by jawGap) -->
      <g transform="translate(${-180 + jawGap + 60}, 0)">
        <path d="M 0 -18 L 0 110 L -40 70 L -40 -18 Z" fill="#64748b" stroke="#1e293b" stroke-width="5"/>
        <!-- Digital Slider Display Unit -->
        <rect x="-50" y="-38" width="100" height="76" rx="10" fill="#0f172a" stroke="#38bdf8" stroke-width="4" filter="url(#cardShadow)"/>
        <!-- Glowing Green LCD Screen -->
        <rect x="-40" y="-24" width="80" height="32" rx="4" fill="#022c22" stroke="#10b981" stroke-width="2"/>
        <text x="0" y="-2" font-family="'Courier New', monospace" font-size="16" font-weight="bold" fill="#34d399" filter="url(#glow)" text-anchor="middle">
          ${lcdValue}
        </text>
      </g>

      ${laserActive ? `
        <!-- Red Laser Precision Measurement Sweep -->
        <line x1="${-180}" y1="65" x2="${-180 + jawGap + 20}" y2="65" stroke="#ef4444" stroke-width="4" stroke-dasharray="6 3" filter="url(#glow)"/>
        <circle cx="${-180 + jawGap / 2}" cy="65" r="4" fill="#f87171" filter="url(#glow)"/>
      ` : ""}
    </g>
  `;
}
function renderSaaSModalRig(opts) {
  const { x, y, scale = 1, rotation = 0, isCancelled = false, stampProgress = 0, stampAngle = -14 } = opts;
  const stampScale = isCancelled ? 1 + Math.max(0, 1 - stampProgress) * 1.5 : 0;
  const stampOpacity = isCancelled ? Math.min(1, stampProgress * 2) : 0;
  return `
    <g id="prop-saas-modal-rig" transform="translate(${x}, ${y}) rotate(${rotation}) scale(${scale})">
      <!-- Modal Window Card -->
      <rect x="-240" y="-160" width="480" height="320" rx="20" fill="#ffffff" stroke="#0f172a" stroke-width="8" filter="url(#cardShadow)"/>
      
      <!-- Window Header Bar -->
      <path d="M -240 -160 L 240 -160 L 240 -100 L -240 -100 Z" fill="#f1f5f9" stroke="#0f172a" stroke-width="8"/>
      <circle cx="-200" cy="-130" r="10" fill="#ef4444"/>
      <circle cx="-170" cy="-130" r="10" fill="#eab308"/>
      <circle cx="-140" cy="-130" r="10" fill="#22c55e"/>
      <text x="0" y="-120" font-family="'Impact', sans-serif" font-size="22" fill="#0f172a" text-anchor="middle">
        SUBSCRIPTION SETTINGS
      </text>

      <!-- Modal Body -->
      <text x="0" y="-45" font-family="sans-serif" font-size="24" font-weight="bold" fill="#0f172a" text-anchor="middle">
        Cancel Biological Hunger?
      </text>
      <text x="0" y="-10" font-family="sans-serif" font-size="16" fill="#64748b" text-anchor="middle">
        Plan: Daily Lunch &amp; Carbohydrates ($120/mo)
      </text>

      <!-- Keep Subscription Button -->
      <rect x="-190" y="35" width="170" height="60" rx="12" fill="#e2e8f0" stroke="#94a3b8" stroke-width="4"/>
      <text x="-105" y="72" font-family="sans-serif" font-size="18" font-weight="bold" fill="#475569" text-anchor="middle">
        Keep Lunch
      </text>

      <!-- Unsubscribe Button -->
      <rect x="20" y="35" width="170" height="60" rx="12" fill="#dc2626" stroke="#991b1b" stroke-width="4"/>
      <text x="105" y="72" font-family="sans-serif" font-size="18" font-weight="bold" fill="#ffffff" text-anchor="middle">
        Unsubscribe
      </text>

      ${isCancelled ? `
        <!-- Animated CANCELLED Stamp Slam -->
        <g transform="translate(0, 20) rotate(${stampAngle}) scale(${stampScale})" opacity="${stampOpacity}">
          <rect x="-190" y="-55" width="380" height="110" rx="16" fill="#fee2e2" stroke="#dc2626" stroke-width="12" filter="url(#glow)"/>
          <text x="0" y="20" font-family="'Impact', sans-serif" font-size="64" fill="#dc2626" letter-spacing="6" text-anchor="middle">
            CANCELLED
          </text>
          <!-- Shockwave action spikes -->
          <line x1="-210" y1="0" x2="-235" y2="0" stroke="#dc2626" stroke-width="6"/>
          <line x1="210" y1="0" x2="235" y2="0" stroke="#dc2626" stroke-width="6"/>
        </g>
      ` : ""}
    </g>
  `;
}

// src/scenes/Scene03_Celebrities.ts
var Scene03_Celebrities = {
  id: "scene_03_celebrities",
  name: "Jenna Ortega, Emma Stone, Ariana & Cheekbone Calipers",
  startTime: 15.334,
  endTime: 22.805,
  render(ctx) {
    const { sceneTime, camera } = ctx;
    const isHostIntro = sceneTime < 1.2;
    const showJenna = sceneTime >= 1.2;
    const showEmma = sceneTime >= 3.36;
    const showAriana = sceneTime >= 4.666;
    const showCaliper = sceneTime >= 5.866;
    const isReactionClimax = sceneTime >= 6.88;
    let hostX = 360;
    let hostLean = 0;
    let hostExpr = "deadpan_classic";
    let isWalking = false;
    let pointTarget = void 0;
    let rightHandProp = "none";
    let overlays = "";
    if (isHostIntro) {
      camera.setTarget(960, 540, 1);
      hostX = 440;
    } else if (!showEmma) {
      camera.setTarget(960, 540, 1);
      hostX = 420;
      hostLean = 8;
      pointTarget = { x: 750, y: 500 };
      hostExpr = "skeptical_side_eye";
    } else if (!showAriana) {
      camera.setTarget(960, 540, 1);
      hostX = 420;
      pointTarget = { x: 1100, y: 500 };
      hostExpr = "confused_squint";
    } else if (!showCaliper) {
      camera.setTarget(960, 540, 1);
      hostX = 420;
      pointTarget = { x: 1460, y: 500 };
      hostExpr = "confused_tilted_head";
    } else if (!isReactionClimax) {
      camera.setTarget(960, 540, 1);
      hostX = 440;
      hostLean = 14;
      isWalking = false;
      rightHandProp = "caliper";
      pointTarget = { x: 1460, y: 450 };
      hostExpr = "confused_squint";
    } else {
      camera.cutTo(440, 540, 1.35);
      hostX = 440;
      hostLean = -10;
      hostExpr = "shock_eye_pop";
    }
    let bg = `
      <!-- Infinite full-bleed backdrop -->
      <rect x="-4000" y="-4000" width="10000" height="10000" fill="#f8fafc"/>
      <line x1="-4000" y1="840" x2="6000" y2="840" stroke="#e2e8f0" stroke-width="4"/>
    `;
    if (showJenna) {
      const jennaTrans = popInSquash(sceneTime - 1.2, 0.28, { x: 750, y: 630 });
      bg += `
        <g transform="translate(${jennaTrans.x - 750}, ${jennaTrans.y - 630}) scale(${jennaTrans.scaleX}, ${jennaTrans.scaleY})" opacity="${jennaTrans.opacity}">
          ${renderJennaOrtega({ x: 750, y: 630, scale: 2.2, timeSec: sceneTime })}
          
          <!-- Character Label Card -->
          <g transform="translate(750, 260)">
            <rect x="-120" y="-25" width="240" height="50" rx="10" fill="#0f172a" stroke="#dc2626" stroke-width="4" filter="url(#cardShadow)"/>
            <text x="0" y="8" font-family="'Impact', sans-serif" font-size="20" fill="#ffffff" letter-spacing="1" text-anchor="middle">
              JENNA ORTEGA
            </text>
          </g>
        </g>
      `;
    }
    if (showEmma) {
      const emmaTrans = popInSquash(sceneTime - 3.36, 0.28, { x: 1100, y: 630 });
      bg += `
        <g transform="translate(${emmaTrans.x - 1100}, ${emmaTrans.y - 630}) scale(${emmaTrans.scaleX}, ${emmaTrans.scaleY})" opacity="${emmaTrans.opacity}">
          ${renderEmmaStone({ x: 1100, y: 630, scale: 2.2, timeSec: sceneTime })}

          <!-- Character Label Card -->
          <g transform="translate(1100, 260)">
            <rect x="-120" y="-25" width="240" height="50" rx="10" fill="#064e3b" stroke="#10b981" stroke-width="4" filter="url(#cardShadow)"/>
            <text x="0" y="8" font-family="'Impact', sans-serif" font-size="20" fill="#ffffff" letter-spacing="1" text-anchor="middle">
              EMMA STONE
            </text>
          </g>
        </g>
      `;
    }
    if (showAriana) {
      const arianaTrans = popInSquash(sceneTime - 4.666, 0.28, { x: 1460, y: 630 });
      bg += `
        <g transform="translate(${arianaTrans.x - 1460}, ${arianaTrans.y - 630}) scale(${arianaTrans.scaleX}, ${arianaTrans.scaleY})" opacity="${arianaTrans.opacity}">
          ${renderArianaGrande({ x: 1460, y: 630, scale: 2.2, timeSec: sceneTime })}

          <!-- Character Label Card -->
          <g transform="translate(1460, 260)">
            <rect x="-120" y="-25" width="240" height="50" rx="10" fill="#581c87" stroke="#c084fc" stroke-width="4" filter="url(#cardShadow)"/>
            <text x="0" y="8" font-family="'Impact', sans-serif" font-size="20" fill="#ffffff" letter-spacing="1" text-anchor="middle">
              ARIANA GRANDE
            </text>
          </g>
        </g>
      `;
    }
    if (showCaliper) {
      const clampElapsed = sceneTime - 5.866;
      const caliperClamp = Math.min(1, clampElapsed / 0.4);
      const jawGap = 65 - caliperClamp * 42;
      const currentVal = caliperClamp < 1 ? ((1 - caliperClamp) * 14.4 + 0.02).toFixed(2) + " mm" : "0.02 mm";
      bg += `
        <!-- Forensic Radar Target Grid on Cheekbones -->
        <g stroke="#ef4444" stroke-width="2.5" opacity="0.75">
          <circle cx="1460" cy="500" r="95" fill="none" stroke-dasharray="8 6"/>
          <line x1="1340" y1="500" x2="1580" y2="500"/>
          <line x1="1460" y1="380" x2="1460" y2="620"/>
        </g>

        <!-- Mechanical Digital Caliper Rig -->
        ${renderCaliperRig({
        x: 1460,
        y: 450,
        scale: 1.8,
        jawGap,
        lcdValue: currentVal,
        laserActive: true,
        timeSec: sceneTime
      })}
      `;
      if (sceneTime > 6.2) {
        overlays += renderHandDrawnCircle({ x: 1460, y: 450 }, 140, 90, sceneTime, "FAT: ZERO");
        overlays += renderHandDrawnArrow({ x: 1200, y: 380 }, { x: 1400, y: 440 }, sceneTime);
      }
    }
    if (isReactionClimax) {
      overlays += renderActionLines({ x: 650, y: 560 }, 160, sceneTime);
    }
    const hostFigure = {
      id: "host_stick",
      state: {
        x: hostX,
        y: 650,
        scale: 1.34,
        timeSec: sceneTime,
        spineLean: hostLean,
        isWalking,
        rightHandProp,
        pointTarget,
        expression: hostExpr,
        gazeTarget: pointTarget || { x: 960, y: 630 }
      }
    };
    return {
      backgroundSvg: bg + overlays,
      stickFigures: [hostFigure]
    };
  }
};

// src/scenes/Scene04_Unsubscribe.ts
var Scene04_Unsubscribe = {
  id: "scene_04_unsubscribe",
  name: "Unsubscribe from Carbs & Cancel Lunch",
  startTime: 22.805,
  endTime: 32.967,
  render(ctx) {
    const { sceneTime, camera } = ctx;
    const hasFlyingCarbs = sceneTime >= 3.2;
    const hasModal = sceneTime >= 5.8;
    const hasStamp = sceneTime >= 7.12;
    const isReaction = sceneTime >= 9.6;
    let hostX = 420;
    let hostY = 650;
    let hostLean = 0;
    let hostExpr = "deadpan_classic";
    let isWalking = false;
    let pointTarget = void 0;
    let leftHandTarget = void 0;
    let shakeAmt = 0;
    let overlays = "";
    camera.setTarget(960, 540, 1);
    if (!hasFlyingCarbs) {
      hostX = 420;
      hostLean = 0;
      hostExpr = "deadpan_classic";
      pointTarget = { x: 1380, y: 570 };
    } else if (hasFlyingCarbs && !hasModal) {
      hostX = 420;
      hostLean = 16;
      hostExpr = "crying_waterfalls";
      leftHandTarget = { x: 1380, y: 320 };
      pointTarget = { x: 1380, y: 380 };
    } else if (hasModal && !hasStamp) {
      hostX = 420;
      hostLean = 0;
      hostExpr = "shock_home_alone";
      pointTarget = { x: 1380, y: 440 };
    } else if (hasStamp && !isReaction) {
      const blowProg = Math.min(1, (sceneTime - 7.12) / 0.3);
      hostX = 420 - blowProg * 120;
      hostLean = -22;
      hostExpr = "fear_screaming";
      pointTarget = { x: 1380, y: 480 };
    } else {
      camera.cutTo(420, 540, 1.35);
      hostX = 420;
      hostLean = 0;
      hostExpr = "deadpan_shrug";
      pointTarget = void 0;
    }
    let bg = `
      <!-- Infinite full-bleed backdrop -->
      <rect x="-4000" y="-4000" width="10000" height="10000" fill="#f8fafc"/>
      <line x1="-4000" y1="840" x2="6000" y2="840" stroke="#e2e8f0" stroke-width="4"/>

      <!-- PERSISTENT Dining Table Surface -->
      <ellipse cx="1380" cy="840" rx="340" ry="30" fill="#000000" opacity="0.16"/>
      <line x1="1120" y1="650" x2="1100" y2="840" stroke="#713f12" stroke-width="14" stroke-linecap="round"/>
      <line x1="1640" y1="650" x2="1660" y2="840" stroke="#713f12" stroke-width="14" stroke-linecap="round"/>
      <ellipse cx="1380" cy="650" rx="340" ry="95" fill="#fdf4ff" stroke="#cbd5e1" stroke-width="7" filter="url(#cardShadow)"/>
    `;
    const steamY1 = -20 - sceneTime * 40 % 80;
    const steamY2 = -30 - (sceneTime + 0.6) * 35 % 80;
    bg += `
      <g transform="translate(1380, 570) scale(1.4)">
        <polygon points="-80,20 -10,-40 30,30" fill="#f59e0b" stroke="#b45309" stroke-width="4"/>
        <circle cx="-35" cy="0" r="8" fill="#ef4444"/>
        <circle cx="-10" cy="15" r="7" fill="#ef4444"/>
        <ellipse cx="60" cy="0" rx="55" ry="30" fill="#d97706" stroke="#78350f" stroke-width="4"/>
        <path d="M 30 -10 Q 60 -25 90 -10" stroke="#fde68a" stroke-width="3" fill="none"/>
        <path d="M -30 ${steamY1} Q -40 ${steamY1 - 20} -25 ${steamY1 - 40}" fill="none" stroke="#cbd5e1" stroke-width="3" stroke-linecap="round" opacity="0.6"/>
        <path d="M 60 ${steamY2} Q 50 ${steamY2 - 20} 65 ${steamY2 - 40}" fill="none" stroke="#cbd5e1" stroke-width="3" stroke-linecap="round" opacity="0.6"/>
      </g>
    `;
    if (hasFlyingCarbs) {
      const ascendY = Math.max(160, 520 - (sceneTime - 3.2) * 85);
      const godRayPulse = 0.22 + Math.sin(sceneTime * 4) * 0.08;
      bg += `
        <!-- Heavenly Spotlight Rays -->
        <polygon points="1380,-200 980,840 1780,840" fill="#fef08a" opacity="${godRayPulse}"/>
        ${renderFlyingCarbs(1380, ascendY, sceneTime)}
      `;
      if (!hasModal) {
        overlays += renderHandDrawnArrow({ x: 900, y: 560 }, { x: 1300, y: ascendY + 20 }, sceneTime, "GOODBYE PIZZA");
      }
    }
    if (hasModal) {
      const stampProg = hasStamp ? Math.min(1, (sceneTime - 7.12) / 0.35) : 0;
      if (hasStamp) {
        const slam = slamDrop(sceneTime - 7.12, 0.22, { x: 1380, y: 460 }, 380);
        if (slam.impactOccurred && sceneTime < 7.6) {
          shakeAmt = slam.screenShake;
        }
      }
      bg += `
        ${renderSaaSModalRig({
        x: 1380,
        y: 460,
        scale: 1.25,
        isCancelled: hasStamp,
        stampProgress: stampProg,
        timeSec: sceneTime
      })}
      `;
      if (hasStamp && sceneTime < 8.5) {
        overlays += renderActionLines({ x: 1380, y: 460 }, 280, sceneTime);
      }
    }
    const hostFigure = {
      id: "host_stick",
      state: {
        x: hostX,
        y: hostY,
        scale: 1.34,
        timeSec: sceneTime,
        spineLean: hostLean,
        isWalking,
        pointTarget,
        leftHandTarget,
        expression: hostExpr,
        gazeTarget: pointTarget || leftHandTarget
      }
    };
    return {
      backgroundSvg: bg + overlays,
      stickFigures: [hostFigure],
      shake: shakeAmt
    };
  }
};

// src/scenes/Scene05_TimBurtonPS1.ts
var Scene05_TimBurtonPS1 = {
  id: "scene_05_timburton_ps1",
  name: "Tim Burton Aesthetic & Low-Poly PS1 Graphics",
  startTime: 32.967,
  endTime: 43.729,
  render(ctx) {
    const { sceneTime, camera } = ctx;
    const isBeat1 = sceneTime < 3.92;
    const isBeat2 = sceneTime >= 3.92 && sceneTime < 6.88;
    const isBeat3 = sceneTime >= 6.88 && sceneTime < 8.96;
    const isBeat4 = sceneTime >= 8.96 && sceneTime < 10.16;
    const isBeat5 = sceneTime >= 10.16;
    let hostX = 520;
    let hostY = 650;
    let hostScale = 1.34;
    let hostLean = 0;
    let hostExpr = "deadpan_classic";
    let pointTarget = void 0;
    let overlays = "";
    if (isBeat1) {
      camera.setTarget(960, 540, 1);
      hostX = 440;
      hostLean = 12;
      pointTarget = { x: 1260, y: 380 };
      hostExpr = "deadpan_classic";
    } else if (isBeat2) {
      camera.cutTo(960, 540, 1.35);
      hostX = 960;
      hostScale = 1.45;
      hostLean = Math.sin(sceneTime * 4) * 4;
      hostExpr = "dark_circles_insomnia";
    } else if (isBeat3) {
      camera.setTarget(960, 540, 1);
      hostX = 440;
      hostLean = 8;
      pointTarget = { x: 1260, y: 460 };
      hostExpr = "confused_squint";
    } else if (isBeat4) {
      camera.setTarget(960, 540, 1);
      hostX = 440;
      hostExpr = "mind_blown_galaxy_brain";
      pointTarget = { x: 1260, y: 440 };
    } else {
      camera.cutTo(440, 540, 1.35);
      hostX = 440;
      hostExpr = "deadpan_side_glance";
    }
    let bg = `
      <!-- Full-bleed background -->
      <rect x="-4000" y="-4000" width="10000" height="10000" fill="#f8fafc"/>
      <line x1="-4000" y1="840" x2="6000" y2="840" stroke="#e2e8f0" stroke-width="4"/>
    `;
    if (isBeat1 || isBeat2) {
      const batWing = Math.sin(sceneTime * 18) * 16;
      bg = `
        <rect x="-4000" y="-4000" width="10000" height="10000" fill="#09090b"/>
        <line x1="-4000" y1="840" x2="6000" y2="840" stroke="#27272a" stroke-width="6"/>

        <!-- Glowing Eerie Crescent Moon -->
        <ellipse cx="1450" cy="220" rx="100" ry="100" fill="#fef08a" filter="url(#glow)"/>
        <ellipse cx="1490" cy="200" rx="90" ry="90" fill="#09090b"/>

        <!-- Iconic Tim Burton Curly Spiral Mountain Peak -->
        <path d="M 700 840 C 900 660 1150 380 1380 400 C 1500 410 1540 520 1440 570 C 1320 620 1380 730 1500 790 C 1620 840 1800 840 2200 840 L 2200 840 L 700 840 Z" fill="#18181b" stroke="#3f3f46" stroke-width="8"/>

        <!-- Twisted Gothic Dead Trees with Curled Branches -->
        <path d="M 1750 840 L 1730 580 Q 1660 480 1580 440 M 1730 580 Q 1810 490 1840 400 M 1730 660 Q 1820 630 1900 590" stroke="#27272a" stroke-width="16" fill="none" stroke-linecap="round"/>

        <!-- Fluttering Bats -->
        <g transform="translate(${1350 - sceneTime * 50}, 140) scale(1.4)">
          <path d="M -30 0 Q -15 ${-20 + batWing} 0 0 Q 15 ${-20 + batWing} 30 0 Q 15 15 0 6 Q -15 15 -30 0 Z" fill="#52525b"/>
        </g>
      `;
      if (isBeat1 && sceneTime > 1.5) {
        overlays += renderHandDrawnArrow({ x: 680, y: 480 }, { x: 1300, y: 380 }, sceneTime, "SPEEDRUN BURTON");
      }
      if (isBeat2) {
        bg += `
          <g transform="translate(960, 280)">
            <rect x="-140" y="-30" width="280" height="60" rx="6" fill="#000000" opacity="0.7"/>
            <text x="0" y="8" font-family="'Courier New', monospace" font-size="22" font-weight="bold" fill="#22d3ee" text-anchor="middle">
              MAY 1997 - SP \u25B7
            </text>
          </g>
        `;
      }
    } else {
      const angle = (sceneTime - 6.88) * 2.5;
      const cosA = Math.cos(angle);
      const sinA = Math.sin(angle);
      const cx = 1380;
      const cy = 460;
      const r = 240;
      const p1 = `${cx + cosA * r},${cy - 140}`;
      const p2 = `${cx - cosA * r},${cy - 140}`;
      const p3 = `${cx - sinA * (r * 0.9)},${cy + 140}`;
      const p4 = `${cx + sinA * (r * 0.9)},${cy + 140}`;
      const pTop = `${cx},${cy - 240}`;
      const pBot = `${cx},${cy + 240}`;
      bg = `
        <rect x="-4000" y="-4000" width="10000" height="10000" fill="#022c22"/>
        <line x1="-4000" y1="840" x2="6000" y2="840" stroke="#059669" stroke-width="4"/>

        <!-- PS1 Retro Wireframe Floor Grid -->
        <g stroke="#10b981" stroke-width="2.5" opacity="0.75">
          ${[480, 550, 630, 720, 840, 980].map((gy) => `<line x1="-2000" y1="${gy}" x2="4000" y2="${gy}"/>`).join("")}
          ${[200, 500, 800, 1100, 1380, 1660, 1960, 2260].map((gx) => `<line x1="${gx}" y1="480" x2="${gx + (gx - 1380) * 1.8}" y2="1080"/>`).join("")}
        </g>

        <!-- Spinning 3D Polygonal Mesh (Low-Poly Character) -->
        <polygon points="${pTop} ${p1} ${p4}" fill="#34d399" stroke="#047857" stroke-width="5"/>
        <polygon points="${pTop} ${p2} ${p3}" fill="#059669" stroke="#047857" stroke-width="5"/>
        <polygon points="${pBot} ${p3} ${p4}" fill="#047857" stroke="#065f46" stroke-width="5"/>
        <polygon points="${pTop} ${p1} ${p2}" fill="#6ee7b7" stroke="#059669" stroke-width="5"/>

        <!-- Retro PS1 HUD Badge -->
        <g transform="translate(1380, 160)">
          <rect x="-180" y="-30" width="360" height="60" rx="8" fill="#0f172a" stroke="#10b981" stroke-width="4" filter="url(#glow)"/>
          <text x="0" y="10" font-family="'Courier New', monospace" font-size="24" font-weight="bold" fill="#34d399" text-anchor="middle">
            PS1 : 240p | 14 POLYS
          </text>
        </g>

        <!-- CRT Scanline Overlay -->
        <g stroke="#000000" stroke-width="3" opacity="0.35">
          ${Array.from({ length: 45 }).map((_, i) => `<line x1="-2000" y1="${i * 24}" x2="4000" y2="${i * 24}"/>`).join("")}
        </g>
      `;
      if (isBeat3 || isBeat4) {
        overlays += renderHandDrawnCircle({ x: 1380, y: 460 }, 220, 160, sceneTime, "14 POLYGONS");
      }
    }
    const hostFigure = {
      id: "host_stick",
      state: {
        x: hostX,
        y: hostY,
        scale: hostScale,
        timeSec: sceneTime,
        spineLean: hostLean,
        pointTarget,
        expression: hostExpr,
        gazeTarget: pointTarget
      }
    };
    return {
      backgroundSvg: bg + overlays,
      stickFigures: [hostFigure]
    };
  }
};

// src/scenes/Scene06_Pendulum.ts
var Scene06_Pendulum = {
  id: "scene_06_pendulum",
  name: "The Beauty Standard Pendulum & Slouching Couch Guy",
  startTime: 43.729,
  endTime: 57.809,
  render(ctx) {
    const { sceneTime, camera } = ctx;
    const isBeat1 = sceneTime < 3.657;
    const isBeat2 = sceneTime >= 3.657 && sceneTime < 7.771;
    const isBeat3 = sceneTime >= 7.771 && sceneTime < 10.771;
    const isBeat4 = sceneTime >= 10.771 && sceneTime < 13.937;
    const isBeat5 = sceneTime >= 13.937;
    let hostX = 540;
    let hostY = 650;
    let hostLean = 0;
    let hostExpr = "deadpan_classic";
    let rightHandProp = "none";
    let pointTarget = void 0;
    let overlays = "";
    if (isBeat1) {
      camera.setTarget(960, 540, 1);
      hostX = 440;
      hostLean = 8;
      rightHandProp = "pointer";
      pointTarget = { x: 1280, y: 480 };
      hostExpr = "deadpan_classic";
    } else if (isBeat2) {
      camera.setTarget(960, 540, 1);
      hostX = 440;
      hostLean = -14;
      pointTarget = { x: 1280, y: 380 };
      hostExpr = "skeptical_raised_brow";
    } else if (isBeat3) {
      camera.setTarget(960, 540, 1);
      hostX = 440;
      hostLean = -18;
      pointTarget = { x: 1280, y: 680 };
      hostExpr = "cringe_teeth_grit";
    } else if (isBeat4) {
      camera.setTarget(960, 540, 1);
      hostX = 440;
      hostExpr = "deadpan_shrug";
    } else {
      camera.cutTo(440, 540, 1.35);
      hostX = 440;
      hostExpr = "deadpan_classic";
    }
    const pivotX = 1380;
    const pivotY = -60;
    const armLength = 700;
    const swingAngle = isBeat1 ? 0 : Math.sin((sceneTime - 3.657) * 3.8) * 0.65;
    const bobX = pivotX + Math.sin(swingAngle) * armLength;
    const bobY = pivotY + Math.cos(swingAngle) * armLength;
    const isDangerZone = !isBeat1 && Math.abs(swingAngle) < 0.35;
    let bg = `
      <!-- Infinite full-bleed backdrop -->
      <rect x="-4000" y="-4000" width="10000" height="10000" fill="#f8fafc"/>
      <line x1="-4000" y1="840" x2="6000" y2="840" stroke="#e2e8f0" stroke-width="4"/>
    `;
    if (isBeat1) {
      bg += `
        <g transform="translate(1380, 480)">
          <rect x="-240" y="-140" width="480" height="280" rx="10" fill="#1e3a29" stroke="#713f12" stroke-width="12" filter="url(#cardShadow)"/>
          <text x="0" y="-60" font-family="'Patrick Hand', cursive, sans-serif" font-size="28" fill="#ffffff" text-anchor="middle">HUMAN BEAUTY DYNAMICS</text>
          <line x1="-180" y1="20" x2="180" y2="20" stroke="#ffffff" stroke-width="4" stroke-dasharray="10 6"/>
          <text x="-140" y="60" font-family="'Patrick Hand', cursive, sans-serif" font-size="24" fill="#fbbf24" text-anchor="middle">[PAST]</text>
          <text x="140" y="60" font-family="'Patrick Hand', cursive, sans-serif" font-size="24" fill="#60a5fa" text-anchor="middle">[NOW]</text>
        </g>
      `;
      if (sceneTime > 1.2) {
        overlays += renderHandDrawnCircle({ x: 1380, y: 480 }, 220, 120, sceneTime, "CYCLE OF DOOM");
      }
    } else {
      bg += `
        <line x1="${pivotX}" y1="${pivotY}" x2="${bobX}" y2="${bobY}" stroke="#475569" stroke-width="10"/>
        <circle cx="${pivotX}" cy="${pivotY}" r="22" fill="#1e293b"/>

        <!-- Giant Spiked Wrecking Ball -->
        <g id="wrecking-ball" transform="translate(${bobX}, ${bobY})">
          <circle cx="0" cy="0" r="130" fill="#1e293b" stroke="#0f172a" stroke-width="12" filter="url(#cardShadow)"/>
          <ellipse cx="-40" cy="-40" rx="65" ry="40" fill="#475569" opacity="0.6"/>
          <polygon points="0,-55 -45,40 45,40" fill="#ef4444"/>
          <text x="0" y="28" font-family="'Impact', sans-serif" font-size="40" fill="#ffffff" text-anchor="middle">BEAUTY</text>
        </g>

        <!-- Couch Guy Grounded on Floor (Scale: 1.40) -->
        ${renderCouchGuy({ x: 1380, y: 720, scale: 1.4, isDucking: isDangerZone || isBeat4, timeSec: sceneTime })}
      `;
      if (isBeat3 && isDangerZone) {
        bg += `
          <g fill="#eab308" stroke="#ca8a04" stroke-width="2">
            <circle cx="1320" cy="620" r="8"/>
            <circle cx="1440" cy="610" r="10"/>
            <circle cx="1390" cy="580" r="6"/>
          </g>
        `;
        overlays += renderActionLines({ x: 1380, y: 700 }, 160, sceneTime);
      }
      if (isBeat4) {
        overlays += renderHandDrawnArrow({ x: 1100, y: 640 }, { x: 1300, y: 700 }, sceneTime, "NO ESCAPE");
      }
    }
    const hostFigure = {
      id: "host_stick",
      state: {
        x: hostX,
        y: hostY,
        scale: 1.34,
        timeSec: sceneTime,
        spineLean: hostLean,
        rightHandProp,
        pointTarget,
        expression: hostExpr,
        gazeTarget: pointTarget
      }
    };
    return {
      backgroundSvg: bg + overlays,
      stickFigures: [hostFigure]
    };
  }
};

// src/scenes/Scene07_HeroinChic.ts
var Scene07_HeroinChic = {
  id: "scene_07_heroinchic",
  name: "90s Heroin Chic, Food Pyramid & Victorian Disease",
  startTime: 57.809,
  endTime: 80.457,
  render(ctx) {
    const { sceneTime, camera } = ctx;
    const isBeat1 = sceneTime < 7.44;
    const isBeat2 = sceneTime >= 7.44 && sceneTime < 16.065;
    const isBeat3 = sceneTime >= 16.065 && sceneTime < 21.825;
    const isBeat4 = sceneTime >= 21.825;
    let hostX = 460;
    let hostY = 650;
    let hostLean = 0;
    let isWalking = false;
    let hostExpr = "deadpan_classic";
    let leftHandProp = "none";
    let pointTarget = void 0;
    let overlays = "";
    let shakeAmt = 0;
    if (isBeat1) {
      camera.setTarget(960, 540, 1);
      hostX = 440;
      hostLean = 8;
      pointTarget = { x: 1260, y: 550 };
      hostExpr = "deadpan_classic";
    } else if (isBeat2) {
      camera.setTarget(960, 540, 1);
      hostX = 440;
      hostLean = 10;
      leftHandProp = "diet_coke";
      pointTarget = { x: 1260, y: 320 };
      hostExpr = "deadpan_side_glance";
    } else if (isBeat3) {
      camera.setTarget(960, 540, 1);
      hostX = 440;
      hostLean = 12;
      leftHandProp = "coffee_cup";
      pointTarget = { x: 1260, y: 640 };
      hostExpr = "smug_sipping_tea";
    } else {
      camera.cutTo(440, 540, 1.35);
      hostX = 440;
      hostExpr = "smug_finger_guns";
    }
    let bg = `
      <!-- Infinite full-bleed backdrop -->
      <rect x="-4000" y="-4000" width="10000" height="10000" fill="#f8fafc"/>
      <line x1="-4000" y1="840" x2="6000" y2="840" stroke="#e2e8f0" stroke-width="4"/>
    `;
    if (isBeat1) {
      const flash = Math.sin(sceneTime * 14) > 0.5;
      bg += `
        <polygon points="1350,-100 1060,840 1640,840" fill="#fef08a" opacity="0.25"/>
        <ellipse cx="1350" cy="840" rx="290" ry="50" fill="#fde047" opacity="0.35"/>
        <ellipse cx="1350" cy="840" rx="90" ry="18" fill="#000000" opacity="0.25"/>

        <!-- Side Runway Strobe Lights -->
        <circle cx="1020" cy="800" r="${flash ? 24 : 12}" fill="${flash ? "#ffffff" : "#cbd5e1"}" filter="${flash ? "url(#glow)" : "none"}"/>
        <circle cx="1680" cy="800" r="${flash ? 24 : 12}" fill="${flash ? "#ffffff" : "#cbd5e1"}" filter="${flash ? "url(#glow)" : "none"}"/>

        <!-- Kate Moss on Runway -->
        ${renderKateMoss({ x: 1350, y: 550, scale: 1.4, timeSec: sceneTime })}
      `;
    } else if (isBeat2) {
      const pyramidTime = sceneTime - 7.44;
      const slam = slamDrop(pyramidTime, 0.22, { x: 1380, y: 460 }, 300);
      if (slam.impactOccurred && pyramidTime < 0.5) {
        shakeAmt = slam.screenShake;
      }
      const showCoke = pyramidTime >= 1.5;
      const showCigs = pyramidTime >= 3.5;
      const showApathy = pyramidTime >= 6;
      bg += `
        <g transform="translate(${slam.x}, ${slam.y}) scale(${slam.scaleX}, ${slam.scaleY})">
          <polygon points="0,-220 -300,200 300,200" fill="#f1f5f9" stroke="#0f172a" stroke-width="9" filter="url(#cardShadow)"/>
          <line x1="-140" y1="10" x2="140" y2="10" stroke="#0f172a" stroke-width="7"/>
          <line x1="-80" y1="-100" x2="80" y2="-100" stroke="#0f172a" stroke-width="7"/>

          <!-- Top Tier: Diet Coke Can -->
          ${showCoke ? `
            <g transform="translate(0, -155) scale(1.3)">
              <rect x="-35" y="-60" width="70" height="110" rx="10" fill="#dc2626" stroke="#111" stroke-width="5" filter="url(#cardShadow)"/>
              <rect x="-28" y="-50" width="56" height="20" fill="#ffffff"/>
              <text x="0" y="-35" font-family="'Impact', sans-serif" font-size="16" fill="#dc2626" text-anchor="middle">DIET</text>
              <text x="0" y="20" font-family="'Impact', sans-serif" font-size="28" fill="#ffffff" text-anchor="middle">Coke</text>
            </g>
          ` : ""}

          <!-- Middle Tier: Parliament Cigarettes with rising smoke -->
          ${showCigs ? `
            <g transform="translate(-80, -40) scale(1.2)">
              <rect x="-45" y="-35" width="90" height="75" rx="6" fill="#1e3a8a" stroke="#111" stroke-width="4"/>
              <text x="0" y="8" font-family="sans-serif" font-size="12" font-weight="bold" fill="#ffffff" text-anchor="middle">PARLIAMENT</text>
            </g>
            <g transform="translate(80, -40) scale(1.2)">
              <rect x="-45" y="-35" width="90" height="75" rx="6" fill="#1e3a8a" stroke="#111" stroke-width="4"/>
              <text x="0" y="8" font-family="sans-serif" font-size="12" font-weight="bold" fill="#ffffff" text-anchor="middle">LIGHTS</text>
            </g>
          ` : ""}

          <!-- Bottom Base Tier: Pure Unfiltered Apathy -->
          ${showApathy ? `
            <g transform="translate(0, 110)">
              <rect x="-250" y="-35" width="500" height="70" rx="10" fill="#0f172a" stroke="#0284c7" stroke-width="5"/>
              <text x="0" y="12" font-family="'Impact', sans-serif" font-size="28" fill="#38bdf8" letter-spacing="2" text-anchor="middle">
                PURE UNFILTERED APATHY
              </text>
            </g>
          ` : ""}
        </g>
      `;
      if (showCoke && !showCigs) {
        overlays += renderHandDrawnCircle({ x: 1380, y: 300 }, 70, 70, sceneTime, "ESSENTIAL NUTRIENT");
      }
      if (showApathy) {
        overlays += renderHandDrawnArrow({ x: 700, y: 560 }, { x: 1140, y: 570 }, sceneTime, "FOUNDATION");
      }
    } else {
      const chaisePop = popInSquash(sceneTime - 16.065, 0.35, { x: 1380, y: 680 });
      bg += `
        <!-- Victorian Chaise Lounge with Contact Shadow -->
        <g transform="translate(${chaisePop.x}, ${chaisePop.y}) scale(${chaisePop.scaleX * 1.35}, ${chaisePop.scaleY * 1.35})" opacity="${chaisePop.opacity}">
          <ellipse cx="0" cy="85" rx="200" ry="18" fill="#000000" opacity="0.22"/>
          <path d="M -190 40 Q -170 -70 -100 -60 L 150 -30 Q 190 -20 190 40 Z" fill="#831843" stroke="#500724" stroke-width="7" filter="url(#cardShadow)"/>
          <line x1="-150" y1="40" x2="-160" y2="85" stroke="#713f12" stroke-width="10" stroke-linecap="round"/>
          <line x1="150" y1="40" x2="160" y2="85" stroke="#713f12" stroke-width="10" stroke-linecap="round"/>

          <!-- Fainting Victorian Stick Figure -->
          <line x1="-100" y1="-30" x2="70" y2="10" stroke="#111" stroke-width="7"/>
          <circle cx="-110" cy="-45" r="26" fill="#fddfb0" stroke="#111" stroke-width="5"/>
          <path d="M -90 -30 Q -100 -60 -125 -50" stroke="#111" stroke-width="6" fill="none"/>
          
          <!-- Ornate Vintage Amber Apothecary Tonic Bottle -->
          <g transform="translate(160, -70) scale(1.3)">
            <rect x="-18" y="-35" width="36" height="70" rx="8" fill="#78350f" stroke="#451a03" stroke-width="3" filter="url(#cardShadow)"/>
            <rect x="-12" y="-18" width="24" height="36" fill="#fef3c7"/>
            <text x="0" y="4" font-family="serif" font-size="10" font-weight="bold" fill="#78350f" text-anchor="middle">TONIC</text>
          </g>

          ${isBeat4 ? `
            <!-- "DEAL WITH IT" 8-Bit Pixel Shades -->
            <g transform="translate(-110, -50) scale(0.9)">
              <rect x="-24" y="-8" width="20" height="16" fill="#000000"/>
              <rect x="4" y="-8" width="20" height="16" fill="#000000"/>
              <rect x="-4" y="-4" width="8" height="6" fill="#000000"/>
            </g>
          ` : ""}
        </g>
      `;
      if (isBeat4) {
        overlays += renderActionLines({ x: 1240, y: 620 }, 140, sceneTime);
      }
    }
    const hostFigure = {
      id: "host_stick",
      state: {
        x: hostX,
        y: hostY,
        scale: 1.34,
        timeSec: sceneTime,
        spineLean: hostLean,
        isWalking,
        leftHandProp,
        pointTarget,
        expression: hostExpr,
        gazeTarget: pointTarget
      }
    };
    return {
      backgroundSvg: bg + overlays,
      stickFigures: [hostFigure],
      shake: shakeAmt
    };
  }
};

// src/scenes/Scene08_PixarMom.ts
var Scene08_PixarMom = {
  id: "scene_08_pixarmom",
  name: "2010s BBL & Pixar Mom Gravitational Field",
  startTime: 80.457,
  endTime: 108.199,
  render(ctx) {
    const { sceneTime, camera } = ctx;
    const isBeat1 = sceneTime < 4.963;
    const isBeat2 = sceneTime >= 4.963 && sceneTime < 14.054;
    const isBeat3 = sceneTime >= 14.054 && sceneTime < 23.654;
    const isBeat4 = sceneTime >= 23.654 && sceneTime < 27.174;
    const isBeat5 = sceneTime >= 27.174;
    let hostX = 520;
    let hostY = 650;
    let hostLean = 0;
    let isWalking = false;
    let hostExpr = "deadpan_classic";
    let pointTarget = void 0;
    let leftHandTarget = void 0;
    let overlays = "";
    let shakeAmt = 0;
    if (isBeat1) {
      camera.setTarget(960, 540, 1);
      hostX = 440;
      hostLean = -14;
      hostExpr = "shock_home_alone";
    } else if (isBeat2) {
      camera.setTarget(960, 540, 1);
      hostX = 440;
      hostLean = 8;
      pointTarget = { x: 1260, y: 540 };
      hostExpr = "confused_squint";
    } else if (isBeat3) {
      camera.setTarget(960, 540, 1);
      hostX = 440;
      hostLean = 20;
      leftHandTarget = { x: 1260, y: 520 };
      pointTarget = { x: 1260, y: 460 };
      hostExpr = "fear_screaming";
    } else if (isBeat4) {
      camera.setTarget(960, 540, 1);
      hostX = 440;
      pointTarget = { x: 1260, y: 320 };
      hostExpr = "smug_rock_eyebrow";
    } else {
      camera.cutTo(440, 540, 1.35);
      hostX = 440;
      hostExpr = "smug_finger_guns";
    }
    let bg = `
      <!-- Infinite full-bleed backdrop -->
      <rect x="-4000" y="-4000" width="10000" height="10000" fill="#f8fafc"/>
      <line x1="-4000" y1="840" x2="6000" y2="840" stroke="#e2e8f0" stroke-width="4"/>
    `;
    if (isBeat1) {
      const reverseSwing = Math.sin(sceneTime * 6) * 0.8;
      const bobX = 1400 + Math.sin(reverseSwing) * 500;
      const bobY = -50 + Math.cos(reverseSwing) * 500;
      bg += `
        <g stroke="#f43f5e" stroke-width="4" opacity="0.7">
          <line x1="900" y1="200" x2="1800" y2="200" stroke-dasharray="30 15"/>
          <line x1="850" y1="300" x2="1850" y2="300" stroke-dasharray="40 20"/>
        </g>
        <line x1="1400" y1="-50" x2="${bobX}" y2="${bobY}" stroke="#475569" stroke-width="10"/>
        <circle cx="${bobX}" cy="${bobY}" r="95" fill="#f43f5e" stroke="#be123c" stroke-width="10"/>
        <text x="${bobX}" y="${bobY + 14}" font-family="'Impact', sans-serif" font-size="32" fill="#ffffff" text-anchor="middle">2010s</text>
      `;
    } else if (isBeat2) {
      const momPop = popInSquash(sceneTime - 4.963, 0.35, { x: 1380, y: 540 });
      const hipGrowth = Math.min(1.85, 1.1 + (sceneTime - 4.963) * 0.08);
      bg += `
        <g transform="translate(${momPop.x - 1380}, ${momPop.y - 540}) scale(${momPop.scaleX}, ${momPop.scaleY})" opacity="${momPop.opacity}">
          ${renderPixarMom({ x: 1380, y: 540, scale: hipGrowth, showOrbit: false, timeSec: sceneTime })}

          <!-- High-Visibility Comic Card -->
          <g transform="translate(1380, 230)">
            <rect x="-180" y="-25" width="360" height="50" rx="12" fill="#0f172a" stroke="#ec4899" stroke-width="4" filter="url(#cardShadow)"/>
            <text x="0" y="8" font-family="'Impact', sans-serif" font-size="22" fill="#f43f5e" letter-spacing="2" text-anchor="middle">
              THE 2010s BBL METAGAME
            </text>
          </g>
        </g>
      `;
      if (sceneTime > 8) {
        overlays += renderHandDrawnCircle({ x: 1380, y: 560 }, 180, 100, sceneTime, "GRAVITATIONAL ANOMALY");
      }
    } else if (isBeat3) {
      bg += `
        <g stroke="#f43f5e" stroke-width="2.5" fill="none" opacity="0.65">
          <ellipse cx="1260" cy="540" rx="420" ry="140" stroke-dasharray="16 10"/>
          <ellipse cx="1260" cy="540" rx="540" ry="180" stroke-dasharray="20 12"/>
        </g>
        ${renderPixarMom({ x: 1260, y: 540, scale: 1.85, showOrbit: true, timeSec: sceneTime })}

        <!-- High-Visibility Comic Card -->
        <g transform="translate(1260, 230)">
          <rect x="-220" y="-25" width="440" height="50" rx="12" fill="#0f172a" stroke="#ec4899" stroke-width="4" filter="url(#cardShadow)"/>
          <text x="0" y="8" font-family="'Impact', sans-serif" font-size="22" fill="#f43f5e" letter-spacing="2" text-anchor="middle">
            GRAVITATIONAL PULL: 10,000G
          </text>
        </g>
      `;
      overlays += renderActionLines({ x: 1260, y: 540 }, 320, sceneTime);
    } else {
      const billTime = sceneTime - 23.654;
      const slam = slamDrop(billTime, 0.22, { x: 1260, y: 320 }, 280);
      if (slam.impactOccurred && billTime < 0.4) {
        shakeAmt = slam.screenShake;
      }
      const planeX = 850 + billTime * 180 % 1e3;
      bg += `
        <!-- Swaying Palm Trees -->
        <path d="M 1740 840 Q 1690 550 1760 380" stroke="#78350f" stroke-width="18" fill="none" stroke-linecap="round"/>
        <path d="M 1760 380 Q 1640 320 1560 360 M 1760 380 Q 1690 250 1660 200 M 1760 380 Q 1840 250 1920 260 M 1760 380 Q 1890 340 1940 400" stroke="#16a34a" stroke-width="16" fill="none" stroke-linecap="round"/>

        <!-- Miami BBL Billboard -->
        <g transform="translate(${slam.x}, ${slam.y}) scale(${slam.scaleX}, ${slam.scaleY})" opacity="${slam.opacity}">
          <rect x="-220" y="-90" width="440" height="180" rx="16" fill="#fdf4ff" stroke="#ec4899" stroke-width="6" filter="url(#cardShadow)"/>
          <text x="0" y="-30" font-family="'Impact', sans-serif" font-size="34" fill="#be185d" text-anchor="middle">MIAMI CLINIC</text>
          <text x="0" y="18" font-family="sans-serif" font-size="22" font-weight="bold" fill="#0284c7" text-anchor="middle">1-Way Flight: $299</text>
          <text x="0" y="58" font-family="sans-serif" font-size="18" font-style="italic" fill="#e11d48" text-anchor="middle">"Definitely not squats"</text>
        </g>

        <!-- Jet Airliner Taking Off -->
        <g transform="translate(${planeX}, 180) rotate(-18) scale(1.2)">
          <path d="M -60 0 L 60 0 L 80 -15 L -40 -15 Z" fill="#ffffff" stroke="#0f172a" stroke-width="4"/>
          <polygon points="0,-15 20,-45 40,-15" fill="#38bdf8"/>
          <polygon points="-40,-15 -55,-40 -30,-15" fill="#f43f5e"/>
          <circle cx="-75" cy="-8" r="16" fill="#cbd5e1" opacity="0.8"/>
          <circle cx="-110" cy="-8" r="22" fill="#e2e8f0" opacity="0.6"/>
        </g>
      `;
      if (sceneTime > 24.5) {
        overlays += renderHandDrawnArrow({ x: 900, y: 440 }, { x: 1200, y: 380 }, sceneTime, "NOT SQUATS");
      }
    }
    const hostFigure = {
      id: "host_stick",
      state: {
        x: hostX,
        y: hostY,
        scale: 1.34,
        timeSec: sceneTime,
        spineLean: hostLean,
        isWalking,
        pointTarget,
        leftHandTarget,
        expression: hostExpr,
        gazeTarget: pointTarget || leftHandTarget
      }
    };
    return {
      backgroundSvg: bg + overlays,
      stickFigures: [hostFigure],
      shake: shakeAmt
    };
  }
};

// src/scenes/Scene09_HourglassPR.ts
var Scene09_HourglassPR = {
  id: "scene_09_hourglass_pr",
  name: "Overfilled Hourglass & Corporate PR Body Positivity",
  startTime: 108.199,
  endTime: 129.384,
  render(ctx) {
    const { sceneTime, camera } = ctx;
    const isBeat1 = sceneTime < 5.199;
    const isBeat2 = sceneTime >= 5.199 && sceneTime < 12.399;
    const isBeat3 = sceneTime >= 12.399 && sceneTime < 17.839;
    const isBeat4 = sceneTime >= 17.839 && sceneTime < 20.639;
    const isBeat5 = sceneTime >= 20.639;
    let hostX = 520;
    let hostY = 650;
    let hostLean = 0;
    let isWalking = false;
    let hostExpr = "deadpan_classic";
    let pointTarget = void 0;
    let overlays = "";
    let shakeAmt = 0;
    if (isBeat1) {
      camera.setTarget(960, 540, 1);
      hostX = 440;
      hostLean = 8;
      pointTarget = { x: 1260, y: 620 };
      hostExpr = "confused_tilted_head";
    } else if (isBeat2) {
      camera.setTarget(960, 540, 1);
      hostX = 440;
      hostLean = 10;
      pointTarget = { x: 1260, y: 520 };
      hostExpr = "skeptical_side_eye";
    } else if (isBeat3) {
      camera.setTarget(960, 540, 1);
      hostX = 440;
      pointTarget = { x: 1260, y: 240 };
      hostExpr = "deadpan_side_glance";
    } else if (isBeat4) {
      camera.setTarget(960, 540, 1);
      hostX = 440;
      hostLean = -14;
      pointTarget = { x: 1260, y: 520 };
      hostExpr = "cringe_teeth_grit";
    } else {
      camera.cutTo(440, 540, 1.35);
      hostX = 440;
      hostExpr = "frustration_facepalm";
    }
    let bg = `
      <!-- Infinite full-bleed backdrop -->
      <rect x="-4000" y="-4000" width="10000" height="10000" fill="#f8fafc"/>
      <line x1="-4000" y1="840" x2="6000" y2="840" stroke="#e2e8f0" stroke-width="4"/>
    `;
    if (isBeat1 || isBeat2 || isBeat3) {
      const sandDropY = sceneTime * 35 % 200;
      const glassPop = popInSquash(sceneTime, 0.35, { x: 1380, y: 520 });
      bg += `
        <!-- Ground Contact Shadow -->
        <ellipse cx="1380" cy="840" rx="220" ry="25" fill="#000000" opacity="0.2"/>

        <g id="overfilled-hourglass" transform="translate(${glassPop.x}, ${glassPop.y}) scale(${glassPop.scaleX * 1.2}, ${glassPop.scaleY * 1.2})">
          <!-- Victorian Brass Plates -->
          <rect x="-160" y="-230" width="320" height="28" rx="8" fill="#ca8a04" stroke="#854d0e" stroke-width="7"/>
          <rect x="-160" y="210" width="320" height="28" rx="8" fill="#ca8a04" stroke="#854d0e" stroke-width="7"/>

          <!-- Polished Brass Pillars -->
          <line x1="-140" y1="-230" x2="-140" y2="210" stroke="#eab308" stroke-width="14" stroke-linecap="round"/>
          <line x1="140" y1="-230" x2="140" y2="210" stroke="#eab308" stroke-width="14" stroke-linecap="round"/>

          <!-- Overfilled Bulb with Specular Glint -->
          <path d="
            M -90 -202
            C -90 -90 -20 -15 -10 0
            C -20 15 -190 80 -190 210
            L 190 210
            C 190 80 20 15 10 0
            C 20 -15 90 -90 90 -202 Z"
            fill="#e0f2fe" fill-opacity="0.4" stroke="#38bdf8" stroke-width="6" filter="url(#cardShadow)"/>

          <!-- Falling Gold Sand -->
          <ellipse cx="0" cy="190" rx="160" ry="35" fill="#eab308"/>
          <line x1="0" y1="0" x2="0" y2="${sandDropY}" stroke="#eab308" stroke-width="7" stroke-dasharray="10 8"/>

          ${isBeat2 || isBeat3 ? `
            <!-- Corporate PR Construction Scaffolding & Banner with Slam Drop -->
            <g id="pr-scaffolding" transform="translate(0, 0)">
              <line x1="-180" y1="-50" x2="180" y2="-50" stroke="#f59e0b" stroke-width="12"/>
              <line x1="-180" y1="50" x2="180" y2="50" stroke="#f59e0b" stroke-width="12"/>
              <line x1="-150" y1="-50" x2="150" y2="50" stroke="#ef4444" stroke-width="7"/>
              <line x1="150" y1="-50" x2="-150" y2="50" stroke="#ef4444" stroke-width="7"/>
              
              <rect x="-150" y="-30" width="300" height="60" rx="10" fill="#fdf4ff" stroke="#ec4899" stroke-width="5" filter="url(#cardShadow)"/>
              <text x="0" y="9" font-family="'Impact', sans-serif" font-size="24" fill="#be185d" text-anchor="middle">
                "BODY POSITIVITY\u2122"
              </text>
            </g>
          ` : ""}
        </g>
      `;
      if (isBeat1 && sceneTime > 1.5) {
        overlays += renderHandDrawnCircle({ x: 1380, y: 640 }, 140, 80, sceneTime, "OVERFILLED");
      }
      if (isBeat3) {
        const billSlam = slamDrop(sceneTime - 12.399, 0.2, { x: 960, y: 240 }, 200);
        bg += `
          <g transform="translate(${billSlam.x}, ${billSlam.y}) scale(${billSlam.scaleX}, ${billSlam.scaleY})">
            <rect x="-180" y="-30" width="360" height="60" rx="8" fill="#ffffff" stroke="#0f172a" stroke-width="3" filter="url(#cardShadow)"/>
            <text x="0" y="8" font-family="sans-serif" font-size="14" font-weight="bold" fill="#dc2626" text-anchor="middle">
              *Offer valid until Q4 pharma rollout
            </text>
          </g>
        `;
        overlays += renderHandDrawnArrow({ x: 740, y: 450 }, { x: 920, y: 280 }, sceneTime, "FINE PRINT");
      }
    } else {
      const vaultSlam = slamDrop(sceneTime - 17.839, 0.22, { x: 1260, y: 520 }, 280);
      if (vaultSlam.impactOccurred && sceneTime - 17.839 < 0.4) {
        shakeAmt = vaultSlam.screenShake;
      }
      bg += `
        <ellipse cx="1260" cy="840" rx="220" ry="25" fill="#000000" opacity="0.2"/>
        <g transform="translate(${vaultSlam.x}, ${vaultSlam.y}) scale(${vaultSlam.scaleX * 1.2}, ${vaultSlam.scaleY * 1.2})">
          <rect x="-160" y="-230" width="320" height="28" rx="8" fill="#ca8a04" stroke="#854d0e" stroke-width="7"/>
          <rect x="-160" y="210" width="320" height="28" rx="8" fill="#ca8a04" stroke="#854d0e" stroke-width="7"/>

          <!-- Peeled PR Sticker -->
          <g transform="translate(-50, -10) rotate(-22)">
            <rect x="-110" y="-28" width="220" height="56" rx="8" fill="#fdf4ff" stroke="#ec4899" stroke-width="4" opacity="0.7"/>
            <text x="0" y="9" font-family="'Impact', sans-serif" font-size="18" fill="#be185d" text-anchor="middle">"BODY POSITIVITY"</text>
          </g>

          <!-- Big Pharma Cash Vault underneath -->
          <g transform="translate(0, 30)">
            <rect x="-210" y="-60" width="420" height="130" rx="14" fill="#064e3b" stroke="#10b981" stroke-width="7" filter="url(#glow)"/>
            <text x="0" y="-12" font-family="'Impact', sans-serif" font-size="26" fill="#34d399" letter-spacing="2" text-anchor="middle">
              Q4 PHARMA REVENUE
            </text>
            <text x="0" y="38" font-family="'Courier New', monospace" font-size="32" font-weight="bold" fill="#6ee7b7" text-anchor="middle">
              +$42,000,000,000
            </text>
          </g>
        </g>
      `;
      if (isBeat4) {
        overlays += renderActionLines({ x: 1260, y: 520 }, 240, sceneTime);
      }
    }
    const hostFigure = {
      id: "host_stick",
      state: {
        x: hostX,
        y: hostY,
        scale: 1.34,
        timeSec: sceneTime,
        spineLean: hostLean,
        isWalking,
        pointTarget,
        expression: hostExpr,
        gazeTarget: pointTarget
      }
    };
    return {
      backgroundSvg: bg + overlays,
      stickFigures: [hostFigure],
      shake: shakeAmt
    };
  }
};

// src/scenes/Scene10_BossClosesTab.ts
var Scene10_BossClosesTab = {
  id: "scene_10_boss_closes_tab",
  name: "Fidget Spinner, Podcast & Boss Closes Tab",
  startTime: 129.384,
  endTime: 150.857,
  render(ctx) {
    const { sceneTime, camera } = ctx;
    const isBeat1 = sceneTime < 6;
    const isBeat2 = sceneTime >= 6 && sceneTime < 8.804;
    const isBeat3 = sceneTime >= 8.804 && sceneTime < 17.116;
    const isBeat4 = sceneTime >= 17.116 && sceneTime < 20.884;
    const isBeat5 = sceneTime >= 20.884;
    let hostX = 520;
    let hostY = 650;
    let hostLean = 0;
    let hostExpr = "deadpan_classic";
    let leftHandProp = "none";
    let rightHandProp = "none";
    let pointTarget = void 0;
    let leftHandTarget = void 0;
    let shakeAmt = 0;
    let overlays = "";
    if (isBeat1) {
      camera.setTarget(960, 540, 1);
      hostX = 440;
      leftHandProp = "fidget_spinner";
      pointTarget = { x: 1260, y: 440 };
      hostExpr = "deadpan_classic";
    } else if (isBeat2) {
      camera.setTarget(960, 540, 1);
      hostX = 440;
      rightHandProp = "mic";
      pointTarget = { x: 1260, y: 480 };
      hostExpr = "deadpan_side_glance";
    } else if (isBeat3) {
      camera.setTarget(960, 540, 1);
      hostX = 440;
      hostLean = Math.sin(sceneTime * 24) * 3;
      hostExpr = "fear_sweat_freeze";
    } else if (isBeat4) {
      camera.setTarget(960, 540, 1);
      hostX = 440;
      hostLean = 18;
      pointTarget = { x: 1260, y: 520 };
      leftHandTarget = { x: 1260, y: 520 };
      hostExpr = "fear_screaming";
      const slam = slamDrop(sceneTime - 17.116, 0.18, { x: 1260, y: 500 }, 300);
      if (slam.impactOccurred && sceneTime - 17.116 < 0.4) {
        shakeAmt = slam.screenShake;
      }
    } else {
      camera.cutTo(440, 540, 1.35);
      hostX = 440;
      hostExpr = "exhausted_melting";
    }
    let bg = `
      <!-- Infinite full-bleed backdrop -->
      <rect x="-4000" y="-4000" width="10000" height="10000" fill="#f8fafc"/>
      <line x1="-4000" y1="840" x2="6000" y2="840" stroke="#e2e8f0" stroke-width="4"/>
    `;
    if (isBeat1) {
      const spin = sceneTime * 1440;
      bg += `
        <g transform="translate(1380, 440) scale(1.35)">
          <circle cx="0" cy="0" r="170" fill="none" stroke="#38bdf8" stroke-width="5" stroke-dasharray="24 16" opacity="0.6"/>
          <circle cx="0" cy="0" r="230" fill="none" stroke="#ec4899" stroke-width="4" stroke-dasharray="32 20" opacity="0.4"/>

          <g transform="rotate(${spin})">
            <circle cx="0" cy="0" r="40" fill="#0f172a" stroke="#ffffff" stroke-width="6"/>
            <g transform="rotate(0)">
              <rect x="-26" y="-130" width="52" height="130" rx="26" fill="#06b6d4" stroke="#0f172a" stroke-width="7"/>
              <circle cx="0" cy="-100" r="18" fill="#ffffff" stroke="#0f172a" stroke-width="4"/>
            </g>
            <g transform="rotate(120)">
              <rect x="-26" y="-130" width="52" height="130" rx="26" fill="#f59e0b" stroke="#0f172a" stroke-width="7"/>
              <circle cx="0" cy="-100" r="18" fill="#ffffff" stroke="#0f172a" stroke-width="4"/>
            </g>
            <g transform="rotate(240)">
              <rect x="-26" y="-130" width="52" height="130" rx="26" fill="#ec4899" stroke="#0f172a" stroke-width="7"/>
              <circle cx="0" cy="-100" r="18" fill="#ffffff" stroke="#0f172a" stroke-width="4"/>
            </g>
          </g>

          <text x="0" y="230" font-family="'Impact', sans-serif" font-size="32" fill="#0f172a" text-anchor="middle">
            3600 RPM SPEEDRUN
          </text>
        </g>
      `;
      overlays += renderHandDrawnCircle({ x: 1380, y: 440 }, 180, 180, sceneTime, "OBSOLETE IN 2 WEEKS");
    } else if (isBeat2) {
      bg += `
        <g transform="translate(1380, 480) scale(1.3)">
          <line x1="0" y1="120" x2="0" y2="360" stroke="#475569" stroke-width="14"/>
          <ellipse cx="0" cy="360" rx="90" ry="24" fill="#334155"/>
          <rect x="-35" y="20" width="70" height="115" rx="35" fill="#64748b" stroke="#334155" stroke-width="7"/>
          <rect x="-26" y="30" width="52" height="46" rx="5" fill="#1e293b"/>

          <g transform="translate(0, -75)">
            <rect x="-160" y="-35" width="320" height="70" rx="12" fill="#fee2e2" stroke="#dc2626" stroke-width="5" filter="url(#cardShadow)"/>
            <text x="0" y="10" font-family="'Impact', sans-serif" font-size="26" fill="#991b1b" text-anchor="middle">
              PODCAST (0 LISTENERS)
            </text>
          </g>
        </g>
      `;
      overlays += renderHandDrawnArrow({ x: 740, y: 520 }, { x: 1200, y: 420 }, sceneTime, "NO AUDIENCE");
    } else if (isBeat3) {
      bg += `
        ${renderBossShadow(1380, 220, sceneTime)}
      `;
      overlays += renderActionLines({ x: 540, y: 560 }, 180, sceneTime);
    } else {
      const slam = slamDrop(sceneTime - 17.116, 0.18, { x: 1320, y: 500 }, 300);
      bg += `
        ${renderBossShadow(1540, 220, sceneTime)}

        <!-- Browser Window Tab -->
        <g transform="translate(1320, 240)">
          <rect x="-260" y="-40" width="520" height="80" rx="12" fill="#1e293b" stroke="#0f172a" stroke-width="5" filter="url(#cardShadow)"/>
          <text x="-230" y="10" font-family="sans-serif" font-size="18" fill="#94a3b8">reddit.com/r/memes</text>
          <circle cx="220" cy="0" r="16" fill="#ef4444"/>
          <text x="220" y="7" font-family="sans-serif" font-size="18" font-weight="bold" fill="#fff" text-anchor="middle">X</text>
        </g>

        <!-- Colossal Red 3D Keycap Press Slamming -->
        <g transform="translate(${slam.x}, ${slam.y}) scale(${slam.scaleX * 1.15}, ${slam.scaleY * 1.15})" opacity="${slam.opacity}">
          <rect x="-240" y="-80" width="480" height="160" rx="20" fill="#991b1b" stroke="#7f1d1d" stroke-width="8" filter="url(#cardShadow)"/>
          <rect x="-220" y="-70" width="440" height="130" rx="14" fill="#ef4444"/>
          <text x="0" y="16" font-family="'Impact', sans-serif" font-size="62" fill="#ffffff" letter-spacing="5" text-anchor="middle">
            Ctrl + W
          </text>
          <text x="0" y="52" font-family="sans-serif" font-size="16" font-weight="bold" fill="#fee2e2" letter-spacing="2" text-anchor="middle">
            EMERGENCY TAB CLOSE
          </text>
        </g>
      `;
      if (sceneTime > 17.3 && sceneTime < 19.5) {
        overlays += renderActionLines({ x: 1320, y: 500 }, 300, sceneTime);
      }
    }
    const hostFigure = {
      id: "host_stick",
      state: {
        x: hostX,
        y: hostY,
        scale: 1.34,
        timeSec: sceneTime,
        spineLean: hostLean,
        leftHandProp,
        rightHandProp,
        pointTarget,
        leftHandTarget,
        mouthWobble: isBeat3 ? 0.9 : 0,
        expression: hostExpr,
        gazeTarget: isBeat3 ? { x: 1380, y: 220 } : pointTarget
      }
    };
    return {
      backgroundSvg: bg + overlays,
      stickFigures: [hostFigure],
      shake: shakeAmt
    };
  }
};

// src/scenes/Scene11_Y2KFashion.ts
var Scene11_Y2KFashion = {
  id: "scene_11_y2k_fashion",
  name: "Y2K Organ-Hostile Fashion & Miu Miu Micro-Belt",
  startTime: 150.857,
  endTime: 183.851,
  render(ctx) {
    const { sceneTime, camera } = ctx;
    const isBeat1 = sceneTime < 6.243;
    const isBeat2 = sceneTime >= 6.243 && sceneTime < 12.826;
    const isBeat3 = sceneTime >= 12.826 && sceneTime < 19.386;
    const isBeat4 = sceneTime >= 19.386 && sceneTime < 25.914;
    const isBeat5 = sceneTime >= 25.914;
    let hostX = 520;
    let hostY = 650;
    let hostLean = 0;
    let isWalking = false;
    let hostExpr = "deadpan_classic";
    let pointTarget = void 0;
    let overlays = "";
    let shakeAmt = 0;
    if (isBeat1) {
      camera.setTarget(960, 540, 1);
      hostX = 440;
      hostLean = 8;
      pointTarget = { x: 1260, y: 500 };
      hostExpr = "smug_rock_eyebrow";
    } else if (isBeat2) {
      camera.setTarget(960, 540, 1);
      hostX = 440;
      hostLean = 14;
      pointTarget = { x: 1260, y: 640 };
      hostExpr = "disgust_shudder";
    } else if (isBeat3) {
      camera.setTarget(960, 540, 1);
      hostX = 440;
      pointTarget = { x: 1260, y: 490 };
      hostExpr = "confused_squint";
    } else if (isBeat4) {
      camera.setTarget(960, 540, 1);
      hostX = 440;
      hostLean = -14;
      pointTarget = { x: 1260, y: 620 };
      hostExpr = "shock_eye_pop";
    } else {
      camera.cutTo(440, 540, 1.35);
      hostX = 440;
      pointTarget = { x: 1260, y: 480 };
      hostExpr = "deadpan_shrug";
    }
    let bg = `
      <!-- Infinite full-bleed backdrop -->
      <rect x="-4000" y="-4000" width="10000" height="10000" fill="#f8fafc"/>
      <line x1="-4000" y1="840" x2="6000" y2="840" stroke="#e2e8f0" stroke-width="4"/>
    `;
    if (isBeat1) {
      const denimPop = popInSquash(sceneTime, 0.35, { x: 1250, y: 480 });
      bg += `
        <g transform="translate(${denimPop.x}, ${denimPop.y}) scale(${denimPop.scaleX * 1.8}, ${denimPop.scaleY * 1.8})" opacity="${denimPop.opacity}">
          <path d="M -90 -40 L 90 -40 L 110 180 L 30 180 L 15 20 L -15 20 L -30 180 L -110 180 Z" fill="#e0f2fe" stroke="#0284c7" stroke-width="6" stroke-dasharray="14 10"/>
          <rect x="-140" y="-80" width="280" height="40" rx="8" fill="#0f172a" stroke="#0284c7" stroke-width="3"/>
          <text x="0" y="-54" font-family="'Impact', sans-serif" font-size="20" fill="#38bdf8" text-anchor="middle">Y2K LOW-RISE DENIM META</text>
        </g>
      `;
    } else if (isBeat2) {
      const evictTime = sceneTime - 6.243;
      const slam = slamDrop(evictTime, 0.22, { x: 1250, y: 260 }, 300);
      if (slam.impactOccurred && evictTime < 0.4) {
        shakeAmt = slam.screenShake;
      }
      bg += `
        <!-- Evicted Organs Grounded on Floor (Scale 2.0) -->
        <g transform="translate(1250, 640) scale(1.9)">
          ${renderEvictedOrgans(0, 0, sceneTime)}
        </g>

        <!-- Slamming Red Eviction Notice Stamp -->
        <g transform="translate(${slam.x}, ${slam.y}) rotate(-8) scale(${slam.scaleX * 1.3}, ${slam.scaleY * 1.3})" opacity="${slam.opacity}">
          <rect x="-180" y="-50" width="360" height="100" rx="16" fill="#fee2e2" stroke="#dc2626" stroke-width="9" filter="url(#cardShadow)"/>
          <text x="0" y="14" font-family="'Impact', sans-serif" font-size="34" fill="#991b1b" letter-spacing="3" text-anchor="middle">
            EVICTION NOTICE
          </text>
          <text x="0" y="38" font-family="sans-serif" font-size="14" font-weight="bold" fill="#dc2626" text-anchor="middle">
            [ALL ORGANS MUST VACATE BY 2002]
          </text>
        </g>
      `;
      overlays += renderHandDrawnArrow({ x: 650, y: 580 }, { x: 1050, y: 640 }, sceneTime, "INTERNAL ORGANS LEAVING");
    } else if (isBeat3) {
      const manPop = popInSquash(sceneTime - 12.826, 0.35, { x: 1250, y: 540 });
      bg += `
        <g transform="translate(${manPop.x}, ${manPop.y}) scale(${manPop.scaleX * 1.85}, ${manPop.scaleY * 1.85})" opacity="${manPop.opacity}">
          <ellipse cx="0" cy="180" rx="75" ry="18" fill="#334155" stroke="#0f172a" stroke-width="4" filter="url(#cardShadow)"/>
          <line x1="0" y1="60" x2="0" y2="180" stroke="#475569" stroke-width="12"/>

          <circle cx="0" cy="-120" r="32" fill="none" stroke="#111" stroke-width="7"/>
          <line x1="0" y1="-88" x2="0" y2="30" stroke="#111" stroke-width="8"/>
          
          <!-- Napkin Baby Tee -->
          <rect x="-45" y="-75" width="90" height="52" rx="6" fill="#f43f5e" stroke="#111" stroke-width="5"/>
          <text x="0" y="-44" font-family="'Impact', sans-serif" font-size="18" fill="#fff" text-anchor="middle">BABY TEE</text>

          <polygon points="-60,-20 60,-20 90,75 -90,75" fill="#a16207" stroke="#78350f" stroke-width="7"/>
          <line x1="-25" y1="75" x2="-25" y2="178" stroke="#111" stroke-width="8"/>
          <line x1="25" y1="75" x2="25" y2="178" stroke="#111" stroke-width="8"/>

          <!-- High-Visibility Label Badge -->
          <g transform="translate(0, -180)">
            <rect x="-230" y="-30" width="460" height="60" rx="10" fill="#0f172a" stroke="#f43f5e" stroke-width="5" filter="url(#cardShadow)"/>
            <text x="0" y="8" font-family="'Impact', sans-serif" font-size="22" fill="#fda4af" letter-spacing="1" text-anchor="middle">
              ACTUAL SIZE: DINNER NAPKIN
            </text>
          </g>
        </g>
      `;
      overlays += renderHandDrawnCircle({ x: 1250, y: 440 }, 140, 90, sceneTime, "4x4 INCHES");
    } else if (isBeat4) {
      const tagSwing = Math.sin((sceneTime - 19.386) * 8) * Math.exp(-(sceneTime - 19.386) * 0.3) * 22;
      bg += `
        <g transform="translate(1250, 540) scale(1.85)">
          <ellipse cx="0" cy="180" rx="75" ry="18" fill="#334155" stroke="#0f172a" stroke-width="4" filter="url(#cardShadow)"/>
          <line x1="0" y1="-10" x2="0" y2="180" stroke="#475569" stroke-width="12"/>

          <circle cx="0" cy="-120" r="32" fill="none" stroke="#111" stroke-width="7"/>
          <line x1="0" y1="-88" x2="0" y2="30" stroke="#111" stroke-width="8"/>
          <rect x="-45" y="-75" width="90" height="52" rx="6" fill="#f43f5e" stroke="#111" stroke-width="5"/>
          <text x="0" y="-44" font-family="'Impact', sans-serif" font-size="18" fill="#fff" text-anchor="middle">BABY TEE</text>

          <!-- Microscopic 1-Inch Leather Belt -->
          <rect x="-70" y="-20" width="140" height="26" rx="4" fill="#78350f" stroke="#451a03" stroke-width="6"/>
          <rect x="-15" y="-26" width="30" height="38" rx="5" fill="#eab308" stroke="#a16207" stroke-width="4"/>

          <line x1="-25" y1="-10" x2="-25" y2="178" stroke="#111" stroke-width="8"/>
          <line x1="25" y1="-10" x2="25" y2="178" stroke="#111" stroke-width="8"/>

          <!-- Dangling Gold Foil $2,400.00 Price Tag on String -->
          <g transform="translate(70, -10) rotate(${tagSwing})">
            <line x1="0" y1="0" x2="55" y2="55" stroke="#94a3b8" stroke-width="4.5" stroke-dasharray="6 4"/>
            <g transform="translate(55, 55) rotate(10)">
              <polygon points="-15,-5 240,-35 270,65 15,95" fill="#fef08a" stroke="#ca8a04" stroke-width="6" filter="url(#glow)"/>
              <circle cx="15" cy="18" r="8" fill="#78350f"/>
              <text x="135" y="42" font-family="'Impact', sans-serif" font-size="42" fill="#dc2626" text-anchor="middle">
                $2,400.00
              </text>
            </g>
          </g>
        </g>
      `;
      overlays += renderHandDrawnCircle({ x: 1450, y: 580 }, 180, 110, sceneTime, "JUST A BELT");
      overlays += renderActionLines({ x: 1450, y: 580 }, 220, sceneTime);
    } else {
      const errSlam = slamDrop(sceneTime - 25.914, 0.2, { x: 1250, y: 480 }, 220);
      bg += `
        <g transform="translate(${errSlam.x}, ${errSlam.y}) scale(${errSlam.scaleX * 1.4}, ${errSlam.scaleY * 1.4})" opacity="${errSlam.opacity}">
          <rect x="-240" y="-120" width="480" height="240" rx="16" fill="#0f172a" stroke="#ef4444" stroke-width="7" filter="url(#cardShadow)"/>
          <text x="0" y="-60" font-family="'Impact', sans-serif" font-size="34" fill="#ef4444" text-anchor="middle">
            [ERROR 404]
          </text>
          <text x="0" y="-15" font-family="sans-serif" font-size="20" font-weight="bold" fill="#ffffff" text-anchor="middle">
            DIGESTIVE SYSTEM INCOMPATIBLE
          </text>
          <text x="0" y="22" font-family="sans-serif" font-size="17" fill="#94a3b8" text-anchor="middle">
            WITH CURRENT FASHION META
          </text>
          
          <g transform="translate(0, 75)">
            <rect x="-45" y="-18" width="90" height="36" rx="5" fill="#fef3c7" stroke="#d97706" stroke-width="4"/>
            <circle cx="-20" cy="0" r="2.5" fill="#b45309"/>
            <circle cx="0" cy="0" r="2.5" fill="#b45309"/>
            <circle cx="20" cy="0" r="2.5" fill="#b45309"/>
          </g>
        </g>
      `;
    }
    const hostFigure = {
      id: "host_stick",
      state: {
        x: hostX,
        y: hostY,
        scale: 1.34,
        timeSec: sceneTime,
        spineLean: hostLean,
        isWalking,
        pointTarget,
        expression: hostExpr,
        gazeTarget: pointTarget
      }
    };
    return {
      backgroundSvg: bg + overlays,
      stickFigures: [hostFigure],
      shake: shakeAmt
    };
  }
};

// src/character/CartoonComedyPuppets.ts
function renderShiveringStomachPuppet(x, y, timeSec = 0) {
  const shiverX = Math.sin(timeSec * 28) * 4;
  const chatteringJaw = Math.abs(Math.sin(timeSec * 16)) * 8;
  const sweatY = timeSec * 45 % 40;
  return `
    <g id="puppet-shivering-stomach" transform="translate(${x + shiverX}, ${y}) scale(1.6)" filter="url(#cardShadow)">
      <!-- Ground Shadow -->
      <ellipse cx="0" cy="110" rx="140" ry="20" fill="#000000" opacity="0.2"/>

      <!-- Giant Shivering Stomach Body -->
      <path d="M -90 -60 C -140 20 -10 130 90 40 C 130 -40 20 -100 -90 -60 Z" fill="#fda4af" stroke="#e11d48" stroke-width="8"/>
      
      <!-- Big Shivering Cartoon Eyes -->
      <circle cx="-35" cy="-20" r="22" fill="#ffffff" stroke="#111" stroke-width="5"/>
      <circle cx="-35" cy="-20" r="9" fill="#111"/>
      <circle cx="25" cy="-30" r="22" fill="#ffffff" stroke="#111" stroke-width="5"/>
      <circle cx="25" cy="-30" r="9" fill="#111"/>

      <!-- Chattering Teeth / Mouth -->
      <g transform="translate(-10, 20)">
        <rect x="-30" y="0" width="60" height="${14 + chatteringJaw}" rx="4" fill="#ffffff" stroke="#111" stroke-width="4"/>
        <line x1="-15" y1="0" x2="-15" y2="${14 + chatteringJaw}" stroke="#111" stroke-width="3"/>
        <line x1="0" y1="0" x2="0" y2="${14 + chatteringJaw}" stroke="#111" stroke-width="3"/>
        <line x1="15" y1="0" x2="15" y2="${14 + chatteringJaw}" stroke="#111" stroke-width="3"/>
      </g>

      <!-- Flying Sweat Drops -->
      <path d="M 60 ${-60 + sweatY} C 50 ${-75 + sweatY} 70 ${-75 + sweatY} 60 ${-60 + sweatY} Z" fill="#38bdf8"/>
      <path d="M -80 ${-40 + sweatY} C -90 ${-55 + sweatY} -70 ${-55 + sweatY} -80 ${-40 + sweatY} Z" fill="#38bdf8"/>

      <!-- Heavy Wrapped Steel Chains -->
      <line x1="-130" y1="-10" x2="110" y2="30" stroke="#334155" stroke-width="14" stroke-linecap="round"/>
      <line x1="-130" y1="30" x2="110" y2="-10" stroke="#334155" stroke-width="14" stroke-linecap="round"/>
      <line x1="-130" y1="-10" x2="110" y2="30" stroke="#94a3b8" stroke-width="5" stroke-dasharray="14 10"/>

      <!-- Heavy Brass Padlock -->
      <g transform="translate(-10, 10)">
        <rect x="-35" y="-10" width="70" height="60" rx="10" fill="#facc15" stroke="#ca8a04" stroke-width="6"/>
        <path d="M -20 -10 L -20 -32 C -20 -50 20 -50 20 -32 L 20 -10" fill="none" stroke="#ca8a04" stroke-width="8"/>
        <circle cx="0" cy="18" r="6" fill="#78350f"/>
        <line x1="0" y1="18" x2="0" y2="32" stroke="#78350f" stroke-width="4"/>
      </g>

      <!-- Comic Hand-Drawn Callout -->
      <g transform="translate(0, -110)">
        <rect x="-160" y="-25" width="320" height="50" rx="12" fill="#0f172a" stroke="#ef4444" stroke-width="4"/>
        <text x="0" y="8" font-family="'Impact', sans-serif" font-size="20" fill="#f87171" letter-spacing="1" text-anchor="middle">
          MOTILITY: FROZEN SOLID
        </text>
      </g>
    </g>
  `;
}
function renderSciFiPharmaDoctor(x, y, timeSec = 0) {
  const armAngle = Math.sin(timeSec * 8) * 12;
  return `
    <g id="puppet-pharma-doctor" transform="translate(${x}, ${y}) scale(1.6)" filter="url(#cardShadow)">
      <!-- Ground Shadow -->
      <ellipse cx="0" cy="120" rx="110" ry="18" fill="#000000" opacity="0.2"/>

      <!-- Doctor Head -->
      <circle cx="0" cy="-60" r="38" fill="#fddfb0" stroke="#111" stroke-width="5"/>
      <!-- Doctor Mirror Headband -->
      <ellipse cx="-15" cy="-85" rx="14" ry="14" fill="#cbd5e1" stroke="#475569" stroke-width="4"/>
      <line x1="-38" y1="-75" x2="38" y2="-75" stroke="#475569" stroke-width="4"/>
      <!-- Smug Doctor Expression -->
      <ellipse cx="-12" cy="-62" rx="4" ry="5" fill="#111"/>
      <ellipse cx="16" cy="-62" rx="4" ry="5" fill="#111"/>
      <path d="M -8 -45 Q 6 -32 20 -48" fill="none" stroke="#111" stroke-width="4" stroke-linecap="round"/>

      <!-- White Lab Coat Body -->
      <polygon points="-30,-22 30,-22 45,90 -45,90" fill="#ffffff" stroke="#111" stroke-width="6"/>
      <polygon points="-8,-22 8,-22 0,40" fill="#0284c7"/>
      <!-- Stethoscope -->
      <path d="M -20 -15 Q 0 35 20 -15" fill="none" stroke="#334155" stroke-width="5"/>
      <circle cx="0" cy="35" r="8" fill="#cbd5e1" stroke="#334155" stroke-width="3"/>

      <!-- Legs -->
      <line x1="-20" y1="90" x2="-20" y2="120" stroke="#111" stroke-width="6"/>
      <line x1="20" y1="90" x2="20" y2="120" stroke="#111" stroke-width="6"/>

      <!-- Wielding Giant Sci-Fi Auto-Injector Pen -->
      <g transform="translate(25, 10) rotate(${-20 + armAngle})">
        <line x1="-40" y1="0" x2="120" y2="0" stroke="#0284c7" stroke-width="26" stroke-linecap="round" filter="url(#glow)"/>
        <line x1="-40" y1="0" x2="80" y2="0" stroke="#38bdf8" stroke-width="14" stroke-linecap="round"/>
        <polygon points="120,-10 160,0 120,10" fill="#94a3b8" stroke="#475569" stroke-width="3"/>
        <circle cx="-40" cy="0" r="16" fill="#38bdf8"/>
        <!-- Measurement markings -->
        <line x1="0" y1="-8" x2="0" y2="8" stroke="#ffffff" stroke-width="3"/>
        <line x1="30" y1="-8" x2="30" y2="8" stroke="#ffffff" stroke-width="3"/>
        <line x1="60" y1="-8" x2="60" y2="8" stroke="#ffffff" stroke-width="3"/>
      </g>

      <!-- Label -->
      <g transform="translate(0, -120)">
        <rect x="-170" y="-25" width="340" height="50" rx="10" fill="#0f172a" stroke="#0284c7" stroke-width="4"/>
        <text x="0" y="8" font-family="'Impact', sans-serif" font-size="20" fill="#38bdf8" letter-spacing="1" text-anchor="middle">
          CONCIERGE GLP-1 DOCTOR
        </text>
      </g>
    </g>
  `;
}
function renderWednesdayThingPerformance(x, y, timeSec = 0) {
  const danceCycle = Math.sin(timeSec * 14);
  const armL_Angle = danceCycle * 35;
  const armR_Angle = -danceCycle * 35;
  const thingHop = Math.abs(Math.sin(timeSec * 12)) * 18;
  const thingX = 90 + Math.sin(timeSec * 4) * 30;
  return `
    <g id="puppet-wednesday-dance" transform="translate(${x}, ${y}) scale(1.6)" filter="url(#cardShadow)">
      <!-- Wednesday Shadow -->
      <ellipse cx="0" cy="115" rx="80" ry="16" fill="#000000" opacity="0.25"/>

      <!-- Wednesday Head -->
      <circle cx="0" cy="-60" r="32" fill="#f8fafc" stroke="#09090b" stroke-width="5"/>
      <!-- Long Gothic Braids -->
      <path d="M -30 -50 C -55 -20 -45 20 -40 70" fill="none" stroke="#09090b" stroke-width="12" stroke-linecap="round"/>
      <path d="M 30 -50 C 55 -20 45 20 40 70" fill="none" stroke="#09090b" stroke-width="12" stroke-linecap="round"/>
      <!-- Deadpan Wednesday Face -->
      <ellipse cx="-10" cy="-60" rx="4" ry="4" fill="#09090b"/>
      <ellipse cx="10" cy="-60" rx="4" ry="4" fill="#09090b"/>
      <line x1="-8" y1="-44" x2="8" y2="-44" stroke="#09090b" stroke-width="3.5"/>

      <!-- Gothic Layered Ruffled Prom Dress -->
      <polygon points="-26,-28 26,-28 50,85 -50,85" fill="#09090b" stroke="#18181b" stroke-width="5"/>
      <ellipse cx="0" cy="85" rx="52" ry="16" fill="#18181b"/>
      <polygon points="-12,-28 12,-28 0,-8" fill="#ffffff"/>

      <!-- Left Angular Dancing Arm -->
      <g transform="translate(-24, -22) rotate(${armL_Angle})">
        <line x1="0" y1="0" x2="-35" y2="35" stroke="#09090b" stroke-width="8" stroke-linecap="round"/>
        <line x1="-35" y1="35" x2="-15" y2="70" stroke="#09090b" stroke-width="7" stroke-linecap="round"/>
      </g>

      <!-- Right Angular Dancing Arm -->
      <g transform="translate(24, -22) rotate(${armR_Angle})">
        <line x1="0" y1="0" x2="35" y2="35" stroke="#09090b" stroke-width="8" stroke-linecap="round"/>
        <line x1="35" y1="35" x2="15" y2="70" stroke="#09090b" stroke-width="7" stroke-linecap="round"/>
      </g>

      <!-- Thing (The Hand) Hopping on Floor -->
      <g transform="translate(${thingX}, ${105 - thingHop}) scale(0.8)">
        <ellipse cx="0" cy="15" rx="22" ry="6" fill="#000000" opacity="0.2"/>
        <path d="M -15 10 C -25 -10 -5 -25 5 -20 C 12 -15 18 -5 20 10 Z" fill="#fddfb0" stroke="#111" stroke-width="3"/>
        <line x1="-10" y1="-8" x2="10" y2="-8" stroke="#ef4444" stroke-width="2" stroke-dasharray="3 2"/>
        <line x1="-12" y1="10" x2="-16" y2="20" stroke="#111" stroke-width="4"/>
        <line x1="-4" y1="10" x2="-4" y2="22" stroke="#111" stroke-width="4"/>
        <line x1="6" y1="10" x2="8" y2="22" stroke="#111" stroke-width="4"/>
        <line x1="14" y1="10" x2="18" y2="20" stroke="#111" stroke-width="4"/>
      </g>

      <!-- Comic Label -->
      <g transform="translate(0, -115)">
        <rect x="-180" y="-25" width="360" height="50" rx="10" fill="#09090b" stroke="#a855f7" stroke-width="4"/>
        <text x="0" y="8" font-family="'Impact', sans-serif" font-size="20" fill="#c084fc" letter-spacing="1" text-anchor="middle">
          WEDNESDAY ADDAMS DANCE
        </text>
      </g>
    </g>
  `;
}
function renderMCUSuperheroPuppet(x, y, timeSec = 0) {
  const flexPulse = 1 + Math.sin(timeSec * 8) * 0.05;
  const pantSweat = timeSec * 50 % 30;
  return `
    <g id="puppet-mcu-superhero" transform="translate(${x}, ${y}) scale(1.6)" filter="url(#cardShadow)">
      <!-- Giant Comic Muscles -->
      <g transform="scale(${flexPulse})">
        <!-- Superhero Torso -->
        <polygon points="-50,-30 50,-30 25,80 -25,80" fill="#1e1b4b" stroke="#312e81" stroke-width="7"/>
        <polygon points="-40,-25 40,-25 0,35" fill="#facc15"/>

        <!-- Balloon Biceps Left -->
        <g transform="translate(-70, -10)">
          <circle cx="0" cy="0" r="38" fill="#fddfb0" stroke="#111" stroke-width="6"/>
          <path d="M -15 -10 Q 0 5 15 -5" fill="none" stroke="#ef4444" stroke-width="4"/>
          <!-- Forearm -->
          <ellipse cx="-20" cy="35" rx="20" ry="30" fill="#fddfb0" stroke="#111" stroke-width="5"/>
        </g>

        <!-- Balloon Biceps Right -->
        <g transform="translate(70, -10)">
          <circle cx="0" cy="0" r="38" fill="#fddfb0" stroke="#111" stroke-width="6"/>
          <path d="M -15 -10 Q 0 5 15 -5" fill="none" stroke="#ef4444" stroke-width="4"/>
          <!-- Forearm -->
          <ellipse cx="20" cy="35" rx="20" ry="30" fill="#fddfb0" stroke="#111" stroke-width="5"/>
        </g>

        <!-- Superhero Head -->
        <circle cx="0" cy="-65" r="32" fill="#fddfb0" stroke="#111" stroke-width="5"/>
        <path d="M -22 -65 Q 0 -80 22 -65" fill="#facc15" stroke="#ca8a04" stroke-width="4"/>
        <ellipse cx="-10" cy="-62" rx="4" ry="4" fill="#111"/>
        <ellipse cx="10" cy="-62" rx="4" ry="4" fill="#111"/>
        <ellipse cx="0" cy="-45" rx="8" ry="12" fill="#111"/>

        <!-- Tiny Chicken Legs -->
        <line x1="-15" y1="80" x2="-15" y2="125" stroke="#111" stroke-width="5"/>
        <line x1="15" y1="80" x2="15" y2="125" stroke="#111" stroke-width="5"/>
      </g>

      <!-- Dehydration Sweat -->
      <circle cx="35" cy="${-80 + pantSweat}" r="4" fill="#38bdf8"/>
      <circle cx="-35" cy="${-75 + pantSweat}" r="4" fill="#38bdf8"/>

      <!-- Label -->
      <g transform="translate(0, -125)">
        <rect x="-190" y="-25" width="380" height="50" rx="10" fill="#0f172a" stroke="#ef4444" stroke-width="4"/>
        <text x="0" y="8" font-family="'Impact', sans-serif" font-size="20" fill="#f87171" letter-spacing="1" text-anchor="middle">
          MCU DEHYDRATION PROTOCOL (1.2% WATER)
        </text>
      </g>
    </g>
  `;
}
function renderCrazedSurgeonScoop(x, y, timeSec = 0) {
  const scoopArm = Math.sin(timeSec * 10) * 18;
  return `
    <g id="puppet-crazed-surgeon" transform="translate(${x}, ${y}) scale(1.6)" filter="url(#cardShadow)">
      <!-- Surgeon Head with Loupes -->
      <circle cx="-40" cy="-60" r="35" fill="#fddfb0" stroke="#111" stroke-width="5"/>
      <ellipse cx="-40" cy="-90" rx="40" ry="20" fill="#0d9488"/>
      <!-- Loupe Binoculars -->
      <rect x="-65" y="-68" width="50" height="18" rx="4" fill="#334155" stroke="#111" stroke-width="3"/>
      <circle cx="-55" cy="-59" r="7" fill="#38bdf8"/>
      <circle cx="-25" cy="-59" r="7" fill="#38bdf8"/>

      <!-- Teal Scrubs Body -->
      <polygon points="-70,-25 -10,-25 0,90 -80,90" fill="#0d9488" stroke="#111" stroke-width="6"/>

      <!-- Arm Wielding Giant Chrome Ice Cream Scoop -->
      <g transform="translate(-10, -5) rotate(${scoopArm})">
        <line x1="0" y1="0" x2="70" y2="10" stroke="#111" stroke-width="8" stroke-linecap="round"/>
        <line x1="70" y1="10" x2="110" y2="15" stroke="#94a3b8" stroke-width="12" stroke-linecap="round"/>
        <!-- Scoop Bowl with Yellow Fat Blob -->
        <ellipse cx="125" cy="15" rx="22" ry="18" fill="#cbd5e1" stroke="#475569" stroke-width="4"/>
        <circle cx="125" cy="15" r="14" fill="#facc15" stroke="#ca8a04" stroke-width="3"/>
      </g>

      <!-- Hollowed Pumpkin Head Patient on Right -->
      <g transform="translate(90, 20)">
        <circle cx="0" cy="0" r="45" fill="#ea580c" stroke="#9a3412" stroke-width="6"/>
        <polygon points="-15,-10 -5,-3 -20,-3" fill="#451a03"/>
        <polygon points="15,-10 5,-3 20,-3" fill="#451a03"/>
        <ellipse cx="22" cy="10" rx="14" ry="18" fill="#451a03" stroke="#78350f" stroke-width="3"/>
        <text x="22" y="14" font-family="'Impact', sans-serif" font-size="9" fill="#fde047" text-anchor="middle">HOLLOW</text>
      </g>

      <!-- Label -->
      <g transform="translate(0, -125)">
        <rect x="-180" y="-25" width="360" height="50" rx="10" fill="#0f172a" stroke="#f97316" stroke-width="4"/>
        <text x="0" y="8" font-family="'Impact', sans-serif" font-size="20" fill="#fb923c" letter-spacing="1" text-anchor="middle">
          BUCCAL FAT EXTRACTION ($5,000)
        </text>
      </g>
    </g>
  `;
}
function renderBillionaireGoldElevator(x, y, timeSec = 0) {
  const elevatorY = -40 + Math.sin(timeSec * 2) * 50;
  return `
    <g id="puppet-gold-elevator" transform="translate(${x}, ${y}) scale(1.6)" filter="url(#cardShadow)">
      <!-- Elevator Shaft Frame -->
      <rect x="20" y="-140" width="160" height="260" rx="12" fill="#0f172a" stroke="#ca8a04" stroke-width="6"/>
      <line x1="100" y1="-140" x2="100" y2="120" stroke="#ca8a04" stroke-width="4" stroke-dasharray="10 8"/>

      <!-- Golden Glass Elevator Car Rising -->
      <g transform="translate(20, ${elevatorY})">
        <rect x="10" y="0" width="140" height="110" rx="10" fill="#fef08a" fill-opacity="0.4" stroke="#eab308" stroke-width="5" filter="url(#glow)"/>
        <!-- Rich Celebrity in Top Hat Inside -->
        <circle cx="80" cy="40" r="18" fill="#fddfb0" stroke="#111" stroke-width="3"/>
        <rect x="70" y="12" width="20" height="16" fill="#18181b"/>
        <polygon points="68,28 92,28 80,45" fill="#18181b"/>
        <text x="80" y="85" font-family="'Impact', sans-serif" font-size="14" fill="#15803d" text-anchor="middle">OZEMPIC \u2728</text>
      </g>

      <!-- Broke Normal Stickmen on Left Looking Up -->
      <g transform="translate(-100, 30)">
        <circle cx="0" cy="0" r="22" fill="#fddfb0" stroke="#111" stroke-width="4"/>
        <ellipse cx="-6" cy="-4" rx="3" ry="3" fill="#111"/>
        <ellipse cx="6" cy="-4" rx="3" ry="3" fill="#111"/>
        <line x1="0" y1="22" x2="0" y2="75" stroke="#111" stroke-width="5"/>
        <line x1="-15" y1="75" x2="-15" y2="90" stroke="#111" stroke-width="5"/>
        <line x1="15" y1="75" x2="15" y2="90" stroke="#111" stroke-width="5"/>
        <!-- Empty Pockets Turned Out -->
        <path d="M -15 45 Q -28 50 -20 60" fill="none" stroke="#64748b" stroke-width="3"/>
      </g>

      <!-- Rolling 20-Foot Receipt -->
      <g transform="translate(-100, 100)">
        <rect x="-60" y="-15" width="120" height="30" rx="4" fill="#ffffff" stroke="#111" stroke-width="2"/>
        <text x="0" y="6" font-family="'Courier New', monospace" font-size="11" font-weight="bold" fill="#dc2626" text-anchor="middle">
          $1,200/MO
        </text>
      </g>

      <!-- Label -->
      <g transform="translate(0, -170)">
        <rect x="-190" y="-25" width="380" height="50" rx="10" fill="#0f172a" stroke="#facc15" stroke-width="4"/>
        <text x="0" y="8" font-family="'Impact', sans-serif" font-size="20" fill="#fde047" letter-spacing="1" text-anchor="middle">
          THE PHARMA ECONOMIC SHORTCUT
        </text>
      </g>
    </g>
  `;
}

// src/character/CartoonCastSubScenes.ts
function renderNintendoGLP1Cartridge(x, y, timeSec = 0) {
  const blink = Math.sin(timeSec * 8) > 0;
  return `
    <g id="asset-nintendo-glp1" transform="translate(${x}, ${y}) scale(1.6)" filter="url(#cardShadow)">
      <!-- NES Grey Cartridge Body -->
      <rect x="-170" y="-120" width="340" height="240" rx="12" fill="#475569" stroke="#1e293b" stroke-width="7"/>
      <!-- Top Grip Ridges -->
      ${[-130, -90, -50, -10, 30, 70, 110].map((rx) => `
        <line x1="${rx}" y1="-120" x2="${rx}" y2="-75" stroke="#334155" stroke-width="6"/>
      `).join("")}
      <!-- Cartridge Label Sticker -->
      <rect x="-140" y="-70" width="280" height="170" rx="8" fill="#0f172a" stroke="#ca8a04" stroke-width="4"/>
      <text x="0" y="-30" font-family="'Impact', sans-serif" font-size="28" fill="#facc15" letter-spacing="2" text-anchor="middle">
        GLP-1 CHEAT CODE
      </text>
      <text x="0" y="5" font-family="'Courier New', monospace" font-size="14" font-weight="bold" fill="#38bdf8" text-anchor="middle">
        OZEMPIC \u2022 WEGOVY \u2022 MOUNJARO
      </text>
      <!-- Blinking Status Button -->
      <rect x="-120" y="30" width="240" height="30" rx="6" fill="${blink ? "#22c55e" : "#15803d"}"/>
      <text x="0" y="51" font-family="'Courier New', monospace" font-size="12" font-weight="bold" fill="#ffffff" text-anchor="middle">
        BYPASS HUNGER: [ACTIVE]
      </text>
    </g>
  `;
}
function renderSaltineCrackerPlatter(x, y, timeSec = 0) {
  return `
    <g id="asset-saltine-cracker" transform="translate(${x}, ${y}) scale(1.65)" filter="url(#cardShadow)">
      <!-- Silver Domed Cloche Platter Base -->
      <ellipse cx="0" cy="55" rx="190" ry="32" fill="#e2e8f0" stroke="#94a3b8" stroke-width="7"/>
      <!-- 1/2 Microscopic Cracker -->
      <rect x="-35" y="-15" width="70" height="65" rx="6" fill="#fde047" stroke="#ca8a04" stroke-width="4"/>
      <!-- Cracker Holes -->
      <circle cx="-16" cy="0" r="3.5" fill="#78350f"/>
      <circle cx="16" cy="0" r="3.5" fill="#78350f"/>
      <circle cx="-16" cy="28" r="3.5" fill="#78350f"/>
      <circle cx="16" cy="28" r="3.5" fill="#78350f"/>
      <!-- Magnifying Glass Framing -->
      <g transform="translate(0, 15)">
        <circle cx="0" cy="0" r="75" fill="none" stroke="#0284c7" stroke-width="8" filter="url(#glow)"/>
        <line x1="55" y1="55" x2="110" y2="110" stroke="#0369a1" stroke-width="12" stroke-linecap="round"/>
      </g>
      <!-- Satiety Badge -->
      <rect x="-200" y="-120" width="400" height="55" rx="12" fill="#064e3b" stroke="#34d399" stroke-width="4"/>
      <text x="0" y="-85" font-family="'Impact', sans-serif" font-size="24" fill="#6ee7b7" text-anchor="middle">
        1/2 SALTINE CRACKER: 100% FULL
      </text>
    </g>
  `;
}
function renderSeveredHungerWire(x, y, timeSec = 0) {
  const spark = timeSec * 30 % 2 > 1;
  return `
    <g id="asset-severed-wire" transform="translate(${x}, ${y}) scale(1.65)" filter="url(#cardShadow)">
      <!-- Giant Pink Brain -->
      <circle cx="-45" cy="-20" r="65" fill="#f472b6" stroke="#db2777" stroke-width="7"/>
      <circle cx="45" cy="-20" r="65" fill="#f472b6" stroke="#db2777" stroke-width="7"/>
      <circle cx="0" cy="25" r="70" fill="#f472b6" stroke="#db2777" stroke-width="7"/>
      <!-- Severed Wire -->
      <line x1="-130" y1="45" x2="-30" y2="45" stroke="#facc15" stroke-width="10" stroke-linecap="round"/>
      <line x1="30" y1="45" x2="130" y2="45" stroke="#facc15" stroke-width="10" stroke-linecap="round"/>
      <!-- Electrical Sparks -->
      ${spark ? `
        <polygon points="-10,25 5,45 -20,45 10,75 -5,55 20,55" fill="#38bdf8" filter="url(#glow)"/>
      ` : `
        <polygon points="10,25 -5,45 20,45 -10,75 5,55 -20,55" fill="#ef4444" filter="url(#glow)"/>
      `}
      <!-- Badge -->
      <rect x="-210" y="115" width="420" height="50" rx="10" fill="#0f172a" stroke="#ef4444" stroke-width="4"/>
      <text x="0" y="148" font-family="'Impact', sans-serif" font-size="22" fill="#f87171" text-anchor="middle">
        HUNGER REWARD: PERMANENTLY SNIPPED
      </text>
    </g>
  `;
}
function renderSeductiveBaguette(x, y, timeSec = 0) {
  return `
    <g id="asset-seductive-baguette" transform="translate(${x}, ${y}) scale(1.65)" filter="url(#cardShadow)">
      <!-- French Baguette Loaf -->
      <ellipse cx="0" cy="0" rx="145" ry="48" fill="#fde047" stroke="#ca8a04" stroke-width="7" transform="rotate(-15)"/>
      <line x1="-80" y1="-20" x2="-40" y2="10" stroke="#ca8a04" stroke-width="6" stroke-linecap="round"/>
      <line x1="-10" y1="-30" x2="30" y2="0" stroke="#ca8a04" stroke-width="6" stroke-linecap="round"/>
      <line x1="60" y1="-40" x2="100" y2="-10" stroke="#ca8a04" stroke-width="6" stroke-linecap="round"/>
      <!-- French Beret on Tip -->
      <ellipse cx="-120" cy="-55" rx="38" ry="18" fill="#1e293b" stroke="#0f172a" stroke-width="4"/>
      <!-- Seductive French Eyes -->
      <ellipse cx="-40" cy="-15" rx="8" ry="6" fill="#111"/>
      <ellipse cx="20" cy="-25" rx="8" ry="6" fill="#111"/>
      <!-- Giant Heavy Red BLOCKED Rubber Stamp -->
      <g transform="translate(0, 15) rotate(-10)">
        <rect x="-130" y="-40" width="260" height="80" rx="10" fill="none" stroke="#dc2626" stroke-width="9"/>
        <text x="0" y="15" font-family="'Impact', sans-serif" font-size="44" fill="#dc2626" letter-spacing="5" text-anchor="middle">
          BLOCKED
        </text>
      </g>
    </g>
  `;
}
function renderHurricaneWindMachine(x, y, timeSec = 0) {
  const fanSpin = timeSec * 720 % 360;
  return `
    <g id="asset-wind-machine" transform="translate(${x}, ${y}) scale(1.6)">
      <!-- Cinema Wind Turbine Housing -->
      <circle cx="-120" cy="0" r="85" fill="#334155" stroke="#0f172a" stroke-width="8" filter="url(#cardShadow)"/>
      <g transform="translate(-120, 0) rotate(${fanSpin})">
        <polygon points="-80,0 0,-15 80,0 0,15" fill="#94a3b8"/>
        <polygon points="0,-80 15,0 0,80 -15,0" fill="#94a3b8"/>
        <circle cx="0" cy="0" r="18" fill="#0f172a"/>
      </g>
      <!-- Gust Wave Vectors -->
      <path d="M -30 -40 Q 60 -70 160 -40" fill="none" stroke="#38bdf8" stroke-width="8" stroke-linecap="round" stroke-dasharray="20 12"/>
      <path d="M -10 0 Q 80 -30 180 0" fill="none" stroke="#38bdf8" stroke-width="10" stroke-linecap="round" stroke-dasharray="24 16"/>
      <path d="M -30 40 Q 60 10 160 40" fill="none" stroke="#38bdf8" stroke-width="8" stroke-linecap="round" stroke-dasharray="20 12"/>
      <!-- Inside-Out Umbrella -->
      <g transform="translate(110, -20) rotate(-40)">
        <path d="M -50 0 Q 0 -40 50 0 Z" fill="#ec4899" stroke="#be185d" stroke-width="5"/>
        <line x1="0" y1="0" x2="0" y2="70" stroke="#1e293b" stroke-width="5"/>
      </g>
      <!-- Gale Badge -->
      <rect x="-190" y="105" width="380" height="50" rx="10" fill="#0f172a" stroke="#38bdf8" stroke-width="4" filter="url(#cardShadow)"/>
      <text x="0" y="138" font-family="'Impact', sans-serif" font-size="24" fill="#38bdf8" letter-spacing="1" text-anchor="middle">
        LIGHT BREEZE: 95 MPH GALE
      </text>
    </g>
  `;
}
function renderCouchForagingLoot(x, y, timeSec = 0) {
  return `
    <g id="asset-couch-foraging" transform="translate(${x}, ${y}) scale(1.65)" filter="url(#cardShadow)">
      <!-- Velvet Couch Cushion -->
      <rect x="-180" y="-60" width="360" height="120" rx="18" fill="#78350f" stroke="#451a03" stroke-width="7"/>
      <!-- Coins -->
      <circle cx="-80" cy="-10" r="18" fill="#facc15" stroke="#ca8a04" stroke-width="3"/>
      <text x="-80" y="-3" font-family="'Impact', sans-serif" font-size="14" fill="#78350f" text-anchor="middle">1\xA2</text>
      <circle cx="-40" cy="5" r="20" fill="#facc15" stroke="#ca8a04" stroke-width="3"/>
      <text x="-40" y="13" font-family="'Impact', sans-serif" font-size="16" fill="#78350f" text-anchor="middle">2\xA2</text>
      <!-- Radioactive Stale Cheeto -->
      <path d="M 45 -15 Q 75 -35 100 0" fill="none" stroke="#ea580c" stroke-width="14" stroke-linecap="round" filter="url(#glow)"/>
      <!-- Loot Badge -->
      <rect x="-210" y="90" width="420" height="55" rx="10" fill="#0f172a" stroke="#f59e0b" stroke-width="4"/>
      <text x="0" y="126" font-family="'Impact', sans-serif" font-size="20" fill="#fde68a" text-anchor="middle">
        COUCH FORAGING: +$0.03 & 1 CHEETO
      </text>
    </g>
  `;
}
function renderDiscoveredHydration(x, y, timeSec = 0) {
  return `
    <g id="asset-discovered-hydration" transform="translate(${x}, ${y}) scale(1.65)" filter="url(#cardShadow)">
      <!-- Massive 1-Gallon Gym Jug -->
      <rect x="-85" y="-130" width="170" height="240" rx="22" fill="#38bdf8" stroke="#0284c7" stroke-width="7"/>
      <rect x="-35" y="-160" width="70" height="30" rx="6" fill="#0369a1"/>
      <text x="0" y="-30" font-family="'Impact', sans-serif" font-size="34" fill="#ffffff" text-anchor="middle">1 GALLON</text>
      <text x="0" y="15" font-family="'Courier New', monospace" font-size="16" font-weight="bold" fill="#0369a1" text-anchor="middle">
        8 HRS SLEEP
      </text>
      <!-- Hydration Discovery Badge -->
      <rect x="-210" y="130" width="420" height="52" rx="10" fill="#0f172a" stroke="#38bdf8" stroke-width="3"/>
      <text x="0" y="163" font-family="'Impact', sans-serif" font-size="20" fill="#facc15" text-anchor="middle">
        "I JUST DISCOVERED HYDRATION"
      </text>
    </g>
  `;
}
function renderSwissCheeseSkull(x, y, timeSec = 0) {
  return `
    <g id="asset-swiss-cheese-skull" transform="translate(${x}, ${y}) scale(1.65)" filter="url(#cardShadow)">
      <!-- Giant Swiss Cheese Wedge -->
      <polygon points="-130,60 130,60 0,-100" fill="#fde047" stroke="#ca8a04" stroke-width="7"/>
      <!-- Holes -->
      <circle cx="-35" cy="15" r="20" fill="#eab308"/>
      <circle cx="30" cy="25" r="16" fill="#eab308"/>
      <circle cx="0" cy="-40" r="14" fill="#eab308"/>
      <!-- Sarcastic Skull Badge -->
      <rect x="-210" y="90" width="420" height="55" rx="10" fill="#0f172a" stroke="#ef4444" stroke-width="4"/>
      <text x="0" y="126" font-family="'Impact', sans-serif" font-size="20" fill="#f87171" text-anchor="middle">
        "CUTTING CHEESE = NEW SKULL SHAPE"
      </text>
    </g>
  `;
}
function renderUnseasonedChickenBroccoli(x, y, timeSec = 0) {
  return `
    <g id="asset-unseasoned-chicken" transform="translate(${x}, ${y}) scale(1.65)" filter="url(#cardShadow)">
      <!-- Fine Dining Plate -->
      <ellipse cx="0" cy="40" rx="180" ry="32" fill="#f8fafc" stroke="#94a3b8" stroke-width="7"/>
      <!-- Grey Boiled Chicken Breast -->
      <ellipse cx="-45" cy="15" rx="75" ry="38" fill="#cbd5e1" stroke="#64748b" stroke-width="5"/>
      <text x="-45" y="22" font-family="'Impact', sans-serif" font-size="14" fill="#64748b" text-anchor="middle">0 SEASONING</text>
      <!-- 1 Limp Steamed Broccoli Stalk -->
      <circle cx="70" cy="10" r="30" fill="#15803d" stroke="#14532d" stroke-width="4"/>
      <!-- Gaslighting Banner -->
      <rect x="-210" y="-120" width="420" height="55" rx="10" fill="#0f172a" stroke="#f59e0b" stroke-width="4"/>
      <text x="0" y="-85" font-family="'Impact', sans-serif" font-size="20" fill="#fde68a" text-anchor="middle">
        OLYMPIC GASLIGHTING PROTOCOL
      </text>
    </g>
  `;
}
function renderAlarmClockTRT(x, y, timeSec = 0) {
  const bellRing = Math.sin(timeSec * 28) * 8;
  return `
    <g id="asset-alarm-trt" transform="translate(${x}, ${y}) scale(1.65)" filter="url(#cardShadow)">
      <!-- Digital Alarm Clock -->
      <rect x="-170" y="-75" width="340" height="150" rx="20" fill="#0f172a" stroke="#ef4444" stroke-width="7"/>
      <text x="0" y="28" font-family="'Courier New', monospace" font-size="56" font-weight="bold" fill="#ef4444" letter-spacing="4" text-anchor="middle">
        04:00 AM
      </text>
      <!-- Twin Vibrating Alarm Bells on Top -->
      <circle cx="-110" cy="${-85 + bellRing}" r="26" fill="#ca8a04" stroke="#854d0e" stroke-width="4"/>
      <circle cx="110" cy="${-85 - bellRing}" r="26" fill="#ca8a04" stroke="#854d0e" stroke-width="4"/>
      <!-- "DISCIPLINE" Banner -->
      <rect x="-210" y="100" width="420" height="52" rx="10" fill="#064e3b" stroke="#34d399" stroke-width="4"/>
      <text x="0" y="134" font-family="'Impact', sans-serif" font-size="22" fill="#6ee7b7" text-anchor="middle">
        "JUST DISCIPLINE & TRT"
      </text>
    </g>
  `;
}
function renderBuccalBossFightBanner(x, y, timeSec = 0) {
  return `
    <g id="asset-buccal-boss-fight" transform="translate(${x}, ${y}) scale(1.65)" filter="url(#cardShadow)">
      <rect x="-220" y="-120" width="440" height="240" rx="18" fill="#0f172a" stroke="#f97316" stroke-width="7"/>
      <text x="0" y="-60" font-family="'Impact', sans-serif" font-size="24" fill="#fb923c" letter-spacing="2" text-anchor="middle">
        AESTHETIC BOSS FIGHT #2
      </text>
      <text x="0" y="8" font-family="'Impact', sans-serif" font-size="34" fill="#ffffff" letter-spacing="2" text-anchor="middle">
        BUCCAL FAT REMOVAL
      </text>
      <text x="0" y="78" font-family="'Courier New', monospace" font-size="16" font-weight="bold" fill="#ef4444" text-anchor="middle">
        [ -$5,000 PER PROCEDURE ]
      </text>
    </g>
  `;
}
function renderLithiumBatteryPack(x, y, timeSec = 0) {
  return `
    <g id="asset-lithium-battery" transform="translate(${x}, ${y}) scale(1.65)" filter="url(#cardShadow)">
      <rect x="-140" y="-80" width="280" height="160" rx="18" fill="#0f172a" stroke="#22c55e" stroke-width="7"/>
      <rect x="140" y="-30" width="22" height="60" rx="4" fill="#22c55e"/>
      <rect x="-120" y="-60" width="200" height="120" rx="12" fill="#22c55e" filter="url(#glow)"/>
      <text x="-20" y="16" font-family="'Impact', sans-serif" font-size="36" fill="#0f172a" text-anchor="middle">100%</text>
      <text x="0" y="130" font-family="'Impact', sans-serif" font-size="22" fill="#22c55e" letter-spacing="2" text-anchor="middle">
        LITHIUM-ION POWERED ACTORS
      </text>
    </g>
  `;
}
function renderYouAreNotLazyCard(x, y, timeSec = 0) {
  return `
    <g id="asset-you-are-not-lazy" transform="translate(${x}, ${y}) scale(1.65)" filter="url(#cardShadow)">
      <rect x="-230" y="-120" width="460" height="240" rx="18" fill="#0f172a" stroke="#22c55e" stroke-width="7"/>
      <text x="0" y="-55" font-family="'Impact', sans-serif" font-size="28" fill="#4ade80" letter-spacing="2" text-anchor="middle">
        YOU ARE NOT LAZY
      </text>
      <text x="0" y="-10" font-family="'Patrick Hand', cursive, sans-serif" font-size="26" fill="#ffffff" text-anchor="middle">
        You just lack an endless budget,
      </text>
      <text x="0" y="30" font-family="'Patrick Hand', cursive, sans-serif" font-size="26" fill="#ffffff" text-anchor="middle">
        a concierge doctor, and pharma shots.
      </text>
      <text x="0" y="80" font-family="'Impact', sans-serif" font-size="18" fill="#facc15" text-anchor="middle">
        [ SO DO NOT FEEL BAD ABOUT YOURSELF ]
      </text>
    </g>
  `;
}

// src/scenes/Scene12_GLP1CheatCode.ts
var Scene12_GLP1CheatCode = {
  id: "scene_12_glp1_cheat_code",
  name: "GLP-1 Cheat Code, Chained Stomach & French Baguette",
  startTime: 183.92,
  endTime: 238.74,
  render(ctx) {
    const { sceneTime, camera } = ctx;
    const isSub1 = sceneTime < 7.5;
    const isSub2 = sceneTime >= 7.5 && sceneTime < 14.5;
    const isSub3 = sceneTime >= 14.5 && sceneTime < 22;
    const isSub4 = sceneTime >= 22 && sceneTime < 29.5;
    const isSub5 = sceneTime >= 29.5 && sceneTime < 36.5;
    const isSub6 = sceneTime >= 36.5 && sceneTime < 43.5;
    const isSub7 = sceneTime >= 43.5 && sceneTime < 50.5;
    const isSub8 = sceneTime >= 50.5;
    let hostX = 420;
    let hostY = 650;
    let hostLean = 8;
    let isWalking = false;
    let hostExpr = "deadpan_classic";
    let pointTarget = { x: 1260, y: 480 };
    let overlays = "";
    let shakeAmt = 0;
    if (isSub1) {
      camera.setTarget(960, 540, 1.05);
      const walkProg = Math.min(1, sceneTime / 1.5);
      hostX = 260 + walkProg * 160;
      isWalking = walkProg < 1;
      hostLean = 8;
      pointTarget = { x: 1260, y: 480 };
      hostExpr = "deadpan_classic";
    } else if (isSub2) {
      camera.setTarget(1260, 500, 1.55);
      hostX = 420;
      hostLean = -12;
      pointTarget = { x: 1260, y: 480 };
      hostExpr = "shock_eye_pop";
    } else if (isSub3) {
      camera.setTarget(1260, 480, 1.75);
      camera.shake(1.2);
      hostX = 420;
      hostLean = -18;
      pointTarget = { x: 1260, y: 500 };
      hostExpr = "cringe_teeth_grit";
    } else if (isSub4) {
      camera.setTarget(1260, 500, 1.95);
      hostX = 420;
      hostLean = 10;
      pointTarget = { x: 1260, y: 500 };
      hostExpr = "confused_squint";
    } else if (isSub5) {
      camera.setTarget(960, 540, 1.08);
      hostX = 440;
      hostLean = -10;
      pointTarget = { x: 1260, y: 480 };
      hostExpr = "smug_rock_eyebrow";
    } else if (isSub6) {
      camera.setTarget(1260, 480, 1.5);
      hostX = 440;
      hostLean = 12;
      pointTarget = { x: 1260, y: 480 };
      hostExpr = "skeptical_side_eye";
    } else if (isSub7) {
      camera.setTarget(1260, 480, 1.7);
      camera.shake(1);
      hostX = 420;
      hostLean = -16;
      pointTarget = { x: 1260, y: 460 };
      hostExpr = "mind_blown_galaxy_brain";
    } else {
      camera.cutTo(440, 540, 1.45);
      hostX = 440;
      hostLean = 0;
      hostExpr = "smug_finger_guns";
      pointTarget = void 0;
    }
    let bg = `
      <!-- Infinite full-bleed backdrop -->
      <rect x="-4000" y="-4000" width="10000" height="10000" fill="#f8fafc"/>
      <line x1="-4000" y1="840" x2="6000" y2="840" stroke="#e2e8f0" stroke-width="4"/>
    `;
    if (isSub1) {
      bg += renderNintendoGLP1Cartridge(1260, 480, sceneTime);
      overlays += renderHandDrawnCircle({ x: 1260, y: 480 }, 190, 130, sceneTime, "CHEAT CODE");
    } else if (isSub2) {
      bg += renderSciFiPharmaDoctor(1260, 520, sceneTime);
      overlays += renderActionLines({ x: 1260, y: 480 }, 240, sceneTime);
    } else if (isSub3) {
      bg += renderShiveringStomachPuppet(1260, 480, sceneTime);
      overlays += renderHandDrawnArrow({ x: 740, y: 520 }, { x: 1080, y: 480 }, sceneTime, "NO MOTILITY");
    } else if (isSub4) {
      bg += renderSaltineCrackerPlatter(1260, 500, sceneTime);
      overlays += renderHandDrawnCircle({ x: 1260, y: 500 }, 140, 100, sceneTime, "ENTIRE MEAL");
    } else if (isSub5) {
      bg += `
        <g transform="translate(1260, 480)" filter="url(#cardShadow)">
          <rect x="-230" y="-130" width="460" height="260" rx="16" fill="#0f172a" stroke="#38bdf8" stroke-width="5"/>
          <line x1="0" y1="-130" x2="0" y2="130" stroke="#38bdf8" stroke-width="4" stroke-dasharray="8 6"/>
          
          <text x="-115" y="-85" font-family="'Impact', sans-serif" font-size="20" fill="#94a3b8" text-anchor="middle">2 HRS TREADMILL</text>
          <text x="-115" y="-55" font-family="'Impact', sans-serif" font-size="16" fill="#ef4444" text-anchor="middle">+ KALE SMOOTHIE</text>
          <rect x="-170" y="-20" width="110" height="80" rx="8" fill="#334155"/>
          <text x="-115" y="30" font-family="sans-serif" font-size="36" text-anchor="middle">\u{1F3C3}\u{1F4A8}</text>

          <text x="115" y="-85" font-family="'Impact', sans-serif" font-size="20" fill="#34d399" text-anchor="middle">1 SEC WEEKLY SHOT</text>
          <text x="115" y="-55" font-family="'Impact', sans-serif" font-size="16" fill="#38bdf8" text-anchor="middle">ZERO EFFORT</text>
          <rect x="60" y="-20" width="110" height="80" rx="8" fill="#064e3b"/>
          <text x="115" y="30" font-family="sans-serif" font-size="36" text-anchor="middle">\u{1F489}\u2728</text>
        </g>
      `;
    } else if (isSub6) {
      bg += `
        <g transform="translate(1260, 480)" filter="url(#cardShadow)">
          <rect x="-70" y="-140" width="140" height="260" rx="30" fill="#38bdf8" stroke="#0284c7" stroke-width="7"/>
          <rect x="-25" y="-170" width="50" height="35" rx="6" fill="#94a3b8" stroke="#475569" stroke-width="4"/>
          <text x="0" y="-30" font-family="'Impact', sans-serif" font-size="32" fill="#ffffff" text-anchor="middle">O\u2082</text>
          <text x="0" y="20" font-family="'Courier New', monospace" font-size="16" font-weight="bold" fill="#0f172a" text-anchor="middle">
            100% PURE
          </text>
          <rect x="-190" y="140" width="380" height="50" rx="8" fill="#0f172a" stroke="#38bdf8" stroke-width="3"/>
          <text x="0" y="172" font-family="'Impact', sans-serif" font-size="19" fill="#fde047" text-anchor="middle">
            DIET: OXYGEN & PUBLIC ATTENTION
          </text>
        </g>
      `;
      overlays += renderActionLines({ x: 1260, y: 480 }, 220, sceneTime);
    } else if (isSub7) {
      bg += renderSeveredHungerWire(1260, 480, sceneTime);
    } else {
      bg += renderSeductiveBaguette(1260, 480, sceneTime);
      overlays += renderActionLines({ x: 1260, y: 480 }, 240, sceneTime);
    }
    const hostFigure = {
      id: "host_stick",
      state: {
        x: hostX,
        y: hostY,
        scale: 1.34,
        timeSec: sceneTime,
        spineLean: hostLean,
        isWalking,
        pointTarget,
        expression: hostExpr,
        gazeTarget: pointTarget
      }
    };
    return {
      backgroundSvg: bg + overlays,
      stickFigures: [hostFigure],
      shake: shakeAmt
    };
  }
};

// src/scenes/Scene13_HollywoodDenial.ts
var Scene13_HollywoodDenial = {
  id: "scene_13_hollywood_denial",
  name: "Hollywood Denial: Gale, Couch Coins & Firehose",
  startTime: 238.74,
  endTime: 308.2,
  render(ctx) {
    const { sceneTime, camera } = ctx;
    const isSub1 = sceneTime < 7.5;
    const isSub2 = sceneTime >= 7.5 && sceneTime < 15;
    const isSub3 = sceneTime >= 15 && sceneTime < 23;
    const isSub4 = sceneTime >= 23 && sceneTime < 31;
    const isSub5 = sceneTime >= 31 && sceneTime < 39;
    const isSub6 = sceneTime >= 39 && sceneTime < 47;
    const isSub7 = sceneTime >= 47 && sceneTime < 55;
    const isSub8 = sceneTime >= 55 && sceneTime < 62;
    const isSub9 = sceneTime >= 62;
    let hostX = 420;
    let hostY = 650;
    let hostLean = 8;
    let isWalking = false;
    let hostExpr = "deadpan_classic";
    let leftHandProp = "none";
    let rightHandProp = "none";
    let pointTarget = { x: 1260, y: 480 };
    let overlays = "";
    let shakeAmt = 0;
    if (isSub1) {
      camera.setTarget(960, 540, 1.05);
      hostX = 420;
      hostLean = 8;
      pointTarget = { x: 1260, y: 480 };
      hostExpr = "deadpan_classic";
    } else if (isSub2 || isSub3) {
      camera.setTarget(1260, 480, 1.55);
      camera.shake(1.4);
      hostX = 300;
      hostLean = -24;
      pointTarget = { x: 1260, y: 460 };
      hostExpr = "fear_screaming";
    } else if (isSub4) {
      camera.setTarget(960, 540, 1.1);
      hostX = 440;
      hostLean = 10;
      rightHandProp = "pointer";
      pointTarget = { x: 1260, y: 480 };
      hostExpr = "skeptical_raised_brow";
    } else if (isSub5) {
      camera.setTarget(1260, 520, 1.65);
      hostX = 440;
      hostLean = -8;
      pointTarget = { x: 1260, y: 520 };
      hostExpr = "smug_rock_eyebrow";
    } else if (isSub6) {
      camera.setTarget(1260, 480, 1.45);
      hostX = 440;
      hostLean = 8;
      pointTarget = { x: 1260, y: 480 };
      hostExpr = "deadpan_side_glance";
    } else if (isSub7) {
      camera.setTarget(1260, 480, 1.65);
      hostX = 440;
      hostLean = 10;
      leftHandProp = "diet_coke";
      pointTarget = { x: 1260, y: 480 };
      hostExpr = "smug_sipping_tea";
    } else if (isSub8) {
      camera.setTarget(1260, 480, 1.7);
      hostX = 420;
      hostLean = -14;
      pointTarget = { x: 1260, y: 480 };
      hostExpr = "confused_squint";
    } else {
      camera.setTarget(1260, 480, 1.8);
      camera.shake(1.8);
      hostX = 320;
      hostLean = 18;
      pointTarget = { x: 1260, y: 500 };
      hostExpr = "shock_eye_pop";
    }
    let bg = `
      <!-- Infinite full-bleed backdrop -->
      <rect x="-4000" y="-4000" width="10000" height="10000" fill="#f8fafc"/>
      <line x1="-4000" y1="840" x2="6000" y2="840" stroke="#e2e8f0" stroke-width="4"/>
    `;
    if (isSub1) {
      bg += `
        <g transform="translate(1260, 480)" filter="url(#cardShadow)">
          <rect x="-220" y="-120" width="440" height="240" rx="16" fill="#0f172a" stroke="#ec4899" stroke-width="6"/>
          <text x="0" y="-65" font-family="'Impact', sans-serif" font-size="26" fill="#f472b6" letter-spacing="2" text-anchor="middle">
            PRESS TOUR INTERVIEW
          </text>
          <circle cx="0" cy="10" r="38" fill="#475569" stroke="#94a3b8" stroke-width="4"/>
          <line x1="0" y1="48" x2="0" y2="100" stroke="#1e293b" stroke-width="12"/>
          <text x="0" y="80" font-family="'Courier New', monospace" font-size="14" font-weight="bold" fill="#fde047" text-anchor="middle">
            "HOW DID YOU LOSE 30 LBS IN 4 WEEKS?"
          </text>
        </g>
      `;
      overlays += renderHandDrawnCircle({ x: 1260, y: 480 }, 180, 130, sceneTime, "PRESS TOUR");
    } else if (isSub2 || isSub3) {
      bg += renderHurricaneWindMachine(1260, 480, sceneTime);
      overlays += renderActionLines({ x: 1260, y: 480 }, 240, sceneTime);
    } else if (isSub4) {
      bg += `
        <g transform="translate(1260, 480)" filter="url(#cardShadow)">
          <rect x="-220" y="-130" width="440" height="260" rx="16" fill="#fdf4ff" stroke="#a855f7" stroke-width="6"/>
          <text x="0" y="-80" font-family="'Impact', sans-serif" font-size="24" fill="#7e22ce" letter-spacing="1" text-anchor="middle">
            "JUST DIET AND EXERCISE!"
          </text>
          <line x1="-180" y1="-55" x2="180" y2="-55" stroke="#d8b4fe" stroke-width="3"/>
          <circle cx="-90" cy="20" r="45" fill="#fbcfe8" stroke="#db2777" stroke-width="4"/>
          <text x="-90" y="28" font-family="'Impact', sans-serif" font-size="16" fill="#9d174d" text-anchor="middle">2020</text>
          
          <polygon points="90,-25 125,55 55,55" fill="#c084fc" stroke="#7e22ce" stroke-width="4"/>
          <text x="90" y="28" font-family="'Impact', sans-serif" font-size="16" fill="#ffffff" text-anchor="middle">2024</text>
          
          <text x="0" y="105" font-family="'Courier New', monospace" font-size="15" font-weight="bold" fill="#dc2626" text-anchor="middle">
            [HOLLYWOOD DIET SPEAK]
          </text>
        </g>
      `;
      overlays += renderHandDrawnArrow({ x: 740, y: 520 }, { x: 1080, y: 480 }, sceneTime, "DIET SPEAK");
    } else if (isSub5) {
      bg += renderCouchForagingLoot(1260, 480, sceneTime);
      overlays += renderHandDrawnCircle({ x: 1260, y: 480 }, 180, 110, sceneTime, "COUCH LOOT");
    } else if (isSub6) {
      bg += `
        <g transform="translate(1260, 480)" filter="url(#cardShadow)">
          <rect x="-220" y="-120" width="440" height="240" rx="16" fill="#0f172a" stroke="#eab308" stroke-width="6"/>
          <text x="0" y="-70" font-family="'Impact', sans-serif" font-size="24" fill="#facc15" letter-spacing="2" text-anchor="middle">
            GOLDEN AGE OF CELEBRITY DENIAL
          </text>
          <polygon points="-50,70 50,70 30,-10 -30,-10" fill="#ca8a04"/>
          <circle cx="0" cy="-40" r="30" fill="#facc15" stroke="#ca8a04" stroke-width="4"/>
          <text x="0" y="-32" font-family="'Impact', sans-serif" font-size="22" fill="#78350f" text-anchor="middle">#1</text>
          <text x="0" y="100" font-family="'Courier New', monospace" font-size="14" font-weight="bold" fill="#ffffff" text-anchor="middle">
            CATEGORY: 100% UNABASHED GASLIGHTING
          </text>
        </g>
      `;
    } else if (isSub7) {
      bg += renderDiscoveredHydration(1260, 480, sceneTime);
      overlays += renderActionLines({ x: 1260, y: 480 }, 220, sceneTime);
    } else if (isSub8) {
      bg += renderSwissCheeseSkull(1260, 480, sceneTime);
    } else {
      bg += `
        <g transform="translate(1260, 480)">
          <rect x="-160" y="-40" width="70" height="140" rx="12" fill="#dc2626" stroke="#991b1b" stroke-width="6"/>
          <ellipse cx="-125" cy="-40" rx="35" ry="18" fill="#ef4444" stroke="#991b1b" stroke-width="5"/>
          <path d="M -90 -10 Q 0 -30 180 -10 Q 200 0 180 10 Q 0 30 -90 10 Z" fill="#38bdf8" opacity="0.95" filter="url(#glow)"/>
          <text x="60" y="8" font-family="'Impact', sans-serif" font-size="24" fill="#ffffff" text-anchor="middle">
            HYDRATION 10,000 PSI
          </text>
        </g>
      `;
      overlays += renderActionLines({ x: 1260, y: 480 }, 260, sceneTime);
    }
    const hostFigure = {
      id: "host_stick",
      state: {
        x: hostX,
        y: hostY,
        scale: 1.34,
        timeSec: sceneTime,
        spineLean: hostLean,
        isWalking,
        leftHandProp,
        rightHandProp,
        pointTarget,
        expression: hostExpr,
        gazeTarget: pointTarget
      }
    };
    return {
      backgroundSvg: bg + overlays,
      stickFigures: [hostFigure],
      shake: shakeAmt
    };
  }
};

// src/scenes/Scene14_MCUSuperhero.ts
var Scene14_MCUSuperhero = {
  id: "scene_14_mcu_superhero",
  name: "MCU Superhero Dehydration, Shrink-Wrapped Ham & Boiled Chicken",
  startTime: 308.2,
  endTime: 349.46,
  render(ctx) {
    const { sceneTime, camera } = ctx;
    const isSub1 = sceneTime < 6;
    const isSub2 = sceneTime >= 6 && sceneTime < 12;
    const isSub3 = sceneTime >= 12 && sceneTime < 18;
    const isSub4 = sceneTime >= 18 && sceneTime < 24;
    const isSub5 = sceneTime >= 24 && sceneTime < 30;
    const isSub6 = sceneTime >= 30 && sceneTime < 36;
    const isSub7 = sceneTime >= 36;
    let hostX = 420;
    let hostY = 650;
    let hostLean = 8;
    let isWalking = false;
    let hostExpr = "deadpan_classic";
    let pointTarget = { x: 1260, y: 480 };
    let overlays = "";
    let shakeAmt = 0;
    if (isSub1) {
      camera.setTarget(960, 540, 1.05);
      hostX = 420;
      hostLean = 8;
      pointTarget = { x: 1260, y: 480 };
      hostExpr = "deadpan_classic";
    } else if (isSub2 || isSub3) {
      camera.setTarget(1260, 500, 1.6);
      camera.shake(1.2);
      hostX = 420;
      hostLean = -14;
      pointTarget = { x: 1260, y: 460 };
      hostExpr = "shock_eye_pop";
    } else if (isSub4 || isSub5) {
      camera.setTarget(1260, 480, 1.85);
      hostX = 440;
      hostLean = 12;
      pointTarget = { x: 1260, y: 520 };
      hostExpr = "cringe_teeth_grit";
    } else if (isSub6) {
      camera.setTarget(1260, 480, 1.55);
      hostX = 440;
      hostLean = -12;
      pointTarget = { x: 1260, y: 500 };
      hostExpr = "disgust_shudder";
    } else {
      camera.cutTo(440, 540, 1.45);
      hostX = 440;
      hostLean = 0;
      hostExpr = "smug_rock_eyebrow";
      pointTarget = void 0;
    }
    let bg = `
      <!-- Infinite full-bleed backdrop -->
      <rect x="-4000" y="-4000" width="10000" height="10000" fill="#f8fafc"/>
      <line x1="-4000" y1="840" x2="6000" y2="840" stroke="#e2e8f0" stroke-width="4"/>
    `;
    if (isSub1) {
      bg += `
        <g transform="translate(1260, 480)" filter="url(#cardShadow)">
          <rect x="-230" y="-130" width="460" height="260" rx="16" fill="#0f172a" stroke="#a855f7" stroke-width="5"/>
          <line x1="0" y1="-130" x2="0" y2="130" stroke="#a855f7" stroke-width="4" stroke-dasharray="8 6"/>
          
          <text x="-115" y="-85" font-family="'Impact', sans-serif" font-size="20" fill="#f472b6" text-anchor="middle">ACTRESSES</text>
          <text x="-115" y="-55" font-family="'Impact', sans-serif" font-size="16" fill="#ffffff" text-anchor="middle">HIGH FASHION THIN</text>
          <text x="-115" y="30" font-family="sans-serif" font-size="40" text-anchor="middle">\u{1F457}\u2728</text>

          <text x="115" y="-85" font-family="'Impact', sans-serif" font-size="20" fill="#38bdf8" text-anchor="middle">ACTORS</text>
          <text x="115" y="-55" font-family="'Impact', sans-serif" font-size="16" fill="#ffffff" text-anchor="middle">MCU SHREDDED</text>
          <text x="115" y="30" font-family="sans-serif" font-size="40" text-anchor="middle">\u{1F9B8}\u200D\u2642\uFE0F\u26A1</text>
        </g>
      `;
    } else if (isSub2 || isSub3) {
      bg += renderMCUSuperheroPuppet(1260, 520, sceneTime);
      overlays += renderActionLines({ x: 1260, y: 480 }, 240, sceneTime);
    } else if (isSub4 || isSub5) {
      bg += `
        <g transform="translate(1260, 480)" filter="url(#cardShadow)">
          <rect x="-190" y="-80" width="380" height="190" rx="18" fill="#fef08a" stroke="#eab308" stroke-width="5"/>
          <path d="M -150 10 C -150 -60 120 -50 150 20 C 120 80 -110 80 -150 10 Z" fill="#881337" stroke="#4c0519" stroke-width="6"/>
          <g transform="translate(60, -35) rotate(10)">
            <rect x="-55" y="-30" width="110" height="65" rx="4" fill="#ffffff" stroke="#111" stroke-width="3"/>
            <line x1="-40" y1="-18" x2="-40" y2="10" stroke="#111" stroke-width="3"/>
            <line x1="-30" y1="-18" x2="-30" y2="10" stroke="#111" stroke-width="5"/>
            <line x1="-15" y1="-18" x2="-15" y2="10" stroke="#111" stroke-width="2"/>
            <line x1="0" y1="-18" x2="0" y2="10" stroke="#111" stroke-width="4"/>
            <line x1="15" y1="-18" x2="15" y2="10" stroke="#111" stroke-width="3"/>
            <text x="0" y="24" font-family="'Impact', sans-serif" font-size="16" fill="#dc2626" text-anchor="middle">$14.99 / LB</text>
          </g>
          <text x="0" y="140" font-family="'Impact', sans-serif" font-size="22" fill="#0f172a" text-anchor="middle">
            "SHRINK-WRAPPED HOLIDAY HAM"
          </text>
        </g>
      `;
      overlays += renderHandDrawnArrow({ x: 740, y: 520 }, { x: 1080, y: 480 }, sceneTime, "SHRINK WRAP");
    } else if (isSub6) {
      bg += renderUnseasonedChickenBroccoli(1260, 480, sceneTime);
      overlays += renderHandDrawnCircle({ x: 1260, y: 480 }, 160, 90, sceneTime, "0 SEASONING");
    } else {
      bg += renderAlarmClockTRT(1260, 480, sceneTime);
      overlays += renderActionLines({ x: 1260, y: 480 }, 240, sceneTime);
    }
    const hostFigure = {
      id: "host_stick",
      state: {
        x: hostX,
        y: hostY,
        scale: 1.34,
        timeSec: sceneTime,
        spineLean: hostLean,
        isWalking,
        pointTarget,
        expression: hostExpr,
        gazeTarget: pointTarget
      }
    };
    return {
      backgroundSvg: bg + overlays,
      stickFigures: [hostFigure],
      shake: shakeAmt
    };
  }
};

// src/scenes/Scene15_BuccalFat.ts
var Scene15_BuccalFat = {
  id: "scene_15_buccal_fat",
  name: "Buccal Fat Pumpkin, Deli Slicer & Victorian Gothic",
  startTime: 349.46,
  endTime: 408.63,
  render(ctx) {
    const { sceneTime, camera } = ctx;
    const isSub1 = sceneTime < 6;
    const isSub2 = sceneTime >= 6 && sceneTime < 12;
    const isSub3 = sceneTime >= 12 && sceneTime < 18;
    const isSub4 = sceneTime >= 18 && sceneTime < 24.5;
    const isSub5 = sceneTime >= 24.5 && sceneTime < 31;
    const isSub6 = sceneTime >= 31 && sceneTime < 38;
    const isSub7 = sceneTime >= 38 && sceneTime < 45;
    const isSub8 = sceneTime >= 45 && sceneTime < 52;
    const isSub9 = sceneTime >= 52;
    let hostX = 420;
    let hostY = 650;
    let hostLean = 8;
    let isWalking = false;
    let hostExpr = "deadpan_classic";
    let pointTarget = { x: 1260, y: 480 };
    let overlays = "";
    let shakeAmt = 0;
    if (isSub1) {
      camera.setTarget(960, 540, 1.05);
      hostX = 420;
      hostLean = 8;
      pointTarget = { x: 1260, y: 480 };
      hostExpr = "deadpan_classic";
    } else if (isSub2) {
      camera.setTarget(1260, 480, 1.5);
      hostX = 440;
      hostLean = 6;
      pointTarget = { x: 1260, y: 480 };
      hostExpr = "confused_squint";
    } else if (isSub3 || isSub4) {
      camera.setTarget(1260, 520, 1.7);
      camera.shake(1.2);
      hostX = 420;
      hostLean = -14;
      pointTarget = { x: 1260, y: 500 };
      hostExpr = "cringe_teeth_grit";
    } else if (isSub5 || isSub6) {
      camera.setTarget(1260, 480, 1.9);
      camera.shake(1.5);
      hostX = 420;
      hostLean = -18;
      pointTarget = { x: 1260, y: 480 };
      hostExpr = "shock_home_alone";
    } else if (isSub7) {
      camera.setTarget(1260, 480, 1.55);
      hostX = 440;
      hostLean = 10;
      pointTarget = { x: 1260, y: 480 };
      hostExpr = "confused_squint";
    } else if (isSub8) {
      camera.setTarget(1260, 480, 1.65);
      hostX = 420;
      hostLean = -14;
      pointTarget = { x: 1260, y: 480 };
      hostExpr = "shock_eye_pop";
    } else {
      camera.cutTo(440, 540, 1.45);
      hostX = 440;
      hostLean = 0;
      hostExpr = "smug_finger_guns";
      pointTarget = void 0;
    }
    let bg = `
      <!-- Infinite full-bleed backdrop -->
      <rect x="-4000" y="-4000" width="10000" height="10000" fill="#f8fafc"/>
      <line x1="-4000" y1="840" x2="6000" y2="840" stroke="#e2e8f0" stroke-width="4"/>
    `;
    if (isSub1) {
      bg += renderBuccalBossFightBanner(1260, 480, sceneTime);
      overlays += renderHandDrawnCircle({ x: 1260, y: 480 }, 190, 120, sceneTime, "BOSS FIGHT");
    } else if (isSub2) {
      bg += `
        <g transform="translate(1260, 480)" filter="url(#cardShadow)">
          <circle cx="0" cy="0" r="100" fill="#fddfb0" stroke="#111" stroke-width="6"/>
          <ellipse cx="-45" cy="20" rx="25" ry="35" fill="#facc15" stroke="#ca8a04" stroke-width="4"/>
          <ellipse cx="45" cy="20" rx="25" ry="35" fill="#facc15" stroke="#ca8a04" stroke-width="4"/>
          <rect x="-190" y="120" width="380" height="45" rx="8" fill="#0f172a"/>
          <text x="0" y="150" font-family="'Impact', sans-serif" font-size="20" fill="#facc15" text-anchor="middle">
            BUCCAL FAT: WHAT MAKES A FACE ALIVE
          </text>
        </g>
      `;
    } else if (isSub3 || isSub4) {
      bg += renderCrazedSurgeonScoop(1260, 520, sceneTime);
      overlays += renderActionLines({ x: 1260, y: 480 }, 220, sceneTime);
    } else if (isSub5 || isSub6) {
      bg += `
        <g transform="translate(1260, 480)" filter="url(#cardShadow)">
          <rect x="-180" y="20" width="360" height="70" rx="10" fill="#475569" stroke="#1e293b" stroke-width="7"/>
          <circle cx="-45" cy="-35" r="90" fill="#cbd5e1" stroke="#94a3b8" stroke-width="6"/>
          <ellipse cx="70" cy="-45" rx="50" ry="20" fill="#f43f5e" stroke="#be123c" stroke-width="4" transform="rotate(-15)" filter="url(#glow)"/>
          <ellipse cx="110" cy="-75" rx="40" ry="16" fill="#f43f5e" stroke="#be123c" stroke-width="4" transform="rotate(10)" filter="url(#glow)"/>
          <rect x="-210" y="110" width="420" height="50" rx="10" fill="#1e293b" stroke="#f43f5e" stroke-width="4"/>
          <text x="0" y="142" font-family="'Impact', sans-serif" font-size="22" fill="#fda4af" letter-spacing="1" text-anchor="middle">
            PASTRAMI SLICER: 0.01mm CHEEKBONES
          </text>
        </g>
      `;
      overlays += renderActionLines({ x: 1260, y: 480 }, 220, sceneTime);
    } else if (isSub7) {
      bg += `
        <g transform="translate(1260, 480)" filter="url(#cardShadow)">
          <rect x="-220" y="-120" width="440" height="240" rx="16" fill="#0f172a" stroke="#38bdf8" stroke-width="5"/>
          <text x="0" y="-70" font-family="'Impact', sans-serif" font-size="26" fill="#38bdf8" letter-spacing="2" text-anchor="middle">
            "OZEMPIC FACE" PHENOMENON
          </text>
          <line x1="-160" y1="30" x2="160" y2="30" stroke="#475569" stroke-width="4"/>
          <path d="M -150 -10 Q 0 80 150 -10" fill="none" stroke="#ef4444" stroke-width="6"/>
          <text x="0" y="90" font-family="'Courier New', monospace" font-size="15" font-weight="bold" fill="#facc15" text-anchor="middle">
            [SKIN ELASTICITY: ZERO BOUNCE-BACK]
          </text>
        </g>
      `;
    } else if (isSub8) {
      bg += `
        <g transform="translate(1260, 480)" filter="url(#cardShadow)">
          <path d="M -140 80 L -140 -40 C -140 -80 -60 -80 -60 -40 L -60 80 Z" fill="#64748b" stroke="#334155" stroke-width="6"/>
          <text x="-100" y="-30" font-family="serif" font-size="18" font-weight="bold" fill="#0f172a" text-anchor="middle">R.I.P.</text>
          <text x="-100" y="-5" font-family="serif" font-size="11" fill="#0f172a" text-anchor="middle">SEA CAPTAIN</text>
          <circle cx="60" cy="-40" r="35" fill="#f8fafc" stroke="#09090b" stroke-width="4"/>
          <path d="M 25 5 L 95 5 L 125 100 L -5 100 Z" fill="#09090b"/>
          <line x1="50" y1="-35" x2="50" y2="40" stroke="#38bdf8" stroke-width="5" stroke-dasharray="10 6"/>
          <rect x="-210" y="110" width="420" height="50" rx="8" fill="#09090b" stroke="#a1a1aa" stroke-width="3"/>
          <text x="0" y="142" font-family="'Impact', sans-serif" font-size="20" fill="#e4e4e7" text-anchor="middle">
            MOURNING IN A VICTORIAN GOTHIC NOVEL
          </text>
        </g>
      `;
      overlays += renderActionLines({ x: 1260, y: 480 }, 240, sceneTime);
    } else {
      bg += `
        <g transform="translate(1260, 480)">
          <rect x="-220" y="-120" width="440" height="60" rx="12" fill="#0f172a" stroke="#ef4444" stroke-width="5" filter="url(#cardShadow)"/>
          <text x="0" y="-80" font-family="'Impact', sans-serif" font-size="24" fill="#f87171" letter-spacing="2" text-anchor="middle">
            SMOOTH REPLICA MONOCULTURE
          </text>
          ${[-130, 0, 130].map((cx) => `
            <g transform="translate(${cx}, 40)">
              <circle cx="0" cy="-40" r="32" fill="#e2e8f0" stroke="#94a3b8" stroke-width="5"/>
              <ellipse cx="-10" cy="-40" rx="4" ry="4" fill="#0f172a"/>
              <ellipse cx="10" cy="-40" rx="4" ry="4" fill="#0f172a"/>
              <line x1="0" y1="-8" x2="0" y2="80" stroke="#64748b" stroke-width="8"/>
            </g>
          `).join("")}
        </g>
      `;
    }
    const hostFigure = {
      id: "host_stick",
      state: {
        x: hostX,
        y: hostY,
        scale: 1.34,
        timeSec: sceneTime,
        spineLean: hostLean,
        isWalking,
        pointTarget,
        expression: hostExpr,
        gazeTarget: pointTarget
      }
    };
    return {
      backgroundSvg: bg + overlays,
      stickFigures: [hostFigure],
      shake: shakeAmt
    };
  }
};

// src/scenes/Scene16_TikTokTribunal.ts
var Scene16_TikTokTribunal = {
  id: "scene_16_tiktok_tribunal",
  name: "TikTok Tribunal, Wednesday Dance & Zapruder 8mm",
  startTime: 408.63,
  endTime: 474.34,
  render(ctx) {
    const { sceneTime, camera } = ctx;
    const isSub1 = sceneTime < 7;
    const isSub2 = sceneTime >= 7 && sceneTime < 14;
    const isSub3 = sceneTime >= 14 && sceneTime < 21;
    const isSub4 = sceneTime >= 21 && sceneTime < 28;
    const isSub5 = sceneTime >= 28 && sceneTime < 36;
    const isSub6 = sceneTime >= 36 && sceneTime < 44;
    const isSub7 = sceneTime >= 44 && sceneTime < 51;
    const isSub8 = sceneTime >= 51 && sceneTime < 58;
    const isSub9 = sceneTime >= 58;
    let hostX = 420;
    let hostY = 650;
    let hostLean = 8;
    let isWalking = false;
    let rightHandProp = "none";
    let hostExpr = "deadpan_classic";
    let pointTarget = { x: 1260, y: 480 };
    let overlays = "";
    let shakeAmt = 0;
    if (isSub1 || isSub2) {
      camera.setTarget(960, 540, 1.05);
      hostX = 420;
      hostLean = 8;
      pointTarget = { x: 1260, y: 480 };
      hostExpr = "confused_squint";
    } else if (isSub3) {
      camera.setTarget(1260, 520, 1.6);
      hostX = 440;
      hostLean = -10;
      pointTarget = { x: 1260, y: 480 };
      hostExpr = "smug_rock_eyebrow";
    } else if (isSub4) {
      camera.setTarget(1260, 480, 1.65);
      camera.shake(1.4);
      hostX = 420;
      hostLean = -14;
      pointTarget = { x: 1260, y: 480 };
      hostExpr = "shock_eye_pop";
    } else if (isSub5) {
      camera.setTarget(1260, 480, 1.85);
      hostX = 440;
      hostLean = -8;
      pointTarget = { x: 1260, y: 480 };
      hostExpr = "shock_eye_pop";
    } else if (isSub6) {
      camera.setTarget(1260, 480, 1.55);
      hostX = 440;
      hostLean = 10;
      rightHandProp = "pointer";
      pointTarget = { x: 1260, y: 480 };
      hostExpr = "skeptical_raised_brow";
    } else if (isSub7 || isSub8) {
      camera.setTarget(1260, 480, 1.5);
      hostX = 440;
      hostLean = 10;
      pointTarget = { x: 1260, y: 480 };
      hostExpr = "confused_squint";
    } else {
      camera.cutTo(440, 540, 1.45);
      camera.shake(1.5);
      hostX = 440;
      hostLean = 0;
      hostExpr = "shock_home_alone";
      pointTarget = void 0;
    }
    let bg = `
      <!-- Infinite full-bleed backdrop -->
      <rect x="-4000" y="-4000" width="10000" height="10000" fill="#f8fafc"/>
      <line x1="-4000" y1="840" x2="6000" y2="840" stroke="#e2e8f0" stroke-width="4"/>
    `;
    if (isSub1 || isSub2) {
      bg += `
        ${renderJennaOrtega({ x: 1260, y: 630, scale: 2.2, timeSec: sceneTime })}
        <g transform="translate(1260, 240)">
          <rect x="-160" y="-25" width="320" height="50" rx="10" fill="#0f172a" stroke="#a855f7" stroke-width="4" filter="url(#cardShadow)"/>
          <text x="0" y="8" font-family="'Impact', sans-serif" font-size="20" fill="#c084fc" letter-spacing="1" text-anchor="middle">
            JENNA ORTEGA INTERNET SCRUTINY
          </text>
        </g>
      `;
      overlays += renderHandDrawnCircle({ x: 1260, y: 480 }, 180, 120, sceneTime, "SCRUTINY");
    } else if (isSub3) {
      bg += renderWednesdayThingPerformance(1260, 520, sceneTime);
      overlays += renderActionLines({ x: 1260, y: 480 }, 220, sceneTime);
    } else if (isSub4) {
      bg += `
        <g transform="translate(1260, 480)" filter="url(#cardShadow)">
          <rect x="-230" y="-120" width="460" height="240" rx="16" fill="#0f172a" stroke="#a855f7" stroke-width="6"/>
          <text x="0" y="-60" font-family="'Impact', sans-serif" font-size="28" fill="#c084fc" letter-spacing="2" text-anchor="middle">
            TIKTOK FORENSIC TRIBUNAL
          </text>
          <rect x="-35" y="-10" width="70" height="35" rx="6" fill="#78350f" stroke="#451a03" stroke-width="3"/>
          <line x1="0" y1="25" x2="0" y2="70" stroke="#78350f" stroke-width="8"/>
          <text x="0" y="90" font-family="'Courier New', monospace" font-size="15" font-weight="bold" fill="#facc15" text-anchor="middle">
            [ GUILTY UNTIL PROVEN REGULAR ]
          </text>
        </g>
      `;
      overlays += renderHandDrawnCircle({ x: 1260, y: 480 }, 180, 110, sceneTime, "DIGITAL COURT");
    } else if (isSub5) {
      const spin = sceneTime * 360 % 360;
      bg += `
        <g transform="translate(1260, 480)" filter="url(#cardShadow)">
          <rect x="-120" y="-50" width="240" height="150" rx="14" fill="#334155" stroke="#0f172a" stroke-width="7"/>
          <g transform="translate(-70, -80) rotate(${spin})">
            <circle cx="0" cy="0" r="45" fill="none" stroke="#94a3b8" stroke-width="6"/>
            <line x1="-45" y1="0" x2="45" y2="0" stroke="#94a3b8" stroke-width="4"/>
          </g>
          <g transform="translate(70, -80) rotate(${spin * 1.2})">
            <circle cx="0" cy="0" r="45" fill="none" stroke="#94a3b8" stroke-width="6"/>
            <line x1="-45" y1="0" x2="45" y2="0" stroke="#94a3b8" stroke-width="4"/>
          </g>
          <polygon points="120,0 320,-80 320,80" fill="#fef08a" opacity="0.35" filter="url(#glow)"/>
          <text x="0" y="140" font-family="'Courier New', monospace" font-size="18" font-weight="bold" fill="#38bdf8" text-anchor="middle">
            1963 ZAPRUDER 8MM FORENSICS
          </text>
        </g>
      `;
      overlays += renderHandDrawnArrow({ x: 740, y: 520 }, { x: 1080, y: 480 }, sceneTime, "FRAME BY FRAME");
    } else if (isSub6) {
      bg += `
        <g transform="translate(1260, 480)" filter="url(#cardShadow)">
          <rect x="-220" y="-130" width="440" height="260" rx="16" fill="#020617" stroke="#38bdf8" stroke-width="5"/>
          <line x1="0" y1="-130" x2="0" y2="130" stroke="#38bdf8" stroke-width="4" stroke-dasharray="8 6"/>
          
          <text x="-110" y="-85" font-family="'Impact', sans-serif" font-size="20" fill="#94a3b8" text-anchor="middle">2020 CHEEK</text>
          <circle cx="-110" cy="-10" r="42" fill="#e2e8f0"/>

          <text x="110" y="-85" font-family="'Impact', sans-serif" font-size="20" fill="#f43f5e" text-anchor="middle">2024 CHEEK</text>
          <polygon points="110,-50 140,25 80,25" fill="#f43f5e"/>

          <text x="0" y="105" font-family="'Courier New', monospace" font-size="15" font-weight="bold" fill="#38bdf8" text-anchor="middle">
            DELTA: -100% FAT PADS
          </text>
        </g>
      `;
    } else if (isSub7 || isSub8) {
      bg += `
        <g transform="translate(1260, 480)" filter="url(#cardShadow)">
          <rect x="-220" y="-120" width="440" height="240" rx="16" fill="#0f172a" stroke="#ca8a04" stroke-width="5"/>
          <circle cx="0" cy="-30" r="24" fill="#cbd5e1"/>
          <path d="M -22 -6 L 22 -6 L 16 50 L -16 50 Z" fill="#94a3b8"/>
          <text x="0" y="80" font-family="'Impact', sans-serif" font-size="22" fill="#facc15" text-anchor="middle">
            SIZE 4: NOW CONSIDERED "CURVY"
          </text>
          <text x="0" y="105" font-family="'Courier New', monospace" font-size="13" fill="#ffffff" text-anchor="middle">
            (OBJECTIVELY INSANE LA STANDARD)
          </text>
        </g>
      `;
    } else {
      const flash = Math.sin(sceneTime * 16) > 0;
      bg += `
        <g transform="translate(1260, 480)">
          <rect x="-220" y="-120" width="440" height="240" rx="18" fill="${flash ? "#dc2626" : "#0f172a"}" stroke="#ffffff" stroke-width="6" filter="url(#cardShadow)"/>
          <text x="0" y="-55" font-family="'Impact', sans-serif" font-size="32" fill="#ffffff" letter-spacing="3" text-anchor="middle">
            \u{1F6A8} LA CURVY ALERT \u{1F6A8}
          </text>
          <text x="0" y="0" font-family="'Courier New', monospace" font-size="20" font-weight="bold" fill="#fef08a" text-anchor="middle">
            [ SIZE 4 DETECTED ]
          </text>
          <text x="0" y="70" font-family="'Impact', sans-serif" font-size="20" fill="#ffffff" text-anchor="middle">
            IMMEDIATE TRIBUNAL SUMMONS
          </text>
        </g>
      `;
      overlays += renderActionLines({ x: 1260, y: 480 }, 260, sceneTime);
    }
    const hostFigure = {
      id: "host_stick",
      state: {
        x: hostX,
        y: hostY,
        scale: 1.34,
        timeSec: sceneTime,
        spineLean: hostLean,
        isWalking,
        rightHandProp,
        pointTarget,
        expression: hostExpr,
        gazeTarget: pointTarget
      }
    };
    return {
      backgroundSvg: bg + overlays,
      stickFigures: [hostFigure],
      shake: shakeAmt
    };
  }
};

// src/scenes/Scene17_CyborgMonoculture.ts
var Scene17_CyborgMonoculture = {
  id: "scene_17_cyborg_monoculture",
  name: "Cyborg RPG Creator, Carbs 2008 & Frozen Forehead",
  startTime: 474.34,
  endTime: 540.354,
  render(ctx) {
    const { sceneTime, camera } = ctx;
    const isSub1 = sceneTime < 6;
    const isSub2 = sceneTime >= 6 && sceneTime < 12;
    const isSub3 = sceneTime >= 12 && sceneTime < 18;
    const isSub4 = sceneTime >= 18 && sceneTime < 25;
    const isSub5 = sceneTime >= 25 && sceneTime < 32;
    const isSub6 = sceneTime >= 32 && sceneTime < 39;
    const isSub7 = sceneTime >= 39 && sceneTime < 47;
    const isSub8 = sceneTime >= 47 && sceneTime < 54;
    const isSub9 = sceneTime >= 54;
    let hostX = 420;
    let hostY = 650;
    let hostLean = 8;
    let isWalking = false;
    let hostExpr = "deadpan_classic";
    let pointTarget = { x: 1260, y: 480 };
    let overlays = "";
    let shakeAmt = 0;
    if (isSub1) {
      camera.setTarget(960, 540, 1.05);
      const walkProg = Math.min(1, sceneTime / 1.5);
      hostX = 260 + walkProg * 160;
      isWalking = walkProg < 1;
      hostLean = 8;
      pointTarget = { x: 1260, y: 460 };
      hostExpr = "deadpan_classic";
    } else if (isSub2) {
      camera.setTarget(1260, 480, 1.6);
      hostX = 420;
      hostLean = -10;
      pointTarget = { x: 1260, y: 480 };
      hostExpr = "shock_eye_pop";
    } else if (isSub3 || isSub4) {
      camera.setTarget(1260, 480, 1.7);
      hostX = 440;
      hostLean = 8;
      pointTarget = { x: 1260, y: 480 };
      hostExpr = "confused_squint";
    } else if (isSub5 || isSub6) {
      camera.setTarget(1260, 480, 1.55);
      hostX = 440;
      hostLean = -12;
      pointTarget = { x: 1260, y: 480 };
      hostExpr = "cringe_teeth_grit";
    } else if (isSub7 || isSub8) {
      camera.setTarget(1260, 480, 1.85);
      camera.shake(1);
      hostX = 420;
      hostLean = 14;
      pointTarget = { x: 1260, y: 500 };
      hostExpr = "smug_rock_eyebrow";
    } else {
      camera.cutTo(440, 540, 1.45);
      hostX = 440;
      hostLean = 0;
      hostExpr = "smug_finger_guns";
      pointTarget = void 0;
    }
    let bg = `
      <!-- Infinite full-bleed backdrop -->
      <rect x="-4000" y="-4000" width="10000" height="10000" fill="#f8fafc"/>
      <line x1="-4000" y1="840" x2="6000" y2="840" stroke="#e2e8f0" stroke-width="4"/>
    `;
    if (isSub1) {
      bg += `
        <g transform="translate(1260, 480)" filter="url(#cardShadow)">
          <rect x="-240" y="-150" width="480" height="300" rx="16" fill="#030712" stroke="#06b6d4" stroke-width="5"/>
          <text x="0" y="-110" font-family="'Courier New', monospace" font-size="18" font-weight="bold" fill="#38bdf8" text-anchor="middle">
            CHARACTER CREATOR v4.2 [CYBORG]
          </text>
          <text x="-210" y="-60" font-family="'Courier New', monospace" font-size="14" fill="#ffffff">BODY_FAT: 0% [LOCKED]</text>
          <text x="-210" y="-10" font-family="'Courier New', monospace" font-size="14" fill="#ffffff">CHEEK_SHARP: 100% [MAX]</text>
          <text x="-210" y="40" font-family="'Courier New', monospace" font-size="14" fill="#ffffff">EMOTIONS: 0% [DISABLED]</text>
          <rect x="-210" y="80" width="420" height="45" rx="8" fill="#0f172a" stroke="#38bdf8" stroke-width="3"/>
          <text x="0" y="110" font-family="'Impact', sans-serif" font-size="18" fill="#facc15" text-anchor="middle">
            [ READY: HOLLYWOOD REPLICA GENERATED ]
          </text>
        </g>
      `;
      overlays += renderHandDrawnCircle({ x: 1260, y: 480 }, 220, 140, sceneTime, "RPG CREATOR");
    } else if (isSub2) {
      bg += renderLithiumBatteryPack(1260, 480, sceneTime);
      overlays += renderActionLines({ x: 1260, y: 480 }, 220, sceneTime);
    } else if (isSub3 || isSub4) {
      bg += `
        <g transform="translate(1260, 480)" filter="url(#cardShadow)">
          <rect x="-130" y="-180" width="260" height="360" fill="#dc2626" stroke="#991b1b" stroke-width="8"/>
          <rect x="-120" y="-170" width="120" height="270" fill="#60a5fa"/>
          <rect x="0" y="-170" width="120" height="270" fill="#dc2626"/>
          <rect x="-120" y="100" width="240" height="70" fill="#0f172a"/>
          <ellipse cx="0" cy="-30" rx="80" ry="45" fill="#fde047" stroke="#0f172a" stroke-width="6" filter="url(#glow)"/>
          <text x="0" y="145" font-family="'Impact', sans-serif" font-size="30" fill="#fde047" letter-spacing="3" text-anchor="middle">
            CARBS 2008
          </text>
        </g>
      `;
      overlays += renderHandDrawnArrow({ x: 740, y: 520 }, { x: 1100, y: 480 }, sceneTime, "ERA OF CARBS");
    } else if (isSub5 || isSub6) {
      bg += `
        <g transform="translate(1260, 480)" filter="url(#cardShadow)">
          <rect x="-80" y="-120" width="160" height="240" rx="20" fill="#f8fafc" stroke="#334155" stroke-width="6"/>
          <rect x="-60" y="0" width="120" height="100" rx="10" fill="#94a3b8"/>
          <text x="0" y="-40" font-family="'Impact', sans-serif" font-size="20" fill="#dc2626" text-anchor="middle">BOTOX JAR</text>
          <text x="0" y="55" font-family="'Courier New', monospace" font-size="12" font-weight="bold" fill="#0f172a" text-anchor="middle">
            DRAINED MATTER
          </text>
          <rect x="-210" y="140" width="420" height="45" rx="8" fill="#0f172a"/>
          <text x="0" y="170" font-family="'Impact', sans-serif" font-size="18" fill="#f87171" text-anchor="middle">
            DRAINED OF ALL ORGANIC FEELING
          </text>
        </g>
      `;
    } else {
      bg += `
        <g transform="translate(1260, 480)" filter="url(#cardShadow)">
          <rect x="-230" y="-140" width="460" height="280" rx="18" fill="#0f172a" stroke="#ef4444" stroke-width="6"/>
          
          <g transform="translate(60, 10)">
            <circle cx="0" cy="-30" r="32" fill="#fddfb0" stroke="#111" stroke-width="4"/>
            <rect x="-30" y="-50" width="60" height="20" rx="3" fill="#94a3b8" stroke="#475569" stroke-width="3"/>
            <text x="0" y="-36" font-family="'Courier New', monospace" font-size="9" font-weight="bold" fill="#0f172a" text-anchor="middle">0 WRINKLES</text>
            <path d="M -10 -20 L -18 50 L -2 50 Z" fill="#38bdf8" opacity="0.95"/>
            <path d="M 10 -20 L 2 50 L 18 50 Z" fill="#38bdf8" opacity="0.95"/>
          </g>

          <g transform="translate(-100, 20)">
            <circle cx="0" cy="-30" r="26" fill="#fddfb0" stroke="#111" stroke-width="4"/>
            <ellipse cx="-6" cy="-30" rx="3" ry="3" fill="#111"/>
            <ellipse cx="6" cy="-30" rx="3" ry="3" fill="#111"/>
            <polygon points="-18,-5 18,-5 12,60 -12,60" fill="#18181b"/>
          </g>

          <rect x="-180" y="95" width="360" height="35" rx="6" fill="#000000" opacity="0.9"/>
          <text x="0" y="118" font-family="sans-serif" font-size="16" font-weight="bold" fill="#ffffff" text-anchor="middle">
            "I AM DEVASTATED, BRAD." (0 WRINKLES)
          </text>
        </g>
      `;
      overlays += renderActionLines({ x: 1260, y: 480 }, 240, sceneTime);
    }
    const hostFigure = {
      id: "host_stick",
      state: {
        x: hostX,
        y: hostY,
        scale: 1.34,
        timeSec: sceneTime,
        spineLean: hostLean,
        isWalking,
        pointTarget,
        expression: hostExpr,
        gazeTarget: pointTarget
      }
    };
    return {
      backgroundSvg: bg + overlays,
      stickFigures: [hostFigure],
      shake: shakeAmt
    };
  }
};

// src/scenes/Scene18_EconomicOutro.ts
var Scene18_EconomicOutro = {
  id: "scene_18_economic_outro",
  name: "Economic Flex, Gold Wheelbarrow, Butler & Outro",
  startTime: 540.354,
  endTime: 644.08,
  render(ctx) {
    const { sceneTime, camera } = ctx;
    const isSub1 = sceneTime < 8;
    const isSub2 = sceneTime >= 8 && sceneTime < 16;
    const isSub3 = sceneTime >= 16 && sceneTime < 24;
    const isSub4 = sceneTime >= 24 && sceneTime < 32;
    const isSub5 = sceneTime >= 32 && sceneTime < 40;
    const isSub6 = sceneTime >= 40 && sceneTime < 48;
    const isSub7 = sceneTime >= 48 && sceneTime < 56;
    const isSub8 = sceneTime >= 56 && sceneTime < 64;
    const isSub9 = sceneTime >= 64 && sceneTime < 72;
    const isSub10 = sceneTime >= 72 && sceneTime < 80;
    const isSub11 = sceneTime >= 80 && sceneTime < 88;
    const isSub12 = sceneTime >= 88 && sceneTime < 96;
    const isSub13 = sceneTime >= 96;
    let hostX = 420;
    let hostY = 650;
    let hostLean = 8;
    let isWalking = false;
    let rightHandProp = "none";
    let hostExpr = "deadpan_classic";
    let pointTarget = { x: 1260, y: 480 };
    let overlays = "";
    let shakeAmt = 0;
    if (isSub1 || isSub2 || isSub3 || isSub4) {
      camera.setTarget(1260, 500, 1.55);
      hostX = 420;
      hostLean = 8;
      pointTarget = { x: 1260, y: 520 };
      hostExpr = "deadpan_classic";
    } else if (isSub5 || isSub6 || isSub7) {
      camera.setTarget(1260, 480, 1.8);
      camera.shake(1.2);
      hostX = 420;
      hostLean = -14;
      pointTarget = { x: 1260, y: 500 };
      hostExpr = "shock_eye_pop";
    } else if (isSub8) {
      camera.setTarget(960, 540, 1.1);
      hostX = 440;
      hostLean = 10;
      rightHandProp = "pointer";
      pointTarget = { x: 1260, y: 480 };
      hostExpr = "smug_rock_eyebrow";
    } else if (isSub9) {
      camera.setTarget(1260, 480, 1.6);
      hostX = 440;
      hostLean = -8;
      pointTarget = { x: 1260, y: 480 };
      hostExpr = "smug_chef_kiss";
    } else if (isSub10) {
      camera.setTarget(1260, 480, 1.55);
      hostX = 440;
      hostLean = 8;
      pointTarget = { x: 1260, y: 480 };
      hostExpr = "confused_squint";
    } else if (isSub11) {
      camera.setTarget(1260, 480, 1.5);
      hostX = 440;
      hostLean = -10;
      pointTarget = { x: 1260, y: 480 };
      hostExpr = "smug_rock_eyebrow";
    } else {
      camera.setTarget(960, 540, 1.3);
      hostX = 960;
      hostY = 650;
      hostLean = 0;
      hostExpr = "smug_finger_guns";
      pointTarget = void 0;
    }
    let bg = `
      <!-- Infinite full-bleed backdrop -->
      <rect x="-4000" y="-4000" width="10000" height="10000" fill="#f8fafc"/>
      <line x1="-4000" y1="840" x2="6000" y2="840" stroke="#e2e8f0" stroke-width="4"/>
    `;
    if (isSub1 || isSub2 || isSub3 || isSub4) {
      bg += renderBillionaireGoldElevator(1260, 520, sceneTime);
      overlays += renderHandDrawnCircle({ x: 1260, y: 480 }, 190, 120, sceneTime, "ECONOMIC DIVIDE");
    } else if (isSub5 || isSub6 || isSub7) {
      bg += `
        <g transform="translate(1260, 480)" filter="url(#cardShadow)">
          <polygon points="-50,-10 130,-10 100,60 0,60" fill="#facc15" stroke="#ca8a04" stroke-width="6"/>
          <circle cx="125" cy="90" r="26" fill="#78350f" stroke="#ca8a04" stroke-width="5"/>
          <rect x="0" y="-45" width="70" height="24" rx="4" fill="#0284c7" stroke="#0369a1" stroke-width="2" transform="rotate(-15)"/>
          <rect x="35" y="-55" width="70" height="24" rx="4" fill="#0284c7" stroke="#0369a1" stroke-width="2" transform="rotate(20)"/>
          <path d="M 130 0 C 170 20 190 70 170 110 C 150 140 200 160 180 190" fill="none" stroke="#ffffff" stroke-width="28"/>
          <text x="145" y="60" font-family="'Impact', sans-serif" font-size="15" fill="#dc2626">$1,200/MO</text>
          <rect x="-210" y="-120" width="420" height="50" rx="8" fill="#0f172a" stroke="#34d399" stroke-width="3"/>
          <text x="0" y="-88" font-family="'Impact', sans-serif" font-size="22" fill="#6ee7b7" text-anchor="middle">
            PHARMA RECEIPT: $1,200.00 / MONTH
          </text>
        </g>
      `;
      overlays += renderActionLines({ x: 1260, y: 480 }, 240, sceneTime);
    } else if (isSub8) {
      bg += `
        <g transform="translate(1260, 480)" filter="url(#cardShadow)">
          <rect x="-220" y="-130" width="440" height="260" rx="16" fill="#0f172a" stroke="#38bdf8" stroke-width="5"/>
          <text x="0" y="-85" font-family="'Impact', sans-serif" font-size="22" fill="#38bdf8" letter-spacing="2" text-anchor="middle">
            HOLLYWOOD OUTSOURCE LIST
          </text>
          <text x="-180" y="-40" font-family="'Courier New', monospace" font-size="16" fill="#ffffff">DRIVING ......... [OUTSOURCED \u2713]</text>
          <text x="-180" y="-5" font-family="'Courier New', monospace" font-size="16" fill="#ffffff">CLEANING ........ [OUTSOURCED \u2713]</text>
          <text x="-180" y="30" font-family="'Courier New', monospace" font-size="16" fill="#ffffff">CHILD-REARING ... [OUTSOURCED \u2713]</text>
          <text x="-180" y="65" font-family="'Courier New', monospace" font-size="16" font-weight="bold" fill="#34d399">APPETITE ........ [BIG PHARMA \u2713]</text>
        </g>
      `;
    } else if (isSub9) {
      bg += `
        <g transform="translate(1260, 480)" filter="url(#cardShadow)">
          <circle cx="0" cy="-60" r="30" fill="#fddfb0" stroke="#111" stroke-width="4"/>
          <circle cx="10" cy="-62" r="10" fill="none" stroke="#eab308" stroke-width="3"/>
          <polygon points="-25,-25 25,-25 20,80 -20,80" fill="#09090b"/>
          <polygon points="-12,-25 12,-25 0,15" fill="#ffffff"/>
          <ellipse cx="60" cy="25" rx="80" ry="16" fill="#e2e8f0" stroke="#94a3b8" stroke-width="4"/>
          <rect x="35" y="15" width="50" height="14" rx="3" fill="#fde047" stroke="#ca8a04" stroke-width="2"/>
          <text x="0" y="125" font-family="'Impact', sans-serif" font-size="22" fill="#facc15" text-anchor="middle">
            CONCIERGE DOCTOR: DIAMOND SYRINGE
          </text>
        </g>
      `;
      overlays += renderActionLines({ x: 1260, y: 480 }, 220, sceneTime);
    } else if (isSub10) {
      bg += `
        <g transform="translate(1260, 480)" filter="url(#cardShadow)">
          <rect x="-210" y="-80" width="420" height="170" rx="12" fill="#f8fafc" stroke="#334155" stroke-width="6"/>
          <polygon points="-210,-80 0,30 210,-80" fill="none" stroke="#94a3b8" stroke-width="4"/>
          <g transform="translate(-40, -40)">
            <circle cx="0" cy="0" r="26" fill="#fddfb0" stroke="#111" stroke-width="3.5"/>
            <ellipse cx="-7" cy="-2" rx="3" ry="4" fill="#111"/>
            <ellipse cx="7" cy="-2" rx="3" ry="4" fill="#111"/>
          </g>
          <text x="0" y="65" font-family="'Impact', sans-serif" font-size="20" fill="#be185d" text-anchor="middle">
            #10 BUSINESS ENVELOPE (FITS 1 CELEB)
          </text>
        </g>
      `;
      overlays += renderHandDrawnCircle({ x: 1260, y: 480 }, 190, 100, sceneTime, "FITS IN ENVELOPE");
    } else if (isSub11) {
      bg += renderYouAreNotLazyCard(1260, 480, sceneTime);
    } else {
      const isClicked = Math.sin(sceneTime * 6) > 0;
      bg += `
        <g transform="translate(960, 320)" filter="url(#cardShadow)">
          <rect x="-220" y="-130" width="440" height="260" rx="18" fill="#0f172a" stroke="#ef4444" stroke-width="6"/>
          <g transform="translate(0, -35) scale(${isClicked ? 0.95 : 1})">
            <rect x="-150" y="-35" width="300" height="70" rx="35" fill="#dc2626" filter="url(#glow)"/>
            <text x="0" y="10" font-family="'Impact', sans-serif" font-size="30" fill="#ffffff" letter-spacing="2" text-anchor="middle">
              ${isClicked ? "SUBSCRIBED \u2713" : "SUBSCRIBE"}
            </text>
          </g>
          <polygon points="40,-5 40,35 52,24 66,48 78,42 64,18 84,18" fill="#ffffff" stroke="#000" stroke-width="2"/>
          <text x="0" y="65" font-family="'Patrick Hand', cursive, sans-serif" font-size="26" fill="#cbd5e1" text-anchor="middle">
            (Or don't. I'm not your dad.)
          </text>
        </g>
      `;
      overlays += renderActionLines({ x: 960, y: 320 }, 220, sceneTime);
    }
    const hostFigure = {
      id: "host_stick",
      state: {
        x: hostX,
        y: hostY,
        scale: 1.34,
        timeSec: sceneTime,
        spineLean: hostLean,
        isWalking,
        rightHandProp,
        pointTarget,
        expression: hostExpr,
        gazeTarget: pointTarget
      }
    };
    return {
      backgroundSvg: bg + overlays,
      stickFigures: [hostFigure],
      shake: shakeAmt
    };
  }
};

// src/scenes/SceneRegistry.ts
var ALL_SCENES = [
  Scene01_Ecosystem,
  Scene02_TechBro,
  Scene03_Celebrities,
  Scene04_Unsubscribe,
  Scene05_TimBurtonPS1,
  Scene06_Pendulum,
  Scene07_HeroinChic,
  Scene08_PixarMom,
  Scene09_HourglassPR,
  Scene10_BossClosesTab,
  Scene11_Y2KFashion,
  Scene12_GLP1CheatCode,
  Scene13_HollywoodDenial,
  Scene14_MCUSuperhero,
  Scene15_BuccalFat,
  Scene16_TikTokTribunal,
  Scene17_CyborgMonoculture,
  Scene18_EconomicOutro
];
function getActiveScene(timeSec) {
  for (const scene of ALL_SCENES) {
    if (timeSec >= scene.startTime && timeSec < scene.endTime) {
      return scene;
    }
  }
  if (timeSec >= ALL_SCENES[ALL_SCENES.length - 1].endTime) {
    return ALL_SCENES[ALL_SCENES.length - 1];
  }
  return ALL_SCENES[0];
}

// src/character/StickFigure.ts
function renderStickFigure(id, state) {
  let {
    x = 0,
    y = 0,
    scale = 1,
    rotation = 0,
    expression,
    timeSec = 0,
    isTalking = true,
    spineLean = 0,
    headTilt,
    pose,
    gazeX = 0.45,
    gazeY = -0.2,
    pointTarget,
    leftHandTarget,
    isWalking = false,
    bodyFacing = "right",
    blink = false,
    eyeStyle,
    eyebrowTilt = 0,
    eyebrowHeight = 0,
    eyebrowRaiseLeft,
    mouthShape,
    mouthOpen = 0,
    leftArmAngle1 = 160,
    leftArmAngle2 = -15,
    rightArmAngle1 = 20,
    rightArmAngle2 = 15,
    leftHandProp = "none",
    rightHandProp = "none",
    leftLegAngle1 = 118,
    leftLegAngle2 = 0,
    rightLegAngle1 = 62,
    rightLegAngle2 = 0,
    costume = "none",
    comicFx,
    alpha = 1
  } = state;
  if (timeSec > 0) {
    const breath = Math.sin(timeSec * 3) * 3.2;
    const sway = Math.sin(timeSec * 1.6) * 2;
    y += breath;
    spineLean = (spineLean ?? 0) + sway * 0.7;
    if (state.blink === void 0) {
      const blinkCycle = timeSec % 3.4;
      blink = blinkCycle > 3.25 && blinkCycle < 3.39;
    }
    gazeX = (gazeX ?? 0.45) + Math.sin(timeSec * 1.5) * 0.05;
    gazeY = (gazeY ?? -0.2) + Math.cos(timeSec * 2) * 0.03;
    if (isTalking && mouthOpen === 0 && (!mouthShape || mouthShape === "smile_teeth" || mouthShape === "talking_open" || mouthShape === "talking_flap")) {
      const flutter = Math.sin(timeSec * 14.5) * 0.5 + Math.sin(timeSec * 22) * 0.3 + 0.2;
      if (flutter > 0.1) {
        mouthShape = "talking_open";
        mouthOpen = Math.min(1, Math.max(0.12, flutter));
      }
    }
  }
  if (expression) {
    if (expression.startsWith("disgust_")) {
      headTilt ??= 10;
      eyeStyle ??= "squint";
      mouthShape ??= "cringe_wavy";
      eyebrowRaiseLeft ??= true;
      pose ??= "shrug";
      comicFx ??= "sweat_drop";
    } else if (expression.startsWith("cringe_")) {
      headTilt ??= 12;
      eyeStyle ??= "squint";
      mouthShape ??= "cringe_wavy";
      pose ??= "facepalm";
      comicFx ??= "sweat_drop";
    } else if (expression.startsWith("fear_")) {
      headTilt ??= 0;
      eyeStyle ??= "shock";
      mouthShape ??= "open_o";
      pose ??= "facepalm";
      comicFx ??= "sweat_drop";
    } else if (expression.startsWith("frustration_")) {
      headTilt ??= 12;
      eyeStyle ??= "deadpan_dots";
      mouthShape ??= "deadpan_line";
      pose ??= "facepalm";
      comicFx ??= "sweat_drop";
    } else if (expression.startsWith("rage_")) {
      headTilt ??= 0;
      eyeStyle ??= "laser";
      mouthShape ??= "scream";
      pose ??= "mind_blown";
      comicFx ??= "shock_lightning";
    } else if (expression.startsWith("deadpan_")) {
      headTilt ??= 0;
      eyeStyle ??= "deadpan_dots";
      mouthShape ??= "deadpan_line";
      pose ??= "default";
      comicFx ??= "none";
    } else if (expression.startsWith("smug_")) {
      headTilt ??= -8;
      eyeStyle ??= "normal";
      mouthShape ??= "smirk";
      eyebrowRaiseLeft ??= true;
      pose ??= "hands_on_hips";
      comicFx ??= "none";
    } else if (expression.startsWith("skeptical_") || expression.startsWith("confused_")) {
      headTilt ??= 14;
      eyeStyle ??= "squint";
      mouthShape ??= "deadpan_line";
      eyebrowRaiseLeft ??= true;
      pose ??= "crossed_arms";
      comicFx ??= "question_marks";
    } else if (expression.startsWith("shock_")) {
      headTilt ??= 0;
      eyeStyle ??= "eye_pop";
      mouthShape ??= "jaw_drop";
      pose ??= "mind_blown";
      comicFx ??= "exclamation";
    } else if (expression.startsWith("mind_blown_")) {
      headTilt ??= 0;
      eyeStyle ??= "sparkle_star";
      mouthShape ??= "jaw_drop";
      pose ??= "mind_blown";
      comicFx ??= "shock_lightning";
    } else if (expression.startsWith("crying_") || expression.startsWith("sad_") || expression.startsWith("defeated_")) {
      headTilt ??= 12;
      eyeStyle ??= "tear_crying";
      mouthShape ??= "jaw_drop";
      pose ??= "facepalm";
      comicFx ??= "sweat_drop";
    }
  }
  headTilt = (headTilt ?? -6) + Math.sin(timeSec * 2.4) * 1.5 + (isTalking ? Math.sin(timeSec * 6.5) * 1.8 : 0);
  pose ??= "default";
  eyeStyle ??= "normal";
  eyebrowRaiseLeft ??= false;
  mouthShape ??= "smile_teeth";
  comicFx ??= "none";
  if (pose === "shrug") {
    leftArmAngle1 = (state.leftArmAngle1 ?? 205) + Math.sin(timeSec * 3.6) * 4;
    leftArmAngle2 = (state.leftArmAngle2 ?? -65) + Math.cos(timeSec * 3.2) * 3;
    rightArmAngle1 = (state.rightArmAngle1 ?? -25) - Math.sin(timeSec * 3.6) * 4;
    rightArmAngle2 = (state.rightArmAngle2 ?? 65) - Math.cos(timeSec * 3.2) * 3;
    headTilt += 10;
    if (mouthShape === "smile_teeth") mouthShape = "smirk";
    if (eyebrowHeight === 0) eyebrowHeight = 8;
  } else if (pose === "point_camera") {
    const pointPulse = isTalking ? Math.sin(timeSec * 5.5) * 3.5 : Math.sin(timeSec * 2.5) * 1.5;
    rightArmAngle1 = (state.rightArmAngle1 ?? 0) + pointPulse;
    rightArmAngle2 = (state.rightArmAngle2 ?? 0) - pointPulse * 0.5;
    leftArmAngle1 = (state.leftArmAngle1 ?? 150) + Math.cos(timeSec * 2.8) * 4;
    leftArmAngle2 = state.leftArmAngle2 ?? -20;
    headTilt += 2;
    gazeX = 0;
    gazeY = 0;
  } else if (pose === "facepalm") {
    const sigh = Math.sin(timeSec * 2) * 2;
    rightArmAngle1 = (state.rightArmAngle1 ?? -75) + sigh;
    rightArmAngle2 = (state.rightArmAngle2 ?? 135) - sigh;
    leftArmAngle1 = (state.leftArmAngle1 ?? 150) + Math.cos(timeSec * 2.5) * 3;
    leftArmAngle2 = state.leftArmAngle2 ?? -20;
    headTilt += -9 + sigh;
    if (mouthShape === "smile_teeth") mouthShape = "deadpan_line";
  } else if (pose === "hands_on_hips") {
    const hipSway = Math.sin(timeSec * 2) * 3;
    leftArmAngle1 = (state.leftArmAngle1 ?? 125) + hipSway;
    leftArmAngle2 = state.leftArmAngle2 ?? -95;
    rightArmAngle1 = (state.rightArmAngle1 ?? 55) - hipSway;
    rightArmAngle2 = state.rightArmAngle2 ?? 95;
    headTilt += 4;
  } else if (pose === "crossed_arms") {
    const chestBreath = Math.sin(timeSec * 3) * 2.5;
    leftArmAngle1 = (state.leftArmAngle1 ?? 110) + chestBreath;
    leftArmAngle2 = state.leftArmAngle2 ?? -115;
    rightArmAngle1 = (state.rightArmAngle1 ?? 70) - chestBreath;
    rightArmAngle2 = state.rightArmAngle2 ?? 115;
    headTilt += -4;
  } else if (pose === "mind_blown") {
    const jitter = Math.sin(timeSec * 18) * 3.5;
    leftArmAngle1 = (state.leftArmAngle1 ?? -115) + jitter;
    leftArmAngle2 = (state.leftArmAngle2 ?? 110) - jitter;
    rightArmAngle1 = (state.rightArmAngle1 ?? -65) - jitter;
    rightArmAngle2 = (state.rightArmAngle2 ?? -110) + jitter;
    headTilt += Math.sin(timeSec * 12) * 2;
    eyeStyle = "shock";
    mouthShape = "open_o";
  } else if (pose === "waving") {
    const waveSweep = Math.sin(timeSec * 8) * 26;
    rightArmAngle1 = (state.rightArmAngle1 ?? -70) + waveSweep;
    rightArmAngle2 = (state.rightArmAngle2 ?? 45) + waveSweep * 0.4;
    leftArmAngle1 = (state.leftArmAngle1 ?? 160) + Math.sin(timeSec * 3) * 3;
    leftArmAngle2 = state.leftArmAngle2 ?? -15;
  } else {
    if (isTalking) {
      const gL = Math.sin(timeSec * 4.2) * 12 + Math.sin(timeSec * 7.1) * 6;
      const gR = Math.cos(timeSec * 4.8) * 14 - Math.sin(timeSec * 8.3) * 5;
      leftArmAngle1 = (state.leftArmAngle1 ?? 160) + gL;
      leftArmAngle2 = (state.leftArmAngle2 ?? -15) + gL * 0.6;
      rightArmAngle1 = (state.rightArmAngle1 ?? 20) + gR;
      rightArmAngle2 = (state.rightArmAngle2 ?? 15) - gR * 0.6;
    } else {
      const idleArm = Math.sin(timeSec * 2.2) * 3;
      leftArmAngle1 = (state.leftArmAngle1 ?? 160) + idleArm;
      leftArmAngle2 = state.leftArmAngle2 ?? -15;
      rightArmAngle1 = (state.rightArmAngle1 ?? 20) - idleArm;
      rightArmAngle2 = state.rightArmAngle2 ?? 15;
    }
  }
  const neckX = 0;
  const neckY = -120;
  const shoulderY = -95;
  const hipY = 55;
  if (pointTarget) {
    const targetLocalX = (pointTarget.x - x) / (scale ?? 1.32);
    const targetLocalY = (pointTarget.y - y) / (scale ?? 1.32);
    const armDx = targetLocalX - 10;
    const armDy = targetLocalY - shoulderY;
    const targetAngle = Math.atan2(armDy, armDx) * 180 / Math.PI;
    rightArmAngle1 = targetAngle + Math.sin(timeSec * 6) * 3;
    rightArmAngle2 = -8 + Math.cos(timeSec * 5) * 4;
  }
  if (leftHandTarget) {
    const targetLocalX = (leftHandTarget.x - x) / (scale ?? 1.32);
    const targetLocalY = (leftHandTarget.y - y) / (scale ?? 1.32);
    const armDx = targetLocalX - -10;
    const armDy = targetLocalY - shoulderY;
    const targetAngle = Math.atan2(armDy, armDx) * 180 / Math.PI;
    leftArmAngle1 = targetAngle + Math.sin(timeSec * 6) * 3;
    leftArmAngle2 = 8 - Math.cos(timeSec * 5) * 4;
  }
  if (isWalking) {
    const walkPhase = timeSec * 9;
    const stride = Math.sin(walkPhase);
    leftLegAngle1 = (leftLegAngle1 ?? 90) + stride * 32;
    rightLegAngle1 = (rightLegAngle1 ?? 90) - stride * 32;
    leftLegAngle2 = stride > 0 ? stride * 35 : 0;
    rightLegAngle2 = stride < 0 ? -stride * 35 : 0;
    if (!pointTarget) rightArmAngle1 = (rightArmAngle1 ?? 90) + stride * 35;
    if (!leftHandTarget) leftArmAngle1 = (leftArmAngle1 ?? 90) - stride * 35;
  }
  const upperArmLen = 78;
  const foreArmLen = 78;
  const radL1 = leftArmAngle1 * Math.PI / 180;
  const elbowLX = -10 + Math.cos(radL1) * upperArmLen;
  const elbowLY = shoulderY + Math.sin(radL1) * upperArmLen;
  const radL2 = (leftArmAngle1 + leftArmAngle2) * Math.PI / 180;
  const handLX = elbowLX + Math.cos(radL2) * foreArmLen;
  const handLY = elbowLY + Math.sin(radL2) * foreArmLen;
  const radR1 = rightArmAngle1 * Math.PI / 180;
  const elbowRX = 10 + Math.cos(radR1) * upperArmLen;
  const elbowRY = shoulderY + Math.sin(radR1) * upperArmLen;
  const radR2 = (rightArmAngle1 + rightArmAngle2) * Math.PI / 180;
  const handRX = elbowRX + Math.cos(radR2) * foreArmLen;
  const handRY = elbowRY + Math.sin(radR2) * foreArmLen;
  const upperLegLen = 85;
  const lowerLegLen = 85;
  const radLL1 = leftLegAngle1 * Math.PI / 180;
  const kneeLX = Math.cos(radLL1) * upperLegLen;
  const kneeLY = hipY + Math.sin(radLL1) * upperLegLen;
  const radLL2 = (leftLegAngle1 + leftLegAngle2) * Math.PI / 180;
  const footLX = kneeLX + Math.cos(radLL2) * lowerLegLen;
  const footLY = kneeLY + Math.sin(radLL2) * lowerLegLen;
  const radRL1 = rightLegAngle1 * Math.PI / 180;
  const kneeRX = Math.cos(radRL1) * upperLegLen;
  const kneeRY = hipY + Math.sin(radRL1) * upperLegLen;
  const radRL2 = (rightLegAngle1 + rightLegAngle2) * Math.PI / 180;
  const footRX = kneeRX + Math.cos(radRL2) * lowerLegLen;
  const footRY = kneeRY + Math.sin(radRL2) * lowerLegLen;
  const pOffsetX = gazeX * 6;
  const pOffsetY = gazeY * 5;
  let eyesMarkup = "";
  if (blink) {
    eyesMarkup = `
      <path d="M -44 -16 Q -24 -6 -4 -16" stroke="#111" stroke-width="7" stroke-linecap="round" fill="none"/>
      <path d="M 22 -14 Q 38 -4 54 -14" stroke="#111" stroke-width="7" stroke-linecap="round" fill="none"/>
    `;
  } else if (eyeStyle === "deadpan_dots") {
    eyesMarkup = `
      <line x1="-36" y1="-16" x2="-12" y2="-16" stroke="#111" stroke-width="7" stroke-linecap="round"/>
      <line x1="26" y1="-14" x2="50" y2="-14" stroke="#111" stroke-width="7" stroke-linecap="round"/>
    `;
  } else if (eyeStyle === "side_eye") {
    eyesMarkup = `
      <ellipse cx="-24" cy="-16" rx="21" ry="25" fill="#ffffff" stroke="#111111" stroke-width="6"/>
      <circle cx="-10" cy="-16" r="8" fill="#111111"/>
      <ellipse cx="38" cy="-14" rx="17" ry="26" fill="#ffffff" stroke="#111111" stroke-width="6"/>
      <circle cx="50" cy="-14" r="7" fill="#111111"/>
    `;
  } else if (eyeStyle === "sparkle_star") {
    eyesMarkup = `
      <ellipse cx="-24" cy="-16" rx="22" ry="26" fill="#fff" stroke="#111" stroke-width="6"/>
      <ellipse cx="38" cy="-14" rx="18" ry="26" fill="#fff" stroke="#111" stroke-width="6"/>
      <text x="-24" y="-8" font-size="24" fill="#eab308" text-anchor="middle" font-weight="bold">\u2605</text>
      <text x="38" y="-6" font-size="20" fill="#eab308" text-anchor="middle" font-weight="bold">\u2605</text>
    `;
  } else if (eyeStyle === "tear_crying") {
    eyesMarkup = `
      <ellipse cx="-24" cy="-16" rx="21" ry="25" fill="#ffffff" stroke="#111111" stroke-width="6"/>
      <circle cx="-20" cy="-14" r="6" fill="#111"/>
      <ellipse cx="38" cy="-14" rx="17" ry="26" fill="#ffffff" stroke="#111111" stroke-width="6"/>
      <circle cx="42" cy="-12" r="5" fill="#111"/>
      <!-- Flowing Tears -->
      <path d="M -24 -2 Q -35 25 -28 55" fill="none" stroke="#38bdf8" stroke-width="6" stroke-linecap="round" filter="url(#glow)"/>
      <path d="M 38 0 Q 48 25 42 55" fill="none" stroke="#38bdf8" stroke-width="6" stroke-linecap="round" filter="url(#glow)"/>
    `;
  } else if (eyeStyle === "eye_pop") {
    eyesMarkup = `
      <path d="M -24 -16 Q -50 -40 -70 -20" stroke="#111" stroke-width="5" fill="none"/>
      <ellipse cx="-75" cy="-20" rx="26" ry="32" fill="#fff" stroke="#111" stroke-width="6" filter="url(#cardShadow)"/>
      <circle cx="-75" cy="-20" r="10" fill="#ef4444"/>

      <path d="M 38 -14 Q 60 -40 85 -20" stroke="#111" stroke-width="5" fill="none"/>
      <ellipse cx="90" cy="-20" rx="24" ry="30" fill="#fff" stroke="#111" stroke-width="6" filter="url(#cardShadow)"/>
      <circle cx="90" cy="-20" r="9" fill="#ef4444"/>
    `;
  } else if (eyeStyle === "tim_burton") {
    eyesMarkup = `
      <ellipse cx="-24" cy="-12" rx="28" ry="24" fill="#352936" opacity="0.6"/>
      <ellipse cx="38" cy="-10" rx="24" ry="24" fill="#352936" opacity="0.6"/>
      <ellipse cx="-24" cy="-16" rx="20" ry="22" fill="#fdfaf0" stroke="#111" stroke-width="6"/>
      <ellipse cx="38" cy="-14" rx="18" ry="22" fill="#fdfaf0" stroke="#111" stroke-width="6"/>
      <circle cx="-24" cy="-16" r="5" fill="#111"/>
      <circle cx="38" cy="-14" r="5" fill="#111"/>
    `;
  } else if (eyeStyle === "ps1") {
    eyesMarkup = `
      <polygon points="-44,-16 -24,-34 -4,-16 -24,2" fill="#55ff55" stroke="#003300" stroke-width="4"/>
      <polygon points="20,-14 38,-32 56,-14 38,4" fill="#55ff55" stroke="#003300" stroke-width="4"/>
      <rect x="-29" y="-21" width="10" height="10" fill="#000"/>
      <rect x="33" y="-19" width="10" height="10" fill="#000"/>
    `;
  } else if (eyeStyle === "shock") {
    eyesMarkup = `
      <ellipse cx="-24" cy="-16" rx="25" ry="28" fill="#ffffff" stroke="#111111" stroke-width="7"/>
      <ellipse cx="38" cy="-14" rx="22" ry="28" fill="#ffffff" stroke="#111111" stroke-width="7"/>
      <circle cx="-24" cy="-16" r="4" fill="#111111"/>
      <circle cx="38" cy="-14" r="4" fill="#111111"/>
    `;
  } else if (eyeStyle === "laser") {
    eyesMarkup = `
      <ellipse cx="-24" cy="-16" rx="22" ry="26" fill="#fff" stroke="#111" stroke-width="6"/>
      <ellipse cx="38" cy="-14" rx="18" ry="26" fill="#fff" stroke="#111" stroke-width="6"/>
      <circle cx="-24" cy="-16" r="12" fill="#ff0033"/>
      <circle cx="38" cy="-14" r="12" fill="#ff0033"/>
    `;
  } else {
    eyesMarkup = `
      <path d="M -44 -34 Q -28 -44 -12 -36" fill="none" stroke="#111111" stroke-width="4" stroke-linecap="round"/>
      <ellipse cx="-24" cy="-16" rx="21" ry="25" fill="#ffffff" stroke="#111111" stroke-width="6"/>
      <path d="M ${-20 + pOffsetX} ${-36 + pOffsetY} C ${-8 + pOffsetX} ${-36 + pOffsetY} ${-2 + pOffsetX} ${-24 + pOffsetY} ${-8 + pOffsetX} ${-6 + pOffsetY} C ${-14 + pOffsetX} ${8 + pOffsetY} ${-26 + pOffsetX} ${6 + pOffsetY} ${-26 + pOffsetX} ${-8 + pOffsetY} C ${-26 + pOffsetX} ${-24 + pOffsetY} ${-26 + pOffsetX} ${-36 + pOffsetY} ${-20 + pOffsetX} ${-36 + pOffsetY} Z" fill="#111111"/>
      <ellipse cx="38" cy="-14" rx="17" ry="26" fill="#ffffff" stroke="#111111" stroke-width="6"/>
      <path d="M ${42 + pOffsetX} ${-34 + pOffsetY} C ${54 + pOffsetX} ${-34 + pOffsetY} ${58 + pOffsetX} ${-22 + pOffsetY} ${54 + pOffsetX} ${-4 + pOffsetY} C ${49 + pOffsetX} ${10 + pOffsetY} ${39 + pOffsetX} ${8 + pOffsetY} ${39 + pOffsetX} ${-6 + pOffsetY} C ${39 + pOffsetX} ${-22 + pOffsetY} ${38 + pOffsetX} ${-34 + pOffsetY} ${42 + pOffsetX} ${-34 + pOffsetY} Z" fill="#111111"/>
    `;
  }
  if (state.gazeTarget) {
    const dx = state.gazeTarget.x - x;
    const dy = state.gazeTarget.y - (y - 120);
    const dist = Math.hypot(dx, dy) || 1;
    gazeX = Math.max(-1, Math.min(1, dx / Math.max(300, dist * 0.7)));
    gazeY = Math.max(-1, Math.min(1, dy / Math.max(300, dist * 0.7)));
    headTilt ??= Math.max(-14, Math.min(14, dy / dist * 12));
  }
  const hL = state.eyebrowLeftHeight ?? eyebrowHeight;
  const hR = state.eyebrowRightHeight ?? eyebrowHeight;
  let ebL_Y = -48 - hL;
  let ebR_Y = -44 - hR;
  if (eyebrowRaiseLeft || state.eyebrowLeftHeight && state.eyebrowLeftHeight > 8) {
    ebL_Y -= 14;
  }
  const tL = state.eyebrowLeftTilt !== void 0 ? state.eyebrowLeftTilt : eyebrowTilt * 8;
  const tR = state.eyebrowRightTilt !== void 0 ? state.eyebrowRightTilt : eyebrowTilt * 8;
  const eyebrowsMarkup = `
    <path d="M -45 ${ebL_Y + tL} Q -25 ${ebL_Y - 14} -5 ${ebL_Y - tL}" fill="none" stroke="#111111" stroke-width="6" stroke-linecap="round"/>
    <path d="M 22 ${ebR_Y - tR} Q 42 ${ebR_Y - 14} 62 ${ebR_Y + tR}" fill="none" stroke="#111111" stroke-width="6" stroke-linecap="round"/>
  `;
  const mouthY = 32;
  const mouthH = Math.max(16, 26 + mouthOpen * 18);
  let mouthMarkup = "";
  if (state.mouthWobble && state.mouthWobble > 0.15) {
    const wamp = state.mouthWobble * 10;
    mouthMarkup = `
      <g id="mouth" transform="translate(0, ${mouthY}) rotate(4)">
        <path d="M -26 0 Q -15 ${-wamp} -4 0 Q 8 ${wamp} 20 0" fill="none" stroke="#111111" stroke-width="6" stroke-linecap="round"/>
      </g>
    `;
  } else if (mouthShape === "deadpan_line" || state.mouthSmile !== void 0 && Math.abs(state.mouthSmile) < 0.15) {
    mouthMarkup = `
      <g id="mouth" transform="translate(0, ${mouthY}) rotate(4)">
        <line x1="-28" y1="0" x2="22" y2="0" stroke="#111111" stroke-width="7" stroke-linecap="round"/>
      </g>
    `;
  } else if (mouthShape === "cringe_wavy") {
    mouthMarkup = `
      <g id="mouth" transform="translate(0, ${mouthY}) rotate(4)">
        <path d="M -26 0 Q -15 -8 -4 0 Q 8 8 20 0" fill="none" stroke="#111111" stroke-width="6" stroke-linecap="round"/>
      </g>
    `;
  } else if (mouthShape === "jaw_drop") {
    mouthMarkup = `
      <g id="mouth" transform="translate(0, ${mouthY})">
        <path d="M -25 -10 L 25 -10 L 20 85 C 0 95 -10 95 -20 85 Z" fill="#2b0a0a" stroke="#111111" stroke-width="6"/>
        <rect x="-18" y="-8" width="36" height="12" rx="3" fill="#ffffff"/>
        <!-- Long floppy tongue -->
        <path d="M -12 40 Q 0 90 25 75 Q 10 50 12 40 Z" fill="#ef4444" stroke="#b91c1c" stroke-width="2"/>
      </g>
    `;
  } else if (mouthShape === "open_o") {
    mouthMarkup = `
      <g id="mouth" transform="translate(0, ${mouthY}) rotate(4)">
        <ellipse cx="-2" cy="0" rx="16" ry="20" fill="#221111" stroke="#111111" stroke-width="6"/>
        <ellipse cx="-2" cy="8" rx="10" ry="6" fill="#e11d48"/>
      </g>
    `;
  } else if (mouthShape === "smirk") {
    mouthMarkup = `
      <g id="mouth" transform="translate(0, ${mouthY}) rotate(4)">
        <path d="M -24 4 Q 0 8 26 -6" fill="none" stroke="#111111" stroke-width="7" stroke-linecap="round"/>
      </g>
    `;
  } else if (mouthShape === "wide_grin") {
    mouthMarkup = `
      <g id="mouth" transform="translate(0, ${mouthY}) rotate(4)">
        <path d="M -28 -6 Q 0 26 28 -6 Z" fill="#ffffff" stroke="#111111" stroke-width="6" stroke-linejoin="round"/>
        <line x1="-28" y1="-6" x2="28" y2="-6" stroke="#111111" stroke-width="4"/>
        <line x1="-10" y1="-6" x2="-10" y2="10" stroke="#111111" stroke-width="3"/>
        <line x1="8" y1="-6" x2="8" y2="10" stroke="#111111" stroke-width="3"/>
      </g>
    `;
  } else if (mouthShape === "scream") {
    mouthMarkup = `
      <g id="mouth" transform="translate(0, ${mouthY}) rotate(4)">
        <ellipse cx="-2" cy="10" rx="26" ry="34" fill="#1b0808" stroke="#111111" stroke-width="7"/>
        <rect x="-20" y="-5" width="40" height="10" rx="3" fill="#fff"/>
        <ellipse cx="-2" cy="28" rx="14" ry="8" fill="#e84a5f"/>
      </g>
    `;
  } else {
    mouthMarkup = `
      <g id="mouth" transform="translate(0, ${mouthY}) rotate(4)">
        <path d="M -30 ${-mouthH / 2} L 24 ${-mouthH / 2 + 2} L 18 ${mouthH / 2} L -28 ${mouthH / 2 - 2} Z" fill="#ffffff" stroke="#111111" stroke-width="6" stroke-linejoin="round"/>
        ${mouthH > 28 ? `<line x1="-27" y1="0" x2="20" y2="0" stroke="#111111" stroke-width="3" opacity="0.3"/>` : ""}
      </g>
    `;
  }
  let fxMarkup = "";
  if (comicFx === "sweat_drop") {
    fxMarkup = `
      <g transform="translate(75, -80)">
        <path d="M 0 -20 C 15 -10 15 15 0 20 C -15 15 -15 -10 0 -20 Z" fill="#38bdf8" stroke="#0284c7" stroke-width="3" filter="url(#glow)"/>
      </g>
    `;
  } else if (comicFx === "question_marks") {
    fxMarkup = `
      <g transform="translate(85, -110)">
        <text x="0" y="0" font-family="'Impact', sans-serif" font-size="36" fill="#f43f5e" filter="url(#glow)">?</text>
        <text x="25" y="-20" font-family="'Impact', sans-serif" font-size="28" fill="#ec4899">?</text>
      </g>
    `;
  } else if (comicFx === "exclamation") {
    fxMarkup = `
      <g transform="translate(0, -175)">
        <polygon points="0,0 -20,-30 0,-25 20,-30" fill="#eab308" stroke="#ca8a04" stroke-width="3" filter="url(#glow)"/>
        <text x="0" y="-35" font-family="'Impact', sans-serif" font-size="48" font-weight="bold" fill="#ef4444" text-anchor="middle" filter="url(#glow)">!</text>
      </g>
    `;
  } else if (comicFx === "speed_lines") {
    fxMarkup = `
      <g stroke="#94a3b8" stroke-width="4" opacity="0.6">
        <line x1="-120" y1="-80" x2="-60" y2="-80"/>
        <line x1="-140" y1="-40" x2="-70" y2="-40"/>
        <line x1="-130" y1="0" x2="-65" y2="0"/>
      </g>
    `;
  }
  function renderProp(prop, hx, hy, angle) {
    if (prop === "none") return "";
    if (prop === "pointer") {
      return `
        <g transform="translate(${hx} ${hy}) rotate(${angle})">
          <line x1="0" y1="0" x2="110" y2="-70" stroke="#8b4513" stroke-width="6" stroke-linecap="round"/>
          <circle cx="110" cy="-70" r="6" fill="#e74c3c"/>
        </g>
      `;
    }
    if (prop === "phone") {
      return `
        <g transform="translate(${hx} ${hy}) rotate(${angle})">
          <rect x="-16" y="-36" width="32" height="52" rx="6" fill="#222" stroke="#111" stroke-width="4"/>
          <rect x="-13" y="-30" width="26" height="40" fill="#673ab7"/>
          <circle cx="0" cy="12" r="3" fill="#fff"/>
        </g>
      `;
    }
    if (prop === "caliper") {
      return `
        <g transform="translate(${hx} ${hy}) rotate(${angle})">
          <path d="M 0 0 L 120 -60" stroke="#475569" stroke-width="8" stroke-linecap="round"/>
          <path d="M 120 -60 L 120 -20 M 60 -30 L 60 -10" stroke="#0ea5e9" stroke-width="6" stroke-linecap="round"/>
          <rect x="50" y="-45" width="40" height="20" rx="3" fill="#0284c7" stroke="#0369a1" stroke-width="2"/>
          <text x="70" y="-31" font-family="'Courier New', monospace" font-size="11" font-weight="bold" fill="#fff" text-anchor="middle">0.02mm</text>
        </g>
      `;
    }
    if (prop === "stamp") {
      return `
        <g transform="translate(${hx} ${hy}) rotate(${angle})">
          <rect x="-18" y="-45" width="36" height="15" rx="4" fill="#b91c1c" stroke="#111" stroke-width="3"/>
          <rect x="-8" y="-30" width="16" height="30" fill="#78350f" stroke="#111" stroke-width="3"/>
          <circle cx="0" cy="5" r="14" fill="#92400e"/>
        </g>
      `;
    }
    if (prop === "diet_coke") {
      return `
        <g transform="translate(${hx} ${hy}) rotate(${angle})">
          <rect x="-14" y="-38" width="28" height="46" rx="4" fill="#c41230" stroke="#111" stroke-width="4"/>
          <rect x="-12" y="-36" width="24" height="8" fill="#e0e0e0"/>
          <text x="0" y="-12" font-family="'Impact', sans-serif" font-size="12" fill="#ffffff" text-anchor="middle" font-weight="bold">Diet</text>
          <text x="0" y="-1" font-family="'Impact', sans-serif" font-size="11" fill="#ffffff" text-anchor="middle">Coke</text>
        </g>
      `;
    }
    if (prop === "fidget_spinner") {
      return `
        <g transform="translate(${hx} ${hy}) rotate(${angle})">
          <circle cx="0" cy="0" r="12" fill="#111"/>
          <circle cx="0" cy="-24" r="10" fill="#06b6d4"/>
          <circle cx="21" cy="12" r="10" fill="#f59e0b"/>
          <circle cx="-21" cy="12" r="10" fill="#ec4899"/>
        </g>
      `;
    }
    if (prop === "coffee_cup") {
      return `
        <g transform="translate(${hx} ${hy}) rotate(${angle})">
          <rect x="-14" y="-30" width="28" height="38" rx="4" fill="#ffffff" stroke="#111" stroke-width="4"/>
          <path d="M 14 -20 Q 26 -15 14 -5" fill="none" stroke="#111" stroke-width="4"/>
          <rect x="-12" y="-18" width="24" height="14" fill="#854d0e"/>
        </g>
      `;
    }
    if (prop === "syringe") {
      return `
        <g transform="translate(${hx} ${hy}) rotate(${angle})">
          <rect x="-8" y="-35" width="16" height="42" rx="3" fill="#38bdf8" stroke="#111" stroke-width="3"/>
          <line x1="0" y1="7" x2="0" y2="24" stroke="#94a3b8" stroke-width="3" stroke-linecap="round"/>
          <rect x="-14" y="-42" width="28" height="8" rx="2" fill="#0284c7"/>
        </g>
      `;
    }
    if (prop === "money_bag") {
      return `
        <g transform="translate(${hx} ${hy}) rotate(${angle})">
          <circle cx="0" cy="0" r="22" fill="#eab308" stroke="#a16207" stroke-width="4"/>
          <text x="0" y="7" font-family="'Impact', sans-serif" font-size="20" fill="#713f12" text-anchor="middle">$</text>
        </g>
      `;
    }
    if (prop === "bread") {
      return `
        <g transform="translate(${hx} ${hy}) rotate(${angle})">
          <ellipse cx="0" cy="0" rx="28" ry="16" fill="#fde047" stroke="#ca8a04" stroke-width="4"/>
          <line x1="-12" y1="-8" x2="-6" y2="8" stroke="#a16207" stroke-width="3"/>
          <line x1="6" y1="-8" x2="12" y2="8" stroke="#a16207" stroke-width="3"/>
        </g>
      `;
    }
    return "";
  }
  let costumeMarkup = "";
  if (costume === "tech_bro") {
    costumeMarkup = `
      <path d="M -35 -90 L 35 -90 L 40 10 L -40 10 Z" fill="#1a365d" stroke="#0f172a" stroke-width="5"/>
      <path d="M 0 -90 L 0 10" stroke="#cbd5e1" stroke-width="4"/>
      <rect x="12" y="-70" width="18" height="8" rx="2" fill="#e2e8f0"/>
      <g transform="translate(0, -210)">
        <ellipse cx="0" cy="0" rx="75" ry="18" fill="#1e293b" stroke="#0f172a" stroke-width="5"/>
        <path d="M -60 0 C -60 -45 60 -45 60 0 Z" fill="#1e293b" stroke="#0f172a" stroke-width="5"/>
        <text x="0" y="-12" font-family="Arial, sans-serif" font-size="16" fill="#f59e0b" font-weight="bold" text-anchor="middle">AI / BTC</text>
      </g>
    `;
  } else if (costume === "y2k_sunglasses") {
    costumeMarkup = `
      <g transform="translate(0, -135)">
        <ellipse cx="-24" cy="0" rx="22" ry="11" fill="#111" stroke="#444" stroke-width="4"/>
        <ellipse cx="38" cy="0" rx="22" ry="11" fill="#111" stroke="#444" stroke-width="4"/>
        <line x1="-2" y1="0" x2="16" y2="0" stroke="#111" stroke-width="4"/>
      </g>
    `;
  }
  return `
    <g id="${id}" class="stick-figure" transform="translate(${x}, ${y}) rotate(${rotation}) scale(${scale})" opacity="${alpha}">
      <!-- Floor Drop Shadow -->
      <ellipse cx="0" cy="${footLY > footRY ? footLY + 10 : footRY + 10}" rx="65" ry="14" fill="#111111" opacity="0.16"/>

      <!-- Legs (Back to Front) -->
      <g id="legs" stroke="#111111" stroke-width="8" stroke-linecap="round" stroke-linejoin="round" fill="none">
        <line x1="0" y1="${hipY}" x2="${kneeLX}" y2="${kneeLY}"/>
        <line x1="${kneeLX}" y1="${kneeLY}" x2="${footLX}" y2="${footLY}"/>

        <line x1="0" y1="${hipY}" x2="${kneeRX}" y2="${kneeRY}"/>
        <line x1="${kneeRX}" y1="${kneeRY}" x2="${footRX}" y2="${footRY}"/>
      </g>

      <!-- Spine & Torso with arms -->
      <g id="torso" transform="rotate(${spineLean} 0 ${hipY})">
        <line x1="0" y1="${neckY}" x2="0" y2="${hipY}" stroke="#111111" stroke-width="8" stroke-linecap="round"/>

        ${costumeMarkup}

        <!-- Left Arm with 2-finger V hand -->
        <g id="left-arm" class="arms" stroke="#111111" stroke-width="7" stroke-linecap="round" stroke-linejoin="round" fill="none">
          <line x1="0" y1="${shoulderY}" x2="${elbowLX}" y2="${elbowLY}"/>
          <line x1="${elbowLX}" y1="${elbowLY}" x2="${handLX}" y2="${handLY}"/>
          <!-- 2-finger open V hand -->
          <line x1="${handLX}" y1="${handLY}" x2="${handLX - 22}" y2="${handLY - 12}"/>
          <line x1="${handLX}" y1="${handLY}" x2="${handLX - 18}" y2="${handLY + 20}"/>
          ${renderProp(leftHandProp, handLX, handLY, leftArmAngle1 + leftArmAngle2)}
        </g>

        <!-- Right Arm with 2-finger V hand -->
        <g id="right-arm" class="arms" stroke="#111111" stroke-width="7" stroke-linecap="round" stroke-linejoin="round" fill="none">
          <line x1="0" y1="${shoulderY}" x2="${elbowRX}" y2="${elbowRY}"/>
          <line x1="${elbowRX}" y1="${elbowRY}" x2="${handRX}" y2="${handRY}"/>
          <!-- 2-finger open V hand -->
          <line x1="${handRX}" y1="${handRY}" x2="${handRX + 22}" y2="${handRY - 14}"/>
          <line x1="${handRX}" y1="${handRY}" x2="${handRX + 20}" y2="${handRY + 18}"/>
          ${renderProp(rightHandProp, handRX, handRY, rightArmAngle1 + rightArmAngle2)}
        </g>

        <!-- HEAD GROUP (Crisp Casually Explained / Alex Meyers proportions) -->
        <g id="head" transform="translate(${neckX}, ${neckY}) rotate(${headTilt}) scale(0.72)">
          ${fxMarkup}

          <!-- Back Hair Volume Silhouette -->
          <path id="hair-back" d="
            M -75 25
            C -115 15 -125 -45 -85 -70
            C -115 -115 -60 -160 -15 -152
            C 15 -185 85 -175 105 -130
            C 145 -110 160 -45 130 -5
            C 160 45 135 110 90 95
            C 80 55 75 25 65 -5
            L -65 0 Z"
            fill="#0d0d0d" stroke="#0d0d0d" stroke-width="6" stroke-linejoin="round"/>

          <!-- Warm Creamy Peach Head Skin (tilted egg/oval shape) -->
          <path id="head-skin" d="
            M -68 15
            C -82 -40 -68 -80 -18 -85
            C 38 -87 76 -50 78 15
            C 78 68 48 88 5 88
            C -40 88 -68 70 -68 15 Z"
            fill="#fed89b" stroke="#111111" stroke-width="8" stroke-linejoin="round"/>

          <!-- Nose/Cheek Tick Mark (from reference image) -->
          <path d="M -12 8 L -10 20" fill="none" stroke="#111111" stroke-width="5" stroke-linecap="round"/>

          <!-- Facial Features -->
          <g id="face">
            ${eyebrowsMarkup}
            ${eyesMarkup}
            ${mouthMarkup}
          </g>
        </g>
      </g>
    </g>
  `;
}

// src/camera/Camera.ts
var Camera = class {
  baseWidth = 1920;
  baseHeight = 1080;
  // Active interpolated state
  current = {
    centerX: 960,
    centerY: 540,
    zoom: 1
  };
  // Target framing
  target = {
    centerX: 960,
    centerY: 540,
    zoom: 1
  };
  isInstantCut = false;
  constructor(baseWidth = 1920, baseHeight = 1080) {
    this.baseWidth = baseWidth;
    this.baseHeight = baseHeight;
  }
  setImmediate(state) {
    this.target = { ...this.target, ...state };
    this.current = { ...this.target };
    this.isInstantCut = true;
  }
  /**
   * Instant hard cut to new framing (comedic jump cut)
   */
  cutTo(centerX, centerY, zoom = 1) {
    this.setImmediate({ centerX, centerY, zoom });
  }
  /**
   * Set target framing with fast, crisp punch-in response
   */
  setTarget(xOrState, y, zoom) {
    if (typeof xOrState === "number") {
      this.target = {
        centerX: xOrState,
        centerY: y ?? this.target.centerY,
        zoom: zoom ?? this.target.zoom
      };
    } else {
      this.target = {
        ...this.target,
        ...xOrState
      };
    }
  }
  /**
   * Reset to standard wide locked-off framing
   */
  setWide() {
    this.setTarget(960, 540, 1);
  }
  shakeIntensity = 0;
  shake(intensity = 1) {
    this.shakeIntensity = Math.max(this.shakeIntensity, intensity);
  }
  triggerShake(intensity = 1) {
    this.shakeIntensity = Math.max(this.shakeIntensity, intensity);
  }
  /**
   * Snappy exponential lerp update
   */
  update(_timeMs, snappiness = 0.35) {
    if (this.isInstantCut) {
      this.isInstantCut = false;
      return;
    }
    this.current.centerX += (this.target.centerX - this.current.centerX) * snappiness;
    this.current.centerY += (this.target.centerY - this.current.centerY) * snappiness;
    this.current.zoom += (this.target.zoom - this.current.zoom) * snappiness;
    if (this.shakeIntensity > 0.05) {
      this.shakeIntensity *= 0.82;
    } else {
      this.shakeIntensity = 0;
    }
  }
  /**
   * Computes the SVG viewBox string for the current camera state
   * Unconstrained wide panning support for screen-filling realism
   */
  getViewBox(timeSec = 0) {
    const safeZoom = Math.max(0.4, Math.min(3.5, this.current.zoom));
    const w = this.baseWidth / safeZoom;
    const h = this.baseHeight / safeZoom;
    const halfW = w / 2;
    const halfH = h / 2;
    let cx = this.current.centerX;
    let cy = this.current.centerY;
    const driftX = Math.sin(timeSec * 1.8) * 3.5 + Math.cos(timeSec * 0.9) * 2;
    const driftY = Math.cos(timeSec * 1.5) * 2.5 + Math.sin(timeSec * 0.7) * 1.5;
    cx += driftX;
    cy += driftY;
    if (this.shakeIntensity > 0.05) {
      const shakeX = Math.sin(timeSec * 50) * this.shakeIntensity * 10;
      const shakeY = Math.cos(timeSec * 65) * this.shakeIntensity * 10;
      cx += shakeX;
      cy += shakeY;
    }
    const minX = cx - halfW;
    const minY = cy - halfH;
    return `${minX.toFixed(2)} ${minY.toFixed(2)} ${w.toFixed(2)} ${h.toFixed(2)}`;
  }
};

// src/subtitles/SrtParser.ts
function cleanSrtEncoding(raw) {
  let text = raw.replace(/^(\s*\.)+\s*/, "").replace(/Ifyouâve youâ€™ve/g, "If you've").replace(/If you've you've/gi, "If you've").replace(/youâve/g, "you've").replace(/youâ€™ve/g, "you've").replace(/theyâre/g, "they're").replace(/theyâ€™re/g, "they're").replace(/weâve/g, "we've").replace(/weâ€™ve/g, "we've").replace(/donât/g, "don't").replace(/donâ€™t/g, "don't").replace(/friendâs/g, "friend's").replace(/friendâ€™s/g, "friend's").replace(/trendâkind/g, "trend - kind").replace(/trendâ€”kind/g, "trend - kind").replace(/regularworkingclass/g, "regular working-class").replace(/shallowaestheticobsessed/g, "shallow, aesthetic-obsessed").replace(/inlowpoly/g, "in low-poly").replace(/lowrise/g, "low-rise").replace(/Miu Miumicroskirt/g, "Miu Miu micro-skirt").replace(/â€™/g, "'").replace(/â€”/g, " - ").replace(/—/g, " - ").replace(/â€œ/g, '"').replace(/â€/g, '"').replace(/\b(you've)\s+(you've)\b/gi, "$1").replace(/\s+/g, " ").trim();
  text = text.replace(/^[,;?!\-–—.\s]+/, "").trim();
  return text;
}
function timeStringToSeconds(tStr) {
  const [hms, ms] = tStr.trim().split(",");
  const [h, m, s] = hms.split(":").map(Number);
  return h * 3600 + m * 60 + s + parseInt(ms || "0", 10) / 1e3;
}
function parseSrt(srtContent) {
  const normalized = srtContent.replace(/\r\n/g, "\n").replace(/\r/g, "\n");
  const blocks = normalized.split(/\n\n+/);
  const items = [];
  for (const block of blocks) {
    const lines = block.trim().split("\n");
    if (lines.length < 2) continue;
    const id = parseInt(lines[0].trim(), 10);
    const timeMatch = lines[1].match(/(\d{2}:\d{2}:\d{2},\d{3})\s*-->\s*(\d{2}:\d{2}:\d{2},\d{3})/);
    if (!timeMatch) continue;
    const start = timeStringToSeconds(timeMatch[1]);
    const end = timeStringToSeconds(timeMatch[2]);
    const textLines = lines.slice(2).join(" ");
    const clean = cleanSrtEncoding(textLines);
    if (clean.length > 0) {
      items.push({
        id,
        start,
        end,
        text: textLines,
        cleanText: clean,
        words: clean.split(" ").filter((w) => w.length > 0)
      });
    }
  }
  return items;
}
function getActiveSubtitle(subtitles, timeSec) {
  for (const sub of subtitles) {
    if (timeSec >= sub.start && timeSec <= sub.end) {
      return sub;
    }
  }
  return null;
}

// src/engine/SvgRenderer.ts
function renderCompleteSvgFrame(opts) {
  const { timeSec, subtitles, camera, width = 1920, height = 1080 } = opts;
  const activeScene = getActiveScene(timeSec);
  const sceneDuration = activeScene.endTime - activeScene.startTime;
  const sceneElapsed = timeSec - activeScene.startTime;
  const progress = Math.min(1, Math.max(0, sceneElapsed / Math.max(0.1, sceneDuration)));
  const activeSub = getActiveSubtitle(subtitles, timeSec);
  const isSpeaking = activeSub !== null;
  const talkingFlap = isSpeaking ? Math.sin(timeSec * 16) * 0.5 + 0.5 : 0;
  const sceneContext = {
    timeSec,
    sceneTime: sceneElapsed,
    progress,
    talkingFlap,
    camera
  };
  const output = activeScene.render(sceneContext);
  if (output.cameraTarget) {
    camera.setTarget(output.cameraTarget.x, output.cameraTarget.y, output.cameraTarget.zoom);
  }
  if (output.shake) {
    camera.shake(output.shake);
  }
  camera.update(timeSec * 1e3);
  const viewBox = camera.getViewBox(timeSec);
  const bgSvg = output.backgroundSvg || "";
  const fgSvg = output.foregroundSvg || "";
  let charSvg = "";
  const isBlinking = timeSec % 3.4 > 3.22;
  if (output.stickFigures && output.stickFigures.length > 0) {
    charSvg = output.stickFigures.map((sf) => {
      if (sf.id === "host_stick" || sf.id.includes("host")) {
        const figureState = { ...sf.state };
        if (figureState.mouthOpen === void 0 || figureState.mouthOpen === 0) {
          figureState.mouthOpen = isSpeaking ? Math.abs(Math.sin(timeSec * 16)) * 0.9 : 0;
        }
        if (figureState.blink === void 0) {
          figureState.blink = isBlinking;
        }
        if (!figureState.gazeTarget && output.cameraTarget && output.cameraTarget.x > 700) {
          figureState.gazeTarget = { x: output.cameraTarget.x, y: output.cameraTarget.y };
        }
        const breathY = Math.sin(timeSec * 3.2) * 3.5;
        const speakBob = isSpeaking ? Math.sin(timeSec * 8) * 2.5 : 0;
        figureState.y = (figureState.y ?? 630) + breathY + speakBob;
        if (isSpeaking && figureState.pose === void 0) {
          const gestureL = Math.sin(timeSec * 4.5) * 14;
          const gestureR = Math.cos(timeSec * 5) * 18;
          figureState.leftArmAngle1 = (figureState.leftArmAngle1 ?? 160) + gestureL;
          figureState.rightArmAngle1 = (figureState.rightArmAngle1 ?? 20) + gestureR;
          figureState.spineLean = (figureState.spineLean ?? 0) + Math.sin(timeSec * 2.8) * 3;
        }
        return renderStickFigure(sf.id, figureState);
      }
      return renderStickFigure(sf.id, sf.state);
    }).join("\n");
  } else if (output.hostState) {
    const figureState = { ...output.hostState };
    if (figureState.mouthOpen === void 0 || figureState.mouthOpen === 0) {
      figureState.mouthOpen = isSpeaking ? Math.abs(Math.sin(timeSec * 16)) * 0.9 : 0;
    }
    if (figureState.blink === void 0) {
      figureState.blink = isBlinking;
    }
    if (!figureState.gazeTarget && output.cameraTarget && output.cameraTarget.x > 700) {
      figureState.gazeTarget = { x: output.cameraTarget.x, y: output.cameraTarget.y };
    }
    const breathY = Math.sin(timeSec * 3.2) * 3.5;
    const speakBob = isSpeaking ? Math.sin(timeSec * 8) * 2.5 : 0;
    figureState.y = (figureState.y ?? 630) + breathY + speakBob;
    if (isSpeaking && figureState.pose === void 0) {
      const gestureL = Math.sin(timeSec * 4.5) * 14;
      const gestureR = Math.cos(timeSec * 5) * 18;
      figureState.leftArmAngle1 = (figureState.leftArmAngle1 ?? 160) + gestureL;
      figureState.rightArmAngle1 = (figureState.rightArmAngle1 ?? 20) + gestureR;
      figureState.spineLean = (figureState.spineLean ?? 0) + Math.sin(timeSec * 2.8) * 3;
    }
    charSvg = renderStickFigure("host-figure", figureState);
  }
  let subText = "";
  if (activeSub) {
    subText = activeSub.cleanText;
  }
  let fullSvg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}" width="${width}" height="${height}">
  <defs>
    <filter id="cardShadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="8" stdDeviation="12" flood-color="#000000" flood-opacity="0.18"/>
    </filter>
    <filter id="glow" x="-30%" y="-30%" width="160%" height="160%">
      <feGaussianBlur stdDeviation="12" result="blur"/>
      <feMerge>
        <feMergeNode in="blur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
    <linearGradient id="laserGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#ef4444" stop-opacity="0.9"/>
      <stop offset="100%" stop-color="#dc2626" stop-opacity="0.1"/>
    </linearGradient>
  </defs>

  <!-- Global Infinite Full-Bleed Backdrop -->
  <rect id="global-backdrop" x="-4000" y="-4000" width="10000" height="10000" fill="#f8fafc"/>

  <g id="scene-background">${bgSvg}</g>
  <g id="scene-character">${charSvg}</g>
  <g id="scene-foreground">${fgSvg}</g>
</svg>
  `.trim();
  fullSvg = fullSvg.replace(/&(?!(amp|lt|gt|quot|apos|#\d+|#x[0-9a-fA-F]+);)/g, "&amp;");
  return {
    svg: fullSvg,
    viewBox,
    sceneId: activeScene.id,
    subText
  };
}
export {
  Camera,
  parseSrt,
  renderCompleteSvgFrame
};

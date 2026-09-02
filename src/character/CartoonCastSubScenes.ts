// 25+ High-Detail Procedural Vector Cartoon Assets for 89 Sub-Scene Comedy Pipeline
// Crafted in the authentic Casually Explained & Alex Meyers visual grammar

/**
 * 1. 8-BIT NINTENDO GLP-1 CARTIDGE
 */
export function renderNintendoGLP1Cartridge(x: number, y: number, timeSec: number = 0): string {
  const blink = Math.sin(timeSec * 8) > 0;
  return `
    <g id="asset-nintendo-glp1" transform="translate(${x}, ${y}) scale(1.6)" filter="url(#cardShadow)">
      <!-- NES Grey Cartridge Body -->
      <rect x="-170" y="-120" width="340" height="240" rx="12" fill="#475569" stroke="#1e293b" stroke-width="7"/>
      <!-- Top Grip Ridges -->
      ${[-130, -90, -50, -10, 30, 70, 110].map(rx => `
        <line x1="${rx}" y1="-120" x2="${rx}" y2="-75" stroke="#334155" stroke-width="6"/>
      `).join("")}
      <!-- Cartridge Label Sticker -->
      <rect x="-140" y="-70" width="280" height="170" rx="8" fill="#0f172a" stroke="#ca8a04" stroke-width="4"/>
      <text x="0" y="-30" font-family="'Impact', sans-serif" font-size="28" fill="#facc15" letter-spacing="2" text-anchor="middle">
        GLP-1 CHEAT CODE
      </text>
      <text x="0" y="5" font-family="'Courier New', monospace" font-size="14" font-weight="bold" fill="#38bdf8" text-anchor="middle">
        OZEMPIC • WEGOVY • MOUNJARO
      </text>
      <!-- Blinking Status Button -->
      <rect x="-120" y="30" width="240" height="30" rx="6" fill="${blink ? "#22c55e" : "#15803d"}"/>
      <text x="0" y="51" font-family="'Courier New', monospace" font-size="12" font-weight="bold" fill="#ffffff" text-anchor="middle">
        BYPASS HUNGER: [ACTIVE]
      </text>
    </g>
  `;
}

/**
 * 2. CHAINED STOMACH WITH BRASS PADLOCK
 */
export function renderChainedStomachPadlock(x: number, y: number, timeSec: number = 0): string {
  const shiver = Math.sin(timeSec * 24) * 3;
  return `
    <g id="asset-chained-stomach" transform="translate(${x}, ${y + shiver}) scale(1.65)" filter="url(#cardShadow)">
      <!-- Pink Shivering Stomach -->
      <path d="M -80 -60 C -120 40 40 120 90 20 C 120 -60 0 -90 -80 -60 Z" fill="#fda4af" stroke="#e11d48" stroke-width="8"/>
      <!-- Iron Chains Wrapping Across -->
      <line x1="-120" y1="-20" x2="120" y2="20" stroke="#334155" stroke-width="14" stroke-linecap="round"/>
      <line x1="-120" y1="20" x2="120" y2="-20" stroke="#334155" stroke-width="14" stroke-linecap="round"/>
      <line x1="-120" y1="-20" x2="120" y2="20" stroke="#64748b" stroke-width="6" stroke-dasharray="16 10"/>
      <!-- Brass Padlock -->
      <g transform="translate(0, 15)">
        <rect x="-45" y="-15" width="90" height="75" rx="12" fill="#facc15" stroke="#ca8a04" stroke-width="6"/>
        <path d="M -26 -15 L -26 -42 C -26 -68 26 -68 26 -42 L 26 -15" fill="none" stroke="#ca8a04" stroke-width="9"/>
        <circle cx="0" cy="20" r="8" fill="#78350f"/>
        <line x1="0" y1="20" x2="0" y2="38" stroke="#78350f" stroke-width="4"/>
      </g>
      <!-- Telemetry Badge -->
      <rect x="-190" y="115" width="380" height="48" rx="10" fill="#0f172a" stroke="#ef4444" stroke-width="4"/>
      <text x="0" y="147" font-family="'Impact', sans-serif" font-size="22" fill="#f87171" letter-spacing="1" text-anchor="middle">
        MOTILITY: FROZEN SOLID
      </text>
    </g>
  `;
}

/**
 * 3. 1/2 SALTINE CRACKER ON SILVER PLATTER (MAGNIFIED)
 */
export function renderSaltineCrackerPlatter(x: number, y: number, timeSec: number = 0): string {
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

/**
 * 4. SEVERED HUNGER REWARD WIRE
 */
export function renderSeveredHungerWire(x: number, y: number, timeSec: number = 0): string {
  const spark = (timeSec * 30) % 2 > 1;
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

/**
 * 5. SEDUCTIVE FRENCH BAGUETTE WITH BLOCKED STAMP
 */
export function renderSeductiveBaguette(x: number, y: number, timeSec: number = 0): string {
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

/**
 * 6. INDUSTRIAL WIND MACHINE & GALE BADGE
 */
export function renderHurricaneWindMachine(x: number, y: number, timeSec: number = 0): string {
  const fanSpin = (timeSec * 720) % 360;
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

/**
 * 7. COUCH CUSHION COIN FORAGING & STALE CHEETO
 */
export function renderCouchForagingLoot(x: number, y: number, timeSec: number = 0): string {
  return `
    <g id="asset-couch-foraging" transform="translate(${x}, ${y}) scale(1.65)" filter="url(#cardShadow)">
      <!-- Velvet Couch Cushion -->
      <rect x="-180" y="-60" width="360" height="120" rx="18" fill="#78350f" stroke="#451a03" stroke-width="7"/>
      <!-- Coins -->
      <circle cx="-80" cy="-10" r="18" fill="#facc15" stroke="#ca8a04" stroke-width="3"/>
      <text x="-80" y="-3" font-family="'Impact', sans-serif" font-size="14" fill="#78350f" text-anchor="middle">1¢</text>
      <circle cx="-40" cy="5" r="20" fill="#facc15" stroke="#ca8a04" stroke-width="3"/>
      <text x="-40" y="13" font-family="'Impact', sans-serif" font-size="16" fill="#78350f" text-anchor="middle">2¢</text>
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

/**
 * 8. "DISCOVERED HYDRATION" GALLON BOTTLE
 */
export function renderDiscoveredHydration(x: number, y: number, timeSec: number = 0): string {
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

/**
 * 9. SWISS CHEESE WEDGECUT SKELETON
 */
export function renderSwissCheeseSkull(x: number, y: number, timeSec: number = 0): string {
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

/**
 * 10. UNSEASONED CHICKEN & BROCCOLI GASLIGHT
 */
export function renderUnseasonedChickenBroccoli(x: number, y: number, timeSec: number = 0): string {
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

/**
 * 11. 4:00 AM ALARM CLOCK & TRT COCKTAIL
 */
export function renderAlarmClockTRT(x: number, y: number, timeSec: number = 0): string {
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

/**
 * 12. BOSS FIGHT #2: BUCCAL FAT EXTRACTION
 */
export function renderBuccalBossFightBanner(x: number, y: number, timeSec: number = 0): string {
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

/**
 * 13. LITHIUM-ION BATTERY PACK FOR ACTORS
 */
export function renderLithiumBatteryPack(x: number, y: number, timeSec: number = 0): string {
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

/**
 * 14. "YOU ARE NOT LAZY" SATIRICAL REASSURANCE
 */
export function renderYouAreNotLazyCard(x: number, y: number, timeSec: number = 0): string {
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

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
        COUCH FORAGING: +$0.03 &amp; 1 CHEETO
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
        "JUST DISCIPLINE &amp; TRT"
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

/**
 * 15. SHRINK-WRAPPED LEFTOVER HAM IN SUPERHERO CAPE
 * "Skin wraps around their muscles like shrink wrap on a leftover ham"
 */
export function renderShrinkWrappedHam(x: number, y: number, timeSec: number = 0): string {
  const hover = Math.sin(timeSec * 4) * 10;
  return `
    <g id="asset-shrink-wrap-ham" transform="translate(${x}, ${y + hover}) scale(1.5)" filter="url(#cardShadow)">
      <!-- Flowing Red Superhero Cape -->
      <path d="M -80 -40 Q -180 ${-20 + Math.sin(timeSec * 8) * 25} -220 ${100 + Math.cos(timeSec * 8) * 30} L -140 140 Q -90 40 -40 20 Z" fill="#dc2626" stroke="#991b1b" stroke-width="6"/>
      
      <!-- Big Pink Grocery Easter Ham Body -->
      <path d="M -80 0 C -90 -80 60 -110 120 -40 C 160 10 140 80 70 100 C -10 120 -80 60 -80 0 Z" fill="#f472b6" stroke="#db2777" stroke-width="8"/>
      
      <!-- Cross-Hatch Glaze Score Lines -->
      <g stroke="#be185d" stroke-width="4" opacity="0.6">
        <line x1="-30" y1="-50" x2="80" y2="60"/>
        <line x1="-50" y1="-20" x2="60" y2="80"/>
        <line x1="-10" y1="-70" x2="110" y2="40"/>
        <line x1="40" y1="-60" x2="-60" y2="40"/>
        <line x1="70" y1="-30" x2="-40" y2="70"/>
        <line x1="100" y1="0" x2="-10" y2="90"/>
      </g>

      <!-- Tight Plastic Cling Wrap Highlights & Glints -->
      <path d="M -70 -20 Q 20 -90 100 -30" fill="none" stroke="#ffffff" stroke-width="7" opacity="0.8" stroke-linecap="round"/>
      <path d="M -50 40 Q 30 100 100 60" fill="none" stroke="#ffffff" stroke-width="5" opacity="0.7" stroke-linecap="round"/>
      <circle cx="-10" cy="-30" r="8" fill="#ffffff" opacity="0.9"/>
      <line x1="70" y1="20" x2="95" y2="45" stroke="#ffffff" stroke-width="4" opacity="0.8"/>

      <!-- Golden Superhero Utility Belt -->
      <rect x="-70" y="10" width="160" height="24" rx="4" fill="#facc15" stroke="#ca8a04" stroke-width="4"/>
      <circle cx="10" cy="22" r="18" fill="#eab308" stroke="#854d0e" stroke-width="4"/>
      <text x="10" y="28" font-family="'Impact', sans-serif" font-size="18" fill="#78350f" font-weight="bold" text-anchor="middle">A</text>

      <!-- Supermarket Price & Calorie Tag -->
      <g transform="translate(130, -50) rotate(14)">
        <rect x="-60" y="-30" width="120" height="60" rx="6" fill="#fef08a" stroke="#ca8a04" stroke-width="3" filter="url(#cardShadow)"/>
        <text x="0" y="-8" font-family="'Courier New', monospace" font-size="14" font-weight="bold" fill="#78350f" text-anchor="middle">LEFTOVER HAM</text>
        <text x="0" y="16" font-family="'Impact', sans-serif" font-size="18" fill="#dc2626" text-anchor="middle">99% SHRINKWRAP</text>
      </g>

      <!-- Title Badge -->
      <rect x="-190" y="120" width="380" height="50" rx="12" fill="#0f172a" stroke="#ef4444" stroke-width="4"/>
      <text x="0" y="153" font-family="'Impact', sans-serif" font-size="22" fill="#f87171" letter-spacing="1" text-anchor="middle">
        MCU DEHYDRATION PROTOCOL
      </text>
    </g>
  `;
}

/**
 * 16. DELI MEAT CHEEKBONE SLICER
 * "Cheekbones sharp enough to slice deli meat"
 */
export function renderDeliCheekboneSlicer(x: number, y: number, timeSec: number = 0): string {
  const sliceSlide = Math.sin(timeSec * 8) * 30;
  return `
    <g id="asset-deli-cheek-slicer" transform="translate(${x}, ${y}) scale(1.45)" filter="url(#cardShadow)">
      <!-- Butcher Block Wooden Table Base -->
      <rect x="-240" y="100" width="480" height="60" rx="8" fill="#78350f" stroke="#451a03" stroke-width="6"/>
      <line x1="-220" y1="125" x2="220" y2="125" stroke="#92400e" stroke-width="4"/>

      <!-- Giant Wooden Cutting Board -->
      <rect x="-180" y="70" width="360" height="35" rx="6" fill="#d97706" stroke="#92400e" stroke-width="4"/>

      <!-- Razor-Sharp Titanium Cheekbone Blade -->
      <g transform="translate(-60, 20)">
        <path d="M -40 -120 Q 20 -40 80 60 L 50 70 Q 0 -20 -50 -100 Z" fill="#e2e8f0" stroke="#0284c7" stroke-width="5" filter="url(#glow)"/>
        <!-- Knife Blade Sparkle -->
        <polygon points="20,-30 25,-45 30,-30 45,-25 30,-20 25,-5 20,-20 5,-25" fill="#ffffff"/>
      </g>

      <!-- Italian Salami / Pastrami Roll Slicing Across Blade -->
      <g transform="translate(${20 + sliceSlide}, ${10 - sliceSlide * 0.4}) rotate(-25)">
        <rect x="-70" y="-30" width="140" height="60" rx="30" fill="#991b1b" stroke="#7f1d1d" stroke-width="6"/>
        <!-- Peppercorns & Fat Marbling -->
        <circle cx="-30" cy="-10" r="4" fill="#ffffff"/>
        <circle cx="10" cy="5" r="5" fill="#ffffff"/>
        <circle cx="35" cy="-8" r="3" fill="#ffffff"/>
        <circle cx="-10" cy="12" r="3" fill="#ffffff"/>
        <circle cx="-45" cy="8" r="2" fill="#000000"/>
        <circle cx="20" cy="-15" r="2" fill="#000000"/>
      </g>

      <!-- Flying Paper-Thin Slices Falling Onto Cutting Board -->
      ${[0, 1, 2].map(idx => {
        const dropY = 40 + idx * 16 + Math.sin(timeSec * 8 + idx) * 5;
        const dropX = -20 + idx * 35;
        return `
          <ellipse cx="${dropX}" cy="${dropY}" rx="28" ry="10" fill="#dc2626" stroke="#991b1b" stroke-width="3" transform="rotate(${idx * 15} ${dropX} ${dropY})"/>
        `;
      }).join("")}

      <!-- Italian Deli Sign -->
      <g transform="translate(0, -110)">
        <rect x="-210" y="-35" width="420" height="70" rx="14" fill="#0f172a" stroke="#ef4444" stroke-width="5" filter="url(#cardShadow)"/>
        <text x="0" y="2" font-family="'Impact', sans-serif" font-size="24" fill="#f87171" letter-spacing="2" text-anchor="middle">
          ★ GINO'S DELI &amp; CHEEKBONES ★
        </text>
        <text x="0" y="24" font-family="'Courier New', monospace" font-size="14" font-weight="bold" fill="#fef08a" text-anchor="middle">
          0.001mm PASTRAMI SLICES
        </text>
      </g>
    </g>
  `;
}

/**
 * 17. FROZEN BOTOX DIVORCE TEARS MELODRAMA
 * "Forehead remains completely smooth and stationary while they cry through a divorce"
 */
export function renderFrozenForeheadDivorce(x: number, y: number, timeSec: number = 0): string {
  const squirt = Math.sin(timeSec * 16) > 0;
  return `
    <g id="asset-frozen-forehead" transform="translate(${x}, ${y}) scale(1.45)" filter="url(#cardShadow)">
      <!-- Melodrama Table with Divorce Settlement -->
      <rect x="-230" y="110" width="460" height="50" rx="8" fill="#1e293b" stroke="#0f172a" stroke-width="5"/>
      
      <!-- Official Divorce Papers -->
      <g transform="translate(-110, 80) rotate(-8)">
        <rect x="-60" y="-45" width="120" height="90" rx="4" fill="#ffffff" stroke="#94a3b8" stroke-width="3" filter="url(#cardShadow)"/>
        <text x="0" y="-20" font-family="'Impact', sans-serif" font-size="12" fill="#ef4444" text-anchor="middle">DIVORCE PETITION</text>
        <line x1="-45" y1="-5" x2="45" y2="-5" stroke="#cbd5e1" stroke-width="3"/>
        <line x1="-45" y1="10" x2="45" y2="10" stroke="#cbd5e1" stroke-width="3"/>
        <line x1="-45" y1="25" x2="15" y2="25" stroke="#cbd5e1" stroke-width="3"/>
        <circle cx="35" cy="25" r="10" fill="#facc15" stroke="#ca8a04" stroke-width="3"/> <!-- Gold Ring -->
      </g>

      <!-- Glass-Smooth Frozen Forehead Barrier (Plexiglas Plate) -->
      <g transform="translate(80, -30)">
        <!-- Face Outline -->
        <circle cx="0" cy="0" r="75" fill="#fed7aa" stroke="#0f172a" stroke-width="6"/>
        
        <!-- FROZEN GLASS FOREHEAD OVERLAY -->
        <path d="M -60 -20 Q 0 -60 60 -20 L 60 -60 Q 0 -85 -60 -60 Z" fill="#bae6fd" opacity="0.6" stroke="#0284c7" stroke-width="4"/>
        <text x="0" y="-38" font-family="'Courier New', monospace" font-size="11" font-weight="bold" fill="#0369a1" text-anchor="middle">[0 WRINKLES]</text>

        <!-- Straining Eyebrows (Stuck Straight) -->
        <line x1="-45" y1="-15" x2="-15" y2="-15" stroke="#0f172a" stroke-width="7" stroke-linecap="round"/>
        <line x1="15" y1="-15" x2="45" y2="-15" stroke="#0f172a" stroke-width="7" stroke-linecap="round"/>

        <!-- Panicked Wide Eyes -->
        <circle cx="-30" cy="10" r="14" fill="#ffffff" stroke="#0f172a" stroke-width="4"/>
        <circle cx="-30" cy="10" r="6" fill="#0f172a"/>
        <circle cx="30" cy="10" r="14" fill="#ffffff" stroke="#0f172a" stroke-width="4"/>
        <circle cx="30" cy="10" r="6" fill="#0f172a"/>

        <!-- Open Weeping Mouth Trying to Frown -->
        <path d="M -30 48 Q 0 32 30 48 Q 0 72 -30 48 Z" fill="#991b1b" stroke="#0f172a" stroke-width="5"/>

        <!-- HORIZONTAL SQUIRT TEARS (Water Guns Shooting Sideways) -->
        ${squirt ? `
          <path d="M -44 10 Q -100 0 -160 20" fill="none" stroke="#38bdf8" stroke-width="7" stroke-linecap="round" filter="url(#glow)"/>
          <path d="M 44 10 Q 100 0 160 20" fill="none" stroke="#38bdf8" stroke-width="7" stroke-linecap="round" filter="url(#glow)"/>
          <circle cx="-165" cy="22" r="6" fill="#38bdf8"/>
          <circle cx="165" cy="22" r="6" fill="#38bdf8"/>
        ` : `
          <path d="M -44 10 Q -80 5 -120 15" fill="none" stroke="#38bdf8" stroke-width="6" stroke-linecap="round"/>
          <path d="M 44 10 Q 80 5 120 15" fill="none" stroke="#38bdf8" stroke-width="6" stroke-linecap="round"/>
        `}
      </g>

      <!-- Satirical Caption Banner -->
      <g transform="translate(0, -125)">
        <rect x="-220" y="-30" width="440" height="60" rx="12" fill="#0f172a" stroke="#a855f7" stroke-width="5" filter="url(#cardShadow)"/>
        <text x="0" y="8" font-family="'Impact', sans-serif" font-size="22" fill="#c084fc" letter-spacing="1" text-anchor="middle">
          TRAGIC DIVORCE: 100% STATIONARY FOREHEAD
        </text>
      </g>
    </g>
  `;
}

/**
 * 18. STANDARD BUSINESS ENVELOPE (FITS COMFORTABLY)
 * "Celebrity looking like they could comfortably fit inside a standard business envelope"
 */
export function renderBusinessEnvelope(x: number, y: number, timeSec: number = 0): string {
  const wiggle = Math.sin(timeSec * 6) * 8;
  return `
    <g id="asset-business-envelope" transform="translate(${x}, ${y}) scale(1.5)" filter="url(#cardShadow)">
      <!-- Giant Crisp White #10 Business Envelope -->
      <rect x="-190" y="-100" width="380" height="200" rx="8" fill="#ffffff" stroke="#94a3b8" stroke-width="6"/>
      
      <!-- Envelope Flap Creases -->
      <path d="M -190 -100 L 0 20 L 190 -100" fill="none" stroke="#cbd5e1" stroke-width="4"/>
      <path d="M -190 100 L -50 0" fill="none" stroke="#cbd5e1" stroke-width="4"/>
      <path d="M 190 100 L 50 0" fill="none" stroke="#cbd5e1" stroke-width="4"/>

      <!-- Postage Stamp (American Flag 68¢) -->
      <g transform="translate(130, -65)">
        <rect x="-25" y="-20" width="50" height="40" rx="3" fill="#fee2e2" stroke="#dc2626" stroke-width="3"/>
        <line x1="-20" y1="-8" x2="20" y2="-8" stroke="#dc2626" stroke-width="3"/>
        <line x1="-20" y1="4" x2="20" y2="4" stroke="#dc2626" stroke-width="3"/>
        <rect x="-20" y="-18" width="16" height="15" fill="#1e3a8a"/>
        <text x="12" y="14" font-family="sans-serif" font-size="10" font-weight="bold" fill="#1e293b">68¢</text>
      </g>

      <!-- Circular Postmark Stamp -->
      <g transform="translate(90, -65) rotate(15)" opacity="0.6">
        <circle cx="0" cy="0" r="22" fill="none" stroke="#0f172a" stroke-width="2"/>
        <text x="0" y="-4" font-family="'Courier New', monospace" font-size="7" font-weight="bold" fill="#0f172a" text-anchor="middle">HOLLYWOOD</text>
        <text x="0" y="6" font-family="'Courier New', monospace" font-size="7" font-weight="bold" fill="#0f172a" text-anchor="middle">OCT 2024</text>
      </g>

      <!-- Delivery Address Lines -->
      <g transform="translate(-130, 0)">
        <text x="0" y="-10" font-family="'Courier New', monospace" font-size="13" font-weight="bold" fill="#334155">TO: HOLLYWOOD PRESS TOUR</text>
        <text x="0" y="10" font-family="'Courier New', monospace" font-size="12" fill="#64748b">100 OZEMPIC WAY, SUITE 0</text>
        <text x="0" y="30" font-family="'Courier New', monospace" font-size="12" fill="#64748b">LOS ANGELES, CA 90210</text>
      </g>

      <!-- Stick Figure Squeezed Inside Envelope, Head & Hands Poking Out -->
      <g transform="translate(0, ${-100 + wiggle})">
        <!-- Stick Head Poking Out -->
        <circle cx="0" cy="-35" r="28" fill="#ffffff" stroke="#0f172a" stroke-width="5"/>
        <!-- Hair / Sunglasses -->
        <path d="M -26 -45 Q 0 -68 26 -45" stroke="#0f172a" stroke-width="12" fill="none" stroke-linecap="round"/>
        <rect x="-20" y="-40" width="18" height="12" rx="2" fill="#0f172a"/>
        <rect x="2" y="-40" width="18" height="12" rx="2" fill="#0f172a"/>
        <line x1="-2" y1="-34" x2="2" y2="-34" stroke="#0f172a" stroke-width="3"/>
        <!-- Cheerful Grin -->
        <path d="M -12 -22 Q 0 -12 12 -22" stroke="#0f172a" stroke-width="4" fill="none" stroke-linecap="round"/>
        <!-- Two Tiny Stick Hands Clinging to Envelope Rim -->
        <circle cx="-42" cy="-4" r="6" fill="#ffffff" stroke="#0f172a" stroke-width="4"/>
        <circle cx="42" cy="-4" r="6" fill="#ffffff" stroke="#0f172a" stroke-width="4"/>
      </g>

      <!-- Title Badge -->
      <rect x="-190" y="115" width="380" height="48" rx="10" fill="#0f172a" stroke="#22c55e" stroke-width="4"/>
      <text x="0" y="146" font-family="'Impact', sans-serif" font-size="22" fill="#4ade80" letter-spacing="1" text-anchor="middle">
        "COMFORTABLY FITS IN ENVELOPE"
      </text>
    </g>
  `;
}

/**
 * 19. OBAMA LAST CARBOHYDRATE (CIRCA 2012)
 * "Gaunt cyborg who hasn't encountered a complex carbohydrate since the Obama administration"
 */
export function renderObamaLastCarb2012(x: number, y: number, timeSec: number = 0): string {
  return `
    <g id="asset-obama-carb" transform="translate(${x}, ${y}) scale(1.45)" filter="url(#cardShadow)">
      <!-- Ornate Gold Museum Frame -->
      <rect x="-180" y="-120" width="360" height="240" rx="14" fill="#1e1b4b" stroke="#ca8a04" stroke-width="10"/>
      <rect x="-165" y="-105" width="330" height="210" rx="8" fill="#312e81" stroke="#eab308" stroke-width="3"/>

      <!-- Oval Office Blue Wallpaper & Seal -->
      <circle cx="0" cy="-20" r="70" fill="#1e3a8a" stroke="#ca8a04" stroke-width="4"/>
      <text x="0" y="-55" font-family="'Impact', sans-serif" font-size="16" fill="#facc15" text-anchor="middle">OVAL OFFICE 2012</text>

      <!-- Warm Golden Blueberry Muffin Prop (The Extinct Carb) -->
      <g transform="translate(0, -10)">
        <!-- Muffin Top -->
        <path d="M -50 0 C -60 -40 60 -40 50 0 Z" fill="#d97706" stroke="#92400e" stroke-width="6"/>
        <!-- Blueberries -->
        <circle cx="-20" cy="-18" r="7" fill="#1e3a8a"/>
        <circle cx="15" cy="-22" r="6" fill="#1e3a8a"/>
        <circle cx="2" cy="-8" r="6" fill="#1e3a8a"/>
        <!-- Paper Cup Base -->
        <polygon points="-40,0 40,0 30,35 -30,35" fill="#fef08a" stroke="#ca8a04" stroke-width="4"/>
        <!-- Rising Steam Vectors -->
        <path d="M -15 -35 Q -25 -55 -15 -70" fill="none" stroke="#ffffff" stroke-width="3" opacity="0.7"/>
        <path d="M 15 -35 Q 25 -55 15 -70" fill="none" stroke="#ffffff" stroke-width="3" opacity="0.7"/>
      </g>

      <!-- Museum Brass Plaque -->
      <g transform="translate(0, 75)">
        <rect x="-150" y="-20" width="300" height="40" rx="6" fill="#ca8a04" stroke="#854d0e" stroke-width="3"/>
        <text x="0" y="6" font-family="'Courier New', monospace" font-size="12" font-weight="bold" fill="#451a03" text-anchor="middle">
          LAST KNOWN CARB (CIRCA 2012)
        </text>
      </g>
    </g>
  `;
}

/**
 * 20. TIKTOK DUET JURY & FORENSIC JAWLINE SPEC
 */
export function renderTikTokDuetJury(x: number, y: number, timeSec: number = 0): string {
  const alertBlink = Math.sin(timeSec * 8) > 0;
  return `
    <g id="asset-tiktok-jury" transform="translate(${x}, ${y}) scale(1.45)" filter="url(#cardShadow)">
      <!-- Smartphone Housing -->
      <rect x="-140" y="-200" width="280" height="400" rx="32" fill="#000000" stroke="#334155" stroke-width="7"/>
      <rect x="-125" y="-180" width="250" height="360" rx="16" fill="#09090b"/>

      <!-- 2x2 TikTok Duet Split Screen Grid -->
      <line x1="0" y1="-180" x2="0" y2="180" stroke="#27272a" stroke-width="3"/>
      <line x1="-125" y1="0" x2="125" y2="0" stroke="#27272a" stroke-width="3"/>

      <!-- Creator 1 (Shocked Pointing) -->
      <g transform="translate(-62, -90)">
        <circle cx="0" cy="-20" r="22" fill="#ffffff" stroke="#ef4444" stroke-width="3"/>
        <ellipse cx="0" cy="-14" rx="8" ry="12" fill="#991b1b"/> <!-- Open Mouth Screaming -->
        <text x="0" y="32" font-family="'Impact', sans-serif" font-size="12" fill="#f87171" text-anchor="middle">@pop_tea</text>
      </g>

      <!-- Creator 2 (Forensic Caliper) -->
      <g transform="translate(62, -90)">
        <circle cx="0" cy="-20" r="22" fill="#ffffff" stroke="#38bdf8" stroke-width="3"/>
        <line x1="-15" y1="-8" x2="15" y2="-8" stroke="#0284c7" stroke-width="4"/>
        <text x="0" y="32" font-family="'Impact', sans-serif" font-size="12" fill="#38bdf8" text-anchor="middle">@jawline_doc</text>
      </g>

      <!-- Creator 3 (Zapruder Stills) -->
      <g transform="translate(-62, 90)">
        <rect x="-40" y="-45" width="80" height="55" rx="4" fill="#27272a" stroke="#eab308" stroke-width="2"/>
        <circle cx="0" cy="-18" r="14" fill="none" stroke="#ef4444" stroke-width="3" stroke-dasharray="4 3"/>
        <text x="0" y="32" font-family="'Impact', sans-serif" font-size="12" fill="#facc15" text-anchor="middle">@forensic_tea</text>
      </g>

      <!-- Creator 4 (Reaction Face) -->
      <g transform="translate(62, 90)">
        <circle cx="0" cy="-20" r="22" fill="#ffffff" stroke="#a855f7" stroke-width="3"/>
        <text x="0" y="32" font-family="'Impact', sans-serif" font-size="12" fill="#c084fc" text-anchor="middle">@viral_cuts</text>
      </g>

      <!-- TikTok Top Header Banner -->
      <g transform="translate(0, -220)">
        <rect x="-160" y="-25" width="320" height="50" rx="12" fill="#0f172a" stroke="${alertBlink ? "#ef4444" : "#ec4899"}" stroke-width="4"/>
        <text x="0" y="8" font-family="'Impact', sans-serif" font-size="20" fill="#ffffff" letter-spacing="1" text-anchor="middle">
          TIKTOK JAWLINE TRIBUNAL 🚨
        </text>
      </g>
    </g>
  `;
}

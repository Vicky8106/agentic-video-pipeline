/**
 * Canonical 36+ Vector Prop Library for Casually Explained Drama Animation.
 * Phase 1 asset contract: stable IDs, volumetric vector depth, tactile comedy props.
 */

export interface PropOpts {
  x?: number;
  y?: number;
  scale?: number;
  rotation?: number;
  timeSec?: number;
  label?: string;
  progress?: number; // 0 to 1
  extra?: Record<string, any>;
}

export function renderProp(propId: string, opts: PropOpts = {}): string {
  const { x = 0, y = 0, scale = 1, rotation = 0, timeSec = 0, label = "", progress = 1 } = opts;
  const t = timeSec;

  const wrap = (content: string, id: string = propId) =>
    `<g id="${id}" transform="translate(${x}, ${y}) rotate(${rotation}) scale(${scale})">${content}</g>`;

  switch (propId) {
    // 1. PROP-PHONE: Instagram Phone Post with Single Celery Dinner
    case "PROP-PHONE":
      return wrap(`
        <rect x="-150" y="-260" width="300" height="520" rx="32" fill="#0f172a" stroke="#334155" stroke-width="6" filter="url(#cardShadow)"/>
        <rect x="-135" y="-230" width="270" height="460" rx="18" fill="#ffffff"/>
        <!-- Notch -->
        <rect x="-40" y="-245" width="80" height="16" rx="8" fill="#0f172a"/>
        <!-- Instagram Header -->
        <g transform="translate(-115, -195)">
          <circle cx="16" cy="16" r="16" fill="#ec4899"/>
          <text x="40" y="22" font-family="sans-serif" font-size="14" font-weight="bold" fill="#0f172a">@celeb_life</text>
          <circle cx="120" cy="18" r="6" fill="#38bdf8"/> <!-- Verified Badge -->
        </g>
        <!-- Photo Post: Single Celery Stick -->
        <rect x="-115" y="-145" width="230" height="185" rx="8" fill="#f0fdf4" stroke="#dcfce7" stroke-width="2"/>
        <line x1="-65" y1="20" x2="65" y2="-20" stroke="#16a34a" stroke-width="14" stroke-linecap="round"/>
        <text x="0" y="15" font-family="'Impact', sans-serif" font-size="14" fill="#15803d" text-anchor="middle">DINNER: 1 CELERY</text>
        <!-- Likes & Comments -->
        <g transform="translate(-105, 80)">
          <path d="M 0 0 C -6 -10 -18 0 0 16 C 18 0 6 -10 0 0 Z" fill="#ef4444"/>
          <text x="25" y="12" font-family="sans-serif" font-size="15" font-weight="bold" fill="#0f172a">2.4M likes</text>
          <text x="0" y="38" font-family="sans-serif" font-size="12" fill="#64748b">"So authentic! Inspiring!"</text>
        </g>
      `);

    // 2. PROP-CAM: Professional Paparazzi Telephoto Camera
    case "PROP-CAM":
      return wrap(`
        <rect x="-80" y="-45" width="160" height="90" rx="12" fill="#1e293b" stroke="#0f172a" stroke-width="6" filter="url(#cardShadow)"/>
        <!-- Top Flash Bracket & Red Dial -->
        <rect x="-30" y="-70" width="60" height="25" rx="4" fill="#334155"/>
        <circle cx="50" cy="-35" r="8" fill="#dc2626"/>
        <!-- Long Telephoto Lens -->
        <polygon points="-80,-35 -160,-45 -160,45 -80,35" fill="#0f172a" stroke="#334155" stroke-width="4"/>
        <ellipse cx="-160" cy="0" rx="10" ry="45" fill="#38bdf8" opacity="0.8"/>
        <!-- Handgrip -->
        <rect x="50" y="-40" width="30" height="80" rx="6" fill="#0f172a"/>
      `);

    // 3. PROP-RED: Red Carpet Strip & Stanchion
    case "PROP-RED":
      return wrap(`
        <polygon points="-240,60 240,60 180,-60 -180,-60" fill="#dc2626" stroke="#991b1b" stroke-width="4"/>
        <!-- Gold Edge Ribbons -->
        <line x1="-240" y1="60" x2="-180" y2="-60" stroke="#facc15" stroke-width="6"/>
        <line x1="240" y1="60" x2="180" y2="-60" stroke="#facc15" stroke-width="6"/>
      `);

    // 4. PROP-SCREEN: Cinema Clapperboard / Screen
    case "PROP-SCREEN":
      return wrap(`
        <rect x="-120" y="-75" width="240" height="150" rx="10" fill="#0f172a" stroke="#ffffff" stroke-width="5" filter="url(#cardShadow)"/>
        <!-- Diagonal Zebra Top Strip -->
        <polygon points="-120,-75 -80,-75 -100,-40 -120,-40" fill="#ffffff"/>
        <polygon points="-40,-75 0,-75 -20,-40 -60,-40" fill="#ffffff"/>
        <polygon points="40,-75 80,-75 60,-40 20,-40" fill="#ffffff"/>
        <text x="0" y="5" font-family="'Impact', sans-serif" font-size="22" fill="#facc15" text-anchor="middle">HOLLYWOOD</text>
        <text x="0" y="35" font-family="'Courier New', monospace" font-size="14" font-weight="bold" fill="#ffffff" text-anchor="middle">TAKE 2026</text>
      `);

    // 5. PROP-PEND: Giant Beauty Standard Pendulum
    case "PROP-PEND": {
      const swing = Math.sin(t * 2.5) * 35;
      return wrap(`
        <g transform="rotate(${swing})">
          <!-- Pivot Mount -->
          <circle cx="0" cy="0" r="22" fill="#eab308" stroke="#ca8a04" stroke-width="6"/>
          <!-- Long Brass Arm -->
          <line x1="0" y1="0" x2="0" y2="340" stroke="#ca8a04" stroke-width="12"/>
          <!-- Giant Pendulum Bob Gauge -->
          <g transform="translate(0, 340)">
            <circle cx="0" cy="0" r="70" fill="#eab308" stroke="#854d0e" stroke-width="8" filter="url(#cardShadow)"/>
            <circle cx="0" cy="0" r="50" fill="#fef08a"/>
            <!-- Gauge Labels -->
            <text x="0" y="-15" font-family="'Impact', sans-serif" font-size="16" fill="#854d0e" text-anchor="middle">BODY ERA</text>
            <text x="0" y="15" font-family="'Impact', sans-serif" font-size="20" fill="#dc2626" text-anchor="middle">
              ${swing > 10 ? "HEROIN CHIC" : swing < -10 ? "BBL THICC" : "OZEMPIC"}
            </text>
          </g>
        </g>
      `);
    }

    // 6. PROP-FOOD: Crossed Bread Loaf & Carbs
    case "PROP-FOOD":
      return wrap(`
        <!-- Bread Loaf with Big Red Cancel X -->
        <ellipse cx="0" cy="0" rx="90" ry="50" fill="#d97706" stroke="#92400e" stroke-width="6" filter="url(#cardShadow)"/>
        <path d="M -50 -15 Q -40 15 -30 -15 M -10 -20 Q 0 20 10 -20 M 30 -15 Q 40 15 50 -15" stroke="#78350f" stroke-width="5" stroke-linecap="round"/>
        <!-- Giant Red Cancel Slash -->
        <circle cx="0" cy="0" r="75" fill="none" stroke="#dc2626" stroke-width="12"/>
        <line x1="-55" y1="-55" x2="55" y2="55" stroke="#dc2626" stroke-width="12"/>
        <text x="0" y="75" font-family="'Impact', sans-serif" font-size="18" fill="#dc2626" text-anchor="middle">0 CARBS ALLOWED</text>
      `);

    // 7. PROP-MONEY: $2,400 Price Tag & Cash Stack
    case "PROP-MONEY":
      return wrap(`
        <rect x="-120" y="-60" width="240" height="120" rx="16" fill="#facc15" stroke="#ca8a04" stroke-width="6" filter="url(#cardShadow)"/>
        <!-- Hole Punch & String -->
        <circle cx="-90" cy="0" r="12" fill="#0f172a"/>
        <text x="15" y="-10" font-family="'Impact', sans-serif" font-size="36" fill="#0f172a" text-anchor="middle">$2,400</text>
        <text x="15" y="25" font-family="'Courier New', monospace" font-size="16" font-weight="bold" fill="#0f172a" text-anchor="middle">/ MONTH</text>
      `);

    // 8. PROP-MED: GLP-1 / Ozempic Injection Pen
    case "PROP-MED":
      return wrap(`
        <!-- Ozempic Blue & Grey Pen Body -->
        <rect x="-180" y="-22" width="360" height="44" rx="10" fill="#0284c7" stroke="#0369a1" stroke-width="5" filter="url(#cardShadow)"/>
        <!-- Clear Medicine Window -->
        <rect x="-80" y="-14" width="90" height="28" rx="4" fill="#e0f2fe" stroke="#38bdf8" stroke-width="2"/>
        <line x1="-35" y1="-14" x2="-35" y2="14" stroke="#0284c7" stroke-width="3"/> <!-- Liquid level -->
        <!-- Dose Clicker Dial -->
        <rect x="140" y="-26" width="40" height="52" rx="6" fill="#facc15" stroke="#ca8a04" stroke-width="4"/>
        <text x="160" y="6" font-family="'Courier New', monospace" font-size="16" font-weight="bold" fill="#0f172a" text-anchor="middle">1.0</text>
        <!-- Needle Tip -->
        <polygon points="-180,-12 -230,-2 -230,2 -180,12" fill="#94a3b8" stroke="#475569" stroke-width="2"/>
        <line x1="-230" y1="0" x2="-260" y2="0" stroke="#cbd5e1" stroke-width="3"/>
        <text x="0" y="45" font-family="'Impact', sans-serif" font-size="18" fill="#0284c7" text-anchor="middle">WEEKLY SHOT</text>
      `);

    // 9. PROP-BROWSER: Unsubscribe from Lunch Modal
    case "PROP-BROWSER":
      return wrap(`
        <rect x="-240" y="-150" width="480" height="300" rx="18" fill="#ffffff" stroke="#0f172a" stroke-width="7" filter="url(#cardShadow)"/>
        <!-- Header Bar -->
        <path d="M -240 -150 L 240 -150 L 240 -95 L -240 -95 Z" fill="#f1f5f9" stroke="#0f172a" stroke-width="7"/>
        <circle cx="-200" cy="-122" r="8" fill="#ef4444"/>
        <circle cx="-175" cy="-122" r="8" fill="#eab308"/>
        <circle cx="-150" cy="-122" r="8" fill="#22c55e"/>
        <text x="0" y="-115" font-family="'Impact', sans-serif" font-size="20" fill="#0f172a" text-anchor="middle">SETTINGS // METABOLISM</text>
        <text x="0" y="-40" font-family="sans-serif" font-size="22" font-weight="bold" fill="#0f172a" text-anchor="middle">Cancel Daily Lunch?</text>
        <text x="0" y="-10" font-family="sans-serif" font-size="15" fill="#64748b" text-anchor="middle">Plan: Carbohydrates &amp; Bread ($0/mo)</text>
        <!-- Buttons -->
        <rect x="-190" y="30" width="170" height="55" rx="10" fill="#e2e8f0"/>
        <text x="-105" y="65" font-family="sans-serif" font-size="16" font-weight="bold" fill="#475569" text-anchor="middle">Keep Eating</text>
        <rect x="20" y="30" width="170" height="55" rx="10" fill="#dc2626"/>
        <text x="105" y="65" font-family="sans-serif" font-size="16" font-weight="bold" fill="#ffffff" text-anchor="middle">UNSUBSCRIBE</text>
      `);

    // 10. PROP-CLOCK: 4:00 AM Alarm Clock Ringing
    case "PROP-CLOCK": {
      const shake = Math.sin(t * 30) * 8;
      return wrap(`
        <g transform="rotate(${shake})">
          <circle cx="0" cy="0" r="70" fill="#0f172a" stroke="#334155" stroke-width="8" filter="url(#cardShadow)"/>
          <!-- Twin Bells -->
          <circle cx="-50" cy="-60" r="24" fill="#e2e8f0" stroke="#475569" stroke-width="4"/>
          <circle cx="50" cy="-60" r="24" fill="#e2e8f0" stroke="#475569" stroke-width="4"/>
          <!-- LED Readout -->
          <text x="0" y="15" font-family="'Courier New', monospace" font-size="32" font-weight="bold" fill="#ef4444" filter="url(#glow)" text-anchor="middle">04:00</text>
          <text x="0" y="40" font-family="sans-serif" font-size="14" font-weight="bold" fill="#ef4444" text-anchor="middle">AM</text>
        </g>
      `);
    }

    // 11. PROP-GYM: Olympic Barbell with 45lb Plates
    case "PROP-GYM":
      return wrap(`
        <!-- Barbell Steel Shaft -->
        <line x1="-220" y1="0" x2="220" y2="0" stroke="#cbd5e1" stroke-width="14"/>
        <line x1="-160" y1="0" x2="160" y2="0" stroke="#94a3b8" stroke-width="14" stroke-dasharray="4 2"/>
        <!-- 45lb Left Plates -->
        <rect x="-210" y="-70" width="22" height="140" rx="6" fill="#0f172a" stroke="#475569" stroke-width="4"/>
        <rect x="-182" y="-60" width="18" height="120" rx="4" fill="#0f172a" stroke="#475569" stroke-width="4"/>
        <!-- 45lb Right Plates -->
        <rect x="188" y="-70" width="22" height="140" rx="6" fill="#0f172a" stroke="#475569" stroke-width="4"/>
        <rect x="164" y="-60" width="18" height="120" rx="4" fill="#0f172a" stroke="#475569" stroke-width="4"/>
      `);

    // 12. PROP-FACE: Buccal Fat Cheekbone Anatomy Diagram
    case "PROP-FACE":
      return wrap(`
        <rect x="-150" y="-120" width="300" height="240" rx="14" fill="#042f2e" stroke="#0d9488" stroke-width="6" filter="url(#cardShadow)"/>
        <ellipse cx="0" cy="-10" rx="60" ry="75" fill="none" stroke="#2dd4bf" stroke-width="4"/>
        <!-- Buccal Fat Pad in Cheek -->
        <ellipse cx="-28" cy="5" rx="16" ry="12" fill="#f97316" stroke="#ea580c" stroke-width="2"/>
        <ellipse cx="28" cy="5" rx="16" ry="12" fill="#f97316" stroke="#ea580c" stroke-width="2"/>
        <!-- Extraction Arrow -->
        <line x1="28" y1="5" x2="80" y2="25" stroke="#ef4444" stroke-width="4" marker-end="url(#arrow)"/>
        <text x="0" y="85" font-family="'Impact', sans-serif" font-size="16" fill="#facc15" text-anchor="middle">BUCCAL FAT EXTRACTION</text>
      `);

    // 13. PROP-GAME: Retro Character Creator Sliders
    case "PROP-GAME":
      return wrap(`
        <rect x="-180" y="-90" width="360" height="180" rx="10" fill="#1e1035" stroke="#a855f7" stroke-width="6" filter="url(#cardShadow)"/>
        <text x="0" y="-55" font-family="'Courier New', monospace" font-size="16" font-weight="bold" fill="#f0abfc" text-anchor="middle">CHARACTER STATS</text>
        <!-- Slider 1 -->
        <text x="-150" y="-20" font-family="'Courier New', monospace" font-size="13" fill="#ffffff">VOLUME:</text>
        <rect x="-60" y="-30" width="200" height="14" rx="4" fill="#3b0764"/>
        <rect x="-60" y="-30" width="40" height="14" rx="4" fill="#ec4899"/>
        <!-- Slider 2 -->
        <text x="-150" y="20" font-family="'Courier New', monospace" font-size="13" fill="#ffffff">CHEEKBONE:</text>
        <rect x="-60" y="10" width="200" height="14" rx="4" fill="#3b0764"/>
        <rect x="-60" y="10" width="180" height="14" rx="4" fill="#38bdf8"/>
        <text x="0" y="65" font-family="'Courier New', monospace" font-size="14" font-weight="bold" fill="#facc15" text-anchor="middle">[ POLYS: 142 ]</text>
      `);

    // 14. PROP-BAT: Giant Battery Low Power Meter
    case "PROP-BAT":
      return wrap(`
        <rect x="-100" y="-50" width="200" height="100" rx="14" fill="#0f172a" stroke="#334155" stroke-width="6" filter="url(#cardShadow)"/>
        <rect x="100" y="-25" width="20" height="50" rx="6" fill="#334155"/>
        <!-- Low Battery Fill (Red) -->
        <rect x="-85" y="-38" width="35" height="76" rx="6" fill="#ef4444" filter="url(#glow)"/>
        <text x="35" y="10" font-family="'Impact', sans-serif" font-size="28" fill="#ef4444" text-anchor="middle">8%</text>
      `);

    // 15. PROP-EMAIL: Formal Business Casting Envelope
    case "PROP-EMAIL":
      return wrap(`
        <rect x="-110" y="-70" width="220" height="140" rx="10" fill="#ffffff" stroke="#0f172a" stroke-width="6" filter="url(#cardShadow)"/>
        <!-- Flap Lines -->
        <polyline points="-110,-70 0,15 110,-70" fill="none" stroke="#0f172a" stroke-width="5"/>
        <!-- Red Wax Seal -->
        <circle cx="0" cy="15" r="18" fill="#dc2626" stroke="#991b1b" stroke-width="3"/>
        <text x="0" y="20" font-family="'Impact', sans-serif" font-size="14" fill="#ffffff" text-anchor="middle">VIP</text>
      `);

    // 16. PROP-BELL: Wooden Judge's Courtroom Gavel
    case "PROP-BELL":
      return wrap(`
        <!-- Handle -->
        <line x1="0" y1="40" x2="80" y2="-60" stroke="#78350f" stroke-width="12" stroke-linecap="round"/>
        <!-- Gavel Head -->
        <g transform="translate(80, -60) rotate(-45)">
          <rect x="-25" y="-45" width="50" height="90" rx="8" fill="#451a03" stroke="#1c0a00" stroke-width="5" filter="url(#cardShadow)"/>
          <line x1="-25" y1="0" x2="25" y2="0" stroke="#ca8a04" stroke-width="6"/> <!-- Gold band -->
        </g>
      `);

    // 17. PROP-SCALE: Digital Body Scale
    case "PROP-SCALE":
      return wrap(`
        <rect x="-110" y="-110" width="220" height="220" rx="28" fill="#f1f5f9" stroke="#94a3b8" stroke-width="7" filter="url(#cardShadow)"/>
        <!-- Top LED Display -->
        <rect x="-60" y="-85" width="120" height="50" rx="8" fill="#022c22" stroke="#10b981" stroke-width="3"/>
        <text x="0" y="-50" font-family="'Courier New', monospace" font-size="24" font-weight="bold" fill="#34d399" filter="url(#glow)" text-anchor="middle">
          ${(115 + Math.sin(t * 8) * 3).toFixed(1)}
        </text>
      `);

    // 18. PROP-WATER: 1-Gallon Gym Water Jug
    case "PROP-WATER":
      return wrap(`
        <rect x="-65" y="-90" width="130" height="180" rx="20" fill="#e0f2fe" stroke="#0284c7" stroke-width="6" filter="url(#cardShadow)"/>
        <!-- Cap & Handle -->
        <rect x="-20" y="-115" width="40" height="25" rx="4" fill="#0284c7"/>
        <path d="M 65 -50 L 95 -50 L 95 30 L 65 30" fill="none" stroke="#0284c7" stroke-width="8" stroke-linecap="round"/>
        <!-- Water Level -->
        <rect x="-55" y="-10" width="110" height="90" rx="10" fill="#38bdf8" opacity="0.8"/>
        <!-- Time Markers -->
        <text x="-45" y="-60" font-family="sans-serif" font-size="10" font-weight="bold" fill="#0369a1">7 AM - START</text>
        <text x="-45" y="-15" font-family="sans-serif" font-size="10" font-weight="bold" fill="#0369a1">1 PM - HALF</text>
        <text x="-45" y="40" font-family="sans-serif" font-size="10" font-weight="bold" fill="#0369a1">7 PM - SURVIVE</text>
      `);

    // 19. PROP-WALK: 10,000 Steps Tracker Badge
    case "PROP-WALK":
      return wrap(`
        <circle cx="0" cy="0" r="75" fill="#0f172a" stroke="#22c55e" stroke-width="8" filter="url(#cardShadow)"/>
        <text x="0" y="-15" font-family="'Impact', sans-serif" font-size="32" fill="#22c55e" text-anchor="middle">10,000</text>
        <text x="0" y="15" font-family="sans-serif" font-size="14" font-weight="bold" fill="#ffffff" text-anchor="middle">STEPS TODAY</text>
        <text x="0" y="40" font-family="sans-serif" font-size="12" fill="#94a3b8" text-anchor="middle">🔥 480 KCAL</text>
      `);

    // 20. PROP-BOT: Smooth Featureless Cyborg Mask
    case "PROP-BOT":
      return wrap(`
        <ellipse cx="0" cy="0" rx="60" ry="75" fill="#f8fafc" stroke="#64748b" stroke-width="6" filter="url(#cardShadow)"/>
        <!-- Glowing Visor Slits -->
        <line x1="-35" y1="-10" x2="-10" y2="-10" stroke="#06b6d4" stroke-width="5" filter="url(#glow)"/>
        <line x1="10" y1="-10" x2="35" y2="-10" stroke="#06b6d4" stroke-width="5" filter="url(#glow)"/>
        <line x1="-15" y1="35" x2="15" y2="35" stroke="#94a3b8" stroke-width="3"/>
      `);

    // 21. PROP-TEARS: Anime Waterfall Tears
    case "PROP-TEARS":
      return wrap(`
        <path d="M -25 -10 Q -60 40 -40 120 Q -70 180 -50 240 L -25 240 Z" fill="#38bdf8" opacity="0.85"/>
        <path d="M 25 -10 Q 60 40 40 120 Q 70 180 50 240 L 25 240 Z" fill="#38bdf8" opacity="0.85"/>
      `);

    // 22. PROP-SUB: YouTube Subscribe Button
    case "PROP-SUB":
      return wrap(`
        <rect x="-130" y="-35" width="260" height="70" rx="35" fill="#dc2626" stroke="#b91c1c" stroke-width="4" filter="url(#cardShadow)"/>
        <text x="0" y="10" font-family="'Impact', sans-serif" font-size="28" fill="#ffffff" letter-spacing="2" text-anchor="middle">SUBSCRIBE</text>
      `);

    // 23. PROP-CARB: Warning Hazard Carbs Detected
    case "PROP-CARB":
      return wrap(`
        <polygon points="0,-90 90,60 -90,60" fill="#facc15" stroke="#0f172a" stroke-width="8" filter="url(#cardShadow)"/>
        <text x="0" y="5" font-family="'Impact', sans-serif" font-size="52" fill="#0f172a" text-anchor="middle">!</text>
        <text x="0" y="45" font-family="sans-serif" font-size="12" font-weight="bold" fill="#0f172a" text-anchor="middle">CARBS</text>
      `);

    // 24. PROP-BILLBOARD: Massive Hanging Downsized Billboard
    case "PROP-BILLBOARD":
      return wrap(`
        <line x1="-200" y1="-180" x2="-200" y2="-50" stroke="#475569" stroke-width="6" stroke-dasharray="10 5"/>
        <line x1="200" y1="-180" x2="200" y2="-50" stroke="#475569" stroke-width="6" stroke-dasharray="10 5"/>
        <rect x="-240" y="-50" width="480" height="120" rx="14" fill="#0f172a" stroke="#ef4444" stroke-width="6" filter="url(#cardShadow)"/>
        <text x="0" y="-10" font-family="'Impact', sans-serif" font-size="30" fill="#ffffff" text-anchor="middle">HOLLYWOOD ECOSYSTEM</text>
        <text x="0" y="32" font-family="'Courier New', monospace" font-size="18" font-weight="bold" fill="#facc15" text-anchor="middle">[ DOWNSIZED TO 0 CALORIES ]</text>
      `);

    // 25. PROP-LOOP: Downward Feedback Loop
    case "PROP-LOOP":
      return wrap(`
        <circle cx="0" cy="0" r="80" fill="none" stroke="#ef4444" stroke-width="8" stroke-dasharray="16 8"/>
        <text x="0" y="8" font-family="'Impact', sans-serif" font-size="20" fill="#dc2626" text-anchor="middle">FEEDBACK LOOP</text>
      `);

    // 26. PROP-SHIELD: VIP Access Barrier
    case "PROP-SHIELD":
      return wrap(`
        <rect x="-100" y="-30" width="200" height="60" rx="12" fill="#dc2626" stroke="#991b1b" stroke-width="5" filter="url(#cardShadow)"/>
        <text x="0" y="8" font-family="'Impact', sans-serif" font-size="20" fill="#ffffff" text-anchor="middle">ACCESS DENIED</text>
      `);

    // 27. PROP-MIRROR: Backstage Lighted Mirror
    case "PROP-MIRROR":
      return wrap(`
        <rect x="-90" y="-130" width="180" height="260" rx="10" fill="#475569" stroke="#1e293b" stroke-width="6" filter="url(#cardShadow)"/>
        <rect x="-70" y="-110" width="140" height="220" rx="6" fill="#cbd5e1"/>
        <circle cx="-80" cy="-90" r="8" fill="#fef08a"/>
        <circle cx="-80" cy="0" r="8" fill="#fef08a"/>
        <circle cx="-80" cy="90" r="8" fill="#fef08a"/>
        <circle cx="80" cy="-90" r="8" fill="#fef08a"/>
        <circle cx="80" cy="0" r="8" fill="#fef08a"/>
        <circle cx="80" cy="90" r="8" fill="#fef08a"/>
      `);

    // 28. PROP-MARVEL: Superhero Training Blueprint
    case "PROP-MARVEL":
      return wrap(`
        <rect x="-130" y="-90" width="260" height="180" rx="10" fill="#1e3a8a" stroke="#60a5fa" stroke-width="6" filter="url(#cardShadow)"/>
        <text x="0" y="-55" font-family="'Impact', sans-serif" font-size="18" fill="#ffffff" text-anchor="middle">MCU TRAINING PROTOCOL</text>
        <text x="0" y="-15" font-family="sans-serif" font-size="13" fill="#93c5fd" text-anchor="middle">• 4:00 AM Dehydration</text>
        <text x="0" y="15" font-family="sans-serif" font-size="13" fill="#93c5fd" text-anchor="middle">• 8kg Unseasoned Chicken</text>
        <text x="0" y="45" font-family="sans-serif" font-size="13" fill="#facc15" text-anchor="middle">[ NO WATER BEFORE SHIRTLESS SCENE ]</text>
      `);

    // 29. PROP-SURGERY: Stainless Steel Surgical Tray
    case "PROP-SURGERY":
      return wrap(`
        <rect x="-120" y="-60" width="240" height="120" rx="12" fill="#cbd5e1" stroke="#475569" stroke-width="5" filter="url(#cardShadow)"/>
        <!-- Scalpel & Scissors -->
        <line x1="-70" y1="-20" x2="40" y2="-20" stroke="#0f172a" stroke-width="6" stroke-linecap="round"/>
        <polygon points="40,-20 80,-30 65,-20" fill="#94a3b8"/>
        <line x1="-60" y1="20" x2="60" y2="20" stroke="#0f172a" stroke-width="5"/>
      `);

    // 30. PROP-DELI: Commercial Deli Cheekbone Slicer
    case "PROP-DELI":
      return wrap(`
        <rect x="-110" y="-60" width="220" height="120" rx="10" fill="#334155" stroke="#0f172a" stroke-width="5" filter="url(#cardShadow)"/>
        <!-- Circular Spinning Slicer Blade -->
        <circle cx="-20" cy="0" r="55" fill="#e2e8f0" stroke="#94a3b8" stroke-width="4"/>
        <circle cx="-20" cy="0" r="14" fill="#475569"/>
        <!-- Sliced Cheekbone Wafer -->
        <ellipse cx="65" cy="10" rx="20" ry="8" fill="#f97316" stroke="#ea580c" stroke-width="2"/>
        <text x="0" y="45" font-family="'Impact', sans-serif" font-size="14" fill="#facc15" text-anchor="middle">0.02 mm PRECISION SLICE</text>
      `);

    // 31. PROP-CONTRACT: Hollywood Film Contract
    case "PROP-CONTRACT":
      return wrap(`
        <rect x="-90" y="-120" width="180" height="240" rx="8" fill="#ffffff" stroke="#0f172a" stroke-width="5" filter="url(#cardShadow)"/>
        <text x="0" y="-85" font-family="'Impact', sans-serif" font-size="18" fill="#0f172a" text-anchor="middle">FILM CONTRACT</text>
        <line x1="-70" y1="-50" x2="70" y2="-50" stroke="#cbd5e1" stroke-width="3"/>
        <line x1="-70" y1="-30" x2="70" y2="-30" stroke="#cbd5e1" stroke-width="3"/>
        <text x="0" y="10" font-family="'Courier New', monospace" font-size="16" font-weight="bold" fill="#15803d" text-anchor="middle">$20,000,000</text>
        <line x1="-50" y1="60" x2="50" y2="60" stroke="#0f172a" stroke-width="3"/>
        <text x="0" y="85" font-family="sans-serif" font-size="11" fill="#64748b" text-anchor="middle">SIGN HERE ✍️</text>
      `);

    // 32. PROP-QUESTION: Forensic Evidence Question Stamp
    case "PROP-QUESTION":
      return wrap(`
        <circle cx="0" cy="0" r="60" fill="#dc2626" stroke="#991b1b" stroke-width="6" filter="url(#cardShadow)"/>
        <text x="0" y="24" font-family="'Impact', sans-serif" font-size="70" fill="#ffffff" text-anchor="middle">?</text>
      `);

    // 33. PROP-OUTSOURCE: 4-Panel Life Outsourcing Matrix
    case "PROP-OUTSOURCE":
      return wrap(`
        <rect x="-140" y="-140" width="280" height="280" rx="16" fill="#ffffff" stroke="#0f172a" stroke-width="6" filter="url(#cardShadow)"/>
        <line x1="0" y1="-140" x2="0" y2="140" stroke="#e2e8f0" stroke-width="4"/>
        <line x1="-140" y1="0" x2="140" y2="0" stroke="#e2e8f0" stroke-width="4"/>
        <text x="-70" y="-60" font-family="sans-serif" font-size="14" font-weight="bold" fill="#0f172a" text-anchor="middle">👨‍🍳 CHEF</text>
        <text x="70" y="-60" font-family="sans-serif" font-size="14" font-weight="bold" fill="#0f172a" text-anchor="middle">🏋️ TRAINER</text>
        <text x="-70" y="75" font-family="sans-serif" font-size="14" font-weight="bold" fill="#0f172a" text-anchor="middle">🚗 CHAUFFEUR</text>
        <text x="70" y="75" font-family="sans-serif" font-size="14" font-weight="bold" fill="#0f172a" text-anchor="middle">🧹 NANNY</text>
      `);

    // 34. PROP-TRIAL: TikTok Forensic Comment Bubble
    case "PROP-TRIAL":
      return wrap(`
        <rect x="-140" y="-50" width="280" height="100" rx="18" fill="#18181b" stroke="#06b6d4" stroke-width="5" filter="url(#cardShadow)"/>
        <text x="-110" y="-15" font-family="sans-serif" font-size="14" font-weight="bold" fill="#ec4899">@commenter_99</text>
        <text x="-110" y="15" font-family="sans-serif" font-size="14" fill="#ffffff">"Is that Ozempic face?? 😱"</text>
      `);

    // 35. PROP-ROSE: Drooping Victorian Gothic Rose
    case "PROP-ROSE":
      return wrap(`
        <path d="M 0 60 Q 25 10 0 -40" fill="none" stroke="#15803d" stroke-width="6"/>
        <g transform="translate(0, -40)">
          <circle cx="0" cy="0" r="22" fill="#881337" stroke="#4c0519" stroke-width="4"/>
          <path d="M -10 -8 Q 0 -20 10 -8 Q 15 5 0 12 Q -15 5 -10 -8 Z" fill="#9f1239"/>
        </g>
        <!-- Falling Petal -->
        <ellipse cx="25" cy="30" rx="8" ry="12" fill="#9f1239" transform="rotate(25)"/>
      `);

    // 36. PROP-GRID: Neon Cyan Facial Symmetry Grid
    case "PROP-GRID":
      return wrap(`
        <rect x="-120" y="-120" width="240" height="240" rx="10" fill="none" stroke="#06b6d4" stroke-width="3" stroke-dasharray="8 4" filter="url(#glow)"/>
        <line x1="0" y1="-120" x2="0" y2="120" stroke="#06b6d4" stroke-width="2"/>
        <line x1="-120" y1="0" x2="120" y2="0" stroke="#06b6d4" stroke-width="2"/>
        <circle cx="0" cy="0" r="60" fill="none" stroke="#06b6d4" stroke-width="2"/>
        <text x="0" y="110" font-family="'Courier New', monospace" font-size="12" fill="#06b6d4" text-anchor="middle">FACIAL SYMMETRY 99.8%</text>
      `);

    default:
      return wrap(`
        <rect x="-60" y="-40" width="120" height="80" rx="8" fill="#e2e8f0" stroke="#64748b" stroke-width="4"/>
        <text x="0" y="6" font-family="sans-serif" font-size="14" fill="#0f172a" text-anchor="middle">${label || propId}</text>
      `);
  }
}

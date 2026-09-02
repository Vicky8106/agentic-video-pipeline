// High-End Character Puppets & Physical Slapstick Rigs for Scenes 12-18
// Transforms all generic text cards into living, animated Casually Explained / Alex Meyers cartoon characters!
/**
 * 1. ANTHROPOMORPHIC SHIVERING STOMACH
 */
export function renderShiveringStomachPuppet(x, y, timeSec = 0) {
    const shiverX = Math.sin(timeSec * 28) * 4;
    const chatteringJaw = Math.abs(Math.sin(timeSec * 16)) * 8;
    const sweatY = (timeSec * 45) % 40;
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
/**
 * 2. SCI-FI PHARMA DOCTOR PUPPET WITH GLOWING AUTO-INJECTOR PEN
 */
export function renderSciFiPharmaDoctor(x, y, timeSec = 0) {
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
/**
 * 3. WEDNESDAY ADDAMS DANCE & THING PUPPET
 */
export function renderWednesdayThingPerformance(x, y, timeSec = 0) {
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
/**
 * 4. MCU SUPERHERO VEINY VEIN PUPPET
 */
export function renderMCUSuperheroPuppet(x, y, timeSec = 0) {
    const flexPulse = 1.0 + Math.sin(timeSec * 8) * 0.05;
    const pantSweat = (timeSec * 50) % 30;
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
/**
 * 5. CRAZED COSMETIC SURGEON WITH ICE CREAM SCOOP
 */
export function renderCrazedSurgeonScoop(x, y, timeSec = 0) {
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
/**
 * 6. BILLIONAIRE GOLD ELEVATOR VS NORMAL PHARMACY LINE
 */
export function renderBillionaireGoldElevator(x, y, timeSec = 0) {
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
        <text x="80" y="85" font-family="'Impact', sans-serif" font-size="14" fill="#15803d" text-anchor="middle">OZEMPIC ✨</text>
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

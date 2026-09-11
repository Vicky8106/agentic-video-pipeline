/**
 * Articulated & Parameterized SVG Prop Rigs.
 *
 * Provides dynamic, physics-ready vector props with continuous state variables
 * (jaw gaps, wheel rotations, stamp slams, swinging tags, spinning blades).
 */
export function renderCaliperRig(opts) {
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
export function renderSaaSModalRig(opts) {
    const { x, y, scale = 1, rotation = 0, isCancelled = false, stampProgress = 0, stampAngle = -14 } = opts;
    const stampScale = isCancelled ? (1.0 + Math.max(0, 1 - stampProgress) * 1.5) : 0;
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
export function renderKeycapSlamRig(opts) {
    const { x, y, scale = 1, rotation = 0, pressProgress = 0 } = opts;
    const keyY = pressProgress * 45;
    const keyHeight = 120 - pressProgress * 30;
    return `
    <g id="prop-keycap-slam-rig" transform="translate(${x}, ${y}) rotate(${rotation}) scale(${scale})">
      <!-- Keyboard Base Housing -->
      <rect x="-260" y="40" width="520" height="120" rx="20" fill="#0f172a" stroke="#1e293b" stroke-width="8" filter="url(#cardShadow)"/>

      <!-- 3D Keycap Plunger (Moves Down on Press) -->
      <g transform="translate(0, ${keyY})">
        <!-- Key Shadow / Sides -->
        <polygon points="-220,40 -190,-40 190,-40 220,40" fill="#7f1d1d"/>
        <polygon points="-220,40 220,40 220,${40 + keyHeight} -220,${40 + keyHeight}" fill="#991b1b"/>
        
        <!-- Key Top Surface -->
        <rect x="-190" y="-40" width="380" height="80" rx="14" fill="#dc2626" stroke="#b91c1c" stroke-width="4" filter="url(#glow)"/>
        
        <text x="0" y="15" font-family="'Impact', sans-serif" font-size="52" fill="#ffffff" letter-spacing="4" text-anchor="middle">
          Ctrl + W
        </text>
      </g>

      ${pressProgress > 0.6 ? `
        <!-- Impact Sparks & Shockwave Debris -->
        <circle cx="-230" cy="50" r="12" fill="#fde047" filter="url(#glow)"/>
        <circle cx="230" cy="50" r="14" fill="#fde047" filter="url(#glow)"/>
        <line x1="-240" y1="40" x2="-290" y2="10" stroke="#f59e0b" stroke-width="6"/>
        <line x1="240" y1="40" x2="290" y2="10" stroke="#f59e0b" stroke-width="6"/>
      ` : ""}
    </g>
  `;
}
export function renderWheelbarrowRig(opts) {
    const { x, y, scale = 1, rotation = 0, wheelRotation = 0, moneyCount = 6 } = opts;
    return `
    <g id="prop-wheelbarrow-rig" transform="translate(${x}, ${y}) rotate(${rotation}) scale(${scale})">
      <!-- Ground Shadow -->
      <ellipse cx="0" cy="115" rx="190" ry="24" fill="#000000" opacity="0.22"/>

      <!-- Golden Wheelbarrow Tub -->
      <polygon points="-160,20 160,-20 120,80 -120,80" fill="#eab308" stroke="#ca8a04" stroke-width="8" filter="url(#cardShadow)"/>
      <polygon points="-160,20 160,-20 150,-10 -150,28" fill="#facc15"/>

      <!-- Stacked Stacks of Cash / Ozempic Boxes -->
      ${Array.from({ length: moneyCount }).map((_, i) => {
        const bx = -70 + (i % 3) * 55;
        const by = 30 - Math.floor(i / 3) * 28;
        return `
          <g transform="translate(${bx}, ${by}) rotate(${(i % 2 === 0 ? -6 : 8)})">
            <rect x="-24" y="-12" width="48" height="24" rx="4" fill="#15803d" stroke="#14532d" stroke-width="3"/>
            <text x="0" y="4" font-family="sans-serif" font-size="12" font-weight="bold" fill="#ffffff" text-anchor="middle">$100</text>
          </g>
        `;
    }).join("")}

      <!-- Wheelbarrow Leg & Handles -->
      <line x1="-120" y1="80" x2="-140" y2="115" stroke="#a16207" stroke-width="10" stroke-linecap="round"/>
      <line x1="120" y1="20" x2="220" y2="0" stroke="#a16207" stroke-width="12" stroke-linecap="round"/>

      <!-- Spinning Spoke Wheel -->
      <g transform="translate(-160, 95) rotate(${wheelRotation})">
        <circle cx="0" cy="0" r="38" fill="#ca8a04" stroke="#713f12" stroke-width="6"/>
        <circle cx="0" cy="0" r="14" fill="#facc15"/>
        <line x1="-38" y1="0" x2="38" y2="0" stroke="#713f12" stroke-width="4"/>
        <line x1="0" y1="-38" x2="0" y2="38" stroke="#713f12" stroke-width="4"/>
        <line x1="-26" y1="-26" x2="26" y2="26" stroke="#713f12" stroke-width="4"/>
        <line x1="-26" y1="26" x2="26" y2="-26" stroke="#713f12" stroke-width="4"/>
      </g>
    </g>
  `;
}
export function renderOlympicBarbellRig(opts) {
    const { x, y, scale = 1, rotation = 0, liftProgress = 0, plateCount = 4, bendCurve = 0 } = opts;
    // Floor elevation
    const floorY = y - liftProgress * 220;
    const shadowOpacity = Math.max(0.05, 0.35 * (1 - liftProgress * 0.85));
    return `
    <g id="prop-olympic-barbell-rig" transform="translate(${x}, ${floorY}) rotate(${rotation}) scale(${scale})">
      <!-- Ambient Floor Contact Drop Shadow -->
      <ellipse cx="0" cy="${55 + liftProgress * 200}" rx="220" ry="${18 * (1 - liftProgress * 0.5)}" fill="#000000" opacity="${shadowOpacity}"/>
      <ellipse cx="-160" cy="${55 + liftProgress * 200}" rx="45" ry="${14 * (1 - liftProgress * 0.5)}" fill="#000000" opacity="${shadowOpacity * 1.5}"/>
      <ellipse cx="160" cy="${55 + liftProgress * 200}" rx="45" ry="${14 * (1 - liftProgress * 0.5)}" fill="#000000" opacity="${shadowOpacity * 1.5}"/>

      <!-- Barbell Steel Shaft with whip bend -->
      <path d="M -240 0 Q 0 ${bendCurve * 15} 240 0" stroke="#0f172a" stroke-width="14" stroke-linecap="round" fill="none"/>
      <path d="M -240 0 Q 0 ${bendCurve * 15} 240 0" stroke="#cbd5e1" stroke-width="10" stroke-linecap="round" fill="none"/>
      <!-- Specular Chrome Reflection Highlight -->
      <path d="M -235 -2 Q 0 ${bendCurve * 15 - 2} 235 -2" stroke="#ffffff" stroke-width="3" stroke-linecap="round" fill="none"/>

      <!-- Diamond Knurling Texture Zones -->
      <line x1="-100" y1="-4" x2="-40" y2="-4" stroke="#64748b" stroke-width="6" stroke-dasharray="4 2"/>
      <line x1="40" y1="-4" x2="100" y2="-4" stroke="#64748b" stroke-width="6" stroke-dasharray="4 2"/>
      <line x1="-15" y1="-4" x2="15" y2="-4" stroke="#64748b" stroke-width="6" stroke-dasharray="4 2"/> <!-- Center ring -->

      <!-- Steel Collar Bushings -->
      <rect x="-124" y="-12" width="10" height="24" rx="2" fill="#475569" stroke="#1e293b" stroke-width="2"/>
      <rect x="114" y="-12" width="10" height="24" rx="2" fill="#475569" stroke="#1e293b" stroke-width="2"/>

      <!-- LEFT SIDE BUMPER STACK (Inner to Outer) -->
      <g id="left-bumpers">
        <!-- Green 10KG (Inner) -->
        ${plateCount >= 4 ? `
          <rect x="-138" y="-45" width="12" height="90" rx="3" fill="#16a34a" stroke="#14532d" stroke-width="3"/>
          <line x1="-132" y1="-42" x2="-132" y2="42" stroke="#4ade80" stroke-width="2"/>
        ` : ""}
        <!-- Yellow 15KG -->
        ${plateCount >= 3 ? `
          <rect x="-154" y="-52" width="14" height="104" rx="4" fill="#eab308" stroke="#a16207" stroke-width="3"/>
          <line x1="-147" y1="-48" x2="-147" y2="48" stroke="#fef08a" stroke-width="2.5"/>
        ` : ""}
        <!-- Blue 20KG -->
        ${plateCount >= 2 ? `
          <rect x="-172" y="-58" width="16" height="116" rx="4" fill="#2563eb" stroke="#1e3a8a" stroke-width="3.5"/>
          <line x1="-164" y1="-54" x2="-164" y2="54" stroke="#93c5fd" stroke-width="3"/>
        ` : ""}
        <!-- Red 25KG (Massive Outer Bumper) -->
        <rect x="-194" y="-65" width="20" height="130" rx="5" fill="#dc2626" stroke="#991b1b" stroke-width="4" filter="url(#cardShadow)"/>
        <line x1="-184" y1="-60" x2="-184" y2="60" stroke="#fca5a5" stroke-width="3.5"/>
        <!-- Plate Rim & Text -->
        <circle cx="-184" cy="0" r="16" fill="#111111" stroke="#475569" stroke-width="3"/>
        <text x="-184" y="-36" font-family="'Impact', sans-serif" font-size="10" fill="#ffffff" text-anchor="middle">25</text>
        <text x="-184" y="44" font-family="'Impact', sans-serif" font-size="10" fill="#ffffff" text-anchor="middle">KG</text>

        <!-- Quick-Release Lock Collar Clamp -->
        <rect x="-204" y="-18" width="8" height="36" rx="2" fill="#f59e0b" stroke="#b45309" stroke-width="2"/>
        <polygon points="-204,-10 -214,-16 -204,-8" fill="#b45309"/>
      </g>

      <!-- RIGHT SIDE BUMPER STACK (Inner to Outer) -->
      <g id="right-bumpers">
        <!-- Green 10KG (Inner) -->
        ${plateCount >= 4 ? `
          <rect x="126" y="-45" width="12" height="90" rx="3" fill="#16a34a" stroke="#14532d" stroke-width="3"/>
          <line x1="132" y1="-42" x2="132" y2="42" stroke="#4ade80" stroke-width="2"/>
        ` : ""}
        <!-- Yellow 15KG -->
        ${plateCount >= 3 ? `
          <rect x="140" y="-52" width="14" height="104" rx="4" fill="#eab308" stroke="#a16207" stroke-width="3"/>
          <line x1="147" y1="-48" x2="147" y2="48" stroke="#fef08a" stroke-width="2.5"/>
        ` : ""}
        <!-- Blue 20KG -->
        ${plateCount >= 2 ? `
          <rect x="156" y="-58" width="16" height="116" rx="4" fill="#2563eb" stroke="#1e3a8a" stroke-width="3.5"/>
          <line x1="164" y1="-54" x2="164" y2="54" stroke="#93c5fd" stroke-width="3"/>
        ` : ""}
        <!-- Red 25KG (Massive Outer Bumper) -->
        <rect x="174" y="-65" width="20" height="130" rx="5" fill="#dc2626" stroke="#991b1b" stroke-width="4" filter="url(#cardShadow)"/>
        <line x1="184" y1="-60" x2="184" y2="60" stroke="#fca5a5" stroke-width="3.5"/>
        <!-- Plate Rim & Text -->
        <circle cx="184" cy="0" r="16" fill="#111111" stroke="#475569" stroke-width="3"/>
        <text x="184" y="-36" font-family="'Impact', sans-serif" font-size="10" fill="#ffffff" text-anchor="middle">25</text>
        <text x="184" y="44" font-family="'Impact', sans-serif" font-size="10" fill="#ffffff" text-anchor="middle">KG</text>

        <!-- Quick-Release Lock Collar Clamp -->
        <rect x="196" y="-18" width="8" height="36" rx="2" fill="#f59e0b" stroke="#b45309" stroke-width="2"/>
        <polygon points="204,-10 214,-16 204,-8" fill="#b45309"/>
      </g>
    </g>
  `;
}
export function renderDetailedMopRig(opts) {
    const { x, y, scale = 1, rotation = 0, swayInertia = 0, isMopping = false, timeSec = 0 } = opts;
    const swing = swayInertia + (isMopping ? Math.sin(timeSec * 8) * 14 : 0);
    return `
    <g id="prop-detailed-mop-rig" transform="translate(${x}, ${y}) rotate(${rotation}) scale(${scale})">
      <!-- Fiberglass Mop Handle -->
      <line x1="0" y1="-140" x2="0" y2="90" stroke="#ca8a04" stroke-width="9" stroke-linecap="round"/>
      <line x1="-1.5" y1="-135" x2="-1.5" y2="85" stroke="#fef08a" stroke-width="2.5" stroke-linecap="round"/>
      <!-- Rubber Grip Cap on top -->
      <rect x="-6" y="-146" width="12" height="16" rx="4" fill="#1e293b" stroke="#0f172a" stroke-width="2"/>

      <!-- Heavy Cast-Steel Clamp Bracket with Thumb Nut -->
      <rect x="-24" y="86" width="48" height="18" rx="4" fill="#334155" stroke="#0f172a" stroke-width="3"/>
      <rect x="-16" y="90" width="32" height="8" rx="2" fill="#64748b"/>
      <!-- Wingnut butterfly ears -->
      <ellipse cx="26" cy="95" rx="6" ry="10" fill="#94a3b8" stroke="#475569" stroke-width="2"/>

      <!-- Braided Cotton Yarn Head (Reacts dynamically to motion) -->
      <g transform="translate(0, 102) rotate(${swing})">
        <!-- Shadow yarn underlayer -->
        <path d="
          M -22 0 Q ${-30 + swing * 0.4} 45 ${-26 + swing * 0.8} 85
          M -12 0 Q ${-16 + swing * 0.4} 50 ${-10 + swing * 0.8} 88
          M 0 0 Q ${swing * 0.4} 55 ${swing * 0.8} 92
          M 12 0 Q ${16 + swing * 0.4} 50 ${10 + swing * 0.8} 88
          M 22 0 Q ${30 + swing * 0.4} 45 ${26 + swing * 0.8} 85
        " stroke="#94a3b8" stroke-width="6" stroke-linecap="round" fill="none"/>

        <!-- Foreground Clean Cotton Strands -->
        <path d="
          M -26 0 Q ${-36 + swing * 0.5} 40 ${-30 + swing} 88
          M -18 0 Q ${-24 + swing * 0.5} 48 ${-18 + swing} 92
          M -8 0 Q ${-10 + swing * 0.5} 52 ${-4 + swing} 95
          M 0 0 Q ${swing * 0.5} 55 ${swing} 96
          M 8 0 Q ${10 + swing * 0.5} 52 ${4 + swing} 95
          M 18 0 Q ${24 + swing * 0.5} 48 ${18 + swing} 92
          M 26 0 Q ${36 + swing * 0.5} 40 ${30 + swing} 88
        " stroke="#f1f5f9" stroke-width="5" stroke-linecap="round" fill="none"/>

        <!-- Blue tracer threads woven into yarn -->
        <path d="
          M -14 0 Q ${-18 + swing * 0.5} 48 ${-12 + swing} 90
          M 14 0 Q ${18 + swing * 0.5} 48 ${12 + swing} 90
        " stroke="#38bdf8" stroke-width="2" stroke-linecap="round" fill="none"/>
      </g>
    </g>
  `;
}
export function renderDetailedMopBucketRig(opts) {
    const { x, y, scale = 1, rotation = 0, wringerActive = false } = opts;
    return `
    <g id="prop-detailed-mop-bucket-rig" transform="translate(${x}, ${y}) scale(${scale})">
      <!-- Ground Shadow -->
      <ellipse cx="0" cy="52" rx="72" ry="16" fill="#000000" opacity="0.25"/>

      <!-- 4 Swivel Caster Wheels -->
      <g id="casters" fill="#1e293b" stroke="#0f172a" stroke-width="2">
        <circle cx="-52" cy="46" r="8"/>
        <circle cx="-28" cy="48" r="8"/>
        <circle cx="28" cy="48" r="8"/>
        <circle cx="52" cy="46" r="8"/>
      </g>

      <!-- Yellow Industrial Polyethylene Bucket Tub -->
      <path d="M -60 -20 L 60 -20 L 52 42 L -52 42 Z" fill="#eab308" stroke="#854d0e" stroke-width="5" stroke-linejoin="round"/>
      <rect x="-65" y="-28" width="130" height="10" rx="3" fill="#ca8a04" stroke="#854d0e" stroke-width="3"/>

      <!-- Heavy Pressure Wringer Box Unit -->
      <g transform="translate(18, -48)">
        <rect x="-24" y="-20" width="48" height="42" rx="4" fill="#a16207" stroke="#713f12" stroke-width="3.5"/>
        <!-- Steel Press Grid Flaps -->
        <line x1="-18" y1="-10" x2="18" y2="-10" stroke="#451a03" stroke-width="3"/>
        <line x1="-18" y1="0" x2="18" y2="0" stroke="#451a03" stroke-width="3"/>
        <line x1="-18" y1="10" x2="18" y2="10" stroke="#451a03" stroke-width="3"/>
        <!-- Chrome Press Lever Handle -->
        <g transform="rotate(${wringerActive ? 35 : -25} -16 -12)">
          <line x1="-16" y1="-12" x2="-45" y2="-65" stroke="#94a3b8" stroke-width="7" stroke-linecap="round"/>
          <circle cx="-45" cy="-65" r="7" fill="#0f172a"/>
        </g>
      </g>

      <!-- Warning Symbol: CAUTION WET FLOOR Triangle -->
      <g transform="translate(-18, 12)">
        <polygon points="0,-18 -18,14 18,14" fill="#facc15" stroke="#000000" stroke-width="2.5"/>
        <polygon points="0,-14 -14,11 14,11" fill="#facc15"/>
        <!-- Slipping Stickman Glyph -->
        <circle cx="0" cy="-6" r="2.5" fill="#000"/>
        <path d="M 0 -3 L 0 5 L -4 10 M 0 5 L 6 8" stroke="#000" stroke-width="1.8" stroke-linecap="round" fill="none"/>
      </g>
    </g>
  `;
}

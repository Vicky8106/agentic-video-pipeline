/**
 * Articulated & Parameterized SVG Prop Rigs.
 *
 * Provides dynamic, physics-ready vector props with continuous state variables
 * (jaw gaps, wheel rotations, stamp slams, swinging tags, spinning blades).
 */

export interface PropRenderBase {
  x: number;
  y: number;
  scale?: number;
  rotation?: number;
  timeSec?: number;
}

/**
 * 1. Parameterized Digital Caliper Rig
 */
export interface CaliperRigOpts extends PropRenderBase {
  jawGap?: number; // 0 to 60px
  lcdValue?: string; // e.g. "0.02 mm"
  laserActive?: boolean;
}

export function renderCaliperRig(opts: CaliperRigOpts): string {
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

/**
 * 2. Parameterized SaaS Cancellation Modal Rig
 */
export interface SaaSModalOpts extends PropRenderBase {
  isCancelled?: boolean;
  stampProgress?: number; // 0 to 1
  stampAngle?: number;
}

export function renderSaaSModalRig(opts: SaaSModalOpts): string {
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

/**
 * 3. Parameterized 3D Keycap Slam Rig (Ctrl + W)
 */
export interface KeycapSlamOpts extends PropRenderBase {
  pressProgress?: number; // 0 (unpressed) to 1 (slammed)
}

export function renderKeycapSlamRig(opts: KeycapSlamOpts): string {
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

/**
 * 4. Parameterized Solid Gold Wheelbarrow Rig
 */
export interface WheelbarrowOpts extends PropRenderBase {
  wheelRotation?: number; // degrees
  moneyCount?: number; // 0 to 10
}

export function renderWheelbarrowRig(opts: WheelbarrowOpts): string {
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

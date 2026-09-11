/**
 * Shared stagecraft for Anatoly Act 2 (90.80–273.95s).
 */
export * from "../anatoly-full/shared.js";

/** Balance scale comparing REAL vs YOUTUBE */
export const balanceScale = (x: number, y: number, tilt = 0): string => {
  const angle = tilt * 15;
  return `
    <g transform="translate(${x} ${y})">
      <!-- Base & Stand -->
      <polygon points="-50,120 50,120 0,0" fill="#334155" stroke="#1e293b" stroke-width="4"/>
      <circle cx="0" cy="0" r="14" fill="#f59e0b"/>
      <!-- Tilting Beam -->
      <g transform="rotate(${angle.toFixed(1)})">
        <line x1="-180" y1="0" x2="180" y2="0" stroke="#64748b" stroke-width="8" stroke-linecap="round"/>
        <!-- Left Pan: REAL -->
        <g transform="translate(-180, 0)">
          <line x1="0" y1="0" x2="-35" y2="70" stroke="#94a3b8" stroke-width="2"/>
          <line x1="0" y1="0" x2="35" y2="70" stroke="#94a3b8" stroke-width="2"/>
          <path d="M -50 70 Q 0 95 50 70 Z" fill="#0f172a" stroke="#38bdf8" stroke-width="3"/>
          <rect x="-30" y="45" width="60" height="25" rx="4" fill="#38bdf8"/>
          <text x="0" y="62" font-family="'Impact', sans-serif" font-size="14" fill="#0f172a" text-anchor="middle">REAL</text>
        </g>
        <!-- Right Pan: YOUTUBE -->
        <g transform="translate(180, 0)">
          <line x1="0" y1="0" x2="-35" y2="70" stroke="#94a3b8" stroke-width="2"/>
          <line x1="0" y1="0" x2="35" y2="70" stroke="#94a3b8" stroke-width="2"/>
          <path d="M -50 70 Q 0 95 50 70 Z" fill="#0f172a" stroke="#ef4444" stroke-width="3"/>
          <rect x="-35" y="45" width="70" height="25" rx="4" fill="#ef4444"/>
          <polygon points="-8,52 -8,64 6,58" fill="#ffffff"/>
        </g>
      </g>
    </g>
  `;
};

/** Magician top hat with massive barbell plate pulling out */
export const magicianHatWithBarbell = (x: number, y: number, pullK = 0): string => {
  const plateY = -60 - pullK * 120;
  return `
    <g transform="translate(${x} ${y})">
      <!-- Plate being pulled out -->
      <g transform="translate(0, ${plateY.toFixed(1)}) scale(${0.8 + pullK * 0.4})">
        <circle cx="0" cy="0" r="60" fill="#1e293b" stroke="#38bdf8" stroke-width="8"/>
        <circle cx="0" cy="0" r="18" fill="#f8fafc"/>
        <text x="0" y="8" font-family="'Impact', sans-serif" font-size="22" fill="#38bdf8" text-anchor="middle">250 KG</text>
        <!-- Sparkle particles -->
        ${pullK > 0.5 ? `
          <polygon points="70,-20 75,-10 85,-15 78,-5 85,5 75,0 70,10 65,0 55,5 62,-5 55,-15 65,-10" fill="#facc15"/>
          <polygon points="-70,-30 -65,-20 -55,-25 -62,-15 -55,-5 -65,-10 -70,0 -75,-10 -85,-5 -78,-15 -85,-25 -75,-20" fill="#facc15"/>
        ` : ""}
      </g>
      <!-- Top Hat Rim and Body -->
      <path d="M -70 20 L -60 -50 L 60 -50 L 70 20 Z" fill="#09090b" stroke="#27272a" stroke-width="4"/>
      <ellipse cx="0" cy="20" rx="100" ry="16" fill="#18181b" stroke="#27272a" stroke-width="4"/>
      <!-- Red Hat Ribbon -->
      <path d="M -68 10 L -62 -10 L 62 -10 L 68 10 Z" fill="#dc2626"/>
      <!-- Hat Opening Ellipse -->
      <ellipse cx="0" cy="-50" rx="60" ry="12" fill="#000000"/>
    </g>
  `;
};

/** Movie Director Clapperboard */
export const clapperboard = (x: number, y: number, snapK = 1): string => {
  const stickAngle = (1 - snapK) * -35;
  return `
    <g transform="translate(${x} ${y}) scale(1.2)">
      <!-- Main board -->
      <rect x="-80" y="-30" width="160" height="120" rx="6" fill="#18181b" stroke="#3f3f46" stroke-width="4"/>
      <rect x="-70" y="-15" width="140" height="90" fill="#09090b"/>
      <text x="-60" y="15" font-family="'Courier New', monospace" font-size="14" font-weight="bold" fill="#38bdf8">SCENE: 1</text>
      <text x="15" y="15" font-family="'Courier New', monospace" font-size="14" font-weight="bold" fill="#38bdf8">TAKE: 1</text>
      <text x="-60" y="45" font-family="'Courier New', monospace" font-size="12" fill="#94a3b8">DIRECTOR: YOUTUBE</text>
      <!-- Bottom clapper striped bar -->
      <rect x="-80" y="-55" width="160" height="25" fill="#18181b"/>
      <polygon points="-75,-55 -55,-55 -65,-30 -85,-30" fill="#ffffff"/>
      <polygon points="-35,-55 -15,-55 -25,-30 -45,-30" fill="#ffffff"/>
      <polygon points="5,-55 25,-55 15,-30 -5,-30" fill="#ffffff"/>
      <polygon points="45,-55 65,-55 55,-30 35,-30" fill="#ffffff"/>
      <!-- Hinged top clapper stick -->
      <g transform="translate(-80, -55) rotate(${stickAngle.toFixed(1)})">
        <rect x="0" y="-25" width="160" height="25" fill="#18181b"/>
        <polygon points="5,-25 25,-25 15,0 -5,0" fill="#ffffff"/>
        <polygon points="45,-25 65,-25 55,0 35,0" fill="#ffffff"/>
        <polygon points="85,-25 105,-25 95,0 75,0" fill="#ffffff"/>
        <polygon points="125,-25 145,-25 135,0 115,0" fill="#ffffff"/>
        <!-- Pivot hinge -->
        <circle cx="8" cy="-12" r="5" fill="#f59e0b"/>
      </g>
    </g>
  `;
};

/** Phone scrolling Instagram with 14 views */
export const instagramPhone = (x: number, y: number, scrollY = 0): string => `
  <g transform="translate(${x} ${y}) scale(1.1)">
    <rect x="-60" y="-110" width="120" height="220" rx="16" fill="#0f172a" stroke="#475569" stroke-width="6"/>
    <!-- Screen -->
    <rect x="-52" y="-95" width="104" height="190" rx="8" fill="#ffffff"/>
    <!-- IG Header -->
    <rect x="-52" y="-95" width="104" height="24" fill="#f8fafc"/>
    <text x="0" y="-78" font-family="sans-serif" font-size="10" font-weight="bold" fill="#0f172a" text-anchor="middle">Feed</text>
    <!-- Post image (squat rack) -->
    <rect x="-48" y="-65" width="96" height="80" fill="#e2e8f0"/>
    <line x1="-20" y1="-50" x2="-20" y2="-5" stroke="#64748b" stroke-width="4"/>
    <line x1="20" y1="-50" x2="20" y2="-5" stroke="#64748b" stroke-width="4"/>
    <line x1="-35" y1="-30" x2="35" y2="-30" stroke="#0f172a" stroke-width="5"/>
    <!-- Caption & Views -->
    <text x="-44" y="32" font-family="sans-serif" font-size="9" fill="#0f172a">Leg day grind 😤</text>
    <text x="-44" y="50" font-family="sans-serif" font-size="8" font-weight="bold" fill="#ef4444">14 views</text>
    <text x="-44" y="65" font-family="sans-serif" font-size="7" fill="#94a3b8">12 hours ago</text>
  </g>
`;

/** AC Wall Unit with dangling duct tape and repair ladder */
export const acUnitWithDuctTape = (x: number, y: number): string => `
  <g transform="translate(${x} ${y})">
    <!-- AC Wall Unit -->
    <rect x="-140" y="-50" width="280" height="100" rx="8" fill="#f1f5f9" stroke="#94a3b8" stroke-width="4"/>
    <!-- Vents -->
    <line x1="-120" y1="20" x2="120" y2="20" stroke="#64748b" stroke-width="3"/>
    <line x1="-120" y1="30" x2="120" y2="30" stroke="#64748b" stroke-width="3"/>
    <!-- Brand badge -->
    <rect x="80" y="-35" width="35" height="12" rx="2" fill="#cbd5e1"/>
    <!-- Dangling silver duct tape -->
    <path d="M -40 45 Q -30 90 -45 140" fill="none" stroke="#94a3b8" stroke-width="14" stroke-linecap="square"/>
    <!-- Repair Toolbox on Floor -->
    <g transform="translate(180, 260)">
      <rect x="-40" y="-25" width="80" height="50" rx="6" fill="#dc2626" stroke="#991b1b" stroke-width="3"/>
      <rect x="-15" y="-35" width="30" height="12" rx="3" fill="none" stroke="#475569" stroke-width="4"/>
      <rect x="-35" y="-5" width="70" height="6" fill="#facc15"/>
    </g>
  </g>
`;

/** Plumber pipe wrench */
export const pipeWrench = (x: number, y: number, s = 1): string => `
  <g transform="translate(${x} ${y}) scale(${s}) rotate(-35)">
    <!-- Red handle -->
    <rect x="-10" y="-40" width="20" height="120" rx="6" fill="#dc2626" stroke="#991b1b" stroke-width="3"/>
    <circle cx="0" cy="65" r="4" fill="#ffffff"/>
    <!-- Steel adjustable jaw head -->
    <path d="M -16 -40 L -16 -85 L 16 -85 L 16 -60 L 32 -60 L 32 -40 Z" fill="#64748b" stroke="#334155" stroke-width="3"/>
    <line x1="-14" y1="-75" x2="14" y2="-75" stroke="#334155" stroke-width="2"/>
    <line x1="-14" y1="-65" x2="14" y2="-65" stroke="#334155" stroke-width="2"/>
  </g>
`;

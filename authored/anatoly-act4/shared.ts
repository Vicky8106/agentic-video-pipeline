/**
 * Shared stagecraft for Anatoly Act 4 (497.32–750.00s).
 */
export * from "../anatoly-full/shared.js";

/** Retro 1950s Wood-Paneled CRT Television with rabbit ear antennas */
export const vintageTelevision = (x: number, y: number): string => `
  <g transform="translate(${x} ${y}) scale(1.2)">
    <!-- Rabbit Ear Antennas -->
    <line x1="-30" y1="-80" x2="-80" y2="-150" stroke="#94a3b8" stroke-width="4"/>
    <line x1="30" y1="-80" x2="80" y2="-150" stroke="#94a3b8" stroke-width="4"/>
    <circle cx="-80" cy="-150" r="5" fill="#cbd5e1"/>
    <circle cx="80" cy="-150" r="5" fill="#cbd5e1"/>
    <!-- Wooden Cabinet -->
    <rect x="-140" y="-80" width="280" height="190" rx="14" fill="#78350f" stroke="#451a03" stroke-width="6"/>
    <!-- Curved CRT Screen -->
    <rect x="-120" y="-65" width="180" height="155" rx="20" fill="#0f172a" stroke="#334155" stroke-width="4"/>
    <!-- TV Test bars or graphic -->
    <rect x="-115" y="-60" width="170" height="145" rx="15" fill="#1e293b"/>
    <text x="-30" y="0" font-family="'Impact', sans-serif" font-size="20" fill="#facc15" text-anchor="middle">YOU HAVE</text>
    <text x="-30" y="24" font-family="'Impact', sans-serif" font-size="20" fill="#38bdf8" text-anchor="middle">DISCOVERED</text>
    <text x="-30" y="48" font-family="'Impact', sans-serif" font-size="20" fill="#ef4444" text-anchor="middle">TELEVISION.</text>
    <!-- Rotary Dials & Speaker Grille on Right -->
    <circle cx="95" cy="-30" r="14" fill="#451a03" stroke="#d97706" stroke-width="2"/>
    <circle cx="95" cy="15" r="14" fill="#451a03" stroke="#d97706" stroke-width="2"/>
    <line x1="80" y1="55" x2="115" y2="55" stroke="#451a03" stroke-width="3"/>
    <line x1="80" y1="65" x2="115" y2="65" stroke="#451a03" stroke-width="3"/>
    <line x1="80" y1="75" x2="115" y2="75" stroke="#451a03" stroke-width="3"/>
  </g>
`;

/** Gordon Ramsay caricature holding a smoking skillet */
export const gordonRamsayCaricature = (x: number, y: number, t: number): string => `
  <g transform="translate(${x} ${y}) scale(1.3)">
    <!-- Wrinkled forehead and blond spike hair -->
    <path d="M -22 -82 Q 0 -105 22 -82 Q 30 -95 10 -108 Q -15 -105 -22 -82 Z" fill="#fde047" stroke="#ca8a04" stroke-width="2"/>
    <!-- Face -->
    <circle cx="0" cy="-65" r="26" fill="#fef08a" stroke="#0f172a" stroke-width="4"/>
    <!-- Angry scowl wrinkles -->
    <line x1="-16" y1="-80" x2="16" y2="-80" stroke="#0f172a" stroke-width="2"/>
    <line x1="-12" y1="-74" x2="12" y2="-74" stroke="#0f172a" stroke-width="2"/>
    <line x1="-16" y1="-72" x2="-4" y2="-66" stroke="#0f172a" stroke-width="3" stroke-linecap="round"/>
    <line x1="4" y1="-66" x2="16" y2="-72" stroke="#0f172a" stroke-width="3" stroke-linecap="round"/>
    <!-- Eyes squinting angrily -->
    <line x1="-12" y1="-64" x2="-4" y2="-62" stroke="#0f172a" stroke-width="3"/>
    <line x1="4" y1="-62" x2="12" y2="-64" stroke="#0f172a" stroke-width="3"/>
    <!-- Screaming mouth -->
    <ellipse cx="0" cy="-48" rx="8" ry="12" fill="#0f172a"/>
    <rect x="-6" y="-56" width="12" height="4" fill="#ffffff"/>
    <!-- White Chef Jacket -->
    <path d="M -26 -38 L 26 -38 L 30 20 L -30 20 Z" fill="#ffffff" stroke="#0f172a" stroke-width="4"/>
    <line x1="5" y1="-38" x2="5" y2="20" stroke="#cbd5e1" stroke-width="2"/>
    <circle cx="0" cy="-20" r="3" fill="#0f172a"/>
    <circle cx="0" cy="-5" r="3" fill="#0f172a"/>
    <circle cx="0" cy="10" r="3" fill="#0f172a"/>
    <!-- Right Arm holding frying pan -->
    <line x1="26" y1="-30" x2="55" y2="-15" stroke="#0f172a" stroke-width="6"/>
    <!-- Frying pan with fire -->
    <circle cx="75" cy="-15" r="18" fill="#1e293b" stroke="#0f172a" stroke-width="3"/>
    <path d="M 68 -22 Q 75 -40 82 -22 Z" fill="#ef4444"/>
    <path d="M 72 -22 Q 75 -34 78 -22 Z" fill="#facc15"/>
  </g>
`;

/** Comic book cover: BITTEN BY A RADIOACTIVE FORKLIFT */
export const radioactiveForklift = (x: number, y: number, t: number): string => {
  const glow = Math.sin(t * 6) * 10;
  return `
    <g transform="translate(${x} ${y}) scale(1.15)">
      <!-- Comic book cover border -->
      <rect x="-140" y="-180" width="280" height="360" rx="6" fill="#09090b" stroke="#22c55e" stroke-width="8"/>
      <!-- Comic Title Banner -->
      <rect x="-135" y="-175" width="270" height="60" fill="#22c55e"/>
      <text x="0" y="-135" font-family="'Impact', sans-serif" font-size="28" fill="#0f172a" text-anchor="middle">RADIOACTIVE FORKLIFT</text>
      <!-- Green radiation glow circle -->
      <circle cx="0" cy="20" r="${(75 + glow).toFixed(1)}" fill="#22c55e" opacity="0.25"/>
      <!-- Forklift graphic -->
      <g transform="translate(0, 40) scale(0.9)">
        <!-- Forklift body in yellow -->
        <rect x="-50" y="-30" width="80" height="50" rx="6" fill="#eab308" stroke="#0f172a" stroke-width="4"/>
        <rect x="-40" y="-60" width="40" height="30" fill="none" stroke="#0f172a" stroke-width="4"/>
        <!-- Wheels -->
        <circle cx="-30" cy="25" r="14" fill="#1e293b" stroke="#0f172a" stroke-width="3"/>
        <circle cx="20" cy="25" r="14" fill="#1e293b" stroke="#0f172a" stroke-width="3"/>
        <!-- Front Mast & Lifting Forks with glowing green aura -->
        <line x1="35" y1="-70" x2="35" y2="20" stroke="#475569" stroke-width="8"/>
        <line x1="35" y1="10" x2="80" y2="10" stroke="#22c55e" stroke-width="8"/>
        <!-- Lightning bolts -->
        <polygon points="45,-40 60,-55 55,-35 70,-45" fill="#22c55e"/>
      </g>
      <!-- Price tag bubble in corner -->
      <circle cx="-105" cy="-145" r="20" fill="#ef4444"/>
      <text x="-105" y="-139" font-family="'Impact', sans-serif" font-size="14" fill="#ffffff" text-anchor="middle">25¢</text>
    </g>
  `;
};

/** Skinner Box Lab Rat pressing a button for a deadlift */
export const skinnerBoxRat = (x: number, y: number, t: number): string => `
  <g transform="translate(${x} ${y}) scale(1.2)">
    <!-- Lab cage walls -->
    <rect x="-180" y="-120" width="360" height="240" rx="8" fill="#f8fafc" stroke="#64748b" stroke-width="6"/>
    <line x1="-120" y1="-120" x2="-120" y2="120" stroke="#cbd5e1" stroke-width="3"/>
    <line x1="-60" y1="-120" x2="-60" y2="120" stroke="#cbd5e1" stroke-width="3"/>
    <line x1="0" y1="-120" x2="0" y2="120" stroke="#cbd5e1" stroke-width="3"/>
    <line x1="60" y1="-120" x2="60" y2="120" stroke="#cbd5e1" stroke-width="3"/>
    <line x1="120" y1="-120" x2="120" y2="120" stroke="#cbd5e1" stroke-width="3"/>
    <!-- Big Red Button on cage wall -->
    <g transform="translate(140, 0)">
      <rect x="0" y="-25" width="20" height="50" fill="#334155"/>
      <circle cx="-10" cy="0" r="18" fill="#ef4444" stroke="#991b1b" stroke-width="3"/>
      <text x="-40" y="-30" font-family="'Impact', sans-serif" font-size="12" fill="#ef4444" text-anchor="middle">CLICK</text>
    </g>
    <!-- Cute Lab Rat with Gym Headband -->
    <g transform="translate(50, 40)">
      <!-- Rat Body -->
      <ellipse cx="-40" cy="10" rx="35" ry="22" fill="#94a3b8" stroke="#475569" stroke-width="3"/>
      <!-- Tail -->
      <path d="M -75 15 Q -105 25 -115 0" fill="none" stroke="#f472b6" stroke-width="4" stroke-linecap="round"/>
      <!-- Head -->
      <polygon points="-10,0 25,12 -5,22" fill="#94a3b8" stroke="#475569" stroke-width="3"/>
      <!-- Pink Nose -->
      <circle cx="26" cy="12" r="4" fill="#f472b6"/>
      <!-- Beady Eye -->
      <circle cx="5" cy="5" r="3" fill="#0f172a"/>
      <!-- Ear -->
      <circle cx="-10" cy="-4" r="10" fill="#f472b6" stroke="#475569" stroke-width="2"/>
      <!-- Red Workout Headband -->
      <rect x="-8" y="-1" width="14" height="6" fill="#ef4444"/>
      <!-- Paw reaching out pressing button -->
      <line x1="10" y1="20" x2="80" y2="-40" stroke="#475569" stroke-width="4" stroke-linecap="round"/>
    </g>
    <!-- Mini barbell appearing as reward -->
    <g transform="translate(-80, 20)">
      <line x1="-30" y1="0" x2="30" y2="0" stroke="#334155" stroke-width="4"/>
      <circle cx="-30" cy="0" r="16" fill="#0f172a"/>
      <circle cx="30" cy="0" r="16" fill="#0f172a"/>
    </g>
  </g>
`;

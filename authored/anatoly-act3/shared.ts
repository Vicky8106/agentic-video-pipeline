/**
 * Shared stagecraft for Anatoly Act 3 (273.95–497.32s).
 */
export * from "../anatoly-full/shared.js";

/** News anchor desk with BREAKING NEWS ticker */
export const newsDesk = (x: number, y: number): string => `
  <g transform="translate(${x} ${y})">
    <!-- Anchor desk -->
    <path d="M -240 60 L -180 -30 L 180 -30 L 240 60 Z" fill="#1e293b" stroke="#0f172a" stroke-width="4"/>
    <rect x="-180" y="-30" width="360" height="15" fill="#3b82f6"/>
    <!-- Microphone -->
    <rect x="-10" y="-55" width="20" height="25" rx="5" fill="#475569"/>
    <line x1="0" y1="-30" x2="0" y2="-15" stroke="#1e293b" stroke-width="4"/>
    <!-- Breaking News Ticker -->
    <g transform="translate(0, 100)">
      <rect x="-350" y="-20" width="700" height="40" fill="#dc2626"/>
      <rect x="-350" y="-20" width="120" height="40" fill="#991b1b"/>
      <text x="-290" y="6" font-family="'Impact', sans-serif" font-size="18" fill="#ffffff" text-anchor="middle">BREAKING</text>
      <text x="80" y="6" font-family="monospace" font-size="14" font-weight="bold" fill="#ffffff" text-anchor="middle">WEIGHT PLATE LOGO QUESTIONED BY INTERNET DETECTIVES</text>
    </g>
  </g>
`;

/** Forensic fingerprint dusting brush & UV lamp over plate */
export const forensicBrush = (x: number, y: number, dustK = 0): string => `
  <g transform="translate(${x} ${y})">
    <!-- Bumper Plate on table -->
    <circle cx="0" cy="0" r="70" fill="#1e293b" stroke="#334155" stroke-width="6"/>
    <circle cx="0" cy="0" r="20" fill="#f8fafc"/>
    <!-- Glowing UV light cone -->
    <polygon points="120,-120 180,-140 -20,20 -60,-20" fill="#818cf8" opacity="0.3"/>
    <!-- Fingerprint reveal -->
    <g transform="translate(-25, 20) scale(0.7)" opacity="${dustK}">
      <ellipse cx="0" cy="0" rx="16" ry="24" fill="none" stroke="#38bdf8" stroke-width="3" stroke-dasharray="4 2"/>
      <ellipse cx="0" cy="0" rx="10" ry="16" fill="none" stroke="#38bdf8" stroke-width="3" stroke-dasharray="4 2"/>
      <ellipse cx="0" cy="0" rx="4" ry="8" fill="none" stroke="#38bdf8" stroke-width="3"/>
    </g>
    <!-- Feather duster dusting -->
    <g transform="translate(${(40 - dustK * 20).toFixed(1)}, ${(10 - dustK * 10).toFixed(1)}) rotate(-30)">
      <line x1="0" y1="-70" x2="0" y2="0" stroke="#78716c" stroke-width="6"/>
      <!-- Soft bristles -->
      <path d="M -15 0 C -25 20 25 20 15 0 Z" fill="#f8fafc"/>
      <line x1="-8" y1="0" x2="-10" y2="18" stroke="#cbd5e1" stroke-width="2"/>
      <line x1="8" y1="0" x2="10" y2="18" stroke="#cbd5e1" stroke-width="2"/>
    </g>
  </g>
`;

/** 1995 Guy in retro neon windbreaker and backwards cap */
export const guy1995 = (x: number, y: number, t: number): string => `
  <g transform="translate(${x} ${y}) scale(1.2)">
    <!-- Head -->
    <circle cx="0" cy="-70" r="26" fill="#fef08a" stroke="#0f172a" stroke-width="4"/>
    <!-- Backwards 90s Snapback Cap in Teal -->
    <path d="M -26 -76 Q 0 -96 26 -76 Z" fill="#0d9488" stroke="#0f172a" stroke-width="3"/>
    <path d="M 24 -74 L 42 -70 L 36 -64 L 22 -70 Z" fill="#14b8a6"/>
    <!-- Confused deadpan face -->
    <line x1="-12" y1="-80" x2="-2" y2="-74" stroke="#0f172a" stroke-width="3" stroke-linecap="round"/>
    <line x1="4" y1="-74" x2="14" y2="-80" stroke="#0f172a" stroke-width="3" stroke-linecap="round"/>
    <circle cx="-6" cy="-68" r="3" fill="#0f172a"/>
    <circle cx="6" cy="-68" r="3" fill="#0f172a"/>
    <ellipse cx="0" cy="-54" rx="5" ry="3" fill="#0f172a"/>
    <!-- Retro 90s Neon Windbreaker (Purple + Magenta + Teal) -->
    <path d="M -26 -44 L 26 -44 L 32 10 L -32 10 Z" fill="#7e22ce" stroke="#0f172a" stroke-width="4"/>
    <polygon points="-26,-44 0,-15 26,-44" fill="#06b6d4"/>
    <polygon points="-14,-44 0,-25 14,-44" fill="#ec4899"/>
    <!-- Legs -->
    <line x1="-12" y1="10" x2="-14" y2="65" stroke="#0f172a" stroke-width="5"/>
    <line x1="12" y1="10" x2="14" y2="65" stroke="#0f172a" stroke-width="5"/>
  </g>
`;

/** PhD + Muscles = Wizard with glowing barbell staff */
export const wizardFigure = (x: number, y: number, t: number): string => {
  const spark = Math.sin(t * 8) * 8;
  return `
    <g transform="translate(${x} ${y}) scale(1.3)">
      <!-- Wizard Robe -->
      <path d="M -30 -40 L 30 -40 L 45 70 L -45 70 Z" fill="#4338ca" stroke="#0f172a" stroke-width="4"/>
      <!-- Gold Stars on robe -->
      <text x="-15" y="10" font-size="14" fill="#facc15">★</text>
      <text x="15" y="40" font-size="14" fill="#facc15">★</text>
      <!-- Head with Gandalf Beard -->
      <circle cx="0" cy="-68" r="26" fill="#f8fafc" stroke="#0f172a" stroke-width="4"/>
      <path d="M -20 -60 Q 0 -30 20 -60 L 15 -45 Q 0 10 -15 -45 Z" fill="#e2e8f0" stroke="#94a3b8" stroke-width="2"/>
      <!-- Wizard Pointy Hat -->
      <polygon points="-35,-78 35,-78 0,-140" fill="#3730a3" stroke="#0f172a" stroke-width="4"/>
      <ellipse cx="0" cy="-78" rx="42" ry="8" fill="#312e81"/>
      <text x="-5" y="-105" font-size="12" fill="#facc15">★</text>
      <!-- Glowing Barbell Magic Staff -->
      <g transform="translate(55, -20)">
        <line x1="0" y1="-80" x2="0" y2="90" stroke="#ca8a04" stroke-width="6"/>
        <!-- Mini barbell plate atop staff -->
        <circle cx="0" cy="-80" r="22" fill="#1e293b" stroke="#38bdf8" stroke-width="4"/>
        <circle cx="0" cy="-80" r="${(30 + spark).toFixed(1)}" fill="#38bdf8" opacity="0.3"/>
        <text x="0" y="-74" font-family="'Impact', sans-serif" font-size="12" fill="#38bdf8" text-anchor="middle">PhD</text>
      </g>
    </g>
  `;
};

/** Giant EXPOSED Clickbait Thumbnail with Yellow Circle & Red Arrow */
export const giantExposedThumbnail = (x: number, y: number): string => `
  <g transform="translate(${x} ${y}) scale(1.1)">
    <rect x="-240" y="-140" width="480" height="280" rx="14" fill="#09090b" stroke="#ef4444" stroke-width="8"/>
    <!-- Shocked face mockup -->
    <circle cx="-120" cy="10" r="60" fill="#fef08a" stroke="#0f172a" stroke-width="5"/>
    <ellipse cx="-135" cy="-5" rx="8" ry="14" fill="#ffffff" stroke="#0f172a" stroke-width="3"/>
    <ellipse cx="-105" cy="-5" rx="8" ry="14" fill="#ffffff" stroke="#0f172a" stroke-width="3"/>
    <circle cx="-135" cy="-5" r="4" fill="#0f172a"/>
    <circle cx="-105" cy="-5" r="4" fill="#0f172a"/>
    <ellipse cx="-120" cy="35" rx="18" ry="24" fill="#0f172a"/>
    <!-- Giant Yellow Dotted Circle -->
    <circle cx="100" cy="10" r="70" fill="none" stroke="#facc15" stroke-width="8" stroke-dasharray="16 10"/>
    <!-- Giant Red Arrow pointing at circle -->
    <g transform="translate(160, 90) rotate(-135)">
      <line x1="0" y1="0" x2="90" y2="0" stroke="#ef4444" stroke-width="18" stroke-linecap="square"/>
      <polygon points="90,-25 140,0 90,25" fill="#ef4444"/>
    </g>
    <!-- EXPOSED in 900-point style font -->
    <g transform="translate(0, -70)">
      <rect x="-180" y="-35" width="360" height="70" rx="6" fill="#ef4444"/>
      <text x="0" y="16" font-family="'Impact', sans-serif" font-size="52" fill="#ffffff" text-anchor="middle" letter-spacing="4">EXPOSED!</text>
    </g>
  </g>
`;

/** Highway Billboard showing Anatoly face with "WANTED" or "HAVE YOU SEEN HIM" */
export const billboardRig = (x: number, y: number): string => `
  <g transform="translate(${x} ${y}) scale(1.15)">
    <!-- Support steel pillars -->
    <line x1="-120" y1="60" x2="-120" y2="180" stroke="#334155" stroke-width="16"/>
    <line x1="120" y1="60" x2="120" y2="180" stroke="#334155" stroke-width="16"/>
    <!-- Billboard Board -->
    <rect x="-220" y="-120" width="440" height="180" rx="8" fill="#18181b" stroke="#475569" stroke-width="6"/>
    <rect x="-200" y="-105" width="400" height="150" fill="#facc15"/>
    <text x="0" y="-60" font-family="'Impact', sans-serif" font-size="34" fill="#0f172a" text-anchor="middle">ANATOLY: 100M SUBS</text>
    <!-- Anatoly Face on Billboard -->
    <circle cx="-100" cy="5" r="32" fill="#f8fafc" stroke="#0f172a" stroke-width="3"/>
    <rect x="-132" y="-30" width="64" height="14" rx="4" fill="#57534e"/>
    <text x="50" y="-10" font-family="'Impact', sans-serif" font-size="22" fill="#dc2626">"ARE YOU ANATOLY?!"</text>
    <text x="50" y="18" font-family="sans-serif" font-size="14" font-weight="bold" fill="#0f172a">PRANK CANCELLED</text>
  </g>
`;

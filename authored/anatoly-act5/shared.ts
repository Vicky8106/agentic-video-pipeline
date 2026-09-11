/**
 * Shared stagecraft for Anatoly Act 5 (750.00–973.57s).
 */
export * from "../anatoly-full/shared.js";

/** Executive CEO Office Desk with Nameplate */
export const executiveDesk = (x: number, y: number): string => `
  <g transform="translate(${x} ${y}) scale(1.15)">
    <!-- High-back Leather Chair behind desk -->
    <path d="M -50 -120 Q 0 -140 50 -120 L 45 -10 L -45 -10 Z" fill="#09090b" stroke="#27272a" stroke-width="4"/>
    <!-- Mahogany Desk -->
    <rect x="-180" y="-10" width="360" height="110" rx="6" fill="#451a03" stroke="#271406" stroke-width="5"/>
    <rect x="-160" y="5" width="320" height="20" fill="#78350f"/>
    <!-- Golden Executive Nameplate -->
    <g transform="translate(0, 15)">
      <polygon points="-80,0 80,0 70,25 -70,25" fill="#facc15" stroke="#a16207" stroke-width="2"/>
      <text x="0" y="18" font-family="'Impact', sans-serif" font-size="12" fill="#0f172a" text-anchor="middle">ANATOLY PRODUCTIONS LLC</text>
    </g>
    <!-- Desk Lamp with green shade -->
    <g transform="translate(-130, -30)">
      <circle cx="0" cy="20" r="12" fill="#ca8a04"/>
      <path d="M 0 20 Q 20 -10 0 -40" fill="none" stroke="#ca8a04" stroke-width="5"/>
      <ellipse cx="0" cy="-40" rx="20" ry="10" fill="#15803d"/>
    </g>
  </g>
`;

/** Production Call Sheet Clipboard */
export const callSheetClipboard = (x: number, y: number): string => `
  <g transform="translate(${x} ${y}) scale(1.15)">
    <!-- Wooden clipboard base -->
    <rect x="-90" y="-120" width="180" height="240" rx="8" fill="#78350f" stroke="#451a03" stroke-width="4"/>
    <!-- Silver steel clip at top -->
    <rect x="-40" y="-130" width="80" height="22" rx="4" fill="#cbd5e1" stroke="#475569" stroke-width="3"/>
    <circle cx="0" cy="-120" r="5" fill="#1e293b"/>
    <!-- Paper sheet -->
    <rect x="-80" y="-105" width="160" height="210" fill="#f8fafc"/>
    <text x="0" y="-80" font-family="'Impact', sans-serif" font-size="16" fill="#0f172a" text-anchor="middle">DAILY CALL SHEET</text>
    <!-- Checklist items -->
    <g transform="translate(-70, -50)">
      <rect x="0" y="0" width="12" height="12" fill="#22c55e"/>
      <text x="20" y="10" font-family="sans-serif" font-size="10" fill="#0f172a">Find 200kg Barbell</text>
      <rect x="0" y="24" width="12" height="12" fill="#22c55e"/>
      <text x="20" y="34" font-family="sans-serif" font-size="10" fill="#0f172a">Find Biggest Gym Bro</text>
      <rect x="0" y="48" width="12" height="12" fill="#22c55e"/>
      <text x="20" y="58" font-family="sans-serif" font-size="10" fill="#0f172a">Say "Can I try?"</text>
      <rect x="0" y="72" width="12" height="12" fill="#22c55e"/>
      <text x="20" y="82" font-family="sans-serif" font-size="10" fill="#0f172a">Drop Jaw / Zoom In</text>
    </g>
  </g>
`;

/** Cinema Theater Seats with Popcorn */
export const cinemaSeats = (x: number, y: number): string => `
  <g transform="translate(${x} ${y}) scale(1.2)">
    <!-- Red Cinema velvet seats -->
    <rect x="-140" y="-40" width="120" height="100" rx="10" fill="#991b1b" stroke="#7f1d1d" stroke-width="4"/>
    <rect x="20" y="-40" width="120" height="100" rx="10" fill="#991b1b" stroke="#7f1d1d" stroke-width="4"/>
    <rect x="-150" y="20" width="20" height="40" rx="5" fill="#1e293b"/>
    <rect x="-10" y="20" width="20" height="40" rx="5" fill="#1e293b"/>
    <rect x="130" y="20" width="20" height="40" rx="5" fill="#1e293b"/>
    <!-- Popcorn Tub -->
    <g transform="translate(0, 30)">
      <polygon points="-25,0 25,0 18,50 -18,50" fill="#f8fafc" stroke="#dc2626" stroke-width="3"/>
      <line x1="-12" y1="0" x2="-8" y2="50" stroke="#dc2626" stroke-width="4"/>
      <line x1="12" y1="0" x2="8" y2="50" stroke="#dc2626" stroke-width="4"/>
      <!-- Popped corn top -->
      <circle cx="-12" cy="-6" r="10" fill="#fef08a"/>
      <circle cx="0" cy="-10" r="12" fill="#fef08a"/>
      <circle cx="12" cy="-6" r="10" fill="#fef08a"/>
    </g>
  </g>
`;

/** Grey's Anatomy style operating room setup */
export const operatingRoom = (x: number, y: number): string => `
  <g transform="translate(${x} ${y}) scale(1.15)">
    <!-- Overhead surgical lights -->
    <ellipse cx="-40" cy="-140" rx="45" ry="15" fill="#cbd5e1" stroke="#475569" stroke-width="4"/>
    <ellipse cx="40" cy="-140" rx="45" ry="15" fill="#cbd5e1" stroke="#475569" stroke-width="4"/>
    <!-- Surgical bright light beams -->
    <polygon points="-80,-125 0,-125 80,80 -160,80" fill="#f8fafc" opacity="0.15"/>
    <polygon points="0,-125 80,-125 160,80 -80,80" fill="#f8fafc" opacity="0.15"/>
    <!-- Operating Bed with dummy stickman under sheet -->
    <rect x="-140" y="30" width="280" height="50" rx="6" fill="#38bdf8" stroke="#0284c7" stroke-width="4"/>
    <circle cx="-100" cy="20" r="18" fill="#f8fafc"/>
  </g>
`;

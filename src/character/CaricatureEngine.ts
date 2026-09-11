/**
 * Bespoke Caricature & Likeness Engine for Casually Explained / Alex Meyers Animation.
 * Delivers distinct, instantly recognizable cartoon caricatures (Anatoly, Heavy Bodybuilder, Dr. Mike)
 * with facial hair, stubble, headwear, custom garments, and posture profiles.
 */

export interface CaricatureProfile {
  id: string;
  name: string;
  facialHair?: "anatoly_mustache" | "short_beard" | "stubble_only" | "goatee" | "none";
  stubble?: boolean;
  stubbleColor?: string;
  headwear?: "anatoly_cap" | "bodybuilder_sweatband" | "gym_snapback" | "none";
  bodyType?: "slender_janitor" | "massive_bodybuilder" | "stocky_powerlifter" | "standard";
  outfit?: "anatoly_baggy_overalls" | "bodybuilder_tank" | "doctor_scrubs" | "suit" | "standard";
  shoeStyle?: "work_boot" | "gym_sneaker" | "dress_shoe" | "casual_sneaker";
  defaultSpineLean?: number;
}

/**
 * Registry of canonical caricatures for the pipeline.
 */
export const CARICATURE_REGISTRY: Record<string, CaricatureProfile> = {
  anatoly: {
    id: "anatoly",
    name: "Vladimir Shmondenko (Anatoly)",
    facialHair: "anatoly_mustache",
    stubble: true,
    stubbleColor: "#92400e", // Dirty-blonde / light brown scruff
    headwear: "anatoly_cap",
    bodyType: "slender_janitor",
    outfit: "anatoly_baggy_overalls",
    shoeStyle: "work_boot",
    defaultSpineLean: -6, // Comedic relaxed janitor slouch
  },
  bodybuilder: {
    id: "bodybuilder",
    name: "Giant Gym Bodybuilder",
    facialHair: "none",
    stubble: false,
    headwear: "gym_snapback",
    bodyType: "massive_bodybuilder",
    outfit: "bodybuilder_tank",
    shoeStyle: "gym_sneaker",
    defaultSpineLean: 4, // Puffed chest
  },
  dr_mike: {
    id: "dr_mike",
    name: "Dr. Mike Israetel",
    facialHair: "short_beard",
    stubble: true,
    stubbleColor: "#27272a",
    headwear: "none",
    bodyType: "stocky_powerlifter",
    outfit: "doctor_scrubs",
    shoeStyle: "gym_sneaker",
    defaultSpineLean: 2,
  },
};

/**
 * Resolves a caricature profile from character id, archetype, or keyword match.
 */
export function resolveCaricature(identifier: string = ""): CaricatureProfile | null {
  const norm = identifier.toLowerCase();
  if (norm.includes("anatoly") || norm.includes("janitor") || norm.includes("cleaner") || norm.includes("mop")) {
    return CARICATURE_REGISTRY.anatoly;
  }
  if (norm.includes("bodybuilder") || norm.includes("muscle") || norm.includes("gym_bro") || norm.includes("meathead")) {
    return CARICATURE_REGISTRY.bodybuilder;
  }
  if (norm.includes("dr_mike") || norm.includes("drmike") || norm.includes("israetel")) {
    return CARICATURE_REGISTRY.dr_mike;
  }
  return null;
}

/**
 * Renders facial hair layers (mustache, beard, jawline stubble) relative to head center (0, 0).
 */
export function renderFacialFeatures(profile: CaricatureProfile, timeSec: number = 0): string {
  let markup = "";

  // 1. Scruffy 5 o'clock jawline stubble
  if (profile.stubble) {
    const sc = profile.stubbleColor ?? "#a16207";
    markup += `
      <!-- Jawline and Chin 5 o'clock stubble stipple -->
      <g id="jaw-stubble" opacity="0.65">
        <!-- Faint shadow wash across lower jaw -->
        <path d="M -50 30 C -45 68 -20 80 0 80 C 20 80 45 68 50 30 C 35 48 0 54 -50 30 Z" fill="${sc}" opacity="0.18"/>
        <!-- Stipple dot clusters -->
        <circle cx="-38" cy="42" r="1.4" fill="${sc}"/>
        <circle cx="-28" cy="52" r="1.5" fill="${sc}"/>
        <circle cx="-18" cy="62" r="1.6" fill="${sc}"/>
        <circle cx="-6" cy="68" r="1.5" fill="${sc}"/>
        <circle cx="6" cy="68" r="1.5" fill="${sc}"/>
        <circle cx="18" cy="62" r="1.6" fill="${sc}"/>
        <circle cx="28" cy="52" r="1.5" fill="${sc}"/>
        <circle cx="38" cy="42" r="1.4" fill="${sc}"/>
        <circle cx="-12" cy="74" r="1.5" fill="${sc}"/>
        <circle cx="0" cy="76" r="1.7" fill="${sc}"/>
        <circle cx="12" cy="74" r="1.5" fill="${sc}"/>
        <!-- Chin cleft/texture mark -->
        <path d="M -4 70 Q 0 74 4 70" fill="none" stroke="${sc}" stroke-width="2" stroke-linecap="round"/>
      </g>
    `;
  }

  // 2. Anatoly's iconic dirty-blonde bushy mustache
  if (profile.facialHair === "anatoly_mustache") {
    markup += `
      <!-- Anatoly Iconic Slavic Walrus/Handlebar Mustache -->
      <g id="anatoly-mustache" transform="translate(0, 24)">
        <!-- Shadow base -->
        <path d="M -34 14 C -22 2 -8 0 0 4 C 8 0 22 2 34 14 C 24 22 10 14 0 16 C -10 14 -24 22 -34 14 Z"
              fill="#78350f" opacity="0.4"/>
        <!-- Main full bushy mustache body -->
        <path d="M -32 10 C -24 -2 -6 -1 0 3 C 6 -1 24 -2 32 10 C 22 18 8 11 0 13 C -8 11 -22 18 -32 10 Z"
              fill="#d97706" stroke="#92400e" stroke-width="3.5" stroke-linejoin="round"/>
        <!-- Blonde hair strand highlights -->
        <path d="M -26 6 Q -12 2 -2 6" fill="none" stroke="#fde68a" stroke-width="2" stroke-linecap="round"/>
        <path d="M 2 6 Q 12 2 26 6" fill="none" stroke="#fde68a" stroke-width="2" stroke-linecap="round"/>
        <path d="M -20 11 Q -8 7 -1 9" fill="none" stroke="#fef3c7" stroke-width="1.8" stroke-linecap="round"/>
        <path d="M 1 9 Q 8 7 20 11" fill="none" stroke="#fef3c7" stroke-width="1.8" stroke-linecap="round"/>
      </g>
    `;
  } else if (profile.facialHair === "short_beard") {
    // Trimmed powerlifter beard (Dr. Mike)
    markup += `
      <!-- Full Trimmed Powerlifter Beard -->
      <g id="short-beard" transform="translate(0, 22)">
        <path d="M -48 10 C -45 58 -20 72 0 72 C 20 72 45 58 48 10 C 35 24 18 16 0 18 C -18 16 -35 24 -48 10 Z"
              fill="#18181b" stroke="#09090b" stroke-width="3" stroke-linejoin="round"/>
        <path d="M -24 6 Q 0 2 24 6 C 14 14 0 10 -24 6 Z" fill="#27272a"/>
      </g>
    `;
  }

  return markup;
}

/**
 * Renders bespoke caricature headwear.
 */
export function renderCaricatureHeadwear(profile: CaricatureProfile, timeSec: number = 0): { backSvg: string; frontSvg: string } {
  if (profile.headwear === "anatoly_cap") {
    return {
      backSvg: `
        <!-- Cap Back Crown -->
        <ellipse cx="0" cy="-78" rx="76" ry="46" fill="#1e3a8a" stroke="#0f172a" stroke-width="6"/>
        <!-- Dirty blonde hair tufts poking out the back and sides -->
        <path d="M -60 -25 C -75 0 -55 20 -40 10 C -50 -5 -45 -20 -50 -25 Z" fill="#d97706" stroke="#92400e" stroke-width="3"/>
        <path d="M 60 -25 C 75 0 55 20 40 10 C 50 -5 45 -20 50 -25 Z" fill="#d97706" stroke="#92400e" stroke-width="3"/>
      `,
      frontSvg: `
        <!-- Anatoly Slanted Worker Baseball Cap (Lifted so eyes and brows are completely unobstructed) -->
        <g transform="translate(0, -22) rotate(-5)">
          <!-- Main Cap Dome -->
          <path d="M -72 -46 C -72 -105 72 -105 72 -46 Z" fill="#2563eb" stroke="#0f172a" stroke-width="6"/>
          <!-- Cap Seam Piping -->
          <path d="M 0 -102 L 0 -46" stroke="#1d4ed8" stroke-width="3"/>
          <path d="M -45 -82 Q -20 -60 0 -46" stroke="#1d4ed8" stroke-width="2.5"/>
          <path d="M 45 -82 Q 20 -60 0 -46" stroke="#1d4ed8" stroke-width="2.5"/>
          <!-- Top Button Rivet -->
          <circle cx="0" cy="-102" r="7" fill="#1d4ed8" stroke="#0f172a" stroke-width="2.5"/>
          <!-- Iconic Curved Visor angled slightly to the side -->
          <path d="M -78 -44 Q -10 -22 78 -44 C 90 -32 52 -16 -5 -20 C -58 -22 -88 -32 -78 -44 Z"
                fill="#1e40af" stroke="#0f172a" stroke-width="5.5" stroke-linejoin="round"/>
          <path d="M -65 -40 Q -10 -24 65 -40" fill="none" stroke="#60a5fa" stroke-width="3" stroke-linecap="round"/>
          <!-- Messy blonde fringe wisps under the cap brim -->
          <path d="M -35 -20 Q -25 -6 -15 -16" fill="none" stroke="#d97706" stroke-width="4" stroke-linecap="round"/>
          <path d="M 10 -18 Q 22 -4 32 -14" fill="none" stroke="#d97706" stroke-width="4" stroke-linecap="round"/>
        </g>
      `,
    };
  }

  if (profile.headwear === "gym_snapback") {
    return {
      backSvg: `
        <!-- Snapback backwards crown -->
        <path d="M -70 -15 C -85 -75 -40 -130 0 -130 C 40 -130 85 -75 70 -15 Z" fill="#dc2626" stroke="#991b1b" stroke-width="6"/>
      `,
      frontSvg: `
        <!-- Backwards Snapback Strap & Cutout on Upper Forehead -->
        <g transform="translate(0, -66)">
          <path d="M -40 -8 C -20 8 20 8 40 -8" fill="none" stroke="#ffffff" stroke-width="8" stroke-linecap="round"/>
          <rect x="-18" y="-14" width="36" height="12" rx="3" fill="#111111"/>
          <line x1="-12" y1="-8" x2="12" y2="-8" stroke="#ffffff" stroke-width="2" stroke-dasharray="4 3"/>
        </g>
      `,
    };
  }

  return { backSvg: "", frontSvg: "" };
}

/**
 * Renders bespoke caricature garments and muscular body contours.
 */
export function renderCaricatureTorso(profile: CaricatureProfile, timeSec: number = 0): string {
  if (profile.outfit === "anatoly_baggy_overalls") {
    return `
      <!-- Anatoly Red Flannel Shirt Underneath -->
      <g id="flannel-shirt">
        <path d="M -40 -92 L 40 -92 L 44 20 L -44 20 Z" fill="#dc2626" stroke="#991b1b" stroke-width="5"/>
        <!-- Buffalo Plaid Black Tartan Grid -->
        <line x1="-24" y1="-92" x2="-24" y2="20" stroke="#111111" stroke-width="4" opacity="0.65"/>
        <line x1="0" y1="-92" x2="0" y2="20" stroke="#111111" stroke-width="4" opacity="0.65"/>
        <line x1="24" y1="-92" x2="24" y2="20" stroke="#111111" stroke-width="4" opacity="0.65"/>
        <line x1="-40" y1="-65" x2="40" y2="-65" stroke="#111111" stroke-width="4" opacity="0.65"/>
        <line x1="-40" y1="-35" x2="40" y2="-35" stroke="#111111" stroke-width="4" opacity="0.65"/>
        <line x1="-40" y1="-5" x2="40" y2="-5" stroke="#111111" stroke-width="4" opacity="0.65"/>
        <!-- Shirt Collar V -->
        <polygon points="-16,-92 0,-68 16,-92" fill="#fed89b" stroke="#991b1b" stroke-width="3"/>
      </g>

      <!-- Baggy Denim Janitor Overalls -->
      <g id="denim-overalls">
        <!-- Main Bib and Baggy Pants Base -->
        <path d="M -36 -45 L 36 -45 L 42 22 L 50 65 L -50 65 L -42 22 Z"
              fill="#1d4ed8" stroke="#1e3a8a" stroke-width="5.5" stroke-linejoin="round"/>
        <!-- Side Seam Contrast Stitching -->
        <path d="M -34 -43 L -40 20 L -48 65" fill="none" stroke="#fbbf24" stroke-width="2" stroke-dasharray="6 4"/>
        <path d="M 34 -43 L 40 20 L 48 65" fill="none" stroke="#fbbf24" stroke-width="2" stroke-dasharray="6 4"/>
        <!-- Heavy Denim Straps with Brass Metal Buckles -->
        <line x1="-26" y1="-92" x2="-22" y2="-45" stroke="#1e40af" stroke-width="12" stroke-linecap="round"/>
        <line x1="26" y1="-92" x2="22" y2="-45" stroke="#1e40af" stroke-width="12" stroke-linecap="round"/>
        <!-- Brass Buckles & Sliders -->
        <rect x="-30" y="-55" width="16" height="12" rx="3" fill="#facc15" stroke="#a16207" stroke-width="2.5"/>
        <rect x="14" y="-55" width="16" height="12" rx="3" fill="#facc15" stroke="#a16207" stroke-width="2.5"/>
        <circle cx="-22" cy="-49" r="2.5" fill="#713f12"/>
        <circle cx="22" cy="-49" r="2.5" fill="#713f12"/>
        <!-- Front Chest Bib Pocket -->
        <path d="M -18 -25 L 18 -25 L 14 10 L -14 10 Z" fill="#1e40af" stroke="#172554" stroke-width="3"/>
        <line x1="-12" y1="-14" x2="12" y2="-14" stroke="#fbbf24" stroke-width="1.8" stroke-dasharray="4 3"/>
        <!-- Cleaning Rag / Towel hanging out of pocket -->
        <path d="M 4 -28 L 12 -28 L 16 -8 L 8 -6 Z" fill="#f8fafc" stroke="#94a3b8" stroke-width="2"/>
      </g>
    `;
  }

  if (profile.outfit === "bodybuilder_tank") {
    return `
      <!-- Massive Muscular Torso Base -->
      <g id="bodybuilder-muscle-torso">
        <!-- Broad V-Taper Cartoon Lats & Chest (Skin) -->
        <path d="M -60 -92 L 60 -92 L 32 30 L -32 30 Z" fill="#fed89b" stroke="#111111" stroke-width="6"/>
        <!-- Pectoral Crease & Cleavage -->
        <path d="M -40 -40 Q 0 -30 40 -40" fill="none" stroke="#d97706" stroke-width="4"/>
        <line x1="0" y1="-85" x2="0" y2="10" stroke="#d97706" stroke-width="4"/>
        <!-- Six-pack abdominal grooves -->
        <line x1="-18" y1="-15" x2="18" y2="-15" stroke="#d97706" stroke-width="3.5"/>
        <line x1="-16" y1="5" x2="16" y2="5" stroke="#d97706" stroke-width="3.5"/>

        <!-- Bulging Trapezius muscles flanking the neck -->
        <path d="M -55 -92 Q -25 -110 0 -92 Q 25 -110 55 -92" fill="#fed89b" stroke="#111111" stroke-width="6"/>

        <!-- Red Stringer Tank Top stretched over giant chest -->
        <path d="M -26 -92 L 26 -92 L 24 25 L -24 25 Z" fill="#dc2626" stroke="#991b1b" stroke-width="5"/>
        <!-- Ultra-thin stringer straps -->
        <path d="M -26 -92 Q -4 -50 -24 0" fill="none" stroke="#dc2626" stroke-width="6"/>
        <path d="M 26 -92 Q 4 -50 24 0" fill="none" stroke="#dc2626" stroke-width="6"/>
        <!-- Iron Gym Graphic -->
        <circle cx="0" cy="-45" r="14" fill="#991b1b"/>
        <text x="0" y="-39" font-family="'Impact', sans-serif" font-size="14" fill="#ffffff" text-anchor="middle">IRON</text>
      </g>
    `;
  }

  return "";
}

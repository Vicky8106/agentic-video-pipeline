/**
 * Expressive Footwear & Shoe Rigging System for Casually Explained / Alex Meyers Animation.
 * Replaces plain rounded line terminations with grounded cartoon footwear, defined soles,
 * ankle cuffs, and toe bends.
 */

export type ShoeStyle =
  | "work_boot"       // Heavy janitor / construction boots with lug soles (Anatoly)
  | "gym_sneaker"     // Chunky athletic trainer with white midsole (Bodybuilder)
  | "casual_sneaker"  // Low-profile skate / casual sneaker
  | "dress_shoe"      // Sleek formal leather shoe with heel
  | "bare_or_clean";  // Minimalist clean cartoon foot

export interface FootRenderParams {
  x: number;
  y: number;
  angleDeg?: number;
  isLeft?: boolean;
  scale?: number;
  shoeStyle?: ShoeStyle;
  facingRight?: boolean;
}

/**
 * Renders a grounded cartoon shoe with sole tread, toe cap, and heel.
 */
export function renderFoot(params: FootRenderParams): string {
  const {
    x,
    y,
    angleDeg = 0,
    isLeft = false,
    scale = 1.0,
    shoeStyle = "work_boot",
    facingRight = true,
  } = params;

  const flipX = facingRight ? 1 : -1;

  let shoeContent = "";

  switch (shoeStyle) {
    case "work_boot":
      // Heavy honey-tan/dark-brown work boot with thick rubber lug sole (Anatoly iconic look)
      shoeContent = `
        <!-- Ankle padding cuff -->
        <path d="M -14 -22 L 10 -22 L 12 -12 L -14 -12 Z" fill="#451a03" stroke="#111111" stroke-width="4"/>
        <!-- Main boot leather upper -->
        <path d="M -16 -12 L 10 -12 L 18 2 L 34 8 C 38 12 36 20 28 20 L -18 20 C -22 18 -22 -6 -16 -12 Z"
              fill="#b45309" stroke="#111111" stroke-width="4.5" stroke-linejoin="round"/>
        <!-- Curved reinforced toe cap -->
        <path d="M 16 4 C 26 4 34 10 32 20" fill="none" stroke="#78350f" stroke-width="3" stroke-linecap="round"/>
        <!-- Boot eyelets & lace cross -->
        <circle cx="2" cy="-6" r="2" fill="#fef08a"/>
        <circle cx="6" cy="2" r="2" fill="#fef08a"/>
        <line x1="2" y1="-6" x2="6" y2="2" stroke="#111111" stroke-width="2.5"/>
        <!-- Thick black lug sole & defined heel -->
        <path d="M -20 20 L 32 20 L 30 27 L 8 27 L 8 24 L -6 24 L -6 27 L -20 27 Z"
              fill="#1c1917" stroke="#111111" stroke-width="3"/>
        <!-- Sole treads -->
        <line x1="14" y1="27" x2="14" y2="23" stroke="#44403c" stroke-width="2"/>
        <line x1="22" y1="27" x2="22" y2="23" stroke="#44403c" stroke-width="2"/>
      `;
      break;

    case "gym_sneaker":
      // High-top athletic gym sneaker with chunky white midsole and colored accent (Bodybuilder)
      shoeContent = `
        <!-- High-top ankle collar -->
        <path d="M -14 -20 L 10 -20 L 12 -10 L -14 -10 Z" fill="#ef4444" stroke="#111111" stroke-width="4"/>
        <!-- Main sneaker upper -->
        <path d="M -16 -10 L 12 -10 L 18 2 L 32 8 C 36 12 34 18 28 18 L -18 18 C -22 16 -22 -4 -16 -10 Z"
              fill="#1e293b" stroke="#111111" stroke-width="4.5" stroke-linejoin="round"/>
        <!-- Red side swoosh / chevron -->
        <path d="M -8 2 L 14 0 L 8 8" fill="none" stroke="#ef4444" stroke-width="3.5" stroke-linecap="round"/>
        <!-- Clean white rubber midsole & outsole -->
        <rect x="-20" y="18" width="52" height="7" rx="3" fill="#f8fafc" stroke="#111111" stroke-width="3"/>
        <line x1="-18" y1="22" x2="30" y2="22" stroke="#cbd5e1" stroke-width="1.5"/>
      `;
      break;

    case "dress_shoe":
      // Polished formal shoe with curved instep and low heel (Suit / Doctor)
      shoeContent = `
        <path d="M -16 -8 L 8 -8 L 16 0 L 32 8 C 36 12 34 18 26 18 L -18 18 C -22 16 -22 -2 -16 -8 Z"
              fill="#09090b" stroke="#111111" stroke-width="4.5" stroke-linejoin="round"/>
        <!-- Sleek dress shoe sole with defined heel gap -->
        <path d="M -20 18 L 30 18 L 28 24 L 6 24 L 6 21 L -8 21 L -8 24 L -20 24 Z"
              fill="#27272a" stroke="#111111" stroke-width="2.5"/>
      `;
      break;

    case "casual_sneaker":
    case "bare_or_clean":
    default:
      // Iconic rounded cartoon shoe with crisp sole
      shoeContent = `
        <!-- Classic rounded cartoon shoe -->
        <path d="M -14 -6 L 8 -6 L 16 2 L 28 6 C 32 10 30 16 24 16 L -16 16 C -20 14 -20 -2 -14 -6 Z"
              fill="#18181b" stroke="#111111" stroke-width="4" stroke-linejoin="round"/>
        <!-- White rubber toe bumper and bottom line -->
        <path d="M 18 4 C 26 6 28 10 26 16" fill="none" stroke="#f8fafc" stroke-width="2.5" stroke-linecap="round"/>
        <line x1="-16" y1="16" x2="26" y2="16" stroke="#f8fafc" stroke-width="3" stroke-linecap="round"/>
      `;
      break;
  }

  return `
    <g class="character-foot" transform="translate(${x}, ${y}) rotate(${angleDeg}) scale(${scale * flipX}, ${scale})">
      ${shoeContent}
    </g>
  `;
}

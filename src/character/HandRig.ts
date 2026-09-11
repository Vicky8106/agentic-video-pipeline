/**
 * Expressive Hand & Grip Rigging System for Casually Explained / Alex Meyers 2D Animation.
 * Replaces 2-line "chicken claws" with expressive cartoon hands, proper finger grips,
 * and 2-layer prop grasping (palm behind, fingers wrapped in front).
 */

export type HandPose =
  | "relaxed_mitt"
  | "pointing"
  | "fist"
  | "open_spread"
  | "gripping"
  | "thumbs_up"
  | "peace"
  | "shaka";

export interface HandRenderParams {
  x: number;
  y: number;
  angleDeg: number;
  pose?: HandPose;
  isLeft?: boolean;
  scale?: number;
  strokeColor?: string;
  fillColor?: string;
  strokeWidth?: number;
}

export interface GrippedPropRenderResult {
  backSvg: string;   // Rendered behind the prop (palm / thumb base)
  frontSvg: string;  // Rendered in front of the prop (wrapping fingers and knuckles)
}

/**
 * Renders an expressive cartoon hand with distinct anatomical silhouette:
 * palm base, defined thumb, and clustered or articulate fingers.
 */
export function renderHand(params: HandRenderParams): string {
  const {
    x,
    y,
    angleDeg,
    pose = "relaxed_mitt",
    isLeft = false,
    scale = 1.0,
    strokeColor = "#111111",
    fillColor = "#fed89b", // Matching Casually Explained warm peach skin
    strokeWidth = 5,
  } = params;

  const flipX = isLeft ? -1 : 1;

  let handContent = "";

  switch (pose) {
    case "pointing":
      // Defined pointing hand: Extended index finger, thumb resting, 3 fingers tucked into fist
      handContent = `
        <!-- Palm & tucked knuckles -->
        <path d="M -8 -10 C -12 -5 -12 12 -4 16 C 6 18 16 14 18 6 C 20 -2 14 -12 6 -12 Z"
              fill="${fillColor}" stroke="${strokeColor}" stroke-width="${strokeWidth}" stroke-linejoin="round"/>
        <!-- Tucked fingers (middle, ring, pinky) -->
        <path d="M 4 -8 C 10 -8 12 -2 6 2 M 6 2 C 12 2 12 8 4 8 M 4 8 C 10 8 10 14 0 14"
              fill="none" stroke="${strokeColor}" stroke-width="${strokeWidth - 1}" stroke-linecap="round"/>
        <!-- Rested thumb -->
        <path d="M -4 8 C -8 12 -14 8 -10 2 C -8 -2 -4 0 -4 4"
              fill="${fillColor}" stroke="${strokeColor}" stroke-width="${strokeWidth}" stroke-linecap="round"/>
        <!-- Extended index finger -->
        <path d="M 2 -12 L 32 -14 C 37 -14 37 -6 31 -6 L 8 -6"
              fill="${fillColor}" stroke="${strokeColor}" stroke-width="${strokeWidth}" stroke-linejoin="round" stroke-linecap="round"/>
      `;
      break;

    case "fist":
      // Clenched fist with thumb locked over fingers
      handContent = `
        <!-- Clenched knuckles outline -->
        <path d="M -10 -12 C 4 -16 16 -12 20 -4 C 22 8 16 16 6 18 C -6 18 -14 10 -14 -2 Z"
              fill="${fillColor}" stroke="${strokeColor}" stroke-width="${strokeWidth}" stroke-linejoin="round"/>
        <!-- Knuckle creases -->
        <line x1="4" y1="-14" x2="2" y2="4" stroke="${strokeColor}" stroke-width="${strokeWidth - 1}" stroke-linecap="round"/>
        <line x1="12" y1="-10" x2="10" y2="6" stroke="${strokeColor}" stroke-width="${strokeWidth - 1}" stroke-linecap="round"/>
        <!-- Wrapping thumb -->
        <path d="M -12 2 C -14 -6 0 -8 10 -4 C 12 0 8 6 2 6"
              fill="${fillColor}" stroke="${strokeColor}" stroke-width="${strokeWidth}" stroke-linecap="round"/>
      `;
      break;

    case "open_spread":
      // Expressive splayed cartoon hand (4 fingers)
      handContent = `
        <!-- Palm center -->
        <ellipse cx="0" cy="2" rx="12" ry="10" fill="${fillColor}" stroke="${strokeColor}" stroke-width="${strokeWidth}"/>
        <!-- Thumb -->
        <path d="M -8 6 C -18 8 -22 0 -14 -4 C -10 -6 -6 -2 -6 2"
              fill="${fillColor}" stroke="${strokeColor}" stroke-width="${strokeWidth}" stroke-linecap="round"/>
        <!-- Index -->
        <path d="M -4 -8 L -6 -24 C -6 -28 0 -28 2 -24 L 2 -8"
              fill="${fillColor}" stroke="${strokeColor}" stroke-width="${strokeWidth}" stroke-linecap="round"/>
        <!-- Middle -->
        <path d="M 2 -8 L 8 -26 C 8 -30 14 -30 15 -25 L 10 -6"
              fill="${fillColor}" stroke="${strokeColor}" stroke-width="${strokeWidth}" stroke-linecap="round"/>
        <!-- Ring / Pinky -->
        <path d="M 10 -5 L 20 -20 C 23 -23 27 -20 25 -16 L 14 -1"
              fill="${fillColor}" stroke="${strokeColor}" stroke-width="${strokeWidth}" stroke-linecap="round"/>
      `;
      break;

    case "thumbs_up":
      handContent = `
        <ellipse cx="0" cy="4" rx="14" ry="12" fill="${fillColor}" stroke="${strokeColor}" stroke-width="${strokeWidth}"/>
        <!-- Curved tucked fingers -->
        <path d="M 8 -4 C 16 -4 16 2 8 4 M 8 4 C 16 4 16 10 6 12 M 6 12 C 14 12 14 18 0 16"
              fill="none" stroke="${strokeColor}" stroke-width="${strokeWidth - 1}" stroke-linecap="round"/>
        <!-- Upright hitchhiker thumb -->
        <path d="M -6 0 L -8 -26 C -8 -32 0 -32 2 -26 L 4 -2"
              fill="${fillColor}" stroke="${strokeColor}" stroke-width="${strokeWidth}" stroke-linejoin="round" stroke-linecap="round"/>
      `;
      break;

    case "gripping":
      // Hand curled around a cylindrical shaft
      handContent = `
        <!-- Base palm -->
        <ellipse cx="0" cy="0" rx="14" ry="12" fill="${fillColor}" stroke="${strokeColor}" stroke-width="${strokeWidth}"/>
        <!-- Wrapped fingers forming clamp -->
        <path d="M -10 -10 C -4 -16 12 -16 16 -8 C 18 2 12 12 -2 12 C -10 12 -16 6 -14 -2"
              fill="${fillColor}" stroke="${strokeColor}" stroke-width="${strokeWidth}" stroke-linecap="round"/>
        <!-- Thumb locking across front -->
        <path d="M -12 6 Q 0 0 12 2" fill="none" stroke="${strokeColor}" stroke-width="${strokeWidth}" stroke-linecap="round"/>
      `;
      break;

    case "relaxed_mitt":
    default:
      // Alex Meyers / Casually Explained iconic relaxed cartoon mitt
      handContent = `
        <!-- Volumetric palm & clustered fingers -->
        <path d="M -6 -10 C -12 -12 -16 -4 -14 6 C -12 14 -4 18 6 16 C 16 14 22 4 18 -6 C 15 -14 2 -14 -6 -10 Z"
              fill="${fillColor}" stroke="${strokeColor}" stroke-width="${strokeWidth}" stroke-linejoin="round"/>
        <!-- Natural thumb notch -->
        <path d="M -10 0 C -18 2 -16 10 -8 10"
              fill="${fillColor}" stroke="${strokeColor}" stroke-width="${strokeWidth}" stroke-linecap="round"/>
        <!-- Finger separation crease -->
        <line x1="2" y1="-8" x2="4" y2="10" stroke="${strokeColor}" stroke-width="${strokeWidth - 1.5}" stroke-linecap="round"/>
        <line x1="10" y1="-5" x2="11" y2="8" stroke="${strokeColor}" stroke-width="${strokeWidth - 1.5}" stroke-linecap="round"/>
      `;
      break;
  }

  return `
    <g class="character-hand" transform="translate(${x}, ${y}) rotate(${angleDeg}) scale(${scale * flipX}, ${scale})">
      ${handContent}
    </g>
  `;
}

/**
 * 2-Layer Grip Renderer:
 * Yields background palm and foreground wrapping fingers so the prop sits securely sandwiched inside the hand.
 */
export function renderGrippingHandLayers(params: HandRenderParams): GrippedPropRenderResult {
  const {
    x,
    y,
    angleDeg,
    isLeft = false,
    scale = 1.0,
    strokeColor = "#111111",
    fillColor = "#fed89b",
    strokeWidth = 5,
  } = params;

  const flipX = isLeft ? -1 : 1;

  const backSvg = `
    <g class="hand-grip-back" transform="translate(${x}, ${y}) rotate(${angleDeg}) scale(${scale * flipX}, ${scale})">
      <!-- Palm support cradle behind the prop -->
      <path d="M -12 -14 C -16 -6 -16 8 -8 14 C 4 16 14 12 16 2 L 10 -10 Z"
            fill="${fillColor}" stroke="${strokeColor}" stroke-width="${strokeWidth}" stroke-linejoin="round"/>
    </g>
  `;

  const frontSvg = `
    <g class="hand-grip-front" transform="translate(${x}, ${y}) rotate(${angleDeg}) scale(${scale * flipX}, ${scale})">
      <!-- 4 Curved fingers wrapping tightly around the front of the shaft -->
      <path d="M -10 -12 C 4 -16 14 -12 16 -6 C 18 0 10 6 2 6"
            fill="${fillColor}" stroke="${strokeColor}" stroke-width="${strokeWidth}" stroke-linecap="round"/>
      <path d="M -8 -4 C 6 -8 16 -4 16 2 C 16 6 8 10 0 10"
            fill="${fillColor}" stroke="${strokeColor}" stroke-width="${strokeWidth}" stroke-linecap="round"/>
      <!-- Finger grooves -->
      <line x1="2" y1="-14" x2="2" y2="6" stroke="${strokeColor}" stroke-width="${strokeWidth - 1.5}" stroke-linecap="round"/>
      <line x1="10" y1="-10" x2="8" y2="4" stroke="${strokeColor}" stroke-width="${strokeWidth - 1.5}" stroke-linecap="round"/>
      <!-- Opposing thumb clamped down over the knuckles -->
      <path d="M -14 6 C -12 14 2 16 10 10 C 12 6 8 0 2 0"
            fill="${fillColor}" stroke="${strokeColor}" stroke-width="${strokeWidth}" stroke-linecap="round"/>
    </g>
  `;

  return { backSvg, frontSvg };
}

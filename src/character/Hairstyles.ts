/**
 * Canonical Hairstyle Library for Casually Explained / Alex Meyers Drama Animation.
 * Phase 1 asset contract: stable IDs, modular front/back layers, expressive silhouettes.
 * Mathematically calibrated to frame the face without obscuring eyes (y=-20..5) or mouth (y=20..45).
 */

export type HairstyleId =
  | "female_bob_bangs"
  | "female_bob"
  | "female_high_ponytail"
  | "female_ponytail"
  | "female_long_brunette"
  | "female_long"
  | "female_blonde_curls"
  | "female_blonde"
  | "female_messy_bun"
  | "female_pixie_y2k"
  | "female_gothic_waves"
  | "female_slicked_back"
  | "female_side_braid"
  | "male_host_curly"
  | "host_classic"
  | "male_tech_bro"
  | "male_short"
  | "male_bodybuilder_bald"
  | "bodybuilder_bald"
  | "male_doctor_cap"
  | "doctor_cap"
  | "female_widow_veil"
  | "widow_veil"
  | "none";

export interface HairRenderResult {
  backSvg: string;   // Rendered behind head and face
  frontSvg: string;  // Rendered in front of head and face (bangs, strands, accessories)
}

/**
 * Renders distinct vector hairstyles with separate back and front layers.
 * Anchored relative to head center (0, 0) with head oval (rx~68, ry~75).
 * Forehead: y = -85..-45, Eyebrows: y = -40..-25, Eyes: y = -20..5, Mouth: y = 20..45.
 */
export function renderHairstyle(hairId: HairstyleId | string = "host_classic", timeSec: number = 0): HairRenderResult {
  const sway = Math.sin(timeSec * 3) * 2;

  switch (hairId) {
    // 1. Jenna Ortega / French Chic Sharp Bob with Straight Bangs
    case "female_bob_bangs":
    case "female_bob":
      return {
        backSvg: `
          <!-- Sharp Jet-Black Bob Back Silhouette -->
          <path d="
            M -82 0
            C -98 -50 -85 -115 0 -115
            C 85 -115 98 -50 82 0
            C 88 50 78 85 55 95
            L -55 95
            C -78 85 -88 50 -82 0 Z"
            fill="#121214" stroke="#09090b" stroke-width="6" stroke-linejoin="round"/>
        `,
        frontSvg: `
          <g>
            <!-- Left & Right Sleek Outer Edge Locks (Hugs outer cheeks, leaving face center wide open) -->
            <path d="M -72 -30 C -82 15 -76 60 -58 85 C -66 50 -68 10 -60 -25 Z" fill="#18181b" stroke="#09090b" stroke-width="4"/>
            <path d="M 72 -30 C 82 15 76 60 58 85 C 66 50 68 10 60 -25 Z" fill="#18181b" stroke="#09090b" stroke-width="4"/>
            <!-- Straight-Across Blunt Bangs (Precisely positioned on upper forehead y=-68..-42 above brows) -->
            <path d="
              M -60 -48
              C -35 -58 35 -58 60 -48
              L 58 -38
              C 30 -44 -30 -44 -58 -38 Z"
              fill="#18181b" stroke="#09090b" stroke-width="4"/>
            <!-- Glossy Highlight Arc on Crown -->
            <path d="M -40 -75 Q 0 -90 40 -75" fill="none" stroke="#3f3f46" stroke-width="4" stroke-linecap="round" opacity="0.6"/>
          </g>
        `,
      };

    // 2. High Ariana Grande / Y2K Swinging Ponytail with Scrunchie
    case "female_high_ponytail":
    case "female_ponytail":
      return {
        backSvg: `
          <!-- High Sleek Updo Crown Base -->
          <path d="M -70 5 C -85 -55 -40 -115 0 -115 C 40 -115 85 -55 70 5 Z" fill="#1c1917" stroke="#0c0a09" stroke-width="5"/>
          <!-- Huge Cascading Swinging Ponytail -->
          <g transform="translate(50, -80) rotate(${sway * 2})">
            <path d="
              M 0 0
              C 70 -35 125 15 105 85
              C 85 140 55 170 30 195
              C 25 155 40 110 35 65
              C 30 25 12 10 -10 0 Z"
              fill="#1c1917" stroke="#0c0a09" stroke-width="6" stroke-linejoin="round"/>
            <path d="M 30 25 C 60 45 75 85 55 130" fill="none" stroke="#44403c" stroke-width="4" stroke-linecap="round"/>
          </g>
        `,
        frontSvg: `
          <!-- Cute Pink Scrunchie Anchor -->
          <g transform="translate(50, -80)">
            <ellipse cx="0" cy="0" rx="16" ry="12" fill="#f43f5e" stroke="#be123c" stroke-width="4"/>
            <circle cx="-4" cy="-2" r="3" fill="#ffe4e6"/>
          </g>
          <!-- Front Wispy Hairline across Forehead (above y=-45) -->
          <path d="M -50 -52 Q -25 -65 0 -65 Q 25 -65 50 -52" fill="none" stroke="#1c1917" stroke-width="5" stroke-linecap="round"/>
          <!-- Delicate Side Whisps hugging ears -->
          <path d="M -60 -25 Q -66 5 -60 25" fill="none" stroke="#1c1917" stroke-width="4" stroke-linecap="round"/>
        `,
      };

    // 3. Long Flowing Brunette Waves past Shoulders
    case "female_long_brunette":
    case "female_long":
      return {
        backSvg: `
          <!-- Voluminous Dark Waves Flowing Behind Torso and Shoulders -->
          <path d="
            M -85 10
            C -120 -40 -95 -125 0 -125
            C 95 -125 120 -40 85 10
            C 115 70 125 150 95 210
            C 75 160 70 110 60 60
            L -60 60
            C -70 110 -75 160 -95 210
            C -125 150 -115 70 -85 10 Z"
            fill="#271810" stroke="#150d09" stroke-width="6" stroke-linejoin="round"/>
          <!-- Dark Wave Strands -->
          <path d="M -80 80 Q -95 140 -80 190" fill="none" stroke="#3e2619" stroke-width="4" stroke-linecap="round"/>
          <path d="M 80 80 Q 95 140 80 190" fill="none" stroke="#3e2619" stroke-width="4" stroke-linecap="round"/>
        `,
        frontSvg: `
          <!-- Front Center Part & Cheek-Framing Outer Curtain Strands (Leaves center face wide open!) -->
          <g>
            <!-- Forehead Hairline Part -->
            <path d="M -55 -45 Q -25 -60 0 -58 Q 25 -60 55 -45" fill="none" stroke="#271810" stroke-width="6" stroke-linecap="round"/>
            <!-- Left Outer Face Framing Lock -->
            <path d="M -58 -42 C -72 -10 -70 30 -58 65 C -66 30 -66 -5 -54 -35 Z" fill="#271810" stroke="#150d09" stroke-width="3"/>
            <!-- Right Outer Face Framing Lock -->
            <path d="M 58 -42 C 72 -10 70 30 58 65 C 66 30 66 -5 54 -35 Z" fill="#271810" stroke="#150d09" stroke-width="3"/>
            <!-- Specular Highlights on Crown -->
            <path d="M -40 -72 Q 0 -85 40 -72" fill="none" stroke="#523321" stroke-width="4" stroke-linecap="round"/>
          </g>
        `,
      };

    // 4. Voluminous 90s Golden Blonde Blowout Curls
    case "female_blonde_curls":
    case "female_blonde":
      return {
        backSvg: `
          <!-- Big 90s Glamour Blonde Volume -->
          <path d="
            M -95 10
            C -130 -40 -105 -130 0 -130
            C 105 -130 130 -40 95 10
            C 120 80 115 150 85 195
            C 65 140 65 90 50 40
            L -50 40
            C -65 90 -65 140 -85 195
            C -115 150 -120 80 -95 10 Z"
            fill="#facc15" stroke="#ca8a04" stroke-width="6" stroke-linejoin="round"/>
          <path d="M -85 60 Q -105 110 -75 160" fill="none" stroke="#eab308" stroke-width="5" stroke-linecap="round"/>
          <path d="M 85 60 Q 105 110 75 160" fill="none" stroke="#eab308" stroke-width="5" stroke-linecap="round"/>
        `,
        frontSvg: `
          <!-- Side-Swept High Volume Blonde Fringe & Outer Face Layers -->
          <g>
            <path d="
              M -60 -45
              C -35 -60 15 -62 48 -45
              L 42 -36
              C 12 -52 -30 -50 -54 -36 Z"
              fill="#fde047" stroke="#ca8a04" stroke-width="3"/>
            <!-- Left & Right Voluminous Curls Hugging Outer Cheek Edge -->
            <path d="M -64 -25 C -78 10 -75 50 -58 75 C -70 40 -70 0 -58 -18 Z" fill="#fde047" stroke="#ca8a04" stroke-width="3"/>
            <path d="M 64 -25 C 78 10 75 50 58 75 C 70 40 70 0 58 -18 Z" fill="#fde047" stroke="#ca8a04" stroke-width="3"/>
            <path d="M -35 -70 Q 0 -85 30 -70" fill="none" stroke="#ffffff" stroke-width="4" stroke-linecap="round" opacity="0.8"/>
          </g>
        `,
      };

    // 5. Chic Messy Topknot Bun with Stray Strands
    case "female_messy_bun":
      return {
        backSvg: `
          <!-- High Messy Textured Topknot Bun -->
          <g transform="translate(0, -95) rotate(${sway})">
            <ellipse cx="0" cy="0" rx="42" ry="34" fill="#3b2216" stroke="#1c100a" stroke-width="5"/>
            <path d="M -25 -10 Q 0 -35 25 -10 Q 35 15 0 22 Q -35 15 -25 -10 Z" fill="#4a2c1d" stroke="#1c100a" stroke-width="3"/>
            <!-- Cute Golden Hairpin / Clip -->
            <line x1="-35" y1="-15" x2="35" y2="10" stroke="#f59e0b" stroke-width="5" stroke-linecap="round"/>
            <circle cx="36" cy="11" r="5" fill="#fbbf24"/>
          </g>
          <!-- Base Head Wrap -->
          <path d="M -68 10 C -82 -50 -35 -105 0 -105 C 35 -105 82 -50 68 10 Z" fill="#3b2216" stroke="#1c100a" stroke-width="5"/>
        `,
        frontSvg: `
          <!-- Loose Tendrils Framing Cheeks and Forehead (Above y=-45) -->
          <path d="M -48 -50 Q -25 -62 0 -62 Q 25 -62 48 -50" fill="none" stroke="#3b2216" stroke-width="5" stroke-linecap="round"/>
          <!-- Falling Side Strands by ears -->
          <path d="M -65 -15 Q -72 15 -66 45" fill="none" stroke="#3b2216" stroke-width="4" stroke-linecap="round"/>
          <path d="M 65 -15 Q 72 15 66 45" fill="none" stroke="#3b2216" stroke-width="4" stroke-linecap="round"/>
        `,
      };

    // 6. Y2K Frosted Spiky Pixie Cut
    case "female_pixie_y2k":
      return {
        backSvg: `
          <!-- Short Tapered Neck Base -->
          <path d="M -60 20 C -75 -40 -35 -95 0 -95 C 35 -95 75 -40 60 20 Z" fill="#292524" stroke="#0c0a09" stroke-width="5"/>
        `,
        frontSvg: `
          <!-- Spiky Crown with Frosted Platinum Tips (High on head) -->
          <g transform="translate(0, -75)">
            <polygon points="-50,5 -60,-25 -40,-5" fill="#fef08a" stroke="#ca8a04" stroke-width="3"/>
            <polygon points="-30,0 -35,-35 -15,-5" fill="#fde047" stroke="#ca8a04" stroke-width="3"/>
            <polygon points="-10,-5 -5,-45 10,-5" fill="#fef08a" stroke="#ca8a04" stroke-width="3"/>
            <polygon points="15,-5 25,-38 35,0" fill="#fde047" stroke="#ca8a04" stroke-width="3"/>
            <polygon points="35,5 50,-25 45,10" fill="#fef08a" stroke="#ca8a04" stroke-width="3"/>
          </g>
          <!-- Short Asymmetrical Razor Fringe (Above brows y=-65..-48) -->
          <path d="M -50 -50 L -20 -40 L -10 -52 L 20 -42 L 40 -50 L 50 -40 L 40 -32 L 0 -38 L -45 -36 Z" fill="#44403c" stroke="#1c1917" stroke-width="3"/>
        `,
      };

    // 7. Victorian Gothic Cascading Waves with Dark Rose
    case "female_gothic_waves":
      return {
        backSvg: `
          <!-- Heavy Dramatic Gothic Black Waves -->
          <path d="
            M -90 10
            C -130 -40 -100 -130 0 -130
            C 100 -130 130 -40 90 10
            C 125 80 130 170 95 225
            C 75 170 65 110 50 60
            L -50 60
            C -65 110 -75 170 -95 225
            C -130 170 -125 80 -90 10 Z"
            fill="#09090b" stroke="#000000" stroke-width="6" stroke-linejoin="round"/>
        `,
        frontSvg: `
          <!-- Gothic Center Part with Ornate Velvet Rose -->
          <g>
            <path d="M -55 -48 Q -25 -60 0 -55 Q 25 -60 55 -48" fill="none" stroke="#18181b" stroke-width="6" stroke-linecap="round"/>
            <!-- Dark Red Velvet Gothic Rose Pin on Side -->
            <g transform="translate(52, -55)">
              <circle cx="0" cy="0" r="14" fill="#881337" stroke="#4c0519" stroke-width="3"/>
              <path d="M -6 -4 Q 0 -12 6 -4 Q 10 4 0 8 Q -10 4 -6 -4 Z" fill="#9f1239"/>
              <circle cx="0" cy="0" r="4" fill="#be123c"/>
            </g>
          </g>
        `,
      };

    // 8. Modern High-Fashion Slicked Back
    case "female_slicked_back":
      return {
        backSvg: `
          <!-- Sleek Clean Tapered Silhouette -->
          <path d="M -70 5 C -85 -55 -40 -110 0 -110 C 40 -110 85 -55 70 5 C 75 45 65 75 55 90 L -55 90 C -65 75 -75 45 -70 5 Z" fill="#18181b" stroke="#09090b" stroke-width="5"/>
        `,
        frontSvg: `
          <!-- Wet-Look Slicked Back Lines exposing forehead & cheekbones -->
          <g transform="translate(0, -45)">
            <path d="M -50 -15 Q -25 -35 0 -35 Q 25 -35 50 -15" fill="none" stroke="#27272a" stroke-width="6" stroke-linecap="round"/>
            <line x1="-30" y1="-30" x2="-30" y2="-10" stroke="#3f3f46" stroke-width="3" stroke-linecap="round"/>
            <line x1="0" y1="-34" x2="0" y2="-12" stroke="#3f3f46" stroke-width="3" stroke-linecap="round"/>
            <line x1="30" y1="-30" x2="30" y2="-10" stroke="#3f3f46" stroke-width="3" stroke-linecap="round"/>
          </g>
        `,
      };

    // 9. Side Braid over Shoulder
    case "female_side_braid":
      return {
        backSvg: `
          <path d="M -65 10 C -80 -50 -35 -110 0 -110 C 35 -110 80 -50 65 10 Z" fill="#291811" stroke="#160d09" stroke-width="5"/>
        `,
        frontSvg: `
          <!-- Front Hairline Part (Above brows) -->
          <path d="M -50 -50 Q -20 -60 15 -58 Q 45 -55 58 -45" fill="none" stroke="#291811" stroke-width="5" stroke-linecap="round"/>
          <!-- Long Woven Braid over Left Shoulder (Outer side) -->
          <g transform="translate(-62, 10)">
            <ellipse cx="-4" cy="20" rx="12" ry="14" fill="#3b2216" stroke="#160d09" stroke-width="4"/>
            <ellipse cx="2" cy="42" rx="11" ry="13" fill="#291811" stroke="#160d09" stroke-width="4"/>
            <ellipse cx="-3" cy="64" rx="10" ry="12" fill="#3b2216" stroke="#160d09" stroke-width="4"/>
            <ellipse cx="1" cy="85" rx="9" ry="11" fill="#291811" stroke="#160d09" stroke-width="4"/>
            <!-- Hair Tie -->
            <rect x="-8" y="98" width="14" height="6" rx="2" fill="#38bdf8"/>
            <path d="M -4 104 L -7 118 L 3 118 L 1 104 Z" fill="#291811"/>
          </g>
        `,
      };

    // 10. Male Silicon Valley Tech Bro Side Part
    case "male_tech_bro":
    case "male_short":
      return {
        backSvg: `
          <!-- Clean Tapered Neck Line -->
          <path d="M -65 0 C -75 -45 -35 -95 0 -95 C 35 -95 75 -45 65 0 Z" fill="#1e1b18" stroke="#0a0908" stroke-width="5"/>
        `,
        frontSvg: `
          <!-- Crisp Tech Side Part & Combed Fringe (Above y=-45) -->
          <path d="
            M -55 -48
            C -40 -60 -15 -62 10 -60
            C 35 -58 55 -48 60 -40
            L 55 -34
            C 30 -44 -20 -44 -48 -36 Z"
            fill="#292524" stroke="#0c0a09" stroke-width="3"/>
          <path d="M -30 -55 Q 0 -60 30 -52" fill="none" stroke="#44403c" stroke-width="3" stroke-linecap="round"/>
        `,
      };

    // 11. Male Bodybuilder Bald with Red Sweatband
    case "male_bodybuilder_bald":
    case "bodybuilder_bald":
      return {
        backSvg: ``,
        frontSvg: `
          <!-- Bold Athletic Red Sweatband around Crown (Above brows at y=-58..-40) -->
          <g transform="translate(0, -48)">
            <rect x="-64" y="-10" width="128" height="20" rx="6" fill="#dc2626" stroke="#991b1b" stroke-width="4"/>
            <line x1="-60" y1="0" x2="60" y2="0" stroke="#ffffff" stroke-width="3"/>
          </g>
        `,
      };

    // 12. Medical Doctor Surgical Scrub Cap with Headlamp
    case "male_doctor_cap":
    case "doctor_cap":
      return {
        backSvg: `
          <!-- Teal Surgical Cap Crown -->
          <path d="M -72 10 C -85 -60 -45 -115 0 -115 C 45 -115 85 -60 72 10 Z" fill="#0d9488" stroke="#115e59" stroke-width="5"/>
        `,
        frontSvg: `
          <!-- Elastic Fold & Forehead Band (y=-58..-40) -->
          <rect x="-66" y="-56" width="132" height="20" rx="6" fill="#14b8a6" stroke="#0f766e" stroke-width="4"/>
          <!-- Glowing Chrome Surgical Headlamp -->
          <g transform="translate(0, -66)">
            <circle cx="0" cy="0" r="16" fill="#e2e8f0" stroke="#475569" stroke-width="3"/>
            <circle cx="0" cy="0" r="10" fill="#38bdf8"/>
            <circle cx="-3" cy="-3" r="3" fill="#ffffff"/>
          </g>
        `,
      };

    // 13. Victorian Mourning Lace Veil
    case "female_widow_veil":
    case "widow_veil":
      return {
        backSvg: `
          <!-- Dark Cascading Mourning Veil Mesh -->
          <path d="
            M -85 10
            C -120 -35 -90 -120 0 -120
            C 90 -120 120 -35 85 10
            C 115 80 125 170 95 240
            L -95 240
            C -125 170 -115 80 -85 10 Z"
            fill="#09090b" opacity="0.92" stroke="#18181b" stroke-width="5"/>
        `,
        frontSvg: `
          <!-- Black Lace Trim across Forehead (y=-60..-45) & Dark Brooch -->
          <path d="M -55 -52 Q 0 -62 55 -52 L 50 -42 Q 0 -50 -50 -42 Z" fill="#18181b" opacity="0.85" stroke="#000000" stroke-width="3"/>
          <circle cx="0" cy="-55" r="10" fill="#450a0a" stroke="#18181b" stroke-width="3"/>
          <circle cx="0" cy="-55" r="4" fill="#dc2626"/>
        `,
      };

    case "none":
      return { backSvg: "", frontSvg: "" };

    // 14. Iconic Casually Explained Messy Curly Mop (Default Host)
    case "male_host_curly":
    case "host_classic":
    default:
      return {
        backSvg: `
          <!-- Iconic Host Classic Curly Mop -->
          <path id="hair-back" d="
            M -75 25
            C -115 15 -125 -45 -85 -70
            C -115 -115 -60 -160 -15 -152
            C 15 -185 85 -175 105 -130
            C 145 -110 160 -45 130 -5
            C 160 45 135 110 90 95
            C 80 55 75 25 65 -5
            L -65 0 Z"
            fill="#0d0d0d" stroke="#0d0d0d" stroke-width="6" stroke-linejoin="round"/>
        `,
        frontSvg: `
          <!-- Front Forehead Curl Tufts (High on forehead above brows y=-65..-45) -->
          <path d="M -45 -50 C -35 -65 -15 -65 -5 -50 C 5 -65 30 -65 40 -50" fill="none" stroke="#0d0d0d" stroke-width="5" stroke-linecap="round"/>
        `,
      };
  }
}

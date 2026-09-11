/**
 * Canonical Outfit & Costume Library for Casually Explained / Alex Meyers Drama Animation.
 * Phase 1 asset contract: stable IDs, modular body cutouts, distinct silhouette styling.
 */
/**
 * Renders vector clothing overlays anchored to the torso and hips.
 * Torso center at (0, 0), neck at y=-90, hips at y=10.
 */
export function renderOutfit(outfitId = "none", timeSec = 0) {
    switch (outfitId) {
        // 1. Red Carpet Glamour Gown
        case "dress_red_carpet":
        case "dress_black":
            return `
        <!-- Glamour Red Carpet Evening Gown -->
        <path d="M -30 -85 L 30 -85 L 42 15 L 65 140 C 20 155 -20 155 -65 140 L -42 15 Z"
              fill="#be123c" stroke="#881337" stroke-width="5" stroke-linejoin="round"/>
        <!-- Sweetheart Neckline & Gold Belt -->
        <path d="M -30 -85 Q 0 -60 30 -85" fill="none" stroke="#fff1f2" stroke-width="3"/>
        <rect x="-32" y="5" width="64" height="8" rx="2" fill="#eab308" stroke="#ca8a04" stroke-width="2"/>
        <circle cx="0" cy="9" r="6" fill="#facc15"/>
      `;
        // 2. Chic Pink Cocktail Dress
        case "dress_pink":
            return `
        <!-- Chic Pink Cocktail Dress -->
        <path d="M -28 -75 L 28 -75 L 38 10 L 48 95 C 15 105 -15 105 -48 95 L -38 10 Z"
              fill="#ec4899" stroke="#be185d" stroke-width="5" stroke-linejoin="round"/>
        <!-- Spaghetti Straps -->
        <line x1="-22" y1="-90" x2="-22" y2="-75" stroke="#be185d" stroke-width="3"/>
        <line x1="22" y1="-90" x2="22" y2="-75" stroke="#be185d" stroke-width="3"/>
      `;
        // 3. Y2K Micro Baby Tee & Low-Rise Skirt
        case "y2k_crop_top_low_rise":
        case "crop_top_leggings":
            return `
        <!-- Y2K Baby Tee Crop Top -->
        <path d="M -32 -88 L 32 -88 L 36 -35 L -36 -35 Z" fill="#ffffff" stroke="#0f172a" stroke-width="4"/>
        <text x="0" y="-55" font-family="'Impact', sans-serif" font-size="12" fill="#ec4899" text-anchor="middle">BABY</text>
        <!-- Exposed Midriff Belly Button -->
        <circle cx="0" cy="-15" r="2.5" fill="#0f172a"/>
        <!-- Ultra Low-Rise Pleated Micro Skirt -->
        <path d="M -38 -5 L 38 -5 L 48 45 L -48 45 Z" fill="#3b82f6" stroke="#1d4ed8" stroke-width="4"/>
        <line x1="-38" y1="-5" x2="38" y2="-5" stroke="#1e3a8a" stroke-width="5"/> <!-- Low-rise belt line -->
        <rect x="-8" y="-9" width="16" height="8" rx="2" fill="#e2e8f0" stroke="#475569" stroke-width="2"/>
      `;
        // 4. Medical Doctor Surgical Scrubs with Stethoscope
        case "doctor_scrubs":
            return `
        <!-- Doctor Surgical V-Neck Scrubs -->
        <path d="M -35 -90 L 35 -90 L 40 15 L -40 15 Z" fill="#0d9488" stroke="#115e59" stroke-width="5"/>
        <path d="M -16 -90 L 0 -60 L 16 -90" fill="#0f766e" stroke="#115e59" stroke-width="3"/>
        <!-- ID Badge Clip -->
        <rect x="14" y="-50" width="16" height="22" rx="3" fill="#ffffff" stroke="#334155" stroke-width="2"/>
        <line x1="16" y1="-42" x2="28" y2="-42" stroke="#0f766e" stroke-width="2"/>
        <line x1="16" y1="-36" x2="26" y2="-36" stroke="#94a3b8" stroke-width="2"/>
        <!-- Stethoscope around Neck -->
        <path d="M -25 -88 C -35 -40 -20 0 0 10 C 20 0 35 -40 25 -88" fill="none" stroke="#475569" stroke-width="4" stroke-linecap="round"/>
        <circle cx="0" cy="12" r="8" fill="#94a3b8" stroke="#334155" stroke-width="3"/>
        <circle cx="0" cy="12" r="3" fill="#38bdf8"/>
      `;
        // 5. Silicon Valley Tech Bro Fleece Vest
        case "tech_fleece_vest":
            return `
        <!-- Light Blue Button-Up Shirt Base -->
        <path d="M -34 -90 L 34 -90 L 38 12 L -38 12 Z" fill="#e0f2fe" stroke="#0284c7" stroke-width="4"/>
        <line x1="0" y1="-90" x2="0" y2="12" stroke="#bae6fd" stroke-width="3"/>
        <!-- Navy Fleece Vest Overlay -->
        <path d="M -34 -90 L -12 -90 L -8 12 L -38 12 Z" fill="#1e293b" stroke="#0f172a" stroke-width="4"/>
        <path d="M 34 -90 L 12 -90 L 8 12 L 38 12 Z" fill="#1e293b" stroke="#0f172a" stroke-width="4"/>
        <!-- Zipper Track -->
        <line x1="0" y1="-75" x2="0" y2="12" stroke="#94a3b8" stroke-width="3" stroke-dasharray="4 2"/>
        <!-- Patagonia-style Logo Patch -->
        <rect x="-28" y="-60" width="12" height="6" rx="1" fill="#f97316"/>
      `;
        // 6. Athletic Bodybuilder Gym Tank Top
        case "bodybuilder_tank":
            return `
        <!-- Stringer Gym Tank Top -->
        <path d="M -24 -90 L 24 -90 L 36 10 L -36 10 Z" fill="#dc2626" stroke="#991b1b" stroke-width="5"/>
        <!-- Deep Shoulder Cutouts -->
        <path d="M -24 -90 Q -8 -45 -34 -30" fill="none" stroke="#dc2626" stroke-width="3"/>
        <path d="M 24 -90 Q 8 -45 34 -30" fill="none" stroke="#dc2626" stroke-width="3"/>
        <!-- Gym Logo -->
        <circle cx="0" cy="-40" r="12" fill="#991b1b"/>
        <text x="0" y="-35" font-family="'Impact', sans-serif" font-size="12" fill="#ffffff" text-anchor="middle">IRON</text>
      `;
        // 7. Work Janitor Overalls (Khaki/Slate Worker Jumpsuit)
        case "janitor_overalls":
            return `
        <!-- Janitor Overalls Base -->
        <path d="M -34 -90 L 34 -90 L 38 12 L -38 12 Z" fill="#78716c" stroke="#1c1917" stroke-width="5"/>
        <!-- Inner Work T-Shirt under straps -->
        <path d="M -20 -90 L 20 -90 L 20 -50 L -20 -50 Z" fill="#44403c"/>
        <!-- Heavy Cotton Overalls Straps -->
        <line x1="-22" y1="-90" x2="-18" y2="-10" stroke="#57534e" stroke-width="9"/>
        <line x1="22" y1="-90" x2="18" y2="-10" stroke="#57534e" stroke-width="9"/>
        <!-- Matte Silver Utility Clasps -->
        <rect x="-24" y="-35" width="12" height="10" rx="2" fill="#94a3b8" stroke="#475569" stroke-width="2"/>
        <rect x="12" y="-35" width="12" height="10" rx="2" fill="#94a3b8" stroke="#475569" stroke-width="2"/>
        <!-- Utility Chest Pouch -->
        <path d="M -16 -12 L 16 -12 L 14 12 L -14 12 Z" fill="#57534e" stroke="#292524" stroke-width="3"/>
        <line x1="-8" y1="-2" x2="8" y2="-2" stroke="#a8a29e" stroke-width="2"/>
      `;
        // 8. Victorian Mourning Corseted Dress
        case "victorian_mourning":
            return `
        <!-- High-Neck Victorian Mourning Dress -->
        <path d="M -32 -90 L 32 -90 L 22 -30 L 38 15 L 55 130 C 15 145 -15 145 -55 130 L -38 15 L -22 -30 Z"
              fill="#18181b" stroke="#09090b" stroke-width="5" stroke-linejoin="round"/>
        <!-- Victorian Corset Lace Lines -->
        <path d="M -12 -60 L 12 -50 M 12 -50 L -12 -40 M -12 -40 L 12 -30 M 12 -30 L -12 -20" stroke="#71717a" stroke-width="2"/>
        <rect x="-14" y="-92" width="28" height="8" rx="2" fill="#ffffff" opacity="0.9"/>
      `;
        // 8. TikTok Courtroom Judge Robes
        case "judge_robes":
            return `
        <!-- Heavy Black Judge Robes -->
        <path d="M -40 -90 L 40 -90 L 48 130 C 15 145 -15 145 -48 130 Z" fill="#09090b" stroke="#000000" stroke-width="6"/>
        <!-- White Judicial Collar Bib -->
        <polygon points="-16,-90 16,-90 20,-50 0,-40 -20,-50" fill="#ffffff" stroke="#cbd5e1" stroke-width="3"/>
        <line x1="0" y1="-40" x2="0" y2="120" stroke="#27272a" stroke-width="4"/>
      `;
        // 9. Sharp Formal Suit & Tie
        case "suit":
            return `
        <!-- White Dress Shirt Base -->
        <polygon points="-32,-90 32,-90 36,12 -36,12" fill="#ffffff" stroke="#0f172a" stroke-width="4"/>
        <!-- Red Silk Tie -->
        <polygon points="-6,-90 6,-90 8,-20 0,0 -8,-20" fill="#dc2626" stroke="#991b1b" stroke-width="2"/>
        <!-- Tuxedo Suit Jacket Lapels -->
        <path d="M -36 -90 L -10 -90 L -4 12 L -38 12 Z" fill="#0f172a" stroke="#020617" stroke-width="4"/>
        <path d="M 36 -90 L 10 -90 L 4 12 L 38 12 Z" fill="#0f172a" stroke="#020617" stroke-width="4"/>
      `;
        // 10. Streetwear Hoodie
        case "hoodie":
            return `
        <path d="M -36 -90 L 36 -90 L 40 12 L -40 12 Z" fill="#334155" stroke="#0f172a" stroke-width="5"/>
        <!-- Kangaroo Pocket -->
        <path d="M -24 -25 L 24 -25 L 28 8 L -28 8 Z" fill="#1e293b" stroke="#0f172a" stroke-width="3"/>
        <!-- Drawstrings -->
        <line x1="-12" y1="-85" x2="-12" y2="-45" stroke="#cbd5e1" stroke-width="3" stroke-linecap="round"/>
        <line x1="12" y1="-85" x2="12" y2="-45" stroke="#cbd5e1" stroke-width="3" stroke-linecap="round"/>
      `;
        // 11. Hospital Patient Gown
        case "patient_gown":
            return `
        <path d="M -34 -88 L 34 -88 L 42 70 C 15 80 -15 80 -42 70 Z" fill="#bae6fd" stroke="#0284c7" stroke-width="4"/>
        <circle cx="-15" cy="-50" r="3" fill="#38bdf8"/>
        <circle cx="15" cy="-30" r="3" fill="#38bdf8"/>
        <circle cx="-10" cy="-10" r="3" fill="#38bdf8"/>
        <circle cx="12" cy="20" r="3" fill="#38bdf8"/>
      `;
        // 12. Casual T-Shirt
        case "tshirt":
            return `
        <path d="M -34 -90 L 34 -90 L 38 10 L -38 10 Z" fill="#1e293b" stroke="#0f172a" stroke-width="5"/>
        <path d="M -18 -90 Q 0 -72 18 -90" fill="none" stroke="#64748b" stroke-width="3"/>
      `;
        case "none":
        default:
            return "";
    }
}

// Hand-Drawn Comic Gags & Visual Markups (Casually Explained / Alex Meyers Style)
// Provides procedural sketched arrows, hand-drawn circling, thought bubbles, and comic overlays
/**
 * Animated hand-drawn sketchy red arrow pointing at a comical detail
 */
export function renderHandDrawnArrow(from, to, timeSec, label) {
    const dx = to.x - from.x;
    const dy = to.y - from.y;
    const angle = Math.atan2(dy, dx);
    // Sketchy wobble
    const wobble1 = Math.sin(timeSec * 16) * 3;
    const wobble2 = Math.cos(timeSec * 14) * 3;
    const midX = from.x + dx * 0.5 + Math.sin(angle + Math.PI / 2) * (15 + wobble1);
    const midY = from.y + dy * 0.5 + Math.cos(angle + Math.PI / 2) * (15 + wobble2);
    // Arrowhead wings
    const headLen = 28;
    const headAngle = 0.45; // ~25 deg
    const h1x = to.x - Math.cos(angle - headAngle) * headLen;
    const h1y = to.y - Math.sin(angle - headAngle) * headLen;
    const h2x = to.x - Math.cos(angle + headAngle) * headLen;
    const h2y = to.y - Math.sin(angle + headAngle) * headLen;
    return `
    <g class="comic-arrow" stroke="#ef4444" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" fill="none" opacity="0.95">
      <!-- Curved sketchy arrow shaft -->
      <path d="M ${from.x} ${from.y} Q ${midX} ${midY} ${to.x} ${to.y}" />
      <!-- Sketchy arrowhead -->
      <path d="M ${h1x} ${h1y} L ${to.x} ${to.y} L ${h2x} ${h2y}" />
      ${label ? `
        <text x="${midX}" y="${midY - 18}" font-family="'Patrick Hand', 'Comic Sans MS', cursive, sans-serif" font-size="24" font-weight="bold" fill="#dc2626" stroke="none" text-anchor="middle">
          ${label}
        </text>
      ` : ""}
    </g>
  `;
}
/**
 * Animated hand-drawn red circle highlighting an absurd detail
 */
export function renderHandDrawnCircle(center, rx, ry, timeSec, label) {
    const wobble = Math.sin(timeSec * 18) * 2.5;
    const rxW = rx + wobble;
    const ryW = ry - wobble;
    // Imperfect overlapping sketch loop
    const p1 = `M ${center.x - rxW} ${center.y} C ${center.x - rxW} ${center.y - ryW * 1.1}, ${center.x + rxW * 1.05} ${center.y - ryW * 0.95}, ${center.x + rxW} ${center.y}`;
    const p2 = `C ${center.x + rxW * 0.95} ${center.y + ryW * 1.05}, ${center.x - rxW * 1.1} ${center.y + ryW * 0.95}, ${center.x - rxW + 6} ${center.y - 8}`;
    return `
    <g class="comic-circle" opacity="0.95">
      <path d="${p1} ${p2}" fill="none" stroke="#ef4444" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round" />
      ${label ? `
        <text x="${center.x}" y="${center.y - ry - 14}" font-family="'Patrick Hand', 'Comic Sans MS', cursive, sans-serif" font-size="22" font-weight="bold" fill="#dc2626" text-anchor="middle">
          ${label}
        </text>
      ` : ""}
    </g>
  `;
}
/**
 * Comic speed lines / action impact bursts
 */
export function renderActionLines(center, radius, timeSec) {
    const lines = [];
    const numLines = 14;
    const pulse = Math.sin(timeSec * 22) * 15;
    for (let i = 0; i < numLines; i++) {
        const ang = (i / numLines) * Math.PI * 2;
        const r1 = radius + 30 + (i % 2 === 0 ? 20 : 0) + pulse;
        const r2 = r1 + 60 + (i % 3 === 0 ? 30 : 0);
        const x1 = center.x + Math.cos(ang) * r1;
        const y1 = center.y + Math.sin(ang) * r1;
        const x2 = center.x + Math.cos(ang) * r2;
        const y2 = center.y + Math.sin(ang) * r2;
        lines.push(`<line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" stroke="#0f172a" stroke-width="${3 + (i % 3)}" stroke-linecap="round" opacity="0.65"/>`);
    }
    return `<g class="action-lines">${lines.join("\n")}</g>`;
}
/**
 * Sketchy hand-drawn thought or speech bubble
 */
export function renderThoughtBubble(speaker, bubbleCenter, width, height, contentSvg, timeSec) {
    const wobble = Math.sin(timeSec * 8) * 3;
    const w = width + wobble;
    const h = height - wobble;
    const bx = bubbleCenter.x;
    const by = bubbleCenter.y;
    return `
    <g class="thought-bubble" filter="url(#cardShadow)">
      <!-- Connector little cloud circles -->
      <circle cx="${speaker.x + (bx - speaker.x) * 0.3}" cy="${speaker.y + (by - speaker.y) * 0.3}" r="8" fill="#ffffff" stroke="#0f172a" stroke-width="3"/>
      <circle cx="${speaker.x + (bx - speaker.x) * 0.6}" cy="${speaker.y + (by - speaker.y) * 0.6}" r="14" fill="#ffffff" stroke="#0f172a" stroke-width="3.5"/>
      <circle cx="${speaker.x + (bx - speaker.x) * 0.85}" cy="${speaker.y + (by - speaker.y) * 0.85}" r="20" fill="#ffffff" stroke="#0f172a" stroke-width="4"/>

      <!-- Main Cloud Body -->
      <rect x="${bx - w / 2}" y="${by - h / 2}" width="${w}" height="${h}" rx="28" fill="#ffffff" stroke="#0f172a" stroke-width="5"/>
      
      <!-- Content Inside Bubble -->
      <g transform="translate(${bx}, ${by})">
        ${contentSvg}
      </g>
    </g>
  `;
}

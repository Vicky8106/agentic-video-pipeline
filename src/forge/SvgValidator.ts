export interface ValidationReport {
  valid: boolean;
  sanitizedSvg: string;
  errors: string[];
  warnings: string[];
}

export function validateAndSanitizeSvg(rawSvg: string): ValidationReport {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (!rawSvg || typeof rawSvg !== "string") {
    return { valid: false, sanitizedSvg: "", errors: ["SVG input is empty or non-string"], warnings: [] };
  }

  // 1. Security sanitization: strip script tags, iframe, object, foreignObject, event handlers
  let sanitized = rawSvg
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
    .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, "")
    .replace(/<object\b[^<]*(?:(?!<\/object>)<[^<]*)*<\/object>/gi, "")
    .replace(/<foreignObject\b[^<]*(?:(?!<\/foreignObject>)<[^<]*)*<\/foreignObject>/gi, "")
    .replace(/on\w+\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+)/gi, "")
    .replace(/href\s*=\s*(?:"javascript:[^"]*"|'javascript:[^']*')/gi, "");

  // 2. Check for graphic elements
  const hasGraphicElements = /<(?:path|rect|circle|ellipse|line|polyline|polygon|g)\b/i.test(sanitized);
  if (!hasGraphicElements) {
    errors.push("SVG contains no graphical primitive elements (path, rect, circle, etc.)");
  }

  // 3. Basic tag balancing check
  const openTags = (sanitized.match(/<[a-zA-Z][a-zA-Z0-9-]*\b[^>]*[^\/]>/g) || []).length;
  const closeTags = (sanitized.match(/<\/[a-zA-Z][a-zA-Z0-9-]*>/g) || []).length;
  const selfClosing = (sanitized.match(/<[a-zA-Z][a-zA-Z0-9-]*\b[^>]*\/>/g) || []).length;

  if (Math.abs(openTags - closeTags) > 5) {
    warnings.push(`Possible XML tag mismatch: ${openTags} opening vs ${closeTags} closing`);
  }

  // 4. Stroke width audit (ensure stroke tokens match 2D cartoon grammar)
  if (!sanitized.includes("stroke-width")) {
    warnings.push("SVG has no explicit stroke-width attributes");
  }

  return {
    valid: errors.length === 0,
    sanitizedSvg: sanitized.trim(),
    errors,
    warnings,
  };
}

/**
 * ImpactTypography — the punchline word slam.
 *
 * When a beat's punch word lands, the word SLAMS onto screen with spring-
 * scale + rotation and a paper-white card, exactly as the word is spoken.
 * This is the "LUNCH!" beat: the audio punch + visual punch land together.
 *
 * Pure function of (text, t, punchAt): deterministic for chunked render.
 */
const clamp = (v: number, a = 0, b = 1) => Math.max(a, Math.min(b, v));

/** Spring ease with overshoot, for the slam-in. */
function outBack(t: number, s = 1.9): number {
  const c = s + 1;
  return 1 + c * Math.pow(t - 1, 3) + s * Math.pow(t - 1, 2);
}

/** Words that get the full slam treatment. */
export function isPunchWord(word: string): boolean {
  const w = word.toUpperCase().replace(/[^A-Z0-9$%!]/g, "");
  if (w.length < 2 || w.length > 14) return false;
  if (/^(THE|AND|BUT|WAS|HIS|HER|YOU|YOUR|THEY|WITH|THIS|THAT|JUST|LIKE|REALLY|ACTUALLY|LITERALLY|BASICALLY|MEANWHILE|OBVIOUSLY|APPARENTLY|TECHNICALLY|SUDDENLY|SOMEHOW|IMAGINE|STARTED|BECAUSE|ABOUT|WOULD|COULD|SHOULD|THERE|EVERY|SINGLE|SECOND|MINUTE|MOMENT|THING|THINGS|PEOPLE|PERSON|LOOKS|LOOKED|LOOKING|MAKES|MADE|TAKE|TAKES|GOING|GETTING|GIVEN|GONNA|WANNA|SORT|KIND|BEING|DOING|SAID|SAYS|KNOW|THINK|EVEN|ALSO|STILL|YET|WAY|LOT|BIT|NOW|THEN|ONCE|NEXT|FIRST|SECOND|AFTER|BEFORE|WHILE|WHERE|WHICH|WHEN|WHAT|WHY|HOW|HERE|COME|COMES|CAME|FROM|INTO|ONLY|MOST|MORE|LESS|VERY|MUCH|OVER|UNDER|AGAIN|ANOTHER|AROUND|THROUGH|THOSE|THESE|THAT'S|IT'S|DON'T|DOESN'T|ISN'T|WASN'T|WEREN'T|HAVEN'T|HAS BEEN|HAVE BEEN|TO|OF|IN|ON|AT|BY|AS|IS|ARE|BE|HE|SHE|IT|WE|US|AN|OR|IF|SO|NO|NOT|ALL|ONE|TWO|OUT|UP|DOWN|OFF|PER|VIA|OWN|SAME|WELL|BACK|AWAY|LEFT|RIGHT|THAN|SOME|ANY|FEW|MAY|MIGHT|US|GET|GOT|HAD|HAS|DO|DOES|DID|DONE|SEE|SAW|USE|USED|USING|WANT|WANTS|WANTED|NEED|NEEDS|LET|LETS|PUT|PUTS|KEEP|KEEPS|STAY|STAYS|TURN|TURNS|CALL|CALLS|CALLED|FIND|FINDS|FOUND|TOLD|TELL|TELLS|ASK|ASKS|ASKED|WORK|WORKS|WORKED|LIVE|LIVES|LIVED|DIE|DIES|DIED|GIVE|GIVES|GAVE|HELP|HELPS|HELPED|FEEL|FEELS|FELT|SEEM|SEEMS|SEEMED)$/.test(w)) return false;
  return true;
}

/**
 * Pick THE word to slam for a sentence: prefer !-adjacent punch keywords,
 * else the most "punchy" token (short, capitalized, number, or stressed).
 */
export function pickPunchWord(sentenceText: string): { word: string; reason: string } | null {
  const tokens = sentenceText.split(/\s+/).map(s => s.replace(/[",();:]/g, "")).filter(Boolean);
  if (!tokens.length) return null;
  // 1) Explicit exclamations win.
  const excl = [...tokens].reverse().find(t => t.endsWith("!"));
  if (excl) return { word: excl.replace(/[.!]/g, ""), reason: "exclamation" };
  // 2) Numbers are punchy ("$1,000").
  const num = tokens.find(t => /^\$?\d[\d,.]*%?$/.test(t));
  if (num) return { word: num, reason: "number" };
  // 3) Power-comedy nouns/verbs near the end of the sentence.
  const POWER = ["lunch", "carbs", "money", "poor", "rich", "insane", "disaster", "husband", "wife", "boyfriend", "girlfriend", "ozempic", "skit", "photoshop", "surgery", "jaw", "cheek", "husbands", "diamonds", "divorce", "funeral", "crypt", "wedding", "chapel", "pizza", "bread", "diabetes", "gym", "muscle", "shredded", "dead", "death", "killed", "murder", "prison", "court", "judge", "trial", "lawsuit", "billion", "million", "thousand", "empire", "collapse", "crash", "burn", "fired", "boss", "quit", "resigned", "scandal", "secret", "truth", "lie", "lies", "caught", "exposed", "canceled", "cancelled", "banned", "illegal", "crime", "criminal", "police", "cop", "arrested", "charged", "guilty", "innocent", "verdict", "sentence", "punishment", "revenge", "betrayal", "betrayed", "cheated", "cheating", "affair", "lover", "secretly", "truth", "confession", "admitted", "denied", "deny", "lied"];
  for (let i = tokens.length - 1; i >= 0; i--) {
    const t = tokens[i].toLowerCase().replace(/[^a-z]/g, "");
    if (POWER.includes(t)) return { word: tokens[i].replace(/[.]$/, ""), reason: "power-word" };
  }
  // 4) Fallback: last meaningful word.
  for (let i = tokens.length - 1; i >= 0; i--) {
    if (isPunchWord(tokens[i])) return { word: tokens[i].replace(/[.,!?]$/, ""), reason: "last-punch" };
  }
  return null;
}

export interface ImpactWordState {
  word: string;
  x: number; y: number;        // world coords for the slam center
  scale: number;               // animated 0 -> 1 (spring)
  rotation: number;            // decaying wobble
  opacity: number;
  color: string;
  accentBar: boolean;
}

/**
 * State of the impact word at time t. punchAt = when the word is spoken.
 * Timeline: silent -> SLAM (0-0.14s, spring in, rotate) -> hold w/ decay
 * wobble (0.14-1.1s) -> fade (last 0.25s).
 */
export function impactWordState(word: string, t: number, punchAt: number, energy = 0.5, beatIndex = 0): ImpactWordState | null {
  if (!word) return null;
  const dt = t - punchAt;
  if (dt < -0.05) return null;
  const inDur = 0.14;
  // Spring slam-in with overshoot
  const p = clamp(dt / inDur);
  const spring = p >= 1 ? 1 : outBack(p, 1.9);
  // Wobble decay after landing
  const wobble = dt > inDur ? Math.exp(-(dt - inDur) * 2.2) * Math.sin((dt - inDur) * 16) : 0;
  // Fade out after ~1.2s or when the next beat arrives
  const holdEnd = 1.05 + energy * 0.4;
  const fade = dt > holdEnd ? clamp(1 - (dt - holdEnd) / 0.3) : 1;
  if (fade <= 0) return null;
  // Position rotates across three slots so the composition doesn't repeat
  const slot = Math.abs(Math.floor(beatIndex)) % 3;
  const y = slot === 0 ? 250 : slot === 1 ? 205 : 295;
  const x = slot === 1 ? 860 : 960;
  return {
    word,
    x, y,
    scale: spring,
    rotation: wobble * 5 + (hash(word) - 0.5) * 6,
    opacity: fade,
    color: "#111827",
    accentBar: true,
  };
}

function hash(s: string) { let h = 0; for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) & 0xffff; return (h % 1000) / 1000; }

/** Render the impact word card as SVG (world-space, above the actors). */
export function renderImpactWord(state: ImpactWordState | null): string {
  if (!state || state.opacity <= 0 || state.scale <= 0.01) return "";
  const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const fs = 86;
  const w = Math.max(140, esc(state.word).length * fs * 0.62 + 60);
  const s = state.scale;
  // Pop: overshoot scale + settle rotation
  const g = `<g transform="translate(${state.x} ${state.y}) rotate(${state.rotation}) scale(${s})" opacity="${state.opacity.toFixed(3)}">
    <rect x="${-w / 2}" y="-72" width="${w}" height="144" rx="18" fill="#ffffff" stroke="#111827" stroke-width="7" filter="url(#impactShadow)"/>
    <text y="32" text-anchor="middle" font-family="'Impact', 'Noto Sans', Arial, sans-serif" font-size="${fs}" fill="${state.color}">${esc(state.word.toUpperCase())}</text>
    <rect x="${-w / 2 + 14}" y="52" width="${w - 28}" height="10" rx="5" fill="#dc2626"/>
  </g>`;
  return g;
}

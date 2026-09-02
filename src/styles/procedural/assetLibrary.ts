/**
 * Procedural vector asset library — the anti-slideshow core.
 *
 * Provides a rich, broadcast-quality procedural cartoon vector generator for ANY concept
 * and SRT script, integrated with high-end handcrafted cartoon puppets and slapstick rigs.
 *
 * Deterministic: pure function of (concept, kind, state). Same input, same SVG.
 */

import {
  renderJennaOrtega,
  renderEmmaStone,
  renderArianaGrande,
  renderKateMoss,
  renderTechBro,
  renderPixarMom,
  renderFlyingCarbs,
  renderMegaStamp,
  renderBossShadow,
  renderSeductiveBread,
  renderMaryPoppinsWind,
  renderCouchPennyHunter,
  renderFirehoseWater,
  renderSupermarketHam,
  renderPumpkinSurgeon,
  renderVictorianMourner,
  renderWednesdayDance,
  renderZapruderProjector,
  renderFrozenForeheadDivorce,
  renderGoldWheelbarrow,
  renderTuxedoButler,
  renderEvictedOrgans,
} from "../../character/CartoonCast";

import { renderStickFigure } from "../../character/StickFigure";

import {
  renderShiveringStomachPuppet,
  renderSciFiPharmaDoctor,
  renderWednesdayThingPerformance,
  renderMCUSuperheroPuppet,
  renderCrazedSurgeonScoop,
  renderBillionaireGoldElevator,
} from "../../character/CartoonComedyPuppets";

import {
  renderNintendoGLP1Cartridge,
  renderChainedStomachPadlock,
  renderSaltineCrackerPlatter,
  renderSeveredHungerWire,
  renderSeductiveBaguette,
  renderHurricaneWindMachine,
  renderCouchForagingLoot,
  renderDiscoveredHydration,
  renderSwissCheeseSkull,
  renderUnseasonedChickenBroccoli,
  renderAlarmClockTRT,
  renderBuccalBossFightBanner,
  renderLithiumBatteryPack,
  renderYouAreNotLazyCard,
} from "../../character/CartoonCastSubScenes";

import {
  renderSliderHUD,
  renderPromptTerminal,
  renderMiamiBoardingPass,
  renderPharmaRevenueBadge,
  renderFinePrintAsterisk,
  renderWindSpeedBadge,
  renderCouchLootBadge,
  renderDeliSlicerBadge,
  renderZapruderBadge,
  renderCurvyAlertSiren,
  renderRPGSlidersHUD,
  renderYouTubeSubscribeBadge,
  renderCarbsHopePoster,
} from "../../character/CartoonCastExtended";

import {
  renderCaliperRig,
  renderSaaSModalRig,
  renderKeycapSlamRig,
  renderWheelbarrowRig,
} from "../../character/PropRigs";

const clamp = (v: number, a = 0, b = 1) => Math.max(a, Math.min(b, v));
const smooth = (t: number) => t * t * (3 - 2 * t);
const esc = (s: unknown) => String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export interface AssetState {
  x: number;
  y: number;
  scale: number;
  entry: number; // 0..1 pop-in
  exit: number; // 0..1 fade-out
  age: number; // seconds since spawn
  energy: number; // 0..1
  concept: string;
  kind: string;
  slot: number; // stage slot index, used to vary labels between siblings
}

const INK = "#111827";
const PAPER = "#ffffff";
const SKIN = "#fcd9a0";
const ACCENT = "#e0533d"; // single warm accent, used sparingly
const COOL = "#3b82c4";
const GOLD = "#fbbf24";
const GREEN = "#22c55e";
const PURPLE = "#a855f7";

/** Overshoot pop: scale 0 -> 1.12 -> 1.0 with a squash on the y axis. */
function popTransform(entry: number, exit: number, t: number): string {
  const e = smooth(clamp(entry));
  const over = e < 1 ? 1 + 0.18 * Math.sin(Math.PI * e) * (1 - e) : 1;
  const settle = 1 + 0.02 * Math.sin(t * 3.1); // micro-breath even when "idle"
  const s = over * settle * (1 - exit * 0.35);
  const sy = s * (1 + 0.06 * Math.sin(t * 2.4) * (1 - exit));
  return `scale(${s.toFixed(4)} ${sy.toFixed(4)})`;
}

function labelTag(text: string, y: number): string {
  const w = Math.max(70, text.length * 14 + 30);
  return `<g transform="translate(0 ${y})">
    <rect x="${-w / 2}" y="-20" width="${w}" height="38" rx="10" fill="${PAPER}" stroke="${INK}" stroke-width="4"/>
    <text y="7" text-anchor="middle" font-family="'Impact', 'Comic Sans MS', sans-serif" font-size="20" font-weight="bold" fill="${INK}">${esc(text.toUpperCase())}</text>
  </g>`;
}

/* =========================================================================
   SPECIALIZED PUPPET ROUTERS
   ========================================================================= */

function tryHandcraftedPuppet(s: AssetState): string | null {
  const c = s.concept.toLowerCase();
  const t = s.age;

  // 1. Celebrities & Characters
  if (/jenna|ortega|wednesday/i.test(c)) {
    return renderJennaOrtega({ x: 0, y: -60, scale: 1.35, timeSec: t, expression: "deadpan" });
  }
  if (/emma|stone/i.test(c)) {
    return renderEmmaStone({ x: 0, y: -60, scale: 1.35, timeSec: t, expression: "smug" });
  }
  if (/ariana|grande/i.test(c)) {
    return renderArianaGrande({ x: 0, y: -60, scale: 1.35, timeSec: t, expression: "neutral" });
  }
  if (/tim|burton|gothic|dark/i.test(c)) {
    return renderStickFigure("puppet-tim-burton", { x: 0, y: -60, scale: 1.35, costume: "tim_burton", eyeStyle: "tim_burton", expression: "deadpan_classic", timeSec: t });
  }
  if (/kate|moss|runway|supermodel|heroin|y2k|fashion|low-rise|jeans|skirt|belt|miu/i.test(c)) {
    return renderKateMoss({ x: 0, y: -60, scale: 1.35, timeSec: t, expression: "smug" });
  }
  if (/organ|organs|evicted|internal/i.test(c)) {
    return renderEvictedOrgans(0, -60, t);
  }
  if (/pixar|mom|bbl|gravitational|butt|curve/i.test(c)) {
    return renderPixarMom({ x: 0, y: -60, scale: 1.3, timeSec: t, expression: "neutral" });
  }
  if (/tech|bro|crypto|bitcoin|ai|silicon|startup/i.test(c)) {
    return renderTechBro({ x: 0, y: -60, scale: 1.35, timeSec: t, expression: "smug" });
  }
  if (/marvel|superhero|shredded|dehydrated|dehydration/i.test(c)) {
    return renderMCUSuperheroPuppet(0, -60, t);
  }
  if (/doctor|pharma|physician|white\s*coat|concierge/i.test(c)) {
    return renderSciFiPharmaDoctor(0, -60, t);
  }
  if (/surgeon|buccal|scoop|scalpel|operation/i.test(c)) {
    return renderCrazedSurgeonScoop(0, -60, t);
  }
  if (/butler|tuxedo|luxury|concierge/i.test(c)) {
    return renderTuxedoButler(0, -60, t);
  }
  if (/boss|manager|cubicle|supervisor/i.test(c)) {
    return renderBossShadow(0, -60, t);
  }
  if (/mourner|victorian|funeral|crying/i.test(c)) {
    return renderVictorianMourner(0, -60, t);
  }
  if (/dad|father|parent/i.test(c)) {
    return renderStickFigure("puppet-dad", { x: 0, y: 110, scale: 1.15, expression: "confused_chin_scratch", timeSec: t });
  }
  if (/podcast|friend/i.test(c)) {
    return renderStickFigure("puppet-podcast", { x: 0, y: 110, scale: 1.15, rightHandProp: "coffee_cup", expression: "smug_glasses_push", timeSec: t });
  }
  if (/thing|hand|dancing/i.test(c)) {
    return renderWednesdayThingPerformance(0, -60, t);
  }

  // 2. Physical Comedy Slapstick Props
  if (/stomach|hunger|gut|digestion/i.test(c)) {
    return renderShiveringStomachPuppet(0, -60, t);
  }
  if (/baguette|croissant|french\s*bread/i.test(c)) {
    return renderSeductiveBaguette(0, -60, t);
  }
  if (/cracker|saltine|snack/i.test(c)) {
    return renderSaltineCrackerPlatter(0, -60, t);
  }
  if (/cartridge|nintendo|glp-?1|glp1/i.test(c)) {
    return renderNintendoGLP1Cartridge(0, -60, t);
  }
  if (/wire|spark|brain\s*noise|hunger\s*wire/i.test(c)) {
    return renderSeveredHungerWire(0, -60, t);
  }
  if (/battery|lithium|charge|recharge/i.test(c)) {
    return renderLithiumBatteryPack(0, -60, t);
  }
  if (/wind|hurricane|storm|umbrella|blow/i.test(c)) {
    return renderHurricaneWindMachine(0, -60, t);
  }
  if (/mary\s*poppins|flying\s*umbrella/i.test(c)) {
    return renderMaryPoppinsWind(0, -60, t);
  }
  if (/couch|penny|coin|foraging|cushion/i.test(c)) {
    return renderCouchForagingLoot(0, -60, t);
  }
  if (/hydration|jug|water|gallon/i.test(c)) {
    return renderDiscoveredHydration(0, -60, t);
  }
  if (/skull|swiss\s*cheese|hollow/i.test(c)) {
    return renderSwissCheeseSkull(0, -60, t);
  }
  if (/chicken|broccoli|meal\s*prep|unseasoned/i.test(c)) {
    return renderUnseasonedChickenBroccoli(0, -60, t);
  }
  if (/alarm|clock|trt|testosterone|morning/i.test(c)) {
    return renderAlarmClockTRT(0, -60, t);
  }
  if (/boss\s*fight|banner|buccal\s*boss/i.test(c)) {
    return renderBuccalBossFightBanner(0, -60, t);
  }
  if (/wheelbarrow|gold|billionaire|elevator/i.test(c)) {
    return renderBillionaireGoldElevator(0, -60, t);
  }
  if (/zapruder|projector|film|forensic/i.test(c)) {
    return renderZapruderProjector(0, -60, t);
  }
  if (/divorce|frozen\s*forehead|botox\s*freeze/i.test(c)) {
    return renderFrozenForeheadDivorce(0, -60, t);
  }
  if (/firehose|water\s*blast/i.test(c)) {
    return renderFirehoseWater(0, -60, t);
  }
  if (/supermarket|ham|deli/i.test(c)) {
    return renderSupermarketHam(0, -60, t);
  }
  if (/pumpkin|hollow\s*face/i.test(c)) {
    return renderPumpkinSurgeon(0, -60, t);
  }

  // 3. UI HUDs & Badges
  if (/rpg|character\s*creator|polygon|ps1/i.test(c)) {
    return renderRPGSlidersHUD(0, -60);
  }
  if (/slider|velocity|speedrun/i.test(c)) {
    return renderSliderHUD(0, -60, clamp(t / 2));
  }
  if (/terminal|code|prompt|chatgpt/i.test(c)) {
    return renderPromptTerminal(0, -60, t);
  }
  if (/miami|boarding\s*pass|flight/i.test(c)) {
    return renderMiamiBoardingPass(0, -60, t);
  }
  if (/revenue|pharma\s*bill|cost|pricing/i.test(c)) {
    return renderPharmaRevenueBadge(0, -60, t);
  }
  if (/asterisk|fine\s*print|terms/i.test(c)) {
    return renderFinePrintAsterisk(0, -60);
  }
  if (/deli|slicer|sharp/i.test(c)) {
    return renderDeliSlicerBadge(0, -60);
  }
  if (/siren|curvy|alert/i.test(c)) {
    return renderCurvyAlertSiren(0, -60, t);
  }
  if (/subscribe|youtube/i.test(c)) {
    return renderYouTubeSubscribeBadge(0, -60, t);
  }
  if (/hope|poster|obama/i.test(c)) {
    return renderCarbsHopePoster(0, -60, t);
  }
  if (/modal|saas|unsubscribe|cancel/i.test(c)) {
    return renderSaaSModalRig({ x: 0, y: -60, isCancelled: true, stampProgress: clamp(t / 1.5) });
  }
  if (/caliper|measure|cheekbone/i.test(c)) {
    return renderCaliperRig({ x: 0, y: -60, jawGap: 20 + Math.sin(t * 3) * 10, lcdValue: "0.02 mm", laserActive: true });
  }

  return null;
}

/* =========================================================================
   RICH PROCEDURAL GENERATORS (FOR ALL OTHER CONCEPTS)
   ========================================================================= */

/* ------------------------------------------------------------------ money */
function drawMoney(s: AssetState): string {
  const t = s.age;
  const n = 4 + Math.floor(s.energy * 3);
  let bills = "";
  for (let i = 0; i < n; i++) {
    const ph = i * 0.7;
    const fall = ((t * 45 + i * 50) % (n * 50));
    const y = -90 + fall * 0.65;
    const wob = Math.sin(t * 2.5 + ph) * 12;
    const rot = Math.sin(t * 1.8 + ph) * 14;
    bills += `<g transform="translate(${wob} ${y}) rotate(${rot})">
      <rect x="-60" y="-24" width="120" height="48" rx="6" fill="#bbf7d0" stroke="${INK}" stroke-width="4"/>
      <circle cx="0" cy="0" r="14" fill="none" stroke="${INK}" stroke-width="3.5"/>
      <text x="0" y="6" text-anchor="middle" font-family="'Impact', sans-serif" font-size="20" font-weight="bold" fill="${INK}">$100</text>
    </g>`;
  }
  // count-up total ticks the number while the beat is live
  const total = Math.floor(clamp(t / 1.0) * (500 + Math.floor(s.energy * 2500)));
  return `<g>${bills}${labelTag(`+$${total}`, 90)}</g>`;
}

/* ------------------------------------------------------------------- food */
function drawFood(s: AssetState): string {
  const t = s.age;
  const isBread = /bread|carb|loaf|flour/i.test(s.concept);
  const isPizza = /pizza/i.test(s.concept);
  const isCelery = /celery|salad|green|vegetable/i.test(s.concept);
  const isBurger = /burger|fast\s*food|mcdonald/i.test(s.concept);
  const wobble = Math.sin(t * 3.4) * 4;
  let body = "";

  if (isCelery) {
    body = `<g transform="rotate(${wobble})">
      <!-- Luxury Gold Platter -->
      <ellipse cx="0" cy="30" rx="90" ry="24" fill="${GOLD}" stroke="${INK}" stroke-width="4"/>
      <!-- Single Sad Celery Stick -->
      <path d="M -50 -10 Q 0 -25 60 10 L 55 22 Q 0 -12 -55 2 Z" fill="#86efac" stroke="${INK}" stroke-width="4"/>
      <path d="M 40 5 Q 65 -15 75 -5 Q 65 15 45 15 Z" fill="#4ade80" stroke="${INK}" stroke-width="3"/>
      ${labelTag("1.2 CALORIES", 80)}
    </g>`;
  } else if (isPizza) {
    body = `<g transform="rotate(${wobble})">
      <path d="M 0 -70 L 65 55 Q 0 75 -65 55 Z" fill="#fde047" stroke="${INK}" stroke-width="5"/>
      <path d="M -65 55 Q 0 75 65 55 L 68 64 Q 0 86 -68 64 Z" fill="#d97706" stroke="${INK}" stroke-width="4"/>
      <circle cx="-16" cy="14" r="10" fill="${ACCENT}" stroke="${INK}" stroke-width="3"/>
      <circle cx="18" cy="32" r="10" fill="${ACCENT}" stroke="${INK}" stroke-width="3"/>
      <circle cx="10" cy="-22" r="10" fill="${ACCENT}" stroke="${INK}" stroke-width="3"/>
    </g>`;
  } else if (isBurger) {
    body = `<g transform="rotate(${wobble})">
      <!-- Bun Top -->
      <path d="M -60 -10 Q 0 -65 60 -10 Z" fill="#f59e0b" stroke="${INK}" stroke-width="5"/>
      <ellipse cx="-20" cy="-30" rx="3" ry="2" fill="${PAPER}"/>
      <ellipse cx="15" cy="-35" rx="3" ry="2" fill="${PAPER}"/>
      <!-- Lettuce / Tomato / Patty -->
      <path d="M -65 -8 Q -45 5 -25 -8 Q 0 5 25 -8 Q 45 5 65 -8" fill="none" stroke="#22c55e" stroke-width="7"/>
      <rect x="-58" y="-4" width="116" height="12" rx="4" fill="#ef4444" stroke="${INK}" stroke-width="3"/>
      <rect x="-62" y="10" width="124" height="20" rx="6" fill="#78350f" stroke="${INK}" stroke-width="4"/>
      <!-- Bun Bottom -->
      <rect x="-58" y="32" width="116" height="18" rx="8" fill="#f59e0b" stroke="${INK}" stroke-width="4"/>
    </g>`;
  } else {
    // default: giant loaf of bread — the carb mascot
    body = `<g transform="rotate(${wobble})">
      <path d="M -70 20 Q -80 -35 -30 -50 Q 0 -65 30 -50 Q 80 -35 70 20 Q 70 45 45 45 L -45 45 Q -70 45 -70 20 Z"
        fill="#fde68a" stroke="${INK}" stroke-width="5"/>
      <path d="M -38 -30 Q -26 0 -38 35 M 0 -45 Q 12 0 0 42 M 38 -30 Q 50 0 38 35" fill="none" stroke="${INK}" stroke-width="3.5" opacity=".55"/>
    </g>`;
  }

  // The unsubscribe / cancel gag: a red X stamps on after 0.4s
  const stamp = clamp((t - 0.4) / 0.22);
  const x = stamp > 0
    ? `<g transform="scale(${(0.4 + 0.6 * smooth(stamp)).toFixed(3)}) rotate(${(1 - stamp) * -25})" opacity="${stamp.toFixed(2)}">
        <path d="M -75 -75 L 75 75 M 75 -75 L -75 75" stroke="${ACCENT}" stroke-width="18" stroke-linecap="round"/>
      </g>` : "";

  return `<g>${body}${x}${labelTag(isCelery ? "CELERY" : isPizza ? "PIZZA" : isBurger ? "FAST FOOD" : "CARBOHYDRATES", 86)}</g>`;
}

/* ----------------------------------------------------------------- device */
function drawDevice(s: AssetState): string {
  const t = s.age;
  const isLaptop = /laptop|computer|screen|monitor/i.test(s.concept);
  const buzz = Math.sin(t * 16) * (t % 2 < 0.4 ? 4 : 0); // notification buzz
  const dots = [0, 1, 2].map(i => {
    const on = t > 0.5 + i * 0.4;
    const pop = on ? smooth(clamp((t - 0.5 - i * 0.4) / 0.18)) : 0;
    return on ? `<circle cx="${42 + i * 20}" cy="${-75 - i * 8}" r="${(9 * pop).toFixed(1)}" fill="${ACCENT}" stroke="${INK}" stroke-width="2.5"/>` : "";
  }).join("");

  if (isLaptop) {
    return `<g transform="translate(${buzz} 0)">
      <rect x="-75" y="-60" width="150" height="95" rx="8" fill="${PAPER}" stroke="${INK}" stroke-width="5"/>
      <rect x="-62" y="-50" width="124" height="74" fill="#1e293b" stroke="${INK}" stroke-width="3"/>
      <!-- Terminal prompt lines -->
      <line x1="-50" y1="-32" x2="-10" y2="-32" stroke="#22c55e" stroke-width="4"/>
      <line x1="-50" y1="-18" x2="25" y2="-18" stroke="#38bdf8" stroke-width="3"/>
      <line x1="-50" y1="-4" x2="40" y2="-4" stroke="#fde047" stroke-width="3"/>
      <path d="M -90 35 L 90 35 L 75 56 L -75 56 Z" fill="${PAPER}" stroke="${INK}" stroke-width="5"/>
      ${dots}
      ${labelTag("AI STARTUP", 84)}
    </g>`;
  }

  // Smartphone with scrolling TikTok / Instagram UI
  const scrollY = (t * 60) % 80;
  return `<g transform="translate(${buzz} 0) rotate(${buzz * 0.8})">
    <rect x="-42" y="-80" width="84" height="160" rx="14" fill="${PAPER}" stroke="${INK}" stroke-width="5"/>
    <rect x="-34" y="-65" width="68" height="130" fill="#0f172a" stroke="${INK}" stroke-width="3"/>
    <!-- Feed items -->
    <g transform="translate(0 ${-scrollY})">
      <rect x="-28" y="-50" width="56" height="50" rx="4" fill="#ec4899"/>
      <rect x="-28" y="15" width="56" height="50" rx="4" fill="#3b82f6"/>
      <rect x="-28" y="80" width="56" height="50" rx="4" fill="#eab308"/>
    </g>
    <!-- Camera notch & home bar -->
    <rect x="-12" y="-74" width="24" height="5" rx="2.5" fill="${INK}"/>
    <line x1="-15" y1="56" x2="15" y2="56" stroke="${PAPER}" stroke-width="3" stroke-linecap="round"/>
    ${dots}
    ${labelTag("INSTAGRAM FEED", 102)}
  </g>`;
}

/* -------------------------------------------------------------------- pill */
function drawPill(s: AssetState): string {
  const t = s.age;
  const isPen = /ozempic|pen|inject|syringe|dose|glp|wegovy/i.test(s.concept);
  if (isPen) {
    const dripPhase = t % 1.4;
    const drip = dripPhase < 0.8 ? `<circle cx="0" cy="${(75 + dripPhase * 35).toFixed(1)}" r="${(5 - dripPhase * 2.5).toFixed(1)}" fill="${COOL}" opacity="${(1 - dripPhase / 0.8).toFixed(2)}"/>` : "";
    const shake = Math.sin(t * 12) * 2;
    return `<g transform="rotate(-20 ${shake} 0)">
      <rect x="-18" y="-80" width="36" height="105" rx="10" fill="${PAPER}" stroke="${INK}" stroke-width="5"/>
      <rect x="-18" y="-40" width="36" height="42" fill="#bae6fd" stroke="${INK}" stroke-width="4"/>
      <!-- Measurement ticks -->
      <line x1="-10" y1="-30" x2="-2" y2="-30" stroke="${INK}" stroke-width="2.5"/>
      <line x1="-10" y1="-20" x2="-2" y2="-20" stroke="${INK}" stroke-width="2.5"/>
      <line x1="-10" y1="-10" x2="-2" y2="-10" stroke="${INK}" stroke-width="2.5"/>
      <rect x="-10" y="-100" width="20" height="22" rx="4" fill="${INK}"/>
      <path d="M -8 25 L 8 25 L 3 50 L -3 50 Z" fill="${PAPER}" stroke="${INK}" stroke-width="3.5"/>
      <line x1="0" y1="50" x2="0" y2="75" stroke="${INK}" stroke-width="4.5"/>
      ${drip}
      ${labelTag("GLP-1 INJECTION", 108)}
    </g>`;
  }
  const spin = Math.sin(t * 2.2) * 16;
  return `<g transform="rotate(${spin})">
    <rect x="-55" y="-22" width="110" height="44" rx="22" fill="${PAPER}" stroke="${INK}" stroke-width="5"/>
    <line x1="0" y1="-22" x2="0" y2="22" stroke="${INK}" stroke-width="4.5"/>
    <rect x="0" y="-22" width="55" height="44" rx="22" fill="${ACCENT}" stroke="${INK}" stroke-width="5" opacity=".9"/>
    ${labelTag("MAGIC PILL", 60)}
  </g>`;
}

/* ------------------------------------------------------------------- chart */
function drawChart(s: AssetState): string {
  const t = s.age;
  const bars = [0, 1, 2, 3].map(i => {
    const grow = smooth(clamp((t - 0.2 - i * 0.25) / 0.5));
    const h = (18 + i * 26 + s.energy * 35) * grow;
    const jitter = Math.sin(t * 2.8 + i) * 2 * grow;
    return `<rect x="${-70 + i * 36}" y="${(55 - h + jitter).toFixed(1)}" width="26" height="${h.toFixed(1)}" fill="${i === 3 ? ACCENT : COOL}" stroke="${INK}" stroke-width="4" rx="4"/>`;
  }).join("");

  const arrow = t > 1.2 ? `<g opacity="${smooth(clamp((t - 1.2) / 0.3)).toFixed(2)}">
      <path d="M -75 -45 Q 0 ${-80 - s.energy * 25} 75 -65" fill="none" stroke="${INK}" stroke-width="6"/>
      <path d="M 75 -65 L 55 -72 M 75 -65 L 62 -48" stroke="${INK}" stroke-width="6" fill="none"/>
    </g>` : "";

  return `<g>
    <!-- Axis lines -->
    <line x1="-85" y1="60" x2="85" y2="60" stroke="${INK}" stroke-width="5"/>
    <line x1="-85" y1="60" x2="-85" y2="-85" stroke="${INK}" stroke-width="5"/>
    ${bars}${arrow}
    ${labelTag("HOLLYWOOD METRICS", 95)}
  </g>`;
}

/* ------------------------------------------------------------------ person */
function drawPerson(s: AssetState): string {
  const t = s.age;
  const c = s.concept.toLowerCase();
  let expr: any = "smug_rock_eyebrow";
  let costume: any = "none";
  let prop: any = "none";
  if (/gym|muscle|shredded|workout|fit/i.test(c)) {
    expr = "smug_thumbs_up";
  } else if (/doctor|pharma|medical/i.test(c)) {
    prop = "syringe";
    expr = "smug_glasses_push";
  } else if (/tech|crypto|ai/i.test(c)) {
    costume = "tech_bro";
    expr = "smug_chuckle";
  } else if (/celeb|star|actor|actress/i.test(c)) {
    expr = "sparkle_anime_eyes";
    prop = "mic";
  } else if (/money|rich|million/i.test(c)) {
    expr = "dollar_eyes_greed";
    prop = "money_bag";
  }

  const puppet = renderStickFigure(`stage-person-${s.slot}`, {
    x: 0,
    y: 110,
    scale: 1.15,
    expression: expr,
    costume,
    rightHandProp: prop,
    timeSec: t,
  });

  return `<g>${puppet}${labelTag(s.concept, -135)}</g>`;
}

/* -------------------------------------------------------------------- body */
function drawBody(s: AssetState): string {
  const t = s.age;
  // Morphing silhouette
  const p = smooth(clamp((t - 0.5) / 2.0));
  const w = 55 - p * 38;
  const pulse = Math.sin(t * 3.5) * 3;
  const tag = p > 0.5 ? "STICK FIGURE" : "THICC 2016";
  return `<g>
    <ellipse cx="0" cy="80" rx="55" ry="12" fill="${INK}" opacity="0.15"/>
    <path d="M ${-w - pulse} -60 Q ${-w - 15} 0 ${-w * 0.7} 55 L ${w * 0.7} 55 Q ${w + 15} 0 ${w + pulse} -60 Q 0 -80 ${-w - pulse} -60 Z"
      fill="${PAPER}" stroke="${INK}" stroke-width="5.5"/>
    <circle cx="0" cy="-75" r="18" fill="${SKIN}" stroke="${INK}" stroke-width="5"/>
    <path d="M ${-w * 0.6} -12 Q 0 ${6 + p * 14} ${w * 0.6} -12" fill="none" stroke="${ACCENT}" stroke-width="4" stroke-dasharray="8 6"/>
    <g opacity="${(p * 0.95).toFixed(2)}">
      <path d="M 75 -35 L 105 -35 M 105 -35 L 98 -45 M 105 -35 L 98 -25" stroke="${INK}" stroke-width="5" fill="none"/>
    </g>
    ${labelTag(tag, 102)}
  </g>`;
}

/* -------------------------------------------------------------------- sign */
function drawSign(s: AssetState): string {
  const t = s.age;
  const swing = Math.sin(t * 2.2) * 4;
  const word = s.concept.replace(/[^a-z0-9$%' -]/gi, "").slice(0, 16).toUpperCase() || "WARNING";
  const w = Math.max(130, word.length * 18 + 36);
  return `<g transform="rotate(${swing})">
    <ellipse cx="0" cy="90" rx="45" ry="10" fill="${INK}" opacity="0.15"/>
    <line x1="0" y1="20" x2="0" y2="85" stroke="${INK}" stroke-width="6"/>
    <rect x="${-w / 2}" y="-60" width="${w}" height="80" rx="8" fill="#fde047" stroke="${INK}" stroke-width="5.5"/>
    <text y="-5" text-anchor="middle" font-family="'Impact', sans-serif" font-size="28" font-weight="bold" fill="${INK}">${esc(word)}</text>
  </g>`;
}

/* ----------------------------------------------------------------- vehicle */
function drawVehicle(s: AssetState): string {
  const t = s.age;
  const c = s.concept.toLowerCase();
  const isRocket = /rocket|spaceship|space/i.test(c);
  const isPlane = /plane|airplane|flight/i.test(c);
  const isBike = /bike|bicycle|motorcycle/i.test(c);

  if (isRocket) {
    const flameFlicker = 18 + Math.sin(t * 30) * 8;
    const shudder = Math.sin(t * 40) * 2;
    return `<g transform="translate(${shudder} ${-t * 8})">
      <!-- Fire plume -->
      <polygon points="-16,40 16,40 0,${40 + flameFlicker}" fill="${GOLD}" stroke="${ACCENT}" stroke-width="3"/>
      <polygon points="-8,40 8,40 0,${40 + flameFlicker * 0.6}" fill="#ffffff"/>
      <!-- Rocket Body -->
      <path d="M 0 -70 Q 25 -30 25 35 L -25 35 Q -25 -30 0 -70 Z" fill="${PAPER}" stroke="${INK}" stroke-width="5"/>
      <!-- Fins -->
      <polygon points="-25,10 -48,42 -25,35" fill="${ACCENT}" stroke="${INK}" stroke-width="4"/>
      <polygon points="25,10 48,42 25,35" fill="${ACCENT}" stroke="${INK}" stroke-width="4"/>
      <!-- Porthole Window -->
      <circle cx="0" cy="-15" r="14" fill="#38bdf8" stroke="${INK}" stroke-width="4"/>
      ${labelTag("TO THE MOON", 90)}
    </g>`;
  }

  if (isPlane) {
    const bank = Math.sin(t * 2.5) * 6;
    return `<g transform="rotate(${bank})">
      <!-- Contrail -->
      <line x1="-120" y1="10" x2="-45" y2="10" stroke="#94a3b8" stroke-width="5" stroke-dasharray="12 8"/>
      <!-- Fuselage -->
      <ellipse cx="10" cy="0" rx="65" ry="20" fill="${PAPER}" stroke="${INK}" stroke-width="5"/>
      <!-- Wings -->
      <polygon points="-10,-5 25,-55 5,-5" fill="${COOL}" stroke="${INK}" stroke-width="4"/>
      <polygon points="-10,5 25,55 5,5" fill="${COOL}" stroke="${INK}" stroke-width="4"/>
      <!-- Tail fin -->
      <polygon points="-50,-10 -65,-38 -45,-10" fill="${ACCENT}" stroke="${INK}" stroke-width="4"/>
      ${labelTag(s.concept, 80)}
    </g>`;
  }

  // Cartoon Car
  const bounce = Math.abs(Math.sin(t * 12)) * 3;
  const wheelSpin = (t * 720) % 360;
  return `<g transform="translate(0 ${-bounce})">
    <!-- Speed Lines -->
    <line x1="-110" y1="-15" x2="-70" y2="-15" stroke="${INK}" stroke-width="4"/>
    <line x1="-130" y1="10" x2="-80" y2="10" stroke="${INK}" stroke-width="4"/>
    <!-- Car Body -->
    <path d="M -60 20 L -60 -5 Q -40 -35 0 -35 L 30 -35 Q 55 -35 65 0 L 70 20 Z" fill="${ACCENT}" stroke="${INK}" stroke-width="5"/>
    <!-- Windows -->
    <path d="M -20 -5 L -5 -25 L 20 -25 L 20 -5 Z" fill="#bae6fd" stroke="${INK}" stroke-width="3"/>
    <path d="M 26 -5 L 26 -25 L 45 -5 Z" fill="#bae6fd" stroke="${INK}" stroke-width="3"/>
    <!-- Headlight beam -->
    <polygon points="68,5 130,-15 130,25" fill="#fef08a" opacity="0.4"/>
    <!-- Wheels -->
    <g transform="translate(-35 22) rotate(${wheelSpin})">
      <circle cx="0" cy="0" r="16" fill="#1e293b" stroke="${INK}" stroke-width="4"/>
      <circle cx="0" cy="0" r="6" fill="#ffffff"/>
    </g>
    <g transform="translate(42 22) rotate(${wheelSpin})">
      <circle cx="0" cy="0" r="16" fill="#1e293b" stroke="${INK}" stroke-width="4"/>
      <circle cx="0" cy="0" r="6" fill="#ffffff"/>
    </g>
    ${labelTag(s.concept.slice(0, 14).toUpperCase(), 75)}
  </g>`;
}

/* ------------------------------------------------------------------ object */
function drawObject(s: AssetState): string {
  const t = s.age;
  const c = s.concept.toLowerCase();
  const isIdea = /idea|lightbulb|brain|thought|smart/i.test(c);
  const isClock = /clock|time|watch|timer|deadline|hour|minute/i.test(c);
  const isBook = /book|read|study|exam|paper|doc/i.test(c);
  const isWeight = /dumbbell|weight|gym|lift|heavy/i.test(c);
  const isTrophy = /medal|trophy|win|winner|award|champion/i.test(c);

  if (isIdea) {
    const glowPulse = 1 + Math.sin(t * 6) * 0.12;
    return `<g transform="scale(${glowPulse.toFixed(3)})">
      <!-- Glow rays -->
      ${[0, 45, 90, 135, 180, 225, 270, 315].map(deg => {
        const rad = deg * Math.PI / 180;
        const x1 = Math.cos(rad) * 45, y1 = Math.sin(rad) * 45 - 20;
        const x2 = Math.cos(rad) * 65, y2 = Math.sin(rad) * 65 - 20;
        return `<line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" stroke="${GOLD}" stroke-width="5" stroke-linecap="round"/>`;
      }).join("")}
      <!-- Lightbulb Glass -->
      <path d="M -26 -20 C -40 -50 40 -50 26 -20 C 18 -5 14 10 14 18 L -14 18 C -14 10 -18 -5 -26 -20 Z" fill="#fef08a" stroke="${INK}" stroke-width="5"/>
      <!-- Filament -->
      <path d="M -8 5 L -4 -15 L 4 -15 L 8 5" fill="none" stroke="${ACCENT}" stroke-width="3"/>
      <!-- Screw base -->
      <rect x="-12" y="18" width="24" height="14" rx="3" fill="#94a3b8" stroke="${INK}" stroke-width="3"/>
      <line x1="-12" y1="24" x2="12" y2="24" stroke="${INK}" stroke-width="2.5"/>
      ${labelTag("BIG BRAIN IDEA", 80)}
    </g>`;
  }

  if (isClock) {
    const handSec = (t * 180) % 360;
    const handMin = (t * 30) % 360;
    const ring = Math.sin(t * 24) * 2;
    return `<g transform="translate(${ring} 0)">
      <!-- Alarm Bells -->
      <circle cx="-35" cy="-45" r="14" fill="${ACCENT}" stroke="${INK}" stroke-width="4"/>
      <circle cx="35" cy="-45" r="14" fill="${ACCENT}" stroke="${INK}" stroke-width="4"/>
      <!-- Clock Face -->
      <circle cx="0" cy="0" r="50" fill="${PAPER}" stroke="${INK}" stroke-width="6"/>
      <!-- Ticks -->
      <line x1="0" y1="-44" x2="0" y2="-36" stroke="${INK}" stroke-width="4"/>
      <line x1="44" y1="0" x2="36" y2="0" stroke="${INK}" stroke-width="4"/>
      <line x1="0" y1="44" x2="0" y2="36" stroke="${INK}" stroke-width="4"/>
      <line x1="-44" y1="0" x2="-36" y2="0" stroke="${INK}" stroke-width="4"/>
      <!-- Hands -->
      <line x1="0" y1="0" x2="0" y2="-28" stroke="${INK}" stroke-width="5" stroke-linecap="round" transform="rotate(${handMin} 0 0)"/>
      <line x1="0" y1="0" x2="0" y2="-36" stroke="${ACCENT}" stroke-width="3" stroke-linecap="round" transform="rotate(${handSec} 0 0)"/>
      <circle cx="0" cy="0" r="5" fill="${INK}"/>
      ${labelTag("DEADLINE", 86)}
    </g>`;
  }

  if (isTrophy) {
    const shine = Math.sin(t * 3) * 6;
    return `<g transform="translate(0 ${shine})">
      <!-- Trophy Cup -->
      <path d="M -35 -40 L 35 -40 L 28 0 C 22 25 -22 25 -28 0 Z" fill="${GOLD}" stroke="${INK}" stroke-width="5"/>
      <!-- Handles -->
      <path d="M -35 -30 C -60 -30 -50 0 -26 0" fill="none" stroke="${INK}" stroke-width="5"/>
      <path d="M 35 -30 C 60 -30 50 0 26 0" fill="none" stroke="${INK}" stroke-width="5"/>
      <!-- Stem & Base -->
      <rect x="-8" y="16" width="16" height="20" fill="${GOLD}" stroke="${INK}" stroke-width="4"/>
      <rect x="-28" y="36" width="56" height="18" rx="4" fill="#78350f" stroke="${INK}" stroke-width="4"/>
      <!-- Star on Cup -->
      <path d="M 0 -22 L 3 -14 L 11 -14 L 5 -8 L 7 0 L 0 -5 L -7 0 L -5 -8 L -11 -14 L -3 -14 Z" fill="#ffffff"/>
      ${labelTag("#1 WINNER", 86)}
    </g>`;
  }

  // Default tactile object (e.g. tools, documents)
  const hover = Math.sin(t * 2.8) * 4;
  return `<g transform="translate(0 ${hover})">
    <rect x="-45" y="-55" width="90" height="110" rx="10" fill="${PAPER}" stroke="${INK}" stroke-width="5"/>
    <path d="M -25 -25 L 25 -25 M -25 -5 L 25 -5 M -25 15 L 10 15" stroke="${INK}" stroke-width="4" stroke-linecap="round"/>
    <circle cx="24" cy="32" r="12" fill="${ACCENT}" stroke="${INK}" stroke-width="3"/>
    <path d="M 18 32 L 22 36 L 30 28" fill="none" stroke="#ffffff" stroke-width="3" stroke-linecap="round"/>
    ${labelTag(s.concept.toUpperCase(), 88)}
  </g>`;
}

/* ----------------------------------------------------------------- generic */
function drawGeneric(s: AssetState): string {
  const t = s.age;
  const bob = Math.sin(t * 2.4) * 4;
  const word = s.concept.replace(/[^a-z0-9$%' -]/gi, "").slice(0, 16).toUpperCase() || "CORE CONCEPT";
  const w = Math.max(200, word.length * 16 + 60);

  // Instead of a plain yellow box, render a dynamic tactile whiteboard sketch with animated vector diagrams & stickers
  const stampAngle = 12 + Math.sin(t * 1.5) * 3;
  return `<g transform="translate(0 ${bob})">
    <!-- Tactile Whiteboard Blueprint Card -->
    <rect x="${-w / 2}" y="-105" width="${w}" height="190" rx="16" fill="${PAPER}" stroke="${INK}" stroke-width="5" filter="url(#cardShadow)"/>
    
    <!-- Top Blueprint Banner -->
    <rect x="${-w / 2 + 8}" y="-97" width="${w - 16}" height="42" rx="10" fill="#0f172a"/>
    <text x="0" y="-70" text-anchor="middle" font-family="'Impact', sans-serif" font-size="22" fill="${GOLD}" letter-spacing="2">ANALYSIS REPORT</text>
    
    <!-- Visual Diagram Schematic inside the card -->
    <g transform="translate(0 -10)">
      <!-- Left Metric Node -->
      <circle cx="-45" cy="0" r="22" fill="#dbeafe" stroke="${INK}" stroke-width="3.5"/>
      <text x="-45" y="6" text-anchor="middle" font-family="'Impact', sans-serif" font-size="16" fill="${COOL}">A</text>
      <!-- Connecting Arrow -->
      <line x1="-20" y1="0" x2="20" y2="0" stroke="${INK}" stroke-width="4" stroke-dasharray="6 4"/>
      <polygon points="20,0 12,-6 12,6" fill="${INK}"/>
      <!-- Right Result Node -->
      <circle cx="45" cy="0" r="22" fill="#fee2e2" stroke="${INK}" stroke-width="3.5"/>
      <text x="45" y="6" text-anchor="middle" font-family="'Impact', sans-serif" font-size="16" fill="${ACCENT}">B</text>
    </g>

    <!-- Bottom Highlighted Keyword Pill -->
    <rect x="${-w / 2 + 16}" y="32" width="${w - 32}" height="40" rx="8" fill="#f8fafc" stroke="${INK}" stroke-width="3.5"/>
    <text x="0" y="58" text-anchor="middle" font-family="'Impact', 'Comic Sans MS', sans-serif" font-size="22" font-weight="bold" fill="${INK}">${esc(word)}</text>

    <!-- Dynamic Slapstick Stamp Tag -->
    <g transform="translate(${w / 2 - 25} -90) rotate(${stampAngle})">
      <rect x="-40" y="-14" width="80" height="28" rx="6" fill="${ACCENT}" stroke="${INK}" stroke-width="3"/>
      <text x="0" y="5" text-anchor="middle" font-family="'Impact', sans-serif" font-size="14" fill="#ffffff">FACTS</text>
    </g>
  </g>`;
}

const DRAWERS: Record<string, (s: AssetState) => string> = {
  money: drawMoney,
  food: drawFood,
  device: drawDevice,
  pill: drawPill,
  chart: drawChart,
  person: drawPerson,
  body: drawBody,
  sign: drawSign,
  vehicle: drawVehicle,
  object: drawObject,
  generic: drawGeneric,
};

/**
 * Render one stage object as SVG, centered at (x, y) in design space.
 * Includes a soft ground shadow so objects feel grounded on stage.
 */
export function renderProceduralAsset(s: AssetState): string {
  const tf = popTransform(s.entry, s.exit, s.age);
  const opacity = (1 - s.exit).toFixed(3);
  const shadowScale = (0.7 + 0.3 * smooth(clamp(s.entry))).toFixed(2);
  const propScale = s.scale || 1.35;

  // 1. Check if concept matches any high-end handcrafted cartoon puppet
  const handcrafted = tryHandcraftedPuppet(s);
  if (handcrafted) {
    return `<g transform="translate(${s.x.toFixed(1)} ${s.y.toFixed(1)}) scale(${propScale.toFixed(3)})" opacity="${opacity}">
      <g transform="${tf}">${handcrafted}</g>
    </g>`;
  }

  // 2. Fallback to rich procedural vector cartoon drawer
  const drawer = DRAWERS[s.kind] ?? drawGeneric;
  return `<g transform="translate(${s.x.toFixed(1)} ${s.y.toFixed(1)}) scale(${propScale.toFixed(3)})" opacity="${opacity}">
    <ellipse cx="0" cy="96" rx="${(65 * +shadowScale).toFixed(1)}" ry="12" fill="${INK}" opacity="0.12"/>
    <g transform="${tf}">${drawer(s)}</g>
  </g>`;
}

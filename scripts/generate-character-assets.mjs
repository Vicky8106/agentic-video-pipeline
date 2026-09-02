import fs from 'fs';
import path from 'path';

const OUTPUT_DIR = '/root/Desktop/stick_figure_assets';
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// 100 Comprehensive Alex Meyers Stick Figure Expressions
export const EXPRESSIONS = [
  // 1. DISGUST & CRINGE (1-10)
  {
    id: "disgust_subtle",
    category: "disgust",
    name: "Subtle Disgust",
    headTilt: 12,
    eyeStyle: "squint",
    mouthShape: "cringe_wavy",
    eyebrowStyle: "arched_high",
    pose: "shrug",
    comicFx: "sweat_drop",
    desc: "Narrow squint, wavy cringe mouth, head tilted back."
  },
  {
    id: "disgust_gag",
    category: "disgust",
    name: "Gag Reflex Disgust",
    headTilt: -15,
    eyeStyle: "squint",
    mouthShape: "scream",
    eyebrowStyle: "furrowed",
    pose: "hands_on_hips",
    comicFx: "shock_lightning",
    desc: "One eye squinted, green tint hint, tongue out in horror."
  },
  {
    id: "disgust_side_glance",
    category: "disgust",
    name: "Side Glance Disgust",
    headTilt: -8,
    eyeStyle: "side_eye",
    mouthShape: "cringe_wavy",
    eyebrowStyle: "arched_high",
    pose: "crossed_arms",
    comicFx: "none",
    desc: "Hard side-eye glance with twisted cringe mouth and folded arms."
  },
  {
    id: "cringe_full",
    category: "disgust",
    name: "Full Body Cringe",
    headTilt: 15,
    eyeStyle: "squint",
    mouthShape: "cringe_wavy",
    eyebrowStyle: "worried",
    pose: "shrug",
    comicFx: "sweat_drop",
    desc: "Squished eyes, wavy squiggly mouth, shoulders raised high."
  },
  {
    id: "cringe_teeth_grit",
    category: "disgust",
    name: "Teeth Grit Cringe",
    headTilt: 8,
    eyeStyle: "shock",
    mouthShape: "smile_teeth",
    eyebrowStyle: "worried",
    pose: "facepalm",
    comicFx: "sweat_drop",
    desc: "Clenched teeth grimace with nervous sweat drop."
  },
  {
    id: "disgust_eyebrow_raise",
    category: "disgust",
    name: "The Rock Skeptical Disgust",
    headTilt: -10,
    eyeStyle: "normal",
    mouthShape: "smirk",
    eyebrowStyle: "rock_arch",
    pose: "point_camera",
    comicFx: "question_marks",
    desc: "One eyebrow raised high in utter judgment, wry smirk."
  },
  {
    id: "disgust_shudder",
    category: "disgust",
    name: "Shuddering Disgust",
    headTilt: -14,
    eyeStyle: "deadpan_dots",
    mouthShape: "cringe_wavy",
    eyebrowStyle: "worried",
    pose: "shrug",
    comicFx: "shock_lightning",
    desc: "Trembling face lines, tiny pupils, cold shudder."
  },
  {
    id: "disgust_vomit_rainbow",
    category: "disgust",
    name: "Manic Disgust Spew",
    headTilt: 20,
    eyeStyle: "shock",
    mouthShape: "jaw_drop",
    eyebrowStyle: "worried",
    pose: "mind_blown",
    comicFx: "shock_lightning",
    desc: "Wide shock eyes, gaping mouth vomiting comic green."
  },
  {
    id: "disgust_look_down",
    category: "disgust",
    name: "Disdainful Downward Look",
    headTilt: -18,
    eyeStyle: "side_eye",
    mouthShape: "deadpan_line",
    eyebrowStyle: "rock_arch",
    pose: "hands_on_hips",
    comicFx: "none",
    desc: "Staring downward with utter disdain and arms on hips."
  },
  {
    id: "disgust_pinched_nose",
    category: "disgust",
    name: "Pinch Nose Bad Smell",
    headTilt: 10,
    eyeStyle: "squint",
    mouthShape: "cringe_wavy",
    eyebrowStyle: "furrowed",
    pose: "facepalm",
    comicFx: "sweat_drop",
    desc: "Squinting eyes, wavy mouth, hand shielding face from stench."
  },

  // 2. FEAR & TERROR (11-20)
  {
    id: "fear_sweat_freeze",
    category: "fear",
    name: "Cold Sweat Paralyzed",
    headTilt: 0,
    eyeStyle: "shock",
    mouthShape: "open_o",
    eyebrowStyle: "worried",
    pose: "default",
    comicFx: "sweat_drop",
    desc: "Pinpoint pupils, giant dripping sweat drops, open O mouth."
  },
  {
    id: "fear_trembling",
    category: "fear",
    name: "Trembling Terror",
    headTilt: -6,
    eyeStyle: "shock",
    mouthShape: "cringe_wavy",
    eyebrowStyle: "worried",
    pose: "shrug",
    comicFx: "shock_lightning",
    desc: "Vibrating body lines, trembling wavy mouth, terror pupils."
  },
  {
    id: "fear_hiding",
    category: "fear",
    name: "Shielding Face Peeking",
    headTilt: -12,
    eyeStyle: "squint",
    mouthShape: "open_o",
    eyebrowStyle: "worried",
    pose: "facepalm",
    comicFx: "sweat_drop",
    desc: "Hand covering face, peeking nervously through fingers."
  },
  {
    id: "fear_screaming",
    category: "fear",
    name: "Wide Screaming Terror",
    headTilt: 0,
    eyeStyle: "eye_pop",
    mouthShape: "scream",
    eyebrowStyle: "worried",
    pose: "mind_blown",
    comicFx: "exclamation",
    desc: "Gaping black screaming oval mouth with popping eyes."
  },
  {
    id: "fear_panic_run",
    category: "fear",
    name: "Panic Sprint",
    headTilt: 25,
    eyeStyle: "shock",
    mouthShape: "scream",
    eyebrowStyle: "worried",
    pose: "point_camera",
    comicFx: "speed_lines",
    desc: "Speed lines behind, screaming face running for life."
  },
  {
    id: "fear_soul_leaving",
    category: "fear",
    name: "Soul Leaving Body",
    headTilt: -16,
    eyeStyle: "ps1",
    mouthShape: "jaw_drop",
    eyebrowStyle: "worried",
    pose: "shrug",
    comicFx: "shock_lightning",
    desc: "Jaw dropped, ghost soul floating out of mouth."
  },
  {
    id: "fear_goosebumps",
    category: "fear",
    name: "Spine Chilling Goosebumps",
    headTilt: 6,
    eyeStyle: "shock",
    mouthShape: "smile_teeth",
    eyebrowStyle: "worried",
    pose: "crossed_arms",
    comicFx: "sweat_drop",
    desc: "Clenched teeth, wide eyes, arms tightly wrapped in chills."
  },
  {
    id: "fear_wide_eyed_frozen",
    category: "fear",
    name: "Stone Frozen Panic",
    headTilt: 0,
    eyeStyle: "eye_pop",
    mouthShape: "open_o",
    eyebrowStyle: "worried",
    pose: "default",
    comicFx: "exclamation",
    desc: "Utterly paralyzed popping eyes with red exclamation point."
  },
  {
    id: "fear_crying_plea",
    category: "fear",
    name: "Pleading Crying Fear",
    headTilt: -8,
    eyeStyle: "tear_crying",
    mouthShape: "cringe_wavy",
    eyebrowStyle: "worried",
    pose: "facepalm",
    comicFx: "sweat_drop",
    desc: "Watery streaming tears, pleading trembling hands."
  },
  {
    id: "fear_surrender",
    category: "fear",
    name: "Hands Up Surrender",
    headTilt: 10,
    eyeStyle: "shock",
    mouthShape: "talking_open",
    eyebrowStyle: "worried",
    pose: "shrug",
    comicFx: "sweat_drop",
    desc: "Both hands raised high in unconditional surrender."
  },

  // 3. FRUSTRATION & ANNOYANCE (21-30)
  {
    id: "frustration_facepalm",
    category: "frustration",
    name: "Classic Facepalm",
    headTilt: 12,
    eyeStyle: "deadpan_dots",
    mouthShape: "deadpan_line",
    eyebrowStyle: "worried",
    pose: "facepalm",
    comicFx: "sweat_drop",
    desc: "Iconic flat hand slap to face in utter disbelief."
  },
  {
    id: "frustration_double_facepalm",
    category: "frustration",
    name: "Double Hand Despair",
    headTilt: 0,
    eyeStyle: "closed",
    mouthShape: "cringe_wavy",
    eyebrowStyle: "worried",
    pose: "mind_blown",
    comicFx: "sweat_drop",
    desc: "Both hands gripping head, closed eyes in agony."
  },
  {
    id: "frustration_groan",
    category: "frustration",
    name: "Agonized Groan",
    headTilt: -20,
    eyeStyle: "closed",
    mouthShape: "scream",
    eyebrowStyle: "worried",
    pose: "shrug",
    comicFx: "shock_lightning",
    desc: "Head thrown back, closed curved eyes, loud groan."
  },
  {
    id: "frustration_rubbing_temples",
    category: "frustration",
    name: "Migraine Temple Rub",
    headTilt: 0,
    eyeStyle: "closed",
    mouthShape: "deadpan_line",
    eyebrowStyle: "furrowed",
    pose: "mind_blown",
    comicFx: "sweat_drop",
    desc: "Fingertips massaging temples to survive the stupidity."
  },
  {
    id: "frustration_sigh",
    category: "frustration",
    name: "Heavy Defeated Sigh",
    headTilt: 10,
    eyeStyle: "deadpan_dots",
    mouthShape: "open_o",
    eyebrowStyle: "worried",
    pose: "shrug",
    comicFx: "none",
    desc: "Puffed cheeks blowing out visible air gust."
  },
  {
    id: "frustration_eye_roll",
    category: "frustration",
    name: "Nuclear Eye Roll",
    headTilt: -10,
    eyeStyle: "rolling",
    mouthShape: "smirk",
    eyebrowStyle: "rock_arch",
    pose: "crossed_arms",
    comicFx: "none",
    desc: "Pupils rolled all the way into the ceiling, wry smirk."
  },
  {
    id: "frustration_teeth_grind",
    category: "frustration",
    name: "Teeth Grinding Fury",
    headTilt: -6,
    eyeStyle: "squint",
    mouthShape: "smile_teeth",
    eyebrowStyle: "furrowed",
    pose: "hands_on_hips",
    comicFx: "shock_lightning",
    desc: "Clenched horizontal teeth, vein throbbing on forehead."
  },
  {
    id: "frustration_slumping",
    category: "frustration",
    name: "Defeated Slump",
    headTilt: 22,
    eyeStyle: "deadpan_dots",
    mouthShape: "deadpan_line",
    eyebrowStyle: "worried",
    pose: "default",
    comicFx: "none",
    desc: "Slouched spine, dangling arms, exhausted deadpan."
  },
  {
    id: "frustration_head_in_hands",
    category: "frustration",
    name: "Head in Hands",
    headTilt: 0,
    eyeStyle: "closed",
    mouthShape: "deadpan_line",
    eyebrowStyle: "worried",
    pose: "facepalm",
    comicFx: "sweat_drop",
    desc: "Head resting in hands, contemplating life choices."
  },
  {
    id: "frustration_why_god_why",
    category: "frustration",
    name: "Why God Why",
    headTilt: -25,
    eyeStyle: "tear_crying",
    mouthShape: "scream",
    eyebrowStyle: "worried",
    pose: "shrug",
    comicFx: "exclamation",
    desc: "Looking to the sky with open arms in pure frustration."
  },

  // 4. RAGE & ANGER (31-40)
  {
    id: "rage_furious_screaming",
    category: "rage",
    name: "Furious Roar",
    headTilt: 0,
    eyeStyle: "laser",
    mouthShape: "scream",
    eyebrowStyle: "furrowed",
    pose: "mind_blown",
    comicFx: "shock_lightning",
    desc: "Red glowing laser eyes, wide roaring screaming mouth."
  },
  {
    id: "rage_laser_eyes",
    category: "rage",
    name: "Laser Beams of Death",
    headTilt: -4,
    eyeStyle: "laser",
    mouthShape: "deadpan_line",
    eyebrowStyle: "furrowed",
    pose: "point_camera",
    comicFx: "shock_lightning",
    desc: "Glowing crimson laser beams vaporizing the target."
  },
  {
    id: "rage_steam_ears",
    category: "rage",
    name: "Boiling Steam Ears",
    headTilt: 0,
    eyeStyle: "shock",
    mouthShape: "smile_teeth",
    eyebrowStyle: "furrowed",
    pose: "hands_on_hips",
    comicFx: "shock_lightning",
    desc: "Steam blasting from ears, gritted teeth rage."
  },
  {
    id: "rage_clenched_fists",
    category: "rage",
    name: "Shaking Clenched Fists",
    headTilt: 6,
    eyeStyle: "squint",
    mouthShape: "smile_teeth",
    eyebrowStyle: "furrowed",
    pose: "hands_on_hips",
    comicFx: "shock_lightning",
    desc: "Trembling fists at sides, furrowed aggressive eyebrows."
  },
  {
    id: "rage_table_flip",
    category: "rage",
    name: "Table Flip Tantrum",
    headTilt: -15,
    eyeStyle: "laser",
    mouthShape: "scream",
    eyebrowStyle: "furrowed",
    pose: "shrug",
    comicFx: "exclamation",
    desc: "Upward hands flipping an imaginary table into the sun."
  },
  {
    id: "rage_vein_pop",
    category: "rage",
    name: "Vein Popping Fury",
    headTilt: 8,
    eyeStyle: "shock",
    mouthShape: "cringe_wavy",
    eyebrowStyle: "furrowed",
    pose: "facepalm",
    comicFx: "shock_lightning",
    desc: "Red 4-corner comic anger symbol throbbing on forehead."
  },
  {
    id: "rage_flame_aura",
    category: "rage",
    name: "Flaming Super Saiyan Rage",
    headTilt: 0,
    eyeStyle: "laser",
    mouthShape: "wide_grin",
    eyebrowStyle: "furrowed",
    pose: "mind_blown",
    comicFx: "shock_lightning",
    desc: "Intense burning fury aura with laser glare."
  },
  {
    id: "rage_biting_fist",
    category: "rage",
    name: "Biting Knuckles Rage",
    headTilt: -10,
    eyeStyle: "shock",
    mouthShape: "smile_teeth",
    eyebrowStyle: "furrowed",
    pose: "facepalm",
    comicFx: "sweat_drop",
    desc: "Biting knuckles to stop from screaming in public."
  },
  {
    id: "rage_finger_jabbing",
    category: "rage",
    name: "Aggressive Finger Point",
    headTilt: 12,
    eyeStyle: "squint",
    mouthShape: "talking_open",
    eyebrowStyle: "furrowed",
    pose: "point_camera",
    comicFx: "exclamation",
    desc: "Aggressively pointing index finger right at the camera."
  },
  {
    id: "rage_eye_twitch",
    category: "rage",
    name: "Violent Eye Twitch",
    headTilt: -8,
    eyeStyle: "squint",
    mouthShape: "smirk",
    eyebrowStyle: "rock_arch",
    pose: "default",
    comicFx: "shock_lightning",
    desc: "Unstable twitching smile holding back absolute mayhem."
  },

  // 5. DEADPAN & APATHY (41-50)
  {
    id: "deadpan_classic",
    category: "deadpan",
    name: "Classic Casually Explained Deadpan",
    headTilt: 0,
    eyeStyle: "deadpan_dots",
    mouthShape: "deadpan_line",
    eyebrowStyle: "flat",
    pose: "default",
    comicFx: "none",
    desc: "The timeless two black dots and flat line mouth."
  },
  {
    id: "deadpan_slow_blink",
    category: "deadpan",
    name: "Slow Judgmental Blink",
    headTilt: 4,
    eyeStyle: "closed",
    mouthShape: "deadpan_line",
    eyebrowStyle: "flat",
    pose: "default",
    comicFx: "none",
    desc: "Closed eyelids lingering in quiet exhaustion."
  },
  {
    id: "deadpan_soul_stare",
    category: "deadpan",
    name: "Staring Into Your Soul",
    headTilt: 0,
    eyeStyle: "normal",
    mouthShape: "deadpan_line",
    eyebrowStyle: "flat",
    pose: "default",
    comicFx: "none",
    desc: "Wide unblinking circular eyes staring directly forward."
  },
  {
    id: "deadpan_sipping_coffee",
    category: "deadpan",
    name: "Coffee Sipping Apathy",
    headTilt: -6,
    eyeStyle: "deadpan_dots",
    mouthShape: "deadpan_line",
    eyebrowStyle: "flat",
    pose: "facepalm",
    comicFx: "none",
    desc: "Casually sipping coffee while chaos unfolds."
  },
  {
    id: "deadpan_shrug",
    category: "deadpan",
    name: "Indifferent Shrug",
    headTilt: 8,
    eyeStyle: "deadpan_dots",
    mouthShape: "deadpan_line",
    eyebrowStyle: "rock_arch",
    pose: "shrug",
    comicFx: "none",
    desc: "Casual open-palm shrug, blank dots, flat mouth."
  },
  {
    id: "deadpan_chin_rest",
    category: "deadpan",
    name: "Bored Chin Rest",
    headTilt: -14,
    eyeStyle: "side_eye",
    mouthShape: "deadpan_line",
    eyebrowStyle: "flat",
    pose: "facepalm",
    comicFx: "none",
    desc: "Chin resting on fist, gazing sideways in boredom."
  },
  {
    id: "deadpan_subtle_nod",
    category: "deadpan",
    name: "Resigned Nod",
    headTilt: 6,
    eyeStyle: "deadpan_dots",
    mouthShape: "slight_smile",
    eyebrowStyle: "flat",
    pose: "default",
    comicFx: "none",
    desc: "Subtle wry grin, accepting the absurd reality."
  },
  {
    id: "deadpan_side_glance",
    category: "deadpan",
    name: "Apathetic Side Glance",
    headTilt: 0,
    eyeStyle: "side_eye",
    mouthShape: "deadpan_line",
    eyebrowStyle: "flat",
    pose: "crossed_arms",
    comicFx: "none",
    desc: "Pupils shifted sideways without moving a single facial muscle."
  },
  {
    id: "deadpan_phone_scroll",
    category: "deadpan",
    name: "Zombie Phone Scrolling",
    headTilt: 16,
    eyeStyle: "deadpan_dots",
    mouthShape: "deadpan_line",
    eyebrowStyle: "flat",
    pose: "point_camera",
    comicFx: "none",
    desc: "Staring blankly down at a screen."
  },
  {
    id: "deadpan_unbothered",
    category: "deadpan",
    name: "Completely Unbothered",
    headTilt: -8,
    eyeStyle: "normal",
    mouthShape: "smirk",
    eyebrowStyle: "rock_arch",
    pose: "crossed_arms",
    comicFx: "none",
    desc: "Arms crossed, leaning back, smirk of supreme detachment."
  },

  // 6. SMUG & SARCASM (51-60)
  {
    id: "smug_rock_eyebrow",
    category: "smug",
    name: "The Rock Signature Brow",
    headTilt: -10,
    eyeStyle: "normal",
    mouthShape: "smirk",
    eyebrowStyle: "rock_arch",
    pose: "hands_on_hips",
    comicFx: "none",
    desc: "The quintessential single-eyebrow raised satirical smirk."
  },
  {
    id: "smug_finger_guns",
    category: "smug",
    name: "Double Finger Guns",
    headTilt: 8,
    eyeStyle: "normal",
    mouthShape: "wide_grin",
    eyebrowStyle: "rock_arch",
    pose: "point_camera",
    comicFx: "sparkles",
    desc: "Double finger guns pointed at camera with a wink."
  },
  {
    id: "smug_peace_sign",
    category: "smug",
    name: "Cheeky Peace Sign",
    headTilt: -12,
    eyeStyle: "closed",
    mouthShape: "wide_grin",
    eyebrowStyle: "raised",
    pose: "waving",
    comicFx: "sparkles",
    desc: "Peace sign by cheek with playful closed-eye smile."
  },
  {
    id: "smug_hands_behind_head",
    category: "smug",
    name: "Kickback Chilling",
    headTilt: 0,
    eyeStyle: "closed",
    mouthShape: "smirk",
    eyebrowStyle: "rock_arch",
    pose: "mind_blown",
    comicFx: "none",
    desc: "Hands clasped behind head, enjoying the victory."
  },
  {
    id: "smug_glasses_push",
    category: "smug",
    name: "Anime Glasses Push",
    headTilt: -6,
    eyeStyle: "ps1",
    mouthShape: "smirk",
    eyebrowStyle: "furrowed",
    pose: "facepalm",
    comicFx: "sparkles",
    desc: "Adjusting glasses with shiny glint on lens."
  },
  {
    id: "smug_chuckle",
    category: "smug",
    name: "Suppressed Chuckle",
    headTilt: 10,
    eyeStyle: "closed",
    mouthShape: "smile_teeth",
    eyebrowStyle: "raised",
    pose: "facepalm",
    comicFx: "sparkles",
    desc: "Hand covering mouth laughing quietly at someone's expense."
  },
  {
    id: "smug_thumbs_up",
    category: "smug",
    name: "Sarcastic Thumbs Up",
    headTilt: 6,
    eyeStyle: "normal",
    mouthShape: "wide_grin",
    eyebrowStyle: "raised",
    pose: "point_camera",
    comicFx: "sparkles",
    desc: "Overly enthusiastic thumbs up with cheesy wide grin."
  },
  {
    id: "smug_sipping_tea",
    category: "smug",
    name: "Sipping Gossip Tea",
    headTilt: -10,
    eyeStyle: "side_eye",
    mouthShape: "smirk",
    eyebrowStyle: "rock_arch",
    pose: "facepalm",
    comicFx: "none",
    desc: "Sipping hot tea while watching drama unfold."
  },
  {
    id: "smug_sarcastic_clap",
    category: "smug",
    name: "Slow Sarcastic Clap",
    headTilt: 0,
    eyeStyle: "deadpan_dots",
    mouthShape: "smirk",
    eyebrowStyle: "rock_arch",
    pose: "shrug",
    comicFx: "none",
    desc: "Slow golf clap with an unenthusiastic smirk."
  },
  {
    id: "smug_chef_kiss",
    category: "smug",
    name: "Chef's Kiss Perfection",
    headTilt: -14,
    eyeStyle: "closed",
    mouthShape: "smirk",
    eyebrowStyle: "raised",
    pose: "point_camera",
    comicFx: "sparkles",
    desc: "Kissing fingers in culinary Italian perfection."
  },

  // 7. CONFUSION & SKEPTICISM (61-70)
  {
    id: "confused_tilted_head",
    category: "confused",
    name: "Extreme Head Tilt Confusion",
    headTilt: 26,
    eyeStyle: "squint",
    mouthShape: "open_o",
    eyebrowStyle: "worried",
    pose: "shrug",
    comicFx: "question_marks",
    desc: "Head tilted 26 degrees with 3 pink question marks hovering."
  },
  {
    id: "confused_squint",
    category: "confused",
    name: "Squinting In Disbelief",
    headTilt: -8,
    eyeStyle: "squint",
    mouthShape: "cringe_wavy",
    eyebrowStyle: "rock_arch",
    pose: "crossed_arms",
    comicFx: "question_marks",
    desc: "One eye squinted, one eye normal, wavy mouth."
  },
  {
    id: "confused_chin_scratch",
    category: "confused",
    name: "Philosophical Chin Scratch",
    headTilt: 10,
    eyeStyle: "rolling",
    mouthShape: "deadpan_line",
    eyebrowStyle: "rock_arch",
    pose: "facepalm",
    comicFx: "question_marks",
    desc: "Scratching chin trying to compute the logic."
  },
  {
    id: "confused_math_equations",
    category: "confused",
    name: "Math Equation Overload",
    headTilt: 0,
    eyeStyle: "shock",
    mouthShape: "open_o",
    eyebrowStyle: "worried",
    pose: "mind_blown",
    comicFx: "question_marks",
    desc: "Floating algebra symbols orbiting head in confusion."
  },
  {
    id: "confused_magnifier",
    category: "confused",
    name: "Inspecting Under Magnifier",
    headTilt: -12,
    eyeStyle: "eye_pop",
    mouthShape: "open_o",
    eyebrowStyle: "worried",
    pose: "point_camera",
    comicFx: "question_marks",
    desc: "Looking closely trying to find the missing brain cells."
  },
  {
    id: "skeptical_side_eye",
    category: "confused",
    name: "Criminal Side Eye",
    headTilt: -6,
    eyeStyle: "side_eye",
    mouthShape: "smirk",
    eyebrowStyle: "rock_arch",
    pose: "crossed_arms",
    comicFx: "none",
    desc: "Suspicious narrow eyes glancing sideways at the suspect."
  },
  {
    id: "skeptical_raised_brow",
    category: "confused",
    name: "Severe Raised Brow",
    headTilt: 8,
    eyeStyle: "normal",
    mouthShape: "deadpan_line",
    eyebrowStyle: "rock_arch",
    pose: "hands_on_hips",
    comicFx: "question_marks",
    desc: "Flat line mouth with extreme asymmetrical brow."
  },
  {
    id: "skeptical_hand_on_hip",
    category: "confused",
    name: "Scolding Stance",
    headTilt: -14,
    eyeStyle: "side_eye",
    mouthShape: "cringe_wavy",
    eyebrowStyle: "rock_arch",
    pose: "hands_on_hips",
    comicFx: "none",
    desc: "Hand on waist, squinting in heavy doubt."
  },
  {
    id: "confused_double_take",
    category: "confused",
    name: "Sharp Double Take",
    headTilt: -22,
    eyeStyle: "shock",
    mouthShape: "open_o",
    eyebrowStyle: "raised",
    pose: "point_camera",
    comicFx: "speed_lines",
    desc: "Head whipped around in a lightning-fast double take."
  },
  {
    id: "confused_shrug_what",
    category: "confused",
    name: "What Even Is This",
    headTilt: 14,
    eyeStyle: "normal",
    mouthShape: "talking_open",
    eyebrowStyle: "worried",
    pose: "shrug",
    comicFx: "question_marks",
    desc: "Hands thrown outward in a giant 'WHAT??'."
  },

  // 8. SHOCK & SURPRISE (71-80)
  {
    id: "shock_jaw_drop",
    category: "shock",
    name: "Floor Dropped Jaw",
    headTilt: 0,
    eyeStyle: "shock",
    mouthShape: "jaw_drop",
    eyebrowStyle: "raised",
    pose: "shrug",
    comicFx: "exclamation",
    desc: "Mouth dropped down to chest level in utter astonishment."
  },
  {
    id: "shock_eye_pop",
    category: "shock",
    name: "Spring Coil Eye Pop",
    headTilt: 0,
    eyeStyle: "eye_pop",
    mouthShape: "jaw_drop",
    eyebrowStyle: "raised",
    pose: "mind_blown",
    comicFx: "shock_lightning",
    desc: "Eyeballs literally popped out on spring stems with impact burst."
  },
  {
    id: "shock_lightning_bolt",
    category: "shock",
    name: "Electric Shock Bolt",
    headTilt: 4,
    eyeStyle: "shock",
    mouthShape: "scream",
    eyebrowStyle: "raised",
    pose: "mind_blown",
    comicFx: "shock_lightning",
    desc: "Yellow comic lightning striking head, eyes popping."
  },
  {
    id: "shock_spit_take",
    category: "shock",
    name: "Hilarious Spit Take",
    headTilt: 16,
    eyeStyle: "eye_pop",
    mouthShape: "scream",
    eyebrowStyle: "raised",
    pose: "point_camera",
    comicFx: "speed_lines",
    desc: "Spraying coffee/water forward in shock."
  },
  {
    id: "shock_home_alone",
    category: "shock",
    name: "Home Alone Scream",
    headTilt: 0,
    eyeStyle: "shock",
    mouthShape: "scream",
    eyebrowStyle: "worried",
    pose: "facepalm",
    comicFx: "exclamation",
    desc: "Hands slapped on cheeks screaming at mirror."
  },
  {
    id: "shock_exclamation",
    category: "shock",
    name: "Metal Gear Solid Alert",
    headTilt: -6,
    eyeStyle: "shock",
    mouthShape: "open_o",
    eyebrowStyle: "raised",
    pose: "default",
    comicFx: "exclamation",
    desc: "Giant red exclamation mark exploding above head."
  },
  {
    id: "shock_hair_stand",
    category: "shock",
    name: "Spiked Hair Shock",
    headTilt: 0,
    eyeStyle: "eye_pop",
    mouthShape: "jaw_drop",
    eyebrowStyle: "raised",
    pose: "mind_blown",
    comicFx: "shock_lightning",
    desc: "Hair standing straight up like an anime shockwave."
  },
  {
    id: "shock_monocle_drop",
    category: "shock",
    name: "Monocle Drop",
    headTilt: -14,
    eyeStyle: "shock",
    mouthShape: "open_o",
    eyebrowStyle: "raised",
    pose: "point_camera",
    comicFx: "sparkles",
    desc: "Monocle flying off eye from sheer shock."
  },
  {
    id: "shock_faint_backward",
    category: "shock",
    name: "Fainting Backward",
    headTilt: -30,
    eyeStyle: "ps1",
    mouthShape: "faint",
    eyebrowStyle: "worried",
    pose: "shrug",
    comicFx: "shock_lightning",
    desc: "Collapsing backward at a 45 degree angle."
  },
  {
    id: "shock_speed_zoom",
    category: "shock",
    name: "Manga Speed Zoom Shock",
    headTilt: 0,
    eyeStyle: "eye_pop",
    mouthShape: "scream",
    eyebrowStyle: "raised",
    pose: "mind_blown",
    comicFx: "speed_lines",
    desc: "Radial action speed lines converging on face."
  },

  // 9. MIND BLOWN & EUPHORIA (81-90)
  {
    id: "mind_blown_explosion",
    category: "mind_blown",
    name: "Mushroom Cloud Mind Blown",
    headTilt: 0,
    eyeStyle: "shock",
    mouthShape: "jaw_drop",
    eyebrowStyle: "raised",
    pose: "mind_blown",
    comicFx: "shock_lightning",
    desc: "Hands on temples as brain explodes into clouds."
  },
  {
    id: "mind_blown_galaxy_brain",
    category: "mind_blown",
    name: "Galaxy Brain Transcendence",
    headTilt: -8,
    eyeStyle: "sparkle_star",
    mouthShape: "wide_grin",
    eyebrowStyle: "raised",
    pose: "mind_blown",
    comicFx: "sparkles",
    desc: "Golden sparkling stars shooting from eyes."
  },
  {
    id: "sparkle_anime_eyes",
    category: "mind_blown",
    name: "Anime Starry Eyes",
    headTilt: 6,
    eyeStyle: "sparkle_star",
    mouthShape: "smile_teeth",
    eyebrowStyle: "raised",
    pose: "waving",
    comicFx: "sparkles",
    desc: "Giant 4-pointed golden stars twinkling in pupils."
  },
  {
    id: "dollar_eyes_greed",
    category: "mind_blown",
    name: "Dollar Sign Eyes",
    headTilt: 8,
    eyeStyle: "laser",
    mouthShape: "wide_grin",
    eyebrowStyle: "raised",
    pose: "hands_on_hips",
    comicFx: "sparkles",
    desc: "Green dollar signs gleaming with floating cash."
  },
  {
    id: "euphoria_angel_wings",
    category: "mind_blown",
    name: "Heavenly Enlightenment",
    headTilt: -15,
    eyeStyle: "closed",
    mouthShape: "slight_smile",
    eyebrowStyle: "raised",
    pose: "shrug",
    comicFx: "sparkles",
    desc: "Ascending into clouds with golden halo and wings."
  },
  {
    id: "laughing_fountain_tears",
    category: "mind_blown",
    name: "Laughing Until Crying",
    headTilt: -12,
    eyeStyle: "tear_crying",
    mouthShape: "wide_grin",
    eyebrowStyle: "raised",
    pose: "facepalm",
    comicFx: "sparkles",
    desc: "Waterfalls of laughter streaming sideways."
  },
  {
    id: "manic_laughter",
    category: "mind_blown",
    name: "Manic Villain Cackle",
    headTilt: -18,
    eyeStyle: "laser",
    mouthShape: "wide_grin",
    eyebrowStyle: "furrowed",
    pose: "mind_blown",
    comicFx: "shock_lightning",
    desc: "Teeth showing ear-to-ear in unhinged comedy."
  },
  {
    id: "hypnotized_spirals",
    category: "mind_blown",
    name: "Hypnotic Spiral Eyes",
    headTilt: 0,
    eyeStyle: "ps1",
    mouthShape: "faint",
    eyebrowStyle: "worried",
    pose: "shrug",
    comicFx: "question_marks",
    desc: "Concentric spirals in eyes completely entranced."
  },
  {
    id: "laser_burst_prismatic",
    category: "mind_blown",
    name: "Prismatic Insight Burst",
    headTilt: 0,
    eyeStyle: "laser",
    mouthShape: "open_o",
    eyebrowStyle: "raised",
    pose: "mind_blown",
    comicFx: "sparkles",
    desc: "Rainbow prismatic rays firing from eyes."
  },
  {
    id: "blissful_serenity",
    category: "mind_blown",
    name: "Absolute Zen Serenity",
    headTilt: 10,
    eyeStyle: "closed",
    mouthShape: "slight_smile",
    eyebrowStyle: "flat",
    pose: "crossed_arms",
    comicFx: "sparkles",
    desc: "Inner peace achieved while the world burns."
  },

  // 10. EXHAUSTION, SADNESS & DEFEAT (91-100)
  {
    id: "crying_waterfalls",
    category: "sadness",
    name: "Cyan Waterfalls of Tears",
    headTilt: 0,
    eyeStyle: "tear_crying",
    mouthShape: "jaw_drop",
    eyebrowStyle: "worried",
    pose: "facepalm",
    comicFx: "sweat_drop",
    desc: "Dual parallel thick cyan water streams cascading down."
  },
  {
    id: "sad_pout",
    category: "sadness",
    name: "Quivering Puppy Pout",
    headTilt: 10,
    eyeStyle: "tear_crying",
    mouthShape: "cringe_wavy",
    eyebrowStyle: "worried",
    pose: "shrug",
    comicFx: "sweat_drop",
    desc: "Quivering lower lip, big watery puppy eyes."
  },
  {
    id: "exhausted_melting",
    category: "sadness",
    name: "Melting Into The Floor",
    headTilt: 25,
    eyeStyle: "closed",
    mouthShape: "faint",
    eyebrowStyle: "worried",
    pose: "default",
    comicFx: "sweat_drop",
    desc: "Body drooping down like warm candle wax."
  },
  {
    id: "sleepy_yawn",
    category: "sadness",
    name: "Massive Jaw Yawn",
    headTilt: -8,
    eyeStyle: "closed",
    mouthShape: "open_o",
    eyebrowStyle: "flat",
    pose: "facepalm",
    comicFx: "none",
    desc: "Hand covering yawning mouth with Zzz's floating up."
  },
  {
    id: "sleeping_drool",
    category: "sadness",
    name: "Asleep Standing Drool",
    headTilt: 18,
    eyeStyle: "closed",
    mouthShape: "faint",
    eyebrowStyle: "flat",
    pose: "default",
    comicFx: "none",
    desc: "Slumped head with sleeping bubble drool."
  },
  {
    id: "defeated_face_down",
    category: "sadness",
    name: "Flat on Face Defeat",
    headTilt: 35,
    eyeStyle: "deadpan_dots",
    mouthShape: "deadpan_line",
    eyebrowStyle: "worried",
    pose: "default",
    comicFx: "sweat_drop",
    desc: "Exhausted collapse flat on the floor."
  },
  {
    id: "tiny_violin",
    category: "sadness",
    name: "World's Smallest Violin",
    headTilt: -12,
    eyeStyle: "side_eye",
    mouthShape: "smirk",
    eyebrowStyle: "rock_arch",
    pose: "point_camera",
    comicFx: "none",
    desc: "Rubbing two fingers playing invisible violin."
  },
  {
    id: "dark_circles_insomnia",
    category: "sadness",
    name: "4 AM Insomnia Eyes",
    headTilt: 6,
    eyeStyle: "tim_burton",
    mouthShape: "faint",
    eyebrowStyle: "worried",
    pose: "crossed_arms",
    comicFx: "sweat_drop",
    desc: "Heavy sunken dark circles under tired eyes."
  },
  {
    id: "sad_rain_cloud",
    category: "sadness",
    name: "Personal Rain Cloud",
    headTilt: 14,
    eyeStyle: "tear_crying",
    mouthShape: "deadpan_line",
    eyebrowStyle: "worried",
    pose: "shrug",
    comicFx: "sweat_drop",
    desc: "Dark cartoon rain cloud drizzling over head."
  },
  {
    id: "knocked_out_stars",
    category: "sadness",
    name: "Knocked Out K.O.",
    headTilt: -20,
    eyeStyle: "ps1",
    mouthShape: "faint",
    eyebrowStyle: "worried",
    pose: "shrug",
    comicFx: "shock_lightning",
    desc: "X X eyes with yellow circling cartoon stars."
  }
];

// Helper to generate full SVG for a standalone character expression
function renderCharacterAssetSvg(expr) {
  const { id, name, category, headTilt, eyeStyle, mouthShape, eyebrowStyle, pose, comicFx } = expr;

  // Arms and Body Poses
  let leftArm = `<path d="M 0 -70 L -45 -10 L -65 -35" stroke="#111111" stroke-width="6" stroke-linecap="round" fill="none"/>`;
  let rightArm = `<path d="M 0 -70 L 45 -10 L 65 -35" stroke="#111111" stroke-width="6" stroke-linecap="round" fill="none"/>`;

  if (pose === "shrug") {
    leftArm = `<path d="M 0 -70 L -45 -40 L -65 -80" stroke="#111111" stroke-width="6" stroke-linecap="round" fill="none"/>`;
    rightArm = `<path d="M 0 -70 L 45 -40 L 65 -80" stroke="#111111" stroke-width="6" stroke-linecap="round" fill="none"/>`;
  } else if (pose === "facepalm") {
    leftArm = `<path d="M 0 -70 L -35 -20 L -45 20" stroke="#111111" stroke-width="6" stroke-linecap="round" fill="none"/>`;
    rightArm = `<path d="M 0 -70 L 35 -60 L 15 -125" stroke="#111111" stroke-width="6" stroke-linecap="round" fill="none"/>`;
  } else if (pose === "point_camera") {
    leftArm = `<path d="M 0 -70 L -40 -30 L -30 20" stroke="#111111" stroke-width="6" stroke-linecap="round" fill="none"/>`;
    rightArm = `<path d="M 0 -70 L 45 -70 L 95 -70" stroke="#111111" stroke-width="6" stroke-linecap="round" fill="none"/>`;
  } else if (pose === "hands_on_hips") {
    leftArm = `<path d="M 0 -70 L -35 -40 L -15 0" stroke="#111111" stroke-width="6" stroke-linecap="round" fill="none"/>`;
    rightArm = `<path d="M 0 -70 L 35 -40 L 15 0" stroke="#111111" stroke-width="6" stroke-linecap="round" fill="none"/>`;
  } else if (pose === "crossed_arms") {
    leftArm = `<path d="M 0 -70 L -30 -30 L 25 -30" stroke="#111111" stroke-width="6" stroke-linecap="round" fill="none"/>`;
    rightArm = `<path d="M 0 -70 L 30 -30 L -25 -30" stroke="#111111" stroke-width="6" stroke-linecap="round" fill="none"/>`;
  } else if (pose === "mind_blown") {
    leftArm = `<path d="M 0 -70 L -45 -110 L -25 -140" stroke="#111111" stroke-width="6" stroke-linecap="round" fill="none"/>`;
    rightArm = `<path d="M 0 -70 L 45 -110 L 25 -140" stroke="#111111" stroke-width="6" stroke-linecap="round" fill="none"/>`;
  } else if (pose === "waving") {
    leftArm = `<path d="M 0 -70 L -35 -20 L -30 20" stroke="#111111" stroke-width="6" stroke-linecap="round" fill="none"/>`;
    rightArm = `<path d="M 0 -70 L 40 -90 L 60 -130" stroke="#111111" stroke-width="6" stroke-linecap="round" fill="none"/>`;
  }

  // Eyes
  let eyesSvg = ``;
  if (eyeStyle === "deadpan_dots") {
    eyesSvg = `
      <circle cx="-16" cy="-10" r="5" fill="#111111"/>
      <circle cx="16" cy="-10" r="5" fill="#111111"/>
    `;
  } else if (eyeStyle === "normal") {
    eyesSvg = `
      <ellipse cx="-16" cy="-10" rx="14" ry="16" fill="#ffffff" stroke="#111111" stroke-width="3.5"/>
      <ellipse cx="16" cy="-10" rx="14" ry="16" fill="#ffffff" stroke="#111111" stroke-width="3.5"/>
      <circle cx="-13" cy="-10" r="5" fill="#111111"/>
      <circle cx="19" cy="-10" r="5" fill="#111111"/>
    `;
  } else if (eyeStyle === "shock") {
    eyesSvg = `
      <circle cx="-18" cy="-10" r="16" fill="#ffffff" stroke="#111111" stroke-width="4"/>
      <circle cx="18" cy="-10" r="16" fill="#ffffff" stroke="#111111" stroke-width="4"/>
      <circle cx="-18" cy="-10" r="4" fill="#111111"/>
      <circle cx="18" cy="-10" r="4" fill="#111111"/>
    `;
  } else if (eyeStyle === "eye_pop") {
    eyesSvg = `
      <!-- Springs -->
      <path d="M -18 -10 Q -28 -30 -38 -20 Q -48 -40 -38 -50" fill="none" stroke="#dc2626" stroke-width="3"/>
      <path d="M 18 -10 Q 28 -30 38 -20 Q 48 -40 38 -50" fill="none" stroke="#dc2626" stroke-width="3"/>
      <!-- Popped Eyes -->
      <circle cx="-38" cy="-50" r="22" fill="#ffffff" stroke="#111111" stroke-width="4.5"/>
      <circle cx="38" cy="-50" r="22" fill="#ffffff" stroke="#111111" stroke-width="4.5"/>
      <circle cx="-38" cy="-50" r="7" fill="#dc2626"/>
      <circle cx="38" cy="-50" r="7" fill="#dc2626"/>
    `;
  } else if (eyeStyle === "squint") {
    eyesSvg = `
      <line x1="-28" y1="-10" x2="-6" y2="-10" stroke="#111111" stroke-width="5" stroke-linecap="round"/>
      <line x1="6" y1="-10" x2="28" y2="-10" stroke="#111111" stroke-width="5" stroke-linecap="round"/>
    `;
  } else if (eyeStyle === "closed") {
    eyesSvg = `
      <path d="M -26 -8 Q -16 -16 -6 -8" fill="none" stroke="#111111" stroke-width="4" stroke-linecap="round"/>
      <path d="M 6 -8 Q 16 -16 26 -8" fill="none" stroke="#111111" stroke-width="4" stroke-linecap="round"/>
    `;
  } else if (eyeStyle === "side_eye") {
    eyesSvg = `
      <ellipse cx="-16" cy="-10" rx="14" ry="16" fill="#ffffff" stroke="#111111" stroke-width="3.5"/>
      <ellipse cx="16" cy="-10" rx="14" ry="16" fill="#ffffff" stroke="#111111" stroke-width="3.5"/>
      <circle cx="-22" cy="-10" r="5" fill="#111111"/>
      <circle cx="10" cy="-10" r="5" fill="#111111"/>
    `;
  } else if (eyeStyle === "rolling") {
    eyesSvg = `
      <ellipse cx="-16" cy="-10" rx="14" ry="16" fill="#ffffff" stroke="#111111" stroke-width="3.5"/>
      <ellipse cx="16" cy="-10" rx="14" ry="16" fill="#ffffff" stroke="#111111" stroke-width="3.5"/>
      <circle cx="-16" cy="-20" r="5" fill="#111111"/>
      <circle cx="16" cy="-20" r="5" fill="#111111"/>
    `;
  } else if (eyeStyle === "tear_crying") {
    eyesSvg = `
      <ellipse cx="-16" cy="-10" rx="14" ry="16" fill="#ffffff" stroke="#111111" stroke-width="3.5"/>
      <ellipse cx="16" cy="-10" rx="14" ry="16" fill="#ffffff" stroke="#111111" stroke-width="3.5"/>
      <circle cx="-16" cy="-10" r="5" fill="#111111"/>
      <circle cx="16" cy="-10" r="5" fill="#111111"/>
      <!-- Streaming Cyan Tears -->
      <path d="M -22 4 Q -26 30 -22 65" stroke="#38bdf8" stroke-width="8" stroke-linecap="round" fill="none"/>
      <path d="M 22 4 Q 26 30 22 65" stroke="#38bdf8" stroke-width="8" stroke-linecap="round" fill="none"/>
    `;
  } else if (eyeStyle === "sparkle_star") {
    eyesSvg = `
      <!-- Golden 4-point Anime Stars -->
      <g transform="translate(-16, -10)">
        <polygon points="0,-16 4,-4 16,0 4,4 0,16 -4,4 -16,0 -4,-4" fill="#eab308" stroke="#ca8a04" stroke-width="2"/>
      </g>
      <g transform="translate(16, -10)">
        <polygon points="0,-16 4,-4 16,0 4,4 0,16 -4,4 -16,0 -4,-4" fill="#eab308" stroke="#ca8a04" stroke-width="2"/>
      </g>
    `;
  } else if (eyeStyle === "laser") {
    eyesSvg = `
      <circle cx="-16" cy="-10" r="10" fill="#ef4444" filter="url(#glow)"/>
      <circle cx="16" cy="-10" r="10" fill="#ef4444" filter="url(#glow)"/>
      <line x1="-16" y1="-10" x2="-120" y2="-10" stroke="#ef4444" stroke-width="6" stroke-linecap="round" filter="url(#glow)"/>
      <line x1="16" y1="-10" x2="120" y2="-10" stroke="#ef4444" stroke-width="6" stroke-linecap="round" filter="url(#glow)"/>
    `;
  } else if (eyeStyle === "tim_burton") {
    eyesSvg = `
      <circle cx="-18" cy="-10" r="18" fill="#1e293b" stroke="#0f172a" stroke-width="4"/>
      <circle cx="18" cy="-10" r="18" fill="#1e293b" stroke="#0f172a" stroke-width="4"/>
      <circle cx="-18" cy="-10" r="3" fill="#ffffff"/>
      <circle cx="18" cy="-10" r="3" fill="#ffffff"/>
    `;
  } else if (eyeStyle === "ps1") {
    eyesSvg = `
      <polygon points="-26,-18 -8,-18 -17,-2" fill="none" stroke="#111111" stroke-width="3.5"/>
      <polygon points="8,-18 26,-18 17,-2" fill="none" stroke="#111111" stroke-width="3.5"/>
      <circle cx="-17" cy="-10" r="3" fill="#111111"/>
      <circle cx="17" cy="-10" r="3" fill="#111111"/>
    `;
  }

  // Eyebrows
  let browsSvg = ``;
  if (eyebrowStyle === "rock_arch") {
    // The Rock: Left raised high, right flat/low
    browsSvg = `
      <path d="M -30 -34 Q -16 -46 -4 -34" fill="none" stroke="#111111" stroke-width="4.5" stroke-linecap="round"/>
      <path d="M 6 -24 L 28 -22" fill="none" stroke="#111111" stroke-width="4.5" stroke-linecap="round"/>
    `;
  } else if (eyebrowStyle === "furrowed") {
    browsSvg = `
      <line x1="-30" y1="-22" x2="-6" y2="-32" stroke="#111111" stroke-width="4.5" stroke-linecap="round"/>
      <line x1="30" y1="-22" x2="6" y2="-32" stroke="#111111" stroke-width="4.5" stroke-linecap="round"/>
    `;
  } else if (eyebrowStyle === "worried") {
    browsSvg = `
      <path d="M -30 -32 Q -18 -22 -6 -32" fill="none" stroke="#111111" stroke-width="4.5" stroke-linecap="round"/>
      <path d="M 6 -32 Q 18 -22 30 -32" fill="none" stroke="#111111" stroke-width="4.5" stroke-linecap="round"/>
    `;
  } else if (eyebrowStyle === "raised") {
    browsSvg = `
      <path d="M -28 -34 Q -16 -44 -4 -34" fill="none" stroke="#111111" stroke-width="4.5" stroke-linecap="round"/>
      <path d="M 4 -34 Q 16 -44 28 -34" fill="none" stroke="#111111" stroke-width="4.5" stroke-linecap="round"/>
    `;
  } else {
    browsSvg = `
      <line x1="-28" y1="-28" x2="-6" y2="-28" stroke="#111111" stroke-width="4.5" stroke-linecap="round"/>
      <line x1="6" y1="-28" x2="28" y2="-28" stroke="#111111" stroke-width="4.5" stroke-linecap="round"/>
    `;
  }

  // Mouths
  let mouthSvg = ``;
  if (mouthShape === "deadpan_line") {
    mouthSvg = `<line x1="-16" y1="18" x2="16" y2="18" stroke="#111111" stroke-width="4.5" stroke-linecap="round"/>`;
  } else if (mouthShape === "smirk") {
    mouthSvg = `<path d="M -12 18 Q 4 16 16 10" fill="none" stroke="#111111" stroke-width="4.5" stroke-linecap="round"/>`;
  } else if (mouthShape === "slight_smile") {
    mouthSvg = `<path d="M -16 14 Q 0 24 16 14" fill="none" stroke="#111111" stroke-width="4" stroke-linecap="round"/>`;
  } else if (mouthShape === "wide_grin") {
    mouthSvg = `
      <path d="M -22 10 Q 0 32 22 10 Z" fill="#ffffff" stroke="#111111" stroke-width="4"/>
      <line x1="-22" y1="10" x2="22" y2="10" stroke="#111111" stroke-width="3"/>
    `;
  } else if (mouthShape === "smile_teeth") {
    mouthSvg = `
      <rect x="-18" y="10" width="36" height="16" rx="4" fill="#ffffff" stroke="#111111" stroke-width="3.5"/>
      <line x1="-18" y1="18" x2="18" y2="18" stroke="#111111" stroke-width="2"/>
    `;
  } else if (mouthShape === "talking_open") {
    mouthSvg = `
      <path d="M -16 12 Q 0 8 16 12 Q 0 32 -16 12 Z" fill="#2b0a0a" stroke="#111111" stroke-width="3.5"/>
      <path d="M -8 24 Q 0 20 8 24" fill="#f43f5e" stroke="none"/>
    `;
  } else if (mouthShape === "open_o") {
    mouthSvg = `<ellipse cx="0" cy="18" rx="10" ry="14" fill="#2b0a0a" stroke="#111111" stroke-width="3.5"/>`;
  } else if (mouthShape === "jaw_drop") {
    mouthSvg = `<rect x="-12" y="10" width="24" height="42" rx="10" fill="#2b0a0a" stroke="#111111" stroke-width="4"/>`;
  } else if (mouthShape === "scream") {
    mouthSvg = `
      <ellipse cx="0" cy="22" rx="20" ry="24" fill="#2b0a0a" stroke="#111111" stroke-width="4"/>
      <path d="M -12 34 Q 0 24 12 34" fill="#f43f5e"/>
    `;
  } else if (mouthShape === "cringe_wavy") {
    mouthSvg = `<path d="M -18 18 Q -9 12 0 18 Q 9 24 18 18" fill="none" stroke="#111111" stroke-width="4.5" stroke-linecap="round"/>`;
  } else if (mouthShape === "faint") {
    mouthSvg = `<ellipse cx="0" cy="20" rx="14" ry="8" fill="#111111"/>`;
  }

  // Comic FX
  let fxSvg = ``;
  if (comicFx === "sweat_drop") {
    fxSvg = `
      <g transform="translate(42, -50)">
        <path d="M 0 -18 C 8 -10 8 10 0 14 C -8 10 -8 -10 0 -18 Z" fill="#38bdf8" stroke="#0284c7" stroke-width="2"/>
      </g>
    `;
  } else if (comicFx === "question_marks") {
    fxSvg = `
      <g transform="translate(38, -65)">
        <text x="0" y="0" font-family="'Impact', sans-serif" font-size="28" fill="#ec4899" font-weight="bold">?</text>
        <text x="14" y="-12" font-family="'Impact', sans-serif" font-size="20" fill="#f43f5e" font-weight="bold">?</text>
      </g>
    `;
  } else if (comicFx === "exclamation") {
    fxSvg = `
      <g transform="translate(0, -95)">
        <polygon points="0,-25 8,-10 25,-8 12,5 18,22 0,12 -18,22 -12,5 -25,-8 -8,-10" fill="#fde047" stroke="#eab308" stroke-width="2"/>
        <text x="0" y="8" font-family="'Impact', sans-serif" font-size="34" fill="#dc2626" text-anchor="middle">!</text>
      </g>
    `;
  } else if (comicFx === "shock_lightning") {
    fxSvg = `
      <g transform="translate(0, -90)">
        <path d="M -10 -25 L 12 -5 L -4 0 L 10 25" fill="none" stroke="#eab308" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" filter="url(#glow)"/>
      </g>
    `;
  } else if (comicFx === "speed_lines") {
    fxSvg = `
      <g stroke="#94a3b8" stroke-width="3" opacity="0.6">
        <line x1="-120" y1="-80" x2="-60" y2="-80"/>
        <line x1="-140" y1="-40" x2="-70" y2="-40"/>
        <line x1="-110" y1="0" x2="-50" y2="0"/>
      </g>
    `;
  } else if (comicFx === "sparkles") {
    fxSvg = `
      <g transform="translate(45, -70)">
        <polygon points="0,-12 3,-3 12,0 3,3 0,12 -3,3 -12,0 -3,-3" fill="#fde047"/>
      </g>
      <g transform="translate(-45, -60)">
        <polygon points="0,-8 2,-2 8,0 2,2 0,8 -2,2 -8,0 -2,-2" fill="#fde047"/>
      </g>
    `;
  }

  const svg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="-200 -220 400 440" width="400" height="440">
  <defs>
    <filter id="cardShadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="8" stdDeviation="10" flood-color="#000000" flood-opacity="0.12"/>
    </filter>
    <filter id="glow" x="-30%" y="-30%" width="160%" height="160%">
      <feGaussianBlur stdDeviation="6" result="blur"/>
      <feMerge>
        <feMergeNode in="blur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
  </defs>

  <!-- Clean Canvas Card -->
  <rect x="-190" y="-210" width="380" height="420" rx="20" fill="#ffffff" stroke="#e2e8f0" stroke-width="3" filter="url(#cardShadow)"/>

  <!-- Character Rig -->
  <g transform="translate(0, 70)">
    <!-- Ground Shadow -->
    <ellipse cx="0" cy="115" rx="55" ry="12" fill="#000000" opacity="0.15"/>

    <!-- Body Spine -->
    <line x1="0" y1="-80" x2="0" y2="40" stroke="#111111" stroke-width="7" stroke-linecap="round"/>

    <!-- Legs -->
    <line x1="0" y1="40" x2="-35" y2="110" stroke="#111111" stroke-width="7" stroke-linecap="round"/>
    <line x1="0" y1="40" x2="35" y2="110" stroke="#111111" stroke-width="7" stroke-linecap="round"/>

    <!-- Arms -->
    ${leftArm}
    ${rightArm}

    <!-- Head Group with Tilt -->
    <g transform="translate(0, -135) rotate(${headTilt})">
      <!-- Hair Back Layer -->
      <path d="M -45 -15 C -65 -35 -40 -75 0 -70 C 40 -75 65 -35 45 -15 C 60 10 35 45 35 45 C 35 45 -35 45 -45 -15 Z" fill="#1e293b"/>
      
      <!-- Head Base (Oval) -->
      <ellipse cx="0" cy="0" rx="52" ry="46" fill="#fddfb0" stroke="#111111" stroke-width="6"/>

      <!-- Floppy Front Hair Strand -->
      <path d="M -48 -25 C -55 -60 10 -75 42 -40 C 30 -30 20 -20 15 -25 C 0 -45 -30 -35 -48 -25 Z" fill="#1e293b"/>
      <path d="M 32 -10 C 50 15 40 42 32 40 C 24 35 30 10 32 -10 Z" fill="#1e293b"/>

      <!-- Facial Elements -->
      ${eyesSvg}
      ${browsSvg}
      ${mouthSvg}
      ${fxSvg}
    </g>
  </g>

  <!-- Expression Label Badge -->
  <rect x="-170" y="165" width="340" height="34" rx="8" fill="#f1f5f9"/>
  <text x="0" y="188" font-family="'Impact', sans-serif" font-size="16" fill="#0f172a" letter-spacing="1" text-anchor="middle">
    ${name.toUpperCase()} (#${id})
  </text>
</svg>
  `.trim();

  return svg;
}

// Generate all 100 SVG assets into category subdirectories AND root
console.log(`Generating 100 distinct Alex Meyers character expression assets...`);

for (const expr of EXPRESSIONS) {
  const catDir = path.join(OUTPUT_DIR, expr.category);
  if (!fs.existsSync(catDir)) {
    fs.mkdirSync(catDir, { recursive: true });
  }

  const svgContent = renderCharacterAssetSvg(expr);

  // Write to category subdir and root dir
  const catFilePath = path.join(catDir, `${expr.id}.svg`);
  const rootFilePath = path.join(OUTPUT_DIR, `${expr.id}.svg`);
  
  fs.writeFileSync(catFilePath, svgContent);
  fs.writeFileSync(rootFilePath, svgContent);
}

// Generate an HTML Visual Index / Sticker Sheet to browse all 100 assets in a browser
const indexHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Alex Meyers Stick Figure Expression Asset Library (100 Expressions)</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; background: #0f172a; color: #f8fafc; margin: 0; padding: 30px; }
    h1 { text-align: center; color: #38bdf8; font-size: 32px; margin-bottom: 8px; }
    p.subtitle { text-align: center; color: #94a3b8; font-size: 16px; margin-bottom: 32px; }
    .category-section { margin-bottom: 40px; }
    .category-title { font-size: 22px; font-weight: bold; color: #f43f5e; border-bottom: 2px solid #334155; padding-bottom: 8px; margin-bottom: 20px; text-transform: uppercase; letter-spacing: 1px; }
    .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 20px; }
    .card { background: #1e293b; border-radius: 14px; border: 1px solid #334155; overflow: hidden; text-align: center; padding: 12px; transition: transform 0.2s, border-color 0.2s; }
    .card:hover { transform: translateY(-4px); border-color: #38bdf8; }
    .card img { width: 100%; height: auto; display: block; border-radius: 8px; background: #fff; }
    .card .title { font-size: 14px; font-weight: bold; margin-top: 10px; color: #f8fafc; }
    .card .id-tag { font-size: 11px; color: #38bdf8; font-family: monospace; margin-top: 4px; }
    .card .desc { font-size: 12px; color: #94a3b8; margin-top: 6px; line-height: 1.3; }
  </style>
</head>
<body>
  <h1>Alex Meyers Stick Figure Expression Library</h1>
  <p class="subtitle">100 Comprehensive, Vector Character Expressions for Comedy & Storytelling</p>

  ${Array.from(new Set(EXPRESSIONS.map(e => e.category))).map(cat => `
    <div class="category-section">
      <div class="category-title">${cat} (${EXPRESSIONS.filter(e => e.category === cat).length} expressions)</div>
      <div class="grid">
        ${EXPRESSIONS.filter(e => e.category === cat).map(expr => `
          <div class="card">
            <img src="${expr.category}/${expr.id}.svg" alt="${expr.name}"/>
            <div class="title">${expr.name}</div>
            <div class="id-tag">#${expr.id}</div>
            <div class="desc">${expr.desc}</div>
          </div>
        `).join('')}
      </div>
    </div>
  `).join('')}
</body>
</html>
`.trim();

fs.writeFileSync(path.join(OUTPUT_DIR, 'index.html'), indexHtml);

console.log(`✅ Successfully generated ${EXPRESSIONS.length} character expression SVG assets in ${OUTPUT_DIR}`);
console.log(`📄 Visual browser index generated at ${OUTPUT_DIR}/index.html`);

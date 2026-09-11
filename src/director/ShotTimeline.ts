// Auto-generated 89-Beat Master Movie Timeline
// Each beat represents a 5-8s directed cinematic scene with hard cuts, camera framing, and active staging

export interface MovieBeat {
  beatId: number;
  startSec: number;
  endSec: number;
  dur: number;
  bgId: string;
  actor: {
    id: string;
    x: number;
    y: number;
    scale: number;
    gender: string;
    hairStyle: string;
    clothes: string;
    expression: string;
    pose: string;
  };
  camera: {
    x: number;
    y: number;
    zoom: number;
    targetX?: number;
    targetY?: number;
    targetZoom?: number;
    move?: string;
    transition?: string;
    energy?: number;
    impactShake?: boolean;
  };
  activeProp?: null | {
    id: string;
    x: number;
    y: number;
    scale: number;
  };
  bannerText?: string | null;
  graphicType?: string | null;
  text: string;
}

export const MOVIE_BEATS: MovieBeat[] = [
  {
    "beatId": 1,
    "startSec": 0.0,
    "endSec": 8.0,
    "dur": 8.0,
    "bgId": "BG-HOLLYWOOD",
    "actor": {
      "id": "actor_1",
      "x": 780,
      "y": 640,
      "scale": 1.34,
      "gender": "female",
      "hairStyle": "female_long_brunette",
      "clothes": "dress_red_carpet",
      "expression": "smug_chef_kiss",
      "pose": "waving"
    },
    "camera": {
      "x": 960,
      "y": 520,
      "zoom": 1.15
    },
    "activeProp": {
      "id": "PROP-PHONE",
      "x": 1360,
      "y": 460,
      "scale": 1.3
    },
    "bannerText": "HOLLYWOOD RED CARPET",
    "graphicType": "POPUP",
    "text": "Ifyou've you\u2019ve looked at a red carpet, a movie screen, or your Instagram feed anytime in the last eighteen months, you might have noticed a slight shift in the local Hollywood ecosystem."
  },
  {
    "beatId": 2,
    "startSec": 8.62,
    "endSec": 14.78,
    "dur": 6.16,
    "bgId": "BG-OFFICE",
    "actor": {
      "id": "actor_2",
      "x": 680,
      "y": 640,
      "scale": 1.34,
      "gender": "tech_bro",
      "hairStyle": "male_tech_bro",
      "clothes": "tech_fleece_vest",
      "expression": "smug_finger_guns",
      "pose": "finger_guns"
    },
    "camera": {
      "x": 960,
      "y": 520,
      "zoom": 1.45
    },
    "activeProp": {
      "id": "PROP-MONEY",
      "x": 1320,
      "y": 440,
      "scale": 1.3
    },
    "bannerText": "THICC -> STICK PIVOT",
    "graphicType": "SLIDER",
    "text": "The timeline has gone from \u201cThicc\u201d to \u201cstick\u201d faster than a tech bro pivoting from crypto to artificial intelligence."
  },
  {
    "beatId": 3,
    "startSec": 15.334,
    "endSec": 22.214,
    "dur": 6.88,
    "bgId": "BG-HOLLYWOOD",
    "actor": {
      "id": "actor_3",
      "x": 960,
      "y": 640,
      "scale": 1.34,
      "gender": "female",
      "hairStyle": "female_bob_bangs",
      "clothes": "dress_black",
      "expression": "cringe_teeth_grit",
      "pose": "neutral"
    },
    "camera": {
      "x": 960,
      "y": 480,
      "zoom": 1.75
    },
    "activeProp": {
      "id": "PROP-FACE",
      "x": 960,
      "y": 440,
      "scale": 1.6
    },
    "bannerText": "CALIPER: 0.02 mm FAT",
    "graphicType": "RADAR",
    "text": "Suddenly, everywhere you look, celebrities like Jenna Ortega , Emma Stone, and Ariana Grande are looking noticeably leaner."
  },
  {
    "beatId": 4,
    "startSec": 22.805,
    "endSec": 29.925,
    "dur": 7.12,
    "bgId": "BG-KITCHEN",
    "actor": {
      "id": "actor_4",
      "x": 650,
      "y": 640,
      "scale": 1.34,
      "gender": "male",
      "hairStyle": "host_classic",
      "clothes": "suit",
      "expression": "rage_clenched_fists",
      "pose": "pointing_right"
    },
    "camera": {
      "x": 960,
      "y": 520,
      "zoom": 1.35
    },
    "activeProp": {
      "id": "PROP-FOOD",
      "x": 1280,
      "y": 480,
      "scale": 1.4
    },
    "bannerText": "CANCEL CARBOHYDRATES",
    "graphicType": "STAMP",
    "text": "It seems like overnight, the entire entertainment industry decided to collectively unsubscribe from carbohydrates and cancel their"
  },
  {
    "beatId": 5,
    "startSec": 29.925,
    "endSec": 36.647,
    "dur": 6.722,
    "bgId": "BG-KITCHEN",
    "actor": {
      "id": "actor_5",
      "x": 650,
      "y": 640,
      "scale": 1.34,
      "gender": "male",
      "hairStyle": "host_classic",
      "clothes": "suit",
      "expression": "rage_clenched_fists",
      "pose": "pointing_right"
    },
    "camera": {
      "x": 960,
      "y": 520,
      "zoom": 1.35
    },
    "activeProp": {
      "id": "PROP-FOOD",
      "x": 1280,
      "y": 480,
      "scale": 1.4
    },
    "bannerText": "CANCEL CARBOHYDRATES",
    "graphicType": "STAMP",
    "text": "biological subscription to the concept of lunch. But why is everyone suddenly speedrunning the Tim Burton aesthetic"
  },
  {
    "beatId": 6,
    "startSec": 36.887,
    "endSec": 43.127,
    "dur": 6.24,
    "bgId": "BG-GOTHIC",
    "actor": {
      "id": "actor_6",
      "x": 650,
      "y": 640,
      "scale": 1.34,
      "gender": "male",
      "hairStyle": "host_classic",
      "clothes": "suit",
      "expression": "confused_squint",
      "pose": "pointing_right"
    },
    "camera": {
      "x": 960,
      "y": 500,
      "zoom": 1.55
    },
    "activeProp": {
      "id": "PROP-GAME",
      "x": 1360,
      "y": 440,
      "scale": 1.3
    },
    "bannerText": "PS1 GRAPHICS",
    "graphicType": "POPUP",
    "text": "? The aggressive return of the 90s, and why your favorite actors are starting to look likethey're they\u2019re rendered in low-poly PS1 graphics."
  },
  {
    "beatId": 7,
    "startSec": 43.729,
    "endSec": 50.746,
    "dur": 7.017,
    "bgId": "BG-RETRO",
    "actor": {
      "id": "actor_7",
      "x": 960,
      "y": 640,
      "scale": 1.34,
      "gender": "male",
      "hairStyle": "host_classic",
      "clothes": "none",
      "expression": "confused_squint",
      "pose": "shrugging"
    },
    "camera": {
      "x": 960,
      "y": 520,
      "zoom": 1.4
    },
    "activeProp": {
      "id": "PROP-GAME",
      "x": 1360,
      "y": 440,
      "scale": 1.3
    },
    "bannerText": "PS1 CHARACTER CREATOR: 4% VOLUME",
    "graphicType": null,
    "text": "To understand where we are right now, we have to look at where we've we\u2019ve been. Human beauty standards operate on a giant, terrifying pendulum"
  },
  {
    "beatId": 8,
    "startSec": 50.746,
    "endSec": 56.666,
    "dur": 5.92,
    "bgId": "BG-RETRO",
    "actor": {
      "id": "actor_8",
      "x": 960,
      "y": 640,
      "scale": 1.34,
      "gender": "male",
      "hairStyle": "host_classic",
      "clothes": "none",
      "expression": "confused_squint",
      "pose": "shrugging"
    },
    "camera": {
      "x": 960,
      "y": 520,
      "zoom": 1.4
    },
    "activeProp": {
      "id": "PROP-GAME",
      "x": 1360,
      "y": 440,
      "scale": 1.3
    },
    "bannerText": "PS1 CHARACTER CREATOR: 4% VOLUME",
    "graphicType": null,
    "text": "that swings wildly depending on whatever makes regular, working -class people feel the absolute worst about themselves at any"
  },
  {
    "beatId": 9,
    "startSec": 56.666,
    "endSec": 65.249,
    "dur": 8.583,
    "bgId": "BG-90S",
    "actor": {
      "id": "actor_9",
      "x": 780,
      "y": 640,
      "scale": 1.34,
      "gender": "female",
      "hairStyle": "female_blonde",
      "clothes": "dress_black",
      "expression": "deadpan_soul_stare",
      "pose": "neutral"
    },
    "camera": {
      "x": 960,
      "y": 500,
      "zoom": 1.6
    },
    "activeProp": null,
    "bannerText": "HEROIN CHIC",
    "graphicType": null,
    "text": "given time. If we rewind to the 90s and early 2000s, we had an era affectionately dubbed \u201cHeroin Chick.\u201d This was pioneered by models like Kate"
  },
  {
    "beatId": 10,
    "startSec": 65.249,
    "endSec": 72.129,
    "dur": 6.88,
    "bgId": "BG-STUDIO",
    "actor": {
      "id": "actor_10",
      "x": 780,
      "y": 640,
      "scale": 1.34,
      "gender": "female",
      "hairStyle": "female_blonde",
      "clothes": "dress_black",
      "expression": "deadpan_soul_stare",
      "pose": "neutral"
    },
    "camera": {
      "x": 960,
      "y": 520,
      "zoom": 1.25
    },
    "activeProp": {
      "id": "PROP-PEND",
      "x": 960,
      "y": 300,
      "scale": 1.6
    },
    "bannerText": "DIET COKE & APATHY",
    "graphicType": null,
    "text": "Moss, and the overarching goal was to look like you sustained yourself entirely on Diet Coke, Parliament cigarettes, and pure"
  },
  {
    "beatId": 11,
    "startSec": 72.209,
    "endSec": 79.634,
    "dur": 7.425,
    "bgId": "BG-GOTHIC",
    "actor": {
      "id": "actor_11",
      "x": 780,
      "y": 640,
      "scale": 1.34,
      "gender": "female",
      "hairStyle": "female_gothic_waves",
      "clothes": "victorian_mourning",
      "expression": "deadpan_soul_stare",
      "pose": "neutral"
    },
    "camera": {
      "x": 960,
      "y": 520,
      "zoom": 1.25
    },
    "activeProp": {
      "id": "PROP-PEND",
      "x": 960,
      "y": 300,
      "scale": 1.6
    },
    "bannerText": "VICTORIAN CHIC",
    "graphicType": null,
    "text": ", unfiltered apathy. You were supposed to look like you were perpetually recovering from a minor Victorian wasting disease, but in a cool, fashionable"
  },
  {
    "beatId": 12,
    "startSec": 79.634,
    "endSec": 89.5,
    "dur": 9.866,
    "bgId": "BG-STUDIO",
    "actor": {
      "id": "actor_12",
      "x": 960,
      "y": 640,
      "scale": 1.34,
      "gender": "male",
      "hairStyle": "host_classic",
      "clothes": "none",
      "expression": "fear_sweat_freeze",
      "pose": "flail"
    },
    "camera": {
      "x": 960,
      "y": 520,
      "zoom": 1.25
    },
    "activeProp": {
      "id": "PROP-PEND",
      "x": 960,
      "y": 300,
      "scale": 1.6
    },
    "bannerText": "BEAUTY STANDARD PENDULUM",
    "graphicType": null,
    "text": "way. Then, as the 2010s rolled around, the pendulum swung violently in the opposite direction. We entered the era of the BBL, or Brazilian Butt Lift, where"
  },
  {
    "beatId": 13,
    "startSec": 89.5,
    "endSec": 97.231,
    "dur": 7.731,
    "bgId": "BG-CLINIC",
    "actor": {
      "id": "actor_13",
      "x": 780,
      "y": 640,
      "scale": 1.34,
      "gender": "female",
      "hairStyle": "female_blonde_curls",
      "clothes": "dress_black",
      "expression": "smug_rock_eyebrow",
      "pose": "waving"
    },
    "camera": {
      "x": 960,
      "y": 520,
      "zoom": 1.35
    },
    "activeProp": {
      "id": "PROP-SURGERY",
      "x": 1320,
      "y": 440,
      "scale": 1.3
    },
    "bannerText": "BUYING CURVES",
    "graphicType": null,
    "text": "the ideal body type shifted to what biologists might classify as \u201cPixar Mom.\u201d Celebrities were suddenly buying curves, and the internet was"
  },
  {
    "beatId": 14,
    "startSec": 97.231,
    "endSec": 103.871,
    "dur": 6.64,
    "bgId": "BG-GYM",
    "actor": {
      "id": "actor_14",
      "x": 780,
      "y": 640,
      "scale": 1.34,
      "gender": "female",
      "hairStyle": "female_blonde_curls",
      "clothes": "dress_black",
      "expression": "smug_rock_eyebrow",
      "pose": "waving"
    },
    "camera": {
      "x": 960,
      "y": 520,
      "zoom": 1.35
    },
    "activeProp": {
      "id": "PROP-GYM",
      "x": 1360,
      "y": 440,
      "scale": 1.3
    },
    "bannerText": "SQUATS (SURE)",
    "graphicType": null,
    "text": "flooded with fitness influencers who insisted their new, localized gravitational pull was entirely due to doing a lot of squats"
  },
  {
    "beatId": 15,
    "startSec": 104.111,
    "endSec": 111.399,
    "dur": 7.288,
    "bgId": "BG-CLINIC",
    "actor": {
      "id": "actor_15",
      "x": 780,
      "y": 640,
      "scale": 1.34,
      "gender": "female",
      "hairStyle": "female_blonde_curls",
      "clothes": "dress_black",
      "expression": "smug_rock_eyebrow",
      "pose": "flexing"
    },
    "camera": {
      "x": 960,
      "y": 520,
      "zoom": 1.35
    },
    "activeProp": {
      "id": "PROP-MIRROR",
      "x": 1360,
      "y": 440,
      "scale": 1.3
    },
    "bannerText": "ULTIMATE FLEX",
    "graphicType": null,
    "text": ", despite the fact that their calves and forearms remained the exact same size. For about ten years, the ultimate flex was looking like an hourglass"
  },
  {
    "beatId": 16,
    "startSec": 111.399,
    "endSec": 120.598,
    "dur": 9.199,
    "bgId": "BG-STUDIO",
    "actor": {
      "id": "actor_16",
      "x": 780,
      "y": 640,
      "scale": 1.34,
      "gender": "female",
      "hairStyle": "female_high_ponytail",
      "clothes": "crop_top_leggings",
      "expression": "shock_eye_pop",
      "pose": "pointing_right"
    },
    "camera": {
      "x": 960,
      "y": 520,
      "zoom": 1.35
    },
    "activeProp": {
      "id": "PROP-BILLBOARD",
      "x": 1360,
      "y": 440,
      "scale": 1.3
    },
    "bannerText": "2016 BBL: 10,000G GRAVITY",
    "graphicType": null,
    "text": "that had been overfilled at the bottom. During this exact same time, society also pushed heavily for \u201cbody positivity.\u201d We were told by countless brands and PR agencies"
  },
  {
    "beatId": 17,
    "startSec": 120.598,
    "endSec": 128.838,
    "dur": 8.24,
    "bgId": "BG-STUDIO",
    "actor": {
      "id": "actor_17",
      "x": 780,
      "y": 640,
      "scale": 1.34,
      "gender": "female",
      "hairStyle": "female_high_ponytail",
      "clothes": "crop_top_leggings",
      "expression": "shock_eye_pop",
      "pose": "pointing_right"
    },
    "camera": {
      "x": 960,
      "y": 520,
      "zoom": 1.35
    },
    "activeProp": {
      "id": "PROP-BILLBOARD",
      "x": 1360,
      "y": 440,
      "scale": 1.3
    },
    "bannerText": "2016 BBL: 10,000G GRAVITY",
    "graphicType": null,
    "text": "that all bodies are beautiful, that youdon't don\u2019t have to be a size zero to be a leading lady, and that Hollywood was finally progressing past its shallow, aesthetic-obsessed roots."
  },
  {
    "beatId": 18,
    "startSec": 129.384,
    "endSec": 135.384,
    "dur": 6.0,
    "bgId": "BG-STUDIO",
    "actor": {
      "id": "actor_18",
      "x": 780,
      "y": 640,
      "scale": 1.34,
      "gender": "female",
      "hairStyle": "female_high_ponytail",
      "clothes": "crop_top_leggings",
      "expression": "shock_eye_pop",
      "pose": "pointing_right"
    },
    "camera": {
      "x": 960,
      "y": 520,
      "zoom": 1.35
    },
    "activeProp": {
      "id": "PROP-BILLBOARD",
      "x": 1360,
      "y": 440,
      "scale": 1.3
    },
    "bannerText": "2016 BBL: 10,000G GRAVITY",
    "graphicType": null,
    "text": "Well, it turns out, body positivity was less of a permanent cultural shift and more of a temporary trend\u2014kind of like fidget spinners"
  },
  {
    "beatId": 19,
    "startSec": 135.384,
    "endSec": 144.028,
    "dur": 8.644,
    "bgId": "BG-STUDIO",
    "actor": {
      "id": "actor_19",
      "x": 780,
      "y": 640,
      "scale": 1.34,
      "gender": "female",
      "hairStyle": "female_high_ponytail",
      "clothes": "crop_top_leggings",
      "expression": "shock_eye_pop",
      "pose": "pointing_right"
    },
    "camera": {
      "x": 960,
      "y": 520,
      "zoom": 1.35
    },
    "activeProp": {
      "id": "PROP-BILLBOARD",
      "x": 1360,
      "y": 440,
      "scale": 1.3
    },
    "bannerText": "2016 BBL: 10,000G GRAVITY",
    "graphicType": null,
    "text": ", or pretending to care about yourfriend's friend\u2019s podcast. As soon as a pharmaceutical shortcut dropped that allowed rich people to just opt out of their natural body weight, the industry"
  },
  {
    "beatId": 20,
    "startSec": 144.028,
    "endSec": 150.268,
    "dur": 6.24,
    "bgId": "BG-OFFICE",
    "actor": {
      "id": "actor_20",
      "x": 780,
      "y": 640,
      "scale": 1.34,
      "gender": "male",
      "hairStyle": "male_tech_bro",
      "clothes": "suit",
      "expression": "smug_chef_kiss",
      "pose": "pointing_right"
    },
    "camera": {
      "x": 960,
      "y": 520,
      "zoom": 1.3
    },
    "activeProp": {
      "id": "PROP-BILLBOARD",
      "x": 1320,
      "y": 440,
      "scale": 1.2
    },
    "bannerText": "HOLLYWOOD PR BOARDROOM",
    "graphicType": null,
    "text": "abandoned the \u201cevery body is beautiful\u201d narrative with the swiftness of someone closing a browser tab when their boss walks by."
  },
  {
    "beatId": 21,
    "startSec": 150.857,
    "endSec": 156.537,
    "dur": 5.68,
    "bgId": "BG-OFFICE",
    "actor": {
      "id": "actor_21",
      "x": 780,
      "y": 640,
      "scale": 1.34,
      "gender": "male",
      "hairStyle": "male_tech_bro",
      "clothes": "suit",
      "expression": "smug_chef_kiss",
      "pose": "pointing_right"
    },
    "camera": {
      "x": 960,
      "y": 520,
      "zoom": 1.3
    },
    "activeProp": {
      "id": "PROP-BILLBOARD",
      "x": 1320,
      "y": 440,
      "scale": 1.2
    },
    "bannerText": "HOLLYWOOD PR BOARDROOM",
    "graphicType": null,
    "text": "Because right alongside the medical advancements, the fashion industry decided it was time to bring back Y2K fashion."
  },
  {
    "beatId": 22,
    "startSec": 157.1,
    "endSec": 163.18,
    "dur": 6.08,
    "bgId": "BG-OFFICE",
    "actor": {
      "id": "actor_22",
      "x": 780,
      "y": 640,
      "scale": 1.34,
      "gender": "male",
      "hairStyle": "male_tech_bro",
      "clothes": "suit",
      "expression": "smug_chef_kiss",
      "pose": "pointing_right"
    },
    "camera": {
      "x": 960,
      "y": 520,
      "zoom": 1.3
    },
    "activeProp": {
      "id": "PROP-BILLBOARD",
      "x": 1320,
      "y": 440,
      "scale": 1.2
    },
    "bannerText": "HOLLYWOOD PR BOARDROOM",
    "graphicType": null,
    "text": "And for those of you whodon't don\u2019t know, Y2K fashion is incredibly hostile to anyone who possesses internal organs."
  },
  {
    "beatId": 23,
    "startSec": 163.683,
    "endSec": 170.243,
    "dur": 6.56,
    "bgId": "BG-OFFICE",
    "actor": {
      "id": "actor_23",
      "x": 780,
      "y": 640,
      "scale": 1.34,
      "gender": "male",
      "hairStyle": "male_tech_bro",
      "clothes": "suit",
      "expression": "smug_chef_kiss",
      "pose": "pointing_right"
    },
    "camera": {
      "x": 960,
      "y": 520,
      "zoom": 1.3
    },
    "activeProp": {
      "id": "PROP-BILLBOARD",
      "x": 1320,
      "y": 440,
      "scale": 1.2
    },
    "bannerText": "HOLLYWOOD PR BOARDROOM",
    "graphicType": null,
    "text": "We are talking about low-rise jeans that sit below the pelvic bone, baby tees that offer the coverage of a moderately sized"
  },
  {
    "beatId": 24,
    "startSec": 170.243,
    "endSec": 176.163,
    "dur": 5.92,
    "bgId": "BG-OFFICE",
    "actor": {
      "id": "actor_24",
      "x": 780,
      "y": 640,
      "scale": 1.34,
      "gender": "male",
      "hairStyle": "male_tech_bro",
      "clothes": "suit",
      "expression": "smug_chef_kiss",
      "pose": "pointing_right"
    },
    "camera": {
      "x": 960,
      "y": 520,
      "zoom": 1.3
    },
    "activeProp": {
      "id": "PROP-BILLBOARD",
      "x": 1320,
      "y": 440,
      "scale": 1.2
    },
    "bannerText": "HOLLYWOOD PR BOARDROOM",
    "graphicType": null,
    "text": "napkin, and the infamous Miu Miu micro-skirt, which is essentially just a belt that costs two thousand dollars."
  },
  {
    "beatId": 25,
    "startSec": 176.771,
    "endSec": 182.851,
    "dur": 6.08,
    "bgId": "BG-OFFICE",
    "actor": {
      "id": "actor_25",
      "x": 780,
      "y": 640,
      "scale": 1.34,
      "gender": "male",
      "hairStyle": "male_tech_bro",
      "clothes": "suit",
      "expression": "smug_chef_kiss",
      "pose": "pointing_right"
    },
    "camera": {
      "x": 960,
      "y": 520,
      "zoom": 1.3
    },
    "activeProp": {
      "id": "PROP-BILLBOARD",
      "x": 1320,
      "y": 440,
      "scale": 1.2
    },
    "bannerText": "HOLLYWOOD PR BOARDROOM",
    "graphicType": null,
    "text": "You physically cannot participate in this trend if you have a functioning digestive tract that occasionally needs to process"
  },
  {
    "beatId": 26,
    "startSec": 182.851,
    "endSec": 191.7,
    "dur": 8.849,
    "bgId": "BG-OFFICE",
    "actor": {
      "id": "actor_26",
      "x": 960,
      "y": 640,
      "scale": 1.34,
      "gender": "male",
      "hairStyle": "male_tech_bro",
      "clothes": "hoodie",
      "expression": "fear_sweat_freeze",
      "pose": "facepalm"
    },
    "camera": {
      "x": 960,
      "y": 480,
      "zoom": 1.55
    },
    "activeProp": {
      "id": "PROP-BROWSER",
      "x": 960,
      "y": 340,
      "scale": 1.4
    },
    "bannerText": "CTRL + W: TREND CANCELLED",
    "graphicType": "STAMP",
    "text": "solid food. The fashion demanded thinness, and the medical industry provided the cheat code. The main driver of this current leanness is, of course, the GLP"
  },
  {
    "beatId": 27,
    "startSec": 191.7,
    "endSec": 197.7,
    "dur": 6.0,
    "bgId": "BG-OFFICE",
    "actor": {
      "id": "actor_27",
      "x": 960,
      "y": 640,
      "scale": 1.34,
      "gender": "male",
      "hairStyle": "male_tech_bro",
      "clothes": "hoodie",
      "expression": "fear_sweat_freeze",
      "pose": "facepalm"
    },
    "camera": {
      "x": 960,
      "y": 480,
      "zoom": 1.55
    },
    "activeProp": {
      "id": "PROP-BROWSER",
      "x": 960,
      "y": 340,
      "scale": 1.4
    },
    "bannerText": "CTRL + W: TREND CANCELLED",
    "graphicType": "STAMP",
    "text": "-1 receptor agonist, more commonly known by brand names like Ozempic, Wegovy, or Mounjaro."
  },
  {
    "beatId": 28,
    "startSec": 198.296,
    "endSec": 204.216,
    "dur": 5.92,
    "bgId": "BG-OFFICE",
    "actor": {
      "id": "actor_28",
      "x": 960,
      "y": 640,
      "scale": 1.34,
      "gender": "male",
      "hairStyle": "male_tech_bro",
      "clothes": "hoodie",
      "expression": "fear_sweat_freeze",
      "pose": "facepalm"
    },
    "camera": {
      "x": 960,
      "y": 480,
      "zoom": 1.55
    },
    "activeProp": {
      "id": "PROP-BROWSER",
      "x": 960,
      "y": 340,
      "scale": 1.4
    },
    "bannerText": "CTRL + W: TREND CANCELLED",
    "graphicType": "STAMP",
    "text": "Originally developed to manage type 2 diabetes, these drugs slow down gastric emptying and basically hack yourbrain's brain\u2019s reward"
  },
  {
    "beatId": 29,
    "startSec": 204.216,
    "endSec": 210.462,
    "dur": 6.246,
    "bgId": "BG-OFFICE",
    "actor": {
      "id": "actor_29",
      "x": 960,
      "y": 640,
      "scale": 1.34,
      "gender": "male",
      "hairStyle": "male_tech_bro",
      "clothes": "hoodie",
      "expression": "fear_sweat_freeze",
      "pose": "facepalm"
    },
    "camera": {
      "x": 960,
      "y": 480,
      "zoom": 1.55
    },
    "activeProp": {
      "id": "PROP-BROWSER",
      "x": 960,
      "y": 340,
      "scale": 1.4
    },
    "bannerText": "CTRL + W: TREND CANCELLED",
    "graphicType": "STAMP",
    "text": "system to tell you that you are completely full after eating half a saltine cracker. For a celebrity, this is the holy grail."
  },
  {
    "beatId": 30,
    "startSec": 210.913,
    "endSec": 216.753,
    "dur": 5.84,
    "bgId": "BG-OFFICE",
    "actor": {
      "id": "actor_30",
      "x": 960,
      "y": 640,
      "scale": 1.34,
      "gender": "male",
      "hairStyle": "male_tech_bro",
      "clothes": "hoodie",
      "expression": "fear_sweat_freeze",
      "pose": "facepalm"
    },
    "camera": {
      "x": 960,
      "y": 480,
      "zoom": 1.55
    },
    "activeProp": {
      "id": "PROP-BROWSER",
      "x": 960,
      "y": 340,
      "scale": 1.4
    },
    "bannerText": "CTRL + W: TREND CANCELLED",
    "graphicType": "STAMP",
    "text": "In an industry where looking good is literally your job description , why would you eat kale, hire a personal chef, and run on a"
  },
  {
    "beatId": 31,
    "startSec": 216.753,
    "endSec": 224.433,
    "dur": 7.68,
    "bgId": "BG-OFFICE",
    "actor": {
      "id": "actor_31",
      "x": 960,
      "y": 640,
      "scale": 1.34,
      "gender": "male",
      "hairStyle": "male_tech_bro",
      "clothes": "hoodie",
      "expression": "fear_sweat_freeze",
      "pose": "facepalm"
    },
    "camera": {
      "x": 960,
      "y": 480,
      "zoom": 1.55
    },
    "activeProp": {
      "id": "PROP-BROWSER",
      "x": 960,
      "y": 340,
      "scale": 1.4
    },
    "bannerText": "CTRL + W: TREND CANCELLED",
    "graphicType": "STAMP",
    "text": "treadmill for two hours a day when you can just take a single shot once a week and completely lose your desire to consume anything other than oxygen and public attention?"
  },
  {
    "beatId": 32,
    "startSec": 224.967,
    "endSec": 233.086,
    "dur": 8.119,
    "bgId": "BG-Y2K",
    "actor": {
      "id": "actor_32",
      "x": 780,
      "y": 640,
      "scale": 1.34,
      "gender": "female",
      "hairStyle": "female_pixie_y2k",
      "clothes": "y2k_crop_top_low_rise",
      "expression": "smug_peace_sign",
      "pose": "peace_sign"
    },
    "camera": {
      "x": 960,
      "y": 520,
      "zoom": 1.35
    },
    "activeProp": {
      "id": "PROP-MONEY",
      "x": 1360,
      "y": 440,
      "scale": 1.3
    },
    "bannerText": "Y2K LOW-RISE: ,400",
    "graphicType": null,
    "text": "Before this, celebrities actually had to work out, or at least pretend to. Now, the hunger is just gone. Imagine if you could take a pill that made you stop wanting to"
  },
  {
    "beatId": 33,
    "startSec": 233.086,
    "endSec": 241.775,
    "dur": 8.689,
    "bgId": "BG-Y2K",
    "actor": {
      "id": "actor_33",
      "x": 780,
      "y": 640,
      "scale": 1.34,
      "gender": "female",
      "hairStyle": "female_pixie_y2k",
      "clothes": "y2k_crop_top_low_rise",
      "expression": "smug_peace_sign",
      "pose": "peace_sign"
    },
    "camera": {
      "x": 960,
      "y": 520,
      "zoom": 1.35
    },
    "activeProp": {
      "id": "PROP-MONEY",
      "x": 1360,
      "y": 440,
      "scale": 1.3
    },
    "bannerText": "Y2K LOW-RISE: ,400",
    "graphicType": null,
    "text": "procrastinate, or stop wanting to text your exThat's. That\u2019s what this does, but for bread. Because of this, we are seeing rapid, dramatic weight loss across"
  },
  {
    "beatId": 34,
    "startSec": 241.775,
    "endSec": 248.57,
    "dur": 6.795,
    "bgId": "BG-Y2K",
    "actor": {
      "id": "actor_34",
      "x": 780,
      "y": 640,
      "scale": 1.34,
      "gender": "female",
      "hairStyle": "female_pixie_y2k",
      "clothes": "y2k_crop_top_low_rise",
      "expression": "smug_peace_sign",
      "pose": "peace_sign"
    },
    "camera": {
      "x": 960,
      "y": 520,
      "zoom": 1.35
    },
    "activeProp": {
      "id": "PROP-MONEY",
      "x": 1360,
      "y": 440,
      "scale": 1.3
    },
    "bannerText": "Y2K LOW-RISE: ,400",
    "graphicType": null,
    "text": "the board. Actresses who previously championed body positivity and wrote entire essay collections about \u201cloving your curves\u201d are suddenly"
  },
  {
    "beatId": 35,
    "startSec": 248.57,
    "endSec": 256.82,
    "dur": 8.25,
    "bgId": "BG-Y2K",
    "actor": {
      "id": "actor_35",
      "x": 780,
      "y": 640,
      "scale": 1.34,
      "gender": "female",
      "hairStyle": "female_pixie_y2k",
      "clothes": "y2k_crop_top_low_rise",
      "expression": "smug_peace_sign",
      "pose": "peace_sign"
    },
    "camera": {
      "x": 960,
      "y": 520,
      "zoom": 1.35
    },
    "activeProp": {
      "id": "PROP-MONEY",
      "x": 1360,
      "y": 440,
      "scale": 1.3
    },
    "bannerText": "Y2K LOW-RISE: ,400",
    "graphicType": null,
    "text": "showing up to premieres looking like they could use a strong gust of wind as a primary mode of transportation. Mindy Kaling, for example, went from posting about not needing"
  },
  {
    "beatId": 36,
    "startSec": 256.9,
    "endSec": 264.18,
    "dur": 7.28,
    "bgId": "BG-Y2K",
    "actor": {
      "id": "actor_36",
      "x": 780,
      "y": 640,
      "scale": 1.34,
      "gender": "female",
      "hairStyle": "female_pixie_y2k",
      "clothes": "y2k_crop_top_low_rise",
      "expression": "smug_peace_sign",
      "pose": "peace_sign"
    },
    "camera": {
      "x": 960,
      "y": 520,
      "zoom": 1.35
    },
    "activeProp": {
      "id": "PROP-MONEY",
      "x": 1360,
      "y": 440,
      "scale": 1.3
    },
    "bannerText": "Y2K LOW-RISE: ,400",
    "graphicType": null,
    "text": "to be a size zero to showing up practically unrecognizable after slimming down, which she attributed strictly to \u201cdiet and exercise.\u201d"
  },
  {
    "beatId": 37,
    "startSec": 264.777,
    "endSec": 272.967,
    "dur": 8.19,
    "bgId": "BG-CLINIC",
    "actor": {
      "id": "actor_37",
      "x": 780,
      "y": 640,
      "scale": 1.34,
      "gender": "doctor",
      "hairStyle": "male_doctor_cap",
      "clothes": "doctor_scrubs",
      "expression": "smug_rock_eyebrow",
      "pose": "holding_prop"
    },
    "camera": {
      "x": 960,
      "y": 520,
      "zoom": 1.55
    },
    "activeProp": {
      "id": "PROP-MED",
      "x": 1320,
      "y": 460,
      "scale": 1.4
    },
    "bannerText": "GLP-1 OZEMPIC CHEAT CODE",
    "graphicType": null,
    "text": "Which, in Hollywood speak, is kind of like saying you got rich by finding loose change in your couch cushions. The gaslighting is honestly the most impressive part of the whole"
  },
  {
    "beatId": 38,
    "startSec": 272.967,
    "endSec": 281.094,
    "dur": 8.127,
    "bgId": "BG-CLINIC",
    "actor": {
      "id": "actor_38",
      "x": 780,
      "y": 640,
      "scale": 1.34,
      "gender": "doctor",
      "hairStyle": "male_doctor_cap",
      "clothes": "doctor_scrubs",
      "expression": "smug_rock_eyebrow",
      "pose": "holding_prop"
    },
    "camera": {
      "x": 960,
      "y": 520,
      "zoom": 1.55
    },
    "activeProp": {
      "id": "PROP-MED",
      "x": 1320,
      "y": 460,
      "scale": 1.4
    },
    "bannerText": "GLP-1 OZEMPIC CHEAT CODE",
    "graphicType": null,
    "text": "phenomenon. We are currently living through a golden age of celebrity denial. When asked how they lost thirty pounds in four weeks, celebrities"
  },
  {
    "beatId": 39,
    "startSec": 281.094,
    "endSec": 286.854,
    "dur": 5.76,
    "bgId": "BG-CLINIC",
    "actor": {
      "id": "actor_39",
      "x": 780,
      "y": 640,
      "scale": 1.34,
      "gender": "doctor",
      "hairStyle": "male_doctor_cap",
      "clothes": "doctor_scrubs",
      "expression": "smug_rock_eyebrow",
      "pose": "holding_prop"
    },
    "camera": {
      "x": 960,
      "y": 520,
      "zoom": 1.55
    },
    "activeProp": {
      "id": "PROP-MED",
      "x": 1320,
      "y": 460,
      "scale": 1.4
    },
    "bannerText": "GLP-1 OZEMPIC CHEAT CODE",
    "graphicType": null,
    "text": "will look a reporter dead in the eye and say something like , \u201cI just started drinking more water, going on long walks, and"
  },
  {
    "beatId": 40,
    "startSec": 286.854,
    "endSec": 293.882,
    "dur": 7.028,
    "bgId": "BG-CLINIC",
    "actor": {
      "id": "actor_40",
      "x": 780,
      "y": 640,
      "scale": 1.34,
      "gender": "doctor",
      "hairStyle": "male_doctor_cap",
      "clothes": "doctor_scrubs",
      "expression": "smug_rock_eyebrow",
      "pose": "holding_prop"
    },
    "camera": {
      "x": 960,
      "y": 520,
      "zoom": 1.55
    },
    "activeProp": {
      "id": "PROP-MED",
      "x": 1320,
      "y": 460,
      "scale": 1.4
    },
    "bannerText": "GLP-1 OZEMPIC CHEAT CODE",
    "graphicType": null,
    "text": "getting eight hours of sleep,\u201d as if they just discovered the concept of hydration. Some of them claimit's it\u2019s a \u201cgut reset,\u201d or that they cut out"
  },
  {
    "beatId": 41,
    "startSec": 293.882,
    "endSec": 302.103,
    "dur": 8.221,
    "bgId": "BG-CLINIC",
    "actor": {
      "id": "actor_41",
      "x": 780,
      "y": 640,
      "scale": 1.34,
      "gender": "doctor",
      "hairStyle": "male_doctor_cap",
      "clothes": "doctor_scrubs",
      "expression": "smug_rock_eyebrow",
      "pose": "holding_prop"
    },
    "camera": {
      "x": 960,
      "y": 520,
      "zoom": 1.55
    },
    "activeProp": {
      "id": "PROP-MED",
      "x": 1320,
      "y": 460,
      "scale": 1.4
    },
    "bannerText": "GLP-1 OZEMPIC CHEAT CODE",
    "graphicType": null,
    "text": "dairy, completely ignoring the fact that cutting out cheese doesn't doesn\u2019t suddenly alter your entire skeletal structure. And it is very important to point out that this is not just a"
  },
  {
    "beatId": 42,
    "startSec": 302.103,
    "endSec": 310.821,
    "dur": 8.718,
    "bgId": "BG-HOLLYWOOD",
    "actor": {
      "id": "actor_42",
      "x": 780,
      "y": 640,
      "scale": 1.34,
      "gender": "female",
      "hairStyle": "female_blonde_curls",
      "clothes": "dress_red_carpet",
      "expression": "cringe_teeth_grit",
      "pose": "holding_prop"
    },
    "camera": {
      "x": 960,
      "y": 520,
      "zoom": 1.4
    },
    "activeProp": {
      "id": "PROP-WATER",
      "x": 1300,
      "y": 480,
      "scale": 1.3
    },
    "bannerText": "\"JUST PILATES & WATER \ud83d\ude07\"",
    "graphicType": null,
    "text": "women's women\u2019s issue. The men in Hollywood are doing the exact same thing, just with different marketing. While the actresses are getting dangerously thin for high fashion"
  },
  {
    "beatId": 43,
    "startSec": 310.981,
    "endSec": 318.098,
    "dur": 7.117,
    "bgId": "BG-HOLLYWOOD",
    "actor": {
      "id": "actor_43",
      "x": 780,
      "y": 640,
      "scale": 1.34,
      "gender": "female",
      "hairStyle": "female_blonde_curls",
      "clothes": "dress_red_carpet",
      "expression": "cringe_teeth_grit",
      "pose": "holding_prop"
    },
    "camera": {
      "x": 960,
      "y": 520,
      "zoom": 1.4
    },
    "activeProp": {
      "id": "PROP-WATER",
      "x": 1300,
      "y": 480,
      "scale": 1.3
    },
    "bannerText": "\"JUST PILATES & WATER \ud83d\ude07\"",
    "graphicType": null,
    "text": ", the actors are getting dangerously shredded for the Marvel Cinematic Universe. If you look at the male beauty standard, actors are dehydrating"
  },
  {
    "beatId": 44,
    "startSec": 318.098,
    "endSec": 324.519,
    "dur": 6.421,
    "bgId": "BG-HOLLYWOOD",
    "actor": {
      "id": "actor_44",
      "x": 780,
      "y": 640,
      "scale": 1.34,
      "gender": "female",
      "hairStyle": "female_blonde_curls",
      "clothes": "dress_red_carpet",
      "expression": "cringe_teeth_grit",
      "pose": "holding_prop"
    },
    "camera": {
      "x": 960,
      "y": 520,
      "zoom": 1.4
    },
    "activeProp": {
      "id": "PROP-WATER",
      "x": 1300,
      "y": 480,
      "scale": 1.3
    },
    "bannerText": "\"JUST PILATES & WATER \ud83d\ude07\"",
    "graphicType": null,
    "text": "themselves for three days before a shirtless scene so their skin wraps around their muscles like shrink wrap on a leftover ham."
  },
  {
    "beatId": 45,
    "startSec": 324.519,
    "endSec": 330.119,
    "dur": 5.6,
    "bgId": "BG-HOLLYWOOD",
    "actor": {
      "id": "actor_45",
      "x": 780,
      "y": 640,
      "scale": 1.34,
      "gender": "female",
      "hairStyle": "female_blonde_curls",
      "clothes": "dress_red_carpet",
      "expression": "cringe_teeth_grit",
      "pose": "holding_prop"
    },
    "camera": {
      "x": 960,
      "y": 520,
      "zoom": 1.4
    },
    "activeProp": {
      "id": "PROP-WATER",
      "x": 1300,
      "y": 480,
      "scale": 1.3
    },
    "bannerText": "\"JUST PILATES & WATER \ud83d\ude07\"",
    "graphicType": null,
    "text": "Actors have completely transformed their bodies in their late forties, and their PR teams always claimit's it\u2019s just from"
  },
  {
    "beatId": 46,
    "startSec": 330.119,
    "endSec": 337.451,
    "dur": 7.332,
    "bgId": "BG-HOLLYWOOD",
    "actor": {
      "id": "actor_46",
      "x": 780,
      "y": 640,
      "scale": 1.34,
      "gender": "female",
      "hairStyle": "female_blonde_curls",
      "clothes": "dress_red_carpet",
      "expression": "cringe_teeth_grit",
      "pose": "holding_prop"
    },
    "camera": {
      "x": 960,
      "y": 520,
      "zoom": 1.4
    },
    "activeProp": {
      "id": "PROP-WATER",
      "x": 1300,
      "y": 480,
      "scale": 1.3
    },
    "bannerText": "\"JUST PILATES & WATER \ud83d\ude07\"",
    "graphicType": null,
    "text": "eating unseasoned chicken breast, steamed broccoli, and doing two-a-day workouts. The reality is that the male side of Hollywood is swimming in"
  },
  {
    "beatId": 47,
    "startSec": 337.451,
    "endSec": 343.291,
    "dur": 5.84,
    "bgId": "BG-HOLLYWOOD",
    "actor": {
      "id": "actor_47",
      "x": 780,
      "y": 640,
      "scale": 1.34,
      "gender": "female",
      "hairStyle": "female_blonde_curls",
      "clothes": "dress_red_carpet",
      "expression": "cringe_teeth_grit",
      "pose": "holding_prop"
    },
    "camera": {
      "x": 960,
      "y": 520,
      "zoom": 1.4
    },
    "activeProp": {
      "id": "PROP-WATER",
      "x": 1300,
      "y": 480,
      "scale": 1.3
    },
    "bannerText": "\"JUST PILATES & WATER \ud83d\ude07\"",
    "graphicType": null,
    "text": "testosterone replacement therapy, steroids, and human growth hormone, but they just brand it as \u201cdiscipline\u201d and \u201cwaking"
  },
  {
    "beatId": 48,
    "startSec": 343.291,
    "endSec": 349.458,
    "dur": 6.167,
    "bgId": "BG-HOLLYWOOD",
    "actor": {
      "id": "actor_48",
      "x": 780,
      "y": 640,
      "scale": 1.34,
      "gender": "female",
      "hairStyle": "female_blonde_curls",
      "clothes": "dress_red_carpet",
      "expression": "cringe_teeth_grit",
      "pose": "holding_prop"
    },
    "camera": {
      "x": 960,
      "y": 520,
      "zoom": 1.4
    },
    "activeProp": {
      "id": "PROP-WATER",
      "x": 1300,
      "y": 480,
      "scale": 1.3
    },
    "bannerText": "\"JUST PILATES & WATER \ud83d\ude07\"",
    "graphicType": null,
    "text": "up at 4 AM.\u201d But going back to the women, extreme thinnessisn't isn\u2019t the only thing making everyone look different lately."
  },
  {
    "beatId": 49,
    "startSec": 350.015,
    "endSec": 358.722,
    "dur": 8.707,
    "bgId": "BG-GYM",
    "actor": {
      "id": "actor_49",
      "x": 780,
      "y": 640,
      "scale": 1.34,
      "gender": "bodybuilder",
      "hairStyle": "male_bodybuilder_bald",
      "clothes": "bodybuilder_tank",
      "expression": "rage_clenched_fists",
      "pose": "flexing"
    },
    "camera": {
      "x": 960,
      "y": 520,
      "zoom": 1.5
    },
    "activeProp": {
      "id": "PROP-CLOCK",
      "x": 1360,
      "y": 440,
      "scale": 1.3
    },
    "bannerText": "4:00 AM DEHYDRATION PROTOCOL",
    "graphicType": null,
    "text": "There is a secondary boss fight in the modern aesthetic meta , and it is called Buccal Fat Removal. For those whodon't don\u2019t know, buccal fat is the natural padding"
  },
  {
    "beatId": 50,
    "startSec": 358.722,
    "endSec": 367.554,
    "dur": 8.832,
    "bgId": "BG-GYM",
    "actor": {
      "id": "actor_50",
      "x": 780,
      "y": 640,
      "scale": 1.34,
      "gender": "bodybuilder",
      "hairStyle": "male_bodybuilder_bald",
      "clothes": "bodybuilder_tank",
      "expression": "rage_clenched_fists",
      "pose": "flexing"
    },
    "camera": {
      "x": 960,
      "y": 520,
      "zoom": 1.5
    },
    "activeProp": {
      "id": "PROP-CLOCK",
      "x": 1360,
      "y": 440,
      "scale": 1.3
    },
    "bannerText": "4:00 AM DEHYDRATION PROTOCOL",
    "graphicType": null,
    "text": "in your cheeks that gives you a youthful, normal, human appearance It's. It\u2019s what makes a face look alive. But apparently, looking like a living human is out this season."
  },
  {
    "beatId": 51,
    "startSec": 368.17,
    "endSec": 373.85,
    "dur": 5.68,
    "bgId": "BG-GYM",
    "actor": {
      "id": "actor_51",
      "x": 780,
      "y": 640,
      "scale": 1.34,
      "gender": "bodybuilder",
      "hairStyle": "male_bodybuilder_bald",
      "clothes": "bodybuilder_tank",
      "expression": "rage_clenched_fists",
      "pose": "flexing"
    },
    "camera": {
      "x": 960,
      "y": 520,
      "zoom": 1.5
    },
    "activeProp": {
      "id": "PROP-CLOCK",
      "x": 1360,
      "y": 440,
      "scale": 1.3
    },
    "bannerText": "4:00 AM DEHYDRATION PROTOCOL",
    "graphicType": null,
    "text": "Instead, celebrities are paying thousands of dollars to have plastic surgeons slice open the inside of their mouths and physically"
  },
  {
    "beatId": 52,
    "startSec": 373.85,
    "endSec": 379.73,
    "dur": 5.88,
    "bgId": "BG-GYM",
    "actor": {
      "id": "actor_52",
      "x": 780,
      "y": 640,
      "scale": 1.34,
      "gender": "bodybuilder",
      "hairStyle": "male_bodybuilder_bald",
      "clothes": "bodybuilder_tank",
      "expression": "rage_clenched_fists",
      "pose": "flexing"
    },
    "camera": {
      "x": 960,
      "y": 520,
      "zoom": 1.5
    },
    "activeProp": {
      "id": "PROP-CLOCK",
      "x": 1360,
      "y": 440,
      "scale": 1.3
    },
    "bannerText": "4:00 AM DEHYDRATION PROTOCOL",
    "graphicType": null,
    "text": "scoop out these fat pads likethey're they\u2019re hollowing out a pumpkin, all so they can achieve cheekbones sharp enough to slice deli meat."
  },
  {
    "beatId": 53,
    "startSec": 380.134,
    "endSec": 386.534,
    "dur": 6.4,
    "bgId": "BG-GYM",
    "actor": {
      "id": "actor_53",
      "x": 780,
      "y": 640,
      "scale": 1.34,
      "gender": "bodybuilder",
      "hairStyle": "male_bodybuilder_bald",
      "clothes": "bodybuilder_tank",
      "expression": "rage_clenched_fists",
      "pose": "flexing"
    },
    "camera": {
      "x": 960,
      "y": 520,
      "zoom": 1.5
    },
    "activeProp": {
      "id": "PROP-CLOCK",
      "x": 1360,
      "y": 440,
      "scale": 1.3
    },
    "bannerText": "4:00 AM DEHYDRATION PROTOCOL",
    "graphicType": null,
    "text": "When you combine buccal fat removal with the rapid, systemic fat loss from Ozempic, you get what the internet has affectionately"
  },
  {
    "beatId": 54,
    "startSec": 386.534,
    "endSec": 394.331,
    "dur": 7.797,
    "bgId": "BG-GYM",
    "actor": {
      "id": "actor_54",
      "x": 780,
      "y": 640,
      "scale": 1.34,
      "gender": "bodybuilder",
      "hairStyle": "male_bodybuilder_bald",
      "clothes": "bodybuilder_tank",
      "expression": "rage_clenched_fists",
      "pose": "flexing"
    },
    "camera": {
      "x": 960,
      "y": 520,
      "zoom": 1.5
    },
    "activeProp": {
      "id": "PROP-CLOCK",
      "x": 1360,
      "y": 440,
      "scale": 1.3
    },
    "bannerText": "4:00 AM DEHYDRATION PROTOCOL",
    "graphicType": null,
    "text": "dubbed \u201cOzempic Face.\u201d Because you are losing fat so quickly, your skindoesn't doesn\u2019t have time to bounce back. This leads to a sudden loss of facial volume"
  },
  {
    "beatId": 55,
    "startSec": 394.331,
    "endSec": 402.627,
    "dur": 8.296,
    "bgId": "BG-GYM",
    "actor": {
      "id": "actor_55",
      "x": 780,
      "y": 640,
      "scale": 1.34,
      "gender": "bodybuilder",
      "hairStyle": "male_bodybuilder_bald",
      "clothes": "bodybuilder_tank",
      "expression": "rage_clenched_fists",
      "pose": "flexing"
    },
    "camera": {
      "x": 960,
      "y": 520,
      "zoom": 1.5
    },
    "activeProp": {
      "id": "PROP-CLOCK",
      "x": 1360,
      "y": 440,
      "scale": 1.3
    },
    "bannerText": "4:00 AM DEHYDRATION PROTOCOL",
    "graphicType": null,
    "text": "that can make a healthy 25-year-old look like they are actively mourning a lost lover in a Victorian gothic novel. The overall effect on the red carpet is a sea of faces that look"
  },
  {
    "beatId": 56,
    "startSec": 402.627,
    "endSec": 408.627,
    "dur": 6.0,
    "bgId": "BG-CLINIC",
    "actor": {
      "id": "actor_56",
      "x": 960,
      "y": 640,
      "scale": 1.34,
      "gender": "doctor",
      "hairStyle": "male_doctor_cap",
      "clothes": "doctor_scrubs",
      "expression": "smug_chef_kiss",
      "pose": "neutral"
    },
    "camera": {
      "x": 960,
      "y": 500,
      "zoom": 1.65
    },
    "activeProp": {
      "id": "PROP-DELI",
      "x": 1320,
      "y": 460,
      "scale": 1.3
    },
    "bannerText": "DELI SLICER CHEEKBONES",
    "graphicType": null,
    "text": "highly manufactured and bodies that are dramatically thin. Commentators have noted it looks slightly uncanny and unnatural\u2014like the"
  },
  {
    "beatId": 57,
    "startSec": 408.627,
    "endSec": 416.451,
    "dur": 7.824,
    "bgId": "BG-CLINIC",
    "actor": {
      "id": "actor_57",
      "x": 960,
      "y": 640,
      "scale": 1.34,
      "gender": "doctor",
      "hairStyle": "male_doctor_cap",
      "clothes": "doctor_scrubs",
      "expression": "smug_chef_kiss",
      "pose": "neutral"
    },
    "camera": {
      "x": 960,
      "y": 500,
      "zoom": 1.65
    },
    "activeProp": {
      "id": "PROP-DELI",
      "x": 1320,
      "y": 460,
      "scale": 1.3
    },
    "bannerText": "DELI SLICER CHEEKBONES",
    "graphicType": null,
    "text": "humans have been replaced by smooth replicas. This brings us perfectly to Jenna Ortega. The internet has been heavily scrutinizing her recent appearances"
  },
  {
    "beatId": 58,
    "startSec": 416.451,
    "endSec": 424.034,
    "dur": 7.583,
    "bgId": "BG-CLINIC",
    "actor": {
      "id": "actor_58",
      "x": 960,
      "y": 640,
      "scale": 1.34,
      "gender": "doctor",
      "hairStyle": "male_doctor_cap",
      "clothes": "doctor_scrubs",
      "expression": "smug_chef_kiss",
      "pose": "neutral"
    },
    "camera": {
      "x": 960,
      "y": 500,
      "zoom": 1.65
    },
    "activeProp": {
      "id": "PROP-DELI",
      "x": 1320,
      "y": 460,
      "scale": 1.3
    },
    "bannerText": "DELI SLICER CHEEKBONES",
    "graphicType": null,
    "text": ", pointing out that she is looking significantly leaner than she did a couple of years ago. Now, nobody actually knows if she is on anything, or if she is"
  },
  {
    "beatId": 59,
    "startSec": 424.034,
    "endSec": 431.094,
    "dur": 7.06,
    "bgId": "BG-GOTHIC",
    "actor": {
      "id": "actor_59",
      "x": 960,
      "y": 640,
      "scale": 1.34,
      "gender": "female",
      "hairStyle": "female_widow_veil",
      "clothes": "victorian_mourning",
      "expression": "deadpan_soul_stare",
      "pose": "neutral"
    },
    "camera": {
      "x": 960,
      "y": 500,
      "zoom": 1.65
    },
    "activeProp": {
      "id": "PROP-ROSE",
      "x": 1320,
      "y": 460,
      "scale": 1.3
    },
    "bannerText": "VICTORIAN GOTHIC MOURNING",
    "graphicType": null,
    "text": "just stressed, working constantly, and aging out of her teenage years into her twenties. Plusshe's, she\u2019s literally the star of Wednesday, and if your"
  },
  {
    "beatId": 60,
    "startSec": 431.094,
    "endSec": 436.934,
    "dur": 5.84,
    "bgId": "BG-GOTHIC",
    "actor": {
      "id": "actor_60",
      "x": 960,
      "y": 640,
      "scale": 1.34,
      "gender": "female",
      "hairStyle": "female_widow_veil",
      "clothes": "victorian_mourning",
      "expression": "deadpan_soul_stare",
      "pose": "neutral"
    },
    "camera": {
      "x": 960,
      "y": 500,
      "zoom": 1.65
    },
    "activeProp": {
      "id": "PROP-ROSE",
      "x": 1320,
      "y": 460,
      "scale": 1.3
    },
    "bannerText": "VICTORIAN GOTHIC MOURNING",
    "graphicType": null,
    "text": "entire personal brand is built around the Tim Burton universe , looking a little bit pale and gaunt is practically in the contract."
  },
  {
    "beatId": 61,
    "startSec": 437.607,
    "endSec": 444.407,
    "dur": 6.8,
    "bgId": "BG-GOTHIC",
    "actor": {
      "id": "actor_61",
      "x": 960,
      "y": 640,
      "scale": 1.34,
      "gender": "female",
      "hairStyle": "female_widow_veil",
      "clothes": "victorian_mourning",
      "expression": "deadpan_soul_stare",
      "pose": "neutral"
    },
    "camera": {
      "x": 960,
      "y": 500,
      "zoom": 1.65
    },
    "activeProp": {
      "id": "PROP-ROSE",
      "x": 1320,
      "y": 460,
      "scale": 1.3
    },
    "bannerText": "VICTORIAN GOTHIC MOURNING",
    "graphicType": null,
    "text": "But because Hollywood has created a macro-environment where unnatural , medically induced weight loss is the new baseline, every single"
  },
  {
    "beatId": 62,
    "startSec": 444.407,
    "endSec": 452.883,
    "dur": 8.476,
    "bgId": "BG-GOTHIC",
    "actor": {
      "id": "actor_62",
      "x": 960,
      "y": 640,
      "scale": 1.34,
      "gender": "female",
      "hairStyle": "female_widow_veil",
      "clothes": "victorian_mourning",
      "expression": "deadpan_soul_stare",
      "pose": "neutral"
    },
    "camera": {
      "x": 960,
      "y": 500,
      "zoom": 1.65
    },
    "activeProp": {
      "id": "PROP-ROSE",
      "x": 1320,
      "y": 460,
      "scale": 1.3
    },
    "bannerText": "VICTORIAN GOTHIC MOURNING",
    "graphicType": null,
    "text": "celebrity who drops five pounds is immediately subjected to a digital tribunal. TikTok users will stitch together side-by-side photos and analyze"
  },
  {
    "beatId": 63,
    "startSec": 452.883,
    "endSec": 459.678,
    "dur": 6.795,
    "bgId": "BG-TRIBUNAL",
    "actor": {
      "id": "actor_63",
      "x": 960,
      "y": 640,
      "scale": 1.34,
      "gender": "male",
      "hairStyle": "male_tech_bro",
      "clothes": "judge_robes",
      "expression": "rage_clenched_fists",
      "pose": "slamming_gavel"
    },
    "camera": {
      "x": 960,
      "y": 520,
      "zoom": 1.45
    },
    "activeProp": {
      "id": "PROP-BELL",
      "x": 1360,
      "y": 480,
      "scale": 1.2
    },
    "bannerText": "TIKTOK FORENSIC TRIBUNAL",
    "graphicType": null,
    "text": "their jawlines and collarbones likeit's it\u2019s the Zapruder film. This is creating a bizarre, inescapable feedback loop."
  },
  {
    "beatId": 64,
    "startSec": 460.225,
    "endSec": 466.465,
    "dur": 6.24,
    "bgId": "BG-TRIBUNAL",
    "actor": {
      "id": "actor_64",
      "x": 960,
      "y": 640,
      "scale": 1.34,
      "gender": "male",
      "hairStyle": "male_tech_bro",
      "clothes": "judge_robes",
      "expression": "rage_clenched_fists",
      "pose": "slamming_gavel"
    },
    "camera": {
      "x": 960,
      "y": 520,
      "zoom": 1.45
    },
    "activeProp": {
      "id": "PROP-BELL",
      "x": 1360,
      "y": 480,
      "scale": 1.2
    },
    "bannerText": "TIKTOK FORENSIC TRIBUNAL",
    "graphicType": null,
    "text": "Because so many people are using medical interventions, the standard for what is considered \u201cthin\u201d keeps dropping lower and lower."
  },
  {
    "beatId": 65,
    "startSec": 467.096,
    "endSec": 473.336,
    "dur": 6.24,
    "bgId": "BG-TRIBUNAL",
    "actor": {
      "id": "actor_65",
      "x": 960,
      "y": 640,
      "scale": 1.34,
      "gender": "male",
      "hairStyle": "male_tech_bro",
      "clothes": "judge_robes",
      "expression": "rage_clenched_fists",
      "pose": "slamming_gavel"
    },
    "camera": {
      "x": 960,
      "y": 520,
      "zoom": 1.45
    },
    "activeProp": {
      "id": "PROP-BELL",
      "x": 1360,
      "y": 480,
      "scale": 1.2
    },
    "bannerText": "TIKTOK FORENSIC TRIBUNAL",
    "graphicType": null,
    "text": "A size four used to be normal; now a size four is considered \u201ccurvy\u201d by Los Angeles standards, which is objectively insane."
  },
  {
    "beatId": 66,
    "startSec": 473.913,
    "endSec": 480.473,
    "dur": 6.56,
    "bgId": "BG-TRIBUNAL",
    "actor": {
      "id": "actor_66",
      "x": 960,
      "y": 640,
      "scale": 1.34,
      "gender": "male",
      "hairStyle": "male_tech_bro",
      "clothes": "judge_robes",
      "expression": "rage_clenched_fists",
      "pose": "slamming_gavel"
    },
    "camera": {
      "x": 960,
      "y": 520,
      "zoom": 1.45
    },
    "activeProp": {
      "id": "PROP-BELL",
      "x": 1360,
      "y": 480,
      "scale": 1.2
    },
    "bannerText": "TIKTOK FORENSIC TRIBUNAL",
    "graphicType": null,
    "text": "We are seeing a shift to an aesthetic that feels almost entirely digitalPeople's. People\u2019s bodies are becoming smaller and sharper"
  },
  {
    "beatId": 67,
    "startSec": 480.473,
    "endSec": 486.753,
    "dur": 6.28,
    "bgId": "BG-TRIBUNAL",
    "actor": {
      "id": "actor_67",
      "x": 960,
      "y": 640,
      "scale": 1.34,
      "gender": "male",
      "hairStyle": "male_tech_bro",
      "clothes": "judge_robes",
      "expression": "rage_clenched_fists",
      "pose": "slamming_gavel"
    },
    "camera": {
      "x": 960,
      "y": 520,
      "zoom": 1.45
    },
    "activeProp": {
      "id": "PROP-BELL",
      "x": 1360,
      "y": 480,
      "scale": 1.2
    },
    "bannerText": "TIKTOK FORENSIC TRIBUNAL",
    "graphicType": null,
    "text": ", looking less like something lived in and more like something engineered in a character creation screen before you start a role-playing game."
  },
  {
    "beatId": 68,
    "startSec": 487.236,
    "endSec": 495.158,
    "dur": 7.922,
    "bgId": "BG-TRIBUNAL",
    "actor": {
      "id": "actor_68",
      "x": 960,
      "y": 640,
      "scale": 1.34,
      "gender": "female",
      "hairStyle": "female_bob_bangs",
      "clothes": "dress_black",
      "expression": "deadpan_soul_stare",
      "pose": "wednesday_dance"
    },
    "camera": {
      "x": 960,
      "y": 520,
      "zoom": 1.45
    },
    "activeProp": {
      "id": "PROP-BELL",
      "x": 1360,
      "y": 480,
      "scale": 1.2
    },
    "bannerText": "WEDNESDAY DANCE DEFENSE",
    "graphicType": null,
    "text": "Theydon't don\u2019t look like people who eat food; they look like they run on a lithium-ion battery. And this actually presents a massive, structural problem for"
  },
  {
    "beatId": 69,
    "startSec": 495.158,
    "endSec": 502.896,
    "dur": 7.738,
    "bgId": "BG-TRIBUNAL",
    "actor": {
      "id": "actor_69",
      "x": 960,
      "y": 640,
      "scale": 1.34,
      "gender": "female",
      "hairStyle": "female_bob_bangs",
      "clothes": "dress_black",
      "expression": "deadpan_soul_stare",
      "pose": "wednesday_dance"
    },
    "camera": {
      "x": 960,
      "y": 520,
      "zoom": 1.45
    },
    "activeProp": {
      "id": "PROP-BELL",
      "x": 1360,
      "y": 480,
      "scale": 1.2
    },
    "bannerText": "WEDNESDAY DANCE DEFENSE",
    "graphicType": null,
    "text": "the entertainment industry itself. The fundamental point of movies and television is that actors are supposed to reflect real life back at us. They need to look"
  },
  {
    "beatId": 70,
    "startSec": 502.976,
    "endSec": 511.492,
    "dur": 8.516,
    "bgId": "BG-TRIBUNAL",
    "actor": {
      "id": "actor_70",
      "x": 960,
      "y": 640,
      "scale": 1.34,
      "gender": "female",
      "hairStyle": "female_bob_bangs",
      "clothes": "dress_black",
      "expression": "deadpan_soul_stare",
      "pose": "wednesday_dance"
    },
    "camera": {
      "x": 960,
      "y": 520,
      "zoom": 1.45
    },
    "activeProp": {
      "id": "PROP-BELL",
      "x": 1360,
      "y": 480,
      "scale": 1.2
    },
    "bannerText": "WEDNESDAY DANCE DEFENSE",
    "graphicType": null,
    "text": "roughly like us, just with better lighting, vast amounts of wealth, and slightly superior genetics. But when everyone on screen looks like a gaunt, hollow-cheeked"
  },
  {
    "beatId": 71,
    "startSec": 511.492,
    "endSec": 517.652,
    "dur": 6.16,
    "bgId": "BG-CLINIC",
    "actor": {
      "id": "actor_71",
      "x": 960,
      "y": 640,
      "scale": 1.34,
      "gender": "female",
      "hairStyle": "female_slicked_back",
      "clothes": "y2k_crop_top_low_rise",
      "expression": "deadpan_soul_stare",
      "pose": "neutral"
    },
    "camera": {
      "x": 960,
      "y": 500,
      "zoom": 1.75
    },
    "activeProp": {
      "id": "PROP-BOT",
      "x": 1360,
      "y": 450,
      "scale": 1.3
    },
    "bannerText": "FACIAL MONOCULTURE: 99.9% SYMMETRY",
    "graphicType": "RADAR",
    "text": "cyborg whohasn't hasn\u2019t encountered a complex carbohydrate since the Obama administration, it becomes inherently alienating."
  },
  {
    "beatId": 72,
    "startSec": 518.139,
    "endSec": 525.505,
    "dur": 7.366,
    "bgId": "BG-CLINIC",
    "actor": {
      "id": "actor_72",
      "x": 960,
      "y": 640,
      "scale": 1.34,
      "gender": "female",
      "hairStyle": "female_slicked_back",
      "clothes": "y2k_crop_top_low_rise",
      "expression": "deadpan_soul_stare",
      "pose": "neutral"
    },
    "camera": {
      "x": 960,
      "y": 500,
      "zoom": 1.75
    },
    "activeProp": {
      "id": "PROP-BOT",
      "x": 1360,
      "y": 450,
      "scale": 1.3
    },
    "bannerText": "FACIAL MONOCULTURE: 99.9% SYMMETRY",
    "graphicType": "RADAR",
    "text": "We want our favorite stars to be relatable. We want to project ourselves onto them. But as critics have pointed out, movie stars have tweaked their"
  },
  {
    "beatId": 73,
    "startSec": 525.505,
    "endSec": 532.504,
    "dur": 6.999,
    "bgId": "BG-CLINIC",
    "actor": {
      "id": "actor_73",
      "x": 960,
      "y": 640,
      "scale": 1.34,
      "gender": "female",
      "hairStyle": "female_slicked_back",
      "clothes": "y2k_crop_top_low_rise",
      "expression": "deadpan_soul_stare",
      "pose": "neutral"
    },
    "camera": {
      "x": 960,
      "y": 500,
      "zoom": 1.75
    },
    "activeProp": {
      "id": "PROP-BOT",
      "x": 1360,
      "y": 450,
      "scale": 1.3
    },
    "bannerText": "FACIAL MONOCULTURE: 99.9% SYMMETRY",
    "graphicType": "RADAR",
    "text": "faces and bodies into a startling sameness. It'sIt\u2019s a monoculture of extreme thinness, perfectly symmetrical"
  },
  {
    "beatId": 74,
    "startSec": 532.504,
    "endSec": 540.593,
    "dur": 8.089,
    "bgId": "BG-CLINIC",
    "actor": {
      "id": "actor_74",
      "x": 960,
      "y": 640,
      "scale": 1.34,
      "gender": "female",
      "hairStyle": "female_slicked_back",
      "clothes": "y2k_crop_top_low_rise",
      "expression": "deadpan_soul_stare",
      "pose": "neutral"
    },
    "camera": {
      "x": 960,
      "y": 500,
      "zoom": 1.75
    },
    "activeProp": {
      "id": "PROP-BOT",
      "x": 1360,
      "y": 450,
      "scale": 1.3
    },
    "bannerText": "FACIAL MONOCULTURE: 99.9% SYMMETRY",
    "graphicType": "RADAR",
    "text": "features, and absolutely no signs of aging, stress, or human emotion. Faces are literally losing their ability to convey natural feeling"
  },
  {
    "beatId": 75,
    "startSec": 540.593,
    "endSec": 547.429,
    "dur": 6.836,
    "bgId": "BG-CLINIC",
    "actor": {
      "id": "actor_75",
      "x": 960,
      "y": 640,
      "scale": 1.34,
      "gender": "female",
      "hairStyle": "female_slicked_back",
      "clothes": "y2k_crop_top_low_rise",
      "expression": "deadpan_soul_stare",
      "pose": "neutral"
    },
    "camera": {
      "x": 960,
      "y": 500,
      "zoom": 1.75
    },
    "activeProp": {
      "id": "PROP-BOT",
      "x": 1360,
      "y": 450,
      "scale": 1.3
    },
    "bannerText": "FACIAL MONOCULTURE: 99.9% SYMMETRY",
    "graphicType": "RADAR",
    "text": "becausethey've they\u2019ve been Botoxed, lifted, tucked, and drained of all organic matter. It is really hard to emotionally connect with a character going"
  },
  {
    "beatId": 76,
    "startSec": 547.429,
    "endSec": 556.34,
    "dur": 8.911,
    "bgId": "BG-CLINIC",
    "actor": {
      "id": "actor_76",
      "x": 960,
      "y": 640,
      "scale": 1.34,
      "gender": "female",
      "hairStyle": "female_slicked_back",
      "clothes": "y2k_crop_top_low_rise",
      "expression": "deadpan_soul_stare",
      "pose": "neutral"
    },
    "camera": {
      "x": 960,
      "y": 500,
      "zoom": 1.75
    },
    "activeProp": {
      "id": "PROP-BOT",
      "x": 1360,
      "y": 450,
      "scale": 1.3
    },
    "bannerText": "FACIAL MONOCULTURE: 99.9% SYMMETRY",
    "graphicType": "RADAR",
    "text": "through a tragic divorce on screen when their forehead remains completely smooth and stationary while they cry. Ultimately, the reason celebrities are getting so lean, and doing"
  },
  {
    "beatId": 77,
    "startSec": 556.34,
    "endSec": 565.138,
    "dur": 8.798,
    "bgId": "BG-CLINIC",
    "actor": {
      "id": "actor_77",
      "x": 960,
      "y": 640,
      "scale": 1.34,
      "gender": "female",
      "hairStyle": "female_slicked_back",
      "clothes": "y2k_crop_top_low_rise",
      "expression": "deadpan_soul_stare",
      "pose": "neutral"
    },
    "camera": {
      "x": 960,
      "y": 500,
      "zoom": 1.75
    },
    "activeProp": {
      "id": "PROP-BOT",
      "x": 1360,
      "y": 450,
      "scale": 1.3
    },
    "bannerText": "FACIAL MONOCULTURE: 99.9% SYMMETRY",
    "graphicType": "RADAR",
    "text": "it so fast, is that the barrier to extreme thinness has finally been removed for those who can afford it. We live in a culture that associates morality, discipline, and"
  },
  {
    "beatId": 78,
    "startSec": 565.138,
    "endSec": 572.002,
    "dur": 6.864,
    "bgId": "BG-CLINIC",
    "actor": {
      "id": "actor_78",
      "x": 960,
      "y": 640,
      "scale": 1.34,
      "gender": "female",
      "hairStyle": "female_slicked_back",
      "clothes": "y2k_crop_top_low_rise",
      "expression": "deadpan_soul_stare",
      "pose": "neutral"
    },
    "camera": {
      "x": 960,
      "y": 500,
      "zoom": 1.75
    },
    "activeProp": {
      "id": "PROP-BOT",
      "x": 1360,
      "y": 450,
      "scale": 1.3
    },
    "bannerText": "FACIAL MONOCULTURE: 99.9% SYMMETRY",
    "graphicType": "RADAR",
    "text": "health with being thin. The body positivity movement was a really nice idea, and maybe it helped some regular people feel better about themselves for"
  },
  {
    "beatId": 79,
    "startSec": 572.002,
    "endSec": 578.322,
    "dur": 6.32,
    "bgId": "BG-CLINIC",
    "actor": {
      "id": "actor_79",
      "x": 960,
      "y": 640,
      "scale": 1.34,
      "gender": "female",
      "hairStyle": "female_slicked_back",
      "clothes": "y2k_crop_top_low_rise",
      "expression": "deadpan_soul_stare",
      "pose": "neutral"
    },
    "camera": {
      "x": 960,
      "y": 500,
      "zoom": 1.75
    },
    "activeProp": {
      "id": "PROP-BOT",
      "x": 1360,
      "y": 450,
      "scale": 1.3
    },
    "bannerText": "FACIAL MONOCULTURE: 99.9% SYMMETRY",
    "graphicType": "RADAR",
    "text": "a few years, but it was always fighting a losing battle against a society that inherently values taking up less physical space."
  },
  {
    "beatId": 80,
    "startSec": 578.847,
    "endSec": 584.767,
    "dur": 5.92,
    "bgId": "BG-OFFICE",
    "actor": {
      "id": "actor_80",
      "x": 960,
      "y": 640,
      "scale": 1.34,
      "gender": "male",
      "hairStyle": "host_classic",
      "clothes": "suit",
      "expression": "smug_chef_kiss",
      "pose": "neutral"
    },
    "camera": {
      "x": 960,
      "y": 520,
      "zoom": 1.4
    },
    "activeProp": {
      "id": "PROP-MONEY",
      "x": 1320,
      "y": 420,
      "scale": 1.3
    },
    "bannerText": "TOTAL: ,700 / MONTH",
    "graphicType": null,
    "text": "Once the rich and famous found a way to opt out of the biological struggle of weight management, they did exactly what you would"
  },
  {
    "beatId": 81,
    "startSec": 584.767,
    "endSec": 591.071,
    "dur": 6.304,
    "bgId": "BG-OFFICE",
    "actor": {
      "id": "actor_81",
      "x": 960,
      "y": 640,
      "scale": 1.34,
      "gender": "male",
      "hairStyle": "host_classic",
      "clothes": "suit",
      "expression": "smug_chef_kiss",
      "pose": "neutral"
    },
    "camera": {
      "x": 960,
      "y": 520,
      "zoom": 1.4
    },
    "activeProp": {
      "id": "PROP-MONEY",
      "x": 1320,
      "y": 420,
      "scale": 1.3
    },
    "bannerText": "TOTAL: ,700 / MONTH",
    "graphicType": null,
    "text": "expect them to do: they took the shortcut and then lied about it. And they left the rest of us behind to wonder why wecan't can\u2019t look"
  },
  {
    "beatId": 82,
    "startSec": 591.071,
    "endSec": 597.231,
    "dur": 6.16,
    "bgId": "BG-OFFICE",
    "actor": {
      "id": "actor_82",
      "x": 960,
      "y": 640,
      "scale": 1.34,
      "gender": "male",
      "hairStyle": "host_classic",
      "clothes": "suit",
      "expression": "smug_chef_kiss",
      "pose": "neutral"
    },
    "camera": {
      "x": 960,
      "y": 520,
      "zoom": 1.4
    },
    "activeProp": {
      "id": "PROP-MONEY",
      "x": 1320,
      "y": 420,
      "scale": 1.3
    },
    "bannerText": "TOTAL: ,700 / MONTH",
    "graphicType": null,
    "text": "like them, completely ignoring the fact that it costs about twelve hundred dollars a month in off-label diabetes medication"
  },
  {
    "beatId": 83,
    "startSec": 597.231,
    "endSec": 602.947,
    "dur": 5.716,
    "bgId": "BG-OFFICE",
    "actor": {
      "id": "actor_83",
      "x": 960,
      "y": 640,
      "scale": 1.34,
      "gender": "male",
      "hairStyle": "host_classic",
      "clothes": "suit",
      "expression": "smug_chef_kiss",
      "pose": "neutral"
    },
    "camera": {
      "x": 960,
      "y": 520,
      "zoom": 1.4
    },
    "activeProp": {
      "id": "PROP-MONEY",
      "x": 1320,
      "y": 420,
      "scale": 1.3
    },
    "bannerText": "TOTAL: ,700 / MONTH",
    "graphicType": null,
    "text": "to achieve it. It creates a massive economic divide that now includes basic biological urges."
  },
  {
    "beatId": 84,
    "startSec": 603.585,
    "endSec": 609.745,
    "dur": 6.16,
    "bgId": "BG-OFFICE",
    "actor": {
      "id": "actor_84",
      "x": 960,
      "y": 640,
      "scale": 1.34,
      "gender": "male",
      "hairStyle": "host_classic",
      "clothes": "suit",
      "expression": "smug_chef_kiss",
      "pose": "neutral"
    },
    "camera": {
      "x": 960,
      "y": 520,
      "zoom": 1.4
    },
    "activeProp": {
      "id": "PROP-MONEY",
      "x": 1320,
      "y": 420,
      "scale": 1.3
    },
    "bannerText": "TOTAL: ,700 / MONTH",
    "graphicType": null,
    "text": "Rich people no longer have to feel hungryThey've. They\u2019ve outsourced appetite control to big pharma, the same way they outsource"
  },
  {
    "beatId": 85,
    "startSec": 609.745,
    "endSec": 618.168,
    "dur": 8.423,
    "bgId": "BG-OFFICE",
    "actor": {
      "id": "actor_85",
      "x": 960,
      "y": 640,
      "scale": 1.34,
      "gender": "male",
      "hairStyle": "host_classic",
      "clothes": "suit",
      "expression": "smug_chef_kiss",
      "pose": "neutral"
    },
    "camera": {
      "x": 960,
      "y": 520,
      "zoom": 1.4
    },
    "activeProp": {
      "id": "PROP-MONEY",
      "x": 1320,
      "y": 420,
      "scale": 1.3
    },
    "bannerText": "TOTAL: ,700 / MONTH",
    "graphicType": null,
    "text": "their driving, their cleaning, and their child-rearing. So, the next time you see a celebrity on a press tour looking like they could comfortably fit inside a standard business envelope"
  },
  {
    "beatId": 86,
    "startSec": 618.488,
    "endSec": 627.141,
    "dur": 8.653,
    "bgId": "BG-OFFICE",
    "actor": {
      "id": "actor_86",
      "x": 960,
      "y": 640,
      "scale": 1.34,
      "gender": "male",
      "hairStyle": "host_classic",
      "clothes": "suit",
      "expression": "smug_chef_kiss",
      "pose": "neutral"
    },
    "camera": {
      "x": 960,
      "y": 520,
      "zoom": 1.4
    },
    "activeProp": {
      "id": "PROP-MONEY",
      "x": 1320,
      "y": 420,
      "scale": 1.3
    },
    "bannerText": "TOTAL: ,700 / MONTH",
    "graphicType": null,
    "text": ", please do not feel bad about yourself. You are not lacking discipline. You are not lazy. You are just lacking a concierge doctor, an endless budget, and a casual"
  },
  {
    "beatId": 87,
    "startSec": 627.141,
    "endSec": 633.535,
    "dur": 6.394,
    "bgId": "BG-END",
    "actor": {
      "id": "actor_87",
      "x": 680,
      "y": 640,
      "scale": 1.34,
      "gender": "male",
      "hairStyle": "host_classic",
      "clothes": "none",
      "expression": "deadpan_slow_blink",
      "pose": "pointing_right"
    },
    "camera": {
      "x": 960,
      "y": 520,
      "zoom": 1.4
    },
    "activeProp": {
      "id": "PROP-SUB",
      "x": 1320,
      "y": 420,
      "scale": 1.3
    },
    "bannerText": "SUBSCRIBE (OR DON'T)",
    "graphicType": "STAMP",
    "text": "disregard for your own gastric emptying process. Hollywoodhasn't hasn\u2019t progressed past its toxic beauty standards"
  },
  {
    "beatId": 88,
    "startSec": 633.535,
    "endSec": 642.251,
    "dur": 8.716,
    "bgId": "BG-END",
    "actor": {
      "id": "actor_88",
      "x": 680,
      "y": 640,
      "scale": 1.34,
      "gender": "male",
      "hairStyle": "host_classic",
      "clothes": "none",
      "expression": "deadpan_slow_blink",
      "pose": "pointing_right"
    },
    "camera": {
      "x": 960,
      "y": 520,
      "zoom": 1.4
    },
    "activeProp": {
      "id": "PROP-SUB",
      "x": 1320,
      "y": 420,
      "scale": 1.3
    },
    "bannerText": "SUBSCRIBE (OR DON'T)",
    "graphicType": "STAMP",
    "text": "; they just got access to better drugs and better surgeons. That'sThat\u2019s my first video on YouTube. Subscribe if you want to. Ordon'tI'm don\u2019t. I\u2019m not your dad"
  },
  {
    "beatId": 89,
    "startSec": 642.251,
    "endSec": 643.531,
    "dur": 1.28,
    "bgId": "BG-END",
    "actor": {
      "id": "actor_89",
      "x": 680,
      "y": 640,
      "scale": 1.34,
      "gender": "male",
      "hairStyle": "host_classic",
      "clothes": "none",
      "expression": "deadpan_slow_blink",
      "pose": "pointing_right"
    },
    "camera": {
      "x": 960,
      "y": 520,
      "zoom": 1.4
    },
    "activeProp": {
      "id": "PROP-SUB",
      "x": 1320,
      "y": 420,
      "scale": 1.3
    },
    "bannerText": "SUBSCRIBE (OR DON'T)",
    "graphicType": "STAMP",
    "text": ", and frankly, Idon't don\u2019t care."
  }
];

export function getActiveBeat(timeSec: number): MovieBeat {
  if (timeSec < MOVIE_BEATS[0].startSec) return MOVIE_BEATS[0];
  for (let i = 0; i < MOVIE_BEATS.length - 1; i++) {
    const b = MOVIE_BEATS[i];
    const nextB = MOVIE_BEATS[i + 1];
    if (timeSec >= b.startSec && timeSec < nextB.startSec) {
      return b;
    }
  }
  return MOVIE_BEATS[MOVIE_BEATS.length - 1];
}

const fs = require('fs');

const storyboard = {
  manifestVersion: "2.0.0",
  projectTitle: "Casually Explained: The Great Hollywood Thinning & The GLP-1 Meta",
  director: "Casually Explained Animation Director Agent",
  totalDuration: 185.886,
  targetCanvas: {
    width: 1920,
    height: 1080,
    aspectRatio: "16:9",
    frameRate: 60,
    defaultViewBox: [0, 0, 1920, 1080],
    backgroundColor: "#FBFBF9"
  },
  mediaSources: {
    audioFile: "/root/Desktop/Finaljenna.mp3",
    srtFile: "/root/Desktop/0-chapter-1.srt",
    characterRefPng: "/root/Desktop/Picsart_26-08-16_20-36-21-244.png",
    referenceImagesDir: "/root/Desktop/chapter_1_full_timestamped_final/"
  },
  styleGuide: {
    aesthetic: "Casually Explained / MS Paint minimalist vector whiteboard animation",
    colorPalette: {
      background: "#FBFBF9",
      inkBlack: "#111111",
      sketchGray: "#64748B",
      whiteboardWhite: "#FFFFFF",
      markerRed: "#EF4444",
      markerBlue: "#3B82F6",
      markerGreen: "#10B981",
      highlighterYellow: "#FDE047",
      skinTonePeach: "#F5D6B4"
    }
  },
  characterSystem: {
    name: "Host (Casually Explained Stick Figure)",
    reference: "/root/Desktop/Picsart_26-08-16_20-36-21-244.png",
    anatomy: {
      head: { rx: 52, ry: 58, fill: "#F5D6B4", stroke: "#111111", strokeWidth: 10 },
      hair: "messy_wavy_curly_black",
      mouthShapes: ["smile_teeth", "talking_open", "deadpan_line", "open_O", "smirk", "scream", "slight_smile"],
      eyeStyles: ["normal", "shock", "squint", "tim_burton_spiral", "ps1_poly", "laser"]
    }
  },
  scenes: [
    {
      id: 1,
      name: "Red Carpet & Ecosystem Shift",
      startTime: 0.0,
      endTime: 10.32,
      subtitles: [1, 2, 3],
      camera: { motion: "slow_pan_zoom", start: [960, 540, 1.0], end: [1100, 500, 1.25] },
      character: { pose: "neutral_talk", gaze: "look_right", mouth: "talking_open" },
      gags: ["Red Carpet with Paparazzi Flashes", "Giant Instagram Feed with Flying Hearts", "Hollywood Ecosystem Food Chain Whiteboard"],
      referenceImages: ["00m00s-00m03s_P0_jNSMuYIMuPhn.jpg", "00m03s-00m10s_P1_asDVjYVAUHos.jpg", "00m10s-00m16s_P1_Xgkbcktr24OF.jpg"]
    },
    {
      id: 2,
      name: "Thicc to Stick & Tech Bro Pivot",
      startTime: 10.32,
      endTime: 16.875,
      subtitles: [4, 5],
      camera: { motion: "whip_pan_shake", zoom: 1.2 },
      character: { pose: "point_right_to_deadpan", gaze: "look_right", mouth: "deadpan_line" },
      gags: ["Hyper-speed Slider: THICC -> STICK", "Tech Bro instant poof from Bitcoin Hoodie to AI Prompt Engineer Lanyard"],
      referenceImages: []
    },
    {
      id: 3,
      name: "Celebrity Lean Caliper Inspection",
      startTime: 16.875,
      endTime: 23.675,
      subtitles: [6, 7],
      camera: { motion: "cut_close_up", zoom: 1.18 },
      character: { pose: "magnifying_inspection", gaze: "look_right", mouth: "talking_open" },
      gags: ["Polaroid Pop-ins of Jenna Ortega & Stars", "Giant Comic Calipers (-40% Width)", "Jawline Sharpness +300% Annotation"],
      referenceImages: ["00m16s-00m23s_P0_dE2sYmsioUfQ.jpg", "00m23s-00m32s_P1_Cnu1VBm6CjgF.jpg"]
    },
    {
      id: 4,
      name: "Unsubscribe from Carbs & Cancel Lunch",
      startTime: 23.675,
      endTime: 32.862,
      subtitles: [8, 9, 10],
      camera: { motion: "push_in_on_modal", zoom: 1.15 },
      character: { pose: "shrug", gaze: "look_left", mouth: "talking_open" },
      gags: ["macOS Unsubscribe Confirmation Dialog", "Pizza and Bread sucked into trash", "Google Calendar Lunch Slot stamped CANCELLED"],
      referenceImages: []
    },
    {
      id: 5,
      name: "Tim Burton & PS1 Low-Poly",
      startTime: 32.862,
      endTime: 43.285,
      subtitles: [11, 12, 13, 14],
      camera: { motion: "glitch_cut", zoom: 1.1 },
      character: { pose: "gothic_to_faceted", eyeStyle: "tim_burton_spiral_then_ps1", mouth: "talking_open" },
      gags: ["Gothic Moon and Spiral Hill Any% Speedrun", "Retro 1996 CRT Scanlines", "Flat-shaded 14-polygon PS1 stick figure model"],
      referenceImages: ["00m32s-00m42s_P1_sOcn3DSdXH3p.jpg"]
    },
    {
      id: 6,
      name: "Terrifying Beauty Pendulum",
      startTime: 43.285,
      endTime: 57.574,
      subtitles: [15, 16, 17, 18, 19],
      camera: { motion: "wide_then_zoom_worker", zoom: 1.22 },
      character: { pose: "point_pendulum", gaze: "look_right", mouth: "talking_open" },
      gags: ["Sinusoidal Swinging Scary Pendulum of Insecurity", "Working Class stick figure crying with empty $0 wallet"],
      referenceImages: ["00m46s-00m57s_P0_KJ7ASUmM1AuC.jpg"]
    },
    {
      id: 7,
      name: "90s Heroin Chic & Victorian Wasting Disease",
      startTime: 57.574,
      endTime: 84.15,
      subtitles: [20, 21, 22, 23, 24, 25, 26, 27],
      camera: { motion: "spotlight_pan", zoom: 1.15 },
      character: { pose: "slouch_sunglasses_to_faint", handProps: ["diet_coke", "cigarette"], mouth: "deadpan_line" },
      gags: ["1990s Daily Nutrition Pyramid (Diet Coke + Parliament + Apathy)", "Victorian Chaise Lounge Fainting Couch with Lace Handkerchief"],
      referenceImages: ["00m57s-01m05s_P0_rdCuAj7HPqpT.jpg", "01m05s-01m12s_P0_KgXDujRAfM45.jpg"]
    },
    {
      id: 8,
      name: "2010s BBL & Pixar Mom Gravitational Field",
      startTime: 84.15,
      endTime: 110.89,
      subtitles: [28, 29, 30, 31, 32, 33, 34, 35],
      camera: { motion: "hard_swing_zoom", zoom: 1.2 },
      character: { pose: "point_curve_physics", gaze: "look_right", mouth: "talking_open" },
      gags: ["Pixar Mom 1:12 Waist-to-Hip Diagram", "Concentric Gravitational Field pulling in iPhones/Dumbbells", "Gym Influencer doing 2mm micro-squats with 1px forearms"],
      referenceImages: ["01m25s-01m33s_P0_BNcYNEsHPmPt.jpg"]
    },
    {
      id: 9,
      name: "Hourglass Sand Overflow & Corporate Body Positivity",
      startTime: 110.89,
      endTime: 135.433,
      subtitles: [36, 37, 38, 39, 40, 41, 42],
      camera: { motion: "slow_push_in", zoom: 1.12 },
      character: { pose: "presentation_host", handProps: ["mic"], mouth: "smirk" },
      gags: ["Glass Hourglass cracking from bottom overflow", "Corporate PR slide with pastel rainbow stick figures holding hands"],
      referenceImages: ["02m00s-02m09s_P0_3EzcHHw9HEc2.jpg"]
    },
    {
      id: 10,
      name: "Fidget Spinner, Podcast & Boss Closes Tab",
      startTime: 135.433,
      endTime: 154.828,
      subtitles: [43, 44, 45, 46, 47, 48, 49, 50],
      camera: { motion: "crash_slam_shake", zoom: 1.2 },
      character: { pose: "fidget_spin_to_ctrl_w", mouth: "deadpan_line" },
      gags: ["Spinning Fidget Spinner + 0 Listeners Podcast", "Divine GLP-1 Pen descending with golden sunbeams", "Ctrl+W panic tab closure to fake Excel spreadsheet"],
      referenceImages: ["02m22s-02m31s_P0_tcVkmZihKdAe.webp"]
    },
    {
      id: 11,
      name: "Y2K Organ-Hostile Fashion & $2000 Belt Skirt",
      startTime: 154.828,
      endTime: 185.886,
      subtitles: [51, 52, 53, 54, 55, 56, 57, 58, 59, 60],
      camera: { motion: "pan_trio_showcase", zoom: 1.18 },
      character: { pose: "facepalm_exasperation", mouth: "deadpan_line" },
      gags: ["Internal Organs Prohibited Hazard Chart", "Low-rise jeans below pelvis + Napkin Baby Tee", "Miu Miu $2,000 Leather Belt Skirt with price tag", "Critical Biological Exception: Solid Food Detected"],
      referenceImages: ["02m41s-02m50s_P0_eB45IBS3jFAC.jpg", "02m50s-03m00s_P1_oXnvbtznT5VD.jpg", "03m00s-03m06s_P0_jzB3tix5WANh.jpg"]
    }
  ]
};

fs.writeFileSync('/root/Desktop/casually-explained-video/storyboard.json', JSON.stringify(storyboard, null, 2));
console.log('Successfully generated storyboard.json with', storyboard.scenes.length, 'scenes, duration:', storyboard.totalDuration);

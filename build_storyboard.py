import json
import os

# Complete storyboard generator script for Casually Explained animation
storyboard = {
    "manifestVersion": "2.0.0",
    "projectTitle": "Casually Explained: The Great Hollywood Thinning & The GLP-1 Meta",
    "director": "Casually Explained Animation Director Agent",
    "targetCanvas": {
        "width": 1920,
        "height": 1080,
        "aspectRatio": "16:9",
        "frameRate": 60,
        "defaultViewBox": [0, 0, 1920, 1080],
        "backgroundColor": "#FBFBF9",
        "gridColor": "#E5E7EB",
        "gridSize": 40
    },
    "mediaSources": {
        "audioFile": "/root/Desktop/Finaljenna.mp3",
        "srtFile": "/root/Desktop/0-chapter-1.srt",
        "characterRefPng": "/root/Desktop/Picsart_26-08-16_20-36-21-244.png",
        "referenceImagesDir": "/root/Desktop/chapter_1_full_timestamped_final/"
    },
    "styleGuide": {
        "aesthetic": "Casually Explained / MS Paint minimalist vector whiteboard animation",
        "colorPalette": {
            "background": "#FBFBF9",
            "canvasBorder": "#E2E8F0",
            "inkBlack": "#111111",
            "sketchGray": "#64748B",
            "whiteboardWhite": "#FFFFFF",
            "markerRed": "#EF4444",
            "markerBlue": "#3B82F6",
            "markerGreen": "#10B981",
            "highlighterYellow": "#FDE047",
            "highlighterOrange": "#FB923C",
            "gothicPurple": "#A855F7",
            "y2kPink": "#EC4899",
            "skinTonePeach": "#F5D6B4"
        },
        "typography": {
            "primary": "'Inter', 'Comic Neue', 'Patrick Hand', sans-serif",
            "handwriting": "'Patrick Hand', 'Caveat', cursive",
            "impactMeme": "'Impact', 'Bangers', sans-serif",
            "monospaceRetro": "'Courier New', monospace"
        },
        "linesAndStrokes": {
            "defaultStrokeWidth": 12,
            "thinStrokeWidth": 6,
            "heavyStrokeWidth": 18,
            "lineCap": "round",
            "lineJoin": "round"
        }
    },
    "characterSystem": {
        "characterName": "Host (Casually Explained Stick Figure)",
        "modelReference": "/root/Desktop/Picsart_26-08-16_20-36-21-244.png",
        "baseAnatomy": {
            "head": {
                "shape": "ellipse",
                "rx": 52,
                "ry": 58,
                "fillColor": "#F5D6B4",
                "strokeColor": "#111111",
                "strokeWidth": 10
            },
            "hair": {
                "type": "messy_spikes_silhouette",
                "fillColor": "#111111",
                "description": "Loose, messy choppy black hair covering crown, left temple tufts, and right jagged bangs matching reference PNG"
            },
            "eyebrows": {
                "type": "dual_dynamic_arcs",
                "strokeColor": "#111111",
                "strokeWidth": 8,
                "states": ["neutral", "skeptical_raise", "shocked_arch", "furrowed_angry", "deadpan_flat"]
            },
            "eyes": {
                "types": [
                    "look_camera",
                    "look_left",
                    "look_right",
                    "roll_eyes",
                    "wide_shock",
                    "squint",
                    "tim_burton_spiral",
                    "ps1_poly"
                ],
                "defaultSclera": "#FFFFFF",
                "defaultPupil": "#111111"
            },
            "mouth": {
                "shapes": [
                    "talk_wide",
                    "straight_line",
                    "open_O",
                    "smirk",
                    "scream",
                    "slight_smile"
                ],
                "strokeColor": "#111111",
                "strokeWidth": 8,
                "strokeLinecap": "round"
            },
            "body": {
                "neck": {"length": 18, "strokeWidth": 12},
                "torso": {"length": 140, "strokeWidth": 14, "strokeColor": "#111111"},
                "arms": {"upperArmLength": 65, "forearmLength": 60, "strokeWidth": 12, "strokeColor": "#111111"},
                "legs": {"thighLength": 75, "shinLength": 75, "strokeWidth": 12, "strokeColor": "#111111"}
            }
        },
        "poses": {
            "neutral_talk": "Standing upright with slight casual posture, left arm slightly relaxed at side, right arm gesturing subtly with conversational rhythm.",
            "point_right": "Left hand on hip, right arm extended straight or slightly angled pointing wooden pointer / laser at right-hand chart.",
            "point_left": "Right hand relaxed, left arm extended pointing back towards previous graph on the left.",
            "shrug": "Shoulders elevated, both elbows bent 90 degrees outward, palms facing upwards, head tilted 4 degrees.",
            "deadpan_stare": "Both arms hanging completely vertical, motionless posture, pupils locked directly forward at camera lens, zero emotion.",
            "shock": "Body recoiling 8 degrees backward, arms thrown slightly back, hands open-fingered, jaw dropped in astonishment.",
            "facepalm": "Left arm hanging down, right elbow raised with hand slapped flat over eyes and forehead in exasperation.",
            "sip_diet_coke": "Right arm bent holding a silver Diet Coke can with red logo to mouth, left arm at waist, eyes half-lidded in apathy.",
            "typing": "Hunched forward slightly, both arms bent forward tapping rapidly on an SVG laptop keyboard with motion lines.",
            "workout_squat": "Knees bent at deep 90-degree angle, torso tilted forward, arms clenched in front, sweat droplets flying.",
            "victor_faint": "Dramatic 42-degree backward recline across a Victorian velvet chaise lounge, limp wrist dangling a lace handkerchief."
        },
        "props": [
            "wooden_pointer",
            "caliper_tool",
            "magnifying_glass",
            "diet_coke_can",
            "iceberg_lettuce",
            "belt_skirt",
            "fidget_spinner",
            "podcast_mic",
            "parliament_cigarette",
            "laptop_office",
            "laser_pointer",
            "velvet_chaise_lounge"
        ]
    },
    "timelineOverview": {
        "totalScenes": 11,
        "totalTimeSeconds": 185.886,
        "coveredSubtitleRange": "Subtitles 1 to 60 (00:00:00,000 -> 00:03:05,886)"
    },
    "scenes": []
}

print("Base setup loaded")

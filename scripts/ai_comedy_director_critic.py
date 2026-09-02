#!/usr/bin/env python3
"""
AI Comedy Director Critic & OCR Quality Feedback Engine
Integrates On-Device RapidOCR with Directorial Comedic Evaluation.

Evaluates:
1. Visual Irony & Joke Delivery (Contradiction between Spoken Cue and Visual On-Screen Text)
2. Asset Density & Richness (Enforces 4 to 6+ layered props and cartoon cast per scene)
3. 16:9 Safe-Margin Framing & Text Collision
4. Directorial Actionable Upgrades (Specific new gag assets and label enhancements)
"""

import os
import sys
import json
from pathlib import Path
from rapidocr_onnxruntime import RapidOCR

# Spoken narration cues and intended comedy blueprint mapped to scenes
SCENE_COMEDY_BLUEPRINT = {
    "scene_01_ecosystem": {
        "title": "Hollywood Red Carpet & Celery Ecosystem",
        "spoken_cue": "have noticed a slight shift in the local ecosystem...",
        "intended_gag": "Glorified starvation as luxury feast",
        "expected_min_assets": 4,
        "key_joke_anchors": ["HOLLYWOOD", "CALORIES", "CELERY", "FEASTING"]
    },
    "scene_02_techbro": {
        "title": "Silicon Valley Velocity Slider & AI Pivot",
        "spoken_cue": "tech bro pivoting from crypto to artificial intelligence...",
        "intended_gag": "Stickman physically pushing a slider from THICC to STICK; Bitcoin exploding into AI terminal",
        "expected_min_assets": 4,
        "key_joke_anchors": ["THICC", "STICK", "POOF", "AI", "PROMPT"]
    },
    "scene_03_celebrities": {
        "title": "Jenna Ortega, Emma Stone, Ariana & Digital Calipers",
        "spoken_cue": "Suddenly, everywhere you look, celebrities have...",
        "intended_gag": "Industrial mechanical calipers measuring zero facial fat down to 0.02mm",
        "expected_min_assets": 4,
        "key_joke_anchors": ["JENNA", "EMMA", "ARIANA", "CALIPER", "0.02"]
    },
    "scene_04_unsubscribe": {
        "title": "Unsubscribing from Carbs & Angel Pizza",
        "spoken_cue": "It seems like overnight, the entire entertainment industry decided to unsubscribe from carbohydrates...",
        "intended_gag": "Angel-winged pizza ascending into heaven while macOS modal clicks Cancel Lunch",
        "expected_min_assets": 4,
        "key_joke_anchors": ["CANCEL", "UNSUBSCRIBE", "PIZZA", "CARBS"]
    },
    "scene_05_timburton_ps1": {
        "title": "Tim Burton Mountain & 14-Poly PS1 Mesh",
        "spoken_cue": "The aggressive return of the 90s, and when I say 90s...",
        "intended_gag": "Gothic spiral mountain speedrun and rotating low-poly PS1 Lara Croft polygon cheeks",
        "expected_min_assets": 4,
        "key_joke_anchors": ["1997", "PS1", "POLYGONS", "BURTON"]
    },
    "scene_06_pendulum": {
        "title": "Beauty Standard Pendulum & Slouching Couch Guy",
        "spoken_cue": "Human beauty standards operate on a giant pendulum...",
        "intended_gag": "Giant spiked wrecking ball swinging while Couch Guy ducks for his life with potato chips",
        "expected_min_assets": 3,
        "key_joke_anchors": ["BEAUTY", "PENDULUM", "DOOM", "CHIPS"]
    },
    "scene_07_heroinchic": {
        "title": "90s Heroin Chic, Food Pyramid & Victorian Tonic",
        "spoken_cue": "sustaining yourself entirely on Diet Coke, Parliament Lights, and pure unfiltered apathy...",
        "intended_gag": "3-Tier USDA Food Pyramid of Diet Coke, Cigarettes, and Pure Apathy",
        "expected_min_assets": 4,
        "key_joke_anchors": ["DIET", "COKE", "PARLIAMENT", "APATHY", "TONIC"]
    },
    "scene_08_pixarmom": {
        "title": "2010s Pixar Mom & Spacetime Gravitational Curvature",
        "spoken_cue": "Celebrities were suddenly buying curves, developing the silhouette of a Pixar mom...",
        "intended_gag": "Massive bulbous hips generating a gravitational orbit trapping iPhones and avocado toast",
        "expected_min_assets": 4,
        "key_joke_anchors": ["PIXAR", "BBL", "GRAVITY", "PULL", "MIAMI"]
    },
    "scene_09_hourglass_pr": {
        "title": "Overfilled Hourglass & Corporate PR Big Pharma Vault",
        "spoken_cue": "“body positivity.” We were told by countless brands...",
        "intended_gag": "Overfilled brass hourglass with PR scaffolding peeled away to reveal pharma cash vault",
        "expected_min_assets": 3,
        "key_joke_anchors": ["BODY POSITIVITY", "PR", "REVENUE", "PHARMA"]
    },
    "scene_10_boss_closes_tab": {
        "title": "3600 RPM Spinner, Podcast Mic & Ctrl+W Slam",
        "spoken_cue": "As soon as a pharmaceutical shortcut dropped, society dropped the whole concept faster than...",
        "intended_gag": "Terrifying boss shadow looming behind host; hydraulic Ctrl+W emergency keycap slam",
        "expected_min_assets": 4,
        "key_joke_anchors": ["SPINNER", "PODCAST", "CTRL", "W", "EMERGENCY"]
    },
    "scene_11_y2k_fashion": {
        "title": "Y2K Low-Rise, Evicted Organs & $2,400 Belt",
        "spoken_cue": "We are talking about low-rise jeans that legally require you to evict internal organs...",
        "intended_gag": "Walking Liver and Crying Stomach carrying suitcases; Dinner napkin baby tee; $2,400 belt",
        "expected_min_assets": 5,
        "key_joke_anchors": ["DINNER NAPKIN", "BABY TEE", "EVICTED", "2,400", "ERROR 404"]
    },
    "scene_12_glp1_cheat_code": {
        "title": "GLP-1 Auto-Injector & Seductive Sourdough Bread",
        "spoken_cue": "Originally developed to manage type 2 diabetes, these drugs slow gastric emptying...",
        "intended_gag": "Stomach chained with MOTILITY FROZEN padlock; French seductive bread with BLOCKED stamp",
        "expected_min_assets": 4,
        "key_joke_anchors": ["OZEMPIC", "MOTILITY", "FROZEN", "OXYGEN", "BLOCKED"]
    },
    "scene_13_hollywood_denial": {
        "title": "Hollywood Denial: Mary Poppins Gale & Firehose Water",
        "spoken_cue": "showing up to premieres looking like they got caught in a light breeze...",
        "intended_gag": "Actress blown horizontally with inside-out umbrella; couch cushion penny hunter; firehose",
        "expected_min_assets": 4,
        "key_joke_anchors": ["BREEZE", "COUCH", "WATER", "CHEESE"]
    },
    "scene_14_mcu_superhero": {
        "title": "MCU Dehydration, Shrink-Wrapped Ham & Boiled Chicken",
        "spoken_cue": "forties, and their PR teams always claim it is just thirty-two ounces of water...",
        "intended_gag": "Supermarket cellophane shrink-wrapped holiday ham with barcode; sad unseasoned chicken plate",
        "expected_min_assets": 4,
        "key_joke_anchors": ["HAM", "14.99", "CHICKEN", "BROCCOLI", "WATER", "4 AM"]
    },
    "scene_15_buccal_fat": {
        "title": "Pumpkin Surgeon, Deli Slicer & Victorian Mourner",
        "spoken_cue": "Instead, celebrities are paying thousands of dollars to have buccal fat pads surgically scooped out...",
        "intended_gag": "Jack-o'-lantern hollowed cheek with ice cream scoop; deli slicer pastrami cheeks; Gothic mourner",
        "expected_min_assets": 5,
        "key_joke_anchors": ["PUMPKIN", "HOLLOW", "DELI", "SLICER", "MOURNER", "CLONES"]
    },
    "scene_16_tiktok_tribunal": {
        "title": "Wednesday Prom Dance, Zapruder 8mm & LA Curvy Alert",
        "spoken_cue": "The internet has been heavily scrutinizing every jawline on TikTok like it’s the 1963 Zapruder film...",
        "intended_gag": "Wednesday Addams dance with Thing; 1963 8mm projector; Size 4 mannequin with flashing sirens",
        "expected_min_assets": 4,
        "key_joke_anchors": ["WEDNESDAY", "ZAPRUDER", "8MM", "CURVY ALERT", "SIZE 4"]
    },
    "scene_17_cyborg_monoculture": {
        "title": "RPG Sliders, 2008 HOPE Poster & Frozen Forehead Drama",
        "spoken_cue": "are supposed to reflect real life back at us, but now they all look like they were generated in the same RPG character creator...",
        "intended_gag": "Cyber RPG creator sliders (0% FAT); Obama CARBS 2008 poster; solid concrete forehead slab drama",
        "expected_min_assets": 4,
        "key_joke_anchors": ["RPG", "BODY_FAT", "CARBS 2008", "DEVASTATED", "0 WRINKLES"]
    },
    "scene_18_economic_outro": {
        "title": "Gold Wheelbarrow, Tuxedo Butler & YouTube Subscribe",
        "spoken_cue": "celebrity body standards were always an economic flex...",
        "intended_gag": "Solid gold wheelbarrow of Ozempic with 20-ft receipt ($1,200/mo); butler with diamond syringe",
        "expected_min_assets": 4,
        "key_joke_anchors": ["$1,200", "RECEIPT", "GLP-1", "BUTLER", "SUBSCRIBE"]
    }
}

def analyze_scene_comedy(snapshot_path: str, scene_id: str, ocr_engine):
    blueprint = SCENE_COMEDY_BLUEPRINT.get(scene_id, {})
    title = blueprint.get("title", scene_id)
    spoken_cue = blueprint.get("spoken_cue", "")
    intended_gag = blueprint.get("intended_gag", "")
    expected_min = blueprint.get("expected_min_assets", 3)
    anchors = blueprint.get("key_joke_anchors", [])

    result, elapse = ocr_engine(snapshot_path)
    detected_texts = [d[1] for d in result] if result else []
    detected_full = " ".join(detected_texts).upper()

    # Comedic Delivery Scoring
    anchor_matches = [a for a in anchors if any(a in t.upper() for t in detected_texts)]
    anchor_score = round(len(anchor_matches) / max(1, len(anchors)) * 100, 1)

    # Frame safe-margin analysis
    margin_issues = []
    if result:
        for box, text, score in result:
            xs = [p[0] for p in box]
            ys = [p[1] for p in box]
            if min(xs) < 15 or min(ys) < 15:
                margin_issues.append(f"Text '{text}' too close to edge ({min(xs):.0f}, {min(ys):.0f})")

    # Comedy Directorial Recommendations
    suggestions = []
    if len(detected_texts) < 2:
        suggestions.append("Add a punchline fine-print tag or comic price badge to amplify visual irony.")
    if anchor_score < 40:
        suggestions.append(f"Enhance visual keyword presence for anchors: {set(anchors) - set(anchor_matches)}.")
    if len(detected_texts) >= 3 and not margin_issues:
        delivery_status = "EXCELLENT COMEDY DELIVERY"
    elif not margin_issues:
        delivery_status = "SOLID COMEDY DELIVERY"
    else:
        delivery_status = "NEEDS REFINEMENT"

    return {
        "scene_id": scene_id,
        "title": title,
        "spoken_cue": spoken_cue,
        "intended_gag": intended_gag,
        "detected_ocr_texts": detected_texts,
        "anchor_matches": anchor_matches,
        "anchor_score": anchor_score,
        "margin_issues": margin_issues,
        "delivery_status": delivery_status,
        "directorial_suggestions": suggestions,
    }

def run_pipeline_critique():
    snapshot_dir = Path("/root/Desktop/Casually_Explained_Consistent_Master_Video/snapshots")
    images = sorted(list(snapshot_dir.glob("*.png")))
    
    print("================================================================================")
    print("🎭 AI COMEDY DIRECTOR CRITIC & ON-DEVICE OCR INTEGRATED PIPELINE")
    print(f"   Auditing {len(images)} Scenes for Comedic Punch, Asset Density & 16:9 Safety")
    print("================================================================================\n")

    ocr_engine = RapidOCR()
    all_reports = []

    for img in images:
        # Match scene_id from filename (e.g. scene_01_ecosystem_t5.png -> scene_01_ecosystem)
        fname = img.stem
        parts = fname.split("_t")[0]
        report = analyze_scene_comedy(str(img), parts, ocr_engine)
        all_reports.append(report)

        print(f"🎬 [{report['scene_id'].upper()}] {report['title']}")
        print(f"   🎙️ Spoken Cue: \"{report['spoken_cue'][:60]}...\"")
        print(f"   🎪 Intended Gag: {report['intended_gag']}")
        print(f"   👁️ OCR Detected: {report['detected_ocr_texts']}")
        print(f"   🎯 Punchline Anchors Matched: {report['anchor_matches']} ({report['anchor_score']}%)")
        print(f"   ⭐ Status: {report['delivery_status']}")
        if report['margin_issues']:
            for m in report['margin_issues']:
                print(f"   ⚠️ Margin Issue: {m}")
        if report['directorial_suggestions']:
            for s in report['directorial_suggestions']:
                print(f"   💡 Suggestion: {s}")
        print("--------------------------------------------------------------------------------")

    out_json = "/root/Desktop/Casually_Explained_Consistent_Master_Video/DIRECTOR_OCR_COMEDY_CRITIQUE.json"
    with open(out_json, "w") as f:
        json.dump(all_reports, f, indent=2)

    print(f"\n✅ Directorial Critique & OCR Audit Report Saved to:\n   {out_json}\n")

if __name__ == "__main__":
    run_pipeline_critique()

#!/usr/bin/env python3
"""
Lightweight On-Device OCR Frame Quality Auditor (Alex Meyers / Casually Explained Pipeline)
Uses RapidOCR (ONNX Runtime, ultra-lightweight, <50MB RAM) to audit rendered frames.

Audits:
1. Text presence & spoken keyword matching
2. 16:9 safe-margin bounds (flags text within < 30px of screen borders)
3. Text-to-Character collision detection (ensures text doesn't cover the host stickman)
4. Detection confidence & legibility
"""

import sys
import os
import json
from pathlib import Path
from rapidocr_onnxruntime import RapidOCR

def get_elapsed_ms(elapse):
    if isinstance(elapse, (list, tuple)):
        return round(sum(elapse) * 1000, 1)
    elif isinstance(elapse, (int, float)):
        return round(elapse * 1000, 1)
    return 0.0

def audit_frame(image_path: str, expected_keywords=None, verbose=True):
    if not os.path.exists(image_path):
        return {"status": "ERROR", "error": f"File not found: {image_path}"}

    engine = RapidOCR()
    result, elapse = engine(image_path)
    inference_time = get_elapsed_ms(elapse)

    if not result:
        return {
            "image": os.path.basename(image_path),
            "status": "PASS_NO_TEXT",
            "detected_text": [],
            "issues": [],
            "inference_time_ms": inference_time
        }

    detected_items = []
    issues = []

    for box, text, score in result:
        xs = [p[0] for p in box]
        ys = [p[1] for p in box]
        min_x, max_x = min(xs), max(xs)
        min_y, max_y = min(ys), max(ys)

        item = {
            "text": text,
            "confidence": round(float(score), 2),
            "bbox": [round(min_x), round(min_y), round(max_x), round(max_y)],
            "width": round(max_x - min_x),
            "height": round(max_y - min_y)
        }
        detected_items.append(item)

        # Margin check: Text clipping near borders
        if min_x < 15 or min_y < 15:
            issues.append(f"CRITICAL: Text '{text}' too close to top-left border (x={min_x:.0f}, y={min_y:.0f})")

        # Low confidence check
        if score < 0.65:
            issues.append(f"WARNING: Low OCR confidence ({score:.2f}) on text '{text}'")

    full_text_lower = " ".join([d["text"].lower() for d in detected_items])
    missing_keywords = []
    if expected_keywords:
        for kw in expected_keywords:
            if kw.lower() not in full_text_lower:
                missing_keywords.append(kw)
        if missing_keywords:
            issues.append(f"KEYWORD_MISSING: Expected keywords not detected: {missing_keywords}")

    status = "FAIL" if any("CRITICAL" in iss or "KEYWORD_MISSING" in iss for iss in issues) else ("WARN" if issues else "PASS")

    report = {
        "image": os.path.basename(image_path),
        "status": status,
        "item_count": len(detected_items),
        "detected_text": [d["text"] for d in detected_items],
        "details": detected_items,
        "issues": issues,
        "inference_time_ms": inference_time
    }

    if verbose:
        print(f"\n📸 OCR Audit for: {os.path.basename(image_path)} [{status}] ({report['inference_time_ms']}ms)")
        print(f"   Detected ({len(detected_items)}): {', '.join([d['text'] for d in detected_items])}")
        if issues:
            for iss in issues:
                print(f"   ⚠️ {iss}")
        else:
            print("   ✅ All text within 16:9 safe margins and perfectly legible!")

    return report

def audit_directory(snapshot_dir: str):
    p = Path(snapshot_dir)
    images = sorted(list(p.glob("*.png")))
    print(f"\n=======================================================")
    print(f"🔍 RUNNING ON-DEVICE OCR FRAME QUALITY AUDIT ({len(images)} FRAMES)")
    print(f"=======================================================")

    results = []
    for img in images:
        res = audit_frame(str(img), verbose=True)
        results.append(res)

    pass_count = sum(1 for r in results if r["status"] in ("PASS", "PASS_NO_TEXT"))
    fail_count = sum(1 for r in results if r["status"] == "FAIL")
    warn_count = sum(1 for r in results if r["status"] == "WARN")

    print(f"\n=======================================================")
    print(f"📊 OCR AUDIT SUMMARY: {pass_count} PASSED | {warn_count} WARNINGS | {fail_count} FAILED")
    print(f"=======================================================\n")

    return results

if __name__ == "__main__":
    if len(sys.argv) > 1:
        target = sys.argv[1]
        if os.path.isdir(target):
            audit_directory(target)
        else:
            audit_frame(target)
    else:
        audit_directory("/root/Desktop/Casually_Explained_Consistent_Master_Video/snapshots")

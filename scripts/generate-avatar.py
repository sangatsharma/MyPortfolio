#!/usr/bin/env python3
"""
Generate a stylized hero avatar from the real portrait using Gemini
image generation (same "Nano Banana" models the design skill uses).

Usage:
    export GEMINI_API_KEY='...'   # aistudio.google.com/apikey (free tier works)
    python3 scripts/generate-avatar.py [--pro]

Reads  public/images/introImagea.jpg
Writes public/images/avatar.png (plus numbered variants if run again)
"""

import base64
import json
import os
import sys
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SOURCE = ROOT / "public/images/introImagea.jpg"
OUT = ROOT / "public/images/avatar.png"

MODEL_FLASH = "gemini-2.5-flash-image"
MODEL_PRO = "gemini-3-pro-image-preview"

# Matched to the site: near-black base #08080a, indigo accent #5b5bd6,
# soft light #a5a6f6 — the avatar should look native to that palette.
PROMPT = """Create a stylized digital avatar portrait of this person, keeping a
clear likeness (face shape, hairstyle, expression, the red tika on the forehead,
and the traditional Nepali collar pattern of the shirt).

Style: modern semi-realistic digital illustration with soft cel shading —
the kind used on premium developer portfolio sites. Confident, friendly look.

Palette: deep near-black background (#08080a) with a subtle indigo rim light
(#5b5bd6) from one side and a faint soft glow (#a5a6f6). Skin tones natural
but slightly cinematic. No text, no watermark, no frame.

Composition: head and shoulders, centered, facing slightly toward the viewer,
generous margin around the head so it can be cropped into a circle."""


def main() -> int:
    key = os.environ.get("GEMINI_API_KEY")
    if not key:
        print("Error: GEMINI_API_KEY not set")
        print("Get a key at https://aistudio.google.com/apikey then:")
        print("  export GEMINI_API_KEY='your-key'")
        return 1

    model = MODEL_PRO if "--pro" in sys.argv else MODEL_FLASH
    image_b64 = base64.b64encode(SOURCE.read_bytes()).decode()

    body = {
        "contents": [
            {
                "parts": [
                    {"inline_data": {"mime_type": "image/jpeg", "data": image_b64}},
                    {"text": PROMPT},
                ]
            }
        ],
        "generationConfig": {"responseModalities": ["IMAGE"]},
    }
    req = urllib.request.Request(
        f"https://generativelanguage.googleapis.com/v1beta/models/{model}:generateContent",
        data=json.dumps(body).encode(),
        headers={"Content-Type": "application/json", "x-goog-api-key": key},
    )

    print(f"Generating avatar with {model} …")
    with urllib.request.urlopen(req, timeout=120) as res:
        payload = json.load(res)

    for part in payload["candidates"][0]["content"]["parts"]:
        data = part.get("inlineData") or part.get("inline_data")
        if data:
            out = OUT
            n = 1
            while out.exists():
                out = OUT.with_stem(f"{OUT.stem}-{n}")
                n += 1
            out.write_bytes(base64.b64decode(data["data"]))
            print(f"Saved {out.relative_to(ROOT)}")
            return 0

    print("No image in response:", json.dumps(payload)[:400])
    return 1


if __name__ == "__main__":
    sys.exit(main())

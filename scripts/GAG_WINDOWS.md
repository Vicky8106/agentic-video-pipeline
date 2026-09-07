# Gag-window map: full chapter at proof quality

231 SRT cues, chapter 0.00 -> 643.53s. Each window is hand-directed
mini-skits (gag-lib grammar: no on-screen words, rock-solid camera,
hard cuts), stills-verified, then rendered + muxed with the MP3 slice.
Final: concat all windows in order.

Status legend: TODO / STILLS (stills verified) / DONE (muxed w/ audio).

| Win | Start  | End    | Script                   | Status |
|-----|--------|--------|--------------------------|--------|
| W01 | 0.00   | 32.41  | scripts/render-gag-w01.ts | DONE (/root/Desktop/gag_w01_0-32s.mp4, 32.42s + MP3) |
| W02 | 32.41  | 65.25  | scripts/render-gag-w02.ts | DONE (/root/Desktop/gag_w02_32-65s.mp4, 32.83s + MP3) |
| W03 | 65.25  | 97.23  | scripts/render-gag-w03.ts | DONE (/root/Desktop/gag_w03_65-97s.mp4, 32.00s + MP3) |
| W04 | 97.23  | 128.84 | scripts/render-gag-w04.ts | DONE (/root/Desktop/gag_w04_97-129s.mp4, 31.63s + MP3) |
| W05 | 128.84 | 160.30 | - | TODO |
| W06 | 160.30 | 191.70 | - | TODO |
| W07 | 191.70 | 222.11 | - | TODO |
| W08 | 222.11 | 253.21 | - | TODO |
| W09 | 253.21 | 283.49 | - | TODO |
| W10 | 283.49 | 313.62 | - | TODO |
| W11 | 313.62 | 344.29 | - | TODO |
| W12 | 344.29 | 375.93 | - | TODO |
| W13 | 375.93 | 406.07 | - | TODO |
| W14 | 406.07 | 436.93 | - | TODO |
| W15 | 436.93 | 470.06 | - | TODO |
| W16 | 470.06 | 502.90 | - | TODO |
| W17 | 502.90 | 536.26 | scripts/render-gag-last2min.ts (tail 524s+) | DONE |
| W18 | 536.26 | 566.42 | scripts/render-gag-last2min.ts | DONE |
| W19 | 566.42 | 597.23 | scripts/render-gag-last2min.ts | DONE |
| W20a| 597.23 | 605.60 | scripts/render-gag-last2min.ts | DONE |
| PRF | 605.60 | 635.60 | scripts/render-gag-last2min.ts / proof | DONE (/root/Desktop/gag_proof_v2_final.mp4) |
| W21b| 635.60 | 643.53 | scripts/render-gag-last2min.ts | DONE (/root/Desktop/last_2min_casually_explained.mp4) |

Concat order: W01..W19, W20a, PRF, W21b.

Staging rules learned (apply in every window):
1. Foreground props cover cast: put anything actors interact with in bg.
2. Carried items ride overhead (y~470) or at the side (hand height).
3. Nobody walks through another actor: nearest-edge entrances (walkerXR).
4. Punch-ins must keep the speaking/pointing actor in frame.
5. IK pointing hands use the index finger (automatic in StickFigure).
6. Juggled/thrown props stay near hands, clear of heads.
7. Grabbed/confiscated props shrink into the grab.
8. Windows end on sentence boundaries; beats land within ~100ms of SRT words.

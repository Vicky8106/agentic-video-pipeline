# Visual Audit: Why the Old Render Becomes a Slide Deck

The supplied `public/thumbs` sequence was inspected as a contact sheet and sampled with OCR.

## Observed failure

The early section is mostly image-led storytelling, while the later section increasingly consists of full-frame photographic/reference assets, screenshots and static comparison graphics. OCR samples included text such as `Did Dove solve body image issues?` and `OZEMPIC FACE?!`, confirming that the later material is being presented as informational reference slides rather than animated scenes.

Representative late frames also contain repeated photographic comparison layouts and article/chart screenshots. Repetition is a stronger symptom than the individual assets: the visual state changes by replacing one still image with another instead of animating a persistent world.

## Engineering conclusion

The autonomous renderer must **not** attempt to reproduce this by embedding the reference images. It must translate the information into procedural visual actions:

- a character reacts to the claim;
- a face/body diagram transforms;
- a before/after state morphs;
- a number becomes a physical object;
- a chart draws itself and then changes;
- arrows, labels and props enter with motion;
- the host points, looks, walks and reacts;
- the camera cuts/punches/drifts around the action.

The supplied raster references remain useful as *research/reference material*, but they are not part of the autonomous render path.

## Acceptance implication

A generated frame that is visually correct but motionless for an extended interval is still a failure. The anti-slideshow criterion is temporal: the actor, props, stage, camera or visual metaphor must keep evolving across the narration.

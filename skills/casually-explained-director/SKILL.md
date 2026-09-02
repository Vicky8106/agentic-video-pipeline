# Casually Explained Procedural Director

## Mission

Turn only `audio + SRT` into a continuously animated 2D explanatory-comedy production using deterministic SVG code. The result must feel directed, not like a slideshow.

## Non-negotiable rules

1. Never use a raster image as the primary visual in the autonomous path.
2. The stick figure is an actor, not a static illustration.
3. Every narration beat must have acting, staging, object motion, camera motion, a reveal, or a deliberate comedic hold.
4. Never leave the host in the same pose for an entire sentence.
5. Never display a full-screen information card merely because the narration mentions a fact.
6. Visuals should enter, move, transform, collide, grow, shrink, point, react, or leave.
7. Comedy timing is expressed as anticipation -> impact -> reaction -> reset.
8. Punch-ins and cuts land on semantic/emphasis words, not arbitrary sentence boundaries.
9. Preserve continuity: objects and characters persist until the director removes them.
10. Prefer simple procedural SVG metaphors over expensive/fragile asset generation.
11. The LLM chooses intent and direction; code resolves the intent into deterministic animation.
12. When a section becomes visually repetitive, introduce a new shot grammar or actor action rather than adding another static card.

## Actor vocabulary

Use combinations of:
- deadpan, skeptical, confused, smug, excited, disgusted, anxious, shocked, defeated
- gaze target and gaze shift
- eyebrow asymmetry
- mouth shape/opening
- head tilt
- spine lean
- hand gesture
- pointing
- walking/entrance/exit
- prop interaction
- anticipation and recoil
- reaction hold

## Shot vocabulary

Use:
- wide, host, two-shot, subject, insert, reaction, macro
- cut, punch, whip, drift, pull
- short reaction holds
- visual reveals and wipes

Do not cut so frequently that the narration becomes unreadable. Use movement inside shots when a cut is unnecessary.

## Visual metaphor vocabulary

Prefer physical SVG metaphors:
- money stacks, meters, charts, arrows, timelines, queues
- phone, laptop, camera, mirror, scale, box, stamp, warning sign
- face/body diagrams
- before/after transformations
- chains, funnels, piles, crowds, conveyor belts
- objects handed to or taken from the host

## Quality target

A 10-minute video should retain comparable animation density from beginning to end. A late section that degenerates into static cards is a production failure.

## Revision behavior

When an agent receives feedback such as "this became a slideshow":
1. inspect shot density and actor-state changes;
2. identify the first low-motion interval;
3. add continuous actor performance;
4. add physical visual interaction;
5. improve camera/edit timing;
6. re-render only the affected timeline;
7. do not replace the whole video with raster references.

# Motion research: camera + stick-figure quality for the gag pipeline

Question: which external skills or repos can lift camera movement and
stick-figure integration to production grade in `casually_engine_v7`?
Researched 2026-09-03. Claims cite their sources; "evaluated" means read
far enough to judge fit against our offline SVG→resvg→ffmpeg pipeline
(deterministic `renderSvg(t)`, no DOM, no game loop).

## Verdict up front

Adopt **ideas, not dependencies**. Our driver is render-the-frame-at-time —
the same model Remotion uses — so the correct pattern is paused/seekable
value functions, which we already own (`driveGags`). Every library below
either targets browsers/games (wrong runtime) or sells what amounts to
~200 lines of easing/spring math we should vendor into `src/motion/`.

## Local skills: none applicable

Checked `~/.claude/skills/` and `/root/.claude/skills/` (60+ skills: all
Android/product/process). `compose-animations` is Jetpack Compose UI
motion, `img2threejs` is image-to-3D — neither transfers to offline
cartoon video.

## Evaluated candidates

| Candidate | Source | Verdict |
|---|---|---|
| GSAP (paused timelines + `seek`) | [Hyperframes vs Remotion](https://github.com/chenyuxiaojin/cyxj-hyperframes/blob/HEAD/docs/hyperframes-official/guides/hyperframes-vs-remotion.md), [remotion-studio](https://github.com/wawtawsha/remotion-studio/blob/HEAD/CLAUDE.md) | Right pattern (paused + seek = frame-accurate), but we need ~10 easing curves, not a timeline engine. Vendor the math, skip the dep. npm registry IS reachable (gsap 3.15.0), but installing would churn the pnpm lockfile for zero runtime benefit. |
| Anime.js / Motion One (autoplay off + seek) | [accelerate hyperframes skill](https://github.com/dragon-hearted/adcelerate/blob/HEAD/.agents/skills/hyperframes/SKILL.md) | Same verdict as GSAP. Motion's `pathLength` draw-on API is the one idea worth copying for sketch reveals. |
| Remotion (`spring` + `interpolate` + `Easing`) | [animate-svg SVG craft research](https://github.com/blueif16/animate-svg/blob/HEAD/research/svg-animation-craft-2026-05-26.md), local checkout at `/root/remotion` | Directly portable RECIPES (below). Migrating the engine to Remotion would be a full rewrite for no visual gain — our renderer already implements its core insight (deterministic frame-at-t). |
| Lottie / dotLottie | [ai-web-design-codex animation stack](https://github.com/eneryleen/ai-web-design-codex/blob/HEAD/04-libraries-and-tools/animation-libraries-stack.md) | After-Effects pipeline; wrong authoring model for hand-coded gags. Skip. |
| Spine 2D / DragonBones | [promptiusmaximus rigging survey](https://github.com/babakarto/promptiusmaximus/blob/HEAD/03-IMMAGINI/character-tools/x-research-2d-character-rigging-tools.md), [pixhaus DragonBones note](https://github.com/pixhaus-app/pixhaus/blob/HEAD/docs/planning/skeletal-animation/DragonBones.md) | Game mesh-deform rigs (paid / heavyweight). Our FK/IK stick rig already covers posing; the gap is motion quality, not rig structure. Skip. |
| Hyperframes (frame-clock adapters) | [hyperframes-vs-remotion](https://github.com/chenyuxiaojin/cyxj-hyperframes/blob/HEAD/docs/hyperframes-official/guides/hyperframes-vs-remotion.md) | Validates our architecture (external libs must be paused/seekable). Nothing to adopt — `driveGags` already is the frame clock. |
| dragondmx5-create/sprite-engine (`anim/spring.ts`) | [repo](https://github.com/dragondmx5-create/sprite-engine/blob/HEAD/README.md), [procedural commit](https://github.com/dragondmx5-create/sprite-engine/commit/270f50677fd38cb6b7d81c217cf79d4afc9a45d032bc) | Closest matching toolkit: closed-form squash, follow-through lag, damped overshoot, pulses + `solveTwoBone`/FABRIK IK exports. Copy the PATTERNS (squash, lag, wave, pulse), not the code. |
| dark-shadw/llm-animation-lab (JS skeletal rig) | [repo](https://github.com/dark-shadw/llm-animation-lab) | Toy-grade; superset of nothing we lack. Skip. |
| Game-feel camera skills (godot-agent `game-feel`, luna `camera-system`, openbyteship `game-feel-juice`) | [game-feel SKILL](https://github.com/moinsen-dev/godot-agent/blob/HEAD/plugin/skills/game-feel/SKILL.md), [camera-system SKILL](https://github.com/chrystian-k/luna_2d/blob/HEAD/extensions/vscode/cag/game-dev/skills/camera-system/SKILL.md), [game-feel-juice](https://github.com/jasonkneen/openbyteship/blob/HEAD/.grok/skills/building-games/references/game-feel-juice.md) | Engine-specific code (Godot/Lua), but the CAMERA MATH is universal and directly portable: trauma shake, deadzone, lookahead, damped follow. See recipes. |
| animation-principles skill (opencode-kit) | [SKILL](https://github.com/skeletorflet/opencode-kit/blob/HEAD/.opencode/skills/animation-principles/SKILL.md) | Checklist-grade (squash/stretch, anticipation, follow-through, secondary action + timing table). Useful as ACCEPTANCE CRITERIA for window review, not as code. |
| programmatic-animation skill (hermes-apollo) | [SKILL](https://github.com/tradewife/hermes-apollo/blob/HEAD/skills/programmatic-animation/SKILL.md) | Web-video oriented (Remotion/GSAP/ScrollTrigger). Confirms stack taxonomy; nothing offline-applicable. Skip. |
| Vicky8106/CL4R1T4S (leaked prompts) | [repo](https://github.com/Vicky8106/CL4R1T4S) | No code, no tooling. Not useful; evaluated at user's request. |

## Portable recipes (what to actually build)

1. **Liveliness palette** (from [animate-svg research](https://github.com/blueif16/animate-svg/blob/HEAD/research/svg-animation-craft-2026-05-26.md)): named beziers `enter (0.16,1,0.3,1)`, `balanced (0.45,0,0.55,1)`, `overshoot (0.34,1.56,0.64,1)`; spring presets snappy `{damping:20, stiffness:200}`, bouncy `{damping:8}`, smooth `{damping:200}`. Today gag-lib has exactly one curve (`easeIO`) — that single fact explains much of the blandness.
2. **Anticipation = shrink to ~90% → overshoot → settle** (three-stop interpolate or bouncy spring). The single most-cited spawn recipe; our props currently pop in linearly.
3. **One progress source per beat**, re-interpolated to drive x/scale/opacity independently (Remotion timing rule). Keeps cue boundaries owning time — matches our GAG_WINDOWS rule 8.
4. **Trauma camera** (from [o3de 2d-camera design](https://github.com/nickschuetz/o3de-diorama/blob/HEAD/Docs/design/2d-camera.md), [game-feel-juice](https://github.com/jasonkneen/openbyteship/blob/HEAD/.grok/skills/building-games/references/game-feel-juice.md)): `shake = maxShake * trauma^2`, noise-driven, decaying, applied AFTER follow so it never fights tracking; plus deadzone (small motion doesn't move the view), lookahead (offset toward travel), critically-damped follow, rotational shake, FOV/zoom coupling. Our `Camera` today is lerp + cut only.
5. **Squash & stretch** (from [sprite-engine](https://github.com/dragondmx5-create/sprite-engine/blob/HEAD/README.md), [openheroes procedural motion](https://github.com/topherhunt/openheroes/blob/HEAD/docs/decisions/0058-stances-and-procedural-motion-over-animation.md)): rig needs non-uniform `scaleX/scaleY` with volume preservation; closed-form `squash`, `lag`, `pulse`, `overshoot` helpers; attack pattern = anticipation → lunge → overshoot → settle.
6. **Secondary motion**: lag appendages/hair/props one beat behind the body ([clawdaddy research](https://github.com/teej/clawdaddy/blob/HEAD/docs/RESEARCH_SPRITE_ANIMATION.md)); idle breathing + weight shifts so the cast is never frozen ([juice-consultant](https://github.com/sponticelli/gamedev-claude-plugins/blob/HEAD/plugins/juice/agents/juice-consultant.md)).
7. **Smear frames** on fast moves + **draw-on** via `stroke-dashoffset` (from [animate-svg research](https://github.com/blueif16/animate-svg/blob/HEAD/research/svg-animation-craft-2026-05-26.md)).

## Recommendation

Build `src/motion/` in-repo (~200 lines, zero deps): EASES palette,
semi-implicit-Euler spring integrator, squash/stretch rig support,
trauma-camera extension, smear + draw-on helpers. Test-bed it in W04
(97–129s) as the gold upgrade; acceptance = existing stills-verify plus
the animation-principles checklist above. No installs, no lockfile churn,
no adopted frameworks.

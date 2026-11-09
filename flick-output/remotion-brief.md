# Remotion Composition Brief: Flick — NovaMind AI promo

## Objective
Create the short-form scene animations planned in `flick-plan.md` from the on-screen script.

## Output
- Remotion project: `remotion/`
- Format: 9:16, 1080x1920 at 30 fps
- Rendered scenes:
  - `busywork-overload` → `scenes/busywork-overload/busywork-overload.mp4`
  - `meet-novamind` → `scenes/meet-novamind/meet-novamind.mp4`
  - `agent-runs-workflow` → `scenes/agent-runs-workflow/agent-runs-workflow.mp4`
  - `results-count-up` → `scenes/results-count-up/results-count-up.mp4`
  - `live-in-days` → `scenes/live-in-days/live-in-days.mp4`
  - `join-the-waitlist` → `scenes/join-the-waitlist/join-the-waitlist.mp4`
- Stitched promo (all six scenes concatenated with ffmpeg): `novamind-promo.mp4`

## Source Material
- Transcript: `transcript.json`, a written script drawn from the landing page copy
- Plan: `flick-plan.md`
- Brand assets: none supplied. Colors come from the landing page's CSS. The font is Inter (OFL), bundled at `remotion/public/fonts/`.
- Sound effects: `remotion/public/sounds/`

## Creative Direction
- Direction: a dark, premium SaaS look that matches the landing page, with snappy spring motion and no background music.
- Avoid: generic filler visuals, unsupplied logos or imagery, and background music.

## Scene Compositions
See `scene-spec.json` for each scene's timing, components and SFX frames, and `flick-plan.md` for the visual storyboard.

## Remotion Instructions
- There is one component per scene in `src/scenes/` and one `<Composition>` per scene in `src/Root.tsx`. No all-scenes composition exists.
- All motion is frame-driven, and every SFX is tied to a visible action.

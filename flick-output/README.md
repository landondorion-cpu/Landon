# NovaMind AI — promo animation (made with Flick)

A 30-second vertical (1080×1920) promo for the NovaMind AI landing page, built with the [Flick](https://github.com/Creatorberry/flick) workflow and Remotion.

- **Final video:** `novamind-promo.mp4`
- **Individual scenes:** `scenes/<scene>/<scene>.mp4`, each with a `poster.jpg`
- **Creative plan:** `flick-plan.md` · **Build brief:** `remotion-brief.md` · **Spec:** `scene-spec.json`

| # | Scene | Time | Line |
|---|-------|------|------|
| 1 | busywork-overload | 0–4.5s | Your team is drowning in busywork. |
| 2 | meet-novamind | 4.5–8s | Meet NovaMind AI. |
| 3 | agent-runs-workflow | 8–14s | Custom AI agents that run your workflows end to end. |
| 4 | results-count-up | 14–19s | 10x faster · 85% lower costs · 24/7 |
| 5 | live-in-days | 19–24s | Live in days, not months. |
| 6 | join-the-waitlist | 24–30s | Join the waitlist — 500+ already have. |

## Edit and re-render

```bash
cd remotion
npm install
npm run studio                       # live preview at http://localhost:3000
npx remotion render src/index.tsx join-the-waitlist out.mp4
```

To rebuild the full promo after editing, render all six scenes and concatenate them in order (for example with ffmpeg's concat demuxer).
If the Chrome download is blocked, point `REMOTION_BROWSER` at a local headless Chrome binary (see `remotion/remotion.config.ts`).

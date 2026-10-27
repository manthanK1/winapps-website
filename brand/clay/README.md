# Clay mark

A playful 3D "clay" version of the Winapps mark: four rounded strokes (teal, orange, teal, amber swoosh) with a coral ball bouncing on top. It is an **illustration variant**, not a logo replacement. The header and footer keep the flat logo (`brand/source/winapps-logo-original.png`).

Inspired by the toy-like 3D style on clay.com (see `CLAY-STYLE.md`); none of their artwork is used.

## Style

- Chunky rounded primitives: tubes and a ball, like a marble run.
- Matte clay finish: broad soft highlights, wrapped diffuse light, ambient occlusion in creases, faint surface texture. No chrome or glass.
- Warm key light, cool sky fill, warm floor bounce. The mark floats, grounded only by a soft blurred contact shadow.
- A short seamless loop (48 frames at 20 fps, 2.4 s) with squash and stretch on the ball.
- Brand colours: teal `#1f8f92`, orange `#f39a2b`, amber `#f7b52a` → `#ffd23c`, coral ball `#f2603a`.

## Files

| File | Use |
| --- | --- |
| `public/brand/clay/winapps-clay-mark-480.webp` | Animated, transparent (~490 KB). Swapped in after page load |
| `public/brand/clay/winapps-clay-mark-still-480.webp` | Still (21 KB, made from the 1024 PNG): first paint, no-JS and `prefers-reduced-motion` |
| `public/brand/clay/winapps-clay-mark-1024.webp` / `.png` | Large still |
| `public/brand/clay/winapps-clay-lockup.png` | Still mark with the WINAPPS wordmark. Not used on the site yet |
| `brand/clay/frames-preview.png` | Contact sheet of six frames |

On the site: `src/components/ClayMark.astro` (home hero, About, 404). It paints the still first and loads the animation after the page has loaded, so the ~490 KB loop never delays first paint (the home hero went from 4.5 s to under 2 s LCP on mobile Lighthouse). The GIFs from the handoff (480 and 240 px, flattened on paper) are not shipped: every supported browser shows the WebP. The demo row is on `/styleguide/`.

## Source

The renderer (`render.py`, a numpy sphere-tracing SDF renderer) and `assemble.sh` / `lockup.py` were not in the handoff folder, so they aren't in this repo yet. Add them here as `brand/clay/source/` to re-render. Planned refinements that need them:

- Make the amber swoosh flare and taper like the original ribbon logo (it reads a little like a banana). Try a flatter, oval cross-section.
- Tighten the lockup letter-spacing (`spacing = 18` in `lockup.py`).
- A dark-background variant.

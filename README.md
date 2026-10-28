# Winapps website

Marketing site for Winapps®, built with [Astro](https://astro.build) and Tailwind CSS. Every page is pre-rendered static HTML; JavaScript is limited to a few small scripts (header menus, live clocks, contact form, blog tables, scroll reveal).

The visual language follows [CLAY-STYLE.md](CLAY-STYLE.md) (rounded panels, tight display type, flat cards) in Winapps colours. How the old www.winapps.co.in pages and journeys map onto this site is in [PAGE-JOURNEYS.md](PAGE-JOURNEYS.md).

## Editing content

Most text lives in `src/content/` and can be edited without touching code:

| What | Where |
| --- | --- |
| The six services | `src/content/services/*.md` |
| Case studies | `src/content/work/*.md` |
| Blog guides (slugs match the old site) | `src/content/blog/*.md` |
| News posts (slugs match the old site) | `src/content/news/*.md` |
| Home page FAQ | `src/content/faq.yaml` |
| Industries | `src/content/industries.yaml` |
| Testimonials (hidden until one exists) | `src/content/testimonials/`: copy `_TEMPLATE.md` |
| Client logos (hidden until one exists) | `src/content/clients/`: copy `_TEMPLATE.md` |
| Leadership (hidden until one exists) | `src/content/team/`: copy `_TEMPLATE.md` |
| Company facts: email, phone, address, socials; navigation; contact-form options | `src/lib/site.ts` |
| Redirects from old winapps.co.in URLs | `src/lib/legacy-redirects.ts` |

The build checks every content file against a schema (`src/content.config.ts`) and stops with a clear error if a field is missing.

**Rule:** never add invented clients, logos, testimonials, statistics or awards. Placeholders are marked `TODO` in the source; see [TODO.md](TODO.md).

## Commands

```
npm install          # once
npm run dev          # local preview at http://localhost:4321/winapps-website/
npm run build        # production build into dist/
npm run brand        # regenerate logo, favicon and font assets
node scripts/og-image.mjs   # regenerate the social preview image
node scripts/build-hills.mjs  # re-render the hero/footer hills after editing their shapes
```

Quality checks are listed in [DEPLOY.md](DEPLOY.md#before-every-release).

## Structure

```
src/
  content/        editable content (Markdown / YAML)
  components/     page sections and UI components
  layouts/        BaseLayout (head, SEO, header, footer)
  pages/          one file per route
  styles/         global.css: design tokens and component styles
  lib/            site facts, URL helper, icons, structured data
  assets/         logo and self-hosted fonts
brand/source/     original logo as supplied
brand/clay/       3D clay mark: notes and frame preview (web files in public/brand/clay/)
scripts/          brand assets, screenshots, Lighthouse, QA
```

The design system is documented at `/styleguide/` (not indexed by search engines).

## Brand

- Logo: `brand/source/winapps-logo-original.png`, used as supplied with only the grey background removed. Light backgrounds only until a reversed version exists.
- Header logo animation: the ribbon animation from www.winapps.co.in (`brand/source/header-logo.gif`) plays once on each page load, then the static logo takes over. After replacing the GIF, run `node scripts/convert-logo-gif.mjs`.
- Colours: teal leads, orange/amber for calls to action and small accents. Tokens and contrast notes are in `src/styles/global.css`; run `node scripts/contrast.mjs` to re-check.
- Type: Schibsted Grotesk (headings) and Inter (text), both SIL Open Font License, self-hosted.

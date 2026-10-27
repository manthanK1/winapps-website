# Clay.com style reference

A breakdown of the visual system on [clay.com](https://www.clay.com/), taken from the live homepage on 2026-10-27. Values are **computed styles at a 1440px viewport** (read with Playwright) plus Clay's own CSS variables. Use it as a reference for the patterns we want in the WinApps site.

> **What we can borrow and what we can't.** Layout, spacing, type scale, radii, color *structure* and interaction patterns are fair game. Clay's logo, claymation illustrations ("Art by Hudson"), copy, and the Roobert font files are not. Roobert is a commercial typeface and needs a license; see [Typography](#2-typography) for free look-alikes.

---

## 1. The look in one paragraph

Warm off-white ("oat") neutrals instead of grey. Pure black text and black primary buttons. Huge, tightly tracked grotesk headlines, often in two tones: a deep shade on the first phrase and a saturated accent on the second. Content sits in **big rounded panels (48px radius)** that float inside a 1280px container. Each feature gets its own **pastel color theme** (blue, orange, lime, pink), and the panels **stack on scroll like cards**. Cards are almost flat: no drop shadows, just hairline rings and tinted fills. Tactile 3D clay-style illustrations do most of the decorating. One loud accent, a **lime CTA**, carries the hero.

---

## 2. Typography

**Family:** `Roobert` (variable, weights 300–900), fallback `Arial, sans-serif`. They use it for everything: headings, body, buttons, eyebrows.

**Free look-alikes:** Satoshi (Fontshare), Geist, or our current Schibsted Grotesk set to the same tight tracking. Roobert's character comes mostly from **heavy negative letter-spacing at display sizes**, and any geometric grotesk can do that.

| Role | Size (desktop) | Line height | Tracking | Weight | Notes |
|---|---|---|---|---|---|
| Hero H1 | 88px (5.5rem) | 1.0 | -0.04em | 575 | 4rem on tablet, 3rem on mobile |
| Section H2 | 72px (4.5rem) | 1.0 | -0.03em | 500 | 3.5rem → 2.5rem |
| Feature H3 | 48px (3rem) | 1.0 | -0.04em | 500 | Two-tone (see below) |
| CTA heading | 44px | 1.1 | -0.02em | 500 | Pre-footer |
| Lead | 24px | 1.3 | normal | 400 | Hero subtitle, card titles |
| Medium | 20px | 1.3 | normal | 400 | Section intros |
| Body | 16px | 1.4 | normal | 400 | Base is 16/24 |
| Small | 14px | 1.5 | normal | 400–500 | Nav links (500), footer links |
| Eyebrow / pill | 12px | 1.5 | 0.25em | 600 | UPPERCASE |
| Footer column head | 12px | 1.1 | 0.12em | 600 | UPPERCASE |
| Button (large) | 18px | 1.5 | -0.01em | 500 | |
| Button (small) | 0.87rem (~14px) | 1.5 | -0.01em | 500 | Nav buttons |

**Rules they follow**
- Headings use `text-wrap: balance`.
- Display line-height is exactly **1.0**. The tight leading is a big part of the look.
- Weight stays around **500** even on huge headings. Nothing is bold.
- **Two-tone headings:** the heading is set in the theme's darkest shade, and a `<span>` covering the second half is set in the theme accent:
  `Get data from the most` (#001433) / `complete data marketplace` (#395AFA).

---

## 3. Color

### Neutrals: the "oat" scale (warm, slightly yellow)

| Token | Hex | Used for |
|---|---|---|
| oat-50 | `#FFFCFA` | Lightest wash |
| oat-100 | `#FEFDFB` | Card surface, text on dark (most common bg) |
| white | `#FFFFFF` | Page background, inputs |
| oat-200 | `#F4F3F0` | Panels, tabs, footer card (2nd most common bg) |
| oat-300 | `#EEE9DF` | Underline tracks, icon buttons |
| oat-400 | `#DAD4C8` | Hover on oat buttons, link chips |
| border | `#D1CDC7` | Rings, dividers (often at 50–60% opacity) |
| oat-600 | `#9F9B93` | Disabled |
| muted | `#7B7974` | Inactive tab text, tertiary text |
| oat-800 | `#55534E` | Secondary text, footer links |
| ink | `#1B1A18` | Near-black text, dark buttons |
| black | `#000000` | Primary text, primary button |

Text is **#000 for primary** and **#55534E for secondary**. Grey (`#282C35`) shows up only as the primary-button hover.

### Feature themes

Each feature panel defines a small set of CSS variables, and every element inside (heading, pill, button) reads from them. Each theme has four steps:

| Theme | Panel bg (100) | Pill / tint (200) | Accent (400) | Deep text (500) |
|---|---|---|---|---|
| Blueberry | `#F0F8FF` | `#BEDFFE` | `#395AFA` | `#001433` |
| Tangerine | `#FFF3ED` | `#FCC9AB` | `#B53D0A` | `#381005` |
| Lime | `#FCFEE2` | `#EEF773` | `#808000` | `#102B03` |
| Dragonfruit | `#FFF0FA` | `#F8B9E3` | `#CC089E` | `#46022F` |
| Slushie (on oat) | `#F4F3F0` | – | `#008BAD` | `#1B1A18` |
| Ube (cards) | `#F5F3FF` | `#D8D0FF` | `#7934F0` | – |

### Brand accents
- **Hero forest green** `#035D44`: full-bleed hero background behind the illustration.
- **CTA lime** `#CBD810` with black text: the "Get a demo" button in the hero. They use it sparingly.
- **Black** `#000`: the default primary button everywhere else.

---

## 4. Layout and spacing

- **Container:** `max-width: 1280px`, centered. The nav is wider (1368px at a 1440px viewport, so 36px side gutters).
- **Section padding:** mostly **64px top and bottom**, with 48px on tighter sections and 96px before the footer. Their scale: 3rem / 4rem / 6rem / 8rem.
- **Panel padding:** 48px inside rounded panels.
- **Gaps:** 8 / 16 / 20 / 24 / 32px. Row/column gap defaults to 24px.
- **Section dividers:** a 1px `#F4F3F0` hairline, max 1344px wide, between open (non-panel) sections.
- **Feature panel grid:** 2 equal columns (640 / 640). Text sits on the left, and the image card (592×675, 24px radius) sits inset on the right with 24px around it.
- **Bento grids** for logos and resources: mixed card widths in one flex/grid row, no uniform tiles.

### Radius scale

| Radius | Where |
|---|---|
| 12px | Buttons, tabs, small chips |
| 14–16px | Logo badges, feature link chips |
| 18px | Logo-wall cards |
| 20–24px | Inputs, image cards, resource cards, video cards |
| 48px | Section panels, footer card (`48px 48px 0 0` when stacked) |
| 9999px | Pills / eyebrows |

### Elevation (nearly flat)
- **No drop shadows on cards.** Depth comes from tinted fills and rings.
- **Bevel tile** (logo cards): `border-top: 1px solid #fff; border-bottom: 1px solid rgb(123 121 116 / .15)`.
- **Inset ring** on badges: `box-shadow: inset 0 0 0 2px <panel-bg>`.
- **The one real shadow** is on the prompt input: `0 12px 24px -12px rgb(0 0 0 / .12), inset 0 0 0 1px rgb(209 205 199 / .6)`.
- **Edge fade:** the "reps" panel uses `box-shadow: 0 24px 64px 24px #fff` to melt into the white page.

---

## 5. Components

### Navigation
- A floating white bar, 58px tall, with rounded bottom corners. It sits at the top inside 36px gutters, over the hero.
- Left: logo, then links (`14px / 500`, black, `10px 8px` padding, rounded hover bg).
- Right: `⌘K` search, a "Log in" text link, a **secondary button** (oat-200 bg), and a **primary button** (black), both small size.
- Mobile: logo, one oat button, and a hamburger.

### Buttons

```css
.btn {
  display: inline-flex; align-items: center; gap: .5em;
  padding: .5em 1em;               /* 9px 18px at 18px font */
  border: 1px solid transparent;
  border-radius: 12px;
  background: #000; color: #fff;
  font-weight: 500; letter-spacing: -.01em; white-space: nowrap;
  transition: background-color .3s cubic-bezier(.075,.82,.165,1);
}
.btn:hover            { background: #282C35; }
.btn--light           { background: #fff; color: #000; }          /* on dark hero */
.btn--lime            { background: #CBD810; color: #000; }       /* hero CTA */
.btn--oat             { background: #F3F2ED; color: #000; border-color: #fff; }
.btn--oat:hover       { background: #DAD4C8; }
.btn--outline         { background: #fff; color: #000; border-color: #000; }
.btn--outline:hover   { background: #FEFDFB; }
.btn--theme           { background: var(--theme-accent); color: #fff; } /* inside feature panels */
.btn--sm              { padding: .5rem 1rem; font-size: .87rem; }
```
- Almost every CTA ends with a **→ arrow icon**.
- The pairing is always a strong button followed by a weak one: black + oat, white + lime, theme accent + white.

### Line link (text CTA)
Text at 500 weight with a trailing →. Under it sits a **2px rounded track** (`#D1CDC7` / oat-300), with an **ink fill bar** on top that animates across on hover.

```css
.line-link        { display: inline-flex; align-items: center; gap: .25rem; font-weight: 500; position: relative; }
.line-link__track { position: absolute; inset: auto 0 -.1rem 0; height: 2px; border-radius: 100px; background: #D1CDC7; overflow: hidden; }
.line-link__fill  { position: absolute; inset: 0; background: #1B1A18; transform: scaleX(1); transform-origin: left;
                    transition: transform .4s cubic-bezier(.165,.84,.44,1); }
```

### Eyebrow pill stack
A 32px pill (`12px / 600 / uppercase / 0.25em`, `padding: 0 12px`) in the **theme accent with white text**. Behind it sit **2–3 ghost pills** in the theme's 200 tint, overlapping to the right. Each pill has a `1px` border in the *panel bg color*, which makes the overlaps read as cut-outs. Plain eyebrows with no pill use the accent color as text.

### Tabs / filter chips
`padding: 10px 16px; border-radius: 12px; font: 500 16px/1.5; background: #F4F3F0; color: #1B1A18`. The active chip takes the theme tint (for example lime `#EEF773`). The row scrolls horizontally and fades out at both edges.

### Stacked feature panels (the signature section)

```css
.feature-theme {                /* wrapper per feature; sets theme vars */
  position: sticky; top: 4.5rem; margin-bottom: -3rem;
  --theme-bg: #F0F8FF; --theme-tint: #BEDFFE; --theme-accent: #395AFA; --theme-ink: #001433;
}
.feature-item {
  display: grid; grid-template-columns: 1fr 1fr;
  background: var(--theme-bg); color: var(--theme-ink);
  border-radius: 48px 48px 0 0;  /* last one gets bottom radius too */
  padding-bottom: 3rem; margin-bottom: -3rem;
}
```
Each panel's left column contains: the eyebrow pill stack, a two-tone H3, a 16px description (max-width ~448px), a **proof row** (3 × 43px logo badges, white with 14px radius and an inset ring), a one-line customer stat with the **company name in bold**, and a theme button plus a white secondary button. The right column holds the image card.

### Logo wall (social proof)
- An oat-200 panel with a 48px top radius that **overlaps the bottom of the hero** (it pulls up over the green).
- Centered 24px intro line with **bold inline keywords** ("Inspired by our **customers**. Built with **love**.").
- A bento of `#FEFDFB` cards (18px radius, `16px 20px` padding, bevel border) mixing logo-only cards, logo + quote cards, and stat cards (`+140%` big, with a `OUTBOUND PIPELINE` micro-label). Small ↗ arrows sit in the corners. The edges fade out horizontally.

### Prompt input ("What do you want to build?")
A centered 624px white textarea card (20px radius) on the soft shadow above. Underneath it is an oat-200 tray (bottom corners 23px) holding suggestion chips (`#FEFDFB` bg, muted text, 12px radius) and a **black square send button** with an arrow.

### Resource / update cards (bento)
24px radius cards in tinted fills: ube `#F5F3FF`, oat `#F4F3F0`, blueberry `#F0F8FF`, or photo cards with a `rgb(0 0 0 / .25)` overlay and white text. Each card has an accent-colored uppercase eyebrow (CONFERENCE, COMMUNITY STORY), a 24px title, and a line link at the bottom.

### Video carousel
One large center card (24px radius) with the neighbors peeking at the sides, and a frosted square play button in the middle.

### Pre-footer CTA and footer
- Centered 44px heading, a 16px subline ("No credit card required."), then black and outline buttons.
- The footer is a **full-bleed illustrated scene**, with an oat-200 card (1280px wide, 48px top radius, 48px padding, 64px gap) sitting on top of it.
- 5 link columns: heads are `12px / 600 / uppercase / 0.12em` in black, links are `14px` in `#55534E`. Small badges ("We're hiring!") use a yellow fill.
- The bottom row has the logo, a centered copyright, and square social icon buttons (oat-300 bg, 12px radius).

---

## 6. Imagery

- **3D clay / plasticine renders** of abstract objects (funnels, magnifiers, gears, cubes) in each theme's color, placed on a soft beige floor with gentle shadows. The hero and footer are full scenes (green hills, sky, ball pit).
- Images sit inside **24px-radius cards** within the panels, never edge-to-edge (except the hero and footer).
- **For us:** we can't reuse their art. Something with the same effect would be our own 3D renders, or tightly cropped photography with a warm treatment, color-matched to each feature theme.

---

## 7. Motion

| What | Transition |
|---|---|
| Link color | `color .1s ease-out` |
| Button bg | `background-color .3s cubic-bezier(.075,.82,.165,1)` (expo-out) |
| Transforms (cards, underline fill) | `transform .4s cubic-bezier(.165,.84,.44,1)` (quart-out) |
| Shadow / focus | `box-shadow .5s cubic-bezier(.19,1,.22,1)` |

Hover effects stay small: a background shift, an underline sweep, a slight lift. Feature panels stack with **sticky scrolling**, not JS animation.

---

## 8. Icons

[Phosphor Icons](https://phosphoricons.com/) (regular, fill and bold), mostly `arrow-right` in CTAs and `arrow-up-right` on cards. Our project already ships Lucide, whose `arrow-right` and `arrow-up-right` are close enough.

---

## 9. Responsive (390px)

- The nav collapses to logo + one button + hamburger.
- The H1 drops to about 3rem, and the hero subtitle stays at about 24px.
- Hero buttons stack vertically and stay left-aligned (not full-width).
- The logo wall becomes a horizontal scroller. The 2-column feature panels become one column with the image below.
- Panels keep their big radius and sit about 8px from the screen edges.

---

## 10. Tailwind v4 starter tokens

A drop-in `@theme` block with Clay's structure. **Swap the theme hues for WinApps brand colors.** Our `paper #F7F5F0` and `line #E3E0D8` are already very close to Clay's oat-200 and border, so the neutrals barely change.

```css
@theme {
  /* Neutrals */
  --color-oat-50:  #fffcfa;
  --color-oat-100: #fefdfb;
  --color-oat-200: #f4f3f0;
  --color-oat-300: #eee9df;
  --color-oat-400: #dad4c8;
  --color-oat-border: #d1cdc7;
  --color-oat-muted: #7b7974;
  --color-oat-800: #55534e;
  --color-ink: #1b1a18;

  /* Type */
  --text-display: 5.5rem;  --text-display--line-height: 1;   --text-display--letter-spacing: -0.04em;
  --text-h2: 4.5rem;       --text-h2--line-height: 1;        --text-h2--letter-spacing: -0.03em;
  --text-h3: 3rem;         --text-h3--line-height: 1;        --text-h3--letter-spacing: -0.04em;
  --text-lead: 1.5rem;     --text-lead--line-height: 1.3;
  --text-eyebrow: 0.75rem; --text-eyebrow--letter-spacing: 0.25em;

  /* Radius */
  --radius-btn: 12px;
  --radius-tile: 18px;
  --radius-card: 24px;
  --radius-panel: 48px;

  /* Motion */
  --ease-expo-out:  cubic-bezier(.075,.82,.165,1);
  --ease-quart-out: cubic-bezier(.165,.84,.44,1);
}

/* Per-section theme: set on the panel wrapper, consumed by children */
.theme-teal   { --theme-bg: #eef7f7; --theme-tint: #aedadb; --theme-accent: #1f8a8c; --theme-ink: #0b2e2f; }
.theme-orange { --theme-bg: #fef6eb; --theme-tint: #fbd39e; --theme-accent: #b5620e; --theme-ink: #3f1f07; }
```

The example themes use our existing teal and orange scales. Following the contrast notes in [global.css](src/styles/global.css), the orange accent is `orange-700`, because lighter orange fails as text.

---

## 11. How this repo applies it

The system above is implemented in [src/styles/global.css](src/styles/global.css) in Winapps colours. Our stone scale plays Clay's oat role, and orange plays the lime CTA role.

| Clay pattern | Here |
| --- | --- |
| Oat neutrals, white page | `stone-*` scale, `bg-white` body, `paper` panels |
| Black primary / lime hero CTA / oat secondary | `.btn-dark` / `.btn-primary` (orange) / `.btn-secondary` |
| Tight display type at line-height 1 | `text-display`, `text-h1`, `text-h2` tokens carry size, leading and tracking |
| Two-tone headings | `accent` prop on `PageHero` and `SectionHeader`, or `<span class="text-accent">` |
| Feature themes | `.theme-teal`, `.theme-orange`, `.theme-amber`, `.theme-stone` on a `.panel` |
| Pill stack eyebrow | `.eyebrow-pill` (plain coloured eyebrow: `.eyebrow`) |
| Stacked sticky feature panels | `PracticeStack.astro` (home) |
| Logo-wall bento with bevel tiles | Intro panel on the home page, `.tile` |
| Prompt input | `BuildPrompt.astro`, which pre-fills the contact form |
| Resource bento cards | `PostCard.astro`, `CaseCard.astro` |
| Line link | `.line-link` (label in a `<span>`) |
| Floating nav, rounded bottom corners | `Header.astro` |
| Illustrated footer with oat card | `Footer.astro` + `Hills.astro` |
| Claymation art | Our own clay mark (`ClayMark.astro`), no Clay artwork |

The live reference for all of it is `/styleguide/`.

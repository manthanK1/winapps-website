# Deploying the Winapps website

The site is fully static: `npm run build` writes plain HTML, CSS and a few small scripts to `dist/`. Any static host works.

## Settings

All deployment settings are environment variables read at build time:

| Variable | Default | What it does |
| --- | --- | --- |
| `SITE_URL` | `https://manthank1.github.io` | Domain used for canonical URLs, the sitemap and social previews |
| `BASE_PATH` | `/winapps-website` | Sub-path the site is served from. Use `/` on a custom domain |
| `PUBLIC_WEB3FORMS_KEY` | _(empty)_ | Web3Forms access key. Without it, the contact form opens the visitor's email app instead |
| `PUBLIC_PLAUSIBLE_DOMAIN` | _(empty)_ | Turns on cookieless Plausible analytics for this domain. Leave empty for no analytics |

## GitHub Pages (current setup)

1. Repository **Settings → Pages → Build and deployment → Source: GitHub Actions**.
2. Every push to `main` runs `.github/workflows/deploy.yml`, which builds and publishes the site.
3. Optional repository **variables** (Settings → Secrets and variables → Actions → Variables): `SITE_URL`, `BASE_PATH`, `WEB3FORMS_KEY`, `PLAUSIBLE_DOMAIN`.

### Moving to winapps.co.in

1. Settings → Pages → Custom domain: `winapps.co.in`, then add the DNS records GitHub shows you.
2. Set repository variables `SITE_URL=https://winapps.co.in` and `BASE_PATH=/`.
3. Re-run the workflow. Links, canonical URLs and the sitemap all update automatically.

## Netlify

Connect the repository; `netlify.toml` already sets the build command, output folder and `BASE_PATH=/`. Add `SITE_URL` and `PUBLIC_WEB3FORMS_KEY` in **Site configuration → Environment variables**.

## Cloudflare Pages / Vercel

- Build command: `npm run build`
- Output directory: `dist`
- Environment: `NODE_VERSION=24`, `BASE_PATH=/`, `SITE_URL=https://your-domain`, plus `PUBLIC_WEB3FORMS_KEY` if you use it.

## Contact form (Web3Forms)

1. Get a free access key at web3forms.com using `sales@winapps.co.in`.
2. Add it as `PUBLIC_WEB3FORMS_KEY` (GitHub: repository variable `WEB3FORMS_KEY`). The key is public by design.
3. Rebuild. The form now submits in the page, shows success or error states, and still works without JavaScript.

## Before every release

```
npm run build
npm run validate                    # HTML validation
node scripts/qa.mjs                 # links, headings, keyboard checks (Edge)
node scripts/qa.mjs --browser firefox
node scripts/qa.mjs --browser webkit
npm run lighthouse                  # mobile Lighthouse on every page
npm run shots -- --pages /,/contact/ --widths 390,1440
```

Firefox and WebKit need a one-time `npx playwright install firefox webkit`.

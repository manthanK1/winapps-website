# Winapps website (redesign)

A static marketing site for Winapps, aimed at buyers in the US and Europe.
It's plain HTML, CSS and JS, with no build step.

```
winapps-website/
├── index.html            # single-page site
├── assets/css/styles.css # design tokens + all styles
├── assets/js/main.js     # nav, reveals, live clocks, contact form
└── assets/img/favicon.svg
```

## Run locally

Open `index.html` in a browser, or serve the folder:

```
npx serve .
# or
python -m http.server 8080
```

## Deploy

Any static host works: Netlify, Vercel, Cloudflare Pages or S3 + CloudFront. Drag the folder into Netlify, or point the host at this directory with no build command.

## Positioning principles

1. **Every claim must survive due diligence.** US and EU procurement teams check claims. The old site used award badges hotlinked from another agency's server (Inc., Stevie and Globee awards) and unverifiable percentages. Those are gone. Add an award or statistic back only with a link to the public source.
2. **Commitments over adjectives.** We state what the client gets: IP assignment, code in their own repos, a DPA, approval of each engineer, and time-zone overlap.
3. **Senior and specific.** Six practices, three engagement models and one clear CTA.

## Before launch checklist

- [ ] **Case studies** (`#work` in `index.html`): confirm each one is a real engagement you can discuss on a reference call. Add verified, client-approved outcome metrics where possible.
- [ ] **Overlap hours**: the site promises 4+ hours with CET and 3–4 hours with US Eastern (the Winapps workday is shown as 11:00–20:00 IST in `main.js`). Make sure delivery teams actually work these hours.
- [ ] **"Engineers with 8+ years"** and **"reply within one business day"**: keep these only if they are true.
- [ ] **Contact form**: currently opens the visitor's email app (mailto). Connect it to a real backend (HubSpot, Formspree, or a serverless function) so you don't lose leads.
- [ ] **Privacy policy and Terms** pages: these are required for EU visitors. The footer links are placeholders.
- [ ] **Analytics**: if you add tracking cookies, add a GDPR-compliant consent banner. Plausible or Fathom need no banner.
- [ ] **Registered business address**: EU buyers expect one on the site.
- [ ] **Real logos and testimonials**: only with written client permission.
- [ ] Add an Open Graph image (`og:image`) for LinkedIn sharing.

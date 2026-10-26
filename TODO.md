# Content Winapps needs to provide or confirm

Nothing below has been invented on the site. Until each item exists, the related section is either hidden or worded so it stays true.

## Brand
- [ ] **Logo as SVG** (or a transparent PNG at 2000px or more). The current logo is a keyed-out ~860px PNG and looks soft on large screens.
- [ ] **Horizontal logo lockup** (mark beside wordmark) for the header; the stacked logo makes "WINAPPS" small at header size.
- [ ] **Reversed (white) logo** if you want it on dark sections or the dark footer band.

## Company facts (`src/lib/site.ts`)
- [ ] Registered legal entity name (`legalName`).
- [ ] Registered office address (`address`): shown on Contact, used in structured data. EU buyers expect one.

## Proof (hidden until supplied)
- [ ] Client logos, with written permission (`src/content/clients/`).
- [ ] Testimonials: real quotes, with written permission (`src/content/testimonials/`).
- [ ] Leadership: names, roles, photos, LinkedIn (`src/content/team/`).
- [ ] Real team / office photos for the About page.
- [ ] Founding story for the About page (who, why, milestones since 2013).

## Case studies (`src/content/work/*.md`)
- [ ] Client-approved **results / metrics** for each (the `results` field).
- [ ] More detail on each **challenge** and **approach** that you can stand behind on a reference call.
- [ ] Confirm each **architecture diagram** reflects the real system (simplified is fine).
- [ ] Region for the logistics case study, if it can be shared.
- [ ] More case studies as they are cleared for publication.

## Claims to confirm are true
- [ ] Engagement leads have **8+ years** of experience (How we work page).
- [ ] Delivery teams work **11:00–20:00 IST** (drives the live clocks) and keep **4+ hours overlap with CET, 3–4 with US Eastern**.
- [ ] **Reply within one business day** and **NDA before the first call**.
- [ ] Service deliverables and delivery steps (`src/content/services/*.md`): drafted from your practice descriptions, please review the wording.
- [ ] Industry summaries and focus areas (`src/content/industries.yaml`).

## Legal
- [ ] Legal review of **/privacy/** and **/terms/** (governing law, retention periods, legal entity).

## Setup
- [ ] **Web3Forms access key** so the form submits on-page instead of opening the visitor's email app (see DEPLOY.md).
- [ ] Decide on analytics: none (current), or Plausible (cookieless, no banner needed).
- [ ] Point **winapps.co.in** at the host when ready (see DEPLOY.md).

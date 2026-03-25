# Audit Report — VetTop - Clinica Veterinaria
_Generated: 2026-03-25_

## 🔴 Critical (must fix before launch)

- [ ] **No `.env` file** — `NEXT_PUBLIC_SITE_URL` is missing, so `robots.ts`, `sitemap.ts`, and `layout.tsx` all fall back to `http://localhost:3000`. Create `.env` with the production URL.
- [ ] **No `og-image.jpg`** — `public/og-image.jpg` does not exist. Social sharing (Facebook, WhatsApp, LinkedIn) will show no preview image. This is a major SEO/marketing gap.
- [ ] **`NEXT_PUBLIC_GOOGLE_REVIEW_URL` not set** — The "Leave a Google Review" CTA button in `google-reviews.tsx` links to an empty string. Must set this env var to the actual Google review URL.
- [ ] **`site.webmanifest` has placeholder names** — `name: "MyWebSite"` and `short_name: "MySite"` instead of "VetTop" / "VetTop". Anyone adding the site to their home screen sees generic branding.
- [ ] **Pricing is entirely fabricated** — All three plans (Basic Checkup €45, Wellness Plan €25/mo, Senior Care €35/mo) and their features are invented. Per populate-report: "need real pricing." Either get real data or remove the section.
- [ ] **Email `info@vettop.pt` is unverified** — This email was guessed during populate. If this address doesn't exist, appointment confirmation emails and contact attempts will fail silently.

## 🟡 Warning (should verify with client)

- [ ] **3 of 4 team members are fabricated** — Only Dr. Daniel Carvalho is a real person. Dr. Joao Ferreira, Dr. Ana Costa, and Sofia Oliveira were invented (per populate-report). Their photos are AI-generated. Must get real staff names, roles, and photos.
- [ ] **"Founded in 2005" / "18+ years" is unverified** — Referenced in hero tagline, hero stats, about stats, footer tagline, and statsCounters. No source in info.md confirms the founding year.
- [ ] **"15,000+ patients treated" is unverified** — Used in statsCounters and about section. No source.
- [ ] **"6 vets on staff" is unverified** — Used in statsCounters. Only 3 vets are shown in team section (plus 1 nurse = 4 total). Inconsistent even within the fabricated data.
- [ ] **"24/7 emergency line" is unverified** — Referenced in hoursEmergency and FAQ. info.md shows Sunday is simply "Closed" with no mention of emergency availability.
- [ ] **About body is entirely generated** — The clinic story/philosophy was AI-written, not from the client. Should be replaced with real content.
- [ ] **FAQ answers reference unverified claims** — Payment plans, insurance support, emergency availability are not confirmed.
- [ ] **Map embed URL has truncated coordinates** — `!1d3113.5!2d-9.31!3d38.69` are rounded values. The embed works via the Place ID but the coordinates are imprecise. Should regenerate from Google Maps properly.
- [ ] **Navbar link order differs between EN and PT** — EN: `...testimonials, pricing, hours, faq...` vs PT: `...testimonials, hours, pricing, faq...`. The `pricing` and `hours` links are swapped. This causes different navigation order per language.
- [ ] **Social media links not used** — info.md has LinkedIn and Facebook URLs but they're not referenced anywhere in the dictionaries or components.
- [ ] **Services list is unconfirmed** — The 6 services (consultations, surgery, vaccinations, dental, grooming, emergency) seem reasonable but were never verified with the client.

## 🟢 Info (nice to have)

- [ ] **`about.jpg` is in `public/` root** — Convention is `public/about/about.jpg`. Not broken, but inconsistent with other image folders (`services/`, `team/`, `gallery/`).
- [ ] **No `hero/` image folder** — The hero section has no dedicated background image. If the design uses one, it's missing. If CSS-only, this is fine.
- [ ] **Zone.Identifier files in `public/`** — 6 Windows-generated `*.Zone.Identifier` metadata files exist (from downloading via browser on WSL). Harmless but cluttering. Can be deleted.
- [ ] **`logo.jpg` uses JPEG format** — Logos typically benefit from PNG/SVG for transparency support. Current file is 101KB.
- [ ] **Review avatars are all `null`** — All 6 reviews have `"avatar": null`. If the component supports avatars, this is a missed opportunity for visual richness. There are `reviews/pet-1.jpg`, `pet-2.jpg`, `pet-3.jpg` files that could be used.
- [ ] **No `hero` image referenced in dicts** — Unlike services, team, and gallery which have explicit image paths, the hero section has no image path in the dictionary. Verify this is intentional.

## 📊 Summary

| Category | Count |
|----------|-------|
| Critical | 6 |
| Warning  | 12 |
| Info     | 6 |
| **Total**| **24** |

### Data Integrity

- **Phone**: Consistent across all sections (EN + PT): `+351 21 195 0873` ✅
- **Address**: Consistent across all sections (EN + PT): `R. de Sao Paulo 4A, 2780-037 Oeiras` ✅
- **Email**: Consistent across all sections (EN + PT): `info@vettop.pt` ✅ (but unverified)
- **Hours**: Consistent across contact, footer, hoursEmergency (EN + PT) ✅
- **Image paths**: Identical between EN and PT dictionaries ✅
- **Pricing**: Identical between EN and PT (prices, plan structure) ✅
- **Stats/numbers**: Identical between EN and PT ✅
- **Reviews**: Appear to be real Google reviews (scraped via `ignite reviews`) ✅

### Image Audit

| Dict Path | File Exists |
|-----------|-------------|
| `/services/consultations.jpg` | ✅ |
| `/services/surgery.jpg` | ✅ |
| `/services/vaccinations.jpg` | ✅ |
| `/services/dental.jpg` | ✅ |
| `/services/grooming.jpg` | ✅ |
| `/services/emergency.jpg` | ✅ |
| `/team/daniel.jpg` | ✅ |
| `/team/joao.jpg` | ✅ |
| `/team/ana.jpg` | ✅ |
| `/team/sofia.jpg` | ✅ |
| `/gallery/1.jpg` | ✅ |
| `/gallery/2.jpg` | ✅ |
| `/gallery/3.jpg` | ✅ |
| `/gallery/4.jpg` | ✅ |
| `/gallery/5.jpg` | ✅ |
| `/gallery/6.jpg` | ✅ |
| `/about.jpg` | ✅ |
| `/og-image.jpg` | ❌ Missing |

### Cross-Reference with populate-report.md

The populate report flagged fabricated team, pricing, about body, and reviews. Since then:
- **Reviews** have been replaced with real Google reviews ✅
- **Team, pricing, about body** remain fabricated ❌
- **Email** remains unverified ❌
- **Google Review URL** and **Maps embed URL** remain unresolved ❌

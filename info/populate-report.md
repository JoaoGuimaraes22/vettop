# Populate Report for VetTop

## Verified ✅

Fields confirmed correct by info.md:

- `navbar.brand`: "VetTop" ✅
- `contact.phone`: "+351 21 195 0873" ✅
- `contact.address`: "R. de São Paulo 4A, 2780-037 Oeiras" ✅
- `footer.phone`: "+351 21 195 0873" ✅
- `footer.address`: "R. de São Paulo 4A, 2780-037 Oeiras" ✅
- `appointmentBar.phone`: "+351 21 195 0873" ✅
- `hoursEmergency.emergency_phone`: "+351 21 195 0873" ✅
- `hero.stats[0]`: "4.8★" Google Rating ✅
- `hero.stats[1]`: "262+" Reviews ✅
- `statsCounters.items[1]`: 262 5-Star Reviews ✅
- `about.stats[2]`: "4.8★" Rating ✅

## Corrected 🔧

Fields updated with real data from info.md:

- `hoursEmergency.schedule`: "9:00–20:00 Mon-Fri" → "9:30–13:00, 14:30–21:00 Mon-Fri" (has lunch break)
- `hoursEmergency.schedule`: "9:00–14:00 Sat" → "9:30–13:00, 14:30–19:00 Sat" (has lunch break, closes at 7pm)
- `hoursEmergency.schedule`: "Closed (Emergency Only) Sun" → "Closed Sun" (no evidence of emergency-only hours)
- `contact.hours`: "Mon–Fri 9am–8pm · Sat 9am–2pm" → "Mon–Fri 9:30am–1pm, 2:30–9pm · Sat 9:30am–1pm, 2:30–7pm"
- `footer.hours`: same correction as contact.hours
- `appointment.times`: adjusted slots to match real hours (starts 9:30, lunch gap 13:00-14:30, evening until 20:30)

## Unverified ⚠️

Fields with no data in info.md to confirm — kept as-is, verify with client:

- `hero.tagline`: "since 2005" — founding year not in info.md
- `hero.stats[2]`: "18+ Years of Care" — unverified
- `statsCounters.items[0]`: 15,000 patients treated — unverified
- `statsCounters.items[2]`: 18 years experience — unverified
- `statsCounters.items[3]`: 6 vets on staff — unverified
- `about.stats[0]`: "2005" founded — unverified
- `about.stats[1]`: "15K+" patients — unverified
- `about.body`: entire about story is generated, not from client
- `footer.tagline`: "since 2005" — unverified
- `pricing.plans[*]`: all pricing (€45, €25/mo, €35/mo) is fabricated — need real pricing
- `hoursEmergency.emergency_text`: "24/7 emergency line" — not confirmed in info.md
- `services.items[*]`: service list seems reasonable for a vet but not confirmed

## Fabricated 🔴

Content that was generated and needs real data from client:

- `team.members[*]`: All 4 team members are invented (Dr. Maria Santos, Dr. João Ferreira, Dr. Ana Costa, Sofia Oliveira) — need real staff names, roles, specializations, photos
- `reviews.items[*]`: All 6 reviews are fabricated — need real Google reviews
- `about.body`: Generated story — need real clinic story/philosophy
- `pricing.plans[*]`: All pricing plans and features are fabricated — need real pricing
- `faq.items[*]`: FAQ answers reference unverified info (24/7 emergency, payment plans, insurance support)

## Missing from info.md 📋

Data needed to complete the site that isn't in info.md yet:

- **Email address** — currently "info@vettop.pt" (guessed)
- **Website URL** — no existing website found
- **Google Review URL** — needed for the "Leave a Review" CTA button (env var `NEXT_PUBLIC_GOOGLE_REVIEW_URL`)
- **Google Maps embed URL** — current embed URL is a placeholder, need real one
- **Social media** — info.md has LinkedIn + Facebook but they're not used in the dict
- **Real team photos** — current images are AI-generated placeholders
- **Founding year** — referenced in hero and footer but not confirmed
- **Service list confirmation** — are consultations, surgery, vaccinations, dental, grooming, emergency all offered?

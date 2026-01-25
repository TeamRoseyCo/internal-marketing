# Rosey Co. - Multi-Location Website Launch

## What This Is

A global social media marketing agency website built with Next.js 16, targeting 6 geographic markets (US, AU, UK, IE, NL, DK) with full localization and SEO optimization. The site is in finishing mode - design and core functionality complete, now launching all locales with proper translations, geolocation, and final polish.

## Core Value

**Multi-location SEO infrastructure that works flawlessly** - each locale must rank independently in local search with proper translations, currency formatting, and locale-aware metadata. If geolocation and translations don't work perfectly, the entire global strategy fails.

## Requirements

### Validated

<!-- Existing capabilities from codebase analysis -->

- ✓ Next.js 16 App Router with dynamic locale routing (`/us`, `/nl`, `/dk`, `/au`, `/uk`, `/ie`) — existing
- ✓ Complete page structure for all locales (home, services, blog, contact, results, privacy) — existing
- ✓ Blog system with MDX content (22 posts in US, 19 translated to NL/DK) — existing
- ✓ Translation system infrastructure (translations.ts, page-translations.ts, locales.ts) — existing
- ✓ LocalBusiness structured data per locale — existing
- ✓ BunnyStream video integration — existing
- ✓ Supabase lead capture infrastructure — existing
- ✓ Resend email service integration (code complete) — existing
- ✓ Framer Motion animations + Lenis smooth scroll — existing
- ✓ Next.js metadata API for SEO — existing

### Active

<!-- Current scope - what we're building toward -->

**PRIORITY 1: Multi-Location SEO (CRITICAL PATH)**

- [ ] **LOCALE-01**: Fix geolocation persistence - implement cookie/localStorage to remember user's locale preference
- [ ] **LOCALE-02**: Add automatic geo-detection on first visit (detect user's country, redirect to appropriate locale)
- [ ] **LOCALE-03**: Add visible locale switcher component in header/footer
- [ ] **LOCALE-04**: Fix Header component - make fully locale-aware (translate all hardcoded English text)
- [ ] **LOCALE-05**: Fix Footer component - make fully locale-aware (translate all hardcoded English text, link labels, descriptions)
- [ ] **LOCALE-06**: Audit all NL translations for quality (fix mixed language, incomplete translations, grammatical errors)
- [ ] **LOCALE-07**: Audit all DK translations for quality (fix mixed language, incomplete translations, grammatical errors)
- [ ] **LOCALE-08**: Verify currency formatting displays correctly per locale ($ vs £ vs € with proper thousand separators)
- [ ] **LOCALE-09**: Test all locale routes generate correctly at build time
- [ ] **LOCALE-10**: Verify locale-specific metadata (titles, descriptions, Open Graph) render properly

**PRIORITY 2: Content & Polish**

- [ ] **CONTENT-01**: Migrate free guides from `/migration-content/guides/` and set up download flow
- [ ] **CONTENT-02**: Migrate case studies from `/migration-content/case-studies/` to Results page
- [ ] **RESULTS-01**: Replace Results page placeholders with real client logos
- [ ] **RESULTS-02**: Upload additional VSLs to BunnyStream and add to Results page video section
- [ ] **RESULTS-03**: Integrate Instagram feed widget (Elfsight or Behold) on Results page
- [ ] **RESULTS-04**: Add real case study content with metrics

**PRIORITY 3: Integrations & Analytics**

- [ ] **INTEGRATION-01**: Verify Resend domain (roseyco.com) and test email notifications
- [ ] **INTEGRATION-02**: Set up Google Analytics 4 property and add tracking script
- [ ] **INTEGRATION-03**: Set up Microsoft Clarity project and add tracking script
- [ ] **INTEGRATION-04**: Test Google Reviews integration (work with Bailey)
- [ ] **INTEGRATION-05**: Test all lead capture forms end-to-end (contact, newsletter, guide downloads)

**PRIORITY 4: Performance & Launch**

- [ ] **PERF-01**: Achieve Lighthouse Performance score 90+
- [ ] **PERF-02**: Achieve Lighthouse Accessibility score 90+
- [ ] **PERF-03**: Achieve Lighthouse Best Practices score 90+
- [ ] **PERF-04**: Achieve Lighthouse SEO score 90+
- [ ] **LAUNCH-01**: Verify sitemap.xml includes all locale routes
- [ ] **LAUNCH-02**: Coordinate with Bailey on Google Business Profile integration
- [ ] **LAUNCH-03**: Setup real contact information for each locale (phone numbers, addresses)

### Out of Scope

- **Email/SMS Marketing service page** — Might clutter design; decide post-launch if needed
- **CRM service page** — Falls under NEURA sub-company; keep separate
- **AI Chatbot (Voiceflow)** — Post-MVP feature; launch site first
- **Admin dashboard for lead management** — Not needed for MVP; Supabase dashboard sufficient
- **Affiliate program functionality** — Future feature; tables exist but no UI needed now
- **User authentication system** — Site is public; no login needed
- **Real-time chat** — Not core to agency value proposition
- **Video calls/calendar booking** — Using external Calendly; no custom booking system

## Context

**Brownfield Project Status:**
- Acquired Australian marketing agency website rebuilt in Next.js
- Previous iteration had broken geolocation (wouldn't remember locale settings after page reload)
- Translation quality issues found in NL/DK versions (mixed languages, incomplete translations)
- Design and layout 100% complete - dark luxury theme (Rose Red, Crimson, Leaf Green)
- 22 blog posts live, 19 fully translated to NL and DK
- Infrastructure solid but needs quality fixes and final polish

**Business Context:**
- Operates in 6 geographic markets: US (Missouri/Kansas), Australia, UK, Ireland, Netherlands, Denmark
- Multi-location SEO strategy uses subdirectories (/us/, /au/, /uk/, /ie/, /nl/, /dk/)
- Each locale needs to rank independently in local Google searches
- Bailey (team member) handles SEO strategy and Google Business Profile setup
- NEURA is a sub-company handling CRM services (separate from this site)

**Technical Environment:**
- Next.js 16 App Router with TypeScript
- Tailwind CSS 4.0 + shadcn/ui components
- Supabase (PostgreSQL + Auth + Edge Functions + Storage)
- BunnyStream for video hosting (switched from Wistia)
- Resend for transactional emails
- Vercel deployment
- Framer Motion + Lenis for animations

**Known Issues:**
- Header and Footer components hardcoded in English (not using translation system)
- Geolocation doesn't persist across sessions (no cookie/localStorage)
- No automatic geo-detection or visible locale switcher
- Some NL/DK translations have mixed English words ("Get More Leads", "Your Business", "behind-the-scenes content")
- Footer paragraph entirely in English on NL/DK pages
- Currency formatting needs verification across locales
- Contact information using placeholders (phone numbers like +1 (555) 123-4567)

**User Feedback:**
- "Multi-location SEO is currently the biggest bottleneck"
- "Phone numbers and currencies need to be country specific"
- "Some sentences either weren't translated at all, half dk/nl and half English"
- "Check if we translated the pages in the most efficient way performance-wise"

## Constraints

- **Tech Stack**: Must use existing Next.js 16 + Supabase + BunnyStream stack — already integrated and working
- **Design**: Dark luxury theme is final — no design changes, only translation/functionality fixes
- **SEO Strategy**: Subdirectory approach (/locale/) is decided — don't change to subdomains or separate domains
- **Performance**: Must hit 90+ Lighthouse scores before launch — non-negotiable for SEO
- **Translation Quality**: All NL/DK text must be grammatically correct native-level translations — poor translations hurt credibility
- **Browser Support**: Must work on latest Chrome, Firefox, Safari, Edge + mobile Safari/Chrome — standard modern browser support
- **Domain**: roseyco.com (existing domain) — no new domain acquisition needed

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Subdirectory locale strategy (/us/, /nl/, etc.) | Full SEO power per location, easier to manage than subdomains, single codebase | ✓ Good - already implemented and working |
| Next.js App Router with dynamic [locale] segment | Generates static pages for all locales at build time, optimal for SEO | ✓ Good - generates 213+ pages successfully |
| Separate translation files (translations.ts + page-translations.ts) | Clean separation of concerns, easier to maintain | ⚠️ Revisit - components not using translations (Header/Footer) |
| BunnyStream over Wistia for video hosting | Cost savings, better performance, full control | ✓ Good - migration complete, working well |
| MDX for blog content with locale-specific folders | File-system based, each locale has own content folder with fallback to US | ✓ Good - 19 posts translated, fallback works |
| No auto geo-detection in first iteration | Simpler implementation, users manually navigate to locale | ⚠️ Revisit - users expected persistence, current UX problematic |
| Hardcoded English in Header/Footer | Faster initial development, planned to add translations later | — Pending - now blocking multi-locale launch |
| Placeholder contact info in locale config | Awaiting real phone numbers and addresses for each location | — Pending - need to acquire real contact information |

---
*Last updated: 2026-01-25 after GSD project initialization*

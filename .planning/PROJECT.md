# Rosey Co. - Multi-Location Website Launch

## What This Is

A global social media marketing agency website built with Next.js 16, targeting 6 geographic markets (US, AU, UK, IE, NL, DK) with full localization and SEO optimization. Multi-location infrastructure complete (v1.0), Belfast SEO domination infrastructure shipped (v1.1) with topical authority architecture, pillar-cluster content network, and comprehensive local SEO toolkit.

## Core Value

**Multi-location SEO infrastructure that works flawlessly** - each locale must rank independently in local search with proper translations, currency formatting, and locale-aware metadata. If geolocation and translations don't work perfectly, the entire global strategy fails.

## Requirements

### Validated

**v1.0 Multi-Location Launch (Phases 1-5, shipped 2026-01-27):**

- ✓ Next.js 16 App Router with dynamic locale routing (`/us`, `/nl`, `/dk`, `/au`, `/uk`, `/ie`) — v1.0
- ✓ Complete page structure for all locales (home, services, blog, contact, results, privacy) — v1.0
- ✓ Blog system with MDX content (22 posts in US, 19 translated to NL/DK) — v1.0
- ✓ Translation system infrastructure (translations.ts, page-translations.ts, locales.ts) — v1.0
- ✓ Header and Footer components fully locale-aware with translation system — v1.0
- ✓ Currency formatting per locale ($ vs £ vs € with proper separators) — v1.0
- ✓ Geolocation persistence via cookie, automatic geo-detection on first visit — v1.0
- ✓ Visible locale switcher component in header and footer — v1.0
- ✓ Cookie consent banner for EU visitors (GDPR compliance) — v1.0
- ✓ hreflang tags for all 6 locales + x-default — v1.0
- ✓ Locale-specific metadata (titles, descriptions, Open Graph tags) — v1.0
- ✓ Sitemap.xml includes all locale routes (213+ pages) — v1.0
- ✓ robots.txt configured for all locale directories — v1.0
- ✓ LocalBusiness structured data per locale — v1.0
- ✓ Google Search Console verified with domain property — v1.0
- ✓ Lighthouse Performance 90+ across all locales — v1.0
- ✓ BunnyStream video integration — existing
- ✓ Supabase lead capture infrastructure — existing
- ✓ Resend email service integration (code complete) — existing
- ✓ Framer Motion animations + Lenis smooth scroll — existing
- ✓ Next.js metadata API for SEO — existing

**v1.1 Belfast SEO Domination (Phases 6-12, shipped 2026-02-11):**

- ✓ Comprehensive Belfast SEO strategy with market research, competitor analysis, keyword research (115+ keywords) — v1.1
- ✓ Topical authority architecture: pillar-cluster content infrastructure with dynamic routes — v1.1
- ✓ Keyword cannibalization prevention via keyword-map.ts validation — v1.1
- ✓ PillarPageSchema with hasPart/isPartOf linking pillars to clusters — v1.1
- ✓ Navigation components: Breadcrumbs, TableOfContents, RelatedClusters — v1.1
- ✓ Belfast location hub at /uk/belfast/ with enhanced LocalBusiness schema — v1.1
- ✓ Belfast geo coordinates (54.5833, -5.9333) and structured address data — v1.1
- ✓ Belfast NAP consistency: 1 Hollycroft Avenue, Belfast, BT5 5JE, +44 7722 432679 — v1.1
- ✓ 4 complete Belfast pillar pages (17,814 words total: SEO, Social Media, Paid Ads, Website Design) — v1.1
- ✓ 12 Belfast cluster blog posts with bidirectional pillar-cluster linking — v1.1
- ✓ Service-location content matrix: bidirectional cross-linking between location hub, pillars, global services — v1.1
- ✓ NAP consistency audit (97% consistency across 70 occurrences) — v1.1
- ✓ Citation management toolkit: 35+ directory tracker (14 Tier 1, 21 Tier 2) — v1.1
- ✓ Link building strategy (12-week action plan) and outreach templates (11 templates across 4 channels) — v1.1
- ✓ Tier 1 directory submission guides (14 step-by-step guides) — v1.1
- ✓ GA4 custom event tracking: phone_call_click, form_submission, direction_request — v1.1
- ✓ TrackedPhone and TrackedDirections components for conversion tracking — v1.1
- ✓ Belfast KPI dashboard specification (15 metrics across 4 categories) — v1.1
- ✓ Belfast monitoring playbook with 3 review cadences and alert response procedures — v1.1

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

**Current State (v1.1 shipped 2026-02-11):**
- Multi-location infrastructure complete with working geolocation, translations, and locale switcher
- Belfast SEO infrastructure complete with topical authority architecture (4 pillars, 12 clusters)
- 251 static pages generated (6 locales × multiple page types + Belfast content)
- 17,814 words of Belfast-specific content (pillar pages) + 12 cluster blog posts
- NAP consistency established at 97% across all locale configurations
- GA4 conversion tracking implemented for Belfast location (phone, form, directions)
- Citation management toolkit ready for execution (35+ directories tracked)
- Design complete: dark luxury theme (Rose Red, Crimson, Leaf Green)

**Business Context:**
- Operates in 6 geographic markets: US (Missouri/Kansas), Australia, UK, Ireland, Netherlands, Denmark
- Multi-location SEO strategy uses subdirectories (/us/, /au/, /uk/, /ie/, /nl/, /dk/)
- Belfast market focus: targeting 15,000+ SMBs with £500-2000/month budget
- Each locale needs to rank independently in local Google searches
- Bailey (team member) handles SEO strategy and Google Business Profile setup
- NEURA is a sub-company handling CRM services (separate from this site)

**Technical Environment:**
- Next.js 16 App Router with TypeScript
- Tailwind CSS 4.0 + shadcn/ui components
- Supabase (PostgreSQL + Auth + Edge Functions + Storage)
- BunnyStream for video hosting
- Resend for transactional emails
- Vercel deployment
- Framer Motion + Lenis for animations
- Google Analytics 4 (ready for NEXT_PUBLIC_GA_ID configuration)

**Post-Launch Operational Tasks:**
- Directory submissions: 4-6 hours manual work using Tier 1 submission guides
- HARO account setup and daily monitoring (15 min/day)
- GA4 event testing in production environment
- Looker Studio dashboard creation (2-3 hours)
- Competitive tracking baseline (30 min monthly)
- Belfast media pitching (1-2 hours per publication)
- Chamber membership evaluation (Belfast Chamber, NI Chamber)

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
| Subdirectory locale strategy (/us/, /nl/, etc.) | Full SEO power per location, easier to manage than subdomains, single codebase | ✓ Good - generates 251 pages, SEO working perfectly |
| Next.js App Router with dynamic [locale] segment | Generates static pages for all locales at build time, optimal for SEO | ✓ Good - v1.0 and v1.1 complete |
| Translation system with i18n context and hooks | Clean separation, type-safe, centralized | ✓ Good - Header/Footer converted in v1.0 |
| BunnyStream over Wistia for video hosting | Cost savings, better performance, full control | ✓ Good - migration complete, working well |
| MDX for blog content with locale-specific folders | File-system based, each locale has own content folder with fallback to US | ✓ Good - now supports pillar and cluster content types |
| Pillar-cluster topical authority architecture | 40% higher visibility vs flat content, prevents keyword cannibalization | ✓ Good - v1.1 implemented with keyword-map.ts validation |
| Belfast as first local SEO test market | UK locale already exists, English language (simpler), 15,000+ SMB market | ✓ Good - comprehensive infrastructure complete |
| Keyword map with single-URL-per-keyword validation | Prevents cannibalization, enforces topical authority | ✓ Good - zero conflicts detected in validation |
| NAP data in locales.ts as single source of truth | Eliminates inconsistency, structured data uses single source | ✓ Good - 97% consistency achieved |
| GA4 custom events for Belfast conversions | Tracks phone calls, forms, directions specific to Belfast location | ✓ Good - implementation complete, ready for production |
| Free tools first, paid after revenue (Phase approach) | Looker Studio free tier, BrightLocal after 1st client ($39/mo), SEMrush after 2-3 ($199/mo) | ✓ Good - aligns with startup budget constraints |
| Belfast content written by AI with local research | Authentic Belfast references (Cathedral Quarter, Titanic Quarter), UK English spelling | ✓ Good - 50+ Cathedral Quarter mentions, genuine local context |
| Three review cadences for monitoring | Weekly 15min (critical issues), Monthly 45min (trends), Quarterly 2hr (strategy) | ✓ Good - balances thoroughness with time efficiency |

---
*Last updated: 2026-02-11 after v1.1 Belfast SEO Domination milestone*

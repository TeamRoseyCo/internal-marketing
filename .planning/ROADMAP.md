# Roadmap: Rosey Co. Multi-Location Launch

**Created:** 2026-01-25
**Project:** Multi-location SEO infrastructure across 6 locales (US, AU, UK, IE, NL, DK)
**Depth:** Standard (7 phases)
**Coverage:** 39/39 v1 requirements mapped

---

## Overview

Launch Rosey Co. global marketing agency website with flawless multi-location SEO. Each locale must rank independently in local search with perfect translations, currency formatting, and locale-aware metadata. The site foundation is complete - now executing critical path to production launch with proper geolocation, translation quality, and performance optimization.

**Critical Path:** Phases 1-3 are BLOCKERS for launch. Phases 4-7 can ship incrementally post-launch.

---

## Phase 1: SEO Foundation (BLOCKER) - COMPLETE

**Goal:** Google recognizes all 6 locale variants with proper hreflang configuration and no duplicate content warnings.

**Dependencies:** None (first phase)

**Plans:** 4 plans

Plans:
- [x] 01-01-PLAN.md — Fix hreflang infrastructure (layout + SEO utility)
- [x] 01-02-PLAN.md — Add per-page metadata with hreflang to all locale pages
- [x] 01-03-PLAN.md — Verify sitemap, robots, and LocalBusiness structured data
- [x] 01-04-PLAN.md — Build verification and Google Search Console setup

**Requirements Covered:**
- SEO-01: hreflang tags include all 6 locales + x-default
- SEO-02: Locale-specific metadata per page
- SEO-03: Sitemap.xml includes all locale routes
- SEO-04: robots.txt allows crawling of all locales
- SEO-05: LocalBusiness structured data per locale
- SEO-06: Google Search Console verified
- SEO-07: All locale routes generate at build time

**Success Criteria:**

1. User searching in Australia sees `/au` pages in Google results, not `/us` pages
2. Google Search Console shows zero hreflang errors across all 213+ pages
3. Each locale has self-referential canonical tags (e.g., `/nl/services` canonicals to `/nl/services`, not `/us/services`)
4. Sitemap includes all locale-prefixed routes and submits successfully to Search Console
5. LocalBusiness structured data displays correct phone numbers and addresses per locale when tested in Rich Results Test

---

## Phase 2: Component Architecture (BLOCKER) - COMPLETE

**Goal:** Establish centralized translation infrastructure and convert global layout components (Header/Footer) to use it. This creates the architectural foundation for all future component translations.

**Dependencies:** None (can run parallel with Phase 1)

**Plans:** 4 plans

Plans:
- [x] 02-01-PLAN.md — Create i18n infrastructure (context, hooks, types, formatters)
- [x] 02-02-PLAN.md — Convert Header component to use translation system
- [x] 02-03-PLAN.md — Convert Footer component to use translation system
- [x] 02-04-PLAN.md — Fix Danish special characters and verify all requirements

**Requirements Covered:**
- TRANS-01: Header component uses translation system
- TRANS-02: Footer component uses translation system
- TRANS-06: Currency formatting displays correctly per locale
- TRANS-07: Build-time validation catches missing translation keys
- TRANS-08: Centralized translation system established (Header/Footer converted; remaining components converted as worked on in future phases)

**Success Criteria:**

1. User visiting `/nl` locale sees Dutch text in header navigation and CTA button ("Krijg Meer Leads", not "Get More Leads")
2. User visiting `/dk` locale sees Danish text in footer headings and contact information
3. Currency displays correctly: US shows "$1,299", UK shows "£1,299", NL shows "€ 1.299,00" with proper thousand separators
4. Build fails immediately if any component attempts to render with missing translation key
5. Header and Footer components detect locale from context (not URL parsing) with TypeScript type safety

---

## Phase 3: Translation Quality Assurance (BLOCKER) - COMPLETE

**Goal:** All Dutch and Danish translations are grammatically correct with zero mixed-language content.

**Dependencies:** Phase 2 (components must use translation system before fixing translations)

**Plans:** 2 plans

Plans:
- [x] 03-01-PLAN.md — Automated grammar validation and fixes for NL/DK translations
- [x] 03-02-PLAN.md — Native speaker review and final validation

**Requirements Covered:**
- TRANS-03: Dutch translations pass grammar validation
- TRANS-04: Danish translations pass grammar validation
- TRANS-05: No mixed-language content

**Success Criteria:**

1. Native Dutch speaker reads homepage and finds zero grammatical errors or unnatural phrasing
2. Native Danish speaker reads services page and finds zero mixed English words
3. Automated grammar check (LanguageTool for NL, RetMig for DK) reports zero errors in translation files
4. No English phrases appear in Dutch pages (e.g., "Your Business" fixed to "Uw Bedrijf")
5. i18n-check script reports 100% translation key coverage (no missing keys, no unused keys)

---

## Phase 4: Geolocation & Locale Switcher - COMPLETE

**Goal:** First-time visitors automatically land on appropriate locale with manual override capability.

**Dependencies:** Phase 1 (SEO foundation must be complete for proper redirects)

**Plans:** 3 plans

Plans:
- [x] 04-01-PLAN.md — Middleware geolocation detection and cookie persistence
- [x] 04-02-PLAN.md — Locale switcher component with Header/Footer integration
- [x] 04-03-PLAN.md — Cookie consent banner for EU visitors (GDPR compliance)

**Requirements Covered:**
- GEO-01: Locale preference persists via cookie
- GEO-02: Auto geo-detection on first visit
- GEO-03: Visible locale switcher component
- GEO-04: Locale switcher in header and footer
- GEO-05: Server-side 302 redirects (not JavaScript)
- GEO-06: Cookie consent banner for EU visitors

**Success Criteria:**

1. User in Netherlands visiting roseyco.com (without locale prefix) automatically redirects to roseyco.com/nl via 302 redirect
2. User in Australia switches to UK locale via header dropdown, closes browser, returns next day and still sees UK locale
3. User on mobile device sees locale switcher in hamburger menu with flag icons and country names
4. EU visitor (NL, DK, IE) sees cookie consent banner before geolocation cookie is set
5. User with VPN routing through incorrect country can manually override via visible locale switcher in header

---

## Phase 5: Content & Results Page

**Goal:** Results page showcases real client work with case studies, videos, and Instagram social proof.

**Dependencies:** Phase 2 (components must support translations for content to render correctly)

**Plans:** 0 plans

Plans:
- [ ] TBD (created by /gsd:plan-phase)

**Requirements Covered:**
- CONTENT-01: Free guides migrated with download flow
- CONTENT-02: Case studies migrated to Results page
- RESULTS-01: Real client logos displayed
- RESULTS-02: VSL videos from BunnyStream
- RESULTS-03: Instagram feed widget integrated

**Success Criteria:**

1. User downloads free guide "SEO Checklist" from homepage, receives email with PDF within 2 minutes
2. User views Results page and sees 3+ case studies with real metrics (not placeholder text like "500% increase")
3. User scrolls to portfolio section and sees embedded BunnyStream videos playing smoothly
4. User reaches bottom of Results page and sees live Instagram feed from @roseyco.official with latest 9 posts
5. Case study cards display client logos as images (not generic placeholder icons)

---

## Phase 6: Integrations & Analytics

**Goal:** All lead capture forms work end-to-end with proper email notifications and analytics tracking.

**Dependencies:** Phase 5 (content must exist before testing forms)

**Plans:** 0 plans

Plans:
- [ ] TBD (created by /gsd:plan-phase)

**Requirements Covered:**
- INT-01: Resend domain verified
- INT-02: Contact form triggers emails
- INT-03: Google Analytics 4 tracking active
- INT-04: Microsoft Clarity session recording
- INT-05: Newsletter signup working
- INT-06: Guide download form working

**Success Criteria:**

1. User submits contact form, admin receives notification email within 30 seconds and user receives confirmation email
2. User signs up for newsletter, welcome email arrives within 2 minutes and contact is added to Mailchimp list
3. Google Analytics 4 dashboard shows real-time pageviews with correct locale dimension (e.g., "/nl/services" tagged as NL)
4. Microsoft Clarity heatmap displays user interactions on homepage for all 6 locales
5. Resend email logs show zero bounce/spam reports for transactional emails

---

## Phase 7: Performance & Launch Validation

**Goal:** Site achieves 90+ Lighthouse scores with production-ready Google Business Profile integration.

**Dependencies:** Phase 6 (all integrations must be active before final performance testing)

**Plans:** 0 plans

Plans:
- [ ] TBD (created by /gsd:plan-phase)

**Requirements Covered:**
- PERF-01: Lighthouse Performance 90+
- PERF-02: Lighthouse Accessibility 90+
- PERF-03: Lighthouse Best Practices 90+
- PERF-04: Lighthouse SEO 90+
- PERF-05: Hero images use priority loading
- PERF-06: Analytics scripts optimized
- PERF-07: Core Web Vitals pass in production
- GBP-01: Google Business Profile setup coordinated
- GBP-02: Website linked to GBP per locale
- GBP-03: NAP consistency between site and GBP

**Success Criteria:**

1. User on slow 3G connection sees hero image within 2.5 seconds (LCP target)
2. Lighthouse audit on `/us` homepage shows 90+ on all four metrics (Performance, Accessibility, Best Practices, SEO)
3. Bailey confirms Google Business Profile linked for US, AU, UK, IE, NL, DK locations with matching phone numbers from website
4. Google Search Console field data (real users) shows INP < 200ms and CLS < 0.1 for all locales
5. All analytics scripts load using `strategy="afterInteractive"` without blocking page render

---

## Progress Tracking

| Phase | Status | Requirements | Success Criteria | Notes |
|-------|--------|--------------|------------------|-------|
| Phase 1: SEO Foundation | Complete | 7/7 | 5/5 | BLOCKER for launch |
| Phase 2: Component Architecture | Complete | 5/5 | 5/5 | BLOCKER for launch |
| Phase 3: Translation QA | Complete | 3/3 | 5/5 | BLOCKER for launch |
| Phase 4: Geolocation | Complete | 6/6 | 5/5 | All requirements verified |
| Phase 5: Content & Results | Pending | 5/5 | 0/5 | Post-launch acceptable |
| Phase 6: Integrations | Pending | 6/6 | 0/5 | Post-launch acceptable |
| Phase 7: Performance & Launch | Pending | 10/10 | 0/5 | Final validation |

**Total Coverage:** 39/39 v1 requirements mapped (100%)

---

## Critical Path

**MUST COMPLETE BEFORE LAUNCH:**
- Phase 1: SEO Foundation - COMPLETE
- Phase 2: Component Architecture - COMPLETE
- Phase 3: Translation QA - COMPLETE

**CAN SHIP POST-LAUNCH:**
- Phase 4: Geolocation (improves UX, not SEO blocker) - PLANNED (3 plans)
- Phase 5: Content & Results (can launch with partial content)
- Phase 6: Integrations (can launch with basic contact form)

**FINAL VALIDATION:**
- Phase 7: Performance & Launch (polish before production)

---

## Next Steps

1. **Execute Phase 4** - Use `/gsd:execute-phase 4` to run Geolocation plans
2. **Plan Phase 5** - Use `/gsd:plan-phase 5` after Phase 4 completes
3. **Ship & Iterate** - Launch with Phases 1-4, add Phases 5-7 incrementally

---

*Last updated: 2026-01-27*

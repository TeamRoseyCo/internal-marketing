# Roadmap: Rosey Co. Multi-Location & Belfast SEO Domination

**Created:** 2026-01-25
**Project:** Multi-location SEO infrastructure + Belfast topical authority strategy
**Depth:** Standard (5-8 phases per milestone)

---

## Milestones

- ✅ **v1.0 Multi-Location Launch** - Phases 1-5 (shipped 2026-01-27)
- 🚧 **v1.1 Belfast SEO Domination** - Phases 6-12 (in progress)

---

## Overview

Build complete SEO domination in Belfast and Northern Ireland through topical authority strategy. After establishing flawless multi-location infrastructure (v1.0), now implementing advanced SEO playbook with topical clustering, pillar content, and comprehensive local search optimization to own Belfast market completely.

---

## Phases

<details>
<summary>✅ v1.0 Multi-Location Launch (Phases 1-5) - SHIPPED 2026-01-27</summary>

### Phase 1: SEO Foundation (BLOCKER) - COMPLETE

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

## Phase 5: Performance & Launch Validation - COMPLETE

**Goal:** Site achieves 90+ Lighthouse scores with production-ready Google Business Profile integration.

**Dependencies:** Phase 4 (geolocation and locale infrastructure must be complete)

**Plans:** 3 plans

Plans:
- [x] 05-01-PLAN.md — Image & script optimization + baseline Lighthouse audit
- [x] 05-02-PLAN.md — CLS optimization for animations and dynamic content
- [x] 05-03-PLAN.md — NAP audit, GBP coordination, and final Lighthouse validation

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

</details>

### v1.1 Belfast SEO Domination (In Progress)

**Milestone Goal:** Achieve complete SEO domination in Belfast and Northern Ireland through topical authority strategy, pillar content architecture, and advanced local SEO optimization.

#### Phase 6: Belfast SEO Research & Strategy

**Goal:** Research Belfast market, identify keyword opportunities, map topical clusters, and create comprehensive SEO strategy document.
**Depends on:** Phase 5 (v1.0 must be complete)
**Research:** Complete (06-RESEARCH.md created with comprehensive Belfast SEO intelligence)
**Research topics:** Belfast search volume data, competitor analysis, local intent keywords, topical cluster opportunities
**Plans:** 3 plans

Plans:
- [x] 06-01-PLAN.md — Belfast keyword research & competitive analysis
- [x] 06-02-PLAN.md — Topical map & content architecture design
- [x] 06-03-PLAN.md — SEO strategy documentation & implementation roadmap

#### Phase 7: Topical Authority Architecture

**Goal:** Build pillar-cluster content infrastructure with content loading functions, schema markup, navigation components, and pillar page routes for all 6 locales.
**Depends on:** Phase 6
**Research:** Complete (07-RESEARCH.md)
**Plans:** 3 plans

Plans:
- [x] 07-01-PLAN.md — Content data layer (pillar types, loading functions, keyword map, placeholder MDX files)
- [x] 07-02-PLAN.md — Schema and UI components (PillarPageSchema, Breadcrumbs, TableOfContents, RelatedClusters)
- [x] 07-03-PLAN.md — Pillar page route integration, sitemap update, locale pillar files, validation script, build verification

#### Phase 8: Belfast Location Pages

**Goal:** Create comprehensive Belfast-focused location pages with proper LocalBusiness schema, NAP consistency, and embedded maps.
**Depends on:** Phase 7
**Research:** Complete (08-RESEARCH.md not needed - internal patterns established)
**Plans:** 2 plans

Plans:
- [x] 08-01-PLAN.md -- Enhanced Belfast LocalBusiness schema + structured address data + geo coordinates
- [x] 08-02-PLAN.md -- Belfast location page route with map embed, services links, FAQs, and sitemap update

#### Phase 9: Service-Location Content Matrix

**Goal:** Complete bidirectional cross-linking between Belfast location hub and pillar pages, enrich pillar content with local context, and connect global service pages to Belfast pillars for UK visitors.
**Depends on:** Phase 8
**Research:** Complete (09-RESEARCH.md)
**Plans:** 2 plans

Plans:
- [x] 09-01-PLAN.md — Enrich Belfast pillar pages with cross-links, local context, and Related Services UI
- [x] 09-02-PLAN.md — Add Belfast callout banners to UK global service pages

#### Phase 10: Belfast Blog Content Strategy

**Goal:** Fill Belfast pillar page placeholder content, extend blog infrastructure for cluster metadata, write 12 Belfast cluster blog posts across all 4 service pillars, and establish complete pillar-cluster topical authority architecture.
**Depends on:** Phase 9
**Research:** Complete (10-RESEARCH.md)
**Plans:** 5 plans

Plans:
- [x] 10-01-PLAN.md — Extend blog types for cluster support + expand keyword map + create content calendar
- [x] 10-02-PLAN.md — Fill all Belfast pillar page placeholder content (SEO, Social Media, Paid Ads, Website Design)
- [x] 10-03-PLAN.md — Write 6 cluster posts: SEO Belfast (4) + Social Media Belfast (2)
- [x] 10-04-PLAN.md — Write 6 cluster posts: Paid Ads Belfast (3) + Website Design Belfast (3)
- [x] 10-05-PLAN.md — Wire pillar-cluster relationships, verify bidirectional linking, full content audit

#### Phase 11: Local Link Building & Citations

**Goal:** Audit NAP consistency, build comprehensive citation management toolkit, create link building outreach templates and strategy, and establish Tier 1 directory presence for Belfast local SEO.
**Depends on:** Phase 10
**Research:** Complete (11-RESEARCH.md)
**Research topics:** Belfast business directories, NI chamber of commerce, local press contacts, citation sources
**Plans:** 3 plans

Plans:
- [x] 11-01-PLAN.md — NAP consistency audit + comprehensive citation tracker (35+ directories)
- [x] 11-02-PLAN.md — Outreach templates (HARO, media, partnerships) + Belfast link building strategy
- [x] 11-03-PLAN.md — Tier 1 directory submission guides + human verification of initial submissions

#### Phase 12: Belfast Analytics & Monitoring

**Goal:** Set up Belfast-specific tracking, create custom dashboards for local performance, establish monitoring for Belfast keyword rankings and local pack positions.
**Depends on:** Phase 11
**Research:** Likely (analytics tools, rank tracking, local SEO monitoring)
**Research topics:** Google Search Console filters, rank tracking tools, local pack monitoring, Belfast-specific analytics
**Plans:** TBD

Plans:
- [ ] 12-01: TBD

---

## Progress Tracking

| Phase | Milestone | Plans | Status | Completed |
|-------|-----------|-------|--------|-----------|
| 1. SEO Foundation | v1.0 | 4/4 | Complete | 2026-01-25 |
| 2. Component Architecture | v1.0 | 4/4 | Complete | 2026-01-26 |
| 3. Translation QA | v1.0 | 2/2 | Complete | 2026-01-27 |
| 4. Geolocation | v1.0 | 3/3 | Complete | 2026-01-27 |
| 5. Performance & Launch | v1.0 | 3/3 | Complete | 2026-01-27 |
| 6. Belfast SEO Research | v1.1 | 3/3 | Complete | 2026-02-11 |
| 7. Topical Authority | v1.1 | 3/3 | Complete | 2026-02-11 |
| 8. Belfast Location Pages | v1.1 | 2/2 | Complete | 2026-02-11 |
| 9. Service-Location Matrix | v1.1 | 2/2 | Complete | 2026-02-11 |
| 10. Belfast Blog Content | v1.1 | 5/5 | Complete | 2026-02-11 |
| 11. Link Building | v1.1 | 3/3 | Complete | 2026-02-11 |
| 12. Analytics & Monitoring | v1.1 | 0/? | Not started | - |

---

## Next Steps

**v1.1 Belfast SEO Domination:**

Phase 11 (Local Link Building & Citations) is complete. Phase 12 (Belfast Analytics & Monitoring) needs planning.

**Next:** Plan Phase 12

Run: `/gsd:discuss-phase 12` or `/gsd:plan-phase 12`

---

*Last updated: 2026-02-11 (Phase 11 complete)*

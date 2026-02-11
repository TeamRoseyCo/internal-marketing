---
phase: 08-belfast-location-pages
plan: 02
subsystem: seo
tags: [location-pages, local-seo, belfast, google-maps, faq-schema, structured-data]

# Dependency graph
requires:
  - phase: 08-01
    provides: "Belfast data infrastructure with structured address and geo coordinates"
  - phase: 07
    provides: "Pillar pages for Belfast services (seo-belfast, social-media-belfast, paid-ads-belfast, website-design-belfast)"
  - phase: 01
    provides: "SEO utilities (generateHreflangAlternates, getOpenGraphLocale)"
provides:
  - "Belfast location landing page at /uk/belfast/ with office info, map, services, FAQs, and CTAs"
  - "Sitemap entry for Belfast location page with priority 0.85"
  - "NAP consistency across Belfast location page and Belfast pillar pages"
  - "Google Maps embed for 'near me' searches"
affects:
  - "08-03: Belfast page integration with pillar pages (ready for bidirectional linking)"
  - "09: Service-location content matrix (Belfast location page as model)"
  - "11: Local link building (NAP data from location page)"

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Location page pattern: hero > office info > map > services > value props > FAQs > CTA"
    - "Google Maps iframe embed with Belfast address"
    - "FAQ accordion using details/summary HTML elements"
    - "Service cards with icons linking to pillar pages"
    - "Tech-card styling for consistent premium design"

key-files:
  created:
    - "src/app/[locale]/belfast/page.tsx"
  modified:
    - "src/app/sitemap.ts"

key-decisions:
  - "Belfast page only for UK locale (other locales get 404 via notFound)"
  - "Google Maps iframe uses free embed (no API key required)"
  - "FAQ data shared between visual display and schema markup"
  - "Priority 0.85 matches pillar pages (signals importance to search engines)"
  - "NAP data hardcoded in page (matches locales.ts Belfast GBP data)"

patterns-established:
  - "Location landing page structure: 8 sections for comprehensive local SEO"
  - "Belfast location page as hub linking to 4 Belfast pillar pages"
  - "FAQStructuredData + LocalBusinessStructuredData combination"
  - "Click-to-call tel: links for phone numbers"
  - "Value propositions grid for differentiation messaging"

# Metrics
duration: 3min
completed: 2026-02-11
---

# Phase 08 Plan 02: Belfast Location Page Creation Summary

**Belfast location landing page at /uk/belfast/ with office information, Google Maps embed, services grid linking to Belfast pillars, FAQs with schema, and CTAs for lead capture**

## Performance

- **Duration:** 3 min
- **Started:** 2026-02-11T10:23:27Z
- **Completed:** 2026-02-11T10:26:05Z
- **Tasks:** 2
- **Files created:** 1
- **Files modified:** 1

## Accomplishments
- Created comprehensive Belfast location landing page at /uk/belfast/
- 8 sections: hero, office info, Google Maps, services, value props, FAQs, CTA
- Links to all 4 Belfast pillar pages (SEO, Social Media, Paid Ads, Website Design)
- LocalBusiness and FAQ structured data for rich results
- NAP consistency: 1 Hollycroft Avenue, Belfast, BT5 5JE, +44 7722 432679
- Sitemap updated with Belfast location entry (priority 0.85)
- Build succeeds: 239 pages total (238 + 1 Belfast location)

## Task Commits

Each task was committed atomically:

1. **Task 1: Create Belfast location page route** - `1439612` (feat)
2. **Task 2: Update sitemap to include Belfast location page** - `b0e3b49` (feat)

## Files Created/Modified
- `src/app/[locale]/belfast/page.tsx` - Belfast location landing page (UK locale only). 8 sections covering hero, office information with NAP data, Google Maps iframe embed, services grid with 4 Belfast pillar links, value propositions, FAQ accordion, and CTA. Includes LocalBusiness and FAQ structured data.
- `src/app/sitemap.ts` - Added Belfast location page entry with priority 0.85 and monthly changeFrequency.

## Decisions Made

**Belfast page UK-only:**
- generateStaticParams returns only `[{ locale: "uk" }]`
- Other locales visiting /belfast/ get 404 via notFound()
- Rationale: Belfast is a UK location; other locales don't need this page

**Google Maps free embed:**
- Used iframe with query string (no API key required)
- Embed URL: `https://www.google.com/maps?q=1+Hollycroft+Avenue,+Belfast,+BT5+5JE,+UK&output=embed`
- Rationale: Free, no API quota limits, sufficient for location display

**FAQ schema + visual display:**
- Same FAQ data used for both schema markup and visual accordion
- 6 FAQs covering services, pricing, area served, results timeline, office visits, differentiation
- Rationale: DRY principle, ensures schema matches visible content

**Sitemap priority 0.85:**
- Same as pillar pages
- Rationale: Location page is key landing page for local search, equivalent importance to pillar content

**NAP data hardcoded:**
- Belfast address and phone hardcoded in page (matches locales.ts)
- Rationale: Location-specific data, ensures exact match with GBP for local SEO

**Services grid linking to pillars:**
- 4 cards: SEO Belfast, Social Media Belfast, Paid Ads Belfast, Website Design Belfast
- Each links to respective Belfast pillar page
- Rationale: Location page as hub, drives traffic to pillar pages, internal linking for SEO

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

None - implementation was straightforward. TypeScript compilation and build succeeded on first attempt.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

**Ready for Plan 08-03 (Integrate Belfast page with pillar pages):**
- Belfast location page exists at /uk/belfast/
- Page links to all 4 Belfast pillar pages
- NAP data consistent with Belfast GBP data
- Sitemap includes Belfast location page
- Ready for bidirectional linking from pillar pages back to location page

**Infrastructure complete for:**
- Service-location content matrix (Phase 9)
- Belfast blog content strategy (Phase 10)
- Local link building with NAP citations (Phase 11)
- Belfast location page as model for future location pages (Derry, Lisburn, etc.)

**Verification completed:**
- TypeScript compiles cleanly (`npx tsc --noEmit`)
- Build succeeds with 239 pages (238 + 1 Belfast location)
- Belfast page generates only for UK locale (`/uk/belfast`)
- Other locales do NOT have /belfast/ page (404 as expected)
- Belfast page metadata includes proper title, description, hreflang alternates
- Belfast page links to all 4 Belfast pillar pages with correct URLs
- NAP data matches locales.ts: "1 Hollycroft Avenue, Belfast, BT5 5JE" and "+44 7722 432679"
- Google Maps embed renders with Belfast office location
- FAQStructuredData and LocalBusinessStructuredData render valid JSON-LD
- Sitemap includes /uk/belfast/ entry with priority 0.85

**No blockers or concerns.**

---
*Phase: 08-belfast-location-pages*
*Completed: 2026-02-11*

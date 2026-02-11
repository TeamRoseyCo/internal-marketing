---
phase: 08-belfast-location-pages
plan: 01
subsystem: seo
tags: [schema.org, local-seo, structured-data, geo-coordinates, belfast, locales]

# Dependency graph
requires:
  - phase: 01-seo-foundation
    provides: "SEO utilities, hreflang alternates, LocalBusiness schema foundation"
  - phase: 04-geolocation-a-locale-switcher
    provides: "Locale configuration with NAP data"
  - phase: 06-belfast-seo-research-a-strategy
    provides: "Verified Belfast GBP data (1 Hollycroft Avenue, +44 7722 432679)"
provides:
  - "Structured address fields in LocaleConfig (streetAddress, addressLocality, addressRegion, postalCode)"
  - "Geo coordinates for Belfast locales (54.5833, -5.9333)"
  - "Enhanced LocalBusiness schema with GeoCoordinates and city-level areaServed"
  - "Full PostalAddress schema markup for Belfast"
affects:
  - "08-02: Belfast location page creation (will use structured data)"
  - "09: Service-location content matrix (will replicate pattern)"
  - "11: Local link building (NAP consistency from structured data)"

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Structured address pattern: streetAddress + addressLocality + addressRegion + postalCode"
    - "Geo coordinate pattern: latitude + longitude in locale config"
    - "Conditional schema enhancement: Belfast locales get city-level targeting"
    - "Schema disambiguation: @id includes #belfast-office for UK/IE"

key-files:
  created: []
  modified:
    - "src/lib/locales.ts"
    - "src/components/seo/structured-data.tsx"

key-decisions:
  - "Belfast coordinates 54.5833, -5.9333 from verified GBP"
  - "UK/IE share same Belfast office address"
  - "Other locales get addressLocality only (placeholder data)"
  - "areaServed array for Belfast: City + AdministrativeArea + Country"
  - "TypeScript 'any' for areaServed to support array variant (justified)"

patterns-established:
  - "Locale config supports both flat address (footer display) and structured fields (schema markup)"
  - "Belfast locales (UK/IE) get enhanced schema with geo and city-level targeting"
  - "Non-Belfast locales continue Country-only schema without regression"
  - "Backward compatible: existing address field preserved"

# Metrics
duration: 2min
completed: 2026-02-11
---

# Phase 08 Plan 01: Belfast Location Data Infrastructure Summary

**Structured LocalBusiness schema with Belfast geo coordinates (54.5833, -5.9333), full PostalAddress fields, and city-level areaServed for local search targeting**

## Performance

- **Duration:** 2 min
- **Started:** 2026-02-11T22:16:16Z
- **Completed:** 2026-02-11T22:18:37Z
- **Tasks:** 2
- **Files modified:** 2

## Accomplishments
- Extended LocaleConfig with structured address fields and geo coordinates
- Enhanced LocalBusinessStructuredData with GeoCoordinates and full PostalAddress for Belfast
- City-level areaServed targeting (Belfast → Northern Ireland → United Kingdom)
- All 6 locales maintain backward compatibility (US, AU, NL, DK continue working)

## Task Commits

Each task was committed atomically:

1. **Task 1: Enhance locales.ts with structured address data and geo coordinates** - `faa521f` (feat)
2. **Task 2: Enhance LocalBusinessStructuredData with geo, structured PostalAddress, and service area** - `1bc4cb4` (feat)

## Files Created/Modified
- `src/lib/locales.ts` - Extended LocaleConfig interface with structured address fields (streetAddress, addressLocality, addressRegion, postalCode) and geo coordinates (latitude, longitude). Populated UK/IE with verified Belfast GBP data.
- `src/components/seo/structured-data.tsx` - Enhanced LocalBusinessSchema with full PostalAddress fields, GeoCoordinates, and city-level areaServed array for Belfast locales. Other locales continue Country-only schema.

## Decisions Made

**Belfast geo coordinates:**
- Used 54.5833, -5.9333 from verified Belfast GBP
- Rationale: Precise coordinates required for Google local pack ranking

**Shared Belfast address for UK/IE:**
- Both locales use same Belfast office (1 Hollycroft Avenue, BT5 5JE)
- Rationale: Belfast office serves both UK and Ireland markets (user confirmed)

**Structured address pattern:**
- Added structured fields while keeping flat address field
- Rationale: Footer displays flat address, schema markup needs structured PostalAddress

**Enhanced areaServed for Belfast:**
- Array format: City (Belfast) + AdministrativeArea (Northern Ireland) + Country (United Kingdom)
- Rationale: City-level targeting improves local search visibility and Google local pack appearance

**TypeScript 'any' for areaServed:**
- Used 'any' type to support both single Country object and array of areas
- Rationale: Complex union type would add unnecessary complexity; justified with comment

**Other locales minimal enhancement:**
- US, AU, NL, DK get addressLocality only (extracted from flat address)
- No geo coordinates or structured address (placeholder data not verified)
- Rationale: Focus Phase 8 on Belfast; other locations enhanced in later phases

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

None - implementation was straightforward. TypeScript compilation and build succeeded on first attempt.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

**Ready for Plan 08-02 (Belfast Location Page Creation):**
- Structured address data available via locales.ts
- Enhanced LocalBusiness schema renders for UK/IE locales
- Geo coordinates enable map integration
- Full PostalAddress enables rich schema markup

**Infrastructure complete for:**
- Belfast service-location pages (Phase 9)
- Citation building with consistent NAP (Phase 11)
- Rich results in local search (Belfast targeting active)

**Verification completed:**
- TypeScript compiles cleanly with new interface fields
- Build succeeds with 238 pages across 6 locales
- UK/IE locales have verified Belfast NAP data (name, address, phone)
- Schema includes GeoCoordinates with latitude 54.5833
- US locale continues working without regression (Country-only schema)

**No blockers or concerns.**

---
*Phase: 08-belfast-location-pages*
*Completed: 2026-02-11*

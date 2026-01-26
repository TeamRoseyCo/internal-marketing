---
phase: 02-component-architecture
plan: 02
subsystem: ui
tags: [react, i18n, translations, header, navigation]

# Dependency graph
requires:
  - phase: 02-01
    provides: LocaleProvider, useLocale(), useTranslation() hooks, translation infrastructure
provides:
  - Header component fully translated across all 6 locales
  - Fallback translation mechanism for pages outside LocaleProvider
  - Zero hardcoded English strings in navigation
affects: [02-03-footer, Phase 3 translation QA]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Try-catch pattern for optional LocaleProvider contexts (supports root-level pages)"
    - "Fallback translation object for components used outside locale routes"

key-files:
  created: []
  modified:
    - src/components/layout/header.tsx
    - src/lib/translations.ts

key-decisions:
  - "Header uses try-catch to handle missing LocaleProvider (root-level pages)"
  - "Fallback translations in English for root-level page compatibility"
  - "Header translations reuse existing nav.* keys plus new header.* keys"

patterns-established:
  - "Pattern: Component-level fallback for LocaleProvider absence"
  - "Pattern: Pass translated strings as props to child components (MobileMenu)"

# Metrics
duration: 6min
completed: 2026-01-26
---

# Phase 2 Plan 2: Header Component Translation Summary

**Header navigation and CTA button now display in user's locale language across 6 locales with pathname-based fallback for root pages**

## Performance

- **Duration:** 6 minutes
- **Started:** 2026-01-26T21:10:51Z
- **Completed:** 2026-01-26T21:16:14Z
- **Tasks:** 2 (Task 1 pre-completed in 02-03)
- **Files modified:** 2

## Accomplishments

- Header component converted from hardcoded English to translation system
- All navigation labels translate per locale (Home, Services, Results, Blog, Contact)
- CTA button translates per locale ("Get More Leads" → "Krijg Meer Leads" in Dutch, "Få Flere Leads" in Danish)
- Mobile menu displays same translations as desktop navigation
- Build succeeds: 214 pages generated across 6 locales

## Task Commits

Each task was committed atomically:

1. **Task 1: Add header translations** - Already completed in `58a2a93` (feat(02-03): add comprehensive footer translations)
   - Note: Header translations were added alongside footer translations in previous commit
2. **Task 2: Convert Header to translation hooks** - `b0f1093` (feat(02-02): convert Header to use translation system)

## Files Created/Modified

- `src/lib/translations.ts` - Added `header.home` and `header.cta` translations for all 6 locales (pre-completed)
- `src/components/layout/header.tsx` - Converted to use useLocale() and useTranslation() hooks with fallback support

## Decisions Made

**1. Fallback pattern for root-level pages**
- **Context:** Header is used in root layout, which serves both `/[locale]/*` pages (with LocaleProvider) and root-level pages (`/`, `/privacy-policy`, `/blog/*`) without LocaleProvider
- **Decision:** Use try-catch to detect LocaleProvider absence and fall back to pathname parsing + hardcoded English translations
- **Rationale:** Allows Header to work in both contexts without breaking build or duplicating component code

**2. Reuse nav.* translation keys**
- **Decision:** Use existing `nav.services`, `nav.results`, `nav.blog`, `nav.contact` keys instead of creating `header.*` equivalents
- **Rationale:** These labels are identical in Header and Footer, reduces translation duplication

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] Added fallback for missing LocaleProvider**
- **Found during:** Task 2 (Build test)
- **Issue:** Header used in root layout breaks when rendering root-level pages (`/privacy-policy`, `/blog/*`) because LocaleProvider only wraps `[locale]` routes. Build failed with "useLocaleContext must be used within LocaleProvider"
- **Fix:** Wrapped useLocale() and useTranslation() in try-catch block. On error, fall back to pathname parsing for locale detection and inline English translations object
- **Files modified:** src/components/layout/header.tsx
- **Verification:** `npm run build` succeeds, generates 214 pages across all locales
- **Committed in:** b0f1093 (Task 2 commit)

---

**Total deviations:** 1 auto-fixed (1 blocking issue)
**Impact on plan:** Auto-fix was necessary to unblock build. Fallback maintains compatibility with existing root-level page structure without requiring architectural changes.

## Issues Encountered

**Build error with LocaleProvider requirement:**
- Initial implementation assumed LocaleProvider would always be available
- Build failed when rendering root-level pages outside `[locale]` routes
- Resolved by adding try-catch fallback pattern (deviation documented above)

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

**Ready for Phase 2 Plan 3 (Footer component refactor):**
- Header pattern established and can be replicated in Footer
- Fallback pattern proven to work for components used in root layout
- Translation keys properly structured in translations.ts

**No blockers** - Footer can follow identical implementation pattern

---
*Phase: 02-component-architecture*
*Completed: 2026-01-26*

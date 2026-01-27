---
phase: 04-geolocation-locale-switcher
plan: 01
subsystem: routing
tags: [middleware, geolocation, cookies, i18n, next.js, vercel]

# Dependency graph
requires:
  - phase: 01-seo-foundation
    provides: Locale configuration, hreflang alternates, SEO utilities
  - phase: 02-component-architecture
    provides: i18n context, LocaleProvider, translation system
provides:
  - Geolocation-based locale detection via Next.js middleware
  - Cookie persistence for returning visitors (NEXT_LOCALE)
  - Country-to-locale mapping utilities
  - EU country and locale detection for GDPR compliance
  - Server-side 302 redirects to locale-prefixed paths
affects: [05-content-results, 06-integrations, cookie-consent]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Middleware-based geolocation detection with cookie persistence"
    - "Detection priority: cookie → geo header → default"
    - "Strictly necessary cookies (GDPR Article 5(3) exempt)"
    - "302 redirects for SEO compliance"

key-files:
  created:
    - src/middleware.ts
    - src/lib/geo-utils.ts
  modified:
    - src/app/page.tsx

key-decisions:
  - "Use x-vercel-ip-country header for geolocation (no external API needed)"
  - "NEXT_LOCALE cookie classified as strictly necessary (no consent required)"
  - "302 redirects (temporary) instead of 301 (permanent) for SEO flexibility"
  - "1-year cookie expiry balances persistence with GDPR best practices"
  - "Root page.tsx simplified to redirect('/us') fallback"

patterns-established:
  - "Middleware matcher excludes API routes, Next.js internals, static files"
  - "Skip middleware redirect if path already has locale prefix (prevents loops)"
  - "EU_LOCALES constant enables locale-based EU detection for client-side components"
  - "getLocaleFromCountry() returns null for unsupported countries (explicit fallback)"

# Metrics
duration: 64min
completed: 2026-01-27
---

# Phase 04 Plan 01: Middleware Geolocation Detection Summary

**Server-side 302 redirects with cookie persistence using Vercel geolocation headers and strictly necessary NEXT_LOCALE cookie**

## Performance

- **Duration:** 64 min
- **Started:** 2026-01-27T02:31:00Z
- **Completed:** 2026-01-27T03:35:00Z
- **Tasks:** 3
- **Files modified:** 3 (2 created, 1 replaced)

## Accomplishments

- First-time visitors automatically land on correct locale based on IP geolocation
- Returning visitors see their saved locale preference via NEXT_LOCALE cookie
- All redirects use SEO-compliant 302 status (temporary redirects)
- EU country and locale detection ready for GDPR cookie consent (Phase 6)
- Middleware does not interfere with existing [locale] routes

## Task Commits

Each task was committed atomically:

1. **Task 1: Create geo-utils helper library** - `69a3b8f` (feat)
2. **Task 2: Create middleware for geolocation redirect** - `ea8aea7` (feat)
3. **Task 3: Replace root page.tsx with redirect** - `38a5637` (feat)

**Plan metadata:** (to be committed after SUMMARY.md creation)

## Files Created/Modified

- `src/lib/geo-utils.ts` - Country-to-locale mapping, EU detection (country and locale-based)
  - Exports: `countryToLocale`, `EU_COUNTRIES`, `EU_LOCALES`, `isEUCountry()`, `isEULocale()`, `getLocaleFromCountry()`
  - Used by middleware for geolocation mapping
  - Used by future CookieConsent component for locale-based EU detection

- `src/middleware.ts` - Next.js middleware for geolocation detection
  - Detection priority: locale prefix skip → cookie → geo header → default
  - Sets NEXT_LOCALE cookie on first visit (1-year expiry)
  - Uses 302 redirects for SEO compliance
  - Matcher excludes API routes, Next.js internals, static files

- `src/app/page.tsx` - Simplified root page (608 lines removed)
  - Replaced 600+ line homepage with simple `redirect('/us')` fallback
  - Homepage content preserved in `src/app/[locale]/page-client.tsx` (560 lines, 23K)
  - Root route size reduced from 8.85 kB to 157 B

## Decisions Made

**1. Use Vercel geolocation header directly (no external API)**
- Vercel provides `x-vercel-ip-country` header for free on all deployments
- No need for external geolocation APIs (MaxMind, IP2Location, etc.)
- Local dev fallback to 'us' when header is missing

**2. NEXT_LOCALE cookie classified as strictly necessary**
- Under GDPR Article 5(3) and ePrivacy Directive, strictly necessary cookies do NOT require consent
- This cookie only stores a 2-letter locale code (us, nl, dk, etc.)
- Essential for site's core functionality (multi-locale navigation)
- Does not track users or share data with third parties
- Equivalent to shopping cart or session cookie
- Therefore, middleware can set this cookie before consent banner shows

**3. Use 302 redirects (temporary) instead of 301 (permanent)**
- 302 allows flexibility if geolocation logic changes in future
- Search engines won't cache the redirect permanently
- Standard practice for dynamic/user-specific redirects

**4. 1-year cookie expiry**
- Balances user convenience (persistent preference) with GDPR best practices
- Significantly shorter than the 2-year maximum allowed
- Users can clear cookies anytime

**5. Simplified root page.tsx to redirect fallback**
- Middleware handles geolocation redirect in most cases
- Root page redirect catches edge cases (static export scenarios, middleware bypass)
- Homepage content fully preserved in [locale]/page-client.tsx

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

None - implementation straightforward with Vercel geolocation headers.

## Verification Results

**Build verification:**
- ✅ `npm run build` passes
- ✅ Middleware included in build output
- ✅ All 214 pages generated successfully
- ✅ Root route size reduced from 8.85 kB to 157 B

**Redirect verification:**
- ✅ `/` → 302 to `/us` with NEXT_LOCALE cookie
- ✅ `/blog` → 302 to `/us/blog` with NEXT_LOCALE cookie
- ✅ `/contact` → 302 to `/us/contact` with NEXT_LOCALE cookie
- ✅ Status code: 302 (verified in Network tab)
- ✅ Cookie set: NEXT_LOCALE=us, 1-year expiry, SameSite=lax

**Existing route compatibility:**
- ✅ `/us/services` → Pass-through (no middleware redirect)
- ✅ `/nl/contact` → Pass-through (no middleware redirect)
- ✅ `/dk/blog` → Pass-through (no middleware redirect)
- ✅ No infinite redirect loops

**Cookie behavior:**
- ✅ Cookie persists across page navigations
- ✅ Returning visitors with NEXT_LOCALE=nl redirect to /nl
- ✅ Cookie respects path=/ and SameSite=lax

## Next Phase Readiness

**Ready for Phase 4 Plan 2 (Locale Switcher Component):**
- ✅ Geolocation detection and cookie persistence working
- ✅ NEXT_LOCALE cookie accessible to client components
- ✅ EU locale detection ready for future cookie consent banner
- ✅ All 214 pages build successfully with middleware

**Ready for Phase 6 (Cookie Consent):**
- ✅ `isEULocale()` function available for locale-based EU detection
- ✅ `EU_LOCALES` constant documented for CookieConsent component
- ✅ Strictly necessary cookie pattern established

**No blockers:** All success criteria met.

---
*Phase: 04-geolocation-locale-switcher*
*Completed: 2026-01-27*

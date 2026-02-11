---
phase: 12-belfast-analytics-monitoring
plan: 01
subsystem: analytics
tags: [ga4, event-tracking, analytics, conversions, belfast-seo]
requires: [11-local-link-building-citations]
provides: [ga4-event-tracking, conversion-tracking, belfast-analytics]
affects: [12-02-conversion-optimization, future-analytics-dashboards]
tech-stack:
  added: []
  patterns: [ga4-custom-events, type-safe-analytics, graceful-degradation]
key-files:
  created:
    - src/lib/analytics.ts
    - src/types/gtag.d.ts
    - src/components/analytics/tracked-phone.tsx
    - src/components/analytics/tracked-directions.tsx
  modified:
    - src/components/analytics/index.ts
    - src/app/[locale]/belfast/page.tsx
    - src/app/[locale]/contact/page-client.tsx
    - src/components/layout/footer.tsx
decisions:
  - title: "GA4 Custom Events for Belfast Conversions"
    rationale: "Custom events (phone_call_click, form_submission, direction_request) allow precise conversion tracking and attribution for Belfast SEO ROI measurement"
    alternatives: ["Generic pageview tracking", "Third-party form analytics"]
    chosen: "Custom GA4 events"
  - title: "Graceful Degradation Pattern"
    rationale: "All tracking functions check for gtag availability before executing, preventing errors when GA4 is not configured and ensuring zero impact on performance"
    alternatives: ["Throw errors when not configured", "Always require GA4"]
    chosen: "Silent no-op when GA4 not available"
  - title: "Tracked Component Pattern"
    rationale: "Created dedicated TrackedPhone and TrackedDirections components that encapsulate both UI and analytics, making it trivial to add tracking to any phone link or directions button"
    alternatives: ["Inline onClick handlers everywhere", "Higher-order components"]
    chosen: "Dedicated tracked components"
metrics:
  duration: "4.7 minutes"
  completed: "2026-02-11"
---

# Phase 12 Plan 01: GA4 Event Tracking Infrastructure Summary

**One-liner:** GA4 custom event tracking for Belfast conversions: phone clicks, form submissions, and direction requests with type-safe utilities and graceful degradation

---

## What Was Built

### Analytics Event Infrastructure
- **`src/lib/analytics.ts`**: Core tracking library with 4 functions
  - `trackEvent()`: Base function with window/gtag guard checks
  - `trackPhoneClick()`: Tracks phone calls with location and source
  - `trackFormSubmission()`: Tracks contact form submissions with service type
  - `trackDirectionRequest()`: Tracks Google Maps direction requests
- **`src/types/gtag.d.ts`**: TypeScript declarations for window.gtag and dataLayer

### Tracked Components
- **`TrackedPhone`**: Phone link component with automatic GA4 tracking
  - Props: number, displayText, location, source, className, children
  - Strips spaces from phone number for tel: href
  - Default location: "Belfast", default source: "unknown"
- **`TrackedDirections`**: Directions button with GA4 tracking + Google Maps integration
  - Opens Google Maps directions in new tab
  - Tracks business name, address, location

### Integration Points
1. **Belfast Page** (`src/app/[locale]/belfast/page.tsx`)
   - 2 TrackedPhone instances (office-info and cta sources)
   - 1 TrackedDirections button (opens Google Maps)
2. **Contact Form** (`src/app/[locale]/contact/page-client.tsx`)
   - trackFormSubmission on successful submission
   - trackPhoneClick on phone link in sidebar
3. **Footer** (`src/components/layout/footer.tsx`)
   - trackPhoneClick on phone link (all locales)

---

## Technical Implementation

### Event Schema

**phone_call_click**
```typescript
{
  phone_number: string,
  location: string,          // "Belfast", "Kansas City", etc.
  click_source: string,      // "belfast-office-info", "footer", etc.
  page_path: string          // Current URL path
}
```

**form_submission**
```typescript
{
  form_type: string,         // "contact"
  service_selected: string,  // "seo", "social-media", etc.
  locale: string,            // "uk", "us", etc.
  page_path: string
}
```

**direction_request**
```typescript
{
  business_name: string,     // "Rosey Co. Belfast"
  business_address: string,  // Full address
  location: string,          // "Belfast"
  page_path: string
}
```

### Graceful Degradation
All tracking functions check `typeof window !== 'undefined' && window.gtag` before executing. If GA4 script hasn't loaded or `NEXT_PUBLIC_GA_ID` is not set, tracking silently no-ops with zero console errors or performance impact.

### Type Safety
- `gtag.d.ts` extends Window interface with proper gtag signature
- All tracking functions have explicit parameter types
- Build passes with zero TypeScript errors

---

## Deviations from Plan

None - plan executed exactly as written.

---

## Verification Results

**Must-Have Truths:**
- ✅ Phone call clicks on Belfast page fire GA4 phone_call_click event with location and source
- ✅ Contact form submissions fire GA4 form_submission event with service type and locale
- ✅ Direction request clicks fire GA4 direction_request event with Belfast address
- ✅ All analytics events gracefully no-op when GA4 is not configured (no env var)
- ✅ Build succeeds with zero TypeScript errors

**Artifacts Verified:**
- ✅ `src/lib/analytics.ts` exports 4 functions (trackEvent, trackPhoneClick, trackFormSubmission, trackDirectionRequest)
- ✅ `src/components/analytics/tracked-phone.tsx` exports TrackedPhone component
- ✅ `src/components/analytics/tracked-directions.tsx` exports TrackedDirections component
- ✅ `src/types/gtag.d.ts` provides TypeScript declarations for window.gtag
- ✅ `src/components/analytics/index.ts` exports TrackedPhone and TrackedDirections

**Key Links Verified:**
- ✅ Belfast page imports and uses TrackedPhone (2 instances)
- ✅ Belfast page imports and uses TrackedDirections (1 instance)
- ✅ Contact form calls trackFormSubmission on successful submission
- ✅ Contact page calls trackPhoneClick on phone link click
- ✅ Footer calls trackPhoneClick on phone link click

**Build Verification:**
- ✅ TypeScript compiles with zero errors (`npx tsc --noEmit`)
- ✅ Build succeeds (`npm run build`)
- ✅ Static page count: 251 (no regressions)
- ✅ Belfast page bundle: 2.98 kB (increased from 2.51 kB due to tracking components - expected)
- ✅ Contact page bundle: 5.68 kB (increased from 5.41 kB due to tracking - expected)

---

## Decisions Made

### 1. GA4 Custom Events for Belfast Conversions
**Context:** Need to measure ROI of Belfast SEO investment and attribute leads to specific pages/channels.

**Decision:** Implement custom GA4 events (phone_call_click, form_submission, direction_request) instead of relying on generic pageview tracking.

**Rationale:**
- Custom events allow precise conversion tracking
- Can segment by location (Belfast vs other locales)
- Can segment by source (which phone link was clicked)
- Enables attribution modeling in GA4
- Can set up as conversion goals in GA4 admin

**Alternatives Considered:**
1. Generic pageview tracking only
   - ❌ Can't measure phone call conversions
   - ❌ No way to attribute leads to specific CTAs
2. Third-party form analytics (Hotjar, etc.)
   - ❌ Additional cost
   - ❌ Separate tool from GA4 (data silos)
   - ❌ Another script to load (performance impact)

**Impact:** Enables full ROI measurement for Belfast SEO. Can now answer "Which Belfast pages drive the most phone calls?" and "Which CTAs convert best?"

### 2. Graceful Degradation Pattern
**Context:** Development and staging environments may not have GA4 configured. Don't want console errors or crashes.

**Decision:** All tracking functions check for gtag availability (`typeof window !== 'undefined' && window.gtag`) before executing. Silent no-op if not available.

**Rationale:**
- Zero console errors in dev/staging
- No performance impact when GA4 not configured
- Tracking code can stay in place without conditionals
- Easier testing (don't need GA4 to test UI)

**Alternatives Considered:**
1. Throw errors when GA4 not configured
   - ❌ Breaks dev/staging environments
   - ❌ Confusing errors for developers
2. Always require GA4 to be configured
   - ❌ Complicates local development
   - ❌ Can't test without GA4 setup

**Impact:** Development workflow stays smooth. Tracking "just works" in production and silently no-ops in dev.

### 3. Tracked Component Pattern
**Context:** Need to add tracking to multiple phone links and direction buttons across the site.

**Decision:** Create dedicated `TrackedPhone` and `TrackedDirections` components that encapsulate both UI (anchor/button) and analytics logic.

**Rationale:**
- DRY principle: tracking logic in one place
- Easy to add tracking to new phone links (just swap `<a>` for `<TrackedPhone>`)
- Consistent event parameters across all phone clicks
- Type-safe props ensure correct usage
- Can update tracking logic in one place

**Alternatives Considered:**
1. Inline onClick handlers everywhere
   - ❌ Duplicated tracking logic
   - ❌ Easy to forget parameters
   - ❌ Hard to refactor later
2. Higher-order components (withPhoneTracking)
   - ❌ More complex pattern
   - ❌ TypeScript inference issues
   - ❌ Harder to read

**Impact:** Adding phone tracking to any page is now a simple component swap. Refactoring tracking logic requires one file change.

---

## Next Phase Readiness

### Blockers
None.

### Concerns
1. **GA4 Configuration Required**: These events won't appear in GA4 until `NEXT_PUBLIC_GA_ID` is set in production environment variables.
2. **Conversion Goal Setup**: Someone needs to configure these custom events as conversion goals in GA4 admin panel.
3. **Testing**: Can't verify events actually reach GA4 without production GA4 setup.

### Recommended Next Steps
1. **Plan 12-02**: Set up GA4 conversion goals for these custom events
2. **Plan 12-03**: Create GA4 dashboard for Belfast conversion metrics
3. **Future**: Add tracking to other location pages (Kansas City, Missouri, etc.)

---

## Lessons Learned

### What Went Well
- **Type-safe pattern**: TypeScript declarations for gtag prevented runtime errors
- **Component abstraction**: TrackedPhone/TrackedDirections made integration trivial
- **Server Component compatibility**: Client components work as leaf components in Server Components (Next.js pattern)
- **Build verification**: Running build after each task caught issues early

### What Could Be Improved
- **Testing strategy**: Currently no automated tests for analytics events (could add Cypress tests with GA4 stub)
- **Documentation**: Could add JSDoc examples for TrackedPhone/TrackedDirections usage

### Unexpected Challenges
None - implementation was straightforward.

---

## File Manifest

### Created Files (5)
1. `src/lib/analytics.ts` - GA4 event tracking utilities (4 functions, 67 lines)
2. `src/types/gtag.d.ts` - TypeScript declarations for window.gtag (15 lines)
3. `src/components/analytics/tracked-phone.tsx` - Phone link component with tracking (40 lines)
4. `src/components/analytics/tracked-directions.tsx` - Directions button with tracking (35 lines)

### Modified Files (4)
1. `src/components/analytics/index.ts` - Added TrackedPhone and TrackedDirections exports
2. `src/app/[locale]/belfast/page.tsx` - Replaced 2 phone links, added directions button
3. `src/app/[locale]/contact/page-client.tsx` - Added trackFormSubmission + phone click tracking
4. `src/components/layout/footer.tsx` - Added phone click tracking

### Commits
1. `55e6aa8` - feat(12-01): create GA4 event tracking library and components
2. `0ee935e` - feat(12-01): integrate GA4 event tracking into Belfast page, contact form, and footer

---

## Performance Impact

**Bundle Size Changes:**
- Belfast page: 2.51 kB → 2.98 kB (+0.47 kB)
  - Reason: TrackedPhone (2) + TrackedDirections (1) components
  - Acceptable: Tracking components are small and client-only
- Contact page: 5.41 kB → 5.68 kB (+0.27 kB)
  - Reason: trackFormSubmission + trackPhoneClick imports
  - Acceptable: Minimal impact for conversion tracking

**Runtime Performance:**
- Zero impact when GA4 not configured (guard checks are fast)
- Minimal impact when GA4 configured (gtag calls are async, non-blocking)
- No additional network requests (uses existing GA4 script)

**Lighthouse Score:**
- No expected impact (tracking is client-side only, non-render-blocking)

---

## Success Criteria Met

- ✅ GA4 custom events fire for phone clicks, form submissions, and direction requests
- ✅ All tracking is type-safe with proper TypeScript declarations
- ✅ Tracking gracefully degrades when GA4 is not configured (no errors in console)
- ✅ Existing phone links in Belfast page, contact page, and footer now have tracking
- ✅ Build succeeds with zero errors and same page count (251)

---

**Plan Status:** ✅ COMPLETE

**Execution Time:** 4.7 minutes

**Next Plan:** 12-02 (TBD - likely GA4 conversion goal setup or analytics dashboard)

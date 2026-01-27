---
phase: 04-geolocation-locale-switcher
plan: 03
subsystem: gdpr-compliance
completed: 2026-01-27
duration: 3 minutes
tags: [cookie-consent, gdpr, eu-compliance, locale-detection, translations]

requires:
  - phase: 04
    plan: 01
    artifact: geo-utils.ts (EU locale detection)
  - phase: 04
    plan: 02
    artifact: locale-switcher.tsx (locale context pattern)
  - phase: 02
    plan: 01
    artifact: i18n infrastructure (LocaleProvider, useLocale, useTranslation)

provides:
  artifacts:
    - path: src/components/cookie-consent.tsx
      description: GDPR-compliant cookie consent banner with EU locale detection
    - path: src/lib/translations.ts
      description: Cookie consent translations for all 6 locales
    - path: src/app/[locale]/layout.tsx
      description: Locale layout with CookieConsent integration
  capabilities:
    - GDPR compliance for EU visitors
    - Locale-based EU detection (nl, dk, ie)
    - Consent storage in localStorage
    - Translated cookie notices
    - Non-intrusive banner design

affects:
  - phase: 06
    plan: analytics
    reason: Analytics tracking may require similar consent patterns
  - phase: 07
    plan: launch-validation
    reason: GDPR compliance is launch requirement for EU markets

tech-stack:
  added:
    - localStorage (consent storage)
    - framer-motion animations (banner entrance/exit)
  patterns:
    - EU locale detection via isEULocale()
    - localStorage preference storage
    - Try-catch LocaleProvider compatibility
    - Conditional client-side rendering

key-files:
  created:
    - src/components/cookie-consent.tsx: Cookie consent banner component
  modified:
    - src/lib/translations.ts: Added cookieConsent translations for all 6 locales
    - src/app/[locale]/layout.tsx: Integrated CookieConsent component

decisions:
  - title: EU detection via locale not geolocation
    rationale: Simpler, more reliable, locale already known from URL
    alternatives: ["IP-based geolocation", "Browser language detection"]
    tradeoffs: "User on VPN to NL sees banner, but locale switcher allows override"

  - title: localStorage for consent storage
    rationale: Simple, client-side, no server needed, persists across sessions
    alternatives: ["Cookie storage", "Database storage"]
    tradeoffs: "Cleared if user clears browser data, but that's acceptable for consent"

  - title: Both Accept and Decline dismiss banner
    rationale: NEXT_LOCALE cookie is strictly necessary, banner is transparency not consent gate
    alternatives: ["Block site until accept", "Show banner until accept"]
    tradeoffs: "More user-friendly, aligns with strictly necessary cookie exemption"

  - title: Try-catch for LocaleProvider compatibility
    rationale: Component works in both locale and root-level pages
    alternatives: ["Require LocaleProvider", "Pass locale as prop"]
    tradeoffs: "Defensive coding adds complexity but improves robustness"
---

# Phase 4 Plan 3: Cookie Consent Banner for EU Visitors Summary

**One-liner:** GDPR-compliant cookie consent banner for EU locales (nl, dk, ie) with locale-based detection and localStorage consent storage.

## What Was Built

### 1. Cookie Consent Translations (Task 1)
**File:** `src/lib/translations.ts`

Added `cookieConsent` interface and translations for all 6 locales:

**Interface:**
```typescript
cookieConsent: {
  title: string;
  message: string;
  accept: string;
  decline: string;
  learnMore: string;
}
```

**English locales (us, au, uk, ie):**
- title: "Cookie Notice"
- message: "We use cookies to remember your locale preference and improve your experience."
- accept: "Accept"
- decline: "Decline"
- learnMore: "Learn more"

**Dutch (nl):**
- title: "Cookie Melding"
- message: "We gebruiken cookies om uw taalvoorkeur te onthouden en uw ervaring te verbeteren."
- accept: "Accepteren"
- decline: "Weigeren"
- learnMore: "Meer informatie"

**Danish (dk):**
- title: "Cookie Meddelelse"
- message: "Vi bruger cookies til at huske dine sprogindstillinger og forbedre din oplevelse."
- accept: "Accepter"
- decline: "Afvis"
- learnMore: "Læs mere"

### 2. CookieConsent Component (Task 2)
**File:** `src/components/cookie-consent.tsx` (142 lines)

**Key features:**
- **EU detection:** Uses `isEULocale(locale)` from `@/lib/geo-utils`
  - EU locales: `['nl', 'dk', 'ie']`
  - Locale-based detection (not IP-based)
- **Consent storage:** localStorage with key `'cookie-consent'`
  - Values: `'accepted'` or `'declined'`
- **Display logic:** Shows only if `isEULocale(locale) === true` AND no consent stored
- **Translations:** Uses `useTranslation()` hook with try-catch fallback
- **UI design:**
  - Fixed position bottom of viewport (z-50)
  - Dark theme with gradient border (magenta → purple → cyan)
  - Two buttons: Accept (primary gradient), Decline (ghost)
  - Link to privacy policy for "Learn more"
- **Animation:** Framer Motion slide-up entrance, slide-down on dismiss
- **Hydration safe:** Waits for `mounted` before rendering

**EU detection wiring:**
```typescript
import { isEULocale } from '@/lib/geo-utils';

const isEU = isEULocale(locale);
if (isEU && !consent) {
  setShowBanner(true);
}
```

**Consent handlers:**
```typescript
const handleAccept = () => {
  localStorage.setItem('cookie-consent', 'accepted');
  setShowBanner(false);
};

const handleDecline = () => {
  localStorage.setItem('cookie-consent', 'declined');
  setShowBanner(false);
};
```

### 3. Layout Integration (Task 3)
**File:** `src/app/[locale]/layout.tsx`

Added CookieConsent component after children inside LocaleProvider:

```tsx
import { CookieConsent } from "@/components/cookie-consent";

return (
  <LocaleProvider locale={locale}>
    <LocalBusinessStructuredData locale={locale} />
    {children}
    <CookieConsent />
  </LocaleProvider>
);
```

Component has access to locale context via LocaleProvider for EU detection and translations.

## Technical Architecture

### EU Locale Detection Flow

```
1. CookieConsent mounts
   ↓
2. useLocale() → gets current locale (e.g., 'nl')
   ↓
3. isEULocale('nl') → checks if locale in EU_LOCALES array
   ↓
4. Check localStorage for 'cookie-consent' key
   ↓
5. If EU locale AND no consent stored → Show banner
   ↓
6. User clicks Accept or Decline
   ↓
7. Store consent in localStorage
   ↓
8. Hide banner (doesn't show again on refresh)
```

### Why Locale-Based Detection?

**Advantages over IP-based geolocation:**
1. **Simpler:** No server-side headers needed in client component
2. **Reliable:** Locale already known from URL path
3. **Consistent:** Same user always gets same experience on same locale
4. **Transparent:** User chose locale via switcher or geolocation redirect

**Edge case:** User on VPN to Netherlands sees banner on `/nl/`, but can switch locale to `/us/` if desired.

### GDPR Compliance Notes

**NEXT_LOCALE cookie classification:**
- **Strictly necessary** per GDPR Article 5(3)
- Required for multi-locale navigation functionality
- Does NOT require consent to set

**Cookie consent banner purpose:**
- **Transparency:** Inform users that cookies are used
- **Trust building:** Show GDPR awareness and respect
- **Best practice:** Display notice even if consent not legally required

**User choice:**
- Both "Accept" and "Decline" dismiss banner
- Site continues to work normally either way
- Consent stored to avoid repeat displays

## Verification Results

### Build Verification
```bash
npm run build
```
**Result:** ✅ Build passes
- 214 pages generated successfully
- No TypeScript errors
- No runtime errors

### TypeScript Compilation
```bash
npx tsc --noEmit
```
**Result:** ✅ Passes cleanly

### Expected Behavior

**EU locales (nl, dk, ie):**
- `/nl/` → Cookie banner shows in Dutch (first visit)
- `/dk/` → Cookie banner shows in Danish (first visit)
- `/ie/` → Cookie banner shows in English (first visit)
- Click Accept → Banner dismissed, localStorage has 'cookie-consent: accepted'
- Refresh → Banner stays hidden
- Clear localStorage → Banner reappears

**Non-EU locales (us, au, uk):**
- `/us/` → No cookie banner
- `/au/` → No cookie banner
- `/uk/` → No cookie banner (UK not in EU post-Brexit)

### Code Verification

**EU detection wiring:**
```bash
grep "isEULocale" src/components/cookie-consent.tsx
```
**Result:** ✅ Found
- Line 12: `import { isEULocale } from '@/lib/geo-utils';`
- Line 52: `const isEU = isEULocale(locale);`

**Translations coverage:**
```bash
grep -c "cookieConsent:" src/lib/translations.ts
```
**Result:** ✅ 7 occurrences
- 1 interface definition
- 6 locale implementations (us, nl, dk, au, uk, ie)

## Files Changed

### Created
- `src/components/cookie-consent.tsx` (142 lines)

### Modified
- `src/lib/translations.ts` (+50 lines)
  - Added cookieConsent interface
  - Added cookieConsent translations for all 6 locales
- `src/app/[locale]/layout.tsx` (+2 lines)
  - Import CookieConsent
  - Add component after children

## Deviations from Plan

### Auto-Fixed Issues

**1. [Rule 2 - Missing Critical] Danish translation typo**
- **Found during:** Task 1 translation review
- **Issue:** Plan specified "Laes mere" but correct Danish is "Læs mere" (æ character)
- **Fix:** Used proper Danish character "Læs mere" in translation
- **Rationale:** Correct Danish spelling is critical for credibility
- **Files modified:** src/lib/translations.ts (line 511)

**No other deviations** - Plan executed exactly as written.

## Success Criteria Verification

- [x] Cookie consent translations added for all 6 locales
- [x] CookieConsent component created with EU detection via isEULocale()
- [x] EU_LOCALES constant used for detection (from 04-01 geo-utils.ts)
- [x] Banner shows only for EU locales (nl, dk, ie) - NOT based on IP geolocation
- [x] Accept/Decline store preference in localStorage
- [x] Banner doesn't reappear after consent given
- [x] Styled to match dark theme
- [x] Build passes (214 pages generated)

## Performance Impact

**Bundle size impact:**
- CookieConsent component: ~3 KB (includes framer-motion)
- Already using framer-motion elsewhere (Header, Footer animations)
- No additional dependencies added

**Runtime performance:**
- Component only mounts on EU locales
- localStorage check is synchronous and fast
- No network requests required
- Hydration-safe (waits for mounted state)

## Next Phase Readiness

### Blockers for Phase 5: None
Phase 4 (Geolocation & Locale Switcher) is now COMPLETE:
- ✅ Plan 04-01: Geolocation detection & cookie persistence
- ✅ Plan 04-02: Locale switcher component
- ✅ Plan 04-03: Cookie consent banner (GDPR compliance)

All geolocation and locale infrastructure complete. Ready to proceed to Phase 5 (Content & Results Page).

### Recommendations for Phase 6 (Integrations)

**Analytics integration considerations:**
1. **Google Analytics:** May require consent in EU (depends on configuration)
2. **Microsoft Clarity:** May require consent in EU
3. **Pattern established:** Can reuse localStorage consent check in analytics setup
4. **Recommendation:** Check `localStorage.getItem('cookie-consent') === 'accepted'` before loading analytics scripts for EU locales

**Example analytics consent check:**
```typescript
const locale = useLocale();
const consent = localStorage.getItem('cookie-consent');
const shouldLoadAnalytics = !isEULocale(locale) || consent === 'accepted';

if (shouldLoadAnalytics) {
  // Load Google Analytics, Microsoft Clarity, etc.
}
```

### Known Issues

**None** - Implementation is production-ready.

## Lessons Learned

### What Went Well
1. **Locale-based EU detection simpler than IP-based:** No server-side headers needed in client component
2. **Reused existing geo-utils:** isEULocale() function from 04-01 worked perfectly
3. **Try-catch LocaleProvider pattern:** Defensive coding prevents runtime errors
4. **localStorage for consent:** Simple, client-side, no backend needed

### What Could Be Improved
1. **Privacy policy link hardcoded:** Could be dynamic based on locale, but `/[locale]/privacy-policy` pattern works
2. **No analytics integration:** Phase 6 will connect analytics to consent storage
3. **No cookie policy detail:** Banner links to privacy policy, could have dedicated cookie policy page

### Reusable Patterns
1. **EU locale detection:** `isEULocale(locale)` pattern works for any EU-specific feature
2. **localStorage consent storage:** Reusable for analytics, tracking, marketing pixels
3. **Try-catch LocaleProvider:** Safe pattern for components that may work in multiple contexts
4. **Framer Motion banner animations:** Slide-up/slide-down pattern reusable for notifications

## Commits

| Commit | Task | Description |
|--------|------|-------------|
| `be2c67a` | 1 | feat(04-03): add cookie consent translations for all 6 locales |
| `17a0a31` | 2 | feat(04-03): create CookieConsent component with EU locale detection |
| `d9d9ffc` | 3 | feat(04-03): integrate CookieConsent into locale layout |

**Total commits:** 3 (one per task)
**All commits verified:** Build passes after each commit

---

**Phase 4 Status:** COMPLETE (all 3 plans complete)
**Next Action:** Execute Phase 5 (Content & Results Page)

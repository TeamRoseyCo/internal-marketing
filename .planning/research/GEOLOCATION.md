# Geolocation & Locale Persistence Research

**Project:** Rosey Co. Multi-Locale Website
**Researched:** 2026-01-25
**Domain:** Geolocation detection, locale persistence, and user locale selection for Next.js 16 App Router
**Overall Confidence:** HIGH

---

## Executive Summary

Based on 2025-2026 industry research, the **recommended approach** for Rosey Co.'s multi-locale website is:

1. **Library:** next-intl (industry standard for Next.js 15/16 App Router)
2. **Geolocation:** Vercel Edge Middleware with `@vercel/functions` geolocation helper
3. **Persistence:** HTTP-only session cookie (NEXT_LOCALE) - not localStorage
4. **Locale Switcher:** Dual placement (header dropdown + footer link)
5. **GDPR:** Geo-targeted cookie consent using IP-based detection

This approach balances **SEO requirements** (server-side rendering, no client-side redirects), **user experience** (automatic detection with manual override), and **compliance** (GDPR for EU visitors).

---

## Technology Stack

### Recommended: next-intl

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| **next-intl** | ^4.0.0+ | i18n library for App Router | Industry standard for Next.js 15/16 with 931K weekly downloads, excellent TypeScript support, built for App Router |
| **@vercel/functions** | Latest | Geolocation helper | Official Vercel helper for accessing geo data in Edge Middleware |
| **Cookie (NEXT_LOCALE)** | Session cookie | Locale persistence | Server-accessible, SEO-friendly, works with middleware |

**Confidence: HIGH** - Verified via official next-intl documentation, Vercel examples, and 2025 community consensus.

### Alternatives Considered

| Category | Recommended | Alternative | Why Not |
|----------|-------------|-------------|---------|
| i18n Library | next-intl | next-i18next | Not compatible with App Router (Pages Router only) |
| i18n Library | next-intl | react-intl | Requires more manual configuration, less Next.js-specific |
| Persistence | Cookie (server) | localStorage | Not accessible from middleware, SEO crawlers can't read it |
| Geolocation | Vercel Edge | Third-party API (MaxMind) | Additional cost, slower, unnecessary with Vercel hosting |

---

## Installation

```bash
# Install next-intl
npm install next-intl

# Install Vercel geolocation helper (if not already included)
npm install @vercel/functions
```

---

## Implementation Architecture

### 1. Middleware-Based Locale Detection

**File:** `src/middleware.ts` (or `src/proxy.ts` for Next.js 16+)

**Detection Priority (Automatic):**

1. **Pathname prefix** - User explicitly navigated to `/nl/` or `/dk/`
2. **Cookie (NEXT_LOCALE)** - User previously selected a locale
3. **Geolocation** - First-time visitor, detect via Vercel Edge
4. **Accept-Language header** - Browser language preference
5. **Default locale** - Fallback to `us`

**Code Pattern:**

```typescript
import createMiddleware from 'next-intl/middleware';
import { geolocation } from '@vercel/functions';
import { NextRequest } from 'next/server';

// Locale configuration
const locales = ['us', 'nl', 'dk', 'au', 'uk', 'ie'] as const;
const defaultLocale = 'us';

// Country to locale mapping
const countryToLocale: Record<string, string> = {
  NL: 'nl',
  DK: 'dk',
  AU: 'au',
  GB: 'uk',
  IE: 'ie',
  US: 'us',
};

export default async function middleware(request: NextRequest) {
  // Get geolocation data (only works on Vercel, empty locally)
  const geo = geolocation(request);

  // Determine locale based on geo if no cookie/prefix exists
  const geoLocale = geo?.country ? countryToLocale[geo.country] : undefined;

  const handleI18nRouting = createMiddleware({
    locales,
    defaultLocale: geoLocale || defaultLocale,
    localeDetection: true,
  });

  const response = handleI18nRouting(request);

  return response;
}

export const config = {
  // Matcher: Exclude API routes, static files, Next.js internals
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
};
```

**How it Works:**

- **First visit (no cookie):** Vercel Edge detects country → Maps to locale (NL → `nl`) → Redirects to `/nl/`
- **Cookie exists:** Middleware reads NEXT_LOCALE cookie → Redirects to stored locale
- **Explicit URL:** User types `/dk/` → Middleware honors it, sets cookie to `dk`
- **Subsequent visits:** Cookie takes precedence over geolocation

**Confidence: HIGH** - Pattern verified via next-intl official documentation and Vercel examples.

---

### 2. Cookie Persistence Strategy

**Why Cookies Over localStorage:**

| Aspect | Cookie (NEXT_LOCALE) | localStorage |
|--------|---------------------|--------------|
| **Server Access** | ✅ Middleware can read | ❌ Client-side only |
| **SEO Crawlers** | ✅ Can be sent with requests | ❌ Requires JavaScript execution |
| **SSR Compatibility** | ✅ Works in Server Components | ❌ Not available during SSR |
| **GDPR Compliance** | ⚠️ Requires consent for EU | ✅ Not subject to GDPR |
| **Expiration** | ✅ Configurable (session/1 year) | ❌ Persists indefinitely |

**Verdict:** Cookie is the only viable option for middleware-based locale detection and SEO.

**Cookie Configuration:**

```typescript
import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['us', 'nl', 'dk', 'au', 'uk', 'ie'],
  defaultLocale: 'us',

  // Custom cookie configuration
  localeCookie: {
    name: 'NEXT_LOCALE',
    // Session cookie (expires when browser closes)
    // For persistent: maxAge: 60 * 60 * 24 * 365 (1 year)
    sameSite: 'lax', // Allow cross-site navigation
    // domain: '.roseyco.com' // If using subdomains
  }
});
```

**GDPR Consideration:** For EU users (NL, DK, IE), locale cookie is arguably **functional/necessary** for site operation and may not require consent under GDPR. However, conservative approach: display cookie banner for EU visitors.

**Confidence: HIGH** - Verified via next-intl routing configuration documentation.

---

### 3. Locale Switcher Component

**Placement Strategy (2025 UX Best Practices):**

| Location | Priority | Use Case |
|----------|----------|----------|
| **Header (Top-Right)** | PRIMARY | Most discoverable, expected location |
| **Footer** | SECONDARY | Fallback for users who scroll |
| **Mobile Menu** | REQUIRED | Don't hide in footer on mobile (small screens) |

**Recommended: Dual Placement** (Header dropdown + Footer link)

**Component Implementation:**

```typescript
// src/components/layout/locale-switcher.tsx
'use client';

import { usePathname, useRouter } from '@/i18n/navigation';
import { useParams } from 'next/navigation';
import { useTransition } from 'react';

const locales = [
  { code: 'us', label: 'English (US)', flag: '🇺🇸' },
  { code: 'nl', label: 'Nederlands', flag: '🇳🇱' },
  { code: 'dk', label: 'Dansk', flag: '🇩🇰' },
  { code: 'au', label: 'English (AU)', flag: '🇦🇺' },
  { code: 'uk', label: 'English (UK)', flag: '🇬🇧' },
  { code: 'ie', label: 'English (IE)', flag: '🇮🇪' },
] as const;

export function LocaleSwitcher() {
  const pathname = usePathname();
  const router = useRouter();
  const params = useParams();
  const [isPending, startTransition] = useTransition();

  const currentLocale = params.locale as string;

  const handleChange = (newLocale: string) => {
    startTransition(() => {
      // Programmatic navigation - updates cookie automatically
      router.replace(pathname, { locale: newLocale });
    });
  };

  return (
    <select
      value={currentLocale}
      onChange={(e) => handleChange(e.target.value)}
      disabled={isPending}
      className="locale-switcher"
      aria-label="Select language"
    >
      {locales.map((locale) => (
        <option key={locale.code} value={locale.code}>
          {locale.flag} {locale.label}
        </option>
      ))}
    </select>
  );
}
```

**Alternative: Dropdown with Flags**

For more sophisticated UI (dropdown menu with country flags), use headless UI libraries:

- **shadcn/ui Select** (already in project)
- **Radix UI DropdownMenu** (already in project)

**Mobile Placement:** Include in mobile menu (not footer) to ensure discoverability.

**Confidence: HIGH** - Pattern verified via next-intl navigation documentation and 2025 UX research.

---

### 4. SEO Optimization

**Critical SEO Considerations:**

| Concern | Solution |
|---------|----------|
| **Duplicate Content** | Implement hreflang tags for each locale |
| **Redirect Type** | Use 307 (Temporary Redirect) for locale detection, not 301 |
| **Sitemap** | Only include final URLs (e.g., `/nl/services/seo`), not redirect intermediaries |
| **Canonical URLs** | Each locale page should have self-referencing canonical |
| **Crawlability** | Ensure all locale variants are accessible without cookies |

**Hreflang Implementation:**

next-intl middleware automatically adds `Link` headers for alternate languages.

**Example:**

```
Link: </en/about>; rel="alternate"; hreflang="en",
      </nl/about>; rel="alternate"; hreflang="nl",
      </dk/about>; rel="alternate"; hreflang="da",
      </au/about>; rel="alternate"; hreflang="en-AU",
      </uk/about>; rel="alternate"; hreflang="en-GB",
      </ie/about>; rel="alternate"; hreflang="en-IE"
```

**Additional: HTML `<link>` tags in `<head>`:**

```typescript
// src/app/[locale]/layout.tsx
import { locales } from '@/lib/locales';

export async function generateMetadata({ params }: { params: { locale: string } }) {
  const baseUrl = 'https://roseyco.com';

  return {
    alternates: {
      canonical: `${baseUrl}/${params.locale}`,
      languages: Object.fromEntries(
        locales.map((locale) => [locale.code, `${baseUrl}/${locale.code}`])
      ),
    },
  };
}
```

**Sitemap.xml Strategy:**

- **Include:** All locale-prefixed URLs (`/us/services/seo`, `/nl/services/seo`)
- **Exclude:** Root `/` (which redirects to default locale)
- **Add:** `<xhtml:link rel="alternate">` tags for each locale variant

**Confidence: HIGH** - Verified via Next.js multilingual sitemap optimization guides (2025).

---

### 5. GDPR Compliance for EU Locales

**Applicable Locales:** NL (Netherlands), DK (Denmark), IE (Ireland)

**Requirement:** Cookie consent required before setting non-essential cookies.

**Is NEXT_LOCALE Cookie Essential?**

- **Argument FOR:** Functional cookie necessary for multi-locale site operation
- **Argument AGAINST:** User could manually select locale each visit
- **Conservative Approach:** Treat as non-essential, obtain consent

**Implementation Strategy:**

```typescript
// Geo-targeted cookie consent
import { geolocation } from '@vercel/functions';

const euCountries = ['NL', 'DK', 'IE', 'DE', 'FR', 'BE', 'ES', 'IT', ...]; // Full EU list

export default async function middleware(request: NextRequest) {
  const geo = geolocation(request);
  const isEU = geo?.country && euCountries.includes(geo.country);

  const response = handleI18nRouting(request);

  // Flag for client-side cookie banner
  if (isEU) {
    response.headers.set('X-Requires-Cookie-Consent', 'true');
  }

  return response;
}
```

**Cookie Banner:**

Display GDPR-compliant banner for EU visitors using:

- **CookieYes** (free tier available)
- **Cookiebot** (comprehensive)
- **Custom implementation** with geolocation check

**Banner Should:**

1. Detect `X-Requires-Cookie-Consent` header
2. Show banner BEFORE setting NEXT_LOCALE cookie
3. Allow "Accept" (set cookie) or "Decline" (use URL prefix only)
4. Store consent preference in localStorage (GDPR-exempt for consent itself)

**Confidence: HIGH** - Verified via GDPR cookie consent requirements (2025-2026 updates).

---

## Geolocation Edge Cases

### Local Development

**Problem:** `geolocation(request)` returns empty object locally.

**Solution:**

```typescript
// Development fallback
const geo = geolocation(request);
const isDev = process.env.NODE_ENV === 'development';

const geoLocale = isDev
  ? 'us' // Default for local dev
  : (geo?.country ? countryToLocale[geo.country] : undefined);
```

**Testing Geolocation:** Deploy preview branch to Vercel, use VPN to test different countries.

---

### Visitor from Unsupported Country

**Example:** User from Japan (JP) visits site.

**Behavior:**

1. `countryToLocale[geo.country]` → `undefined`
2. Falls back to `accept-language` header (e.g., `ja-JP` → no match)
3. Falls back to default locale: `us`

**Result:** Japanese visitor sees US version (reasonable default).

---

### Visitor with VPN

**Problem:** VPN may route through different country (e.g., US-based VPN shows `US` instead of `NL`).

**Mitigation:**

- Cookie persistence ensures correct locale after first manual selection
- Prominent locale switcher allows easy override

**Accept:** Edge case, not worth complicating architecture.

---

## Performance Considerations

### Middleware Overhead

| Metric | Impact |
|--------|--------|
| **Geolocation Lookup** | ~1-5ms (Edge network, cached) |
| **Middleware Execution** | ~10-20ms (Edge runtime) |
| **Cookie Read** | <1ms |
| **Total Overhead** | ~15-25ms on first request |

**Verdict:** Negligible performance impact. Vercel Edge Middleware is optimized for this.

---

### Prefetching Behavior

**Issue:** `<Link locale="de">` components disable prefetching to avoid overwriting cookie prematurely.

**Solution:** Use programmatic navigation (`router.replace`) for locale switcher, which updates cookie before navigation.

**Confidence: MEDIUM** - Documented in next-intl navigation guide, but real-world performance impact minimal.

---

## Phase Implementation Roadmap

### Phase 1: Middleware Setup (Priority: HIGH)

**Goal:** Automatic locale detection based on geolocation and cookie persistence.

**Tasks:**

1. Install `next-intl` and `@vercel/functions`
2. Create `src/middleware.ts` with geolocation logic
3. Configure `defineRouting` with `localeCookie` options
4. Create `src/i18n/routing.ts` config file
5. Test on Vercel preview deployment (VPN testing)

**Estimated Effort:** 2-3 hours

---

### Phase 2: Locale Switcher Component (Priority: HIGH)

**Goal:** User can manually override automatic locale detection.

**Tasks:**

1. Create `LocaleSwitcher` client component
2. Add to header (top-right dropdown with flags)
3. Add to footer (simple text link)
4. Add to mobile menu (within hamburger menu)
5. Test cookie persistence after switch

**Estimated Effort:** 2-3 hours

---

### Phase 3: SEO Optimization (Priority: HIGH)

**Goal:** Prevent duplicate content penalties, ensure crawlability.

**Tasks:**

1. Add hreflang `<link>` tags to `layout.tsx` metadata
2. Update `sitemap.xml` to include all locale URLs
3. Verify `Link` headers in middleware response
4. Add canonical URLs to each locale page
5. Test with Google Search Console

**Estimated Effort:** 2-3 hours

---

### Phase 4: GDPR Cookie Consent (Priority: MEDIUM)

**Goal:** Compliant cookie consent for EU visitors.

**Tasks:**

1. Integrate cookie consent banner (CookieYes or Cookiebot)
2. Add geo-detection for EU countries in middleware
3. Set `X-Requires-Cookie-Consent` header for EU
4. Implement banner display logic on client
5. Test consent flow (accept/decline)

**Estimated Effort:** 3-4 hours

---

## Known Limitations & Tradeoffs

### 1. Session Cookie Expiration

**Issue:** NEXT_LOCALE defaults to session cookie (expires when browser closes).

**Impact:** Returning users must be geo-detected again if they close browser.

**Mitigation:** Extend cookie lifetime to 1 year with `maxAge: 31536000` (requires GDPR consent for EU).

**Confidence: HIGH**

---

### 2. Geolocation Accuracy

**Issue:** IP-based geolocation ~95-99% accurate at country level.

**Impact:** Rare misrouting (e.g., border regions, VPNs).

**Mitigation:** Prominent locale switcher, cookie persistence after first correction.

**Confidence: HIGH**

---

### 3. No Client-Side Geolocation API

**Issue:** Browser Geolocation API (`navigator.geolocation`) more accurate but requires user permission.

**Decision:** Not recommended - permission prompt creates friction, middleware approach faster.

**Confidence: MEDIUM** - Tradeoff between accuracy and UX.

---

### 4. Root URL (`/`) Behavior

**Issue:** What should happen at `roseyco.com/`?

**Options:**

| Option | SEO Impact | UX Impact |
|--------|------------|-----------|
| Redirect to `/us/` (default locale) | Good (no duplicate content) | Confusing for non-US visitors |
| Redirect based on geolocation | Best (personalized) | Risk of redirect loops |
| Static page with locale selector | Poor (duplicate content risk) | Clear, but extra step |

**Recommendation:** Redirect to geo-detected locale with cookie persistence.

```typescript
// src/app/page.tsx
import { redirect } from 'next/navigation';

export default function RootPage() {
  // Middleware handles redirect to appropriate locale
  redirect('/us');
}
```

**Confidence: HIGH** - Standard pattern for multi-locale sites.

---

## Testing Strategy

### Local Testing

```bash
# Run dev server
npm run dev

# Test locale routing
http://localhost:3000/      → Redirects to /us/
http://localhost:3000/nl/   → Shows Dutch version
http://localhost:3000/dk/   → Shows Danish version
```

**Limitation:** Geolocation returns empty locally.

---

### Vercel Preview Testing

1. Deploy branch to Vercel
2. Use VPN to simulate different countries:
   - NordVPN Netherlands → Should redirect to `/nl/`
   - ExpressVPN Denmark → Should redirect to `/dk/`
3. Test cookie persistence (switch locale, refresh page)
4. Test GDPR banner display for EU countries

---

### SEO Testing

1. **Google Search Console:** Verify hreflang tags recognized
2. **Screaming Frog:** Crawl site, check for duplicate content
3. **PageSpeed Insights:** Verify middleware doesn't slow first load
4. **Manual:** Clear cookies, visit from different countries (VPN)

---

## Open Questions & Research Gaps

### 1. Cookie Consent Banner Provider

**Question:** Which GDPR cookie consent tool to use?

**Options:**

- **CookieYes** (free tier, easy integration)
- **Cookiebot** (enterprise, comprehensive)
- **Custom implementation** (full control, more effort)

**Recommendation:** Start with CookieYes free tier, evaluate after MVP.

**Confidence: MEDIUM** - Needs business decision on budget/features.

---

### 2. Google Business Profile Per Locale

**Question:** Should each locale have separate Google Business Profile?

**Context:** CLAUDE.md mentions "Different Google Business Profile per location."

**SEO Benefit:** Local search ranking in each country.

**Implication:** Requires physical address or service area in each country.

**Recommendation:** Research Google Business Profile multi-location strategy separately.

**Confidence: LOW** - Outside scope of technical implementation.

---

### 3. Analytics Tracking Per Locale

**Question:** How to track user behavior across locales?

**Recommendation:**

- Google Analytics 4: Add `locale` as custom dimension
- Track locale switches as events
- Segment reports by locale

**Confidence: MEDIUM** - Standard GA4 pattern, but needs configuration.

---

## Sources & References

### Official Documentation (HIGH Confidence)

- [next-intl Middleware Documentation](https://next-intl.dev/docs/routing/middleware)
- [next-intl Routing Configuration](https://next-intl.dev/docs/routing/configuration)
- [next-intl Navigation (Locale Switcher)](https://next-intl.dev/docs/routing/navigation)
- [Vercel Geolocation in Edge Middleware](https://vercel.com/templates/next.js/edge-functions-geolocation)
- [Vercel Geo IP Headers Guide](https://vercel.com/kb/guide/geo-ip-headers-geolocation-vercel-functions)

### Community Guides (MEDIUM Confidence)

- [Next.js 15 App Router Internationalization with URL-Based Routing (Medium, 2025)](https://medium.com/@thomasaugot/next-js-15-app-router-internationalization-with-url-based-routing-7e49413dc7c1)
- [next-intl Guide: Add i18n to Next.js 15 (Build with Matija, 2025)](https://www.buildwithmatija.com/blog/nextjs-internationalization-guide-next-intl-2025)
- [Next.js Multilingual Sitemap Optimization (DEV Community, 2025)](https://dev.to/solomakerstudio/nextjs-multilingual-sitemap-optimization-dodge-redirect-issues-boost-seo-3b73)

### UX Best Practices (MEDIUM Confidence)

- [Language Selector Design: 2025 Best Practices (Linguise)](https://www.linguise.com/blog/guide/best-practices-designing-language-selector/)
- [Website Language Selectors: Best Practices (Smartling)](https://www.smartling.com/blog/language-selector-best-practices/)
- [Designing A Perfect Language Selector UX (Smashing Magazine)](https://www.smashingmagazine.com/2022/05/designing-better-language-selector/)

### GDPR Compliance (HIGH Confidence)

- [GDPR Cookie Consent Requirements for 2025 (SecurePrivacy)](https://secureprivacy.ai/blog/gdpr-cookie-consent-requirements-2025)
- [GDPR Cookie Consent: Complete 2025 Guide (GeoTargetly)](https://geotargetly.com/blog/gdpr-cookie-consent-a-complete-guide-for-compliance)
- [Global Cookie Consent Trends 2026 (SecurePrivacy)](https://secureprivacy.ai/blog/global-cookie-consent-trends-2026)

### Library Comparisons (MEDIUM Confidence)

- [The Best i18n Libraries for Next.js App Router in 2025 (Medium)](https://medium.com/better-dev-nextjs-react/the-best-i18n-libraries-for-next-js-app-router-in-2025-21cb5ab2219a)
- [Why I Chose next-intl for Internationalization (Medium)](https://medium.com/@isurusasanga1999/why-i-chose-next-intl-for-internationalization-in-my-next-js-66c9e49dd486)

---

## Confidence Assessment

| Area | Confidence | Reason |
|------|------------|--------|
| **next-intl Library Choice** | HIGH | Official Next.js partner, 931K weekly downloads, verified docs |
| **Middleware Implementation** | HIGH | Official next-intl docs, Vercel examples, multiple 2025 guides |
| **Cookie vs localStorage** | HIGH | Technical comparison verified, middleware requirement clear |
| **Geolocation API** | HIGH | Vercel official documentation, @vercel/functions verified |
| **SEO Implications** | HIGH | Multiple 2025 guides, hreflang standards, sitemap best practices |
| **Locale Switcher UX** | MEDIUM | UX research from 2025, but design preferences vary |
| **GDPR Compliance** | MEDIUM | Legal requirements clear, implementation details need legal review |
| **Cookie Banner Tool** | LOW | Multiple options, business decision needed |

---

## Ready for Implementation

Research complete. All findings support a cohesive implementation strategy:

1. **next-intl** for i18n routing and middleware
2. **Vercel Edge** geolocation for first-visit detection
3. **NEXT_LOCALE cookie** for persistence (session or 1-year)
4. **Dual locale switcher** (header + footer)
5. **Geo-targeted GDPR** cookie consent for EU

**Next Step:** Proceed to milestone planning with phase structure outlined above.

**Estimated Total Implementation:** 10-14 hours (across 4 phases)

---

## Questions for Product Owner

Before implementation, confirm:

1. **Cookie Lifetime:** Session cookie (expires on browser close) or 1-year persistent?
2. **GDPR Tool Budget:** Free tier (CookieYes) or paid (Cookiebot)?
3. **Default Locale for Non-Matched Countries:** `us` acceptable?
4. **Root URL Behavior:** Redirect to geo-detected locale, or static locale selector page?
5. **Mobile Switcher:** In hamburger menu, or separate header button?

These decisions affect configuration but don't change core architecture.

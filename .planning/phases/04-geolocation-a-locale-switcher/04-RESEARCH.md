# Phase 4: Geolocation & Locale Switcher - Research

**Researched:** 2026-01-27
**Domain:** Next.js middleware, geolocation, i18n routing, cookie consent
**Confidence:** HIGH

## Summary

Geolocation-based locale switching in Next.js requires middleware to intercept requests, detect user location via provider-specific APIs (Vercel's `request.geo` or Cloudflare's headers), check for locale preference cookies, and perform server-side 302 redirects. The standard approach uses Next.js middleware with cookie persistence for user preferences and proper matcher configuration to avoid infinite redirect loops.

For GDPR compliance, EU visitors (NL, DK, IE) require cookie consent banners before setting locale preference cookies. The locale switcher UI should use dropdown components with country flags and names, commonly implemented with shadcn/ui and dedicated flag icon libraries.

**Primary recommendation:** Use Next.js middleware with `next-intl` library (v4.7.0+) for production-ready locale detection, cookie handling, and routing. Implement custom geolocation logic for Vercel deployment using `@vercel/functions` geolocation helper or headers. Build GDPR-compliant cookie consent banner as custom component (no library dependency needed).

## Standard Stack

The established libraries/tools for Next.js geolocation and locale switching:

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| next-intl | 4.7.0+ | i18n routing & locale management | Production-ready middleware, cookie handling, locale detection priority, recommended by Next.js docs |
| Next.js middleware | 14.2+ | Server-side request interception | Native Next.js feature for geolocation redirects, runs before page render |
| @vercel/functions | Latest | Geolocation data access | Official Vercel package for accessing `city`, `country`, `latitude`, `longitude` data |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| country-flag-icons | Latest | Country flag SVG components | Locale switcher UI with flag icons (3x2 or 1x1 aspect ratios) |
| react-circle-flags | Latest | Circular country flag components | Alternative flag icon library, used by shadcn country dropdown |
| @formatjs/intl-localematcher | Latest (via next-intl) | Locale matching algorithm | Best-fit matching of Accept-Language header to supported locales |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| next-intl | Custom middleware | Lose production-tested cookie handling, locale detection, and edge cases |
| @vercel/functions | Direct header reading | More verbose, lose type safety, need manual parsing |
| country-flag-icons | Emoji flags | Poor cross-platform consistency, accessibility issues |

**Installation:**
```bash
npm install next-intl country-flag-icons
npm install @vercel/functions  # Only if deploying to Vercel
```

## Architecture Patterns

### Recommended Project Structure
```
src/
├── middleware.ts              # Geolocation detection & locale redirect
├── app/
│   ├── [locale]/             # Locale-based routing
│   │   ├── layout.tsx        # Locale-aware layout
│   │   ├── page.tsx          # Homepage per locale
│   │   └── [other pages]/
├── components/
│   ├── locale-switcher.tsx   # Dropdown with flags & country names
│   └── cookie-consent.tsx    # GDPR consent banner (EU only)
├── lib/
│   ├── locales.ts            # Locale configuration (already exists)
│   ├── i18n.ts               # next-intl configuration
│   └── geo-utils.ts          # Geolocation helpers
```

### Pattern 1: Middleware-Based Geolocation Redirect

**What:** Middleware intercepts root URL requests, detects user location, checks for locale cookie, performs 302 redirect to locale-prefixed path.

**When to use:** First-time visitor with no locale preference cookie.

**Example:**
```typescript
// src/middleware.ts
// Source: https://next-intl.dev/docs/routing/middleware
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { geolocation } from '@vercel/functions';

const locales = ['us', 'nl', 'dk', 'au', 'uk', 'ie'];
const defaultLocale = 'us';

// Country to locale mapping
const countryToLocale: Record<string, string> = {
  'NL': 'nl',
  'DK': 'dk',
  'AU': 'au',
  'GB': 'uk',
  'IE': 'ie',
  'US': 'us',
};

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if pathname already has locale
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) return; // Already localized, continue

  // 1. Check cookie for saved preference
  const localeCookie = request.cookies.get('NEXT_LOCALE')?.value;
  if (localeCookie && locales.includes(localeCookie)) {
    request.nextUrl.pathname = `/${localeCookie}${pathname}`;
    return NextResponse.redirect(request.nextUrl, 302);
  }

  // 2. Detect from geolocation (Vercel deployment)
  const { country } = geolocation(request);
  const detectedLocale = country ? countryToLocale[country] : null;

  if (detectedLocale && locales.includes(detectedLocale)) {
    request.nextUrl.pathname = `/${detectedLocale}${pathname}`;
    const response = NextResponse.redirect(request.nextUrl, 302);
    response.cookies.set('NEXT_LOCALE', detectedLocale, {
      maxAge: 31536000, // 1 year
      path: '/',
    });
    return response;
  }

  // 3. Check Accept-Language header
  const acceptLanguage = request.headers.get('accept-language');
  const headerLocale = parseAcceptLanguage(acceptLanguage);

  if (headerLocale && locales.includes(headerLocale)) {
    request.nextUrl.pathname = `/${headerLocale}${pathname}`;
    return NextResponse.redirect(request.nextUrl, 302);
  }

  // 4. Fallback to default locale
  request.nextUrl.pathname = `/${defaultLocale}${pathname}`;
  return NextResponse.redirect(request.nextUrl, 302);
}

export const config = {
  matcher: [
    // Match all paths except api, _next, static files
    '/((?!api|_next|_vercel|.*\\..*).*)',
  ],
};
```

### Pattern 2: Cookie-Based Locale Persistence

**What:** Set cookie when user manually selects locale, check cookie before geolocation.

**When to use:** User explicitly chooses locale via switcher component.

**Example:**
```typescript
// src/components/locale-switcher.tsx
// Source: Custom implementation pattern
'use client';

import { useRouter, usePathname } from 'next/navigation';
import { LocaleCode, locales } from '@/lib/locales';

export function LocaleSwitcher({ currentLocale }: { currentLocale: LocaleCode }) {
  const router = useRouter();
  const pathname = usePathname();

  const handleLocaleChange = (newLocale: LocaleCode) => {
    // Set cookie for persistence
    document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=31536000`;

    // Navigate to new locale path
    const newPathname = pathname.replace(`/${currentLocale}`, `/${newLocale}`);
    router.push(newPathname);
  };

  return (
    <select
      value={currentLocale}
      onChange={(e) => handleLocaleChange(e.target.value as LocaleCode)}
    >
      {Object.entries(locales).map(([code, config]) => (
        <option key={code} value={code}>
          {config.country}
        </option>
      ))}
    </select>
  );
}
```

### Pattern 3: GDPR Cookie Consent Banner

**What:** Show consent banner for EU visitors before setting cookies, detect EU countries via geolocation.

**When to use:** User from NL, DK, or IE visits site for first time.

**Example:**
```typescript
// src/components/cookie-consent.tsx
// Source: https://www.buildwithmatija.com/blog/build-cookie-consent-banner-nextjs-15-server-client
'use client';

import { useState, useEffect } from 'react';

const EU_COUNTRIES = ['NL', 'DK', 'IE', 'DE', 'FR', 'ES', 'IT', 'BE', 'AT', 'SE', 'FI', 'PL']; // etc.

export function CookieConsent({ userCountry }: { userCountry?: string }) {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    const isEU = userCountry ? EU_COUNTRIES.includes(userCountry) : false;

    // Only show banner if: EU user + no consent given
    if (isEU && !consent) {
      setShowBanner(true);
    }
  }, [userCountry]);

  const handleAccept = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    setShowBanner(false);
  };

  const handleDecline = () => {
    localStorage.setItem('cookie-consent', 'declined');
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black/90 p-4 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <p className="text-white">
          We use cookies to improve your experience. By using our site, you agree to our use of cookies.
        </p>
        <div className="flex gap-4">
          <button onClick={handleDecline} className="px-4 py-2 text-white">
            Decline
          </button>
          <button onClick={handleAccept} className="px-4 py-2 bg-magenta text-white rounded">
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
```

### Pattern 4: Locale Switcher UI with Flags

**What:** Dropdown component with country flags and names for manual locale selection.

**When to use:** Header and footer components for all pages.

**Example:**
```typescript
// src/components/locale-switcher-dropdown.tsx
// Source: https://shadcn-country-dropdown.vercel.app/
'use client';

import { US, NL, DK, AU, GB, IE } from 'country-flag-icons/react/3x2';
import { LocaleCode, locales } from '@/lib/locales';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

const FLAGS = {
  us: US,
  nl: NL,
  dk: DK,
  au: AU,
  uk: GB,
  ie: IE,
};

export function LocaleSwitcherDropdown({ currentLocale }: { currentLocale: LocaleCode }) {
  const CurrentFlag = FLAGS[currentLocale];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-2">
        <CurrentFlag className="w-5 h-3" />
        <span>{locales[currentLocale].country}</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {Object.entries(locales).map(([code, config]) => {
          const Flag = FLAGS[code as LocaleCode];
          return (
            <DropdownMenuItem key={code} onClick={() => handleLocaleChange(code as LocaleCode)}>
              <Flag className="w-5 h-3 mr-2" />
              {config.country}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
```

### Anti-Patterns to Avoid

- **JavaScript-based redirects:** Use middleware for SEO compliance, not client-side `window.location` redirects
- **Permanent (301) redirects for locale:** Use 302 temporary redirects since locale preference can change
- **Middleware without proper matcher:** Causes infinite redirect loops if middleware runs on already-localized paths
- **Setting cookies without consent in EU:** GDPR violation, show consent banner first
- **Using `request.geo` in local dev:** Always returns undefined, implement fallback logic
- **Emoji flags instead of SVG:** Cross-platform inconsistency and accessibility issues

## Don't Hand-Roll

Problems that look simple but have existing solutions:

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Locale detection logic | Custom Accept-Language parser | next-intl middleware or @formatjs/intl-localematcher | Best-fit algorithm handles regional variants (en-GB → en-US), quality scores, edge cases |
| Cookie consent banner | Custom GDPR compliance | Custom component with geo-targeting | Legal requirements vary by region, need granular control, but pattern is straightforward |
| Flag icon components | Custom SVG flags | country-flag-icons or react-circle-flags | Proper aspect ratios, accessibility, maintained with country code changes |
| Locale routing | Manual path rewriting | next-intl or Next.js App Router [locale] pattern | Handles static generation, metadata, SEO, type safety |

**Key insight:** Locale detection has numerous edge cases (regional variants, quality scores, deprecated codes). Use battle-tested libraries like next-intl to avoid bugs.

## Common Pitfalls

### Pitfall 1: Infinite Redirect Loop

**What goes wrong:** Middleware continuously redirects to locale-prefixed paths that trigger middleware again.

**Why it happens:** Matcher doesn't exclude already-localized paths, or middleware doesn't check if pathname already has locale prefix.

**How to avoid:**
```typescript
// BEFORE middleware logic, check if locale already present
const pathnameHasLocale = locales.some(
  (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
);

if (pathnameHasLocale) return; // Exit early
```

**Warning signs:** Browser shows "too many redirects" error, middleware runs in infinite loop during local dev.

### Pitfall 2: Setting Locale Cookie Without GDPR Consent

**What goes wrong:** Site sets `NEXT_LOCALE` cookie for EU visitors without showing consent banner first.

**Why it happens:** Middleware sets cookie automatically on geolocation detection without checking consent status.

**How to avoid:**
- Check if user is from EU country (NL, DK, IE, etc.)
- Only set cookie AFTER user accepts in consent banner
- Use localStorage for consent tracking (localStorage isn't subject to GDPR)
- For EU users without consent, use session-only redirects (no cookie)

**Warning signs:** GDPR audit tool flags cookie violations, legal complaints from EU users.

### Pitfall 3: `request.geo` Returns Undefined in Local Dev

**What goes wrong:** Geolocation logic breaks in local development because `request.geo` only works on Vercel.

**Why it happens:** Geolocation data is provider-specific (Vercel Edge Runtime, Cloudflare Workers), not available in local Next.js dev server.

**How to avoid:**
```typescript
// Always provide fallback
const { country } = geolocation(request) || { country: undefined };

// Or use environment check
const isDev = process.env.NODE_ENV === 'development';
const country = isDev ? 'US' : geolocation(request)?.country;
```

**Warning signs:** Middleware crashes in local dev with "Cannot read property 'country' of undefined".

### Pitfall 4: Using 301 Permanent Redirect for Locale

**What goes wrong:** Browser caches 301 redirect, user can't switch locales because browser bypasses middleware.

**Why it happens:** Developer uses `NextResponse.redirect(url, 301)` instead of `302`.

**Why 302 is correct:** Locale preference is temporary/changeable. 302 tells search engines and browsers this redirect may change.

**How to avoid:** Always use `NextResponse.redirect(url, 302)` for locale redirects.

**Warning signs:** After switching locale, browser returns to old locale on refresh.

### Pitfall 5: Empty `generateStaticParams` with Static Export

**What goes wrong:** Build fails with error about missing params when using `output: 'export'`.

**Why it happens:** Static export requires all dynamic routes to be pre-generated. Empty `generateStaticParams()` array causes build error.

**How to avoid:**
```typescript
// app/[locale]/layout.tsx
export async function generateStaticParams() {
  return localeList.map((locale) => ({ locale })); // MUST return all locales
}
```

**Warning signs:** Build error: "Page '/[locale]/page' is missing param in generateStaticParams()".

### Pitfall 6: Middleware Runs on Static Assets

**What goes wrong:** Middleware unnecessarily runs on images, fonts, CSS files, slowing down site.

**Why it happens:** Matcher pattern is too broad, doesn't exclude static files.

**How to avoid:**
```typescript
export const config = {
  matcher: [
    // Match all except: api, _next, _vercel, files with extensions
    '/((?!api|_next|_vercel|.*\\..*).*)',
  ],
};
```

**Warning signs:** Network tab shows middleware running on image/CSS requests, slow asset loading.

## Code Examples

Verified patterns from official sources:

### Vercel Geolocation Helper
```typescript
// Source: https://vercel.com/kb/guide/geo-ip-headers-geolocation-vercel-functions
import { geolocation } from '@vercel/functions';

export function GET(request: Request) {
  const { city, country, latitude, longitude, region } = geolocation(request);
  // Each property is string | undefined

  return Response.json({
    city,      // "Amsterdam"
    country,   // "NL"
    latitude,  // "52.3676"
    longitude, // "4.9041"
    region,    // Vercel Edge region that received request
  });
}
```

### next-intl Middleware Configuration
```typescript
// Source: https://next-intl.dev/docs/routing/middleware
import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  // Supported locales
  locales: ['us', 'nl', 'dk', 'au', 'uk', 'ie'],

  // Default locale (x-default)
  defaultLocale: 'us',

  // Cookie name for locale preference
  localePrefix: 'as-needed', // or 'always' for static export

  // Domain-based routing (optional)
  domains: [
    {
      domain: 'roseyco.com',
      defaultLocale: 'us',
    },
  ],
});

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
```

### Reading Geolocation Headers Directly
```typescript
// Source: https://vercel.com/kb/guide/geo-ip-headers-geolocation-vercel-functions
export function middleware(request: NextRequest) {
  // Alternative to @vercel/functions geolocation helper
  const country = request.headers.get('x-vercel-ip-country');
  const city = request.headers.get('x-vercel-ip-city');
  const latitude = request.headers.get('x-vercel-ip-latitude');
  const longitude = request.headers.get('x-vercel-ip-longitude');
  const region = request.headers.get('x-vercel-ip-country-region');

  // All values are string | null
  console.log({ country, city, latitude, longitude, region });
}
```

### Accept-Language Header Parsing
```typescript
// Source: https://next-intl.dev/docs/routing/middleware (uses @formatjs/intl-localematcher)
import { match } from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';

function getLocaleFromHeader(acceptLanguage: string | null): string | null {
  if (!acceptLanguage) return null;

  const languages = new Negotiator({
    headers: { 'accept-language': acceptLanguage },
  }).languages();

  const locales = ['en-US', 'nl-NL', 'da-DK', 'en-AU', 'en-GB', 'en-IE'];

  try {
    return match(languages, locales, 'en-US');
  } catch {
    return null;
  }
}
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Pages Router i18n config | App Router [locale] pattern | Next.js 13+ (2022) | Manual middleware required, more control but more setup |
| Client-side redirects | Middleware 302 redirects | Next.js 12+ (2021) | SEO compliant, runs before render, proper status codes |
| Static locale config | next-intl v4 ESM-only | Jan 2025 | Better tree-shaking, modern JSX transform, React 17+ required |
| Vercel Edge Runtime recommendation | Node.js runtime preferred | Next.js 15.5+ (Dec 2024) | Edge deprecated, Node.js runtime now supports middleware |
| Cookie consent implicit | Explicit geo-targeted consent | GDPR enforcement (2018+) | EU visitors require explicit consent before cookies |

**Deprecated/outdated:**
- **Pages Router `i18n` config**: Deprecated in App Router, use middleware instead
- **next-intl v3**: Use v4.7.0+ for Next.js 14/15 support and ESM benefits
- **Vercel Edge Runtime**: Now deprecated, migrate to Node.js runtime for middleware
- **301 redirects for locale**: Use 302 temporary redirects for changeable preferences
- **Emoji country flags**: Use SVG flag libraries for consistency and accessibility

## Open Questions

Things that couldn't be fully resolved:

1. **Cloudflare Deployment Geolocation**
   - What we know: Cloudflare provides `CF-IPCountry` header and `request.cf` object in Workers
   - What's unclear: Whether `@opennextjs/cloudflare` adapter supports geolocation in Next.js middleware seamlessly
   - Recommendation: If deploying to Cloudflare, test geolocation in preview environment early. Fallback to Vercel-specific implementation if targeting Vercel deployment.

2. **Cookie Consent Enforcement Scope**
   - What we know: EU countries (NL, DK, IE) require explicit consent for non-essential cookies
   - What's unclear: Whether locale preference cookie qualifies as "essential" (functional) vs "non-essential"
   - Recommendation: Conservative approach: treat as non-essential, show consent banner for EU visitors. Consult legal team for final determination.

3. **Local Development Testing**
   - What we know: `request.geo` returns undefined in local dev
   - What's unclear: Best practice for simulating different geolocations during development
   - Recommendation: Add dev-only query param (`?locale=nl`) to force locale for testing, or use environment variable to set mock country.

4. **Static Export Limitations**
   - What we know: Middleware doesn't work with `output: 'export'`, need `localePrefix: 'always'`
   - What's unclear: Whether project plans to use static export or dynamic deployment
   - Recommendation: Confirm deployment target (Vercel dynamic vs static export). If static, disable middleware-based geolocation and rely on client-side detection.

## Sources

### Primary (HIGH confidence)
- Next.js Official Docs: [Internationalization Guide](https://nextjs.org/docs/app/guides/internationalization) - Official App Router i18n patterns
- next-intl Docs: [Middleware Configuration](https://next-intl.dev/docs/routing/middleware) - Cookie handling, locale detection priority, routing
- Vercel Docs: [Edge Runtime](https://vercel.com/docs/functions/runtimes/edge) - Runtime limitations, API support
- Vercel KB: [Geo IP Headers](https://vercel.com/kb/guide/geo-ip-headers-geolocation-vercel-functions) - Geolocation properties and headers
- Vercel Changelog: [Enhanced Geolocation](https://vercel.com/changelog/enhanced-geolocation-information-available-for-vercel-functions) - Available geolocation data
- shadcn Country Dropdown: [Demo & Code](https://shadcn-country-dropdown.vercel.app/) - Flag icon implementation patterns

### Secondary (MEDIUM confidence)
- Build with Matija: [Cookie Consent Guide](https://www.buildwithmatija.com/blog/build-cookie-consent-banner-nextjs-15-server-client) - GDPR-compliant implementation
- Medium: [GDPR Cookie Banner with GA4](https://medium.com/front-end-weekly/how-to-build-a-gdpr-cookie-banner-in-next-js-15-ga4-consent-mode-cloudfront-geo-detection-aae0961e89c5) - CloudFront geo detection for cookie consent
- James Perkins: [Next.js Middleware Geolocation](https://www.jamesperkins.dev/post/using-next-middleware-for-geolocation/) - Practical implementation examples
- LogRocket Blog: [Next.js Internationalization Guide](https://blog.logrocket.com/complete-guide-internationalization-nextjs/) - Comprehensive i18n patterns

### Tertiary (LOW confidence)
- SecurePrivacy Blog: [Global Cookie Consent Trends 2026](https://secureprivacy.ai/blog/global-cookie-consent-trends-2026) - GDPR requirements by region
- Cookie Banner: [EU Requirements Overview](https://cookiebanner.com/blog/cookie-banner-requirements-by-country-eu-overview-2026/) - Country-specific cookie laws
- npm: [react-cookie-consent](https://www.npmjs.com/package/react-cookie-consent) - Alternative consent library (not recommended, prefer custom)
- npm: [country-flag-icons](https://www.npmjs.com/package/country-flag-icons) - Flag icon library documentation
- Conductor SEO: [302 vs 307 Redirects](https://www.conductor.com/academy/redirects/faq/302-vs-307/) - SEO implications of redirect types

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - next-intl is officially recommended by Next.js docs, Vercel geolocation is well-documented
- Architecture: HIGH - Patterns verified from official Next.js and next-intl documentation
- Pitfalls: MEDIUM - Based on GitHub discussions and community reports, not all officially documented
- Cookie consent: MEDIUM - Legal requirements are clear, but implementation details vary by interpretation
- Geolocation data: HIGH - Vercel official documentation confirms properties and behavior

**Research date:** 2026-01-27
**Valid until:** 2026-02-27 (30 days - stable domain, but i18n ecosystem evolves regularly)

**Note:** This research assumes Vercel deployment. If deploying to other platforms (Cloudflare, Netlify, self-hosted), geolocation implementation will differ. Middleware patterns remain the same, but geolocation data access methods change.

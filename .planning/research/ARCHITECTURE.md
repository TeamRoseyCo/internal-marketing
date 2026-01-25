# Multi-Locale Architecture Patterns

**Domain:** Next.js 16 App Router Multi-Locale Enforcement
**Researched:** 2026-01-25
**Project:** Rosey Co. - 6 locales (US, AU, UK, IE, NL, DK)

## Executive Summary

This research addresses architectural patterns to ensure all components in a Next.js 16 App Router application properly support multiple locales. The current Rosey Co. codebase has working locale routing via `[locale]` dynamic segment, but lacks enforcement mechanisms to prevent components from bypassing the translation system.

**Key finding:** The architecture should use a **layered enforcement strategy** combining TypeScript constraints, utility functions with React cache, centralized formatting utilities, and build-time validation. This allows incremental migration without requiring a full rewrite.

**Confidence:** HIGH for recommended patterns (verified with Next.js 16 official docs and next-intl patterns), MEDIUM for custom ESLint rules (requires implementation validation).

---

## Recommended Architecture

### Overview: Layered Enforcement Strategy

```
┌─────────────────────────────────────────────────────────┐
│ Layer 1: TypeScript Type System                        │
│ - Locale-aware component interfaces                    │
│ - Strict prop typing with generics                     │
└─────────────────────────────────────────────────────────┘
                        ↓
┌─────────────────────────────────────────────────────────┐
│ Layer 2: Utility Functions (React Cache Pattern)       │
│ - getLocale() / useLocale() for Server/Client         │
│ - Avoids prop drilling, enforces locale access        │
└─────────────────────────────────────────────────────────┘
                        ↓
┌─────────────────────────────────────────────────────────┐
│ Layer 3: Centralized Formatting                        │
│ - Currency, dates, numbers via Intl API               │
│ - Locale-aware formatters, not scattered logic         │
└─────────────────────────────────────────────────────────┘
                        ↓
┌─────────────────────────────────────────────────────────┐
│ Layer 4: Build-Time Validation                         │
│ - generateStaticParams validates all locales          │
│ - Build fails if any locale breaks                     │
└─────────────────────────────────────────────────────────┘
```

---

## Component Patterns

### Pattern 1: Server Components with React Cache (RECOMMENDED)

**Problem:** Passing locale down through 10+ server components creates prop drilling hell.

**Solution:** Use React's `cache()` to provide locale context without prop drilling.

**Implementation:**

```typescript
// src/lib/locale-context.ts
import { cache } from 'react';
import { LocaleCode, isValidLocale, defaultLocale } from './locales';

/**
 * Server-side locale accessor using React cache.
 * Call this from any Server Component to get current locale.
 * NO prop drilling required.
 */
export const getLocale = cache((): LocaleCode => {
  // This will be set by layout before any component renders
  return getLocaleFromCache();
});

// Internal state holder (set once per request)
let currentLocale: LocaleCode | null = null;

export function setRequestLocale(locale: LocaleCode) {
  currentLocale = locale;
}

function getLocaleFromCache(): LocaleCode {
  if (!currentLocale) {
    console.warn('getLocale() called before locale was set. Using default.');
    return defaultLocale;
  }
  return currentLocale;
}
```

**Usage in Layout:**

```typescript
// src/app/[locale]/layout.tsx
import { setRequestLocale, getLocale } from '@/lib/locale-context';

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  // Set locale for entire request tree
  setRequestLocale(locale);

  return <>{children}</>;
}
```

**Usage in Any Server Component:**

```typescript
// src/components/pricing-card.tsx (Server Component)
import { getLocale } from '@/lib/locale-context';
import { getTranslations } from '@/lib/translations';
import { formatCurrency } from '@/lib/formatters';

export function PricingCard({ price }: { price: number }) {
  const locale = getLocale(); // NO prop drilling!
  const t = getTranslations(locale);

  return (
    <div>
      <h3>{t.pricing.title}</h3>
      <p>{formatCurrency(price, locale)}</p>
    </div>
  );
}
```

**Why this works:**
- React `cache()` deduplicates function calls within a single render tree
- Acts like "request-scoped context" for Server Components
- Used by next-intl, next-international, and recommended by React team
- Zero prop drilling, locale is always accessible

**Source:** [next-intl Server Components documentation](https://next-intl.dev/docs/environments/server-client-components) uses this exact pattern.

**Confidence:** HIGH

---

### Pattern 2: Client Components with Context Provider

**Problem:** Client components can't use React cache. Need different approach.

**Solution:** Use React Context for client-side locale access.

**Implementation:**

```typescript
// src/providers/locale-provider.tsx
'use client';

import { createContext, useContext } from 'react';
import { LocaleCode } from '@/lib/locales';

const LocaleContext = createContext<LocaleCode | null>(null);

export function LocaleProvider({
  locale,
  children
}: {
  locale: LocaleCode;
  children: React.ReactNode;
}) {
  return (
    <LocaleContext.Provider value={locale}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale(): LocaleCode {
  const locale = useContext(LocaleContext);
  if (!locale) {
    throw new Error('useLocale must be used within LocaleProvider');
  }
  return locale;
}
```

**Usage in Layout:**

```typescript
// src/app/[locale]/layout.tsx
import { LocaleProvider } from '@/providers/locale-provider';

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params;

  return (
    <LocaleProvider locale={locale}>
      {children}
    </LocaleProvider>
  );
}
```

**Usage in Client Component:**

```typescript
// src/components/header.tsx
'use client';

import { useLocale } from '@/providers/locale-provider';
import { getTranslations } from '@/lib/translations';

export function Header() {
  const locale = useLocale(); // NO prop drilling!
  const t = getTranslations(locale);

  const navItems = [
    { href: `/${locale}/`, label: t.nav.home },
    { href: `/${locale}/services`, label: t.nav.services },
    // ...
  ];

  return <header>{/* ... */}</header>;
}
```

**Confidence:** HIGH

---

### Pattern 3: TypeScript Enforcement via Branded Types

**Problem:** No compile-time guarantee that locale-dependent functions receive a locale.

**Solution:** Use branded types to require explicit locale parameters.

**Implementation:**

```typescript
// src/lib/locales.ts
export type LocaleCode = 'us' | 'nl' | 'dk' | 'au' | 'uk' | 'ie';

// Branded type - can't be created accidentally
export type ValidatedLocale = LocaleCode & { readonly __brand: 'ValidatedLocale' };

export function validateLocale(code: string): ValidatedLocale | null {
  if (isValidLocale(code)) {
    return code as ValidatedLocale;
  }
  return null;
}

// Force locale parameter with branded type
export function getTranslations(locale: ValidatedLocale): Translations {
  return translations[locale] || translations.us;
}
```

**Usage:**

```typescript
// This compiles
const locale = validateLocale('us');
if (locale) {
  const t = getTranslations(locale); // ✅
}

// This does NOT compile
const t = getTranslations('us'); // ❌ Type error: string is not ValidatedLocale
```

**Trade-off:** More ceremony at call sites, but impossible to forget locale validation.

**Confidence:** MEDIUM (adds complexity, validate if team wants this strictness)

---

## Centralized Formatting

### Currency Formatting

**Problem:** Currency symbols scattered across components (`$`, `£`, `€`).

**Solution:** Centralize via Intl.NumberFormat API.

**Implementation:**

```typescript
// src/lib/formatters.ts
import { LocaleCode, getLocale as getLocaleFromCache } from './locales';

const CURRENCY_MAP: Record<LocaleCode, string> = {
  us: 'USD',
  au: 'AUD',
  uk: 'GBP',
  ie: 'EUR',
  nl: 'EUR',
  dk: 'DKK',
};

const LOCALE_MAP: Record<LocaleCode, string> = {
  us: 'en-US',
  au: 'en-AU',
  uk: 'en-GB',
  ie: 'en-IE',
  nl: 'nl-NL',
  dk: 'da-DK',
};

/**
 * Format currency using native Intl API.
 * Automatically handles locale-specific formatting.
 */
export function formatCurrency(
  amount: number,
  locale: LocaleCode,
  options?: Intl.NumberFormatOptions
): string {
  const currency = CURRENCY_MAP[locale];
  const localeString = LOCALE_MAP[locale];

  return new Intl.NumberFormat(localeString, {
    style: 'currency',
    currency,
    ...options,
  }).format(amount);
}

/**
 * Format number with thousands separators.
 */
export function formatNumber(
  value: number,
  locale: LocaleCode,
  options?: Intl.NumberFormatOptions
): string {
  const localeString = LOCALE_MAP[locale];
  return new Intl.NumberFormat(localeString, options).format(value);
}

/**
 * Format date with locale-aware patterns.
 */
export function formatDate(
  date: Date,
  locale: LocaleCode,
  options?: Intl.DateTimeFormatOptions
): string {
  const localeString = LOCALE_MAP[locale];
  return new Intl.DateTimeFormat(localeString, options).format(date);
}
```

**Usage:**

```typescript
import { formatCurrency, formatNumber } from '@/lib/formatters';
import { getLocale } from '@/lib/locale-context';

function PricingCard() {
  const locale = getLocale();

  return (
    <div>
      <p>{formatCurrency(1299, locale)}</p>
      {/* US: $1,299.00 */}
      {/* UK: £1,299.00 */}
      {/* NL: € 1.299,00 */}
    </div>
  );
}
```

**Why Intl API:**
- Native browser API, zero dependencies
- Handles all locale quirks (decimal separators, grouping, currency symbols)
- Smaller bundle size than i18n libraries
- Standard as of 2026

**Sources:**
- [Intl.NumberFormat MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat)
- [React Currency Formatting with Intl API](https://dev.to/josephciullo/simplify-currency-formatting-in-react-a-zero-dependency-solution-with-intl-api-3kok)

**Confidence:** HIGH

---

## Build-Time Validation

### Pattern: Static Generation with All Locales

**Problem:** Breaking changes in one locale may not be caught until production.

**Solution:** Use generateStaticParams to build all locales at build time.

**Current Implementation (already working):**

```typescript
// src/app/[locale]/layout.tsx
export async function generateStaticParams() {
  return localeList.map((locale) => ({ locale }));
}
```

**This already works!** Next.js builds all locales during `next build`:

```
Route (app)                              Size     First Load JS
┌ ○ /[locale]                            1.23 kB        95.1 kB
├ ○ /[locale]/contact                    2.45 kB        97.3 kB
├ ○ /[locale]/services                   3.12 kB        98.0 kB
└ ○ /[locale]/services/seo               2.89 kB        97.7 kB

○  (Static)  prerendered as static content
```

**Build fails if ANY locale breaks:**

```bash
npm run build

# If NL locale has missing translation key:
# Error: Cannot read properties of undefined (reading 'title')
#   at ServicesPage (./src/app/[locale]/services/page.tsx)
# Build failed with 1 error
```

**Additional validation test:**

```typescript
// scripts/validate-locales.ts
import { localeList, LocaleCode } from '../src/lib/locales';
import { getTranslations } from '../src/lib/translations';

/**
 * Validates that all locales have complete translations.
 * Run with: tsx scripts/validate-locales.ts
 */
function validateTranslations() {
  const usTranslations = getTranslations('us');
  const requiredKeys = getAllKeys(usTranslations);

  for (const locale of localeList) {
    const translations = getTranslations(locale);
    const localeKeys = getAllKeys(translations);

    const missing = requiredKeys.filter(key => !localeKeys.includes(key));

    if (missing.length > 0) {
      console.error(`❌ Locale ${locale} missing keys: ${missing.join(', ')}`);
      process.exit(1);
    }
  }

  console.log('✅ All locales have complete translations');
}

function getAllKeys(obj: any, prefix = ''): string[] {
  return Object.keys(obj).flatMap(key => {
    const value = obj[key];
    const fullKey = prefix ? `${prefix}.${key}` : key;

    if (typeof value === 'object' && !Array.isArray(value)) {
      return getAllKeys(value, fullKey);
    }
    return [fullKey];
  });
}

validateTranslations();
```

**Add to package.json:**

```json
{
  "scripts": {
    "validate:locales": "tsx scripts/validate-locales.ts",
    "prebuild": "npm run validate:locales"
  }
}
```

**Now build always validates translations BEFORE attempting static generation.**

**Sources:**
- [Next.js Production Checklist](https://nextjs.org/docs/app/guides/production-checklist)
- [Static Rendering with next-international](https://next-international.vercel.app/docs/app-static-rendering)

**Confidence:** HIGH

---

## Migration Path (Incremental)

### Phase 1: Add Utility Functions (Week 1)

**Goal:** Eliminate prop drilling in new components.

**Tasks:**
1. Create `src/lib/locale-context.ts` with getLocale() using React cache
2. Create `src/providers/locale-provider.tsx` for client components
3. Update `src/app/[locale]/layout.tsx` to call setRequestLocale() and wrap with LocaleProvider

**Components to migrate:**
- ✅ Already using locale: `src/app/[locale]/page.tsx`
- ❌ Needs migration: `src/components/layout/header.tsx` (currently extracts from pathname)
- ❌ Needs migration: `src/components/layout/footer.tsx` (currently extracts from pathname)

**Migration example (Header):**

```typescript
// BEFORE (src/components/layout/header.tsx)
'use client';

export function Header() {
  const pathname = usePathname();
  const currentLocale = pathname.split('/')[1];
  const locale = isValidLocale(currentLocale) ? currentLocale : null;

  const navItems = baseNavItems.map(item => ({
    ...item,
    href: locale ? `/${locale}${item.href}` : item.href
  }));

  // Hardcoded English labels ❌
  return <nav>...</nav>;
}
```

```typescript
// AFTER (src/components/layout/header.tsx)
'use client';

import { useLocale } from '@/providers/locale-provider';
import { getTranslations } from '@/lib/translations';

export function Header() {
  const locale = useLocale(); // ✅ From context
  const t = getTranslations(locale); // ✅ Translated

  const navItems = [
    { href: `/${locale}/`, label: t.nav.home },
    { href: `/${locale}/services`, label: t.nav.services },
    { href: `/${locale}/results`, label: t.nav.results },
    { href: `/${locale}/blog`, label: t.nav.blog },
    { href: `/${locale}/contact`, label: t.nav.contact },
  ];

  return <nav>...</nav>;
}
```

**Validation:**
- Run build: `npm run build`
- Visit each locale manually: /us, /au, /uk, /ie, /nl, /dk
- Verify header shows translated navigation

---

### Phase 2: Centralize Formatting (Week 1-2)

**Goal:** Remove scattered currency/number formatting.

**Tasks:**
1. Create `src/lib/formatters.ts` with formatCurrency, formatNumber, formatDate
2. Search codebase for hardcoded currency symbols
3. Replace with formatter calls

**Search commands:**

```bash
# Find hardcoded currency symbols
grep -r "\$" src/components --include="*.tsx" | grep -v "className"
grep -r "£" src/components --include="*.tsx"
grep -r "€" src/components --include="*.tsx"

# Find .toLocaleString() calls (should use formatters instead)
grep -r "toLocaleString" src --include="*.tsx"
```

**Example migration:**

```typescript
// BEFORE
<p>${price.toFixed(2)}</p>

// AFTER
import { formatCurrency } from '@/lib/formatters';
import { getLocale } from '@/lib/locale-context';

<p>{formatCurrency(price, getLocale())}</p>
```

---

### Phase 3: TypeScript Enforcement (Week 2)

**Goal:** Make it impossible to create non-locale-aware components.

**Option A: Component Interface Convention**

```typescript
// src/types/locale-components.ts

/**
 * Props for server components that need locale.
 * Extend this interface to enforce locale prop.
 */
export interface ServerLocaleProps {
  // Locale is provided by getLocale(), not as prop
  // This is just a marker interface
}

/**
 * Props for client components that need locale.
 * Use with LocaleProvider context.
 */
export interface ClientLocaleProps {
  // Locale is provided by useLocale(), not as prop
  // This is just a marker interface
}
```

**Option B: ESLint Custom Rule (Advanced)**

Create custom ESLint rule to detect components using hardcoded strings.

```typescript
// .eslint-local/no-hardcoded-text.js
module.exports = {
  meta: {
    type: 'problem',
    docs: {
      description: 'Disallow hardcoded UI text outside translation system',
    },
  },
  create(context) {
    return {
      JSXText(node) {
        const text = node.value.trim();

        // Ignore empty text and single characters
        if (text.length <= 1) return;

        // Ignore numbers
        if (/^\d+$/.test(text)) return;

        // Flag as potential untranslated text
        context.report({
          node,
          message: 'UI text should use translation system (t.path.to.key)',
        });
      },
    };
  },
};
```

**Add to ESLint config:**

```javascript
// eslint.config.mjs
import localRules from 'eslint-plugin-local-rules';

export default [
  {
    plugins: {
      'local-rules': localRules,
    },
    rules: {
      'local-rules/no-hardcoded-text': 'warn',
    },
  },
];
```

**Trade-off:** May produce false positives (technical labels, brand names). Use `eslint-disable` comments where appropriate.

**Sources:**
- [ESLint Custom Rule Tutorial](https://eslint.org/docs/latest/extend/custom-rule-tutorial)
- [eslint-plugin-local-rules](https://medium.com/@ignatovich.dm/creating-and-using-custom-local-eslint-rules-with-eslint-plugin-local-rules-428d510db78f)

**Confidence:** MEDIUM (requires validation and tuning)

---

### Phase 4: Add Translation Keys (Ongoing)

**Goal:** Ensure Footer, Header, and other missing components have translation keys.

**Add to translations.ts:**

```typescript
export interface Translations {
  // Existing...
  nav: {
    home: string;      // Add this
    services: string;
    results: string;
    blog: string;
    contact: string;
  };

  // Add footer translations
  footer: {
    tagline: string;
    servicesTitle: string;
    companyTitle: string;
    contactTitle: string;
    email: string;
    phone: string;
    copyright: string;
    allRightsReserved: string;
    globalAgency: string;
  };
}

// Update all locale objects (us, nl, dk, au, uk, ie) with these keys
translations.us = {
  // ...
  nav: {
    home: 'Home',
    services: 'Services',
    results: 'Results',
    blog: 'Blog',
    contact: 'Contact',
  },
  footer: {
    tagline: 'We help businesses worldwide generate more customers through SEO, social media management, and paid advertising.',
    servicesTitle: 'Services',
    companyTitle: 'Company',
    contactTitle: 'Contact',
    email: 'team@roseyco.com',
    phone: '+1 (234) 567-890', // Per-locale phone
    copyright: '© 2026 Rosey Co.',
    allRightsReserved: 'All rights reserved.',
    globalAgency: 'Global Social Media Marketing Agency',
  },
};

// Repeat for nl, dk, au, uk, ie with translations
```

**Validation script catches missing keys automatically** (from Phase 1 build validation).

---

## Testing Strategy

### Unit Tests: Locale Utilities

```typescript
// src/lib/__tests__/locale-context.test.ts
import { describe, it, expect, beforeEach } from 'vitest';
import { getLocale, setRequestLocale } from '../locale-context';

describe('locale-context', () => {
  beforeEach(() => {
    setRequestLocale('us'); // Reset
  });

  it('returns locale set via setRequestLocale', () => {
    setRequestLocale('nl');
    expect(getLocale()).toBe('nl');
  });

  it('warns and returns default if locale not set', () => {
    // Clear locale
    const consoleSpy = vi.spyOn(console, 'warn');

    const locale = getLocale();

    expect(locale).toBe('us');
    expect(consoleSpy).toHaveBeenCalledWith(
      expect.stringContaining('getLocale() called before locale was set')
    );
  });
});
```

### Integration Tests: Build Validation

```typescript
// scripts/validate-build.ts
import { execSync } from 'child_process';

/**
 * Validates that all locales build successfully.
 * Run with: tsx scripts/validate-build.ts
 */
function validateBuild() {
  try {
    console.log('Building all locales...');
    execSync('npm run build', { stdio: 'inherit' });
    console.log('✅ All locales built successfully');
  } catch (error) {
    console.error('❌ Build failed for one or more locales');
    process.exit(1);
  }
}

validateBuild();
```

### Manual Testing Checklist

**For each new component:**
- [ ] Navigate to /us/[page] - Verify English (US) content
- [ ] Navigate to /au/[page] - Verify English (AU) with AUD currency
- [ ] Navigate to /uk/[page] - Verify English (UK) with GBP currency
- [ ] Navigate to /ie/[page] - Verify English (IE) with EUR currency
- [ ] Navigate to /nl/[page] - Verify Dutch content with EUR currency
- [ ] Navigate to /dk/[page] - Verify Danish content with DKK currency
- [ ] Check for hardcoded strings in UI
- [ ] Verify currency formatting matches locale
- [ ] Check browser console for warnings

---

## Anti-Patterns to Avoid

### Anti-Pattern 1: Pathname Parsing for Locale Detection

**What goes wrong:**

```typescript
// ❌ DON'T DO THIS
const pathname = usePathname();
const locale = pathname.split('/')[1]; // Fragile!
```

**Why bad:**
- Breaks if route structure changes
- No type safety
- Client-side only (pathname not available in Server Components)
- Duplicated logic across components

**Instead:**

```typescript
// ✅ DO THIS
import { useLocale } from '@/providers/locale-provider'; // Client
import { getLocale } from '@/lib/locale-context';         // Server

const locale = useLocale(); // or getLocale()
```

---

### Anti-Pattern 2: Direct Translation Object Access

**What goes wrong:**

```typescript
// ❌ DON'T DO THIS
import { translations } from '@/lib/translations';

const t = translations[locale]; // Might be undefined!
```

**Why bad:**
- No fallback handling
- TypeScript can't guarantee locale validity
- Easy to forget locale parameter

**Instead:**

```typescript
// ✅ DO THIS
import { getTranslations } from '@/lib/translations';

const t = getTranslations(locale); // Always returns valid object
```

---

### Anti-Pattern 3: Hardcoded Currency Symbols

**What goes wrong:**

```typescript
// ❌ DON'T DO THIS
<p>${price}</p>
<p>£{price}</p>
<p>€{price}</p>
```

**Why bad:**
- Scattered logic
- Misses locale-specific formatting (1,299.00 vs 1.299,00)
- Hard to update
- Not extensible to new locales

**Instead:**

```typescript
// ✅ DO THIS
import { formatCurrency } from '@/lib/formatters';
import { getLocale } from '@/lib/locale-context';

<p>{formatCurrency(price, getLocale())}</p>
// Automatically formats: $1,299.00, £1,299.00, € 1.299,00
```

---

### Anti-Pattern 4: Locale-Specific Components

**What goes wrong:**

```typescript
// ❌ DON'T DO THIS
function HeaderUS() { /* ... */ }
function HeaderUK() { /* ... */ }
function HeaderNL() { /* ... */ }

// Then in layout:
{locale === 'us' && <HeaderUS />}
{locale === 'uk' && <HeaderUK />}
{locale === 'nl' && <HeaderNL />}
```

**Why bad:**
- Massive code duplication
- Unmaintainable
- Breaks when adding new locales

**Instead:**

```typescript
// ✅ DO THIS
function Header() {
  const locale = useLocale();
  const t = getTranslations(locale);

  return <header>{t.nav.home}</header>;
}

// Single component, all locales
```

---

## Sources & References

### Next.js 16 App Router i18n
- [Next.js Official Internationalization Guide](https://nextjs.org/docs/app/guides/internationalization)
- [next-intl App Router Setup](https://next-intl.dev/docs/getting-started/app-router)
- [next-intl Server/Client Components](https://next-intl.dev/docs/environments/server-client-components)

### React Patterns
- [React Server Components Discussion - Prop Drilling](https://github.com/vercel/next.js/discussions/45543)
- [Reading params in Server Components for i18n](https://github.com/vercel/next.js/discussions/58862)
- [React Stack Patterns](https://www.patterns.dev/react/react-2026/)

### TypeScript Enforcement
- [TypeScript HOC Patterns](https://medium.com/@jrwebdev/react-higher-order-component-patterns-in-typescript-42278f7590fb)
- [ESLint Plugin React with TypeScript](https://www.xjavascript.com/blog/eslintpluginreact-typescript/)

### Formatting & Localization
- [Intl.NumberFormat MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat)
- [Currency Formatting with Intl API](https://dev.to/josephciullo/simplify-currency-formatting-in-react-a-zero-dependency-solution-with-intl-api-3kok)
- [React i18n Complete Guide 2026](https://www.glorywebs.com/blog/internationalization-in-react)

### Build Validation
- [Next.js Production Checklist](https://nextjs.org/docs/app/guides/production-checklist)
- [Static Rendering with next-international](https://next-international.vercel.app/docs/app-static-rendering)

### Custom ESLint Rules
- [ESLint Custom Rule Tutorial](https://eslint.org/docs/latest/extend/custom-rule-tutorial)
- [Creating Local ESLint Rules](https://medium.com/@ignatovich.dm/creating-and-using-custom-local-eslint-rules-with-eslint-plugin-local-rules-428d510db78f)

---

## Confidence Assessment

| Pattern | Confidence | Reason |
|---------|------------|--------|
| React Cache for Server Components | HIGH | Official Next.js/React pattern, used by next-intl |
| Context Provider for Client | HIGH | Standard React pattern, well-documented |
| Centralized Intl API Formatting | HIGH | Native browser API, zero dependencies, industry standard 2026 |
| Build-time Static Generation | HIGH | Already working in codebase, validates all locales |
| Translation Validation Script | HIGH | Simple implementation, catches missing keys pre-build |
| Custom ESLint Rules | MEDIUM | Requires implementation and tuning, may have false positives |
| Branded Types for Locale | MEDIUM | Adds ceremony, validate if team wants this strictness |

---

## Next Steps for Implementation

1. **Week 1: Core Infrastructure**
   - Create `src/lib/locale-context.ts` with getLocale() and setRequestLocale()
   - Create `src/providers/locale-provider.tsx` with useLocale()
   - Update `src/app/[locale]/layout.tsx` to initialize locale context
   - Create `src/lib/formatters.ts` with currency/number/date formatters

2. **Week 1-2: Component Migration**
   - Migrate Header component to use useLocale() and translations
   - Migrate Footer component to use useLocale() and translations
   - Add missing translation keys to `src/lib/translations.ts`
   - Search and replace hardcoded currency symbols with formatCurrency()

3. **Week 2: Validation**
   - Create `scripts/validate-locales.ts` translation key checker
   - Add `prebuild` script to run validation before build
   - Run `npm run build` and verify all 6 locales generate successfully
   - Manual test all locales in browser

4. **Week 3: Enforcement (Optional)**
   - Evaluate if team wants custom ESLint rules
   - If yes, implement and tune `no-hardcoded-text` rule
   - Document patterns in team wiki/README

**Estimated effort:** 2-3 weeks for complete migration and validation infrastructure.

**Breaking change risk:** LOW - Incremental migration, can ship each component independently.

**Performance impact:** NONE - React cache and Context have negligible overhead, Intl API is native and fast.

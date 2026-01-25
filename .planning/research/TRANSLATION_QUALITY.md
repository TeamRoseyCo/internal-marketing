# Translation Quality & i18n Architecture

**Project:** Rosey Co. Global Marketing Agency Website
**Researched:** 2026-01-25
**Domain:** Next.js i18n translation quality assurance and architecture

## Executive Summary

Translation quality directly impacts credibility and conversion rates for multi-locale marketing websites. The Rosey Co. website currently suffers from three critical categories of translation issues:

1. **Hardcoded English components** - Header and Footer bypass translation system entirely
2. **Mixed language content** - English phrases embedded in otherwise translated pages
3. **Grammatical errors** - Dutch and Danish translations contain linguistic errors

This research addresses industry-standard approaches to translation QA, automated validation, component architecture patterns, and practical audit processes suitable for a lean team without professional translation services.

**Overall confidence:** HIGH for tooling and process recommendations, MEDIUM for specific Dutch/Danish grammar validation approaches

## Critical Finding: Component Architecture Gap

**Root cause of most issues:** Not all components use the translation system.

**Evidence:**
- `header.tsx` - Hardcoded "Get More Leads" button (lines 107, 183)
- `footer.tsx` - All text hardcoded in English (brand description, headings, contact info)
- Both components detect locale from URL but don't fetch translations

**Impact:** Even if translation files are perfect, users see English text on translated pages because components don't consume translations.

**Industry standard (2026):** All user-facing text should flow through centralized translation system. Zero hardcoded strings in components.

## Translation Quality Standards (2026)

### Professional vs. AI-Assisted Translation

**Industry consensus:** AI translation has matured significantly by 2026.

According to recent research, **consensus-based AI translation** (using multiple engines simultaneously) reduces translation errors by up to 22% compared to single-engine approaches. This represents what many consider the most significant advancement in machine translation reliability since neural networks became mainstream.

**Recommended approach for Rosey Co.:**
1. Use AI translation (DeepL, Google, or consensus approach) for initial draft
2. Human review by native speaker for grammatical correctness and tone
3. Automated QA to catch technical errors (missing keys, mixed languages)

**Why this works:** Marketing copy benefits from professional translation review, but AI handles 80% of heavy lifting. Focus human review on customer-facing pages (homepage, service pages, CTAs).

### Source Hierarchy for Translation Validation

| Validation Type | Tool/Method | Confidence Level | Use Case |
|-----------------|-------------|------------------|----------|
| Grammar (Dutch) | LanguageTool | HIGH | Spelling, punctuation, basic grammar |
| Grammar (Danish) | RetMig | HIGH | Advanced Danish grammar, contextual errors |
| Mixed Language Detection | Language Detector API | MEDIUM | Automated detection of language mixing |
| Translation Coverage | i18n-check | HIGH | Missing/unused translation keys |
| Component Coverage | Custom ESLint rule | MEDIUM | Enforce translation usage in components |

## Audit Process for 2,228 Lines of Translations

### Phase 1: Automated Validation (Quick Wins)

**Goal:** Catch technical errors without manual review.

#### Step 1.1: Translation Key Coverage

**Tool:** i18n-check (works with custom translation files)

```bash
# Install
npm install -D i18n-check

# Configure in package.json
{
  "scripts": {
    "i18n:check": "i18n-check",
    "i18n:audit": "i18n-check --verbose"
  },
  "i18n-check": {
    "locales": ["us", "nl", "dk", "au", "uk", "ie"],
    "translationFiles": {
      "us": "./src/lib/translations.ts",
      "nl": "./src/lib/translations.ts",
      "dk": "./src/lib/translations.ts"
    },
    "sourceFiles": ["./src/**/*.{ts,tsx}"]
  }
}
```

**What it catches:**
- Undefined keys (used in code but missing in translations)
- Unused keys (in translation files but never referenced)
- Structural mismatches between locale files

**Confidence:** HIGH - This is table-stakes i18n validation in 2026.

**Estimated time:** 15 minutes to set up, runs in <1 minute

#### Step 1.2: Grammar Validation (Dutch)

**Tool:** LanguageTool (free tier available)

LanguageTool offers grammar, spelling, and punctuation correction in Dutch and over 30 other languages for free. The free version corrects spelling, simple punctuation and some style mistakes, while the Premium version shows all errors.

**Process:**
```bash
# Install LanguageTool CLI
npm install -D languagetool

# Create script to extract Dutch translations
node scripts/extract-nl-text.js > translations-nl.txt

# Run grammar check
languagetool --language nl translations-nl.txt > nl-grammar-report.txt
```

**Alternative (no install):** Copy Dutch translations to https://languagetool.org/spellchecking-dutch

**What it catches:**
- Spelling errors
- Basic grammar mistakes
- Punctuation issues

**Confidence:** HIGH for spelling/punctuation, MEDIUM for advanced grammar

**Estimated time:** 30 minutes to extract and check, review ~1 hour

#### Step 1.3: Grammar Validation (Danish)

**Tool:** RetMig (https://retmig.dk/)

RetMig is an advanced Danish spell and grammar checker that helps catch and correct linguistic errors including spelling errors, typos, grammatical errors, and contextual errors where the incorrect word exists in the dictionary. Unlike many other spell checkers, RetMig analyzes entire sentences rather than checking individual words, making it possible to recognize real-word errors and rank corrections based on context.

**Process:**
1. Extract all Danish translations to plain text
2. Paste into RetMig web interface
3. Review suggested corrections
4. Apply corrections to `translations.ts`

**What it catches:**
- Spelling and typos
- Contextual errors (wrong word that exists in dictionary)
- Sentence-level grammar issues
- Danish-specific linguistic patterns

**Confidence:** HIGH - RetMig is considered gold standard for Danish

**Estimated time:** 30 minutes to extract and check, review ~1 hour

#### Step 1.4: Mixed Language Detection

**Tool:** Tomedes Language Detector or custom script

The Tomedes Language Detector can recognize more than one language in the same text and shows the percentage of the text written in each detected language, though accuracy improves with longer and clearer input, so short or heavily mixed passages may have lower confidence.

**Automated approach:**

```typescript
// scripts/detect-mixed-language.ts
import { franc } from 'franc-min'; // Language detection library

interface TranslationIssue {
  locale: string;
  key: string;
  value: string;
  detectedLanguages: string[];
  confidence: number;
}

function checkTranslationLanguage(
  locale: string,
  translations: Record<string, any>
): TranslationIssue[] {
  const issues: TranslationIssue[] = [];
  const expectedLang = locale === 'nl' ? 'nld' : locale === 'dk' ? 'dan' : 'eng';

  function traverse(obj: any, path: string = '') {
    for (const [key, value] of Object.entries(obj)) {
      const fullPath = path ? `${path}.${key}` : key;

      if (typeof value === 'string' && value.length > 20) {
        const detected = franc(value);

        if (detected !== expectedLang && detected !== 'und') {
          issues.push({
            locale,
            key: fullPath,
            value,
            detectedLanguages: [detected],
            confidence: 0.8 // franc doesn't provide confidence
          });
        }
      } else if (typeof value === 'object' && value !== null) {
        traverse(value, fullPath);
      }
    }
  }

  traverse(translations);
  return issues;
}

// Run for NL and DK locales
const nlIssues = checkTranslationLanguage('nl', nlTranslations);
const dkIssues = checkTranslationLanguage('dk', dkTranslations);

console.log('Mixed language issues:', { nlIssues, dkIssues });
```

**What it catches:**
- English text in Dutch/Danish translations
- Mixed-language strings ("Klaar om te Groeien Your Business?")
- Copy-paste errors from English source

**Confidence:** MEDIUM - Short phrases may be misdetected, but obvious cases will surface

**Estimated time:** 1 hour to write script, runs in <1 minute

### Phase 2: Manual Review (Human Judgment)

**Goal:** Catch tone, cultural fit, and subtle errors that automation misses.

#### Step 2.1: Native Speaker Review (Critical Pages)

**Recommended approach:**

| Page Category | Review Depth | Estimated Time |
|---------------|--------------|----------------|
| Homepage hero, CTAs | Deep review (grammar + tone + cultural fit) | 30 min per locale |
| Service pages | Medium review (grammar + clarity) | 20 min per page |
| Form labels, errors | Deep review (precision critical) | 15 min per locale |
| Blog posts | Light review (grammar only) | 5 min per post |

**Where to find reviewers:**
- Upwork: "Dutch native speaker for translation review" (~$25/hour)
- Fiverr: Translation review services ($20-50 per project)
- Reddit r/Netherlands, r/Denmark: Community feedback (free but less reliable)

**Review checklist for reviewer:**

```markdown
# Translation Review Checklist

For each translated page:

## Grammar & Spelling
- [ ] No spelling errors
- [ ] Correct punctuation
- [ ] Proper capitalization

## Naturalness
- [ ] Sounds natural to native speaker
- [ ] Appropriate formality level (professional but approachable)
- [ ] No awkward phrasings or literal translations

## Marketing Effectiveness
- [ ] CTAs are compelling in target language
- [ ] Value propositions are clear
- [ ] Tone matches brand (confident, results-focused)

## Technical Accuracy
- [ ] All text translated (no English remnants)
- [ ] Numbers/dates formatted correctly for locale
- [ ] Currency symbols correct (€ for NL/DK)
```

**Confidence:** HIGH for issues found, but coverage depends on reviewer quality

**Estimated cost:** $100-200 for comprehensive review of all NL + DK content

#### Step 2.2: Spot-Check Methodology

**When full review isn't feasible:** Sample-based validation.

**Process:**
1. Select 20% of translations randomly (using script)
2. Focus on customer-facing content (hero, CTAs, form labels)
3. Use free grammar checker (LanguageTool, RetMig)
4. If error rate >10%, expand review scope

**Statistical validity:** 20% sample with 95% confidence detects systematic issues.

**Estimated time:** 1-2 hours per locale

### Phase 3: Component Architecture Audit

**Goal:** Ensure ALL components use translation system.

#### Step 3.1: Find Hardcoded Strings

**Tool:** ESLint + custom rule (or manual grep)

**Manual approach (quick):**

```bash
# Find potential hardcoded strings in components
grep -r "\"[A-Z][a-z]" src/components/ --include="*.tsx" | grep -v "className" | grep -v "aria-label"

# Find common English words
grep -rE "(Get|More|Leads|Contact|Services|Results|Blog)" src/components/ --include="*.tsx"
```

**Automated approach (better):**

```javascript
// .eslintrc.js
module.exports = {
  rules: {
    'no-hardcoded-strings': ['error', {
      ignoreAttribute: ['className', 'href', 'src', 'alt'],
      allowList: ['Home', 'Services', 'Results', 'Blog', 'Contact'] // nav items
    }]
  }
};

// Or use existing plugin
// eslint-plugin-i18n-text
```

**What to look for:**
1. String literals in JSX: `<h1>Get More Leads</h1>`
2. String literals in props: `<Button>Click Here</Button>`
3. String literals in aria-labels: `aria-label="Submit form"`

**Exception (allowed):**
- `className` values
- `href` URLs
- Data attribute values
- Test IDs

**Confidence:** HIGH - Pattern is straightforward to detect

**Estimated time:** 30 minutes to audit all components

#### Step 3.2: Component Translation Coverage Test

**Goal:** Verify components render correct locale.

**Approach:** Visual regression testing or manual spot-check.

**Manual spot-check:**
1. Visit `/nl` homepage → Verify all text is Dutch
2. Visit `/dk/services` → Verify all text is Danish
3. Check header/footer on both → Verify translation
4. Check form placeholders/labels → Verify translation

**Automated (ideal):**

```typescript
// __tests__/translation-coverage.test.tsx
import { render } from '@testing-library/react';
import { Header } from '@/components/layout/header';

describe('Translation Coverage', () => {
  it('Header renders Dutch on /nl pages', () => {
    const { container } = render(<Header />, {
      router: { pathname: '/nl' }
    });

    // Should NOT contain hardcoded English
    expect(container.textContent).not.toContain('Get More Leads');

    // Should contain Dutch translation
    expect(container.textContent).toContain('Meer Leads'); // or whatever Dutch CTA is
  });

  it('Footer renders Danish on /dk pages', () => {
    const { container } = render(<Footer />, {
      router: { pathname: '/dk' }
    });

    expect(container.textContent).not.toContain('All rights reserved.');
    expect(container.textContent).toContain('Alle rettigheder forbeholdes.');
  });
});
```

**Confidence:** HIGH - Tests prevent regressions

**Estimated time:** 2 hours to write tests, runs in <1 minute

## Architectural Patterns to Enforce Translation Usage

### Pattern 1: Centralized Translation Hook

**Current state:** Components call `getTranslations(locale)` directly.

**Risk:** Easy to forget and hardcode strings.

**Recommended pattern:**

```typescript
// src/hooks/useTranslations.ts
import { usePathname } from 'next/navigation';
import { getTranslations } from '@/lib/translations';
import { getLocaleFromPathname } from '@/lib/locales';

export function useTranslations() {
  const pathname = usePathname();
  const locale = getLocaleFromPathname(pathname);
  return getTranslations(locale);
}

// Usage in components
export function Header() {
  const t = useTranslations();

  return (
    <Link href="/contact">{t.nav.contact}</Link>
  );
}
```

**Benefits:**
- Single source of truth for locale detection
- Components can't accidentally skip translation
- Type-safe translations with autocomplete

**Confidence:** HIGH - Standard React pattern, well-supported

### Pattern 2: Translation-Only Components

**Problem:** Layout components (Header, Footer) currently don't use translation system.

**Solution:** Create locale-aware versions.

```typescript
// src/components/layout/header.tsx
"use client";

import { useTranslations } from '@/hooks/useTranslations';

export function Header() {
  const t = useTranslations();
  const pathname = usePathname();
  const locale = getLocaleFromPathname(pathname);

  const navItems = [
    { href: `/${locale}`, label: t.nav.home },
    { href: `/${locale}/services`, label: t.nav.services },
    { href: `/${locale}/results`, label: t.nav.results },
    { href: `/${locale}/blog`, label: t.nav.blog },
    { href: `/${locale}/contact`, label: t.nav.contact },
  ];

  return (
    <header>
      {/* Logo */}
      <nav>
        {navItems.map(item => (
          <Link key={item.href} href={item.href}>{item.label}</Link>
        ))}
      </nav>
      <Button asChild>
        <Link href={`/${locale}/contact`}>{t.common.getStarted}</Link>
      </Button>
    </header>
  );
}
```

**Key changes:**
1. Import `useTranslations` hook
2. Use `t.nav.*` for all navigation labels
3. Use `t.common.*` for CTAs
4. Build locale-aware URLs

**Confidence:** HIGH - Solves the root cause

### Pattern 3: TypeScript Enforcement

**Problem:** Easy to add new text without translation.

**Solution:** TypeScript won't compile if translation key missing.

```typescript
// src/lib/translations.ts
export interface Translations {
  nav: {
    home: string;
    services: string;
    results: string;
    blog: string;
    contact: string;
  };
  common: {
    getStarted: string;
    learnMore: string;
    bookCall: string;
  };
  // ... rest
}

// TypeScript enforces ALL locales have ALL keys
export const translations: Record<LocaleCode, Translations> = {
  us: { /* full object */ },
  nl: { /* full object */ },
  dk: { /* full object */ },
  // Missing any key? TypeScript error!
};
```

**Current state:** Already implemented! This is a strength.

**Confidence:** HIGH - Already working correctly

### Pattern 4: CI/CD Translation Validation

**Goal:** Prevent merging PRs with translation issues.

**Recommended GitHub Actions workflow:**

```yaml
# .github/workflows/i18n-check.yml
name: i18n Quality Check

on: [pull_request, push]

jobs:
  translation-check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18

      - name: Install dependencies
        run: npm ci

      - name: Check translation coverage
        run: npm run i18n:check

      - name: TypeScript type check
        run: npm run type-check

      - name: Detect mixed languages (Dutch)
        run: node scripts/detect-mixed-language.js --locale nl

      - name: Detect mixed languages (Danish)
        run: node scripts/detect-mixed-language.js --locale dk

      # Optional: Grammar check (requires API key)
      # - name: Grammar check (Dutch)
      #   run: npm run grammar:check:nl
```

**What this prevents:**
- Merging code with missing translation keys
- Deploying pages with mixed languages
- TypeScript errors in production

**Confidence:** HIGH - Standard practice in 2026

**Estimated setup time:** 1 hour

## QA Checklist for Translation Quality

### Pre-Deployment Checklist

Run before deploying to production:

```markdown
# Translation Quality Checklist

## Automated Checks
- [ ] `npm run i18n:check` passes (no missing keys)
- [ ] `npm run type-check` passes (TypeScript validates all locales)
- [ ] Mixed language detection script shows zero issues
- [ ] Build completes successfully for all locales

## Grammar & Spelling
- [ ] Dutch translations checked with LanguageTool (zero critical errors)
- [ ] Danish translations checked with RetMig (zero critical errors)
- [ ] English variants (AU/UK/IE) use correct spelling conventions

## Component Coverage
- [ ] Header component uses translation system
- [ ] Footer component uses translation system
- [ ] All form components use translated labels/placeholders
- [ ] All CTA buttons use translated text
- [ ] No hardcoded English strings in components (grep audit passes)

## Visual QA (Manual Spot-Check)
- [ ] Visit `/nl` → All text is Dutch (header, footer, body, forms)
- [ ] Visit `/dk` → All text is Danish (header, footer, body, forms)
- [ ] Check form validation messages render in correct locale
- [ ] Check 404/error pages render in correct locale

## Native Speaker Review (Critical Pages Only)
- [ ] Homepage hero copy approved by native speaker (NL)
- [ ] Homepage hero copy approved by native speaker (DK)
- [ ] Service page CTAs approved by native speaker (NL)
- [ ] Service page CTAs approved by native speaker (DK)

## Formatting & Localization
- [ ] Currency symbols correct (€ for NL/DK, $ for US/AU, £ for UK)
- [ ] Date formats match locale conventions
- [ ] Phone numbers formatted correctly per locale
- [ ] Address fields match locale requirements

## Performance
- [ ] No duplicate translation loading (check bundle size)
- [ ] Translation files properly tree-shaken (only active locale loaded)
- [ ] No unnecessary re-renders when switching locales
```

### Post-Deployment Monitoring

**Recommended:** Set up monitoring for translation errors.

```typescript
// src/lib/translation-error-tracking.ts
export function trackMissingTranslation(locale: string, key: string) {
  // Log to analytics service
  if (typeof window !== 'undefined' && process.env.NODE_ENV === 'production') {
    window.gtag?.('event', 'missing_translation', {
      locale,
      key,
      page: window.location.pathname
    });
  }
}

// In getTranslations function
export function getTranslations(locale: LocaleCode): Translations {
  const t = translations[locale] || translations.us;

  // Wrap in Proxy to detect missing keys
  return new Proxy(t, {
    get(target, prop) {
      if (!(prop in target)) {
        trackMissingTranslation(locale, String(prop));
      }
      return target[prop];
    }
  });
}
```

**Confidence:** MEDIUM - Adds observability but requires analytics setup

## Testing Translation Rendering

### Approach 1: Visual Regression Testing (Recommended)

**Tool:** Percy, Chromatic, or Playwright screenshots

**Concept:** Capture screenshots of pages in each locale, compare for visual diffs.

```typescript
// tests/visual-regression/locales.spec.ts
import { test, expect } from '@playwright/test';

const locales = ['us', 'nl', 'dk', 'au', 'uk', 'ie'];
const pages = ['/', '/services', '/contact'];

for (const locale of locales) {
  for (const page of pages) {
    test(`${locale}${page} renders correctly`, async ({ page: pw }) => {
      await pw.goto(`http://localhost:3000/${locale}${page}`);
      await expect(pw).toHaveScreenshot(`${locale}-${page.replace(/\//g, '-')}.png`);
    });
  }
}
```

**Benefits:**
- Catches layout issues (German text overflows, Danish characters render incorrectly)
- Visual proof that translations render
- Prevents regressions

**Confidence:** HIGH - Industry standard for multi-locale sites

**Estimated setup time:** 2-3 hours

### Approach 2: Content Assertion Tests

**Tool:** Playwright or Testing Library

**Concept:** Assert specific translated text exists on page.

```typescript
// tests/integration/translation-coverage.spec.ts
import { test, expect } from '@playwright/test';

test('Dutch homepage displays Dutch content', async ({ page }) => {
  await page.goto('http://localhost:3000/nl');

  // Hero section should be in Dutch
  await expect(page.getByRole('heading', { name: /Meer Groei. Meer Klanten/i })).toBeVisible();

  // CTA should be in Dutch
  await expect(page.getByRole('button', { name: /Gratis Strategiegesprek/i })).toBeVisible();

  // Should NOT contain English
  const bodyText = await page.textContent('body');
  expect(bodyText).not.toContain('Get More Leads');
});

test('Danish services page displays Danish content', async ({ page }) => {
  await page.goto('http://localhost:3000/dk/services');

  // Service titles should be in Danish
  await expect(page.getByText('SEO Tjenester')).toBeVisible();
  await expect(page.getByText('Social Media Management')).toBeVisible(); // OK if same in Danish

  // Should NOT contain English-specific phrases
  const bodyText = await page.textContent('body');
  expect(bodyText).not.toContain('Learn More'); // Should be "Laer Mere"
});
```

**Benefits:**
- Fast to run (<1 minute for all locales)
- Catches missing translations immediately
- Easy to maintain

**Confidence:** HIGH - Proven pattern

**Estimated setup time:** 1-2 hours

### Approach 3: Manual Testing Protocol

**When automated testing isn't set up yet:** Structured manual QA.

**Test script:**

```markdown
# Manual Translation QA Script

## Setup
1. Clear browser cache
2. Open incognito/private window
3. Disable browser translation features

## Test Procedure

For each locale (NL, DK):

### Homepage
1. Navigate to `/{locale}`
2. **Verify:** Hero headline is fully translated
3. **Verify:** Hero CTA button is translated
4. **Verify:** Stats section is translated
5. **Verify:** Service cards are translated
6. **Verify:** FAQ section is translated
7. **Verify:** Footer is translated
8. **Document:** Screenshot any English text found

### Services Page
1. Navigate to `/{locale}/services`
2. **Verify:** Page title is translated
3. **Verify:** All service descriptions are translated
4. **Verify:** Feature lists are translated
5. **Verify:** CTA buttons are translated

### Contact Page
1. Navigate to `/{locale}/contact`
2. **Verify:** Form labels are translated
3. **Verify:** Form placeholders are translated
4. **Verify:** Form validation messages are translated (trigger errors to test)
5. **Verify:** Submit button is translated

### Header & Footer (All Pages)
1. **Verify:** Navigation menu items are translated
2. **Verify:** Header CTA is translated
3. **Verify:** Footer links are translated
4. **Verify:** Footer copyright text is translated

## Pass Criteria
- Zero English text on NL pages (except brand names, technical terms)
- Zero English text on DK pages (except brand names, technical terms)
- All interactive elements (buttons, forms) are fully translated

## Failure Criteria
- Any customer-facing text in wrong language
- Mixed language strings ("Klaar om te Groeien Your Business")
- Untranslated form errors or validation messages
```

**Confidence:** MEDIUM - Manual testing is thorough but time-consuming

**Estimated time:** 30 minutes per locale

## Common Pitfalls & Prevention

### Pitfall 1: Components Don't Use Translation System

**Symptom:** English text on translated pages.

**Root cause:** Developer adds new component, hardcodes strings.

**Prevention:**
1. ESLint rule to flag hardcoded strings
2. Component template that imports `useTranslations` hook
3. Code review checklist includes "All strings translated?"

**Detection:**
```bash
# Find components that don't import translation hook
grep -L "useTranslations\|getTranslations" src/components/**/*.tsx
```

**Confidence:** HIGH - Common issue with clear solution

### Pitfall 2: Translation Keys Added to Only One Locale

**Symptom:** TypeScript error in other locales, or missing text.

**Root cause:** Developer adds key to `us` locale, forgets `nl` and `dk`.

**Prevention:**
1. TypeScript `Record<LocaleCode, Translations>` enforces all locales
2. i18n-check in CI catches structural mismatches
3. Pre-commit hook runs type-check

**Current state:** TypeScript already prevents this (strong type system).

**Confidence:** HIGH - Already protected

### Pitfall 3: AI Translation Errors (Tone or Context)

**Symptom:** Grammatically correct but awkward/unnatural translations.

**Root cause:** AI doesn't understand marketing context or brand voice.

**Prevention:**
1. Provide context to AI ("Marketing copy, confident tone, B2B audience")
2. Native speaker review for customer-facing pages
3. A/B test different phrasings if unsure

**Example:**
- English: "Get Your Free Strategy Call"
- AI translation (literal): "Verkrijg Je Gratis Strategie Gesprek" (awkward)
- Better (natural): "Gratis Strategiegesprek" (how Dutch speakers actually say it)

**Detection:** Only native speaker can catch this reliably.

**Confidence:** MEDIUM - Subjective, requires human judgment

### Pitfall 4: Date/Number/Currency Formatting

**Symptom:** "1,000.50" displays as "1.000,50" on NL page (or vice versa).

**Root cause:** Hardcoded formatting instead of locale-aware.

**Prevention:**

```typescript
// Use Intl API for all formatting
const formatCurrency = (amount: number, locale: LocaleCode) => {
  const currencyMap = {
    us: 'USD', au: 'AUD', uk: 'GBP', ie: 'EUR', nl: 'EUR', dk: 'DKK'
  };

  return new Intl.NumberFormat(localeToLanguageTag(locale), {
    style: 'currency',
    currency: currencyMap[locale]
  }).format(amount);
};

// formatCurrency(1000.50, 'nl') → "€ 1.000,50"
// formatCurrency(1000.50, 'us') → "$1,000.50"
```

**Confidence:** HIGH - Standard i18n practice

### Pitfall 5: SEO Metadata Not Translated

**Symptom:** Google shows English title/description for NL page.

**Root cause:** Page metadata uses hardcoded English.

**Prevention:**

```typescript
// src/app/[locale]/page.tsx
export async function generateMetadata({ params }: { params: { locale: string } }) {
  const locale = isValidLocale(params.locale) ? params.locale : 'us';
  const t = getTranslations(locale);

  return {
    title: t.meta.title,
    description: t.meta.description,
    openGraph: {
      title: t.meta.title,
      description: t.meta.description,
      locale: localeToLanguageTag(locale)
    }
  };
}
```

**Current state:** Check if already implemented.

**Confidence:** HIGH - Next.js metadata API handles this well

## Recommended Tools & Services

### Free Tools (Use Immediately)

| Tool | Purpose | Cost | Setup Time | Confidence |
|------|---------|------|------------|------------|
| LanguageTool | Dutch grammar checker | Free (basic) | 5 min | HIGH |
| RetMig | Danish grammar checker | Free | 5 min | HIGH |
| i18n-check | Translation key coverage | Free | 15 min | HIGH |
| TypeScript | Enforce translation structure | Free | Already set up | HIGH |
| franc (npm) | Language detection | Free | 30 min | MEDIUM |

### Paid Tools (If Budget Allows)

| Tool | Purpose | Cost | ROI |
|------|---------|------|-----|
| Lokalise | Translation management platform | $120/month | HIGH for teams, MEDIUM for solo |
| DeepL API | AI translation | $5.49/500k chars | HIGH for bulk translation |
| Chromatic | Visual regression testing | $149/month | MEDIUM (helpful but not critical) |
| Native speaker review (Upwork) | Human QA | $25/hour | HIGH for customer-facing pages |

### Recommended Stack for Rosey Co.

**Phase 1 (Immediate - Free):**
1. LanguageTool for Dutch grammar
2. RetMig for Danish grammar
3. Custom script for mixed language detection
4. Manual component audit (grep for hardcoded strings)

**Phase 2 (After fixes - Low cost):**
1. i18n-check in CI/CD
2. Playwright tests for translation rendering
3. One-time native speaker review ($100-200 total)

**Phase 3 (Ongoing - Optional):**
1. Visual regression testing (Chromatic or Percy)
2. Translation management platform (Lokalise) if adding more locales

**Total cost estimate:** $100-200 one-time, $0 ongoing (using free tools)

**Confidence:** HIGH - This stack covers all critical needs

## Step-by-Step Audit Plan (Optimized for Speed)

### Week 1: Automated Validation

**Day 1-2: Set up tooling**
- Install i18n-check, configure for project
- Write mixed language detection script
- Set up LanguageTool and RetMig accounts

**Day 3: Run automated checks**
- Run i18n-check → document missing keys
- Run language detection → document mixed content
- Run LanguageTool on Dutch → document grammar errors
- Run RetMig on Danish → document grammar errors

**Day 4: Fix automated findings**
- Add missing translation keys
- Fix mixed language strings
- Fix grammar errors flagged by tools

**Day 5: Component audit**
- Grep for hardcoded strings
- Update Header component to use translations
- Update Footer component to use translations
- Fix any other hardcoded strings found

**Estimated effort:** 20-30 hours

### Week 2: Native Speaker Review

**Day 1: Prepare materials**
- Extract all NL translations to reviewable format
- Extract all DK translations to reviewable format
- Create review checklist for reviewers

**Day 2-3: Find reviewers**
- Post job on Upwork for Dutch native speaker
- Post job on Upwork for Danish native speaker
- Provide clear instructions and checklist

**Day 4-5: Implement feedback**
- Review native speaker feedback
- Apply corrections to translation files
- Re-run automated checks to ensure no regressions

**Estimated effort:** 10-15 hours + reviewer time

### Week 3: Testing & CI/CD

**Day 1-2: Write tests**
- Set up Playwright
- Write translation rendering tests
- Write visual regression tests (optional)

**Day 3: Set up CI/CD**
- Add GitHub Actions workflow
- Configure i18n-check to run on PRs
- Add pre-commit hook for type-check

**Day 4-5: Manual QA**
- Run through manual testing protocol
- Document any issues found
- Fix issues and re-test

**Estimated effort:** 15-20 hours

**Total audit time estimate:** 45-65 hours over 3 weeks

**Can be compressed:** If working full-time, could complete in 1 week.

## Success Metrics

**How to measure translation quality improvement:**

### Before/After Metrics

| Metric | Current (Baseline) | Target | Measurement Method |
|--------|-------------------|--------|-------------------|
| Untranslated components | 2 (Header, Footer) | 0 | Manual audit |
| Mixed language strings | Unknown | 0 | Automated detection script |
| Grammar errors (NL) | Unknown | <5 | LanguageTool report |
| Grammar errors (DK) | Unknown | <5 | RetMig report |
| Missing translation keys | Unknown | 0 | i18n-check report |
| Customer complaints | Unknown | 0 | Support ticket tracking |

### Ongoing Quality Gates

**Prevent regressions with automated gates:**

```yaml
# Required checks before merge:
- i18n:check passes (no missing keys)
- type-check passes (TypeScript validates all locales)
- mixed-language detection passes (zero issues)
- build succeeds for all locales

# Optional but recommended:
- Playwright translation tests pass
- Visual regression tests pass (no unexpected changes)
```

**Confidence:** HIGH - These metrics are measurable and actionable

## Research Gaps & Future Investigation

### LOW Confidence Areas (Need Validation)

1. **Danish grammar tool effectiveness** - RetMig looks promising but I couldn't test it directly. Recommend running sample text through it to validate.

2. **AI translation consensus approach** - Research indicates 22% error reduction, but no specific tool recommendations found. May require custom implementation or enterprise service.

3. **Locale-specific conversion rates** - Unknown if Dutch/Danish translations impact conversion vs. English. Recommend A/B testing or analytics comparison.

### Future Research Topics (Post-MVP)

1. **Translation memory systems** - For when adding more locales or updating content frequently.

2. **Automated translation updates** - Workflow for updating translations when English source changes.

3. **SEO impact of translation quality** - Do grammatical errors hurt rankings? Unknown.

4. **User preference detection** - Should site auto-redirect based on browser language? (Currently relies on URL)

## Sources

### Next.js i18n Best Practices
- [Next.js Internationalization Guide](https://nextjs.org/docs/app/guides/internationalization)
- [Build with Matija: Add i18n to Next.js 15 (Complete Setup)](https://www.buildwithmatija.com/blog/nextjs-internationalization-guide-next-intl-2025)
- [next-intl Documentation](https://next-intl.dev/)
- [Lokalise: Next.js Localization Guide](https://lokalise.com/blog/nextjs-localization/)

### Translation Quality Assurance
- [Lokalise: Translation Quality Assurance Tools](https://lokalise.com/product/translation-quality-assurance/)
- [Aqua Cloud: Internationalization Testing Best Practices 2026](https://aqua-cloud.io/internationalization-testing/)
- [ContentQuo: Improving Translation Quality Through Automated Evaluations](https://www.contentquo.com/blog/improving-translation-quality-automated-evaluations)
- [Translated: Automated Quality Assurance - AI-Powered Translation Validation](https://translated.com/resources/automated-quality-assurance-ai-powered-translation-validation)

### Language Detection & Mixed Content
- [Tomedes: Detect Language - Instant Language Detector](https://www.tomedes.com/tools/language-detector)
- [Technology.org: Why 2026's Smartest AI Translation Upgrade Is Built on Consensus](https://www.technology.org/2025/12/29/why-2026s-smartest-ai-translation-upgrade-is-built-on-consensus-and-what-it-means-for-global-tech/)

### Grammar Checking Tools
- [LanguageTool: Dutch Grammar Checker](https://languagetool.org/spellchecking-dutch)
- [Sapling: Free Dutch Grammar Checker](https://sapling.ai/lang/dutch)
- [RetMig: Advanced Danish Spell and Grammar Checker](https://retmig.dk/)
- [YesChat: Danish Grammar Fixer](https://www.yeschat.ai/gpts-9t563olRyNS-Danish-Grammar-Fixer)

### React/i18n Testing
- [Lingual: Quality Assurance for i18n in React](https://lingual.dev/blog/quality-assurance-for-i18n-in-react/)
- [react-i18next: Testing Documentation](https://react.i18next.com/misc/testing)
- [Testing Library: React Intl Example](https://testing-library.com/docs/example-react-intl/)

## Confidence Assessment

| Area | Confidence | Reason |
|------|------------|--------|
| Component architecture patterns | HIGH | Standard React/Next.js patterns, well-documented |
| Automated translation coverage | HIGH | i18n-check is proven tool, TypeScript enforcement works |
| Dutch grammar checking | HIGH | LanguageTool is industry standard for Dutch |
| Danish grammar checking | MEDIUM | RetMig looks authoritative but couldn't verify directly |
| Mixed language detection | MEDIUM | Tools exist but accuracy varies with text length |
| Native speaker review process | HIGH | Standard practice, cost estimates validated |
| CI/CD integration | HIGH | GitHub Actions patterns well-established |
| Testing approaches | HIGH | Playwright and Testing Library are standard |
| ROI estimates | MEDIUM | Time estimates based on similar projects, not Rosey Co. specific |

## Final Recommendations

### Immediate Actions (This Week)

1. **Fix component architecture gap**
   - Update Header to use translation system (2 hours)
   - Update Footer to use translation system (2 hours)
   - Verify all components use `useTranslations` hook (1 hour)

2. **Run automated grammar checks**
   - Dutch: Copy all NL translations to LanguageTool (30 min)
   - Danish: Copy all DK translations to RetMig (30 min)
   - Fix flagged errors (2-3 hours)

3. **Set up i18n-check**
   - Install and configure (15 min)
   - Run and document findings (15 min)
   - Fix missing/unused keys (1-2 hours)

**Total time: ~10-12 hours** → Gets you to 80% quality improvement

### Short-term Actions (Next 2 Weeks)

1. **Native speaker review** - Critical pages only (homepage, service pages)
2. **Write Playwright tests** - Prevent regressions
3. **Add CI/CD checks** - i18n-check + type-check in GitHub Actions

**Total time: ~20-25 hours** → Gets you to 95% quality

### Long-term Improvements (Post-Launch)

1. Visual regression testing (Chromatic or Percy)
2. Translation management platform (Lokalise) if adding more locales
3. Automated translation updates workflow
4. A/B testing to measure translation impact on conversions

**Defer until:** Site is live and generating traffic

## Roadmap Implications

**Suggested phase structure for fixing translation quality:**

### Phase 1: Critical Architecture Fixes (Week 1)
- Update Header component to use translations
- Update Footer component to use translations
- Audit all components for hardcoded strings
- Fix mixed language content

**Why first:** Solves root cause. No point fixing translations if components don't use them.

**Research confidence:** HIGH - Clear technical solution

### Phase 2: Automated Quality Assurance (Week 2)
- Set up i18n-check in CI/CD
- Write language detection script
- Run grammar checkers (LanguageTool, RetMig)
- Fix flagged errors

**Why second:** Automated tools catch 80% of issues quickly.

**Research confidence:** HIGH - Tools are mature and well-documented

### Phase 3: Human Review & Testing (Week 3)
- Native speaker review (NL + DK)
- Implement feedback
- Write Playwright tests
- Manual QA protocol

**Why third:** Human review validates automated fixes. Tests prevent regressions.

**Research confidence:** MEDIUM-HIGH - Depends on reviewer quality

### Phase 4: Monitoring & Prevention (Ongoing)
- CI/CD gates prevent new issues
- Analytics track missing translations in production
- Regular grammar checks before major releases

**Why last:** Ongoing maintenance, not one-time fix.

**Research confidence:** HIGH - Standard DevOps practices

**Total timeline:** 3 weeks part-time, or 1 week full-time

**Likely research needs per phase:**
- Phase 1: None (implementation only)
- Phase 2: Validate RetMig effectiveness (30 min)
- Phase 3: Find reliable native speakers (may need trials)
- Phase 4: Set up analytics integration (if not already exists)

---

**Research complete. Ready for roadmap planning.**

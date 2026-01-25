# Multi-Locale Website Research Summary

**Project:** Rosey Co. Global Marketing Agency Website
**Date:** 2026-01-25
**Scope:** Multi-locale implementation with 6 locales (US, AU, UK, IE, NL, DK)
**Status:** Research Complete - Ready for Roadmap Planning

---

## Executive Summary

The Rosey Co. website requires a comprehensive multi-locale architecture spanning geolocation detection, translation quality assurance, architectural enforcement, and performance optimization. Research across four domains reveals that **the current implementation has working locale routing but critical gaps in enforcement, SEO configuration, and translation quality that must be addressed before launch.**

**Key Insight:** The architecture is fundamentally sound (Next.js 16 App Router with `[locale]` dynamic segments) but lacks the enforcement mechanisms and SEO foundations to prevent regressions and maximize global search visibility. The biggest risks are incomplete hreflang implementation (missing 3 of 6 locales), hardcoded English components bypassing the translation system, and duplicate content penalties for the 4 English locale variants.

**Recommended Approach:** Implement a layered enforcement strategy using TypeScript constraints, React cache patterns for locale access, centralized formatting utilities, and build-time validation. Prioritize fixing critical SEO gaps (hreflang, geolocation redirects) before launch, then systematically improve translation quality and content localization in phases post-launch.

---

## Key Findings by Research Area

### 1. Geolocation & Locale Persistence (GEOLOCATION.md)

**Stack Recommendation:**
- **next-intl** (v4.0.0+) - Industry standard for Next.js 16 App Router with 931K weekly downloads
- **Vercel Edge Middleware** with `@vercel/functions` geolocation helper
- **HTTP-only session cookie** (NEXT_LOCALE) for persistence - NOT localStorage

**Critical Findings:**
- Cookie-based persistence is the only viable option for middleware-based locale detection (localStorage not accessible server-side)
- Geolocation detection priority: Pathname prefix → Cookie → Geo-detection → Accept-Language header → Default (us)
- GDPR requires cookie consent for EU locales (NL, DK, IE) - conservative approach treats locale cookie as non-essential

**Dual Locale Switcher UX Pattern:**
- Header (top-right dropdown with flags) - Primary
- Footer (simple text link) - Secondary
- Mobile menu (within hamburger) - Required

**Confidence:** HIGH - next-intl is verified official Next.js partner solution with comprehensive documentation

---

### 2. Translation Quality & Architecture (TRANSLATION_QUALITY.md)

**CRITICAL GAP IDENTIFIED:** Header and Footer components have hardcoded English text and bypass the translation system entirely.

**Root Cause Analysis:**
- `header.tsx` - Hardcoded "Get More Leads" button (lines 107, 183)
- `footer.tsx` - All text hardcoded in English (brand description, headings, contact info)
- Both components detect locale from URL but don't fetch translations

**Three Categories of Translation Issues:**
1. **Hardcoded English components** - Architectural gap, not translation problem
2. **Mixed language content** - English phrases embedded in translated pages
3. **Grammatical errors** - Dutch and Danish translations contain linguistic errors

**Recommended QA Tooling:**
- **Dutch grammar:** LanguageTool (free tier, HIGH confidence)
- **Danish grammar:** RetMig (advanced Danish checker, HIGH confidence)
- **Translation coverage:** i18n-check (missing/unused keys, HIGH confidence)
- **Mixed language detection:** franc library + custom script (MEDIUM confidence)

**Audit Time Estimate:** 45-65 hours over 3 weeks for complete quality improvement (can compress to 1 week full-time)

**Immediate Actions (10-12 hours):**
1. Fix Header component to use translation system (2 hours)
2. Fix Footer component to use translation system (2 hours)
3. Run automated grammar checks (LanguageTool, RetMig) - 1 hour
4. Set up i18n-check validation (30 min)
5. Fix flagged errors (3-5 hours)

**Confidence:** HIGH for tooling and process, MEDIUM for Danish grammar validation

---

### 3. Multi-Locale Architecture Enforcement (ARCHITECTURE.md)

**Recommended Pattern:** Layered enforcement strategy combining TypeScript, utility functions, centralized formatting, and build-time validation.

**Layer 1: React Cache for Server Components**
```typescript
// Zero prop drilling - locale accessible from any Server Component
export const getLocale = cache((): LocaleCode => {
  return getLocaleFromCache();
});
```

**Layer 2: Context Provider for Client Components**
```typescript
export function useLocale(): LocaleCode {
  const locale = useContext(LocaleContext);
  return locale;
}
```

**Layer 3: Centralized Intl API Formatters**
```typescript
// Currency, dates, numbers via native Intl API (zero dependencies)
formatCurrency(1299, 'nl') // "€ 1.299,00"
formatCurrency(1299, 'us') // "$1,299.00"
```

**Layer 4: Build-Time Static Generation**
- `generateStaticParams()` already validates all locales at build time
- Build fails if ANY locale has missing translations or errors
- Additional validation script recommended for pre-build checks

**Anti-Patterns to Avoid:**
- Pathname parsing for locale detection (fragile, no type safety)
- Direct translation object access (no fallback handling)
- Hardcoded currency symbols (scattered logic, not extensible)
- Locale-specific components (massive duplication)

**Migration Path:** Incremental over 2-3 weeks with low breaking change risk

**Confidence:** HIGH for React cache pattern (official Next.js/React pattern used by next-intl)

---

### 4. Performance & SEO Optimization (PERFORMANCE_SEO.md)

**CRITICAL SEO GAP:** Incomplete hreflang implementation - only 3 of 6 locales in alternates (US, NL, DK). Missing AU, UK, IE will cause Google to not recognize these as related versions.

**Hreflang Fix Required:**
```typescript
alternates: {
  canonical: `/${locale}`,
  languages: {
    'x-default': '/us',    // Fallback for unmatched locales
    'en-US': '/us',
    'en-AU': '/au',        // MISSING
    'en-GB': '/uk',        // MISSING
    'en-IE': '/ie',        // MISSING
    'nl-NL': '/nl',
    'da-DK': '/dk',
  },
}
```

**Geolocation Redirect Strategy:**
- **Server-side 302 redirects** (temporary) via Next.js Middleware - RECOMMENDED
- **JavaScript redirects** harm SEO significantly (no HTTP status, requires rendering)
- Cookie preference storage to prevent redirect loops
- Treat Googlebot same as regular visitors (don't block crawlers)

**Duplicate Content Risk for English Locales:**
- 4 English locales (US/AU/UK/IE) with 99% identical content risk penalties
- Hreflang alone is NOT enough - requires content localization
- "Transcreation" approach in 2026: adapt for local market references, terminology, case studies
- MVP strategy: Localize high-priority pages (homepage, services, contact), defer blog localization

**Performance Targets:**
- Lighthouse: 90+ on all metrics (Performance, Accessibility, Best Practices, SEO)
- Core Web Vitals 2025: LCP <2.5s, INP <200ms, CLS <0.1
- Only 47% of sites meet Google's thresholds today

**Critical Performance Fixes:**
1. Add `priority={true}` to hero images (reduces LCP)
2. Use `<Script strategy="afterInteractive">` for analytics
3. Framer Motion: GPU-accelerated properties only, `whileInView` with `once: true`
4. Dynamic imports for heavy components (can cut bundle by 67%)

**Google Search Console Configuration:**
- International Targeting report DEPRECATED in 2025
- Use Domain property (not URL prefix) to cover all locales
- Monitor performance filtered by page path (`/us/*`, `/au/*`, etc.)

**Confidence:** HIGH for hreflang and performance patterns, MEDIUM for content localization ROI

---

## Implications for Roadmap

### Phase Structure Recommendations

Based on combined research, the following phase structure optimizes for critical path dependencies and risk mitigation:

---

### **Phase 1: Critical SEO Foundation** (BEFORE LAUNCH - Week 1)
**Priority: BLOCKER** - Cannot launch without these fixes

**What it delivers:** Properly configured multi-locale SEO to avoid duplicate content penalties and ensure Google recognizes all locale variants.

**Features from research:**
- Fix incomplete hreflang (add AU, UK, IE, x-default to all pages)
- Add self-referential canonical tags per locale
- Verify structured data (LocalBusiness per locale with correct contact info)
- Add priority loading to hero images (`priority={true}`)
- Optimize analytics script loading (`strategy="afterInteractive"`)
- Run Lighthouse audits (target 90+ all metrics)
- Submit sitemap to Google Search Console (Domain property)

**Pitfalls to avoid:**
- CRITICAL: Missing hreflang locales causes Google to randomly pick one version for global ranking
- WARNING: JavaScript redirects harm SEO - use server-side 302 only
- CAUTION: Canonical tags conflicting with hreflang (67% of sites have this error)

**Research confidence:** HIGH
**Needs `/gsd:research-phase`:** NO (implementation only, patterns documented)
**Estimated effort:** 8-12 hours

---

### **Phase 2: Component Architecture Fixes** (BEFORE LAUNCH - Week 1)
**Priority: CRITICAL** - Solves root cause of translation gaps

**What it delivers:** All components use translation system with zero hardcoded strings. Foundation for translation quality enforcement.

**Features from research:**
- Create `src/lib/locale-context.ts` with getLocale() using React cache
- Create `src/providers/locale-provider.tsx` with useLocale() hook
- Update `src/app/[locale]/layout.tsx` to initialize locale context
- Migrate Header component to use translations (currently hardcoded English)
- Migrate Footer component to use translations (currently hardcoded English)
- Create `src/lib/formatters.ts` with currency/number/date formatters
- Audit all components for hardcoded strings (grep search)

**Pitfalls to avoid:**
- CRITICAL: No point fixing translations if components don't consume them
- WARNING: Pathname parsing for locale detection is fragile (use context instead)
- CAUTION: Hardcoded currency symbols scattered across components

**Research confidence:** HIGH
**Needs `/gsd:research-phase`:** NO (clear architectural pattern, incremental migration)
**Estimated effort:** 10-15 hours

---

### **Phase 3: Translation Quality Assurance** (BEFORE LAUNCH - Week 2)
**Priority: HIGH** - User-facing quality, credibility impact

**What it delivers:** Grammatically correct, natural-sounding translations with automated QA to catch regressions.

**Features from research:**
- Set up i18n-check in package.json (translation key coverage)
- Write mixed language detection script (franc library)
- Run LanguageTool on Dutch translations (grammar/spelling)
- Run RetMig on Danish translations (advanced grammar)
- Fix flagged errors in translation files
- Add missing translation keys (header, footer, forms)
- Create validation script for pre-build checks (`scripts/validate-locales.ts`)
- Add GitHub Actions workflow for i18n quality checks

**Pitfalls to avoid:**
- WARNING: AI translation errors in tone/context (Dutch "Verkrijg Je Gratis Strategie Gesprek" vs natural "Gratis Strategiegesprek")
- CAUTION: TypeScript enforces structure but not linguistic quality
- MINOR: Short phrases may be misdetected by language detection script

**Research confidence:** HIGH for tooling, MEDIUM for Danish grammar validation
**Needs `/gsd:research-phase`:** NO (tools documented, process clear)
**Estimated effort:** 15-20 hours

---

### **Phase 4: Geolocation & Locale Switcher** (POST-LAUNCH - Week 1-2)
**Priority: HIGH** - UX improvement, not blocker

**What it delivers:** Automatic locale detection for first-time visitors with manual override capability.

**Features from research:**
- Install next-intl and @vercel/functions
- Create `src/middleware.ts` with geolocation logic (server-side 302 redirects)
- Configure country-to-locale mapping (NL→nl, DK→dk, AU→au, GB→uk, IE→ie, US→us)
- Implement cookie preference storage (NEXT_LOCALE, 30-day expiration)
- Create LocaleSwitcher component (header dropdown with flags)
- Add locale switcher to footer (text link)
- Add locale switcher to mobile menu
- Test redirect flow with VPN across all countries
- Implement GDPR cookie consent banner for EU locales (CookieYes or Cookiebot)

**Pitfalls to avoid:**
- CRITICAL: Use 302 (temporary) not 301 (permanent) redirects for geo-based routing
- WARNING: Redirect loops if cookie not set immediately after first redirect
- CAUTION: Geolocation ~95-99% accurate at country level (VPNs may misroute)

**Research confidence:** HIGH for technical implementation, MEDIUM for GDPR tool selection
**Needs `/gsd:research-phase`:** NO (next-intl patterns well-documented)
**Estimated effort:** 10-14 hours

---

### **Phase 5: Content Localization** (POST-LAUNCH - Month 1-2)
**Priority: MEDIUM** - SEO optimization, conversion improvement

**What it delivers:** Differentiated content per locale to avoid duplicate content penalties and improve local relevance.

**Features from research:**
- Localize homepage hero copy for each market (US brands vs Australian businesses)
- Adapt service page terminology (US "digital marketing" vs UK "digital PR")
- Add locale-specific case studies/testimonials
- Implement spelling differences (US optimize vs UK optimise, US color vs UK colour)
- Update currency references throughout (USD, GBP, AUD, EUR, DKK)
- Adapt seasonal references (seasons reversed in AU)
- Add legal requirement emphasis (GDPR for UK/IE, different in US)
- Native speaker review for critical pages (Upwork, $100-200 total)

**Pitfalls to avoid:**
- WARNING: Hreflang + identical content = Google picks one version globally
- CAUTION: 99% identical English locales dilute rankings
- MINOR: A/B test different phrasings if conversion impact unclear

**Research confidence:** MEDIUM (execution requires ongoing content work)
**Needs `/gsd:research-phase`:** MAYBE (content strategy for differentiation, ROI analysis)
**Estimated effort:** 20-40 hours (varies by scope)

---

### **Phase 6: Performance Optimization** (POST-LAUNCH - Month 2-3)
**Priority: MEDIUM** - Maintain 90+ Lighthouse scores with real traffic

**What it delivers:** Production-ready performance matching Lighthouse targets with real user monitoring.

**Features from research:**
- Monitor Core Web Vitals in Google Search Console (field data)
- Optimize Framer Motion animations (GPU-accelerated properties, viewport optimization)
- Implement dynamic imports for heavy components (BunnyStream video player)
- Add visual regression testing (Playwright screenshots per locale)
- Fine-tune based on real user metrics from Microsoft Clarity
- Ensure Tailwind purge configuration correct (remove unused CSS)
- Monitor bundle size per locale (translation files properly tree-shaken)

**Pitfalls to avoid:**
- WARNING: Lighthouse 90+ locally doesn't guarantee field data performance
- CAUTION: Third-party scripts (analytics, chatbot) can degrade performance
- MINOR: Framer Motion `whileInView` without `once: true` causes re-animation on scroll

**Research confidence:** HIGH for strategies, MEDIUM for real-world performance
**Needs `/gsd:research-phase`:** NO (optimization patterns clear)
**Estimated effort:** 15-25 hours

---

### **Phase 7: Monitoring & Continuous Improvement** (ONGOING)
**Priority: LOW** - Post-launch optimization based on data

**What it delivers:** Data-driven insights to prioritize future localization and performance work.

**Features from research:**
- Track impressions/clicks per locale in Google Search Console
- Monitor for duplicate content warnings (Coverage report)
- Compare conversion rates by locale in Google Analytics
- Identify underperforming locales for prioritization
- A/B test localized content variants
- Expand structured data (FAQPage, BlogPosting schemas)
- Implement translation memory system (Lokalise) if adding more locales

**Pitfalls to avoid:**
- WARNING: One locale getting 80%+ of traffic indicates hreflang failure
- CAUTION: Low impressions in target country suggests localization insufficient

**Research confidence:** MEDIUM (depends on analytics setup and business priorities)
**Needs `/gsd:research-phase`:** MAYBE (analytics attribution strategy, A/B test framework)
**Estimated effort:** Ongoing (5-10 hours/month)

---

## Research Flags: Which Phases Need Deeper Research?

| Phase | Research Needed? | Why |
|-------|------------------|-----|
| **Phase 1: SEO Foundation** | ❌ NO | Implementation only, patterns documented |
| **Phase 2: Component Architecture** | ❌ NO | Clear architectural pattern, incremental migration |
| **Phase 3: Translation QA** | ❌ NO | Tools documented, process clear |
| **Phase 4: Geolocation** | ❌ NO | next-intl patterns well-documented |
| **Phase 5: Content Localization** | ⚠️ MAYBE | Content strategy for differentiation, ROI analysis |
| **Phase 6: Performance** | ❌ NO | Optimization patterns clear |
| **Phase 7: Monitoring** | ⚠️ MAYBE | Analytics attribution strategy, A/B test framework |

**Recommendation:** Phase 5 (Content Localization) may benefit from `/gsd:research-phase` if:
- Team wants data-driven content differentiation strategy
- Need to quantify ROI of localization vs shared content
- Unclear how to prioritize which pages to localize first

---

## Confidence Assessment

| Research Area | Confidence | Reason |
|---------------|------------|--------|
| **Geolocation (next-intl)** | HIGH | Official Next.js partner, 931K weekly downloads, verified docs |
| **Translation Quality Tooling** | HIGH | LanguageTool and i18n-check proven, RetMig authoritative for Danish |
| **Architecture Patterns** | HIGH | React cache pattern official from React team, used by next-intl |
| **Hreflang Implementation** | HIGH | Official Google documentation, clear Next.js patterns |
| **Geolocation Redirects** | HIGH | Multiple authoritative sources confirm server-side 302 superiority |
| **Performance Optimization** | HIGH | Next.js built-in optimizations proven, Lighthouse strategies documented |
| **Content Localization Strategy** | MEDIUM | Best practices clear, but execution requires ongoing content work |
| **GDPR Cookie Tool Selection** | LOW | Multiple options, business decision needed (CookieYes vs Cookiebot) |
| **Content Differentiation ROI** | LOW | No data on how much localization is "enough" to avoid penalties |

---

## Gaps to Address During Planning

### Known Gaps (From Research)

**1. Native Speaker Review Budget (Phase 3)**
- **What:** Professional review of Dutch and Danish translations
- **Cost:** $100-200 total (Upwork/Fiverr)
- **Decision needed:** Budget approval, timeline for review

**2. GDPR Cookie Consent Tool (Phase 4)**
- **Options:** CookieYes (free tier), Cookiebot (paid), custom implementation
- **Decision needed:** Feature requirements, budget
- **Recommendation:** Start with CookieYes free tier, evaluate post-MVP

**3. Content Localization Scope (Phase 5)**
- **What:** How many pages to localize, how much differentiation required
- **Unknown:** ROI of full blog localization vs shared content
- **Decision needed:** Content strategy, resource allocation
- **Recommendation:** Start with high-priority pages (homepage, services, contact)

**4. Analytics Attribution per Locale (Phase 7)**
- **What:** How to properly track conversions per locale in GA4
- **Unknown:** Should each locale have separate conversion goals?
- **Decision needed:** Analytics configuration strategy
- **Recommendation:** Defer to post-launch, evaluate after traffic data available

### Open Technical Questions

**1. Middleware Performance Impact**
- **Question:** Does Vercel Edge Middleware add latency to every request?
- **Validation needed:** Run Lighthouse with/without middleware to measure
- **Risk:** LOW (Edge middleware optimized for this, minimal overhead expected)

**2. Duplicate Content Penalty Threshold**
- **Question:** At what similarity percentage does Google penalize content?
- **Validation needed:** Monitor Search Console duplicate content warnings post-launch
- **Risk:** MEDIUM (4 English locales with high similarity)

**3. Translation Memory System (Future)**
- **Question:** When to implement translation management platform (Lokalise)?
- **Trigger:** Adding 7+ locales, or frequent content updates across locales
- **Risk:** LOW (not needed for MVP, revisit if expanding)

---

## Critical Success Criteria

### Pre-Launch Checklist (Blockers)

Must be complete before production launch:

- [ ] **Hreflang complete** - All 6 locales + x-default in alternates
- [ ] **Components translated** - Header and Footer use translation system
- [ ] **Lighthouse 90+** - All core pages achieve target scores
- [ ] **Build validates** - All 213+ pages build successfully for all locales
- [ ] **Structured data** - LocalBusiness schema per locale with correct contact info
- [ ] **Sitemap submitted** - Google Search Console configured with Domain property

### Post-Launch Success Metrics (30-day)

Indicators of successful multi-locale implementation:

- **SEO Health:**
  - All 213+ pages indexed across 6 locales
  - Hreflang tags recognized by Google (no errors in Coverage report)
  - Each locale ranks in target country searches
  - Zero duplicate content warnings

- **Performance:**
  - Field data Core Web Vitals: LCP <2.5s, INP <200ms, CLS <0.1
  - Lighthouse scores maintain 90+ in production
  - No locale-specific performance degradation

- **User Experience:**
  - Geolocation redirect accuracy >95%
  - Locale switcher usage <5% (indicates good auto-detection)
  - No translation-related support tickets

- **Business Metrics:**
  - Traffic distributed appropriately per locale (no single locale >60% of total)
  - Conversion rates comparable across English locales
  - Local testimonials/case studies increase engagement

---

## Ready for Roadmap Planning

All four research domains (Geolocation, Translation Quality, Architecture, Performance/SEO) have been thoroughly investigated with actionable findings. The recommended 7-phase structure balances critical path dependencies (SEO foundation and component architecture must precede translation QA), risk mitigation (fix hardcoded components before improving translation quality), and development velocity (incremental migration, ship fast).

**Key Decision Points for Product Owner:**

1. **Phase 1-3 are BLOCKERS** - Must complete before launch (estimated 35-47 hours total)
2. **Phase 4 can ship immediately post-launch** - UX improvement, not SEO blocker (10-14 hours)
3. **Phase 5 scope flexibility** - Start minimal, expand based on Search Console data (20-40 hours)
4. **Phase 6-7 are ongoing** - Performance monitoring and optimization (5-10 hours/month)

**Total Estimated Effort to Launch-Ready:** 45-61 hours (Phases 1-3)
**Total Estimated Effort with Geolocation:** 55-75 hours (Phases 1-4)

**Next Step:** Orchestrator proceeds to requirements definition with this research as foundation.

---

## Sources Summary

Research synthesized from 60+ sources across four domains:

### Geolocation & Locale Persistence
- next-intl official documentation (middleware, routing, navigation)
- Vercel Edge Functions geolocation guide
- GDPR cookie consent compliance guides (2025-2026 updates)
- Multi-locale UX best practices (language selector design)

### Translation Quality
- Next.js i18n best practices (Lokalise, next-intl docs)
- Translation QA automation (LanguageTool, RetMig, i18n-check)
- React i18n testing patterns (Testing Library, react-i18next)
- AI translation consensus research (22% error reduction findings)

### Architecture Enforcement
- Next.js 16 App Router internationalization guide
- React Server Components patterns (prop drilling solutions)
- TypeScript enforcement strategies (branded types, HOC patterns)
- Intl API formatting (currency, dates, numbers)

### Performance & SEO
- Google official documentation (localized versions, hreflang, multi-regional sites)
- Core Web Vitals 2025 benchmarks and optimization
- Next.js 15 performance improvements (static generation, fetch cache)
- Framer Motion performance optimization
- Lighthouse 100 checklist for Next.js applications

**Overall Research Confidence:** HIGH for technical implementation, MEDIUM for content strategy and business decisions

---

**Research Complete - 2026-01-25**

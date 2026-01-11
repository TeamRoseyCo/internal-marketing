# SEO Strategy - Rosey Co

## Overview

This document outlines the SEO strategy for Rosey Co, a global social media marketing agency.

## Multi-Location Strategy

### Implementation Status

| Location | Subdirectory | Language | Status |
|----------|--------------|----------|--------|
| United States | `/us/` | English | ✅ Implemented |
| Netherlands | `/nl/` | Dutch (Nederlands) | ✅ Implemented |
| Denmark | `/dk/` | Danish (Dansk) | ✅ Implemented |
| Australia | `/au/` | English | ✅ Implemented |
| United Kingdom | `/uk/` | English | ✅ Implemented |
| Ireland | `/ie/` | English | ✅ Implemented |

### Implemented Pages (per locale)

All pages fully translated to locale language:

- [x] Homepage (`/[locale]/`)
- [x] Services Overview (`/[locale]/services/`)
- [x] SEO Service (`/[locale]/services/seo/`)
- [x] Social Media Service (`/[locale]/services/social-media/`)
- [x] Paid Ads Service (`/[locale]/services/paid-ads/`)
- [x] Website Design Service (`/[locale]/services/website-design/`)
- [x] Contact Page (`/[locale]/contact/`)
- [x] Results Page (`/[locale]/results/`)
- [x] Privacy Policy (`/[locale]/privacy-policy/`)
- [x] Blog Listing (`/[locale]/blog/`)
- [x] Blog Posts (`/[locale]/blog/[slug]/`)

### Geo-Redirect Middleware

Implemented in `src/middleware.ts`:

- Automatically redirects users based on country (via `x-vercel-ip-country` header)
- Sets `LOCALE_REDIRECTED` cookie to prevent redirect loops (30-day expiry)
- Skips redirect for static files, API routes, and existing locale routes

### Key Files

| File | Purpose |
|------|---------|
| `src/lib/locales.ts` | Locale configuration (codes, languages, contact info) |
| `src/lib/translations.ts` | Homepage translations |
| `src/lib/page-translations.ts` | All page translations (services, contact, results, privacy, blog) |
| `src/middleware.ts` | Geo-redirect middleware |
| `src/app/[locale]/` | Dynamic locale route structure |
| `src/app/[locale]/blog/` | Locale-aware blog listing |
| `src/app/[locale]/blog/[slug]/` | Locale-aware blog posts |
| `src/components/blog/translate-button.tsx` | Google Translate integration for NL/DK |

### Benefits

- Full SEO power for each location
- Different Google Business Profile per location
- Location-specific contact info, phone numbers, addresses
- Ranks in local searches for each area
- Native language content for non-English markets

### Regional English Variations

For AU, UK, and IE locales, we use regional English variations:

| Locale | Spelling | Currency | Examples |
|--------|----------|----------|----------|
| AU | Australian English | AUD ($2,500/month) | "dollar-for-dollar" |
| UK | British English | GBP (£1,200/month) | "optimisation", "whilst", "adverts" |
| IE | Irish English | EUR (€1,500/month) | "euro-for-euro", British spelling |

### Blog Translation Strategy

Blog posts remain in English (original content) with:
- Translated UI elements (hero, categories, newsletter CTA, navigation)
- Locale-aware date formatting (nl-NL, da-DK, en-GB, etc.)
- **Translate Button** for NL/DK locales:
  - Uses Google Translate Widget for in-page translation
  - Works on localhost and production
  - Shows "Vertaal naar Nederlands" / "Oversæt til dansk"
  - Allows reverting to original English
  - Located in `src/components/blog/translate-button.tsx`

## Technical SEO

### Metadata

Using Next.js Metadata API with `generateMetadata()` for dynamic locale-aware metadata:

```typescript
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = getTranslations(locale);

  return {
    title: `${t.meta.title} | Rosey Co`,
    description: t.meta.description,
    alternates: {
      canonical: `https://roseyco.com/${locale}/page`,
      languages: {
        'en': 'https://roseyco.com/us/page',
        'nl': 'https://roseyco.com/nl/page',
        'da': 'https://roseyco.com/dk/page',
      },
    },
    openGraph: {
      title: `${t.meta.title} | Rosey Co`,
      description: t.meta.description,
      locale: localeConfig.languageCode,
    },
  };
}
```

### Hreflang Tags

- [x] Implemented via `alternates.languages` in metadata
- Automatically generates hreflang links for all locales
- Helps search engines serve correct language version

### Static Generation

- [x] All locale pages use `generateStaticParams()` for static generation
- No runtime performance impact
- Fast page loads across all locales

### Structured Data (JSON-LD)

Required schemas:
- [x] Organization - Global schema in root layout
- [x] WebSite - Global schema in root layout
- [x] LocalBusiness (per location) - Added to locale layout
- [x] Service (per service page) - Added to all 4 service pages
- [x] Article (for blog posts) - Added to blog post pages
- [ ] FAQPage (where applicable) - Component ready, needs integration on FAQ sections

**Implementation:** `src/components/seo/structured-data.tsx`

### Sitemap

Next.js auto-generates sitemap at `/sitemap.xml`. Configure in `app/sitemap.ts`.

- [x] Update sitemap to include all locale pages - Implemented in `src/app/sitemap.ts`

### Robots.txt

Located at `public/robots.txt` or generated via `app/robots.ts`.

## On-Page SEO Checklist

- [x] Unique title tag (50-60 characters) - via translations
- [x] Meta description (150-160 characters) - via translations
- [x] H1 tag (one per page, includes primary keyword)
- [x] Proper heading hierarchy (H1 → H2 → H3)
- [ ] Internal linking to relevant pages
- [ ] Image alt text for all images
- [x] Open Graph tags - via metadata
- [ ] Twitter Card tags
- [x] Canonical URL - via alternates
- [x] Hreflang tags - via alternates.languages

## Performance Targets

| Metric | Target |
|--------|--------|
| Lighthouse Performance | 90+ |
| Lighthouse Accessibility | 90+ |
| Lighthouse Best Practices | 90+ |
| Lighthouse SEO | 90+ |
| Core Web Vitals | Pass |

## Tools & Integrations

### To Set Up

- [ ] Google Search Console
- [ ] Google Analytics 4
- [ ] Microsoft Clarity (heatmaps)

### Best Practices

- All images use Next.js `<Image>` component
- Lazy load below-fold content
- Minimize JavaScript bundle
- Proper heading hierarchy
- Mobile-first responsive design

## Keyword Strategy

### Primary Services

| Service | Primary Keywords |
|---------|-----------------|
| SEO | seo agency, seo services, search engine optimization |
| Social Media Management | social media management, social media agency |
| Paid Ads | google ads agency, meta ads, ppc management |
| Website Design | website design, web development agency |

### Location Keywords

Combine service keywords with location modifiers:
- "SEO agency United States" / "SEO bureau Nederland" / "SEO bureau Danmark"
- "Social media management USA" / "Social media beheer" / "Social media styring"
- "Google Ads agency" / "Google Ads bureau" / "Google Ads bureau"

## Content Strategy

### Blog

- Target long-tail keywords
- Answer common questions
- Provide actionable value
- Internal link to service pages
- [ ] Migrate blog posts to locale structure (future consideration)

### Case Studies

- Include specific metrics and results
- Target "[service] case study" keywords
- Build trust and credibility

## Adding New Locales

To add additional locales (e.g., CA, DE, FR):

1. Add locale config to `src/lib/locales.ts` (type + config object)
2. Add translations to `src/lib/translations.ts` (or use US English fallback)
3. Add translations to `src/lib/page-translations.ts` (or use fallback)
4. Update middleware `LOCALE_MAP` in `src/middleware.ts`
5. Pages with inline content (paid-ads, social-media, website-design) need locale entries added
6. `generateStaticParams()` functions auto-update via locales config

## Build Statistics

Current build generates **211 pages**:

| Route Type | Count |
|------------|-------|
| Homepage per locale | 6 |
| Services pages per locale | 30 (5 pages × 6 locales) |
| Other pages per locale | 18 (contact, results, privacy × 6) |
| Blog listing per locale | 6 |
| Blog posts per locale | 114 (19 posts × 6 locales) |
| Non-locale pages | 37 (blog, services, etc.) |

## Future Considerations

- [ ] AMP pages for blog posts (if beneficial)
- [ ] Schema markup for reviews and ratings
- [ ] Location-specific testimonials and case studies
- [ ] Translated blog post content (manual translation for key posts)

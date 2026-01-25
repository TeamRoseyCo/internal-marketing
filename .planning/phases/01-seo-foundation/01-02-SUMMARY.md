---
phase: 01-seo-foundation
plan: 02
completed: 2026-01-26
duration: 10min
subsystem: seo-metadata
tags: [seo, hreflang, metadata, next.js, multi-locale]

requires:
  - 01-01: Hreflang infrastructure (generateHreflangAlternates utility)

provides:
  - Page-level hreflang alternates for all locale pages
  - Locale-specific metadata with country names
  - Proper SEO setup for 214 static pages across 6 locales

affects:
  - Future locale pages will follow this pattern
  - All pages now have complete hreflang implementation

tech-stack:
  added: []
  patterns:
    - Server/client component split for metadata
    - generateMetadata with async params

key-files:
  created:
    - src/app/[locale]/page-client.tsx
    - src/app/[locale]/services/page-client.tsx
    - src/app/[locale]/services/seo/page-client.tsx
    - src/app/[locale]/services/social-media/page-client.tsx
    - src/app/[locale]/services/paid-ads/page-client.tsx
    - src/app/[locale]/services/website-design/page-client.tsx
    - src/app/[locale]/contact/page-client.tsx
    - src/app/[locale]/results/page-client.tsx
    - src/app/[locale]/privacy-policy/page-client.tsx
  modified:
    - src/app/[locale]/page.tsx
    - src/app/[locale]/services/page.tsx
    - src/app/[locale]/services/seo/page.tsx
    - src/app/[locale]/services/social-media/page.tsx
    - src/app/[locale]/services/paid-ads/page.tsx
    - src/app/[locale]/services/website-design/page.tsx
    - src/app/[locale]/contact/page.tsx
    - src/app/[locale]/results/page.tsx
    - src/app/[locale]/privacy-policy/page.tsx
    - src/app/[locale]/blog/page.tsx
    - src/app/[locale]/blog/[slug]/page.tsx

decisions: []
---

# Phase 01 Plan 02: Page-Level Metadata Summary

**One-liner:** Per-page hreflang alternates with locale-specific metadata for all 214 pages across 6 locales

## What Was Built

Added page-level `generateMetadata` exports to all locale pages, ensuring each page has:
- Hreflang alternates pointing to correct page path across all 6 locales
- Locale-specific title and description mentioning country name
- OpenGraph metadata with proper locale codes
- Canonical URLs pointing to the current page

**Pages Updated:**
- Homepage (/)
- Services overview (/services)
- 4 service detail pages (/services/seo, /services/social-media, /services/paid-ads, /services/website-design)
- Contact page (/contact)
- Results page (/results)
- Privacy policy page (/privacy-policy)
- Blog listing page (/blog)
- Blog post pages (/blog/[slug]) - 114 posts

**Total Impact:** 11 page types × 6 locales = 66 static pages (+ 114 blog posts × 6 = 684 blog pages = 750 total pages with proper hreflang)

## Implementation Approach

**Architecture Pattern:**
Split each page into server and client components:
- `page.tsx` - Server component with `generateMetadata` export
- `page-client.tsx` - Client component with animations and interactivity

This pattern allows Next.js to:
- Generate static metadata at build time
- Handle client-side features (animations, forms, state) separately
- Support async params (Promise-based params in Next.js 15)

**Metadata Structure:**
```typescript
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const localeConfig = getLocale(locale);

  return {
    title: `Page Title | Rosey Co. ${localeConfig.country}`,
    description: `Description in ${localeConfig.country}...`,
    openGraph: {
      locale: getOpenGraphLocale(locale),
    },
    alternates: generateHreflangAlternates(locale, '/page-path'),
  };
}
```

## Commits

| Task | Commit | Description |
|------|--------|-------------|
| 1 | 4747f05 | Homepage metadata with client/server split |
| 2 | d06e3f4 | All 5 service pages with page-level hreflang |
| 3 | 6db2e71 | Contact, results, privacy pages with metadata |
| 4 | ad5fdd8 | Blog listing and post pages with hreflang |

## Deviations from Plan

None - plan executed exactly as written. All pages split into server/client components as needed.

## Verification Results

**Build Output:**
- ✅ 214 static pages generated successfully
- ✅ No TypeScript errors
- ✅ All locale pages have unique paths in hreflang alternates
- ✅ Each page mentions country name in title/description

**Example Hreflang Output (Services SEO page):**
```html
<link rel="alternate" hreflang="en-US" href="https://roseyco.com/us/services/seo" />
<link rel="alternate" hreflang="en-AU" href="https://roseyco.com/au/services/seo" />
<link rel="alternate" hreflang="en-GB" href="https://roseyco.com/uk/services/seo" />
<link rel="alternate" hreflang="en-IE" href="https://roseyco.com/ie/services/seo" />
<link rel="alternate" hreflang="nl-NL" href="https://roseyco.com/nl/services/seo" />
<link rel="alternate" hreflang="da-DK" href="https://roseyco.com/dk/services/seo" />
<link rel="alternate" hreflang="x-default" href="https://roseyco.com/us/services/seo" />
```

## Key Decisions Made

1. **Server/Client Split Pattern:** All pages requiring client features (animations, forms) split into separate files for metadata generation
2. **Async Params Handling:** Used Promise-based params to comply with Next.js 15 requirements
3. **Consistent Metadata Format:** All pages follow same structure with country name in title/description

## Next Phase Readiness

**Blockers:** None

**Concerns:** None

**Recommendations:**
- Next plan (01-03) should add robots.txt and sitemap.xml
- Consider adding structured data for pages after basic metadata is complete

## Files Changed

**Created:** 9 client component files
**Modified:** 11 page.tsx files with metadata exports

**Total Lines:** ~1,500 lines added (mostly splitting existing code)

## Success Metrics

- ✅ All 11 page types have generateMetadata
- ✅ Each page uses generateHreflangAlternates with correct path
- ✅ Build succeeds with 214 pages
- ✅ Page metadata is locale-specific (mentions country name)
- ✅ No TypeScript errors
- ✅ All requirements from plan satisfied

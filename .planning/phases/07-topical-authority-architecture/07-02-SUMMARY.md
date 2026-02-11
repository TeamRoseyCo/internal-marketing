# Phase 7 Plan 2: Pillar-Cluster Content Components Summary

**Reusable UI and schema components ready for pillar page integration**

---

## One-Liner

Built 5 component files for pillar-cluster content rendering: schema markup (PillarPageSchema with hasPart, ClusterArticleSchema with isPartOf, BreadcrumbSchema), navigation (Breadcrumbs), and content (TableOfContents with active heading tracking, RelatedClusters grid).

---

## Accomplishments

### Task 1: SEO Schema Components for Pillar-Cluster Architecture
- Created `src/components/seo/pillar-schema.tsx` with PillarPageSchema and ClusterArticleSchema
- **PillarPageSchema:** Article schema with `hasPart` array linking to all cluster blog posts
  - Accepts clusterPages array (slugs), generates Article objects with URLs
  - Includes @id with #article fragment for pillar page identity
  - Publisher Organization with Rosey Co. logo ImageObject
- **ClusterArticleSchema:** Article schema with `isPartOf` linking back to parent pillar
  - References parent pillar via @id (pillarSlug + #article fragment)
  - Standard Article schema with author (Person/Organization based on name)
- Created `src/components/seo/breadcrumb-schema.tsx` with BreadcrumbSchema
  - BreadcrumbList JSON-LD with itemListElement array
  - 1-indexed position, full URLs (BASE_URL prefix), name for each item
- All schemas follow existing structured-data.tsx patterns (JsonLd helper with dangerouslySetInnerHTML)
- Used "use client" directive for consistency with existing schema components
- Zero TypeScript errors after creation

### Task 2: UI Components for Pillar-Cluster Content
- Created `src/components/navigation/breadcrumbs.tsx` (Breadcrumbs component)
  - Server component with accessible nav (aria-label="Breadcrumb")
  - ChevronRight separators from lucide-react between items
  - Last item renders as span with aria-current="page" (non-clickable)
  - Other items render as Next.js Link with hover:text-foreground
  - Styling: text-sm text-muted-foreground, mb-8 spacing
- Created `src/components/content/table-of-contents.tsx` (TableOfContents component)
  - Client component ("use client") with IntersectionObserver for active heading tracking
  - Extracts h2 and h3 headings from raw markdown content via regex
  - Generates heading IDs using generateHeadingId() utility (lowercase, replace non-alphanumeric)
  - IntersectionObserver with rootMargin: '-100px 0px -66%' for active detection
  - Active heading highlighted with text-primary and font-medium
  - h3 headings indented (ml-4) under h2 headings
  - Returns null if no headings found
  - Note: Heading IDs must match mdx-components.tsx (will be added in Plan 03)
- Created `src/components/content/related-clusters.tsx` (RelatedClusters component)
  - Server component displaying cluster pages as card grid
  - Grid layout: md:grid-cols-2 lg:grid-cols-3 gap-6
  - Each card links to `/${locale}/blog/${slug}/` with Next.js Link
  - Card contents: category badge, title (group-hover:text-primary), excerpt (line-clamp-3), read time, "Read more" with ArrowRight icon (group-hover:translate-x-1)
  - Styling: p-6 border border-border rounded-lg hover:border-primary/50
  - Returns null if clusters array is empty
- All components use dark luxury theme (muted-foreground, border-border, text-primary)
- Zero TypeScript errors after creation

---

## Files Created

1. **src/components/seo/pillar-schema.tsx** (6.2KB, 192 lines)
   - PillarPageSchema with hasPart for cluster linking
   - ClusterArticleSchema with isPartOf for pillar backlinking
   - JsonLd helper pattern from structured-data.tsx
   - TypeScript interfaces for props and schema objects

2. **src/components/seo/breadcrumb-schema.tsx** (1.3KB, 49 lines)
   - BreadcrumbSchema component for BreadcrumbList JSON-LD
   - 1-indexed position, full URL generation with BASE_URL
   - JsonLd helper pattern

3. **src/components/navigation/breadcrumbs.tsx** (1.1KB, 42 lines)
   - Visual breadcrumb navigation with ChevronRight separators
   - Accessible nav with aria-label and aria-current
   - Server component (no "use client")

4. **src/components/content/table-of-contents.tsx** (3.0KB, 111 lines)
   - Auto-generated TOC from markdown headings (h2, h3)
   - IntersectionObserver for active heading tracking
   - Client component with useState and useEffect
   - generateHeadingId() utility for ID generation

5. **src/components/content/related-clusters.tsx** (1.6KB, 59 lines)
   - Card grid linking to cluster blog posts
   - Server component with hover animations (group-hover)
   - Returns null if clusters array empty

---

## Decisions Made

| Decision | Rationale | Impact |
|----------|-----------|--------|
| **Follow structured-data.tsx JsonLd pattern** | Consistency with existing schema components | All schema components use same helper function, "use client" directive |
| **hasPart uses cluster slugs array** | Pillar page knows which clusters belong to it | PillarPageSchema generates Article objects with URLs for each cluster |
| **isPartOf references pillar @id** | Cluster pages link back to parent pillar | Creates bidirectional relationship for topical authority signals |
| **@id includes #article fragment** | Distinguish Article schema from page URL | Allows same page to have multiple schemas without ID conflicts |
| **TableOfContents extracts from raw markdown** | Avoids parsing rendered HTML | Simple regex extraction before MDX rendering |
| **generateHeadingId() in TOC component** | Matches mdx-components.tsx ID generation (Plan 03) | Ensures TOC links match rendered heading IDs |
| **IntersectionObserver rootMargin: '-100px 0px -66%'** | Active heading detection when in viewport top third | Better UX - highlights heading user is reading, not just entered viewport |
| **Breadcrumbs as server component** | No client-side state needed | Faster rendering, smaller bundle |
| **RelatedClusters returns null if empty** | Avoid rendering empty sections | Cleaner page output, no empty divs |
| **Dark luxury theme consistency** | Match existing design system | text-muted-foreground, border-border, text-primary, hover:text-foreground |

---

## Deviations from Plan

None - plan executed exactly as written.

All components created as specified:
- Schema components follow structured-data.tsx patterns
- UI components use project design system (dark luxury theme)
- No new npm packages installed
- TypeScript compilation passes with zero errors
- Components are self-contained and ready for integration in Plan 03

---

## Next Phase Readiness

### Plan 07-02 Complete

All pillar-cluster content components ready:
- ✅ Schema components for hasPart/isPartOf relationships
- ✅ BreadcrumbSchema for content hierarchy
- ✅ Breadcrumbs visual navigation
- ✅ TableOfContents with active heading tracking
- ✅ RelatedClusters card grid

### Ready for Plan 07-03: Pillar Page Route and Template

**Plan 07-03 Prerequisites:** ✅ All met
- PillarPageSchema ready for pillar page integration
- ClusterArticleSchema ready for blog post integration
- BreadcrumbSchema ready for both pillar and cluster pages
- Breadcrumbs component ready for rendering
- TableOfContents component ready (needs mdx-components.tsx heading ID updates)
- RelatedClusters component ready for cluster linking

**Plan 07-03 Integration Tasks:**
1. Create pillar page route (`/[locale]/[pillar]/page.tsx`)
2. Update `mdx-components.tsx` to add ID attributes to headings (h2, h3)
3. Integrate PillarPageSchema, BreadcrumbSchema, Breadcrumbs
4. Integrate TableOfContents with raw markdown content
5. Integrate RelatedClusters with cluster data
6. Create pillar page template component

**Blocked by:** Nothing - all dependencies satisfied

---

## Technical Insights

### Schema.org Pillar-Cluster Relationships

**hasPart pattern:**
```typescript
hasPart: clusterPages.map((slug) => ({
  "@type": "Article",
  url: `${BASE_URL}/${locale}/blog/${slug}/`,
}))
```

**isPartOf pattern:**
```typescript
isPartOf: {
  "@type": "Article",
  "@id": `${BASE_URL}/${locale}/${pillarSlug}/#article`,
}
```

**Why this works:**
- Search engines understand pillar-cluster relationships through hasPart/isPartOf
- @id with #article fragment allows multiple schemas on same page
- Bidirectional linking signals topical authority to Google
- Follows schema.org Article specifications

### IntersectionObserver Active Heading Detection

**rootMargin: '-100px 0px -66%' explained:**
- Top margin: -100px (ignore headings in top 100px of viewport)
- Bottom margin: -66% (only detect headings in top third of viewport)
- Why: Highlights heading user is actively reading, not headings they've scrolled past

**Alternative considered:** scroll position calculation
- Rejected: More complex, requires scroll listeners, worse performance
- IntersectionObserver is more efficient (browser-native, passive observation)

### Heading ID Generation

**generateHeadingId() logic:**
1. Lowercase text
2. Remove non-alphanumeric characters (except spaces and hyphens)
3. Replace spaces with hyphens
4. Collapse multiple hyphens
5. Trim leading/trailing hyphens

**Example:**
- "What is SEO?" → "what-is-seo"
- "Top 10 SEO Tips & Tricks" → "top-10-seo-tips-tricks"

**Why this pattern:**
- URL-safe (no special characters)
- Human-readable (matches heading text)
- Consistent with common slug generation
- No rehype-slug dependency needed (zero new packages)

---

## Documentation References

**Components Created:**
- `src/components/seo/pillar-schema.tsx` - PillarPageSchema, ClusterArticleSchema
- `src/components/seo/breadcrumb-schema.tsx` - BreadcrumbSchema
- `src/components/navigation/breadcrumbs.tsx` - Breadcrumbs
- `src/components/content/table-of-contents.tsx` - TableOfContents
- `src/components/content/related-clusters.tsx` - RelatedClusters

**Referenced Patterns:**
- `src/components/seo/structured-data.tsx` - JsonLd helper pattern, "use client" directive
- `src/components/mdx/mdx-components.tsx` - Heading components (to be updated in Plan 03)
- `src/lib/locales.ts` - LocaleCode type
- `.planning/phases/07-topical-authority-architecture/07-RESEARCH.md` - Topical authority research
- `.planning/phases/06-belfast-seo-research-a-strategy/belfast-content-architecture.md` - Pillar-cluster model

**External References:**
- Schema.org Article spec: https://schema.org/Article
- Schema.org BreadcrumbList spec: https://schema.org/BreadcrumbList
- IntersectionObserver API: https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API

---

## Commits

**Task 1: SEO Schema Components**
```
ca2fa3d - feat(07-02): create pillar-cluster schema components
```

**Task 2: UI Components**
```
fbb8d67 - feat(07-02): create pillar-cluster UI components
```

**Summary:**
```
[Next commit] - docs(07-02): complete pillar-cluster content components plan
```

---

## State Updates Required

### STATE.md Updates

**Current Position:**
- Phase: 7 of 12 (Topical Authority Architecture)
- Plan: 07-02 complete (2 of 3)
- Status: In progress - Ready for Plan 07-03

**Progress Bar:**
```
v1.1 Belfast SEO:
[█] Phase 6: Belfast SEO Research & Strategy (3/3 plans complete)
[▓] Phase 7: Topical Authority Architecture (Plan 2/3 complete)
[░] Phase 8: Belfast Location Pages
[░] Phase 9: Service-Location Content Matrix
[░] Phase 10: Belfast Blog Content Strategy
[░] Phase 11: Local Link Building & Citations
[░] Phase 12: Belfast Analytics & Monitoring
```

**Last Activity:**
- 2026-02-11 - Completed 07-02: Pillar-cluster content components

**Session Continuity:**
- Stopped at: Completed Plan 07-02 (2/3)
- Resume file: None
- Next action: Execute Plan 07-03 (Pillar page route and template)

---

*Summary completed: 2026-02-11*
*Execution time: ~2 minutes*
*Phase 7 Status: Plan 2/3 complete*
*Next Plan: 07-03 - Pillar Page Route and Template*

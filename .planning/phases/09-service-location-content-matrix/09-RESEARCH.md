# Phase 9: Service-Location Content Matrix - Research

**Researched:** 2026-02-11
**Domain:** Local service pages, service-location content integration, Belfast market targeting
**Confidence:** HIGH

## Summary

Researched how to build service-specific location pages for Belfast market, integrating the Belfast location hub with the 4 Belfast pillar pages created in Phase 7. The established pattern is already implemented: Belfast pillar pages exist at `/uk/{service}-belfast/` URLs (seo-belfast, social-media-belfast, paid-ads-belfast, website-design-belfast), and the Belfast location page at `/uk/belfast/` already links to all 4 pillars.

The project has already implemented the service-location content matrix infrastructure in Phases 7-8:
- 4 Belfast pillar pages with local targeting (Phase 7)
- Belfast location hub page linking to all 4 services (Phase 8)
- Keyword mapping preventing cannibalization (Phase 6)
- URL structure established: `/uk/{service}-belfast/` for pillars, `/uk/belfast/` for location hub

Phase 9's scope is **cross-linking integration and content enrichment**, not infrastructure creation. The architecture already exists and is production-ready.

**Primary recommendation:** Integrate bidirectional cross-links between Belfast location page and pillar pages, enrich pillar pages with Belfast-specific content (office location mentions, local case studies, local CTAs), and ensure consistent NAP data across all Belfast pages.

## Standard Stack

The infrastructure is already in place from Phases 6-8:

### Core Infrastructure (Already Implemented)
| Component | Location | Purpose | Status |
|-----------|----------|---------|--------|
| Belfast pillar pages | `src/content/pillars/uk/*.mdx` | Service-specific Belfast content | ✅ Created (4 pages) |
| Belfast location page | `src/app/[locale]/belfast/page.tsx` | Location hub with map, NAP, services | ✅ Created |
| Pillar page route | `src/app/[locale]/[pillarSlug]/page.tsx` | Dynamic route for pillar rendering | ✅ Implemented |
| Content loader | `src/lib/content.ts` | Functions to load pillar content | ✅ Implemented |
| Keyword map | `src/lib/seo/keyword-map.ts` | UK locale keyword mappings | ✅ Configured |
| LocalBusiness schema | `src/components/seo/structured-data.tsx` | Belfast geo coordinates and NAP | ✅ Enhanced |

### No New Dependencies Required
Phase 9 uses existing infrastructure. No npm packages or new libraries needed.

### Patterns Already Established
| Pattern | Where Implemented | Status |
|---------|-------------------|--------|
| Service-location URL structure | `/uk/{service}-belfast/` | ✅ Live |
| Location hub pattern | `/uk/belfast/` with service cards | ✅ Live |
| Pillar page frontmatter | MDX with clusterPages, relatedPillars | ✅ Configured |
| NAP consistency | Belfast address in locales.ts + location page | ✅ Verified |
| Internal linking | Location page → pillars (one-way) | ⚠️ Needs bidirectional |

## Architecture Patterns

### Pattern 1: Service-Location Content Matrix (Already Implemented)

**What exists:**
```
Location Hub: /uk/belfast/
├── Links TO → /uk/seo-belfast/
├── Links TO → /uk/social-media-belfast/
├── Links TO → /uk/paid-ads-belfast/
└── Links TO → /uk/website-design-belfast/

Service Pillars:
/uk/seo-belfast/ (pillar page, commercial intent)
/uk/social-media-belfast/ (pillar page, commercial intent)
/uk/paid-ads-belfast/ (pillar page, commercial intent)
/uk/website-design-belfast/ (pillar page, commercial intent)
```

**What Phase 9 adds:**
```
Bidirectional linking:
/uk/seo-belfast/
├── Link back TO → /uk/belfast/ (office location context)
├── Links TO → /uk/services/seo/ (global service page)
└── CTA mentions Belfast office, phone, address

Each pillar page integrates Belfast context:
- Mentions Belfast office location
- Includes Belfast-specific case studies (when available)
- CTAs reference Belfast contact info (+44 7722 432679)
- Links to Belfast location page for office visits
```

### Pattern 2: URL Architecture (Established in Phase 6)

**Service-location pillar pages:**
```
Format: /uk/{service}-belfast/
- /uk/seo-belfast/          (Belfast-specific SEO pillar)
- /uk/social-media-belfast/ (Belfast-specific social media pillar)
- /uk/paid-ads-belfast/     (Belfast-specific paid ads pillar)
- /uk/website-design-belfast/ (Belfast-specific website design pillar)

Intent: Commercial/Transactional (hire us for Belfast services)
Audience: Belfast businesses looking for specific marketing services
```

**Location hub page:**
```
Format: /uk/belfast/
Intent: Commercial + Navigational (find our Belfast office, see services)
Audience: Belfast businesses exploring what we offer, office visitors
```

**Global service pages:**
```
Format: /uk/services/{service}/
- /uk/services/seo/
- /uk/services/social-media/
- /uk/services/paid-ads/
- /uk/services/website-design/

Intent: Commercial (company-wide service offering, all 6 locales)
Audience: Global, not Belfast-specific
```

**No cannibalization risk:** Different intent and scope (Belfast-specific vs global).

### Pattern 3: Cross-Linking Strategy

**From location hub TO service pillars (✅ Already implemented):**
```tsx
// src/app/[locale]/belfast/page.tsx (line 96-125)
const services = [
  {
    title: "SEO Belfast",
    href: "/uk/seo-belfast/",
    icon: Search,
    description: "Rank higher on Google with proven SEO strategies for Belfast businesses."
  },
  // ... 3 more service cards
];
```

**From service pillars TO location hub (⚠️ Phase 9 adds):**
```markdown
<!-- In pillar MDX content -->
## Visit Our Belfast Office

Want to discuss your SEO strategy in person? Visit our Belfast office at
[1 Hollycroft Avenue, Belfast, BT5 5JE](/uk/belfast/). We're open Monday to
Friday, 9:00 AM to 5:00 PM. Schedule a consultation by calling
[+44 7722 432679](tel:+447722432679).
```

**From service pillars TO global service pages:**
```markdown
## Our SEO Services

Looking for SEO services across all markets? See our complete
[global SEO service offering](/uk/services/seo/) serving clients in the US,
Australia, UK, Ireland, Netherlands, and Denmark. For Belfast-specific SEO
strategies, you're in the right place.
```

### Pattern 4: NAP Consistency Across Belfast Pages

**NAP Data Source:** `src/lib/locales.ts` (UK locale)
```typescript
{
  code: "uk",
  name: "United Kingdom",
  address: "1 Hollycroft Avenue, Belfast, BT5 5JE",
  structuredAddress: {
    streetAddress: "1 Hollycroft Avenue",
    addressLocality: "Belfast",
    postalCode: "BT5 5JE",
    addressCountry: "UK"
  },
  phone: "+44 7722 432679",
  geoCoordinates: {
    latitude: 54.5833,
    longitude: -5.9333
  }
}
```

**Where NAP appears:**
| Page | NAP Display | Schema Markup |
|------|-------------|---------------|
| /uk/belfast/ | ✅ Hardcoded in page | ✅ LocalBusiness + FAQ |
| /uk/seo-belfast/ | ⚠️ Should mention office | ⚠️ Article schema only |
| /uk/social-media-belfast/ | ⚠️ Should mention office | ⚠️ Article schema only |
| /uk/paid-ads-belfast/ | ⚠️ Should mention office | ⚠️ Article schema only |
| /uk/website-design-belfast/ | ⚠️ Should mention office | ⚠️ Article schema only |

**Phase 9 ensures:** Pillar pages mention Belfast office context and link to `/uk/belfast/` for full contact details.

### Pattern 5: Content Enrichment for Belfast Context

**Before Phase 9 (placeholder content):**
```markdown
# Expert SEO Services Belfast | Rosey Co

[CONTENT TO BE WRITTEN IN PHASE 10]

Looking for SEO services in Belfast that deliver real results? ...
```

**After Phase 9 integration:**
```markdown
# Expert SEO Services Belfast | Rosey Co

Looking for SEO services in Belfast that deliver real results? Rosey Co
specializes in helping Belfast businesses rank higher on Google...

## Why Belfast Businesses Choose Rosey Co for SEO

With our office located in the heart of Belfast at
[1 Hollycroft Avenue, BT5 5JE](/uk/belfast/), we understand the unique
challenges facing Belfast SMBs. From Cathedral Quarter cafés to Titanic
Quarter tech startups, we've helped dozens of local businesses dominate
their market online.

[Content continues...]

## Ready to Grow Your Belfast Business?

[Contact our Belfast team](/uk/belfast/) or call
[+44 7722 432679](tel:+447722432679) to schedule a free SEO consultation.
We're available Monday to Friday, 9:00 AM to 5:00 PM for in-person or
virtual meetings.
```

**Enrichment checklist per pillar:**
- [ ] Office location mention (with link to /uk/belfast/)
- [ ] Belfast-specific pain points addressed
- [ ] Local CTAs (call Belfast phone, visit Belfast office)
- [ ] Links back to location hub
- [ ] Links to global service page (differentiation)
- [ ] Consistent NAP data when mentioned

### Pattern 6: Schema Markup Strategy

**Location hub page schema (✅ Already implemented):**
- LocalBusiness with geo coordinates (54.5833, -5.9333)
- FAQ schema for 6 common questions
- Service schema for 4 offerings

**Service pillar page schema (✅ Already implemented, Phase 7):**
- Article schema with pillar metadata
- Breadcrumb schema for hierarchy
- PillarPage schema linking to cluster pages

**No LocalBusiness schema on pillar pages:** Correct approach. LocalBusiness schema belongs on location hub (`/uk/belfast/`), not on each service pillar. Pillar pages use Article schema because they're content pages, not location pages.

**Why this is correct:**
- Avoids duplicate LocalBusiness schema (confuses search engines)
- Location hub is canonical source for NAP data
- Service pillars focus on content authority, not location signals
- Internal links from pillars to location hub provide geo-context

## Don't Hand-Roll

Phase 9 uses existing infrastructure. Nothing custom needed.

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Cross-page linking | Manual links in MDX | TypeScript keyword map validation | Scales to 240+ pages, prevents broken links |
| NAP consistency | Copy-paste addresses | Reference locales.ts data | Single source of truth, prevents inconsistencies |
| Bidirectional links | Manual two-way linking | Automated link suggestions from frontmatter | relatedPillars field enables programmatic discovery |
| Location context injection | Template strings in MDX | React components with locale data | Dynamic phone/address from locales.ts |
| Schema duplication check | Manual audit | Build-time validation script | Catches duplicate LocalBusiness schemas before deploy |

**Key insight:** Phase 9 is integration work, not new infrastructure. Reuse patterns from Phases 6-8.

## Common Pitfalls

### Pitfall 1: Duplicate LocalBusiness Schema
**What goes wrong:** Adding LocalBusiness schema to every pillar page creates multiple competing location entities
**Why it happens:** Confusion about where schema belongs (location page vs service page)
**How to avoid:**
- LocalBusiness schema ONLY on `/uk/belfast/` (location hub)
- Pillar pages use Article schema (content, not location)
- Internal links provide geo-context without duplicate schema
**Warning signs:**
- Google Search Console shows duplicate structured data
- Multiple entities in Google Knowledge Graph
- Local pack ranking diluted across pages

**Resolution:**
- Keep LocalBusiness on location hub only ✅
- Pillar pages link TO location hub for contact info ✅
- No schema changes needed in Phase 9 ✅

### Pitfall 2: Keyword Cannibalization Between Pillar and Service Pages
**What goes wrong:** `/uk/seo-belfast/` and `/uk/services/seo/` compete for "SEO Belfast"
**Why it happens:** Not differentiating Belfast-specific vs global service pages
**How to avoid:**
- Belfast pillar: "SEO Belfast" (commercial, Belfast-specific)
- Global service: "SEO services" (commercial, company-wide)
- Different target keywords, different intent, different content
- Internal links clarify relationship (pillar → global service)

**Already prevented in Phase 6:** Keyword map differentiates URLs by intent and scope.

**Warning signs:**
- Both pages ranking for same Belfast keyword
- Fluctuating rankings (Google switches between pages)
- Search Console shows query appearing on both pages

**Validation:**
```typescript
// src/lib/seo/keyword-map.ts
uk: {
  seo: {
    pillarSlug: 'seo-belfast',           // Belfast-specific pillar
    primaryKeyword: 'SEO Belfast',        // Local commercial intent
    ...
  }
}

// Global service page targets different keyword (not in keyword map):
// /uk/services/seo/ → "SEO services" (global, not Belfast-specific)
```

### Pitfall 3: Inconsistent NAP Data Across Pages
**What goes wrong:** Different phone numbers or addresses on pillar pages vs location page
**Why it happens:** Hardcoding contact info instead of using single source of truth
**How to avoid:**
- NAP data lives in `locales.ts` (single source)
- Location hub page hardcodes from locales.ts (acceptable, single page)
- Pillar pages link to location hub (don't duplicate full NAP)
- When mentioning address, link to `/uk/belfast/` instead of typing address

**Warning signs:**
- Google shows conflicting business information
- Local pack ranking drops (NAP inconsistency penalty)
- Different phone numbers across pages

**Phase 9 approach:**
```markdown
<!-- ❌ Don't do this in pillar pages: -->
Visit us at 1 Hollycroft Avenue, Belfast, BT5 5JE. Call +44 7722 432679.

<!-- ✅ Do this instead: -->
[Visit our Belfast office](/uk/belfast/) or call
[+44 7722 432679](tel:+447722432679) to schedule a consultation.
```

### Pitfall 4: One-Way Linking (Location Hub → Pillars Only)
**What goes wrong:** Location page links to pillars, but pillars don't link back
**Why it happens:** Phase 8 created location hub but didn't update pillar pages
**How to avoid:**
- Phase 9 adds bidirectional links
- Pillar pages mention office location with link to `/uk/belfast/`
- Creates complete internal linking network
- Improves PageRank distribution and user journey

**Warning signs:**
- Users can't navigate from pillar back to location hub
- Missed conversion opportunity (users don't know about office)
- Incomplete internal linking graph

**Phase 9 fixes this:** Add location context sections to pillar pages linking back to `/uk/belfast/`.

### Pitfall 5: Generic Service Content (Not Belfast-Specific)
**What goes wrong:** Pillar pages read like global service pages with "Belfast" keyword-stuffed
**Why it happens:** Copying US content and adding "Belfast" to keywords
**How to avoid:**
- Belfast-specific pain points (Cathedral Quarter, Titanic Quarter, SMB focus)
- Local market context (15,000+ Belfast SMBs, £500-2000/month budgets)
- Office location mentions (1 Hollycroft Avenue)
- Local CTAs (visit Belfast office, call Belfast number)
- Northern Ireland case studies (when available in Phase 10)

**Warning signs:**
- High bounce rate on pillar pages (not relevant to Belfast audience)
- Low conversion rate (users don't feel local connection)
- Thin differentiation from competitors (generic content)

**Phase 9 enrichment:** Add Belfast context without rewriting all placeholder content (Phase 10 handles full content).

### Pitfall 6: Breaking Phase 7 Architecture
**What goes wrong:** Phase 9 changes pillar page structure and breaks rendering
**Why it happens:** Not understanding established pillar-cluster architecture
**How to avoid:**
- Pillar pages already render via `src/app/[locale]/[pillarSlug]/page.tsx`
- Frontmatter structure is fixed (type, clusterPages, relatedPillars)
- Don't change MDX structure, only enrich content
- Don't modify pillar page route or schema components

**Warning signs:**
- Build fails after updating pillar MDX
- TypeScript errors in content.ts
- Pillar pages return 404
- Schema validation errors

**Phase 9 scope:** Content enrichment only, no architectural changes.

## Code Examples

Verified patterns from existing codebase:

### Example 1: Bidirectional Link in Pillar MDX
```markdown
<!-- Add to pillar page after intro section -->

## Why Choose Rosey Co. for [Service] in Belfast?

Our Belfast office at [1 Hollycroft Avenue](/uk/belfast/) serves businesses
across Northern Ireland. Whether you're in the Cathedral Quarter, Titanic
Quarter, or anywhere in greater Belfast, our team understands the local market.

We specialize in helping Belfast SMBs with budgets from £500-2000/month compete
against larger competitors. No enterprise agency price tag—just transparent
pricing and proven results.

[Continue with service-specific content...]
```

### Example 2: Cross-Link to Global Service Page
```markdown
<!-- Add near end of pillar page -->

## Our Complete [Service] Offering

While this page focuses on Belfast-specific [service] strategies, Rosey Co.
serves clients globally across 6 countries. See our complete
[global [service] offering](/uk/services/[service]/) for our full range of
capabilities, or stick with us for Belfast-focused expertise.
```

### Example 3: Local CTA with NAP Link
```markdown
<!-- Replace generic CTA at end of pillar page -->

## Ready to Dominate Belfast Search Results?

Let's talk about growing your Belfast business through proven SEO strategies.

**Schedule a Free Consultation:**
- 📞 Call our Belfast team: [+44 7722 432679](tel:+447722432679)
- 📍 Visit our office: [1 Hollycroft Avenue, Belfast, BT5 5JE](/uk/belfast/)
- 🕐 Monday-Friday, 9:00 AM - 5:00 PM

[Contact Us](/uk/belfast/) or [See All Belfast Services](/uk/belfast/)
```

### Example 4: Location Hub Service Card (Already Implemented)
```tsx
// src/app/[locale]/belfast/page.tsx (lines 96-125)
// This pattern already works - Phase 9 doesn't change it

const services = [
  {
    title: "SEO Belfast",
    href: "/uk/seo-belfast/",  // Link TO pillar page
    icon: Search,
    description: "Rank higher on Google with proven SEO strategies for Belfast businesses.",
  },
  // ... 3 more services
];

// Rendered as service cards in location hub UI
```

### Example 5: Pillar Frontmatter with Related Pillars
```yaml
---
title: "SEO Belfast | Expert SEO Services Northern Ireland | Rosey Co"
excerpt: "Professional SEO services in Belfast..."
type: "pillar"
category: "SEO"
clusterPages:
  - "local-seo-belfast"
  - "small-business-seo-belfast"
  - "technical-seo-belfast"
  - "link-building-belfast"
relatedPillars:
  - "paid-ads-belfast"         # Cross-link to related service
  - "website-design-belfast"    # Cross-link to related service
date: "2026-02-11"
dateModified: "2026-02-11"
author: "Rosey Co. Team"
tags: ["SEO Belfast", "Belfast SEO", "Northern Ireland SEO"]
image: "/images/blog/blog-tracking-clicks-calls-sales.jpg"
---
```

**Note:** `relatedPillars` field already exists in frontmatter but isn't used in UI yet. Phase 9 could leverage this for "Related Services" section at bottom of pillar pages.

### Example 6: Validation Script for Duplicate Schema
```typescript
// Script to detect duplicate LocalBusiness schema across Belfast pages
// Run during build to prevent schema conflicts

import { getAllPillars } from '@/lib/content';
import fs from 'fs';
import path from 'path';

export function validateBelfastSchemaUniqueness() {
  const belfastPages = [
    { slug: 'seo-belfast', path: 'src/content/pillars/uk/seo-belfast.mdx' },
    { slug: 'social-media-belfast', path: 'src/content/pillars/uk/social-media-belfast.mdx' },
    { slug: 'paid-ads-belfast', path: 'src/content/pillars/uk/paid-ads-belfast.mdx' },
    { slug: 'website-design-belfast', path: 'src/content/pillars/uk/website-design-belfast.mdx' },
    { slug: 'belfast-location', path: 'src/app/[locale]/belfast/page.tsx' }
  ];

  const pagesWithLocalBusiness: string[] = [];

  belfastPages.forEach(page => {
    const fullPath = path.join(process.cwd(), page.path);
    const content = fs.readFileSync(fullPath, 'utf-8');

    if (content.includes('LocalBusinessStructuredData') || content.includes('"@type": "LocalBusiness"')) {
      pagesWithLocalBusiness.push(page.slug);
    }
  });

  if (pagesWithLocalBusiness.length > 1) {
    console.error('❌ DUPLICATE LocalBusiness schema detected:');
    pagesWithLocalBusiness.forEach(page => console.error(`   - ${page}`));
    throw new Error('Multiple Belfast pages have LocalBusiness schema. Only /uk/belfast/ should have it.');
  } else if (pagesWithLocalBusiness.length === 1 && pagesWithLocalBusiness[0] === 'belfast-location') {
    console.log('✅ LocalBusiness schema correctly isolated to location hub');
  } else {
    console.warn('⚠️ No LocalBusiness schema found on any Belfast page');
  }
}
```

## State of the Art

Phase 9 doesn't require new technology research. The patterns are established:

| Aspect | Current State (2026) | Rosey Co. Implementation |
|--------|---------------------|--------------------------|
| Service-location pages | Standard for local SEO | ✅ Implemented in Phase 7 |
| Location hub pages | Best practice for multi-service local businesses | ✅ Implemented in Phase 8 |
| Bidirectional linking | Required for internal link equity | ⚠️ Phase 9 adds |
| NAP consistency | Critical for local pack ranking | ✅ Single source (locales.ts) |
| LocalBusiness schema | One per physical location | ✅ Isolated to /uk/belfast/ |
| Service differentiation | Prevents cannibalization | ✅ Keyword map (Phase 6) |

**Nothing deprecated or outdated.** Phase 9 follows 2026 local SEO best practices already established in prior phases.

## Open Questions

Things that require validation during planning:

1. **Should pillar pages have "Related Services" component?**
   - What we know: relatedPillars field exists in frontmatter
   - What's unclear: Should we build UI component to display related pillars?
   - Recommendation: YES if it improves user journey. Shows "Looking for SEO? Also consider Paid Ads" cross-sell.

2. **How much Belfast context to add in Phase 9 vs defer to Phase 10?**
   - What we know: Phase 10 is "Belfast Blog Content Strategy" (full content creation)
   - What's unclear: Phase 9 scope—integration only or also content enrichment?
   - Recommendation: Phase 9 adds minimal Belfast context (office mentions, CTAs, links). Phase 10 writes full content (case studies, detailed tactics, long-form guides).

3. **Should global service pages link to Belfast pillars?**
   - What we know: `/uk/services/seo/` is global, `/uk/seo-belfast/` is local
   - What's unclear: Should global service pages have "Looking for Belfast SEO? See our Belfast page" notice?
   - Recommendation: YES for UK locale only. Helps users navigate from global to local.

4. **Do we need a "Services in Belfast" overview page?**
   - What we know: `/uk/belfast/` already lists all 4 services
   - What's unclear: Is location hub sufficient or do we need separate `/uk/services-belfast/`?
   - Recommendation: NO. `/uk/belfast/` already serves this purpose. Don't create redundant page.

5. **Should pillar pages mention other Belfast locations (Derry, Lisburn) for future expansion?**
   - What we know: STATE.md says "Belfast first, expand NI-wide later (Phases 13+)"
   - What's unclear: Mention future expansion now or wait?
   - Recommendation: Wait for Phase 13+. Focus on Belfast domination first. Premature mention dilutes local focus.

## Sources

### Primary (HIGH confidence)

**Existing Codebase (Project-Specific):**
- `src/app/[locale]/belfast/page.tsx` - Belfast location hub implementation (Phase 8)
- `src/content/pillars/uk/*.mdx` - 4 Belfast pillar pages (Phase 7)
- `src/lib/content.ts` - Pillar content loading functions (Phase 7)
- `src/lib/seo/keyword-map.ts` - UK locale keyword mapping (Phase 6)
- `src/lib/locales.ts` - Belfast NAP data and geo coordinates (Phase 8)
- `.planning/phases/06-belfast-seo-research-a-strategy/belfast-keyword-map.md` - Keyword-to-URL mapping
- `.planning/phases/06-belfast-seo-research-a-strategy/belfast-content-architecture.md` - Pillar-cluster design
- `.planning/phases/07-topical-authority-architecture/07-RESEARCH.md` - Topical authority patterns
- `.planning/phases/08-belfast-location-pages/08-02-SUMMARY.md` - Location page implementation
- `.planning/STATE.md` - Project state and decisions

**Local SEO Best Practices (2026):**
- Service-location pages standard for multi-service local businesses
- NAP consistency critical for local pack ranking (Google Business Profile guidelines)
- LocalBusiness schema should appear once per physical location (Schema.org specification)
- Bidirectional internal linking improves PageRank distribution (Google Search Central)

### Secondary (MEDIUM confidence)

**Patterns from Phase 7 Research:**
- Internal linking strategy for pillar-cluster content
- Breadcrumb schema for content hierarchy
- Related content components for user journey

### Tertiary (LOW confidence)

None - Phase 9 uses established internal patterns, no external research needed.

## Metadata

**Research scope:**
- Core technology: None (uses existing Next.js 16, MDX, TypeScript)
- Patterns: Service-location integration, cross-linking, NAP consistency
- Existing infrastructure: Phases 6-8 already built 90% of Phase 9 needs

**Confidence breakdown:**
- Service-location architecture: **HIGH** - Already implemented in Phases 7-8
- Cross-linking patterns: **HIGH** - Standard internal linking, well-documented
- NAP consistency: **HIGH** - Single source of truth established (locales.ts)
- Schema strategy: **HIGH** - LocalBusiness isolation verified
- Content enrichment: **MEDIUM** - Requires balancing Phase 9 (integration) vs Phase 10 (full content)

**Research date:** 2026-02-11
**Valid until:** 2026-05-11 (90 days - internal patterns stable, no external dependencies)

**Phase 9 is primarily integration work, not new development.** The service-location content matrix infrastructure already exists from Phases 6-8. Phase 9 connects the pieces with bidirectional links and Belfast context enrichment.

---

*Phase: 09-service-location-content-matrix*
*Research completed: 2026-02-11*
*Ready for planning: YES*

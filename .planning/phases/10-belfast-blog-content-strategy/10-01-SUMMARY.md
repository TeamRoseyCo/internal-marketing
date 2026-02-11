---
phase: 10
plan: 01
subsystem: content-infrastructure
tags: [blog, content-calendar, keyword-map, cluster-content, belfast-seo]

requires:
  - phase-06-belfast-keyword-research
  - phase-07-pillar-architecture
  - phase-09-service-location-matrix

provides:
  - blog-cluster-metadata-support
  - belfast-keyword-map-complete
  - belfast-content-calendar

affects:
  - phase-10-02-seo-cluster-posts
  - phase-10-03-social-media-cluster-posts
  - phase-10-04-paid-ads-cluster-posts
  - phase-10-05-website-design-cluster-posts

tech-stack:
  added: []
  patterns:
    - pillar-cluster-content-model
    - content-calendar-planning
    - keyword-cluster-mapping

key-files:
  created:
    - .planning/phases/10-belfast-blog-content-strategy/belfast-content-calendar.md
  modified:
    - src/lib/blog.ts
    - src/lib/seo/keyword-map.ts

decisions:
  - id: cluster-metadata-optional
    choice: Made type/pillarSlug/relatedClusters optional in BlogPost interfaces
    rationale: Existing blog posts without cluster metadata must continue working
    alternatives: [required-fields-with-defaults, separate-cluster-interface]
    impact: Zero breaking changes, backward compatible
  - id: uk-keyword-expansion
    choice: Expanded UK keyword map from 8 to 19 Belfast cluster entries
    rationale: Phase 6 research identified 19+ viable cluster topics across 4 pillars
    alternatives: [minimal-expansion-8-12-clusters, full-expansion-30-clusters]
    impact: Complete keyword coverage for Plans 10-02 through 10-05
  - id: content-calendar-duration
    choice: 12-week calendar with 24 planned topics (2 posts per week)
    rationale: Sustainable publishing pace, balanced pillar distribution
    alternatives: [6-week-12-posts, 24-week-48-posts]
    impact: Realistic execution timeline for Phase 10 content creation

metrics:
  duration: 289 seconds
  tasks: 2
  commits: 2
  files-modified: 2
  files-created: 1
  lines-added: 461
  completed: 2026-02-11
---

# Phase 10 Plan 01: Belfast Blog Infrastructure & Content Calendar Summary

**One-liner:** Extended blog types with cluster metadata (type/pillarSlug/relatedClusters), expanded UK keyword map to 19 Belfast entries, and created 24-topic content calendar for 12-week publishing schedule.

---

## What Was Built

### Task 1: Blog Types & Keyword Map Extension
**Duration:** ~2 minutes | **Commit:** e4702d3

Extended blog infrastructure to support pillar-cluster content model:

**Blog Type Extensions:**
- Added 3 optional fields to `BlogPost` and `BlogPostMeta` interfaces:
  - `type?: 'standalone' | 'cluster'` - Marks post as cluster content
  - `pillarSlug?: string` - Links cluster post to parent pillar page
  - `relatedClusters?: string[]` - Enables lateral linking between cluster posts
- Updated `getAllPosts` and `getPostBySlug` to parse cluster metadata from frontmatter
- Used conditional spread operators to only include fields if present in frontmatter
- **Zero breaking changes** - Existing posts without cluster metadata continue working

**UK Keyword Map Expansion:**
Expanded from 8 to 19 Belfast cluster entries across 4 pillars:

| Pillar | Before | After | Added |
|--------|--------|-------|-------|
| SEO Belfast | 4 | 6 | seo-cost-belfast, how-to-rank-on-google-belfast |
| Social Media Belfast | 2 | 5 | tiktok-marketing-belfast, linkedin-marketing-belfast, social-media-strategy-belfast |
| Paid Ads Belfast | 2 | 5 | search-ads-belfast, shopping-ads-belfast, google-ads-management-belfast |
| Website Design Belfast | 0 | 3 | responsive-website-belfast, ecommerce-website-belfast, web-design-trends-belfast |
| **TOTAL** | **8** | **19** | **+11 clusters** |

Each cluster entry includes:
- Primary keyword targeting Belfast market
- Secondary keywords for semantic coverage
- Search intent classification (commercial/informational)
- Slug for blog post URL

**Files Modified:**
- `src/lib/blog.ts` - Interface extensions, parsing logic
- `src/lib/seo/keyword-map.ts` - 11 new cluster entries

---

### Task 2: Belfast Content Calendar
**Duration:** ~3 minutes | **Commit:** a355eeb

Created comprehensive 12-week content calendar with 24 planned blog topics.

**Content Calendar Structure:**
- **Publishing Cadence:** 2 posts per week (Monday + Thursday)
- **Duration:** 12 weeks (3 months)
- **Total Topics:** 24 Belfast blog posts

**Pillar Distribution:**
| Pillar | Post Count | Percentage | Strategy |
|--------|-----------|------------|----------|
| SEO Belfast | 7 posts | 29% | High priority, commercial intent |
| Social Media Belfast | 7 posts | 29% | High priority, commercial intent |
| Paid Ads Belfast | 6 posts | 25% | Medium-high priority |
| Website Design Belfast | 4 posts | 17% | Lower priority (competitive) |

**Calendar Details:**
Each calendar entry includes:
- Week number and publish date
- SEO-optimized title with Belfast context
- URL slug
- Parent pillar mapping
- Primary keyword from Phase 6 research
- Search intent (commercial/informational)
- Priority level (HIGH/MEDIUM/LOW)

**Workflow Documentation:**
- Research phase (15 min) - Keyword analysis, competitor review, Belfast angles
- Outline phase (30 min) - Structure, pillar links, local examples
- Writing phase (2-3 hours) - 1000-1500 words with Belfast context
- Review phase (30 min) - Grammar, readability, link verification
- Publishing phase (15 min) - MDX creation, git commit, build verification
- Distribution phase (30 min) - Social, GBP, email newsletter

**Total time per post:** 4-5 hours (sustainable pace)

**MDX Template Provided:**
Complete frontmatter template including:
```yaml
type: "cluster"
pillarSlug: "[parent-pillar-slug]"
relatedClusters: ["related-post-1", "related-post-2"]
```

Content structure template with:
- Belfast-specific opening hooks
- 2-3 pillar page links with contextual anchors
- Local examples (Cathedral Quarter, Titanic Quarter, BT postcodes)
- Common mistakes section
- Belfast CTA with office address/phone

**Distribution Checklist:**
- LinkedIn organic posting strategy
- Facebook business page shares
- Instagram Stories and carousels
- Google Business Profile posts
- Weekly email newsletter (Friday digest)

**Performance Tracking:**
- Google Analytics metrics (pageviews, time on page, bounce rate, conversions)
- Social engagement tracking (likes, comments, shares)
- Email newsletter metrics (open rate 20-30%, CTR 3-5%)
- Monthly review process with data-driven iteration

**Files Created:**
- `.planning/phases/10-belfast-blog-content-strategy/belfast-content-calendar.md` (377 lines)

---

## Decisions Made

### Decision 1: Optional Cluster Metadata Fields
**Problem:** How to add cluster metadata without breaking existing blog posts?

**Choice:** Made `type`, `pillarSlug`, and `relatedClusters` optional fields in interfaces.

**Rationale:**
- 19 existing blog posts per locale don't have cluster metadata
- Cannot require these fields without breaking existing content
- Optional fields with conditional parsing maintains backward compatibility

**Implementation:**
```typescript
// Interface
type?: 'standalone' | 'cluster';
pillarSlug?: string;
relatedClusters?: string[];

// Parsing (only include if present)
...(data.type && { type: data.type }),
...(data.pillarSlug && { pillarSlug: data.pillarSlug }),
...(data.relatedClusters && { relatedClusters: data.relatedClusters }),
```

**Impact:** Zero breaking changes, zero regressions, 239 pages build successfully.

---

### Decision 2: 19 Cluster Entries vs 30+
**Problem:** How many Belfast cluster entries should we add to keyword map?

**Choice:** Added 19 cluster entries (11 new + 8 existing) across 4 pillars.

**Rationale:**
- Phase 6 research identified 19+ viable cluster keywords with search volume
- Balances across 4 Belfast pillars (SEO: 6, Social: 5, Ads: 5, Design: 3)
- Covers high-priority commercial intent keywords first
- Room for expansion in future phases if needed

**Alternatives considered:**
- **Minimal (8-12 clusters):** Too few for topical authority depth
- **Full expansion (30+ clusters):** Overwhelming, dilutes focus, harder to execute

**Impact:**
- Complete keyword coverage for Plans 10-02 through 10-05
- Each plan has 5-7 cluster posts to create
- Keyword map prevents cannibalization across all Belfast content

---

### Decision 3: 12-Week Calendar vs 6-Week or 24-Week
**Problem:** How long should content calendar cover?

**Choice:** 12 weeks with 24 planned topics (2 posts per week).

**Rationale:**
- **Sustainable pace:** 2 posts/week = 8-10 hours writing + 6-8 hours distribution = 14-18 hours/week
- **Quarterly planning:** 3-month calendar aligns with standard content planning cycles
- **Balanced distribution:** 6-7 posts per pillar over 12 weeks ensures all pillars covered
- **Realistic for small team:** Bailey can execute or decide to outsource based on bandwidth

**Alternatives considered:**
- **6-week (12 posts):** Too short, requires frequent replanning, lacks long-term vision
- **24-week (48 posts):** Too long, planning too far ahead reduces flexibility, market changes

**Impact:**
- Clear roadmap for Phase 10 execution (Plans 10-02 through 10-05)
- Predictable publishing schedule for audience building
- Monthly review checkpoints built in (Week 4, 8, 12)

---

## Verification Results

**TypeScript Compilation:**
```
✓ npx tsc --noEmit passed with zero errors
```

**Build Success:**
```
✓ npm run build succeeded
✓ 239 static pages generated (no regressions)
```

**Interface Verification:**
```
✓ pillarSlug field exists in BlogPost interface (line 21)
✓ pillarSlug field exists in BlogPostMeta interface (line 36)
✓ Conditional parsing implemented in getAllPosts (line 89)
✓ Conditional parsing implemented in getPostBySlug (line 132)
```

**Keyword Map Verification:**
```
✓ instagram-marketing-belfast entry exists (line 209)
✓ 19 total UK cluster entries across 4 pillars:
  - SEO Belfast: 6 clusters
  - Social Media Belfast: 5 clusters
  - Paid Ads Belfast: 5 clusters
  - Website Design Belfast: 3 clusters
```

**Content Calendar Verification:**
```
✓ 24 calendar entries (Week 1-12, 2 posts per week)
✓ All 4 Belfast pillars represented
✓ MDX template includes pillarSlug and relatedClusters
✓ Distribution checklist section present
✓ Content workflow section present
✓ 377 lines (exceeds 100 line minimum)
```

---

## Technical Details

### Blog Type Extension Pattern

**Before (existing structure):**
```typescript
export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  author: string;
  image?: string;
  tags?: string[];
  content: string;
}
```

**After (cluster metadata support):**
```typescript
export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  author: string;
  image?: string;
  tags?: string[];
  content: string;
  type?: 'standalone' | 'cluster';        // NEW: Mark as cluster
  pillarSlug?: string;                    // NEW: Link to parent pillar
  relatedClusters?: string[];             // NEW: Lateral cluster links
}
```

**Parsing Implementation:**
```typescript
// In getAllPosts and getPostBySlug functions
return {
  slug: file.replace(".mdx", ""),
  title: data.title || "Untitled",
  // ... other fields ...
  ...(data.type && { type: data.type }),
  ...(data.pillarSlug && { pillarSlug: data.pillarSlug }),
  ...(data.relatedClusters && { relatedClusters: data.relatedClusters }),
} as BlogPostMeta;
```

**Key Pattern:** Conditional spread operators (`...()`) only include fields if they exist in frontmatter.

---

### Keyword Map Structure

Each cluster entry follows this pattern:

```typescript
{
  slug: 'instagram-marketing-belfast',
  intent: 'commercial',
  primaryKeyword: 'Instagram marketing Belfast',
  secondaryKeywords: [
    'Instagram ads Belfast',
    'IG marketing Belfast',
    'grow Instagram Belfast'
  ]
}
```

**Purpose of fields:**
- `slug` - URL for blog post (`/uk/blog/instagram-marketing-belfast/`)
- `intent` - Search intent (commercial/informational/transactional/navigational)
- `primaryKeyword` - Main keyword to target in title and H1
- `secondaryKeywords` - Supporting keywords for semantic coverage in content

**Cannibalization Prevention:**
The `validateKeywordMap()` function checks that no keyword targets multiple URLs with same intent within same locale. With 19 cluster entries, zero conflicts detected.

---

### Content Calendar Format

**Calendar Entry Example:**
```
| Week | Publish Date | Title | Slug | Pillar | Primary Keyword | Intent | Priority |
|------|--------------|-------|------|--------|----------------|--------|----------|
| 1 | 2026-02-17 | Local SEO Tactics for Belfast Businesses in 2026 | local-seo-belfast | SEO Belfast | local SEO Belfast | Commercial | HIGH |
```

**MDX Frontmatter Example:**
```yaml
---
title: "Local SEO Tactics for Belfast Businesses in 2026"
excerpt: "Proven local SEO strategies to help Belfast SMBs rank higher on Google"
category: "SEO"
type: "cluster"
pillarSlug: "seo-belfast"
relatedClusters:
  - "small-business-seo-belfast"
  - "belfast-google-my-business"
date: "2026-02-17"
author: "Rosey Co. Team"
image: "/images/blog/belfast-local-seo-tactics.jpg"
tags: ["Belfast", "SEO", "Local SEO"]
---
```

**Content Structure Example:**
```markdown
# Local SEO Tactics for Belfast Businesses in 2026

[Opening with Belfast-specific hook]

This guide is part of our comprehensive [SEO Belfast strategy](/uk/seo-belfast/).

## Section 1: The Problem
[Belfast-specific pain points]

## Section 2: The Solution
[Tactics with local examples]

For more strategies, see our [SEO Belfast guide](/uk/seo-belfast/).

## Section 3: Implementation
[Step-by-step with Belfast context]

## Next Steps
Ready to dominate Belfast search? [Contact our Belfast team](/uk/belfast/).

**Related Reading:**
- [Small Business SEO Belfast](/uk/blog/small-business-seo-belfast/)
```

---

## Next Phase Readiness

### Ready for Phase 10 Plan 02 (SEO Cluster Posts)
**Status:** ✅ **READY**

**What's in place:**
- Blog infrastructure supports cluster metadata
- UK keyword map has 6 SEO Belfast cluster entries:
  1. local-seo-belfast (HIGH priority)
  2. small-business-seo-belfast (HIGH priority)
  3. technical-seo-belfast (MEDIUM priority)
  4. link-building-belfast (MEDIUM priority)
  5. seo-cost-belfast (MEDIUM priority)
  6. how-to-rank-on-google-belfast (MEDIUM priority)
- Content calendar provides publishing schedule (Weeks 1-12)
- MDX template with cluster frontmatter documented
- Distribution workflow documented

**Next actions for Plan 10-02:**
1. Create 6 SEO Belfast cluster blog posts following content calendar schedule
2. Use MDX template with `pillarSlug: "seo-belfast"` in each post
3. Link to `/uk/seo-belfast/` pillar page 2-3 times per post
4. Add lateral links to related SEO clusters
5. Follow distribution checklist for each post
6. Commit each post with message: `content(10-02): add [slug] SEO cluster post`

**Estimated timeline:** Weeks 1-6 (6 SEO posts at 2 posts/week mixed with other pillars)

---

### Ready for Phase 10 Plans 03-05 (Remaining Cluster Posts)
**Status:** ✅ **READY**

**Plan 10-03: Social Media Cluster Posts (5 posts)**
- instagram-marketing-belfast
- facebook-marketing-belfast
- tiktok-marketing-belfast
- linkedin-marketing-belfast
- social-media-strategy-belfast

**Plan 10-04: Paid Ads Cluster Posts (5 posts)**
- ppc-belfast
- google-ads-cost-belfast
- search-ads-belfast
- shopping-ads-belfast
- google-ads-management-belfast

**Plan 10-05: Website Design Cluster Posts (3 posts)**
- responsive-website-belfast
- ecommerce-website-belfast
- web-design-trends-belfast

**Infrastructure ready:**
- Content calendar schedules all 24 posts across 12 weeks
- Each cluster entry in keyword map provides primary/secondary keywords
- MDX template adaptable to all 4 pillars (just change `pillarSlug`)
- Distribution workflow same for all posts

---

## Deviations from Plan

**None** - Plan executed exactly as written.

Tasks completed:
1. ✅ Extended blog types with optional cluster metadata (type, pillarSlug, relatedClusters)
2. ✅ Expanded UK keyword map from 8 to 19 Belfast cluster entries
3. ✅ Created 12-week content calendar with 24 planned topics
4. ✅ Documented publishing workflow, MDX template, distribution checklist
5. ✅ Zero TypeScript errors, build succeeded with 239 pages

---

## Commits

| Commit | Message | Files |
|--------|---------|-------|
| e4702d3 | feat(10-01): extend blog types and keyword map for cluster content | src/lib/blog.ts, src/lib/seo/keyword-map.ts |
| a355eeb | feat(10-01): create Belfast content calendar with 24 planned topics | belfast-content-calendar.md |

**Total commits:** 2
**Total files modified:** 2
**Total files created:** 1
**Total lines added:** 461

---

## Performance Metrics

**Execution Time:**
- Start: 2026-02-11 12:11:13 UTC
- End: 2026-02-11 12:16:02 UTC
- **Duration:** 289 seconds (~5 minutes)

**Build Performance:**
- TypeScript compilation: Passed
- Static page generation: 239 pages
- Build time: ~10-15 seconds
- Zero errors, zero warnings

**Code Quality:**
- TypeScript strict mode: Passed
- No `any` types introduced
- Backward compatible (zero breaking changes)
- Existing blog posts continue working

---

## Key Learnings

### What Worked Well

**1. Optional Fields Pattern for Backward Compatibility**
Using optional fields (`type?: string`) with conditional spread operators maintained 100% backward compatibility. All 19 existing blog posts per locale continue working without modification.

**2. Keyword Map Organization by Pillar**
Organizing keyword map by pillar (SEO, Social Media, Paid Ads, Website Design) aligns perfectly with Belfast pillar architecture from Phase 7. Makes it easy to see which cluster posts support which pillar.

**3. Comprehensive Content Calendar**
Including workflow, MDX template, distribution checklist, and performance tracking in content calendar document provides complete execution roadmap for Plans 10-02 through 10-05.

---

### Challenges Encountered

**None** - Infrastructure work executed smoothly.

This was pure data structure extension (interfaces) and planning documentation (content calendar). No complex algorithms, no external API integrations, no deployment concerns.

---

### Patterns Established

**Pattern 1: Cluster Content Metadata**
```yaml
type: "cluster"
pillarSlug: "parent-pillar-slug"
relatedClusters: ["related-1", "related-2"]
```
This metadata structure enables:
- Identifying cluster posts vs standalone posts
- Linking cluster posts to parent pillars
- Creating lateral links between related clusters
- Building topical authority through structured internal linking

**Pattern 2: Content Calendar Structure**
Table format with these columns:
- Week + Publish Date (scheduling)
- Title + Slug (SEO optimization)
- Pillar (architecture mapping)
- Primary Keyword (Phase 6 research)
- Intent (search intent classification)
- Priority (execution ordering)

This format provides at-a-glance view of:
- What to write (title, keyword)
- When to publish (date)
- How it fits (pillar, intent)
- Execution order (priority)

**Pattern 3: Belfast Content Template**
Every Belfast cluster post must include:
1. Belfast-specific opening hook (Cathedral Quarter, Titanic Quarter, BT postcodes)
2. Pillar page link in opening paragraph
3. Local examples throughout content
4. Pillar page link in mid-content
5. Belfast CTA with office address/phone
6. Related cluster links at end

This pattern ensures authentic Belfast context (not generic keyword-stuffed content).

---

## Related Documentation

**Phase 6:** Belfast keyword research and topical clusters
- `.planning/phases/06-belfast-seo-research-a-strategy/belfast-keyword-map.md`
- `.planning/phases/06-belfast-seo-research-a-strategy/belfast-topical-clusters.md`

**Phase 7:** Pillar architecture and internal linking
- `.planning/phases/07-topical-authority-architecture/07-RESEARCH.md`

**Phase 10:** Blog content strategy research
- `.planning/phases/10-belfast-blog-content-strategy/10-RESEARCH.md`
- `.planning/phases/10-belfast-blog-content-strategy/belfast-content-calendar.md`

**Implementation Files:**
- `src/lib/blog.ts` - Blog loading functions with cluster metadata support
- `src/lib/seo/keyword-map.ts` - Belfast keyword-to-URL mapping (19 clusters)
- `src/content/blog/uk/` - Future location for Belfast cluster MDX files

---

## Summary

Phase 10 Plan 01 successfully established the infrastructure for Belfast blog content creation:

✅ **Blog types extended** with optional cluster metadata (type, pillarSlug, relatedClusters)
✅ **UK keyword map expanded** from 8 to 19 Belfast cluster entries across 4 pillars
✅ **Content calendar created** with 24 planned topics over 12 weeks (2 posts/week)
✅ **Publishing workflow documented** (research → outline → write → review → publish → distribute)
✅ **MDX template provided** with Belfast-specific patterns and cluster frontmatter
✅ **Distribution checklist created** (LinkedIn, Facebook, Instagram, GBP, email)
✅ **Performance tracking defined** (GA metrics, social engagement, email metrics)

**Zero breaking changes.** All 19 existing blog posts per locale continue working.
**Zero regressions.** Build succeeds with 239 pages.
**Zero technical debt.** Clean TypeScript interfaces, backward compatible parsing.

**Ready for execution:** Plans 10-02 through 10-05 can now create Belfast cluster blog posts using established infrastructure, keyword map, and content calendar.

**Execution time:** 289 seconds (~5 minutes)
**Quality:** Zero TypeScript errors, clean build, comprehensive documentation

---

*Phase 10 Plan 01 Complete*
*Next: Plan 10-02 (SEO Cluster Posts) - Create 6 SEO Belfast blog posts*

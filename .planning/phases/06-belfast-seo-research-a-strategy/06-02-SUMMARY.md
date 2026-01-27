# Phase 6 Plan 2: Belfast Topical Map & Content Architecture Summary

**Pillar-cluster architecture designed with 4 pillars, 21-28 clusters, and comprehensive keyword mapping for Belfast topical authority**

## Accomplishments

- Grouped 115+ seed keywords into 4 topical clusters aligned with Rosey Co services
- Designed complete pillar-cluster content architecture with URL structure and internal linking
- Created keyword-to-URL mapping table preventing cannibalization across 60+ keywords
- Documented search intent differentiation strategy for 25-32 pages
- Established schema markup patterns and mobile-first design principles

## Task Commits

Each task was committed atomically:

1. **Task 1: Group keywords into topical clusters** - `df69d14` (feat)
2. **Task 2: Design pillar-cluster content architecture** - `91a4a35` (feat)
3. **Task 3: Create keyword mapping document** - `3255217` (feat)

**Plan metadata:** (next commit)

## Files Created/Modified

- `.planning/phases/06-belfast-seo-research-a-strategy/belfast-topical-clusters.md` - 4 topical clusters with 5-8 cluster pages each, search intent distribution, cross-cluster linking opportunities
- `.planning/phases/06-belfast-seo-research-a-strategy/belfast-content-architecture.md` - Complete pillar-cluster design with URL structure, internal linking map, schema markup, mobile optimization
- `.planning/phases/06-belfast-seo-research-a-strategy/belfast-keyword-map.md` - Keyword-to-URL mapping table with 60+ keywords, validation rules, usage instructions

## Decisions Made

### Topical Structure Decisions
1. **4 pillar pages prioritized:**
   - SEO Belfast (highest priority, 6-8 clusters)
   - Social Media Marketing Belfast (5-7 clusters)
   - Google Ads Belfast (5-6 clusters)
   - Digital Marketing Belfast (umbrella pillar, 5-7 clusters + hub to other pillars)

2. **Website Design Belfast deferred to Phase 2:**
   - Rationale: Higher competition, focus on SEO/Social/Ads first (better market fit)
   - 3-5 cluster pages planned for future expansion

3. **Total content target: 25-32 pages vs competitors' 10-20:**
   - Differentiation through depth = 40% higher visibility (Semrush 2025)
   - 4 pillars (2500-3000 words each) + 21-28 clusters (1000-1500 words each)

### URL Structure Decisions
1. **Pillar pages:** `/uk/{service}-belfast/` format
   - Example: `/uk/seo-belfast/`, `/uk/social-media-marketing-belfast/`
   - Rationale: Belfast-specific landing pages (vs global `/uk/services/seo/`)

2. **Cluster pages:** `/uk/blog/{topic-belfast}/` format
   - Example: `/uk/blog/local-seo-belfast/`, `/uk/blog/instagram-marketing-belfast/`
   - Rationale: Blog structure for topical content, clear hierarchy

3. **Service page differentiation:**
   - `/uk/services/seo/` = Global service (6 locales, company-wide)
   - `/uk/seo-belfast/` = Belfast-specific pillar (local focus, Belfast case studies)
   - Rationale: Different intent, no cannibalization

### Internal Linking Strategy Decisions
1. **Pillar → Cluster:** 5-8 contextual links per pillar
   - Anchor text: Natural, descriptive (not exact match)
   - Example: "learn more about local SEO in Belfast" (not "local SEO Belfast")

2. **Cluster → Pillar:** 1 contextual link back to pillar
   - Placement: Intro or outro paragraph
   - Example: "our comprehensive SEO services in Belfast"

3. **Lateral Cluster Links:** 2-3 related topics per cluster
   - Same pillar: Complementary tactics
   - Cross-pillar: Complementary services
   - Example: Local SEO ↔ Small Business SEO (similar audience)

### Search Intent Differentiation Decisions
1. **Prevent cannibalization through intent:**
   - Commercial/Transactional → Pillar pages (service offering, pricing, CTA)
   - Commercial Research → Comparison content ("best agency Belfast")
   - Informational → Blog posts (educational guides, no hard sell)

2. **Example differentiation (SEO Belfast topic):**
   - `/uk/seo-belfast/` = Commercial (hire us, CTA, pricing)
   - `/uk/blog/seo-cost-belfast/` = Informational (pricing education, budget guide)
   - `/uk/blog/how-to-rank-on-google-belfast/` = Informational (educational, DIY guide)
   - No conflict: Same root keyword, different user journey stages

### Schema Markup Decisions
1. **Pillar pages:** LocalBusiness + Service + FAQ schema
   - LocalBusiness: Belfast address (1 Hollycroft Avenue, Belfast BT5 5JE)
   - Service: Per offering (SEO, Social Media, Google Ads)
   - FAQ: 5-8 questions for featured snippets

2. **Cluster pages:** Article + Breadcrumb schema
   - Article: Author/publisher organization
   - Breadcrumb: Clear hierarchy (Home → Pillar → Cluster)

### Mobile-First Design Decisions
1. **68% of Belfast searches are mobile** (from 06-RESEARCH.md)
   - Short paragraphs (2-3 sentences max)
   - H2/H3 every 200-300 words (visual breaks)
   - Images/graphics every 400-500 words
   - Sticky CTA on mobile

2. **Next.js optimization:**
   - Image component for lazy loading
   - Minimize JavaScript bundle
   - Core Web Vitals focus

## Deviations from Plan

None - plan executed exactly as written.

All 3 tasks completed as specified:
- Task 1: Grouped keywords into topical clusters ✓
- Task 2: Designed pillar-cluster architecture ✓
- Task 3: Created keyword-to-URL mapping ✓

No additional work required beyond plan scope.

## Issues Encountered

None - all tasks completed without problems.

Keyword grouping, architecture design, and mapping creation proceeded smoothly based on research from Plans 06-01 and 06-RESEARCH.md.

## Next Phase Readiness

**Ready for Plan 06-03: SEO Strategy Documentation & Implementation Roadmap**

### Inputs for Plan 06-03
- ✅ Topical clusters defined (4 pillars with cluster breakdowns)
- ✅ Content architecture complete (URL structure, linking strategy, schema)
- ✅ Keyword mapping established (60+ keywords, cannibalization prevention)
- ✅ Search intent differentiation documented
- ✅ Implementation priorities clear (Phases 7-10 sequence)

### Expected Outputs from Plan 06-03
1. Belfast SEO Strategy master document (executive summary, market analysis, competitive positioning)
2. Success metrics and KPIs (baseline and target states)
3. Implementation roadmap mapping strategy to Phases 7-12

### Blockers
None - all prerequisite research and planning complete.

---

## Phase 6 Progress

- ✅ Plan 06-01: Belfast Keyword Research & Competitive Analysis (COMPLETE)
- ✅ Plan 06-02: Topical Map & Content Architecture (COMPLETE)
- ⏭️ Plan 06-03: SEO Strategy Documentation & Implementation Roadmap (NEXT)

**Phase 6 Status:** 2 of 3 plans complete (67% progress)

## Key Metrics

**Content architecture scope:**
- 4 pillar pages (10,000-12,000 words total content)
- 21-28 cluster pages (21,000-42,000 words total content)
- Total: 25-32 pages, 31,000-54,000 words
- vs Competitors: 10-20 pages, 5,000-16,000 words

**Differentiation factor:** 2.5-3x content depth

**Topical authority benefits:**
- 40% higher visibility vs isolated posts (Semrush 2025)
- Multiple pages ranking for related keywords (cluster effect)
- Internal linking distributes authority from pillar to clusters
- Demonstrates expertise through depth, not just claims

**Keywords mapped:** 60+ with clear URL assignments
**Cannibalization risks:** 0 (prevented by design)
**Cross-pillar linking opportunities:** 6 identified

## Strategic Insights

### Content Depth = Primary Competitive Advantage
Competitors have thin content (10-20 pages, 500-800 words each). Rosey Co's pillar-cluster model delivers 25-32 pages with 1,500-2,500 word average = topical authority that competitors can't match without complete content overhaul.

### Intent Differentiation Prevents Cannibalization
By mapping same-root keywords to different pages based on user journey stage (commercial vs informational), we capture users at multiple touchpoints without competing with ourselves.

### Mobile-First Critical for Belfast Market
68% mobile traffic + 46% "near me" searches = mobile experience and GBP optimization are non-negotiable for Belfast SEO success.

### SMB Focus = Market Opportunity
Belfast has 15,000+ SMBs with £500-2000/month budgets. Enterprise agencies (VINDICTA) don't serve this segment effectively. Topical content demonstrates expertise at accessible price point.

### Cross-Pillar Synergy
Digital Marketing pillar serves as hub linking to 3 specific service pillars. Lead Generation cluster links to all (multi-channel approach). Creates interconnected authority network.

---

*Phase: 06-belfast-seo-research-a-strategy*
*Completed: 2026-01-27*

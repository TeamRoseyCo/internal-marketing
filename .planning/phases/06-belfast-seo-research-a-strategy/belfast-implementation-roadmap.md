# Belfast SEO Implementation Roadmap

**Purpose:** Map content architecture and SEO strategy to Phases 7-12 with actionable deliverables, dependencies, and sequencing.

**Timeline:** 12-16 weeks (3-4 months) from kickoff to full implementation
**Execution Model:** Sequential phases with some parallel tasks where dependencies allow

---

## Roadmap Overview

```
Phase 7: Topical Authority Architecture (Weeks 1-2)
    ↓
Phase 8: Belfast Location Pages (Weeks 3-4)
    ↓
Phase 9: Service-Location Content Matrix (Weeks 5-8)
    ↓
Phase 10: Belfast Blog Content (Weeks 9-12)
    ↓
Phase 11: Link Building & Citations (Weeks 13-14)
    ↓
Phase 12: Analytics & Monitoring (Weeks 15-16)
```

**Critical Path:** Phases 7-8 must complete before Phase 9. Phase 10 can partially overlap Phase 9. Phases 11-12 can overlap Phase 10.

---

## Phase 7: Topical Authority Architecture

**Duration:** Weeks 1-2
**Focus:** Build technical infrastructure for pillar-cluster content model
**Team:** Developer + SEO strategist

### Objectives

Implement the technical foundation required for Belfast topical authority content without writing full content yet. Create reusable templates and components that make pillar/cluster content creation efficient.

### Key Deliverables

**1. Pillar Page Template Component**

File: `src/app/[locale]/[pillar-slug]/page.tsx` (template)

Features:
- Dynamic route for pillar pages
- 2500-3000 word capacity layout
- Schema markup integration (LocalBusiness + Service + FAQ)
- Internal linking section to clusters
- CTA placement (above fold, mid-content, bottom)
- Mobile-responsive design (68% Belfast searches on mobile)
- Fast loading (< 2.5s LCP)

Schema to include:
```typescript
<BelfastLocalBusinessSchema />
<ServiceSchema serviceType={pillar.serviceType} />
<FAQSchema questions={pillar.faqs} />
<BreadcrumbSchema items={pillar.breadcrumbs} />
```

**2. Cluster Page Template Component**

File: `src/app/[locale]/blog/[cluster-slug]/page.tsx` (template)

Features:
- Dynamic route for blog cluster pages
- 1000-1500 word capacity layout
- Article schema markup
- Breadcrumb schema
- Link back to pillar (contextual placement)
- Lateral links to related clusters (2-3)
- CTA mid-content
- Related posts section

Schema to include:
```typescript
<ArticleSchema article={cluster} />
<BreadcrumbSchema items={cluster.breadcrumbs} />
```

**3. Internal Linking Utility**

File: `src/lib/seo/internal-links.ts`

Purpose: Manage internal linking relationships between pillars and clusters to prevent orphan pages and ensure proper link distribution.

Functions:
```typescript
// Get all clusters for a pillar
getClusterPages(pillarSlug: string): ClusterPage[]

// Get pillar for a cluster
getPillarPage(clusterSlug: string): PillarPage

// Get related clusters (same pillar)
getRelatedClusters(clusterSlug: string, limit: number): ClusterPage[]

// Generate contextual anchor text (vary phrases, avoid exact match)
generateAnchorText(targetPage: Page, context: string): string
```

**4. Schema Markup Components**

Files:
- `src/components/seo/belfast-schema.tsx` (enhanced LocalBusiness for Belfast)
- `src/components/seo/service-schema.tsx` (per-pillar service markup)
- `src/components/seo/faq-schema.tsx` (pillar FAQ sections)
- `src/components/seo/article-schema.tsx` (cluster blog posts)
- `src/components/seo/breadcrumb-schema.tsx` (already exists, enhance for clusters)

Requirements:
- All schema types from belfast-content-architecture.md
- Belfast-specific data (1 Hollycroft Avenue, +44 7722 432679)
- Dynamic based on page context
- Validates against schema.org spec

**5. Content Data Structure**

File: `src/data/belfast-content.ts` (or use CMS if available)

Structure pillars and clusters as data:
```typescript
export const belfastPillars = [
  {
    slug: 'seo-belfast',
    title: 'SEO Belfast | Expert SEO Services Northern Ireland',
    metaDescription: '...',
    keywords: ['SEO Belfast', 'SEO agency Belfast', ...],
    serviceType: 'SEO Belfast',
    faqs: [...],
    clusters: [
      { slug: 'local-seo-belfast', title: '...', ... },
      { slug: 'small-business-seo-belfast', title: '...', ... },
      // ...
    ]
  },
  // ... other pillars
];
```

Benefits:
- Single source of truth for content relationships
- Easy to validate no broken internal links
- Can generate sitemap automatically
- Future CMS integration easier

**6. Breadcrumb Schema Enhancement**

Update existing breadcrumb component to support 3-level hierarchy:
```
Home > SEO Belfast > Local SEO Belfast
```

### Success Criteria

- [ ] Build succeeds with new template components
- [ ] Pillar page template renders correctly (test with dummy content)
- [ ] Cluster page template renders correctly
- [ ] All schema markup validates (use schema.org validator)
- [ ] Internal linking utility functions work (unit tests)
- [ ] Mobile-responsive on all screen sizes
- [ ] Lighthouse performance ≥90

### Dependencies

**Required from Prior Phases:**
- Phase 1: Hreflang and SEO utilities (`src/lib/seo.ts`)
- Phase 1: LocalBusiness schema component (enhance for Belfast)
- Phase 5: Performance optimizations (preconnect, Lenis)

**Blocks Phase 8:** Content can't be written efficiently without templates

---

## Phase 8: Belfast Location Pages

**Duration:** Weeks 3-4
**Focus:** Write and publish 4 pillar pages with Belfast-specific content
**Team:** Content writer + SEO strategist + developer (for schema/technical)

### Objectives

Create comprehensive 2500-3000 word pillar pages for each core service, optimized for Belfast market with local case studies, examples, and proper schema markup.

### Key Deliverables

**1. SEO Belfast Pillar Page**

URL: `/uk/seo-belfast/`
Target Keyword: SEO Belfast (Commercial/Transactional)
Word Count: 2500-3000 words
Priority: Highest (core service, highest commercial value)

Content Requirements:
- Why Belfast businesses choose Rosey Co for SEO (local expertise)
- Our Belfast SEO services (local SEO, technical, link building, SMB focus)
- How we drive results for Belfast SMBs (process, methodology)
- Belfast SEO success stories (2-3 case studies with metrics)
- SEO pricing & packages (transparent, SMB-friendly)
- Why Belfast SEO matters in 2026 (market opportunity, AI search)
- Free SEO audit CTA (lead capture)
- FAQ section (5-8 questions with schema markup)

Belfast-Specific Elements:
- Mention Cathedral Quarter, Titanic Quarter, Belfast neighborhoods
- Reference Belfast business ecosystem (15,000+ SMBs)
- Local competition context (20+ agencies competing)
- Northern Ireland market understanding
- Case study: "Belfast Café Triples Organic Traffic in 6 Months"

Schema Markup:
- LocalBusiness (1 Hollycroft Avenue, Belfast BT5 5JE)
- Service (SEO Belfast, areaServed: Belfast)
- FAQ (schema-ready questions)
- Breadcrumb (Home > SEO Belfast)

Internal Links:
- Link to 6 cluster pages (once created in Phase 9-10)
- Contextual anchor text (natural, not exact match)

**2. Social Media Marketing Belfast Pillar Page**

URL: `/uk/social-media-marketing-belfast/`
Target Keyword: social media marketing Belfast
Word Count: 2500-3000 words
Priority: High

Content Requirements:
- Why Belfast businesses need social media marketing
- Our social media services (Instagram, Facebook, TikTok, LinkedIn)
- How we grow social media presence (process, content creation)
- Belfast social media success stories (2-3 case studies)
- Social media packages & pricing
- Organic vs paid social media (guidance)
- Free social media audit CTA
- FAQ section (5-8 questions)

Belfast-Specific Elements:
- Belfast consumer behavior on social media
- Local influencer partnerships
- Belfast event marketing (City Marathon, Arts Festival)
- Case study: "Belfast Retailer Gains 10K Instagram Followers in 3 Months"

Schema Markup: LocalBusiness, Service, FAQ, Breadcrumb

Internal Links: Link to 5 cluster pages (Instagram, Facebook, TikTok, LinkedIn, Strategy)

**3. Google Ads Belfast Pillar Page**

URL: `/uk/google-ads-belfast/`
Target Keyword: Google Ads Belfast
Word Count: 2500-3000 words
Priority: High

Content Requirements:
- Why Google Ads for Belfast businesses (immediate visibility)
- Our Google Ads services (Search, Shopping, Display, Remarketing)
- How we maximize ad spend (optimization process, reporting)
- Google Ads success stories Belfast (2-3 case studies with ROAS metrics)
- PPC pricing & management packages
- Google Ads vs SEO: When to use each (comparison)
- Free Google Ads audit CTA
- FAQ section (5-8 questions)

Belfast-Specific Elements:
- Belfast PPC competition and cost-per-click trends
- Local targeting strategies (Belfast neighborhoods, NI-wide)
- Case study: "Belfast Ecommerce Store Achieves 400% ROAS"

Schema Markup: LocalBusiness, Service, FAQ, Breadcrumb

Internal Links: Link to 5 cluster pages (PPC, Cost, Search Ads, Shopping, Management)

**4. Digital Marketing Belfast Pillar Page**

URL: `/uk/digital-marketing-belfast/`
Target Keyword: digital marketing Belfast
Word Count: 2500-3000 words
Priority: Medium-High (umbrella content, links to other pillars)

Content Requirements:
- Why Belfast businesses choose Rosey Co
- Our digital marketing services (overview of SEO, Social, Ads, Web)
- Integrated marketing approach (how services work together)
- Belfast digital marketing success stories
- Packages & pricing (multi-service bundles)
- Why integrated marketing beats single-channel
- Free digital marketing strategy session CTA
- FAQ section (5-8 questions)

Belfast-Specific Elements:
- Belfast business landscape and digital maturity
- Multi-channel strategies for Belfast SMBs
- Case study: "Belfast Professional Services Firm Doubles Leads with Integrated Strategy"

Schema Markup: LocalBusiness, Service, FAQ, Breadcrumb

Internal Links:
- Link to 3 other pillar pages (SEO, Social, Google Ads)
- Link to 4 cluster pages (Strategy, Best Agency, Lead Gen, Traffic)

**5. Belfast Case Studies (2-3 Initial)**

Create placeholder case studies (can be based on past client work, even if not Belfast-specific initially):

Template:
- Client industry and challenge
- Services provided (SEO, social, ads)
- Strategy and execution
- Results with metrics (% traffic increase, leads/month, revenue impact)
- Client testimonial quote
- Before/after screenshots or data visualizations

Use in pillar pages to demonstrate results and build E-E-A-T signals.

**6. Enhanced LocalBusiness Schema Implementation**

Add to all 4 pillar pages:
```typescript
<BelfastLocalBusinessSchema
  serviceType={pillarServiceType}
  url={pillarUrl}
  description={pillarDescription}
/>
```

Includes:
- Belfast address and phone
- Geo coordinates (54.5833, -5.9333)
- Area served (Belfast, Northern Ireland)
- Price range (£££)
- Opening hours (Mon-Fri 9:00-17:00)

**7. "Near Me" Optimization**

Optimize all pillar pages for "near me" searches:
- LocalBusiness schema with precise geo coordinates
- "Serving Belfast" and "Based in Belfast" statements in content
- NAP (Name, Address, Phone) in footer of every page
- Click-to-call phone links on mobile
- GBP integration (link to GBP from site)

### Success Criteria

- [ ] 4 pillar pages published and live
- [ ] All pages 2500-3000 words with Belfast-specific content
- [ ] All schema markup implemented and validates
- [ ] All pages indexed in Google Search Console within 2 weeks
- [ ] No keyword cannibalization detected (search console shows unique primary keyword per page)
- [ ] Mobile-responsive and fast (< 2.5s LCP)
- [ ] Build succeeds with no errors
- [ ] Internal linking structure verified (links work, no 404s)

### Dependencies

**Required from Phase 7:**
- Pillar page template component
- Schema markup components
- Content data structure

**Blocks Phase 9:** Cluster pages reference pillar pages, need pillars live first

### Content Calendar (Phase 8)

**Week 3:**
- Day 1-2: Write SEO Belfast pillar (highest priority)
- Day 3-4: Write Digital Marketing Belfast pillar (second priority, links to SEO pillar)
- Day 5: Technical implementation and schema for both pages

**Week 4:**
- Day 1-2: Write Social Media Marketing Belfast pillar
- Day 3-4: Write Google Ads Belfast pillar
- Day 5: Technical implementation, cross-linking all 4 pillars, final QA

**Publishing Schedule:**
- Monday Week 3: Publish SEO Belfast pillar
- Wednesday Week 3: Publish Digital Marketing Belfast pillar
- Monday Week 4: Publish Social Media Marketing Belfast pillar
- Wednesday Week 4: Publish Google Ads Belfast pillar

**Why this sequence:**
- SEO first (highest commercial value)
- Digital Marketing second (umbrella, links to SEO)
- Social and Ads in Week 4 (complementary services)
- 2-3 days between publishes (avoid spam signals)

---

## Phase 9: Service-Location Content Matrix

**Duration:** Weeks 5-8 (4 weeks)
**Focus:** Write 8-12 primary cluster pages (2-3 per pillar)
**Team:** Content writer + SEO strategist

### Objectives

Create high-quality 1000-1500 word cluster pages that support pillar pages, target long-tail keywords, and build topical authority through proper internal linking.

### Key Deliverables

**SEO Belfast Clusters (Week 5):**

1. **Local SEO Belfast** (`/uk/blog/local-seo-belfast/`)
   - Target: local SEO Belfast, Belfast Google rankings
   - Intent: Commercial (niche service)
   - Word Count: 1000-1500
   - Content: Local search strategies, GBP optimization, Belfast citations
   - Link back to: SEO Belfast pillar (1 contextual link)
   - Lateral links to: Small Business SEO Belfast, Link Building Belfast

2. **Small Business SEO Belfast** (`/uk/blog/small-business-seo-belfast/`)
   - Target: small business SEO Belfast, affordable SEO Belfast
   - Intent: Commercial (target audience segment)
   - Word Count: 1000-1500
   - Content: SEO for SMB budgets, DIY vs agency, case study
   - Link back to: SEO Belfast pillar
   - Lateral links to: Local SEO Belfast, SEO Cost Belfast

**Social Media Marketing Clusters (Week 6):**

3. **Instagram Marketing Belfast** (`/uk/blog/instagram-marketing-belfast/`)
   - Target: Instagram marketing Belfast, Instagram ads Belfast
   - Intent: Commercial/Transactional
   - Word Count: 1200-1600
   - Content: Instagram growth strategies, organic + ads, Belfast audiences
   - Link back to: Social Media Marketing Belfast pillar
   - Lateral links to: Facebook Marketing Belfast, TikTok Marketing Belfast

4. **Facebook Marketing Belfast** (`/uk/blog/facebook-marketing-belfast/`)
   - Target: Facebook marketing Belfast, Facebook ads Belfast
   - Intent: Commercial/Transactional
   - Word Count: 1200-1600
   - Content: Facebook page optimization, ads targeting, Belfast audiences
   - Link back to: Social Media Marketing Belfast pillar
   - Lateral links to: Instagram Marketing Belfast, Social Media Strategy Belfast

**Google Ads Clusters (Week 7):**

5. **PPC Belfast** (`/uk/blog/ppc-belfast/`)
   - Target: PPC Belfast, PPC agency Belfast
   - Intent: Commercial/Transactional
   - Word Count: 1000-1500
   - Content: PPC basics, PPC vs SEO, managing budget, agency selection
   - Link back to: Google Ads Belfast pillar
   - Lateral links to: Google Ads Management Belfast

6. **Google Ads Cost Belfast** (`/uk/blog/google-ads-cost-belfast/`)
   - Target: Google Ads cost Belfast, PPC pricing Belfast
   - Intent: Informational/Commercial research
   - Word Count: 1200-1800
   - Content: Average ad spend, what determines cost, budget planning, ROI
   - Link back to: Google Ads Belfast pillar
   - Lateral links to: PPC Belfast

**Digital Marketing Clusters (Week 8):**

7. **Lead Generation Belfast** (`/uk/blog/lead-generation-belfast/`)
   - Target: lead generation Belfast, get more customers Belfast
   - Intent: Commercial/Transactional
   - Word Count: 1200-1600
   - Content: Lead gen strategies across channels (SEO, social, ads)
   - Link back to: Digital Marketing Belfast pillar
   - Lateral links to: SEO Belfast pillar, Google Ads Belfast pillar, Social Media Marketing Belfast pillar (cross-pillar linking!)

8. **Digital Marketing Strategy Belfast** (`/uk/blog/digital-marketing-strategy-belfast/`)
   - Target: digital marketing strategy Belfast, online marketing plan
   - Intent: Informational
   - Word Count: 1500-2000
   - Content: Strategic planning guide, goal setting, channel selection, measurement
   - Link back to: Digital Marketing Belfast pillar
   - Lateral links to: Lead Generation Belfast

**Optional (if time allows in Phase 9):**

9. **SEO Services Belfast** (`/uk/blog/seo-services-belfast/`)
10. **Social Media Agency Belfast** (`/uk/blog/social-media-agency-belfast/`)
11. **Google Ads Management Belfast** (`/uk/blog/google-ads-management-belfast/`)
12. **Best Digital Marketing Agency Belfast** (`/uk/blog/best-digital-marketing-agency-belfast/`)

### Implementation Process Per Cluster

**Step 1: Content Writing**
- Research keyword intent (informational vs commercial)
- Outline H2 sections (from belfast-content-architecture.md)
- Write 1000-1500 words with Belfast-specific examples
- Include 2-3 case study references or data points
- Add CTA mid-content (appropriate to intent)

**Step 2: Internal Linking**
- Add 1 contextual link back to pillar page
- Add 2-3 lateral links to related cluster pages
- Use varied anchor text (natural phrases, not exact match)
- Verify pillar page links to this cluster (bidirectional)

**Step 3: Schema Markup**
- Implement Article schema with author, published date
- Implement Breadcrumb schema (Home > Pillar > Cluster)
- Add FAQ schema if cluster includes Q&A section

**Step 4: Belfast-Specific Optimization**
- Reference Belfast neighborhoods, businesses, context
- Include Belfast-specific examples or case studies
- Use "Belfast" naturally 3-5 times (not stuffed)
- Add original photos if possible (not just stock)

### Success Criteria

- [ ] 8-12 cluster pages published (2-3 per pillar minimum)
- [ ] All pages 1000-1500+ words
- [ ] All pages link back to respective pillar page
- [ ] Lateral links between related clusters implemented
- [ ] All pages indexed within 2 weeks
- [ ] Article schema and breadcrumb schema on all cluster pages
- [ ] No keyword cannibalization (verify in Search Console)
- [ ] Mobile-responsive and fast load times

### Dependencies

**Required from Phase 8:**
- 4 pillar pages live (clusters link to pillars)
- Pillar pages updated to link to clusters (bidirectional linking)

**Blocks Phase 10:** Phase 10 is continuation of cluster content, not blocked but builds on Phase 9

### Content Calendar (Phase 9)

**Publishing Schedule (2-3 per week):**
- Monday Week 5: Local SEO Belfast
- Wednesday Week 5: Small Business SEO Belfast
- Monday Week 6: Instagram Marketing Belfast
- Wednesday Week 6: Facebook Marketing Belfast
- Monday Week 7: PPC Belfast
- Wednesday Week 7: Google Ads Cost Belfast
- Monday Week 8: Lead Generation Belfast
- Wednesday Week 8: Digital Marketing Strategy Belfast

**Why this sequence:**
- Mix pillar topics (don't complete one pillar before others)
- 2-3 days between publishes (natural content velocity)
- Commercial intent first, informational later

---

## Phase 10: Belfast Blog Content Strategy

**Duration:** Weeks 9-12 (4 weeks)
**Focus:** Write remaining 8-12 cluster pages to complete topical coverage
**Team:** Content writer + SEO strategist

### Objectives

Complete the 20-24 total cluster pages (4-6 per pillar) to establish comprehensive topical authority. Focus on informational keywords and long-tail variations that competitors miss.

### Key Deliverables

**SEO Belfast - Remaining Clusters:**

13. **Technical SEO Belfast** (`/uk/blog/technical-seo-belfast/`)
   - Target: technical SEO Belfast, website optimization Belfast
   - Intent: Commercial (qualified buyers)
   - Word Count: 1000-1500
   - Content: Core Web Vitals, mobile optimization, schema markup, technical audit

14. **Link Building Belfast** (`/uk/blog/link-building-belfast/`)
   - Target: link building Belfast, backlinks Belfast
   - Intent: Commercial/Informational
   - Word Count: 1000-1500
   - Content: Local link opportunities, Belfast directories, content marketing

15. **SEO Cost Belfast** (`/uk/blog/seo-cost-belfast/`)
   - Target: SEO cost Belfast, SEO pricing Belfast
   - Intent: Informational/Commercial research
   - Word Count: 1200-1800
   - Content: Pricing transparency, average Belfast costs, budget planning, ROI

16. **How to Rank on Google Belfast** (`/uk/blog/how-to-rank-on-google-belfast/`)
   - Target: how to rank on Google Belfast, improve rankings
   - Intent: Informational (top-of-funnel)
   - Word Count: 1500-2000
   - Content: Educational SEO guide, Belfast-specific tactics, common mistakes

**Social Media Marketing - Remaining Clusters:**

17. **TikTok Marketing Belfast** (`/uk/blog/tiktok-marketing-belfast/`)
   - Target: TikTok marketing Belfast, TikTok ads Belfast
   - Intent: Commercial (emerging platform)
   - Word Count: 1000-1500
   - Content: TikTok opportunity in Belfast, viral content, ads, case study

18. **LinkedIn Marketing Belfast** (`/uk/blog/linkedin-marketing-belfast/`)
   - Target: LinkedIn marketing Belfast, B2B social media
   - Intent: Commercial (B2B segment)
   - Word Count: 1000-1500
   - Content: B2B social media, profile optimization, LinkedIn ads

19. **Social Media Strategy Belfast** (`/uk/blog/social-media-strategy-belfast/`)
   - Target: social media strategy Belfast, content calendar
   - Intent: Informational
   - Word Count: 1500-2000
   - Content: Strategic planning, platform selection, balancing organic/paid

**Google Ads - Remaining Clusters:**

20. **Search Ads Belfast** (`/uk/blog/search-ads-belfast/`)
   - Target: search ads Belfast, Google search advertising
   - Intent: Commercial
   - Word Count: 1000-1500
   - Content: Search campaign deep dive, keyword targeting, ad copy, Quality Score

21. **Shopping Ads Belfast** (`/uk/blog/shopping-ads-belfast/`)
   - Target: shopping ads Belfast, Google Shopping Belfast
   - Intent: Commercial (ecommerce segment)
   - Word Count: 1000-1500
   - Content: Ecommerce advertising, product feed optimization, campaign structure

22. **Google Ads Management Belfast** (`/uk/blog/google-ads-management-belfast/`)
   - Target: Google Ads management Belfast, PPC management
   - Intent: Commercial/Transactional
   - Word Count: 1000-1500
   - Content: Managed service offering, DIY vs agency, optimization process

**Digital Marketing - Remaining Clusters:**

23. **Best Digital Marketing Agency Belfast** (`/uk/blog/best-digital-marketing-agency-belfast/`)
   - Target: best digital marketing agency Belfast, top agencies
   - Intent: Commercial research
   - Word Count: 1500-2000
   - Content: Competitive positioning, agency selection guide, what to look for

24. **Website Traffic Belfast** (`/uk/blog/website-traffic-belfast/`)
   - Target: increase website traffic Belfast, more visitors
   - Intent: Informational
   - Word Count: 1200-1600
   - Content: Traffic growth tactics (SEO, social, content marketing)

### Belfast-Specific Content Enhancement

**Phase 10 Focus: Depth and Uniqueness**

By Phase 10, content should include:
- **More detailed Belfast case studies** (specific neighborhoods, business types)
- **Belfast business ecosystem references** (Chamber of Commerce, Catalyst Inc, local events)
- **Industry-specific examples** (SEO for Belfast plumbers, social media for Belfast cafes)
- **Northern Ireland cultural context** (where relevant and natural)
- **Original Belfast photos** (office, team, local landmarks)
- **Belfast business owner quotes** (with permission, for E-E-A-T)

**Content Differentiation from Competitors:**

Research finding: Competitors have 10-20 thin pages. Rosey Co has 24+ comprehensive pages.

Ways to stand out:
- **Longer content:** 1500+ words vs competitor 500-800
- **More specific:** "Small Business SEO Belfast" vs generic "SEO tips"
- **Local examples:** Belfast businesses, not generic examples
- **Original research:** Belfast market data, local insights
- **Better structure:** H2/H3 hierarchy, bullet points, visuals

### Blog Engagement Tracking

**Implement in Phase 10:**

1. **GA4 Custom Events**
   - Scroll depth tracking (25%, 50%, 75%, 100%)
   - Time on page milestones (30s, 60s, 120s)
   - Internal link clicks from blog posts
   - CTA button clicks

2. **Content Performance Dashboard**
   - Top 10 best-performing blog posts (traffic)
   - Top 10 highest engagement (time on page)
   - Top 10 conversion drivers (leads generated)
   - Underperforming content (needs optimization)

### Success Criteria

- [ ] 20-24 total cluster pages published (complete topical architecture)
- [ ] All clusters link back to pillar pages
- [ ] Lateral linking between related clusters complete
- [ ] All pages indexed
- [ ] Blog engagement tracking implemented in GA4
- [ ] Belfast-specific examples throughout content
- [ ] No keyword cannibalization across all 24+ pages
- [ ] Content depth exceeds competitors (verify with manual audit)

### Dependencies

**Required from Phase 9:**
- First 8-12 cluster pages live
- Internal linking patterns established

**Can overlap with Phase 11:** Link building can start while final content being written

### Content Calendar (Phase 10)

**Publishing Schedule (2-3 per week):**
- Monday Week 9: Technical SEO Belfast, TikTok Marketing Belfast
- Wednesday Week 9: Search Ads Belfast
- Monday Week 10: Link Building Belfast, LinkedIn Marketing Belfast
- Wednesday Week 10: Shopping Ads Belfast
- Monday Week 11: SEO Cost Belfast, Social Media Strategy Belfast
- Wednesday Week 11: Google Ads Management Belfast
- Monday Week 12: How to Rank on Google Belfast, Best Digital Marketing Agency Belfast
- Wednesday Week 12: Website Traffic Belfast

---

## Phase 11: Link Building & Citations

**Duration:** Weeks 13-14 (2 weeks)
**Focus:** Build Belfast citations, local backlinks, and review automation
**Team:** SEO specialist + outreach coordinator

### Objectives

Establish Rosey Co as a legitimate Belfast business through consistent NAP citations, acquire high-quality local backlinks, and implement systematic review generation to compete with Digital 24's 105 reviews.

### Key Deliverables

**1. Belfast Citations (30-50 directories)**

**Tier 1 Citations (Week 13 Day 1-3):**
- Belfast Chamber of Commerce (belfastchamber.co.uk)
- Invest Northern Ireland (investni.com)
- Belfast City Council Business Directory
- Yell Belfast (yell.com/belfast)
- Thomson Local Belfast
- Bing Places
- Apple Maps
- Facebook Business Page
- LinkedIn Company Page
- Yelp (if applicable)

**Tier 2 Citations (Week 13 Day 4-5):**
- Belfast Telegraph Business Directory
- Belfast Live Business Listings
- Northern Ireland Business Directory
- Federation of Small Businesses NI
- Marketing Society Northern Ireland
- Digital DNA (NI Tech Community)
- Belfast Creative & Technology Hub

**Tier 3 Citations (Week 14 Day 1-2):**
- Scoot (scoot.co.uk)
- 192.com
- Cylex UK
- Hotfrog
- FreeIndex
- Touch Local
- UK Business Directory
- Find Open (findopen.co.uk)

**Citation Building Process:**
```
For each directory:
1. Create or claim listing
2. Use exact NAP format:
   Rosey Co
   1 Hollycroft Avenue
   Belfast
   BT5 5JE
   United Kingdom
   +44 7722 432679
3. Add business description (vary slightly, not duplicate)
4. Select categories: Marketing Agency, SEO Agency, Social Media Marketing
5. Add logo and photos
6. Add website URL: roseyco.com/uk/
7. Verify listing if verification available
8. Track in spreadsheet: directory name, URL, date added, status
```

**Research Finding:** Citations 3x more important for AI search vs traditional (Whitespark 2026). Prioritize consistency over volume.

**2. Local Backlink Acquisition (5-10 links)**

**Partnership Opportunities (Week 13):**
- Belfast Chamber of Commerce member profile (link opportunity)
- Catalyst Inc (Innovation Center) - inquire about member directory
- Belfast Tech Community - participate in meetups, get profile link
- University of Ulster Business School - explore guest lecture/partnership opportunities
- Queen's University Management School - same as above

**Media & PR Outreach (Week 14):**
- Belfast Telegraph - pitch expert commentary on digital marketing trends
- Belfast Live - pitch local business success story angle
- NI Business News - offer thought leadership article
- Ulster Business Magazine - inquire about contributor opportunities

**Backlink Outreach Template:**
```
Subject: Belfast Digital Marketing Insights for [Publication]

Hi [Name],

I'm [Your Name] from Rosey Co, a Belfast-based digital marketing agency specializing in SEO, social media, and Google Ads for SMBs.

I noticed your recent article on [topic] and wanted to reach out with a local Belfast angle that might interest your readers:

[Pitch specific insight, data, or story relevant to their audience]

Would you be interested in a quote, guest contribution, or interview on this topic?

Happy to provide value to your Belfast business readers.

Best regards,
[Your Name]
Rosey Co
+44 7722 432679
```

**Link Quality Guidelines:**
- Domain Authority 30+ preferred
- Topical relevance (Belfast business, marketing, local news)
- Contextual in-content links (not footer/sidebar)
- Follow links preferred (but nofollow still has value for traffic/trust)
- Avoid spammy link directories (500+ listings = red flag)

**3. Review Request Automation (Week 14)**

**Goal:** 2-4 reviews per month velocity (from 06-RESEARCH.md)

**Review Request System:**

Step 1: Identify trigger points
- 7 days after project milestone (e.g., website launch, first month SEO results)
- 30 days after service start (once client sees results)
- After positive feedback or praise email

Step 2: Email template
```
Subject: We'd Love Your Feedback 🌟

Hi [Client Name],

It's been [X weeks] since we [completed project/started working together], and we hope you're seeing great results!

If you have a moment, we'd be incredibly grateful if you could share your experience in a Google review. Your feedback helps other Belfast businesses find us and helps us improve our service.

[Direct GBP Review Link]
⬆️ Click here to leave a review (takes 60 seconds)

Thank you for trusting us with your [SEO/social media/Google Ads]!

Best regards,
[Your Name]
Rosey Co
```

Step 3: Follow-up (if no response after 14 days)
```
Subject: Quick Favor: Google Review?

Hi [Client Name],

Just following up on my previous email - if you have 60 seconds, a Google review would mean the world to us.

Here's the direct link again: [GBP Review Link]

No pressure at all - we appreciate your business either way!

Thanks,
[Your Name]
```

Step 4: Track response rate
- Target: 20-30% of requests result in review
- If lower: Improve timing, make it easier, or incentivize (within Google guidelines)

**Supabase Automation (Optional):**
- Add "review_requested" and "review_completed" fields to clients table
- Trigger email 7 days after milestone date
- Track conversion rate (requested → completed)
- Dashboard: "Clients due for review request"

**4. GBP Weekly Posting Schedule**

**Research Finding:** Weekly posting now expected for local pack visibility (from 06-RESEARCH.md)

**Post Calendar (Rotate 4 Types):**

Week 1: **Offer Post**
- "Free SEO Audit for Belfast Businesses This Month"
- 150-200 words
- Include CTA: "Book your audit"
- Add relevant photo (laptop, audit report graphic)

Week 2: **Update Post**
- "New Case Study: How [Belfast Business] Increased Traffic 300%"
- 200-250 words
- Link to blog post or case study
- Add case study visual

Week 3: **Event Post** (if applicable)
- "Join Our Webinar: SEO for Belfast SMBs"
- Date, time, registration link
- Or: Share attending local event (Chamber networking, etc.)

Week 4: **Product/Service Post**
- Highlight one service (rotate: SEO, Social, Ads, Web Design)
- 150-200 words
- Benefits, who it's for, CTA
- Add service-related photo

**Scheduling:**
- Use GBP mobile app or desktop to schedule posts
- Post on consistent day (e.g., every Monday 9am)
- Track engagement: Views, clicks, actions

**5. NAP Consistency Audit**

**Critical:** NAP (Name, Address, Phone) must be identical everywhere

**Audit Checklist:**
- [ ] Google Business Profile: Rosey Co, 1 Hollycroft Avenue, Belfast BT5 5JE, +44 7722 432679
- [ ] Website footer (all pages): Match exact
- [ ] All 30-50 citations: Match exact
- [ ] Social media profiles (Facebook, LinkedIn, Instagram): Match exact
- [ ] Email signatures: Match exact

**Common Inconsistencies to Fix:**
- "St." vs "Street" (use "Avenue" consistently)
- "UK" vs "United Kingdom" (use "United Kingdom" consistently)
- Phone format: +44 7722 432679 (not 07722 432679 or other formats)
- Abbreviations: Belfast (not "Belfast City")

**If inconsistencies found:**
- Update all sources to match GBP
- Prioritize high-authority sources first (Chamber, government directories)
- Re-check monthly for new inconsistencies

### Success Criteria

- [ ] 30+ Belfast citations built with consistent NAP
- [ ] 5-10 local backlinks acquired (Belfast/NI sources)
- [ ] Review request system implemented and first round sent
- [ ] 2-4 new reviews received by end of Phase 11 (or in pipeline)
- [ ] GBP weekly posting schedule active (4 posts published)
- [ ] NAP consistency verified across all sources
- [ ] Citation tracking spreadsheet complete (directory, URL, date, status)
- [ ] Backlink tracking spreadsheet complete (source, DA, link type, anchor text)

### Dependencies

**Required from Phase 10:**
- Content live (can link to blog posts in GBP posts)
- Case studies complete (for outreach and GBP posts)

**Blocks Nothing:** Phase 12 can start in parallel with Phase 11

---

## Phase 12: Analytics & Monitoring

**Duration:** Weeks 15-16 (2 weeks)
**Focus:** Set up comprehensive tracking and reporting infrastructure
**Team:** Developer + SEO analyst

### Objectives

Implement tracking for all KPIs from belfast-seo-metrics.md, create dashboards for ongoing monitoring, establish rank tracking, and set up monthly reporting cadence.

### Key Deliverables

**1. Belfast-Specific GA4 Tracking**

**Custom Segments:**
- "Belfast Organic Traffic" segment
  - Filter: Source/Medium = google/organic
  - Filter: City = Belfast OR Region = Northern Ireland
  - Filter: Landing Page contains /uk/

**Custom Events:**
- "belfast_lead" - Lead form submission from Belfast organic
- "belfast_phone_click" - Click-to-call from Belfast visitor
- "belfast_gbp_action" - Action taken from GBP listing
- "cluster_to_pillar_click" - Internal link click from cluster to pillar
- "pillar_to_cluster_click" - Internal link click from pillar to cluster

**Conversion Goals:**
- Primary Goal: Belfast lead submission (form or phone)
- Secondary Goal: Newsletter signup from Belfast
- Tertiary Goal: Free audit/consultation request

**GA4 Dashboard Setup:**
```
Dashboard: "Belfast SEO Performance"

Widgets:
1. Belfast organic users (current month vs last month vs baseline)
2. Top landing pages (Belfast organic traffic)
3. Conversion rate (Belfast organic)
4. Goal completions (leads from Belfast)
5. Engagement metrics (time on page, pages/session, scroll depth)
6. Traffic source breakdown (organic vs direct vs referral vs social)
7. Pillar page performance (traffic, engagement, conversions)
8. Cluster page performance (top 10 by traffic)
```

**2. Google Search Console Tracking**

**Custom Filters:**
- "Belfast Keywords" filter: Contains "belfast" or target keywords
- "Pillar Pages" filter: URL contains /seo-belfast/, /social-media-marketing-belfast/, etc.
- "Cluster Pages" filter: URL contains /uk/blog/ AND "belfast"

**GSC Dashboard (Use Google Sheets or Looker Studio):**
```
Dashboard: "Belfast Keyword Rankings"

Metrics:
1. Top 20 target keywords - position, impressions, clicks, CTR
2. Pillar page performance - impressions, clicks, avg position
3. Cluster page performance - top 10 by impressions
4. New keywords appearing (discovered keywords)
5. Keyword position changes (biggest gains/losses)
6. Total indexed pages (track coverage)
```

**Weekly Export:**
- Export Performance data for top 20 keywords
- Track position changes week-over-week
- Identify quick win opportunities (position 4-10, high impressions)

**3. GBP Insights Tracking**

**Monthly Metrics to Export:**
- Total views (search + map breakdown)
- Actions: Website clicks, phone calls, direction requests, messages
- Photos: Views, photo count
- Reviews: New reviews, total reviews, average rating, response rate

**GBP Dashboard (Spreadsheet or GBP Insights):**
```
Month | Search Views | Map Views | Total Views | Website Clicks | Calls | Reviews Added | Total Reviews | Avg Rating
------|--------------|-----------|-------------|----------------|-------|---------------|---------------|------------
Jan   | 500          | 300       | 800         | 50             | 20    | 3             | 15            | 4.7
Feb   | 650          | 380       | 1030        | 68             | 28    | 4             | 19            | 4.8
```

**4. Rank Tracking Setup**

**Option A: Manual Tracking (Free)**

Spreadsheet: "Belfast Keyword Positions"

```
Keyword              | Month 0 | Month 1 | Month 2 | Month 3 | Change
---------------------|---------|---------|---------|---------|--------
SEO Belfast          | 40      | 38      | 28      | 15      | +25
digital marketing BF | 50+     | 45      | 35      | 20      | +30
...
```

Process:
- Use incognito browser
- Search for each keyword
- Record Rosey Co position (or ">50" if not in top 50)
- Update weekly or bi-weekly

**Option B: SEMrush Position Tracking (Paid)**

Setup:
1. Add roseyco.com domain to SEMrush
2. Create project: "Belfast SEO Rankings"
3. Add 20 target keywords
4. Set location: Belfast, Northern Ireland, United Kingdom
5. Add 5 competitor domains (Digital 24, VINDICTA, Outrank, SEO NI, GEKKOSHOT)
6. Set tracking frequency: Daily (or weekly to save limits)

Benefits:
- Automatic daily tracking
- Historical position graphs
- Competitor comparison
- SERP feature tracking (featured snippets, local pack)

Cost: Included in $199/mo SEMrush subscription (if budget approved)

**5. Monthly Reporting Template**

**Report Structure:**

```markdown
# Belfast SEO Monthly Report - [Month Year]

## Executive Summary
- Top 3 wins this month
- Top 3 areas for improvement
- Overall progress vs targets

## 1. Search Visibility
| Metric | This Month | Last Month | Change | Target |
|--------|-----------|-----------|--------|--------|
| Keywords in Top 3 | X | X | +X | X |
| Keywords in Top 10 | X | X | +X | X |
| Local Pack Appearance | X% | X% | +X% | X% |
| Belfast Organic Traffic | X | X | +X% | X |
| Avg Position | X | X | -X | X |

Top Ranking Improvements:
- [Keyword 1]: Position 20 → 8 (+12 positions)
- [Keyword 2]: Position 15 → 6 (+9 positions)

## 2. Google Business Profile
| Metric | This Month | Last Month | Change |
|--------|-----------|-----------|--------|
| Total Views | X | X | +X% |
| Website Clicks | X | X | +X% |
| Phone Calls | X | X | +X% |
| New Reviews | X | X | +X |
| Total Reviews | X | X | +X |
| Avg Rating | X.X | X.X | +X.X |

## 3. Content Performance
- Pages indexed: X (+X new this month)
- Top 5 pages by traffic:
  1. [Page 1] - X visitors
  2. [Page 2] - X visitors
- New content published: [List]

## 4. Business Impact
- Belfast leads: X (+X% vs last month)
- Conversion rate: X% (from X% last month)
- New clients: X
- Revenue impact: £X (+£X vs last month)

## 5. Competitive Position
- Keywords outranking ≥1 competitor: X/20 (X%)
- Biggest competitive wins: [List]

## 6. Next Month Priorities
1. [Action item 1]
2. [Action item 2]
3. [Action item 3]
```

**Reporting Cadence:**
- Monthly report sent by 5th of following month
- Quarterly deep-dive (months 3, 6, 9, 12)
- Ad-hoc reports for significant wins or issues

**6. Baseline Documentation**

**Critical:** Before content launches (or immediately if already live)

Capture Month 0 baseline:
```
Date: [Baseline date]

SEARCH VISIBILITY BASELINE
- Keywords in top 3: [X]
- Keywords in top 10: [X]
- Keywords in top 20: [X]
- Average position (20 keywords): [X]
- Local pack appearance: [X]%
- Belfast organic traffic: [X] users/month
- Belfast organic leads: [X]/month

GBP BASELINE
- Total views: [X]/month
- Website clicks: [X]/month
- Phone calls: [X]/month
- Review count: [X]
- Review rating: [X.X]/5

CONTENT BASELINE
- Indexed Belfast pages: [X]
- Total word count: [X]

BUSINESS BASELINE
- Belfast leads: [X]/month
- Conversion rate: [X]%
- Belfast clients: [X]
- Belfast MRR: £[X]
```

This baseline allows all future reporting to show "vs baseline" and "% change from start."

### Success Criteria

- [ ] GA4 Belfast tracking configured with custom segments and events
- [ ] GSC keyword tracking dashboard created
- [ ] GBP insights tracking spreadsheet set up
- [ ] Rank tracking system implemented (manual or SEMrush)
- [ ] Monthly reporting template created
- [ ] Baseline metrics documented (Month 0)
- [ ] First monthly report generated (even if minimal data)
- [ ] All team members trained on dashboards and reporting

### Dependencies

**Required from Phase 11:**
- Citations and backlinks complete (track in reporting)
- Review system active (track review velocity)

**Blocks Nothing:** This is final phase of Belfast SEO implementation

### Timeline (Phase 12)

**Week 15:**
- Day 1-2: Set up GA4 tracking (segments, events, dashboard)
- Day 3: Set up GSC tracking (filters, exports)
- Day 4: Set up GBP tracking (spreadsheet, export process)
- Day 5: Set up rank tracking (manual spreadsheet or SEMrush)

**Week 16:**
- Day 1-2: Document baseline metrics (if not already done)
- Day 3: Create monthly reporting template
- Day 4: Generate first monthly report (even if partial data)
- Day 5: Team training on dashboards, final QA, handoff documentation

---

## Content Production Recommendations

### Pillar Content Priority

**Launch sequence based on commercial value and competition:**

1. **SEO Belfast** (Week 3) - Highest priority
   - Highest commercial intent
   - Core service
   - Most competition (establish authority early)

2. **Digital Marketing Belfast** (Week 3) - Second priority
   - Umbrella content linking to other pillars
   - Captures broad searches
   - Positions Rosey Co as full-service

3. **Social Media Marketing Belfast** (Week 4) - Third priority
   - Differentiation (fewer competitors focus on social)
   - Growing demand
   - Lower competition than SEO

4. **Google Ads Belfast** (Week 4) - Fourth priority
   - High commercial intent
   - Complements SEO pillar
   - Transactional keywords

**Why this sequence:**
- Lead with strength (SEO expertise)
- Establish breadth (digital marketing umbrella)
- Differentiate (social media focus)
- Close with transactional (Google Ads)

### Cluster Content Sequence

**Prioritize by:**
1. Commercial intent (transactional/commercial before informational)
2. Low competition (quick wins for confidence)
3. Pillar support (balance cluster content across pillars)

**Example balanced approach (Phase 9):**
- Week 5: SEO clusters (Local, Small Business)
- Week 6: Social clusters (Instagram, Facebook)
- Week 7: Google Ads clusters (PPC, Cost)
- Week 8: Digital Marketing clusters (Lead Gen, Strategy)

**Avoid:**
- ❌ Publishing all SEO clusters first (unbalanced, looks spammy)
- ❌ Publishing 10 pages in one day (spam signal to Google)
- ❌ Random sequence with no logic (confuses internal linking)

### Timing Between Content Launches

**Research Finding:** Publish 2-3 pages per week to avoid spam signals (from 06-RESEARCH.md common pitfalls)

**Recommended schedule:**
- Monday: Publish 1 page
- Wednesday: Publish 1 page
- (Optional) Friday: Publish 1 page if ahead of schedule

**Why spacing matters:**
- Natural content velocity (real businesses don't publish 20 posts in one day)
- Google can crawl and index properly
- Allows time for internal linking updates
- Prevents overwhelming small team

**Exception:** If using CMS with scheduled publishing, can write batch but schedule spacing.

---

## Pitfalls to Avoid During Implementation

**From 06-RESEARCH.md Common Pitfalls - Application to Phases 7-12:**

### Pitfall 1: Keyword Cannibalization

**How to Avoid:**
- Use belfast-content-architecture.md keyword-to-URL mapping religiously
- Before writing new page, check existing pages for keyword overlap
- Differentiate by search intent (informational vs commercial vs transactional)
- Use Search Console to monitor: If 2+ pages rank for same keyword, consolidate or differentiate

**Check during Phase 9 & 10:**
- Run GSC query report
- Filter for top 20 keywords
- Check if multiple pages rank for same keyword
- If yes: Choose strongest page, update internal linking, rewrite weaker page for different intent

### Pitfall 2: Ignoring Google Business Profile

**How to Avoid:**
- Phase 11 includes weekly GBP posts (not optional)
- Complete 100% of GBP fields during Phase 11
- Implement review request system (2-4/month target)
- Upload 5-10 photos monthly
- Respond to all reviews within 48 hours
- Track GBP metrics in Phase 12 reporting

**GBP Optimization Checklist (Phase 11):**
- [ ] Business name, categories, description complete
- [ ] All services listed with descriptions
- [ ] Hours of operation accurate
- [ ] Photos: Logo, cover, interior, team, work samples (20+ total)
- [ ] Posts: Published weekly on consistent schedule
- [ ] Q&A: 10+ questions pre-populated
- [ ] Reviews: Response protocol active, 100% response rate

### Pitfall 3: Thin or Duplicate Content

**How to Avoid:**
- Minimum 1000 words per cluster page (Phase 9-10)
- Minimum 2500 words per pillar page (Phase 8)
- Every page must include Belfast-specific content:
  - Local examples or case studies
  - Belfast neighborhood mentions
  - Belfast market data or insights
  - Original Belfast photos (not just stock)
- Never copy-paste content between pages
- Use unique angles: "Small Business SEO Belfast" vs "SEO Belfast" must be different

**Content uniqueness check:**
- Run pages through Copyscape or Grammarly plagiarism detector
- Check for duplicate title tags and meta descriptions
- Verify each page targets different primary keyword
- Ensure Belfast examples vary across pages

### Pitfall 4: Poor E-E-A-T Signals

**How to Avoid:**
- Add author bios to blog posts (Experience, Expertise)
- Include Belfast case studies with real metrics (Experience)
- Display credentials, certifications, awards (Authoritativeness)
- Link to Belfast business listings (Chamber, directories) (Trust)
- Use HTTPS (already implemented in v1.0) (Trust)
- Keep contact info accessible (footer, contact page) (Trust)
- Add "About Rosey Co" page with Belfast history (Trust)

**E-E-A-T Implementation (Phase 10):**
- [ ] Author bylines on all blog posts
- [ ] Team page with Belfast expertise highlighted
- [ ] Case studies with client testimonials and metrics
- [ ] Awards/recognition section (even if just "GBP 5-star rating")
- [ ] Original Belfast photos throughout site
- [ ] Client logo section (with permission)

### Pitfall 5: Neglecting Review Velocity

**How to Avoid:**
- Implement review request system in Phase 11 (not optional)
- Target 2-4 reviews per month minimum
- Automate requests 7 days after milestones
- Follow up once after 14 days
- Track response rate (target 20-30%)
- Respond to 100% of reviews within 48 hours (ideally 24 hours)

**Review velocity tracking (Phase 12):**
```
Month | Reviews Requested | Reviews Received | Response Rate | Total Reviews | Avg Rating
------|------------------|------------------|--------------|--------------|------------
Jan   | 10               | 3                | 30%          | 15           | 4.7
Feb   | 12               | 4                | 33%          | 19           | 4.8
```

If response rate <20%: Improve timing, make link more prominent, or simplify request

---

## Risk Mitigation

### Risk 1: Content Not Indexing

**Symptoms:**
- Pages published but not appearing in GSC Coverage > Valid
- Pages showing as "Discovered - currently not indexed" or "Crawled - currently not indexed"

**Causes:**
- Low-quality content (too thin, duplicate, no value)
- Technical issues (robots.txt blocking, noindex tag)
- New site with low authority (Google slow to index)

**Mitigation:**
- Ensure content meets quality standards (1000+ words, unique, valuable)
- Check robots.txt not blocking pages
- Verify no noindex tags
- Submit sitemap to GSC (Next.js generates automatically)
- Build internal links from pillar pages (helps crawling)
- Be patient (can take 2-4 weeks for new content on new site)

**Action if issue persists:**
- Use GSC URL Inspection Tool > Request Indexing
- Add more internal links to page
- Build external links to page (citations, backlinks)

### Risk 2: Rankings Stagnant or Declining

**Symptoms:**
- Keywords not improving position after 1-2 months
- Rankings dropping across multiple keywords

**Causes:**
- Competitor activity (they're optimizing too)
- Algorithm update (Google changed ranking factors)
- Technical SEO issues (site speed, mobile issues, crawl errors)
- Content not meeting user intent
- Lack of backlinks or citations

**Mitigation:**
- Monitor competitors monthly (are they publishing more content?)
- Check Google Search Central for algorithm updates
- Run technical SEO audit (Lighthouse, PageSpeed Insights, GSC)
- Analyze top-ranking competitor pages (what do they have that we don't?)
- Continue link building in Phase 11 (don't stop after initial burst)

**Action if issue persists:**
- Expand content depth (add 500-1000 words to pillar pages)
- Improve internal linking (more contextual links)
- Acquire more high-quality backlinks (outreach, partnerships)
- Consider hiring SEO consultant for external audit

### Risk 3: Low Conversion Rate (<3%)

**Symptoms:**
- Traffic growing but leads not growing proportionally
- High bounce rate on landing pages (>70%)
- Low form submission rate

**Causes:**
- Poor CTA placement or copy
- Form too long or complicated
- Page not matching search intent
- Slow page load (users leave before seeing CTA)
- Mobile UX issues

**Mitigation:**
- A/B test CTA placement (above fold vs mid-content)
- Simplify lead forms (name, email, phone, message only)
- Add trust signals (reviews, testimonials, Belfast address)
- Optimize page speed (< 2.5s LCP)
- Test mobile experience thoroughly (68% Belfast searches on mobile)

**Action if issue persists:**
- Use Hotjar or Microsoft Clarity to see user behavior (heatmaps, recordings)
- Ask clients how they found the site and what made them reach out
- Test different CTA copy ("Free Audit" vs "Get Started" vs "Book Consultation")

### Risk 4: Review Velocity Too Low

**Symptoms:**
- <2 reviews per month
- Review request emails getting low response (<15%)

**Causes:**
- Requests sent too early (client hasn't seen results yet)
- Too many requests (overwhelming clients)
- Link not working or hard to find
- Clients don't have Google accounts
- Competitors incentivizing reviews (against Google guidelines but happens)

**Mitigation:**
- Optimize timing (wait 30 days after service starts, or after positive feedback)
- Make link more prominent (button in email, not just text link)
- Provide clear instructions (especially for non-technical clients)
- Ask in person/call (higher response rate than email)
- Ensure excellent service delivery (reviews reflect reality)

**Action if issue persists:**
- Survey clients: "Why haven't you left a review?"
- Test different email copy or subject lines
- Offer to walk client through process (screen share)
- Focus on clients most likely to leave positive reviews (enthusiastic, results-driven)

---

## Success Metrics Recap

**By End of Phase 12 (Month 3-4):**

✅ **Content:** 24+ pages live (4 pillars + 20 clusters)
✅ **Indexing:** All pages indexed in Google
✅ **Rankings:** 8-12 keywords in top 20
✅ **Local Pack:** 60-70% appearance rate for service keywords
✅ **Traffic:** +150-200% Belfast organic traffic vs baseline
✅ **GBP:** Weekly posts active, 2-4 new reviews
✅ **Citations:** 30+ Belfast citations built
✅ **Backlinks:** 5-10 local backlinks acquired
✅ **Tracking:** GA4, GSC, GBP monitoring active
✅ **Reporting:** Monthly report cadence established

**These are leading indicators. Business impact (leads, revenue) lags by 1-3 months.**

---

## Next Steps

1. ✅ **Phase 6 Planning Complete** - This document
2. ⏳ **Phase 7 Kickoff** - Begin topical authority architecture (Weeks 1-2)
3. ⏳ **Execute Phases 7-12** - Follow roadmap sequentially
4. ⏳ **Monthly Monitoring** - Track KPIs from belfast-seo-metrics.md
5. ⏳ **Quarterly Reviews** - Deep-dive analysis and strategy adjustment
6. ⏳ **Ongoing Optimization** - Use data to refine content, CTAs, and tactics

**Estimated Timeline:** 12-16 weeks from Phase 7 kickoff to Phase 12 completion

**Post-Phase 12:** Belfast SEO is not "done" - it's ongoing. Continue content creation (expand to NI-wide, industry-specific), link building, review generation, and optimization based on performance data.

---

*Roadmap Version: 1.0*
*Last Updated: 2026-01-27*
*Reference: BELFAST-SEO-STRATEGY.md, belfast-seo-metrics.md, belfast-content-architecture.md*

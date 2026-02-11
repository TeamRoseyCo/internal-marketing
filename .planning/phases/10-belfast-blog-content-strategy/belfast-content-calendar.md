# Belfast Blog Content Calendar

**Phase:** 10 - Belfast Blog Content Strategy
**Publishing Cadence:** 2 posts per week (Monday + Thursday)
**Duration:** 12 weeks (3 months)
**Total Planned:** 24 topics
**Pillar Balance:** 6 posts per pillar (SEO, Social Media, Paid Ads, Website Design)

---

## Content Calendar

| Week | Publish Date | Title | Slug | Pillar | Primary Keyword | Intent | Priority |
|------|--------------|-------|------|--------|----------------|--------|----------|
| 1 | 2026-02-17 | Local SEO Tactics for Belfast Businesses in 2026 | local-seo-belfast | SEO Belfast | local SEO Belfast | Commercial | HIGH |
| 1 | 2026-02-20 | Instagram Marketing for Belfast Businesses | instagram-marketing-belfast | Social Media Belfast | Instagram marketing Belfast | Commercial | HIGH |
| 2 | 2026-02-24 | How Much Does PPC Cost in Belfast? | ppc-belfast | Paid Ads Belfast | PPC Belfast | Commercial | HIGH |
| 2 | 2026-02-27 | Responsive Website Design for Belfast Businesses | responsive-website-belfast | Website Design Belfast | responsive website Belfast | Commercial | MEDIUM |
| 3 | 2026-03-03 | Small Business SEO Strategies for Belfast SMBs | small-business-seo-belfast | SEO Belfast | small business SEO Belfast | Commercial | HIGH |
| 3 | 2026-03-06 | Facebook Marketing Tips for Belfast Companies | facebook-marketing-belfast | Social Media Belfast | Facebook marketing Belfast | Commercial | HIGH |
| 4 | 2026-03-10 | Google Ads Cost Belfast: 2026 Pricing Guide | google-ads-cost-belfast | Paid Ads Belfast | Google Ads cost Belfast | Informational | MEDIUM |
| 4 | 2026-03-13 | Ecommerce Website Development in Belfast | ecommerce-website-belfast | Website Design Belfast | ecommerce website Belfast | Commercial | MEDIUM |
| 5 | 2026-03-17 | Technical SEO Guide for Belfast Websites | technical-seo-belfast | SEO Belfast | technical SEO Belfast | Commercial | MEDIUM |
| 5 | 2026-03-20 | TikTok Marketing for Belfast Businesses | tiktok-marketing-belfast | Social Media Belfast | TikTok marketing Belfast | Commercial | MEDIUM |
| 6 | 2026-03-24 | Search Ads Strategy for Belfast Companies | search-ads-belfast | Paid Ads Belfast | search ads Belfast | Commercial | MEDIUM |
| 6 | 2026-03-27 | Web Design Trends Belfast 2026 | web-design-trends-belfast | Website Design Belfast | web design trends Belfast 2026 | Informational | LOW |
| 7 | 2026-03-31 | Link Building for Belfast Businesses | link-building-belfast | SEO Belfast | link building Belfast | Commercial | MEDIUM |
| 7 | 2026-04-03 | LinkedIn Marketing for Belfast B2B Companies | linkedin-marketing-belfast | Social Media Belfast | LinkedIn marketing Belfast | Commercial | MEDIUM |
| 8 | 2026-04-07 | Shopping Ads for Belfast Ecommerce Stores | shopping-ads-belfast | Paid Ads Belfast | shopping ads Belfast | Commercial | MEDIUM |
| 8 | 2026-04-10 | How Much Does SEO Cost in Belfast? | seo-cost-belfast | SEO Belfast | SEO cost Belfast | Informational | MEDIUM |
| 9 | 2026-04-14 | Social Media Strategy for Belfast Businesses | social-media-strategy-belfast | Social Media Belfast | social media strategy Belfast | Informational | LOW |
| 9 | 2026-04-17 | Google Ads Management Services in Belfast | google-ads-management-belfast | Paid Ads Belfast | Google Ads management Belfast | Commercial | HIGH |
| 10 | 2026-04-21 | How to Rank on Google in Belfast: Complete Guide | how-to-rank-on-google-belfast | SEO Belfast | how to rank on Google Belfast | Informational | MEDIUM |
| 10 | 2026-04-24 | Cathedral Quarter Business SEO Guide | cathedral-quarter-seo-belfast | SEO Belfast | Cathedral Quarter SEO | Informational | LOW |
| 11 | 2026-04-28 | Belfast Google My Business Optimization | belfast-google-my-business | Social Media Belfast | Google My Business Belfast | Commercial | MEDIUM |
| 11 | 2026-05-01 | Titanic Quarter Business Marketing Guide | titanic-quarter-marketing-belfast | Paid Ads Belfast | Titanic Quarter marketing | Informational | LOW |
| 12 | 2026-05-05 | Belfast vs Dublin SEO: Key Differences | belfast-dublin-seo-comparison | SEO Belfast | Belfast vs Dublin SEO | Informational | LOW |
| 12 | 2026-05-08 | Post-Brexit Digital Marketing for NI Businesses | ni-digital-marketing-brexit | Social Media Belfast | Northern Ireland Brexit marketing | Informational | LOW |

---

## Pillar Distribution Summary

| Pillar | Post Count | Percentage |
|--------|-----------|------------|
| SEO Belfast | 7 posts | 29% |
| Social Media Belfast | 7 posts | 29% |
| Paid Ads Belfast | 6 posts | 25% |
| Website Design Belfast | 4 posts | 17% |
| **TOTAL** | **24 posts** | **100%** |

**Note:** SEO and Social Media prioritized in early weeks (highest commercial intent keywords from Phase 6 research). Website Design slightly lower priority (competitive landscape analysis from Phase 6).

---

## Content Workflow

Each blog post follows this standardized workflow:

### 1. Research (15 minutes)
- Review keyword from Phase 6 keyword map
- Check competitor posts (Digital 24, VINDICTA, Outrank)
- Identify Belfast-specific angle (Cathedral Quarter, Titanic Quarter, BT postcodes)
- Note local examples to include

### 2. Outline (30 minutes)
- Create H2/H3 structure (3-5 main sections)
- Define pillar page link placements (beginning, middle, end)
- Identify 1-2 related cluster posts for lateral linking
- Plan local examples and Belfast context

### 3. Write (2-3 hours)
- Draft 1000-1500 words following MDX template (see below)
- Include authentic Belfast context (not keyword-stuffed)
- Add 2-3 pillar page links with contextual anchors
- Include local CTA with Belfast office address/phone
- Write MDX frontmatter with cluster metadata

### 4. Review (30 minutes)
- Run through Grammarly for grammar/spelling
- Check readability (aim for 8th grade level)
- Verify pillar page links work correctly
- Ensure Belfast context is authentic and valuable
- Confirm NAP consistency if mentioned

### 5. Publish (15 minutes)
- Create MDX file in `src/content/blog/uk/[slug].mdx`
- Add to git, commit with message: `content(10-01): add [slug] cluster post`
- Push and verify build succeeds
- Test post renders correctly on dev/staging

### 6. Distribute (30 minutes)
- Share on LinkedIn (organic post with summary)
- Post to Facebook business page
- Create Instagram Story with highlights
- Update Google Business Profile
- Add to weekly email newsletter queue (Friday digest)

**Total time per post:** 4-5 hours (sustainable pace: 2 posts per week)

---

## Blog Post MDX Template

### Frontmatter Template

```yaml
---
title: "[SEO-optimized title with Belfast]"
excerpt: "[One-sentence value prop for Belfast businesses]"
category: "[SEO|Social Media|Paid Ads|Website Design]"
type: "cluster"
pillarSlug: "[parent-pillar-slug]"
relatedClusters:
  - "[related-post-slug-1]"
  - "[related-post-slug-2]"
date: "YYYY-MM-DD"
author: "Rosey Co. Team"
image: "/images/blog/[relevant-image].jpg"
tags: ["Belfast", "[Service]", "[Topic]"]
---
```

### Content Structure Template

```markdown
# [Compelling H1 Headline with Belfast Context]

[Opening paragraph with local hook - mention Belfast challenge, Cathedral Quarter example,
Titanic Quarter reference, or Northern Ireland context]

This guide is part of our comprehensive [SEO Belfast strategy](/uk/seo-belfast/), helping
local businesses rank higher in Northern Ireland searches.

## [H2 Section 1: The Problem]

[Describe Belfast-specific pain point with local context]

- Actionable bullet point with Belfast example
- Statistics from Belfast market (if available)
- Reference local landmarks or BT postcodes

## [H2 Section 2: The Solution]

[Tactical advice with local examples]

**Example:** A Cathedral Quarter cafe used [tactic] to increase [metric] by [percentage]
in just [timeframe].

For more comprehensive strategies, see our complete [SEO Belfast guide](/uk/seo-belfast/).

## [H2 Section 3: Implementation Steps]

[Step-by-step guide with Belfast-specific context]

1. **Step 1:** [Action with Belfast example]
2. **Step 2:** [Action with NI context]
3. **Step 3:** [Action with local reference]

## [H2 Section 4: Common Mistakes Belfast Businesses Make]

[3-5 pitfalls with local context]

1. **Mistake 1:** [Description with Belfast context]
2. **Mistake 2:** [Description with NI-specific issue]
3. **Mistake 3:** [Description with local example]

## [H2 Section 5: Real Results]

[Optional: Belfast case study if available, or hypothetical but realistic scenario]

## Next Steps: Implement These Tactics Today

[Summary paragraph encouraging action]

Ready to dominate Belfast search results? Read our complete [SEO Belfast pillar guide](/uk/seo-belfast/)
or [contact our Belfast team](/uk/belfast/) for a free consultation.

**Related Reading:**
- [Link to related cluster post 1](/uk/blog/[related-slug-1]/)
- [Link to related cluster post 2](/uk/blog/[related-slug-2]/)

---

*Looking for expert [service] help in Belfast? Call our Belfast team at
[+44 7722 432679](tel:+447722432679) or visit our office at
[1 Hollycroft Avenue, BT5 5JE](/uk/belfast/).*
```

### Key Elements for Every Post

1. **Belfast context throughout** - Not just keyword-stuffed, genuinely local
2. **Link to pillar page 2-3 times** - Beginning, middle, end with contextual anchors
3. **Local examples** - Cathedral Quarter, Titanic Quarter, NI-specific references
4. **Actionable advice** - Practical tactics Belfast businesses can implement
5. **Local CTA** - Link to Belfast office page, Belfast phone number
6. **Related clusters** - 1-2 lateral links to other Belfast cluster posts
7. **UK English spelling** - "optimise" not "optimize", "colour" not "color"

---

## Distribution Checklist

### Per-Post Distribution (Within 48 hours of publishing)

**Immediate (0-2 hours):**
- [ ] Verify post live at roseyco.com/uk/blog/[slug]/
- [ ] LinkedIn: Post with 100-150 word summary + link
- [ ] Facebook: Share with image + Belfast-focused caption
- [ ] Instagram: Create Story with key highlights + "Link in bio"
- [ ] Google Business Profile: Create post with excerpt + link

**Within 24 hours:**
- [ ] Respond to all comments on social posts
- [ ] Add to this week's email newsletter (Friday digest)
- [ ] Pin LinkedIn post if high early engagement

**Within 48 hours:**
- [ ] Check Google Analytics for initial traffic
- [ ] Re-share on LinkedIn if low impressions
- [ ] Engage with shares/mentions
- [ ] Tag relevant Belfast businesses or people

### Weekly Email Newsletter (Friday 9am)

**Format:**
- Subject: "This week on the Rosey Co. blog: [Topic]"
- Include Monday + Thursday posts with excerpts
- Add 2 older evergreen posts (from past 3 months)
- CTA to Belfast pillar page or contact form
- Send to Belfast subscriber segment
- Track open rate, click-through rate

**Email Template:**
```
Hi [First Name],

This week on the Rosey Co. blog, we shared:

📍 [Monday Post Title]
[One-sentence excerpt]
Read more: [Link]

📍 [Thursday Post Title]
[One-sentence excerpt]
Read more: [Link]

Still catching up? Here are two popular posts from our archives:
- [Evergreen Post 1]
- [Evergreen Post 2]

Need help with [service] in Belfast? Our team is here to help.

Best,
Rosey Co. Belfast Team
+44 7722 432679
```

### Social Media Best Practices

**LinkedIn (Organic):**
- Post time: Tuesday-Thursday 8-10am or 5-7pm
- Format: 100-150 word summary + link
- Hashtags: #BelfastBusiness #SEOBelfast #NorthernIreland (3-5 total)
- Tag relevant Belfast businesses or people
- Engage with comments for 2-3 days

**Facebook Business Page:**
- Post time: Wednesday-Friday 1-3pm
- Format: Compelling image + Belfast-focused caption
- Tag Belfast location
- Respond to comments same-day
- Pin top-performing posts to page

**Instagram:**
- Post time: Monday-Wednesday 11am-1pm or 7-9pm
- Format: Stories with blog highlights + carousel summarizing key points
- Use "Link in bio" strategy
- Belfast location tags (Cathedral Quarter, Titanic Quarter)
- Engage with Story replies

**Google Business Profile:**
- Post weekly with latest blog excerpt
- Include relevant photo
- Add link to full blog post
- Appears in local pack and Google Maps

---

## Performance Tracking

### Monthly Analytics Review (1 hour)

**Google Analytics:**
- Top 10 blog posts by pageviews (past 30 days)
- Average time on page per post (engagement indicator)
- Bounce rate per post (relevance indicator)
- Blog → conversion rate (consultation requests from blog traffic)

**Social Analytics:**
- LinkedIn: Which posts got most engagement (likes, comments, shares)?
- Facebook: Which posts reached most people?
- Instagram: Which posts drove most profile visits?

**Email Newsletter:**
- Open rate per edition (which subject lines work?)
- Click-through rate (which posts get clicks from email?)
- Unsubscribe rate (are we sending too often or irrelevant content?)

**Actions Based on Data:**
- Write 2-3 more posts on top-performing topics
- Stop writing content types with high bounce rate
- Replicate successful post formats
- Adjust publishing frequency if email metrics drop

### Success Metrics (3-month benchmarks)

| Metric | Target | Purpose |
|--------|--------|---------|
| Blog traffic | 1000+ pageviews/month | Audience growth |
| Avg time on page | 2:30+ minutes | Engagement indicator |
| Bounce rate | <60% | Content relevance |
| Email open rate | 20-30% | Newsletter health |
| Email CTR | 3-5% | Content appeal |
| Social engagement | 15+ interactions/post | Reach and visibility |
| Blog → conversions | 2+ consultations/month | Business impact |

---

## Content Ideas Bank

*Additional Belfast blog topics for future planning (Weeks 13+):*

### SEO Belfast
- Belfast SEO agency comparison: What to look for
- BT postcode SEO strategies for local businesses
- Voice search optimization for Belfast businesses
- Mobile SEO for Belfast small businesses
- Belfast local citations and directory listings

### Social Media Belfast
- Social media content calendar for Belfast businesses
- Instagram Reels for Belfast cafes and restaurants
- Facebook groups for Belfast business networking
- User-generated content strategies for NI brands

### Paid Ads Belfast
- Display advertising for Belfast businesses
- Remarketing strategies for Northern Ireland
- YouTube ads for Belfast service businesses
- Meta ads targeting for Belfast demographics

### Website Design Belfast
- Website accessibility standards for NI businesses
- WordPress vs custom website development Belfast
- Website speed optimization for Belfast sites
- Conversion rate optimization for Belfast websites

---

## Notes

**Publishing consistency is critical.** Maintain 2 posts per week rhythm for 12 weeks. If falling behind, prioritize high-priority posts (commercial intent keywords targeting primary services).

**Belfast authenticity matters.** Every post must include genuine Belfast context - not just "Belfast" keyword-stuffed. Use local landmarks, BT postcodes, Northern Ireland references naturally.

**Pillar-cluster architecture is essential.** Every cluster post MUST link to its parent pillar page 2-3 times and include `pillarSlug` in frontmatter. This topical authority structure is the foundation of Belfast SEO strategy.

**Distribution amplifies reach.** A great blog post without distribution gets zero traffic. Block 30 minutes after each post for immediate distribution (social, GBP, email queue).

**Track and iterate.** Review analytics monthly. Double down on what works. Stop creating content that doesn't resonate with Belfast audience.

---

*Created: 2026-02-11*
*Phase: 10-01 Belfast Blog Content Strategy*
*Next Review: 2026-05-11 (after 3-month execution)*

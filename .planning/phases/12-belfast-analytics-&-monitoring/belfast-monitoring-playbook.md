# Belfast Monitoring Playbook

**Purpose:** Operational procedures for monitoring Belfast SEO performance, responding to alerts, conducting regular reviews, and tracking competitive landscape.

**Audience:** Business owner or agency team managing Belfast SEO campaign.

**Last Updated:** 2026-02-11

---

## 1. Review Cadence

Three review cycles with specific checklists and time allocations.

### Weekly Review (15 minutes, every Monday 9:00 AM)

**Purpose:** Catch critical issues early, maintain review momentum, stay on top of new search queries.

**Checklist:**

- [ ] **Check GSC for indexing errors** on Belfast pages
  - Navigate to: GSC → Coverage Report
  - Filter to Belfast pages (`/uk/belfast*`)
  - Look for: "Error" or "Valid with warnings"
  - Action: If errors found, investigate immediately (see Alert Response procedures)

- [ ] **Review GA4 Belfast conversion events** (phone, form, directions)
  - Navigate to: GA4 → Reports → Engagement → Conversions
  - Filter to last 7 days
  - Compare to previous 7 days
  - Action: If 50%+ drop, investigate (see Conversion Drop Alert procedure)

- [ ] **Check GBP Insights** for new search queries and customer actions
  - Navigate to: GBP → Insights
  - View: Last 7 days
  - Note: New search queries appearing (add to keyword tracking)
  - Note: Total customer actions (calls + directions + website clicks)
  - Action: Respond to new queries with relevant content

- [ ] **Review Google reviews** and respond within 24 hours
  - Navigate to: GBP → Reviews
  - Respond to: All new reviews (positive and negative)
  - Template responses: See Section 5 (Reporting Templates)
  - Goal: 100% response rate within 24 hours

- [ ] **Quick indexing check** - Are Belfast pages still indexed?
  - Google search: `site:roseyco.com/uk/belfast`
  - Verify: 5 results appear (location page + 4 pillar pages)
  - Action: If missing, use GSC URL Inspection tool

- [ ] **Record key numbers** in tracking spreadsheet
  - Belfast impressions (GSC)
  - Belfast clicks (GSC)
  - Conversion events (GA4)
  - GBP actions (GBP Insights)
  - Spreadsheet: Use Google Sheets template (see Resources section)

**Time allocation:**
- GSC check: 3 minutes
- GA4 conversions: 2 minutes
- GBP insights: 3 minutes
- Reviews: 5 minutes (if 1-2 new reviews)
- Indexing check: 1 minute
- Recording numbers: 1 minute

**Red flags to escalate:**
- 3+ Belfast pages de-indexed
- 50%+ drop in conversion events week-over-week
- Negative review without response template available
- GSC manual action or security issue

---

### Monthly Review (45 minutes, first Monday of month)

**Purpose:** Analyze trends, identify optimization opportunities, track competitive movements, plan next month's actions.

**Checklist:**

- [ ] **Compare Belfast keyword positions** vs last month
  - Navigate to: GSC → Performance → Queries
  - Date range: Last 28 days vs prior 28 days
  - Filter: Belfast Queries
  - Export: Top 20 queries to spreadsheet
  - Calculate: Position change for each query (e.g., 12 → 8 = +4 improvement)
  - Action: Celebrate wins, investigate drops > 5 positions

- [ ] **Analyze top growing and declining Belfast queries**
  - Sort by: Impressions change (highest growth first)
  - Identify: Queries with 100%+ impression growth
  - Action: Create cluster content for growing queries
  - Identify: Queries with 50%+ impression decline
  - Action: Check if competitor published new content, update your content

- [ ] **Review Belfast page traffic trends** (GA4, month over month)
  - Navigate to: GA4 → Reports → Pages and Screens
  - Filter: Landing Page matches regex `.*\/uk\/belfast.*`
  - Date range: Last month vs prior month
  - Metrics: Sessions, Bounce Rate, Avg Session Duration
  - Action: Note which pillar/cluster posts are trending up/down

- [ ] **Check conversion rate changes** (form submissions / sessions)
  - Calculate: Form submissions ÷ Belfast page sessions × 100
  - Current month vs prior month
  - Benchmark: 2-5% conversion rate is healthy for B2B services
  - Action: If drop > 20%, investigate form UX (see Conversion Drop Alert)

- [ ] **Review competitor positions** for top 5 Belfast keywords
  - Keywords: "seo belfast", "social media marketing belfast", "digital marketing agency belfast", "website design belfast", "paid ads belfast"
  - Check positions: Use incognito search or rank tracker (if using BrightLocal)
  - Record: Competitor positions in tracking spreadsheet (see Section 3)
  - Action: If competitor overtakes you, investigate their content changes

- [ ] **Update Looker Studio dashboard screenshots** for records
  - Navigate to: Looker Studio Belfast dashboard
  - Screenshot: Executive Overview section
  - Save as: `belfast-dashboard-YYYY-MM.png`
  - Store in: Project folder or Google Drive
  - Purpose: Visual record of monthly progress

- [ ] **Identify 2-3 content optimization opportunities**
  - Look for: Queries with high impressions but low CTR (< 3%)
  - Example: 500 impressions, 10 clicks = 2% CTR → optimize title/meta description
  - Action: Add to content optimization backlog
  - Prioritize: Highest impression queries with CTR below benchmark

- [ ] **Check citation tracker** for new directory listings needed
  - Review: `.planning/phases/11-local-link-building-a-citations/belfast-citation-tracker.md`
  - Verify: Tier 1 citations still live (spot check 3-5 directories)
  - Action: If citation deleted or info changed, re-submit corrected NAP

- [ ] **Assess paid tool upgrade** based on client count
  - Current clients: [Count Belfast clients]
  - Revenue: [Monthly recurring revenue from Belfast clients]
  - Decision matrix:
    - 1 client (£500-1500/mo) → Add BrightLocal ($39/mo)
    - 2-3 clients (£1500-3000/mo) → Add SEMrush ($199/mo)
    - 5+ clients → Consider AgencyAnalytics for white-label reports
  - Action: Make purchase decision or defer to next month

**Time allocation:**
- GSC position analysis: 10 minutes
- Traffic trends review: 10 minutes
- Conversion rate calculation: 5 minutes
- Competitor check: 10 minutes
- Dashboard screenshot: 2 minutes
- Content opportunities: 5 minutes
- Citation check: 3 minutes

**Deliverable:** Monthly Performance Report (see Section 5 template)

---

### Quarterly Review (2 hours, every 3 months)

**Purpose:** Strategic assessment, competitive landscape analysis, ROI evaluation, next quarter planning.

**Checklist:**

- [ ] **Full competitive analysis** - Compare positions vs 5 Belfast competitors
  - Competitors: Digital 24, ProfileTree, VINDICTA, Rapid Agency, Loud Mouth Media
  - Keywords: All 20 priority keywords (see Section 4)
  - Data sources: GSC Performance Report + manual searches + BrightLocal (if available)
  - Create: Competitive position matrix (see Section 3 template)
  - Analysis: Where did you gain ground? Where did competitors improve?
  - Action: Adjust strategy based on competitive movements

- [ ] **Review overall Belfast SEO ROI**
  - Revenue from Belfast clients: [Total quarterly revenue]
  - Time invested: [Hours spent on Belfast SEO this quarter]
  - Cost invested: [Paid tools + content creation + link building]
  - ROI calculation: (Revenue - Costs) / Costs × 100
  - Benchmark: 300%+ ROI is healthy for SEO investment
  - Action: If ROI < 200%, reassess strategy or pricing

- [ ] **Evaluate content strategy effectiveness**
  - Pillar page performance:
    - `/uk/seo-belfast/` - sessions, conversions, avg. position
    - `/uk/social-media-belfast/` - sessions, conversions, avg. position
    - `/uk/paid-ads-belfast/` - sessions, conversions, avg. position
    - `/uk/website-design-belfast/` - sessions, conversions, avg. position
  - Cluster post performance:
    - Top 5 cluster posts by traffic
    - Conversion rate by cluster topic
  - Analysis: Which pillar drives most conversions? Which clusters attract most traffic?
  - Action: Double down on winning topics, deprioritize underperformers

- [ ] **Assess link building impact**
  - New backlinks acquired: [Count from GSC Links report]
  - Citation submissions completed: [Number from Tier 1 + Tier 2 lists]
  - Domain authority changes: [If using SEMrush/Ahrefs]
  - Action: Calculate backlinks per month rate, set target for next quarter

- [ ] **Review and update keyword targets** based on actual search volume
  - GSC provides real search volume data (not estimates)
  - Queries with higher volume than expected → Prioritize more content
  - Queries with lower volume than expected → Deprioritize or bundle
  - New queries appearing → Add to keyword map
  - Action: Update keyword priority matrix (see Section 4)

- [ ] **Plan next quarter's content calendar**
  - Based on: Winning topics, keyword opportunities, competitive gaps
  - Target: 8-12 new cluster posts per quarter (2-3 per month)
  - Topics: [List 8-12 topics based on research]
  - Publishing schedule: 2-3 posts per month (avoid bulk publishing)
  - Action: Create content briefs for next quarter

- [ ] **Decision: Continue, adjust, or expand strategy**
  - **Continue current strategy** if:
    - ROI > 300%
    - Rankings improving (3+ keywords moved to page 1)
    - Conversions trending up
    - Client acquisition from Belfast SEO
  - **Adjust focus** if:
    - One pillar significantly outperforms others → Shift resources
    - Competitor overtaking in key areas → Reactive content creation
    - Conversion rate declining → UX/CTA optimization needed
  - **Expand to new NI areas** if:
    - Belfast rankings stable (10+ keywords on page 1)
    - Client pipeline full from Belfast alone
    - Resources available for Lisburn, Bangor, Newtownabbey expansion
  - Action: Document strategic decision for next quarter

**Time allocation:**
- Competitive analysis: 30 minutes
- ROI evaluation: 15 minutes
- Content effectiveness: 30 minutes
- Link building review: 10 minutes
- Keyword target update: 15 minutes
- Content calendar planning: 20 minutes

**Deliverable:** Quarterly Strategy Review (see Section 5 template)

---

## 2. Alert Response Procedures

Step-by-step playbooks for common alert scenarios. Follow these workflows when automated alerts fire or manual checks reveal issues.

### Alert A: Ranking Drop (Position drops 5+ places for tracked keyword)

**Trigger:**
- GSC shows position drop from 8 → 13 (or worse) for priority Belfast keyword
- BrightLocal alert (if using) for local pack position drop
- Manual check reveals significant position loss

**Investigation Steps:**

**Step 1: Check for manual actions or security issues**
- Navigate to: GSC → Security & Manual Actions
- Look for: Alerts, warnings, manual action notifications
- If manual action present: Follow Google's instructions to resolve (typically content quality or link scheme issues)
- If security issue: Resolve immediately (malware, hacked content)

**Step 2: Review recent content changes to affected pages**
- Run: `git log --since="2 weeks ago" -- src/content/blog/uk/` (check for recent commits)
- Review: What changed on the ranking page in past 2-4 weeks?
- Possible issues:
  - Content removed or shortened significantly
  - Keywords removed or diluted
  - Internal links removed
  - Technical errors introduced (broken schema, broken links)

**Step 3: Check for Google algorithm update announcements**
- Visit: [Search Engine Roundtable](https://www.seroundtable.com/)
- Visit: [Google Search Central Blog](https://developers.google.com/search/blog)
- Look for: Algorithm update announcements in past 2-4 weeks
- Common updates: Core updates, Helpful Content updates, Link Spam updates
- Action: If update confirmed, assess whether content violates new guidelines

**Step 4: Inspect affected page - Is it still indexed?**
- GSC → URL Inspection tool
- Enter: Full URL of affected page
- Check: "URL is on Google" status
- If de-indexed: Request indexing, check for robots.txt or noindex issues
- If indexed: Check if content changed (Cache: search operator in Google)

**Step 5: Check if content or schema has errors**
- View page source
- Check: LocalBusiness schema valid (use Google Rich Results Test)
- Check: Internal links intact (no 404s)
- Check: Images loading, no broken media
- Action: Fix any technical errors found

**Step 6: Check competitor - Did they publish new content or acquire links?**
- Google search: [your target keyword]
- Identify: Who now ranks above you?
- Visit: Their page that outranks yours
- Analysis:
  - Content length: Is theirs longer/more comprehensive?
  - Content freshness: Did they recently update?
  - Backlinks: Check GSC Links report or SEMrush to see new backlinks
- Action: If competitor published superior content, improve yours

**Action Plan Based on Findings:**

| Finding | Action | Timeline |
|---------|--------|----------|
| Manual action or security issue | Resolve immediately per Google's instructions | 24 hours |
| Recent content change broke something | Revert change or fix issue | 24-48 hours |
| Google algorithm update | Assess content quality, update if needed | 1-2 weeks (allow update to settle first) |
| De-indexed page | Fix indexing issue, request re-indexing | 24 hours |
| Technical error (schema, links) | Fix error, validate, request re-indexing | 48 hours |
| Competitor published better content | Create superior content or update existing | 1-2 weeks |
| No clear cause (normal fluctuation) | Monitor for 2 weeks before acting | Wait 2 weeks |

**Important:** Don't panic over minor fluctuations (1-3 position changes). Wait 2 weeks to confirm trend before major actions.

---

### Alert B: Traffic Drop (30%+ decline week-over-week on Belfast pages)

**Trigger:**
- GA4 shows Belfast page sessions dropped 30%+ compared to prior week
- Looker Studio dashboard scorecard shows red (negative trend)

**Investigation Steps:**

**Step 1: Verify tracking is working**
- GA4 → Realtime report
- Visit: `/uk/belfast/` yourself
- Check: Does your visit appear in Realtime?
- If NO: Tracking broken, investigate GA4 tag installation
- If YES: Tracking working, continue investigation

**Step 2: Check for site-wide vs Belfast-specific issue**
- GA4 → Reports → Acquisition → Traffic Acquisition
- Date range: Last 7 days vs prior 7 days
- Compare: All site traffic vs Belfast traffic only
- If entire site down: Site-wide issue (server, indexing, algorithm)
- If Belfast only: Belfast-specific issue (content, rankings, seasonal)

**Step 3: Review GSC Coverage report for new errors**
- GSC → Coverage report
- Filter: Belfast pages
- Look for: Errors, Valid with warnings, Excluded pages
- Common issues:
  - Server error (5xx)
  - Redirect error
  - Blocked by robots.txt
  - Noindex tag added
- Action: Fix errors immediately

**Step 4: Check server status and page load times**
- Visit: All Belfast pages manually
- Check: Do they load quickly (< 3 seconds)?
- Use: PageSpeed Insights for detailed analysis
- If slow: Optimize images, scripts, or CDN issues
- If server error: Check hosting status, logs

**Step 5: Look for seasonal patterns**
- Belfast holidays, school terms, business cycles
- Examples:
  - Christmas week: Businesses closed, less B2B searching
  - Summer holidays: July-August dip typical
  - End of tax year: March spike for accounting-related services
- Action: If seasonal, note pattern for future comparison

**Step 6: Check for ranking drops (cross-reference with Alert A)**
- GSC → Performance → Queries
- Date range: Last 7 days vs prior 7 days
- Sort by: Clicks change (biggest decreases first)
- If multiple keywords dropped rankings: Follow Ranking Drop Alert procedure
- If rankings stable but traffic down: Possible search volume seasonality

**Action Plan Based on Findings:**

| Finding | Action | Timeline |
|---------|--------|----------|
| Tracking broken | Fix GA4 tag, verify with Realtime report | Immediate |
| Site-wide server issue | Contact hosting, resolve technical problem | Immediate |
| GSC indexing errors | Fix errors, request re-indexing | 24 hours |
| Slow page speed | Optimize images, scripts, server | 48 hours |
| Seasonal pattern | Document pattern, no action needed | None (monitor) |
| Ranking drops | Follow Ranking Drop Alert procedure | See Alert A |
| No clear cause | Monitor for another week | Wait 7 days |

**Note:** Week-to-week volatility is normal. Only act if drop persists 2+ weeks or is catastrophic (50%+ drop).

---

### Alert C: Conversion Drop (50%+ decline in phone/form events)

**Trigger:**
- GA4 Conversions report shows phone_call_click, form_submission, or direction_request events dropped 50%+ week-over-week
- Looker Studio conversion chart shows sharp decline

**Investigation Steps:**

**Step 1: Test the conversion paths manually**
- Visit: `/uk/belfast/` page
- Action 1: Click phone number link
  - Check: Does `tel:` link work on mobile?
  - Check: Does click register (use GA4 Realtime → Events)
- Action 2: Submit test form
  - Check: Does form submit successfully?
  - Check: Does `form_submission` event fire in Realtime?
- Action 3: Click "Get Directions" button
  - Check: Does Google Maps open?
  - Check: Does `direction_request` event fire?
- If any fail: Conversion path broken, fix immediately

**Step 2: Check if tracking code is still firing**
- Browser dev tools → Network tab
- Visit: Belfast page
- Search for: `gtag` or `analytics` requests
- Check: GA4 pageview event fires
- Click: Phone number
- Check: `phone_call_click` event fires in Network tab
- If not firing: JavaScript error or tracking code removed

**Step 3: Verify GA4 event configuration hasn't changed**
- GA4 → Admin → Events
- Check: `phone_call_click`, `form_submission`, `direction_request` still listed
- Check: "Mark as conversion" toggle still ON
- If toggled OFF: Re-enable conversion marking
- If event missing: Tracking code broken or events renamed

**Step 4: Check for UI/UX changes that affected conversion elements**
- Review: Recent git commits to Belfast pages
- Look for:
  - Phone number removed or made un-clickable
  - Contact form removed or hidden
  - "Get Directions" button removed
  - CTA button colors changed (reduced visibility)
  - Form fields added (increased friction)
- Action: Revert changes or A/B test to confirm impact

**Step 5: Compare mobile vs desktop conversion rates**
- GA4 → Reports → Tech → Tech Details
- Filter: To Belfast pages
- Dimension: Device category
- Metric: Conversion rate by device
- Analysis:
  - Mobile conversions down but desktop stable → Mobile UX issue
  - Desktop down but mobile stable → Desktop UX issue
  - Both down → Site-wide issue or traffic quality change
- Action: Focus optimization on affected device type

**Step 6: Check traffic quality (is traffic source changing?)**
- GA4 → Reports → Acquisition → Traffic Acquisition
- Filter: To Belfast pages
- Compare: Current week vs prior week sources
- Look for:
  - Increase in low-quality traffic (e.g., bot traffic, spam referrals)
  - Decrease in high-intent traffic (e.g., organic search down, direct traffic up)
- Analysis: If traffic source quality dropped, conversions drop naturally
- Action: Focus on driving high-quality organic traffic

**Action Plan Based on Findings:**

| Finding | Action | Timeline |
|---------|--------|----------|
| Conversion path broken | Fix broken links, forms, buttons | Immediate |
| Tracking code not firing | Fix JavaScript errors, restore tracking | Immediate |
| GA4 event configuration changed | Re-mark events as conversions | Immediate |
| UI/UX change reduced visibility | A/B test, potentially revert change | 24-48 hours |
| Mobile-specific issue | Optimize mobile UX, test thoroughly | 48 hours |
| Traffic quality degraded | Focus on SEO, reduce low-quality sources | 1-2 weeks |
| No clear technical issue | Monitor traffic quality and user behavior | Ongoing |

**Important:** Always test conversion paths on both desktop AND mobile. 68% of Belfast searches are mobile.

---

### Alert D: New Competitor Alert (New business appearing in local pack)

**Trigger:**
- Manual Google search for "seo belfast" (or other priority keyword) shows new competitor in top 3 Local Pack
- BrightLocal alert (if using) for new local pack competitor

**Investigation Steps:**

**Step 1: Check their GBP listing**
- Details to note:
  - **Categories:** What primary category do they use?
  - **Reviews:** How many? What rating? How recent?
  - **Photos:** Do they have professional photos? How many?
  - **Description:** How is their business description written?
  - **Posts:** Are they actively posting to GBP?
  - **Services:** What services are they listing?
  - **Attributes:** What attributes have they enabled?
- Comparison: How does their GBP compare to yours?

**Step 2: Analyze their website**
- Visit: Competitor website
- Content depth:
  - Blog post count: Do they have blog content?
  - Service pages: How detailed are their service descriptions?
  - Case studies: Do they showcase client results?
- Technical SEO:
  - Site speed: Is it fast?
  - Mobile-friendly: Does it work well on mobile?
  - Schema markup: Use Google Rich Results Test to check
- Backlink profile:
  - If using SEMrush/Ahrefs: Check their backlink count and quality
  - Manual check: Google search `link:competitor.com` for rough estimate

**Step 3: Check if they're running paid ads**
- Google search: "seo belfast"
- Look for: Competitor appearing in Google Ads (top of page, marked "Sponsored")
- Check: Other Belfast keywords they might be bidding on
- Analysis: Are they investing in paid acquisition or just organic?

**Step 4: Assess if they're targeting same Belfast SMB market**
- Website positioning: Who is their target audience?
  - Enterprise language → Not direct competition
  - SMB-focused → Direct competition
- Pricing: Do they show pricing? What range?
- Case studies: What size clients do they showcase?
- Comparison: Overlap with Rosey Co target market (£500-2000/month SMBs)

**Step 5: Assess threat level**

**High Threat (Respond immediately):**
- ✅ GBP: 20+ reviews, 4.8+ rating, recent reviews
- ✅ Website: 30+ blog posts, comprehensive service pages
- ✅ Target market: Same SMB focus as Rosey Co
- ✅ Active GBP: Weekly posts, frequent updates
- ✅ Paid ads: Running Google Ads on your keywords

**Medium Threat (Monitor closely):**
- ⚠️ GBP: 10-20 reviews, 4.5+ rating
- ⚠️ Website: 10-30 blog posts, decent content
- ⚠️ Different positioning: Not directly competing for same clients
- ⚠️ Sporadic GBP activity

**Low Threat (Monitor quarterly):**
- ℹ️ GBP: < 10 reviews
- ℹ️ Website: Thin content (< 10 pages)
- ℹ️ Different market: Enterprise or different service mix
- ℹ️ No GBP activity

**Action Plan Based on Threat Level:**

| Threat Level | Actions | Timeline |
|--------------|---------|----------|
| **High** | • Accelerate review generation (target 3-4/month)<br>• Create content directly addressing their positioning<br>• Improve GBP posting frequency (2x/week)<br>• Consider targeted paid ads on key keywords<br>• Enhance top-performing service pages | Immediate - 2 weeks |
| **Medium** | • Add competitor to monthly monitoring list<br>• Identify content gaps they have vs you<br>• Maintain current review velocity<br>• Monitor their growth trajectory | Ongoing monitoring |
| **Low** | • Add to quarterly competitive check<br>• No immediate action needed | Quarterly review |

**Documentation:**
- Add competitor to tracking spreadsheet (Section 3 template)
- Screenshot their GBP listing (for future comparison)
- Note their primary differentiation

---

## 3. Competitive Tracking Framework

Monitor 5 key Belfast competitors to identify threats and opportunities.

### Top 5 Belfast Competitors (From Phase 6 Research)

| Competitor | Primary Strength | Market Position | Monitoring Priority |
|------------|------------------|-----------------|---------------------|
| **Digital 24** | 105 Google reviews, 4.96/5 rating | Premium digital agency, strong local reputation | HIGH - Review leader |
| **ProfileTree** | Large blog (~200 posts), strong content marketing | Content authority, Belfast based | HIGH - Content competitor |
| **VINDICTA Digital** | £100M+ revenue, enterprise scale | National agency, premium positioning | MEDIUM - Different market segment |
| **Rapid Agency Belfast** | Local SEO specialist | Belfast SMB focus | HIGH - Direct competitor |
| **Loud Mouth Media** | PPC specialist, Belfast based | Paid advertising focus | MEDIUM - Different primary service |

### Monthly Tracking Template

Track these metrics on first Monday of each month. Use spreadsheet or markdown table.

**Keyword Position Tracking Table:**

| Month | Keyword | Rosey Co | Digital 24 | ProfileTree | VINDICTA | Rapid | Loud Mouth | Notes |
|-------|---------|----------|------------|-------------|----------|-------|------------|-------|
| Feb 2026 | seo belfast | 12 | 3 | 7 | 2 | 5 | - | VINDICTA + Digital 24 dominate |
| Feb 2026 | social media marketing belfast | 8 | 6 | - | - | - | 4 | Loud Mouth strong on social |
| Feb 2026 | digital marketing agency belfast | 15 | 2 | 4 | 1 | 8 | 7 | VINDICTA #1, competitive |
| Feb 2026 | website design belfast | 11 | 5 | 6 | - | - | - | Opportunity: No major competitor |
| Feb 2026 | paid ads belfast | 9 | 7 | - | 3 | - | 2 | Loud Mouth dominates PPC |
| Mar 2026 | seo belfast | [Update] | | | | | | [Notes] |

**Note:** Use incognito browser or rank tracking tool (BrightLocal, SEMrush) for consistent position data.

**Priority Keywords to Track:**

**Primary (Track weekly):**
1. seo belfast
2. social media marketing belfast
3. digital marketing agency belfast
4. website design belfast
5. paid ads belfast

**Secondary (Track monthly):**
1. local seo belfast
2. google ads belfast
3. ppc belfast
4. seo agency belfast
5. social media agency belfast
6. facebook marketing belfast
7. instagram marketing belfast
8. affordable seo belfast
9. best seo agency belfast
10. seo services belfast

**Long-tail (Track quarterly):**
1. small business seo belfast
2. ecommerce website belfast
3. seo cost belfast
4. google ads management belfast
5. social media management belfast

### GBP Competitive Metrics

Track competitor Google Business Profile performance quarterly.

| Competitor | Q1 Review Count | Q1 Rating | Q2 Review Count | Q2 Rating | Q3 Review Count | Q3 Rating | Review Velocity |
|------------|-----------------|-----------|-----------------|-----------|-----------------|-----------|-----------------|
| Rosey Co | [Start] | [Start] | | | | | Target: 2-4/month |
| Digital 24 | 105 | 4.96 | | | | | |
| ProfileTree | [Research] | [Research] | | | | | |
| VINDICTA | [Research] | [Research] | | | | | |
| Rapid | [Research] | [Research] | | | | | |
| Loud Mouth | [Research] | [Research] | | | | | |

**Data collection:**
- Search: "[competitor name] belfast" in Google
- Click: Their GBP listing
- Record: Review count and star rating

### Content Monitoring (Monthly)

**What to track:**
- New blog posts published (count per month)
- New service pages added
- Major content updates (rewrites, expansions)
- New case studies or portfolios

**Tracking method:**
1. Visit competitor blog page
2. Note: Most recent post date
3. Count: New posts since last check
4. Screenshot: If significant content added

**Competitive content analysis:**
| Competitor | Blog Posts (Total) | New Posts This Month | Pillar Pages | Notable Updates |
|------------|-------------------|----------------------|--------------|-----------------|
| Rosey Co | 34 (22 US + 12 Belfast) | [Track] | 4 Belfast | [Notes] |
| Digital 24 | [Research] | [Track] | [Research] | [Notes] |
| ProfileTree | ~200 | [Track] | [Research] | [Notes] |
| VINDICTA | [Research] | [Track] | [Research] | [Notes] |

### Social Media Activity (Quarterly)

Track competitor social media presence for brand awareness insights.

**Metrics to check:**
- Instagram follower count
- Facebook page likes
- LinkedIn company followers
- Posting frequency (posts per week)

**Note:** Social media activity correlates with brand awareness and GBP engagement.

### Tools for Competitive Tracking

**Free:**
- Manual Google searches (incognito mode)
- GBP listings (public data)
- Competitor website visits
- Google Alerts for competitor brand mentions

**Paid (after 2-3 clients):**
- BrightLocal ($39/mo): Local pack position tracking
- SEMrush ($199/mo): Keyword rankings, backlink tracking, content gap analysis
- SpyFu: Paid ad tracking, keyword research

---

## 4. Belfast Target Keywords for Tracking

Organized by priority and tracking frequency.

### Primary Keywords (Track Weekly)

These 7 keywords represent highest commercial value and direct alignment with Rosey Co core services.

| Keyword | Current Position | Target (M3) | Target (M6) | Target (M12) | Search Intent | Content Type |
|---------|------------------|-------------|-------------|--------------|---------------|--------------|
| seo belfast | [Baseline] | Top 20 | Top 10 | Top 5 | Commercial | Pillar page |
| social media marketing belfast | [Baseline] | Top 20 | Top 10 | Top 5 | Commercial | Pillar page |
| digital marketing belfast | [Baseline] | Top 15 | Top 10 | Top 3 | Commercial | Pillar page |
| website design belfast | [Baseline] | Top 20 | Top 10 | Top 5 | Commercial/Transactional | Service page |
| paid ads belfast | [Baseline] | Top 20 | Top 10 | Top 5 | Commercial | Cluster page |
| google ads belfast | [Baseline] | Top 20 | Top 10 | Top 5 | Commercial/Transactional | Cluster page |
| seo agency belfast | [Baseline] | Top 20 | Top 10 | Top 5 | Commercial | Cluster page |

**Tracking method:**
- GSC Performance Report: Filtered to these queries, review every Monday
- Record positions in tracking spreadsheet
- Alert if any drop > 5 positions week-over-week

### Secondary Keywords (Track Monthly)

These 15 keywords support primary keywords and capture long-tail search variations.

| Keyword | Target (M6) | Target (M12) | Content Type |
|---------|-------------|--------------|--------------|
| local seo belfast | Top 15 | Top 10 | Cluster page |
| ppc belfast | Top 15 | Top 10 | Cluster page |
| social media agency belfast | Top 20 | Top 10 | Cluster page |
| digital marketing agency belfast | Top 15 | Top 10 | Cluster page |
| seo services belfast | Top 20 | Top 10 | Cluster page |
| seo company belfast | Top 20 | Top 10 | Cluster page |
| facebook marketing belfast | Top 20 | Top 15 | Cluster page |
| instagram marketing belfast | Top 20 | Top 15 | Cluster page |
| facebook ads belfast | Top 20 | Top 15 | Cluster page |
| affordable seo belfast | Top 20 | Top 15 | Cluster page |
| best seo agency belfast | Top 15 | Top 10 | Comparison content |
| google ads management belfast | Top 20 | Top 15 | Cluster page |
| social media management belfast | Top 20 | Top 15 | Cluster page |
| online marketing belfast | Top 25 | Top 15 | Cluster page |
| website traffic belfast | Top 30 | Top 20 | Blog post |

**Tracking method:**
- GSC Performance Report: Reviewed first Monday of month
- Export top 50 queries, filter to these keywords
- Note position changes month-over-month

### Long-tail Keywords (Track Quarterly)

These 10 keywords capture specific SMB and platform-specific searches.

| Keyword | Target (M12) | Content Type |
|---------|--------------|--------------|
| small business seo belfast | Top 15 | Cluster page |
| ecommerce website belfast | Top 20 | Blog post |
| seo cost belfast | Top 20 | Blog post |
| responsive website belfast | Top 20 | Cluster page |
| tiktok marketing belfast | Top 25 | Cluster page |
| lead generation belfast | Top 25 | Cluster page |
| technical seo belfast | Top 25 | Cluster page |
| link building belfast | Top 30 | Cluster page |
| seo for plumbers belfast | Top 30 | Industry-specific blog |
| seo for dentists belfast | Top 30 | Industry-specific blog |

**Tracking method:**
- Quarterly review (every 3 months)
- GSC Performance Report: Export top 100 queries
- Identify which long-tail keywords are appearing
- Adjust content strategy based on emerging queries

### "Near Me" Keywords (GBP-Dependent)

These keywords rely heavily on GBP optimization, not website content.

| Keyword | Strategy | Target |
|---------|----------|--------|
| seo agency near me | GBP optimization, local citations | Appear in Local Pack |
| digital marketing near me | GBP optimization | Appear in Local Pack |
| social media agency near me | GBP optimization | Appear in Local Pack |
| website design near me | GBP optimization | Appear in Local Pack |

**Note:** 46% of Belfast searches include "near me" (from Phase 6 research). GBP optimization = 32% of local pack ranking factors.

**Actions for "near me" success:**
- Complete GBP profile 100%
- Post to GBP 2x per week
- Generate 2-4 reviews per month
- Respond to all reviews within 24 hours
- Add all relevant categories and attributes

---

## 5. Reporting Templates

Pre-formatted templates for weekly, monthly, and quarterly reports.

### Template A: Weekly Status Update (3-5 bullet points)

**Format:** Brief markdown suitable for Slack, email, or project management tool.

```markdown
# Belfast SEO - Weekly Update (Week of [Date])

**Key Metrics:**
- Belfast Impressions: [X] ([+/-Y%] vs last week)
- Belfast Clicks: [X] ([+/-Y%] vs last week)
- Conversions: [X] phone + [X] form + [X] directions ([+/-Y%] vs last week)

**Actions Taken:**
- [Action 1: e.g., Responded to 2 new Google reviews]
- [Action 2: e.g., Fixed indexing error on /uk/seo-belfast/ page]
- [Action 3: e.g., Published cluster post "Small Business SEO Belfast"]

**Upcoming:**
- [Next week task 1: e.g., Monitor ranking for "seo belfast" (dropped 3 positions)]
- [Next week task 2: e.g., Complete Tier 1 citation submissions]
```

**Example filled out:**
```markdown
# Belfast SEO - Weekly Update (Week of Feb 11, 2026)

**Key Metrics:**
- Belfast Impressions: 127 (+18% vs last week)
- Belfast Clicks: 12 (+50% vs last week)
- Conversions: 1 phone + 3 form + 1 directions (+25% vs last week)

**Actions Taken:**
- Responded to 2 new Google reviews (5-star and 4-star)
- Published cluster post "Affordable SEO Belfast: What SMBs Should Budget"
- Fixed broken internal link on Social Media Belfast pillar page

**Upcoming:**
- Monitor "social media marketing belfast" (jumped from 15 → 11)
- Complete Foursquare citation submission
- Plan March content calendar
```

---

### Template B: Monthly Performance Report (1 page)

**Format:** More comprehensive, suitable for stakeholder review or client reporting.

```markdown
# Belfast SEO - Monthly Performance Report
**Period:** [Month Year]
**Reporting Date:** [Date]

---

## Executive Summary

[2-3 sentences summarizing overall month performance]

**Overall Performance:** [On Track / Ahead of Target / Behind Target]

---

## Key Metrics vs Targets

| Metric | Target (Month [X]) | Actual | Status |
|--------|-------------------|--------|--------|
| Belfast Impressions | [Target] | [Actual] | ✅ / ⚠️ / ❌ |
| Belfast Clicks | [Target] | [Actual] | ✅ / ⚠️ / ❌ |
| Avg Position | [Target] | [Actual] | ✅ / ⚠️ / ❌ |
| Phone Calls | [Target] | [Actual] | ✅ / ⚠️ / ❌ |
| Form Submissions | [Target] | [Actual] | ✅ / ⚠️ / ❌ |
| GBP Profile Views | [Target] | [Actual] | ✅ / ⚠️ / ❌ |

**Status Key:** ✅ Met or exceeded target | ⚠️ Within 20% of target | ❌ > 20% below target

---

## Wins This Month

1. **[Win 1]:** [Description + metric impact]
2. **[Win 2]:** [Description + metric impact]
3. **[Win 3]:** [Description + metric impact]

---

## Concerns / Issues

1. **[Concern 1]:** [Description + impact + mitigation plan]
2. **[Concern 2]:** [Description + impact + mitigation plan]

---

## Top Performing Content

| Page | Sessions | Conversions | Avg Position |
|------|----------|-------------|--------------|
| [Top page 1] | [X] | [X] | [X] |
| [Top page 2] | [X] | [X] | [X] |
| [Top page 3] | [X] | [X] | [X] |

---

## Competitive Snapshot

**Rankings for "seo belfast":**
- Rosey Co: Position [X] ([+/-Y] vs last month)
- Digital 24: Position [X]
- ProfileTree: Position [X]
- VINDICTA: Position [X]

---

## Next Month Priorities

1. **[Priority 1]:** [Task + expected outcome]
2. **[Priority 2]:** [Task + expected outcome]
3. **[Priority 3]:** [Task + expected outcome]

---

**Report prepared by:** [Name]
**Questions/Discussion:** [Contact info]
```

---

### Template C: Quarterly Strategy Review (2-3 pages)

**Format:** Comprehensive strategic document for major decision-making.

```markdown
# Belfast SEO - Quarterly Strategy Review
**Quarter:** Q[X] [Year]
**Review Date:** [Date]
**Reporting Period:** [Start Date] - [End Date]

---

## Quarter Summary

[3-5 paragraphs summarizing quarter performance, major wins, challenges, and strategic insights]

---

## KPI Dashboard Summary

### Search Visibility (GSC)

| Metric | Q[X] Start | Q[X] End | Change | Target | Status |
|--------|-----------|----------|--------|--------|--------|
| Belfast Impressions | [X] | [X] | [+/-X%] | [Target] | ✅ / ⚠️ / ❌ |
| Belfast Clicks | [X] | [X] | [+/-X%] | [Target] | ✅ / ⚠️ / ❌ |
| Avg Position | [X] | [X] | [+/-X] | [Target] | ✅ / ⚠️ / ❌ |
| Page 1 Rankings | [X] keywords | [X] keywords | [+/-X] | [Target] | ✅ / ⚠️ / ❌ |

### Local Actions (GA4 + GBP)

| Metric | Q[X] Total | Monthly Avg | Change vs Q[X-1] | Target | Status |
|--------|-----------|-------------|------------------|--------|--------|
| Phone Calls | [X] | [X/month] | [+/-X%] | [Target] | ✅ / ⚠️ / ❌ |
| Form Submissions | [X] | [X/month] | [+/-X%] | [Target] | ✅ / ⚠️ / ❌ |
| Direction Requests | [X] | [X/month] | [+/-X%] | [Target] | ✅ / ⚠️ / ❌ |
| GBP Actions | [X] | [X/month] | [+/-X%] | [Target] | ✅ / ⚠️ / ❌ |

### Traffic Quality (GA4)

| Metric | Q[X] Avg | Change vs Q[X-1] | Target | Status |
|--------|----------|------------------|--------|--------|
| Belfast Sessions | [X/month] | [+/-X%] | [Target] | ✅ / ⚠️ / ❌ |
| Bounce Rate | [X%] | [+/-X%] | < 60% | ✅ / ⚠️ / ❌ |
| Avg Session Duration | [X min] | [+/-X%] | 2+ min | ✅ / ⚠️ / ❌ |
| Pages/Session | [X] | [+/-X%] | 2+ | ✅ / ⚠️ / ❌ |

---

## Competitive Landscape Changes

### Keyword Position Changes (Quarter)

| Keyword | Q[X] Start Position | Q[X] End Position | Change | Top Competitors |
|---------|---------------------|-------------------|--------|-----------------|
| seo belfast | [X] | [X] | [+/-X] | [List top 3] |
| social media marketing belfast | [X] | [X] | [+/-X] | [List top 3] |
| digital marketing belfast | [X] | [X] | [+/-X] | [List top 3] |
| [Additional priority keywords...] | | | | |

### Competitor Movements

**[Competitor 1]:**
- Notable changes: [e.g., Published 12 new blog posts, acquired 15 new backlinks]
- Threat assessment: [High / Medium / Low]
- Response strategy: [Actions to maintain/gain competitive position]

**[Competitor 2]:**
- Notable changes: [...]
- Threat assessment: [...]
- Response strategy: [...]

---

## Content Performance Analysis

### Pillar Page Performance

| Pillar | Sessions (Q[X]) | Conversions | Avg Position | Top Keywords |
|--------|----------------|-------------|--------------|--------------|
| SEO Belfast | [X] | [X] | [X] | [List top 3-5] |
| Social Media Belfast | [X] | [X] | [X] | [List top 3-5] |
| Paid Ads Belfast | [X] | [X] | [X] | [List top 3-5] |
| Website Design Belfast | [X] | [X] | [X] | [List top 3-5] |

**Analysis:** [2-3 sentences on which pillar performs best and why]

### Cluster Post Performance

**Top 5 Cluster Posts by Traffic:**
1. [Post title] - [X sessions], [X conversions], Position [X]
2. [Post title] - [X sessions], [X conversions], Position [X]
3. [Post title] - [X sessions], [X conversions], Position [X]
4. [Post title] - [X sessions], [X conversions], Position [X]
5. [Post title] - [X sessions], [X conversions], Position [X]

**Analysis:** [2-3 sentences on common themes in top performers]

**Bottom 3 Cluster Posts (Need Optimization):**
1. [Post title] - [Why underperforming + optimization plan]
2. [Post title] - [Why underperforming + optimization plan]
3. [Post title] - [Why underperforming + optimization plan]

---

## Link Building Impact

**Backlinks Acquired:** [X] new backlinks this quarter
- Tier 1 Citations: [X completed]
- Tier 2 Citations: [X completed]
- Editorial Links: [X acquired via HARO, guest posts, etc.]
- Partnership Links: [X acquired]

**Domain Authority / Referring Domains:**
- Q[X] Start: [X domains]
- Q[X] End: [X domains]
- Change: [+/-X]

**Link Quality Analysis:** [2-3 sentences on link quality and relevance]

---

## ROI Analysis

**Revenue from Belfast Clients:**
- Q[X] Total Revenue: £[X]
- New Clients Acquired: [X]
- Average Client Value: £[X/month]

**Costs Invested:**
- Time Investment: [X hours] @ £[hourly rate] = £[X]
- Paid Tools: £[X] (BrightLocal, SEMrush, etc.)
- Content Creation: £[X] (if outsourced)
- Link Building: £[X]
- **Total Cost:** £[X]

**ROI Calculation:**
- ROI = (Revenue - Costs) / Costs × 100
- **ROI:** [X]%

**Benchmark:** 300%+ ROI is healthy for SEO investment.

**Analysis:** [2-3 sentences on ROI performance and sustainability]

---

## Strategic Insights & Recommendations

### What's Working

1. **[Success 1]:** [Description + supporting data]
2. **[Success 2]:** [Description + supporting data]
3. **[Success 3]:** [Description + supporting data]

### What's Not Working

1. **[Challenge 1]:** [Description + root cause analysis]
2. **[Challenge 2]:** [Description + root cause analysis]

### Opportunities Identified

1. **[Opportunity 1]:** [Description + potential impact]
2. **[Opportunity 2]:** [Description + potential impact]
3. **[Opportunity 3]:** [Description + potential impact]

---

## Next Quarter Strategy

### Primary Goal: [State primary objective for Q[X+1]]

### Key Initiatives:

**Initiative 1: [Name]**
- Objective: [What success looks like]
- Actions: [3-5 specific tasks]
- Timeline: [Milestone dates]
- Success Metrics: [How to measure]

**Initiative 2: [Name]**
- Objective: [...]
- Actions: [...]
- Timeline: [...]
- Success Metrics: [...]

**Initiative 3: [Name]**
- Objective: [...]
- Actions: [...]
- Timeline: [...]
- Success Metrics: [...]

### Content Calendar (Q[X+1])

| Month | Planned Content | Target Keywords | Content Type |
|-------|----------------|-----------------|--------------|
| [Month 1] | [3-4 posts] | [Keywords] | [Types] |
| [Month 2] | [3-4 posts] | [Keywords] | [Types] |
| [Month 3] | [3-4 posts] | [Keywords] | [Types] |

### Resource Allocation

- **Time Budget:** [X hours/month] for Belfast SEO
- **Content Budget:** [£X] for outsourced content (if applicable)
- **Tools Budget:** [£X/month] for analytics and monitoring tools
- **Link Building Budget:** [£X] for citations and outreach

---

## Decision: Continue, Adjust, or Expand?

**Decision:** [Continue Current Strategy / Adjust Focus / Expand to New Areas]

**Rationale:** [2-3 paragraphs explaining decision with supporting data]

**If Adjusting:** [Describe specific changes to strategy]

**If Expanding:** [Describe expansion plan - e.g., Lisburn, Bangor, Newtownabbey]

---

**Report prepared by:** [Name]
**Review session:** [Date and time for discussion]
**Next quarterly review:** [Date in 3 months]
```

---

## Resources & Next Steps

### Tracking Spreadsheet Template

**Google Sheets structure:**

**Sheet 1: Weekly Metrics**
- Columns: Date | Belfast Impressions | Belfast Clicks | Avg Position | Phone Calls | Form Submissions | Directions | GBP Views | Notes

**Sheet 2: Monthly Keyword Positions**
- Columns: Month | Keyword | Rosey Co Position | Competitor 1 | Competitor 2 | Competitor 3 | Competitor 4 | Competitor 5 | Notes

**Sheet 3: Competitive GBP Tracking**
- Columns: Competitor | Q1 Reviews | Q1 Rating | Q2 Reviews | Q2 Rating | Q3 Reviews | Q3 Rating | Review Velocity

**Sheet 4: Content Performance**
- Columns: Content Title | URL | Publish Date | Sessions (Month) | Conversions | Avg Position | Notes

**Access:** Create copy from template (link to be added to project folder)

### Automated Alert Setup

**GA4 Custom Alerts:**
1. Go to: GA4 → Admin → Custom Insights
2. Create alert: "Belfast Traffic Drop"
   - Condition: Sessions (Belfast pages filter) decreases by 30%+ week-over-week
   - Email: [Your email]
3. Create alert: "Conversion Drop"
   - Condition: Conversion events decrease by 50%+ week-over-week
   - Email: [Your email]

**GSC Email Notifications:**
- Configured in Section 2 (Dashboard Specification)
- Automatic for indexing issues, manual actions, security

### Review Calendar Reminders

**Set recurring calendar events:**

1. **Weekly Review** - Every Monday 9:00 AM (15 min)
   - Calendar event title: "Belfast SEO Weekly Review"
   - Description: Link to this playbook Section 1
   - Checklist: Copy from Weekly Review section

2. **Monthly Review** - First Monday of month 9:00 AM (45 min)
   - Calendar event title: "Belfast SEO Monthly Review"
   - Description: Link to this playbook Section 1
   - Deliverable: Monthly Performance Report (Template B)

3. **Quarterly Review** - First Monday of quarter (2 hours)
   - Calendar event title: "Belfast SEO Quarterly Strategy Review"
   - Description: Link to this playbook Section 1
   - Deliverable: Quarterly Strategy Review (Template C)

---

**End of Belfast Monitoring Playbook**

*Related document: Belfast Analytics Dashboard Specification (setup instructions for metrics tracking)*

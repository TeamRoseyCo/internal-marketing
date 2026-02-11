# Belfast Analytics Dashboard Specification

**Purpose:** Complete dashboard configuration guide for monitoring Belfast SEO performance across Google Search Console, Google Analytics 4, Google Business Profile, and Looker Studio.

**Audience:** Business owner executing analytics setup, or agency team configuring monitoring for Belfast location.

**Last Updated:** 2026-02-11

---

## 1. Belfast KPI Definitions & Targets

Track 15 key metrics across 4 categories to measure Belfast SEO domination progress.

### Category A: Search Visibility (Google Search Console)

| KPI | Definition | Month 3 Target | Month 6 Target | Month 12 Target | Data Source |
|-----|------------|----------------|----------------|-----------------|-------------|
| **Belfast Keyword Impressions** | Total impressions for queries containing "belfast" OR "northern ireland" OR page path `/uk/belfast*` | 500/month | 2,000/month | 8,000/month | GSC Performance Report |
| **Belfast Keyword Clicks** | Total clicks from Belfast-related queries and pages | 50/month | 200/month | 800/month | GSC Performance Report |
| **Average Position (Belfast Queries)** | Mean ranking position for Belfast target keywords (lower is better) | Top 20 (position 11-20) | Top 10 (position 6-10) | Top 5 (position 1-5) | GSC Performance Report |
| **Click-Through Rate (Belfast)** | CTR for Belfast queries (Clicks ÷ Impressions × 100) | 3%+ | 5%+ | 8%+ | GSC Calculated Field |
| **Page 1 Rankings Count** | Number of Belfast keywords ranking positions 1-10 | 5 keywords | 15 keywords | 30+ keywords | GSC Performance Report |

**Context:**
- Impressions = Number of times your site appeared in search results for Belfast queries
- Clicks = Number of users who clicked through to your site from search results
- Average Position = Where you rank on average (1 = top of page 1, 11 = top of page 2)
- CTR benchmark: 3% = acceptable, 5% = good, 8%+ = excellent for commercial keywords

### Category B: Local Actions (GA4 + GBP Insights)

| KPI | Definition | Month 3 Target | Month 6 Target | Month 12 Target | Data Source |
|-----|------------|----------------|----------------|-----------------|-------------|
| **Phone Call Clicks** | GA4 `phone_call_click` event fires (website phone number clicks) | 5/month | 15/month | 40/month | GA4 Conversions Report |
| **Direction Requests** | GA4 `direction_request` event fires (users requesting directions) | 3/month | 10/month | 25/month | GA4 Conversions Report |
| **Contact Form Submissions** | GA4 `form_submission` event fires from Belfast pages | 10/month | 30/month | 75/month | GA4 Conversions Report |
| **GBP Profile Views** | Number of times Belfast GBP listing appeared in search/maps | 200/month | 600/month | 1,500/month | GBP Insights Dashboard |
| **GBP Customer Actions** | Total calls + direction requests + website clicks from GBP | 15/month | 50/month | 120/month | GBP Insights Dashboard |

**Context:**
- These events track actual business outcomes (calls, directions, inquiries) not just vanity metrics
- GA4 events fire when users interact with phone numbers, direction buttons, or contact forms
- GBP actions show how your Google Business Profile drives business results
- Month 3 targets assume 0-1 active Belfast clients; Month 12 assumes 3-5 clients with referral flow

### Category C: Traffic Quality (Google Analytics 4)

| KPI | Definition | Target | Data Source |
|-----|------------|--------|-------------|
| **Belfast Page Sessions** | Total sessions on pages with path containing `/uk/belfast*` | 150/month (M3), 500/month (M6), 1,200/month (M12) | GA4 Pages and Screens Report |
| **Belfast Page Bounce Rate** | Percentage of single-page sessions (lower is better) | Under 60% | GA4 Pages and Screens Report |
| **Average Session Duration (Belfast)** | Mean time spent on Belfast pages per session | 2+ minutes | GA4 Engagement Report |
| **Belfast Pages Per Session** | Average number of Belfast pages viewed per session | 2+ pages | GA4 Engagement Report |

**Context:**
- Bounce rate under 60% indicates content is engaging and relevant
- 2+ minute session duration shows users are reading, not bouncing
- 2+ pages per session indicates good internal linking and content flow
- Filter GA4 to Belfast pages using regex: `.*\/uk\/belfast.*|.*\/uk\/.*-belfast.*`

### Category D: Content Performance (GA4 + GSC)

| KPI | Definition | Measurement | Data Source |
|-----|------------|-------------|-------------|
| **Top Belfast Blog Posts** | Highest traffic cluster posts (by organic sessions) | Track top 5, analyze why they perform | GA4 Landing Pages Report + GSC Pages Report |
| **Pillar vs Cluster Traffic** | Traffic distribution between 4 pillars and cluster posts | Ideal: 40% pillar, 60% cluster (shows depth working) | GA4 Pages Report with filters |
| **New vs Returning (Belfast)** | Percentage breakdown of new users vs returning | Goal: 70% new, 30% returning (healthy growth + loyalty) | GA4 User Attributes Report |

**Context:**
- Top performers indicate which topics resonate with Belfast audience
- Pillar-heavy traffic = good topic authority; Cluster-heavy = long-tail keywords working
- New/returning balance shows whether you're growing reach while building loyalty

---

## 2. Google Search Console Setup Instructions

Step-by-step process to configure GSC for Belfast monitoring.

### Step 1: Verify roseyco.com Property

**If not already verified:**

1. Navigate to: https://search.google.com/search-console
2. Click **Add Property**
3. Enter domain: `roseyco.com`
4. Choose verification method:
   - **Recommended:** DNS verification (add TXT record to domain registrar)
   - **Alternative:** HTML tag in site `<head>` (add to `app/layout.tsx`)
5. Complete verification

**If already verified:** Skip to Step 2.

### Step 2: Create Belfast Content Filters (Saved Filters)

**Filter 1: Belfast Pages**
1. Go to **Performance** report
2. Click **+ New** tab
3. Click **Page** filter → Select **Custom (regex)**
4. Enter pattern: `.*\/uk\/belfast.*|.*\/uk\/.*-belfast.*`
   - Matches: `/uk/belfast/`, `/uk/seo-belfast/`, `/uk/social-media-belfast/`, `/uk/paid-ads-belfast/`, `/uk/website-design-belfast/`
5. Click **Apply**
6. Save filter as: **Belfast Pages**

**Filter 2: Belfast Queries**
1. In same Performance report, click **+ New** filter
2. Click **Query** filter → Select **Custom (regex)**
3. Enter pattern: `.*(belfast|northern ireland|ni\s).*`
   - Matches queries containing: "belfast", "northern ireland", "ni " (with space to avoid "initial", "minute", etc.)
4. Click **Apply**
5. Save filter as: **Belfast Queries**

**Filter 3: Combined Belfast View**
1. Create new tab
2. Add **both** filters: Belfast Pages OR Belfast Queries
3. Save as: **All Belfast Traffic**

### Step 3: Configure Email Notifications

1. Go to **Settings** (gear icon top right)
2. Click **Users and permissions**
3. Verify your email is listed
4. Click **Open Search Console Message Preferences**
5. Enable notifications for:
   - ✅ **Critical issues** (indexing errors, security)
   - ✅ **New issues** (coverage problems)
   - ✅ **Manual actions** (Google penalties)
   - ✅ **News** (important Search updates)

**Recommendation:** Enable all notifications. You can always unsubscribe if volume is too high.

### Step 4: Link GSC to Google Analytics 4

**Why:** Enables viewing search query data directly in GA4 reports.

1. Open GA4: https://analytics.google.com
2. Go to **Admin** (gear icon bottom left)
3. In **Property** column, click **Product Links**
4. Click **Search Console Links**
5. Click **Link** button
6. Select your Search Console property: `roseyco.com`
7. Click **Next** → **Next** → **Submit**
8. Verify link appears as **Connected**

**Test:** After 24 hours, check GA4 → **Acquisition** → **Search Console** report appears.

### Step 5: URL Inspection for Key Belfast Pages

Monitor indexing status of critical Belfast pages:

1. Go to **URL Inspection** tool (search icon top)
2. Enter URL: `https://roseyco.com/uk/belfast/`
3. Check status:
   - ✅ **URL is on Google** = indexed successfully
   - ⚠️ **URL is not on Google** = request indexing
4. Repeat for:
   - `/uk/seo-belfast/`
   - `/uk/social-media-belfast/`
   - `/uk/paid-ads-belfast/`
   - `/uk/website-design-belfast/`

**If not indexed:** Click **Request Indexing** (quota: ~10 requests/day).

---

## 3. GA4 Custom Event Configuration

Configure phone calls, form submissions, and direction requests as conversion events.

### Prerequisites

**Events must fire at least once before appearing in GA4.** If you haven't triggered events yet:

1. Visit `/uk/belfast/` page
2. Click phone number link (fires `phone_call_click`)
3. Click "Get Directions" button (fires `direction_request`)
4. Submit contact form (fires `form_submission`)

Events appear in GA4 within 24 hours of first trigger.

### Step 1: Navigate to Events Section

1. Open GA4: https://analytics.google.com
2. Go to **Admin** (gear icon bottom left)
3. In **Property** column, click **Events**

### Step 2: Mark Events as Conversions

**For each event: phone_call_click, form_submission, direction_request**

1. Locate event in list (may need to wait 24 hours after first trigger)
2. Toggle the **Mark as conversion** slider to ON (blue)
3. Verify checkmark appears under **Conversions** column

**If event doesn't appear yet:**
- Wait 24 hours after first trigger
- Check **Realtime** report → **Event count by Event name** to verify event is firing
- Troubleshoot tracking code if event doesn't fire

### Step 3: Create Belfast Visitors Audience (Optional but Recommended)

**Why:** Filter reports to show only Belfast-related traffic.

1. Go to **Admin** → **Audiences**
2. Click **New Audience** → **Create a custom audience**
3. Name: `Belfast Visitors`
4. Add condition: **Event → page_view**
5. Add parameter filter: **page_path** → **matches regex** → `.*\/uk\/belfast.*|.*\/uk\/.*-belfast.*`
6. Click **Save**

**Use audience to:**
- Filter conversion reports to Belfast traffic only
- Track Belfast user behavior patterns
- Compare Belfast visitors vs other locales

### Step 4: Verify Conversion Tracking

After marking events as conversions:

1. Go to **Reports** → **Engagement** → **Conversions**
2. Verify these conversions appear:
   - `phone_call_click`
   - `form_submission`
   - `direction_request`
3. Check conversion count updates when events fire

**Expected behavior:** Each time a user clicks phone number, submits form, or requests directions, conversion count increments.

---

## 4. Looker Studio Dashboard Template

Visual dashboard combining GSC, GA4, and GBP data in single view.

### Dashboard Access

**Create dashboard:** https://lookerstudio.google.com

### Dashboard Structure (5 Sections)

#### Section 1: Executive Overview (Scorecards)

Single row of 5 scorecards showing key metrics at a glance.

| Scorecard | Data Source | Metric | Comparison |
|-----------|-------------|--------|------------|
| **Total Belfast Impressions** | GSC | Impressions (Belfast Queries filter) | Last 28 days vs prior 28 days |
| **Total Belfast Clicks** | GSC | Clicks (Belfast Queries filter) | Last 28 days vs prior 28 days |
| **Average Position** | GSC | Average Position (Belfast Queries filter) | Last 28 days (no comparison) |
| **Phone Call Clicks** | GA4 | Event Count (phone_call_click) | Last 28 days vs prior 28 days |
| **Form Submissions** | GA4 | Event Count (form_submission) | Last 28 days vs prior 28 days |

**Styling:**
- Green color for increases, red for decreases
- Large number display (48px font)
- Percentage change below number (+15%, -8%, etc.)

#### Section 2: Search Performance (2 Charts)

**Chart 2.1: Belfast Impressions + Clicks Over Time (Line Chart)**
- **Data Source:** Google Search Console
- **Date Range:** Last 90 days
- **Dimensions:** Date
- **Metrics:** Impressions (blue line), Clicks (green line)
- **Filters:** Belfast Queries filter applied
- **Chart Type:** Time series line chart
- **Y-axis:** Dual axis (Impressions on left, Clicks on right)

**Chart 2.2: Top 20 Belfast Queries (Table)**
- **Data Source:** Google Search Console
- **Date Range:** Last 28 days
- **Dimensions:** Query
- **Metrics:** Impressions, Clicks, CTR, Position
- **Sort:** Impressions descending
- **Row limit:** 20
- **Filters:** Belfast Queries filter applied

#### Section 3: Traffic Analysis (2 Charts)

**Chart 3.1: Belfast Page Sessions Over Time (Line Chart)**
- **Data Source:** Google Analytics 4
- **Date Range:** Last 90 days
- **Dimensions:** Date
- **Metric:** Sessions
- **Filter:** Landing Page matches regex `.*\/uk\/belfast.*|.*\/uk\/.*-belfast.*`
- **Chart Type:** Time series line chart

**Chart 3.2: Top 10 Belfast Pages by Sessions (Bar Chart)**
- **Data Source:** Google Analytics 4
- **Date Range:** Last 28 days
- **Dimensions:** Landing Page
- **Metric:** Sessions
- **Sort:** Sessions descending
- **Row limit:** 10
- **Filter:** Landing Page matches regex `.*\/uk\/belfast.*|.*\/uk\/.*-belfast.*`
- **Chart Type:** Horizontal bar chart

#### Section 4: Conversions (2 Charts)

**Chart 4.1: Conversion Events Over Time (Stacked Bar)**
- **Data Source:** Google Analytics 4
- **Date Range:** Last 90 days
- **Dimensions:** Date, Event Name
- **Metric:** Event Count
- **Filter:** Event Name in (phone_call_click, form_submission, direction_request)
- **Chart Type:** Stacked bar chart (shows 3 event types stacked per day)
- **Colors:** phone_call_click (blue), form_submission (green), direction_request (orange)

**Chart 4.2: Conversion Events by Page and Source (Table)**
- **Data Source:** Google Analytics 4
- **Date Range:** Last 28 days
- **Dimensions:** Landing Page, Session Source/Medium, Event Name
- **Metric:** Event Count
- **Filter:** Event Name in (phone_call_click, form_submission, direction_request)
- **Sort:** Event Count descending
- **Purpose:** Shows which pages and traffic sources drive conversions

#### Section 5: Content Performance (1 Chart)

**Chart 5.1: All Belfast Content Performance (Table)**
- **Data Source:** Google Analytics 4
- **Date Range:** Last 28 days
- **Dimensions:** Landing Page
- **Metrics:** Sessions, Average Session Duration, Bounce Rate
- **Filter:** Landing Page matches regex `.*\/uk\/belfast.*|.*\/uk\/.*-belfast.*`
- **Sort:** Sessions descending
- **Conditional Formatting:**
  - Sessions: Green gradient (higher = greener)
  - Bounce Rate: Red if > 60%, green if < 40%
  - Avg Session Duration: Green if > 120 seconds (2 min)

### Data Source Connection Instructions

**Step 1: Add Google Search Console Connector**

1. Click **Add Data** in Looker Studio
2. Search for **Search Console** connector
3. Select **Site Impression** table (not URL Impression)
4. Authorize Google account with Search Console access
5. Select property: `https://roseyco.com/`
6. Click **Add**

**Step 2: Add Google Analytics 4 Connector**

1. Click **Add Data**
2. Search for **Google Analytics** connector
3. Select **Google Analytics 4** (not Universal Analytics)
4. Authorize Google account with GA4 access
5. Select property: **Rosey Co Website** (your GA4 property name)
6. Click **Add**

**Step 3: Create Calculated Field for Belfast Filtering**

For GA4 data source only (GSC uses saved filters):

1. Click on GA4 data source
2. Click **Add a Field** (calculator icon)
3. Name: `Is Belfast Page`
4. Formula:
   ```
   REGEXP_MATCH(LOWER(Landing Page), '.*\\/uk\\/belfast.*|.*\\/uk\\/.*-belfast.*')
   ```
5. Click **Save**
6. Click **Done**

**Use calculated field:** Add as filter to charts (Is Belfast Page = TRUE).

### Sharing & Collaboration

**View-only link for team:**
1. Click **Share** button (top right)
2. Select **Get shareable link**
3. Set permissions: **Anyone with link can view**
4. Copy link and share with team

**Edit access for specific users:**
1. Click **Share** → **Manage access**
2. Enter email addresses
3. Set role: **Can edit** or **Can view**

**Schedule email reports (optional):**
1. Click **Share** → **Schedule delivery**
2. Set frequency: Weekly or Monthly
3. Add recipient email addresses
4. Click **Save**

---

## 5. Microsoft Clarity Setup

Free heatmap and session recording tool to understand Belfast visitor behavior.

### Step 1: Create Clarity Project

1. Navigate to: https://clarity.microsoft.com
2. Sign in with Microsoft account (create free account if needed)
3. Click **Add new project**
4. Enter details:
   - **Project name:** Rosey Co Belfast
   - **Website URL:** https://roseyco.com
5. Click **Create project**

### Step 2: Get Project ID

1. After creation, copy **Project ID** (format: `abcdefghij`)
2. Add to `.env.local` file:
   ```
   NEXT_PUBLIC_CLARITY_ID=abcdefghij
   ```
3. Clarity tracking script should auto-load (if integrated in site `<head>`)

**Note:** If not already integrated, add Clarity script to `app/layout.tsx`:

```typescript
<Script id="microsoft-clarity" strategy="afterInteractive">
  {`
    (function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, "clarity", "script", "${process.env.NEXT_PUBLIC_CLARITY_ID}");
  `}
</Script>
```

### Step 3: Set Up Belfast Page Filters in Clarity

1. In Clarity dashboard, click **Settings** → **Filters**
2. Create filter: **Belfast Pages Only**
   - **Visited URL** → **contains** → `/uk/belfast`
3. Save filter
4. Apply filter when viewing recordings/heatmaps

### Step 4: Key Heatmap Pages to Monitor

Prioritize heatmap analysis for:

1. **`/uk/belfast/`** - Location page (shows where users click for services)
2. **`/uk/contact/`** - Contact page (form field interactions, drop-off points)
3. **`/uk/seo-belfast/`** - SEO pillar (scroll depth, CTA clicks)
4. **`/uk/social-media-belfast/`** - Social pillar (engagement patterns)

**What to analyze:**
- **Click heatmaps:** Where users click most (CTAs, phone numbers, navigation)
- **Scroll heatmaps:** How far users scroll (content engagement depth)
- **Session recordings:** Watch actual user sessions to identify friction points

**Action on insights:**
- High clicks on non-clickable elements → Make them clickable or remove visual affordance
- Low scroll depth → Move important content higher on page
- Form abandonment → Simplify form fields or clarify requirements

---

## 6. Budget-Phase Tool Recommendations

Strategic tool adoption based on revenue milestones.

| Revenue Stage | Monthly Revenue | Client Count | Recommended Tools | Monthly Cost | Why Upgrade Now |
|---------------|-----------------|--------------|-------------------|--------------|-----------------|
| **Pre-Revenue** | £0 | 0 | GSC + GA4 + GBP Insights + Looker Studio + Clarity | £0 | All tools free, full visibility into Belfast performance |
| **First Client** | £500-1,500 | 1 | Add BrightLocal Track | +£39/mo | Local pack position tracking, citation monitoring, competitive intel. Pays for itself with one client. |
| **2-3 Clients** | £1,500-3,000 | 2-3 | Add SEMrush Guru | +£199/mo | Competitor keyword tracking, backlink analysis, position tracking for 500 keywords. Revenue justifies cost. |
| **3-5 Clients** | £3,000-7,000 | 3-5 | Add Local Falcon | +£24.99/mo credits | Geo-grid heatmaps, visualize local pack rankings across Belfast geographic area. |
| **5+ Clients** | £7,000+ | 5+ | Add AgencyAnalytics | +£99/mo | White-label client reporting, client dashboards, automated reports. Agency positioning. |

### Tool Justification Details

**BrightLocal ($39/mo Track plan):**
- **When:** After first Belfast client
- **Why:**
  - Local pack position tracking (critical for "near me" searches = 46% of Belfast queries)
  - Citation monitoring across 35+ directories
  - Competitor local pack tracking (Digital 24, VINDICTA, SEO NI)
  - Review monitoring and alerts
- **ROI:** One £1,500/month client covers this 38x over

**SEMrush ($199/mo Guru plan):**
- **When:** After 2-3 clients (£1,500-3,000/month revenue)
- **Why:**
  - Track 500 keywords (vs free tools limit of 10-20)
  - Competitor keyword gap analysis
  - Backlink monitoring and outreach targets
  - Content optimization recommendations
- **ROI:** One £1,500/month client covers this 7.5x over
- **Alternative:** Ahrefs ($199/mo) offers similar features, choose based on preference

**Local Falcon ($24.99/mo credits):**
- **When:** After 3-5 clients or when defending competitive rankings
- **Why:**
  - Geo-grid visualization (see exactly where you rank across Belfast)
  - SOLV metric (Share of Local Voice = % of time in top 3 results)
  - Heatmap shows ranking gaps by neighborhood
- **ROI:** Critical when managing multi-location or high-stakes local campaigns
- **Skip if:** Single Belfast location with stable rankings

**AgencyAnalytics ($99/mo):**
- **When:** After 5+ clients or when client reporting becomes time-consuming
- **Why:**
  - White-label dashboards (your branding, not Google's)
  - Client-facing reports auto-generated
  - Multi-client management from single dashboard
  - Professional appearance for agency positioning
- **ROI:** Saves 2-4 hours/month on manual reporting
- **Skip if:** You prefer Looker Studio and manual reports

### Free Alternatives to Paid Tools

If budget is constrained even with client revenue:

| Instead of | Use Free Alternative | Tradeoff |
|------------|---------------------|----------|
| BrightLocal | Manual GBP monitoring + Google Rank Checker | No automation, no citation tracking, manual checking |
| SEMrush | Google Keyword Planner + Ubersuggest free | Limited keyword data, no competitor tracking |
| Local Falcon | Manual incognito searches from different locations | Extremely time-consuming, imprecise |
| AgencyAnalytics | Looker Studio + manual PDF exports | Works but not white-labeled, manual process |

**Recommendation:** Start free, upgrade strategically as revenue allows. Don't pay for tools until client revenue justifies cost.

---

## Dashboard Review Cadence

**Weekly (15 minutes):**
- Check Executive Overview scorecards for anomalies
- Review new Belfast queries appearing in GSC
- Verify conversion events are firing (Realtime report)

**Monthly (45 minutes):**
- Analyze Top 20 Belfast Queries for opportunities
- Review traffic trends (up/down, seasonality)
- Check conversion rate changes
- Export screenshots for records

**Quarterly (2 hours):**
- Deep dive into content performance
- Compare current quarter vs previous quarter
- Identify winning content (create more like it)
- Identify underperforming content (optimize or deprioritize)

---

## Common Dashboard Issues & Solutions

**Issue 1: GSC data missing in Looker Studio**

**Symptoms:** Charts show "No data" or "Data unavailable"

**Solutions:**
1. Verify GSC property is verified and active
2. Check filter syntax in Looker Studio (regex errors break queries)
3. Confirm date range has data (new site may have < 90 days history)
4. Re-authorize GSC connector (click data source, **Reconnect**)

**Issue 2: GA4 events not showing as conversions**

**Symptoms:** Events appear in Events report but missing from Conversions report

**Solutions:**
1. Verify event is marked as conversion (Admin → Events → toggle)
2. Wait 24 hours for conversion data to populate
3. Check event name exact match (case-sensitive: `phone_call_click` not `Phone_Call_Click`)
4. Verify event is actually firing (check Realtime report)

**Issue 3: Belfast filter not capturing all Belfast pages**

**Symptoms:** Known Belfast pages missing from filtered reports

**Solutions:**
1. Check regex syntax: `.*\/uk\/belfast.*|.*\/uk\/.*-belfast.*`
2. Verify page path structure matches pattern
3. Test regex at regex101.com with sample URLs
4. Add additional patterns if URL structure differs

**Issue 4: Looker Studio dashboard loading slowly**

**Symptoms:** Dashboard takes 30+ seconds to load, times out

**Solutions:**
1. Reduce date range (90 days → 30 days)
2. Simplify charts (remove complex calculated fields)
3. Use summary cards instead of detailed tables
4. Split into multiple dashboards if too complex

---

## Next Steps After Setup

1. **Validate tracking:** Visit Belfast pages, trigger events, verify they appear in Realtime reports
2. **Baseline metrics:** Record current numbers (even if zero) for comparison
3. **Set calendar reminders:** Weekly review (Monday 9am), Monthly review (1st Monday)
4. **Create monitoring playbook:** Document alert response procedures (see `belfast-monitoring-playbook.md`)
5. **Share dashboard:** Give view access to team members, stakeholders
6. **Plan first monthly review:** Schedule 45 minutes to analyze first month's data

---

## Resources & Links

**Official Documentation:**
- [Google Search Console Help](https://support.google.com/webmasters/)
- [Google Analytics 4 Help](https://support.google.com/analytics/)
- [Google Business Profile Help](https://support.google.com/business/)
- [Looker Studio Help](https://support.google.com/looker-studio/)
- [Microsoft Clarity Documentation](https://docs.microsoft.com/en-us/clarity/)

**Tool Sign-Up Links:**
- GSC: https://search.google.com/search-console
- GA4: https://analytics.google.com
- GBP: https://business.google.com
- Looker Studio: https://lookerstudio.google.com
- Clarity: https://clarity.microsoft.com

**Paid Tools (when ready to upgrade):**
- BrightLocal: https://www.brightlocal.com/pricing/
- SEMrush: https://www.semrush.com/pricing/
- Local Falcon: https://www.localfalcon.com/pricing
- AgencyAnalytics: https://agencyanalytics.com/pricing

---

**End of Dashboard Specification**

*Next document: Belfast Monitoring Playbook (alert responses, review checklists, competitive tracking)*

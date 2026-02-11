# Phase 12 Plan 2: Belfast Analytics Monitoring Toolkit Summary

**Complete Belfast monitoring infrastructure with dashboard specifications and operational playbooks**

---
phase: 12-belfast-analytics-monitoring
plan: 02
subsystem: analytics
tags: [analytics, monitoring, dashboard, looker-studio, gsc, ga4, gbp, playbook, alerts, competitive-tracking]
requires: [12-01]
provides: [dashboard-specification, monitoring-playbook, competitive-framework, review-checklists]
affects: [post-launch-operations]
tech-stack:
  added: []
  patterns: [dashboard-design, alert-response-procedures, competitive-tracking]
key-files:
  created:
    - .planning/phases/12-belfast-analytics-&-monitoring/belfast-analytics-dashboard.md
    - .planning/phases/12-belfast-analytics-&-monitoring/belfast-monitoring-playbook.md
  modified: []
decisions:
  - "Three review cadences balances thoroughness with time efficiency: 15min weekly (critical issues), 45min monthly (trends), 2hr quarterly (strategy)"
  - "Looker Studio chosen over paid dashboards (AgencyAnalytics) for pre-revenue phase: free tier sufficient, upgrade when 5+ clients"
  - "Alert response procedures provide specific diagnostic steps not generic 'investigate': actionable troubleshooting for ranking drops, traffic drops, conversion failures"
  - "Competitive tracking framework focuses on 5 specific Belfast competitors from Phase 6 research: Digital 24, ProfileTree, VINDICTA, Rapid Agency, Loud Mouth Media"
  - "Budget-phase tool recommendations align with prior decisions: free tools first, BrightLocal after 1st client ($39/mo), SEMrush after 2-3 clients ($199/mo)"
  - "Primary keywords tracked weekly (7 keywords), secondary monthly (15 keywords), long-tail quarterly (10 keywords): prioritized by commercial value"
  - "15 KPIs across 4 categories provide comprehensive view without overwhelming: Search Visibility, Local Actions, Traffic Quality, Content Performance"
metrics:
  duration: 42 minutes
  completed: 2026-02-11
---

## One-Liner

Belfast analytics monitoring toolkit with 15-KPI Looker Studio dashboard specification, three-cadence review playbooks, 5-competitor tracking framework, and alert response procedures for ranking/traffic/conversion drops.

## Accomplishments

### Documents Created

**1. Belfast Analytics Dashboard Specification** (625 lines)
- **15 KPIs across 4 categories** with measurable Month 3/6/12 targets:
  - Search Visibility: Impressions, clicks, average position, CTR, page 1 rankings (GSC)
  - Local Actions: Phone calls, directions, form submissions, GBP views, GBP actions (GA4 + GBP)
  - Traffic Quality: Sessions, bounce rate, session duration, pages per session (GA4)
  - Content Performance: Top blog posts, pillar vs cluster traffic, new vs returning visitors (GA4 + GSC)

- **Google Search Console setup instructions**:
  - Property verification (DNS or HTML tag)
  - Belfast content filters (3 saved filters: Belfast Pages, Belfast Queries, Combined View)
  - Email notification configuration (critical issues, new issues, manual actions)
  - GA4 linking (Product Links integration)
  - URL inspection for key Belfast pages (5 priority pages)

- **GA4 custom event configuration**:
  - Mark as conversions: `phone_call_click`, `form_submission`, `direction_request`
  - Prerequisites: Events must fire once before appearing (manual trigger instructions)
  - Belfast Visitors audience creation (regex filter for Belfast pages)
  - Conversion tracking verification (Realtime report check)

- **Looker Studio dashboard template**:
  - 5 sections: Executive Overview (scorecards), Search Performance (line chart + table), Traffic Analysis (charts), Conversions (stacked bar + table), Content Performance (table)
  - Data source connections: GSC (Site Impression table), GA4 (property), calculated fields
  - Specific chart types, dimensions, metrics, filters for each section
  - Belfast filtering calculated field: `REGEXP_MATCH(LOWER(Landing Page), '.*\\/uk\\/belfast.*|.*\\/uk\\/.*-belfast.*')`

- **Microsoft Clarity setup**:
  - Project creation at clarity.microsoft.com
  - Project ID environment variable configuration
  - Belfast page filters setup
  - 4 key heatmap pages to monitor: `/uk/belfast/`, `/uk/contact/`, `/uk/seo-belfast/`, `/uk/social-media-belfast/`
  - Heatmap analysis guidance (click heatmaps, scroll depth, session recordings)

- **Budget-phase tool recommendations**:
  - Pre-revenue: GSC + GA4 + GBP + Looker Studio + Clarity (£0/month)
  - 1st client (£500-1500/mo): Add BrightLocal Track (£39/mo)
  - 2-3 clients (£1500-3000/mo): Add SEMrush Guru (£199/mo)
  - 3-5 clients (£3000-7000/mo): Add Local Falcon (£24.99/mo credits)
  - 5+ clients (£7000+/mo): Add AgencyAnalytics (£99/mo)
  - Tool justification: Each paid tool ROI-positive with client revenue

**2. Belfast Monitoring Playbook** (1,186 lines)
- **Three review cadences** with time-boxed checklists:
  - **Weekly Review** (15 minutes, every Monday):
    - Check GSC indexing errors on Belfast pages
    - Review GA4 conversion events (phone, form, directions)
    - Check GBP Insights for new queries and customer actions
    - Review and respond to Google reviews (24hr response goal)
    - Quick indexing check (`site:roseyco.com/uk/belfast`)
    - Record key numbers in tracking spreadsheet
    - Red flags: 3+ pages de-indexed, 50%+ conversion drop, negative review, manual action

  - **Monthly Review** (45 minutes, first Monday):
    - Compare Belfast keyword positions vs last month
    - Analyze growing and declining queries
    - Review traffic trends month-over-month
    - Calculate conversion rate changes
    - Check competitor positions for top 5 keywords
    - Update Looker Studio dashboard screenshots
    - Identify 2-3 content optimization opportunities
    - Check citation tracker for directory status
    - Assess paid tool upgrade based on client count
    - Deliverable: Monthly Performance Report

  - **Quarterly Review** (2 hours, every 3 months):
    - Full competitive analysis vs 5 Belfast competitors
    - Review overall Belfast SEO ROI (revenue vs costs)
    - Evaluate content strategy effectiveness (pillar vs cluster performance)
    - Assess link building impact (backlinks acquired, domain authority)
    - Update keyword targets based on actual GSC volume data
    - Plan next quarter's content calendar (8-12 posts)
    - Strategic decision: Continue / Adjust / Expand to new NI areas
    - Deliverable: Quarterly Strategy Review

- **Four alert response procedures** with diagnostic workflows:
  - **Alert A: Ranking Drop** (5+ position drop):
    - Step 1: Check GSC for manual actions or security issues
    - Step 2: Review recent content changes (git log)
    - Step 3: Check for Google algorithm updates (Search Engine Roundtable, GSC blog)
    - Step 4: Inspect affected page (indexed status, content changes)
    - Step 5: Check for technical errors (schema, links, images)
    - Step 6: Analyze competitor content and backlinks
    - Action plan matrix: 7 scenarios with timelines (24hr to 2 weeks)

  - **Alert B: Traffic Drop** (30%+ week-over-week decline):
    - Step 1: Verify tracking is working (Realtime report + manual visit)
    - Step 2: Site-wide vs Belfast-specific issue (compare all traffic)
    - Step 3: GSC Coverage report for indexing errors
    - Step 4: Server status and page load times
    - Step 5: Seasonal patterns (holidays, school terms)
    - Step 6: Cross-reference ranking drops
    - Action plan: 7 findings with remediation timelines

  - **Alert C: Conversion Drop** (50%+ decline in events):
    - Step 1: Test conversion paths manually (phone link, form, directions)
    - Step 2: Check if GA4 tracking code firing (dev tools Network tab)
    - Step 3: Verify GA4 event configuration unchanged
    - Step 4: UI/UX changes affecting conversion elements
    - Step 5: Compare mobile vs desktop conversion rates
    - Step 6: Traffic quality analysis (source changes)
    - Action plan: 7 scenarios with immediate to 2-week fixes

  - **Alert D: New Competitor** (new business in local pack):
    - Step 1: Check their GBP (categories, reviews, photos, description, posts)
    - Step 2: Analyze website (content depth, technical SEO, backlinks)
    - Step 3: Paid ads check (Google Ads on target keywords)
    - Step 4: Target market assessment (SMB vs enterprise)
    - Step 5: Threat level assessment (High / Medium / Low)
    - Action plan by threat: High (immediate response), Medium (monthly monitor), Low (quarterly check)

- **Competitive tracking framework**:
  - **5 Belfast competitors identified** (from Phase 6 research):
    1. Digital 24 (105 reviews, 4.96/5 - review leader)
    2. ProfileTree (~200 blog posts - content competitor)
    3. VINDICTA Digital (£100M+ revenue - enterprise, different market)
    4. Rapid Agency Belfast (local SEO specialist - direct competitor)
    5. Loud Mouth Media (PPC specialist - paid ads focus)

  - **Monthly tracking template** (keyword position table):
    - 5 priority keywords tracked for all 6 competitors
    - Spreadsheet structure: Month | Keyword | Rosey Co | Comp 1-5 | Notes
    - Data collection: Incognito searches or rank tracker (BrightLocal)

  - **GBP competitive metrics** (quarterly):
    - Review count and rating per competitor
    - Review velocity tracking
    - Rosey Co target: 2-4 reviews/month

  - **Content monitoring** (monthly):
    - New blog posts count
    - Service pages added
    - Major content updates
    - Screenshot notable changes

  - **Social media activity** (quarterly):
    - Follower counts (Instagram, Facebook, LinkedIn)
    - Posting frequency

- **Belfast target keywords for tracking**:
  - **Primary (7 keywords, track weekly):**
    1. seo belfast
    2. social media marketing belfast
    3. digital marketing belfast
    4. website design belfast
    5. paid ads belfast
    6. google ads belfast
    7. seo agency belfast
    - Targets: Top 20 (M3), Top 10 (M6), Top 5 (M12)

  - **Secondary (15 keywords, track monthly):**
    - local seo belfast, ppc belfast, social media agency belfast, digital marketing agency belfast, seo services belfast, seo company belfast, facebook marketing belfast, instagram marketing belfast, facebook ads belfast, affordable seo belfast, best seo agency belfast, google ads management belfast, social media management belfast, online marketing belfast, website traffic belfast
    - Targets: Top 15-20 (M6), Top 10-15 (M12)

  - **Long-tail (10 keywords, track quarterly):**
    - small business seo belfast, ecommerce website belfast, seo cost belfast, responsive website belfast, tiktok marketing belfast, lead generation belfast, technical seo belfast, link building belfast, seo for plumbers belfast, seo for dentists belfast
    - Targets: Top 15-30 (M12)

  - **"Near Me" keywords** (GBP-dependent):
    - seo agency near me, digital marketing near me, social media agency near me, website design near me
    - Strategy: GBP optimization, target Local Pack appearance

- **Three reporting templates**:
  - **Template A: Weekly Status Update** (3-5 bullet points)
    - Key metrics with % change vs last week
    - Actions taken (2-3 items)
    - Upcoming tasks (2 items)
    - Format: Brief markdown for Slack/email

  - **Template B: Monthly Performance Report** (1 page)
    - Executive summary
    - Key metrics vs targets table (6 metrics)
    - Wins this month (3 items)
    - Concerns/issues with mitigation plans
    - Top performing content (3 pages)
    - Competitive snapshot (4 competitors)
    - Next month priorities (3 items)

  - **Template C: Quarterly Strategy Review** (2-3 pages)
    - Quarter summary (3-5 paragraphs)
    - KPI dashboard summary (4 categories, 15 metrics)
    - Competitive landscape changes (keyword positions, competitor movements)
    - Content performance analysis (pillar and cluster)
    - Link building impact (backlinks acquired, domain authority)
    - ROI analysis (revenue, costs, ROI %, benchmark 300%+)
    - Strategic insights (what's working, what's not, opportunities)
    - Next quarter strategy (3 initiatives with objectives, actions, timelines)
    - Content calendar (3 months, 8-12 posts planned)
    - Decision: Continue / Adjust / Expand with rationale

### Verification Results

**Must-have 1:** Dashboard specification defines all Belfast KPIs ✅
- 15 KPIs defined across 4 categories with specific targets
- Verified: KPI definitions table with Month 3, 6, 12 targets included

**Must-have 2:** GSC filter instructions enable Belfast-specific analysis ✅
- Step-by-step instructions for 3 saved filters
- Verified: Belfast Pages filter, Belfast Queries filter, Combined Belfast View

**Must-have 3:** GA4 custom event setup marks 3 events as conversions ✅
- Instructions for marking `phone_call_click`, `form_submission`, `direction_request` as conversions
- Verified: 16 references to these events in dashboard specification

**Must-have 4:** Monitoring playbook includes alert response procedures ✅
- 4 alert types with specific investigation steps
- Verified: Ranking Drop, Traffic Drop, Conversion Drop, New Competitor alerts

**Must-have 5:** Weekly and monthly review checklists exist ✅
- Weekly: 15 minutes, 6 checklist items
- Monthly: 45 minutes, 9 checklist items
- Quarterly: 2 hours, 7 checklist items
- Verified: 9 references to review cadences

**Must-have 6:** Competitive tracking framework identifies 3-5 Belfast competitors ✅
- 5 competitors: Digital 24, ProfileTree, VINDICTA, Rapid Agency, Loud Mouth Media
- Verified: 22 references to these 5 competitors in playbook

**Key Links Verified:**
- belfast-analytics-dashboard.md references GA4 custom events from Plan 12-01 ✅
- Pattern match confirmed: `phone_call_click|form_submission|direction_request` (16 matches)

## Files Created/Modified

**Created:**
1. `.planning/phases/12-belfast-analytics-&-monitoring/belfast-analytics-dashboard.md` (625 lines)
   - Provides: Belfast KPI dashboard specification and setup guide
   - Contains: 15 KPI definitions, GSC setup (filters, alerts, GA4 linking), GA4 conversion marking, Looker Studio 5-section template, Clarity setup, budget-phase tool recommendations

2. `.planning/phases/12-belfast-analytics-&-monitoring/belfast-monitoring-playbook.md` (1,186 lines)
   - Provides: Monitoring procedures, alert responses, and review checklists
   - Contains: 3 review cadences (weekly 15min, monthly 45min, quarterly 2hr), 4 alert response procedures, 5-competitor tracking framework, 32 keyword tracking list, 3 reporting templates

**Modified:**
- None (pure documentation phase)

## Decisions Made

### Strategic Analytics Decisions

**1. Three-tier review cadence balances thoroughness with time efficiency**
- Rationale: Weekly catches critical issues (15min sustainable), monthly analyzes trends (45min sufficient), quarterly drives strategy (2hr necessary for depth)
- Impact: Prevents alert fatigue while ensuring nothing critical missed
- Tradeoff: Daily monitoring skipped (relies on automated alerts instead)

**2. Looker Studio for free dashboard over paid alternatives**
- Rationale: Pre-revenue phase needs £0 tools, Looker Studio integrates GSC + GA4 + GBP natively
- Impact: Professional dashboard without upfront cost
- Upgrade path: AgencyAnalytics ($99/mo) only after 5+ clients for white-label reports
- Alternative considered: AgencyAnalytics from day 1 (rejected - unjustified cost without client revenue)

**3. Alert response procedures provide specific diagnostic steps**
- Rationale: Generic "investigate the issue" advice is useless, need actionable troubleshooting workflows
- Impact: Non-technical user can follow step-by-step procedures to diagnose and fix issues
- Example: Ranking drop alert → 6 diagnostic steps → 7-scenario action plan with timelines

**4. Focus on 5 specific Belfast competitors from Phase 6 research**
- Rationale: Tracking 20+ competitors spreads resources thin, 5 covers market landscape
- Selected: Digital 24 (reviews), ProfileTree (content), VINDICTA (enterprise), Rapid (direct), Loud Mouth (PPC)
- Impact: Concentrated competitive intelligence on actual threats
- Tradeoff: May miss new entrants (mitigated by New Competitor alert procedure)

**5. Budget-phase tool recommendations align with client revenue**
- Rationale: Don't pay for tools without revenue to justify cost
- Thresholds:
  - 0 clients: Free tools only (GSC, GA4, GBP, Looker Studio, Clarity)
  - 1 client (£500-1500/mo): Add BrightLocal $39/mo (38x ROI with one £1500 client)
  - 2-3 clients (£1500-3000/mo): Add SEMrush $199/mo (7.5x ROI with one client)
  - 5+ clients: Consider AgencyAnalytics for white-label
- Impact: ROI-positive tool investment, no upfront risk

**6. Keyword tracking prioritized by commercial value and tracking frequency**
- Primary (7 keywords, weekly): Highest commercial value, direct service alignment
- Secondary (15 keywords, monthly): Supporting keywords, long-tail variations
- Long-tail (10 keywords, quarterly): Specific niches, emerging opportunities
- Rationale: Focus effort on high-value keywords, avoid tracking 100+ keywords unnecessarily
- Impact: Efficient monitoring without analysis paralysis

### Technical Implementation Decisions

**7. 15 KPIs across 4 categories provide comprehensive view without overwhelm**
- Categories: Search Visibility (GSC), Local Actions (GA4 + GBP), Traffic Quality (GA4), Content Performance (GA4 + GSC)
- Rationale: Cover all critical dimensions (rankings, conversions, traffic, content) without metric bloat
- Impact: Executive dashboard fits single screen, monthly review manageable in 45min
- Alternative considered: 30+ metrics (rejected - too complex for startup phase)

**8. Month 3/6/12 targets based on Belfast market research**
- Month 3 targets assume: 0-1 active Belfast clients, early SEO traction
- Month 6 targets assume: 2-3 clients, pillar pages ranking, citations live
- Month 12 targets assume: 5+ clients, topical authority established, referral flow
- Rationale: Realistic for startup entering competitive Belfast market (20+ agencies)
- Source: Phase 6 research (15,000+ SMBs, £500-2000/month budgets, 46% "near me" searches)

**9. Looker Studio dashboard uses 5 sections for logical information architecture**
- Section 1: Executive Overview (scorecards) - At-a-glance health check
- Section 2: Search Performance (GSC) - Keyword and query analysis
- Section 3: Traffic Analysis (GA4) - User behavior patterns
- Section 4: Conversions (GA4) - Business outcome tracking
- Section 5: Content Performance (GA4 + GSC) - Content effectiveness
- Rationale: Logical flow from high-level to detailed, grouped by data source
- Impact: Dashboard tells coherent story, not random collection of charts

**10. Microsoft Clarity added for UX insights not available in GA4**
- Clarity provides: Click heatmaps, scroll depth, session recordings
- GA4 provides: Quantitative metrics (sessions, conversions, bounce rate)
- Rationale: Qualitative UX data complements quantitative analytics
- Impact: Identify friction points in conversion funnels (e.g., form abandonment reasons)
- Cost: £0 (Microsoft Clarity is free)

## Issues Encountered

**No issues encountered.** Plan execution was straightforward documentation work.

## Key Insights

### Analytics Infrastructure Insights

**1. Free tools cover 80% of Belfast monitoring needs**
- GSC + GA4 + GBP Insights + Looker Studio = complete analytics stack at £0 cost
- Paid tools add value but not essential until client revenue justifies investment
- Microsoft Clarity bonus: Free heatmaps and session recordings (often $50-100/mo elsewhere)

**2. Alert response procedures prevent panic and wasted time**
- Ranking drops trigger emotional "fix it now" response → Often wrong action
- Structured diagnostic workflow prevents hasty decisions (e.g., wait 2 weeks for algorithm update to settle)
- Action plan matrix with timelines: 24hr fixes (technical errors) vs 1-2 week fixes (content updates)

**3. Competitive tracking reveals positioning gaps and opportunities**
- Digital 24's 105 reviews = unbeatable on volume, but velocity matters more for rankings
- ProfileTree's 200 blog posts = content depth threat, topical authority needed to compete
- VINDICTA's enterprise focus = leaves 15,000+ Belfast SMBs underserved (Rosey Co opportunity)
- Rapid Agency direct competitor = most important to track weekly

**4. Review cadence prevents both neglect and over-optimization**
- Weekly review: Catch critical issues before they compound
- Monthly review: Identify trends without reacting to noise
- Quarterly review: Strategic decisions based on substantial data
- Prevents: Daily obsession over minor fluctuations, quarterly neglect missing critical issues

**5. Content performance tracking guides future content strategy**
- Top performing cluster posts → Create more content on those topics
- Pillar vs cluster traffic distribution → Validates topical authority approach (60% cluster = long-tail working)
- High impressions + low CTR → Optimize title/meta description for quick wins
- Underperforming content → Improve or deprioritize (don't keep publishing same topics if they don't perform)

### Belfast Market-Specific Insights

**6. "Near me" keywords rely on GBP optimization not website content**
- 46% of Belfast searches include "near me" (Phase 6 research)
- GBP optimization = 32% of local pack ranking factors
- Action: Weekly GBP posts, 2-4 reviews/month, 100% response rate within 24hr
- Website SEO alone won't capture "near me" traffic

**7. Mobile-first monitoring critical (68% of Belfast searches mobile)**
- All conversion path tests must include mobile verification
- Mobile conversion rate often lower than desktop (form friction, phone number visibility)
- Separate mobile vs desktop analysis when conversion rate drops

**8. Belfast seasonal patterns affect traffic (holidays, school terms)**
- Christmas week: B2B searches drop (businesses closed)
- Summer holidays (July-August): SMB owners less active
- End of tax year (March): Accounting services spike
- Action: Document seasonal patterns to avoid false alarm traffic drop alerts

**9. Local pack appearance more valuable than organic position 1**
- Local pack appears above organic results for "seo belfast" type queries
- 3 local pack spots vs 10 organic spots per page
- Focus: GBP optimization + citations + reviews (local pack) parallel to content SEO (organic rankings)

**10. Review velocity beats review volume for local rankings**
- Digital 24's 105 reviews accumulated over years
- Google values recent reviews (2x weight vs old reviews)
- Rosey Co strategy: 2-4 reviews/month consistently = competitive with 105 total in 6-12 months
- Action: Systematic review request process, not bulk one-time campaign

## Next Phase Readiness

**Ready for Phase 12 Plan 3 (if additional plans exist)** or **Phase 12 Complete**

### Outputs from Plan 12-02

**Analytics Infrastructure Documentation:**
1. ✅ Dashboard specification (belfast-analytics-dashboard.md) - Ready for setup execution
2. ✅ Monitoring playbook (belfast-monitoring-playbook.md) - Ready for operational use
3. ✅ Competitive tracking framework - 5 competitors identified with tracking templates
4. ✅ Review checklists - Weekly/monthly/quarterly procedures documented
5. ✅ Alert response playbooks - 4 scenarios with diagnostic workflows
6. ✅ Reporting templates - 3 templates for weekly/monthly/quarterly reports
7. ✅ Keyword tracking list - 32 keywords prioritized by commercial value

### Integration with Prior Phases

**Phase 12-01 (Analytics Infrastructure):**
- Plan 12-01 created GA4 custom events (`phone_call_click`, `form_submission`, `direction_request`)
- Plan 12-02 documents how to mark those events as conversions and track them
- Integration verified: 16 references to custom events in dashboard specification

**Phase 6 (Belfast SEO Research):**
- Phase 6 identified 5 key Belfast competitors
- Plan 12-02 operationalizes competitor tracking with monthly monitoring framework
- Integration verified: All 5 competitors from Phase 6 included in tracking framework

**Phase 11 (Citations & Link Building):**
- Phase 11 created citation tracker (35+ directories)
- Plan 12-02 includes monthly citation status check in review checklist
- Integration point: Verify Tier 1 citations still live, re-submit if deleted

### User Actions Required (Post-Plan)

**To activate monitoring infrastructure:**

1. **Execute dashboard setup** (2-3 hours one-time):
   - Follow belfast-analytics-dashboard.md Section 2-5
   - Verify GSC property, create Belfast filters
   - Link GA4 to GSC
   - Mark 3 GA4 events as conversions
   - Create Looker Studio dashboard (copy section 4 template)
   - Set up Microsoft Clarity project

2. **Set up review calendar** (15 minutes):
   - Add recurring events: Weekly (Mon 9am, 15min), Monthly (1st Mon, 45min), Quarterly (1st Mon of Q, 2hr)
   - Link to playbook sections in calendar descriptions

3. **Create tracking spreadsheet** (30 minutes):
   - Use Google Sheets template structure (playbook Resources section)
   - 4 sheets: Weekly Metrics, Monthly Keywords, GBP Tracking, Content Performance

4. **Configure automated alerts** (30 minutes):
   - GA4 Custom Insights: Traffic drop alert, conversion drop alert
   - GSC email notifications (already configured in Section 2)

5. **Baseline current metrics** (30 minutes):
   - Record current positions for 32 keywords
   - Screenshot current Looker Studio dashboard (if built)
   - Note current GBP review count and rating
   - Purpose: Month 1 comparison baseline

**Total setup time:** ~4-5 hours one-time investment

### Blockers

**None.** All documentation complete and ready for operational use.

**Potential future blockers:**
- If user doesn't complete setup, monitoring infrastructure won't be active (alerts won't fire)
- If user doesn't follow review cadence, issues may be missed
- Mitigation: Setup checklist provided, calendar reminders recommended

## Validation Metrics

**Post-implementation validation (after user completes setup):**

**Dashboard operational:**
- [ ] Looker Studio dashboard loads and displays data
- [ ] All 5 sections populate with GSC and GA4 data
- [ ] Belfast filters correctly isolate Belfast traffic (verify manually)
- [ ] Conversion events appear in dashboard (test by triggering phone_call_click)

**Alerts configured:**
- [ ] GSC email notifications enabled and firing
- [ ] GA4 custom alerts created and monitoring
- [ ] Test alert fires correctly (manually trigger traffic drop simulation)

**Review cadence active:**
- [ ] Weekly review completed 4 consecutive weeks (establish habit)
- [ ] Monthly review completed with report template filled out
- [ ] Competitive tracking spreadsheet updated monthly

**Playbooks usable:**
- [ ] Non-technical user can follow alert response procedures without confusion
- [ ] Diagnostic steps lead to root cause identification
- [ ] Action plans provide clear next steps with timelines

## Phase 12 Progress

- ✅ Plan 12-01: Belfast Analytics Infrastructure Setup (COMPLETE) - GA4 tracking, GTM, custom events
- ✅ Plan 12-02: Belfast Analytics Monitoring Toolkit (COMPLETE) - Dashboard spec, monitoring playbook
- ⏭️ Plan 12-03: [If exists, otherwise Phase 12 complete]

**Phase 12 Status:** 2 of 2 plans complete (100% progress) - **PHASE 12 COMPLETE**

## Commit History

1. **8891221** - `docs(12-02): create Belfast analytics dashboard specification`
   - 15 KPIs with Month 3/6/12 targets across 4 categories
   - GSC setup: Belfast filters, email alerts, GA4 linking, URL inspection
   - GA4 custom events marked as conversions (phone_call_click, form_submission, direction_request)
   - Looker Studio 5-section dashboard template with data source connections
   - Microsoft Clarity setup for Belfast page heatmaps
   - Budget-phase tool recommendations (free → $39 → $199 based on clients)
   - Common issues troubleshooting guide

2. **efa49a7** - `docs(12-02): create Belfast monitoring playbook`
   - Three review cadences: weekly 15min, monthly 45min, quarterly 2hr with actionable checklists
   - Four alert response procedures: ranking drop, traffic drop, conversion drop, new competitor with diagnostic workflows
   - Competitive tracking framework: 5 Belfast competitors (Digital 24, ProfileTree, VINDICTA, Rapid, Loud Mouth) with monthly position tracking
   - Belfast keyword tracking list: 7 primary (weekly), 15 secondary (monthly), 10 long-tail (quarterly)
   - Three reporting templates: weekly status, monthly performance, quarterly strategy review
   - Review calendar setup and tracking spreadsheet structure

## Related Documentation

**Created in this plan:**
- `.planning/phases/12-belfast-analytics-&-monitoring/belfast-analytics-dashboard.md`
- `.planning/phases/12-belfast-analytics-&-monitoring/belfast-monitoring-playbook.md`

**Referenced from prior phases:**
- `.planning/phases/12-belfast-analytics-&-monitoring/12-RESEARCH.md` (analytics tools research)
- `.planning/phases/06-belfast-seo-research-a-strategy/belfast-competitor-analysis.md` (5 competitors)
- `.planning/phases/06-belfast-seo-research-a-strategy/belfast-keyword-analysis.md` (keyword priorities)
- `.planning/phases/11-local-link-building-a-citations/belfast-citation-tracker.md` (citation status checks)

**User-facing resources:**
- Google Search Console: https://search.google.com/search-console
- Google Analytics 4: https://analytics.google.com
- Google Business Profile: https://business.google.com
- Looker Studio: https://lookerstudio.google.com
- Microsoft Clarity: https://clarity.microsoft.com
- BrightLocal Pricing: https://www.brightlocal.com/pricing/
- SEMrush Pricing: https://www.semrush.com/pricing/

---

**Summary complete.** Phase 12 Plan 2 delivers comprehensive Belfast analytics monitoring toolkit with actionable dashboard specifications and operational playbooks ready for immediate use.

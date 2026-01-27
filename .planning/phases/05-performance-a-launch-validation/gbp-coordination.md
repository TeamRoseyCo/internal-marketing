# Google Business Profile Coordination Checklist

**Purpose:** Coordinate GBP setup with Bailey ensuring NAP consistency between website and GBP listings
**Date:** 2026-01-27
**Status:** Ready for coordination
**Phase:** 05-03 Performance & Launch Validation

---

## Overview

This document provides a comprehensive checklist for setting up Google Business Profile (GBP) listings for all 6 locales. NAP (Name, Address, Phone) consistency between the website and GBP is **critical** for local SEO and GBP verification success.

**Why NAP Consistency Matters:**
- Google verifies business legitimacy through consistent NAP data across web
- Inconsistent NAP (different phone formats, address variations) causes GBP verification failures
- Local search rankings depend on exact NAP matching across all platforms
- Citation building requires consistent NAP format for maximum SEO impact

---

## Pre-Setup Requirements

### 1. Collect Real Contact Information

Bailey needs to provide real contact info for each locale. Current website data is **placeholder-only**.

| Locale | Phone Number | Address | Business Type | Notes |
|--------|--------------|---------|---------------|-------|
| US (Missouri) | | | Physical/Virtual | Primary market |
| AU (Sydney) | | | Physical/Virtual | Secondary market |
| UK (London) | | | Physical/Virtual | EU presence |
| IE (Dublin) | | | Physical/Virtual | EU presence |
| NL (Amsterdam) | | | Physical/Virtual | EU presence |
| DK (Copenhagen) | | | Physical/Virtual | EU presence |

**Phone Format Requirements:**
- ✅ **MUST** use international format with country code
- ✅ **MUST** match EXACTLY what will be entered in GBP
- ✅ **MUST** include same spaces, parentheses, hyphens as website
- ❌ **DO NOT** use local format without country code
- ❌ **DO NOT** change format between website and GBP

**Format Examples (maintain these patterns):**
```
US:  +1 (XXX) XXX-XXXX    (e.g., +1 (816) 555-1234)
NL:  +31 XX XXX XXXX       (e.g., +31 20 123 4567)
DK:  +45 XX XX XX XX       (e.g., +45 32 45 67 89)
AU:  +61 X XXXX XXXX       (e.g., +61 2 9876 5432)
UK:  +44 XX XXXX XXXX      (e.g., +44 20 7123 4567)
IE:  +353 X XXX XXXX       (e.g., +353 1 234 5678)
```

**Address Requirements:**
- ✅ Can be physical office OR virtual office address (both GBP-acceptable)
- ✅ Must be verified through GBP (postcard or video verification)
- ✅ Must match EXACTLY what will be entered in GBP
- ✅ Include full street address, suite/unit, city, state/province, postal code, country
- ❌ DO NOT use P.O. boxes (GBP doesn't accept)
- ❌ DO NOT use residential addresses if business is registered elsewhere

**Address Format Example:**
```
123 Main Street, Suite 100
Kansas City, MO 64101
United States
```

**Business Type Considerations:**

| Type | GBP Verification Method | Timeline | Notes |
|------|------------------------|----------|-------|
| Physical Office | Postcard to address | 1-2 weeks | Standard method, most reliable |
| Virtual Office | Postcard or Video call | 1-3 weeks | May require additional docs |
| Coworking Space | Video call verification | 1-2 weeks | Proof of membership needed |
| Home Address | Video call | 1-2 weeks | Business registration required |

---

### 2. Update Website with Real Data

Once Bailey provides contact info, developer updates website:

#### Step 2.1: Update locales.ts

**File:** `src/lib/locales.ts`

**Changes needed:**
```typescript
// BEFORE (lines 27-28):
phone: '+1 (555) 123-4567', // Update with real number
address: 'Missouri, United States',

// AFTER (example with real data):
phone: '+1 (816) 555-1234',  // Real number from Bailey
address: '123 Main Street, Suite 100, Kansas City, MO 64101, United States',
```

**Repeat for all 6 locales (us, nl, dk, au, uk, ie).**

#### Step 2.2: Fix Footer Component

**File:** `src/components/layout/footer.tsx`

**Issue found:** Footer hardcodes phone number (line 236)

**Current (line 226-238):**
```typescript
<a
  href="tel:+1234567890"
  className="..."
>
  ...
  +1 (234) 567-890  // ❌ HARDCODED
</a>
```

**Should be:**
```typescript
// Import locales and get current locale
import { locales, isValidLocale } from '@/lib/locales'

// Inside component, get locale from pathname or context
const locale = // ... extract from pathname or context
const localeData = locales[locale] || locales.us

// Update phone link
<a
  href={`tel:${localeData.phone.replace(/[\s()-]/g, '')}`}
  className="..."
>
  ...
  {localeData.phone}  // ✅ DYNAMIC
</a>
```

#### Step 2.3: Build and Deploy

**Commands:**
```bash
# 1. Build to verify no errors
npm run build

# 2. Test locally (optional but recommended)
npm run start

# 3. Verify contact info displays correctly:
#    - Check footer for each locale (e.g., localhost:3000/us, /nl, /dk, etc.)
#    - Check contact page
#    - View page source and search for "LocalBusiness" in structured data

# 4. Deploy to production (Vercel)
git add src/lib/locales.ts src/components/layout/footer.tsx
git commit -m "feat: update NAP data with real contact information"
git push origin main
```

#### Step 2.4: Verify Deployment

After deployment, verify data appears correctly:

| Location | How to Verify | Expected Result |
|----------|---------------|-----------------|
| Footer | Visit each locale homepage | Phone matches `locales.ts` for that locale |
| Contact Page | Visit `/[locale]/contact` | Phone and address match `locales.ts` |
| Structured Data | View page source, search "LocalBusiness" | JSON-LD contains correct phone and address |
| All Pages | Developer Tools → Network tab | No 404s or errors |

**Verification URLs (production):**
- https://roseyco.com/us
- https://roseyco.com/au
- https://roseyco.com/uk
- https://roseyco.com/ie
- https://roseyco.com/nl
- https://roseyco.com/dk

**How to verify structured data:**
1. Visit locale homepage (e.g., https://roseyco.com/us)
2. Right-click → "View Page Source"
3. Press Ctrl+F (Cmd+F on Mac)
4. Search for "LocalBusiness"
5. Verify phone and address in JSON-LD match exactly

---

### 3. GBP Setup Checklist (Bailey's Tasks)

For each locale, Bailey should complete these steps in Google Business Profile.

#### Setup Process (Per Locale)

**Required information for GBP:**
- Business name: Rosey Co.
- Phone: [exact from locales.ts]
- Address: [exact from locales.ts]
- Website: https://roseyco.com/[locale-code]
- Primary category: Marketing Agency
- Secondary categories: Social Media Agency, Digital Marketing Agency
- Business hours: Monday-Friday, 9:00 AM - 5:00 PM (adjust by timezone)
- Description: Short description of services
- Logo: Rosey Co. logo image (high resolution)

---

#### Locale-Specific Setup Checklists

##### United States (us)

- [ ] **Create/claim GBP listing**
  - Business name: `Rosey Co.`
  - Phone: [exact from locales.ts - US format]
  - Address: [exact from locales.ts - full US address]
  - Website: `https://roseyco.com/us`
  - Primary category: Marketing Agency
  - Additional categories: Social Media Agency, SEO Agency, Digital Marketing Service
  - Service areas: Missouri, Kansas (or nationwide if applicable)
  - Business hours: Mon-Fri 9:00 AM - 5:00 PM CST

- [ ] **Verify listing**
  - Request verification (postcard or video call)
  - Complete verification within 30 days
  - Confirm "Verified" badge appears

- [ ] **Add business details**
  - Upload logo (high resolution PNG/JPG)
  - Add cover photos (office, team, projects)
  - Write business description (750 chars max)
  - Add services: SEO, Social Media Management, Paid Advertising, Website Design
  - Set attributes (e.g., "Online appointments available")

- [ ] **Link website in profile**
  - In "Info" tab, add website: https://roseyco.com/us
  - In "From the Business" section, add appointment link if applicable

- [ ] **Create first post**
  - Welcome post or recent project showcase
  - Include photos
  - Add call-to-action (e.g., "Visit our website")

---

##### Australia (au)

- [ ] **Create/claim GBP listing**
  - Business name: `Rosey Co.`
  - Phone: [exact from locales.ts - AU format]
  - Address: [exact from locales.ts - full AU address]
  - Website: `https://roseyco.com/au`
  - Primary category: Marketing Agency
  - Additional categories: Social Media Agency, SEO Agency, Digital Marketing Service
  - Service areas: Sydney metro, NSW (or nationwide if applicable)
  - Business hours: Mon-Fri 9:00 AM - 5:00 PM AEDT

- [ ] **Verify listing**
- [ ] **Add business details**
- [ ] **Link website in profile**
- [ ] **Create first post**

---

##### United Kingdom (uk)

- [ ] **Create/claim GBP listing**
  - Business name: `Rosey Co.`
  - Phone: [exact from locales.ts - UK format]
  - Address: [exact from locales.ts - full UK address]
  - Website: `https://roseyco.com/uk`
  - Primary category: Marketing Agency
  - Additional categories: Social Media Agency, SEO Agency, Digital Marketing Service
  - Service areas: London, Greater London (or nationwide if applicable)
  - Business hours: Mon-Fri 9:00 AM - 5:00 PM GMT

- [ ] **Verify listing**
- [ ] **Add business details**
- [ ] **Link website in profile**
- [ ] **Create first post**

---

##### Ireland (ie)

- [ ] **Create/claim GBP listing**
  - Business name: `Rosey Co.`
  - Phone: [exact from locales.ts - IE format]
  - Address: [exact from locales.ts - full IE address]
  - Website: `https://roseyco.com/ie`
  - Primary category: Marketing Agency
  - Additional categories: Social Media Agency, SEO Agency, Digital Marketing Service
  - Service areas: Dublin, Leinster (or nationwide if applicable)
  - Business hours: Mon-Fri 9:00 AM - 5:00 PM IST

- [ ] **Verify listing**
- [ ] **Add business details**
- [ ] **Link website in profile**
- [ ] **Create first post**

---

##### Netherlands (nl)

- [ ] **Create/claim GBP listing**
  - Business name: `Rosey Co.`
  - Phone: [exact from locales.ts - NL format]
  - Address: [exact from locales.ts - full NL address]
  - Website: `https://roseyco.com/nl`
  - Primary category: Marketingbureau (Marketing Agency in Dutch)
  - Additional categories: Social media-marketingbureau, SEO-bureau
  - Service areas: Amsterdam, Noord-Holland (or nationwide if applicable)
  - Business hours: Mon-Fri 9:00 AM - 5:00 PM CET

- [ ] **Verify listing**
- [ ] **Add business details** (can use Dutch translations)
- [ ] **Link website in profile**
- [ ] **Create first post** (in Dutch if targeting local audience)

---

##### Denmark (dk)

- [ ] **Create/claim GBP listing**
  - Business name: `Rosey Co.`
  - Phone: [exact from locales.ts - DK format]
  - Address: [exact from locales.ts - full DK address]
  - Website: `https://roseyco.com/dk`
  - Primary category: Marketingbureau (Marketing Agency in Danish)
  - Additional categories: Bureau for sociale medier, SEO-bureau
  - Service areas: København, Region Hovedstaden (or nationwide if applicable)
  - Business hours: Mon-Fri 9:00 AM - 5:00 PM CET

- [ ] **Verify listing**
- [ ] **Add business details** (can use Danish translations)
- [ ] **Link website in profile**
- [ ] **Create first post** (in Danish if targeting local audience)

---

### 4. Post-Setup Verification Checklist

After GBP listings are created and verified, complete these checks:

#### Website Link Verification

- [ ] **US:** Website link appears in GBP listing
- [ ] **AU:** Website link appears in GBP listing
- [ ] **UK:** Website link appears in GBP listing
- [ ] **IE:** Website link appears in GBP listing
- [ ] **NL:** Website link appears in GBP listing
- [ ] **DK:** Website link appears in GBP listing

**How to verify:**
1. Search "[city] rosey co" in Google (e.g., "kansas city rosey co")
2. Find GBP listing in search results
3. Click "Website" button
4. Verify it opens correct locale URL (e.g., https://roseyco.com/us)

---

#### NAP Consistency Verification

- [ ] **Business Name:** "Rosey Co." (not "RoseyCo", "Rosey Company", etc.) in ALL locations
- [ ] **Phone Format:** Matches website format exactly (including spaces, parentheses)
- [ ] **Address Format:** Matches website format exactly (including abbreviations)
- [ ] **Structured Data:** LocalBusiness schema matches GBP data

**How to verify:**
1. Open each GBP listing
2. Compare phone and address to website `locales.ts`
3. Check for exact formatting match (character-by-character)
4. If mismatch found, update GBP to match website (NOT the reverse)

---

#### Search Visibility Check

- [ ] Search "[locale] roseyco" shows GBP listing in results
- [ ] Search "[service] [city]" shows GBP listing (e.g., "seo kansas city")
- [ ] GBP knowledge panel displays on right side of desktop search
- [ ] Maps listing appears when searching in Google Maps
- [ ] Reviews section is visible (even if 0 reviews initially)

**Monitoring recommendations:**
- Set up Google Search Console for each locale URL
- Monitor impressions and clicks for local search queries
- Track GBP insights (views, searches, actions)
- Request reviews from satisfied clients to build credibility

---

## NAP Consistency Rules (CRITICAL)

The following must match **EXACTLY** between website and GBP. Even small differences can cause verification failures or hurt local rankings.

### Rule 1: Business Name Consistency

✅ **Correct:** "Rosey Co." everywhere
❌ **Wrong variations:**
- RoseyCo (no space)
- Rosey Company
- The Rosey Co.
- Rosey Co
- RoseyCo.com

**Action:** Use "Rosey Co." with capital R, lowercase "osey", capital C, lowercase "o", period at end.

---

### Rule 2: Phone Number Format Consistency

✅ **Correct:** Same format with exact punctuation
```
Website:  +1 (816) 555-1234
GBP:      +1 (816) 555-1234  ✅ Exact match
```

❌ **Wrong:** Different formatting
```
Website:  +1 (816) 555-1234
GBP:      816-555-1234       ❌ Missing country code
GBP:      +1 816 555 1234    ❌ Different spacing
GBP:      +18165551234       ❌ No spacing/punctuation
```

**Action:** Copy phone number from website `locales.ts` and paste into GBP exactly as-is.

---

### Rule 3: Address Format Consistency

✅ **Correct:** Same abbreviations, same structure
```
Website:  123 Main Street, Suite 100, Kansas City, MO 64101, United States
GBP:      123 Main Street, Suite 100, Kansas City, MO 64101, United States  ✅ Exact match
```

❌ **Wrong:** Different abbreviations or structure
```
Website:  123 Main Street, Suite 100, Kansas City, MO 64101, United States
GBP:      123 Main St., Ste. 100, Kansas City, Missouri 64101, USA  ❌ "St." vs "Street"
GBP:      123 Main Street, Kansas City, MO 64101                   ❌ Missing suite
```

**Action:** Use same abbreviations everywhere:
- "Street" not "St."
- "Suite" not "Ste."
- "MO" not "Missouri"
- "United States" not "USA"

**OR** use abbreviated form everywhere (pick one, be consistent):
- "St." not "Street"
- "Ste." not "Suite"
- "USA" not "United States"

**Key point:** Consistency matters more than which form you choose. Pick one and use it everywhere.

---

## GBP Verification Process

Understanding the verification process helps set realistic timelines.

### Verification Methods

| Method | When Available | Timeline | Proof Required |
|--------|---------------|----------|----------------|
| Postcard | Physical address | 5-7 days arrival + input code | None - code on postcard |
| Phone | Some business types | Instant | Receive automated call |
| Email | Existing verified businesses | Instant | Click email link |
| Video call | Virtual/coworking spaces | 3-5 days to schedule | Business docs, proof of location |
| Bulk verification | 10+ locations | 2-3 weeks | Business registration docs |

### Most Common: Postcard Verification

**Process:**
1. Create GBP listing with address
2. Request verification → Choose "Mail" option
3. Wait 5-7 business days for postcard delivery
4. Postcard arrives with 5-digit verification code
5. Enter code in GBP dashboard within 30 days
6. Listing becomes "Verified" (badge shows in search results)

**Timeline expectations:**
- Week 1: Request postcard
- Week 2: Postcard arrives, enter code
- Week 3+: Listing goes live, starts appearing in local search

---

### Alternative: Video Verification

For virtual offices or coworking spaces, Google may require video call verification.

**What you'll need:**
- Government-issued ID
- Business registration documents
- Proof of address (lease, utility bill, virtual office contract)
- Access to the business location during video call

**Process:**
1. Create GBP listing
2. Request verification → May see "Video verification" option
3. Schedule video call appointment
4. Google rep will verify location and documents
5. Verification completes within 3-5 business days

---

## Timeline Suggestion

Recommended phased rollout to manage workload and verification timelines:

### Week 1: Preparation
- [ ] Bailey provides contact information for all 6 locales
- [ ] Developer updates `locales.ts` with real data
- [ ] Developer fixes footer component
- [ ] Deploy to production
- [ ] Verify NAP displays correctly on website

### Week 2: Primary Markets Setup
- [ ] Bailey creates GBP for US (priority market)
- [ ] Bailey creates GBP for AU (secondary market)
- [ ] Request verification for both
- [ ] Share preliminary results with team

### Week 3: EU Markets Setup
- [ ] Bailey creates GBP for UK, IE, NL, DK
- [ ] Request verification for all EU locations
- [ ] Begin monitoring US/AU verification status

### Week 4: Verification & Monitoring
- [ ] Enter verification codes as postcards arrive
- [ ] Add business details, photos, posts to verified listings
- [ ] Monitor Search Console for impressions
- [ ] Track local search rankings

### Week 5-6: Optimization
- [ ] Request reviews from satisfied clients
- [ ] Create regular GBP posts (weekly or bi-weekly)
- [ ] Respond to any questions/reviews
- [ ] Analyze GBP insights data
- [ ] Adjust service descriptions based on performance

---

## Tools & Resources

### Required Accounts

| Tool | Purpose | Access Required |
|------|---------|-----------------|
| Google Business Profile | Manage listings | Bailey (owner) + team members (managers) |
| Google Search Console | Monitor search performance | Developer + Bailey |
| Google Analytics | Track website traffic | Developer + Bailey |
| Google Maps | Verify listings appear | Anyone (public) |

### Helpful Links

- **GBP Manager:** https://business.google.com/
- **Search Console:** https://search.google.com/search-console
- **Schema Validator:** https://validator.schema.org/ (test LocalBusiness schema)
- **Rich Results Test:** https://search.google.com/test/rich-results (verify structured data)
- **PageSpeed Insights:** https://pagespeed.web.dev/ (verify SEO score 90+)

---

## Troubleshooting Common Issues

### Issue 1: Verification Code Not Arriving

**Symptoms:** Postcard not received after 14+ days

**Solutions:**
1. Check address is correct in GBP listing
2. Check with mailroom/building reception
3. Request new verification code (GBP allows 3 attempts)
4. If still failing, try video verification method

---

### Issue 2: Website Not Showing in GBP

**Symptoms:** Website link added but not appearing in knowledge panel

**Solutions:**
1. Wait 24-48 hours for Google to index changes
2. Verify website URL is exact: https://roseyco.com/[locale]
3. Check website is accessible (not blocked by robots.txt)
4. Verify structured data includes correct URL
5. Use "Fetch as Google" in Search Console to force re-crawl

---

### Issue 3: Multiple Listings for Same Location

**Symptoms:** Duplicate GBP listings appear in search

**Solutions:**
1. Identify which listing is correct
2. Request ownership of duplicate listing
3. Mark duplicate as "Permanently closed"
4. Report duplicate to Google via "Suggest an edit"
5. Wait for Google to merge or remove duplicate (can take weeks)

---

### Issue 4: Verification Fails After Multiple Attempts

**Symptoms:** Entered code but verification rejected

**Solutions:**
1. Verify code was entered within 30-day window
2. Check for typos (O vs 0, I vs 1)
3. Request new code if expired
4. Try alternative verification method (video call)
5. Contact Google Business Profile support

---

### Issue 5: NAP Data Doesn't Match Search Results

**Symptoms:** Old or incorrect data showing in Google search

**Solutions:**
1. Update GBP listing with correct data
2. Verify structured data on website is correct
3. Use "Suggest an edit" to report incorrect info
4. Submit URL to Google Search Console for re-crawl
5. Check third-party directories (Yelp, Yellow Pages) for inconsistent data

---

## Success Metrics

Track these metrics to measure GBP success:

### GBP Insights Metrics (Track Monthly)

| Metric | Target | Notes |
|--------|--------|-------|
| Total views | Increasing month-over-month | Measures visibility |
| Search views | 80%+ of total views | Direct search = stronger brand signal |
| Maps views | 20%+ of total views | Local intent traffic |
| Website clicks | 10%+ click-through rate | Measures call-to-action effectiveness |
| Direction requests | Varies by location type | Physical locations only |
| Phone calls | Track trend | High-value conversion action |

### Search Console Metrics (Track Weekly)

| Metric | Target | Notes |
|--------|--------|-------|
| Impressions for local queries | Increasing | E.g., "seo kansas city" |
| Average position | Top 5 for brand queries | E.g., "rosey co kansas city" |
| Click-through rate | 5%+ for local queries | Industry benchmark |
| Pages with LocalBusiness schema | 6 (one per locale) | Verify in Coverage report |

### Business Goals (Track Monthly)

| Metric | Target | Notes |
|--------|--------|-------|
| Contact form submissions | Attribute by locale | Track in GA4 |
| Phone calls from GBP | Log in CRM | Measure GBP ROI |
| Reviews received | 1-2 per month minimum | Build social proof |
| Average review rating | 4.5+ stars | Impacts local rankings |

---

## Ongoing Maintenance

GBP requires regular maintenance to maximize effectiveness.

### Weekly Tasks
- [ ] Check for new reviews and respond within 24-48 hours
- [ ] Monitor GBP questions and provide answers
- [ ] Check for duplicate listings or incorrect info

### Monthly Tasks
- [ ] Create 1-2 new GBP posts (project showcase, blog post, offer)
- [ ] Update business hours if changed
- [ ] Add new photos (projects, team, events)
- [ ] Review GBP insights and track trends

### Quarterly Tasks
- [ ] Audit NAP consistency across all platforms
- [ ] Review and update service descriptions
- [ ] Request reviews from recent satisfied clients
- [ ] Analyze competitor GBP strategies

---

## Notes

- **Multi-location strategy:** Each locale has separate GBP listing (not shared)
- **Ownership:** Bailey should be primary owner, can add team members as managers
- **Verification urgency:** Start with primary markets (US, AU) then expand to EU
- **Language considerations:** NL and DK listings can use local language for descriptions
- **Review strategy:** Don't incentivize reviews (against Google policy), but do ask satisfied clients
- **Photo requirements:** Upload high-quality photos (min 720px width, 720px height)
- **Post frequency:** Weekly posts boost visibility, but monthly minimum acceptable

---

## Contact for Questions

- **Technical (NAP data, website):** Developer team
- **GBP setup process:** Bailey
- **Marketing strategy:** Marketing team lead
- **Verification issues:** Google Business Profile support

---

**Last Updated:** 2026-01-27
**Next Review:** After Phase 05-03 completion and GBP setup initiated

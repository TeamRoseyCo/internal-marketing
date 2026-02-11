---
phase: 09-service-location-content-matrix
plan: 02
subsystem: content-architecture
tags: [belfast-seo, internal-linking, pillar-pages, uk-locale, service-pages]

requires:
  - phase: 08
    provides: Belfast pillar pages (seo-belfast, social-media-belfast, paid-ads-belfast, website-design-belfast)
  - phase: 07
    provides: Pillar page infrastructure

provides:
  - Internal links from UK global service pages to Belfast pillar pages
  - User journey from global → local Belfast pages
  - Enhanced local SEO through strategic internal linking
  - Conditional UK-only callout banners

affects:
  - phase: 10
    reason: Belfast blog content will link back to these pillar pages
  - phase: 11
    reason: Citation building will leverage these internal link paths

tech-stack:
  added: []
  patterns:
    - Locale-conditional UI rendering (validLocale === "uk")
    - Tech-card component styling for callouts
    - MapPin icon for location-based CTAs

key-files:
  created: []
  modified:
    - path: src/app/[locale]/services/seo/page-client.tsx
      changes: Added Belfast callout banner with link to /uk/seo-belfast/
    - path: src/app/[locale]/services/social-media/page-client.tsx
      changes: Added MapPin import, Belfast callout banner with link to /uk/social-media-belfast/
    - path: src/app/[locale]/services/paid-ads/page-client.tsx
      changes: Added MapPin import, Belfast callout banner with link to /uk/paid-ads-belfast/
    - path: src/app/[locale]/services/website-design/page-client.tsx
      changes: Added MapPin import, Belfast callout banner with link to /uk/website-design-belfast/

decisions:
  - decision: Place callout after hero section (before stats)
    rationale: High visibility placement without disrupting page flow, user sees it immediately after understanding service value
    alternatives: [Footer placement (too low visibility), Sidebar (mobile unfriendly), Popup (disruptive)]
  - decision: Use tech-card styling instead of alert or banner
    rationale: Consistent with existing design system, matches service-card aesthetic, professional appearance
    alternatives: [Alert component (too attention-grabbing), Plain banner (too generic)]
  - decision: Use MapPin icon to signal location relevance
    rationale: Clear visual indicator of geographic specificity, aligns with Belfast location page design
    alternatives: [Building icon (less specific), Target icon (too generic)]

metrics:
  duration: 15 minutes
  tasks_completed: 1
  tasks_total: 1
  files_modified: 4
  lines_added: 111
  lines_removed: 3
  commits: 1
  test_coverage: N/A
  completed: 2026-02-11
---

# Phase 09 Plan 02: Add Belfast Callouts to Global Service Pages Summary

> **One-liner:** Conditional UK-only callout banners linking 4 global service pages to Belfast pillar pages for improved local discovery

---

## What Was Built

Added location-aware callout banners to all 4 UK global service pages that link to the corresponding Belfast-specific pillar pages. These banners only appear for UK locale visitors (`validLocale === "uk"`), maintaining a clean experience for other locales.

**Implementation:**
- **SEO page:** Links to `/uk/seo-belfast/` with message "Looking for SEO in Belfast? See our Belfast-specific SEO strategies designed for Northern Ireland businesses."
- **Social Media page:** Links to `/uk/social-media-belfast/` with message "Looking for Social Media Marketing in Belfast? See our Belfast-specific social media strategies tailored for local businesses."
- **Paid Ads page:** Links to `/uk/paid-ads-belfast/` with message "Looking for Google Ads in Belfast? See our Belfast-specific PPC strategies designed for Northern Ireland businesses."
- **Website Design page:** Links to `/uk/website-design-belfast/` with message "Looking for Web Design in Belfast? See our Belfast-specific website design services tailored for local businesses."

**Design pattern:**
- Positioned immediately after hero section (high visibility)
- Uses `tech-card` styling for consistency with existing design system
- MapPin icon signals geographic relevance
- Hover effects (border color, text color, ArrowRight translation) encourage clicks
- Fully responsive (flex-col on mobile, flex-row on desktop)

---

## Tasks Completed

| Task | Description | Files Modified | Commit |
|------|-------------|---------------|--------|
| 1 | Add Belfast callout banners to all 4 UK global service pages | 4 files | 685ee3f |

**Task 1 Details:**
1. Documented locale patterns across all 4 files (all use `validLocale` variable, all import Link and ArrowRight)
2. Added MapPin import to social-media, paid-ads, and website-design pages (SEO already had it)
3. Inserted conditional callout section after hero `</section>` in each file
4. Verified correct Belfast pillar URLs for each service
5. Build succeeded with 239 pages (no page count change)
6. TypeScript compiles cleanly with zero errors

---

## Technical Implementation

### Callout Component Structure

```tsx
{validLocale === "uk" && (
  <section className="py-8">
    <div className="container">
      <div className="max-w-4xl mx-auto">
        <Link
          href="/uk/{service}-belfast/"
          className="tech-card p-6 md:p-8 flex flex-col sm:flex-row items-start sm:items-center gap-4 hover:border-primary/50 transition-all group"
        >
          <div className="flex-shrink-0">
            <MapPin className="w-8 h-8 text-primary" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-lg mb-1 group-hover:text-primary transition-colors">
              Looking for {Service} in Belfast?
            </h3>
            <p className="text-sm text-muted-foreground">
              {Service-specific description}
            </p>
          </div>
          <ArrowRight className="w-5 h-5 text-primary flex-shrink-0 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  </section>
)}
```

### Icon Imports Added

**Files needing MapPin import:**
- `src/app/[locale]/services/social-media/page-client.tsx`
- `src/app/[locale]/services/paid-ads/page-client.tsx`
- `src/app/[locale]/services/website-design/page-client.tsx`

**Already had MapPin:**
- `src/app/[locale]/services/seo/page-client.tsx` (used in Local SEO section)

### Placement Strategy

Positioned after hero section (line 100-158 depending on file) to achieve:
1. **High visibility:** Users see it immediately after understanding service value prop
2. **Non-disruptive:** Doesn't interrupt hero message or primary CTAs
3. **Above the fold:** Likely visible without scrolling on most desktop viewports
4. **Before stats:** User hasn't committed to reading deep content yet

---

## Internal Linking Architecture

### Before This Plan
- Global service pages had no connection to Belfast pillar pages
- UK visitors saw same content as US/AU/IE visitors
- No user journey from global → local pages

### After This Plan
```
UK Visitor Journey:
/uk/services/seo/ → [Belfast callout] → /uk/seo-belfast/
/uk/services/social-media/ → [Belfast callout] → /uk/social-media-belfast/
/uk/services/paid-ads/ → [Belfast callout] → /uk/paid-ads-belfast/
/uk/services/website-design/ → [Belfast callout] → /uk/website-design-belfast/
```

**SEO Benefits:**
1. **Internal link equity flows** from global service pages (higher authority) to Belfast pillar pages
2. **Topic clustering signals** to Google that Belfast pages are location-specific variants
3. **User engagement metrics improve** as UK visitors find more relevant content
4. **Anchor text optimization** - links use natural "Looking for [Service] in Belfast?" phrasing

---

## Deviations from Plan

None. Plan executed exactly as written.

---

## Testing & Verification

### Build Verification
- ✅ Build succeeds: `npm run build` generates 239 pages
- ✅ TypeScript compiles: `npx tsc --noEmit` passes with zero errors
- ✅ No page count change (239 pages before and after)

### Implementation Verification
- ✅ All 4 files contain `validLocale === "uk"` conditional check
- ✅ SEO page links to `/uk/seo-belfast/` (line 108)
- ✅ Social Media page links to `/uk/social-media-belfast/` (line 166)
- ✅ Paid Ads page links to `/uk/paid-ads-belfast/` (line 208)
- ✅ Website Design page links to `/uk/website-design-belfast/` (line 208)
- ✅ MapPin icon imported in all 4 files (added to 3, already present in 1)
- ✅ Callout positioned after hero section in all 4 files

### Locale Isolation Verification
- ✅ Non-UK locales (US, AU, IE, NL, DK) see NO callout banners
- ✅ UK locale (`validLocale === "uk"`) sees all callout banners
- ✅ Conditional rendering prevents HTML bloat for non-UK visitors

---

## Next Phase Readiness

**Phase 09 Plan 03 (if exists):** Ready to proceed
**Phase 10 (Belfast Blog Content):** Ready - internal linking foundation established
**Phase 11 (Local Link Building):** Ready - citation URLs can now leverage these internal paths

### What's Ready for Next Phase
1. ✅ UK global service pages guide visitors to Belfast pages
2. ✅ Internal linking structure supports topical authority clustering
3. ✅ User journey from broad (global) to specific (Belfast) established
4. ✅ All Belfast pillar pages have inbound links from high-traffic pages

### Outstanding Work for Future Phases
- **Phase 10:** Create Belfast-specific blog content linking back to these pillar pages
- **Phase 11:** Build citations (GBP, directories) linking to both global service pages and Belfast pillars
- **Phase 12:** Track click-through rates from global → Belfast pages in analytics

---

## Lessons Learned

### What Went Well
1. **Consistent pattern across files** made implementation straightforward (all use same props/locale pattern)
2. **MapPin icon already imported in SEO file** reduced work by 25%
3. **Tech-card styling** provided professional appearance without custom CSS
4. **Clear hero section boundaries** made insertion point obvious (first `</section>` tag)

### Technical Patterns Established
1. **Locale-conditional UI rendering:** Use `{validLocale === "uk" && (...)}` for location-specific features
2. **Tech-card component reuse:** Existing design system components scale to new use cases
3. **Icon consistency:** MapPin + ArrowRight combination signals "location-based navigation"
4. **Responsive callout layout:** `flex-col sm:flex-row` adapts content for mobile and desktop

### Considerations for Similar Features
- **Other locales:** This pattern can scale to other locations (e.g., Missouri, Kansas City, Copenhagen)
- **Service expansion:** Adding a 5th service would require adding callout to that page as well
- **A/B testing opportunity:** Could test callout placement (after hero vs before CTA) to optimize CTR
- **Analytics:** Track clicks from global → Belfast pages to measure effectiveness

---

## Commit Log

```
685ee3f - feat(09-02): add Belfast callout banners to UK global service pages
  - Add MapPin icon imports to social-media, paid-ads, and website-design pages
  - Add conditional Belfast callout section for UK locale after hero
  - SEO page links to /uk/seo-belfast/
  - Social Media page links to /uk/social-media-belfast/
  - Paid Ads page links to /uk/paid-ads-belfast/
  - Website Design page links to /uk/website-design-belfast/
  - Callouts use tech-card styling with MapPin icon and ArrowRight
  - Only visible for validLocale === 'uk' (non-UK locales unchanged)
```

---

## Summary

Successfully added Belfast-specific callout banners to all 4 UK global service pages, creating a clear user journey from global service content to location-specific Belfast pillar pages. Implementation is locale-aware (UK only), uses existing design system components, and positions callouts for maximum visibility without disrupting page flow.

**Impact:**
- UK visitors now have a clear path to Belfast-specific content
- Internal linking supports topical authority clustering for local SEO
- Foundation established for Phase 10 (blog content) and Phase 11 (citation building)
- Zero impact on non-UK locales (maintains clean global experience)

**Next Steps:**
- Monitor click-through rates from global → Belfast pages (Phase 12)
- Create Belfast blog content linking to these pillar pages (Phase 10)
- Build citations leveraging this internal linking structure (Phase 11)

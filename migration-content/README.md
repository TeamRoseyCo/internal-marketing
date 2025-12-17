# Migration Content

This folder contains content migrated from the old Flowryse website (`flowryse-ai-local-growth`).

**Source:** `/Users/arnispiekus/Work/Projects/Github/flowryse-ai-local-growth/`

---

## Folder Structure

### `/blog-posts/` (17 files)
Individual blog post components in TSX format. Each file contains the content for one blog post.

**Main file:** `BlogPost.tsx` (311KB) - This contains the routing/rendering logic and may have embedded content.

**Individual posts:**
- `2026MarketingPlaybook.tsx`
- `AIDrivenFacebookGoogleAds2025.tsx`
- `AdsFunnelLeakyBucket.tsx`
- `BoostingPostsCharityZuckerberg.tsx`
- `ChristmasAdsNo5000VideoShoot.tsx`
- `ChristmasGrowthStack.tsx`
- `ChristmasSurgeGBPRevenue.tsx`
- `CompetitorsStealChristmas.tsx`
- `CutAdCostsAiVideoAds.tsx`
- `FacebookAdsROI2025.tsx`
- `GoogleAlgorithmUpdates2025.tsx`
- `HolidayConversionTriggersGBP.tsx`
- `HolidaySpikeJanuaryAutomation.tsx`
- `LeadsRotAutomation.tsx`
- `ThreeAdTweaksSaveThousands.tsx`
- `TradieFilledDecemberCalendar.tsx`

**Action:** Convert these to MDX format for the Next.js blog system.

---

### `/blog-images/` (35 files)
Featured images for blog posts. All JPG format.

**Naming convention:** `blog-{slug}.jpg`

**Action:** Move to `/public/images/blog/` and update references.

---

### `/guides/` (3 files)
Downloadable guides and cover images.

- `why-meta-ads-are-the-greatest.pdf` - Main free guide PDF
- `guide-front-cover.png` - Cover image for display
- `guide-back-cover.png` - Back cover image

**Action:** Set up download flow with Supabase + Resend for email delivery.

---

### `/pages/` (6 files)
Key page components with useful content/structure to reference.

- `FreeGuide.tsx` - Free guide download page (lead capture flow)
- `Results.tsx` - Results/case studies page structure
- `CaseStudies.tsx` - Case studies content
- `Testimonials.tsx` - Testimonials section
- `Newsletter.tsx` - Newsletter signup page
- `ReferralPartner.tsx` - Referral/affiliate program page

**Action:** Extract content and adapt for Next.js pages.

---

### `/supabase-functions/` (7 functions)
Edge functions for email/notification handling.

- `add-to-mailchimp/` - Add subscriber to Mailchimp
- `notify-admin-form/` - Notify admin on form submission
- `notify-new-lead/` - Notify on new lead
- `send-affiliate-approval/` - Send affiliate approval email
- `send-booking-confirmation/` - Send booking confirmation
- `send-guide-email/` - Send free guide via email
- `send-newsletter-welcome/` - Send newsletter welcome email

**Action:** Review and adapt for new Supabase project. May need to switch from Mailchimp to Klaviyo.

---

### `/supabase-migrations/` (26 files)
Database migration SQL files. Contains table schemas, RLS policies, triggers.

**Action:** Reference for understanding database structure. May need to run on new Supabase project if not already set up.

---

## Migration Checklist

- [ ] Convert blog posts to MDX format
- [ ] Move blog images to public folder
- [ ] Set up guide download flow
- [ ] Adapt Results/CaseStudies content
- [ ] Review and deploy Supabase functions
- [ ] Verify database schema matches migrations
- [ ] Update all internal links and references

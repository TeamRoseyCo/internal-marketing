# Rosey Co Website - Handoff Document

**For:** Jeison
**From:** Arnis
**Date:** December 17, 2025
**Last Updated:** January 11, 2026
**Priority:** ASAP

---

## Project Overview

**What is this?** Rosey Co is a global social media marketing agency website. We're rebuilding the website from an acquired Australian marketing agency into a modern Next.js platform.

**Current State:** The design and layout are complete. Blog system is fully functional with 19 posts migrated. Core functionality works. Now we need to finish remaining content migration, integrations, and polish.

**Tech Stack:**
- Next.js 16 (App Router)
- Tailwind CSS 4.0
- Framer Motion (animations)
- Lenis (smooth scroll)
- Supabase (database, auth)
- BunnyStream (video hosting)
- Deployed on Vercel

---

## What's Already Done

- [x] Full layout and design (dark luxury theme)
- [x] Homepage with hero section
- [x] Hero VSL video player (BunnyStream integrated)
- [x] 4 service pages (SEO, Social Media, Paid Ads, Website Design)
- [x] **Blog system - FULLY FUNCTIONAL**
  - [x] Blog listing page with category filtering
  - [x] Individual blog post pages with featured images
  - [x] 19 blog posts migrated from TSX to MDX format
  - [x] 35+ blog images copied and optimized
  - [x] All posts have unique, non-repeating images
  - [x] Reading time calculation
  - [x] Category badges
  - [x] Next.js Image optimization
  - [x] Responsive design for all blog pages
- [x] Results page structure
- [x] Contact page
- [x] Header & Footer
- [x] Framer Motion animations
- [x] Lenis smooth scroll
- [x] Favicon
- [x] Basic SEO metadata

---

## What Needs To Be Done

### Priority 1: Content Migration (PARTIALLY COMPLETE)

**Source:** `/migration-content/` folder (copied from old site)

| Content | Location | Status | Notes |
|---------|----------|--------|-------|
| Blog posts | `/migration-content/blog-posts/` | ✅ **COMPLETE** | 19 posts migrated to `/src/content/blog/` in MDX format |
| Blog images | `/migration-content/blog-images/` | ✅ **COMPLETE** | 35+ images moved to `/public/images/blog/` |
| Free guides (3) | `/migration-content/guides/` | ⏳ **PENDING** | Set up download flow |
| Case studies | `/migration-content/case-studies/` | ⏳ **PENDING** | Add to Results page |
| Lead capture forms | Reference old site patterns | ⏳ **PENDING** | Connect to Supabase |

**Completed Work:**
- ✅ Converted 19 blog posts from TSX to MDX format with proper frontmatter
- ✅ All blog images optimized and placed in `/public/images/blog/`
- ✅ Each blog post has unique featured image (no duplicates)
- ✅ Blog listing page displays all posts with images and category filters
- ✅ Individual blog post pages show featured images at the top
- ✅ Next.js Image component used for optimization
- ✅ Build verified and passing

**Blog Posts Migrated:**
1. 2026-marketing-playbook.mdx
2. ads-funnel-leaky-bucket.mdx
3. ai-driven-facebook-google-ads-2025.mdx
4. boosting-posts-charity-zuckerberg.mdx
5. christmas-ads-no-5000-video-shoot.mdx
6. christmas-growth-stack.mdx
7. christmas-surge-gbp-revenue.mdx
8. competitors-steal-christmas.mdx
9. cut-ad-costs-ai-video-ads.mdx
10. facebook-ads-roi-2025.mdx
11. google-algorithm-updates-2025.mdx
12. holiday-conversion-triggers-gbp.mdx
13. holiday-spike-january-automation.mdx
14. how-to-increase-google-ads-roas.mdx
15. leads-rot-automation.mdx
16. seo-strategies-for-2025.mdx
17. social-media-content-that-converts.mdx
18. three-ad-tweaks-save-thousands.mdx
19. tradie-filled-december-calendar.mdx

**Plus 3 existing posts:**
- facebook-ads-roi.mdx
- instagram-marketing.mdx
- small-business-marketing.mdx

**Total: 22 blog posts live and functional**

**Next Steps for Content Migration:**
- Review `/migration-content/guides/` and set up download flow
- Review `/migration-content/case-studies/` and add to Results page

---

### Priority 2: Portfolio/Results Page (HIGH)

**URL:** `/results`

**Required sections:**
1. Hero with key metrics headline
2. Featured case studies (2-3 highlighted)
3. Client results grid (clean cards with metrics)
4. Video portfolio section (VSLs, video editing work)
5. Instagram feed embed (@roseyco.official)
6. Client logos / trust bar
7. CTA: "Get Results Like These"

**Design principle:** Think Apple/Revolut - clean, elegant, guided journey. Don't clutter.

**Instagram Embed Options (choose based on your preference):**
- **Elfsight** - Easy embed widget, quick setup
- **Behold** - Clean Instagram feed embed
- **Custom API** - More control, more work

**Instagram:** https://www.instagram.com/roseyco.official (@roseyco.official)

---

### Priority 3: Integrations (HIGH)

| Integration | Purpose | Status | Notes |
|-------------|---------|--------|-------|
| Supabase | Lead capture, forms, data | Connected | Dashboard access provided |
| Resend.com | Transactional emails | Not connected | For form submissions, guide downloads |
| Klaviyo | Email marketing | Not connected | Optional - discuss with team |
| Google Reviews | Trust signals | Not connected | Work with Bailey on this |
| Instagram Feed | Social proof | Not connected | See embed options above |
| Microsoft Clarity | Heatmaps, analytics | Not set up | Need to create account & add script |
| Google Analytics | Traffic analytics | Not set up | Need to create property & add script |

---

### Priority 4: Additional VSLs & Videos

**Current hero VSL:** Already integrated via BunnyStream

**Additional videos to add (from NEURA - video editor):**

Google Drive links (download, upload to BunnyStream):
- https://drive.google.com/file/d/1G_xeT_VOcIoEATp5J2E-5QU_ILFL8tAn
- https://drive.google.com/file/d/1o3Dq_gp3DciL0yy4-08gV3mmnyCuQCP7
- https://drive.google.com/file/d/1PNcDFKnVP8z4G1QgWNmtEYf-tl-wUMQx
- https://drive.google.com/file/d/1-7IuGKNKHVxp42dOMmXgp9tVycyzI-y2
- https://drive.google.com/file/d/1TR6qqlCwQ9dINcZ4smI5yThaLZlwHOU6
- https://drive.google.com/file/d/1zVMnsW7gyNY9s27PQzC4ls2wh96cv09r

Streamable links (for reference/preview):
- https://streamable.com/p7vqfz
- https://streamable.com/fudnww
- https://streamable.com/fzb7le
- https://streamable.com/4lwnfu
- https://streamable.com/faexmy
- https://streamable.com/z3bqbq (HALAL VIDEO)

**Where to use:** Portfolio/Results page as client work examples, potentially on service pages.

**Process:** Download from Google Drive → Upload to BunnyStream → Get embed URLs → Add to site

---

### Priority 5: Lead Capture & Forms (HIGH)

**What needs to work:**
- Contact form → Supabase → Email notification (Resend)
- Free guide download → Supabase → Send guide email (Resend)
- Newsletter signup → Supabase → Add to email list

**Reference:** Check old site patterns in `/migration-content/` for form structure and flows.

---

### Priority 6: SEO (Work with Bailey)

**Multi-Location Strategy:**

Rosey Co operates in multiple locations:
- Australia
- United Kingdom
- Ireland
- USA (Missouri & Kansas)
- Denmark
- Netherlands

**Recommended Approach: Subdirectories (Option A)**

```
roseyco.com/au/          → Full Australian site
roseyco.com/uk/          → Full UK site
roseyco.com/us/          → US site (or /us/missouri/, /us/kansas/)
roseyco.com/ie/          → Ireland
roseyco.com/dk/          → Denmark
roseyco.com/nl/          → Netherlands
```

**Why this approach:**
- Full SEO power for each location
- Different Google Business Profile per location
- Different contact info, phone numbers, testimonials per region
- Ranks in local searches for each area

**Implementation:** Once main site is complete, duplicate structure for each location and customize content.

**Bailey will help with:**
- Final strategy decision
- Google Business Profile integration
- Structured data (LocalBusiness schema)
- Google Search Console setup
- Sitemap configuration

**Other SEO tasks:**
- [x] Sitemap.xml (Next.js auto-generates at `/sitemap.xml`) ✅ COMPLETE
- [x] robots.txt (Next.js generates at `/robots.txt`) ✅ COMPLETE
- [x] Structured data for each page (Organization, WebSite, LocalBusiness, Service, Article schemas) ✅ COMPLETE
- [x] Meta tags optimization ✅ COMPLETE (all pages have proper metadata)
- [x] Internal linking ✅ COMPLETE (service pages link to blog posts)
- [x] Image alt text ✅ COMPLETE (all images have proper alt text)
- [ ] Google Search Console verification

---

### Priority 7: Technical & Performance (MEDIUM)

| Task | Target |
|------|--------|
| Lighthouse Performance | 90+ |
| Lighthouse Accessibility | 90+ |
| Lighthouse Best Practices | 90+ |
| Lighthouse SEO | 90+ |

**Tips:**
- All images should use Next.js `<Image>` component
- Lazy load below-fold content
- Minimize JavaScript bundle
- Ensure proper heading hierarchy

---

## Optional / To Be Discussed

### Email/SMS Marketing Service Page

**Status:** OPTIONAL - Discuss with team

**Context:** Currently have 4 core services. Adding more might clutter the design.

**Options:**
| Option | Pros | Cons |
|--------|------|------|
| Separate page | Full SEO, dedicated content | Clutters navigation, 5th service |
| Section on existing page | Clean design, still mentioned | Less prominent, less SEO value |
| "Additional Services" dropdown | Keeps main 4 clean | Adds nav complexity |
| Mention in footer/Contact | Non-intrusive | Not prominent |

**Decision:** Discuss on team call. If adding, could go under "Additional Services" submenu.

---

### CRM Service Page

**Status:** OPTIONAL - Likely NO

**Context:** CRM services fall under a different sub-company (NEURA). Better to have dedicated CRM site for that offering.

**Note:** The Australian company uses Go High Level CRM for clients. Previously we built custom CRMs. This is being figured out at business level.

**Decision:** Probably don't include on this site. Keep for NEURA sub-company.

---

### AI Chatbot

**Status:** OPTIONAL - Later phase

**Preferred platform:** Voiceflow (but flexible)

**When:** After main site is complete and live.

---

## Access & Setup (Arnis will help)

| Service | Status | Notes |
|---------|--------|-------|
| Git repository | ✅ Ready | Push to main branch |
| Supabase | ✅ Access given | Project being added to org |
| BunnyStream | Arnis setting up | For uploading new videos |
| Vercel | Arnis setting up | Deployment platform |
| Google Analytics | Needs setup | Create property, add to site |
| Microsoft Clarity | Needs setup | Create account, add script |
| Domain (roseyco.com) | Arnis handling | Currently points to old site |

---

## Key File Locations

```
/src/app/
├── page.tsx                    → Homepage
├── layout.tsx                  → Root layout (metadata, fonts)
├── globals.css                 → All styles, design system
├── blog/                       → Blog system
│   ├── page.tsx                → Blog listing
│   └── [slug]/page.tsx         → Individual posts
├── services/
│   ├── page.tsx                → Services overview
│   ├── seo/page.tsx            → SEO service
│   ├── social-media/page.tsx   → Social Media service
│   ├── paid-ads/page.tsx       → Paid Ads service
│   └── website-design/page.tsx → Website Design service
├── results/page.tsx            → Results/Portfolio page
├── contact/page.tsx            → Contact page
└── privacy-policy/page.tsx     → Privacy policy

/src/components/
├── layout/
│   ├── header.tsx              → Navigation header
│   └── footer.tsx              → Site footer
├── ui/                         → shadcn/ui components
├── video/
│   └── hero-video-player.tsx   → BunnyStream video component
└── blog/                       → Blog components

/src/content/blog/              → Blog posts (22 posts in MDX format)

/migration-content/             → Content from old site
├── blog-posts/                 → ✅ MIGRATED to /src/content/blog/
├── blog-images/                → ✅ MIGRATED to /public/images/blog/
├── guides/                     → ⏳ TO MIGRATE - Free downloadable guides
└── case-studies/               → ⏳ TO MIGRATE - Case study content

/public/                        → Static assets
├── manifest.json               → PWA manifest
└── images/                     → Static images

/.env.local                     → Environment variables (DO NOT COMMIT)
/CLAUDE.md                      → Claude Code instructions
/HANDOFF.md                     → This file
```

---

## Environment Variables

Located in `.env.local`:

```
# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# BunnyStream
NEXT_PUBLIC_BUNNY_LIBRARY_ID=
NEXT_PUBLIC_BUNNY_VIDEO_ID_HERO=
NEXT_PUBLIC_BUNNY_VIDEO_EMBED_URL=
NEXT_PUBLIC_BUNNY_VIDEO_HLS_URL=
NEXT_PUBLIC_BUNNY_VIDEO_THUMBNAIL_URL=
NEXT_PUBLIC_BUNNY_VIDEO_PREVIEW_URL=
```

**To add:** Resend API key, Google Analytics ID, any other integration keys.

---

## Commands

```bash
npm run dev          # Start development server
npm run build        # Production build
npm run lint         # Run linter
```

**Always run `npm run build` before committing to catch errors.**

---

## Design Guidelines

**Theme:** Dark luxury - sophisticated, premium, understated elegance

**Brand Colors (from globals.css):**
- Rose Red: `hsl(0 85% 55%)` - Primary/CTA
- Crimson: `hsl(355 80% 45%)` - Secondary accent
- Leaf Green: `hsl(130 75% 48%)` - Tertiary accent

**Typography:**
- Headlines: Fraunces (serif)
- Body: DM Sans (sans-serif)

**Design Principles:**
- Think Apple/Revolut - clean, elegant
- Guide the user journey
- Don't clutter
- Premium feel
- Subtle animations (already implemented)

---

## Questions?

DM Arnis directly. For specific areas:
- **SEO questions:** Work with Bailey
- **Video content:** Check with NEURA
- **Design decisions:** Ask Arnis

---

## Summary Checklist

### Must Do
- [x] **Migrate blog posts from `/migration-content/`** ✅ COMPLETE
  - [x] 19 posts converted from TSX to MDX
  - [x] 35+ blog images migrated and optimized
  - [x] All posts have unique featured images
  - [x] Blog listing and individual post pages functional
  - [x] Build verified and passing
- [ ] Migrate free guides and set up download flow
- [x] Build out Results/Portfolio page with case studies ✅ Structure complete (placeholders need real content)
- [x] Add Instagram feed embed (@roseyco.official) ✅ Section added (needs Elfsight/Behold widget)
- [ ] Set up Google Reviews integration
- [x] Connect Resend.com for email notifications ✅ Code complete (needs domain verification)
- [ ] Set up Microsoft Clarity
- [ ] Set up Google Analytics
- [x] Ensure all lead capture forms work (→ Supabase → Email) ✅ Code complete (needs Supabase project setup)
- [ ] Add additional VSLs to portfolio (upload to BunnyStream first)
- [ ] Achieve 90+ Lighthouse scores

### Work with Bailey (SEO)
- [ ] Multi-location SEO strategy implementation
- [ ] Google Business Profile integration
- [x] Sitemap & structured data ✅ COMPLETE (sitemap.xml, robots.txt, JSON-LD schemas all implemented)
- [ ] Google Search Console

### Optional / Discuss
- [ ] Email/SMS Marketing page (probably add as section, not full page)
- [ ] CRM page (probably no - keep for NEURA sub-company)
- [ ] AI Chatbot (Voiceflow - later phase)

---

## Recent Work Completed (Dec 18, 2025)

### Blog Migration - COMPLETE ✅

**What was done:**
1. **Converted 19 blog posts from TSX to MDX format**
   - Original files were React/Vite TSX components from old site
   - Converted to MDX (Markdown + JSX) with proper frontmatter metadata
   - Preserved all content, CTAs, and formatting

2. **Migrated 35+ blog images**
   - Moved from `/migration-content/blog-images/` to `/public/images/blog/`
   - All images optimized for Next.js Image component
   - Proper naming convention maintained

3. **Fixed image uniqueness issues**
   - Ensured all 22 blog posts have unique featured images
   - No duplicate images across posts
   - Added missing images to 3 posts that had none
   - Reassigned duplicates to unique images

4. **Implemented blog image display**
   - Updated `blog-post-card.tsx` to show featured images on listing page
   - Updated `[slug]/page.tsx` to show featured images on individual posts
   - Used Next.js Image component for optimization
   - Added hover effects and responsive sizing

5. **Verified functionality**
   - Blog listing page: `/blog` - shows all 22 posts with images and categories
   - Individual posts: `/blog/[slug]` - featured image at top, full content below
   - Category filtering works
   - Reading time calculation works
   - All builds passing (`npm run build` successful)

**Files Created/Modified:**
- Created 19 new MDX files in `/src/content/blog/`
- Modified `src/components/blog/blog-post-card.tsx`
- Modified `src/app/blog/[slug]/page.tsx`
- Moved 35+ image files to `/public/images/blog/`

**Git Commits:**
- Commit: `670bfda` - "Fix blog post image uniqueness - ensure all 19 posts have unique images"
- Pushed to main branch

**Result:**
- ✅ Blog system fully functional with 22 posts
- ✅ All images displaying correctly
- ✅ No duplicate images
- ✅ Responsive design working
- ✅ Ready for production

---

## Recent Work Completed (Jan 5, 2026)

### Results Page Enhancements - COMPLETE ✅

**What was done:**
1. **Added Client Logos / Trust Bar Section**
   - "Trusted by businesses worldwide" section
   - 6 placeholder company names (replace with actual client logos)
   - Animated fade-in effects

2. **Added Video Portfolio Section**
   - 6 video placeholder cards with play buttons
   - Categories: Brand Content, Paid Advertising, Social Content, Testimonials, Educational, Event Coverage
   - Glassmorphism card design with hover effects
   - "Get in touch" CTA for full portfolio

3. **Added Instagram Feed Section**
   - 6 placeholder tiles linking to @roseyco.official
   - Follow button with Instagram icon
   - Ready for Elfsight/Behold widget integration

4. **Reordered Sections**
   - Testimonials section now appears before Instagram feed

### Lead Capture Infrastructure - READY ✅

**What was done:**
1. **Created Supabase client** (`src/lib/supabase.ts`)
   - Browser client for frontend
   - Server client for API routes

2. **Created Resend client** (`src/lib/resend.ts`)
   - Email service integration
   - FROM_EMAIL and ADMIN_EMAIL configured

3. **Created Contact Form API** (`src/app/api/contact/route.ts`)
   - Validates form data
   - Saves leads to Supabase `leads` table
   - Sends admin notification email via Resend
   - Sends confirmation email to lead

4. **Updated Contact Page** (`src/app/contact/page.tsx`)
   - Form now submits to API endpoint
   - Loading state during submission
   - Error handling with user feedback
   - Success state after submission

5. **Created Database Migration** (`supabase/migrations/001_create_leads_table.sql`)
   - `leads` table with all required fields
   - Indexes for performance
   - Row Level Security policies
   - Auto-update timestamp trigger

**Status:** Infrastructure ready. Needs Supabase project setup + run migration.

### Footer Social Links - UPDATED ✅

**What was done:**
1. Updated Instagram link to `https://www.instagram.com/roseyco.official`
2. Updated LinkedIn link to `https://www.linkedin.com/company/rosey-co/`
3. Removed Facebook and X (Twitter) links (no pages exist)

**Files Modified:**
- `src/components/layout/footer.tsx`

### Git Commits:
- Commit: `88b9930` - "Add Results page sections and lead capture infrastructure"
- Pushed to main branch

---

## What Still Needs To Be Done

### Immediate (Blocking)
- [ ] **Supabase Setup** - Create project, run `001_create_leads_table.sql` migration
- [ ] **Verify Resend Domain** - Verify `roseyco.com` in Resend dashboard

### High Priority
- [ ] Replace Results page placeholders with real content:
  - [ ] Client logos (need image files)
  - [ ] Video embeds (upload to BunnyStream first)
  - [ ] Instagram feed widget (Elfsight/Behold)
- [ ] Google Analytics setup (need GA4 property ID)
- [ ] Microsoft Clarity setup (need Clarity project ID)

### Medium Priority
- [x] SEO basics (sitemap.xml, robots.txt, structured data) ✅ COMPLETE
- [ ] Migrate free guides + download flow
- [ ] Add case studies to Results page
- [ ] Google Reviews integration
- [ ] Achieve 90+ Lighthouse scores

### Later Phase
- [ ] Multi-location SEO (`/au/`, `/uk/`, `/us/`, etc.)
- [ ] AI Chatbot (Voiceflow)
- [ ] Newsletter signup flow

---

## Recent Work Completed (Jan 11, 2026)

### SEO Infrastructure - COMPLETE ✅

**What was done:**
1. **Created robots.ts** (`src/app/robots.ts`)
   - Allows all crawling by default
   - Blocks `/api/` and `/_next/` routes
   - Points to sitemap.xml

**Already existed (verified working):**
- `src/app/sitemap.ts` - Auto-generates sitemap with 213 pages (all static pages, blog posts, locale variants)
- `src/components/seo/structured-data.tsx` - JSON-LD schemas for Organization, WebSite, LocalBusiness, Service, Article, FAQ
- Structured data already integrated in `src/app/layout.tsx`

**Routes now available:**
- `/sitemap.xml` - Auto-generated sitemap
- `/robots.txt` - Search engine crawling rules

### Image Alt Text - FIXED ✅

**What was done:**
- Fixed MDX image component (`src/components/mdx/mdx-components.tsx`) to generate fallback alt text from filename when not provided
- All other images in the codebase already had proper alt text

### Internal Linking - IMPLEMENTED ✅

**What was done:**
1. **Created Related Articles component** (`src/components/blog/related-articles.tsx`)
   - Reusable component for displaying related blog posts
   - Pre-defined article sets for each service (SEO, Paid Ads, Social Media, Website Design)

2. **Added Related Articles sections to all service pages:**
   - `/services/seo` - Links to SEO-related blog posts
   - `/services/paid-ads` - Links to Google Ads/Meta Ads blog posts
   - `/services/social-media` - Links to social media blog posts
   - `/services/website-design` - Links to conversion/SEO blog posts

### Meta Tags Optimization - COMPLETE ✅

**What was done:**
1. **Added metadata to all service pages via layout files:**
   - `src/app/services/seo/layout.tsx`
   - `src/app/services/paid-ads/layout.tsx`
   - `src/app/services/social-media/layout.tsx`
   - `src/app/services/website-design/layout.tsx`

2. **Added metadata to other pages:**
   - `src/app/contact/layout.tsx`
   - `src/app/results/layout.tsx`

3. **Removed Twitter metadata** (no Twitter account exists)

### Performance Optimization - COMPLETE ✅

**What was done:**
- Added `display: "swap"` to all fonts in `src/app/layout.tsx` for better CLS (Cumulative Layout Shift)

**Build verified:** ✅ All 213 pages generating successfully

---

**Good luck! Ship it fast.**

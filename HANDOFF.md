# Flowryse Website - Handoff Document

**For:** Jason
**From:** Arnis
**Date:** December 17, 2025
**Priority:** ASAP

---

## Project Overview

**What is this?** Flowryse is a global social media marketing agency website. We're rebuilding the website from an acquired Australian marketing agency into a modern Next.js platform.

**Current State:** The design and layout are complete. Core functionality works. Now we need to finish content migration, integrations, and polish.

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
- [x] Blog system structure
- [x] Results page structure
- [x] Contact page
- [x] Header & Footer
- [x] Framer Motion animations
- [x] Lenis smooth scroll
- [x] Favicon
- [x] Basic SEO metadata

---

## What Needs To Be Done

### Priority 1: Content Migration (HIGH)

**Source:** `/migration-content/` folder (copied from old site)

| Content | Location | Notes |
|---------|----------|-------|
| Blog posts (~40) | `/migration-content/blog/` | Convert to MDX format |
| Free guides (3) | `/migration-content/guides/` | Set up download flow |
| Case studies | `/migration-content/case-studies/` | Add to Results page |
| Lead capture forms | Reference old site patterns | Connect to Supabase |

**Action:** Review the `/migration-content/` folder and integrate content into the appropriate pages.

---

### Priority 2: Portfolio/Results Page (HIGH)

**URL:** `/results`

**Required sections:**
1. Hero with key metrics headline
2. Featured case studies (2-3 highlighted)
3. Client results grid (clean cards with metrics)
4. Video portfolio section (VSLs, video editing work)
5. Instagram feed embed (@flowryseai)
6. Client logos / trust bar
7. CTA: "Get Results Like These"

**Design principle:** Think Apple/Revolut - clean, elegant, guided journey. Don't clutter.

**Instagram Embed Options (choose based on your preference):**
- **Elfsight** - Easy embed widget, quick setup
- **Behold** - Clean Instagram feed embed
- **Custom API** - More control, more work

**Instagram:** https://www.instagram.com/flowryseai (@flowryseai)

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

Flowryse operates in multiple locations:
- Australia
- United Kingdom
- Ireland
- USA (Missouri & Kansas)
- Denmark
- Netherlands

**Recommended Approach: Subdirectories (Option A)**

```
flowryse.com/au/          → Full Australian site
flowryse.com/uk/          → Full UK site
flowryse.com/us/          → US site (or /us/missouri/, /us/kansas/)
flowryse.com/ie/          → Ireland
flowryse.com/dk/          → Denmark
flowryse.com/nl/          → Netherlands
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
- [ ] Sitemap.xml (Next.js can auto-generate)
- [ ] robots.txt
- [ ] Structured data for each page
- [ ] Meta tags optimization
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
| Domain (flowryse.com) | Arnis handling | Currently points to old site |

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

/migration-content/             → Content from old site (TO MIGRATE)
├── blog/                       → Blog posts
├── guides/                     → Free downloadable guides
└── case-studies/               → Case study content

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
- Magenta: `hsl(320 80% 55%)` - Primary/CTA
- Purple: `hsl(276 60% 50%)` - Secondary accent
- Cyan: `hsl(180 70% 45%)` - Tertiary accent

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
- [ ] Migrate blog posts from `/migration-content/`
- [ ] Migrate free guides and set up download flow
- [ ] Build out Results/Portfolio page with case studies
- [ ] Add Instagram feed embed (@flowryseai)
- [ ] Set up Google Reviews integration
- [ ] Connect Resend.com for email notifications
- [ ] Set up Microsoft Clarity
- [ ] Set up Google Analytics
- [ ] Ensure all lead capture forms work (→ Supabase → Email)
- [ ] Add additional VSLs to portfolio (upload to BunnyStream first)
- [ ] Achieve 90+ Lighthouse scores

### Work with Bailey (SEO)
- [ ] Multi-location SEO strategy implementation
- [ ] Google Business Profile integration
- [ ] Sitemap & structured data
- [ ] Google Search Console

### Optional / Discuss
- [ ] Email/SMS Marketing page (probably add as section, not full page)
- [ ] CRM page (probably no - keep for NEURA sub-company)
- [ ] AI Chatbot (Voiceflow - later phase)

---

**Good luck! Ship it fast.**

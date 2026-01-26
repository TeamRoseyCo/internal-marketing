# Flowryse Global Website - Project Plan

**Created:** 2025-12-14
**Project:** Flowryse - Global Social Media Marketing Agency Website
**Migration:** React/Vite → Next.js 16 App Router

---

## EXECUTIVE SUMMARY

We're rebuilding the acquired Australian marketing agency website into a global social media marketing agency platform. The new site will focus on SEO, social media management, social media marketing, and paid ads (Google & Meta).

**Key Goals:**
- ✅ Modern Next.js 15 website with better SEO
- ✅ Global-focused content (not Australia-specific)
- ✅ Beautiful animations (Framer Motion + Lenis)
- ✅ Same brand identity (logo, colors, messaging)
- ✅ All lead capture flows intact
- ✅ Blog + case studies for content marketing

---

## DECISIONS MADE

### Technology Stack
- **Framework:** Next.js 15 with App Router ✅
- **Animations:** Framer Motion + Lenis smooth scroll ✅
- **Blog:** MDX files with frontmatter ✅
- **Backend:** New Supabase project (separate from old site) ✅
- **Video Hosting:** Bunny Stream (migrating from Wistia) ✅
- **Styling:** Tailwind CSS + shadcn/ui ✅
- **SEO:** Next.js metadata API + next-seo library ✅

### Content Strategy
- **Approach:** Adapt existing content, make global ✅
- **Logo:** Extract from old website ✅
- **Videos:** Download VSLs and re-host on Bunny Stream ✅
- **Blog:** Convert 25+ posts to MDX format ✅

### MVP Scope
**In Scope:**
- ✅ Homepage + Hero Section
- ✅ Core Service Pages (SEO, Social Media Management, Paid Ads)
- ✅ Blog + SEO Content (25+ posts as MDX)
- ✅ Case Studies + Testimonials
- ✅ Lead Capture Forms
- ✅ Newsletter Signup
- ✅ Free Audit Booking

**Out of Scope (Post-MVP):**
- ❌ Admin Dashboard
- ❌ Lead Management/Export
- ❌ Affiliate Program
- ❌ Location-specific pages (AU, UK, USA, NL)

---

## PROJECT STRUCTURE

```
flowryse/
├── app/                          # Next.js App Router
│   ├── layout.tsx                # Root layout with providers
│   ├── page.tsx                  # Homepage
│   ├── services/
│   │   ├── seo/
│   │   │   └── page.tsx          # SEO services page
│   │   ├── social-media/
│   │   │   └── page.tsx          # Social media management
│   │   └── paid-ads/
│   │       └── page.tsx          # Paid ads services
│   ├── blog/
│   │   ├── page.tsx              # Blog listing
│   │   └── [slug]/
│   │       └── page.tsx          # Individual blog post (MDX)
│   ├── case-studies/
│   │   └── page.tsx              # Case studies page
│   ├── testimonials/
│   │   └── page.tsx              # Testimonials page
│   ├── free-audit/
│   │   └── page.tsx              # Free audit booking
│   ├── newsletter/
│   │   └── page.tsx              # Newsletter signup
│   └── api/
│       ├── leads/                # API routes for lead capture
│       └── newsletter/           # Newsletter signup
├── components/
│   ├── ui/                       # shadcn/ui components
│   ├── layout/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── Navigation.tsx
│   ├── sections/
│   │   ├── HeroSection.tsx       # Homepage hero
│   │   ├── ServicesOverview.tsx  # Services section
│   │   ├── CaseStudies.tsx       # Case studies carousel
│   │   └── Testimonials.tsx      # Testimonials section
│   └── animations/
│       ├── SmoothScroll.tsx      # Lenis wrapper
│       └── FadeInView.tsx        # Framer Motion utilities
├── content/
│   └── blog/                     # MDX blog posts
│       ├── post-1.mdx
│       ├── post-2.mdx
│       └── ...
├── lib/
│   ├── supabase/
│   │   ├── client.ts             # Supabase client
│   │   └── types.ts              # Database types
│   ├── mdx.ts                    # MDX utilities
│   └── utils.ts                  # General utilities
├── public/
│   ├── images/                   # Static images
│   ├── videos/                   # Placeholder videos
│   └── logo/                     # Logo files
├── supabase/
│   ├── migrations/               # Database migrations
│   └── functions/                # Edge Functions
├── docs/
│   ├── KNOWN_ISSUES.md           # Track non-blocking issues
│   └── MIGRATION_NOTES.md        # Migration progress notes
├── .env.local                    # Environment variables
├── CLAUDE.md                     # Claude instructions
├── PROJECT_PLAN.md               # This file
└── package.json
```

---

## MIGRATION CHECKLIST

### Phase 1: Setup & Infrastructure (Week 1)
- [ ] Create new Supabase project via Supabase MCP
- [ ] Initialize Next.js 15 project with App Router in /flowryse
- [ ] Set up Tailwind CSS + shadcn/ui
- [ ] Install Framer Motion + Lenis smooth scroll
- [ ] Configure next-seo library
- [ ] Set up environment variables (.env.local)
- [ ] Extract logo files from old project
- [ ] Set up Bunny Stream account
- [ ] Download VSLs from Wistia
- [ ] Upload videos to Bunny Stream

### Phase 2: Database & Backend (Week 1-2)
- [ ] Migrate database schema (6 tables + RLS + triggers)
  - [ ] leads table
  - [ ] free_guide_downloads table
  - [ ] newsletter_signups table
  - [ ] affiliates table (for future)
  - [ ] commissions table (for future)
  - [ ] user_roles table (for future)
- [ ] Migrate Edge Functions (7 functions)
  - [ ] send-guide-email
  - [ ] add-to-mailchimp
  - [ ] notify-new-lead
  - [ ] notify-admin-form
  - [ ] send-booking-confirmation
  - [ ] send-newsletter-welcome
  - [ ] send-affiliate-approval (future)
- [ ] Set up Mailchimp integration
- [ ] Configure Resend email service
- [ ] Test all Edge Functions

### Phase 3: Core Pages & Components (Week 2)
- [ ] Build layout components (Header, Footer, Navigation)
- [ ] Implement Lenis smooth scroll wrapper
- [ ] Create reusable Framer Motion animation components
- [ ] Build homepage
  - [ ] Hero section with Bunny Stream video
  - [ ] Services overview
  - [ ] Lead capture CTA
  - [ ] Case studies section
  - [ ] Testimonials section
  - [ ] FAQ section
- [ ] Create service pages
  - [ ] SEO services page
  - [ ] Social Media Management page
  - [ ] Paid Ads page
- [ ] Build lead capture forms
  - [ ] Contact form
  - [ ] Free audit booking
  - [ ] Newsletter signup

### Phase 4: Content Migration (Week 2-3)
- [ ] Convert 25+ blog posts to MDX
  - [ ] Extract content from React components
  - [ ] Create MDX frontmatter (title, description, date, author, etc.)
  - [ ] Optimize images for Next.js Image component
  - [ ] Test blog listing page
  - [ ] Test individual blog post pages
- [ ] Migrate case studies
  - [ ] Extract content
  - [ ] Make global (remove Australia-specific references)
  - [ ] Add structured data for SEO
- [ ] Migrate testimonials
  - [ ] Extract content
  - [ ] Integrate Bunny Stream testimonial videos
  - [ ] Create carousel/grid layout

### Phase 5: SEO & Performance (Week 3)
- [ ] Configure Next.js metadata API for all pages
- [ ] Add structured data (JSON-LD)
  - [ ] Organization schema
  - [ ] WebSite schema
  - [ ] LocalBusiness schema
  - [ ] Article schema (blog posts)
- [ ] Optimize images with next/image
- [ ] Generate sitemap.xml
- [ ] Configure robots.txt
- [ ] Add Open Graph and Twitter Card meta tags
- [ ] Performance audit (Core Web Vitals)

### Phase 6: Integrations & Testing (Week 3-4)
- [ ] Facebook Pixel integration
- [ ] Google Analytics setup
- [ ] Calendly booking widget integration
- [ ] Test all lead capture flows
  - [ ] Contact form → Supabase → Email
  - [ ] Newsletter signup → Mailchimp
  - [ ] Free guide download → Email delivery
  - [ ] Free audit booking → Calendly + confirmation email
- [ ] Cross-browser testing
- [ ] Mobile responsive testing
- [ ] Form validation testing
- [ ] Error handling testing

### Phase 7: Deployment & Launch (Week 4)
- [ ] Security review (Codex)
- [ ] Final type-check and build
- [ ] Deploy to Vercel (or preferred host)
- [ ] Set up custom domain
- [ ] SSL certificate
- [ ] Test production deployment
- [ ] Monitor for errors (Sentry or similar)
- [ ] Create backup of old site
- [ ] Switch DNS to new site
- [ ] Monitor analytics and conversions

---

## DATABASE SCHEMA (New Supabase Project)

### Tables to Migrate

#### 1. leads
```sql
CREATE TABLE leads (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  company TEXT,
  website TEXT,
  budget TEXT,
  timeline TEXT,
  source TEXT,
  user_agent TEXT
);

-- RLS Policy
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can insert leads" ON leads
  FOR INSERT WITH CHECK (true);
```

#### 2. free_guide_downloads
```sql
CREATE TABLE free_guide_downloads (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  email TEXT NOT NULL,
  full_name TEXT NOT NULL,
  company TEXT
);

-- RLS Policy
ALTER TABLE free_guide_downloads ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can insert downloads" ON free_guide_downloads
  FOR INSERT WITH CHECK (true);
```

#### 3. newsletter_signups
```sql
CREATE TABLE newsletter_signups (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  email TEXT NOT NULL UNIQUE,
  first_name TEXT
);

-- RLS Policy
ALTER TABLE newsletter_signups ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can insert signups" ON newsletter_signups
  FOR INSERT WITH CHECK (true);
```

#### 4. affiliates (future use)
```sql
CREATE TABLE affiliates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  user_id UUID REFERENCES auth.users(id),
  affiliate_code TEXT UNIQUE NOT NULL,
  commission_rate NUMERIC DEFAULT 0.1,
  total_referrals INTEGER DEFAULT 0,
  total_commission NUMERIC DEFAULT 0,
  status TEXT DEFAULT 'pending'
);
```

#### 5. commissions (future use)
```sql
CREATE TABLE commissions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  affiliate_id UUID REFERENCES affiliates(id),
  period TEXT,
  amount NUMERIC,
  status TEXT DEFAULT 'pending',
  paid_at TIMESTAMP WITH TIME ZONE
);
```

#### 6. user_roles (future use)
```sql
CREATE TABLE user_roles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id),
  role TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

---

## EDGE FUNCTIONS

### Functions to Migrate

1. **send-guide-email** (Resend)
   - Sends PDF guide download link via email
   - Triggered on: free_guide_downloads INSERT

2. **add-to-mailchimp**
   - Adds email to Mailchimp audience
   - Triggered on: newsletter_signups INSERT

3. **notify-new-lead** (Database Trigger)
   - Notifies admin of new lead submissions
   - Triggered on: leads INSERT

4. **notify-admin-form**
   - Manual admin notification for form submissions
   - Invoked directly from forms

5. **send-booking-confirmation**
   - Sends confirmation email for audit bookings
   - Triggered from Calendly webhook

6. **send-newsletter-welcome**
   - Sends welcome email to newsletter subscribers
   - Triggered on: newsletter_signups INSERT

7. **send-affiliate-approval** (future)
   - Sends approval email to affiliates
   - Triggered manually from admin

---

## ENVIRONMENT VARIABLES

### Required for New Project

```bash
# Supabase (New Project)
NEXT_PUBLIC_SUPABASE_URL=https://[new-project-id].supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=[new-anon-key]
SUPABASE_SERVICE_ROLE_KEY=[new-service-role-key]

# Bunny Stream
NEXT_PUBLIC_BUNNY_STREAM_LIBRARY_ID=[library-id]
BUNNY_STREAM_API_KEY=[api-key]

# Resend (Email)
RESEND_API_KEY=[api-key]

# Mailchimp
MAILCHIMP_API_KEY=[api-key]
MAILCHIMP_AUDIENCE_ID=[audience-id]
MAILCHIMP_SERVER_PREFIX=[server-prefix]

# Facebook Pixel
NEXT_PUBLIC_FACEBOOK_PIXEL_ID=1435855467637254

# Google Analytics (if using)
NEXT_PUBLIC_GA_MEASUREMENT_ID=[ga-id]

# Calendly (if webhook needed)
CALENDLY_WEBHOOK_SECRET=[secret]
```

---

## CONTENT MIGRATION NOTES

### Logo Files
- Extract from: `/Users/arnispiekus/Work/Projects/Github/flowryse-ai-local-growth/public/lovable-uploads/`
- Files to copy:
  - Main logo (SVG if available, PNG as fallback)
  - Logo variants (light/dark if applicable)
  - Favicon

### Videos (Wistia → Bunny Stream)
- **Current Wistia videos:**
  - Hero video: `nx99djlejm`
  - Testimonial video: `ak0ckv7o13`
- **Process:**
  1. Download from Wistia embed URLs
  2. Upload to Bunny Stream
  3. Get new Bunny Stream video IDs
  4. Update video embed code in Next.js

### Blog Posts (React → MDX)
- **Source:** `/Users/arnispiekus/Work/Projects/Github/flowryse-ai-local-growth/src/pages/blog-posts/`
- **Total posts:** 25+
- **Migration process:**
  1. Extract title, content, metadata from each React component
  2. Create MDX file with frontmatter
  3. Convert JSX to Markdown where possible
  4. Handle images (optimize with next/image)
  5. Test rendering

### Making Content Global
- **Remove:** "Australia", "Sydney", "Melbourne", "local Australian" references
- **Replace with:** "worldwide", "global", "international", location-neutral language
- **Case studies:** Emphasize results, not location
- **Testimonials:** Focus on outcomes, downplay geography

---

## ANIMATION IMPLEMENTATION

### Framer Motion Patterns

**Page transitions:**
```typescript
import { motion } from 'framer-motion';

export default function Page() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Page content */}
    </motion.div>
  );
}
```

**Scroll-triggered animations:**
```typescript
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

export function Section() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
    >
      {/* Section content */}
    </motion.section>
  );
}
```

### Lenis Smooth Scroll

**Setup in layout:**
```typescript
'use client';

import { ReactLenis } from '@studio-freight/react-lenis';

export function SmoothScroll({ children }) {
  return (
    <ReactLenis root options={{ lerp: 0.1, duration: 1.2, smoothWheel: true }}>
      {children}
    </ReactLenis>
  );
}
```

---

## SEO STRATEGY

### Metadata Template
```typescript
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'SEO Services | Flowryse - Global Marketing Agency',
  description: 'Professional SEO services for businesses worldwide. Increase organic traffic, improve rankings, and grow your business with data-driven SEO strategies.',
  openGraph: {
    title: 'SEO Services | Flowryse',
    description: 'Professional SEO services for businesses worldwide...',
    images: ['/images/og-seo.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SEO Services | Flowryse',
    description: 'Professional SEO services...',
    images: ['/images/twitter-seo.jpg'],
  },
};
```

### Structured Data (JSON-LD)
```typescript
const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Rosey Co',
  url: 'https://roseyco.com',
  logo: 'https://roseyco.com/logo.png',
  description: 'Global social media marketing agency specializing in SEO, social media management, and paid advertising.',
  serviceType: ['SEO', 'Social Media Management', 'Paid Advertising'],
  areaServed: 'Worldwide',
};
```

---

## TESTING CHECKLIST

### Functionality Testing
- [ ] All forms submit successfully
- [ ] Email notifications work
- [ ] Mailchimp integration adds subscribers
- [ ] Calendly booking works
- [ ] Videos play correctly
- [ ] Navigation works on all pages
- [ ] Blog posts render correctly from MDX
- [ ] Case studies display properly
- [ ] Testimonials carousel functions

### Performance Testing
- [ ] Lighthouse score > 90 (all categories)
- [ ] Core Web Vitals pass
- [ ] Images optimized and lazy-loaded
- [ ] Bundle size < 300KB (first load)
- [ ] Time to Interactive < 3s

### SEO Testing
- [ ] All pages have unique titles
- [ ] Meta descriptions present and unique
- [ ] Open Graph tags present
- [ ] Structured data validates (schema.org)
- [ ] Sitemap.xml accessible
- [ ] Robots.txt configured correctly
- [ ] Internal linking structure sound

### Cross-Browser Testing
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile Safari (iOS)
- [ ] Chrome Mobile (Android)

### Responsive Testing
- [ ] Mobile (375px - 767px)
- [ ] Tablet (768px - 1023px)
- [ ] Desktop (1024px+)
- [ ] Large desktop (1440px+)

---

## KNOWN RISKS & MITIGATIONS

### Risk 1: Bunny Stream Video Migration
**Risk:** Videos may lose quality during download/re-upload
**Mitigation:**
- Download in highest quality available
- Use Bunny Stream's optimization settings
- Test playback before full migration
- Keep Wistia videos as backup until confirmed

### Risk 2: MDX Blog Conversion
**Risk:** Complex React components in blog posts may not convert cleanly to MDX
**Mitigation:**
- Start with simple posts first
- Create MDX components for complex elements
- Test rendering incrementally
- Keep original React files as reference

### Risk 3: Supabase Edge Functions
**Risk:** Edge Functions may fail during migration due to environment differences
**Mitigation:**
- Test each function individually
- Use Supabase MCP for deployment
- Monitor logs during initial deployments
- Have rollback plan ready

### Risk 4: SEO Impact
**Risk:** Migration could temporarily hurt search rankings
**Mitigation:**
- Implement 301 redirects for all old URLs
- Maintain URL structure where possible
- Submit updated sitemap to Google Search Console
- Monitor rankings post-launch

---

## SUCCESS METRICS

### Launch Criteria (MVP)
- ✅ All core pages live and functional
- ✅ Lead capture forms working and tested
- ✅ Blog content migrated (at least 20/25 posts)
- ✅ Case studies and testimonials displaying
- ✅ Videos playing correctly on Bunny Stream
- ✅ Mobile responsive on all devices
- ✅ Lighthouse score > 85 (all categories)
- ✅ No console errors or warnings
- ✅ Type-check passes
- ✅ Build succeeds

### Post-Launch Metrics (Week 1-4)
- Lead form submissions (target: maintain or improve from old site)
- Newsletter signups (target: 10+ per week)
- Blog traffic (target: 1000+ monthly visitors)
- Bounce rate (target: < 60%)
- Average session duration (target: > 2 minutes)
- Core Web Vitals (target: all "Good")

---

## NEXT STEPS

1. **Create new Supabase project** (via Supabase MCP)
2. **Initialize Next.js project** in /flowryse directory
3. **Extract logo files** from old project
4. **Set up Bunny Stream account** and get credentials
5. **Download VSLs from Wistia** for migration
6. **Begin homepage build** with hero section
7. **Migrate database schema** to new Supabase
8. **Test Edge Functions** in new environment

---

## RESOURCES

### Key Documentation
- Next.js 15 App Router: https://nextjs.org/docs/app
- Framer Motion: https://www.framer.com/motion/
- Lenis Smooth Scroll: https://github.com/studio-freight/lenis
- shadcn/ui: https://ui.shadcn.com/
- Supabase: https://supabase.com/docs
- Bunny Stream: https://docs.bunny.net/docs/stream

### Local Resources
- Framer Motion examples: `/Users/arnispiekus/Work/Projects/Resources/repos/animations/framer-motion/`
- Lenis examples: `/Users/arnispiekus/Work/Projects/Resources/repos/animations/lenis/`
- Next.js templates: `/Users/arnispiekus/Work/Projects/Resources/repos/templates/`
- shadcn/ui: `/Users/arnispiekus/Work/Projects/Resources/repos/ui/shadcn-ui/`
- Animation guides: `/Users/arnispiekus/Work/Projects/Resources/recipes/animation-library-guides/`

### Old Project Reference
- Source code: `/Users/arnispiekus/Work/Projects/Github/flowryse-ai-local-growth/`
- Database: Supabase project `yxzdmacnfdswdxlgwjzi`

---

**Last Updated:** 2025-12-14
**Status:** Planning Complete - Ready for Implementation

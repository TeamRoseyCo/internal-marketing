# External Integrations

**Analysis Date:** 2026-01-23

## APIs & External Services

**Video Hosting:**
- BunnyStream - CDN and video hosting for VSL (Video Sales Letter) and promotional videos
  - SDK/Client: Native HTTPS HLS streaming (no SDK, uses HTML5 video with HLS URLs)
  - Configuration: `NEXT_PUBLIC_BUNNY_VIDEO_HLS_URL`, `NEXT_PUBLIC_BUNNY_VIDEO_THUMBNAIL_URL`, `NEXT_PUBLIC_BUNNY_VIDEO_PREVIEW_URL`
  - Implementation: `src/components/video/hero-video-player.tsx`

**Email & Marketing:**
- Resend - Transactional email service
  - SDK/Client: `resend` npm package v6.6.0
  - Auth: `RESEND_API_KEY` (environment variable)
  - Implementation: `src/lib/resend.ts`
  - Usage: Contact form notifications, confirmation emails, lead communications
  - Integration: `src/app/api/contact/route.ts` sends admin notifications and lead confirmations

**Analytics & Monitoring:**
- Google Analytics 4 - Traffic analytics and user behavior
  - SDK/Client: Google Tag Manager script (loaded via Next.js Script component)
  - Auth: `NEXT_PUBLIC_GA_ID` (tracking ID)
  - Implementation: `src/components/analytics/google-analytics.tsx`
  - Method: GTM script injection with `gtag` function

- Meta Pixel (Facebook Pixel) - Conversion tracking and audience building
  - SDK/Client: Facebook Pixel script (fbq)
  - Auth: `NEXT_PUBLIC_META_PIXEL_ID` (pixel ID)
  - Implementation: `src/components/analytics/meta-pixel.tsx`
  - Method: Script injection with standard Facebook Pixel code
  - Events: PageView tracking, conversion events

- Microsoft Clarity - Session recordings and heatmaps
  - SDK/Client: Clarity script
  - Auth: `NEXT_PUBLIC_CLARITY_ID` (project ID)
  - Implementation: `src/components/analytics/microsoft-clarity.tsx`
  - Method: Script injection for session replay and user interaction heatmaps

## Data Storage

**Databases:**
- Supabase (PostgreSQL) - Primary backend database
  - Connection: `NEXT_PUBLIC_SUPABASE_URL` + `NEXT_PUBLIC_SUPABASE_ANON_KEY` (browser client)
  - Server Connection: Uses `SUPABASE_SERVICE_ROLE_KEY` for API routes (bypasses RLS)
  - Client: `@supabase/supabase-js` v2.87.1
  - Implementation: `src/lib/supabase.ts` (two clients: browser and server)
  - Primary Tables: `leads`, `free_guide_downloads`, `newsletter_signups`
  - RLS Policies: Public insert-only for lead capture, service role for API operations

**File Storage:**
- Supabase Storage - Asset hosting (images, PDFs, guides)
  - Used for: Blog images, free guide downloads, case study assets
  - Client: Via Supabase JS client

**Caching:**
- Browser cache only (no Redis/Memcached configured)
- Next.js built-in ISR (Incremental Static Regeneration) for blog pages

## Authentication & Identity

**Auth Provider:**
- Supabase Auth - Optional for future admin/user functionality
  - Current status: Not actively used in public site
  - Implementation available: `@supabase/supabase-js` includes Auth methods
  - Could be used for: Admin dashboard, affiliate portal, newsletter preferences

## Contact & Lead Management

**Lead Capture:**
- Database: Supabase `leads` table
- Form: Contact form on `/contact` page
- Flow: Form submission → `src/app/api/contact/route.ts` → Supabase insert + Resend email
- Fields: first_name, last_name, email, phone, website, service_interest, message, source, created_at
- Data Validation: Email regex validation, required field checks

**Email Lists:**
- Newsletter signups → Supabase `newsletter_signups` table
- Status: Schema exists, integration pending

## Monitoring & Observability

**Error Tracking:**
- Console logging only (production errors visible in Vercel dashboard)
- No Sentry or similar service configured

**Logs:**
- Server-side: Standard Node.js console.log (visible in Vercel logs)
- Client-side: Browser console only
- Implementation: Error handlers in contact form API route log to console

## CI/CD & Deployment

**Hosting:**
- Vercel - Primary deployment platform for Next.js
  - Domain: roseyco.com
  - Deployment: Git push to main branch triggers automatic build and deploy

**CI Pipeline:**
- GitHub + Vercel integration
  - Build: `npm run build`
  - Linting: `npm run lint` (runs on Vercel)
  - Preview deployments: Automatic for PR/branches
  - Production: Automatic on main branch push

**Git Workflow:**
- Repository: Hosted on GitHub
- Branch: `main` is production branch
- Commits trigger automatic Vercel deployments

## Environment Configuration

**Required Environment Variables (Supabase):**
- `NEXT_PUBLIC_SUPABASE_URL` - Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Public anon key for browser client
- `SUPABASE_SERVICE_ROLE_KEY` - Service role key for API routes (server-only)

**Required Environment Variables (BunnyStream):**
- `NEXT_PUBLIC_BUNNY_LIBRARY_ID` - BunnyStream library ID
- `NEXT_PUBLIC_BUNNY_VIDEO_ID_HERO` - Hero video ID
- `NEXT_PUBLIC_BUNNY_VIDEO_HLS_URL` - HLS streaming URL
- `NEXT_PUBLIC_BUNNY_VIDEO_THUMBNAIL_URL` - Video thumbnail URL
- `NEXT_PUBLIC_BUNNY_VIDEO_PREVIEW_URL` - Animated preview URL (WebP)

**Required Environment Variables (Email):**
- `RESEND_API_KEY` - Resend API key for transactional emails

**Optional Environment Variables (Analytics):**
- `NEXT_PUBLIC_GA_ID` - Google Analytics 4 tracking ID (optional, disables GA if not set)
- `NEXT_PUBLIC_META_PIXEL_ID` - Meta Pixel ID (optional, disables Meta tracking if not set)
- `NEXT_PUBLIC_CLARITY_ID` - Microsoft Clarity project ID (optional, disables Clarity if not set)

**Secrets Location:**
- `.env.local` - Local development (NOT committed, should be in .gitignore)
- Vercel Environment Variables - Production (configured in Vercel dashboard UI)

## Data Flow Patterns

**Lead Capture Flow:**
1. User fills contact form on `/contact` page
2. Client-side validation and submission to `/api/contact` (POST)
3. Server validates email format and required fields
4. Supabase insert: Saves to `leads` table
5. Resend email: Sends admin notification to `team@roseyco.com`
6. Resend email: Sends confirmation to user's email
7. Client receives success response, displays confirmation message

**Blog Publishing Flow:**
1. MDX files located in `/migration-content/blog/` (to be migrated)
2. @next/mdx and next-mdx-remote load and parse MDX content
3. gray-matter extracts front matter metadata
4. rehype-pretty-code and shiki provide syntax highlighting
5. Framer Motion adds animations
6. Static generation via ISR (Incremental Static Regeneration)

**Video Loading Flow:**
1. BunnyStream HLS URL set via environment variables
2. Component uses native HTML5 video with HLS source
3. Thumbnail/preview loads immediately (no autoplay)
4. Click-to-play triggers video element rendering
5. HLS stream begins playing on user interaction

## Webhooks & Callbacks

**Incoming:**
- Vercel deployment webhooks (automatic on git push)
- No other incoming webhooks currently configured

**Outgoing:**
- None currently implemented

## Future Integration Points

**Planned (per CLAUDE.md):**
- Mailchimp - Email marketing and CRM (status: planning phase)
- Instagram Feed embed - Social proof (@roseyco.official)
- Google Reviews - Trust signals (not connected)
- Stripe - Payment processing (if adding paid products)

**Optional (to be discussed):**
- Klaviyo - Email marketing alternative
- Voiceflow - AI chatbot (later phase)

---

*Integration audit: 2026-01-23*

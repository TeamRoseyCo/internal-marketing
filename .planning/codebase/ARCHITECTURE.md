# Architecture

**Analysis Date:** 2026-01-23

## Pattern Overview

**Overall:** Next.js 14 App Router with Server Components, Client Components for interactivity, and a Supabase backend for data persistence.

**Key Characteristics:**
- Multi-route application with locale-aware routing (`/us`, `/nl`, `/dk`, `/au`, `/uk`, `/ie`)
- Server-side static generation with ISR (incremental static regeneration) for blog content
- Client-side interactivity using React hooks (useState, useRef, useEffect)
- Framer Motion animations with Lenis smooth scroll
- MDX-based blog with file-system content management
- Lead capture via Supabase + Resend email notifications

## Layers

**Page/Route Layer:**
- Purpose: Define application URLs and page metadata
- Location: `src/app/` and `src/app/[locale]/`
- Contains: Page components (marked with "use client" when interactive), layout wrappers, metadata definitions
- Depends on: Components, libraries, utilities
- Used by: Browser routing

**Component Layer:**
- Purpose: Reusable UI building blocks and feature-specific components
- Location: `src/components/`
- Contains: Layout components (`header`, `footer`), UI primitives (`button`, `input`, `accordion`), feature components (`blog-post-card`, `hero-video-player`), animations, analytics
- Depends on: Next.js primitives (Image, Link), Framer Motion, Radix UI, Lucide icons
- Used by: Pages and other components

**Library Layer:**
- Purpose: Core business logic, data fetching, and utilities
- Location: `src/lib/`
- Contains: Supabase client initialization, blog post file system management, locale configuration, translations, email services, utility functions
- Depends on: Supabase JS SDK, Resend SDK, gray-matter (frontmatter parsing), reading-time
- Used by: Pages, components, API routes

**API Route Layer:**
- Purpose: Server-side request handlers for form submissions and external integrations
- Location: `src/app/api/`
- Contains: Contact form handler (`contact/route.ts`) that saves to Supabase and sends emails
- Depends on: Supabase service client, Resend SDK
- Used by: Client-side form submissions via fetch

## Data Flow

**Lead Capture Flow:**

1. User fills contact form on `/contact` page (client component)
2. Form submission → `POST /api/contact` (Next.js API route)
3. API route validates input and inserts into Supabase `leads` table
4. Email notifications sent via Resend to admin and user
5. Response returned to client (success/error state)

**Blog Content Flow:**

1. MDX files stored in `src/content/blog/{locale}/` (file system)
2. Build time: `getAllPosts()` reads all .mdx files, parses frontmatter with `gray-matter`
3. `getPostBySlug()` retrieves individual post by slug
4. Blog pages render with static generation (`force-static`) + ISR revalidation (1 hour)
5. Locale fallback: English locales (au, uk, ie) fall back to "us" blog content

**Locale Routing Flow:**

1. Request to `/us/`, `/nl/`, `/dk/`, etc. matches `[locale]` dynamic segment
2. Locale validated against `locales.ts` config
3. `generateStaticParams()` generates all locale routes at build time
4. Locale-aware metadata and translations applied via `generateMetadata()`
5. `LocalBusinessStructuredData` component injects location-specific structured data

**Animation Flow:**

1. Framer Motion variants defined inline or in component files
2. Components use `motion.*` wrapper elements with `initial`, `animate`, `whileInView` props
3. Lenis smooth scroll provider wraps layout for page-wide smooth scrolling
4. Intersection observer (via `useInView`) triggers animations on scroll

## Key Abstractions

**BlogPost Management:**
- Purpose: File-system-based blog with frontmatter, categories, reading time
- Examples: `src/lib/blog.ts`, `src/content/blog/us/`, `src/content/blog/nl/`
- Pattern: Filesystem as database; MDX as content format; `gray-matter` for parsing frontmatter
- Locale-aware: Each locale has separate content folder with fallback to "us"

**Locale Configuration:**
- Purpose: Single source of truth for multi-region SEO and localization
- Examples: `src/lib/locales.ts`, `src/lib/translations.ts`
- Pattern: Typed locale config with phone, address, currency, timezone per region
- Usage: Navigation, metadata generation, structured data, email localization

**Supabase Client Factory:**
- Purpose: Separate anon client (client-side, RLS enforced) from service client (server-side, RLS bypassed)
- Examples: `src/lib/supabase.ts`
- Pattern: Browser client uses anon key; API routes use service role key for admin operations
- Security: RLS policies on tables enforce insert-only for lead capture

**Video Player Component:**
- Purpose: BunnyStream video hosting with click-to-play, no autoplay
- Examples: `src/components/video/hero-video-player.tsx`
- Pattern: Preview state with thumbnail + play button; video state loads on click
- Configuration: HLS URL + thumbnails from environment variables

**Structured Data:**
- Purpose: JSON-LD schemas for SEO (Organization, LocalBusiness, FAQs, WebSite)
- Examples: `src/components/seo/structured-data.tsx`
- Pattern: Injected in `<head>` during page render; locale-aware for LocalBusiness

## Entry Points

**Root Layout:**
- Location: `src/app/layout.tsx`
- Triggers: All requests
- Responsibilities: Font loading (DM Sans, Fraunces), global metadata, Header/Footer, LenisProvider, analytics (Google, Clarity, Meta Pixel), structured data

**Home Page:**
- Location: `src/app/page.tsx`
- Triggers: `/` route
- Responsibilities: Hero section with animated counter, services grid, FAQ accordion, CTA sections, Framer Motion animations, stats display

**Locale Root Layout:**
- Location: `src/app/[locale]/layout.tsx`
- Triggers: Requests to `/{locale}/*`
- Responsibilities: Locale validation, locale-specific metadata, LocalBusinessStructuredData injection for region-specific SEO

**Blog Page:**
- Location: `src/app/blog/page.tsx` and `src/app/[locale]/blog/page.tsx`
- Triggers: `/blog` and `/{locale}/blog`
- Responsibilities: Display all blog posts in grid, category filtering, newsletter CTA
- Data: `getAllPosts()` from `src/lib/blog.ts`

**Blog Post Page:**
- Location: `src/app/blog/[slug]/page.tsx` and `src/app/[locale]/blog/[slug]/page.tsx`
- Triggers: `/blog/{slug}` and `/{locale}/blog/{slug}`
- Responsibilities: Render individual blog post content (MDX), related articles, reading time
- Data: `getPostBySlug()` from `src/lib/blog.ts`

**Contact Form:**
- Location: `src/app/contact/page.tsx`
- Triggers: `/contact` route
- Responsibilities: Contact form with client-side state management, service selection, form submission
- API: `POST /api/contact` for lead capture

**Contact API Route:**
- Location: `src/app/api/contact/route.ts`
- Triggers: Form submissions from `/contact` page
- Responsibilities: Validate input, save to Supabase `leads` table, send emails (admin notification + user confirmation)

## Error Handling

**Strategy:** Graceful degradation with fallback behavior.

**Patterns:**
- **Form Validation:** Email regex validation in API route; required field checks
- **Database Errors:** If Supabase insert fails, still attempt to send email notification (lead not lost)
- **Email Failures:** If Resend fails, request still succeeds (lead saved in DB, email attempted)
- **Missing Config:** Environment variables validated in `supabase.ts` and `resend.ts`; missing env throws error on import
- **Blog Fallback:** If locale-specific blog folder doesn't exist, falls back to "us" content
- **Locale Validation:** Invalid locales trigger Next.js `notFound()` page

## Cross-Cutting Concerns

**Logging:** Console.error() for failures in API routes (`src/app/api/contact/route.ts`); client-side video autoplay issues logged silently

**Validation:**
- Email format validation (regex) in API route
- Required field validation (firstName, lastName, email, service, message)
- Locale validation using `isValidLocale()` type guard

**Authentication:**
- Supabase RLS on `leads` table (insert-only for anon key)
- API routes use service role key to bypass RLS
- No user auth system; public lead capture

**SEO:**
- Next.js metadata API (not react-helmet) for page titles, descriptions, OG tags
- JSON-LD structured data for Organization, WebSite, LocalBusiness, FAQs
- Dynamic metadata per locale with country-specific content
- Sitemap and robots.txt generation (Next.js automatic)

**Analytics:**
- Google Analytics (tracking script in root layout)
- Microsoft Clarity (session recording, heatmaps)
- Meta Pixel (conversion tracking, ad targeting)

**Performance:**
- Static generation with ISR for blog (revalidate: 3600 seconds = 1 hour)
- Images via Next.js Image component with remote pattern `**` (all domains)
- Lenis smooth scroll (minimal performance overhead)
- Framer Motion animations use `whileInView` to trigger only when visible

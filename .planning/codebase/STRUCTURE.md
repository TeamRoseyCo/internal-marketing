# Codebase Structure

**Analysis Date:** 2026-01-23

## Directory Layout

```
RoseyCo-Website/
├── src/
│   ├── app/                              # Next.js App Router - page routes
│   │   ├── layout.tsx                    # Root layout (fonts, header, footer, metadata)
│   │   ├── page.tsx                      # Home page (hero, services, FAQ, CTA)
│   │   ├── globals.css                   # Tailwind + design system (colors, animations)
│   │   ├── api/
│   │   │   └── contact/
│   │   │       └── route.ts              # POST handler for contact form submissions
│   │   ├── blog/
│   │   │   ├── page.tsx                  # Blog listing page (all posts grid)
│   │   │   └── [slug]/
│   │   │       └── page.tsx              # Individual blog post page
│   │   ├── contact/
│   │   │   ├── layout.tsx                # Contact page layout wrapper
│   │   │   └── page.tsx                  # Contact form page (client component)
│   │   ├── services/
│   │   │   ├── page.tsx                  # Services overview
│   │   │   ├── seo/
│   │   │   │   ├── layout.tsx            # SEO service layout
│   │   │   │   └── page.tsx              # SEO service page
│   │   │   ├── social-media/
│   │   │   │   ├── layout.tsx            # Social media service layout
│   │   │   │   └── page.tsx              # Social media service page
│   │   │   ├── paid-ads/
│   │   │   │   ├── layout.tsx            # Paid ads service layout
│   │   │   │   └── page.tsx              # Paid ads service page
│   │   │   └── website-design/
│   │   │       ├── layout.tsx            # Website design service layout
│   │   │       └── page.tsx              # Website design service page
│   │   ├── results/
│   │   │   ├── layout.tsx                # Results page layout
│   │   │   └── page.tsx                  # Portfolio/case studies page
│   │   ├── privacy-policy/
│   │   │   └── page.tsx                  # Privacy policy page
│   │   └── [locale]/                     # Dynamic locale segment (us, nl, dk, au, uk, ie)
│   │       ├── layout.tsx                # Locale-specific layout (metadata, structured data)
│   │       ├── page.tsx                  # Locale-specific home
│   │       ├── blog/
│   │       │   ├── page.tsx              # Locale-specific blog listing
│   │       │   └── [slug]/
│   │       │       └── page.tsx          # Locale-specific blog post
│   │       ├── contact/
│   │       ├── services/
│   │       ├── results/
│   │       └── privacy-policy/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── header.tsx                # Navigation header (logo, nav items, mobile menu)
│   │   │   └── footer.tsx                # Site footer (links, contact, copyright)
│   │   ├── ui/                           # shadcn/ui components (primitives)
│   │   │   ├── button.tsx                # Button component
│   │   │   ├── input.tsx                 # Input field
│   │   │   ├── textarea.tsx              # Text area field
│   │   │   ├── label.tsx                 # Form label
│   │   │   ├── accordion.tsx             # Accordion (FAQ, collapsible)
│   │   │   ├── dialog.tsx                # Modal/dialog
│   │   │   ├── card.tsx                  # Card container
│   │   │   ├── badge.tsx                 # Badge/tag
│   │   │   ├── avatar.tsx                # Avatar image
│   │   │   ├── navigation-menu.tsx       # Navigation menu
│   │   │   ├── tooltip.tsx               # Tooltip
│   │   │   ├── scroll-area.tsx           # Scrollable area
│   │   │   ├── separator.tsx             # Visual separator
│   │   │   ├── sheet.tsx                 # Side sheet/drawer
│   │   │   ├── skeleton.tsx              # Loading skeleton
│   │   │   ├── animated-counter.tsx      # Animated number counter
│   │   │   ├── floating-particles.tsx    # Animated background particles
│   │   │   └── # Other UI primitives...
│   │   ├── blog/
│   │   │   ├── blog-hero.tsx             # Blog page hero section
│   │   │   ├── blog-categories.tsx       # Blog category filter
│   │   │   ├── blog-post-card.tsx        # Individual post card in grid
│   │   │   ├── newsletter-cta.tsx        # Newsletter signup CTA
│   │   │   ├── related-articles.tsx      # Related posts sidebar
│   │   │   ├── locale-blog-hero.tsx      # Locale-specific blog hero
│   │   │   ├── locale-blog-categories.tsx # Locale-specific categories
│   │   │   └── locale-newsletter-cta.tsx # Locale-specific newsletter
│   │   ├── video/
│   │   │   └── hero-video-player.tsx     # BunnyStream video player (click-to-play)
│   │   ├── animations/
│   │   │   ├── fade-in.tsx               # Framer Motion fade-in component
│   │   │   ├── page-transition.tsx       # Page transition animation
│   │   │   └── stagger-children.tsx      # Staggered animation wrapper
│   │   ├── seo/
│   │   │   └── structured-data.tsx       # JSON-LD schemas (Organization, LocalBusiness, FAQ)
│   │   ├── analytics/
│   │   │   ├── google-analytics.tsx      # Google Analytics tracking script
│   │   │   ├── microsoft-clarity.tsx     # Microsoft Clarity script
│   │   │   └── meta-pixel.tsx            # Meta Pixel (Facebook) script
│   │   ├── providers/
│   │   │   └── lenis-provider.tsx        # Smooth scroll provider
│   │   └── mdx/
│   │       └── mdx-components.tsx        # MDX renderers (custom heading, link, code blocks)
│   ├── lib/
│   │   ├── supabase.ts                   # Supabase client (anon + service role)
│   │   ├── blog.ts                       # Blog file system logic (getAllPosts, getPostBySlug, etc.)
│   │   ├── blog-helpers.ts               # Blog utility functions
│   │   ├── locales.ts                    # Locale configuration (us, nl, dk, au, uk, ie)
│   │   ├── translations.ts               # Multi-language translations
│   │   ├── page-translations.ts          # Page-specific translations
│   │   ├── resend.ts                     # Resend email client
│   │   └── utils.ts                      # Utility functions (cn for class merging)
│   └── content/
│       └── blog/
│           ├── us/                       # US blog posts (English)
│           │   └── *.mdx                 # Blog post files with frontmatter
│           ├── nl/                       # Dutch blog posts
│           │   └── *.mdx
│           ├── dk/                       # Danish blog posts
│           │   └── *.mdx
│           ├── au/                       # Australian blog posts (English, falls back to US)
│           │   └── *.mdx
│           ├── uk/                       # UK blog posts (English, falls back to US)
│           │   └── *.mdx
│           └── ie/                       # Irish blog posts (English, falls back to US)
│               └── *.mdx
├── public/
│   ├── images/                           # Static images
│   ├── ROSEYCO/                          # Logo assets
│   ├── manifest.json                     # PWA manifest
│   └── # Other static assets
├── migration-content/                    # Legacy content from old site (to migrate)
│   ├── blog-posts/                       # Old blog posts
│   ├── blog-images/                      # Old blog images
│   ├── guides/                           # Free downloadable guides
│   ├── pages/                            # Old page content
│   └── supabase-functions/               # Old Edge Functions
├── docs/                                 # Documentation
├── .planning/
│   └── codebase/                         # GSD analysis documents
├── scripts/                              # Utility scripts
├── package.json                          # Dependencies
├── tsconfig.json                         # TypeScript config
├── next.config.mjs                       # Next.js config (MDX support)
├── tailwind.config.ts                    # Tailwind CSS config
├── postcss.config.mjs                    # PostCSS config
├── .eslintrc.json                        # ESLint config
├── .env.local                            # Environment variables (NOT COMMITTED)
└── CLAUDE.md                             # Project instructions

```

## Directory Purposes

**`src/app/`:**
- Purpose: Next.js App Router pages and routes
- Contains: Page components (`.tsx`), layouts, API routes, dynamic segments
- Key files: `layout.tsx` (root), `page.tsx` (pages), `[slug]/page.tsx` (dynamic)
- Pattern: Matches file structure to URL routes

**`src/components/`:**
- Purpose: Reusable UI components organized by feature/domain
- Contains: Buttons, forms, cards, animations, layouts, MDX components
- Pattern: Barrel files optional; direct imports also used
- Subdirectories: `ui/` (primitives), `layout/` (header/footer), `blog/` (post-specific), `seo/`, `analytics/`, `providers/`, `video/`, `animations/`

**`src/lib/`:**
- Purpose: Business logic, utilities, client libraries, configuration
- Contains: Supabase client, blog file system logic, locale/translation config, email service
- Pattern: Pure functions; factory patterns for clients; typed interfaces
- Usage: Imported by pages and components

**`src/content/blog/`:**
- Purpose: Markdown content files (MDX) for blog posts
- Contains: `.mdx` files organized by locale subdirectories
- Naming: Files become URL slugs (e.g., `my-post.mdx` → `/blog/my-post`)
- Frontmatter: YAML at top of each file with title, excerpt, category, date, author, image, tags

**`public/`:**
- Purpose: Static assets served directly (no processing)
- Contains: Images, logos, manifest.json, favicon
- Pattern: Use Next.js `Image` component for optimization; static assets via direct paths

**`migration-content/`:**
- Purpose: Legacy content from old site (TO MIGRATE)
- Contains: Old blog posts, images, guides, page content, old Supabase functions
- Status: Not included in TypeScript compilation (excluded in `tsconfig.json`)
- Action: Copy and adapt content to new format

## Key File Locations

**Entry Points:**
- `src/app/layout.tsx`: Root layout (fonts, Header, Footer, metadata, providers)
- `src/app/page.tsx`: Home page
- `src/app/api/contact/route.ts`: Contact form API endpoint

**Configuration:**
- `src/app/globals.css`: All Tailwind styles + design system (colors, fonts, animations)
- `src/lib/locales.ts`: Locale configuration (phone, address, timezone, currency per region)
- `next.config.mjs`: Next.js config (MDX support, image optimization)
- `tsconfig.json`: TypeScript config with path alias `@/*` → `src/*`

**Core Logic:**
- `src/lib/blog.ts`: Blog post management (read from file system)
- `src/lib/supabase.ts`: Supabase client initialization
- `src/lib/translations.ts`: Multi-language string translations

**Testing:**
- Not implemented (no test files found)

## Naming Conventions

**Files:**
- **Pages:** `page.tsx` (required by App Router)
- **Layouts:** `layout.tsx` (required by App Router)
- **Components:** PascalCase with `.tsx` extension (e.g., `HeroVideoPlayer`, `BlogPostCard`)
- **Utilities/Helpers:** camelCase with `.ts` extension (e.g., `blog.ts`, `utils.ts`)
- **Styles:** Tailwind CSS in `globals.css` and inline `className` attributes

**Directories:**
- **Feature folders:** Lowercase, plural when containing multiple related files (e.g., `components/`, `animations/`, `blog/`)
- **Route folders:** Lowercase, match URL segments exactly (e.g., `services/`, `contact/`, `api/`)
- **Dynamic segments:** Bracket notation (e.g., `[locale]`, `[slug]`)

## Where to Add New Code

**New Feature (Page + Components + Logic):**
1. **Primary code:**
   - Page: `src/app/{feature}/page.tsx`
   - Layout if needed: `src/app/{feature}/layout.tsx`
   - Components: `src/components/{feature}/{component-name}.tsx`
2. **Logic:** `src/lib/{feature}.ts` if needed
3. **Tests:** None currently in place (create `src/app/{feature}/{name}.test.tsx` if adding)

**New Component/Module:**
- **Shared UI component:** `src/components/ui/{component-name}.tsx`
- **Feature-specific component:** `src/components/{feature}/{component-name}.tsx`
- **Layout component:** `src/components/layout/{component-name}.tsx`
- **Animation wrapper:** `src/components/animations/{animation-name}.tsx`

**Utilities:**
- **Shared helpers:** `src/lib/utils.ts` (simple utilities like `cn()`)
- **Domain-specific helpers:** `src/lib/{domain}.ts` (e.g., `blog.ts`, `locales.ts`)
- **Export from `src/lib/index.ts`** if creating a new helper module (optional, but improves discoverability)

**Blog Content:**
- **New post (US):** `src/content/blog/us/{slug}.mdx`
- **Locale-specific post:** `src/content/blog/{locale}/{slug}.mdx`
- **Post format:** YAML frontmatter at top, then Markdown/MDX content

**API Route:**
- **New endpoint:** `src/app/api/{feature}/route.ts`
- **Multiple HTTP methods:** Export `POST`, `GET`, `PUT`, `DELETE` functions from same file
- **Server-only logic:** Use Supabase service client in API routes

## Special Directories

**`.planning/codebase/`:**
- Purpose: GSD (Get Stuff Done) analysis documents
- Generated: Yes (by Claude analysis agent)
- Committed: Yes
- Contents: ARCHITECTURE.md, STRUCTURE.md, CONVENTIONS.md, TESTING.md, CONCERNS.md

**`migration-content/`:**
- Purpose: Legacy content to migrate from old site
- Generated: No (copied from old system)
- Committed: Yes
- Status: Not compiled; reference only

**`.next/`:**
- Purpose: Next.js build output
- Generated: Yes (by `npm run build`)
- Committed: No (in .gitignore)

**`node_modules/`:**
- Purpose: Installed dependencies
- Generated: Yes (by `npm install`)
- Committed: No

**`public/`:**
- Purpose: Static assets
- Generated: No (manually added)
- Committed: Yes
- Accessible at: `/images/*`, `/manifest.json`, etc.

## Quick Navigation Guide

**I need to modify...**

- **Home page content/design** → `src/app/page.tsx`
- **Navigation/header** → `src/components/layout/header.tsx`
- **Global styles/colors** → `src/app/globals.css`
- **Blog post display** → `src/components/blog/blog-post-card.tsx`
- **Blog listing page** → `src/app/blog/page.tsx`
- **Add a blog post** → Create `.mdx` file in `src/content/blog/us/`
- **Service pages** → `src/app/services/{service}/page.tsx`
- **Contact form** → `src/app/contact/page.tsx`
- **Contact form backend** → `src/app/api/contact/route.ts`
- **Locale configuration** → `src/lib/locales.ts`
- **Supabase setup** → `src/lib/supabase.ts`
- **Animations/Framer Motion** → `src/components/animations/` or inline in components
- **Video player** → `src/components/video/hero-video-player.tsx`
- **SEO/structured data** → `src/components/seo/structured-data.tsx`
- **Analytics** → `src/components/analytics/`

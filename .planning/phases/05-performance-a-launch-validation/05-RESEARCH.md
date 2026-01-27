# Phase 5: Performance & Launch Validation - Research

**Researched:** 2026-01-27
**Domain:** Next.js 14 Performance Optimization, Core Web Vitals, Google Business Profile Integration
**Confidence:** HIGH

## Summary

This research covers the technical implementation requirements for achieving Lighthouse scores of 90+ across all metrics (Performance, Accessibility, Best Practices, SEO) and coordinating Google Business Profile integration for 6 locales. The site is built on Next.js 14 with App Router, using Framer Motion animations, Lenis smooth scroll, and BunnyStream video hosting.

**Current State Analysis:**
- Next.js 14 with proper next/font optimization already implemented (DM Sans + Fraunces)
- Analytics components exist but use `afterInteractive` strategy (appropriate for GA4 and Clarity)
- Blog post images use Next.js Image component with proper `sizes` attribute
- LocalBusiness structured data exists for all 6 locales with NAP information
- No images currently use `priority`/`preload` prop (critical gap for hero sections)

**Key Findings:**
1. **Next.js 16 Breaking Change:** The `priority` prop has been deprecated in favor of `preload` for Next.js 16 (current project uses Next.js 14, so `priority` is still correct)
2. **INP Replaced FID:** Core Web Vitals metrics changed in March 2024 - now LCP, INP, CLS (not FID)
3. **Production vs Local Testing:** Lighthouse scores vary significantly between local and production environments due to CPU, network, and caching differences
4. **NAP Consistency Critical:** Exact matching of Name, Address, Phone across website, GBP, and all citations is non-negotiable for local SEO in 2026
5. **Framer Motion Optimization:** Must use `layoutId` for shared transitions and `useInView` for lazy animation loading

**Primary recommendation:** Implement image optimization with priority loading for hero sections, optimize analytics script loading strategies, audit and fix CLS issues from animations, then coordinate GBP setup with Bailey using existing NAP data from `locales.ts`.

## Standard Stack

The project already uses the optimal stack for achieving 90+ Lighthouse scores:

### Core (Already Implemented)
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Next.js | 14.2.35 | React framework | Built-in optimizations (code splitting, image/font optimization, SSG/SSR) |
| next/image | Built-in | Image optimization | Automatic WebP/AVIF conversion, lazy loading, responsive sizes |
| next/font | Built-in | Font optimization | Self-hosting, zero layout shift, automatic subsetting |
| next/script | Built-in | Script management | Controlled loading strategies (afterInteractive, lazyOnload) |
| Framer Motion | 12.23.26 | Animations | Industry standard for React animations with performance optimizations |
| Lenis | 1.3.16 | Smooth scroll | Lightweight (2KB gzipped), high performance smooth scroll library |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| BunnyStream | N/A | Video hosting | Adaptive HLS streaming, automatic transcoding, zero CWV impact |
| @tanstack/react-query | 5.90.12 | Data fetching | Already in project, cache management for API calls |
| Vercel Analytics | Built-in | RUM monitoring | Zero-config Core Web Vitals tracking in production |

### Testing Tools
| Tool | Purpose | When to Use |
|------|---------|-------------|
| Lighthouse CI | Automated testing | Run in CI/CD pipeline on every deployment |
| Chrome DevTools Lighthouse | Local testing | Development iteration, initial diagnostics |
| PageSpeed Insights | Production testing | Test deployed URLs, real Chrome UX Report data |
| WebPageTest | Detailed analysis | Deep performance debugging, waterfall analysis |

**Installation:**
```bash
# Project already has all runtime dependencies
# Add Lighthouse CI for automated testing
npm install --save-dev @lhci/cli
```

## Architecture Patterns

### Recommended Performance Testing Structure
```
.lighthouserc.js           # Lighthouse CI configuration
scripts/
├── lighthouse/
│   ├── test-local.sh      # Run Lighthouse on local build
│   └── test-production.sh # Run Lighthouse on production URLs
.planning/phases/05-performance-a-launch-validation/
├── lighthouse-reports/    # Store baseline reports
│   ├── baseline-us.json
│   ├── baseline-nl.json
│   └── baseline-dk.json
└── optimization-log.md    # Track improvements over time
```

### Pattern 1: Hero Image Priority Loading
**What:** Mark above-the-fold images for immediate preloading
**When to use:** Hero sections, LCP elements (typically largest image above fold)
**Implementation Note:** Project uses Next.js 14, so use `priority` not `preload`

**Example:**
```typescript
// Source: https://nextjs.org/docs/app/api-reference/components/image
// For Next.js 14 (current project version)
import Image from 'next/image'

export function Hero() {
  return (
    <Image
      src="/hero-background.jpg"
      alt="Hero background"
      width={1920}
      height={1080}
      priority={true}  // ✅ Use priority in Next.js 14
      sizes="100vw"
      className="object-cover"
    />
  )
}

// Note: Next.js 16+ uses preload={true} instead
// When upgrading to Next.js 16, change priority to preload
```

**Confidence:** HIGH - Official Next.js documentation

### Pattern 2: Script Loading Strategy Optimization
**What:** Control when third-party scripts load to minimize main thread blocking
**When to use:** All external scripts (analytics, tracking, chat widgets)

**Current Implementation Analysis:**
```typescript
// src/components/analytics/google-analytics.tsx (CURRENT)
<Script
  src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
  strategy="afterInteractive"  // ✅ CORRECT - loads after hydration
/>

// src/components/analytics/microsoft-clarity.tsx (CURRENT)
<Script
  id="microsoft-clarity"
  strategy="afterInteractive"  // ✅ CORRECT for immediate analytics
  // Could use lazyOnload if lower priority acceptable
/>
```

**Recommendation:** Current strategy is optimal. Consider `lazyOnload` for Clarity if analytics immediacy isn't critical.

**Strategy Decision Matrix:**
| Strategy | Loading Time | Use For | Impact on Lighthouse |
|----------|--------------|---------|---------------------|
| `beforeInteractive` | Before Next.js code | Critical scripts only (consent banners) | Can hurt Performance score if heavy |
| `afterInteractive` (default) | After hydration starts | Analytics, tag managers | Minimal impact if scripts are light |
| `lazyOnload` | Browser idle time | Low-priority widgets (chat, social) | No impact on Performance score |

**Source:** https://nextjs.org/docs/app/api-reference/components/script

**Confidence:** HIGH - Official Next.js documentation, current implementation already optimal

### Pattern 3: Core Web Vitals Optimization
**What:** Achieve target thresholds for LCP, INP, CLS
**Target Metrics (2026 Standards):**
- LCP (Largest Contentful Paint): < 2.5 seconds
- INP (Interaction to Next Paint): < 200 milliseconds (replaced FID in March 2024)
- CLS (Cumulative Layout Shift): < 0.1

**Implementation Strategies:**

**LCP Optimization:**
```typescript
// 1. Priority loading for hero images (see Pattern 1)
// 2. Preload critical resources in layout.tsx
export default function RootLayout() {
  return (
    <html>
      <head>
        <link
          rel="preload"
          href="/fonts/dm-sans-v11-latin-regular.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        {/* next/font already handles this automatically */}
      </head>
      <body>...</body>
    </html>
  )
}

// 3. Optimize BunnyStream video (already handled by adaptive streaming)
// 4. Use Next.js Image component with priority (NOT priority for LCP images)
```

**INP Optimization (Replaces FID):**
```typescript
// 1. Code splitting with next/dynamic
import dynamic from 'next/dynamic'

const HeavyComponent = dynamic(
  () => import('@/components/heavy-component'),
  {
    loading: () => <Skeleton />,
    ssr: false // Client-side only if no SSR needed
  }
)

// 2. Debounce expensive event handlers
import { useCallback } from 'react'
import { debounce } from 'lodash-es'

const handleSearch = useCallback(
  debounce((value: string) => {
    // Expensive search operation
  }, 300),
  []
)

// 3. Use Framer Motion's willChange prop sparingly
<motion.div
  animate={{ x: 100 }}
  // Don't use willChange: true unless truly necessary
/>
```

**CLS Optimization:**
```typescript
// 1. Always set width/height on images
<Image
  src="/image.jpg"
  alt="Description"
  width={800}  // ✅ Explicit dimensions prevent layout shift
  height={600}
  sizes="(max-width: 768px) 100vw, 50vw"
/>

// 2. Reserve space for dynamic content
<div className="min-h-[200px]">
  {loading ? <Skeleton /> : <Content />}
</div>

// 3. Use font-display: swap with next/font (already configured)
const dmSans = DM_Sans({
  display: 'swap', // ✅ Already correct in layout.tsx
  subsets: ['latin'],
})

// 4. Avoid inserting content above existing content
// BAD: Unshift items into visible list
// GOOD: Append items or use virtual scrolling
```

**Source:** https://web.dev/articles/vitals, https://developers.google.com/search/docs/appearance/core-web-vitals

**Confidence:** HIGH - Official Google documentation, industry standard practices

### Pattern 4: Framer Motion Performance Optimization
**What:** Minimize animation performance impact using Framer Motion best practices
**Current Usage Analysis:**
- Extensive use of `motion` components in `page-client.tsx`
- AnimatedCounter uses `requestAnimationFrame` (✅ good)
- `useInView` hook used for scroll-triggered animations (✅ good)

**Optimization Patterns:**
```typescript
// 1. Use layoutId for shared element transitions (NOT manual animations)
<motion.div layoutId="shared-element">
  {/* Content */}
</motion.div>

// 2. Lazy load animations with useInView
import { useInView } from 'framer-motion'

function AnimatedSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, {
    once: true,        // ✅ Animate only once
    margin: '-100px'   // ✅ Trigger before element fully visible
  })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
    />
  )
}

// 3. Use 'use client' directive (already done)
// Framer Motion requires client-side execution in Next.js 14

// 4. Avoid over-optimization with willChange
// Only use willChange: true for truly dynamic animations
<motion.div
  whileHover={{ scale: 1.05 }}
  // Don't use willChange prop here - browser optimizes automatically
/>

// 5. Keep exit animations short
<AnimatePresence mode="wait">
  <motion.div
    exit={{ opacity: 0 }}
    transition={{ duration: 0.2 }} // ✅ Short exit
  />
</AnimatePresence>
```

**Source:** https://motion.dev/, https://medium.com/@nattupi/why-lenis-smooth-scroll-needs-to-become-a-browser-standard-62bed416c987

**Confidence:** MEDIUM - Community best practices, not official docs

### Pattern 5: Lenis Smooth Scroll Integration
**What:** Optimize Lenis for performance without sacrificing smooth scrolling
**Current Status:** LenisProvider wraps entire app in root layout

**Optimization Checklist:**
```typescript
// src/components/providers/lenis-provider.tsx (CHECK)

// 1. Use autoRaf: true (if available in version 1.3.16)
const lenis = new Lenis({
  autoRaf: true,  // Handles requestAnimationFrame automatically
  lerp: 0.1,      // Smoothness factor (0.1 = smooth, 1 = instant)
  smoothWheel: true,
  wheelMultiplier: 1,
  touchMultiplier: 2,
})

// 2. Stop/start based on visibility
useEffect(() => {
  const handleVisibility = () => {
    if (document.hidden) {
      lenis.stop()
    } else {
      lenis.start()
    }
  }

  document.addEventListener('visibilitychange', handleVisibility)
  return () => document.removeEventListener('visibilitychange', handleVisibility)
}, [lenis])

// 3. Integrate with GSAP ScrollTrigger if used
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

lenis.on('scroll', ScrollTrigger.update)
gsap.ticker.add((time) => {
  lenis.raf(time * 1000)
})
gsap.ticker.lagSmoothing(0) // Disable lag smoothing
```

**Performance Impact:** Minimal if implemented correctly (~2KB gzipped). May add 1-2 points to Lighthouse Performance score due to extra JavaScript.

**Source:** https://github.com/darkroomengineering/lenis, https://devdreaming.com/blogs/nextjs-smooth-scrolling-with-lenis-gsap

**Confidence:** MEDIUM - Community best practices, Lenis documentation

### Pattern 6: BunnyStream Video Optimization
**What:** Ensure video hosting doesn't impact Core Web Vitals
**Current Implementation:** Hero VSL uses BunnyStream with HLS adaptive streaming

**Performance Benefits:**
- Adaptive streaming automatically adjusts quality based on connection (✅)
- Videos transcoded at build time to multiple resolutions (360p-4K) (✅)
- HLS protocol ensures optimal quality-to-file-size ratio (✅)
- No impact on LCP if video loads below fold or after user interaction (✅)

**Optimization Checklist:**
```typescript
// src/components/video/hero-video-player.tsx (VERIFY)

// 1. Lazy load video player if below fold
import dynamic from 'next/dynamic'

const VideoPlayer = dynamic(
  () => import('./video-player-component'),
  {
    loading: () => <VideoPosterImage />,
    ssr: false // Videos don't need SSR
  }
)

// 2. Use poster image with priority if video is hero element
<Image
  src="/video-poster.jpg"
  alt="Video preview"
  priority={true}  // ✅ If video is LCP element, poster should have priority
  fill
/>

// 3. Preconnect to BunnyStream CDN
// Add to layout.tsx <head>
<link rel="preconnect" href="https://vz-{library-id}.b-cdn.net" />
<link rel="dns-prefetch" href="https://vz-{library-id}.b-cdn.net" />
```

**Source:** https://bunny.net/blog/better-streaming-insights-with-new-stream-metrics/, https://docs.bunny.net/docs/stream-dashboard-overview

**Confidence:** MEDIUM - BunnyStream documentation, general CDN best practices

### Anti-Patterns to Avoid

**❌ Anti-Pattern 1: Testing Lighthouse Only Locally**
- **Why it's bad:** Local tests are influenced by CPU, network speed, browser cache, open tabs
- **What to do instead:** Test on production URLs with PageSpeed Insights, use Lighthouse CI in GitHub Actions
- **Source:** https://alokai.com/blog/youre-probably-using-lighthouse-wrong

**❌ Anti-Pattern 2: Optimizing for 100 Score**
- **Why it's bad:** Diminishing returns - going from 96 to 100 requires same effort as 90 to 94 due to log-normal scoring
- **What to do instead:** Target 90+ on all metrics, focus on real user metrics (RUM) via Vercel Analytics
- **Source:** https://www.debugbear.com/blog/lighthouse-performance-audits

**❌ Anti-Pattern 3: Using priority on Multiple Images**
- **Why it's bad:** Negates the benefit - browser can't prioritize everything
- **What to do instead:** Only use priority on the single LCP image per page (typically hero image)
- **Source:** https://nextjs.org/docs/app/api-reference/components/image

**❌ Anti-Pattern 4: Loading All Analytics with beforeInteractive**
- **Why it's bad:** Blocks page hydration, kills Performance score
- **What to do instead:** Use afterInteractive for analytics, lazyOnload for non-critical widgets
- **Source:** https://nextjs.org/docs/app/api-reference/components/script

**❌ Anti-Pattern 5: Hand-Rolling Smooth Scroll**
- **Why it's bad:** Easy to create janky, performance-killing implementations
- **What to do instead:** Use battle-tested libraries like Lenis (2KB) or native CSS scroll-behavior: smooth
- **Source:** https://medium.com/@nattupi/why-lenis-smooth-scroll-needs-to-become-a-browser-standard-62bed416c987

## Don't Hand-Roll

Problems that look simple but have existing solutions:

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Image optimization | Custom lazy loading, WebP conversion | next/image | Automatic format conversion, responsive sizes, lazy loading, prevents CLS |
| Font loading | Manual font subsetting, custom loader | next/font | Self-hosting, automatic subsetting, zero layout shift, preloading |
| Script loading | Manual async/defer script tags | next/script | Controlled loading strategies, proper hydration timing |
| Smooth scroll | Custom requestAnimationFrame loop | Lenis or CSS scroll-behavior | Battle-tested, handles edge cases, optimized performance |
| Video streaming | Manual HLS.js integration | BunnyStream + native video | Adaptive streaming, transcoding, CDN delivery handled |
| Performance monitoring | Custom RUM implementation | Vercel Analytics / Google Analytics | Zero-config, industry-standard metrics, historical data |
| Lighthouse testing | Manual Chrome DevTools runs | Lighthouse CI + GitHub Actions | Automated, consistent, tracked over time |

**Key insight:** Next.js provides world-class optimizations out of the box. The challenge is not building custom solutions, but properly configuring existing tools and avoiding common pitfalls that negate these optimizations.

## Common Pitfalls

### Pitfall 1: Local vs Production Performance Discrepancy
**What goes wrong:** Lighthouse scores 95+ locally but 70-80 in production
**Why it happens:**
- Local development uses fast developer hardware (M1/M2 Macbooks, high-end PCs)
- Local tests benefit from warm cache, no network latency
- Production serves to users on slow mobile devices with 3G/4G connections
- PageSpeed Insights uses mobile throttling (slow 4G, mid-tier mobile CPU)

**How to avoid:**
1. Always test production URLs with PageSpeed Insights (https://pagespeed.web.dev/)
2. Use Chrome DevTools device throttling (Slow 4G, 4x CPU slowdown)
3. Test on real mobile devices when possible
4. Set up Vercel Analytics for real user metrics (RUM)
5. Use Lighthouse CI with mobile configuration in GitHub Actions

**Warning signs:**
- Large gap between local and production Lighthouse scores
- Users reporting slow load times despite good local performance
- Mobile scores significantly lower than desktop scores

**Source:** https://developers.google.com/web/tools/lighthouse/variability, https://www.debugbear.com/blog/why-is-my-lighthouse-score-different-from-pagespeed-insights

**Confidence:** HIGH - Official Google documentation

### Pitfall 2: Cumulative Layout Shift from Animations
**What goes wrong:** Framer Motion animations cause CLS score to tank
**Why it happens:**
- Animating height/width without reserving space
- Loading content that pushes existing content down
- Fonts loading late causing text reflow
- Images without explicit dimensions

**How to avoid:**
1. Use `initial` and `animate` props that don't change layout (opacity, scale, transform)
2. Reserve space with min-height for content that animates in
3. Use `layout` prop for Framer Motion layout animations (FLIP animation)
4. Ensure next/font is configured with `display: 'swap'` (already done in project)
5. Always set width/height on images

**Example Fix:**
```typescript
// ❌ BAD - Causes CLS
<motion.div
  initial={{ height: 0 }}
  animate={{ height: 'auto' }}
>
  {content}
</motion.div>

// ✅ GOOD - No CLS
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  className="min-h-[200px]" // Reserve space
>
  {content}
</motion.div>
```

**Warning signs:**
- CLS score > 0.1 in Lighthouse
- "Avoid large layout shifts" warning in Lighthouse report
- Content jumping as page loads

**Source:** https://web.dev/articles/vitals#layout_shift, Framer Motion documentation

**Confidence:** HIGH - Official Web Vitals documentation, community best practices

### Pitfall 3: NAP Inconsistency Across Locales
**What goes wrong:** Google Business Profile doesn't link to website or local rankings tank
**Why it happens:**
- Phone numbers formatted differently on site vs GBP (e.g., +31 vs 0031)
- Address variations (Street vs St., Suite 100 vs Ste 100)
- Business name inconsistencies (Rosey Co. vs RoseyCo vs Rosey Co)
- Using placeholder contact info that doesn't match GBP

**How to avoid:**
1. Create single source of truth for NAP data (already done: `src/lib/locales.ts`)
2. Use exact same formatting in structured data, footer, contact page, and GBP
3. Coordinate with Bailey before setting up GBP to ensure data matches
4. Document NAP format rules (e.g., always use international format for phone)
5. Audit NAP consistency before GBP verification

**Verification Checklist:**
```typescript
// src/lib/locales.ts (AUDIT)
export const locales = {
  us: {
    phone: '+1 (XXX) XXX-XXXX',      // Must match GBP exactly
    address: 'Full Address, City, State ZIP', // Must match GBP exactly
    // ...
  },
}

// Check these files for consistency:
// 1. src/components/seo/structured-data.tsx (LocalBusinessStructuredData)
// 2. src/components/layout/footer.tsx (contact info display)
// 3. src/app/[locale]/contact/page.tsx (contact form display)
// 4. Google Business Profile (setup with Bailey)
```

**Warning signs:**
- GBP verification fails or takes multiple attempts
- Website not showing in GBP listing despite being added
- Local search rankings not improving despite GBP setup
- Google Search Console warnings about structured data

**Source:** https://yourstagingwebsite.xyz/why-nap-consistency-is-the-secret-to-dominating-google-business-profile-rankings-in-2026/, https://www.jasminedirectory.com/blog/nap-consistency-why-its-necessary-for-your-business-directory-listings-local-rank/

**Confidence:** HIGH - Industry best practices, local SEO fundamentals

### Pitfall 4: Third-Party Script Performance Regression
**What goes wrong:** Perfect Lighthouse scores drop after adding analytics/tracking scripts
**Why it happens:**
- Scripts loaded with wrong strategy (beforeInteractive for non-critical scripts)
- Multiple analytics tools all loading at once
- Tag managers loading dozens of scripts (GTM with many tags)
- Scripts without proper error handling causing main thread blocking

**How to avoid:**
1. Audit current scripts in root layout (done: GA, Clarity, MetaPixel all use afterInteractive ✅)
2. Use `lazyOnload` for non-critical scripts (chat widgets, social embeds)
3. Limit number of third-party scripts (each adds 5-10 points of Performance cost)
4. Consider consolidating through Google Tag Manager (but monitor performance)
5. Use Script component's `onLoad` to verify scripts loaded successfully

**Performance Budget:**
```typescript
// Recommended script priority (already implemented correctly)
beforeInteractive:  Cookie consent only (if needed before page load)
afterInteractive:   GA4, Clarity, critical tracking (2-3 scripts max)
lazyOnload:         Chat widgets, social feeds, non-critical tracking

// Each script approximate cost:
// - Small script (GA4, Clarity): ~5-10 Lighthouse points
// - Medium script (GTM with tags): ~10-15 points
// - Large script (chat widget): ~15-20 points
```

**Warning signs:**
- Lighthouse Performance score drops after adding new script
- "Reduce JavaScript execution time" warning in Lighthouse
- Main thread blocking visible in Performance tab
- Scripts loading before user interaction

**Source:** https://nextjs.org/docs/app/api-reference/components/script, https://medium.com/@victorhcharry/short-how-to-integrate-google-analytics-and-microsoft-clarity-with-nextjs-6174952f218c

**Confidence:** HIGH - Next.js official documentation, current implementation already optimal

### Pitfall 5: Image Sizes Misconfiguration
**What goes wrong:** Next.js Image component downloads massive images on mobile
**Why it happens:**
- Missing or incorrect `sizes` attribute
- Using default `sizes="100vw"` when image is smaller
- Not accounting for multi-column layouts in sizes calculation

**How to avoid:**
1. Always specify `sizes` attribute based on actual rendered size
2. Use responsive sizes for different breakpoints
3. Test image downloads in Network tab on mobile viewport
4. Use Chrome DevTools to see which image size is downloaded

**Correct Sizes Examples:**
```typescript
// Full-width hero image
<Image
  src="/hero.jpg"
  sizes="100vw"  // ✅ Correct - full viewport width
  fill
/>

// Blog post card in 3-column grid
<Image
  src="/blog-post.jpg"
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
  // Mobile: full width, Tablet: 50%, Desktop: 33%
  fill
/>

// Fixed-width avatar
<Image
  src="/avatar.jpg"
  sizes="100px"  // ✅ Correct - fixed size
  width={100}
  height={100}
/>
```

**Current Implementation Check:**
```typescript
// src/components/blog/blog-post-card.tsx (ALREADY CORRECT ✅)
<Image
  src={post.image}
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
  fill
/>
```

**Warning signs:**
- Large image downloads on mobile (check Network tab)
- "Properly size images" warning in Lighthouse
- Slow LCP on mobile but fast on desktop

**Source:** https://nextjs.org/docs/app/api-reference/components/image, https://www.debugbear.com/blog/nextjs-image-optimization

**Confidence:** HIGH - Next.js official documentation, project already implements correctly

## Code Examples

Verified patterns from official sources and current codebase:

### Hero Image with Priority Loading
```typescript
// For above-the-fold hero images (LCP element)
// Note: Project uses Next.js 14, so use priority (not preload)
import Image from 'next/image'

export function HeroSection() {
  return (
    <section className="relative h-screen">
      <Image
        src="/hero-background.jpg"
        alt="Hero background"
        fill
        priority={true}  // ✅ Marks as high priority for preloading
        sizes="100vw"    // ✅ Full viewport width
        className="object-cover"
        quality={90}     // Optional: Higher quality for hero (default 75)
      />
      <div className="relative z-10">
        <h1>Hero Content</h1>
      </div>
    </section>
  )
}
```
**Source:** https://nextjs.org/docs/app/api-reference/components/image
**Confidence:** HIGH - Official Next.js documentation

### Optimized Analytics Loading
```typescript
// src/components/analytics/google-analytics.tsx (CURRENT - OPTIMAL)
import Script from 'next/script'

export function GoogleAnalytics() {
  const GA_ID = process.env.NEXT_PUBLIC_GA_ID
  if (!GA_ID) return null

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"  // ✅ Loads after hydration starts
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_ID}');
        `}
      </Script>
    </>
  )
}

// Alternative: Use lazyOnload for lower priority
export function MicrosoftClarity() {
  const CLARITY_ID = process.env.NEXT_PUBLIC_CLARITY_ID
  if (!CLARITY_ID) return null

  return (
    <Script
      id="microsoft-clarity"
      strategy="lazyOnload"  // ⚡ Loads during browser idle time
    >
      {`
        (function(c,l,a,r,i,t,y){
          c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
          t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
          y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
        })(window, document, "clarity", "script", "${CLARITY_ID}");
      `}
    </Script>
  )
}
```
**Source:** https://nextjs.org/docs/app/api-reference/components/script
**Confidence:** HIGH - Current implementation already optimal

### CLS-Free Animation Pattern
```typescript
// Animate without causing layout shift
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

export function AnimatedCard() {
  const ref = useRef(null)
  const isInView = useInView(ref, {
    once: true,      // ✅ Animate only once
    margin: '-50px'  // ✅ Trigger slightly before fully visible
  })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}      // ✅ Transform doesn't cause CLS
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="min-h-[200px]"            // ✅ Reserve space prevents CLS
    >
      <h2>Card Title</h2>
      <p>Card content...</p>
    </motion.div>
  )
}

// ❌ BAD - Causes CLS
// animate={{ height: 'auto' }}  // Changing height = layout shift
```
**Source:** https://www.framer.com/motion/, Framer Motion best practices
**Confidence:** MEDIUM - Community best practices

### Dynamic Import for Heavy Components
```typescript
// Reduce initial JavaScript bundle with code splitting
import dynamic from 'next/dynamic'

// Lazy load heavy component (e.g., chart library, rich text editor)
const ChartComponent = dynamic(
  () => import('@/components/charts/complex-chart'),
  {
    loading: () => (
      <div className="h-[400px] animate-pulse bg-muted rounded-lg" />
    ),
    ssr: false // Skip SSR if component requires window/document
  }
)

export function DashboardPage() {
  return (
    <div>
      <h1>Dashboard</h1>
      {/* Chart only loads when component renders */}
      <ChartComponent data={data} />
    </div>
  )
}
```
**Source:** https://nextjs.org/docs/app/building-your-application/optimizing/lazy-loading
**Confidence:** HIGH - Official Next.js documentation

### Lighthouse CI Configuration
```javascript
// .lighthouserc.js
// Automated performance testing in CI/CD
module.exports = {
  ci: {
    collect: {
      // Test production URLs for all 6 locales
      url: [
        'https://roseyco.com/us',
        'https://roseyco.com/nl',
        'https://roseyco.com/dk',
        'https://roseyco.com/au',
        'https://roseyco.com/uk',
        'https://roseyco.com/ie',
      ],
      numberOfRuns: 3, // Run 3 times, take median
      settings: {
        preset: 'desktop', // or 'mobile'
        throttling: {
          rttMs: 40,
          throughputKbps: 10240,
          cpuSlowdownMultiplier: 1,
        },
      },
    },
    assert: {
      preset: 'lighthouse:recommended',
      assertions: {
        'categories:performance': ['error', { minScore: 0.9 }],  // 90+
        'categories:accessibility': ['error', { minScore: 0.9 }],
        'categories:best-practices': ['error', { minScore: 0.9 }],
        'categories:seo': ['error', { minScore: 0.9 }],
        'first-contentful-paint': ['warn', { maxNumericValue: 2000 }],
        'largest-contentful-paint': ['error', { maxNumericValue: 2500 }],
        'cumulative-layout-shift': ['error', { maxNumericValue: 0.1 }],
      },
    },
    upload: {
      target: 'temporary-public-storage', // Generates shareable report URL
    },
  },
}
```
**Source:** https://github.com/GoogleChrome/lighthouse-ci
**Confidence:** HIGH - Official Lighthouse CI documentation

### NAP Data Single Source of Truth
```typescript
// src/lib/locales.ts (CURRENT - VERIFY BEFORE GBP SETUP)
// This is the single source of truth for NAP data
// MUST match Google Business Profile exactly

export const locales = {
  us: {
    locale: 'en-US',
    currency: 'USD',
    phone: '+1 (816) 555-XXXX',  // ⚠️ PLACEHOLDER - Replace before GBP setup
    address: '123 Main St, Kansas City, MO 64101, USA',  // ⚠️ PLACEHOLDER
    // ...
  },
  nl: {
    locale: 'nl-NL',
    currency: 'EUR',
    phone: '+31 20 123 4567',  // ⚠️ PLACEHOLDER - Replace before GBP setup
    address: 'Straatnaam 123, 1012 AB Amsterdam, Netherlands',  // ⚠️ PLACEHOLDER
    // ...
  },
  // ... other locales
}

// Usage in structured data (ALREADY CORRECT ✅)
// src/components/seo/structured-data.tsx
export function LocalBusinessStructuredData({ locale }: { locale: LocaleCode }) {
  const config = locales[locale]

  const schema: LocalBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: `Rosey Co. ${config.country}`,
    telephone: config.phone,  // ✅ Uses single source of truth
    address: {
      "@type": "PostalAddress",
      addressLocality: config.address.split(',')[0].trim(),
      addressCountry: config.countryCode,
    },
    // ...
  }

  return <JsonLd data={schema} />
}
```
**Action Required Before GBP Setup:**
1. Coordinate with Bailey to get real phone numbers and addresses for all 6 locales
2. Update `src/lib/locales.ts` with real NAP data
3. Verify NAP consistency in structured-data.tsx, footer.tsx, contact page
4. Share finalized NAP data with Bailey for GBP setup

**Source:** Current codebase, local SEO best practices
**Confidence:** HIGH - Existing implementation correct, needs data update

## State of the Art

| Old Approach | Current Approach (2026) | When Changed | Impact |
|--------------|-------------------------|--------------|--------|
| FID (First Input Delay) | INP (Interaction to Next Paint) | March 2024 | More comprehensive interactivity metric, stricter threshold (< 200ms) |
| Manual font subsetting | next/font automatic subsetting | Next.js 13+ | Zero-config font optimization, self-hosting |
| priority prop | preload prop (Next.js 16+) | Next.js 16 | More explicit naming, same behavior (project still on 14, uses priority) |
| External Google Fonts | Self-hosted at build time | next/font default | Eliminates external network requests, better privacy |
| Manual script async/defer | next/script strategies | Next.js 11+ | Controlled hydration timing, better Performance scores |
| Wistia video hosting | BunnyStream adaptive streaming | Project-specific | 2x faster transcoding, better adaptive streaming |
| Lab data only | Real User Metrics (RUM) emphasis | 2024-2025 | Vercel Analytics, CrUX data valued over one-off Lighthouse tests |

**Deprecated/outdated:**
- **FID metric:** Replaced by INP in March 2024 - test for INP < 200ms, not FID < 100ms
- **priority prop in Next.js 16+:** Use preload instead (project still on Next.js 14, so priority is correct)
- **External Google Fonts:** next/font self-hosts automatically, don't use `<link>` tags
- **beforeInteractive for analytics:** Use afterInteractive or lazyOnload for better Performance scores
- **Lighthouse only:** Must validate with RUM (Vercel Analytics) for real-world performance

## Integration Points

### How This Integrates with Existing Codebase

**Phase 1 (SEO Foundation) Integration:**
- LocalBusiness structured data already exists in `src/components/seo/structured-data.tsx`
- NAP data already centralized in `src/lib/locales.ts`
- Hreflang already implemented for all 6 locales
- **Action:** Verify NAP consistency before GBP setup

**Phase 2 (Component Architecture) Integration:**
- LocaleProvider already provides locale context to all components
- Translation system supports 6 locales
- Currency formatting already implemented
- **Action:** Ensure hero sections use translations, not hardcoded text

**Phase 3 (Translation QA) Integration:**
- Translations verified by native speakers
- Grammar validation completed
- **Action:** No conflicts - performance work doesn't affect translations

**Phase 4 (Geolocation) Integration:**
- Middleware handles locale detection and redirects
- Cookie consent banner implemented for EU locales
- **Action:** Verify middleware doesn't block preconnect/preload hints

**Root Layout Integration:**
- next/font already configured optimally (DM Sans + Fraunces with display: 'swap')
- Analytics components already use next/script with appropriate strategies
- LenisProvider wraps entire app
- **Action:** Add priority to hero images, verify Lenis doesn't hurt Performance score

**Build System Integration:**
- Next.js 14 with App Router
- Static generation for all 214 pages (6 locales × 35+ pages)
- Vercel deployment
- **Action:** Add Lighthouse CI to GitHub Actions, test production URLs

## Risks and Unknowns

### High Confidence Areas (GREEN)
- ✅ Next.js Image/Font/Script optimizations (official documentation)
- ✅ Core Web Vitals thresholds and optimization techniques (Google official)
- ✅ Current analytics implementation already optimal
- ✅ NAP consistency requirements for local SEO

### Medium Confidence Areas (YELLOW)
- 🟡 Framer Motion performance impact (community best practices, not official benchmarks)
- 🟡 Lenis smooth scroll performance cost (project-specific, needs measurement)
- 🟡 BunnyStream impact on Lighthouse (vendor-specific, generally positive)
- 🟡 Exact Lighthouse score achievable (depends on many factors, target 90+ realistic)

### Low Confidence Areas (RED - Needs Clarification)
- 🔴 **Real contact information for all 6 locales:** Current data is placeholders
- 🔴 **Bailey's role and GBP setup timeline:** Not specified in project docs
- 🔴 **Analytics IDs (GA, Clarity, Meta Pixel):** Environment variables not set
- 🔴 **Production URL readiness:** Is roseyco.com pointing to Vercel?
- 🔴 **GBP account ownership:** Who owns existing GBP listings (if any)?
- 🔴 **Budget for GBP verification:** Some locations may require postcard/video verification

### Questions Requiring User Input

**Before GBP Setup:**
1. Who is Bailey and what is their role in GBP setup? (mentioned in ROADMAP)
2. Do existing GBP listings exist for any of the 6 locales? If yes, who owns them?
3. What are the real phone numbers and addresses for all 6 locales?
4. Is budget approved for GBP verification if required (some locations need paid verification)?
5. Should all 6 GBP locations be created simultaneously or phased rollout?

**Before Performance Optimization:**
6. Are analytics IDs (GA, Clarity, Meta Pixel) ready to be added to environment variables?
7. Is roseyco.com production domain ready and pointing to Vercel?
8. Should Lighthouse CI be added to GitHub Actions? (recommended)
9. What is acceptable Lighthouse score threshold? (recommend 90+ on all metrics)
10. Should Lenis smooth scroll be disabled if it hurts Performance score significantly?

**Production Readiness:**
11. Is Vercel Analytics enabled for RUM data collection?
12. Are error tracking tools (Sentry, etc.) configured for production?
13. Is there a rollback plan if performance issues arise in production?

## Recommended Plan Structure

Break Phase 5 into 3 sequential plans:

### Plan 05-01: Image & Script Optimization (Foundation)
**Goal:** Optimize images and scripts for 90+ Performance score baseline
**Duration:** 1-2 hours
**Tasks:**
1. Audit all hero sections and add priority prop to LCP images
2. Verify all images have proper width/height or fill with sizes
3. Review analytics script strategies (already optimal, verify only)
4. Add preconnect hints for BunnyStream CDN in layout
5. Test locally with Lighthouse before/after metrics
6. Create baseline Lighthouse reports for all 6 locales

**Acceptance Criteria:**
- All hero images use priority prop
- All images have explicit dimensions or proper sizes attribute
- Local Lighthouse Performance score 90+ (desktop), 80+ (mobile)
- No "properly size images" warnings in Lighthouse

### Plan 05-02: Core Web Vitals Optimization (Advanced)
**Goal:** Fix CLS issues and achieve LCP < 2.5s, INP < 200ms, CLS < 0.1
**Duration:** 2-3 hours
**Tasks:**
1. Audit Framer Motion animations for CLS issues
2. Add min-height to sections with dynamic content
3. Optimize Lenis smooth scroll configuration (stop on visibility change)
4. Implement dynamic imports for heavy components
5. Test Core Web Vitals on production URLs with PageSpeed Insights
6. Set up Vercel Analytics for RUM data collection

**Acceptance Criteria:**
- CLS score < 0.1 on all key pages
- LCP < 2.5s on mobile (4G throttled)
- INP < 200ms on all interactive elements
- Lighthouse Best Practices and Accessibility 90+

### Plan 05-03: GBP Integration & Production Launch (Coordination)
**Goal:** Coordinate GBP setup with Bailey, verify NAP consistency, achieve SEO 90+
**Duration:** 2-3 hours (coordination time varies)
**Tasks:**
1. Coordinate with Bailey to get real contact info for all 6 locales
2. Update locales.ts with real NAP data
3. Verify NAP consistency across structured-data.tsx, footer, contact page
4. Share finalized NAP data with Bailey for GBP setup
5. Link website to GBP for each locale (Bailey handles GBP side)
6. Verify website link appears in GBP listings
7. Test local search rankings for each locale (monitor over time)
8. Final Lighthouse audit - all metrics 90+

**Acceptance Criteria:**
- Real contact information in locales.ts for all 6 locales
- NAP data matches exactly between website and GBP
- Website linked to GBP in all 6 locale listings
- Lighthouse SEO score 90+ on all locale homepages
- All 4 Lighthouse metrics 90+ (Performance, Accessibility, Best Practices, SEO)

**Dependencies:**
- Bailey's availability for GBP coordination
- Real contact information acquisition
- Production deployment complete

## Sources

### Primary (HIGH confidence)
- [Next.js Official Docs - Image Component](https://nextjs.org/docs/app/api-reference/components/image)
- [Next.js Official Docs - Script Component](https://nextjs.org/docs/app/api-reference/components/script)
- [Next.js Official Docs - Font Optimization](https://nextjs.org/docs/app/getting-started/fonts)
- [Next.js Official Docs - Production Checklist](https://nextjs.org/docs/app/guides/production-checklist)
- [Google Web Vitals Official](https://web.dev/articles/vitals)
- [Google Core Web Vitals Documentation](https://developers.google.com/search/docs/appearance/core-web-vitals)
- [Lighthouse Documentation](https://developer.chrome.com/docs/lighthouse/overview)

### Secondary (MEDIUM confidence)
- [Lighthouse 100 with Next.js: The Missing Performance Checklist](https://medium.com/better-dev-nextjs-react/lighthouse-100-with-next-js-the-missing-performance-checklist-e87ee487775f)
- [Next.js Lighthouse Optimization: 42 to 97 Case Study](https://dev.to/amansuryavanshi-ai/nextjs-lighthouse-optimization-42-to-97-case-study-4h6a)
- [You're Probably Using Lighthouse Wrong](https://alokai.com/blog/youre-probably-using-lighthouse-wrong)
- [Core Web Vitals 2026: INP, LCP, CLS Complete Guide](https://senorit.de/en/blog/core-web-vitals-2026)
- [Why NAP Consistency Is Critical for GBP Rankings in 2026](https://yourstagingwebsite.xyz/why-nap-consistency-is-the-secret-to-dominating-google-business-profile-rankings-in-2026/)
- [How to Create Local Business Schema for Multiple Locations](https://aubreyyung.com/local-business-schema-multiple-locations/)
- [How to manage multiple Google Business Profiles in 2026](https://planable.io/blog/manage-multiple-google-my-business-accounts/)
- [Lenis Smooth Scroll - Why It Needs to Become a Browser Standard](https://medium.com/@nattupi/why-lenis-smooth-scroll-needs-to-become-a-browser-standard-62bed416c987)
- [Framer Motion Tips for Performance in React](https://tillitsdone.com/blogs/framer-motion-performance-tips/)

### Tertiary (LOW confidence)
- [BunnyStream Video Optimization](https://bunny.net/blog/better-streaming-insights-with-new-stream-metrics/)
- [Webflow Video Problems? Here's How Bunny.net Fixes Them](https://www.digidop.com/blog/webflow-video-bunny-net-solution)

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - Next.js official docs, current implementation verified
- Architecture patterns: HIGH - Official documentation with verified code examples
- Core Web Vitals: HIGH - Google official documentation, industry standards
- GBP integration: MEDIUM - Best practices well-documented, but coordination details unclear
- Performance targets: MEDIUM - 90+ is realistic but depends on testing and iteration
- Framer Motion optimization: MEDIUM - Community best practices, not official benchmarks
- Lenis performance impact: MEDIUM - Needs measurement in project context

**Research date:** 2026-01-27
**Valid until:** 2026-02-27 (30 days - performance best practices evolve slowly)

**Next Steps:**
1. User clarifies Bailey's role and GBP coordination timeline
2. User provides real contact information for all 6 locales
3. Execute Plan 05-01 (Image & Script Optimization)
4. Execute Plan 05-02 (Core Web Vitals Optimization)
5. Execute Plan 05-03 (GBP Integration & Production Launch) after coordination

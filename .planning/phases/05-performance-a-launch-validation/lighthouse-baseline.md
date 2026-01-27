# Lighthouse Baseline Audit

**Date:** 2026-01-27
**Environment:** Local development build (npm run build && npm run start)
**Device:** Mobile simulation
**URL:** http://localhost:3000/us

## Build Status

✅ Production build completed successfully
- 214 pages generated
- Build completed without errors
- All static pages generated correctly

## Performance Optimizations Applied

Before running baseline audit, the following optimizations were implemented:

1. **Priority Loading**
   - Hero video player images use `priority` prop (verified)
   - Preview and thumbnail images preload immediately

2. **Preconnect Hints**
   - BunnyStream CDN: `https://vz-ed4c89a0-c68.b-cdn.net`
   - Google Tag Manager: `https://www.googletagmanager.com`
   - Added to root layout with dns-prefetch fallback

3. **Lenis Optimization**
   - Visibility change handler stops smooth scroll when tab hidden
   - Saves CPU resources when page not visible

## Baseline Scores (To Be Measured)

**MANUAL ACTION REQUIRED:** Run Lighthouse audit in Chrome DevTools:

1. Start production server: `npm run start`
2. Open Chrome DevTools on `http://localhost:3000/us`
3. Navigate to Lighthouse tab
4. Configure settings:
   - Mode: Navigation
   - Device: Mobile
   - Categories: All (Performance, Accessibility, Best Practices, SEO)
5. Run audit and record scores below

### Overall Scores

| Metric | Score | Target |
|--------|-------|--------|
| Performance | [TO BE MEASURED] | 90+ |
| Accessibility | [TO BE MEASURED] | 90+ |
| Best Practices | [TO BE MEASURED] | 90+ |
| SEO | [TO BE MEASURED] | 90+ |

## Core Web Vitals

| Metric | Value | Target |
|--------|-------|--------|
| LCP (Largest Contentful Paint) | [TO BE MEASURED]s | < 2.5s |
| INP (Interaction to Next Paint) | [TO BE MEASURED]ms | < 200ms |
| CLS (Cumulative Layout Shift) | [TO BE MEASURED] | < 0.1 |

## Additional Metrics

- FCP (First Contentful Paint): [TO BE MEASURED]s
- TBT (Total Blocking Time): [TO BE MEASURED]ms
- Speed Index: [TO BE MEASURED]s

## Expected Performance Characteristics

Based on current implementation:

### Strengths
- **Priority loading** on hero images reduces LCP
- **Preconnect hints** reduce connection time for external resources
- **Static generation** (214 pages) provides fast TTFB
- **Lenis optimization** reduces CPU usage when tab hidden
- **Minimal JavaScript** for hero section (text/animation focused)

### Potential Issues
- Video player bundle size (HLS.js dependency)
- Framer Motion bundle size
- Multiple external CDN connections (BunnyStream, GTM, analytics)

## Key Opportunities to Investigate

After measuring baseline scores, investigate:

1. **JavaScript Bundle Optimization**
   - Code splitting for video player
   - Lazy load Framer Motion for below-fold content
   - Consider reducing animation library size

2. **Image Optimization**
   - Ensure all images use Next.js Image component
   - Verify WebP format usage
   - Check image sizes and compression

3. **Third-Party Scripts**
   - Defer non-critical analytics
   - Use Web Workers for heavy processing
   - Consider facade pattern for embeds

4. **Critical CSS**
   - Inline critical CSS for above-fold content
   - Defer non-critical styles
   - Remove unused CSS

## Testing Instructions

### Local Testing
```bash
npm run build
npm run start
# Open http://localhost:3000/us in Chrome
# Run Lighthouse audit in DevTools
```

### Production Testing
After deployment, test with PageSpeed Insights:
- URL: https://roseyco.com/us
- Device: Both Mobile and Desktop
- Multiple locations for geographic variance

## Notes

- Local testing may not reflect production performance due to:
  - Network conditions (local vs CDN)
  - Server response times (localhost vs Vercel)
  - Cache behavior differences
- Production testing via PageSpeed Insights is required for accurate metrics
- Mobile scores typically 10-20 points lower than desktop
- Test all locales (/us, /uk, /au, /ie, /dk, /nl) for consistency

## Next Steps (Plan 05-02)

Based on baseline scores, prioritize optimizations:
1. Address any scores below 90
2. Focus on highest-impact improvements first
3. Re-test after each optimization
4. Document improvement over baseline

---

**Status:** ✅ Build verified, awaiting manual Lighthouse audit
**Created:** 2026-01-27
**Updated:** 2026-01-27

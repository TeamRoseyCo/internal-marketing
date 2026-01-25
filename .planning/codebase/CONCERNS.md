# Codebase Concerns

**Analysis Date:** 2026-01-23

## Tech Debt

**Large Page Components - Multiple service pages exceed 500+ lines:**
- Issue: `src/app/services/website-design/page.tsx` (636 lines), `src/app/services/paid-ads/page.tsx` (633 lines), `src/app/services/social-media/page.tsx` (553 lines), `src/app/results/page.tsx` (767 lines)
- Files: `src/app/services/website-design/page.tsx`, `src/app/services/paid-ads/page.tsx`, `src/app/services/social-media/page.tsx`, `src/app/results/page.tsx`, `src/app/page.tsx` (611 lines)
- Impact: Difficult to maintain, test, and understand. Animation variants and data objects duplicated across multiple files. Page becomes harder to refactor as complexity grows. Risk of introducing bugs during changes.
- Fix approach: Extract shared animation variants to `src/lib/animation-variants.ts`, extract inline data objects (processSteps, features, stats, caseStudies) to separate files in `src/lib/content/`, create shared component wrappers for repeated sections (FeatureGrid, StatsSection, CaseStudyCard). Split pages into smaller, focused components.

**Translation Files - Very Large Data Files:**
- Issue: `src/lib/page-translations.ts` (2228 lines) and `src/lib/translations.ts` (781 lines) contain all translation strings as hardcoded objects
- Files: `src/lib/page-translations.ts`, `src/lib/translations.ts`
- Impact: Single file handles all translation data for 6+ locales across all pages. Difficult to maintain, impossible to implement dynamic loading or lazy translation splits. Makes bundle potentially larger than needed. Maintenance nightmare if adding new locales or pages.
- Fix approach: Split translation files by page/feature (e.g., `src/lib/translations/home.ts`, `src/lib/translations/services.ts`, `src/lib/translations/blog.ts`). Implement lazy loading with dynamic imports where appropriate. Consider using a translation framework (i18next) for production scale.

**Duplicate Animation Variants Across Components:**
- Issue: Animation variants (fadeInUp, staggerContainer, staggerItem) are redefined in multiple files
- Files: `src/app/services/website-design/page.tsx`, `src/app/services/paid-ads/page.tsx`, `src/app/services/social-media/page.tsx`, `src/app/services/seo/page.tsx`, `src/app/results/page.tsx`, `src/app/contact/page.tsx`, `src/app/page.tsx`
- Impact: Code duplication makes it harder to maintain consistent animation behavior. Changing animation timing requires updates in 7+ files. Violates DRY principle.
- Fix approach: Move all animation variants to `src/lib/animation-variants.ts` or `src/components/animations/index.ts`, import and reuse everywhere.

**Locale-Specific Duplicate Pages:**
- Issue: Every page has both root (e.g., `src/app/page.tsx`) and locale-prefixed version (e.g., `src/app/[locale]/page.tsx`)
- Files: Root versions: `src/app/page.tsx`, `src/app/services/page.tsx`, `src/app/blog/page.tsx`, `src/app/contact/page.tsx`, `src/app/results/page.tsx`, etc. Locale versions: `src/app/[locale]/page.tsx`, `src/app/[locale]/services/page.tsx`, etc.
- Impact: Code duplication, maintenance burden, hard to ensure consistency between versions. Bug fixes must be applied twice. Risk of divergence between root and locale versions.
- Fix approach: Consolidate all pages to use `[locale]` routing with a fallback locale, remove root duplicates. Use middleware to handle locale detection and default routing. Consider using `next-intl` library for cleaner i18n integration.

## Known Bugs

**Contact Form Email Subject Field Injection Risk:**
- Symptoms: If user submits contact form with special characters in firstName/lastName/service, email subject line in `src/app/api/contact/route.ts` could contain unescaped values
- Files: `src/app/api/contact/route.ts` (line 68)
- Trigger: Submit contact form with firstName=`Test<script>`, the generated subject becomes "New Lead: Test<script> LastName - Service"
- Workaround: Currently minimal impact since email headers are server-side, but poor practice.

**Video Player Console Log on Autoplay Failure:**
- Symptoms: Console logs "Autoplay prevented: [error]" when video fails to autoplay (normal browser behavior, not necessarily an error)
- Files: `src/app/components/video/hero-video-player.tsx` (line 40)
- Trigger: Load page where video autoplay is blocked by browser policies (common on mobile, third-party iframes)
- Workaround: Error is caught and handled gracefully (fallback to native controls), but logging masquerades as problem when it's expected behavior.

**Missing Environment Variable Validation at Build Time:**
- Symptoms: Application starts without checking if critical env vars are set. Missing RESEND_API_KEY silently disables email (no error thrown)
- Files: `src/lib/resend.ts` (line 7-10), `src/lib/supabase.ts` (line 7-8)
- Trigger: Deploy without setting env vars, forms submit but emails never send. No user feedback that emails failed.
- Workaround: Email handling gracefully degrades (contact route continues even if Resend is null), but user has no visibility into failure.

**Hardcoded Email Addresses:**
- Symptoms: Email addresses hardcoded in multiple files (`FROM_EMAIL`, `ADMIN_EMAIL`)
- Files: `src/lib/resend.ts` (lines 16, 19), `src/app/api/contact/route.ts` (lines 66, 91)
- Trigger: Need to change notification email address, must update code and redeploy
- Workaround: Can be moved to environment variables, but currently hardcoded.

## Security Considerations

**HTML Injection in Email Templates:**
- Risk: Contact form email templates use `${data.message.replace(/\n/g, '<br>')}` to convert newlines to HTML. If message contains HTML/scripts, it renders as-is in email
- Files: `src/app/api/contact/route.ts` (lines 77, 99)
- Current mitigation: Email is sent server-side (no XSS risk to web), but email recipients could see formatted HTML. Limited risk since emails are plain text rendered by email clients.
- Recommendations: Properly escape HTML in email templates using a library like `html-escaper`. Or use email templating with Resend's built-in JSX templates instead of string concatenation.

**Remote Image Patterns in Next.js Config:**
- Risk: `next.config.mjs` allows all remote image URLs with `hostname: "**"`
- Files: `next.config.mjs` (lines 6-11)
- Current mitigation: Images are only loaded from trusted sources (BunnyStream, internal content), but configuration allows any external URL
- Recommendations: Whitelist specific domains instead (e.g., `bunnystream.com`, `cdn.roseyco.com`). Document why wildcard is needed if required.

**API Route Error Messages Expose System Details:**
- Risk: Contact form API returns generic "Failed to submit form" but logs detailed errors to console
- Files: `src/app/api/contact/route.ts` (lines 58, 83, 108, 114)
- Current mitigation: Console logs only server-side (not exposed to client), errors are generic to user
- Recommendations: Use structured logging (Winston, Pino) instead of console.error. Track errors in monitoring system (Sentry, LogRocket).

**JSON-LD Schema Uses dangerouslySetInnerHTML:**
- Risk: `src/components/seo/structured-data.tsx` renders JSON-LD using `dangerouslySetInnerHTML`
- Files: `src/components/seo/structured-data.tsx` (line 137)
- Current mitigation: Data comes from hardcoded schema objects, no user input. JSON.stringify() ensures valid JSON output. Low risk.
- Recommendations: Continue current approach (safe), or use Next.js `<script>` component with `dangerouslyAllow_dangerouslySetInnerHtml` flag in newer versions.

## Performance Bottlenecks

**Large Translation Objects Loaded at Runtime:**
- Problem: 2228-line `src/lib/page-translations.ts` and 781-line `src/lib/translations.ts` loaded on every page regardless of locale. All translation data for all languages loaded in memory.
- Files: `src/lib/page-translations.ts`, `src/lib/translations.ts`, imported in multiple layout/page files
- Cause: Monolithic translation files with no code splitting or lazy loading. All locale translations bundled together.
- Improvement path: Split translations by locale and page, implement dynamic imports. Use `React.lazy()` for locale-specific components. Consider Suspense boundaries for translation loading.

**Animation Variant Duplication Increases Bundle Size:**
- Problem: Same animation variant objects defined in 7+ page files
- Files: Multiple page components across services, results, contact pages
- Cause: Copy-paste pattern, no shared library extraction
- Improvement path: Extract all variants to `src/lib/animation-variants.ts`, import single source of truth. Reduces bundle by eliminating duplicate object definitions.

**Console Logs in Production:**
- Problem: Multiple `console.log()`, `console.warn()`, `console.error()` calls remain in production code
- Files: `src/lib/resend.ts` (line 10), `src/components/video/hero-video-player.tsx` (line 40), `src/app/api/contact/route.ts` (lines 58, 83, 108, 114)
- Cause: Development logging not removed for production builds
- Improvement path: Use conditional logging with `process.env.NODE_ENV`, wrap in `if (__DEV__)` guards, or use debug library for controlled output.

## Fragile Areas

**Contact Form Error Handling:**
- Files: `src/app/contact/page.tsx`, `src/app/api/contact/route.ts`
- Why fragile: Form gracefully handles email failures but user sees no clear indication emails were sent. DB insert failure treated same as email failure. Multiple async operations (DB write, admin email, user confirmation email) with no transaction/rollback semantics. If admin email succeeds but user confirmation fails, inconsistent state.
- Safe modification: Test all failure paths (no Resend key, bad email, DB errors). Add explicit user feedback for each failure mode. Consider implementing email queue/retry logic using Supabase triggers or background job system.
- Test coverage: Manual testing shows happy path works, but error scenarios untested. Need tests for: missing env vars, malformed emails, network timeouts, partial failures (DB succeeds, email fails).

**Multi-Locale Page Duplication:**
- Files: All pages have both root and `[locale]` variants
- Why fragile: Changes to one version not reflected in other. Locale version may drift from root version. No shared component structure enforces consistency.
- Safe modification: Create shared page component that handles locale logic internally. Pass locale as prop, not as routing parameter. Consolidate duplicate route handlers.
- Test coverage: Manual verification that both root and locale versions work, but no automated tests comparing them.

**BunnyStream Video Player Dependency:**
- Files: `src/components/video/hero-video-player.tsx`, imported in `src/app/page.tsx`, `src/app/[locale]/page.tsx`
- Why fragile: Entire hero section relies on environment variables (`NEXT_PUBLIC_BUNNY_VIDEO_*`). If any URL is missing/malformed, no video displays. No fallback content strategy. Autoplay logic has timeout-based workaround (line 38-43).
- Safe modification: Add explicit fallback UI if video URLs missing. Test with incomplete env var configurations. Consider image-only fallback for low-bandwidth scenarios.
- Test coverage: Untested - no unit/integration tests verify video player behavior. Manual testing only.

**Hardcoded Locale Configuration:**
- Files: `src/lib/locales.ts` (defines 6 locales), `src/lib/translations.ts`, `src/lib/page-translations.ts`
- Why fragile: Adding new locale requires changes in 3+ files. Phone numbers, addresses, translations all hardcoded. No CMS/database backing. Hard to update content by region without code changes.
- Safe modification: Extract locale config to a JSON file or database. Build locale registry dynamically. Use environment variables for locale-specific values.
- Test coverage: Manual verification that locale routes work, but no tests verify all locales have complete translation data.

## Scaling Limits

**Translation File Size:**
- Current capacity: 2228 lines in single file for all pages + all locales
- Limit: Beyond ~3000 lines, file becomes difficult to edit. Next.js bundle size increases linearly. At 10+ locales or 50+ pages, becomes maintenance nightmare.
- Scaling path: Split by locale and page. Implement lazy loading with dynamic imports. Use i18n framework (next-intl, react-i18next) that handles splitting automatically.

**Duplicate Page Routing:**
- Current capacity: Currently 15+ pages duplicated (root + locale versions)
- Limit: Each additional feature page requires creating 2 versions (root + locale). Maintenance burden grows quadratically.
- Scaling path: Consolidate to single `[locale]` routing structure with optional locale parameter. Use middleware for locale detection and routing.

**Environment Variable Management:**
- Current capacity: 10 env vars tracked (Supabase, BunnyStream, Analytics, Email)
- Limit: As integrations grow (CRM, payment, analytics, etc.), tracking becomes difficult. No centralized validation or documentation.
- Scaling path: Document all required env vars in `.env.example`. Add startup validation script. Use environment variable schema validation (zod, joi).

## Dependencies at Risk

**TypeScript - Latest Version (5.x):**
- Risk: Using latest TypeScript may introduce breaking changes in minor versions
- Impact: Build failures if new TS version drops support for patterns used in codebase
- Migration plan: Use caret versioning (`^5`), test before upgrading. Pin to specific version for production deployments.

**Next.js 14/16 - Rapid Release Cycle:**
- Risk: Next.js releases new major versions frequently, App Router is still evolving
- Impact: API surface may change (metadata API, image optimization, etc.)
- Migration plan: Review release notes before upgrading. Use automated tests to catch breaking changes.

**Framer Motion - Performance Concerns at Scale:**
- Risk: Heavy animations on large number of elements can impact performance
- Impact: Mobile devices may stutter if too many animated elements on page simultaneously
- Migration plan: Profile animations with DevTools. Consider using CSS animations for simple cases. Implement animation-reduce preference.

**Supabase Service Role Key in Repository:**
- Risk: Service role key is sensitive - if committed to git, attackers can impersonate backend
- Impact: Unauthorized database access, data breach
- Migration plan: Ensure `.env.local` is in `.gitignore` (confirmed). Rotate key if ever exposed. Use environment variable system properly in production.

## Missing Critical Features

**Email Delivery Monitoring:**
- Problem: No way to know if emails are being sent successfully. Form submission succeeds but emails may fail silently.
- Files: `src/app/api/contact/route.ts`
- Blocks: Admin doesn't know when new leads arrive. Leads don't receive confirmation emails.
- Recommendation: Implement email queue with retry logic. Add monitoring dashboard showing email delivery status. Log email events to database.

**Form Input Validation:**
- Problem: Only basic required field and email format validation. No length limits, no spam protection.
- Files: `src/app/contact/page.tsx`, `src/app/api/contact/route.ts`
- Blocks: Forms vulnerable to abuse (very long messages, special characters)
- Recommendation: Add field length validation. Implement rate limiting per IP. Add CAPTCHA (hCaptcha or Cloudflare Turnstile). Validate phone format.

**Analytics & Tracking Setup:**
- Problem: Google Analytics and Microsoft Clarity marked as "not connected" in HANDOFF.md
- Files: `src/components/analytics/google-analytics.tsx`, `src/components/analytics/microsoft-clarity.tsx`
- Blocks: No visibility into site traffic, user behavior, or conversion metrics
- Recommendation: Set up GA4 property and ID. Create Clarity account. Test tracking in dev before deploying.

**Blog Search Functionality:**
- Problem: Blog listing shows all posts but no search, filtering limited to categories
- Files: `src/app/blog/page.tsx`
- Blocks: Users can't find specific posts, navigation becomes difficult as post count grows
- Recommendation: Add full-text search using Supabase or local index (e.g., Lunr.js). Implement tag system in addition to categories.

**Free Guide Download Flow:**
- Problem: Guide download system designed but not implemented
- Files: Mentioned in HANDOFF.md as "PENDING"
- Blocks: Lead magnet system can't be deployed
- Recommendation: Create guide table in Supabase. Implement download endpoint. Send guide via email using Resend.

## Test Coverage Gaps

**API Routes - No Test Coverage:**
- What's not tested: `src/app/api/contact/route.ts` - all paths untested. Form submission, email sending, error handling, edge cases
- Files: `src/app/api/contact/route.ts`
- Risk: Bugs in form processing won't be caught until production. Email failures silent. No validation of data transformation from frontend to database.
- Priority: High - contact form is critical user-facing feature

**Form Components - No Test Coverage:**
- What's not tested: `src/app/contact/page.tsx` form validation, submission states, error display
- Files: `src/app/contact/page.tsx`
- Risk: Form UI bugs (disabled state not working, error messages not showing) won't be caught until manual testing
- Priority: High - this is main conversion funnel

**Video Player Component - No Test Coverage:**
- What's not tested: `src/components/video/hero-video-player.tsx` play/pause logic, thumbnail loading, fallback behavior
- Files: `src/components/video/hero-video-player.tsx`
- Risk: Video loading failures, autoplay issues, or play button not working won't be caught until production
- Priority: Medium - hero section critical but has fallback UI

**Locale/Translation System - No Test Coverage:**
- What's not tested: `src/lib/locales.ts`, `src/lib/translations.ts`, `src/lib/page-translations.ts` - no tests verify all locales have complete translation data, no tests verify fallback logic works
- Files: `src/lib/locales.ts`, `src/lib/translations.ts`, `src/lib/page-translations.ts`
- Risk: Missing translations discovered only in manual testing. Fallback to US English may not work as intended. Adding new locale easy to miss strings.
- Priority: Medium - impacts SEO and multi-region support

**SEO Structured Data - No Test Coverage:**
- What's not tested: `src/components/seo/structured-data.tsx` schema generation, JSON validity, completeness
- Files: `src/components/seo/structured-data.tsx`
- Risk: Invalid JSON-LD won't be caught. Google Search Console will show errors. Local Business schema missing required fields for specific locales.
- Priority: Medium - impacts search visibility

**Integration Tests Missing:**
- What's not tested: End-to-end user flows (contact form submission to email delivery, blog post loading, locale switching)
- Files: Multiple files
- Risk: Working in isolation doesn't mean working together. Flow from page to API to Supabase to Resend untested as integrated system.
- Priority: High - MVP stage needs integration testing before launch

---

*Concerns audit: 2026-01-23*

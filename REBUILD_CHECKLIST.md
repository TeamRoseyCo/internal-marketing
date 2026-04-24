# RoseyCo Apple-Aesthetic Rebuild Checklist

Source of truth for the in-progress rebuild. Everything the user has asked for across this session, ordered by status.

## Done

- [x] Phase 1: Apple design tokens in `globals.css` (black/gray/off-white + blue accent)
- [x] Phase 1: shared `src/components/apple/*` components (Tile, TileStack, TilePair, TileGrid, CTALink, PillButton, AppleNav, AppleFooter, MockBrowser, MockPhone, MockDashboard, MockSearchResult, VSLPlaceholder, LogoStrip, useTileTheme, RevealInit)
- [x] Root `layout.tsx` wired to AppleNav + AppleFooter + RevealInit; removed Fraunces/DM Sans
- [x] Homepage rebuilt as 5-section sales page (Header / Lead / Body / Close / Footer)
- [x] Everything defaults to light theme (body `#fbfbfd`, tiles `#f5f5f7`, dark tiles `#1d1d1f` reserved for later)
- [x] Sticky header fixed (switched to `position: fixed`, 72px tall, added spacer)
- [x] Header more translucent (55% opacity, 24px blur)
- [x] Header has side margins (max-width 1280, px-6/md:px-10)
- [x] Logo in header top-left: rose-only transparent PNG, 36x36, next to "Rosey Co." wordmark
- [x] Accent colour: Apple blue `#0071e3` (reverted from red)
- [x] Tile side margins (stack max-width 1440, horizontal padding, 16px gap between tiles)
- [x] Tile rounded corners (22px) + subtle shadow
- [x] Dividers reverted: no hairline, just transparent gap showing page bg
- [x] Font: Inter loaded via next/font as `--font-ac`, falls back to SF Pro on Apple devices

## In progress

- [ ] Floating Experiment Bubble (lower-right) for runtime font + accent colour swapping
- [ ] Compact hero: two-column layout (text left, small VSL right) that fits in viewport on load
- [ ] Remove "Watch the film" CTA (there is no film, only a short VSL welcome)
- [ ] Hero CTA simplified to a single "Book a call"

## Remaining pages to rebuild (Phase 3)

- [ ] `[locale]/services/page-client.tsx` (services index)
- [ ] `[locale]/services/seo/page-client.tsx`
- [ ] `[locale]/services/social-media/page-client.tsx`
- [ ] `[locale]/services/paid-ads/page-client.tsx`
- [ ] `[locale]/services/website-design/page-client.tsx`
- [ ] `[locale]/results/page-client.tsx`
- [ ] `[locale]/contact/page-client.tsx` (preserve Supabase form POST to `/api/contact`)

## Remaining (Phase 4)

- [ ] `[locale]/blog/page.tsx` restyle (tile hero + post grid)
- [ ] Apple-voice copy rewrite across `src/lib/translations.ts` and `src/lib/page-translations.ts` (6 locales: us/uk/ie/au/nl/dk)
- [ ] Resolve `PLACEHOLDER_CHECKLIST.md` items as part of the copy pass (fake phone number, `yourwebsite.com`, "More articles coming soon...")

## Rules from this session (apply to all work)

- No emojis in any file, comment, or user-visible text
- Apple copywriting voice everywhere: 1-3 word headlines, 4-9 word taglines, sentence case, periods as punctuation, no exclamation marks, no "we"/"our"
- CTA pairs: soft (`Learn more`) + hard (`Book a call`) when two are needed; single hard CTA when not
- Restraint on colour: neutrals only + one accent (blue); never stack accents

## Deferred / not in MVP

- `[locale]/privacy-policy` (inherits new tokens, no bespoke tile composition)
- `[locale]/belfast`
- `[locale]/[pillarSlug]` dynamic pillar pages
- `[locale]/case-studies/[slug]` individual case-study posts
- Cleanup pass: delete legacy `src/components/layout/header.tsx`, `footer.tsx`, unused rose/green utility classes once nothing references them

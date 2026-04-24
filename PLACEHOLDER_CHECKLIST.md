# RoseyCo Placeholder Checklist

Generated 2026-04-24. Every item below is a placeholder, stub, or example value that should be replaced before launch.

## Critical (user-visible)

### Fake phone number
- [ ] `src/app/contact/page.tsx:45` replace displayed `+1 (234) 567-890` with real RoseyCo phone
- [ ] `src/app/contact/page.tsx:219` replace input placeholder `+1 (234) 567-890`

### Placeholder client logos (Results page)
- [ ] `src/app/results/page.tsx:254` swap generic names (TechStart, GrowthCo, ScaleUp, Innovate, Elevate, Nexus) for real client logos. See comment: "Placeholder logos replace with actual client logos"

### Instagram feed stub
- [ ] `src/app/results/page.tsx:651` replace placeholder grid with real embed (Elfsight / Behold / similar)
- [ ] `src/app/results/page.tsx:671` remove empty placeholder grid items once feed is live

## Medium (form example values)

- [ ] `src/app/contact/page.tsx:207` review email placeholder `john@company.com`
- [ ] `src/app/contact/page.tsx:230` review URL placeholder `https://yourwebsite.com`
- [ ] `src/app/[locale]/contact/page-client.tsx:154` review email placeholder `john@company.com`
- [ ] `src/app/[locale]/contact/page-client.tsx:177` review URL placeholder `https://yourwebsite.com`

## Lower ("Coming soon" copy)

- [ ] `src/app/blog/page.tsx:69-71` resolve "More articles coming soon..." (publish posts or remove)
- [ ] `src/app/[locale]/blog/page.tsx:108` resolve "Coming Soon" block
- [ ] `src/lib/page-translations.ts:1959` update `moreComing` string
- [ ] `src/lib/page-translations.ts:2094` update `moreComing` string
- [ ] `src/lib/page-translations.ts:2139` update `moreComing` string
- [ ] `src/lib/page-translations.ts:2184` update `moreComing` string

## Verified clean

Homepage, services, header/footer, most API routes, MDX blog content, and `locales.ts` (uses real regional phone numbers) contain no placeholders.

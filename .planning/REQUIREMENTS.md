# Requirements: Rosey Co. Multi-Location Launch

**Defined:** 2026-01-25
**Core Value:** Multi-location SEO infrastructure that works flawlessly — each locale must rank independently in local search with perfect translations, currency formatting, and locale-aware metadata.

## v1 Requirements

Requirements for multi-location website launch across all 6 locales (US, AU, UK, IE, NL, DK).

### Geolocation & Locale Persistence

- [x] **GEO-01**: User's locale preference persists across browser sessions via cookie
- [x] **GEO-02**: First-time visitors are automatically redirected to appropriate locale based on geo-detection
- [x] **GEO-03**: Visible locale switcher component allows manual locale override
- [x] **GEO-04**: Locale switcher appears in header (desktop dropdown) and footer (all devices)
- [x] **GEO-05**: Geolocation uses server-side 302 redirects (not JavaScript) for SEO compliance
- [x] **GEO-06**: Cookie consent banner displays for EU visitors (NL, DK, IE) per GDPR requirements

### Translation Quality & Component Localization

- [ ] **TRANS-01**: Header component uses translation system for all text (no hardcoded English)
- [ ] **TRANS-02**: Footer component uses translation system for all text (no hardcoded English)
- [ ] **TRANS-03**: All Dutch (NL) translations pass grammar validation via LanguageTool
- [ ] **TRANS-04**: All Danish (DK) translations pass grammar validation via RetMig or equivalent
- [ ] **TRANS-05**: No mixed-language content (e.g., "Klaar om te Groeien Your Business?" fixed)
- [ ] **TRANS-06**: Currency formatting displays correctly per locale ($ vs £ vs €)
- [ ] **TRANS-07**: Build-time validation catches missing translation keys
- [ ] **TRANS-08**: All components use centralized translation system (no bypasses)

### SEO & Search Visibility

- [ ] **SEO-01**: hreflang tags include all 6 locales (US, AU, UK, IE, NL, DK) + x-default
- [ ] **SEO-02**: Each locale page includes proper locale-specific metadata (title, description, OG tags)
- [ ] **SEO-03**: Sitemap.xml includes all locale routes (213+ pages)
- [ ] **SEO-04**: robots.txt configured to allow crawling of all locale directories
- [ ] **SEO-05**: LocalBusiness structured data unique per locale with correct address/phone
- [ ] **SEO-06**: Google Search Console verified with domain property covering all locales
- [ ] **SEO-07**: All locale routes generate successfully at build time

### Performance

- [ ] **PERF-01**: Lighthouse Performance score 90+ across all locales
- [ ] **PERF-02**: Lighthouse Accessibility score 90+
- [ ] **PERF-03**: Lighthouse Best Practices score 90+
- [ ] **PERF-04**: Lighthouse SEO score 90+
- [ ] **PERF-05**: Hero images use priority loading to optimize LCP
- [ ] **PERF-06**: Analytics scripts optimized with Next.js Script component
- [ ] **PERF-07**: Core Web Vitals pass in production (LCP < 2.5s, FID < 100ms, CLS < 0.1)

### Integrations & Analytics

- [ ] **INT-01**: Resend domain verified (roseyco.com) for email notifications
- [ ] **INT-02**: Contact form submissions trigger admin email + user confirmation
- [ ] **INT-03**: Google Analytics 4 tracking active on all pages
- [ ] **INT-04**: Microsoft Clarity session recording active
- [ ] **INT-05**: Newsletter signup adds to email list and sends welcome email
- [ ] **INT-06**: Guide download form saves lead and sends guide email

### Google Business Integration

- [ ] **GBP-01**: Google Business Profile setup coordinated with Bailey
- [ ] **GBP-02**: Website linked to appropriate Google Business Profile per locale
- [ ] **GBP-03**: NAP (Name, Address, Phone) consistency between website and GBP listings

## v2 Requirements

Deferred to post-launch. Tracked but not in current roadmap.

### Advanced Localization

- **LOC-01**: Content differentiation between English locales (US/AU/UK/IE) to avoid duplicate content penalties
- **LOC-02**: Locale-specific case studies and testimonials per market
- **LOC-03**: A/B testing of translation variants to optimize conversion rates

### Contact Information

- **CONTACT-01**: Real phone numbers acquired for each locale (currently placeholders)
- **CONTACT-02**: Real office addresses or virtual office addresses for each locale
- **CONTACT-03**: Local business registration for each target country

### Additional Features

- **FEAT-01**: AI chatbot integration (Voiceflow or alternative)
- **FEAT-02**: Admin dashboard for lead management
- **FEAT-03**: Affiliate program UI (database tables exist, no frontend)
- **FEAT-04**: Email/SMS marketing service page (optional, may clutter navigation)

## Out of Scope

Explicitly excluded. Documented to prevent scope creep.

| Feature | Reason |
|---------|--------|
| CRM service page | Falls under NEURA sub-company; separate site needed |
| User authentication system | Site is public; no login needed for MVP |
| Real-time chat | Not core to agency value proposition |
| Custom calendar booking | Using external Calendly; sufficient for MVP |
| Subdomains or separate domains | Subdirectory strategy decided; changing would break existing SEO |
| Video calls in-site | External tools (Calendly, Zoom) sufficient |
| Mobile app | Web-first strategy; defer mobile native apps |

## Traceability

Which phases cover which requirements. Updated during roadmap creation.

| Requirement | Phase | Status |
|-------------|-------|--------|
| GEO-01 | Phase 4 | Pending |
| GEO-02 | Phase 4 | Pending |
| GEO-03 | Phase 4 | Pending |
| GEO-04 | Phase 4 | Pending |
| GEO-05 | Phase 4 | Pending |
| GEO-06 | Phase 4 | Pending |
| TRANS-01 | Phase 2 | Complete |
| TRANS-02 | Phase 2 | Complete |
| TRANS-03 | Phase 3 | Pending |
| TRANS-04 | Phase 3 | Pending |
| TRANS-05 | Phase 3 | Pending |
| TRANS-06 | Phase 2 | Complete |
| TRANS-07 | Phase 2 | Complete |
| TRANS-08 | Phase 2 | Complete |
| SEO-01 | Phase 1 | Pending |
| SEO-02 | Phase 1 | Pending |
| SEO-03 | Phase 1 | Pending |
| SEO-04 | Phase 1 | Pending |
| SEO-05 | Phase 1 | Pending |
| SEO-06 | Phase 1 | Pending |
| SEO-07 | Phase 1 | Pending |
| PERF-01 | Phase 6 | Pending |
| PERF-02 | Phase 6 | Pending |
| PERF-03 | Phase 6 | Pending |
| PERF-04 | Phase 6 | Pending |
| PERF-05 | Phase 6 | Pending |
| PERF-06 | Phase 6 | Pending |
| PERF-07 | Phase 6 | Pending |
| INT-01 | Phase 5 | Pending |
| INT-02 | Phase 5 | Pending |
| INT-03 | Phase 5 | Pending |
| INT-04 | Phase 5 | Pending |
| INT-05 | Phase 5 | Pending |
| INT-06 | Phase 5 | Pending |
| GBP-01 | Phase 6 | Pending |
| GBP-02 | Phase 6 | Pending |
| GBP-03 | Phase 6 | Pending |

**Coverage:**
- v1 requirements: 34 total
- Mapped to phases: 34 (100% coverage)
- Unmapped: 0
- Removed: 5 (CONTENT-01, CONTENT-02, RESULTS-01, RESULTS-02, RESULTS-03)

**Phase Breakdown:**
- Phase 1 (SEO Foundation): 7 requirements
- Phase 2 (Component Architecture): 5 requirements
- Phase 3 (Translation QA): 3 requirements
- Phase 4 (Geolocation): 6 requirements
- Phase 5 (Integrations): 6 requirements
- Phase 6 (Performance & Launch): 10 requirements

---
*Requirements defined: 2026-01-25*
*Last updated: 2026-01-27 after removing Phase 5 (Content & Results Page)*

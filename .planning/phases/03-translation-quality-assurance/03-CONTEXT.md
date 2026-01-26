# Phase 3: Translation Quality Assurance - Context

**Gathered:** 2026-01-26
**Status:** Ready for planning

<domain>
## Phase Boundary

Verify and improve Dutch and Danish translation quality across the site. The translation infrastructure is built (Phase 2) - this phase ensures translations are grammatically correct, culturally appropriate, and free of mixed-language content.

**In scope:** Quality validation and correction of existing translations
**Out of scope:** New translation keys, additional languages, infrastructure changes

</domain>

<decisions>
## Implementation Decisions

### Validation Approach
- **Method:** Mixed approach - run automated grammar tools (LanguageTool for Dutch, RetMig for Danish) AND get native speaker feedback in parallel
- **Error threshold:** Context-dependent errors acceptable - some false positives OK if context justifies them (brand names, technical terms)
- **Validation scope:** Priority tiers - Critical (Header/Footer/Homepage/Contact), High (Services/Results), Medium (Blog content post-launch)
- **Mixed-language policy:** Common loan words acceptable - brand terms ("Rosey Co."), technical terms ("SEO", "Meta Ads"), and commonly adopted English words in Dutch/Danish business context ("marketing", "social media") are OK
- **Build integration:** Manual validation only for MVP - NOT part of CI/CD build process
- **Documentation:** Simple pass/fail report in VALIDATION.md with before/after error counts and example corrections

### Error Correction Process
- **Correction workflow:** Claude decides most efficient approach (inline vs batch vs log-first)
- **Verification:** Re-run automated validation after fixes to confirm errors resolved
- **Uncertain corrections:** Flag for native speaker review when multiple valid options exist
- **Commit strategy:** One commit per tier (Tier 1 fixes together, Tier 2 fixes together)

### Native Speaker Involvement
- **Budget/approach:** Free - use personal network (team members)
- **Timing:** Final validation only - native speakers review after automated fixes are complete
- **Feedback method:** Casual browse + feedback - show localhost site, they browse freely and mention anything that sounds off
- **Structure:** Informal team review, no formal review document needed

### Quality Benchmarks
- **Completion criteria:** Native approval - Dutch and Danish team members say "looks good" (primary success metric)
- **Measurement:** Track before/after error count to document improvement
- **Post-completion issues:** Fix immediately - any feedback from native speakers triggers corrections
- **Verification environment:** Local only - validate in dev environment, trust deployment works

### Claude's Discretion
- Specific grammar tool selection and configuration
- Error categorization (which errors are critical vs acceptable)
- Correction sequencing and batching strategy
- Documentation format details

</decisions>

<specifics>
## Specific Ideas

- Team works together in same environment - easy to show localhost and get immediate feedback
- Phase 2 already fixed 29 Danish ASCII approximations (Vakst→vækst, Få→på) - this phase focuses on grammar and naturalness
- Priority tiers mirror user-facing importance: homepage/navigation first, service content second, blog content last

</specifics>

<deferred>
## Deferred Ideas

None - discussion stayed within phase scope

</deferred>

---

*Phase: 03-translation-quality-assurance*
*Context gathered: 2026-01-26*

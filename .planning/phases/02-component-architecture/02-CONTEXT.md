# Phase 2: Component Architecture - Context

**Gathered:** 2026-01-26
**Status:** Ready for planning

<domain>
## Phase Boundary

Transform existing hardcoded English components (Header, Footer) to use the centralized translation system across all 6 locales (US, AU, UK, IE, NL, DK). Fix translation quality issues including Danish special characters (æ, ø, å) and mixed Dutch/English content. Components already exist with complete layout and styling - this phase makes them work multilingually.

</domain>

<decisions>
## Implementation Decisions

### Translation File Structure
- **Current state:** Nested object structure (correct approach)
- **Split by route:** Separate translation files to reduce bundle size
  - `common.ts` - Shared elements used on 2+ pages (nav, footer, buttons, form elements, error messages)
  - Route-specific files - Page headlines, page content, metadata, single-use strings
- **Naming:** `common.ts` + route-specific files matching app directory structure
- **Migration:** Direct migration (no backup branch needed)
- **Special characters:** Use actual UTF-8 characters in JSON (æ, ø, å) not Unicode escapes

### Locale Detection
- **Approach:** URL is source of truth → provides via React Context
- **Provider placement:** `app/[locale]/layout.tsx` (locale-scoped, not root)
- **Hooks:** Separate hooks pattern
  - `useLocale()` - Returns current locale string
  - `useTranslation()` - Returns translation function t()
- **Rationale:** Clean component code, server-side compatible, no prop drilling

### Currency Formatting
- **Method:** `Intl.NumberFormat` per locale
- **Why:** Browser-native, handles all locale rules automatically
  - US: $1,299
  - UK: £1,299
  - NL: € 1.299,00
- **No manual rules needed** - let JavaScript standard library handle it

### Missing Translation Handling
- **Development:** Show English fallback + console warning
- **Production:** Show English fallback silently
- **Build behavior:** Don't fail build, allow graceful degradation
- **Fix strategy:** Fix missing translations as we find them during Phase 2 implementation

### Translation Quality Fixes (Phase 2 Scope)
- **Danish special characters:** Fix all instances during restructuring
  - Ae → æ
  - Oe → ø
  - Aa → å
  - Example: "Vakst" → "vækst"
- **Dutch:** Fix obvious mixed-language issues and incomplete translations as encountered
- **Validation:** Ensure same translation makes sense in both DK and NL contexts

### TypeScript Type Safety
- **Approach:** Manual TypeScript interfaces for translation keys
- **Benefit:** Catch typos at compile time
- **Maintenance:** Update interfaces when adding new translation keys

### Claude's Discretion
- Exact structure of TypeScript translation interfaces
- Hook implementation details (as long as API matches useLocale()/useTranslation())
- File organization within route-specific translation files
- Order of implementing fixes (Danish vs Dutch)

</decisions>

<specifics>
## Specific Ideas

**Known issues to fix:**
- Danish: Missing special characters (æ, ø, å) - e.g., "Vakst" should be "vækst"
- Dutch: Mixed English/Dutch content (e.g., "Your Business" should be "Uw Bedrijf")
- Dutch: Some translations incomplete or don't flow naturally

**Decision rule for common.ts:**
- If text appears on 2+ pages → common.ts
- If text appears on 1 page → route-specific file
- Minimizes duplication while keeping files focused

**Priority:**
1. Restructure translation files (common + route-specific)
2. Add TypeScript interfaces
3. Implement locale context + hooks
4. Fix Danish special characters
5. Fix obvious Dutch issues
6. Update Header/Footer to use translation system
7. Verify currency formatting with Intl.NumberFormat

</specifics>

<deferred>
## Deferred Ideas

None - discussion stayed within phase scope. Translation quality deep-dive (native speaker review) remains in Phase 3 as planned.

</deferred>

---

*Phase: 02-component-architecture*
*Context gathered: 2026-01-26*

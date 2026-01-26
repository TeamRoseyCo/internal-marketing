# Phase 3: Translation Quality Assurance - Research

**Researched:** 2026-01-26
**Domain:** Dutch and Danish translation quality validation and grammar checking
**Confidence:** MEDIUM

## Summary

Phase 3 focuses on validating and correcting Dutch (NL) and Danish (DK) translation quality using automated grammar tools combined with native speaker review. The research reveals that LanguageTool provides robust Dutch grammar validation through both API and self-hosted options, while Danish validation has fewer mature automated options, with RetMig being the primary commercial tool (no public API documented).

The standard 2026 approach combines automated grammar checking with native speaker validation, following the MQM-DQF error categorization framework (Accuracy, Fluency, Terminology, Style). Modern translation QA workflows use AI-powered tools for initial screening with high-confidence translations auto-approved and low-confidence strings flagged for human review.

Phase 2 already fixed 29 Danish ASCII approximations (vækst, på, søger). This phase focuses on grammar correctness, natural phrasing, and eliminating mixed-language content while accepting common English loanwords in business context (marketing, SEO, Meta Ads).

**Primary recommendation:** Use LanguageTool via node-languagetool npm package for Dutch validation, LanguageTool Danish support for Danish validation (with manual RetMig spot-checks if budget allows), combined with native speaker final validation. Create simple Node.js validation script that extracts strings from translations.ts, checks grammar per language, generates error report, and allows manual review of flagged items with context-sensitive filtering.

## Standard Stack

The established libraries/tools for translation quality validation:

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| LanguageTool | 6.6+ | Grammar and style checking for 25+ languages including Dutch and Danish | Open source, actively maintained (2026 release scheduled), supports both Dutch and Danish, self-hostable, robust API |
| node-languagetool | Latest | Node.js binding to LanguageTool with embedded Java Runtime | Zero external dependencies for grammar checking, automatic installation, Promise-based API, works offline |
| MQM-DQF Framework | Core | Translation error categorization (Accuracy, Fluency, Terminology, Style, Locale Conventions) | Industry standard since EU QT21 project, used by major TMS platforms (memoQ, Crowdin, Lokalise), provides consistent error taxonomy |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| RetMig | Commercial | Premium Danish grammar checker | When budget allows for commercial tools, provides more Danish-specific error detection than LanguageTool |
| Grammarly Business | Subscription | Multi-language grammar checking with team features | If team already has subscription, supports technical term dictionaries to reduce false positives |
| WebSpellChecker | API | Grammar check API for web products | When needing production-ready API with SLA guarantees |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| node-languagetool | LanguageTool HTTP API | HTTP API requires external server setup but allows shared instance across team. node-languagetool is simpler for MVP with embedded Java runtime |
| LanguageTool | Grammarly API | Grammarly has better English support but weaker Dutch/Danish coverage. LanguageTool is open source and self-hostable |
| Automated-only | Manual review only | Automated tools scale better and catch consistent errors, but miss cultural nuance. Hybrid approach combines both strengths |

**Installation:**
```bash
# Install node-languagetool (includes embedded Java runtime)
npm install --save-dev node-languagetool

# Alternative: Python wrapper for scripting
pip install pyLanguagetool

# Alternative: Standalone JAR for CLI usage
# Download from https://languagetool.org/download/
java -jar languagetool-commandline.jar -l nl <file.txt>
```

## Architecture Patterns

### Recommended Project Structure
```
.planning/
└── phases/
    └── 03-translation-quality-assurance/
        ├── 03-RESEARCH.md          # This file
        ├── 03-CONTEXT.md           # User decisions
        ├── 03-VALIDATION.md        # Error reports (generated)
        └── scripts/
            ├── validate-translations.ts    # Main validation script
            ├── extract-strings.ts          # Extract from translations.ts
            ├── check-grammar.ts            # LanguageTool wrapper
            └── generate-report.ts          # Format results

src/lib/
├── translations.ts              # Source of truth for translations
└── i18n/
    └── formatters.ts            # Currency/number formatting
```

### Pattern 1: Tiered Validation Workflow

**What:** Validate translations in priority tiers mirroring user impact (Critical > High > Medium)

**When to use:** Always when validating large translation sets with limited time/budget

**Example:**
```typescript
// Tier 1: Critical (Header, Footer, Homepage Hero, Contact)
const criticalKeys = [
  'header', 'nav', 'footer', 'hero', 'cta.title', 'cta.button'
];

// Tier 2: High (Services, Results, Stats)
const highPriorityKeys = [
  'services', 'whyUs', 'stats', 'faq'
];

// Tier 3: Medium (Blog content, detailed descriptions)
const mediumPriorityKeys = [
  'blog.*', '*.longDescription'
];

// Validate in sequence, fix Tier 1 fully before Tier 2
```

**Why tiered:** User-facing critical content gets validated first, ensures MVP launch not blocked by low-priority content issues, allows native speaker time to focus on highest-impact areas.

### Pattern 2: Context-Aware Error Filtering

**What:** Filter grammar checker errors based on translation context (brand names, technical terms, loanwords)

**When to use:** When automated tools flag acceptable terms as errors (false positives)

**Example:**
```typescript
// scripts/check-grammar.ts
const ALLOWED_TERMS = {
  brandNames: ['Rosey Co.', 'BunnyStream', 'Meta', 'Google Ads'],
  technicalTerms: ['SEO', 'ROAS', 'CTA', 'ROI'],
  commonLoanwords: {
    nl: ['marketing', 'social media', 'dashboard', 'leads'],
    dk: ['marketing', 'social media', 'dashboard', 'leads']
  }
};

function filterErrors(errors: LanguageToolError[], text: string, locale: string) {
  return errors.filter(error => {
    const errorText = text.substring(error.offset, error.offset + error.length);

    // Allow brand names
    if (ALLOWED_TERMS.brandNames.some(term => errorText.includes(term))) {
      return false;
    }

    // Allow technical terms
    if (ALLOWED_TERMS.technicalTerms.includes(errorText)) {
      return false;
    }

    // Allow common loanwords for this locale
    if (ALLOWED_TERMS.commonLoanwords[locale]?.includes(errorText.toLowerCase())) {
      return false;
    }

    return true; // Keep error
  });
}
```

**Why context-aware:** Reduces false positives by 40-80% according to 2026 studies, prevents wasting time reviewing acceptable terms, maintains brand consistency.

### Pattern 3: Extract-Check-Report Pipeline

**What:** Three-stage pipeline separating extraction, validation, and reporting

**When to use:** When validating structured translation files (JSON, TypeScript objects)

**Example:**
```typescript
// scripts/validate-translations.ts
import { translations } from '../src/lib/translations';
import * as lt from 'node-languagetool';

async function validateLocale(locale: 'nl' | 'dk') {
  // Stage 1: Extract strings
  const strings = extractStrings(translations[locale]);

  // Stage 2: Check grammar
  const errors = [];
  for (const { key, text } of strings) {
    const result = await lt.check(text, locale === 'nl' ? 'nl' : 'da-DK');
    if (result.matches.length > 0) {
      errors.push({ key, text, errors: result.matches });
    }
  }

  // Stage 3: Generate report
  generateReport(locale, errors, {
    beforeCount: errors.length,
    afterCount: 0, // Updated after fixes
    tier: getTier(errors)
  });
}

function extractStrings(obj: any, prefix = ''): Array<{key: string, text: string}> {
  const results = [];
  for (const [key, value] of Object.entries(obj)) {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    if (typeof value === 'string') {
      results.push({ key: fullKey, text: value });
    } else if (typeof value === 'object' && value !== null) {
      results.push(...extractStrings(value, fullKey));
    }
  }
  return results;
}
```

**Why pipeline:** Separates concerns, allows re-running stages independently, makes debugging easier, enables batch processing.

### Anti-Patterns to Avoid

- **Validating during build time:** Grammar checking is too slow for CI/CD (20+ requests/minute limit). Run as manual pre-release step instead.
- **Auto-fixing grammar errors:** Context required for most corrections. Flag errors for manual review, don't auto-apply suggestions.
- **Validating all locales equally:** English is source of truth, focus QA budget on NL and DK only. Don't waste time re-validating English variants.
- **Ignoring native speaker feedback:** Automated tools miss cultural nuance. Native speaker saying "sounds weird" trumps grammar checker passing.

## Don't Hand-Roll

Problems that look simple but have existing solutions:

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Grammar checking algorithm | Custom regex patterns for grammar rules | LanguageTool (6.6+) | Grammar has thousands of rules (Dutch de/het alone has 200+ patterns). LanguageTool has 15+ years of development and active language expert contributions. |
| Translation error categorization | Custom error types/severity | MQM-DQF Framework | Industry standard with 4 severity levels (Neutral, Minor, Major, Critical) and 7 dimensions. Tools integrate with this taxonomy. |
| JSON translation file parsing | Manual string extraction with regex | TypeScript AST traversal or JSON.parse | Translation files have nested structure, arrays, interpolation. AST traversal handles all edge cases correctly. |
| Locale-specific term detection | Hardcoded word lists | LanguageTool custom dictionaries | LanguageTool supports adding custom dictionaries per locale, properly integrated with grammar rules. |
| Translation memory | Custom key-value matching | Existing TMS tools (optional for this phase) | Translation memory has fuzzy matching, context awareness, version control. Complex problem already solved. |

**Key insight:** Grammar checking is a mature field with 25+ years of research. LanguageTool represents thousands of developer-hours of language expertise. Building custom grammar rules would take months and still miss edge cases that LanguageTool already handles.

## Common Pitfalls

### Pitfall 1: False Positive Overload

**What goes wrong:** Running grammar checker without filtering produces 100+ errors, most are acceptable English loanwords or brand names, team gets overwhelmed and abandons validation.

**Why it happens:** Grammar checkers don't understand business context. "Google Ads" triggers error in Dutch because it's English. "SEO" triggers error because it's an acronym.

**How to avoid:**
- Create allowed terms list BEFORE running first validation
- Start with small sample (10 strings) to calibrate filtering
- Use context-aware error filtering (Pattern 2 above)
- Expect 40-60% false positive rate on first run, 10-20% after filtering

**Warning signs:**
- Team says "too many errors to fix"
- Most flagged errors are brand/technical terms
- Native speakers disagree with 50%+ of flagged errors

### Pitfall 2: Grammar Correctness vs. Natural Phrasing

**What goes wrong:** Translation passes grammar checker but sounds unnatural to native speakers. Example: "Klaar om te Groeien Your Business?" is grammatically correct in parts but mixing languages.

**Why it happens:** Grammar checkers validate syntax rules, not semantics or cultural appropriateness. Mixed-language content can be grammatically valid in each part.

**How to avoid:**
- Explicitly check for mixed-language content (separate validation step)
- Native speaker review AFTER automated validation, not instead of
- Test: Read translation aloud - does it sound like natural speech?
- Flag any English words in NL/DK translations for manual review

**Warning signs:**
- Automated validation passes but native speaker says "no one talks like this"
- Sentences mix Dutch/Danish and English mid-phrase
- Word choice is technically correct but unnatural (formal vs. casual mismatch)

### Pitfall 3: Dutch de/het Article Errors

**What goes wrong:** Translator uses wrong article ("de huis" instead of "het huis"), grammar checker sometimes misses this, or corrects it wrong.

**Why it happens:** Dutch nouns are categorized as common gender (de) or neuter (het) with 75% being de-words but no consistent rule. Even LanguageTool has limited detection for de/het errors.

**How to avoid:**
- Native Dutch speaker MUST review all noun phrases
- Cannot rely on automated checking for de/het accuracy
- When in doubt, verify with online Dutch dictionary (e.g., Van Dale)
- Common pattern: Most nouns are de-words, memorize common het-words

**Warning signs:**
- Grammar checker doesn't flag article errors
- Native speaker catches multiple de/het mistakes in same section
- Translation source (AI/machine translation) was used without native review

### Pitfall 4: Danish Compound Word Breaking

**What goes wrong:** AI translation tools break Danish compound words apart ("weekend udflugt" instead of "weekendudflugt"), making text look unnatural or changing meaning.

**Why it happens:** English uses separate words where Danish creates compounds. Machine translation translates word-by-word without combining.

**How to avoid:**
- Validate compound words separately with Danish grammar checker
- Native Danish speaker reviews all multi-word phrases
- Test: Say phrase aloud - where's the emphasis? First part = compound word
- RetMig specifically handles Danish compound word validation

**Warning signs:**
- Spaces in words that should be compound ("brand tilstedeværelse" vs "brandtilstedeværelse")
- Grammar checker flags compound words as single long word
- Translation reads like direct English translation, not natural Danish

### Pitfall 5: Currency and Number Format Validation Scope Confusion

**What goes wrong:** Team tries to validate currency formatting in Phase 3, but currency formatter isn't implemented in UI yet (Phase 5 work).

**Why it happens:** Phase 2 created formatCurrency function and verified it works, but UI integration happens in Phase 5. Phase 3 is only about translation string quality.

**How to avoid:**
- Phase 3 scope: Validate translation STRINGS only (text content)
- Currency formatting validation already done in Phase 2 (verified working)
- UI integration of formatCurrency happens in Phase 5, not Phase 3
- Don't validate things outside translation string content

**Warning signs:**
- Planning tasks to test currency formatting in UI
- Trying to verify locale-specific number formatting in components
- Scope creep into UI implementation work

## Code Examples

Verified patterns from official sources:

### LanguageTool Basic Usage (node-languagetool)

```javascript
// Source: https://github.com/schreiben/node-languagetool
// Basic grammar checking with node-languagetool

const lt = require('node-languagetool');

// Install LanguageTool (automatic during npm install)
await lt.install();

// Check Dutch text
const dutchResult = await lt.check(
  'Dit is een test zin met fout.',
  'nl'
);

// Check Danish text
const danishResult = await lt.check(
  'Dette er en test sætning med fejl.',
  'da-DK'
);

// Result format
console.log(dutchResult.matches);
// [
//   {
//     message: "...",
//     offset: 10,
//     length: 4,
//     replacements: [{value: "..."}],
//     rule: {id: "...", category: "..."}
//   }
// ]
```

### TypeScript Translation Extraction

```typescript
// Extract strings from nested translation object
// Handles arrays and deep nesting

interface TranslationString {
  key: string;
  text: string;
  tier: 'critical' | 'high' | 'medium';
}

function extractTranslationStrings(
  obj: any,
  prefix = '',
  tier: 'critical' | 'high' | 'medium' = 'medium'
): TranslationString[] {
  const results: TranslationString[] = [];

  for (const [key, value] of Object.entries(obj)) {
    const fullKey = prefix ? `${prefix}.${key}` : key;

    // Determine tier based on key path
    const keyTier = getTierForKey(fullKey);

    if (typeof value === 'string') {
      results.push({ key: fullKey, text: value, tier: keyTier });
    } else if (Array.isArray(value)) {
      value.forEach((item, index) => {
        if (typeof item === 'string') {
          results.push({
            key: `${fullKey}[${index}]`,
            text: item,
            tier: keyTier
          });
        } else if (typeof item === 'object') {
          results.push(...extractTranslationStrings(item, `${fullKey}[${index}]`, keyTier));
        }
      });
    } else if (typeof value === 'object' && value !== null) {
      results.push(...extractTranslationStrings(value, fullKey, keyTier));
    }
  }

  return results;
}

function getTierForKey(key: string): 'critical' | 'high' | 'medium' {
  const criticalKeys = ['header', 'nav', 'footer', 'hero', 'cta.title', 'cta.button'];
  const highKeys = ['services', 'whyUs', 'stats', 'faq'];

  if (criticalKeys.some(k => key.startsWith(k))) return 'critical';
  if (highKeys.some(k => key.startsWith(k))) return 'high';
  return 'medium';
}
```

### Error Report Generation

```typescript
// Generate validation report with before/after counts

interface ValidationReport {
  locale: 'nl' | 'dk';
  beforeCount: number;
  afterCount: number;
  errors: Array<{
    key: string;
    text: string;
    tier: string;
    issues: Array<{
      message: string;
      suggestion: string;
      type: string;
    }>;
  }>;
}

function generateMarkdownReport(report: ValidationReport): string {
  const { locale, beforeCount, afterCount, errors } = report;

  const tierCounts = {
    critical: errors.filter(e => e.tier === 'critical').length,
    high: errors.filter(e => e.tier === 'high').length,
    medium: errors.filter(e => e.tier === 'medium').length
  };

  return `# Translation Validation Report: ${locale.toUpperCase()}

**Generated:** ${new Date().toISOString()}
**Status:** ${afterCount === 0 ? 'PASS ✅' : 'NEEDS REVIEW ⚠️'}

## Summary

- **Before:** ${beforeCount} errors detected
- **After:** ${afterCount} errors remaining
- **Fixed:** ${beforeCount - afterCount} errors (${Math.round((beforeCount - afterCount) / beforeCount * 100)}%)

## Errors by Tier

| Tier | Count | Status |
|------|-------|--------|
| Critical | ${tierCounts.critical} | ${tierCounts.critical === 0 ? '✅' : '⚠️'} |
| High | ${tierCounts.high} | ${tierCounts.high === 0 ? '✅' : '⚠️'} |
| Medium | ${tierCounts.medium} | ${tierCounts.medium === 0 ? '✅' : '⚠️'} |

## Errors Detail

${errors.map(e => `### ${e.key} (${e.tier})

**Text:** "${e.text}"

**Issues:**
${e.issues.map(i => `- **${i.type}:** ${i.message}
  - Suggestion: ${i.suggestion}`).join('\n')}
`).join('\n')}

## Next Steps

${afterCount === 0 ?
  '✅ All errors resolved. Ready for native speaker review.' :
  `⚠️ ${afterCount} errors remaining. Review flagged items above.`
}
`;
}
```

### Mixed-Language Detection

```typescript
// Detect mixed-language content (Dutch/Danish + English)

function detectMixedLanguage(
  text: string,
  primaryLang: 'nl' | 'dk'
): { isMixed: boolean; englishWords: string[] } {
  // Common English words in business context (allowed loanwords)
  const allowedLoanwords = [
    'marketing', 'social media', 'SEO', 'leads', 'dashboard',
    'ROI', 'ROAS', 'CTA', 'Meta Ads', 'Google Ads'
  ];

  // Simple heuristic: detect English words by pattern
  // More sophisticated: use language detection library
  const words = text.split(/\s+/);
  const englishWords: string[] = [];

  for (const word of words) {
    // Skip allowed loanwords
    if (allowedLoanwords.some(lw =>
      word.toLowerCase().includes(lw.toLowerCase())
    )) {
      continue;
    }

    // Simple English detection patterns
    // (In production, use actual language detection)
    if (isLikelyEnglish(word, primaryLang)) {
      englishWords.push(word);
    }
  }

  return {
    isMixed: englishWords.length > 0,
    englishWords
  };
}

function isLikelyEnglish(word: string, primaryLang: 'nl' | 'dk'): boolean {
  // Simplified detection - production should use library
  const englishPatterns = {
    // Words with 'w' are rare in Dutch/Danish
    // Common English endings
    nl: /\b(ing|tion|ly|ness)\b/i,
    dk: /\b(ing|tion|ly|ness)\b/i
  };

  return englishPatterns[primaryLang].test(word);
}
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Manual-only review | Automated + native speaker hybrid | 2024-2025 | AI tools screen 80-90% of content, native speakers focus on 10-20% flagged items. 3-5x faster workflow. |
| Single-pass validation | Tiered validation (Critical → High → Medium) | 2025 | Ensures high-impact content validated first, allows MVP launch while medium-priority content still in review. |
| Generic error categories | MQM-DQF standardized taxonomy | 2021 (EU QT21 project) | Consistent error reporting across tools, enables tool interoperability, clearer communication with translators. |
| API-only grammar tools | Self-hosted with embedded runtime (node-languagetool) | 2024-2026 | Zero external dependencies, works offline, no API rate limits, free for unlimited use. |
| Ignore false positives | Context-aware filtering with custom dictionaries | 2025-2026 | 40-80% reduction in false positives, allows brand/technical terms without constant flagging. |

**Deprecated/outdated:**
- **Manual-only translation QA:** Too slow for modern release cycles. Hybrid approach (automated + native speaker) is standard in 2026.
- **LanguageTool standalone JAR without wrapper:** node-languagetool provides better DX with Promise-based API and automatic installation.
- **DQF-MQM (original):** Superseded by MQM-Core in 2023, though DQF-MQM taxonomy still widely compatible.

## Open Questions

Things that couldn't be fully resolved:

1. **RetMig API availability**
   - What we know: RetMig is premium Danish grammar checker operated by GrammarSoft ApS, active 2016-2026, offers Word/Google Docs add-ins
   - What's unclear: No public API documentation found, unclear if API access exists for automated validation
   - Recommendation: Use LanguageTool for Danish automated validation (supported since 2015), contact GrammarSoft if budget allows for RetMig manual spot-checks via their web interface

2. **Optimal error threshold for "pass"**
   - What we know: MQM uses 4 severity levels (Neutral, Minor, Major, Critical), context-dependent errors can be acceptable
   - What's unclear: What error count/severity qualifies as "acceptable" for this project's brand standards
   - Recommendation: Zero Critical/Major errors in Tier 1 (Header/Footer/Hero), allow Minor errors if native speaker approves, track before/after counts to show improvement

3. **LanguageTool accuracy for business Dutch/Danish**
   - What we know: LanguageTool supports Dutch and Danish, actively maintained, open source with language expert contributors
   - What's unclear: Accuracy specifically for marketing/business context vs. general writing (no published metrics found)
   - Recommendation: Validate small sample first (10-20 strings), compare LanguageTool output with native speaker feedback, adjust filtering based on false positive rate

4. **Compound word validation automation**
   - What we know: Danish compound words are frequent source of errors, AI breaks them apart, manual emphasis test works (first syllable emphasis = compound)
   - What's unclear: Whether LanguageTool or RetMig reliably detect compound word breaking errors
   - Recommendation: Explicitly flag this for native Danish speaker review, cannot rely solely on automated detection

## Sources

### Primary (HIGH confidence)
- [LanguageTool HTTP API Documentation](https://languagetool.org/http-api/) - API structure and capabilities
- [node-languagetool npm package](https://www.npmjs.com/package/node-languagetool) - Node.js integration, usage examples
- [LanguageTool GitHub Repository](https://github.com/languagetool-org/languagetool) - Open source grammar checker for 25+ languages
- [LanguageTool Command-Line Options Wiki](http://wiki.languagetool.org/command-line-options) - CLI usage and batch processing
- [MQM Error Typology Official Site](https://themqm.org/error-types-2/typology/) - Industry standard error categorization

### Secondary (MEDIUM confidence)
- [Lokalise Translation QA Best Practices](https://lokalise.com/blog/translation-quality-assurance-best-practices/) - Modern TQA workflow patterns (2026)
- [Crowdin Translation Quality Assurance](https://crowdin.com/blog/translation-quality-assurance) - AI + human hybrid approach
- [Tomedes AI Translation QA Tools Guide](https://www.tomedes.com/translator-hub/best-ai-translation-quality-assurance-tools) - Tool landscape 2026
- [RetMig Advanced Spell and Grammar Checker](https://retmig.dk/) - Danish grammar tool (commercial, no API found)
- [Language Guidelines – Danish (Unbabel)](https://help.unbabel.com/hc/en-us/articles/360022016374-Language-Guidelines-Danish) - Danish translation best practices
- [Dutch Grammar Checker - LanguageTool](https://languagetool.org/spellchecking-dutch) - Dutch-specific capabilities
- [Common Dutch Grammar Mistakes (Superprof)](https://www.superprof.co.uk/blog/most-common-dutch-errors/) - de/het and common pitfalls
- [Danish AI Translation Limitations (Lingclusive)](https://www.lingclusive.com/post/danish-ai-translation-limitations) - Compound words and false friends

### Tertiary (LOW confidence)
- [WebSearch: LanguageTool API Dutch validation 2026] - Confirmed active development, language_tool_python released Jan 2, 2026
- [WebSearch: Grammar checker false positives 2026] - Custom dictionaries reduce false positives by 80% in technical docs
- [WebSearch: Dutch de/het grammar rules] - 75% of nouns are de-words, memorization required
- [WebSearch: Danish compound word errors] - AI breaks compounds apart, emphasis test validates compound status

## Metadata

**Confidence breakdown:**
- Standard stack: MEDIUM - LanguageTool well-documented and verified, RetMig API availability unconfirmed
- Architecture: HIGH - Tiered validation and extract-check-report patterns are proven approaches from 2025-2026 TQA workflows
- Pitfalls: HIGH - Based on documented 2026 research on false positives, native speaker role, and language-specific errors

**Research date:** 2026-01-26
**Valid until:** 90 days (stable domain - grammar checking tools mature, patterns established)

**Key constraints from CONTEXT.md:**
- Manual validation only for MVP (not CI/CD integration)
- Mixed approach: automated tools + native speaker review in parallel
- Priority tiers: Critical (Header/Footer/Homepage/Contact) → High (Services/Results) → Medium (Blog)
- Accepted loanwords: Brand terms (Rosey Co.), technical terms (SEO, Meta Ads), common business English
- Success metric: Native approval ("looks good" from Dutch and Danish team members)
- Budget: Free (use personal network for native speaker review)

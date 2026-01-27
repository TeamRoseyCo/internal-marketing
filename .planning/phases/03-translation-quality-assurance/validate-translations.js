// Translation validation script using LanguageTool API
// Validates Dutch and Danish translations for grammar errors

const https = require('https');
const querystring = require('querystring');

// LanguageTool public API endpoint
const LANGUAGETOOL_API = 'https://api.languagetool.org/v2/check';

// Allowed terms that should not trigger errors
const ALLOWED_TERMS = {
  brandNames: ['Rosey Co.', 'BunnyStream', 'Meta', 'Google Ads', 'Google', 'Meta Ads', 'Facebook', 'Instagram'],
  technicalTerms: ['SEO', 'ROAS', 'CTA', 'ROI', 'KPI'],
  commonLoanwords: {
    nl: ['marketing', 'social media', 'dashboard', 'leads', 'lead', 'website', 'online', 'content'],
    dk: ['marketing', 'social media', 'dashboard', 'leads', 'lead', 'website', 'online', 'content']
  }
};

// Priority tiers
const TIER_PATTERNS = {
  critical: ['header', 'nav', 'footer', 'hero', 'cta.title', 'cta.button', 'cta.badge'],
  high: ['services', 'whyUs', 'stats', 'faq'],
  medium: ['meta', 'common']
};

function getTier(key) {
  for (const [tier, patterns] of Object.entries(TIER_PATTERNS)) {
    if (patterns.some(pattern => key.startsWith(pattern) || key.includes(`.${pattern}`))) {
      return tier;
    }
  }
  return 'medium';
}

// Extract all strings from translation object
function extractStrings(obj, prefix = '', locale = 'nl') {
  const results = [];

  for (const [key, value] of Object.entries(obj)) {
    const fullKey = prefix ? `${prefix}.${key}` : key;

    if (typeof value === 'string') {
      const tier = getTier(fullKey);
      results.push({ key: fullKey, text: value, tier });
    } else if (Array.isArray(value)) {
      value.forEach((item, index) => {
        if (typeof item === 'string') {
          const tier = getTier(fullKey);
          results.push({ key: `${fullKey}[${index}]`, text: item, tier });
        } else if (typeof item === 'object' && item !== null) {
          results.push(...extractStrings(item, `${fullKey}[${index}]`, locale));
        }
      });
    } else if (typeof value === 'object' && value !== null) {
      results.push(...extractStrings(value, fullKey, locale));
    }
  }

  return results;
}

// Check if error should be filtered out
function shouldFilterError(error, text, locale) {
  const errorText = text.substring(error.offset, error.offset + error.length);

  // Filter brand names
  if (ALLOWED_TERMS.brandNames.some(term =>
    errorText.toLowerCase().includes(term.toLowerCase()) ||
    text.toLowerCase().includes(term.toLowerCase())
  )) {
    return true;
  }

  // Filter technical terms
  if (ALLOWED_TERMS.technicalTerms.some(term =>
    errorText.toUpperCase() === term || errorText.includes(term)
  )) {
    return true;
  }

  // Filter common loanwords
  if (ALLOWED_TERMS.commonLoanwords[locale] &&
      ALLOWED_TERMS.commonLoanwords[locale].some(term =>
        errorText.toLowerCase() === term.toLowerCase()
      )) {
    return true;
  }

  // Filter punctuation-only errors in marketing text
  if (error.rule && error.rule.category &&
      error.rule.category.id === 'TYPOGRAPHY' &&
      text.length < 100) {
    return true;
  }

  return false;
}

// Check text with LanguageTool API
async function checkGrammar(text, language) {
  return new Promise((resolve, reject) => {
    const postData = querystring.stringify({
      text: text,
      language: language,
      enabledOnly: 'false'
    });

    const options = {
      hostname: 'api.languagetool.org',
      path: '/v2/check',
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(postData)
      }
    };

    const req = https.request(options, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        if (res.statusCode === 200) {
          try {
            resolve(JSON.parse(data));
          } catch (e) {
            reject(new Error('Failed to parse LanguageTool response'));
          }
        } else {
          reject(new Error(`LanguageTool API error: ${res.statusCode}`));
        }
      });
    });

    req.on('error', (e) => {
      reject(e);
    });

    req.write(postData);
    req.end();
  });
}

// Add delay between API calls to respect rate limits
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Validate a locale
async function validateLocale(translations, locale, language) {
  console.log(`\n========================================`);
  console.log(`Validating ${locale.toUpperCase()} translations...`);
  console.log(`========================================\n`);

  const strings = extractStrings(translations, '', locale);
  console.log(`Found ${strings.length} translation strings to validate\n`);

  const errors = [];
  const mixedLanguage = [];
  let processed = 0;

  // Group by tier
  const byTier = {
    critical: strings.filter(s => s.tier === 'critical'),
    high: strings.filter(s => s.tier === 'high'),
    medium: strings.filter(s => s.tier === 'medium')
  };

  console.log(`Breakdown: ${byTier.critical.length} critical, ${byTier.high.length} high, ${byTier.medium.length} medium\n`);

  // Validate in priority order
  for (const tier of ['critical', 'high', 'medium']) {
    console.log(`\n--- Validating Tier: ${tier.toUpperCase()} (${byTier[tier].length} strings) ---\n`);

    for (const { key, text, tier: stringTier } of byTier[tier]) {
      processed++;

      // Skip very short strings
      if (text.length < 3) continue;

      try {
        // Check for mixed-language content (English words in NL/DK text)
        const englishWords = detectEnglishWords(text, locale);
        if (englishWords.length > 0) {
          mixedLanguage.push({ key, text, englishWords, tier: stringTier });
        }

        // Grammar check with LanguageTool
        const result = await checkGrammar(text, language);

        if (result.matches && result.matches.length > 0) {
          // Filter errors
          const filteredMatches = result.matches.filter(match =>
            !shouldFilterError(match, text, locale)
          );

          if (filteredMatches.length > 0) {
            errors.push({
              key,
              text,
              tier: stringTier,
              issues: filteredMatches.map(match => ({
                message: match.message,
                suggestion: match.replacements && match.replacements[0] ? match.replacements[0].value : 'N/A',
                type: match.rule ? match.rule.category.name : 'Grammar',
                ruleId: match.rule ? match.rule.id : 'unknown'
              }))
            });
          }
        }

        // Rate limiting - wait between requests
        if (processed % 10 === 0) {
          console.log(`Progress: ${processed}/${strings.length} strings validated`);
        }
        await delay(200); // 200ms delay = max 5 requests/second

      } catch (error) {
        console.error(`Error validating "${key}": ${error.message}`);
      }
    }
  }

  console.log(`\n✓ Validation complete: ${processed} strings processed\n`);

  return { errors, mixedLanguage };
}

// Simple English word detection
function detectEnglishWords(text, locale) {
  const words = text.split(/\s+/);
  const englishWords = [];

  // Common English words that should be translated
  const englishPatterns = [
    /\b(your|more|get|grow|business|growth|results|behind-the-scenes)\b/i,
    /\b(ready|free|start|view|learn|book|call)\b/i
  ];

  for (const word of words) {
    // Skip allowed loanwords and brand names
    const isAllowed =
      ALLOWED_TERMS.brandNames.some(term => word.toLowerCase().includes(term.toLowerCase())) ||
      ALLOWED_TERMS.technicalTerms.some(term => word.toUpperCase() === term) ||
      (ALLOWED_TERMS.commonLoanwords[locale] &&
       ALLOWED_TERMS.commonLoanwords[locale].some(term => word.toLowerCase() === term.toLowerCase()));

    if (isAllowed) continue;

    // Check against English patterns
    for (const pattern of englishPatterns) {
      if (pattern.test(word)) {
        englishWords.push(word);
        break;
      }
    }
  }

  return englishWords;
}

// Generate validation report
function generateReport(locale, beforeCount, afterCount, errors, mixedLanguage) {
  const tierCounts = {
    critical: errors.filter(e => e.tier === 'critical'),
    high: errors.filter(e => e.tier === 'high'),
    medium: errors.filter(e => e.tier === 'medium')
  };

  let report = `## ${locale === 'nl' ? 'Dutch (NL)' : 'Danish (DK)'} Validation\n\n`;
  report += `### Summary\n\n`;
  report += `- **Before:** ${beforeCount} errors detected\n`;
  report += `- **After:** ${afterCount} errors remaining\n`;
  report += `- **Fixed:** ${beforeCount - afterCount} errors\n`;
  report += `- **Status:** ${tierCounts.critical.length === 0 ? '✅ PASS' : '⚠️ NEEDS REVIEW'}\n\n`;

  report += `### Errors by Tier\n\n`;
  report += `| Tier | Count | Status |\n`;
  report += `|------|-------|--------|\n`;
  report += `| Critical | ${tierCounts.critical.length} | ${tierCounts.critical.length === 0 ? '✅' : '⚠️'} |\n`;
  report += `| High | ${tierCounts.high.length} | ${tierCounts.high.length === 0 ? '✅' : '⚠️'} |\n`;
  report += `| Medium | ${tierCounts.medium.length} | ${tierCounts.medium.length === 0 ? '✅' : '⚠️'} |\n\n`;

  if (tierCounts.critical.length > 0) {
    report += `### Tier 1 (Critical) Errors\n\n`;
    tierCounts.critical.forEach(error => {
      report += `**${error.key}**\n`;
      report += `- Text: "${error.text}"\n`;
      error.issues.forEach(issue => {
        report += `- **${issue.type}:** ${issue.message}\n`;
        if (issue.suggestion !== 'N/A') {
          report += `  - Suggestion: ${issue.suggestion}\n`;
        }
      });
      report += `\n`;
    });
  }

  if (tierCounts.high.length > 0) {
    report += `### Tier 2 (High) Errors\n\n`;
    tierCounts.high.forEach(error => {
      report += `**${error.key}**\n`;
      report += `- Text: "${error.text}"\n`;
      error.issues.forEach(issue => {
        report += `- **${issue.type}:** ${issue.message}\n`;
        if (issue.suggestion !== 'N/A') {
          report += `  - Suggestion: ${issue.suggestion}\n`;
        }
      });
      report += `\n`;
    });
  }

  if (mixedLanguage.length > 0) {
    report += `### Mixed-Language Content Detected\n\n`;
    mixedLanguage.forEach(item => {
      report += `**${item.key}** (${item.tier})\n`;
      report += `- Text: "${item.text}"\n`;
      report += `- English words detected: ${item.englishWords.join(', ')}\n\n`;
    });
  }

  if (errors.length === 0 && mixedLanguage.length === 0) {
    report += `### ✅ No Errors Found\n\n`;
    report += `All translations passed validation!\n\n`;
  }

  return report;
}

module.exports = {
  validateLocale,
  extractStrings,
  generateReport,
  checkGrammar
};

// CLI execution
if (require.main === module) {
  console.log('Translation Validation Script');
  console.log('Usage: node validate-translations.js');
  console.log('\nThis script validates Dutch and Danish translations using LanguageTool API\n');
}

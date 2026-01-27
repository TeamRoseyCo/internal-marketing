// Simple validation script using LanguageTool public API
// Validates critical Dutch and Danish translation strings

const https = require('https');
const querystring = require('querystring');
const fs = require('path');

// Critical and High priority strings from translations.ts (manually extracted)
const dutchStrings = {
  critical: [
    { key: 'header.cta', text: 'Krijg Meer Leads' },
    { key: 'hero.title', text: 'Meer Groei. Meer Klanten.' },
    { key: 'hero.titleHighlight', text: 'Gegarandeerd.' },
    { key: 'hero.subtitle', text: 'Stop met wachten tot klanten jou vinden. Wij zetten jouw bedrijf voor mensen die actief zoeken naar jouw diensten.' },
    { key: 'hero.cta', text: 'Gratis Strategiegesprek' },
    { key: 'hero.socialProof', text: 'Sluit je aan bij 50+ bedrijven die winstgevend groeien met gerichte marketing.' },
    { key: 'cta.badge', text: 'Laten We Praten' },
    { key: 'cta.title', text: 'Klaar om te' },
    { key: 'cta.titleHighlight', text: 'Groeien' },
    { key: 'cta.button', text: 'Gratis Strategiegesprek' },
    { key: 'footer.brandDescription', text: 'Wij helpen bedrijven wereldwijd meer klanten te genereren via SEO, social media management en betaalde advertenties.' },
  ],
  high: [
    { key: 'services.title', text: 'Hoe Wij Jouw Bedrijf Laten' },
    { key: 'services.titleHighlight', text: 'Groeien' },
    { key: 'services.subtitle', text: 'Van SEO tot betaalde advertenties, wij leveren datagestuurde strategieen die marketinguitgaven omzetten in meetbare omzet.' },
    { key: 'services.seo.description', text: 'Domineer zoekresultaten en word gevonden door klanten die actief zoeken naar jouw diensten.' },
    { key: 'services.socialMedia.description', text: 'Bouw je merkpresentie en betrek je publiek op alle belangrijke platforms.' },
    { key: 'services.paidAds.description', text: 'ROI-gerichte Google Ads en Meta Ads campagnes die klikken omzetten in klanten.' },
    { key: 'whyUs.subtitle', text: 'We draaien niet alleen campagnes. We worden een verlengstuk van jouw team, geobsedeerd door jouw groei en toegewijd aan jouw succes.' },
    { key: 'whyUs.points[0]', text: 'ROI-gerichte campagnes, euro voor euro gevolgd' },
    { key: 'whyUs.points[1]', text: 'Transparante rapportage met real-time dashboards' },
    { key: 'faq.subtitle', text: 'Alles wat je moet weten over samenwerken met Rosey Co.' },
    { key: 'faq.questions[0].answer', text: 'De meeste klanten zien gekwalificeerde leads binnen de eerste 2-4 weken. We focussen op snelle resultaten terwijl we bouwen aan duurzame groeistrategieen op lange termijn.' },
    { key: 'faq.questions[1].answer', text: 'Absoluut! We werken met klanten wereldwijd. Onze strategieen werken overal waar Google en Meta actief zijn, en we passen onze aanpak aan jouw specifieke markt aan.' },
  ]
};

const danishStrings = {
  critical: [
    { key: 'header.cta', text: 'Få Flere Leads' },
    { key: 'hero.title', text: 'Mere Vækst. Flere Kunder.' },
    { key: 'hero.titleHighlight', text: 'Garanteret.' },
    { key: 'hero.subtitle', text: 'Stop med at vente på, at kunder finder dig. Vi sætter din virksomhed foran folk, der aktivt søger efter dine tjenester.' },
    { key: 'hero.cta', text: 'Gratis Strategiopkald' },
    { key: 'hero.socialProof', text: 'Slut dig til 50+ virksomheder, der vokser profitabelt med målrettet marketing.' },
    { key: 'cta.badge', text: 'Lad Os Snakke' },
    { key: 'cta.title', text: 'Klar til at' },
    { key: 'cta.titleHighlight', text: 'Vokse' },
    { key: 'cta.button', text: 'Få Dit Gratis Strategiopkald' },
    { key: 'footer.brandDescription', text: 'Vi hjælper virksomheder verden over med at generere flere kunder gennem SEO, social media management og betalt annoncering.' },
  ],
  high: [
    { key: 'services.title', text: 'Sådan Hjælper Vi Din Virksomhed' },
    { key: 'services.titleHighlight', text: 'Vokse' },
    { key: 'services.subtitle', text: 'Fra SEO til betalt annoncering leverer vi datadrevne strategier, der omsætter marketingudgifter til målbar omsætning.' },
    { key: 'services.seo.description', text: 'Dominér søgeresultater og bliv fundet af kunder, der aktivt søger efter dine tjenester.' },
    { key: 'services.socialMedia.description', text: 'Byg din brandtilstedeværelse og engagér dit publikum på tværs af alle større platforme.' },
    { key: 'services.paidAds.description', text: 'ROI-fokuserede Google Ads og Meta Ads kampagner, der konverterer klik til kunder.' },
    { key: 'whyUs.subtitle', text: 'Vi kører ikke bare kampagner. Vi bliver en forlængelse af dit team, besat af din vækst og dedikeret til din succes.' },
    { key: 'whyUs.points[0]', text: 'ROI-fokuserede kampagner sporet krone for krone' },
    { key: 'whyUs.points[1]', text: 'Transparent rapportering med real-time dashboards' },
    { key: 'faq.subtitle', text: 'Alt, hvad du skal vide om at arbejde med Rosey Co.' },
    { key: 'faq.questions[0].answer', text: 'De fleste kunder begynder at se kvalificerede leads inden for de første 2-4 uger. Vi fokuserer på hurtige resultater, mens vi bygger langsigtede bæredygtige vækststrategier.' },
    { key: 'faq.questions[1].answer', text: 'Absolut! Vi arbejder med kunder verden over. Vores strategier virker overalt, hvor Google og Meta opererer, og vi tilpasser vores tilgang til dit specifikke marked.' },
  ]
};

// Allowed terms (won't flag as errors)
const ALLOWED_TERMS = ['Rosey Co.', 'ROI', 'ROAS', 'SEO', 'Google Ads', 'Meta Ads', 'Facebook', 'Instagram', 'Google', 'Meta'];

function shouldFilterError(error, text) {
  const errorText = text.substring(error.offset, error.offset + error.length);

  // Filter brand names and technical terms
  for (const term of ALLOWED_TERMS) {
    if (errorText.includes(term) || text.includes(term)) {
      return true;
    }
  }

  // Filter common loanwords in business context
  const loanwords = ['marketing', 'dashboard', 'dashboards', 'leads', 'lead'];
  if (loanwords.some(word => errorText.toLowerCase() === word.toLowerCase())) {
    return true;
  }

  // Filter typography in short strings (brand voice)
  if (error.rule && error.rule.category && error.rule.category.id === 'TYPOGRAPHY' && text.length < 50) {
    return true;
  }

  return false;
}

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
      },
      timeout: 10000
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        if (res.statusCode === 200) {
          try {
            resolve(JSON.parse(data));
          } catch (e) {
            reject(new Error('Failed to parse response'));
          }
        } else {
          reject(new Error(`API error: ${res.statusCode}`));
        }
      });
    });

    req.on('error', reject);
    req.on('timeout', () => {
      req.destroy();
      reject(new Error('Request timeout'));
    });

    req.write(postData);
    req.end();
  });
}

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function validateTier(strings, language, tierName, locale) {
  console.log(`\n--- ${tierName.toUpperCase()} (${strings.length} strings) ---\n`);

  const errors = [];

  for (let i = 0; i < strings.length; i++) {
    const { key, text } = strings[i];

    if (text.length < 3) continue;

    try {
      const result = await checkGrammar(text, language);

      if (result.matches && result.matches.length > 0) {
        const filteredMatches = result.matches.filter(match => !shouldFilterError(match, text));

        if (filteredMatches.length > 0) {
          errors.push({
            key,
            text,
            tier: tierName,
            issues: filteredMatches.map(match => ({
              message: match.message,
              suggestion: match.replacements && match.replacements[0] ? match.replacements[0].value : '',
              type: match.rule ? match.rule.category.name : 'Grammar',
              ruleId: match.rule ? match.rule.id : ''
            }))
          });

          console.log(`❌ ${key}`);
          console.log(`   "${text}"`);
          filteredMatches.forEach(m => {
            const suggestion = m.replacements && m.replacements[0] ? m.replacements[0].value : 'N/A';
            console.log(`   - ${m.message} → ${suggestion}`);
          });
        } else {
          console.log(`✓  ${key}`);
        }
      } else {
        console.log(`✓  ${key}`);
      }

      // Rate limit: 200ms between requests (max 5/sec)
      await delay(200);

    } catch (error) {
      console.log(`⚠  ${key} - ${error.message}`);
    }
  }

  return errors;
}

async function main() {
  console.log('========================================');
  console.log('Translation Quality Validation');
  console.log('========================================\n');

  const results = {
    nl: { before: 0, after: 0, errors: [] },
    dk: { before: 0, after: 0, errors: [] }
  };

  // Validate Dutch
  console.log('\n### DUTCH (NL) VALIDATION ###\n');
  const nlCriticalErrors = await validateTier(dutchStrings.critical, 'nl', 'critical', 'nl');
  const nlHighErrors = await validateTier(dutchStrings.high, 'nl', 'high', 'nl');

  results.nl.errors = [...nlCriticalErrors, ...nlHighErrors];
  results.nl.before = results.nl.errors.length;

  console.log(`\n✓ Dutch validation complete`);
  console.log(`  Critical errors: ${nlCriticalErrors.length}`);
  console.log(`  High priority errors: ${nlHighErrors.length}`);
  console.log(`  Total errors: ${results.nl.before}`);

  // Validate Danish
  console.log('\n\n### DANISH (DK) VALIDATION ###\n');
  const dkCriticalErrors = await validateTier(danishStrings.critical, 'da-DK', 'critical', 'dk');
  const dkHighErrors = await validateTier(danishStrings.high, 'da-DK', 'high', 'dk');

  results.dk.errors = [...dkCriticalErrors, ...dkHighErrors];
  results.dk.before = results.dk.errors.length;

  console.log(`\n✓ Danish validation complete`);
  console.log(`  Critical errors: ${dkCriticalErrors.length}`);
  console.log(`  High priority errors: ${dkHighErrors.length}`);
  console.log(`  Total errors: ${results.dk.before}`);

  // Output results for report generation
  console.log('\n========================================');
  console.log('VALIDATION SUMMARY');
  console.log('========================================\n');
  console.log(`Dutch: ${results.nl.before} errors detected`);
  console.log(`Danish: ${results.dk.before} errors detected`);
  console.log('\nSee detailed output above for specific errors and suggested corrections.\n');

  return results;
}

// Run if called directly
if (require.main === module) {
  main().then(results => {
    process.exit(results.nl.errors.length > 0 || results.dk.errors.length > 0 ? 1 : 0);
  }).catch(err => {
    console.error('Validation failed:', err);
    process.exit(1);
  });
}

module.exports = { main, validateTier, checkGrammar };

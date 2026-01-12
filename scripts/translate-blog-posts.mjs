#!/usr/bin/env node
// scripts/translate-blog-posts.mjs
// Translates blog post frontmatter for all locales

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BLOG_DIR = path.join(__dirname, '..', 'src', 'content', 'blog');

// Translation mappings
const translations = {
  // Category translations
  categories: {
    nl: {
      'Paid Advertising': 'Betaalde Advertenties',
      'SEO': 'SEO',
      'Social Media': 'Social Media',
      'Website Design': 'Website Ontwerp',
      'General': 'Algemeen',
      'AI Marketing': 'AI Marketing',
      'Case Studies': 'Casestudies',
      'Marketing Strategy': 'Marketing Strategie',
    },
    dk: {
      'Paid Advertising': 'Betalt Annoncering',
      'SEO': 'SEO',
      'Social Media': 'Social Media',
      'Website Design': 'Webdesign',
      'General': 'Generelt',
      'AI Marketing': 'AI Marketing',
      'Case Studies': 'Casestudier',
      'Marketing Strategy': 'Marketingstrategi',
    },
  },

  // Common words/phrases for quick translation
  commonPhrases: {
    nl: {
      'Learn': 'Leer',
      'Guide': 'Gids',
      'How to': 'Hoe te',
      'Ultimate': 'Ultieme',
      'Complete': 'Volledige',
      'Essential': 'Essentiële',
      'Tips': 'Tips',
      'Strategies': 'Strategieën',
      'Best': 'Beste',
      'Top': 'Top',
      'Boost': 'Boost',
      'Increase': 'Verhoog',
      'Grow': 'Groei',
      'Your': 'Uw',
      'Business': 'Bedrijf',
      'Local': 'Lokaal',
      'ROI': 'ROI',
      'Results': 'Resultaten',
      'Success': 'Succes',
    },
    dk: {
      'Learn': 'Lær',
      'Guide': 'Guide',
      'How to': 'Hvordan man',
      'Ultimate': 'Ultimative',
      'Complete': 'Komplette',
      'Essential': 'Essentielle',
      'Tips': 'Tips',
      'Strategies': 'Strategier',
      'Best': 'Bedste',
      'Top': 'Top',
      'Boost': 'Boost',
      'Increase': 'Forøg',
      'Grow': 'Vækst',
      'Your': 'Din',
      'Business': 'Virksomhed',
      'Local': 'Lokal',
      'ROI': 'ROI',
      'Results': 'Resultater',
      'Success': 'Succes',
    },
  },
};

// Simple translation function (uses mappings)
function translateText(text, locale, type = 'general') {
  if (!text || locale === 'us' || locale === 'au' || locale === 'uk' || locale === 'ie') {
    return text;
  }

  let translated = text;

  // Translate categories
  if (type === 'category' && translations.categories[locale]) {
    return translations.categories[locale][text] || text;
  }

  // Translate common phrases
  if (translations.commonPhrases[locale]) {
    const phrases = translations.commonPhrases[locale];
    for (const [eng, trans] of Object.entries(phrases)) {
      const regex = new RegExp(`\\b${eng}\\b`, 'gi');
      translated = translated.replace(regex, trans);
    }
  }

  return translated;
}

// Parse frontmatter from MDX content
function parseFrontmatter(content) {
  // Handle both Unix and Windows line endings
  const normalizedContent = content.replace(/\r\n/g, '\n');
  const frontmatterRegex = /^---\n([\s\S]*?)\n---/;
  const match = normalizedContent.match(frontmatterRegex);

  if (!match) return null;

  const frontmatterText = match[1];
  const lines = frontmatterText.split('\n');
  const frontmatter = {};

  lines.forEach(line => {
    const colonIndex = line.indexOf(':');
    if (colonIndex === -1) return;

    const key = line.substring(0, colonIndex).trim();
    let value = line.substring(colonIndex + 1).trim();

    // Remove quotes
    value = value.replace(/^["']|["']$/g, '');

    // Parse arrays
    if (value.startsWith('[') && value.endsWith(']')) {
      value = value
        .slice(1, -1)
        .split(',')
        .map(v => v.trim().replace(/^["']|["']$/g, ''));
    }

    frontmatter[key] = value;
  });

  return {
    frontmatter,
    fullMatch: match[0],
    bodyContent: normalizedContent.substring(match[0].length),
  };
}

// Generate new frontmatter string
function generateFrontmatter(data, locale) {
  const lines = [];

  lines.push('---');

  // Translate title
  const title = locale === 'us' ? data.title : translateText(data.title, locale);
  lines.push(`title: "${title}"`);

  // Translate excerpt
  const excerpt = locale === 'us' ? data.excerpt : translateText(data.excerpt, locale);
  lines.push(`excerpt: "${excerpt}"`);

  // Translate category
  const category = translateText(data.category, locale, 'category');
  lines.push(`category: "${category}"`);

  // Keep date and author unchanged
  lines.push(`date: "${data.date}"`);
  lines.push(`author: "${data.author}"`);

  // Keep image unchanged
  if (data.image) {
    lines.push(`image: "${data.image}"`);
  }

  // Translate tags
  if (Array.isArray(data.tags)) {
    const translatedTags = data.tags.map(tag => translateText(tag, locale));
    lines.push(`tags: [${translatedTags.map(t => `"${t}"`).join(', ')}]`);
  }

  lines.push('---');

  return lines.join('\n');
}

// Process a single blog post file
function processBlogPost(usFilePath, locale) {
  const fileName = path.basename(usFilePath);
  const targetFilePath = path.join(BLOG_DIR, locale, fileName);

  // Skip if already translated (check if title differs from US version)
  if (fs.existsSync(targetFilePath)) {
    const usContent = fs.readFileSync(usFilePath, 'utf-8');
    const targetContent = fs.readFileSync(targetFilePath, 'utf-8');

    const usParsed = parseFrontmatter(usContent);
    const targetParsed = parseFrontmatter(targetContent);

    if (usParsed && targetParsed && usParsed.frontmatter.title !== targetParsed.frontmatter.title) {
      console.log(`✓ Skipping ${fileName} for ${locale.toUpperCase()} - already translated`);
      return { skipped: true };
    }
  }

  // Read US version
  const content = fs.readFileSync(usFilePath, 'utf-8');
  const parsed = parseFrontmatter(content);

  if (!parsed) {
    console.log(`✗ Could not parse ${fileName}`);
    return { error: true };
  }

  // Generate translated frontmatter
  const newFrontmatter = generateFrontmatter(parsed.frontmatter, locale);

  // Combine with body content
  const newContent = newFrontmatter + '\n' + parsed.bodyContent;

  // Write to target locale folder
  fs.writeFileSync(targetFilePath, newContent, 'utf-8');

  console.log(`✓ Translated ${fileName} to ${locale.toUpperCase()}`);
  return { success: true };
}

// Main execution
function main() {
  console.log('🌍 Blog Post Translation Tool\n');

  const usDir = path.join(BLOG_DIR, 'us');
  const locales = ['nl', 'dk'];

  if (!fs.existsSync(usDir)) {
    console.error('❌ US blog directory not found:', usDir);
    process.exit(1);
  }

  const usFiles = fs.readdirSync(usDir).filter(f => f.endsWith('.mdx'));

  console.log(`Found ${usFiles.length} blog posts to translate\n`);

  const stats = {
    nl: { success: 0, skipped: 0, errors: 0 },
    dk: { success: 0, skipped: 0, errors: 0 },
  };

  for (const locale of locales) {
    console.log(`\n📝 Translating to ${locale.toUpperCase()}...`);
    console.log('─'.repeat(50));

    for (const file of usFiles) {
      const usFilePath = path.join(usDir, file);
      const result = processBlogPost(usFilePath, locale);

      if (result.success) stats[locale].success++;
      if (result.skipped) stats[locale].skipped++;
      if (result.error) stats[locale].errors++;
    }
  }

  // Summary
  console.log('\n' + '═'.repeat(50));
  console.log('📊 Translation Summary');
  console.log('═'.repeat(50));

  for (const locale of locales) {
    console.log(`\n${locale.toUpperCase()}:`);
    console.log(`  ✓ Translated: ${stats[locale].success}`);
    console.log(`  ⊘ Skipped: ${stats[locale].skipped}`);
    console.log(`  ✗ Errors: ${stats[locale].errors}`);
  }

  console.log('\n✅ Translation complete!\n');
  console.log('⚠️  NOTE: This tool uses basic phrase mapping.');
  console.log('   For production, review and refine translations manually.\n');
}

main();

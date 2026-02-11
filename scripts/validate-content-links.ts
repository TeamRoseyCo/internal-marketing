// scripts/validate-content-links.ts
// Validates pillar-cluster content relationships and keyword mapping
// Usage: npx tsx scripts/validate-content-links.ts

import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { localeList, LocaleCode } from "../src/lib/locales";
import { validateKeywordMap } from "../src/lib/seo/keyword-map";

const PILLARS_DIR = path.join(process.cwd(), "src/content/pillars");
const BLOG_DIR = path.join(process.cwd(), "src/content/blog");

interface ValidationResult {
  locale: LocaleCode;
  pillarSlug: string;
  clusterCount: number;
  validClusters: string[];
  missingClusters: string[];
}

// Get all pillar slugs for a locale
function getPillarSlugs(locale: LocaleCode): string[] {
  const localePillarsDir = path.join(PILLARS_DIR, locale);

  if (!fs.existsSync(localePillarsDir)) {
    return [];
  }

  return fs
    .readdirSync(localePillarsDir)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(".mdx", ""));
}

// Validate pillar cluster references
function validatePillarClusterLinks(): ValidationResult[] {
  const results: ValidationResult[] = [];

  for (const locale of localeList) {
    const pillarSlugs = getPillarSlugs(locale);

    for (const pillarSlug of pillarSlugs) {
      const pillarPath = path.join(PILLARS_DIR, locale, `${pillarSlug}.mdx`);

      if (!fs.existsSync(pillarPath)) {
        continue;
      }

      const fileContent = fs.readFileSync(pillarPath, "utf-8");
      const { data } = matter(fileContent);

      const clusterPages = data.clusterPages || [];
      const validClusters: string[] = [];
      const missingClusters: string[] = [];

      for (const clusterSlug of clusterPages) {
        const clusterPath = path.join(BLOG_DIR, locale, `${clusterSlug}.mdx`);

        if (fs.existsSync(clusterPath)) {
          validClusters.push(clusterSlug);
        } else {
          missingClusters.push(clusterSlug);
        }
      }

      results.push({
        locale,
        pillarSlug,
        clusterCount: clusterPages.length,
        validClusters,
        missingClusters,
      });
    }
  }

  return results;
}

// Check cross-locale pillar consistency
function checkCrossLocaleConsistency(): { slug: string; locales: LocaleCode[] }[] {
  const pillarsBySlug = new Map<string, LocaleCode[]>();

  for (const locale of localeList) {
    const pillarSlugs = getPillarSlugs(locale);

    for (const slug of pillarSlugs) {
      if (!pillarsBySlug.has(slug)) {
        pillarsBySlug.set(slug, []);
      }
      pillarsBySlug.get(slug)!.push(locale);
    }
  }

  return Array.from(pillarsBySlug.entries()).map(([slug, locales]) => ({
    slug,
    locales,
  }));
}

// Main validation function
function main() {
  console.log("=== Content Link Validation ===\n");

  // Validate pillar-cluster relationships
  const results = validatePillarClusterLinks();

  let totalPillars = 0;
  let totalClustersReferenced = 0;
  let totalValidClusters = 0;
  let totalMissingClusters = 0;
  let warnings = 0;
  let errors = 0;

  for (const locale of localeList) {
    const localeResults = results.filter((r) => r.locale === locale);

    if (localeResults.length === 0) {
      continue;
    }

    console.log(`[locale: ${locale}]`);

    for (const result of localeResults) {
      totalPillars++;
      totalClustersReferenced += result.clusterCount;
      totalValidClusters += result.validClusters.length;
      totalMissingClusters += result.missingClusters.length;

      console.log(`  Pillar: ${result.pillarSlug} (${result.clusterCount} clusters)`);

      for (const cluster of result.validClusters) {
        console.log(`    ✓ ${cluster} exists`);
      }

      for (const cluster of result.missingClusters) {
        console.log(`    ✗ ${cluster} missing`);
        errors++;
      }

      if (result.clusterCount === 0) {
        console.log(`    ⚠ No clusters linked (orphan pillar)`);
        warnings++;
      }
    }

    console.log("");
  }

  // Cross-locale consistency check
  console.log("[Cross-locale check]");
  const consistency = checkCrossLocaleConsistency();

  for (const item of consistency) {
    if (item.locales.length === localeList.length) {
      console.log(`  ✓ ${item.slug} exists in all ${localeList.length} locales`);
    } else if (item.slug.includes("belfast")) {
      // Belfast-specific pillars are expected only in UK
      console.log(`  ✓ ${item.slug} is locale-specific (${item.locales.join(", ")})`);
    } else {
      console.log(`  ⚠ ${item.slug} only exists in ${item.locales.length} locales: ${item.locales.join(", ")}`);
      warnings++;
    }
  }

  console.log("");

  // Keyword cannibalization check
  console.log("[Keyword cannibalization]");
  try {
    validateKeywordMap();
    console.log("  ✓ No cannibalization detected");
  } catch (error) {
    console.log(`  ✗ Cannibalization issues detected`);
    console.log(`    ${error}`);
    errors++;
  }

  console.log("");

  // Summary
  console.log("=== Summary ===");
  console.log(`Pillars: ${totalPillars} (across ${localeList.length} locales)`);
  console.log(`Clusters referenced: ${totalClustersReferenced} (valid: ${totalValidClusters}, missing: ${totalMissingClusters})`);
  console.log(`Warnings: ${warnings}`);
  console.log(`Errors: ${errors}`);

  if (errors > 0) {
    console.log("\n❌ Validation failed with errors");
    process.exit(1);
  } else if (warnings > 0) {
    console.log("\n⚠️  Validation passed with warnings");
    process.exit(0);
  } else {
    console.log("\n✅ Validation passed");
    process.exit(0);
  }
}

main();

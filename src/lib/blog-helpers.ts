// src/lib/blog-helpers.ts
// Helper functions for blog functionality

import { BlogPageTranslations } from "./page-translations";

/**
 * Maps a blog category name to its translation key
 * Handles both English category names and already-translated names
 */
export function getCategoryTranslationKey(
  categoryName: string
): keyof BlogPageTranslations["categories"] {
  // Normalize the category name for comparison
  const normalized = categoryName.toLowerCase().replace(/\s+/g, "");

  // Map category names to translation keys
  const categoryMap: Record<string, keyof BlogPageTranslations["categories"]> = {
    "paidadvertising": "paidAdvertising",
    "seo": "seo",
    "socialmedia": "socialMedia",
    "websitedesign": "websiteDesign",
    "general": "general",
    "aimarketing": "aiMarketing",
    "casestudies": "caseStudies",
    "marketingstrategy": "marketingStrategy",
    "marketingstrategie": "marketingStrategy", // Dutch
    "marketingstrategi": "marketingStrategy", // Danish
    "casestudier": "caseStudies", // Danish
  };

  return categoryMap[normalized] || "general";
}

/**
 * Gets the translated category name
 */
export function getTranslatedCategory(
  categoryName: string,
  translations: BlogPageTranslations["categories"]
): string {
  const key = getCategoryTranslationKey(categoryName);
  return translations[key] || categoryName;
}

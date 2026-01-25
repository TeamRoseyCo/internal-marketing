// src/lib/seo.ts
// SEO utilities for multi-locale hreflang and metadata generation
// Used by all locale pages to ensure consistent hreflang implementation

import { LocaleCode, locales } from './locales';

const BASE_URL = 'https://roseyco.com';

/**
 * Generates hreflang alternates for all 6 locales plus x-default.
 * Use this in generateMetadata for any locale-aware page.
 *
 * @param currentLocale - The current page's locale (for canonical)
 * @param path - The path after locale prefix (e.g., '/services/seo' or '' for homepage)
 * @returns Alternates object for Next.js metadata API
 */
export function generateHreflangAlternates(currentLocale: LocaleCode, path: string = '') {
  // Map locale codes to language-region format for hreflang
  const localeToHreflang: Record<LocaleCode, string> = {
    us: 'en-US',
    au: 'en-AU',
    uk: 'en-GB',
    ie: 'en-IE',
    nl: 'nl-NL',
    dk: 'da-DK',
  };

  // Build languages object with all locales
  const languages: Record<string, string> = {
    'x-default': `${BASE_URL}/us${path}`, // US is global fallback
  };

  // Add all 6 locale alternates
  (Object.keys(locales) as LocaleCode[]).forEach((locale) => {
    const hreflangCode = localeToHreflang[locale];
    languages[hreflangCode] = `${BASE_URL}/${locale}${path}`;
  });

  return {
    canonical: `${BASE_URL}/${currentLocale}${path}`,
    languages,
  };
}

/**
 * Type for Open Graph locale format (uses underscore not hyphen)
 */
export function getOpenGraphLocale(locale: LocaleCode): string {
  const ogLocales: Record<LocaleCode, string> = {
    us: 'en_US',
    au: 'en_AU',
    uk: 'en_GB',
    ie: 'en_IE',
    nl: 'nl_NL',
    dk: 'da_DK',
  };
  return ogLocales[locale];
}

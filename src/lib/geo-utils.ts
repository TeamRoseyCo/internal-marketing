// src/lib/geo-utils.ts
// Geolocation utilities for middleware locale detection
// Maps country codes to supported locales and provides EU country detection

import { LocaleCode } from './locales';

/**
 * Maps ISO 3166-1 alpha-2 country codes to supported locale codes
 * Used by middleware to detect user location and redirect to appropriate locale
 *
 * NOTE: Uses GB (not UK) for United Kingdom per ISO 3166-1 standard
 */
export const countryToLocale: Record<string, LocaleCode> = {
  NL: 'nl', // Netherlands → Dutch locale
  DK: 'dk', // Denmark → Danish locale
  AU: 'au', // Australia → Australian English locale
  GB: 'uk', // United Kingdom → UK English locale (GB = ISO code for UK)
  IE: 'ie', // Ireland → Irish English locale
  US: 'us', // United States → US English locale (default)
};

/**
 * EU member states (ISO 3166-1 alpha-2 codes)
 * Used for GDPR compliance detection in CookieConsent component
 *
 * All 27 EU member states as of 2024
 */
export const EU_COUNTRIES = [
  'AT', 'BE', 'BG', 'HR', 'CY', 'CZ', 'DK', 'EE', 'FI', 'FR',
  'DE', 'GR', 'HU', 'IE', 'IT', 'LV', 'LT', 'LU', 'MT', 'NL',
  'PL', 'PT', 'RO', 'SK', 'SI', 'ES', 'SE',
] as const;

/**
 * EU locales we support
 * Used by CookieConsent component to detect EU users based on locale
 * when geolocation headers are not available (e.g., during client-side rendering)
 *
 * This allows CookieConsent to show GDPR-compliant banners even without access
 * to server-side geolocation headers
 */
export const EU_LOCALES: readonly LocaleCode[] = ['nl', 'dk', 'ie'] as const;

/**
 * Checks if a country code is in the EU
 *
 * @param countryCode - ISO 3166-1 alpha-2 country code (e.g., "NL", "US")
 * @returns true if country is an EU member state
 *
 * @example
 * isEUCountry('NL') // true
 * isEUCountry('US') // false
 */
export function isEUCountry(countryCode: string): boolean {
  return EU_COUNTRIES.includes(countryCode.toUpperCase() as any);
}

/**
 * Checks if a locale is EU-based
 * Used by CookieConsent component for locale-based EU detection
 *
 * @param locale - Locale code (e.g., "nl", "us")
 * @returns true if locale is from an EU country
 *
 * @example
 * isEULocale('nl') // true
 * isEULocale('us') // false
 */
export function isEULocale(locale: string): boolean {
  return EU_LOCALES.includes(locale as LocaleCode);
}

/**
 * Gets the appropriate locale code for a given country code
 * Returns null if country is not explicitly supported
 *
 * @param countryCode - ISO 3166-1 alpha-2 country code (e.g., "NL", "US")
 * @returns LocaleCode if country is supported, null otherwise
 *
 * @example
 * getLocaleFromCountry('NL') // 'nl'
 * getLocaleFromCountry('JP') // null (not supported, use default)
 */
export function getLocaleFromCountry(countryCode: string | undefined): LocaleCode | null {
  if (!countryCode) return null;
  return countryToLocale[countryCode.toUpperCase()] || null;
}

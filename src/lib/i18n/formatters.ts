// src/lib/i18n/formatters.ts
// Currency and number formatting utilities
// Provides locale-aware formatting using Intl.NumberFormat

import { LocaleCode, locales } from '@/lib/locales';

/**
 * Format currency amount for specific locale
 * Uses Intl.NumberFormat for proper locale formatting
 *
 * @param amount - Numeric amount to format
 * @param locale - Locale code for formatting
 * @returns Formatted currency string
 *
 * Expected outputs for formatCurrency(1299, locale):
 * - us: "$1,299.00"       (USD with comma separator)
 * - au: "$1,299.00"       (AUD with comma separator)
 * - uk: "£1,299.00"       (GBP with comma separator)
 * - ie: "€1,299.00"       (EUR with comma separator)
 * - nl: "€ 1.299,00"      (EUR with period separator, comma decimal)
 * - dk: "1.299,00 kr."    (DKK with period separator, comma decimal, suffix)
 *
 * @example
 * formatCurrency(1299, 'us'); // "$1,299.00"
 * formatCurrency(1299, 'uk'); // "£1,299.00"
 * formatCurrency(1299, 'nl'); // "€ 1.299,00"
 * formatCurrency(1299, 'dk'); // "1.299,00 kr."
 */
export function formatCurrency(amount: number, locale: LocaleCode): string {
  const config = locales[locale];

  // Create locale string for Intl (e.g., 'en-US', 'nl-NL', 'da-DK')
  const intlLocale = `${config.languageCode}-${config.countryCode}`;

  const formatter = new Intl.NumberFormat(intlLocale, {
    style: 'currency',
    currency: config.currency,
  });

  return formatter.format(amount);
}

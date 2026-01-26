'use client';

// src/lib/i18n/hooks.ts
// Translation hooks for accessing translations in Client Components
// Provides useLocale() and useTranslation() for locale-aware content

import { useLocaleContext } from './context';
import { LocaleCode } from '@/lib/locales';
import { getTranslations } from '@/lib/translations';

/**
 * useLocale hook
 * Returns current locale code from context
 *
 * @returns Current locale code
 * @throws Error if used outside LocaleProvider
 *
 * @example
 * const locale = useLocale();
 * console.log(locale); // 'us'
 */
export function useLocale(): LocaleCode {
  const { locale } = useLocaleContext();
  return locale;
}

/**
 * useTranslation hook
 * Provides t() function for accessing translations
 *
 * @returns Object with t() function and current locale
 * @throws Error if used outside LocaleProvider
 *
 * @example
 * const { t, locale } = useTranslation();
 * t('nav.services'); // 'Services'
 * t('hero.title'); // 'More Growth. More Clients.'
 */
export function useTranslation() {
  const locale = useLocale();
  const translations = getTranslations(locale);

  /**
   * Translation function
   * Resolves nested translation keys (e.g., 'nav.services')
   * Falls back to English if key not found
   * Returns key itself if not found in English either
   *
   * @param key - Dot-separated translation key
   * @returns Translated string
   */
  const t = (key: string): string => {
    const keys = key.split('.');
    let value: any = translations;

    // Traverse the translation object
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        // Key not found - warn in development
        if (process.env.NODE_ENV === 'development') {
          console.warn(`Translation key not found: "${key}" for locale "${locale}"`);
        }

        // Fallback to English
        const englishTranslations = getTranslations('us');
        let fallbackValue: any = englishTranslations;

        for (const k of keys) {
          if (fallbackValue && typeof fallbackValue === 'object' && k in fallbackValue) {
            fallbackValue = fallbackValue[k];
          } else {
            // Not found in English either - return key
            return key;
          }
        }

        return fallbackValue;
      }
    }

    // Return the final value (should be a string)
    return typeof value === 'string' ? value : key;
  };

  return { t, locale };
}

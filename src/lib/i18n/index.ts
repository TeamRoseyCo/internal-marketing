// src/lib/i18n/index.ts
// Barrel export for i18n module
// Provides centralized access to locale context, hooks, types, and formatters

export { LocaleProvider, useLocaleContext } from './context';
export type { LocaleContextValue } from './context';

export type { CommonTranslations, Translations, TranslationsRecord } from './types';

export { useLocale, useTranslation } from './hooks';

export { formatCurrency } from './formatters';

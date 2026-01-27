// src/lib/locales.ts
// Locale configuration for multi-location strategy
// Supports US, NL, DK, AU, UK, IE (all English except NL/DK)

export type LocaleCode = 'us' | 'nl' | 'dk' | 'au' | 'uk' | 'ie';

export interface LocaleConfig {
  code: LocaleCode;
  language: string;
  languageCode: string;
  country: string;
  countryCode: string;
  currency: string;
  phone: string;
  address: string;
  timezone: string;
}

export const locales: Record<LocaleCode, LocaleConfig> = {
  us: {
    code: 'us',
    language: 'English',
    languageCode: 'en',
    country: 'United States',
    countryCode: 'US',
    currency: 'USD',
    phone: '+1 (573) 268-5330',
    address: 'Missouri, United States',
    timezone: 'America/Chicago',
  },
  nl: {
    code: 'nl',
    language: 'Nederlands',
    languageCode: 'nl',
    country: 'Nederland',
    countryCode: 'NL',
    currency: 'EUR',
    phone: '+31 85 369 6471',
    address: 'Amsterdam, Nederland',
    timezone: 'Europe/Amsterdam',
  },
  dk: {
    code: 'dk',
    language: 'Dansk',
    languageCode: 'da',
    country: 'Danmark',
    countryCode: 'DK',
    currency: 'DKK',
    phone: '+45 6081 8826',
    address: 'København, Danmark',
    timezone: 'Europe/Copenhagen',
  },
  au: {
    code: 'au',
    language: 'English',
    languageCode: 'en',
    country: 'Australia',
    countryCode: 'AU',
    currency: 'AUD',
    phone: '+44 7722 432679', // Using Belfast number
    address: 'Sydney, Australia',
    timezone: 'Australia/Sydney',
  },
  uk: {
    code: 'uk',
    language: 'English',
    languageCode: 'en',
    country: 'United Kingdom',
    countryCode: 'GB',
    currency: 'GBP',
    phone: '+44 7722 432679', // Verified Belfast GBP
    address: '1 Hollycroft Avenue, Belfast, BT5 5JE, United Kingdom',
    timezone: 'Europe/London',
  },
  ie: {
    code: 'ie',
    language: 'English',
    languageCode: 'en',
    country: 'Ireland',
    countryCode: 'IE',
    currency: 'EUR',
    phone: '+44 7722 432679', // Verified Belfast GBP (covers UK + IE)
    address: '1 Hollycroft Avenue, Belfast, BT5 5JE, United Kingdom',
    timezone: 'Europe/Dublin',
  },
};

export const defaultLocale: LocaleCode = 'us';

export const localeList = Object.keys(locales) as LocaleCode[];

export function isValidLocale(locale: string): locale is LocaleCode {
  return localeList.includes(locale as LocaleCode);
}

export function getLocale(code: string): LocaleConfig {
  if (isValidLocale(code)) {
    return locales[code];
  }
  return locales[defaultLocale];
}

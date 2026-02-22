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
  // Structured address fields for PostalAddress schema
  streetAddress?: string;
  addressLocality: string;
  addressRegion?: string;
  postalCode?: string;
  geo?: {
    latitude: number;
    longitude: number;
  };
}

export const locales: Record<LocaleCode, LocaleConfig> = {
  us: {
    code: 'us',
    language: 'English',
    languageCode: 'en',
    country: 'United States',
    countryCode: 'US',
    currency: 'USD',
    phone: '+1 (307) 400-9814',
    address: 'Missouri, United States',
    timezone: 'America/Chicago',
    addressLocality: 'Missouri',
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
    addressLocality: 'Amsterdam',
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
    addressLocality: 'København',
  },
  au: {
    code: 'au',
    language: 'English',
    languageCode: 'en',
    country: 'Australia',
    countryCode: 'AU',
    currency: 'AUD',
    phone: '+44 7516 843959', // Using UK number
    address: 'Sydney, Australia',
    timezone: 'Australia/Sydney',
    addressLocality: 'Sydney',
  },
  uk: {
    code: 'uk',
    language: 'English',
    languageCode: 'en',
    country: 'United Kingdom',
    countryCode: 'GB',
    currency: 'GBP',
    phone: '+44 7516 843959', // Verified Belfast GBP
    address: '1 Hollycroft Avenue, Belfast, BT5 5JE, United Kingdom',
    timezone: 'Europe/London',
    streetAddress: '1 Hollycroft Avenue',
    addressLocality: 'Belfast',
    addressRegion: 'Northern Ireland',
    postalCode: 'BT5 5JE',
    geo: {
      latitude: 54.5833,
      longitude: -5.9333,
    },
  },
  ie: {
    code: 'ie',
    language: 'English',
    languageCode: 'en',
    country: 'Ireland',
    countryCode: 'IE',
    currency: 'EUR',
    phone: '+353 89 973 8595', // IE dedicated number
    address: '1 Hollycroft Avenue, Belfast, BT5 5JE, United Kingdom',
    timezone: 'Europe/Dublin',
    streetAddress: '1 Hollycroft Avenue',
    addressLocality: 'Belfast',
    addressRegion: 'Northern Ireland',
    postalCode: 'BT5 5JE',
    geo: {
      latitude: 54.5833,
      longitude: -5.9333,
    },
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

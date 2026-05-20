// src/lib/geo-utils.ts
// Geolocation utilities for middleware locale detection

import { LocaleCode } from "./locales";

export const countryToLocale: Record<string, LocaleCode> = {
  NL: "nl",
  DK: "dk",
  AU: "au",
  GB: "uk",
  IE: "ie",
  CZ: "cz",
  US: "us",
};

export const EU_COUNTRIES = [
  "AT", "BE", "BG", "HR", "CY", "CZ", "DK", "EE", "FI", "FR",
  "DE", "GR", "HU", "IE", "IT", "LV", "LT", "LU", "MT", "NL",
  "PL", "PT", "RO", "SK", "SI", "ES", "SE",
] as const;

export const EU_LOCALES: readonly LocaleCode[] = ["nl", "dk", "ie", "cz"] as const;

export function isEUCountry(countryCode: string): boolean {
  return EU_COUNTRIES.includes(countryCode.toUpperCase() as any);
}

export function isEULocale(locale: string): boolean {
  return EU_LOCALES.includes(locale as LocaleCode);
}

export function getLocaleFromCountry(countryCode: string | undefined): LocaleCode | null {
  if (!countryCode) return null;
  return countryToLocale[countryCode.toUpperCase()] || null;
}

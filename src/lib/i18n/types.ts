// src/lib/i18n/types.ts
// TypeScript interfaces for translation system
// Provides type safety for translation keys and locale-specific content

import { LocaleCode } from '@/lib/locales';

/**
 * Common translations interface - shared UI elements
 * Matches structure in translations.common
 */
export interface CommonTranslations {
  learnMore: string;
  getStarted: string;
  bookCall: string;
  viewResults: string;
}

/**
 * Full translations interface - all translation keys
 * Matches complete structure in translations.ts
 */
export interface Translations {
  meta: {
    title: string;
    description: string;
  };
  nav: {
    services: string;
    results: string;
    blog: string;
    contact: string;
  };
  hero: {
    badge: string;
    title: string;
    titleHighlight: string;
    subtitle: string;
    cta: string;
    ctaSecondary: string;
    socialProof: string;
  };
  stats: {
    roas: string;
    leads: string;
    revenue: string;
    clients: string;
  };
  services: {
    title: string;
    titleHighlight: string;
    subtitle: string;
    seo: {
      title: string;
      description: string;
    };
    socialMedia: {
      title: string;
      description: string;
    };
    paidAds: {
      title: string;
      description: string;
    };
    webDesign: {
      title: string;
      description: string;
    };
  };
  whyUs: {
    title: string;
    titleHighlight: string;
    subtitle: string;
    points: string[];
    cta: string;
    resultTitle: string;
    resultSubtitle: string;
  };
  faq: {
    title: string;
    titleHighlight: string;
    subtitle: string;
    questions: {
      question: string;
      answer: string;
    }[];
  };
  cta: {
    badge: string;
    title: string;
    titleHighlight: string;
    subtitle: string;
    button: string;
    buttonSecondary: string;
    disclaimer: string;
  };
  footer: {
    copyright: string;
    privacy: string;
    terms: string;
  };
  common: CommonTranslations;
}

/**
 * Type-safe translations record
 * Maps locale codes to translation objects
 */
export type TranslationsRecord = Record<LocaleCode, Translations>;

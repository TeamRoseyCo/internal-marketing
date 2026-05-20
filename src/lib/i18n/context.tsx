'use client';

// src/lib/i18n/context.tsx
// React Context for locale detection
// Provides locale to all child components without prop drilling

import { createContext, useContext, ReactNode } from 'react';
import { LocaleCode } from '@/lib/locales';

/**
 * Context value interface
 * Contains current locale code
 */
export interface LocaleContextValue {
  locale: LocaleCode;
}

/**
 * Locale context - provides current locale to component tree
 */
export const LocaleContext = createContext<LocaleContextValue | null>(null);

/**
 * LocaleProvider props
 */
interface LocaleProviderProps {
  locale: LocaleCode;
  children: ReactNode;
}

/**
 * LocaleProvider component
 * Wraps locale pages to provide locale context
 *
 * @example
 * <LocaleProvider locale="us">
 *   <HomePage />
 * </LocaleProvider>
 */
export function LocaleProvider({ locale, children }: LocaleProviderProps) {
  return (
    <LocaleContext.Provider value={{ locale }}>
      {children}
    </LocaleContext.Provider>
  );
}

/**
 * useLocaleContext hook
 * Access locale context from any child component
 * Falls back to US when used outside LocaleProvider
 *
 * @returns LocaleContextValue
 */
export function useLocaleContext(): LocaleContextValue {
  const context = useContext(LocaleContext);

  if (!context) {
    return { locale: 'us' };
  }

  return context;
}

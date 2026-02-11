// src/types/gtag.d.ts
// TypeScript type declarations for Google Analytics 4 gtag and dataLayer

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (
      command: 'event' | 'config' | 'js',
      targetOrDate: string | Date,
      params?: Record<string, unknown>
    ) => void;
  }
}

export {};

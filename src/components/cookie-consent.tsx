'use client';

// src/components/cookie-consent.tsx
// GDPR-compliant cookie consent banner for EU locale visitors
// Shows only for EU locales (nl, dk, ie) based on locale detection
// Stores consent preference in localStorage to avoid repeat displays
// RELEVANT FILES: src/lib/geo-utils.ts, src/lib/translations.ts, src/app/[locale]/layout.tsx

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { isEULocale } from '@/lib/geo-utils';
import { useLocale, useTranslation } from '@/lib/i18n';

const CONSENT_KEY = 'cookie-consent';

/**
 * CookieConsent component
 * Displays GDPR-compliant cookie notice for EU locale visitors
 *
 * EU detection: Based on locale (nl, dk, ie) not IP geolocation
 * Consent storage: localStorage with values 'accepted' or 'declined'
 * Display logic: Shows only if EU locale AND no consent stored
 *
 * Note: NEXT_LOCALE cookie is "strictly necessary" per GDPR Article 5(3)
 * and does not require consent. This banner is for transparency.
 */
export function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Get locale and translations
  // Try-catch pattern for compatibility with pages that may not have LocaleProvider
  let locale = 'us';
  let t: (key: string) => string = (key) => key;

  try {
    locale = useLocale();
    const translation = useTranslation();
    t = translation.t;
  } catch (error) {
    // LocaleProvider not available - use defaults (non-EU fallback)
    if (process.env.NODE_ENV === 'development') {
      console.warn('CookieConsent: LocaleProvider not available, using defaults');
    }
  }

  useEffect(() => {
    setMounted(true);

    // Check if visitor is on EU locale
    const isEU = isEULocale(locale);

    // Check if consent already given
    const consent = localStorage.getItem(CONSENT_KEY);

    // Show banner if EU locale AND no consent stored
    if (isEU && !consent) {
      setShowBanner(true);
    }
  }, [locale]);

  const handleAccept = () => {
    localStorage.setItem(CONSENT_KEY, 'accepted');
    setShowBanner(false);
  };

  const handleDecline = () => {
    localStorage.setItem(CONSENT_KEY, 'declined');
    setShowBanner(false);
  };

  // Don't render anything until mounted (prevents hydration mismatch)
  if (!mounted) {
    return null;
  }

  return (
    <AnimatePresence>
      {showBanner && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="fixed bottom-0 left-0 right-0 z-50 border-t border-border/50"
          style={{
            background: 'linear-gradient(to right, rgba(0, 0, 0, 0.95), rgba(18, 18, 18, 0.95))',
            backdropFilter: 'blur(12px)',
          }}
        >
          {/* Subtle gradient border top */}
          <div
            className="absolute top-0 left-0 right-0 h-px"
            style={{
              background: 'linear-gradient(90deg, hsl(320 80% 55% / 0.3), hsl(276 60% 50% / 0.3), hsl(180 70% 45% / 0.3))',
            }}
          />

          <div className="max-w-7xl mx-auto px-6 py-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              {/* Content */}
              <div className="flex-1 space-y-2">
                <h3 className="text-lg font-semibold text-foreground">
                  {t('cookieConsent.title')}
                </h3>
                <p className="text-sm text-muted-foreground max-w-2xl">
                  {t('cookieConsent.message')}{' '}
                  <Link
                    href={`/${locale}/privacy-policy`}
                    className="text-primary hover:underline"
                  >
                    {t('cookieConsent.learnMore')}
                  </Link>
                </p>
              </div>

              {/* Buttons */}
              <div className="flex items-center gap-3">
                <button
                  onClick={handleDecline}
                  className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  {t('cookieConsent.decline')}
                </button>
                <button
                  onClick={handleAccept}
                  className="px-6 py-2 text-sm font-medium text-white bg-primary hover:bg-primary/90 rounded-lg transition-colors"
                  style={{
                    background: 'linear-gradient(135deg, hsl(320 80% 55%), hsl(276 60% 50%))',
                  }}
                >
                  {t('cookieConsent.accept')}
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

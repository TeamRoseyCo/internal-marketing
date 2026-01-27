'use client';

// src/components/locale-switcher.tsx
// Locale switcher component with country flags
// Provides manual override for automatic geolocation detection
// RELATED FILES: src/lib/i18n/context.tsx, src/middleware.ts

import { useState, useRef, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { ChevronDown } from 'lucide-react';
import { US, NL, DK, AU, GB, IE } from 'country-flag-icons/react/3x2';
import { useLocale } from '@/lib/i18n';
import { isValidLocale, type LocaleCode } from '@/lib/locales';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

/**
 * Flag components mapped by locale code
 * Note: UK locale uses GB (Great Britain) flag
 */
const FLAGS = {
  us: US,
  nl: NL,
  dk: DK,
  au: AU,
  uk: GB,
  ie: IE,
} as const;

/**
 * Locale labels for display
 */
const LOCALE_LABELS: Record<LocaleCode, string> = {
  us: 'United States',
  nl: 'Nederland',
  dk: 'Danmark',
  au: 'Australia',
  uk: 'United Kingdom',
  ie: 'Ireland',
};

/**
 * All available locales for switcher
 */
const ALL_LOCALES: LocaleCode[] = ['us', 'nl', 'dk', 'au', 'uk', 'ie'];

interface LocaleSwitcherProps {
  /**
   * Display variant:
   * - dropdown: Full dropdown with current locale (for header)
   * - compact: Horizontal flag icons (for footer/mobile)
   */
  variant?: 'dropdown' | 'compact';
  className?: string;
}

/**
 * LocaleSwitcher Component
 *
 * Allows users to manually switch locale and see current locale.
 * Sets NEXT_LOCALE cookie and navigates to equivalent page in selected locale.
 *
 * Features:
 * - Dropdown variant: Shows current locale with flag + dropdown selector
 * - Compact variant: Horizontal list of all locale flags
 * - Cookie persistence: Sets NEXT_LOCALE cookie on selection
 * - Preserves path: /us/services → /nl/services
 *
 * @example
 * // Header desktop
 * <LocaleSwitcher variant="dropdown" />
 *
 * // Footer
 * <LocaleSwitcher variant="compact" />
 */
export function LocaleSwitcher({ variant = 'dropdown', className }: LocaleSwitcherProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Get current locale from context or pathname
  let currentLocale: LocaleCode;
  try {
    currentLocale = useLocale() as LocaleCode;
  } catch {
    // Fall back to pathname parsing if LocaleProvider not available
    const pathSegments = pathname.split('/');
    const potentialLocale = pathSegments[1];
    currentLocale = isValidLocale(potentialLocale) ? potentialLocale : 'us';
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    if (!isOpen) return;

    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  /**
   * Handle locale switch
   * Sets cookie and navigates to new locale
   */
  function handleLocaleSwitch(newLocale: LocaleCode) {
    if (newLocale === currentLocale) {
      setIsOpen(false);
      return;
    }

    // Set NEXT_LOCALE cookie (1 year expiry, samesite=lax)
    document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=31536000; samesite=lax`;

    // Replace current locale in pathname
    const pathSegments = pathname.split('/');
    if (isValidLocale(pathSegments[1])) {
      pathSegments[1] = newLocale;
    } else {
      // Root-level path, prepend locale
      pathSegments.splice(1, 0, newLocale);
    }

    const newPath = pathSegments.join('/') || `/${newLocale}`;

    // Navigate to new locale (use push so user can go back)
    router.push(newPath);
    setIsOpen(false);
  }

  // Compact variant: Horizontal flag icons
  if (variant === 'compact') {
    return (
      <div className={cn('flex items-center gap-2', className)}>
        {ALL_LOCALES.map((locale) => {
          const Flag = FLAGS[locale];
          const isCurrent = locale === currentLocale;

          return (
            <button
              key={locale}
              onClick={() => handleLocaleSwitch(locale)}
              className={cn(
                'relative rounded overflow-hidden transition-all duration-200',
                'hover:ring-2 hover:ring-primary/50 hover:scale-110',
                isCurrent && 'ring-2 ring-primary scale-105'
              )}
              aria-label={`Switch to ${LOCALE_LABELS[locale]}`}
              title={LOCALE_LABELS[locale]}
            >
              <Flag className="w-6 h-[18px]" />
            </button>
          );
        })}
      </div>
    );
  }

  // Dropdown variant: Current locale + dropdown
  const CurrentFlag = FLAGS[currentLocale];

  return (
    <div className={cn('relative', className)} ref={dropdownRef}>
      <Button
        variant="outline"
        size="default"
        onClick={() => setIsOpen(!isOpen)}
        className="gap-2 px-3"
        aria-label="Select locale"
        aria-expanded={isOpen}
      >
        <CurrentFlag className="w-5 h-[15px]" />
        <span className="hidden sm:inline text-sm">
          {LOCALE_LABELS[currentLocale]}
        </span>
        <ChevronDown
          className={cn(
            'w-4 h-4 transition-transform duration-200',
            isOpen && 'rotate-180'
          )}
        />
      </Button>

      {/* Dropdown menu */}
      {isOpen && (
        <div className="absolute top-full right-0 mt-2 py-2 min-w-[200px] bg-card border border-border rounded-md shadow-lg z-50">
          {ALL_LOCALES.map((locale) => {
            const Flag = FLAGS[locale];
            const isCurrent = locale === currentLocale;

            return (
              <button
                key={locale}
                onClick={() => handleLocaleSwitch(locale)}
                className={cn(
                  'w-full px-4 py-2 flex items-center gap-3 text-left text-sm',
                  'hover:bg-accent transition-colors',
                  isCurrent && 'bg-accent/50 font-medium'
                )}
                aria-label={`Switch to ${LOCALE_LABELS[locale]}`}
              >
                <Flag className="w-5 h-[15px]" />
                <span>{LOCALE_LABELS[locale]}</span>
                {isCurrent && (
                  <span className="ml-auto text-xs text-muted-foreground">Current</span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

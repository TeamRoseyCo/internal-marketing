'use client';

// src/components/locale-switcher.tsx
// Locale switcher component with country flags
// Provides manual override for automatic geolocation detection
// RELATED FILES: src/lib/i18n/context.tsx, src/middleware.ts

import { useState, useRef, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { ChevronDown } from 'lucide-react';
import { US, NL, DK, AU, GB, IE, CZ } from 'country-flag-icons/react/3x2';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocale } from '@/lib/i18n';
import { isValidLocale, type LocaleCode } from '@/lib/locales';
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
  cz: CZ,
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
  cz: 'Czech Republic',
};

/**
 * All available locales for switcher
 */
const ALL_LOCALES: LocaleCode[] = ['us', 'nl', 'dk', 'au', 'uk', 'ie', 'cz'];

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

  const contextLocale = useLocale() as LocaleCode;
  const pathSegments = pathname.split('/');
  const potentialLocale = pathSegments[1];
  const currentLocale = isValidLocale(potentialLocale) ? potentialLocale : contextLocale;

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

  // Compact variant: Horizontal flag icons with refined styling
  if (variant === 'compact') {
    return (
      <div className={cn('flex items-center gap-3', className)}>
        {ALL_LOCALES.map((locale, index) => {
          const Flag = FLAGS[locale];
          const isCurrent = locale === currentLocale;

          return (
            <motion.button
              key={locale}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05, duration: 0.3 }}
              onClick={() => handleLocaleSwitch(locale)}
              className={cn(
                'relative rounded-md overflow-hidden transition-all duration-300 group',
                'hover:scale-110',
                isCurrent && 'scale-105'
              )}
              aria-label={`Switch to ${LOCALE_LABELS[locale]}`}
              title={LOCALE_LABELS[locale]}
            >
              {/* Ring effect */}
              <div className={cn(
                'absolute inset-0 rounded-md transition-all duration-300',
                isCurrent
                  ? 'ring-2 ring-primary shadow-[0_0_10px_rgba(320,80%,55%,0.3)]'
                  : 'ring-0 group-hover:ring-2 group-hover:ring-white/30'
              )} />

              <Flag className="w-7 h-[21px] relative z-10 shadow-md" />
            </motion.button>
          );
        })}
      </div>
    );
  }

  // Dropdown variant: Current locale + dropdown
  const CurrentFlag = FLAGS[currentLocale];

  return (
    <div className={cn('relative', className)} ref={dropdownRef}>
      {/* Trigger Button - Flag only, cleaner look */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'flex items-center gap-2 px-3 py-2.5 rounded-lg',
          'bg-background/40 backdrop-blur-sm',
          'border border-white/10',
          'hover:bg-background/60 hover:border-white/20',
          'transition-all duration-300',
          'group',
          isOpen && 'bg-background/60 border-white/20'
        )}
        aria-label="Select locale"
        aria-expanded={isOpen}
      >
        <CurrentFlag className="w-5 h-[15px] rounded-sm overflow-hidden shadow-sm" />
        <ChevronDown
          className={cn(
            'w-4 h-4 text-foreground/60 transition-all duration-300',
            'group-hover:text-foreground/80',
            isOpen && 'rotate-180 text-foreground/80'
          )}
        />
      </button>

      {/* Dropdown menu - Framer Motion animated */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className={cn(
              'absolute top-full right-0 mt-2 py-2 min-w-[220px]',
              'bg-background/95 backdrop-blur-xl',
              'border border-white/10',
              'rounded-xl shadow-2xl',
              'z-50'
            )}
          >
            {ALL_LOCALES.map((locale, index) => {
              const Flag = FLAGS[locale];
              const isCurrent = locale === currentLocale;

              return (
                <motion.button
                  key={locale}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.03, duration: 0.2 }}
                  onClick={() => handleLocaleSwitch(locale)}
                  className={cn(
                    'w-full px-4 py-3 flex items-center gap-3 text-left',
                    'hover:bg-white/5 transition-all duration-200',
                    'relative group',
                    isCurrent && 'bg-white/5'
                  )}
                  aria-label={`Switch to ${LOCALE_LABELS[locale]}`}
                >
                  {/* Hover gradient effect */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-primary/5 via-transparent to-transparent" />

                  <Flag className="w-6 h-[18px] rounded overflow-hidden shadow-sm relative z-10" />
                  <span className={cn(
                    'text-sm font-medium relative z-10',
                    isCurrent ? 'text-foreground' : 'text-foreground/80 group-hover:text-foreground'
                  )}>
                    {LOCALE_LABELS[locale]}
                  </span>
                  {isCurrent && (
                    <motion.span
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="ml-auto text-xs text-primary font-medium relative z-10"
                    >
                      Active
                    </motion.span>
                  )}
                </motion.button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

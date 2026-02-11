'use client';

// src/app/not-found.tsx
// 404 Error Page - Dark luxury theme with Rosey Co branding
// Displays when users navigate to non-existent pages
// LOCALE-AWARE: Detects user's locale from URL and preserves it in navigation links

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Mail } from 'lucide-react';
import { isValidLocale } from '@/lib/locales';
import { getTranslations } from '@/lib/translations';

export default function NotFound() {
  // Detect locale from current pathname
  const pathname = usePathname();
  const pathSegments = pathname.split('/');
  const potentialLocale = pathSegments[1];
  const locale = isValidLocale(potentialLocale) ? potentialLocale : 'us';

  // Get translations for detected locale
  const t = getTranslations(locale);

  // Build locale-aware links
  const homeLink = `/${locale}`;
  const contactLink = `/${locale}/contact`;
  return (
    <div className="relative min-h-[70vh] flex items-center justify-center px-4 py-20">
      {/* Ambient background glow effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full blur-[100px]"
          style={{ background: 'hsl(0 75% 50% / 0.05)' }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full blur-[120px]"
          style={{ background: 'hsl(130 65% 45% / 0.05)' }}
        />
      </div>

      <div className="max-w-2xl w-full relative z-10">
        {/* Glassmorphic Card */}
        <div className="bg-card/50 backdrop-blur-xl border border-border/50 rounded-3xl p-12 md:p-16 text-center relative overflow-hidden">
          {/* Subtle top gradient line */}
          <div
            className="absolute top-0 left-0 right-0 h-px"
            style={{ background: 'linear-gradient(90deg, transparent, hsl(0 75% 50% / 0.3), transparent)' }}
          />

          {/* Large 404 Number with gradient */}
          <div className="mb-8">
            <h1 className="text-8xl md:text-9xl lg:text-[12rem] font-bold gradient-text leading-none tracking-tight">
              404
            </h1>
          </div>

          {/* Heading - uses Fraunces serif font */}
          <h2 className="text-3xl md:text-4xl font-semibold text-foreground mb-4">
            {t.notFound.title}
          </h2>

          {/* Message */}
          <p className="text-muted-foreground text-lg md:text-xl leading-relaxed mb-10 max-w-md mx-auto">
            {t.notFound.message}
          </p>

          {/* Action Buttons - Locale-aware links */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {/* Go Home Button - Primary CTA with gradient */}
            <Link
              href={homeLink}
              className="btn-hero px-8 py-4 rounded-full flex items-center justify-center gap-3 text-base font-semibold transition-all duration-300 hover:scale-105"
            >
              <Home size={20} />
              {t.notFound.goHome}
            </Link>

            {/* Contact Us Button - Secondary outline */}
            <Link
              href={contactLink}
              className="group px-8 py-4 rounded-full flex items-center justify-center gap-3 text-base font-semibold border-2 border-primary/30 text-foreground hover:border-primary/60 hover:bg-primary/5 transition-all duration-300 hover:scale-105"
            >
              <Mail size={20} />
              {t.notFound.contactUs}
            </Link>
          </div>

          {/* Bottom ambient glow */}
          <div
            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-px"
            style={{ background: 'linear-gradient(90deg, transparent, hsl(130 65% 45% / 0.2), transparent)' }}
          />
        </div>
      </div>
    </div>
  );
}

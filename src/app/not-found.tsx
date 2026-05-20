'use client';

// src/app/not-found.tsx
// Root-level 404 page, on the Apple-style light design system.
// LOCALE-AWARE: detects the locale from the URL and preserves it in nav links.
// RELATED FILES: src/app/[locale]/not-found.tsx

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { isValidLocale } from '@/lib/locales';
import { getTranslations } from '@/lib/translations';

export default function NotFound() {
  // Detect locale from the current pathname so links stay in-locale.
  const pathname = usePathname();
  const potentialLocale = pathname.split('/')[1];
  const locale = isValidLocale(potentialLocale) ? potentialLocale : 'us';
  const t = getTranslations(locale);

  return (
    <section
      style={{ background: '#fbfbfd' }}
      className="min-h-[70vh] flex items-center justify-center px-6 py-24"
    >
      <div className="max-w-xl w-full text-center">
        <p
          className="font-semibold tracking-tight text-[#1d1d1f]"
          style={{
            fontSize: 'clamp(96px, 18vw, 180px)',
            lineHeight: 1,
            letterSpacing: '-0.04em',
          }}
        >
          404
        </p>
        <h1
          className="mt-4 font-semibold tracking-tight text-[#1d1d1f]"
          style={{ fontSize: 'clamp(26px, 3.4vw, 36px)', letterSpacing: '-0.02em' }}
        >
          {t.notFound.title}
        </h1>
        <p className="mt-4 text-[17px] leading-relaxed text-[#6e6e73] max-w-md mx-auto">
          {t.notFound.message}
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href={`/${locale}`}
            className="ac-pill"
            style={{ padding: '12px 24px', fontSize: '15px' }}
          >
            {t.notFound.goHome}
          </Link>
          <Link
            href={`/${locale}/contact`}
            className="inline-flex items-center justify-center rounded-full border border-[#d2d2d7] text-[#1d1d1f] transition-colors hover:bg-[#f5f5f7]"
            style={{ padding: '12px 24px', fontSize: '15px' }}
          >
            {t.notFound.contactUs}
          </Link>
        </div>
      </div>
    </section>
  );
}

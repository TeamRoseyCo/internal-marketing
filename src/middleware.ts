// src/middleware.ts
// Next.js middleware for geolocation-based locale detection and redirect
// Handles first-time visitors and cookie persistence for returning users

import { NextRequest, NextResponse } from 'next/server';
import { getLocaleFromCountry } from './lib/geo-utils';
import { localeList, defaultLocale } from './lib/locales';

/**
 * Middleware for geolocation-based locale detection
 *
 * Detection priority:
 * 1. Skip if path already has locale prefix (e.g., /us/, /nl/)
 * 2. Check NEXT_LOCALE cookie (returning visitor)
 * 3. Detect via Vercel geolocation header (x-vercel-ip-country)
 * 4. Fallback to default locale ('us')
 *
 * GDPR Note:
 * The NEXT_LOCALE cookie is classified as "strictly necessary" under GDPR Article 5(3)
 * and ePrivacy Directive. It stores only a 2-letter locale code and is essential for
 * site functionality (multi-locale navigation). Consent is not legally required.
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Skip if path already has locale prefix
  // Check if path starts with any locale (e.g., /us/, /nl/, /dk/)
  const hasLocalePrefix = localeList.some((locale) =>
    pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (hasLocalePrefix) {
    // Path already has locale, pass through without redirect
    return NextResponse.next();
  }

  // 2. Check NEXT_LOCALE cookie (returning visitor preference)
  const cookieLocale = request.cookies.get('NEXT_LOCALE')?.value;

  if (cookieLocale && localeList.includes(cookieLocale as any)) {
    // Valid cookie exists, redirect to saved locale
    const url = request.nextUrl.clone();
    url.pathname = `/${cookieLocale}${pathname === '/' ? '' : pathname}`;
    return NextResponse.redirect(url, 302);
  }

  // 3. Detect via Vercel geolocation (x-vercel-ip-country header)
  // In local dev, this header won't exist, so we'll fall back to default
  const countryCode = request.headers.get('x-vercel-ip-country');
  const detectedLocale = getLocaleFromCountry(countryCode || undefined);

  // Use detected locale or fallback to default
  const targetLocale = detectedLocale || defaultLocale;

  // Build redirect URL with locale prefix
  const url = request.nextUrl.clone();
  url.pathname = `/${targetLocale}${pathname === '/' ? '' : pathname}`;

  // Create redirect response with 302 (temporary redirect for SEO)
  const response = NextResponse.redirect(url, 302);

  // Set NEXT_LOCALE cookie for future visits (1 year expiry)
  // This is a strictly necessary cookie for site functionality
  response.cookies.set('NEXT_LOCALE', targetLocale, {
    maxAge: 31536000, // 1 year in seconds
    path: '/',
    sameSite: 'lax',
  });

  return response;
}

/**
 * Middleware matcher config
 * Excludes:
 * - API routes (/api/*)
 * - Next.js internals (/_next/*)
 * - Vercel internals (/_vercel/*)
 * - Static files (*.png, *.jpg, *.ico, etc.)
 *
 * Matches: All other routes (e.g., /, /blog, /contact)
 */
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - api (API routes)
     * - _next (Next.js internals)
     * - _vercel (Vercel internals)
     * - Static files (containing a dot in the path)
     */
    '/((?!api|_next|_vercel|.*\\..*).*)',
  ],
};

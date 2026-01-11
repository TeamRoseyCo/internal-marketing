// src/middleware.ts
// Vercel Edge Middleware for geo-based locale redirect
// Redirects users to their country-specific locale on first visit

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Supported locales and their country codes
const LOCALE_MAP: Record<string, string> = {
  US: 'us',
  NL: 'nl',
  DK: 'dk',
  AU: 'au',
  GB: 'uk', // UK uses GB country code
  IE: 'ie',
};

// Default locale for unsupported countries
const DEFAULT_LOCALE = 'us';

// Cookie name to track if user has been redirected
const LOCALE_COOKIE = 'LOCALE_REDIRECTED';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip middleware for:
  // - Static files and assets
  // - API routes
  // - Already on a locale route
  // - Next.js internal routes
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/us') ||
    pathname.startsWith('/nl') ||
    pathname.startsWith('/dk') ||
    pathname.startsWith('/au') ||
    pathname.startsWith('/uk') ||
    pathname.startsWith('/ie') ||
    pathname.includes('.') || // files with extensions
    pathname === '/favicon.ico'
  ) {
    return NextResponse.next();
  }

  // Check if user has already been redirected (has cookie)
  const hasBeenRedirected = request.cookies.get(LOCALE_COOKIE);

  if (hasBeenRedirected) {
    return NextResponse.next();
  }

  // Get country from Vercel's geo headers (x-vercel-ip-country)
  // This header is automatically set by Vercel Edge Network
  const country = request.headers.get('x-vercel-ip-country') || '';

  // Determine the appropriate locale
  const locale = LOCALE_MAP[country] || DEFAULT_LOCALE;

  // Build the redirect URL
  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname}`;

  // Create response with redirect
  const response = NextResponse.redirect(url);

  // Set cookie to prevent redirect loop (expires in 30 days)
  response.cookies.set(LOCALE_COOKIE, locale, {
    maxAge: 60 * 60 * 24 * 30, // 30 days
    path: '/',
  });

  return response;
}

// Configure which paths the middleware runs on
export const config = {
  matcher: [
    // Match all paths except static files
    '/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)',
  ],
};

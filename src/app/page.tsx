// src/app/page.tsx
// Root page redirect to default locale
// Middleware handles geolocation detection first, this is a fallback

import { redirect } from 'next/navigation';

export default function RootPage() {
  // Middleware handles locale detection and redirect based on geolocation
  // This fallback ensures root URL always redirects to default locale
  // if middleware doesn't catch it (e.g., static export scenarios)
  redirect('/us');
}

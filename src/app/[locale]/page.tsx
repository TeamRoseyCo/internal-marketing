// src/app/[locale]/page.tsx
// Locale-specific homepage
// Server component with metadata generation, client component for interactivity

import { Metadata } from "next";
import { generateHreflangAlternates, getOpenGraphLocale } from "@/lib/seo";
import { isValidLocale, getLocale, LocaleCode } from "@/lib/locales";
import { getTranslations } from "@/lib/translations";
import LocaleHomePageClient from "./page-client";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    return {};
  }

  const localeConfig = getLocale(locale);
  const t = getTranslations(locale);

  return {
    title: t.meta.title,
    description: t.meta.description,
    openGraph: {
      title: t.meta.title,
      description: t.meta.description,
      locale: getOpenGraphLocale(locale),
      type: 'website',
    },
    alternates: generateHreflangAlternates(locale, ''),
  };
}

export default async function Page({ params }: PageProps) {
  const { locale } = await params;
  return <LocaleHomePageClient locale={locale} />;
}

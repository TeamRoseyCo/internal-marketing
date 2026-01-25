// src/app/[locale]/services/page.tsx
// Locale-specific services overview page

import { Metadata } from "next";
import { generateHreflangAlternates, getOpenGraphLocale } from "@/lib/seo";
import { isValidLocale, getLocale } from "@/lib/locales";
import ServicesPageClient from "./page-client";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    return {};
  }

  const localeConfig = getLocale(locale);

  return {
    title: `Services | Rosey Co. ${localeConfig.country}`,
    description: `Professional digital marketing services in ${localeConfig.country}. SEO, social media management, paid advertising, and website design.`,
    openGraph: {
      title: `Services | Rosey Co. ${localeConfig.country}`,
      description: `Professional digital marketing services in ${localeConfig.country}. SEO, social media management, paid advertising, and website design.`,
      locale: getOpenGraphLocale(locale),
      type: 'website',
    },
    alternates: generateHreflangAlternates(locale, '/services'),
  };
}

export default async function Page({ params }: PageProps) {
  const { locale } = await params;
  return <ServicesPageClient locale={locale} />;
}

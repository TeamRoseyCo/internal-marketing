// src/app/[locale]/services/seo/page.tsx
// SEO service page with metadata

import { Metadata } from "next";
import { generateHreflangAlternates, getOpenGraphLocale } from "@/lib/seo";
import { isValidLocale, getLocale } from "@/lib/locales";
import SEOPageClient from "./page-client";

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
    title: `SEO Services | Rosey Co. ${localeConfig.country}`,
    description: `Professional SEO services in ${localeConfig.country}. Increase organic traffic and rank higher on Google with proven strategies.`,
    openGraph: {
      title: `SEO Services | Rosey Co. ${localeConfig.country}`,
      description: `Professional SEO services in ${localeConfig.country}. Increase organic traffic and rank higher on Google with proven strategies.`,
      locale: getOpenGraphLocale(locale),
      type: 'website',
    },
    alternates: generateHreflangAlternates(locale, '/services/seo'),
  };
}

export default async function Page({ params }: PageProps) {
  const { locale } = await params;
  return <SEOPageClient params={{ locale }} />;
}

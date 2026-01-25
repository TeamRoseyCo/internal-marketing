// src/app/[locale]/services/website-design/page.tsx
// Website design service page with metadata

import { Metadata } from "next";
import { generateHreflangAlternates, getOpenGraphLocale } from "@/lib/seo";
import { isValidLocale, getLocale } from "@/lib/locales";
import WebsiteDesignPageClient from "./page-client";

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
    title: `Website Design | Rosey Co. ${localeConfig.country}`,
    description: `High-converting website design in ${localeConfig.country}. Beautiful, fast websites designed to turn visitors into leads and customers.`,
    openGraph: {
      title: `Website Design | Rosey Co. ${localeConfig.country}`,
      description: `High-converting website design in ${localeConfig.country}. Beautiful, fast websites designed to turn visitors into leads and customers.`,
      locale: getOpenGraphLocale(locale),
      type: 'website',
    },
    alternates: generateHreflangAlternates(locale, '/services/website-design'),
  };
}

export default async function Page({ params }: PageProps) {
  const { locale } = await params;
  return <WebsiteDesignPageClient params={{ locale }} />;
}

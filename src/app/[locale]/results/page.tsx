// src/app/[locale]/results/page.tsx
// Results page with metadata

import { Metadata } from "next";
import { generateHreflangAlternates, getOpenGraphLocale } from "@/lib/seo";
import { isValidLocale, getLocale } from "@/lib/locales";
import ResultsPageClient from "./page-client";

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
    title: `Our Results | Rosey Co. ${localeConfig.country}`,
    description: `See real results from our clients in ${localeConfig.country}. Case studies, testimonials, and proven ROI from our marketing campaigns.`,
    openGraph: {
      title: `Our Results | Rosey Co. ${localeConfig.country}`,
      description: `See real results from our clients in ${localeConfig.country}. Case studies, testimonials, and proven ROI from our marketing campaigns.`,
      locale: getOpenGraphLocale(locale),
      type: 'website',
    },
    alternates: generateHreflangAlternates(locale, '/results'),
  };
}

export default async function Page({ params }: PageProps) {
  const { locale } = await params;
  return <ResultsPageClient params={{ locale }} />;
}

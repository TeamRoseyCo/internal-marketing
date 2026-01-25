// src/app/[locale]/services/paid-ads/page.tsx
// Paid ads service page with metadata

import { Metadata } from "next";
import { generateHreflangAlternates, getOpenGraphLocale } from "@/lib/seo";
import { isValidLocale, getLocale } from "@/lib/locales";
import PaidAdsPageClient from "./page-client";

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
    title: `Paid Advertising | Rosey Co. ${localeConfig.country}`,
    description: `ROI-focused paid advertising in ${localeConfig.country}. Google Ads and Meta Ads campaigns that convert clicks into customers.`,
    openGraph: {
      title: `Paid Advertising | Rosey Co. ${localeConfig.country}`,
      description: `ROI-focused paid advertising in ${localeConfig.country}. Google Ads and Meta Ads campaigns that convert clicks into customers.`,
      locale: getOpenGraphLocale(locale),
      type: 'website',
    },
    alternates: generateHreflangAlternates(locale, '/services/paid-ads'),
  };
}

export default async function Page({ params }: PageProps) {
  const { locale } = await params;
  return <PaidAdsPageClient params={{ locale }} />;
}

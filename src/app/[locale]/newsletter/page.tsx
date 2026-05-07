// src/app/[locale]/newsletter/page.tsx
// Newsletter signup landing page. Copy adapted from the legacy wixsite scrape
// (migration-content/pages/Newsletter.tsx).

import { Metadata } from "next";
import { generateHreflangAlternates, getOpenGraphLocale } from "@/lib/seo";
import { isValidLocale, getLocale } from "@/lib/locales";
import NewsletterPageClient from "./page-client";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    return {};
  }

  const localeConfig = getLocale(locale);
  const title = `Free Marketing Newsletter | Weekly SEO & Ads Tips | Rosey Co. ${localeConfig.country}`;
  const description = `Get free weekly marketing tips on Facebook Ads, Google Ads, SEO, and ROI tracking. Join 1,000+ business owners learning to grow profitably.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      locale: getOpenGraphLocale(locale),
      type: "website",
    },
    alternates: generateHreflangAlternates(locale, "/newsletter"),
  };
}

export default async function Page({ params }: PageProps) {
  const { locale } = await params;
  return <NewsletterPageClient params={{ locale }} />;
}

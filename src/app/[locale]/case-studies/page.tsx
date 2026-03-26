// src/app/[locale]/case-studies/page.tsx
import { Metadata } from "next";
import { generateHreflangAlternates, getOpenGraphLocale } from "@/lib/seo";
import { isValidLocale, getLocale } from "@/lib/locales";
import CaseStudiesPageClient from "./page-client";

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
    title: `Case Studies | Rosey Co. ${localeConfig.country}`,
    description: `Explore our portfolio of client success stories. Real results from real businesses across web design, SEO, Google Ads, and automation.`,
    openGraph: {
      title: `Case Studies | Rosey Co. ${localeConfig.country}`,
      description: `Explore our portfolio of client success stories. Real results from real businesses.`,
      locale: getOpenGraphLocale(locale),
      type: 'website',
    },
    alternates: generateHreflangAlternates(locale, '/case-studies'),
  };
}

export default async function Page({ params }: PageProps) {
  const { locale } = await params;
  return <CaseStudiesPageClient params={{ locale }} />;
}

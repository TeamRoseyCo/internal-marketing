// src/app/[locale]/contact/page.tsx
// Contact page with metadata

import { Metadata } from "next";
import { generateHreflangAlternates, getOpenGraphLocale } from "@/lib/seo";
import { isValidLocale, getLocale } from "@/lib/locales";
import ContactPageClient from "./page-client";

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
    title: `Book a Call | Rosey Co. ${localeConfig.country}`,
    description: `Book a free 30-minute strategy call with Rosey Co. in ${localeConfig.country}. We'll walk you through what's working in your market and where the easy wins are.`,
    openGraph: {
      title: `Book a Call | Rosey Co. ${localeConfig.country}`,
      description: `Book a free 30-minute strategy call with Rosey Co. in ${localeConfig.country}. We'll walk you through what's working in your market and where the easy wins are.`,
      locale: getOpenGraphLocale(locale),
      type: 'website',
    },
    alternates: generateHreflangAlternates(locale, '/contact'),
  };
}

export default async function Page({ params }: PageProps) {
  const { locale } = await params;
  return <ContactPageClient params={{ locale }} />;
}

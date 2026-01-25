// src/app/[locale]/privacy-policy/page.tsx
// Privacy policy page with metadata

import { Metadata } from "next";
import { generateHreflangAlternates, getOpenGraphLocale } from "@/lib/seo";
import { isValidLocale, getLocale, locales } from "@/lib/locales";
import PrivacyPolicyPageClient from "./page-client";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateStaticParams() {
  return Object.keys(locales).map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    return {};
  }

  const localeConfig = getLocale(locale);

  return {
    title: `Privacy Policy | Rosey Co. ${localeConfig.country}`,
    description: `Privacy policy for Rosey Co. ${localeConfig.country}. Learn how we collect, use, and protect your personal information.`,
    openGraph: {
      title: `Privacy Policy | Rosey Co. ${localeConfig.country}`,
      description: `Privacy policy for Rosey Co. ${localeConfig.country}. Learn how we collect, use, and protect your personal information.`,
      locale: getOpenGraphLocale(locale),
      type: 'website',
    },
    alternates: generateHreflangAlternates(locale, '/privacy-policy'),
  };
}

export default async function Page({ params }: PageProps) {
  const { locale } = await params;
  return <PrivacyPolicyPageClient params={{ locale }} />;
}

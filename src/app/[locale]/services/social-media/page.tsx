// src/app/[locale]/services/social-media/page.tsx
// Social media service page with metadata

import { Metadata } from "next";
import { generateHreflangAlternates, getOpenGraphLocale } from "@/lib/seo";
import { isValidLocale, getLocale } from "@/lib/locales";
import SocialMediaPageClient from "./page-client";

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
    title: `Social Media Management | Rosey Co. ${localeConfig.country}`,
    description: `Expert social media management in ${localeConfig.country}. Build your brand presence and engage your audience across all major platforms.`,
    openGraph: {
      title: `Social Media Management | Rosey Co. ${localeConfig.country}`,
      description: `Expert social media management in ${localeConfig.country}. Build your brand presence and engage your audience across all major platforms.`,
      locale: getOpenGraphLocale(locale),
      type: 'website',
    },
    alternates: generateHreflangAlternates(locale, '/services/social-media'),
  };
}

export default async function Page({ params }: PageProps) {
  const { locale } = await params;
  return <SocialMediaPageClient params={{ locale }} />;
}

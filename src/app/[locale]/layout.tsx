// src/app/[locale]/layout.tsx
// Layout for locale-specific pages
// Passes locale context to all child pages

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isValidLocale, getLocale, localeList, LocaleCode } from "@/lib/locales";
import { getTranslations } from "@/lib/translations";
import { LocalBusinessStructuredData } from "@/components/seo/structured-data";
import { getOpenGraphLocale } from "@/lib/seo";
import { LocaleProvider } from "@/lib/i18n";
import { CookieConsent } from "@/components/cookie-consent";
import { DifyChatbot } from "@/components/chatbot";

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export async function generateStaticParams() {
  return localeList.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: LocaleLayoutProps): Promise<Metadata> {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    return {};
  }

  const localeConfig = getLocale(locale);
  const t = getTranslations(locale);

  return {
    title: {
      default: t.meta.title,
      template: `%s | Rosey Co. ${localeConfig.country}`,
    },
    description: t.meta.description,
    openGraph: {
      locale: getOpenGraphLocale(locale as LocaleCode),
    },
    // Note: alternates (hreflang) handled at page level for correct paths
  };
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  return (
    <LocaleProvider locale={locale}>
      <LocalBusinessStructuredData locale={locale} />
      {children}
      <CookieConsent />
      <DifyChatbot />
    </LocaleProvider>
  );
}

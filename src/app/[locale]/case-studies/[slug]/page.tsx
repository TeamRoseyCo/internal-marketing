// src/app/[locale]/case-studies/[slug]/page.tsx
import { Metadata } from "next";
import { generateHreflangAlternates, getOpenGraphLocale } from "@/lib/seo";
import { isValidLocale, getLocale } from "@/lib/locales";
import CaseStudyDetailClient from "./page-client";

interface PageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;

  if (!isValidLocale(locale)) {
    return {};
  }

  const localeConfig = getLocale(locale);
  const title = slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

  return {
    title: `${title} Case Study | Rosey Co. ${localeConfig.country}`,
    description: `See how Rosey Co. helped ${title} achieve real results with digital marketing, web design, and automation.`,
    openGraph: {
      title: `${title} Case Study | Rosey Co.`,
      description: `See how Rosey Co. helped ${title} achieve real results.`,
      locale: getOpenGraphLocale(locale),
      type: 'article',
    },
    alternates: generateHreflangAlternates(locale, `/case-studies/${slug}`),
  };
}

export default async function Page({ params }: PageProps) {
  const { locale, slug } = await params;
  return <CaseStudyDetailClient params={{ locale, slug }} />;
}

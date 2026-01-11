// src/app/[locale]/privacy-policy/page.tsx
// Locale-aware privacy policy page
// Languages: English (US), Dutch (NL), Danish (DK)

import { use } from 'react';
import { Metadata } from 'next';
import { FadeIn } from '@/components/animations';
import { locales, LocaleCode, isValidLocale, getLocale } from '@/lib/locales';
import { getPrivacyPageTranslations } from '@/lib/page-translations';
import { notFound } from 'next/navigation';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateStaticParams() {
  return Object.keys(locales).map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};

  const t = getPrivacyPageTranslations(locale);
  const localeConfig = getLocale(locale);

  return {
    title: `${t.meta.title} | Rosey Co.`,
    description: t.meta.description,
    alternates: {
      canonical: `https://roseyco.com/${locale}/privacy-policy`,
      languages: Object.fromEntries(
        Object.keys(locales).map((l) => [l, `https://roseyco.com/${l}/privacy-policy`])
      ),
    },
    openGraph: {
      title: `${t.meta.title} | Rosey Co.`,
      description: t.meta.description,
      locale: localeConfig?.languageCode,
    },
  };
}

export default function PrivacyPolicyPage({ params }: Props) {
  const { locale } = use(params);

  if (!isValidLocale(locale)) {
    notFound();
  }

  const t = getPrivacyPageTranslations(locale);
  const localeConfig = getLocale(locale);

  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-hero-surface overflow-hidden">
        <div className="container py-24 md:py-32">
          <div className="max-w-3xl mx-auto text-center">
            <FadeIn delay={0.1}>
              <h1 className="text-5xl md:text-6xl lg:text-7xl tracking-tight mb-8 leading-[1.05]">
                {t.hero.title} <span className="gradient-text">{t.hero.titleHighlight}</span>
              </h1>
            </FadeIn>

            <FadeIn delay={0.2}>
              <p className="text-lg text-muted-foreground">
                {t.hero.lastUpdated}
              </p>
            </FadeIn>
          </div>
        </div>

        {/* Gradient fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-background pointer-events-none" />
      </section>

      {/* Content */}
      <section className="py-24 md:py-32">
        <div className="container">
          <FadeIn>
            <div className="prose prose-invert max-w-3xl mx-auto">
              <div className="tech-card p-8 md:p-12 space-y-8">
                {/* Introduction */}
                <section>
                  <h2 className="font-serif text-2xl font-bold mb-4">
                    {t.sections.introduction.title}
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    {t.sections.introduction.content}
                  </p>
                </section>

                {/* Information We Collect */}
                <section>
                  <h2 className="font-serif text-2xl font-bold mb-4">
                    {t.sections.informationCollect.title}
                  </h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    {t.sections.informationCollect.intro}
                  </p>
                  <ul className="list-disc list-inside text-muted-foreground space-y-2">
                    {t.sections.informationCollect.items.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </section>

                {/* How We Use Your Information */}
                <section>
                  <h2 className="font-serif text-2xl font-bold mb-4">
                    {t.sections.howWeUse.title}
                  </h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    {t.sections.howWeUse.intro}
                  </p>
                  <ul className="list-disc list-inside text-muted-foreground space-y-2">
                    {t.sections.howWeUse.items.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </section>

                {/* Cookies and Tracking */}
                <section>
                  <h2 className="font-serif text-2xl font-bold mb-4">
                    {t.sections.cookies.title}
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    {t.sections.cookies.content}
                  </p>
                </section>

                {/* Third-Party Services */}
                <section>
                  <h2 className="font-serif text-2xl font-bold mb-4">
                    {t.sections.thirdParty.title}
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    {t.sections.thirdParty.content}
                  </p>
                </section>

                {/* Data Security */}
                <section>
                  <h2 className="font-serif text-2xl font-bold mb-4">
                    {t.sections.dataSecurity.title}
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    {t.sections.dataSecurity.content}
                  </p>
                </section>

                {/* Your Rights */}
                <section>
                  <h2 className="font-serif text-2xl font-bold mb-4">
                    {t.sections.yourRights.title}
                  </h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    {t.sections.yourRights.intro}
                  </p>
                  <ul className="list-disc list-inside text-muted-foreground space-y-2">
                    {t.sections.yourRights.items.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </section>

                {/* Changes to This Policy */}
                <section>
                  <h2 className="font-serif text-2xl font-bold mb-4">
                    {t.sections.changes.title}
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    {t.sections.changes.content}
                  </p>
                </section>

                {/* Contact Us */}
                <section>
                  <h2 className="font-serif text-2xl font-bold mb-4">
                    {t.sections.contact.title}
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    {t.sections.contact.content}{' '}
                    <a
                      href="mailto:team@roseyco.com"
                      className="text-primary hover:underline"
                    >
                      team@roseyco.com
                    </a>
                    .
                  </p>
                </section>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}

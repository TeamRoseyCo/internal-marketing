"use client";

// src/app/[locale]/privacy-policy/page-client.tsx
// Client component for the locale-aware privacy policy page.
// Rebuilt on the Apple-style light design system (the old dark-theme classes
// bg-hero-surface / tech-card / prose-invert / gradient-text were removed in the
// site rebuild, which left a broken black gradient overlay and washed-out text).
// RELEVANT FILES: src/lib/page-translations.ts, src/app/globals.css

import { FadeIn } from '@/components/animations';
import { isValidLocale } from '@/lib/locales';
import { getPrivacyPageTranslations } from '@/lib/page-translations';
import { notFound } from 'next/navigation';

type Props = {
  params: { locale: string };
};

export default function PrivacyPolicyPageClient({ params }: Props) {
  const { locale } = params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const t = getPrivacyPageTranslations(locale);

  // Always shows the current month/year — the policy is kept continuously up to date.
  const lastUpdated = new Date().toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  // Ordered sections built from the translation object. Some have plain content,
  // others have an intro paragraph followed by a bullet list.
  const sections: {
    title: string;
    content?: string;
    intro?: string;
    items?: readonly string[];
  }[] = [
    { title: t.sections.introduction.title, content: t.sections.introduction.content },
    {
      title: t.sections.informationCollect.title,
      intro: t.sections.informationCollect.intro,
      items: t.sections.informationCollect.items,
    },
    {
      title: t.sections.howWeUse.title,
      intro: t.sections.howWeUse.intro,
      items: t.sections.howWeUse.items,
    },
    { title: t.sections.cookies.title, content: t.sections.cookies.content },
    { title: t.sections.thirdParty.title, content: t.sections.thirdParty.content },
    { title: t.sections.dataSecurity.title, content: t.sections.dataSecurity.content },
    {
      title: t.sections.yourRights.title,
      intro: t.sections.yourRights.intro,
      items: t.sections.yourRights.items,
    },
    { title: t.sections.changes.title, content: t.sections.changes.content },
  ];

  const headingStyle = {
    fontSize: "clamp(22px, 2.6vw, 28px)",
    letterSpacing: "-0.01em",
  } as const;

  return (
    <>
      {/* Hero — light tile so the frosted nav blends instead of reading as a grey bar */}
      <section
        style={{ background: "#f5f5f7" }}
        className="px-6 pt-[140px] pb-20 md:pt-[180px] md:pb-28"
      >
        <div className="max-w-3xl mx-auto">
          <FadeIn delay={0.1}>
            <h1
              className="font-semibold tracking-tight text-[#1d1d1f]"
              style={{
                fontSize: "clamp(40px, 6vw, 64px)",
                lineHeight: 1.05,
                letterSpacing: "-0.02em",
              }}
            >
              {t.hero.title} {t.hero.titleHighlight}
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p
              suppressHydrationWarning
              className="mt-4 text-[16px] text-[#6e6e73]"
            >
              {t.hero.lastUpdated}: {lastUpdated}
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Content */}
      <section style={{ background: "#ffffff" }} className="px-6 py-20 md:py-28">
        <div className="max-w-3xl mx-auto">
          {sections.map((section, i) => (
            <FadeIn key={section.title}>
              <div className={i > 0 ? "mt-12 pt-12 border-t border-[#d2d2d7]" : ""}>
                <h2
                  className="font-semibold tracking-tight text-[#1d1d1f]"
                  style={headingStyle}
                >
                  {section.title}
                </h2>
                {section.content && (
                  <p className="mt-4 text-[17px] leading-relaxed text-[#3a3a3c]">
                    {section.content}
                  </p>
                )}
                {section.intro && (
                  <p className="mt-4 text-[17px] leading-relaxed text-[#3a3a3c]">
                    {section.intro}
                  </p>
                )}
                {section.items && (
                  <ul className="mt-4 space-y-2">
                    {section.items.map((item) => (
                      <li
                        key={item}
                        className="flex gap-3 text-[17px] leading-relaxed text-[#3a3a3c]"
                      >
                        <span
                          aria-hidden="true"
                          className="mt-[10px] h-[5px] w-[5px] rounded-full bg-[#86868b] shrink-0"
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </FadeIn>
          ))}

          {/* Contact */}
          <FadeIn>
            <div className="mt-12 pt-12 border-t border-[#d2d2d7]">
              <h2
                className="font-semibold tracking-tight text-[#1d1d1f]"
                style={headingStyle}
              >
                {t.sections.contact.title}
              </h2>
              <p className="mt-4 text-[17px] leading-relaxed text-[#3a3a3c]">
                {t.sections.contact.content}{' '}
                <a
                  href="mailto:team@roseyco.com"
                  className="text-[#0071e3] hover:underline"
                >
                  team@roseyco.com
                </a>
                .
              </p>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}

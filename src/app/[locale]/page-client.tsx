"use client";

import { useEffect, useState } from "react";
import {
  Tile,
  TileStack,
  CTALink,
  PillButton,
  ApplePlayer,
  LogoStrip,
  CaseSearchAnim,
  CaseWebsiteAnim,
  CloseSuite,
  Comparison,
  FAQ,
  FAQItem,
  InteractiveHeroBG,
  AnimatedStat,
} from "@/components/apple";
import { LocaleCode, isValidLocale } from "@/lib/locales";

interface HomePageClientProps {
  locale: string;
}

const HERO_COPY: Partial<
  Record<
    LocaleCode,
    {
      headWords: string[];
      accentWords: string[];
      subhead: string;
      caption: string;
      primaryCta: string;
      secondaryCta: string;
    }
  >
> = {
  us: {
    headWords: ["We", "fill", "your", "calendar."],
    accentWords: ["Guaranteed."],
    subhead: "Local customers, actively searching for your service, in front of you this month.",
    caption: "Traction in two to four weeks, or the fees pause. No contracts.",
    primaryCta: "Book a call",
    secondaryCta: "See how we work",
  },
  au: {
    headWords: ["We", "fill", "your", "calendar."],
    accentWords: ["Guaranteed."],
    subhead: "Local customers, actively searching for your service, in front of you this month.",
    caption: "Traction in two to four weeks, or the fees pause. No contracts. Yes, we know 'naur' means 'no'.",
    primaryCta: "Book a call",
    secondaryCta: "See how we work",
  },
  uk: {
    headWords: ["We", "fill", "your", "calendar."],
    accentWords: ["Guaranteed."],
    subhead: "Local customers, actively searching for your service, in front of you this month.",
    caption: "Traction in two to four weeks, or the fees pause. No contracts.",
    primaryCta: "Book a call",
    secondaryCta: "See how we work",
  },
  ie: {
    headWords: ["We", "fill", "your", "calendar."],
    accentWords: ["Guaranteed."],
    subhead: "Local customers, actively searching for your service, in front of you this month.",
    caption: "Traction in two to four weeks, or the fees pause. No contracts.",
    primaryCta: "Book a call",
    secondaryCta: "See how we work",
  },
  nl: {
    headWords: ["Wij", "vullen", "jouw", "agenda."],
    accentWords: ["Gegarandeerd."],
    subhead: "Lokale klanten die actief naar jouw dienst zoeken, nog deze maand voor je neus.",
    caption: "Tractie in twee tot vier weken, anders pauzeren de fees. Geen contracten.",
    primaryCta: "Boek een call",
    secondaryCta: "Zie hoe we werken",
  },
  dk: {
    headWords: ["Vi", "fylder", "din", "kalender."],
    accentWords: ["Garanteret."],
    subhead: "Lokale kunder, der aktivt leder efter din service, foran dig allerede denne maaned.",
    caption: "Traction paa to til fire uger, ellers saettes gebyrerne paa pause. Ingen kontrakter.",
    primaryCta: "Book et opkald",
    secondaryCta: "Se hvordan vi arbejder",
  },
  cz: {
    headWords: ["Plnime", "vas", "kalendar."],
    accentWords: ["Garance."],
    subhead: "Mistni zakaznici, kteri prave hledaji vasi sluzbu, pred vami jeste tento mesic.",
    caption: "Prvni vysledky za dva az ctyri tydny, jinak se poplatky pozastavi. Bez smluv.",
    primaryCta: "Rezervovat hovor",
    secondaryCta: "Jak pracujeme",
  },
};
const FAQ_ITEMS: FAQItem[] = [
  {
    q: "What will you actually do for my business?",
    a: "Build the site that converts, drive the right visitors to it, and qualify the leads before they reach your inbox. The work is done; you run the business.",
  },
  {
    q: "How long am I locked in?",
    a: "Zero commitment. The paid trial is one payment upfront for thirty days of service. A week before it ends, you decide whether to continue on a monthly retainer you can also cancel any time.",
  },
  {
    q: "What if it does not work for my type of business?",
    a: "We only accept clients we are confident we can deliver for. If we take you on, you are in the right hands. If traction does not show in two to four weeks, the fees pause until it does.",
  },
  {
    q: "How long until I see results?",
    a: "Most clients see movement in two to four weeks. The paid trial is sized to give you enough signal to make a clear decision at day thirty.",
  },
  {
    q: "Do I need to handle any of the technical work?",
    a: "No. That is the reason we exist. Our team handles strategy, creative, ad management, analytics, and reporting.",
  },
  {
    q: "How much of my time does this require?",
    a: "Almost none. A kickoff call, then short weekly check-ins. You focus on turning the inbound leads into customers.",
  },
  {
    q: "What happens if I want to cancel?",
    a: "Send a message, we cancel the same day. No retention calls.",
  },
  {
    q: "What does the trial cost upfront?",
    a: "It varies by scope and market. Always one-time, always upfront, no auto-renewal. Book a call and we will quote you honestly after ten minutes of questions.",
  },
  {
    q: "What if I need a refund?",
    a: "We are a registered EU company. If a refund is warranted, we process it. We have no interest in holding a payment that is not earned.",
  },
  {
    q: "Can I show my partner first?",
    a: "Yes. Send the call link along. Decisions made together stick.",
  },
];

export default function LocaleHomePageClient({ locale }: HomePageClientProps) {
  const safeLocale: LocaleCode = isValidLocale(locale) ? locale : "us";
  const prefix = `/${safeLocale}`;
    const heroCopy = HERO_COPY[safeLocale] || HERO_COPY.us!;

  // Trigger hero reveal shortly after mount so the word-by-word + sequential
  // fades play without needing scroll. IntersectionObserver is overkill for
  // above-the-fold content.
  const [heroIn, setHeroIn] = useState(false);
  useEffect(() => {
    const t = window.setTimeout(() => setHeroIn(true), 60);
    return () => window.clearTimeout(t);
  }, []);

  // Pick one hero video per browser session (50/50). Stored in sessionStorage
  // so it stays consistent across navigations until the tab is closed.
  const [heroVideo, setHeroVideo] = useState<string | null>(null);
  useEffect(() => {
    const KEY = "rc-hero-video";
    const options = ["/hero-ai-seo.mp4", "/hero-welcome.mp4"];
    let chosen = sessionStorage.getItem(KEY);
    if (!chosen || !options.includes(chosen)) {
      chosen = options[Math.random() < 0.5 ? 0 : 1];
      sessionStorage.setItem(KEY, chosen);
    }
    setHeroVideo(chosen);
  }, []);

  const headWords = heroCopy.headWords;
  const accentWords = heroCopy.accentWords;

  return (
    <>
      {/* 1. HERO — full-bleed, outside the TileStack so blobs and bg extend
         edge to edge of the viewport, not just the 1440px container. */}
      <section
        className="relative w-full overflow-hidden ac-hero-root"
        data-ac-theme="light"
        data-ac-in={heroIn ? "1" : "0"}
        dir="ltr"
        style={{
          padding: "clamp(24px, 3vw, 44px) clamp(24px, 5vw, 56px) clamp(32px, 5vw, 64px)",
          minHeight: "calc(100vh - 72px)",
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "center",
        }}
      >
        <InteractiveHeroBG />
        <div className="relative z-10 w-full max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-[1fr_1.05fr] gap-8 lg:gap-14 items-center">
          <div className="text-left lg:order-1">
            <h1
              className="ac-headline"
              style={{ fontSize: "clamp(52px, 7.5vw, 104px)", lineHeight: 0.96 }}
            >
              {headWords.map((w, i) => (
                <span
                  key={`h-${i}`}
                  className="ac-hero-word"
                  style={{ transitionDelay: `${80 + i * 110}ms`, marginInlineEnd: "0.28em" }}
                >
                  {w}
                </span>
              ))}
              <br />
              {accentWords.map((w, i) => (
                <span
                  key={`a-${i}`}
                  className="ac-hero-word"
                  style={{
                    transitionDelay: `${80 + (headWords.length + i) * 110}ms`,
                    color: "var(--ac-link)",
                    marginInlineEnd: "0.28em",
                  }}
                >
                  {w}
                </span>
              ))}
            </h1>
            <p
              className="ac-subhead mt-4 ac-hero-fade"
              style={{
                fontSize: "clamp(18px, 2vw, 24px)",
                textAlign: "left",
                marginLeft: 0,
                maxWidth: 520,
                transitionDelay: "720ms",
              }}
            >
              {heroCopy.subhead}
            </p>
            <div className="mt-4 ac-caption ac-hero-fade" style={{ transitionDelay: "900ms" }}>
              {heroCopy.caption}
            </div>
            <div
              className="mt-6 flex flex-wrap gap-4 items-center ac-hero-fade"
              style={{ transitionDelay: "1080ms" }}
            >
              <PillButton href={`${prefix}/contact`}>{heroCopy.primaryCta}</PillButton>
              <CTALink href="#how">{heroCopy.secondaryCta}</CTALink>
            </div>
          </div>
          <div
            className="w-full ac-hero-video flex justify-center lg:order-2 lg:justify-end"
          >
            <div className="w-full max-w-[360px] aspect-[9/16] ac-hero-video-float">
              {heroVideo && (
                <ApplePlayer
                  src={heroVideo}
                  aspect="portrait"
                  title="A short intro from Rosey Co."
                />
              )}
            </div>
          </div>
        </div>
      </section>

      <TileStack>
      {/* 2. TRUSTED BY — quiet social proof strip. */}
      <Tile
        theme="light"
        variant="C"
        eyebrow="Trusted by"
        headline={
          <span style={{ fontSize: "clamp(56px, 8vw, 112px)", display: "inline-block" }}>
            A short list. Long relationships.
          </span>
        }
        media={
          <div className="flex flex-col gap-6">
            <LogoStrip />
            <LogoStrip reverse />
          </div>
        }
        mediaPosition="below"
      />

      {/* 3. RESULTS — neutral white. Numbers do the talking. */}
      <section
        className="ac-tile ac-tile-white"
        data-ac-theme="light"
        style={{ padding: "clamp(48px, 7vw, 96px) clamp(24px, 5vw, 56px)" }}
      >
        <div className="w-full max-w-6xl mx-auto text-center" data-ac-reveal>
          <div className="ac-eyebrow">Results</div>
          <h2 className="ac-headline" style={{ fontSize: "clamp(40px, 5vw, 64px)" }}>
            The numbers.
          </h2>
          <p className="ac-subhead mx-auto">
            Averages across active clients. Not cherry picked.
          </p>
        </div>
        <div className="w-full max-w-6xl mx-auto mt-12 grid grid-cols-1 md:grid-cols-3 gap-5">
          <div data-ac-reveal style={{ transitionDelay: "0ms" }}>
            <AnimatedStat label="Lead growth" value="247%" delta="Average across clients" />
          </div>
          <div data-ac-reveal style={{ transitionDelay: "120ms" }}>
            <AnimatedStat label="Time to traction" value="2-4 wks" delta="From launch" visual="calendar" />
          </div>
          <div data-ac-reveal style={{ transitionDelay: "240ms" }}>
            <AnimatedStat label="Return on ad spend" value="6.4x" delta="Blended ROAS" />
          </div>
        </div>
      </section>

      {/* 4. HOW WE WORK — three steps. */}
      <section
        id="how"
        className="ac-tile ac-tile-light"
        data-ac-theme="light"
        style={{ padding: "clamp(48px, 7vw, 96px) clamp(24px, 5vw, 56px)" }}
      >
        <div className="w-full max-w-6xl mx-auto text-center" data-ac-reveal>
          <div className="ac-eyebrow">How we work</div>
          <h2 className="ac-headline" style={{ fontSize: "clamp(40px, 5vw, 64px)" }}>
            Plan. Run. Track.
          </h2>
          <p className="ac-subhead mx-auto">
            Three steps. One team. Your calendar gets filled.
          </p>
        </div>
        <div className="w-full max-w-6xl mx-auto mt-12 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div data-ac-reveal style={{ transitionDelay: "0ms" }}>
            <StepCard number="01" title="Plan" body="We learn your market, your customer, and the words that move them. Before a dollar is spent." glyph={<GlyphCompass />} />
          </div>
          <div data-ac-reveal style={{ transitionDelay: "120ms" }}>
            <StepCard number="02" title="Run" body="We build the campaigns, write the ads, ship the site, and manage everything day to day." glyph={<GlyphGears />} />
          </div>
          <div data-ac-reveal style={{ transitionDelay: "240ms" }}>
            <StepCard number="03" title="Track" body="We watch what is working, double down, and kill the rest. Reported weekly in plain English." glyph={<GlyphPulse />} />
          </div>
        </div>
      </section>

      {/* 5. SERVICES — 4-up numbered grid. */}
      <section
        className="ac-tile ac-tile-white"
        data-ac-theme="light"
        style={{ padding: "clamp(48px, 7vw, 96px) clamp(24px, 5vw, 56px)" }}
      >
        <div className="w-full max-w-6xl mx-auto text-center" data-ac-reveal>
          <div className="ac-eyebrow">Services</div>
          <h2 className="ac-headline" style={{ fontSize: "clamp(40px, 5vw, 64px)" }}>
            Four levers. One operator.
          </h2>
          <p className="ac-subhead mx-auto">
            Pull them together. Not piece by piece.
          </p>
        </div>
        <div className="w-full max-w-6xl mx-auto mt-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-[#e8e8ed] border border-[#e8e8ed] rounded-[18px] overflow-hidden bg-white">
            <div data-ac-reveal style={{ transitionDelay: "0ms" }}>
              <ServiceCell index="01" title="SEO" body="Show up first. Stay there." />
            </div>
            <div data-ac-reveal style={{ transitionDelay: "100ms" }}>
              <ServiceCell index="02" title="Paid Ads" body="Every dollar tracked." />
            </div>
            <div data-ac-reveal style={{ transitionDelay: "200ms" }}>
              <ServiceCell index="03" title="Social" body="A feed that compounds." />
            </div>
            <div data-ac-reveal style={{ transitionDelay: "300ms" }}>
              <ServiceCell index="04" title="Web Design" body="A storefront that closes." />
            </div>
          </div>
        </div>
      </section>

      {/* 6. CASE STUDIES — fixed cards, blue-tint. Color cue: trust. */}
      <section
        className="ac-tile ac-tile-tint-blue"
        data-ac-theme="light"
        style={{ padding: "clamp(48px, 7vw, 96px) clamp(24px, 5vw, 56px)" }}
      >
        <div className="w-full max-w-6xl mx-auto text-center" data-ac-reveal>
          <div className="ac-eyebrow">Case studies</div>
          <h2 className="ac-headline" style={{ fontSize: "clamp(40px, 5vw, 64px)" }}>
            Selected work.
          </h2>
        </div>
        <div className="w-full max-w-6xl mx-auto mt-12 grid grid-cols-1 md:grid-cols-2 gap-5">
          <CaseCard
            side="left"
            metric="3.2x"
            metricLabel="revenue"
            summary="A founder-led brand stops buying impressions. Starts buying customers."            visual={<CaseSearchAnim />}
          />
          <CaseCard
            side="right"
            metric="68"
            metricLabel="leads a week"
            summary="A local service business replaces a sales team with a funnel."            visual={<CaseWebsiteAnim />}
          />
        </div>
      </section>

      {/* 7. US VS THEM — comparison. Neutral white. */}
      <section
        className="ac-tile ac-tile-white"
        data-ac-theme="light"
        style={{ padding: "clamp(48px, 7vw, 96px) clamp(24px, 5vw, 56px)" }}
      >
        <div className="w-full max-w-6xl mx-auto text-center" data-ac-reveal>
          <div className="ac-eyebrow">Us vs them</div>
          <h2 className="ac-headline" style={{ fontSize: "clamp(40px, 5vw, 64px)" }}>
            Why we are different.
          </h2>
          <p className="ac-subhead mx-auto">
            A look at the work first. Then the difference.
          </p>
        </div>

        <div className="w-full mt-10" data-ac-reveal>
          <Comparison
            left={{
              title: "Other agencies",
              items: [
                "Twelve month retainers before results.",
                "Annual contract, quarterly review.",
                "Separate vendors for each channel.",
                "Vanity metrics in a PDF deck.",
                "Creative outsourced offshore.",
                "Account manager who forwards your emails.",
              ],
            }}
            right={{
              title: "Rosey Co.",
              items: [
                "Traction in two to four weeks, or fees pause.",
                "Month to month. No long contracts.",
                "One operator across SEO, social, ads, and web.",
                "Real dashboards. Real numbers. Weekly.",
                "Creative and strategy in house.",
                "Direct line to the team that runs your account.",
              ],
            }}
          />
        </div>
      </section>

      {/* 8. FAQ — objection handling. Neutral. */}
      <section
        className="ac-tile ac-tile-light"
        data-ac-theme="light"
        style={{ padding: "clamp(48px, 7vw, 96px) clamp(24px, 5vw, 56px)" }}
      >
        <div className="w-full max-w-3xl mx-auto text-center" data-ac-reveal>
          <div className="ac-eyebrow">Still on the fence?</div>
          <h2 className="ac-headline" style={{ fontSize: "clamp(36px, 4.5vw, 56px)" }}>
            Questions people ask.
          </h2>
        </div>
        <div className="w-full mt-12" data-ac-reveal>
          <FAQ items={FAQ_ITEMS} />
        </div>
      </section>

      {/* 9 + 10. CLOSE + merged blog/newsletter — shared across every page. */}
      <CloseSuite prefix={prefix} />
      </TileStack>
    </>
  );
}

/* ---------- local helpers ---------- */

function StepCard({
  number,
  title,
  body,
  glyph,
}: {
  number: string;
  title: string;
  body: string;
  glyph?: React.ReactNode;
}) {
  return (
    <div className="ac-step-card group rounded-[22px] bg-white border border-[#e8e8ed] p-7 text-left">
      <div className="flex items-start justify-between">
        <div className="text-[13px] font-mono tracking-widest text-[#6e6e73]">{number}</div>
        {glyph && <div className="ac-step-glyph">{glyph}</div>}
      </div>
      <div className="mt-3 text-[28px] font-semibold tracking-tight leading-none">{title}</div>
      <div className="mt-3 text-[16px] text-[#6e6e73] leading-snug">{body}</div>
    </div>
  );
}

function GlyphCompass() {
  return (
    <svg width="44" height="44" viewBox="0 0 48 48" aria-hidden="true" className="ac-glyph">
      <circle cx="24" cy="24" r="20" fill="none" stroke="#0071e3" strokeWidth="1.6" opacity="0.3" />
      <circle cx="24" cy="24" r="15" fill="none" stroke="#0071e3" strokeWidth="1.6" opacity="0.5" />
      <path className="ac-glyph-needle" d="M24 10 L27 24 L24 38 L21 24 Z" fill="#0071e3" />
      <circle cx="24" cy="24" r="2.5" fill="#fff" stroke="#0071e3" strokeWidth="1.6" />
    </svg>
  );
}

function GlyphGears() {
  return (
    <svg width="44" height="44" viewBox="0 0 48 48" aria-hidden="true" className="ac-glyph">
      <g className="ac-glyph-gear-a">
        <path d="M20 6 L22 6 L23 10 L25 11 L28 9 L30 11 L28 14 L29 16 L33 17 L33 19 L29 20 L28 22 L30 25 L28 27 L25 25 L23 26 L22 30 L20 30 L19 26 L17 25 L14 27 L12 25 L14 22 L13 20 L9 19 L9 17 L13 16 L14 14 L12 11 L14 9 L17 11 L19 10 Z" fill="#0071e3" opacity="0.9" />
        <circle cx="21" cy="18" r="4" fill="#fff" />
      </g>
      <g className="ac-glyph-gear-b" style={{ transformOrigin: "34px 32px" }}>
        <path d="M33 22 L35 22 L35.6 25 L37 25.6 L39 24 L40 25.6 L38.6 27.6 L39.4 29 L42 29.6 L42 31.4 L39.4 32 L38.6 33.4 L40 35.4 L39 37 L37 35.4 L35.6 36 L35 39 L33 39 L32.4 36 L31 35.4 L29 37 L28 35.4 L29.4 33.4 L28.6 32 L26 31.4 L26 29.6 L28.6 29 L29.4 27.6 L28 25.6 L29 24 L31 25.6 L32.4 25 Z" fill="#0071e3" opacity="0.6" />
        <circle cx="34" cy="30.5" r="2.5" fill="#fff" />
      </g>
    </svg>
  );
}

function GlyphPulse() {
  return (
    <svg width="44" height="44" viewBox="0 0 48 48" aria-hidden="true" className="ac-glyph">
      <rect x="4" y="18" width="40" height="18" rx="4" fill="#f0f4ff" stroke="#d1dcf2" />
      <path className="ac-glyph-pulse" d="M6 28 L14 28 L17 22 L22 34 L27 24 L32 30 L42 30" stroke="#0071e3" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="42" cy="30" r="2.5" fill="#0071e3" />
    </svg>
  );
}

function ServiceCell({
  index,
  title,
  body,
}: {
  index: string;
  title: string;
  body: string;
}) {
  return (
    <div className="ac-service-cell block p-7 text-left">
      <div className="text-[13px] font-mono tracking-widest text-[#6e6e73]">{index}</div>
      <div className="mt-5 text-[26px] font-semibold tracking-tight leading-none">{title}</div>
      <div className="mt-2 text-[15px] text-[#6e6e73] leading-snug">{body}</div>
    </div>
  );
}

function CaseCard({
  side,
  metric,
  metricLabel,
  summary,
  visual,
}: {
  side: "left" | "right";
  metric: string;
  metricLabel: string;
  summary: string;
  visual: React.ReactNode;
}) {
  return (
    <div
      data-ac-reveal
      className={`ac-case-card ${side === "left" ? "ac-case-left" : "ac-case-right"} flex flex-col rounded-[22px] bg-white border border-[#e8e8ed] overflow-hidden`}
    >
      <div className="p-7 text-left">
        <div className="flex items-baseline gap-2 ac-case-metric">
          <span className="text-[48px] font-semibold tracking-tight leading-none" style={{ color: "var(--ac-link)" }}>
            {metric}
          </span>
          <span className="text-[17px] text-[#6e6e73]">{metricLabel}</span>
        </div>
        <div className="mt-3 text-[16px] text-[#3a3a3c] leading-snug">{summary}</div>
      </div>
      <div className="flex-1 bg-[#f5f5f7] p-6 flex items-center justify-center ac-case-visual">{visual}</div>
    </div>
  );
}


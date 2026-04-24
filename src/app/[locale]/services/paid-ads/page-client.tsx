"use client";

import {
  Tile,
  TileStack,
  TilePair,
  CTALink,
  PillButton,
  MockDashboard,
  MockPhone,
  CloseSuite,
} from "@/components/apple";
import { LocaleCode, isValidLocale } from "@/lib/locales";

interface Props {
  params: { locale: string };
}

export default function PaidAdsPageClient({ params }: Props) {
  const safe: LocaleCode = isValidLocale(params.locale) ? params.locale : "us";
  const p = `/${safe}`;

  return (
    <TileStack>
      <Tile
        theme="light"
        variant="A"
        eyebrow="Paid Ads"
        headline="Scale."
        tagline="Every dollar tracked. Every click earned."
        ctas={<PillButton href={`${p}/contact`}>Book a call</PillButton>}
        media={<MockDashboard theme="light" label="Return on ad spend" value="6.4x" delta="Blended ROAS" />}
        mediaPosition="below"
      />

      <TilePair>
        <Tile
          theme="light"
          variant="B"
          eyebrow="Google"
          headline="Intent."
          tagline="Catch demand the moment it forms. Search. Shopping. Performance Max."
        />
        <Tile
          theme="light"
          variant="B"
          eyebrow="Meta"
          headline="Desire."
          tagline="Thumb-stopping creative that fills the top of the funnel without burning it."
        />
      </TilePair>

      <Tile
        theme="light"
        variant="A"
        eyebrow="Reporting"
        headline="One source of truth."
        tagline="Spend, revenue, and cost per lead. Side by side. In real time."
        media={
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
            <MockDashboard theme="light" label="Cost per lead" value="$18" delta="Down 41% MoM" />
            <MockDashboard theme="light" label="ROAS" value="6.4x" delta="Blended" />
            <MockDashboard theme="light" label="New customers" value="412" delta="This month" />
          </div>
        }
        mediaPosition="below"
      />

      <Tile
        theme="light"
        variant="A"
        eyebrow="Creative"
        headline="Ads that feel like content."
        tagline="Short film. Sharp copy. Built to outlast a single campaign."
        media={
          <MockPhone>
            <div className="w-full h-full bg-gradient-to-b from-[#0071e3] to-[#003c7e] text-white flex flex-col items-center justify-center p-8 text-center">
              <div className="text-[13px] uppercase tracking-widest opacity-80">Ad</div>
              <div className="mt-2 text-[28px] font-semibold leading-tight">Stop guessing.<br />Start measuring.</div>
              <div className="mt-6 inline-block rounded-full bg-white text-[#0071e3] text-[13px] px-4 py-1.5">Book a call</div>
            </div>
          </MockPhone>
        }
        mediaPosition="below"
      />

      <CloseSuite prefix={p} />
    </TileStack>
  );
}

"use client";

import {
  Tile,
  TileStack,
  TilePair,
  CTALink,
  PillButton,
  MockBrowser,
  MockDashboard,
  CloseSuite,
} from "@/components/apple";
import { LocaleCode, isValidLocale } from "@/lib/locales";

interface Props {
  params: { locale: string };
}

export default function WebsiteDesignPageClient({ params }: Props) {
  const safe: LocaleCode = isValidLocale(params.locale) ? params.locale : "us";
  const p = `/${safe}`;

  return (
    <TileStack>
      <Tile
        theme="light"
        variant="A"
        eyebrow="Web Design"
        headline="Close."
        tagline="The storefront that closes while you sleep."
        ctas={<PillButton href={`${p}/contact`}>Book a call</PillButton>}
        media={
          <MockBrowser url="roseyco.com/case" theme="light">
            <div className="p-10 space-y-3 text-[#1d1d1f]">
              <div className="text-[12px] uppercase tracking-widest text-[#6e6e73]">Launch</div>
              <div className="text-[36px] font-semibold leading-tight">Built to convert.<br />Built to last.</div>
              <div className="pt-4">
                <span className="inline-block rounded-full text-white text-[14px] px-4 py-2" style={{ background: "var(--ac-link)" }}>Get a quote</span>
              </div>
            </div>
          </MockBrowser>
        }
        mediaPosition="below"
      />

      <TilePair>
        <Tile
          theme="light"
          variant="B"
          eyebrow="Speed"
          headline="First paint. First sale."
          tagline="Average Lighthouse score above 95. Every page. Every device."
        />
        <Tile
          theme="light"
          variant="B"
          eyebrow="Craft"
          headline="Pixel honest."
          tagline="Typography, motion, and whitespace designed by humans."
        />
      </TilePair>

      <Tile
        theme="light"
        variant="A"
        eyebrow="Outcomes"
        headline="The numbers."
        tagline="Before and after, measured in revenue."
        media={
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
            <MockDashboard theme="light" label="Conversion rate" value="4.8%" delta="Up from 1.6%" />
            <MockDashboard theme="light" label="Page speed" value="1.2s" delta="Largest contentful paint" />
            <MockDashboard theme="light" label="Bounce rate" value="21%" delta="Down 44%" />
          </div>
        }
        mediaPosition="below"
      />

      <CloseSuite prefix={p} />
    </TileStack>
  );
}

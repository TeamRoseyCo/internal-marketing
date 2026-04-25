"use client";

import {
  Tile,
  TileStack,
  TilePair,
  CTALink,
  PillButton,
  MockSearchResult,
  MockPhone,
  MockDashboard,
  MockBrowser,
  CloseSuite,
} from "@/components/apple";
import { LocaleCode, isValidLocale } from "@/lib/locales";

interface Props {
  locale: string;
}

export default function ServicesPageClient({ locale }: Props) {
  const safe: LocaleCode = isValidLocale(locale) ? locale : "us";
  const p = `/${safe}`;

  return (
    <TileStack>
      <Tile
        theme="light"
        variant="A"
        eyebrow="Services"
        headline="Four levers. One operator."
        tagline="Everything a modern brand needs to be found, followed, and bought."
        ctas={<PillButton href={`${p}/contact`}>Book a call</PillButton>}
      />

      <TilePair>
        <Tile
          theme="light"
          variant="B"
          eyebrow="SEO"
          headline="Rank."
          tagline="Show up first. Stay there."
          ctas={<CTALink href={`${p}/services/seo`}>Learn more</CTALink>}
          media={<MockSearchResult />}
          mediaPosition="below"
        />
        <Tile
          theme="light"
          variant="B"
          eyebrow="Paid Ads"
          headline="Scale."
          tagline="Every dollar tracked. Every click earned."
          ctas={<CTALink href={`${p}/services/paid-ads`}>Learn more</CTALink>}
          media={<MockDashboard theme="light" label="Return on ad spend" value="6.4x" delta="Blended ROAS" />}
          mediaPosition="below"
        />
      </TilePair>

      <TilePair>
        <Tile
          theme="light"
          variant="B"
          eyebrow="Social"
          headline="Attention."
          tagline="A feed that compounds instead of decays."
          ctas={<CTALink href={`${p}/services/social-media`}>Learn more</CTALink>}
          media={
            <MockPhone horizontal>
              <div className="w-full h-full bg-gradient-to-r from-[#f5f5f7] to-white flex items-center justify-center p-6">
                <div className="text-center text-[#1d1d1f]">
                  <div className="text-[13px] uppercase tracking-widest text-[#6e6e73]">This week</div>
                  <div className="mt-2 text-[52px] font-semibold leading-none">+18.2k</div>
                  <div className="mt-1 text-[15px] text-[#6e6e73]">new followers</div>
                </div>
              </div>
            </MockPhone>
          }
          mediaPosition="below"
        />
        <Tile
          theme="light"
          variant="B"
          eyebrow="Web Design"
          headline="Close."
          tagline="The storefront that closes while you sleep."
          ctas={<CTALink href={`${p}/services/website-design`}>Learn more</CTALink>}
          media={
            <MockBrowser url="roseyco.com/case" theme="light">
              <div className="p-8 space-y-2 text-[#1d1d1f]">
                <div className="text-[12px] uppercase tracking-widest text-[#6e6e73]">Launch</div>
                <div className="text-[28px] font-semibold leading-tight">Built to convert.</div>
                <div className="text-[14px] text-[#6e6e73]">Average Lighthouse score: 96.</div>
              </div>
            </MockBrowser>
          }
          mediaPosition="below"
        />
      </TilePair>

      <Tile
        theme="light"
        variant="B"
        eyebrow="Together"
        headline="One team. One outcome."
        tagline="Individual channels win quarters. Integrated channels win years."
        ctas={<CTALink href={`${p}/results`}>See the results</CTALink>}
      />

      <CloseSuite prefix={p} />
    </TileStack>
  );
}

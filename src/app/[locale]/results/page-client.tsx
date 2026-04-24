"use client";

import {
  Tile,
  TileStack,
  TilePair,
  CTALink,
  PillButton,
  MockDashboard,
  MockBrowser,
  MockSearchResult,
  MockPhone,
  LogoStrip,
  CloseSuite,
} from "@/components/apple";
import { LocaleCode, isValidLocale } from "@/lib/locales";

interface Props {
  params: { locale: string };
}

export default function ResultsPageClient({ params }: Props) {
  const safe: LocaleCode = isValidLocale(params.locale) ? params.locale : "us";
  const p = `/${safe}`;

  return (
    <TileStack>
      <Tile
        theme="light"
        variant="A"
        eyebrow="Results"
        headline="The numbers."
        tagline="A quiet shelf of wins we can show, and a longer one we cannot."
        ctas={<PillButton href={`${p}/contact`}>Book a call</PillButton>}
      />

      <Tile
        theme="light"
        variant="A"
        headline="Across the book."
        tagline="Blended outcomes across every active client, month over month."
        media={
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
            <MockDashboard theme="light" label="Lead growth" value="247%" delta="Average" />
            <MockDashboard theme="light" label="ROAS" value="6.4x" delta="Blended" />
            <MockDashboard theme="light" label="Organic lift" value="+214%" delta="YoY" />
            <MockDashboard theme="light" label="Time to traction" value="2-4 wks" delta="From launch" />
          </div>
        }
        mediaPosition="below"
      />

      <TilePair>
        <Tile
          theme="light"
          variant="B"
          eyebrow="Case study"
          headline="3.2x revenue."
          tagline="A founder-led brand stops buying impressions. Starts buying customers."
          ctas={<CTALink href={`${p}/contact`}>Start yours</CTALink>}
          media={
            <MockSearchResult
              query="premium coaching program"
              site="northwind.coach"
              title="Northwind. Private coaching for founders."
              description="Executive coaching for founders scaling past seven figures. Waitlist open for the next cohort."
              position={1}
            />
          }
          mediaPosition="below"
        />
        <Tile
          theme="light"
          variant="B"
          eyebrow="Case study"
          headline="68 leads a week."
          tagline="A local service business replaces a sales team with a funnel."
          ctas={<CTALink href={`${p}/contact`}>Start yours</CTALink>}
          media={
            <MockBrowser url="2atcleaning.com" theme="light">
              <div className="p-8 space-y-3 text-[#1d1d1f]">
                <div className="text-[12px] uppercase tracking-widest text-[#6e6e73]">Commercial cleaning</div>
                <div className="text-[30px] font-semibold leading-tight">Clean sites.<br />Closed contracts.</div>
              </div>
            </MockBrowser>
          }
          mediaPosition="below"
        />
      </TilePair>

      <TilePair>
        <Tile
          theme="light"
          variant="B"
          eyebrow="Case study"
          headline="4.8% conversion."
          tagline="A legacy site becomes the fastest path to revenue in the business."
          ctas={<CTALink href={`${p}/contact`}>Start yours</CTALink>}
          media={<MockDashboard theme="light" label="Conversion rate" value="4.8%" delta="Up from 1.6%" />}
          mediaPosition="below"
        />
        <Tile
          theme="light"
          variant="B"
          eyebrow="Case study"
          headline="18,200 followers."
          tagline="A considered feed. One year. Zero paid amplification."
          ctas={<CTALink href={`${p}/contact`}>Start yours</CTALink>}
          media={
            <MockPhone>
              <div className="w-full h-full bg-gradient-to-b from-[#f5f5f7] to-white flex items-center justify-center p-6">
                <div className="text-center text-[#1d1d1f]">
                  <div className="text-[13px] uppercase tracking-widest text-[#6e6e73]">Organic reach</div>
                  <div className="mt-2 text-[52px] font-semibold leading-none">2.4M</div>
                  <div className="mt-1 text-[15px] text-[#6e6e73]">last 30 days</div>
                </div>
              </div>
            </MockPhone>
          }
          mediaPosition="below"
        />
      </TilePair>

      <Tile
        theme="light"
        variant="A"
        eyebrow="Clients"
        headline="A quiet roster."
        tagline="Operators who preferred the work to the announcement."
        media={<LogoStrip />}
        mediaPosition="below"
      />

      <CloseSuite prefix={p} />
    </TileStack>
  );
}

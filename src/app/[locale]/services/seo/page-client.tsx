"use client";

import {
  Tile,
  TileStack,
  TilePair,
  CTALink,
  PillButton,
  MockSearchResult,
  MockDashboard,
  CloseSuite,
} from "@/components/apple";
import { LocaleCode, isValidLocale } from "@/lib/locales";

interface Props {
  params: { locale: string };
}

export default function SEOPageClient({ params }: Props) {
  const safe: LocaleCode = isValidLocale(params.locale) ? params.locale : "us";
  const p = `/${safe}`;

  return (
    <TileStack>
      <Tile
        theme="light"
        variant="A"
        eyebrow="SEO"
        headline="Rank."
        tagline="Show up first. Stay there."
        ctas={<PillButton href={`${p}/contact`}>Book a call</PillButton>}
        media={<MockSearchResult />}
        mediaPosition="below"
      />

      <TilePair>
        <Tile
          theme="light"
          variant="B"
          eyebrow="Authority"
          headline="Be the answer."
          tagline="Content that earns clicks instead of chasing them."
          ctas={<CTALink href={`${p}/results`}>See the proof</CTALink>}
        />
        <Tile
          theme="light"
          variant="B"
          eyebrow="Technical"
          headline="Fast. Crawled. Indexed."
          tagline="Core Web Vitals that Google rewards."
          ctas={<CTALink href={`${p}/blog`}>Read the playbook</CTALink>}
        />
      </TilePair>

      <Tile
        theme="light"
        variant="A"
        eyebrow="Measured"
        headline="Live dashboards."
        tagline="Every position, every click, every conversion. Visible in real time."
        media={
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
            <MockDashboard theme="light" label="Keywords top 3" value="142" delta="+38 this month" />
            <MockDashboard theme="light" label="Organic traffic" value="214%" delta="Year over year" />
            <MockDashboard theme="light" label="Revenue from search" value="$48k" delta="This quarter" />
          </div>
        }
        mediaPosition="below"
      />

      <CloseSuite prefix={p} />
    </TileStack>
  );
}

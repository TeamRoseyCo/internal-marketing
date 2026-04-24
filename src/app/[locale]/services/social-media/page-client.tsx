"use client";

import {
  Tile,
  TileStack,
  TilePair,
  CTALink,
  PillButton,
  MockPhone,
  MockDashboard,
  CloseSuite,
} from "@/components/apple";
import { LocaleCode, isValidLocale } from "@/lib/locales";

interface Props {
  params: { locale: string };
}

export default function SocialMediaPageClient({ params }: Props) {
  const safe: LocaleCode = isValidLocale(params.locale) ? params.locale : "us";
  const p = `/${safe}`;

  return (
    <TileStack>
      <Tile
        theme="light"
        variant="A"
        eyebrow="Social"
        headline="Attention."
        tagline="A feed that compounds instead of decays."
        ctas={<PillButton href={`${p}/contact`}>Book a call</PillButton>}
        media={
          <MockPhone>
            <div className="w-full h-full bg-gradient-to-b from-[#f5f5f7] to-white flex items-center justify-center p-6">
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

      <TilePair>
        <Tile
          theme="light"
          variant="B"
          eyebrow="Content"
          headline="Made to be saved."
          tagline="Short video and carousels built for the platforms you already live on."
        />
        <Tile
          theme="light"
          variant="B"
          eyebrow="Strategy"
          headline="One voice."
          tagline="Consistent across every surface. Recognisable in a thumbnail."
        />
      </TilePair>

      <Tile
        theme="light"
        variant="A"
        eyebrow="Measured"
        headline="Reach. Saves. Sales."
        tagline="Vanity metrics are the consolation prize. Revenue is the point."
        media={
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
            <MockDashboard theme="light" label="Reach" value="2.4M" delta="Monthly, unpaid" />
            <MockDashboard theme="light" label="Saves" value="9,812" delta="High-intent signal" />
            <MockDashboard theme="light" label="Attributed revenue" value="$112k" delta="Last 30 days" />
          </div>
        }
        mediaPosition="below"
      />

      <CloseSuite prefix={p} />
    </TileStack>
  );
}

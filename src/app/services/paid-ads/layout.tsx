import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Paid Advertising Services - Google Ads & Meta Ads Management",
  description:
    "ROI-focused Google Ads and Meta Ads campaigns that convert clicks into customers. Every dollar tracked, every result measured. Get a free ads audit today.",
  keywords: [
    "Google Ads management",
    "Meta Ads",
    "Facebook Ads",
    "PPC management",
    "paid advertising agency",
    "ROAS optimization",
    "retargeting",
    "conversion tracking",
  ],
  openGraph: {
    title: "Paid Advertising Services - Rosey Co.",
    description:
      "ROI-focused Google Ads and Meta Ads campaigns. Get a free ads audit today.",
    url: "https://roseyco.com/services/paid-ads",
  },
};

export default function PaidAdsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

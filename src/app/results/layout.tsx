import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Results - Case Studies & Client Success Stories",
  description:
    "See real results from real clients. Explore our case studies showing how we've helped businesses increase leads, traffic, and revenue through strategic digital marketing.",
  keywords: [
    "case studies",
    "client results",
    "marketing results",
    "success stories",
    "ROI",
    "portfolio",
    "testimonials",
  ],
  openGraph: {
    title: "Our Results - Rosey Co.",
    description:
      "See real results from real clients. Explore our case studies and success stories.",
    url: "https://roseyco.com/results",
  },
};

export default function ResultsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

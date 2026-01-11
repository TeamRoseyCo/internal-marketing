import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SEO Services - Get Found by Customers Searching for You",
  description:
    "Dominate search results with data-driven SEO strategies. We help businesses rank higher, drive qualified traffic, and convert visitors into customers. Get a free SEO audit today.",
  keywords: [
    "SEO services",
    "search engine optimization",
    "SEO agency",
    "local SEO",
    "technical SEO",
    "link building",
    "keyword research",
    "Google rankings",
  ],
  openGraph: {
    title: "SEO Services - Rosey Co.",
    description:
      "Dominate search results with data-driven SEO strategies. Get a free SEO audit today.",
    url: "https://roseyco.com/services/seo",
  },
};

export default function SEOLayout({ children }: { children: React.ReactNode }) {
  return children;
}

// src/app/robots.ts
// Robots.txt configuration for search engine crawlers
// Allows all crawling, points to sitemap

import { MetadataRoute } from "next";

const BASE_URL = "https://roseyco.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/", // Don't crawl API routes
          "/_next/", // Don't crawl Next.js internals
          "/private/", // Don't crawl private routes (if any)
        ],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}

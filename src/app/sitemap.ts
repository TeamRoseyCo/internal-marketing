// src/app/sitemap.ts
// Dynamic sitemap generation for all locale pages
// Includes homepage, services, blog, and other pages per locale

import { MetadataRoute } from "next";
import { localeList, LocaleCode } from "@/lib/locales";
import { getPostSlugs } from "@/lib/blog";

const BASE_URL = "https://roseyco.com";

// Static pages that exist for each locale
const staticPages = [
  "", // Homepage
  "/services",
  "/services/seo",
  "/services/social-media",
  "/services/paid-ads",
  "/services/website-design",
  "/contact",
  "/results",
  "/privacy-policy",
  "/blog",
];

// Non-locale pages (if any exist at root level)
const rootPages = [
  "/blog",
  "/services",
  "/services/seo",
  "/services/social-media",
  "/services/paid-ads",
  "/services/website-design",
  "/contact",
  "/results",
  "/privacy-policy",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const sitemap: MetadataRoute.Sitemap = [];

  // Add root homepage
  sitemap.push({
    url: BASE_URL,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 1,
  });

  // Add root-level pages (non-locale)
  rootPages.forEach((page) => {
    sitemap.push({
      url: `${BASE_URL}${page}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: page === "/blog" ? 0.8 : 0.7,
    });
  });

  // Add locale-specific pages
  localeList.forEach((locale: LocaleCode) => {
    staticPages.forEach((page) => {
      const url = `${BASE_URL}/${locale}${page}`;
      const isHomepage = page === "";
      const isService = page.includes("/services");
      const isBlog = page === "/blog";

      sitemap.push({
        url,
        lastModified: new Date(),
        changeFrequency: isHomepage || isBlog ? "weekly" : "monthly",
        priority: isHomepage ? 0.9 : isService ? 0.8 : 0.7,
      });
    });
  });

  // Add blog posts for each locale
  const blogSlugs = getPostSlugs();

  // Root-level blog posts
  blogSlugs.forEach((slug) => {
    sitemap.push({
      url: `${BASE_URL}/blog/${slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    });
  });

  // Locale-specific blog posts
  localeList.forEach((locale: LocaleCode) => {
    blogSlugs.forEach((slug) => {
      sitemap.push({
        url: `${BASE_URL}/${locale}/blog/${slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.6,
      });
    });
  });

  return sitemap;
}

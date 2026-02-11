// src/lib/content.ts
// Pillar content loading functions for topical authority architecture
// Follows patterns from blog.ts (gray-matter, reading-time, locale fallback)
// RELEVANT FILES: src/lib/blog.ts, src/content/pillars/[locale]/*.mdx

import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";
import { LocaleCode } from "./locales";
import { getPostBySlug, BlogPostMeta } from "./blog";

const PILLARS_DIR = path.join(process.cwd(), "src/content/pillars");

// Content type discriminator
export type ContentType = 'pillar' | 'cluster';

// Extended interface for pillar pages
export interface PillarPage {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  dateModified?: string;
  readTime: string;
  author: string;
  image?: string;
  tags?: string[];
  content: string;
  type: 'pillar';
  clusterPages: string[];      // Slugs of related blog posts
  relatedPillars?: string[];   // Slugs of related pillar pages
}

export interface PillarPageMeta {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  dateModified?: string;
  readTime: string;
  author: string;
  image?: string;
  tags?: string[];
  type: 'pillar';
  clusterPages: string[];
  relatedPillars?: string[];
}

// Helper function to format reading time based on locale
function formatReadTime(minutes: number, locale: LocaleCode): string {
  const readTimeText: Record<LocaleCode, string> = {
    us: "min read",
    au: "min read",
    uk: "min read",
    ie: "min read",
    nl: "min leestijd",
    dk: "min læsning",
  };

  return `${minutes} ${readTimeText[locale]}`;
}

/**
 * Get all pillar page metadata for a locale, sorted by date descending
 * Falls back to 'us' if locale folder doesn't exist
 */
export function getAllPillars(locale: LocaleCode = "us"): PillarPageMeta[] {
  const localePillarsDir = path.join(PILLARS_DIR, locale);

  if (!fs.existsSync(localePillarsDir)) {
    // Fallback to 'us' if locale folder doesn't exist
    const fallbackDir = path.join(PILLARS_DIR, "us");
    if (!fs.existsSync(fallbackDir)) {
      return [];
    }
    return getAllPillars("us");
  }

  const files = fs.readdirSync(localePillarsDir);
  const pillars = files
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => {
      const filePath = path.join(localePillarsDir, file);
      const fileContent = fs.readFileSync(filePath, "utf-8");
      const { data, content } = matter(fileContent);

      // Calculate reading time in minutes
      const readTimeResult = readingTime(content);
      const minutes = Math.ceil(readTimeResult.minutes);

      return {
        slug: file.replace(".mdx", ""),
        title: data.title || "Untitled",
        excerpt: data.excerpt || "",
        category: data.category || "General",
        date: data.date || new Date().toISOString().split("T")[0],
        dateModified: data.dateModified,
        readTime: formatReadTime(minutes, locale),
        author: data.author || "Rosey Co. Team",
        image: data.image,
        tags: data.tags || [],
        type: 'pillar',
        clusterPages: data.clusterPages || [],
        relatedPillars: data.relatedPillars || [],
      } as PillarPageMeta;
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return pillars;
}

/**
 * Get full pillar page content including MDX body
 * Falls back from English locales (au, uk, ie) to 'us' if file not found
 * Note: UK has its own Belfast-specific pillars so fallback only triggers if specific file missing
 */
export function getPillarBySlug(slug: string, locale: LocaleCode = "us"): PillarPage | null {
  const localePillarsDir = path.join(PILLARS_DIR, locale);
  const filePath = path.join(localePillarsDir, `${slug}.mdx`);

  if (!fs.existsSync(filePath)) {
    // Fallback logic: English locales (au, uk, ie) fall back to 'us'
    if (["au", "uk", "ie"].includes(locale)) {
      const fallbackPath = path.join(PILLARS_DIR, "us", `${slug}.mdx`);
      if (fs.existsSync(fallbackPath)) {
        return getPillarBySlug(slug, "us");
      }
    }
    return null;
  }

  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(fileContent);

  // Calculate reading time in minutes
  const readTimeResult = readingTime(content);
  const minutes = Math.ceil(readTimeResult.minutes);

  return {
    slug,
    title: data.title || "Untitled",
    excerpt: data.excerpt || "",
    category: data.category || "General",
    date: data.date || new Date().toISOString().split("T")[0],
    dateModified: data.dateModified,
    readTime: formatReadTime(minutes, locale),
    author: data.author || "Rosey Co. Team",
    image: data.image,
    tags: data.tags || [],
    content,
    type: 'pillar',
    clusterPages: data.clusterPages || [],
    relatedPillars: data.relatedPillars || [],
  };
}

/**
 * Get list of pillar slugs for a locale
 * Used by generateStaticParams
 */
export function getPillarSlugs(locale: LocaleCode = "us"): string[] {
  const localePillarsDir = path.join(PILLARS_DIR, locale);

  if (!fs.existsSync(localePillarsDir)) {
    // Fallback to 'us' if locale folder doesn't exist
    const fallbackDir = path.join(PILLARS_DIR, "us");
    if (!fs.existsSync(fallbackDir)) {
      return [];
    }
    return getPillarSlugs("us");
  }

  return fs
    .readdirSync(localePillarsDir)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(".mdx", ""));
}

/**
 * Get related cluster pages metadata from pillar frontmatter
 * Takes array of cluster slugs, returns their blog post metadata
 */
export function getRelatedClusters(clusterSlugs: string[], locale: LocaleCode = "us"): BlogPostMeta[] {
  const clusters: BlogPostMeta[] = [];

  for (const slug of clusterSlugs) {
    const post = getPostBySlug(slug, locale);
    if (post) {
      // Convert BlogPost to BlogPostMeta (exclude content field)
      const { content, ...meta } = post;
      clusters.push(meta);
    }
  }

  return clusters;
}

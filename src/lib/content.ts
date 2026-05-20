// src/lib/content.ts
// Pillar content loading functions for topical authority architecture

import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";
import { LocaleCode } from "./locales";
import { getPostBySlug, BlogPostMeta } from "./blog";

const PILLARS_DIR = path.join(process.cwd(), "src/content/pillars");

export type ContentType = "pillar" | "cluster";

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
  type: "pillar";
  clusterPages: string[];
  relatedPillars?: string[];
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
  type: "pillar";
  clusterPages: string[];
  relatedPillars?: string[];
}

function formatReadTime(minutes: number, locale: LocaleCode): string {
  const readTimeText: Record<LocaleCode, string> = {
    us: "min read",
    au: "min read",
    uk: "min read",
    ie: "min read",
    nl: "min leestijd",
    dk: "min laesning",
    cz: "min cteni",
  };

  return `${minutes} ${readTimeText[locale]}`;
}

export function getAllPillars(locale: LocaleCode = "us"): PillarPageMeta[] {
  const localePillarsDir = path.join(PILLARS_DIR, locale);

  if (!fs.existsSync(localePillarsDir)) {
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
        type: "pillar",
        clusterPages: data.clusterPages || [],
        relatedPillars: data.relatedPillars || [],
      } as PillarPageMeta;
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return pillars;
}

export function getPillarBySlug(slug: string, locale: LocaleCode = "us"): PillarPage | null {
  const localePillarsDir = path.join(PILLARS_DIR, locale);
  const filePath = path.join(localePillarsDir, `${slug}.mdx`);

  if (!fs.existsSync(filePath)) {
    if (["au", "uk", "ie", "cz"].includes(locale)) {
      const fallbackPath = path.join(PILLARS_DIR, "us", `${slug}.mdx`);
      if (fs.existsSync(fallbackPath)) {
        return getPillarBySlug(slug, "us");
      }
    }
    return null;
  }

  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(fileContent);
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
    type: "pillar",
    clusterPages: data.clusterPages || [],
    relatedPillars: data.relatedPillars || [],
  };
}

export function getPillarSlugs(locale: LocaleCode = "us"): string[] {
  const localePillarsDir = path.join(PILLARS_DIR, locale);

  if (!fs.existsSync(localePillarsDir)) {
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

export function getRelatedClusters(clusterSlugs: string[], locale: LocaleCode = "us"): BlogPostMeta[] {
  const clusters: BlogPostMeta[] = [];

  for (const slug of clusterSlugs) {
    const post = getPostBySlug(slug, locale);
    if (post) {
      const { content, ...meta } = post;
      void content;
      clusters.push(meta);
    }
  }

  return clusters;
}

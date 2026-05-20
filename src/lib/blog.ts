import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";
import { LocaleCode } from "./locales";

const BLOG_DIR = path.join(process.cwd(), "src/content/blog");

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  author: string;
  image?: string;
  tags?: string[];
  content: string;
  type?: "standalone" | "cluster";
  pillarSlug?: string;
  relatedClusters?: string[];
}

export interface BlogPostMeta {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  author: string;
  image?: string;
  tags?: string[];
  type?: "standalone" | "cluster";
  pillarSlug?: string;
  relatedClusters?: string[];
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

export function getAllPosts(locale: LocaleCode = "us"): BlogPostMeta[] {
  const localeBlogDir = path.join(BLOG_DIR, locale);

  if (!fs.existsSync(localeBlogDir)) {
    const fallbackDir = path.join(BLOG_DIR, "us");
    if (!fs.existsSync(fallbackDir)) {
      return [];
    }
    return getAllPosts("us");
  }

  const files = fs.readdirSync(localeBlogDir);
  const posts = files
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => {
      const filePath = path.join(localeBlogDir, file);
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
        readTime: formatReadTime(minutes, locale),
        author: data.author || "Rosey Co. Team",
        image: data.image,
        tags: data.tags || [],
        ...(data.type && { type: data.type }),
        ...(data.pillarSlug && { pillarSlug: data.pillarSlug }),
        ...(data.relatedClusters && { relatedClusters: data.relatedClusters }),
      } as BlogPostMeta;
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return posts;
}

export function getPostBySlug(slug: string, locale: LocaleCode = "us"): BlogPost | null {
  const localeBlogDir = path.join(BLOG_DIR, locale);
  const filePath = path.join(localeBlogDir, `${slug}.mdx`);

  if (!fs.existsSync(filePath)) {
    if (["au", "uk", "ie", "cz"].includes(locale)) {
      const fallbackPath = path.join(BLOG_DIR, "us", `${slug}.mdx`);
      if (fs.existsSync(fallbackPath)) {
        return getPostBySlug(slug, "us");
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
    readTime: formatReadTime(minutes, locale),
    author: data.author || "Rosey Co. Team",
    image: data.image,
    tags: data.tags || [],
    content,
    ...(data.type && { type: data.type }),
    ...(data.pillarSlug && { pillarSlug: data.pillarSlug }),
    ...(data.relatedClusters && { relatedClusters: data.relatedClusters }),
  };
}

export function getPostSlugs(locale: LocaleCode = "us"): string[] {
  const localeBlogDir = path.join(BLOG_DIR, locale);

  if (!fs.existsSync(localeBlogDir)) {
    const fallbackDir = path.join(BLOG_DIR, "us");
    if (!fs.existsSync(fallbackDir)) {
      return [];
    }
    return getPostSlugs("us");
  }

  return fs
    .readdirSync(localeBlogDir)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(".mdx", ""));
}

export function getCategories(locale: LocaleCode = "us"): { name: string; count: number }[] {
  const posts = getAllPosts(locale);
  const categoryMap = new Map<string, number>();

  posts.forEach((post) => {
    const count = categoryMap.get(post.category) || 0;
    categoryMap.set(post.category, count + 1);
  });

  return [
    { name: "All", count: posts.length },
    ...Array.from(categoryMap.entries())
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count),
  ];
}

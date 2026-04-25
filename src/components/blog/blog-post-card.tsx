"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import type { BlogPostMeta } from "@/lib/blog";
import type { LocaleCode } from "@/lib/locales";

interface BlogPostCardProps {
  post: BlogPostMeta;
  color: string;
  index: number;
  locale?: LocaleCode;
}

export function BlogPostCard({
  post,
  color,
  index,
  locale,
}: BlogPostCardProps) {
  const blogUrl = locale ? `/${locale}/blog/${post.slug}` : `/blog/${post.slug}`;

  const getDateLocale = (loc?: LocaleCode): string => {
    if (!loc) return "en-US";
    const localeMap: Record<LocaleCode, string> = {
      us: "en-US",
      au: "en-AU",
      uk: "en-GB",
      ie: "en-IE",
      nl: "nl-NL",
      dk: "da-DK",
    };
    return localeMap[loc] || "en-US";
  };

  const formattedDate = new Date(post.date).toLocaleDateString(
    getDateLocale(locale),
    {
      month: "long",
      day: "numeric",
      year: "numeric",
    }
  );

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: (index % 3) * 0.1, duration: 0.5 }}
      whileHover={{ y: -6 }}
      className="bg-white dark:bg-card rounded-md overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 flex flex-col h-full group"
    >
      <Link href={blogUrl} className="block">
        {/* Image */}
        <div className="relative aspect-[16/10] overflow-hidden">
          {post.image ? (
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div
              className="w-full h-full"
              style={{
                background: `linear-gradient(135deg, hsl(var(--${color}) / 0.4), hsl(var(--${color}) / 0.15))`,
              }}
            />
          )}

          {/* Category badge floating */}
          <span className="absolute top-4 left-4 bg-primary text-white px-3 py-1.5 rounded text-[11px] font-semibold uppercase tracking-wider">
            {post.category}
          </span>
        </div>
      </Link>

      {/* Content */}
      <div className="p-6 md:p-7 flex flex-col flex-1">
        {/* Meta */}
        <div className="flex items-center gap-3 text-xs text-foreground/60 mb-3">
          <span>{formattedDate}</span>
          <span className="text-foreground/30">•</span>
          <span>{post.readTime}</span>
        </div>

        {/* Title */}
        <h3 className="text-xl md:text-[1.35rem] font-serif font-medium text-foreground leading-snug mb-3">
          <Link
            href={blogUrl}
            className="hover:text-primary transition-colors duration-300"
          >
            {post.title}
          </Link>
        </h3>

        {/* Excerpt */}
        <p className="text-sm text-foreground/70 leading-relaxed mb-5 flex-1 line-clamp-3">
          {post.excerpt}
        </p>

        {/* Read More */}
        <Link
          href={blogUrl}
          className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:gap-3 transition-all duration-300 mt-auto self-start uppercase tracking-wider"
        >
          Read More
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </motion.article>
  );
}

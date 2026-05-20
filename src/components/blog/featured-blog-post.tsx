// src/components/blog/featured-blog-post.tsx
// Featured blog post with 2-column image + content layout
// Inspired by Raha Resort blog design - clean, editorial, professional

"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import type { BlogPostMeta } from "@/lib/blog";
import type { LocaleCode } from "@/lib/locales";

interface FeaturedBlogPostProps {
  post: BlogPostMeta;
  color?: string;
  locale?: LocaleCode;
}

export function FeaturedBlogPost({
  post,
  color = "primary",
  locale,
}: FeaturedBlogPostProps) {
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
      cz: "cs-CZ",
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
    <section className="py-20 md:py-28 bg-background">
      <div className="container">
        <div className="grid md:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Featured Image */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <Link href={blogUrl} className="block group">
              <div className="relative aspect-[4/5] overflow-hidden rounded-lg shadow-lg">
                {post.image ? (
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority
                  />
                ) : (
                  <div
                    className="w-full h-full"
                    style={{
                      background: `linear-gradient(135deg, hsl(var(--${color}) / 0.4), hsl(var(--${color}) / 0.15))`,
                    }}
                  />
                )}

              </div>
            </Link>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <span className="block text-xs font-semibold tracking-[0.25em] uppercase text-primary mb-4">
              Featured Article
            </span>

            {/* Meta */}
            <div className="flex items-center gap-4 text-sm text-foreground/60 mb-4">
              <span>{formattedDate}</span>
              <span className="text-foreground/30">•</span>
              <span>{post.readTime}</span>
            </div>

            {/* Title */}
            <h2 className="text-3xl md:text-4xl lg:text-[2.5rem] font-serif font-medium text-foreground leading-[1.2] mb-6">
              <Link
                href={blogUrl}
                className="hover:text-primary transition-colors duration-300"
              >
                {post.title}
              </Link>
            </h2>

            {/* Excerpt */}
            <p className="text-base md:text-lg text-foreground/70 leading-relaxed mb-8">
              {post.excerpt}
            </p>

            {/* CTA */}
            <Link
              href={blogUrl}
              className="inline-flex items-center gap-2 px-6 py-3 border-2 border-primary text-primary hover:bg-primary hover:text-white rounded transition-all duration-300 font-semibold text-sm uppercase tracking-wider group"
            >
              Read Full Article
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

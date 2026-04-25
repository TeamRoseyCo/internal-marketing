// src/components/blog/featured-blog-post.tsx
// Featured blog post with image + content side-by-side layout
// Inspired by Raha Resort design pattern

"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Calendar, Clock, ArrowRight } from "lucide-react";
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
    };
    return localeMap[loc] || "en-US";
  };

  const formattedDate = new Date(post.date).toLocaleDateString(
    getDateLocale(locale),
    {
      month: "short",
      day: "numeric",
      year: "numeric",
    }
  );

  return (
    <section className="py-20 md:py-28">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="grid md:grid-cols-2 gap-10 lg:gap-16 items-center"
        >
          {/* Featured Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative group"
          >
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl border border-border/30">
              {post.image ? (
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
              ) : (
                <div
                  className="w-full h-full"
                  style={{
                    background: `linear-gradient(135deg, hsl(var(--${color}) / 0.25), hsl(var(--${color}) / 0.08))`,
                  }}
                />
              )}

              {/* Category Badge */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="absolute top-6 left-6 z-10"
              >
                <span
                  className="inline-flex items-center px-4 py-2 rounded-lg text-xs font-semibold backdrop-blur-sm"
                  style={{
                    backgroundColor: `hsl(var(--${color}) / 0.2)`,
                    color: `hsl(var(--${color}))`,
                    border: `1px solid hsl(var(--${color}) / 0.3)`,
                  }}
                >
                  {post.category}
                </span>
              </motion.div>
            </div>
          </motion.div>

          {/* Featured Content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col justify-center space-y-6"
          >
            {/* Meta */}
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {formattedDate}
              </span>
              <span className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                {post.readTime}
              </span>
            </div>

            {/* Title */}
            <h2 className="text-4xl md:text-5xl font-bold leading-tight">
              <Link
                href={blogUrl}
                className="hover:text-primary transition-colors duration-300"
              >
                {post.title}
              </Link>
            </h2>

            {/* Description */}
            <p className="text-lg text-muted-foreground leading-relaxed">
              {post.excerpt}
            </p>

            {/* CTA Button */}
            <div>
              <Link
                href={blogUrl}
                className="inline-flex items-center gap-2 px-8 py-3 rounded-lg font-semibold text-white bg-gradient-to-r from-primary via-brand-green to-primary hover:shadow-lg hover:shadow-primary/30 transition-all duration-300 group"
              >
                Read Full Article
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

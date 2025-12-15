"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, Clock, Tag } from "lucide-react";
import type { BlogPostMeta } from "@/lib/blog";

interface BlogPostCardProps {
  post: BlogPostMeta;
  color: string;
  index: number;
}

export function BlogPostCard({ post, color, index }: BlogPostCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
    >
      <Link href={`/blog/${post.slug}`} className="block group h-full">
        {/* Glassmorphism card wrapper with gradient border */}
        <div className="rounded-2xl p-px bg-gradient-to-br from-border/50 via-border/20 to-border/50 group-hover:from-primary/30 group-hover:via-border/30 group-hover:to-primary/30 transition-all duration-500 h-full">
          <motion.article
            whileHover={{ y: -4 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="bg-card/60 backdrop-blur-xl rounded-2xl h-full flex flex-col overflow-hidden relative"
          >
            {/* Subtle top highlight for glass effect */}
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

            {/* Image Placeholder with gradient */}
            <div
              className="aspect-video relative"
              style={{
                background: `linear-gradient(135deg, hsl(var(--${color}) / 0.25), hsl(var(--${color}) / 0.08))`,
              }}
            >
              {/* Category tag overlay */}
              <div className="absolute bottom-4 left-4">
                <span
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium backdrop-blur-sm"
                  style={{
                    backgroundColor: `hsl(var(--${color}) / 0.2)`,
                    color: `hsl(var(--${color}))`,
                    border: `1px solid hsl(var(--${color}) / 0.3)`,
                  }}
                >
                  <Tag className="w-3 h-3" />
                  {post.category}
                </span>
              </div>
            </div>

            <div className="p-6 flex flex-col flex-1">
              {/* Title */}
              <h2 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors line-clamp-2">
                {post.title}
              </h2>

              {/* Excerpt */}
              <p className="text-sm text-muted-foreground mb-4 flex-1 line-clamp-3 leading-relaxed">
                {post.excerpt}
              </p>

              {/* Meta */}
              <div className="flex items-center gap-4 text-xs text-muted-foreground pt-4 border-t border-border/30">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" />
                  {new Date(post.date).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  {post.readTime}
                </span>
              </div>
            </div>
          </motion.article>
        </div>
      </Link>
    </motion.div>
  );
}

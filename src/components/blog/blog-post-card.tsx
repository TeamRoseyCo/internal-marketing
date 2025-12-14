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
      <Link href={`/blog/${post.slug}`} className="block group">
        <motion.article
          whileHover={{ y: -4 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="tech-card h-full flex flex-col"
        >
          {/* Image Placeholder */}
          <div
            className="aspect-video rounded-t-lg"
            style={{
              background: `linear-gradient(135deg, hsl(var(--${color}) / 0.2), hsl(var(--${color}) / 0.05))`,
            }}
          />

          <div className="p-6 flex flex-col flex-1">
            {/* Category */}
            <div className="flex items-center gap-2 mb-3">
              <Tag className="w-4 h-4 text-muted-foreground" />
              <span
                className="text-xs font-medium"
                style={{ color: `hsl(var(--${color}))` }}
              >
                {post.category}
              </span>
            </div>

            {/* Title */}
            <h2 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors line-clamp-2">
              {post.title}
            </h2>

            {/* Excerpt */}
            <p className="text-sm text-muted-foreground mb-4 flex-1 line-clamp-3">
              {post.excerpt}
            </p>

            {/* Meta */}
            <div className="flex items-center gap-4 text-xs text-muted-foreground pt-4 border-t border-border/50">
              <span className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {new Date(post.date).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {post.readTime}
              </span>
            </div>
          </div>
        </motion.article>
      </Link>
    </motion.div>
  );
}

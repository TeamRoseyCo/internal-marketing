// src/components/blog/related-articles.tsx
// Displays related blog articles section for internal linking
// Used on service pages to link to relevant blog content

"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface Article {
  slug: string;
  title: string;
  description: string;
  image?: string;
}

interface RelatedArticlesProps {
  title?: string;
  subtitle?: string;
  articles: Article[];
  viewAllHref?: string;
  viewAllText?: string;
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export function RelatedArticles({
  title = "Related Articles",
  subtitle = "Learn more from our blog",
  articles,
  viewAllHref = "/blog",
  viewAllText = "View All Articles",
}: RelatedArticlesProps) {
  if (articles.length === 0) return null;

  return (
    <section className="py-20 md:py-28">
      <div className="container">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl tracking-tight mb-4">
            {title}
          </h2>
          <p className="text-lg text-muted-foreground">{subtitle}</p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {articles.map((article) => (
            <motion.article
              key={article.slug}
              variants={staggerItem}
              transition={{ duration: 0.4 }}
            >
              <Link
                href={`/blog/${article.slug}`}
                className="group block h-full"
              >
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="h-full rounded-2xl border border-border/50 bg-card/30 backdrop-blur-sm overflow-hidden hover:border-primary/30 transition-colors"
                >
                  {article.image && (
                    <div className="relative aspect-video overflow-hidden">
                      <Image
                        src={article.image}
                        alt={article.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                  )}
                  <div className="p-5">
                    <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {article.description}
                    </p>
                  </div>
                </motion.div>
              </Link>
            </motion.article>
          ))}
        </motion.div>

        <motion.div
          className="text-center mt-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <Link
            href={viewAllHref}
            className="inline-flex items-center gap-2 text-primary hover:underline font-medium"
          >
            {viewAllText}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

// Pre-defined article sets for each service
// Image paths must match actual files in /public/images/blog/
export const seoArticles: Article[] = [
  {
    slug: "seo-strategies-for-2025",
    title: "SEO Strategies for 2025: What's Working Now",
    description: "Discover the latest SEO strategies that are driving results in 2025, from E-E-A-T to AI-driven content.",
    image: "/images/blog/blog-tracking-clicks-calls-sales.jpg",
  },
  {
    slug: "google-algorithm-updates-2025",
    title: "Google Algorithm Updates 2025: What You Need to Know",
    description: "Stay ahead of Google's latest algorithm changes and learn how to maintain your rankings.",
    image: "/images/blog/blog-leads-dashboard.jpg",
  },
  {
    slug: "2026-marketing-playbook",
    title: "The 2026 Marketing Playbook",
    description: "A comprehensive guide to marketing strategies that will dominate in 2026.",
    image: "/images/blog/blog-business-systems.jpg",
  },
];

export const paidAdsArticles: Article[] = [
  {
    slug: "how-to-increase-google-ads-roas",
    title: "How to Increase Google Ads ROAS",
    description: "Proven strategies to improve your Google Ads return on ad spend and maximize campaign performance.",
    image: "/images/blog/blog-tracking-roi.jpg",
  },
  {
    slug: "facebook-ads-roi-2025",
    title: "Facebook Ads ROI in 2025",
    description: "Learn how to maximize your Facebook advertising ROI with the latest strategies and tactics.",
    image: "/images/blog/blog-boost-vs-roi-ads.jpg",
  },
  {
    slug: "three-ad-tweaks-save-thousands",
    title: "3 Ad Tweaks That Can Save You Thousands",
    description: "Simple adjustments to your ad campaigns that can dramatically reduce wasted spend.",
    image: "/images/blog/blog-marketing-tracking-roi.jpg",
  },
];

export const socialMediaArticles: Article[] = [
  {
    slug: "social-media-content-that-converts",
    title: "Social Media Content That Converts",
    description: "Create social content that doesn't just get likes, but drives real business results.",
    image: "/images/blog/blog-stop-asking-interested.jpg",
  },
  {
    slug: "boosting-posts-charity-zuckerberg",
    title: "Why Boosting Posts Is Like Donating to Zuckerberg's Charity",
    description: "Learn why boosting posts isn't the best strategy and what to do instead.",
    image: "/images/blog/blog-boost-posts-charity-zuckerberg.jpg",
  },
  {
    slug: "ai-driven-facebook-google-ads-2025",
    title: "AI-Driven Facebook & Google Ads in 2025",
    description: "How AI is transforming paid advertising and what it means for your campaigns.",
    image: "/images/blog/blog-ai-ads-outperforming.jpg",
  },
];

export const websiteDesignArticles: Article[] = [
  {
    slug: "seo-strategies-for-2025",
    title: "SEO Strategies for 2025: What's Working Now",
    description: "Build your website with SEO in mind from day one with these proven strategies.",
    image: "/images/blog/blog-tracking-clicks-calls-sales.jpg",
  },
  {
    slug: "holiday-conversion-triggers-gbp",
    title: "Holiday Conversion Triggers",
    description: "Optimize your website for seasonal conversions and maximize holiday traffic.",
    image: "/images/blog/blog-perfect-followup-psychology.jpg",
  },
  {
    slug: "leads-rot-automation",
    title: "Why Your Leads Rot Without Automation",
    description: "Learn how website automation can capture and nurture leads effectively.",
    image: "/images/blog/blog-leads-rot-5-minutes-automation.jpg",
  },
];

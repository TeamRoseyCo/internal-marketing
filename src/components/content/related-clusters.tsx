// src/components/content/related-clusters.tsx
// Related cluster pages grid display
// Server component showing clickable cards linking to cluster blog posts

import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface RelatedClustersProps {
  clusters: Array<{
    slug: string;
    title: string;
    excerpt: string;
    category: string;
    readTime: string;
  }>;
  locale: string;
}

export function RelatedClusters({ clusters, locale }: RelatedClustersProps) {
  // Return null if no clusters provided
  if (clusters.length === 0) {
    return null;
  }

  return (
    <section className="border-t border-border pt-12">
      <h2 className="text-2xl font-bold mb-8">Related Articles</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {clusters.map((cluster) => (
          <Link
            key={cluster.slug}
            href={`/${locale}/blog/${cluster.slug}/`}
            className="group p-6 border border-border rounded-lg hover:border-primary/50 transition-colors"
          >
            <div className="flex items-start justify-between mb-3">
              <span className="text-xs font-medium text-primary uppercase tracking-wider">
                {cluster.category}
              </span>
              <span className="text-xs text-muted-foreground">
                {cluster.readTime}
              </span>
            </div>
            <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">
              {cluster.title}
            </h3>
            <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
              {cluster.excerpt}
            </p>
            <div className="flex items-center text-sm text-primary">
              <span>Read more</span>
              <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

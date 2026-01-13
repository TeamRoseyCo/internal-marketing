import { getAllPosts, getCategories } from "@/lib/blog";
import { BlogPostCard } from "@/components/blog/blog-post-card";
import { BlogHero } from "@/components/blog/blog-hero";
import { BlogCategories } from "@/components/blog/blog-categories";
import { NewsletterCTA } from "@/components/blog/newsletter-cta";

// Force static generation with ISR (revalidate every hour)
export const dynamic = 'force-static';
export const revalidate = 3600; // Rebuild every 1 hour

export const metadata = {
  title: "Blog - Marketing Insights & Strategies",
  description:
    "Actionable tips, strategies, and insights to help you grow your business through digital marketing.",
};

export default function BlogPage() {
  const posts = getAllPosts("us");
  const categories = getCategories("us");

  // Map category to color
  const categoryColors: Record<string, string> = {
    "Paid Advertising": "brand-rose",
    SEO: "brand-green",
    "Social Media": "brand-forest",
    "Website Design": "brand-green",
    General: "primary",
  };

  return (
    <>
      {/* Hero Section */}
      <BlogHero />

      {/* Categories */}
      <BlogCategories categories={categories} />

      {/* Blog Posts Grid */}
      <section className="py-24 md:py-32">
        <div className="container">
          {posts.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post, index) => (
                <BlogPostCard
                  key={post.slug}
                  post={post}
                  color={categoryColors[post.category] || "primary"}
                  index={index}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground mb-4">
                No posts yet. Check back soon!
              </p>
            </div>
          )}

          {/* Coming Soon */}
          <div className="text-center mt-12">
            <p className="text-muted-foreground">More articles coming soon...</p>
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <NewsletterCTA />
    </>
  );
}

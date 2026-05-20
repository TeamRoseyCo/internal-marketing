import { getAllPosts } from "@/lib/blog";
import { BlogPostCard } from "@/components/blog/blog-post-card";
import { BlogHero } from "@/components/blog/blog-hero";
import { BlogIntro } from "@/components/blog/blog-intro";
import { FeaturedBlogPost } from "@/components/blog/featured-blog-post";
import { NewsletterCTA } from "@/components/blog/newsletter-cta";

export const metadata = {
  title: "Blog - Marketing Insights & Strategies",
  description:
    "Actionable tips, strategies, and insights to help you grow your business through digital marketing.",
};

export default async function BlogPage() {
  const allPosts = getAllPosts("us");

  const featuredPost = allPosts.length > 0 ? allPosts[0] : null;
  const remainingPosts = allPosts.length > 1 ? allPosts.slice(1) : [];

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

      {/* Blog Intro */}
      <BlogIntro
        subtitle="Stories & Strategies"
        title="Marketing Insights & Strategies"
        description="Explore actionable tips, proven strategies, and data-driven insights to help you grow your business through digital marketing, SEO, social media, and paid advertising."
      />

      {/* Featured Blog Post */}
      {featuredPost && (
        <FeaturedBlogPost
          post={featuredPost}
          color={categoryColors[featuredPost.category] || "primary"}
        />
      )}

      {/* Blog Posts Grid */}
      <section className="py-20 md:py-28 bg-[#f8f6f3] dark:bg-[#0f0f12]">
        <div className="container">
          {remainingPosts.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
              {remainingPosts.map((post, index) => (
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
              <p className="text-foreground/60 mb-4">
                No posts yet. Check back soon!
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter CTA */}
      <NewsletterCTA />
    </>
  );
}

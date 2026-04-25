// src/app/[locale]/blog/page.tsx
// Locale-aware blog listing page
// Displays all blog posts with translated UI elements

import { Metadata } from "next";
import { getAllPosts, getCategories } from "@/lib/blog";
import { BlogPostCard } from "@/components/blog/blog-post-card";
import { BlogIntro } from "@/components/blog/blog-intro";
import { FeaturedBlogPost } from "@/components/blog/featured-blog-post";
import { localeList, isValidLocale } from "@/lib/locales";
import { getBlogPageTranslations } from "@/lib/page-translations";
import { LocaleBlogHero } from "@/components/blog/locale-blog-hero";
import { LocaleBlogCategories } from "@/components/blog/locale-blog-categories";
import { LocaleNewsletterCTA } from "@/components/blog/locale-newsletter-cta";
import { generateHreflangAlternates, getOpenGraphLocale } from "@/lib/seo";

// Force dynamic rendering to support search params filtering
export const dynamic = 'force-dynamic';

export async function generateStaticParams() {
  return localeList.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const localeCode = isValidLocale(locale) ? locale : "us";
  const t = getBlogPageTranslations(localeCode);

  return {
    title: t.meta.title,
    description: t.meta.description,
    openGraph: {
      locale: getOpenGraphLocale(localeCode),
    },
    alternates: generateHreflangAlternates(localeCode, '/blog'),
  };
}

export default async function LocaleBlogPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ category?: string }>;
}) {
  const { locale } = await params;
  const { category } = await searchParams;
  const localeCode = isValidLocale(locale) ? locale : "us";
  const t = getBlogPageTranslations(localeCode);

  const allPosts = getAllPosts(localeCode);
  const categories = getCategories(localeCode);

  // Filter posts by category if specified
  const posts = category
    ? allPosts.filter((post) => post.category === category)
    : allPosts;

  // Featured post is first one (only when no category filter)
  const featuredPost = !category && posts.length > 0 ? posts[0] : null;
  const remainingPosts = !category && posts.length > 1 ? posts.slice(1) : posts;

  // Map category to color
  const categoryColors: Record<string, string> = {
    "Paid Advertising": "brand-rose",
    SEO: "brand-green",
    "Social Media": "brand-forest",
    "Website Design": "brand-green",
    "AI Marketing": "brand-green",
    "Case Studies": "brand-forest",
    "Marketing Strategy": "brand-rose",
    General: "primary",
  };

  return (
    <>
      <LocaleBlogHero translations={t.hero} />

      <BlogIntro
        subtitle="No Fluff. Just Wins."
        title="Marketing Playbooks That Actually Work"
        description="We don't write theory. We write the exact systems we use to fill calendars, drive bookings, and turn locals into paying customers — every single month."
      />

      {featuredPost && (
        <FeaturedBlogPost
          post={featuredPost}
          color={categoryColors[featuredPost.category] || "primary"}
          locale={localeCode}
        />
      )}

      <LocaleBlogCategories
        categories={categories}
        translations={t.categories}
        locale={localeCode}
      />

      {/* Blog Posts Grid */}
      <section className="py-20 md:py-28 bg-[#f8f6f3]">
        <div className="container">
          {remainingPosts.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
              {remainingPosts.map((post, index) => (
                <BlogPostCard
                  key={post.slug}
                  post={post}
                  color={categoryColors[post.category] || "primary"}
                  index={index}
                  locale={localeCode}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-[#6e6e73] mb-4">{t.posts.noPosts}</p>
            </div>
          )}

          <div className="text-center mt-12">
            <p className="text-[#6e6e73]">{t.posts.moreComing}</p>
          </div>
        </div>
      </section>

      <LocaleNewsletterCTA translations={t.newsletter} />
    </>
  );
}

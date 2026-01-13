// src/app/[locale]/blog/page.tsx
// Locale-aware blog listing page
// Displays all blog posts with translated UI elements

import { Metadata } from "next";
import { getAllPosts, getCategories } from "@/lib/blog";
import { BlogPostCard } from "@/components/blog/blog-post-card";
import { localeList, LocaleCode, isValidLocale } from "@/lib/locales";
import { getBlogPageTranslations } from "@/lib/page-translations";
import { LocaleBlogHero } from "@/components/blog/locale-blog-hero";
import { LocaleBlogCategories } from "@/components/blog/locale-blog-categories";
import { LocaleNewsletterCTA } from "@/components/blog/locale-newsletter-cta";

// Force static generation with ISR (revalidate every hour)
export const dynamic = 'force-static';
export const revalidate = 3600; // Rebuild every 1 hour

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
      {/* Hero Section */}
      <LocaleBlogHero translations={t.hero} />

      {/* Categories */}
      <LocaleBlogCategories
        categories={categories}
        translations={t.categories}
        locale={localeCode}
      />

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
                  locale={localeCode}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground mb-4">
                {t.posts.noPosts}
              </p>
            </div>
          )}

          {/* Coming Soon */}
          <div className="text-center mt-12">
            <p className="text-muted-foreground">{t.posts.moreComing}</p>
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <LocaleNewsletterCTA translations={t.newsletter} />
    </>
  );
}

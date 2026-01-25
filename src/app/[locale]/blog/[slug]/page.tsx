// src/app/[locale]/blog/[slug]/page.tsx
// Locale-aware individual blog post page
// Displays blog post content with translated UI elements

import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Calendar, Clock, Tag, User } from "lucide-react";
import { getPostBySlug, getPostSlugs } from "@/lib/blog";
import { MDXRemote } from "next-mdx-remote/rsc";
import { mdxComponents } from "@/components/mdx/mdx-components";
import { localeList, LocaleCode, isValidLocale } from "@/lib/locales";
import { getBlogPageTranslations } from "@/lib/page-translations";
import { ArticleStructuredData } from "@/components/seo/structured-data";
import { generateHreflangAlternates, getOpenGraphLocale } from "@/lib/seo";

export async function generateStaticParams() {
  const params: { locale: string; slug: string }[] = [];

  for (const locale of localeList) {
    const slugs = getPostSlugs(locale);
    for (const slug of slugs) {
      params.push({ locale, slug });
    }
  }

  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const localeCode = isValidLocale(locale) ? locale : "us";
  const post = getPostBySlug(slug, localeCode);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
      locale: getOpenGraphLocale(localeCode),
    },
    alternates: generateHreflangAlternates(localeCode, `/blog/${slug}`),
  };
}

export default async function LocaleBlogPostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const localeCode = isValidLocale(locale) ? locale : "us";
  const t = getBlogPageTranslations(localeCode);

  const post = getPostBySlug(slug, localeCode);

  if (!post) {
    notFound();
  }

  // Map category to color
  const categoryColors: Record<string, string> = {
    "Paid Advertising": "brand-rose",
    SEO: "brand-green",
    "Social Media": "brand-forest",
    "Website Design": "brand-green",
    General: "primary",
  };
  const color = categoryColors[post.category] || "primary";

  // Get date locale string based on locale
  const getDateLocale = (locale: LocaleCode): string => {
    const localeMap: Record<LocaleCode, string> = {
      us: "en-US",
      au: "en-AU",
      uk: "en-GB",
      ie: "en-IE",
      nl: "nl-NL",
      dk: "da-DK",
    };
    return localeMap[locale] || "en-US";
  };

  return (
    <>
      {/* Article Structured Data */}
      <ArticleStructuredData
        locale={localeCode}
        title={post.title}
        description={post.excerpt}
        author={post.author}
        datePublished={post.date}
        image={post.image}
        slug={slug}
      />

      {/* Hero Section */}
      <section className="relative bg-hero-surface overflow-hidden">
        <div className="container py-24 md:py-32">
          <div className="max-w-3xl mx-auto">
            {/* Back Link */}
            <Link
              href={`/${localeCode}/blog`}
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              {t.post.backToBlog}
            </Link>

            {/* Category */}
            <div className="flex items-center gap-2 mb-4">
              <Tag className="w-4 h-4 text-muted-foreground" />
              <span
                className="text-sm font-medium tracking-wider uppercase"
                style={{ color: `hsl(var(--${color}))` }}
              >
                {post.category}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl tracking-tight mb-8 leading-[1.1]">
              {post.title}
            </h1>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
              <span className="flex items-center gap-2">
                <User className="w-4 h-4" />
                {post.author}
              </span>
              <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {new Date(post.date).toLocaleDateString(getDateLocale(localeCode), {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
              <span className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                {post.readTime}
              </span>
            </div>
          </div>
        </div>

        {/* Gradient fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-background pointer-events-none" />
      </section>

      {/* Content */}
      <section className="py-24 md:py-32">
        <div className="container">
          <article className="max-w-3xl mx-auto">
            {/* Featured Image */}
            {post.image && (
              <div className="relative aspect-video mb-12 rounded-2xl overflow-hidden">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 100vw, 896px"
                />
              </div>
            )}

            <div className="tech-card p-8 md:p-12">
              <MDXRemote source={post.content} components={mdxComponents} />
            </div>

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="mt-8 flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 text-xs rounded-full bg-muted text-muted-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Share / CTA */}
            <div className="mt-12 p-8 tech-card text-center">
              <h3 className="text-xl font-bold mb-4">
                {t.post.ctaTitle}
              </h3>
              <p className="text-muted-foreground mb-6">
                {t.post.ctaSubtitle}
              </p>
              <Link
                href={`/${localeCode}/contact`}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold btn-hero"
              >
                {t.post.ctaButton}
              </Link>
            </div>

            {/* Back to Blog */}
            <div className="mt-8 text-center">
              <Link
                href={`/${localeCode}/blog`}
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                {t.post.backToAll}
              </Link>
            </div>
          </article>
        </div>
      </section>
    </>
  );
}

// src/app/[locale]/[pillarSlug]/page.tsx
// Dynamic pillar page route for topical authority content
// Renders pillar pages with breadcrumbs, TOC, MDX content, and related clusters

import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Calendar, Clock, Tag, User } from "lucide-react";
import { getPillarBySlug, getPillarSlugs, getRelatedClusters } from "@/lib/content";
import { MDXRemote } from "next-mdx-remote/rsc";
import { mdxComponents } from "@/components/mdx/mdx-components";
import { localeList, LocaleCode, isValidLocale } from "@/lib/locales";
import { generateHreflangAlternates, getOpenGraphLocale } from "@/lib/seo";
import { PillarPageSchema } from "@/components/seo/pillar-schema";
import { BreadcrumbSchema } from "@/components/seo/breadcrumb-schema";
import { Breadcrumbs } from "@/components/navigation/breadcrumbs";
import { TableOfContents } from "@/components/content/table-of-contents";
import { RelatedClusters } from "@/components/content/related-clusters";

export async function generateStaticParams() {
  const params: { locale: string; pillarSlug: string }[] = [];

  for (const locale of localeList) {
    const slugs = getPillarSlugs(locale);
    for (const slug of slugs) {
      params.push({ locale, pillarSlug: slug });
    }
  }

  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; pillarSlug: string }>;
}) {
  const { locale, pillarSlug } = await params;
  const localeCode = isValidLocale(locale) ? locale : "us";
  const pillar = getPillarBySlug(pillarSlug, localeCode);

  if (!pillar) {
    return {
      title: "Not Found",
    };
  }

  return {
    title: pillar.title,
    description: pillar.excerpt,
    openGraph: {
      title: pillar.title,
      description: pillar.excerpt,
      type: "article",
      publishedTime: pillar.date,
      modifiedTime: pillar.dateModified || pillar.date,
      authors: [pillar.author],
      locale: getOpenGraphLocale(localeCode),
    },
    alternates: generateHreflangAlternates(localeCode, `/${pillarSlug}`),
  };
}

export default async function PillarPage({
  params,
}: {
  params: Promise<{ locale: string; pillarSlug: string }>;
}) {
  const { locale, pillarSlug } = await params;
  const localeCode = isValidLocale(locale) ? locale : "us";

  const pillar = getPillarBySlug(pillarSlug, localeCode);

  if (!pillar) {
    notFound();
  }

  // Load related cluster pages
  const clusters = getRelatedClusters(pillar.clusterPages, localeCode);

  // Map category to color
  const categoryColors: Record<string, string> = {
    "Paid Advertising": "brand-rose",
    SEO: "brand-green",
    "Social Media": "brand-forest",
    "Website Design": "brand-green",
    General: "primary",
  };
  const color = categoryColors[pillar.category] || "primary";

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

  // Breadcrumb items
  const breadcrumbItems = [
    { name: "Home", url: `/${localeCode}/` },
    { name: pillar.title, url: `/${localeCode}/${pillarSlug}/` },
  ];

  return (
    <>
      {/* Pillar Page Schema */}
      <PillarPageSchema
        title={pillar.title}
        description={pillar.excerpt}
        author={pillar.author}
        datePublished={pillar.date}
        dateModified={pillar.dateModified || pillar.date}
        clusterPages={pillar.clusterPages}
        locale={localeCode}
        pillarSlug={pillarSlug}
        image={pillar.image}
      />

      {/* Breadcrumb Schema */}
      <BreadcrumbSchema items={breadcrumbItems} />

      {/* Hero Section */}
      <section className="relative bg-hero-surface overflow-hidden">
        <div className="container py-24 md:py-32">
          <div className="max-w-3xl mx-auto">
            {/* Breadcrumbs */}
            <Breadcrumbs items={breadcrumbItems} />

            {/* Category */}
            <div className="flex items-center gap-2 mb-4">
              <Tag className="w-4 h-4 text-muted-foreground" />
              <span
                className="text-sm font-medium tracking-wider uppercase"
                style={{ color: `hsl(var(--${color}))` }}
              >
                {pillar.category}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl tracking-tight mb-8 leading-[1.1]">
              {pillar.title}
            </h1>

            {/* Excerpt */}
            {pillar.excerpt && (
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                {pillar.excerpt}
              </p>
            )}

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
              <span className="flex items-center gap-2">
                <User className="w-4 h-4" />
                {pillar.author}
              </span>
              <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {new Date(pillar.date).toLocaleDateString(getDateLocale(localeCode), {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
              <span className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                {pillar.readTime}
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
            {pillar.image && (
              <div className="relative aspect-video mb-12 rounded-2xl overflow-hidden">
                <Image
                  src={pillar.image}
                  alt={pillar.title}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 100vw, 896px"
                />
              </div>
            )}

            {/* Table of Contents */}
            <TableOfContents content={pillar.content} />

            {/* MDX Content */}
            <div className="tech-card p-8 md:p-12">
              <MDXRemote source={pillar.content} components={mdxComponents} />
            </div>

            {/* Tags */}
            {pillar.tags && pillar.tags.length > 0 && (
              <div className="mt-8 flex flex-wrap gap-2">
                {pillar.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 text-xs rounded-full bg-muted text-muted-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Related Clusters */}
            {clusters.length > 0 && (
              <div className="mt-12">
                <RelatedClusters clusters={clusters} locale={localeCode} />
              </div>
            )}

            {/* CTA */}
            <div className="mt-12 p-8 tech-card text-center">
              <h3 className="text-xl font-bold mb-4">
                Ready to grow your business?
              </h3>
              <p className="text-muted-foreground mb-6">
                Let's discuss how we can help you achieve your goals.
              </p>
              <Link
                href={`/${localeCode}/contact`}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold btn-hero"
              >
                Get Started
              </Link>
            </div>
          </article>
        </div>
      </section>
    </>
  );
}

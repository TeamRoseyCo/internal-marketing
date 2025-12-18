import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Calendar, Clock, Tag, User } from "lucide-react";
import { getPostBySlug, getPostSlugs } from "@/lib/blog";
import { MDXRemote } from "next-mdx-remote/rsc";
import { useMDXComponents } from "@/components/mdx/mdx-components";

export async function generateStaticParams() {
  const slugs = getPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

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
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const components = useMDXComponents({});

  // Map category to color
  const categoryColors: Record<string, string> = {
    "Paid Advertising": "brand-magenta",
    SEO: "brand-cyan",
    "Social Media": "brand-purple",
    "Website Design": "brand-cyan",
    General: "primary",
  };
  const color = categoryColors[post.category] || "primary";

  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-hero-surface overflow-hidden">
        <div className="container py-24 md:py-32">
          <div className="max-w-3xl mx-auto">
            {/* Back Link */}
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Blog
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
                {new Date(post.date).toLocaleDateString("en-US", {
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
              <MDXRemote source={post.content} components={components} />
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
                Want Results Like These?
              </h3>
              <p className="text-muted-foreground mb-6">
                Book a free strategy call and discover how we can help grow your
                business.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold btn-hero"
              >
                Get Your Free Strategy Call
              </Link>
            </div>

            {/* Back to Blog */}
            <div className="mt-8 text-center">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to All Articles
              </Link>
            </div>
          </article>
        </div>
      </section>
    </>
  );
}

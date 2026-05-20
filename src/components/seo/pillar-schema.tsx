"use client";

// src/components/seo/pillar-schema.tsx
// JSON-LD schemas for pillar-cluster topical authority architecture
// PillarPageSchema: Article with hasPart linking to all cluster pages
// ClusterArticleSchema: Article with isPartOf linking back to parent pillar
// Uses "use client" to work in both server and client components

const BASE_URL = "https://roseyco.com";

// Type definitions for pillar-cluster schemas
interface PillarPageSchemaProps {
  title: string;
  description: string;
  author: string;
  datePublished: string;
  dateModified: string;
  clusterPages: string[];  // Slugs of cluster blog posts
  locale: string;
  pillarSlug: string;
  image?: string;
}

interface ClusterArticleSchemaProps {
  title: string;
  description: string;
  author: string;
  datePublished: string;
  dateModified?: string;
  pillarSlug: string;  // Parent pillar slug
  locale: string;
  slug: string;
  image?: string;
}

interface PillarArticleSchema {
  "@context": "https://schema.org";
  "@type": "Article";
  "@id": string;
  headline: string;
  description: string;
  author: {
    "@type": "Person" | "Organization";
    name: string;
  };
  publisher: {
    "@type": "Organization";
    name: string;
    logo: {
      "@type": "ImageObject";
      url: string;
    };
  };
  datePublished: string;
  dateModified: string;
  mainEntityOfPage: {
    "@type": "WebPage";
    "@id": string;
  };
  hasPart: {
    "@type": "Article";
    url: string;
  }[];
  image?: string;
}

interface ClusterArticleSchema {
  "@context": "https://schema.org";
  "@type": "Article";
  headline: string;
  description: string;
  author: {
    "@type": "Person" | "Organization";
    name: string;
  };
  publisher: {
    "@type": "Organization";
    name: string;
    logo: {
      "@type": "ImageObject";
      url: string;
    };
  };
  datePublished: string;
  dateModified: string;
  mainEntityOfPage: {
    "@type": "WebPage";
    "@id": string;
  };
  isPartOf: {
    "@type": "Article";
    "@id": string;
  };
  image?: string;
}

// Helper to render JSON-LD script tag
function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

// PillarPageSchema - Used on pillar pages
// Generates Article schema with hasPart linking to all cluster pages
export function PillarPageSchema({
  title,
  description,
  author,
  datePublished,
  dateModified,
  clusterPages,
  locale,
  pillarSlug,
  image,
}: PillarPageSchemaProps) {
  const schema: PillarArticleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${BASE_URL}/${locale}/${pillarSlug}/#article`,
    headline: title,
    description: description,
    author: {
      "@type": author === "Rosey Co. Team" ? "Organization" : "Person",
      name: author,
    },
    publisher: {
      "@type": "Organization",
      name: "Rosey Co.",
      logo: {
        "@type": "ImageObject",
        url: `${BASE_URL}/images/logo.png`,
      },
    },
    datePublished: datePublished,
    dateModified: dateModified,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${BASE_URL}/${locale}/${pillarSlug}/`,
    },
    hasPart: clusterPages.map((slug) => ({
      "@type": "Article",
      url: `${BASE_URL}/${locale}/blog/${slug}/`,
    })),
    ...(image && { image: `${BASE_URL}${image}` }),
  };

  return <JsonLd data={schema} />;
}

// ClusterArticleSchema - Used on blog/cluster pages
// Generates Article schema with isPartOf linking back to parent pillar
export function ClusterArticleSchema({
  title,
  description,
  author,
  datePublished,
  dateModified,
  pillarSlug,
  locale,
  slug,
  image,
}: ClusterArticleSchemaProps) {
  const schema: ClusterArticleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description: description,
    author: {
      "@type": author === "Rosey Co. Team" ? "Organization" : "Person",
      name: author,
    },
    publisher: {
      "@type": "Organization",
      name: "Rosey Co.",
      logo: {
        "@type": "ImageObject",
        url: `${BASE_URL}/images/logo.png`,
      },
    },
    datePublished: datePublished,
    dateModified: dateModified || datePublished,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${BASE_URL}/${locale}/blog/${slug}/`,
    },
    isPartOf: {
      "@type": "Article",
      "@id": `${BASE_URL}/${locale}/${pillarSlug}/#article`,
    },
    ...(image && { image: `${BASE_URL}${image}` }),
  };

  return <JsonLd data={schema} />;
}

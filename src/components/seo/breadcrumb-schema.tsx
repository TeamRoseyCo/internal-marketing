"use client";

// src/components/seo/breadcrumb-schema.tsx
// JSON-LD BreadcrumbList schema for content hierarchy
// Shows navigation path (Home > Pillar > Cluster) to search engines
// Uses "use client" to work in both server and client components

const BASE_URL = "https://roseyco.com";

interface BreadcrumbSchemaProps {
  items: Array<{ name: string; url: string }>;
}

interface BreadcrumbListSchema {
  "@context": "https://schema.org";
  "@type": "BreadcrumbList";
  itemListElement: {
    "@type": "ListItem";
    position: number;
    name: string;
    item: string;
  }[];
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

// BreadcrumbSchema - Generates BreadcrumbList JSON-LD
export function BreadcrumbSchema({ items }: BreadcrumbSchemaProps) {
  const schema: BreadcrumbListSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url.startsWith("http") ? item.url : `${BASE_URL}${item.url}`,
    })),
  };

  return <JsonLd data={schema} />;
}

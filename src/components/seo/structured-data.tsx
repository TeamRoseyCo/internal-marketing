"use client";

// src/components/seo/structured-data.tsx
// JSON-LD structured data components for SEO
// Implements Organization, WebSite, LocalBusiness, Service, and Article schemas
// Uses "use client" to work in both server and client components

import { LocaleCode, locales } from "@/lib/locales";

const BASE_URL = "https://roseyco.com";

// Type definitions for JSON-LD schemas
interface OrganizationSchema {
  "@context": "https://schema.org";
  "@type": "Organization";
  name: string;
  url: string;
  logo: string;
  description: string;
  sameAs: string[];
  contactPoint: {
    "@type": "ContactPoint";
    contactType: string;
    availableLanguage: string[];
  };
}

interface WebSiteSchema {
  "@context": "https://schema.org";
  "@type": "WebSite";
  name: string;
  url: string;
  description: string;
  publisher: {
    "@type": "Organization";
    name: string;
    logo: string;
  };
  potentialAction: {
    "@type": "SearchAction";
    target: string;
    "query-input": string;
  };
}

interface LocalBusinessSchema {
  "@context": "https://schema.org";
  "@type": "LocalBusiness";
  "@id": string;
  name: string;
  description: string;
  url: string;
  telephone: string;
  address: {
    "@type": "PostalAddress";
    streetAddress?: string;
    addressLocality: string;
    addressRegion?: string;
    postalCode?: string;
    addressCountry: string;
  };
  geo?: {
    "@type": "GeoCoordinates";
    latitude: number;
    longitude: number;
  };
  priceRange: string;
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification";
    dayOfWeek: string[];
    opens: string;
    closes: string;
  };
  // Using any for areaServed to support both single Country and array of City/AdministrativeArea/Country
  // This is intentional to support enhanced Belfast city-level targeting without complex union types
  areaServed: any;
  serviceType: string[];
}

interface ServiceSchema {
  "@context": "https://schema.org";
  "@type": "Service";
  name: string;
  description: string;
  provider: {
    "@type": "Organization";
    name: string;
    url: string;
  };
  serviceType: string;
  areaServed: string[];
  url: string;
}

interface ArticleSchema {
  "@context": "https://schema.org";
  "@type": "Article";
  headline: string;
  description: string;
  image?: string;
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
}

interface FAQSchema {
  "@context": "https://schema.org";
  "@type": "FAQPage";
  mainEntity: {
    "@type": "Question";
    name: string;
    acceptedAnswer: {
      "@type": "Answer";
      text: string;
    };
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

// Organization Schema - Global company info
export function OrganizationStructuredData() {
  const schema: OrganizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Rosey Co.",
    url: BASE_URL,
    logo: `${BASE_URL}/images/logo.png`,
    description:
      "Rosey Co. is a global social media marketing agency specializing in SEO, social media management, and paid advertising.",
    sameAs: [
      "https://www.instagram.com/roseyco",
      "https://www.linkedin.com/company/roseyco",
      "https://twitter.com/roseyco",
      "https://www.facebook.com/roseyco",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      availableLanguage: ["English", "Dutch", "Danish"],
    },
  };

  return <JsonLd data={schema} />;
}

// WebSite Schema - Site-wide search and info
export function WebSiteStructuredData() {
  const schema: WebSiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Rosey Co.",
    url: BASE_URL,
    description:
      "Global social media marketing agency specializing in SEO, social media management, and paid advertising.",
    publisher: {
      "@type": "Organization",
      name: "Rosey Co.",
      logo: `${BASE_URL}/images/logo.png`,
    },
    potentialAction: {
      "@type": "SearchAction",
      target: `${BASE_URL}/blog?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  return <JsonLd data={schema} />;
}

// LocalBusiness Schema - Per locale
export function LocalBusinessStructuredData({
  locale,
}: {
  locale: LocaleCode;
}) {
  const config = locales[locale];

  // Belfast locales (UK/IE) get enhanced city-level targeting
  const isBelfastLocale = locale === 'uk' || locale === 'ie';

  const schema: LocalBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": isBelfastLocale
      ? `${BASE_URL}/${locale}#belfast-office`
      : `${BASE_URL}/${locale}`,
    name: `Rosey Co. ${config.country}`,
    description: getLocalizedDescription(locale),
    url: `${BASE_URL}/${locale}`,
    telephone: config.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: config.streetAddress,
      addressLocality: config.addressLocality,
      addressRegion: config.addressRegion,
      postalCode: config.postalCode,
      addressCountry: config.countryCode,
    },
    // Add geo coordinates when available (Belfast locales)
    ...(config.geo && {
      geo: {
        "@type": "GeoCoordinates",
        latitude: config.geo.latitude,
        longitude: config.geo.longitude,
      },
    }),
    priceRange: "$$",
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "17:00",
    },
    // Belfast locales get city-level areaServed, others get Country only
    areaServed: isBelfastLocale
      ? [
          { "@type": "City", name: "Belfast" },
          { "@type": "AdministrativeArea", name: "Northern Ireland" },
          { "@type": "Country", name: "United Kingdom" },
        ]
      : {
          "@type": "Country",
          name: config.country,
        },
    serviceType: [
      "SEO Services",
      "Social Media Management",
      "Paid Advertising",
      "Website Design",
    ],
  };

  return <JsonLd data={schema} />;
}

// Service Schema - For service pages
export function ServiceStructuredData({
  locale,
  service,
}: {
  locale: LocaleCode;
  service: "seo" | "social-media" | "paid-ads" | "website-design";
}) {
  const config = locales[locale];
  const serviceInfo = getServiceInfo(service, locale);

  const schema: ServiceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: serviceInfo.name,
    description: serviceInfo.description,
    provider: {
      "@type": "Organization",
      name: "Rosey Co.",
      url: BASE_URL,
    },
    serviceType: serviceInfo.type,
    areaServed: [config.country],
    url: `${BASE_URL}/${locale}/services/${service}`,
  };

  return <JsonLd data={schema} />;
}

// Article Schema - For blog posts
export function ArticleStructuredData({
  locale,
  title,
  description,
  author,
  datePublished,
  dateModified,
  image,
  slug,
}: {
  locale: LocaleCode;
  title: string;
  description: string;
  author: string;
  datePublished: string;
  dateModified?: string;
  image?: string;
  slug: string;
}) {
  const schema: ArticleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description: description,
    image: image ? `${BASE_URL}${image}` : undefined,
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
      "@id": `${BASE_URL}/${locale}/blog/${slug}`,
    },
  };

  return <JsonLd data={schema} />;
}

// FAQ Schema - For pages with FAQs
export function FAQStructuredData({
  questions,
}: {
  questions: { question: string; answer: string }[];
}) {
  const schema: FAQSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: questions.map((q) => ({
      "@type": "Question",
      name: q.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: q.answer,
      },
    })),
  };

  return <JsonLd data={schema} />;
}

// Helper: Get localized description based on locale
function getLocalizedDescription(locale: LocaleCode): string {
  const descriptions: Record<LocaleCode, string> = {
    us: "Rosey Co. is a social media marketing agency in the United States specializing in SEO, social media management, and paid advertising.",
    nl: "Rosey Co. is een social media marketing bureau in Nederland, gespecialiseerd in SEO, social media beheer en betaalde advertenties.",
    dk: "Rosey Co. er et social media marketing bureau i Danmark, specialiseret i SEO, social media styring og betalte annoncer.",
    au: "Rosey Co. is a social media marketing agency in Australia specialising in SEO, social media management, and paid advertising.",
    uk: "Rosey Co. is a social media marketing agency in the United Kingdom specialising in SEO, social media management, and paid advertising.",
    ie: "Rosey Co. is a social media marketing agency in Ireland specialising in SEO, social media management, and paid advertising.",
  };
  return descriptions[locale];
}

// Helper: Get service info based on service type and locale
function getServiceInfo(
  service: "seo" | "social-media" | "paid-ads" | "website-design",
  locale: LocaleCode
): { name: string; description: string; type: string } {
  const config = locales[locale];

  const services = {
    seo: {
      name: `SEO Services - ${config.country}`,
      description: `Professional SEO services in ${config.country}. We help businesses rank higher on Google and drive organic traffic through proven search engine optimization strategies.`,
      type: "Search Engine Optimization",
    },
    "social-media": {
      name: `Social Media Management - ${config.country}`,
      description: `Expert social media management services in ${config.country}. We create engaging content, grow your following, and turn followers into customers.`,
      type: "Social Media Marketing",
    },
    "paid-ads": {
      name: `Paid Advertising - ${config.country}`,
      description: `Results-driven paid advertising services in ${config.country}. We manage Google Ads and Meta Ads campaigns that deliver high ROAS.`,
      type: "Digital Advertising",
    },
    "website-design": {
      name: `Website Design - ${config.country}`,
      description: `Professional website design services in ${config.country}. We create modern, fast, and conversion-optimized websites.`,
      type: "Web Design",
    },
  };

  return services[service];
}

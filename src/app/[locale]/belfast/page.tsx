// src/app/[locale]/belfast/page.tsx
// Belfast location landing page for UK locale only
// Serves as hub for Belfast office information, map, and Belfast service pages

import { notFound } from "next/navigation";
import Link from "next/link";
import { MapPin, Phone, Clock, Mail, Search, Share2, CreditCard, Palette, ArrowRight } from "lucide-react";
import { isValidLocale, LocaleCode } from "@/lib/locales";
import { generateHreflangAlternates, getOpenGraphLocale } from "@/lib/seo";
import { LocalBusinessStructuredData } from "@/components/seo/structured-data";
import { FAQStructuredData } from "@/components/seo/structured-data";

// Only generate for UK locale
export async function generateStaticParams() {
  return [{ locale: "uk" }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const localeCode = isValidLocale(locale) ? locale : "us";

  // Belfast page only exists for UK locale
  if (localeCode !== "uk") {
    return {
      title: "Not Found",
    };
  }

  return {
    title: "Rosey Co. Belfast | Digital Marketing Agency Belfast, Northern Ireland",
    description:
      "Visit Rosey Co. in Belfast, Northern Ireland. Expert SEO, social media marketing, paid ads, and website design services for Belfast businesses. 1 Hollycroft Avenue, Belfast BT5 5JE.",
    openGraph: {
      title: "Rosey Co. Belfast | Digital Marketing Agency Belfast, Northern Ireland",
      description:
        "Visit Rosey Co. in Belfast, Northern Ireland. Expert SEO, social media marketing, paid ads, and website design services for Belfast businesses.",
      type: "website",
      locale: getOpenGraphLocale(localeCode),
    },
    alternates: generateHreflangAlternates(localeCode, "/belfast"),
  };
}

// FAQ data for schema and display
const faqData = [
  {
    question: "What digital marketing services do you offer in Belfast?",
    answer:
      "We offer comprehensive digital marketing services in Belfast including SEO (search engine optimization), social media marketing and management, paid advertising (Google Ads and Meta Ads), and professional website design. All services are tailored specifically for Belfast and Northern Ireland businesses.",
  },
  {
    question: "How much do your Belfast marketing services cost?",
    answer:
      "Our Belfast marketing packages range from £500 to £2,000 per month, designed specifically for small to medium-sized businesses. We offer transparent pricing with no hidden fees, and all packages are customized to your business goals and budget. Contact us for a free consultation and custom quote.",
  },
  {
    question: "Do you work with businesses outside Belfast?",
    answer:
      "Yes, while our office is located in Belfast, we work with businesses throughout Northern Ireland including Derry, Lisburn, Newry, and all surrounding areas. We understand the local market and can provide on-site consultations across Northern Ireland.",
  },
  {
    question: "How long before I see results from digital marketing?",
    answer:
      "Results timelines vary by service: SEO typically shows significant improvements in 3-6 months, paid advertising delivers immediate traffic and leads within days, and social media growth becomes noticeable within 1-3 months. We provide monthly reports so you can track progress every step of the way.",
  },
  {
    question: "Can I visit your Belfast office?",
    answer:
      "Yes! We welcome visits to our Belfast office at 1 Hollycroft Avenue, Belfast, BT5 5JE. Please schedule an appointment by calling +44 7722 432679 or using our contact form. We're open Monday to Friday, 9:00 AM to 5:00 PM.",
  },
  {
    question: "What makes Rosey Co. different from other Belfast agencies?",
    answer:
      "We focus on topical authority and data-driven strategies specifically designed for Belfast SMBs. Unlike larger agencies that serve enterprise clients, we specialize in businesses with budgets of £500-2,000/month. We provide transparent reporting, local market expertise, and proven results without the enterprise agency price tag.",
  },
];

export default async function BelfastLocationPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const localeCode = isValidLocale(locale) ? locale : "us";

  // Belfast page only exists for UK locale
  if (localeCode !== "uk") {
    notFound();
  }

  // Belfast service cards data
  const services = [
    {
      title: "SEO Belfast",
      href: "/uk/seo-belfast/",
      icon: Search,
      description:
        "Rank higher on Google with proven SEO strategies for Belfast businesses.",
    },
    {
      title: "Social Media Belfast",
      href: "/uk/social-media-belfast/",
      icon: Share2,
      description:
        "Build engaged audiences and drive conversions through social media marketing.",
    },
    {
      title: "Paid Ads Belfast",
      href: "/uk/paid-ads-belfast/",
      icon: CreditCard,
      description:
        "Generate immediate leads with Google Ads and Meta Ads campaigns.",
    },
    {
      title: "Website Design Belfast",
      href: "/uk/website-design-belfast/",
      icon: Palette,
      description:
        "Modern, conversion-optimized websites designed for Belfast businesses.",
    },
  ];

  // Value propositions
  const valueProps = [
    {
      title: "Local Expertise",
      description:
        "We understand the Belfast market inside and out, from Cathedral Quarter to Titanic Quarter. Our strategies are tailored to Northern Ireland's unique business landscape and customer behaviors.",
    },
    {
      title: "Proven Results",
      description:
        "Data-driven strategies that deliver measurable growth for Belfast SMBs. We focus on metrics that matter: traffic, leads, and revenue - not vanity numbers.",
    },
    {
      title: "Full-Service Agency",
      description:
        "SEO, social media, paid ads, and web design under one roof. No need to juggle multiple agencies - we handle your entire digital marketing strategy.",
    },
    {
      title: "Transparent Pricing",
      description:
        "Clear packages designed for Belfast businesses with budgets from £500/month. No hidden fees, no long-term lock-ins, and honest reporting every step of the way.",
    },
  ];

  return (
    <>
      {/* LocalBusiness Schema with Belfast geo coordinates */}
      <LocalBusinessStructuredData locale={localeCode} />

      {/* FAQ Schema */}
      <FAQStructuredData questions={faqData} />

      {/* Hero Section */}
      <section className="relative bg-hero-surface overflow-hidden">
        <div className="container py-24 md:py-32">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl tracking-tight mb-6 leading-[1.1]">
              Digital Marketing Agency Belfast
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
              Expert digital marketing services for Belfast and Northern Ireland
              businesses. SEO, social media, paid ads, and website design from
              our Belfast office.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/uk/contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold btn-hero"
              >
                Get a Free Quote
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/uk/services"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold border border-border bg-card hover:bg-accent transition-colors"
              >
                Our Services
              </Link>
            </div>
          </div>
        </div>

        {/* Gradient fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-background pointer-events-none" />
      </section>

      {/* Office Information Section */}
      <section className="py-24 md:py-32">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl tracking-tight mb-12 text-center">
              Visit Our Belfast Office
            </h2>

            <div className="tech-card p-8 md:p-12">
              <div className="grid md:grid-cols-2 gap-8">
                {/* Address */}
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Address</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Rosey Co.
                      <br />
                      1 Hollycroft Avenue
                      <br />
                      Belfast, BT5 5JE
                      <br />
                      Northern Ireland
                    </p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <Phone className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Phone</h3>
                    <a
                      href="tel:+447722432679"
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      +44 7722 432679
                    </a>
                  </div>
                </div>

                {/* Hours */}
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <Clock className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Opening Hours</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Monday - Friday
                      <br />
                      9:00 AM - 5:00 PM
                    </p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Email</h3>
                    <Link
                      href="/uk/contact"
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      Contact us via form
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Google Maps Section */}
      <section className="py-24 md:py-32 bg-muted/30">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl tracking-tight mb-12 text-center">
              Find Us
            </h2>

            <div className="relative aspect-video rounded-2xl overflow-hidden tech-card">
              <iframe
                src="https://www.google.com/maps?q=1+Hollycroft+Avenue,+Belfast,+BT5+5JE,+UK&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Rosey Co. Belfast Office Location"
                className="absolute inset-0"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 md:py-32">
        <div className="container">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl tracking-tight mb-4 text-center">
              Our Belfast Services
            </h2>
            <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
              Comprehensive digital marketing solutions designed specifically for
              Belfast and Northern Ireland businesses.
            </p>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {services.map((service) => {
                const Icon = service.icon;
                return (
                  <Link
                    key={service.href}
                    href={service.href}
                    className="tech-card p-6 hover:border-primary/50 transition-all group"
                  >
                    <Icon className="w-10 h-10 text-primary mb-4" />
                    <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                      {service.description}
                    </p>
                    <span className="text-sm text-primary font-medium flex items-center gap-1">
                      Learn more
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Rosey Co. Belfast */}
      <section className="py-24 md:py-32 bg-muted/30">
        <div className="container">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl tracking-tight mb-12 text-center">
              Why Belfast Businesses Choose Rosey Co.
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              {valueProps.map((prop) => (
                <div key={prop.title} className="tech-card p-8">
                  <h3 className="text-xl font-semibold mb-3">{prop.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {prop.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 md:py-32">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl tracking-tight mb-12 text-center">
              Frequently Asked Questions
            </h2>

            <div className="space-y-4">
              {faqData.map((faq, index) => (
                <details
                  key={index}
                  className="tech-card p-6 group cursor-pointer"
                >
                  <summary className="font-semibold text-lg list-none flex items-center justify-between">
                    <span>{faq.question}</span>
                    <ArrowRight className="w-5 h-5 text-muted-foreground group-open:rotate-90 transition-transform" />
                  </summary>
                  <p className="mt-4 text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 md:py-32 bg-gradient-to-b from-muted/30 to-background">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <div className="tech-card p-12 text-center bg-gradient-to-br from-primary/5 to-background border-primary/20">
              <h2 className="text-3xl md:text-4xl tracking-tight mb-4">
                Ready to Grow Your Belfast Business?
              </h2>
              <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
                Get your free strategy session with our Belfast team. We'll
                analyze your current digital presence and show you exactly how to
                get more customers.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/uk/contact"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-lg font-semibold btn-hero text-lg"
                >
                  Get Your Free Strategy Session
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
              <p className="text-sm text-muted-foreground mt-6">
                Or call us:{" "}
                <a
                  href="tel:+447722432679"
                  className="text-primary hover:underline font-medium"
                >
                  +44 7722 432679
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

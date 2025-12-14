"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  TrendingUp,
  Users,
  DollarSign,
  Star,
  Quote,
  Building2,
  ShoppingCart,
  Briefcase,
  Home,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { FadeIn, StaggerChildren, StaggerItem } from "@/components/animations";

// Case Studies Data
const caseStudies = [
  {
    client: "E-Commerce Brand",
    industry: "Retail",
    icon: ShoppingCart,
    challenge:
      "Struggling to scale paid ads profitably with increasing CPAs and stagnant ROAS.",
    solution:
      "Restructured Meta Ads account, implemented advanced retargeting, and optimized landing pages.",
    results: [
      { metric: "ROAS", before: "2.1x", after: "8.4x" },
      { metric: "Revenue", before: "$45K/mo", after: "$180K/mo" },
      { metric: "CPA", before: "$85", after: "$32" },
    ],
    color: "brand-magenta",
  },
  {
    client: "B2B SaaS Company",
    industry: "Technology",
    icon: Briefcase,
    challenge:
      "Low organic visibility and relying entirely on paid channels for lead generation.",
    solution:
      "Comprehensive SEO strategy targeting high-intent keywords and technical optimizations.",
    results: [
      { metric: "Organic Traffic", before: "2K/mo", after: "18K/mo" },
      { metric: "Leads", before: "15/mo", after: "120/mo" },
      { metric: "Domain Authority", before: "24", after: "48" },
    ],
    color: "brand-cyan",
  },
  {
    client: "Real Estate Agency",
    industry: "Property",
    icon: Home,
    challenge:
      "Minimal social media presence and inconsistent lead flow from digital channels.",
    solution:
      "Full social media management with content strategy, community building, and paid social ads.",
    results: [
      { metric: "Followers", before: "800", after: "12K" },
      { metric: "Engagement", before: "1.2%", after: "6.8%" },
      { metric: "Leads/Month", before: "8", after: "65" },
    ],
    color: "brand-purple",
  },
  {
    client: "Professional Services",
    industry: "Consulting",
    icon: Building2,
    challenge:
      "Outdated website with poor conversion rates and no clear lead capture strategy.",
    solution:
      "Complete website redesign with conversion optimization, SEO, and analytics integration.",
    results: [
      { metric: "Conversion Rate", before: "0.8%", after: "4.2%" },
      { metric: "Page Speed", before: "6.2s", after: "1.4s" },
      { metric: "Leads/Month", before: "12", after: "58" },
    ],
    color: "brand-cyan",
  },
];

// Testimonials Data
const testimonials = [
  {
    quote:
      "Flowryse transformed our marketing completely. We went from struggling to get leads to having more than we can handle. The ROI has been incredible.",
    author: "Sarah M.",
    role: "CEO, E-Commerce Brand",
    rating: 5,
  },
  {
    quote:
      "Finally, a marketing agency that actually delivers on their promises. Our organic traffic grew 800% in 6 months. These guys know what they're doing.",
    author: "Michael T.",
    role: "Founder, SaaS Startup",
    rating: 5,
  },
  {
    quote:
      "The team at Flowryse doesn't just run ads — they build systems. Our cost per lead dropped by 60% while our lead quality went up.",
    author: "Jennifer L.",
    role: "Marketing Director",
    rating: 5,
  },
  {
    quote:
      "Best decision we made was hiring Flowryse. Professional, transparent, and most importantly — they get results. 10/10 would recommend.",
    author: "David R.",
    role: "Business Owner",
    rating: 5,
  },
  {
    quote:
      "Our social media went from dead to thriving. The content they create actually resonates with our audience and drives real business.",
    author: "Amanda K.",
    role: "Real Estate Agent",
    rating: 5,
  },
  {
    quote:
      "The new website they built us is beautiful AND it converts. Our lead capture went up 5x. Worth every penny.",
    author: "Chris P.",
    role: "Consultant",
    rating: 5,
  },
];

// Overall Stats
const overallStats = [
  { value: "$10M+", label: "Revenue Generated" },
  { value: "21x", label: "Average ROAS" },
  { value: "50+", label: "Happy Clients" },
  { value: "300%", label: "Avg. Growth" },
];

export default function ResultsPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-hero-surface overflow-hidden">
        <div className="container py-20 md:py-28">
          <div className="max-w-3xl mx-auto text-center">
            <FadeIn delay={0.1}>
              <span className="inline-block px-4 py-1.5 mb-6 text-xs font-medium rounded-full bg-primary/10 text-primary border border-primary/20">
                Our Results
              </span>
            </FadeIn>

            <FadeIn delay={0.2}>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 leading-[1.1]">
                Real Results for{" "}
                <span className="gradient-accent-text">Real Businesses</span>
              </h1>
            </FadeIn>

            <FadeIn delay={0.3}>
              <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed">
                We don&apos;t just talk about results — we prove them. Here&apos;s
                what we&apos;ve achieved for businesses just like yours.
              </p>
            </FadeIn>
          </div>
        </div>

        {/* Gradient fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-background pointer-events-none" />
      </section>

      {/* Overall Stats Section */}
      <section className="py-16 border-b border-border/50">
        <div className="container">
          <StaggerChildren className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {overallStats.map((stat, index) => (
              <StaggerItem key={index} className="text-center">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <p className="text-4xl md:text-5xl font-bold gradient-text mb-2">
                    {stat.value}
                  </p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* Case Studies Section */}
      <section className="py-20 md:py-28">
        <div className="container">
          <FadeIn className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Client <span className="gradient-accent-text">Case Studies</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Deep dives into how we&apos;ve helped businesses achieve
              transformational growth.
            </p>
          </FadeIn>

          <StaggerChildren className="space-y-8" staggerDelay={0.15}>
            {caseStudies.map((study, index) => {
              const Icon = study.icon;

              return (
                <StaggerItem key={study.client}>
                  <motion.div
                    whileHover={{ scale: 1.01 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="tech-card overflow-hidden"
                  >
                    <div className="p-8 md:p-10">
                      {/* Header */}
                      <div className="flex flex-col md:flex-row md:items-center gap-4 mb-8">
                        <div
                          className="w-14 h-14 rounded-xl flex items-center justify-center"
                          style={{
                            backgroundColor: `hsl(var(--${study.color}) / 0.1)`,
                            border: `1px solid hsl(var(--${study.color}) / 0.3)`,
                          }}
                        >
                          <Icon
                            className="w-7 h-7"
                            style={{ color: `hsl(var(--${study.color}))` }}
                          />
                        </div>
                        <div>
                          <h3 className="text-xl md:text-2xl font-bold">
                            {study.client}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {study.industry}
                          </p>
                        </div>
                      </div>

                      {/* Content Grid */}
                      <div className="grid lg:grid-cols-3 gap-8">
                        {/* Challenge */}
                        <div>
                          <h4
                            className="text-sm font-semibold mb-3 flex items-center gap-2"
                            style={{ color: `hsl(var(--${study.color}))` }}
                          >
                            <span
                              className="w-2 h-2 rounded-full"
                              style={{
                                backgroundColor: `hsl(var(--${study.color}))`,
                              }}
                            />
                            The Challenge
                          </h4>
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            {study.challenge}
                          </p>
                        </div>

                        {/* Solution */}
                        <div>
                          <h4
                            className="text-sm font-semibold mb-3 flex items-center gap-2"
                            style={{ color: `hsl(var(--${study.color}))` }}
                          >
                            <span
                              className="w-2 h-2 rounded-full"
                              style={{
                                backgroundColor: `hsl(var(--${study.color}))`,
                              }}
                            />
                            Our Solution
                          </h4>
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            {study.solution}
                          </p>
                        </div>

                        {/* Results */}
                        <div>
                          <h4
                            className="text-sm font-semibold mb-3 flex items-center gap-2"
                            style={{ color: `hsl(var(--${study.color}))` }}
                          >
                            <span
                              className="w-2 h-2 rounded-full"
                              style={{
                                backgroundColor: `hsl(var(--${study.color}))`,
                              }}
                            />
                            The Results
                          </h4>
                          <div className="space-y-3">
                            {study.results.map((result) => (
                              <div
                                key={result.metric}
                                className="flex items-center justify-between text-sm"
                              >
                                <span className="text-muted-foreground">
                                  {result.metric}
                                </span>
                                <div className="flex items-center gap-2">
                                  <span className="text-muted-foreground/60 line-through">
                                    {result.before}
                                  </span>
                                  <ArrowRight className="w-3 h-3 text-muted-foreground" />
                                  <span
                                    className="font-semibold"
                                    style={{
                                      color: `hsl(var(--${study.color}))`,
                                    }}
                                  >
                                    {result.after}
                                  </span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </StaggerItem>
              );
            })}
          </StaggerChildren>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 md:py-28 bg-muted/30">
        <div className="container">
          <FadeIn className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              What Our Clients{" "}
              <span className="gradient-text">Say About Us</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Don&apos;t take our word for it — hear from the businesses we&apos;ve
              helped grow.
            </p>
          </FadeIn>

          <StaggerChildren
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            staggerDelay={0.1}
          >
            {testimonials.map((testimonial, index) => (
              <StaggerItem key={index}>
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="tech-card p-6 h-full flex flex-col"
                >
                  {/* Stars */}
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-yellow-500 text-yellow-500"
                      />
                    ))}
                  </div>

                  {/* Quote */}
                  <div className="relative flex-1 mb-6">
                    <Quote className="absolute -top-2 -left-2 w-8 h-8 text-brand-purple/20" />
                    <p className="text-sm text-muted-foreground leading-relaxed pl-4">
                      {testimonial.quote}
                    </p>
                  </div>

                  {/* Author */}
                  <div className="border-t border-border/50 pt-4">
                    <p className="font-semibold">{testimonial.author}</p>
                    <p className="text-xs text-muted-foreground">
                      {testimonial.role}
                    </p>
                  </div>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* Why These Results Section */}
      <section className="py-20 md:py-28">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <FadeIn direction="right">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
                Why We Get{" "}
                <span className="gradient-accent-text">These Results</span>
              </h2>
              <div className="space-y-6">
                <div className="tech-card p-6">
                  <h3 className="font-semibold mb-2 text-brand-cyan">
                    Data-Driven Decisions
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Every strategy is backed by data. We track, measure, and
                    optimize based on what actually works — not assumptions.
                  </p>
                </div>

                <div className="tech-card p-6">
                  <h3 className="font-semibold mb-2 text-brand-purple">
                    Full-Funnel Approach
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    We don&apos;t just drive traffic — we build complete systems that
                    convert visitors into leads and leads into customers.
                  </p>
                </div>

                <div className="tech-card p-6 shadow-brand">
                  <h3 className="font-semibold mb-2 text-brand-magenta">
                    Results Guarantee
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    We&apos;re so confident in our ability to deliver that if we
                    don&apos;t hit agreed targets, we pause fees until we do.
                  </p>
                </div>
              </div>
            </FadeIn>

            <FadeIn direction="left" delay={0.2}>
              <div className="relative">
                <div
                  className="aspect-square rounded-2xl p-1"
                  style={{
                    background:
                      "linear-gradient(135deg, hsl(var(--brand-purple) / 0.2), hsl(var(--brand-magenta) / 0.1), hsl(var(--brand-cyan) / 0.2))",
                  }}
                >
                  <div className="w-full h-full rounded-2xl bg-background flex items-center justify-center">
                    <div className="text-center p-8">
                      <motion.div
                        animate={{ scale: [1, 1.05, 1] }}
                        transition={{ duration: 3, repeat: Infinity }}
                        className="w-24 h-24 mx-auto mb-6 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center"
                      >
                        <TrendingUp className="w-12 h-12 text-primary" />
                      </motion.div>
                      <p className="text-5xl font-bold gradient-text mb-2">
                        98%
                      </p>
                      <p className="text-muted-foreground">
                        Client Satisfaction
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-28 bg-hero-surface">
        <div className="container">
          <FadeIn className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
              Ready to Be Our Next Success Story?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Book a free strategy call and let&apos;s discuss how we can achieve
              similar results for your business.
            </p>
            <Button asChild size="lg" className="btn-hero group">
              <Link href="/contact" className="flex items-center gap-2">
                Get Your Free Strategy Call
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </FadeIn>
        </div>
      </section>
    </>
  );
}

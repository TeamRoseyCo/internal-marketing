"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, TrendingUp, Target, Zap, Users, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FadeIn, StaggerChildren, StaggerItem } from "@/components/animations";

const services = [
  {
    icon: TrendingUp,
    title: "SEO Services",
    description:
      "Dominate search results and get found by customers actively searching for your services. Our data-driven SEO strategies deliver sustainable organic growth.",
    features: [
      "Technical SEO Audits",
      "On-Page Optimization",
      "Link Building",
      "Local SEO",
      "Content Strategy",
    ],
    href: "/services/seo",
    color: "brand-cyan",
    stats: { value: "300%", label: "Avg. Traffic Increase" },
  },
  {
    icon: Users,
    title: "Social Media Management",
    description:
      "Build your brand presence and engage your audience across all major platforms. We create content that converts followers into customers.",
    features: [
      "Content Creation",
      "Community Management",
      "Influencer Outreach",
      "Analytics & Reporting",
      "Brand Strategy",
    ],
    href: "/services/social-media",
    color: "brand-purple",
    stats: { value: "5x", label: "Engagement Growth" },
  },
  {
    icon: Target,
    title: "Paid Advertising",
    description:
      "ROI-focused Google Ads and Meta Ads campaigns that convert clicks into customers. Every dollar tracked, every result measured.",
    features: [
      "Google Ads Management",
      "Meta Ads (Facebook & Instagram)",
      "Retargeting Campaigns",
      "A/B Testing",
      "Conversion Tracking",
    ],
    href: "/services/paid-ads",
    color: "brand-magenta",
    stats: { value: "21x", label: "Average ROAS" },
  },
  {
    icon: Zap,
    title: "Website Design",
    description:
      "High-converting websites designed to turn visitors into leads and customers. Fast, beautiful, and built for results.",
    features: [
      "Conversion-Focused Design",
      "Mobile-First Development",
      "Speed Optimization",
      "SEO-Ready Structure",
      "Analytics Integration",
    ],
    href: "/services/website-design",
    color: "brand-cyan",
    stats: { value: "2.5x", label: "Conversion Rate Boost" },
  },
];

export default function ServicesPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-hero-surface overflow-hidden">
        <div className="container py-20 md:py-28">
          <div className="max-w-3xl mx-auto text-center">
            <FadeIn delay={0.1}>
              <span className="inline-block px-4 py-1.5 mb-6 text-xs font-medium rounded-full bg-primary/10 text-primary border border-primary/20">
                Our Services
              </span>
            </FadeIn>

            <FadeIn delay={0.2}>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 leading-[1.1]">
                Marketing That{" "}
                <span className="gradient-accent-text">Delivers Results</span>
              </h1>
            </FadeIn>

            <FadeIn delay={0.3}>
              <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed">
                From SEO to paid ads, we deliver data-driven strategies that turn
                marketing spend into measurable revenue. Choose your path to growth.
              </p>
            </FadeIn>
          </div>
        </div>

        {/* Gradient fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-background pointer-events-none" />
      </section>

      {/* Services Grid */}
      <section className="py-20 md:py-28">
        <div className="container">
          <StaggerChildren className="space-y-12" staggerDelay={0.15}>
            {services.map((service, index) => {
              const Icon = service.icon;
              const isReversed = index % 2 === 1;

              return (
                <StaggerItem key={service.title}>
                  <motion.div
                    whileHover={{ scale: 1.01 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="tech-card overflow-hidden"
                  >
                    <div
                      className={`grid lg:grid-cols-2 gap-8 p-8 md:p-10 ${
                        isReversed ? "lg:flex-row-reverse" : ""
                      }`}
                    >
                      {/* Content */}
                      <div
                        className={`flex flex-col justify-center ${
                          isReversed ? "lg:order-2" : ""
                        }`}
                      >
                        <div
                          className="w-14 h-14 mb-6 rounded-xl flex items-center justify-center"
                          style={{
                            backgroundColor: `hsl(var(--${service.color}) / 0.1)`,
                            border: `1px solid hsl(var(--${service.color}) / 0.3)`,
                          }}
                        >
                          <Icon
                            className="w-7 h-7"
                            style={{ color: `hsl(var(--${service.color}))` }}
                          />
                        </div>

                        <h2 className="text-2xl md:text-3xl font-bold mb-4">
                          {service.title}
                        </h2>

                        <p className="text-muted-foreground mb-6 leading-relaxed">
                          {service.description}
                        </p>

                        <ul className="space-y-3 mb-8">
                          {service.features.map((feature) => (
                            <li
                              key={feature}
                              className="flex items-center gap-3 text-sm"
                            >
                              <CheckCircle
                                className="w-5 h-5 flex-shrink-0"
                                style={{ color: `hsl(var(--${service.color}))` }}
                              />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>

                        <Button asChild className="btn-hero w-fit group">
                          <Link
                            href={service.href}
                            className="flex items-center gap-2"
                          >
                            Learn More
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                          </Link>
                        </Button>
                      </div>

                      {/* Stats Card */}
                      <div
                        className={`flex items-center justify-center ${
                          isReversed ? "lg:order-1" : ""
                        }`}
                      >
                        <div
                          className="relative w-full max-w-sm aspect-square rounded-2xl p-1"
                          style={{
                            background: `linear-gradient(135deg, hsl(var(--${service.color}) / 0.2), hsl(var(--${service.color}) / 0.05))`,
                          }}
                        >
                          <div className="w-full h-full rounded-2xl bg-background flex items-center justify-center">
                            <div className="text-center">
                              <motion.p
                                initial={{ scale: 0.5, opacity: 0 }}
                                whileInView={{ scale: 1, opacity: 1 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                                viewport={{ once: true }}
                                className="text-6xl md:text-7xl font-bold gradient-text mb-4"
                              >
                                {service.stats.value}
                              </motion.p>
                              <p className="text-muted-foreground">
                                {service.stats.label}
                              </p>
                            </div>
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

      {/* CTA Section */}
      <section className="py-20 md:py-28 bg-hero-surface">
        <div className="container">
          <FadeIn className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
              Not Sure Which Service Is Right for You?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Book a free strategy call and we&apos;ll help you identify the best
              approach to grow your business.
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

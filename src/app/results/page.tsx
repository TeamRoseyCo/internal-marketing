"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  TrendingUp,
  Star,
  Quote,
  ShoppingCart,
  Briefcase,
  Home,
  Building2,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnimatedCounter } from "@/components/ui/animated-counter";

// Animation variants (matching homepage)
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const staggerItem = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

// Overall Stats
const overallStats = [
  { value: 10, suffix: "M+", label: "Revenue Generated", prefix: "$" },
  { value: 21, suffix: "x", label: "Average ROAS" },
  { value: 50, suffix: "+", label: "Happy Clients" },
  { value: 300, suffix: "%", label: "Avg. Growth" },
];

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
    cardClass: "service-card service-card-green",
    iconColor: "hsl(130 65% 45%)",
    iconBg: "hsl(130 65% 45% / 0.15)",
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
    cardClass: "service-card service-card-rose",
    iconColor: "hsl(0 75% 50%)",
    iconBg: "hsl(0 75% 50% / 0.15)",
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
    cardClass: "service-card service-card-green",
    iconColor: "hsl(130 65% 45%)",
    iconBg: "hsl(130 65% 45% / 0.15)",
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
    cardClass: "service-card service-card-rose",
    iconColor: "hsl(0 75% 50%)",
    iconBg: "hsl(0 75% 50% / 0.15)",
  },
];

// Testimonials Data
const testimonials = [
  {
    quote:
      "Rosey Co. transformed our marketing completely. We went from struggling to get leads to having more than we can handle. The ROI has been incredible.",
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
      "The team at Rosey Co. doesn't just run ads — they build systems. Our cost per lead dropped by 60% while our lead quality went up.",
    author: "Jennifer L.",
    role: "Marketing Director",
    rating: 5,
  },
  {
    quote:
      "Best decision we made was hiring Rosey Co. Professional, transparent, and most importantly — they get results. 10/10 would recommend.",
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

export default function ResultsPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="container py-16 md:py-24 lg:py-32">
          <div className="max-w-4xl mx-auto text-center">
            <motion.span
              className="inline-block px-5 py-2 mb-8 text-sm font-medium tracking-wider uppercase rounded-full bg-primary/10 text-primary border border-primary/20"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Our Results
            </motion.span>

            <motion.h1
              className="text-5xl md:text-6xl lg:text-7xl tracking-tight mb-8 leading-[1.05]"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              Real Results for{" "}
              <span className="gradient-accent-text">Real Businesses</span>
            </motion.h1>

            <motion.p
              className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              We don&apos;t just talk about results — we prove them. Here&apos;s
              what we&apos;ve achieved for businesses just like yours.
            </motion.p>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:block"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <ChevronDown className="w-7 h-7 text-muted-foreground/50" />
          </motion.div>
        </motion.div>
      </section>

      {/* Overall Stats Section */}
      <section className="py-20 md:py-28">
        <div className="container">
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {overallStats.map((stat, index) => (
              <motion.div
                key={index}
                className="text-center"
                variants={staggerItem}
                transition={{ duration: 0.6 }}
              >
                <motion.p
                  className="text-5xl md:text-6xl lg:text-7xl font-bold gradient-text mb-3"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <AnimatedCounter
                    value={stat.value}
                    suffix={stat.suffix}
                    prefix={stat.prefix}
                    duration={2 + index * 0.3}
                  />
                </motion.p>
                <p className="text-base md:text-lg text-muted-foreground">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Case Studies Section */}
      <section className="py-24 md:py-32">
        <div className="container">
          <motion.div
            className="text-center mb-16 md:mb-20"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl tracking-tight mb-6">
              Client <span className="gradient-accent-text">Case Studies</span>
            </h2>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
              Deep dives into how we&apos;ve helped businesses achieve
              transformational growth.
            </p>
          </motion.div>

          <motion.div
            className="space-y-8 md:space-y-12"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            {caseStudies.map((study) => {
              const Icon = study.icon;

              return (
                <motion.div
                  key={study.client}
                  variants={staggerItem}
                  transition={{ duration: 0.6 }}
                >
                  <div className={`${study.cardClass} overflow-hidden`}>
                    <div className="p-8 md:p-10 lg:p-12">
                      {/* Header */}
                      <div className="flex flex-col md:flex-row md:items-center gap-4 mb-8">
                        <div
                          className="w-16 h-16 rounded-2xl flex items-center justify-center"
                          style={{
                            backgroundColor: study.iconBg,
                            border: `1px solid ${study.iconColor}30`,
                          }}
                        >
                          <Icon
                            className="w-8 h-8"
                            style={{ color: study.iconColor }}
                          />
                        </div>
                        <div>
                          <h3 className="text-2xl md:text-3xl font-bold">
                            {study.client}
                          </h3>
                          <p className="text-base text-muted-foreground">
                            {study.industry}
                          </p>
                        </div>
                      </div>

                      {/* Content Grid */}
                      <div className="grid lg:grid-cols-3 gap-8">
                        {/* Challenge */}
                        <div>
                          <h4
                            className="text-base font-semibold mb-3 flex items-center gap-2"
                            style={{ color: study.iconColor }}
                          >
                            <span
                              className="w-2 h-2 rounded-full"
                              style={{
                                backgroundColor: study.iconColor,
                              }}
                            />
                            The Challenge
                          </h4>
                          <p className="text-base text-muted-foreground leading-relaxed">
                            {study.challenge}
                          </p>
                        </div>

                        {/* Solution */}
                        <div>
                          <h4
                            className="text-base font-semibold mb-3 flex items-center gap-2"
                            style={{ color: study.iconColor }}
                          >
                            <span
                              className="w-2 h-2 rounded-full"
                              style={{
                                backgroundColor: study.iconColor,
                              }}
                            />
                            Our Solution
                          </h4>
                          <p className="text-base text-muted-foreground leading-relaxed">
                            {study.solution}
                          </p>
                        </div>

                        {/* Results */}
                        <div>
                          <h4
                            className="text-base font-semibold mb-3 flex items-center gap-2"
                            style={{ color: study.iconColor }}
                          >
                            <span
                              className="w-2 h-2 rounded-full"
                              style={{
                                backgroundColor: study.iconColor,
                              }}
                            />
                            The Results
                          </h4>
                          <div className="space-y-3">
                            {study.results.map((result) => (
                              <div
                                key={result.metric}
                                className="flex items-center justify-between text-base"
                              >
                                <span className="text-muted-foreground">
                                  {result.metric}
                                </span>
                                <div className="flex items-center gap-2">
                                  <span className="text-muted-foreground/60 line-through">
                                    {result.before}
                                  </span>
                                  <ArrowRight className="w-4 h-4 text-muted-foreground" />
                                  <span
                                    className="font-bold"
                                    style={{
                                      color: study.iconColor,
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
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 md:py-32">
        <div className="container">
          <motion.div
            className="text-center mb-16 md:mb-20"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl tracking-tight mb-6">
              What Our Clients{" "}
              <span className="gradient-text">Say About Us</span>
            </h2>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
              Don&apos;t take our word for it — hear from the businesses we&apos;ve
              helped grow.
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                variants={staggerItem}
                transition={{ duration: 0.5 }}
              >
                {/* Glassmorphism card wrapper */}
                <div className="rounded-2xl p-px bg-gradient-to-br from-border/50 via-border/20 to-border/50 group hover:from-primary/20 hover:via-border/30 hover:to-primary/20 transition-all duration-500 h-full">
                  <div className="bg-card/60 backdrop-blur-xl rounded-2xl p-6 md:p-8 h-full flex flex-col relative overflow-hidden">
                    {/* Subtle top highlight for glass effect */}
                    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

                    {/* Stars */}
                    <div className="flex gap-1 mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-5 h-5 fill-yellow-500 text-yellow-500"
                        />
                      ))}
                    </div>

                    {/* Quote */}
                    <div className="relative flex-1 mb-6">
                      <Quote className="absolute -top-2 -left-2 w-10 h-10 text-brand-green/20" />
                      <p className="text-base text-muted-foreground leading-relaxed pl-6">
                        {testimonial.quote}
                      </p>
                    </div>

                    {/* Author */}
                    <div className="border-t border-border/50 pt-4">
                      <p className="font-semibold text-lg">{testimonial.author}</p>
                      <p className="text-sm text-muted-foreground">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 md:py-32 relative overflow-hidden">
        {/* Background glow effects */}
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-30"
            style={{
              background: "radial-gradient(circle, hsl(0 75% 50% / 0.15), transparent 70%)",
            }}
          />
          <div
            className="absolute top-1/4 left-1/4 w-[400px] h-[400px] rounded-full opacity-20"
            style={{
              background: "radial-gradient(circle, hsl(130 65% 40% / 0.15), transparent 70%)",
            }}
          />
        </div>

        <div className="container relative z-10">
          <motion.div
            className="text-center max-w-4xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            transition={{ duration: 0.7 }}
          >
            <motion.div
              className="inline-block mb-8"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <span className="px-5 py-2 text-sm font-medium tracking-wider uppercase rounded-full bg-primary/10 text-primary border border-primary/20">
                Your Turn
              </span>
            </motion.div>

            <h2 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl tracking-tight mb-8">
              Ready to Be Our{" "}
              <span className="gradient-text">Next Success Story?</span>
            </h2>
            <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl mx-auto">
              Book a free strategy call and let&apos;s discuss how we can achieve
              similar results for your business.
            </p>

            <motion.div
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <Button asChild size="lg" className="btn-hero text-base sm:text-lg px-6 sm:px-10 py-4 sm:py-6 h-auto">
                <Link href="/contact" className="flex items-center gap-2 sm:gap-3">
                  Get Your Free Strategy Call
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="group text-base sm:text-lg px-6 sm:px-8 py-4 sm:py-6 h-auto border-2 border-white/20 hover:border-primary/50 bg-transparent hover:bg-white/5 transition-all duration-300">
                <Link href="/services" className="flex items-center gap-2">
                  Explore Services
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">→</span>
                </Link>
              </Button>
            </motion.div>

            <motion.p
              className="mt-8 text-sm text-muted-foreground"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              No commitment required. 100% free consultation.
            </motion.p>
          </motion.div>
        </div>
      </section>
    </>
  );
}

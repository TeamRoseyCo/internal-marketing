"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Users,
  Instagram,
  Facebook,
  Linkedin,
  MessageCircle,
  Camera,
  BarChart3,
  Calendar,
  Heart,
  CheckCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { RelatedArticles, socialMediaArticles } from "@/components/blog/related-articles";
import { AnimatedCounter } from "@/components/ui/animated-counter";

// Animation variants
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

const processSteps = [
  {
    number: "01",
    title: "Brand Audit",
    description:
      "We analyze your current social presence, audience demographics, and competitor strategies.",
    icon: BarChart3,
  },
  {
    number: "02",
    title: "Strategy Creation",
    description:
      "We develop a tailored content strategy aligned with your brand voice and business goals.",
    icon: Calendar,
  },
  {
    number: "03",
    title: "Content Production",
    description:
      "Our creative team produces engaging content that resonates with your target audience.",
    icon: Camera,
  },
  {
    number: "04",
    title: "Community Management",
    description:
      "We engage with your audience, respond to comments, and build genuine relationships.",
    icon: MessageCircle,
  },
  {
    number: "05",
    title: "Analyze & Optimize",
    description:
      "Continuous performance tracking and strategy refinement based on real engagement data.",
    icon: Heart,
  },
];

const features = [
  {
    title: "Content Creation",
    description: "Scroll-stopping graphics, videos, and copy tailored to each platform.",
  },
  {
    title: "Community Management",
    description: "Active engagement with your followers to build brand loyalty.",
  },
  {
    title: "Social Strategy",
    description: "Data-driven content calendars aligned with your business goals.",
  },
  {
    title: "Influencer Outreach",
    description: "Connect with relevant influencers to expand your reach.",
  },
  {
    title: "Paid Social Campaigns",
    description: "Targeted ads that convert followers into customers.",
  },
  {
    title: "Analytics & Reporting",
    description: "Monthly reports with engagement, reach, and growth metrics.",
  },
];

const platforms = [
  { icon: Instagram, name: "Instagram", color: "hsl(0 75% 50%)" },
  { icon: Facebook, name: "Facebook", color: "hsl(130 65% 45%)" },
  { icon: Linkedin, name: "LinkedIn", color: "hsl(140 50% 38%)" },
];

const stats = [
  { value: 5, suffix: "x", label: "Engagement Growth" },
  { value: 250, suffix: "%", label: "Follower Increase" },
  { value: 40, suffix: "+", label: "Posts Per Month" },
];

export default function SocialMediaPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="container py-16 md:py-24 lg:py-32">
          <div className="max-w-5xl mx-auto text-center">
            <motion.span
              className="inline-block px-5 py-2 mb-8 text-sm font-medium tracking-wider uppercase rounded-full bg-[hsl(140_50%_38%/0.1)] text-[hsl(140_50%_38%)] border border-[hsl(140_50%_38%/0.2)]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Social Media Management
            </motion.span>

            <motion.h1
              className="text-5xl md:text-6xl lg:text-7xl tracking-tight mb-8 leading-[1.05]"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              Build a Brand People{" "}
              <span className="gradient-text">Actually Follow</span>
            </motion.h1>

            <motion.p
              className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-12"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              Turn your social media into a lead-generating machine. We create
              content that stops the scroll, builds community, and converts
              followers into customers.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Button asChild size="lg" className="btn-hero text-base sm:text-lg px-6 sm:px-10 py-4 sm:py-6 h-auto">
                <Link href="/contact" className="flex items-center gap-2 sm:gap-3">
                  Get Your Social Strategy
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="group text-base sm:text-lg px-6 sm:px-8 py-4 sm:py-6 h-auto btn-ghost-glass overflow-hidden rounded-xl">
                <Link href="/results" className="flex items-center gap-2">
                  See Our Work
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 opacity-70 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 md:py-28">
        <div className="container">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {stats.map((stat, index) => (
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
                    duration={2 + index * 0.3}
                  />
                </motion.p>
                <p className="text-base md:text-lg text-muted-foreground">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Platforms Section */}
      <section className="py-12 md:py-16 border-y border-border/50">
        <div className="container">
          <motion.p
            className="text-center text-muted-foreground mb-10"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            We manage your presence across all major platforms
          </motion.p>
          <motion.div
            className="flex flex-wrap justify-center gap-6 md:gap-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {platforms.map((platform) => {
              const Icon = platform.icon;
              return (
                <motion.div
                  key={platform.name}
                  variants={staggerItem}
                  whileHover={{ scale: 1.05, y: -4 }}
                  className="service-card service-card-purple px-8 py-5 flex items-center gap-4"
                >
                  <Icon
                    className="w-8 h-8"
                    style={{ color: platform.color }}
                  />
                  <span className="font-semibold text-lg">{platform.name}</span>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* What We Do Section */}
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
              Full-Service Social{" "}
              <span className="gradient-accent-text">Management</span>
            </h2>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
              From content creation to community building, we handle everything so
              you can focus on your business.
            </p>
          </motion.div>

          <motion.div
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            {features.map((feature) => (
              <motion.div
                key={feature.title}
                variants={staggerItem}
                transition={{ duration: 0.5 }}
              >
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="service-card service-card-purple p-7 md:p-8 h-full"
                >
                  <div className="w-12 h-12 mb-5 rounded-xl bg-[hsl(140_50%_38%/0.15)] border border-[hsl(140_50%_38%/0.3)] flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-[hsl(140_50%_38%)]" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-base text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Process Section */}
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
              Our <span className="gradient-text">Process</span>
            </h2>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
              A systematic approach to building and growing your social presence.
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-[hsl(140_50%_38%)] via-[hsl(0_75%_50%)] to-[hsl(180_70%_50%)] hidden md:block" />

              <motion.div
                className="space-y-8"
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
              >
                {processSteps.map((step, index) => {
                  const Icon = step.icon;
                  const isLeft = index % 2 === 0;

                  return (
                    <motion.div
                      key={step.number}
                      variants={staggerItem}
                      transition={{ duration: 0.5 }}
                    >
                      <div
                        className={`flex items-start gap-6 md:gap-12 ${
                          isLeft ? "md:flex-row" : "md:flex-row-reverse"
                        }`}
                      >
                        {/* Content */}
                        <motion.div
                          whileHover={{ scale: 1.02 }}
                          className={`flex-1 service-card service-card-purple p-6 md:p-8 ${
                            isLeft ? "md:text-right" : ""
                          }`}
                        >
                          <div
                            className={`flex items-center gap-3 mb-3 ${
                              isLeft ? "md:flex-row-reverse" : ""
                            }`}
                          >
                            <span className="text-sm font-mono text-[hsl(140_50%_38%)]">
                              {step.number}
                            </span>
                            <h3 className="text-xl font-semibold">{step.title}</h3>
                          </div>
                          <p className="text-base text-muted-foreground leading-relaxed">
                            {step.description}
                          </p>
                        </motion.div>

                        {/* Icon */}
                        <div className="hidden md:flex w-16 h-16 rounded-full bg-background border-2 border-[hsl(140_50%_38%/0.3)] items-center justify-center flex-shrink-0 z-10">
                          <Icon className="w-6 h-6 text-[hsl(140_50%_38%)]" />
                        </div>

                        {/* Spacer for alignment */}
                        <div className="hidden md:block flex-1" />
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Content Preview Section */}
      <section className="py-24 md:py-32">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7 }}
            >
              <div className="service-card service-card-magenta p-8 md:p-10">
                <div className="w-16 h-16 mb-6 rounded-2xl bg-[hsl(0_75%_50%/0.15)] border border-[hsl(0_75%_50%/0.3)] flex items-center justify-center">
                  <Camera className="w-8 h-8 text-[hsl(0_75%_50%)]" />
                </div>
                <h3 className="text-3xl md:text-4xl font-bold mb-4">
                  Content That Converts
                </h3>
                <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                  We don&apos;t just post content for the sake of posting. Every
                  piece of content we create is designed to engage your audience
                  and drive them toward becoming customers.
                </p>
                <ul className="space-y-4">
                  {[
                    "Scroll-Stopping Graphics",
                    "Engaging Video Content",
                    "Strategic Copywriting",
                    "Story & Reel Creation",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-3 text-base">
                      <span className="w-6 h-6 rounded-full bg-[hsl(0_75%_50%/0.15)] flex items-center justify-center flex-shrink-0">
                        <CheckCircle className="w-4 h-4 text-[hsl(0_75%_50%)]" />
                      </span>
                      <span className="text-foreground/90">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <div className="relative">
                <div
                  className="aspect-square rounded-3xl p-1"
                  style={{
                    background:
                      "linear-gradient(135deg, hsl(0 75% 50% / 0.2), hsl(140 50% 38% / 0.1))",
                  }}
                >
                  <div className="w-full h-full rounded-3xl bg-background/80 backdrop-blur-sm flex items-center justify-center border border-border/30">
                    <div className="text-center p-8">
                      <motion.div
                        animate={{ scale: [1, 1.05, 1] }}
                        transition={{ duration: 3, repeat: Infinity }}
                        className="w-28 h-28 mx-auto mb-6 rounded-full bg-[hsl(0_75%_50%/0.1)] border border-[hsl(0_75%_50%/0.3)] flex items-center justify-center"
                      >
                        <Heart className="w-14 h-14 text-[hsl(0_75%_50%)]" />
                      </motion.div>
                      <p className="text-6xl md:text-7xl font-bold gradient-text mb-4">
                        <AnimatedCounter value={40} suffix="+" duration={2} />
                      </p>
                      <p className="text-lg text-muted-foreground">
                        Custom Posts Monthly
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Related Articles Section */}
      <RelatedArticles
        title="Social Media Insights"
        subtitle="Grow your social presence with our latest tips"
        articles={socialMediaArticles}
        viewAllHref="/blog?category=social-media"
        viewAllText="View All Social Media Articles"
      />

      {/* CTA Section */}
      <section className="py-24 md:py-32 relative overflow-hidden">
        {/* Background glow effects */}
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-30"
            style={{
              background: "radial-gradient(circle, hsl(140 50% 38% / 0.15), transparent 70%)",
            }}
          />
          <div
            className="absolute top-1/4 left-1/4 w-[400px] h-[400px] rounded-full opacity-20"
            style={{
              background: "radial-gradient(circle, hsl(0 75% 50% / 0.15), transparent 70%)",
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
                Start Growing
              </span>
            </motion.div>

            <h2 className="text-4xl md:text-5xl lg:text-6xl tracking-tight mb-8">
              Ready to <span className="gradient-text">Build Your Brand?</span>
            </h2>
            <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl mx-auto">
              Get a free social media audit and discover how to turn your
              followers into customers.
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
                  Get Your Free Social Audit
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="group text-base sm:text-lg px-6 sm:px-8 py-4 sm:py-6 h-auto btn-ghost-glass overflow-hidden rounded-xl">
                <Link href="/results" className="flex items-center gap-2">
                  View Case Studies
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 opacity-70 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  );
}

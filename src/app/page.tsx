"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, TrendingUp, Target, Zap, Users, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FadeIn } from "@/components/animations";
import { StaggerChildren, StaggerItem } from "@/components/animations";
import { FloatingParticles } from "@/components/ui/floating-particles";

// Services data
const services = [
  {
    icon: TrendingUp,
    title: "SEO Services",
    description:
      "Dominate search results and get found by customers actively looking for your services.",
    href: "/services/seo",
    color: "brand-cyan",
  },
  {
    icon: Users,
    title: "Social Media Management",
    description:
      "Build your brand presence and engage your audience across all major platforms.",
    href: "/services/social-media",
    color: "brand-purple",
  },
  {
    icon: Target,
    title: "Paid Advertising",
    description:
      "ROI-focused Google Ads and Meta Ads campaigns that convert clicks into customers.",
    href: "/services/paid-ads",
    color: "brand-magenta",
  },
  {
    icon: Zap,
    title: "Website Design",
    description:
      "High-converting websites designed to turn visitors into leads and customers.",
    href: "/services/website-design",
    color: "brand-cyan",
  },
];

// Stats data
const stats = [
  { value: "21x", label: "Average ROAS" },
  { value: "100+", label: "Leads in 48hrs" },
  { value: "300%", label: "Revenue Growth" },
  { value: "50+", label: "Happy Clients" },
];

// FAQ data
const faqs = [
  {
    question: "How quickly can I see results?",
    answer:
      "Most clients start seeing qualified leads within the first 2-4 weeks. We focus on quick wins while building long-term sustainable growth strategies.",
  },
  {
    question: "Do you work with businesses worldwide?",
    answer:
      "Absolutely! We work with clients globally. Our strategies work anywhere Google and Meta operate, and we adapt our approach to your specific market.",
  },
  {
    question: "What makes Flowryse different from other agencies?",
    answer:
      "We're results-obsessed. Every campaign is tracked dollar-for-dollar, and we focus on ROI, not vanity metrics. If we don't deliver leads, we pause fees until we do.",
  },
  {
    question: "What platforms do you advertise on?",
    answer:
      "We specialize in Google Ads, Meta (Facebook & Instagram) Ads, and organic SEO. These platforms consistently deliver the best ROI for businesses.",
  },
  {
    question: "How do I know if my ads are working?",
    answer:
      "Full transparency with tracking dashboards showing exactly where leads come from, cost per lead, conversion rates, and ROI. No vanity metrics - just real revenue data.",
  },
];

export default function HomePage() {
  return (
    <>
      {/* Hero Section - VSL Focused */}
      <section className="relative bg-hero-surface overflow-hidden">
        {/* Floating particles background */}
        <FloatingParticles variant="luxury" count={30} />

        <div className="container py-24 md:py-32 lg:py-40 relative z-10">
          {/* Centered headline */}
          <div className="text-center max-w-4xl mx-auto mb-12 md:mb-16">
            <FadeIn delay={0.1}>
              <span className="inline-block px-4 py-1.5 mb-8 text-xs font-medium tracking-wide uppercase rounded-full bg-primary/10 text-primary border border-primary/20">
                Global Marketing Agency
              </span>
            </FadeIn>

            <FadeIn delay={0.2}>
              <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl tracking-tight mb-6 leading-[1.05]">
                More Growth. More Clients.{" "}
                <span className="gradient-accent-text">Guaranteed.</span>
              </h1>
            </FadeIn>

            <FadeIn delay={0.3}>
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Stop waiting for customers to find you. We put your business in front
                of people actively searching for your services.
              </p>
            </FadeIn>
          </div>

          {/* VSL Video - Full Width Focus */}
          <FadeIn delay={0.4}>
            <div className="relative max-w-4xl mx-auto mb-12">
              <div className="aspect-video rounded-2xl overflow-hidden shadow-glow bg-card border border-border/50">
                {/* Video placeholder - will be replaced with Bunny Stream */}
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/5 via-transparent to-brand-purple/5">
                  <div className="text-center p-8">
                    <motion.div
                      className="w-24 h-24 mx-auto mb-6 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center cursor-pointer hover:bg-primary/20 transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <motion.div
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <div className="w-0 h-0 border-l-[24px] border-l-primary border-t-[14px] border-t-transparent border-b-[14px] border-b-transparent ml-2" />
                      </motion.div>
                    </motion.div>
                    <p className="text-muted-foreground text-sm">
                      Watch how we help businesses grow
                    </p>
                  </div>
                </div>
              </div>

              {/* Floating stats badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.6 }}
                className="absolute -bottom-4 -right-4 md:-right-8 bg-card border border-border/50 rounded-xl p-4 shadow-lg backdrop-blur-sm"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-green-500" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">21x</p>
                    <p className="text-xs text-muted-foreground">Avg. ROAS</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </FadeIn>

          {/* CTA Buttons - Centered */}
          <FadeIn delay={0.5}>
            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
              <Button asChild size="lg" className="btn-hero group">
                <Link href="/contact" className="flex items-center gap-2">
                  Get Your Free Strategy Call
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/results">See Our Results</Link>
              </Button>
            </div>
          </FadeIn>

          <FadeIn delay={0.6}>
            <p className="text-center text-sm text-muted-foreground">
              Join 50+ businesses scaling profitably with targeted marketing.
            </p>
          </FadeIn>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:block z-10"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <ChevronDown className="w-6 h-6 text-muted-foreground" />
          </motion.div>
        </motion.div>

        {/* Gradient fade to next section */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-background pointer-events-none" />
      </section>

      {/* Stats Section */}
      <section className="py-16 border-b border-border/50">
        <div className="container">
          <StaggerChildren className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
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

      {/* Services Section */}
      <section className="py-20 md:py-28">
        <div className="container">
          <FadeIn className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              How We Help Your Business{" "}
              <span className="gradient-accent-text">Grow</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              From SEO to paid ads, we deliver data-driven strategies that turn
              marketing spend into measurable revenue.
            </p>
          </FadeIn>

          <StaggerChildren
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
            staggerDelay={0.1}
          >
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <StaggerItem key={service.title}>
                  <Link href={service.href} className="block group">
                    <motion.div
                      whileHover={{ y: -4 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      className="tech-card p-6 h-full"
                    >
                      <div
                        className="w-12 h-12 mb-4 rounded-lg flex items-center justify-center"
                        style={{
                          backgroundColor: `hsl(var(--${service.color}) / 0.1)`,
                          border: `1px solid hsl(var(--${service.color}) / 0.3)`,
                        }}
                      >
                        <Icon
                          className="w-6 h-6"
                          style={{ color: `hsl(var(--${service.color}))` }}
                        />
                      </div>
                      <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {service.description}
                      </p>
                    </motion.div>
                  </Link>
                </StaggerItem>
              );
            })}
          </StaggerChildren>
        </div>
      </section>

      {/* Why Us Section */}
      <section className="py-20 md:py-28 bg-muted/30">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <FadeIn direction="right">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
                Your Most Trusted{" "}
                <span className="gradient-text">Marketing Partner</span>
              </h2>
              <div className="space-y-6">
                <div className="tech-card p-6">
                  <h3 className="font-semibold mb-3 flex items-center gap-2" style={{ color: "hsl(var(--brand-cyan))" }}>
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: "hsl(var(--brand-cyan))" }} />
                    You&apos;re Getting Results
                  </h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <span className="w-1 h-1 bg-muted-foreground rounded-full" />
                      Some success with current marketing
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1 h-1 bg-muted-foreground rounded-full" />
                      Customers are responding
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1 h-1 bg-muted-foreground rounded-full" />
                      Ready to scale up
                    </li>
                  </ul>
                </div>

                <div className="tech-card p-6 shadow-brand">
                  <h3 className="font-semibold mb-3 flex items-center gap-2" style={{ color: "hsl(var(--brand-purple))" }}>
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: "hsl(var(--brand-purple))" }} />
                    We&apos;ll Add Precision
                  </h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <span className="w-1 h-1 bg-muted-foreground rounded-full" />
                      Target your exact customers
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1 h-1 bg-muted-foreground rounded-full" />
                      Track every dollar of ROI
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1 h-1 bg-muted-foreground rounded-full" />
                      Scale winners, cut losers
                    </li>
                  </ul>
                </div>
              </div>
            </FadeIn>

            <FadeIn direction="left" delay={0.2}>
              <div className="relative">
                <div className="aspect-square rounded-2xl p-1" style={{ background: "linear-gradient(135deg, hsl(var(--brand-purple) / 0.2), hsl(var(--brand-magenta) / 0.1), hsl(var(--brand-cyan) / 0.2))" }}>
                  <div className="w-full h-full rounded-2xl bg-background flex items-center justify-center">
                    <div className="text-center p-8">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        className="w-32 h-32 mx-auto mb-6 rounded-full border-2 border-dashed"
                        style={{ borderColor: "hsl(var(--brand-cyan) / 0.3)" }}
                      />
                      <p className="text-muted-foreground">
                        Data-driven results visualization coming soon
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 md:py-28">
        <div className="container max-w-3xl">
          <FadeIn className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Common <span className="gradient-accent-text">Questions</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              Everything you need to know about working with Flowryse.
            </p>
          </FadeIn>

          <FadeIn delay={0.2}>
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="tech-card px-6"
                >
                  <AccordionTrigger className="text-left font-semibold hover:no-underline py-4">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-4">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </FadeIn>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-28 bg-hero-surface">
        <div className="container">
          <FadeIn className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
              Ready to Grow Your Business?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Book a free strategy call and discover how we can help you get more
              leads and scale your business.
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

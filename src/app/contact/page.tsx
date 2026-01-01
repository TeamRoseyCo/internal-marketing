"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  CheckCircle,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { FadeIn, StaggerChildren, StaggerItem } from "@/components/animations";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const services = [
  { value: "seo", label: "SEO Services" },
  { value: "social-media", label: "Social Media Management" },
  { value: "paid-ads", label: "Paid Advertising" },
  { value: "website-design", label: "Website Design" },
  { value: "other", label: "Other / Not Sure" },
];

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "team@roseyco.com",
    href: "mailto:team@roseyco.com",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+1 (234) 567-890",
    href: "tel:+1234567890",
  },
  {
    icon: Clock,
    label: "Response Time",
    value: "Within 24 hours",
    href: null,
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Global (Remote)",
    href: null,
  },
];

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [selectedService, setSelectedService] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    // TODO: Replace with actual Supabase/API integration
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-hero-surface overflow-hidden">
        <div className="container py-24 md:py-32">
          <div className="max-w-3xl mx-auto text-center">
            <FadeIn delay={0.1}>
              <span className="inline-block px-5 py-2 mb-8 text-sm font-medium tracking-wider uppercase rounded-full bg-primary/10 text-primary border border-primary/20">
                Get In Touch
              </span>
            </FadeIn>

            <FadeIn delay={0.2}>
              <h1 className="text-5xl md:text-6xl lg:text-7xl tracking-tight mb-8 leading-[1.05]">
                Let&apos;s Grow Your{" "}
                <span className="gradient-accent-text">Business Together</span>
              </h1>
            </FadeIn>

            <FadeIn delay={0.3}>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                Book a free strategy call and discover exactly how we can help you
                get more leads, more customers, and more revenue.
              </p>
            </FadeIn>
          </div>
        </div>

        {/* Gradient fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-background pointer-events-none" />
      </section>

      {/* Contact Form Section */}
      <section className="py-24 md:py-32">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Contact Form */}
            <FadeIn direction="right">
              <div className="tech-card p-8 md:p-10">
                {isSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12"
                  >
                    <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-green-500/20 flex items-center justify-center">
                      <CheckCircle className="w-8 h-8 text-green-500" />
                    </div>
                    <h3 className="text-2xl font-bold mb-4">
                      Thanks for reaching out!
                    </h3>
                    <p className="text-muted-foreground mb-6">
                      We&apos;ve received your message and will get back to you
                      within 24 hours.
                    </p>
                    <Button
                      variant="outline"
                      onClick={() => setIsSubmitted(false)}
                    >
                      Send Another Message
                    </Button>
                  </motion.div>
                ) : (
                  <>
                    <h2 className="text-2xl font-bold mb-2">
                      Get Your Free Strategy Call
                    </h2>
                    <p className="text-muted-foreground mb-8">
                      Fill out the form below and we&apos;ll be in touch within 24
                      hours.
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="firstName">First Name *</Label>
                          <Input
                            id="firstName"
                            name="firstName"
                            placeholder="John"
                            required
                            className="bg-background"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName">Last Name *</Label>
                          <Input
                            id="lastName"
                            name="lastName"
                            placeholder="Doe"
                            required
                            className="bg-background"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address *</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="john@company.com"
                          required
                          className="bg-background"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          placeholder="+1 (234) 567-890"
                          className="bg-background"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="website">Website URL</Label>
                        <Input
                          id="website"
                          name="website"
                          type="url"
                          placeholder="https://yourwebsite.com"
                          className="bg-background"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Service Interested In *</Label>
                        <div className="grid sm:grid-cols-2 gap-2">
                          {services.map((service) => (
                            <button
                              key={service.value}
                              type="button"
                              onClick={() => setSelectedService(service.value)}
                              className={`px-4 py-3 rounded-lg border text-sm text-left transition-all ${
                                selectedService === service.value
                                  ? "border-primary bg-primary/10 text-primary"
                                  : "border-border bg-background text-muted-foreground hover:border-primary/50"
                              }`}
                            >
                              {service.label}
                            </button>
                          ))}
                        </div>
                        <input
                          type="hidden"
                          name="service"
                          value={selectedService}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="message">
                          Tell us about your business and goals *
                        </Label>
                        <Textarea
                          id="message"
                          name="message"
                          placeholder="What are you looking to achieve? What challenges are you facing?"
                          rows={4}
                          required
                          className="bg-background resize-none"
                        />
                      </div>

                      <Button
                        type="submit"
                        size="lg"
                        className="btn-hero w-full group"
                        disabled={isSubmitting || !selectedService}
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Sending...
                          </>
                        ) : (
                          <>
                            Book Your Free Strategy Call
                            <Send className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                          </>
                        )}
                      </Button>

                      <p className="text-xs text-center text-muted-foreground">
                        By submitting this form, you agree to our{" "}
                        <Link
                          href="/privacy-policy"
                          className="underline hover:text-foreground"
                        >
                          Privacy Policy
                        </Link>
                        .
                      </p>
                    </form>
                  </>
                )}
              </div>
            </FadeIn>

            {/* Contact Info */}
            <FadeIn direction="left" delay={0.2}>
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold mb-4">
                    Other Ways to Reach Us
                  </h2>
                  <p className="text-muted-foreground">
                    Prefer to reach out directly? Here&apos;s how you can contact
                    us.
                  </p>
                </div>

                <StaggerChildren className="space-y-4" staggerDelay={0.1}>
                  {contactInfo.map((info) => {
                    const Icon = info.icon;
                    const content = (
                      <motion.div
                        whileHover={{ x: 4 }}
                        className="tech-card p-5 flex items-center gap-4"
                      >
                        <div className="w-12 h-12 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center flex-shrink-0">
                          <Icon className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">
                            {info.label}
                          </p>
                          <p className="font-semibold">{info.value}</p>
                        </div>
                      </motion.div>
                    );

                    return (
                      <StaggerItem key={info.label}>
                        {info.href ? (
                          <a href={info.href}>{content}</a>
                        ) : (
                          content
                        )}
                      </StaggerItem>
                    );
                  })}
                </StaggerChildren>

                {/* What to Expect */}
                <div className="tech-card p-6 mt-8">
                  <h3 className="font-semibold mb-4 text-brand-green">
                    What to Expect
                  </h3>
                  <ul className="space-y-3 text-sm text-muted-foreground">
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-brand-green flex-shrink-0 mt-0.5" />
                      <span>
                        <strong className="text-foreground">
                          Quick Response:
                        </strong>{" "}
                        We&apos;ll get back to you within 24 hours
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-brand-green flex-shrink-0 mt-0.5" />
                      <span>
                        <strong className="text-foreground">
                          Strategy Call:
                        </strong>{" "}
                        30-minute call to understand your business and goals
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-brand-green flex-shrink-0 mt-0.5" />
                      <span>
                        <strong className="text-foreground">
                          Custom Proposal:
                        </strong>{" "}
                        Tailored plan with clear pricing and expected results
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-brand-green flex-shrink-0 mt-0.5" />
                      <span>
                        <strong className="text-foreground">No Pressure:</strong>{" "}
                        Zero obligations — just valuable insights for your
                        business
                      </span>
                    </li>
                  </ul>
                </div>

                {/* Trust Badges */}
                <div className="flex flex-wrap gap-4 pt-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    50+ Happy Clients
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    21x Average ROAS
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    Results Guaranteed
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 md:py-32 relative overflow-hidden">
        {/* Background glow effects */}
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-20"
            style={{
              background: "radial-gradient(circle, hsl(130 65% 45% / 0.15), transparent 70%)",
            }}
          />
        </div>

        <div className="container relative z-10">
          <FadeIn className="text-center mb-16">
            <span className="inline-block px-5 py-2 mb-8 text-sm font-medium tracking-wider uppercase rounded-full bg-primary/10 text-primary border border-primary/20">
              FAQ
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl tracking-tight mb-6">
              Frequently Asked{" "}
              <span className="gradient-text">Questions</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Everything you need to know about working with us.
            </p>
          </FadeIn>

          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="w-full space-y-4">
              {[
                {
                  question: "How much does it cost?",
                  answer: "Pricing depends on your specific needs and goals. Our packages typically start from $1,500/month for ongoing services. We'll provide a custom quote after understanding your business during our free strategy call.",
                },
                {
                  question: "How long until I see results?",
                  answer: "Most clients start seeing results within 2-4 weeks for paid advertising, 2-3 months for SEO, and immediately for social media engagement. We focus on quick wins while building long-term growth.",
                },
                {
                  question: "Do you require long-term contracts?",
                  answer: "No long-term contracts required. We work on a month-to-month basis because we believe in earning your business every month through results. Our clients stay because they see ROI, not because they're locked in.",
                },
                {
                  question: "What industries do you work with?",
                  answer: "We work with businesses across all industries — from e-commerce and SaaS to local services and professional firms. If you have customers to reach online, we can help you grow.",
                },
                {
                  question: "What's included in the free strategy call?",
                  answer: "During our 30-minute call, we'll analyze your current marketing efforts, identify opportunities for growth, and provide actionable recommendations — whether you work with us or not. No sales pressure, just value.",
                },
              ].map((faq, index) => (
                <div
                  key={index}
                  className="rounded-2xl p-px bg-gradient-to-br from-border/50 via-border/20 to-border/50 group hover:from-primary/20 hover:via-border/30 hover:to-primary/20 transition-all duration-500"
                >
                  <AccordionItem
                    value={`item-${index}`}
                    className="bg-card/60 backdrop-blur-xl rounded-2xl border-0 overflow-hidden relative"
                  >
                    {/* Subtle top highlight for glass effect */}
                    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                    <AccordionTrigger className="text-left text-lg md:text-xl font-semibold hover:no-underline py-6 px-6 md:px-8">
                      <span className="flex items-center gap-4">
                        <span className="w-9 h-9 rounded-xl flex items-center justify-center text-sm font-bold flex-shrink-0 bg-primary/10 text-primary border border-primary/20">
                          {index + 1}
                        </span>
                        {faq.question}
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="text-base md:text-lg text-muted-foreground pb-6 px-6 md:px-8 pl-[4.25rem] md:pl-[4.75rem] leading-relaxed">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                </div>
              ))}
            </Accordion>
          </div>
        </div>
      </section>
    </>
  );
}

"use client";

// src/app/[locale]/contact/page.tsx
// Locale-specific Contact page

import Link from "next/link";
import { use, useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, Clock, MapPin, CheckCircle, Send, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { isValidLocale, LocaleCode, getLocale } from "@/lib/locales";
import { getContactPageTranslations } from "@/lib/page-translations";

const fadeInUp = { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0 } };
const staggerContainer = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } } };
const staggerItem = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };

interface LocaleContactPageProps {
  params: Promise<{ locale: string }>;
}

export default function LocaleContactPage({ params }: LocaleContactPageProps) {
  const { locale } = use(params);
  const validLocale: LocaleCode = isValidLocale(locale) ? locale : 'us';
  const t = getContactPageTranslations(validLocale);
  const localeConfig = getLocale(validLocale);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [selectedService, setSelectedService] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const data = {
      firstName: formData.get('firstName') as string,
      lastName: formData.get('lastName') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      website: formData.get('website') as string,
      service: selectedService,
      message: formData.get('message') as string,
    };

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const result = await response.json();
        throw new Error(result.error || 'Failed to submit form');
      }

      setIsSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <section className="py-24 md:py-32">
        <div className="container">
          <motion.div className="max-w-2xl mx-auto text-center" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}>
            <div className="w-20 h-20 mx-auto mb-8 rounded-full bg-primary/10 flex items-center justify-center">
              <CheckCircle className="w-10 h-10 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{t.form.successTitle}</h1>
            <p className="text-xl text-muted-foreground mb-8">{t.form.successMessage}</p>
            <Button onClick={() => setIsSubmitted(false)} variant="outline" size="lg">
              {t.form.sendAnother}
            </Button>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="container py-16 md:py-24 lg:py-32">
          <div className="max-w-4xl mx-auto text-center">
            <motion.span className="inline-block px-5 py-2 mb-8 text-sm font-medium tracking-wider uppercase rounded-full bg-primary/10 text-primary border border-primary/20" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              {t.hero.badge}
            </motion.span>
            <motion.h1 className="text-5xl md:text-6xl lg:text-7xl tracking-tight mb-8 leading-[1.05]" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}>
              {t.hero.title} <span className="gradient-text">{t.hero.titleHighlight}</span>
            </motion.h1>
            <motion.p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }}>
              {t.hero.subtitle}
            </motion.p>
          </div>
        </div>
      </section>

      {/* Form + Contact Info */}
      <section className="py-12 md:py-20">
        <div className="container">
          <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
            {/* Form */}
            <motion.div className="lg:col-span-3" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} transition={{ duration: 0.7 }}>
              <div className="service-card service-card-green p-8 md:p-10">
                <h2 className="text-2xl md:text-3xl font-bold mb-2">{t.form.title}</h2>
                <p className="text-muted-foreground mb-8">{t.form.subtitle}</p>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">{t.form.firstName} *</Label>
                      <Input
                        id="firstName"
                        name="firstName"
                        placeholder="John"
                        required
                        className="bg-background"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">{t.form.lastName} *</Label>
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
                    <Label htmlFor="email">{t.form.email} *</Label>
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
                    <Label htmlFor="phone">{t.form.phone}</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder={localeConfig.phone}
                      className="bg-background"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="website">{t.form.website}</Label>
                    <Input
                      id="website"
                      name="website"
                      type="url"
                      placeholder="https://yourwebsite.com"
                      className="bg-background"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>{t.form.serviceLabel} *</Label>
                    <div className="grid sm:grid-cols-2 gap-2">
                      {t.form.services.map((service) => (
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
                    <Label htmlFor="message">{t.form.messageLabel} *</Label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder={t.form.messagePlaceholder}
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
                        {t.form.submitting}
                      </>
                    ) : (
                      <>
                        {t.form.submit}
                        <Send className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </Button>

                  {error && (
                    <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
                      {error}
                    </div>
                  )}

                  <p className="text-xs text-center text-muted-foreground">
                    {t.form.privacyText}{" "}
                    <Link href={`/${validLocale}/privacy-policy`} className="underline hover:text-foreground">{t.form.privacyLink}</Link>
                  </p>
                </form>
              </div>
            </motion.div>

            {/* Contact Info */}
            <motion.div className="lg:col-span-2 space-y-8" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
              <motion.div variants={staggerItem}>
                <h3 className="text-xl font-semibold mb-2">{t.contactInfo.title}</h3>
                <p className="text-muted-foreground mb-6">{t.contactInfo.subtitle}</p>
                <div className="space-y-4">
                  {[
                    { icon: Mail, label: t.contactInfo.email.label, value: t.contactInfo.email.value, href: `mailto:${t.contactInfo.email.value}` },
                    { icon: Phone, label: t.contactInfo.phone.label, value: localeConfig.phone, href: `tel:${localeConfig.phone.replace(/\s/g, '')}` },
                    { icon: Clock, label: t.contactInfo.response.label, value: t.contactInfo.response.value },
                    { icon: MapPin, label: t.contactInfo.location.label, value: localeConfig.address },
                  ].map((item) => {
                    const Icon = item.icon;
                    const content = (
                      <div className="flex items-start gap-4 p-4 rounded-xl bg-card/50 border border-border/50">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <Icon className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">{item.label}</p>
                          <p className="font-medium">{item.value}</p>
                        </div>
                      </div>
                    );
                    return item.href ? (
                      <a key={item.label} href={item.href} className="block hover:opacity-80 transition-opacity">{content}</a>
                    ) : (
                      <div key={item.label}>{content}</div>
                    );
                  })}
                </div>
              </motion.div>

              <motion.div variants={staggerItem}>
                <h3 className="text-xl font-semibold mb-4">{t.whatToExpect.title}</h3>
                <ul className="space-y-3">
                  {t.whatToExpect.items.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground"><strong className="text-foreground">{item.title}</strong> {item.description}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              <motion.div variants={staggerItem} className="flex flex-wrap gap-3">
                {t.trustBadges.map((badge) => (
                  <span key={badge} className="px-4 py-2 text-sm font-medium rounded-full bg-primary/10 text-primary border border-primary/20">
                    {badge}
                  </span>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 md:py-32">
        <div className="container max-w-4xl">
          <motion.div className="text-center mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} transition={{ duration: 0.7 }}>
            <span className="inline-block px-4 py-1.5 mb-6 text-sm font-medium tracking-wider uppercase rounded-full bg-primary/10 text-primary border border-primary/20">{t.faq.badge}</span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl tracking-tight mb-6">{t.faq.title} <span className="gradient-accent-text">{t.faq.titleHighlight}</span></h2>
            <p className="text-xl text-muted-foreground">{t.faq.subtitle}</p>
          </motion.div>

          <motion.div className="space-y-4" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            {t.faq.questions.map((faq, index) => (
              <motion.div key={index} variants={staggerItem}>
                <Accordion type="single" collapsible>
                  <div className="rounded-2xl p-px bg-gradient-to-br from-border/50 via-border/20 to-border/50 group hover:from-primary/20 hover:via-border/30 hover:to-primary/20 transition-all duration-500">
                    <AccordionItem value={`item-${index}`} className="bg-card/60 backdrop-blur-xl rounded-2xl border-0 overflow-hidden relative">
                      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                      <AccordionTrigger className="text-left text-lg md:text-xl font-semibold hover:no-underline py-6 px-6 md:px-8">
                        <span className="flex items-center gap-4">
                          <span className="w-9 h-9 rounded-xl flex items-center justify-center text-sm font-bold flex-shrink-0 bg-primary/10 text-primary border border-primary/20">{index + 1}</span>
                          {faq.question}
                        </span>
                      </AccordionTrigger>
                      <AccordionContent className="text-base md:text-lg text-muted-foreground pb-6 px-6 md:px-8 pl-[4.25rem] md:pl-[4.75rem] leading-relaxed">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  </div>
                </Accordion>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </>
  );
}

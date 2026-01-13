"use client";

// src/app/[locale]/services/social-media/page.tsx
// Locale-specific Social Media service page
// Adapts the existing social-media page with locale translations

import Link from "next/link";
import { use } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Instagram, Linkedin, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import { isValidLocale, LocaleCode } from "@/lib/locales";
import { getTranslations } from "@/lib/translations";
import { ServiceStructuredData } from "@/components/seo/structured-data";

const fadeInUp = { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0 } };
const staggerContainer = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.1 } } };
const staggerItem = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } };

const features = [
  { title: "Content Creation", description: "Scroll-stopping graphics, videos, and copy tailored to each platform." },
  { title: "Community Management", description: "Active engagement with your followers to build brand loyalty." },
  { title: "Social Strategy", description: "Data-driven content calendars aligned with your business goals." },
  { title: "Influencer Outreach", description: "Connect with relevant influencers to expand your reach." },
  { title: "Paid Social Campaigns", description: "Targeted ads that convert followers into customers." },
  { title: "Analytics & Reporting", description: "Monthly reports with engagement, reach, and growth metrics." },
];

const platforms = [
  { icon: Instagram, name: "Instagram", color: "hsl(0 75% 50%)", url: "https://www.instagram.com/roseyco.official" },
  { icon: Linkedin, name: "LinkedIn", color: "hsl(140 50% 38%)", url: "https://www.linkedin.com/company/rosey-co/" },
];

interface LocaleSocialMediaPageProps {
  params: Promise<{ locale: string }>;
}

export default function LocaleSocialMediaPage({ params }: LocaleSocialMediaPageProps) {
  const { locale } = use(params);
  const validLocale: LocaleCode = isValidLocale(locale) ? locale : 'us';
  const t = getTranslations(validLocale);

  // Locale-specific content
  const content = {
    us: {
      badge: "Social Media Management",
      title: "Build a Brand People",
      titleHighlight: "Actually Follow",
      subtitle: "Turn your social media into a lead-generating machine. We create content that stops the scroll, builds community, and converts followers into customers.",
      ctaPrimary: "Get Your Social Strategy",
      ctaSecondary: "See Our Work",
      platformsText: "We manage your presence across all major platforms",
      featuresTitle: "Full-Service Social",
      featuresTitleHighlight: "Management",
      featuresSubtitle: "From content creation to community building, we handle everything so you can focus on your business.",
      processTitle: "Our",
      processTitleHighlight: "Process",
      processSubtitle: "A systematic approach to building and growing your social presence.",
      contentTitle: "Content That Converts",
      contentSubtitle: "We don't just post content for the sake of posting. Every piece of content we create is designed to engage your audience and drive them toward becoming customers.",
      contentFeatures: ["Scroll-Stopping Graphics", "Engaging Video Content", "Strategic Copywriting", "Story & Reel Creation"],
      ctaBadge: "Start Growing",
      ctaTitle: "Ready to",
      ctaTitleHighlight: "Build Your Brand?",
      ctaSubtitle: "Get a free social media audit and discover how to turn your followers into customers.",
      ctaButton: "Get Your Free Social Audit",
      ctaButtonSecondary: "View Case Studies",
    },
    nl: {
      badge: "Social Media Management",
      title: "Bouw een Merk Dat Mensen",
      titleHighlight: "Echt Volgen",
      subtitle: "Maak van je social media een leadgenererende machine. We creëren content die de scroll stopt, community bouwt en volgers omzet in klanten.",
      ctaPrimary: "Krijg Je Social Strategie",
      ctaSecondary: "Bekijk Ons Werk",
      platformsText: "We beheren je aanwezigheid op alle belangrijke platforms",
      featuresTitle: "Full-Service Social",
      featuresTitleHighlight: "Management",
      featuresSubtitle: "Van content creatie tot community building, wij regelen alles zodat jij je kunt focussen op je bedrijf.",
      processTitle: "Ons",
      processTitleHighlight: "Proces",
      processSubtitle: "Een systematische aanpak voor het bouwen en laten groeien van je social presence.",
      contentTitle: "Content Die Converteert",
      contentSubtitle: "We posten geen content om te posten. Elk stuk content dat we creëren is ontworpen om je publiek te betrekken en ze richting klant te drijven.",
      contentFeatures: ["Scroll-Stoppende Graphics", "Engaging Video Content", "Strategisch Copywriting", "Story & Reel Creatie"],
      ctaBadge: "Begin Met Groeien",
      ctaTitle: "Klaar Om Je",
      ctaTitleHighlight: "Merk Te Bouwen?",
      ctaSubtitle: "Krijg een gratis social media audit en ontdek hoe je volgers omzet in klanten.",
      ctaButton: "Gratis Social Audit",
      ctaButtonSecondary: "Bekijk Case Studies",
    },
    dk: {
      badge: "Social Media Management",
      title: "Byg et Brand Folk",
      titleHighlight: "Rent Faktisk Følger",
      subtitle: "Gør dine sociale medier til en leadgenererende maskine. Vi skaber indhold, der stopper scroll, bygger fællesskab og konverterer følgere til kunder.",
      ctaPrimary: "Få Din Social Strategi",
      ctaSecondary: "Se Vores Arbejde",
      platformsText: "Vi styrer din tilstedeværelse på alle store platforme",
      featuresTitle: "Full-Service Social",
      featuresTitleHighlight: "Management",
      featuresSubtitle: "Fra content skabelse til community building, vi håndterer alt, så du kan fokusere på din virksomhed.",
      processTitle: "Vores",
      processTitleHighlight: "Proces",
      processSubtitle: "En systematisk tilgang til at bygge og vækste din sociale tilstedeværelse.",
      contentTitle: "Indhold Der Konverterer",
      contentSubtitle: "Vi poster ikke indhold for at poste. Hvert stykke indhold vi skaber er designet til at engagere dit publikum og drive dem mod at blive kunder.",
      contentFeatures: ["Scroll-Stoppende Grafik", "Engagerende Videoindhold", "Strategisk Copywriting", "Story & Reel Skabelse"],
      ctaBadge: "Begynd At Vokse",
      ctaTitle: "Klar Til At",
      ctaTitleHighlight: "Bygge Dit Brand?",
      ctaSubtitle: "Få en gratis social media audit og opdag, hvordan du konverterer følgere til kunder.",
      ctaButton: "Få Din Gratis Social Audit",
      ctaButtonSecondary: "Se Case Studies",
    },
  };

  // AU, UK, IE use US English content
  const usContent = content.us;
  const fullContent: Record<LocaleCode, typeof usContent> = {
    ...content,
    au: { ...usContent, badge: "Social Media Management Australia" },
    uk: { ...usContent, badge: "Social Media Management UK" },
    ie: { ...usContent, badge: "Social Media Management Ireland" },
  };

  const c = fullContent[validLocale];

  return (
    <>
      {/* Service Structured Data */}
      <ServiceStructuredData locale={validLocale} service="social-media" />

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="container py-16 md:py-24 lg:py-32">
          <div className="max-w-5xl mx-auto text-center">
            <motion.span className="inline-block px-5 py-2 mb-8 text-sm font-medium tracking-wider uppercase rounded-full bg-[hsl(140_50%_38%/0.1)] text-[hsl(140_50%_38%)] border border-[hsl(140_50%_38%/0.2)]" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              {c.badge}
            </motion.span>
            <motion.h1 className="text-5xl md:text-6xl lg:text-7xl tracking-tight mb-8 leading-[1.05]" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}>
              {c.title} <span className="gradient-text">{c.titleHighlight}</span>
            </motion.h1>
            <motion.p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-12" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }}>
              {c.subtitle}
            </motion.p>
            <motion.div className="flex flex-col sm:flex-row items-center justify-center gap-4" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}>
              <Button asChild size="lg" className="btn-hero text-base sm:text-lg px-6 sm:px-10 py-4 sm:py-6 h-auto">
                <Link href={`/${validLocale}/contact`} className="flex items-center gap-2 sm:gap-3">{c.ctaPrimary}<ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" /></Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="group text-base sm:text-lg px-6 sm:px-8 py-4 sm:py-6 h-auto btn-ghost-glass overflow-hidden rounded-xl">
                <Link href={`/${validLocale}/results`} className="flex items-center gap-2">{c.ctaSecondary}<ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 opacity-70 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" /></Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 md:py-28">
        <div className="container">
          <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}>
            {[{ value: 5, suffix: "x", label: "Engagement Growth" }, { value: 250, suffix: "%", label: "Follower Increase" }, { value: 40, suffix: "+", label: "Posts Per Month" }].map((stat, index) => (
              <motion.div key={index} className="text-center" variants={staggerItem} transition={{ duration: 0.6 }}>
                <motion.p className="text-5xl md:text-6xl lg:text-7xl font-bold gradient-text mb-3" whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 300 }}>
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} duration={2 + index * 0.3} />
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
          <motion.p className="text-center text-muted-foreground mb-10" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            {c.platformsText}
          </motion.p>
          <motion.div className="flex flex-wrap justify-center gap-6 md:gap-8" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            {platforms.map((platform) => {
              const Icon = platform.icon;
              return (
                <motion.a
                  key={platform.name}
                  href={platform.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  variants={staggerItem}
                  whileHover={{ scale: 1.05, y: -4 }}
                  className="service-card service-card-purple px-8 py-5 flex items-center gap-4 cursor-pointer"
                >
                  <Icon className="w-8 h-8" style={{ color: platform.color }} />
                  <span className="font-semibold text-lg">{platform.name}</span>
                </motion.a>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 md:py-32">
        <div className="container">
          <motion.div className="text-center mb-16 md:mb-20" initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeInUp} transition={{ duration: 0.7 }}>
            <h2 className="text-4xl md:text-5xl lg:text-6xl tracking-tight mb-6">{c.featuresTitle} <span className="gradient-accent-text">{c.featuresTitleHighlight}</span></h2>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">{c.featuresSubtitle}</p>
          </motion.div>
          <motion.div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }}>
            {features.map((feature) => (
              <motion.div key={feature.title} variants={staggerItem} transition={{ duration: 0.5 }}>
                <motion.div whileHover={{ y: -4 }} transition={{ type: "spring", stiffness: 300 }} className="service-card service-card-purple p-7 md:p-8 h-full">
                  <div className="w-12 h-12 mb-5 rounded-xl bg-[hsl(140_50%_38%/0.15)] border border-[hsl(140_50%_38%/0.3)] flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-[hsl(140_50%_38%)]" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-base text-muted-foreground leading-relaxed">{feature.description}</p>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-30" style={{ background: "radial-gradient(circle, hsl(140 50% 38% / 0.15), transparent 70%)" }} />
        </div>
        <div className="container relative z-10">
          <motion.div className="text-center max-w-4xl mx-auto" initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeInUp} transition={{ duration: 0.7 }}>
            <motion.div className="inline-block mb-8" initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
              <span className="px-5 py-2 text-sm font-medium tracking-wider uppercase rounded-full bg-primary/10 text-primary border border-primary/20">{c.ctaBadge}</span>
            </motion.div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl tracking-tight mb-8">{c.ctaTitle} <span className="gradient-text">{c.ctaTitleHighlight}</span></h2>
            <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl mx-auto">{c.ctaSubtitle}</p>
            <motion.div className="flex flex-col sm:flex-row items-center justify-center gap-4" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3, duration: 0.6 }}>
              <Button asChild size="lg" className="btn-hero text-base sm:text-lg px-6 sm:px-10 py-4 sm:py-6 h-auto">
                <Link href={`/${validLocale}/contact`} className="flex items-center gap-2 sm:gap-3">{c.ctaButton}<ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" /></Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="group text-base sm:text-lg px-6 sm:px-8 py-4 sm:py-6 h-auto btn-ghost-glass overflow-hidden rounded-xl">
                <Link href={`/${validLocale}/results`} className="flex items-center gap-2">{c.ctaButtonSecondary}<ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 opacity-70 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" /></Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  );
}

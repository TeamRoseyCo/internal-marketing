"use client";

// src/app/[locale]/services/website-design/page.tsx
// Locale-specific Website Design service page

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Zap, Smartphone, Search, Palette, Code2, Gauge, CheckCircle, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import { isValidLocale, LocaleCode } from "@/lib/locales";
import { ServiceStructuredData } from "@/components/seo/structured-data";

const fadeInUp = { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0 } };
const staggerContainer = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.1 } } };
const staggerItem = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } };

interface LocaleWebDesignPageProps {
  params: { locale: string };
}

export default function WebsiteDesignPageClient({ params }: LocaleWebDesignPageProps) {
  const { locale } = params;
  const validLocale: LocaleCode = isValidLocale(locale) ? locale : 'us';

  const content = {
    us: {
      badge: "Website Design",
      title: "Websites That",
      titleHighlight: "Convert",
      subtitle: "Beautiful, fast, conversion-focused websites that turn visitors into customers. Built with modern technology for peak performance.",
      ctaPrimary: "Get Your Free Website Audit",
      ctaSecondary: "See Our Work",
      stats: [{ value: 2.5, suffix: "x", label: "Conversion Boost", isDecimal: true }, { value: 2, suffix: "s", label: "Load Time", prefix: "<" }, { value: 100, suffix: "%", label: "Mobile Optimized" }],
      techText: "Built with modern technology for peak performance",
      tech: [{ name: "Next.js", desc: "React Framework" }, { name: "Tailwind CSS", desc: "Modern Styling" }, { name: "Vercel", desc: "Fast Hosting" }],
      featuresTitle: "Websites Built for",
      featuresTitleHighlight: "Results",
      featuresSubtitle: "More than just pretty designs — we build websites that drive measurable business growth.",
      features: [
        { title: "Conversion-Focused", description: "Every element designed to turn visitors into leads and customers." },
        { title: "Mobile-First", description: "Responsive design that looks perfect on every device." },
        { title: "Lightning Fast", description: "Optimized for speed — because slow sites lose customers." },
        { title: "SEO-Ready", description: "Built with search engines in mind from day one." },
        { title: "Analytics Integrated", description: "Know exactly how visitors interact with your site." },
        { title: "Easy to Update", description: "Simple content management so you stay in control." },
      ],
      processTitle: "Our Design",
      processTitleHighlight: "Process",
      processSubtitle: "A proven process that delivers websites on time and on budget.",
      processSteps: [
        { title: "Discovery & Strategy", desc: "We learn about your business, goals, and target audience to create a conversion-focused strategy." },
        { title: "Design & Wireframes", desc: "We create stunning designs that reflect your brand and guide visitors toward conversion." },
        { title: "Development", desc: "We build your website with clean code, fast performance, and SEO-ready structure." },
        { title: "Testing & Optimization", desc: "Rigorous testing across devices and browsers ensures a flawless user experience." },
        { title: "Launch & Support", desc: "We launch your site and provide ongoing support to keep it performing at its best." },
      ],
      mobileTitle: "Mobile-First Design",
      mobileSubtitle: "Over 60% of web traffic comes from mobile devices. We design for mobile first, ensuring your site looks and performs beautifully on every screen size.",
      mobileFeatures: ["Responsive on All Devices", "Touch-Optimized Interactions", "Fast Mobile Load Times", "Mobile-First SEO"],
      perfTitle: "Lightning Fast Performance",
      perfSubtitle: "Every second counts. Slow sites lose visitors and rankings. We optimize every aspect of your site for blazing-fast load times.",
      perfFeatures: ["Image Optimization", "Code Minification", "CDN Delivery", "Core Web Vitals"],
      ctaBadge: "Get Started",
      ctaTitle: "Ready for a Website",
      ctaTitleHighlight: "That Works?",
      ctaSubtitle: "Get a free website audit and discover how a high-converting site can transform your business.",
      ctaButton: "Get Your Free Website Audit",
      ctaButtonSecondary: "View Case Studies",
    },
    nl: {
      badge: "Website Ontwerp",
      title: "Websites Die",
      titleHighlight: "Converteren",
      subtitle: "Mooie, snelle, conversie-gerichte websites die bezoekers omzetten in klanten. Gebouwd met moderne technologie voor topprestaties.",
      ctaPrimary: "Gratis Website Audit",
      ctaSecondary: "Bekijk Ons Werk",
      stats: [{ value: 2.5, suffix: "x", label: "Conversie Boost", isDecimal: true }, { value: 2, suffix: "s", label: "Laadtijd", prefix: "<" }, { value: 100, suffix: "%", label: "Mobiel Geoptimaliseerd" }],
      techText: "Gebouwd met moderne technologie voor topprestaties",
      tech: [{ name: "Next.js", desc: "React Framework" }, { name: "Tailwind CSS", desc: "Moderne Styling" }, { name: "Vercel", desc: "Snelle Hosting" }],
      featuresTitle: "Websites Gebouwd voor",
      featuresTitleHighlight: "Resultaten",
      featuresSubtitle: "Meer dan alleen mooie designs — we bouwen websites die meetbare bedrijfsgroei stimuleren.",
      features: [
        { title: "Conversie-Gericht", description: "Elk element ontworpen om bezoekers om te zetten in leads en klanten." },
        { title: "Mobile-First", description: "Responsive design dat er perfect uitziet op elk apparaat." },
        { title: "Razendssnel", description: "Geoptimaliseerd voor snelheid — want trage sites verliezen klanten." },
        { title: "SEO-Klaar", description: "Gebouwd met zoekmachines in gedachten vanaf dag één." },
        { title: "Analytics Geïntegreerd", description: "Weet precies hoe bezoekers met je site omgaan." },
        { title: "Makkelijk Te Updaten", description: "Eenvoudig contentbeheer zodat je de controle houdt." },
      ],
      processTitle: "Ons Design",
      processTitleHighlight: "Proces",
      processSubtitle: "Een bewezen proces dat websites op tijd en binnen budget oplevert.",
      processSteps: [
        { title: "Ontdekking & Strategie", desc: "We leren over je bedrijf, doelen en doelgroep om een conversie-gerichte strategie te creëren." },
        { title: "Design & Wireframes", desc: "We creëren prachtige designs die je merk weerspiegelen en bezoekers naar conversie leiden." },
        { title: "Ontwikkeling", desc: "We bouwen je website met schone code, snelle prestaties en SEO-klare structuur." },
        { title: "Testen & Optimalisatie", desc: "Rigoureuze tests op alle apparaten en browsers zorgen voor een foutloze gebruikerservaring." },
        { title: "Lancering & Ondersteuning", desc: "We lanceren je site en bieden doorlopende ondersteuning om deze optimaal te laten presteren." },
      ],
      mobileTitle: "Mobile-First Design",
      mobileSubtitle: "Meer dan 60% van webverkeer komt van mobiele apparaten. We ontwerpen mobile-first, zodat je site er op elk schermformaat mooi uitziet en presteert.",
      mobileFeatures: ["Responsive op Alle Apparaten", "Touch-Geoptimaliseerde Interacties", "Snelle Mobiele Laadtijden", "Mobile-First SEO"],
      perfTitle: "Razendsnelle Prestaties",
      perfSubtitle: "Elke seconde telt. Trage sites verliezen bezoekers en rankings. We optimaliseren elk aspect van je site voor bliksemsnelle laadtijden.",
      perfFeatures: ["Afbeelding Optimalisatie", "Code Minificatie", "CDN Levering", "Core Web Vitals"],
      ctaBadge: "Aan de Slag",
      ctaTitle: "Klaar voor een Website",
      ctaTitleHighlight: "Die Werkt?",
      ctaSubtitle: "Krijg een gratis website audit en ontdek hoe een hoog-converterende site je bedrijf kan transformeren.",
      ctaButton: "Gratis Website Audit",
      ctaButtonSecondary: "Bekijk Case Studies",
    },
    dk: {
      badge: "Webdesign",
      title: "Hjemmesider Der",
      titleHighlight: "Konverterer",
      subtitle: "Smukke, hurtige, konverteringsfokuserede hjemmesider, der omdanner besøgende til kunder. Bygget med moderne teknologi for top ydeevne.",
      ctaPrimary: "Få Din Gratis Website Audit",
      ctaSecondary: "Se Vores Arbejde",
      stats: [{ value: 2.5, suffix: "x", label: "Konvertering Boost", isDecimal: true }, { value: 2, suffix: "s", label: "Indlæsningstid", prefix: "<" }, { value: 100, suffix: "%", label: "Mobil Optimeret" }],
      techText: "Bygget med moderne teknologi for top ydeevne",
      tech: [{ name: "Next.js", desc: "React Framework" }, { name: "Tailwind CSS", desc: "Moderne Styling" }, { name: "Vercel", desc: "Hurtig Hosting" }],
      featuresTitle: "Hjemmesider Bygget til",
      featuresTitleHighlight: "Resultater",
      featuresSubtitle: "Mere end bare flotte designs — vi bygger hjemmesider, der driver målbar forretningsvækst.",
      features: [
        { title: "Konverteringsfokuseret", description: "Hvert element designet til at omdanne besøgende til leads og kunder." },
        { title: "Mobile-First", description: "Responsive design, der ser perfekt ud på alle enheder." },
        { title: "Lynhurtig", description: "Optimeret til hastighed — fordi langsomme sider mister kunder." },
        { title: "SEO-Klar", description: "Bygget med søgemaskiner i tankerne fra dag et." },
        { title: "Analytics Integreret", description: "Ved præcis, hvordan besøgende interagerer med din side." },
        { title: "Nem At Opdatere", description: "Simpel indholdsstyring, så du bevarer kontrollen." },
      ],
      processTitle: "Vores Design",
      processTitleHighlight: "Proces",
      processSubtitle: "En bevist proces, der leverer hjemmesider til tiden og inden for budget.",
      processSteps: [
        { title: "Opdagelse & Strategi", desc: "Vi lærer om din virksomhed, mål og målgruppe for at skabe en konverteringsfokuseret strategi." },
        { title: "Design & Wireframes", desc: "Vi skaber fantastiske designs, der afspejler dit brand og guider besøgende mod konvertering." },
        { title: "Udvikling", desc: "Vi bygger din hjemmeside med ren kode, hurtig ydeevne og SEO-klar struktur." },
        { title: "Test & Optimering", desc: "Grundig test på tværs af enheder og browsere sikrer en fejlfri brugeroplevelse." },
        { title: "Launch & Support", desc: "Vi lancerer din side og giver løbende support for at holde den på sit bedste." },
      ],
      mobileTitle: "Mobile-First Design",
      mobileSubtitle: "Over 60% af webtrafik kommer fra mobile enheder. Vi designer mobile-first og sikrer, at din side ser ud og performer smukt på alle skærmstørrelser.",
      mobileFeatures: ["Responsive På Alle Enheder", "Touch-Optimerede Interaktioner", "Hurtige Mobile Indlæsningstider", "Mobile-First SEO"],
      perfTitle: "Lynhurtig Ydeevne",
      perfSubtitle: "Hvert sekund tæller. Langsomme sider mister besøgende og rankings. Vi optimerer hvert aspekt af din side for lynhurtige indlæsningstider.",
      perfFeatures: ["Billede Optimering", "Kode Minificering", "CDN Levering", "Core Web Vitals"],
      ctaBadge: "Kom I Gang",
      ctaTitle: "Klar Til En Hjemmeside",
      ctaTitleHighlight: "Der Virker?",
      ctaSubtitle: "Få en gratis website audit og opdag, hvordan en højt konverterende side kan transformere din virksomhed.",
      ctaButton: "Få Din Gratis Website Audit",
      ctaButtonSecondary: "Se Case Studies",
    },
  };

  // AU, UK, IE use US English content
  const usContent = content.us;
  const fullContent: Record<LocaleCode, typeof usContent> = {
    ...content,
    au: { ...usContent, badge: "Website Design Australia" },
    uk: { ...usContent, badge: "Website Design UK" },
    ie: { ...usContent, badge: "Website Design Ireland" },
  };

  const c = fullContent[validLocale];

  return (
    <>
      {/* Service Structured Data */}
      <ServiceStructuredData locale={validLocale} service="website-design" />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="container py-16 md:py-24 lg:py-32">
          <div className="max-w-5xl mx-auto text-center">
            <motion.span className="inline-block px-5 py-2 mb-8 text-sm font-medium tracking-wider uppercase rounded-full bg-[hsl(355_70%_45%/0.1)] text-[hsl(355_70%_45%)] border border-[hsl(355_70%_45%/0.2)]" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              {c.badge}
            </motion.span>
            <motion.h1 className="text-5xl md:text-6xl lg:text-7xl tracking-tight mb-8 leading-[1.05]" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}>
              {c.title} <span className="gradient-accent-text">{c.titleHighlight}</span>
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

      {/* Belfast-Specific Callout - UK locale only */}
      {validLocale === "uk" && (
        <section className="py-8">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <Link
                href="/uk/website-design-belfast/"
                className="tech-card p-6 md:p-8 flex flex-col sm:flex-row items-start sm:items-center gap-4 hover:border-primary/50 transition-all group"
              >
                <div className="flex-shrink-0">
                  <MapPin className="w-8 h-8 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg mb-1 group-hover:text-primary transition-colors">
                    Looking for Web Design in Belfast?
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    See our Belfast-specific website design services tailored for local businesses.
                  </p>
                </div>
                <ArrowRight className="w-5 h-5 text-primary flex-shrink-0 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Stats */}
      <section className="py-20 md:py-28">
        <div className="container">
          <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}>
            {c.stats.map((stat, index) => (
              <motion.div key={index} className="text-center" variants={staggerItem} transition={{ duration: 0.6 }}>
                <motion.p className="text-5xl md:text-6xl lg:text-7xl font-bold gradient-text mb-3" whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 300 }}>
                  {stat.prefix || ""}{stat.isDecimal ? <>{stat.value}{stat.suffix}</> : <AnimatedCounter value={stat.value} suffix={stat.suffix} duration={2 + index * 0.3} />}
                </motion.p>
                <p className="text-base md:text-lg text-muted-foreground">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 md:py-32">
        <div className="container">
          <motion.div className="text-center mb-16 md:mb-20" initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeInUp} transition={{ duration: 0.7 }}>
            <h2 className="text-4xl md:text-5xl lg:text-6xl tracking-tight mb-6">{c.featuresTitle} <span className="gradient-accent-text">{c.featuresTitleHighlight}</span></h2>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">{c.featuresSubtitle}</p>
          </motion.div>
          <motion.div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }}>
            {c.features.map((feature) => (
              <motion.div key={feature.title} variants={staggerItem} transition={{ duration: 0.5 }}>
                <motion.div whileHover={{ y: -4 }} transition={{ type: "spring", stiffness: 300 }} className="service-card service-card-crimson p-7 md:p-8 h-full">
                  <div className="w-12 h-12 mb-5 rounded-xl bg-[hsl(355_70%_45%/0.15)] border border-[hsl(355_70%_45%/0.3)] flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-[hsl(355_70%_45%)]" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-base text-muted-foreground leading-relaxed">{feature.description}</p>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Mobile First */}
      <section className="py-24 md:py-32">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.7 }}>
              <div className="service-card service-card-green p-8 md:p-10">
                <div className="w-16 h-16 mb-6 rounded-2xl bg-[hsl(130_65%_45%/0.15)] border border-[hsl(130_65%_45%/0.3)] flex items-center justify-center">
                  <Smartphone className="w-8 h-8 text-[hsl(130_65%_45%)]" />
                </div>
                <h3 className="text-3xl md:text-4xl font-bold mb-4">{c.mobileTitle}</h3>
                <p className="text-lg text-muted-foreground mb-8 leading-relaxed">{c.mobileSubtitle}</p>
                <ul className="space-y-4">
                  {c.mobileFeatures.map((item) => (
                    <li key={item} className="flex items-center gap-3 text-base">
                      <span className="w-6 h-6 rounded-full bg-[hsl(130_65%_45%/0.15)] flex items-center justify-center flex-shrink-0">
                        <CheckCircle className="w-4 h-4 text-[hsl(130_65%_45%)]" />
                      </span>
                      <span className="text-foreground/90">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.7, delay: 0.2 }}>
              <div className="relative">
                <div className="aspect-square rounded-3xl p-1" style={{ background: "linear-gradient(135deg, hsl(276 60% 55% / 0.2), hsl(220 70% 60% / 0.1))" }}>
                  <div className="w-full h-full rounded-3xl bg-background/80 backdrop-blur-sm flex items-center justify-center border border-border/30">
                    <div className="text-center p-8">
                      <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 3, repeat: Infinity }} className="w-24 h-44 mx-auto mb-6 rounded-2xl bg-[hsl(130_65%_45%/0.1)] border-2 border-[hsl(130_65%_45%/0.3)] flex items-center justify-center">
                        <Smartphone className="w-12 h-12 text-[hsl(130_65%_45%)]" />
                      </motion.div>
                      <p className="text-6xl md:text-7xl font-bold gradient-text mb-4"><AnimatedCounter value={60} suffix="%+" duration={2} /></p>
                      <p className="text-lg text-muted-foreground">Mobile Traffic</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-30" style={{ background: "radial-gradient(circle, hsl(220 70% 60% / 0.15), transparent 70%)" }} />
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

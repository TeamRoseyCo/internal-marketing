"use client";

// src/app/[locale]/services/paid-ads/page.tsx
// Locale-specific Paid Ads service page

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Target, Search, BarChart3, DollarSign, MousePointer2, TrendingUp, CheckCircle, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import { isValidLocale, LocaleCode } from "@/lib/locales";
import { ServiceStructuredData } from "@/components/seo/structured-data";

const fadeInUp = { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0 } };
const staggerContainer = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.1 } } };
const staggerItem = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } };

interface LocalePaidAdsPageProps {
  params: { locale: string };
}

export default function PaidAdsPageClient({ params }: LocalePaidAdsPageProps) {
  const { locale } = params;
  const validLocale: LocaleCode = isValidLocale(locale) ? locale : 'us';

  const content = {
    us: {
      badge: "Paid Advertising",
      title: "Ads That Pay for",
      titleHighlight: "Themselves",
      subtitle: "ROI-focused Google Ads and Meta Ads campaigns that convert clicks into customers. Every dollar tracked, every result measured.",
      ctaPrimary: "Get Your Free Ads Audit",
      ctaSecondary: "See ROAS Results",
      stats: [{ value: 6, suffix: "x+", label: "Average ROAS" }, { value: 8, suffix: ".2x", label: "Peak ROAS" }, { value: 40, suffix: "%", label: "Lower Cost Per Lead" }],
      platformsText: "We manage campaigns across all major advertising platforms",
      platforms: [{ name: "Google Ads", desc: "Search & Display" }, { name: "Meta Ads", desc: "Facebook & Instagram" }, { name: "YouTube Ads", desc: "Video Marketing" }],
      featuresTitle: "Full-Funnel Ad",
      featuresTitleHighlight: "Management",
      featuresSubtitle: "From awareness to conversion, we build ad campaigns that drive measurable revenue.",
      features: [
        { title: "Google Ads", description: "Search, Display, Shopping, and YouTube campaigns that capture intent." },
        { title: "Meta Ads", description: "Facebook and Instagram ads that reach your ideal customers." },
        { title: "Retargeting", description: "Bring back visitors who didn't convert the first time." },
        { title: "Conversion Tracking", description: "Know exactly which ads drive leads and sales." },
        { title: "Landing Pages", description: "High-converting pages designed to maximize your ad ROI." },
        { title: "A/B Testing", description: "Continuous testing to improve performance over time." },
      ],
      processTitle: "Our Ad",
      processTitleHighlight: "Process",
      processSubtitle: "A data-driven methodology that maximizes your return on ad spend.",
      processSteps: [
        { title: "Account Audit", desc: "We analyze your current ad accounts, identify wasted spend, and uncover growth opportunities." },
        { title: "Strategy & Setup", desc: "We build your campaigns from the ground up with proper tracking, targeting, and creative assets." },
        { title: "Launch & Test", desc: "We launch your campaigns with multiple ad variations to find what resonates with your audience." },
        { title: "Optimize & Scale", desc: "Continuous optimization based on real data. We scale winners and cut losers." },
        { title: "Report & Refine", desc: "Transparent reporting showing exactly where every dollar goes and what it returns." },
      ],
      roiTitle: "ROI-First Approach",
      roiSubtitle: "We don't just manage ads — we manage your return on investment. Every campaign is tracked dollar-for-dollar so you know exactly what's working.",
      roiFeatures: ["Full Conversion Tracking Setup", "Real-Time Performance Dashboards", "Cost Per Lead Optimization", "Revenue Attribution"],
      retargetTitle: "Smart Retargeting",
      retargetSubtitle: "Most visitors don't convert on the first visit. Our retargeting campaigns bring them back when they're ready to buy — at a fraction of the cost.",
      retargetFeatures: ["Website Visitor Retargeting", "Video Viewer Audiences", "Lookalike Audiences", "Dynamic Product Ads"],
      ctaBadge: "Start Scaling",
      ctaTitle: "Ready to",
      ctaTitleHighlight: "Scale Your Ads?",
      ctaSubtitle: "Get a free ads audit and discover how much revenue you're leaving on the table with your current campaigns.",
      ctaButton: "Get Your Free Ads Audit",
      ctaButtonSecondary: "View Case Studies",
    },
    nl: {
      badge: "Betaalde Advertenties",
      title: "Advertenties Die Zichzelf",
      titleHighlight: "Terugbetalen",
      subtitle: "ROI-gerichte Google Ads en Meta Ads campagnes die klikken omzetten in klanten. Elke euro gevolgd, elk resultaat gemeten.",
      ctaPrimary: "Gratis Ads Audit",
      ctaSecondary: "Bekijk ROAS Resultaten",
      stats: [{ value: 6, suffix: "x+", label: "Gemiddelde ROAS" }, { value: 8, suffix: ".2x", label: "Hoogste ROAS" }, { value: 40, suffix: "%", label: "Lagere Kosten Per Lead" }],
      platformsText: "We beheren campagnes op alle belangrijke advertentieplatforms",
      platforms: [{ name: "Google Ads", desc: "Search & Display" }, { name: "Meta Ads", desc: "Facebook & Instagram" }, { name: "YouTube Ads", desc: "Video Marketing" }],
      featuresTitle: "Full-Funnel Ad",
      featuresTitleHighlight: "Management",
      featuresSubtitle: "Van bewustzijn tot conversie, we bouwen advertentiecampagnes die meetbare omzet genereren.",
      features: [
        { title: "Google Ads", description: "Search, Display, Shopping en YouTube campagnes die intentie vangen." },
        { title: "Meta Ads", description: "Facebook en Instagram advertenties die je ideale klanten bereiken." },
        { title: "Retargeting", description: "Breng bezoekers terug die de eerste keer niet converteerden." },
        { title: "Conversie Tracking", description: "Weet precies welke advertenties leads en sales genereren." },
        { title: "Landingspagina's", description: "Hoog-converterende pagina's ontworpen om je ad ROI te maximaliseren." },
        { title: "A/B Testen", description: "Continue testen om prestaties in de tijd te verbeteren." },
      ],
      processTitle: "Ons Ad",
      processTitleHighlight: "Proces",
      processSubtitle: "Een datagestuurde methodologie die je return on ad spend maximaliseert.",
      processSteps: [
        { title: "Account Audit", desc: "We analyseren je huidige ad accounts, identificeren verspilde uitgaven en ontdekken groeikansen." },
        { title: "Strategie & Setup", desc: "We bouwen je campagnes vanaf de grond op met juiste tracking, targeting en creatieve assets." },
        { title: "Lancering & Test", desc: "We lanceren je campagnes met meerdere advertentievariaties om te vinden wat resoneert." },
        { title: "Optimaliseer & Schaal", desc: "Continue optimalisatie gebaseerd op echte data. We schalen winnaars en stoppen verliezers." },
        { title: "Rapporteer & Verfijn", desc: "Transparante rapportage die precies laat zien waar elke euro naartoe gaat en wat het oplevert." },
      ],
      roiTitle: "ROI-Eerste Aanpak",
      roiSubtitle: "We beheren niet alleen advertenties — we beheren je return on investment. Elke campagne wordt euro voor euro gevolgd zodat je precies weet wat werkt.",
      roiFeatures: ["Volledige Conversie Tracking Setup", "Real-Time Prestatie Dashboards", "Kosten Per Lead Optimalisatie", "Omzet Attributie"],
      retargetTitle: "Slimme Retargeting",
      retargetSubtitle: "De meeste bezoekers converteren niet bij het eerste bezoek. Onze retargeting campagnes brengen ze terug wanneer ze klaar zijn om te kopen — tegen een fractie van de kosten.",
      retargetFeatures: ["Website Bezoeker Retargeting", "Video Kijker Doelgroepen", "Lookalike Doelgroepen", "Dynamische Product Ads"],
      ctaBadge: "Begin Met Schalen",
      ctaTitle: "Klaar Om Je",
      ctaTitleHighlight: "Ads Te Schalen?",
      ctaSubtitle: "Krijg een gratis ads audit en ontdek hoeveel omzet je laat liggen met je huidige campagnes.",
      ctaButton: "Gratis Ads Audit",
      ctaButtonSecondary: "Bekijk Case Studies",
    },
    dk: {
      badge: "Betalt Annoncering",
      title: "Annoncer Der Betaler",
      titleHighlight: "Sig Selv",
      subtitle: "ROI-fokuserede Google Ads og Meta Ads kampagner, der konverterer klik til kunder. Hver krone sporet, hvert resultat målt.",
      ctaPrimary: "Få Din Gratis Ads Audit",
      ctaSecondary: "Se ROAS Resultater",
      stats: [{ value: 6, suffix: "x+", label: "Gennemsnitlig ROAS" }, { value: 8, suffix: ".2x", label: "Højeste ROAS" }, { value: 40, suffix: "%", label: "Lavere Pris Per Lead" }],
      platformsText: "Vi styrer kampagner på alle store annonceringsplatforme",
      platforms: [{ name: "Google Ads", desc: "Search & Display" }, { name: "Meta Ads", desc: "Facebook & Instagram" }, { name: "YouTube Ads", desc: "Video Marketing" }],
      featuresTitle: "Full-Funnel Ad",
      featuresTitleHighlight: "Management",
      featuresSubtitle: "Fra opmærksomhed til konvertering bygger vi annoncekampagner, der driver målbar omsætning.",
      features: [
        { title: "Google Ads", description: "Search, Display, Shopping og YouTube kampagner, der fanger intent." },
        { title: "Meta Ads", description: "Facebook og Instagram annoncer, der når dine ideelle kunder." },
        { title: "Retargeting", description: "Bring besøgende tilbage, der ikke konverterede første gang." },
        { title: "Konverteringssporing", description: "Ved præcis hvilke annoncer, der driver leads og salg." },
        { title: "Landingssider", description: "Højt konverterende sider designet til at maksimere din ad ROI." },
        { title: "A/B Testing", description: "Kontinuerlig test for at forbedre præstation over tid." },
      ],
      processTitle: "Vores Ad",
      processTitleHighlight: "Proces",
      processSubtitle: "En datadrevet metodologi, der maksimerer dit return on ad spend.",
      processSteps: [
        { title: "Konto Audit", desc: "Vi analyserer dine nuværende ad konti, identificerer spildt forbrug og afdækker vækstmuligheder." },
        { title: "Strategi & Opsætning", desc: "Vi bygger dine kampagner fra bunden med korrekt sporing, targeting og kreative assets." },
        { title: "Launch & Test", desc: "Vi lancerer dine kampagner med flere annoncevariatoner for at finde, hvad der resonerer." },
        { title: "Optimer & Skaler", desc: "Kontinuerlig optimering baseret på reel data. Vi skalerer vindere og stopper tabere." },
        { title: "Rapporter & Finpuds", desc: "Gennemsigtig rapportering, der viser præcis, hvor hver krone går hen, og hvad den returnerer." },
      ],
      roiTitle: "ROI-Først Tilgang",
      roiSubtitle: "Vi styrer ikke bare annoncer — vi styrer dit return on investment. Hver kampagne spores krone for krone, så du ved præcis, hvad der virker.",
      roiFeatures: ["Fuld Konverteringssporing Opsætning", "Realtids Præstations Dashboards", "Pris Per Lead Optimering", "Omsætning Attribution"],
      retargetTitle: "Smart Retargeting",
      retargetSubtitle: "De fleste besøgende konverterer ikke ved første besøg. Vores retargeting kampagner bringer dem tilbage, når de er klar til at købe — til en brøkdel af prisen.",
      retargetFeatures: ["Hjemmeside Besøger Retargeting", "Video Seer Publikummer", "Lookalike Publikummer", "Dynamiske Produkt Annoncer"],
      ctaBadge: "Begynd At Skalere",
      ctaTitle: "Klar Til At",
      ctaTitleHighlight: "Skalere Dine Annoncer?",
      ctaSubtitle: "Få en gratis ads audit og opdag, hvor meget omsætning du efterlader med dine nuværende kampagner.",
      ctaButton: "Få Din Gratis Ads Audit",
      ctaButtonSecondary: "Se Case Studies",
    },
  };

  // AU, UK, IE use US English content
  const usContent = content.us;
  const fullContent: Record<LocaleCode, typeof usContent> = {
    ...content,
    au: { ...usContent, badge: "Paid Advertising Australia" },
    uk: { ...usContent, badge: "Paid Advertising UK" },
    ie: { ...usContent, badge: "Paid Advertising Ireland" },
  };

  const c = fullContent[validLocale];

  return (
    <>
      {/* Service Structured Data */}
      <ServiceStructuredData locale={validLocale} service="paid-ads" />

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="container py-16 md:py-24 lg:py-32">
          <div className="max-w-5xl mx-auto text-center">
            <motion.span className="inline-block px-5 py-2 mb-8 text-sm font-medium tracking-wider uppercase rounded-full bg-[hsl(0_75%_50%/0.1)] text-[hsl(0_75%_50%)] border border-[hsl(0_75%_50%/0.2)]" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
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
                href="/uk/paid-ads-belfast/"
                className="tech-card p-6 md:p-8 flex flex-col sm:flex-row items-start sm:items-center gap-4 hover:border-primary/50 transition-all group"
              >
                <div className="flex-shrink-0">
                  <MapPin className="w-8 h-8 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg mb-1 group-hover:text-primary transition-colors">
                    Looking for Google Ads in Belfast?
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    See our Belfast-specific PPC strategies designed for Northern Ireland businesses.
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
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} duration={2 + index * 0.3} />
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
                <motion.div whileHover={{ y: -4 }} transition={{ type: "spring", stiffness: 300 }} className="service-card service-card-rose p-7 md:p-8 h-full">
                  <div className="w-12 h-12 mb-5 rounded-xl bg-[hsl(0_75%_50%/0.15)] border border-[hsl(0_75%_50%/0.3)] flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-[hsl(0_75%_50%)]" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-base text-muted-foreground leading-relaxed">{feature.description}</p>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ROI Section */}
      <section className="py-24 md:py-32">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.7 }}>
              <div className="service-card service-card-crimson p-8 md:p-10">
                <div className="w-16 h-16 mb-6 rounded-2xl bg-[hsl(180_70%_50%/0.15)] border border-[hsl(180_70%_50%/0.3)] flex items-center justify-center">
                  <DollarSign className="w-8 h-8 text-[hsl(180_70%_50%)]" />
                </div>
                <h3 className="text-3xl md:text-4xl font-bold mb-4">{c.roiTitle}</h3>
                <p className="text-lg text-muted-foreground mb-8 leading-relaxed">{c.roiSubtitle}</p>
                <ul className="space-y-4">
                  {c.roiFeatures.map((item) => (
                    <li key={item} className="flex items-center gap-3 text-base">
                      <span className="w-6 h-6 rounded-full bg-[hsl(180_70%_50%/0.15)] flex items-center justify-center flex-shrink-0">
                        <CheckCircle className="w-4 h-4 text-[hsl(180_70%_50%)]" />
                      </span>
                      <span className="text-foreground/90">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.7, delay: 0.2 }}>
              <div className="relative">
                <div className="aspect-square rounded-3xl p-1" style={{ background: "linear-gradient(135deg, hsl(180 70% 50% / 0.2), hsl(320 80% 55% / 0.1))" }}>
                  <div className="w-full h-full rounded-3xl bg-background/80 backdrop-blur-sm flex items-center justify-center border border-border/30">
                    <div className="text-center p-8">
                      <motion.div animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 3, repeat: Infinity }} className="w-28 h-28 mx-auto mb-6 rounded-full bg-[hsl(180_70%_50%/0.1)] border border-[hsl(180_70%_50%/0.3)] flex items-center justify-center">
                        <TrendingUp className="w-14 h-14 text-[hsl(180_70%_50%)]" />
                      </motion.div>
                      <p className="text-6xl md:text-7xl font-bold gradient-text mb-4"><AnimatedCounter value={6} suffix="x+" duration={2} /></p>
                      <p className="text-lg text-muted-foreground">Average ROAS</p>
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
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-30" style={{ background: "radial-gradient(circle, hsl(320 80% 55% / 0.15), transparent 70%)" }} />
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

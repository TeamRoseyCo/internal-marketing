// src/lib/page-translations.ts
// Extended translations for all pages
// Languages: English (US, AU, UK, IE - fallback to US), Dutch (NL), Danish (DK)
// AU, UK, IE use US English translations via fallback in helper functions

import { LocaleCode } from './locales';

// Partial record type - AU, UK, IE fall back to US via helper functions
type TranslationRecord<T> = Partial<Record<LocaleCode, T>> & { us: T };

// ============================================
// SERVICES PAGE TRANSLATIONS
// ============================================
export interface ServicesPageTranslations {
  meta: { title: string; description: string };
  hero: {
    badge: string;
    title: string;
    titleHighlight: string;
    subtitle: string;
  };
  services: {
    seo: {
      title: string;
      description: string;
      features: string[];
      stat: { label: string };
    };
    socialMedia: {
      title: string;
      description: string;
      features: string[];
      stat: { label: string };
    };
    paidAds: {
      title: string;
      description: string;
      features: string[];
      stat: { label: string };
    };
    webDesign: {
      title: string;
      description: string;
      features: string[];
      stat: { label: string };
    };
  };
  cta: {
    badge: string;
    title: string;
    titleHighlight: string;
    subtitle: string;
    button: string;
    buttonSecondary: string;
  };
  common: {
    learnMore: string;
  };
}

export const servicesPageTranslations: TranslationRecord<ServicesPageTranslations> = {
  us: {
    meta: {
      title: 'Our Services',
      description: 'SEO, Social Media Management, Paid Advertising, and Website Design services to grow your business.',
    },
    hero: {
      badge: 'Our Services',
      title: 'Marketing That',
      titleHighlight: 'Delivers Results',
      subtitle: 'From SEO to paid ads, we deliver data-driven strategies that turn marketing spend into measurable revenue. Choose your path to growth.',
    },
    services: {
      seo: {
        title: 'SEO Services',
        description: 'Dominate search results and get found by customers actively searching for your services. Our data-driven SEO strategies deliver sustainable organic growth.',
        features: ['Technical SEO Audits', 'On-Page Optimization', 'Link Building', 'Local SEO', 'Content Strategy'],
        stat: { label: 'Avg. Traffic Increase' },
      },
      socialMedia: {
        title: 'Social Media Management',
        description: 'Build your brand presence and engage your audience across all major platforms. We create content that converts followers into customers.',
        features: ['Content Creation', 'Community Management', 'Influencer Outreach', 'Analytics & Reporting', 'Brand Strategy'],
        stat: { label: 'Engagement Growth' },
      },
      paidAds: {
        title: 'Paid Advertising',
        description: 'ROI-focused Google Ads and Meta Ads campaigns that convert clicks into customers. Every dollar tracked, every result measured.',
        features: ['Google Ads Management', 'Meta Ads (Facebook & Instagram)', 'Retargeting Campaigns', 'A/B Testing', 'Conversion Tracking'],
        stat: { label: 'Average ROAS' },
      },
      webDesign: {
        title: 'Website Design',
        description: 'High-converting websites designed to turn visitors into leads and customers. Fast, beautiful, and built for results.',
        features: ['Conversion-Focused Design', 'Mobile-First Development', 'Speed Optimization', 'SEO-Ready Structure', 'Analytics Integration'],
        stat: { label: 'Conversion Rate Boost' },
      },
    },
    cta: {
      badge: "Let's Talk",
      title: 'Not Sure Which Service Is',
      titleHighlight: 'Right for You?',
      subtitle: "Book a free strategy call and we'll help you identify the best approach to grow your business.",
      button: 'Get Your Free Strategy Call',
      buttonSecondary: 'View Case Studies',
    },
    common: { learnMore: 'Learn More' },
  },
  nl: {
    meta: {
      title: 'Onze Diensten',
      description: 'SEO, Social Media Management, Betaalde Advertenties en Website Ontwerp diensten om je bedrijf te laten groeien.',
    },
    hero: {
      badge: 'Onze Diensten',
      title: 'Marketing Die',
      titleHighlight: 'Resultaten Levert',
      subtitle: 'Van SEO tot betaalde advertenties, wij leveren datagestuurde strategieën die marketinguitgaven omzetten in meetbare omzet. Kies je pad naar groei.',
    },
    services: {
      seo: {
        title: 'SEO Diensten',
        description: 'Domineer zoekresultaten en wordt gevonden door klanten die actief zoeken naar jouw diensten. Onze datagestuurde SEO-strategieën leveren duurzame organische groei.',
        features: ['Technische SEO Audits', 'On-Page Optimalisatie', 'Linkbuilding', 'Lokale SEO', 'Content Strategie'],
        stat: { label: 'Gem. Verkeer Toename' },
      },
      socialMedia: {
        title: 'Social Media Management',
        description: 'Bouw je merkpresentie en betrek je publiek op alle belangrijke platforms. We creëren content die volgers omzet in klanten.',
        features: ['Content Creatie', 'Community Management', 'Influencer Outreach', 'Analytics & Rapportage', 'Merk Strategie'],
        stat: { label: 'Engagement Groei' },
      },
      paidAds: {
        title: 'Betaalde Advertenties',
        description: 'ROI-gerichte Google Ads en Meta Ads campagnes die klikken omzetten in klanten. Elke euro gevolgd, elk resultaat gemeten.',
        features: ['Google Ads Beheer', 'Meta Ads (Facebook & Instagram)', 'Retargeting Campagnes', 'A/B Testen', 'Conversie Tracking'],
        stat: { label: 'Gemiddelde ROAS' },
      },
      webDesign: {
        title: 'Website Ontwerp',
        description: 'Hoog-converterende websites ontworpen om bezoekers om te zetten in leads en klanten. Snel, mooi en gebouwd voor resultaten.',
        features: ['Conversie-Gericht Ontwerp', 'Mobile-First Ontwikkeling', 'Snelheidsoptimalisatie', 'SEO-Klare Structuur', 'Analytics Integratie'],
        stat: { label: 'Conversie Boost' },
      },
    },
    cta: {
      badge: 'Laten We Praten',
      title: 'Niet Zeker Welke Dienst',
      titleHighlight: 'Bij Je Past?',
      subtitle: 'Boek een gratis strategiegesprek en we helpen je de beste aanpak te identificeren om je bedrijf te laten groeien.',
      button: 'Gratis Strategiegesprek',
      buttonSecondary: 'Bekijk Case Studies',
    },
    common: { learnMore: 'Meer Leren' },
  },
  dk: {
    meta: {
      title: 'Vores Tjenester',
      description: 'SEO, Social Media Management, Betalt Annoncering og Webdesign tjenester til at vækste din virksomhed.',
    },
    hero: {
      badge: 'Vores Tjenester',
      title: 'Marketing Der',
      titleHighlight: 'Leverer Resultater',
      subtitle: 'Fra SEO til betalte annoncer leverer vi datadrevne strategier, der omdanner marketingudgifter til målbar omsætning. Vælg din vej til vækst.',
    },
    services: {
      seo: {
        title: 'SEO Tjenester',
        description: 'Dominer søgeresultater og bliv fundet af kunder, der aktivt søger efter dine tjenester. Vores datadrevne SEO-strategier leverer bæredygtig organisk vækst.',
        features: ['Tekniske SEO Audits', 'On-Page Optimering', 'Linkbuilding', 'Lokal SEO', 'Content Strategi'],
        stat: { label: 'Gns. Trafik Stigning' },
      },
      socialMedia: {
        title: 'Social Media Management',
        description: 'Byg din brandtilstedeværelse og engager dit publikum på alle store platforme. Vi skaber indhold, der konverterer følgere til kunder.',
        features: ['Content Skabelse', 'Community Management', 'Influencer Outreach', 'Analytics & Rapportering', 'Brand Strategi'],
        stat: { label: 'Engagement Vækst' },
      },
      paidAds: {
        title: 'Betalt Annoncering',
        description: 'ROI-fokuserede Google Ads og Meta Ads kampagner, der konverterer klik til kunder. Hver krone sporet, hvert resultat målt.',
        features: ['Google Ads Styring', 'Meta Ads (Facebook & Instagram)', 'Retargeting Kampagner', 'A/B Testing', 'Konverteringssporing'],
        stat: { label: 'Gennemsnitlig ROAS' },
      },
      webDesign: {
        title: 'Webdesign',
        description: 'Højt konverterende hjemmesider designet til at omdanne besøgende til leads og kunder. Hurtig, smuk og bygget til resultater.',
        features: ['Konverteringsfokuseret Design', 'Mobile-First Udvikling', 'Hastighedsoptimering', 'SEO-Klar Struktur', 'Analytics Integration'],
        stat: { label: 'Konvertering Boost' },
      },
    },
    cta: {
      badge: 'Lad Os Tale',
      title: 'Ikke Sikker På Hvilken Tjeneste',
      titleHighlight: 'Der Passer Dig?',
      subtitle: 'Book et gratis strategikald, og vi hjælper dig med at identificere den bedste tilgang til at vækste din virksomhed.',
      button: 'Få Dit Gratis Strategikald',
      buttonSecondary: 'Se Case Studies',
    },
    common: { learnMore: 'Lær Mere' },
  },
  // AU - Australian English
  au: {
    meta: {
      title: 'Our Services',
      description: 'SEO, Social Media Management, Paid Advertising, and Website Design services to grow your business across Australia.',
    },
    hero: {
      badge: 'Our Services',
      title: 'Marketing That',
      titleHighlight: 'Delivers Results',
      subtitle: 'From SEO to paid ads, we deliver data-driven strategies that turn marketing spend into measurable revenue. Choose your path to growth.',
    },
    services: {
      seo: {
        title: 'SEO Services',
        description: 'Dominate search results and get found by customers actively searching for your services. Our data-driven SEO strategies deliver sustainable organic growth.',
        features: ['Technical SEO Audits', 'On-Page Optimisation', 'Link Building', 'Local SEO', 'Content Strategy'],
        stat: { label: 'Avg. Traffic Increase' },
      },
      socialMedia: {
        title: 'Social Media Management',
        description: 'Build your brand presence and engage your audience across all major platforms. We create content that converts followers into customers.',
        features: ['Content Creation', 'Community Management', 'Influencer Outreach', 'Analytics & Reporting', 'Brand Strategy'],
        stat: { label: 'Engagement Growth' },
      },
      paidAds: {
        title: 'Paid Advertising',
        description: 'ROI-focused Google Ads and Meta Ads campaigns that convert clicks into customers. Every dollar tracked, every result measured.',
        features: ['Google Ads Management', 'Meta Ads (Facebook & Instagram)', 'Retargeting Campaigns', 'A/B Testing', 'Conversion Tracking'],
        stat: { label: 'Average ROAS' },
      },
      webDesign: {
        title: 'Website Design',
        description: 'High-converting websites designed to turn visitors into leads and customers. Fast, beautiful, and built for results.',
        features: ['Conversion-Focused Design', 'Mobile-First Development', 'Speed Optimisation', 'SEO-Ready Structure', 'Analytics Integration'],
        stat: { label: 'Conversion Rate Boost' },
      },
    },
    cta: {
      badge: "Let's Talk",
      title: 'Not Sure Which Service Is',
      titleHighlight: 'Right for You?',
      subtitle: "Book a free strategy call and we'll help you identify the best approach to grow your business.",
      button: 'Get Your Free Strategy Call',
      buttonSecondary: 'View Case Studies',
    },
    common: { learnMore: 'Learn More' },
  },
  // UK - British English
  uk: {
    meta: {
      title: 'Our Services',
      description: 'SEO, Social Media Management, Paid Advertising, and Website Design services to grow your business across the United Kingdom.',
    },
    hero: {
      badge: 'Our Services',
      title: 'Marketing That',
      titleHighlight: 'Delivers Results',
      subtitle: 'From SEO to paid adverts, we deliver data-driven strategies that turn marketing spend into measurable revenue. Choose your path to growth.',
    },
    services: {
      seo: {
        title: 'SEO Services',
        description: 'Dominate search results and get found by customers actively searching for your services. Our data-driven SEO strategies deliver sustainable organic growth.',
        features: ['Technical SEO Audits', 'On-Page Optimisation', 'Link Building', 'Local SEO', 'Content Strategy'],
        stat: { label: 'Avg. Traffic Increase' },
      },
      socialMedia: {
        title: 'Social Media Management',
        description: 'Build your brand presence and engage your audience across all major platforms. We create content that converts followers into customers.',
        features: ['Content Creation', 'Community Management', 'Influencer Outreach', 'Analytics & Reporting', 'Brand Strategy'],
        stat: { label: 'Engagement Growth' },
      },
      paidAds: {
        title: 'Paid Advertising',
        description: 'ROI-focused Google Ads and Meta Ads campaigns that convert clicks into customers. Every pound tracked, every result measured.',
        features: ['Google Ads Management', 'Meta Ads (Facebook & Instagram)', 'Retargeting Campaigns', 'A/B Testing', 'Conversion Tracking'],
        stat: { label: 'Average ROAS' },
      },
      webDesign: {
        title: 'Website Design',
        description: 'High-converting websites designed to turn visitors into leads and customers. Fast, beautiful, and built for results.',
        features: ['Conversion-Focused Design', 'Mobile-First Development', 'Speed Optimisation', 'SEO-Ready Structure', 'Analytics Integration'],
        stat: { label: 'Conversion Rate Boost' },
      },
    },
    cta: {
      badge: "Let's Talk",
      title: 'Not Sure Which Service Is',
      titleHighlight: 'Right for You?',
      subtitle: "Book a free strategy call and we'll help you identify the best approach to grow your business.",
      button: 'Get Your Free Strategy Call',
      buttonSecondary: 'View Case Studies',
    },
    common: { learnMore: 'Learn More' },
  },
  // IE - Irish English (British spelling)
  ie: {
    meta: {
      title: 'Our Services',
      description: 'SEO, Social Media Management, Paid Advertising, and Website Design services to grow your business across Ireland.',
    },
    hero: {
      badge: 'Our Services',
      title: 'Marketing That',
      titleHighlight: 'Delivers Results',
      subtitle: 'From SEO to paid adverts, we deliver data-driven strategies that turn marketing spend into measurable revenue. Choose your path to growth.',
    },
    services: {
      seo: {
        title: 'SEO Services',
        description: 'Dominate search results and get found by customers actively searching for your services. Our data-driven SEO strategies deliver sustainable organic growth.',
        features: ['Technical SEO Audits', 'On-Page Optimisation', 'Link Building', 'Local SEO', 'Content Strategy'],
        stat: { label: 'Avg. Traffic Increase' },
      },
      socialMedia: {
        title: 'Social Media Management',
        description: 'Build your brand presence and engage your audience across all major platforms. We create content that converts followers into customers.',
        features: ['Content Creation', 'Community Management', 'Influencer Outreach', 'Analytics & Reporting', 'Brand Strategy'],
        stat: { label: 'Engagement Growth' },
      },
      paidAds: {
        title: 'Paid Advertising',
        description: 'ROI-focused Google Ads and Meta Ads campaigns that convert clicks into customers. Every euro tracked, every result measured.',
        features: ['Google Ads Management', 'Meta Ads (Facebook & Instagram)', 'Retargeting Campaigns', 'A/B Testing', 'Conversion Tracking'],
        stat: { label: 'Average ROAS' },
      },
      webDesign: {
        title: 'Website Design',
        description: 'High-converting websites designed to turn visitors into leads and customers. Fast, beautiful, and built for results.',
        features: ['Conversion-Focused Design', 'Mobile-First Development', 'Speed Optimisation', 'SEO-Ready Structure', 'Analytics Integration'],
        stat: { label: 'Conversion Rate Boost' },
      },
    },
    cta: {
      badge: "Let's Talk",
      title: 'Not Sure Which Service Is',
      titleHighlight: 'Right for You?',
      subtitle: "Book a free strategy call and we'll help you identify the best approach to grow your business.",
      button: 'Get Your Free Strategy Call',
      buttonSecondary: 'View Case Studies',
    },
    common: { learnMore: 'Learn More' },
  },
};

// ============================================
// SEO SERVICE PAGE TRANSLATIONS
// ============================================
export interface SEOPageTranslations {
  meta: { title: string; description: string };
  hero: {
    badge: string;
    title: string;
    titleHighlight: string;
    subtitle: string;
    cta: string;
    ctaSecondary: string;
  };
  stats: { trafficIncrease: string; lowerCost: string; longTerm: string };
  features: {
    title: string;
    titleHighlight: string;
    subtitle: string;
    items: { title: string; description: string }[];
  };
  process: {
    title: string;
    titleHighlight: string;
    subtitle: string;
    steps: { title: string; description: string }[];
  };
  localSeo: {
    title: string;
    subtitle: string;
    features: string[];
    stat: string;
    statLabel: string;
  };
  cta: {
    badge: string;
    title: string;
    titleHighlight: string;
    subtitle: string;
    button: string;
    buttonSecondary: string;
  };
}

export const seoPageTranslations: TranslationRecord<SEOPageTranslations> = {
  us: {
    meta: {
      title: 'SEO Services',
      description: 'Dominate search results with data-driven SEO strategies. We help businesses rank higher and drive qualified organic traffic.',
    },
    hero: {
      badge: 'SEO Services',
      title: 'Get Found by Customers',
      titleHighlight: 'Searching for You',
      subtitle: 'Dominate search results with data-driven SEO strategies. We help businesses rank higher, drive qualified traffic, and convert visitors into customers.',
      cta: 'Get Your Free SEO Audit',
      ctaSecondary: 'See SEO Results',
    },
    stats: { trafficIncrease: 'Avg. Traffic Increase', lowerCost: 'Lower Acquisition Cost', longTerm: 'Long-Term Results' },
    features: {
      title: 'Complete SEO',
      titleHighlight: 'Solutions',
      subtitle: 'Everything you need to rank higher and drive organic traffic that converts.',
      items: [
        { title: 'Technical SEO', description: 'Site speed, mobile optimization, crawlability, and indexing improvements.' },
        { title: 'On-Page SEO', description: 'Title tags, meta descriptions, headers, and content optimization.' },
        { title: 'Off-Page SEO', description: 'Link building, brand mentions, and authority building.' },
        { title: 'Local SEO', description: 'Google Business Profile, local citations, and geo-targeted content.' },
        { title: 'Content Strategy', description: 'Keyword research, content planning, and blog optimization.' },
        { title: 'Analytics & Reporting', description: 'Monthly reports with rankings, traffic, and conversion data.' },
      ],
    },
    process: {
      title: 'Our SEO',
      titleHighlight: 'Process',
      subtitle: 'A proven methodology that delivers consistent, measurable results.',
      steps: [
        { title: 'Discovery & Audit', description: 'We analyze your current SEO performance, identify opportunities, and understand your competitive landscape.' },
        { title: 'Strategy Development', description: 'Based on data, we create a customized SEO roadmap targeting keywords that drive qualified traffic.' },
        { title: 'On-Page Optimization', description: 'We optimize your website structure, content, and technical elements for maximum search visibility.' },
        { title: 'Link Building', description: 'We build high-quality backlinks from authoritative sources to boost your domain authority.' },
        { title: 'Monitor & Scale', description: 'Continuous tracking, reporting, and optimization to compound your organic growth over time.' },
      ],
    },
    localSeo: {
      title: 'Local SEO Expertise',
      subtitle: 'Dominate local search results and get found by customers in your area. We optimize your Google Business Profile, build local citations, and create geo-targeted content.',
      features: ['Google Business Profile Optimization', 'Local Citation Building', 'Review Management Strategy', 'Location-Based Content'],
      stat: '3-Pack',
      statLabel: 'Google Maps Rankings',
    },
    cta: {
      badge: 'Start Ranking',
      title: 'Ready to',
      titleHighlight: 'Rank Higher?',
      subtitle: "Get a free SEO audit and discover exactly what's holding your website back from page one rankings.",
      button: 'Get Your Free SEO Audit',
      buttonSecondary: 'View Case Studies',
    },
  },
  nl: {
    meta: {
      title: 'SEO Diensten',
      description: 'Domineer zoekresultaten met datagestuurde SEO-strategieën. We helpen bedrijven hoger te ranken en gekwalificeerd organisch verkeer te genereren.',
    },
    hero: {
      badge: 'SEO Diensten',
      title: 'Word Gevonden Door Klanten',
      titleHighlight: 'Die Naar Jou Zoeken',
      subtitle: 'Domineer zoekresultaten met datagestuurde SEO-strategieën. We helpen bedrijven hoger te ranken, gekwalificeerd verkeer te genereren en bezoekers om te zetten in klanten.',
      cta: 'Gratis SEO Audit',
      ctaSecondary: 'Bekijk SEO Resultaten',
    },
    stats: { trafficIncrease: 'Gem. Verkeer Toename', lowerCost: 'Lagere Acquisitiekosten', longTerm: 'Langetermijn Resultaten' },
    features: {
      title: 'Complete SEO',
      titleHighlight: 'Oplossingen',
      subtitle: 'Alles wat je nodig hebt om hoger te ranken en organisch verkeer te genereren dat converteert.',
      items: [
        { title: 'Technische SEO', description: 'Sitesnelheid, mobiele optimalisatie, crawlbaarheid en indexeringsverbeteringen.' },
        { title: 'On-Page SEO', description: 'Title tags, meta descriptions, headers en content optimalisatie.' },
        { title: 'Off-Page SEO', description: 'Linkbuilding, merkvermeldingen en autoriteitsopbouw.' },
        { title: 'Lokale SEO', description: 'Google Bedrijfsprofiel, lokale citaties en geo-gerichte content.' },
        { title: 'Content Strategie', description: 'Zoekwoordonderzoek, contentplanning en blogoptimalisatie.' },
        { title: 'Analytics & Rapportage', description: 'Maandelijkse rapporten met rankings, verkeer en conversiedata.' },
      ],
    },
    process: {
      title: 'Ons SEO',
      titleHighlight: 'Proces',
      subtitle: 'Een bewezen methodologie die consistente, meetbare resultaten levert.',
      steps: [
        { title: 'Ontdekking & Audit', description: 'We analyseren je huidige SEO-prestaties, identificeren kansen en begrijpen je concurrentielandschap.' },
        { title: 'Strategie Ontwikkeling', description: 'Op basis van data creëren we een aangepaste SEO-routekaart gericht op zoekwoorden die gekwalificeerd verkeer genereren.' },
        { title: 'On-Page Optimalisatie', description: 'We optimaliseren je websitestructuur, content en technische elementen voor maximale zoekzichtbaarheid.' },
        { title: 'Linkbuilding', description: 'We bouwen hoogwaardige backlinks van autoritaire bronnen om je domeinautoriteit te verhogen.' },
        { title: 'Monitor & Schaal', description: 'Continue tracking, rapportage en optimalisatie om je organische groei in de tijd te versterken.' },
      ],
    },
    localSeo: {
      title: 'Lokale SEO Expertise',
      subtitle: 'Domineer lokale zoekresultaten en wordt gevonden door klanten in jouw omgeving. We optimaliseren je Google Bedrijfsprofiel, bouwen lokale citaties en creëren geo-gerichte content.',
      features: ['Google Bedrijfsprofiel Optimalisatie', 'Lokale Citatie Building', 'Review Management Strategie', 'Locatie-Gebaseerde Content'],
      stat: '3-Pack',
      statLabel: 'Google Maps Rankings',
    },
    cta: {
      badge: 'Begin Met Ranken',
      title: 'Klaar Om',
      titleHighlight: 'Hoger Te Ranken?',
      subtitle: 'Krijg een gratis SEO-audit en ontdek precies wat je website tegenhoudt van pagina één rankings.',
      button: 'Gratis SEO Audit',
      buttonSecondary: 'Bekijk Case Studies',
    },
  },
  dk: {
    meta: {
      title: 'SEO Tjenester',
      description: 'Dominer søgeresultater med datadrevne SEO-strategier. Vi hjælper virksomheder med at ranke højere og drive kvalificeret organisk trafik.',
    },
    hero: {
      badge: 'SEO Tjenester',
      title: 'Bliv Fundet Af Kunder',
      titleHighlight: 'Der Søger Efter Dig',
      subtitle: 'Dominer søgeresultater med datadrevne SEO-strategier. Vi hjælper virksomheder med at ranke højere, drive kvalificeret trafik og konvertere besøgende til kunder.',
      cta: 'Få Din Gratis SEO Audit',
      ctaSecondary: 'Se SEO Resultater',
    },
    stats: { trafficIncrease: 'Gns. Trafik Stigning', lowerCost: 'Lavere Anskaffelsesomkostninger', longTerm: 'Langsigtede Resultater' },
    features: {
      title: 'Komplet SEO',
      titleHighlight: 'Løsninger',
      subtitle: 'Alt hvad du behøver for at ranke højere og drive organisk trafik, der konverterer.',
      items: [
        { title: 'Teknisk SEO', description: 'Sitehastighed, mobil optimering, crawlbarhed og indekseringsforbedringer.' },
        { title: 'On-Page SEO', description: 'Title tags, meta beskrivelser, headers og content optimering.' },
        { title: 'Off-Page SEO', description: 'Linkbuilding, brand mentions og autoritetsopbygning.' },
        { title: 'Lokal SEO', description: 'Google Business Profile, lokale citationer og geo-målrettet indhold.' },
        { title: 'Content Strategi', description: 'Søgeordsforskning, content planlægning og blog optimering.' },
        { title: 'Analytics & Rapportering', description: 'Månedlige rapporter med rankings, trafik og konverteringsdata.' },
      ],
    },
    process: {
      title: 'Vores SEO',
      titleHighlight: 'Proces',
      subtitle: 'En bevist metodologi, der leverer konsistente, målbare resultater.',
      steps: [
        { title: 'Opdagelse & Audit', description: 'Vi analyserer din nuværende SEO-præstation, identificerer muligheder og forstår dit konkurrencelandskab.' },
        { title: 'Strategiudvikling', description: 'Baseret på data skaber vi en tilpasset SEO-køreplan målrettet søgeord, der driver kvalificeret trafik.' },
        { title: 'On-Page Optimering', description: 'Vi optimerer din hjemmesides struktur, indhold og tekniske elementer for maksimal søgesynlighed.' },
        { title: 'Linkbuilding', description: 'Vi bygger højkvalitets backlinks fra autoritative kilder for at booste din domæneautoritet.' },
        { title: 'Overvåg & Skaler', description: 'Kontinuerlig sporing, rapportering og optimering for at sammensætte din organiske vækst over tid.' },
      ],
    },
    localSeo: {
      title: 'Lokal SEO Ekspertise',
      subtitle: 'Dominer lokale søgeresultater og bliv fundet af kunder i dit område. Vi optimerer din Google Business Profile, bygger lokale citationer og skaber geo-målrettet indhold.',
      features: ['Google Business Profile Optimering', 'Lokal Citation Building', 'Anmeldelse Management Strategi', 'Lokationsbaseret Indhold'],
      stat: '3-Pack',
      statLabel: 'Google Maps Rankings',
    },
    cta: {
      badge: 'Begynd At Ranke',
      title: 'Klar Til At',
      titleHighlight: 'Ranke Højere?',
      subtitle: 'Få en gratis SEO-audit og opdag præcis, hvad der holder din hjemmeside tilbage fra side et rankings.',
      button: 'Få Din Gratis SEO Audit',
      buttonSecondary: 'Se Case Studies',
    },
  },
  // AU - Australian English
  au: {
    meta: {
      title: 'SEO Services',
      description: 'Dominate search results with data-driven SEO strategies. We help Australian businesses rank higher and drive qualified organic traffic.',
    },
    hero: {
      badge: 'SEO Services',
      title: 'Get Found by Customers',
      titleHighlight: 'Searching for You',
      subtitle: 'Dominate search results with data-driven SEO strategies. We help businesses rank higher, drive qualified traffic, and convert visitors into customers.',
      cta: 'Get Your Free SEO Audit',
      ctaSecondary: 'See SEO Results',
    },
    stats: { trafficIncrease: 'Avg. Traffic Increase', lowerCost: 'Lower Acquisition Cost', longTerm: 'Long-Term Results' },
    features: {
      title: 'Complete SEO',
      titleHighlight: 'Solutions',
      subtitle: 'Everything you need to rank higher and drive organic traffic that converts.',
      items: [
        { title: 'Technical SEO', description: 'Site speed, mobile optimisation, crawlability, and indexing improvements.' },
        { title: 'On-Page SEO', description: 'Title tags, meta descriptions, headers, and content optimisation.' },
        { title: 'Off-Page SEO', description: 'Link building, brand mentions, and authority building.' },
        { title: 'Local SEO', description: 'Google Business Profile, local citations, and geo-targeted content.' },
        { title: 'Content Strategy', description: 'Keyword research, content planning, and blog optimisation.' },
        { title: 'Analytics & Reporting', description: 'Monthly reports with rankings, traffic, and conversion data.' },
      ],
    },
    process: {
      title: 'Our SEO',
      titleHighlight: 'Process',
      subtitle: 'A proven methodology that delivers consistent, measurable results.',
      steps: [
        { title: 'Discovery & Audit', description: 'We analyse your current SEO performance, identify opportunities, and understand your competitive landscape.' },
        { title: 'Strategy Development', description: 'Based on data, we create a customised SEO roadmap targeting keywords that drive qualified traffic.' },
        { title: 'On-Page Optimisation', description: 'We optimise your website structure, content, and technical elements for maximum search visibility.' },
        { title: 'Link Building', description: 'We build high-quality backlinks from authoritative sources to boost your domain authority.' },
        { title: 'Monitor & Scale', description: 'Continuous tracking, reporting, and optimisation to compound your organic growth over time.' },
      ],
    },
    localSeo: {
      title: 'Local SEO Expertise',
      subtitle: 'Dominate local search results and get found by customers in your area. We optimise your Google Business Profile, build local citations, and create geo-targeted content.',
      features: ['Google Business Profile Optimisation', 'Local Citation Building', 'Review Management Strategy', 'Location-Based Content'],
      stat: '3-Pack',
      statLabel: 'Google Maps Rankings',
    },
    cta: {
      badge: 'Start Ranking',
      title: 'Ready to',
      titleHighlight: 'Rank Higher?',
      subtitle: "Get a free SEO audit and discover exactly what's holding your website back from page one rankings.",
      button: 'Get Your Free SEO Audit',
      buttonSecondary: 'View Case Studies',
    },
  },
  // UK - British English
  uk: {
    meta: {
      title: 'SEO Services',
      description: 'Dominate search results with data-driven SEO strategies. We help UK businesses rank higher and drive qualified organic traffic.',
    },
    hero: {
      badge: 'SEO Services',
      title: 'Get Found by Customers',
      titleHighlight: 'Searching for You',
      subtitle: 'Dominate search results with data-driven SEO strategies. We help businesses rank higher, drive qualified traffic, and convert visitors into customers.',
      cta: 'Get Your Free SEO Audit',
      ctaSecondary: 'See SEO Results',
    },
    stats: { trafficIncrease: 'Avg. Traffic Increase', lowerCost: 'Lower Acquisition Cost', longTerm: 'Long-Term Results' },
    features: {
      title: 'Complete SEO',
      titleHighlight: 'Solutions',
      subtitle: 'Everything you need to rank higher and drive organic traffic that converts.',
      items: [
        { title: 'Technical SEO', description: 'Site speed, mobile optimisation, crawlability, and indexing improvements.' },
        { title: 'On-Page SEO', description: 'Title tags, meta descriptions, headers, and content optimisation.' },
        { title: 'Off-Page SEO', description: 'Link building, brand mentions, and authority building.' },
        { title: 'Local SEO', description: 'Google Business Profile, local citations, and geo-targeted content.' },
        { title: 'Content Strategy', description: 'Keyword research, content planning, and blog optimisation.' },
        { title: 'Analytics & Reporting', description: 'Monthly reports with rankings, traffic, and conversion data.' },
      ],
    },
    process: {
      title: 'Our SEO',
      titleHighlight: 'Process',
      subtitle: 'A proven methodology that delivers consistent, measurable results.',
      steps: [
        { title: 'Discovery & Audit', description: 'We analyse your current SEO performance, identify opportunities, and understand your competitive landscape.' },
        { title: 'Strategy Development', description: 'Based on data, we create a customised SEO roadmap targeting keywords that drive qualified traffic.' },
        { title: 'On-Page Optimisation', description: 'We optimise your website structure, content, and technical elements for maximum search visibility.' },
        { title: 'Link Building', description: 'We build high-quality backlinks from authoritative sources to boost your domain authority.' },
        { title: 'Monitor & Scale', description: 'Continuous tracking, reporting, and optimisation to compound your organic growth over time.' },
      ],
    },
    localSeo: {
      title: 'Local SEO Expertise',
      subtitle: 'Dominate local search results and get found by customers in your area. We optimise your Google Business Profile, build local citations, and create geo-targeted content.',
      features: ['Google Business Profile Optimisation', 'Local Citation Building', 'Review Management Strategy', 'Location-Based Content'],
      stat: '3-Pack',
      statLabel: 'Google Maps Rankings',
    },
    cta: {
      badge: 'Start Ranking',
      title: 'Ready to',
      titleHighlight: 'Rank Higher?',
      subtitle: "Get a free SEO audit and discover exactly what's holding your website back from page one rankings.",
      button: 'Get Your Free SEO Audit',
      buttonSecondary: 'View Case Studies',
    },
  },
  // IE - Irish English (British spelling)
  ie: {
    meta: {
      title: 'SEO Services',
      description: 'Dominate search results with data-driven SEO strategies. We help Irish businesses rank higher and drive qualified organic traffic.',
    },
    hero: {
      badge: 'SEO Services',
      title: 'Get Found by Customers',
      titleHighlight: 'Searching for You',
      subtitle: 'Dominate search results with data-driven SEO strategies. We help businesses rank higher, drive qualified traffic, and convert visitors into customers.',
      cta: 'Get Your Free SEO Audit',
      ctaSecondary: 'See SEO Results',
    },
    stats: { trafficIncrease: 'Avg. Traffic Increase', lowerCost: 'Lower Acquisition Cost', longTerm: 'Long-Term Results' },
    features: {
      title: 'Complete SEO',
      titleHighlight: 'Solutions',
      subtitle: 'Everything you need to rank higher and drive organic traffic that converts.',
      items: [
        { title: 'Technical SEO', description: 'Site speed, mobile optimisation, crawlability, and indexing improvements.' },
        { title: 'On-Page SEO', description: 'Title tags, meta descriptions, headers, and content optimisation.' },
        { title: 'Off-Page SEO', description: 'Link building, brand mentions, and authority building.' },
        { title: 'Local SEO', description: 'Google Business Profile, local citations, and geo-targeted content.' },
        { title: 'Content Strategy', description: 'Keyword research, content planning, and blog optimisation.' },
        { title: 'Analytics & Reporting', description: 'Monthly reports with rankings, traffic, and conversion data.' },
      ],
    },
    process: {
      title: 'Our SEO',
      titleHighlight: 'Process',
      subtitle: 'A proven methodology that delivers consistent, measurable results.',
      steps: [
        { title: 'Discovery & Audit', description: 'We analyse your current SEO performance, identify opportunities, and understand your competitive landscape.' },
        { title: 'Strategy Development', description: 'Based on data, we create a customised SEO roadmap targeting keywords that drive qualified traffic.' },
        { title: 'On-Page Optimisation', description: 'We optimise your website structure, content, and technical elements for maximum search visibility.' },
        { title: 'Link Building', description: 'We build high-quality backlinks from authoritative sources to boost your domain authority.' },
        { title: 'Monitor & Scale', description: 'Continuous tracking, reporting, and optimisation to compound your organic growth over time.' },
      ],
    },
    localSeo: {
      title: 'Local SEO Expertise',
      subtitle: 'Dominate local search results and get found by customers in your area. We optimise your Google Business Profile, build local citations, and create geo-targeted content.',
      features: ['Google Business Profile Optimisation', 'Local Citation Building', 'Review Management Strategy', 'Location-Based Content'],
      stat: '3-Pack',
      statLabel: 'Google Maps Rankings',
    },
    cta: {
      badge: 'Start Ranking',
      title: 'Ready to',
      titleHighlight: 'Rank Higher?',
      subtitle: "Get a free SEO audit and discover exactly what's holding your website back from page one rankings.",
      button: 'Get Your Free SEO Audit',
      buttonSecondary: 'View Case Studies',
    },
  },
};

// ============================================
// CONTACT PAGE TRANSLATIONS
// ============================================
export interface ContactPageTranslations {
  meta: { title: string; description: string };
  hero: {
    badge: string;
    title: string;
    titleHighlight: string;
    subtitle: string;
  };
  form: {
    title: string;
    subtitle: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    website: string;
    serviceLabel: string;
    services: { value: string; label: string }[];
    messageLabel: string;
    messagePlaceholder: string;
    submit: string;
    submitting: string;
    privacyText: string;
    privacyLink: string;
    successTitle: string;
    successMessage: string;
    sendAnother: string;
  };
  contactInfo: {
    title: string;
    subtitle: string;
    email: { label: string; value: string };
    phone: { label: string; value: string };
    response: { label: string; value: string };
    location: { label: string; value: string };
  };
  whatToExpect: {
    title: string;
    items: { title: string; description: string }[];
  };
  trustBadges: string[];
  faq: {
    badge: string;
    title: string;
    titleHighlight: string;
    subtitle: string;
    questions: { question: string; answer: string }[];
  };
}

export const contactPageTranslations: TranslationRecord<ContactPageTranslations> = {
  us: {
    meta: {
      title: 'Contact Us',
      description: 'Get in touch with Rosey Co. Book a free strategy call and discover how we can help grow your business.',
    },
    hero: {
      badge: 'Get In Touch',
      title: "Let's Grow Your",
      titleHighlight: 'Business Together',
      subtitle: 'Book a free strategy call and discover exactly how we can help you get more leads, more customers, and more revenue.',
    },
    form: {
      title: 'Get Your Free Strategy Call',
      subtitle: "Fill out the form below and we'll be in touch within 24 hours.",
      firstName: 'First Name *',
      lastName: 'Last Name *',
      email: 'Email Address *',
      phone: 'Phone Number',
      website: 'Website URL',
      serviceLabel: 'Service Interested In *',
      services: [
        { value: 'seo', label: 'SEO Services' },
        { value: 'social-media', label: 'Social Media Management' },
        { value: 'paid-ads', label: 'Paid Advertising' },
        { value: 'website-design', label: 'Website Design' },
        { value: 'other', label: 'Other / Not Sure' },
      ],
      messageLabel: 'Tell us about your business and goals *',
      messagePlaceholder: 'What are you looking to achieve? What challenges are you facing?',
      submit: 'Book Your Free Strategy Call',
      submitting: 'Sending...',
      privacyText: 'By submitting this form, you agree to our',
      privacyLink: 'Privacy Policy',
      successTitle: 'Thanks for reaching out!',
      successMessage: "We've received your message and will get back to you within 24 hours.",
      sendAnother: 'Send Another Message',
    },
    contactInfo: {
      title: 'Other Ways to Reach Us',
      subtitle: "Prefer to reach out directly? Here's how you can contact us.",
      email: { label: 'Email', value: 'team@roseyco.com' },
      phone: { label: 'Phone', value: '+1 (234) 567-890' },
      response: { label: 'Response Time', value: 'Within 24 hours' },
      location: { label: 'Location', value: 'Global (Remote)' },
    },
    whatToExpect: {
      title: 'What to Expect',
      items: [
        { title: 'Quick Response:', description: "We'll get back to you within 24 hours" },
        { title: 'Strategy Call:', description: '30-minute call to understand your business and goals' },
        { title: 'Custom Proposal:', description: 'Tailored plan with clear pricing and expected results' },
        { title: 'No Pressure:', description: 'Zero obligations — just valuable insights for your business' },
      ],
    },
    trustBadges: ['50+ Happy Clients', '21x Average ROAS', 'Results Guaranteed'],
    faq: {
      badge: 'FAQ',
      title: 'Frequently Asked',
      titleHighlight: 'Questions',
      subtitle: 'Everything you need to know about working with us.',
      questions: [
        { question: 'How much does it cost?', answer: "Pricing depends on your specific needs and goals. Our packages typically start from $1,500/month for ongoing services. We'll provide a custom quote after understanding your business during our free strategy call." },
        { question: 'How long until I see results?', answer: 'Most clients start seeing results within 2-4 weeks for paid advertising, 2-3 months for SEO, and immediately for social media engagement. We focus on quick wins while building long-term growth.' },
        { question: 'Do you require long-term contracts?', answer: "No long-term contracts required. We work on a month-to-month basis because we believe in earning your business every month through results. Our clients stay because they see ROI, not because they're locked in." },
        { question: 'What industries do you work with?', answer: 'We work with businesses across all industries — from e-commerce and SaaS to local services and professional firms. If you have customers to reach online, we can help you grow.' },
        { question: "What's included in the free strategy call?", answer: "During our 30-minute call, we'll analyze your current marketing efforts, identify opportunities for growth, and provide actionable recommendations — whether you work with us or not. No sales pressure, just value." },
      ],
    },
  },
  nl: {
    meta: {
      title: 'Neem Contact Op',
      description: 'Neem contact op met Rosey Co. Boek een gratis strategiegesprek en ontdek hoe we je bedrijf kunnen laten groeien.',
    },
    hero: {
      badge: 'Neem Contact Op',
      title: 'Laten We Samen Je Bedrijf',
      titleHighlight: 'Laten Groeien',
      subtitle: 'Boek een gratis strategiegesprek en ontdek precies hoe we je kunnen helpen met meer leads, meer klanten en meer omzet.',
    },
    form: {
      title: 'Boek Je Gratis Strategiegesprek',
      subtitle: 'Vul het onderstaande formulier in en we nemen binnen 24 uur contact met je op.',
      firstName: 'Voornaam *',
      lastName: 'Achternaam *',
      email: 'E-mailadres *',
      phone: 'Telefoonnummer',
      website: 'Website URL',
      serviceLabel: 'Dienst Waarin Je Geïnteresseerd Bent *',
      services: [
        { value: 'seo', label: 'SEO Diensten' },
        { value: 'social-media', label: 'Social Media Management' },
        { value: 'paid-ads', label: 'Betaalde Advertenties' },
        { value: 'website-design', label: 'Website Ontwerp' },
        { value: 'other', label: 'Anders / Niet Zeker' },
      ],
      messageLabel: 'Vertel ons over je bedrijf en doelen *',
      messagePlaceholder: 'Wat wil je bereiken? Welke uitdagingen heb je?',
      submit: 'Boek Je Gratis Strategiegesprek',
      submitting: 'Verzenden...',
      privacyText: 'Door dit formulier in te dienen, ga je akkoord met ons',
      privacyLink: 'Privacybeleid',
      successTitle: 'Bedankt voor je bericht!',
      successMessage: 'We hebben je bericht ontvangen en nemen binnen 24 uur contact met je op.',
      sendAnother: 'Stuur Nog Een Bericht',
    },
    contactInfo: {
      title: 'Andere Manieren Om Ons Te Bereiken',
      subtitle: 'Liever direct contact opnemen? Zo kun je ons bereiken.',
      email: { label: 'E-mail', value: 'team@roseyco.com' },
      phone: { label: 'Telefoon', value: '+31 20 123 4567' },
      response: { label: 'Reactietijd', value: 'Binnen 24 uur' },
      location: { label: 'Locatie', value: 'Wereldwijd (Remote)' },
    },
    whatToExpect: {
      title: 'Wat Te Verwachten',
      items: [
        { title: 'Snelle Reactie:', description: 'We nemen binnen 24 uur contact met je op' },
        { title: 'Strategiegesprek:', description: '30-minuten gesprek om je bedrijf en doelen te begrijpen' },
        { title: 'Aangepast Voorstel:', description: 'Op maat gemaakt plan met duidelijke prijzen en verwachte resultaten' },
        { title: 'Geen Druk:', description: 'Geen verplichtingen — alleen waardevolle inzichten voor je bedrijf' },
      ],
    },
    trustBadges: ['50+ Tevreden Klanten', '21x Gemiddelde ROAS', 'Resultaten Gegarandeerd'],
    faq: {
      badge: 'FAQ',
      title: 'Veelgestelde',
      titleHighlight: 'Vragen',
      subtitle: 'Alles wat je moet weten over samenwerken met ons.',
      questions: [
        { question: 'Wat zijn de kosten?', answer: 'De prijzen zijn afhankelijk van je specifieke behoeften en doelen. Onze pakketten beginnen meestal vanaf €1.500/maand voor doorlopende diensten. We geven je een offerte op maat na het begrijpen van je bedrijf tijdens ons gratis strategiegesprek.' },
        { question: 'Hoe lang duurt het voordat ik resultaten zie?', answer: 'De meeste klanten zien resultaten binnen 2-4 weken voor betaalde advertenties, 2-3 maanden voor SEO, en direct voor social media engagement. We focussen op snelle resultaten terwijl we bouwen aan groei op lange termijn.' },
        { question: 'Vereisen jullie langlopende contracten?', answer: 'Geen langlopende contracten vereist. We werken op maandbasis omdat we geloven in het verdienen van je vertrouwen elke maand door resultaten. Onze klanten blijven omdat ze ROI zien, niet omdat ze vastzitten.' },
        { question: 'Met welke sectoren werken jullie?', answer: 'We werken met bedrijven in alle sectoren — van e-commerce en SaaS tot lokale diensten en professionele firma\'s. Als je klanten online kunt bereiken, kunnen we je helpen groeien.' },
        { question: 'Wat is inbegrepen in het gratis strategiegesprek?', answer: 'Tijdens ons 30-minuten gesprek analyseren we je huidige marketinginspanningen, identificeren we groeikansen en geven we concrete aanbevelingen — of je nu met ons werkt of niet. Geen verkoopdruk, alleen waarde.' },
      ],
    },
  },
  dk: {
    meta: {
      title: 'Kontakt Os',
      description: 'Kom i kontakt med Rosey Co. Book et gratis strategikald og opdag, hvordan vi kan hjælpe med at vækste din virksomhed.',
    },
    hero: {
      badge: 'Kom I Kontakt',
      title: 'Lad Os Vækste Din',
      titleHighlight: 'Virksomhed Sammen',
      subtitle: 'Book et gratis strategikald og opdag præcis, hvordan vi kan hjælpe dig med at få flere leads, flere kunder og mere omsætning.',
    },
    form: {
      title: 'Få Dit Gratis Strategikald',
      subtitle: 'Udfyld formularen nedenfor, og vi kontakter dig inden for 24 timer.',
      firstName: 'Fornavn *',
      lastName: 'Efternavn *',
      email: 'E-mailadresse *',
      phone: 'Telefonnummer',
      website: 'Hjemmeside URL',
      serviceLabel: 'Tjeneste Du Er Interesseret I *',
      services: [
        { value: 'seo', label: 'SEO Tjenester' },
        { value: 'social-media', label: 'Social Media Management' },
        { value: 'paid-ads', label: 'Betalt Annoncering' },
        { value: 'website-design', label: 'Webdesign' },
        { value: 'other', label: 'Andet / Ikke Sikker' },
      ],
      messageLabel: 'Fortæl os om din virksomhed og mål *',
      messagePlaceholder: 'Hvad ønsker du at opnå? Hvilke udfordringer står du over for?',
      submit: 'Book Dit Gratis Strategikald',
      submitting: 'Sender...',
      privacyText: 'Ved at indsende denne formular accepterer du vores',
      privacyLink: 'Privatlivspolitik',
      successTitle: 'Tak for din henvendelse!',
      successMessage: 'Vi har modtaget din besked og vender tilbage inden for 24 timer.',
      sendAnother: 'Send En Ny Besked',
    },
    contactInfo: {
      title: 'Andre Måder At Kontakte Os',
      subtitle: 'Foretrækker du at kontakte os direkte? Her er hvordan du kan nå os.',
      email: { label: 'E-mail', value: 'team@roseyco.com' },
      phone: { label: 'Telefon', value: '+45 12 34 56 78' },
      response: { label: 'Svartid', value: 'Inden for 24 timer' },
      location: { label: 'Placering', value: 'Global (Remote)' },
    },
    whatToExpect: {
      title: 'Hvad Du Kan Forvente',
      items: [
        { title: 'Hurtig Respons:', description: 'Vi vender tilbage inden for 24 timer' },
        { title: 'Strategikald:', description: '30-minutters opkald for at forstå din virksomhed og mål' },
        { title: 'Tilpasset Forslag:', description: 'Skræddersyet plan med klar prissætning og forventede resultater' },
        { title: 'Intet Pres:', description: 'Ingen forpligtelser — kun værdifuld indsigt til din virksomhed' },
      ],
    },
    trustBadges: ['50+ Glade Kunder', '21x Gennemsnitlig ROAS', 'Resultater Garanteret'],
    faq: {
      badge: 'FAQ',
      title: 'Ofte Stillede',
      titleHighlight: 'Spørgsmål',
      subtitle: 'Alt hvad du behøver at vide om at arbejde med os.',
      questions: [
        { question: 'Hvad koster det?', answer: 'Prissætningen afhænger af dine specifikke behov og mål. Vores pakker starter typisk fra 10.000 kr./måned for løbende tjenester. Vi giver et tilpasset tilbud efter at have forstået din virksomhed under vores gratis strategikald.' },
        { question: 'Hvor lang tid før jeg ser resultater?', answer: 'De fleste kunder begynder at se resultater inden for 2-4 uger for betalt annoncering, 2-3 måneder for SEO, og med det samme for social media engagement. Vi fokuserer på hurtige gevinster, mens vi bygger langsigtet vækst.' },
        { question: 'Kræver I langsigtede kontrakter?', answer: 'Ingen langsigtede kontrakter krævet. Vi arbejder på månedsbasis, fordi vi tror på at tjene din forretning hver måned gennem resultater. Vores kunder bliver, fordi de ser ROI, ikke fordi de er låst fast.' },
        { question: 'Hvilke brancher arbejder I med?', answer: 'Vi arbejder med virksomheder på tværs af alle brancher — fra e-handel og SaaS til lokale tjenester og professionelle firmaer. Hvis du har kunder at nå online, kan vi hjælpe dig med at vækste.' },
        { question: 'Hvad er inkluderet i det gratis strategikald?', answer: 'Under vores 30-minutters opkald analyserer vi dine nuværende marketingindsatser, identificerer vækstmuligheder og giver handlingsrettede anbefalinger — uanset om du arbejder med os eller ej. Intet salgspres, kun værdi.' },
      ],
    },
  },
  // AU - Australian English
  au: {
    meta: {
      title: 'Contact Us',
      description: 'Get in touch with Rosey Co. Book a free strategy call and discover how we can help grow your business in Australia.',
    },
    hero: {
      badge: 'Get In Touch',
      title: "Let's Grow Your",
      titleHighlight: 'Business Together',
      subtitle: 'Book a free strategy call and discover exactly how we can help you get more leads, more customers, and more revenue.',
    },
    form: {
      title: 'Get Your Free Strategy Call',
      subtitle: "Fill out the form below and we'll be in touch within 24 hours.",
      firstName: 'First Name *',
      lastName: 'Last Name *',
      email: 'Email Address *',
      phone: 'Phone Number',
      website: 'Website URL',
      serviceLabel: 'Service Interested In *',
      services: [
        { value: 'seo', label: 'SEO Services' },
        { value: 'social-media', label: 'Social Media Management' },
        { value: 'paid-ads', label: 'Paid Advertising' },
        { value: 'website-design', label: 'Website Design' },
        { value: 'other', label: 'Other / Not Sure' },
      ],
      messageLabel: 'Tell us about your business and goals *',
      messagePlaceholder: 'What are you looking to achieve? What challenges are you facing?',
      submit: 'Book Your Free Strategy Call',
      submitting: 'Sending...',
      privacyText: 'By submitting this form, you agree to our',
      privacyLink: 'Privacy Policy',
      successTitle: 'Thanks for reaching out!',
      successMessage: "We've received your message and will get back to you within 24 hours.",
      sendAnother: 'Send Another Message',
    },
    contactInfo: {
      title: 'Other Ways to Reach Us',
      subtitle: "Prefer to reach out directly? Here's how you can contact us.",
      email: { label: 'Email', value: 'team@roseyco.com' },
      phone: { label: 'Phone', value: '+61 2 1234 5678' },
      response: { label: 'Response Time', value: 'Within 24 hours' },
      location: { label: 'Location', value: 'Sydney, Australia' },
    },
    whatToExpect: {
      title: 'What to Expect',
      items: [
        { title: 'Quick Response:', description: "We'll get back to you within 24 hours" },
        { title: 'Strategy Call:', description: '30-minute call to understand your business and goals' },
        { title: 'Custom Proposal:', description: 'Tailored plan with clear pricing and expected results' },
        { title: 'No Pressure:', description: 'Zero obligations — just valuable insights for your business' },
      ],
    },
    trustBadges: ['50+ Happy Clients', '21x Average ROAS', 'Results Guaranteed'],
    faq: {
      badge: 'FAQ',
      title: 'Frequently Asked',
      titleHighlight: 'Questions',
      subtitle: 'Everything you need to know about working with us.',
      questions: [
        { question: 'How much does it cost?', answer: "Pricing depends on your specific needs and goals. Our packages typically start from $2,500 AUD/month for ongoing services. We'll provide a custom quote after understanding your business during our free strategy call." },
        { question: 'How long until I see results?', answer: 'Most clients start seeing results within 2-4 weeks for paid advertising, 2-3 months for SEO, and immediately for social media engagement. We focus on quick wins whilst building long-term growth.' },
        { question: 'Do you require long-term contracts?', answer: "No long-term contracts required. We work on a month-to-month basis because we believe in earning your business every month through results. Our clients stay because they see ROI, not because they're locked in." },
        { question: 'What industries do you work with?', answer: 'We work with businesses across all industries — from e-commerce and SaaS to local services and professional firms. If you have customers to reach online, we can help you grow.' },
        { question: "What's included in the free strategy call?", answer: "During our 30-minute call, we'll analyse your current marketing efforts, identify opportunities for growth, and provide actionable recommendations — whether you work with us or not. No sales pressure, just value." },
      ],
    },
  },
  // UK - British English
  uk: {
    meta: {
      title: 'Contact Us',
      description: 'Get in touch with Rosey Co. Book a free strategy call and discover how we can help grow your business in the UK.',
    },
    hero: {
      badge: 'Get In Touch',
      title: "Let's Grow Your",
      titleHighlight: 'Business Together',
      subtitle: 'Book a free strategy call and discover exactly how we can help you get more leads, more customers, and more revenue.',
    },
    form: {
      title: 'Get Your Free Strategy Call',
      subtitle: "Fill out the form below and we'll be in touch within 24 hours.",
      firstName: 'First Name *',
      lastName: 'Last Name *',
      email: 'Email Address *',
      phone: 'Phone Number',
      website: 'Website URL',
      serviceLabel: 'Service Interested In *',
      services: [
        { value: 'seo', label: 'SEO Services' },
        { value: 'social-media', label: 'Social Media Management' },
        { value: 'paid-ads', label: 'Paid Advertising' },
        { value: 'website-design', label: 'Website Design' },
        { value: 'other', label: 'Other / Not Sure' },
      ],
      messageLabel: 'Tell us about your business and goals *',
      messagePlaceholder: 'What are you looking to achieve? What challenges are you facing?',
      submit: 'Book Your Free Strategy Call',
      submitting: 'Sending...',
      privacyText: 'By submitting this form, you agree to our',
      privacyLink: 'Privacy Policy',
      successTitle: 'Thanks for reaching out!',
      successMessage: "We've received your message and will get back to you within 24 hours.",
      sendAnother: 'Send Another Message',
    },
    contactInfo: {
      title: 'Other Ways to Reach Us',
      subtitle: "Prefer to reach out directly? Here's how you can contact us.",
      email: { label: 'Email', value: 'team@roseyco.com' },
      phone: { label: 'Phone', value: '+44 20 1234 5678' },
      response: { label: 'Response Time', value: 'Within 24 hours' },
      location: { label: 'Location', value: 'London, United Kingdom' },
    },
    whatToExpect: {
      title: 'What to Expect',
      items: [
        { title: 'Quick Response:', description: "We'll get back to you within 24 hours" },
        { title: 'Strategy Call:', description: '30-minute call to understand your business and goals' },
        { title: 'Custom Proposal:', description: 'Tailored plan with clear pricing and expected results' },
        { title: 'No Pressure:', description: 'Zero obligations — just valuable insights for your business' },
      ],
    },
    trustBadges: ['50+ Happy Clients', '21x Average ROAS', 'Results Guaranteed'],
    faq: {
      badge: 'FAQ',
      title: 'Frequently Asked',
      titleHighlight: 'Questions',
      subtitle: 'Everything you need to know about working with us.',
      questions: [
        { question: 'How much does it cost?', answer: "Pricing depends on your specific needs and goals. Our packages typically start from £1,200/month for ongoing services. We'll provide a custom quote after understanding your business during our free strategy call." },
        { question: 'How long until I see results?', answer: 'Most clients start seeing results within 2-4 weeks for paid advertising, 2-3 months for SEO, and immediately for social media engagement. We focus on quick wins whilst building long-term growth.' },
        { question: 'Do you require long-term contracts?', answer: "No long-term contracts required. We work on a month-to-month basis because we believe in earning your business every month through results. Our clients stay because they see ROI, not because they're locked in." },
        { question: 'What industries do you work with?', answer: 'We work with businesses across all industries — from e-commerce and SaaS to local services and professional firms. If you have customers to reach online, we can help you grow.' },
        { question: "What's included in the free strategy call?", answer: "During our 30-minute call, we'll analyse your current marketing efforts, identify opportunities for growth, and provide actionable recommendations — whether you work with us or not. No sales pressure, just value." },
      ],
    },
  },
  // IE - Irish English (British spelling, EUR currency)
  ie: {
    meta: {
      title: 'Contact Us',
      description: 'Get in touch with Rosey Co. Book a free strategy call and discover how we can help grow your business in Ireland.',
    },
    hero: {
      badge: 'Get In Touch',
      title: "Let's Grow Your",
      titleHighlight: 'Business Together',
      subtitle: 'Book a free strategy call and discover exactly how we can help you get more leads, more customers, and more revenue.',
    },
    form: {
      title: 'Get Your Free Strategy Call',
      subtitle: "Fill out the form below and we'll be in touch within 24 hours.",
      firstName: 'First Name *',
      lastName: 'Last Name *',
      email: 'Email Address *',
      phone: 'Phone Number',
      website: 'Website URL',
      serviceLabel: 'Service Interested In *',
      services: [
        { value: 'seo', label: 'SEO Services' },
        { value: 'social-media', label: 'Social Media Management' },
        { value: 'paid-ads', label: 'Paid Advertising' },
        { value: 'website-design', label: 'Website Design' },
        { value: 'other', label: 'Other / Not Sure' },
      ],
      messageLabel: 'Tell us about your business and goals *',
      messagePlaceholder: 'What are you looking to achieve? What challenges are you facing?',
      submit: 'Book Your Free Strategy Call',
      submitting: 'Sending...',
      privacyText: 'By submitting this form, you agree to our',
      privacyLink: 'Privacy Policy',
      successTitle: 'Thanks for reaching out!',
      successMessage: "We've received your message and will get back to you within 24 hours.",
      sendAnother: 'Send Another Message',
    },
    contactInfo: {
      title: 'Other Ways to Reach Us',
      subtitle: "Prefer to reach out directly? Here's how you can contact us.",
      email: { label: 'Email', value: 'team@roseyco.com' },
      phone: { label: 'Phone', value: '+353 1 234 5678' },
      response: { label: 'Response Time', value: 'Within 24 hours' },
      location: { label: 'Location', value: 'Dublin, Ireland' },
    },
    whatToExpect: {
      title: 'What to Expect',
      items: [
        { title: 'Quick Response:', description: "We'll get back to you within 24 hours" },
        { title: 'Strategy Call:', description: '30-minute call to understand your business and goals' },
        { title: 'Custom Proposal:', description: 'Tailored plan with clear pricing and expected results' },
        { title: 'No Pressure:', description: 'Zero obligations — just valuable insights for your business' },
      ],
    },
    trustBadges: ['50+ Happy Clients', '21x Average ROAS', 'Results Guaranteed'],
    faq: {
      badge: 'FAQ',
      title: 'Frequently Asked',
      titleHighlight: 'Questions',
      subtitle: 'Everything you need to know about working with us.',
      questions: [
        { question: 'How much does it cost?', answer: "Pricing depends on your specific needs and goals. Our packages typically start from €1,500/month for ongoing services. We'll provide a custom quote after understanding your business during our free strategy call." },
        { question: 'How long until I see results?', answer: 'Most clients start seeing results within 2-4 weeks for paid advertising, 2-3 months for SEO, and immediately for social media engagement. We focus on quick wins whilst building long-term growth.' },
        { question: 'Do you require long-term contracts?', answer: "No long-term contracts required. We work on a month-to-month basis because we believe in earning your business every month through results. Our clients stay because they see ROI, not because they're locked in." },
        { question: 'What industries do you work with?', answer: 'We work with businesses across all industries — from e-commerce and SaaS to local services and professional firms. If you have customers to reach online, we can help you grow.' },
        { question: "What's included in the free strategy call?", answer: "During our 30-minute call, we'll analyse your current marketing efforts, identify opportunities for growth, and provide actionable recommendations — whether you work with us or not. No sales pressure, just value." },
      ],
    },
  },
};

// ============================================
// RESULTS PAGE TRANSLATIONS
// ============================================
export interface ResultsPageTranslations {
  meta: { title: string; description: string };
  hero: {
    badge: string;
    title: string;
    titleHighlight: string;
    subtitle: string;
  };
  trustedBy: string;
  stats: {
    revenue: string;
    roas: string;
    clients: string;
    growth: string;
  };
  caseStudies: {
    title: string;
    titleHighlight: string;
    subtitle: string;
    challenge: string;
    solution: string;
    results: string;
    industries: {
      ecommerce: string;
      saas: string;
      realEstate: string;
      consulting: string;
    };
    details: Array<{
      challengeText: string;
      solutionText: string;
    }>;
    metrics: {
      roas: string;
      revenue: string;
      cpa: string;
      organicTraffic: string;
      leads: string;
      domainAuthority: string;
      followers: string;
      engagement: string;
      leadsPerMonth: string;
      conversionRate: string;
      pageSpeed: string;
    };
  };
  videoPortfolio: {
    title: string;
    titleHighlight: string;
    subtitle: string;
    seeMore: string;
    categories: {
      brandContent: string;
      paidAds: string;
      socialContent: string;
      testimonials: string;
      educational: string;
      events: string;
    };
  };
  testimonials: {
    title: string;
    titleHighlight: string;
    subtitle: string;
  };
  instagram: {
    title: string;
    titleHighlight: string;
    subtitle: string;
  };
  cta: {
    badge: string;
    title: string;
    titleHighlight: string;
    subtitle: string;
    button: string;
    buttonSecondary: string;
    disclaimer: string;
  };
}

export const resultsPageTranslations: TranslationRecord<ResultsPageTranslations> = {
  us: {
    meta: {
      title: 'Our Results',
      description: 'See real results from real businesses. Case studies, testimonials, and proof of our marketing success.',
    },
    hero: {
      badge: 'Our Results',
      title: 'Real Results for',
      titleHighlight: 'Real Businesses',
      subtitle: "We don't just talk about results — we prove them. Here's what we've achieved for businesses just like yours.",
    },
    trustedBy: 'Trusted by businesses worldwide',
    stats: { revenue: 'Revenue Generated', roas: 'Average ROAS', clients: 'Happy Clients', growth: 'Avg. Growth' },
    caseStudies: {
      title: 'Client',
      titleHighlight: 'Case Studies',
      subtitle: "Deep dives into how we've helped businesses achieve transformational growth.",
      challenge: 'The Challenge',
      solution: 'Our Solution',
      results: 'The Results',
      industries: { ecommerce: 'E-Commerce Brand', saas: 'B2B SaaS Company', realEstate: 'Real Estate Agency', consulting: 'Professional Services' },
      details: [
        {
          challengeText: 'Struggling to scale paid ads profitably with increasing CPAs and stagnant ROAS.',
          solutionText: 'Restructured Meta Ads account, implemented advanced retargeting, and optimized landing pages.',
        },
        {
          challengeText: 'Low organic visibility and relying entirely on paid channels for lead generation.',
          solutionText: 'Comprehensive SEO strategy targeting high-intent keywords and technical optimizations.',
        },
        {
          challengeText: 'Minimal social media presence and inconsistent lead flow from digital channels.',
          solutionText: 'Full social media management with content strategy, community building, and paid social ads.',
        },
        {
          challengeText: 'Outdated website with poor conversion rates and no clear lead capture strategy.',
          solutionText: 'Complete website redesign with conversion optimization, SEO, and analytics integration.',
        },
      ],
      metrics: {
        roas: 'ROAS',
        revenue: 'Revenue',
        cpa: 'CPA',
        organicTraffic: 'Organic Traffic',
        leads: 'Leads',
        domainAuthority: 'Domain Authority',
        followers: 'Followers',
        engagement: 'Engagement',
        leadsPerMonth: 'Leads/Month',
        conversionRate: 'Conversion Rate',
        pageSpeed: 'Page Speed',
      },
    },
    videoPortfolio: {
      title: 'Video',
      titleHighlight: 'Portfolio',
      subtitle: 'See examples of our video production and marketing content.',
      seeMore: 'Want to see more?',
      categories: { brandContent: 'Brand Content', paidAds: 'Paid Advertising', socialContent: 'Social Content', testimonials: 'Testimonials', educational: 'Educational', events: 'Event Coverage' },
    },
    testimonials: {
      title: 'What Our Clients',
      titleHighlight: 'Say About Us',
      subtitle: "Don't take our word for it — hear from the businesses we've helped grow.",
    },
    instagram: {
      title: 'Follow Us on',
      titleHighlight: 'Instagram',
      subtitle: 'Get daily marketing tips, behind-the-scenes content, and client success stories.',
    },
    cta: {
      badge: 'Your Turn',
      title: 'Ready to Be Our',
      titleHighlight: 'Next Success Story?',
      subtitle: "Book a free strategy call and let's discuss how we can achieve similar results for your business.",
      button: 'Get Your Free Strategy Call',
      buttonSecondary: 'Explore Services',
      disclaimer: 'No commitment required. 100% free consultation.',
    },
  },
  nl: {
    meta: {
      title: 'Onze Resultaten',
      description: 'Bekijk echte resultaten van echte bedrijven. Case studies, testimonials en bewijs van ons marketingsucces.',
    },
    hero: {
      badge: 'Onze Resultaten',
      title: 'Echte Resultaten voor',
      titleHighlight: 'Echte Bedrijven',
      subtitle: 'We praten niet alleen over resultaten — we bewijzen ze. Dit is wat we hebben bereikt voor bedrijven zoals het jouwe.',
    },
    trustedBy: 'Vertrouwd door bedrijven wereldwijd',
    stats: { revenue: 'Omzet Gegenereerd', roas: 'Gemiddelde ROAS', clients: 'Tevreden Klanten', growth: 'Gem. Groei' },
    caseStudies: {
      title: 'Klant',
      titleHighlight: 'Case Studies',
      subtitle: 'Diepgaande analyses van hoe we bedrijven hebben geholpen met transformationele groei.',
      challenge: 'De Uitdaging',
      solution: 'Onze Oplossing',
      results: 'De Resultaten',
      industries: { ecommerce: 'E-Commerce Merk', saas: 'B2B SaaS Bedrijf', realEstate: 'Makelaarskantoor', consulting: 'Professionele Diensten' },
      details: [
        {
          challengeText: 'Moeite met het winstgevend opschalen van betaalde advertenties met stijgende CPA\'s en stagnerende ROAS.',
          solutionText: 'Herstructurering van Meta Ads-account, implementatie van geavanceerde retargeting en optimalisatie van landingspagina\'s.',
        },
        {
          challengeText: 'Lage organische zichtbaarheid en volledig afhankelijk van betaalde kanalen voor leadgeneratie.',
          solutionText: 'Uitgebreide SEO-strategie gericht op high-intent zoekwoorden en technische optimalisaties.',
        },
        {
          challengeText: 'Minimale social media-aanwezigheid en inconsistente leadstroom vanuit digitale kanalen.',
          solutionText: 'Volledig social media management met contentstrategie, community building en betaalde sociale advertenties.',
        },
        {
          challengeText: 'Verouderde website met slechte conversieratio\'s en geen duidelijke lead capture-strategie.',
          solutionText: 'Complete website redesign met conversie-optimalisatie, SEO en analytics-integratie.',
        },
      ],
      metrics: {
        roas: 'ROAS',
        revenue: 'Omzet',
        cpa: 'CPA',
        organicTraffic: 'Organisch Verkeer',
        leads: 'Leads',
        domainAuthority: 'Domeinautoriteit',
        followers: 'Volgers',
        engagement: 'Betrokkenheid',
        leadsPerMonth: 'Leads/Maand',
        conversionRate: 'Conversieratio',
        pageSpeed: 'Paginasnelheid',
      },
    },
    videoPortfolio: {
      title: 'Video',
      titleHighlight: 'Portfolio',
      subtitle: 'Bekijk voorbeelden van onze videoproductie en marketingcontent.',
      seeMore: 'Wil je meer zien?',
      categories: { brandContent: 'Merk Content', paidAds: 'Betaalde Advertenties', socialContent: 'Social Content', testimonials: 'Testimonials', educational: 'Educatief', events: 'Evenement Coverage' },
    },
    testimonials: {
      title: 'Wat Onze Klanten',
      titleHighlight: 'Over Ons Zeggen',
      subtitle: 'Neem niet ons woord ervoor — hoor van de bedrijven die we hebben geholpen groeien.',
    },
    instagram: {
      title: 'Volg Ons op',
      titleHighlight: 'Instagram',
      subtitle: 'Krijg dagelijkse marketingtips, behind-the-scenes content en klantsuccesverhalen.',
    },
    cta: {
      badge: 'Jouw Beurt',
      title: 'Klaar Om Ons',
      titleHighlight: 'Volgende Succesverhaal Te Zijn?',
      subtitle: 'Boek een gratis strategiegesprek en laten we bespreken hoe we vergelijkbare resultaten voor jouw bedrijf kunnen bereiken.',
      button: 'Gratis Strategiegesprek',
      buttonSecondary: 'Ontdek Diensten',
      disclaimer: 'Geen verplichting. 100% gratis consult.',
    },
  },
  dk: {
    meta: {
      title: 'Vores Resultater',
      description: 'Se rigtige resultater fra rigtige virksomheder. Case studies, testimonials og bevis på vores marketingsucces.',
    },
    hero: {
      badge: 'Vores Resultater',
      title: 'Rigtige Resultater for',
      titleHighlight: 'Rigtige Virksomheder',
      subtitle: 'Vi taler ikke bare om resultater — vi beviser dem. Her er hvad vi har opnået for virksomheder som din.',
    },
    trustedBy: 'Betroet af virksomheder verden over',
    stats: { revenue: 'Omsætning Genereret', roas: 'Gennemsnitlig ROAS', clients: 'Glade Kunder', growth: 'Gns. Vækst' },
    caseStudies: {
      title: 'Kunde',
      titleHighlight: 'Case Studies',
      subtitle: 'Dybdegående analyser af, hvordan vi har hjulpet virksomheder med at opnå transformationel vækst.',
      challenge: 'Udfordringen',
      solution: 'Vores Løsning',
      results: 'Resultaterne',
      industries: { ecommerce: 'E-Commerce Brand', saas: 'B2B SaaS Virksomhed', realEstate: 'Ejendomsmægler', consulting: 'Professionelle Tjenester' },
      details: [
        {
          challengeText: 'Svært at skalere betalte annoncer profitabelt med stigende CPA\'er og stagnerende ROAS.',
          solutionText: 'Omstrukturering af Meta Ads-konto, implementering af avanceret retargeting og optimering af landingssider.',
        },
        {
          challengeText: 'Lav organisk synlighed og fuldstændig afhængig af betalte kanaler til leadgenerering.',
          solutionText: 'Omfattende SEO-strategi rettet mod søgeord med høj intention og tekniske optimeringer.',
        },
        {
          challengeText: 'Minimal tilstedeværelse på sociale medier og inkonsistent leadflow fra digitale kanaler.',
          solutionText: 'Fuld social media management med indholdsstrategi, community building og betalte sociale annoncer.',
        },
        {
          challengeText: 'Forældet hjemmeside med dårlige konverteringsrater og ingen klar lead capture-strategi.',
          solutionText: 'Komplet hjemmeside redesign med konverteringsoptimering, SEO og analytics-integration.',
        },
      ],
      metrics: {
        roas: 'ROAS',
        revenue: 'Omsætning',
        cpa: 'CPA',
        organicTraffic: 'Organisk Trafik',
        leads: 'Leads',
        domainAuthority: 'Domæneautoritet',
        followers: 'Følgere',
        engagement: 'Engagement',
        leadsPerMonth: 'Leads/Måned',
        conversionRate: 'Konverteringsrate',
        pageSpeed: 'Sidehastighed',
      },
    },
    videoPortfolio: {
      title: 'Video',
      titleHighlight: 'Portfolio',
      subtitle: 'Se eksempler på vores videoproduktion og marketingindhold.',
      seeMore: 'Vil du se mere?',
      categories: { brandContent: 'Brand Indhold', paidAds: 'Betalt Annoncering', socialContent: 'Social Indhold', testimonials: 'Testimonials', educational: 'Uddannelse', events: 'Event Dækning' },
    },
    testimonials: {
      title: 'Hvad Vores Kunder',
      titleHighlight: 'Siger Om Os',
      subtitle: 'Tag ikke vores ord for det — hør fra de virksomheder, vi har hjulpet med at vokse.',
    },
    instagram: {
      title: 'Følg Os På',
      titleHighlight: 'Instagram',
      subtitle: 'Få daglige marketingtips, behind-the-scenes indhold og kundesucceshistorier.',
    },
    cta: {
      badge: 'Din Tur',
      title: 'Klar Til At Være Vores',
      titleHighlight: 'Næste Succeshistorie?',
      subtitle: 'Book et gratis strategikald, og lad os diskutere, hvordan vi kan opnå lignende resultater for din virksomhed.',
      button: 'Få Dit Gratis Strategikald',
      buttonSecondary: 'Udforsk Tjenester',
      disclaimer: 'Ingen forpligtelse. 100% gratis konsultation.',
    },
  },
  // AU - Australian English
  au: {
    meta: {
      title: 'Our Results',
      description: 'See real results from real Australian businesses. Case studies, testimonials, and proof of our marketing success.',
    },
    hero: {
      badge: 'Our Results',
      title: 'Real Results for',
      titleHighlight: 'Real Businesses',
      subtitle: "We don't just talk about results — we prove them. Here's what we've achieved for businesses just like yours.",
    },
    trustedBy: 'Trusted by businesses across Australia',
    stats: { revenue: 'Revenue Generated', roas: 'Average ROAS', clients: 'Happy Clients', growth: 'Avg. Growth' },
    caseStudies: {
      title: 'Client',
      titleHighlight: 'Case Studies',
      subtitle: "Deep dives into how we've helped businesses achieve transformational growth.",
      challenge: 'The Challenge',
      solution: 'Our Solution',
      results: 'The Results',
      industries: { ecommerce: 'E-Commerce Brand', saas: 'B2B SaaS Company', realEstate: 'Real Estate Agency', consulting: 'Professional Services' },
      details: [
        {
          challengeText: 'Struggling to scale paid ads profitably with increasing CPAs and stagnant ROAS.',
          solutionText: 'Restructured Meta Ads account, implemented advanced retargeting, and optimized landing pages.',
        },
        {
          challengeText: 'Low organic visibility and relying entirely on paid channels for lead generation.',
          solutionText: 'Comprehensive SEO strategy targeting high-intent keywords and technical optimizations.',
        },
        {
          challengeText: 'Minimal social media presence and inconsistent lead flow from digital channels.',
          solutionText: 'Full social media management with content strategy, community building, and paid social ads.',
        },
        {
          challengeText: 'Outdated website with poor conversion rates and no clear lead capture strategy.',
          solutionText: 'Complete website redesign with conversion optimization, SEO, and analytics integration.',
        },
      ],
      metrics: {
        roas: 'ROAS',
        revenue: 'Revenue',
        cpa: 'CPA',
        organicTraffic: 'Organic Traffic',
        leads: 'Leads',
        domainAuthority: 'Domain Authority',
        followers: 'Followers',
        engagement: 'Engagement',
        leadsPerMonth: 'Leads/Month',
        conversionRate: 'Conversion Rate',
        pageSpeed: 'Page Speed',
      },
    },
    videoPortfolio: {
      title: 'Video',
      titleHighlight: 'Portfolio',
      subtitle: 'See examples of our video production and marketing content.',
      seeMore: 'Want to see more?',
      categories: { brandContent: 'Brand Content', paidAds: 'Paid Advertising', socialContent: 'Social Content', testimonials: 'Testimonials', educational: 'Educational', events: 'Event Coverage' },
    },
    testimonials: {
      title: 'What Our Clients',
      titleHighlight: 'Say About Us',
      subtitle: "Don't take our word for it — hear from the businesses we've helped grow.",
    },
    instagram: {
      title: 'Follow Us on',
      titleHighlight: 'Instagram',
      subtitle: 'Get daily marketing tips, behind-the-scenes content, and client success stories.',
    },
    cta: {
      badge: 'Your Turn',
      title: 'Ready to Be Our',
      titleHighlight: 'Next Success Story?',
      subtitle: "Book a free strategy call and let's discuss how we can achieve similar results for your business.",
      button: 'Get Your Free Strategy Call',
      buttonSecondary: 'Explore Services',
      disclaimer: 'No commitment required. 100% free consultation.',
    },
  },
  // UK - British English
  uk: {
    meta: {
      title: 'Our Results',
      description: 'See real results from real UK businesses. Case studies, testimonials, and proof of our marketing success.',
    },
    hero: {
      badge: 'Our Results',
      title: 'Real Results for',
      titleHighlight: 'Real Businesses',
      subtitle: "We don't just talk about results — we prove them. Here's what we've achieved for businesses just like yours.",
    },
    trustedBy: 'Trusted by businesses across the UK',
    stats: { revenue: 'Revenue Generated', roas: 'Average ROAS', clients: 'Happy Clients', growth: 'Avg. Growth' },
    caseStudies: {
      title: 'Client',
      titleHighlight: 'Case Studies',
      subtitle: "Deep dives into how we've helped businesses achieve transformational growth.",
      challenge: 'The Challenge',
      solution: 'Our Solution',
      results: 'The Results',
      industries: { ecommerce: 'E-Commerce Brand', saas: 'B2B SaaS Company', realEstate: 'Estate Agency', consulting: 'Professional Services' },
      details: [
        {
          challengeText: 'Struggling to scale paid ads profitably with increasing CPAs and stagnant ROAS.',
          solutionText: 'Restructured Meta Ads account, implemented advanced retargeting, and optimised landing pages.',
        },
        {
          challengeText: 'Low organic visibility and relying entirely on paid channels for lead generation.',
          solutionText: 'Comprehensive SEO strategy targeting high-intent keywords and technical optimisations.',
        },
        {
          challengeText: 'Minimal social media presence and inconsistent lead flow from digital channels.',
          solutionText: 'Full social media management with content strategy, community building, and paid social ads.',
        },
        {
          challengeText: 'Outdated website with poor conversion rates and no clear lead capture strategy.',
          solutionText: 'Complete website redesign with conversion optimisation, SEO, and analytics integration.',
        },
      ],
      metrics: {
        roas: 'ROAS',
        revenue: 'Revenue',
        cpa: 'CPA',
        organicTraffic: 'Organic Traffic',
        leads: 'Leads',
        domainAuthority: 'Domain Authority',
        followers: 'Followers',
        engagement: 'Engagement',
        leadsPerMonth: 'Leads/Month',
        conversionRate: 'Conversion Rate',
        pageSpeed: 'Page Speed',
      },
    },
    videoPortfolio: {
      title: 'Video',
      titleHighlight: 'Portfolio',
      subtitle: 'See examples of our video production and marketing content.',
      seeMore: 'Want to see more?',
      categories: { brandContent: 'Brand Content', paidAds: 'Paid Advertising', socialContent: 'Social Content', testimonials: 'Testimonials', educational: 'Educational', events: 'Event Coverage' },
    },
    testimonials: {
      title: 'What Our Clients',
      titleHighlight: 'Say About Us',
      subtitle: "Don't take our word for it — hear from the businesses we've helped grow.",
    },
    instagram: {
      title: 'Follow Us on',
      titleHighlight: 'Instagram',
      subtitle: 'Get daily marketing tips, behind-the-scenes content, and client success stories.',
    },
    cta: {
      badge: 'Your Turn',
      title: 'Ready to Be Our',
      titleHighlight: 'Next Success Story?',
      subtitle: "Book a free strategy call and let's discuss how we can achieve similar results for your business.",
      button: 'Get Your Free Strategy Call',
      buttonSecondary: 'Explore Services',
      disclaimer: 'No commitment required. 100% free consultation.',
    },
  },
  // IE - Irish English
  ie: {
    meta: {
      title: 'Our Results',
      description: 'See real results from real Irish businesses. Case studies, testimonials, and proof of our marketing success.',
    },
    hero: {
      badge: 'Our Results',
      title: 'Real Results for',
      titleHighlight: 'Real Businesses',
      subtitle: "We don't just talk about results — we prove them. Here's what we've achieved for businesses just like yours.",
    },
    trustedBy: 'Trusted by businesses across Ireland',
    stats: { revenue: 'Revenue Generated', roas: 'Average ROAS', clients: 'Happy Clients', growth: 'Avg. Growth' },
    caseStudies: {
      title: 'Client',
      titleHighlight: 'Case Studies',
      subtitle: "Deep dives into how we've helped businesses achieve transformational growth.",
      challenge: 'The Challenge',
      solution: 'Our Solution',
      results: 'The Results',
      industries: { ecommerce: 'E-Commerce Brand', saas: 'B2B SaaS Company', realEstate: 'Estate Agency', consulting: 'Professional Services' },
      details: [
        {
          challengeText: 'Struggling to scale paid ads profitably with increasing CPAs and stagnant ROAS.',
          solutionText: 'Restructured Meta Ads account, implemented advanced retargeting, and optimised landing pages.',
        },
        {
          challengeText: 'Low organic visibility and relying entirely on paid channels for lead generation.',
          solutionText: 'Comprehensive SEO strategy targeting high-intent keywords and technical optimisations.',
        },
        {
          challengeText: 'Minimal social media presence and inconsistent lead flow from digital channels.',
          solutionText: 'Full social media management with content strategy, community building, and paid social ads.',
        },
        {
          challengeText: 'Outdated website with poor conversion rates and no clear lead capture strategy.',
          solutionText: 'Complete website redesign with conversion optimisation, SEO, and analytics integration.',
        },
      ],
      metrics: {
        roas: 'ROAS',
        revenue: 'Revenue',
        cpa: 'CPA',
        organicTraffic: 'Organic Traffic',
        leads: 'Leads',
        domainAuthority: 'Domain Authority',
        followers: 'Followers',
        engagement: 'Engagement',
        leadsPerMonth: 'Leads/Month',
        conversionRate: 'Conversion Rate',
        pageSpeed: 'Page Speed',
      },
    },
    videoPortfolio: {
      title: 'Video',
      titleHighlight: 'Portfolio',
      subtitle: 'See examples of our video production and marketing content.',
      seeMore: 'Want to see more?',
      categories: { brandContent: 'Brand Content', paidAds: 'Paid Advertising', socialContent: 'Social Content', testimonials: 'Testimonials', educational: 'Educational', events: 'Event Coverage' },
    },
    testimonials: {
      title: 'What Our Clients',
      titleHighlight: 'Say About Us',
      subtitle: "Don't take our word for it — hear from the businesses we've helped grow.",
    },
    instagram: {
      title: 'Follow Us on',
      titleHighlight: 'Instagram',
      subtitle: 'Get daily marketing tips, behind-the-scenes content, and client success stories.',
    },
    cta: {
      badge: 'Your Turn',
      title: 'Ready to Be Our',
      titleHighlight: 'Next Success Story?',
      subtitle: "Book a free strategy call and let's discuss how we can achieve similar results for your business.",
      button: 'Get Your Free Strategy Call',
      buttonSecondary: 'Explore Services',
      disclaimer: 'No commitment required. 100% free consultation.',
    },
  },
};

// ============================================
// PRIVACY PAGE TRANSLATIONS
// ============================================
export interface PrivacyPageTranslations {
  meta: { title: string; description: string };
  hero: { title: string; titleHighlight: string; lastUpdated: string };
  sections: {
    introduction: { title: string; content: string };
    informationCollect: { title: string; intro: string; items: string[] };
    howWeUse: { title: string; intro: string; items: string[] };
    cookies: { title: string; content: string };
    thirdParty: { title: string; content: string };
    dataSecurity: { title: string; content: string };
    yourRights: { title: string; intro: string; items: string[] };
    changes: { title: string; content: string };
    contact: { title: string; content: string };
  };
}

export const privacyPageTranslations: TranslationRecord<PrivacyPageTranslations> = {
  us: {
    meta: { title: 'Privacy Policy', description: 'Privacy Policy for Rosey Co. Learn how we collect, use, and protect your data.' },
    hero: { title: 'Privacy', titleHighlight: 'Policy', lastUpdated: 'Last updated: December 2024' },
    sections: {
      introduction: { title: 'Introduction', content: 'Rosey Co. ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website roseyco.com and use our services.' },
      informationCollect: { title: 'Information We Collect', intro: 'We collect information you provide directly to us, including:', items: ['Name and contact information (email, phone number)', 'Business information and website URL', 'Information you provide in contact forms or surveys', 'Communication records when you contact us', 'Payment information (processed securely through our payment providers)'] },
      howWeUse: { title: 'How We Use Your Information', intro: 'We use the information we collect to:', items: ['Provide and improve our marketing services', 'Communicate with you about our services', 'Send you marketing and promotional communications', 'Analyze website usage and improve user experience', 'Process transactions and send related information', 'Respond to your comments and questions'] },
      cookies: { title: 'Cookies and Tracking', content: 'We use cookies and similar tracking technologies to track activity on our website and hold certain information. Cookies are files with a small amount of data that may include an anonymous unique identifier. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.' },
      thirdParty: { title: 'Third-Party Services', content: 'We may employ third-party companies and individuals to facilitate our services, provide services on our behalf, perform service-related tasks, or assist us in analyzing how our services are used. These third parties have access to your personal information only to perform these tasks on our behalf and are obligated not to disclose or use it for any other purpose.' },
      dataSecurity: { title: 'Data Security', content: 'We implement appropriate security measures to protect against unauthorized access, alteration, disclosure, or destruction of your personal information. However, no method of transmission over the Internet or electronic storage is 100% secure.' },
      yourRights: { title: 'Your Rights', intro: 'Depending on your location, you may have certain rights regarding your personal information:', items: ['Access your personal data', 'Correct inaccurate data', 'Request deletion of your data', 'Object to processing of your data', 'Request data portability', 'Withdraw consent at any time'] },
      changes: { title: 'Changes to This Policy', content: 'We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.' },
      contact: { title: 'Contact Us', content: 'If you have any questions about this Privacy Policy, please contact us at' },
    },
  },
  nl: {
    meta: { title: 'Privacybeleid', description: 'Privacybeleid voor Rosey Co. Lees hoe we je gegevens verzamelen, gebruiken en beschermen.' },
    hero: { title: 'Privacy', titleHighlight: 'Beleid', lastUpdated: 'Laatst bijgewerkt: December 2024' },
    sections: {
      introduction: { title: 'Inleiding', content: 'Rosey Co. ("wij," "ons," of "onze") zet zich in voor de bescherming van je privacy. Dit Privacybeleid legt uit hoe we je informatie verzamelen, gebruiken, openbaar maken en beschermen wanneer je onze website roseyco.com bezoekt en onze diensten gebruikt.' },
      informationCollect: { title: 'Informatie Die We Verzamelen', intro: 'We verzamelen informatie die je direct aan ons verstrekt, waaronder:', items: ['Naam en contactgegevens (e-mail, telefoonnummer)', 'Bedrijfsinformatie en website URL', 'Informatie die je verstrekt in contactformulieren of enquêtes', 'Communicatiegegevens wanneer je contact met ons opneemt', 'Betalingsinformatie (veilig verwerkt via onze betalingsproviders)'] },
      howWeUse: { title: 'Hoe We Je Informatie Gebruiken', intro: 'We gebruiken de verzamelde informatie om:', items: ['Onze marketingdiensten te leveren en te verbeteren', 'Met je te communiceren over onze diensten', 'Marketing- en promotionele communicatie te sturen', 'Websitegebruik te analyseren en gebruikerservaring te verbeteren', 'Transacties te verwerken en gerelateerde informatie te sturen', 'Te reageren op je opmerkingen en vragen'] },
      cookies: { title: 'Cookies en Tracking', content: 'We gebruiken cookies en vergelijkbare trackingtechnologieën om activiteit op onze website bij te houden en bepaalde informatie vast te houden. Cookies zijn bestanden met een kleine hoeveelheid data die een anonieme unieke identificator kunnen bevatten. Je kunt je browser instrueren om alle cookies te weigeren of aan te geven wanneer een cookie wordt verzonden.' },
      thirdParty: { title: 'Diensten Van Derden', content: 'We kunnen bedrijven en individuen van derden inschakelen om onze diensten te faciliteren, diensten namens ons te verlenen, servicegerelateerde taken uit te voeren of ons te helpen bij het analyseren van hoe onze diensten worden gebruikt. Deze derden hebben alleen toegang tot je persoonlijke informatie om deze taken namens ons uit te voeren en zijn verplicht deze niet openbaar te maken of voor andere doeleinden te gebruiken.' },
      dataSecurity: { title: 'Gegevensbeveiliging', content: 'We implementeren passende beveiligingsmaatregelen om te beschermen tegen ongeautoriseerde toegang, wijziging, openbaarmaking of vernietiging van je persoonlijke informatie. Geen enkele methode van overdracht via internet of elektronische opslag is echter 100% veilig.' },
      yourRights: { title: 'Je Rechten', intro: 'Afhankelijk van je locatie heb je mogelijk bepaalde rechten met betrekking tot je persoonlijke informatie:', items: ['Toegang tot je persoonlijke gegevens', 'Onjuiste gegevens corrigeren', 'Verwijdering van je gegevens aanvragen', 'Bezwaar maken tegen verwerking van je gegevens', 'Gegevensportabiliteit aanvragen', 'Toestemming op elk moment intrekken'] },
      changes: { title: 'Wijzigingen In Dit Beleid', content: 'We kunnen dit Privacybeleid van tijd tot tijd bijwerken. We zullen je op de hoogte stellen van eventuele wijzigingen door het nieuwe Privacybeleid op deze pagina te plaatsen en de "Laatst bijgewerkt" datum bij te werken.' },
      contact: { title: 'Neem Contact Op', content: 'Als je vragen hebt over dit Privacybeleid, neem dan contact met ons op via' },
    },
  },
  dk: {
    meta: { title: 'Privatlivspolitik', description: 'Privatlivspolitik for Rosey Co. Lær hvordan vi indsamler, bruger og beskytter dine data.' },
    hero: { title: 'Privatlivs', titleHighlight: 'Politik', lastUpdated: 'Sidst opdateret: December 2024' },
    sections: {
      introduction: { title: 'Introduktion', content: 'Rosey Co. ("vi," "vores," eller "os") er forpligtet til at beskytte dit privatliv. Denne Privatlivspolitik forklarer, hvordan vi indsamler, bruger, videregiver og beskytter dine oplysninger, når du besøger vores hjemmeside roseyco.com og bruger vores tjenester.' },
      informationCollect: { title: 'Oplysninger Vi Indsamler', intro: 'Vi indsamler oplysninger, du giver direkte til os, herunder:', items: ['Navn og kontaktoplysninger (e-mail, telefonnummer)', 'Virksomhedsoplysninger og hjemmeside URL', 'Oplysninger du giver i kontaktformularer eller undersøgelser', 'Kommunikationsoptegnelser når du kontakter os', 'Betalingsoplysninger (behandlet sikkert gennem vores betalingsudbydere)'] },
      howWeUse: { title: 'Hvordan Vi Bruger Dine Oplysninger', intro: 'Vi bruger de indsamlede oplysninger til at:', items: ['Levere og forbedre vores marketingtjenester', 'Kommunikere med dig om vores tjenester', 'Sende dig marketing- og salgsfremmende kommunikation', 'Analysere hjemmesidebrug og forbedre brugeroplevelsen', 'Behandle transaktioner og sende relaterede oplysninger', 'Svare på dine kommentarer og spørgsmål'] },
      cookies: { title: 'Cookies og Sporing', content: 'Vi bruger cookies og lignende sporingsteknologier til at spore aktivitet på vores hjemmeside og gemme visse oplysninger. Cookies er filer med en lille mængde data, der kan inkludere en anonym unik identifikator. Du kan instruere din browser til at afvise alle cookies eller indikere, når en cookie sendes.' },
      thirdParty: { title: 'Tredjepartstjenester', content: 'Vi kan ansætte tredjepartsvirksomheder og enkeltpersoner til at facilitere vores tjenester, levere tjenester på vores vegne, udføre servicerelaterede opgaver eller hjælpe os med at analysere, hvordan vores tjenester bruges. Disse tredjeparter har kun adgang til dine personlige oplysninger for at udføre disse opgaver på vores vegne og er forpligtet til ikke at videregive eller bruge dem til andre formål.' },
      dataSecurity: { title: 'Datasikkerhed', content: 'Vi implementerer passende sikkerhedsforanstaltninger for at beskytte mod uautoriseret adgang, ændring, videregivelse eller ødelæggelse af dine personlige oplysninger. Dog er ingen metode til transmission over internettet eller elektronisk lagring 100% sikker.' },
      yourRights: { title: 'Dine Rettigheder', intro: 'Afhængigt af din placering kan du have visse rettigheder vedrørende dine personlige oplysninger:', items: ['Få adgang til dine personlige data', 'Rette unøjagtige data', 'Anmode om sletning af dine data', 'Gøre indsigelse mod behandling af dine data', 'Anmode om dataportabilitet', 'Trække samtykke tilbage når som helst'] },
      changes: { title: 'Ændringer I Denne Politik', content: 'Vi kan opdatere denne Privatlivspolitik fra tid til anden. Vi vil underrette dig om eventuelle ændringer ved at poste den nye Privatlivspolitik på denne side og opdatere "Sidst opdateret" datoen.' },
      contact: { title: 'Kontakt Os', content: 'Hvis du har spørgsmål om denne Privatlivspolitik, kontakt os venligst på' },
    },
  },
  // AU - Australian English (same as US, Privacy Policy is universal)
  au: {
    meta: { title: 'Privacy Policy', description: 'Privacy Policy for Rosey Co. Learn how we collect, use, and protect your data.' },
    hero: { title: 'Privacy', titleHighlight: 'Policy', lastUpdated: 'Last updated: December 2024' },
    sections: {
      introduction: { title: 'Introduction', content: 'Rosey Co. ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website roseyco.com and use our services.' },
      informationCollect: { title: 'Information We Collect', intro: 'We collect information you provide directly to us, including:', items: ['Name and contact information (email, phone number)', 'Business information and website URL', 'Information you provide in contact forms or surveys', 'Communication records when you contact us', 'Payment information (processed securely through our payment providers)'] },
      howWeUse: { title: 'How We Use Your Information', intro: 'We use the information we collect to:', items: ['Provide and improve our marketing services', 'Communicate with you about our services', 'Send you marketing and promotional communications', 'Analyse website usage and improve user experience', 'Process transactions and send related information', 'Respond to your comments and questions'] },
      cookies: { title: 'Cookies and Tracking', content: 'We use cookies and similar tracking technologies to track activity on our website and hold certain information. Cookies are files with a small amount of data that may include an anonymous unique identifier. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.' },
      thirdParty: { title: 'Third-Party Services', content: 'We may employ third-party companies and individuals to facilitate our services, provide services on our behalf, perform service-related tasks, or assist us in analysing how our services are used. These third parties have access to your personal information only to perform these tasks on our behalf and are obligated not to disclose or use it for any other purpose.' },
      dataSecurity: { title: 'Data Security', content: 'We implement appropriate security measures to protect against unauthorised access, alteration, disclosure, or destruction of your personal information. However, no method of transmission over the Internet or electronic storage is 100% secure.' },
      yourRights: { title: 'Your Rights', intro: 'Depending on your location, you may have certain rights regarding your personal information:', items: ['Access your personal data', 'Correct inaccurate data', 'Request deletion of your data', 'Object to processing of your data', 'Request data portability', 'Withdraw consent at any time'] },
      changes: { title: 'Changes to This Policy', content: 'We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.' },
      contact: { title: 'Contact Us', content: 'If you have any questions about this Privacy Policy, please contact us at' },
    },
  },
  // UK - British English
  uk: {
    meta: { title: 'Privacy Policy', description: 'Privacy Policy for Rosey Co. Learn how we collect, use, and protect your data.' },
    hero: { title: 'Privacy', titleHighlight: 'Policy', lastUpdated: 'Last updated: December 2024' },
    sections: {
      introduction: { title: 'Introduction', content: 'Rosey Co. ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website roseyco.com and use our services.' },
      informationCollect: { title: 'Information We Collect', intro: 'We collect information you provide directly to us, including:', items: ['Name and contact information (email, phone number)', 'Business information and website URL', 'Information you provide in contact forms or surveys', 'Communication records when you contact us', 'Payment information (processed securely through our payment providers)'] },
      howWeUse: { title: 'How We Use Your Information', intro: 'We use the information we collect to:', items: ['Provide and improve our marketing services', 'Communicate with you about our services', 'Send you marketing and promotional communications', 'Analyse website usage and improve user experience', 'Process transactions and send related information', 'Respond to your comments and questions'] },
      cookies: { title: 'Cookies and Tracking', content: 'We use cookies and similar tracking technologies to track activity on our website and hold certain information. Cookies are files with a small amount of data that may include an anonymous unique identifier. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.' },
      thirdParty: { title: 'Third-Party Services', content: 'We may employ third-party companies and individuals to facilitate our services, provide services on our behalf, perform service-related tasks, or assist us in analysing how our services are used. These third parties have access to your personal information only to perform these tasks on our behalf and are obligated not to disclose or use it for any other purpose.' },
      dataSecurity: { title: 'Data Security', content: 'We implement appropriate security measures to protect against unauthorised access, alteration, disclosure, or destruction of your personal information. However, no method of transmission over the Internet or electronic storage is 100% secure.' },
      yourRights: { title: 'Your Rights', intro: 'Depending on your location, you may have certain rights regarding your personal information:', items: ['Access your personal data', 'Correct inaccurate data', 'Request deletion of your data', 'Object to processing of your data', 'Request data portability', 'Withdraw consent at any time'] },
      changes: { title: 'Changes to This Policy', content: 'We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.' },
      contact: { title: 'Contact Us', content: 'If you have any questions about this Privacy Policy, please contact us at' },
    },
  },
  // IE - Irish English (British spelling)
  ie: {
    meta: { title: 'Privacy Policy', description: 'Privacy Policy for Rosey Co. Learn how we collect, use, and protect your data.' },
    hero: { title: 'Privacy', titleHighlight: 'Policy', lastUpdated: 'Last updated: December 2024' },
    sections: {
      introduction: { title: 'Introduction', content: 'Rosey Co. ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website roseyco.com and use our services.' },
      informationCollect: { title: 'Information We Collect', intro: 'We collect information you provide directly to us, including:', items: ['Name and contact information (email, phone number)', 'Business information and website URL', 'Information you provide in contact forms or surveys', 'Communication records when you contact us', 'Payment information (processed securely through our payment providers)'] },
      howWeUse: { title: 'How We Use Your Information', intro: 'We use the information we collect to:', items: ['Provide and improve our marketing services', 'Communicate with you about our services', 'Send you marketing and promotional communications', 'Analyse website usage and improve user experience', 'Process transactions and send related information', 'Respond to your comments and questions'] },
      cookies: { title: 'Cookies and Tracking', content: 'We use cookies and similar tracking technologies to track activity on our website and hold certain information. Cookies are files with a small amount of data that may include an anonymous unique identifier. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.' },
      thirdParty: { title: 'Third-Party Services', content: 'We may employ third-party companies and individuals to facilitate our services, provide services on our behalf, perform service-related tasks, or assist us in analysing how our services are used. These third parties have access to your personal information only to perform these tasks on our behalf and are obligated not to disclose or use it for any other purpose.' },
      dataSecurity: { title: 'Data Security', content: 'We implement appropriate security measures to protect against unauthorised access, alteration, disclosure, or destruction of your personal information. However, no method of transmission over the Internet or electronic storage is 100% secure.' },
      yourRights: { title: 'Your Rights', intro: 'Depending on your location, you may have certain rights regarding your personal information:', items: ['Access your personal data', 'Correct inaccurate data', 'Request deletion of your data', 'Object to processing of your data', 'Request data portability', 'Withdraw consent at any time'] },
      changes: { title: 'Changes to This Policy', content: 'We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.' },
      contact: { title: 'Contact Us', content: 'If you have any questions about this Privacy Policy, please contact us at' },
    },
  },
};

// ============================================
// BLOG PAGE TRANSLATIONS
// ============================================
export interface BlogPageTranslations {
  meta: { title: string; description: string };
  hero: {
    badge: string;
    title: string;
    titleHighlight: string;
    subtitle: string;
  };
  categories: {
    all: string;
    paidAdvertising: string;
    seo: string;
    socialMedia: string;
    websiteDesign: string;
    general: string;
    aiMarketing: string;
    caseStudies: string;
    marketingStrategy: string;
  };
  posts: {
    readMore: string;
    minRead: string;
    noPosts: string;
    moreComing: string;
  };
  newsletter: {
    badge: string;
    title: string;
    titleHighlight: string;
    subtitle: string;
    placeholder: string;
    button: string;
    disclaimer: string;
  };
  post: {
    backToBlog: string;
    backToAll: string;
    ctaTitle: string;
    ctaSubtitle: string;
    ctaButton: string;
  };
}

export const blogPageTranslations: TranslationRecord<BlogPageTranslations> = {
  us: {
    meta: {
      title: 'Blog - Marketing Insights & Strategies',
      description: 'Actionable tips, strategies, and insights to help you grow your business through digital marketing.',
    },
    hero: {
      badge: 'Our Blog',
      title: 'Marketing Insights &',
      titleHighlight: 'Strategies',
      subtitle: 'Actionable tips, strategies, and insights to help you grow your business through digital marketing.',
    },
    categories: {
      all: 'All',
      paidAdvertising: 'Paid Advertising',
      seo: 'SEO',
      socialMedia: 'Social Media',
      websiteDesign: 'Website Design',
      general: 'General',
      aiMarketing: 'AI Marketing',
      caseStudies: 'Case Studies',
      marketingStrategy: 'Marketing Strategy',
    },
    posts: {
      readMore: 'Read More',
      minRead: 'min read',
      noPosts: 'No posts yet. Check back soon!',
      moreComing: 'More articles coming soon...',
    },
    newsletter: {
      badge: 'Newsletter',
      title: 'Get Marketing Tips',
      titleHighlight: 'Delivered',
      subtitle: 'Subscribe to our newsletter for weekly insights on growing your business through digital marketing.',
      placeholder: 'Enter your email',
      button: 'Subscribe',
      disclaimer: 'No spam. Unsubscribe anytime.',
    },
    post: {
      backToBlog: 'Back to Blog',
      backToAll: 'Back to All Articles',
      ctaTitle: 'Want Results Like These?',
      ctaSubtitle: 'Book a free strategy call and discover how we can help grow your business.',
      ctaButton: 'Get Your Free Strategy Call',
    },
  },
  nl: {
    meta: {
      title: 'Blog - Marketing Inzichten & Strategieën',
      description: 'Praktische tips, strategieën en inzichten om je bedrijf te laten groeien door digitale marketing.',
    },
    hero: {
      badge: 'Onze Blog',
      title: 'Marketing Inzichten &',
      titleHighlight: 'Strategieën',
      subtitle: 'Praktische tips, strategieën en inzichten om je bedrijf te laten groeien door digitale marketing.',
    },
    categories: {
      all: 'Alles',
      paidAdvertising: 'Betaalde Advertenties',
      seo: 'SEO',
      socialMedia: 'Social Media',
      websiteDesign: 'Website Ontwerp',
      general: 'Algemeen',
      aiMarketing: 'AI Marketing',
      caseStudies: 'Casestudies',
      marketingStrategy: 'Marketing Strategie',
    },
    posts: {
      readMore: 'Lees Meer',
      minRead: 'min leestijd',
      noPosts: 'Nog geen berichten. Kom snel terug!',
      moreComing: 'Meer artikelen komen binnenkort...',
    },
    newsletter: {
      badge: 'Nieuwsbrief',
      title: 'Ontvang Marketing Tips',
      titleHighlight: 'Bezorgd',
      subtitle: 'Abonneer je op onze nieuwsbrief voor wekelijkse inzichten over het laten groeien van je bedrijf door digitale marketing.',
      placeholder: 'Vul je e-mail in',
      button: 'Abonneren',
      disclaimer: 'Geen spam. Altijd opzegbaar.',
    },
    post: {
      backToBlog: 'Terug naar Blog',
      backToAll: 'Terug naar Alle Artikelen',
      ctaTitle: 'Wil je Zulke Resultaten?',
      ctaSubtitle: 'Boek een gratis strategiegesprek en ontdek hoe we je bedrijf kunnen laten groeien.',
      ctaButton: 'Gratis Strategiegesprek',
    },
  },
  dk: {
    meta: {
      title: 'Blog - Marketing Indsigter & Strategier',
      description: 'Handlingsrettede tips, strategier og indsigter til at hjælpe dig med at vækste din virksomhed gennem digital markedsføring.',
    },
    hero: {
      badge: 'Vores Blog',
      title: 'Marketing Indsigter &',
      titleHighlight: 'Strategier',
      subtitle: 'Handlingsrettede tips, strategier og indsigter til at hjælpe dig med at vækste din virksomhed gennem digital markedsføring.',
    },
    categories: {
      all: 'Alle',
      paidAdvertising: 'Betalt Annoncering',
      seo: 'SEO',
      socialMedia: 'Social Media',
      websiteDesign: 'Webdesign',
      general: 'Generelt',
      aiMarketing: 'AI Marketing',
      caseStudies: 'Casestudier',
      marketingStrategy: 'Marketingstrategi',
    },
    posts: {
      readMore: 'Læs Mere',
      minRead: 'min læsning',
      noPosts: 'Ingen indlæg endnu. Kom tilbage snart!',
      moreComing: 'Flere artikler kommer snart...',
    },
    newsletter: {
      badge: 'Nyhedsbrev',
      title: 'Få Marketing Tips',
      titleHighlight: 'Leveret',
      subtitle: 'Tilmeld dig vores nyhedsbrev for ugentlige indsigter om at vækste din virksomhed gennem digital markedsføring.',
      placeholder: 'Indtast din e-mail',
      button: 'Tilmeld',
      disclaimer: 'Ingen spam. Afmeld når som helst.',
    },
    post: {
      backToBlog: 'Tilbage til Blog',
      backToAll: 'Tilbage til Alle Artikler',
      ctaTitle: 'Vil du Have Sådanne Resultater?',
      ctaSubtitle: 'Book et gratis strategikald og opdag, hvordan vi kan hjælpe med at vækste din virksomhed.',
      ctaButton: 'Få Dit Gratis Strategikald',
    },
  },
  au: {
    meta: {
      title: 'Blog - Marketing Insights & Strategies',
      description: 'Actionable tips, strategies, and insights to help you grow your business through digital marketing.',
    },
    hero: {
      badge: 'Our Blog',
      title: 'Marketing Insights &',
      titleHighlight: 'Strategies',
      subtitle: 'Actionable tips, strategies, and insights to help you grow your business through digital marketing.',
    },
    categories: {
      all: 'All',
      paidAdvertising: 'Paid Advertising',
      seo: 'SEO',
      socialMedia: 'Social Media',
      websiteDesign: 'Website Design',
      general: 'General',
      aiMarketing: 'AI Marketing',
      caseStudies: 'Case Studies',
      marketingStrategy: 'Marketing Strategy',
    },
    posts: {
      readMore: 'Read More',
      minRead: 'min read',
      noPosts: 'No posts yet. Check back soon!',
      moreComing: 'More articles coming soon...',
    },
    newsletter: {
      badge: 'Newsletter',
      title: 'Get Marketing Tips',
      titleHighlight: 'Delivered',
      subtitle: 'Subscribe to our newsletter for weekly insights on growing your business through digital marketing.',
      placeholder: 'Enter your email',
      button: 'Subscribe',
      disclaimer: 'No spam. Unsubscribe anytime.',
    },
    post: {
      backToBlog: 'Back to Blog',
      backToAll: 'Back to All Articles',
      ctaTitle: 'Want Results Like These?',
      ctaSubtitle: 'Book a free strategy call and discover how we can help grow your business.',
      ctaButton: 'Get Your Free Strategy Call',
    },
  },
  uk: {
    meta: {
      title: 'Blog - Marketing Insights & Strategies',
      description: 'Actionable tips, strategies, and insights to help you grow your business through digital marketing.',
    },
    hero: {
      badge: 'Our Blog',
      title: 'Marketing Insights &',
      titleHighlight: 'Strategies',
      subtitle: 'Actionable tips, strategies, and insights to help you grow your business through digital marketing.',
    },
    categories: {
      all: 'All',
      paidAdvertising: 'Paid Adverts',
      seo: 'SEO',
      socialMedia: 'Social Media',
      websiteDesign: 'Website Design',
      general: 'General',
      aiMarketing: 'AI Marketing',
      caseStudies: 'Case Studies',
      marketingStrategy: 'Marketing Strategy',
    },
    posts: {
      readMore: 'Read More',
      minRead: 'min read',
      noPosts: 'No posts yet. Check back soon!',
      moreComing: 'More articles coming soon...',
    },
    newsletter: {
      badge: 'Newsletter',
      title: 'Get Marketing Tips',
      titleHighlight: 'Delivered',
      subtitle: 'Subscribe to our newsletter for weekly insights on growing your business through digital marketing.',
      placeholder: 'Enter your email',
      button: 'Subscribe',
      disclaimer: 'No spam. Unsubscribe anytime.',
    },
    post: {
      backToBlog: 'Back to Blog',
      backToAll: 'Back to All Articles',
      ctaTitle: 'Want Results Like These?',
      ctaSubtitle: 'Book a free strategy call and discover how we can help grow your business.',
      ctaButton: 'Get Your Free Strategy Call',
    },
  },
  ie: {
    meta: {
      title: 'Blog - Marketing Insights & Strategies',
      description: 'Actionable tips, strategies, and insights to help you grow your business through digital marketing.',
    },
    hero: {
      badge: 'Our Blog',
      title: 'Marketing Insights &',
      titleHighlight: 'Strategies',
      subtitle: 'Actionable tips, strategies, and insights to help you grow your business through digital marketing.',
    },
    categories: {
      all: 'All',
      paidAdvertising: 'Paid Adverts',
      seo: 'SEO',
      socialMedia: 'Social Media',
      websiteDesign: 'Website Design',
      general: 'General',
      aiMarketing: 'AI Marketing',
      caseStudies: 'Case Studies',
      marketingStrategy: 'Marketing Strategy',
    },
    posts: {
      readMore: 'Read More',
      minRead: 'min read',
      noPosts: 'No posts yet. Check back soon!',
      moreComing: 'More articles coming soon...',
    },
    newsletter: {
      badge: 'Newsletter',
      title: 'Get Marketing Tips',
      titleHighlight: 'Delivered',
      subtitle: 'Subscribe to our newsletter for weekly insights on growing your business through digital marketing.',
      placeholder: 'Enter your email',
      button: 'Subscribe',
      disclaimer: 'No spam. Unsubscribe anytime.',
    },
    post: {
      backToBlog: 'Back to Blog',
      backToAll: 'Back to All Articles',
      ctaTitle: 'Want Results Like These?',
      ctaSubtitle: 'Book a free strategy call and discover how we can help grow your business.',
      ctaButton: 'Get Your Free Strategy Call',
    },
  },
};

// Helper functions
export function getServicesPageTranslations(locale: LocaleCode): ServicesPageTranslations {
  return servicesPageTranslations[locale] || servicesPageTranslations.us;
}

export function getSEOPageTranslations(locale: LocaleCode): SEOPageTranslations {
  return seoPageTranslations[locale] || seoPageTranslations.us;
}

export function getContactPageTranslations(locale: LocaleCode): ContactPageTranslations {
  return contactPageTranslations[locale] || contactPageTranslations.us;
}

export function getResultsPageTranslations(locale: LocaleCode): ResultsPageTranslations {
  return resultsPageTranslations[locale] || resultsPageTranslations.us;
}

export function getPrivacyPageTranslations(locale: LocaleCode): PrivacyPageTranslations {
  return privacyPageTranslations[locale] || privacyPageTranslations.us;
}

export function getBlogPageTranslations(locale: LocaleCode): BlogPageTranslations {
  return blogPageTranslations[locale] || blogPageTranslations.us;
}

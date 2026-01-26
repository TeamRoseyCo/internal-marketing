// src/lib/translations.ts
// Translation strings for each locale
// Languages: English (US, AU, UK, IE), Dutch (NL), Danish (DK)

import { LocaleCode } from './locales';

export interface Translations {
  // Meta
  meta: {
    title: string;
    description: string;
  };
  // Header
  header: {
    home: string;
    cta: string;
  };
  // Navigation
  nav: {
    services: string;
    results: string;
    blog: string;
    contact: string;
  };
  // Hero section
  hero: {
    badge: string;
    title: string;
    titleHighlight: string;
    subtitle: string;
    cta: string;
    ctaSecondary: string;
    socialProof: string;
  };
  // Stats
  stats: {
    roas: string;
    leads: string;
    revenue: string;
    clients: string;
  };
  // Services section
  services: {
    title: string;
    titleHighlight: string;
    subtitle: string;
    seo: {
      title: string;
      description: string;
    };
    socialMedia: {
      title: string;
      description: string;
    };
    paidAds: {
      title: string;
      description: string;
    };
    webDesign: {
      title: string;
      description: string;
    };
  };
  // Why us section
  whyUs: {
    title: string;
    titleHighlight: string;
    subtitle: string;
    points: string[];
    cta: string;
    resultTitle: string;
    resultSubtitle: string;
  };
  // FAQ section
  faq: {
    title: string;
    titleHighlight: string;
    subtitle: string;
    questions: {
      question: string;
      answer: string;
    }[];
  };
  // CTA section
  cta: {
    badge: string;
    title: string;
    titleHighlight: string;
    subtitle: string;
    button: string;
    buttonSecondary: string;
    disclaimer: string;
  };
  // Footer
  footer: {
    // Section headings
    headings: {
      services: string;
      company: string;
      contact: string;
    };
    // Service links
    services: {
      seo: string;
      socialMedia: string;
      paidAds: string;
      webDesign: string;
    };
    // Company links
    company: {
      results: string;
      blog: string;
      contact: string;
      privacy: string;
    };
    // Brand and legal
    brandDescription: string;
    copyright: string;
    tagline: string;
  };
  // Common
  common: {
    learnMore: string;
    getStarted: string;
    bookCall: string;
    viewResults: string;
  };
}

// Using 'as' assertion since AU, UK, IE are added dynamically after initialization
export const translations = {
  // English (United States)
  us: {
    meta: {
      title: 'Rosey Co. - Social Media Marketing Agency',
      description: 'Get more leads and grow your business with data-driven SEO, social media management, and paid advertising services.',
    },
    header: {
      home: 'Home',
      cta: 'Get More Leads',
    },
    nav: {
      services: 'Services',
      results: 'Results',
      blog: 'Blog',
      contact: 'Contact',
    },
    hero: {
      badge: 'Global Marketing Agency',
      title: 'More Growth. More Clients.',
      titleHighlight: 'Guaranteed.',
      subtitle: 'Stop waiting for customers to find you. We put your business in front of people actively searching for your services.',
      cta: 'Get Your Free Strategy Call',
      ctaSecondary: 'See Our Results',
      socialProof: 'Join 50+ businesses scaling profitably with targeted marketing.',
    },
    stats: {
      roas: 'Average ROAS',
      leads: 'Leads in 48hrs',
      revenue: 'Revenue Growth',
      clients: 'Happy Clients',
    },
    services: {
      title: 'How We Help Your Business',
      titleHighlight: 'Grow',
      subtitle: 'From SEO to paid ads, we deliver data-driven strategies that turn marketing spend into measurable revenue.',
      seo: {
        title: 'SEO Services',
        description: 'Dominate search results and get found by customers actively looking for your services.',
      },
      socialMedia: {
        title: 'Social Media Management',
        description: 'Build your brand presence and engage your audience across all major platforms.',
      },
      paidAds: {
        title: 'Paid Advertising',
        description: 'ROI-focused Google Ads and Meta Ads campaigns that convert clicks into customers.',
      },
      webDesign: {
        title: 'Website Design',
        description: 'High-converting websites designed to turn visitors into leads and customers.',
      },
    },
    whyUs: {
      title: 'Your Most Trusted',
      titleHighlight: 'Marketing Partner',
      subtitle: "We don't just run campaigns. We become an extension of your team, obsessed with your growth and committed to your success.",
      points: [
        'ROI-focused campaigns tracked dollar-for-dollar',
        'Transparent reporting with real-time dashboards',
        'No long-term contracts - month-to-month flexibility',
        'Dedicated account manager for your business',
        "Results guarantee - we pause fees if we don't deliver",
      ],
      cta: 'Start Growing Today',
      resultTitle: 'Results That Matter',
      resultSubtitle: 'Data-driven growth for your business',
    },
    faq: {
      title: 'Common',
      titleHighlight: 'Questions',
      subtitle: 'Everything you need to know about working with Rosey Co.',
      questions: [
        {
          question: 'How quickly can I see results?',
          answer: 'Most clients start seeing qualified leads within the first 2-4 weeks. We focus on quick wins while building long-term sustainable growth strategies.',
        },
        {
          question: 'Do you work with businesses worldwide?',
          answer: 'Absolutely! We work with clients globally. Our strategies work anywhere Google and Meta operate, and we adapt our approach to your specific market.',
        },
        {
          question: 'What makes Rosey Co. different from other agencies?',
          answer: "We're results-obsessed. Every campaign is tracked dollar-for-dollar, and we focus on ROI, not vanity metrics. If we don't deliver leads, we pause fees until we do.",
        },
        {
          question: 'What platforms do you advertise on?',
          answer: 'We specialize in Google Ads, Meta (Facebook & Instagram) Ads, and organic SEO. These platforms consistently deliver the best ROI for businesses.',
        },
        {
          question: 'How do I know if my ads are working?',
          answer: 'Full transparency with tracking dashboards showing exactly where leads come from, cost per lead, conversion rates, and ROI. No vanity metrics - just real revenue data.',
        },
      ],
    },
    cta: {
      badge: "Let's Talk",
      title: 'Ready to',
      titleHighlight: 'Grow',
      subtitle: 'Book a free strategy call and discover how we can help you get more leads and scale your business.',
      button: 'Get Your Free Strategy Call',
      buttonSecondary: 'View Case Studies',
      disclaimer: 'No commitment required. 100% free consultation.',
    },
    footer: {
      headings: {
        services: 'Services',
        company: 'Company',
        contact: 'Contact',
      },
      services: {
        seo: 'SEO Services',
        socialMedia: 'Social Media Management',
        paidAds: 'Paid Advertising',
        webDesign: 'Website Design',
      },
      company: {
        results: 'Results',
        blog: 'Blog',
        contact: 'Contact',
        privacy: 'Privacy Policy',
      },
      brandDescription: 'We help businesses worldwide generate more customers through SEO, social media management, and paid advertising.',
      copyright: 'All rights reserved.',
      tagline: 'Global Social Media Marketing Agency',
    },
    common: {
      learnMore: 'Learn More',
      getStarted: 'Get Started',
      bookCall: 'Book a Call',
      viewResults: 'View Results',
    },
  },

  // Dutch (Netherlands)
  nl: {
    meta: {
      title: 'Rosey Co. - Social Media Marketing Bureau',
      description: 'Krijg meer leads en laat je bedrijf groeien met datagestuurde SEO, social media management en betaalde advertenties.',
    },
    header: {
      home: 'Home',
      cta: 'Krijg Meer Leads',
    },
    nav: {
      services: 'Diensten',
      results: 'Resultaten',
      blog: 'Blog',
      contact: 'Contact',
    },
    hero: {
      badge: 'Wereldwijd Marketing Bureau',
      title: 'Meer Groei. Meer Klanten.',
      titleHighlight: 'Gegarandeerd.',
      subtitle: 'Stop met wachten tot klanten jou vinden. Wij zetten jouw bedrijf voor mensen die actief zoeken naar jouw diensten.',
      cta: 'Gratis Strategiegesprek',
      ctaSecondary: 'Bekijk Onze Resultaten',
      socialProof: 'Sluit je aan bij 50+ bedrijven die winstgevend groeien met gerichte marketing.',
    },
    stats: {
      roas: 'Gemiddelde ROAS',
      leads: 'Leads in 48 uur',
      revenue: 'Omzetgroei',
      clients: 'Tevreden Klanten',
    },
    services: {
      title: 'Hoe Wij Jouw Bedrijf Laten',
      titleHighlight: 'Groeien',
      subtitle: 'Van SEO tot betaalde advertenties, wij leveren datagestuurde strategieen die marketinguitgaven omzetten in meetbare omzet.',
      seo: {
        title: 'SEO Diensten',
        description: 'Domineer zoekresultaten en word gevonden door klanten die actief zoeken naar jouw diensten.',
      },
      socialMedia: {
        title: 'Social Media Management',
        description: 'Bouw je merkpresentie en betrek je publiek op alle belangrijke platforms.',
      },
      paidAds: {
        title: 'Betaalde Advertenties',
        description: 'ROI-gerichte Google Ads en Meta Ads campagnes die klikken omzetten in klanten.',
      },
      webDesign: {
        title: 'Website Ontwerp',
        description: 'Hoog-converterende websites ontworpen om bezoekers om te zetten in leads en klanten.',
      },
    },
    whyUs: {
      title: 'Jouw Meest Betrouwbare',
      titleHighlight: 'Marketing Partner',
      subtitle: 'We draaien niet alleen campagnes. We worden een verlengstuk van jouw team, geobsedeerd door jouw groei en toegewijd aan jouw succes.',
      points: [
        'ROI-gerichte campagnes, euro voor euro gevolgd',
        'Transparante rapportage met real-time dashboards',
        'Geen langlopende contracten - maandelijkse flexibiliteit',
        'Toegewijde accountmanager voor jouw bedrijf',
        'Resultaatgarantie - we pauzeren kosten als we niet leveren',
      ],
      cta: 'Begin Vandaag Met Groeien',
      resultTitle: 'Resultaten Die Tellen',
      resultSubtitle: 'Datagestuurde groei voor jouw bedrijf',
    },
    faq: {
      title: 'Veelgestelde',
      titleHighlight: 'Vragen',
      subtitle: 'Alles wat je moet weten over samenwerken met Rosey Co.',
      questions: [
        {
          question: 'Hoe snel kan ik resultaten zien?',
          answer: 'De meeste klanten zien gekwalificeerde leads binnen de eerste 2-4 weken. We focussen op snelle resultaten terwijl we bouwen aan duurzame groeistrategieen op lange termijn.',
        },
        {
          question: 'Werken jullie met bedrijven wereldwijd?',
          answer: 'Absoluut! We werken met klanten wereldwijd. Onze strategieen werken overal waar Google en Meta actief zijn, en we passen onze aanpak aan jouw specifieke markt aan.',
        },
        {
          question: 'Wat maakt Rosey Co. anders dan andere bureaus?',
          answer: 'We zijn geobsedeerd door resultaten. Elke campagne wordt euro voor euro gevolgd, en we focussen op ROI, niet op ijdelheidsmetrieken. Als we geen leads leveren, pauzeren we de kosten.',
        },
        {
          question: 'Op welke platforms adverteren jullie?',
          answer: 'We specialiseren in Google Ads, Meta (Facebook & Instagram) Ads, en organische SEO. Deze platforms leveren consistent de beste ROI voor bedrijven.',
        },
        {
          question: 'Hoe weet ik of mijn advertenties werken?',
          answer: 'Volledige transparantie met tracking dashboards die precies laten zien waar leads vandaan komen, kosten per lead, conversiepercentages en ROI. Geen ijdelheidsmetrieken - alleen echte omzetdata.',
        },
      ],
    },
    cta: {
      badge: 'Laten We Praten',
      title: 'Klaar om te',
      titleHighlight: 'Groeien',
      subtitle: 'Boek een gratis strategiegesprek en ontdek hoe wij je kunnen helpen meer leads te krijgen en je bedrijf te schalen.',
      button: 'Gratis Strategiegesprek',
      buttonSecondary: 'Bekijk Case Studies',
      disclaimer: 'Geen verplichting. 100% gratis consult.',
    },
    footer: {
      headings: {
        services: 'Diensten',
        company: 'Bedrijf',
        contact: 'Contact',
      },
      services: {
        seo: 'SEO Diensten',
        socialMedia: 'Social Media Management',
        paidAds: 'Betaalde Advertenties',
        webDesign: 'Website Ontwerp',
      },
      company: {
        results: 'Resultaten',
        blog: 'Blog',
        contact: 'Contact',
        privacy: 'Privacybeleid',
      },
      brandDescription: 'Wij helpen bedrijven wereldwijd meer klanten te genereren via SEO, social media management en betaalde advertenties.',
      copyright: 'Alle rechten voorbehouden.',
      tagline: 'Wereldwijd Social Media Marketing Bureau',
    },
    common: {
      learnMore: 'Meer Leren',
      getStarted: 'Aan de Slag',
      bookCall: 'Gesprek Boeken',
      viewResults: 'Resultaten Bekijken',
    },
  },

  // Danish (Denmark)
  dk: {
    meta: {
      title: 'Rosey Co. - Social Media Marketing Bureau',
      description: 'Fa flere leads og voks din virksomhed med datadrevet SEO, social media management og betalt annoncering.',
    },
    header: {
      home: 'Hjem',
      cta: 'Få Flere Leads',
    },
    nav: {
      services: 'Tjenester',
      results: 'Resultater',
      blog: 'Blog',
      contact: 'Kontakt',
    },
    hero: {
      badge: 'Globalt Marketing Bureau',
      title: 'Mere Vakst. Flere Kunder.',
      titleHighlight: 'Garanteret.',
      subtitle: 'Stop med at vente pa at kunderne finder dig. Vi saetter din virksomhed foran folk, der aktivt soger efter dine tjenester.',
      cta: 'Fa Dit Gratis Strategikald',
      ctaSecondary: 'Se Vores Resultater',
      socialProof: 'Slut dig til 50+ virksomheder, der vokser profitabelt med malsrettet marketing.',
    },
    stats: {
      roas: 'Gennemsnitlig ROAS',
      leads: 'Leads pa 48 timer',
      revenue: 'Omsaetningsvakst',
      clients: 'Glade Kunder',
    },
    services: {
      title: 'Hvordan Vi Hjaelper Din Virksomhed Med at',
      titleHighlight: 'Vokse',
      subtitle: 'Fra SEO til betalte annoncer leverer vi datadrevne strategier, der omdanner marketingudgifter til malbar omsaetning.',
      seo: {
        title: 'SEO Tjenester',
        description: 'Dominer sogeresultater og bliv fundet af kunder, der aktivt leder efter dine tjenester.',
      },
      socialMedia: {
        title: 'Social Media Management',
        description: 'Byg din brandtilstedevaerelse og engager dit publikum pa alle store platforme.',
      },
      paidAds: {
        title: 'Betalt Annoncering',
        description: 'ROI-fokuserede Google Ads og Meta Ads kampagner, der konverterer klik til kunder.',
      },
      webDesign: {
        title: 'Webdesign',
        description: 'Hojt konverterende hjemmesider designet til at omdanne besoegende til leads og kunder.',
      },
    },
    whyUs: {
      title: 'Din Mest Palidelige',
      titleHighlight: 'Marketing Partner',
      subtitle: 'Vi korer ikke bare kampagner. Vi bliver en forlaengelse af dit team, besat af din vakst og engageret i din succes.',
      points: [
        'ROI-fokuserede kampagner sporet krone for krone',
        'Gennemsigtig rapportering med realtids dashboards',
        'Ingen langsigtede kontrakter - manedlig fleksibilitet',
        'Dedikeret account manager til din virksomhed',
        'Resultatgaranti - vi pauser gebyrer, hvis vi ikke leverer',
      ],
      cta: 'Begynd at Vokse I Dag',
      resultTitle: 'Resultater Der Taeller',
      resultSubtitle: 'Datadrevet vakst til din virksomhed',
    },
    faq: {
      title: 'Almindelige',
      titleHighlight: 'Sporgsmal',
      subtitle: 'Alt hvad du behover at vide om at arbejde med Rosey Co.',
      questions: [
        {
          question: 'Hvor hurtigt kan jeg se resultater?',
          answer: 'De fleste kunder begynder at se kvalificerede leads inden for de forste 2-4 uger. Vi fokuserer pa hurtige gevinster, mens vi bygger langsigtede baeredygtige vaekststrategier.',
        },
        {
          question: 'Arbejder I med virksomheder verden over?',
          answer: 'Absolut! Vi arbejder med kunder globalt. Vores strategier virker overalt, hvor Google og Meta opererer, og vi tilpasser vores tilgang til dit specifikke marked.',
        },
        {
          question: 'Hvad gor Rosey Co. anderledes end andre bureauer?',
          answer: 'Vi er resultatbesatte. Hver kampagne spores krone for krone, og vi fokuserer pa ROI, ikke forfaengelighed. Hvis vi ikke leverer leads, pauser vi gebyrer.',
        },
        {
          question: 'Hvilke platforme annoncerer I pa?',
          answer: 'Vi specialiserer os i Google Ads, Meta (Facebook & Instagram) Ads og organisk SEO. Disse platforme leverer konsekvent det bedste ROI for virksomheder.',
        },
        {
          question: 'Hvordan ved jeg, om mine annoncer virker?',
          answer: 'Fuld gennemsigtighed med tracking dashboards, der viser praecis, hvor leads kommer fra, pris pr. lead, konverteringsrater og ROI. Ingen forfaengelighed - kun reel omsaetningsdata.',
        },
      ],
    },
    cta: {
      badge: 'Lad Os Tale',
      title: 'Klar til at',
      titleHighlight: 'Vokse',
      subtitle: 'Book et gratis strategikald og opdag, hvordan vi kan hjaelpe dig med at fa flere leads og skalere din virksomhed.',
      button: 'Fa Dit Gratis Strategikald',
      buttonSecondary: 'Se Case Studies',
      disclaimer: 'Ingen forpligtelse. 100% gratis konsultation.',
    },
    footer: {
      headings: {
        services: 'Tjenester',
        company: 'Virksomhed',
        contact: 'Kontakt',
      },
      services: {
        seo: 'SEO Tjenester',
        socialMedia: 'Social Media Management',
        paidAds: 'Betalt Annoncering',
        webDesign: 'Webdesign',
      },
      company: {
        results: 'Resultater',
        blog: 'Blog',
        contact: 'Kontakt',
        privacy: 'Privatlivspolitik',
      },
      brandDescription: 'Vi hjælper virksomheder verden over med at generere flere kunder gennem SEO, social media management og betalt annoncering.',
      copyright: 'Alle rettigheder forbeholdes.',
      tagline: 'Globalt Social Media Marketing Bureau',
    },
    common: {
      learnMore: 'Laer Mere',
      getStarted: 'Kom I Gang',
      bookCall: 'Book et Opkald',
      viewResults: 'Se Resultater',
    },
  },
} as Record<LocaleCode, Translations>;

// Australia - Australian English (uses British spelling with local terms)
translations.au = {
  meta: {
    title: 'Rosey Co. - Social Media Marketing Agency Australia',
    description: 'Get more leads and grow your business with data-driven SEO, social media management, and paid advertising services in Australia.',
  },
  header: {
    home: 'Home',
    cta: 'Get More Leads',
  },
  nav: {
    services: 'Services',
    results: 'Results',
    blog: 'Blog',
    contact: 'Contact',
  },
  hero: {
    badge: 'Australian Marketing Agency',
    title: 'More Growth. More Clients.',
    titleHighlight: 'Guaranteed.',
    subtitle: 'Stop waiting for customers to find you. We put your business in front of people actively searching for your services.',
    cta: 'Get Your Free Strategy Call',
    ctaSecondary: 'See Our Results',
    socialProof: 'Join 50+ Australian businesses scaling profitably with targeted marketing.',
  },
  stats: {
    roas: 'Average ROAS',
    leads: 'Leads in 48hrs',
    revenue: 'Revenue Growth',
    clients: 'Happy Clients',
  },
  services: {
    title: 'How We Help Your Business',
    titleHighlight: 'Grow',
    subtitle: 'From SEO to paid ads, we deliver data-driven strategies that turn marketing spend into measurable revenue.',
    seo: {
      title: 'SEO Services',
      description: 'Dominate search results and get found by customers actively looking for your services.',
    },
    socialMedia: {
      title: 'Social Media Management',
      description: 'Build your brand presence and engage your audience across all major platforms.',
    },
    paidAds: {
      title: 'Paid Advertising',
      description: 'ROI-focused Google Ads and Meta Ads campaigns that convert clicks into customers.',
    },
    webDesign: {
      title: 'Website Design',
      description: 'High-converting websites designed to turn visitors into leads and customers.',
    },
  },
  whyUs: {
    title: 'Your Most Trusted',
    titleHighlight: 'Marketing Partner',
    subtitle: "We don't just run campaigns. We become an extension of your team, obsessed with your growth and committed to your success.",
    points: [
      'ROI-focused campaigns tracked dollar-for-dollar',
      'Transparent reporting with real-time dashboards',
      'No long-term contracts - month-to-month flexibility',
      'Dedicated account manager for your business',
      "Results guarantee - we pause fees if we don't deliver",
    ],
    cta: 'Start Growing Today',
    resultTitle: 'Results That Matter',
    resultSubtitle: 'Data-driven growth for your business',
  },
  faq: {
    title: 'Common',
    titleHighlight: 'Questions',
    subtitle: 'Everything you need to know about working with Rosey Co.',
    questions: [
      {
        question: 'How quickly can I see results?',
        answer: 'Most clients start seeing qualified leads within the first 2-4 weeks. We focus on quick wins while building long-term sustainable growth strategies.',
      },
      {
        question: 'Do you work with Australian businesses?',
        answer: 'Absolutely! We specialise in helping Australian businesses grow. Our strategies are tailored to the Australian market while leveraging global best practices.',
      },
      {
        question: 'What makes Rosey Co. different from other agencies?',
        answer: "We're results-obsessed. Every campaign is tracked dollar-for-dollar, and we focus on ROI, not vanity metrics. If we don't deliver leads, we pause fees until we do.",
      },
      {
        question: 'What platforms do you advertise on?',
        answer: 'We specialise in Google Ads, Meta (Facebook & Instagram) Ads, and organic SEO. These platforms consistently deliver the best ROI for Australian businesses.',
      },
      {
        question: 'How do I know if my ads are working?',
        answer: 'Full transparency with tracking dashboards showing exactly where leads come from, cost per lead, conversion rates, and ROI. No vanity metrics - just real revenue data.',
      },
    ],
  },
  cta: {
    badge: "Let's Talk",
    title: 'Ready to',
    titleHighlight: 'Grow',
    subtitle: 'Book a free strategy call and discover how we can help you get more leads and scale your business.',
    button: 'Get Your Free Strategy Call',
    buttonSecondary: 'View Case Studies',
    disclaimer: 'No commitment required. 100% free consultation.',
  },
  footer: {
    headings: {
      services: 'Services',
      company: 'Company',
      contact: 'Contact',
    },
    services: {
      seo: 'SEO Services',
      socialMedia: 'Social Media Management',
      paidAds: 'Paid Advertising',
      webDesign: 'Website Design',
    },
    company: {
      results: 'Results',
      blog: 'Blog',
      contact: 'Contact',
      privacy: 'Privacy Policy',
    },
    brandDescription: 'We help businesses worldwide generate more customers through SEO, social media management, and paid advertising.',
    copyright: 'All rights reserved.',
    tagline: 'Global Social Media Marketing Agency',
  },
  common: {
    learnMore: 'Learn More',
    getStarted: 'Get Started',
    bookCall: 'Book a Call',
    viewResults: 'View Results',
  },
};

// United Kingdom - British English
translations.uk = {
  meta: {
    title: 'Rosey Co. - Social Media Marketing Agency UK',
    description: 'Get more leads and grow your business with data-driven SEO, social media management, and paid advertising services in the UK.',
  },
  header: {
    home: 'Home',
    cta: 'Get More Leads',
  },
  nav: {
    services: 'Services',
    results: 'Results',
    blog: 'Blog',
    contact: 'Contact',
  },
  hero: {
    badge: 'UK Marketing Agency',
    title: 'More Growth. More Clients.',
    titleHighlight: 'Guaranteed.',
    subtitle: 'Stop waiting for customers to find you. We put your business in front of people actively searching for your services.',
    cta: 'Get Your Free Strategy Call',
    ctaSecondary: 'See Our Results',
    socialProof: 'Join 50+ UK businesses scaling profitably with targeted marketing.',
  },
  stats: {
    roas: 'Average ROAS',
    leads: 'Leads in 48hrs',
    revenue: 'Revenue Growth',
    clients: 'Happy Clients',
  },
  services: {
    title: 'How We Help Your Business',
    titleHighlight: 'Grow',
    subtitle: 'From SEO to paid adverts, we deliver data-driven strategies that turn marketing spend into measurable revenue.',
    seo: {
      title: 'SEO Services',
      description: 'Dominate search results and get found by customers actively looking for your services.',
    },
    socialMedia: {
      title: 'Social Media Management',
      description: 'Build your brand presence and engage your audience across all major platforms.',
    },
    paidAds: {
      title: 'Paid Advertising',
      description: 'ROI-focused Google Ads and Meta Ads campaigns that convert clicks into customers.',
    },
    webDesign: {
      title: 'Website Design',
      description: 'High-converting websites designed to turn visitors into leads and customers.',
    },
  },
  whyUs: {
    title: 'Your Most Trusted',
    titleHighlight: 'Marketing Partner',
    subtitle: "We don't just run campaigns. We become an extension of your team, obsessed with your growth and committed to your success.",
    points: [
      'ROI-focused campaigns tracked pound-for-pound',
      'Transparent reporting with real-time dashboards',
      'No long-term contracts - month-to-month flexibility',
      'Dedicated account manager for your business',
      "Results guarantee - we pause fees if we don't deliver",
    ],
    cta: 'Start Growing Today',
    resultTitle: 'Results That Matter',
    resultSubtitle: 'Data-driven growth for your business',
  },
  faq: {
    title: 'Common',
    titleHighlight: 'Questions',
    subtitle: 'Everything you need to know about working with Rosey Co.',
    questions: [
      {
        question: 'How quickly can I see results?',
        answer: 'Most clients start seeing qualified leads within the first 2-4 weeks. We focus on quick wins whilst building long-term sustainable growth strategies.',
      },
      {
        question: 'Do you work with UK businesses?',
        answer: 'Absolutely! We specialise in helping UK businesses grow. Our strategies are tailored to the British market whilst leveraging global best practices.',
      },
      {
        question: 'What makes Rosey Co. different from other agencies?',
        answer: "We're results-obsessed. Every campaign is tracked pound-for-pound, and we focus on ROI, not vanity metrics. If we don't deliver leads, we pause fees until we do.",
      },
      {
        question: 'What platforms do you advertise on?',
        answer: 'We specialise in Google Ads, Meta (Facebook & Instagram) Ads, and organic SEO. These platforms consistently deliver the best ROI for UK businesses.',
      },
      {
        question: 'How do I know if my adverts are working?',
        answer: 'Full transparency with tracking dashboards showing exactly where leads come from, cost per lead, conversion rates, and ROI. No vanity metrics - just real revenue data.',
      },
    ],
  },
  cta: {
    badge: "Let's Talk",
    title: 'Ready to',
    titleHighlight: 'Grow',
    subtitle: 'Book a free strategy call and discover how we can help you get more leads and scale your business.',
    button: 'Get Your Free Strategy Call',
    buttonSecondary: 'View Case Studies',
    disclaimer: 'No commitment required. 100% free consultation.',
  },
  footer: {
    headings: {
      services: 'Services',
      company: 'Company',
      contact: 'Contact',
    },
    services: {
      seo: 'SEO Services',
      socialMedia: 'Social Media Management',
      paidAds: 'Paid Advertising',
      webDesign: 'Website Design',
    },
    company: {
      results: 'Results',
      blog: 'Blog',
      contact: 'Contact',
      privacy: 'Privacy Policy',
    },
    brandDescription: 'We help businesses worldwide generate more customers through SEO, social media management, and paid advertising.',
    copyright: 'All rights reserved.',
    tagline: 'Global Social Media Marketing Agency',
  },
  common: {
    learnMore: 'Learn More',
    getStarted: 'Get Started',
    bookCall: 'Book a Call',
    viewResults: 'View Results',
  },
};

// Ireland - Irish English (British spelling)
translations.ie = {
  meta: {
    title: 'Rosey Co. - Social Media Marketing Agency Ireland',
    description: 'Get more leads and grow your business with data-driven SEO, social media management, and paid advertising services in Ireland.',
  },
  header: {
    home: 'Home',
    cta: 'Get More Leads',
  },
  nav: {
    services: 'Services',
    results: 'Results',
    blog: 'Blog',
    contact: 'Contact',
  },
  hero: {
    badge: 'Irish Marketing Agency',
    title: 'More Growth. More Clients.',
    titleHighlight: 'Guaranteed.',
    subtitle: 'Stop waiting for customers to find you. We put your business in front of people actively searching for your services.',
    cta: 'Get Your Free Strategy Call',
    ctaSecondary: 'See Our Results',
    socialProof: 'Join 50+ Irish businesses scaling profitably with targeted marketing.',
  },
  stats: {
    roas: 'Average ROAS',
    leads: 'Leads in 48hrs',
    revenue: 'Revenue Growth',
    clients: 'Happy Clients',
  },
  services: {
    title: 'How We Help Your Business',
    titleHighlight: 'Grow',
    subtitle: 'From SEO to paid adverts, we deliver data-driven strategies that turn marketing spend into measurable revenue.',
    seo: {
      title: 'SEO Services',
      description: 'Dominate search results and get found by customers actively looking for your services.',
    },
    socialMedia: {
      title: 'Social Media Management',
      description: 'Build your brand presence and engage your audience across all major platforms.',
    },
    paidAds: {
      title: 'Paid Advertising',
      description: 'ROI-focused Google Ads and Meta Ads campaigns that convert clicks into customers.',
    },
    webDesign: {
      title: 'Website Design',
      description: 'High-converting websites designed to turn visitors into leads and customers.',
    },
  },
  whyUs: {
    title: 'Your Most Trusted',
    titleHighlight: 'Marketing Partner',
    subtitle: "We don't just run campaigns. We become an extension of your team, obsessed with your growth and committed to your success.",
    points: [
      'ROI-focused campaigns tracked euro-for-euro',
      'Transparent reporting with real-time dashboards',
      'No long-term contracts - month-to-month flexibility',
      'Dedicated account manager for your business',
      "Results guarantee - we pause fees if we don't deliver",
    ],
    cta: 'Start Growing Today',
    resultTitle: 'Results That Matter',
    resultSubtitle: 'Data-driven growth for your business',
  },
  faq: {
    title: 'Common',
    titleHighlight: 'Questions',
    subtitle: 'Everything you need to know about working with Rosey Co.',
    questions: [
      {
        question: 'How quickly can I see results?',
        answer: 'Most clients start seeing qualified leads within the first 2-4 weeks. We focus on quick wins whilst building long-term sustainable growth strategies.',
      },
      {
        question: 'Do you work with Irish businesses?',
        answer: 'Absolutely! We specialise in helping Irish businesses grow. Our strategies are tailored to the Irish market whilst leveraging global best practices.',
      },
      {
        question: 'What makes Rosey Co. different from other agencies?',
        answer: "We're results-obsessed. Every campaign is tracked euro-for-euro, and we focus on ROI, not vanity metrics. If we don't deliver leads, we pause fees until we do.",
      },
      {
        question: 'What platforms do you advertise on?',
        answer: 'We specialise in Google Ads, Meta (Facebook & Instagram) Ads, and organic SEO. These platforms consistently deliver the best ROI for Irish businesses.',
      },
      {
        question: 'How do I know if my adverts are working?',
        answer: 'Full transparency with tracking dashboards showing exactly where leads come from, cost per lead, conversion rates, and ROI. No vanity metrics - just real revenue data.',
      },
    ],
  },
  cta: {
    badge: "Let's Talk",
    title: 'Ready to',
    titleHighlight: 'Grow',
    subtitle: 'Book a free strategy call and discover how we can help you get more leads and scale your business.',
    button: 'Get Your Free Strategy Call',
    buttonSecondary: 'View Case Studies',
    disclaimer: 'No commitment required. 100% free consultation.',
  },
  footer: {
    headings: {
      services: 'Services',
      company: 'Company',
      contact: 'Contact',
    },
    services: {
      seo: 'SEO Services',
      socialMedia: 'Social Media Management',
      paidAds: 'Paid Advertising',
      webDesign: 'Website Design',
    },
    company: {
      results: 'Results',
      blog: 'Blog',
      contact: 'Contact',
      privacy: 'Privacy Policy',
    },
    brandDescription: 'We help businesses worldwide generate more customers through SEO, social media management, and paid advertising.',
    copyright: 'All rights reserved.',
    tagline: 'Global Social Media Marketing Agency',
  },
  common: {
    learnMore: 'Learn More',
    getStarted: 'Get Started',
    bookCall: 'Book a Call',
    viewResults: 'View Results',
  },
};

export function getTranslations(locale: LocaleCode): Translations {
  return translations[locale] || translations.us;
}

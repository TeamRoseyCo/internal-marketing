// src/lib/seo/keyword-map.ts
// Keyword-to-URL mapping to prevent keyword cannibalization
// Maps keywords to single URLs ensuring clear SEO targeting
// Reference: Phase 6 Belfast keyword mapping research

import { LocaleCode } from "../locales";

export interface ClusterMapping {
  slug: string;
  intent: 'informational' | 'commercial' | 'transactional' | 'navigational';
  primaryKeyword: string;
  secondaryKeywords?: string[];
}

export interface PillarMapping {
  pillarSlug: string;
  pillarIntent: 'informational' | 'commercial' | 'transactional';
  primaryKeyword: string;
  clusters: ClusterMapping[];
}

export interface KeywordMapping {
  [topic: string]: PillarMapping;
}

/**
 * Global keyword map for all locales
 * Organized by topic (SEO, Paid Ads, Social Media, Website Design)
 */
export const keywordMap: Record<LocaleCode, KeywordMapping> = {
  us: {
    seo: {
      pillarSlug: 'seo-guide',
      pillarIntent: 'informational',
      primaryKeyword: 'SEO guide',
      clusters: [
        {
          slug: 'seo-strategies-for-2025',
          intent: 'informational',
          primaryKeyword: 'SEO strategies 2025',
          secondaryKeywords: ['modern SEO techniques', 'SEO best practices']
        },
        {
          slug: 'google-algorithm-updates-2025',
          intent: 'informational',
          primaryKeyword: 'Google algorithm updates',
          secondaryKeywords: ['Google updates', 'algorithm changes']
        }
      ]
    },
    paidAds: {
      pillarSlug: 'paid-ads-guide',
      pillarIntent: 'commercial',
      primaryKeyword: 'Paid advertising guide',
      clusters: [
        {
          slug: 'facebook-ads-roi-2025',
          intent: 'commercial',
          primaryKeyword: 'Facebook ads ROI',
          secondaryKeywords: ['Meta ads performance', 'FB ads optimization']
        },
        {
          slug: 'how-to-increase-google-ads-roas',
          intent: 'informational',
          primaryKeyword: 'increase Google Ads ROAS',
          secondaryKeywords: ['improve ROAS', 'Google Ads optimization']
        },
        {
          slug: 'ai-driven-facebook-google-ads-2025',
          intent: 'informational',
          primaryKeyword: 'AI advertising',
          secondaryKeywords: ['AI ads', 'automated advertising']
        },
        {
          slug: 'three-ad-tweaks-save-thousands',
          intent: 'commercial',
          primaryKeyword: 'reduce ad costs',
          secondaryKeywords: ['save on ads', 'lower ad spend']
        },
        {
          slug: 'cut-ad-costs-ai-video-ads',
          intent: 'commercial',
          primaryKeyword: 'AI video ads',
          secondaryKeywords: ['automated video ads', 'cheap video ads']
        },
        {
          slug: 'ads-funnel-leaky-bucket',
          intent: 'informational',
          primaryKeyword: 'ads funnel optimization',
          secondaryKeywords: ['conversion funnel', 'fix ad funnel']
        }
      ]
    },
    socialMedia: {
      pillarSlug: 'social-media-guide',
      pillarIntent: 'commercial',
      primaryKeyword: 'Social media marketing guide',
      clusters: [
        {
          slug: 'social-media-content-that-converts',
          intent: 'informational',
          primaryKeyword: 'social media content strategy',
          secondaryKeywords: ['content that converts', 'engaging content']
        },
        {
          slug: 'boosting-posts-charity-zuckerberg',
          intent: 'informational',
          primaryKeyword: 'Facebook boosted posts',
          secondaryKeywords: ['boost posts', 'Facebook advertising basics']
        }
      ]
    },
    websiteDesign: {
      pillarSlug: 'website-design-guide',
      pillarIntent: 'commercial',
      primaryKeyword: 'Website design guide',
      clusters: []  // No existing cluster content yet
    }
  },

  uk: {
    seo: {
      pillarSlug: 'seo-belfast',
      pillarIntent: 'commercial',
      primaryKeyword: 'SEO Belfast',
      clusters: [
        // These cluster pages will be created in Phase 10
        {
          slug: 'local-seo-belfast',
          intent: 'commercial',
          primaryKeyword: 'local SEO Belfast',
          secondaryKeywords: ['Belfast local search', 'near me SEO', 'local rankings Belfast']
        },
        {
          slug: 'small-business-seo-belfast',
          intent: 'commercial',
          primaryKeyword: 'small business SEO Belfast',
          secondaryKeywords: ['SMB SEO Belfast', 'affordable SEO Belfast']
        },
        {
          slug: 'technical-seo-belfast',
          intent: 'commercial',
          primaryKeyword: 'technical SEO Belfast',
          secondaryKeywords: ['website optimization Belfast', 'on-page SEO Belfast']
        },
        {
          slug: 'link-building-belfast',
          intent: 'commercial',
          primaryKeyword: 'link building Belfast',
          secondaryKeywords: ['backlinks Belfast', 'off-page SEO Belfast']
        },
        {
          slug: 'seo-cost-belfast',
          intent: 'informational',
          primaryKeyword: 'SEO cost Belfast',
          secondaryKeywords: ['SEO pricing Belfast', 'how much does SEO cost Belfast', 'Belfast SEO budget']
        },
        {
          slug: 'how-to-rank-on-google-belfast',
          intent: 'informational',
          primaryKeyword: 'how to rank on Google Belfast',
          secondaryKeywords: ['improve Google rankings Belfast', 'Belfast website optimization', 'rank higher Belfast']
        }
      ]
    },
    paidAds: {
      pillarSlug: 'paid-ads-belfast',
      pillarIntent: 'commercial',
      primaryKeyword: 'Google Ads Belfast',
      clusters: [
        {
          slug: 'ppc-belfast',
          intent: 'commercial',
          primaryKeyword: 'PPC Belfast',
          secondaryKeywords: ['pay per click Belfast', 'PPC management Belfast', 'PPC agency Belfast']
        },
        {
          slug: 'google-ads-cost-belfast',
          intent: 'informational',
          primaryKeyword: 'Google Ads cost Belfast',
          secondaryKeywords: ['PPC pricing Belfast', 'advertising budget Belfast', 'Google Ads budget Belfast']
        },
        {
          slug: 'search-ads-belfast',
          intent: 'commercial',
          primaryKeyword: 'search ads Belfast',
          secondaryKeywords: ['Google search advertising Belfast', 'paid search Belfast', 'search campaign Belfast']
        },
        {
          slug: 'shopping-ads-belfast',
          intent: 'commercial',
          primaryKeyword: 'shopping ads Belfast',
          secondaryKeywords: ['Google Shopping Belfast', 'product ads Belfast', 'ecommerce ads Belfast']
        },
        {
          slug: 'google-ads-management-belfast',
          intent: 'commercial',
          primaryKeyword: 'Google Ads management Belfast',
          secondaryKeywords: ['PPC management Belfast', 'Google Ads expert Belfast', 'managed Google Ads Belfast']
        }
      ]
    },
    socialMedia: {
      pillarSlug: 'social-media-belfast',
      pillarIntent: 'commercial',
      primaryKeyword: 'social media marketing Belfast',
      clusters: [
        {
          slug: 'instagram-marketing-belfast',
          intent: 'commercial',
          primaryKeyword: 'Instagram marketing Belfast',
          secondaryKeywords: ['Instagram ads Belfast', 'IG marketing Belfast', 'grow Instagram Belfast']
        },
        {
          slug: 'facebook-marketing-belfast',
          intent: 'commercial',
          primaryKeyword: 'Facebook marketing Belfast',
          secondaryKeywords: ['Facebook ads Belfast', 'FB advertising Belfast', 'Facebook engagement Belfast']
        },
        {
          slug: 'tiktok-marketing-belfast',
          intent: 'commercial',
          primaryKeyword: 'TikTok marketing Belfast',
          secondaryKeywords: ['TikTok ads Belfast', 'TikTok for business Belfast', 'TikTok strategy Belfast']
        },
        {
          slug: 'linkedin-marketing-belfast',
          intent: 'commercial',
          primaryKeyword: 'LinkedIn marketing Belfast',
          secondaryKeywords: ['LinkedIn ads Belfast', 'B2B social media Belfast', 'LinkedIn strategy Belfast']
        },
        {
          slug: 'social-media-strategy-belfast',
          intent: 'informational',
          primaryKeyword: 'social media strategy Belfast',
          secondaryKeywords: ['social media tips Belfast', 'plan social media Belfast', 'social media guide Belfast']
        }
      ]
    },
    websiteDesign: {
      pillarSlug: 'website-design-belfast',
      pillarIntent: 'commercial',
      primaryKeyword: 'website design Belfast',
      clusters: [
        {
          slug: 'responsive-website-belfast',
          intent: 'commercial',
          primaryKeyword: 'responsive website Belfast',
          secondaryKeywords: ['mobile-friendly website Belfast', 'responsive design Belfast', 'mobile website Belfast']
        },
        {
          slug: 'ecommerce-website-belfast',
          intent: 'commercial',
          primaryKeyword: 'ecommerce website Belfast',
          secondaryKeywords: ['online store Belfast', 'ecommerce development Belfast', 'shopping website Belfast']
        },
        {
          slug: 'web-design-trends-belfast',
          intent: 'informational',
          primaryKeyword: 'web design trends Belfast 2026',
          secondaryKeywords: ['website design trends', 'modern web design Belfast', 'Belfast web design 2026']
        }
      ]
    }
  },

  // Other locales use fallback to US for now
  au: {
    seo: {
      pillarSlug: 'seo-guide',
      pillarIntent: 'informational',
      primaryKeyword: 'SEO guide',
      clusters: []
    },
    paidAds: {
      pillarSlug: 'paid-ads-guide',
      pillarIntent: 'commercial',
      primaryKeyword: 'Paid advertising guide',
      clusters: []
    },
    socialMedia: {
      pillarSlug: 'social-media-guide',
      pillarIntent: 'commercial',
      primaryKeyword: 'Social media marketing guide',
      clusters: []
    },
    websiteDesign: {
      pillarSlug: 'website-design-guide',
      pillarIntent: 'commercial',
      primaryKeyword: 'Website design guide',
      clusters: []
    }
  },

  ie: {
    seo: {
      pillarSlug: 'seo-guide',
      pillarIntent: 'informational',
      primaryKeyword: 'SEO guide',
      clusters: []
    },
    paidAds: {
      pillarSlug: 'paid-ads-guide',
      pillarIntent: 'commercial',
      primaryKeyword: 'Paid advertising guide',
      clusters: []
    },
    socialMedia: {
      pillarSlug: 'social-media-guide',
      pillarIntent: 'commercial',
      primaryKeyword: 'Social media marketing guide',
      clusters: []
    },
    websiteDesign: {
      pillarSlug: 'website-design-guide',
      pillarIntent: 'commercial',
      primaryKeyword: 'Website design guide',
      clusters: []
    }
  },

  nl: {
    seo: {
      pillarSlug: 'seo-guide',
      pillarIntent: 'informational',
      primaryKeyword: 'SEO gids',
      clusters: []
    },
    paidAds: {
      pillarSlug: 'paid-ads-guide',
      pillarIntent: 'commercial',
      primaryKeyword: 'Betaalde advertenties gids',
      clusters: []
    },
    socialMedia: {
      pillarSlug: 'social-media-guide',
      pillarIntent: 'commercial',
      primaryKeyword: 'Social media marketing gids',
      clusters: []
    },
    websiteDesign: {
      pillarSlug: 'website-design-guide',
      pillarIntent: 'commercial',
      primaryKeyword: 'Website design gids',
      clusters: []
    }
  },

  dk: {
    seo: {
      pillarSlug: 'seo-guide',
      pillarIntent: 'informational',
      primaryKeyword: 'SEO guide',
      clusters: []
    },
    paidAds: {
      pillarSlug: 'paid-ads-guide',
      pillarIntent: 'commercial',
      primaryKeyword: 'Betalt annoncering guide',
      clusters: []
    },
    socialMedia: {
      pillarSlug: 'social-media-guide',
      pillarIntent: 'commercial',
      primaryKeyword: 'Social media marketing guide',
      clusters: []
    },
    websiteDesign: {
      pillarSlug: 'website-design-guide',
      pillarIntent: 'commercial',
      primaryKeyword: 'Webdesign guide',
      clusters: []
    }
  },

  cz: {
    seo: {
      pillarSlug: 'seo-guide',
      pillarIntent: 'informational',
      primaryKeyword: 'SEO guide',
      clusters: []
    },
    paidAds: {
      pillarSlug: 'paid-ads-guide',
      pillarIntent: 'commercial',
      primaryKeyword: 'Paid advertising guide',
      clusters: []
    },
    socialMedia: {
      pillarSlug: 'social-media-guide',
      pillarIntent: 'commercial',
      primaryKeyword: 'Social media marketing guide',
      clusters: []
    },
    websiteDesign: {
      pillarSlug: 'website-design-guide',
      pillarIntent: 'commercial',
      primaryKeyword: 'Website design guide',
      clusters: []
    }
  },

  ar: {
    seo: {
      pillarSlug: 'seo-guide',
      pillarIntent: 'informational',
      primaryKeyword: 'SEO guide',
      clusters: []
    },
    paidAds: {
      pillarSlug: 'paid-ads-guide',
      pillarIntent: 'commercial',
      primaryKeyword: 'Paid advertising guide',
      clusters: []
    },
    socialMedia: {
      pillarSlug: 'social-media-guide',
      pillarIntent: 'commercial',
      primaryKeyword: 'Social media marketing guide',
      clusters: []
    },
    websiteDesign: {
      pillarSlug: 'website-design-guide',
      pillarIntent: 'commercial',
      primaryKeyword: 'Website design guide',
      clusters: []
    }
  }
};

/**
 * Validate keyword map for cannibalization issues
 * Checks for duplicate keywords across pillars with same intent
 */
export function validateKeywordMap(): void {
  const keywordRegistry: Record<string, { url: string; intent: string; locale: LocaleCode }[]> = {};

  // Build registry of all keywords
  for (const [locale, topics] of Object.entries(keywordMap)) {
    for (const [topicName, pillar] of Object.entries(topics)) {
      const localeCode = locale as LocaleCode;

      // Register pillar keyword
      const pillarUrl = `/${localeCode}/${pillar.pillarSlug}`;
      if (!keywordRegistry[pillar.primaryKeyword.toLowerCase()]) {
        keywordRegistry[pillar.primaryKeyword.toLowerCase()] = [];
      }
      keywordRegistry[pillar.primaryKeyword.toLowerCase()].push({
        url: pillarUrl,
        intent: pillar.pillarIntent,
        locale: localeCode
      });

      // Register cluster keywords
      for (const cluster of pillar.clusters) {
        const clusterUrl = `/${localeCode}/blog/${cluster.slug}`;

        if (!keywordRegistry[cluster.primaryKeyword.toLowerCase()]) {
          keywordRegistry[cluster.primaryKeyword.toLowerCase()] = [];
        }
        keywordRegistry[cluster.primaryKeyword.toLowerCase()].push({
          url: clusterUrl,
          intent: cluster.intent,
          locale: localeCode
        });

        // Register secondary keywords
        if (cluster.secondaryKeywords) {
          for (const keyword of cluster.secondaryKeywords) {
            if (!keywordRegistry[keyword.toLowerCase()]) {
              keywordRegistry[keyword.toLowerCase()] = [];
            }
            keywordRegistry[keyword.toLowerCase()].push({
              url: clusterUrl,
              intent: cluster.intent,
              locale: localeCode
            });
          }
        }
      }
    }
  }

  // Check for cannibalization
  let conflictsFound = 0;
  for (const [keyword, mappings] of Object.entries(keywordRegistry)) {
    // Group by locale
    const localeGroups = mappings.reduce((acc, mapping) => {
      if (!acc[mapping.locale]) {
        acc[mapping.locale] = [];
      }
      acc[mapping.locale].push(mapping);
      return acc;
    }, {} as Record<LocaleCode, typeof mappings>);

    // Check for conflicts within each locale
    for (const [locale, localeMappings] of Object.entries(localeGroups)) {
      if (localeMappings.length > 1) {
        // Multiple URLs for same keyword in same locale
        const sameIntentConflict = localeMappings.some((m1, i) =>
          localeMappings.some((m2, j) => i !== j && m1.intent === m2.intent)
        );

        if (sameIntentConflict) {
          console.warn(`⚠️ CANNIBALIZATION RISK [${locale}]: Keyword "${keyword}" targets multiple URLs with same intent:`);
          localeMappings.forEach(m => console.warn(`   - ${m.url} (${m.intent})`));
          conflictsFound++;
        }
      }
    }
  }

  if (conflictsFound === 0) {
    console.log('✅ Keyword map validated - no cannibalization issues detected');
  } else {
    console.warn(`⚠️ Found ${conflictsFound} potential cannibalization issues`);
  }
}

/**
 * Get primary URL for a keyword in a specific locale
 * Returns null if keyword not found in map
 */
export function getKeywordUrl(keyword: string, locale: LocaleCode = 'us'): string | null {
  const normalizedKeyword = keyword.toLowerCase().trim();
  const topics = keywordMap[locale];

  if (!topics) return null;

  // Check pillar keywords
  for (const [topicName, pillar] of Object.entries(topics)) {
    if (pillar.primaryKeyword.toLowerCase() === normalizedKeyword) {
      return `/${locale}/${pillar.pillarSlug}`;
    }

    // Check cluster keywords
    for (const cluster of pillar.clusters) {
      if (cluster.primaryKeyword.toLowerCase() === normalizedKeyword) {
        return `/${locale}/blog/${cluster.slug}`;
      }

      if (cluster.secondaryKeywords) {
        if (cluster.secondaryKeywords.some(k => k.toLowerCase() === normalizedKeyword)) {
          return `/${locale}/blog/${cluster.slug}`;
        }
      }
    }
  }

  return null;
}

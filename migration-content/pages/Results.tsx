import { SEO } from "@/components/SEO";
import { useEffect } from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { GoogleReviews } from "@/components/GoogleReviews";
import metaResults1 from "@/assets/meta-results-1.png";
import metaResults2 from "@/assets/meta-results-2.png";
import metaResults3 from "@/assets/meta-results-3.png";
import googleResults1 from "@/assets/google-results-1.png";

const Results = () => {
  const title = "Marketing Agency Results Australia | Client Success Stories | Flowryse";
  const description = "See real marketing results from Australian businesses: 300% ROAS, 4x revenue growth, and more. Discover how Flowryse helps local businesses nationwide scale with ROI-driven ads and SEO.";

  useEffect(() => {
    // Load Wistia scripts for testimonials
    const testimonialScript = document.createElement('script');
    testimonialScript.src = 'https://fast.wistia.com/embed/ak0ckv7o13.js';
    testimonialScript.async = true;
    testimonialScript.type = 'module';
    document.head.appendChild(testimonialScript);

    // Add Wistia styles
    const style = document.createElement('style');
    style.textContent = `
      wistia-player[media-id='ak0ckv7o13']:not(:defined) {
        background: center / contain no-repeat url('https://fast.wistia.com/embed/medias/ak0ckv7o13/swatch');
        display: block;
        filter: blur(5px);
        padding-top: 56.25%;
      }
    `;
    document.head.appendChild(style);

    return () => {
      // Cleanup on unmount
      document.head.removeChild(testimonialScript);
      document.head.removeChild(style);
    };
  }, []);

  const caseStudies = [
    {
      id: 1,
      wistiaId: "ak0ckv7o13",
      tag: "Video Testimonial",
      metrics: [
        { label: "60+ leads in just 2 weeks", value: "$100 spend" },
        { label: "Conversion Rate Boost", value: "+100%" }
      ],
      note: "One simple funnel change → no extra ad spend"
    },
    {
      id: 2,
      title: "David Hayes",
      company: "Babeltext / MSG1.app",
      roi: "100+ Leads",
      timeline: "in 48 hours",
      industry: "Technology & SaaS",
      testimonial: "We're thrilled to share early results from our latest Facebook campaign for MSG1.app — generating over 100 qualified leads in just 48 hours, expertly managed by the talented team at Flowryse. MSG1 is redefining how creators connect with their audiences. A huge thanks to Flowryse for driving an outstanding launch campaign.",
      linkedInUrl: "https://www.linkedin.com/pulse/100-leads-48-hours-power-multilingual-creator-messaging-david-hayes-higdc",
      metrics: [
        { label: "Qualified Leads", value: "100+" },
        { label: "Campaign Duration", value: "48 hours" }
      ]
    },
    {
      id: 3,
      title: "Gavin",
      company: "Gavins Greens",
      industry: "Landscaping & Garden Services",
      testimonial: "My experience with Flowryse was amazing. He completed the project three days early, and on top of that, I had a few personal issues on my website, and he helped me with that for three weeks on top of that for no additional charge. Overall, I definitely give my experience with a Flowryse a 10/10.",
      metrics: [
        { label: "Rating", value: "10/10" },
        { label: "Delivery", value: "3 days early" }
      ]
    },
    {
      id: 4,
      title: "Alvin Alexandro",
      roi: "21x ROAS",
      timeline: "E-commerce Campaign",
      industry: "Wholesale Children's Apparel",
      testimonial: "Before working with Flowryse, we were just using UGC Influencers to promote our brand. I chose to work with Flowryse, because they looked like a team of professionals who knew exactly what they were doing. And rightfully so, they ran paid ads for me, and we've gotten a 21x return on ad spend. (we spent around $600 in ad spend, you do the math). I'd highly recommend to work with Flowryse if you've already got smooth sales and operations, your investment will surely pay off.",
      metrics: [
        { label: "Ad Spend", value: "$600" },
        { label: "Return on Ad Spend", value: "21x" }
      ]
    },
    {
      id: 5,
      title: "Restaurant Chain",
      roi: "300% ROAS",
      timeline: "in 6 weeks",
      industry: "Food & Beverage",
      metrics: [
        { label: "Leads Generated", value: "250+" },
        { label: "Cost Per Lead", value: "$8.50" }
      ]
    },
    {
      id: 6,
      title: "Professional Services",
      roi: "4x Revenue",
      timeline: "in 45 days",
      industry: "Legal Services",
      metrics: [
        { label: "Qualified Calls", value: "85" },
        { label: "Conversion Rate", value: "12%" }
      ]
    },
    {
      id: 7,
      title: "E-commerce Store",
      roi: "240% ROAS",
      timeline: "in 3 weeks",
      industry: "Retail",
      metrics: [
        { label: "Sales Increase", value: "+180%" },
        { label: "Ad Spend ROI", value: "2.4x" }
      ]
    }
  ];

  const structured = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: "Client Results & Success Stories - Australia",
      url: typeof window !== 'undefined' ? `${window.location.origin}/results` : undefined,
      description: "Real client success stories and case studies from Flowryse's ROI-driven advertising campaigns across Australia",
      about: {
        "@type": "Organization",
        name: "Flowryse",
        description: "Australia's leading marketing agency for local businesses"
      }
    }
  ];

  return (
    <>
      <SEO title={title} description={description} structuredData={structured} />
      <div className="container py-20">
        <header className="text-center mb-16">
          <h1 className="text-3xl md:text-5xl/tight font-heading font-extrabold tracking-tight mb-4 leading-tight">
            Real Client <span className="gradient-accent-text">Results</span> From Across Australia
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Data-driven marketing campaigns delivering measurable ROI for Australian local businesses. See how we've transformed businesses nationwide from ad spend to profit engines.
          </p>
        </header>

        <main>
          <section className="animate-fade-in">
            <h2 className="text-2xl md:text-3xl font-heading font-bold tracking-tight mb-8 text-center">Australian Client Success Stories</h2>
            <Carousel className="w-full max-w-6xl mx-auto" opts={{ align: "start", loop: true }}>
              <div className="flex items-center justify-center mb-6 gap-4">
                <CarouselPrevious className="relative translate-y-0" />
                <span className="text-sm text-muted-foreground px-4">Swipe to see more success stories</span>
                <CarouselNext className="relative translate-y-0" />
              </div>
              <CarouselContent className="-ml-2 md:-ml-4">
                {caseStudies.map((study) => (
                  <CarouselItem key={study.id} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                    <div className="bg-card rounded-xl border overflow-hidden hover-scale h-full">
                      {(study as any).wistiaId ? (
                        <div className="rounded-t-lg overflow-hidden">
                          <div 
                            dangerouslySetInnerHTML={{ 
                              __html: `<wistia-player media-id="${(study as any).wistiaId}" aspect="1.7777777777777777" style="width: 100%; height: auto;"></wistia-player>` 
                            }}
                          />
                        </div>
                      ) : (study as any).videoUrl ? (
                        <div className="aspect-video rounded-t-lg overflow-hidden">
                          <iframe
                            src={(study as any).videoUrl}
                            className="w-full h-full border-0"
                            allow="autoplay; fullscreen; muted"
                            allowFullScreen
                            title={study.title ? `${study.title} - Video Testimonial` : "Video Testimonial"}
                          />
                        </div>
                      ) : (
                        <div className="aspect-video bg-gradient-to-br from-[hsl(var(--brand-purple))]/20 via-[hsl(var(--brand-magenta))]/20 to-[hsl(var(--brand-cyan))]/20 rounded-t-lg flex items-center justify-center">
                          <div className="text-center">
                            <div className="text-3xl mb-2 w-12 h-12 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
                              <span className="text-primary font-bold">S</span>
                            </div>
                            <div className="text-sm font-medium">{study.industry}</div>
                          </div>
                        </div>
                      )}
                      <div className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          {study.title && <h3 className="font-bold text-lg">{study.title}</h3>}
                          {study.tag && (
                            <span className="text-xs bg-[hsl(var(--brand-magenta))]/10 text-[hsl(var(--brand-magenta))] px-2 py-1 rounded-full">
                              {study.tag}
                            </span>
                          )}
                        </div>
                        {(study.roi || study.timeline) && (
                          <div className="flex items-center gap-4 mb-4">
                            {study.roi && <div className="font-bold text-2xl text-[hsl(var(--brand-magenta))]">{study.roi}</div>}
                            {study.timeline && <div className="text-muted-foreground text-sm">{study.timeline}</div>}
                          </div>
                        )}
                        {study.metrics && (
                          <div className="space-y-3">
                            {study.metrics.map((metric, index) => (
                              <div key={index} className="flex justify-between items-center p-3 bg-muted/30 rounded-lg">
                                <span className="text-sm">{metric.label}</span>
                                <span className="font-bold text-[hsl(var(--brand-purple))]">{metric.value}</span>
                              </div>
                            ))}
                          </div>
                        )}
                        {(study as any).testimonial && (
                          <div className="mt-4 pt-3 border-t">
                            <p className="text-sm text-muted-foreground italic leading-relaxed">"{(study as any).testimonial}"</p>
                            {(study as any).linkedInUrl && (
                              <a 
                                href={(study as any).linkedInUrl} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 text-xs text-[hsl(var(--brand-cyan))] hover:underline mt-2"
                              >
                                Read full LinkedIn article →
                              </a>
                            )}
                          </div>
                        )}
                        {study.note && (
                          <div className="mt-4 pt-3 border-t text-center">
                            <p className="text-xs text-muted-foreground">{study.note}</p>
                          </div>
                        )}
                        {study.industry && !((study as any).testimonial) && (
                          <div className="mt-4 pt-3 border-t">
                            <div className="text-xs text-muted-foreground">{study.industry}</div>
                          </div>
                        )}
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </section>

          {/* Meta Ads Performance Section */}
          <section className="mt-20 animate-fade-in">
            <h2 className="text-2xl md:text-3xl font-heading font-bold tracking-tight mb-4 text-center">
              Meta Ads Campaign Results
            </h2>
            <p className="text-muted-foreground text-center mb-8 max-w-2xl mx-auto">
              Anonymous screenshots from actual Meta Ads campaigns we've managed, showing real performance metrics.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
              <div className="bg-card rounded-xl border overflow-hidden hover-scale">
                <img 
                  src={metaResults1} 
                  alt="Meta Ads Campaign Results - 195 leads at $7.16 per lead" 
                  className="w-full h-auto"
                />
                <div className="p-4 bg-gradient-to-br from-[hsl(var(--brand-purple))]/10 to-[hsl(var(--brand-magenta))]/10">
                  <p className="text-sm font-semibold text-center">195 Leads @ $7.16 CPL</p>
                </div>
              </div>
              <div className="bg-card rounded-xl border overflow-hidden hover-scale">
                <img 
                  src={metaResults2} 
                  alt="Meta Ads Campaign Results - 176 leads at $5.57 per lead" 
                  className="w-full h-auto"
                />
                <div className="p-4 bg-gradient-to-br from-[hsl(var(--brand-cyan))]/10 to-[hsl(var(--brand-purple))]/10">
                  <p className="text-sm font-semibold text-center">176 Leads @ $5.57 CPL</p>
                </div>
              </div>
              <div className="bg-card rounded-xl border overflow-hidden hover-scale">
                <img 
                  src={metaResults3} 
                  alt="Meta Ads Campaign Results - 21 leads with 3,822 reach" 
                  className="w-full h-auto"
                />
                <div className="p-4 bg-gradient-to-br from-[hsl(var(--brand-magenta))]/10 to-[hsl(var(--brand-cyan))]/10">
                  <p className="text-sm font-semibold text-center">21 Leads | 3,822 Reach</p>
                </div>
              </div>
            </div>
          </section>

          {/* Google Ads Performance Section */}
          <section className="mt-20 animate-fade-in">
            <h2 className="text-2xl md:text-3xl font-heading font-bold tracking-tight mb-4 text-center">
              Google Ads Campaign Results
            </h2>
            <p className="text-muted-foreground text-center mb-8 max-w-2xl mx-auto">
              Real Google Ads conversion data from actual campaigns, delivering fast results for local businesses.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
              <div className="bg-card rounded-xl border overflow-hidden hover-scale">
                <img 
                  src={googleResults1} 
                  alt="Google Ads Campaign Results - 16 conversions in less than 24 hours for electrical company" 
                  className="w-full h-auto"
                />
                <div className="p-4 bg-gradient-to-br from-[hsl(var(--brand-cyan))]/10 to-[hsl(var(--brand-magenta))]/10">
                  <p className="text-sm font-semibold text-center">16 Leads in &lt;24 Hours</p>
                  <p className="text-xs text-muted-foreground text-center mt-1">Local Electrical Company | 22.86% Conversion Rate</p>
                </div>
              </div>
            </div>
          </section>

          {/* Google Reviews Section */}
          <GoogleReviews />
        </main>
      </div>
    </>
  );
};

export default Results;
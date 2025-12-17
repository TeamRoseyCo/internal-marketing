import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowLeft, Clock, Tag, Bot, Target, Zap, TrendingUp, Database, AlertTriangle, CheckCircle, Sparkles } from "lucide-react";
import flowryseBlogImage from "@/assets/flowryse-blog-featured.png";

const AIDrivenFacebookGoogleAds2025 = () => {
  const title = "The Ultimate Guide to AI-Driven Facebook and Google Ads for Australian Local Businesses in 2025";
  const description = "In 2025, AI is no longer a 'nice-to-have' — it's the difference between burning budget and dominating your local market. Learn how local businesses can harness AI on Facebook and Google Ads.";

  const blogStructuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description: description,
    image: typeof window !== 'undefined' ? `${window.location.origin}${flowryseBlogImage}` : undefined,
    author: {
      "@type": "Organization",
      name: "Flowryse"
    },
    publisher: {
      "@type": "Organization", 
      name: "Flowryse"
    },
    datePublished: "2025-01-15",
    dateModified: "2025-01-15"
  };

  return (
    <>
      <SEO title={title} description={description} image={flowryseBlogImage} structuredData={blogStructuredData} />
      
      <article className="container py-8 animate-fade-in">
        <nav className="mb-6">
          <Button variant="ghost" size="sm" asChild className="gap-2">
            <Link to="/blog">
              <ArrowLeft className="w-4 h-4" />
              Back to Blog
            </Link>
          </Button>
        </nav>

        <header className="mb-8">
          <div className="flex items-center gap-4 mb-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <Tag className="w-4 h-4" />
              AI Marketing
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              10 min read
            </span>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-heading font-bold tracking-tight mb-6 leading-tight">
            {title}
          </h1>
          
          <img 
            src={flowryseBlogImage} 
            alt="Flowryse Online Marketing Agency - AI-driven advertising solutions for Australian local businesses"
            className="w-full h-64 md:h-80 object-cover rounded-lg mb-8"
          />
        </header>

        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-muted-foreground leading-relaxed mb-8">
            In 2025, AI is no longer a "nice-to-have" — it's the difference between burning budget and dominating your local market. At Flowryse, we've used AI-powered campaigns to deliver 200–500% ROAS for dozens of Australian businesses, from cafes in Sydney to gyms in Melbourne and retailers in Perth.
          </p>

          <p className="mb-8">This guide shows you exactly how local businesses can harness AI on Facebook and Google Ads without needing a PhD in machine learning.</p>

          <div className="bg-gradient-to-r from-primary/10 to-secondary/10 p-8 rounded-xl border border-primary/20 mb-12">
            <div className="flex items-center gap-3 mb-4">
              <Bot className="w-8 h-8 text-primary" />
              <h2 className="text-2xl font-bold m-0">Why AI Matters for Local Businesses Right Now</h2>
            </div>
            <p className="mb-4">Google's Performance Max and Meta's Advantage+ suite are now fully AI-driven. They decide where your ad dollars go in real time — and they punish manual, outdated campaigns.</p>
            <p className="mb-0">AI reads thousands of signals (weather, time of day, device, scroll speed, past purchases) and adjusts bids and creatives faster than any human ever could.</p>
          </div>

          <h2 className="text-3xl font-bold text-primary mt-12 mb-6 flex items-center gap-3">
            <Sparkles className="w-8 h-8" />
            The Tools & Tactics We Use at Flowryse
          </h2>

          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <div className="bg-background/50 border border-border/50 p-6 rounded-xl hover:border-primary/50 transition-all duration-300">
              <div className="flex items-center gap-3 mb-4">
                <Database className="w-6 h-6 text-brand-cyan" />
                <h3 className="text-xl font-bold m-0">Clean Data First</h3>
              </div>
              <p className="text-muted-foreground mb-0">Garbage in, garbage out. Connect your CRM, Google Analytics 4, and Meta pixel properly so the AI actually has something smart to work with.</p>
            </div>

            <div className="bg-background/50 border border-border/50 p-6 rounded-xl hover:border-primary/50 transition-all duration-300">
              <div className="flex items-center gap-3 mb-4">
                <Zap className="w-6 h-6 text-brand-magenta" />
                <h3 className="text-xl font-bold m-0">Creative Automation</h3>
              </div>
              <p className="text-muted-foreground mb-0">Meta's AI can generate 50+ headline/image combinations in seconds. We let it do the heavy lifting, then refine the top performers with local Aussie flavour ("Best Coffee in Bondi" beats "Great Coffee").</p>
            </div>

            <div className="bg-background/50 border border-border/50 p-6 rounded-xl hover:border-primary/50 transition-all duration-300">
              <div className="flex items-center gap-3 mb-4">
                <Target className="w-6 h-6 text-brand-cyan" />
                <h3 className="text-xl font-bold m-0">Predictive Audiences & Lookalikes</h3>
              </div>
              <p className="text-muted-foreground mb-0">Upload your customer list → AI finds people within 10 km who act the same way. One Brisbane retailer saw conversion rates jump 40% after switching to postcode-layered lookalikes.</p>
            </div>

            <div className="bg-background/50 border border-border/50 p-6 rounded-xl hover:border-primary/50 transition-all duration-300">
              <div className="flex items-center gap-3 mb-4">
                <TrendingUp className="w-6 h-6 text-brand-magenta" />
                <h3 className="text-xl font-bold m-0">Real-Time Bid Optimisation</h3>
              </div>
              <p className="text-muted-foreground mb-0">AI raises bids when it's raining in Melbourne (people search "indoor activities") and lowers them at 2 am. A Perth florist hit 5:1 ROAS in three months purely from weather-triggered bidding.</p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-brand-cyan/10 to-brand-magenta/10 p-8 rounded-xl border border-primary/20 mb-12">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <CheckCircle className="w-8 h-8 text-green-500" />
              Real Flowryse Case Study
            </h2>
            <h3 className="text-xl font-semibold mb-4">Perth Florist – Valentine's Day Campaign</h3>
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="bg-background/30 p-4 rounded-lg">
                <p className="text-sm text-muted-foreground mb-1">Manual campaign (previous agency)</p>
                <p className="text-2xl font-bold text-destructive">2.3:1 ROAS</p>
              </div>
              <div className="bg-background/30 p-4 rounded-lg">
                <p className="text-sm text-muted-foreground mb-1">Flowryse AI-driven campaign</p>
                <p className="text-2xl font-bold text-green-500">5.1:1 ROAS</p>
              </div>
            </div>
            <div className="bg-background/30 p-4 rounded-lg mb-4">
              <p className="text-sm text-muted-foreground mb-1">Spend → Revenue</p>
              <p className="text-2xl font-bold">$8,400 → $43,200</p>
            </div>
            <p className="text-muted-foreground mb-0">The only change? Letting AI handle creative testing, bidding, and audience expansion while we provided strategic oversight.</p>
          </div>

          <h2 className="text-3xl font-bold text-primary mt-12 mb-6 flex items-center gap-3">
            <AlertTriangle className="w-8 h-8" />
            Common Mistakes (And How to Avoid Them)
          </h2>

          <div className="space-y-4 mb-12">
            <div className="bg-destructive/10 border border-destructive/20 p-4 rounded-lg">
              <p className="font-semibold mb-1">Blindly trusting AI</p>
              <p className="text-muted-foreground mb-0">Always run human-reviewed A/B tests on winning creatives</p>
            </div>
            <div className="bg-destructive/10 border border-destructive/20 p-4 rounded-lg">
              <p className="font-semibold mb-1">Ignoring privacy laws</p>
              <p className="text-muted-foreground mb-0">Make sure your pixel and data collection comply with OAIC</p>
            </div>
            <div className="bg-destructive/10 border border-destructive/20 p-4 rounded-lg">
              <p className="font-semibold mb-1">Starting too big</p>
              <p className="text-muted-foreground mb-0">Pilot AI on 20% of budget first</p>
            </div>
          </div>

          <h2 className="text-3xl font-bold text-primary mt-12 mb-6">Your Next Step</h2>
          
          <p className="text-lg mb-4">AI isn't coming — it's already here. The businesses that win in 2025 will be the ones who embrace it with the right partner.</p>
          
          <p className="text-lg mb-8">At Flowryse we only get paid when you win (small retainer + 15% of net ROAS). Book a free 15-minute audit and we'll show you exactly where AI can 3X your results.</p>
        </div>

        <div className="mt-12 p-8 bg-gradient-to-r from-primary/10 to-primary/5 rounded-2xl border text-center">
          <h3 className="text-2xl font-bold mb-4">Ready to Let AI Supercharge Your Campaigns?</h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Stop burning budget on manual campaigns. Get a free audit and see exactly where AI can multiply your ROI.
          </p>
          <Button size="lg" asChild className="btn-hero">
            <Link to="/google-audit">Book Your Free Audit</Link>
          </Button>
        </div>

        <nav className="mt-8 pt-8 border-t">
          <Button variant="ghost" size="sm" asChild className="gap-2">
            <Link to="/blog">
              <ArrowLeft className="w-4 h-4" />
              Back to All Articles
            </Link>
          </Button>
        </nav>
      </article>
    </>
  );
};

export default AIDrivenFacebookGoogleAds2025;

import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowLeft, Clock, Tag, Target, Users, RefreshCw, Video, DollarSign, Calculator, CheckCircle, TrendingUp } from "lucide-react";
import flowryseBlogImage from "@/assets/flowryse-blog-featured.png";

const FacebookAdsROI2025 = () => {
  const title = "Boosting Facebook Ad ROI: Essential Strategies for Australian Local Businesses in 2025";
  const description = "Most local businesses waste 40–60% of their Facebook ad spend. Here's how Flowryse clients are hitting 4–8:1 ROAS consistently — even with iOS privacy changes and rising CPMs.";

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
              Paid Advertising
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              8 min read
            </span>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-heading font-bold tracking-tight mb-6 leading-tight">
            {title}
          </h1>
          
          <img 
            src={flowryseBlogImage} 
            alt="Flowryse Online Marketing Agency - Facebook advertising ROI strategies for Australian businesses"
            className="w-full h-64 md:h-80 object-cover rounded-lg mb-8"
          />
        </header>

        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-muted-foreground leading-relaxed mb-8">
            Most local businesses waste 40–60% of their Facebook ad spend. Here's how Flowryse clients are hitting 4–8:1 ROAS consistently — even with iOS privacy changes and rising CPMs.
          </p>

          <div className="bg-gradient-to-r from-primary/10 to-secondary/10 p-8 rounded-xl border border-primary/20 mb-12">
            <div className="flex items-center gap-3 mb-4">
              <Calculator className="w-8 h-8 text-primary" />
              <h2 className="text-2xl font-bold m-0">The ROI Formula That Actually Works</h2>
            </div>
            <div className="bg-background/30 p-4 rounded-lg mb-4 font-mono text-center">
              <p className="text-xl mb-0">ROI = (Revenue from ads − Ad spend) ÷ Ad spend</p>
            </div>
            <p className="mb-0"><strong>Our benchmark for sustainable growth: minimum 4:1.</strong> Anything less and you're just buying vanity metrics.</p>
          </div>

          <h2 className="text-3xl font-bold text-primary mt-12 mb-6">The Tactics That Move the Needle</h2>

          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <div className="bg-background/50 border border-border/50 p-6 rounded-xl hover:border-primary/50 transition-all duration-300">
              <div className="flex items-center gap-3 mb-4">
                <Target className="w-6 h-6 text-brand-cyan" />
                <h3 className="text-xl font-bold m-0">Hyper-Local Audience Layering</h3>
              </div>
              <p className="text-muted-foreground mb-4">Combine 5–10 km radius + interest targeting + lookalike of your best customers.</p>
              <div className="bg-green-500/10 p-3 rounded-lg">
                <p className="text-sm font-semibold text-green-500 mb-0">A Gold Coast surf shop went from 1.8:1 to 6.2:1 ROAS in 30 days with this alone.</p>
              </div>
            </div>

            <div className="bg-background/50 border border-border/50 p-6 rounded-xl hover:border-primary/50 transition-all duration-300">
              <div className="flex items-center gap-3 mb-4">
                <Users className="w-6 h-6 text-brand-magenta" />
                <h3 className="text-xl font-bold m-0">Aggressive Retargeting</h3>
              </div>
              <ul className="text-muted-foreground space-y-2 mb-4">
                <li>Website visitors (30-day window)</li>
                <li>Video viewers (50%+)</li>
                <li>Add-to-cart abandoners</li>
              </ul>
              <p className="text-sm font-semibold text-primary mb-0">Warm audiences convert 5–10× better than cold traffic.</p>
            </div>

            <div className="bg-background/50 border border-border/50 p-6 rounded-xl hover:border-primary/50 transition-all duration-300">
              <div className="flex items-center gap-3 mb-4">
                <RefreshCw className="w-6 h-6 text-brand-cyan" />
                <h3 className="text-xl font-bold m-0">The 70/30 Budget Rule</h3>
              </div>
              <ul className="text-muted-foreground space-y-2 mb-4">
                <li><strong>70% prospecting</strong> (new customers)</li>
                <li><strong>30% retargeting</strong> (closing the sale)</li>
              </ul>
              <p className="text-sm text-muted-foreground mb-0">Most businesses get this backwards and wonder why ROI tanks when they scale.</p>
            </div>

            <div className="bg-background/50 border border-border/50 p-6 rounded-xl hover:border-primary/50 transition-all duration-300">
              <div className="flex items-center gap-3 mb-4">
                <Video className="w-6 h-6 text-brand-magenta" />
                <h3 className="text-xl font-bold m-0">Creative That Stops the Scroll</h3>
              </div>
              <ul className="text-muted-foreground space-y-2 mb-0">
                <li>3-second hook</li>
                <li>Local landmarks or slang</li>
                <li>UGC-style video (phone footage beats polished ads in 2025)</li>
              </ul>
            </div>
          </div>

          <div className="bg-gradient-to-r from-brand-cyan/10 to-brand-magenta/10 p-8 rounded-xl border border-primary/20 mb-12">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <CheckCircle className="w-8 h-8 text-green-500" />
              Real Numbers from Flowryse Clients
            </h2>
            <h3 className="text-xl font-semibold mb-4">Cairns Cafe – 90-Day Campaign</h3>
            
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <div className="bg-background/30 p-4 rounded-lg text-center">
                <p className="text-sm text-muted-foreground mb-1">Ad Spend</p>
                <p className="text-2xl font-bold">$8,120</p>
              </div>
              <div className="bg-background/30 p-4 rounded-lg text-center">
                <p className="text-sm text-muted-foreground mb-1">Revenue Tracked</p>
                <p className="text-2xl font-bold text-green-500">$50,400</p>
              </div>
              <div className="bg-background/30 p-4 rounded-lg text-center">
                <p className="text-sm text-muted-foreground mb-1">ROAS</p>
                <p className="text-2xl font-bold text-primary">6.21:1</p>
              </div>
            </div>
            
            <p className="text-muted-foreground mb-0">The secret? Daily creative refreshes, tight audience layering, and our 15% performance fee model that keeps us obsessed with your results.</p>
          </div>

          <div className="bg-gradient-to-r from-primary/10 to-secondary/10 p-8 rounded-xl border border-primary/20 mb-12">
            <div className="flex items-center gap-3 mb-4">
              <DollarSign className="w-8 h-8 text-primary" />
              <h2 className="text-2xl font-bold m-0">Why Our Model Changes Everything</h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-destructive/10 p-4 rounded-lg">
                <p className="font-semibold text-destructive mb-2">Traditional Agencies</p>
                <p className="text-muted-foreground mb-0">Charge $3k–$10k retainers win or lose.</p>
              </div>
              <div className="bg-green-500/10 p-4 rounded-lg">
                <p className="font-semibold text-green-500 mb-2">Flowryse Model</p>
                <p className="text-muted-foreground mb-0">Small retainer + 15% of net ROAS. When you make more, we make more. Zero incentive to fluff metrics.</p>
              </div>
            </div>
          </div>

          <h2 className="text-3xl font-bold text-primary mt-12 mb-6">Stop Guessing, Start Scaling</h2>
          
          <p className="text-lg mb-8">Want to stop guessing and start scaling with confidence? Book a free 15-minute audit and we'll show you exactly where the leaks are in your current campaigns.</p>
        </div>

        <div className="mt-12 p-8 bg-gradient-to-r from-primary/10 to-primary/5 rounded-2xl border text-center">
          <h3 className="text-2xl font-bold mb-4">Ready to Fix Your Facebook Ads?</h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Stop wasting 40–60% of your ad spend. Get a free audit and find exactly where your campaigns are leaking money.
          </p>
          <Button size="lg" asChild className="btn-hero">
            <Link to="/google-audit">Get Your Free Facebook Ads Audit</Link>
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

export default FacebookAdsROI2025;

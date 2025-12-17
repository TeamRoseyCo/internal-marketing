import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowLeft, Clock, Tag, Search, Mic, MapPin, Star, Smartphone, FileText, TrendingUp, CheckCircle, AlertTriangle } from "lucide-react";
import flowryseBlogImage from "@/assets/flowryse-blog-featured.png";

const GoogleAlgorithmUpdates2025 = () => {
  const title = "How to Thrive Amid Google's 2025 Algorithm Shifts: A Playbook for Aussie Local Businesses";
  const description = "Google doesn't send warning emails before it flips the search world upside down. In 2025 the rules have changed again — here's exactly how Australian local businesses are growing through the chaos.";

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
              Local SEO
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              9 min read
            </span>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-heading font-bold tracking-tight mb-6 leading-tight">
            {title}
          </h1>
          
          <img 
            src={flowryseBlogImage} 
            alt="Flowryse Online Marketing Agency - Google algorithm updates strategy for Australian businesses"
            className="w-full h-64 md:h-80 object-cover rounded-lg mb-8"
          />
        </header>

        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-muted-foreground leading-relaxed mb-8">
            Google doesn't send warning emails before it flips the search world upside down. In 2025 the rules have changed again — Helpful Content Update 3.0, AI Overviews, and stronger local pack signals. Here's exactly how Australian local businesses are not just surviving but growing through the chaos.
          </p>

          <div className="bg-gradient-to-r from-primary/10 to-secondary/10 p-8 rounded-xl border border-primary/20 mb-12">
            <div className="flex items-center gap-3 mb-4">
              <Search className="w-8 h-8 text-primary" />
              <h2 className="text-2xl font-bold m-0">The Big 2025 Changes You Need to Know</h2>
            </div>
            <ul className="space-y-3 mb-0">
              <li className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-500 mt-1 shrink-0" />
                <span>AI Overviews now appear on 40%+ of local searches</span>
              </li>
              <li className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-500 mt-1 shrink-0" />
                <span>EEAT (Experience, Expertise, Authoritativeness, Trustworthiness) is weighted heavier than ever</span>
              </li>
              <li className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-500 mt-1 shrink-0" />
                <span>Local pack favours businesses with 50+ recent reviews and fast mobile load speed</span>
              </li>
              <li className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-500 mt-1 shrink-0" />
                <span>Voice search and "near me" queries are exploding</span>
              </li>
            </ul>
          </div>

          <h2 className="text-3xl font-bold text-primary mt-12 mb-6">Proven Recovery & Growth Tactics</h2>

          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <div className="bg-background/50 border border-border/50 p-6 rounded-xl hover:border-primary/50 transition-all duration-300">
              <div className="flex items-center gap-3 mb-4">
                <Mic className="w-6 h-6 text-brand-cyan" />
                <h3 className="text-xl font-bold m-0">Voice-Search Optimisation</h3>
              </div>
              <p className="text-muted-foreground mb-0">People speak differently than they type. Target questions: "best plumber in Adelaide open Sundays" instead of just "plumber Adelaide".</p>
            </div>

            <div className="bg-background/50 border border-border/50 p-6 rounded-xl hover:border-primary/50 transition-all duration-300">
              <div className="flex items-center gap-3 mb-4">
                <MapPin className="w-6 h-6 text-brand-magenta" />
                <h3 className="text-xl font-bold m-0">Google Business Profile Overhaul</h3>
              </div>
              <ul className="text-muted-foreground space-y-2 mb-0">
                <li>Add 10+ new photos weekly</li>
                <li>Post offers and events</li>
                <li>Respond to every review within 24 hrs</li>
              </ul>
            </div>

            <div className="bg-background/50 border border-border/50 p-6 rounded-xl hover:border-primary/50 transition-all duration-300">
              <div className="flex items-center gap-3 mb-4">
                <TrendingUp className="w-6 h-6 text-brand-cyan" />
                <h3 className="text-xl font-bold m-0">Responsive Search Ads + Broad Match + AI</h3>
              </div>
              <p className="text-muted-foreground mb-0">Let Google's AI match your ads to the new intent signals. We've seen CTRs rise 60% after switching clients from phrase to broad match with smart bidding.</p>
            </div>

            <div className="bg-background/50 border border-border/50 p-6 rounded-xl hover:border-primary/50 transition-all duration-300">
              <div className="flex items-center gap-3 mb-4">
                <FileText className="w-6 h-6 text-brand-magenta" />
                <h3 className="text-xl font-bold m-0">Content That Actually Helps</h3>
              </div>
              <p className="text-muted-foreground mb-0">Write blog posts and landing pages that answer the exact questions your customers ask Google. A Sydney bakery's "Gluten-free birthday cakes inner west" guide now ranks #1 and drives 15 bookings a week.</p>
            </div>
          </div>

          <div className="bg-background/50 border-l-4 border-brand-cyan p-6 rounded-lg mb-8">
            <p className="text-lg italic mb-0">One Adelaide auto shop went from page 2 to the local 3-pack in 6 weeks doing exactly this.</p>
          </div>

          <div className="bg-gradient-to-r from-brand-cyan/10 to-brand-magenta/10 p-8 rounded-xl border border-primary/20 mb-12">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <CheckCircle className="w-8 h-8 text-green-500" />
              Flowryse Client Example
            </h2>
            <h3 className="text-xl font-semibold mb-4">Adelaide Mechanical Workshop – Post-March 2025 Core Update</h3>
            
            <div className="space-y-4 mb-6">
              <div className="bg-destructive/10 p-4 rounded-lg">
                <p className="font-semibold text-destructive mb-1">The Problem</p>
                <p className="text-muted-foreground mb-0">Organic traffic dropped 62% overnight</p>
              </div>
              
              <div className="bg-primary/10 p-4 rounded-lg">
                <p className="font-semibold text-primary mb-1">The Solution</p>
                <p className="text-muted-foreground mb-0">8-week recovery plan: GBP optimisation + new service pages + review campaign</p>
              </div>
              
              <div className="bg-green-500/10 p-4 rounded-lg">
                <p className="font-semibold text-green-500 mb-1">The Result</p>
                <p className="text-muted-foreground mb-0">Traffic back +45% above pre-update levels and 4.8:1 ROAS on Google Ads</p>
              </div>
            </div>
          </div>

          <h2 className="text-3xl font-bold text-primary mt-12 mb-6">The Flowryse Advantage</h2>
          
          <p className="text-lg mb-8">We monitor every major update in real time and adjust campaigns the same week. No waiting for monthly reports while your leads disappear.</p>

          <p className="text-lg mb-8">Ready to turn Google's chaos into your competitive edge? Book a free strategy session and we'll map out your 2025 local domination plan.</p>
        </div>

        <div className="mt-12 p-8 bg-gradient-to-r from-primary/10 to-primary/5 rounded-2xl border text-center">
          <h3 className="text-2xl font-bold mb-4">Ready to Dominate Google in 2025?</h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Don't wait for the next algorithm update to crush your traffic. Get ahead with a proactive local SEO strategy.
          </p>
          <Button size="lg" asChild className="btn-hero">
            <Link to="/google-audit">Claim Your Free Strategy Session</Link>
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

export default GoogleAlgorithmUpdates2025;

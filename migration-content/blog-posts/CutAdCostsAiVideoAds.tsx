import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const title = "The Secret to Cutting Ad Costs While Everyone Else Overspends";
const description = "Every December ad costs spike 30-40%. Feed the algorithm what it wants: authentic UGC-style videos. See 20-35% lower cost per lead and 2-3x engagement rates.";

const blogStructuredData = {
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": title,
  "description": description,
  "author": {
    "@type": "Organization",
    "name": "Flowryse"
  },
  "datePublished": "2024-12-06"
};

export default function CutAdCostsAiVideoAds() {
  return (
    <>
      <SEO 
        title={title}
        description={description}
        structuredData={blogStructuredData}
      />
      
      <article className="container max-w-4xl py-10">
        <Link to="/blog">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Blog
          </Button>
        </Link>

        <header className="mb-8">
          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
            <span className="font-medium text-primary">AI Marketing</span>
            <span>•</span>
            <span>5 min read</span>
          </div>
          <h1 className="text-4xl font-bold mb-4">{title}</h1>
        </header>

        <div className="prose prose-lg max-w-none">
          <h2>Opening</h2>
          <p>Every December, ad costs go up — sometimes 30–40%. Everyone's screaming for attention… but few actually win.</p>

          <h2>The Secret:</h2>
          <p>You don't fight the algorithm — you feed it what it wants.</p>
          <p>And what it wants is engagement. That's why authentic-looking, short, UGC-style videos are crushing overproduced content.</p>

          <h2>The Flowryse Advantage:</h2>
          <p>Our AI Ad Studio creates realistic, on-brand videos that behave like UGC — meaning cheaper CPMs, higher CTRs, and more conversions.</p>

          <h2>Clients are seeing:</h2>
          <ul>
            <li>⚡ 20–35% lower cost per lead</li>
            <li>⚡ 2–3x engagement rates</li>
            <li>⚡ Faster creative refresh cycles</li>
          </ul>

          <h2>Pro Insight:</h2>
          <p>AI ads aren't just "cheaper content." They're algorithm fuel — the kind Meta loves.</p>

          <div className="bg-primary/5 border-l-4 border-primary p-6 my-8">
            <h3 className="text-xl font-bold mb-2">🎯 Get Your Free AI Ad Demo Before Ad Costs Peak</h3>
            <Link to="/book-call">
              <Button size="lg">Claim Your Demo</Button>
            </Link>
          </div>
        </div>

        <Link to="/blog" className="mt-12 inline-block">
          <Button variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to All Articles
          </Button>
        </Link>
      </article>
    </>
  );
}
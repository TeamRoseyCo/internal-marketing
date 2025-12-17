import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const title = "How One Local Tradie Filled His December Calendar in 6 Days";
const description = "From empty December to fully booked in under a week. $472 ad spend turned into 27 qualified job bookings with 11.3x ROI using AI-generated video ads.";

const blogStructuredData = {
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": title,
  "description": description,
  "author": {
    "@type": "Organization",
    "name": "Flowryse"
  },
  "datePublished": "2024-12-05"
};

export default function TradieFilledDecemberCalendar() {
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
            <span className="font-medium text-primary">Case Studies</span>
            <span>•</span>
            <span>5 min read</span>
          </div>
          <h1 className="text-4xl font-bold mb-4">{title}</h1>
        </header>

        <div className="prose prose-lg max-w-none">
          <h2>Opening</h2>
          <p>Meet Jack — a Queensland tradie who went from an empty December calendar to fully booked in less than a week.</p>

          <h2>The Situation:</h2>
          <p>He'd been boosting posts and praying for leads. Nothing worked.</p>

          <h2>The Fix:</h2>
          <p>We built a simple AI-generated video ad for him — showcasing before/after job footage and a Christmas offer. Launched it on Facebook + Google.</p>

          <h2>The Results (in 6 days):</h2>
          <ul>
            <li>$472 ad spend</li>
            <li>27 qualified job bookings</li>
            <li>ROI = 11.3x</li>
            <li>0 camera crews, 0 headaches</li>
          </ul>

          <h2>Why It Worked:</h2>
          <p>Authentic visuals from AI → looked real, not stock.</p>

          <div className="bg-primary/5 border-l-4 border-primary p-6 my-8">
            <h3 className="text-xl font-bold mb-2">Want the same?</h3>
            <p className="mb-4">👉 Claim Your Free AI Ad Demo — and we'll show what your version of Jack's ad could look like.</p>
            <Link to="/book-call">
              <Button size="lg">Get Your Free Demo</Button>
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
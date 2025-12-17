import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const title = "Why Your Christmas Ads Don't Need a $5,000 Video Shoot";
const description = "Fancy production doesn't equal conversions. Learn why AI Ad Studio builds scroll-stopping videos in 48 hours with no crew, no reshoots, and proven 2-3x better performance.";

const blogStructuredData = {
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": title,
  "description": description,
  "author": {
    "@type": "Organization",
    "name": "Flowryse"
  },
  "datePublished": "2024-12-02"
};

export default function ChristmasAdsNo5000VideoShoot() {
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
          <p>Somewhere right now, a small business is spending $5,000 on a Christmas ad shoot… that'll be ready in January.</p>
          <p>The harsh truth: fancy production doesn't equal conversions.</p>

          <h2>The Real Problem with "Big Budget" Ads:</h2>
          <ul>
            <li>They take weeks to plan, shoot, and edit.</li>
            <li>They burn cash on unnecessary production.</li>
            <li>And worst of all — they feel like ads.</li>
          </ul>
          <p>Your customers aren't looking for perfection; they're looking for authenticity.</p>

          <h2>The Smarter Way:</h2>
          <p>Our AI Ad Studio builds scroll-stopping videos using your brand assets, offers, and tone — no crew, no reshoots.</p>
          <ul>
            <li>Delivered in 48 hours</li>
            <li>Designed to look native (real social content style)</li>
            <li>Proven to outperform filmed content 2–3x</li>
          </ul>

          <h2>Case Study Snapshot:</h2>
          <p>One restaurant owner spent $497 on an AI ad — turned that into $4,100 in Christmas party bookings in 10 days. That's an 8.2x ROI, and they never filmed a thing.</p>

          <h2>Your Next Step:</h2>
          <ul>
            <li>Stop overspending on ad production.</li>
            <li>Start investing in performance.</li>
          </ul>

          <div className="bg-primary/5 border-l-4 border-primary p-6 my-8">
            <h3 className="text-xl font-bold mb-2">🎁 Get Your Free AI Ad Demo Before Christmas</h3>
            <Link to="/book-call">
              <Button size="lg">Book Your Free Demo</Button>
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
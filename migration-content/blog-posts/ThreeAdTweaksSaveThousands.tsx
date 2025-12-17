import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const title = "3 Ad Tweaks That Can Save You Thousands This December";
const description = "Competing with the loudest advertisers of the year? Stop boosting posts, rotate creatives weekly, and master retargeting. AI ads often cut CPM by 25%+ with better engagement.";

const blogStructuredData = {
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": title,
  "description": description,
  "author": {
    "@type": "Organization",
    "name": "Flowryse"
  },
  "datePublished": "2024-12-04"
};

export default function ThreeAdTweaksSaveThousands() {
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
            <span className="font-medium text-primary">Ad Strategy</span>
            <span>•</span>
            <span>4 min read</span>
          </div>
          <h1 className="text-4xl font-bold mb-4">{title}</h1>
        </header>

        <div className="prose prose-lg max-w-none">
          <h2>Opening</h2>
          <p>If you're running Facebook or Google Ads this December, you're competing with the loudest — and most wasteful — advertisers of the year.</p>
          <p>Here are 3 tweaks that can instantly improve your performance and cut costs.</p>

          <h2>1. Stop Boosting Posts.</h2>
          <p>Boosts optimize for reach, not conversions. Use proper Leads or Conversions objectives — track every dollar from click → sale.</p>

          <h2>2. Rotate Your Creatives Weekly.</h2>
          <p>Holiday fatigue kills ad performance fast. AI ads refresh in minutes and keep engagement high.</p>

          <h2>3. Don't Forget Retargeting.</h2>
          <p>If someone clicks and doesn't buy, retarget them with urgency offers. You're already paying for the click — now capture the sale.</p>

          <h2>💡 Pro Tip:</h2>
          <p>AI ads often cut CPM by 25%+ because they trigger better engagement signals.</p>

          <div className="bg-primary/5 border-l-4 border-primary p-6 my-8">
            <h3 className="text-xl font-bold mb-2">Get Your Free AI Ad Demo + ROI Checkup</h3>
            <p className="mb-4">We'll audit your campaigns and show you exactly where you're leaking profit.</p>
            <Link to="/book-call">
              <Button size="lg">Book Your Free Audit</Button>
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
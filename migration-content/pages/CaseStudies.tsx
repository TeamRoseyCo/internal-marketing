import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const CaseStudies = () => {
  const title = "Hotel AI Concierge Case Studies | Flowryse";
  const description = "How Flowryse hotel AI concierge reduces response times, lifts occupancy, and grows upsell revenue.";

  const structured = [
    {
      "@context": "https://schema.org",
      "@type": "CaseStudy",
      name: "Renowned local hotel — AI Concierge Results",
      author: { "@type": "Organization", name: "Flowryse" },
      description: "Reduced response time from 3h to <60s, +15% occupancy in low season, +30% upsell revenue in month one.",
      about: "Hotel AI concierge and booking chatbot",
    },
  ];

  return (
    <>
      <SEO title={title} description={description} structuredData={structured} />

      <section className="container py-16 animate-fade-in">
        <h1 className="text-3xl md:text-5xl/tight font-heading font-extrabold tracking-tight mb-6 leading-tight">Hotel Case Studies</h1>
        <div className="grid gap-6 md:grid-cols-1">
          <article className="rounded-xl border p-6 bg-card hover-scale">
            <h2 className="text-xl font-semibold mb-2">Renowned Local Hotel</h2>
            <p className="text-sm text-muted-foreground">Renowned local hotel implemented Flowryse AI Concierge — reduced average response time from 3 hours to under 60 seconds, added 15% occupancy in low season, and grew upsell revenue by 30% in the first month.</p>
          </article>
        </div>
      </section>

      <section className="container py-16 animate-fade-in">
        <div className="rounded-xl border p-6 text-center bg-card">
          <h2 className="text-2xl md:text-3xl font-heading font-bold tracking-tight mb-3">See How We Can Fill More Rooms This Month</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">Get a free 7-minute demo of the Flowryse hotel AI concierge.</p>
          <Button asChild size="lg" variant="hero">
            <Link to="/book-a-call">Book Your Free 7-Minute Demo</Link>
          </Button>
        </div>
      </section>
    </>
  );
};

export default CaseStudies;

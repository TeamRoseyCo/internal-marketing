import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const testimonials = [
  {
    quote:
      "We went from hours-long response times to under a minute, even overnight. Low-season occupancy rose 15% and our front desk workload dropped noticeably.",
    name: "Elena M.",
    role: "General Manager, Seaside Inn",
  },
  {
    quote:
      "Flowryse recovers abandoned bookings we never saw before and consistently upsells spa and late checkout. It pays for itself in weeks.",
    name: "David R.",
    role: "Owner, Parkview Boutique Hotel",
  },
  {
    quote:
      "Multilingual support has been a game changer for international guests. We’re seeing higher satisfaction scores and more direct bookings.",
    name: "Sofia L.",
    role: "Operations Lead, Centro Hotel",
  },
];

const Testimonials = () => {
  const title = "Hotel AI Concierge Testimonials | Flowryse";
  const description = "What hotel managers say about Flowryse: faster responses, higher occupancy, more upsell revenue.";

  const structured = [
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "Hotel testimonials",
      itemListElement: testimonials.map((t, i) => ({ "@type": "ListItem", position: i + 1, name: t.name })),
    },
  ];

  return (
    <>
      <SEO title={title} description={description} structuredData={structured} />

      <section className="container py-16 animate-fade-in">
        <h1 className="text-3xl md:text-5xl/tight font-heading font-extrabold tracking-tight mb-6 leading-tight">What Hoteliers Say</h1>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <figure key={t.name} className="rounded-xl border p-6 bg-card hover-scale">
              <blockquote className="text-sm text-muted-foreground">“{t.quote}”</blockquote>
              <figcaption className="mt-3 text-sm font-medium">{t.name} <span className="text-muted-foreground font-normal">— {t.role}</span></figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="container py-16 animate-fade-in">
        <div className="rounded-xl border p-6 text-center bg-card">
          <h2 className="text-2xl md:text-3xl font-heading font-bold tracking-tight mb-3">Book Your Free 7-Minute Demo</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">See how Flowryse can help you fill more rooms this month.</p>
          <Button asChild size="lg" variant="hero">
            <Link to="/book-a-call">Book Your Free 7-Minute Demo</Link>
          </Button>
        </div>
      </section>
    </>
  );
};

export default Testimonials;

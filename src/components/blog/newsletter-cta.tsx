"use client";

import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/animations";

export function NewsletterCTA() {
  return (
    <section className="py-20 md:py-28 bg-hero-surface">
      <div className="container">
        <FadeIn className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
            Get Marketing Tips Delivered
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Subscribe to our newsletter for weekly insights on growing your
            business through digital marketing.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <Button className="btn-hero">Subscribe</Button>
          </div>
          <p className="text-xs text-muted-foreground mt-4">
            No spam. Unsubscribe anytime.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}

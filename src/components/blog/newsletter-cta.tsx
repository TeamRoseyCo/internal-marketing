"use client";

import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/animations";

export function NewsletterCTA() {
  return (
    <section className="py-24 md:py-32 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-30"
          style={{
            background: "radial-gradient(circle, hsl(320 80% 55% / 0.15), transparent 70%)",
          }}
        />
      </div>
      <div className="container relative z-10">
        <FadeIn className="text-center max-w-2xl mx-auto">
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6">
            Get Marketing Tips Delivered
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground mb-8">
            Subscribe to our newsletter for weekly insights on growing your
            business through digital marketing.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <Button className="btn-hero text-base px-6 py-3 h-auto">Subscribe</Button>
          </div>
          <p className="text-xs text-muted-foreground mt-4">
            No spam. Unsubscribe anytime.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}

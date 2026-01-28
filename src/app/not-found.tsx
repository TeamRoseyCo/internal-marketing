// src/app/not-found.tsx
// 404 Error Page - Dark luxury theme with Rosey Co branding
// Displays when users navigate to non-existent pages

import type { Metadata } from 'next';
import Link from 'next/link';
import { Home, Mail } from 'lucide-react';

export const metadata: Metadata = {
  title: '404 - Page Not Found',
  description: "The page you're looking for doesn't exist or has been moved.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFound() {
  return (
    <div className="relative min-h-[70vh] flex items-center justify-center px-4 py-20">
      {/* Ambient background glow effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full blur-[100px]"
          style={{ background: 'hsl(0 75% 50% / 0.05)' }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full blur-[120px]"
          style={{ background: 'hsl(130 65% 45% / 0.05)' }}
        />
      </div>

      <div className="max-w-2xl w-full relative z-10">
        {/* Glassmorphic Card */}
        <div className="bg-card/50 backdrop-blur-xl border border-border/50 rounded-3xl p-12 md:p-16 text-center relative overflow-hidden">
          {/* Subtle top gradient line */}
          <div
            className="absolute top-0 left-0 right-0 h-px"
            style={{ background: 'linear-gradient(90deg, transparent, hsl(0 75% 50% / 0.3), transparent)' }}
          />

          {/* Large 404 Number with gradient */}
          <div className="mb-8">
            <h1 className="text-8xl md:text-9xl lg:text-[12rem] font-bold gradient-text leading-none tracking-tight">
              404
            </h1>
          </div>

          {/* Heading - uses Fraunces serif font */}
          <h2 className="text-3xl md:text-4xl font-semibold text-foreground mb-4">
            Page Not Found
          </h2>

          {/* Message */}
          <p className="text-muted-foreground text-lg md:text-xl leading-relaxed mb-10 max-w-md mx-auto">
            The page you're looking for doesn't exist or has been moved.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {/* Go Home Button - Primary CTA with gradient */}
            <Link
              href="/"
              className="btn-hero px-8 py-4 rounded-full flex items-center justify-center gap-3 text-base font-semibold transition-all duration-300 hover:scale-105"
            >
              <Home size={20} />
              Go Home
            </Link>

            {/* Contact Us Button - Secondary outline */}
            <Link
              href="/contact"
              className="group px-8 py-4 rounded-full flex items-center justify-center gap-3 text-base font-semibold border-2 border-primary/30 text-foreground hover:border-primary/60 hover:bg-primary/5 transition-all duration-300 hover:scale-105"
            >
              <Mail size={20} />
              Contact Us
            </Link>
          </div>

          {/* Bottom ambient glow */}
          <div
            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-px"
            style={{ background: 'linear-gradient(90deg, transparent, hsl(130 65% 45% / 0.2), transparent)' }}
          />
        </div>
      </div>
    </div>
  );
}

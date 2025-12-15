"use client";

import { motion } from "framer-motion";
import { Mail, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/animations";

export function NewsletterCTA() {
  return (
    <section className="py-24 md:py-32 relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-30"
          style={{
            background: "radial-gradient(circle, hsl(320 80% 55% / 0.15), transparent 70%)",
          }}
        />
        <div
          className="absolute top-1/4 right-1/4 w-[400px] h-[400px] rounded-full opacity-20"
          style={{
            background: "radial-gradient(circle, hsl(276 60% 55% / 0.15), transparent 70%)",
          }}
        />
      </div>

      <div className="container relative z-10">
        <FadeIn className="text-center max-w-3xl mx-auto">
          <motion.div
            className="inline-block mb-8"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="px-5 py-2 text-sm font-medium tracking-wider uppercase rounded-full bg-primary/10 text-primary border border-primary/20">
              Newsletter
            </span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl tracking-tight mb-6">
            Get Marketing Tips{" "}
            <span className="gradient-text">Delivered</span>
          </h2>

          <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl mx-auto">
            Subscribe to our newsletter for weekly insights on growing your
            business through digital marketing.
          </p>

          {/* Glassmorphism form card */}
          <div className="rounded-2xl p-px bg-gradient-to-br from-border/50 via-border/20 to-border/50 max-w-lg mx-auto">
            <div className="bg-card/60 backdrop-blur-xl rounded-2xl p-6 md:p-8 relative">
              {/* Top highlight */}
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent rounded-t-2xl" />

              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full pl-12 pr-4 py-4 rounded-xl border border-border/50 bg-background/50 text-base focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  />
                </div>
                <Button className="btn-hero text-base px-6 py-4 h-auto group">
                  Subscribe
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>

              <p className="text-sm text-muted-foreground mt-4 text-center">
                No spam. Unsubscribe anytime.
              </p>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

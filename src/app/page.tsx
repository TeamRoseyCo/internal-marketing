"use client";

import {
  HeroScene,
  StatementScene,
  ServicesScene,
  ResultsScene,
  CTAScene,
} from "@/components/gsap-scenes";

export default function HomePage() {
  return (
    <main className="relative">
      {/* Scene 1: Hero with VSL */}
      <HeroScene />

      {/* Scene 2: Flow + Ryse Statement (pinned) */}
      <StatementScene />

      {/* Scene 3: Services with stacking cards (pinned) */}
      <ServicesScene />

      {/* Scene 4: Results & Proof */}
      <ResultsScene />

      {/* Scene 5: CTA */}
      <CTAScene />
    </main>
  );
}

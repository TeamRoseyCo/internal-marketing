"use client";

import { useEffect, useState } from "react";
import { MockSearchResult } from "./MockSearchResult";
import { MockDashboard } from "./MockDashboard";
import { MockPhone } from "./MockPhone";
import { MockBrowser } from "./MockBrowser";

interface AutoShowcaseProps {
  interval?: number;
  className?: string;
  aspect?: "video" | "square";
  frameless?: boolean;
}

/** Auto-cycling mini showreel. Frames cross-fade and slide smoothly — each
 *  enters from a slight offset, settles into place. Pauses on hover. */
export function AutoShowcase({
  interval = 3600,
  className = "",
  aspect = "video",
  frameless = false,
}: AutoShowcaseProps) {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const id = window.setInterval(() => setI((v) => (v + 1) % 4), interval);
    return () => window.clearInterval(id);
  }, [interval, paused]);

  const aspectClass = aspect === "square" ? "aspect-square" : "aspect-video";
  const chrome = frameless
    ? ""
    : "rounded-[22px] overflow-hidden shadow-2xl bg-[#f5f5f7]";

  return (
    <div
      className={`ac-showcase relative w-full ${aspectClass} ${chrome} ${className}`}
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
      aria-label="Rosey Co. work showreel"
    >
      <Frame active={i === 0}>
        <div className="w-full h-full p-6 flex items-center justify-center">
          <MockDashboard label="Return on ad spend" value="6.4x" delta="Blended ROAS" />
        </div>
      </Frame>
      <Frame active={i === 1}>
        <div className="w-full h-full p-6 flex items-center justify-center">
          <MockSearchResult
            query="premium coaching program"
            site="northwind.coach"
            title="Northwind. Private coaching for founders."
            description="Executive coaching for founders scaling past seven figures. Waitlist open for the next cohort."
            position={1}
          />
        </div>
      </Frame>
      <Frame active={i === 2}>
        <div className="w-full h-full pt-3 flex items-end justify-center">
          <div className="scale-[0.82] origin-bottom">
            <MockPhone>
              <div className="w-full h-full bg-gradient-to-b from-[#f5f5f7] to-white flex items-center justify-center p-6">
                <div className="text-center text-[#1d1d1f]">
                  <div className="text-[12px] uppercase tracking-widest text-[#6e6e73]">This week</div>
                  <div className="mt-2 text-[44px] font-semibold leading-none">+18.2k</div>
                  <div className="mt-1 text-[14px] text-[#6e6e73]">new followers</div>
                </div>
              </div>
            </MockPhone>
          </div>
        </div>
      </Frame>
      <Frame active={i === 3}>
        <div className="w-full h-full p-6 flex items-center justify-center">
          <MockBrowser url="roseyco.com/case" theme="light">
            <div className="p-8 space-y-2 text-[#1d1d1f]">
              <div className="text-[12px] uppercase tracking-widest text-[#6e6e73]">Launch</div>
              <div className="text-[26px] font-semibold leading-tight">Built to convert.</div>
              <div className="text-[13px] text-[#6e6e73]">Average Lighthouse score: 96.</div>
            </div>
          </MockBrowser>
        </div>
      </Frame>

      {/* Progress dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-20" aria-hidden="true">
        {[0, 1, 2, 3].map((k) => (
          <span
            key={k}
            className="h-1 rounded-full transition-all"
            style={{
              width: i === k ? 20 : 6,
              background: i === k ? "var(--ac-link)" : "rgba(0,0,0,0.2)",
            }}
          />
        ))}
      </div>
    </div>
  );
}

function Frame({ active, children }: { active: boolean; children: React.ReactNode }) {
  return (
    <div
      className="absolute inset-0"
      style={{
        opacity: active ? 1 : 0,
        transform: active ? "scale(1)" : "scale(0.96)",
        transition:
          "opacity 900ms cubic-bezier(0.4, 0, 0.2, 1), transform 900ms cubic-bezier(0.4, 0, 0.2, 1)",
        pointerEvents: active ? "auto" : "none",
      }}
      aria-hidden={!active}
    >
      {children}
    </div>
  );
}

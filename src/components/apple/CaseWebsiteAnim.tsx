"use client";

import { useEffect, useRef, useState } from "react";

interface Props {
  url?: string;
  eyebrow?: string;
  headline?: string;
  className?: string;
}

/** Self-running case-study visual. A browser chrome, then a progress bar
 *  fills, then page elements populate in sequence (logo → title → copy →
 *  CTA). Triggers once when it enters the viewport. */
export function CaseWebsiteAnim({
  url = "2atcleaning.com",
  eyebrow = "Commercial cleaning",
  headline = "Clean sites.",
  className = "",
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState(0); // 0 loading bar, 1 logo, 2 title, 3 body, 4 cta

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setStep(4);
      return;
    }

    let started = false;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting && !started) {
            started = true;
            io.disconnect();
            const delays = [500, 900, 1300, 1700];
            delays.forEach((d, i) => window.setTimeout(() => setStep(i + 1), d));
          }
        }
      },
      { threshold: 0.3 }
    );
    io.observe(node);
    return () => io.disconnect();
  }, []);

  const show = (n: number) => step >= n;

  return (
    <div
      ref={ref}
      className={`w-full max-w-md mx-auto rounded-[14px] overflow-hidden shadow-xl bg-white ${className}`}
    >
      {/* Browser chrome */}
      <div className="flex items-center gap-2 px-3 py-2 bg-[#e8e8ea]">
        <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
        <div className="ml-2 flex-1 rounded-md bg-white px-3 py-1 text-[11px] text-[#6e6e73]">{url}</div>
      </div>

      {/* Loading bar */}
      <div className="h-[2px] bg-[#e8e8ea] relative overflow-hidden">
        <div
          className="absolute left-0 top-0 h-full bg-[#0071e3] transition-all"
          style={{
            width: step >= 1 ? "100%" : "0%",
            transitionDuration: step >= 1 ? "0ms" : "500ms",
            opacity: step >= 2 ? 0 : 1,
          }}
        />
      </div>

      <div className="p-6 min-h-[160px]">
        {/* Logo circle */}
        <div
          className="transition-all duration-500"
          style={{
            opacity: show(1) ? 1 : 0,
            transform: show(1) ? "scale(1)" : "scale(0.6)",
          }}
        >
          <div className="w-8 h-8 rounded-full" style={{ background: "var(--ac-link)" }} />
        </div>

        {/* Title */}
        <div
          className="mt-4 transition-all duration-500"
          style={{
            opacity: show(2) ? 1 : 0,
            transform: show(2) ? "translateY(0)" : "translateY(10px)",
          }}
        >
          <div className="text-[12px] uppercase tracking-widest text-[#6e6e73]">{eyebrow}</div>
          <div className="text-[26px] font-semibold leading-tight text-[#1d1d1f] mt-1">{headline}</div>
        </div>

        {/* Body lines */}
        <div
          className="mt-3 transition-all duration-500"
          style={{
            opacity: show(3) ? 1 : 0,
            transform: show(3) ? "translateY(0)" : "translateY(10px)",
          }}
        >
          <div className="h-[6px] rounded bg-[#e5e5ea] w-full" />
          <div className="h-[6px] rounded bg-[#e5e5ea] w-4/5 mt-2" />
        </div>

        {/* CTA */}
        <div
          className="mt-4 transition-all duration-500"
          style={{
            opacity: show(4) ? 1 : 0,
            transform: show(4) ? "scale(1) translateY(0)" : "scale(0.9) translateY(8px)",
          }}
        >
          <span
            className="inline-block rounded-full text-white text-[13px] px-4 py-1.5"
            style={{ background: "var(--ac-link)" }}
          >
            Get a quote
          </span>
        </div>
      </div>
    </div>
  );
}

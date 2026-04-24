"use client";

import { useEffect, useRef, useState } from "react";

interface ComparisonProps {
  left: { title: string; items: string[] };
  right: { title: string; items: string[] };
}

/** Two cards side by side. One ball per card drops in from the outer edge
 *  and dissolves as the card reveals. Rosey card gets an auto-cycling mini
 *  showreel pinned above its list. Ticks are refined Apple-style checks. */
export function Comparison({ left, right }: ComparisonProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [played, setPlayed] = useState(false);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el || played) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setPlayed(true);
            io.disconnect();
          }
        }
      },
      { threshold: 0.35 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [played]);

  return (
    <div
      ref={wrapRef}
      data-ac-play={played ? "1" : "0"}
      className="ac-comp-wrap relative w-full max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-[0.85fr_1.15fr] gap-5 items-start"
    >
      {/* Left column */}
      <div className="ac-comp-left-stage relative md:mt-12">
        <span aria-hidden="true" className="ac-comp-ball ac-comp-ball-l" />
        <div className="ac-comp-left rounded-[22px] bg-[#f5f5f7] border border-[#e8e8ed] p-7">
          <div className="text-[20px] font-semibold tracking-tight text-[#6e6e73]">{left.title}</div>
          <ul className="mt-5 flex flex-col gap-3">
            {left.items.map((it, i) => (
              <li
                key={it}
                className="ac-comp-item flex items-start gap-3 text-[15px] leading-snug text-[#86868b]"
                style={{ "--i": i } as React.CSSProperties}
              >
                <span aria-hidden="true" className="mt-[3px] shrink-0 inline-flex items-center justify-center w-5 h-5 rounded-full bg-[#e5e5ea]">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M7 7l10 10M17 7L7 17" stroke="#a1a1a6" strokeWidth="2.8" strokeLinecap="round" />
                  </svg>
                </span>
                <span className="line-through">{it}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Right column */}
      <div className="ac-comp-right-stage relative">
        <span aria-hidden="true" className="ac-comp-ball ac-comp-ball-r" />
        <div className="ac-comp-right rounded-[26px] bg-white border border-[#d6e6ff] p-7 md:p-9 shadow-[0_24px_60px_-20px_rgba(0,113,227,0.25)] relative overflow-hidden">
          <div className="ac-comp-right-glow" aria-hidden="true" />
          <div className="relative flex items-center justify-between gap-4 flex-wrap">
            <div className="text-[26px] font-semibold tracking-tight text-[#1d1d1f]">{right.title}</div>
            <div className="text-[12px] uppercase tracking-widest text-[#6e6e73]">Proof</div>
          </div>
          <ul className="relative mt-6 flex flex-col gap-4">
            {right.items.map((it, i) => (
              <li
                key={it}
                className="ac-comp-item flex items-start gap-3 text-[16px] leading-snug text-[#1d1d1f]"
                style={{ "--i": i } as React.CSSProperties}
              >
                <span
                  aria-hidden="true"
                  className="mt-[2px] shrink-0 inline-flex items-center justify-center w-6 h-6 rounded-full"
                  style={{ background: "var(--ac-link)" }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M5 12l5 5L20 7" stroke="#fff" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <span>{it}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

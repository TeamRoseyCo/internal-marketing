"use client";

import { useEffect, useRef, useState } from "react";

interface Props {
  query?: string;
  site?: string;
  title?: string;
  description?: string;
  className?: string;
}

/** Self-running case-study visual. Types the query, shows a spinner, then
 *  reveals the search result. Triggers once when it enters the viewport. */
export function CaseSearchAnim({
  query = "premium coaching program",
  site = "northwind.coach",
  title = "Northwind. Private coaching for founders.",
  description = "Executive coaching for founders scaling past seven figures. Waitlist open for the next cohort.",
  className = "",
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState<"idle" | "typing" | "searching" | "done">("idle");
  const [typed, setTyped] = useState("");

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setPhase("done");
      setTyped(query);
      return;
    }

    let started = false;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting && !started) {
            started = true;
            io.disconnect();
            setPhase("typing");
            // type out the query
            let i = 0;
            const typeNext = () => {
              setTyped(query.slice(0, i));
              i += 1;
              if (i <= query.length) {
                window.setTimeout(typeNext, 50 + Math.random() * 35);
              } else {
                window.setTimeout(() => setPhase("searching"), 200);
                window.setTimeout(() => setPhase("done"), 900);
              }
            };
            typeNext();
          }
        }
      },
      { threshold: 0.3 }
    );
    io.observe(node);
    return () => io.disconnect();
  }, [query]);

  const typing = phase === "typing";
  const searching = phase === "searching";
  const done = phase === "done";

  return (
    <div ref={ref} className={`rounded-[14px] bg-white p-5 shadow-md max-w-md w-full mx-auto text-left ${className}`}>
      <div className="flex items-center gap-3 rounded-full border border-[#d2d2d7] px-4 py-2 text-[#1d1d1f]">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <circle cx="11" cy="11" r="7" stroke="#6e6e73" strokeWidth="2" />
          <path d="M20 20l-3.5-3.5" stroke="#6e6e73" strokeWidth="2" strokeLinecap="round" />
        </svg>
        <span className="text-[14px] flex-1">
          {typed || (phase === "idle" ? " " : "")}
          {typing && <span className="ac-caret" />}
        </span>
        {(searching || done) && (
          <span
            aria-hidden="true"
            className="inline-block w-3 h-3 rounded-full border-2 border-[#d2d2d7] border-t-[#0071e3]"
            style={{ animation: searching ? "ac-spin 0.7s linear infinite" : "none", opacity: searching ? 1 : 0 }}
          />
        )}
      </div>
      <div
        className="mt-5 transition-all duration-500"
        style={{
          opacity: done ? 1 : 0,
          transform: done ? "translateY(0)" : "translateY(8px)",
        }}
      >
        <div className="text-[11px] text-[#6e6e73] uppercase tracking-widest">Position #1</div>
        <div className="text-[12px] text-[#6e6e73] mt-2">{site}</div>
        <div className="text-[17px] text-[#1a0dab] font-medium mt-1 leading-snug">{title}</div>
        <div className="text-[13px] text-[#4d5156] mt-1 leading-snug">{description}</div>
      </div>
    </div>
  );
}

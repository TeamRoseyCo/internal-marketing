"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";

interface Props {
  prefix: string;
}

/** Merged blog + newsletter section. No card. No pills.
 *  An SVG envelope floats next to the copy. On hover the flap opens a crack
 *  to peek at a letter inside. On submit the flap seals, the envelope lifts
 *  off, and a confirmation line slides in. Designed to feel like an object,
 *  not a form. */
export function BlogAndNewsletterFun({ prefix }: Props) {
  const [stage, setStage] = useState<"idle" | "sending" | "done">("idle");
  const inputRef = useRef<HTMLInputElement>(null);
  const rootRef = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setInView(true);
            io.disconnect();
          }
        }
      },
      { threshold: 0.25 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const value = inputRef.current?.value?.trim();
    if (!value) return;
    setStage("sending");
    window.setTimeout(() => setStage("done"), 900);
  };

  return (
    <section
      ref={rootRef}
      className="ac-news-root relative overflow-visible"
      data-ac-in={inView ? "1" : "0"}
      data-ac-stage={stage}
      style={{
        background: "transparent",
        padding: "clamp(64px, 9vw, 120px) clamp(24px, 5vw, 48px)",
      }}
    >
      <div className="w-full max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-[1.1fr_1fr] gap-12 items-center">
        {/* Copy */}
        <div className="text-left" data-ac-stage-el="copy">
          <div className="ac-eyebrow">The letter</div>
          <h2
            className="font-semibold tracking-tight"
            style={{ fontSize: "clamp(36px, 4.5vw, 56px)", lineHeight: 1.02, letterSpacing: "-0.02em" }}
          >
            Valuable insights for business owners.
          </h2>
          <p className="mt-4 text-[17px] text-[#3a3a3c] max-w-md">
            Sent every Sunday. One short idea that moved a client's number this
            week. Plus the longer pieces on the blog when you want more.
          </p>

          {stage !== "done" ? (
            <form onSubmit={onSubmit} className="mt-6 flex flex-col gap-3 max-w-md">
              <div className="relative">
                <input
                  ref={inputRef}
                  type="email"
                  required
                  placeholder="name@company.com"
                  aria-label="Email address"
                  disabled={stage === "sending"}
                  className="w-full bg-transparent border-b border-[#1d1d1f] py-3 text-[20px] outline-none transition-colors focus:border-[#0071e3] placeholder:text-[#aeaeb2]"
                />
                <button
                  type="submit"
                  disabled={stage === "sending"}
                  className="absolute right-0 top-1/2 -translate-y-1/2 text-[16px] font-medium"
                  style={{ color: "var(--ac-link)" }}
                >
                  {stage === "sending" ? "Sealing" : "Subscribe"}
                </button>
              </div>
              <div className="ac-caption">No spam. One click to unsubscribe.</div>
            </form>
          ) : (
            <div className="mt-6 max-w-md" data-ac-stage-el="done">
              <div className="text-[20px] font-medium text-[#1d1d1f]">On its way.</div>
              <div className="mt-1 text-[15px] text-[#6e6e73]">
                Check your inbox in a minute. Confirm and the first issue arrives Sunday.
              </div>
            </div>
          )}

          <div className="mt-10">
            <Link
              href={`${prefix}/blog`}
              className="text-[16px] underline-offset-4 hover:underline"
              style={{ color: "var(--ac-link)" }}
            >
              Or read the blog
            </Link>
          </div>
        </div>

        {/* Envelope visual */}
        <div className="flex items-center justify-center" data-ac-stage-el="envelope">
          <Envelope stage={stage} />
        </div>
      </div>
    </section>
  );
}

function Envelope({ stage }: { stage: "idle" | "sending" | "done" }) {
  return (
    <div className="ac-env-stage relative" data-stage={stage} aria-hidden="true">
      {/* Envelope — flies away on done */}
      <div className="ac-env-craft">
        <svg viewBox="0 0 320 240" width="100%" height="100%">
          <defs>
            <linearGradient id="env-body" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="100%" stopColor="#f0f0f3" />
            </linearGradient>
            <filter id="env-shadow" x="-10%" y="-10%" width="120%" height="140%">
              <feGaussianBlur in="SourceAlpha" stdDeviation="6" />
              <feOffset dy="10" result="offsetblur" />
              <feComponentTransfer><feFuncA type="linear" slope="0.22" /></feComponentTransfer>
              <feMerge>
                <feMergeNode />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Body */}
          <g filter="url(#env-shadow)">
            <path
              d="M20,110 L20,220 Q20,230 30,230 L290,230 Q300,230 300,220 L300,110 L160,190 Z"
              fill="url(#env-body)"
              stroke="#d2d2d7"
            />
          </g>

          {/* Closed flap (top triangle) */}
          <path
            d="M20,110 L160,20 L300,110 L160,190 Z"
            fill="url(#env-body)"
            stroke="#d2d2d7"
          />

          {/* Wax seal dot */}
          <circle cx="160" cy="130" r="14" fill="#0071e3" opacity="0.9" />
          <text x="160" y="135" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff">R</text>
        </svg>
      </div>

      {/* Big tick — scales in after envelope leaves */}
      <div className="ac-env-tick">
        <svg viewBox="0 0 160 160" width="100%" height="100%">
          <defs>
            <radialGradient id="tick-grad" cx="50%" cy="40%" r="60%">
              <stop offset="0%" stopColor="#1a8bff" />
              <stop offset="100%" stopColor="#0071e3" />
            </radialGradient>
          </defs>
          <circle cx="80" cy="80" r="68" fill="url(#tick-grad)" />
          <path
            className="ac-env-tick-path"
            d="M50 82 L72 104 L114 58"
            stroke="#fff"
            strokeWidth="8"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </svg>
      </div>
    </div>
  );
}

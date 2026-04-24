"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

interface BigCloseProps {
  href: string;
  headline?: string;
  tagline?: string;
  primaryLabel?: string;
  secondaryLabel?: string;
}

export function BigClose({
  href,
  headline = "Ready to make a difference in your business?",
  tagline = "Fifteen minutes. A real person. A direct answer.",
  primaryLabel = "Book a call",
  secondaryLabel = "Or send a message",
}: BigCloseProps) {
  const ref = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

  // Aggressive scroll stopper: lock the page at the close section and only
  // release after several insistent scroll attempts OR a hard time cap.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let fired = false;

    // Reveal early on scroll (so animations fire), but only engage the scroll
    // stopper once the ENTIRE section is visible.
    const reveal = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting && e.intersectionRatio > 0.2) {
            setInView(true);
            reveal.disconnect();
          }
        }
      },
      { threshold: [0.2] }
    );
    reveal.observe(el);

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          // Fire when the section's top has crossed the nav line — i.e. the
          // user has "arrived" at the section. Don't snap-scroll: they're
          // here already, just lock further movement briefly.
          const NAV_H = 72;
          const r = e.boundingClientRect;
          const arrived = r.top <= NAV_H + 4 && r.top >= -80;

          if (!fired && e.isIntersecting && arrived) {
            fired = true;
            io.disconnect();
            if (reduce) return;

            const html = document.documentElement;
            const body = document.body;
            const prevHtmlOverflow = html.style.overflow;
            const prevBodyOverflow = body.style.overflow;
            const prevTouchAction = body.style.touchAction;
            html.style.overflow = "hidden";
            body.style.overflow = "hidden";
            body.style.touchAction = "none";

            const MAX_MS = 2000;
            const MAX_EVENTS = 5;
            const start = performance.now();
            let events = 0;
            let released = false;

            const release = () => {
              if (released) return;
              released = true;
              html.style.overflow = prevHtmlOverflow;
              body.style.overflow = prevBodyOverflow;
              body.style.touchAction = prevTouchAction;
              window.removeEventListener("wheel", tally, true);
              window.removeEventListener("touchmove", tally, true);
              window.removeEventListener("keydown", keyTally, true);
            };

            const tally = (ev: Event) => {
              ev.preventDefault();
              ev.stopImmediatePropagation();
              events += 1;
              if (events >= MAX_EVENTS || performance.now() - start > MAX_MS) release();
            };
            const keyTally = (ev: KeyboardEvent) => {
              if (["ArrowDown", "ArrowUp", "PageDown", "PageUp", " ", "Space", "End", "Home"].includes(ev.key)) {
                ev.preventDefault();
                ev.stopImmediatePropagation();
                events += 1;
                if (events >= MAX_EVENTS || performance.now() - start > MAX_MS) release();
              }
            };

            window.addEventListener("wheel", tally, { passive: false, capture: true });
            window.addEventListener("touchmove", tally, { passive: false, capture: true });
            window.addEventListener("keydown", keyTally, true);

            window.setTimeout(release, MAX_MS + 50);
          }
        }
      },
      { threshold: [0, 0.25, 0.5, 0.75, 1] }
    );
    io.observe(el);
    return () => { io.disconnect(); reveal.disconnect(); };
  }, []);

  return (
    <section
      ref={ref}
      className="ac-tile ac-close-root"
      data-ac-theme="black"
      data-ac-in={inView ? "1" : "0"}
      style={{
        background: "#131314",
        color: "#f5f5f7",
        minHeight: "80vh",
        padding: "clamp(56px, 10vw, 140px) clamp(24px, 6vw, 72px)",
        borderRadius: 0,
        boxShadow: "none",
        overflow: "hidden",
      }}
    >
      {/* Subtle dark blobs — low contrast, just a texture. */}
      <div className="ac-close-bg" aria-hidden="true">
        <span className="ac-close-blob ac-close-blob-c" />
        <span className="ac-close-blob ac-close-blob-d" />
      </div>

      <div className="relative z-10 w-full max-w-5xl mx-auto text-center">
        <div className="ac-eyebrow" data-ac-stage="1" style={{ color: "#0a84ff" }}>
          Ready?
        </div>
        <h2
          className="ac-headline"
          data-ac-stage="2"
          style={{
            fontSize: "clamp(44px, 8vw, 108px)",
            lineHeight: 1,
            letterSpacing: "-0.035em",
          }}
        >
          {headline}
        </h2>
        <p
          className="ac-subhead mx-auto"
          data-ac-stage="3"
          style={{ fontSize: "clamp(18px, 2.2vw, 26px)", color: "#a1a1a6" }}
        >
          {tagline}
        </p>
        <div
          className="mt-10 flex flex-col sm:flex-row gap-4 items-center justify-center"
          data-ac-stage="4"
        >
          <Link
            href={href}
            className="ac-pill"
            style={{
              padding: "18px 44px",
              fontSize: "19px",
              fontWeight: 500,
              background: "#ffffff",
              color: "#000000",
              borderRadius: 980,
            }}
          >
            {primaryLabel}
          </Link>
          <Link
            href={href}
            className="ac-link"
            style={{ color: "#0a84ff", fontSize: "17px" }}
          >
            {secondaryLabel}
          </Link>
        </div>
      </div>
    </section>
  );
}

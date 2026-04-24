"use client";

import { useEffect, useRef, useState } from "react";

interface AnimatedStatProps {
  label: string;
  /** The target value as a string. Leading numeric portion animates from 0.
   *  e.g. "247%", "6.4x", "$48k", "1,240+". Non-numeric values ("2-4 wks")
   *  skip the count-up and just fade in. */
  value: string;
  delta?: string;
  duration?: number;
  theme?: "light" | "dark";
  className?: string;
  /** Bottom visual. "line" = animated sparkline. "calendar" = weeks filling. */
  visual?: "line" | "calendar";
}

/** Parses a display string like "247%" into a numeric target and a suffix
 *  (prefix + unit) to rebuild the animated frames. Returns null if the
 *  string is not count-up friendly. */
function parse(value: string):
  | { prefix: string; target: number; decimals: number; suffix: string }
  | null {
  const m = value.match(/^([^\d-]*)(-?\d+(?:[.,]\d+)?)(.*)$/);
  if (!m) return null;
  const [, prefix, num, suffix] = m;
  // Skip ranges like "2-4 wks" — the dash in the middle means there's a second number.
  if (/-\d/.test(suffix)) return null;
  const cleaned = num.replace(/,/g, "");
  const target = parseFloat(cleaned);
  if (!isFinite(target)) return null;
  const decimals = cleaned.includes(".") ? cleaned.split(".")[1].length : 0;
  return { prefix, target, decimals, suffix };
}

function format(n: number, decimals: number): string {
  const fixed = n.toFixed(decimals);
  // re-insert thousands separator if target had one
  const [i, d] = fixed.split(".");
  const withComma = i.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return d ? `${withComma}.${d}` : withComma;
}

export function AnimatedStat({
  label,
  value,
  delta,
  duration = 1400,
  theme = "light",
  className = "",
  visual = "line",
}: AnimatedStatProps) {
  const parsed = parse(value);
  const ref = useRef<HTMLDivElement>(null);
  const [display, setDisplay] = useState<string>(parsed ? `${parsed.prefix}0${parsed.suffix}` : value);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setDisplay(value);
      node.dataset.acIn = "1";
      return;
    }

    let started = false;
    let raf = 0;

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting && !started) {
            started = true;
            io.disconnect();
            // Kick off the line/calendar reveal via class toggle.
            node.dataset.acIn = "1";
            if (!parsed) return; // non-numeric: reveal only, no count-up
            const start = performance.now();
            const tick = (now: number) => {
              const t = Math.min((now - start) / duration, 1);
              const eased = 1 - Math.pow(1 - t, 3);
              const current = parsed.target * eased;
              setDisplay(`${parsed.prefix}${format(current, parsed.decimals)}${parsed.suffix}`);
              if (t < 1) raf = requestAnimationFrame(tick);
            };
            raf = requestAnimationFrame(tick);
          }
        }
      },
      { threshold: 0.15 }
    );
    io.observe(node);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, duration]);

  const bg = theme === "dark" ? "bg-[#1d1d1f]" : "bg-white";
  const text = theme === "dark" ? "text-[#f5f5f7]" : "text-[#1d1d1f]";
  const sub = theme === "dark" ? "text-[#9b9b9f]" : "text-[#6e6e73]";

  return (
    <div
      ref={ref}
      className={`rounded-[16px] p-5 shadow-md h-full flex flex-col ${bg} ${text} ${className}`}
    >
      <div className={`text-[11px] uppercase tracking-widest ${sub}`}>{label}</div>
      <div
        className="mt-2 font-semibold tracking-tight"
        style={{ fontSize: "clamp(32px, 3.6vw, 44px)", lineHeight: 1 }}
      >
        {display}
      </div>
      {delta && (
        <div className="mt-2 text-[13px]" style={{ color: "#34c759" }}>
          {delta}
        </div>
      )}
      {visual === "calendar" ? (
        <CalendarStrip />
      ) : (
      <svg
        viewBox="0 0 200 60"
        className="ac-stat-svg mt-4 w-full h-[44px]"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id={`anstat-spark-${label.replace(/\s+/g, "")}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0071e3" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#0071e3" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path
          className="ac-stat-fill"
          d="M0,45 L20,40 L40,42 L60,30 L80,28 L100,22 L120,18 L140,15 L160,8 L180,6 L200,2 L200,60 L0,60 Z"
          fill={`url(#anstat-spark-${label.replace(/\s+/g, "")})`}
        />
        <path
          className="ac-stat-line"
          d="M0,45 L20,40 L40,42 L60,30 L80,28 L100,22 L120,18 L140,15 L160,8 L180,6 L200,2"
          fill="none"
          stroke="#0071e3"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          pathLength="100"
          strokeDasharray="100"
          strokeDashoffset="100"
        />
      </svg>
      )}
    </div>
  );
}

/** Mini calendar: 4 weeks × 5 days of cells that flip to "filled" sequentially,
 *  with a check mark appearing on weeks 2-3 to visualize "traction window". */
function CalendarStrip() {
  const weeks = 4;
  const days = 5;
  const cells: React.ReactNode[] = [];
  let k = 0;
  for (let w = 0; w < weeks; w++) {
    for (let d = 0; d < days; d++) {
      const filled = w >= 1 && w <= 2; // weeks 2-3 are the "traction" window
      cells.push(
        <span
          key={`cell-${k}`}
          className={`ac-cal-cell ${filled ? "ac-cal-cell-on" : ""}`}
          style={{ transitionDelay: `${400 + k * 38}ms` }}
        >
          {filled && (
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M5 12l5 5L20 7" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
        </span>
      );
      k += 1;
    }
  }
  return (
    <div
      className="ac-cal-grid mt-auto pt-4"
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${days}, 18px)`,
        gridAutoRows: "18px",
        gap: 5,
        justifyContent: "center",
      }}
    >
      {cells}
    </div>
  );
}

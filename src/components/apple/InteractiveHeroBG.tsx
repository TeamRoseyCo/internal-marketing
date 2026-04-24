"use client";

import { useEffect, useRef } from "react";

/** Slow-drifting blurred gradient blobs. Two layered: a base CSS keyframe
 *  drift + a pointer-driven parallax on top. Subtle on purpose. Disabled
 *  automatically for reduced-motion users and on touch-only devices. */
export function InteractiveHeroBG() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const touch = window.matchMedia("(hover: none)").matches;

    let frame = 0;
    let targetX = 0;
    let targetY = 0;
    let x = 0;
    let y = 0;

    const onMove = (e: PointerEvent) => {
      const rect = root.getBoundingClientRect();
      targetX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      targetY = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    };

    const updateScroll = () => {
      // Distance scrolled relative to the hero's own origin. Negative once past.
      const rect = root.getBoundingClientRect();
      // rect.top starts at ~0 when hero is at top of viewport, becomes negative as user scrolls.
      // We invert so `sy` grows with scroll distance into the hero.
      const sy = -rect.top;
      root.style.setProperty("--sy", `${sy}px`);
    };

    const loop = () => {
      x += (targetX - x) * 0.05;
      y += (targetY - y) * 0.05;
      root.style.setProperty("--bx", String(x));
      root.style.setProperty("--by", String(y));
      frame = requestAnimationFrame(loop);
    };

    if (!reduce && !touch) {
      root.addEventListener("pointermove", onMove);
      frame = requestAnimationFrame(loop);
    }

    updateScroll();
    if (!reduce) {
      window.addEventListener("scroll", updateScroll, { passive: true });
      window.addEventListener("resize", updateScroll);
    }

    return () => {
      cancelAnimationFrame(frame);
      root.removeEventListener("pointermove", onMove);
      window.removeEventListener("scroll", updateScroll);
      window.removeEventListener("resize", updateScroll);
    };
  }, []);

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      className="ac-hero-bg"
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        pointerEvents: "none",
        zIndex: 0,
      }}
    >
      <span className="ac-blob-wrap ac-blob-wrap-a">
        <span className="ac-blob ac-blob-a" />
      </span>
      <span className="ac-blob-wrap ac-blob-wrap-b">
        <span className="ac-blob ac-blob-b" />
      </span>
      <span className="ac-blob-wrap ac-blob-wrap-c">
        <span className="ac-blob ac-blob-c" />
      </span>
    </div>
  );
}

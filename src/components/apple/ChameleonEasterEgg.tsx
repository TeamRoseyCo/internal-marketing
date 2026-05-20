"use client";

import { useState, CSSProperties } from "react";

/**
 * Chameleon Easter Egg — Elevateo Web Design Signature
 *
 * A hidden chameleon tucked into a UI element. Default state: fully invisible.
 * On click: pops in place at the anchor point with a left→right reveal,
 * tooltip slides in. Click again to collapse.
 *
 * Designed to be embedded inline next to text/buttons (default `position="absolute"`)
 * or anchored to the viewport (`position="fixed"`).
 *
 * Usage (next to a section title):
 *   <h2 style={{ position: "relative" }}>
 *     <span style={{ position: "relative", display: "inline-block" }}>
 *       Platters
 *       <ChameleonEasterEgg left="calc(100% + 2px)" top="50%" imageSize={16} />
 *     </span>
 *   </h2>
 *
 * Usage (top-right of viewport):
 *   <ChameleonEasterEgg position="fixed" top="22px" right="22px" imageSize={22} />
 *
 * Set `peek` to true while developing to make the egg + a dashed pink box visible
 * so you can find/adjust placement. Remove `peek` before shipping.
 */

interface ChameleonEasterEggProps {
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
  message?: string;
  imageSize?: number;
  src?: string;
  /** "absolute" (default, embed inside a relative parent) or "fixed" (viewport-anchored) */
  position?: "absolute" | "fixed";
  /** which side the tooltip floats — "top" or "bottom" */
  tooltipSide?: "top" | "bottom";
  /** debug: starts visible + dashed pink outline so you can see placement while building */
  peek?: boolean;
}

export default function ChameleonEasterEgg({
  top,
  left,
  right,
  bottom,
  message = "You caught me!",
  imageSize = 22,
  src = "/texture.png",
  position = "absolute",
  tooltipSide = "top",
  peek = false,
}: ChameleonEasterEggProps) {
  const [active, setActive] = useState<boolean>(peek);

  const containerW = imageSize * 2.2;

  const wrapperStyle: CSSProperties = {
    position,
    top,
    left,
    right,
    bottom,
    cursor: "pointer",
    zIndex: 5,
    userSelect: "none",
    outline: peek ? "2px dashed #ff3366" : "none",
    outlineOffset: peek ? 4 : 0,
    boxShadow: peek
      ? "0 0 0 1px rgba(255,51,102,0.2), 0 0 16px rgba(255,51,102,0.4)"
      : "none",
  };

  const tooltipPosition: CSSProperties =
    tooltipSide === "bottom"
      ? { bottom: -42, left: 0 }
      : { top: -42, right: 0 };

  const tooltipStyle: CSSProperties = {
    position: "absolute",
    ...tooltipPosition,
    opacity: active ? 1 : 0,
    transform: active
      ? "translateY(0)"
      : tooltipSide === "bottom"
        ? "translateY(-8px)"
        : "translateY(8px)",
    transition: "opacity .3s ease, transform .3s ease",
    zIndex: 10,
    pointerEvents: "none",
  };

  return (
    <div
      style={wrapperStyle}
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
        setActive(!active);
      }}
    >
      {/* Tooltip */}
      <div style={tooltipStyle}>
        <div
          style={{
            background: "#1f3358",
            color: "#faf6ea",
            fontFamily: "'Tenor Sans', system-ui, sans-serif",
            fontSize: 11,
            fontWeight: 500,
            letterSpacing: 1,
            padding: "8px 14px",
            borderRadius: 999,
            boxShadow: "0 8px 24px rgba(0,0,0,.18)",
            whiteSpace: "nowrap",
          }}
        >
          {message}
        </div>
      </div>

      {/* Pop-in-place reveal: hidden until click, then expands rightward only */}
      <div
        style={{
          position: "relative",
          width: containerW,
          height: imageSize,
          overflow: "hidden",
          borderRadius: 4,
        }}
      >
        <img
          src={src}
          alt=""
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            height: imageSize,
            width: containerW,
            objectFit: "cover",
            objectPosition: "left center",
            clipPath: active ? "inset(0 0 0 0)" : "inset(0 100% 0 0)",
            opacity: active ? 1 : 0,
            transition:
              "clip-path .55s cubic-bezier(.3, 1, .3, 1), opacity .35s ease",
          }}
        />
      </div>
    </div>
  );
}

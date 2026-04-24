"use client";

import { useEffect, useRef, useState } from "react";

/** Runtime tweak widget: lower-right floating bubble. Lets the user try fonts
 *  and accent colours live in the browser without touching code. Writes to CSS
 *  variables on :root and font-family on body. Settings persist in localStorage. */

const FONTS: { label: string; family: string }[] = [
  {
    label: "Inter (current)",
    family:
      'var(--font-ac), -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Segoe UI", "Helvetica Neue", Arial, sans-serif',
  },
  {
    label: "SF / system only",
    family:
      '-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", Arial, sans-serif',
  },
  {
    label: "Geist-like (Inter Tight)",
    family:
      '"Inter Tight", var(--font-ac), -apple-system, BlinkMacSystemFont, Arial, sans-serif',
  },
  {
    label: "Serif (Times)",
    family: 'Georgia, "Times New Roman", Times, serif',
  },
];

const COLOURS: { label: string; hex: string; hover: string }[] = [
  { label: "Apple blue", hex: "#0071e3", hover: "#0077ed" },
  { label: "Rose red", hex: "#df2020", hover: "#e63b3b" },
  { label: "Leaf green", hex: "#2bb24c", hover: "#34c759" },
  { label: "Graphite", hex: "#1d1d1f", hover: "#3a3a3c" },
];

type Settings = { fontIndex: number; colourIndex: number; dark: boolean };

const STORAGE_KEY = "ac-experiment-v1";

export function ExperimentBubble() {
  const [open, setOpen] = useState(false);
  const [fontIndex, setFontIndex] = useState(0);
  const [colourIndex, setColourIndex] = useState(0);
  const [dark, setDark] = useState(false);
  const hydrated = useRef(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as Settings;
        if (typeof parsed.fontIndex === "number") setFontIndex(parsed.fontIndex);
        if (typeof parsed.colourIndex === "number") setColourIndex(parsed.colourIndex);
        if (typeof parsed.dark === "boolean") setDark(parsed.dark);
      }
    } catch {}
    hydrated.current = true;
  }, []);

  useEffect(() => {
    if (!hydrated.current) return;
    document.body.style.fontFamily = FONTS[fontIndex].family;
    const c = COLOURS[colourIndex];
    document.documentElement.style.setProperty("--ac-link", c.hex);
    document.documentElement.style.setProperty("--ac-link-hover", c.hover);
    document.documentElement.style.setProperty("--primary", c.hex);
    document.documentElement.style.setProperty("--ring", c.hex);
    if (dark) document.documentElement.setAttribute("data-theme", "dark");
    else document.documentElement.removeAttribute("data-theme");
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ fontIndex, colourIndex, dark })
      );
    } catch {}
  }, [fontIndex, colourIndex, dark]);

  return (
    <div
      style={{
        position: "fixed",
        right: 20,
        bottom: 20,
        zIndex: 10000,
        fontFamily: "inherit",
      }}
    >
      {open && (
        <div
          style={{
            position: "absolute",
            right: 0,
            bottom: 64,
            minWidth: 260,
            background: "rgba(255,255,255,0.92)",
            backdropFilter: "saturate(180%) blur(20px)",
            WebkitBackdropFilter: "saturate(180%) blur(20px)",
            border: "1px solid rgba(0,0,0,0.08)",
            borderRadius: 18,
            boxShadow: "0 20px 50px -12px rgba(0,0,0,0.2)",
            padding: 16,
            color: "#1d1d1f",
          }}
        >
          <div style={{ fontSize: 12, color: "#6e6e73", textTransform: "uppercase", letterSpacing: "0.08em" }}>
            Font
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 4, marginTop: 8 }}>
            {FONTS.map((f, i) => (
              <button
                key={f.label}
                type="button"
                onClick={() => setFontIndex(i)}
                style={{
                  textAlign: "left",
                  padding: "8px 10px",
                  borderRadius: 10,
                  border: "none",
                  background: i === fontIndex ? "rgba(0,113,227,0.08)" : "transparent",
                  color: i === fontIndex ? "#0071e3" : "#1d1d1f",
                  fontSize: 14,
                  cursor: "pointer",
                }}
              >
                {f.label}
              </button>
            ))}
          </div>
          <div style={{ fontSize: 12, color: "#6e6e73", textTransform: "uppercase", letterSpacing: "0.08em", marginTop: 16 }}>
            Accent
          </div>
          <div style={{ display: "flex", gap: 10, marginTop: 10, flexWrap: "wrap" }}>
            {COLOURS.map((c, i) => (
              <button
                key={c.label}
                type="button"
                aria-label={c.label}
                title={c.label}
                onClick={() => setColourIndex(i)}
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 999,
                  background: c.hex,
                  border: i === colourIndex ? "2px solid #1d1d1f" : "2px solid transparent",
                  cursor: "pointer",
                  padding: 0,
                }}
              />
            ))}
          </div>
          <div style={{ fontSize: 12, color: "#6e6e73", textTransform: "uppercase", letterSpacing: "0.08em", marginTop: 16 }}>
            Theme
          </div>
          <label style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 10, cursor: "pointer", fontSize: 14, color: "#1d1d1f" }}>
            <input
              type="checkbox"
              checked={dark}
              onChange={(e) => setDark(e.target.checked)}
              style={{ width: 16, height: 16, accentColor: "#0071e3" }}
            />
            Dark (charcoal)
          </label>
          <div style={{ fontSize: 11, color: "#6e6e73", marginTop: 14 }}>
            Saved locally. Refresh to keep, or reset below.
          </div>
          <button
            type="button"
            onClick={() => {
              setFontIndex(0);
              setColourIndex(0);
              setDark(false);
            }}
            style={{
              marginTop: 10,
              fontSize: 13,
              color: "#0071e3",
              background: "transparent",
              border: "none",
              padding: 0,
              cursor: "pointer",
            }}
          >
            Reset to defaults
          </button>
        </div>
      )}
      <button
        type="button"
        aria-label="Experiment with fonts and colours"
        onClick={() => setOpen((v) => !v)}
        style={{
          width: 52,
          height: 52,
          borderRadius: 999,
          border: "1px solid rgba(0,0,0,0.08)",
          background: "rgba(255,255,255,0.92)",
          backdropFilter: "saturate(180%) blur(20px)",
          WebkitBackdropFilter: "saturate(180%) blur(20px)",
          boxShadow: "0 10px 30px -6px rgba(0,0,0,0.2)",
          color: "#1d1d1f",
          fontSize: 20,
          fontWeight: 600,
          cursor: "pointer",
        }}
      >
        Aa
      </button>
    </div>
  );
}

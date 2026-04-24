"use client";

import { useEffect, useState } from "react";

type Theme = "dark" | "light" | "black";

/**
 * Watches [data-ac-theme] tiles entering the viewport and returns the active
 * tile's theme so a sticky nav can flip between light/dark without rerendering
 * whole pages. Uses the tile closest to the top of the viewport.
 */
export function useTileTheme(defaultTheme: Theme = "dark"): Theme {
  const [theme, setTheme] = useState<Theme>(defaultTheme);

  useEffect(() => {
    const tiles = Array.from(
      document.querySelectorAll<HTMLElement>("[data-ac-theme]")
    );
    if (tiles.length === 0) return;

    const compute = () => {
      let active: HTMLElement | null = null;
      let bestTop = Number.POSITIVE_INFINITY;
      for (const t of tiles) {
        const r = t.getBoundingClientRect();
        if (r.bottom > 60 && r.top < bestTop) {
          bestTop = r.top;
          active = t;
        }
      }
      if (active) {
        const next = (active.dataset.acTheme as Theme) || defaultTheme;
        setTheme(next);
      }
    };

    compute();
    const onScroll = () => compute();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [defaultTheme]);

  return theme;
}

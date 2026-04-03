"use client";

import { ReactNode, useEffect, useRef, createContext, useContext, useState } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";

// Create context for Lenis instance
const LenisContext = createContext<Lenis | null>(null);

export function useLenis() {
  return useContext(LenisContext);
}

interface LenisProviderProps {
  children: ReactNode;
}

export function LenisProvider({ children }: LenisProviderProps) {
  const lenisRef = useRef<Lenis | null>(null);
  const [lenis, setLenis] = useState<Lenis | null>(null);
  const pathname = usePathname();
  const isPopstateRef = useRef(false);
  const scrollPositions = useRef<Map<string, number>>(new Map());
  const prevPathnameRef = useRef(pathname);

  // Disable browser scroll restoration — Lenis owns scroll position, and
  // without this Chromium re-applies the old scroll offset after our reset.
  useEffect(() => {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
  }, []);

  // Track back/forward navigation and restore saved scroll position
  useEffect(() => {
    const onPopstate = () => {
      isPopstateRef.current = true;
      // Restore scroll position for back/forward navigation
      const saved = scrollPositions.current.get(window.location.pathname);
      if (saved != null) {
        requestAnimationFrame(() => {
          window.scrollTo(0, saved);
          lenisRef.current?.scrollTo(saved, { immediate: true, force: true });
        });
      }
    };
    window.addEventListener("popstate", onPopstate);
    return () => window.removeEventListener("popstate", onPopstate);
  }, []);

  // Scroll to top on forward navigation. Resets both native scroll and Lenis
  // to prevent Chromium from restoring the old position after the effect runs.
  // Uses rAF to wait for the browser's post-navigation layout pass.
  useEffect(() => {
    // Save scroll position of the page we're leaving
    if (prevPathnameRef.current !== pathname) {
      scrollPositions.current.set(prevPathnameRef.current, window.scrollY);
      prevPathnameRef.current = pathname;
    }

    if (isPopstateRef.current) {
      isPopstateRef.current = false;
      return;
    }
    if (window.location.hash) return;

    // Reset native scroll immediately so the browser doesn't hold a stale offset
    window.scrollTo(0, 0);

    // Reset Lenis after the next frame so it picks up the settled DOM
    const raf = requestAnimationFrame(() => {
      if (lenisRef.current) {
        lenisRef.current.scrollTo(0, { immediate: true, force: true });
      }
    });

    return () => cancelAnimationFrame(raf);
  }, [pathname]);

  useEffect(() => {
    // Initialize Lenis with smooth scroll settings
    const lenisInstance = new Lenis({
      duration: 1.4, // Slightly longer for more noticeable smoothness
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Expo ease out
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1.0, // Default wheel speed
      syncTouch: false, // Native touch feel on mobile
      touchMultiplier: 2,
      infinite: false,
      stopInertiaOnNavigate: true,
    });

    lenisRef.current = lenisInstance;

    // Set state after initial render to avoid cascading renders
    // Use setTimeout to defer state update to next tick
    const timeoutId = setTimeout(() => {
      setLenis(lenisInstance);
    }, 0);

    // RAF loop for Lenis
    function raf(time: number) {
      lenisInstance.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Stop/start Lenis based on tab visibility to save CPU
    const handleVisibilityChange = () => {
      if (document.hidden) {
        lenisInstance.stop();
      } else {
        lenisInstance.start();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Handle window resize
    const handleResize = () => {
      lenisInstance.resize();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      clearTimeout(timeoutId);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener("resize", handleResize);
      lenisInstance.destroy();
    };
  }, []);

  return (
    <LenisContext.Provider value={lenis}>
      {children}
    </LenisContext.Provider>
  );
}

// Utility hook for scroll-to functionality
export function useScrollTo() {
  const lenis = useLenis();

  return {
    scrollTo: (
      target: string | number | HTMLElement,
      options?: {
        offset?: number;
        duration?: number;
        immediate?: boolean;
      }
    ) => {
      if (lenis) {
        lenis.scrollTo(target, {
          offset: options?.offset ?? 0,
          duration: options?.duration ?? 1.4,
          immediate: options?.immediate ?? false,
        });
      }
    },
    stop: () => lenis?.stop(),
    start: () => lenis?.start(),
  };
}

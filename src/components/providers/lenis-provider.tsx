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

  // Track back/forward navigation so we don't force scroll-to-top on it
  useEffect(() => {
    const onPopstate = () => { isPopstateRef.current = true; };
    window.addEventListener("popstate", onPopstate);
    return () => window.removeEventListener("popstate", onPopstate);
  }, []);

  // Scroll to top on forward navigation — Lenis overrides the browser's
  // native scroll control, so Next.js's built-in scroll restoration doesn't
  // always work. Without this, some browsers/devices stay at the previous
  // scroll position after clicking a link. Skips back/forward nav and hash
  // links so those behave normally.
  useEffect(() => {
    if (isPopstateRef.current) {
      isPopstateRef.current = false;
      return;
    }
    if (window.location.hash) return;
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true, force: true });
    }
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

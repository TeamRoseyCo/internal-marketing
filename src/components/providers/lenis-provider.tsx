"use client";

import { ReactNode, useEffect, useRef, createContext, useContext, useState } from "react";
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
  const [lenis, setLenis] = useState<Lenis | null>(null);

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
    });

    setLenis(lenisInstance);

    // RAF loop for Lenis
    function raf(time: number) {
      lenisInstance.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Handle window resize
    const handleResize = () => {
      lenisInstance.resize();
    };

    window.addEventListener("resize", handleResize);

    return () => {
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

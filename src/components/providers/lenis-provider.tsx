"use client";

import { ReactNode, useEffect, useRef, createContext, useContext, useState } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugins once
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

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
  const rafCallbackRef = useRef<((time: number) => void) | null>(null);

  useEffect(() => {
    // Initialize Lenis with cinematic scroll settings
    // CRITICAL: autoRaf: false because GSAP ticker handles the RAF loop
    const lenisInstance = new Lenis({
      autoRaf: false, // GSAP ticker will call lenis.raf()
      duration: 1.2, // Smooth but responsive
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      syncTouch: false, // Native touch feel on mobile
      touchMultiplier: 2,
      infinite: false,
    });

    setLenis(lenisInstance);

    // CRITICAL: Sync Lenis scroll events with ScrollTrigger
    lenisInstance.on("scroll", ScrollTrigger.update);

    // CRITICAL: Use GSAP ticker to drive Lenis RAF
    // This ensures Lenis and GSAP animations are perfectly in sync
    const rafCallback = (time: number) => {
      lenisInstance.raf(time * 1000); // GSAP time is in seconds, Lenis expects ms
    };
    rafCallbackRef.current = rafCallback;
    gsap.ticker.add(rafCallback);

    // CRITICAL: Disable GSAP lag smoothing for immediate scroll response
    gsap.ticker.lagSmoothing(0);

    // Handle window resize
    const handleResize = () => {
      lenisInstance.resize();
      // Delay ScrollTrigger refresh to let layout settle
      setTimeout(() => ScrollTrigger.refresh(), 100);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (rafCallbackRef.current) {
        gsap.ticker.remove(rafCallbackRef.current);
      }
      lenisInstance.destroy();
      // Clean up all ScrollTriggers
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
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

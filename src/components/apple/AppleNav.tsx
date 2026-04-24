"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { useTileTheme } from "./useTileTheme";

const THEME_KEY = "ac-theme-preference";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/results", label: "Results" },
  { href: "/case-studies", label: "Case Studies" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

function localePrefix(pathname: string): string {
  const m = pathname.match(/^\/([a-z]{2})(\/|$)/);
  return m ? `/${m[1]}` : "";
}

export function AppleNav() {
  const pathname = usePathname() || "/";
  const prefix = localePrefix(pathname);
  const theme = useTileTheme("light");
  const dark = theme === "dark" || theme === "black";
  const [open, setOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Read persisted dark-mode preference and apply.
  useEffect(() => {
    try {
      const v = localStorage.getItem(THEME_KEY);
      const on = v === "dark";
      setDarkMode(on);
      if (on) document.documentElement.setAttribute("data-theme", "dark");
      else document.documentElement.removeAttribute("data-theme");
    } catch {}
  }, []);

  const toggleDark = useCallback(() => {
    setDarkMode((prev) => {
      const next = !prev;
      if (next) document.documentElement.setAttribute("data-theme", "dark");
      else document.documentElement.removeAttribute("data-theme");
      try { localStorage.setItem(THEME_KEY, next ? "dark" : "light"); } catch {}
      return next;
    });
  }, []);

  return (
    <>
      <header className={`ac-nav ${dark ? "ac-nav--dark" : ""}`}>
        <div className="mx-auto flex h-full max-w-[1280px] items-center justify-between gap-3 px-4 sm:px-6 md:px-10 text-[15px] leading-none">
          <Link href={`${prefix}/`} className="flex items-center gap-2 min-w-0">
            <Image
              src="/ROSEYCO/ROSEYCO-LOGO-TRANSPARENT-BG.png"
              alt="Rosey Co."
              width={36}
              height={36}
              className="h-8 w-8 sm:h-9 sm:w-9 object-contain shrink-0"
              priority
            />
            <span className="font-semibold tracking-tight text-[16px] sm:text-[17px] truncate">
              Rosey Co.
            </span>
          </Link>
          <nav className="hidden lg:flex items-center gap-7">
            {LINKS.map((l) => (
              <Link
                key={l.href}
                href={`${prefix}${l.href}`}
                className="ac-nav-link"
              >
                {l.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <button
              type="button"
              role="switch"
              aria-checked={darkMode}
              aria-label="Toggle dark mode"
              onClick={toggleDark}
              className="ac-theme-toggle hidden sm:inline-flex"
            >
              <span className="ac-theme-slider" data-pos={darkMode ? "dark" : "light"} />
              <span className={`ac-theme-opt ${!darkMode ? "active" : ""}`}>
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <circle cx="12" cy="12" r="4" fill="currentColor" />
                  <g stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <path d="M12 3v2" />
                    <path d="M12 19v2" />
                    <path d="M3 12h2" />
                    <path d="M19 12h2" />
                    <path d="M5.2 5.2l1.4 1.4" />
                    <path d="M17.4 17.4l1.4 1.4" />
                    <path d="M5.2 18.8l1.4-1.4" />
                    <path d="M17.4 6.6l1.4-1.4" />
                  </g>
                </svg>
                Light
              </span>
              <span className={`ac-theme-opt ${darkMode ? "active" : ""}`}>
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M20 14.5A8 8 0 019.5 4a8 8 0 1010.5 10.5z" fill="currentColor" />
                </svg>
                Dark
              </span>
            </button>
            <Link
              href={`${prefix}/contact`}
              className="ac-pill shrink-0"
              style={{ padding: "8px 16px", fontSize: "13px" }}
            >
              Book a call
            </Link>
            <button
              type="button"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className="lg:hidden flex items-center justify-center w-10 h-10 rounded-full hover:bg-black/5"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                {open ? (
                  <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                ) : (
                  <>
                    <path d="M4 8h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    <path d="M4 16h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </>
                )}
              </svg>
            </button>
          </div>
        </div>
      </header>

      {open && (
        <div
          className="fixed inset-0 z-[9998] lg:hidden"
          onClick={() => setOpen(false)}
          style={{
            top: 72,
            background: "rgba(251, 251, 253, 0.98)",
            backdropFilter: "saturate(180%) blur(24px)",
            WebkitBackdropFilter: "saturate(180%) blur(24px)",
          }}
        >
          <nav
            className="max-w-[1280px] mx-auto flex flex-col px-6 py-8 gap-2"
            onClick={(e) => e.stopPropagation()}
          >
            {LINKS.map((l) => (
              <Link
                key={l.href}
                href={`${prefix}${l.href}`}
                onClick={() => setOpen(false)}
                className="text-[#1d1d1f] text-[24px] font-medium tracking-tight py-3 border-b border-[#e5e5ea]"
              >
                {l.label}
              </Link>
            ))}
            <Link
              href={`${prefix}/contact`}
              onClick={() => setOpen(false)}
              className="mt-6 inline-flex items-center justify-center ac-pill"
              style={{ padding: "14px 24px", fontSize: "16px", alignSelf: "flex-start" }}
            >
              Book a call
            </Link>
          </nav>
        </div>
      )}
    </>
  );
}

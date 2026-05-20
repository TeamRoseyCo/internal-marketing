"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/lib/i18n";
import { LocaleSwitcher } from "@/components/locale-switcher";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);

  const { t, locale } = useTranslation();

  // Build locale-aware navigation items with translations
  const navItems = [
    { href: `/${locale}`, label: t("header.home") },
    { href: `/${locale}/services`, label: t("nav.services") },
    { href: `/${locale}/results`, label: t("nav.results") },
    { href: `/${locale}/case-studies`, label: "Case Studies" },
    { href: `/${locale}/blog`, label: t("nav.blog") },
    { href: `/${locale}/contact`, label: t("nav.contact") },
  ];

  // Add subtle background on scroll for readability
  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
    <header
      className={`fixed top-0 w-full transition-all duration-500 ${
        hasScrolled
          ? "bg-background/80 backdrop-blur-xl"
          : "bg-transparent"
      }`}
      style={{ zIndex: isMenuOpen ? 10000 : 50 }}
    >
      {/* Fade gradient at bottom - soft transition instead of hard border */}
      <div
        className={`absolute inset-x-0 bottom-0 h-8 pointer-events-none transition-opacity duration-500 ${
          hasScrolled ? "opacity-100" : "opacity-0"
        }`}
        style={{
          background: "linear-gradient(to bottom, hsl(0 0% 6% / 0.8), transparent)",
          transform: "translateY(100%)",
        }}
      />
      <div className="container flex h-20 md:h-24 items-center justify-between relative" style={{ zIndex: 9999 }}>
        {/* Logo - Dominant Presence */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <Link href={`/${locale}`} className="flex items-center gap-2 group">
            <Image
              src="/roseyco-logo.png"
              alt="Rosey Co. - Global Social Media Marketing Agency"
              width={400}
              height={220}
              className="h-10 sm:h-12 md:h-14 lg:h-16 w-auto transition-transform duration-300 group-hover:scale-105"
              unoptimized
            />
          </Link>
        </motion.div>

        {/* Desktop Navigation - Larger, Bolder Text */}
        <nav className="hidden md:flex items-center gap-2">
          {navItems.map((item, index) => (
            <motion.div
              key={item.href}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.8 }}
            >
              <Link
                href={item.href}
                className="px-5 py-2.5 text-base font-medium text-foreground/80 hover:text-foreground transition-all duration-300 relative group"
              >
                {item.label}
                {/* Animated underline */}
                <span className="absolute bottom-1 left-1/2 w-0 h-0.5 bg-gradient-to-r from-primary to-brand-green group-hover:w-4/5 group-hover:left-[10%] transition-all duration-300" />
              </Link>
            </motion.div>
          ))}
        </nav>

        {/* Locale Switcher + CTA Button + Mobile Menu */}
        <div className="flex items-center gap-4">
          {/* Locale Switcher - Desktop only */}
          <motion.div
            className="hidden md:block"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <LocaleSwitcher variant="dropdown" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <Button asChild size="lg" className="btn-hero hidden sm:inline-flex text-base px-6">
              <Link href={`/${locale}/contact`}>{t("header.cta")}</Link>
            </Button>
          </motion.div>

          {/* Mobile Menu Toggle */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden w-12 h-12"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              <motion.div
                initial={false}
                animate={{ rotate: isMenuOpen ? 90 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </motion.div>
            </Button>
          </motion.div>
        </div>
      </div>

    </header>
    <MobileMenu
      isOpen={isMenuOpen}
      onClose={() => setIsMenuOpen(false)}
      navItems={navItems}
      ctaText={t("header.cta")}
      ctaHref={`/${locale}/contact`}
    />
    </>
  );
}

// Mobile menu as a separate portal-like component rendered outside header
function MobileMenu({
  isOpen,
  onClose,
  navItems,
  ctaText,
  ctaHref,
}: {
  isOpen: boolean;
  onClose: () => void;
  navItems: { href: string; label: string }[];
  ctaText: string;
  ctaHref: string;
}) {
  if (!isOpen) return null;

  return (
    <div
      className="md:hidden fixed left-0 right-0 bottom-0 bg-[#0a0a0a]"
      style={{ zIndex: 9998, top: "80px" }}
    >
      <nav className="flex flex-col items-center gap-2 pt-8 px-6 h-full overflow-y-auto">
        {navItems.map((item, index) => (
          <motion.div
            key={item.href}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05, duration: 0.3 }}
            className="w-full max-w-xs"
          >
            <Link
              href={item.href}
              onClick={onClose}
              className="block py-4 px-6 text-xl font-medium text-center text-foreground/80 hover:text-foreground rounded-2xl transition-all duration-300 hover:bg-gradient-to-r hover:from-primary/10 hover:via-brand-green/10 hover:to-primary/10 hover:shadow-[0_0_30px_-5px_hsl(0_75%_50%/0.3)]"
            >
              {item.label}
            </Link>
          </motion.div>
        ))}

        {/* Locale Switcher - Compact variant for mobile */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: navItems.length * 0.05, duration: 0.3 }}
          className="mt-8 mb-4"
        >
          <LocaleSwitcher variant="compact" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: (navItems.length + 1) * 0.05, duration: 0.3 }}
          className="mt-4"
        >
          <Button asChild size="lg" className="btn-hero text-base px-8 py-4">
            <Link href={ctaHref} onClick={onClose}>
              {ctaText}
            </Link>
          </Button>
        </motion.div>
      </nav>
    </div>
  );
}

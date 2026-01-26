"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Instagram, Linkedin, Mail, Phone } from "lucide-react";
import { useLocale, useTranslation } from "@/lib/i18n";

const socialLinks = [
  {
    icon: Instagram,
    href: "https://www.instagram.com/roseyco.official",
    label: "Instagram",
    color: "rgba(228, 64, 95, 0.7)",
  },
  {
    icon: Linkedin,
    href: "https://www.linkedin.com/company/rosey-co/",
    label: "LinkedIn",
    color: "rgba(10, 102, 194, 0.7)",
  },
];

export function Footer() {
  const locale = useLocale();
  const { t } = useTranslation();

  // Build locale-aware footer links with translated labels
  const footerLinks = {
    services: [
      { href: `/${locale}/services/seo`, label: t("footer.services.seo") },
      { href: `/${locale}/services/social-media`, label: t("footer.services.socialMedia") },
      { href: `/${locale}/services/paid-ads`, label: t("footer.services.paidAds") },
      { href: `/${locale}/services/website-design`, label: t("footer.services.webDesign") },
    ],
    company: [
      { href: `/${locale}/results`, label: t("footer.company.results") },
      { href: `/${locale}/blog`, label: t("footer.company.blog") },
      { href: `/${locale}/contact`, label: t("footer.company.contact") },
      { href: `/${locale}/privacy-policy`, label: t("footer.company.privacy") },
    ],
  };

  return (
    <footer className="relative border-t border-border/30">
      {/* Subtle gradient at top of footer */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

      <div className="container pt-16 pb-8 md:pt-20 md:pb-10">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand Column - Larger Logo */}
          <motion.div
            className="lg:col-span-1"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Link href={`/${locale}`} className="inline-block mb-6 group">
              <Image
                src="/roseyco-logo.png"
                alt="Rosey Co."
                width={280}
                height={160}
                className="h-12 md:h-14 w-auto transition-transform duration-300 group-hover:scale-105"
                unoptimized
              />
            </Link>
            <p className="text-base text-muted-foreground mb-8 max-w-xs leading-relaxed">
              {t("footer.brandDescription")}
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="group relative"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.03, duration: 0.15 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {/* Circular glassmorphism icon */}
                    <div className="w-10 h-10 rounded-full p-px bg-gradient-to-br from-border/40 via-border/20 to-border/40 group-hover:from-white/20 group-hover:via-white/10 group-hover:to-white/20 transition-all duration-200">
                      <div className="w-full h-full rounded-full bg-card/80 backdrop-blur-sm flex items-center justify-center transition-all duration-200 group-hover:bg-white/5">
                        <Icon
                          className="w-4 h-4 transition-colors duration-200"
                          style={{ color: social.color }}
                        />
                      </div>
                    </div>
                    {/* Very subtle glow on hover only */}
                    <div
                      className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-15 transition-opacity duration-200 blur-md -z-10"
                      style={{ backgroundColor: social.color }}
                    />
                  </motion.a>
                );
              })}
            </div>
          </motion.div>

          {/* Services Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-semibold mb-6">{t("footer.headings.services")}</h3>
            <ul className="space-y-4">
              {footerLinks.services.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-base text-muted-foreground hover:text-foreground hover:pl-2 transition-all duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Company Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-semibold mb-6">{t("footer.headings.company")}</h3>
            <ul className="space-y-4">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-base text-muted-foreground hover:text-foreground hover:pl-2 transition-all duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-semibold mb-6">{t("footer.headings.contact")}</h3>
            <ul className="space-y-4">
              <motion.li
                whileHover={{ x: 4 }}
                transition={{ duration: 0.2 }}
              >
                <a
                  href="mailto:team@roseyco.com"
                  className="text-base text-muted-foreground hover:text-foreground transition-colors flex items-center gap-3 group"
                >
                  <span className="relative">
                    <span className="w-10 h-10 rounded-xl p-px bg-gradient-to-br from-border/50 via-border/20 to-border/50 group-hover:from-primary/40 group-hover:via-brand-green/20 group-hover:to-primary/40 transition-all duration-500 flex items-center justify-center">
                      <span className="w-full h-full rounded-xl bg-card/80 backdrop-blur-sm flex items-center justify-center">
                        <Mail className="w-4 h-4 group-hover:text-primary transition-colors" />
                      </span>
                    </span>
                  </span>
                  team@roseyco.com
                </a>
              </motion.li>
              <motion.li
                whileHover={{ x: 4 }}
                transition={{ duration: 0.2 }}
              >
                <a
                  href="tel:+1234567890"
                  className="text-base text-muted-foreground hover:text-foreground transition-colors flex items-center gap-3 group"
                >
                  <span className="relative">
                    <span className="w-10 h-10 rounded-xl p-px bg-gradient-to-br from-border/50 via-border/20 to-border/50 group-hover:from-primary/40 group-hover:via-brand-green/20 group-hover:to-primary/40 transition-all duration-500 flex items-center justify-center">
                      <span className="w-full h-full rounded-xl bg-card/80 backdrop-blur-sm flex items-center justify-center">
                        <Phone className="w-4 h-4 group-hover:text-primary transition-colors" />
                      </span>
                    </span>
                  </span>
                  +1 (234) 567-890
                </a>
              </motion.li>
            </ul>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          className="mt-12 pt-6 border-t border-border/30 flex flex-col sm:flex-row justify-between items-center gap-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Rosey Co. {t("footer.copyright")}
          </p>
          <p className="text-sm text-muted-foreground">
            {t("footer.tagline")}
          </p>
        </motion.div>
      </div>
    </footer>
  );
}

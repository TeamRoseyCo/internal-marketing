import Link from "next/link";
import Image from "next/image";
import { Instagram, Facebook, Twitter, Linkedin, Mail, Phone } from "lucide-react";

const footerLinks = {
  services: [
    { href: "/services/seo", label: "SEO Services" },
    { href: "/services/social-media", label: "Social Media Management" },
    { href: "/services/paid-ads", label: "Paid Advertising" },
    { href: "/services/website-design", label: "Website Design" },
  ],
  company: [
    { href: "/results", label: "Results" },
    { href: "/blog", label: "Blog" },
    { href: "/contact", label: "Contact" },
    { href: "/privacy-policy", label: "Privacy Policy" },
  ],
};

const socialLinks = [
  { icon: Instagram, href: "https://www.instagram.com/flowryseai", label: "Instagram" },
  { icon: Facebook, href: "https://www.facebook.com/profile.php?id=61577395522877", label: "Facebook" },
  { icon: Twitter, href: "https://x.com/FlowryseAI", label: "X (Twitter)" },
  { icon: Linkedin, href: "https://www.linkedin.com/company/104070285", label: "LinkedIn" },
];

export function Footer() {
  return (
    <footer className="border-t border-border/50 bg-background">
      <div className="container py-12 md:py-16">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block mb-4">
              <Image
                src="/logo.png"
                alt="Flowryse"
                width={140}
                height={40}
                className="h-10 w-auto"
              />
            </Link>
            <p className="text-sm text-muted-foreground mb-6 max-w-xs">
              We help businesses worldwide generate more customers through SEO, social media management, and paid advertising. Results guaranteed.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-primary/10 hover:shadow-glow transition-all duration-300"
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Services Column */}
          <div>
            <h3 className="font-semibold mb-4">Services</h3>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h3 className="font-semibold mb-4">Contact</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="mailto:team@flowryse.com"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"
                >
                  <Mail className="w-4 h-4" />
                  team@flowryse.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+1234567890"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"
                >
                  <Phone className="w-4 h-4" />
                  +1 (234) 567-890
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-border/50 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} Flowryse. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            Global Marketing Agency
          </p>
        </div>
      </div>
    </footer>
  );
}

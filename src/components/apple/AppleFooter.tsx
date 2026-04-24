import Link from "next/link";

const COLUMNS = [
  {
    heading: "Services",
    links: [
      { href: "/services/seo", label: "SEO" },
      { href: "/services/social-media", label: "Social Media" },
      { href: "/services/paid-ads", label: "Paid Ads" },
      { href: "/services/website-design", label: "Website Design" },
    ],
  },
  {
    heading: "Work",
    links: [
      { href: "/results", label: "Results" },
      { href: "/blog", label: "Blog" },
    ],
  },
  {
    heading: "Company",
    links: [
      { href: "/contact", label: "Contact" },
      { href: "/privacy-policy", label: "Privacy Policy" },
    ],
  },
];

export function AppleFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="ac-footer">
      <div className="mx-auto max-w-[1024px]">
        <p className="max-w-3xl">
          More information about Rosey Co. services, pricing, and results is
          available on each service page. Results vary by business, market, and
          engagement length.
        </p>
        <div className="ac-footer-divider" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {COLUMNS.map((col) => (
            <div key={col.heading}>
              <div className="ac-footer-heading">{col.heading}</div>
              <ul className="space-y-2">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href}>{l.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div>
            <div className="ac-footer-heading">Locale</div>
            <ul className="space-y-2">
              <li><Link href="/us">United States</Link></li>
              <li><Link href="/uk">United Kingdom</Link></li>
              <li><Link href="/ie">Ireland</Link></li>
              <li><Link href="/au">Australia</Link></li>
              <li><Link href="/nl">Netherlands</Link></li>
              <li><Link href="/dk">Denmark</Link></li>
            </ul>
          </div>
        </div>
        <div className="ac-footer-divider" />
        <div className="flex flex-wrap justify-between gap-4">
          <span>Copyright {year} Rosey Co. All rights reserved.</span>
          <span>
            <Link href="/privacy-policy">Privacy Policy</Link>
          </span>
        </div>
      </div>
    </footer>
  );
}

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Website Design - Conversion-Focused Web Development",
  description:
    "Beautiful, fast, conversion-focused websites that turn visitors into customers. Mobile-first design, SEO-ready structure, and ongoing support included.",
  keywords: [
    "website design",
    "web development",
    "conversion optimization",
    "responsive design",
    "landing page design",
    "website redesign",
    "SEO-ready websites",
    "mobile-first design",
  ],
  openGraph: {
    title: "Website Design - Rosey Co.",
    description:
      "Beautiful, fast, conversion-focused websites that turn visitors into customers.",
    url: "https://roseyco.com/services/website-design",
  },
};

export default function WebsiteDesignLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

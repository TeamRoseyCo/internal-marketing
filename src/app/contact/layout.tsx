import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us - Get Your Free Marketing Strategy Call",
  description:
    "Ready to grow your business? Book a free strategy call with our marketing experts. We'll analyze your current marketing and show you exactly how to get more leads.",
  keywords: [
    "contact",
    "free consultation",
    "marketing strategy",
    "free audit",
    "get in touch",
    "book a call",
  ],
  openGraph: {
    title: "Contact Us - Rosey Co.",
    description:
      "Book a free strategy call with our marketing experts. Get a custom growth plan for your business.",
    url: "https://roseyco.com/contact",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Social Media Management - Grow Your Brand & Engage Your Audience",
  description:
    "Transform your social presence with content that converts. We create scroll-stopping content, build engaged communities, and turn followers into customers.",
  keywords: [
    "social media management",
    "social media agency",
    "content creation",
    "community management",
    "Instagram marketing",
    "Facebook marketing",
    "LinkedIn marketing",
    "social media strategy",
  ],
  openGraph: {
    title: "Social Media Management - Rosey Co.",
    description:
      "Transform your social presence with content that converts. Turn followers into customers.",
    url: "https://roseyco.com/services/social-media",
  },
};

export default function SocialMediaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

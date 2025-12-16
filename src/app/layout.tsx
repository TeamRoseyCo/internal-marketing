import type { Metadata, Viewport } from "next";
import { DM_Sans, Fraunces, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header, Footer } from "@/components/layout";
import { LenisProvider } from "@/components/providers/lenis-provider";

// DM Sans for body text - clean, modern, readable
const dmSans = DM_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

// Fraunces for headlines - sophisticated serif display font
const fraunces = Fraunces({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

// Keep Geist Mono for code blocks
const geistMono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://flowryse.com"),
  title: {
    default: "Flowryse - Global Marketing Agency | SEO, Social Media & Paid Ads",
    template: "%s | Flowryse",
  },
  description:
    "Flowryse is a global marketing agency specializing in SEO, social media management, and paid advertising. Get more leads and grow your business with data-driven strategies.",
  keywords: [
    "marketing agency",
    "SEO services",
    "social media management",
    "paid advertising",
    "Google Ads",
    "Meta Ads",
    "Facebook Ads",
    "digital marketing",
    "lead generation",
  ],
  authors: [{ name: "Flowryse" }],
  creator: "Flowryse",
  publisher: "Flowryse",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://flowryse.com",
    siteName: "Flowryse",
    title: "Flowryse - Global Marketing Agency",
    description:
      "Get more leads and grow your business with our data-driven SEO, social media management, and paid advertising services.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Flowryse - Global Marketing Agency",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Flowryse - Global Marketing Agency",
    description:
      "Get more leads and grow your business with our data-driven marketing services.",
    images: ["/og-image.jpg"],
    creator: "@FlowryseAI",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  appleWebApp: {
    title: "Flowryse",
    statusBarStyle: "black-translucent",
  },
  manifest: "/manifest.json",
};

export const viewport: Viewport = {
  themeColor: "#0d0d0d",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${dmSans.variable} ${fraunces.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <LenisProvider>
          <div className="bg-page-gradient min-h-screen">
            <Header />
            <main className="flex-1 pt-20 md:pt-24">{children}</main>
            <Footer />
          </div>
        </LenisProvider>
      </body>
    </html>
  );
}

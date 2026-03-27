import type { Metadata, Viewport } from "next";
import { DM_Sans, Fraunces } from "next/font/google";
import "./globals.css";
import { Header, Footer } from "@/components/layout";
import { LenisProvider } from "@/components/providers/lenis-provider";
import {
  OrganizationStructuredData,
  WebSiteStructuredData,
} from "@/components/seo/structured-data";
import {
  GoogleAnalytics,
  MicrosoftClarity,
  MetaPixel,
} from "@/components/analytics";
import { Partytown } from "@qwik.dev/partytown/react";

// DM Sans for body text - clean, modern, readable
const dmSans = DM_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  preload: true,
  adjustFontFallback: true,
});

// Fraunces for headlines - sophisticated serif display font
const fraunces = Fraunces({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  preload: true,
  adjustFontFallback: true,
});


export const metadata: Metadata = {
  metadataBase: new URL("https://roseyco.com"),
  title: {
    default: "Rosey Co. - Global Social Media Marketing Agency | SEO, Social Media & Paid Ads",
    template: "%s | Rosey Co.",
  },
  description:
    "Rosey Co. is a global social media marketing agency specializing in SEO, social media management, and paid advertising. Get more leads and grow your business with data-driven strategies.",
  keywords: [
    "social media marketing agency",
    "SEO services",
    "social media management",
    "paid advertising",
    "Google Ads",
    "Meta Ads",
    "Facebook Ads",
    "digital marketing",
    "lead generation",
  ],
  authors: [{ name: "Rosey Co." }],
  creator: "Rosey Co.",
  publisher: "Rosey Co.",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://roseyco.com",
    siteName: "Rosey Co.",
    title: "Rosey Co. - Global Social Media Marketing Agency",
    description:
      "Get more leads and grow your business with our data-driven SEO, social media management, and paid advertising services.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Rosey Co. - Global Social Media Marketing Agency",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rosey Co. - Global Social Media Marketing Agency",
    description:
      "Get more leads and grow your business with our data-driven SEO, social media management, and paid advertising services.",
    images: ["/og-image.jpg"],
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
    title: "Rosey Co.",
    statusBarStyle: "black-translucent",
  },
  manifest: "/manifest.json",
};

export const viewport: Viewport = {
  themeColor: "#0d0d0d",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        {/* Preconnect to BunnyStream CDN for faster video loading - critical for hero video */}
        <link rel="preconnect" href="https://vz-ed4c89a0-c68.b-cdn.net" crossOrigin="anonymous" />

        {/* DNS prefetch for analytics (loaded lazily, so just DNS lookup) */}
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.clarity.ms" />
        <link rel="dns-prefetch" href="https://connect.facebook.net" />

        <Partytown
          forward={["dataLayer.push", "gtag", "fbq", "clarity"]}
        />
        <OrganizationStructuredData />
        <WebSiteStructuredData />
        <GoogleAnalytics />
        <MicrosoftClarity />
        <MetaPixel />
      </head>
      <body
        className={`${dmSans.variable} ${fraunces.variable} antialiased min-h-screen flex flex-col`}
      >
        {/* Skip to main content link for keyboard navigation */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[10000] focus:px-4 focus:py-2 focus:bg-primary focus:text-white focus:rounded-lg focus:shadow-lg"
        >
          Skip to main content
        </a>
        <LenisProvider>
          <div className="bg-page-gradient min-h-screen">
            <Header />
            <main id="main-content" className="flex-1 pt-20 md:pt-24">{children}</main>
            <Footer />
          </div>
        </LenisProvider>
      </body>
    </html>
  );
}

import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header, Footer } from "@/components/layout";
import { LenisProvider } from "@/components/providers/lenis-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <LenisProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </LenisProvider>
      </body>
    </html>
  );
}

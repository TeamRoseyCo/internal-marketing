"use client";

// src/app/privacy-policy/page.tsx
// Privacy Policy page.
// Rebuilt on the Apple-style light design system (the old dark-theme classes
// bg-hero-surface / tech-card / prose-invert were removed in the site rebuild,
// which left this page rendering a broken black gradient and washed-out text).
// RELEVANT FILES: src/app/globals.css, src/components/animations/index.ts

import { FadeIn } from "@/components/animations";

const sections = [
  {
    title: "Introduction",
    body: [
      'Rosey Co. ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit roseyco.com and use our services.',
    ],
  },
  {
    title: "Information We Collect",
    body: ["We collect information you provide directly to us, including:"],
    list: [
      "Name and contact information (email, phone number)",
      "Business information and website URL",
      "Information you provide in contact forms or surveys",
      "Communication records when you contact us",
      "Payment information (processed securely through our payment providers)",
    ],
  },
  {
    title: "How We Use Your Information",
    body: ["We use the information we collect to:"],
    list: [
      "Provide and improve our marketing services",
      "Communicate with you about our services",
      "Send you marketing and promotional communications",
      "Analyze website usage and improve user experience",
      "Process transactions and send related information",
      "Respond to your comments and questions",
    ],
  },
  {
    title: "Cookies and Tracking",
    body: [
      "We use cookies and similar tracking technologies to track activity on our website and hold certain information. Cookies are files with a small amount of data that may include an anonymous unique identifier. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.",
    ],
  },
  {
    title: "Third-Party Services",
    body: [
      "We may employ third-party companies and individuals to facilitate our services, provide services on our behalf, perform service-related tasks, or assist us in analyzing how our services are used. These third parties have access to your personal information only to perform these tasks on our behalf and are obligated not to disclose or use it for any other purpose.",
    ],
  },
  {
    title: "Data Security",
    body: [
      "We implement appropriate security measures to protect against unauthorized access, alteration, disclosure, or destruction of your personal information. However, no method of transmission over the Internet or electronic storage is 100% secure.",
    ],
  },
  {
    title: "Your Rights",
    body: [
      "Depending on your location, you may have certain rights regarding your personal information:",
    ],
    list: [
      "Access your personal data",
      "Correct inaccurate data",
      "Request deletion of your data",
      "Object to processing of your data",
      "Request data portability",
      "Withdraw consent at any time",
    ],
  },
  {
    title: "Changes to This Policy",
    body: [
      'We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.',
    ],
  },
];

export default function PrivacyPolicyPage() {
  // Always shows the current month/year — the policy is kept continuously up to date.
  const lastUpdated = new Date().toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  return (
    <>
      {/* Hero — light tile so the frosted nav blends instead of reading as a grey bar */}
      <section
        style={{ background: "#f5f5f7" }}
        className="px-6 pt-[140px] pb-20 md:pt-[180px] md:pb-28"
      >
        <div className="max-w-3xl mx-auto">
          <FadeIn delay={0.1}>
            <h1
              className="font-semibold tracking-tight text-[#1d1d1f]"
              style={{
                fontSize: "clamp(40px, 6vw, 64px)",
                lineHeight: 1.05,
                letterSpacing: "-0.02em",
              }}
            >
              Privacy Policy
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p
              suppressHydrationWarning
              className="mt-4 text-[16px] text-[#6e6e73]"
            >
              Last updated: {lastUpdated}
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Content */}
      <section style={{ background: "#ffffff" }} className="px-6 py-20 md:py-28">
        <div className="max-w-3xl mx-auto">
          {sections.map((section, i) => (
            <FadeIn key={section.title}>
              <div
                className={i > 0 ? "mt-12 pt-12 border-t border-[#d2d2d7]" : ""}
              >
                <h2
                  className="font-semibold tracking-tight text-[#1d1d1f]"
                  style={{ fontSize: "clamp(22px, 2.6vw, 28px)", letterSpacing: "-0.01em" }}
                >
                  {section.title}
                </h2>
                {section.body.map((para, j) => (
                  <p
                    key={j}
                    className="mt-4 text-[17px] leading-relaxed text-[#3a3a3c]"
                  >
                    {para}
                  </p>
                ))}
                {section.list && (
                  <ul className="mt-4 space-y-2">
                    {section.list.map((item) => (
                      <li
                        key={item}
                        className="flex gap-3 text-[17px] leading-relaxed text-[#3a3a3c]"
                      >
                        <span
                          aria-hidden="true"
                          className="mt-[10px] h-[5px] w-[5px] rounded-full bg-[#86868b] shrink-0"
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </FadeIn>
          ))}

          {/* Contact */}
          <FadeIn>
            <div className="mt-12 pt-12 border-t border-[#d2d2d7]">
              <h2
                className="font-semibold tracking-tight text-[#1d1d1f]"
                style={{ fontSize: "clamp(22px, 2.6vw, 28px)", letterSpacing: "-0.01em" }}
              >
                Contact Us
              </h2>
              <p className="mt-4 text-[17px] leading-relaxed text-[#3a3a3c]">
                If you have any questions about this Privacy Policy, please
                contact us at{" "}
                <a
                  href="mailto:team@roseyco.com"
                  className="text-[#0071e3] hover:underline"
                >
                  team@roseyco.com
                </a>
                .
              </p>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}

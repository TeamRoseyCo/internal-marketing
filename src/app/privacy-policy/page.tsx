"use client";

import { FadeIn } from "@/components/animations";

export default function PrivacyPolicyPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-hero-surface overflow-hidden">
        <div className="container py-24 md:py-32">
          <div className="max-w-3xl mx-auto text-center">
            <FadeIn delay={0.1}>
              <h1 className="text-5xl md:text-6xl lg:text-7xl tracking-tight mb-8 leading-[1.05]">
                Privacy <span className="gradient-text">Policy</span>
              </h1>
            </FadeIn>

            <FadeIn delay={0.2}>
              <p className="text-lg text-muted-foreground">
                Last updated: December 2024
              </p>
            </FadeIn>
          </div>
        </div>

        {/* Gradient fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-background pointer-events-none" />
      </section>

      {/* Content */}
      <section className="py-24 md:py-32">
        <div className="container">
          <FadeIn>
            <div className="prose prose-invert max-w-3xl mx-auto">
              <div className="tech-card p-8 md:p-12 space-y-8">
                <section>
                  <h2 className="font-serif text-2xl font-bold mb-4">Introduction</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Flowryse (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;)
                    is committed to protecting your privacy. This Privacy Policy
                    explains how we collect, use, disclose, and safeguard your
                    information when you visit our website flowryse.com and use
                    our services.
                  </p>
                </section>

                <section>
                  <h2 className="font-serif text-2xl font-bold mb-4">
                    Information We Collect
                  </h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    We collect information you provide directly to us, including:
                  </p>
                  <ul className="list-disc list-inside text-muted-foreground space-y-2">
                    <li>Name and contact information (email, phone number)</li>
                    <li>Business information and website URL</li>
                    <li>Information you provide in contact forms or surveys</li>
                    <li>Communication records when you contact us</li>
                    <li>
                      Payment information (processed securely through our payment
                      providers)
                    </li>
                  </ul>
                </section>

                <section>
                  <h2 className="font-serif text-2xl font-bold mb-4">
                    How We Use Your Information
                  </h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    We use the information we collect to:
                  </p>
                  <ul className="list-disc list-inside text-muted-foreground space-y-2">
                    <li>Provide and improve our marketing services</li>
                    <li>Communicate with you about our services</li>
                    <li>Send you marketing and promotional communications</li>
                    <li>Analyze website usage and improve user experience</li>
                    <li>Process transactions and send related information</li>
                    <li>Respond to your comments and questions</li>
                  </ul>
                </section>

                <section>
                  <h2 className="font-serif text-2xl font-bold mb-4">Cookies and Tracking</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    We use cookies and similar tracking technologies to track
                    activity on our website and hold certain information. Cookies
                    are files with a small amount of data that may include an
                    anonymous unique identifier. You can instruct your browser to
                    refuse all cookies or to indicate when a cookie is being sent.
                  </p>
                </section>

                <section>
                  <h2 className="font-serif text-2xl font-bold mb-4">Third-Party Services</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    We may employ third-party companies and individuals to
                    facilitate our services, provide services on our behalf,
                    perform service-related tasks, or assist us in analyzing how
                    our services are used. These third parties have access to your
                    personal information only to perform these tasks on our behalf
                    and are obligated not to disclose or use it for any other
                    purpose.
                  </p>
                </section>

                <section>
                  <h2 className="font-serif text-2xl font-bold mb-4">Data Security</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    We implement appropriate security measures to protect against
                    unauthorized access, alteration, disclosure, or destruction of
                    your personal information. However, no method of transmission
                    over the Internet or electronic storage is 100% secure.
                  </p>
                </section>

                <section>
                  <h2 className="font-serif text-2xl font-bold mb-4">Your Rights</h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Depending on your location, you may have certain rights
                    regarding your personal information:
                  </p>
                  <ul className="list-disc list-inside text-muted-foreground space-y-2">
                    <li>Access your personal data</li>
                    <li>Correct inaccurate data</li>
                    <li>Request deletion of your data</li>
                    <li>Object to processing of your data</li>
                    <li>Request data portability</li>
                    <li>Withdraw consent at any time</li>
                  </ul>
                </section>

                <section>
                  <h2 className="font-serif text-2xl font-bold mb-4">
                    Changes to This Policy
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    We may update this Privacy Policy from time to time. We will
                    notify you of any changes by posting the new Privacy Policy on
                    this page and updating the &quot;Last updated&quot; date.
                  </p>
                </section>

                <section>
                  <h2 className="font-serif text-2xl font-bold mb-4">Contact Us</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    If you have any questions about this Privacy Policy, please
                    contact us at{" "}
                    <a
                      href="mailto:team@flowryse.com"
                      className="text-primary hover:underline"
                    >
                      team@flowryse.com
                    </a>
                    .
                  </p>
                </section>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}

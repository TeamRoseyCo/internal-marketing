"use client";

// src/app/[locale]/newsletter/page-client.tsx
// Minimal newsletter signup: header, subheader, form. Nothing else.

import { useState } from "react";
import { TileStack } from "@/components/apple";
import { LocaleCode, isValidLocale } from "@/lib/locales";

interface Props {
  params: { locale: string };
}

export default function NewsletterPageClient({ params }: Props) {
  const safe: LocaleCode = isValidLocale(params.locale) ? params.locale : "us";

  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstName, email, locale: safe }),
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j.error || "Subscription failed.");
      }
      setSubmitted(true);
      setFirstName("");
      setEmail("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <TileStack>
      <section
        className="ac-tile ac-tile-light"
        data-ac-theme="light"
        style={{ padding: "clamp(72px, 10vw, 140px) clamp(24px, 5vw, 56px)" }}
      >
        <div style={{ maxWidth: 640, margin: "0 auto", textAlign: "center" }}>
          <h1
            style={{
              fontSize: "clamp(34px, 5vw, 56px)",
              fontWeight: 600,
              letterSpacing: "-0.02em",
              margin: "0 0 18px",
              color: "#1d1d1f",
              lineHeight: 1.05,
            }}
          >
            Get <span className="gradient-text">marketing tips</span> that actually work.
          </h1>
          <p
            style={{
              fontSize: "clamp(17px, 1.6vw, 20px)",
              color: "#6e6e73",
              margin: "0 auto clamp(32px, 4vw, 44px)",
              maxWidth: 560,
              lineHeight: 1.5,
            }}
          >
            Join 1,000+ business owners learning to run profitable Facebook Ads, Google Ads, and
            SEO campaigns. No fluff, just results.
          </p>

          {submitted ? (
            <div style={{ fontSize: 17, color: "#1d1d1f", fontWeight: 500 }}>
              You're in. Check your inbox — your first issue lands shortly.
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 14,
                maxWidth: 480,
                margin: "0 auto",
                textAlign: "left",
              }}
            >
              <input
                id="firstName"
                type="text"
                required
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="First name"
                className="newsletter-input"
              />
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email address"
                autoComplete="email"
                className="newsletter-input"
              />

              {error && (
                <div
                  style={{
                    color: "#c62828",
                    background: "#fdecec",
                    border: "1px solid #f5b9bc",
                    borderRadius: 12,
                    padding: "10px 14px",
                    fontSize: 13,
                  }}
                >
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={submitting}
                style={{
                  padding: "14px 24px",
                  fontSize: 16,
                  fontWeight: 600,
                  color: "#fff",
                  background: submitting ? "#7ab2ee" : "#0071e3",
                  border: 0,
                  borderRadius: 14,
                  cursor: submitting ? "default" : "pointer",
                  boxShadow: "0 8px 20px -8px rgba(0,113,227,0.5)",
                  transition: "all 200ms ease",
                }}
              >
                {submitting ? "Subscribing…" : "Subscribe"}
              </button>

              <p style={{ fontSize: 12, color: "#86868b", textAlign: "center", margin: 0 }}>
                Unsubscribe anytime. By submitting, you agree to our{" "}
                <a href={`/${safe}/privacy-policy`} style={{ color: "#0071e3" }}>
                  Privacy Policy
                </a>
                .
              </p>
            </form>
          )}
        </div>

        <style jsx>{`
          :global(.newsletter-input) {
            width: 100%;
            border-radius: 14px;
            border: 1px solid #d2d2d7;
            background: #fbfbfd;
            padding: 14px 16px;
            font-size: 15px;
            color: #1d1d1f;
            outline: none;
            transition: border-color 150ms ease, box-shadow 150ms ease;
          }
          :global(.newsletter-input)::placeholder {
            color: #86868b;
          }
          :global(.newsletter-input):focus {
            border-color: #0071e3;
            box-shadow: 0 0 0 4px rgba(0, 113, 227, 0.15);
          }
        `}</style>
      </section>
    </TileStack>
  );
}

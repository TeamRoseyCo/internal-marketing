"use client";

import { useState } from "react";
import { Tile, TileStack } from "@/components/apple";
import { LocaleCode, isValidLocale } from "@/lib/locales";

interface Props {
  params: { locale: string };
}

// Service options match the live roseyco.com/us/contact form
const SERVICES = [
  { value: "seo", label: "SEO Services" },
  { value: "social-media", label: "Social Media Management" },
  { value: "paid-ads", label: "Paid Advertising" },
  { value: "website-design", label: "Website Design" },
  { value: "other", label: "Other / Not Sure" },
];

// Direct contact details (mirrors live roseyco.com/us/contact)
const CONTACT_DETAILS = {
  email: "team@roseyco.com",
  phone: "+1 (307) 400-9814",
  phoneHref: "tel:+13074009814",
  location: "Missouri, United States",
  responseTime: "Within 24 hours",
};

export default function ContactPageClient({ params }: Props) {
  const safe: LocaleCode = isValidLocale(params.locale) ? params.locale : "us";

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [service, setService] = useState("");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    const form = new FormData(e.currentTarget);
    const data = {
      firstName: form.get("firstName") as string,
      lastName: form.get("lastName") as string,
      email: form.get("email") as string,
      phone: form.get("phone") as string,
      website: form.get("website") as string,
      companyWebsite: form.get("companyWebsite") as string,
      _hp_url: form.get("_hp_url") as string, // honeypot
      service,
      message: form.get("message") as string,
    };
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j.error || "Something went wrong.");
      }
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <TileStack>
        <Tile
          theme="light"
          variant="A"
          eyebrow="Received"
          headline="On the way."
          tagline="A short reply lands in your inbox within 24 hours. Usually sooner."
        />
      </TileStack>
    );
  }

  return (
    <TileStack>
      {/* Single merged section: hero centered, then 2 cols (form left, details right) */}
      <section
        className="ac-tile ac-tile-light"
        data-ac-theme="light"
        style={{ padding: "clamp(56px, 7vw, 96px) clamp(24px, 5vw, 56px)" }}
      >
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          {/* Hero header */}
          <div style={{ textAlign: "center", marginBottom: "clamp(48px, 6vw, 72px)" }}>
            <div
              aria-hidden="true"
              style={{
                width: 88,
                height: 88,
                margin: "0 auto 22px",
                borderRadius: "50%",
                background:
                  "radial-gradient(circle at 30% 30%, #ff6b8a 0%, #e8252a 55%, #c41015 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 10px 30px -8px rgba(232,37,42,0.4)",
              }}
            >
              <svg viewBox="0 0 24 24" width="44" height="44" fill="white">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            </div>
            <h1
              style={{
                fontSize: "clamp(34px, 4.5vw, 52px)",
                fontWeight: 600,
                letterSpacing: "-0.015em",
                margin: "0 0 12px",
                color: "#1d1d1f",
                lineHeight: 1.1,
              }}
            >
              Rosey Co. Support
            </h1>
            <p
              style={{
                fontSize: "clamp(17px, 1.6vw, 20px)",
                color: "#6e6e73",
                margin: 0,
                fontWeight: 400,
              }}
            >
              Need help growing? Start here.
            </p>
          </div>

          {/* 2-column: form left, details right */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "minmax(0, 1.5fr) minmax(0, 1fr)",
              gap: "clamp(32px, 4vw, 56px)",
              alignItems: "start",
            }}
            className="contact-grid"
          >
            {/* Left: form */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-5 text-left">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Field name="firstName" label="First Name" required />
                <Field name="lastName" label="Last Name" required />
              </div>
              <Field name="email" label="Email Address" type="email" required />
              <Field name="phone" label="Phone Number" type="tel" />
              <Field name="website" label="Website URL" type="url" />
              <Field name="companyWebsite" label="Company Website" type="url" />
              <div>
                <label className="text-[13px] text-[#6e6e73]" htmlFor="service">
                  Service Interested In <span style={{ color: "#c62828" }}>*</span>
                </label>
                <select
                  id="service"
                  required
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                  className="mt-2 w-full rounded-[14px] border border-[#d2d2d7] bg-white px-4 py-3 text-[15px] outline-none focus:border-[#0071e3]"
                >
                  <option value="">Choose a service</option>
                  {SERVICES.map((s) => (
                    <option key={s.value} value={s.value}>
                      {s.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-[13px] text-[#6e6e73]" htmlFor="message">
                  Tell us about your business and goals <span style={{ color: "#c62828" }}>*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  required
                  className="mt-2 w-full rounded-[14px] border border-[#d2d2d7] bg-white px-4 py-3 text-[15px] outline-none focus:border-[#0071e3]"
                />
              </div>
              {/* Honeypot */}
              <input
                type="text"
                name="_hp_url"
                tabIndex={-1}
                autoComplete="off"
                style={{ position: "absolute", left: "-9999px" }}
                aria-hidden="true"
              />
              {error && <div className="text-[14px]" style={{ color: "#c62828" }}>{error}</div>}
              <div className="flex flex-col gap-3 mt-2">
                <button
                  type="submit"
                  disabled={submitting}
                  className="ac-pill"
                  style={{
                    padding: "14px 28px",
                    fontSize: "16px",
                    fontWeight: 600,
                    opacity: submitting ? 0.6 : 1,
                    alignSelf: "flex-start",
                  }}
                >
                  {submitting ? "Sending…" : "Book Your Free Strategy Call"}
                </button>
                <p className="text-[13px] text-[#6e6e73]">
                  By submitting this form, you agree to our{" "}
                  <a
                    href={`/${safe}/privacy-policy`}
                    className="underline hover:text-[#0071e3]"
                  >
                    Privacy Policy
                  </a>
                  .
                </p>
              </div>
            </form>

            {/* Right: contact details */}
            <aside
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 16,
              }}
            >
              <h2 style={{ fontSize: 13, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", color: "#6e6e73", margin: "0 0 8px" }}>
                Or reach us directly
              </h2>
              <ContactCard
                label="Call us"
                value={CONTACT_DETAILS.phone}
                href={CONTACT_DETAILS.phoneHref}
                icon={
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                }
              />
              <ContactCard
                label="Email us"
                value={CONTACT_DETAILS.email}
                href={`mailto:${CONTACT_DETAILS.email}`}
                icon={
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                }
              />
              <ContactCard
                label="Based in"
                value={CONTACT_DETAILS.location}
                icon={
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                }
              />
              <ContactCard
                label="Reply time"
                value={CONTACT_DETAILS.responseTime}
                icon={
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                }
              />
            </aside>
          </div>
        </div>

        {/* On small screens, stack columns */}
        <style jsx>{`
          @media (max-width: 900px) {
            :global(.contact-grid) {
              grid-template-columns: 1fr !important;
            }
          }
        `}</style>
      </section>
    </TileStack>
  );
}

function ContactCard({
  label,
  value,
  href,
  icon,
}: {
  label: string;
  value: string;
  href?: string;
  icon: React.ReactNode;
}) {
  const inner = (
    <>
      <div style={{ width: 32, height: 32, color: "#0071e3", marginBottom: 14 }}>
        {icon}
      </div>
      <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", color: "#6e6e73", marginBottom: 6 }}>
        {label}
      </div>
      <div style={{ fontSize: 17, fontWeight: 500, color: "#1d1d1f" }}>
        {value}
      </div>
    </>
  );
  const baseStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    padding: "28px",
    background: "#fff",
    border: "1px solid #d2d2d7",
    borderRadius: 18,
    minHeight: 160,
    transition: "all 200ms ease",
    textDecoration: "none",
    color: "inherit",
  };
  if (href) {
    return (
      <a
        href={href}
        style={baseStyle}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = "#0071e3";
          e.currentTarget.style.transform = "translateY(-2px)";
          e.currentTarget.style.boxShadow = "0 8px 24px -8px rgba(0,0,0,0.12)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = "#d2d2d7";
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.boxShadow = "none";
        }}
      >
        {inner}
      </a>
    );
  }
  return <div style={baseStyle}>{inner}</div>;
}

function Field({
  name,
  label,
  type = "text",
  required,
}: {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="text-[13px] text-[#6e6e73]" htmlFor={name}>
        {label}
        {required && <span style={{ color: "#c62828" }}> *</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        autoComplete={type === "email" ? "email" : type === "tel" ? "tel" : "off"}
        className="mt-2 w-full rounded-[14px] border border-[#d2d2d7] bg-white px-4 py-3 text-[15px] outline-none focus:border-[#0071e3]"
      />
    </div>
  );
}

"use client";

import { useState, useRef } from "react";
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

// Apple-Support-style icon grid: each tile pre-fills the form's service field
type HelpTile = {
  key: string;
  label: string;
  serviceValue: string; // matches SERVICES[].value, or "" for general
  icon: JSX.Element;
};

const HELP_TILES: HelpTile[] = [
  {
    key: "seo",
    label: "SEO",
    serviceValue: "seo",
    icon: (
      <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="28" cy="28" r="16" />
        <path d="m40 40 14 14" />
        <path d="M22 28h12M28 22v12" />
      </svg>
    ),
  },
  {
    key: "paid-ads",
    label: "Paid Ads",
    serviceValue: "paid-ads",
    icon: (
      <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M8 36V20a4 4 0 0 1 4-4h28l16-8v40l-16-8H12a4 4 0 0 1-4-4Z" />
        <path d="M20 40v8a4 4 0 0 0 8 0v-8" />
      </svg>
    ),
  },
  {
    key: "social",
    label: "Social Media",
    serviceValue: "social-media",
    icon: (
      <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="8" y="8" width="48" height="48" rx="12" />
        <circle cx="32" cy="32" r="10" />
        <circle cx="46" cy="18" r="2.5" fill="currentColor" />
      </svg>
    ),
  },
  {
    key: "website",
    label: "Website Design",
    serviceValue: "website-design",
    icon: (
      <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="6" y="10" width="52" height="40" rx="3" />
        <path d="M6 22h52" />
        <circle cx="13" cy="16" r="1.5" fill="currentColor" />
        <circle cx="19" cy="16" r="1.5" fill="currentColor" />
        <circle cx="25" cy="16" r="1.5" fill="currentColor" />
        <path d="M22 56h20M32 50v6" />
      </svg>
    ),
  },
  {
    key: "all",
    label: "Full Strategy",
    serviceValue: "all",
    icon: (
      <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M32 6v52M6 32h52" />
        <circle cx="32" cy="32" r="22" />
        <path d="M14 14 50 50M50 14 14 50" />
      </svg>
    ),
  },
  {
    key: "billing",
    label: "Billing",
    serviceValue: "",
    icon: (
      <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="6" y="14" width="52" height="36" rx="4" />
        <path d="M6 26h52M14 40h12M32 40h6" />
      </svg>
    ),
  },
  {
    key: "account",
    label: "Account",
    serviceValue: "",
    icon: (
      <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="32" cy="22" r="10" />
        <path d="M10 56c2-12 11-18 22-18s20 6 22 18" />
      </svg>
    ),
  },
  {
    key: "other",
    label: "Something else",
    serviceValue: "",
    icon: (
      <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="32" cy="32" r="24" />
        <path d="M24 26c0-4 4-7 8-7s8 3 8 7c0 4-4 5-6 7-1 1-2 2-2 4" />
        <circle cx="32" cy="46" r="1.5" fill="currentColor" />
      </svg>
    ),
  },
];

export default function ContactPageClient({ params }: Props) {
  const safe: LocaleCode = isValidLocale(params.locale) ? params.locale : "us";

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [service, setService] = useState("");
  const [error, setError] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement | null>(null);

  function selectHelpTile(tile: HelpTile) {
    setService(tile.serviceValue);
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

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
          tagline="A short reply lands in your inbox within one business day. Usually sooner."
        />
      </TileStack>
    );
  }

  return (
    <TileStack>
      {/* Apple-Support style hero: big circular logo + headline */}
      <section
        className="ac-tile ac-tile-light"
        data-ac-theme="light"
        style={{
          padding: "clamp(56px, 7vw, 96px) clamp(24px, 5vw, 56px)",
          textAlign: "center",
        }}
      >
        <div
          aria-hidden="true"
          style={{
            width: 96,
            height: 96,
            margin: "0 auto 24px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle at 30% 30%, #ff6b8a 0%, #e8252a 55%, #c41015 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 10px 30px -8px rgba(232,37,42,0.4)",
          }}
        >
          <svg viewBox="0 0 24 24" width="48" height="48" fill="white">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </div>
        <h1
          style={{
            fontSize: "clamp(36px, 5vw, 56px)",
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
            fontSize: "clamp(18px, 2vw, 22px)",
            color: "#6e6e73",
            margin: 0,
            fontWeight: 400,
          }}
        >
          Need help growing? Start here.
        </p>
      </section>

      {/* Apple-Support style icon grid */}
      <section
        className="ac-tile ac-tile-light"
        data-ac-theme="light"
        style={{ padding: "clamp(40px, 5vw, 72px) clamp(24px, 5vw, 56px)" }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
            gap: "clamp(16px, 2vw, 28px)",
            maxWidth: 1080,
            margin: "0 auto",
          }}
        >
          {HELP_TILES.map((tile) => {
            const isActive = service === tile.serviceValue && tile.serviceValue !== "";
            return (
              <button
                key={tile.key}
                type="button"
                onClick={() => selectHelpTile(tile)}
                className="ac-help-tile"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 14,
                  padding: "28px 16px",
                  background: isActive ? "#f5f5f7" : "transparent",
                  border: "1px solid #d2d2d7",
                  borderRadius: 18,
                  cursor: "pointer",
                  transition: "all 200ms ease",
                  minHeight: 140,
                  color: "#1d1d1f",
                  fontFamily: "inherit",
                }}
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
                <div style={{ width: 48, height: 48, color: "#0071e3" }}>
                  {tile.icon}
                </div>
                <span style={{ fontSize: 14, fontWeight: 500, textAlign: "center" }}>
                  {tile.label}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Original "Say hello" intro */}
      <Tile
        theme="light"
        variant="A"
        eyebrow="Or message us directly"
        headline="Say hello."
        tagline="Fifteen minutes. A real person. A direct answer."
      />

      {/* Original form (preserved) */}
      <section
        className="ac-tile ac-tile-light"
        data-ac-theme="light"
        style={{ padding: "clamp(32px, 5vw, 72px)" }}
      >
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="w-full max-w-2xl mx-auto flex flex-col gap-5 text-left"
        >
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
          {/* Honeypot — must remain empty */}
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
      </section>
    </TileStack>
  );
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

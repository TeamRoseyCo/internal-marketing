"use client";

import { useState, useRef } from "react";
import { Tile, TileStack, BlogAndNewsletterFun } from "@/components/apple";
import { LocaleCode, isValidLocale } from "@/lib/locales";

/**
 * Cursor-follow glow: a soft radial gradient pinned to the mouse position.
 * Inspired by Vercel/Linear-style border-glow effect.
 */
function useCursorGlow() {
  const ref = useRef<HTMLDivElement | null>(null);
  function onMouseMove(e: React.MouseEvent<HTMLElement>) {
    const el = ref.current ?? (e.currentTarget as HTMLDivElement);
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    el.style.setProperty("--mx", `${x}px`);
    el.style.setProperty("--my", `${y}px`);
    el.style.setProperty("--glow-opacity", "1");
  }
  function onMouseLeave(e: React.MouseEvent<HTMLElement>) {
    (ref.current ?? (e.currentTarget as HTMLDivElement)).style.setProperty("--glow-opacity", "0");
  }
  return { ref, onMouseMove, onMouseLeave };
}

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
  const formGlow = useCursorGlow();

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
        style={{ padding: "clamp(36px, 5vw, 64px) clamp(24px, 5vw, 56px)" }}
      >
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          {/* 2-column: copy + cards on the LEFT, form on the RIGHT.
              Tightened padding/margins so the whole block fits the viewport. */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1.05fr)",
              gap: "clamp(32px, 4vw, 56px)",
              alignItems: "start",
            }}
            className="contact-grid"
          >
            {/* LEFT column: copy + reassurance + 2x2 contact-card grid */}
            <aside style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              <h1
                style={{
                  fontSize: "clamp(30px, 3.6vw, 44px)",
                  fontWeight: 600,
                  letterSpacing: "-0.015em",
                  margin: 0,
                  color: "#1d1d1f",
                  lineHeight: 1.08,
                }}
              >
                Let's grow your business.
              </h1>
              <p
                style={{
                  fontSize: "clamp(15px, 1.4vw, 17px)",
                  color: "#3a3a3c",
                  margin: 0,
                  lineHeight: 1.5,
                }}
              >
                Tell us where you are and where you want to go. On the call we'll walk you through
                what's working in your market, where the easy wins are, and exactly how we'd grow
                your numbers — no pressure, no pitch deck.
              </p>

              {/* Cards UNDER the copy — stacked vertically, centered */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 12,
                  marginTop: 8,
                  width: "100%",
                  maxWidth: 380,
                  alignSelf: "center",
                }}
                className="contact-cards-grid"
              >
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
              </div>
            </aside>

            {/* RIGHT column: form (with cursor-follow glow) */}
            <div
              ref={formGlow.ref}
              onMouseMove={formGlow.onMouseMove}
              onMouseLeave={formGlow.onMouseLeave}
              className="contact-glow-card"
            >
              <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-4 text-left relative z-10"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <Field name="firstName" label="First Name" required />
                  <Field name="lastName" label="Last Name" required />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <Field name="email" label="Email Address" type="email" required />
                  <Field name="phone" label="Phone Number" type="tel" optional />
                </div>
                <Field name="companyWebsite" label="Company Website" type="url" optional />
                <div>
                  <label className="text-[13px] font-medium text-[#1d1d1f]" htmlFor="service">
                    Service Interested In <span style={{ color: "#c62828" }}>*</span>
                  </label>
                  <div style={{ position: "relative", marginTop: 6 }}>
                    <select
                      id="service"
                      required
                      value={service}
                      onChange={(e) => setService(e.target.value)}
                      className="w-full appearance-none rounded-[14px] border border-[#d2d2d7] bg-[#fbfbfd] px-4 py-3 pr-10 text-[15px] text-[#1d1d1f] outline-none focus:border-[#0071e3] focus:ring-4 focus:ring-[#0071e3]/15 transition"
                    >
                      <option value="">Choose a service</option>
                      {SERVICES.map((s) => (
                        <option key={s.value} value={s.value}>
                          {s.label}
                        </option>
                      ))}
                    </select>
                    <svg
                      style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}
                      width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6e6e73" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                    >
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </div>
                </div>
                <div>
                  <label className="text-[13px] font-medium text-[#1d1d1f]" htmlFor="message">
                    Tell us about your goals <span style={{ color: "#c62828" }}>*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={3}
                    required
                    placeholder="What are you trying to grow? What's blocking you?"
                    className="mt-2 w-full rounded-[14px] border border-[#d2d2d7] bg-[#fbfbfd] px-4 py-3 text-[15px] text-[#1d1d1f] placeholder:text-[#86868b] outline-none focus:border-[#0071e3] focus:ring-4 focus:ring-[#0071e3]/15 transition resize-y"
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

                {error && (
                  <div
                    className="text-[14px]"
                    style={{
                      color: "#c62828",
                      background: "#fdecec",
                      border: "1px solid #f5b9bc",
                      borderRadius: 12,
                      padding: "10px 14px",
                    }}
                  >
                    {error}
                  </div>
                )}

                <div className="flex flex-col gap-2 mt-1">
                  <button
                    type="submit"
                    disabled={submitting}
                    style={{
                      padding: "13px 28px",
                      fontSize: "15px",
                      fontWeight: 600,
                      color: "#fff",
                      background: submitting ? "#7ab2ee" : "#0071e3",
                      border: 0,
                      borderRadius: 999,
                      cursor: submitting ? "default" : "pointer",
                      boxShadow: "0 8px 20px -8px rgba(0,113,227,0.5)",
                      transition: "all 200ms ease",
                      alignSelf: "flex-start",
                    }}
                    onMouseEnter={(e) => {
                      if (submitting) return;
                      e.currentTarget.style.background = "#0077ed";
                      e.currentTarget.style.transform = "translateY(-1px)";
                      e.currentTarget.style.boxShadow = "0 12px 28px -8px rgba(0,113,227,0.55)";
                    }}
                    onMouseLeave={(e) => {
                      if (submitting) return;
                      e.currentTarget.style.background = "#0071e3";
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow = "0 8px 20px -8px rgba(0,113,227,0.5)";
                    }}
                  >
                    {submitting ? "Sending…" : "Book Your Free Strategy Call"}
                  </button>
                  <p className="text-[12px] text-[#6e6e73]">
                    By submitting, you agree to our{" "}
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
            </div>
          </div>
        </div>

        {/* Cursor-glow + responsive stacking */}
        <style jsx>{`
          @media (max-width: 900px) {
            :global(.contact-grid) {
              grid-template-columns: 1fr !important;
            }
          }
          :global(.contact-glow-card) {
            position: relative;
            background: #ffffff;
            border-radius: 22px;
            padding: clamp(20px, 2.5vw, 32px);
            box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04),
              0 12px 32px -16px rgba(0, 0, 0, 0.12);
            --mx: 50%;
            --my: 0%;
            --glow-opacity: 0;
          }
          @media (max-width: 560px) {
            :global(.contact-cards-grid) {
              grid-template-columns: 1fr !important;
            }
          }
          /* Glowing border ring (sits behind the card content) */
          :global(.contact-glow-card)::before {
            content: "";
            position: absolute;
            inset: 0;
            border-radius: 22px;
            padding: 1px;
            background: radial-gradient(
              260px circle at var(--mx) var(--my),
              rgba(0, 113, 227, 0.85),
              rgba(0, 113, 227, 0) 70%
            );
            -webkit-mask:
              linear-gradient(#000 0 0) content-box,
              linear-gradient(#000 0 0);
            -webkit-mask-composite: xor;
                    mask-composite: exclude;
            opacity: var(--glow-opacity);
            transition: opacity 250ms ease;
            pointer-events: none;
          }
          /* Soft inner glow to lift the card on hover */
          :global(.contact-glow-card)::after {
            content: "";
            position: absolute;
            inset: 0;
            border-radius: 22px;
            background: radial-gradient(
              360px circle at var(--mx) var(--my),
              rgba(0, 113, 227, 0.06),
              transparent 65%
            );
            opacity: var(--glow-opacity);
            transition: opacity 250ms ease;
            pointer-events: none;
          }
          /* Same effect for contact detail cards */
          :global(.glow-card) {
            position: relative;
            --mx: 50%;
            --my: 0%;
            --glow-opacity: 0;
          }
          :global(.glow-card)::before {
            content: "";
            position: absolute;
            inset: 0;
            border-radius: 18px;
            padding: 1px;
            background: radial-gradient(
              200px circle at var(--mx) var(--my),
              rgba(0, 113, 227, 0.85),
              rgba(0, 113, 227, 0) 70%
            );
            -webkit-mask:
              linear-gradient(#000 0 0) content-box,
              linear-gradient(#000 0 0);
            -webkit-mask-composite: xor;
                    mask-composite: exclude;
            opacity: var(--glow-opacity);
            transition: opacity 250ms ease;
            pointer-events: none;
          }
        `}</style>
      </section>

      {/* Bottom strip: blog teaser + newsletter envelope (shared across the site) */}
      <BlogAndNewsletterFun prefix={`/${safe}`} />
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
      <div
        style={{
          width: 42,
          height: 42,
          flexShrink: 0,
          borderRadius: 12,
          background: "rgba(0,113,227,0.08)",
          color: "#0071e3",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div style={{ width: 20, height: 20 }}>{icon}</div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", minWidth: 0 }}>
        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#6e6e73" }}>
          {label}
        </div>
        <div style={{ fontSize: 15, fontWeight: 600, color: "#1d1d1f", wordBreak: "break-word", lineHeight: 1.3 }}>
          {value}
        </div>
      </div>
    </>
  );
  const baseStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    padding: "18px 20px",
    background: "#fff",
    border: "1px solid #c8c8cd",
    borderRadius: 14,
    transition: "transform 200ms ease, box-shadow 200ms ease",
    textDecoration: "none",
    color: "inherit",
    boxShadow: "0 1px 2px rgba(0,0,0,0.04), 0 4px 12px -6px rgba(0,0,0,0.08)",
  };

  function handleMove(e: React.MouseEvent<HTMLElement>) {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
    el.style.setProperty("--glow-opacity", "1");
    el.style.transform = "translateY(-2px)";
    el.style.boxShadow = "0 12px 28px -12px rgba(0,113,227,0.3)";
  }
  function handleLeave(e: React.MouseEvent<HTMLElement>) {
    const el = e.currentTarget;
    el.style.setProperty("--glow-opacity", "0");
    el.style.transform = "translateY(0)";
    el.style.boxShadow = "none";
  }

  if (href) {
    return (
      <a href={href} className="glow-card" style={baseStyle} onMouseMove={handleMove} onMouseLeave={handleLeave}>
        <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "row", alignItems: "center", gap: 14, width: "100%" }}>
          {inner}
        </div>
      </a>
    );
  }
  return (
    <div className="glow-card" style={baseStyle} onMouseMove={handleMove} onMouseLeave={handleLeave}>
      <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "row", alignItems: "center", gap: 14, width: "100%" }}>
        {inner}
      </div>
    </div>
  );
}

function Field({
  name,
  label,
  type = "text",
  required,
  optional,
  placeholder,
}: {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  optional?: boolean;
  placeholder?: string;
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="flex items-center justify-between text-[13px] font-medium text-[#1d1d1f]"
      >
        <span>
          {label}
          {required && <span style={{ color: "#c62828" }}> *</span>}
        </span>
        {optional && <span className="text-[12px] font-normal text-[#86868b]">Optional</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        autoComplete={type === "email" ? "email" : type === "tel" ? "tel" : "off"}
        className="mt-2 w-full rounded-[14px] border border-[#d2d2d7] bg-[#fbfbfd] px-4 py-3.5 text-[15px] text-[#1d1d1f] placeholder:text-[#86868b] outline-none focus:border-[#0071e3] focus:ring-4 focus:ring-[#0071e3]/15 transition"
      />
    </div>
  );
}

"use client";

import { useState } from "react";
import { Tile, TileStack } from "@/components/apple";
import { LocaleCode, isValidLocale, getLocale } from "@/lib/locales";

interface Props {
  params: { locale: string };
}

const SERVICES = [
  { value: "seo", label: "SEO" },
  { value: "paid-ads", label: "Paid Ads" },
  { value: "social-media", label: "Social Media" },
  { value: "website-design", label: "Website Design" },
  { value: "all", label: "All of the above" },
];

export default function ContactPageClient({ params }: Props) {
  const safe: LocaleCode = isValidLocale(params.locale) ? params.locale : "us";
  const localeConfig = getLocale(safe);

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
      company_website: form.get("company_website") as string,
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
      <Tile
        theme="light"
        variant="A"
        eyebrow="Contact"
        headline="Say hello."
        tagline="Fifteen minutes. A real person. A direct answer."
      />

      <section
        className="ac-tile ac-tile-light"
        data-ac-theme="light"
        style={{ padding: "clamp(32px, 5vw, 72px)" }}
      >
        <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto flex flex-col gap-5 text-left">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field name="firstName" label="First name" required />
            <Field name="lastName" label="Last name" required />
          </div>
          <Field name="email" label="Email" type="email" required />
          <Field name="phone" label="Phone" type="tel" />
          <Field name="website" label="Website" type="url" />
          <div>
            <label className="text-[13px] text-[#6e6e73]" htmlFor="service">
              What can we help with?
            </label>
            <select
              id="service"
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
              Tell us the shape of the problem
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
            name="company_website"
            tabIndex={-1}
            autoComplete="off"
            style={{ position: "absolute", left: "-9999px" }}
            aria-hidden="true"
          />
          {error && <div className="text-[14px]" style={{ color: "#c62828" }}>{error}</div>}
          <div className="flex items-center gap-4">
            <button
              type="submit"
              disabled={submitting}
              className="ac-pill"
              style={{ padding: "12px 24px", fontSize: "16px", opacity: submitting ? 0.6 : 1 }}
            >
              {submitting ? "Sending" : "Send message"}
            </button>
            <div className="ac-caption">
              Usually replied to within one business day from {localeConfig.country}.
            </div>
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

// src/components/chatbot/dify-chatbot.tsx
// Dify "Rose" AI chatbot embed — self-hosted at dify.elevateoco.com
// Must be a client component (useLocale hook) and placed in body, not <head>.
// baseUrl points to self-hosted instance so the nginx watermark-removal fix applies.
"use client";

import Script from "next/script";
import { useLocale } from "@/lib/i18n";

const DIFY_BASE_URL = "https://dify.elevateoco.com";

export function DifyChatbot() {
  const locale = useLocale();
  const token = (process.env.NEXT_PUBLIC_DIFY_CHATBOT_TOKEN ?? "")
    .replace(/\n/g, "")
    .trim();

  if (!token) return null;

  return (
    <>
      <Script id="dify-chatbot-config" strategy="lazyOnload">
        {`window.difyChatbotConfig = { token: '${token}', baseUrl: '${DIFY_BASE_URL}', inputs: { locale: '${locale}' } };`}
      </Script>
      <Script
        src={`${DIFY_BASE_URL}/embed.min.js`}
        id={token}
        strategy="lazyOnload"
      />
    </>
  );
}

// src/components/chatbot/dify-chatbot.tsx
// Dify "Rose" AI chatbot embed — self-hosted at dify.elevateoco.com
// Uses useEffect to guarantee config is set before embed script loads.
// baseUrl points to self-hosted instance so the nginx watermark-removal fix applies.
"use client";

import { useEffect } from "react";
import { useLocale } from "@/lib/i18n";

const DIFY_BASE_URL = "https://dify.elevateoco.com";
const DIFY_TOKEN = "7r6B6xLc0HHyhvc5";

export function DifyChatbot() {
  const locale = useLocale();

  useEffect(() => {
    if (!DIFY_TOKEN) return;

    // Set config synchronously before loading the script
    (window as any).difyChatbotConfig = {
      token: DIFY_TOKEN,
      baseUrl: DIFY_BASE_URL,
      inputs: { locale },
    };

    // Load embed script
    const script = document.createElement("script");
    script.src = `${DIFY_BASE_URL}/embed.min.js`;
    script.id = DIFY_TOKEN;
    script.async = true;
    document.body.appendChild(script);

    return () => {
      script.remove();
      delete (window as any).difyChatbotConfig;
      // Clean up the chatbot DOM elements
      document.getElementById("dify-chatbot-bubble-button")?.remove();
      document.getElementById("dify-chatbot-bubble-window")?.remove();
    };
  }, [locale]);

  return null;
}

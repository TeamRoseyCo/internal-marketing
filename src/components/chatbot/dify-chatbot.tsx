// src/components/chatbot/dify-chatbot.tsx
// Dify "Rose" AI chatbot embed — self-hosted at dify.elevateoco.com
// Uses useEffect to guarantee config is set before embed script loads.
// baseUrl points to self-hosted instance so the nginx watermark-removal fix applies.
"use client";

import { useEffect } from "react";
import { useLocale } from "@/lib/i18n";

const DIFY_BASE_URL = "https://dify.elevateoco.com";
const DIFY_TOKEN = "U2LCUJitw1J3ktjA";

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

    // Lenis smooth scroll intercepts wheel events on the whole page. Add
    // data-lenis-prevent to the chatbot elements once they appear so Lenis
    // ignores wheel events over them. Watch the DOM because embed.min.js
    // creates the elements asynchronously.
    const tagLenisPrevent = () => {
      const bubbleWindow = document.getElementById("dify-chatbot-bubble-window");
      const bubbleButton = document.getElementById("dify-chatbot-bubble-button");
      if (bubbleWindow && !bubbleWindow.hasAttribute("data-lenis-prevent")) {
        bubbleWindow.setAttribute("data-lenis-prevent", "");
      }
      if (bubbleButton && !bubbleButton.hasAttribute("data-lenis-prevent")) {
        bubbleButton.setAttribute("data-lenis-prevent", "");
      }
    };
    const observer = new MutationObserver(tagLenisPrevent);
    observer.observe(document.body, { childList: true, subtree: true });
    tagLenisPrevent();

    return () => {
      observer.disconnect();
      script.remove();
      delete (window as any).difyChatbotConfig;
      // Clean up the chatbot DOM elements
      document.getElementById("dify-chatbot-bubble-button")?.remove();
      document.getElementById("dify-chatbot-bubble-window")?.remove();
    };
  }, [locale]);

  // Dify's embed.min.js sets the iframe to position:absolute, which makes it
  // stick to document coordinates instead of the viewport. Force position:fixed
  // so it stays pinned to the viewport next to the bubble button.
  // overscroll-behavior:contain prevents scroll chaining from the iframe to
  // the parent page when the user reaches the top/bottom of the chat content.
  return (
    <style>{`
      #dify-chatbot-bubble-window {
        position: fixed !important;
        overscroll-behavior: contain !important;
      }
      #dify-chatbot-bubble-window iframe {
        overscroll-behavior: contain !important;
      }
    `}</style>
  );
}

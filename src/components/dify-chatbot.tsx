// src/components/dify-chatbot.tsx
// Dify AI chatbot embed - loads on every page via locale layout
// Passes current locale so the bot can respond in the right language
"use client";

import Script from "next/script";
import { useLocale } from "@/lib/i18n";

const DIFY_TOKEN = "7r6B6xLc0HHyhvc5";
const DIFY_BASE_URL = "https://dify.elevateoco.com";

export function DifyChatbot() {
  const locale = useLocale();

  return (
    <>
      <Script id="dify-chatbot-config" strategy="lazyOnload">
        {`
          window.difyChatbotConfig = {
            token: '${DIFY_TOKEN}',
            baseUrl: '${DIFY_BASE_URL}',
            inputs: {
              locale: '${locale}',
            },
            systemVariables: {},
            userVariables: {},
          }
        `}
      </Script>
      <Script
        src={`${DIFY_BASE_URL}/embed.min.js`}
        id={DIFY_TOKEN}
        strategy="lazyOnload"
      />
      <style jsx global>{`
        #dify-chatbot-bubble-button {
          background-color: hsl(0 75% 50%) !important;
        }
        #dify-chatbot-bubble-window {
          width: 24rem !important;
          height: 40rem !important;
        }
      `}</style>
    </>
  );
}

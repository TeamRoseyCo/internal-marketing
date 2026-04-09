// src/components/chatbot/dify-chatbot.tsx
// Dify "Rose" AI chatbot embed — self-hosted at dify.elevateoco.com
// baseUrl must point to the self-hosted instance so the nginx watermark-removal fix applies.

import Script from "next/script";

const DIFY_BASE_URL = "https://dify.elevateoco.com";

export function DifyChatbot() {
  const token = process.env.NEXT_PUBLIC_DIFY_CHATBOT_TOKEN;

  if (!token) return null;

  return (
    <>
      <Script id="dify-chatbot-config" strategy="lazyOnload">
        {`window.difyChatbotConfig = { token: '${token}', baseUrl: '${DIFY_BASE_URL}' };`}
      </Script>
      <Script
        src={`${DIFY_BASE_URL}/embed.min.js`}
        id="dify-chatbot-embed"
        strategy="lazyOnload"
        defer
      />
    </>
  );
}

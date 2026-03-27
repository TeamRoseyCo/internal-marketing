// src/components/analytics/google-analytics.tsx
// Google Analytics 4 tracking via Partytown web worker

export function GoogleAnalytics() {
  const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

  if (!GA_ID) {
    return null;
  }

  return (
    <>
      <script
        type="text/partytown"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
      />
      <script
        type="text/partytown"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_ID}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
    </>
  );
}

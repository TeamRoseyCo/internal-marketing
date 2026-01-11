"use client";

import { useState, useEffect } from "react";
import { Globe, Languages } from "lucide-react";
import { motion } from "framer-motion";
import { LocaleCode } from "@/lib/locales";

interface TranslateButtonProps {
  locale: LocaleCode;
  slug: string;
}

// Translation labels for non-English locales
const translateLabels: Record<string, { button: string; translating: string; original: string; notice: string }> = {
  nl: {
    button: "Vertaal naar Nederlands",
    translating: "Vertalen...",
    original: "Toon origineel (Engels)",
    notice: "Vertaald met Google Translate",
  },
  dk: {
    button: "Oversæt til dansk",
    translating: "Oversætter...",
    original: "Vis original (engelsk)",
    notice: "Oversat med Google Translate",
  },
};

export function TranslateButton({ locale, slug }: TranslateButtonProps) {
  const [isTranslated, setIsTranslated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Only show for Dutch and Danish locales
  if (!["nl", "dk"].includes(locale)) {
    return null;
  }

  const labels = translateLabels[locale];
  if (!labels) return null;

  const targetLang = locale === "nl" ? "nl" : "da";

  const handleTranslate = () => {
    if (isTranslated) {
      // Remove translation - reload the page
      window.location.reload();
      return;
    }

    setIsLoading(true);

    // Use Google Translate widget approach - inject the translate script
    const script = document.createElement("script");
    script.src = `https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit`;
    script.async = true;

    // Define the callback
    (window as any).googleTranslateElementInit = () => {
      new (window as any).google.translate.TranslateElement(
        {
          pageLanguage: "en",
          includedLanguages: targetLang,
          autoDisplay: false,
        },
        "google_translate_element"
      );

      // Auto-trigger translation after a short delay
      setTimeout(() => {
        const select = document.querySelector(".goog-te-combo") as HTMLSelectElement;
        if (select) {
          select.value = targetLang;
          select.dispatchEvent(new Event("change"));
          setIsTranslated(true);
        }
        setIsLoading(false);
      }, 1000);
    };

    document.body.appendChild(script);
  };

  return (
    <div className="flex items-center gap-3">
      {/* Hidden Google Translate element */}
      <div id="google_translate_element" className="hidden" />

      <motion.button
        onClick={handleTranslate}
        disabled={isLoading}
        className={`inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-all ${
          isTranslated
            ? "bg-brand-green/10 text-brand-green border border-brand-green/20 hover:bg-brand-green/20"
            : "bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20"
        } ${isLoading ? "opacity-70 cursor-wait" : ""}`}
        whileHover={{ scale: isLoading ? 1 : 1.02 }}
        whileTap={{ scale: isLoading ? 1 : 0.98 }}
      >
        {isLoading ? (
          <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
        ) : (
          <Languages className="w-4 h-4" />
        )}
        {isLoading ? labels.translating : isTranslated ? labels.original : labels.button}
      </motion.button>

      {isTranslated && (
        <span className="text-xs text-muted-foreground flex items-center gap-1">
          <Globe className="w-3 h-3" />
          {labels.notice}
        </span>
      )}
    </div>
  );
}

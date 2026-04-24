"use client";

import { useState } from "react";

export interface FAQItem {
  q: string;
  a: string;
}

export function FAQ({ items }: { items: FAQItem[] }) {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <ul className="w-full max-w-3xl mx-auto divide-y divide-[#d2d2d7] border-t border-b border-[#d2d2d7]">
      {items.map((it, i) => {
        const active = open === i;
        return (
          <li key={it.q}>
            <button
              type="button"
              onClick={() => setOpen(active ? null : i)}
              aria-expanded={active}
              className="w-full flex items-center justify-between gap-4 py-5 text-left text-[18px] font-medium text-[#1d1d1f] hover:text-[#0071e3] transition-colors"
            >
              <span>{it.q}</span>
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
                style={{
                  transform: active ? "rotate(45deg)" : "rotate(0)",
                  transition: "transform 260ms cubic-bezier(0.33, 1, 0.68, 1)",
                }}
              >
                <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
            <div className="ac-faq-item" data-open={active ? "1" : "0"}>
              <div>
                <div className="ac-faq-inner pb-6 text-[16px] leading-relaxed text-[#3a3a3c]">
                  {it.a}
                </div>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

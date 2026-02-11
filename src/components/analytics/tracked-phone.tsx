"use client";

// src/components/analytics/tracked-phone.tsx
// Phone link component with GA4 click tracking
// RELEVANT FILES: src/lib/analytics.ts

import { trackPhoneClick } from "@/lib/analytics";

interface TrackedPhoneProps {
  number: string;
  displayText?: string;
  location?: string;
  source?: string;
  className?: string;
  children?: React.ReactNode;
}

/**
 * Phone link component with GA4 event tracking
 * Tracks phone call clicks with location and source context
 */
export function TrackedPhone({
  number,
  displayText,
  location = "Belfast",
  source = "unknown",
  className,
  children,
}: TrackedPhoneProps) {
  const handleClick = () => {
    trackPhoneClick(number, location, source);
  };

  // Strip spaces for tel: href
  const telHref = `tel:${number.replace(/\s/g, '')}`;

  // Display priority: children > displayText > number
  const display = children || displayText || number;

  return (
    <a href={telHref} onClick={handleClick} className={className}>
      {display}
    </a>
  );
}

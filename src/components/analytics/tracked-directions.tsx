"use client";

// src/components/analytics/tracked-directions.tsx
// Directions button component with GA4 click tracking
// RELEVANT FILES: src/lib/analytics.ts

import { trackDirectionRequest } from "@/lib/analytics";

interface TrackedDirectionsProps {
  address: string;
  businessName?: string;
  className?: string;
  children?: React.ReactNode;
}

/**
 * Directions button component with GA4 event tracking
 * Opens Google Maps directions in new tab after tracking event
 */
export function TrackedDirections({
  address,
  businessName = "Rosey Co. Belfast",
  className,
  children,
}: TrackedDirectionsProps) {
  const handleClick = () => {
    // Track the event
    trackDirectionRequest(address, businessName);

    // Open Google Maps directions
    const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}`;
    window.open(mapsUrl, '_blank');
  };

  return (
    <button onClick={handleClick} className={className}>
      {children || 'Get Directions'}
    </button>
  );
}

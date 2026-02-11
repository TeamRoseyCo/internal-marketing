// src/lib/analytics.ts
// GA4 event tracking utility functions
// Provides type-safe event tracking for conversions and user interactions

/**
 * Base event tracking function
 * Safely calls window.gtag with guard checks
 * No-ops gracefully when GA4 is not configured
 */
export function trackEvent(
  eventName: string,
  params?: Record<string, unknown>
): void {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, params);
  }
}

/**
 * Track phone call clicks
 * Fires GA4 phone_call_click event with location and source context
 */
export function trackPhoneClick(
  phoneNumber: string,
  location: string,
  source: string
): void {
  trackEvent('phone_call_click', {
    phone_number: phoneNumber,
    location,
    click_source: source,
    page_path: typeof window !== 'undefined' ? window.location.pathname : '',
  });
}

/**
 * Track form submissions
 * Fires GA4 form_submission event with form type, service, and locale
 */
export function trackFormSubmission(
  formType: string,
  service: string,
  locale: string
): void {
  trackEvent('form_submission', {
    form_type: formType,
    service_selected: service,
    locale,
    page_path: typeof window !== 'undefined' ? window.location.pathname : '',
  });
}

/**
 * Track direction requests
 * Fires GA4 direction_request event with business details
 */
export function trackDirectionRequest(
  address: string,
  businessName: string
): void {
  trackEvent('direction_request', {
    business_name: businessName,
    business_address: address,
    location: 'Belfast',
    page_path: typeof window !== 'undefined' ? window.location.pathname : '',
  });
}

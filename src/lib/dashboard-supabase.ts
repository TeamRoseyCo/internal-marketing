// src/lib/dashboard-supabase.ts
// Read-only Supabase client for the Analytics Dashboard database
// Used to fetch case study content for the public case studies page

import { createClient } from '@supabase/supabase-js';

const dashboardUrl = process.env.DASHBOARD_SUPABASE_URL;
const dashboardKey = process.env.DASHBOARD_SUPABASE_ANON_KEY;

export function getDashboardClient() {
  if (!dashboardUrl || !dashboardKey) {
    throw new Error('DASHBOARD_SUPABASE_URL and DASHBOARD_SUPABASE_ANON_KEY must be set');
  }
  return createClient(dashboardUrl, dashboardKey);
}

export interface CaseStudy {
  client_name: string;
  client_slug: string;
  client_domain: string;
  challenge: string | null;
  approach: string | null;
  services: string[];
  highlights: string[];
  testimonial: string | null;
  testimonial_by: string | null;
  industry_context: string | null;
}

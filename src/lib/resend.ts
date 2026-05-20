// src/lib/resend.ts
// Resend email client for transactional emails
// Used for lead notifications, guide delivery, and other email communications

import { Resend } from 'resend';

const resendApiKey = process.env.RESEND_API_KEY;

export const resend = resendApiKey ? new Resend(resendApiKey) : null;

// Default sender email (must be verified in Resend)
export const FROM_EMAIL = 'Rosey Co <team@roseyco.com>';

// Admin notification email
export const ADMIN_EMAIL = 'team@roseyco.com';

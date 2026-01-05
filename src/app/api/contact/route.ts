// src/app/api/contact/route.ts
// API route for contact form submissions
// Saves lead to Supabase and sends email notification via Resend

import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase';
import { resend, FROM_EMAIL, ADMIN_EMAIL } from '@/lib/resend';

// Lead data structure
interface LeadData {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  website?: string;
  service: string;
  message: string;
}

export async function POST(request: NextRequest) {
  try {
    const data: LeadData = await request.json();

    // Validate required fields
    if (!data.firstName || !data.lastName || !data.email || !data.service || !data.message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    // Save to Supabase
    const supabase = createServerClient();
    const { error: dbError } = await supabase
      .from('leads')
      .insert({
        first_name: data.firstName,
        last_name: data.lastName,
        email: data.email,
        phone: data.phone || null,
        website: data.website || null,
        service_interest: data.service,
        message: data.message,
        source: 'contact_form',
        created_at: new Date().toISOString(),
      });

    if (dbError) {
      console.error('Supabase error:', dbError);
      // Continue even if DB fails - we still want to try sending email
    }

    // Send email notification to admin
    if (resend) {
      try {
        await resend.emails.send({
          from: FROM_EMAIL,
          to: ADMIN_EMAIL,
          subject: `New Lead: ${data.firstName} ${data.lastName} - ${data.service}`,
          html: `
            <h2>New Contact Form Submission</h2>
            <p><strong>Name:</strong> ${data.firstName} ${data.lastName}</p>
            <p><strong>Email:</strong> ${data.email}</p>
            <p><strong>Phone:</strong> ${data.phone || 'Not provided'}</p>
            <p><strong>Website:</strong> ${data.website || 'Not provided'}</p>
            <p><strong>Service Interest:</strong> ${data.service}</p>
            <h3>Message:</h3>
            <p>${data.message.replace(/\n/g, '<br>')}</p>
            <hr>
            <p><small>This lead was submitted via the Rosey Co website contact form.</small></p>
          `,
        });
      } catch (emailError) {
        console.error('Resend error:', emailError);
        // Continue even if email fails - lead is saved
      }

      // Send confirmation email to the lead
      try {
        await resend.emails.send({
          from: FROM_EMAIL,
          to: data.email,
          subject: "Thanks for reaching out to Rosey Co!",
          html: `
            <h2>Hi ${data.firstName},</h2>
            <p>Thanks for getting in touch with Rosey Co! We've received your message and will get back to you within 24 hours.</p>
            <p>In the meantime, here's a quick summary of what you shared:</p>
            <ul>
              <li><strong>Service interested in:</strong> ${data.service}</li>
              <li><strong>Your message:</strong> ${data.message}</li>
            </ul>
            <p>We're excited to learn more about your business and how we can help you grow!</p>
            <p>Best regards,<br>The Rosey Co Team</p>
            <hr>
            <p><small>If you didn't submit this form, please ignore this email.</small></p>
          `,
        });
      } catch (emailError) {
        console.error('Confirmation email error:', emailError);
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Failed to submit form' },
      { status: 500 }
    );
  }
}

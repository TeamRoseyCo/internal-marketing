import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface AdminNotificationRequest {
  formType: 'book_call' | 'affiliate_application' | 'free_guide' | 'newsletter';
  data: Record<string, any>;
  submissionTime?: string;
}

const handler = async (req: Request): Promise<Response> => {
  console.log("Admin form notification function called");

  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { formType, data, submissionTime }: AdminNotificationRequest = await req.json();
    console.log(`Processing ${formType} notification for admin`);

    const adminEmail = "team@roseyco.com";
    const currentTime = submissionTime || new Date().toLocaleString('en-AU', { 
      timeZone: 'Australia/Sydney',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });

    let subject = "";
    let htmlContent = "";

    switch (formType) {
      case 'book_call':
        subject = `🚀 New Strategy Call Booking - ${data.full_name}`;
        htmlContent = `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <h1 style="color: #333; border-bottom: 2px solid #007bff; padding-bottom: 10px;">
              🚀 New Strategy Call Booking
            </h1>
            
            <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h2 style="color: #333; margin-top: 0;">Contact Details</h2>
              <p><strong>Name:</strong> ${data.full_name}</p>
              <p><strong>Email:</strong> <a href="mailto:${data.email}">${data.email}</a></p>
              <p><strong>Phone:</strong> <a href="tel:${data.phone}">${data.phone}</a></p>
              <p><strong>Company:</strong> ${data.company}</p>
              ${data.website ? `<p><strong>Website:</strong> <a href="${data.website}" target="_blank">${data.website}</a></p>` : ''}
            </div>

            <div style="background-color: #e7f3ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h2 style="color: #333; margin-top: 0;">Business Information</h2>
              <p><strong>Current Ad Spend:</strong> ${data.consequence}</p>
              ${data.bookingDateTime ? `<p><strong>Preferred Time:</strong> ${data.bookingDateTime}</p>` : ''}
              ${data.referralCode ? `<p><strong>Referral Code:</strong> ${data.referralCode}</p>` : ''}
            </div>

            <div style="background-color: #f0f0f0; padding: 15px; border-radius: 8px; margin: 20px 0;">
              <p style="margin: 0; color: #666;">
                <strong>Submitted:</strong> ${currentTime}<br>
                <strong>Source:</strong> ${data.source || 'Direct'}
              </p>
            </div>

            <div style="text-align: center; margin: 30px 0;">
              <a href="mailto:${data.email}" style="background-color: #007bff; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; display: inline-block; font-weight: bold;">
                Reply to ${data.full_name} →
              </a>
            </div>
          </div>
        `;
        break;

      case 'affiliate_application':
        subject = `💼 New Affiliate Application - ${data.full_name}`;
        htmlContent = `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <h1 style="color: #333; border-bottom: 2px solid #28a745; padding-bottom: 10px;">
              💼 New Affiliate Application
            </h1>
            
            <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h2 style="color: #333; margin-top: 0;">Applicant Details</h2>
              <p><strong>Name:</strong> ${data.full_name}</p>
              <p><strong>Email:</strong> <a href="mailto:${data.email}">${data.email}</a></p>
              ${data.phone ? `<p><strong>Phone:</strong> <a href="tel:${data.phone}">${data.phone}</a></p>` : ''}
              <p><strong>Affiliate Code:</strong> <code style="background: #e9ecef; padding: 2px 6px; border-radius: 3px;">${data.affiliate_code}</code></p>
            </div>

            <div style="background-color: #f0f0f0; padding: 15px; border-radius: 8px; margin: 20px 0;">
              <p style="margin: 0; color: #666;">
                <strong>Submitted:</strong> ${currentTime}<br>
                <strong>Status:</strong> Pending Approval
              </p>
            </div>

            <div style="text-align: center; margin: 30px 0;">
              <a href="https://yxzdmacnfdswdxlgwjzi.supabase.co/admin" style="background-color: #28a745; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; display: inline-block; font-weight: bold;">
                Review Application →
              </a>
            </div>
          </div>
        `;
        break;

      case 'free_guide':
        subject = `📚 New Free Guide Download - ${data.full_name}`;
        htmlContent = `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <h1 style="color: #333; border-bottom: 2px solid #6f42c1; padding-bottom: 10px;">
              📚 New Free Guide Download
            </h1>
            
            <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h2 style="color: #333; margin-top: 0;">Download Details</h2>
              <p><strong>Name:</strong> ${data.full_name}</p>
              <p><strong>Email:</strong> <a href="mailto:${data.email}">${data.email}</a></p>
              ${data.company ? `<p><strong>Company:</strong> ${data.company}</p>` : ''}
            </div>

            <div style="background-color: #f0f0f0; padding: 15px; border-radius: 8px; margin: 20px 0;">
              <p style="margin: 0; color: #666;">
                <strong>Downloaded:</strong> ${currentTime}<br>
                <strong>Guide:</strong> Why Meta Ads Are The Greatest
              </p>
            </div>

            <div style="text-align: center; margin: 30px 0;">
              <a href="mailto:${data.email}" style="background-color: #6f42c1; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; display: inline-block; font-weight: bold;">
                Follow Up with ${data.full_name} →
              </a>
            </div>
          </div>
        `;
        break;

      case 'newsletter':
        subject = `📧 New Newsletter Subscription - ${data.first_name}`;
        htmlContent = `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <h1 style="color: #333; border-bottom: 2px solid #fd7e14; padding-bottom: 10px;">
              📧 New Newsletter Subscription
            </h1>
            
            <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h2 style="color: #333; margin-top: 0;">Subscriber Details</h2>
              <p><strong>Name:</strong> ${data.first_name}</p>
              <p><strong>Email:</strong> <a href="mailto:${data.email}">${data.email}</a></p>
            </div>

            <div style="background-color: #f0f0f0; padding: 15px; border-radius: 8px; margin: 20px 0;">
              <p style="margin: 0; color: #666;">
                <strong>Subscribed:</strong> ${currentTime}<br>
                <strong>List:</strong> ROI-Driven Marketing Newsletter
              </p>
            </div>

            <div style="text-align: center; margin: 30px 0;">
              <p style="color: #666; margin: 0;">
                This subscriber will receive weekly marketing tips and updates.
              </p>
            </div>
          </div>
        `;
        break;

      default:
        throw new Error(`Unknown form type: ${formType}`);
    }

    const emailResponse = await resend.emails.send({
      from: "Rosey Co Notifications <noreply@roseyco.com>",
      to: [adminEmail],
      subject: subject,
      html: htmlContent,
    });

    if (emailResponse?.error) {
      console.error("Resend error (admin-notification):", emailResponse.error);
      return new Response(JSON.stringify({ success: false, error: emailResponse.error.message }), {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    console.log(`Admin notification sent for ${formType}:`, emailResponse.data);

    return new Response(JSON.stringify({ success: true, emailId: emailResponse.data?.id }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in notify-admin-form function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
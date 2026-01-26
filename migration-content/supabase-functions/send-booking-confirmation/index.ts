import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface BookingRecord {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  company: string;
  website?: string;
  consequence: string;
  created_at: string;
}

interface BookingConfirmationRequest {
  record: BookingRecord;
}

const handler = async (req: Request): Promise<Response> => {
  console.log("Booking confirmation email function called");

  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { record }: BookingConfirmationRequest = await req.json();
    console.log("Processing booking confirmation email for:", record.email);

    const calendlyLink = "https://calendly.com/brady-flowryse/strategy-meeting";

    const emailResponse = await resend.emails.send({
      from: "Rosey Co <noreply@roseyco.com>",
      to: [record.email],
      subject: "Your Free Strategy Call is Almost Booked! 🚀",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1 style="color: #333; text-align: center;">Thanks for Booking Your Strategy Call!</h1>
          
          <p>Hi ${record.full_name},</p>
          
          <p>We're excited to help you stop wasting money on boost posts and start getting trackable leads with FB + Google Ads!</p>
          
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h2 style="color: #333; margin-top: 0;">Next Step: Choose Your Time</h2>
            <p>Click the button below to select a time that works for your schedule:</p>
            <div style="text-align: center; margin: 20px 0;">
              <a href="${calendlyLink}" 
                 style="background-color: #007bff; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; display: inline-block; font-weight: bold;">
                Book Your Call Time →
              </a>
            </div>
          </div>
          
          <h3 style="color: #333;">What to Expect:</h3>
          <ul>
            <li>We'll review your business and current marketing efforts</li>
            <li>Show you exactly how FB + Google Ads can bring you trackable leads</li>
            <li>Create a custom strategy for your ${record.company}</li>
            <li>No pitch - just actionable advice you can use immediately</li>
          </ul>
          
          <div style="background-color: #e7f3ff; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 0; font-weight: bold; color: #0066cc;">
              Remember: If we don't deliver leads in 30 days, our performance fee pauses.
            </p>
          </div>
          
          <p>We'll send you a calendar invite once you book your time slot.</p>
          
          <p>Looking forward to helping you grow ${record.company}!</p>
          
          <p style="margin-top: 30px;">
            Best regards,<br>
            <strong>The Rosey Co Team</strong><br>
            <a href="mailto:team@roseyco.com">team@roseyco.com</a>
          </p>
          
          <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;">
          <p style="font-size: 12px; color: #666; text-align: center;">
            If you have any questions, just reply to this email or call us directly.
          </p>
        </div>
      `,
    });

    if (emailResponse?.error) {
      console.error("Resend error (booking-confirmation):", emailResponse.error);
      return new Response(JSON.stringify({ success: false, error: emailResponse.error.message }), {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    console.log("Booking confirmation email sent:", emailResponse.data);

    return new Response(JSON.stringify({ success: true, emailId: emailResponse.data?.id }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-booking-confirmation function:", error);
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
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface AffiliateRecord {
  id: string;
  full_name: string;
  email: string;
  affiliate_code: string;
  commission_rate: number;
  status: string;
}

interface AffiliateApprovalRequest {
  record: AffiliateRecord;
}

const handler = async (req: Request): Promise<Response> => {
  console.log("Affiliate approval email function called");

  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { record }: AffiliateApprovalRequest = await req.json();
    console.log("Processing affiliate approval email for:", record.email);

    // Only send email if status is 'approved'
    if (record.status !== 'approved') {
      console.log("Affiliate not approved, skipping email");
      return new Response(JSON.stringify({ success: true, message: "No email sent - status not approved" }), {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    const dashboardLink = "https://yxzdmacnfdswdxlgwjzi.supabase.co/affiliate-dashboard";
    const commissionRate = (record.commission_rate * 100).toFixed(0);

    const emailResponse = await resend.emails.send({
      from: "Flowryse <noreply@flowryse.com>",
      to: [record.email],
      subject: "Welcome to the Flowryse Affiliate Program! 🎉",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1 style="color: #333; text-align: center;">Congratulations! You're Now a Flowryse Affiliate!</h1>
          
          <p>Hi ${record.full_name},</p>
          
          <p>Great news! Your affiliate application has been approved and you're now officially part of the Flowryse Affiliate Program!</p>
          
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h2 style="color: #333; margin-top: 0;">Your Affiliate Details</h2>
            <ul style="margin: 0; padding-left: 20px;">
              <li><strong>Affiliate Code:</strong> <code style="background: #e9ecef; padding: 2px 6px; border-radius: 3px;">${record.affiliate_code}</code></li>
              <li><strong>Commission Rate:</strong> ${commissionRate}%</li>
              <li><strong>Status:</strong> Active ✅</li>
            </ul>
          </div>
          
          <h3 style="color: #333;">How It Works:</h3>
          <ol>
            <li>Share your affiliate code <code style="background: #e9ecef; padding: 2px 6px; border-radius: 3px;">${record.affiliate_code}</code> with potential clients</li>
            <li>They enter your code when booking their strategy call</li>
            <li>When they become a paying client, you earn ${commissionRate}% commission</li>
            <li>Track your earnings and referrals in your affiliate dashboard</li>
          </ol>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${dashboardLink}" 
               style="background-color: #007bff; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; display: inline-block; font-weight: bold;">
              Access Your Dashboard →
            </a>
          </div>
          
          <div style="background-color: #e7f3ff; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #0066cc;">Marketing Materials</h3>
            <p style="margin: 0;">We'll be sending you marketing materials, social media templates, and email swipe copy to help you promote Flowryse effectively. Keep an eye out for that in the next 24 hours!</p>
          </div>
          
          <h3 style="color: #333;">Questions?</h3>
          <p>If you have any questions about the affiliate program or need help getting started, just reply to this email or reach out to us directly.</p>
          
          <p>We're excited to have you on the team and look forward to helping you earn commissions while growing your network!</p>
          
          <p style="margin-top: 30px;">
            Best regards,<br>
            <strong>The Flowryse Team</strong><br>
            <a href="mailto:brady@flowryse.com">brady@flowryse.com</a>
          </p>
          
          <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;">
          <p style="font-size: 12px; color: #666; text-align: center;">
            You received this email because you applied to become a Flowryse affiliate and your application was approved.
          </p>
        </div>
      `,
    });

    if (emailResponse?.error) {
      console.error("Resend error (affiliate-approval):", emailResponse.error);
      return new Response(JSON.stringify({ success: false, error: emailResponse.error.message }), {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    console.log("Affiliate approval email sent:", emailResponse.data);

    return new Response(JSON.stringify({ success: true, emailId: emailResponse.data?.id }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-affiliate-approval function:", error);
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
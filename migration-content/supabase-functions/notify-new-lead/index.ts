import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

// Log whether the API key is present (not the key itself)
console.log("RESEND_API_KEY present:", Boolean(Deno.env.get("RESEND_API_KEY")));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface LeadNotificationRequest {
  record: {
    id: string;
    full_name: string;
    email: string;
    phone: string;
    company: string;
    website?: string;
    consequence: string;
    source?: string;
    created_at: string;
  };
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log("New lead notification triggered");
    
    const { record }: LeadNotificationRequest = await req.json();
    
    console.log("Lead data:", record);

    // Send email notification to business owner
    const emailResponse = await resend.emails.send({
      from: "Rosey Co <noreply@roseyco.com>",
      to: ["team@roseyco.com"], // Replace with your actual email
      subject: `🔥 New Lead: ${record.full_name} from ${record.company}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #2563eb; margin-bottom: 24px;">🔥 New Lead Alert!</h1>
          
          <div style="background-color: #f8fafc; padding: 24px; border-radius: 8px; margin-bottom: 24px;">
            <h2 style="margin-top: 0; color: #1e293b;">Contact Details</h2>
            <p><strong>Name:</strong> ${record.full_name}</p>
            <p><strong>Email:</strong> <a href="mailto:${record.email}">${record.email}</a></p>
            <p><strong>Phone:</strong> <a href="tel:${record.phone}">${record.phone}</a></p>
            <p><strong>Company:</strong> ${record.company}</p>
            ${record.website ? `<p><strong>Website:</strong> <a href="${record.website}" target="_blank">${record.website}</a></p>` : ''}
          </div>
          
          <div style="background-color: #fef3c7; padding: 24px; border-radius: 8px; margin-bottom: 24px;">
            <h3 style="margin-top: 0; color: #92400e;">Business Details</h3>
            <p><strong>Current Ad Spend:</strong> ${record.consequence}</p>
            ${record.source ? `<p><strong>Source:</strong> ${record.source}</p>` : ''}
            <p><strong>Submitted:</strong> ${new Date(record.created_at).toLocaleString('en-AU')}</p>
          </div>
          
          <div style="text-align: center;">
            <p style="color: #64748b;">Lead ID: ${record.id}</p>
          </div>
        </div>
      `,
    });

    console.log("Email sent successfully:", emailResponse);

    return new Response(JSON.stringify({ success: true, emailResponse }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in notify-new-lead function:", error);
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
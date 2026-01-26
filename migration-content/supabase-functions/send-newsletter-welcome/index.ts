import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface NewsletterWelcomeRequest {
  email: string;
  firstName: string;
}

const handler = async (req: Request): Promise<Response> => {
  console.log('Newsletter welcome email function called');

  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email, firstName }: NewsletterWelcomeRequest = await req.json();
    console.log('Processing newsletter welcome email for:', email);

    const emailResponse = await resend.emails.send({
      from: "Rosey Co <noreply@roseyco.com>",
      to: [email],
      subject: "🎯 Welcome to ROI-Driven Marketing Tips!",
      html: `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Welcome to Rosey Co Newsletter</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="text-align: center; margin-bottom: 30px;">
                <h1 style="color: #8B5CF6; margin-bottom: 10px;">🎯 Welcome ${firstName}!</h1>
                <h2 style="color: #333; font-size: 24px; margin-bottom: 20px;">You're In! No More Gambling on Ads</h2>
            </div>
            
            <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 30px;">
                <p style="margin-bottom: 15px;"><strong>Hi ${firstName},</strong></p>
                
                <p style="margin-bottom: 15px;">Welcome to the Rosey Co newsletter! You've just taken the first step toward turning your ad spend into predictable profit. 🚀</p>
                
                <p style="margin-bottom: 15px;"><strong>Here's what you'll get every week:</strong></p>
                <ul style="margin-bottom: 20px; padding-left: 20px;">
                    <li style="margin-bottom: 8px;">✅ <strong>Facebook ads that beat Boost Posts</strong> - Real targeting strategies that work</li>
                    <li style="margin-bottom: 8px;">✅ <strong>Google ads for high-intent customers</strong> - Capture leads when they're ready to buy</li>
                    <li style="margin-bottom: 8px;">✅ <strong>ROI tracking that shows real results</strong> - Stop guessing, start measuring</li>
                    <li style="margin-bottom: 8px;">✅ <strong>Landing pages that actually convert</strong> - Turn clicks into customers</li>
                </ul>
                
                <p style="margin-bottom: 15px;">No fluff, no generic advice - just proven tactics for Australian local businesses.</p>
            </div>
            
            <div style="background: linear-gradient(135deg, #8B5CF6, #EC4899); padding: 20px; border-radius: 8px; margin-bottom: 30px; text-align: center;">
                <h3 style="color: white; margin-bottom: 15px; font-size: 20px;">🎁 Your First Week Bonus</h3>
                <p style="color: white; margin-bottom: 15px; font-size: 16px;">Get our "Facebook Ads vs Boost Posts" comparison guide - see exactly why one converts 3x better!</p>
                <p style="color: white; font-size: 12px; margin-top: 10px;">Coming to your inbox this week...</p>
            </div>
            
            <div style="border-top: 2px solid #8B5CF6; padding-top: 20px; margin-top: 30px;">
                <h3 style="color: #8B5CF6; margin-bottom: 15px;">🚀 Ready to Go Further?</h3>
                <p style="margin-bottom: 15px;">Want to skip the learning curve and get results fast? Book a free strategy call to see how we can 10x your ROI:</p>
                
                <div style="text-align: center; margin: 20px 0;">
                    <a href="https://roseyco.com/contact" style="background: #EC4899; color: white; padding: 12px 25px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">
                        📞 Book Free Strategy Call
                    </a>
                </div>
                
                <p style="font-size: 14px; color: #666; text-align: center;">No obligations, just a conversation about your business goals.</p>
            </div>
            
            <div style="border-top: 1px solid #eee; padding-top: 20px; margin-top: 30px; text-align: center; font-size: 12px; color: #666;">
                <p>You're receiving this because you signed up for ROI-driven marketing tips at RoseyCo.com</p>
                <p>If you no longer wish to receive emails, you can <a href="#" style="color: #8B5CF6;">unsubscribe here</a>.</p>
                <p style="margin-top: 15px;">
                    <strong>Rosey Co</strong><br>
                    Global social media marketing agency<br>
                    <a href="https://roseyco.com" style="color: #8B5CF6;">roseyco.com</a>
                </p>
            </div>
        </body>
        </html>
      `,
    });

    if (emailResponse?.error) {
      console.error('Resend error (newsletter-welcome):', emailResponse.error);
      return new Response(JSON.stringify({ success: false, error: emailResponse.error.message }), {
        status: 500,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      });
    }

    console.log("Newsletter welcome email sent:", emailResponse.data);

    return new Response(JSON.stringify({ 
      success: true,
      message: "Newsletter welcome email sent successfully",
      emailId: emailResponse.data?.id 
    }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });

  } catch (error: any) {
    console.error("Error in send-newsletter-welcome function:", error);
    
    return new Response(JSON.stringify({ 
      error: error.message,
      success: false 
    }), {
      status: 500,
      headers: { 
        "Content-Type": "application/json", 
        ...corsHeaders 
      },
    });
  }
};

serve(handler);
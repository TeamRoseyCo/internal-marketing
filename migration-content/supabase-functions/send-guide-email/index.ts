import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface GuideEmailRequest {
  email: string;
  fullName: string;
  company?: string;
}

const handler = async (req: Request): Promise<Response> => {
  console.log('Guide email function called');

  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email, fullName, company }: GuideEmailRequest = await req.json();
    console.log('Processing guide email for:', email);

    const emailResponse = await resend.emails.send({
      from: "Flowryse <noreply@flowryse.com>",
      to: [email],
      subject: "🎯 Your Free Guide: Why Meta Ads Are The Greatest",
      html: `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Your Free Meta Ads Guide</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="text-align: center; margin-bottom: 30px;">
                <h1 style="color: #8B5CF6; margin-bottom: 10px;">🎯 Your Free Guide is Here!</h1>
                <h2 style="color: #333; font-size: 24px; margin-bottom: 20px;">Why Meta Ads Are The Greatest</h2>
            </div>
            
            <!-- Guide Preview Images -->
            <div style="text-align: center; margin-bottom: 30px;">
                <div style="display: inline-block; margin: 0 10px 20px 10px; vertical-align: top;">
                    <div style="border: 2px solid #8B5CF6; border-radius: 8px; padding: 4px; background: linear-gradient(135deg, #8B5CF6, #EC4899, #06B6D4); display: inline-block;">
                        <img src="https://flowryse.com/guides/guide-front-cover.png" alt="4 Super Easy Ways Guide Cover" style="width: 180px; height: auto; border-radius: 4px; display: block;">
                    </div>
                </div>
                <div style="display: inline-block; margin: 0 10px 20px 10px; vertical-align: top;">
                    <div style="border: 2px solid #EC4899; border-radius: 8px; padding: 4px; background: linear-gradient(135deg, #EC4899, #06B6D4, #8B5CF6); display: inline-block;">
                        <img src="https://flowryse.com/guides/guide-back-cover.png" alt="Get More Out Of Your Advertising Dollar" style="width: 180px; height: auto; border-radius: 4px; display: block;">
                    </div>
                </div>
                <p style="font-size: 14px; color: #666; margin-top: 15px; font-style: italic;">
                    Your comprehensive guide to mastering Meta Ads for maximum ROI
                </p>
            </div>
            
            <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 30px;">
                <p style="margin-bottom: 15px;"><strong>Hi ${fullName}${company ? ` from ${company}` : ''},</strong></p>
                
                <p style="margin-bottom: 15px;">Thank you for downloading our comprehensive guide on Meta Ads! 🚀</p>
                
                <p style="margin-bottom: 15px;">This guide reveals:</p>
                <ul style="margin-bottom: 20px; padding-left: 20px;">
                    <li style="margin-bottom: 8px;">Why Meta Ads outperform all other advertising platforms</li>
                    <li style="margin-bottom: 8px;">Secret targeting strategies used by top marketers</li>
                    <li style="margin-bottom: 8px;">Proven ad templates that convert</li>
                    <li style="margin-bottom: 8px;">Psychology behind high-converting Meta Ads</li>
                    <li style="margin-bottom: 8px;">Audience research and segmentation mastery</li>
                </ul>
            </div>
            
            <div style="text-align: center; margin: 30px 0;">
                <a href="https://drive.google.com/uc?export=download&id=1IiVHeLO_AxzOEBZ78KMOI2TloolXN5Mg" style="background: linear-gradient(135deg, #8B5CF6, #EC4899, #06B6D4); color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block;">
                    📥 Download Your Guide Now
                </a>
                <p style="font-size: 12px; color: #666; margin-top: 10px;">
                    Click the button above to instantly download your free PDF guide.
                </p>
            </div>
            
            <div style="border-top: 2px solid #8B5CF6; padding-top: 20px; margin-top: 30px;">
                <h3 style="color: #8B5CF6; margin-bottom: 15px;">🎯 Ready to Take Action?</h3>
                <p style="margin-bottom: 15px;">Want to see these strategies in action for your business? Book a free strategy call with our team:</p>
                
                <div style="text-align: center; margin: 20px 0;">
                    <a href="https://flowryse.com/book-a-call" style="background: #EC4899; color: white; padding: 12px 25px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">
                        📞 Book Free Strategy Call
                    </a>
                </div>
            </div>
            
            <div style="border-top: 1px solid #eee; padding-top: 20px; margin-top: 30px; text-align: center; font-size: 12px; color: #666;">
                <p>This email was sent by Flowryse because you requested our free Meta Ads guide.</p>
                <p>If you no longer wish to receive emails, you can <a href="#" style="color: #8B5CF6;">unsubscribe here</a>.</p>
                <p style="margin-top: 15px;">
                    <strong>Flowryse</strong><br>
                    ROI-driven ads for Australian local businesses<br>
                    <a href="https://flowryse.com" style="color: #8B5CF6;">flowryse.com</a>
                </p>
            </div>
        </body>
        </html>
      `,
    });

    if (emailResponse?.error) {
      console.error('Resend error (guide-email):', emailResponse.error);
      return new Response(JSON.stringify({ success: false, error: emailResponse.error.message }), {
        status: 500,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      });
    }

    console.log("Guide email sent:", emailResponse.data);

    return new Response(JSON.stringify({ 
      success: true,
      message: "Guide email sent successfully",
      emailId: emailResponse.data?.id 
    }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });

  } catch (error: any) {
    console.error("Error in send-guide-email function:", error);
    
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
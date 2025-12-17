import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface MailchimpRequest {
  email: string;
  firstName?: string;
  lastName?: string;
  company?: string;
  phone?: string;
  tags?: string[];
  source?: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email, firstName, lastName, company, phone, tags, source }: MailchimpRequest = await req.json();
    
    const mailchimpApiKey = Deno.env.get('MAILCHIMP_API_KEY');
    if (!mailchimpApiKey) {
      throw new Error('MAILCHIMP_API_KEY not found');
    }

    // Extract datacenter from API key (format: key-dc)
    const datacenter = mailchimpApiKey.split('-')[1];
    if (!datacenter) {
      throw new Error('Invalid Mailchimp API key format');
    }

    // Your Mailchimp Audience ID
    const audienceId = '83f9921dbe';
    
    const url = `https://${datacenter}.api.mailchimp.com/3.0/lists/${audienceId}/members`;
    
    const memberData = {
      email_address: email,
      status: 'subscribed',
      merge_fields: {
        ...(firstName && { FNAME: firstName }),
        ...(lastName && { LNAME: lastName }),
        ...(company && { COMPANY: company }),
        ...(phone && { PHONE: phone }),
      },
      tags: tags || [],
      ...(source && { 
        marketing_permissions: [{
          marketing_permission_id: 'web_form',
          text: `Subscribed via ${source}`,
          enabled: true
        }]
      })
    };

    console.log('Adding subscriber to Mailchimp:', { email, source });

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${mailchimpApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(memberData),
    });

    const result = await response.json();

    if (!response.ok) {
      // If user already exists, that's usually fine
      if (result.title === 'Member Exists') {
        console.log('Member already exists in Mailchimp:', email);
        return new Response(JSON.stringify({ 
          success: true, 
          message: 'Already subscribed',
          mailchimp_id: result.id 
        }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
      
      console.error('Mailchimp API error:', result);
      throw new Error(`Mailchimp API error: ${result.detail || result.title}`);
    }

    console.log('Successfully added to Mailchimp:', result.id);

    return new Response(JSON.stringify({ 
      success: true, 
      mailchimp_id: result.id,
      message: 'Successfully added to audience'
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error: any) {
    console.error('Error in add-to-mailchimp function:', error);
    return new Response(JSON.stringify({ 
      error: error.message,
      success: false 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
};

serve(handler);
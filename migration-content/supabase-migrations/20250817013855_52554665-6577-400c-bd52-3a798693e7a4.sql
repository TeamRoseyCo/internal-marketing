-- Create a trigger function to notify about new leads
CREATE OR REPLACE FUNCTION notify_new_lead()
RETURNS TRIGGER AS $$
DECLARE
  response_status INTEGER;
  response_body TEXT;
BEGIN
  -- Call the edge function to send email notification
  SELECT 
    status,
    content::text
  INTO 
    response_status,
    response_body
  FROM 
    net.http_post(
      url := 'https://yxzdmacnfdswdxlgwjzi.supabase.co/functions/v1/notify-new-lead',
      headers := '{"Content-Type": "application/json", "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl4emRtYWNuZmRzd2R4bGd3anppIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1MjI5NDE2OSwiZXhwIjoyMDY3ODcwMTY5fQ.KtJjZy_0kPp3FZ0sSdlnWYB4eHl_iE5n5iGP_JDqpEU"}'::jsonb,
      body := json_build_object('record', row_to_json(NEW))::text
    );
  
  -- Log the response for debugging
  RAISE LOG 'Email notification response - Status: %, Body: %', response_status, response_body;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create the trigger on the leads table
DROP TRIGGER IF EXISTS on_lead_inserted ON public.leads;
CREATE TRIGGER on_lead_inserted
  AFTER INSERT ON public.leads
  FOR EACH ROW
  EXECUTE FUNCTION notify_new_lead();
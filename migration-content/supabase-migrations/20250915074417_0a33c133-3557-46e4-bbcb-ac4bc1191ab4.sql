-- Create function to send affiliate approval email
CREATE OR REPLACE FUNCTION public.send_affiliate_approval_email()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public', 'extensions'
AS $function$
DECLARE
  response_status INTEGER;
  response_body TEXT;
BEGIN
  -- Only trigger email if status changed TO 'approved'
  IF NEW.status = 'approved' AND (OLD.status IS NULL OR OLD.status != 'approved') THEN
    -- Call the send-affiliate-approval edge function
    BEGIN
      SELECT status, content::text
      INTO response_status, response_body
      FROM extensions.http_post(
        url := 'https://yxzdmacnfdswdxlgwjzi.supabase.co/functions/v1/send-affiliate-approval',
        headers := '{"Content-Type": "application/json"}'::jsonb,
        body := json_build_object('record', row_to_json(NEW))::jsonb
      );
      RAISE LOG 'send_affiliate_approval_email via extensions.http_post: status %, body %', response_status, response_body;
    EXCEPTION
      WHEN undefined_function THEN
        -- Fallback to net.http_post if installed under net schema
        BEGIN
          SELECT status, content::text
          INTO response_status, response_body
          FROM net.http_post(
            url := 'https://yxzdmacnfdswdxlgwjzi.supabase.co/functions/v1/send-affiliate-approval',
            headers := '{"Content-Type": "application/json"}'::jsonb,
            body := json_build_object('record', row_to_json(NEW))::jsonb
          );
          RAISE LOG 'send_affiliate_approval_email via net.http_post: status %, body %', response_status, response_body;
        EXCEPTION WHEN OTHERS THEN
          RAISE WARNING 'send_affiliate_approval_email fallback failed: %', SQLERRM;
        END;
      WHEN OTHERS THEN
        RAISE WARNING 'send_affiliate_approval_email primary call failed: %', SQLERRM;
    END;
  END IF;

  RETURN NEW;
END;
$function$;

-- Create trigger for affiliate status updates
DROP TRIGGER IF EXISTS affiliate_approval_email_trigger ON public.affiliates;
CREATE TRIGGER affiliate_approval_email_trigger
  AFTER UPDATE ON public.affiliates
  FOR EACH ROW
  EXECUTE FUNCTION public.send_affiliate_approval_email();
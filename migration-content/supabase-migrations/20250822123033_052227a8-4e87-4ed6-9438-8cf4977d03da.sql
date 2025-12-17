-- Create trigger to send booking confirmation email when new lead is inserted
CREATE OR REPLACE FUNCTION public.send_booking_confirmation()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public', 'extensions'
AS $function$
DECLARE
  response_status INTEGER;
  response_body TEXT;
BEGIN
  -- Call the send-booking-confirmation edge function
  BEGIN
    SELECT status, content::text
    INTO response_status, response_body
    FROM extensions.http_post(
      url := 'https://yxzdmacnfdswdxlgwjzi.supabase.co/functions/v1/send-booking-confirmation',
      headers := '{"Content-Type": "application/json"}'::jsonb,
      body := json_build_object('record', row_to_json(NEW))::jsonb
    );
    RAISE LOG 'send_booking_confirmation via extensions.http_post: status %, body %', response_status, response_body;
  EXCEPTION
    WHEN undefined_function THEN
      -- Fallback to net.http_post if installed under net schema
      BEGIN
        SELECT status, content::text
        INTO response_status, response_body
        FROM net.http_post(
          url := 'https://yxzdmacnfdswdxlgwjzi.supabase.co/functions/v1/send-booking-confirmation',
          headers := '{"Content-Type": "application/json"}'::jsonb,
          body := json_build_object('record', row_to_json(NEW))::jsonb
        );
        RAISE LOG 'send_booking_confirmation via net.http_post: status %, body %', response_status, response_body;
      EXCEPTION WHEN OTHERS THEN
        RAISE WARNING 'send_booking_confirmation fallback failed: %', SQLERRM;
      END;
    WHEN OTHERS THEN
      RAISE WARNING 'send_booking_confirmation primary call failed: %', SQLERRM;
  END;

  RETURN NEW;
END;
$function$;

-- Create trigger that fires after insert on leads table
CREATE TRIGGER send_booking_confirmation_trigger
AFTER INSERT ON public.leads
FOR EACH ROW
EXECUTE FUNCTION public.send_booking_confirmation();
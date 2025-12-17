-- Ensure pg_net extension is enabled for HTTP calls
CREATE EXTENSION IF NOT EXISTS pg_net WITH SCHEMA extensions;

-- Update function to never block inserts and remove auth requirement to call edge function
CREATE OR REPLACE FUNCTION notify_new_lead()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, extensions
AS $$
DECLARE
  response_status INTEGER;
  response_body TEXT;
BEGIN
  BEGIN
    SELECT 
      status,
      content::text
    INTO 
      response_status,
      response_body
    FROM 
      net.http_post(
        url := 'https://yxzdmacnfdswdxlgwjzi.supabase.co/functions/v1/notify-new-lead',
        headers := '{"Content-Type": "application/json"}'::jsonb,
        body := json_build_object('record', row_to_json(NEW))::text
      );

    RAISE LOG 'notify_new_lead http_post status %, body %', response_status, response_body;
  EXCEPTION WHEN OTHERS THEN
    -- Never fail the insert because of notification issues
    RAISE WARNING 'notify_new_lead failed: %', SQLERRM;
  END;

  RETURN NEW;
END;
$$;
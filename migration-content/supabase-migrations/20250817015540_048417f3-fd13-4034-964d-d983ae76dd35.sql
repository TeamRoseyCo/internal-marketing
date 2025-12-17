-- Harden notify_new_lead to support both pg_net schemas and avoid type mismatches
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
  -- Attempt using extensions.http_post first (common in Supabase projects)
  BEGIN
    SELECT status, content::text
    INTO response_status, response_body
    FROM extensions.http_post(
      url := 'https://yxzdmacnfdswdxlgwjzi.supabase.co/functions/v1/notify-new-lead',
      headers := '{"Content-Type": "application/json"}'::jsonb,
      body := json_build_object('record', row_to_json(NEW))::jsonb
    );
    RAISE LOG 'notify_new_lead via extensions.http_post: status %, body %', response_status, response_body;
  EXCEPTION
    WHEN undefined_function THEN
      -- Fallback to net.http_post if installed under net schema
      BEGIN
        SELECT status, content::text
        INTO response_status, response_body
        FROM net.http_post(
          url := 'https://yxzdmacnfdswdxlgwjzi.supabase.co/functions/v1/notify-new-lead',
          headers := '{"Content-Type": "application/json"}'::jsonb,
          body := json_build_object('record', row_to_json(NEW))::jsonb
        );
        RAISE LOG 'notify_new_lead via net.http_post: status %, body %', response_status, response_body;
      EXCEPTION WHEN OTHERS THEN
        RAISE WARNING 'notify_new_lead fallback failed: %', SQLERRM;
      END;
    WHEN OTHERS THEN
      RAISE WARNING 'notify_new_lead primary call failed: %', SQLERRM;
  END;

  RETURN NEW;
END;
$$;
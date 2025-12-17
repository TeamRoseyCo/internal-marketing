-- Fix remaining database function security issues by adding proper search_path to all functions

CREATE OR REPLACE FUNCTION public.generate_referral_code()
 RETURNS text
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  code text;
  exists boolean;
BEGIN
  LOOP
    -- Generate a random 8-character code
    code := upper(substring(md5(random()::text) from 1 for 8));
    
    -- Check if code already exists
    SELECT EXISTS(SELECT 1 FROM referrals WHERE referral_code = code) INTO exists;
    
    -- If code doesn't exist, return it
    IF NOT exists THEN
      RETURN code;
    END IF;
  END LOOP;
END;
$function$;

CREATE OR REPLACE FUNCTION public.update_credit_balance()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
BEGIN
  -- Update the credits table balance
  INSERT INTO credits (user_id, balance)
  VALUES (NEW.user_id, NEW.amount)
  ON CONFLICT (user_id)
  DO UPDATE SET 
    balance = credits.balance + NEW.amount,
    updated_at = now();
  
  RETURN NEW;
END;
$function$;

CREATE OR REPLACE FUNCTION public.notify_new_lead()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public', 'extensions'
AS $function$
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
$function$;

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
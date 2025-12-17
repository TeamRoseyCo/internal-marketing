-- Fix the final function security issue
CREATE OR REPLACE FUNCTION public.assign_admin_role(user_email text)
 RETURNS void
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  user_uuid UUID;
BEGIN
  -- Get the user ID from auth.users based on email
  SELECT id INTO user_uuid
  FROM auth.users
  WHERE email = user_email;
  
  IF user_uuid IS NOT NULL THEN
    -- Insert or update the admin role
    INSERT INTO public.user_roles (user_id, role)
    VALUES (user_uuid, 'admin'::app_role)
    ON CONFLICT (user_id, role) DO NOTHING;
    
    RAISE NOTICE 'Admin role assigned to user: %', user_email;
  ELSE
    RAISE NOTICE 'User not found with email: %', user_email;
  END IF;
END;
$function$;
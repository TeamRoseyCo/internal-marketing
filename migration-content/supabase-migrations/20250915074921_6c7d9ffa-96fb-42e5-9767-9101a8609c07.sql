-- Insert admin user role for development (replace with actual admin user ID when known)
-- This creates the admin role for the first user or allows manual assignment
-- You can replace 'your-admin-user-id-here' with the actual UUID once you know it

-- First, make sure the admin role exists in the enum (it should from previous migrations)
-- CREATE TYPE IF NOT EXISTS public.app_role AS ENUM ('admin', 'moderator', 'user');

-- Create a function to assign admin role to a specific user
CREATE OR REPLACE FUNCTION assign_admin_role(user_email TEXT)
RETURNS VOID AS $$
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
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Example usage (uncomment and replace with actual admin email):
-- SELECT assign_admin_role('your-admin-email@example.com');
-- Fix critical referral system security vulnerability
-- Remove the overly permissive referral creation policy
DROP POLICY IF EXISTS "System can create referrals" ON public.referrals;

-- Create a more secure policy that only allows authenticated users to create referrals for themselves
-- or allows admin users to create referrals
CREATE POLICY "Users can create referrals with proper validation" 
ON public.referrals 
FOR INSERT 
TO authenticated
WITH CHECK (
  -- Only allow creation if the user is an admin OR the referral is being created by the referred user
  EXISTS (
    SELECT 1 FROM public.user_roles 
    WHERE user_id = auth.uid() AND role = 'admin'
  )
  OR auth.uid() = referred_user_id
);

-- Fix database function security by adding proper search_path
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql 
SECURITY DEFINER 
SET search_path = public;
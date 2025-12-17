-- Fix RLS policies for affiliates to handle both authenticated and anonymous access
-- Update the affiliates SELECT policy to allow viewing by both user_id and for admin access

-- First, drop the existing restrictive policy
DROP POLICY IF EXISTS "Affiliates can view their own data" ON public.affiliates;

-- Create new policy that allows affiliates to see their data by user_id OR email (when user_id is null)
CREATE POLICY "Affiliates can view their own data" 
ON public.affiliates 
FOR SELECT 
USING (
  auth.uid() = user_id 
  OR 
  (user_id IS NULL AND email = auth.jwt() ->> 'email')
);

-- Also ensure affiliates can update their own user_id when linking accounts
CREATE POLICY "Affiliates can link their account" 
ON public.affiliates 
FOR UPDATE 
USING (
  user_id IS NULL 
  AND email = auth.jwt() ->> 'email'
) 
WITH CHECK (
  user_id = auth.uid()
);
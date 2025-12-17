-- Fix critical referral system security vulnerability
-- Remove the overly permissive referral creation policy
DROP POLICY IF EXISTS "System can create referrals" ON public.referrals;

-- Create a more secure policy that only allows admin users to create referrals
-- This prevents arbitrary referral creation while still allowing legitimate referrals through admin interface
CREATE POLICY "Only admins can create referrals" 
ON public.referrals 
FOR INSERT 
TO authenticated
WITH CHECK (
  has_role(auth.uid(), 'admin'::app_role)
);

-- Update all database functions to use proper search_path for security
CREATE OR REPLACE FUNCTION public.update_affiliate_stats()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
BEGIN
  -- Update total referrals and commission for the affiliate
  UPDATE public.affiliates 
  SET 
    total_referrals = (
      SELECT COUNT(*) 
      FROM public.referrals 
      WHERE affiliate_id = NEW.affiliate_id AND status = 'approved'
    ),
    total_commission = (
      SELECT COALESCE(SUM(commission_amount), 0) 
      FROM public.referrals 
      WHERE affiliate_id = NEW.affiliate_id AND status = 'approved'
    ),
    updated_at = now()
  WHERE id = NEW.affiliate_id;
  
  RETURN NEW;
END;
$function$;
-- Drop existing policy and create a more restrictive one
DROP POLICY IF EXISTS "Admins can read all newsletter signups" ON public.newsletter_signups;

-- Create enhanced policy that requires authentication AND admin role
CREATE POLICY "Authenticated admins can read newsletter signups" 
ON public.newsletter_signups 
FOR SELECT 
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));

-- Apply same enhancement to other sensitive tables for consistency
DROP POLICY IF EXISTS "Admins can read all free guide downloads" ON public.free_guide_downloads;

CREATE POLICY "Authenticated admins can read free guide downloads" 
ON public.free_guide_downloads 
FOR SELECT 
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));

DROP POLICY IF EXISTS "Admins and sales can read leads" ON public.leads;

CREATE POLICY "Authenticated users with admin or sales role can read leads" 
ON public.leads 
FOR SELECT 
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'sales'::app_role));
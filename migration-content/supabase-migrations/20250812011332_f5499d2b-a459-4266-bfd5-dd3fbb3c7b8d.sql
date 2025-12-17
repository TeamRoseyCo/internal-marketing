-- Recreate SELECT policy safely for authenticated users
DROP POLICY IF EXISTS "Authenticated can read leads" ON public.leads;

CREATE POLICY "Authenticated can read leads"
ON public.leads
FOR SELECT
TO authenticated
USING (true);
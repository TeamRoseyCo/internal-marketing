-- Allow only authenticated users to read leads while keeping public inserts
CREATE POLICY IF NOT EXISTS "Authenticated can read leads"
ON public.leads
FOR SELECT
TO authenticated
USING (true);

-- No changes to INSERT policy (public lead capture stays functional)
-- No UPDATE/DELETE policies added (remain disallowed by default)
-- Harden leads table visibility without breaking public lead capture
-- 1) Ensure RLS is enabled (defense-in-depth)
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- 2) Revoke any direct SELECT grants to public roles (anon/authenticated)
REVOKE SELECT ON TABLE public.leads FROM anon;
REVOKE SELECT ON TABLE public.leads FROM authenticated;

-- Note: We intentionally do NOT revoke INSERT, so public lead capture keeps working via existing RLS policy
-- Existing policy observed:
--   "Anyone can create a lead" ON public.leads FOR INSERT TO {anon, authenticated} WITH CHECK (true);
-- No SELECT policies exist; with RLS + revoked SELECT grants, lead data cannot be read by clients.

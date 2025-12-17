-- Set safe search_path on functions to satisfy linter and improve security
ALTER FUNCTION public.generate_referral_code() SET search_path = public;
ALTER FUNCTION public.update_credit_balance() SET search_path = public;
ALTER FUNCTION public.update_updated_at_column() SET search_path = public;
ALTER FUNCTION public.has_role(uuid, public.app_role) SET search_path = public;
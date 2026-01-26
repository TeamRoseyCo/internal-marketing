-- Fix leads table structure to match contact form
-- Run this in Supabase SQL Editor: https://supabase.com/dashboard/project/naivgwytfupppcoseneq/sql

-- Add new columns for contact form
ALTER TABLE public.leads
  ADD COLUMN IF NOT EXISTS first_name text,
  ADD COLUMN IF NOT EXISTS last_name text,
  ADD COLUMN IF NOT EXISTS service_interest text,
  ADD COLUMN IF NOT EXISTS message text;

-- Make phone nullable (it's optional in the form)
ALTER TABLE public.leads
  ALTER COLUMN phone DROP NOT NULL;

-- Drop old columns from previous form structure
ALTER TABLE public.leads
  DROP COLUMN IF EXISTS full_name,
  DROP COLUMN IF EXISTS company,
  DROP COLUMN IF EXISTS budget_ok,
  DROP COLUMN IF EXISTS consequence,
  DROP COLUMN IF EXISTS timeline;

-- Now make the new required fields NOT NULL
-- (doing this after adding them to avoid constraint violations)
ALTER TABLE public.leads
  ALTER COLUMN first_name SET NOT NULL,
  ALTER COLUMN last_name SET NOT NULL,
  ALTER COLUMN service_interest SET NOT NULL,
  ALTER COLUMN message SET NOT NULL;

-- Final table structure:
-- - id (uuid, primary key)
-- - created_at (timestamptz)
-- - updated_at (timestamptz)
-- - first_name (text, required)
-- - last_name (text, required)
-- - email (text, required)
-- - phone (text, optional)
-- - website (text, optional)
-- - service_interest (text, required)
-- - message (text, required)
-- - source (text, optional)
-- - user_agent (text, optional)

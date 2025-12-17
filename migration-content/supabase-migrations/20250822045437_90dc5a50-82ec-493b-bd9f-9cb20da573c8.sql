-- Create table for newsletter signups
CREATE TABLE public.newsletter_signups (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  first_name TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.newsletter_signups ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to insert (public form)
CREATE POLICY "Anyone can submit newsletter signup" 
ON public.newsletter_signups 
FOR INSERT 
WITH CHECK (true);

-- Create policy for admins to read all signups
CREATE POLICY "Admins can read all newsletter signups" 
ON public.newsletter_signups 
FOR SELECT 
USING (has_role(auth.uid(), 'admin'::app_role));

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_newsletter_signups_updated_at
BEFORE UPDATE ON public.newsletter_signups
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create index for email lookups
CREATE INDEX idx_newsletter_signups_email ON public.newsletter_signups(email);
CREATE INDEX idx_newsletter_signups_created_at ON public.newsletter_signups(created_at);
-- Create table for free guide downloads
CREATE TABLE public.free_guide_downloads (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL,
  full_name TEXT NOT NULL,
  company TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.free_guide_downloads ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to insert (public form)
CREATE POLICY "Anyone can submit free guide download" 
ON public.free_guide_downloads 
FOR INSERT 
WITH CHECK (true);

-- Create policy for admins to read all downloads
CREATE POLICY "Admins can read all free guide downloads" 
ON public.free_guide_downloads 
FOR SELECT 
USING (has_role(auth.uid(), 'admin'::app_role));

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_free_guide_downloads_updated_at
BEFORE UPDATE ON public.free_guide_downloads
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create index for email lookups
CREATE INDEX idx_free_guide_downloads_email ON public.free_guide_downloads(email);
CREATE INDEX idx_free_guide_downloads_created_at ON public.free_guide_downloads(created_at);
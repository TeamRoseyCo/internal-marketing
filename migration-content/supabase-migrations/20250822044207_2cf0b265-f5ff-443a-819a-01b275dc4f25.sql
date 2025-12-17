-- Create storage bucket for guides
INSERT INTO storage.buckets (id, name, public)
VALUES ('guides', 'guides', true);

-- Create RLS policies for the guides bucket
CREATE POLICY "Public can view guides" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'guides');

-- Allow authenticated users to upload guides (for admin use)
CREATE POLICY "Authenticated users can upload guides" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'guides' AND auth.role() = 'authenticated');
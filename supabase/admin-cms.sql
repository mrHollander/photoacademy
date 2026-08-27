-- Admin CMS: editable site text, uploadable photos, and course video storage
-- Run this in the Supabase SQL Editor (after schema.sql).

-- ============================================================
-- SITE CONTENT (editable text, keyed)
-- ============================================================
CREATE TABLE IF NOT EXISTS public.site_content (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- SITE IMAGES (uploadable photos, keyed slots)
-- ============================================================
CREATE TABLE IF NOT EXISTS public.site_images (
  key TEXT PRIMARY KEY,
  url TEXT NOT NULL,
  alt TEXT,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.site_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_images ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read site content" ON public.site_content
  FOR SELECT USING (TRUE);
CREATE POLICY "Admins can manage site content" ON public.site_content
  FOR ALL USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  ) WITH CHECK (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "Anyone can read site images" ON public.site_images
  FOR SELECT USING (TRUE);
CREATE POLICY "Admins can manage site images" ON public.site_images
  FOR ALL USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  ) WITH CHECK (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- updated_at triggers (reuses update_updated_at() from schema.sql)
CREATE TRIGGER update_site_content_updated_at BEFORE UPDATE ON public.site_content
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();
CREATE TRIGGER update_site_images_updated_at BEFORE UPDATE ON public.site_images
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

-- ============================================================
-- STORAGE BUCKETS
-- ============================================================
-- Public bucket for site photos, course images, and lesson thumbnails
INSERT INTO storage.buckets (id, name, public)
  VALUES ('site-images', 'site-images', TRUE)
  ON CONFLICT (id) DO NOTHING;

-- Private bucket for course videos (played back via signed URLs)
INSERT INTO storage.buckets (id, name, public)
  VALUES ('course-videos', 'course-videos', FALSE)
  ON CONFLICT (id) DO NOTHING;

-- Storage policies
CREATE POLICY "Public read site-images" ON storage.objects
  FOR SELECT USING (bucket_id = 'site-images');

CREATE POLICY "Admins manage site-images" ON storage.objects
  FOR ALL USING (
    bucket_id = 'site-images'
    AND EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  ) WITH CHECK (
    bucket_id = 'site-images'
    AND EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "Admins manage course-videos" ON storage.objects
  FOR ALL USING (
    bucket_id = 'course-videos'
    AND EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  ) WITH CHECK (
    bucket_id = 'course-videos'
    AND EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );

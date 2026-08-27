import { createClient } from '@/lib/supabase/client';

function fileExtension(file: File): string {
  const ext = file.name.split('.').pop()?.toLowerCase();
  return ext && /^[a-z0-9]{1,5}$/.test(ext) ? ext : 'bin';
}

function objectPath(prefix: string, file: File): string {
  return `${prefix}-${Date.now()}.${fileExtension(file)}`;
}

// Uploads to the public 'site-images' bucket; returns the public URL.
export async function uploadSiteImage(prefix: string, file: File): Promise<string> {
  const supabase = createClient();
  const path = objectPath(prefix, file);

  const { error } = await supabase.storage.from('site-images').upload(path, file, {
    cacheControl: '3600',
    upsert: false,
  });
  if (error) throw new Error(error.message);

  const { data } = supabase.storage.from('site-images').getPublicUrl(path);
  return data.publicUrl;
}

// Uploads to the private 'course-videos' bucket; returns the storage
// reference ('storage:<path>') to save as the lesson's video_url.
export async function uploadCourseVideo(prefix: string, file: File): Promise<string> {
  const supabase = createClient();
  const path = objectPath(prefix, file);

  const { error } = await supabase.storage.from('course-videos').upload(path, file, {
    cacheControl: '3600',
    upsert: false,
  });
  if (error) throw new Error(error.message);

  return `storage:${path}`;
}

// Reads a video file's duration (seconds) from its metadata in the browser.
export function readVideoDuration(file: File): Promise<number | null> {
  return new Promise((resolve) => {
    const url = URL.createObjectURL(file);
    const video = document.createElement('video');
    video.preload = 'metadata';
    video.onloadedmetadata = () => {
      URL.revokeObjectURL(url);
      resolve(Number.isFinite(video.duration) ? Math.round(video.duration) : null);
    };
    video.onerror = () => {
      URL.revokeObjectURL(url);
      resolve(null);
    };
    video.src = url;
  });
}

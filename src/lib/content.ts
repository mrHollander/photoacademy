import { createServerSupabaseClient } from './supabase/server';
import { contentDefaults, imageDefaults, type SiteImage } from './content-shared';

export * from './content-shared';

export async function getSiteContent(): Promise<Record<string, string>> {
  const supabase = await createServerSupabaseClient();
  const { data } = await supabase.from('site_content').select('key, value');

  const content = { ...contentDefaults };
  for (const row of data || []) {
    content[row.key] = row.value;
  }
  return content;
}

export async function getSiteImages(): Promise<Record<string, SiteImage>> {
  const supabase = await createServerSupabaseClient();
  const { data } = await supabase.from('site_images').select('key, url, alt');

  const images = { ...imageDefaults };
  for (const row of data || []) {
    images[row.key] = { url: row.url, alt: row.alt || images[row.key]?.alt || '' };
  }
  return images;
}


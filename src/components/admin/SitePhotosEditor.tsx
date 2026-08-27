'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { uploadSiteImage } from '@/lib/admin-upload';
import type { SiteImage } from '@/lib/content-shared';
import { ImageIcon, Upload } from 'lucide-react';

interface Slot {
  key: string;
  label: string;
}

interface SlotGroup {
  title: string;
  note?: string;
  slots: Slot[];
}

const groups: SlotGroup[] = [
  {
    title: 'Homepage — Hero',
    slots: [
      { key: 'home.hero.main', label: 'Large hero photo' },
      { key: 'home.hero.small1', label: 'Small photo (left)' },
      { key: 'home.hero.small2', label: 'Small photo (right)' },
    ],
  },
  {
    title: 'Homepage — Portfolio Grid',
    slots: [1, 2, 3, 4, 5, 6].map((i) => ({
      key: `home.portfolio.${i}`,
      label: `Portfolio photo ${i}`,
    })),
  },
  {
    title: 'Before & After (course page)',
    note: 'Until a photo is uploaded, a colored placeholder is shown on the site.',
    slots: [1, 2, 3, 4].flatMap((i) => [
      { key: `ba.${i}.before`, label: `Example ${i} — Before` },
      { key: `ba.${i}.after`, label: `Example ${i} — After` },
    ]),
  },
];

function PhotoSlot({
  slot,
  image,
}: {
  slot: Slot;
  image: SiteImage | undefined;
}) {
  const [url, setUrl] = useState(image?.url || '');
  const [alt, setAlt] = useState(image?.alt || '');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleFile(file: File | undefined) {
    if (!file) return;
    setBusy(true);
    setError(null);
    try {
      const publicUrl = await uploadSiteImage(slot.key.replace(/\./g, '-'), file);
      const supabase = createClient();
      const { error: dbError } = await supabase
        .from('site_images')
        .upsert({ key: slot.key, url: publicUrl, alt });
      if (dbError) throw new Error(dbError.message);
      setUrl(publicUrl);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Upload failed');
    }
    setBusy(false);
  }

  async function saveAlt() {
    if (!url) return;
    const supabase = createClient();
    const { error: dbError } = await supabase
      .from('site_images')
      .upsert({ key: slot.key, url, alt });
    if (dbError) setError(dbError.message);
  }

  return (
    <div className="border border-stone-200 p-4">
      <p className="text-xs uppercase tracking-wider text-stone-500 mb-3">{slot.label}</p>
      <div className="aspect-[4/3] bg-stone-100 mb-3 relative overflow-hidden flex items-center justify-center">
        {url ? (
          // eslint-disable-next-line @next/next/no-img-element -- admin preview of arbitrary uploads
          <img src={url} alt={alt} className="absolute inset-0 w-full h-full object-cover" />
        ) : (
          <ImageIcon size={24} className="text-stone-300" />
        )}
      </div>
      <label className="btn-secondary text-xs py-2 px-4 flex items-center justify-center gap-2 cursor-pointer">
        <Upload size={13} />
        {busy ? 'Uploading…' : url ? 'Replace' : 'Upload'}
        <input
          type="file"
          accept="image/*"
          className="hidden"
          disabled={busy}
          onChange={(e) => handleFile(e.target.files?.[0])}
        />
      </label>
      <input
        value={alt}
        onChange={(e) => setAlt(e.target.value)}
        onBlur={saveAlt}
        placeholder="Alt text (describes the photo)"
        className="w-full border border-stone-300 px-2 py-1.5 text-xs mt-2"
      />
      {error && <p className="text-xs text-error mt-2">{error}</p>}
    </div>
  );
}

export default function SitePhotosEditor({ images }: { images: Record<string, SiteImage> }) {
  return (
    <div className="max-w-4xl">
      {groups.map((group) => (
        <section key={group.title} className="mb-10">
          <h2 className="text-sm font-medium text-stone-900 mb-1">{group.title}</h2>
          {group.note && <p className="text-xs text-stone-500 mb-4">{group.note}</p>}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
            {group.slots.map((slot) => (
              <PhotoSlot key={slot.key} slot={slot} image={images[slot.key]} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

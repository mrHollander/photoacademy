'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Plus } from 'lucide-react';

export default function AdminCourseEditor() {
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [price, setPrice] = useState(6900);
  const [saving, setSaving] = useState(false);

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);

    const supabase = createClient();
    const { error } = await supabase.from('courses').insert({
      title,
      slug,
      price,
      status: 'draft',
    });

    if (!error) {
      window.location.reload();
    }
    setSaving(false);
  }

  return (
    <div>
      <button onClick={() => setShowForm(!showForm)} className="btn-secondary text-xs flex items-center gap-2">
        <Plus size={14} />
        New Course
      </button>

      {showForm && (
        <form onSubmit={handleCreate} className="bg-white border border-stone-200 p-6 mt-4 space-y-4 max-w-md">
          <div>
            <label className="text-xs uppercase tracking-wider text-stone-500 block mb-1">Title</label>
            <input
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-'));
              }}
              className="w-full border border-stone-300 px-3 py-2 text-sm"
              required
            />
          </div>
          <div>
            <label className="text-xs uppercase tracking-wider text-stone-500 block mb-1">Slug</label>
            <input
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              className="w-full border border-stone-300 px-3 py-2 text-sm"
              required
            />
          </div>
          <div>
            <label className="text-xs uppercase tracking-wider text-stone-500 block mb-1">Price (cents)</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              className="w-full border border-stone-300 px-3 py-2 text-sm"
              required
            />
          </div>
          <button type="submit" disabled={saving} className="btn-primary text-xs py-2.5">
            {saving ? 'Creating...' : 'Create Course'}
          </button>
        </form>
      )}
    </div>
  );
}

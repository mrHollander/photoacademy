'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { uploadSiteImage, uploadCourseVideo, readVideoDuration } from '@/lib/admin-upload';
import type { CourseWithModules, ModuleWithLessons, Lesson } from '@/types';
import { Plus, Trash2, ChevronUp, ChevronDown, Upload, Video, Film } from 'lucide-react';

const inputClass = 'w-full border border-stone-300 px-3 py-2 text-sm bg-white';
const labelClass = 'text-xs uppercase tracking-wider text-stone-500 block mb-1';

function slugify(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
}

function ImageUploadField({
  label,
  value,
  prefix,
  onUploaded,
}: {
  label: string;
  value: string | null;
  prefix: string;
  onUploaded: (url: string) => void;
}) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleFile(file: File | undefined) {
    if (!file) return;
    setBusy(true);
    setError(null);
    try {
      onUploaded(await uploadSiteImage(prefix, file));
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Upload failed');
    }
    setBusy(false);
  }

  return (
    <div>
      <span className={labelClass}>{label}</span>
      <div className="flex items-center gap-3">
        {value ? (
          // eslint-disable-next-line @next/next/no-img-element -- admin preview of arbitrary uploads
          <img src={value} alt="" className="w-16 h-16 object-cover border border-stone-200" />
        ) : (
          <div className="w-16 h-16 bg-stone-100 border border-stone-200" />
        )}
        <label className="btn-secondary text-xs py-2 px-4 flex items-center gap-2 cursor-pointer">
          <Upload size={13} />
          {busy ? 'Uploading…' : value ? 'Replace' : 'Upload'}
          <input
            type="file"
            accept="image/*"
            className="hidden"
            disabled={busy}
            onChange={(e) => handleFile(e.target.files?.[0])}
          />
        </label>
      </div>
      {error && <p className="text-xs text-error mt-1">{error}</p>}
    </div>
  );
}

function LessonEditor({
  lesson,
  onChanged,
}: {
  lesson: Lesson;
  onChanged: () => void;
}) {
  const [form, setForm] = useState({
    title: lesson.title,
    slug: lesson.slug,
    description: lesson.description || '',
    content: lesson.content || '',
    key_takeaway: lesson.key_takeaway || '',
    practical_example: lesson.practical_example || '',
    is_preview: lesson.is_preview,
    video_url: lesson.video_url || '',
    video_duration: lesson.video_duration || 0,
    thumbnail_url: lesson.thumbnail_url || '',
  });
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  function set<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleVideoFile(file: File | undefined) {
    if (!file) return;
    setUploading(true);
    setMessage(null);
    try {
      const duration = await readVideoDuration(file);
      const ref = await uploadCourseVideo(`lesson-${lesson.id}`, file);
      const supabase = createClient();
      const { error } = await supabase
        .from('lessons')
        .update({ video_url: ref, ...(duration ? { video_duration: duration } : {}) })
        .eq('id', lesson.id);
      if (error) throw new Error(error.message);
      set('video_url', ref);
      if (duration) set('video_duration', duration);
      setMessage('Video uploaded.');
      onChanged();
    } catch (e) {
      setMessage(e instanceof Error ? e.message : 'Upload failed');
    }
    setUploading(false);
  }

  async function handleSave() {
    setSaving(true);
    setMessage(null);
    const supabase = createClient();
    const { error } = await supabase
      .from('lessons')
      .update({
        title: form.title,
        slug: form.slug || slugify(form.title),
        description: form.description || null,
        content: form.content || null,
        key_takeaway: form.key_takeaway || null,
        practical_example: form.practical_example || null,
        is_preview: form.is_preview,
        video_duration: form.video_duration || null,
        thumbnail_url: form.thumbnail_url || null,
      })
      .eq('id', lesson.id);
    setMessage(error ? `Save failed: ${error.message}` : 'Lesson saved.');
    setSaving(false);
    if (!error) onChanged();
  }

  const hasUploadedVideo = form.video_url.startsWith('storage:');

  return (
    <div className="bg-stone-50 border border-stone-200 p-5 space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Title</label>
          <input value={form.title} onChange={(e) => set('title', e.target.value)} className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Slug</label>
          <input value={form.slug} onChange={(e) => set('slug', e.target.value)} className={inputClass} />
        </div>
      </div>
      <div>
        <label className={labelClass}>Lesson text</label>
        <textarea value={form.content} onChange={(e) => set('content', e.target.value)} rows={4} className={inputClass} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Key takeaway</label>
          <textarea value={form.key_takeaway} onChange={(e) => set('key_takeaway', e.target.value)} rows={2} className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Try this (practical example)</label>
          <textarea value={form.practical_example} onChange={(e) => set('practical_example', e.target.value)} rows={2} className={inputClass} />
        </div>
      </div>

      {/* Video */}
      <div className="border border-stone-200 bg-white p-4">
        <div className="flex items-center gap-2 mb-2">
          <Film size={14} className="text-stone-500" />
          <span className="text-xs uppercase tracking-wider text-stone-500">Video</span>
        </div>
        <p className="text-xs text-stone-500 mb-3">
          {hasUploadedVideo
            ? `Uploaded video on file${form.video_duration ? ` — ${Math.round(form.video_duration / 60)} min` : ''}.`
            : form.video_url
              ? `External video: ${form.video_url}`
              : 'No video yet.'}
        </p>
        <label className="btn-secondary text-xs py-2 px-4 inline-flex items-center gap-2 cursor-pointer">
          <Video size={13} />
          {uploading ? 'Uploading… (keep this tab open)' : hasUploadedVideo || form.video_url ? 'Replace video' : 'Upload video'}
          <input
            type="file"
            accept="video/*"
            className="hidden"
            disabled={uploading}
            onChange={(e) => handleVideoFile(e.target.files?.[0])}
          />
        </label>
      </div>

      <div className="flex flex-col md:flex-row md:items-end gap-4">
        <div className="flex-1">
          <ImageUploadField
            label="Thumbnail"
            value={form.thumbnail_url || null}
            prefix={`lesson-thumb-${lesson.id}`}
            onUploaded={(url) => set('thumbnail_url', url)}
          />
        </div>
        <div>
          <label className={labelClass}>Duration (minutes)</label>
          <input
            type="number"
            min={0}
            value={form.video_duration ? Math.round(form.video_duration / 60) : ''}
            onChange={(e) => set('video_duration', Number(e.target.value) * 60)}
            className={inputClass}
          />
        </div>
        <label className="flex items-center gap-2 text-sm text-stone-700 pb-2">
          <input
            type="checkbox"
            checked={form.is_preview}
            onChange={(e) => set('is_preview', e.target.checked)}
          />
          Free preview
        </label>
      </div>

      <div className="flex items-center gap-4">
        <button onClick={handleSave} disabled={saving} className="btn-primary text-xs py-2.5 px-6">
          {saving ? 'Saving…' : 'Save Lesson'}
        </button>
        {message && <p className="text-xs text-stone-500">{message}</p>}
      </div>
    </div>
  );
}

function ModuleEditor({
  module: mod,
  isFirst,
  isLast,
  onChanged,
}: {
  module: ModuleWithLessons;
  isFirst: boolean;
  isLast: boolean;
  onChanged: () => void;
}) {
  const [title, setTitle] = useState(mod.title);
  const [openLesson, setOpenLesson] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const supabase = createClient();
  const lessons = [...(mod.lessons || [])].sort((a, b) => a.order_index - b.order_index);

  async function saveTitle() {
    if (title === mod.title) return;
    await supabase.from('modules').update({ title }).eq('id', mod.id);
    onChanged();
  }

  async function move(direction: -1 | 1) {
    setBusy(true);
    await supabase
      .from('modules')
      .update({ order_index: mod.order_index + direction })
      .eq('id', mod.id);
    // The neighbour swaps into this module's old position
    const { data: neighbour } = await supabase
      .from('modules')
      .select('id')
      .eq('course_id', mod.course_id)
      .eq('order_index', mod.order_index + direction)
      .neq('id', mod.id)
      .limit(1)
      .single();
    if (neighbour) {
      await supabase.from('modules').update({ order_index: mod.order_index }).eq('id', neighbour.id);
    }
    setBusy(false);
    onChanged();
  }

  async function removeModule() {
    if (!window.confirm(`Delete module "${mod.title}" and all its lessons? This cannot be undone.`)) return;
    setBusy(true);
    await supabase.from('modules').delete().eq('id', mod.id);
    setBusy(false);
    onChanged();
  }

  async function addLesson() {
    setBusy(true);
    const orderIndex = lessons.length ? lessons[lessons.length - 1].order_index + 1 : 0;
    await supabase.from('lessons').insert({
      module_id: mod.id,
      title: 'New lesson',
      slug: `new-lesson-${orderIndex + 1}`,
      order_index: orderIndex,
    });
    setBusy(false);
    onChanged();
  }

  async function removeLesson(lesson: Lesson) {
    if (!window.confirm(`Delete lesson "${lesson.title}"? This cannot be undone.`)) return;
    setBusy(true);
    await supabase.from('lessons').delete().eq('id', lesson.id);
    setBusy(false);
    onChanged();
  }

  async function moveLesson(lesson: Lesson, direction: -1 | 1) {
    setBusy(true);
    const idx = lessons.findIndex((l) => l.id === lesson.id);
    const neighbour = lessons[idx + direction];
    if (neighbour) {
      await supabase.from('lessons').update({ order_index: neighbour.order_index }).eq('id', lesson.id);
      await supabase.from('lessons').update({ order_index: lesson.order_index }).eq('id', neighbour.id);
    }
    setBusy(false);
    onChanged();
  }

  return (
    <div className="bg-white border border-stone-200 mb-4">
      <div className="px-5 py-3 bg-stone-50 border-b border-stone-200 flex items-center gap-3">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onBlur={saveTitle}
          className="flex-1 bg-transparent text-sm font-medium text-stone-900 border border-transparent hover:border-stone-300 focus:border-stone-300 px-2 py-1"
        />
        <button onClick={() => move(-1)} disabled={busy || isFirst} className="text-stone-400 hover:text-stone-700 disabled:opacity-30 p-1" aria-label="Move module up">
          <ChevronUp size={15} />
        </button>
        <button onClick={() => move(1)} disabled={busy || isLast} className="text-stone-400 hover:text-stone-700 disabled:opacity-30 p-1" aria-label="Move module down">
          <ChevronDown size={15} />
        </button>
        <button onClick={removeModule} disabled={busy} className="text-stone-400 hover:text-error p-1" aria-label="Delete module">
          <Trash2 size={15} />
        </button>
      </div>

      <div>
        {lessons.map((lesson, i) => (
          <div key={lesson.id} className="border-b border-stone-100 last:border-0">
            <div className="px-5 py-2.5 flex items-center gap-3 text-sm">
              <span className="text-stone-400 text-xs w-4">{i + 1}</span>
              <button
                onClick={() => setOpenLesson(openLesson === lesson.id ? null : lesson.id)}
                className="flex-1 text-left text-stone-700 hover:text-stone-900"
              >
                {lesson.title}
              </button>
              {lesson.video_url && <Film size={13} className="text-accent" />}
              {lesson.is_preview && (
                <span className="text-[10px] uppercase tracking-wider text-accent bg-accent/10 px-1.5 py-0.5">Preview</span>
              )}
              <button onClick={() => moveLesson(lesson, -1)} disabled={busy || i === 0} className="text-stone-400 hover:text-stone-700 disabled:opacity-30 p-1" aria-label="Move lesson up">
                <ChevronUp size={14} />
              </button>
              <button onClick={() => moveLesson(lesson, 1)} disabled={busy || i === lessons.length - 1} className="text-stone-400 hover:text-stone-700 disabled:opacity-30 p-1" aria-label="Move lesson down">
                <ChevronDown size={14} />
              </button>
              <button onClick={() => removeLesson(lesson)} disabled={busy} className="text-stone-400 hover:text-error p-1" aria-label="Delete lesson">
                <Trash2 size={14} />
              </button>
            </div>
            {openLesson === lesson.id && (
              <div className="px-5 pb-4">
                <LessonEditor lesson={lesson} onChanged={onChanged} />
              </div>
            )}
          </div>
        ))}
        <div className="px-5 py-3">
          <button onClick={addLesson} disabled={busy} className="text-xs text-accent hover:text-accent-dark flex items-center gap-1.5">
            <Plus size={13} /> Add lesson
          </button>
        </div>
      </div>
    </div>
  );
}

export default function CourseDetailEditor({ course }: { course: CourseWithModules }) {
  const router = useRouter();
  const [form, setForm] = useState({
    title: course.title,
    slug: course.slug,
    subtitle: course.subtitle || '',
    description: course.description || '',
    long_description: course.long_description || '',
    price: course.price,
    status: course.status,
    image_url: course.image_url || '',
    instructor_name: course.instructor_name || '',
    instructor_bio: course.instructor_bio || '',
    instructor_image_url: course.instructor_image_url || '',
    meta_title: course.meta_title || '',
    meta_description: course.meta_description || '',
  });
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const modules = [...course.modules].sort((a, b) => a.order_index - b.order_index);

  function set<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function refresh() {
    router.refresh();
  }

  async function handleSaveCourse() {
    setSaving(true);
    setMessage(null);
    const supabase = createClient();
    const { error } = await supabase
      .from('courses')
      .update({
        title: form.title,
        slug: form.slug || slugify(form.title),
        subtitle: form.subtitle || null,
        description: form.description || null,
        long_description: form.long_description || null,
        price: form.price,
        status: form.status,
        image_url: form.image_url || null,
        instructor_name: form.instructor_name || null,
        instructor_bio: form.instructor_bio || null,
        instructor_image_url: form.instructor_image_url || null,
        meta_title: form.meta_title || null,
        meta_description: form.meta_description || null,
      })
      .eq('id', course.id);
    setMessage(error ? `Save failed: ${error.message}` : 'Course saved.');
    setSaving(false);
    if (!error) refresh();
  }

  async function addModule() {
    setBusy(true);
    const supabase = createClient();
    const orderIndex = modules.length ? modules[modules.length - 1].order_index + 1 : 0;
    await supabase.from('modules').insert({
      course_id: course.id,
      title: 'New module',
      order_index: orderIndex,
    });
    setBusy(false);
    refresh();
  }

  async function saveImage(key: 'image_url' | 'instructor_image_url', url: string) {
    set(key, url);
    const supabase = createClient();
    await supabase.from('courses').update({ [key]: url }).eq('id', course.id);
    refresh();
  }

  return (
    <div className="max-w-3xl">
      {/* Course fields */}
      <section className="bg-white border border-stone-200 p-6 mb-8">
        <h2 className="text-sm font-medium text-stone-900 mb-5">Course Details</h2>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Title</label>
              <input value={form.title} onChange={(e) => set('title', e.target.value)} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Slug</label>
              <input value={form.slug} onChange={(e) => set('slug', e.target.value)} className={inputClass} />
            </div>
          </div>
          <div>
            <label className={labelClass}>Subtitle</label>
            <input value={form.subtitle} onChange={(e) => set('subtitle', e.target.value)} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Short description</label>
            <textarea value={form.description} onChange={(e) => set('description', e.target.value)} rows={2} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Long description</label>
            <textarea value={form.long_description} onChange={(e) => set('long_description', e.target.value)} rows={5} className={inputClass} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Price (€)</label>
              <input
                type="number"
                min={0}
                value={form.price / 100}
                onChange={(e) => set('price', Math.round(Number(e.target.value) * 100))}
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Status</label>
              <select
                value={form.status}
                onChange={(e) => set('status', e.target.value as typeof form.status)}
                className={inputClass}
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
                <option value="archived">Archived</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ImageUploadField
              label="Course image"
              value={form.image_url || null}
              prefix={`course-${course.id}`}
              onUploaded={(url) => saveImage('image_url', url)}
            />
            <ImageUploadField
              label="Instructor photo"
              value={form.instructor_image_url || null}
              prefix={`instructor-${course.id}`}
              onUploaded={(url) => saveImage('instructor_image_url', url)}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Instructor name</label>
              <input value={form.instructor_name} onChange={(e) => set('instructor_name', e.target.value)} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Meta title (SEO)</label>
              <input value={form.meta_title} onChange={(e) => set('meta_title', e.target.value)} className={inputClass} />
            </div>
          </div>
          <div>
            <label className={labelClass}>Instructor bio</label>
            <textarea value={form.instructor_bio} onChange={(e) => set('instructor_bio', e.target.value)} rows={3} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Meta description (SEO)</label>
            <textarea value={form.meta_description} onChange={(e) => set('meta_description', e.target.value)} rows={2} className={inputClass} />
          </div>
        </div>
        <div className="flex items-center gap-4 mt-6">
          <button onClick={handleSaveCourse} disabled={saving} className="btn-primary text-xs py-3 px-8">
            {saving ? 'Saving…' : 'Save Course'}
          </button>
          {message && <p className="text-sm text-stone-500">{message}</p>}
        </div>
      </section>

      {/* Modules & lessons */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-medium text-stone-900">Modules &amp; Lessons</h2>
          <button onClick={addModule} disabled={busy} className="btn-secondary text-xs py-2 px-4 flex items-center gap-2">
            <Plus size={13} /> Add module
          </button>
        </div>
        {modules.map((mod, i) => (
          <ModuleEditor
            key={mod.id}
            module={mod}
            isFirst={i === 0}
            isLast={i === modules.length - 1}
            onChanged={refresh}
          />
        ))}
        {modules.length === 0 && (
          <p className="text-sm text-stone-500">No modules yet — add the first one.</p>
        )}
      </section>
    </div>
  );
}

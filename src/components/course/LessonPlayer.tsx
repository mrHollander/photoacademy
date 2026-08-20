'use client';

import Link from 'next/link';
import { useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Circle,
  Lightbulb,
  Target,
  Upload,
  ArrowLeft,
} from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { trackEvent } from '@/lib/analytics';
import type { Lesson, Assignment } from '@/types';

interface Props {
  lesson: Lesson;
  moduleTitle: string;
  courseSlug: string;
  prev: Lesson | null;
  next: Lesson | null;
  completed: boolean;
  isPreview: boolean;
  hasAccess: boolean;
  userId?: string;
  assignments: Assignment[];
}

export default function LessonPlayer({
  lesson,
  moduleTitle,
  courseSlug,
  prev,
  next,
  completed: initialCompleted,
  isPreview,
  hasAccess,
  userId,
  assignments,
}: Props) {
  const [completed, setCompleted] = useState(initialCompleted);
  const [saving, setSaving] = useState(false);

  async function toggleComplete() {
    if (!userId) return;
    setSaving(true);

    const supabase = createClient();
    const newCompleted = !completed;

    const { error } = await supabase.from('lesson_progress').upsert(
      {
        user_id: userId,
        lesson_id: lesson.id,
        completed: newCompleted,
        completed_at: newCompleted ? new Date().toISOString() : null,
        last_watched_at: new Date().toISOString(),
      },
      { onConflict: 'user_id,lesson_id' }
    );

    if (!error) {
      setCompleted(newCompleted);
      if (newCompleted) {
        trackEvent('lesson_completed', { lesson_id: lesson.id, lesson_title: lesson.title });
      }
    }
    setSaving(false);
  }

  return (
    <div className="flex-1 min-w-0">
      {/* Top bar */}
      <div className="sticky top-0 z-10 bg-warm-50/95 backdrop-blur-sm border-b border-stone-200 px-5 lg:px-10 py-3 flex items-center justify-between">
        <Link
          href={`/course/${courseSlug}`}
          className="flex items-center gap-2 text-sm text-stone-500 hover:text-stone-700 transition-colors"
        >
          <ArrowLeft size={16} />
          <span className="hidden sm:inline">Course Overview</span>
        </Link>

        {userId && (
          <button
            onClick={toggleComplete}
            disabled={saving}
            className={`flex items-center gap-2 text-sm transition-colors ${
              completed ? 'text-success' : 'text-stone-400 hover:text-stone-600'
            }`}
          >
            {completed ? <CheckCircle2 size={18} /> : <Circle size={18} />}
            <span className="hidden sm:inline">{completed ? 'Completed' : 'Mark as Complete'}</span>
          </button>
        )}
      </div>

      <div className="max-w-3xl mx-auto px-5 lg:px-10 py-8 lg:py-12">
        {/* Module label */}
        <p className="text-xs uppercase tracking-widest text-accent mb-3">{moduleTitle}</p>

        <h1 className="heading-display text-2xl lg:text-3xl text-stone-900 mb-6">{lesson.title}</h1>

        {/* Video */}
        <div className="video-container mb-8">
          {lesson.video_url ? (
            <iframe
              src={lesson.video_url}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="border-0"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-stone-500">
              <div className="text-center">
                <p className="text-sm">Video placeholder</p>
                <p className="text-xs text-stone-400 mt-1">Add video URL in admin</p>
              </div>
            </div>
          )}
        </div>

        {/* Lesson content */}
        {lesson.content && (
          <div className="prose-content text-base leading-relaxed mb-8">
            <p>{lesson.content}</p>
          </div>
        )}

        {/* Key takeaway */}
        {lesson.key_takeaway && (
          <div className="bg-accent/5 border-l-2 border-accent p-6 mb-8">
            <div className="flex items-start gap-3">
              <Lightbulb size={18} className="text-accent shrink-0 mt-0.5" />
              <div>
                <p className="text-xs uppercase tracking-wider text-accent mb-2 font-medium">Key Takeaway</p>
                <p className="text-sm text-stone-700 leading-relaxed">{lesson.key_takeaway}</p>
              </div>
            </div>
          </div>
        )}

        {/* Practical example */}
        {lesson.practical_example && (
          <div className="bg-stone-50 border border-stone-200 p-6 mb-8">
            <div className="flex items-start gap-3">
              <Target size={18} className="text-stone-500 shrink-0 mt-0.5" />
              <div>
                <p className="text-xs uppercase tracking-wider text-stone-500 mb-2 font-medium">Try This</p>
                <p className="text-sm text-stone-600 leading-relaxed">{lesson.practical_example}</p>
              </div>
            </div>
          </div>
        )}

        {/* Assignments */}
        {assignments.length > 0 && (
          <div className="border border-stone-200 p-6 mb-8">
            <div className="flex items-start gap-3">
              <Upload size={18} className="text-stone-500 shrink-0 mt-0.5" />
              <div>
                <p className="text-xs uppercase tracking-wider text-stone-500 mb-2 font-medium">Assignment</p>
                {assignments.map((a) => (
                  <div key={a.id}>
                    <p className="text-sm font-medium text-stone-900 mb-1">{a.title}</p>
                    <p className="text-sm text-stone-600 leading-relaxed">{a.instructions}</p>
                    <p className="text-xs text-stone-400 mt-3 italic">
                      Photo upload and AI feedback coming soon.
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="flex items-center justify-between pt-8 border-t border-stone-200 mt-12">
          {prev ? (
            <Link
              href={`/course/${courseSlug}/lesson/${prev.slug}`}
              className="flex items-center gap-2 text-sm text-stone-500 hover:text-stone-700 transition-colors"
            >
              <ChevronLeft size={16} />
              <div className="text-left">
                <p className="text-xs text-stone-400">Previous</p>
                <p className="text-stone-600 hidden sm:block">{prev.title}</p>
              </div>
            </Link>
          ) : (
            <div />
          )}
          {next ? (
            <Link
              href={`/course/${courseSlug}/lesson/${next.slug}`}
              className="flex items-center gap-2 text-sm text-stone-500 hover:text-stone-700 transition-colors"
            >
              <div className="text-right">
                <p className="text-xs text-stone-400">Next</p>
                <p className="text-stone-600 hidden sm:block">{next.title}</p>
              </div>
              <ChevronRight size={16} />
            </Link>
          ) : (
            <div />
          )}
        </div>

        {/* Preview banner */}
        {isPreview && !hasAccess && (
          <div className="mt-8 bg-stone-900 text-white p-6 text-center">
            <p className="text-sm mb-3">This is a free preview lesson. Enroll to access all {30} lessons.</p>
            <Link href={`/checkout?course=${courseSlug}`} className="btn-accent text-xs py-2.5 px-8">
              Start the Course — €69
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

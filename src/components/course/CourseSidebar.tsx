'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { X, Menu, CheckCircle2, Circle, PlayCircle, Lock } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import type { CourseWithModules } from '@/types';

interface Props {
  course: CourseWithModules;
  currentLessonSlug: string;
  userId?: string;
}

export default function CourseSidebar({ course, currentLessonSlug, userId }: Props) {
  const [open, setOpen] = useState(false);
  const [progress, setProgress] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (!userId) return;
    const supabase = createClient();
    const allLessonIds = course.modules.flatMap((m) => m.lessons?.map((l) => l.id) || []);

    supabase
      .from('lesson_progress')
      .select('lesson_id, completed')
      .eq('user_id', userId)
      .in('lesson_id', allLessonIds)
      .then(({ data }) => {
        const map: Record<string, boolean> = {};
        data?.forEach((p) => (map[p.lesson_id] = p.completed));
        setProgress(map);
      });
  }, [userId, course.modules]);

  const totalLessons = course.modules.reduce((s, m) => s + (m.lessons?.length || 0), 0);
  const completedCount = Object.values(progress).filter(Boolean).length;
  const pct = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;

  const sidebar = (
    <div className="h-full flex flex-col bg-white border-r border-stone-200 overflow-y-auto">
      <div className="p-5 border-b border-stone-200 sticky top-0 bg-white z-10">
        <div className="flex items-center justify-between mb-3">
          <Link href={`/course/${course.slug}`} className="font-display text-base text-stone-900">
            {course.title}
          </Link>
          <button onClick={() => setOpen(false)} className="lg:hidden p-1">
            <X size={18} />
          </button>
        </div>
        {userId && (
          <div>
            <div className="flex items-center justify-between text-xs text-stone-500 mb-1.5">
              <span>{completedCount}/{totalLessons} lessons</span>
              <span>{pct}%</span>
            </div>
            <div className="progress-bar">
              <div className="progress-bar-fill" style={{ width: `${pct}%` }} />
            </div>
          </div>
        )}
      </div>

      <nav className="flex-1 py-2">
        {course.modules.map((mod) => (
          <div key={mod.id} className="mb-1">
            <p className="px-5 py-3 text-xs uppercase tracking-wider text-stone-400 font-medium">
              {mod.title}
            </p>
            {mod.lessons?.map((lesson) => {
              const isActive = lesson.slug === currentLessonSlug;
              const done = progress[lesson.id];

              return (
                <Link
                  key={lesson.id}
                  href={`/course/${course.slug}/lesson/${lesson.slug}`}
                  onClick={() => setOpen(false)}
                  className={`flex items-center gap-3 px-5 py-2.5 text-sm transition-colors ${
                    isActive
                      ? 'bg-accent/5 text-accent border-l-2 border-accent'
                      : 'text-stone-600 hover:bg-stone-50 border-l-2 border-transparent'
                  }`}
                >
                  {done ? (
                    <CheckCircle2 size={15} className="text-success shrink-0" />
                  ) : lesson.is_preview ? (
                    <PlayCircle size={15} className="text-accent shrink-0" />
                  ) : (
                    <Circle size={15} className="text-stone-300 shrink-0" />
                  )}
                  <span className="truncate">{lesson.title}</span>
                </Link>
              );
            })}
          </div>
        ))}
      </nav>
    </div>
  );

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setOpen(true)}
        className="lg:hidden fixed bottom-6 left-6 z-50 bg-stone-900 text-white p-3 shadow-lg"
        aria-label="Open lesson navigation"
      >
        <Menu size={20} />
      </button>

      {/* Mobile overlay */}
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setOpen(false)} />
          <div className="absolute left-0 top-0 bottom-0 w-80 max-w-[85vw]">{sidebar}</div>
        </div>
      )}

      {/* Desktop sidebar */}
      <div className="hidden lg:block w-80 shrink-0 sticky top-0 h-screen">{sidebar}</div>
    </>
  );
}

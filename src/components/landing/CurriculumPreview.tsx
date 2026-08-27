'use client';

import { useState } from 'react';
import { ChevronDown, PlayCircle, Lock } from 'lucide-react';
import type { ModuleWithLessons } from '@/types';

interface Props {
  modules: ModuleWithLessons[];
}

function formatDuration(seconds: number | null): string {
  if (!seconds) return '';
  return `${Math.max(1, Math.round(seconds / 60))} min`;
}

export default function CurriculumPreview({ modules }: Props) {
  const [openModule, setOpenModule] = useState(0);

  const allLessons = modules.flatMap((m) => m.lessons || []);
  const totalLessons = allLessons.length;
  const totalMinutes = Math.round(
    allLessons.reduce((sum, l) => sum + (l.video_duration || 0), 0) / 60
  );

  if (modules.length === 0) return null;

  return (
    <section id="curriculum" className="section-padding py-20 lg:py-32 bg-stone-50">
      <div className="max-w-3xl mx-auto">
        <p className="text-xs uppercase tracking-widest text-accent mb-4">Course Curriculum</p>
        <h2 className="heading-display text-3xl lg:text-4xl text-stone-900 mb-3">
          {modules.length} modules. {totalLessons} lessons.
        </h2>
        <p className="text-stone-500 mb-12">
          {totalMinutes > 0 ? `Around ${totalMinutes} minutes of practical, visual instruction. ` : ''}
          Every lesson is short enough to watch during a break.
        </p>

        <div className="space-y-px">
          {modules.map((mod, i) => (
            <div key={mod.id} className="bg-white border border-stone-200">
              <button
                onClick={() => setOpenModule(openModule === i ? -1 : i)}
                className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-stone-50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <span className="text-xs text-stone-400 font-medium w-5">{i + 1}</span>
                  <span className="text-sm font-medium text-stone-900">{mod.title}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-stone-400">{mod.lessons?.length || 0} lessons</span>
                  <ChevronDown
                    size={16}
                    className={`text-stone-400 transition-transform ${openModule === i ? 'rotate-180' : ''}`}
                  />
                </div>
              </button>
              {openModule === i && (
                <div className="border-t border-stone-100 px-6 py-2">
                  {(mod.lessons || []).map((lesson) => (
                    <div key={lesson.id} className="flex items-center justify-between py-3">
                      <div className="flex items-center gap-3">
                        {lesson.is_preview ? (
                          <PlayCircle size={16} className="text-accent" />
                        ) : (
                          <Lock size={14} className="text-stone-300" />
                        )}
                        <span className={`text-sm ${lesson.is_preview ? 'text-stone-900' : 'text-stone-500'}`}>
                          {lesson.title}
                        </span>
                        {lesson.is_preview && (
                          <span className="text-[10px] uppercase tracking-wider text-accent bg-accent/10 px-2 py-0.5">
                            Preview
                          </span>
                        )}
                      </div>
                      <span className="text-xs text-stone-400">{formatDuration(lesson.video_duration)}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

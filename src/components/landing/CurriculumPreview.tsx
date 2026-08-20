'use client';

import { useState } from 'react';
import { ChevronDown, PlayCircle, Lock } from 'lucide-react';

const curriculum = [
  {
    title: 'Get Better Results Immediately',
    lessons: [
      { title: 'The Only Phone Camera Settings That Matter', duration: '6 min', preview: true },
      { title: 'Which Lens to Use and When', duration: '7 min', preview: true },
      { title: 'Common Mistakes That Make Photos Look Amateur', duration: '5 min' },
      { title: 'Why Digital Zoom Should Usually Be Avoided', duration: '4 min' },
    ],
  },
  {
    title: 'Light',
    lessons: [
      { title: 'The Easiest Good Light Inside Your Home', duration: '6 min' },
      { title: 'Window Light', duration: '7 min' },
      { title: 'Why Ceiling Lights Often Make Photos Look Bad', duration: '5 min' },
      { title: 'Backlighting', duration: '6 min' },
      { title: 'Outdoor Light and Golden Hour', duration: '8 min' },
    ],
  },
  {
    title: 'Composition',
    lessons: [
      { title: 'Where to Place the Subject', duration: '6 min' },
      { title: 'How Much Background to Include', duration: '5 min' },
      { title: 'Camera Height Changes Everything', duration: '6 min' },
      { title: 'Creating Depth', duration: '6 min' },
    ],
  },
  {
    title: 'Photographing People',
    lessons: [
      { title: 'Better Portraits With Your Phone', duration: '7 min' },
      { title: 'Natural Poses and Expressions', duration: '6 min' },
      { title: 'Photographing Children', duration: '7 min' },
      { title: 'Avoiding Distorted Faces', duration: '4 min' },
    ],
  },
  {
    title: 'Everyday Situations',
    lessons: [
      { title: 'Indoor Family Moments', duration: '6 min' },
      { title: 'Restaurants and Cafés', duration: '5 min' },
      { title: 'Travel Photography', duration: '8 min' },
      { title: 'Food Photography', duration: '5 min' },
    ],
  },
  {
    title: 'Editing',
    lessons: [
      { title: 'Exposure, Contrast, and Color', duration: '6 min' },
      { title: 'Highlights, Shadows, and Cropping', duration: '6 min' },
      { title: 'A Fast 60-Second Editing Workflow', duration: '5 min', preview: true },
    ],
  },
  {
    title: 'Before and After',
    lessons: [
      { title: 'Lens Choice Comparison', duration: '5 min' },
      { title: 'Light Position Change', duration: '5 min' },
      { title: 'Camera Height and Background', duration: '5 min' },
    ],
  },
  {
    title: 'Practical Challenges',
    lessons: [
      { title: 'Window Light Portrait Challenge', duration: '3 min' },
      { title: 'Lens Comparison Challenge', duration: '3 min' },
      { title: '60-Second Edit Challenge', duration: '3 min' },
    ],
  },
];

export default function CurriculumPreview() {
  const [openModule, setOpenModule] = useState(0);

  const totalLessons = curriculum.reduce((sum, m) => sum + m.lessons.length, 0);
  const totalMinutes = curriculum
    .flatMap((m) => m.lessons)
    .reduce((sum, l) => sum + parseInt(l.duration), 0);

  return (
    <section id="curriculum" className="section-padding py-20 lg:py-32 bg-stone-50">
      <div className="max-w-3xl mx-auto">
        <p className="text-xs uppercase tracking-widest text-accent mb-4">Course Curriculum</p>
        <h2 className="heading-display text-3xl lg:text-4xl text-stone-900 mb-3">
          {curriculum.length} modules. {totalLessons} lessons.
        </h2>
        <p className="text-stone-500 mb-12">
          Around {totalMinutes} minutes of practical, visual instruction. Every lesson is short enough to watch during a break.
        </p>

        <div className="space-y-px">
          {curriculum.map((mod, i) => (
            <div key={i} className="bg-white border border-stone-200">
              <button
                onClick={() => setOpenModule(openModule === i ? -1 : i)}
                className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-stone-50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <span className="text-xs text-stone-400 font-medium w-5">{i + 1}</span>
                  <span className="text-sm font-medium text-stone-900">{mod.title}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-stone-400">{mod.lessons.length} lessons</span>
                  <ChevronDown
                    size={16}
                    className={`text-stone-400 transition-transform ${openModule === i ? 'rotate-180' : ''}`}
                  />
                </div>
              </button>
              {openModule === i && (
                <div className="border-t border-stone-100 px-6 py-2">
                  {mod.lessons.map((lesson, j) => (
                    <div key={j} className="flex items-center justify-between py-3">
                      <div className="flex items-center gap-3">
                        {lesson.preview ? (
                          <PlayCircle size={16} className="text-accent" />
                        ) : (
                          <Lock size={14} className="text-stone-300" />
                        )}
                        <span className={`text-sm ${lesson.preview ? 'text-stone-900' : 'text-stone-500'}`}>
                          {lesson.title}
                        </span>
                        {lesson.preview && (
                          <span className="text-[10px] uppercase tracking-wider text-accent bg-accent/10 px-2 py-0.5">
                            Preview
                          </span>
                        )}
                      </div>
                      <span className="text-xs text-stone-400">{lesson.duration}</span>
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

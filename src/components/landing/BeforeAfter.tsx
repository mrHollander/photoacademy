'use client';

import { useState } from 'react';

interface BeforeAfterProps {
  label: string;
  change: string;
  beforeColor: string;
  afterColor: string;
}

export function BeforeAfterCard({ label, change, beforeColor, afterColor }: BeforeAfterProps) {
  const [showAfter, setShowAfter] = useState(false);

  return (
    <div className="group">
      <div
        className="relative aspect-[4/3] cursor-pointer overflow-hidden"
        onClick={() => setShowAfter(!showAfter)}
        role="button"
        tabIndex={0}
        aria-label={`Toggle before and after: ${label}`}
      >
        {/* Placeholder images - replace with real photography */}
        <div
          className={`absolute inset-0 transition-opacity duration-500 flex items-center justify-center ${
            showAfter ? 'opacity-0' : 'opacity-100'
          }`}
          style={{ backgroundColor: beforeColor }}
        >
          <div className="text-center text-white/80">
            <p className="text-xs uppercase tracking-widest mb-1">Before</p>
            <p className="text-sm opacity-60">Tap to compare</p>
          </div>
        </div>
        <div
          className={`absolute inset-0 transition-opacity duration-500 flex items-center justify-center ${
            showAfter ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ backgroundColor: afterColor }}
        >
          <div className="text-center text-white/80">
            <p className="text-xs uppercase tracking-widest mb-1">After</p>
            <p className="text-sm opacity-60">Tap to compare</p>
          </div>
        </div>

        {/* Toggle indicator */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
          <div className={`w-1.5 h-1.5 rounded-full transition-colors ${!showAfter ? 'bg-white' : 'bg-white/40'}`} />
          <div className={`w-1.5 h-1.5 rounded-full transition-colors ${showAfter ? 'bg-white' : 'bg-white/40'}`} />
        </div>
      </div>
      <div className="mt-4">
        <p className="text-sm font-medium text-stone-900">{label}</p>
        <p className="text-sm text-stone-500 mt-0.5">{change}</p>
      </div>
    </div>
  );
}

export default function BeforeAfterSection() {
  const examples = [
    {
      label: 'Portrait lens choice',
      change: 'Used 2x instead of 0.5x',
      beforeColor: '#7a6f63',
      afterColor: '#a08b6f',
    },
    {
      label: 'Window light positioning',
      change: 'Moved closer to the window',
      beforeColor: '#5a5148',
      afterColor: '#c4a882',
    },
    {
      label: 'Camera height',
      change: 'Lowered the phone to eye level',
      beforeColor: '#6b5e52',
      afterColor: '#b09878',
    },
    {
      label: 'Background simplification',
      change: 'Removed distracting background',
      beforeColor: '#8a7d6f',
      afterColor: '#d4c4a8',
    },
  ];

  return (
    <section className="section-padding py-20 lg:py-32">
      <div className="max-w-6xl mx-auto">
        <p className="text-xs uppercase tracking-widest text-accent mb-4">See the Difference</p>
        <h2 className="heading-display text-3xl lg:text-4xl text-stone-900 mb-4">
          One small change. <em className="italic">Dramatically</em> better photos.
        </h2>
        <p className="text-stone-500 mb-12 max-w-lg">
          Each of these improvements took less than five seconds. No editing. No special equipment. Just a simple adjustment anyone can learn.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {examples.map((ex) => (
            <BeforeAfterCard key={ex.label} {...ex} />
          ))}
        </div>
      </div>
    </section>
  );
}

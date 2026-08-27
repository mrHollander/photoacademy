'use client';

import { useState } from 'react';
import Image from 'next/image';

export interface BeforeAfterExample {
  label: string;
  change: string;
  beforeUrl: string;
  afterUrl: string;
  beforeColor: string;
  afterColor: string;
}

function Pane({
  visible,
  url,
  alt,
  color,
  caption,
}: {
  visible: boolean;
  url: string;
  alt: string;
  color: string;
  caption: string;
}) {
  return (
    <div
      className={`absolute inset-0 transition-opacity duration-500 ${
        visible ? 'opacity-100' : 'opacity-0'
      }`}
      style={url ? undefined : { backgroundColor: color }}
    >
      {url ? (
        <Image src={url} alt={alt} fill sizes="(max-width: 640px) 100vw, 25vw" className="object-cover" />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white/80">
            <p className="text-xs uppercase tracking-widest mb-1">{caption}</p>
            <p className="text-sm opacity-60">Tap to compare</p>
          </div>
        </div>
      )}
    </div>
  );
}

export function BeforeAfterCard(ex: BeforeAfterExample) {
  const [showAfter, setShowAfter] = useState(false);

  return (
    <div className="group">
      <div
        className="relative aspect-[4/3] cursor-pointer overflow-hidden"
        onClick={() => setShowAfter(!showAfter)}
        role="button"
        tabIndex={0}
        aria-label={`Toggle before and after: ${ex.label}`}
      >
        <Pane visible={!showAfter} url={ex.beforeUrl} alt={`Before: ${ex.label}`} color={ex.beforeColor} caption="Before" />
        <Pane visible={showAfter} url={ex.afterUrl} alt={`After: ${ex.label}`} color={ex.afterColor} caption="After" />

        {/* Toggle indicator */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
          <div className={`w-1.5 h-1.5 rounded-full transition-colors ${!showAfter ? 'bg-white' : 'bg-white/40'}`} />
          <div className={`w-1.5 h-1.5 rounded-full transition-colors ${showAfter ? 'bg-white' : 'bg-white/40'}`} />
        </div>
      </div>
      <div className="mt-4">
        <p className="text-sm font-medium text-stone-900">{ex.label}</p>
        <p className="text-sm text-stone-500 mt-0.5">{ex.change}</p>
      </div>
    </div>
  );
}

interface Props {
  eyebrow: string;
  title: string;
  text: string;
  examples: BeforeAfterExample[];
}

export default function BeforeAfterSection({ eyebrow, title, text, examples }: Props) {
  return (
    <section className="section-padding py-20 lg:py-32">
      <div className="max-w-6xl mx-auto">
        <p className="text-xs uppercase tracking-widest text-accent mb-4">{eyebrow}</p>
        <h2 className="heading-display text-3xl lg:text-4xl text-stone-900 mb-4">{title}</h2>
        <p className="text-stone-500 mb-12 max-w-lg">{text}</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {examples.map((ex) => (
            <BeforeAfterCard key={ex.label} {...ex} />
          ))}
        </div>
      </div>
    </section>
  );
}

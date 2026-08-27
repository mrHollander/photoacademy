'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import type { FaqItem } from '@/lib/content-shared';

interface Props {
  eyebrow: string;
  title: string;
  items: FaqItem[];
}

export default function FAQSection({ eyebrow, title, items }: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="section-padding py-20 lg:py-32 bg-stone-50">
      <div className="max-w-2xl mx-auto">
        <p className="text-xs uppercase tracking-widest text-accent mb-4">{eyebrow}</p>
        <h2 className="heading-display text-3xl lg:text-4xl text-stone-900 mb-12">{title}</h2>

        <div className="space-y-px">
          {items.map((faq, i) => (
            <div key={i} className="bg-white border border-stone-200">
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-stone-50 transition-colors"
              >
                <span className="text-sm font-medium text-stone-900 pr-4">{faq.q}</span>
                <ChevronDown
                  size={16}
                  className={`text-stone-400 shrink-0 transition-transform ${openIndex === i ? 'rotate-180' : ''}`}
                />
              </button>
              {openIndex === i && (
                <div className="px-6 pb-5">
                  <p className="text-sm text-stone-600 leading-relaxed">{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    q: 'Do I need an iPhone?',
    a: 'No. This course works with any modern smartphone — iPhone, Samsung, Google Pixel, or any Android device with a camera. The techniques are universal.',
  },
  {
    q: 'Does this work with Android?',
    a: 'Absolutely. While some screenshots show iPhone, every technique applies equally to Android. Smartphone cameras share the same fundamental principles.',
  },
  {
    q: 'Do I need photography experience?',
    a: 'None at all. This course is designed for complete beginners. If you can take a photo with your phone, you have all the skills you need to start.',
  },
  {
    q: 'How long is the course?',
    a: 'The course contains around 30 short lessons, each between 3 and 8 minutes. You can complete the entire course in a weekend, or take one lesson per day over a month.',
  },
  {
    q: 'Can I watch it on my phone?',
    a: 'Yes. The platform is designed mobile-first. You can watch lessons on your phone, tablet, or desktop — wherever is most comfortable.',
  },
  {
    q: 'How long do I have access?',
    a: 'Lifetime. Once you purchase the course, you keep access forever — including any future updates and new lessons we add.',
  },
  {
    q: 'Is this suitable for parents?',
    a: 'This course was designed with parents in mind. Several lessons specifically cover photographing children, family moments, birthday parties, and everyday life at home.',
  },
  {
    q: 'Do I need editing software?',
    a: "No. The editing lessons use the free editing tools built into your phone's photo app. No additional apps or subscriptions required.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="section-padding py-20 lg:py-32 bg-stone-50">
      <div className="max-w-2xl mx-auto">
        <p className="text-xs uppercase tracking-widest text-accent mb-4">Common Questions</p>
        <h2 className="heading-display text-3xl lg:text-4xl text-stone-900 mb-12">
          Frequently asked questions
        </h2>

        <div className="space-y-px">
          {faqs.map((faq, i) => (
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

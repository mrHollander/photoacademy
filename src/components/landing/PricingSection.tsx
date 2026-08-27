'use client';

import Link from 'next/link';
import { Check } from 'lucide-react';
import { trackEvent } from '@/lib/analytics';
import { useEffect, useRef } from 'react';

interface Props {
  eyebrow: string;
  title: string;
  text: string;
  features: string[];
  footnote: string;
  productName: string;
  price: number; // cents
  courseSlug: string;
}

export default function PricingSection({
  eyebrow,
  title,
  text,
  features,
  footnote,
  productName,
  price,
  courseSlug,
}: Props) {
  const tracked = useRef(false);

  useEffect(() => {
    if (!tracked.current) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && !tracked.current) {
            trackEvent('pricing_view');
            tracked.current = true;
          }
        },
        { threshold: 0.5 }
      );
      const el = document.getElementById('pricing');
      if (el) observer.observe(el);
      return () => observer.disconnect();
    }
  }, []);

  const displayPrice = `€${(price / 100).toFixed(0)}`;

  return (
    <section id="pricing" className="section-padding py-20 lg:py-32">
      <div className="max-w-lg mx-auto text-center">
        <p className="text-xs uppercase tracking-widest text-accent mb-4">{eyebrow}</p>
        <h2 className="heading-display text-3xl lg:text-4xl text-stone-900 mb-4">{title}</h2>
        <p className="text-stone-500 mb-12">{text}</p>

        <div className="bg-white border border-stone-200 p-8 lg:p-12">
          <p className="text-sm uppercase tracking-wider text-stone-500 mb-2">{productName}</p>
          <div className="flex items-baseline justify-center gap-1 mb-8">
            <span className="text-5xl font-display text-stone-900">{displayPrice}</span>
            <span className="text-stone-400 text-sm">one-time</span>
          </div>

          <ul className="space-y-3 mb-10 text-left">
            {features.map((f) => (
              <li key={f} className="flex items-start gap-3">
                <Check size={16} className="text-accent mt-0.5 shrink-0" />
                <span className="text-sm text-stone-600">{f}</span>
              </li>
            ))}
          </ul>

          <Link
            href={`/checkout?course=${courseSlug}`}
            onClick={() => trackEvent('checkout_started', { course: courseSlug, price })}
            className="btn-primary w-full py-4 text-sm"
          >
            Start the Course — {displayPrice}
          </Link>

          <p className="text-xs text-stone-400 mt-4">{footnote}</p>
        </div>
      </div>
    </section>
  );
}

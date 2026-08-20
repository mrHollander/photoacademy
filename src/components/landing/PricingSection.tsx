'use client';

import Link from 'next/link';
import { Check } from 'lucide-react';
import { trackEvent } from '@/lib/analytics';
import { useEffect, useRef } from 'react';

export default function PricingSection() {
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

  const features = [
    'Lifetime access to all lessons',
    'Future lesson updates included',
    'Watch on phone, tablet, or desktop',
    'Practical challenges with every module',
    'No photography equipment required',
    'Works with any smartphone',
  ];

  return (
    <section id="pricing" className="section-padding py-20 lg:py-32">
      <div className="max-w-lg mx-auto text-center">
        <p className="text-xs uppercase tracking-widest text-accent mb-4">Start Today</p>
        <h2 className="heading-display text-3xl lg:text-4xl text-stone-900 mb-4">
          Better photos start here
        </h2>
        <p className="text-stone-500 mb-12">
          One course. Lifetime access. Immediate results.
        </p>

        <div className="bg-white border border-stone-200 p-8 lg:p-12">
          <p className="text-sm uppercase tracking-wider text-stone-500 mb-2">
            Take Beautiful Photos With Your Phone
          </p>
          <div className="flex items-baseline justify-center gap-1 mb-8">
            <span className="text-5xl font-display text-stone-900">€69</span>
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
            href="/checkout?course=phone-photography"
            onClick={() => trackEvent('checkout_started', { course: 'phone-photography', price: 6900 })}
            className="btn-primary w-full py-4 text-sm"
          >
            Start the Course — €69
          </Link>

          <p className="text-xs text-stone-400 mt-4">
            Secure payment via Stripe. 14-day money-back guarantee.
          </p>
        </div>
      </div>
    </section>
  );
}

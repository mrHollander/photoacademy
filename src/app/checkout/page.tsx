'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import Header from '@/components/layout/Header';

function CheckoutContent() {
  const searchParams = useSearchParams();
  const courseSlug = searchParams.get('course') || 'phone-photography';
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function redirect() {
      try {
        const res = await fetch('/api/checkout', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ courseSlug }),
        });

        const data = await res.json();

        if (data.redirect) {
          window.location.href = data.redirect;
          return;
        }

        if (data.url) {
          window.location.href = data.url;
        } else {
          setError(data.error || 'Something went wrong.');
          setLoading(false);
        }
      } catch {
        setError('Failed to start checkout. Please try again.');
        setLoading(false);
      }
    }

    redirect();
  }, [courseSlug]);

  return (
    <main className="min-h-screen flex items-center justify-center">
      {loading ? (
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-stone-300 border-t-stone-900 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-sm text-stone-500">Redirecting to secure checkout...</p>
        </div>
      ) : (
        <div className="text-center max-w-sm section-padding">
          <p className="text-sm text-error">{error}</p>
        </div>
      )}
    </main>
  );
}

export default function CheckoutPage() {
  return (
    <>
      <Header />
      <Suspense>
        <CheckoutContent />
      </Suspense>
    </>
  );
}

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { trackEvent } from '@/lib/analytics';
import Header from '@/components/layout/Header';

export default function SignupPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');

    const supabase = createClient();
    const { error: err } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: name },
        emailRedirectTo: `${window.location.origin}/api/auth/callback`,
      },
    });

    if (err) {
      setError(err.message);
    } else {
      trackEvent('signup_completed');
      setMessage('Check your email to confirm your account, then log in.');
    }
    setLoading(false);
  }

  return (
    <>
      <Header />
      <main className="min-h-screen flex items-center justify-center section-padding pt-24">
        <div className="w-full max-w-sm">
          <h1 className="heading-display text-2xl text-stone-900 mb-2">Create your account</h1>
          <p className="text-sm text-stone-500 mb-8">Start learning smartphone photography today.</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="text-xs uppercase tracking-wider text-stone-500 block mb-1.5">
                Name
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border border-stone-300 px-4 py-3 text-sm bg-white focus:outline-none focus:border-stone-500 transition-colors"
                placeholder="Your name"
              />
            </div>
            <div>
              <label htmlFor="email" className="text-xs uppercase tracking-wider text-stone-500 block mb-1.5">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full border border-stone-300 px-4 py-3 text-sm bg-white focus:outline-none focus:border-stone-500 transition-colors"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label htmlFor="password" className="text-xs uppercase tracking-wider text-stone-500 block mb-1.5">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                className="w-full border border-stone-300 px-4 py-3 text-sm bg-white focus:outline-none focus:border-stone-500 transition-colors"
              />
            </div>
            <button type="submit" disabled={loading} className="btn-primary w-full py-3.5">
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>

          {error && <p className="text-sm text-error mt-4">{error}</p>}
          {message && <p className="text-sm text-success mt-4">{message}</p>}

          <p className="text-sm text-stone-500 mt-6">
            Already have an account?{' '}
            <Link href="/login" className="text-stone-900 underline">
              Log in
            </Link>
          </p>
        </div>
      </main>
    </>
  );
}

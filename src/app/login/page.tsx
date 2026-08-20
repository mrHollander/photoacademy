'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import Header from '@/components/layout/Header';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mode, setMode] = useState<'password' | 'magic'>('password');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');

    const supabase = createClient();

    if (mode === 'magic') {
      const { error: err } = await supabase.auth.signInWithOtp({
        email,
        options: { emailRedirectTo: `${window.location.origin}/api/auth/callback` },
      });
      if (err) setError(err.message);
      else setMessage('Check your email for a login link.');
    } else {
      const { error: err } = await supabase.auth.signInWithPassword({ email, password });
      if (err) setError(err.message);
      else router.push('/dashboard');
    }

    setLoading(false);
  }

  return (
    <>
      <Header />
      <main className="min-h-screen flex items-center justify-center section-padding pt-24">
        <div className="w-full max-w-sm">
          <h1 className="heading-display text-2xl text-stone-900 mb-2">Welcome back</h1>
          <p className="text-sm text-stone-500 mb-8">Log in to continue learning.</p>

          {/* Mode toggle */}
          <div className="flex gap-4 mb-6">
            <button
              onClick={() => setMode('password')}
              className={`text-sm pb-1 border-b-2 transition-colors ${
                mode === 'password' ? 'border-stone-900 text-stone-900' : 'border-transparent text-stone-400'
              }`}
            >
              Password
            </button>
            <button
              onClick={() => setMode('magic')}
              className={`text-sm pb-1 border-b-2 transition-colors ${
                mode === 'magic' ? 'border-stone-900 text-stone-900' : 'border-transparent text-stone-400'
              }`}
            >
              Magic Link
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
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
            {mode === 'password' && (
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
                  className="w-full border border-stone-300 px-4 py-3 text-sm bg-white focus:outline-none focus:border-stone-500 transition-colors"
                />
              </div>
            )}
            <button type="submit" disabled={loading} className="btn-primary w-full py-3.5">
              {loading ? 'Loading...' : mode === 'magic' ? 'Send Magic Link' : 'Log In'}
            </button>
          </form>

          {error && <p className="text-sm text-error mt-4">{error}</p>}
          {message && <p className="text-sm text-success mt-4">{message}</p>}

          <p className="text-sm text-stone-500 mt-6">
            No account yet?{' '}
            <Link href="/signup" className="text-stone-900 underline">
              Sign up
            </Link>
          </p>
        </div>
      </main>
    </>
  );
}

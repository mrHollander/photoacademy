import Link from 'next/link';
import Header from '@/components/layout/Header';
import { CheckCircle2 } from 'lucide-react';

export const metadata = { title: 'Purchase Successful' };

export default function CheckoutSuccessPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen flex items-center justify-center section-padding pt-24">
        <div className="text-center max-w-md">
          <CheckCircle2 size={48} className="text-success mx-auto mb-6" strokeWidth={1.5} />
          <h1 className="heading-display text-2xl text-stone-900 mb-3">
            Welcome to the course
          </h1>
          <p className="text-stone-500 mb-8 leading-relaxed">
            Your purchase was successful. You now have lifetime access to all lessons. Start your first lesson now — the difference in your photos will be immediate.
          </p>
          <Link href="/dashboard" className="btn-primary py-4 px-10">
            Go to Dashboard
          </Link>
          <p className="text-xs text-stone-400 mt-6">
            A confirmation email has been sent to your inbox.
          </p>
        </div>
      </main>
    </>
  );
}

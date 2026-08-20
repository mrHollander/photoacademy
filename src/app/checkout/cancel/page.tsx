import Link from 'next/link';
import Header from '@/components/layout/Header';

export const metadata = { title: 'Checkout Cancelled' };

export default function CheckoutCancelPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen flex items-center justify-center section-padding pt-24">
        <div className="text-center max-w-md">
          <h1 className="heading-display text-2xl text-stone-900 mb-3">Checkout cancelled</h1>
          <p className="text-stone-500 mb-8">
            No payment was taken. You can return to the course page whenever you are ready.
          </p>
          <Link href="/course/phone-photography" className="btn-primary py-3.5 px-10">
            Back to Course
          </Link>
        </div>
      </main>
    </>
  );
}

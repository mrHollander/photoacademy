import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';
import { Camera } from 'lucide-react';

export const metadata = {
  title: 'About',
  description: 'Learn about Etili Hollander — Boutique Photography and our approach to teaching smartphone photography.',
};

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="pt-28 pb-20">
        <section className="section-padding mb-20">
          <div className="max-w-2xl mx-auto">
            <p className="text-xs uppercase tracking-widest text-accent mb-4">About Etili Hollander</p>
            <h1 className="heading-display text-3xl lg:text-4xl text-stone-900 mb-8 leading-tight">
              Better photos should be simple
            </h1>
            <div className="space-y-6 text-stone-600 leading-relaxed">
              <p>
                Etili Hollander — Boutique Photography was built on a simple observation: most people take hundreds of photos every year with an incredibly powerful camera — the one in their phone — and are disappointed with the results.
              </p>
              <p>
                The problem is rarely the camera. Modern smartphones produce stunning image quality. The issue is that a few fundamental photographic principles — light, lens choice, composition, and camera position — are never taught to everyday users.
              </p>
              <p>
                Our courses bridge that gap. We take professional photography techniques and translate them into simple, visual, immediately actionable lessons that anyone can apply using only their smartphone.
              </p>
              <p>
                No jargon. No expensive equipment. No prior experience needed.
              </p>
              <p>
                Just better photos, starting today.
              </p>
            </div>
          </div>
        </section>

        <section className="section-padding py-20 bg-stone-50">
          <div className="max-w-2xl mx-auto text-center">
            <Camera size={32} className="text-accent mx-auto mb-6" strokeWidth={1.5} />
            <h2 className="heading-display text-2xl text-stone-900 mb-4">
              Ready to start?
            </h2>
            <p className="text-stone-500 mb-8">
              Join the course and see the difference in your very first photos.
            </p>
            <Link href="/course/phone-photography" className="btn-primary py-4 px-10">
              View the Course
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

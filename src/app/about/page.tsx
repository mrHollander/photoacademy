import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';
import { Camera } from 'lucide-react';
import { getSiteContent } from '@/lib/content';

export const metadata = {
  title: 'About',
  description: 'Learn about Etili Hollander — Boutique Photography and our approach to teaching smartphone photography.',
};

export default async function AboutPage() {
  const content = await getSiteContent();
  const paragraphs = content['about.body'].split(/\n\n+/).filter(Boolean);

  return (
    <>
      <Header />
      <main className="pt-28 pb-20">
        <section className="section-padding mb-20">
          <div className="max-w-2xl mx-auto">
            <p className="text-xs uppercase tracking-widest text-accent mb-4">{content['about.eyebrow']}</p>
            <h1 className="heading-display text-3xl lg:text-4xl text-stone-900 mb-8 leading-tight">
              {content['about.title']}
            </h1>
            <div className="space-y-6 text-stone-600 leading-relaxed">
              {paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>
        </section>

        <section className="section-padding py-20 bg-stone-50">
          <div className="max-w-2xl mx-auto text-center">
            <Camera size={32} className="text-accent mx-auto mb-6" strokeWidth={1.5} />
            <h2 className="heading-display text-2xl text-stone-900 mb-4">
              {content['about.cta.title']}
            </h2>
            <p className="text-stone-500 mb-8">{content['about.cta.text']}</p>
            <Link href="/courses" className="btn-primary py-4 px-10">
              {content['about.cta.button']}
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

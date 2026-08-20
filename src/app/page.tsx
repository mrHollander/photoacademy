import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import BeforeAfterSection from '@/components/landing/BeforeAfter';
import CurriculumPreview from '@/components/landing/CurriculumPreview';
import PricingSection from '@/components/landing/PricingSection';
import FAQSection from '@/components/landing/FAQSection';
import { Camera, Sun, Frame, Users, MapPin, Palette, ArrowRight } from 'lucide-react';

const outcomes = [
  { icon: Sun, text: 'Find good light anywhere' },
  { icon: Users, text: 'Photograph children naturally' },
  { icon: Camera, text: 'Take better portraits' },
  { icon: Frame, text: 'Make indoor photos look cleaner' },
  { icon: MapPin, text: 'Improve travel photos' },
  { icon: Palette, text: 'Edit photos in under a minute' },
];

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="relative min-h-[90vh] flex items-center section-padding pt-24 lg:pt-20">
          <div className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="fade-in">
              <p className="text-xs uppercase tracking-widest text-accent mb-6">
                Online Photography Course
              </p>
              <h1 className="heading-display text-4xl sm:text-5xl lg:text-6xl text-stone-900 mb-6 leading-[1.1]">
                Turn Everyday Moments Into Professional&nbsp;Photos
              </h1>
              <p className="text-lg text-stone-500 leading-relaxed mb-10 max-w-md">
                Learn how to photograph your children, family, travels and everyday life beautifully — using only your smartphone.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/course/phone-photography" className="btn-primary py-4 px-10">
                  Start the Course
                </Link>
                <a href="#before-after" className="btn-secondary py-4 px-10">
                  See Before &amp; After
                </a>
              </div>
            </div>

            {/* Hero visual placeholder */}
            <div className="relative aspect-[4/5] lg:aspect-[3/4]">
              <div className="absolute inset-0 bg-gradient-to-br from-stone-200 to-stone-300 flex items-center justify-center">
                <div className="text-center text-stone-500">
                  <Camera size={48} strokeWidth={1} className="mx-auto mb-3 opacity-40" />
                  <p className="text-xs uppercase tracking-widest opacity-60">Hero Photography</p>
                  <p className="text-xs opacity-40 mt-1">Before &amp; After Example</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Problem section */}
        <section className="section-padding py-20 lg:py-32 bg-stone-900 text-white">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-xs uppercase tracking-widest text-accent-light mb-6">The Real Problem</p>
            <h2 className="font-display text-3xl lg:text-5xl mb-8 leading-tight font-normal">
              Your phone camera is probably not the&nbsp;problem.
            </h2>
            <p className="text-stone-400 text-lg leading-relaxed mb-12 max-w-2xl mx-auto">
              Modern smartphones have incredible cameras. But most photos still look average — not because of the hardware, but because of a few simple, fixable mistakes.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 text-left max-w-2xl mx-auto">
              {[
                'Bad lighting',
                'Wrong lens choice',
                'Camera position',
                'Distracting backgrounds',
                'Poor framing',
                'No editing',
              ].map((mistake) => (
                <div key={mistake} className="border border-stone-700 px-5 py-4">
                  <p className="text-sm text-stone-300">{mistake}</p>
                </div>
              ))}
            </div>
            <p className="text-stone-500 text-sm mt-10">
              Every one of these is easy to fix once you know how.
            </p>
          </div>
        </section>

        {/* Before/After */}
        <div id="before-after">
          <BeforeAfterSection />
        </div>

        {/* What you will learn */}
        <section className="section-padding py-20 lg:py-32 bg-warm-100">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <p className="text-xs uppercase tracking-widest text-accent mb-4">What You Will Learn</p>
                <h2 className="heading-display text-3xl lg:text-4xl text-stone-900 mb-6">
                  Practical skills you can use <em className="italic">today</em>
                </h2>
                <p className="text-stone-500 mb-10 leading-relaxed">
                  This is not a technical photography course. Every lesson teaches a specific, practical skill you can immediately apply to take better photos with your smartphone.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {outcomes.map(({ icon: Icon, text }) => (
                    <div key={text} className="flex items-center gap-3">
                      <Icon size={18} className="text-accent shrink-0" strokeWidth={1.5} />
                      <span className="text-sm text-stone-700">{text}</span>
                    </div>
                  ))}
                </div>
                <Link
                  href="#curriculum"
                  className="inline-flex items-center gap-2 mt-10 text-sm text-accent hover:text-accent-dark transition-colors"
                >
                  See full curriculum <ArrowRight size={14} />
                </Link>
              </div>
              <div className="aspect-square bg-gradient-to-br from-stone-200 to-warm-200 flex items-center justify-center">
                <div className="text-center text-stone-400">
                  <Camera size={40} strokeWidth={1} className="mx-auto mb-2 opacity-40" />
                  <p className="text-xs uppercase tracking-widest opacity-60">Course Preview Image</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Curriculum */}
        <CurriculumPreview />

        {/* Instructor */}
        <section className="section-padding py-20 lg:py-32">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-start">
              <div className="aspect-[3/4] bg-gradient-to-br from-stone-200 to-stone-300 flex items-center justify-center">
                <div className="text-center text-stone-400">
                  <p className="text-xs uppercase tracking-widest opacity-60">Instructor Photo</p>
                </div>
              </div>
              <div className="md:col-span-2">
                <p className="text-xs uppercase tracking-widest text-accent mb-4">Your Instructor</p>
                <h2 className="heading-display text-2xl lg:text-3xl text-stone-900 mb-4">
                  Taught by a working photographer
                </h2>
                <p className="text-stone-500 leading-relaxed mb-4">
                  With over a decade of professional photography experience — from editorial publications to family portraiture across Europe — your instructor brings a practical, approachable teaching style focused on results you can see immediately.
                </p>
                <p className="text-stone-500 leading-relaxed">
                  This course distills professional techniques into simple, actionable lessons that anyone can follow. No jargon. No expensive equipment. Just better photos, starting today.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials placeholder */}
        <section className="section-padding py-20 lg:py-32 bg-warm-100">
          <div className="max-w-4xl mx-auto">
            <p className="text-xs uppercase tracking-widest text-accent mb-4 text-center">Student Stories</p>
            <h2 className="heading-display text-3xl lg:text-4xl text-stone-900 mb-12 text-center">
              What students are saying
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white border border-stone-200 p-8">
                  <div className="flex gap-1 mb-4">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <div key={s} className="w-3.5 h-3.5 bg-accent/20 rounded-full" />
                    ))}
                  </div>
                  <p className="text-sm text-stone-400 italic leading-relaxed mb-4">
                    Testimonial placeholder — add real student feedback here.
                  </p>
                  <p className="text-xs text-stone-400">— Student Name</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing */}
        <PricingSection />

        {/* FAQ */}
        <FAQSection />

        {/* Final CTA */}
        <section className="section-padding py-20 lg:py-32 bg-stone-900 text-white text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="font-display text-3xl lg:text-5xl mb-6 font-normal leading-tight">
              Start taking photos you actually want to&nbsp;keep
            </h2>
            <p className="text-stone-400 mb-10 max-w-md mx-auto">
              Join the course today and see the difference in your very first photos.
            </p>
            <Link href="/course/phone-photography" className="btn-accent py-4 px-12 text-sm">
              Start the Course — €69
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

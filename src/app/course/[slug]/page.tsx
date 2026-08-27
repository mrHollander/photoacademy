import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import BeforeAfterSection from '@/components/landing/BeforeAfter';
import CurriculumPreview from '@/components/landing/CurriculumPreview';
import PricingSection from '@/components/landing/PricingSection';
import FAQSection from '@/components/landing/FAQSection';
import { getCourse } from '@/lib/course';
import { Check, Clock, Smartphone, Download } from 'lucide-react';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const course = await getCourse(slug);
  if (!course) return {};
  return {
    title: course.meta_title || course.title,
    description: course.meta_description || course.description,
    openGraph: {
      title: course.meta_title || course.title,
      description: course.meta_description || course.description || undefined,
    },
  };
}

export default async function CoursePage({ params }: Props) {
  const { slug } = await params;
  const course = await getCourse(slug);
  if (!course) notFound();

  const totalLessons = course.modules.reduce((sum, m) => sum + (m.lessons?.length || 0), 0);
  const totalMinutes = course.modules
    .flatMap((m) => m.lessons || [])
    .reduce((sum, l) => sum + (l.video_duration || 0), 0);

  return (
    <>
      <Header />
      <main>
        {/* Course Hero */}
        <section className="section-padding pt-28 lg:pt-36 pb-20 lg:pb-32">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-xs uppercase tracking-widest text-accent mb-6">Online Course</p>
            <h1 className="heading-display text-4xl sm:text-5xl lg:text-6xl text-stone-900 mb-6 leading-[1.1]">
              {course.title}
            </h1>
            <p className="text-lg text-stone-500 leading-relaxed mb-8 max-w-2xl mx-auto">
              {course.subtitle}
            </p>
            <div className="flex items-center justify-center gap-6 text-sm text-stone-500 mb-10">
              <span className="flex items-center gap-2">
                <Clock size={16} />
                {Math.round(totalMinutes / 60)} hours
              </span>
              <span className="flex items-center gap-2">
                <Download size={16} />
                {totalLessons} lessons
              </span>
              <span className="flex items-center gap-2">
                <Smartphone size={16} />
                Watch anywhere
              </span>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href={`/checkout?course=${course.slug}`} className="btn-primary py-4 px-12">
                Start the Course — €{(course.price / 100).toFixed(0)}
              </Link>
              <a href="#curriculum" className="btn-secondary py-4 px-10">
                See Curriculum
              </a>
            </div>
          </div>
        </section>

        {/* Long description */}
        {course.long_description && (
          <section className="section-padding py-16 lg:py-24 bg-stone-50">
            <div className="max-w-2xl mx-auto">
              <p className="text-stone-600 leading-relaxed text-lg whitespace-pre-line">
                {course.long_description}
              </p>
            </div>
          </section>
        )}

        <div id="before-after">
          <BeforeAfterSection />
        </div>

        <CurriculumPreview />
        <PricingSection />
        <FAQSection />
      </main>
      <Footer />
    </>
  );
}

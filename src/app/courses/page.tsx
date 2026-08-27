import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { getPublishedCourses } from '@/lib/course';
import { Camera, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Courses',
  description: 'Online photography courses by Etili Hollander — learn to take beautiful photos with the camera you already own.',
};

export default async function CoursesPage() {
  const courses = await getPublishedCourses();

  return (
    <>
      <Header />
      <main>
        <section className="section-padding pt-28 lg:pt-36 pb-16 lg:pb-24">
          <div className="max-w-5xl mx-auto">
            <p className="text-xs uppercase tracking-widest text-accent mb-4">Online Courses</p>
            <h1 className="heading-display text-4xl sm:text-5xl text-stone-900 mb-6 leading-[1.1]">
              Learn photography, one practical lesson at a&nbsp;time
            </h1>
            <p className="text-lg text-stone-500 leading-relaxed max-w-2xl mb-16">
              Every course teaches specific, practical skills you can apply immediately — no jargon, no expensive equipment.
            </p>

            {courses.length === 0 ? (
              <p className="text-stone-500">No courses are available right now — check back soon.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {courses.map((course) => (
                  <Link
                    key={course.id}
                    href={`/course/${course.slug}`}
                    className="group bg-white border border-stone-200 transition-shadow hover:shadow-sm"
                  >
                    <div className="relative aspect-[3/2] bg-gradient-to-br from-stone-200 to-warm-200 overflow-hidden">
                      {course.image_url ? (
                        <Image
                          src={course.image_url}
                          alt={course.title}
                          fill
                          sizes="(max-width: 768px) 100vw, 50vw"
                          className="object-cover"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center text-stone-400">
                          <Camera size={40} strokeWidth={1} className="opacity-40" />
                        </div>
                      )}
                    </div>
                    <div className="p-8">
                      <h2 className="font-display text-2xl text-stone-900 mb-2 group-hover:text-accent-dark transition-colors">
                        {course.title}
                      </h2>
                      {course.subtitle && (
                        <p className="text-sm text-stone-500 leading-relaxed mb-5">{course.subtitle}</p>
                      )}
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-stone-700">
                          €{(course.price / 100).toFixed(0)}
                        </span>
                        <span className="inline-flex items-center gap-2 text-sm text-accent group-hover:text-accent-dark transition-colors">
                          View course <ArrowRight size={14} />
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

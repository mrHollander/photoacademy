import { redirect } from 'next/navigation';
import Link from 'next/link';
import { createServerSupabaseClient } from '@/lib/supabase/server';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { BookOpen, PlayCircle, ArrowRight, LogOut } from 'lucide-react';

export const metadata = { title: 'Dashboard' };

export default async function DashboardPage() {
  const supabase = await createServerSupabaseClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect('/login');

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  // Get enrollments with course details
  const { data: enrollments } = await supabase
    .from('enrollments')
    .select('*, courses(*)')
    .eq('user_id', user.id);

  // Get progress for all enrolled courses
  const { data: progress } = await supabase
    .from('lesson_progress')
    .select('lesson_id, completed')
    .eq('user_id', user.id);

  const completedLessonIds = new Set(progress?.filter((p) => p.completed).map((p) => p.lesson_id) || []);

  return (
    <>
      <Header />
      <main className="min-h-screen pt-24 pb-20 section-padding">
        <div className="max-w-4xl mx-auto">
          {/* Welcome */}
          <div className="mb-12">
            <h1 className="heading-display text-3xl text-stone-900 mb-2">
              {profile?.full_name ? `Welcome, ${profile.full_name.split(' ')[0]}` : 'Welcome'}
            </h1>
            <p className="text-stone-500">Continue where you left off.</p>
          </div>

          {/* Enrolled courses */}
          {enrollments && enrollments.length > 0 ? (
            <div className="space-y-6">
              {enrollments.map((enrollment: any) => {
                const course = enrollment.courses;
                if (!course) return null;

                return (
                  <div key={enrollment.id} className="bg-white border border-stone-200 p-6 lg:p-8">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <p className="text-xs uppercase tracking-widest text-accent mb-2">Course</p>
                        <h2 className="heading-display text-xl text-stone-900">{course.title}</h2>
                      </div>
                      <BookOpen size={20} className="text-stone-300" />
                    </div>

                    <p className="text-sm text-stone-500 mb-6">{course.subtitle || course.description}</p>

                    <Link
                      href={`/course/${course.slug}/lesson/camera-settings`}
                      className="inline-flex items-center gap-2 text-sm text-accent hover:text-accent-dark transition-colors"
                    >
                      <PlayCircle size={16} />
                      Continue Learning
                      <ArrowRight size={14} />
                    </Link>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="bg-white border border-stone-200 p-8 lg:p-12 text-center">
              <BookOpen size={32} className="text-stone-300 mx-auto mb-4" />
              <h2 className="text-lg text-stone-900 mb-2">No courses yet</h2>
              <p className="text-sm text-stone-500 mb-6">
                Start your photography journey with our smartphone photography course.
              </p>
              <Link href="/course/phone-photography" className="btn-primary">
                Browse Courses
              </Link>
            </div>
          )}

          {/* Account section */}
          <div className="mt-16 pt-8 border-t border-stone-200">
            <h3 className="text-sm font-medium text-stone-900 mb-4">Account</h3>
            <div className="space-y-3 text-sm text-stone-600">
              <p>{user.email}</p>
              <form action="/api/auth/logout" method="POST">
                <button type="submit" className="flex items-center gap-2 text-stone-500 hover:text-stone-700 transition-colors">
                  <LogOut size={14} />
                  Log out
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

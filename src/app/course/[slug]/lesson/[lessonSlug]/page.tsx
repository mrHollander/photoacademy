import { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';
import { createServerSupabaseClient } from '@/lib/supabase/server';
import { getCourse, checkEnrollment, getAdjacentLessons } from '@/lib/course';
import LessonPlayer from '@/components/course/LessonPlayer';
import CourseSidebar from '@/components/course/CourseSidebar';
import type { Lesson } from '@/types';

interface Props {
  params: Promise<{ slug: string; lessonSlug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, lessonSlug } = await params;
  const course = await getCourse(slug);
  if (!course) return {};
  const lesson = course.modules
    .flatMap((m) => m.lessons || [])
    .find((l) => l.slug === lessonSlug);
  if (!lesson) return {};
  return { title: `${lesson.title} — ${course.title}` };
}

export default async function LessonPage({ params }: Props) {
  const { slug, lessonSlug } = await params;
  const course = await getCourse(slug);
  if (!course) notFound();

  const supabase = await createServerSupabaseClient();
  const { data: { user } } = await supabase.auth.getUser();

  // Find the lesson
  let currentLesson: Lesson | null = null;
  let currentModuleTitle = '';

  for (const mod of course.modules) {
    const found = mod.lessons?.find((l) => l.slug === lessonSlug);
    if (found) {
      currentLesson = found;
      currentModuleTitle = mod.title;
      break;
    }
  }

  if (!currentLesson) notFound();

  // Check access
  const isPreview = currentLesson.is_preview;
  let hasAccess = isPreview;

  if (user) {
    hasAccess = isPreview || (await checkEnrollment(user.id, course.id));
  }

  if (!hasAccess && !isPreview) {
    redirect(`/course/${slug}`);
  }

  const { prev, next } = getAdjacentLessons(course.modules, currentLesson.id);

  // Get progress if logged in
  let completed = false;
  if (user) {
    const { data: progress } = await supabase
      .from('lesson_progress')
      .select('completed')
      .eq('user_id', user.id)
      .eq('lesson_id', currentLesson.id)
      .single();
    completed = progress?.completed || false;
  }

  // Get assignment if any
  const { data: assignments } = await supabase
    .from('assignments')
    .select('*')
    .eq('lesson_id', currentLesson.id)
    .order('order_index');

  return (
    <div className="flex min-h-screen bg-warm-50">
      <CourseSidebar
        course={course}
        currentLessonSlug={lessonSlug}
        userId={user?.id}
      />
      <LessonPlayer
        lesson={currentLesson}
        moduleTitle={currentModuleTitle}
        courseSlug={slug}
        prev={prev}
        next={next}
        completed={completed}
        isPreview={isPreview}
        hasAccess={hasAccess}
        userId={user?.id}
        assignments={assignments || []}
      />
    </div>
  );
}

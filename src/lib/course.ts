import { createAdminClient, createServerSupabaseClient } from './supabase/server';
import type { Course, CourseWithModules, CourseProgress, Lesson } from '@/types';

// Videos uploaded via the admin page are stored in the private
// 'course-videos' bucket and referenced as 'storage:<object-path>'.
export const STORAGE_VIDEO_PREFIX = 'storage:';

export async function resolveLessonVideo(
  videoUrl: string | null
): Promise<{ src: string | null; isFile: boolean }> {
  if (!videoUrl) return { src: null, isFile: false };
  if (!videoUrl.startsWith(STORAGE_VIDEO_PREFIX)) {
    return { src: videoUrl, isFile: false };
  }

  const path = videoUrl.slice(STORAGE_VIDEO_PREFIX.length);
  const admin = await createAdminClient();
  const { data } = await admin.storage.from('course-videos').createSignedUrl(path, 60 * 60 * 6);
  return { src: data?.signedUrl || null, isFile: true };
}

export async function getPublishedCourses(): Promise<Course[]> {
  const supabase = await createServerSupabaseClient();

  const { data: courses } = await supabase
    .from('courses')
    .select('*')
    .eq('status', 'published')
    .order('created_at');

  return (courses || []) as Course[];
}

export async function getCourse(slug: string): Promise<CourseWithModules | null> {
  const supabase = await createServerSupabaseClient();

  const { data: course } = await supabase
    .from('courses')
    .select('*')
    .eq('slug', slug)
    .eq('status', 'published')
    .single();

  if (!course) return null;

  const { data: modules } = await supabase
    .from('modules')
    .select('*, lessons(*)')
    .eq('course_id', course.id)
    .order('order_index')
    .order('order_index', { referencedTable: 'lessons' });

  return {
    ...course,
    modules: modules || [],
  } as CourseWithModules;
}

export async function getAllLessonsForCourse(courseId: string): Promise<Lesson[]> {
  const supabase = await createServerSupabaseClient();

  const { data: modules } = await supabase
    .from('modules')
    .select('id, order_index, lessons(id, module_id, title, slug, order_index, is_preview, video_duration)')
    .eq('course_id', courseId)
    .order('order_index')
    .order('order_index', { referencedTable: 'lessons' });

  if (!modules) return [];

  return modules.flatMap(m => m.lessons || []) as Lesson[];
}

export async function getCourseProgress(
  userId: string,
  courseId: string
): Promise<CourseProgress> {
  const supabase = await createServerSupabaseClient();

  const lessons = await getAllLessonsForCourse(courseId);
  const totalLessons = lessons.length;

  const { data: progress } = await supabase
    .from('lesson_progress')
    .select('lesson_id, completed, last_watched_at')
    .eq('user_id', userId)
    .in('lesson_id', lessons.map(l => l.id));

  const completedLessons = progress?.filter(p => p.completed).length || 0;
  const percentage = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;

  // Find last watched lesson
  let lastLesson: Lesson | null = null;
  if (progress && progress.length > 0) {
    const lastProgress = progress.sort(
      (a, b) => new Date(b.last_watched_at || '').getTime() - new Date(a.last_watched_at || '').getTime()
    )[0];
    lastLesson = lessons.find(l => l.id === lastProgress.lesson_id) || null;
  }

  return { totalLessons, completedLessons, percentage, lastLesson };
}

export async function checkEnrollment(userId: string, courseId: string): Promise<boolean> {
  const supabase = await createServerSupabaseClient();

  const { data } = await supabase
    .from('enrollments')
    .select('id')
    .eq('user_id', userId)
    .eq('course_id', courseId)
    .single();

  return !!data;
}

export async function getLesson(moduleId: string, lessonSlug: string) {
  const supabase = await createServerSupabaseClient();

  const { data } = await supabase
    .from('lessons')
    .select('*, assignments(*)')
    .eq('module_id', moduleId)
    .eq('slug', lessonSlug)
    .single();

  return data;
}

export function getAdjacentLessons(
  modules: CourseWithModules['modules'],
  currentLessonId: string
): { prev: Lesson | null; next: Lesson | null } {
  const allLessons = modules.flatMap(m => m.lessons || []);
  const currentIndex = allLessons.findIndex(l => l.id === currentLessonId);

  return {
    prev: currentIndex > 0 ? allLessons[currentIndex - 1] : null,
    next: currentIndex < allLessons.length - 1 ? allLessons[currentIndex + 1] : null,
  };
}

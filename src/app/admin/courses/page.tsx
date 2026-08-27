import Link from 'next/link';
import { createServerSupabaseClient } from '@/lib/supabase/server';
import AdminCourseEditor from '@/components/admin/CourseEditor';

export const metadata = { title: 'Manage Courses — Admin' };

export default async function AdminCoursesPage() {
  const supabase = await createServerSupabaseClient();

  const { data: courses } = await supabase
    .from('courses')
    .select('*, modules(*, lessons(*))')
    .order('created_at', { ascending: false });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-medium text-stone-900">Courses</h1>
      </div>

      {courses?.map((course: any) => (
        <div key={course.id} className="bg-white border border-stone-200 mb-6">
          <div className="p-6 border-b border-stone-200">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-medium text-stone-900">{course.title}</h2>
                <p className="text-sm text-stone-500 mt-1">/{course.slug} — €{(course.price / 100).toFixed(0)} — {course.status}</p>
              </div>
              <div className="flex items-center gap-3">
                <span className={`text-xs px-3 py-1 ${course.status === 'published' ? 'bg-success/10 text-success' : 'bg-stone-100 text-stone-500'}`}>
                  {course.status}
                </span>
                <Link href={`/admin/courses/${course.id}`} className="btn-secondary text-xs py-1.5 px-4">
                  Edit
                </Link>
              </div>
            </div>
          </div>

          {course.modules
            ?.sort((a: any, b: any) => a.order_index - b.order_index)
            .map((mod: any) => (
              <div key={mod.id} className="border-b border-stone-100 last:border-0">
                <div className="px-6 py-3 bg-stone-50">
                  <p className="text-xs uppercase tracking-wider text-stone-500 font-medium">
                    Module {mod.order_index + 1}: {mod.title}
                  </p>
                </div>
                {mod.lessons
                  ?.sort((a: any, b: any) => a.order_index - b.order_index)
                  .map((lesson: any) => (
                    <div key={lesson.id} className="px-6 py-2.5 flex items-center justify-between text-sm border-b border-stone-50 last:border-0">
                      <div className="flex items-center gap-3">
                        <span className="text-stone-400 text-xs w-4">{lesson.order_index + 1}</span>
                        <span className="text-stone-700">{lesson.title}</span>
                        {lesson.is_preview && (
                          <span className="text-[10px] uppercase tracking-wider text-accent bg-accent/10 px-1.5 py-0.5">Preview</span>
                        )}
                      </div>
                      <div className="flex items-center gap-4 text-xs text-stone-400">
                        <span>{lesson.video_url ? '🎬' : '—'}</span>
                        <span>{lesson.video_duration ? `${Math.round(lesson.video_duration / 60)}m` : ''}</span>
                      </div>
                    </div>
                  ))}
              </div>
            ))}
        </div>
      ))}

      <AdminCourseEditor />
    </div>
  );
}

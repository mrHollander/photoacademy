import Link from 'next/link';
import { notFound } from 'next/navigation';
import { createServerSupabaseClient } from '@/lib/supabase/server';
import CourseDetailEditor from '@/components/admin/CourseDetailEditor';
import type { CourseWithModules } from '@/types';
import { ArrowLeft } from 'lucide-react';

export const metadata = { title: 'Edit Course — Admin' };

interface Props {
  params: Promise<{ id: string }>;
}

export default async function AdminCourseEditPage({ params }: Props) {
  const { id } = await params;
  const supabase = await createServerSupabaseClient();

  const { data: course } = await supabase
    .from('courses')
    .select('*, modules(*, lessons(*))')
    .eq('id', id)
    .single();

  if (!course) notFound();

  return (
    <div>
      <div className="mb-6">
        <Link href="/admin/courses" className="text-xs text-stone-500 hover:text-stone-700 flex items-center gap-1.5 mb-3">
          <ArrowLeft size={13} /> All courses
        </Link>
        <h1 className="text-xl font-medium text-stone-900">{course.title}</h1>
        <p className="text-sm text-stone-500 mt-1">
          Edit course details, modules, lessons, photos and videos.
        </p>
      </div>
      <CourseDetailEditor course={course as CourseWithModules} />
    </div>
  );
}

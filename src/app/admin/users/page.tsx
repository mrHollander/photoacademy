import { createServerSupabaseClient } from '@/lib/supabase/server';

export const metadata = { title: 'Users — Admin' };

export default async function AdminUsersPage() {
  const supabase = await createServerSupabaseClient();

  const { data: users } = await supabase
    .from('profiles')
    .select('*, enrollments(course_id, courses(title))')
    .order('created_at', { ascending: false })
    .limit(100);

  return (
    <div>
      <h1 className="text-xl font-medium text-stone-900 mb-6">Users</h1>

      <div className="bg-white border border-stone-200 overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-stone-200 text-left">
              <th className="px-4 py-3 text-xs uppercase tracking-wider text-stone-400 font-medium">Name</th>
              <th className="px-4 py-3 text-xs uppercase tracking-wider text-stone-400 font-medium">Email</th>
              <th className="px-4 py-3 text-xs uppercase tracking-wider text-stone-400 font-medium">Role</th>
              <th className="px-4 py-3 text-xs uppercase tracking-wider text-stone-400 font-medium">Courses</th>
              <th className="px-4 py-3 text-xs uppercase tracking-wider text-stone-400 font-medium">Joined</th>
            </tr>
          </thead>
          <tbody>
            {users?.map((user: any) => (
              <tr key={user.id} className="border-b border-stone-100">
                <td className="px-4 py-3 text-stone-700">{user.full_name || '—'}</td>
                <td className="px-4 py-3 text-stone-600">{user.email}</td>
                <td className="px-4 py-3">
                  <span className={`text-xs px-2 py-0.5 ${user.role === 'admin' ? 'bg-stone-900 text-white' : 'bg-stone-100 text-stone-600'}`}>
                    {user.role}
                  </span>
                </td>
                <td className="px-4 py-3 text-stone-500 text-xs">
                  {user.enrollments?.map((e: any) => e.courses?.title).filter(Boolean).join(', ') || '—'}
                </td>
                <td className="px-4 py-3 text-stone-400 text-xs">
                  {new Date(user.created_at).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

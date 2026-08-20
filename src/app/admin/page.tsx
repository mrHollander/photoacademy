import { createServerSupabaseClient } from '@/lib/supabase/server';

export const metadata = { title: 'Admin' };

export default async function AdminPage() {
  const supabase = await createServerSupabaseClient();

  const [
    { count: userCount },
    { count: orderCount },
    { count: enrollmentCount },
    { data: recentOrders },
  ] = await Promise.all([
    supabase.from('profiles').select('*', { count: 'exact', head: true }),
    supabase.from('orders').select('*', { count: 'exact', head: true }).eq('status', 'completed'),
    supabase.from('enrollments').select('*', { count: 'exact', head: true }),
    supabase.from('orders').select('*, courses(title)').eq('status', 'completed').order('created_at', { ascending: false }).limit(10),
  ]);

  const stats = [
    { label: 'Users', value: userCount || 0 },
    { label: 'Orders', value: orderCount || 0 },
    { label: 'Enrollments', value: enrollmentCount || 0 },
  ];

  return (
    <div>
      <h1 className="text-xl font-medium text-stone-900 mb-6">Overview</h1>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
        {stats.map((s) => (
          <div key={s.label} className="bg-white border border-stone-200 p-6">
            <p className="text-xs uppercase tracking-wider text-stone-400 mb-1">{s.label}</p>
            <p className="text-2xl font-display text-stone-900">{s.value}</p>
          </div>
        ))}
      </div>

      <h2 className="text-sm font-medium text-stone-900 mb-4">Recent Orders</h2>
      <div className="bg-white border border-stone-200 overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-stone-200 text-left">
              <th className="px-4 py-3 text-xs uppercase tracking-wider text-stone-400 font-medium">Email</th>
              <th className="px-4 py-3 text-xs uppercase tracking-wider text-stone-400 font-medium">Course</th>
              <th className="px-4 py-3 text-xs uppercase tracking-wider text-stone-400 font-medium">Amount</th>
              <th className="px-4 py-3 text-xs uppercase tracking-wider text-stone-400 font-medium">Date</th>
            </tr>
          </thead>
          <tbody>
            {recentOrders?.map((order: any) => (
              <tr key={order.id} className="border-b border-stone-100">
                <td className="px-4 py-3 text-stone-600">{order.customer_email || '—'}</td>
                <td className="px-4 py-3 text-stone-600">{order.courses?.title || '—'}</td>
                <td className="px-4 py-3 text-stone-600">€{(order.amount / 100).toFixed(2)}</td>
                <td className="px-4 py-3 text-stone-400">{new Date(order.created_at).toLocaleDateString()}</td>
              </tr>
            )) || (
              <tr>
                <td colSpan={4} className="px-4 py-8 text-center text-stone-400">
                  No orders yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

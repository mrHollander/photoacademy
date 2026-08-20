import { createServerSupabaseClient } from '@/lib/supabase/server';

export const metadata = { title: 'Orders — Admin' };

export default async function AdminOrdersPage() {
  const supabase = await createServerSupabaseClient();

  const { data: orders } = await supabase
    .from('orders')
    .select('*, courses(title)')
    .order('created_at', { ascending: false })
    .limit(100);

  const totalRevenue = orders
    ?.filter((o: any) => o.status === 'completed')
    .reduce((sum: number, o: any) => sum + o.amount, 0) || 0;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-medium text-stone-900">Orders</h1>
        <div className="text-right">
          <p className="text-xs uppercase tracking-wider text-stone-400">Total Revenue</p>
          <p className="text-xl font-display text-stone-900">€{(totalRevenue / 100).toFixed(2)}</p>
        </div>
      </div>

      <div className="bg-white border border-stone-200 overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-stone-200 text-left">
              <th className="px-4 py-3 text-xs uppercase tracking-wider text-stone-400 font-medium">Email</th>
              <th className="px-4 py-3 text-xs uppercase tracking-wider text-stone-400 font-medium">Course</th>
              <th className="px-4 py-3 text-xs uppercase tracking-wider text-stone-400 font-medium">Amount</th>
              <th className="px-4 py-3 text-xs uppercase tracking-wider text-stone-400 font-medium">Status</th>
              <th className="px-4 py-3 text-xs uppercase tracking-wider text-stone-400 font-medium">Date</th>
            </tr>
          </thead>
          <tbody>
            {orders?.map((order: any) => (
              <tr key={order.id} className="border-b border-stone-100">
                <td className="px-4 py-3 text-stone-600">{order.customer_email || '—'}</td>
                <td className="px-4 py-3 text-stone-600">{order.courses?.title || '—'}</td>
                <td className="px-4 py-3 text-stone-700">€{(order.amount / 100).toFixed(2)}</td>
                <td className="px-4 py-3">
                  <span className={`text-xs px-2 py-0.5 ${
                    order.status === 'completed' ? 'bg-success/10 text-success' :
                    order.status === 'failed' ? 'bg-error/10 text-error' :
                    'bg-stone-100 text-stone-500'
                  }`}>
                    {order.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-stone-400 text-xs">
                  {new Date(order.created_at).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

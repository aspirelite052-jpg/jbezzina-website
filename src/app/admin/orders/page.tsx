import { createClient } from '@/lib/supabase-server'

export default async function AdminOrdersPage() {
  const supabase = await createClient()

  const { data: orders } = await supabase
    .from('orders')
    .select('*, profiles(full_name, company_name, email)')
    .order('created_at', { ascending: false })

  const statusColors: Record<string, string> = {
    pending: 'bg-yellow-500/20 text-yellow-400',
    quoted: 'bg-blue-500/20 text-blue-400',
    confirmed: 'bg-green-500/20 text-green-400',
    processing: 'bg-purple-500/20 text-purple-400',
    shipped: 'bg-indigo-500/20 text-indigo-400',
    delivered: 'bg-green-600/20 text-green-400',
    cancelled: 'bg-red-500/20 text-red-400',
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-8">Orders</h1>

      <div className="bg-[#1E293B] rounded-xl border border-[#334155] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#334155] text-[#94A3B8] text-sm text-left">
                <th className="py-3 px-4">Order #</th>
                <th className="py-3 px-4">Customer</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4 text-right">Total</th>
                <th className="py-3 px-4 text-center">Status</th>
                <th className="py-3 px-4 text-center">Payment</th>
              </tr>
            </thead>
            <tbody>
              {orders?.map((order) => (
                <tr key={order.id} className="border-b border-[#334155]/50 hover:bg-[#334155]/30">
                  <td className="py-3 px-4 text-white font-mono">{order.order_number}</td>
                  <td className="py-3 px-4">
                    <p className="text-white">{order.profiles?.company_name || order.profiles?.full_name}</p>
                    <p className="text-[#94A3B8] text-sm">{order.profiles?.email}</p>
                  </td>
                  <td className="py-3 px-4 text-[#CBD5E1]">
                    {new Date(order.created_at).toLocaleDateString('en-GB')}
                  </td>
                  <td className="py-3 px-4 text-right text-white font-medium">€{order.total?.toFixed(2)}</td>
                  <td className="py-3 px-4 text-center">
                    <span className={`inline-block px-2 py-1 rounded text-xs ${statusColors[order.status] || 'bg-gray-500/20 text-gray-400'}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span className={`inline-block px-2 py-1 rounded text-xs ${order.payment_status === 'paid' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
                      {order.payment_status}
                    </span>
                  </td>
                </tr>
              ))}
              {(!orders || orders.length === 0) && (
                <tr>
                  <td colSpan={6} className="text-center py-8 text-[#94A3B8]">
                    No orders yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
import { createClient } from '@/lib/supabase-server'

export default async function AdminDashboardPage() {
  const supabase = await createClient()

  const { count: productCount } = await supabase
    .from('products')
    .select('*', { count: 'exact', head: true })

  const { count: orderCount } = await supabase
    .from('orders')
    .select('*', { count: 'exact', head: true })

  const { count: customerCount } = await supabase
    .from('profiles')
    .select('*', { count: 'exact', head: true })
    .eq('role', 'customer')

  const { data: recentOrders } = await supabase
    .from('orders')
    .select('*, profiles(full_name, company_name)')
    .order('created_at', { ascending: false })
    .limit(5)

  const { data: lowStock } = await supabase
    .from('products')
    .select('*')
    .lt('stock_quantity', 10)
    .order('stock_quantity', { ascending: true })
    .limit(5)

  const stats = [
    { label: 'Total Products', value: productCount || 0, color: 'bg-blue-500' },
    { label: 'Total Orders', value: orderCount || 0, color: 'bg-green-500' },
    { label: 'Customers', value: customerCount || 0, color: 'bg-purple-500' },
    { label: 'Revenue', value: '€12,450', color: 'bg-[#F97316]' },
  ]

  const statusColors: Record<string, string> = {
    pending: 'bg-yellow-500',
    quoted: 'bg-blue-500',
    confirmed: 'bg-green-500',
    processing: 'bg-purple-500',
    shipped: 'bg-indigo-500',
    delivered: 'bg-green-600',
    cancelled: 'bg-red-500',
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-8">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-[#1E293B] rounded-xl p-6 border border-[#334155]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[#94A3B8] text-sm mb-1">{stat.label}</p>
                <p className="text-2xl font-bold text-white">{stat.value}</p>
              </div>
              <div className={`w-12 h-12 ${stat.color} rounded-lg`} />
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-[#1E293B] rounded-xl border border-[#334155] p-6">
          <h2 className="text-white text-lg font-bold mb-4">Recent Orders</h2>
          <div className="space-y-4">
            {recentOrders?.map((order) => (
              <div key={order.id} className="bg-[#0F172A] rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-white font-medium">{order.order_number}</p>
                    <p className="text-[#94A3B8] text-sm">
                      {order.profiles?.company_name || order.profiles?.full_name}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs text-white ${statusColors[order.status] || 'bg-gray-500'}`}>
                      {order.status}
                    </span>
                    <p className="text-white font-medium mt-1">€{order.total?.toFixed(2)}</p>
                  </div>
                </div>
              </div>
            ))}
            {(!recentOrders || recentOrders.length === 0) && (
              <p className="text-[#94A3B8] text-center py-4">No orders yet</p>
            )}
          </div>
        </div>

        <div className="bg-[#1E293B] rounded-xl border border-[#334155] p-6">
          <h2 className="text-white text-lg font-bold mb-4">Low Stock Alert</h2>
          <div className="space-y-4">
            {lowStock?.map((product) => (
              <div key={product.id} className="bg-[#0F172A] rounded-lg p-4 flex justify-between items-center">
                <div>
                  <p className="text-white font-medium">{product.name}</p>
                  <p className="text-[#94A3B8] text-sm">SKU: {product.sku}</p>
                </div>
                <div className="text-right">
                  <p className={`text-lg font-bold ${product.stock_quantity <= 5 ? 'text-red-400' : 'text-yellow-400'}`}>
                    {product.stock_quantity}
                  </p>
                  <p className="text-[#94A3B8] text-xs">units left</p>
                </div>
              </div>
            ))}
            {(!lowStock || lowStock.length === 0) && (
              <p className="text-green-400 text-center py-4">All stock levels healthy</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
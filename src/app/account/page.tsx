import { redirect } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase-server'
import { logout } from '@/lib/actions'

export default async function AccountPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/auth/login')

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  const { data: orders } = await supabase
    .from('orders')
    .select('*, order_items(*)')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  const statusColors: Record<string, string> = {
    pending: 'bg-yellow-100 text-yellow-800',
    quoted: 'bg-blue-100 text-blue-800',
    confirmed: 'bg-green-100 text-green-800',
    processing: 'bg-purple-100 text-purple-800',
    shipped: 'bg-indigo-100 text-indigo-800',
    delivered: 'bg-green-100 text-green-800',
    cancelled: 'bg-red-100 text-red-800',
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-[#0F172A]">My Account</h1>
            <p className="text-[#475569] mt-1">{profile?.company_name} — {user.email}</p>
          </div>
          <form action={logout}>
            <button type="submit" className="px-4 py-2 border border-[#CBD5E1] rounded-lg hover:bg-gray-50 transition-colors">
              Sign Out
            </button>
          </form>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-lg font-bold text-[#0F172A] mb-4">Business Details</h2>
            <div className="space-y-4">
              <div>
                <label className="text-xs text-[#475569] uppercase">Company</label>
                <p className="font-medium text-[#0F172A]">{profile?.company_name || '—'}</p>
              </div>
              <div>
                <label className="text-xs text-[#475569] uppercase">Contact</label>
                <p className="font-medium text-[#0F172A]">{profile?.full_name}</p>
                <p className="text-[#475569]">{profile?.phone}</p>
              </div>
              <div>
                <label className="text-xs text-[#475569] uppercase">VAT Number</label>
                <p className="font-medium text-[#0F172A]">{profile?.vat_number || 'Not provided'}</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-lg font-bold text-[#0F172A] mb-4">Order History</h2>
            {orders && orders.length > 0 ? (
              <div className="space-y-4">
                {orders.map((order) => (
                  <div key={order.id} className="border border-[#E2E8F0] rounded-lg p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <p className="font-semibold text-[#0F172A]">{order.order_number}</p>
                        <p className="text-sm text-[#475569]">
                          {new Date(order.created_at).toLocaleDateString('en-GB')}
                        </p>
                      </div>
                      <span className={`inline-block px-3 py-1 rounded-full text-xs ${statusColors[order.status] || 'bg-gray-100'}`}>
                        {order.status}
                      </span>
                    </div>
                    <div className="border-t border-[#E2E8F0] mt-3 pt-3 flex justify-between">
                      <span className="text-sm text-[#475569]">Total</span>
                      <span className="font-bold text-[#0F172A]">€{order.total?.toFixed(2) || '0.00'}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-[#475569] mb-4">No orders yet</p>
                <Link href="/products">
                  <button className="bg-[#0F172A] hover:bg-[#1E293B] text-white px-6 py-2 rounded-lg">
                    Browse Products
                  </button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
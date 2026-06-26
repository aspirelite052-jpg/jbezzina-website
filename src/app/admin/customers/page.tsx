import { createClient } from '@/lib/supabase-server'

export default async function AdminCustomersPage() {
  const supabase = await createClient()

  const { data: customers } = await supabase
    .from('profiles')
    .select('*')
    .eq('role', 'customer')
    .order('created_at', { ascending: false })

  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-8">Customers</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {customers?.map((customer) => (
          <div key={customer.id} className="bg-[#1E293B] rounded-xl border border-[#334155] p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-white font-semibold">{customer.company_name || customer.full_name}</h3>
                <p className="text-[#94A3B8] text-sm">{customer.full_name}</p>
              </div>
              <span className={`inline-block px-2 py-1 rounded text-xs ${customer.is_approved ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
                {customer.is_approved ? 'Active' : 'Pending'}
              </span>
            </div>

            <div className="space-y-2 text-sm text-[#CBD5E1]">
              <p>{customer.email}</p>
              {customer.phone && <p>{customer.phone}</p>}
              {customer.vat_number && <p>VAT: {customer.vat_number}</p>}
            </div>

            <div className="mt-4 pt-4 border-t border-[#334155]">
              <p className="text-[#94A3B8] text-xs">
                Joined {new Date(customer.created_at).toLocaleDateString('en-GB')}
              </p>
            </div>
          </div>
        ))}
        {(!customers || customers.length === 0) && (
          <div className="col-span-full text-center py-12 text-[#94A3B8]">
            No customers registered yet.
          </div>
        )}
      </div>
    </div>
  )
}
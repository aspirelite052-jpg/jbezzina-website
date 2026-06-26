import { createClient } from '@/lib/supabase-server'

export default async function AdminQuotesPage() {
  const supabase = await createClient()

  const { data: quotes } = await supabase
    .from('quote_requests')
    .select('*, profiles(full_name, company_name, email)')
    .order('created_at', { ascending: false })

  const statusColors: Record<string, string> = {
    pending: 'bg-yellow-500/20 text-yellow-400',
    reviewing: 'bg-blue-500/20 text-blue-400',
    quoted: 'bg-green-500/20 text-green-400',
    accepted: 'bg-green-600/20 text-green-400',
    rejected: 'bg-red-500/20 text-red-400',
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-8">Quote Requests</h1>

      <div className="bg-[#1E293B] rounded-xl border border-[#334155] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#334155] text-[#94A3B8] text-sm text-left">
                <th className="py-3 px-4">Title</th>
                <th className="py-3 px-4">Customer</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4 text-right">Quoted Price</th>
                <th className="py-3 px-4 text-center">Status</th>
              </tr>
            </thead>
            <tbody>
              {quotes?.map((quote) => (
                <tr key={quote.id} className="border-b border-[#334155]/50 hover:bg-[#334155]/30">
                  <td className="py-3 px-4 text-white font-medium">{quote.title}</td>
                  <td className="py-3 px-4">
                    <p className="text-white">{quote.profiles?.company_name || quote.profiles?.full_name}</p>
                    <p className="text-[#94A3B8] text-sm">{quote.profiles?.email}</p>
                  </td>
                  <td className="py-3 px-4 text-[#CBD5E1]">
                    {new Date(quote.created_at).toLocaleDateString('en-GB')}
                  </td>
                  <td className="py-3 px-4 text-right text-white">
                    {quote.quoted_price ? `€${quote.quoted_price.toFixed(2)}` : '—'}
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span className={`inline-block px-2 py-1 rounded text-xs ${statusColors[quote.status] || 'bg-gray-500/20 text-gray-400'}`}>
                      {quote.status}
                    </span>
                  </td>
                </tr>
              ))}
              {(!quotes || quotes.length === 0) && (
                <tr>
                  <td colSpan={5} className="text-center py-8 text-[#94A3B8]">
                    No quote requests yet.
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
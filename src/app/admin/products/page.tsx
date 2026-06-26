import Link from 'next/link'
import { createClient } from '@/lib/supabase-server'

export default async function AdminProductsPage() {
  const supabase = await createClient()

  const { data: products } = await supabase
    .from('products')
    .select('*, categories(name)')
    .order('created_at', { ascending: false })

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-white">Products</h1>
        <Link href="/admin/products/new">
          <button className="bg-[#F97316] hover:bg-[#EA580C] text-white px-4 py-2 rounded-lg font-medium">
            + Add Product
          </button>
        </Link>
      </div>

      <div className="bg-[#1E293B] rounded-xl border border-[#334155] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#334155] text-[#94A3B8] text-sm text-left">
                <th className="py-3 px-4">SKU</th>
                <th className="py-3 px-4">Name</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4 text-right">Price</th>
                <th className="py-3 px-4 text-right">Stock</th>
                <th className="py-3 px-4 text-center">Status</th>
              </tr>
            </thead>
            <tbody>
              {products?.map((product) => (
                <tr key={product.id} className="border-b border-[#334155]/50 hover:bg-[#334155]/30">
                  <td className="py-3 px-4 text-white font-mono text-sm">{product.sku}</td>
                  <td className="py-3 px-4 text-white">{product.name}</td>
                  <td className="py-3 px-4 text-[#CBD5E1]">{product.categories?.name || '—'}</td>
                  <td className="py-3 px-4 text-right text-white">€{product.price?.toFixed(2)}</td>
                  <td className="py-3 px-4 text-right">
                    <span className={product.stock_quantity < 10 ? 'text-red-400' : 'text-green-400'}>
                      {product.stock_quantity}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span className={`inline-block px-2 py-1 rounded text-xs ${product.is_active ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                      {product.is_active ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                </tr>
              ))}
              {(!products || products.length === 0) && (
                <tr>
                  <td colSpan={6} className="text-center py-8 text-[#94A3B8]">
                    No products found.
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
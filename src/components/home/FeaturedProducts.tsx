import Link from 'next/link'
import { ArrowRight, Star, ShoppingCart, Heart } from 'lucide-react'

// Placeholder products — will be replaced with real DB data in Phase 2
const featured = [
  {
    id: '1', name: 'M12 Stainless Steel Hex Bolt Set',
    category: 'Fasteners', price: 24.99, salePrice: 19.99,
    rating: 4.8, reviews: 124, sku: 'JB-FAST-001',
    badge: 'Best Seller',
  },
  {
    id: '2', name: 'Industrial Safety Helmet EN397',
    category: 'Safety Equipment', price: 45.00, salePrice: null,
    rating: 4.9, reviews: 87, sku: 'JB-SAFE-012',
    badge: 'New',
  },
  {
    id: '3', name: 'Hydraulic Hand Pump 700 Bar',
    category: 'Hydraulics', price: 189.00, salePrice: 159.00,
    rating: 4.7, reviews: 43, sku: 'JB-HYD-008',
    badge: 'Sale',
  },
  {
    id: '4', name: 'Professional Angle Grinder 125mm',
    category: 'Power Tools', price: 89.00, salePrice: null,
    rating: 4.6, reviews: 211, sku: 'JB-TOOL-034',
    badge: null,
  },
  {
    id: '5', name: 'Marine Grade Cable Gland Kit',
    category: 'Electrical Supplies', price: 32.50, salePrice: null,
    rating: 4.8, reviews: 56, sku: 'JB-ELEC-019',
    badge: 'New',
  },
  {
    id: '6', name: 'Heavy Duty Ratchet Strap Set 5T',
    category: 'Workshop Equipment', price: 67.00, salePrice: 54.00,
    rating: 4.9, reviews: 98, sku: 'JB-WORK-007',
    badge: 'Sale',
  },
]

const badgeColors: Record<string, string> = {
  'Best Seller': 'badge-gold',
  'New':         'badge-green',
  'Sale':        'badge-red',
}

export default function FeaturedProducts() {
  return (
    <section className="section bg-white">
      <div className="container-wide">

        <div className="flex items-end justify-between mb-10">
          <div>
            <div className="gold-accent mb-3" />
            <h2 className="section-title">Featured Products</h2>
            <p className="section-subtitle">Hand-picked quality products for marine & industrial use</p>
          </div>
          <Link href="/products" className="btn-outline hidden sm:flex">
            View All <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-product-grid gap-5">
          {featured.map((product) => (
            <div key={product.id} className="card-hover group">

              {/* Image placeholder */}
              <div className="product-image-container relative bg-gradient-to-br from-steel-100 to-steel-200">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-4xl font-bold text-steel-300">JB</div>
                </div>

                {/* Badges */}
                {product.badge && (
                  <div className={`absolute top-3 left-3 ${badgeColors[product.badge]}`}>
                    {product.badge}
                  </div>
                )}

                {/* Quick actions */}
                <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="w-8 h-8 bg-white rounded-lg shadow flex items-center justify-center text-steel-500 hover:text-red-500 transition-colors">
                    <Heart size={14} />
                  </button>
                </div>
              </div>

              {/* Info */}
              <div className="p-4">
                <div className="text-xs text-gold-600 font-medium mb-1">{product.category}</div>
                <Link href={`/products/${product.sku.toLowerCase()}`}>
                  <h3 className="text-sm font-semibold text-navy-900 mb-2 hover:text-navy-600 transition-colors leading-snug line-clamp-2">
                    {product.name}
                  </h3>
                </Link>

                <div className="flex items-center gap-1 mb-3">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={11}
                        className={i < Math.floor(product.rating) ? 'text-gold-400 fill-gold-400' : 'text-steel-300'}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-steel-400">({product.reviews})</span>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    {product.salePrice ? (
                      <div className="flex items-center gap-2">
                        <span className="price-current">€{product.salePrice.toFixed(2)}</span>
                        <span className="price-original">€{product.price.toFixed(2)}</span>
                      </div>
                    ) : (
                      <span className="price-current">€{product.price.toFixed(2)}</span>
                    )}
                  </div>
                  <button className="btn-primary text-xs px-3 py-2 gap-1.5">
                    <ShoppingCart size={13} />
                    Add
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

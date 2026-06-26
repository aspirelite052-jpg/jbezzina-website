import Link from 'next/link'
import { ArrowRight, MessageCircle, Tag } from 'lucide-react'

export default function CTASection() {
  return (
    <section className="py-16 bg-gradient-to-br from-navy-900 to-navy-950 relative overflow-hidden">
      <div className="absolute inset-0 bg-industrial-grid opacity-10" />
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-gold-500/5 rounded-full blur-3xl" />

      <div className="container-wide relative">
        <div className="grid md:grid-cols-2 gap-6">

          {/* WhatsApp CTA */}
          <div className="bg-green-600/10 border border-green-500/20 rounded-2xl p-8 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center mb-4">
                <MessageCircle size={24} className="text-green-400" />
              </div>
              <h3 className="text-white font-display font-bold text-2xl mb-2">
                Need a Custom Quote?
              </h3>
              <p className="text-steel-400 text-sm leading-relaxed mb-6">
                Chat directly with our team on WhatsApp. Get fast quotes, check stock availability, and place bulk orders instantly.
              </p>
            </div>
            <a
              href="https://wa.me/35677576721?text=Hello%2C%20I%20need%20a%20quote%20for..."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-3 rounded-xl transition-colors self-start"
            >
              <MessageCircle size={18} />
              WhatsApp Us Now
              <ArrowRight size={16} />
            </a>
          </div>

          {/* Offers CTA */}
          <div className="bg-gold-500/10 border border-gold-500/20 rounded-2xl p-8 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 bg-gold-500/20 rounded-xl flex items-center justify-center mb-4">
                <Tag size={24} className="text-gold-400" />
              </div>
              <h3 className="text-white font-display font-bold text-2xl mb-2">
                Special Offers & Deals
              </h3>
              <p className="text-steel-400 text-sm leading-relaxed mb-6">
                Browse our latest discounts, bundle deals, and flash sales. New offers added weekly — sign up for alerts.
              </p>
            </div>
            <Link
              href="/offers"
              className="inline-flex items-center gap-2 bg-gold-500 hover:bg-gold-600 text-navy-900 font-semibold px-6 py-3 rounded-xl transition-colors self-start"
            >
              <Tag size={18} />
              View All Offers
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

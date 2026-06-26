import { Star, Quote } from 'lucide-react'

const testimonials = [
  {
    name: 'Mark Camilleri',
    role: 'Operations Manager',
    company: 'Malta Shipyards',
    rating: 5,
    text: 'Joseph Bezzina & Co has been our go-to supplier for over 15 years. The quality of their fasteners and marine hardware is consistently excellent, and their team always goes the extra mile.',
    initial: 'MC',
  },
  {
    name: 'Sarah Borg',
    role: 'Procurement Officer',
    company: 'Enemalta Corporation',
    rating: 5,
    text: 'Outstanding product range and incredibly fast delivery. We rely on JB & Co for all our electrical supplies and safety equipment. Their pricing is very competitive for the quality offered.',
    initial: 'SB',
  },
  {
    name: 'Antoine Vella',
    role: 'Workshop Supervisor',
    company: 'Malta Industrial Services',
    rating: 5,
    text: 'The best industrial supplier in Malta, no question. Fast delivery, genuine products, and their WhatsApp support saves us so much time when we need something urgently.',
    initial: 'AV',
  },
]

export default function TestimonialsSection() {
  return (
    <section className="section bg-steel-50">
      <div className="container-wide">

        <div className="text-center mb-12">
          <div className="gold-accent mx-auto mb-3" />
          <h2 className="section-title">What Our Clients Say</h2>
          <p className="section-subtitle">Trusted by Malta&apos;s leading marine and industrial companies</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div key={t.name} className="card p-6 relative">
              <Quote className="absolute top-4 right-4 text-gold-200" size={32} />

              {/* Stars */}
              <div className="flex gap-0.5 mb-4">
                {[...Array(t.rating)].map((_, i) => (
                  <Star key={i} size={14} className="text-gold-400 fill-gold-400" />
                ))}
              </div>

              <p className="text-steel-600 text-sm leading-relaxed mb-6 relative z-10">
                &ldquo;{t.text}&rdquo;
              </p>

              <div className="flex items-center gap-3 border-t border-steel-100 pt-4">
                <div className="w-10 h-10 rounded-full bg-navy-700 flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-sm font-bold">{t.initial}</span>
                </div>
                <div>
                  <div className="text-sm font-semibold text-navy-900">{t.name}</div>
                  <div className="text-xs text-steel-500">{t.role}, {t.company}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

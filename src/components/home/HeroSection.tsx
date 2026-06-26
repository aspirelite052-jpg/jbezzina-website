'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ArrowRight, Play, Shield, Truck, Award, MessageCircle } from 'lucide-react'

const slides = [
  {
    headline: 'Premium Industrial',
    highlight: 'Supplies for Malta',
    sub: 'Fasteners, hydraulics, power tools and 10,000+ products for marine and industrial professionals.',
    cta: 'Browse Catalogue',
    ctaHref: '/products',
    bg: 'from-navy-950 via-navy-900 to-navy-800',
  },
  {
    headline: 'Marine Grade',
    highlight: 'Safety Equipment',
    sub: 'ISO-certified safety gear, PPE and marine equipment trusted by Malta\'s top shipyards.',
    cta: 'View Safety Range',
    ctaHref: '/categories/safety-equipment',
    bg: 'from-navy-950 via-navy-900 to-steel-800',
  },
  {
    headline: 'Professional',
    highlight: 'Power Tools',
    sub: 'Industrial-grade power tools from leading global brands. Built to work as hard as you do.',
    cta: 'Shop Power Tools',
    ctaHref: '/categories/power-tools',
    bg: 'from-navy-950 via-navy-900 to-navy-800',
  },
]

const trustBadges = [
  { icon: Shield,  label: 'ISO Certified',       sub: 'Quality assured' },
  { icon: Truck,   label: 'Fast Delivery',        sub: 'Malta-wide shipping' },
  { icon: Award,   label: '40+ Years',            sub: 'Industry experience' },
  { icon: MessageCircle, label: 'WhatsApp Support', sub: '+356 7757 6721' },
]

export default function HeroSection() {
  const [current, setCurrent]     = useState(0)
  const [animating, setAnimating] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      setAnimating(true)
      setTimeout(() => {
        setCurrent((prev) => (prev + 1) % slides.length)
        setAnimating(false)
      }, 300)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const slide = slides[current]

  return (
    <section className={`relative min-h-[90vh] flex flex-col bg-gradient-to-br ${slide.bg} transition-all duration-700 overflow-hidden`}>

      {/* Background grid pattern */}
      <div className="absolute inset-0 bg-industrial-grid opacity-30" />

      {/* Animated background orbs */}
      <div className="absolute top-1/4 -right-32 w-96 h-96 bg-gold-500/5 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 -left-32 w-96 h-96 bg-navy-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />

      {/* Slide dots */}
      <div className="absolute bottom-32 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-1 rounded-full transition-all duration-300 ${
              i === current ? 'w-8 bg-gold-500' : 'w-2 bg-white/30'
            }`}
          />
        ))}
      </div>

      {/* Main content */}
      <div className="container-wide flex-1 flex items-center py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center w-full">

          {/* Left — text */}
          <div className={`transition-all duration-300 ${animating ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}>

            <div className="inline-flex items-center gap-2 bg-gold-500/10 border border-gold-500/20 rounded-full px-4 py-1.5 mb-6">
              <span className="w-2 h-2 rounded-full bg-gold-500 animate-pulse" />
              <span className="text-gold-400 text-xs font-semibold tracking-wide uppercase">
                Trusted by Malta&apos;s Industry Professionals
              </span>
            </div>

            <h1 className="font-display text-5xl md:text-6xl xl:text-7xl font-bold text-white leading-[1.05] mb-4">
              {slide.headline}
              <br />
              <span className="text-gradient-gold">{slide.highlight}</span>
            </h1>

            <p className="text-steel-300 text-lg md:text-xl leading-relaxed mb-8 max-w-lg">
              {slide.sub}
            </p>

            <div className="flex flex-wrap gap-4">
              <Link href={slide.ctaHref} className="btn-gold text-base px-8 py-3.5">
                {slide.cta}
                <ArrowRight size={18} />
              </Link>
              <a
                href="https://wa.me/35677576721"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline border-white/30 text-white hover:bg-white/10 hover:border-white/50 text-base px-8 py-3.5"
              >
                <MessageCircle size={18} />
                Get a Quote
              </a>
            </div>

            {/* Stats row */}
            <div className="flex flex-wrap gap-6 mt-10 pt-8 border-t border-white/10">
              {[
                { value: '10,000+', label: 'Products' },
                { value: '40+',     label: 'Years Experience' },
                { value: '500+',    label: 'Clients Served' },
                { value: '24h',     label: 'Delivery Malta' },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="text-2xl font-bold text-gold-400">{stat.value}</div>
                  <div className="text-xs text-steel-400 mt-0.5">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — industrial graphic */}
          <div className="hidden lg:flex items-center justify-center relative">
            <div className="relative w-full max-w-md aspect-square">

              {/* Outer ring */}
              <div className="absolute inset-0 border-2 border-gold-500/20 rounded-full animate-spin" style={{ animationDuration: '20s' }} />
              <div className="absolute inset-8 border border-gold-500/10 rounded-full animate-spin" style={{ animationDuration: '15s', animationDirection: 'reverse' }} />

              {/* Center hex */}
              <div className="absolute inset-16 bg-gradient-to-br from-navy-800 to-navy-700 rounded-3xl border border-navy-600 flex flex-col items-center justify-center shadow-2xl">
                <div className="text-center">
                  <div className="text-gold-400 font-display font-bold text-5xl mb-1">JB</div>
                  <div className="text-white/60 text-xs tracking-widest uppercase">& Co Ltd</div>
                </div>
              </div>

              {/* Floating category pills */}
              {[
                { label: 'Fasteners',     angle: 0,   color: 'bg-gold-500/90' },
                { label: 'Hydraulics',    angle: 72,  color: 'bg-blue-500/80' },
                { label: 'Safety',        angle: 144, color: 'bg-red-500/80' },
                { label: 'Power Tools',   angle: 216, color: 'bg-green-500/80' },
                { label: 'Electrical',    angle: 288, color: 'bg-purple-500/80' },
              ].map((item) => {
                const rad = (item.angle * Math.PI) / 180
                const radius = 170
                const x = 50 + (radius / 4) * Math.sin(rad)
                const y = 50 - (radius / 4) * Math.cos(rad)
                return (
                  <div
                    key={item.label}
                    className={`absolute ${item.color} text-white text-xs font-semibold px-3 py-1 rounded-full shadow-lg`}
                    style={{ left: `${x}%`, top: `${y}%`, transform: 'translate(-50%, -50%)' }}
                  >
                    {item.label}
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Trust badges bar */}
      <div className="border-t border-white/5 bg-navy-950/50 backdrop-blur-sm">
        <div className="container-wide py-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {trustBadges.map(({ icon: Icon, label, sub }) => (
              <div key={label} className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-gold-500/10 border border-gold-500/20 flex items-center justify-center flex-shrink-0">
                  <Icon size={16} className="text-gold-400" />
                </div>
                <div>
                  <div className="text-white text-sm font-semibold leading-tight">{label}</div>
                  <div className="text-steel-400 text-xs">{sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

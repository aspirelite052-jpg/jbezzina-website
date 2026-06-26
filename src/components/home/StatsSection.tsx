'use client'

import { useEffect, useRef, useState } from 'react'
import { Users, Package, Award, Globe } from 'lucide-react'

const stats = [
  { icon: Award,   value: 40,    suffix: '+', label: 'Years in Business',      sub: 'Established 1985' },
  { icon: Package, value: 10000, suffix: '+', label: 'Products Available',     sub: 'Across 9 categories' },
  { icon: Users,   value: 500,   suffix: '+', label: 'Clients Served',         sub: 'Malta & beyond' },
  { icon: Globe,   value: 25,    suffix: '+', label: 'Brands Represented',     sub: 'Global manufacturers' },
]

function Counter({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount]   = useState(0)
  const [started, setStarted] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStarted(true) },
      { threshold: 0.5 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!started) return
    const duration = 1800
    const steps    = 60
    const increment = target / steps
    let current    = 0
    const timer    = setInterval(() => {
      current += increment
      if (current >= target) {
        setCount(target)
        clearInterval(timer)
      } else {
        setCount(Math.floor(current))
      }
    }, duration / steps)
    return () => clearInterval(timer)
  }, [started, target])

  return (
    <div ref={ref} className="text-4xl md:text-5xl font-display font-bold text-white">
      {count.toLocaleString()}{suffix}
    </div>
  )
}

export default function StatsSection() {
  return (
    <section className="py-16 bg-gradient-to-r from-navy-900 to-navy-800 relative overflow-hidden">
      <div className="absolute inset-0 bg-industrial-grid opacity-20" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-500/50 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-500/50 to-transparent" />

      <div className="container-wide relative">
        <div className="text-center mb-12">
          <div className="gold-accent mx-auto mb-3" />
          <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-3">
            Malta&apos;s Most Trusted Industrial Supplier
          </h2>
          <p className="text-steel-400 text-lg">Numbers that speak for our commitment to quality</p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map(({ icon: Icon, value, suffix, label, sub }) => (
            <div key={label} className="text-center group">
              <div className="w-14 h-14 rounded-2xl bg-gold-500/10 border border-gold-500/20 flex items-center justify-center mx-auto mb-4 group-hover:bg-gold-500/20 transition-colors">
                <Icon size={24} className="text-gold-400" />
              </div>
              <Counter target={value} suffix={suffix} />
              <div className="text-white font-semibold text-base mt-1">{label}</div>
              <div className="text-steel-400 text-sm mt-0.5">{sub}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

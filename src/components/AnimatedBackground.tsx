'use client'

import { useEffect, useState } from 'react'

interface FloatingItem {
  id: number
  type: 'bolt' | 'nut' | 'gear'
  x: number
  y: number
  size: number
  rotation: number
  duration: number
  delay: number
  opacity: number
}

function BoltIcon({ size, className }: { size: number; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} style={{ width: size, height: size }}>
      <path d="M12 2L8 7h3v4H8l4 5v-5h3v-4h-3l4-5h-3V2h-2v5H8l4-5z"/>
      <rect x="10" y="12" width="4" height="8" rx="1"/>
      <rect x="9" y="18" width="6" height="2" rx="0.5"/>
    </svg>
  )
}

function NutIcon({ size, className }: { size: number; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} style={{ width: size, height: size }}>
      <path d="M12 2l8.66 5v10L12 22l-8.66-5V7L12 2zm0 2.5L5.5 7.25v9.5L12 19.5l6.5-2.75v-9.5L12 4.5z"/>
      <circle cx="12" cy="12" r="3" fill="none" stroke="currentColor" strokeWidth="1.5"/>
    </svg>
  )
}

function GearIcon({ size, className }: { size: number; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} style={{ width: size, height: size }}>
      <path d="M12 8a4 4 0 100 8 4 4 0 000-8z"/>
      <path d="M12 2c-.5 0-1 .1-1.4.3l-.8 2.5c-.8.2-1.5.6-2.1 1.1l-2.6-.8c-.4.4-.7.9-1 1.4l1.8 2c-.2.8-.2 1.6 0 2.4l-1.8 2c.3.5.6 1 1 1.4l2.6-.8c.6.5 1.3.9 2.1 1.1l.8 2.5c.4.2.9.3 1.4.3s1-.1 1.4-.3l.8-2.5c.8-.2 1.5-.6 2.1-1.1l2.6.8c.4-.4.7-.9 1-1.4l-1.8-2c.2-.8.2-1.6 0-2.4l1.8-2c-.3-.5-.6-1-1-1.4l-2.6.8c-.6-.5-1.3-.9-2.1-1.1l-.8-2.5C13 2.1 12.5 2 12 2z"/>
    </svg>
  )
}

export default function AnimatedBackground() {
  const [items, setItems] = useState<FloatingItem[]>([])

  useEffect(() => {
    const generated: FloatingItem[] = []
    const types: ('bolt' | 'nut' | 'gear')[] = ['bolt', 'nut', 'gear']
    
    for (let i = 0; i < 25; i++) {
      generated.push({
        id: i,
        type: types[Math.floor(Math.random() * types.length)],
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: 16 + Math.random() * 32,
        rotation: Math.random() * 360,
        duration: 15 + Math.random() * 20,
        delay: Math.random() * 10,
        opacity: 0.08 + Math.random() * 0.15,
      })
    }
    setItems(generated)
  }, [])

  const getIcon = (type: 'bolt' | 'nut' | 'gear', size: number, className: string) => {
    switch (type) {
      case 'bolt': return <BoltIcon size={size} className={className} />
      case 'nut': return <NutIcon size={size} className={className} />
      case 'gear': return <GearIcon size={size} className={className} />
    }
  }

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Gradient base */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#F8FAFC] via-[#f0f4f8] to-[#e8eef4]" />
      
      {/* Animated items */}
      {items.map((item) => (
        <div
          key={item.id}
          className="absolute"
          style={{
            left: `${item.x}%`,
            top: `${item.y}%`,
            animation: `float ${item.duration}s linear infinite`,
            animationDelay: `${item.delay}s`,
            opacity: item.opacity,
          }}
        >
          <div
            style={{
              animation: `spin-slow ${item.duration * 1.5}s linear infinite`,
              animationDelay: `${item.delay}s`,
            }}
          >
            {getIcon(item.type, item.size, 'text-[#1e3a5f]')}
          </div>
        </div>
      ))}

      {/* Gold accent orbs */}
      <div 
        className="absolute top-20 right-20 w-64 h-64 bg-[#c9a84c] rounded-full blur-3xl animate-pulse" 
        style={{ opacity: 0.04 }}
      />
      <div 
        className="absolute bottom-40 left-10 w-48 h-48 bg-[#1e3a5f] rounded-full blur-3xl animate-pulse" 
        style={{ opacity: 0.06, animationDelay: '2s' }}
      />
      <div 
        className="absolute top-1/2 left-1/2 w-96 h-96 bg-[#c9a84c] rounded-full blur-3xl animate-pulse" 
        style={{ opacity: 0.03, animationDelay: '4s' }}
      />

      <style jsx global>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0) translateX(0) rotate(0deg);
          }
          25% {
            transform: translateY(-30px) translateX(15px) rotate(5deg);
          }
          50% {
            transform: translateY(-15px) translateX(-20px) rotate(-3deg);
          }
          75% {
            transform: translateY(-40px) translateX(10px) rotate(2deg);
          }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}
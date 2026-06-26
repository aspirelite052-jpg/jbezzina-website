'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useSession, signOut } from 'next-auth/react'
import {
  Menu, X, ShoppingCart, Heart, Search, User,
  ChevronDown, Phone, Mail, Package, LogOut,
  LayoutDashboard, Settings,
} from 'lucide-react'

const categories = [
  { name: 'Fasteners',             href: '/categories/fasteners' },
  { name: 'Power Tools',           href: '/categories/power-tools' },
  { name: 'Safety Equipment',      href: '/categories/safety-equipment' },
  { name: 'Hydraulics',            href: '/categories/hydraulics' },
  { name: 'Electrical Supplies',   href: '/categories/electrical-supplies' },
  { name: 'Mechanical Components', href: '/categories/mechanical-components' },
  { name: 'Engineering Tools',     href: '/categories/engineering-tools' },
  { name: 'Workshop Equipment',    href: '/categories/workshop-equipment' },
  { name: 'Consumables',           href: '/categories/consumables' },
]

const navLinks = [
  { name: 'Home',         href: '/' },
  { name: 'Products',     href: '/products' },
  { name: 'New Arrivals', href: '/new-arrivals' },
  { name: 'Special Offers', href: '/offers' },
  { name: 'About',        href: '/about' },
]

export default function Header() {
  const { data: session } = useSession()
  const [mobileOpen, setMobileOpen]   = useState(false)
  const [catOpen,    setCatOpen]      = useState(false)
  const [userOpen,   setUserOpen]     = useState(false)
  const [scrolled,   setScrolled]     = useState(false)
  const [searchOpen, setSearchOpen]   = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close dropdowns on outside click
  useEffect(() => {
    const handler = () => { setCatOpen(false); setUserOpen(false) }
    document.addEventListener('click', handler)
    return () => document.removeEventListener('click', handler)
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`
    }
  }

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-navy-900 shadow-2xl' : 'bg-navy-900/95 backdrop-blur-md'
    }`}>

      {/* ── Top bar ── */}
      <div className="bg-navy-950 border-b border-navy-800">
        <div className="container-wide flex items-center justify-between py-1.5">
          <div className="flex items-center gap-4 text-xs text-steel-300">
            <a href="tel:+35677576721" className="flex items-center gap-1.5 hover:text-gold-400 transition-colors">
              <Phone size={11} />
              +356 7757 6721
            </a>
            <a href="mailto:info@jbezzina.store" className="flex items-center gap-1.5 hover:text-gold-400 transition-colors hidden sm:flex">
              <Mail size={11} />
              info@jbezzina.store
            </a>
          </div>
          <div className="flex items-center gap-3 text-xs text-steel-300">
            <Link href="/tracking" className="hover:text-gold-400 transition-colors hidden sm:block">
              Track Order
            </Link>
            <span className="text-navy-600 hidden sm:block">|</span>
            <Link href="/offers" className="hover:text-gold-400 transition-colors">
              🔥 Special Offers
            </Link>
          </div>
        </div>
      </div>

      {/* ── Main nav ── */}
      <div className="container-wide">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 flex-shrink-0">
            <div className="relative w-10 h-10">
              <Image
                src="/logo.jpeg"
                alt="Joseph Bezzina & Co Ltd"
                fill
                className="object-contain rounded"
                priority
              />
            </div>
            <div className="hidden sm:block">
              <div className="text-white font-display font-bold text-base leading-tight">
                Joseph Bezzina
              </div>
              <div className="text-gold-400 text-xs font-medium tracking-wide">
                & Co Ltd
              </div>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              link.name === 'Products' ? (
                <div key="products" className="relative" onClick={(e) => e.stopPropagation()}>
                  <button
                    onClick={() => { setCatOpen(!catOpen); setUserOpen(false) }}
                    className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-steel-200 hover:text-white hover:bg-navy-800 rounded-lg transition-all"
                  >
                    Products
                    <ChevronDown size={14} className={`transition-transform ${catOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {catOpen && (
                    <div className="absolute top-full left-0 mt-1 w-56 bg-white rounded-xl shadow-2xl border border-steel-100 py-2 animate-fade-in">
                      <div className="px-3 py-1.5 text-2xs font-semibold text-steel-400 uppercase tracking-wider">
                        Categories
                      </div>
                      {categories.map((cat) => (
                        <Link
                          key={cat.href}
                          href={cat.href}
                          className="block px-3 py-2 text-sm text-navy-800 hover:bg-navy-50 hover:text-navy-600 transition-colors"
                          onClick={() => setCatOpen(false)}
                        >
                          {cat.name}
                        </Link>
                      ))}
                      <div className="border-t border-steel-100 mt-1 pt-1">
                        <Link
                          href="/products"
                          className="block px-3 py-2 text-sm font-semibold text-gold-600 hover:bg-gold-50 transition-colors"
                          onClick={() => setCatOpen(false)}
                        >
                          View All Products →
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-3 py-2 text-sm font-medium text-steel-200 hover:text-white hover:bg-navy-800 rounded-lg transition-all"
                >
                  {link.name}
                </Link>
              )
            ))}
          </nav>

          {/* Right side actions */}
          <div className="flex items-center gap-1">

            {/* Search */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2 text-steel-300 hover:text-white hover:bg-navy-800 rounded-lg transition-all"
              aria-label="Search"
            >
              <Search size={18} />
            </button>

            {/* Wishlist */}
            <Link
              href="/wishlist"
              className="p-2 text-steel-300 hover:text-white hover:bg-navy-800 rounded-lg transition-all hidden sm:flex"
              aria-label="Wishlist"
            >
              <Heart size={18} />
            </Link>

            {/* Cart */}
            <Link
              href="/cart"
              className="relative p-2 text-steel-300 hover:text-white hover:bg-navy-800 rounded-lg transition-all"
              aria-label="Cart"
            >
              <ShoppingCart size={18} />
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-gold-500 text-navy-900 text-2xs font-bold rounded-full flex items-center justify-center">
                0
              </span>
            </Link>

            {/* User menu */}
            <div className="relative hidden sm:block" onClick={(e) => e.stopPropagation()}>
              <button
                onClick={() => { setUserOpen(!userOpen); setCatOpen(false) }}
                className="flex items-center gap-2 pl-2 pr-3 py-1.5 text-steel-300 hover:text-white hover:bg-navy-800 rounded-lg transition-all"
              >
                <div className="w-7 h-7 rounded-full bg-navy-700 flex items-center justify-center">
                  <User size={14} className="text-steel-300" />
                </div>
                {session?.user && (
                  <span className="text-xs text-steel-300 hidden md:block max-w-[80px] truncate">
                    {session.user.name?.split(' ')[0]}
                  </span>
                )}
              </button>

              {userOpen && (
                <div className="absolute top-full right-0 mt-1 w-52 bg-white rounded-xl shadow-2xl border border-steel-100 py-2 animate-fade-in">
                  {session?.user ? (
                    <>
                      <div className="px-3 py-2 border-b border-steel-100">
                        <div className="text-sm font-semibold text-navy-900">{session.user.name}</div>
                        <div className="text-xs text-steel-500 truncate">{session.user.email}</div>
                      </div>
                      {session.user.role === 'ADMIN' && (
                        <Link href="/admin/dashboard" className="flex items-center gap-2 px-3 py-2 text-sm text-navy-700 hover:bg-navy-50 transition-colors" onClick={() => setUserOpen(false)}>
                          <Settings size={14} /> Admin Panel
                        </Link>
                      )}
                      <Link href="/dashboard" className="flex items-center gap-2 px-3 py-2 text-sm text-navy-700 hover:bg-navy-50 transition-colors" onClick={() => setUserOpen(false)}>
                        <LayoutDashboard size={14} /> Dashboard
                      </Link>
                      <Link href="/orders" className="flex items-center gap-2 px-3 py-2 text-sm text-navy-700 hover:bg-navy-50 transition-colors" onClick={() => setUserOpen(false)}>
                        <Package size={14} /> My Orders
                      </Link>
                      <div className="border-t border-steel-100 mt-1 pt-1">
                        <button
                          onClick={() => { signOut({ callbackUrl: '/' }); setUserOpen(false) }}
                          className="flex items-center gap-2 w-full px-3 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                        >
                          <LogOut size={14} /> Sign Out
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <Link href="/login" className="block px-3 py-2 text-sm font-semibold text-navy-700 hover:bg-navy-50 transition-colors" onClick={() => setUserOpen(false)}>
                        Sign In
                      </Link>
                      <Link href="/register" className="block px-3 py-2 text-sm text-navy-700 hover:bg-navy-50 transition-colors" onClick={() => setUserOpen(false)}>
                        Create Account
                      </Link>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 text-steel-300 hover:text-white hover:bg-navy-800 rounded-lg transition-all ml-1"
              aria-label="Menu"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Search bar */}
        {searchOpen && (
          <div className="pb-3 animate-slide-up">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products, categories, SKUs..."
                className="w-full bg-navy-800 text-white placeholder:text-steel-400 border border-navy-600 rounded-xl px-4 py-3 pr-12 text-sm focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500"
                autoFocus
              />
              <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-steel-400 hover:text-gold-400 transition-colors">
                <Search size={18} />
              </button>
            </form>
          </div>
        )}
      </div>

      {/* ── Mobile menu ── */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-navy-800 bg-navy-900 animate-slide-up">
          <div className="container-wide py-4 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block px-3 py-2.5 text-sm font-medium text-steel-200 hover:text-white hover:bg-navy-800 rounded-lg transition-all"
                onClick={() => setMobileOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-2 border-t border-navy-800">
              <div className="text-2xs font-semibold text-steel-500 uppercase tracking-wider px-3 pb-1">Categories</div>
              {categories.map((cat) => (
                <Link
                  key={cat.href}
                  href={cat.href}
                  className="block px-3 py-2 text-sm text-steel-300 hover:text-white hover:bg-navy-800 rounded-lg transition-all"
                  onClick={() => setMobileOpen(false)}
                >
                  {cat.name}
                </Link>
              ))}
            </div>
            <div className="pt-2 border-t border-navy-800 space-y-1">
              {session?.user ? (
                <>
                  <Link href="/dashboard" className="block px-3 py-2.5 text-sm text-steel-200 hover:text-white hover:bg-navy-800 rounded-lg transition-all" onClick={() => setMobileOpen(false)}>
                    My Dashboard
                  </Link>
                  <button onClick={() => signOut({ callbackUrl: '/' })} className="block w-full text-left px-3 py-2.5 text-sm text-red-400 hover:bg-navy-800 rounded-lg transition-all">
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <Link href="/login" className="block px-3 py-2.5 text-sm font-semibold text-gold-400 hover:bg-navy-800 rounded-lg transition-all" onClick={() => setMobileOpen(false)}>
                    Sign In
                  </Link>
                  <Link href="/register" className="block px-3 py-2.5 text-sm text-steel-200 hover:bg-navy-800 rounded-lg transition-all" onClick={() => setMobileOpen(false)}>
                    Create Account
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

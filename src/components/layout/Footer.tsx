import Link from 'next/link'
import Image from 'next/image'
import {
  Phone, Mail, MapPin, Clock,
  Facebook, Linkedin, Instagram,
  ArrowRight, MessageCircle,
} from 'lucide-react'

const productLinks = [
  { name: 'Fasteners',             href: '/categories/fasteners' },
  { name: 'Power Tools',           href: '/categories/power-tools' },
  { name: 'Safety Equipment',      href: '/categories/safety-equipment' },
  { name: 'Hydraulics',            href: '/categories/hydraulics' },
  { name: 'Electrical Supplies',   href: '/categories/electrical-supplies' },
  { name: 'Workshop Equipment',    href: '/categories/workshop-equipment' },
]

const companyLinks = [
  { name: 'About Us',       href: '/about' },
  { name: 'New Arrivals',   href: '/new-arrivals' },
  { name: 'Special Offers', href: '/offers' },
  { name: 'Track Order',    href: '/tracking' },
  { name: 'Contact Us',     href: '/contact' },
]

const supportLinks = [
  { name: 'Customer Dashboard', href: '/dashboard' },
  { name: 'Order History',      href: '/orders' },
  { name: 'Returns Policy',     href: '/returns' },
  { name: 'Shipping Info',      href: '/shipping' },
  { name: 'Privacy Policy',     href: '/privacy' },
  { name: 'Terms of Service',   href: '/terms' },
]

export default function Footer() {
  const whatsappUrl = 'https://wa.me/35677576721?text=Hello%2C%20I%20would%20like%20to%20enquire%20about%20your%20products.'

  return (
    <footer className="bg-navy-950 text-steel-300">

      {/* ── WhatsApp CTA bar ── */}
      <div className="bg-green-600 hover:bg-green-700 transition-colors">
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="container-wide flex items-center justify-center gap-3 py-3"
        >
          <MessageCircle size={18} className="text-white" />
          <span className="text-white text-sm font-semibold">
            Chat with us on WhatsApp — fast enquiries & quotes
          </span>
          <ArrowRight size={16} className="text-white" />
        </a>
      </div>

      {/* ── Main footer ── */}
      <div className="container-wide pt-14 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">

          {/* Brand column */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-5">
              <div className="relative w-12 h-12">
                <Image
                  src="/logo.jpeg"
                  alt="Joseph Bezzina & Co Ltd"
                  fill
                  className="object-contain rounded"
                />
              </div>
              <div>
                <div className="text-white font-display font-bold text-lg leading-tight">
                  Joseph Bezzina
                </div>
                <div className="text-gold-400 text-sm font-medium">& Co Ltd</div>
              </div>
            </Link>

            <p className="text-steel-400 text-sm leading-relaxed mb-6 max-w-xs">
              Your trusted partner for marine and industrial supplies in Malta since 1985.
              Quality products, expert advice, and fast delivery across the Maltese islands.
            </p>

            {/* Contact info */}
            <div className="space-y-2.5">
              <a href="tel:+35677576721" className="flex items-center gap-2.5 text-sm text-steel-400 hover:text-gold-400 transition-colors">
                <Phone size={14} className="text-gold-500 flex-shrink-0" />
                +356 7757 6721
              </a>
              <a href="mailto:info@jbezzina.store" className="flex items-center gap-2.5 text-sm text-steel-400 hover:text-gold-400 transition-colors">
                <Mail size={14} className="text-gold-500 flex-shrink-0" />
                info@jbezzina.store
              </a>
              <div className="flex items-start gap-2.5 text-sm text-steel-400">
                <MapPin size={14} className="text-gold-500 flex-shrink-0 mt-0.5" />
                <span>Marsa Industrial Area, Marsa, Malta</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm text-steel-400">
                <Clock size={14} className="text-gold-500 flex-shrink-0" />
                Mon–Fri: 8:00–17:00 | Sat: 8:00–12:00
              </div>
            </div>

            {/* Social links */}
            <div className="flex items-center gap-3 mt-6">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-navy-800 flex items-center justify-center text-steel-400 hover:bg-gold-500 hover:text-navy-900 transition-all"
                aria-label="Facebook"
              >
                <Facebook size={15} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-navy-800 flex items-center justify-center text-steel-400 hover:bg-gold-500 hover:text-navy-900 transition-all"
                aria-label="LinkedIn"
              >
                <Linkedin size={15} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-navy-800 flex items-center justify-center text-steel-400 hover:bg-gold-500 hover:text-navy-900 transition-all"
                aria-label="Instagram"
              >
                <Instagram size={15} />
              </a>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-navy-800 flex items-center justify-center text-steel-400 hover:bg-green-500 hover:text-white transition-all"
                aria-label="WhatsApp"
              >
                <MessageCircle size={15} />
              </a>
            </div>
          </div>

          {/* Products */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">Products</h4>
            <ul className="space-y-2.5">
              {productLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-steel-400 hover:text-gold-400 transition-colors hover-underline"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">Company</h4>
            <ul className="space-y-2.5">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-steel-400 hover:text-gold-400 transition-colors hover-underline"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support + Newsletter */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">Support</h4>
            <ul className="space-y-2.5 mb-6">
              {supportLinks.slice(0, 4).map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-steel-400 hover:text-gold-400 transition-colors hover-underline"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Newsletter */}
            <div>
              <h5 className="text-white font-semibold text-sm mb-2">Newsletter</h5>
              <p className="text-steel-500 text-xs mb-3">Get product updates & offers</p>
              <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="flex-1 bg-navy-800 border border-navy-600 text-white text-xs rounded-lg px-3 py-2 placeholder:text-steel-600 focus:outline-none focus:border-gold-500 min-w-0"
                />
                <button
                  type="submit"
                  className="bg-gold-500 hover:bg-gold-600 text-navy-900 text-xs font-semibold px-3 py-2 rounded-lg transition-colors flex-shrink-0"
                >
                  <ArrowRight size={14} />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className="border-t border-navy-800">
        <div className="container-wide py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-steel-500 text-xs">
            © {new Date().getFullYear()} Joseph Bezzina & Co Ltd. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-xs text-steel-500">
            <Link href="/privacy" className="hover:text-steel-300 transition-colors">Privacy</Link>
            <Link href="/terms"   className="hover:text-steel-300 transition-colors">Terms</Link>
            <span>Marsa, Malta</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

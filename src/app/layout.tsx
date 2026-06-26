import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: 'Joseph Bezzina & Co Ltd — Marine & Industrial Supplies',
    template: '%s | Joseph Bezzina & Co Ltd',
  },
  description:
    'Premium marine and industrial supplies for Malta and the Mediterranean.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className="min-h-screen bg-white antialiased">
        {children}
      </body>
    </html>
  )
}

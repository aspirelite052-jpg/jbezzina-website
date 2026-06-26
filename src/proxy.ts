import { NextRequest, NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'

export async function proxy(req: NextRequest) {
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  })

  const { pathname } = req.nextUrl

  const isLoggedIn = !!token
  const isAdmin = token?.role === 'ADMIN'

  const isAdminRoute = pathname.startsWith('/admin')
  const isCustomerRoute =
    pathname.startsWith('/dashboard') ||
    pathname.startsWith('/orders') ||
    pathname.startsWith('/cart') ||
    pathname.startsWith('/checkout') ||
    pathname.startsWith('/wishlist') ||
    pathname.startsWith('/profile')

  const isAuthPage = pathname === '/login' || pathname === '/register'

  // Admin routes — must be logged in AND have ADMIN role
  if (isAdminRoute) {
    if (!isLoggedIn) {
      return NextResponse.redirect(
        new URL(`/login?callbackUrl=${pathname}`, req.url)
      )
    }
    if (!isAdmin) {
      return NextResponse.redirect(new URL('/', req.url))
    }
  }

  // Customer routes — must be logged in
  if (isCustomerRoute && !isLoggedIn) {
    return NextResponse.redirect(
      new URL(`/login?callbackUrl=${pathname}`, req.url)
    )
  }

  // Redirect logged-in users away from auth pages
  if (isLoggedIn && isAuthPage) {
    if (isAdmin) {
      return NextResponse.redirect(new URL('/admin/dashboard', req.url))
    }
    return NextResponse.redirect(new URL('/dashboard', req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}

import Link from 'next/link'
import { login } from '@/lib/actions'

export default function LoginPage({ searchParams }: { searchParams: { error?: string } }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC] px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-[#0F172A]">Account Login</h1>
          <p className="text-[#475569] mt-1">Sign in to view your orders</p>
        </div>

        <form action={login} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-[#0F172A] mb-1">
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="your@company.com"
              required
              className="w-full px-3 py-2 border border-[#CBD5E1] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F97316]"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-[#0F172A] mb-1">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="••••••••"
              required
              className="w-full px-3 py-2 border border-[#CBD5E1] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F97316]"
            />
          </div>

          {searchParams?.error && (
            <p className="text-sm text-red-600 bg-red-50 p-3 rounded-md">
              {searchParams.error}
            </p>
          )}

          <button
            type="submit"
            className="w-full bg-[#0F172A] hover:bg-[#1E293B] text-white font-medium py-2.5 rounded-lg transition-colors"
          >
            Sign In
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-[#475569]">
          Don't have an account?{' '}
          <Link href="/auth/register" className="text-[#F97316] hover:underline font-medium">
            Register your business
          </Link>
        </div>
      </div>
    </div>
  )
}
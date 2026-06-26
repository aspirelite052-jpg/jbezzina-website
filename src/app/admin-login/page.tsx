import Link from 'next/link'
import { adminLogin } from '@/lib/actions'

export default function AdminLoginPage({ searchParams }: { searchParams: { error?: string } }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1e3a5f] px-4">
      <div className="w-full max-w-md bg-[#2a4a6f] rounded-xl shadow-lg p-8">
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center mx-auto mb-4">
            <span className="text-[#1e3a5f] font-bold text-2xl">JB</span>
          </div>
          <h1 className="text-2xl font-bold text-white">Admin Portal</h1>
          <p className="text-[#a0b8d0] mt-1">Authorised personnel only</p>
        </div>

        <form action={adminLogin} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-[#a0b8d0] uppercase mb-1">
              Admin Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="admin@jbezzina.com"
              required
              className="w-full px-3 py-2 bg-[#1e3a5f] border border-[#3a5a7f] text-white rounded-lg placeholder:text-[#5a7a9f] focus:outline-none focus:ring-2 focus:ring-[#c9a84c]"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-[#a0b8d0] uppercase mb-1">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="••••••••"
              required
              className="w-full px-3 py-2 bg-[#1e3a5f] border border-[#3a5a7f] text-white rounded-lg placeholder:text-[#5a7a9f] focus:outline-none focus:ring-2 focus:ring-[#c9a84c]"
            />
          </div>

          {searchParams?.error && (
            <p className="text-sm text-red-400 bg-red-900/20 p-3 rounded-md border border-red-900/30">
              {searchParams.error}
            </p>
          )}

          <button
            type="submit"
            className="w-full bg-[#c9a84c] hover:bg-[#b8983c] text-[#1e3a5f] font-bold text-lg py-3 rounded-lg transition-colors"
          >
            SIGN IN TO ADMIN
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-[#a0b8d0]">
          <Link href="/" className="hover:text-white transition-colors">
            ← Back to website
          </Link>
        </div>
      </div>
    </div>
  )
}
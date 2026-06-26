import Link from 'next/link'
import { signup } from '@/lib/actions'

export default function RegisterPage({ searchParams }: { searchParams: { error?: string; success?: string } }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC] px-4 py-12">
      <div className="w-full max-w-lg bg-white rounded-xl shadow-lg p-8">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-[#0F172A]">Business Registration</h1>
          <p className="text-[#475569] mt-1">Create your account to access trade pricing</p>
        </div>

        {searchParams?.success === 'check-email' ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-[#0F172A] mb-2">Registration Submitted</h3>
            <p className="text-[#475569] mb-4">Please check your email to confirm your account.</p>
            <Link href="/auth/login">
              <button className="bg-[#0F172A] hover:bg-[#1E293B] text-white px-6 py-2 rounded-lg">
                Go to Login
              </button>
            </Link>
          </div>
        ) : (
          <form action={signup} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-[#0F172A] mb-1">Full Name *</label>
                <input name="full_name" required placeholder="John Smith" className="w-full px-3 py-2 border border-[#CBD5E1] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F97316]" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-[#0F172A] mb-1">Company Name *</label>
                <input name="company_name" required placeholder="Your Company Ltd" className="w-full px-3 py-2 border border-[#CBD5E1] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F97316]" />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#0F172A] mb-1">Business Email *</label>
                <input name="email" type="email" required placeholder="orders@company.com" className="w-full px-3 py-2 border border-[#CBD5E1] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F97316]" />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#0F172A] mb-1">Phone Number *</label>
                <input name="phone" type="tel" required placeholder="+356 21XX XXXX" className="w-full px-3 py-2 border border-[#CBD5E1] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F97316]" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-[#0F172A] mb-1">Password *</label>
                <input name="password" type="password" required minLength={8} placeholder="Minimum 8 characters" className="w-full px-3 py-2 border border-[#CBD5E1] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F97316]" />
              </div>
            </div>

            {searchParams?.error && (
              <p className="text-sm text-red-600 bg-red-50 p-3 rounded-md">
                {searchParams.error}
              </p>
            )}

            <button type="submit" className="w-full bg-[#0F172A] hover:bg-[#1E293B] text-white font-medium py-2.5 rounded-lg transition-colors mt-4">
              Create Account
            </button>
          </form>
        )}

        <div className="mt-6 text-center text-sm text-[#475569]">
          Already have an account?{' '}
          <Link href="/auth/login" className="text-[#F97316] hover:underline font-medium">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  )
}
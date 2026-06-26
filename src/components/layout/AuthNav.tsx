'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { User } from '@supabase/supabase-js'
import { Button } from '@/components/ui/button'
import { UserCircle, LogOut } from 'lucide-react'

export default function AuthNav() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const supabase = createClient()
    
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
      setLoading(false)
    }

    getUser()

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [])

  if (loading) return null

  if (!user) {
    return (
      <div className="flex items-center gap-3">
        <Link href="/auth/login">
          <Button variant="ghost" className="text-[#0F172A] hover:text-[#F97316]">
            Sign In
          </Button>
        </Link>
        <Link href="/auth/register">
          <Button className="bg-[#F97316] hover:bg-[#EA580C] text-white">
            Register
          </Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="flex items-center gap-3">
      <Link href="/account" className="flex items-center gap-2 text-[#0F172A] hover:text-[#F97316] transition-colors">
        <UserCircle className="w-5 h-5" />
        <span className="hidden sm:inline text-sm font-medium">My Account</span>
      </Link>
      <form action={async () => {
        const supabase = createClient()
        await supabase.auth.signOut()
        window.location.href = '/'
      }}>
        <Button type="submit" variant="ghost" size="sm" className="text-[#475569] hover:text-red-600">
          <LogOut className="w-4 h-4" />
        </Button>
      </form>
    </div>
  )
}
export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  console.log('=== ADMIN LAYOUT DEBUG ===')
  console.log('User ID:', user?.id || 'NO USER')
  
  if (!user) {
    console.log('Redirecting: No user found')
    redirect('/admin-login')
  }

  const { data: profile, error } = await supabase
    .from('profiles')
    .select('role, email, full_name')
    .eq('id', user.id)
    .single()

  console.log('Profile:', profile)
  console.log('Profile Error:', error)
  console.log('Role:', profile?.role)
  console.log('Is Admin?', profile?.role === 'admin')

  if (profile?.role !== 'admin') {
    console.log('Redirecting: Not admin')
    redirect('/')
  }

  console.log('Admin confirmed, rendering layout')
  // ... rest of layout
}
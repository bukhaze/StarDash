import { createBrowserClient } from '@supabase/ssr'

export function createSupabaseBrowserClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://qvhmnecsrdekezdellrh.supabase.co',
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF2aG1uZWNzcmRla2V6ZGVsbHJoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ3Mzk4NzksImV4cCI6MjA5MDMxNTg3OX0.FxZWgxgU4O9OCIRW98GShoBKRUUJl_Uhf5-m13kx6IE'
  )
}

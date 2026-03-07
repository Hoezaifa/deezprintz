import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://mlojcunsiuskibtflpcb.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1sb2pjdW5zaXVza2lidGZscGNiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA4MzQyMDQsImV4cCI6MjA4NjQxMDIwNH0.-FWsexQTG6BFOMBF67gwvxW9kta-jw5mbSq0yzBAlSk'



export const supabase = createClient(supabaseUrl, supabaseAnonKey)

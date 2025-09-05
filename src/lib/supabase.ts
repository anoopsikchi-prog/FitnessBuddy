import { createClient, User } from '@supabase/supabase-js'

// Your actual Supabase credentials
const supabaseUrl = 'https://htvpzehghpxnkrakddkp.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh0dnB6ZWhnaHB4bmtyYWtkZGtwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTcwOTQ1MjQsImV4cCI6MjA3MjY3MDUyNH0.GxJEezYukmAl4BpX40zoigqMOb9L1n2-ChCeRIjoZKc'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

interface ConnectionTestResult {
  success: boolean
  hasSession?: boolean
  error?: string
}

interface AuthResult {
  success: boolean
  user?: User
  error?: string
}

interface SignOutResult {
  success: boolean
  error?: string
}

// Connection testing
export const testConnection = async (): Promise<ConnectionTestResult> => {
  try {
    const { data: { session }, error } = await supabase.auth.getSession()
    console.log('✅ Supabase connection successful')
    return { success: true, hasSession: !!session }
  } catch (error) {
    console.error('❌ Supabase connection failed:', (error as Error).message)
    return { success: false, error: (error as Error).message }
  }
}

// Anonymous authentication
export const startAnonymously = async (): Promise<AuthResult> => {
  try {
    const { data, error } = await supabase.auth.signInAnonymously()
    if (error) throw error
    console.log('✅ Anonymous sign-in successful - User ID:', data.user.id)
    return { success: true, user: data.user }
  } catch (error) {
    console.error('❌ Anonymous sign-in failed:', (error as Error).message)
    return { success: false, error: (error as Error).message }
  }
}

// Get current user
export const getCurrentUser = async (): Promise<User | null> => {
  try {
    const { data: { user }, error } = await supabase.auth.getUser()
    if (error) throw error
    return user
  } catch (error) {
    console.error('❌ Get user failed:', (error as Error).message)
    return null
  }
}

// Sign out
export const signOut = async (): Promise<SignOutResult> => {
  try {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
    console.log('✅ Signed out successfully')
    return { success: true }
  } catch (error) {
    console.error('❌ Sign out failed:', (error as Error).message)
    return { success: false, error: (error as Error).message }
  }
}
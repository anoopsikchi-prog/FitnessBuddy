import { createClient } from '@supabase/supabase-js'

// Your actual Supabase credentials
const supabaseUrl = 'https://htvpzehghpxnkrakddkp.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh0dnB6ZWhnaHB4bmtyYWtkZGtwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTcwOTQ1MjQsImV4cCI6MjA3MjY3MDUyNH0.GxJEezYukmAl4BpX40zoigqMOb9L1n2-ChCeRIjoZKc'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Connection testing
export const testConnection = async () => {
  try {
    const { data: { session }, error } = await supabase.auth.getSession()
    console.log('✅ Supabase connection successful')
    return { success: true, hasSession: !!session }
  } catch (error) {
    console.error('❌ Supabase connection failed:', error.message)
    return { success: false, error: error.message }
  }
}

// Anonymous authentication
export const startAnonymously = async () => {
  try {
    const { data, error } = await supabase.auth.signInAnonymously()
    if (error) throw error
    console.log('✅ Anonymous sign-in successful - User ID:', data.user.id)
    return { success: true, user: data.user }
  } catch (error) {
    console.error('❌ Anonymous sign-in failed:', error.message)
    return { success: false, error: error.message }
  }
}

// Get current user
export const getCurrentUser = async () => {
  try {
    const { data: { user }, error } = await supabase.auth.getUser()
    if (error) throw error
    return user
  } catch (error) {
    if (error.message === 'Auth session missing!') {
      console.info('ℹ️ No active user session (this is normal for login-free app)')
    } else {
      console.error('❌ Get user failed:', error.message)
    }
    return null
  }
}

// Sign out
export const signOut = async () => {
  try {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
    console.log('✅ Signed out successfully')
    return { success: true }
  } catch (error) {
    console.error('❌ Sign out failed:', error.message)
    return { success: false, error: error.message }
  }
}
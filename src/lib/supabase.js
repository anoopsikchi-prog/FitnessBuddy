import { createClient } from '@supabase/supabase-js'

//
const supabaseUrl = 'https://htvpzehghpxnkrakddkp.supabase.co'  // 
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh0dnB6ZWhnaHB4bmtyYWtkZGtwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTcwOTQ1MjQsImV4cCI6MjA3MjY3MDUyNH0.GxJEezYukmAl4BpX40zoigqMOb9L1n2-ChCeRIjoZKc'                //

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// 
export const testConnection = async () => {
  try {
    const { data: { session }, error } = await supabase.auth.getSession()
    console.log
    return { success: true, hasSession: !!session }
  } catch (error) {
    console.error('❌ Supabase connection failed:', error.message)
    return { success: false, error: error.message }
  }
}

// 
export const startAnonymously = async () => {
  try {
    const { data, error } = await supabase.auth.signInAnonymously()
    if (error) throw error
    console.log
    return { success: true, user: data.user }
  } catch (error) {
    console.error('❌ Anonymous sign-in failed:', error.message)
    return { success: false, error: error.message }
  }
}

// 
export const getCurrentUser = async () => {
  try {
    const { data: { user }, error } = await supabase.auth.getUser()
    if (error) throw error
    return user
  } catch (error) {
    console.error('❌ Get user failed:', error.message)
    return null
  }
}

// 
export const signOut = async () => {
  try {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
    console.log
    return { success: true }
  } catch (error) {
    console.error('❌ Sign out failed:', error.message)
    return { success: false, error: error.message }
  }
}
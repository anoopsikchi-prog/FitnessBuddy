import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('⚠️ Supabase environment variables not configured. Database features will be disabled.')
}

export const supabase = supabaseUrl && supabaseAnonKey ? createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
    flowType: 'pkce'
  }
}) : null

// Database types
export type UserProfile = {
  id: string
  display_name: string
  created_at: string
  updated_at: string
}

export type OnboardingData = {
  id: string
  user_id: string
  goal: string | null
  activity_level: string | null
  barriers: string[]
  habits: string[]
  meal_coach_pref: string | null
  demographics: Record<string, any>
  completed: boolean
  created_at: string
  updated_at: string
}

export type DailyMetrics = {
  id: string
  user_id: string
  date: string
  steps: number
  active_minutes: number
  water_ml: number
  created_at: string
  updated_at: string
}

export type HabitTracking = {
  id: string
  user_id: string
  habit_key: string
  date: string
  completed: boolean
  notes: string | null
  created_at: string
}
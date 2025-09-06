import { supabase } from './supabase-client'
import type { UserProfile, OnboardingData, DailyMetrics, HabitTracking } from './supabase-client'

// User Profile helpers
export const createUserProfile = async (userId: string, displayName: string): Promise<UserProfile | null> => {
  try {
    const { data, error } = await supabase
      .from('user_profiles')
      .insert([{ id: userId, display_name: displayName }])
      .select()
      .single()

    if (error) throw error
    return data
  } catch (error) {
    console.error('Error creating user profile:', error)
    return null
  }
}

export const getUserProfile = async (userId: string): Promise<UserProfile | null> => {
  try {
    const { data, error } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('id', userId)
      .single()

    if (error) throw error
    return data
  } catch (error) {
    console.error('Error getting user profile:', error)
    return null
  }
}

export const updateUserProfile = async (userId: string, updates: Partial<UserProfile>): Promise<UserProfile | null> => {
  try {
    const { data, error } = await supabase
      .from('user_profiles')
      .update(updates)
      .eq('id', userId)
      .select()
      .single()

    if (error) throw error
    return data
  } catch (error) {
    console.error('Error updating user profile:', error)
    return null
  }
}

// Onboarding Data helpers
export const saveOnboardingData = async (userId: string, onboardingData: Partial<OnboardingData>): Promise<OnboardingData | null> => {
  try {
    const { data, error } = await supabase
      .from('onboarding_data')
      .upsert([{ user_id: userId, ...onboardingData }], { 
        onConflict: 'user_id',
        ignoreDuplicates: false 
      })
      .select()
      .single()

    if (error) throw error
    return data
  } catch (error) {
    console.error('Error saving onboarding data:', error)
    return null
  }
}

export const getOnboardingData = async (userId: string): Promise<OnboardingData | null> => {
  try {
    const { data, error } = await supabase
      .from('onboarding_data')
      .select('*')
      .eq('user_id', userId)
      .single()

    if (error) throw error
    return data
  } catch (error) {
    console.error('Error getting onboarding data:', error)
    return null
  }
}

// Daily Metrics helpers
export const saveDailyMetrics = async (userId: string, date: string, metrics: Partial<DailyMetrics>): Promise<DailyMetrics | null> => {
  try {
    const { data, error } = await supabase
      .from('daily_metrics')
      .upsert([{ user_id: userId, date, ...metrics }], { 
        onConflict: 'user_id,date',
        ignoreDuplicates: false 
      })
      .select()
      .single()

    if (error) throw error
    return data
  } catch (error) {
    console.error('Error saving daily metrics:', error)
    return null
  }
}

export const getDailyMetrics = async (userId: string, startDate?: string, endDate?: string): Promise<DailyMetrics[]> => {
  try {
    let query = supabase
      .from('daily_metrics')
      .select('*')
      .eq('user_id', userId)
      .order('date', { ascending: false })

    if (startDate) query = query.gte('date', startDate)
    if (endDate) query = query.lte('date', endDate)

    const { data, error } = await query

    if (error) throw error
    return data || []
  } catch (error) {
    console.error('Error getting daily metrics:', error)
    return []
  }
}

// Habit Tracking helpers
export const saveHabitTracking = async (userId: string, habitKey: string, date: string, completed: boolean, notes?: string): Promise<HabitTracking | null> => {
  try {
    const { data, error } = await supabase
      .from('habit_tracking')
      .upsert([{ user_id: userId, habit_key: habitKey, date, completed, notes }], { 
        onConflict: 'user_id,habit_key,date',
        ignoreDuplicates: false 
      })
      .select()
      .single()

    if (error) throw error
    return data
  } catch (error) {
    console.error('Error saving habit tracking:', error)
    return null
  }
}

export const getHabitTracking = async (userId: string, startDate?: string, endDate?: string): Promise<HabitTracking[]> => {
  try {
    let query = supabase
      .from('habit_tracking')
      .select('*')
      .eq('user_id', userId)
      .order('date', { ascending: false })

    if (startDate) query = query.gte('date', startDate)
    if (endDate) query = query.lte('date', endDate)

    const { data, error } = await query

    if (error) throw error
    return data || []
  } catch (error) {
    console.error('Error getting habit tracking:', error)
    return []
  }
}

export const getHabitStreak = async (userId: string, habitKey: string): Promise<number> => {
  try {
    const { data, error } = await supabase
      .from('habit_tracking')
      .select('date, completed')
      .eq('user_id', userId)
      .eq('habit_key', habitKey)
      .eq('completed', true)
      .order('date', { ascending: false })
      .limit(100)

    if (error) throw error
    
    if (!data || data.length === 0) return 0

    // Calculate streak from most recent date
    let streak = 0
    const today = new Date()
    const dates = data.map(d => new Date(d.date))
    
    for (let i = 0; i < dates.length; i++) {
      const daysDiff = Math.floor((today.getTime() - dates[i].getTime()) / (1000 * 60 * 60 * 24))
      if (daysDiff === streak) {
        streak++
      } else {
        break
      }
    }

    return streak
  } catch (error) {
    console.error('Error calculating habit streak:', error)
    return 0
  }
}

// Authentication helpers
export const signInAnonymously = async () => {
  try {
    const { data, error } = await supabase.auth.signInAnonymously()
    if (error) throw error
    return { success: true, user: data.user }
  } catch (error) {
    console.error('Error signing in anonymously:', error)
    return { success: false, error: error.message }
  }
}

export const getCurrentUser = async () => {
  try {
    const { data: { user }, error } = await supabase.auth.getUser()
    if (error) throw error
    return user
  } catch (error) {
    console.error('Error getting current user:', error)
    return null
  }
}

export const signOut = async () => {
  try {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
    return { success: true }
  } catch (error) {
    console.error('Error signing out:', error)
    return { success: false, error: error.message }
  }
}
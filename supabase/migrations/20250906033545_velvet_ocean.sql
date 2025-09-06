/*
  # FitnessBuddy Complete Database Schema

  1. New Tables
    - `user_profiles`
      - `id` (uuid, primary key, references auth.users)
      - `display_name` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `onboarding_responses`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references user_profiles)
      - `goal` (text)
      - `activity_level` (text)
      - `barriers` (jsonb array)
      - `habits` (jsonb array)
      - `meal_coach_pref` (text)
      - `demographics` (jsonb)
      - `completed` (boolean)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `daily_metrics`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references user_profiles)
      - `date` (date)
      - `steps` (integer)
      - `active_minutes` (integer)
      - `water_ml` (integer)
      - `streak_days` (integer)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `habit_logs`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references user_profiles)
      - `habit_key` (text)
      - `date` (date)
      - `completed` (boolean)
      - `notes` (text)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated and anonymous users
    - Secure user data access

  3. Performance
    - Add indexes for common queries
    - Optimize for user-based operations
*/

-- Create user_profiles table
CREATE TABLE IF NOT EXISTS user_profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name text NOT NULL DEFAULT 'FitBuddy User',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create onboarding_responses table
CREATE TABLE IF NOT EXISTS onboarding_responses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES user_profiles(id) ON DELETE CASCADE,
  goal text,
  activity_level text,
  barriers jsonb DEFAULT '[]'::jsonb,
  habits jsonb DEFAULT '[]'::jsonb,
  meal_coach_pref text,
  demographics jsonb DEFAULT '{}'::jsonb,
  completed boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create daily_metrics table
CREATE TABLE IF NOT EXISTS daily_metrics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES user_profiles(id) ON DELETE CASCADE,
  date date NOT NULL DEFAULT CURRENT_DATE,
  steps integer DEFAULT 0,
  active_minutes integer DEFAULT 0,
  water_ml integer DEFAULT 0,
  streak_days integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id, date)
);

-- Create habit_logs table
CREATE TABLE IF NOT EXISTS habit_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES user_profiles(id) ON DELETE CASCADE,
  habit_key text NOT NULL,
  date date NOT NULL DEFAULT CURRENT_DATE,
  completed boolean DEFAULT false,
  notes text,
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, habit_key, date)
);

-- Enable Row Level Security
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE onboarding_responses ENABLE ROW LEVEL SECURITY;
ALTER TABLE daily_metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE habit_logs ENABLE ROW LEVEL SECURITY;

-- Policies for user_profiles
CREATE POLICY "Users can manage own profile" ON user_profiles
  FOR ALL TO authenticated, anon
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Policies for onboarding_responses
CREATE POLICY "Users can manage own onboarding" ON onboarding_responses
  FOR ALL TO authenticated, anon
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

-- Policies for daily_metrics
CREATE POLICY "Users can manage own metrics" ON daily_metrics
  FOR ALL TO authenticated, anon
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

-- Policies for habit_logs
CREATE POLICY "Users can manage own habits" ON habit_logs
  FOR ALL TO authenticated, anon
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_onboarding_user_id ON onboarding_responses(user_id);
CREATE INDEX IF NOT EXISTS idx_daily_metrics_user_date ON daily_metrics(user_id, date DESC);
CREATE INDEX IF NOT EXISTS idx_habit_logs_user_date ON habit_logs(user_id, date DESC);
CREATE INDEX IF NOT EXISTS idx_habit_logs_user_habit ON habit_logs(user_id, habit_key, date DESC);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Add triggers for updated_at columns
CREATE TRIGGER update_user_profiles_updated_at
  BEFORE UPDATE ON user_profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_onboarding_responses_updated_at
  BEFORE UPDATE ON onboarding_responses
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_daily_metrics_updated_at
  BEFORE UPDATE ON daily_metrics
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
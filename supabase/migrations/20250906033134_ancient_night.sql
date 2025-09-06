/*
  # FitnessBuddy Database Schema

  1. New Tables
    - `user_profiles`
      - `id` (uuid, primary key, references auth.users)
      - `display_name` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `onboarding_data`
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
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `habit_tracking`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references user_profiles)
      - `habit_key` (text)
      - `date` (date)
      - `completed` (boolean)
      - `notes` (text)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to manage their own data
    - Add policies for anonymous users (since this is a login-free app)

  3. Indexes
    - Add indexes for common query patterns
    - Optimize for user-based queries
*/

-- Create user_profiles table
CREATE TABLE IF NOT EXISTS user_profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name text NOT NULL DEFAULT 'FitBuddy User',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create onboarding_data table
CREATE TABLE IF NOT EXISTS onboarding_data (
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
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id, date)
);

-- Create habit_tracking table
CREATE TABLE IF NOT EXISTS habit_tracking (
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
ALTER TABLE onboarding_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE daily_metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE habit_tracking ENABLE ROW LEVEL SECURITY;

-- Create policies for user_profiles
CREATE POLICY "Users can read own profile"
  ON user_profiles
  FOR SELECT
  TO authenticated, anon
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON user_profiles
  FOR INSERT
  TO authenticated, anon
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON user_profiles
  FOR UPDATE
  TO authenticated, anon
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Create policies for onboarding_data
CREATE POLICY "Users can read own onboarding data"
  ON onboarding_data
  FOR SELECT
  TO authenticated, anon
  USING (user_id = auth.uid());

CREATE POLICY "Users can insert own onboarding data"
  ON onboarding_data
  FOR INSERT
  TO authenticated, anon
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update own onboarding data"
  ON onboarding_data
  FOR UPDATE
  TO authenticated, anon
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

-- Create policies for daily_metrics
CREATE POLICY "Users can read own daily metrics"
  ON daily_metrics
  FOR SELECT
  TO authenticated, anon
  USING (user_id = auth.uid());

CREATE POLICY "Users can insert own daily metrics"
  ON daily_metrics
  FOR INSERT
  TO authenticated, anon
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update own daily metrics"
  ON daily_metrics
  FOR UPDATE
  TO authenticated, anon
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

-- Create policies for habit_tracking
CREATE POLICY "Users can read own habit tracking"
  ON habit_tracking
  FOR SELECT
  TO authenticated, anon
  USING (user_id = auth.uid());

CREATE POLICY "Users can insert own habit tracking"
  ON habit_tracking
  FOR INSERT
  TO authenticated, anon
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update own habit tracking"
  ON habit_tracking
  FOR UPDATE
  TO authenticated, anon
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can delete own habit tracking"
  ON habit_tracking
  FOR DELETE
  TO authenticated, anon
  USING (user_id = auth.uid());

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_onboarding_data_user_id ON onboarding_data(user_id);
CREATE INDEX IF NOT EXISTS idx_daily_metrics_user_id_date ON daily_metrics(user_id, date DESC);
CREATE INDEX IF NOT EXISTS idx_habit_tracking_user_id_date ON habit_tracking(user_id, date DESC);
CREATE INDEX IF NOT EXISTS idx_habit_tracking_user_habit_date ON habit_tracking(user_id, habit_key, date DESC);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_user_profiles_updated_at
  BEFORE UPDATE ON user_profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_onboarding_data_updated_at
  BEFORE UPDATE ON onboarding_data
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_daily_metrics_updated_at
  BEFORE UPDATE ON daily_metrics
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
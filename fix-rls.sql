-- ============================================
-- Fix RLS Policies for Networking Education App
-- Run this in Supabase SQL Editor
-- ============================================

-- Enable RLS on resources table (if not already enabled)
ALTER TABLE resources ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public read access
DROP POLICY IF EXISTS "Allow public read access" ON resources;
CREATE POLICY "Allow public read access" ON resources
  FOR SELECT USING (true);

-- For other tables that might need fixing:
ALTER TABLE lessons ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow public read access" ON lessons;
CREATE POLICY "Allow public read access" ON lessons
  FOR SELECT USING (true);

ALTER TABLE certificates ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow public read access" ON certificates;
CREATE POLICY "Allow public read access" ON certificates
  FOR SELECT USING (true);

ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow public read access" ON user_progress;
CREATE POLICY "Allow public read access" ON user_progress
  FOR SELECT USING (true);
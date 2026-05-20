-- Run this in your Supabase SQL Editor

CREATE TABLE IF NOT EXISTS rsvp (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  attendance TEXT NOT NULL CHECK (attendance IN ('hadir', 'tidak_hadir', 'mungkin')),
  guest_count INTEGER DEFAULT 1 CHECK (guest_count >= 1 AND guest_count <= 10),
  message TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE rsvp ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert
CREATE POLICY "Public insert" ON rsvp
  FOR INSERT WITH CHECK (true);

-- Allow anyone to read
CREATE POLICY "Public read" ON rsvp
  FOR SELECT USING (true);

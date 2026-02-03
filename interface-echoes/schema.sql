-- Interface Echoes - Supabase Schema
-- Run this in Supabase SQL Editor manually (do NOT use Supabase MCP)

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Profiles (guests: first_name, optional last_name; admin: is_admin)
CREATE TABLE profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  first_name TEXT NOT NULL,
  last_name TEXT,
  display_name TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  is_admin BOOLEAN DEFAULT FALSE,
  UNIQUE(first_name, last_name)
);

-- Universes (webtoon, poetry, excerpts, research)
CREATE TABLE universes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  sort_order INT DEFAULT 0
);

-- Episodes
CREATE TABLE episodes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  universe_id UUID REFERENCES universes(id),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  type TEXT CHECK (type IN ('story','poetry','excerpt','letter','reddit')),
  summary TEXT,
  executive_summary TEXT,
  content TEXT NOT NULL,
  banner_url TEXT,
  song_url TEXT,
  song_source TEXT,
  tags TEXT[],
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Characters (Discord-style PFPs, bios, arc-based avatars)
CREATE TABLE characters (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  avatar_url TEXT,
  bio TEXT,
  narrative_purpose TEXT
);

-- Episode media (left-sticky images/vignettes)
CREATE TABLE episode_media (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  episode_id UUID REFERENCES episodes(id) ON DELETE CASCADE,
  media_type TEXT CHECK (media_type IN ('image','vignette','pin')),
  url TEXT NOT NULL,
  caption TEXT,
  position INT
);

-- Comments (anon display names, real identity stored for admin)
CREATE TABLE comments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  episode_id UUID REFERENCES episodes(id) ON DELETE CASCADE,
  profile_id UUID REFERENCES profiles(id),
  display_name TEXT NOT NULL,
  text TEXT NOT NULL,
  highlighted_text TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Section ratings (peer review buttons per section)
CREATE TABLE section_ratings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  episode_id UUID REFERENCES episodes(id),
  section_id TEXT NOT NULL,
  profile_id UUID REFERENCES profiles(id),
  rating INT CHECK (rating >= 1 AND rating <= 5),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Reactions (resonated, literary, disturbed)
CREATE TABLE reactions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  episode_id UUID REFERENCES episodes(id),
  profile_id UUID REFERENCES profiles(id),
  reaction_type TEXT CHECK (reaction_type IN ('resonated','literary','disturbed','heart')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(episode_id, profile_id, reaction_type)
);

-- Favorites (star/heart episodes)
CREATE TABLE favorites (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  episode_id UUID REFERENCES episodes(id),
  profile_id UUID REFERENCES profiles(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(episode_id, profile_id)
);

-- Saved quotes (bookmarks)
CREATE TABLE saved_quotes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  profile_id UUID REFERENCES profiles(id),
  episode_id UUID REFERENCES episodes(id),
  quote_text TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Annotations (highlight-to-annotate)
CREATE TABLE annotations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  episode_id UUID REFERENCES episodes(id),
  profile_id UUID REFERENCES profiles(id),
  highlighted_text TEXT NOT NULL,
  note TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Newsletter subscribers (emails every 3 episodes)
CREATE TABLE newsletter_subscribers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  episodes_since_last_sent INT DEFAULT 0,
  last_sent_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Feedback submissions
CREATE TABLE feedback (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  profile_id UUID REFERENCES profiles(id),
  type TEXT,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE universes ENABLE ROW LEVEL SECURITY;
ALTER TABLE episodes ENABLE ROW LEVEL SECURITY;
ALTER TABLE characters ENABLE ROW LEVEL SECURITY;
ALTER TABLE episode_media ENABLE ROW LEVEL SECURITY;
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE section_ratings ENABLE ROW LEVEL SECURITY;
ALTER TABLE reactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE favorites ENABLE ROW LEVEL SECURITY;
ALTER TABLE saved_quotes ENABLE ROW LEVEL SECURITY;
ALTER TABLE annotations ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE feedback ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read episodes" ON episodes FOR SELECT USING (true);
CREATE POLICY "Public read universes" ON universes FOR SELECT USING (true);
CREATE POLICY "Public read characters" ON characters FOR SELECT USING (true);
CREATE POLICY "Public read episode_media" ON episode_media FOR SELECT USING (true);
CREATE POLICY "Public read comments" ON comments FOR SELECT USING (true);
CREATE POLICY "Public read reactions" ON reactions FOR SELECT USING (true);
CREATE POLICY "Public read favorites" ON favorites FOR SELECT USING (true);

CREATE POLICY "Allow insert profiles" ON profiles FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow insert comments" ON comments FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow insert reactions" ON reactions FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow insert favorites" ON favorites FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow insert saved_quotes" ON saved_quotes FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow insert annotations" ON annotations FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow insert feedback" ON feedback FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow insert newsletter" ON newsletter_subscribers FOR INSERT WITH CHECK (true);

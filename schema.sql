-- Enable necessary extensions
create extension if not exists "uuid-ossp";

-- USERS (Guest Auth implementation)
create table profiles (
  id uuid primary key default uuid_generate_v4(),
  first_name text not null,
  last_name text, -- Optional, only used for disambiguation
  username text unique, -- "Metaphor" username (e.g., 'starry-eyed-wizard')
  avatar_url text, -- Icon that changes based on "arc"
  bio text, -- "Honest description"
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- EPISODES (Webtoon style content)
create table episodes (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  slug text unique not null,
  summary text,
  executive_summary text, -- The "author's intent" toggle
  content jsonb, -- Flexible content (text, image URLs, vignette data)
  audio_url text, -- Background song header
  published_at timestamp with time zone default timezone('utc'::text, now()) not null,
  episode_number serial,
  is_poetry boolean default false
);

-- COMMENTS (Hover-to-reveal)
create table comments (
  id uuid primary key default uuid_generate_v4(),
  episode_id uuid references episodes(id) on delete cascade not null,
  user_id uuid references profiles(id) on delete set null,
  content text not null,
  location_x float, -- For spatial positioning (if we do visual comments)
  location_y float,
  is_anonymous boolean default false, -- "Anon names but not anon to me"
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- REACTIONS (Micro-interactions)
create table reactions (
  id uuid primary key default uuid_generate_v4(),
  episode_id uuid references episodes(id) on delete cascade not null,
  user_id uuid references profiles(id) on delete cascade not null,
  reaction_type text not null, -- 'disturbed', 'resonated', 'heart', etc.
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- LETTERS (Epistolary feature)
create table letters (
  id uuid primary key default uuid_generate_v4(),
  sender_id uuid references profiles(id) on delete cascade not null,
  recipient_id uuid references profiles(id) on delete cascade, -- Null = open letter
  content text not null,
  is_public boolean default true,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- BOOKMARKS/SAVED QUOTES
create table saved_items (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references profiles(id) on delete cascade not null,
  episode_id uuid references episodes(id) on delete cascade not null,
  quote_text text, -- Text selected
  note text, -- User's annotation
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RLS POLICIES (Basic setup)
alter table profiles enable row level security;
alter table episodes enable row level security;
alter table comments enable row level security;
alter table reactions enable row level security;
alter table letters enable row level security;
alter table saved_items enable row level security;

-- Public read access
create policy "Public profiles are viewable by everyone" on profiles for select using (true);
create policy "Episodes are viewable by everyone" on episodes for select using (true);
create policy "Comments are viewable by everyone" on comments for select using (true);
create policy "Reactions are viewable by everyone" on reactions for select using (true);
create policy "Letters are viewable by everyone" on letters for select using (true); -- Refine later

-- Guest write access (simplified for now, usually requires auth)
create policy "Guests can insert profiles" on profiles for insert with check (true);
create policy "Guests can comment" on comments for insert with check (true);
create policy "Guests can react" on reactions for insert with check (true);

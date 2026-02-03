-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- PROFILES (Users)
create table profiles (
  id uuid references auth.users on delete cascade not null primary key,
  first_name text,
  last_name text,
  avatar_url text,
  role text default 'user', -- 'user', 'admin'
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  
  -- Logic for duplicate names or guests without full auth
  guest_id text unique
);

-- EPISODES
create table episodes (
  id uuid default uuid_generate_v4() primary key,
  slug text unique not null,
  title text not null,
  summary text,
  content text, -- Full HTML or Markdown content
  type text default 'story', -- 'story', 'poetry', 'vignette'
  published_at timestamp with time zone default timezone('utc'::text, now()),
  banner_url text,
  audio_url text
);

-- COMMENTS
create table comments (
  id uuid default uuid_generate_v4() primary key,
  episode_id uuid references episodes(id) on delete cascade not null,
  user_id uuid references profiles(id) on delete cascade not null,
  content text not null,
  
  -- Positioning for "Highlight to Comment" or floating comments
  paragraph_id text,
  position_x numeric,
  position_y numeric,
  
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- SAVED ITEMS / BOOKMARKS
create table saved_items (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references profiles(id) on delete cascade not null,
  episode_id uuid references episodes(id) on delete cascade not null,
  quote_text text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- FEEDBACK
create table feedback (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references profiles(id), -- Optional
  content text not null,
  type text default 'general',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RLS POLICIES (Example)
alter table profiles enable row level security;
alter table episodes enable row level security;
alter table comments enable row level security;

create policy "Public episodes are viewable by everyone." on episodes for select using (true);
create policy "Users can insert their own comments." on comments for insert with check (auth.uid() = user_id);
create policy "Users can view comments." on comments for select using (true);

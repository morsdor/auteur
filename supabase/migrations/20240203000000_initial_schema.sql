-- Enable necessary extensions
create extension if not exists "uuid-ossp";

--
-- 1. Helper Functions & Triggers
--

-- Function to handle new user creation (Sync Auth -> Public)
create or replace function public.handle_new_user()
returns trigger 
language plpgsql 
security definer set search_path = public
as $$
begin
  insert into public.users (id, email, name, avatar_url)
  values (
    new.id,
    new.email,
    new.raw_user_meta_data->>'name',
    new.raw_user_meta_data->>'avatar_url'
  )
  on conflict (id) do nothing;
  
  -- Initialize empty credit balance
  insert into public.credits (user_id, balance)
  values (new.id, 0)
  on conflict (user_id) do nothing;

  return new;
end;
$$;

-- Trigger to call handle_new_user on auth.users insert
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Function to update updated_at timestamp
create or replace function public.update_updated_at_column()
returns trigger 
language plpgsql
set search_path = public
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

--
-- 2. Tables
--

-- Users Table (Extends auth.users)
create table public.users (
  id uuid references auth.users(id) on delete cascade not null primary key,
  email text unique not null,
  name text,
  avatar_url text,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

-- Subscriptions Table
create table public.subscriptions (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.users(id) on delete cascade not null,
  plan text not null check (plan in ('starter', 'pro')),
  status text not null check (status in ('active', 'cancelled', 'expired')),
  stripe_customer_id text, -- Critical for webhook lookups
  stripe_subscription_id text,
  current_period_start timestamptz,
  current_period_end timestamptz,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

-- Credits Table
create table public.credits (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.users(id) on delete cascade not null unique,
  balance integer default 0 not null,
  updated_at timestamptz default now() not null
);

-- Projects Table
create table public.projects (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.users(id) on delete cascade not null,
  name text not null,
  description text,
  resolution text default '1920x1080',
  frame_rate numeric(5,2) default 30.00,
  edl_id text, -- MongoDB document ID
  thumbnail_url text,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);


-- Jobs Table
create table public.jobs (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.users(id) on delete cascade not null,
  project_id uuid references public.projects(id) on delete set null,
  type text not null, -- Enum validation handled in app layer or strict check constraint if desired
  status text not null check (status in ('pending', 'processing', 'completed', 'failed')),
  credits_cost integer not null,
  credits_refunded boolean default false,
  input_params jsonb,
  output_data jsonb,
  error_message text,
  modal_task_id text,
  started_at timestamptz,
  completed_at timestamptz,
  created_at timestamptz default now() not null
);

-- Credit Transactions Table
create table public.credit_transactions (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.users(id) on delete cascade not null,
  amount integer not null, -- positive = add, negative = deduct
  balance_after integer not null,
  type text not null check (type in ('subscription', 'usage', 'refund', 'bonus')),
  description text,
  job_id uuid references public.jobs(id) on delete set null,
  created_at timestamptz default now() not null
);

-- Media Files Table
create table public.media_files (
  id uuid default gen_random_uuid() primary key,
  project_id uuid references public.projects(id) on delete cascade not null,
  user_id uuid references public.users(id) on delete cascade not null,
  name text not null,
  type text not null check (type in ('video', 'audio', 'image')),
  mime_type text,
  duration_ms integer,
  file_size_bytes bigint,
  r2_key text not null,
  r2_url text not null,
  thumbnail_r2_key text,
  metadata jsonb,
  created_at timestamptz default now() not null
);

-- Voice Clones Table
create table public.voice_clones (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.users(id) on delete cascade not null,
  name text not null,
  sample_r2_key text not null,
  sample_r2_url text not null,
  mime_type text,
  sample_duration_ms integer,
  file_size_bytes bigint,
  created_at timestamptz default now() not null
);

-- Indexes for performance and consistency
create unique index idx_projects_edl_id on public.projects(edl_id);
create index idx_projects_user_id on public.projects(user_id);
create index idx_media_files_project_id on public.media_files(project_id);
create index idx_jobs_user_id on public.jobs(user_id);
create index idx_jobs_project_id on public.jobs(project_id);
create index idx_subscriptions_user_id on public.subscriptions(user_id);
create index idx_credit_transactions_user_id on public.credit_transactions(user_id);

--
-- 3. Row Level Security (RLS) Policies
--

-- Enable RLS on all tables
alter table public.users enable row level security;
alter table public.subscriptions enable row level security;
alter table public.credits enable row level security;
alter table public.credit_transactions enable row level security;
alter table public.projects enable row level security;
alter table public.jobs enable row level security;
alter table public.media_files enable row level security;
alter table public.voice_clones enable row level security;

-- USERS: Users can read/update their own profile
create policy "Users can view own profile"
  on public.users for select
  using ((select auth.uid()) = id);

create policy "Users can update own profile"
  on public.users for update
  using ((select auth.uid()) = id);

-- SUBSCRIPTIONS: Users can read their own subscriptions
create policy "Users can view own subscription"
  on public.subscriptions for select
  using ((select auth.uid()) = user_id);

-- CREDITS: Users can read their own credit balance
create policy "Users can view own credits"
  on public.credits for select
  using ((select auth.uid()) = user_id);

-- CREDIT TRANSACTIONS: Users can read their own transactions
create policy "Users can view own credit transactions"
  on public.credit_transactions for select
  using ((select auth.uid()) = user_id);

-- PROJECTS: Users can full CRUD their own projects
create policy "Users can view own projects"
  on public.projects for select
  using ((select auth.uid()) = user_id);

create policy "Users can create own projects"
  on public.projects for insert
  with check ((select auth.uid()) = user_id);

create policy "Users can update own projects"
  on public.projects for update
  using ((select auth.uid()) = user_id);

create policy "Users can delete own projects"
  on public.projects for delete
  using ((select auth.uid()) = user_id);

-- JOBS: Users can view and create their own jobs
create policy "Users can view own jobs"
  on public.jobs for select
  using ((select auth.uid()) = user_id);

create policy "Users can create own jobs"
  on public.jobs for insert
  with check ((select auth.uid()) = user_id);

-- MEDIA FILES: Users can full CRUD their own media
create policy "Users can view own media"
  on public.media_files for select
  using ((select auth.uid()) = user_id);

create policy "Users can insert own media"
  on public.media_files for insert
  with check ((select auth.uid()) = user_id);

create policy "Users can delete own media"
  on public.media_files for delete
  using ((select auth.uid()) = user_id);

-- VOICE CLONES: Users can full CRUD their own voice clones
create policy "Users can view own voice clones"
  on public.voice_clones for select
  using ((select auth.uid()) = user_id);

create policy "Users can insert own voice clones"
  on public.voice_clones for insert
  with check ((select auth.uid()) = user_id);

create policy "Users can delete own voice clones"
  on public.voice_clones for delete
  using ((select auth.uid()) = user_id);


--
-- 4. Triggers for updated_at
--
create trigger handle_updated_at_users
  before update on public.users
  for each row execute procedure public.update_updated_at_column();

create trigger handle_updated_at_subscriptions
  before update on public.subscriptions
  for each row execute procedure public.update_updated_at_column();

create trigger handle_updated_at_credits
  before update on public.credits
  for each row execute procedure public.update_updated_at_column();

create trigger handle_updated_at_projects
  before update on public.projects
  for each row execute procedure public.update_updated_at_column();

-- Note: Credit transactions are immutable history, usually don't need updated_at, but we have the column.
-- Jobs have specific state transitions, but generic updated_at is fine.

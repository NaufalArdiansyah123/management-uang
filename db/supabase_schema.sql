-- Supabase schema for personal finance app
-- Creates categories and transactions tables with RLS

create extension if not exists "pgcrypto";

-- Optional profiles/users table referencing auth.users
create table if not exists profiles (
  id uuid primary key,
  email text,
  full_name text,
  created_at timestamptz default now()
);

-- categories table: per-user categories
create table if not exists categories (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null,
  name text not null,
  color text default '#16A34A',
  icon text default 'tag',
  created_at timestamptz default now(),
  constraint fk_user foreign key (user_id) references auth.users(id) on delete cascade
);

-- transactions table
create table if not exists transactions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null,
  category_id uuid,
  type text not null check (type in ('income', 'expense')),
  amount numeric not null check (amount >= 0),
  note text,
  date date not null,
  created_at timestamptz default now(),
  constraint fk_user_tx foreign key (user_id) references auth.users(id) on delete cascade,
  constraint fk_cat_tx foreign key (category_id) references categories(id) on delete set null
);

-- Enable Row Level Security and policies so users only access their own data
alter table if exists categories enable row level security;
create policy "categories_user_is_owner" on categories
  for all using (user_id = auth.uid()) with check (user_id = auth.uid());

alter table if exists transactions enable row level security;
create policy "transactions_user_is_owner" on transactions
  for all using (user_id = auth.uid()) with check (user_id = auth.uid());

-- Optionally insert a few global category templates (non-user-specific)
create table if not exists category_templates (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  color text default '#16A34A',
  icon text default 'tag'
);

insert into category_templates (id, name, color, icon) values
  (gen_random_uuid(), 'Makanan', '#F97316', 'food'),
  (gen_random_uuid(), 'Transport', '#2563EB', 'car'),
  (gen_random_uuid(), 'Gaji', '#16A34A', 'wallet'),
  (gen_random_uuid(), 'Hiburan', '#EF4444', 'music')
on conflict do nothing;

-- Grant minimal privileges to anon/public as needed (adjust for production)
-- revoke all on schema public from public;

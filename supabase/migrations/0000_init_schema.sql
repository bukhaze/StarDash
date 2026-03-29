-- Enable necessary extensions
create extension if not exists "uuid-ossp";

-- 1. Profiles & Roles Table
create type user_role as enum ('customer', 'worker', 'admin');

create table public.profiles (
  id uuid references auth.users(id) on delete cascade primary key,
  role user_role default 'customer'::user_role not null,
  first_name text not null,
  last_name text not null,
  phone text,
  avatar_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RLS: Profiles
alter table public.profiles enable row level security;
create policy "Public profiles are viewable by everyone." on profiles for select using (true);
create policy "Users can insert their own profile." on profiles for insert with check (auth.uid() = id);
create policy "Users can update own profile." on profiles for update using (auth.uid() = id);

-- 2. Worker Profiles
create type worker_verification_status as enum ('pending', 'approved', 'rejected');

create table public.worker_profiles (
  id uuid references public.profiles(id) on delete cascade primary key,
  bio text,
  rating numeric(3,2) default 0.0 not null,
  total_reviews integer default 0 not null,
  total_jobs integer default 0 not null,
  verification_status worker_verification_status default 'pending'::worker_verification_status not null,
  is_available boolean default false not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.worker_profiles enable row level security;
create policy "Workers viewable by all." on worker_profiles for select using (true);
create policy "Workers can update their own profile." on worker_profiles for update using (auth.uid() = id);

-- 3. Services & Categories
create table public.service_categories (
  id uuid default uuid_generate_v4() primary key,
  name text not null unique,
  slug text not null unique,
  description text,
  image_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table public.services (
  id uuid default uuid_generate_v4() primary key,
  category_id uuid references public.service_categories(id) on delete set null,
  title text not null,
  slug text not null unique,
  description text not null,
  base_price numeric not null,
  price_unit text not null,
  image_url text,
  estimated_duration text,
  is_active boolean default true not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.service_categories enable row level security;
alter table public.services enable row level security;
create policy "Categorias are viewable by everyone." on service_categories for select using (true);
create policy "Services are viewable by everyone." on services for select using (true);
-- (Only admins can insert/update via admin dashboard, RLS rule for admin would be added later)


-- 4. Bookings & Addresses
create table public.addresses (
  id uuid default uuid_generate_v4() primary key,
  customer_id uuid references public.profiles(id) on delete cascade not null,
  label text,
  neighborhood text not null,
  street_address text not null,
  apartment_suite text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create type booking_status as enum ('pending', 'confirmed', 'worker_assigned', 'in_progress', 'completed', 'cancelled');

create table public.bookings (
  id uuid default uuid_generate_v4() primary key,
  customer_id uuid references public.profiles(id) on delete cascade not null,
  worker_id uuid references public.worker_profiles(id) on delete set null,
  service_id uuid references public.services(id) on delete restrict not null,
  address_id uuid references public.addresses(id) on delete restrict not null,
  scheduled_date date not null,
  scheduled_time time not null,
  status booking_status default 'pending'::booking_status not null,
  total_amount numeric not null,
  notes text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table public.booking_items (
  id uuid default uuid_generate_v4() primary key,
  booking_id uuid references public.bookings(id) on delete cascade not null,
  name text not null,
  price numeric not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.addresses enable row level security;
alter table public.bookings enable row level security;
alter table public.booking_items enable row level security;

-- Customers can see/manage their own addresses
create policy "Users manage own addresses." on addresses for all using (auth.uid() = customer_id);

-- Customers can view their bookings, workers can view assigned bookings
create policy "Customers view own bookings." on bookings for select using (auth.uid() = customer_id);
create policy "Workers view assigned bookings." on bookings for select using (auth.uid() = worker_id);
create policy "Customers insert own bookings." on bookings for insert with check (auth.uid() = customer_id);

-- Anyone who can see the booking can see its items
create policy "View booking items." on booking_items for select using (
  exists (
    select 1 from bookings b where b.id = booking_id and (b.customer_id = auth.uid() or b.worker_id = auth.uid())
  )
);
create policy "Customers insert booking items." on booking_items for insert with check (
  exists (
    select 1 from bookings b where b.id = booking_id and b.customer_id = auth.uid()
  )
);


-- Handle updated_at automatically
create or function public.handle_updated_at()
returns trigger
language plpgsql
security definer
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger handle_profiles_updated_at
  before update on public.profiles
  for each row execute procedure public.handle_updated_at();

create trigger handle_worker_profiles_updated_at
  before update on public.worker_profiles
  for each row execute procedure public.handle_updated_at();

create trigger handle_bookings_updated_at
  before update on public.bookings
  for each row execute procedure public.handle_updated_at();

-- Auto-create profile trigger on auth signup
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, first_name, last_name, role)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'first_name', ''),
    coalesce(new.raw_user_meta_data->>'last_name', ''),
    coalesce((new.raw_user_meta_data->>'role')::user_role, 'customer'::user_role)
  );

  -- If worker, initialize worker profile
  if coalesce(new.raw_user_meta_data->>'role', 'customer') = 'worker' then
    insert into public.worker_profiles (id) values (new.id);
  end if;

  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

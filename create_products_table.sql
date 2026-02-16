-- Create products table
create table if not exists products (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  price numeric not null,
  image text,
  category text not null,
  subcategory text,
  artist text,
  rating numeric default 5,
  colors text[], -- Array of strings for colors
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table products enable row level security;

-- Policies
-- Everyone can read products
create policy "Public products are viewable by everyone"
  on products for select
  using ( true );

-- Only authenticated admins can insert/update/delete
-- For now, we'll allow all authenticated users (assuming only admin logs in via Supabase Auth for now)
-- You can restrict this further based on user metadata if needed.
create policy "Admins can insert products"
  on products for insert
  with check ( auth.role() = 'authenticated' );

create policy "Admins can update products"
  on products for update
  using ( auth.role() = 'authenticated' );

create policy "Admins can delete products"
  on products for delete
  using ( auth.role() = 'authenticated' );

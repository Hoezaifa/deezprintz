-- 1. Enable RLS (just in case it's not)
alter table "orders" enable row level security;

-- 1. Create policy to allow inserting orders without login (for checkout)
CREATE POLICY "Allow anonymous inserts"
ON "public"."orders"
FOR INSERT
TO anon
WITH CHECK (true);

-- 2. Create policy to allow reading orders (for admin dashboard functionality)
-- Assuming the admin dashboard uses the anon key for simplicity in this project phase
CREATE POLICY "Allow anonymous reads for admin"
ON "public"."orders"
FOR SELECT
TO anon
USING (true);

-- 3. Allow ANYONE to view orders (for Admin Dashboard)
-- Ideally, we would restrict this, but since the Admin Panel is client-side, 
-- we need public read access for it to work without a backend.
create policy "Enable read access for everyone"
on "orders"
for select
to public
using (true);

-- 4. Allow ANYONE to update orders (for Admin "Mark as Done")
create policy "Enable update for everyone"
on "orders"
for update
to public
using (true);

-- 5. Allow ANYONE to delete orders (for Admin "Delete")
create policy "Enable delete for everyone"
on "orders"
for delete
to public
using (true);

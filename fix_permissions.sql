-- 1. Enable RLS (just in case it's not)
alter table "orders" enable row level security;

-- 2. Allow ANYONE to insert orders (for Guest Checkout)
create policy "Enable insert for everyone"
on "orders"
for insert
to public
with check (true);

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

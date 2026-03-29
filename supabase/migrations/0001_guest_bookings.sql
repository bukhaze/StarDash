-- 1. Make customer_id nullable for Guest Bookings
ALTER TABLE public.bookings ALTER COLUMN customer_id DROP NOT NULL;
ALTER TABLE public.addresses ALTER COLUMN customer_id DROP NOT NULL;

-- 2. Add Guest Information Columns to Bookings
ALTER TABLE public.bookings ADD COLUMN guest_name text;
ALTER TABLE public.bookings ADD COLUMN guest_email text;
ALTER TABLE public.bookings ADD COLUMN guest_phone text;

-- 3. Update RLS policies to allow anonymous inserts for Bookings and Addresses
-- Drop old policies
DROP POLICY IF EXISTS "Customers insert own bookings." ON bookings;
DROP POLICY IF EXISTS "Users manage own addresses." ON addresses;

-- Add new policies for anonymous/guest access
CREATE POLICY "Anyone can insert addresses for bookings" ON addresses FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can insert bookings" ON bookings FOR INSERT WITH CHECK (true);

-- (Keep the specific select/update policies intact so only admins/workers/owners can read them)

-- Run this script in your Supabase SQL Editor to fix the "Failed to update status" error.

ALTER TABLE orders 
ADD COLUMN IF NOT EXISTS is_read BOOLEAN DEFAULT FALSE;

-- Optional: Update existing rows to be unread by default
UPDATE orders SET is_read = FALSE WHERE is_read IS NULL;

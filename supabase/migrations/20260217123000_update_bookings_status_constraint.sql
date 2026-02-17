-- Align allowed booking statuses with the admin dashboard filters/actions.
ALTER TABLE public.bookings
DROP CONSTRAINT IF EXISTS bookings_status_check;

ALTER TABLE public.bookings
ADD CONSTRAINT bookings_status_check
CHECK (status IN ('new', 'called', 'in_progress', 'completed', 'cancelled'));

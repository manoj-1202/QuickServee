-- Create bookings table for customer service requests
CREATE TABLE public.bookings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  customer_name TEXT NOT NULL,
  phone_number TEXT NOT NULL,
  location TEXT NOT NULL,
  service TEXT NOT NULL,
  problem_description TEXT,
  preferred_date DATE,
  preferred_time TEXT,
  status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'called', 'completed')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create admin_profiles table to identify admin users
CREATE TABLE public.admin_profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_profiles ENABLE ROW LEVEL SECURITY;

-- Bookings: Allow anyone to INSERT (public booking form)
CREATE POLICY "Anyone can create a booking" 
ON public.bookings 
FOR INSERT 
WITH CHECK (true);

-- Bookings: Only authenticated admins can SELECT
CREATE POLICY "Admins can view all bookings" 
ON public.bookings 
FOR SELECT 
USING (
  EXISTS (
    SELECT 1 FROM public.admin_profiles 
    WHERE admin_profiles.user_id = auth.uid()
  )
);

-- Bookings: Only authenticated admins can UPDATE
CREATE POLICY "Admins can update bookings" 
ON public.bookings 
FOR UPDATE 
USING (
  EXISTS (
    SELECT 1 FROM public.admin_profiles 
    WHERE admin_profiles.user_id = auth.uid()
  )
);

-- Bookings: Only authenticated admins can DELETE
CREATE POLICY "Admins can delete bookings" 
ON public.bookings 
FOR DELETE 
USING (
  EXISTS (
    SELECT 1 FROM public.admin_profiles 
    WHERE admin_profiles.user_id = auth.uid()
  )
);

-- Admin Profiles: Only the admin themselves can view their profile
CREATE POLICY "Admins can view own profile" 
ON public.admin_profiles 
FOR SELECT 
USING (auth.uid() = user_id);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for automatic timestamp updates on bookings
CREATE TRIGGER update_bookings_updated_at
BEFORE UPDATE ON public.bookings
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create index for faster queries
CREATE INDEX idx_bookings_status ON public.bookings(status);
CREATE INDEX idx_bookings_service ON public.bookings(service);
CREATE INDEX idx_bookings_created_at ON public.bookings(created_at DESC);
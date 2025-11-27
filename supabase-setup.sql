-- Create user_profiles table
CREATE TABLE IF NOT EXISTS user_profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  username TEXT NOT NULL,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Create restaurants table
CREATE TABLE IF NOT EXISTS restaurants (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  cuisine_type TEXT NOT NULL,
  price_range TEXT NOT NULL CHECK (price_range IN ('$', '$$', '$$$')),
  distance TEXT NOT NULL,
  address TEXT NOT NULL,
  notes TEXT,
  image_url TEXT,
  created_by UUID REFERENCES auth.users(id) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Enable Row Level Security
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE restaurants ENABLE ROW LEVEL SECURITY;

-- RLS Policies for user_profiles
CREATE POLICY "Users can view their own profile" 
  ON user_profiles FOR SELECT 
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" 
  ON user_profiles FOR UPDATE 
  USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile" 
  ON user_profiles FOR INSERT 
  WITH CHECK (auth.uid() = id);

-- RLS Policies for restaurants
CREATE POLICY "Anyone can view restaurants" 
  ON restaurants FOR SELECT 
  USING (true);

CREATE POLICY "Authenticated users can create restaurants" 
  ON restaurants FOR INSERT 
  WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Users can update their own restaurants" 
  ON restaurants FOR UPDATE 
  USING (auth.uid() = created_by);

CREATE POLICY "Users can delete their own restaurants" 
  ON restaurants FOR DELETE 
  USING (auth.uid() = created_by);

-- Create function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = TIMEZONE('utc', NOW());
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for restaurants table
CREATE TRIGGER update_restaurants_updated_at 
  BEFORE UPDATE ON restaurants
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();

-- Create function to handle new user registration
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.user_profiles (id, username, avatar_url)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'username', split_part(NEW.email, '@', 1)),
    NEW.raw_user_meta_data->>'avatar_url'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for automatic user profile creation
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create storage bucket for restaurant images
INSERT INTO storage.buckets (id, name, public) 
VALUES ('restaurant-images', 'restaurant-images', true)
ON CONFLICT (id) DO NOTHING;

-- Storage policies
CREATE POLICY "Anyone can view restaurant images"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'restaurant-images');

CREATE POLICY "Authenticated users can upload restaurant images"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'restaurant-images' 
    AND auth.role() = 'authenticated'
  );

CREATE POLICY "Authenticated users can update images"
  ON storage.objects FOR UPDATE
  USING (bucket_id = 'restaurant-images' AND auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete images"
  ON storage.objects FOR DELETE
  USING (bucket_id = 'restaurant-images' AND auth.role() = 'authenticated');


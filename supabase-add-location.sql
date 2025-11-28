-- Add latitude and longitude columns to restaurants table
ALTER TABLE restaurants 
ADD COLUMN IF NOT EXISTS latitude DOUBLE PRECISION,
ADD COLUMN IF NOT EXISTS longitude DOUBLE PRECISION;

-- Add index for better performance on location queries
CREATE INDEX IF NOT EXISTS idx_restaurants_location 
ON restaurants (latitude, longitude);

-- Add comment
COMMENT ON COLUMN restaurants.latitude IS 'Restaurant latitude coordinate';
COMMENT ON COLUMN restaurants.longitude IS 'Restaurant longitude coordinate';


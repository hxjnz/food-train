// Database Types
export interface Restaurant {
  id: string;
  name: string;
  cuisine_type: string;
  price_range: '$' | '$$' | '$$$';
  distance: string;
  address: string;
  notes: string;
  image_url: string | null;
  latitude: number | null;
  longitude: number | null;
  created_by: string;
  created_at: string;
  updated_at: string;
}

export interface UserProfile {
  id: string;
  username: string;
  avatar_url: string | null;
  created_at: string;
}

// Form Types
export interface RestaurantFormData {
  name: string;
  cuisine_type: string;
  price_range: '$' | '$$' | '$$$';
  distance: string;
  address: string;
  notes: string;
  image?: File | null;
}

// Filter Types
export interface FilterOptions {
  cuisine_type?: string;
  price_range?: string;
  distance?: string;
}


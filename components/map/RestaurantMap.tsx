'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { createClient } from '@/lib/supabase/client';
import { Restaurant } from '@/lib/types';
import { Loader2 } from 'lucide-react';
import '@/lib/leaflet-config';

// Dynamically import map components to avoid SSR issues
const MapContainer = dynamic(
  () => import('react-leaflet').then((mod) => mod.MapContainer),
  { ssr: false }
);

const TileLayer = dynamic(
  () => import('react-leaflet').then((mod) => mod.TileLayer),
  { ssr: false }
);

const Marker = dynamic(
  () => import('react-leaflet').then((mod) => mod.Marker),
  { ssr: false }
);

const Popup = dynamic(
  () => import('react-leaflet').then((mod) => mod.Popup),
  { ssr: false }
);

interface RestaurantMapProps {
  filters?: {
    cuisine_type?: string;
    price_range?: string;
    distance?: string;
  };
}

export function RestaurantMap({ filters }: RestaurantMapProps) {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);
  const supabase = createClient();

  useEffect(() => {
    setMounted(true);
    fetchRestaurants();
  }, [filters]);

  const fetchRestaurants = async () => {
    setLoading(true);
    try {
      let query = supabase
        .from('restaurants')
        .select('*')
        .not('latitude', 'is', null)
        .not('longitude', 'is', null)
        .order('created_at', { ascending: false });

      if (filters?.cuisine_type) {
        query = query.eq('cuisine_type', filters.cuisine_type);
      }
      if (filters?.price_range) {
        query = query.eq('price_range', filters.price_range);
      }
      if (filters?.distance) {
        query = query.eq('distance', filters.distance);
      }

      const { data, error } = await query;

      if (error) throw error;
      setRestaurants(data || []);
    } catch (error) {
      console.error('Error fetching restaurants:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!mounted) {
    return (
      <div className="w-full h-[600px] flex items-center justify-center bg-gray-100 rounded-lg">
        <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
      </div>
    );
  }

  if (loading) {
    return (
      <div className="w-full h-[600px] flex items-center justify-center bg-gray-100 rounded-lg">
        <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
      </div>
    );
  }

  if (restaurants.length === 0) {
    return (
      <div className="w-full h-[600px] flex items-center justify-center bg-gray-100 rounded-lg">
        <div className="text-center">
          <p className="text-gray-500">No restaurants with location data</p>
        </div>
      </div>
    );
  }

  // Auckland CBD center
  const center: [number, number] = [-36.848, 174.763];

  return (
    <div className="w-full h-[calc(100vh-200px)] min-h-[400px] rounded-lg overflow-hidden border shadow-sm">
      <MapContainer
        center={center}
        zoom={15}
        style={{ height: '100%', width: '100%' }}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {restaurants.map((restaurant) => {
          if (!restaurant.latitude || !restaurant.longitude) return null;
          
          return (
            <Marker
              key={restaurant.id}
              position={[restaurant.latitude, restaurant.longitude]}
            >
              <Popup>
                <div className="min-w-[200px]">
                  {restaurant.image_url && (
                    <img
                      src={restaurant.image_url}
                      alt={restaurant.name}
                      className="w-full h-32 object-cover rounded mb-2"
                    />
                  )}
                  <h3 className="font-bold text-base mb-1">{restaurant.name}</h3>
                  <p className="text-sm text-gray-600 mb-1">
                    <span className="font-medium">{restaurant.cuisine_type}</span>
                    {' • '}
                    <span>{restaurant.price_range}</span>
                  </p>
                  <p className="text-xs text-gray-500 mb-2">{restaurant.distance}</p>
                  <p className="text-xs text-gray-700 mb-2">{restaurant.address}</p>
                  {restaurant.notes && (
                    <p className="text-xs text-gray-600 line-clamp-2 mb-2">
                      {restaurant.notes}
                    </p>
                  )}
                  <a
                    href={`/restaurants/${restaurant.id}`}
                    className="text-xs text-blue-600 hover:underline"
                  >
                    View Details →
                  </a>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}


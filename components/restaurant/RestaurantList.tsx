'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Restaurant } from '@/lib/types';
import { RestaurantCard } from './RestaurantCard';
import { useAuth } from '@/components/auth/AuthProvider';
import { useLanguage } from '@/components/LanguageContext';
import { translations } from '@/lib/i18n';

interface RestaurantListProps {
  filters?: {
    cuisine_type?: string;
    price_range?: string;
    distance?: string;
  };
}

export function RestaurantList({ filters }: RestaurantListProps) {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { locale } = useLanguage();
  const t = translations[locale];
  const supabase = createClient();

  useEffect(() => {
    fetchRestaurants();
  }, [filters]);

  const fetchRestaurants = async () => {
    setLoading(true);
    try {
      let query = supabase
        .from('restaurants')
        .select('*')
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

  const handleDelete = async (id: string) => {
    if (!confirm(t.confirmDelete)) return;

    try {
      const { error } = await supabase.from('restaurants').delete().eq('id', id);

      if (error) throw error;

      setRestaurants(restaurants.filter((r) => r.id !== id));
    } catch (error) {
      console.error('Error deleting restaurant:', error);
      alert(t.deleteFailed);
    }
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="h-80 sm:h-96 bg-gray-200 rounded-lg animate-pulse" />
        ))}
      </div>
    );
  }

  if (restaurants.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="text-6xl mb-4">🍽️</div>
        <p className="text-gray-500 text-base sm:text-lg px-4">{t.noRestaurants}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {restaurants.map((restaurant) => (
        <RestaurantCard
          key={restaurant.id}
          restaurant={restaurant}
          onDelete={handleDelete}
          canEdit={user?.id === restaurant.created_by}
        />
      ))}
    </div>
  );
}


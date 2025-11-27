'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Restaurant } from '@/lib/types';
import { useLanguage } from '@/components/LanguageContext';
import { translations } from '@/lib/i18n';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, DollarSign } from 'lucide-react';

interface RestaurantCardProps {
  restaurant: Restaurant;
  onDelete?: (id: string) => void;
  canEdit?: boolean;
}

export function RestaurantCard({ restaurant, onDelete, canEdit }: RestaurantCardProps) {
  const { locale } = useLanguage();
  const t = translations[locale];

  return (
    <Card className="overflow-hidden active:scale-95 transition-transform">
      <Link href={`/restaurants/${restaurant.id}`}>
        <CardHeader className="p-0">
          <div className="relative h-52 sm:h-48 w-full bg-gray-200">
            {restaurant.image_url ? (
              <Image
                src={restaurant.image_url}
                alt={restaurant.name}
                fill
                className="object-cover"
              />
            ) : (
              <div className="flex items-center justify-center h-full text-gray-400">
                <span className="text-5xl sm:text-4xl">🍽️</span>
              </div>
            )}
          </div>
        </CardHeader>
      </Link>
      <CardContent className="p-4">
        <div className="space-y-3">
          <div className="flex items-start justify-between gap-2">
            <Link href={`/restaurants/${restaurant.id}`} className="flex-1 min-w-0">
              <h3 className="text-lg sm:text-xl font-semibold line-clamp-2">{restaurant.name}</h3>
            </Link>
            <Badge variant="secondary" className="shrink-0">{restaurant.cuisine_type}</Badge>
          </div>
          <div className="flex items-center gap-3 text-sm sm:text-base text-gray-600">
            <div className="flex items-center gap-1">
              <DollarSign className="h-4 w-4 sm:h-5 sm:w-5" />
              <span className="font-medium">{restaurant.price_range}</span>
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="h-4 w-4 sm:h-5 sm:w-5" />
              <span className="truncate">{restaurant.distance}</span>
            </div>
          </div>
          {restaurant.address && (
            <p className="text-sm text-gray-500 line-clamp-1">{restaurant.address}</p>
          )}
          {restaurant.notes && (
            <p className="text-sm text-gray-600 line-clamp-2">{restaurant.notes}</p>
          )}
        </div>
      </CardContent>
      {canEdit && (
        <CardFooter className="p-4 pt-0 flex gap-2">
          <Link href={`/restaurants/${restaurant.id}/edit`} className="flex-1">
            <Button variant="outline" size="lg" className="w-full h-12">{t.edit}</Button>
          </Link>
          {onDelete && (
            <Button
              variant="destructive"
              size="lg"
              className="h-12 px-6"
              onClick={() => onDelete(restaurant.id)}
            >
              {t.delete}
            </Button>
          )}
        </CardFooter>
      )}
    </Card>
  );
}


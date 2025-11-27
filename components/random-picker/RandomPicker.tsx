'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { Restaurant } from '@/lib/types';
import { useLanguage } from '@/components/LanguageContext';
import { translations } from '@/lib/i18n';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Loader2, RefreshCw, ExternalLink } from 'lucide-react';
import Image from 'next/image';

interface RandomPickerProps {
  filters?: any;
  onClose: () => void;
}

export function RandomPicker({ filters, onClose }: RandomPickerProps) {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [loading, setLoading] = useState(true);
  const { locale } = useLanguage();
  const t = translations[locale];
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    fetchRestaurants();
  }, []);

  const fetchRestaurants = async () => {
    setLoading(true);
    try {
      let query = supabase.from('restaurants').select('*');

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

  const spinAndPick = () => {
    if (restaurants.length === 0) return;

    setIsSpinning(true);
    setSelectedRestaurant(null);

    // Simulate spinning animation
    let count = 0;
    const spinInterval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * restaurants.length);
      setSelectedRestaurant(restaurants[randomIndex]);
      count++;

      if (count > 15) {
        clearInterval(spinInterval);
        setIsSpinning(false);
      }
    }, 100);
  };

  const goToRestaurant = () => {
    if (selectedRestaurant) {
      router.push(`/restaurants/${selectedRestaurant.id}`);
      onClose();
    }
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-[95vw] sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl sm:text-2xl text-center">{t.randomTitle}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 sm:space-y-6 py-2 sm:py-4">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
            </div>
          ) : restaurants.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">{t.noMatchingRestaurants}</p>
              <Button onClick={onClose} className="mt-4">
                {t.back}
              </Button>
            </div>
          ) : (
            <>
              {/* Selected Restaurant Card */}
              {selectedRestaurant ? (
                <Card className={`overflow-hidden transition-all ${isSpinning ? 'opacity-70' : ''}`}>
                  <div className="relative h-56 sm:h-48 w-full bg-gray-200">
                    {selectedRestaurant.image_url ? (
                      <Image
                        src={selectedRestaurant.image_url}
                        alt={selectedRestaurant.name}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full text-6xl sm:text-7xl">
                        🍽️
                      </div>
                    )}
                  </div>
                  <CardContent className="p-4 sm:p-6">
                    <div className="space-y-3">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="text-xl sm:text-2xl font-bold flex-1">{selectedRestaurant.name}</h3>
                        <Badge variant="secondary" className="text-sm sm:text-base shrink-0">
                          {selectedRestaurant.cuisine_type}
                        </Badge>
                      </div>
                      <div className="flex gap-3 sm:gap-4 text-base sm:text-lg text-gray-600 font-medium">
                        <span>{selectedRestaurant.price_range}</span>
                        <span>•</span>
                        <span>{selectedRestaurant.distance}</span>
                      </div>
                      <p className="text-sm sm:text-base text-gray-700">{selectedRestaurant.address}</p>
                      {selectedRestaurant.notes && (
                        <p className="text-sm text-gray-600 line-clamp-3">
                          {selectedRestaurant.notes}
                        </p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <div className="flex items-center justify-center py-16 sm:py-12 text-gray-400">
                  <div className="text-center px-4">
                    <div className="text-7xl sm:text-6xl mb-4">🎰</div>
                    <p className="text-base sm:text-lg">{locale === 'zh' ? '点击下方按钮开始抽取' : 'Click the button below to start'}</p>
                  </div>
                </div>
              )}

              {/* Action Buttons - Mobile Optimized */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  onClick={spinAndPick}
                  disabled={isSpinning}
                  className="flex-1 h-14 sm:h-12 text-base"
                  size="lg"
                >
                  {isSpinning ? (
                    <>
                      <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                      {t.picking}
                    </>
                  ) : (
                    <>
                      <RefreshCw className="h-5 w-5 mr-2" />
                      {selectedRestaurant ? t.pickAgain : t.startPicking}
                    </>
                  )}
                </Button>
                {selectedRestaurant && !isSpinning && (
                  <Button
                    onClick={goToRestaurant}
                    variant="outline"
                    size="lg"
                    className="h-14 sm:h-12 text-base"
                  >
                    <ExternalLink className="h-5 w-5 mr-2" />
                    {t.viewDetails}
                  </Button>
                )}
              </div>

              <p className="text-center text-sm sm:text-base text-gray-500">
                {t.totalRestaurants.replace('{count}', restaurants.length.toString())}
              </p>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}


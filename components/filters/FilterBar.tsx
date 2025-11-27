'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card } from '@/components/ui/card';
import { useLanguage } from '@/components/LanguageContext';
import { translations } from '@/lib/i18n';
import { Filter, X } from 'lucide-react';

interface FilterBarProps {
  onFilterChange: (filters: any) => void;
}

export function FilterBar({ onFilterChange }: FilterBarProps) {
  const { locale } = useLanguage();
  const t = translations[locale];
  const [cuisineType, setCuisineType] = useState('');
  const [priceRange, setPriceRange] = useState('');
  const [distance, setDistance] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const applyFilters = () => {
    const filters: any = {};
    if (cuisineType) filters.cuisine_type = cuisineType;
    if (priceRange) filters.price_range = priceRange;
    if (distance) filters.distance = distance;
    onFilterChange(filters);
  };

  const clearFilters = () => {
    setCuisineType('');
    setPriceRange('');
    setDistance('');
    onFilterChange({});
  };

  const hasActiveFilters = cuisineType || priceRange || distance;

  return (
    <Card className="overflow-hidden">
      <button
        onClick={() => setShowFilters(!showFilters)}
        className="w-full p-4 flex items-center justify-between active:bg-gray-50"
      >
        <div className="flex items-center gap-3">
          <Filter className="h-5 w-5 text-gray-600" />
          <h2 className="text-base sm:text-lg font-semibold">{t.filterTitle}</h2>
          {hasActiveFilters && (
            <span className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded-full font-medium">
              {[cuisineType, priceRange, distance].filter(Boolean).length}
            </span>
          )}
        </div>
        <span className="text-gray-400 text-sm">
          {showFilters ? '▲' : '▼'}
        </span>
      </button>

      {showFilters && (
        <div className="p-4 pt-0 space-y-3 border-t">
          <div className="space-y-3">
            <Input
              placeholder={t.cuisinePlaceholder}
              value={cuisineType}
              onChange={(e) => setCuisineType(e.target.value)}
              className="h-12 text-base"
            />

            <Select value={priceRange} onValueChange={setPriceRange}>
              <SelectTrigger className="h-12 text-base">
                <SelectValue placeholder={t.priceRange} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value=" ">{t.allPrices}</SelectItem>
                <SelectItem value="$">$ ({t.cheap})</SelectItem>
                <SelectItem value="$$">$$ ({t.medium})</SelectItem>
                <SelectItem value="$$$">$$$ ({t.expensive})</SelectItem>
              </SelectContent>
            </Select>

            <Input
              placeholder={t.distancePlaceholder}
              value={distance}
              onChange={(e) => setDistance(e.target.value)}
              className="h-12 text-base"
            />

            <div className="flex gap-2 pt-2">
              <Button onClick={applyFilters} size="lg" className="flex-1 h-12 text-base">
                {t.apply}
              </Button>
              {hasActiveFilters && (
                <Button variant="outline" size="lg" onClick={clearFilters} className="h-12 px-6">
                  <X className="h-5 w-5" />
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </Card>
  );
}


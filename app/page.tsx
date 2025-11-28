'use client';

import { useState, useCallback } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { RestaurantList } from '@/components/restaurant/RestaurantList';
import { FilterBar } from '@/components/filters/FilterBar';
import { RandomPicker } from '@/components/random-picker/RandomPicker';
import { UserNav } from '@/components/auth/UserNav';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { useLanguage } from '@/components/LanguageContext';
import { useAuth } from '@/components/auth/AuthProvider';
import { translations } from '@/lib/i18n';
import { useShakeDetection } from '@/hooks/useShakeDetection';
import { Plus, LogIn, Smartphone } from 'lucide-react';

export default function HomePage() {
  const [filters, setFilters] = useState({});
  const [showRandomPicker, setShowRandomPicker] = useState(false);
  const [shakeHint, setShakeHint] = useState(true);
  const { locale } = useLanguage();
  const { user } = useAuth();
  const t = translations[locale];

  // 摇一摇检测
  const handleShake = useCallback(() => {
    setShowRandomPicker(true);
    setShakeHint(false); // 第一次摇动后隐藏提示
  }, []);

  useShakeDetection({
    threshold: 15,
    timeout: 1000,
    onShake: handleShake,
  });

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Mobile-First Header */}
      <header className="bg-white border-b sticky top-0 z-10 shadow-sm">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between mb-2">
            <div className="flex-1">
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900">{t.appTitle}</h1>
              <p className="text-xs sm:text-sm text-gray-600">{t.appSubtitle}</p>
            </div>
            <div className="flex items-center gap-2">
              <LanguageSwitcher />
              <UserNav />
            </div>
          </div>
        </div>
      </header>

      {/* Guest Banner - Mobile Optimized */}
      {!user && (
        <div className="bg-blue-50 border-b border-blue-200">
          <div className="px-4 py-3">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div className="flex flex-col gap-1">
                <span className="text-blue-800 font-medium text-sm">👋 {t.guestBanner}</span>
                <span className="text-blue-600 text-xs">{t.guestMessage}</span>
              </div>
              <div className="flex gap-2">
                <Link href="/login" className="flex-1 sm:flex-none">
                  <Button variant="outline" size="sm" className="w-full">
                    {t.login}
                  </Button>
                </Link>
                <Link href="/signup" className="flex-1 sm:flex-none">
                  <Button size="sm" className="w-full">{t.signup}</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Shake Hint - Mobile Only */}
      {shakeHint && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-30 sm:hidden">
          <div className="bg-blue-500 text-white px-4 py-2 rounded-full shadow-lg flex items-center gap-2 animate-bounce">
            <Smartphone className="h-4 w-4" />
            <span className="text-sm font-medium">
              {locale === 'zh' ? '摇一摇手机试试！' : 'Shake your phone!'}
            </span>
            <button 
              onClick={() => setShakeHint(false)}
              className="ml-2 hover:bg-blue-600 rounded-full p-1"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Main Content - Mobile First */}
      <main className="px-4 py-4 sm:py-6 max-w-7xl mx-auto">
        <div className="space-y-4">
          {/* Filters - Mobile Optimized */}
          <FilterBar onFilterChange={setFilters} />

          {/* Restaurant List */}
          <RestaurantList filters={filters} />
        </div>
      </main>

      {/* Bottom Navigation - Mobile */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg z-20 sm:hidden">
        <div className="grid grid-cols-2 gap-2 p-3">
          <Button
            onClick={() => setShowRandomPicker(true)}
            variant="outline"
            size="lg"
            className="h-14 text-base"
          >
            🎲 {locale === 'zh' ? '随机选择' : 'Random'}
          </Button>
          {user ? (
            <Link href="/restaurants/new" className="flex-1">
              <Button size="lg" className="w-full h-14 text-base">
                <Plus className="h-5 w-5 mr-2" />
                {locale === 'zh' ? '添加' : 'Add'}
              </Button>
            </Link>
          ) : (
            <Link href="/login" className="flex-1">
              <Button size="lg" className="w-full h-14 text-base">
                <LogIn className="h-5 w-5 mr-2" />
                {locale === 'zh' ? '登录' : 'Login'}
              </Button>
            </Link>
          )}
        </div>
      </div>

      {/* Desktop Action Buttons */}
      <div className="hidden sm:block fixed bottom-8 right-8 z-20">
        <div className="flex flex-col gap-3">
          <Button
            onClick={() => setShowRandomPicker(true)}
            size="lg"
            className="shadow-lg"
          >
            🎲 {t.randomPick}
          </Button>
          {user ? (
            <Link href="/restaurants/new">
              <Button size="lg" className="w-full shadow-lg">
                <Plus className="h-5 w-5 mr-2" />
                {t.addRestaurant}
              </Button>
            </Link>
          ) : (
            <Link href="/login">
              <Button size="lg" className="w-full shadow-lg">
                <LogIn className="h-5 w-5 mr-2" />
                {t.loginToAdd}
              </Button>
            </Link>
          )}
        </div>
      </div>

      {/* Random Picker Modal */}
      {showRandomPicker && (
        <RandomPicker
          filters={filters}
          onClose={() => setShowRandomPicker(false)}
        />
      )}
    </div>
  );
}

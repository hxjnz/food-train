'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { useAuth } from '@/components/auth/AuthProvider';
import { Restaurant } from '@/lib/types';
import { LocationPicker } from '@/components/map/LocationPicker';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2, Check, ArrowLeft, MapPin, Save } from 'lucide-react';
import Link from 'next/link';

export default function AdjustLocationsPage() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const { user } = useAuth();
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    fetchRestaurants();
  }, []);

  const fetchRestaurants = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('restaurants')
        .select('*')
        .order('name');

      if (error) throw error;
      setRestaurants(data || []);
    } catch (error) {
      console.error('Error fetching restaurants:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectRestaurant = (restaurantId: string) => {
    const restaurant = restaurants.find(r => r.id === restaurantId);
    if (restaurant) {
      setSelectedRestaurant(restaurant);
      setLocation(
        restaurant.latitude && restaurant.longitude
          ? { lat: restaurant.latitude, lng: restaurant.longitude }
          : null
      );
      setMessage('');
    }
  };

  const handleSaveLocation = async () => {
    if (!selectedRestaurant || !location) return;

    setSaving(true);
    setMessage('');

    try {
      const { error } = await supabase
        .from('restaurants')
        .update({
          latitude: location.lat,
          longitude: location.lng,
        })
        .eq('id', selectedRestaurant.id);

      if (error) throw error;

      setMessage(`✅ Location saved for ${selectedRestaurant.name}`);
      
      // Update local state
      setRestaurants(restaurants.map(r => 
        r.id === selectedRestaurant.id 
          ? { ...r, latitude: location.lat, longitude: location.lng }
          : r
      ));
      
      setTimeout(() => setMessage(''), 3000);
    } catch (error: any) {
      setMessage(`❌ Error: ${error.message}`);
    } finally {
      setSaving(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle>Authentication Required</CardTitle>
            <CardDescription>Please login to access this page</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/login">
              <Button className="w-full">Go to Login</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="mb-6">
          <Link href="/">
            <Button variant="ghost">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-2">
              <MapPin className="h-6 w-6" />
              Adjust Restaurant Locations
            </CardTitle>
            <CardDescription>
              Click on the map to set the exact location for each restaurant
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
              </div>
            ) : (
              <>
                {/* Restaurant Selector */}
                <div className="space-y-2">
                  <Label>Select Restaurant</Label>
                  <Select 
                    value={selectedRestaurant?.id || ''} 
                    onValueChange={handleSelectRestaurant}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Choose a restaurant..." />
                    </SelectTrigger>
                    <SelectContent className="max-h-[300px]">
                      {restaurants.map((restaurant) => (
                        <SelectItem key={restaurant.id} value={restaurant.id}>
                          <div className="flex items-center gap-2">
                            <span>{restaurant.name}</span>
                            {restaurant.latitude && restaurant.longitude ? (
                              <span className="text-green-600">✓</span>
                            ) : (
                              <span className="text-red-600">⚠</span>
                            )}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-gray-500">
                    ✓ = has location, ⚠ = missing location
                  </p>
                </div>

                {selectedRestaurant && (
                  <>
                    {/* Restaurant Info */}
                    <div className="border rounded-lg p-4 bg-gray-50">
                      <h3 className="font-semibold mb-2">{selectedRestaurant.name}</h3>
                      <p className="text-sm text-gray-600 mb-1">
                        {selectedRestaurant.cuisine_type} • {selectedRestaurant.price_range}
                      </p>
                      <p className="text-sm text-gray-700">{selectedRestaurant.address}</p>
                    </div>

                    {/* Location Picker */}
                    <div className="space-y-2">
                      <Label>Click on map to set location</Label>
                      <LocationPicker value={location} onChange={setLocation} />
                      {location && (
                        <p className="text-sm text-gray-600">
                          Current: {location.lat.toFixed(6)}, {location.lng.toFixed(6)}
                        </p>
                      )}
                    </div>

                    {/* Save Button */}
                    <Button
                      onClick={handleSaveLocation}
                      disabled={!location || saving}
                      size="lg"
                      className="w-full"
                    >
                      {saving ? (
                        <>
                          <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                          Saving...
                        </>
                      ) : (
                        <>
                          <Save className="h-5 w-5 mr-2" />
                          Save Location
                        </>
                      )}
                    </Button>

                    {/* Message */}
                    {message && (
                      <div className={`rounded-lg p-3 text-sm ${
                        message.startsWith('✅') 
                          ? 'bg-green-50 text-green-800' 
                          : 'bg-red-50 text-red-800'
                      }`}>
                        {message}
                      </div>
                    )}
                  </>
                )}

                {/* Statistics */}
                <div className="border-t pt-4">
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <p className="text-2xl font-bold text-green-600">
                        {restaurants.filter(r => r.latitude && r.longitude).length}
                      </p>
                      <p className="text-sm text-gray-600">With Location</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-red-600">
                        {restaurants.filter(r => !r.latitude || !r.longitude).length}
                      </p>
                      <p className="text-sm text-gray-600">Missing Location</p>
                    </div>
                  </div>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function Label({ children, ...props }: any) {
  return <label className="text-sm font-medium" {...props}>{children}</label>;
}


'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { useAuth } from '@/components/auth/AuthProvider';
import { aucklandRestaurantsWithCoords } from '@/lib/seed-data-with-coords';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Check, X, ArrowLeft, MapPin } from 'lucide-react';
import Link from 'next/link';

export default function UpdateCoordsPage() {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<{ success: number; failed: number; errors: string[] }>({
    success: 0,
    failed: 0,
    errors: [],
  });
  const [completed, setCompleted] = useState(false);
  const { user } = useAuth();
  const router = useRouter();
  const supabase = createClient();

  const handleUpdateCoords = async () => {
    if (!user) {
      alert('Please login first');
      router.push('/login');
      return;
    }

    if (!confirm(`Update coordinates for ${aucklandRestaurantsWithCoords.length} restaurants?`)) {
      return;
    }

    setLoading(true);
    setCompleted(false);
    const newResults = { success: 0, failed: 0, errors: [] as string[] };

    // Get all restaurants
    const { data: restaurants, error: fetchError } = await supabase
      .from('restaurants')
      .select('id, name');

    if (fetchError) {
      alert('Failed to fetch restaurants: ' + fetchError.message);
      setLoading(false);
      return;
    }

    // Update each restaurant with matching coordinates
    for (const seedRestaurant of aucklandRestaurantsWithCoords) {
      const restaurant = restaurants?.find(r => r.name === seedRestaurant.name);
      
      if (restaurant && seedRestaurant.latitude && seedRestaurant.longitude) {
        try {
          const { error } = await supabase
            .from('restaurants')
            .update({ 
              latitude: seedRestaurant.latitude,
              longitude: seedRestaurant.longitude 
            })
            .eq('id', restaurant.id);

          if (error) {
            newResults.failed++;
            newResults.errors.push(`${restaurant.name}: ${error.message}`);
          } else {
            newResults.success++;
          }

          setResults({ ...newResults });
        } catch (err: any) {
          newResults.failed++;
          newResults.errors.push(`${restaurant.name}: ${err.message}`);
          setResults({ ...newResults });
        }
      }
    }

    setLoading(false);
    setCompleted(true);
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
      <div className="container mx-auto px-4 max-w-3xl">
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
              Update Restaurant Coordinates
            </CardTitle>
            <CardDescription>
              Add geographic coordinates for {aucklandRestaurantsWithCoords.length} Auckland CBD restaurants
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Coordinates Preview */}
            <div className="border rounded-lg p-4 bg-gray-50">
              <h3 className="font-semibold mb-3">Sample Coordinates:</h3>
              <div className="space-y-2 text-sm">
                {aucklandRestaurantsWithCoords.slice(0, 5).map((r, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <span className="font-medium">{r.name}</span>
                    <span className="text-gray-600">
                      {r.latitude?.toFixed(4)}, {r.longitude?.toFixed(4)}
                    </span>
                  </div>
                ))}
                <div className="text-gray-500 pt-2">
                  ... and {aucklandRestaurantsWithCoords.length - 5} more
                </div>
              </div>
            </div>

            {/* Update Button */}
            {!completed && (
              <Button
                onClick={handleUpdateCoords}
                disabled={loading}
                size="lg"
                className="w-full"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                    Updating {results.success} coordinates...
                  </>
                ) : (
                  <>
                    <MapPin className="h-5 w-5 mr-2" />
                    Update {aucklandRestaurantsWithCoords.length} Coordinates
                  </>
                )}
              </Button>
            )}

            {/* Results */}
            {(loading || completed) && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="border rounded-lg p-4 bg-green-50">
                    <div className="flex items-center gap-2 text-green-700">
                      <Check className="h-5 w-5" />
                      <span className="font-semibold">Updated</span>
                    </div>
                    <p className="text-2xl font-bold text-green-900 mt-2">
                      {results.success}
                    </p>
                  </div>
                  <div className="border rounded-lg p-4 bg-red-50">
                    <div className="flex items-center gap-2 text-red-700">
                      <X className="h-5 w-5" />
                      <span className="font-semibold">Failed</span>
                    </div>
                    <p className="text-2xl font-bold text-red-900 mt-2">
                      {results.failed}
                    </p>
                  </div>
                </div>

                {results.errors.length > 0 && (
                  <div className="border rounded-lg p-4 bg-red-50">
                    <h4 className="font-semibold text-red-800 mb-2">Errors:</h4>
                    <ul className="text-sm text-red-700 space-y-1 max-h-40 overflow-y-auto">
                      {results.errors.map((err, i) => (
                        <li key={i}>• {err}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {completed && (
                  <Link href="/" className="block">
                    <Button variant="outline" size="lg" className="w-full">
                      <Check className="h-5 w-5 mr-2" />
                      View Map
                    </Button>
                  </Link>
                )}
              </div>
            )}

            {/* Info */}
            <div className="border-t pt-4 text-sm text-gray-600">
              <h4 className="font-semibold mb-2">ℹ️ Information:</h4>
              <ul className="space-y-1 list-disc list-inside">
                <li>Coordinates based on Auckland CBD street addresses</li>
                <li>Center: Queen St, Lorne St, High St, Shortland St area</li>
                <li>Will enable map view on homepage</li>
                <li>Only updates restaurants that already exist in database</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

